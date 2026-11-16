# PROGRESS review/fxkit-r1 — review of review/fxkit @ 261c7c5f (KIT §68 painted-fx)
Reviewer for coordinator s8. Merged origin/main f53bdade (conflicts: assemble.py module list = fxkit list + jph.js; KIT.md keeps §59 + §68;
index.html / sw.js / assets.json rebuilt with build_site.sh). 58 img/fx files present on the CDN (1.61 MB, group 'fx').
Fixes made here: VANPHONG.md Tiếng row now names "Hiệu ứng: Đầy đủ / Gọn" (owner 22:35Z wording, was "Cảnh động");
dev/test/fxkit.js waits for nlFigsReady() before NEWLIFE (start() → nlBegin is async until the figure manifest loads; crashed at 1180x820).
Results (box load avg 50–60, swiftshader, frames 0.8–2 s): all 5 sizes + reduced motion: 24/24 sprite kinds load, 6 lights play with screen
blend, low-end sheet, edges/gift/letter/sheets done, pool reused (2nd round of 50 bursts: 0 new sprites, peak ≤ cap), heap flat (27.8 → 27.9 MB),
auto-Gọn on slow frames, 0 page errors, 0 fx 404, 0 overflow. Only "particles gone within 60–90 s" timed out (frame-counted life at 1–2 s
frames); separate probe: every DOM effect cleans up in 23 s; particles reach 0 later. Old save (main build) loads + plays 10 weeks; old
"Cảnh động" off carries over as Gọn. Kit page: §68 renders; only failing sample §28.1 fails identically on main (pre-existing).
