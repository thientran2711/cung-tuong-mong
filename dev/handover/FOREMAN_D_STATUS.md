# FOREMAN D STATUS
ORDER 16/11 applied (separate worker sessions, repo reports, hourly self-wake, claims).
last wake: 16/11 09:33Z (s3 = session_01DgYSWmJqZEbu2bHw5WQjne; hourly wake trig_01PRsThQpzLFrogWwG2N6DLK at :28)
s3 START_CTX ≈ 6 % of 1M window (get_session 08:30Z: 11.8 % used); rollover at 31 % (START_CTX + 25 %), ceiling 60 %.
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
| balance-after-truth re-run | review/balance-after-truth-r1 | opus | PASS 614138eb (measures only; numbers re-run on main bad941b4: HH 20 %, childbirth death 17 % — see report) |
| reign-road review | review/reign-road-r1b @3eb2c956d | opus | STOPPED: DUPLICATE (main's r1 fa201bbe0 PASS came first); 2 extra findings → QUESTIONS |
| C3 art-complete part 2 | review/art-complete | — | MOVED to Foreman C (owner Q-D1 answer, s9) |
| D51 fxkit follow-ups | — | — | MOVED to main (owner 07:25Z s10: one worker paints + wires) |
| D52 skin-match audit | review/skin-audit | — | NOT TAKEN: already RUNNING under Foreman C (FOREMAN_C_STATUS.md) — no double work |
| D54 buổi paintings | — | — | MOVED to Foreman C |
| D56 icons + Nội vụ phủ art | — | — | MOVED to Foreman C |
| fig-hd-upscale + face-sharp-hd2 | review/fig-hd-upscale | — | MOVED to Foreman C |
| slap-mg review 3c4f1c81b | review/slap-mg-r1 | sonnet | FAIL 8 items → slap-mg-r2 (archived) |
| coop-chat review bdd2b6b53 | review/coop-chat-r1 | sonnet | PASS 24578406 (archived) |
| servant-system part C (jmline.js) review | review/servant-system b897bcf2 → review/servant-mline-r1 | opus | FAIL 3 items → servant-mline-r2 (archived) |
| act-split waves 2–3 + Emperor-stroll first "!" slot | review/act-split-w2 | opus | SẴN SÀNG KIỂM 30c0931d (archived) → r1 reviewer |
| Danh balance recheck (act-dedupe flag 1) | review/danh-balance | opus | worker session_01DgYSWoB9ztxCwmdBUbbxDS RUNNING (audit + proposal; no number change without owner OK) |

| act-split-w2 review | review/act-split-w2-r1 | opus | PASS 072687e2 |
| servant-mline FAIL fixes → then D58 close-maid | review/servant-mline-r2 → review/close-maid | opus | worker session_01DgYSWoCA2uzCCm4WDVxEAA RUNNING |
| slap-mg FAIL fixes (code; art → ART NEEDED) | review/slap-mg-r2 @dd0b618f | opus | SẴN SÀNG KIỂM (includes B's mg-balance 96736fff → ship with/after it; skilled nặng 24 %, random 4 %) → reviewer session_01DgYSWoEfbFL74QqJ1ySvjK RUNNING (review/slap-mg-r3) |
| ENTRY EXAM + origin intros (main s12 07:55Z) | review/entry-exam | opus | worker session_01DgYSWowhQ6xMD6E52HDA3H RUNNING |
| D8 Emperor visits + poison roads (orphan #19) | review/emperor-visit | opus | worker session_01DgYSWnVJ8zy6Hr7QeM3HD1 RUNNING (on mortality-r1) |
| D21 co-op B1–B5 (orphan #20) | review/coop-b1b5 @d0f2260a | opus | FAIL 6 (2 BLOCKING: pos >4000 chars dropped by live Worker; NPC acts on guest duplicate items) — reports/review-coop-b1b5-r1.md, r1 @8dd1626a; fixes handed to the part-2 worker |
| D21 part 2 (maid acts, shared heir, j99succ co-op, NPC acts on guest, coop-pets.js) | review/coop-b1b5-p2 | opus | worker session_01DgYSWnjWQExva4hE6H8RyB RUNNING |
| reign-road-r1b 2 findings (orphan #33) | review/reign-road-fix @9f4e8bf9 | sonnet | SẴN SÀNG KIỂM (kitNameList, 10 sites; overflow not on main) → reviewer session_01DgYSWoxLbnCcR7gE2i3QKu RUNNING |
| D4 NPC death/new faces + Phế phi Lý (orphan #18) | — | opus | WAITING: mortality-r1 (PASS 2d3428f8) on main |
| D57 preg-rate (orphan #2) | review/preg-rate | opus | WAITING: mortality + cycle-r3 on main |
| kc-roads-cn-nc round 3 review (main s14 08:41Z) | review/kc-roads-cn-nc-r1 | opus | reviewer session_01DgYSWnY5pFVmEYGWvruZFs RUNNING (FAIL list → main s14) |
| scene-end button sweep (KIT §81 live 9a4da876) | review/scene-end-sweep | sonnet | worker session_01DgYSWmAiQTHkmu8eoKhvWT RUNNING |
| coop-rejoin-xdev review | — | — | CANCELLED for D (main s13 has it) |

## PASS (for the main coordinator to fast-forward)
- READY review/act-split-w2-r1 072687e2cd549536374db37fe393f1b077464c39 (act-split waves 2–3 + Emperor-stroll first "!" slot; main 399483e3 is an ancestor → ff OK; report reports/review-act-split-w2-r1.md)
- READY review/balance-after-truth-r1 614138eb3eabd947efde7d9c5d9c23818b1e6e0f (measures/tools only, no BAL or game code; numbers on record; report reports/review-balance-after-truth-r1.md)
- READY review/coop-chat-r1 24578406f31621373e65bded2d37a102a456f05a (coop-chat 47/47; NEEDS coop/worker DEPLOY — live Worker has no chat; reviewer did not deploy; report reports/review-coop-chat-r1.md)
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

## s3 wake log
- 09:33Z (hourly): PASS act-split-w2-r1 + balance-after-truth-r1 → READY. reign-road-fix SẴN SÀNG KIỂM → reviewer. kc-roads-cn-nc r3 review (s14 08:41Z) and scene-end sweep (KIT §81 live 09:10Z) opened. 3 finished sessions archived. danh-balance worker (session_01DgYSWoB9ztxCwmdBUbbxDS): no report yet. 11 D sessions running.
- 09:29Z: coop-b1b5-r1 FAIL (6) → send_message to part-2 worker session_01DgYSWnjWQExva4hE6H8RyB: fixes first, then part 2, one reviewer for both. Reviewer archived.
- 09:20Z: slap-mg-r2 SẴN SÀNG KIỂM dd0b618f → opus reviewer; worker archived. ART NEEDED for slap (sprites + intro pic) in reports/slap-mg-r2.md → art owner (C / main samples).
- 09:09Z: coop-b1b5 SẴN SÀNG KIỂM d0f2260a → opus reviewer + part-2 worker opened; worker archived. 10 D sessions running.
- 08:36Z: main s12/s13/s14 inbox read (07:55 entry exam, 08:00 orphan audit D = #2 #3 #7 #18 #19 #20 #33, 08:10 scene-end sweep, 08:20 kc-roads review, 08:45 OD:L1288, 09:32 coop-rejoin cancelled, 08:23 worker rollover, 08:27 kit §81). PICKUP: #7 mortality = already PASS by main s12 (mortality-r1 2d3428f8) → not D; #3 D58 folded into servant-mline-r2 worker (same servant system, one worker); #19, #20, #33 opened; #2 + #18 wait for mortality/cycle-r3 on main. coop-chat PASS → READY. servant-mline + slap-mg FAIL → fix workers. 7 sessions opened, 5 finished sessions archived (incl. s1). 9 D sessions running.
- 07:29Z: s3 took over. 6 D sessions RUNNING (no new reports yet). mg-balance (07:10Z s11 inbox line) was pasted into FOREMAN_B/C/D.md alike, but OD:L1255/L1265 and HANDOVER_SESSION9 assign it to Foreman B (B has the scope extensions 07:20/07:25Z) → D does NOT take it (no double work); main chat: confirm, or write "mg-balance → D" here and D starts at once.

## s2 wake log
- 07:27Z: missed s10 inbox lines (06:00/06:36/06:50Z) found and taken now: servant part C review, act-split w2–3 (+stroll slot folded in: same act/happening code, owner 07:25Z same-worker rule), Danh balance recheck; facefx-all-r2 is on main → slap-mg review. act-dedupe UI flag (3) and art flag (4) are not in D's slice (UI = main; art = main samples / C).
- 07:17Z: s1 reports all agents done and is idle. PASS C43, row-align-r2, D50 recorded. balance-after-truth → opus reviewer claimed.
- 06:26Z: C44 PASS recorded; D51 wiring → main (owner 07:25Z); art no longer C's queue → main samples / C mass production (owner 06:55Z/07:30Z/07:45Z; art PAUSED tonight). Art-needed list from D50 stays in QUESTIONS for whoever owns art. act-dedupe w1 on main (02a0d3f1) — act waves 2–3 still wait for "GO" in FOREMAN_D.md. facefx-all not on main → slap-mg waits. servant fix A review not seen → phase 2 waits. balance-after-truth: s1 agent, no branch pushed yet (started 05:19Z; stale check at 08:19Z).
- 05:27Z: main still eba64ead4 → facefx-all, kitStageRail (goal-strip-fix), servant fix A, act-dedupe not on main: slap-mg / coop-chat / servant phase 2 / act waves stay WAITING. No free items in slice D to spawn; 7 s1 agents still running, no reports yet.

- (16/11 06:00Z) INBOX from main s10: NEW ITEM servant-system part C (jmline.js + BAL.mline active NPC maid line, owner-approved, unreviewed) on origin/review/servant-system b897bcf2cd (reports/servant-system.md). Claim + open an opus reviewer session. Main reviews only part A (servant-system-r1).

- (16/11 06:36Z) INBOX from main s10: act-dedupe wave 1 is LIVE (main 02a0d3f108). Take from reports/act-dedupe.md: (1) Danh balance recheck for Hành-sự-only players vs promotion gates (opus), (2) Emperor-stroll happening too rare → first "!" slot.

- (16/11 06:50Z) ORDER from main s10: UNBLOCKED → (1) act-split waves 2–3: GO (act-dedupe wave 1 live on main 02a0d3f108); (2) coop-chat review: GO (kitStageRail goal-strip-fix live since a363cc14a); (3) slap-mg still waits for facefx-all (merge-hot-2 running). Open them as separate sessions now, claim first.

- (16/11 07:25Z) ORDER from main s10: D51 fxkit call-site wiring is MOVED to main (the main-run art worker paints the sprites AND wires them). Drop it from your queue.

## HANDOVER (Foreman D s2 → s3, 16/11 07:30Z; reason: s2 context past start+25% budget) — s3 = session_01DgYSWmJqZEbu2bHw5WQjne (opened 07:27Z); s2 wake deleted, s3 owns the watch
- All D workers/reviewers are SEPARATE sessions (they survive the rollover); results land in dev/handover/reports/<name>.md. RUNNING now:
  coop-chat review (review-coop-chat-r1.md, session_01DgYSWnc7QSik7k9buMTQwK), balance-after-truth review (review-balance-after-truth-r1.md, session_01DgYSWp8zZ1eyzXhLPpAj3x),
  servant part C review (review-servant-mline-r1.md, session_01DgYSWnPWsFwg4R6LHZTKjr), slap-mg review (review-slap-mg-r1.md, session_01DgYSWpbGcGGy33MK9zBq4u),
  act-split w2–3 + stroll worker (act-split-w2.md, session_01DgYSWkZteXgU6WAkpJc2qr), Danh balance worker (danh-balance.md, session_01DgYSWoB9ztxCwmdBUbbxDS).
- On each report: PASS → "## PASS" + CLAIMS line; SẴN SÀNG KIỂM (act-split-w2, danh-balance) → claim + open a reviewer session (opus; Danh = proposal to main chat, numbers need owner OK).
- Read the INBOX lines the main chat writes into this file (s10 wrote 06:00/06:36/06:50/07:25Z orders here) on every wake.
- Briefs must POINT TO dev/PRIORITY_RULES.md + dev/art/OWNER_ART_RULES.md and order them read in full (owner 07:45Z verbatim rule).
- Not D's anymore: all art (main samples / C mass), D51 wiring (main), D52 (C). Nothing else waiting in slice D.
- s1 (session_01DgYSWnmBMie8SxZvqc7aLy) is idle. s2 hourly wake trig_01GyzifNPR5nRN45YRj4LXdb is deleted at handover; s3 must create its own.
