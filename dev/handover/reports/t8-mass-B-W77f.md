# t8-mass-B W77f (successor of W77d) — ROLLOVER after c05 a36 + a51 (each person-age ~35k tokens)
## Done (all 6 gens accepted first try each; md5 verified vs CDN; READY sent to Foreman C session_011xDdVS7JY8KJW8hzKtoquL)
- c05 a36 gens=6 https://ctm-img.victoria-tntt.workers.dev/img/_review/t8-reprompt/c05_a36_t7t8_sheet.jpg
- c05 a51 gens=6 https://ctm-img.victoria-tntt.workers.dev/img/_review/t8-reprompt/c05_a51_t7t8_sheet.jpg
(c05 a18/a26 by W77d.) => c05 complete, all 4 ages.
## Remaining (in order, person finishes all 4 ages)
c06 a18, a26, a36, a51 (redo, old yellow), then c07 (4), c08 (4) if Foreman C still wants them.
## Method (works, copy it)
- Prompt: t8 `build.py cNN v0|v1|v2 --age aXX`; t7 `build.py cNN --t7 --age aXX` (v0) / `--t7 v1|v2`. Golden c06 v0 --golden cmp OK. The a51 age sentence replaces ONLY the age sentence (diffed a36 vs a51: only that sentence differs).
- t1 refs: a18 = https://ctm-img.victoria-tntt.workers.dev/img/_review/consort-tiers/<cNN>/b10/<cNN>_a18_t1_v0.png ; a26/a36/a51 = https://ctm-img.victoria-tntt.workers.dev/img/fig-consort-<cNN>-t1-aXX.webp. Upload with creations_upload_image (fileName face-<cNN>-t1-aXX.webp, folder ba4aecfe-...). Ids: c05 a36 tCRhhJQmZJ, c05 a51 1ldxxcJr4r. Style ref eIyOFEidqL.
- images_generate gpt-2-6 1024x2304 2k count 1, refs [image t1, style eIyOFEidqL], folder ba4aecfe-...; 6 gens in ONE message; creations_wait; look at ONE montage (tools/prev.py, 6 cols, ~1600px wide); then images_remove_background x4 first, then x2 (the account allows ~48 slots; sending 6 at once failed for the last 2 with "slots in use" -> just retry after wait). KEEP a strict id map gen->cut.
- tools in dev/art/t8-prompt-B/tools: fin2.py (run in a `work/` dir: `python3 fin2.py cNN aXX t8v0=url ... t7v2=url` -> out/*.png + 6-col sheet + black-fill check), push2.sh (cdn_sync into img/_review/t8-reprompt + md5 check; edit S path), prev.py (montage of raw gens: `python3 prev.py out.jpg label=url ...`, needs a raw/ dir). cdn_sync.py/manifest_guard.py/manifest-floor.json: `git show origin/main:dev/site/<f>` into <scratch>/cdn/dev/site/ (git fetch --depth=1 origin main in background works, ~1 min).
- Send READY with mcp__claude-code-remote__send_message session_id session_011xDdVS7JY8KJW8hzKtoquL.
- Selection: yellow #EFBD69 dominant on t8 v0/v2, t8 v1 yellow main + accent, t7 own colour main + big yellow parts, same colours at every age, face visible, a51 reads ~51 (the stronger build.py a51 phrase worked: fine lines, a few silver strands).
