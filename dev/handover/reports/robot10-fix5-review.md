# E84r — BIG REVIEW robot10-e-fix-5 6b96055a — verdict **PASS 6b96055ac4a71ba4eb3b8259b00240f37cde2d21**
PRIORITY #1 CHECK ('relManP'): OD 0 | ledger 0 | claims 0 | main 0 | review/* 0 | archive 0 (prio1.sh) — the brief carries its line; the fixer report §15 carries the scan; nothing pre-existing rebuilt.
Reviewer: E84r session_01DgYSWoVjheqq11nzo7HMWF (opus) for Foreman E. START_CTX ~3 %.

## Sha / merge
- Verdicted sha = origin/review/robot10-e-fix-5 **6b96055a** (verified on origin). Parent e75c2715 (fix-4-r2m).
- Latest origin/main = **178cac37** = merge-base → main is already an ancestor; merge with main is a fast-forward, no merge commit needed. Pushed **review/robot10-e-fix-5-r = 6b96055a** (same sha; coordinator can fast-forward main to it). Note: it also carries fix-4-r2m (E83r PASS) and fix-2 r3 (harness, test-only).
- Build own: `python3 dev/build/assemble.py` reproduces index.html byte-identical; quickcheck build step PASS.

## Diff (on e75c2715)
j9 +relManP (relMan OR id /^m[a-z]+_/ in S.men); jhc whoL / relPerson / relMSFace / relGrp → relManP; jkrel man flag → relManP; robot10.js recycled real pages keep [stk, at, save]; 2 new tests. No kit part, no CSS, no wording, no BAL, no co-op file.

## LAW 11 — my own scan (every «is a man» / id-shape test in dev/build/*.js, not the fixer's script)
Patterns: `/^m\d/`, `/^m[0-9]/`, `startsWith('m')`, `id[0]==="m"`, `charAt(0)`, `/^m…/`, `relMan(`, `S.men.includes`, `kind==="man"`, `pMan(`.
| site | test | road man (mbd_/mpt_) | verdict |
|---|---|---|---|
| jhc whoL :70, relPerson :79, relMSFace :94, relGrp :104, jkrel :43 | relManP | man | fixed (5 display sites) |
| j9 relKey / relHk / msAff / relOwner | relMan | key x<n> via kOf61 (unchanged) | ok, by design (saves keep numbers) |
| jhc relMSOf :86, j95 :101 | /^m\d+$/ | falls to j61 key x<n> → resolves to the same S.men object | ok |
| jnet :14 netSex | /^m\d/ | rw set → «m» on :13 | ok |
| jcoopask :75 | /^m\d+$/ | asked (hers) | ok, intended |
| j95 :378, :650 (stage presence) | `id[0]==="m"&&id[1]!=="m"` | 'b'/'p' ≠ 'm' → man | ok (NOT in the fixer's scan script, but already right) |
| j39, j59, j60:44/81, j61:96, jemoact, jmort, jimg, jmen, jaudit | S.men.includes(p) | man | ok |
| j3 WHO, j70:471 | w[0]==="m" (who-tuple «m» = maid) | n/a (not a person id) | n/a |
| j22:7 pMan | `Number(m.id.slice(1))%3` fallback face index | NaN → fallback "" (face comes from m.fc set by faceFor) | ok — LOOKED: envoy shows a man face. Non-blocking note: fallback index is NaN for road men (only used if faceFor gives no fc). |
Result: no reader left out. Fixer's script: base e75c2715 **open 4** (its jkrel row is classed «kept» on base, so the report's «5 → 0» is 4 → 0 by the script; the 5th site is real and fixed) · 6b96055a open 0.

## Tests (all on 6b96055a unless said)
| test | result |
|---|---|
| quickcheck --runs 5 | **PASS** 686 s · core gates PASS · time-spill PASS · old LIVE save ok · perf new/live render 219/225, tab 328/417, buổi 1270/1140 ms |
| r10e-roadman (road-man save, Fold + iPad) | base e75c2715 **FAIL 6** (TypeError «reading '1'» at srkName, «Sứ thần Mật Hồ Đạt» asked as servant, not in Nam nhân) → 6b96055a **ALL OK** |
| r10e-manid-scan | base open 4 → 0 |
| MUTATION A: relMSFace back to relMan | scan open 1 (jhc:94) + roadman FAIL 6 — caught |
| MUTATION B: relGrp back to /^m\d+$/ only | scan open 1 (jhc:104) + roadman FAIL 4 (Nam nhân / Cung nhân) — caught |
| role-parity.test.js | ALL PASS |
| old save, no loss | R8-hen-skilled-1.json (saves-r5) + road-live.json (= that save with bd «phong» + pt «kimthanh» moved to kinh and met, made on the LIVE build) loaded on LIVE and on fix-5, ser() after load + render: JSON identical except `at` timestamp and random `S.rkGid`; road men keep keys x45/x46, alive, numbers 0/0; 0 page errors |
| coop-e2e LOAD-COMPARE vs bare LIVE 178cac37 (2 runs each) | fix-5 134/162, 132/170 · LIVE 137/162, 130/154. Both break from week 0 (#next / week advance / buổi advance = known LIVE regression). Fix-5 run 1 had 3 extra world-sync FAILs (after week 3 / after rejoin / R10RV Hoàng hậu với X) — LIVE run 2 shows the SAME three, so they are run-to-run noise of the LIVE regression (random worlds, host-lag family). No FAIL name on fix-5 that LIVE does not also produce. No co-op file touched. Logged. |

## LOOKED (Fold 755x1000@2 + iPad 1180x820@2, scratch shots, not uploaded, deleted)
- Giao tình picker «Quan hệ với»: tabs Chí tôn 2 · Phi tần 11 · **Nam nhân 3** · Cung nhân 26; Nam nhân = Thị vệ Hy Bạch, **Sứ thần Hồ Đạt**, **Sứ thần Kim Thành** — man faces, the same kit pface frame + rank line as the numbered man (law 9, consistency ok).
- After picking the envoy: slot «Sứ thần / Hồ Đạt» with a man face; «Quan hệ giữa ta và Hồ Đạt» two-way rows Ta → Hồ Đạt (Thiện cảm, Oán) and Hồ Đạt → ta (Thiện cảm, Oán) — same kit rows as other men (law 1 two-way ok). No overflow, nothing cut, 0 errors. (iPad: the timed «Điều mới trong cung» notice popped over the panel — unrelated, LIVE behaviour.)

## 18 LAWS touched
1 two-way: envoy rows both ways ✓ · 4 one core: no number added ✓ · 6b real people: road man shown as the man he is ✓ · 7 wording: none new («Sứ thần» = existing role) ✓ · 9 kit: kit pface / rel3 / kitRelRows only, no CSS ✓ · 11 whole group: own scan above ✓ · 12 two devices ✓ · 13 prio1 ✓. Others not touched.

## Verdict
**PASS 6b96055ac4a71ba4eb3b8259b00240f37cde2d21** (review/robot10-e-fix-5-r = same sha, main 178cac37 ancestor).

## Addendum (Foreman E 14:09Z): merged LIVE d521656c (test-mrfoot) → **24f8c761b3ec9a917786a1af5c11769ca638b096**
review/robot10-e-fix-5-r = merge of origin/main d521656c + 6b96055a, 0 conflicts; dev/build, index.html, sw.js identical to 6b96055a (only the 59 test drivers from test-mrfoot changed).
| test on 24f8c761 | result |
|---|---|
| quickcheck --runs 5 | **PASS** 704 s · core gates PASS · old save ok · perf new/live render 233/225, tab 389/404, buổi 1537/1021 ms (within gate) |
| r10e-roadman (road-man save, Fold + iPad) | **ALL OK** |
| coop-e2e Fold host | **142/142** |
| coop-e2e COOP_SWAP=1 (iPad host) | **142/142** |
The earlier week-0 coop red was the old driver fault fixed by test-mrfoot. Final: **PASS 24f8c761b3ec9a917786a1af5c11769ca638b096**.

## RE-MERGE on LIVE c6c3ca76 (ORDER MAIN 123 14:45Z via Foreman E) — E84r
| branch | reviewed head | merge sha (ff from c6c3ca76) | conflicts | dev/build delta vs LIVE = reviewed delta | own suite | quickcheck --runs 5 | coop-e2e Fold host | COOP_SWAP=1 | verdict |
|---|---|---|---|---|---|---|---|---|---|
| review/robot10-e-fix-5-r | 24f8c761 (= 6b96055a code) | **a50db75ae32fc6ab79d780550091d4fac6c530ee** | index.html / sw.js only (rebuilt) | identical (j9 / jhc / jkrel) | r10e-roadman ALL OK | run 1 FAIL time-spill guard (1 runtime court walk, box busy: I was building fix-3 in parallel); guard alone 3/3 PASS on the merge and 3/3 on bare LIVE; rerun alone **PASS** 663 s (core gates, old save ok; render 224/178, tab 371/409, buổi 1350/1112 ms) | **142/142** | **142/142** | **PASS a50db75a** |
| review/robot10-e-fix-3-r2 | 2e7e489b | **e4597adf533403027682540783baa27f2d68289f** | index.html / sw.js only (rebuilt) | identical (8 files) | r10e-stock-full ALL OK · r10e-saveblocked ALL OK · r10e-oldsave-noloss ALL OK (saves-r5 R3-018) · monthly-allotment ALL PASS | **PASS** 667 s (render 199/220, tab 420/439, buổi 1081/1063 ms) | **142/142** | **142/142** | **PASS e4597adf** |
Note: LIVE moved to 15b5e1ff (robot-coop-fix-1 r2) while the tests ran — both merges are on c6c3ca76 as ordered; a new re-merge is needed before landing on 15b5e1ff.
