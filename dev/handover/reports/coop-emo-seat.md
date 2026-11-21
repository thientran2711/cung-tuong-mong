# coop-emo-seat: NPC feelings the same on both co-op seats (worker EMO BALANCE #1 → successor) — report + HANDOVER

PRIORITY #1 CHECK ('coop-emo-seat|emoSet guest|R#1 emo'): reports/coop-host-lag.md:54 (Foreman B, review/coop-host-lag-r2 f13d8932, NOT landed: Empress hhBind→affAdd→emoEv path, its own jcoophl.js) | reports/emo-balance.md + review-emo-balance.md (finding + FOR MAIN) | main: jcoopone.js guard table, jemo.js emoSet/emoEv/emoWeek | claims: this job only.

Job (D #14, 21/11 07:29Z): fix at the root the pre-existing co-op mismatch of NPC #1's feeling (p.emo) between seats after a merged week. Gates: coop-emo-seat 12× 0 FAIL, coop-e2e, emo BIG tests, quickcheck. Independent of emo-balance (no tuned values).
OVERLAP (D #14 07:50Z, written in FOREMAN_B_STATUS.md): coop-host-lag-r2 fixes the Empress hhBind path its own way. **Whichever lands second re-runs coop-emo-seat + coop-hl.** D #14 approved: "a rebuild must create no feeling".

## State at handover (21/11 ~08:05Z)
Branch review/coop-emo-seat c09e3a5d (pushed), from LIVE aee7ff84. WIP, NOT ready:
- dev/test/coop-emo-seat.js: the probe (from emo-balance). It compares, on both seats at every merged week, each NPC's [k,v,t,why,w] + emoMul + BAL.feel.
- dev/test/coop-emo-trace.js: the same probe plus a tracer. An init script re-installs after every reload. It logs to localStorage '__et' every emoSet on NPC id 1 (week, buổi, seat, kind, value, cause, inFC, caller chain) and NPC #1's feeling after each fromCanon (COOPW.afterFC). The dump is printed on FAIL or with TRACE=1. Do not commit it to the final branch; it is a dev tool.
- dev/build/jcoopone.js: "emoWeek" added to ONLY_ME, plus an emoSet guard (emoOff: a non-own person's feeling is dropped inside fromCanon on either seat, and on the guest outside her own act).
  **Result: 9/12 FAIL (8 after a merged week)**, the same rate as or worse than LIVE (LIVE 9/18 before). So the guard is NOT the fix (or not the whole fix).

## What the traces show (logs /home/user/wt/emo-out/{tr4,fx1}/t*.log, container scratch)
- NPC #1 = the Empress (id 1).
- Run fx1/t5, week 1: host afterFC = vui 22 "phòng ốc bày biện vừa ý"; guest afterFC = vui **37**, same cause. 37 = 22 + 15, and 15 is the guest's own "vui 15 được … đối đãi tử tế" (affAdd→emoEv, logged during fromCanon).
  Same kind, same why, value = host's + guest's write.
  => Suspect the server's 3-way NUMERIC merge of W.R (jcoopworld header: "the server's 3-way merge adds my deltas to hers"). It adds the guest's delta of p.emo.v to the host's. The guest then reads the merged sum, while the host reads its own value: the host rebuild either keeps its own, or the merged C differs per seat (thin C-room lens: CW.lensR / jcoopthinc.js).
- Unverified: whether the guest's guarded emoSet still changed p.emo before toCanon (the tracer logs BEFORE the guard decides). Next step: log inside the guard whether it dropped the write, and log C.W.R[Empress].emo as each seat RECEIVES it in onWeek (before fromCanon) and as each seat SENDS it in toCanon.

## Suggested root fix (for the successor to verify)
p.emo of a world person should not be numerically merged. Make it host-authoritative in the merged week: in toCanon on the guest (or in the server merge), carry the BASE p.emo for every NPC, as HOST_ONLY does for world S keys. Her own act's feeling on an NPC then reaches the host as an op (or is dropped: decide with D). Keep the emoSet guard only if it is still needed after that. Then run coop-emo-seat 12× (4 in parallel is fine), coop-e2e, coop-hl tests, quickcheck, emo BIG tests (emo-men, emo-seal-persist, feel-shown, feelings18, game-feel).

## COOP-EMO-SEAT #2 start (21/11 ~08:05Z)
session_01964izG1vuu39FQLbioHU1N, depth 6, START_CTX ~4% of 1M (roll at 29%, ceiling 60%). Taking over review/coop-emo-seat c09e3a5d. Plan: make NPC p.emo host-authoritative in toCanon/merge.
