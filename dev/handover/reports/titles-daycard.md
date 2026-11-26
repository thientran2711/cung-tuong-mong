# E92 titles-daycard — TITLES2 re-merge + KIT §94b kitChapterTitle hook (session_01DgYSWmXnffeXj7ozJBTAs3, Foreman E child5)

PRIORITY #1 CHECK ('TITLES2|titles2' + 'day title|daytitle|title card|kitChapterTitle|chapterTitle'): OD 24/11 ~07:45Z L2327 + ~18:15Z L2413 (read verbatim) | main: jdayq.js «kit day title card … not on main yet»; no kitChapterTitle | review/titles2-r2 3292e7a2 (jdh3.js:294 chapterTitle(S) already = the goal-line chapter → REUSED, not rebuilt), review/kit-daytitle-r2 313bdfc6 (j79 stub `window.kitChapterTitle`) | claims E65r PASS 3292e7a2 (reports/titles2-review-r3.md); land-chain-11 «kit-daytitle 3424b927 NOT LANDED»; no LAND READY for kit-daytitle-r2 anywhere.

## Verdicts
- **PASS re-merge titles2 98c175a1** (review/titles2-r3m)
- **SẴN SÀNG KIỂM titles-daycard c39be532** (hook commit; same sha also pushed as review/titles-daycard; review/titles2-r3m head = c39be532)

## (1) Re-merge — 3292e7a2 was NOT live (LIVE = 5e013076)
- 98c175a1 = review/titles2-r2 3292e7a2 + origin/main 5e013076. Conflicts: assemble.py (took LIVE list, which adds jdayq.js, + jdh3n/jdh3 after jge — same rule as E65r), index.html/sw.js (rebuilt only).
- dev/build delta vs LIVE: same 8 files, same +734/−281 as the reviewed 3292e7a2-vs-fd85907a delta; line-by-line diff of the two deltas differs ONLY in the assemble.py list line (LIVE's own + jdayq.js). jbal2.js / jdh.js auto-merged.
- titles2-unit **69/69 PASS**; titles2-scan **rows 833 · 0 missing/clash/dup/long/bad how**.
- quickcheck 98c175a1: open / old save ok / perf PASS (buổi 1174/3826 new/live, tasks>200 21/24); core gate G4 button-crawl FAIL ×1 «fold · Ô lưu · Lui · close button did not close its layer» — **the SAME fault on LIVE 5e013076** (button-crawl --fast on the LIVE index.html, same box: identical single FAIL). Not caused by this branch → FOR MAIN 147 (LIVE fault).

## (2) Hook c39be532 (jdh3.js, read-only, no number, no typed text)
- `chapterInfo(p)` → `{n,name}` | null from the SAME source as chapterTitle / the j67 goal line (S.st.ms → MS67[id].t() with S.st.ch.n; S.st.M → ARC67[a].t (rdDef road chapters incl.) with M.chap); `chapterTitle(p)` now = its «Chương N — name» line (unchanged output).
- `window.kitChapterTitle=()=>chapterInfo(S)`; null = no open chapter → kit hides line 2. Load order: jdh3 sets it over the j79 stub (j79 earlier in assemble); j79 only installs its stub when none exists (kit later) → works either way. Her own S only (NPC/friend objects → null), so a co-op seat reads its own life; a new life / rebirth reads the new S.
- Test **dev/test/chapter-title-hook.js: PASS 22/22** (with kit merged; 21/21 + H7 skipped on c39be532 alone): H1 real hook; H2 all 11 origins open a new life with «Chương 1 — …» = chapterTitle (tt/dtq/muoi/cn/nc/td/ch/thd/pf/bd «Sơ nhập cung môn», cnv «Phận tỳ nữ buổi đầu»), read-only; H3 every ARC67 chapter (401, 336 road .4–.11) + every MS67 milestone (9) → {n,name}, no {…}/tags; H4 null for unknown arc / milestone, no open chapter, no ch, v1 story, no S.st, non-S object; S.st unchanged; H5 rebirth cnv→tt follows the new S; H6 co-op seat b; H7 kit line 2 = hook, hidden on null.
- titles2-unit 69/69 again on c39be532; quickcheck c39be532: same result as above (PASS except the LIVE Ô lưu «Lui» fault; old save ok; buổi 1190/4043, tasks 18/22).

## (3) With kit-daytitle-r2 313bdfc6 merged locally (11c60f78, NOT pushed)
- Merge clean except index.html/sw.js (rebuilt). kit-daytitle.js **ALL PASS (20 ok)**, chapter-title-hook 22/22.
- Shots Fold 755x1000@2 + iPad 1180x820@2, looked at (CDN upload refused: cdn_sync has no R2 key in this session → described, no images in git):
  - Later day (kitDayTitleShow n=9, live state): card centred, both lines inside the screen: «Tháng ba, năm thứ nhất, thượng tuần · mùa xuân» / «Chương 1 — Phận tỳ nữ buổi đầu» (cnv life). OK on both devices.
  - **New life (start(), week 0) — FAULT in kit-daytitle, not in the hook:** the card (#kdaytc z-index 12000) plays its 2.8 s UNDER the life-loading cover #klife «Sửa soạn nhập cung» (z 2147483500) on BOTH devices; the shot shows only the loading cover. Line 2 is in the DOM («Ngày 1» / «Chương 1 — Phận tỳ nữ buổi đầu»), but a player whose pictures load > 2.8 s never sees the opening card. kit-daytitle.js passes because the veil guard hides covers. → KIT keeper: show the start card after #klife closes (whole family: any cover over #kdaytc). «Ngày 1» has no day name yet = kitDayName hook (SELSCENE-3) not filled on this build.

## FOR MAIN 147
LC17: kit-daytitle-r2 313bdfc6 is NOT land-ready anywhere; land it TOGETHER with the hook c39be532 (review/titles-daycard = review/titles2-r3m head, which also carries the TITLES2 re-merge 98c175a1 on LIVE 5e013076). Before landing, KK fixes the new-life card hidden under #klife (above). LIVE fault seen by quickcheck G4: «Ô lưu · Lui does not close its layer» (fold) on 5e013076 itself.

~ HANDOVER: not needed (done).

## REVIEW r1 (E92r BIG, session_01DgYSWqAJU4v2sXYANjRjyQ, 26/11) — **FAIL c39be532 4**
PRIORITY #1 CHECK ('TITLES2' + 'day title' + 'kitChapterTitle|kitGoalAlt|kitGoalNow|chapter()'): OD 24/11 ~07:45Z + ~18:15Z | claims E92 SSK c39be532 | main 5e013076: jgoal.js:23 chapter() (= the ONE "current chapter" source of the goal panel, kitGoalAlt home roads first, n from pos67), jdayq.js:49 dqDawn counts #kdaytc | review/titles-daycard = review/titles2-r3m c39be532, review/kit-daytitle-r2 313bdfc6 | KIT_REQUESTS: no #klife row (added now).
Tested on origin/main 5e013076 (newest); c39be532 is a descendant of it (FF ok). Land combo = c39be532 + kit-daytitle-r2 313bdfc6 merged locally (ac09835c, index/sw rebuilt, NOT pushed).

### (a) Re-merge 98c175a1 — OK
- dev/build + dev/test + content patch of (5e013076→98c175a1) = patch of the reviewed (fd85907a→3292e7a2), line for line, except the assemble list line; j71/j72sd/jdh2/jdh3/jdh3n byte-identical to 3292e7a2, jbal2/jdh differ only by LIVE's own lines.
- assemble list = LIVE's 445 entries in the same order + jdh3n.js, jdh3.js (after jge.js), nothing else. No other game-code change. Hook commit c39be532 touches only jdh3.js (+14/−6), the new test, index.html/sw.js.

### (b) Hook kitChapterTitle() — FAIL (1–3)
Independent probes (scratch scripts, not in git), checked against the goal panel kitGoalNow() and pos67/lab67, not against chapterTitle (the worker's H3 compares the hook with chapterTitle, its own twin, so it can't catch these):
| case | hook (card line 2) | goal panel / chapter book | verdict |
|---|---|---|---|
| new life in the palace, 11 origins | «Chương 1 — Sơ nhập cung môn» (cnv «Phận tỳ nữ buổi đầu») | same | ok |
| «Ở nhà chờ tuyển tú» (kcInit) tt/dtq/muoi/td/ch/thd | «Chương 1 — Sơ nhập cung môn» | «Chương 1 — Chờ kỳ tuyển tú» [Khuê các] | **WRONG** |
| same, nc (kc2) | «Chương 1 — Sơ nhập cung môn» | «Chương 1 — Chờ ngày hòa thân» [Cố quốc] | **WRONG** |
| same, cnv (kc2) | «Chương 1 — Phận tỳ nữ buổi đầu» | «Chương 1 — Chờ lệnh tuyển cung nữ» [Thôn quê] | **WRONG** |
| old save, ARC67 chapter with no M.chap, S.st.ch.n=3 | «Chương 1 — Môn sinh của cha» | «Chương 3» (pos67, lab67 «Chương 3 · Hồi 1/3», jgoal) | **WRONG number** |
| M.chap=4 | Chương 4 | Chương 4 | ok |
| story complete (ch.all) | null (line hidden) | «Chương 12 — Mệnh truyện trọn vẹn» | differs |
| unknown arc/ms, no S.st, v1, non-S object | null | — | ok |
- Law 6 (REAL-WORLD) + Law 11: while she is still at home, the card names a palace chapter she hasn't started, and it contradicts the goal panel. The game already has ONE "current chapter" source, jgoal.js chapter() (kitGoalAlt home roads → milestone → ARC67 with pos67 → all). GATE ZERO/reuse: the hook must read THAT source (or the same order of checks), not a second copy that leaves out the home roads and pos67.

### (c) Tests
- chapter-title-hook.js on the land combo: PASS 22/22 (it misses the cases above, see fix 4).
- titles2-unit on c39be532 alone: PASS 69/69. **On the land combo: FAIL 5/72, stable across 2 runs** (C2 old-save titles; panel no «Danh tiếng» / «Chính truyện» / two-tone plates; info card wording). Cause: fresh() → start() → the kit's start card #kdaytc shows at +600 ms; LIVE jdayq dqDawn() counts #kdaytc as the new-day host, so it holds #modal ("Danh hiệu" waits in Q) while the test reads the panel. My probe shows the game is right: the panel stays held while the card is up and opens by itself once the card is gone. So it's a test fault, but the suite must pass on the combo that lands (fix 3).
- titles2-scan (combo): rows 833 · 0 missing/clash/dup/long/bad how.
- quickcheck c39be532: open 1653 ms 0 errors · old save ok (loads + plays a buổi) · time-spill PASS · G4 button-crawl FAIL ×1 «fold · Ô lưu · Lui · close button did not close its layer» — **proved on bare LIVE 5e013076**: button-crawl --fast on LIVE gives the identical single FAIL → LIVE fault, not this branch. Perf buổi 3236/1365 ms FAILed, but both sides were bimodal (new 3387/3236/910, live 925/1365/3715) and my LIVE crawl ran at the same time → box noise, not counted; rerun alone on r2.
- coop-e2e (live Worker) not run: the verdict is already FAIL; run it on r2 (Fold host). The hook reads only S of the device (p!==S → null), so seat a and seat b each read their own life; H6 only sets COOPW flags.
- 0 page errors in every probe.

### (d) Shots with kit-daytitle-r2 merged (Fold 755x1000@2, iPad 1180x820@2; looked at; CDN key missing → described, scratch only, deleted)
- Later day (real dawn() chain over the Tuần lục book, wk 7): card centred and on top (elementFromPoint = card), box 430x79, inside the screen, no horizontal overflow; «Tháng tư, năm thứ nhất, trung tuần · mùa hạ» / «Chương 1 — Sơ nhập cung môn». OK on both devices.
- New life: **confirmed** — #klife z 2147483500 sits on top of #kdaytc z 12000 for ~2 s of the card's 2.8 s (center point = klife at +0.5…2.0 s, card only from ~2.5 s). Kit fault in kit-daytitle-r2, not this branch → FOR MAIN 147 + KIT_REQUESTS row (added).

### FIX LIST for the worker (review/titles-daycard)
1. chapterInfo/kitChapterTitle (+ chapterTitle) read the ONE current-chapter source = jgoal.js chapter() (or exactly its order): kitGoalAlt home roads (Khuê các / Cố quốc / Thôn quê, kc2 + kc3) first, then milestone, then ARC67. Name = that source's title (keep fill67+plainT for tokens), no typed text.
2. Chapter number = pos67 (old save without M.chap → S.st.ch.n), same as jgoal/lab67/the chapter book. Story complete (ch.all): either follow the goal panel («Mệnh truyện trọn vẹn») or say in the report why line 2 is hidden — one rule, written in KIT §94b.
3. titles2-unit (and every suite you run) must PASS on c39be532 + kit-daytitle-r2: in fresh(), remove #kdaytc / wait it out (as chapter-title-hook does) before reading #modal.
4. chapter-title-hook.js: check the hook against kitGoalNow() (independent), add home-road lives (kcPick «nha» → kcInit, every origin with kcOk incl. kc2 nc/cnv and kc3), an old save without M.chap, and ch.all; then run coop-e2e (Fold host) + quickcheck alone (perf) on the new sha.

### FOR MAIN 147
- KIT (kit keeper): kit-daytitle-r2 313bdfc6 new-life card plays under #klife (z 2147483500 > 12000) for ~2 of 2.8 s on Fold + iPad → show it after #klife closes (whole family: any cover over #kdaytc). KIT_REQUESTS row added 26/11. Land kit-daytitle-r2 only TOGETHER with the hook's r2 sha.
- LIVE 5e013076 fault: quickcheck G4 «fold · Ô lưu · Lui · close button did not close its layer» (proved on bare LIVE).

## FIX r1 (E92f, session_01DgYSWnoSnKPLiPFcAgkeFc, Foreman E child6, 26/11) — **SẴN SÀNG KIỂM titles-daycard 8cdc4b46**
PRIORITY #1 CHECK ('kitChapterTitle|kitGoalAlt|kitGoalNow|chapter()'): OD 0 | ledger 0 | claims E92 / E92r (this file) | main 5e013076 jgoal.js:23 chapter() = the ONE current-chapter source (REUSED, not copied) | review/* only review/titles-daycard + kit-daytitle-r2 stub | archive 0.
Branch review/titles-daycard: c39be532 → ae84bd4d (fix) → 8cdc4b46 (titles2-unit CT line), FF, pushed. START_CTX ~3 % (1M window).

### What changed (game code: 2 lines of meaning)
- jgoal.js: `window.kitGoalChapter=chapter` (exports the goal panel's own chapter(); nothing else touched).
- jdh3.js chapterInfo(p) (→ kitChapterTitle / chapterTitle) = window.kitGoalChapter(): kitGoalAlt home roads first, then milestone, then ARC67 numbered by pos67, then ch.all «Mệnh truyện trọn vẹn», then old v1 story — exactly the goal panel. Name = its title (fill67 + plainT for tokens); n = its n. Null when it is not her own S or she is dead (goal panel null too). The second copy of the logic is gone.
- ONE RULE (fix 2, ch.all + edge states): card line 2 ALWAYS = the goal panel's «Chương N — title»; hidden only when the goal panel has none. FOR MAIN 147 / KK: put this sentence in KIT §94b when kit-daytitle lands (KIT.md §94b lives on kit-daytitle-r2, not on this branch).

### Before/after (law 11, scan = dev/test/chapter-title-hook.js vs kitGoalNow; before = c39be532 build, after = 8cdc4b46)
| case | before (card) | after (card) = goal panel |
|---|---|---|
| home tt/dtq/muoi/thd/ch/td (Khuê các, kc3) | Chương 1 — Sơ nhập cung môn | Chương 1 — Chờ kỳ tuyển tú |
| home nc/bd/pf (Cố quốc, kc2) | Chương 1 — Sơ nhập cung môn | Chương 1 — Chờ ngày hòa thân |
| home cnv (Thôn quê, kc2 dan) | Chương 1 — Phận tỳ nữ buổi đầu | Chương 1 — Chờ lệnh tuyển cung nữ |
| old save, no M.chap, ch.n 3 | Chương 1 — … | Chương 3 — … (= pos67 / lab67 «Chương 3 · Hồi 1/3») |
| ch.all | null (hidden) | Chương 12 — Mệnh truyện trọn vẹn |
| v2 no ch / old v1 story / no open chapter | null | the goal panel's old-story line |
| palace lives ×11, 401 ARC67 + 9 MS67, unknown arc/ms, no S.st, dead, non-S | same | same (unchanged) |
Totals: before 24 ok / 16 FAIL → after 40/40 (branch), 41/41 (land combo, + H7 kit line 2).

### Tests (8cdc4b46; land combo = 8cdc4b46 + kit-daytitle-r2 313bdfc6 merged LOCALLY, index/sw rebuilt, NOT pushed)
- chapter-title-hook.js: PASS 40/40 branch · 41/41 combo. Now compares with kitGoalNow (not chapterTitle), H8 = 10 home roads via kcPick «nha» → kcInit (KC.ok + KC2K, kc2 + kc3), H9 old save, H10 ch.all, H4 edge states = goal panel; card-aware fresh().
- titles2-unit: PASS 69/69 branch · 69/69 combo (was 5 FAIL on combo). fresh() is card-aware: waits out the +600 ms start card, removes #kdaytc, clears what it held (no game change). Its CT "no open chapter" line now follows the one rule (= goal panel).
- titles2-scan (combo): rows 833 · 0 missing/clash/dup/long/bad how.
- coop-e2e (combo, live Worker, Fold host): 143/143 passed.
- quickcheck 8cdc4b46 ALONE: open 1598 ms 0 errors · old save ok · time-spill PASS · perf PASS (buổi 1280/4631 new/live, tasks 25/26) · G4 button-crawl FAIL ×1 «fold · Ô lưu · Lui» = the LIVE 5e013076 fault (E92 + E92r proved it on bare LIVE), not this branch.
- 0 page errors.

### Shots (combo; Fold 755x1000@2 + iPad 1180x820@2; LOOKED at each; CDN refused: no R2 key → described, scratch only)
- Home tt before tuyển tú: card «Ngày 1 / Chương 1 — Chờ kỳ tuyển tú» centred, on top (elementFromPoint), no overflow; goal panel side by side «Chương 1 · Chờ kỳ tuyển tú — Mệnh truyện: Khuê các». Same on both devices.
- Home nc: card «Chương 1 — Chờ ngày hòa thân» = goal panel «Chương 1 · Chờ ngày hòa thân — Mệnh truyện: Cố quốc». Both devices.
- Later day (wk 13, ARC67 tt_co_5 old save without M.chap, ch.n 3): card «Tháng tư, năm thứ nhất, trung tuần · mùa hạ / Chương 3 — Môn sinh của cha» = goal panel «Chương 3 · Môn sinh của cha». Box 431x80, inside the screen, both devices.

### Not mine (unchanged FOR MAIN 147)
- KIT keeper: kit-daytitle-r2 new-life card under #klife (KIT_REQUESTS row of E92r). Land kit-daytitle-r2 TOGETHER with 8cdc4b46.
- LIVE fault G4 «Ô lưu · Lui».

~ HANDOVER: not needed (done; context well under the line).

## REVIEW r2 (E92r2 BIG, session_01DgYSWoBExdJN41AEUaMfCH, Foreman E child6, 26/11) — **PASS titles-daycard 8cdc4b46**
PRIORITY #1 CHECK ('kitChapterTitle|kitGoalChapter|kitGoalNow|chapter()'): OD 0 | ledger 0 | claims E92 / E92r / E92f (this file) | main 5e013076 jgoal.js chapter() (the one source) | review/* only review/titles-daycard + review/kit-daytitle-r2 313bdfc6 | archive 0. START_CTX ~3 % (1M window).
8cdc4b46 is a descendant of origin/main 5e013076 (FF ok). Re-merge 98c175a1 already PASSED in r1, not redone. Land combo = 8cdc4b46 + kit-daytitle-r2 313bdfc6 merged LOCALLY (index/sw rebuilt, not pushed). Rebuild of 8cdc4b46 = committed index.html except the build line (game code identical).

### r1 faults — each checked for the whole family (independent probes, scratch only, not in git)
| r1 fault | check | result |
|---|---|---|
| 1 card line 2 ≠ goal panel (home roads) | diff: chapterInfo now only calls window.kitGoalChapter = jgoal chapter() (exported, nothing else in jgoal touched); no second chapter table left (git grep chapterInfo/kitGoalChapter: 1 source, 1 reader). REAL accept chain probe: every ORIGINS origin × «Ở nhà» / «Vào cung» (button[data-kcp] + nlAccept, 18 lives): hook = kitGoalNow 18/18 (tt/dtq/muoi/td/ch/thd «Chờ kỳ tuyển tú», nc «Chờ ngày hòa thân», cnv «Chờ lệnh tuyển cung nữ», palace «Sơ nhập cung môn» / cnv «Phận tỳ nữ buổi đầu»; cn has no home road = palace, same as goal) | **gone** |
| 2 old save without M.chap / ch.all | probe: every ARC67 chapter (401) × S.st.ch.n 1/2/3/5, no M.chap → hook n = pos67 = goal kicker = lab67 1604/1604; ch.all → «Chương 12 — Mệnh truyện trọn vẹn» (= goal panel, the one rule); dead → null | **gone** |
| 3 titles2-unit card-aware | diff: only dev/test/titles2-unit.js (fresh() waits out / removes #kdaytc; CT line follows the goal panel); no game code for it | **ok** |
| 4 chapter-title-hook vs kitGoalNow | __gp compares with kitGoalNow (not chapterTitle); H8 home roads, H9 old save, H10 ch.all, H6 co-op seat present | **ok** |
Rebirth / new life: the hook reads the S of the moment (H5 + my 18-life probe). Co-op seat: p!==S → null; seat b = its own goal panel (H6) + coop-e2e below.

### Tests (rerun by me)
- chapter-title-hook: 40/40 branch · 41/41 combo. titles2-unit combo 69/69. titles2-scan combo: rows 833 · 0 missing/clash/dup/long/bad how.
- coop-e2e (combo, live Worker, Fold host / iPad guest): 143/143.
- quickcheck 8cdc4b46 ALONE (bash dev/tools/quickcheck.sh): open 1506 ms 0 errors · old save ok (loads + plays a buổi) · time-spill PASS · G4 ×1 «fold · Ô lưu · Lui · close button did not close its layer» = **identical on bare LIVE 5e013076** (button-crawl --fast on LIVE: FAIL 1, same row) → LIVE fault.
- perf: buổi FAILed twice (median 3725/1230, then --runs 7 2834/1239, limit ~2740); render/tab/tasks fine. Not counted: (a) the r1→r2 game delta is one export line in jgoal + chapterInfo, which no buổi path calls (git grep: only the kit card / tests call kitChapterTitle/chapterTitle; on the branch alone nothing calls them); (b) buổi is bimodal on BOTH builds (~0.9–1.4 s vs ~3–5 s; LIVE runs 864/4034, 3963), and an A/A run (8cdc4b46 vs ITSELF, --runs 6) gave 1101/2463 = PASS with the same two modes (new 1289/5418/913/879/3497/820, «live» 1141/1908/4658/4513/3017/790) → box noise. E92f's run passed (1280/4631). FOR MAIN: rerun quickcheck once at land.
- 0 page errors in every run/probe.

### Shots (combo; Fold 755x1000@2 + iPad 1180x820@2; LOOKED at each, 3×; CDN not used: no R2 key → described, scratch only, deleted)
- Home tt before tuyển tú, real accept chain: card «Ngày 1 / Chương 1 — Chờ kỳ tuyển tú» centred, readable, inside the screen, no overflow, = goal panel «Chương 1 · Chờ kỳ tuyển tú». Both devices.
- Home nc: iPad card «Chương 1 — Chờ ngày hòa thân» on top of the open goal panel «Chương 1 · Chờ ngày hòa thân — Mệnh truyện: Cố quốc» — side by side, same text. Fold same.
- Later day (palace life, ARC67 tt_co_5, ch.n 3, real dawn() over the Tuần lục book): «Tháng ba, năm thứ nhất, thượng tuần · mùa xuân / Chương 3 — Môn sinh của cha» = goal panel. Both devices, card on top, inside the screen.

### Laws touched
4 ONE CORE: no number typed (n from chapter()/pos67). 6/11: card and goal panel name the same real chapter everywhere (scan above). 9 KIT FIRST: no UI in this branch (card = kit §94b of kit-daytitle). 7 wording: titles from game data (fill67 + plainT). 13: reuse of jgoal chapter(), no copy. OK.

### FOR MAIN 147 (kit keeper; not this branch — land kit-daytitle-r2 TOGETHER with 8cdc4b46 only after it)
- STRONGER than r1's #klife row: in the REAL new-game flow (outer start() → nlBegin → Luân hồi picker / life card) kit-daytitle-r2's jend.js start wrapper shows the start card at start()+600 ms, i.e. BEFORE she picks «Ở nhà / Vào cung» and before nlAccept → kcInit. So on every home road the first card reads «Chương 1 — Sơ nhập cung môn» (cnv «Phận tỳ nữ buổi đầu») and plays under #klife / the Luân hồi cover. The hook is right at that moment (goal panel says the same then); probe: calling kitDayTitleShow() after nlAccept gives «Chờ kỳ tuyển tú» / «Chờ ngày hòa thân» / «Chờ lệnh tuyển cung nữ» = goal panel. Fix in the kit: show the start card after the life is accepted (nlAccept done, #klife / #kroul / life card gone), not on a fixed timer after start(). Whole family: the home dowry chest scene («Rương đồ khuê các») can also sit over #kdaytc.
- Put the one rule in KIT §94b: «line 2 = the goal panel's Chương N — title; hidden only when the goal panel has none».
- LIVE 5e013076 fault: G4 «Ô lưu · Lui» (unchanged).
