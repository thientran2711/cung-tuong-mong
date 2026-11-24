# kit-tntile — REVIEW (reviewer 2)

PRIORITY #1 CHECK: OD 24/11 flight bug TAINGHE (tile + pop-up; iPad XL, 2 act columns, smaller act picture) | main: none of kitSkillTile | review/* kit-tntile only | claims: brief b-kit-batch-1941.

## REVIEW r1 — KIT FAIL (8f23c937; merge-base = origin/main 502c48c9, so BARE head == MERGED head)

Build `bash dev/site/build_site.sh` OK.

| # | Check | Result |
|---|-------|--------|
| 1 | `node dev/test/kit-skillacts.js <url> <out> 755x1000,1180x820` | ALL PASS both sizes (tiles 2 equal columns on every Tài nghệ sub-tab; act cards equal per list). BUT the test measures the pop-up in a FAKE host (`#__tnh`, width forced to 884 on iPad), not the real kitModal frame, so it cannot see rows 2-3. |
| 2 | **Real pop-up on iPad 1180x820 (`html.kv2`)** — claim §21e.2 «frame XL `--kpw:min(900px,…)`, act cards in 2 columns, smaller picture» | **FAIL.** Real `ktTnPop('cktt:art:cam')` / `('duc:vir:hanh')` in `#modal .dlg`: width **470 px**, 1 column (`.kskacts>.kpanec` all same `left`), 4 acts stacked, a scroll area present. The `--kpw` rule does not widen the real dialog (a kit rule for `kind:"info"` wins). Shot looked: 470 px wide frame with 4 stacked act cards, big empty frame sides. Owner asked for XL frame + 2 columns on iPad. |
| 3 | Fold 755x1000 real pop | PARTIAL PASS: tall frame h=794 (vh 1000), 1 column, 4 acts, no scroll. Frame is only 470 wide on a 755 screen. |
| 4 | One act-card height per list | Equal heights OK, but the stretch leaves large EMPTY blocks inside short cards (Cầm: «Tự học» and «Các lối, sách phổ» cards have 40-50% blank) — the opposite of the stated goal «no empty block». Hạnh on iPad: «Các lối» card half blank. Fix: size to tallest content and put the 2-column layout on, or keep the rows auto-height. |
| 5 | Tile (Tài nghệ tabs, Fold + iPad) | PASS: 2 equal columns, picture left, all info shown, equal height per sub-tab. Tile heights differ BETWEEN sub-tabs (175 / 197 / 266 px) — law 10 «one fixed size per tier»: KK22 to confirm intended. |
| 6 | Law 11 scan: every Tài nghệ place on tile + pop | Tài nghệ sub-tabs (Tứ đức, Cầm kỳ thi họa, Vũ·Y·Nữ công, Tác phẩm) use `ktTnTile`. Other `kitSkillCard` callers (jkc/jkc2 lễ nghi, jkc3, jrcp «Khẩu vị», jpet, jmood, jgoal) are not Tài nghệ môn cards and keep the card — OK. Tác phẩm tile opens a pop with no acts below level 5 (132 px pop of just the head): confirm intended. |
| 7 | Seen on screens (pre-existing, not this diff) | Visible «GHI CHÚ» rows inside act cards and under the tile list («Bảng tài nghệ hậu cung») — owner rule OD 18/11 L1867 / 21/11 04:30Z says Ghi chú goes behind a kit «!». Not caused by this branch; reported for the whole-group scan. |
| 8 | Quickcheck, old-save load, perf, before/after table | NOT RUN (stopped at first FAIL). |

Fix list for KK22: (a) make the iPad pop-up really XL + 2 columns in the real `#modal` (find the rule that pins the info dialog at 470); (b) change kit-skillacts.js to open the real modal and assert dialog width ≥ 800 + 2 distinct column lefts on 1180x820 (and ≤ 1 column on Fold); (c) remove the empty-block stretch (row 4); (d) answer rows 5-6 with MAIN; resubmit as r2.

KIT FAIL kit-tntile → KK22

~80% done / ~75% playable
