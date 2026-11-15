# PROGRESS review/book-title (worker, 11/15)

Task: owner picked vertical Tuần lục title d4 (review/act-pics2 dev/figwork/title). Swap its plum-blossom seal for the game's Trân nữ seal
(KIT §39) and draw the picture in the Tuần lục cover label.

Done
- `img/title-tuanluc-d4s.webp` (CDN: https://ctm-img.victoria-tntt.workers.dev/img/title-tuanluc-d4s.webp, 160x1200 RGBA): d4 with rows
  >= 1100 cleared (old seal at y 1130–1192; letters end at y 1096) + kitSeal SVG rendered at 512 px, scaled to 62 px, dulled toward the ink,
  uneven pressure + dry specks, placed centred at y 1128. Tools: dev/figwork/title/seal_render.{js,html} + seal_swap.py.
- j87: `KBK_ART.title` (preloaded → `.kbk.art-title`), `KBK_TITLE_IMG` map, coverH draws `img.kbk-ltimg` (alt = title) in `.kbk-label`; text
  `.kbk-lt.has-img` kept and shown as fallback. Running header stays text.
- KIT.md §27.1 + kit page sample §27.1 (jkitpage.js).
- Test dev/test/book-title.js (cover at 5 sizes). NOTE: serve dev/ with a charset=utf-8 server (p1.html has no meta charset; plain
  `python3 -m http.server` breaks the game script with "Invalid or unexpected token").

Pre-existing, not touched: at 844x390 the cover hint "Vuốt trang hoặc chạm mép phải để lật" overlaps the TUẦN seal.
