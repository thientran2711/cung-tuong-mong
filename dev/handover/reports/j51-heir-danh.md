# j51-heir-danh report (worker session_01964izEZxwCL3dekrzAxh79, Foreman D GQbgvTAn, brief briefs/D-j51-heir-danh.md)

PRIORITY #1 CHECK ('heirDanh|Danh \+10'): brief line re-checked — OD 0 | main: j51.js:75 typed, j3.js:81 + j51.js:66 print balSg(BAL.kid.heirDanh), jkidlife.js:79–80 applies it (setHeir wrap), jcoopworld.js:1297–1302 co-op road | review/* 0 | reused: dev/test/scan-heir-family.py (every Thái tử site, 28) as the family list.

Branch review/j51-heir-danh on LIVE f7016b8d. SMALL: 5 game files, text only (no rule / number change).

## Root
BAL.kid.heirDanh (jbal2.js:1906, 10) is applied by ONE rule: the jkidlife setHeir wrap (jkidlife.js:79–80, the mother of a new Thái tử +heirDanh, the put-aside mother −heirDanh). The texts beside the setHeir calls live in other modules, so dev/test/one-core-text.js (typed amount beside a BAL read in the SAME expression) could not see them: j51:75 typed «Danh +10». Same family = a text near a rule that moved into a wrap / another key.

## Family scan (LAW 11) — dev/test/scan-heir-family.py sites with player text
| site | before | after |
|---|---|---|
| j51.js:75 heirMonth (her son named) | «Danh +10» typed | `Danh ${balSg(BAL.kid.heirDanh)}` (as j3:81 / j51:66) |
| j51.js:66 kvDebate phế/lập | balSg(±BAL.kid.heirDanh) | unchanged (already BAL) |
| j3.js:81 heirMonth (old path) | balSg(BAL.kid.heirDanh) | unchanged |
| j4.js:108 «Theo cha mưu đại sự» card | «Danh +danhGo» only; go also runs setHeir(son) → +heirDanh hidden (card said +5, rule gave +15) | `balSg(danhGo + heirDanh when her son becomes the new heir)` (0 when her own son already holds it) |
| j79.js:1233 kframe outcome words | «thương −35, Danh nàng −10» typed (= BAL.eff.j8.fondF / kframeDanh, j8:151) | `balSg(-BAL.eff.j8.fondF)`, `balSg(BAL.eff.j8.kframeDanh)` |
| j97.js:236 mật chiếu | «được lập làm Thái tử.» (her +heirDanh not shown) | + «Danh ±N» = the Danh the wrap really applied (none when 0) |
| jend14.js:41 ch14 win | same as j97 | same fix |
| j8.js:151 kframe act, j99succ, j1 kidDie, jcoopworld roads | no number in text / no Danh in solo | unchanged |

## Wider scan (dev/test/scan-typed-stat-text.py: a stat word + typed ±N inside a string, all j*.js)
353 hits before → 352 after (only j51:75 is a typed copy of a rule that reads BAL elsewhere and was in scope). The rest (largest: j85 94, j8 25, j23 18, jpet 13, jmen 12, j71 12, jlogsync 11, j78 11, jkitpage 10, jinv 10, j92 10) are mostly: item / art-level description data whose own code applies the same typed number (both sides typed, consistent, not in BAL: e.g. j54 «Mẫu tử −10» with `k.hM-10`), log-parser examples (jlogsync, jaudit comments/regex), and kit sample pages. FOR D: «typed effect numbers on both card and apply, not in BAL» is a large law-4 family (one-core-guard's inline baseline 3561 tracks it); not SMALL.
Also seen, FOR D (rule, not text): j8.js:151 kframe deposes a Thái tử with `k.heir=false;S.heir=null` (no setHeir), so the deposed mother loses no heirDanh there, unlike j51:66 / jkidlife (law 1/4 consistency); and it clears S.heir even when the son is an NPC's.

## Proof
dev/test/j51-heir-danh.js (fresh game): j51 heirMonth with BAL.kid.heirDanh 10 and 7 → text «… Danh +10.» / «… Danh +7.» and S.danh moves 10 / 7; j79 kframe words with kframeDanh −10 / −7 → «Danh nàng −10» / «−7», fond «−35» = −fondF; setHeir delta new heir +heirDanh, swap between her own sons 0; no page errors. PROBE PASS.
Gates: assemble + build_site (index.html/sw.js/assets.json in the commit) · one-core-guard PASS · one-core-text PASS · one-core-text-rule PASS · scan-heir-family 28 sites, 0 without a co-op road · quickcheck PASS (old save ok; perf new/live render 224/197, tab 463/443, buổi 1474/1480 ms; core gates PASS) · succession.js (served locally): its only reds are 6× «card-a/b/c no header picture» at both sizes = the CDN header art not reachable from a local server; LIVE f7016b8d served the same way shows the same 6 (+1 «end-a …»), so no regression. Wording VANPHONG (no %, signs as the other heir lines). No UI layout change → no Fold/iPad shots.

SẴN SÀNG KIỂM review/j51-heir-danh 9e6fea349124957e81d6ed1973d8b3e7c126c5fe
