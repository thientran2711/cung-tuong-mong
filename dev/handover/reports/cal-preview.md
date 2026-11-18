# CAL PREVIEW report

PRIORITY #1 CHECK: OD 17/11 owner calibration test; jmgcal.js only on review/ag-all-2-land; no claims. No game code changed.

- URL: https://ctm-cal-preview.victoria-tntt.workers.dev/?hieuchuan=1
- Built from review/ag-all-2-land 2bfecc27 (bash dev/site/build_site.sh, nothing committed).
- Separate origin: owner's github.io save untouched.
- Deploy: Cloudflare Pages direct upload was refused (upload JWT is overwritten by the proxy, code 8000013), so a Worker `ctm-cal-preview` embeds the site (index.html, sw.js, manifest, assets.json, icons, audio/*.json, dev/vendor/pixi-8.5.2.min.js). Pictures come from the CDN (CORS *). The unused Pages project was deleted.
- NOT deployed: audio/*.mp3 (5.5 MB, over Worker size limit) = silent preview, harmless 404s.
- Redeploy: rebuild, copy the files above into a dir, gzip index.html/assets.json, PUT multipart to /accounts/<id>/workers/scripts/ctm-cal-preview (main_module worker.js, binary modules).
- Verified (Playwright, Fold 755x1000, iPad 1180x820): boot, new life, ☰ → Thiết lập shows «Thử tay tài nghệ», 30 kinds, real Đàn engine renders, 3 kinds x 5 rounds (engines stubbed) saved, reopen resumes, «CTM-CAL …» line and «Chép mã» present.
- Gotchas: Thử from the title screen waits ~10 s and the pick screen sits behind the title modal (needs a started life); result card closes with ✕ (kitOvSync hides «Đã hiểu»); clipboard not testable headless.
