PASS (sha in dev/handover/reports/review-coop-guest-maid-r1.md on the handover branch = tip of review/coop-guest-maid-r1)

# PROGRESS review/coop-guest-maid-r1 (reviewer, opened by Foreman D s3)
Reviewed: origin/review/coop-guest-maid @66a55b06 (on servant-mline-r3 b82d3bf3). START_CTX ≈ 3 % of the 1M window.
Branch = 66a55b06 + merge origin/main 92668096 (conflicts only in generated index.html / sw.js and the assemble list: main's list + jmline.js, jcoopask.js; site rebuilt) + reviewer fixes below.
No Worker change (coop/worker untouched, not deployed). Relay uses `act` (Worker index.js:171, relayed as is, no 4000 cap); the durable copy
rides her seat blob (SEATMAX 3 M); pos untouched. An old client ignores it (jcoopworld onAct returns on mode ≠ "invite").

## Reviewer fixes (dev/build/jcoopask.js, PROTOCOL §4.1)
1. BLOCKING found + fixed: NPC household refill (deser → normAll → staffInit → fillStaff) ran on the GUEST against a world whose NPC had
   just grown on the host (rank-up → bigger cap, new consort without staff). collect() saw those servants as "new servant she put into an
   NPC" → srv requests → the host added them on top of its own fill. Probe (dev/test/coop-ask-srvprobe.js, NPC raised to rank 5 mid-week):
   before = host household 5 maids for cap 3 (`live s22>4`, `live s23>4` applied); after = 3/3, no srv request, both seats same sids.
   Fix: fillStaff is muted for NPC households on the guest (host only, as servMonth's refill already is).
2. Family completion (LUẬT SỬA CẢ NHÓM): a servant she takes OUT of an NPC household into hers (jpromo prStaff rank-up gift takes one
   from the lowest NPC; j72 a spy back to her) was the same loss as kidout (host wins the NPC staff array → the servant in two houses).
   New request k "srvout" {from, sid, name}; host removes that servant from the NPC. Probe: hers only on both seats.
3. ONE CORE: hNp typed the newcomer's host-side links (rel R(20)-10, ghen R(15)); now taken from newRival() on the host (which also gives the world id).
4. Tests: coop-e2e COOP_MLINE forces a consort guest (a random cung nữ start had no maids → the mline check was void); coop tests hide
   the KIT 81 card-flip scene and the origin roulette #kroul (the harness never closes it; it covered every screenshot) — like main's tests.

## Tests (LIVE Worker, one at a time)
| test | result |
|---|---|
| coop-guest-maid.js (host 755x1000@2, guest 1180x820@2) | 37/37 (after fixes; a later shot run 37/38: one "#next enabled" wait while the host had a minigame open — harness timing) |
| coop-e2e.js COOP_MLINE=1 | 61/61 (one earlier run 60/61: "NPC acts hit the guest's maids" = 0 hits by chance in 3 months; pre-fix control 61/61; rerun 61/61) |
| coop-ask-srvprobe.js (new) | 13/13 (before fix: 2 FAIL, household over cap) |
| mline-guest.js 36 months | ok; guest npcRefill 0, npcStaffChanged 0, 0 errors |
| mline-oldsave.js (origin/main save → this build, 24 months) | ok, 0 errors |
| TRIAL merge with review/coop-b1b5-p2 a9d25e28: coop-e2e / coop-guest-maid | 61/61 / 37/37 |
Trial merge conflicts: dev/build/jbal2.js only (two independent Object.assign(BAL,…) blocks: BAL.mline vs coopEmpY/coopBribe/psk.seat — keep both), plus generated index.html/sw.js. No overlap in jcoopworld (this branch does not touch it). coop-rejoin-xdev (main) untouched; rejoin tested in coop-guest-maid steps 2/5.
Screens looked at: host Fold + guest iPad game screens, no horizontal overflow, no %, kit-only (one log line, no new UI part).

## Open (pre-existing, not blocking; for Foreman D)
- World agency still rolled on the guest (worker's list): jpet NPC pet gains, j55 tdMonth NPC court acts, rivalNight NPC Sủng.
- Guest edits INSIDE an existing NPC servant (bribe spyFor) still lose to host-wins arrays; stand-in changes after the host applied are not carried; requests of a life that dies before the answer are dropped.
- An old host build never answers requests (her stand-in stays); mixed builds are already flagged by CTM_BUILD.
- coop tests: the origin roulette is only hidden, never closed (the life still starts); coop-e2e host runs 686x880@2.2.
