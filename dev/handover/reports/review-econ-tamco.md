# REVIEW econ-tamco (FOREMAN D #10, reviewer session_01964izCjh2dKcmvL4sSYKMG, opus, BIG)

PRIORITY #1 CHECK ('Tâm cơ|tamco|thuê người|BAL.road'): GAP OR21 / ECONOMY.md §5 «Chưa làm» | main: none (jecon §5 prices only; old BAL.road = jbalroad origin-roads table) | review/econ-tamco c45265d6 (this review; no other review/* on it) | claims ECON TAMCO #2 session_01964izCzXkfovcY4kd6X4Mk; KIT REQUEST «econ-tamco» open (dev/kit/KIT_REQUESTS.md).
START_CTX ≈ 12 %.

Reviewed: review/econ-tamco @ c45265d6c97a95b814365cd527df85a9f731d9f1 (final-merged LIVE 4e8cbaeb). origin/main is now f2e2d1cf: the land re-check must final-merge it.
Diff vs 4e8cbaeb: jtamco.js (new, 42 lines), jwhy.js spy price (1 line), assemble.py (jtamco after jecon), econ-tamco.test.js, index.html/sw.js.

## VERDICT: PASS-PENDING-KIT
Everything outside the kit part passes. **AS IS the branch BREAKS «shown = charged» → it may NOT land** until the kit «Tốn» part + the jtamco PEND.roadpick 2-line swap are in. Seen on the card (Fold 755x1000@2 and iPad 1180x820@2, bribe vs Hoàng hậu: price 88, tc 4, hire 40):
1. «Hao tâm cơ, tự mình sắp đặt»: «Tốn» row prints **không**, and Tâm cơ −4 is charged. The x text "tốn: Tâm cơ -4" does NOT reach the row (the kit drops it). So the card shows no cost for this road at all.
2. «Làm như thường»: «Tốn» prints **không**, and the scheme price is charged by the act (for bribe/block: on success).
3. «Thuê người làm thay»: «Tốn» prints **Bạc −40** only. The scheme price is charged on top.
Once the kit gives the option a cost field the fx does not pay (KIT REQUEST), «Tốn» must show: plain = price; tc = price + Tâm cơ −tc; hire = price + bạc −hire. Then send the branch back for a full PASS / LAND READY.

## Tests (run by the reviewer, one at a time, on c45265d6)
| test | result |
|---|---|
| econ-tamco.test.js (755x1000@2 + 1180x820@2) | PASS. Equal value for 13 schemes × every rival; card 4 options, no %; each road charges its fx/Tâm cơ and rolls the shown odds; price scan 0 mismatches; NPC roads 135 acts (tc 34/23, hire 15/21, plain 86/91), bad 0; page errors 0 |
| roadhp-unit.js | PASS |
| roadhp-scan.js | PASS (4320 rendered lines) |
| paid-tiers.js branch | FAIL 81 |
| paid-tiers.js plain LIVE 4e8cbaeb | FAIL 81, the same rows (diff of the normalised lists is empty): craft rows (Thêu khăn / Cắm hoa / Viết thơ / Chép kinh … «bán thêm < trả thêm», «quà không hơn») + a few shop items. **Pre-existing, not this branch.** |
quickcheck: not re-run here (the worker's run on c45265d6 was PASS 205 s). It is re-run at the land re-check after the final merge.

## Laws touched
- Law 1 two-way: OK. NPCs pick the same 3 roads inside the act (econRoadNpc), pay the same tc/hire, get the same +BAL.tcroad.up (aOdd wrapper, NPC only, ACTX.fz respected). The undefined-`a` branch of the wrapper cannot leak: the only `aRoll(o)` calls (j10 faction plot, jwhy her maid spy) are not inside a priced NPC act.
- Law 2 equal value: OK. hire = tc × BAL.tcroad.rate exactly (test checks every scheme × rival); tc and hire roads buy the same odds; the plain road is cheaper and worse.
- Law 3 gain-and-loss: OK. Every road has a cost and a gain.
- Law 4 one core: OK. All knobs in BAL.tcroad. The BAL.road wipe is fixed: no code reads the old tc keys from BAL.road (git grep rate/share/tcMin/up/npc* on BAL.road: 0 hits); roadhp unit + scan PASS. Spy now charges actBac("spy") = the printed price (law 11 group scan: 13 acts, 0 mismatches).
- Law 7 wording: OK. No %, odds as words + bar, cổ trang text.
- Law 9 kit first: OK. Kit dilemma card, no CSS added; the missing «Tốn» part was filed as a KIT REQUEST, not hacked.
- Law 12 devices: shots at Fold 755x1000@2 and iPad 1180x820@2 looked at: card in view, no overflow, no cut text.

## Bot measure (HH 36→45 %, early death 36→38 %, n 33/40)
Noise, not a balance shift. HH 12/33 vs 18/40: difference 9 points, SE of the difference ≈ 11.5 points (< 1 SE); the before arm also lost a shard (OOM). Early death +2 points is far inside noise, and the extra deaths are childbirth (9 vs 5), which the road code does not touch. NPC scheme acts on her are unchanged (blockf 7.2→6.0, landed accusations 2.3→2.0). Not blocking. Suggested (cheap, while waiting on the kit): one larger after-run (n ≥ 80) with run5e.sh to confirm HH sits inside the band.

## Notes for the fixer (not blocking; can ride with the kit swap)
- N1: at low odds (bribe vs Hoàng hậu: 8 → 20) all 3 roads read «Liều» with the same bar. The gain is only in the Được text («chắc tay hơn»). Law 3 holds, law 7 forbids %, so it is OK. Just be aware the player sees the same word.
- N2: her Tâm cơ is paid in econRoadGo before doAct, and the NPC road cost is paid before f0. If the act refused after that, the cost would be lost. No such path found (the card checks can()/ok() first), so low risk.
- N3: jwhy.js spy keeps a typed `:15` fallback when actBac is missing (dead path). Drop it for a clean law 4.
- N4 (follow-ups, already logged by the worker): co-op thin guest, jsgame person card and j70 chains run the plain road.

Shots: scratch only (/home/user/wt/rv-tamco-shots), deleted with this verdict; none in git or CDN.
Re-check: reviewer stays idle. On KIT READY + the swap: final-merge origin/main, re-run quickcheck + econ-tamco + roadhp, look at both devices, then LAND READY review/econ-tamco-rv <sha>.

## RE-CHECK 21/11 — review/econ-tamco @ 60703f26d71bf8f9f1d11a75e0ca9d4af843944c (on LIVE 8c8b8b6b) — FOREMAN D #13
PRIORITY #1 CHECK ('econ-tamco|ton:|ECON_WIN'): KIT_REQUESTS kit-ton-row DONE (KIT §13.16, LIVE e4fd4dcf) | main: j17 actLine ECON_WIN «hỏng: … không mất bạc» | review/econ-tamco only | claims ECON TAMCO #2 CzXkfovc.
Context: 17 % (start ~12 %). NOTE: LIVE has since moved to 64d2e094 (MAIN CHÍNH 84). The fix round must final-merge it.

### VERDICT: FAIL (1 item). Everything else PASS.
**F1 — on the ECON_WIN schemes (bribe, block, xinhh: price paid ONLY on success) the road card breaks «shown = charged».** KIT §13.16 / j63 treat «Tốn» as paid either way. The road card puts the scheme price in «Tốn» on all 3 roads and has no «hỏng» line. On a failed bribe, nothing of the price is charged. Seen in econ-tamco.test.js itself (bribe vs Hoàng hậu): the card shows «Tâm cơ -4 · Bạc -82», and a failed roll charges dBac 0, dTc −4. On the hire road the card shows «Bạc −122», and a failure charges −40.
The same acts' normal act card already says this (j17 actLine: `ECON_WIN.includes(k)` → «hỏng: …, không mất bạc»). Law 11 (whole group) + one source: the road card must follow the same rule.
Fix: for `ECON_WIN.includes(k)`, every road says what a failure keeps, with the j17 actLine wording and rule (one source, no new text table):
- plain road: «hỏng: không mất bạc»;
- Tâm cơ road: Tâm cơ is still spent, the bạc price is not;
- hire road: the hire is paid, the price is not. Show the hire and the price so the failure cost can be read off the card (e.g. split the Tốn figure, or say it in hỏng).
Extend econ-tamco.test.js: for an ECON_WIN scheme, force a fail and a success on each road, and check the charged bạc/Tâm cơ against the card's Tốn + hỏng lines (today the test records dBac 0 on a fail and still passes).
Non-ECON_WIN schemes (spy, poison, musk…) are fine: the price is paid either way, matching «Tốn».

### Gates re-run by the reviewer, one at a time, on 60703f26
| gate | result |
|---|---|
| revert audit `git diff 8c8b8b6b..60703f26` (depth-60 fetch; 8c8b8b6b is an ancestor; no merge resolved by me) | clean: 10 files, all econ-tamco (assemble.py +jtamco, jcoopthinf +ctx «econ», jecon econVeto refund, jtamco, jwhy, KIT_REQUESTS, 2 tests, index/sw). No LIVE hunk reverted. |
| assemble.py rebuild | index.html unchanged |
| econ-tamco.test.js Fold 755x1000@2 + iPad 1180x820@2 | PASS (rendered Tốn: «Bạc -82» / «Tâm cơ -4·Bạc -82» / «Bạc -122»; ptime deed path; price scan 0; NPC roads 150/135, bad 0) — but see F1 |
| econ-tamco-coop.js (live worker) | PASS 17 (both seats see the kit card; guest tc/hire paid ONCE by the host in her context with the odds she saw, nothing paid on her phone; two-way on the friend; host's own road) |
| coop-e2e.js | 68/68 |
| kit-ton-row.js | PASS 12 |
| roadhp-unit | PASS |
| roadhp-scan | FAIL 10 (untagged «Nhờ» in bd_* Bạc Đồ arcs). The same FAIL 10 on plain LIVE 8c8b8b6b: **pre-existing, not this branch** (for the bd road owner) |
| quickcheck | PASS 188 s, core gates PASS, old save ok, perf new/live render 234/197, tab 426/414 |
| shots Fold + iPad (looked at) | card in view, Tốn in kit red, no overflow, no %, odds words |

### Laws on the new code
- Law 1 two-way / co-op: OK. Her road rides with the act (ECON_HER → runAct ctx «econ»; ptSend/ptLand for sent deeds), the host pays it in her context, and NPCs use the same roads.
- Law 2: OK.
- Law 3: OK. The price and the NPC road are refunded when the j95c giá họa gate stops an act. That gate only fires for NPCs (`a===S` passes), so her road needs no refund.
- Law 4: OK.
- Law 7: OK.
- Law 9: OK (kit `ton` field, no CSS).
- «shown = charged»: OK except **F1** (ECON_WIN).
N1 (low odds: every road «Liều») and N3 (spy `:15` dead fallback) still stand, non-blocking.
Fixer: ECON TAMCO #2 session_01964izCzXkfovcY4kd6X4Mk. After the fix: final-merge the newest LIVE, then SẴN SÀNG KIỂM. The reviewer re-runs econ-tamco (+ the F1 fail/success check), econ-tamco-coop, coop-e2e and quickcheck.
