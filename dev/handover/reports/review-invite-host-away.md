# REVIEW invite-host-away (BIG, time/rules) · reviewer opus session_01964izC6jHBiZGoM4SiRVK9 · foreman FOREMAN D #9 session_01964izESYCbbRTQ3P4Xy9Qp

PRIORITY #1 CHECK ('invite-host-away'): OD L1976 (owner rule, read verbatim) | main ptReg("invite") jptime.js:168, rcvInvAt jrcv.js:244, p3InvLand jagacts3.js:220 | review/invite-host-away ef8af1d1 (worker SẴN SÀNG KIỂM) | claims D #9 invite-host-away RUNNING · no other branch/worker on the host-absent rule.

Reviewed: review/invite-host-away @ ef8af1d176c5df816115b83dc9f99aed837bc6b1 (diff vs 377d5ce3: jptime.js §4b +56, jbal2.js BAL.invite.wait, test, dev/tools/arrive-scan.js).
Final merge: review/invite-host-away-rv @ a797336e71fc46a537f402331d728ce1c3f3be99 = ef8af1d1 + origin/main 716be762 (index.html/sw.js rebuilt, conflicts only in the two built files).

## VERDICT: FAIL (1 item; everything else holds)

1. CO-OP FRIEND SEAT IS ROLLED AS AN NPC GUEST (law 1 two-way + co-op parity; brief "co-op guard"). The friend is a rival entry {id:901/902, coop:true}
   (jcoopworld.js:84); the j21 «Mời đến cung ta» button is on her card too (j15.js:46 inviteBtn, no coop exclusion), and AG par3inv picks guests from
   others(v). rcvInvAt → iwAdd(h,g) has no coop check: probe `PTIME_IW.add(S, <rival with coop:true>)` while she is away → a wait is created
   (coopWaitCreated:true, Fold + iPad runs). iwTick then rolls stay/leave FOR A PLAYER (iwDraw vs iwStayO from her nết), and on «leave» applies
   relAdd(host, friend, BAL.invite.wait.loss), posts «<friend> sang chơi không gặp, đã ra về» on her screen and writes roster rows — while the friend's
   real position comes from her own client (keepFriendPos/sendPos) and she never chose to leave. The worker's own design says a player guest decides
   herself (the `g===S` branch); the friend seat is a player too. (Root, pre-existing: rcvAsk line 97 already answers the friend's acceptance with
   rcvPick outside COOPW.inv — not this branch's fault, but this branch adds a new roll + loss + notice on a player.)
   FIX: in iwAdd skip co-op seats (`if(g.coop||h.coop)return null` → keeps the visit as before), or give the friend the player branch on her own
   client; add a case to dev/test/invite-host-away.test.js (coop:true guest → no roll, no loss, no notice).

## Owner points (OD L1976) — checked in code + runs
| point | result |
|---|---|
| (1) guest arrives at the due khắc at the HOST's place; host away → waits, never leaves in the arrival khắc | OK: iwAdd t = min(now, PT.iwDue) (late landing keeps the due khắc); first decision K = last+1. Test A; own probe (arrival used 0 → first decision 1). |
| (2) from the NEXT khắc one stay/leave decision per khắc, taken AT that khắc | OK: loop K=last+1..end, one draw per K; meeting checked only after the draw of that K (iwTick runs inside spend and after goTo; iwDest makes her count as arrived during the walk's spend). Last khắc of the buổi = last decision; buổi end with host never back = leave. |
| same-khắc host arrival vs «leave» → no meeting | OK: test C (leave at khắc 4, she comes home khắc 4 → nobody, loss once). |
| (3) relation loss (BAL) + kitNotice + real walk back | OK: relAdd BAL.invite.wait.loss (−2); ptNote → window.kitNotice (one notice system); roster rows "back" then "stay" (law 6b). Shots: Fold 755x1000 + iPad 1180x820 — kit chip in the HUD «Quý phi ??? sang chơi không gặp, đã ra về.» (unknown person masked, no overflow, no cut text); notice box lists it. |
| (4) two-way: NPC host away when SHE comes; NPC↔NPC | OK for her (player decides: waits by staying, walking off = leaving + loss; host there = visit; test E) and NPC↔NPC (test F). NOT OK for the co-op friend seat → item 1. |
| (5) host back in time → visit as today | OK: iwAdd returns null when iwHere(host) (test D). |

## Laws
- Law 1 two-way: her / NPC / NPC↔NPC OK; co-op friend FAIL (item 1).
- Law 4 one core: BAL.invite.wait {o, affD, rk, net, loss}; no number in code except the hash modulus 100 (percent scale of od()). one-core-guard PASS.
- Law 6 real people: guest really walks back (rows), name masked when unknown. OK.
- Law 7 wording: the odds are never shown; test G maps stayO to a ladder word only. Notice text cổ trang. OK.
- Law 9 kit first: no new UI part; only kitNotice. OK.
- Law 11 whole family: node dev/tools/arrive-scan.js → ARRIVE-SCAN OK 17 kinds (unclassified kind fails the scan). Classification checked by hand: invite + npcinv
  are visits (rule applied); summon (họa sư/nhạc sư serves the week), giftin / shop (deliveries wait as cards) need no host; 12 errands n/a. Agree.
- Old save: S.invW lazy; quickcheck «old save ok».
- Co-op determinism: hash draw (task id, khắc) → same answer on every seat / reload; no Math.random; coop-one-world gate PASS. (Item 1 is about WHO is rolled, not the draw.)

## Gates on review/invite-host-away-rv a797336e (merged with LIVE 716be762)
- QUICKCHECK PASS · 241 s · open 1906 ms · old save ok · perf median new/live: render 282/273, tab 625/541, buổi 1388/1707, tasks>200ms 21/22 · CORE GATES PASS (one-core-guard · rules-one-source · kit-conform · coop-one-world · hooks 6) · TIME-SPILL GUARD PASS.
- invite-host-away.test 8/8 PASS · ptime2.test ALL OK · ptime.test ALL OK · arrive-scan OK 17 kinds.
- role-parity.test: 2 FAIL — identical on plain LIVE origin/main 716be762 (same gap list: up:P-ONLY:cx3:tell, harm:accuse/banphe/uyhiep N-ONLY + PROMO risen) → pre-existing, not from this branch (diff touches none of these acts). FOR MAIN: role-parity-open.json / those acts need an owner.
- Shots: scratch only (/home/user/wt/iha-shots, deleted with the verdict); none in git, no CDN review folder used.

## Notes for the foreman (not blocking)
- Free walk home: j2 goTo("home") costs 0 khắc; the owner's example counts 1 khắc. The rule holds either way (decision at K before the meeting at K). Already flagged to MAIN by the worker; agree it is a separate question (law 16: ask before changing).
- ptime.test check 5 flake: did not show in my run.

## Next
Worker fixes item 1 on review/invite-host-away (+ test case), final-merges current origin/main, SẴN SÀNG KIỂM again; a re-review can reuse review/invite-host-away-rv.

## RE-CHECK #2 (20/11 ~10:10Z) — review/invite-host-away @ 252ef6bad145891ddcffff0a3e371f0fcf75805a
VERDICT: **PASS 69e06387a21593e189e34a81e8fd738e7571c9dd** (review/invite-host-away-rv = 252ef6ba + final-merge of CURRENT origin/main fd682a8d; FF of origin/main; index.html/sw.js rebuilt).
- FAIL 1 fixed: jptime iwCoop(p) — iwAdd returns null when host or guest is a co-op seat (her invite, NPC host ↔ her, NPC↔NPC, all via rcvInvAt); iwTick drops any old-save coop entry.
  New test I (friend as guest + friend as host: no wait, no roll, no loss, no notice) → INVITE-HOST-AWAY 9/9.
- Diff vs main = only jptime §4b, BAL.invite.wait, the test, arrive-scan, PROGRESS (+ build). No regressions in the reviewed points (owner points (1)-(5), laws 1/4/6/7/9/11).
- Gates on 69e06387: QUICKCHECK PASS (open 1699 ms · old save ok · perf new/live render 270/263, tab 544/481, buổi 1387/1470, tasks>200ms 22/21 · core gates PASS) · invite-host-away 9/9 · ptime2 ALL OK · ARRIVE-SCAN OK 17 kinds.
- ptime.test: flaky checks 4 / 5 / 11 fail at random on BOTH branch and plain main (main fd/66bd: 5×2, 11×1, 4×1 in 9 runs). Check 11 was instrumented on the branch: its failures
  (spy / poison order «left:1») happen with S.invW EMPTY (no waiting guest) → not caused by this branch; pre-existing flake → FOR MAIN (de-flake ptime.test 4/5/11).
- role-parity 2 FAIL unchanged and pre-existing (see above) → FOR MAIN.
