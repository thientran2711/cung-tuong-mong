# FOREMAN D STATUS
ORDER 16/11 applied (separate worker sessions, repo reports, hourly self-wake, claims).
last wake: 16/11 07:17Z (s2 = session_01DgYSWq6iuqbu5Vkmq1qN59; hourly wake trig_01GyzifNPR5nRN45YRj4LXdb at :24)
s2 start context ≈ 45k tokens; budget ≈ 56k → rollover per FOREMAN_D.md.
Session start 16/11. Starting context ≈ 60k tokens after the required reading; budget (start + 25%) ≈ 75k → rollover per FOREMAN_D.md when reached or on compaction.
main at start = eba64ead4.

| Item | Branch | Model | State |
|---|---|---|---|
| D-R1 newgame-ui-r2 review | review/newgame-ui-r3 @f484d226 | sonnet | PASS (see ## PASS) |
| D-R2 row-align re-review (C14) | review/row-align-r2 @69e6d56f | sonnet | PASS |
| C43 coop-invite-ux | review/coop-invite-ux-r1 @727b6112 | sonnet | PASS |
| C44 cloud-save (Sổ mây) | review/cloud-save-r1 @7e187abe | opus | PASS (see ## PASS) |
| D50 dialog fig placeholder | review/dlg-fig-ph-r1 @fd7768b3 | sonnet | PASS |
| balance-after-truth re-run | review/balance-after-truth @14fdce0c → review/balance-after-truth-r1 | opus | SẴN SÀNG KIỂM (measures only) → opus reviewer RUNNING |
| reign-road review | review/reign-road-r1b @3eb2c956d | opus | STOPPED: DUPLICATE (main's r1 fa201bbe0 PASS came first); 2 extra findings → QUESTIONS |
| C3 art-complete part 2 | review/art-complete | — | MOVED to Foreman C (owner Q-D1 answer, s9) |
| D51 fxkit follow-ups | — | — | MOVED to main (owner 07:25Z s10: one worker paints + wires) |
| D52 skin-match audit | review/skin-audit | — | NOT TAKEN: already RUNNING under Foreman C (FOREMAN_C_STATUS.md) — no double work |
| D54 buổi paintings | — | — | MOVED to Foreman C |
| D56 icons + Nội vụ phủ art | — | — | MOVED to Foreman C |
| fig-hd-upscale + face-sharp-hd2 | review/fig-hd-upscale | — | MOVED to Foreman C |
| slap-mg review 3c4f1c81b | — | sonnet | WAITING: facefx-all not on main yet |
| coop-chat review bdd2b6b53 | review/coop-chat-r1 | sonnet | kitStageRail (jrail.js §77) now on main → reviewer session_01DgYSWnc7QSik7k9buMTQwK RUNNING |
| servant-system phase 2 | — | opus | WAITING: fix A + audit review |
| act-split waves 2–3 | — | opus | WAITING: GO from main coordinator after act-dedupe lands |

## PASS (for the main coordinator to fast-forward)
- PASS review/coop-invite-ux-r1 727b6112b330eb8b96e621b0368f5cacccd1788f (C43 invite waiting state + 1-2-3 steps + auto-continue; coop-e2e 59/59; ff when written — main has moved since (bd6342c7), re-merge needed)
- PASS review/row-align-r2 69e6d56f18c555763acd3dd0eb291b3736ad022e (C14 row-align; contains main ba07c65e; main moved since, re-merge needed)
- PASS review/dlg-fig-ph-r1 fd7768b30966f4dfa5adc6d217feb9696995b3ec (D50 silhouette fallback in dialog/stage figures; contains main ba07c65; main moved since, re-merge needed)
- PASS review/cloud-save-r1 7e187abe27073b10fb4fd02434d212b43ec1142a (C44 Sổ mây; on main c4e89f8; code back to 8 chars (owner design) + per-network miss guard DO; MERGE = AUTO-DEPLOY of coop/worker (migration v2 Vault; dry-run OK; if rejected, old Worker keeps running → drop the [[ratelimits]] blocks); smoke test in reports/review-cloud-save-r1.md)
- PASS review/newgame-ui-r3 f484d226ff5bcf856735be4931bba4cac9d87133 (D-R1; on main 0a311183f; lag: long tasks 45.5 s→8.3 s, face tap 2.7–3.8 s→0.1–0.65 s; small fixes j86 .kpmbw, j2 psOpenText row; report reports/review-newgame-ui-r3.md)

## PENDING CDN UPLOAD

## QUESTIONS
- BALANCE (for main chat, from balance-after-truth 14fdce0c, measures only): HH 34% (target ~32 ✔); early death 38% (target 40–45, low edge); childbirth death 5%/birth (target 8–12; worker shows the mechanism is exact at 11% and calls the gap chance); median weeks to HH ~285 vs target ~188 (too slow on both builds). Next: re-measure after review/mortality merges, then consider seeMaxP 70→65. The slow pace depends on review/balance-pass (ex.bar), not merged; after it merges check HH does not overshoot (ex.bar[2] 28→30). Numbers change needs owner OK.
- ART NEEDED (for Foreman C, art owner since Q-D1; from D50): full-body figures for Phế phi họ Lý, Quản sự Tân Giả khố, Thầy dạy Thượng thư phòng — 4 age bands each (they now show the kit silhouette).
- (resolved by C44 r1: 8 chars + miss guard) C44 (a): the worker made the Sổ mây code 26 chars (130 bits) with Chép/Gửi buttons. OWNER_DECISIONS l.1016 (coordinator design, owner did not object) says 8 chars; the ≥128-bit rule came from D s1's brief, not the owner. Default = keep 8 chars + strong server-side rate limit/lockout, unless the main chat asks the owner once and she wants the long code. The reviewer is told to judge 8-char + lockout.
- C44 (b): no "xóa sổ trên mây" button (the drop endpoint exists and is tested). Add one? (main chat / owner)
- C44 deploy note: merging to main AUTO-DEPLOYS through .github/workflows/coop-worker.yml (migration v2 adds the Vault DO); no Cloudflare connector needed. If the account rejects the [[ratelimits]] blocks, remove them and redeploy. Smoke test in dev/PROGRESS_review-cloud-save.md.
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
- 07:17Z: s1 reports all agents done and is idle. PASS C43, row-align-r2, D50 recorded. balance-after-truth → opus reviewer claimed.
- 06:26Z: C44 PASS recorded; D51 wiring → main (owner 07:25Z); art no longer C's queue → main samples / C mass production (owner 06:55Z/07:30Z/07:45Z; art PAUSED tonight). Art-needed list from D50 stays in QUESTIONS for whoever owns art. act-dedupe w1 on main (02a0d3f1) — act waves 2–3 still wait for "GO" in FOREMAN_D.md. facefx-all not on main → slap-mg waits. servant fix A review not seen → phase 2 waits. balance-after-truth: s1 agent, no branch pushed yet (started 05:19Z; stale check at 08:19Z).
- 05:27Z: main still eba64ead4 → facefx-all, kitStageRail (goal-strip-fix), servant fix A, act-dedupe not on main: slap-mg / coop-chat / servant phase 2 / act waves stay WAITING. No free items in slice D to spawn; 7 s1 agents still running, no reports yet.

- (16/11 06:00Z) INBOX from main s10: NEW ITEM servant-system part C (jmline.js + BAL.mline active NPC maid line, owner-approved, unreviewed) on origin/review/servant-system b897bcf2cd (reports/servant-system.md). Claim + open an opus reviewer session. Main reviews only part A (servant-system-r1).

- (16/11 06:36Z) INBOX from main s10: act-dedupe wave 1 is LIVE (main 02a0d3f108). Take from reports/act-dedupe.md: (1) Danh balance recheck for Hành-sự-only players vs promotion gates (opus), (2) Emperor-stroll happening too rare → first "!" slot.

- (16/11 06:50Z) ORDER from main s10: UNBLOCKED → (1) act-split waves 2–3: GO (act-dedupe wave 1 live on main 02a0d3f108); (2) coop-chat review: GO (kitStageRail goal-strip-fix live since a363cc14a); (3) slap-mg still waits for facefx-all (merge-hot-2 running). Open them as separate sessions now, claim first.

- (16/11 07:25Z) ORDER from main s10: D51 fxkit call-site wiring is MOVED to main (the main-run art worker paints the sprites AND wires them). Drop it from your queue.
