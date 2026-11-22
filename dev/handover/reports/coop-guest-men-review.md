# REVIEW coop-guest-men (D19 brief; reviewer session_01964izEo6EDw2BwHHJErxNB) — VERDICT: FAIL

PRIORITY #1 CHECK: OD 0 hits on S.men host-only | main jcoopworld.js:44 HOST_ONLY (8 keys), jcoopone.js:12, jcoopask.js kinds np/srv/pet/kidout/srvout | review/* review/coop-guest-staff (scan reused, fine) | claims: worker EPhZFbPA + this review. No second system found.

Target review/coop-guest-men @ 8044a63c, base LIVE b238857f (still LIVE at review time → merge = no-op). Review branch review/coop-guest-men-rv @ a92d5c55 (= 8044a63c + repro driver only).

## Laws touched
- Law 1 two-way / law 6b: men part OK in the driver (envoy in, kill, away/ban, durable rejoin). **th part breaks law 1: one of her acts on the Thái hậu is lost (F1).**
- Law 4 one core: one-core guard/bind/text PASS; no new number (Math.max(1,…) is the stage floor).
- Laws 9–12 (UI): no UI change in the diff; shots not taken (FAIL already).

## Findings (numbered, for the worker session_01964izEPhZFbPAtPWQtfD1o)
**F1 (BLOCKING, law 1 — her act vanishes).** The thWk endTurn wrapper (jcoopask.js:163) restores `S.thIll` to its pre-week-end value for EVERYTHING that happened inside her endTurn, not only the world rolls. Her own acts that resolve inside endTurn are erased too. Real case: j72 «Canh lò thuốc ba đêm cho Thái hậu» (th_thuoc2, j72.js:331) ends on the wait step W("Thuốc ngấm",1); that step completes in q72Tick inside endTurn (j72.js:238 → q72Go → q72End → ok.fn easeTH). Same shape for any wait-step / week-end resolution of j72 th_* tasks, and the jface cure if it runs from a week tick.
Proof (dev/test/rv-cgm-j72.js on review/coop-guest-men-rv, 2 browsers, LIVE Worker): host sets Thái hậu st3, merged week; guest's ease 3→2 runs inside her endTurn (hook in rivalsTurn); ser() is called 4× inside endTurn (last one sees st2) but NO "th" request reaches the host; after the merged week both seats show st3 → **her ease is gone** (run 3: `FAIL RV7 host: a "th" request from her week-end ease reached the host {"al":[],"h":st3,"h2":st3}`).
Fix idea (one path): take back only the ROLLS, not her acts — e.g. guard jmort.js:124 (`S.thIll.st=2`) with worldOn() like j13:27 (that is the only unguarded roll; j13 world rolls are already worldOn-guarded), and drop the blanket take-back; or snapshot/restore only around illMonth on the guest. Then extend coop-guest-men.js with a week-end-resolved ease (the repro's step).

**F2 (needs explanation / guard).** A "th" request is built from the HOST's own value, not hers: every driver run shows `live th:null>{phonghan st3} w4/w5 r0` right after the host (test) set st3 — the guest's S had the host's value while `CW.base` still had the old one. It was refused (r0) here, but hTh applies whenever `cur===b`, and the "eased by the same steps" branch fires when v.st<b.st. Also seen once (rv run 2): `live th:{st3}>null w5 r1` applied on the host while her only act was 3→2 — a cure the guest never made reached the host. Cause candidates: `CW.base` moves mid-week without a rebuild (jcoopworld.js:808, :848 `CW.base.W=J(C.W)`), or ser() inside endTurn before the take-back. The same window applies to kind "man" (a stale away/ban diff would REVERT the host's road: hMan sets/deletes m.away/ban). Diff against her own snapshot taken at her last rebuild, not the moving CW.base, or prove the window cannot occur.

**F3 (driver robustness, test-made).** coop-guest-men.js step 6 depends on the host's own month roll: run 1 crashed (`6 both: the Thái hậu is ill {"g":null,"h":null}` then TypeError at :134) because the host's roll cured her (j13 30 % cure). Step 4 also failed once in the repro copy (`4a: week advanced for both`, `4 host: applied from her blob at the rebuild`). Make step 6 not rely on the roll (re-set after the week or check the pair, not ≥2) and look at the step-4 flake.

## Check (3) asked by the brief
- jmort.js:124 is UNGUARDED on LIVE: confirmed (no worldOn/guest check; jmort.js untouched by the branch; jcoopone mutes illMonthP only).
- Double roll: the guest's own roll is taken back (OK) but together with her acts (F1); and a non-act value leaked once (F2). Not clean on either seat.

## Check (4) whole-family scan
coop-guest-lists-scan.js: 11 lists · 11 survive; HOST_ONLY 8 classified · 0 dropped; exit 0. Injected an unknown HOST_ONLY key "zz" → exit 1 (restored). PASS.

## Gates (every run counted; one at a time)
| gate | result |
|---|---|
| coop-guest-men.js | run 1 CRASH step 6 (F3) · run 2 44/44 |
| rv-cgm-j72.js (repro, driver body + RV7) | r1 39/40 (hook not reached: q72 path), r2 38/40 (step-4 flake ×2; F2 leak seen), r3 39/40 = **F1 proven** |
| coop-guest-lists-scan | exit 0; unclassified key → exit 1 |
| coop-e2e ×3 | 141/141 · 141/141 · 141/141 |
| coop-famops-unit | run 1 no server (my setup) · run 2 PASS 33/33 |
| one-core guard / bind / text | PASS · PASS (0 mismatches) · PASS |
| role-parity | run 1 killed by my 600 s timeout · run 2 ALL PASS |
| coop-guest-maid, quickcheck, old-save, Fold/iPad shots | not run (verdict already FAIL) |

Shots: none uploaded; scratch only.
