# root30 W99 — job C (t1–t6 style B, a18) c17–c20
PRIORITY #1 CHECK: OD 0 | main 0 | review/* low-ranks-B-W79 (builder reused, frozen) | claims: Foreman C ROOT-30 brief root30-mass.md.
Golden: `build.py c06 v0 --golden | cmp - golden/pB_c06.txt` OK; `test_low_all.py` OK (2304 builds). Prompts = build.py output pasted unchanged. Refs t1–t5 = face-cNN-t1 + style kspkwKx16B; t6 + swatch TdwDfOyVNR. Folder ba4aecfe…, 1024x2304 2k, no seed, remove_background after each gen.
Rules re-read before each person: FIGURE_GATE (all), consort-B10, START_CORE/WORKER/ART.

## c17 (face-c17-t1 = Magnific s7ISvBWl8e) — READY
Sheet: https://ctm-img.victoria-tntt.workers.dev/img/_review/low-B/c17/c17_a18_low_sheet.jpg (row0 live a18 t1–t6, rows1–3 new v0/v1/v2). Files img/_review/low-B/c17/c17_a18_t{1..6}_v{0,1,2}.png
| figure | gens | pass |
|---|---|---|
| t1 v0/v1/v2 | 1/1/1 | pass |
| t2 v0/v1/v2 | 1/1/1 | pass |
| t3 v0/v1/v2 | 1/1/1 | pass |
| t4 v0/v1/v2 | 1/1/1 | pass |
| t5 v0/v1/v2 | 1/1/1 | pass |
| t6 v0/v2 | 1/1 | pass |
| t6 v1 | 2 | pass (gen 1 read mostly cream-gold, big yellow; same-prompt regen = clearer ivory robe) |
Total gens 19. Checks: closed lips, eyes open, face uncovered, item below chin and contrasting, no phoenix, no royal yellow t1–t5 (t6 yellow panel/sash per frozen YEL_T6), alpha clean, no black fill.
Notes for Foreman: c17 LOWV rows make t3 v1 (#F6DBBC) and t3 v2 (#F8CFB8) near-identical peach, and t2 v2/t3 v1/v2/t4 v2/t5 v1 are all peach family; v1/v2 colours come straight from LOWV (not edited by me).

## c18 (face-c18-t1 = Magnific tCRvXHImZJ) — READY
Sheet: https://ctm-img.victoria-tntt.workers.dev/img/_review/low-B/c18/c18_a18_low_sheet.jpg ; files img/_review/low-B/c18/c18_a18_t{1..6}_v{0,1,2}.png (all 1024x2304 transparent, verified).
| figure | gens | pass |
|---|---|---|
| t1–t6 v0/v1/v2 (18 figures) | 1 each | pass |
Total gens 18. FIGURE_GATE + consort-B10 re-read before this person. Checks as c17: closed lips, eyes open, face uncovered (fan held at waist, both hands), item contrasting, no phoenix, no royal yellow t1–t5, t6 yellow touch only per frozen YEL_T6, alpha clean.

## HANDOVER (W99 → successor, ROLLOVER at context ceiling)
DONE: c17, c18. NOT STARTED: c19, c20 (a18 t1–t6 × v0/v1/v2, 18 gens each).
Per person: re-read FIGURE_GATE + consort-B10; `build.py cNN --low N vK --age a18` pasted unchanged; upload CDN `img/_review/consort-tiers/<cNN>/b10/<cNN>_a18_t1_v0.png` as face-<cNN>-t1.png via creations_upload_image (folderReference ba4aecfe…) → refs [image face, style kspkwKx16B] (+ image TdwDfOyVNR swatch as 3rd for t6; ids from this account still valid: swatch TdwDfOyVNR OK, style kspkwKx16B OK). 3 gens in flight per batch; read a trio contact sheet (full figures + face crops), remove_background, download, sheet (live t1–t6 v0 row + 3 new rows), cdn_sync to img/_review/low-B/<cNN>/, report, READY.
Scratch tools (session-local, not in git): /home/user/wt/w99-work/{facecheck.py,trio.py,sheet.py}; recreate if gone: sheet = 6 cols × 4 rows, cell H=340, row0 = live a18 t1–t6 v0 from CDN consort-tiers/<cNN>/b10 (use curl, python urllib gets 403), rows1–3 new v0–v2.
Tips: python must run with PYTHONDONTWRITEBYTECODE=1 (build.cpython-313.pyc is tracked → dirty tree); git push race on the handover branch — loop fetch/cherry-pick/push with `if git push …`; sparse CDN worktree /home/user/wt/w99-cdn (origin/main + dev/site/*.py), `CLOUDFLARE_API_TOKEN=proxy-injected python3 dev/site/cdn_sync.py img/_review/low-B/<cNN>`.
Credits left ≈ 268378 − 37×138 ≈ 263k (c17 19 gens, c18 18 gens).
