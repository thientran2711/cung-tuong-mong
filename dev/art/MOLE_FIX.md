# Xóa nốt ruồi còn sót (theo dev/art/MOLE_AUDIT.md) — nhánh review/mole-fix

Luật: dev/OWNER_DECISIONS.md dòng 7 (không nốt ruồi trên mặt ai). Hoa điền phi tần không động tới.

## Kết quả
- **56 por + 53 fig = 109 tệp** đã sửa, ở `dev/figwork/out/molefix/img/` (ngoài git, `.gitignore`) và bản sẵn đẩy ở
  `dev/figwork/out/molefix/push/img/` (cùng 109 tệp).
- Toàn bộ ảnh rõ + ảnh chấm mờ có tên trong bản soát (39 + 8 tên, trừ `maid-m39-tm4-a26`: soát lại ở cỡ ×10 không thấy chấm nào, để nguyên).
- Thêm: `consort-c08-tcold-a18` có thêm một chấm xám nhỏ ở má trái (160,248) — xóa luôn.
- Dãy c24 tm/tcold a36/a51 (chấm nhạt ở má trái, gần như nếp da): đã làm mịn 9 por + 8 fig
  (tm0-a51, tm1-a51, tm4-a51 không có gì để xóa; tm3-a51 fig không có chấm).
- `consort-c17-t3-a18`, `-a26`: chỉ por có nốt ruồi (fig 900px đã sạch, xem kỹ ×5) → chỉ sửa por.
- `kid-p14-a4`: cắt lại por (porcrop nhận một mắt làm mặt) bằng porcrop.crop với mặt đặt tay (cx 150, mắt y 143, rộng mặt 112);
  fig có một chấm nhỏ trên trán (136,114) giống nốt ruồi của p14-a9 → xóa trên fig rồi mới cắt por.
- Credit Magnific: **0** (không cần gpt-2-6: mọi chấm đều nhỏ, tẩy cục bộ là đủ).

## Cách làm
- Tẩy cục bộ: tìm chấm tối nhỏ quanh toạ độ soát (median 15px − ảnh, ngưỡng theo đỉnh, bỏ khối > 10px/60px² như lông mày/mi,
  bỏ điểm alpha < 240 như tóc/viền), nới mặt nạ 1–2px, `cv2.inpaint` TELEA rồi trả lại hạt da (nhiễu khớp độ lệch vùng quanh, viền mềm).
  Vùng sửa mỗi chấm vài chục px; mặt, hoa điền, mắt, môi không đổi.
- por và fig sửa riêng (giữ nguyên khung cắt por cũ): toạ độ fig = toạ độ por × s + (ox, oy), s/ox/oy dò bằng khớp mẫu
  mặt (dev/figwork/molefix/maps.json). Alpha giữ nguyên từng điểm (chỉ đổi RGB).
- Mã: `dev/figwork/molefix/` (mf.py, fix.py, sheets.py, grid.py, list2.txt = danh sách + toạ độ, log.json = chấm đã xóa trên por/fig).
  Chạy từ gốc kho: `python3 dev/figwork/molefix/fix.py [tên…]` (đọc img/, ghi dev/figwork/out/molefix/img/).
- Kiểm: cutcheck mọi fig sửa < 8 (cao nhất 3.56 kid-f24-a4, bằng bản cũ 3.62), mọi por < 20 (cao nhất 19.97 kid-f24-a4, bản cũ 19.92;
  p14-a4 cắt lại 4.57, cũ 11.67). Bản gốc trên CDN trùng md5 với bản đã dùng làm gốc (kiểm lúc xong việc).

## Tờ so trước | sau (dev/shots/molefix/)
- por-1…por-5.jpg: 56 mặt por (12 mặt/tờ, trái = trước có khoanh đỏ chỗ xóa, phải = sau).
- fig-1…fig-5.jpg: 53 fig, vùng mặt phóng to (cùng cách trình bày).

## Đẩy lên Cloudflare (chưa đẩy — thợ phụ không được đẩy; điều phối chạy)
Thư mục `push/` là một cây nhỏ chỉ có cdn_sync.py (bản origin/review/cdn-images) + 109 ảnh, nên lệnh đẩy chỉ đụng đúng 109 tệp này
(không đụng img/ đang theo git của nhánh, không --prune):

```
cd /home/user/cung-tuong-mong/.claude/worktrees/agent-ac84f25226931b0e8
python3 dev/figwork/out/molefix/push/dev/site/cdn_sync.py --dry-run     # phải báo: to upload 109 (6.3 MB)
python3 dev/figwork/out/molefix/push/dev/site/cdn_sync.py               # đẩy 109 tệp (ghi đè cùng tên) + dựng lại img/_index.json
python3 dev/figwork/out/molefix/push/dev/site/cdn_sync.py --check       # thoát 0 = CDN trùng bản sửa
```

Cách khác (từ một bản checkout của origin/review/cdn-images, img/ ở máy): chép `dev/figwork/out/molefix/img/*.webp` vào `img/`
rồi `python3 dev/site/cdn_sync.py <109 tệp img/…>` và `--check` cùng danh sách.

Không đổi tên tệp, không sửa manifest (FIGURES*.json) — máy người chơi có thể giữ bản cũ tới 7 ngày (dev/art/CDN.md).

### 109 tệp
fig (53): consort-c01-tm0-a18/a26/a36, c04-tm0-a18/a26, c07-tm0-a18, c07-tm2-a18, c08-tcold-a18, c08-tm2-a18/a26/a36, c08-tm3-a26,
c08-tm4-a36, c09-t2-a26/a36, c09-t5-a18/a26, c17-t2-a26, c17-tm2-a18/a26/a36, c23-t2-a26, c23-t8-a51, c23-tm4-a51,
c24-tcold-a36/a51, c24-tm0-a36, c24-tm1-a36, c24-tm2-a36/a51, c24-tm3-a36, c24-tm4-a36, c28-t2-a26; kid-f09-a14/a20, kid-f11-a14,
kid-f12-a20, kid-f24-a4, kid-p14-a4, kid-p14-a9; maid-m26-t1-a26, m26-t3-a18, m26-tm2-a36, m39-tm3-a26, m39-tm4-a18,
m52-t1-a26/a36/a51, m52-t2-a26/a36/a51; thaihau-h1-a51, thaihau-h3-a51.

por (56): cùng 53 tên trên + consort-c17-t3-a18, consort-c17-t3-a26, consort-c24-tm3-a51.
