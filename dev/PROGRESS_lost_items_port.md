# PROGRESS — review/lost-items-port (D38: lost items + item rivalry)

Spec: OWNER_DECISIONS OD:L108 (item rivalry: extort, bribed servants steal, then keep or plant to frame; two-way, motive-gated),
OD:L117 (theft/framing approved as pure game rules), the 15/11 rule "Evidence against a clean player" (evidence must be true),
OWNER_LEDGER #50 / SESSION8_QUEUE D38. Old branch: origin/review/lost-items 77679b52 (jlost, SẴN SÀNG KIỂM 14/11, never merged).

## What was ported (from current origin/main 583858942)
- `dev/build/jlost.js` (old jlost, all approved rules kept: rare thất lạc with a hidden cause through the motive gate, found back home / in
  another palace / never, four tra xét acts, recognition when worn, owner asks quietly or raises at Cung Chính ti, Soát rương hook, NPCs same rules).
- `dev/build/j92.js`: the old owner-field patch on GIÁ HỌA (wdFrameIx / wdFrameNm / wdFrameCulprit / wdFrameEv / wdFrameTake, PEND.wdframe `lo`)
  applied cleanly on main's j92 (main's j92 had not changed there). Giá họa without `lo` behaves exactly as before.
- `dev/build/assemble.py`: jlost after jearn (before jinv, so its section lands in Tư trang › Việc of the jinv sub-tabs).

## Adapted to current main (no duplicates)
- Tư trang is now jinv sub-tabs: the "Đồ thất lạc" section sits in **Tư trang › Việc**; all notice texts say "Tư trang › Việc › Đồ thất lạc".
- Item events §64 (jitev): notices show the item with `kitItemTag` (class kiev-own kiev-txt, existing CSS) instead of the old centred `<p style>`
  picture; `IEV_PID.loask` registered (after load), so "Trả lại" in the owner's request flies the item back.
- Extortion is LIVE in jtsb (`batnat` "Ép nộp của" + Sổ đồ mất): not duplicated. Her losses here are written into the same Sổ đồ mất
  (`tsbLedger`, `lo` id), marked "đã lấy lại" when the item comes back.
- Existing plant act (`Cài đồ vào rương`, j8 plantItem): a stolen item planted keeps its owner → the planted chest becomes the rival-plant case.

## New (D38 parts the old branch did not have)
- **Steal and keep**: a rival's doing may end with the rival keeping it (LO.keepP 35); she may wear it (recognition). Hearing for a kept item =
  `loKeepHear`: Cung Chính ti searches the thief; odds from TRUE evidence only (case evidence + evidence on the thief); win → item back, thief
  Danh -10 Sủng -5 punished; fail → nothing found, no penalty to the owner, can raise again after LO.hearCd (6) weeks (recoverable).
- **Steal acts (two-way)**: `laydo` "Sai người lấy trộm đồ" (Bạc 30, Đức -4) and `laydol` "Sai cung nữ thân tín lấy đồ" (no bạc, cung nữ
  Lòng -10, harder: BALANCE second road, same pattern as jecon bribel). Hại nặng group; NPCs pick `laydo` through BANDS "nặng" (motive gate).
  Caught → target gets 2 true evidence (j8 caught). Her stolen item sits in her chest as a case: wear it (risk), plant it, or "Lén trả lại".
- **Evidence truth (OD 15/11)**: a holder who never knowingly kept the item (it only turned up in her chest; she never said "Nói không thấy",
  never wore it) is CLEARED at the hearing without a roll (`loQuietHear`): item back, nobody punished. A penalty needs a real deed: a rival's
  plant scheme (j92 hearing, she can clear herself with evidence), a lie, keeping and wearing someone's item, or a theft.
- Owner's "Báo Cung Chính ti thu hồi" card text no longer leaks the hidden cause: "ai có lỗi thật thì bị phạt; người vô can được minh oan".
- Layout: Soát rương joins the last case's act grid (no half-empty 2-col row).

## Kit
Only existing parts: kitItemTag (§64.1), kitItem, kitChip, kitFacts, pbtn act cards, .kwdsel, h4.kpst. No new kit part. KIT REQUEST: none.

## Tests
- `dev/test/lost-items.js <url> <WxH> [shotdir]` — 7 scenarios (notice + §64 tag + ledger; found elsewhere → raise → hearing → back;
  clean holder cleared without penalty; lie → j92 hearing dialog; her theft → Lén trả lại; NPC keeps → cct → raise → keep hearing → back,
  thief punished; person card acts) + 16 weeks of play. PASS at 1180x820, 755x1000, 1000x755, 1366x1024, 844x390: all checks true,
  no page/console errors, no panel/document overflow, modal fits.
- Old save: `dev/test/ts-oldsave.js` (main build → this build, slot 3, 12 weeks): loads, no errors. S.lost absent in old saves → nothing to migrate.
- `dev/measure/lostfreq.js` — frequency + fairness bot (see numbers below).

## Open
- j92's wdframe dialog options carry `j67:"tốn: không tốn gì"` so the kit shows them as "an toàn" though the hearing can go against her
  (same as the live Giá họa dialog; family-wide, not changed here).

## Bot numbers (lostfreq.js, 2 lives × 400 weeks = 192 months, dialogs dropped: she never lies/steals/wears others' items)
- Her cases 7 (0.44/yr), NPC cases 134 (8.4/yr across ~12 consorts). Causes: mis 98 · srv 23 · riv 20 (keep 6, plant on someone 14).
- Hearings: quiet-clear 2 (her 0), keep hearings 2 (1 won), j92 owner-field hearings 5 (on her 4 = a rival's real plant scheme → dialog).
- FAIRNESS: penalties to her from a lost-item hearing without a deed = **0**.
- NPCs did not pick the explicit `laydo` act in these 2 lives (their rival thefts come through the approved hidden rival cause); the act is in
  BANDS "nặng", so motive-heavy rivals can still choose it.

SẴN SÀNG KIỂM
