# kit-pcrow-square (KIT keeper, owner-urgent 21/11, OD rows ~02:08Z–02:40Z)

Branch `review/kit-pcrow-square` (merged with LIVE 64d2e094). Kit part only (law 9): `dev/build/jk4.js` (+ jopic sample, KIT.md §6.3 overwritten in place, test `dev/test/pcrow-square.js`).

## What changed (one rule for every tab with the person on the LEFT)
1. **Act card** (`.pc > .pcr button.ka.kart`): ONE square picture (never stretched by text) + title/odds and ONLY Tốn / Được (Thành) on its right; everything else (lead, Cần, Bại, Mất, Kèm, Ghi chú, Vì sao) in ONE full-width info box under (`.kpabox`, `kitPcActSplit`). `kitOptFit0` early-exits for these cards (no more tall 3:4 fill).
2. **Picture size per device** (the approved «Dò hỏi gia thế» sizing): iPad (`html.kv2`) 96, Fold/normal 84, narrow pane (container < 420) 68. One size per device, no media queries.
3. **No bullet note box** on a person card: descriptive `.pcn.kpres` hidden, kit yellow «!» (`.khap.kpcbang`) on the top-right corner of the left figure, tap = kit info popup (subject = that person). Act RESULTS («…: thành/hỏng») stay on the card (feedback, not description) — decision for MAIN.
4. **Rank + name tag centred** over the left figure (two-column card).
5. **One person-tab frame**: top block (pane bar, sub-tabs, strip) FIXED; only the person card scrolls inside itself (`#panel:has(>.pgwrap>.pc)`, also Giao tình `.krelpg`). Verified: strip y unchanged after scrolling panel + card, last act reachable.
6. **Intro lines** of the Hoàng tự tabs (`.pgwrap > .ph`) are hidden; a round «!» at the top-right of the top block opens them; the top block is the same height in kin / kvo / qt (strip top 229 on Fold and iPad).

7. **Figure fills the left column** (her Cung nhân / Hoàng tự shots, now read from the CDN refs): `kitPcKeyFit` no longer shrinks the portrait to fit the key lines (that made the 100 px portrait with empty bands); the left column scrolls with the card. The mother block (`.kpl`) always above the facts table.

## Perf note
quickcheck run 1 and 2 FAILED perf (tabMs +50 %); cause measured in a probe: `#panel:has(...)` selectors (+30 % tab time). Replaced by a class `#panel.kpfr` set from JS; one MutationObserver filtered to panel/pop-up/dialog. Run 3 (ab508edf vs LIVE a88b14f0): QUICKCHECK PASS, tab 445/415 ms, render 228/242, buổi 1087/990, tasks>200ms 18/18. coop-e2e (merged 34763cc7): 92/92.

## Not done / notes
- Cần stays in the info box (verbatim OD: only Tốn/Được beside the picture; MAIN 85 confirmed).
- Hoàng tự «mẹ hoàng tử block left vs above»: forced above the table in CSS (`.pcg.on{display:block}`), identical on Fold and iPad.
- Addendum 8 (Tài nghệ / Tư trang Việc / compact Hành sự act-card grids, one size per device) = second branch `review/kit-act-grid` (agreed with MAIN 85).
- Giao tình (`rel`): no `.pc` card in the test world (relation pair view); frame rule added, scan shows 0 cards.

## Evidence
`node dev/test/pcrow-square.js <url> <out> 755x1000,1180x820 tab-rv,tab-court,tab-staff,tab-kin,tab-kvo,tab-qt,pop-maid,pop-elder` → all PASS (square pic 84 Fold / 96 iPad, only Tốn/Được beside, box under and ≥ 88 % wide, «!» when a note exists, tag centred, frame fixed, top block 229 in kin/kvo/qt). Shots in `img/_review/kit-pcrow-square/`.
