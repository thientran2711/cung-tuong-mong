# coop-guest-staff (D19 worker, Foreman D #19) — review/coop-guest-staff

PRIORITY #1 CHECK ('coop-guest-staff|guest staff|refused maid'): OD 0 | ledger 0 | claims 2 (the D19 brief lines) | main 0 | review/* 0 | archive 0.
PRIORITY #1 CHECK ('coop.*men|guest.*men|mkMan96.*coop|men.*HOST_ONLY|guest man'): OD 1 (unrelated) | main 15 (jcoopone.js:12 "Palace men (S.men) are the host's … every rebuild takes the host's set" = by design) | review/* 0 | claims 8 (none on this).
Reused: lib/coop-clear.js (both drivers), jcoopask settle/srvHome, j10 capTrim/capOf/hhHas (BAL.promo.cap). No game code changed.

Base: LIVE origin/main b55a0e1c (role-parity-bundle-fix-rv 9c057f42 had not landed). Branch head: see the SẴN SÀNG KIỂM line at the end.

## 1. coop-guest-maid step 3 «refused → her maid is back» — ROOT
Not a merge / rebuild drop. Traced on the guest (deser + capTrim wrapped, one 50 ms staff watcher):
```
start  rank 0  cap [1,0]  staff []  maid Huệ Tâm          ← rank 0 = Đáp ứng: the table holds ONLY her personal maid
deser  wk1  staff [Châu Nhi#26 home]                      ← jcoopask settle: refused (no seat) → srvHome → back in S.staff, log «đủ người»
trim   [Châu Nhi#26]  rank 0 cap [1,0]  capSweep ← render  ← the one household law (j10 capTrim, guest trims her own: capSweep)
deser  wk2  staff []                                       log «Nội vụ phủ định lại kẻ hầu theo phẩm vị: Châu Nhi được điều sang hầu nơi khác.»
```
The driver's RISE pushed a NEW maid into a rank-0 household that has no cung-nữ slot (BAL.promo.cap[0] = [1,0]), i.e. a servant over the
table that solo can never have. The game did the right thing twice: gave her back (srvHome, «đủ người» line) and then applied the household
table (capTrim, `home` weight 5000 = she goes only when nobody else can; at rank 0 nobody else can). So the FAIL was test-made.
Fix (test only, dev/test/coop-guest-maid.js): before step 1 B's household must hold a cung nữ besides her personal maid (rank ≥ Thường tại
[2,0]; Nội vụ phủ fills the slot at once); RISE uses a REAL maid of her household (falls back to a new one only into a free slot) and returns
`legal` (hhHas ≤ capOf); step 3 adds «she stays (within the household table, no Nội vụ phủ trim)».

| check | before (b55a0e1c driver) | after |
|---|---|---|
| coop-guest-maid | 36/37 (FAIL step 3, staff [] every step) | **39/39** (staff [30] = the returned maid; returned 1; no trim) |

## LAW 11 family scan — every guest-side person list vs her rebuild
Script: `node dev/test/coop-guest-lists-scan.js` (static, reads W_KEYS / HOST_ONLY of jcoopworld + jcoopask request kinds + write sites).

| list | world key | host-only | a guest add survives her rebuild |
|---|---|---|---|
| S.staff (her household) | no | no | YES — her blob; leaves only by the household law capSweep→capTrim (BAL.promo.cap) |
| S.maid | no | no | YES — her blob |
| S.kids | no | no | YES — her blob |
| S.pets | no | no | YES — her blob (coop-pets 51/51: B's pets agree on both seats every merged week) |
| S.thO.staff (Thái hậu) | yes | no | host wins; 0 write sites a guest reaches |
| NPC v.staff add / out, v.kids out, v.pets add, a new person | – | – | YES — jcoopask request kinds srv / srvout / kidout / pet / np |
| **S.men (palace men)** | yes | **yes** | **NO** — every rebuild takes the host's set (by design, jcoopone.js:12) |

Summary: 11 lists · 10 survive · 1 open = S.men. Writers that can run on the guest's own seat: jrd_bd.js:42 (a Bắc Địch envoy of HER road
"mbd_*"), jrd_pt.js:41 (Phù Tang envoy "mpt_*"), j96.js:66 (mkMan96 frame man — j96 is an NPC act, muted on the guest, so host-made in practice),
j22/jmen menInit (the throwaway set the design names). A road man she adds lives on her screen until her next rebuild, then is gone until the
next bdMove/ptMove re-pushes him (law 6b: a person named in a road really exists).
**QUESTION FOR MAIN (rule call, not decided here):** should a man of the GUEST's own road (bd/pt envoys) become a host request kind
(jcoopask, like "np"), or stay host-only as jcoopone.js:12 rules? I changed nothing there.

## 2. coop-pets step 5 «B ends the week first while A holds a dialog» — driver redesign
Before: A opened a dialog and called forceNight BEFORE its own flip; under jnf co-op the guest's night needs the host's flip + {fin}, which
run at the host's endTurn, so the dialog held B's night too and B could never end first (2 FAIL).
After (dev/test/coop-pets.js): both close tối (press A, press B) → the host's flip and the one 10-second choice resolve → at the moment jnf
writes S.nfFin = today (finish(): {fin} goes to B), a setter on A's S.nfFin pushes A's dialog synchronously (nothing of A's own night or week
end slips in first: tryEnd needs !Q.length). Only B is cleared; B plays her night and sends `end`; A helps B (petcare); A closes her dialog,
ends her week; the merged week keeps the help. A watchdog counts a held dialog the engine removes (`re`) — 0 in every run.
Not a rule question: the real order (host flip first, then a host dialog) lets B end first; no new rule needed.

| check | before | after |
|---|---|---|
| coop-pets | 48/50 (FAIL «B ended the week», «merged week keeps the late help») | run pets2 49/51 (hold set, but A's end went out; debug not yet in) → pets3/4/5 **51/51, 51/51, 51/51** (re 0) |
Honest note: one run (pets2, before the debug fields) failed the 2 new checks with hold=1, sent=1, week 2; the cause was not captured. The three
runs after the debug + watchdog were clean. If a reviewer sees it again, the FAIL line now prints at/why/re/tr.

## Gates (one at a time, on this branch; game code = LIVE b55a0e1c, unchanged)
| gate | result |
|---|---|
| coop-guest-maid.js | **39/39** (before 36/37) |
| coop-pets.js | **51/51 ×3** (pets3/4/5; before 48/50; one earlier run 49/51, see note above) |
| coop-e2e.js ×3 serial (host Fold + guest iPad) | 141/141 · 141/141 · 141/141 |
| coop-famops-unit.js (the famops driver on main) | PASS 24/24 (needs a server on 127.0.0.1:8744 serving the REPO ROOT; served dev/ it waits for ever — harness note) |
| role-parity.test.js | 2 FAIL riseCore «Danh 3 vs want 5» — LIVE b55a0e1c (this branch changes no game code); the rv role-parity-bundle-fix 9c057f42 reports Danh +5/+5 PASS, so it clears when that rv lands |
| one-core-guard.js | PASS (fails 0, inline 3561 ≤ baseline 3592) |
| quickcheck.sh | run 1 FAIL perf only (longTaskMaxMs 3199 vs live 1807; game code = LIVE, box load) → rerun **QUICKCHECK PASS** · old save ok · core gates PASS |
| coop-guest-lists-scan.js (new) | 11 lists · 10 survive · 1 open (S.men, QUESTION above) |


## Files
- dev/test/coop-guest-maid.js — legal maid (her household table), new check «she stays».
- dev/test/coop-pets.js — step 5 redesign (hold after the host's flip).
- dev/test/coop-guest-lists-scan.js — NEW family scan (LAW 11).

SẴN SÀNG KIỂM review/coop-guest-staff 9c3701b3b7cbcc506817068f956fc1ce4ed78d83 (base LIVE b55a0e1c; test files only).

## Re-gate after merging LIVE 35f5b5ab (Foreman D #19 order) — head a8eaf45efe603925ff910e8533bf56e93c9b0bb1
Merge clean (only my 3 test files differ from LIVE).
| gate | result |
|---|---|
| coop-guest-maid | 39/39 |
| role-parity.test.js | ALL PASS (the riseCore FAIL cleared by 9c057f42, as expected) |
| coop-e2e | 141/141 |
| coop-pets | 47/51 twice. Step 5 (mine) PASS («A holds…» ok, re 0). 4 NEW FAILs in steps 0/1b, reproducible 2/2, absent on b55a0e1c (51/51 ×3, same driver steps): «each has the other as a consort entry [false,false]», «B's friend entry shows A's pet», «B: the hairpin is in her own bag» (B's screen shows the first-time rule panel «Thú nuôi · LUẬT · lời dặn lần đầu» over the gift dialog), «B: exactly one hairpin arrived». LIVE b55a0e1c..35f5b5ab touched jpetcare (petcare gate, helpFr/helpMind), jagmaid, jbal2. Not caused by this branch (test-only). FOR FOREMAN: a LIVE regression of 9c057f42 / 35f5b5ab, or a new first-time panel coop-clear does not close; needs its own worker. |

HANDOVER: none needed. The work is complete; only the LIVE coop-pets finding above is open.
SẴN SÀNG KIỂM review/coop-guest-staff a8eaf45efe603925ff910e8533bf56e93c9b0bb1

## The 4 coop-pets FAILs after the 35f5b5ab merge (Foreman D #19 order 14:04Z) — not a LIVE regression
| run | build | driver | result |
|---|---|---|---|
| plain LIVE | 35f5b5ab | LIVE driver | 48/50: the 4 early checks PASS; only the old step-5 pair fails (fixed on this branch) |
| branch driver on LIVE | 35f5b5ab | a8eaf45e driver | 51/51 |
| hardened driver | 35f5b5ab + this branch | 5bd280426405aa0a40050aacdf10084f22942386 | 51/51 |
| (earlier, merged branch) | same code | a8eaf45e | 47/51 ×2 |
Bisect b55a0e1c..35f5b5ab not needed: the game range (j42, jagacts3, jagmaid, jbal2, jpetcare) does not touch the friend entry, the first-time pet panel (jpet petTipShow, unchanged since a1a90fc0) or lib/coop-clear.js (unchanged), and plain LIVE passes the 4 checks.
Root of the 2 bad runs: timing. «each has the other as a consort entry» was read ONCE right after the rank/pet set-up (no wait; [false,false] = COOPW.friend() not built yet) while its two neighbour checks wait 15 s; the gift checks that followed ran on a B page still settling (first-time panel «Thú nuôi» from her first petAdd on top). Fix (test only): that check now waits (waitFr) like its neighbours. No game code, no coop-clear change.
SẴN SÀNG KIỂM review/coop-guest-staff 5bd280426405aa0a40050aacdf10084f22942386

## r2 (fixer session_01964izE9EtsVK9gpT5KfkPH; rv FAILs on 5bd28042 + LIVE 35f5b5ab / b238857f) — head 40cc2b928
PRIORITY #1 CHECK: OD 0 | ledger 0 | claims = this item only | main 0 | review/* review/coop-guest-staff, -rv, -rv2 | archive 0. Reused lib/coop-clear.js; new shared lib/coop-real.js.
Base: review/coop-guest-staff 5bd28042 + merge LIVE b238857f (clean). Test files only; NO game code changed; review/coop-late-res NOT opened (no game bug proved).

### Roots (with proof; DBG dumps now print on any recurrence)
| FAIL | root | proof | verdict |
|---|---|---|---|
| «each has the other as a consort entry» + friend-entry pets + hairpin (early steps, ~1/3) | the set-up wrote S.srv.risen / S.rank / S.pets on each seat's OWN screen only. Entries of the other seat and the host's copy of the guest come from the MERGED WEEK (CW.base.P). A servant start (origin cnv) stays a maid until then | run n-2 (old set-up, random origins): B origin cnv, base/host copy `srv.risen 0` → on A she is `coopStaff [{in:6, role:maid}]`, coopRivals [] → no consort entry (correct: a cung nữ is a maid). Probe 1 (both cnv): no entry on either seat after 15 s | DRIVER |
| a-3: petcare / gift / petsteal all «Người cùng cung, ngươi không thể ra tay hay lấy lòng» (13 FAIL) | same root: her real rank (host copy 0/1) < PAL_HEAD=3, so her entry can live in the host's palace (houseOf) → runAct's legal same-palace block | a-3 dump: baseP b rank 0, A base rank 3 (palace head) | DRIVER (legal block) |
| hairpin under «Thú nuôi · lời dặn lần đầu» | driver petAdd fires the first-time panel (jpet:67) over the gift dialog | — | DRIVER: S.petTip=1 first (legal state) |
| step 5 (i) «week 2 merged» (visitor choice «Có người đến» during the hold, clear→'many', sent 0) | the release only moved the hold to the front | rv dumps | DRIVER: release now answers EVERY dialog in A's queue (first open choice / close) until Q is empty |
| step 5 (ii) «B applied the late help» (pet 16, petcare ok, sent 1) | NOT reproduced in 22 step-5 runs after the fixes (incl. 4 with the OLD set-up + random origins). Checked in code: petcare has no dice (always applies), the late res path re-sends her end (onRes / CW.reEnd) | relay instrumented both ends (A __resOut res/actr, B __resIn), DBG5 (Q, sent/pend/rpend, D.N/PQ/log, fW/dOn), + new check «the pet A aims at is one B really has» (stale friend entry) | NO game bug proved. Most likely the same unreal set-up (rv runs had random origins / screen-only state); if it recurs the FAIL line now holds the proof |
Note: D (thin patches) is OFF in these rooms (D.N {} — withSeat changes made no patch), so mid-week the guest's own screen IS her person and acts travel by the `res` relay.

### Fix (test only)
- dev/test/lib/coop-real.js (NEW, shared): `origin(ctx,seat)` consort starts (env COOP_A_ORIGIN / COOP_B_ORIGIN, default tt / dtq, 'rand' = random), `REAL` (consort entry, not same palace, rank ≥ PAL_HEAD), `DBGF` dump.
- dev/test/coop-pets.js: consort origins + ONE merged week after the set-up + check «set-up is real on both seats»; S.petTip=1; deterministic step-5 release; DBG5/DBGF dumps on FAIL; late-help aim guard; probe env COOP_PETS_PROBE / COOP_PETS_NOMERGE (repro only). 51 → 54 checks.
- dev/test/coop-setup-scan.js (NEW, LAW 11 family list, static): 33 co-op drivers write a screen-only consort set-up; 1 real (coop-pets), 2 force an origin (coop-guest-maid, coop-thin-b-r1), **30 candidates** on random origins (heuristic: some may merge a week before relying on it). One-shot friend-entry reads: all 3 sites wait (coop-pets waitFr ×2 seats, coop-haohuu loop). FOR FOREMAN: the 30 need lib/coop-real adoption, each with its own runs — not done blind here.
- coop-guest-lists-scan.js untouched (worker coop-guest-men extends it on review/coop-guest-men 8044a63c).

### Gates (one at a time, head 40cc2b928, game = LIVE b238857f)
| gate | result |
|---|---|
| coop-pets ×5 consecutive (final driver) | **54/54 ×5** (g-1..g-5). Earlier clean streak on the intermediate drivers: c×4 53/53, r×5 53/53 (random origins), n 51/51 ×4 + 1 early crash (old set-up, the servant-start root above) |
| coop-guest-maid ×3 | 39/39 · **38/39** · 39/39. The one FAIL: «1 guest: her links moved to the world id» — her thiện cảm toward the new consort 25 → −3 in the merged week (passes: 25 → 19). Not doubled (would be ~50); check untouched this round. OPEN, cause not captured (a week act on her?); FOR FOREMAN |
| coop-guest-lists-scan | 11 lists · 10 survive · S.men open (MAIN 106 ruled option A; coop-guest-men worker) |
| coop-e2e | 141/141 |
| quickcheck | QUICKCHECK PASS (old save ok, core gates PASS) |
| role-parity.test.js | ALL PASS |

SẴN SÀNG KIỂM review/coop-guest-staff 40cc2b928
