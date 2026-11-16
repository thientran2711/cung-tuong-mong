# FOREMAN_B_STATUS (written ONLY by Foreman B)
Updated: 11/16/2026 — cap 12 (FOREMAN_B.md), each agent ≤2 browsers. All agents were stopped by an owner interrupt ~02:00Z; restarted with owner OK (WIP resumed from worktrees). Running: 9 workers + 3 reviewers (12/12).
Connectors (account B): GitHub push OK · Magnific OK (project "Personal" ba4aecfe…) · Cloudflare OK (owner re-saved the token 11/16; R2 listing verified).

| Item | Branch | Model | State |
|---|---|---|---|
| C23 mg-easy | review/mg-easy-r1 | sonnet | PASS 94644c1e6342eb7ea1003aae090cd5310a9597e5 |
| C41 tuduc-mg | review/tuduc-mg | sonnet | RUNNING (resumed) |
| C24 chapter-detail | review/chapter-detail | sonnet | RUNNING (resumed) |
| C26 stat-fx | review/stat-fx-r1 | sonnet | PASS 0eb3e4b4a41a9123ad7181b39fc14afc60f8ab11 (follow-up C26b QUEUED) |
| C27 buoi-transition | review/buoi-transition-r1 | sonnet | PASS c91bfdc4629fbf4ebf84307f543d44a394ff138b (images on CDN) |
| C39 tab-underline | review/tab-underline-r1 | sonnet | PASS d8b54d0970ac8591d07163650058485f4bceb818 |
| C40 actcard-small | review/actcard-small-r1 | sonnet | PASS e3664469fbeddf8e7c9fafb851bd1fda73b6354d |
| C28 room-btn | review/room-btn-r1 | sonnet | PASS c80e5df978eaffb29ce218b4431e17b415232750 (icons on CDN) |
| C29 rel-picker | review/rel-picker @ac064162 | sonnet | REVIEWING (review/rel-picker-r1, sonnet) |
| C32 page-curl2 | review/page-curl2 | sonnet | QUEUED |
| C33 weekbook-entries | review/weekbook-entries | sonnet | RUNNING (resumed) |
| C34 contest-ui | review/contest-ui | sonnet | RUNNING (art) |
| C35 pcard-fill | review/pcard-fill @85c2c933 | sonnet | REVIEWING (review/pcard-fill-r1, sonnet; renumber its KIT part §71→§73) |
| C37 panel-size | review/panel-size @6e1be2c4 | sonnet | REVIEWING (review/panel-size-r1, sonnet) — merge note: kitDpFit in jk4 conflicts with review/stage-fig-size-r1 (keep its cap/crop + this branch's dw=d.clientWidth line) |
| C26b stat-fx follow-up | review/stat-fx-2 | sonnet | QUEUED (person card + status tiles re-render with innerHTML so they never glow; add diff-glow on re-render; also make the number turn red on a loss like green on a gain) |
| C46 map-labels | review/map-labels | sonnet | QUEUED |
| D32 succession-port | review/succession-port | opus | RUNNING |
| D38 lost-items-port | review/lost-items-port | opus | RUNNING |
| D30 palace-map-port | review/palace-map-port | sonnet | RUNNING |
| D31 difficulty-port | review/difficulty-port | opus | QUEUED (re-measure with Foreman C's C7) |
| D33 routes-port | review/routes-port | opus | QUEUED (re-measure with C7) |
| D34 scheme-games-port | review/scheme-games-port | sonnet | RUNNING |
| D36 leaderboard + Bảng vàng | review/rank-port | sonnet | QUEUED |
| D39 appearance-port | review/appearance-port | sonnet | RUNNING |
| D40 weather-risk-port | review/weather-port | sonnet | QUEUED |
| D41 promote-servants | review/promote-servants | opus | QUEUED (after Foreman C's D29 roster) |
| D42 places-leftovers | review/places-port | sonnet | QUEUED (after D30) |

## PASS (for the main coordinator to fast-forward)
PASS review/tab-underline-r1 d8b54d0970ac8591d07163650058485f4bceb818 (C39; descends from main 2d038139; reviewer added KIT §46 edge-fade docs + observer throttle)
PASS review/actcard-small-r1 e3664469fbeddf8e7c9fafb851bd1fda73b6354d (C40; descends from main 900ace7f; reviewer turned the zoom into kitModal kind info = KIT §8 frame, KIT §43.1 + sample)
PASS review/mg-easy-r1 94644c1e6342eb7ea1003aae090cd5310a9597e5 (C23; knowledge minigames level-tiered + aids; reviewer swapped private .kg82tip → kit .kpnote)
PASS review/buoi-transition-r1 c91bfdc4629fbf4ebf84307f543d44a394ff138b (C27; ink-wash buổi transition, KIT §71 jbuoi.js; 4 images already on CDN)
PASS review/room-btn-r1 c80e5df978eaffb29ce218b4431e17b415232750 (C28; KIT §72 kitBackBtnHtml, painted room/map icons already on CDN; 'Bản đồ'→'Dư đồ' per VANPHONG)
PASS review/stat-fx-r1 0eb3e4b4a41a9123ad7181b39fc14afc60f8ab11 (C26; descends from main 900ace7f; top-bar glow green/red + named slow labels + j19 whole-word colour fix)

## CDN
All 6 pending images UPLOADED by Foreman B (11/16): img/fx/buoi-{wash,mist,hills,orb}.webp (C27), img/kit/ico-room.webp + ico-map.webp (C28). Branch review/cdn-pending-b is obsolete (images only; never merge it; delete it — Foreman B's delete push was refused by the server).

## QUESTIONS
- Q1 (Cloudflare): RESOLVED — owner re-saved the token; works.
- Q2 (C26 stat-fx, for review/act-text owner): a gain still listed in a KÈM row should move to ĐƯỢC — stat-fx only fixed its colour; belongs to review/act-text (coordinator's slice).
- Q3 (C27 buoi-transition): night→morning uses a dawn variant (mist + first light). Should a NEW WEEK also get the sky-band overlay on top of the dawn() week-summary screen, or keep dawn() alone?
- Q4 (C27/C28): KIT sections §71 (buổi transition) and §72 (back button) are used provisionally for the buổi transition (jbuoi.js) — coordinator please confirm/assign the number.
- Q5 (C23 mg-easy): knowledge minigames (Thơ, Câu đối, Đố đèn, Cờ, khảo hạch quiz) now scale with the player's level — low level = Dễ with many aids, high level = harder (more blanks, fewer aids); rewards unchanged. OK with the owner? Also rival NPC scores unchanged, so low-level players clear these more easily (balance look later).
- Q6 (C28 room-btn): under 600 px the room button is icon-only (label in tooltip; a label didn't fit). OK? And should it also appear on landscape/wide screens (it never existed there)?
- Q7 (CDN): RESOLVED — token works, images upload directly.
- Q8 (C23 follow-up, for Foreman C's C7 balance pass): rival NPC minigame scores (kg82NpcMean) unchanged, so low-level players now beat rivals far more easily; and in the lễ/trị cung/xử án quiz banks the right answer is often the longest option (guessable). Suggest C7 or a small worker rebalance/rewrite.
- Q9 (C35 pcard-fill): the game has no per-person 'ghét' (dislike) data — the card shows only known traits/tendencies and the Emperor's known likes. Add dislike data as a design item? Also Thỉnh an stays a talk option of the visit (no free shortcut that would bypass one-talk-per-visit).
- Q10 (C37 panel-size): with one frame size per viewport, short one-line notices now sit in a full-size frame with empty paper (as the rule asks). Owner may want to see it before it goes live.
