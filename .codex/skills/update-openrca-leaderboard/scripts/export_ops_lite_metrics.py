#!/usr/bin/env python3
"""Export OpenRCA-2 ops-lite aggregate rows from eval.db.

The script intentionally mirrors the effective metrics surfaced by
OpenRCA-2's scripts/watch_batch.py and emits TypeScript rows suitable for
src/data/modelData.ts.
"""

from __future__ import annotations

import argparse
import json
import re
import sqlite3
from pathlib import Path


DEFAULT_SOURCE_REPO = Path.home() / "project" / "OpenRCA-2-Internal"
MODEL_ENTRY_RE = re.compile(r"^\s*(?:#\s*)?([A-Za-z0-9][A-Za-z0-9._-]*)\s*$")

# A few completed ops-lite runs were intentionally isolated under their own
# experiment ids. Keep the provenance explicit per model so a future rerun of
# the same model in another experiment cannot be silently double-counted.
MODEL_EXPERIMENT_OVERRIDES = {
    "gpt-5.6-sol-passthrough": "gpt-5.6-sol",
    "grok-4.5-passthrough": "grok-4.5",
    "hunyuan-3.0-dev-0703-major": "hunyuan-0703",
}

DISPLAY_NAMES = {
    "claude-fable-5-passthrough": ("Claude Fable 5", "Anthropic"),
    "claude-opus-5-passthrough": ("Claude Opus 5", "Anthropic"),
    "claude-opus-4-8-passthrough": ("Claude Opus 4.8", "Anthropic"),
    "claude-opus-4-6-passthrough": ("Claude Opus 4.6", "Anthropic"),
    "claude-sonnet-4-6-passthrough": ("Claude Sonnet 4.6", "Anthropic"),
    "claude-sonnet-5-passthrough": ("Claude Sonnet 5", "Anthropic"),
    "gpt-5.6-sol-passthrough": ("GPT-5.6 Sol", "OpenAI"),
    "gpt-5.5-passthrough": ("GPT-5.5", "OpenAI"),
    "gpt-5.4-2026-03-05-passthrough": ("GPT-5.4", "OpenAI"),
    "grok-4.5-passthrough": ("Grok 4.5", "xAI"),
    "gemini-3.1-pro-preview": ("Gemini 3.1 Pro", "Google"),
    "gemini-3.5-flash-passthrough": ("Gemini 3.5 Flash", "Google"),
    "gemini-3.6-flash-passthrough": ("Gemini 3.6 Flash", "Google"),
    "moonshot_kimi-k2.6-passthrough": ("Kimi K2.6", "Moonshot AI"),
    "moonshot_kimi-k2.7-code-passthrough": ("Kimi K2.7 Code", "Moonshot AI"),
    "moonshot_kimi-k3-passthrough": ("Kimi K3", "Moonshot AI"),
    "qwen3.7-max-passthrough": ("Qwen 3.7 Max", "Alibaba"),
    "qwen3.7-plus-passthrough": ("Qwen 3.7 Plus", "Alibaba"),
    "deepseek-v4-pro-passthrough": ("DeepSeek V4 Pro", "DeepSeek"),
    "deepseek-v4-flash-passthrough": ("DeepSeek V4 Flash", "DeepSeek"),
    "doubao-seed-2-0-pro-passthrough": ("Seed 2.0 Pro", "ByteDance"),
    "doubao-seed-2-0-lite-passthrough": ("Seed 2.0 Lite", "ByteDance"),
    "doubao-seed-2-1-pro-passthrough": ("Seed 2.1 Pro", "ByteDance"),
    "glm-5.2-passthrough": ("GLM-5.2", "Zhipu AI"),
    "glm-5.1-passthrough": ("GLM-5.1", "Zhipu AI"),
    "minimax_m3-passthrough": ("MiniMax M3", "MiniMax"),
    "step-3.7-flash-passthrough": ("StepFun 3.7 Flash", "StepFun"),
    "xiaomi_mimo-v2.5-pro-passthrough": ("MiMo V2.5 Pro", "Xiaomi"),
    "hunyuan-3.0-preview-taiji": ("HY 3.0 Preview", "Tencent"),
    "hunyuan-3.0-dev-0703-major": ("HY 3.0", "Tencent"),
    "longcat-2.0-passthrough": ("LongCat 2.0", "Meituan"),
    "muse-spark-1.1-passthrough": ("Muse Spark 1.1", "Meta"),
}


def parse_model_ids(exp_file: Path) -> list[str]:
    seen: set[str] = set()
    out: list[str] = []
    in_models = False
    for line in exp_file.read_text().splitlines():
        if not in_models:
            in_models = bool(re.match(r"^\s*MODELS\s*=\s*\(\s*$", line))
            continue
        if re.match(r"^\s*\)\s*$", line):
            break
        match = MODEL_ENTRY_RE.fullmatch(line)
        if not match:
            continue
        model_id = match.group(1)
        if model_id not in seen:
            seen.add(model_id)
            out.append(model_id)
    return out


def pct(value: float | None) -> str:
    if value is None:
        return ""
    return f"{value * 100:.2f}%"


def mean(values: list[float]) -> float | None:
    return sum(values) / len(values) if values else None


def bool_mean(metrics: list[dict], key: str) -> float | None:
    if not metrics:
        return None
    return sum(1.0 if item.get(key) else 0.0 for item in metrics) / len(metrics)


def collect_metrics(
    db_path: Path,
    model_ids: list[str],
    default_exp_id: str,
    stage: str,
    experiment_overrides: dict[str, str],
) -> dict[str, dict[str, str]]:
    by_model: dict[str, list[dict]] = {}
    with sqlite3.connect(db_path) as conn:
        for model_id in model_ids:
            exp_id = experiment_overrides.get(model_id, default_exp_id)
            rows = conn.execute(
                """
                SELECT eval_metrics
                FROM evaluation_data
                WHERE exp_id = ? AND model_name = ? AND stage = ? AND eval_metrics IS NOT NULL
                """,
                (exp_id, model_id, stage),
            ).fetchall()
            for (raw_metrics,) in rows:
                try:
                    metrics = json.loads(raw_metrics)
                except json.JSONDecodeError:
                    continue
                if isinstance(metrics, dict):
                    by_model.setdefault(model_id, []).append(metrics)

    out: dict[str, dict[str, str]] = {}
    for model_id, metrics in by_model.items():
        path_values = [
            1.0 if item["path_reachability"] else 0.0
            for item in metrics
            if item.get("path_reachability") is not None
        ]
        type_values = [
            item["fault_kind_accuracy"]
            for item in metrics
            if item.get("fault_kind_accuracy") is not None
        ]
        out[model_id] = {
            "f1": pct(mean([item.get("f1") or 0.0 for item in metrics])),
            "acc": pct(bool_mean(metrics, "exact_match")),
            "nodeF1": pct(mean([item.get("node_f1") or 0.0 for item in metrics])),
            "edgeF1": pct(mean([item.get("edge_f1") or 0.0 for item in metrics])),
            "anyHit": pct(bool_mean(metrics, "any_service_hit")),
            "allHit": pct(bool_mean(metrics, "all_service_hit")),
            "pathAcc": pct(mean(path_values)),
            "typeAcc": pct(mean(type_values)),
        }
    return out


def ts_string(value: str) -> str:
    return "'" + value.replace("\\", "\\\\").replace("'", "\\'") + "'"


def render_rows(model_ids: list[str], metrics_by_model: dict[str, dict[str, str]], method_name: str) -> str:
    rows = []
    for model_id in model_ids:
        metrics = metrics_by_model.get(model_id)
        if not metrics:
            continue
        display, _org = DISPLAY_NAMES.get(model_id, (model_id.removesuffix("-passthrough"), "Unknown"))
        row = {
            "name": method_name,
            "model": display,
            "modelId": model_id,
            "frameworkOpen": "false",
            "modelOpen": "false",
            **metrics,
        }
        rows.append(row)

    rows.sort(key=lambda row: (parse_percent(row["f1"]), parse_percent(row["acc"])), reverse=True)
    lines = ["export const modelDataOpenRCA2: DataOpenRCA2[] = ["]
    for row in rows:
        parts = [
            f"name: {ts_string(row['name'])}",
            f"model: {ts_string(row['model'])}",
            f"modelId: {ts_string(row['modelId'])}",
            "frameworkOpen: false",
            "modelOpen: false",
        ]
        for key in ("f1", "acc", "nodeF1", "edgeF1", "anyHit", "allHit", "pathAcc", "typeAcc"):
            parts.append(f"{key}: {ts_string(row[key])}")
        lines.append("  { " + ", ".join(parts) + " },")
    lines.append("];")
    return "\n".join(lines)


def parse_percent(value: str) -> float:
    return float(value.rstrip("%")) if value else float("-inf")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--source-repo", type=Path, default=DEFAULT_SOURCE_REPO)
    parser.add_argument("--exp-id", default="ops-lite")
    parser.add_argument("--stage", default="judged")
    parser.add_argument("--method-name", default="DeepResearch")
    args = parser.parse_args()

    source_repo = args.source_repo.expanduser().resolve()
    exp_file = source_repo / "env" / "exp" / "ops-lite.sh"
    db_path = source_repo / "eval.db"
    if not exp_file.exists():
        raise SystemExit(f"missing model list: {exp_file}")
    if not db_path.exists():
        raise SystemExit(f"missing eval DB: {db_path}")

    model_ids = parse_model_ids(exp_file)
    metrics_by_model = collect_metrics(
        db_path,
        model_ids,
        args.exp_id,
        args.stage,
        MODEL_EXPERIMENT_OVERRIDES,
    )
    print(render_rows(model_ids, metrics_by_model, args.method_name))


if __name__ == "__main__":
    main()
