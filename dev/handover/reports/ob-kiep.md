# ob-kiep — KIT REVIEW (Foreman B KIT reviewer, session_01N1tNP4EdLUs5oEMqzcHrMy)

PRIORITY #1 CHECK ('ob-kiep kit review'): OD k1 25/11 ~22:40Z | claims OB-KIEP session_01V1ZZH1x2dyjtZakgi3Dqjw | review/* ob-kiep 87bc89422dac555544c3035eafe5fa74cf1e97f1 (code cb91d5c4, base LIVE 5e013076) | main none. The worker's own report is on the branch (dev/handover/reports/ob-kiep.md there); this review is kept here so the branch sha stays as reviewed.

## KIT REVIEW — verdict: KIT OK review/ob-kiep 87bc89422dac555544c3035eafe5fa74cf1e97f1 (Q10 figure size pending owner)

Laws checked: 3, 7, 9, 10, 11, 12, 14. No private CSS/chip/frame: one row writer (kaRowH) + the same rule called from kitRows (j79) and kitOptFinal (jopic); CSS in the kit block of j63; no inline style added in jkc/jkc2 data; no «%» added.

Tests (all run by me, alone where required)
- quickcheck on 87bc8942: all core gates PASS except G4 90-button-crawl («Ô lưu · Lui», pre-existing, same on LIVE); time-spill PASS; old save ok; perf new/live render 227/238, tab 521/468, buổi 1516/4457, tasks>200ms 27/27.
- kit-gain-list-scan: 792 option lines · 1355 rows · WALL 133 → LIST 133 (7 as 2–3 columns) · WALL not LIST 0 · MISLABEL 0.
- kit-ef-unit Fold + iPad PASS · kit-e-rows PASS · kit-cost-rows-home PASS 15.
- emoseal-nonplay-scan: iPad 1180x820 and Fold 755x1000 — title / roulette / identity / identity+picker 0 leans, PLAY control nonPlay=false.
- coop-e2e (COOP_SWAP unset): 143/143.
- Shots (own, Fold 755x1000 + iPad 1180x820, 3 looks each, identity card): gain items one per line with small dot, Mất in red, no wall; no seal popping; «Nhận / Đổi thân phận» boxes whole on Fold.

CONSISTENCY SCAN (my script, real functions, both devices, 6 long items per row)
| producer | label | class | look |
|---|---|---|---|
| kaRowH (option / act card) | Được, Kèm | klist | 6 lines, dot |
| kitRows (info table) | Được / Mất / Tốn / Kèm / Thành | klist | 6 lines, dot |
| kitOptFinal copies | Tốn/Được/Mất | kaListFix → klist | same |
| kitResultCard / karesult toast | Được, Mất | none (.kitem block) | 6 lines, no dot |
| kitKemRow in the result card | Kèm | none (.kitem block) | 6 lines, no dot |
| kitRows with kitChip values | Được, Mất | none (chip flow) | chips, own border |
No private variant: every row is the kit's own writer; both list looks are one item per line. 

NOTES (not FAIL)
1. Result card (§7) lists one item per line but without the dot of §6.6 — a different kit part with the same one-per-line rule. Suggest KK33 adds the dot (or says in KIT §7 that it has none) in a later pass.
2. Chip rows (kitRows with kitChip, e.g. «Kết quả» j79:702) keep the chip flow; a very long chip run is not turned into a list. Rare, small.
3. Fold frame width: measured ≈ 477 px of 755 = 63 % of the screen, = KPID_PANEL 66 % of the USABLE width (KIT 56.11 wording). Brief's «≥ 66 % width» read as usable width; if MAIN means the full screen width it is 3 points short.
4. Q10 figure size: Fold figure ≈ 430 (KIT 56.11 book size 641) pending owner. KIT 56.11 still opens with «Same figure size as the book on both devices (Fold 641)» next to the new FOLD FRAME WIDTH sentence — the two lines disagree until Q10 is answered (law 14: reconcile in place then).
5. Worker's CSS uses !important + :is(#id…) specificity lifts (kit-local, same pattern as .kef1); acceptable, but it is the kind of override that hides future per-card rules.
