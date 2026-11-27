# KIT-STD-AUDIT report (review/kit-std-audit) — owner OD 27/11 ~04:33Z + ~04:39Z

PRIORITY #1 CHECK: OD 27/11 ~04:33Z + ~04:36Z + ~04:39Z (owner angry: new cards forget the kit standard) | main 066d9af0: KIT.md §6 kaRows/kcls, §11 odds, §42.2 kitNotice, §6.2d tiers; dev/test has per-feature scans (opt-card-scan, sub-odds, notice-scan, kit-conform …) but NO cross-cutting kit-standard scan | review/kk54-plaque b47e6367, review/kit-stage-r9 203c178e, review/kit-person-panel 31f83ba0, review/act-move cadf0346 | claims: KIT-STD-AUDIT only.
KIT CHECK: reuses kaRows/kcls rows, oddsChip/kitOdds, kitRows, kpanel, kitNotice, kit ✕ (the scan only READS them; no kit part changed here).

## 1. Delivered (branch review/kit-std-audit, 2 commits)
| file | what |
|---|---|
| `dev/kit/KIT_CHECKLIST.md` | 6 groups A–F, 66 lines, each = rule quoted verbatim + source tag (KIT § / OD row + time / VP §) + check column `scan:Xnn` or `review`; 21 scan rule ids X01–X21 |
| `dev/test/kit-std-scan.js` | Fold 755x1000 + iPad 1180x820; scenes: every tab (+ sub-tabs), kitPick plaques (resting + lifted), kitRing, a real act → result card, kitNotice chip + panel, «Cách làm» nav panel, person dialog, Bàn bài hand (resting + enlarged). Prints `FAIL <dev> <scene> <Xnn> <selector> — <what>` + per-rule table + JSON. `REPORT_ONLY=1`, `ONLY=…`, `RULES=…`, `SUBS=0` (gate mode) |
| `dev/tools/quickcheck.d/96-kit-std-scan.sh` | G4 hook of coregates: runs the scan (gate mode) and FAILS when a rule count is higher than the frozen LIVE baseline `dev/test/kit-std-baseline.json` (counts may only shrink) |
| `dev/test/kit-std-baseline.json` | LIVE main 066d9af0, gate mode: **20** = X02 6 · X08 2 · X09 7 · X12 3 · X18 2 (full mode with sub-tabs: **72** = X02 30 · X08 5 · X09 31 · X12 4 · X18 2) |
| `dev/handover/WORKER_BRIEF.md` | one KIT CHECK RULE line appended (existing rules untouched) |

COREGATES: added as a G4 hook = report-with-baseline (it cannot pass for LIVE-vs-itself, and a branch that brings kitHand/kitPick/kitRing must bring them clean because LIVE counts 0 there). Once KK55 fixes the LIVE family (section 3) the coordinator lowers the baseline to 0 and the gate is a plain PASS. NOT yet in the committed `dev/tools/coregates.sh` text (G4 picks every `quickcheck.d/*.sh` by itself, so no edit needed).
POINTER for the handover branch (MAIN syncs, I cannot push there): append to `dev/handover/WORKER_BRIEF.md` AND `dev/rules/START_REVIEWER.md` (and START_WORKER) the line «KIT CHECK RULE …» exactly as in this branch's WORKER_BRIEF.md last line.

## 2. Counts per build (kit-std-scan, full mode, both devices; REPORT_ONLY)
| build | total | X01 colour | X02 Tốn row | X03 bare cost | X05 columns | X06 odds | X08 cut | X09 size | X12 order | X13 cover | X18 ✕/Thôi | X21 ✓ |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| LIVE main 066d9af0 | 72 | 0 | 30 | 0 | 0 | 0 | 5 | 31 | 4 | 0 | 2 | 0 |
| review/kk54-plaque b47e6367 (final KK54) | 108 | 0 | 56 | 0 | 0 | 0 | 7 | 31 | 10 | 0 | 2 | 2 |
| review/kit-stage-r9 203c178e (v3) | 65 | 0 | 18 | 0 | 2 | 0 | 23 | 14 | 6 | 0 | 2 | 0 |
| review/act-move cadf0346 (includes kit-person-panel 31f83ba0) | 71 | 0 | 26 | 0 | 0 | 12 | 6 | 25 | 0 | 0 | 2 | 0 |
Progress during the audit (same scan): kit-stage-r9 e5bd409c → 203c178e fixed X01 (Được green / Mất red on the enlarged card, the owner's 04:33Z fault), X13 (enlarged card over the hand row), X03+X06 (bare «Hiểm · Tốn 2 khắc» on the lifted plaque, by merging KK54's plaque), X12 on the hand. KK54's final head b47e6367 builds the plaque with the kit odds bar (X06 0). Measured BEFORE (r9 b1bfc838 + e5bd409c): X01 12/4, X05 6/2, X13 4/0, X03 1, X06 2.

## 3. AUDIT TABLE «part | rule | before | needed fix» (every kit part added/changed since 24/11)
Heads: plaque = kk54-plaque b47e6367; hand = kit-stage-r9 203c178e; others as in section 2. `before` = measured now; fixed items are listed in section 2.
| part | rule (checklist id) | before (measured) | needed fix | owner |
|---|---|---|---|---|
| kitHand enlarged card | A10/X05 one label column | values start at x 553/553/340 (Fold), 778/778/540 (iPad): the Được value is squeezed to a sliver (25 px wide × 110 px tall, «Bạ·c +, Sứ·c +») | restore the kit `.kb` grid in the enlarged card (jkhand.js `.khbi>button.kopinfo .kb` display:flex/inline label rules) | KIT-STAGE-R9 successor |
| kitHand enlarged card | C10/X08 no cut text | Tốn «1 khắc» runs outside the card (Fold); `button.opt.ka.khideout` wider than its card | same fix; the card text must fit its tier | same |
| kitHand on the Hành sự / Tài nghệ rows (kit-hand-rows) | C10/X08 | Tốn line clamped «Tốn 4 khắc · Sức 20 · Bạc 10» (line-clamp cut, 4+3 cards), «Bạc 35», «chờ 2 khắc» outside the card — NEW vs LIVE (LIVE X08 = 1) | show the whole Tốn line (2 lines allowed by §101.10, never clamp) | same |
| kitPick plaque (thẻ lụa) | A7/B2 bare line | FIXED on b47e6367 (kit odds bar + kit Tốn); r9 e5bd409c still had «Hiểm · Tốn 2 khắc» bare (X03/X06) — r9 203c178e merged it | none (r9 already merged) | — |
| kitPick plaque | C6/X12 enabled before dimmed | «Khen tài nghệ nàng ta» listed after the locked «Rỉ tai…» (iPad board) | sort enabled first in the board | KK55 |
| kitPick plaque | C10/X08 | dimmed plaque (`.kfoc-off`) content wider than the plaque | wrap, never cut | KK55 |
| kitPick lifted plaque | C1/X09 | iPad lifted row height 56/60 inside one board (was in r9 run, not in the final kk54 run) | recheck; the lift must not resize | KK55 |
| nav cards «Cách làm» §6.2l/§6.2m | A6/X02 CANON 26/11 ~17:55Z «KEEP ALL … «Tốn: không» … nothing hidden» | `data-knav=1` card «Đi tới · 1 khắc» / «Xem Dư đồ» = one «Ghi chú» row only; jopic.js:304 comment itself says «has no rows» although the canon sentence next to it says keep all | give nav cards the Tốn / Được rows (Tốn 1 khắc · Được: tới <place>, gặp <who>) through kaRows; delete the «has no rows» clause (law 14) | KK55 |
| «Cách làm» panel | §6.2m «!» only when real | yellow «!» disc beside Tốn «1 khắc» | confirm it is a real note or drop | KK55 |
| notice panel «Tin báo» | E2/X18 + X02 | card «Để sau» only closes (a Thôi card, OD 26/11 ~22:43Z «REMOVE every Thôi / Thôi, để sau / Bỏ qua card that only closes») and has no Tốn row | remove it (✕ of the frame closes) or make it a real choice with rows | KK55 |
| notice chip (kitNotice) | E5/X19 | chip + box: 0 findings (X19 false positive on the ring container fixed in the scan) | none | — |
| result card (jnsieve kaResultRows / result-sieve) | F1/X20, A1/X01 | 0 findings on every build (seal THÀNH/BẠI/KẾT QUẢ, kit rows, green/red) | none | — |
| kitRing people ring + kit plaques over it | all | 0 findings on kk54 and r9 (scene ring) | none | — |
| kit-person-panel buttons (`button.kbtn.kppb small`) | B2/X06 | bare ladder word «Mong manh» ×12 (6 per device): person-panel action buttons print the odds as a bare word, not the kit odds chip/bar | build the line with oddsChip/kitOdds (the act card part) | KK55 |
| kit-person-panel / person dialog | D1/X14 | kid portrait `img.kpor` 163×196 = 0.83 (Con cái / Hoàng tự) — LIVE too; the round 58×58 `.kpor` in the picker row is the ruled exception (OD 27/11 ~00:05Z) | decide: kid frames 3:4 like the rest (kit §28.1) | KK55 |
| act-move cards / Hoàng tự family | C1/X09 (C6/X12 FIXED in act-move: 0; still on LIVE/kk54/r9: «Hầu hạ» lists a dimmed card before the enabled «Dâng quà lên Hoàng thượng») | pcb cards 138/157/139, rbtn 152/157, kskacts 138/102, Hành sự cards 259/242 differ in height inside ONE set (31 sets) | grid-auto-rows:1fr must hold for `.pcb`/`.rbtn`/`.kskacts`; sort enabled first (ship act-move's order) | KK55 |
| LIVE act cards (Tài nghệ «Học …», Tư trang «Mua đồ», Hoàng tự «Giao việc phòng bị», «Thêm người») | A6/X02 | 30 cards show NO Tốn row (only Ghi chú / Cần); canon says Tốn stays | fix once in kaRows / kaNorm | KK55 |
| LIVE Hoàng tự record line (`span.krv.kone`) | C10/X08 | «Trong cung: Chương 1: Sơ nhập cung môn.» is ellipsis-truncated (KIT §2: no truncation) | wrap | KK55 |
| picker-dom | — | no part of that name exists on main or any of the 4 branches (git grep, 27/11); pickers scanned = kitPicker (tabs), ring pickers, item pick grids reachable from tabs: 0 findings except X09/X12 above | MAIN: name the branch if it is another one and I scan it | MAIN |
| DOC | law 14 canon overwrite | KIT.md §31.15 still says «Act cards never show an empty Mất row» although OD 26/11 ~17:55Z overwrote it; KIT.md §6 Rules «'không' disappears when a row has a real value» is consistent | edit §31.15 in place | KK55 |

## 4. Not machine-checkable (reviewer lines, with stills Fold + iPad) — see KIT_CHECKLIST.md `review`
A9 one fact per line · A12 «+0» · A14 stats never red · B4 warning line · B8/B9 wording · C7 only options scroll · C8 plaque post · D2 name+rank above figure · D6 relation line shape · D7/D8 avatars / person dialog · D9/D10 chips · E4 outside tap · E6 icons / «!» colour · E7 selected glow · E9 press feedback · F3 thẻ lụa look · F5 re-tap chooses · F6 one kitHand · F7 nav card gain · F8 no figure in event scenes · F9 item info · F10 real objects/people (law 6).
Scan limits (honest): X15 (rank colour) / X16 (relation colour) / X17 (private chip) are text/heuristic — 0 findings means «no obvious case», not proof; the hand and plaque scenes use synthetic options with real kit rows (as the existing kit-hand tests do), so a caller that writes its own text outside kitParse is only caught if it appears on the tabs/result scenes. X04 (marks on choices, OD 26/11 ~22:02Z) found 0 on every build because WORDING-GAIN marks are already on the choice rows.

## 5. Sent / to send
- KIT-STAGE-R9 (session_01Rc5AsKMg34W1bgojBDurBR): batches 1 sent while it ran (X01 X05 X13 X12); it is archived now — the open items above (X05/X08 on the enlarged card, tab clamps) go to MAIN for the next KIT-STAGE worker.
- KK54 → archived, KK55 (session_01Rc5AsHoQ3erAmRFdGGHXRX) got batch 1 (plaque + nav); archived at once after; batch 2 (LIVE family + person panel + doc) is in section 3 for MAIN to give the next kit keeper.
- RV-166: the scan is the first line of every UI review: `SUBS=0 REPORT_ONLY=1 node dev/test/kit-std-scan.js dev/index.html /tmp/o` after `python3 dev/build/assemble.py`; paste the per-rule table; FAIL any rule above the baseline.

## 6. Handover note (context)
No rollover needed; all outputs pushed on review/kit-std-audit. Next steps for whoever continues: (a) KK55-successor fixes section 3 rows → rerun the scan → coordinator lowers `dev/test/kit-std-baseline.json`; (b) add the ring scene with REAL act plaques per person kind and a real result card with several people (sieve) to the scan if the family grows; (c) the scan's synthetic hand options can be replaced by real event frames when the Bàn bài lands on LIVE.
