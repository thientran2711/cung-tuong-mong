# PROGRESS nw-lantern (branch review/nw-lantern) — family B of the "no word games" rule (OD 16/11 07:20Z)

Goal: the Đố đèn (lantern riddle) minigame is gone everywhere; Nguyên tiêu / Hoa đăng / Trung thu lantern contests play a non-word lantern game.

## Done
- New `dev/build/jlant.js` (loaded after jbal2 in `assemble.py`): engine `lamp` = **Thắp đèn**, 3 rounds, raw 0–10 like every contest game.
  Round 1 "Cùng kiểu": tap every lantern equal to the sample card (shape + colour). Round 2 "Thắp theo hình": light the lanterns so the grid equals the sample grid.
  Round 3 "Treo theo dải": tap tray lanterns in the order of the sample string. Everything needed is on screen (no memory, no words to know).
- Easy rules as mg-easy: Gợi ý button (BAL.lantern.hint), idle auto-hint at tiers 0/1, wrong tap dims and bounces back at tiers 0/1, first-time demo (flag `S.mgSeen.doden2`; old flag `doden` unused).
- Every number: `BAL.lantern` (tier 0/1/2 columns). Difficulty tier: `window.mgTier(kind, ctx)` when it exists (review/mg-balance), else `kg82Tier(player level)`; `BAL.lantern.tier` forces one tier (single param).
- Old game removed: `k91Lantern` (j91), `KG82_DO` riddle bank + quiz bank branch `b:"do"` (j82), `doden-panel` sprite use, "doden" from `KG82_KNOW`. Key `doden` kept (saves, j71 SC7, j82 talent formula, jcui prizes).
- Player text reworded (no riddle): j71 (contest labels, festival lines, FT7 titles, envoy line), j31 + jkc + jmcal + jevban (event/option/calendar/invite text), j72 (akf_den craft), jcui title Trí khôi → Đăng khôi. dev/MINIGAMES.md row, dev/art/ACT_PIC_ALL.md row 480 note.
- Tests: `dev/test/lantern.js` (oracle / skilled / random bots, viewports), `dev/test/lantern-scan.py` (entry-point scan, before/after).

## Not done / open
- Painted lantern art not used for the puzzle tokens (art paused tonight): tokens are code-drawn silhouettes on the existing doden-bg painting. A painted set could replace `lmDraw` later via the kit keeper.
- Final Tuyệt phẩm rate depends on mgTier / j83 thresholds (mg-balance); raw distributions are in the report.
