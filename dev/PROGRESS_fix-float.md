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
- Second merge: origin/main aa9689da5 (kit-fig2, act-pics2, header-danh, promo-exam). j79 kpPeopleIn = main's version + the KP_CONS_RX current-rank rule;
  KIT.md keeps main §48-§50, §53, §55 and this branch's §52, §57. Extra fix: a "," / "." after an inline change goes inside the nowrap .krd
  (it started the next line in a Tuần lục fact). Re-run on the final build: book-person, kit-page (15 samples), rel-words-scan, night-day,
  int-stats, rules-one-source + old save, sheet-turn, page-curl, coop-e2e 59/59 — all pass; no horizontal overflow at the 6 sizes.
- Observation for the worker (not blocking): a "thân ±N" with no "→ ta"/"với ta" before it is drawn as a bare "thiện cảm ±N" (KIT §57 "between two
  other people"); after "Nàng oán ta +2," it reads ambiguous (seen: "Phi X nhờ người đưa thư. Nàng oán ta +2, thiện cảm −2.").
- Third/fourth merge: origin/main 27491781f (j83-variety, toilette) and f6d80ae65 (act-pics2 r7): assemble only (main list + jkrel, jint, jnight).
- RESULT r6 = FAIL (see the reviewer report):
  1. coop-e2e on the merged build: 3 of 5 runs 59/59, 2 runs stall in week 3 (run A: "buổi 2:1 advanced for both", ipad "Đợi hảo hữu xong buổi",
     week 3 not advanced for either seat; run B: guest already at [buổi 0, next week] "Đợi hảo hữu" while the host was still at buổi 2).
     origin/main f6d80ae65 alone: 2 of 2 runs 59/59. Suspect: jnight's own nextBuoi in co-op (a night at tối ends the turn for one seat
     while the friend is mid-day; the next buổi is auto-ended again). Make co-op nights deterministic and re-run coop-e2e ≥3 times.
  2. book-person page turn: 2 of ~7 runs (1366x1024, 1180x820) report a turning sheet copy whose portrait (por-consort-*, por-maid-*) is still
     loading while the live page has it decoded (= a flash). Earlier runs on main 5e491704d / aa9689da5 were clean; load avg was ~34.

## Round r7 (worker, on review/fix-float-r6 6d75eeb57 + origin/main b8a58e87)
1. Co-op stall (FAIL 1). Root cause: jnight keyed "the night's day" and "asked once per buổi" on S.turn, which is the MONTH counter
   (a day of play = one tuần, wk() = S.turn*3+S.tuan). So a night stayed "live" for the rest of the month: in co-op a stale night later
   auto-ended (or, with the per-month "asked" key, never ended) a buổi, and one seat could end its week while the other was mid-day.
   Same bug in single player: a night at buổi sáng spent 3 days (night-day "morning" case: old build day 0 → 3).
   - jnight: S.toMorning = {d: wk(), b}; dropped as soon as wk() changes. Old saves ({t,b} or 1) = "this day".
   - Co-op: jnight never calls nextBuoi; it calls COOPW.nightEnd() (jcoopworld), which ends this seat's current buổi once through the
     sync path (sáng/chiều → bend → server `buoi`; tối → endTurn → `end`), and does nothing while the buổi is already ended (bend / pend /
     sent), frozen, a dialog or a room step is pending, needWhere, or the local buổi is not the room's buổi. "Asked" is recorded only
     when it really ended the buổi; otherwise it retries (render + 1.5 s).
   - coop-e2e: `COOP_NIGHTS=1` stress (forces a won night on a random seat before ~45% of buổi); press() counts a seat whose buổi is
     already ended (bend / week pending) as pressed; buoiBoth counts a seat waiting for the merged week as done; a stalled buổi dumps
     both seats' state + COOPW.tr. Stress before the fix: 53/65 (reproduced both reviewer patterns); after: 59/59 with 10 forced nights.
2. Page-turn flash (FAIL 2): kclPrep gives each copied <img> the live one's currentSrc; kitImgPending(root); kitSheetTurn returns
   pending()/ready(ms). kitBook (j87 animate) keeps the live sheet shown and the copy hidden until the copy is decoded (≤350 ms), then turns;
   flush() unhides. kitCurlSwap (tab turn) hides the sheet until decoded and restarts the turn, or skips it if still not ready. KIT §52.1.
3. Wording: kitDeltaAuto names the actor of a bare "thân / thiện cảm ±N" right after a change of the same person toward me in the same
   sentence: "Nàng oán ta +2, thân −2" → "Nàng → ta: thiện cảm −2"; "Lâm Phi oán ta +3, thân −4" → "Lâm Phi → ta: …"; "các phi tần ghen +10,
   thân −5" → "Các phi tần → ta: …"; "hai người khác: thiện cảm +7" unchanged. KIT §57 note + kit page §57 sample.
4. Merges: origin/main b8a58e87 (kit-fig2 r8) and 80be56be0 (game-feel r7, poison-gift, trung-y, stipend). assemble = main list + jkrel after
   jaudit, jint + jnight before j84. KIT.md keeps main §51 (kit table) + this branch §52 / §52.1 / §57.
5. Test harness: coop-e2e loads pages to DOMContentLoaded (a hanging CDN request held the guest's `load` past 120 s in 3 of ~17 runs:
   aborted runs, not game faults); night-day stops at the new morning (a summons of the next day is not this night) and waits longer.
Tests on 505dbad17 (load avg 40–66): coop-e2e 4/4 complete runs 59/59 (5th aborted by the page-load hang above); after the DCL fix 5/5 59/59; COOP_NIGHTS stress 59/59
(6 forced nights); book-person 5× at 1366x1024 + 1180x820: 0 bad, 0 undecoded (+ 755x1000 ok); kit-page 755x1000 + 1180x820 ok (22 samples);
rel-words-scan 755/1180: all counts 0; night-day 2× ok (incl. the new buổi-sáng case); sheet-turn 755x1000 + 1180x820: no overflow, no ids, errs 0.

## Review r7 (review/fix-float-r7, on origin/main ed7271deb; reviewer)
- Merged 0840d01e6 onto main ed7271deb (scene-light r9, tassel-fix, event-balance). Conflicts:
  - assemble: main list + jkrel after jaudit, jint + jnight after main's new jstory/jevb, before j84.
  - j87 kitBook: this branch's personTop/personBody (kitRelTable, figure on every page incl. text pages, silhouette) + scene-light's
    `kitBookFigCol(fig,PW,PH)` in the person style; paginate keeps section titles / k-scroll and adds main's `b0`; the same-key fast
    path and the full rebuild share one `restore()` honouring keepB; `__kbk.relayout` and the FIGS-arrival relayout pass logicalB.
  - jk2b: main's small-frame geometry (tassel-fix, canvas 0–1037) + this branch's no-ring rule. KIT.md: main §56, then §57. Site rebuilt.
- Harness (coop-e2e): tapText clicks with noWaitAfter (load ~60: "waiting for scheduled navigations" aborted runs);
  "week after rebirth advances" dumps both seats on failure.
- Results (load avg 44–62):
  - book-person 5× at 1366x1024 + 1180x820: all ok, 0 undecoded, 0 rebuilt; + 755x1000, 1000x755, 844x390 ok.
  - book-figwide 1180x820: ALL OK (scene-light wide figures survived). rel-words-scan 755/1180: all counts 0.
  - night-day: ok (morning case day 0 → 1). sheet-turn 5 sizes: fwd/back ok, no overflow, ids 0.
  - kitDeltaAuto probe: "Nàng oán ta +2, thân −2" → "Nàng → ta: thiện cảm −2"; Lâm Phi / Các phi tần named; "hai người khác" unchanged.
  - coop-e2e plain: 59/59 in runs 1, 2, 4, 7; run 3 58/59 (FAIL "week after rebirth advances", no dump then); runs 5, 6 aborted by
    harness click timeouts under load (no game check failed).
  - COOP_NIGHTS=1: run 1 59/59 (6 nights); run 2 53/59 (9 nights): "after week 2 same date [[1,3,2],[1,4,0]]", week 3 stalled for both.
- RESULT r7 = FAIL (co-op nights). Mechanism found: jcoopworld onWeek rebuilds S with fromCanon(C,{keepQ:true}), so a night's
  dialogs stay open across the merged week; nightFx (j8, called when the night dialog is answered) then stamps
  S.toMorning = {d: wk() of the NEW day} and jnight spends the new day → that seat ends its day alone (guest at [1,4,0] "Đợi hảo hữu";
  host later pend with its own toMorning {d:3,b:0}). Fix idea: stamp the night's day when the night is WON (stealWin / S.tonight="me" /
  nightScene / Kính sự phòng) and let nightFx use that stamp; a night whose day is gone never ends a buổi.

## Round r8 (worker, on review/fix-float-r7 78c9106d4) — WIP checkpoint, pushed to review/fix-float-r8
Root causes and fixes (all in dev/build, site rebuilt with dev/site/build_site.sh):
1. Co-op nights desync (r7 FAIL). jnight: every dialog made by mkP gets `pp.nd` = the day it was raised; a night dialog
   (ksp / prep / night1 / night2) raised while answering another dialog inherits THAT dialog's day (`cur` = Q[0] captured in a
   chooseM wrapper). pp survives serQ/deserQ, so the stamp survives saves and the co-op week merge (fromCanon keepQ). nightFx sets
   S.toMorning only when the answered night dialog's day is today; a stale night still gives Sủng/Ân tình but never ends a buổi
   (counted in window.__nightStale, traced "staleNight" in COOPW.tr). Class scan of night entries (all reach ksp and/or prep → night1
   → night2 → nightFx): j8 stealWin, j8 nightScene, j8 PEND.ksp, j8 flip (ksp), j7 empnight "Thắp đèn hầu rượu", j75 nightScene wrapper,
   j75 lost-tablet ksp (196), j75 prep overrides (night1 106/111), test-forced nights. Before: day taken at nightFx (answer time) for all
   of them; after: day of the dialog that won the night, for all of them. Stale night dialogs are NOT closed on a merge (the night
   happened; closing would lose its gains) — they just cannot end a buổi. Also jcoopworld attach(): a new co-op life drops
   S.toMorning of the dead life.
2. Plain coop-e2e "week after rebirth advances" / "after week 3 same date [[1,3,2],[1,4,0]]" (reproduced in plain mode with the dump):
   a websocket reconnect under load. (a) The `room` snapshot handler rebuilt the week from the room base whenever room week > sent
   week, even when that merge had already been applied → the seat went back to buổi sáng while the server stayed at buổi tối
   ("badbuoi"), seats split. Fix: CW.wkIn = last merged week applied; onWeek ignores a duplicate ("week dup"), room handler only
   catches up. (b) A `bend` sent while the socket was down is dropped by COOP.send → both seats "Đợi hảo hữu xong buổi" forever
   (seen at 0:0 in a run). Fix: syncRoom (room snapshot after reconnect) resends a bend / week end the server does not hold
   ("rebend" / "re-end" in COOPW.tr).
3. Harness (coop-e2e): COOP_OLD_REF env for the old-save build (the shared checkout's origin/main ref was moved to an item-events
   merge; use COOP_OLD_REF=ed7271deb); week-advance wait 90 s; old page waits for its code and uses __nlInner (start() left S unset
   behind Luân hồi → "reading 'buoi'"); tapText retries a detached button. night-day.js: new 5th case "stale".
Tests on 677e54e6b (build = 0ef282c1e; load 37–66):
- night-day: 5 cases ok (steal, road, ksp, morning: day 0 → 1; stale: the day stays, its buổi sáng is not ended, stale=1).
- coop-e2e plain (COOP_OLD_REF=ed7271deb): 5 complete runs, all 59/59. 2 more runs were aborted by the harness (old.html left S unset;
  a button detached before the click); both are fixed in the harness. Before the fixes (724d6841a / e38280c07): plain run 1 = week 3
  "same date [[1,3,2],[1,4,0]]" (stale room replay), and a stall at buổi 0:0 with both seats bended locally (lost bend).
- coop-e2e COOP_NIGHTS=1: 2 runs, 59/59 (8 and 10 forced nights).
- book-person at 755x1000, 1000x755, 1180x820, 1366x1024 and 844x390: ok, bad [] at every size, errs [].
- sheet-turn at the same 5 sizes: exit 0, one #panel, ids 0, errs [].
RESULT r8: ready for review.
