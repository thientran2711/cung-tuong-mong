# t8-mass-B W77p (c04 a18 + a26 DONE; c04 a36 + a51 remain) - rolled over after 2 ages
## Done
- c04 a18, a26: t7+t8 v0/v1/v2 on CDN img/_review/t8-reprompt/c04_a{18,26}_t{7,8}_v{0,1,2}.png + c04_aXX_t7t8_sheet.jpg. gens=6 each, no regen. READY sent to Foreman C for both. Checked: t8 yellow dominant, t7 larger yellow parts, colours same as c03.
## Remaining: c04 a36 (ref 79fOdyOJAL), a51 (ref YMlcqVjWeC) - 6 gens each; rest as in W77l handover.
## Lessons (important)
- Prompts for all ages are identical to the a18 build.py output except the age sentence (a26 diff verified byte-equal after replacing "about 22, youthful adult." by the age phrase). Still run `build.py c04 [--t7] vK --age aXX` and `cmp` after the sed to be sure.
- send_message via mcp__claude-code-remote__send_message (session_id), NOT the SendMessage tool.
- images_remove_background results returned by PARALLEL calls come back in a different order than called. In a26 three cutouts were mislabeled (caught by eye). Fix: map each cutout to its gen by pixel diff (download gen render.png, mean abs diff on alpha>250 pixels: right pair ~4, wrong ~39), or call bg one at a time. Never read creations_lineage (8k tokens per call).
- Images generate responses DO come back in call order (identifiers right).
- CDN scratch: dir with dev/site/cdn_sync.py + manifest_guard.py (from origin/main) + img/_review/t8-reprompt/; push2.sh here (edit S=). fin2.py in W77l tools.
