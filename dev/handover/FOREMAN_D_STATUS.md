# FOREMAN D STATUS
ORDER 16/11 applied (separate worker sessions, repo reports, hourly self-wake, claims).
last wake: 16/11 05:57Z (s2 = session_01DgYSWq6iuqbu5Vkmq1qN59; hourly wake trig_01GyzifNPR5nRN45YRj4LXdb at :24)
s2 start context ≈ 45k tokens; budget ≈ 56k → rollover per FOREMAN_D.md.
Session start 16/11. Starting context ≈ 60k tokens after the required reading; budget (start + 25%) ≈ 75k → rollover per FOREMAN_D.md when reached or on compaction.
main at start = eba64ead4.

| Item | Branch | Model | State |
|---|---|---|---|
| D-R1 newgame-ui-r2 review | review/newgame-ui-r3 @f484d226 | sonnet | PASS (see ## PASS) |
| D-R2 row-align re-review (C14) | review/row-align @0886f329b (old WIP review/row-align-r1 a26ec441) → review/row-align-r2 | sonnet | s1 agent stalled (interim a603afd0) → reviewer session_01DgYSWo7Zwjc5NpAfhvZGHV RUNNING |
| C43 coop-invite-ux | review/coop-invite-ux @cb77dda4 → reviewer review/coop-invite-ux-r1 | sonnet | SẴN SÀNG KIỂM → reviewer session_01DgYSWo9bFK5NRcy5Hrr3UX RUNNING |
| C44 cloud-save (Sổ mây) | review/cloud-save | opus | RUNNING (client + Worker code + local tests; DEPLOY → Foreman C) |
| D50 consort placeholder frame in dialog person column | review/dlg-fig-ph | sonnet | RUNNING |
| balance-after-truth re-run | review/balance-after-truth | opus | RUNNING |
| reign-road review | review/reign-road-r1b @3eb2c956d | opus | STOPPED: DUPLICATE (main's r1 fa201bbe0 PASS came first); 2 extra findings → QUESTIONS |
| C3 art-complete part 2 | review/art-complete | — | MOVED to Foreman C (owner Q-D1 answer, s9) |
| D51 fxkit follow-ups | — | sonnet | sprites MOVED to Foreman C; D keeps call-site wiring → WAITING for C's sprites on a review/* branch |
| D52 skin-match audit | review/skin-audit | — | NOT TAKEN: already RUNNING under Foreman C (FOREMAN_C_STATUS.md) — no double work |
| D54 buổi paintings | — | — | MOVED to Foreman C |
| D56 icons + Nội vụ phủ art | — | — | MOVED to Foreman C |
| fig-hd-upscale + face-sharp-hd2 | review/fig-hd-upscale | — | MOVED to Foreman C |
| slap-mg review 3c4f1c81b | — | sonnet | WAITING: facefx-all not on main yet |
| coop-chat review bdd2b6b53 | — | sonnet | WAITING: kitStageRail (goal-strip-fix) not on main yet |
| servant-system phase 2 | — | opus | WAITING: fix A + audit review |
| act-split waves 2–3 | — | opus | WAITING: GO from main coordinator after act-dedupe lands |

## PASS (for the main coordinator to fast-forward)
- PASS review/newgame-ui-r3 f484d226ff5bcf856735be4931bba4cac9d87133 (D-R1; on main 0a311183f; lag: long tasks 45.5 s→8.3 s, face tap 2.7–3.8 s→0.1–0.65 s; small fixes j86 .kpmbw, j2 psOpenText row; report reports/review-newgame-ui-r3.md)

## PENDING CDN UPLOAD

## QUESTIONS
- KIT REQUEST (for the kit keeper, from D-R1 review): the event-frame body #mb is overflow:hidden, so long text is clipped (also on main: Nhập cung "Hậu cung" row at 1366x1024, any long event dialog) → the kit event-frame body needs a scroll area.
- UX note (not blocking, for main chat): on the new-game screen the face picker starts below the fold (≈25 px visible at 755x1000, none at 1180x820 / 844x390).
- (answered, see HANDOVER) Q-D1.
- FOR MAIN CHAT, BEFORE MERGING review/reign-road-r1 (fa201bbe0/0a311183): D's duplicate reviewer found 2 FAILs r1 misses (reports/reign-road-r1b.md): (1) Triều cục faction rows show unknown consorts as "Quý phi ???" → cherry-pick the jreign.js hunk of 3eb2c956d + rebuild site; (2) at 755x1000, 26/153 option hints overflow the fixed 130px .opts.k3rows card → shorten hints or KIT REQUEST (k3rows rows grow with content). Kit keeper decides (2).
- (resolved) review/reign-road-r1 was claimed twice in CLAIMS.md (main s8 subagent AND D s1 agent). Whoever pushes first wins; the other should stop. D will not re-open it.
- Q-D1 (for the main coordinator / owner): account D has NO Magnific and NO Cloudflare connector. Blocked until connected: C3, D51 sprites, D54, D56, fig-hd-upscale, face-sharp-hd2, and the C44 Worker deploy. Can the owner connect both on account D, or should these art items go back to an account that has them?

## HANDOVER (Foreman D s1 → s2, 16/11 05:19Z; reason: the s1 chat was summarised → rollover rule) — s2 = session_01DgYSWq6iuqbu5Vkmq1qN59 (opened 05:22Z); s1 hourly wake deleted, s2 owns the watch
- s1 stays alive only so its 7 in-session agents (table rows marked RUNNING) can finish; s1 spawns nothing more. Each was told to write dev/handover/reports/<branch>.md on this branch + push its review/* branch + PROGRESS. s2: read those reports each wake; if an item shows no push for 3 h, re-open it as a SEPARATE session from the pushed branch/PROGRESS.
- From now on ALL workers/reviewers = separate sessions (create_session), claimed first in STATUS + CLAIMS.md.
- Waiting: slap-mg review (facefx-all on main?), coop-chat review (kitStageRail on main?), servant-system phase 2 (fix A + audit reviewed?), act waves 2–3 (GO here?).
- Blocked on Q-D1 (no Magnific / Cloudflare on account D): C3, D51 sprites, D54, D56, fig-hd-upscale + face-sharp-hd2, C44 deploy.
- D52 is Foreman C's (review/skin-audit). Shared briefs for workers: dev/handover/PREAMBLE.txt + REVIEWER.txt (s1 had local copies at /home/user/wt/FOREMAN_D_*.txt; sessions do not share disk — paste the brief text in each create_session prompt).

- ANSWER Q-D1 (s9, owner): art items + Worker deploy moved to Foreman C (see FOREMAN_C.md "MOVED FROM FOREMAN D"). Drop them from your slice; keep D51 wiring + C44 code.

## s2 wake log
- 05:27Z: main still eba64ead4 → facefx-all, kitStageRail (goal-strip-fix), servant fix A, act-dedupe not on main: slap-mg / coop-chat / servant phase 2 / act waves stay WAITING. No free items in slice D to spawn; 7 s1 agents still running, no reports yet.

- (16/11 06:00Z) INBOX from main s10: NEW ITEM servant-system part C (jmline.js + BAL.mline active NPC maid line, owner-approved, unreviewed) on origin/review/servant-system b897bcf2cd (reports/servant-system.md). Claim + open an opus reviewer session. Main reviews only part A (servant-system-r1).
