# PROGRESS · review/kit-fig2 (kit worker, 11/15) — base: origin/main 482a99f97 + review/shop-fix (144f28bc4)

Continue on this branch (it already contains review/shop-fix). Do not push main; no PR.

## DONE
- 144f28bc4 (review/shop-fix, merged here): shop = 32.7 person dialog, aligned tile grid with buying on the tile, kit-x ✕, "Ta có N bạc",
  eunuch tray figure img/fig-eunuch-ndp-tray.webp (in git; cdn_sync if images must go to the CDN).
- 0ed4488bd: KIT 32.7b (figures fill the person column), KIT 42 kitNameRank (name + rank ABOVE the picture: person dialogs, shop, Ân oán,
  person cards), KIT 43 Ân oán (two pager strips X/Y + one pair "Quan hệ giữa X và Y", kitRelRow, kitSignedBar/kitPosBar, oán ladder
  BAL.oanLv, glosses in VANPHONG), stranger rule (j61 isKnown61/met61: consort not met = silhouette everywhere), news / Tuần lục row face =
  the person named first (j79 kpPeopleIn).
- 40f904fa0: before/after shots dev/shots/kit-fig2/.
- WIP commit (this one): KIT 32.7c (person dialog height = content, clamp 500..720), KIT 44 kitActCompact (compact act cards in person-card
  panes; own act picture only, no category stand-in: `.kanoart`), KIT 45 kitEventDp (event picture = banner top-right, KIT_FOCUS crop
  points, short options 2 per row), dev/review/event-banners.md (+ crop sheets dev/review/event-banners/s1..s9.jpg),
  dev/review/person-act-pics-missing.md (sent to act-pics2 ab06ce27b6963775a).

## 11/15 ~11:30Z — news / Tuần lục avatars (owner 17:04Z live bug: "every avatar in Tin trong cung is not the real person, even hers")
- Cause (this branch + live before img-quality): `porOf` (j39) returned the person's OLD face (face-consort-NN / inline AV.women avatar = other-looking
  art) until her por-* portrait had loaded in a hidden Image(), then re-rendered only the main panel. A dialog / Sổ tuần opened right after
  loading a save (the morning news card) kept the old faces. Main fixed this in review/img-quality (jimg.js: por-* returned at once, old face
  only on a load error). Fix here = merge origin/main 1a99caf7d (aeeb867c4); later merged main ee5758195 (1ca27858f). Conflicts: see that commit; this branch's KIT sections are now §48 kitNameRank, §49 Ân oán, §50 kitEventDp; kitActCompact = main's §43 (one copy).
- Real-save check `dev/test/news-face-real.js` (save played to week 30, loaded with the title-screen button, played 5 more weeks; reference =
  the Hậu cung strip tile DOM + card, Ân oán "Ta" tile): news rows 12/12 judged rows = same file + rank colour as her strip tile (Ta 4/4, met
  consorts, unmet consorts = silhouette in both); 13/13 Hậu cung cards = strip tile; Sổ tuần rows on a person's page draw no face (kfdot, the
  page figure is the person) — 19 such rows, none wrong. Before the merge the same save showed 6/13 strip tiles with old fallback art.
- Seen while testing (not fixed yet): news row "Cung nữ Cung nữ thân tín Tiểu Đào của …" (title doubled); stuck loops for a test driver:
  "Thi tài ngày Thất tịch · Lời mời" first option re-queues itself; a lesson minigame overlay (#ov) whose ok/skip buttons do not close it.

## 11/15 ~13:00Z — news card rows (owner 17:04Z) + doubled titles (class fix)
- Done (j79, j75, j61): one fact per row (sentence split at tag boundaries / after ".)"); "(Chứng cứ X +1.)" and "Lý do:" stay on the
  row of the act that gave them; repeated reason kept once; kitNoChange drops every "label N → N" clause (+ j75 names whose Sủng);
  promotion rows say the rank once ("tấn phong Mạnh Cẩm Tú làm Quý nhân", "Đoan Mộc Hải Đường được tấn phong Quý phi");
  kitTitled / kitTitledName / kitDedupTitle: no "Cung nữ Cung nữ thân tín", no "Tổng quản thái giám Tổng quản" (KIT §9 notes).
- Scan (news-face-real.js on dev/test/fixtures/world30-met.json = the week-30 save with 9/13 consorts met):
  title unit before 1/56 doubled → after 0/56; live dialogs/books before 2 doubled lines → after 0 (1 old stored log line, drawn clean).
  Faces after both merges: news rows match strip tiles (a row that names a maid first shows the maid; a consort promoted during the run
  shows her NEW rank outfit — the checker's reference is taken at load), 13/13 cards = tiles, no page errors.
- NOT done (LUẬT KIT TRƯỚC, stopped): chips "thân +N" (→ fix-float kitRelDelta, not on main yet) and world/family stat chips
  ("Kho lúa −10", "nhà Hộ bộ thế lực +6") — no shared kit part; filed in dev/kit/KIT_REQUESTS.md.
- NOT started this session: kitEventDp items 1a–1d, "VIỆC · <cung>" visit dialog (banner + silhouette top, head portrait left or grey
  silhouette if unmet, text right, buttons below, no "Thôi"), owner acceptance shot "VIỆC · Thái hậu triệu" (figure small bottom-left,
  name plate under feet → must be above via kitNameRank §48, dialog full height for 2 short choices → fit content, no banner top-right,
  "thiện cảm" wording), Ân oán tabs, act cards without own picture, 5-size runs.
- Test helpers: news-face-real.js serves CDN pictures from git objects of 3e212597e (IMGREV) — no disk, no proxy.


## 11/15 r8 (new commit range on top of e68183a1d, which is under review) — owner 13:00Z, 13:15Z, 14:30Z, 15:45Z
Main (f500d0464) was already merged; nothing new on main. fix-float kitRelDelta is NOT on main → number chips untouched (rule 5).
- 1 kitEventDp = ONE template (KIT 50.1, jk4): every event with a person → left = ONE person (main one; `kitStagePeople` slice 1),
  name + rank above (§48), banner top-right for EVERY such event (own picture, else `j24:<title>` = Có người đến / Thái hậu triệu / Hoàng
  thượng đến / Kẻ hầu xin / Một ánh mắt / Việc của kẻ hầu, else the week-book meaning table KBK_EVRE on title + text; herself alone only
  on a real match), height = content (floor 420 px, was 500; `kitDpNat` measures banner + text + the options' own content — before, the
  options were clipped and scrolled), short options 2 per row (32.9 k3long / k3odd no longer break a kdpo2 group).
  Acceptance "Thái hậu triệu" 1180x820: 421 px tall (was 720 on main), banner, chip above, figure 0.98 of the column, 2 options in one row,
  12 px under the options. Scan `dev/test/event-dp-scan.js` (fixture save, 1180x820): 41 j24 dialogs + 22 festival / feast / merit
  dialogs → all kdper, 1 person, banner in the right column, chip above, fill 0.98–0.99, under the options 8–35 px.
  NOT done (rule 5): "Thái hậu → ta: thiện cảm +3" in option rows = NAMES.th; becomes kitRelDelta when fix-float lands on main.
- 2 place card head (KIT 32.8b, jplace `kitPlaceHost`): picture band + silhouettes kept; under it head portrait LEFT (relPerson: unmet =
  grey silhouette, name stays) with kitNameRank above, info box RIGHT; no Thôi (32.10 already hides it). All 4 place-card builders.
- 3 Ân oán (KIT 49.2b, jhc): each picker = kit sub-tabs (Ta · Chí tôn · Phi tần + counts) + the Hậu cung strip of that group only;
  `.kpinline` keeps a picker's tab row out of the pane bar (jpane free()). Act cards: no own picture → no picture anywhere (jk4 wrapper
  on kitActArt / kpActArt, `.kanoart` global).
- 4b overlays (jk4 + j5): the j5 lesson panel's #mgskip stayed "not hidden" inside the hidden panel and its used "Xong" (#mgok, old
  callback) stayed in #ov; kitOvBtn (✕ / Esc / tap outside) pressed that stale button during a kg82 result → the kg82 game was never
  closed (#kg82 left, aaudit busy() → lessons refused) and its result not applied. Fix: #mgskip hidden unless a j5 game is up, #mgok
  removed after use, kitOvBtn only takes a result button in a panel on screen, #ov hidden when no panel is left, resumeMG that opens
  nothing clears S.mg. Test `dev/test/overlay-close.js` (35 openers × player path): before 35/35 FAIL (stale #mgskip / #mgok; "j5 then
  kg82, Esc at result": kg82 result not applied, #kg82 left) → after 35/35 ok.
  Driver: news-face-real.js workarounds REMOVED (no force-hide #ov, no S.mg=null, no drop/close of a repeating dialog); it presses only
  visible buttons and stops with window.__stuck {overlay|dialog|requeue}. Old driver on the old build: 14 forced overlay closes / 3000
  ticks (25 / 6000) — every one a festival contest kg82 intro whose real buttons the driver never pressed (it clicked the stale
  #mgskip); old driver on the new build: 0 forced closes.
- 4a invitation re-queue: NOT reproduced. Probe: every j71 invitation (all FV7 contest variants, both feast invitations) × every option →
  the chosen invitation never comes back; real play (drive2 instrumentation, same pid + same pp or same object after chooseM): no j71 /
  j67 invitation re-queued in ~1000 dialogs. The only repeats: "Lời cảnh báo" (j70thr) — two identical warnings about the same consort
  already in Q before the choice (duplicate queueing, not a re-push), "Phòng bị" / "Đêm thị tẩm" = next step with the same title. The
  old driver's "Thi tài ngày Thất tịch · Lời mời came back" was the stuck contest overlay (above) seen while the invitation was Q[0].

## LEFT (owner requests, exact)
1. kitEventDp (KIT 45): done in code + test; LEFT: (a) a 2-option visit leaves ~124 px empty under the options because of the 500 px
   minimum height (32.7c) — lower the minimum or let the figure set it; (b) "several people → only the main one" in the left column is NOT
   done (two people still stand side by side); (c) wire review/gift-ui `kitEvBanner(m)` (dialog's own 4:3 banner) when that branch lands —
   it already flows through jk2b kitEvArt into the band; (d) new landscape art needed: ev-hoang-de-dem, ev-cung-nhan, and a "mocking visit"
   picture (see event-banners.md); (e) final 5-size run of event-dp.js was done (results in this file below); act-compact / fig-fill /
   shop-fix last 5-size runs were cut by the wrap-up (re-run).
2. kitActCompact (KIT 44): done; LEFT: gift-dialog recipient rows / Hoàng tự pane not checked; re-run act-compact.js on 5 sizes.
3. No-thumbnail fallback: done (`.kanoart`); the 10 acts without own pictures are listed in dev/review/person-act-pics-missing.md
   (also j79 kitActCat files "Giá họa trộm đồ" under Học tập — regex bug; no img/act-cat-trung-phat.webp).
4. Stranger rule: done for mdH / pcPort / pframe / kitFace / kitFigOf / kitStageFig / dialogs / Ân oán / Hậu cung / news rows
   (stranger-sweep.js passes). LEFT: jbook kbp-fig (caller-provided src) not audited; S.met is the only "met" source (+ same palace).
5. News avatars: fixed (row face = first-named person; test in stranger-sweep.js: 8/8 rows src + rank colour == strip tile).
6. Ân oán tabs: strip groups Ta · Chí tôn · Phi tần (pager sep labels). LEFT: Nam nhân / Cung nhân groups (no relation data in hcRelHTML)
   and real sub-tab buttons if the owner wants tabs rather than strip groups; the 2-portrait narrow layout has unequal portrait sizes.
7. Figure ≥ 0.95 of column: painted ≈ 0.98 of the column UNDER the name chips, ≈ 0.90–0.93 of the whole column (chip on top takes the
   rest); two people on Fold 755 get one common factor (≈0.83–0.90) because the dialog is only 731 px wide.
8. Person card relation chips (jk2b 864–882, "Hoàng hậu quý ngươi …" under the portrait) still use the old wording/bars, not kitRelRow.
9. Stage figure labels stay at the feet (heads touch the top; scene title / chip column) — evidence dev/shots/kit-fig2/stage-labels-844x390.jpg.

## Known bugs / notes
- Tests: a game timer sometimes empties Q right after showModal → tests retry opening (fig-fill, shop-fix, event-dp). Setting S.known for all
  consorts before showModal makes the queued dialog vanish (not investigated).
- Random starts can land on the servant road: tests loop start() up to 400 times.
- shop vs plain person dialog: same width only when both reach the height cap (32.7c makes small dialogs shorter → narrower figure column).
- Many img/fig-* files are in git but NOT on the live site (404 on github.io) — local test server must read them from git.

## Tests (build page = dev/index.html wrapped as _t.html; serve the worktree, images from git / live site)
node dev/test/event-dp.js <url> <outdir> <tag> [sizes] [mock,long,nopic,emp]
node dev/test/act-compact.js <url> <outdir> <tag> [sizes]
node dev/test/fig-fill.js <url> <outdir> <tag> [sizes] [woman,man,two,mix,shop]
node dev/test/rel-row.js <url> <outdir> <tag> [sizes]
node dev/test/name-rank.js <url> <outdir> <tag> [sizes]
node dev/test/stranger-sweep.js <url> [outdir]
node dev/test/shop-fix.js <url> <outdir> [sizes]
Sizes: 755x1000@2,1000x755@2,1180x820@2,844x390@3,1366x1024@2.

## Last event-dp run (after, 5 sizes): banner in the right column at every size (190 px; 96 px at 844x390), focus 50% 50%, figure 0.97–0.98 of
the column under the chip, chip above the head, short options 2 per row; mock dialog 500 px tall (empty 124 px under options = bug 1a).

## cdn_sync pending
img/fig-eunuch-ndp-tray.webp (committed in git on review/shop-fix; not on the CDN / live site yet).

## REVIEW r6 (reviewer, 11/15) — e68183a1d on origin/main f500d0464 (branch already contained it) → review/kit-fig2-r6
- KIT numbers OK: main §41 kitMeMark, §42 kitLine/close-bugs, §43 kitActCompact (one copy), §45–47 tabs-kit; this branch §48 kitNameRank, §49 Ân oán, §50 kitEventDp.
- Fixes made by the reviewer:
  1. Doubled title still drawn in Sổ ghi ("Tổng quản thái giám Tổng quản Lý Liên Anh", old stored log line of the week-30 fixture): kpPeopleIn only
     passed the text's title to kitName when the person HAS a kitTitle; the Tổng quản's title is part of his name (kitTitle "") → pre is now passed
     whenever the text puts a title before the name (j79); kitNames (j65, Sổ ghi) also runs kitDedupTitle on stored lines. Sổ ghi doubled: 1 → 0.
  2. Lone "." on its own line after a row-end chip ("Tổng quản Lý Liên Anh [mếch lòng −4]" + "."): dropped in kpFactRow (j79).
  3. Kit sample page: §48 kitNameRank and §49.1 kitRelRow samples registered (jkitpage; rule "new kit parts register a sample"). §50 is a live dialog (event-dp.js).
- Tests (images served from git objects, IMGREV 3e212597e): news-face-real.js on world30-met.json: 13/13 judged rows = strip tile, 13/13 cards = tiles,
  stranger rows silhouette, titleUnit 0/56, 0 errors. Review script (fixture + an old save made with main 47e53770d build) at 755x1000@2, 1000x755@2,
  1180x820@2, 1366x1024@2, 844x390@3: news card + Tuần lục + Hậu cung + Ân oán: 0 h-overflow, 0 clipped, 0 "N → N" rows, 0 doubled titles,
  0 page errors; 390x844 = portrait game (no rotate prompt; same as main). stranger-sweep: no leaks. event-dp (routed images) 1180/844 banner +
  figure ok; kit-page 0 bad.
- Not this batch / left for the worker: kitEventDp 1a (empty space under 2 short options, 125–340 px at 1180x820), wording "mếch lòng" in chips
  (KIT_REQUESTS kitRelDelta), Sổ ghi old lines "Sủng nàng ta 43 → 46" (stored text, not a fact row).
- r6 part 2: merged origin/main 94ea008a2 (stage-slots + opt-render §53). Conflicts: KIT.md (§48–50 kept + §53 kept; §49 subsections renamed
  43.x → 49.x; §47 sample list names §48/§49.1), jkitpage.js (both sample blocks kept, page = 10 samples), built files rebuilt.
  4. Stat-only sentence ("Danh -1.", "Kho lúa -8, nhà X thế lực -6.") now stays on the row of the fact it belongs to (kpSentences), and no
     stray "," between two chips (kpFactRow). Re-tested on the merged build: news-face-real 14/14, rv 5 sizes fixture + old save 0 bad, kit-page
     5 sizes 0 bad, opt-render fails [] , opt-scan unclassified 0, 0 page errors.
- r6 part 3: merged origin/main afb2676a2 (header-danh, act-pics2, gift-ui r6): only built files conflicted (rebuilt). Re-test: news-face-real 12/12, rv fixture + old save 5 sizes 0 bad, kit-page 0 bad, 0 page errors.
- NOTE for the coordinator: during this review some other session switched /home/user/wt/kit-fig2-r6 to branch review/kit-fig2 and edited
  j5/jhc/jk4/jplace/KIT.md/news-face-real.js there (uncommitted, 12:25Z). The reviewer's commit 00c72e4e4 therefore also sits on the LOCAL
  review/kit-fig2 ref of that worktree. Review work continued in /home/user/wt/kf2r6.
