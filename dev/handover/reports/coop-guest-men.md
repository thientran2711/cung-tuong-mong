# coop-guest-men (D19 worker, Foreman D #19) — review/coop-guest-men

PRIORITY #1 CHECK: OD no ruling on S.men/host-only (grep 0) | main jcoopone.js:12 + jcoopworld.js:44 HOST_ONLY S.men, jcoopask.js request kinds np/srv/pet/kidout/srvout | review/* none (coop-guest-staff holds only the scan, reused) | claims: this seat (FOREMAN_D_STATUS 22/11 16:32Z). Order: MAIN 106 22/11 15:36Z = OPTION A.
Reused: jcoopask request path (collect / settle / hostApply / askDone / live relay `ctm-ask`), jcoopworld MEN_P split (her ties), review/coop-guest-staff `dev/test/coop-guest-lists-scan.js` (extended, not rewritten), the coop-guest-maid driver helpers (copied).

Base: LIVE origin/main b238857f. Head: see the SẴN SÀNG KIỂM line.

## The bug (law 1 two-way, law 6b real people)
`S.men` is a HOST_ONLY world key: at every guest rebuild her copy is replaced by the host's. So on the guest seat:
- a man of HER road (jrd_bd.js:42 bdMan «Mi Hồ Lan…», jrd_pt.js:41 pfMan «Kim Hựu Thành…») vanished at the merged week;
- a palace man HER act killed (affairExposed, j24 cold-palace letter, j95accuse, jmen menReport, jagstaff asCaught, jroute, jpq → mortKill) came back alive;
- her road sending an envoy home (away / ban) was undone.

## The fix — one path (dev/build/jcoopask.js), no second system
Request kind **"man"** like staff/kids/pets:
- GUEST collect (every ser): diff her `S.men` against the host's set she was last rebuilt from (`CW.base.W.S.men`). A man the host lacks → `{k:"man", mid, v, f:null}`; a man the host has → only `alive → false` and the road fields `away` / `ban` (`MAN_F`). The host's own set (ids `m0…`, menInit / jmen) is never asked. One open request per man (the latest replaces an older one; a change that is gone again voids it).
- HOST hMan: a new man joins `S.men` (world part; the host's own ties start at 0); a known man: dies (never brought back), away / ban as her road set them. Result in `S.askDone` as for every kind.
- GUEST settle: open → her stand-in on the host's set (her ties ride the request; after confirm they ride MEN_P in her blob as before); done → closed.
Why a diff is safe: on the guest seat every world loop is muted / her-only (jcoopone MUTE / ONLY_ME / PERSON, jmort people() host-only), so what differs from the host's set is hers.

## LAW 11 whole family — every HOST_ONLY key (jcoopworld.js:44)
Script: `node dev/test/coop-guest-lists-scan.js` (now exits 1 if a HOST_ONLY key has no classification row or a guest-owned one is dropped).

| HOST_ONLY key | guest-owned / her act writes it? | before (LIVE b238857f) | after (this branch) |
|---|---|---|---|
| men | YES — her road's envoys, deaths / away / ban by her act or road | **dropped at her rebuild** | **kept: request kind "man"** |
| thIll | not owned, but HER ACTS change it (j71 thbenh cure, j72 easeTH, jface cure) | **her cure / ease undone at her rebuild** | **kept: request kind "th"** (see below) |
| tn | no — the Emperor's night, host rolls (jnf) | n/a | n/a |
| cm | no — her own part (CM_P) rides her blob; world part host-rolled | n/a | n/a |
| menG2 | no — one-time flag of the host's set | n/a | n/a |
| wxDay | no — the day's weather, host rolls | n/a | n/a |
| nmReg | no — her people's names live in her blob | n/a | n/a |
| nmOrd | no — the host's rename orders TO her | n/a | n/a |

Person-list table (from the coop-guest-staff scan): **before 11 lists · 10 survive (S.men open) → after 11 · 11 survive**; HOST_ONLY: 8 keys · 0 guest-owned dropped.

"th" kind: `{b: host value she saw, v: hers}`; host hTh applies it on the value she saw; if the host's own roll changed it since, a cure still cures and an ease eases the same number of stages (solo rules), anything else is stale (0, no change). To keep it to HER acts, a guest-only endTurn wrapper in jcoopask takes back her week end's own thIll rolls (jmort.js:124 `S.thIll.st=2` runs unguarded on the guest) — the host's value comes with the merged week anyway.

## Gates (one at a time; head 8044a63c)
| gate | result |
|---|---|
| coop-guest-men.js (NEW: 6 steps — road envoy enters live, her act kills a man, envoy sent home, relay dropped + rejoin durable path, Thái hậu eased + cured, rejoin agree) | LIVE code **24/36** (12 FAIL: every man/away/death check) → branch **44/44** (r3; r2 43/44 = a driver check fixed: her tie grew 7→17 in play, now «≥ 7, never 0») |
| coop-guest-lists-scan.js (extended) | 11 lists · 11 survive; HOST_ONLY 8 · 0 dropped; exit 0 |
| coop-e2e.js ×3 | 141/141 · 141/141 · 141/141 |
| coop-guest-maid.js (main driver) | 35/37, 36/37, 36/37 — step 3 = the KNOWN test-made fail (rank-0 cap, fixed on review/coop-guest-staff); same 36/37 on plain LIVE. Run 1 also failed step 1 «links moved» once (passes on the other 2 runs and on LIVE) → flake, not this change (no rl code touched) |
| coop-guest-maid.js (review/coop-guest-staff driver 5bd28042, on this build) | **39/39** |
| coop-famops-unit.js | PASS 33/33 |
| one-core-guard.js | PASS (fails 0, inline 3561 ≤ 3592) — no new number; MAN_F are field names |
| quickcheck.sh | **QUICKCHECK PASS** · old save ok · core gates PASS · perf ≈ live |
| role-parity.test.js | ALL PASS |
Solo unchanged: every new path needs a co-op seat (`guest()` / `host()` read COOPW.on); quickcheck old save + solo open PASS.

## Notes for the reviewer
- Shared world person: if the HOST's own road holds the same envoy id (`mbd_lie`), it is one person; her request only adds him if absent / sets away·ban / kills; the host's next own bdMan call sets him by its book again.
- j96 frame man (`m96`) is host-made (j96 is an NPC act, muted on the guest), so `m\d+` ids are never asked.
- Told the coop-guest-staff r2 worker (session_01964izE9EtsVK9gpT5KfkPH) that jcoopask and the scan file changed.

## Files
- dev/build/jcoopask.js — kinds "man" + "th", guest endTurn thIll take-back.
- dev/test/coop-guest-men.js — NEW 2-browser driver.
- dev/test/coop-guest-lists-scan.js — from review/coop-guest-staff, extended (S.men via kind, HOST_ONLY family table, exit code).
- index.html / sw.js — rebuilt.

HANDOVER: none needed (work complete).
SẴN SÀNG KIỂM review/coop-guest-men 8044a63c163336d2b9e17e19008b662fa06e416d

## r2 — review FAIL fixes (review dev/handover/reports/coop-guest-men-review.md, D #20 order 18:29Z)
PRIORITY #1 CHECK: rv report (handover a893dc08) | repro review/coop-guest-men-rv a92d5c55 dev/test/rv-cgm-j72.js | main jcoophl.js ctm-wfix (host live world fixes), jcoopworld CW.restore | claims: this seat; coop-flakes worker owns remapS (untouched here).
Head: f98ceec2 (r2 2d4daa13 + r2b). Base still LIVE b238857f.

| finding | root | fix (dev/build/jcoopask.js unless named) |
|---|---|---|
| **F1** her ease resolving in her week end erased | my blanket endTurn take-back of thIll restored everything inside endTurn, her acts too | take-back DROPPED; the only unguarded world roll of it, **jmort.js:124**, now `worldOn()`-guarded like j13. Every thIll world roll is host-only, so what differs on her seat is hers wherever it resolves |
| **F2** requests built from the host's value | collect diffed against `CW.base`; but the host's live world fixes (**jcoophl ctm-wfix**) write host values straight into her S mid-week, and CW.base moves without a rebuild (jcoopworld :808/:848) | diff against **CW.askSnap** = her snapshot of the host's truth: taken from the room's C at every rebuild (also her first life); the same ctm-wfix ops for S.men / S.thIll are applied to it first (`snapOps`, same dispatch, before jcoophl); her rejoin's `CW.restore` (her own saved week) never retakes it — it rides her saved week as S.askSnap (a rejoin's room C already held her own road's man → her open request was voided: **this was the step-4 flake**). Ids carry the snapshot generation (`@g`): the same change later is a new request, never an old answer. Same window closed for kind "man" (away/ban never revert the host) |
| F2b (found in r2 runs) | the host eases ITS current value when her request lands after its own month roll; her stand-in showed her raw value → one week st2 vs st1 | one rule `thPredict` for the host (hTh) AND her stand-in (settle); collect does not re-ask while an open request's prediction is what she sees; illness compared by fields (illEq), not JSON order |
| **F3** driver | step 6 relied on the host's month roll | `ill3` re-sets st3 until BOTH seats agree; checks read pairs + the host's applied request; new **6d** (ease inside her week end, hook as the repro), **6g** (every applied "th" request is one of her acts), thIll watcher printed each run |

LAW 11 family (same scan): every guest-side writer of the two keys now diffs against the snapshot; HOST_ONLY 8 keys classified, 0 guest-owned dropped; lists 11/11.

### Gates r2 (head f98ceec2, one at a time)
| gate | result |
|---|---|
| coop-guest-men.js | r2 runs: 43/55 → 49/54 → 50/54 → 52/54 → 55/55 (debug rounds) → on f98ceec2: **53/53 · 53/53 · 54/54** (count varies with ill3 retries) |
| rv-cgm-j72.js (reviewer repro, on 2d4daa13) | **40/40** — RV7 «a "th" request from her week-end ease reached the host … r1», host st3→2 |
| rv-cgm-j72.js (on f98ceec2) | run 1 38/40: RV7 hook never ran — the host's own roll had already cured her (h null, nothing to ease; the repro has no re-set, as rv r1) · run 2 **40/40** (her week-end ease 3→2 reached the host, r1) |
| coop-e2e ×3 | 141/141 · 141/141 · 141/141 |
| coop-guest-maid (coop-guest-staff driver) | 39/39 |
| coop-guest-maid (main driver) | 36/37 — known test-made step 3 (same on plain LIVE) |
| coop-guest-lists-scan | 11 · 11; HOST_ONLY 8 · 0 dropped; exit 0 |
| coop-famops-unit | PASS 33/33 |
| one-core-guard | PASS (fails 0) |
| role-parity | ALL PASS |
| quickcheck | **QUICKCHECK PASS** · old save ok · core gates PASS · time-spill PASS |
No UI touched (no shots needed).

HANDOVER: none needed (r2 complete).
SẴN SÀNG KIỂM review/coop-guest-men f98ceec2e799b47890c5bb9e59c5ca3b55fe2f38
