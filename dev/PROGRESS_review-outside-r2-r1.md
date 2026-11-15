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

## Results on 9d33b670 (final build)
- route.js: 755x1000@2, 1000x755@1, 1180x820@2 PASS; 1366x1024@2 + 844x390@2 PASS on a re-run (first run at 1366 crashed in the test: S.kc undefined right after the pending dialogs were answered at turn 3 → see FAIL 4).
- oldsave.js 755x1000 PASS (main save loads + plays; home save reloads at home). ts-oldsave.js PASS. month-cal.js 755 PASS. item-events.js 755 PASS.
- kit-page.js 755 PASS; 844x390 "Cannot read properties of undefined (reading 'out')" — same on origin/main (pre-existing, not this branch).

## Verdict: FAIL (for the worker)
1. Gia tộc (home) pager strip: at 755x1000 and 844x390 the portraits of the pager strip sit under the kitSubTabs bar (only names visible, faces cut). 1366 is fine. Palace Hậu cung does not do this.
2. Co-op: home road hidden in co-op rooms by the reviewer (kcCoop) — owner rule "every feature works in co-op, no later": wire the home road for co-op (shared calendar while one player is at home; kcHook stubs only).
3. After Điện tuyển the Phúc tuyển minigame result card ("Đàn: Phúc tuyển … Phần màn chơi cộng vào Điện tuyển") was still open over the first palace screen (1180x820 shot).
4. Investigate: one random-play run at 1366 lost S.kc (undefined) at turn 3 while answering pending dialogs at home (no page error). Find which choice clears S.kc without ending the life / ensure every home-ending path sets S.kc.end.
5. Note only: OWNER #8 girlhood chest (20:05Z) is not on this branch.
