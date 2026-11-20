# PROGRESS — invite-host-away (INVITE-HOST-AWAY #1, Foreman D #9)
Owner rule: dev/OWNER_DECISIONS.md L1976 (19/11 ~22:00Z), verbatim, binds.

## Done
- jptime.js §4b HOST-ABSENT RULE: ONE entry = jrcv `rcvInvAt(h,g)` (every accepted guest is put at the host's place there: her invite via the
  runner / j21, an NPC host inviting her via rcvAsk, NPC↔NPC via p3InvLand). State `S.invW` (old saves: created lazily).
  - host there at the guest's arrival → nothing changes (visit as before)
  - host away → guest WAITS in the arrival khắc (= the landing task's due khắc, even when a 2-khắc walk of hers lands it one khắc late)
  - from the next khắc: one stay/leave decision per khắc, AT that khắc (before she can meet her), odds `iwStayO` from BAL.invite.wait
    (liking/affD, rank gap × rk, nết patience table), capped by od(); draw = hash(task, khắc) → same on every co-op seat, no Math.random moved
  - leave → relAdd(host, guest, BAL.invite.wait.loss), notice via ptNote → window.kitNotice «<name> sang chơi không gặp, đã ra về» (host = her),
    roster rows of the guest: leave khắc "back" to her own palace, then "stay"; NPC host → newsAdd line
  - buổi ends with the host never back → same leave outcome
  - SHE as guest (NPC host away): she waits by staying; walking off before the host is back = leaving (same loss + log line)
- jbal2.js: BAL.invite.wait = {o, affD, rk, net{…}, loss} (one core, law 4)
- dev/test/invite-host-away.test.js (8 checks) · dev/tools/arrive-scan.js (whole family, law 11)

## Notes
- The walk home in j2 goTo("home") is free (no khắc); owner counts it as 1 khắc. The rule holds either way: a decision at khắc K is taken before
  she can meet the guest at K. Not changed here (out of scope; flagged to the foreman).
