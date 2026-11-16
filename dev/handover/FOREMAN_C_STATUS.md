# FOREMAN_C_STATUS (written ONLY by Foreman C)
Updated: 11/16/2026 02:25Z — 12 agents running (cap 12). ONE KIT KEEPER rule (owner 16/11) sent to all 12 agents + PREAMBLE/REVIEWER refreshed.
Connectors (account C): GitHub push OK · Magnific OK (project "Personal" ba4aecfe…) · Cloudflare OK (owner saved token 16/11; verified active, R2 ctm-img listing OK) → workers upload with cdn_sync.py.
Base main at start: 900ace7fb.

| Item | Branch | Model | State |
|---|---|---|---|
| A6 thaiy review | review/thaiy-r1 | sonnet | PASS f7c61f829 |
| A7 cycle review | review/cycle-r1 (contains thaiy-r1) | opus | PASS 7ea3ec447 — kit keeper OK needed for 1-word j19 fix (K6) |
| A8 cal-plus review | review/cal-plus-r1 | sonnet | PASS a151b4939 |
| A9 promo-rules review | review/promo-rules-r1 | opus | PASS 0d425b5a8 — CONDITIONAL on kit keeper sign-off (K4) |
| D46 placeholder pictures | review/placeholder-pics2 @ea2a1777b → -r1 | sonnet | REVIEWING (short; only e68 flowerBloom was missing → drawn + CDN; acts 0/98 placeholder; Bổng lộc + Đoan ngọ already fine on main) |
| D53 opt-pics leftovers (option cards on act placeholder, 62–68 per life; meaning-group choices e.g. 'Ngắt hoa dâng Thái hậu', 'Hẹn hôm khác', 'Cáo bận việc cung'; list in dev/art/MISSING_PICS.md on placeholder-pics2) | review/opt-pics2 | sonnet | RUNNING (art worker; check review/opt-pics (session 8) first) |
| A11 cardflip review | review/cardflip-r1 | sonnet | PASS 6452171fc — CONDITIONAL on kit keeper sign-off (K5) |
| D45 small art (earrings + embroidered shoes, guard 4 indigo, c02-t1-a18 grey skin, Emperor costume audit no Qing hat; + A9 follow-ups: per-rank Đeo eo pendants, mid-rank bangles, per-rank Túi thơm, maid robes per maid rank) | review/small-art | sonnet | RUNNING (art worker) |
| A13 recipes-r1 review | review/recipes-r1 @edf6a92b0 (finish cut review) → review/recipes-r2 | sonnet | RUNNING (reviewer) |
| C18 kit-popup-sample review | review/kit-popup-sample-r1 | sonnet | PASS fa02fc656 |
| C19 pic-dupes-r1 re-review | review/pic-dupes-r2 | sonnet | PASS bc0a1ba24 |
| D10 update-notes popup + Settings "Thông tin cập nhật" | review/update-notes-r1 | sonnet | PASS 8cc6ae7c8 |
| D2 item-art (poem items as calligraphy, incense colours, no-rack dresses, chubby teen pets, 1024 masters) | review/item-art | sonnet | RUNNING (art worker) |
| C20 act-text resume | review/act-text @593e66b3a | sonnet | RUNNING (worker) — also takes Foreman B Q2 (KÈM gain → ĐƯỢC) |
| C6 mk-colour + D28 reveal | review/mk-colour @5025e811b → review/mk-colour-r1 | sonnet | REVIEWING (worker SẴN SÀNG KIỂM; KIT §60.5 toilReveal; mirror-room plate on CDN) |
| C7 balance-pass | review/balance-pass @d02658a9d | opus | RUNNING (worker) |
| C8 fig-bg step 2 | review/fig-bg @acc254846 | sonnet | BUILT, BLOCKED on KIT KEEPER (K1): 14 painted scrolls on CDN, jfigbg.js, KIT §61; tests 6 viewports (390x844 rival dialog img height 0 not investigated; 2-person dialog shows one scroll) |
| C9 huadian-size | review/huadian-size @230e3cf25 | sonnet | RUNNING (worker #2: det2.py ~85% boxes; hand-fix ~100 a18 boxes → mask shrink to 8.5% → sheets per tier/age → CDN; ~5700 files) |
| D1 result-sfx | review/result-sfx @41899d048 | sonnet | RUNNING (resumed worker) |
| D7 personality + 13 virtues + Thái hậu archetypes | review/personality @6f1ca343a | opus | RUNNING (resumed worker) |
| D29 schedules/roster re-port | review/schedules3 (from review/schedules2 + wip/kit-j95) | opus | RUNNING (worker) |
| D-list rest (D3, D6, D9, D11–D20, D22–D27, D44–D53) | — | per item | QUEUED (D30–D34, D36, D38–D42 moved to Foreman B — not ours) |

## PASS (for the main coordinator to fast-forward)
PASS review/pic-dupes-r2 bc0a1ba24ad4eba5ee186b110191ab3c4c3fdf56 (C19; descends from main 900ace7f; hanh-le-v2 on CDN, 0 different-act dupes; only generated index.html/sw.js/assets.json conflicts, rebuilt)

PASS review/kit-popup-sample-r1 fa02fc6565575e284ad7dc1e0c8553cdfcdf400d (C18; descends from main 583858942; 5 pop-up samples on real kitModal, KIT §8; jkitpage.js conflict kept both samples)
PASS review/thaiy-r1 f7c61f829ce0a2cc3653143685e4280977c819e2 (A6; descends from main 583858942; thaiy.js 49/49 at 5 viewports, coop-e2e 59/59; jthaiy after jty in assemble). Note: at top ranks the bạc road (12.5–15% of pay) is cheaper in feel than the 3-khắc/Sức-5 road → handed to C7 balance-pass bạc-equivalence scan, not a blocker.
PASS review/cal-plus-r1 a151b4939fe4713fe10c80f09a3333dd4be5f25b (A8; descends from main 6298d2f55; month-cal.js 5 viewports + seal-events.js pass; note: month-cal 844x390 'desk overlaps' flake also on plain main 1/5 runs; seal once covered 280px2 at 844x390 in one run, 41 later dialogs clean)
PASS review/promo-rules-r1 0d425b5a8665d3891981e4de246c590c1bc2feb3 (A9; descends from main 2afdafc39; CONDITIONAL: kit keeper signs off K4 first; promo-rules 29/29 at 5 viewports, effects now real §68 painted sprites — the branch's calls had wrong signatures so nothing painted ever played; promo-exam 17/18 old-save step fails on main too)
PASS review/cardflip-r1 6452171fce1da8d0cf7f8acca2bee99ed80dff75 (A11; descends from main c36a06321; CONDITIONAL: kit keeper signs off K5; reviewer replaced CSS gold glow with §68 glow-gold; dev/test/cardflip.js timed out (CPU-starved box) → reduced real-browser test at 5 viewports, no errors/overflow; final merge not re-run in browser)
PASS review/update-notes-r1 8cc6ae7c8f63f72436afceed38b4143aa3bc815b (D10; descends from main a523531da; update-notes.js 13/13 at 6 viewports; COORDINATOR: next merged release needs a NEW id in dev/build/jnotes.js CTM_NOTES (e.g. '2026-11-17'), never extra lines under an already-seen id; recipe in dev/PROGRESS_update-notes.md)
PASS review/cycle-r1 7ea3ec447a958971df7fedb41a5d784d4478bb3e (A7; descends from main a523531da AND contains thaiy-r1 f7c61f829 → one fast-forward ships A6+A7; cycle.js ALL OK on final sha at 5 viewports; thaiy 49/49 + coop-e2e 59/59 after 2afdafc39; reviewer raised Kính sự phòng bạc price to ~1/4 of bổng BAL.cyc.read=[10,14,18,24,31,41,54,70], peek odds 35→50, hideMaidO 35; note 2.5 MB of screenshots sit in branch history (commit 7ed80bbae), removed from tree)

## NOTES for session 8 (found by C18 reviewer, outside Slice C)
- Person subject always gets the full-body event-stage figure, even in the ĐIỀU info pop-up (no small 3:4 portrait on main); at 1180 one run drew no figure (figure-load race?) → stage-fig-size (C17, session 8).
- LUẬT 'Bổng lộc' picture is a brown placeholder → Foreman C takes it under D46.
- Option card with tiny portrait icon ('Thưa rằng do Hoàng thượng định') wraps title to 2 lines in the 2-column grid → sent to C20 act-text worker.

## PENDING CDN UPLOAD (account C cannot upload)
(none yet)

## QUESTIONS
- KIT REQUEST K1 (C8 fig-bg step 2, silk hanging scroll A, KIT §61): this IS a kit part (status background layer behind every figure). Under ONE KIT KEEPER, Foreman C stopped building it; worker's spec + art so far will be in review/fig-bg dev/PROGRESS. Built before the rule (no kit change after it): review/fig-bg @acc254846 — touched jfigbg.js (new), jk4.js kitStageFig/kitDpFit hooks, j87.js, jsl.js, KIT.md §61, img/kit/figbg-*.webp (14, on CDN). Session 8: kit keeper please review/own §61 (open: one scroll per person in 2-person dialogs?), then Foreman C gets an independent reviewer on it.
- KIT REQUEST K2 (C6 mk-colour + D28): the makeup reveal adds NEW kit section §60.5 toilReveal (mirror-frame zoom + close card built from kitFaceZoom/kitRows + painted mirror-room plate). Built before the rule; reviewer is checking consistency. Needs kit-keeper approval before fast-forward.
- KIT REQUEST K4 (A9 promo-rules-r1, built before the rule): §65 rank chest via kitReward + kitPersonReveal/.kprev; §66 kitGloom rank-down (kmRankDownHTML) + kitEdict glow; j93 shared motion kit: kmSpark → painted sprites, .kmlight/.kmglow/.kmember/.kmsmoke → painted atlases, .kmlist frame shared with .kprev-card, kitReward .km-long layout. Kit keeper please sign off before fast-forward.
- Q2 (owner, A9): only HER household gains one free servant per rank (up to 5 maids + 4 eunuchs); NPC households stay 4+2 (face pool limited) — breaks 'whatever she has, they have'. Accept, or give NPCs the same?
- Q3 (owner, A9): each rank-up reward set ≈ one month's pay (sold at 50%). Keep or trim?
- Art follow-ups (A9, not blocking): per-rank Đeo eo pendants, middle-rank bangles (vongngoc repeats ranks 0–4), per-rank Túi thơm, maid robes per maid rank, servant-road edict animation → Foreman C will take under D45 small art.
- KIT REQUEST K5 (A11 cardflip-r1, built before the rule): new KIT §67 kitCardFlip (jflip.js: kitCardFlip, cfDemo, cfGrid, BAL.cardFlip, .kcf* CSS, kit-page sample) + shared art img/kit/cf-plate-ksp/emp(+ -p).webp, cf-hand-emp.webp, cf-seal-thitam.webp (on CDN; emp plates 254/268 KB, slightly over budget). Kit keeper please sign off.
- KIT REQUEST K6 (A7 cycle-r1, made 15/11 before the rule): j19.js shared colour rule KRED 'nguy' → 'nguy(?!ệt)' so names with 'Nguyệt' stop turning red. One-word bug fix; kit keeper please approve.
- Q4 (owner, A7): Kính sự phòng book now costs ~1/4 of monthly bổng vs a risky free peek (Năm ăn năm thua). Right weight, or heavier?
- K3 (FYI): C18 kit-popup-sample-r1 PASS adds kit page §8 pop-up samples (sample registration only, no new part) — passed before the rule; kit keeper please confirm.
- Q1 (D1 result-sfx): sound is OFF by default (OPT.snd=false in j11.js), so new players never hear the win/fail sounds. Turn sound ON by default for new games (old saves keep their choice)? Foreman C recommends ON for new games only.

## COORDINATOR ANSWERS (16/11, hourly watch)
- PASSes thaiy-r1, cal-plus-r1, pic-dupes-r2 and kit-popup-sample-r1 → review/merge-train-2 (main session). promo-rules-r1 and cardflip-r1 wait for the KIT KEEPER (review/kit-keeper-1, now running, takes K1–K5). Do not fast-forward or merge them yourselves.
- Q1: sound ON by default for NEW games only; old saves keep their choice. Do it.
- Q2: "whatever she has, they have" holds. NPC households get the same per-rank servant count. Extra NPC servants beyond the face pool exist in data and counts only (never shown with a reused face).
- Q3: keep it (≈ one month's pay, sold at 50%).
- Add to C7 balance-pass (from Foreman B, Q8): raise rival NPC minigame scores (kg82NpcMean) to match the new level-tiered easier minigames, and fix quiz banks where the right answer is often the longest option.
- HOLD (owner 16/11): do NOT fast-forward promo-rules-r1. The owner wants a cap on servants; the proposal is 4 cung nữ + 2 thái giám per household, rank-up = upgrade a servant (better rank/skill), not +1 head. This supersedes my Q2 answer above. Prepare a small rework of the rank-up servant reward on review/promo-rules-r2 once she confirms (coordinator will tell you).
