# Repository Guidelines

## Project Structure

This repository is a React 18 + TypeScript + Vite leaderboard site. Main source files are under `src/`:

- `src/data/modelData.ts`: leaderboard rows, model colors, organization logos, and news items.
- `src/pages/Home.tsx`: home page and leaderboard table rendering.
- `public/`: static images and logos referenced by the app.

Repo-level Codex skills live under `.codex/skills/`. Use `$update-openrca-leaderboard` when refreshing OpenRCA 2.0 metrics from the eval database.

## Development Commands

- `npm install`: install dependencies.
- `npm run dev -- --host 127.0.0.1 --port 5173`: start the local Vite server for review.
- `npm run build`: type-check and build the site.
- `npm run preview`: preview the production build locally.

## OpenRCA 2.0 Leaderboard Rules

OpenRCA 2.0 data comes from `~/project/OpenRCA-2-Internal/eval.db`, normally filtered to `exp_id='ops-lite'` and `stage='judged'`.
The model list is derived from `~/project/OpenRCA-2-Internal/env/exp/ops-lite.sh`; publish the intersection of named models and DB records. Models completed under isolated experiment ids must use the explicit per-model provenance mapping in the exporter; never broadly union experiments.

Use only these OpenRCA 2.0 metric columns:

- `f1`
- `acc`
- `node-F1`
- `edge-F1`
- `any-hit`
- `all-hit`
- `path-acc`
- `type-acc`

Use `f1` as the primary score and default sort. Do not restore Date, RC P/R/F1, Node P/R, or Edge P/R columns for OpenRCA 2.0.
The aggregation semantics should match `~/project/OpenRCA-2-Internal/scripts/watch_batch.py`.

## Release Gate

Run the build and lint locally before release. Publish first to `Siyuexi/openrca_leadboard` (`main` plus `gh-pages`) and give the user its verified public GitHub Pages URL for review.
Do not publish to `microsoft/OpenRCA` until the user explicitly approves the Siyuexi public page.
