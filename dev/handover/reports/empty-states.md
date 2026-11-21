# empty-states (worker session_01Rc5AsMTnwmUdoGmZsd4Uvk; owner 21/11 02:22Z)

PRIORITY #1 CHECK: OD 21/11 02:22Z | main KIT §21 kitEmpty + §37.2 htEmpty (j79 / jht) | review/* none | CLAIMS row "empty-states" (this worker)
Note: dev/handover/refs/owner-2111-empty-state.jpg was not on the handover branch when fetched (d5fe5c68); the owner's words in the brief were followed.

## What changed (KIT FIRST: one part)
- `kitEmpty(title, lines, {art|topic, acts})` (j79 §21) is now THE empty card = the look of «Ta chưa có con» (picture left, seal-coloured title, 2–3 hint bullets). `.kempty` CSS lives in the kit; `htEmpty` (jht) is a thin alias; old `.khtempty` CSS deleted. KIT.md §21 + §37.2 rewritten in place.
- New empty cards: Giao tình › Phe phái hậu cung «Ta chưa có phe phái» (info-phe-phai), Hậu cung › Nam nhân «Ta chưa gặp nam nhân nào ngoài Hoàng thượng», Tư trang › Thú cưng, shop "bán" list.
- Converted to the same big form (were the small `kitSkillCard max:0` line or a lone `<p class=past>`): Thư từ, Gia tộc/Gia đình/Vương tộc, Phụ tuyến, Triều cục, bảng xếp hạng (3 states), Mệnh truyện (Chương này ×2, Đã qua), Sắc phong (×2), Việc nhờ (Đang làm / Nợ ân / Trong cung).
- Already the card (kept, now via the kit): Con của ta, Kế vị, Hoàng tự trong cung, Hôn sự, Quý tộc kén rể.

## Scan / before-after (law 11)
`node dev/test/empty-scan.js <out> fold,ipadAir` (every tab + sub-tab, fresh start) and `node dev/test/empty-shots.js <out> before|after fold,ipadAir` (forced-empty states; shots kept OUTSIDE git, looked on Fold + iPad).
| state | before | after |
|---|---|---|
| Phe phái hậu cung | one grey line, no picture | kitEmpty + phe picture |
| Nam nhân | one grey paragraph | kitEmpty |
| Con của ta / Kế vị / Trong cung / Hôn sự | card | same card (kit) |
| Thú cưng, Mệnh truyện empties, Việc nhờ ×3, Thư từ, Phụ tuyến, Triều cục, Sắc phong, Gia tộc, bảng | small one-line card | big card |
| Tư trang túi đồ (grid of «Ô trống») | slot grid | unchanged (slot grid is the bag itself) |
Not changed on purpose (not whole-panel empties): Triều đình «Chưa có tin gì» row, Tâm nguyện «Chưa có hồi nào khép lại» (section inside a full panel), Sổ ghi (chapter book, never empty).

## ART REQUESTS for Foreman C
1. Nam nhân empty state: a picture of the palace men (guard / physician / prince / musician) — meanwhile `img/act-hen-gap.webp` (night garden lantern).
2. Phe phái: current `info-phe-phai.webp` is a tea scene; a dedicated «faction / allies» picture would fit better (optional).
3. Việc nhờ / Mệnh truyện empties reuse act-category art; dedicated «việc nhờ» art optional.

## Gates
see message to MAIN (quickcheck + coop-e2e results).
