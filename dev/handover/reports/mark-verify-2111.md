# mark-verify-2111 (strict verify of owner marks vs her verbatim words + older rules)

## Reviewer A (sonnet, session_01Rc5AsNH8m96AMdWBf7vREp) — LIVE marks 5 6 7 8 9 10 11 12 17 18 21 23 37 38 39 42 46
PRIORITY #1 CHECK: OD 21/11 rows ~02:00Z–03:52Z (verbatim read) + OD 16/11 16:10Z, 18/11 ~21:20Z (older rules on same elements) | LIVE main 666def0c | shots: dev/test/fixback-2111.js on 666def0c, Fold 755x1000 + iPad 1180x820, looked.

| # | Her words (short) | Older rule on the same element | After-shot on LIVE | Verdict |
|---|---|---|---|---|
| 5 | trait box «Trọng tài / Mê sắc» repeats → into «!» | — | trait box gone; kit «!» top-right of the Chí tôn figure | OK |
| 6 | act picture SQUARE, right col only Tốn/Được, info box full width below | 02:40Z approved Kén rể card (per-device size) | Phi tần / Chí tôn / Cung nhân cards: square picture, Tốn/Được(Thành), GHI CHÚ in a full-width box | OK (note: label «Thành» vs «Được» mixed in one tab) |
| 7 | small portrait floating; act cards | 18/11 21:20Z figure fills left column | Fold frame ≈ Chí tôn frame; iPad Cung nhân frame ~175px vs Chí tôn ~205px | OK (borderline, kit frame is aspect-fixed) |
| 8 | rank+name tag not centred | 16/11 16:10Z «Rank+name one colour: OK» | tag centred over the column on every left-avatar tab | OK for centring; NOTE two colours (rank coloured, name black) vs the 16/11 «one colour» ruling → kit-rankunit |
| 9 | bullet box → «!» top-right of avatar | — | no bullet box, «!» top-right of the figure on Cung nhân | OK |
| 10 | Ân oán picker too small footprint (3rd time) → compact | 15/11 L898 | one row [Ta ▾] ⇄ [Hoàng thượng ▾], card right under it | OK |
| 11 | relation card compact | 16/11 «boxes equal height/width» | one compact card, two equal boxes (Tần ↔ ta case) | OK |
| 12 | «Chủ vị <cung>, nơi ta ở» | — | «Chủ vị Chung Tú cung, nơi ta ở.» | OK |
| 17 | Hoàng tự card: Fold and iPad must use ONE shared layout (iPad: mother above rows) | 02:30Z «một cái bố cục chung» | Fold: «mẹ hoàng tử» block LEFT, rows RIGHT (2-col); iPad: mother ABOVE rows | **WRONG** — Fold still differs from iPad |
| 18 | person-tab top block (sub-tabs + strip) FIXED, one size, like Hậu cung | 02:38Z fixed frame, intro in «!» | strip + sub-tabs stay at top, same height as Hậu cung, «!» top-right | OK (content short, scroll not exercised) |
| 21 | bag: inline strip under grid, small square left, info, chips in a small box right, no popup | — | strip under grid with square picture + rows + chip column (Sắc +6 / Xa xỉ / Đã biết), Tháo trâm inside | OK |
| 23 | every Tư trang › Việc act card has a picture | KIT 9c | 4 visible cards (Nhờ thái giám, Soát đồ, Sai cung nữ…, Hỏi lộ…) all have pictures; Chợ đen / Xin đồng minh below the fold not seen | OK (partly seen) |
| 37 | in-game Menu panels wide like the title panel | — | Menu, Chọn sổ, Cùng hảo hữu, Sổ luân hồi all one wide frame, buttons aligned | OK |
| 38 | person dialog left column: no empty band under figure, rows up | — | band gone, BUT left column content clipped at the bottom: Fold slot row «Đeo tay / Đeo eo» cut; iPad line «Ghét lễ vật · tác phẩm Nấu…» cut mid-line, no scroll | **PROBABLE WRONG** (rows up yes, now cut off) |
| 39 | mood frame: cause picture + emotion seal in the picture corner | — | cause picture band, round emotion seal at its right corner, title «Hoàng thượng» gold | OK |
| 42 | Lịch tháng = normal month view, ‹ › arrows, square grid, marks/pictures, today, tap day → rows | — | ‹ month › arrows, square cells with marks/picture, rows below; layout is 10-day tuần rows (not 7 columns) | OK (judge: 10-col tuần vs phone 7-col) |
| 46 | death «Kiếp này» alone, no old person dialog on top | — | only «Kiếp này» dialog | OK |

Also found on LIVE (mark #3, already known): the Chí tôn card name «Hoàng thượng» is black, not imperial gold (OD:L1362 / 16/11 16:10Z). It is gold in the Ân oán picker slot and in the mood dialog title, so only the Hậu cung › Chí tôn card is broken.

## Reviewer scope «in-review / landing marks» (3 4 14 25 26 27 28 29 40 41 43 45) — session rv-dialog-dedup reviewer, 21/11 ~05:40Z

| # | Where checked | Verdict | One line |
|---|---|---|---|
| 3 | LIVE 666def0c Fold+iPad, Chí tôn card | **WRONG** | Name «Hoàng thượng» is centred over the frame (OK) and niên hiệu row «NIÊN HIỆU Chính Đức» sits under the portrait (OK), but the name is dark ink rgb(42,26,18) — her older rule OD:L1362 «màu vàng của hoàng gia, màu vàng tươi» + KIT 48.1i (title-only names painted imperial gold; KIT_IMP #ffd400) is broken. Probable cause: chiton-name now passes rank:"Hoàng thượng" AND name:"Hoàng thượng", so kitNameRank's title-only gold branch (`!rank&&KIT_TITLE_ONLY`) is skipped and the name falls to plain `.pcname`. **Same family: Thái hậu name is also dark ink (B.pcname), kit says bronze** → fix the whole group (every title-only name: Hoàng thượng, Thái hậu; card, dialog, list, stage). |
| 4 | LIVE Fold+iPad, Chí tôn + Cung nhân card | OK | One label column: «SỞ TRƯỜNG Dò la / TÍNH CÁCH … / TRỌNG đức / DẠO NÀY …»; no «Hay», no «Chuyện», no repeated «trọng». Minor (not hers): emperor row says «Tính cách», other people say «Tính nết» (jpcf.js) — same element, two words; ask her/keeper, not a FAIL. |
| 14 | review/ui-tour-states 35eb944f (PDF read: 190 pages, 23.9 MB, separate file) | OK (deliverable) — tracker row stale | Separate file of FILLED states (Phe phái with 3 factions, kids, marriage, men, pets, notices, 31 mini-game results, tutorial) as she asked; LIST.md honestly lists what is NOT shown (co-op, mini-game in-play frames, Nam nhân/Thú cưng act dialogs). Built on c3a398dd, not newest main; MARKS row still says «in work». |
| 25 | LIVE Fold+iPad, Tài nghệ › Tứ đức + DOM scan of every tab/sub-tab for stat chips (Sắc/Tài/Tâm cơ/Đức/Danh/Sủng/Bạc/Sức + number) | OK | «Đức 30» chip is gone; scan found 0 HUD-stat repeats on any tab (caveat: scan matches chips whose whole text is «Stat N»; a differently worded repeat would not be caught). |
| 26 | review/chapter-card-2-rv 4a638700 Fold+iPad, Mệnh truyện › Chương này | OK | Big picture banner with «Chương 1 / Nhập cung, đứng vững / Bước 0/5» on it, goals under it, task list + «Đi làm: Hành sự» below. (She first drew picture-left; her next words #27 «hình to ngang luôn» make the full-width banner the accepted form.) |
| 27 | same, Sắc phong / Đã qua / Tâm nguyện / Triều cục / Chương này | **WRONG (partial)** | She said «làm tương tự cho các tab nhỏ khác: đã qua, triều cục, tâm nguyện» + big / full-width picture, rows below. Only Chương này + Triều cục got the big banner. **Sắc phong, Đã qua, Tâm nguyện still show the small ~165 px portrait picture beside the title**, and Đã qua (iPad) / Sắc phong (Fold) leave a big empty white panel underneath = exactly her complaint «trống nhiều quá». 2-column condition rows she liked are kept (OK). Kit consistency: the same Mệnh truyện sub-tab row mixes two hero styles. |
| 28 | same, Triều cục Fold+iPad | OK | Slide carousel: wide picture with «Tân quân lập uy · Chương 1 / Tân quân / Hồi 0/2», counter 1/6, arrow, rows below, no repeated chapter list (DOM: 0 «Chương 2–6 «…»» rows on screen). |
| 29 | same: Mục lục button + popup (Fold+iPad); rv report covers khuê các | OK (partly verified) | Small «Mục lục» button bottom-right of the slide; popup lists all 6 chapters. «Every chapter place in the game»: Mệnh truyện tabs + khuê các verified; home/road/ending chapter screens NOT re-checked by me. |
| 40 | LIVE Fold, maid card (Cung nhân) | OK | Maid card header is «SỞ TRƯỜNG Dò la / DẠO NÀY …»: no «SỞ TRỌNG · SỞ TRƯỜNG» double. Dialog version uses the same jpcf block (code read), not photographed separately (a random event popup covered my dialog shots). |
| 41 | LIVE Fold+iPad, Hoàng thượng card | OK | Words «Đa nghi / Nóng nảy / Lạnh lùng / Trọng tài / tài nghệ» are dotted-underline kit tap-words; tapping «Nóng nảy» opens a popup with only its own meaning; no bullet box; grep: no «dễ nghi» left in source or index.html. |
| 43 | chapter-card-2-rv, chapter dialog Fold+iPad (kitGoalDetail) | OK | Fold: picture 16:9 fills the dialog width; iPad: tall picture fills the left column down to the act cards; no empty band. |
| 45 | review/mg-5s-clear-rv2 8caa9dcd (NOT in main) | **NOT DONE** | Only the backdrop SLOT per subject (KG82_MGBG, img/mgbg-<kind>.webp) with gradient fallback is wired; the tall per-subject art from Foreman C has not landed, so the iPad figure still stands on a plain/gradient box, not «nền liên quan tới môn đó». Must not be called fixed. (She also said: do NOT reuse the board picture — the slot respects that.) |

## WRONG list sent to MAIN 88
#3 (+ Thái hậu same family), #27 (Sắc phong / Đã qua / Tâm nguyện still small picture + empty panel), #45 (art not landed). Notes: #14 tracker row stale; #4 «Tính cách» vs «Tính nết».
