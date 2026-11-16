# KIT_NUMBERS — ONE registry of KIT.md section numbers (kit keeper, session 8, branch review/kit-keeper-1)
Rule: a new kit part gets its number HERE first (ask the coordinator); a worker never invents a number ("provisional" is not allowed any more). When a branch merges, its heading, its `KIT_SAMPLES` id (`§NN`), its code/test comments "KIT NN" and its PROGRESS must use the number in this table. Section order inside KIT.md does not matter, numbers do. Sub-numbers (§8.1, §43.1, §49.2c, §60.5, §66.2 …) belong to their parent.

| § | Part | Where | State |
|---|---|---|---|
| 0–38 | old kit (supported screens … emotion seal) | main | done (§38 = emotion seal; text says "numbered 36 before") |
| 39 | ẤN TRÂN NỮ · kitSeal | main, jseal.js | done |
| 40 | APP ICON | main | done |
| 41 | kitMeMark | main, jmark.js | done |
| 42 | CLOSE-BUGS RULES | main, jclose.js | done |
| 43 | kitActCompact (+ 43.1 small act card 3:4 / tap detail, review/actcard-small-r1) | main / pcard-fill-r1 | 43.1 awaiting merge |
| **44** | **TOP 15 · LÔ A (jts.js) — was a second "§39" on main** | main | RENUMBER the heading (collision fix) |
| 45 | PANE fixed bar + scroll body | main, jpane.js | done |
| 46 | KIT TABS (sub-tabs, check rows, info gloss; + chip-row edge fade, review/tab-underline-r1) | main / tab-underline-r1 | edge fade awaiting merge |
| 47 | kit sample page | main, jkitpage.js | done |
| 48 | kitNameRank (+ `knr-s` small size, to come with §49.2c fix) | main, jk4.js | done |
| 49 | ÂN OÁN · relations (49.2c compact picker, review/rel-picker-r1; 49.3b face reveal) | main / rel-picker-r1 | 49.2c awaiting fix |
| 50 | kitEventDp | main | done |
| 51 | KIT TABLE (kitRows / kitReqRows) | main | done |
| 52 | kitRelTable / kitRelRows / kitRelDelta (+ 52.1 kitImgSync) | main, jkrel.js | done |
| 53 | event-choice parts (kitHint, kitRisk, kitHintRow, kitKemRow, kitResultSeal) | main | done |
| 54 | item reveal · grade chip · kitLose | main, jkrev.js | done |
| 55 | KHẢO HẠCH TẤN PHONG (promotion exam) | main, jexam.js | done |
| 56 | SCENE LIGHT (KIT_LIGHT, .kown/.kwet) | main, jsl.js | done |
| 57 | kitNumDelta / kitDeltaAuto | main, jkrel.js | done |
| 58 | LỊCH THÁNG (kitMonthCal, kitDeskCal) | main, jmcal.js | done |
| 59 | PLACEHOLDER PICTURES (KIT_PH) | main, jph.js | done |
| 60 | MAKEUP COLOURS (kitSwatches, kitFaceZoom, 60.5 toilReveal) | review/mk-colour | SIGNED+FIX (K2) |
| 61 | FIG-BG silk scroll behind full-body figures | review/fig-bg | NOT SHIPPED (owner 16/11 13:30Z; art kept in storage) |
| 62 | NIGHT-END + NEW-DAY pictures (kitNightEnd, kitNewDay) | review/night-end-r2 | awaiting merge |
| 63 | RECIPES (jrcp.js) | review/recipes-r1 | number reserved; KIT text MISSING on the branch |
| 64 | ITEMS IN EVENTS (kitItemTag, kitItemFx) | main, jitev.js | done |
| 65 | PROMOTION REWARD (rank chest + kitPersonReveal) | review/promo-rules-r1 | SIGNED (K4) |
| 66 | RANK-CHANGE FX (kitEdict / kitGloom) | review/promo-rules-r1 | SIGNED (K4) |
| 67 | LẬT THẺ BÀI · kitCardFlip | review/cardflip-r1 | SIGNED (K5) |
| 68 | PAINTED EFFECTS (kitFxBurst / kitFxSprite / kitFxLight …) | main, jfxkit.js | done |
| 69 | CO-OP BUỔI CLOCK (kitCoopClock) | main, jcooptimer.js | done |
| 70 | ITEM DETAIL (kitItemDetail / kitItemCard / kitItemTap) | main, jitd.js | done |
| **71** | **SHARP PEOPLE · kitFigHD + #kfa** | review/face-sharp-r1 | FINAL (it already writes §71; code and sample use §71) |
| **72** | **LỜI DẪN TÂN THỦ + MỤC TIÊU ĐỜI MÌNH (goal strip, jtut/jgoal)** | review/tutorial-r2 | FINAL (it already writes §72) |
| 73 | PERSON CARD FILL (pcfBlocks) | review/pcard-fill-r1 | FINAL (already §73) |
| **74** | **BUỔI TRANSITION · buoiShift** (was "§71 (coordinator to confirm)") | review/buoi-transition-r1 | MUST RENUMBER: KIT.md heading, `KIT_SAMPLES` id `§71` → `§74`, comments "KIT 71" in jbuoi.js, PROGRESS, test |
| **75** | **kitBackBtnHtml · painted back-to-a-place button** (was "§72 provisional") | review/room-btn-r1 | MUST RENUMBER: KIT.md heading (drop "provisional"), `KIT_SAMPLES` id `§72` → `§75`, comments in jk3.js, room-btn tests/PROGRESS |
| **76** | **kitPalaceMap · palace detail map** (was a second "§71") | review/palace-map-port-r1 | RENUMBERED in merge-train-3 |
| **77** | **kitStageRail · stage icon rail (Lịch · Chat · Mục tiêu)** (owner 16/11) | review/goal-strip-fix-r1 | — |
| **78** | **PLACE ICON kitPlaceIcon + HAPPENING MARK kitHapMark** (was provisional "§71") | review/act-dedupe-r1 | FINAL (kit keeper 16/11) |
| 79+ | free | | next free number is 79 |

Why this order: face-sharp (§71) and tutorial (§72) were already registered by the coordinator in their own branch text ("§72 = coordinator registry; §71 = kitFigHD"), pcard-fill moved itself to §73 to get out of the way; buoi-transition and room-btn only had "to confirm / provisional" labels, so they move.

## Collisions found (scan of main + 280 fetched origin/review/* KIT.md headings, number → different titles)
| Number | Titles that collide | Resolution |
|---|---|---|
| §39 (on main!) | TOP 15 lô A  ×  ẤN TRÂN NỮ kitSeal | Top 15 → §44 |
| §71 | kitFigHD (face-sharp-r1)  ×  buoiShift (buoi-transition-r1) | kitFigHD keeps §71, buoi → §74 |
| §72 | tutorial goal strip (tutorial-r2)  ×  kitBackBtnHtml (room-btn-r1) | tutorial keeps §72, room-btn → §75 |
| §48 | kitNameRank (main)  ×  promo exam (old promo-exam branch text) | main wins; promo exam is §55 (already) |
| §46 | kit tabs (main)  ×  stale copy in tabs-kit-r6 | none, stale |
| §20 / §28 / §31 / §33 / §36 / §37 / §40 / §41 / §42 | stale copies on unmerged old branches (kit-podium, title-screen, emotion, kit-j95, palace-map, tutorial, person-acts, rank0-ivory, close-bugs, kit-table, tabs-kit) | not on main; renumber to §76+ at merge time (see KIT_REQUESTS.md) |
| §60–§70, §73 | no collision | — |
- (16/11, kit keeper 2) §81 = SCENE-END BUTTON (kitSceneEnd / kitSceneEndLabel, j93, review/kit-keeper-2). Next free: §82.
- (16/11, anim-pace) §82 = ONE ANIMATION PACE (BAL.pace / kitPace / --pace, review/anim-pace); coordinator to confirm the number. Next free: §83.
