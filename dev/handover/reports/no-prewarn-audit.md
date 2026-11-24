# NO PRE-ACTION WARNING AUDIT (KK18, order MAIN 119, owner OD 24/11 ~08:08Z real) — REPORT ONLY, nothing changed

PRIORITY #1 CHECK ('lời nhắc cảnh báo trước khi bấm confirm'): OD 24/11 ~08:08Z (rule itself) + OD:L1480 (16/11 ~22:30Z: "Không muốn bảng màu báo trước … người chơi biết đường rồi, không còn sự bất ngờ") | main: found below | review/* none | claims none.

OWNER RULE (verbatim, OD 24/11 ~08:08Z): "Không có một lời nhắc nào về bất cứ một cái hành động của tôi nha. … Tất cả đều là cái sự lựa chọn, và được hay mất thì là người chơi phải tự rút kinh nghiệm cho lần sau, chứ tôi không có muốn có một cái lời nhắc nào cả."

SCOPE / HONESTY: static scan of origin/main 2308b425 source (dev/build/j*.js, dev/site/swreg.js) + KIT.md; NOT a live play, so texts built from BAL / data tables (j67 / jrd_* / j72sd option data, ~thousands of option strings) are counted by FAMILY, not read one by one. A live pass (bot playing every dialog family, dumping every `.kcf`, `.khint`, `.ka .ef.r`) is the next step if sếp wants a per-string table.

## A. «Are you sure» / confirm dialogs (kitConfirm = KIT §83.9, j79.js:334-342)
| # | place | file:line | text | proposed |
|---|---|---|---|---|
| A1 | mini-game «Quay lại» while a board is live (Thử tay) | j82.js:474 (KG82.backAsk, kg82Ask j82.js:467) | caller's lines (rounds played of this kind are not kept) + «Quay lại / Chơi tiếp» | REMOVE the confirm: back acts at once; the result card says what it cost after |
| A2 | mini-game «Bỏ cuộc» / leave | j82.js:478 (KG82.quitAsk) | «Ván đang chơi dừng lại, tính như thua: 0/10 phần.» / «Chưa chơi mà rời đi thì tính như bỏ cuộc: 0/10 phần.» + «Thưởng phạt theo đúng luật của việc này.» (jtoil «Để mộc» has its own quitAsk) | REMOVE; show the loss on the result card after |
| A3 | «Ra tay ngay» (assign the task to the doer) | jsgame.js:303 (KG82.xdo) | «Ra tay ngay: việc làm theo cơ may {word}. Kết quả hiện ở thẻ kết quả.» | REMOVE the confirm (the odds word stays on the button, law 7) |
| A4 | delete the cloud sổ | jcloud.js:184 (+ rows jcloud.js:145) | «Xóa hẳn sổ trên mây? Sổ trên máy này vẫn còn. … xóa rồi không lấy lại được.» | SYSTEM / account action, not a game action → NEEDS OWNER RULING (keep vs remove); data loss is irreversible |
| A5 | new-build prompt | dev/site/swreg.js:6-7 | «Có bản mới · Mở bản mới ngay?» Để sau / Mở bản mới | system, not a game action → keep (ruling if she disagrees) |
| A6 | the part itself | j79.js:334-346 kitConfirm + `.kbtn.kdanger`, kit sample jkitpage.js:207 | — | if A1-A3 go, kitConfirm has only A4 left; keep the part for A4 or retire with it (KIT.md §83.9 canon overwrite) |
Not found: confirm on delete life / new life / end week / spend / gift / punish (no kitConfirm caller outside A1-A4; `window.confirm(` 0 hits).

## B. Consequence hints BEFORE the action (the big family — touches the option card of EVERY dialog)
| # | place | file:line | what the player sees before choosing | proposed |
|---|---|---|---|---|
| B1 | option card rows «Cần / Tốn / Được / Mất / Kèm / Ghi chú» | j63.js:11 (KA_ROWS), j63.js:109, KIT §6 / §6.2 (jopic) | the loss («Mất»), side effects («Kèm»), gains («Được») of each option | owner decision needed: keep «Cần» (requirement) and «Tốn» (the price paid up front, like a shop price); REMOVE «Mất», «Kèm», «Được»-as-promise, «Ghi chú» → shown only on the result card after (law 3 «được–mất» is kept: it is shown AFTER) |
| B2 | «Gợi ý» word-hint row (kitHint, clarity by Tâm cơ / Tai mắt, BAL.hint*) | jk2b.js:199-300, KIT §28.6, jbal2.js:519 | words like «chịu tiếng nhẹ…», «minh oan được thì kẻ vu oan bị lộ, bị phạt; hỏng thì ngươi mang tội: mất Danh, Sủng, bị phạt» | REMOVE the row (and the Tâm cơ→hint-level link; Tâm cơ keeps its other uses) |
| B3 | the «!» mark + «có rủi ro» risk text on option cards | KIT §6.2 («Tốn / Được / Mất rows, "!"»), jtruth.js:112-118 (H, RK strings per option) | warning mark / risk label | REMOVE the «!»; delete RK/H texts at jtruth.js:112-118 (the 5 «Xin tra sổ… / Gọi làm chứng / Mời Thái y / Trình chứng cứ / Nhận tội» options) |
| B4 | option data strings that carry the loss/gain in words (`j67:"tốn: …"`, `x:`, `rf`/`lx`/`wx` hint words) | jtruth.js:114-118, j67.js (option rows), jrd_*.js, j72sd.js | read by kitHideOut/kitHint into B1/B2 | no change needed once B1/B2 stop printing them; scan again after B1/B2 for stragglers |
| B5 | sample/demo rows in the kit page | jcui.js:93-95 («Khá chắc · tốn: Hồi môn -40 · thành: Gia thanh +2 · hỏng: Áp lực hôn sự +8»), jkitpage samples | demo only | update samples with the new card |
| B6 | «Thang nguy hiểm» + danger word on every rival card («Có thể hại ngươi» / band word) | j24.js:9-12, j24.js:32 (maidWarn), j78.js:42 («mức nguy hiểm với người ấy: …»), j70.js:457 («mức nguy hiểm với ngươi: …»), j85.js:178 | a standing danger readout about OTHER people, not a pre-action reminder about her action | KEEP (information about the world, not a reminder of her action) — list for ruling only |
| B7 | NPC warnings as story events («Lời cảnh báo», maid warns) | j70.js:226/268, j25.js:8, jgreet/jagacts3 «Cảnh báo» act, j95b.js:179 | an NPC tells her something happened/will happen | KEEP (world event, owner's real-world law 6) — list for ruling only |
| B8 | the new-card hint words «Chủ tin» / «Hoàng thượng để ý» (KK16 KIT §13.16, review/kit-framefit) | KIT §13.16 on review/kit-framefit 055baec6 | servant-card hint words | LOOK: these are descriptions of state, not warnings → keep; but they live in the same hint row as B2: if B2 is removed they need a new home |

## C. Odds words on options (law 7) — NOT warnings, KEEP (listed separately as ordered)
- kitOptOdds meter + ladder words (Mong manh / Hiểm / Khó lường / Tùy duyên / Có cơ / Vững / Rất vững; BAL.odds.cut): jk2b.js:207+, jk4.js:1026 (chips), j22.js:34 (oddsCl), jsgame.js:303 («cơ may {word}»).
- «Thẻ không thể hỏng» (kit-nochip 15ecbf0c) already shows NO meter on an option that cannot fail.

## D. Other places checked, nothing to change
- tooltips `title="…"`: 105 hits, all names / «Tranh tạm» (jgrey.js:20) / «Gợi ý: chỉ chỗ ăn…» (j82.js:319 mini-game hint BUTTON she presses herself) → not warnings.
- Vibration / red vignette / shake: all AFTER the action (jfx feedback()), not before.
- Story text that merely says «cẩn thận / coi chừng» inside NPC dialogue or poems (j13.js:57 quẻ «Đại hung, coi chừng mưu hại», jchatl.js, j7.js) = world text / fortune sticks, not a reminder about her action. NOTE j13 quẻ (fortune stick) predicts danger by design — owner call if she counts it.
- No «Bạn có chắc» / «Cẩn thận!» / «Cảnh báo:» literal in any dialog opener outside the items above.

## E. What the change would touch (so MAIN can order it)
1. Kit (me, one branch review/kit-noprewarn): KIT §6 / §6.2 / §28.6 canon OVERWRITE (rows list, remove «!», remove kitHint row), jk2b kitHint/kitHideOut, j63 KA_ROWS, jopic card height (cards get shorter → re-run opt-card-scan, law 10 button size), kit sample page + tests that assert the old rows (dev/test/opt-card-scan.js, odds-meter-back.js, dialog-fixed.js).
2. Mini-games (A1-A3): j82.js / jsgame.js / jtoil.js drop kg82Ask; KG82.backAsk/quitAsk/xdo lines deleted; test dev/test/mg-back.js changes.
3. Content (Foreman D/E): none, option strings stay as data (just no longer printed).
OPEN QUESTIONS FOR sếp (MAIN asks, not me): (a) keep «Tốn» (price) on the card? (b) keep A4 (cloud delete confirm) because it is irreversible data loss? (c) is «Cần» (requirement the option is locked by) allowed? (d) fortune sticks (j13) predicting danger?
