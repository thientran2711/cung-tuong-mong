PRIORITY #1 CHECK: OD 03:31Z Hoàng hậu wrong dress (OD tail) | main j66.js:24–28 figTierOf/figDist | review/*: review/fig-rank-match-r2 (supersedes review/fig-rank-match 58dca709) | claims: fig-rank-match session_01UV1SzjZ3ki1nnfEWtJvRjW. Reviewer; build nothing new.

# review fig-rank-match-r2 — verdict PASS 2558a2f1 (reviewed 2d0f41c5; base main 7abaf07a; my branch review/fig-rank-match-r2-r1 = 2d0f41c5 + 1 audit fix, ancestor = origin/main)
MANIFESTS SAFE-FIRST: FIGURES.json YES, FIGURES-servants.json YES (live code, origin/main 7abaf07a).
START_CTX ≈ 6% (estimate); finished far below the rollover point.

## 1. Manifest regeneration
- Snapshot of live CDN (FIGURES*.json + _index.json), `manifest_rebuild.py --live` → FIGURES 656 → 1296 (+640), FIGURES-servants 240 → 2112 (+1872): same counts as the worker. New file = live list unchanged as a PREFIX + appended entries; 0 duplicates; every new entry has por.
- Per (role,tier): consort t1..t8 + cold = 128 each (32 ids × 4 ages), maid plain/t1..t8/cold = 208 each (52 × 4). Complete.
- 30 random new entries (15+15): file HEAD 200 30/30, por HEAD 200 30/30.
- LOOKED at 8 + a tier strip: c08/c04/c19 t8 = phoenix crown + empress robes; c28/c17 t7 = lesser crown, pink/green court robe; c01 t4 = flower hair only; maid m24 t7 / m04 t8 = crown + tiered robe in the maid's own palette/face; c04 t1→t4→t8→cold and m24 plain→t1→t7→cold = same face and palette, only the dress changes, cold = plain beige. Tier and identity are right.
- Size: 365 KB + 397 KB (21 KB gzipped each).

## 2. fig-rank-audit.js with rebuilt manifests
- FOUND a defect in the audit (fixed in r1): it waited only for FIGS.length>0, a race made the first run audit 0 cells and print PASS (vacuous). Now waits for both identity pools and exits 2 on 0 cells.
- Result (FIGDIR=rebuilt, picker of 2d0f41c5): npc exact 3024 + her exact 2688 = 5712 cells (84 ids × cold,t1..t8 × 4 ages), 0 above, 0 none, 0 LOWER, 0 MAIDART, 0 OTHERFACE, 0 missing tiers, 0 page errors. (Worker said 5676; mine counts her/NPC cells slightly differently; same conclusion.)

## 3. KEY QUESTION — rebuilt manifests uploaded BEFORE the code ships (live origin/main + rebuilt manifests, local serve)
Method: same page, live code, once with live manifests and once with rebuilt, 13 200 picks each: kcPor (family, fig+por), figBest(L,0)/(L,null) (jht qn faces, generic callers), figFor/faceImg for her (consort ranks 0/3/7 AND servant ranks), NPC rival, NPC maid, figRec (jstaff elders), fpPor, for all 84 identities × 4 ages. Diff live→rebuilt:
- kcPor, figBest(0), figBest(null), figRec, figForSrv/facePoolSrv (maid dress), NPC maid: 0 changes (a maid/family pick keeps the plain art; consort tier-0 keeps t1). 
- Her figure / facePool / NPC rival / fpPor as consort: 100% change to the EXACT rank tier (that is the fix itself: Hoàng hậu t8 appears with the old picker too, because the art is now listed).
- WRONG picks: 0 (24 "wrong" cells seen are all NPC=c27 = her reserved identity in my harness; the game never gives it to an NPC → harness artifact, same skip as in the audit).
- Older pickers j28/j35 are only fallbacks beneath j88 figFor; not reached.
- FIGURES.json safe-first: YES. FIGURES-servants.json safe-first: YES.
- CAVEAT (not a blocker): kcPor/figBest(null) on maid ids are safe only because of tie-break order (live entries come first, strict `<`). The upload must KEEP the live prefix order (rebuild does; do not re-sort). The r2 code (kcPor filter) removes that dependency.
- Perf with 3 984 more entries: quickcheck below (render 232/251 ms new/live).

## 4. Guard
- manifest_guard.py: rebuilt (both) PASS; live copy as-is FAIL vs floor; manifest minus 5 tail entries FAIL (count/floor); one live entry removed mid-list FAIL ("missing in the new one"). `--live-check` on today's CDN: exit 1 (expected until the upload; then PASS).
- cdn_sync.py --dry-run (read-only): rebuilt pair → "to upload 2", accepted; shrunk FIGURES.json → "SHRINK … REFUSED", exit 1. Nothing uploaded.

## 5. quickcheck / save / shots
- `bash dev/tools/quickcheck.sh HEAD` (kit from review/go-live-kit): PASS 130 s, open 926 ms, old save loads + plays a buổi (Tống Yên Nhiên, 0 errors), perf new/live render 232/251, tab 299/285, buổi 855/814, long tasks 11/11.
- Shots (scratch only, never committed), r2 code + rebuilt manifests + real CDN images, her identity c04 at 36: Fold 755x1000@2 and iPad 1180x820@2, "Nhập cung" modal (the real figure panel): rank 7 = Hoàng hậu → fig-consort-c04-t8-a36, phoenix crown + embroidered empress robes (Fold); rank 5 = Quý phi → t6, smaller gold crown, lighter robe (iPad). Looked at both: right. The tab header portrait of Hoàng hậu also shows the crown. Not captured: the "Hội phối đồ: báo đề" VIỆC panel (same figFor/por path, covered by audit); one first-run iPad cell once showed c04-t1 for rank 7 in an early version of my script (stale mefig during harness setup); not reproducible in 11 later runs (all t8/t6) — flagging it honestly.

## Not done / for s29
- Wire `python3 dev/site/manifest_guard.py --live-check` into quickcheck.sh on review/go-live-kit (other branch).
- Upload order per worker report is correct; after upload run `--live-check` (PASS) and `fig-rank-audit.js` against the CDN.
- Fix in my branch: dev/test/fig-rank-audit.js only (race + 0-cell fail).
