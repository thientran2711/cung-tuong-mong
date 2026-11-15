# PROGRESS · Trung y (review/trung-y) — sếp 15/11 09:15Z

Khi ô Y phục của NÀNG trống (bị thu hồi, bị cướp, tự cởi, chưa có) → hình nàng ở mọi nơi (sân khấu #mefig, hộp thoại, thẻ, chân dung tròn —
mọi chỗ gọi figFor) mặc TRUNG Y đúng bậc. NPC: cùng luật nhưng chỉ dữ liệu + tin đồn (không vẽ).

## Duyệt (điều phối chuyển lời sếp)
- 8 bậc = màu RCOL (KIT §1.3) bản lụa nhạt: Đáp ứng ngà · Thường tại lục nhạt · Quý nhân lam nhạt · Tần hồng phấn · Phi tím nhạt ·
  Quý phi hồng đào · Hoàng quý phi cam nhạt · Hoàng hậu vàng nhạt (viền mây phượng vàng đậm rõ). Kín đáo, viền cùng màu, bậc cao viền tinh hơn.
- 84 mặt (32 consort + 52 maid) × 8 = 672 lần sửa; bỏ 4 look cũ (sổ cũ không S.pid giữ áo thường); cung nữ: bỏ; lãnh cung giữ tranh cold.
- Nguồn: tranh CDN t1 hiện tại (đã thu hoa điền + bỏ nốt ruồi), KHÔNG phải sheet Magnific gốc.
- Luật: ô trống thật sau thu hồi / cướp / cởi; Nội vụ phủ cấp lại áo trơn đúng phẩm sau BAL.ty.reissueWk tuần (rương kitReward);
  cởi áo chỉ trong tẩm cung, không phạt; ra ngoài / gặp người mới phạt.

## Cách làm tranh (dev/art/trung-y/)
1. `ty.py refs` — tấm tham chiếu 2048x1024 từ 4 tranh CDN t1 (fig-<role>-<id>-t1-a18..a51) trên nền giấy; tải lên Magnific (refs.txt: role id creation).
2. Space Magnific "Trung y 8 bậc (review/trung-y)" (a33ac200-…): 8 nút text (prompt bậc 1..8, prompts.py) + 6 làn (creation → 8 image-generator gpt-2-6 4k 2:1).
   Mỗi mẻ: sửa 6 nút creation sang 6 mặt, chạy 6 lượt `downstream` (một lượt/làn — một lượt quá ~27 nút thì lỗi "credits service could not charge";
   nút tách nền trong Space luôn lỗi khi chạy chung nên tách nền làm ở máy).
3. `runs.py RUN:role-id …` đọc trạng thái lượt chạy từ transcript → dòng bg.txt (`role id bậc gen -`); nút lỗi → chạy lại `singular`.
4. `projects_download_zip` 48 gen/mẻ → zips.txt; `fetcher.sh` tải khi còn chỗ đĩa; `worker.sh i/2` ×2 chạy `ty.py proc`:
   rembg isnet-general-use (ở 1920x960) → tách 4 tuổi → fig 900px + por 384x506 (porcrop.py) → recs-*.json.
5. `alpha-holes.py --fix` (từ origin/review/scene-light) + cutcheck; `ty.py sheet` tờ duyệt; `ty.py manifest` → img/FIGURES-ty.json.
Tên tệp: img/fig-<role>-<id>-ty<1..8>-<a18|a26|a36|a51>.webp, img/por-…; bản ghi FIGURES-ty.json {role, identity, ty, tier:"tyN", ageBand, file, por, magnificUrl, bg, sheet}.

## Code (dev/build/jty.js, sau jmen trong assemble.py; số trong BAL.ty ở jbal.js; jearn.js để ô trống)
- figFor(S) → tranh ty đúng mặt (figPick), bậc = rank+1, tuổi gần nhất; thiếu tranh → tranh thường.
- Thu hồi (jearn base→rỗng), cướp → S.tyNvp; tyWeek (endTurn): điềm báo (kẻ thù rel ≤ plotRel, tính cách mưu) → thẻ "Điềm báo";
  Nội vụ phủ cấp áo (kitReward); NPC: mặc áo trong rương, Nội vụ phủ cấp, ra ngoài khi trung y → Danh, tin đồn (newsAdd), bị cướp (hiếm).
- goTo ra ngoài khi trung y → thẻ "Ra ngoài khi mặc trung y?" (Mất: Danh …), đi → Danh -out, đông người -crowd, gặp Hoàng thượng/Thái hậu: tai tiếng
  -royal, Đức -royalDuc; khách (không cùng cung) tới tẩm cung → -meet; mỗi nơi mỗi buổi một lần. Thẻ nơi chốn (jplace) có dòng Mất đỏ.
- Cướp: đi tới nơi khác khi CÓ áo, đêm / nơi vắng / có kẻ thù sai người (sau điềm báo) → thẻ "Bị giật y phục giữa đường", về tẩm cung.
- Tư trang: ô Y phục có "Cởi y phục" (chỉ trong tẩm cung); Mặc lại → hết trung y.
- Test: `node dev/test/trung-y.js <url> 755x1000@2 <out> fold <oldsave.json> <dir ảnh ty ở máy>` (trang phải có <meta charset>).

## Tiến độ
- Mẻ 1 xong (c01–c12, 96 sheet, tờ: scratchpad sheets/batch1-c01-c12.jpg). Gen xong tới m13 (mẻ 7 đang chạy); tách nền chạy nền ~2 sheet/phút.
