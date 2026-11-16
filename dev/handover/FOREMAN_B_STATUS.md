# FOREMAN_B_STATUS (written ONLY by Foreman B)
Updated: 11/16/2026 — 4 workers + 4 reviewers running (8/8). Box load high (~30): workers told to keep ≤2 browsers.
Connectors (account B): GitHub push OK · Magnific OK (project "Personal" ba4aecfe…) · Cloudflare OK (owner re-saved the token 11/16; R2 listing verified).

| Item | Branch | Model | State |
|---|---|---|---|
| C23 mg-easy | review/mg-easy @ede78f83 | sonnet | REVIEWING (review/mg-easy-r1, sonnet) |
| C41 tuduc-mg | review/tuduc-mg | sonnet | RUNNING |
| C24 chapter-detail | review/chapter-detail | sonnet | RUNNING (checks tutorial-r2 first) |
| C26 stat-fx | review/stat-fx-r1 | sonnet | PASS 0eb3e4b4a41a9123ad7181b39fc14afc60f8ab11 (follow-up C26b QUEUED) |
| C27 buoi-transition | review/buoi-transition @7e80679c | sonnet | REVIEWING (review/buoi-transition-r1, sonnet) — images on CDN |
| C39 tab-underline | review/tab-underline-r1 | sonnet | PASS d8b54d0970ac8591d07163650058485f4bceb818 |
| C40 actcard-small | review/actcard-small-r1 | sonnet | PASS e3664469fbeddf8e7c9fafb851bd1fda73b6354d |
| C28 room-btn | review/room-btn @11afc011 | sonnet | REVIEWING (review/room-btn-r1, sonnet) — icons on CDN |
| C29 rel-picker | review/rel-picker | sonnet | RUNNING |
| C32 page-curl2 | review/page-curl2 | sonnet | QUEUED |
| C33 weekbook-entries | review/weekbook-entries | sonnet | RUNNING |
| C34 contest-ui | review/contest-ui | sonnet | QUEUED |
| C35 pcard-fill | review/pcard-fill | sonnet | QUEUED |
| C37 panel-size | review/panel-size | sonnet | QUEUED |
| C26b stat-fx follow-up | review/stat-fx-2 | sonnet | QUEUED (person card + status tiles re-render with innerHTML so they never glow; add diff-glow on re-render; also make the number turn red on a loss like green on a gain) |
| C46 map-labels | review/map-labels | sonnet | QUEUED |

## PASS (for the main coordinator to fast-forward)
PASS review/tab-underline-r1 d8b54d0970ac8591d07163650058485f4bceb818 (C39; descends from main 2d038139; reviewer added KIT §46 edge-fade docs + observer throttle)
PASS review/actcard-small-r1 e3664469fbeddf8e7c9fafb851bd1fda73b6354d (C40; descends from main 900ace7f; reviewer turned the zoom into kitModal kind info = KIT §8 frame, KIT §43.1 + sample)
PASS review/stat-fx-r1 0eb3e4b4a41a9123ad7181b39fc14afc60f8ab11 (C26; descends from main 900ace7f; top-bar glow green/red + named slow labels + j19 whole-word colour fix)

## CDN
All 6 pending images UPLOADED by Foreman B (11/16): img/fx/buoi-{wash,mist,hills,orb}.webp (C27), img/kit/ico-room.webp + ico-map.webp (C28). Branch review/cdn-pending-b is obsolete (images only; never merge it; delete it — Foreman B's delete push was refused by the server).

## QUESTIONS
- Q1 (Cloudflare): RESOLVED — owner re-saved the token; works.
- Q2 (C26 stat-fx, for review/act-text owner): a gain still listed in a KÈM row should move to ĐƯỢC — stat-fx only fixed its colour; belongs to review/act-text (coordinator's slice).
- Q3 (C27 buoi-transition): night→morning uses a dawn variant (mist + first light). Should a NEW WEEK also get the sky-band overlay on top of the dawn() week-summary screen, or keep dawn() alone?
- Q4 (C27): KIT section §71 used provisionally for the buổi transition (jbuoi.js) — coordinator please confirm/assign the number.
- Q5 (C23 mg-easy): knowledge minigames (Thơ, Câu đối, Đố đèn, Cờ, khảo hạch quiz) now scale with the player's level — low level = Dễ with many aids, high level = harder (more blanks, fewer aids); rewards unchanged. OK with the owner? Also rival NPC scores unchanged, so low-level players clear these more easily (balance look later).
- Q6 (C28 room-btn): under 600 px the room button is icon-only (label in tooltip; a label didn't fit). OK? And should it also appear on landscape/wide screens (it never existed there)?
- Q7 (CDN): RESOLVED — token works, images upload directly.
