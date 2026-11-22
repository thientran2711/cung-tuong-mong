# night-multi-kem — worker report (session_01964izCK8uahRape4j1DLrp, depth 1, START_CTX ~3%)

PRIORITY #1 CHECK: OD 0 | ledger 0 | claims 0 | main 0 | review/* 0 | archive 0 (from the brief); git grep of the test + j2/jnf/j1 sg path done before the fix.

## SẴN SÀNG KIỂM b026f747 (review/night-multi-kem; = 2c0bc1af + merge of LIVE ddcca5c1)

### Root cause — TEST-side, game is correct (law 4 holds)
The red sub-check is `k` of case 6 (the DEFENCE card «Giữ chân Hoàng thượng»), not the attack «kèm» lines (f/r were green in every red run).
- The card (jnf.js showChoice) prints `sgStat(B().keep.gain)` = sg(gain): her Sủng is drawn through sg() (Hoàng thượng nồng nàn ×1.3, lạnh lùng ×.7 on gains).
- keepNoSteal → ap(S) → apply() → `v=sg(v)` adds exactly that number. Shown == applied.
- The test typed the raw BAL literal `Sủng +${BAL.steal.keep.gain}` (+2). start() draws the Emperor's traits at random, so the check went red whenever he had exactly one of nồng nàn / lạnh lùng (card shows +3 / +1, with the SG no-break space). Intermittent = trait draw, not timing.
- Not a render race and not an early read.

### Fix (test only; law-4 check made STRONGER)
Case 6 now builds the defence card under each Emperor trait set {none, nồng nàn, lạnh lùng, both} every run, reads the number on the card, and compares it with the Sủng keepNoSteal really adds (measured: S.sung before/after). Also keeps «khó thêm keep.rung bậc». Attack checks (f/r with fmt / stealKem / win) unchanged.

### Before / after (keep.gain = 2)
| Emperor traits | card shows | applied (keepNoSteal) | old check (`Sủng +2`) | new check |
|---|---|---|---|---|
| none | +2 | +2 | pass | pass |
| nồng nàn | +3 | +3 | FAIL | pass |
| lạnh lùng | +1 | +1 | FAIL | pass |
| both | +2 | +2 | pass | pass |

### Whole group scan (law 11): every night choice card that prints a «kèm» / Sủng number
Probe (each trait set, real flow to the nfch dialog) — raw card numbers vs applied:
| card | numbers on card (none / nồng nàn / lạnh lùng) | applied | verdict |
|---|---|---|---|
| Tranh sủng (stealX + fmt lose) | win +1, lose -3 / +1,-4 / +1,-3 | sg(win), sg(lose) same | OK |
| Chặn ngự giá | win +8, lose -8 / +10,-10 / +6,-8 | same | OK |
| Giữ chân Hoàng thượng | +2 / +3 / +1 | same | OK |
| kèm line (stealKem: ghen / quý / oán / Hoàng hậu) | no Sủng, same fn as the act (jbal2 note) | — | OK |
| jvisit «Thắp đèn hầu rượu» (`Sủng +${V.sung}` literal) | raw literal, scaled once at render by kitParse/sgTxt; covered by sg-card-scan runtime walk (PASS) | apply(sg) | OK |
| j79 / j75 night lines | sgStat / no Sủng number | — | OK |
Tests scanned for a typed raw Sủng vs card text: only night-multi.js:77 (fixed); emperor-visit.js:28 reads the pre-render literal (stable, correct).
Co-op: guest card and guest apply (jnf.js:378 keepNoSteal(S)) both use the one shared Emperor (S.emp) → same number on both seats.

### Gates (on b026f747, LIVE ddcca5c1 merged; game bytes = LIVE, diff = dev/test/night-multi.js only)
- night-multi ×10: 10/10 green (also 10/10 before the merge on bb92f986). Before fix: 1/4 red on bb92f986.
- night-final PASS · balance-core PASS · one-core-guard PASS · sg-card-scan PASS · quickcheck PASS (585 s).
- coop-e2e ×3 serial: 129/129, 129/129, run 3 110/130 (guest stuck at buổi 0:3 «Chờ hảo hữu…», world never advanced); rerun 129/129. coop-night: 109/111 (case 4 AFK guest −1) then rerun 111/111. These reds are on a game build identical to LIVE ddcca5c1 (no game diff) → live-Worker / co-op flake, NOT this change; flagged for D.

### Also seen (not in scope, flagged)
- night-multi case 7 «ledger pass» went red once (1/4, bb92f986, before fix, parallel runs): `lines:false, tries:0`. Not seen in the 20 serial runs since. Separate flake candidate.
