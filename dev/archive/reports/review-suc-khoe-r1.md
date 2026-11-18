# REVIEW review/suc-khoe @ 10cba645 — HEALTH + PREGNANCY BUNDLE (reviewer r1, FOREMAN D s7)

Reviewer session_01DgYSWnQ5MJS6ViDgFmBeGV (opus). START_CTX ≈ 3 % (own estimate; get_session read 0).
Order checked word for word: FOREMAN_D.md INBOX 18:08Z / 18:10Z / 18:17Z / 19:00Z (main s21); spec reports/suc-khoe.md §4.1–4.7 + OD 18:05Z / 18:10Z / 18:17Z / 19:00Z; worker report reports/suc-khoe-build.md.

## Branch review/suc-khoe-r1 (pushed, head 41716164)
- 5bde462a merge origin/main 7b5e5e49 (140 commits) into 10cba645. Conflicts: assemble.py (main's list + `jkh.js` last), j3.js weekly regen (sucCap kept + main's new NPC `tablet` line).
- 41716164 reviewer fixes (F1, F3 below) + suc-khoe.js now checks the exact ở cữ boundary.
- Site (root index.html / sw.js) not rebuilt (same as the worker; coordinator rebuilds on merge).

## Verified OK
- Sức khỏe touches ONLY the Sức max: sucCap(p) = 40 + 0.6 × khOf(p); every Sức increase in the assembled list reads it. My own scan (regex over every file in assemble.py, incl. the 140 new main commits): no un-capped increase left (only floors `max(…,30)` in jpet, below capMin's cap 58; start values at 18–20 y = cap 100). Regen amounts unchanged (j76sleep, j3 +4); jmort `tired` is off while BAL.kh.on (no double cut). No double cut found.
- ×0.7 conception factor removed in j35 and j22 (both read khOcu).
- jmort childbirth formula untouched (diff = only `p.nbWhy` text). Nothing softens death: low health is NOT added to birthRisk; overdue multiplies birthRisk ×1.5 and stillbirth +3 (spec); preterm babies die 40 % / 15 %. The overdue wrapper swaps the global birthRisk and restores it in `finally` (works: jmort reads birthRisk at call time).
- Lệch sổ uses the EXISTING blood test (rtNgSet / PEND.rtNg / PEND.rtNgNpc); innocent + honest bowl → blood mixes, accuser punished. Drug: deck card (kit card, odds word "Chắc", Bạc, Sức on failure) + NPC twin (npcDrug). History check present in the build report (sourced).
- BAL.kh / BAL.preT / BAL.pgRisk hold the main numbers (but see F4).
- Co-op: every NPC roll in jkh skipped on a guest (khGuest), as jmort.
- Old save main → branch (my harness: 40 weeks on main 7b5e5e49, age 44, ser() → deser() on the branch, 6 more weeks): khScar = 2 × children, cap 89, Sức clamped, every NPC initialised, no page errors.
- Kit: both new cards are kit deck/route cards (shots below). No private CSS.

## Tests (one at a time, merged + fixed build)
| suite | result |
|---|---|
| dev/test/suc-khoe.js (1180x820) | PASS (f: []) after r1 boundary check |
| dev/test/mortality.js 240 2 | ok, no page errors |
| dev/test/cycle.js 1180x820 | ALL OK |
| dev/test/routes.js 1180x820 | no errors, no overflow, no cut. NOTE: the harness serves html without charset → "Invalid or unexpected token" on main AND branch; ran with a local copy that adds `charset=utf-8` (pre-existing test fault, not committed) |
| palace-oldsave.js | its boot times out on main too (harness); replaced by my own main→branch old-save check above: PASS |
| coop-world.js | fails on main 7b5e5e49 the same way (TypeError reading 'name') — pre-existing, confirmed |
| coop-e2e.js (LIVE Worker, Fold host + iPad guest + solo) | 59/59 passed, no page errors |

## D57 bot re-run (dev/measure/sk-bots.js, BALJ conc .5, SEED0 5000, Sủng ≥ 25, 40 lives × 10 years, same seeds)
Base is the CURRENT main 7b5e5e49 (main moved 140 commits since the worker measured, so the absolute numbers differ from the build report).
| arm | NPC births | consort-years | births / consort-year | NPC conception / 100 nights | NPC mother died in childbirth | per 100 births | NPC miscarried / 100 pregnancies | her births |
|---|---|---|---|---|---|---|---|---|
| A main 7b5e5e49 | 373 | ≈ 3233 | **0.115** | 11.0 | 23 | 6.2 | 23.1 | 10 |
| B r1 (ở cữ = 1 month, fixed) | 555 | ≈ 3204 | **0.173** | 15.7 | 48 | 8.6 | 21.5 | 26 |
- Owner's words (18:10Z): "births may rise — report numbers": births per consort-year rise **+50 %** (0.115 → 0.173) with ở cữ 1 month and no ×0.7. With the worker's 2-month bug the rise was +45 % (0.097 → 0.141 on the older main). More births → more childbirth deaths in total (23 → 48 NPC mothers in 400 consort-lives-years); the per-birth rate is the same formula (6.2 vs 8.6, small samples).
- BAL.conc NOT retuned (that would undo her ruling) — a number for the owner, not a FAIL.
- Health counters (B, 40 lives): preterm m8 15 / m9 21 (6.5 % of births), preterm babies died 12, overdue 46, ở cữ kept 514, lệch sổ facts 63 → tests 28 (blood mixed 23, innocent condemned by a rigged bowl 2, guilty caught 3); ng_set 0.72 / ng_oan 0.05 per life. Her Sức max < 30 y: 97.9; NPC 30–40 y: health 91.6, cap 95.0, Sức 89.9.

## Shots (scratch only, not in git; looked at every one) — 755x1000@2 and 1180x820@2
drug card, lệch-sổ card (her accusing an NPC's child), Sức help panel.
- lệch-sổ card: kit route card, art, Cần / Tốn / Được / Kèm rows — OK.
- drug card: kit deck card BUT empty art (brown placeholder labelled "Giao thiệp") and filed under the Giao thiệp tab although dom = "Sức khỏe" → F6.
- Sức help: kit LUẬT panel; shows only the general text, no current ceiling (Sức 81 = cap 81 at 48 y, nothing says 81 is her max) → F2.

## Findings
| # | sev | finding | status |
|---|---|---|---|
| F1 | BLOCKING | Ở cữ blocked conception for **2 months**, not 1: khOcu used `S.turn − lastBirth <= ocuMo`; lastBirth = the month the birth falls in, so months 0 AND 1 were blocked (measured: blocked [true,true,false]). The worker's test only checked ocuMo+1. | FIXED by reviewer (`<`), test checks the boundary; D57 re-run above uses the fix |
| F2 | BLOCKING | Spec 4.6 not built: the ceiling is invisible on her devices. HUD shows "Sức 81" only; "tối đa M" is a `title` tooltip (no hover on Fold/iPad); the Sức help panel has no number; the person-card facts line (j79 §9, her and NPCs, "thân thể hao tổn sau sinh nở") is not built — spec 4.6 lists it as part of the item ("if she prefers" refers to showing no new number, not to the line). Build: Sức N/M (or the ceiling in words) through the EXISTING kit (labelled bar / kit help panel / kit facts row); if a ceiling mark on the bar is wanted → KIT REQUEST, not private UI. | worker |
| F3 | normal | "Ngủ một đêm: Sức +4" shown every week when Sức sits at the ceiling (j76 counted the gain up to 100, not sucCap); Sức did not change. | FIXED by reviewer (j76 uses sucCap) |
| F4 | BLOCKING (ONE CORE OD:L1267, order "every number a BAL key") | Hard-coded numbers in jkh: khMotive (rank gap 1, aff < 0, aff ≤ −30, oán ≥ 45); khNgNpc is a COPY of jroute's NPC blood-test numbers (alum Tâm cơ 55 / 25 %, accuser Sủng −10 / Danh −8, oán +40, punish 2, death 50 %) — two places now hold the same numbers (exactly the owner's violation example); preterm/low-Sức thresholds 30, cause-miscarriage Sức −20 (also printed as typed text). Fix: one shared blood-test resolver (or one BAL block read by jroute AND jkh), the rest as BAL.preT / BAL.pgRisk keys, text prints the key. | worker |
| F5 | BLOCKING (owner Q3 18:17Z) | A CLEAN innocent mother can never be taken to the blood test: evA is capped by jtruth deedCap (true deeds only); the lệch-sổ fact is not a deed, so a clean player gets 0 chứng cứ (probe: deedCap(S)=0 → evG 0 → no test), and an NPC with deedCap 2 stops at 2 < accEv 3. Her ruling says an innocent lệch-sổ birth CAN go all the way to the blood test. Fix: register the fact as a true deed-like item (deedSync, like the existing `pm` pregMismatch item) with enough weight that the fact alone can reach accEv, for her and NPCs alike; re-count ng_set / ng_oan. | worker |
| F6 | normal | Drug card "Uống thuốc thúc sinh": no art (empty placeholder) and sorted into the Giao thiệp tab. Reuse an existing medicine/thái y card art + the right tab group (art requests go to Foreman C, never code-drawn). | worker |
| F7 | normal (two-way law) | Her card "Tâu xin nghiệm thân" on an NPC's lệch-sổ child needs no chứng cứ, while NPCs need motive + ≥ accEv + the rtGateT gate, and the existing rtNgNpcCards needs ≥ 2. Use the same need for both sides (kit `need` row). Also she gets no chứng cứ from an NPC's lệch-sổ fact (khLech only feeds rivals). | worker |
| F8 | minor | Spec 4.3: j68e "Để thái y kê thuốc bổ" (named in the spec) does not count as a tonic. | worker |
| F9 | minor | Spec 4.5: recDefend ignores whether the thái y record (S.thy.rec) exists; spec 4.6 thái y verdict "<50 → Có bệnh" not done (only < 80 → Hơi yếu). | worker |
| F10 | minor (wording) | The Sức gloss starts "Sức khỏe." and the added sentence says "Sức khỏe định mức Sức tối đa" — Sức is called Sức khỏe, then Sức khỏe sets Sức; kids' hp is also called "Sức khỏe" (j2/j7/j71). Pick one word for the new stat per VANPHONG. | worker |

## Not counted as findings
- Births +50 % (owner ruling; number reported above for her).
- NPCs barely trigger walking/work miscarriage causes (NPC acts spend ~no Sức/khắc) — spec Finding 1, belongs to npc-mind / two-way-acts.
- Guest players in co-op: rivals' evidence on a guest's own lệch-sổ birth is skipped on the guest (host-only rule) — acceptable under the host-only rule; note for the co-op owner.

FAIL 8 (3 BLOCKING open: F2, F4, F5; F1 BLOCKING fixed by reviewer, F3 fixed) — fix branch review/suc-khoe-r1 @ 41716164.
