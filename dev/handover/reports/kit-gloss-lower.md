## REVIEW (RV-GLOSS-LOWER)
PRIORITY #1 CHECK: OD 26/11 ~08:25Z (giảm oán / nguy hiểm) | main kitLowerText 0 | review/* review/ob-oan-r6 (jts.js TS_LOWER + kitLowerText), review/kit-gloss-lower 233de84d | claims KK40.

Target: review/kit-gloss-lower 233de84d (on LIVE 3af7896e = origin/main). Tested with review/ob-oan-r6 c1aac955 merged locally (merge clean, built with dev/site/build_site.sh, not pushed).

**Verdict: SMALL PASS 233de84d** (two non-blocking data notes for OB-OAN below).

- Law 9 (kit): one kit path only — `kitLowerRow` / `kitGlossPopHtml` (j79), `.kplow` style, KIT.md §12.2, kit page sample §12.2. No own list in the kit; text only from `kitLowerText`. Without the OB-OAN data no row shows (guarded by try/typeof). OK.
- Law 11 (whole group): every `.kgl` popover goes through the single click handler → `kitGlossPopHtml`; header help (HX) panel goes through the one HX→kit rule hook. Callers of `kitGloss(...)` (jkrel, jtabs, jk2b, jht, jhc, jpcf, jtrong, j79...) all follow. No list miss found. OK.
- Law 6 (real acts): every act named in TS_LOWER exists in the code now: Tạ lỗi (j9), Nhún nhường, Biếu quà làm lành, Đóng cửa giữ mình (jts tsOptGuard), Xin Hoàng hậu che chở (j2), Xin Thái hậu đỡ lời, Phòng bị (jagacts3/jts), Thỉnh an, Hỏi han sức khỏe, Khen tài nghệ, Tặng quà, Giúp đỡ nàng, Kết giao, Tâng bốc / Phô tài (j2 cx2), Đút lót lật thẻ (j2 ksp), Xin chữa bệnh (jagacts3), Nghỉ ngơi dưỡng sức / một lát. 
  - NOTE 1 (OB-OAN data, not kit): «Dâng hoa» is not an act name; the real one is «Cắm hoa dâng Hoàng thượng» (j2.js:43). Fix the word in jts.js TS_LOWER.sung.
  - NOTE 2: «hầu chuyện Hoàng thượng» is a group label (the talk options with the Emperor), not an act title — acceptable as a group word.
- VANPHONG: no %, cổ trang wording, first letter capitalised by the kit. OK.
- Test `dev/test/kit-gloss-lower.js` on the merged build, Fold 755x1000 + iPad 1180x820: ALL PASS (2 x 20 checks: Oán/Ghen/Nguy hiểm «Cách giảm», Thiện cảm/Sủng/Danh «Cách tăng», Đức no row, header sung/danh/suc row, tai no row, cung nữ road no row, popover inside the screen, 0 page errors). Not re-run here: the LIVE-without-data 22 FAIL baseline and an old-save load (the code path is try/catch → null, no save field touched).
- MAIN LOOK PASS: looked at gl-oan-755 (Fold) and hx-sung-1180 (iPad): popover inside the screen, dashed line + «Cách giảm:» bold label, text wraps, readable. (iPad header panel shows an empty beige art slot — pre-existing kit info picture, not from this change.)
- Order: lands before or after ob-oan, both fine.
