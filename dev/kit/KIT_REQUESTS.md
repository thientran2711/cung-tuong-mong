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

## 16/11 — npc-agent r1-fix (Foreman C worker): dialog option LOCKED state (register, no new look)
| 16/11 | npc-agent r1 (fault 2a) | A Q-dialog option with `lock:true` + `why:"<reason>"` renders as the EXISTING kit locked-option form of `pbtn` (j15): `disabled` + `<span class="kwhy">reason</span>` in `<small>` → j63 kaNorm turns it into the §6 `.kdis` card with its Cần ✗ row. One line in j3 showModal (before: only "poor" options were disabled). Used by the AG1b reactions "Nghe lén" / join when no khắc is left (BAL.ag.kh). Kit keeper: please record it in KIT.md §6.2 (dialog options) / §8 | AG1b witness card (jagent agReact); any dialog option with a lock | npc-agent r1 | built (j3), chờ kit keeper ghi KIT.md |
## 17/11 kit-size-10 — closed: night-final KIT REQUEST "A dialog with a COUNTDOWN (§69 chip) must show the clock + the question WITHOUT scrolling on Fold 755x1000" built as KIT §32.5c + §69.4 (root cause: `.kdpall` + `.kdpbanner` grid rows, jk4 `#kit-dp-all`; every banner event dialog, with or without a clock). Test `dev/test/timed-choice-fit.js`; sample kit page §8 "VIỆC CÓ ĐỒNG HỒ". Callers (night-final jnf) put `kitCoopClock` in the text only; no private CSS.

## 17/11 show-why — KIT REQUEST (REGISTER only, no new part built): result card row "Vì sao" (owner OD 17/11 05:45Z SHOW WHY A NUMBER)
- What: one more row of the result card's kit `.kb` grid (KIT §7), label "Vì sao", items = one sentence per person/number
  ("Hoàng hậu X: tính Ân cần, trọng Lễ: hợp ý → thiện cảm +6" / generic "… : theo tính nết và điều nàng trọng → thiện cảm +6").
- Markup = the existing "Ghi chú" row exactly (`.kr.kr-note` > `.krl` + `.krv` > `.kitem` > `.ef.n`), plus the marker class `.kr-vi`
  (no CSS on it); placed before the Kèm row; also in `kaLastResult.rows` as `{k:"vi",label:"Vì sao"}`. Builder `kitWhyRowHTML(T)` in
  dev/build/jwhyn.js. Sổ ghi lines get the same sentence as `<span class="past kwl">Vì sao: …</span>` (existing `.past` style).
- Also: the 24 nết words and the 13 trọng words are KIT §12 glossary terms (kitGloss, tap = kpPop): KIT_GLOSS gets netTip(t) /
  VIRT_GL[v] (data only, added in jwhyn.js like jdiff/jexam add theirs) — replaces native `title` tooltips (touch).
- Ask: kit keeper registers the row in KIT.md §7 + the kit sample page (or tells show-why to change it); work did not stop because
  no new display part was made.

## 17/11 coop-thin-b r2 fix — KIT REQUEST (seen, not built): two option tiles with art on a "Việc" card squeeze to one syllable per line on Fold 755x1000
- Seen on the part-D invite card "Hảo hữu tìm đến" (thInv, options Nhận / Từ chối, each with its option art + "an toàn" chip + GỢI Ý line):
  at 755x1000@2 the two tiles sit side by side, the art takes most of each tile, the name is cut under the chip ("N an toàn") and the GỢI Ý
  text wraps one syllable per line. At 1180x820@2 the same card is fine. Shot: CDN img/_review/coop-thin-b-r2fix/r7-guest-755x1000.png.
- Not from the r2 fix (the card is the native kit dilemma, rendered by D's stand-in = same fields); likely every 2-option card with option
  art at Fold width. Ask: kit keeper checks the option-tile grid at 755 (stack the tiles or shrink the art) in the kit part, whole family.
