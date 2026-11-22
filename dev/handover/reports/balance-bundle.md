# BALANCE BUNDLE (night-final-r3 nobc + balance-final §7 Danh re-tune)

- (21/11 ~08:00Z) START: session_01964izFMEzgM3McEsBDo8ng, depth 6, START_CTX ≈ 3 % (own estimate; get_session used_tokens reads 0). Rollover at ≈ 28 %, ceiling 60 %. Coordinator D #14 session_01964izE19z2nZ1MbPTVsG1X. Branch to build: review/night-balance-bundle (from newest review/night-final-r3-nobc tip). Reading START_CORE/START_WORKER + reports now.
PRIORITY #1 CHECK: OD §7 learning times (owner rule, law 16: unchanged) + night-final OD 22:50Z/23:05Z + MAIN CHÍNH 91 07:37Z «b» HOLD (FOREMAN_D_STATUS) | main LIVE fdabfb44 | review/night-final-r3-nobc 9a06cea8 (NOBC BUILDER asked for its final sha 08:05Z), review/balance-final 40775131, review/cal-p2c (in LIVE) | claims NIGHT LAND CHAIN + balance-final (D) → this bundle.

## Step 1 — merge (branch review/night-balance-bundle, pushed)
- 49912535 = nobc 9a06cea8 + merge of balance-final 40775131 (full history, /home/user/wt/full). balance-final's own diff (2bda29a1..40775131, 107 commits) is mostly OLDER versions of families nobc already carries or dropped on D's ruling: night-final r1/r2 (jnf/jflip/night tests → nobc's night-final-r3), balance-core r1/r2 (start table, growth curve, one-curve artO readers → D ruling «A + drop growth/start»), night-ledger r1 (jledger/jcycle → Foreman B's job, MAIN 20/11 08:45Z ruling; NOT bundled). So the merge keeps nobc's content and ports balance-final's OWN hunks, selected per hunk by `git blame` of the line's commit + token-level 3-way: HH gate (hhThNoSon 70 / Hiếu 62 / outQ 30 / RANKS HH Danh 70), Giả bệnh risk + punishMonths family (j8/j13/j78/jaudit/jtwoway), BAL.rk side chances (loanBack dropped: LIVE j24 repay is now an NPC decision, npcWhy), lễ nghĩa double charge + dutyDanh (jecon), map robbery risk (jty), stat clamps (j35/jkc/jrd_cn), careY family (careYt 2→1, BAL.art.care 6, careY/yCareT in jbalcore; jthaiy keeps LIVE findY and «Tự bốc thuốc» keeps LIVE y≥3, per nobc's restore map), poison hit BAL.eff.j8.hit, BAL.danhG.srvRise, odb odO_3 42 / odO_7 40 / j68e odP_5 46 / j68f odP_2 40, deck o[0] 48/48/53 + cam/ky lv 2 (+ the deck «mở» text mover). cal-p2c N1: jentry skip = mgSkipRaw (identity level, like j82 / jexam).
- 40f159bc = + LIVE main fdabfb44 (assemble list = main's + jbalcore/jnf after jseat). 9c122655 = + j34 card text prints BAL.rk.caught (lost in the LIVE merge) + rebuild.
- Static guards on 40f159bc: one-core-guard (391 modules, inline 3757 ≤ 3930) / bind (1303 prints, 0 mismatch) / text / text-rule / time-spill PASS.
- RUNTIME BAL SCAN LIVE fdabfb44 vs bundle 40f159bc (nlc8/balscan.js): leaves 60314 / 60418 · **missing 0** · fn missing 0 · **changed 18**, each with its reason: outQ 60→30, hhThNoSon 80→70, hhThNoSonHieu 70→62 (balance-2 HH gate) · mort.life.careYt 2→1 (balance-final careY family, §7 ladder) · steal.cost.feign.duc 4→0, road.suc 5→0 (night-final OD 22:50Z/23:05Z) · ag.par3.dance.o / odb.j2.odO_3 30→42, odO_7 30→40, j68e.odP_5 40→46, j68f.odP_2 30→40 (balance-2 r2 C1 risky-act family) · deck vu/cam o[0] 40→48, ky 45→53, cam/ky lv 3→2 (balance-2 r2 C2/C3) · ctxTaste 12→18, ctxCap 22→30 (balance-2 bot-proof). Added 104 (nobc's 78 §4/§7 keys + BAL.rk, danhG.srvRise, art.care, eff.j8.hit, tw.g ill keys).
- REVERSE AUDIT (nlc8/rev.py): nobc 1e826e29→9a06cea8 own lines 1629, lost 6 = the assemble list (replaced by main's) + 5 Y-care lines artO(y)→careY (intended). balance-final 2bda29a1→40775131 own lines 2261, «lost» 938 = the dropped superseded families above (jledger 118, jnf/jflip/jbalcore/jcycle, measure scripts, night/ledger tests, balance-core readers) + lines LIVE rewrote since (j54/j70 npcWhy, jecon wording); checked by token diff, no balance-2/final rule lost. LIVE-revert: missing 0 in the BAL scan; the LIVE merge took main's side everywhere except the assemble list.
- KNOB ARMS running (knobbot, 2 browsers each, seeds 21+): b0 = bundle 49912535 (no re-tune), k1 = b0 + Danh knob 1 (deck vu lv 2 + Kinh hồng vũ Danh 4, BAL.art.danh {2:3,3:5,4:6,5:8}, Múa par3.dance.vu 4→6, Đánh cờ tw.g.ky[0] 2→3). LIVE / nobc rows = knobbot lives.csv (rmain 11 lives, nobc 10).

## Steps 2–3 — §7 Danh re-tune + knob arms (21/11 ~09:00–12:15Z; coordinator now D #15 session_01964izCZTNiRZKnSHxPrUuX)
- Re-tune 21703845 (BAL only; §7 learning times BAL.art.tier/gain untouched; NPCs read the same keys): Múa trong yến tiệc win Danh 4→6 (BAL.ag.par3.dance.w/g) · Kinh hồng vũ BAL.deck.vu.lv 3→2 + win Danh 3→4 · Đánh cờ BAL.tw.g.ky[0] 2→3 · bậc-up Danh BAL.art.danh {3:3,5:6}→{2:3,3:5,4:6,5:8}. Course texts (ARTFX / ARTS.u / «Lên bậc») print these keys (6a96ef3f; were typed). one-core ×4 PASS.
- Merged since: coop-steal fixture 32aa512d/33ad9416; NLC #10 9a3fdbc2 e43b7146 50b54a44 cc5df7a2 3b85e530 86cc402a; COOP CYHOLD 8ecdb5fc → r2 60b5ee43 (+ LIVE 94cbe0cd); jnf cyHold wait reads BAL.coop.cyWaitMs (one key, same 90 s). Head b3e563b9.
- «Nhún nhường» (bot's biggest Danh sink, −187…−234 / life m0–36 vs LIVE −134) is a BOT HABIT: inpage6 talkScore buys rapport with Danh by need weights; the game's cost (BAL.ag.cx.humble) is LIVE's, unchanged. Not tuned.

| arm (knobbot, HHSTOP, seeds 21+) | lives | HH | Danh m0/12/24/36 | net Danh m0–36 | died<3y |
|---|---|---|---|---|---|
| LIVE 8c8b8b6b (lives.csv) | 11 | 36 % | 18/51/84/85 | +53 | 2/11 |
| nobc e5029d1b (lives.csv) | 10 | 20 % | 19/9/10/10 | −8 | – |
| b0 bundle, no re-tune | 9 | 0 % | 21/20/36/36 | +9 | 0/9 |
| k1 first knob | 6 | 33 % | 22/30/48/37 | +24 | 1/6 |
| k2 | 6 | 33 % | 24/59/82/56 | +35 | 0/6 |
| FINAL re-tune (HH gate = balance-2: RANKS HH Danh 70, hhThNoSon 70/62, outQ 30) | 16 | 56 % | 21/54/76/71 | +51 | 0/16 |
| k3 = FINAL + RANKS HH 78 + hhThNoSon 80/70 (LIVE, D #15 ruling) | 12 (2 timeouts) | 58 % | 29/39/76/73 | +48 | 1/12 |
| k4 = k3 + outQ 60 (whole HH gate = LIVE) | 10 | 70 % | 22/41/66/84 | +60 | 0/10 |
- HH sits above the 28–40 % band in every arm with the re-tune, whatever the HH gate. The LIVE row is an OLD-LIVE 11-life sample → measuring CURRENT LIVE 94cbe0cd with the same bot now (12 lives).

## SSK — review/night-balance-bundle fe634e0f (21/11 ~19:50Z; coordinator D #17 session_01964izBrTYM1xdxezCgqLER; BIG reviewer session_01964izF4zCJPJBUmUsHpksK)
PRIORITY #1 CHECK: night-final-r3 nobc + balance-final §7 Danh re-tune land TOGETHER (MAIN 91); §7 learning times unchanged (law 16); NPCs on the same rules; no shields; every changed number is a BAL key.

**Head fe634e0f** = nobc 9a06cea8 + balance-final 40775131 (+ cal-p2c N1) + §7 re-tune (k4) + NLC #10 + coop-cyhold-rv 3e65dbe7 + LIVE main 9c5b6de3 (merges 419079d7 → 270c6251 → 9c5b6de3) + reviewer fixes (cnv origin restored; dead odb.j42.rlGo/rlFail deleted) + npc-purpose row j54 hEmpWed → roll(H54.ask) + reviewer FAIL #3 (her Sủng text through sgStat in jnf; ARTFX rewrite wraps LIVE's sg getters, so the re-tune Danh text is shown again).

### Balance table (knobbot, HHSTOP, seeds 21+, same seeds per arm)
| arm | lives | HH | Danh m0/12/24/36 | net Danh m0–36 | died<3y |
|---|---|---|---|---|---|
| current LIVE 94cbe0cd | 12 | 42 % (5/12; 5/9 = 56 % of 3-yr survivors) | 17/47/73/71 | +45 | 3/12 |
| old LIVE 8c8b8b6b | 11 | 36 % | 18/51/84/85 | +53 | 2/11 |
| nobc e5029d1b | 10 | 20 % | 19/9/10/10 | −8 | – |
| b0 bundle, no re-tune | 9 | 0 % | 21/20/36/36 | +9 | 0/9 |
| k1 | 6 | 33 % | 22/30/48/37 | +24 | 1/6 |
| k2 | 6 | 33 % | 24/59/82/56 | +35 | 0/6 |
| FINAL re-tune, balance-2 HH gate | 16 | 56 % | 21/54/76/71 | +51 | 0/16 |
| k3 = FINAL + HH Danh 78 + hhThNoSon 80/70 | 12 (2 t/o) | 58 % | 29/39/76/73 | +48 | 1/12 |
| **k4 = SHIPPED (k3 + outQ 60: whole HH gate = LIVE)** | 10 | **70 %** | 22/41/66/84 | **+60** | **0/10** |

Survivor-adjusted: current LIVE loses 3/12 lives before 3 years, so its 42 % is 56 % of the lives that reach year 3. **HH is +14…+28 points vs current LIVE, with fewer early deaths (0/10 vs 3/12), within small-n noise.** Danh m36 84 (target ≥ ~60 ✔). Brief target HH 28–40 %: k4 is above it. The only HH lever left is the HH gate, which is now exactly LIVE (D #16 approved k4). «Nhún nhường» Danh sink = bot habit (inpage6 talkScore); game cost unchanged (BAL.ag.cx.humble); not tuned.

### §7 re-tune (BAL only)
par3.dance w/g danh 4→6; deck vu lv 2, w danh 4; art.danh {2:3,3:5,4:6,5:8}; tw.g.ky [3,1] (Đánh cờ Danh 2→3); careYt 1, art.care 6. The texts read the keys (jbalcore rewriter, j85 «Lên bậc»). §7 learning times unchanged.

### BAL scan vs LIVE 9c5b6de3
leaves 61279/61384, missing 2 (only the dead BAL.odb.j42.rlGo / rlFail, deleted on purpose: j42 reads BAL.rk.riseKill / abortDieSrv, same values 25 / 20), fnMissing 0, added 107, changed 20 (the same 20 keys at every LIVE merge), each with a reason: tw.g.ky.0 (re-tune), mort.life.careYt (balance-final careY), steal.cost.feign.duc / road.suc (balance-final steal costs), ag.par3.dance.o / w.danh / g.danh (re-tune), deck.vu.lv/o.0/w.danh, deck.cam.lv/o.0, deck.ky.lv/o.0 (balance-final deck + re-tune), odb.j2.odO_3/odO_7, j68e.odP_5, j68f.odP_2 (balance-final odds), ctxTaste/ctxCap (nobc night-final).

### Audits
LIVE-revert audit: none of LIVE's lines are lost except the intentional ones listed in step 1. Reverse audit nobc→head: every lost line is intentional (assemble list, careY replacing artO(y), NLC #10 jnf/jflip fixes, cyWaitMs, coop-steal fixtures, art.danh text). coop-cyhold-rv→head: only the cyMs line (reviewer fix kept). Static guards one-core-guard / bind / text / text-rule / time-spill: PASS.

### Gates on 35b3a3f5
Serial run on fe634e0f (started 18:13Z, one runner, no parallel load):
- PASS: balance-core, steal-mg-unit, night-steal-unit, night-multi, night-coop-park 7/7, flip-entry, steal-mg-nf, night-final ×10 (10/10), coop-e2e 124/124, coop-night run 1 111/111; static guards ×5, sg-card-scan, npc-purpose-scan (419 rows).
- FAIL: coop-night run 2: case-1 week-step split (timeout 2400 s, 18 ok / 13 fail). Host trace cyHold 1 → cyTimeout 1 → cyFree 1, host into the next week, guest at tối ready and waiting for fin. Root cause + fix below.
- still running / not yet run on this sha: coop-night run 3, coop-steal, coop-cyhold, quickcheck.

### CO-OP BLOCKER (no LAND READY yet)
1. **jnf late fin (mine, D #17):** jcoopworld cyFree runs flip() then soonEnd(), so the host's day can move on before its choice of day d ends: no fin for d, and the guest (S.nfFin!==d → ask) waits for ever. Fix 2180b429 (local, being tested): the host records its draw per day (S.nfH), again(d) answers a past day without a kept fin from that draw, the host pushes that late fin once (finLate), and the guest re-asks every BAL.steal.choice.ms while she waits. Next: coop-night ×3 serial red→green, then push.
2. **jsmg intro-✕ stall (GRwYL14Z, review/bundle-nfstall):** the steal mini-game closed by ✕ on its intro screen never runs onDone (BUSY stuck, nfX.st "mg"), solo too (static read). Fix + coop-cyhold clear() + coop-nf-stall.js come as a sha to cherry-pick.
After both: night-final ×10 (≥3), steal-mg-unit, steal-mg-nf (+ solo ✕ case), coop-night, coop-cyhold ×3, coop-nf-stall ×3, coop-steal, quickcheck on the final head; then LAND READY.

### Not bundled / owner flags
- night-ledger r1 (B's) not taken; balance-final's night case 6 fix not ported (superseded by night-final r3), so a reviewer should check it.
- balance-final OWNER FLAGS carry over (kids/y, seat vacancy).
- LIVE merges 270c6251 and 9c5b6de3: conflicts were jemo-bal typed→BAL moves, and every line keeps both sides (commit messages 5181eecc / fe634e0f list each line). Reviewer FAIL #1 (cnv o/hh/th) fixed; my LIVE-revert audit had missed it because the loss was older than the audited merge range.
- After the 9c5b6de3 merge, LIVE's sg tokens made ARTFX elements getter-only and the bundle's text rewrite was silently dropped (course-card / bậc Danh showed LIVE numbers). Fixed in fe634e0f; runtime: Đánh cờ Sủng +5, Danh +3, Tâm cơ +1; Kinh hồng vũ Sủng +15, Danh +4; bậc 2/3 Danh +3/+5.
- co-op flakes seen (not bundle regressions; same on LIVE/3e65dbe7 per the coop-cyhold reviewer): coop-night case 1/2 week-step desync, case 4 guest-night timing.

## SSK FINAL — review/night-balance-bundle efea09a8 (21/11 21:36Z; D #17 session_01964izBrTYM1xdxezCgqLER; reviewer session_01964izF4zCJPJBUmUsHpksK)
PRIORITY #1 CHECK: nobc + §7 Danh re-tune land TOGETHER; §7 learning times unchanged; NPCs on the same rules; no shields; one core BAL.
Head efea09a8 = fe634e0f (SSK above: table, BAL scan, audits unchanged) + 2180b429 jnf late fin + c6ffc4c3 coop-cyhold test clear() (from review/bundle-nfstall 1388c7af, test only) + index/sw/assets rebuilt.

**CO-OP BLOCKER closed.** Cause (coop-night case 1/2 split): the host's day moved past day d (night resolved after the cyWaitMs bound) before its fin for d was sent, so the guest (S.nfFin!==d → ask) waited for ever. Fix (jnf.js): the host records its draw per day (S.nfH); again(d) answers a past day without a kept fin from that draw (the host as holder if her night already played); the host pushes that late fin once (finLate); the guest asks again every BAL.steal.choice.ms while she waits. Serial red→green: coop-night on fe634e0f 1/3 green (run 2 case-1 split, run 3 case-2 split), on 2180b429 3/3 111/111. jsmg: no bug (✕ on the intro opens the give-up confirm); coop-cyhold's miss was its driver (now closes manual kit scenes and the #kg82 game).

Gates after the fix (serial):
- coop-night ×3 111/111 (2180b429; game code = efea09a8)
- coop-cyhold ×3 18/18 (c6ffc4c3)
- night-final ×3 PASS (c6ffc4c3)
- coop-steal: 37/40 once on c6ffc4c3 (case 3: an NPC flip instead of the guest, random), then 40/40 on c6ffc4c3 and 40/40 on efea09a8; old fe634e0f 40/40
- quickcheck PASS on efea09a8 (core gates PASS, old save ok; perf new/live render 227/268 ms, buổi 1143/1596 ms)
- on fe634e0f (same game code except jnf): balance-core, steal-mg-unit, night-steal-unit, night-multi, night-coop-park 7/7, flip-entry, steal-mg-nf, night-final 10/10, coop-e2e 124/124; guards ×5, sg-card-scan, npc-purpose-scan PASS
Not taken: coop-nf-stall.js (WIP; D #17: rv's 10-week drive covers it).

### Post-SSK (22/11 ~00:10Z): co-op stall on the rv's mg-craft merge 64758330
- Cause found with a forced probe (dev/test/cn-force.js, bundle 0ebab437, test only): the guest's manual night-end scene #kneov (jne kitNightEnd: kmStage manual, closes only on «Nhận» [data-km-close]) holds her card-flip job in the kit scene queue (cfBusy), so jnf's choice waits (jnf.js scene()). Deferred, not held: with «Nhận» pressed, case 1 PASS; AFK, the host's BAL.steal.choice.waitMs bound resolves the night and both seats move on (180 s watched). coop-e2e's clear() never pressed [data-km-close]: driver gap; rv's clear() fix → coop-e2e 124/124 ×3. No game change.
- FOLLOW-UP (not blocking): while the guest waits at tối for the host's word, she sends «ask» about every 0.3 s (jnf endTurn wrapper → ask() on every endTurn call) and the host answers «open» each time: chatty relay, pre-existing (nobc/NLC). Rate-limit ask() (e.g. on BAL.steal.choice.ms like finLate's re-ask).
