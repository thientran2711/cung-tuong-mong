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
