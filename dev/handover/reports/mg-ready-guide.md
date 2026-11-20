# mg-ready-guide — SẴN SÀNG KIỂM 2a17a1ea (worker session_01Rc5AsMmYHY9za4sMP3PYzV, child of MAIN ROOT-72, depth 2)
PRIORITY #1 CHECK: OD 20/11 ~00:20Z (verbatim, owner bug fast lane) · main: KG82_KIND (31 kinds, `how`), kg82Open/kg82Play/kg82Rows, every engine's KG82.peek (reused as the hint hook), j91 k91DemoCard / jsgame / jtd first-time how-to cards (folded into the shared block), BAL.ag.mg2.cal.d (easiest gap) · review/*: none for a rules screen (review/tutorial*, tut-place-ready = story tutorial, not mini-games) · claims: this row only.
START_CTX ~5 % of a 1M window; finished well under the rollover line.

Branch `review/mg-ready-guide` · head **2a17a1ea** (230e5de + the jmgcal save fix) (base origin/main 72f7c0c5, no merge needed — main unchanged at report time).

## What
- **KIT §13.7 (new shared part, j82)** `kgReady(box, spec)` dresses the FIRST screen of every mini-game: rules block `.kgr` («Luật chơi · <môn>», kit rows Môn / Luật or step rows, a small looping picture of the move by engine group — fall / swing / hold / drag / tap — over the board painting, still under reduced motion), the caller's start button becomes **«Sẵn sàng»** ("từ lúc này mới tính giờ"), **«Hướng dẫn»** beside it, the §13.6 quick option kept. Nothing runs before «Sẵn sàng»: no engine, no canvas, no clock chip.
- `kgTut` = «Hướng dẫn»: the SAME engine on the easiest board (mgSet occ hoc, d = min BAL.ag.mg2.cal.d), green bar with the live step (chạm / kéo / giữ / thả / chờ), a ghost hand driven by the engine's own `KG82.peek` (point, drag path, button, hold), unscored (S byte-identical, demo flags off, KG82 tier/lv/occ/ctx/peek/run restored), ends itself after BAL.mgTier.tut.part of the rounds / engine end / tut.ms, or on «Về luật chơi»; returns the SAME first screen (handlers intact); repeatable; ✕ during it keeps nothing.
- Per-engine hint hooks added only where missing: rhythm + aim `KG82.hint` (hand waits on the spot, says «chạm» BAL.mgTier.tut.lead ms before the moment — peek windows were 19–90 ms, too short to follow), hoa điền `KG82.peek` (drag to forehead → tilt → Dán), Nghiệm thân `KG82.peek` («Ra tay» when no gaze). KG82.hint reset in kg82Close.
- Callers wired (one line each): startContest, playArt, jmgcal Thử tay, jexam, jentry, jslap, jtd (step rules now EVERY time, not first time only), jts tsGame, j92 Chải chuốt (own tutor), jsgame mưu kế (steps every time, own tutor), jroute Nghiệm thân (refactored into one play fn for real + guided), j5 openMG fallback (rules + Sẵn sàng; no guided round: old engines have no hint hook, and this path is unreachable in normal play — j83 routes every lesson to playArt).
- Exposed for Foreman E (person-minigame-acts E22): draw the intro, then `kgReady(kg82Box(), {kind})` (or `{n,t,how,tutor}` for an own engine). Documented in KIT.md §13.7 + kit page sample «§13.7».
- BAL: `BAL.mgTier.tut={part:.2,ms:60000,back:1100,lead:260}` (jbal2). mgcal numbers unchanged (rounds 5, gaps -2..2 untouched).
- Rejected: a gate inside kg82Play (would add a second screen and break 26 tests that tap #kg82go) — the rules block sits on the existing intro, so tap count is unchanged.

## Added (ROOT-72, owner bug 20/11): Thử tay save
`jmgcal.js` saved the kind (recSet) only in done() = after «Xem mức tay»; she played 5 rounds of Vẽ, left on the round-5 result, the kind was lost. Now `after()` calls recSet the moment the LAST round's raw arrives (before any button); done() reuses it. Unfinished kinds were and stay unsaved (raws local until round n), so the code never carries a partial kind. Test step 7 (mg-ready-guide.js): no `ve` before; 3 of 5 rounds of Múa then leave → `mua` not in the code; 5 rounds of Vẽ → `ve` in the code while the button still reads «Xem mức tay», and still there after leaving.

## Co-op note (brief point 4)
Read time is on her own screen only; the shared buổi clock is never paused. Conflict noted: the steal game (jsmg) host holds the flip for the friend at most `BAL.steal.mg.coopMs` (120 s) — the friend's reading on the rules screen counts inside that hold (unchanged rule; if she reads long, the hold can expire as before). Not changed (law 16).

## Tests
- `node dev/test/mg-ready-guide.js` (new) **PASS 9/9** on 2a17a1ea (8/8 on 230e5de): 31 kinds × first screen / idle 1.5 s / guided round with hand / unscored / back / Sẵn sàng starts play; self-end by following the hand for rhythm, aim, go, pattern, steps, lamp; 12 callers.
- `bash dev/tools/quickcheck.sh` on b32fcd2 **PASS** (core gates, time-spill, open 1560 ms, old save ok, perf new/live render 213/242, buổi 1188/1567). 230e5de after it = CSS-only (drag demo alignment) + build.
- `node dev/test/ag-mgcal.js` (re-run on 2a17a1ea): all ok except step 3 (2 lines) — **pre-existing, not from this branch**: step 3 checks that `mgCalBand("dan")` is the BAL default band (lo 3 / hi 9.5) when nothing is calibrated, but main 72f7c0c landed the owner's calibration `BAL.ag.mg2.cal.k.dan={b:8.3}`, so the band is 6.3/9.5 and the test's "default" and "other kind untouched / removing it restores" assumptions (it uses dan as the uncalibrated kind) no longer hold. Identical output on a clean origin/main build. Fix belongs to the test (use an uncalibrated kind), not to the game; left untouched here (not my scope).
- `node dev/test/mg-skip-audit.js`: 1 FAIL "jmgcal.js frame without kitQuick" — **pre-existing on main** (owner-only Thử tay screen).

## Shots (LOOKED; CDN img/_review/mg-ready-guide/, wipe with the verdict)
Fold 755x1000@2 + iPad 1180x820@2, rules screen + a guided step, 3 engine types (rhythm Đàn, go Cờ via contest, trace Vẽ):
https://ctm-img.victoria-tntt.workers.dev/img/_review/mg-ready-guide/{fold,ipad}-{dan,co,ve}-{rules,tut}.webp

## Scan table (before = origin/main: the board + clock started on the first tap, the rules only in the small «Cách chơi» line, no tutorial)
| kind / caller | before (main) | after: rules | Sẵn sàng | Hướng dẫn | idle 1.5 s | guided: hand | unscored | back | self-end | play on Sẵn sàng |
|---|---|---|---|---|---|---|---|---|---|---|
| kind / caller | before (main) | after: rules | Sẵn sàng | Hướng dẫn | idle 1.5 s | guided: hand | unscored | back | self-end | play on Sẵn sàng |
| kind dan (rhythm) | clock/board start on the first tap, no rules screen, no tutorial | yes | yes | yes | yes | yes | yes | yes | yes | yes |
| kind hat (hold) | clock/board start on the first tap, no rules screen, no tutorial | yes | yes | yes | yes | yes | yes | yes | – | yes |
| kind co (go) | clock/board start on the first tap, no rules screen, no tutorial | yes | yes | yes | yes | yes | yes | yes | yes | yes |
| kind dauho (fling) | clock/board start on the first tap, no rules screen, no tutorial | yes | yes | yes | yes | yes | yes | yes | – | yes |
| kind ban (aim) | clock/board start on the first tap, no rules screen, no tutorial | yes | yes | yes | yes | yes | yes | yes | yes | yes |
| kind tho (calli) | clock/board start on the first tap, no rules screen, no tutorial | yes | yes | yes | yes | yes | yes | yes | – | yes |
| kind doi (doiline) | clock/board start on the first tap, no rules screen, no tutorial | yes | yes | yes | yes | yes | yes | yes | – | yes |
| kind doden (lamp) | clock/board start on the first tap, no rules screen, no tutorial | yes | yes | yes | yes | yes | yes | yes | yes | yes |
| kind ve (trace) | clock/board start on the first tap, no rules screen, no tutorial | yes | yes | yes | yes | yes | yes | yes | – | yes |
| kind hoa (arrange) | clock/board start on the first tap, no rules screen, no tutorial | yes | yes | yes | yes | yes | yes | yes | – | yes |
| kind theu (pattern) | clock/board start on the first tap, no rules screen, no tutorial | yes | yes | yes | yes | yes | yes | yes | yes | yes |
| kind kim (untangle) | clock/board start on the first tap, no rules screen, no tutorial | yes | yes | yes | yes | yes | yes | yes | – | yes |
| kind mua (steps) | clock/board start on the first tap, no rules screen, no tutorial | yes | yes | yes | yes | yes | yes | yes | yes | yes |
| kind banh (cook) | clock/board start on the first tap, no rules screen, no tutorial | yes | yes | yes | yes | yes | yes | yes | – | yes |
| kind huong (blend) | clock/board start on the first tap, no rules screen, no tutorial | yes | yes | yes | yes | yes | yes | yes | – | yes |
| kind td_cong (tdthread) | clock/board start on the first tap, no rules screen, no tutorial | yes | yes | yes | yes | yes | yes | yes | – | yes |
| kind td_dung (tdwalk) | clock/board start on the first tap, no rules screen, no tutorial | yes | yes | yes | yes | yes | yes | yes | – | yes |
| kind td_ngon (tdtalk) | clock/board start on the first tap, no rules screen, no tutorial | yes | yes | yes | yes | yes | yes | yes | – | yes |
| kind td_hanh (tdalms) | clock/board start on the first tap, no rules screen, no tutorial | yes | yes | yes | yes | yes | yes | yes | – | yes |
| kind chai (groom) | clock/board start on the first tap, no rules screen, no tutorial | yes | yes | yes | yes | yes | yes | yes | – | yes |
| kind le (lay) | clock/board start on the first tap, no rules screen, no tutorial | yes | yes | yes | yes | yes | yes | yes | – | yes |
| kind tc (sort) | clock/board start on the first tap, no rules screen, no tutorial | yes | yes | yes | yes | yes | yes | yes | – | yes |
| kind xa (clue) | clock/board start on the first tap, no rules screen, no tutorial | yes | yes | yes | yes | yes | yes | yes | – | yes |
| kind thq (seat) | clock/board start on the first tap, no rules screen, no tutorial | yes | yes | yes | yes | yes | yes | yes | – | yes |
| kind hoadien (hoadien) | clock/board start on the first tap, no rules screen, no tutorial | yes | yes | yes | yes | yes | yes | yes | – | yes |
| kind duho (tspluck) | clock/board start on the first tap, no rules screen, no tutorial | yes | yes | yes | yes | yes | yes | yes | – | yes |
| kind den (tssteer) | clock/board start on the first tap, no rules screen, no tutorial | yes | yes | yes | yes | yes | yes | yes | – | yes |
| kind tat (slapbar) | clock/board start on the first tap, no rules screen, no tutorial | yes | yes | yes | yes | yes | yes | yes | – | yes |
| kind ne (slapbar) | clock/board start on the first tap, no rules screen, no tutorial | yes | yes | yes | yes | yes | yes | yes | – | yes |
| kind kinh (kinh) | clock/board start on the first tap, no rules screen, no tutorial | yes | yes | yes | yes | yes | yes | yes | – | yes |
| kind may (may) | clock/board start on the first tap, no rules screen, no tutorial | yes | yes | yes | yes | yes | yes | yes | – | yes |
| caller startContest | clock/board start on the first tap, no rules screen, no tutorial | yes | yes | yes | yes | yes | yes | yes | – | yes |
| caller playArt | clock/board start on the first tap, no rules screen, no tutorial | yes | yes | yes | yes | yes | yes | yes | – | yes |
| caller mgcal Thử tay | clock/board start on the first tap, no rules screen, no tutorial | yes | yes | yes | yes | yes | yes | yes | – | yes |
| caller jexam khảo hạch | clock/board start on the first tap, no rules screen, no tutorial | yes | yes | yes | yes | yes | yes | yes | – | yes |
| caller jentry tuyển chọn | clock/board start on the first tap, no rules screen, no tutorial | yes | yes | yes | yes | yes | yes | yes | – | yes |
| caller jslap Tát | clock/board start on the first tap, no rules screen, no tutorial | yes | yes | yes | yes | yes | yes | yes | – | yes |
| caller jtd Tu đức | clock/board start on the first tap, no rules screen, no tutorial | yes | yes | yes | yes | yes | yes | yes | – | yes |
| caller jts Hoàng thượng triệu | clock/board start on the first tap, no rules screen, no tutorial | yes | yes | yes | yes | yes | yes | yes | – | yes |
| caller j92 Chải chuốt | clock/board start on the first tap, no rules screen, no tutorial | yes | yes | yes | yes | yes | yes | yes | – | yes |
| caller jsgame mưu kế | clock/board start on the first tap, no rules screen, no tutorial | yes | yes | yes | yes | yes | yes | yes | – | yes |
| caller jroute Nghiệm thân | clock/board start on the first tap, no rules screen, no tutorial | yes | yes | yes | yes | yes | yes | yes | – | yes |
| caller j5 openMG (fallback) | clock/board start on the first tap, no rules screen, no tutorial | yes | yes | n/a (fallback, no hint hook) | yes | – | – | – | – | yes |

## REVIEW (reviewer session_01Rc5AsMEJ62t26ZVuDW44TB) — **PASS 1916abde** (contains origin/main 72f7c0c5)
PRIORITY #1 CHECK: OD 20/11 ~00:20Z read verbatim | main: kg82Open/kgReady none before | review/*: none | claims: this row.
1. Rules screen first, no clock/engine/canvas before «Sẵn sàng»: PASS — mg-ready-guide 9/9 on 1916abde (31 kinds × 12 callers table, idle 1.5 s, no page errors).
2. «Hướng dẫn»: PASS — ghost hand shown (dan/co/ve looked, Fold + iPad), no clock chip, S byte-identical, back to the same rules screen, repeatable, self-ends for rhythm/aim/go/pattern/steps/lamp.
3. Kit first: PASS — one shared kgReady/kgTut (j82), KIT.md §13.7 +9 lines, kit rows/buttons only; wording cổ trang, no % in player text (only CSS % hits).
4. jmgcal save: PASS — kind saved when round n raw arrives; mid-kind nothing in code (test step 7 ok).
5. Co-op: PASS with note — shared buổi clock not paused; friend's reading counts inside jsmg coopMs (120 s) as before; judged acceptable (law 16, unchanged rule).
6. Tests: quickcheck PASS (189 s, open 1524 ms, old save ok, perf new/live ≈ equal) on 2a17a1ea; 1916abde adds only dev/test/ag-mgcal.js (ran: all ok). ag-mgcal step 3 failed identically on clean main 72f7c0c5 (confirmed), now fixed in the test.
Shots LOOKED (Fold 755x1000@2 + iPad 1180x820@2; rules + guided step; Đàn/Cờ/Vẽ): clean, no overflow/cut text. Mine were kept in scratch, not git.
Minor, not blocking: the Fold rules screen leaves a stray petal over the «Để trời định» button (decor only).
REVIEW r2 (main moved to 72922870 palace-chatter): merged origin/main into review/mg-ready-guide (only index.html/sw.js conflicted → rebuilt by build_site.sh); test fix: the «S identical» check ignores S.pcx (palace-chatter chat memory written by a background chat; otherwise flaky). mg-ready-guide 9/9, ag-mgcal 0 FAIL, quickcheck PASS (197 s, open 1596 ms, old save ok). **PASS 10412615** (contains origin/main 72922870).
