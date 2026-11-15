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
  only on a load error). Fix here = merge origin/main 1a99caf7d (82f22140b). Conflicts: see that commit; this branch's KIT sections are now 42-45.
- Real-save check `dev/test/news-face-real.js` (save played to week 30, loaded with the title-screen button, played 5 more weeks; reference =
  the Hậu cung strip tile DOM + card, Ân oán "Ta" tile): news rows 12/12 judged rows = same file + rank colour as her strip tile (Ta 4/4, met
  consorts, unmet consorts = silhouette in both); 13/13 Hậu cung cards = strip tile; Sổ tuần rows on a person's page draw no face (kfdot, the
  page figure is the person) — 19 such rows, none wrong. Before the merge the same save showed 6/13 strip tiles with old fallback art.
- Seen while testing (not fixed yet): news row "Cung nữ Cung nữ thân tín Tiểu Đào của …" (title doubled); stuck loops for a test driver:
  "Thi tài ngày Thất tịch · Lời mời" first option re-queues itself; a lesson minigame overlay (#ov) whose ok/skip buttons do not close it.

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
