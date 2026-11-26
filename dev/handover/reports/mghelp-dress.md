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

## REVIEW — E95r (session_01DgYSWpXJEYdkTcVgaJDDTj, opus, fresh eyes) — PASS c081852a
START_CTX ~3 %. Merge-ready sha for the coordinator: **review/mghelp-dress-r6 4f377603** = c081852a merged onto origin/main 02f564ae (quickchecked; tree identical to the tested 41e8664a). No code fixed by the reviewer.
PRIORITY #1 CHECK: brief E95 line 1 (OD 'Hướng dẫn' 11 / 'Điểm trang|outfit' 65; review/mg-back, mg-ready-guide, kit-dress-picker already in main) — worker reused kgTut / kg82Back / kitModalClose / toilAct / kitDressFigSrc / kitGameFigRefresh, no new parts. Report has the line. OK.

### (1) E-a «Hướng dẫn» → close = back to the rules, never 0 — OK
- Code: `KG82.tut.back` (= the «Về luật chơi» path) is called from kg82Back, a capture listener on any `.kit-x/#mclose` of the layer holding the guided round, Esc + outside tap on #ov, and kitModalClose (dialog games). One place, kit level (j82 + jk4). The help never starts the clock / charges / scores.
- dev/test/mghelp-back.js: 97/97 on c081852a and on the merge.
- OWN REAL-TAP probe (`shots/mghelp-dress/e95r-realtap-probe.js`; page.mouse at the ✕ centre, real keyboard Escape, a real tap on a point where elementFromPoint = the dim layer), incl. 4 callers NOT in its list (j83 wkPractice, j83 lessonMode self, jrcp teacher, jveil craft — all with a remembered charge `KG82.payOnGo`) + jexam + jpetcare: **Fold 18/18 ok, iPad 18/18 ok, 0 page errors**; after each close: tutorial off, same rules screen with «Sẵn sàng»/«Hướng dẫn», onDone not called, no result, exam raws [], S identical, payOnGo unchanged (nothing charged); a real tap on «Sẵn sàng» afterwards starts the real round (phase play).
- Same probe on bare main 02f564ae: **17 FAIL** (✕ / Esc / outside end the round) → bug reproduced, fix confirmed.
- mg-back.js on the merge: 1–2/12 FAIL, varying per run (item 1/2 = `onTop:false` of the ✕ at the probe instant, item 6 once = ambient `__mkAt` + a visitor ref); main fails item 1 the same way → flaky probe, pre-existing. My real taps on that ✕ always landed.

### (2) E-b Điểm trang tap = worn at once — OK (with an owner-visible caveat, see FOR FOREMAN)
- dress-tap.js PASS 32 (branch + merge); kit-dress-picker.js PASS 19 (merge).
- Own real-tap shots (consort road, Fold + iPad): tap «Áo gấm hoa mai» (phẩm 2) → «Đang mặc» slot + chest badge switch at once, detail with «Tháo» (Fold), figure t1 → t2; tap the old robe → back to t1; Trâm tab tap → worn. Saved: dress-tap reload rows ok.
- Figure fixes verified: (a) j79 kitGameFigRefresh shadowed `o` — real (TDZ), now refreshes; only callers are jtoil (3 places) → no other screen changes. (b) tier off by one: kitDressFigSrc(S,r) on main gives t1,t1,t2,t3 for r=0..3; branch gives t1,t2,t3,t4 (6 lives sampled). Whole family toilPorAt/toilFigAt/kitDressFigSrc all use toilTierAt. Guard `isSrv()` → on the cung nữ road the figure stays (maid dress) — by design.
- KIT §60.2 `.kdpk-fig` sticky: only user of kitDressPicker / .kdpk-fig is toilDressUI (+ its kit sample; Hội phối đồ + co-op redraw call the same function) → consistency scan = 1 part, all places identical. KIT.md §13.9 + §60.2 updated in the same branch. OK (law 9/11, OD:L1093–1095).
- Tư trang «card → Mặc» kept: justified (that tap also opens sell / give / pawn; a blind tap must not spend 1 khắc; owner word names «trang điểm»). NOTE the worker's Tư trang row in dress-tap.js is vacuous (it re-wears the robe already worn: y0 = y1 = k). My own check wears ANOTHER robe: Fold + iPad y_hoanho → y_saxanh, 1 khắc — works. Non-blocking; worth fixing the test later.
- Co-op: the tap goes through the same toilAct → wdWear (reg8 intent) as the old «Mặc» button; quickcheck G4 coop-one-world PASS (seeds 7, 3). coop-thin-f3 (2 clients via the public relay) not run.

### (3) BIG gates — OK
- quickcheck.sh on the merge 41e8664a vs live 02f564ae: G1 one-core, G2 rules-one-source (old save ok), G3 kit-conform, G4 coop-one-world, time-spill, open 2120 ms, OLD SAVE from LIVE loads + plays a buổi, 0 errors.
- FAILs, all reproduced IDENTICALLY on bare LIVE 02f564ae (quickcheck HEAD vs f009e1a6): G4 80-dialog-fixed «kit-dialog-2 a no empty Tốn/Được cell» (Fold + iPad), G4 90-button-crawl «Ô lưu · Lui», perf «live build could not be measured» (tool). → pre-existing, not this branch. (look-dedupe did not fail in my runs.)
- Perf medians (same box, iPad): merge render 109 / tab 436 / buổi 789 ms / long tasks 24 vs bare-live run 167 / 433 / 864 / 23 → no regression.

### (4) Merge onto newest origin/main 02f564ae (brief said f009e1a6; main moved): ONE real conflict dev/build/jtoil.js (main added `toilRankOfFile` next to toilPorAt; kept both) + built files (rebuilt). Pushed as review/mghelp-dress-r6 4f377603.

### (5) Shots / videos (Fold 755x1000@2 + iPad 1180x820@2, real taps, looked at each 3×) — handover branch dev/handover/shots/mghelp-dress/
a1 rules → a2 «Hướng dẫn» (guided Lễ nghi board) → a3 after ✕ = the same rules screen → a4 «Sẵn sàng» plays; b1 dress before → b2 after ONE tap (worn, slot, figure tier) → b3 tap back → b4 Trâm tap; video-realtap-fold/ipad.webm = the whole run. (CDN: no key on this account.)
Seen, not this branch: «KHẢO HẠCH TẤN PHONG UNDEFINED» heading in my shots = harness opened exRun outside an exam window (exPlan without a target); the new-game «Rương đồ khuê các» reveal can sit over the first frame (dismissed by «Nhận» before shooting).

### Laws touched
4 ONE CORE: no numbers added. 9 KIT: shared parts only (kgTut/kg82Back/kitModalClose/kitDressPicker), KIT.md updated. 11 WHOLE GROUP: 12 + my 4 extra callers × paths; every dress-picker place (1 function). 12 devices: Fold + iPad. 15 verbatim owner words in brief + code comments. 16: owner 15/11 «tap shows the info» kept (detail still opens). 18: no new feature. OK.

### FOR FOREMAN E (not blocking, owner-visible)
1. The figure is painted per RANK TIER, not per robe: in my shots she taps a PINK robe and the figure wears a TEAL (Fold) / RED (iPad) dress of that tier; two robes of one phẩm show the same picture; on the cung nữ road it never changes. Code now does all it can; if sếp still says «không thấy mặc», the worker's options stand: (a) per-robe art (Foreman C), (b) a code tint like jcloth. Owner call.
2. iPad: after a tap the piece detail («Tháo» + info) sits below the tall «Đang mặc» column, out of view without scrolling (pre-existing layout; owner 15/11 «tap shows the info»). Kit follow-up candidate.
3. dress-tap.js Tư trang row is vacuous (see above).
VERDICT: **PASS c081852a** (merge-ready: review/mghelp-dress-r6 4f377603).
