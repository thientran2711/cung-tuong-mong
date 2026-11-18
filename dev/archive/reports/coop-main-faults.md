# coop-main-faults — pre-existing faults on main (co-op + people ledger)

Branch `review/coop-main-faults` @ **3751fbba** (from origin/main 08725411). Worker session_01UV1SzhtAPtuPxkPbKD16am, coordinator MAIN s26.
START_CTX ≈ 6 % of 1M (get_session read 0; own estimate). Finished at ≈ 27 %: no rollover needed.

## Result

| # | Fault (brief) | Root cause | Fix | Before (main) | After (branch) |
|---|---|---|---|---|---|
| a | coop-p2 B1 bribe "tai mắt" fails + hangs | **Name mask not idempotent.** j61 `k61Scrub` masks an unmet friend as `K61FR` "Hảo hữu của ta". When her entry's name is itself inside that mask ("Hảo hữu"), every pass adds "của ta" again. Two DOM observers (j61 `k61Node`, j84 VP `fixText/fixAttr`) answer each other's writes → endless loop, the host page hangs for good (CDP pause: `k61Node`/`fixText` every sample, string "Hảo hữu của ta của ta …"). Seen right after the host's "Mua chuộc" result card + friend chip render. | `dev/build/j61.js` k61Scrub: a match already sitting inside its own mask is left as it is (generic: any mask that contains the name). | 11/12 then hang (FAIL "she is now my tai mắt"; page never answers) | **45/45** |
| b | coop-b1 step 8 laydo (guest steals from host) | **One-world guard blocked her own act.** `dev/build/jcoopone.js` PERSON guard makes `loLose(p)` return null on the guest for anyone but her (meant for world loops), so the guest's own "Sai người lấy trộm đồ" on the host's entry always printed "Rương … không còn món nào đáng lấy" though 21 items were stealable. | jcoopone: the guest's own act (outermost `runAct` with a===S) passes every PERSON / drawLot / fxIllMonth / wdNpcDress guard; `endTurn` / `nextBuoi` reached from inside an act reset it (still a world loop). Results reach the other seat as before (res.fam for the friend, merged week for NPCs). `COOP_ONE.ownAct()` for tests. | FAIL 8 "B gained it", "A lost it" (+ 2 phonghoa fails once, not reproduced) | **41/41** |
| c | coop-night case "sees the wait" | **NOT this branch's roots — intermittent on main AND branch.** Unmodified test: main 94/99, 94/99, 105/105; branch 105/105, 105/105, 100/105. Failing dump: the leaving seat stays `online:true` on the Worker for the full 60 s (`seats.b.online` never drops), the staying page is fine (one socket, not frozen). Live probe against the deployed Worker (`probe/zombie.mjs`, kept out of git): clean close → presence false in 51 ms; vanished TCP + immediate rejoin + close → false in 24–34 ms. So the Worker counts closes right; the lost presence comes from the browser side (the closed page's socket not closing / a second socket of the same seat). Worst case after a lost close = STALE 45 s + alarm 20 s = 65 s > the test's 60 s wait. | none (no Worker deploy from a review branch). → belongs to **review/coop-stable** (test stability / ws logs) — please hand over there. | 5 FAIL in 2 of 3 runs | 5 FAIL in 1 of 3 runs |
| d | roster_dom 7–8 people-ledger mismatches (screen > record) | **Two copies of one rule.** `dev/tools/roster.js` kept its own copy of "who the map counts" from before the people ledger (only who the stage drew); the game (j95vis under j95led) counts everyone in the record except herself and her maid walking with her. The tool counted 1–8 fewer than the screen (maids following their mistress `mm:N`, servants at palaces, children…). In-game map vs record was already equal. | `dev/build/j95.js`: the record keeps, per khắc, who the map leaves out (`R.nv`, also in the buổi log `nv`); roster.js counts from it (the game's own rule); an older save without the list uses the people-ledger rule itself (pre-ledger copy removed). `dev/test/roster_dom.js` also checks the old-save fallback. | Fold default 0, origin cn 4, muoi 11, thd 3, tt (iPad) 6 bad moments | **0 / 0 / 0 / 0 / 0**, + 0 / 0 / 0 with the old-save check |

## Whole family (LUẬT SỬA CẢ NHÓM)
- (a) New `dev/test/text-idem-scan.js`: every DOM text rewriter must be idempotent (f(f(x)) = f(x)): VP.fix, VP.itemLow, k61Scrub (lead/plain) over every
  text node + title/aria-label + log line of 12 real game moments, plus one unmet consort named as each risky label ("Hảo hữu", "Người lạ", "Một vị",
  "chưa quen biết", "Hoàng hậu", "Thấy mặt"), plain and as the co-op friend; plus a live DOM node with a mask-like name must settle.
  Before: **23 failures + page hang** (live check never answered). After: **0 failures / 746 strings**, live node settles in 1 round.
- (b) All guest guards checked: PERSON (stipend, illMonthP, fireServ, npcStudy, loLose, ktGrow), drawLot, fxIllMonth, wdNpcDress now let her own act through;
  MUTE / ONLY_ME are loops only (unchanged). coop-one-world PASS (guards still stop world loops).
- (d) Scan of every reader of the map rule (`git grep j95vis`, the old pattern strings): ledger_shadows / ledger_stage / roster_audit / roster_dom use the in-game
  j95vis (one rule); dev/tools/roster.js was the only private copy → fixed.

## Tests (branch 3751fbba, live Worker)
- quickcheck PASS (open 1369 ms, old save ok, perf new/live render 254/241, buổi 778/1050).
- coop-p2 45/45 · coop-b1 41/41 · coop-e2e 57/59 then **59/59** on rerun (the 2 fails were "reborn friend" entry not yet placed — known flake class) · coop-one-world PASS ·
  coop-night 105/105, 105/105, 100/105 (see c).
- roster_dom 8 runs 0 bad (Fold 755x1000, iPad 1180x820, Fold land 1000x755; origins tt/cn/thd/muoi/random) · ledger_shadows 0 bad (683/683) ·
  name-mask-dom-scan 0 hits · name-mask-oldsave PASS · name-mask-scan 8 months PASS (main: FAIL 2 hits) · text-idem-scan PASS.
- No player-visible wording or UI changed (no kit part touched).

## Files
dev/build/j61.js · dev/build/jcoopone.js · dev/build/j95.js · dev/tools/roster.js · dev/test/text-idem-scan.js (new) · dev/test/roster_dom.js · site rebuilt (index.html, sw.js, assets.json).
