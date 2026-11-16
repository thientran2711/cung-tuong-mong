SẴN SÀNG KIỂM f5305341eb03ef951034a812a7f276265ecad79d
# Report: review/story14-p1-r2 (fix of reviewer FAIL dev/handover/reports/story14-p1-r1.md) — worker r2

Branch `review/story14-p1-r2` from review/story14-p1-r1 @ 8ab69094, merged with origin/main up to 0ce59361 (4 merges; conflicts only in
assemble.py list → `jst14.js` after `j67.js`, jtabs Mệnh truyện chip block → main's `data-chap` chips + jchap inline kept, built files regenerated).
Owner lines read verbatim: OD:L1242–L1264, L1288, L1289, 16/11 13:20Z/13:25Z/13:30Z (titles, forced events, item conservation: nothing in
them touches this frame). START_CORE/WORKER, topic story-roads.md, VANPHONG.

## Fix per FAIL item
| # | item | fix (root + group) |
|---|---|---|
| 1 | home road closes ch1 «Lỡ dịp» | tutorial months count only in the palace (`f14El`, MS67 `wait`); `kcEnter` wrapper restarts the running tutorial chapter: t0 = entry month, r0 = real entry rank; `msCheck67` does not close a tutorial chapter at home. Co-op friend at home goes through the same kcEnter. |
| 2 | cnv double reward, servant steps | cnv ch1 «Kẻ hầu mới vào cung»: Chủ tin 60 / thăng Đại cung nữ / phong Đáp ứng; ch2 while serving «Lọt vào mắt Hoàng thượng»: Hoàng thượng để ý 25 / phong Đáp ứng (ordinary Sủng/thị tẩm steps once raised); ch3 «kết thân» also counts đồng liêu. `len14` only if not raised (raised → shared arc, no reward) and it has NO time limit: every later chapter is a consort chapter a servant cannot play (all shared arcs are `!isSrv`), so they open when she is raised (= j67 «len» rule). |
| 3 | hostility keyword scan | `F14ROLE`: table of all 33 cast roles, read role by role (20 hostile: frame/slander/mock/spy/blackmail; 13 not: rival, ally-seeker, debtor, victim). muoi_no, ch_ho, tt_tranh, s_thu.v2, st_the.v by name not hostile. Test fails if any arc role is missing from the table. |
| 4 | ONE CORE | `BAL.st14` (max, parts, lim, goals, danh, reward tiers, hate, trait weights, context divisors/caps, odds clamp, shift) + `BAL.ntRise` + `ntRiseOdds()` in jbal.js. jst14 reads only BAL; texts print constants (number words via `kitNumVi`); panel67 "ba/tám/ba chương" from parts; the plan's shared-arc count follows parts. Group: j67 old `len`/`sung` milestones and j42 (HX text, rise roll, chip, Thân phận row) read the same constants (45 typed in 5 places → 1). Scan `dev/measure/st14-onecore-scan.py`: r1 42 typed numbers + 13 number words → r2 0 + 0. |
| 5 | false certainty | j67 option preview: an ending no roll decides (sure option or same ending both ways) prints `kết: X · <ladder word>` from `f14Hold` = 100 − worse − better. A turned ending puts a "Xoay chiều" row on the chapter result card ("Tưởng đã định «A», nay thành «B»: <strongest context reason>", e.g. "Cố Lạc Anh không ưa ta") + a log line. Neutral bias even: base 15 worse / 15 better (BAL.st14.shift). |
| 6 | Chương 1/15 | `f14Norm()` called right after the j96 and jkc Thanh mai splices; part index compared by number (BAL getter). Thanh mai life: max 14 at start and after 12 months, no "/15" in panel, tab, chapModel. |
| 7 | "Hạn: không có hạn" | `msHan67(m,form)` in j67 = ONE HẠN row for the chapter-open card, panel67, Mệnh truyện tab (jtabs), chapter detail risks (jchap) and kitGoalDetail ms section (jgoal, new "Cần lưu ý"): "còn N tháng, rồi chương tự khép, không thưởng"; at home "6 tháng, tính từ ngày nhập cung; …"; milestones without a limit keep "không có hạn". |
| 8 | test gaps | Root cause: the sensible bot (inpage4) wraps `start()` and overrides `__forceOrigin` with 8 origins (never cnv). The fast bot now uses the game's own start and fails if the origin differs. New checks for items 1 (3 entry ranks), 2, 3, 5, 6. Harness: waits for the first `start()` (S is set after the roulette on the current build), closes a stuck chapter itself when the bot life keeps dying (it skipped a67Month → 900-month runs), reports a time stall. New `dev/test/story14-host.js` (host mode). |

## Tests (final build)
| test | result |
|---|---|
| dev/test/story14-frame.js (sensible bot 40×300 + fast story bot 9 origins incl. cnv + L1247/L1253 + items 1/2/3/5/6 + old saves main/frame-off) | 27/27 PASS, 0 page errors (40-step run on the first merge; 10-step and 5-step runs on the later merges) |
| dev/test/story14-host.js, host mode ?khost=1 via lib/device.js openHost: Fold 755x1000, iPad 1180x820, iPad Pro 1366x1024 | PASS (chip "Chương 1/14 · Nhập cung học việc", HẠN "còn 6 tháng…", no "/15", detail rows, no overflow, 0 errors); shots looked at |
| dev/test/story14-view.js 755x1000 + 1180x820 | PASS |
| dev/test/coop-e2e.js (live Worker; kcEnter / jkc touched) | 59/59 PASS (twice) |
| dev/test/story-deadline.js, kc-lore/route-td.js, kc-lore/scan.js | PASS |
| dev/test/chap-label.js CHECK=1 | 1 FAIL "arc head has Chương · Hồi" — same FAIL on origin/main (r1 report), not this branch |
| one-core scan | 0 typed game numbers in jst14 |
Fast bot sample: every origin 1..14 ALL in 121–157 months (cnv 152–159: waits for the rise at ch8); same option, different odds across lives 21–28 of 30–42 beats.

## Notes
- Kit: no new UI part; HẠN uses rows67/kitRows, "Xoay chiều" is a row of the existing card67 result card. No KIT REQUEST.
- Old saves: keep their frame (no S.st.f14); j67 old `sung` still rewards a time-close (old frame, not the 14-chapter tutorial) — unchanged.
- Shift odds word uses the action ladder as the r1 report asked ("kết: X · Khá chắc"); if the owner wants the Rất thấp…Rất cao words for it, it is one place (j67 eT).
- Pictures in shots load slowly from the CDN in this sandbox (blank thumbnails), not this branch.
