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
