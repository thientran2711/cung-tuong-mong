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
