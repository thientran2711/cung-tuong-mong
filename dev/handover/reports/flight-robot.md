# FLIGHT ROBOT ROUND — report (ORDER MAIN 131 02:10Z 25/11; Foreman F)
PRIORITY #1 CHECK: OD 0 | ledger 0 | claims 1 (F runners) | main 0 | review/* 0 | archive 0 ('flight robot'; F #3 02:24Z).
Arms: A = review/lc12-varC9 4232709a (now LIVE, MAIN 132 03:16Z). B = local merge 4232709a + robot-fix-cnv-2 fe3cb80c (0d4f3f14; only index/sw conflicted). Fold 755x1000, true reload in each life; co-op harness stuckcap-r 5127e083.
Baselines: thd R2 14ba8768 (10 lives, 8 bugs; soft-lock-after-load 5/10) · pf rates-20261124-1754 (50 lives) · robot-fix-cnv-2.

## Interim table (03:27Z) — updated as runners report
| Arm/seat | Lives done | Endings | Soft-lock after load | No ending / timeout | Save drift | Leak | Tab lag >400 ms | Notes |
|---|---|---|---|---|---|---|---|---|
| A-SOLO | 2/10 | 0 | n9/n10 family (same as thd R2 baseline, NOT new) | 2 CAP45 (cnv_mat 2781 buổi rank 4; thd_tho 2664 buổi rank 7) | in-place drift = harness artefact; 13 reloads all clock-identical, 0 reload failures | thd life1 page memory grows | n16-18 yes; buổi p50 ~0.1 s p95 0.8-1.0 s max 9.3 s | ui-text-overlap kbk-ts/kbk-ls/kbk-rh every tab (1 persistent element). Remaining 8 lives restarted with CAP 90 min; ETA ~09:00Z |
| A-COOP | 1 life ended | — | 3/3 rooms STUCK = game all-bạc forced card (j68c-sea-023 «Thời tiết», j68c-serv-022) — PRE-EXISTING, fix on review/flight-modal-deadlock | — | — | — | turn p95 30-45 s | «Sủng +N» text ≠ applied (~12 families, new family) |
| B-SOLO | 2/10 | 1 (Xuất cung) | none yet | life1 harness «page closed» ~3 min | 7 hits | — | 17 hits | |
| B-COOP | 1 kiếp | — | none | — | resHall RT drift guest | — | turn/action p95, syncKB, buổi stall | 10 known families; ~35 min/kiếp; bạc out of range, coop-pos 19, coop-stat 4 |

Verdict so far: NO new arm-A blocker in solo; the only stuck shape (co-op all-bạc card) is a pre-existing game bug with its own fix branch. Final table when runners finish (~09:00Z).

## flight-modal-deadlock (FLIGHT ROOT-CAUSE FIXER, 25/11)
PRIORITY #1 CHECK ('Thời tiết' / 'modal over ov'): OD 0 | ledger 0 | claims 1 | main 15 | review/* 0 | archive 0 → related E U20 W6PF stuck (queued Thời tiết) and E FIXER #5 night-picture verdict; reused jgrey kitOff/j3 poor rule, j68seeds validator, quickcheck.d hooks; no second mechanism.
Branch: review/flight-modal-deadlock (from 4232709a). Commits: 1f0a491a (data + validator gate), 6b931401 (net + test + hook).

### Verdict
1. GAME bug, not harness. Repro save (flight-A-coop-repro yr97b6): host S.bac = 2. The card is composed j68 seed **j68c-sea-023** «Thời tiết» (tier l): all 4 stances had `loss.bac` → each option Bạc −60 → j3 showModal `poor` greys every option. The card has opts, so no «Đã rõ»; kitCancelIx −1 (forced choice: no ✕, no Esc, no tap-out, no timer) → nothing to press. Only accidental escape: full page reload (pending P restored, evGate drops it as already seen).
2. SOLO: yes. Probe 4232709a Fold 755x1000 solo, card injected: bạc 2 → 4/4 greyed, Esc no effect; bạc 500 → 4/4 open. Same code on LIVE origin/main 2b68def3 and robot-fix-cnv-2 fe3cb80c.
3. The open TÀI NGHỆ #ov under it is incidental (#modal z42 above #ov z32 is the kit layer rule; after the card closes the overlay is back). Not changed (kit territory, law 9). Co-op lock not involved: the guest only waits for the host.
Root cause = law 2 break: an event whose every road costs bạc, with no bạc-free road.

### Family (law 11) — every #modal option card that can have all options greyed with no way out
Scan: dev/test/dead-card.js — builds every buildable card (550 E68 templates incl. 460 composed j68c via their pp, 33 j7 EV via pp, other PEND builders with {}) at bạc 0, ranks 0/3/6; greyed = c.off | bạc short | lock | lk(). Static seed scan (all *sd.js comps with stances): j68sd 460, j71sd 80, j7sd 80, jwsd 91.

| card | before (4232709a) | after (6b931401) |
|---|---|---|
| e68c:j68c-sea-023 (Thời tiết, lò sưởi) | dead at bạc < 60, ranks 0/3/6 | 1/4 open at bạc 2 («Đổ nước tắt hết, mặc rét»: loss suc 2 + tamco 1) |
| e68c:j68c-serv-022 (Kẻ hầu, cứu chủ lúc bệnh) | dead at bạc < 60 | 1/4 open at bạc 2 («Cầm tay nàng cảm tạ, thưởng bằng lời»: loss danh + suc + tamco; it said "thưởng bằng lời" yet cost bạc) |
| every other buildable card (325) | 0 dead | 0 dead |
| static comps j71sd/j7sd/jwsd | 0 all-bạc | 0 |
Equal value kept: one BAL.j68c.fx step swapped for one step of another key (Σloss = 3 = tier l), validator passes (0 errors).
Coverage gap: ~390 PEND builders cannot be built without their own params → covered by the runtime net below.

### Fix
- Data: the 2 seeds in dev/handover/content/thin/j68seeds_b/_c.md, j68sd.js rebuilt by j68sd_build.py.
- Gate: dev/test/j68seeds_validate.py ERR when every stance of a comp loses bạc (law 2). Proof: old seeds → 2 ERR.
- Net: dev/build/jdeadcard.js (last module): a card whose every option is greyed and with no cancel road gets the kit close button «Lui» (#mr .main, word from KIT_CLOSE_W, no new kit part) and passes with no effect; logged in window.__deadCards (robots can read it). In co-op, jcooptimer auto-presses a single live button, so the room cannot hang either. OWNER/F ruling point: this net lets her skip such a card; it is in its own commit (6b931401) and can be dropped if the forced-choice rule must win.
- Test: dev/test/dead-card.js (scan 2→0 dead, seeds 1/4 open at bạc 2, net closes a synthetic dead card) + quickcheck hook dev/tools/quickcheck.d/85-dead-card.sh.

### Tests
All on 6b931401 (branch already holds origin/main 3a3234ff; 2b68def3 is no longer on main):
- dev/tools/quickcheck.sh HEAD: QUICKCHECK PASS 642 s · core gates PASS, hooks 8 incl. 85-dead-card (DEAD-CARD PASS) · old save ok · perf new/live render 232/237, tab 453/449, buổi 1086/1631 ms.
- dev/test/coop-e2e.js (host Fold + guest iPad, both seats): 142/142 ok.
- dev/test/dead-card.js: before (4232709a) 2 dead cards → after 0; seeds 1/4 open at bạc 2; net «Lui» closes a synthetic dead card.
- dev/test/j68seeds_validate.py: 0 errors; on the old seeds the new gate gives 2 ERR.
- Solo probe of the repro save (Fold 755x1000): with S.mg set + #ov open, bạc 500 → 4/4 open, so the open tài nghệ overlay does NOT grey options; only the j3 `poor` rule does.

### Arm A co-op stuck rooms explained
| room | card | proof | status |
|---|---|---|---|
| 9B2G wk35 | j68c-sea-023 «Thời tiết» | repro save S.bac 2, pid in P | fixed |
| 93UG wk6 | j68c-serv-022 «Kẻ hầu» (Phẩm Nhi) | host modal text = seed text, 4 options = its 4 stances | fixed |
| JXAR wk24 | «Kẻ hầu» (Thải Bình) | trace not pushed yet; test: modal text «… sốt li bì đêm qua, … thức bên giường» | likely the same |
E round 1 U17 wk22 host «Kẻ hầu» stuck is probably the same seed.

READY flight-modal-deadlock 6b931401.

## REVIEW flight-modal-deadlock (BIG REVIEWER opus, 25/11)
PRIORITY #1 CHECK ('forced choice|bắt buộc chọn|mustChoose|kitCancelIx|«Lui»'): OD 0 direct (OD:L742 "forced dialog" = co-op wait only) | dev/rules 0 | KIT.md 32.10 "FORCED PANELS … NO ✕" + "no Thôi / Lui buttons" (owner 11/15) | main jdeadcard 0 | review/* this branch only.
Verdict: **PASS** — head **4da55ce8** on review/flight-modal-deadlock-r = 1f0a491a + 6b931401 + merge of origin/main 49f17d4d (index.html/sw.js conflict only: rebuilt) + reviewer test fix. Ancestor = origin/main 49f17d4d (fast-forward ready).

| # | check | result |
|---|---|---|
| 1 | Law 2/3 j68c-sea-023 «Thời tiết» | PASS: «Đổ nước tắt hết, mặc rét» loss bạc 1 → suc 2 + tamco 1 (Σloss 3 = tier l, gain duc/an/danh); wording fits (cold night costs Sức). Other 3 roads keep bạc; none cost-only. |
| 1 | Law 2/3 j68c-serv-022 «Kẻ hầu» | PASS: «Cầm tay nàng cảm tạ, thưởng bằng lời» loss bạc → tamco (Σ3); the words "thưởng bằng lời" no longer cost bạc (was a wording/effect mismatch). |
| 2 | Law 11 family | PASS: validator ERR on any all-bạc comp (0 err now, 2 ERR on old seeds); dead-card.js scan builds 330/717 PEND (550 E68 incl. 460 j68c, 33 EV) at bạc 0 ranks 0/3/6 → 0 dead. ~387 PEND builders need own params = unscanned; the runtime net wraps the outermost global showModal, so it covers them (checked also through the new jdayq hold → release path). |
| 3 | Net jdeadcard (6b931401) — law 9 / VANPHONG | PASS: it writes «Lui» into #mclose; the kit (32.10) hides that close word and turns it into the ONE kit ✕ + tap-out + Esc (Fold ✕ at 612,114; iPad 973,135; «Lui» display:none). No private CSS / part, no visible «Lui» button. Shows only when every option is greyed AND kitCancelIx −1; not on normal cards (fixed card 1/4 open → no ✕, __deadCards 0). Pressing ✕ = no effect, Q empties. |
| 3 | RULING: no-effect ✕ on a forced card vs law 2/3 + KIT 32.10 forced-panel rule | NOT a breach. The forced rule stops her dodging a choice; with every option greyed there is no choice to dodge — the old result was a soft-lock (no rule wanted that). Law 2/3 judge options of one choice; ✕ is not an option and appears only when no option can be taken. Exploit (drain bạc to skip costly cards) is closed at the source: validator + scan forbid all-bạc cards, so the net fires only on a future data bug, and it is logged (window.__deadCards) for the robots. Foreman may tell the owner in one line; no rule changed. |
| 4 | Law 4 | PASS: no typed numbers in game code (net reads c.fx.bac / S.bac; −60 only in the synthetic test card). Bạc step size from BAL (−30/−60 by rank). |
| 5 | Gates on merged head | quickcheck 4da55ce8 PASS (core gates incl. 85-dead-card DEAD-CARD PASS, time-spill, old save ok, perf new/live render 326/303, tab 717/757, buổi 1664/2612 ms) · coop-e2e both seats on 9425b1a2 (same game code) 142/142 · dead-card.js PASS (0 dead, seeds 1/4 at bạc 2, net closes) · j68seeds_validate 0 err/0 warn · repro save yr97b6 (bạc 2) loads, card rebuilt from its P (e68c:j68c-sea-023 {a0:5,vi:3,nd:32}) shows 1/4 open, Fold 755x1000 + iPad 1180x820, 0 page errors. |
| 6 | Screenshots looked at | fixed card Fold + iPad (1/4 open, «Đổ nước tắt hết, mặc rét» Tốn Sức −24, no bạc); net card iPad (all 4 greyed, kit ✕ top-right of header). Scratch only, deleted. |

Reviewer fix (4da55ce8, test only): after merging main 49f17d4d (jdayq day-queue) the hook 85 FAILED 3 — the test's own card on a fresh life was HELD by the day-queue (dawn/activity) and never painted (0/0). dead-card.js parts 2/3 now open the card as a player tap (DQ.user). Game code unchanged.
Side note (not this branch, pre-existing): the repro card mixes a spring opener («Gió xuân lùa qua hành lang…», Tháng hai) with the winter seed sea-023 («Gió bấc… lò sưởi»); sea seeds may need a month gate (law 6 continuity) — for Foreman F to route.

## flight-coop-sync (FLIGHT ROOT-CAUSE FIXER, 25/11)
PRIORITY #1 CHECK ('ngoW' / 'host reborn night'): reused jcoopworld night handshake (nCheck / nGoNow), the guest-side fix «review/coop-week-stall» (jcoopworld sendMe comment), dev/test/coop-dbg-hostdeath.js idea, coop-e2e harness (env switch like COOP_RECONNECT); no new mechanism.
Branch review/flight-coop-sync from LIVE 49f17d4d: e2b5dd4c (fix + test), 4cb42b96 (rebuild).

### Verdict (A-COOP room SX8M wk80 buổi 3)
GAME bug, not harness; pre-existing on LIVE 49f17d4d (same code; not new in 4232709a). Host trace: «nready 80 → ngo 80 → night 80 → attach → sendMe false → … seatresync → nready 80»: the host committed the night (CW.ngo = 80), its night ran and it died inside it, then a new life began (start/__nlInner → attach + sendMe). sendMe resets CW.nrdy / CW.ngoW = −1 (jcoopworld.js:309) but not CW.ngo, so nCheck never re-commits (the host branch needs CW.ngo !== w; nGoNow is done) and the host's own gate ngoW stays −1 → its night never runs, its week end is never sent. The guest had already ended wk80 (ended.b) → both seats wait for ever; the host button reads «Chờ hảo hữu…» (disabled) → no button for a real player either. The guest-seat version was fixed before (review/coop-week-stall, nOtherEnded line); the host seat was missed.

### Fix
jcoopworld.js nCheck: `if(host()&&CW.ngo===w&&CW.ngoW!==w&&nAtNight())CW.ngoW=w;` — the host's own gate follows its commit (mirror of the guest line). Family: the only reset of nrdy/ngoW is sendMe (new life); guest reborn after the host's go → host answers her new rd with go (existing); fresh page on the host → CW.ngo empty → normal commit.

### Tests
| test | before (49f17d4d) | after (4cb42b96) |
|---|---|---|
| coop-e2e COOP_HOSTDIE=1 (host dies inside its committed buổi tối, guest ends) | FAIL, exact SX8M state: ngo 0 / ngoW −1 / nrdy −1, room week stuck, then timeout | ok «host reborn inside its own buổi tối: the room week still moves on both seats» |
| coop-e2e plain (both seats) | — | 142/142 |
| quickcheck | — | QUICKCHECK PASS 590 s, core gates + hooks PASS, old save ok, perf render 226/223, tab 531/453, buổi 1261/1041 ms (noise band) |
Side lead (not fixed here): in the HOSTDIE run after the rebirth, «one j61 key = one person» FAILs ×4 (x33 = two men on one key, after week 3 / rejoin) — a host rebirth mid-room gives a j61 key clash; separate family, not a stall.

READY flight-coop-sync 4cb42b96.

## REVIEW flight-coop-sync (BIG REVIEWER opus, 25/11)
PRIORITY #1 CHECK ('ngoW' / 'nCheck host' / 'coop-week-stall'): OD 0 | ledger 0 | main: guest-side twin «review/coop-week-stall» (jcoopworld sendMe comment + nOtherEnded line) | review/* this branch only | claims: this review. Reused coop-e2e harness, no new test file.
Verdict: **PASS — review/flight-coop-sync-r 7902247b** (= 4cb42b96 + merge of origin/main 4da55ce8; conflict index.html/sw.js only, rebuilt with build_site.sh). origin/main 4da55ce8 IS review/flight-modal-deadlock-r 4da55ce8, so the trial merge with it = this merge (clean apart from the built files; all tests below include it).

| check | result |
|---|---|
| 1 root, not a patch | PASS. Cause = sendMe (new life) resets nrdy/ngoW, host's commit CW.ngo stays → no line re-opens the host gate. New line opens ngoW only when CW.ngo===w (host already committed this week); in every normal flow nGoNow already set ngoW=w, so it changes nothing else. Seat states: host committed+died+reborn → own night runs once (gate still blocks on CW.sent===w, pend, dialogs) → no double night; host not committed → line inert, old commit rules; guest any state → line is host-only, guest twin unchanged; week change → CW.ngo≠w, inert → no skipped night, no early week step (room week still steps on the server when both ended). |
| 2 law 11 family (resets of nrdy / ngoW / ngo / sent / pend) | PASS. sendMe :309 (rebirth) — host now fixed, guest by nOtherEnded + nResync rd→go. restore :1453 (rejoin/reload) — snap holds nrdy/sent/pend, refused when sent===wk; ngo/ngoW not restored → fresh host page has ngo≠w → normal commit path (nfr / nOtherEnded / thin E a.b), no shut gate. begin :868 (relink same page) — resets sent only, keeps ngo/ngoW → consistent. stop :877 — leaves room. re-end :886 / :789 / reEnd :1466 — sent only. thin E jcoopthine :100 — guest ngoW from host view. Seat swap / re-host: none exist (host()=seat "a" fixed in every jcoop*.js). No other path leaves a gate shut. |
| 3a COOP_HOSTDIE=1 on 49f17d4d (test file copied in) | FAIL as expected, SX8M state exactly: ngo 0 / ngoW −1 / nrdy −1, ended {a:false,b:true}, room week 0 stuck |
| 3b COOP_HOSTDIE=1 on 4cb42b96 | 143/143 (host-reborn ok; j61 checks all ok this run) |
| 3c COOP_HOSTDIE=1 on 7902247b | 139/143: host-reborn ok; 4 FAIL = side lead below only |
| 3d coop-e2e plain on 7902247b (host Fold A, guest iPad B) | 142/142 |
| 3e coop-e2e COOP_SWAP=1 on 7902247b | 142/142 |
| 3f quickcheck 7902247b vs live 4da55ce8 | QUICKCHECK PASS 645 s, core gates + hooks PASS, old save ok, perf render 317/248, tab 677/640, buổi 1566/1365 ms (noise band; one-line logic change) |
| laws 4 / 7 / 9 | no number, no player text, no UI touched |
NOTE (harness, not this branch): coop-e2e's Fold viewport is 686x880@2.2, not 755x1000 — pre-existing in the harness.
SIDE LEAD (law 6b, NOT a FAIL — F routes it): after a host rebirth «one j61 key = one person» FAILs ×4 on the host seat, key s1 = ["Tố Trân","San Hô"] (j61 key "s"+sid: the new life's staff sid restarts at 1 while the old life's servant sid 1 still lives in the world). Intermittent (0/10 on 4cb42b96, 4/10 on 7902247b). Not caused by this fix (it only opens the night gate; no staff code touched); unreachable on LIVE because LIVE stalls at that very rebirth — the fix unmasks it. Family to route: rebirth staff-id reuse (host and guest seats), j61 key / KREG.

## flight-choose-guard (FLIGHT ROOT-CAUSE FIXER, 25/11)
PRIORITY #1 CHECK ('chooseM opts[i]' / 'eaLock'): reused j3 chooseM, jemoact temper lock, jdeadcard net, dev/test/dead-card.js; no new mechanism.
Branch review/flight-choose-guard from LIVE 4da55ce8: d716e6ea.

### Verdict (arm B co-op H77P wk131)
1. Host JS error «Cannot read properties of undefined (reading 'off')» = j3 chooseM reads `m.opts[i].off` with no guard; every one of the 23 chooseM wrappers guards `m.opts[i]`, only the base did not. A caller that passes an index not on the card in front reaches it: jnf night-choice timer `chooseM(findIndex(«Thôi»))` gives −1 when the card has no «Thôi»; a stale DOM / relayed / scripted index does the same. Stack was not captured (B-COOP), so the exact caller of that one hit is unknown; the guard now logs it (window.__badPick with the caller) for the next robot round.
2. Guest «Kẻ hầu» (serv-022) all 4 greyed at bạc 117: not bạc alone (solo at 117 → 4/4 open). jemoact's temper lock (eaLockWhy) only greys an answer while «another usable answer» stays open, but «usable» checked bạc only: a temper lock could grey the last road she could really take when the others are closed by any other rule. Same family as the dead card.

### Fix
- j3 chooseM: `if(!c){chooseBad(i,m);return}` — card stays, logged with caller.
- jnf timer: never chooseM(−1); no «Thôi» → treated as her «no» path.
- jemoact: eaFree(o) = open by EVERY greying rule (bạc, kitOff, lock, tsDis, unmet need, lk()); used by the lock rule, the eaLock branch and the bot fallback pick.
- jdeadcard: the screen is the truth — every visible option button disabled (DOM-only greying wrappers) is a dead card too → kit «Lui».

### Family scan (opts[i] lookups that can see an index off the card)
| place | before | after |
|---|---|---|
| j3 chooseM (base) | unguarded → «reading 'off'» | guarded + logged |
| 23 chooseM wrappers (j41 j75 j78 j85 j87 j95b j99succ jaudit jcoopthin jcoopthinf jemoact jevb jgpick jkh jkiep jlooks jmem jne jnf jnight jsmg jts jtsb jweather jitev j19) | guarded (`m&&m.opts&&m.opts[i]` / try) | unchanged |
| direct callers: jnf timer findIndex | −1 possible | fixed |
| jcoopthin 445, jcooptimer 205, jk4 843, jdfv 78, jkiep 48, jts 43, jtsb 30 | guarded / own index | unchanged |

### Tests
| test | before (4da55ce8) | after (d716e6ea) |
|---|---|---|
| dead-card.js part 4: chooseM(99 / −1 / undefined) | 3× «reading 'off'» | refused, card stays, 3 logged |
| dead-card.js part 5: bạc road she cannot pay + temper-locked road | 0/2 open, no net = dead | 1/2 open |
| dead-card.js parts 1–3 | PASS | PASS |
| coop-e2e both seats | — | 142/142 |
| quickcheck | — | PASS 633 s (1st run FAIL on perf longTaskMax 3894 vs 2281 = noise; rerun PASS, render 268/268) |

READY flight-choose-guard d716e6ea.

## flight-e68-season (FLIGHT ROOT-CAUSE FIXER, 25/11)
PRIORITY #1 CHECK ('EVHOLD' / 'needs.month' / 'deserQ'): reused j68 EVHOLD stale drop (evRelease), deserQ, template w(ctx) gate; no new mechanism.
Branch review/flight-e68-season from LIVE 4da55ce8: 6b9a0ce4.

### Verdict (reviewer side note: spring opener + winter j68c-sea-023)
Real gap, pre-existing on LIVE. A j68 card is drawn only while its template fits (w(ctx) > 0: month / season / fest / rank, j68c needs.month), but it can WAIT — EVHOLD (up to E68S.stale 6 tuần) or the pending P of a save rebuilt by deserQ — and the month can turn meanwhile. The text is (re)built with the CURRENT season ({S} of opener j68c-sea-o04 «Gió {S} lùa…»), so a winter lò sưởi story came out in tháng 2 under «Gió xuân» (repro save yr97b6: month 2).

### Fix (whole family of waiting j68 cards)
j68.js e68Fits(m): a j68 card (pid e68…) still fits when its template's w(e68Ctx()) > 0. evRelease drops a held card that no longer fits (like a stale hold); deserQ (save load, EVHOLD re-serialization, co-op rebuild) drops a pending j68 card that no longer fits. Non-j68 cards untouched.

### Tests
| test | before (4da55ce8) | after (6b9a0ce4) |
|---|---|---|
| dev/test/e68-season.js: sea-023 pending (deserQ) built tháng 12, month → 2 | kept (1) | dropped (0); kept in tháng 12 |
| same, held in EVHOLD, released in tháng 2 | shown (1) | dropped, not shown |
| coop-e2e both seats | — | 142/142 |
| quickcheck | — | PASS 653 s, render 259/261 ms |

READY flight-e68-season 6b9a0ce4.

## flight-sid-rebirth (FLIGHT ROOT-CAUSE FIXER #1 + #2, 25/11) — READY f198beab
PRIORITY #1 CHECK ('sidN' / 'kseq' / 'one j61 key' / 'kk'): reused jcoopworld attach (sidN bump), j61 kOf61 keys + KREG, k61-coop-probe keyDup, coop-e2e COOP_HOSTDIE; stable ids already in the world (S.men id «m<i>» j22/jmen/j96, S.court office, S.trieu.H CLANS, T.ns, names one per person jname/nmReg); no new mechanism.
Branch review/flight-sid-rebirth f198beab = review/flight-coop-sync-r 05a4cbc0 + 3e30054d (rebirth part, cherry-pick of 9d568f1b) + 02ae792c (world keys) + f198beab (merge of the old tip 9d568f1b so the push is a fast-forward; build files only).

### Verdict
GAME, pre-existing. j61 keyed a person «r<id>» (rivals), «s<sid>» (servants), else a lazily issued «x<n>» from the per-seat counter S.kseq (not a W key). (a) Rebirth: j52 nlRun restarts sidN and S.kseq at 0, then the new life joins the old world → s-key and x-key clashes. (b) Cross-seat: world people are shared by both seats, each seat issued «x<n>» from its own counter → two different world men on one «x34» after week 3 / rejoin on both seats.

### Fix
(a) 3e30054d jcoopworld attach → lifeRekey(): sidN and S.kseq continue past every id the world holds; her new own people that collide get fresh ids.
(b) 02ae792c j61 kOf61 → k61WKey(): world people keyed from their stable world id — palace men «n<id>», court officers «o<office>», house heads «t<CLANS index>», the censor «tns», an NPC consort's child «c<name>». «x<n>» stays only for her own people and passing records (still g/h namespaced in co-op). Old saves / old co-op rooms: the level she knew under the old «x<n>» (e.kk) is copied once to the new key (k61WMig on the first k61S after load, flag S.kwm; lazily in kOf61 for world objects that arrive later from the room). k61PortEnt returns a world person itself (its e.kk is no longer a KREG key).

### Whole group (law 11) — key of each world kind, solo save scan (k61-wkey-oldsave)
| kind | count (one run) | before | after |
|---|---|---|---|
| palace men S.men | 9–10 | x<n> per seat | n<id> |
| court officers S.court | 4 | x<n> per seat | o<office> |
| house heads + censor S.trieu | 7 | x<n> per seat | t<i> / tns |
| NPC consorts' children | 3–6 | x<n> per seat | c<name> |
| her own people (maid, staff, kids, home family) | — | x<n> (g/h in co-op) | unchanged |

### Gates (on 02ae792c source; f198beab adds build files only)
- coop-e2e COOP_HOSTDIE=1 (host death + rebirth + B leave/rejoin) ×3: 143/143, 143/143, 143/143 — «one j61 key = one person» ok on both seats at start, weeks 1–3 and after rejoin, every run (before: 139/143 on 4cb42b96; reviewer x34 dupes on 05a4cbc0).
- coop-e2e plain 142/142; COOP_SWAP=1 142/142.
- quickcheck PASS (232 s, old save ok, perf median new/live render 252/253 ms, core gates PASS).
- node dev/test/k61-wkey-oldsave.js (new): old-save state with «x<n>» keys for men, court, heads, censor, NPC child → ser/deser → every level kept, new keys n/o/t/c, no key held by two people: 3/3 PASS.
Worktrees: /home/user/wt/fsr (branch), /home/user/wt/fsr-ho (handover).

## REVIEW flight-choose-guard (BIG REVIEWER opus, 25/11)
PRIORITY #1 CHECK ('chooseM opts[i]' / 'eaLockWhy' / 'deadCardIs'): OD 0 | ledger 0 | main: j3 chooseM, jemoact temper lock, jdeadcard net (flight-modal-deadlock, live) | review/* this branch only | claims: this review. Reused dead-card.js.
Verdict: **PASS — review/flight-choose-guard-r ff0f723f FF 0756a05b** (= d716e6ea + merge origin/main 0756a05b, index/sw rebuilt + one reviewer test fix, below).

| check | result |
|---|---|
| 1 chooseM off-card index | PASS. Base now refuses `!c` (card stays, window.__badPick with caller); before = TypeError «reading 'off'» (same no-pick outcome, plus a thrown error mid-handler). A real pick is never swallowed: only an index with no option is refused. jnf timer: no «Thôi» → card spliced + mine(null), the path the non-front branch already took (never chooseM(−1)). Family: 23 wrappers already guard m.opts[i]; direct callers jcoopthin:445 (relayed guest pick on the host: guarded `m.opts[k]`, refused pick → {refused}, both seats unchanged), jcooptimer:205 (index 0 of a 1-option card), jk4/jdfv/jkiep/jts/jtsb own indices — fixer's table verified. |
| 2 jemoact eaFree / law 2-3 | PASS. eaFree = open by every greying rule (bạc short, off, lock, tsDis, unmet need, lk()); used by the lock rule, the eaLock branch and the bot fallback → the temper lock never greys the last road she can really take (law 2: a usable road stays open; law 3: no cost-only). Note (pre-existing, not this branch): a guest pick relayed to the host is judged by the host's temper in the chooseM wrapper. |
| 2b jdeadcard screen rule | PASS. jdeadcard wraps showModal last (assemble order 448 > jemoact 354 / jtsb 215 / jgift 220), so it sees every DOM greying; selector `#modal .opts button[data-m]` only (the «!» overlay #kpinfo is outside #modal); kgx (gift back) and kit cancel cards excluded first; a normal card with any enabled option is never touched. Kit «Lui» only (law 9). |
| 3a dead-card.js on LIVE 0756a05b (test copied in) | DEAD-CARD FAIL 2: part 4 3× «reading 'off'», part 5 0/2 open |
| 3b dead-card.js on ff0f723f | DEAD-CARD PASS: part 4 refused ×3, card stays; part 5 1/2 open; parts 2/3 PASS |
| 3c coop-e2e plain / COOP_SWAP=1 on ff0f723f | 142/142 / 142/142 |
| 3d quickcheck ff0f723f vs live 0756a05b | PASS 668 s (dead-card hook included), old save ok, render 302/305 |
| reviewer fix (test only) | dead-card.js part 5 passed on «0/2 open + Lui» too — the Lui net alone is not the law-2 fix; now it needs ≥1 payable road open |
| laws 4 / 7 / 9 | no number; no new player text (the «Cần: …» temper line is the existing one); kit «Lui» only |

## REVIEW flight-e68-season (BIG REVIEWER opus, 25/11)
PRIORITY #1 CHECK ('e68Fits' / 'EVHOLD' / 'deserQ'): OD 0 | ledger 0 | main: j68 EVHOLD stale drop, j3 deserQ | review/* this branch only | claims: this review. Reused e68-season.js.
Verdict: **PASS — review/flight-e68-season-r d441ab69 FF ca5af050** (= 6b9a0ce4 + merge main 0756a05b (29a5c86a) + merge main ca5af050 (makeup only), index/sw rebuilt; no code change by the reviewer).

| check | result |
|---|---|
| e68Fits = template w(e68Ctx()) > 0 | PASS. w() is a pure weight of month / season / fest / rank / stats (scan of every j68 w: none reads cooldown, history or seen marks — the cooldown is e.cd, set on draw, separate), so a card that fits now is never dropped for having been drawn. Non-j68 cards (pid not «e68…», or no template) → true, untouched. |
| family of waiting j68 cards (law 11) | PASS. Every path that holds a j68 card off screen goes through one of the two gates: EVHOLD release (evRelease, + stale), EVHOLD rebuild on a world rebuild (j68:172 → deserQ), save P (j6:75 deserQ after normAll, so the restored month is read), co-op carried dialogs across the week merge (jcooptimer carryBack → deserQ: a winter card carried into spring is dropped — intended), spread queue (jspread:121 → deserQ). |
| no lost forced / story card | PASS. j68 follow-ups (fu6) have no caller; «must» cards are never held (j68:136) and only e68Test sets must; j68 cards are optional situations (evOptional). |
| old saves with a pending P | PASS: e68-season pendWinter kept in tháng 12; quickcheck old save ok |
| e68-season.js on LIVE 0756a05b (test copied in) | E68-SEASON FAIL (pendSpring 1, holdShown 1) |
| e68-season.js on 29a5c86a / d441ab69 | PASS / PASS |
| coop-e2e plain / SWAP on 29a5c86a; plain on d441ab69 | 142/142 / 142/142; 142/142 |
| quickcheck 29a5c86a vs 0756a05b; d441ab69 vs ca5af050 | PASS 672 s (buổi 1433/1717); PASS 690 s (buổi 2918/1650 = noise: the same code one merge earlier gave 1433/1717; the change is one filter on load / release), old save ok |
| laws 4 / 7 / 9 | no number, no new text, no UI |

## REVIEW flight-sid-rebirth (BIG REVIEWER opus, 25/11)
PRIORITY #1 CHECK ('lifeRekey' / 'k61WKey' / 'S.known' / 'kOf61'): OD 0 | ledger 0 | main: j61 kOf61 / KREG / k61InitNew, jcoopworld attach sidN | review/* this branch only | claims: this review.
Verdict: **PASS — review/flight-sid-rebirth-r 80e911b7 FF ca5af050** (= f198beab + reviewer fix 92821374 + merge main ca5af050, index/sw/assets rebuilt). LIVE is now ee37ab5f (sansang-music-fix-2): stack-merge by LC13.

| check | result |
|---|---|
| (a) lifeRekey root | PASS after the reviewer fix. sidN / S.kseq continue past every id the world holds; only HER new people that collide are rekeyed; world people keep their ids. |
| REVIEWER FIX 92821374 (was a FAIL item) | jcoopworld's start / nlRun wrappers are outer to j61's (assemble 208 > 125), so attach → lifeRekey runs AFTER k61InitNew wrote her household as known under the OLD keys. A rekeyed servant / «x<n>» kept its level on the old key: her own servant read «Người lạ», the old-world person on that key «Quen biết» (law 6b). Now the S.known / S.nkn entries move with the id (old key deleted, stale KREG slot dropped, K61VER++). New test dev/test/sid-rekey-known.js (solo, CW.lifeRekey hook): before own 0 / world 3 → after own 3 / world 0. |
| (b) world keys n / o / t / tns / c | PASS. Holders are permanent per world: S.court set once (j10:25), T.H once in trS (j55), T.ns only when missing (jagmin minNs), S.men ids stable → one key = one person. NPC child «c<name>» relies on names one per person (jname). Old saves: k61-wkey-oldsave.js PASS (levels moved x<n> → new keys, no dup). Relations / af keyed by sid stay clean (sidN past every world id, so a new sid is never a world servant's). |
| coop-e2e COOP_HOSTDIE=1 ×2 on 80e911b7 | 143/143, 143/143 (one j61 key = one person ok both seats, every stage) |
| coop-e2e plain / COOP_SWAP=1 | 142/142 / 142/142 |
| quickcheck 80e911b7 vs ca5af050 | PASS 691 s, old save ok, render 279/314, buổi 1548/1883 |
| sid-rekey-known.js / k61-wkey-oldsave.js | PASS / PASS |
| laws 4 / 7 / 9 | no number, no text, no UI |
Note (pre-existing, not this branch): in a HOSTDIE run the reborn host knew every palace servant at 3 (origin «cn» knows rivals' staff in k61InitNew, built against her throwaway world before the join) — worth a look by F: k61InitNew's world-people grants are computed before attach.

## REVIEW test-path-fix (big reviewer session_01UV1SziXSk67Zy3DMXHsCrJ, 11/25/2026) — FAIL 9fd1a445 (fix commit on review/test-path-fix-r 003ac0b0)
PRIORITY #1 CHECK: OD 0 (test-only) | main ee37ab5f dev/test/toilette.js, toil-overlay.js, hoa-dien.js | review/* robot-realtap (realtap.js reused unchanged) | claims Foreman F #6.
Branch = ee37ab5f + test files only (FF ok, index.html identical to LIVE). Every new test ran against LIVE (built root index.html, charset-less python server), old tests too, plus a mutant (CSS forces `.kfxf` shown while #mefig is hidden).
| check | Fold 755x1000@2 | iPad 1180x820@2 |
|---|---|---|
| OLD toilette.js on LIVE | rc 1, timeout `#kg82 .toilw` (cause #1 confirmed) | — |
| NEW toilette.js on LIVE | rc 0, 0 errors (swatches: all 3 «first», wanted colours not owned; test has no assertions, report only) | rc 0 |
| NEW hoa-dien.js on LIVE | 39/39, retaps 0 | 39/39, retaps 0 |
| OLD toil-overlay on LIVE | rc 1: false «mefig hidden» (only the .kpor avatar layer shown — cause #2 confirmed) + `0 tok … mid: picture hidden` | rc 1, same false positive |
| MUTANT (layer kept on hidden #mefig) with NEW overlay | rc 1, caught | rc 1, caught → new assertion NOT weaker |
| NEW toil-overlay, run 1 (load ~9) | **rc 1: 6 BAD `tok … mid: picture hidden`** (layer of #mefig shown while #mefig hidden, 300 ms after a token tap), DEAD 1 | rc 0, DEAD 1 (move 0, token entry bob, not a DEAD BUTTON) |
| NEW toil-overlay, runs 2+3 (alone) | rc 0 but **DEAD 7 / 8 of 14 moves** (token covered by img#mefig, G1) | — |
Real taps: no el.click()/evaluate-click in the 3 tests (grep); setup by state + function (start/render/kg82Play «Thử tay») stays, as documented.
FAIL reasons:
1. toil-overlay on Fold proves nothing when green: with G1 7–8 of the 14 moves are dead, so the layer-follow checks after a person's tap mostly never run, and exit stays 0. When the taps do land (run 1) Fold is RED with a real fault: the #mefig layer stays shown on her hidden figure after a token tap (G2, game candidate; the OLD test on LIVE saw it too: `0 tok fig bob … picture hidden`). Fix: a covered token (DEAD BUTTON, not a transient bob/disabled) must fail the test, or reach the move another real way; report G2 with G1 to Foreman F for a game worker. Do NOT relax the `mid` check.
2. hoa-dien «Dán» retap was a note only (a tap that does nothing passed). Fixed by me on review/test-path-fix-r 003ac0b0 (counted retap = FAIL check; Fold 40/40 ok after). Take it.
3. Not blocking: toilette/hoa-dien/rules-screen fixes are right; mk-e2e still fails (stale preset `pre-dep`) — not worse than before; laws 4/7/9 not touched.

## REVIEW test-path-fix-2 (big reviewer session_01UV1SziXSk67Zy3DMXHsCrJ, 11/25/2026) — FAIL 9f49083d (FF 9f72524b ok, test files only)
mk-e2e (new) on LIVE 9f72524b: Fold 755x1000@2 and iPad 1180x820@2 rc 0, 0 DEAD, reveal shown + closed, 0 errors — but pickedPreset = 'colours' on both, card «KIỂU | màu tự chọn»: the preset path that the test's header promises («real preset → the close card names the preset») is never run; the test has no assertion and ignores rt.tap results.
1. Carries test-path-fix FAIL item 1 (toil-overlay Fold hollow green, G2) — see «## REVIEW test-path-fix».
2. mk-e2e: at setup give her an owned preset (Đào hoa) in the bag, real-tap it, ASSERT the reveal card names it, exit non-zero on a dead tap / missing preset.
MG12 stale scan (4 hits, none blocked): OK.

## REVIEW test-path-fix-3 (BIG REVIEWER #2 session_01UV1SzhBrzCVc4CVbM2dCsJ, 11/25/2026) — PASS cb67ffba (review/test-path-fix-3-r = LIVE 9f72524b + 101dc29b, test files only)
PRIORITY #1 CHECK: OD 0 (test-only) | main 9f72524b dev/test/mk-e2e.js (no preset assertion) | review/* test-path-fix-r 003ac0b0 base, robot-realtap realtap.js reused unchanged | claims Foreman F #7/#8.
| check | Fold 755x1000@2 | iPad 1180x820@2 |
|---|---|---|
| mk-e2e on cb67ffba | rc 0 · MK-E2E PASS · pickedPreset daohoa · card «KIỂU \| Đào hoa» · 0 DEAD · 0 errors · reveal shown + ended | same |
| MUTANT (preset selector → missing) | rc 1 · 3 FAIL lines (not offered / not picked / card «màu tự chọn») | — |
| quickcheck cb67ffba vs LIVE | PASS (core gates, time-spill, old save ok, perf in noise) | |
Code: every required step goes through T() = rt.tap; a tap that does not land or a DEAD BUTTON pushes a FAIL; exit code = fail count > 0. Setup puts the Đào hoa boxes in her bag by state (allowed: setup, not a play step). Shots looked at (colour palette with Đào hoa row lit; reveal close card). Laws 4/7/9: not touched (test only).
Still open, NOT in this item: test-path-fix FAIL item 1 (toil-overlay Fold G1 covered tokens / G2 #mefig layer) — ordered to ROLE B fix-3; landing cb67ffba does not make it worse.
Observation for a game worker (not this item): on the reveal the face shows scattered red dots on both cheeks + forehead (powder/son stroke rendering?) at 1180x820 — check vs intended look.
