PRIORITY #1 CHECK: reports/batch-s31a.md (BLOCKER co-op rebirth 61/63), reports/review-kit-ico-rank-r1.md, CLAIMS (row 774 = this job); review/kit-ico-rank-r1 a1c7a37c = base; OD:L94 co-op death → reincarnate at once into the same world. Reused jrank's own end-card hook; no new kit part.

# kit-ico-rank r2 — SẴN SÀNG KIỂM d0840f4e (review/kit-ico-rank-r2)
Branch: a1c7a37c + merge origin/main c29866a6 (d7f622c6; conflicts only assemble.py module list → main's list + score.js/jkrank/jrank after jnight, and generated files rebuilt) + fix d0840f4e.

## Root cause (reproduced: coop-e2e 62/64 on the merge before the fix)
jrank's over() hook appends the "Bảng vàng" section to the end card: kit rows + a **«Xem Bảng vàng»** button that sits BEFORE the card's own «Chuyển kiếp». In co-op the first tap took the board: rkOpen → #krkov overlay over the end card, and on a first open (rcSeen unset) the «Mã khôi phục» card as a modal on top. The test (and a hurried player) kept landing on the board, never on rebirth. Debug log: tap 0 «Xem Bảng vàng» → Q = [Mã khôi phục, Kiếp này/Chuyển kiếp], overlay up; taps 1–11 «✕»/«Xem Bảng vàng» again; S.dead stayed true.
Same family: rkSummary's life `mode` read the bare name `CW`, which in that scope is j25's face-name helper (`n=>"@W"+n`), so `CW.on` was always undefined → every co-op life went up as "solo".

## Fix (dev/build/jrank.js only)
- `rkCoop()` = `window.COOPW.on` (the co-op world's own flag). Co-op end card: the Bảng vàng score / place rows stay, the «Xem Bảng vàng» button is NOT drawn → «Chuyển kiếp» is the only button, rebirth flows as on live. The board stays reachable later from the title menu (☰ → Bảng vàng). Solo: unchanged (button kept).
- life `mode` = rkCoop() ? "coop" : "solo" (Worker already accepts "coop", board.js L71).
- rkEndPaint's re-paint regex keyed on an end marker `<!--krk-e-->` instead of `</button></div>` (would not match without the button).
- Scan of other places that open the board or a modal at death: only this end-card button (data-krk-open in end card) + rkCodeOpen (only from rkOpen). Nothing auto-opens at death. → 1 place, fixed.

| | before | after |
|---|---|---|
| co-op end card buttons | Xem Bảng vàng, Chuyển kiếp | Chuyển kiếp |
| solo end card buttons | Xem Bảng vàng, Chuyển kiếp | same |
| co-op life mode sent | solo (bug) | coop |

## Tests (d0840f4e)
- coop-e2e vs LIVE Worker: **63/63** and **63/63** (two runs).
- rank-e2e (fresh local stand-in): 755x1000@2 ALL OK, 1180x820@2 ALL OK — incl. NEW case: co-op end card has rows, no Xem Bảng vàng, nothing over it, mode "coop", «Chuyển kiếp» goes on to the next life.
- quickcheck HEAD vs live c29866a6: **PASS** · core gates PASS (one-core-guard, rules-one-source, kit-conform, co-op one world) · time-spill PASS · open 1417 ms · old save ok · perf new/live render 167/141, tab 263/260, buổi 837/818, tasks>200ms 11/10.
- oldsave-r1 (old = origin/main index.html): 16/16.

## LOOK (looked at all) — https://ctm-img.victoria-tntt.workers.dev/img/_review/kit-ico-rank-r2/
- Solo death, Fold: https://ctm-img.victoria-tntt.workers.dev/img/_review/kit-ico-rank-r2/solo-death-rankrow-755x1000.jpg (Bảng vàng rows + «Xem Bảng vàng» + «Chuyển kiếp») · iPad: https://ctm-img.victoria-tntt.workers.dev/img/_review/kit-ico-rank-r2/solo-death-1180x820.jpg, https://ctm-img.victoria-tntt.workers.dev/img/_review/kit-ico-rank-r2/solo-death-rankrow-1180x820.jpg
- Co-op death, Fold: https://ctm-img.victoria-tntt.workers.dev/img/_review/kit-ico-rank-r2/coop-death-rankrow-755x1000.jpg (rows, only «Chuyển kiếp») · iPad: https://ctm-img.victoria-tntt.workers.dev/img/_review/kit-ico-rank-r2/coop-death-rankrow-1180x820.jpg
- After «Chuyển kiếp» (co-op): https://ctm-img.victoria-tntt.workers.dev/img/_review/kit-ico-rank-r2/coop-after-chuyenkiep-1180x820.jpg (Luân hồi), https://ctm-img.victoria-tntt.workers.dev/img/_review/kit-ico-rank-r2/coop-after-chuyenkiep-755x1000.jpg; real co-op reborn guest (coop-e2e, iPad): https://ctm-img.victoria-tntt.workers.dev/img/_review/kit-ico-rank-r2/12-reborn-ipad.png (new person, Hảo hữu chip, same world).
- Wipe: python3 dev/site/cdn_sync.py --wipe-review kit-ico-rank-r2

## ctm-rank Worker
NOT deployed. This branch DOES touch rank/worker/** vs main (the whole rank/worker/ tree comes from r1: src + tests + wrangler.toml, 10 files); r2 itself changes nothing there. So the FF to main WILL trigger .github/workflows/rank-worker.yml (tests + wrangler deploy). Safe per r1 verdict (same API, same migration tag v1; only the unused `sample` field differs from the live script). Steps/rollback: reports/review-kit-ico-rank-r1.md.

## Notes
- Test lives from these runs sit on the LIVE coop/rank? No: rank-e2e + LOOK used the local stand-in; only coop-e2e touched the live ctm-coop Worker (as always). The live ctm-rank board gets lives only from coop-e2e's B death via the live game rank URL (same as earlier runs; r1 note on wiping test lives stands).
