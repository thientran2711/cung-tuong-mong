# PROGRESS review/fix-float

Base: origin/main 218a591fd. Main has moved since (6e6c2ae6d act-audit, 70c792d41 shop-fix), so rebase before review; expect assemble.py conflicts. In the module list, keep main's list and add 'jint.js', 'jnight.js' before 'j84.js'.

## DONE (pushed, tested)
- e30e76903: whole numbers only.
  - Cause: oanMonth (j28) forgave a fractional amount of oán each month; it now rounds. The ghen drop in j70 also rounds.
  - New `jint.js` rounds after apply, ap, affAdd, oanAdd, relAdd, evA and oanMonth, every buổi, and on load (old saves migrated).
  - Log lines no longer say "thù -N".
- 6bf8d6716: `jnight.js`. After a night with the Emperor (Tranh sủng, Chặn ngự giá, Kính sự phòng), time runs on to the next morning.
- 10e1d3b6b: runOpt (j2) and dialog options (j3) log the real result ("X: thành. Sủng 20→25"), not the card text. The Tranh sủng "kèm" has real numbers.
- d0a6dcc53: Tuần lục.
  - New evidence is logged as one line.
  - An entry taller than a page scrolls inside the page (k-scroll).
  - Chips never wrap; long ones become coloured text.
  - rules-one-source.js runs with the luân hồi start screen.
- af7c388cb: every dialog choice logs "<event>: <choice> → <real result>" (logChoice in j3).
- Tests passing at af7c388cb, all with 0 page errors: int-stats.js, night-day.js, rules-one-source.js (755, 412: 0 bad).

## WIP (committed after af7c388cb, built but NOT browser-tested)
Owner's Tuần lục person-page group, items (1)–(9), in j87:
- the kbkRel single relation renderer, with KIT §11.2 wording ("<ai> → ta: thiện cảm", "<ai> oán ta", "<ai> ghen");
- rounded deltas and values;
- "Hiện nay" as three kit rows;
- relation chips inside entries redrawn by kbkRelInline;
- name-only entries dropped.

## LEFT
1. Test the WIP above on all 5 sizes (755x1000@2, 1180x820@2, 412x1058@2, 1000x755@2, 844x390@3), with 3 person types: Hoàng hậu, a low consort, a servant.
2. (7) ONE fixed template on every person page. Always show the 3 relation rows, same order: "Nàng → ta: thiện cảm" / "Nàng oán ta" / "Nàng ghen", with "—" when there is no change. The WIP still pushes a chip only when v≠0, and only for rivals. Servants and Thái hậu need the same layout, using their own stats (loyal / th).
3. (8) Align "Hiện nay" as a kit grid, label | value, ±1 px, no truncation. Check the kitRows layout in the narrow book.
4. (9) "Nàng ta oán ta": the "ta" duplication comes from VP/kitRelPaint rewriting "Nàng ... ngươi". Check that kbkRelLabels output is not rewritten again.
5. (4) Find the log writer that emits a bare name. The WIP only filters these out in the book.
6. Add a test for "no non-integer in any book chip" (open kitBook from the real week data: kbkCollect, or the dawn flow).
7. (6) "Lui" in the book is fixed on review/kit-close (.kbk-x ✕). Do not touch it here.

## Test commands
Build with `python3 dev/build/assemble.py`, wrap dev/index.html as _aa.html, serve the worktree root on :8833.
- `node dev/test/int-stats.js http://127.0.0.1:8833/_aa.html`
- `node dev/test/night-day.js http://127.0.0.1:8833/_aa.html`
- `node dev/test/rules-one-source.js http://127.0.0.1:8833 755x1000@2`

## cdn_sync
None pending.
