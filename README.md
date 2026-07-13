# OpenRCA Leaderboard

React + TypeScript + Vite site for the OpenRCA and OpenRCA 2.0 leaderboards.

## Development

```bash
npm install
npm run dev -- --host 127.0.0.1 --port 5173
npm run build
```

## Data

Leaderboard rows are stored in `src/data/modelData.ts`.

OpenRCA 2.0 rows are exported from `~/project/OpenRCA-2-Internal/eval.db` using judged records and the model ids named in `~/project/OpenRCA-2-Internal/env/exp/ops-lite.sh`. The exporter uses `ops-lite` by default and explicit per-model experiment overrides for completed isolated runs.
The OpenRCA 2.0 table uses `f1` as the primary score and only these effective metrics:

`f1`, `acc`, `node-F1`, `edge-F1`, `any-hit`, `all-hit`, `path-acc`, `type-acc`.

Use the repo-level Codex skill for refreshes:

```bash
python3 .codex/skills/update-openrca-leaderboard/scripts/export_ops_lite_metrics.py \
  --source-repo ~/project/OpenRCA-2-Internal
```

Review the local page before publishing to GitHub Pages.
