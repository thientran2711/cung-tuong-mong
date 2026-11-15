# PROGRESS review/sfx (âm thanh sự kiện) — 15/11

Base: origin/main cfd321e9 (review/naming). Nhánh: review/sfx. Plan + bảng khoảnh khắc → âm: dev/audio/SFX_PLAN.md.

## DONE (commit 7aff0cd0 + commit này)
- dev/build/jsfx.js (assemble: sau jplace, trước j84): SFXN = MỘT bảng khoảnh khắc → tệp; SFXL tầng UI ×0,5 / sự kiện ×1; bộ trộn thay sfx():
  tôn trọng Tiếng / Tiếng động, tối đa 3 âm (tính cả giọng j36), tệp lỗi mạng thử lại sau 4 s, KSFX.log / KSFX.drop để kiểm.
  Gắn: kmStage (lật thẻ, thánh chỉ, giáng/lãnh cung, có thai/sinh, chết, rương thưởng từng bước), kitXamPlay, kitResultFx, kitCalendar,
  dawn (quẻ trong Sổ tuần j87), kitDayShift, kitFlyItem, kitFlipNote, kitAlarm, buy/sellItem/wkSell/giveTo/takeItem, closeModal,
  kitPodiumShow, kitSheetTurn, trò nhỏ (kg82Play/kg82Pluck/kg82Pop + thao tác từng môn), nút khóa, bảng .kpanel, diff sau render
  (cấm túc, bệnh/khỏi, sảy thai, đổi thời tiết, Tết), chữ trên thẻ (SFXTXT), chip thời tiết, hảo hữu vào phòng, thú nuôi (móc sẵn
  petAdd + ảnh pet-*), kitGain/kitLose/kitFx (móc sẵn khi các nhánh đó gộp).
- audio/: 72 sfx mới (490 tín dụng) + sfx-thunder (trước 404); 14 sfx cũ chỉnh cùng độ to; tất cả ≤ 20 KB. Audio ở git (không CDN) →
  KHÔNG có lệnh cdn_sync nào chờ.
- YÊU CẦU SẾP "âm theo nghĩa sự kiện" (thẻ trả quà 'không dám nhận' phát tiếng cười): XONG — j36 voKind dùng voTone (hostile/mocking/
  sad/cold/joy/warm/neutral, có xét phủ định) + VOMAP theo người nói; SFXTXT sửa bắt nhầm "Bồ tát", "trượng phu". Danh sách rà ở SFX_PLAN.md.
- YÊU CẦU SẾP "tiếng khóc nghe như cười": XONG — vo-f-cry-2 cũ bị mô hình nghe là "cười khúc khích"; thay vo-f-cry-1/2 bằng tiếng
  khóc mới (chấm khóc 5/5, nhầm cười 1/5); rà cả 27 tệp vo-*: thay thêm vo-f-angry-1/2 (nghe như thở/hít), vo-crowd-gasp-1 (nghe như
  rên trầm), vo-old-f-hmph-1/2 (nghe như "ừm" đồng ý). Bảng tên → nghĩa → OK/thay: SFX_PLAN.md mục "Rà từng tệp giọng".

## Kết quả kiểm (dev/test/sfx.js, 79 bước, Chromium --autoplay-policy=no-user-gesture-required)
- 1180x820@2: 78/79 (bước "người đến thăm" hỏng do thẻ thử mang tiêu đề "Có người đến" bị bộ lịch sự kiện j68 giữ lại → đã đổi tiêu đề thử).
- 755x1000@2: 75–76/79 tùy lần; 0 lỗi trang, 0 HTTP ≥400, 0 tệp audio lỗi. Các bước hỏng thay đổi mỗi lần (thánh chỉ, giáng phẩm,
  hảo hữu vào phòng): máy rất tải (load 50+), hẹn giờ trong trang chậm; các bước đó đã qua ở lần chạy khác.
- Lần chạy cuối (sau đổi tiêu đề thử) đang chạy khi phiên đóng — chưa có số.

## LEFT
1. Chạy lại test cả hai cỡ trên máy ít tải, ghi số vào dev/audio/RESULT.md (chưa viết tệp này).
2. Nếu thánh chỉ/giáng phẩm vẫn chập chờn: thêm chờ hàng kmPush trống trong test (kmBusy=false, KMQ rỗng) trước bước.
3. Sau khi gộp review/game-feel (jfx) / review/gift-chest / review/pets: kiểm lại thứ tự assemble (`jplace, jfx, jsfx, j84`), tên API
   kitGain/kitLose (thêm dòng W(...) nếu khác tên).
4. Chưa có người nghe bằng tai thật: nhờ sếp/điều phối nghe thử một lượt (đặc biệt sfx-cane, sfx-tablet-*, sfx-mg-miss là tiếng gõ ngắn).

## Known bugs / lưu ý
- Thư mục scratchpad dùng chung với thợ khác — tệp tạm bị xóa giữa chừng; dùng thư mục con riêng.
- j87 Sổ tuần không còn ống xăm j93 → chỉ có chuông/mõ quẻ sau tờ lịch (không có tiếng lắc ống ở bảng tuần).

## Test
python3 -m http.server 8781 --bind 127.0.0.1   (ở gốc repo, sau `bash dev/site/build_site.sh`)
node dev/test/sfx.js http://127.0.0.1:8781/index.html 755x1000@2 out-fold.json
node dev/test/sfx.js http://127.0.0.1:8781/index.html 1180x820@2 out-ipad.json
Đo âm: bash dev/audio/meas.sh audio/sfx-*.mp3 · chuẩn hóa: python3 dev/audio/norm.py OUT -16 in.mp3…
