# t8-mass-B W75b (c23-c32 a18; t7 + t8, v0/v1/v2) — report + HANDOVER
PRIORITY #1 CHECK: OD 0 | main jobs.json+spec*.py | review/* 0 | claims W75 (predecessor) -> reused FROZEN builder dev/art/t8-prompt-B/ (build.py db0490e8, yellow #EFBD69 = C2, owner OK 19:50Z). Golden c06 v0 cmp OK (old yellow build).
depth 8 (create_session refused by design for workers). Rolled over at context ~ +25 % of START_CTX (est. 40 % of window after c27).
## Done with the NEW yellow (all gens=1, every image looked at, bg removed, cdn --check same). CDN base https://ctm-img.victoria-tntt.workers.dev/img/_review/t8-reprompt/
| person | files | sheet (old live t8 | new t8 v0-2 | new t7 v0-2) | md5[:8] t7 v0/v1/v2 ; t8 v0/v1/v2 |
|---|---|---|---|
| c23 | c23_a18_t{7,8}_v{0,1,2}.png | c23_a18_sheet.jpg | c9be7c54/54dd45a6/dd1de502 ; be838da4/0e17ea85/e69b5db4 |
| c24 | same pattern | c24_a18_sheet.jpg | f2ee107e/bccccd7a/b2ce8549 ; f95dfd1a/4e57e32e/8868d2ae |
| c25 | same | c25_a18_sheet.jpg | 51f6c4f9/b1289af5/ad00f969 ; d6c6e6c7/503a1f5a/10806a53 |
| c26 | same | c26_a18_sheet.jpg | da39c81f/b34a595f/f5fedd7e ; 7bea80b3/4d85a208/bb95e5c7 |
| c27 | same | c27_a18_sheet.jpg | fb639817/089af9a2/760ba14d ; dbc88cbe/2249e942/55c07152 |
Old-yellow files of c23/c24 (made before GO) were overwritten on the CDN by the new ones (same names).
## ORIG1 rows added (build.py, ORIG1 only; builder otherwise untouched) — c26..c32 had none; measured from each t1 (measure.py + skirt k-means, checked by eye on a contact sheet)
c26 dusty rose red #C4736E / cream blush #E7C4AB; c27 terracotta coral red #C27362 / pale cream blush #EBCFBE; c28 ivory cream #EEDED1 / pale sage-cream #DCCBB8; c29 muted mauve-lilac #BCA7AB / soft pink-mauve #D8C1C1; c30 pale ivory #EBDFD9 / soft grey-lilac #C1BCBE; c31 pale celadon-cream #D4C6B4 / soft sage #BAB09B; c32 ivory cream #EEDCCE / pale ivory-taupe #C5B5A8.
## NOT done: c28 c29 c30 c31 c32 (t7 + t8, v0/v1/v2 each = 30 figures).
## HANDOVER for successor
1. Fetch handover branch + review/t8-mass-W75b (build.py has the ORIG1 rows; cherry-pick that commit if build.py on the handover branch lacks them).
2. Per person: upload `img/_review/consort-tiers/<cNN>/b10/<cNN>_a18_t1_v0.png` via creations_upload_image (url = CDN link, fileName face-<cNN>-t1.png, folder ba4aecfe-...) -> identifier; refs = [{image, that id}, {style, eIyOFEidqL}]; images_generate gpt-2-6, 1024x2304, 2k, count 1, folder ba4aecfe-efce-47e2-b53f-30d292091886; prompt = `python3 build.py cNN v0|v1|v2` (t8) and `build.py cNN v0|v1|v2 --t7` (t7), pasted unchanged; look at each (creations_read hq medium: phoenix dominant, yellow dominant at t8, face = her t1, closed lips, nothing on face); then images_remove_background; download; contact sheet; cdn_sync from a scratch root with dev/site/cdn_sync.py + manifest_guard.py from origin/main; send "READY t7+t8-B cNN <sheet url> gens=n".
3. Context tip: do not print full prompts; print with placeholders for the invariant blocks (outfit, FAB, END) and paste the full text; 6 gens in parallel per person; ~30-35k tokens/person.
4. Local scratch of this session (lost on container end): /home/user/wt/w75b-out/y2/*.png, scratchpad sheet.py/abbr.py (simple PIL contact sheet: old live t8 webp from /img/hd/fig-consort-<cNN>-t8-a18.webp + 6 new).
