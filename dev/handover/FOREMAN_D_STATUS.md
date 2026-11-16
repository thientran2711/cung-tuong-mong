# FOREMAN D STATUS
ORDER 16/11 applied (separate worker sessions, repo reports, hourly self-wake, claims).
last wake: 16/11 05:19Z
Session start 16/11. Starting context ≈ 60k tokens after the required reading; budget (start + 25%) ≈ 75k → rollover per FOREMAN_D.md when reached or on compaction.
main at start = eba64ead4.

| Item | Branch | Model | State |
|---|---|---|---|
| D-R1 newgame-ui-r2 review | review/newgame-ui-r2 @70119a805 → review/newgame-ui-r3 | sonnet | RUNNING (reviewer) |
| D-R2 row-align re-review (C14) | review/row-align @0886f329b (old WIP review/row-align-r1 a26ec441) → review/row-align-r2 | sonnet | RUNNING (reviewer) |
| C43 coop-invite-ux | review/coop-invite-ux | sonnet | RUNNING |
| C44 cloud-save (Sổ mây) | review/cloud-save | opus | RUNNING (client + Worker code + local tests; DEPLOY BLOCKED: Cloudflare not connected on account D) |
| D50 consort placeholder frame in dialog person column | review/dlg-fig-ph | sonnet | RUNNING |
| balance-after-truth re-run | review/balance-after-truth | opus | RUNNING |
| reign-road review | review/reign-road @c0e6f7d25 → review/reign-road-r1 | opus | RUNNING (reviewer; first checks no other reviewer pushed) |
| C3 art-complete part 2 | review/art-complete | sonnet | BLOCKED: Magnific not connected on account D |
| D51 fxkit follow-ups (5 new sprites + call sites) | — | sonnet | BLOCKED: new sprites need Magnific (account D has none) |
| D52 skin-match audit | review/skin-audit | — | NOT TAKEN: already RUNNING under Foreman C (FOREMAN_C_STATUS.md) — no double work |
| D54 buổi paintings for every place | — | sonnet | BLOCKED: Magnific |
| D56 kit icon glyphs + Nội vụ phủ scene | — | sonnet | BLOCKED: Magnific |
| fig-hd-upscale + face-sharp-hd2 | review/fig-hd-upscale | sonnet | BLOCKED: Magnific + CDN upload |
| slap-mg review 3c4f1c81b | — | sonnet | WAITING: facefx-all not on main yet |
| coop-chat review bdd2b6b53 | — | sonnet | WAITING: kitStageRail (goal-strip-fix) not on main yet |
| servant-system phase 2 | — | opus | WAITING: fix A + audit review |
| act-split waves 2–3 | — | opus | WAITING: GO from main coordinator after act-dedupe lands |

## PASS (for the main coordinator to fast-forward)

## PENDING CDN UPLOAD

## QUESTIONS
- Q-D1 (for the main coordinator / owner): account D has NO Magnific and NO Cloudflare connector. Blocked until connected: C3, D51 sprites, D54, D56, fig-hd-upscale, face-sharp-hd2, and the C44 Worker deploy. Can the owner connect both on account D, or should these art items go back to an account that has them?

## HANDOVER (Foreman D s1 → s2, 16/11 05:19Z; reason: the s1 chat was summarised → rollover rule) — s2 = session_01DgYSWq6iuqbu5Vkmq1qN59 (opened 05:22Z); s1 hourly wake deleted, s2 owns the watch
- s1 stays alive only so its 7 in-session agents (table rows marked RUNNING) can finish; s1 spawns nothing more. Each was told to write dev/handover/reports/<branch>.md on this branch + push its review/* branch + PROGRESS. s2: read those reports each wake; if an item shows no push for 3 h, re-open it as a SEPARATE session from the pushed branch/PROGRESS.
- From now on ALL workers/reviewers = separate sessions (create_session), claimed first in STATUS + CLAIMS.md.
- Waiting: slap-mg review (facefx-all on main?), coop-chat review (kitStageRail on main?), servant-system phase 2 (fix A + audit reviewed?), act waves 2–3 (GO here?).
- Blocked on Q-D1 (no Magnific / Cloudflare on account D): C3, D51 sprites, D54, D56, fig-hd-upscale + face-sharp-hd2, C44 deploy.
- D52 is Foreman C's (review/skin-audit). Shared briefs for workers: dev/handover/PREAMBLE.txt + REVIEWER.txt (s1 had local copies at /home/user/wt/FOREMAN_D_*.txt; sessions do not share disk — paste the brief text in each create_session prompt).

- ANSWER Q-D1 (s9, owner): art items + Worker deploy moved to Foreman C (see FOREMAN_C.md "MOVED FROM FOREMAN D"). Drop them from your slice; keep D51 wiring + C44 code.
