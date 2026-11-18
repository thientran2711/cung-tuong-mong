# nw-quiz report (family C, no word games) — branch review/nw-quiz

## What was replaced by what
| Entry point | Before | After |
|---|---|---|
| Promotion exam, le (Lễ nghi) | quiz engine + EXQ.le bank | `lay` Bày lễ: copy the model altar by dragging objects |
| Promotion exam, tc (Trị cung) | quiz + EXQ.tc | `sort` Phân kho: drag wares into the storeroom with the same sample ware |
| Promotion exam, xa (Xử án) | quiz + EXQ.xa | `clue` Khám vật chứng: tap the suspect whose robe + carried thing match the pictured evidence |
| Promotion exam, thq (Thái hậu hỏi) | quiz + EXQ.thq | `seat` Xếp chỗ ngồi yến: more jade pins = higher rank = nearer Thái hậu |
| Servant / ma ma exam | le round | same new `lay` |
| Tài nghệ lesson «Y thuật & điều hương» (j5 MG.y, YQ quiz) | text quiz | pha-hương game (existing j91 blend) via KG82_MGL |
| banh / huong kinds | already skill games (j91) | unchanged |
Scan (page, after assembly): kinds whose engine is the quiz engine = none; `EXQ` no longer exists; question banks removed from jexam.
Left alone on purpose: tho / doi / doden (families A, B) and the j5 `MG.thi` lesson (câu đối, family A/B). `kg82Quiz` code still exists but no kind uses it (dead code; remove once A/B are merged).

## Design (all in new `dev/build/jnwq.js`; registry hooks: jexam EXK, one line in jsfx, assemble.py, KG82_MGL.y)
- Same easy rules as mg-easy: first-time demo card, Gợi ý button (costs a little), quiet auto-hint at tier 0/1, wrong drop bounces back (tier 0/1), model hides after BAL.nwq.peek s at tier 2.
- Tier = `mgTier(kind, occasion)` if the mg-balance function exists, else `kg82Tier(lv)+BAL.nwq.shift`. **Hook for mg-balance: define `window.mgTier`.** All numbers in `BAL.nwq` (jbal2). Raw stays 0..10, so exam weights (BAL.ex wPlay etc.) and pass bars are unchanged.
- No CSS, no private frame: j82 frame, k91 demo card/buttons, kit slip tiles, existing mg-* paintings only.

## Tests (build = branch + origin/main c4b0c58f)
- Oracle bot, perfect play, tier 0: 10/10 on 755x1000@2, 1000x755@1, 1180x820@2, 1366x1024@2, 390x844@2 for all 4 games; also tier 2 and 4 at 755x1000@2 (le/tc/xa/thq all 10). 0 page errors, 0 horizontal overflow.
- 844x390@2: tc, xa, thq pass; **le fails with the bot**: the board is 260 px high (kg82Canvas floor) and the frame shows ~150 px, so a drag cannot span tray → altar without scrolling. Same limit applies to every tall drag game (e.g. cắm hoa); needs a shared fix in kg82Canvas/frame for short landscape (KIT REQUEST below).
- promo-exam.js: 20/21 at 755x1000@2 + 844x390@3 (incl. a real exam round and result frame). The one FAIL, "old save loads: exam state created…", fails identically on current main (17/18) — pre-existing, not from this branch. Old save from main loads, no page errors.
- Calibration (formula simulation, not the engine bot): raw>=9 ("Xuất sắc") for a player who errs on 20 % of pieces with a few hints = 21–42 % across tiers; 12 % error = 55–70 %; random dropping = 0 % (mean raw 0–1.6). Score = pieces right − 0.8·misses − 0.5·hints (BAL.nwq.miss/hint). Tuyệt phẩm mapping is mg-balance's; retune `miss`/`hint` once its scale is known. NOT run: an engine-level bot with injected mistakes (would take ~1 h of play time).
- Screenshots checked by eye at 755x1000@2 and 844x390@2 (demo cards + play); deleted.

## KIT REQUESTS
1. kg82Canvas floor 260 px / short-landscape frame (844x390): tall drag boards cannot be used without scrolling mid-drag. Kit keeper decision.
2. ART (art paused, nothing painted): suspect busts for Xử án are code-drawn robes with blank faces; need painted suspect busts + torn-cloth clue sprite; a Thái hậu seat/chair picture for Xếp chỗ ngồi; guest tokens use the cream slip tile.

## Owner questions
- None blocking.

SẴN SÀNG KIỂM fc778ccb3f37d0502041e87e3b7fdaf598379a32
