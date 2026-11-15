# Hội hè + lập công (j71) — trạng thái

Nhánh `review/merit`, module `dev/build/j71.js` (nạp sau j68…j68h). Chỉ bọc hàm, không sửa module khác. Tắt: `window.__j71off=1`.

## Ngày hội
- 14 lễ (FEST + `thanhtho` Thánh thọ Thái hậu, ẩn khi bà mất), mỗi lễ 13–14 biến thể `FV7[k]` = [loại, phụ, lời]. Loại: C thi tài (SC7: công thức chấm chung cho mọi phi tần), W cược, G trò vui với một phi tần (bạc chuyển thật), B yến tiệc (có khi phi tần khác mời ngươi), P dâng lễ (có "Không dâng lễ"), R lễ cúng.
- Không lặp trong kiếp; ít lặp qua 5 kiếp (evHistSeen/evHistMark `j71:f:<lễ>:<i>`).
- Thi tài: tuần trước ngày hội có thiệp mời (`PEND.j71i`): ghi tên / bỏ bạc chuẩn bị (+8) / không dự. Luyện tập (Luyện cầm kỳ thi họa, Làm thơ dâng lên, Đánh đàn ở ngự hoa viên, Múa trong yến tiệc) trước ngày hội +3 chuẩn bị mỗi lần (tối đa +12). Ngày hội: bảng điểm thật (tài nghệ theo chỉ số ngày hội + chuẩn bị + may rủi 0–30).
- `festival()` cũ (Yến tiệc đầu xuân, Thi tài Thất tịch) không còn tự xử ngươi thua: thiệp mời trước một tháng (`PEND.j71x`), chọn tài nghệ; phần công chúa j54 giữ nguyên.
- Trò chơi nhỏ j82: nếu có `startContest`, ngày hội hiện nút "Vào thi (tự chơi phần thi)" → `startContest({art,artName,title,rivals:[{id,name,face,score,talent,prep,luck}],prep,talent,talentBy,luck,stakes,onDone})`; `result.score` (cùng thang điểm với đối thủ) thay dòng của ngươi; `result.shown` thì không hiện bảng thứ hai.

## Lập công
14 nhóm `MF7`, 95 biến thể, ~4/năm (`J71.merP`), modal gắn `{opt:1}` cho bộ điều phối j68. Gắn chuyện thật: cứu tế chỉ sau lũ/hạn thật của j55; hầu bệnh Thái hậu chỉ khi `S.thIll`; tiếp sứ chỉ sau đoàn triều cống thật; vạch mưu khi có chứng cứ thật (`v.ev`) hoặc mưu j70 ngươi đã thấy dấu vết (thành công thì `abandon70`); hòa giải hai phi tần đang bất hòa thật; con bệnh thật (sức khỏe -15, không dưới 30).
Thưởng: Sủng/Danh/Thái hậu/Đức, quyền thần ủng hộ (`h.af`), Biên cương/Kho lúa, Phúc duyên +1 (tối đa 3/kiếp), xét công (`lastPromo -1`, 6 tháng một lần, cùng luật cho NPC). NPC lập công hằng tháng cùng giá, cùng thưởng.

## Thử trong trang
`j71Fest(k,i)`, `j71Day(k)`, `j71FeastInvite("sac"|"tai")`, `j71Merit(k)`, `j71Count()`.
