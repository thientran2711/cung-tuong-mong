# Person-card acts without their own picture (for act-pics2 / ab06) — review/kit-fig2, 11/15

Owner 11/15: every act card on a person card (Hậu cung › Phi tần: Làm quen · Gặp mặt · Giao thiệp · Dùng chứng cứ · Hại nhỏ · Hại nặng ·
Sát hại) shows a small thumbnail ONLY from its own act picture (KIT 39 kitActCompact → j79 `kpActArt`: `img/ACTS.json` act → `img/act-<key>.webp`).
Owner 11/15: no category / group picture as a stand-in — an act without its own picture shows NO thumbnail until it is drawn.

Collected by `node dev/test/act-compact.js` (walks 4 consorts × every act group on the card; an act is listed when `kitActKey(name)` finds
no own picture, so its card has no thumbnail today):

| act (card title) | category (kitActCat) | note |
|---|---|---|
| Mời nàng sang cung | giao-thiep | |
| Trình Thái hậu | giao-thiep | evidence act (Dùng chứng cứ) |
| Trình Hoàng hậu | giao-thiep | evidence act |
| Uy hiếp đòi bạc | buon-ban | evidence act; category regex reads "bạc" as trade |
| Bán cho phe khác | trieu-chinh | evidence act; "phe" → Triều chính |
| Trả chứng cứ lấy lòng | giao-thiep | evidence act |
| Hặc ăn mặc sai phẩm | giao-thiep | Hại nhỏ / vượt phẩm |
| Xin Hoàng hậu giáng | trung-phat | NO `act-cat-trung-phat.webp` exists → shows Giao thiệp (category picture also missing) |
| Giá họa trộm đồ | hoc-tap | WRONG category: "họa" matches Học tập (vẽ/họa); should be Hại người |
| Hỏi người hầu: đó là ai? | hau-ha | Làm quen (stranger) |

Missing category picture: `img/act-cat-trung-phat.webp` (Trừng phạt).
The list depends on which consort/acts the run meets; re-run the test on review/act-pics2 after its ACTS.json lands to see what remains.
