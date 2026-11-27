# BIG REVIEW — review/live-bugs-2711 @ fc6d0ad3 — VERDICT: FAIL (2 items)

Reviewer session_01D3E3NZnacUNbYyN5n4DLco for FOREMAN D session_01D3E3NXaPqTqoCnowMTPdTq; worker D-LIVEBUGS3 session_01D3E3NaQmER5L5YvwZtcRwY. START_CTX ~5 %.

PRIORITY #1 CHECK: OD MAIN 170 ORDER 03:35Z items 2–4 + F ROOT #2 03:06Z/03:12Z; OD:L2301/L2304 (ban hoa) | main: dev/test/undef-scan.js (reused), jgpick.js KIT 28.13i | review/picker-dom 705d50e0 (touches jgpick.js + 19 other build files; NO source overlap with this branch: jgift/jkc/jkc2/jptime/jts untouched there) | claims D-LIVEBUGS3.
KIT CHECK: reuses `p.past` text line (KIT §36 «first short p.past → sub line»), KIT 28.13i item pick grid (jgpick, unchanged), kit «Thôi» = ✕. kit-std-scan not run (FAIL decided on the gift family first; re-run on the fix round).

Base: fc6d0ad3 forks from 0b43ee55 (in LIVE). LIVE now 4cd3f974 (+066d9af0 parity-facfix, kptitle-close): sources disjoint, only index.html/sw.js would need a rebuild at landing. No -rv merge pushed (FAIL).

## Gates on fc6d0ad3 (rebuilt here: build identical to the commit except the build-line stamp)
| gate | result |
|---|---|
| undef-scan | PASS (330 names; only known PIXI/PCOL/mkPart) — LIVE FAIL 5 → 0 confirmed |
| gift-dead-scan y14-ncBtuc-010 (worker fixture) | PASS 0 dead |
| gift-dead-scan **y05-ncBtuc-035** (handover fixture, a servant CAN be sent) | **FAIL: «Tặng quà» 467 tiles / 389 can pick / 78 DEAD** (LIVE: same 78) |
| gift-pick-scan | ok (giftpick/plantpick/giftto all ik → 28.13i grid) |
| d19-gift | 3 runs: 2 fails each run = identical to LIVE 4cd3f974 (item road «bớt oán 5» but oán 0, pre-existing); 1st run had 2 extra flakes (fold work road inv 0, fold overflow) not repeated |
| scenes3 | exit 0 |
| coop-e2e / quickcheck / old save / «Ô lưu · Lui» parity | NOT run this round (FAIL already decided) — run on the fix round |
| own Fold/iPad shots | not obtained (asset-preload «Sửa soạn nhập cung» screen covered the dialog in my harness); worker's CDN shots exist — fix round must include shots of the new text line + the y05 Tặng quà case |

y05 before/after (LIVE 4cd3f974 → fc6d0ad3), tiles / can / dead:
| picker | LIVE | branch |
|---|---|---|
| Tặng quà (giftpick) | 467/389/78 | 467/389/**78** |
| Dâng quà Hoàng thượng | 467/467/0 | 467/467/0 |
| Dâng quà Thái hậu | 467/389/78 | 389/389/0 |
| Cài đồ (plantpick) | 467/467/0 | 467/467/0 |
| Biếu quà · đồ | 389/41/348 | 41/41/0 |
| Biếu quà · tác phẩm | 78/0/78 | 0/0/0 |
| Biếu quà · cả hai | 467/41/426 | 41/41/0 |

## (b) «sx is not defined» — OK
All 8 lambdas (jkc tudg/tranhmoi/gianhan×2, jkc2 d_thue/n_muoi/n_benh/n_le) now read `kcR(role)` at call time — the same member the option's go reads, so the odds word shown = the odds rolled (law 7, law 4). Before, these lambdas threw (no outer binding), so there is no earlier working odds to differ from; BAL keys unchanged.

## (c) s16b «Ban hoa at b1» — OK
Rule lines checked: OD:L2301 (ban hoa ends the life, no outside road) and OD:L2304 (her result = her own play). Board 2/10 moves raw 0 → Quay lại = harness board-quit family; ruled outcome, not an odds fault. Agree with «s16b = INVALID» per FOREMAN E 26/11 13:23Z.

## FAIL items (worker)
1. **Family not closed (law 11, law 6c/3): «Tặng quà» still lists dead tiles whenever a servant CAN be sent.** jgpick.js:89 (`PEND.giftpick` wrapper, outermost) sets `o.lock=true` for every item `giftEval(e,v)` says she will not take; jptime's new filter only runs in the no-servant branch. Proof: your own gift-dead-scan on y05-ncBtuc-035 → 78 dead (= the 78 tác phẩm/pieces giftEval refuses; the same 78 you removed from Dâng quà Thái hậu). jgpick.js is picker-dom's file — do NOT edit it; drop the !ok tiles in a wrapper that runs after it (or ask Foreman D to route the one-line change into picker-dom), with the same `giftRestNote(n, why)` line as giftto. Add y05 to the gift-dead-scan gate (≥2 saves: one with no servant, one with a sendable servant).
2. **KIT canon not updated (law 14 canon overwrite, OD:L1096(4), law 9):** KIT.md §28.13i still says «A tile she cannot choose (option lock …) is greyed (.kshno) but still selectable to read why». The branch replaces that with «only pickable tiles + one `p.past` line "Còn N món khác trong rương … (why)"». Rewrite that §28.13i line IN PLACE (one rule, not two) incl. the reason-line wording and the «no tile left → text line + ✕ only» case; link gift-dead-scan as the scan. (If Foreman D judges this a kit-rule change needing the kit keeper, route it there — but the code and KIT.md must say the same thing before landing.)

Nit: jptime.js giftpick/plantpick no-servant branch computes `const n=` and never uses it (either drop it or show the count like giftRestNote).

Not changed and correct per law 16: maid-as-carrier question stays open to D/MAIN.

## Fix-round gates
gift-dead-scan y14 + y05 = 0 dead · undef-scan · d19-gift (2 pre-existing only) · gift-pick-scan · scenes3 · coop-e2e 143/143 alone · quickcheck + old save («Ô lưu · Lui» identical to LIVE) · kit-std-scan counts · Fold 755x1000 + iPad 1180x820 shots of tsgiftpick it/wk, giftto th, giftpick (servant + no servant). Then FF/merge from LIVE (4cd3f974 or newer).
