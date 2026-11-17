# tinbao-ui report (worker, MAIN s33 job) — review/tinbao-ui e988d2e9 (on review/ag-all-2 4b82a0ca)
PRIORITY #1 CHECK: OD ~14:50Z (2) + ~15:25Z (4)(5) | main none | review/* review/ag-all-2 (API only, no UI) | claims C-AG API owner; this row. START_CTX ~8 % of window.

## What
New module dev/build/jtinbao.js (after jagknow in assemble.py) + KIT.md §87 + kit page sample §87 + test dev/test/tinbao-ui.test.js.
- kitTinBaoBadge: '!' (kitHapMark look, 22 px) in a 34 px kit round button on the top bar; blinks while tinBaoNew()>0, count tag from 2, calm when all seen, absent when nothing. Takes the first FREE spot of the bar (left of seal / under / left of time block) else sits on the seal; never moves the bar layout.
- kitTinBaoToast: gold line under the top bar, 3 s, kitSfx("notice") once, once per item id, no modal; dialog open or item seen = no toast. Shown on every device (not Fold only) — owner may narrow.
- kitTinBaoCard: kitModal kind news (seal TIN): kit fact rows (informer = person via kitFacts who; kit rule OD:L448 adds the informer's full-body figure), unseen first, seen marked "đã xem"; ONE option "Để ta tới xem (· place)" -> marks seen, opens Dư đồ tab. Opening marks all seen.
Deviations: button reads "Để ta tới xem" (kit prints "không được mất gì" only for "Để/Thôi" names; plain "Tới xem" printed a false "xem kết quả ở bước sau"). One button to the Dư đồ tab, not per row: going to a place costs time, player picks on the map; per-row option cards got random act pictures from kitOptPic (looked broken).

## Tests
- dev/test/tinbao-ui.test.js 19/19 PASS (badge count, blink/calm/absent, toast once + one sound + no modal, dialog open no toast, card, Tới xem, old save, API missing / S null, geometry 5 viewports, no page errors).
- quickcheck --runs 3: perf PASS (open 1476 ms, old save ok, render 170/160, tab 407/324, buổi 842/828, tasks>200ms 12/13). CORE GATE G1 FAIL "frozen list grew 5093 -> 6691": inherited from review/ag-all-2 base (my own one-core-guard run: inlineNow 6521 <= 6691, fails 0, so none added by jtinbao). Coordinator must refreeze after ag-all-2 lands.
## Shots (LOOKED, @2) CDN img/_review/tinbao-ui/: fold-badge.png fold-toast.png fold-card.png ipad-badge.png ipad-toast.png ipad-card.png (base https://ctm-img.victoria-tntt.workers.dev/). Wipe with verdict: python3 dev/site/cdn_sync.py --wipe-review tinbao-ui
## Known
- 412x1058 bar is already crammed (seal hides "Buổi sáng"); badge sits on the seal there.
- Natural items in the shots are planted into S.tb; real flow checked with knBao -> tinBaoOn -> toast.
- If ag-all-2 changes the API: rebase.

## r2 (fix of review r1 FAIL) review/tinbao-ui-r2 a0327a6b
Done: (1) each row = informer name+role (kitName), (2) big figure = informer of the first row with a person (spec.subject), (3) place printed once (only when the line lacks it), (4) count tag moved to the badge LEFT corner + free-spot margin 8 px. tinbao-ui.test 19/19, site rebuilt. Shots (LOOKED, Fold+iPad @2) CDN img/_review/tinbao-ui/ (wipe with verdict).

## r3 (owner e + Tai mắt list) review/tinbao-ui-r3b 44500057 (on reviewer PASS 05e82176 / ag-all-2 72263137)
(1) card header "Tai mắt báo". (2) kitTaiMatCard: tap Tai mắt N -> kit list (person, rank/name, where placed, lòng word). (3) each TIN BÁO row names informer kind (tai mắt của ta / người hầu của ta / bạn trong cung / người qua đường); sold-out only when data says discovered. ONE ADAPTER in jtinbao.js: tbTaiMat() / tbInformerKind() read taiMatList(S) / informerInfo(item) when C-AG #2 ships them; until then STUB (her servants by lòng, as many as Tai mắt N; kind from item.by). Test tinbao-ui 22/22. Shots CDN img/_review/tinbao-ui/ (8, Fold+iPad @2). NOTE: old branch review/tinbao-ui-r3 84152ddc (wrong base) left untouched; use r3b.

## r5 review/tinbao-ui-r5 30bb1851 (r4 changes on ag-all-2 7de949ee)
Adapter switched to 2f API: taiMatList(S) (placedAt/placedName/loyaltyKnown null -> "chưa rõ"/reports) and informerInfo(item) (taiMat/ownMaid/friend/passerby, soldOutKnown -> "đã bán đứng ta"); informer person via item.inf (servById / RV / maid). Stub only when the functions are absent. tinbao-ui.test 22/22 (plants a spyFor=me servant). Shots CDN img/_review/tinbao-ui/ refreshed. Branch is ag-all-2 7de949ee + my tinbao source files (r4 patch), site rebuilt.
