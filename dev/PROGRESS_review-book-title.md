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

## Reviewer r6 (11/15) — branch review/book-title-r6 = e7769dc32 merged onto origin/main 64e91f1ae then 8ee414c1b (month-calendar, ts-a), site rebuilt; book-title.js + sheet-turn 844x390 re-run after the 2nd merge: ok
- Fix (kit §27, j87): cover `.kbk-in` is a size container; `.kbk-cseal` margin-bottom `max(0px,calc(3cqh + 2.2em + 4px - 7cqw))` so the TUẦN
  seal clears the page-turn hint also when the hint wraps (844x390, both art and plain cover). KIT.md §27 line added.
- dev/test/book-title.js at 755x1000@2, 1000x755, 1180x820@2, 1366x1024@2, 844x390: picture 160x1200 drawn inside the label, aspect kept
  (object-fit contain), text hidden, header text, no overflow, no broken images, 0 page errors. Seal/hint no longer overlap at any size.
- Fallback: title picture blocked → label shows the text "Tuần / lục" on the art cover; cover art blocked → plain CSS cover with text label.
- Old save written by origin/main build loads in this build; the week book then shows the title picture. sheet-turn.js 1180x820 + 844x390: ok, errs [].
- Kit page #kit: sample §27.1 draws the picture. Pre-existing on the kit page (not this branch): §28.1 pcPort sample shows "lỗi: Cannot read
  properties of undefined (reading 'out')"; result-seal samples (§53 kitResultSeal) float over the page header.
- Pre-existing fallback note: text fallback "Tuần" nearly fills the narrow label at 1000x755 (unchanged CSS from main).
