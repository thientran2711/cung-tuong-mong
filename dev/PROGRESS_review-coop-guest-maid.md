# PROGRESS review/coop-guest-maid (worker, Foreman D s3) — co-op: the guest's own maid can rise; one guest→host request path
Base: origin/review/servant-mline-r3 @b82d3bf3 (already contains origin/main 18fb8252). START_CTX ≈ 2.5 % of the 1M window.
No Worker change, Worker not deployed; coop-rejoin-xdev code untouched; jcoopworld.js untouched (all in the new dev/build/jcoopask.js,
loaded last) so review/coop-b1b5-p2 (big jcoopworld diff) merges without conflict. Relay rides `act` k "ctm-ask" (like p2's "ctm-p2"),
the durable copy rides her own blob P.b.S.coopAsk and the host's answer P.a.S.askDone — no pos payload touched.

## Root cause
PROTOCOL §4 rule 4: a new id made only by seat b under W is dropped by the merge; rule 5: host wins NPC non-id arrays (staff, kids).
r2/r3 stopped the guest's maid from rising at all (mlEye returned false on the guest).

## Fix (PROTOCOL §4.1, dev/build/jcoopask.js)
Guest: newRival gives a temp id ≥ 1000; ser() moves temp persons into requests in S.coopAsk (stand-in kept for her until answered,
put back into R by deser); new servants she put into an NPC staff and a child she took from an NPC also become requests. New requests
are relayed once at once. Host: applies each request once (after every rebuild + on the relay while its `end` is not out), solo rules
(roomFor("consort") re-checked, world id ++rid, rival.coopAsk = request id, her links rl/ro/gp/ep[902] from the stand-in);
answer in S.askDone. Guest next rebuild: links under the temp id (S.rl/S.ro/known "r<id>"/{$r:id}/kin .pal) move to the world id;
refused → her maid returns (log line). jmline mlEye guest guard removed. Gain and loss = solo (same code, same BAL.mline numbers).

## Family scan — every "new id / new W item made by seat b" (static grep of rivals.push / newRival / staff.push / kids.push / pets.push)
| # | site | who triggers on the guest | before (main / r3) | after |
|---|---|---|---|---|
| 1 | j14 servRanks maid eye (jmline mlEye) | her maid | r3: never rises; main: maid vanished, no consort | request → consort for both |
| 2 | j8 sendMaid(S) "Tiến cử … hầu thay" | her choice | consort dropped at merge | request |
| 3 | j3 monthTick S.moreRivals ("Tâu nên tuyển nhiều") | her petition | dropped | request |
| 4 | j7 newGirl event (3 choices, rel ±) | her event | dropped (her rel lost) | request (rel kept) |
| 5 | jkc kcEnter: sister/friends enter with her | her road | dropped, kin .pal dangling | request (+ .pal remap) |
| 6 | j14 "bought by a bigger consort" (her maid → NPC staff) | NPC buys hers | lost when host touched that staff | request srv |
| 7 | servant she plants in an NPC staff (any guest code that pushes into NPC staff) | her act | same as 6 | request srv (generic) |
| 8 | j8 "takeaway" child from an NPC into her kids | her act | child on both sides when host touched t.kids | request kidout |
| 9 | j27 tuyenTu (every 3rd spring) | world | rolled on both, guest's girls vanished, card named the wrong girls | muted on guest (host only) |
| 10 | j55 tdSoMonth "tuyen" petition | world | rolled on both, dropped | "tuyen" blocked on guest |
| 11 | j8/j75 sendMaid(NPC) in rivalNight | world | rolled on both, dropped | muted on guest |
| 12 | j8 rivalsTurn new girls / outside queen, jbal contestOpen, j34 fillSeats | world | muted already (rivalsTurn) | unchanged |
| 13 | j2 start harem, jcoopworld placeFriend | throwaway / friend | not W | unchanged |
NOT fixed here (world agency still rolled on the guest, pre-existing, not "new id"; for Foreman D): jpet petMonth NPC pet gains, j55 tdMonth
NPC court acts (numbers add twice), rivalNight NPC Sủng per client; guest's edits INSIDE existing NPC staff (bribe spyFor) still lose to
host-wins arrays; stand-in changes made after the host applied are not carried; requests of a life that dies before the answer are dropped.
Also seen: after a rejoin sidN starts above 900 (staffInit counts the friend's coop servant sid) — pre-existing, harmless so far.

## Tests (LIVE Worker; host 755x1000@2, guest 1180x820@2; one at a time)
- dev/test/coop-guest-maid.js (NEW): live path (same week), durable path (relay dropped + guest rejoin before week end → host applies
  from her blob → both see it 2 weeks later), refusal (maid back + log), muted world creators, rejoin again → same consorts. 37/37.
- coop-e2e.js with COOP_MLINE=1: 61/61. mline-guest.js 36 months: ok. mline-oldsave.js (origin/main save, 24 months): ok, 0 errors. mline-shots-r3.js 755x1000@2 + 1180x820@2: no overflow, no %, 0 errors.
