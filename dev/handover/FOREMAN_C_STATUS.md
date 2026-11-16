# FOREMAN_C_STATUS (written ONLY by Foreman C)
Updated: 11/16/2026 ~02:20Z — 12 agents running (cap 12). Owner (16/11, FOREMAN_C.md 65f316ff): max 12 agents, each ≤2 browsers; art workers fill free slots. Went to 15 briefly → paused D1, D7 (WIP pushed), D10 stopped at start.
Connectors (account C): GitHub push OK · Magnific OK (project "Personal" ba4aecfe…) · Cloudflare OK (owner saved token 16/11; verified active, R2 ctm-img listing OK) → workers upload with cdn_sync.py.
Base main at start: 900ace7fb.

| Item | Branch | Model | State |
|---|---|---|---|
| A6 thaiy review | review/thaiy @1445f4315 → review/thaiy-r1 | sonnet | RUNNING (reviewer) |
| A7 cycle review | review/cycle @578384ce9 (after A6; keep jcycle last) | sonnet | QUEUED (waits A6) |
| A8 cal-plus review | review/cal-plus @08c66800a → review/cal-plus-r1 | sonnet | RUNNING (reviewer) |
| A9 promo-rules review | review/promo-rules @53b0084d0 → review/promo-rules-r1 (glow/crack → §68) | opus | RUNNING (reviewer) |
| A11 cardflip review | review/cardflip @1daf0d9d4 → review/cardflip-r1 | sonnet | RUNNING (reviewer) |
| A13 recipes-r1 review | review/recipes-r1 @edf6a92b0 (finish cut review) → review/recipes-r2 | sonnet | RUNNING (reviewer) |
| C18 kit-popup-sample review | review/kit-popup-sample-r1 | sonnet | PASS fa02fc656 |
| C19 pic-dupes-r1 re-review | review/pic-dupes-r2 | sonnet | PASS bc0a1ba24 |
| D10 update-notes popup + Settings "Thông tin cập nhật" | review/update-notes | sonnet | QUEUED (stopped at start, cap 12) |
| C20 act-text resume | review/act-text @593e66b3a | sonnet | RUNNING (worker) — also takes Foreman B Q2 (KÈM gain → ĐƯỢC) |
| C6 mk-colour | review/mk-colour @973729653 | sonnet | RUNNING (worker; presets, vụng looks, lips QA, then reveal scene D28) |
| C7 balance-pass | review/balance-pass @d02658a9d | opus | RUNNING (worker) |
| C8 fig-bg step 2 | review/fig-bg @21eb452d3 | sonnet | RUNNING (worker, silk scroll A) |
| C9 huadian-size | review/huadian-size @cb36de68b | sonnet | RUNNING (worker) |
| D1 result-sfx | review/result-sfx @41899d048 | sonnet | RUNNING (resumed worker) |
| D7 personality + 13 virtues + Thái hậu archetypes | review/personality @6f1ca343a | opus | PAUSED (design + measure tools in PROGRESS; builds on j28 PERS; plan jtrong.js + BAL.trong, 5 Thái hậu archetypes, one greeting rule; resume next) |
| D29 schedules/roster re-port | review/schedules3 (from review/schedules2 + wip/kit-j95) | opus | RUNNING (worker) |
| D-list rest (D2, D3, D6, D9, D11–D20, D22–D27, D44–D53) | — | per item | QUEUED (D30–D34, D36, D38–D42 moved to Foreman B — not ours) |

## PASS (for the main coordinator to fast-forward)
PASS review/pic-dupes-r2 bc0a1ba24ad4eba5ee186b110191ab3c4c3fdf56 (C19; descends from main 900ace7f; hanh-le-v2 on CDN, 0 different-act dupes; only generated index.html/sw.js/assets.json conflicts, rebuilt)

PASS review/kit-popup-sample-r1 fa02fc6565575e284ad7dc1e0c8553cdfcdf400d (C18; descends from main 583858942; 5 pop-up samples on real kitModal, KIT §8; jkitpage.js conflict kept both samples)

## NOTES for session 8 (found by C18 reviewer, outside Slice C)
- Person subject always gets the full-body event-stage figure, even in the ĐIỀU info pop-up (no small 3:4 portrait on main); at 1180 one run drew no figure (figure-load race?) → stage-fig-size (C17, session 8).
- LUẬT 'Bổng lộc' picture is a brown placeholder → Foreman C takes it under D46.
- Option card with tiny portrait icon ('Thưa rằng do Hoàng thượng định') wraps title to 2 lines in the 2-column grid → sent to C20 act-text worker.

## PENDING CDN UPLOAD (account C cannot upload)
(none yet)

## QUESTIONS
- Q1 (D1 result-sfx): sound is OFF by default (OPT.snd=false in j11.js), so new players never hear the win/fail sounds. Turn sound ON by default for new games (old saves keep their choice)? Foreman C recommends ON for new games only.
