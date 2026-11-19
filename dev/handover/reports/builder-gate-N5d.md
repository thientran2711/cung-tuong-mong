# N5d — builder gate (successor of N5c) — Foreman C ROOT-37

PRIORITY #1 CHECK: OD 0 | ledger 0 | claims 2 | main 0 | review/* 0 | archive 0 (per brief). Reused N5c work (793227c, 83de0af, ea3bd45, ff5a74b); nothing new invented.
START_CTX ~0 % of the 1M window (get_session read 0), depth 8 (limit 8: I cannot open children; the successor is opened by ROOT-37).
Guard per item: snapshot of 8350 builder commands (c01–c32 × 5 ages × 19 modes × ±--spec5pose + emperor 6×5) before/after, `test_low_all.py`, `coverage.py`. Snapshot scripts live in the scratchpad only (not committed).

## Item 1 — K3 no-background sentence (module constant `K3_BG`)
- `from build import K3_BG` (dev/art/t8-prompt-B/build.py). Text verbatim from ROOT-36's order. Appended before END on EVERY output of build.py (all states: t1–t8, th, nude, kc, ngheo, trieu, bd/nc, …), default ON.
- trieu already had the older K3 wording (`K3_BG_OLD`, kept in the file because build_npc.py asserts it): it is REPLACED by `K3_BG` (never two K3 sentences). `--nostyle` gets a variant without "second reference image is style only" (no style image then). `--golden` (frozen A/B reproduction) is left byte-identical, no K3.
- coverage.py BG check now looks for the K3_BG text (`BGLINE`); build_npc.py cells keep the old NPC wording check (`BGLINE_NPC`). emperor-B/build.py not touched (W107b's).
- Snapshot diff before/after: 8350 commands, 1606 error cells identical (same keys, same errors), every other output = old output with exactly K3_BG inserted before END (trieu: old K3 removed) → 0 other changes.
- Pre-existing (not mine): `build.py cXX v0 --golden` no longer equals golden/pB_*.txt (differs at char 510, since the 3d2 frontal rewrite).
- coverage: BG column no longer red for any build.py group (was red everywhere); only the Emperor (emperor-B, W107b's file) still shows BG. 540 red cells remain (POSE=, REFS, ...).
