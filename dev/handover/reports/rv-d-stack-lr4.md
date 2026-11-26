# rv-d-stack-lr4 — BIG DELTA REVIEW of review/d-stack-lr3 @ cfe52de7 (co-op tier)

Reviewer session_01D3E3NauPfw3dsE1T4df5UW (child of D WORKLIST lead #3 session_01D3E3Nb7sG6zYcKgPdneqfh), depth 4/8, START_CTX ≈ 3 % est. (get_session reads 0), roll line 28 %, ceiling 60 %.
PRIORITY #1 CHECK: OD 0 new | main LIVE 3af7896e (mghelp-dress-r6 on 6b5d3d05) | review/d-stack-lr3 cfe52de7 (FF from 3af7896e) | claims D WORKLIST lead row (session_01D3E3Nb7sG6zYcKgPdneqfh).
Read: START_CORE (18 laws) + START_WORKER + START_REVIEWER in full, topic/coop.md, d-worklist-land.md «LR4» in full.

## VERDICT: **FAIL** (2 faults, one family: the co-op friend housing tie-break in jpal palFix). Everything else in the delta passes.

### Faults
1. **dev/build/jpal.js:45-46 + :50 — a palace clash between the two players: each seat evicts ITS OWN player, both move, for ever, with a «Ban cung» ceremony every time (CO-OP, law 1 one world, regression vs LIVE).**
   The new sort puts the friend entry first in the palace occupancy (`heads…sort(coop first)`), so on seat A the guest keeps the palace and A's own S loses it; on seat B the host-friend keeps it and B's S loses it. Both re-pick the same first free palace (NPC world is the host's, so `free()`/`bcGrantIx` give the same answer), meet again after the merge, and swap back. Line 50 sets `S.palCer=1` on each move → palCeremony queues the «Ban cung» dialog each time.
   Proof (two pages = two seats; each round = palFix on both, then each seat's S housing copied into the other's friend entry, what buildFriend LOOK does at a merge), both players Tần in Hàm An cung:
   | build | round 1 | round 2 | round 3 | round 4 |
   |---|---|---|---|---|
   | cfe52de7 | A pal 0 + «Ban cung» · B pal 0 + «Ban cung» | A 3 + «Ban cung» · B 3 + «Ban cung» | A 0 + «Ban cung» · B 0 + «Ban cung» | A 3 + «Ban cung» · B 3 + «Ban cung» |
   | bare 3af7896e | A 3 · B 3 (no dialog) | same | same | same |
   (Bare LIVE has the old silent fault — two Tần in one palace, each seat re-houses the friend locally; the delta turns it into a loop the player SEES.) Reachable: both players promoted to Tần before a merge refreshes the friend entry (each seat sees her old pal = null, both pick the same free palace); also any old co-op room where the two already clash.
   Fix (one rule, seat-stable): the tie-break must give the SAME winner on both seats, e.g. the host's person keeps (seat a): on the host seat S sorts first, on the guest seat the friend (= host) sorts first; then only the guest's phone moves its own S, once. Same rule for the lone-palace loop (:46).
2. **dev/build/jpal.js:60-61 (hallFix) — same family for the side halls: the side-hall cap is NOT honoured with the friend counted.**
   hallFix keeps the friend in her hall even when it is full and moves this seat's S; on the other seat the mirror happens, so both move to the same other hall: final state on both seats = S and the friend in ONE hall while BAL.res.side = 1 (halls dong/tay). Proof (same two-seat probe, both below Tần in the same head's «dong»): cfe52de7 rounds 1-4 both «tay» (seat B also gets the «Phân cung» later-promotion panel in round 1); bare LIVE both «dong». The delta claims «she still counts in side-hall caps» — she counts, but the clash is never resolved. Fix: the same seat-stable tie-break as fault 1 (host's person keeps the room; the guest's own phone re-halls her S).
   Please add the two-seat clash (palace + hall) to a co-op test (coop-ban-cung or a unit probe) so it gates.

Probe used (my container, reusable; paste into dev/test if you want it): two Playwright pages on file://index.html, one `start()` world cloned into both, a coop entry id 902 on each, CASE P = `S.rank=f.rank=3; S.pal=f.pal=Hàm An`, CASE H = `S.rank=f.rank=1; S.resHead=f.resHead=key(head); S.resHall=f.resHall='dong'`; loop 4×: on each page `palFix(); if(S.palCer)palCeremony()` read Q titles, then `Object.assign(friendEntry, otherSeat.S housing)`.
Single-seat probe (same build): S + friend Tần in one palace → cfe52de7 S.pal moves (3 → 1), S.palCer=1, Q = [«Ban cung»]; bare LIVE S keeps 3, palCer 0, Q = [].
House cap (resHead count) is fine: S + friend + 1 NPC in a cap-2 house → the NPC moves, S and friend stay (both builds count right; LIVE wrongly moved the friend).

### What passes
(a) **f36cc48e re-stack merge**: for every j/js/py/sh file changed by the merge (136 files) a token-level 3-way (base f009e1a6, LIVE 6b5d3d05, stack 8d0f7143) equals the merge result; the one token-level conflict (jbal2 BAL.art line) is a tokenizer artefact — line-level 3-way of jbal2 = merge result. j23 / j85 / jrcp / jtabs counts: crsGainW( LIVE 3/5/3/5 = merge; BAL.artLes.k stack 7/5/9/5 = merge; BAL.btn.virLes.k stack 0/7/0/3 = merge; «khắc» count base = LIVE = stack = merge (1/7/13/13) → no edit lost, no typed khắc back.
(b) **30dda528 product code** apart from faults 1-2: jcoopworld LOOK + resHall/palLone/palWait goes into a freshly built friend entry (buildFriend, `s[k]!=null`) → old rooms without the fields simply leave them absent; jcoophl guest wrapper (npcList excludes coop) still makes the host the author of NPC housing; j95c cap trim / jpromob phanCungEdict / palFix sites skip v.coop; out-of-palace clear already guarded. Family scan of every housing write in dev/build (resHead / resHall / pal / palLone / palWait): j9 assignHouses → palFix (j27 wrapper), jbancung bcAsk = an ask the friend's own phone makes, jcoopthinb/c clear only «me» refs on level 3, jkc m.pal is another field (maid pal) → no unguarded site left. jpdist reads residenceOf (same fields on both seats) → coop-ban-cung palace-distance rows equal both seats 3/3.
(c) **coop-ban-cung.js test change = honest.** Bare 3af7896e with the OLD test failed «each seat sees the friend as a person» + both odds rows in a run with a cung nữ seat (lcbc2: B null), exactly the case the new lookup covers; the new test still demands a person on each seat and, for a cung nữ, that the other seat sees HER as a servant (not a skip). cfe52de7 run 3 COOP_B_ORIGIN=cnv exercised that branch: «guest person is a cung nữ: the host seat sees her as a servant» ok.
(d) **cfe52de7 merge of LIVE 3af7896e**: only index.html / sw.js + LIVE's own files (j79 j82 jk4 jtoil KIT.md dress-tap mg-back mghelp-back); diff vs 3af7896e on those = jtoil only, identical to the stack's own jtoil hunk; CHANGE.txt = stack line; assemble.py leaves the tree clean.

### Gates I re-ran on cfe52de7
| gate | result |
|---|---|
| coop-e2e (live Worker) | **143/143 PASS** |
| coop-ban-cung run 1 | 22/26 — only the known «Xin» cards / dialog drawn ×4 (forced rank-4 ceremony found every ask locked, n=1; jbancung untouched by the delta) |
| coop-ban-cung run 2 | 26/26 PASS |
| coop-ban-cung run 3 COOP_B_ORIGIN=cnv | 26/26 PASS (servant branch hit) |
| coop-one-world seeds 7 / 3 / 11 | PASS ×3 (+ quickcheck hook 7 / 3 PASS) |
| quickcheck.sh | own build OK; core gates = only G4 80-dialog-fixed «no empty Tốn / Được cell» Fold + iPad and G4 90-button-crawl «Ô lưu · Lui» (both known); TIME-SPILL GUARD PASS; browser PASS: open 1921 ms, old save from LIVE loads + plays a buổi (0 errors), perf median new/live render 246/218 ms, tab 468/535, buổi 1827/1833, tasks>200 ms 32/34 |
| old save | quickcheck old-save ok; pal-trim-oldsave PASS (heads / residents / capacity, 0 errors) |
| same-as-bare check | dialog-fixed on bare 3af7896e: the same 2 FAIL. coop-ban-cung on bare 3af7896e: run 1 23/23, run 2 cung nữ seat FAIL (old test); «Xin» not hit in my bare runs (chance: needs every ask locked) — the delta touches no code that check reads except palFix occupancy, and run 2/3 on cfe52de7 passed it |

Laws touched: 1 (one world) → FAIL items 1-2; 4 one core (BAL.res.side cap, khắc counts) → item 2 cap / merge OK; 7 wording: no new player words; 9 kit: no UI change; 11 whole family: scan above, the tie-break family = the 3 «coop first» sites (:45, :46, :60-61) must take the same seat-stable rule.
No shots/videos made (logic-only faults); nothing on the CDN to wipe from this review.
