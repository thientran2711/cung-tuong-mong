# coop-b1-regress — co-op B1 regression on live main (laydo / takeaway family)

PRIORITY #1 CHECK: OD 1563 (ONE TRAIT POOL, 17/11 ~05:45Z) | main d296f3cd0 jnet.js / j29.js:6 netIs(sv,"loyal") | review/* none on coop-b1 | claims main s26 coop-main-faults (fixed step 8, live 0f61ff92), CLAIMS:870 this worker.

Worker session_01N1tNP6usJ5fWhrv4JU1m4R (opus), coordinator Foreman B session 6. Branch `review/coop-b1-regress` from origin/main 086f1d607.
START_CTX ≈ 5 % of 1M (get_session read 0; own estimate).

## Verdict: STALE TEST, not a game bug
The game rule did not change; the test's way of switching it off did.
- Rule (j29.js:6, unchanged since 14/11): a loyal runner refuses a DIRTY act on roll(30) → "X quỳ xin nương nương đừng làm việc thất đức; việc không thành."
- coop-b1 forces `roll=()=>true` and, to keep that refusal out of the forced act, turned every trung runner into lanh through `x.tr` (r1 fix 5).
- **d296f3cd0** "ONE TRAIT POOL" (owner rule OD:L1563, 17/11 ~05:45Z, verbatim there) moved every servant nết into `p.net` (3 groups) and the line now reads
  `netIs(sv,"loyal")` (was `sv.tr==="trung"`). `x.tr` is no longer read once `p.net` exists → whenever bestSent() picked a loyal runner
  (Trọng nghĩa, loyal q 1 ≥ BAL.net.qOn .8), every dirty act of the test was refused with the roll forced true.
- Which cases fail depends on which runner bestSent picks per run (loyal + sharp sort) → 24/41 (7e0250ec, coop-thin-c), 28/41 (086f1d60, here), 33/41 (d296f3cd).

## Bisect (first-parent of origin/main; every step a live push)
| Build | coop-b1 (unchanged test) | Fail cause |
|---|---|---|
| 0f61ff92 (coop-main-faults live, 17/11 01:30Z) | 41/41 (reviewer r1) | — |
| 27886326e (last push before the pool, 05:39Z) | 39/41 (one run 17/39: friend entry never placed = known coop-stable flake) | 2 phonghoa "not offered" = known flake (coop-main-faults report) |
| **d296f3cd0** (ONE TRAIT POOL, 06:03Z) | **33/41** — 5 acts answer "… quỳ xin nương nương đừng làm việc thất đức" | j29.js:6 `netIs(sv,"loyal")` vs test `x.tr="lanh"` (dead field) |
| 086f1d607 (main now) | 28/41 — all failing acts answer the same refusal | same |
| 086f1d607 + test fix (this branch) | **43/43** (+2 item-ledger checks that exist since item-ledger) | — |

## Case → breaking commit → cause → fix
| Case | Breaking commit | Cause | Fix |
|---|---|---|---|
| 1 laydo (gain / loss / thất lạc case / note) | d296f3cd0 | loyal runner refuses (roll forced) | test: runners non-loyal through the pool |
| 4 musk | d296f3cd0 | same | same |
| 5 takeaway (gain / loss) | d296f3cd0 | same | same |
| 6 pond | d296f3cd0 | same | same |
| 7 plant, 7b return | d296f3cd0 | same (7b follows 1: nothing stolen to return) | same |
| 8 guest laydo on host (gain / loss) | d296f3cd0 | same on the guest's runner | same |
| 9 "two children fewer" | d296f3cd0 | follows 5 + 6 | same |
| (2 phonghoa "not offered", seen once before the pool) | — | known flake, not reproduced on the branch (3 runs) | none |

Test fix (coop-b1 `act()`): for the forced act only, `netQ(p,"loyal")` answers 0 for my own runners, put back in `finally` — the test says
"none of my runners is loyal" in the pool's own words (netIs / nq / qv all read netQ). No check removed or weakened.

## Whole family (LUẬT SỬA CẢ NHÓM): every test that sets a nết through a field the pool no longer reads
Scan: `grep -E '\.tr2?\s*=\s*"…"|x\.tr===|S\.pTr\s*=|\.trait2?\s*=\s*"…"'` over dev/test, dev/measure, dev/tools; each hit run on main.
| File | What it set | Before (main 086f1d60) | Fix | After |
|---|---|---|---|---|
| coop-b1.js act() | my runners `x.tr="lanh"` | 28/41 | netQ loyal → 0 for my runners during the act | 43/43 ×3 |
| coop-r2.js act() | same copy | 45/47 (FAIL 1 laydo gain / loss: the same refusal) | same | 47/47 |
| coop-r2.js:92 | NPC runners `x.tr='lanh'` (NPC acts on her) | dead write | loyal nết swapped for a non-loyal one of the same group in x.net | 47/47 |
| coop-rev2.js act() | same copy as coop-b1 | same refusal path | same | (needs an old build file; not run) |
| night-steal-unit.js:37 | `v.trait="Tham vọng"/"Hiền lành"` | FAIL (wa = wk, nết unchanged) | same-group swap in v.net: Tham vọng 2.2 vs An phận 0.4 (BAL.net weights; Hiền lành→Ân cần has no steal weight) | PASS |
| emotion-acts.js:30/31/36 | `S.pTr=…` (deleted by netMigrateAll) | dead write | slot of that nết set in S.net | PASS |
| emotion-acts.js:33 | `v.trait="Kiêu ngạo"` | dead write | same, on v.net | PASS |
| emotion-acts-2.js:37 / :40 | `S.pTr=…` / timid "Nhu mì" (left T_TIMID in d296f3cd) | FAIL 1 (hoitimid) | S.net slot / "Khiêm nhường" (= BAL.net.old.nhat) | PASS |
| opt-render.js:81 | servants `s.tr="tham"` (Hàng chợ đen) | dead write (card only by luck) | `s.net=null` + old word → pool reseeds Ham lợi (greed 1) | (not run: only a warn line) |
| promote-servants.js:14 | `s.tr="trung"` | dead write, test does not depend on it | none | 19/19 PASS |
| trong-check.js:22 | `trait:"Nhu mì"` for trongOf seeds | not a pool read | none | PASS |
| trait-pool.js, trait-rename-oldsave.js | old fields on purpose (old-save migration) | — | none | — |
| Game code | `git grep -E '\.tr2?\s*===?\s*"(trung|tham|nhat|lanh|chuyen)"' dev/build/j*.js` | 0 hits | — | — |

Sibling co-op acts that move an item / person between seats (laydo, laydol, phonghoa, musk, takeaway, pond, plant, return, guest→host laydo):
all go through runAct → j29 DIRTY gate → the same bestSent / netIs line; no seat-specific code was involved. Both seats run the same rule.

Not this family (seen while scanning, left for Foreman B): mem-upgrade on main FAIL 2 (`cause_soc_help` — SOC.help.run(v0,S) writes no cause; `cause_log_api` follows it). Not a nết read.

## Tests (branch review/coop-b1-regress @ 24d8eb38 = main 086f1d607 + tests only; no game code, no build change)
- coop-b1: **43/43, 43/43, 43/43** (3 runs).
- coop-p2: 42/45 then **45/45** (the fail: B1 bribe — guest answered "Nhận bạc, làm tai mắt", the host never got the answer; not a nết read, not reproduced).
- coop-e2e **63/63** · coop-guest-maid **37/37** · coop-one-world PASS · one-core-guard PASS (4956 ≤ baseline 4957).
- quickcheck **PASS** (open 1787 ms, old save ok, perf new/live render 171/157, buổi 807/855, core gates PASS).
- coop-r2: 2 runs crashed at "each has the other as a consort entry" (friend entry never placed — before any changed line; known coop-stable class), 3rd run **47/47**.
- night-steal-unit PASS · emotion-acts PASS · emotion-acts-2 PASS · promote-servants 19/19 · trong-check PASS.
- Fold 755x1000@2 host + guest (guest on Fold too), one laydo, looked at (scratch, not stored): guest gets the "Đồ thất lạc" BÁO card;
  host top bar Bạc 400 → 370, log "Hảo hữu của ta báo mất Bộ diêu vàng". On both, a talent-exam card (Tuyển chọn / Lễ ra mắt) sits over it —
  caused by the test forcing S.rank, not by laydo.
- Note for the test owner (not changed): with `roll=()=>true` the runner-caught roll also succeeds ("… bị bắt, khai ra chủ"), so the guest's
  note can come as "Hảo hữu ra tay" (named, jcoopworld.js:335 caught regex). Case 1 only checks /ngấm ngầm/ is absent, so it passes either way.

## Done
SẴN SÀNG KIỂM **24d8eb38** (review/coop-b1-regress). Finished at ≈ 15 % context; no rollover.
