# review coop-thin-d r1 — FAIL (5 items) on 099ce05b

PRIORITY #1 CHECK ('coop-thin-d|remote dialog|thInv|thBribe|nbribe|hrCard'): OD 0 new (co-op thin rules = OD 17/11 ~01:40Z/~02:05Z/~02:15Z) | ledger 0 | claims: D worker session_01N1tNP2zKazQevGeQbxzSnq (archived), this review session_01N1tNP6MvvQQJhGffLYV2m8 | main 6c4f21c3 (old relays jcoopworld P2H.* / act invite) | review/* review/coop-thin-d 099ce05b, review/coop-thin-b 9af781c2 (= B + D merged), review/coop-thin-a-r1 (contract).

Reviewer session_01N1tNP6MvvQQJhGffLYV2m8 (opus, BIG co-op), coordinator FOREMAN B SESSION 2 session_01N1tNP5QYubNg1dqA9BZitC. START_CTX ≈ 5 % (estimate).
Branch reviewed: review/coop-thin-d @ 099ce05b — already contains origin/main 6c4f21c3 (current main): no merge needed, no conflict.
Verdict branch **review/coop-thin-d-r1 @ c6792773** = 099ce05b + one reviewer test seed `dev/test/coop-thin-d-probe.js` (the cases the worker's test does not cover; no code change).
Trial merge with review/coop-thin-b: done by the B worker (9af781c2 merges D 099ce05b; D is an ancestor; D's UI no-op list is a subset of B's ONE `TH.NOOP` list; withSeat entry/exit joined). Not re-run by me on 9af781c2.

## Verdict per check
| # | Check | Result |
|---|---|---|
| 1a | Cards built in HER context on the host, serialized (pid + pp, no closures), survive a GUEST reload, picked option rebuilt from pid, runs once | PASS for guest reload / reconnect and double tap (worker test + probe P4: two clicks on one button → host ran it once). Guest→host Mua chuộc works (probe P3: her Bạc −20 + her "Mua chuộc" card; host Bạc +20, spyFor 902). nbribe, heir, host-world item note: PASS (worker test). |
| 1b | … survive a HOST reload | **FAIL item 1.** |
| 1c | Same card looks the same on both seats (kit) / text in her perspective | **FAIL items 2 and 5.** |
| 2 | Person changes go back as acked patch; nothing computed on the guest when dOn() | PASS for her person S (patch, `pack`, rpend wait, reEnd). **FAIL item 3** for her viewer rows on NPCs (ev proof). |
| 3 | Level 0 (all live rooms) unchanged; old relays behind !dOn() | PASS. Code read: every new branch is behind dOn() (needs thin level ≥ 1); the refactors (invRun, briberRes, nbribeIn, evIn, hrCard, kpGate) are behaviour-equal; `sendRes` early return only when CW.ctx (never set at level 0). coop-e2e LIVE 60/60 + swapped 60/60; coop-p2 (old relays) 45/45; coop-thin-a flag off LIVE 19/19 + swapped 19/19; quickcheck PASS. |
| 4 | Tripwire D drop real | Real but **much smaller than reported** (item 4). |
| 5 | Tests | see below. one-core-guard 0 fails (6671 ≤ 6691, no --allow-grow). |
| – | Kit / VANPHONG / devices | New words (Nhận / Từ chối / "hảo hữu tiếp tục việc ấy" / "không nhận" / "muốn kết giao với ngươi" / "muốn tặng ngươi …") are cổ trang, no %. No new CSS/part. But the guest's render of the card differs from the native render (item 2). |

## FAIL list (for the worker)
1. **Host reload loses the answer to the HOST's own invite** (Kết giao / Tặng quà host→her). The card survives (it is in her stored S.thq / localStorage), but `invRun` needs `CW.acts[id]` (memory only) → after a host reload her "Nhận" is picked, the card leaves thq, and NOTHING runs: no act, no "Hảo hữu nhận lời", no "từ chối" note on either phone (probe P2: host `COOPW.acts={}`, D.log `["pick","thInv",0]`, host dialogs `[]`, her Thân sơ unchanged). The bribe card already does it right (pp carries `o`, `briberRes` needs no CW.brb). Fix: carry `{k, v (target id), item (the item itself, not the index)}` in the thInv pp and let `invRun` rebuild from pp when CW.acts has no entry (find the item by value, like `invHer`). Likelihood: có thể (any host reload / app switch while she has not answered) · severity: vừa (the offer silently vanishes) · seen by probe P2.
2. **The guest's copy of a host-built card does not look like the same card rendered natively (KIT FIRST + cut text).** Shots (looked at): "Hảo hữu tìm đến" (thInv) on the guest, Fold 755x1000 AND iPad 1180x820: the option hint "hảo hữu tiếp tục việc ấy" / "không nhận" is shown as a green ĐƯỢC / GHI CHÚ row squeezed to ONE LETTER PER LINE ("h ả o h ữ u …"), options in a 2-column grid, a speaker figure "Quản sự ma ma …" on the left; the SAME card as the host's own (pid thInv, iPad) renders as the normal option rows with "GỢI Ý …" + "an toàn" tag and the scene picture, no figure. The stand-in entry built in `gSync` (t,h,cls,btn,who,opts,mustChoose) lacks what the renderer uses for pid cards. Fix in ONE place (gSync / the thin entry), so every moved kind renders exactly like its native card; add a check per moved kind (guest DOM of the card == host-native DOM of the same pid card, modulo names) and real shots at 755x1000 + 1180x820 (see item 5c). Likelihood: dễ xảy ra (every invite card) · severity: vừa (unreadable hint, kit rule) · seen in shots.
3. **ev (tai mắt proof) reaches her phone only at the merged week** (old relay: at once). Probe P1: host evA(her entry, NPC, 1) → her log at once "Tai mắt … lén báo tin: chứng cứ với … +1", but her NPC proof stays 0 until the week merges (then 1, counted once — no double count). Same family (LUẬT SỬA CẢ NHÓM): every host-run card/res that changes HER viewer row of an NPC (rel/oan/ghen/ev → r.rl/ro/gp/ep[902]): e.g. briberRes "told" when SHE is the buyer (`evA(o,S,1); relAdd(S,o,-5)`), resApply effects on NPC rows, cnvBribe choices. The patch carries only her person S. Fix the family: carry her viewer-row changes of the NPCs touched in her context to her phone with the patch, WITHOUT a second count at the merge (merge3 adds numeric deltas: either rebase her week base for those rows when she applies, or mark them host-owned); scan list + before/after table. Likelihood: dễ xảy ra whenever she has a spy / bribe · severity: vừa (log says +1, proof shows 0 for the rest of the week; an accusation that needs it fails) · seen by probe P1.
4. **Tripwire numbers in the report are overstated.** My runs (local Worker, THIN=1 THINPART=4, 4 weeks, same bot): main 6c4f21c3 D STATE **2872 / 2794**; review/coop-thin-d **2194 / 2166** (+ D·patch 29 / 370). Drop ≈ **−23 %** (≈ −16 % with the patch writes), not "≈1740 → ≈880". Both main runs played 4/4 weeks here (the report's main runs stalled at 2/4 and 3/4 weeks, which skews a per-run total). Correct the report table (STATE per week or 4/4-week runs only).
5. **Tests.** (a) coop-thin-d.js is flaky: 1 of 4 swap-0 runs failed 4 checks at the bribe step — the guest's "Nhận bạc, làm tai mắt" names death ("khi ấy bị đánh chết") → `kpGate` puts "Kiếp này chưa trọn" in front on HER phone (correct behaviour) and the test never taps "Vẫn chọn"; the next step then picks the old card. Seed `S.kpWarn=1` on both seats in setup or tap "Vẫn chọn". (b) Add the probe cases to the gate (ev both ways, host reload with each kind of card open, guest→host bribe, and "both seats at once": her `do pick` arriving while the host answers his own card). (c) The test's SHOTS show no dialog: the Luân hồi screen, the season card ("Chạm để bỏ qua"), the Thánh chỉ and the "Phẩm phục Tần" reward (from `S.rank=3` in setup) cover the modal → shots must close those first; deliver Fold 755x1000 + iPad 1180x820 shots of every moved card on both seats. (d) The res note on HER phone is in the host's perspective (e.g. Hàn Thanh Liên reads "Hàn Thanh Liên không nhận vòng bạc hoa mai: nàng ta không ưa trang sức. Thiện cảm của nàng ta −2"): the `txt` is the host's runAct text; pre-existing on the old relay too, but D owns the res notes now and the audit's D test says "text in her perspective" → build the note text in her context (or re-word names → "ngươi") for every res kind.

## Notes (non-blocking, for the worker / later parts)
- N1 Host patch counter `D.N[seat]` lives in localStorage per room; if the host's storage is lost (other device, cleared), n restarts at 1 while her `S.thpn` is higher → every new patch is skipped silently (gSync `x.n<=S.thpn`). Rare · vừa · fix: send a host epoch with pq (reset thpn when it changes) or key thpn by room+epoch.
- N2 `ctm-thin-d:<room>` localStorage keys are never deleted (one per room ever played).
- N3 Old relays still present behind !dOn(); deletion waits for Foreman B's call (report §OLD PATH) — agree with keeping them while live rooms are level 0.
- N4 Part A §3 D list (J78.cur/ctx, IEV.cur/hold, RCP.ctx, KIP_GO/KIP_GIVE) is not registered; checked: all are call-scoped (set + reset in try/finally) or UI-set (IEV.cur by showModal, a no-op in context b), and every D entry into withSeat is from the event-loop top (D.later = setTimeout 0, `do` socket handler) → safe as is. Say so in the contract.

## Tests run (this review)
| test | build | result |
|---|---|---|
| coop-thin-d (local Worker, level 1 + part-4 flag) | 099ce05b | swap 0: 40/44 (item 5a flake), 45/45, 44/44, 44/44 · swap 1: 44/44, 45/45, 44/44 (one more swap run broken by my own overlay-closing shot hack, not counted) |
| coop-thin-d-probe (reviewer seed) | 099ce05b | 14/16: P1 mid-week FAIL (item 3), P2 FAIL (item 1); P3, P4 ok |
| coop-e2e LIVE Worker | 099ce05b | 60/60 · COOP_SWAP=1 60/60 |
| coop-p2 LIVE (old relays) | 099ce05b | 45/45 |
| coop-thin-a flag off LIVE | 099ce05b | 19/19 · swapped 19/19 |
| coop-thin-a level 1 local | 099ce05b | 24/24 · swapped 19/24, 24/24, 24/24 |
| coop-thin-a level 1 swapped, local | main 6c4f21c3 | 23/24 (round trip after week: `.S.tn.who` "901" vs "me"), 24/24, 24/24 |
| coop-one-world | 099ce05b | PASS (inside quickcheck core gates) |
| one-core-guard | 099ce05b | 0 fails (6671 / baseline 6691) |
| quickcheck | 099ce05b vs live 6c4f21c3 | PASS (old save ok; render 322/259, tab 390/372, buổi 1109/1151 ms; core gates PASS) |
| coop-bot TRIP=1 4 weeks ×2 per build | main / D | see item 4; 0 divergence; exit 1 on "friend-position mismatch" (pre-existing, part E/H) |

coop-thin-a swapped level 1, the 19/24 run: all 5 fails come from `hostId:null` in context b (the host is not in `rivals`: the host serves as a cung nữ → `standIn` friendSrv branch puts him in a house's staff); D does not touch `standIn`/friendSrv (only adds `__inv0`) → the test's identity check, not D. I did not hit that origin on main in 3 runs (main showed a different flake); the worker reports it on main 4719d424 (2/3).

Shots: kept in scratch only, looked at, deleted with this verdict; none in git or on the CDN.

## Rollover
Not needed.
