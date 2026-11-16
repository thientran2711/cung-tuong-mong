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

## Worker fixes on the r1 FAIL list (review/outside-r2-r1, 16/11)
Merged origin/main d34b5116 then 2d038139 (jkc stays last, after jph). jk3 = main's (k3AsRows reads kitRoad()); jkc wraps kitRoad → "kc" at home, so the
Ân sủng rows and the Đức "!" Hoàng hậu goal stay off at home (one road switch for every kitRoad reader).
1. Gia tộc pager under the sub-tab bar: the sub-tabs were outside `.pgwrap` (height 100%) and sticky, so the pager column overflowed under them.
   Now the jhc pattern: `<div class="pgwrap"><div class="kpinline">sub-tabs</div>pager…</div>` (kpinline = static tabs, kit CSS). Scan: kitSubTabs + pager
   are used together only in jhc (already kpinline) and jkc Gia tộc (fixed); Dư đồ uses a pbtn list (no pager).
2. Co-op: the home road works in a co-op room; kcCoop gate removed. jcoopworld: friendHome(P) (no palace entry for a friend at home; notices
   "Hảo hữu chọn thân phận … ở nhà cha chờ kỳ tuyển tú" on onState and on sendMe for the guest; "Hảo hữu nhập cung" from onWeek when she enters),
   CW.weekEnd (the co-op week path, called directly by jkc so the palace-only endTurn wrappers made after it — jtsb, jts — are skipped as in
   single-player), CW.altTurn (jkc: kcEndTurn runs inside it), CW.holdMe/heldMe + CW.sendMe (the blob is sent after kcInit, not the palace start).
   kcEndTurn in co-op also runs placeWhere (host sends the palace whereabouts). Test: dev/test/outside/coop-home.js (live Worker) 51/51.
   Test bots (coop-e2e, coop-bot, coop-play) accepted the identity card with /Vào cung/ which matched the road button "Vào cung ngay" (loop) →
   "Nhận thân phận" first, road buttons [data-kcp] never tapped.
3. Phúc tuyển card over the palace: kcEnter drops every queued home dialog (kcE except the Điện tuyển being answered) and closes an open
   mini-game; kcPhucPlay does nothing once she is in the palace / the round is done (stale card).
4. S.kc undefined: root cause = the random run's dialog loop ended her home life (an option ended it) and then pressed the end card, whose
   "Đầu thai kiếp sau" starts a NEW life (start(): new S without S.kc). Not a lost field. Guards: over() wrapper sets S.kc.end on every home ending
   (a bare die() at home included); route.js never presses an end card and fails if a home life ends without S.kc.end.
   Test dev/test/outside/kc-end.js: 6 ending paths (marriage, tu, rare, kcDie, bare die, Sức 0) all set S.kc.end; the end card makes a new life.
5. Girlhood chest (OWNER #8): at the start of the home road a kitReward chest "Rương đồ khuê các" (Mẫu thân / Tổ mẫu sửa soạn) fills and wears
   Cài tóc (Trâm ngọc bích), Y phục (a Thường garment of her P), Đeo tay (NEW Vòng bạc hoa mai), Đeo eo (NEW Ngọc bội khuê các), Túi thơm (Túi
   thơm thêu); kept into the palace. Luxury 48 / allowance 57 (Vừa phẩm) at Đáp ứng (a jade bangle made it Xa hoa → silver). Two new paintings
   (gpt-2-6, CDN, dev/art/ITEM_ART.md §5). OPEN for the coordinator: Khăn che mặt is left empty — in this game the veil is the hủy dung cover
   (worn without need = gossip, covers the face on every portrait); filling it needs an owner ruling.
Art gap (not in this task): house/city scenes reuse palace rooms (Khuê phòng = phi-tần cung room etc.), Huynh trưởng uses the guard figure,
Dư đồ at home has no house/city map painting (pbtn list).

## Re-review r2 (review/outside-r2-r2, reviewer, 16/11)
Merged origin/main 2afdafc39 (coop-timer live). Conflicts: built files + assemble.py order → main's list with jkc.js appended LAST (after jopic).
jcoopworld/jcoop auto-merged: main's coop-timer (forceBend, wake/ping, syncRoom catch-up loop) + the branch's friendHome / weekEnd / altTurn / holdMe.
Reviewer fixes:
- Coordinator ruling on the 6th chest slot: Khăn che mặt stays EMPTY (veil = hủy dung cover); the chest adds an UN-WORN Khăn tay lụa
  (existing jitev story item IT.khantay, art item-khantay.webp) to her bag. Chest now shows 6 things (5 worn + handkerchief).
- Family fix of the test-bot identity-card regex (the worker fixed coop-e2e/bot/play; main's new coop-timer.js, coop-sleep.js, coop-timer-lag.js
  still matched the road button "Vào cung ngay" and looped on the card): "^Nhận thân phận" first, [data-kcp] road buttons never tapped.
Results: route.js 755x1000@2 + 844x390@2 PASS · kc-end.js PASS · oldsave.js PASS · coop-home.js 51/51 · coop-e2e.js 59/59 · coop-timer.js 43/43
(after the bot regex fix; before it 2 FAIL = bot stuck on the identity card).
Verified: Gia tộc pager below the kpinline sub-tabs (755: sub 159–203, strip 208–282; 844: sub 0–43, strip 48–144 in the pane; the pane at 844
opens scrolled to the detail, same as palace Hậu cung — shared behaviour). Phúc tuyển card not over the first palace screen. New art
item-vongbackc / item-ngocboikc looked at: clean, on style.

### r2-r2 second merge (main moved to 7f20b751 during the review: merge trains 1+2, cardflip, jgoal, palace-start, evidence-truth …)
assemble: main's list + jkc.js LAST (after jtruth). New-main interactions found at home and fixed by the reviewer:
- jflip (KIT §67 card-flip): the palace's "Hoàng thượng lật thẻ bài" scene played at home (start week + every home week via kcEndTurn's
  palace flip). Now kcInit clears S.nightWhy (the start scene drops itself) and the home week's flip runs under quiet (no jflip / j93 note).
  Probe: 2 home weeks → 0 scene pushes.
- jgoal (KIT §72 goal strip): at home it showed the PALACE chapter ("Chương 1 «Nhập cung, đứng vững»: Được tấn phong một bậc"). Hook
  window.kitGoalAlt (jgoal chapter()/nextSteps/road, KIT 72.2 note); jkc returns "Chờ kỳ tuyển tú" with home todo (tài nghệ · lòng cha mẹ ·
  danh tiếng). After the tuyển tú the palace chapter is back.
Final results on this build: route.js 755x1000@2 / 844x390@2 / 1366x1024@2 PASS (1000x755@1, 1180x820@2 PASS on the first merge) · kc-end PASS ·
oldsave PASS · coop-home 51/51 · coop-e2e 59/59 · coop-timer 43/43 · 390x844 rotate prompt OK. 0 page errors.
### r2-r2 third merge (main a363cc14: goal-strip-fix → goal in the stage rail §77, merge train 3, outside-art D48)
jgoal conflict: main's strip removal taken, the kitGoalAlt hook kept (chapter()/nextSteps/road); todo rows carry `tl` (the road's tab label:
tabName() read the palace label "Phi tần" for rv at home). Rail "Mục tiêu chương" at home opens "Chương 1 · Chờ kỳ tuyển tú" (looked at).
assemble: main's list + jkc.js last (after jkpc). Results: route.js 755x1000@2 + 844x390@2 PASS · kc-end PASS · oldsave PASS ·
coop-home 51/51 · coop-e2e 59/59 · coop-timer 43/43 · 2 home weeks: 0 card-flip scenes. Note (main, not this branch): the palace start's
card-flip scene for week 0 plays during the Luân hồi identity card of every new life, before the road is chosen.
### r2-r2 merges 4+5 (main 0a311183 reign-road, 02a0d3f1 act-dedupe): only assemble/built-file conflicts; jkc.js stays last (after jact).
route.js 755x1000@2 + 844x390@2 PASS (no palace/reign event titles at home), kc-end PASS, oldsave PASS, coop-home 51/51, coop-e2e 59/59,
coop-timer 43/43 (on 0a311183 merge; route re-run on 02a0d3f1 merge PASS).
Main-side notes (also on origin/main, not this branch): (a) empty palace room at 844x390: j6 `.tokens .empty` "Không có ai ở đây." sits over
the room title (stage); (b) kitRankNamePaint inserted a servant's title inside a compound-surname player name ("Đoan Cung nữ thân tín
Mộc Lan Chi": her maid is Mộc Lan, her name Đoan Mộc Lan Chi) — the painter should match whole names only.
