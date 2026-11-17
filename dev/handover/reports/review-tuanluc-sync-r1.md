PRIORITY #1 CHECK ('tuanluc-sync|Tuần lục|TA TUẦN QUA|Ngươi tuần qua'): OD L1458(3) (Tuần lục = literary line only, Được/Mất numbers in Sổ ghi) | main j87.js:469 Tổng lược chips (d.D) | review/* tuanluc-sync c70fb3973 (only one) | claims CLAIMS L738 (worker #3 READY) + L777 (this review).

# REVIEW tuanluc-sync r1 — PASS 4156a49d0 (branch review/tuanluc-sync-r1, ancestor = origin/main 25bfd7cf)

Reviewer opus, MAIN s32. Reviewed review/tuanluc-sync c70fb3973 (worker report reports/tuanluc-sync.md, #1–#3).

## Merge
- origin/main merged twice (d0a839e8, then 25bfd7cf). Only conflicts: generated index.html/sw.js (rebuilt) and assemble.py module list → main's list (jreg, jtone*, jnroad*, jil, jkc2, jentry, joi, jkh, jnpcd, jrbatch, jmkt) + jlogbao.js kept LAST (outermost log wrapper, worker #3 rule). jnpcd only wraps log() inside one call and restores it — no clash.

## Required fix (main ruling OD L1458(3)) + whole family — done on r1
1. j87 Tổng lược: "Ngươi tuần qua" number chips (Sủng/Danh/Sức/Bạc/Đức/Tai mắt/Ân tình ±N) removed; heading kept only when her rank / children lines exist. Person relation table (KIT §52) unchanged.
2. Family scan found the worker's litNo (label list) missed most number shapes in Tuần lục lines. New `kbkNoNum` (j87, one place, used by litNo for every fact of every page + the Bổng lộc row): kitRelDelta chip → text, "Vì sao: … → oán +N" note dropped, bracket with a number dropped, then every clause (split at , ; : · — = and sentence ends, outside brackets) holding a signed number or a→b pair dropped; tags kept so markup stays balanced. Stray "· " after ":" tidied.
3. New scan `dev/test/tuanluc-nochips.js [lives] [weeks]`: builds the real book (wkBookPages) at every week end, walks every page except the relation table.

| scan (tuanluc-nochips) | number chips | signed numbers in lines |
|---|---|---|
| before (c70fb3973 + main) 2 lives × 6 wk, 177 pages | 60 | 42 |
| after (r1) 4 × 10 wk, 602 pages | 0 | 0 |
| after final 4156a49d0, 2 × 8 wk, 257 pages | 0 | 0 |

Sample before → after: "Kho lúa -8, nhà Tể tướng thế lực -6." → (clause gone, sentence before kept); "Nàng sợ vì bị sai việc nguy hiểm: lòng -5." → "Nàng sợ vì bị sai việc nguy hiểm."; "lòng ngươi lắng lại (tâm trạng −6), kẻ ganh…" → bracket gone; Bổng lộc "+48 bạc · 1 súc Vải thô (hàng kém) · … = +41 bạc (…)" → "1 súc Vải thô (hàng kém) · …" (empty → "Bổng lộc tháng này"); "Sủng của ngươi 15 → 12." and "Vì sao: …" lines → dropped (numbers only).

## Checks (on 4156a49d0)
- `node dev/test/tuanluc-sync.js 2 10` → one-time repeats 0 · clumsy masked 0 · tip repeats 0 · BÁO max/buổi 1 · relation changes 297 (no cause line 0) · cards 669 (missing from Sổ ghi 0) · filler 0 · errors 0. (main 25bfd7cf baseline: one-time repeats 41, filler 228, cards missing 606 → the branch fixes them.)
- `bash dev/tools/quickcheck.sh` → QUICKCHECK PASS · old save ok · core gates PASS · perf new/live render 127/161, tab 257/270, buổi 694/792 ms.
- `node dev/test/coop-e2e.js` → 63/63 (two-way/co-op room, rejoin, rebirth, solo old save; no page errors, no overflow).
- `node dev/test/tuanluc-shots2.js` → PASS (2nd run; it is random, as the worker said). LOOKED at Fold 755x1000@2 + iPad 1180x820@2: Tổng lược has no number chips (Ngày/Tiết, Quẻ tuần, Bổng lộc, Sổ này ghi list); facts literary; person page (Hoàng thượng) keeps the relation table (Sủng 29, +1) with plain lines. Kit: no new part, no private CSS (only j87 text logic changed).
- Shots kept in reviewer scratch only; worker's img/_review/tuanluc-sync/ (12 files) wiped with this verdict.

## Notes for main (not blocking)
- `tuanluc-sync.js` prints "week-book residue" (relation-table change on a person page that no line on that page explains) — 82 in 2 lives here, 208/3 lives on c70fb3973; the worker's report quoted the verdict line without it. Not shown to the player (no filler line by design); the moment-level check (no cause line 0) passes. Candidate follow-up if the owner sees a table change with no sentence on that page.
- In the Fold shot one Sổ này ghi portrait (Cung nữ thân tín Hương Lan) showed the empty-picture icon; test blocks non-CDN hosts — check with kit-fig owner if it repeats live.
- "Phụ tuyến … Lời nhờ (1 bước)" lines still carry the "(1/3)" step count — a progress count, not a Được/Mất number; left as is.
