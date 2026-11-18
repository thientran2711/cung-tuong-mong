# t8-mass-B W77g (c07 c08 x a18 a26 a36 a51, t7+t8 v0/v1/v2) — ROLLOVER after 3 person-ages (context)
## Done (all 6 gens accepted first try each; 2K 1024x2304 transparent, no black fill, md5 verified vs CDN)
- c07 a18 gens=6 https://ctm-img.victoria-tntt.workers.dev/img/_review/t8-reprompt/c07_a18_t7t8_sheet.jpg (READY sent)
- c07 a26 gens=6 .../c07_a26_t7t8_sheet.jpg (READY sent)
- c07 a36 gens=6 .../c07_a36_t7t8_sheet.jpg (READY sent)
Files img/_review/t8-reprompt/c07_a{18,26,36}_t{7,8}_v{0,1,2}.png
## Remaining (in order): c07 a51, then c08 a18, a26, a36, a51
## Method (same as W77d report; verified)
- Prompts: t8 `build.py cNN v0|v1|v2 --age aXX`; t7 `build.py cNN --t7 [v1|v2] --age aXX`. Only the age phrase changes between ages (diff checked for c07: a26 "about 30, mature and poised"; a36 "about 42, a mature woman in her early forties, ..."; a51 "about 51 and her face must clearly read as ... a few visible silver strands ..."). Golden c06 v0 cmp OK.
- t1 refs: a18 https://ctm-img.victoria-tntt.workers.dev/img/_review/consort-tiers/<cNN>/b10/<cNN>_a18_t1_v0.png ; a26/a36/a51 https://ctm-img.victoria-tntt.workers.dev/img/fig-consort-<cNN>-t1-aXX.webp (all 200 for c07 and c08). Upload with creations_upload_image (face-<cNN>-t1-aXX.*, folder ba4aecfe-...). Style ref eIyOFEidqL. Uploaded ids: c07 a18 xSBLLcwjfW, a26 Lw8l7eBswO, a36 lJtS9cRgv9.
- 6 images_generate (gpt-2-6, 1024x2304, 2k, count 1, refs [image t1, style eIyOFEidqL]) in ONE message; creations_wait; then 6 images_remove_background in one message (if "slots in use" error, resend the failed one after waiting); keep an id map gen->cut (cut ids are NOT in the same order only if you mix them; check 6 md5 differ).
- Tools: dev/art/t8-prompt-B/tools/fin2.py (run in a scratch dir: `fin2.py cNN aXX t8v0=url .. t7v2=url` -> out/*.png + sheet, black-fill check) and push2.sh (edit W/R paths; W=/tmp/claude-0, R=/tmp/claude-0/cdn holding dev/site/cdn_sync.py + manifest_guard.py from `git fetch --depth=1 origin main` + `git show FETCH_HEAD:dev/site/...`). 
- READY via mcp__claude-code-remote__send_message to session_011xDdVS7JY8KJW8hzKtoquL.
- Selection: yellow dominant on t8 v0/v2, t8 v1 yellow main + one accent, t7 own colour main + big yellow parts, faces visible, closed lips, same colours at every age, a36 clearly older than a26.
