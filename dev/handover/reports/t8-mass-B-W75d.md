# t8-mass-B W75d (c23-c27 at a26/a36/a51; t7 + t8, v0/v1/v2) — report + HANDOVER
PRIORITY #1 CHECK: OD 0 | main jobs.json+spec*.py | review/* 0 new | reused FROZEN builder dev/art/t8-prompt-B/ (build.py on handover branch already has ORIG1 c26-c32). Prompts = `build.py cNN v0|v1|v2 --age aXX` (t8) and `... --t7 --age aXX` (t7), pasted unchanged (only the age phrase differs from a18).
Rolled over early (context), no sub-agents.
## Done (all gens=1, every image looked at, bg removed, cdn --check same). CDN base https://ctm-img.victoria-tntt.workers.dev/img/_review/t8-reprompt/
| person-age | files | sheet (old a-age t8 v0-2 | new t8 v0-2 | new t7 v0-2) | md5[:8] t8 v0/v1/v2 ; t7 v0/v1/v2 |
|---|---|---|---|
| c23 a26 | c23_a26_t{7,8}_v{0,1,2}.png | c23_a26_sheet.jpg | d1551f13/3d42fb2f/f3671a2f ; 00bc74b9/fd3ef503/461e8070 |
| c23 a36 | c23_a36_t{7,8}_v{0,1,2}.png | c23_a36_sheet.jpg | 237dafc7/bed8e4e2/7b6f1908 ; 5dd79927/0045421c/d9ed6cf7 |
READY for c23 a26 sent to Foreman C; c23 a36 READY sent right after this report.
## NOT done: c23 a51; c24-c27 at a26, a36, a51.
## OPEN QUESTION (asked Foreman C, no answer yet)
a51 has NO b10-a51 t1 on the CDN (404 c23/c27). Only live img/hd/fig-consort-cNN-t1-a51.webp (muted). Plan unless told otherwise: use that live a51 t1 (convert to PNG, upload as face-cNN-t1.png) as image ref; colours stay a18 per owner 19:55Z (prompt text carries ORIG1 hex).
## HANDOVER
1. Sources of t1: a26 = .../consort-tiers/<cNN>/b10-a26/<cNN>_a26_t1_v0.png ; a36 = b10-a36 ; (a18 = b10). Upload with creations_upload_image (fileName face-<cNN>-t1.png, folder ba4aecfe-...). refs = [{image,id},{style,eIyOFEidqL}], images_generate gpt-2-6 1024x2304 2k count 1.
2. Magnific slot limit is shared (48): send max ~3-4 gens at once, retry the rest after creations_wait.
3. Prompt for a26/a36 = a18 prompt with only the age phrase changed ("about 30, mature and poised." / "about 42, dignified and still beautiful, only subtle fine lines at the eyes."); always generate the text with build.py and paste.
4. Review: contact sheet (face + body crops) then images_remove_background x6, then fin: download cut PNGs to a scratch root img/_review/t8-reprompt/, sheet (old t8 | new t8 | new t7), cdn_sync.py (+manifest_guard.py) from origin/main, `--check`. Scratch scripts (lost with container): chk.py (review sheet), fin.sh.
5. Report each as READY via mcp__claude-code-remote__send_message to Foreman C (session_011xDdVS7JY8KJW8hzKtoquL).
