# kk51p — KIT person panel B (KK51-P under KK51, reports to MAIN CHÍNH 167)
PRIORITY #1 CHECK: OD «Chọn cách B cho hậu cung» 26/11 ~20:15Z (+ NO FLIP 23:58Z, E-d merge widened) | main none (jk2b kitPcFix/kitPcWide, jk4 §6.4 kitPcScroll/kitPcFitPortrait = the base wrapped) | review/person-panel-b 1d7929a6 jpp.js mock REUSED (layout, tab set, compact-act summary, fit) | claims none.

## LOOK READY — review/kit-person-panel @ 1eb8056e (from LIVE origin/main 4cfcda61; source only, rebuild with `bash dev/site/build_site.sh`)
- `dev/build/jkpp.js` (last module in assemble.py): `kitPP` builds the B layout INSIDE the card, wrapped onto `kitPcFix` + `kitPcKeyFit` (no MutationObserver, no after-paint DOM hack). Slim strip: name + rank + same kit frame at 104 px (strip 116). Right: kit tabs `.pctabs.kppt` Thông tin (.pcf + .kpfacts + .kwear as kit `slot` items, one row) · Giao tình (.kpbars + .pcrows + .kpkey two-way) · Việc (act-group tabs + note + acts). Default Việc, last pick kept. Real nodes moved; stray rows → Thông tin; empty tab = «Chưa rõ.».
- Compact act = kit form `kitActMini(button.ka)` run from kaNorm: title · odds meter · ⓘ / «Tốn … · Được …» (one line, may fold «…», owner OK same OD row) / «Cần: …» only on closed acts. ⓘ = existing kitActZoom enlarge — NO FLIP. Form never adds/splits acts (merge rule upstream).
- `kitPPFit`: 2-column act grid, whole buttons; more than fit → row snap. `kitPPName`: name one line, font 16→11 px to fit, never cut.
- KIT.md §6.4b new; §6.4 LEFT-column/portrait bullets overwritten in place (law 14). Sample page §6.4b (#kit, live consort card).
- Tests: `node dev/test/kit-person-panel.js <url> WxH <out> <tag>` (exit 1 on cut button / scrolling box / tab missing / name cut / tab content scroll), `python3 dev/test/kit-person-panel-scan.py` (family), `node dev/test/kit-person-panel-video.js`.

## Before / after (measure, day-1 life, 12 cards per device: Chí tôn ×3, Phi tần ×3, Nam nhân ×3, Cung nhân ×3, each 3 tabs)
| | portrait (px) / share of screen h | act buttons whole / cut / off-screen | cards scrolling | tab content scrolling | page errors |
|---|---|---|---|---|---|
| LIVE Fold 755x1000 | 225–231 w / 42–44 % | 16 / 3 / 9 of 28 | 11/12 | – | 0 |
| LIVE iPad 1180x820 | 146–153 w / 34–35 % | 11 / 5 / 10 of 26 | 11/12 | – | 0 |
| B Fold | 104x196 / 20 % | 26 / 0 / 0 of 26 | 0/12 | 0 | 0 |
| B iPad | 104x196 / 24 % | 28 / 0 / 0 of 28 | 0/12 | 0 | 0 |
(first iPad pass had Thông tin overflowing 5/12 from the wear row + long names cut in the strip → fixed: wear = kit slot size, name font-fit; re-run 0 faults.)

## Family (law 11, scan script)
| surface | path | status |
|---|---|---|
| Hậu cung Chí tôn / Phi tần / Nam nhân / Cung nhân (j15, j22, j42, jhc, jhcpor, jstaff) | pcard → kitPcFix → kitPP | B, measured + shot both devices |
| Hoàng tự / kế vị / nuôi / hòa thân (jht, j54, jkidlife), Việc nhờ (j72), Kỳ tuyển tú (jkc, jkc2), j0, jk4 cards | same pcard path | B by the same code; NOT shot (no kids/quests/kỳ tuyển on a day-1 life) — reviewer: late save |
| narrow `.kpnar` card (< 440 px, phones) | §6.4 unchanged | not the 2 devices |
| person pop-up kitPersonDlg (jpdlg, §50.2/§84) | event dialog, no act tabs | unchanged (not a person-info panel) |
| face strip pager, Sổ ghi row | mdH avatars | unchanged; strip opens the B card |

## Shots + videos (Fold left, iPad right; looked at 3×)
- https://ctm-img.victoria-tntt.workers.dev/img/_review/kit-person-panel/PAIR-rv-info.jpg · https://ctm-img.victoria-tntt.workers.dev/img/_review/kit-person-panel/PAIR-rv-rel.jpg · https://ctm-img.victoria-tntt.workers.dev/img/_review/kit-person-panel/PAIR-rv-act.jpg · https://ctm-img.victoria-tntt.workers.dev/img/_review/kit-person-panel/PAIR-court-rel.jpg · https://ctm-img.victoria-tntt.workers.dev/img/_review/kit-person-panel/PAIR-staff-act.jpg
- https://ctm-img.victoria-tntt.workers.dev/img/_review/kit-person-panel/B-fold.mp4 · https://ctm-img.victoria-tntt.workers.dev/img/_review/kit-person-panel/B-ipad.mp4 (Hậu cung → Phi tần → tap person → Thông tin → Giao tình → Việc → tap act → result / pick dialog)

## Honest limits
- `dev/test/viecnho-fix.test.js` / `viecnho-scan.js` assert the old §6.4 left-column scroller (`.kplscr`) → they will now fail by design; must be retired or rewritten to §6.4b by the reviewer/KK51.
- Pre-existing duplicate «Tính nết» (info row + facts line with «Hay: …») kept; not mine to cut (the facts line carries the «Hay» text).
- Nam nhân cards have 0 acts on day 1 (same on LIVE). Rank line above the name can take 2 lines for long titles («Thái hậu · Đức Thọ cung») — whole, not cut.
- Nothing landed; CDN review folder img/_review/kit-person-panel/ to wipe at verdict.
~95 % this task / ~0 % in game until land.
