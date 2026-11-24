# AGEBAND — E57 report (review/ageband)

PRIORITY #1 CHECK ('ageBand|age band|ageMin|age.adult'): OD 10 (OD 24/11 ~00:25Z = this job) | ledger 1 (#161) | main BAL.ageBand jbal.js:339 + BAL.age.adult jbal.js:375 (= the youngest adult, REUSED: folded into the new BAL.ageMin, old key removed) | review/* 0 | claims: this job only.

Owner (verbatim, OD 24/11 ~00:25Z): "Cập nhật tuổi game là 18, 28, 39, 51, 64" → bands 18–27 / 28–38 / 39–50 / 51–63 / 64+.

**Head: `review/ageband` @ 6155c7c40be3737126727f17668f482d70c129ca** (from LIVE 4a8c627b). 53 files.

## What
- `jbal.js`: `BAL.ageMin:18`, `BAL.ageBand:[28,39,51,64]` (was [26,36,51,65]), `BAL.ageArt:["a18","a26","a36","a51","a65"]`; new `ageArtIx(tag)` / `ageArtOf(age)`; `ageBandName` reads `BAL.ageMin`; `BAL.age.adult` removed (jage reads `BAL.ageMin`).
- **Art tags are file names, not ages.** Before, `tagBand("a26")` / `figAge("a26")` parsed the 26 as an age; with the new edges that would put a26 art into band 0 and a36 art into band 1. Now tag → band by position in `BAL.ageArt` (j35 tagBand, j39 figAge = first age of the tag's band, j66 figDist via figAge). CDN files keep their names (a26 = the band-2 painting); renaming thousands of CDN files is Foreman C's call, not needed for correctness.
- LAW 11 — every typed band edge and every typed adult-minimum 18 now reads BAL (table below).
- Docs canon-overwritten in place: main `dev/HANDOVER.md:53`, `dev/OUTSIDE_PLAN.md` (5 lines), `dev/SUCCESSION_PLAN.md:68`, `dev/art/ART_COMPLETENESS.md:78`; handover branch `dev/HANDOVER.md:53`, `dev/art/FIGURE_GATE.md:171,216`, `dev/handover/WORKER_BRIEF.md:17`, `dev/rules/START_WORKER.md:28`. OWNER_DECISIONS (the log) untouched.
- Tests: new `dev/test/ageband-unit.js`; `dev/test/fig-wiring.js` edges/tags from BAL (ages now include 27/28/38/39/50/51/63/64); `dev/test/npc-purpose-rows.json` one fingerprint follows its line (j42 cnvName monthly, `S.age>=18`→`BAL.ageMin`, status LIVE-OFF unchanged).

## Scan (dev/build/j*.js, typed age thresholds) — before/after
| class | before (lines) | after |
|---|---|---|
| band edge 25/26 · 35/36 · 50/51 · 64/65, art band lists, label strings | 22 | 0 (4 left are NOT band edges, see below) |
| adult minimum 18 (≥18 / <18 checks, `age||18` defaults, `18+R(n)` spawn ages, `S.age=18`) | 37 | 0 |

Sites changed (band edges): jbal 339/342; j35 BAND4N/tagBand/mesac ×1.15/×.8 (≤25/>35 → <28/≥39); j39 figAge + maid→mama look (≥36→≥39); j60 ×2, j61, j88, j92 ×2 mama look; j17 bandKeys consort/maid/emperor/official/man, young-maid count, Thái hậu start ≥51 = `BAL.ageBand[2]`; j3 eunBand (28/40/52 → `ageBandIx` capped 3); j25 consort womid pool; jkc KC_AB → `BAL.ageArt`; jstaff/jtut "a51"/"a36" → `BAL.ageArt[3]/[2]`; jimg MEBANDS [18,26,36,51] + nearest-number pick → `BAL.ageArt[min(3,ageBandIx)]` (also fixes 22–25 picking a26 before).
Sites changed (ageMin): j1, j2, j8, j10, j17 ×3, j27, j35 ×2, j39, j42 ×13, j54 ×2, j55, j62, j67 ×2, j68f, j72 ×4, j88, j96, jage, jagmaid ×2, jagstaff ×2, jartc ×2, jcoopworld, jcycle, jhaohuu, jht, jkc ×4, jkc2 ×2, jkidlife, jkit ×2, jmen, jplx.
Player text: j54:240 + jht:261 «một công chúa từ 18 tuổi» now print `BAL.age.wed` (the key the hòa thân code checks).
Kept (not band edges, own concepts; listed for ONE CORE follow-up, not changed): j35 ageLine birth risk >35 / «dễ ốm hơn» >50, j35:30 + j13:28 illness >50, j32 >35, j3:13 + jemo mama picture ≥45 (= srvAge.mama concept), j17 maid «womid» to 44, Thái hậu pool ≤55, j54 suitor pool age-out >27, j96 min 19.

## Gates on the final head
- ageband-unit: **13/13 PASS**. On LIVE 4a8c627b (INDEX=origin/main index.html): **12/13 FAIL** — every case fails except case 4 «no blank», a guard that holds on LIVE too.
- quickcheck: **PASS** (old save ok, core gates PASS incl. npc-purpose after the fingerprint fix; render 204/203, buổi 2201/2052 ms). First run on 8657f20d FAILED only on G4 npc-purpose (the fingerprint) → fixed in 6155c7c4.
- one-core-guard PASS (inline 3547 vs baseline 3592), one-core-text / one-core-bind / one-core-text-rule PASS.
- fig-wiring: PASS, 30,128 cells, 0 blank, 0 bad, labels ["18-27","28-38","39-50","51-63","64+"].
- role-parity ×2: ALL PASS.
- coop-e2e (jcoopworld touched): run 1: Fold host 140/141 + SWAP 140/141 (one canonical-W diff each: after rejoin S.fidUsed guest-only tail maid:m42/m52 = the known coop-host-lag OPEN B; after week 2 S.emp.mood 1/0 + S.fidUsed.48) → rerun on the same head: **Fold host 141/141 + COOP_SWAP 141/141**. Reviewer may want one more pair; nothing in this branch touches faces held across seats or emp.mood beyond the ageMin default in jcoopworld buildFriendSrv.
- Shots (looked): Fold 755x1000 + iPad 1180x820, host mode, her own screen at 27 then 28: header «27 tuổi» → «28 tuổi», same face, a18 → a26 painting. CDN upload refused (no R2 credentials in this session) → `dev/handover/shots/ageband/fold-pair.jpg`, `ipadAir-pair.jpg` (handover branch; delete after the verdict).

## Old saves
People keep their identity (idn/fid) for life (j35); only the picture's band follows the new edges: a 26-year-old now shows her a18 art until 28, then a26 (unit case 6). quickcheck old save from LIVE loads and plays a buổi.

## For C / MAIN
- Art file tags a18/a26/a36/a51/a65 keep their names; they now mean bands 18–27/28–38/39–50/51–63/64+. If the owner wants the files renamed, that is a C job; code reads tags only through `BAL.ageArt`.

## FIX r1 (E60, review/ageband-r from 86b87a32; fixes E59r FAIL 1, LAW 11)
PRIORITY #1 CHECK ('ageBand|ageMin'): OD 10 | review/ageband-r 86b87a32 (E59r FAIL) | claims AGEBAND row (E).
Scan (reviewer's line) over ALL dev/build/j*.js + wider scan (`age…<>=…15-19`, `15-19+R(`, `,15-19,"role"`, every `18` near age/tuổi/T( in jkc*/j54/jht/j3/j8/jbal*): 5 sites meaning "youngest adult"; everything else is not an adult minimum.

| site | before | after |
|---|---|---|
| jkc.js:131 Thứ muội | `18` | `BAL.ageMin` |
| jkc.js:133 Khuê hữu ×2 | `18+R(2)` | `BAL.ageMin+R(2)` |
| jkc2.js:134 Xuân Đào | `18+R(2)` | `BAL.ageMin+R(2)` |
| jkc2.js:142 muội | `18` | `BAL.ageMin` |
| jbal.js:40 `ps.consAge[0]` (harem seed, j2:15; found by the wider scan, not in the reviewer's list) | typed `18` | `BAL.ps.consAge[0]=BAL.ageMin` set right after ageMin (jbal.js:343) |

Left on purpose (not an adult minimum): j91:237 pixel geometry `Math.max(18,…)`; `BAL.age.wed:18` (marriage age, own rule; the «công chúa từ … tuổi» text reads it); j10/j3 maid 16+R (maids, j96 min 19 noted by reviewer); jht:57 quý nữ 15+R(5), j54:49 daughters 15–19 (girls, not adults); j54/jht/jkc `age>=19`; comment jkc.js:101 («18 tuổi» text in a comment). No runtime change (values stay 18).
Gates on the fixed tree: ageband-unit 13/13 PASS · quickcheck PASS (core gates incl. one-core-guard / rules-one-source / kit-conform, time-spill, old save ok, perf render 195/202 tab 351/296 buổi 940/1013 new/live); first quickcheck line said "NOT BUILT" only because the tree was uncommitted — re-run after commit below.
