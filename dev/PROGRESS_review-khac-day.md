# PROGRESS review/khac-day (owner 15/11, "Khắc check must use the whole DAY's khắc")

## What was already there vs what was missing
- ALREADY THERE (main, review/time-spill 14/11 = j76): `can()` lets an act spill into the next buổi when the day has the khắc
  (`j76spills`, `S.j76carry`, nextBuoi carries the khắc); bound cards (`a.b`) and buổi tối never spill; deck cards got a
  "Ghi chú: kéo sang buổi …" line. Walk spill on Dư đồ (j9 `walkSpill`, card "Đi (đến nơi vào buổi sau)").
- MISSING (root cause): the Cần chip was never switched to j76. `kaTimeNeeds` (j63, re-copied in j79 and jclose) and `tsbNeedKhac`
  (jtsb) kept `ok: used+c<=4` (this buổi only) and the text "N khắc (còn M)"; j63 builds the Cần row after j76's wrapper returns,
  so the act was runnable while its chip was red. Same per-buổi test in person-card walks (j77 `accGuestWhy`: visit/see),
  map walk reasons ("đi N khắc, còn M"), place-card lines (Xin bái kiến / yết kiến / Lẻn vào / Nhờ thái giám / Bái kiến:
  "cần N khắc, còn M"), and `tsbKh` only charged what was left (no spill).

## Fix (one source)
- j76: `j76need(c,card,win)` = the one khắc chip: ✓ "N khắc (còn M)" fits; ✓ "N khắc (sang buổi trưa)" spills; ✓ "N khắc" when the
  card is bound to another buổi (its Buổi chip says why); ✗ only with a reason in words: "không kịp xong trong buổi sáng (cần N khắc)"
  (bound: thỉnh an etc.), "hết khắc trong ngày (cần N, còn M)", "hết khắc buổi này (cần N)" (0 left / spill running).
- kaTimeNeeds (j63/j79/jclose) and tsbNeedKhac use it; tsbKh spills via spend().
- Deck cards: the extra "Ghi chú: kéo sang" line dropped (said once, on the chip). Plain kit buttons (Tài nghệ, Hoàng tự, Kẻ hầu…)
  that spill get the same chip through the kit Cần row (data-kneed) instead of the lost note.
- j77: palace visit spills like a map walk (arrives next buổi, greeting asked on arrival; chip "đi N khắc (đến nơi buổi trưa)");
  'Đến gặp' is bound to where she is this buổi → "không kịp gặp nàng trong buổi …"; map tile reason
  "đi N khắc, đến nơi đã sang buổi …" / "hết khắc trong ngày (đi N khắc)" / "đến nơi đã sang buổi …: <closed reason>";
  place-card entries valid only this buổi → `j77Bound`: "không kịp trong buổi sáng (cần N khắc)" / "hết khắc trong ngày".
- Co-op safety: a carry is keyed to the buổi it was spent in (`S.j76ck`); if co-op re-sync moves S.buoi without nextBuoi, the next
  buổi still pays it, anything older is dropped (never charged twice / to a later buổi). Walk spill stays off in co-op (j9, unchanged).
- Untouched: card texts ĐƯỢC/KÈM (review/act-text).

## Tests
- `dev/test/khac-day-scan.js <url> <label>`: every khắc item × (4 buổi × 0–4 left). Before/after in the report below.
- `dev/test/khac-day-run.js <url> WxH <out>`: A deck card spills (sáng 1 left → trưa used 1), B person act, C palace visit
  spill, D event option tsbKh, E buổi tối red "hết khắc trong ngày" and tap does nothing, F thỉnh an red "không kịp xong trong
  buổi sáng", G co-op re-sync carry. All pass at 755x1000, 1180x820, 844x390; no horizontal scroll, no page errors.
- dev/test/walk-spill.js is stale (old start(), 3-buổi assumptions): fails identically on main and here.

| family | before ✓fit/✓spill/✓plain | before ✗"còn N" / wrong red | after ✓fit/✓spill/✓plain/✗reason | after ✗"còn N" / wrong red |
|---|---|---|---|---|
| Hành sự | 185 / 0 / 0 | 106 / 79 | 141 / 21 / 34 / 50 | 0 / 0 |
| Tài nghệ | 0 / 0 / 0 | 0 / 0 | 0 / 24 / 0 / 44 | 0 / 0 |
| Kẻ hầu | 0 / 0 / 0 | 0 / 0 | 0 / 6 / 0 / 5 | 0 / 0 |
| Hậu cung/Giao tình | 456 / 0 / 0 | 304 / 228 | 456 / 114 / 0 / 198 | 0 / 0 |
| Hoàng tự | 0 / 0 / 0 | 0 / 0 | 0 / 18 / 0 / 46 | 0 / 0 |
| Sự vụ (tsb) | 28 / 0 / 0 | 12 / 9 | 28 / 3 / 0 / 9 | 0 / 0 |
| Dư đồ (bản đồ) | 0 / 0 / 0 | 24 / 20 | 0 / 41 / 0 / 35 | 0 / 0 |
| Dư đồ (nơi) | 192 / 154 / 0 | 78 / 12 | 192 / 162 / 0 / 232 | 0 / 0 |
Wrong red per state before: sáng/trưa/chiều with 0–1 left ≈55–58 each (2–3 at 2–3 left); buổi tối 0. After: 0 in all 20 states.
(Before "reason" items in Tài nghệ/Hoàng tự/Kẻ hầu were j76 whyTime words, already day-aware.)

## Reviewer r1 (review/khac-day-r1, merged onto origin/main f8f51797c)
- Merge: only index.html / sw.js / assets.json conflicted (build outputs) → rebuilt with dev/site/build_site.sh.
- FOUND + fixed: the co-op guard in j9 `walkSpill` read `typeof CW!=="undefined"&&CW.on`, but the global `CW` is the face-key helper
  (`CW=n=>"@W"+n`); the co-op world object is `window.COOPW`. So walk spill was NOT off in co-op (map card + the new j77 visit chip
  promised "đến nơi buổi trưa", then the walk was lost because the co-op buổi only turns through bend). Now `window.COOPW&&COOPW.on`;
  the j76 goTo "Đường xa" path gets the same co-op guard. In co-op a too-long walk now reads "không kịp đến trong buổi … (đi N khắc)"
  (map tile + person-card visit); acts still spill in co-op (j76 carry, paid when the room turns the buổi).
- Fixed wording: closed-next-buổi place said its reason twice with two colons ("…: đến nơi đã sang buổi tối: đóng cửa tối. Đi đến nơi
  vào buổi tối cũng không được: đóng cửa tối.") → once: "đến nơi đã sang buổi tối — đóng cửa tối."
- dev/test/walk-spill.js updated (current start(), 4 buổi, generic arrival khắc): spill/night/closed pass.
- dev/test/coop-e2e.js: `COOP_SPILL=1` makes seat A spill a 2-khắc act every day buổi and checks the next buổi pays the carry once.
- Results: khac-day-run A–G pass (755x1000, 1000x755, 1180x820, 844x390); khac-day-scan percount 0 / wrongred 0; spill effects equal
  to the fit run (same seed); Tài nghệ spill; old save with S.j76carry and no S.j76ck pays the carry; coop-e2e plain 59/59 ×3,
  COOP_SPILL=1 79/79 (10 spills, used=1 after each turn, never 0/2).
- Owner L484 (Dư đồ, tối with 4 khắc, no Bái kiến): not reproduced on this build — in buổi tối with 4 khắc every palace with a chủ vị
  offers "Bái kiến <rank> rồi vào"; Càn Ninh (Hoàng hậu) outside thỉnh an shows "Xin bái kiến" with the reason; tối with 1 khắc says
  "hết khắc trong ngày (đi 2 khắc)" + "Sang ngày mới".
