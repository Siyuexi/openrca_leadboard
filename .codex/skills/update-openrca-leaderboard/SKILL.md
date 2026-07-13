---
name: update-openrca-leaderboard
description: Refresh the OpenRCA leaderboard site from OpenRCA-2 ops-lite evaluation data. Use when Codex needs to update src/data/modelData.ts, change or verify OpenRCA 2.0 leaderboard metric columns, export ops-lite metrics from eval.db, run the local Vite preview for review, or prepare a GitHub Pages leaderboard update.
---

# Update OpenRCA Leaderboard

## Workflow

1. Inspect the source eval repo, normally `~/project/OpenRCA-2-Internal`.
   Read `env/exp/ops-lite.sh`, `scripts/watch_batch.py`, and `eval.db` before changing leaderboard data.
2. Use the model ids named in `env/exp/ops-lite.sh` and publish only ids that have `stage='judged'` records in `eval.db`.
   Use `ops-lite` as the default experiment and the exporter's explicit per-model provenance mapping for isolated completed runs. Never broadly union experiment ids. Exclude DB-only historical rows unless the user explicitly asks for them.
3. Keep the OpenRCA 2.0 schema aligned to the effective `watch_batch.py` metrics:
   `f1`, `acc`, `node-F1`, `edge-F1`, `any-hit`, `all-hit`, `path-acc`, `type-acc`.
   Use `f1` as the primary score and default sort. Do not add Date, RC P/R/F1, Node P/R, or Edge P/R columns.
4. Update `src/data/modelData.ts` and `src/pages/Home.tsx` together when the schema changes.
   Preserve the older OpenRCA 1.0 table unless the user asks to rewrite it.
5. Run `npm run build` after data or UI changes.
   Start `npm run dev -- --host 0.0.0.0 --port <port>`, discover the server IP with `hostname -I` or `ip -4 addr`, and give the routable `http://<ip>:<port>/` URL for review before any deploy, commit, or push.

## Metric Export

Run the helper from this repo:

```bash
python3 .codex/skills/update-openrca-leaderboard/scripts/export_ops_lite_metrics.py \
  --source-repo ~/project/OpenRCA-2-Internal
```

The script emits a complete `modelDataOpenRCA2` TypeScript array.
It mirrors `scripts/watch_batch.py` aggregation:

- `f1`: mean `eval_metrics.f1`.
- `acc`: exact-match hit rate from `eval_metrics.exact_match`.
- `node-F1` and `edge-F1`: means of `node_f1` and `edge_f1`.
- `any-hit` and `all-hit`: hit rates from `any_service_hit` and `all_service_hit`.
- `path-acc`: hit rate over non-null `path_reachability` only.
- `type-acc`: mean `fault_kind_accuracy` over non-null cases only.

## Review Gate

Do not deploy to GitHub Pages before the user reviews the local HTML.
For deployment work, first show the current git diff and confirm the target remote/branch.
