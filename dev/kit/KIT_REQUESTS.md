# KIT_REQUESTS — thành phần kit còn thiếu (luật KIT TRƯỚC, sếp 16:50Z / 17:45Z)
Thợ báo "KIT REQUEST" trong báo cáo → điều phối ghi vào đây → giao làm thành phần kit chung (KIT.md + trang mẫu kit) TRƯỚC, rồi thợ mới dùng.

| Ngày | Ai xin | Thành phần | Dùng ở | Giao cho | Trạng thái |
|---|---|---|---|---|---|
| 15/11 | R opt-render | Nhãn rủi ro (.krisk), dòng gợi ý (.khint), dòng kèm (.kakem), dấu THÀNH/BẠI (.neu .seal) → làm từ kitChip | lựa chọn sự kiện | opt-render-fix | đang làm |
| 15/11 | fix-float | kitRelTable (bảng chip quan hệ Tuần lục), KIT §39 | Tuần lục, thẻ tin | fix-float | đang làm |
| 15/11 | sếp 17:27Z | Bảng nhãn\|giá trị một cột cố định (mở rộng kitRows) | LUẬT, thông tin món, Mệnh truyện… | kit-table | đang làm |
| 15/11 | sếp 17:16Z | Ảnh nhỏ theo phẩm không khung vuông | mọi dòng người | fix-float | đang làm |
| 15/11 | game-feel (R6 FAIL 3) | Grade chip (kitGradeChip), item reveal spotlight (kitRevealHTML, kitItem size xl), kitItemInfo, kitLose card + kitCoins — KIT §54.1/§54.2, built by game-feel in jkrev.js | kitGain, kitReward, mất/bán/tặng đồ | game-feel | xong, chờ duyệt |
| 15/11 | kit-fig2 (owner 17:04Z) | World / family stat change inside a fact ("Kho lúa −10", "nhà Hộ bộ thế lực +6", "Biên cương −4"): today a plain kchip (news card) or kchip + book-only .kbk-long (Tuần lục). Relation changes ("thân +23", "thiện cảm +5") = fix-float kitRelDelta, needs merging into main first | news card "Tin trong cung", Tuần lục | (coordinator) | requested |
| 16/11 | suc-khoe-fix (F6) | Act category **y-duoc "Y dược"** in KIT_CAT + KIT_ACT_CATS (j79) for medicine / pregnancy cards. Today they scatter: Uống thuốc thúc sinh, An thai, Tự bốc thuốc, Tự bào chế thuốc an thai, Bài thuốc dễ thụ thai, Báo tin có thai, Giả mang thai → Giao thiệp (fallback); Xin chữa bệnh → Học tập; Mua thuốc bổ → Buôn bán; Uống thuốc phá thai → Hại người. The category art `img/act-cat-y-duoc.webp` is already on the CDN (ACTS.json have[]) but no kit entry uses it. Needs: colour + label, regex (thuốc, an thai, thai, bệnh, thái y, bồi bổ), KIT.md 6.1 legend, kit page | Hành sự groups + act art | kit keeper | mở |
| 16/11 | sếp (coop-chat) | Bong bóng thư + danh sách thư (kitChatBubble / kitChatList) + nút biểu tượng có huy hiệu chưa đọc (kitChatBtn) + khung Thư từ (kitChatPanel) | chơi cùng bạn: phòng của nàng | coop-chat | xong, KIT §76, chờ duyệt |

## 16/11 s19 — closed by review/kit-marks: "KIT REQUEST — cloud-del" items 1–2 built as KIT §83.9 (`.kbtn.kdanger`, `kitConfirm`); KIT number clash §72 verified resolved (KIT_NUMBERS.md).
