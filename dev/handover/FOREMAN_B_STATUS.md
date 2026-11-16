# FOREMAN_B_STATUS (written ONLY by Foreman B)
Updated: 11/16/2026 01:41Z — 4 workers + 4 reviewers running (8/8).
Connectors (account B): GitHub push OK · Magnific OK (project "Personal" ba4aecfe…) · Cloudflare: token saved on this environment but api.cloudflare.com answers "Invalid API Token"/"Authentication error" (R2 bucket ctm-img) → CDN uploads BLOCKED; workers list new images under "PENDING CDN UPLOAD" in their PROGRESS file.

| Item | Branch | Model | State |
|---|---|---|---|
| C23 mg-easy | review/mg-easy | sonnet | RUNNING |
| C41 tuduc-mg | review/tuduc-mg | sonnet | RUNNING |
| C24 chapter-detail | review/chapter-detail | sonnet | RUNNING (checks tutorial-r2 first) |
| C26 stat-fx | review/stat-fx @ce35ee8c | sonnet | REVIEWING (review/stat-fx-r1, sonnet) |
| C27 buoi-transition | review/buoi-transition @7e80679c | sonnet | REVIEWING (review/buoi-transition-r1, sonnet) — 4 images PENDING CDN, see below |
| C39 tab-underline | review/tab-underline @ca4b2898 | sonnet | REVIEWING (review/tab-underline-r1, sonnet) |
| C40 actcard-small | review/actcard-small @884e8846 | sonnet | REVIEWING (review/actcard-small-r1, sonnet) |
| C28 room-btn | review/room-btn | sonnet | RUNNING (art) |
| C29 rel-picker | review/rel-picker | sonnet | QUEUED |
| C32 page-curl2 | review/page-curl2 | sonnet | QUEUED |
| C33 weekbook-entries | review/weekbook-entries | sonnet | QUEUED |
| C34 contest-ui | review/contest-ui | sonnet | QUEUED |
| C35 pcard-fill | review/pcard-fill | sonnet | QUEUED |
| C37 panel-size | review/panel-size | sonnet | QUEUED |
| C46 map-labels | review/map-labels | sonnet | QUEUED |

## PASS (for the main coordinator to fast-forward)
(none yet)

## PENDING CDN UPLOAD (account B cannot upload; coordinator please upload before/with fast-forward)
- Orphan branch review/cdn-pending-b (images only, never merge it): img/fx/buoi-wash.webp, buoi-mist.webp, buoi-hills.webp, buoi-orb.webp (131 KB) for C27 buoi-transition. Recipe: fetch it, copy img/fx/buoi-*.webp into a main worktree, `python3 dev/site/cdn_sync.py img/fx/buoi-*.webp && bash dev/site/build_site.sh`.

## QUESTIONS
- Q1 (Cloudflare): the token saved for api.cloudflare.com on account B's environment is rejected ("Invalid API Token"). Owner please re-save a valid R2-edit token for api.cloudflare.com in account B's environment network secrets (Settings), or confirm the coordinator (account A) does all CDN uploads from the PENDING CDN UPLOAD lists.
- Q2 (C26 stat-fx, for review/act-text owner): a gain still listed in a KÈM row should move to ĐƯỢC — stat-fx only fixed its colour; belongs to review/act-text (coordinator's slice).
- Q3 (C27 buoi-transition): night→morning uses a dawn variant (mist + first light). Should a NEW WEEK also get the sky-band overlay on top of the dawn() week-summary screen, or keep dawn() alone?
- Q4 (C27): KIT section §71 used provisionally for the buổi transition (jbuoi.js) — coordinator please confirm/assign the number.
