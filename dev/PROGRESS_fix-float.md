# PROGRESS review/fix-float

Base: origin/main (merged; see git log). In the assemble.py module list keep main's list and add `'jkrel.js'` right after `'jaudit.js'`, then `'jint.js', 'jnight.js'` before `'j84.js'`.

## DONE (pushed)
- e30e76903: whole numbers only (jint.js; oanMonth rounding; old saves rounded on load; no "thù -N").
- 6bf8d6716 + 1b5c12588: jnight.js. A night with the Emperor ends the day.
  - `S.toMorning = {t, b}` (turn and buổi of the night). It is dropped as soon as the day has changed by any road: nextBuoi, a co-op week merge that rebuilds S, or a load.
  - Co-op question ("does jnight call nextBuoi itself?"): yes. It calls the co-op wrapper: sáng/chiều → bend, tối → endTurn → merged week. It now asks only once per buổi.
- 10e1d3b6b / af7c388cb / d0a6dcc53: logs record the real result, not the card text; choice lines give context.
- 8a6b53725 and later: Tuần lục on the kit (owner 15:30Z, 15:45Z, 16:50Z, 16:55Z, 16:58Z, 17:16Z, 17:45Z).
  - New kit parts (jkrel.js): KIT §51 `kitRelTable` / `kitRelRows` / `kitRelDelta`, KIT §52 `kitNumDelta` / `kitDeltaAuto` (kit-fig2 request; every fact line via kpChipify), plus `kitImgSync` (jbook). Documented in KIT.md §51. Samples on the kit sample page §47 (`#kit`).
  - Person pages use one fixed relation table per kind of person. The private chips `.kbk-rel` / `.kbk-relchips` / `.kbk-pair` are removed.
  - Every page has the full-length figure of its subject:
    - Tổng lược shows her own figure;
    - Triều đình · thiên hạ shows Hoàng thượng;
    - a person with no painting, or shown before FIGURES.json loads, gets the kit silhouette, which a relayout replaces once the list arrives.
  - Page merging ("flow") was tried, then CANCELLED by the owner at 17:45Z. Each subject keeps its own page.
  - Evidence:
    - Only a misdeed seen by her tai mắt counts as evidence (j8 seenNPC + SEEN_BAD; a tainted gift counts).
    - The log line names its source: "(nguồn: tai mắt của ta thấy tận mắt)".
    - The fallback never borrows another log line (j78 evdSync).
    - "Dùng được ở thẻ nàng (N cách)" is removed.
  - Book cleaning (kbkClean): drops card text (" · kèm: …" and ranges), "(Chứng cứ X +1.)" glued to the next event, fractions, ".." and name-only lines.
  - The current rank title replaces an old one in log lines (j79 kpPeopleIn, KP_CONS_RX).
  - Wording class, fixed game-wide:
    - VP (j84): "Nàng quý ngươi" → "Nàng → ta: thiện cảm"; "Ngươi quý nàng" → "Ta → nàng: thiện cảm"; "thân ±N" → "thiện cảm ±N".
    - Never "Nàng ta oán ta / Nàng ta → ta": the VP lookahead, plus kitRelPaint keeps the subject inside the label span (data-vp-skip).
  - Small avatars (span.md.kfc): no ring/box behind the frame (jk2b). Names in Sổ này ghi use one ink (jhc).
  - "Tuần này" quẻ row is short (no "Gồm: …").
  - Book close: main's kit-close `.kbk>.kbk-x` ✕ (kept on merge).
  - No flash:
    - kclPrep copies, kitCurlSwap new pages, kitBook pages, kitStageFig and kitBookPic all decode sync.
    - kitBook does not rebuild its sheets when a relayout gives the same pages.
  - Choice lines no longer repeat the event title in brackets (j87 kbkOptName vs j3 logChoice).

## Tests
- `node dev/test/book-person.js <url> 755x1000@2 1000x755@2 1180x820@2 1366x1024@2 844x390@3`
- `node dev/test/rel-words-scan.js <url> 1180x820`: on-screen scan, before/after.
- night-day, int-stats, rules-one-source, page-curl, sheet-turn, coop-e2e (see the final report for results).

## LEFT / notes
- Owner 17:27Z (LUẬT · Ân thưởng label|value table sweep): asked the coordinator to split it to another worker.
- Missing figure art seen in tests: Thái y (physician) has no full-length figure, so the silhouette is used.
