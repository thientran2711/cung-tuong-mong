PRIORITY #1 CHECK: worker's line 1 of dev/handover/reports/kit-ico-rank.md | claims: kit-ico-rank session_01UV1Szgrzg6rs6qWkr3xzsH (main s28) | review/*: review/kit-ico-rank (+ merged rank-port-r2 d8636053). Reviewer; build nothing new. Own grep: `kitRank` / `§86` on origin/main = none; origin/review/scenes-3 registers §86 = kitLearn (clash, resolved below); ctm-rank Worker already live on Cloudflare (scripts list, modified 2026-11-15, migration v1).

# Review kit-ico-rank r1 — review/kit-ico-rank @ 0ef325f6 (base main 7abaf07a)

VERDICT: PASS a1c7a37c (review/kit-ico-rank-r1; ancestor = origin/main 4719d424). The one FAIL item of the first verdict (G1 ONE CORE) is fixed by main's ruling s29 (below).
Branch: review/kit-ico-rank-r1 @ a1c7a37c = 2ca9e318 + G1 fix 7d91bd57 + merge of origin/main 4719d424 (only generated files conflicted, rebuilt). 2ca9e318 = 0ef325f6 + 3 reviewer commits + trial merge of origin/main 64c39ca2 (main moved 138 commits during the review; conflicts: assemble.py module list → main's list + score.js/jkrank/jrank after jnight; KIT.md / KIT_NUMBERS.md → scenes-3 §86 kitLearn (now ON main) kept, kitRank §87 after it; generated files rebuilt). Ancestor = current origin/main 64c39ca2.
START_CTX ~12 % (est.); finished under the ceiling, no handover needed.

## Kit number clash (asked by the coordinator)
review/scenes-3 also registers its new part as KIT §86 (kitLearn). kitRank is renumbered on THIS branch to **§87** (next free): KIT.md heading `## 87. kitRankList …` + its "Sample: kit page §87", kit page sample id `§87` (jkrank.js), code comments (jkrank.js header, jrank.js), KIT_NUMBERS.md line ("§87 … renumbered by review kit-ico-rank-r1 …; Next free: §88"). scenes-3 keeps §86. When both merge, KIT_NUMBERS.md will have two lines (§86 kitLearn from scenes-3, §87 kitRank from here) — keep both; next free §88.

## Fixes made by the reviewer (review/kit-ico-rank-r1)
1. 847215e9 — §86 → §87 (above). End card "Kiếp này" (j32): the rank-port-r2 merge had dropped main's `art:endArt(h,t,fate,live)` (painted funeral / spring picture of the ending); restored, r2's kit rows kept.
2. 86e227a5 — KIT §84 live frame bug (jksize.js, kit part, whole group): when `showModal` re-shows the SAME Q item (jrank's end-card hook does this after adding its Bảng vàng line; any re-show of the same item does it), `#mb` is rebuilt but `dlg.__ksz3` stayed set, so `kitFrameLive3` refused and the dialog fell back to the old kesdlg banner layout (narrow 380 px card, small figure; seen in 3 of 3 runs at 755x1000 before the fix). Fix: after the inner showModal, a frame whose body is no longer connected is reset (`kszLiveReset3`) and laid again. After: 6/6 runs = the v3 frame, same as main's end card (figure column + picture + kit rows). KIT.md §84 PHASE 2 line updated.
3. 3051578a — Bảng vàng showed NO life pictures: podium = grey unknown silhouettes, list rows = rank-frame placeholders. Root cause: assemble.py rewrites every quoted "img/…" literal to IMG_BASE+"img/…", so jrank's `cut` (`s.indexOf("img/")`) became a no-op, the summary sent full CDN URLs, and the server's `fig()`/`por()` whitelist (`^img/…\.webp$`) dropped them. Fix: `cut` by regex (no quoted img/), shown pictures go through `IMG_U` (`rkImg`) so they load from the CDN. rank-e2e now asserts the podium figures are the lives' own figures (not unknown-fig) and every list row shows its face. NOTE: lives already on the live board (sent by earlier test runs) have empty fig/por and keep silhouettes; only new lives carry pictures.

## Checks
- Kit only: jrank builds rows / header / list frame / own-life footer ONLY through kitRankRow / kitRankHead / kitRankList / kitRankFoot; no `@media` in jrank / jkrank (media-check.js passes in build_site); row CSS lives only in jkrank (`krl-*`). Remaining jrank CSS (`#kitrank`): the board screen shell only (overlay, paddings around kit parts, podium stage height, title-menu pair rule `.kpmenu.krk-m` = same 2 columns as the kit `.kpmenu`). Not a row/chip/card; accepted. Follow-up for the kit keeper (non-blocking): move that shell into jkrank as a kit screen part if another board screen appears.
- Icons: rail ico-cal / ico-goal and status ico-download / ico-update from kit files; placeholder sets by orientation/size (kitPhPick) — ico-ph.js PASS.
- Consistency scan: other ranked lists in the game: kitPodium's own "Ngươi đứng thứ N" line (j90, part of KIT 26), Hội phối đồ result line (jts, text), Kế vị order (jht, person cards = different kind). No other "place · face · name · score" list → nothing else must move to §87. Rail icons all painted (4 glyph places → 0, worker's table confirmed by test).
- VANPHONG: board / end-card / recovery / rename texts cổ trang, no %, no "…" (rank-e2e checks no %, no "…", no Han characters).
- Old save: rank-e2e loads a save made by the live main build (served locally) → loads, gets a guest id. PASS at all 4 sizes.
- Worker unit tests: score.test.mjs ALL OK, board.test.mjs ALL OK.

## Tests (after the fixes, build of 3051578a's sources)
- dev/test/ico-ph.js: PASS at 755x1000@2, 1180x820@2, 1366x1024@2, 390x844@2 (no page errors, no h-overflow, every placeholder = kitPhPick of its slot).
- dev/test/rank-e2e.js (fresh local Worker stand-in per size, old save = origin/main index.html): 755x1000@2 ALL OK (52), 1180x820@2 ALL OK (52), 1366x1024@2 ALL OK (52), 390x844@2 ALL OK (52).
- dev/tools/quickcheck.sh HEAD (on 3051578a and again on the merge 2ca9e318): open OK, old save from live main loads and plays a buổi, perf new/live median render 214/236 ms, tab 332/353, buổi 1027/1087; time-spill guard PASS; G2 rules-one-source PASS; G3 kit-conform 755x1000 CONFORMS 102 / MISSING 3, no floats (PASS); G4 co-op one world PASS. **G1 one-core-guard FAIL** (below).
- On the merge 2ca9e318: rank-e2e 755x1000@2 + 1180x820@2 ALL OK (52 each), ico-ph 755x1000@2 + 1180x820@2 PASS, end card = v3 frame 2/2 runs.

## G1 ONE CORE — fixed (main ruling s29, OD:L1267)
First verdict FAIL item 1 (4 new inline rule numbers). Done on 7d91bd57 as ruled:
- `rank/worker/src/score.js` RULES = THE one rank rulebook (client + Worker). In the game `BAL.rank = CTM_RANK.RULES` (same object, set at the end of score.js when BAL exists; the Worker has no BAL and reads RULES directly).
- The "Cách tính" example life moved from jrank's RK_SAMPLE into `RULES.sample` (not used by `score()`/`check()`); jrank reads `BAL.rank` (rkRole, rkRulesSpec, `BAL.rank.sample`); no rank number typed anywhere else.
- `node dev/test/one-core-guard.js --update --allow-grow`: keys added = exactly `../../rank/worker/src/score.js fx danh:3, duc:3, danh:40, duc:30`; the other changed counts in the list only SHRANK (main had already moved those numbers into BAL); total 6691 → 6675 (≤ live main's 6691).
- Checked: `BAL.rank===CTM_RANK.RULES` true in the game; with no own life "Cách tính" shows "Ví dụ một kiếp: Phi Tô Uyển Như"; Worker tests score + board ALL OK.
- Final run on a1c7a37c: rank-e2e 755x1000@2 / 1180x820@2 / 1366x1024@2 / 390x844@2 ALL OK (52 each); ico-ph 755 + 1180 PASS; quickcheck PASS · core gates PASS (G1–G4) · old save ok · perf new/live render 237/258 ms, tab 304/288, buổi 859/1083.
- Worker note: score.js now differs from the live script by the unused `sample` field and the `BAL.rank` line (no-op in the Worker), so the deploy below is no longer byte-identical but still safe and backward compatible (same API, same scores, RULES.ver unchanged → no re-score).

## ctm-rank Worker (main deploys; NOT deployed by me)
Facts (first verdict; see the Worker note under G1 for the one later change): it is NOT D1 (the worker report says D1 / `wrangler d1 create` — wrong). It is one Durable Object `Board` with SQLite storage (wrangler.toml `new_sqlite_classes=["Board"]`, migration tag v1). The Worker ctm-rank is ALREADY LIVE (Cloudflare scripts list: ctm-rank modified 2026-11-15T05:24Z, migration_tag v1; https://ctm-rank.victoria-tntt.workers.dev/top/lives answers with rows). Its deployed source (source map of the live script) is byte-identical to this branch's rank/worker/src/index.js, board.js, score.js.
Safe / backward compatible: YES. A deploy of this branch changes nothing on the server (same code, same migration tag → no storage migration). Old clients (live main) never call ctm-rank (no jrank on main), so nothing can break for them. New clients talk to the API that is already there.
Deploy steps (only needed if main wants the repo and the live script tied together; otherwise skip):
1. Merge to main → .github/workflows/rank-worker.yml runs on push to main when rank/worker/** changed: score + board tests, then `npx wrangler@4 deploy` with secrets CLOUDFLARE_API_TOKEN / CLOUDFLARE_ACCOUNT_ID (the same two secrets coop-worker.yml and img-worker.yml already use). Or by hand: `cd rank/worker && node test/score.test.mjs && node test/board.test.mjs && npx wrangler@4 deploy`.
2. Check: `curl -s https://ctm-rank.victoria-tntt.workers.dev/health` and `/top/lives?n=1` answer `ok:true`; row count unchanged.
Rollback: `cd rank/worker && npx wrangler@4 deployments list` then `npx wrangler@4 rollback <previous-version-id>` (or Cloudflare dashboard → Workers → ctm-rank → Deployments → Rollback). Code-only rollback; the Durable Object data is untouched either way. Client side: reverting the game build is enough; the board keeps its rows.
Data note for main: the live board already holds test lives from earlier e2e runs against the real Worker (e.g. "Khách vô danh #8421"); main may want them wiped before the owner sees the board (no wipe endpoint exists; would need a one-off DO SQL delete).

## Open for the coordinator (non-blocking)
(a) r2's podium name-plaque restyle not ported (worker's note) — separate kit job if wanted. (b) first-hour.txt still lists mo-calendar as core (worker's note). (c) test lives on the live board (above).
