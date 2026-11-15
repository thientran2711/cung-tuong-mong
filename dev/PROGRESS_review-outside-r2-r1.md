# Review state — review/outside-r2-r1 (reviewer of review/outside-r2 @ 7f345703)

Merge: origin/main d51a393e merged in (conflicts only in built files index.html/sw.js/assets.json + assemble.py order: jkc.js appended LAST after jartc; jsfx is earlier, so jkc wraps it). Diff vs main = only the intended files (jkc.js, j27 one line, jk3 one line, assemble one line, tests, measure bots, docs, built site).

## Fixes made by the reviewer (dev/build/jkc.js)
1. Identity card with "Ở nhà chờ tuyển tú" picked: shows "Tiểu thư <nhà>", 18 tuổi and the home Danh/Bạc caps (was palace rank + origin age 19/20). Checked headless.
2. Bạc twins for the 2–10 bạc place acts (coordinator decision, owner rule 20:30Z): 13 twin cards, same gain, paid in Sức + one more khắc or tỳ nữ thiện cảm -5; each twin sits right after the card it mirrors (table in dev/PROGRESS_review-outside-r2.md).
3. Co-op: the home road is hidden in a co-op room (kcCoop → kcOk false): identity card offers only "Vào cung ngay". Owner rule "every feature works in co-op, no later" → the home road in co-op is an OPEN item for the worker.
4. Wording: "Gửi thư theo người đi chợ" sentence order; maid cost says "thiện cảm" (VANPHONG: no "Lòng" outside servant mode).

## Checked
- route.js 755x1000@2 PASS twice (before fixes 3–4): home tabs, play, tuyển tú, palace entry Đáp ứng, Danh ≤30, bạc cap, maid, intel, reload, 0 page errors.
- Handover vs palace start: entry rank 0–2 by score (never above origin rank 2 of tt/ch), Danh ×0.6 cap 30, bạc ≤400, 2 years later (age 20); Phúc duyên +5/+5..10 ≈ palace rate (promo 5, year 3) → not dominant.

## Left (if the container is lost)
- route.js at 1000x755, 1180x820@2, 1366x1024@2, 844x390@2 (a 5-size run was in progress at 20:45Z, box load ~40).
- oldsave.js (main.html = `git show origin/main:index.html`, same origin), month-cal.js, item-events.js, ts-oldsave.js, kit-page.js on the final build.
- Screenshots: look at home tabs at all sizes; faces were slow to load under load (not judged missing).
