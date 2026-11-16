PASS 571dc15e5855bf529449086c03ee7b840784ff7a

# Review: review/name-mask @8b911c73 -> review/name-mask-r1 @571dc15e
Merged current origin/main (conflicts only in generated index.html, sw.js, assets.json: rebuilt with dev/site/build_site.sh). 571dc15e has origin/main as ancestor.

## Small fix made (1)
- j63.js kaResultRows: the stranger aggregate row built its own "N vị chưa quen biết" string (a per-place variant). Now it collects the people and prints through the ONE shared helper kitNameList. Same output ("3 vị chưa quen biết: quý ngươi hơn").

## Checks (one at a time, final build)
| test | 755x1000 | 1180x820 |
|---|---|---|
| name-mask-scan.js (static + live log lines + result rows + palace names) | PASS (27 months, 3208 lines, 0 raw, 0 "???") ; rerun after fix 8 months PASS | worker's 21-month run is too slow here (timeout 900s, browser closed); not re-confirmed, see note |
| NEW name-mask-dom-scan.js: WHOLE rendered DOM (textContent incl. hidden panels, title/aria-label/alt, document.title) + newsHTML + S.logs + Sổ tay notes, after each of N bot steps | PASS (50 steps, 0 raw) | PASS (40 steps, 0 raw) |
| NEW name-mask-oldsave.js: raw names of strangers stored in S.logs/S.news (as an old build wrote them) render masked; a person she HAS met still shows her name | PASS (met "Tống Dao Cầm" shown) | - |
| reign.js | PASS | PASS |
| coop-e2e.js | 59/59 PASS (fold+ipad+solo, old save loads) | |
| panel-size.js | 0 nofit/xOut/btnOut | 0 nofit/xOut/btnOut |
Screenshots 755x1000@2 and 1180x820@2 (Sổ ghi + KẾT QUẢ toast) looked at: "Một vị Quý phi chưa quen biết sang cung ta thăm hỏi.", "2 vị chưa quen biết: có thiện cảm với ta hơn / ghét ta hơn"; no raw name, no "???", rows use the kit's .ef rows (no private chip/frame).

## Verdict on the family
Paths checked: log()/Nhật ký/toasts (write-time mask), result rows, palName/palFn/places, news card, notes, aria/title attrs, DOM mask for stored raw text. No leak found. Met people and her own family still show names. No new kit part, no custom CSS.

## Notes (not blocking, no change made)
1. Mask is baked at write time: after she meets someone, old log lines keep "một vị … chưa quen biết" (worker already flagged; park).
2. Odd line seen in Sổ ghi: "Một vị Thường tại chưa quen biết là người quen cũ, sẵn lòng che chở ta." (an unmet name in a line that says old acquaintance). Wording/logic nit for the owner/foreman.
3. kitKemRow still has its own "người chưa quen" wording (pre-existing, outside this branch).
4. Old-save test injects raw lines into live state (no real saveSlot round-trip).
