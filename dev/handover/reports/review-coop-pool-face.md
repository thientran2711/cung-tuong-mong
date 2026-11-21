# REVIEW coop-pool-face — reviewer «REVIEW coop-pool-face» (session_01964izF6yWRxrNN3RCvPXFx, child of Foreman D #16)
START 2026-11-21 ~12:21Z | depth 8 (limit 8) | START_CTX ~3 % (1M window) | rollover at 28 % (not reached).

PRIORITY #1 CHECK: OD none on a co-op player/world face clash (OD:L1939 canon: Thái hậu drawn from the pool, one face for life; OD:L165 friend is «Người lạ» until met) | main LIVE j66.js pidRoll/pidEnforce/figUsed, jfigx.js:39 figThPick (guest waits for the host's face), jcoopworld.js toCanon/fromCanon, coop/worker/src/merge.js m3 | review/* only review/coop-pool-face | claims Foreman D #16, worker session_01964izF5rYFfN6AQemodeBW.

## VERDICT: PASS (with one reviewer fix)
LAND READY review/coop-pool-face-rv 6a654cac92f37486d4310b7710369325cef9a2d2 (on LIVE e87ae825), coop-e2e PASS + probe both seats.
LIVE moved to fc7f98f6 while I pushed: not merged again (3rd move during the review); the lander merges it — every LIVE merge so far conflicted only in built index.html/sw.js (rebuild with dev/site/build_site.sh).
Worker branch review/coop-pool-face 5c63b1e7 + LIVE merges (ee02e8c0 → 6f4e8d70 → e87ae825; only built index.html/sw.js conflicted → rebuilt with dev/site/build_site.sh) + 1 reviewer fix.

## Reviewer fix (b753c0f4): a player-vs-player clash moved BOTH players every week
The worker's roomTaken(C) counts the friend's identity on both seats, so when the two players already share one identity (an old room from
before this fix: the guest's roll never looked at the host's face either, ~1 in 32 rooms) BOTH seats run pidRoomFix on the same merged week,
start from the same index with the same fidUsed and land on the SAME next face — every week, for ever.
Proved with a new probe mode `PF_TWIN=1` (guest roll pinned to the host's S.pid, room check held off until the start check, as a pre-fix build):
- worker build: host/guest pids c26,c26 → c28,c28 → c29,c29 → c30,c30 (both moved every week) → **FAIL 18/21**.
- fix: `roomTaken(C,noFriend)`; fromCanon passes `host()` → on the host only the world's faces count; the guest still avoids the host's
  identity. Result c19,c19 → c19,c21 → c19,c21 → c19,c21 (host never moves, guest once) → **21/21**, again 21/21 (c11 → guest c13).
pidRoll (COOPW.taken) still counts the friend on both seats, so a new roll on either seat never lands on the other player.

## The 18 laws
- Law 6 (b)(c) real people, one stable face: every world person keeps the host's one face (pidRoomFix moves the player, never the world person; keepFaces stops the guest's week from changing a world face). PASS.
- Law 1 two-way: one rule by role on both seats — the host draws world faces, the guest never overwrites them; a player clash moves the guest on either seat order (same as figThPick «the guest waits for the host's face»). After the reviewer fix the host's own face is also stable. PASS.
- Law 4 one core: no numbers. Law 9 kit: no UI. N/A.
- One core (code): one rule in j66 (pidRoll / pidRoomFix / figUsed), one door (fromCanon), one backstop (toCanon guest). Solo untouched (COOPW.on gate). PASS.

## Questions from the brief
(a) Old rooms where the clash already happened: the guest's own face moves ONCE on reload (probe: c12→c13, c18→c19; twin c19→c21). OD has no rule on a co-op player's face moving; the canon (OD:L1939, art-wiring-1119) is «one face for life» for world people and «the player who rises shows her own face». Moving the world person would break a face on both seats (and the host re-roll is the bug itself); moving her once is the smaller change and only in the ~1/32 old rooms. Acceptable. Note for D: she gets no notice that her face moved (cosmetic only; no stats change). With the reviewer fix the host never moves.
(b) «mama:k01 held twice on the host»: SEPARATE root. Player identities are consort keys (pidKeys) or, via the picker, consort/maid keys (f88 «all»/«maid»); mama:k01–k08 are never a player's identity, so this chain cannot cause it. Likely a fidUsed bookkeeping gap (fidUsed is a plain string list: the Worker's m3 takes one side whole when both changed, so the other side's additions are lost and a face can be drawn again). Not proven; for D as its own ticket.
(c) Every pool-faced fixed person: roomTaken scans every `fid` in the room's world W (Thái hậu thO, Emperor, court, consorts R and their staff, men, kids in W) + the friend's identity; keepFaces covers W.S by path and W.R by id (staff arrays by id). Not covered, both edge only: (1) the friend's PERSONAL holders (S.maid, her own staff, her kids live in P, not W) — they draw maid/mama/kid faces, not consort faces, so pidRoll (consort-only) cannot hit them; only a servant-origin guest using the face picker (maid scope) could pick a maid face that the host's own maid wears; (2) the picker itself does not grey out the room's faces: in co-op a pick of a world person's face is then moved to the next free face by pidRoomFix (her choice silently changes). Both for D, not blockers.

## Gates (own clone, A host Fold 686x880@2.2, B guest iPad 1180x820@2, real Worker)
- probe LIVE ee02e8c0 (+probe file): PF_FORCE=1 **2/2 FAIL 10/13** (host re-roll c14→c24, c05→c13; guest blank) · natural 2/2 PASS (1-in-32 case) → real repro.
- probe merged worker 735d34e6: natural 13/13 · PF_FORCE 13/13 ×2 · PF_TWIN 18/21 FAIL (above).
- probe on fix b753c0f4: natural 13/13 ×3 · PF_FORCE 13/13 ×2 (forced c16, c11, guest moved) · PF_TWIN 21/21 ×2.
- coop-e2e: 94/94 (735d34e6) · 94/94 ×2 (b753c0f4) · 94/94 (31fdd2e5) · 94/94 (6a654cac, final).
- final 6a654cac: probe PF_FORCE 13/13 · PF_TWIN 18/18; 31fdd2e5: natural 13/13 · PF_FORCE 13/13 (forced c31) · PF_TWIN 21/21 (c28 host kept, guest → c29).
- coop-night: 105/105 (b753c0f4; LIVE merges after it touched no co-op file).
- quickcheck: PASS b753c0f4 (render 258/282, buổi 1339/1289 ms) · PASS 31fdd2e5 · PASS 6a654cac (render 303/272, tab 467/477, buổi 1544/1360 ms; old save ok; core gates PASS).
- LIVE-revert audit vs e87ae825: diff = dev/build/j66.js, dev/build/jcoopworld.js, dev/test/coop-pool-face.js + built index.html/sw.js. No LIVE line lost.
- Old saves: solo untouched (COOPW.on gate); quickcheck old-save load ok. New CW.taken/friendPid/faceKeep are runtime only.

## Notes for Foreman D
1. (b) mama:k01 twice on the host — separate ticket (fidUsed list merge suspected).
2. (c) face picker in co-op does not grey out room faces / friend's personal holders not in roomTaken (servant picker only).
3. Pre-existing: «man:thive-1/2» guards share faces by design (jmen), printed as a note by the probe.

No UI change → no device screenshots needed (probe shots scratch only, deleted).
