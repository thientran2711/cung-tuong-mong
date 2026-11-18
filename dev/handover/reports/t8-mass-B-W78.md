# t7/t8 mass B — W78 (c13–c22), report
PRIORITY #1 CHECK: OD 0 new | claims W74 predecessor, W77 T7V2 (build.py has --t7 v1|v2) | main jobs.json | review/* 0 → reused FROZEN builder dev/art/t8-prompt-B (golden c06 v0 cmp OK at start and after re-fetch). depth 8 (worker; no successor opened by me).
Prompts: build.py output unchanged; refs = her t1 upload + m09 (eIyOFEidqL); 1024x2304 2k gpt-2-6; cut with images_remove_background. Item/pose from builder as is.
Base https://ctm-img.victoria-tntt.workers.dev/img/_review/t8-reprompt/ (<cNN>_sheet.png = old t8 v0|v1|v2 | new t8 v0 v1 v2 | t7 v0 v1 v2).
| person | items | gens | notes |
|---|---|---|---|
| c13 | t8 v0 v1 v2, t7 v0 v1 v2 | 1 each | all pass by eye (phoenix main, face visible, items below chin, closed lips). md5[:12] t8v0 a653df973742 v1 816a6d42739a v2 7289ac005727, t7v0 ccfb6a2e8ad0 v1 2b86228cf0f3 v2 005781a68992 |
| c14 | same 6 | 1 each | pass; her original is butter cream so v0 reads pale-cream+gold (original colour kept by rule). md5 t8v0 91e7a0c30bbe v1 8560d2d5b048 v2 8d04aadc9907, t7v0 9ec30cc30da0 v1 68c27b8a250a v2 7112bbe75cff |

## UPDATE after GO (yellow = C2 #EFBD69, build.py 5636171c)
c13 REDONE with new yellow: all 6 (t8 v0 v1 v2, t7 v0 v1 v2), 1 gen each, pass by eye (yellow dominant, phoenix, face clear). md5[:12] t8v0 da1742eb3463 v1 8b3057874a01 v2 273c68bb567c, t7v0 24eb51f89e30 v1 0c99174d694f v2 5a8dd340bd9a. Sheet img/_review/t8-reprompt/c13_sheet.png. c14 files on CDN are still OLD yellow (to redo).
## HANDOVER (W78 at ~context ceiling; coordinator opens successor)
Remaining: c14 (redo), c15, c16 (t8 v0 + others redo), c17, c18, c19, c20 (t8 v0 redo), c21, c22. Each person = 6 gens (t8 v0 v1 v2, t7 v0 v1 v2) + remove-bg each + sheet + cdn_sync + READY.
Recipe per person: (1) upload https://ctm-img.victoria-tntt.workers.dev/img/_review/consort-tiers/<cNN>/b10/<cNN>_a18_t1_v0.png via creations_upload_image fileName face-<cNN>-t1.png folder ba4aecfe… (c13 id 6Aq6GGOiJO, c14 LwoLN4GswO, c15 8a68kDtIrU may be reused). (2) python3 dev/art/t8-prompt-B/build.py <cNN> v0|v1|v2 and `--t7` / `--t7 v1` / `--t7 v2` (check `build.py c06 v0 --golden | cmp - golden/pB_c06.txt` first). Paste output unchanged into images_generate: mode gpt-2-6, width 1024 height 2304 resolution 2k count 1, folder ba4aecfe-efce-47e2-b53f-30d292091886, references [{image: upload}, {style: eIyOFEidqL}]. (3) creations_read each; regen (max 6) if wrong. (4) images_remove_background each. (5) save as img/_review/t8-reprompt/<cNN>_a18_t8_v<k>.png / _a18_t7_v<k>.png, sheet (old t8 v0-2 from consort-tiers/<cNN>/b10/<cNN>_a18_t8_v<k>.png | new 6) ≤1400 px, python3 dev/site/cdn_sync.py (script from origin/main dev/site + manifest_guard.py, run from a scratch root with img/). Helper scripts (pp.sh prints prompts+diffs, sv.sh saves+syncs, sheet.py) were in my scratch /home/user/wt/w78-out/ (may be gone; trivial to rewrite).
Tip: pasting a prompt costs ~1.2k tokens; ~40k tokens per person.
