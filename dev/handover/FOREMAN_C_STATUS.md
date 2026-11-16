# FOREMAN_C_STATUS (written ONLY by Foreman C)
Updated: 11/16/2026 02:25Z — 12 agents running (cap 12). ONE KIT KEEPER rule (owner 16/11) sent to all 12 agents + PREAMBLE/REVIEWER refreshed.
Connectors (account C): GitHub push OK · Magnific OK (project "Personal" ba4aecfe…) · Cloudflare OK (owner saved token 16/11; verified active, R2 ctm-img listing OK) → workers upload with cdn_sync.py.
Base main at start: 900ace7fb.

| Item | Branch | Model | State |
|---|---|---|---|
| A6 thaiy review | review/thaiy-r1 | sonnet | PASS f7c61f829 |
| A7 cycle review | review/cycle @578384ce9 merged onto review/thaiy-r1 → review/cycle-r1 (jcycle last) | opus | RUNNING (reviewer) |
| A8 cal-plus review | review/cal-plus-r1 | sonnet | PASS a151b4939 |
| A9 promo-rules review | review/promo-rules @53b0084d0 → review/promo-rules-r1 (glow/crack → §68) | opus | RUNNING (reviewer) |
| A11 cardflip review | review/cardflip @1daf0d9d4 → review/cardflip-r1 | sonnet | RUNNING (reviewer) |
| A13 recipes-r1 review | review/recipes-r1 @edf6a92b0 (finish cut review) → review/recipes-r2 | sonnet | RUNNING (reviewer) |
| C18 kit-popup-sample review | review/kit-popup-sample-r1 | sonnet | PASS fa02fc656 |
| C19 pic-dupes-r1 re-review | review/pic-dupes-r2 | sonnet | PASS bc0a1ba24 |
| D10 update-notes popup + Settings "Thông tin cập nhật" | review/update-notes | sonnet | RUNNING (worker) |
| C20 act-text resume | review/act-text @593e66b3a | sonnet | RUNNING (worker) — also takes Foreman B Q2 (KÈM gain → ĐƯỢC) |
| C6 mk-colour + D28 reveal | review/mk-colour @5025e811b → review/mk-colour-r1 | sonnet | REVIEWING (worker SẴN SÀNG KIỂM; KIT §60.5 toilReveal; mirror-room plate on CDN) |
| C7 balance-pass | review/balance-pass @d02658a9d | opus | RUNNING (worker) |
| C8 fig-bg step 2 | review/fig-bg @acc254846 | sonnet | BUILT, BLOCKED on KIT KEEPER (K1): 14 painted scrolls on CDN, jfigbg.js, KIT §61; tests 6 viewports (390x844 rival dialog img height 0 not investigated; 2-person dialog shows one scroll) |
| C9 huadian-size | review/huadian-size @230e3cf25 | sonnet | RUNNING (worker #2: det2.py ~85% boxes; hand-fix ~100 a18 boxes → mask shrink to 8.5% → sheets per tier/age → CDN; ~5700 files) |
| D1 result-sfx | review/result-sfx @41899d048 | sonnet | RUNNING (resumed worker) |
| D7 personality + 13 virtues + Thái hậu archetypes | review/personality @6f1ca343a | opus | RUNNING (resumed worker) |
| D29 schedules/roster re-port | review/schedules3 (from review/schedules2 + wip/kit-j95) | opus | RUNNING (worker) |
| D-list rest (D2, D3, D6, D9, D11–D20, D22–D27, D44–D53) | — | per item | QUEUED (D30–D34, D36, D38–D42 moved to Foreman B — not ours) |

## PASS (for the main coordinator to fast-forward)
PASS review/pic-dupes-r2 bc0a1ba24ad4eba5ee186b110191ab3c4c3fdf56 (C19; descends from main 900ace7f; hanh-le-v2 on CDN, 0 different-act dupes; only generated index.html/sw.js/assets.json conflicts, rebuilt)

PASS review/kit-popup-sample-r1 fa02fc6565575e284ad7dc1e0c8553cdfcdf400d (C18; descends from main 583858942; 5 pop-up samples on real kitModal, KIT §8; jkitpage.js conflict kept both samples)
PASS review/thaiy-r1 f7c61f829ce0a2cc3653143685e4280977c819e2 (A6; descends from main 583858942; thaiy.js 49/49 at 5 viewports, coop-e2e 59/59; jthaiy after jty in assemble). Note: at top ranks the bạc road (12.5–15% of pay) is cheaper in feel than the 3-khắc/Sức-5 road → handed to C7 balance-pass bạc-equivalence scan, not a blocker.
PASS review/cal-plus-r1 a151b4939fe4713fe10c80f09a3333dd4be5f25b (A8; descends from main 6298d2f55; month-cal.js 5 viewports + seal-events.js pass; note: month-cal 844x390 'desk overlaps' flake also on plain main 1/5 runs; seal once covered 280px2 at 844x390 in one run, 41 later dialogs clean)
NOTE: review/cycle-r1 is built ON TOP of thaiy-r1 — fast-forward thaiy-r1 first (or just cycle-r1 when it passes, it contains both).

## NOTES for session 8 (found by C18 reviewer, outside Slice C)
- Person subject always gets the full-body event-stage figure, even in the ĐIỀU info pop-up (no small 3:4 portrait on main); at 1180 one run drew no figure (figure-load race?) → stage-fig-size (C17, session 8).
- LUẬT 'Bổng lộc' picture is a brown placeholder → Foreman C takes it under D46.
- Option card with tiny portrait icon ('Thưa rằng do Hoàng thượng định') wraps title to 2 lines in the 2-column grid → sent to C20 act-text worker.

## PENDING CDN UPLOAD (account C cannot upload)
(none yet)

## QUESTIONS
- KIT REQUEST K1 (C8 fig-bg step 2, silk hanging scroll A, KIT §61): this IS a kit part (status background layer behind every figure). Under ONE KIT KEEPER, Foreman C stopped building it; worker's spec + art so far will be in review/fig-bg dev/PROGRESS. Built before the rule (no kit change after it): review/fig-bg @acc254846 — touched jfigbg.js (new), jk4.js kitStageFig/kitDpFit hooks, j87.js, jsl.js, KIT.md §61, img/kit/figbg-*.webp (14, on CDN). Session 8: kit keeper please review/own §61 (open: one scroll per person in 2-person dialogs?), then Foreman C gets an independent reviewer on it.
- KIT REQUEST K2 (C6 mk-colour + D28): the makeup reveal adds NEW kit section §60.5 toilReveal (mirror-frame zoom + close card built from kitFaceZoom/kitRows + painted mirror-room plate). Built before the rule; reviewer is checking consistency. Needs kit-keeper approval before fast-forward.
- K3 (FYI): C18 kit-popup-sample-r1 PASS adds kit page §8 pop-up samples (sample registration only, no new part) — passed before the rule; kit keeper please confirm.
- Q1 (D1 result-sfx): sound is OFF by default (OPT.snd=false in j11.js), so new players never hear the win/fail sounds. Turn sound ON by default for new games (old saves keep their choice)? Foreman C recommends ON for new games only.
