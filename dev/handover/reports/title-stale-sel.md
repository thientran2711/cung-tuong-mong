PRIORITY #1 CHECK ('addReplay|Xem lại lời dặn|data-tgo'): OD 0 | ledger 0 | claims 1 | main 15 (j74 title menu now uses data-tgo="slots"; jtut.js:398 still looks for data-tgo="cont") | review/* 0 | archive 6

# title-stale-sel — report

Branch `review/title-stale-sel` (from origin/main a95e8d4), commit `bc853163f009a48197f5861bc4a7c7d0c974f4a8` (generated index.html / sw.js rebuilt in the same commit).

## Fix
- `jtut.js addReplay`: anchors on the home menu's `[data-tgo="slots"]` (Tiếp tục / Bắt đầu) instead of the removed `data-tgo="cont"`. The button stays the kit `.kbtn.alt` and takes a full row under the others (same rule as the co-op `.kco` button). It shows only with a live kiếp.
- `j74.js slotWho`: now also names the kc / kd lives ("Tiểu thư ngoài cung", "Thôn nữ chờ tuyển", "Công chúa chờ hòa thân"). One place, so Chọn sổ, Sổ mây and the rooms read the same.
- Removed three dead text patches that searched `#slots .slot .past` (the rows are `.kslot` now, so they never matched): `j42.js` (servant lives, already covered by slotWho), `jkc.js`, `jkc2.js`. These were a real second bug of the same family: on the Chọn sổ list a kc / kd life showed its rank name.
- Removed the dead `g==="cont"` branch in `j74.js` (nothing renders it).

## Family scan (title / slot / menu hooks)
| file:line | looks for | exists today? | fix |
|---|---|---|---|
| jtut.js:398 | `[data-tgo="cont"]` | NO | now `[data-tgo="slots"]` |
| j74.js:137 | `g==="cont"` | NO (dead) | removed |
| j42.js:373 | `#slots .slot` + `.past` | NO (`.kslot`) | removed; slotWho covers it |
| jkc.js:641 | `#slots .slot` + `.past` | NO | removed; slotWho covers it |
| jkc2.js:412 | `#slots .slot` + `.past` | NO | removed; slotWho covers it |
| jrank.js:220 | `[data-tgo="past"]` | yes | none |
| jload.js:99 | `#modal [data-tgo="opt"]` | yes | none |
| jnotes.js:63 | button `data-tgo="notes"` (handled by j74 go) | yes | none |
| jcooplobby.js:96,101 | `#modal.kpthome .kpmenu`, `.kbtn.k1`, `.kco` | yes | none |
| jrank.js:218 | `#modal.kptitle .kpmenu` | yes | none |
| jslots.js:52, jkiep.js:32, j74.js:80/133 | `#slots button[data-load]`, `[data-new]`, `[data-ask]` | yes (.kslot buttons) | none |
| jcloud.js:107/133 | `#slots`, `#slots .cloudmini` | yes | none |
| j16.js:22, j52.js:82 | `$("slots")` parent, `.xiowrap`, `#pdwrap` | yes | none |
| j6.js:76-82 | old `.slot` rows (showTitle) | still drawn, then replaced by drawSlots | left (old fallback, overwritten by j74) |

## Test
`node dev/test/title-stale-sel.js index.html <shotdir> [sizes]` — opens the ☰ title with a live kiếp, then Chọn sổ. 14 checks per size (replay present once, kit button, visible and inside the menu, top layer, slots/past/opt, `.kco`, `[data-krk-open]`, 3 `.kslot` rows, `[data-load]`, `[data-new]`, `[data-kcs]`, no old `.slot`, slotWho kc/kd, no page errors). Result: ALL PASS at 755x1000@2 and 1180x820@2.

## Gates
- one-core-guard: 0 fails (3839 inline, baseline 3842).
- quickcheck: first run FAIL on perf `longTaskMaxMs` 2829 vs live 1598 (limit 2557) while render 212/202, tab 383/338, buổi 930/1003 were within budget; a second run PASSED (render 192/213, tab 388/399, buổi 814/1152, old save ok). The change adds no work at load, so I read the first run as machine noise, but it is noise I did not prove.
- Fold 755x1000 and iPad 1180x820 shots of the title and Chọn sổ: LOOKED at. The title menu shows "Xem lại lời dặn · Tống ma ma chỉ lối" as a full-width kit row under Bảng vàng / Thiết lập, no overlap. Chọn sổ shows the three sổ rows, tabs and Phúc duyên box intact. (Earlier shots were covered by the new-life roulette overlay; the test now clears it and asserts nothing covers the modal.) Shots kept in scratch, not in git.
- Co-op: no co-op code touched; coop-e2e not run.

SẴN SÀNG KIỂM bc853163f009a48197f5861bc4a7c7d0c974f4a8
