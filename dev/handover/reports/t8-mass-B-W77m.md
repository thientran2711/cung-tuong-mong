# t8-mass-B W77m (c07 a51, c08 a18/a26/a36/a51; t7+t8 v0/v1/v2) — ROLLOVER after 2 person-ages (context)
PRIORITY #1 CHECK: OD 18:20Z/19:50Z/19:55Z (brief) | main jobs.json | review/t8-mass-W77g (method) | claims none other.
## Done (all 12 gens accepted first try, 2K 1024x2304 transparent, no black fill, md5 verified vs CDN)
- c07 a51 gens=6 https://ctm-img.victoria-tntt.workers.dev/img/_review/t8-reprompt/c07_a51_t7t8_sheet.jpg (READY sent)
- c08 a18 gens=6 https://ctm-img.victoria-tntt.workers.dev/img/_review/t8-reprompt/c08_a18_t7t8_sheet.jpg (READY sent)
Files img/_review/t8-reprompt/{c07_a51,c08_a18}_t{7,8}_v{0,1,2}.png
## Remaining (in order): c08 a26, a36, a51
## Method (same as W77g report; verified, golden c06 v0 cmp OK)
- Prompts: t8 `build.py c08 v0|v1|v2 --age aXX`; t7 `build.py c08 --t7 [v1|v2] --age aXX`. Checked: c08 a26/a36/a51 prompts differ from a18 ONLY in the age sentence (diff = 1 line each).
- Refs (already uploaded, folder ba4aecfe-...): c08 a26 P3Q9pvt42C, a36 8aitj4RIrU, a51 Cqnu7GBEEy (a18 MBJpqL1DCm); style eIyOFEidqL. (c07 a51 mEZvrulhJQ.)
- Flow per person-age: 4 images_generate in one message (t8 v0,v1,v2, t7 v0), creations_wait, look (dl.py contact sheet), 4 images_remove_background, + t7 v1,v2 gens (then cut). 1024x2304, 2k, count 1, refs [image t1, style].
- Tools: tools/dl.py (raw preview sheet), tools/fin2.py (`fin2.py cNN aXX t8v0=url .. t7v2=url` -> out/ + sheet + black-fill check), tools/push_w77m.sh (edit W/R; R holds dev/site/cdn_sync.py + manifest_guard.py from origin/main). READY via mcp__claude-code-remote__send_message session_id=session_011xDdVS7JY8KJW8hzKtoquL (plain SendMessage to that id fails).
- Selection used: yellow dominant on t8 v0/v2, t8 v1 yellow main + one accent, t7 own colour main + big yellow parts, faces visible, closed lips, same colours at every age.
