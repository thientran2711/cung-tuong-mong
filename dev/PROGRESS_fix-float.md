# PROGRESS review/fix-float

Base: origin/main (merged; see git log). In the assemble.py module list keep main's list and add `'jkrel.js'` right after `'jaudit.js'`, then `'jint.js', 'jnight.js'` before `'j84.js'`.

## DONE (pushed)
- e30e76903: whole numbers only (jint.js; oanMonth rounding; old saves rounded on load; no "thù -N").
- 6bf8d6716 + 1b5c12588: jnight.js. A night with the Emperor ends the day.
  - `S.toMorning = {t, b}` (turn and buổi of the night). It is dropped as soon as the day has changed by any road: nextBuoi, a co-op week merge that rebuilds S, or a load.
  - Co-op question ("does jnight call nextBuoi itself?"): yes. It calls the co-op wrapper: sáng/chiều → bend, tối → endTurn → merged week. It now asks only once per buổi.
- 10e1d3b6b / af7c388cb / d0a6dcc53: logs record the real result, not the card text; choice lines give context.
- 8a6b53725 and later: Tuần lục on the kit (owner 15:30Z, 15:45Z, 16:50Z, 16:55Z, 16:58Z, 17:16Z, 17:45Z).
  - New kit parts (jkrel.js): KIT §52 `kitRelTable` / `kitRelRows` / `kitRelDelta`, KIT §57 `kitNumDelta` / `kitDeltaAuto` (kit-fig2 request; every fact line via kpChipify), plus `kitImgSync` (jbook, §52.1). Documented in KIT.md §52 + §57 (renumbered in review r6 from §51/§52: the registry reserves §51 for kit-table). Samples on the kit sample page §47 (`#kit`).
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

## Review r6 (review/fix-float-r6, on origin/main 5e491704d)
- Merged 56517d0de onto main 5e491704d (assemble: main list + jkrel after jaudit, jint + jnight before j84). Site rebuilt.
- KIT renumbered per the coordinator registry: relation table §52 (kitImgSync §52.1), number delta §57 (was §51/§51.1/§52; §51 = kit-table). KIT.md (note at the top of §52), jkrel/j87 comments, kit sample ids, PROGRESS.
- Reviewer fixes: Tuần lục ✕ z-index 6 → 999 (kitBook stacks sheets at z=n*2-i, so a 4+ sheet book covered the ✕ — visible at 755x1000);
  jkrel CSS scoped to `.krtw>.krt` (bare `.krt` is also the origin-roulette tile in jk2b); a stranger's table has no Hiện nay/Tuần này heads;
  book-person.js calls kn() before S.met; stale "flow" line in its header fixed.
- Tests: book-person 5 sizes PASS; kit-page 5 sizes PASS (12 samples incl. §52 ×3, §57); rel-words-scan 0/0; night-day ok; int-stats 5 sizes ok;
  rules-one-source 755/844 ok + old save loads; sheet-turn 5 sizes ok; page-curl 5 sizes ok; coop-e2e 59/59 (incl. old save).
- Not this branch: page-curl.js screenshots show the Luân hồi screen (test does not dismiss #kroul); load-migrate.js / inv-origin.js stale vs main (Cache.add, #kload).
