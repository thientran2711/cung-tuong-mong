# Review: review/act-dedupe @c4679c83e (wave 1 of the owner-approved split AI = Hậu cung / VIỆC = Hành sự / ĐI ĐÂU = Dư đồ) — reviewer r1

Branch reviewed on `review/act-dedupe-r1` = worker c4679c83e + origin/main up to 0a311183f (merge-train-3, goal-strip-fix, kpanel-compact, reign-road).
Rules read: OWNER_DECISIONS 16/11 (L1110 one place per act, L1123/L1137/L1140 split, L1152 scene pop-up, L1153 wave 1), REVIEWER.txt, PREAMBLE.txt.

## Verdict: PASS (with small reviewer fixes and notes below)

## Reviewer fixes on r1
| # | fix | file |
|---|---|---|
| 1 | KIT number: provisional §71 (collides with kitFigHD) → **§78** per kit keeper (KIT.md heading + sample line, `KIT_SAMPLES` id, KIT_NUMBERS.md rows §77 rail / §78 / 79+ free, PROGRESS) | KIT.md, KIT_NUMBERS.md, jact.js |
| 2 | VANPHONG time units: door lock text said "hôm nay" for a per-tuần lock → "đã thỉnh an tuần này", "đã lo việc thẻ bài tuần này", "Đã làm tuần này"; per-buổi door → "Đã làm buổi này" (was always "(ở Dư đồ)" even when done in Hành sự) | jact.js |
| 3 | A shared-door Hành sự card with no picture of its own uses its pop-up twin's act art ("Sai cung nữ đi dò la" → art of "Sai đi dò la"); was the plain category placeholder | jact.js |
| 4 | Grey-card tap: guard against the late touch click raised 800 → 1500 ms (1 of 5 runs at 755x1000 closed the popover at once) | jact.js |
| 5 | Tests: wait for `load` (+3 s) instead of domcontentloaded (first run failed with S undefined), hide the night card-flip overlay `.kcf` that sometimes covered the panel in the viewport test | act-dedupe-w1/deck/vp.js |
| 6 | merges of origin/main (assemble: jact.js stays last, after jkpc.js); site rebuilt | assemble.py, index.html, sw.js, assets.json |

## (1) No act lost — table §(e) checked against jact.js
Every row verified in code: AD_OUT removes 4 Tự học/Tự luyện, Phát chẩn, Tụng kinh, Đánh đàn ở ngự hoa viên, Chữa bệnh cho con, Dạy…/Đưa con…/Luyện cầm kỳ thi họa/Thưởng cung nữ (the last four were already folded by j65 → Tài nghệ / Hoàng tự / Kẻ hầu tab).
Each removed act has a live home: Tài nghệ lessonMode (self/tch/th) + Tác phẩm; Tứ đức lessonVir + `charity()` "Phát bạc cứu giúp cung nhân nghèo"; Hoàng tự "Dạy chữ", "Dẫn đi thỉnh an Hoàng thượng", NEW "Tự bốc thuốc cho con" (kidActs/kidAct heal, same numbers); Kẻ hầu "Thưởng cung nữ"; Ngự hoa viên happening "Đánh đàn chờ ngự giá" (same odds formula and Sủng) + Phô tài in the Emperor pop-up.
Not listed in §(e) but OK: Thưởng cung nữ (j65 already moved it to the Kẻ hầu tab).
Shared locks: Thỉnh an Thái hậu / Hoàng hậu one lock per tuần (`wk()`, the game's day unit) across Hành sự + the pop-up (w1 test: pop-up "đã thỉnh an tuần này" after the Hành sự card). Spying = one family: Hành sự "Cài tai mắt" + "Sai cung nữ đi dò la" / "Nghe ngóng chung" (the maid's own option objects, shared doors), person "Dò la" = ACT.spy, Cung nhân planting. Maid "Tâm sự" twin replaced by the one "Trò chuyện với cung nữ" (per-buổi door).
Note: the Thỉnh an pop-up costs 1 khắc (+ the walk), the Hành sự card 2 khắc; same gains. Acceptable (walking costs khắc), recorded only.

## (2) Hành sự deals every daily card
Deck test (24 deals × 3 buổi × 5 states, 755x1000): ~21 distinct names, 0 study, 0 page errors; Tài nghệ unchanged (Tứ đức 3, Cầm kỳ thi họa 4, Nữ công 4, Tác phẩm 2).
Size: 17–20 cards per buổi (main dealt ~16–17 incl. fixed extras). Grouping: the existing kit category row (k3CatTabs) works on the full deck with counts "làm được n/t": Tất cả 14/19 · Nghỉ ngơi 3/4 · Giao thiệp 3/3 · Học tập·Tài nghệ 3/3 · Mưu kế 3/3 · Đi lại 1/1 · Lễ nghi 1/3. Grey cards = greyscale art + kit chips; tap → kit popover (kpPop) with the reason, inside the screen at all 5 viewports.
Not overwhelming per category; "Tất cả" is a long scroll (each kit act card ~240 px). Suggestions (not blocking): (a) usable cards first inside each tab; (b) the reason popover opens just below the tapped card and can sit over the next card's title.
Balance — growth bot `_t/growbot.js` (reviewer scratch, not committed): random usable Hành sự card each step, dialogs answered at random, 72 tuần = 2 game years. Same script on main and on the branch:

| build | lives (72 tuần or death) | rank end | Danh | Sủng | arts total | Bạc end | acts / life | cards dealt / buổi |
|---|---|---|---|---|---|---|---|---|
| main 7f20b751 | 6 | 5†, 0†, 3, 1, 3, 3† | 100, 28, 5, 18, 41, 41 | 100, 28, 99, 100, 100, 99 | 14, 10, 12, 13, 16, 11 | 2–199 | 330–643 | 16.0–17.1 |
| branch | 4 | 3, 2, 1, 0† | 42, 0, 5, 5 | 95, 46, 74, 99 | 0, 1, 2, 2 | 4–8 | 504–637 | 19.4–19.9 |

No speed-up: khắc caps the number of acts per buổi, so dealing every card does not raise the pace; the Hành sự-only player grows SLOWER in arts (study now only in Tài nghệ, by design) and in Danh (Phát chẩn Danh +7 removed; the one charity is monthly Danh +1). Flag for the BAL owner (opus): Danh sources after the dedupe should be re-checked against the promotion targets (Danh gates in promoReq). Small sample: Chromium renderers crashed several times (shared machine memory, also on main), so only 10 lives finished.

## (3) Tài nghệ / Tứ đức
No study of any art in Hành sự (deck test, bot cards played) and none at places (Thái y viện "Học hỏi y lý" removed; remaining "Học…" options are servant-road only). Charity/virtue only in Tứ đức (Phát chẩn, Tụng kinh, Lãnh cung "Đưa cơm áo" gone).

## (4) Dư đồ
- Icons: kitPlaceIcon (§78, kit icon set `ic()`) on map label, list tile and stage title — one part, same look in all three. 7 of 19 places have a glyph (vuon, kn, dtd, thu, tn, tyv, nvp).
  **KIT REQUEST (extend the worker's list):** glyphs for Kính sự phòng, Lãnh cung (Trường Môn viện), tẩm cung / cung phi tần r2–r5, and the places that came with merge-train-3: Dãy nhà cung nhân (cnh), Tân Giả khố (tgk), Thượng thư phòng (ttp), A ca sở (acs), Đông cung (dc). Until drawn they show no icon (no private glyphs used).
- Silhouettes: no face images on place names (w1 test n=0; maplab scan).
- "!" ≤2 per buổi: adHapRoll caps n at 2 (65 % one, 35 % of those two). 300 buổi: 218 marks (0.73 / buổi).
- Happenings fire on arrival (w1: 22–27 fired: gossip, quarrel, favour). Emperor stroll: he is in Ngự hoa viên 52/300 buổi but the stroll mark came up 9/300 (it competes for the 1–2 slots) → "Đánh đàn chờ ngự giá" is rare. Recommendation (not blocking): when the Emperor is in the garden, give the stroll the first slot.
- Tap a person on the scene: opens the stage pop-up (#popw, popIdx) right there with the person acts ("Thỉnh an, chép kinh", "Xin Thái hậu đỡ lời", "Kể tội…"); tab unchanged (owner L1152). Locked door shows the reason.
- Nội vụ phủ: place on map + list, eunuch "Xem hàng Nội vụ phủ" → kitShopNvp with the weekly rare item first (stock 1, normal price; seen: Trâm phượng cửu vĩ, Gấm minh hoàng). Note: the shop tile does not show "Hàng hiếm tuần này" (kit shop tile has no sub line); the place line and the option text say it.

## (5) Kit / VANPHONG / old saves / co-op
- KIT FIRST: no private chip/row/frame. New CSS only for the two §78 parts (`.ic.kplic`, `.khap`), documented in KIT.md §78 + kit page sample. Cards = kit act cards; reason = kit popover; shop = kitShop; dialogs = PEND/kit panel. Consistency scan: place names on map/list/stage use the same kitPlaceIcon; "!" only via kitHapMark on map + list.
- VANPHONG: no %, odds via word()/ladder; time words fixed (fix 2).
- Old save: a save made on main (9 buổi in) loads on the branch (deser + deal), 0 errors; S.adDoor/adHap/adRare fill lazily.
- Co-op: all new state is personal (S.adDoor, S.adHap, S.adRare); wk() follows COOP.state.week; no world writes; no co-op code touched (co-op e2e not needed).

## (6) Viewports (act-dedupe-vp.js on the final build)
755x1000, 1000x755, 1180x820, 1366x1024, 844x390: Hành sự cards visible, 0 study, no horizontal scroll, nothing clipped; grey tap → reason popover inside the screen; map + list icons and "!"; shop with the rare item; 0 page errors. 390x844: rotate prompt "Xoay ngang điện thoại để chơi" on the real host page (index.html). Screenshots looked at and deleted.

## Not this branch (seen while testing)
- The night card-flip overlay (`.kmov.kcf`, "Hoàng thượng lật thẻ bài … Chạm để đóng") sometimes stays over the screen right after a new life in automated runs and swallows taps until closed (same on main's build).
