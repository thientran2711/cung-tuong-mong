# t8-mass-B W77d (c05 c06 c07 c08 x a18 a26 a36 a51, t7+t8 v0/v1/v2) — ROLLOVER after 2 person-ages
START_CTX ~0% depth 9. Rollover reason: each person-age costs ~35k tokens (6 prompts pasted twice + sheets).
## Done (all 6 gens accepted first try, cut-outs checked: no black fill, 2K 1024x2304 transparent, md5 verified vs CDN)
- c05 a18: gens=6 sheet https://ctm-img.victoria-tntt.workers.dev/img/_review/t8-reprompt/c05_a18_t7t8_sheet.jpg (READY sent)
- c05 a26: gens=6 (+2 extra bg-cuts, 1 cut-out API error retried) sheet .../c05_a26_t7t8_sheet.jpg (READY sent)
Files: img/_review/t8-reprompt/c05_a{18,26}_t{7,8}_v{0,1,2}.png
## Remaining (in order, finish each person all 4 ages before next)
c05 a36, c05 a51, then c06 (all 4 ages, redo all), c07 (4), c08 (4).
## Method / facts learned
- build.py `--age aXX` changes ONLY the age phrase (diffed a18 vs a26: line "about 22, youthful adult" -> "about 30, mature and poised"). Verify a36/a51 the same way (diff after tr '.' '\n') before pasting.
- Prompt build: t8 `build.py cNN v0|v1|v2 --age aXX`; t7 v0 `build.py cNN --t7 --age aXX`, t7 v1/v2 `build.py cNN --t7 v1|v2 --age aXX`. Golden c06 v0 --golden cmp OK.
- t1 refs: a18 = https://ctm-img.victoria-tntt.workers.dev/img/_review/consort-tiers/<cNN>/b10/<cNN>_a18_t1_v0.png ; a26/a36/a51 = live https://ctm-img.victoria-tntt.workers.dev/img/fig-consort-<cNN>-t1-a26.webp (a36, a51 likewise; consort-tiers b10 only exists for a18). Upload with creations_upload_image (fileName face-<cNN>-t1-aXX.webp, folder ba4aecfe-...). Ids: c05 a18 dtPdZNmXSL, c05 a26 gOtg1MASXO. Style ref eIyOFEidqL.
- images_generate gpt-2-6 1024x2304 2k, refs [image t1, style eIyOFEidqL], no seed; 6 gens in ONE message; creations_wait; then images_remove_background x6 in one message; creations_wait.
- !! KEEP A STRICT id map gen->cut when a cut fails (I mixed ids once; sheet showed duplicate md5 = the tell; always check the 6 md5s differ).
- tools: dev/art/t8-prompt-B/tools/fin2.py (cNN aXX t8v0=url .. t7v2=url -> out/<c>_<a>_t<T>_v<K>.png, 6-col sheet, black-fill + transparency check) and push2.sh (cdn_sync into img/_review/t8-reprompt, md5 check; edit W path). cdn_sync.py + manifest_guard.py: git show origin/main:dev/site/<file> into a scratch root (do NOT `git fetch origin main` in foreground: >2 min).
- Send READY with mcp__claude-code-remote__send_message session_id session_011xDdVS7JY8KJW8hzKtoquL (SendMessage tool does not reach it).
- Selection used: yellow dominant on t8 v0/v2, t8 v1 yellow main + accent, t7 own colour main + big yellow parts, same colours at every age, face visible, closed lips, hairpins upward.
