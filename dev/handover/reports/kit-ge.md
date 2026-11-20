# kit-ge — KIT KEEPER report (K-GE-1 kitBranchMap · K-GE-2 two-tone «Thiên mệnh» plate · K-GE-3 plate-label rows)
PRIORITY #1 CHECK: KIT_REQUESTS.md:85-87 (K-GE-1/2/3 OPEN, E1/E1b) + GAP_LIST GE03/GE04/GE05 + design dev/design/GRAND_ENDINGS.md §2.7, §2.10, §6, §7 | main: geMap() data API (jge.js:187), kitTitlePlate (jtitle.js), kitRows (j79.js) | review/*: none for a node chart (grep kitBranchMap none) | claims: this worker.

Branch `review/kit-ge` @ 5bbdf1ea (from origin/main 66bd36cd, index/sw rebuilt). Kit part only; the page stays off (BAL.ge.mapOn=false) until the build worker mounts it.

## What
- K-GE-1 `kitBranchMap(m,o)` / `kitBranchMapMount(el,m)` / `kitBranchMapOpen(m,key)` (j79.js, KIT §21.2): vertical spine (Nhập cung · .4…11 · ch12 · ch13 · ch14 · Hồi kết nhánh), seen name or dashed «?», chapters behind her SOLID / ahead DOTTED, her round face chip on the chapter she is in, 2 kỳ ngộ hanging off .4/.11, counts chip, 4 ending cards (2 columns on Fold/phone, 4 in a row on kv2) with state word (Còn mở lit · Chỉ còn đường thua dashed red · Đã khép · chương n dim), the 2 title slots (K-GE-2 plates or «?») and the fail node; tap = existing `kitModal` info card (pair in words · condition in words · state · plates · «Ngươi từng đạt: kiếp n»; «?» → «Chưa ai biết ngả này dẫn tới đâu.»). Input = the return of `geMap(branch)` unchanged (checked against a real branch).
- K-GE-2 (jtitle.js, KIT §82.1): `kitTitlePlate` tone from `o.sh` / `t.sh` / the key suffix `ge_<branch>_<n>t|a` (also through the dhObj key `dh-ge_…@pid`): thiện = gold-white + dark-gold text, ác = gold-crimson + cream text; same shape / size / sparkle as the tier-8 plate; painted art not used for a toned plate (CSS until Foreman C draws the two tones).
- K-GE-3 (j79.js, KIT §82.1): a `kitRows` row whose label is a plate (`.krl>.kdh`) stacks: plate on its own line, value full width, at every width; the plate keeps its case. Group = jdh:180, jdh:183, jge:173 (+ any future row of this shape).
- KIT.md §21.2 + §82.1, kit page samples «§21.2» «§82.1», KIT_REQUESTS rows K-GE-1/2/3 → KIT READY. New test `dev/test/kit-ge.js` (64 checks: 3 tones distinct, same height, plate row stacked with value ≥ 90 % width, chart node counts, rail solid/dotted, state words, slots, counts, columns 4 vs 2, no overflow, tap cards, real geMap renders, real dhObj titles get their tone; Fold 755x1000, iPad 1180x820, 412x1058, 390x844).

## Shots (LOOKED; @2, never in git) https://ctm-img.victoria-tntt.workers.dev/img/_review/kit-ge/kit-ge-{fold,ipad,cover,phone}.jpg
= Fold 755x1000, iPad 1180x820, 412x1058, 390x844: the three plates (thiện · ác · plain), the plate-label row (plate above, value full width, one text line per row, no one-letter-per-line), the chart (spine + her face + 4 end cards + counts; below it the same chart from the real geMap, all «?»). Delete with the verdict: `python3 dev/site/cdn_sync.py --wipe-review kit-ge`.

## Tests
- `node dev/test/kit-ge.js` PASS (4 sizes).
- QUICKCHECK (`dev/tools/quickcheck.sh 5bbdf1ea`): QUICKCHECK PASS · 218 s · open 2157 ms · old save ok · perf (median of 3, new/live): render 244/249 ms, tab 430/406 ms, buổi 1610/1651 ms, tasks>200ms 22/20 · core gates PASS (one-core, rules-one-source, kit-conform, hooks).
- Not run: `ge-shots.js` on real game flow (needs minutes per screen; the kit test covers the row shape and the real engine objects instead). golive.sh not run.

## Notes for the build worker (E1)
- Mount: `kitBranchMapMount(hostEl, geMap(b))` inside the Sổ luân hồi page; identity tab row (10) × road rows (4) with the existing kit tab row; tap handling is inside the part (it reads `hostEl.__kbm`), so re-mount after a state change.
- geMap's `spine[].n` for unseen is "?" and `seen` false; for the fixed nodes ch12/13/14 `seen` is undefined → shown by name (as the data says).
