# E95 — review/mghelp-dress (E-a + E-b) — SẴN SÀNG KIỂM c081852a
Worker E95 session_01DgYSWkswMaVgErr9xy4z23 · FOREMAN E child7 · START_CTX ~3 % (context_usage read 0; estimate), finished well under +25 %.

PRIORITY #1 CHECK: OD 'Hướng dẫn' 11 / 'Điểm trang|outfit' 65 | main: j82 §13.7 kgTut + §13.9 kg82Back (mg-back, mg-ready-guide landed), jtoil toilDressUI + kit §60.2 kitDressPicker (kit-dress-picker landed) | review/*: mg-back(-rv), mg-ready-guide(-land), kit-mg-intro(-r2), kit-dress-picker(-rv) — content already in main, nothing unlanded that fixes these bugs; player-dress / toilette / dresscode-r6 branches not on origin | claims: none before E95. Reused: kgTut / kg82Back / kitModalClose / toilAct / kitDressFigSrc / kitGameFigRefresh — no new parts.

Branch `review/mghelp-dress` from LIVE 5e013076: 7f95d74f (E-a) · 08d32986 (E-b + KIT.md) · c081852a (site rebuilt).

## E-a — «Hướng dẫn» then Back scored the exam subject 0 (owner OD 26/11 ~01:25Z item 5)
Cause (reproduced, real click): during the guided round the kit ✕ «Quay lại» ran kg82Back → no back/backPre in an exam → kg82GiveUp → put the rules back then pressed «Sẵn sàng» with giveUp → «Môn 1: 0/10». mg-back had made this on purpose («Hướng dẫn is put back first», then give up); the owner's rule now overrides it.
Fix (j82 + jk4, kit-level, one place):
- `kgTut` exposes `KG82.tut.back` (= «Về luật chơi»: stop the guided round, the SAME rules screen back, handlers kept) and `.el` (its frame).
- `kg82Back`: while `KG82.tut` runs → `tut.back()` and stop. Never give-up / result / close.
- capture listener: ANY kit ✕ (`.kit-x`, `#mclose`, incl. kitXAdd with its own close fn) of the layer holding the guided round → `tut.back()` (care games in `#modal`: the dialog ✕ no longer closes the care dialog mid-help).
- Esc and tap outside on the game frame (#ov) → `tut.back()`; inside a dialog → `kitModalClose` hook → `tut.back()`.
- The help never starts the clock, never charges, never scores (unchanged), so «return to the round unchanged» = the rules screen with «Sẵn sàng» / «Hướng dẫn» / quick option as before.
Scan (dev/test/mghelp-back.js, Fold 755x1000; S JSON identical, exam raws identical, onDone not called, no result; «Sẵn sàng» afterwards starts the real round):

| caller | ✕ Quay lại | dialog ✕ | Esc | tap outside | Về luật chơi | before (main) |
|---|---|---|---|---|---|---|
| jexam khảo hạch | rules back | n/a | rules back | rules back | rules back | ✕ = môn 0/10 |
| startContest hội thi | rules back | n/a | rules back | rules back | rules back | ✕ = give up 0 |
| playArt tự học | rules back | n/a | rules back | rules back | rules back | ✕ = give up 0 |
| jmgcal Thử tay | rules back | n/a | rules back | rules back | rules back | ✕ = kind list |
| jentry tuyển chọn | rules back | n/a | rules back | rules back | rules back | ✕ = 0/10 |
| jslap Tát | rules back | n/a | rules back | rules back | rules back | ✕ = lose |
| jtd Tu đức | rules back | n/a | rules back | rules back | rules back | ✕ = give up |
| jts Hoàng thượng triệu | rules back | n/a | rules back | rules back | rules back | ✕ = lose |
| j92 Chải chuốt | rules back | n/a | rules back | rules back | rules back | ✕ = back out |
| jsgame mưu kế | rules back | n/a | rules back | rules back | rules back | ✕ = 0 odds |
| jroute Nghiệm thân | rules back | n/a | rules back | rules back | rules back | ✕ = «bị nhìn thấy» |
| jpetcare Chăm thú (#modal) | n/a | rules back | rules back | rules back | rules back | dialog ✕ closed care |
(jshelf Chăm cây uses the same dialog path as jpetcare; jtoil has no «Hướng dẫn» (kgReadyCan false); j5 openMG fallback has none.) Result: 97/97 ok, 0 page errors.
No «Hướng dẫn» exists during play (owner OD 20/11 ~05:10Z: no text in play), so there is no mid-round help to pause.

## E-b — Điểm trang: tap a dress, she does not wear it (owner item 4)
Three causes, all fixed in the shared parts:
1. `toilPick`: a tap only SELECTED (gold ring + detail with a «Mặc» button). Now a tap on a piece in the chest wears it at once (toilAct «wear»), stays selected with its detail («Tháo»); a tap on a worn piece only selects; the look is saved at once. Owner 15/11 «tap shows the info» kept (detail still opens).
2. kit j79 `kitGameFigRefresh` NEVER worked: `const …,o=…` inside the try shadowed the option `o` → TDZ ReferenceError swallowed by catch. The game frame's figure column (iPad) kept the first picture forever. Renamed + errors logged. Callers: kitDressPicker, toilDressUI, toilColUI.
3. `toilTierAt` (jtoil, whole family kitDressFigSrc / toilPorAt / toilFigAt): the stand-in `figTierOf` answered the raw rank, her real one (j66, S.pid) answers the 1-based tier → the preview/mirror showed a dress one tier LOWER than worn.
Plus kit §60.2 `.kdpk-fig` sticky with its own height (Fold: once the detail opened the stand stretched and the figure sank under the buttons — pre-existing, but every tap now opens the detail). KIT.md §13.9 + §60.2 updated.
Scan (dev/test/dress-tap.js, real page.click, Fold + iPad, PASS 32):

| device | picker · tab | before (main) | after |
|---|---|---|---|
| Fold / iPad | Điểm trang · Y phục | tap = select only; «Mặc» needed; figure never refreshed (iPad) / one tier low | tap = worn + slot + «Tháo» detail + figure at the dress tier + saved (reload ok) |
| Fold / iPad | Điểm trang · Trâm cài | same | same as above |
| Fold / iPad | Điểm trang · Trang sức | same | same as above |
| Fold / iPad | Tư trang · Y phục (card → «Mặc», 1 khắc) | worn | unchanged, worn — kept as card + «Mặc» on purpose: the bag tap also sells / gives / pawns, a blind tap must not spend a khắc |
| co-op | same toilDressUI / wdWear (intent reg8 «wdWear» in jcoopthinf) | — | same code path, not separately run |

## Tests
- dev/test/mghelp-back.js 97/97 · dev/test/dress-tap.js PASS 32 · kit-dress-picker PASS 19
- mg-back 11/12: the left FAIL «2 Thử tay» = an `onTop` probe of the ✕ (petal veil over it at that instant); every behaviour field true; main fails the same check (pre-existing). Thử tay expectation updated to the new rule (✕ in Hướng dẫn → rules, 2nd ✕ → list).
- player-dress: BAD 56/146 vs main 65/146 (maid-tier rows, pre-existing; not worse). player-dress-old (old=LIVE→new): same as main (1 ok / 2 not, both builds).
- quickcheck.js (open / old save / perf vs LIVE): QUICKCHECK PASS · open 1726 ms · old save ok · render 192/202, tab 512/411, buổi 1439/1367, tasks 24/21.
- core gates (quickcheck.sh): button-crawl «Ô lưu · Lui» FAIL and look-dedupe «mood seal «undefined»» — both reproduced on LIVE main 5e013076 (look-dedupe flaky on both builds) → pre-existing, not this branch.

## Shots (Fold 755x1000@2 + iPad 1180x820@2, looked at each)
CDN upload refused (no R2 credentials in this container: cdn_sync HTTP 400). Shots kept locally at /home/user/wt/e95-shots/: a1-rules / a2-tut / a3-back (exam: rules → «Hướng dẫn» → ✕ → same rules, raws []), dress-tap-fold/ipad. Re-make: `node /home/user/wt/e95-tmp/shots.js` from the worktree, or the tests with a shotdir.

## FOR FOREMAN E (decision, not built)
- The full-body figures are painted per RANK TIER, not per robe: after a tap the figure changes only when the robe's phẩm differs; a green robe of the same phẩm still shows that tier's painting (red in the Fold shot). If sếp still reads that as «không thấy mặc», options: (a) per-robe figure art (art seat), (b) a code tint layer on the robe like jcloth (no new art). Owner call / Foreman C — law 18 freeze applies.
- Pre-existing seen, not touched: the big empty «?» hint button under the Lễ nghi board during «Hướng dẫn»; button-crawl «Ô lưu» Lui on the title screen.
