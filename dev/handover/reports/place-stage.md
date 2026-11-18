# place-stage — report (worker; sonnet; MAIN s43)
PRIORITY #1 CHECK: OD 1813/1814/1818 | main: j59.js kitHereCount/j59ico, jrail.js kitStageRail, j93.js .kmnote, jk3.js kshR | review/*: ag-all-2-land, npc-chain-land, stage-caption searched, no stage-top news chip | claims: place-banner (superseded).

STATUS: SHOTS READY. Branch review/place-stage sha 9e35fc49 (r2) on live main e24d5838. r1 e40b8df3 is superseded.
Kept from place-banner: kitHereCount for every place (chip built from the ONE head count). NOT kept: .j59ln, J59EASE, #sc-t plaque, kmmAvoid change (not needed: the chip steps right of her marker itself).

## What changed (dev/build/jplst.js new, last in assemble.py)
1. `#sc-t` plaque hidden (`display:none`), still in DOM as data carrier (renderStage unchanged).
2. Count chip = first item of kitStageRail (jrail.js: new non-button item kind `chip`), order 0, V/L/M under it. No chip at 0 people. `window.j59ico` exported from j59.js.
3. Place name = `#kpname` top of right column, kit paper (jk3 `.ksh .k3p` rule extended with `.kpname`), 1.1rem bold; `#kshR` shifted down by `--kpnh`.
4. Entry line (S.visit.msg minus the count prefix; "Không gặp ai." dropped) = `.kmnote.kmslot > .kchip` at top of the stage, .74rem, max 2 lines, starts right of her marker if they meet. j93 kitFlipNote no longer removes `.kmslot`. KIT.md §place stage layout written.
5. Figures: no plaque cap any more, so they stand at the full kit size (live shrank some places up to ~8 % because the tall plaque capped them).
NOTE: owner's "top-frame yellow ! + popup chip" does not exist in code (told MAIN): `.khap` is map-only; `.kmnote` is the only popup chip, originally right under the top bar (jk3 moved it to the bottom). Used `.kmnote` in the top-of-stage slot.

## Entry-line kinds (where each shows now; all go to the chip, results/events keep their own cards)
| kind (source) | example | now |
|---|---|---|
| default visit (j2/j42/j95) "Ở đây có N người" | count only | count chip, no line |
| empty "Không gặp ai." | — | nothing |
| emperor away/busy/blocked (j2 thu/vuon/dtd) | "Hoàng thượng không ra vườn hôm nay", "Trẫm đang bận việc nước. Ngươi phải lui ra" | chip |
| palace empty (j2 r3-r5, j42) | "Phi X không có ở cung" / "đi vắng, đang ở …" | chip |
| gate/refusal (j21) | "cáo bệnh không tiếp ngươi", "Cung nữ gác cửa: …", "vừa rời đi … [Theo]" | chip (the follow button stays clickable inside) |
| Nội vụ / cold palace / laundry flavour (jact, j95, j14, j42) | "Thái giám Nội vụ phủ bày hàng…" | chip |
| talk/act results (j95b, jpetcare, jshelf: msg after an action) | "… nguôi đi phần nào" | chip (their log() lines unchanged) |
Real news still lives in its log/Q card (unchanged code); the chip is the same text, shown once.

## Scan (host mode, seeded Math.random, 18 places x 5 devices, live vs mine) — dev/test/place-stage-scan.js
r2 scan (18 places x 5 devices, dev/test/place-stage-scan.js): name-plate gap to frame bottom = 8 px in all 90 cells; head/marker min top = 8 (Fold) / 13 (others) px, never outside; 0 plaque, count chip + name everywhere, marker visible everywhere (one Fold r3 timing outlier re-run: 8/13). Per cell (r1 table kept): count chip(n) / name / entry line / ... all 90 cells: plaque none, count chip first in left rail (when people), name at top of right column with cards below it, line present, her marker visible, 0 page errors. Examples (Fold / iPad Air / iPad Pro / Pixel / iPhone14): vuon C4/N/L, tn C6, kn C10, r3 C5, r4 C2, r5 C2, lc C1, nvp C1 (all N/L, marker M in every cell). Figure max height: Fold live 485-523 → mine 523 everywhere (full size, no cap). Entry chip vs figure image boxes (img box includes transparent margin) touches in some cells; visually clear of heads on Fold/iPad (looked).
## Shots (LOOKED 3x: Fold full, iPad full, composite)
Live | mine, same character Kiều Thủy Tiên, Ngự hoa viên, 4 people (outfit differs: random pick):
- Fold 755x1000: https://ctm-img.victoria-tntt.workers.dev/img/_review/place-stage/sbs-fold-vuon.jpg
- iPad 1180x820: https://ctm-img.victoria-tntt.workers.dev/img/_review/place-stage/sbs-ipad-vuon.jpg
quickcheck: PASS 144 s (open 1352 ms, old save ok, render 172/189 ms new/live, tasks>200ms 13/13; core gates PASS).
Delete CDN folder after verdict: python3 dev/site/cdn_sync.py --wipe-review place-stage.
Open: "Phi ???" mask text (not this task). Place icon (kplic) no longer shown beside the name.
~95% xong (chờ kiểm) / chơi được sau khi kiểm
