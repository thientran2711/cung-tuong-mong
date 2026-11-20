# INVITE-HOST-AWAY #1 — report (worker, opus) · foreman FOREMAN D #9 session_01964izESYCbbRTQ3P4Xy9Qp

PRIORITY #1 CHECK ('invite'): OD 7 (L1976 = the rule) | ledger 1 | claims 8 (ordered 19/11 22:00Z, never opened before) | main 15 (j21.js:56-67, jptime.js:168-172 ptReg("invite"), jrcv.js:250 rcvInviteGo / rcvInvAt, jagacts3.js:228 cx3:invite2) | review/* 0 | archive 0 → nothing to reuse for the wait rule; built on the existing ONE entry rcvInvAt + jptime clock.

Branch review/invite-host-away · base origin/main 70bea3d3, final-merged 377d5ce3 · HEAD ef8af1d176c5df816115b83dc9f99aed837bc6b1
Owner rule OD L1976 read verbatim; brief dev/handover/briefs/D9-invite-host-away.md (it arrived after start; work matched it).

## What changed
- dev/build/jptime.js §4b HOST-ABSENT RULE (after §4 «Mời đến cung ta»). ONE entry: jrcv rcvInvAt(h,g) — every accepted guest is put at the host's place
  there (her invite via runner / j21 non-pt path; NPC host → her via rcvAsk; NPC↔NPC via p3InvLand). One state S.invW (old saves: lazy).
  1. host there when the guest arrives → nothing new (visit as before, item 5).
  2. host away → guest WAITS; the arrival khắc = the landing task's due khắc (a 2-khắc walk of hers lands the task one khắc late on her clock; the arrival is
     still the due khắc). No decision in the arrival khắc.
  3. from the next khắc: ONE stay/leave decision per khắc while the host is away, taken AT that khắc before she can meet the guest (a «leave» at khắc 4 and
     her coming home at khắc 4 = nobody there). Odds iwStayO = od(BAL.invite.wait.o + liking/affD + (host rank − guest rank)×rk + nết patience table).
     Draw = hash(task id, khắc) (no Math.random: co-op seats and reloads agree; no other roll moves).
  4. leave → relAdd(host, guest, BAL.invite.wait.loss = −2), notice via ptNote → window.kitNotice «<tên> sang chơi không gặp, đã ra về» (host = her) + log;
     guest roster rows: leave khắc [own palace,"back",…,"sang chơi không gặp chủ nhà, ra về"], then "stay" (law 6b, the walk back is seen); NPC host → newsAdd.
  5. the buổi ends and the host never came → same leave outcome.
  6. TWO-WAY (law 1): SHE is the guest of an away NPC host → she waits by staying there (player decides, no roll); walking off before the host is back =
     leaving (same loss + log line); host there when she stands there = visit. NPC↔NPC: same rolls, rows, loss.
- dev/build/jbal2.js: BAL.invite.wait={o:55,affD:3,rk:4,net:{Nóng nảy −20, Lạnh lùng −10, Tham vọng −5, Điềm tĩnh +15, Ân cần +10, An phận +10, Kín đáo +5},loss:−2} (law 4).
- No UI added: the only player-visible output is the kit notice (kitNotice) + log/news lines. KIT FIRST: no new part, no KIT REQUEST.

## Tests
- NEW dev/test/invite-host-away.test.js: INVITE-HOST-AWAY 8/8 PASS (before and after the final merge)
  A invite@k1 → she walks to Ngự hoa viên (2 khắc) → guest lands at her palace khắc 3, WAITS · B decision forced STAY → home → they meet ·
  C forced LEAVE → leave khắc = arrival+1, nobody home, loss once, notice text, roster "back" · D host home at arrival → no wait · E two-way NPC host away
  (she waits; walking off = leave + loss; host there = visit) · F NPC↔NPC (wait row "visit", leave next khắc, loss, "back" row) · G hash draw same twice,
  odds from BAL, ladder word · H no page errors.
- ptime.test.js: ALL OK on most runs; check 5 «invite» flakes ~1 in 3 — SAME on plain origin/main 377d5ce (the guest's own receiver answer is random; not from this change).
- ptime2.test.js ALL OK.
- tier.js: TIER BIG (jptime logic + BAL) as expected → full review.
- one-core-guard PASS · nrask-m-scan PASS · tone-pool-check OK. URL-taking suites (difficulty, khac-day-run, night-day, buoi-transition, paid-tiers, rules-one-source, errand-scene, kit-conform, perf, ptime-shots, game-feel) need BASE/OUT args; my local attempts timed out under CPU contention → left for the BIG reviewer (Fold + iPad).
- coregates: first run overlapped my merge + site rebuild (G1 baseline-not-in-sha, G2 rules-one-source crash, G3 kit-conform, G4 mk-layer) → re-run on the stable tree in progress; result appended below. shown-odds-scan: 1 AFTER path j10.js:125 plantServ = pre-existing (file untouched). receiver-choice-scan: gaps 0, unclassified 0. role-parity: PROMOTION ok (me + npc).

## WHOLE FAMILY (law 11) — node dev/tools/arrive-scan.js (every jptime send kind, all dev/build): ARRIVE-SCAN OK 17 kinds
| kind | who comes | to | host can be away | rule |
|---|---|---|---|---|
| invite | consort guest (her invite) | her palace | yes | HOST-ABSENT RULE |
| npcinv | NPC host's invitation → p3InvLand | guest → host's palace | yes | HOST-ABSENT RULE (NPC host ↔ her, NPC↔NPC) |
| summon | họa sư / nhạc sư | her palace | yes | not a visit: he serves the week there, stays until she comes (as before) |
| giftin | NPC servant with a gift | her palace | yes | delivery: the gift card waits for her; no host needed |
| shop | Nội vụ phủ eunuch, tray | her palace | yes | delivery: tray card waits; no host needed |
| scout, spy, listen, harm, plant, bribe, gift, buy, vlbuy, clothes, ask, mktspy | servants on errands | target / market / Nội vụ phủ | n/a | errands, not visits |
Before: 1 path (invite) with a guest stuck the whole buổi; NPC-host and NPC↔NPC paths had no rule. After: all 3 visit paths (invite, npcinv→her, npcinv NPC↔NPC) under ONE rule; 3 deliveries/summons left as is (no host needed), 12 errands n/a.
Also existing and unchanged: j21 «rivals call at her palace» (callMe) already has its own away handling (her maid tells or keeps quiet).

## Notes for the reviewer / foreman
- The walk home j2 goTo("home") costs NO khắc in code; the owner's example counts 1 khắc. The rule holds either way (decision at khắc K comes before
  meeting at K). Not changed (out of scope) — FOR FOREMAN: decide if the free walk home is a separate bug.
- Co-op: deterministic hash draw → both clients compute the same answer from the same state; no extra sync added.

## STATUS / HANDOVER (if a successor picks this up)
- Code + tests done and pushed on review/invite-host-away (HEAD ef8af1d1, final-merged origin/main 377d5ce3, index.html/sw.js rebuilt).
- Remaining: coregates re-run result (append here), then the «SẴN SÀNG KIỂM <sha>» line here + at the end of dev/handover/FOREMAN_D_STATUS.md + send_message foreman.
