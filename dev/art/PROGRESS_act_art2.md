# review/act-art2: tranh thẻ việc cho rõ việc (14/11)

## Trạng thái
- DỪNG vẽ mới theo lệnh điều phối (chủ: "coi chừng vẽ dư"). Chờ điều phối duyệt danh sách SAI / KHÔNG RÕ rồi mới vẽ tiếp.
- Code (commit e826ec83 + sửa thêm ở commit sau): j79 `kitActKey`/`kpActName`: tên thẻ đọc bỏ chân dung người nhận; khớp tên, slug, `prefix`, dấu `*`,
  tên dài nhất mà tiêu đề bắt đầu bằng; chạy lại khi ACTS.json về muộn (tiêu đề nằm trong .kabody). Nhóm mới `sung-ai` "Tranh sủng" #b03a7a.
- Kiểm tranh: dev/art/ACT_ART_AUDIT.md (bảng 108 tranh + danh sách thẻ rơi về tranh nhóm).

## Đã vẽ (gpt-2-6, 3:4, 1k, thư mục ba4aecfe…; khóa -> id, lần cuối là bản dùng; cũng ghi ở dev/figwork/acts/gens.txt)
Lời vẽ: dev/figwork/acts/act2_prompts.py (bản sáng ref cplQijT0eP, bản tối ref iGq8UJy3uK). Tải + cắt 384x506: harvest2.py / fetch2.py.
- Bản đêm, giữ bố cục (sửa trên ảnh cũ): chan-ngu-gia TdSsziPVNR (thử 1: VXUlnIPMMU), binh-phong fHARhcbCDY
- Tranh mới cho thẻ buổi tối: tranh-sung Bh4OpdloQR ("Tranh sủng"), hau-tra-dem LwBerwqswO ("Hầu trà khi ngự giá"), ghi vào img/ACTS.json
- Vẽ lại SAI: ve-tranh KLM05Xpkqp (thử 1: LwBe11vswO), lam-tho SytoLFAUb8, day-con-hoc N2FEyfO6D9
- Vẽ lại KHÔNG RÕ: an-thai TdSsYFvVNR, bong-con aF23tJ2fSh, buon-ban-len iGqQ4hu3uK, chon-nguoi 1lpVbYtr4r, danh-co tCi9BOTmZJ,
  gia-benh 6AHuPQAiJO, hoc-le rgeM5eYxtc, liec-mat iGqQ4lJ3uK, nghi-tay N2FEyg06D9, thi-tham jUXpkFELD0, thinh-an JNamSLjOq4,
  thu-toi jUXpk5HLD0, cai-do lJ8XjPBgv9, cai-tai-mat vQZit5sa47, day-ho 79vtSAzJAL, gia-mang-thai lJ8Xj3Kgv9,
  ha-doc mE36v7yhJQ (yiCv70vPW9 bị chặn, 6AHuNMjiJO mặt lạnh -> bỏ), hen-gap 1lpV5iXr4r, len-vao JNamUV0Oq4,
  mua-chuoc-ba-do 79vtSeXJAL, ngang-chan MBwgV9SDCm (thử 1: 3zbFNfxREY), to-giac yiCv7tkPW9, tung-tin 5jVcHcNKxe, xa-huong xSdDkpFjfW
- Tổng: 29 tệp cũ thay + 2 tệp mới = 31 tranh; 36 lượt vẽ (40 tín dụng/lượt).
- Bảng xem: scratchpad aa/act2-before.jpg, aa/act2-after.jpg (sheet.py, cùng thứ tự).

## Còn lại
- Chờ điều phối: giữ / trả lại từng tranh KHÔNG RÕ (git checkout cbebfe3c -- img/act-<key>.webp để trả bản cũ).
- Các thẻ rơi về tranh nhóm: xem cuối ACT_ART_AUDIT.md (cần tranh riêng nếu chủ muốn).
