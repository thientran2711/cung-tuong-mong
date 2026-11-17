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
| 16/11 | sếp (coop-chat) | Bong bóng thư + danh sách thư (kitChatBubble / kitChatList) + nút biểu tượng có huy hiệu chưa đọc (kitChatBtn) + khung Thư từ (kitChatPanel) | chơi cùng bạn: phòng của nàng | coop-chat | xong, KIT §76, chờ duyệt |

## 16/11 s19 — closed by review/kit-marks: "KIT REQUEST — cloud-del" items 1–2 built as KIT §83.9 (`.kbtn.kdanger`, `kitConfirm`); KIT number clash §72 verified resolved (KIT_NUMBERS.md).

## 17/11 — KIT REQUEST — timed choice dialog (night-final, owner OD 16/11 22:45Z "Phải quyết định trong vòng 10 giây thôi")
| date | from | need | where | who | status |
|---|---|---|---|---|---|
| 17/11 | night-final (session_01UV1SzhwBU5vBCvZomnavDM) | A dialog with a COUNTDOWN (kit §69 `kitCoopClock` chip in the body) must show the clock + the one-line question WITHOUT scrolling on Fold 755x1000. Today the kit dialog (art + option cards) puts the body text after the option cards on narrow: measured on the flip choice (pid "nfch"): body 736 px tall in a 493 px box, the clock chip at y 965 (off screen), options at 472–796. iPad 1180x820 is fine (text + clock above the cards). Ask: a kit way to pin a timer chip (and the question line) above the options / in the dialog header for timed choices — no private CSS in jnf | flip choice after the card flip (jnf.js showChoice); any later timed choice | kit keeper | mở |
## 16/11 — npc-agent r1-fix (Foreman C worker): dialog option LOCKED state (register, no new look)
| 16/11 | npc-agent r1 (fault 2a) | A Q-dialog option with `lock:true` + `why:"<reason>"` renders as the EXISTING kit locked-option form of `pbtn` (j15): `disabled` + `<span class="kwhy">reason</span>` in `<small>` → j63 kaNorm turns it into the §6 `.kdis` card with its Cần ✗ row. One line in j3 showModal (before: only "poor" options were disabled). Used by the AG1b reactions "Nghe lén" / join when no khắc is left (BAL.ag.kh). Kit keeper: please record it in KIT.md §6.2 (dialog options) / §8 | AG1b witness card (jagent agReact); any dialog option with a lock | npc-agent r1 | built (j3), chờ kit keeper ghi KIT.md |
## 17/11 kit-size-10 — closed: night-final KIT REQUEST "A dialog with a COUNTDOWN (§69 chip) must show the clock + the question WITHOUT scrolling on Fold 755x1000" built as KIT §32.5c + §69.4 (root cause: `.kdpall` + `.kdpbanner` grid rows, jk4 `#kit-dp-all`; every banner event dialog, with or without a clock). Test `dev/test/timed-choice-fit.js`; sample kit page §8 "VIỆC CÓ ĐỒNG HỒ". Callers (night-final jnf) put `kitCoopClock` in the text only; no private CSS.

## 17/11 — KIT REQUEST — card flip: the tassel crosses the rank line of the picked card's name tag (night-final #6)
| date | from | need | where | who | status |
|---|---|---|---|---|---|
| 17/11 | night-final #6 (session_01UV1SzkcuhnxeSAywiQC2hz) | The picked card's name tag (`.kcf-pick .kcf-tag.kcf-tag-l{top:79%}`, KIT §48 kitNameRank on the tray) sits ON the jade tassel by design ("over the tassel"), so the tassel cord runs through the rank word (e.g. "Quý nhân"). Needs a kit answer: tag below the tassel end, or the tassel behind a paper backing. Not night-final code (jflip.js / §48 from main) — not changed here. | jflip.js final still, Fold 755x1000 + iPad 1180x820 | kit keeper | open |


## 17/11 — KIT REQUEST — live v3 frame at phone portrait 390x844: info column too narrow for option cards (night-final-r1 reviewer)
| date | from | need | where | who | status |
|---|---|---|---|---|---|
| 17/11 | night-final-r1 reviewer (session_01964izDUxnFjybggNj6Ukev) | At 390x844 (secondary device) the live v3 frame (`kszlive`, lay L) gives the figure most of the width and the right info column only ~146 px; compact option cards (§43, `button.ka.kart.kopt`, 84 px picture) are then 146 px wide: name wraps per word, the odds ladder chip and the Được/Mất values run past the card edge. Pre-existing on live main 6c4f21c3 (there the name is squeezed to 0 px); §43.0a makes it better (name 30 px) but cannot fix the column width. Fold 755x1000 + iPad 1180x820 are fine. Ask: a kit rule for the v3 frame at phone width (figure column narrower / option cards below the figure, full width). | kitFrameLive3 / KIT_SIZE.v3 (jksize.js), every person/event dialog with options at ≤ 420 px wide | kit keeper | open |
