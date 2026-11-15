# PROGRESS — review/loading (nhập cung lần đầu: thỉnh tranh/tiếng về máy)
Base origin/main 574f560 + merge origin/review/page-curl (owner rule: shots on the approved layout).
## Done
- dev/site/assets.py → assets.json [path, sha256/16, bytes, core|fig] (hash cache dev/site/.assets-cache.json, untracked).
  core = UI/kit/scenes/maps/items/sounds 1195 files 83.5 MB; fig = fig/por/ev/st/map-fest 9237 files 549 MB (ordered emperor → … → maid, tier, age).
- dev/site/sw.tpl.js → sw.js (build_site.sh): shell cache ctm-shell-<content hash of index+manifest+assets.json+JSON> (no timestamp:
  unchanged build = no SW update); asset cache ctm-assets keyed path?h=hash, never wiped, activate prunes only keys not in assets.json;
  navigation network-first with 4 s fallback; JSON network-first → shell; Range → 206 from cache (<audio>); cross-origin (co-op worker) and
  requests with x-ctm-load bypass the SW.
- dev/build/jload.js (assemble.py before j84): loading screen (KIT §35), kitProgress, background chip (lifted above tab bar/title panel,
  tap = pause), legacy ctm-<ts> cache migration by content, storage.persist/estimate, quota/offline/net errors + "Vào cung ngay"/"Thỉnh tiếp".
- Tests dev/test/load-e2e.js (cold | ipad | update | chip), dev/test/load-migrate.js. Shots dev/shots/loading/.
## Numbers (local server, CDP 20 Mbit/s 60 ms)
- enter after 53 s (83.5 MB); background 549 MB in 118 s unthrottled; total cache 643 MB, 10432 keys.
- offline reload: title in ~3.4 s, new life plays, 0 broken images. Rebuild with one changed image: exactly 1 file downloaded.
- legacy cache (1195 core files in ctm-<ts>): 0 re-downloaded, migrated in ~10 s.
## 15/11 — bản mới tự về máy (sếp: Fold / app màn hình chính kẹt bản cũ)
- Gộp origin/review/book-release (đợt 2) aaf42a88: KIT §33 KIT_FIG + §34 sách giữ nguyên, màn tải đổi số thành §35; LOG lấy đủ dòng.
- dev/site/swreg.js (build_site.sh chèn cuối index.html): đăng ký sw.js updateViaCache none; registration.update() khi mở, mỗi lần
  quay lại (visibilitychange/pageshow/focus/online), 20 phút một lần; controllerchange → thẻ kit "Có bản mới · Mở bản mới" (KIT §35.2),
  3 giây rồi tự mở; chờ khi đang hộp thoại/Q/S.mg/#ov/kmov/podium/sổ tuần/lật trang; save() trước khi mở lại. Hook window.KSW.
- sw.tpl.js: tên bản trong đầu tệp (đổi bytes mỗi bản dựng), activate: xóa shell cũ → claim ngay, dọn ctm-assets SAU (không chặn fetch);
  message {ctm:'skip'} / {ctm:'v'}. make_site.sh, wrap_root.sh, publish.sh đều đi qua build_site.sh (không còn sw ctm-<giờ>).
- Thử: dev/test/sw-serve.js (giống Pages: max-age=600, ETag, Range; /__ver/<bản>, /__stale/<bản>) + dev/test/sw-update.js:
  ab (Fold 755): A → dựng B → nền/quay lại 1 lần → hộp thoại đang mở thì không mở lại; lui → thẻ → B sau ~13 s; sổ y nguyên, nạp được; 0 lỗi.
  main (iPad 1180): sw.js của origin/main → mở lại 1 lần → bản mới (3.3 s, 1 lần điều hướng); STALE=1 (index cũ từ bộ nhớ đệm):
  trang cũ tự mở lại bản mới (2 lần điều hướng, 7 s); ctm-<ts> cũ chuyển sang ctm-assets, sổ y nguyên, nạp được; 0 lỗi.
- Còn: kiểm duyệt kit §35 + §35.2.
