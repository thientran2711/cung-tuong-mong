# E-TIER-B14 — row 42, reviewer N1 (law 11): composed families j7c / j68c / j71c / j72c / jworldc → law 2 NHẸ · VỪA · NẶNG

depth 3 · START_CTX ≈ 7 % (1M window; get_session read 0, own estimate) · worker of FOREMAN E (C11 session_01DgYSWnTLKESBZ9JC7oK5Xh → C12 session_01DgYSWp9zL4ZuPoTVBm2tqu)

PRIORITY #1 CHECK ('equal-value|4 stances|same total|tier|om'): OD 27/11 ~00:36Z–~02:40Z (via START_CORE law 2 + tier-audit.md) | main LIVE 7d7c6886: j7c/j68c/j71c/j72c/jworldc + 5 validators on the old «4 equal-value stances / same total» rule, no BAL.<fam>.tier | review/e-tier-b13(-rv-m): batch 1 converter dev/tools/rdseeds_tier.py (pattern reused), item N1 = this task; b13c batch 3b touches none of these files | claims: E-TIER-B14 (CLAIMS 28/11 12:15Z).
KIT CHECK: no UI part added or changed (data / rules only; the kit event frame + kit option cards show one way fewer).

Branch review/e-tier-b14 (from LIVE 7d7c6886), one commit per family:
7aafa990 writer files j7seeds / fseeds / wseeds brought to main unchanged (j7seeds = the 81 rows j7sd.js ships; the handover copy had 5 later duplicate ids) ·
488db862 j7c · ee90f04d j68c · d32a13a4 j71c · 76fbe6e7 jworldc · 24a58124 j72c · d566f1ae old-save gate · 7dab9aa1 build · 2f jbac Q2 (tip = pushed head).

## Rule (one, every family — law 11; Foreman rulings Q1/Q2 28/11)
- A 4-stance seed (j7 / j68 comp / j71 comp / wc) = 3 stances NHẸ · VỪA · NẶNG; stance i Σgain == Σloss == BAL.<fam>.tier[i] = 1 / 2 / 3 steps; the seed's s/m/l stays the size of one step (BAL.<fam>.fx[tier]). New key `tier:[1,2,3]` on BAL.j7c / j68c / j71c / wc / j72c (jbal2.js, same shape as BAL.road.c.tier); the validators read it; the old «Σ == tier steps s1 m2 l3 / equal total» lines are replaced in place (law 14), comments in j7c/j68c/j71c/j72c/jworldc.js overwritten in place.
- Converter dev/tools/cseeds_tier.py (batch-1 method): merge the most-alike stance into its sibling (same-result merge; jworldc keeps ≥2 npc tags; a bạc-free road is always kept = the j68 soft-lock rule), order by cost kind (Sức/Tâm cơ/Tai mắt · Bạc/liking · Sủng/Danh/Đức/TH/HH), size each way from the writer's own keys so Tốn rises strictly and Được never falls on the audit scale; om = {removed: kept sibling} on the seed.
- j72 pick steps: 2 ways → 1/2, 3 ways → 1/2/3; no way removed; ways ordered by cost kind.
- Law 1: jworldc NPCs of the scope choose among the SAME 3 stances (same steps on their stats).
- Q2: jbac bacFairList (old 15/11 equal-value bạc re-pricing) now skips composed tiered j68c cards (ev.cs).
- Law 3: every kept way has gain ≥1 and loss ≥1 (validators). Law 7: no wording changed; cards print BAL numbers.

## Audit table (tier-audit/classify.js UNCHANGED, fed by a composed-seed dump: /home/user/wt/etb14-work/cdump.js — one step = BAL.<fam>.fx[tier], liking keys as «rel»)
| family | sets | BEFORE (LIVE 7d7c6886) | AFTER (branch) |
|---|---|---|---|
| j7c (j7sd) | 81 | CAP 81 | OK 81 |
| j68c comps (j68sd) | 460 | CAP 460 | OK 448 · FLAT 12 |
| j71c comps (j71sd) | 80 | CAP 80 | OK 80 |
| jworldc (jwsd) | 91 | CAP 91 | OK 91 |
| j72c pick steps (j72sd) | 253 (+3 with <2 real ways) | OK 65 · FLAT 188 | OK 195 · FLAT 58 |
| total | 965 | CAP 712 · FLAT 188 · OK 65 · MERGE 0 | CAP 0 · MERGE 0 · FLAT 70 · OK 895 |
FLAT 70 = steps rise 1/2/3 but the gain kinds differ (e.g. j72c-court-025: Thiện cảm 1 → Danh 2 → Ân tình 3, one Ân step weighs less than one liking step on the rough point scale) → C11 Q1 asks «check each pick's RESULT rises with its cost» → NOT DONE, successor item 2.
Old audit scope (regdump ARC67/E68/EV/NRASK, LIVE vs branch): 4896 = 4896 sets, **0 changed**, 0 missing / extra (classify = tier-audit v2 numbers both sides).

## Gates (part 1)
| check | result |
|---|---|
| validators (j7seeds, j68seeds a–d, fseeds a/b, wseeds a/b, j72seeds a/b) | 0 errors each; old LIVE data / fixtures FAIL the new validators (rule enforced) |
| j7c-play / j7c-reach | ALL PASS · reach 0 bad (never-list = LIVE's) |
| j68c-play fixture / full j68seeds_a | ALL PASS / 13 FAIL vs LIVE 38 FAIL on the same file — all the pre-existing «visit rel.A 0» kind (person's own rules, random) |
| j71c-play fixture / full fseeds | ALL PASS / ALL PASS (80 comps) |
| wc-play fixture / full wseeds | ALL PASS / ALL PASS (91) |
| j72c-play fixture / full j72seeds | ALL PASS / 12 FAIL vs LIVE 15 FAIL, same harness throw («reading 'opts'»), branch set ⊂ LIVE set |
| tier-b14-oldsave.js (NEW; LIVE pending cards → new build, every old way by name) | ALL PASS: j7 12 · j68 12 · j71 12 cards × 4 old ways; wc 91 rounds (NPC under each old stance id → wcOm); j72 256 seeds same ways by name; 0 page errors |
| mutants (MUT env, must FAIL) | wcOm=id 91 FAIL ✔ · wcOm=first 224 FAIL ✔ · j7c4 12 FAIL ✔ |
| quickcheck.sh (core gates + time-spill + old save from LIVE + perf) | was still running on 7dab9aa1 at handover (no verdict) — successor reruns on the merged tip |
| law 12 shots | NOT DONE: my harness shots showed the origin picker / the first-entry asset notice, not the card (harness, not game) — successor item 4 |

## Tickets
- (C11 Q2) jbac bacFairList = old 15/11 equal-value rule on 90 hand-written E68 cards → needs tier review (row 42 backlog, Foreman E owns).
- Pre-existing writer oddity (LIVE same): some j7 stances hold friend.X gain AND grudge.X loss on the same person (j7-030 «Cho {target} nói rằng vòng nứt…»: thiện cảm +9 / −18) — a writer fix, not a tier fault.
- j68c-play «rel.A 0≠…» flake and j72c-play harness throw exist on LIVE (pre-existing harness / person-rule issues).
- jbal2.js:1953 another family's «of equal value (law 2)» comment (not N1) — for the law-14 sweep.

## Handover — ROLLOVER (context ≈ START_CTX + 25 %), FOR FOREMAN E C12: open the successor
Successor (same branch review/e-tier-b14, new commits only, never rebase/force; work files /home/user/wt/etb14-work in this container only: cdump.js, before/after.tsv, old.html, cshots.js):
1. Merge LIVE 8a1a71de (or newer) into review/e-tier-b14; rebuild (dev/site/build_site.sh) if index.html/sw.js conflict.
2. C11 Q1 follow-up: the 58 j72 pick steps + 12 j68 comps whose gain kind does not rise on the point scale (list: rows FLAT in after.tsv) — make the RESULT rise (pick the NẶNG way's gain from a heavier key / resize) or list them as a ruling.
3. C11 Q4 ruling (a): ONE shared jstory hook — every bạc way in j7c / j68c / j71c / jworldc (and EVERY bạc way of j67, closing reviewer N2) gets its twin «… (không dùng bạc)» priced by altCost (BAL.altK), same result, shown as the non-bạc road of THAT tier (not a 4th tier); NPCs get it too (law 1, jworldc round: an NPC who cannot pay bạc takes the twin); keep alt72 for j72. j67 pledge indices: alts are appended after the row's ways, so S.pl67.i of a kept way is unchanged — prove by name. Gate: scan every bạc way has its twin + mutant (hook off) FAILs.
4. Gates on the final tip: quickcheck.sh vs LIVE, coregates (button crawl alone if it caps), q-softlock A/B vs LIVE (≥2 runs each), kit-std-scan = baseline, time-spill, tier-b14-oldsave.js + its 3 mutants, law-12 shots Fold 755×1000@2 + iPad 1180×820@2 of ≥3 converted cards (j7-030, j68c-day-001, fc-newyear-c01) looked 3× (use the dev/test/j7c-shots.js load-a-save flow: a bare start() leaves the origin picker on top).
5. Then «RV READY BIG review/e-tier-b14 <sha> (part 1)» to Foreman E; part 2 = j70c (routes) + jkyc (kỳ ngộ, kyngo-eq.js) per C11 Q3.

---
# E-TIER-B14b (successor) — session_01DgYSWqDEpSKDNbv6B6BrKL · depth 4 · START_CTX ≈ 3 % (1M; get_session read 0, own estimate) → 30 % at rollover
PRIORITY #1 CHECK ('altOf67|altK|alt72|npcCant|twin|FLAT'): OD 27/11 ~00:46Z law 2 + C11 rulings 12:22Z/12:28Z | main LIVE 8a1a71de: jstory altOf67 = ONE twin per hồi (silver[0]), jworldc npcCant weight, no twin on j7c/j68c/j71c/jworldc | review/e-tier-b14 b959b5e8 (part 1) | claims E-TIER-B14b (Foreman E C12 99eb141).
KIT CHECK: reuses the kit card / plaque option (c6 → kit cards, no new part); no UI part added or changed.

Branch review/e-tier-b14 (new commits only, after b959b5e8):
1ca5aad2 merge LIVE 8a1a71de (built-only conflicts, rebuilt) · e74ee37f Q1 · 200a16f3 Q4 hook · 4a251181 Q4 twins after the 3 ways + tests count real ways · **bf360722 tip** Q4 label «<way>, không dùng bạc».

## Q1 (C11) — the 70 FLAT sets now rise in cost AND result
dev/tools/cseeds_rise.py (one rule, law 11; only the sets the audit calls FLAT): steps kept (way i = BAL.<fam>.tier[i]); fewest gain/loss keys re-picked from the set's own keys (fallbacks in order: Danh/Đức gains · Sức/Bạc costs · Tai mắt/Tâm cơ for NHẸ) so cost AND gain rise strictly on the audit scale; never flips a way's gain into a loss; no two ways with the same result kind (law 2); a bạc-free way is kept.
Result: j72 58 / 58 · j68 12 / 12 fixed, 0 cannot; audit re-run (reports/e-tier-b14/flat.py logic = classify.js mono rule) FLAT 70 → 0. Validators 0 errors. Before/after per way: dev/handover/reports/e-tier-b14/rise72.tsv + rise68.tsv.
REVIEW NOTE: the swap is mechanical — some ways now gain a different stat than their text hints (e.g. j68c-serv-040 «Thưởng bạc cho nàng thật thà» liking → Tâm cơ); a reviewer / writer may want to re-word or pick per row.

## Q4 (a) (C11 12:28Z) — ONE jstory bạc-twin hook
jstory.js: BAL.twin.on · twinN «<way>, không dùng bạc» (no brackets: the kit plaque drops a «(…)» tail — seen on the Fold shot) · twinC/twinSuc = Bạc paid as Sức by the one altCost rule (BAL.bacTuan + BAL.altK, floor BAL.alt67Suc, cap altK.sucMax) · twin6 (c6 way + twin, same result) · twinsLast (twins after the card's NHẸ·VỪA·NẶNG: option i stays stance i for saves/bots/co-op) · twinNpc (law 1).
j7c / j68c / j71c / jworldc build their ways through twin6+twinsLast. j67: one altOf67 twin per bạc way, appended after the hồi's ways (S.pl67.i unchanged); hand ALT67 routes kept as the twins of the first bạc ways; a single-bạc hồi keeps its old name. jworldc round: BAL.wc.npcCant removed in place (law 14) — an NPC who cannot pay a stance's Bạc takes its twin (pays Sức at her rank). j72 keeps alt72.
Gate dev/test/bac-twin-scan.js: ALL PASS — j7c 81 cards / 111 bạc ways twinned · j68c 402 / 303 · j71c 80 / 58 · jworldc 76 castable (15 not castable in the harness roster) / 42 · j67 2933 hồi with bạc, every one has a twin per bạc way (LIVE-like mutant: 791 hồi short = reviewer N2) · NPC round: NPCs with 0 bạc pay Sức, none below 0. MUT=twinoff → FAIL (1304 ways + NPC) ✔.
REVIEW NOTE (law 2 «matching tier»): the twin's Sức is the canon altCost, capped at 20 — at rank 0 a VỪA Bạc 40 way's twin costs Sức 20 (fc-newyear-c02). One rule everywhere; if the reviewer wants the twin's Sức bounded by the tier, that is a BAL.altK ruling, not done here.

## Gates (done on 4a251181 unless said; bf360722 changes only the twin label)
| check | result |
|---|---|
| bac-twin-scan (bf360722) / MUT=twinoff | ALL PASS / FAIL ✔ |
| tier-b14-oldsave vs LIVE 8a1a71de (counts real ways) | ALL PASS (j7 12 · j68 12 · j71 12 · wc 91 · j72 256) |
| j7c-play · j7c-reach · j71c-play · wc-play · j72c-play | ALL PASS (reach never-list 6 = LIVE's) |
| j68c-play | 1–2 FAIL «rel.A 0≠…» in 1 of 3 runs, 2 runs clean = the pre-existing random flake (LIVE same kind) |
| validators j68seeds a–d / j72seeds a,b | 0 errors |
| time-spill-guard | PASS |
| coregates G1 (guard, bind, khac, text, textrule, c6cancel) | PASS |
| G2 rules-one-source | no fault («core done []») · G3 kit-conform floats none (CONFORMS/MISSING counts need the LIVE number to compare) |
| G4 hooks 30 webkit-syntax · 31 webkit-boot · 40 odds-cap · 50 coop-one-world · 60 mk-layer · 70 manifest · 70 npc-purpose · 80 dialog-fixed · 85 dead-card | PASS |
| G4 90 button-crawl, 92–96 (q-softlock, kit-std-scan, noise …) | NOT FINISHED (was running at rollover) |
| quickcheck.sh in one go | caps at 10 min inside the gates → run its parts: coregates (background, each hook ≤10 min), time-spill, then `node dev/tools/quickcheck.js <wt> <old.html> --out <dir>` (old save from LIVE + perf) — NOT RUN yet |
| q-softlock A/B vs LIVE (≥2 runs each) | NOT RUN |
| kit-std-scan Fold + iPad = baseline | NOT RUN |
| law-12 shots Fold 755×1000@2 + iPad 1180×820@2 | DONE, looked 3×: j7-030 (4 plaques: 3 ways + «…, không dùng bạc»), j68c-day-001 (Bạc 80 → twin Sức 20), fc-newyear-c01 (3 ways, no bạc), fc-newyear-c02 (Bạc 40 → Sức 20); harness = j7c-shots.js load-a-save flow + remove #kload/#kroul/#dawn + showModal after pushDil (script was /home/user/wt/etb14-work/tshots.js, this container only; shots not uploaded) |

## Handover — ROLLOVER (context 30 % ≥ START 3 % + 25 %), FOR FOREMAN E C12: open the successor (E-TIER-B14c)
Branch review/e-tier-b14 tip **bf360722** (pushed). Work files of this container are lost to the successor; everything needed is in git.
1. On bf360722 (merge newer LIVE first if main moved): coregates.sh in the background (each hook has its own ≤10 min timeout) — finish 90 button-crawl (alone if it caps), 92–96; then quickcheck.js old save from LIVE + perf; q-softlock A/B vs LIVE ≥2 runs each (LIVE-shared FAIL is not branch-born); kit-std-scan Fold + iPad vs dev/test/kit-std-baseline.json; G3 MISSING count vs LIVE.
2. Re-run bac-twin-scan + MUT=twinoff, tier-b14-oldsave + its 3 mutants on the final tip.
3. Then «RV READY BIG (part 1) review/e-tier-b14 <sha>» to Foreman E + FOR FOREMAN E line in FOREMAN_E_STATUS.md, quoting the two REVIEW NOTES above.
4. Part 2 after that (own RV READY): j70c routes + jkyc kỳ ngộ (kyngo-eq.js), same 3-tier rule (C11 Q3); the twin hook (twin6/twinsLast) applies to their bạc ways too.
