# PROGRESS review/tabs-kit

Base: origin/main 70c792d41 (rebased, fast-forward). Branch tip before this file: 306b001f1.

## DONE
- Kit pane rule (KIT §45, `dev/build/jpane.js`): the sub-tab / filter row is a fixed bar flush under the header; the list scrolls below it, cut at its edge. Applies to Hành sự categories, Tư trang filters, Hậu cung / Giao tình / Hoàng tự / Mệnh truyện sub-tabs. jk3 k3CatTabs finds its row by data-g; j79 kgSub finds .ksub inside the bar.
  - `dev/test/pane-bar.js`: 5 sizes, every tab, at rest and scrolled: 0 bad, 0 errors (measured on main 218a591fd and again on 6e6c2ae6d).
- Tài nghệ, Mệnh truyện, Việc nhờ rebuilt with kit parts (KIT §46, `dev/build/jtabs.js`):
  - sub-tabs with "làm được/tổng" counts, doable first;
  - skill head (picture, 5-step bậc, tiến bộ bar, next unlock chip);
  - kitActCompact (thumbnail act card);
  - rules behind ⓘ glosses;
  - sắc phong as ✓/✗ check rows;
  - empty vignettes;
  - Nợ ân as person rows;
  - header numbers as chips.
  - `dev/test/tabs-kit-shots.js`: 5 sizes, every sub-tab: 0 bad, 0 errors. Shots are in dev/shots/tabs-kit (412x1058, 1180x820).
- `dev/test/minigame-tap.js` works with the luân hồi start screen and opens the Cầm kỳ thi họa sub-tab.

## Round 2 (resumed in a sparse worktree, main still 70c792d41)
- Tác phẩm sub-tab rebuilt with kit parts (ktWorksHTML in jtabs.js): kitSkillHead per art, kinds as kchips, ⓘ Tác phẩm gloss; was a paragraph + bare divs. Việc nhờ "Đang làm" stays the kit pcard pager (same as Hậu cung).
- ktDoable/ktTotal also count `data-wk="prac"` (the real attribute).
- pane-bar.js: the "content over the bar edge" check only counts elements inside #panel (a game overlay once flaked 1000x755).
- Re-tested at 755x1000, 1000x755, 1180x820, 1366x1024, 844x390 (+390x844, 412x1058): pane-bar 0 bad, tabs-kit-shots 0 bad, minigame-tap ok, 0 page errors.
- No rotate prompt exists on main at 390x844 (game simply renders portrait); not in this branch's scope.
- KIT numbering clash: §39/§40 clashed with main (kitSeal, APP ICON) and kit-fig2 / ts-a / kitRelTable; reviewer tabs-kit-r6 renumbered this branch to KIT §45 (pane) and §46 (kit tabs), leaving §41–§44 free. When kit-fig2's kitActCompact lands, fold jtabs kitActCompact into it.

## LEFT
- kitActCompact is my own spec. When kit-fig2 (a85ed9d7e3e67c112) pushes its kitActCompact, switch to it.
- The bottom-right button "Qua ngày" → "Sang ngày mới" is owned by kit-close. Do not reintroduce "Qua ngày".
- The pane bar uses sticky-at-top inside #panel: opaque, nothing above it, flush. It is not a separate DOM scroller. If a reviewer requires a real separate scroll body, restructure #panel (jk2b/jhc use P.scrollTop).

## Known bugs
- "Điều kiện sắc phong" shows the next rank from RANKS[rank+1], e.g. "Phi" for a Tần. This is pre-existing, from promoReq.

## Test commands
Build with `python3 dev/build/assemble.py`, then wrap dev/index.html as _aa.html (doctype + meta) and serve the worktree root.
- `node dev/test/pane-bar.js http://127.0.0.1:8833/_aa.html [--shots dir]`
- `node dev/test/tabs-kit-shots.js http://127.0.0.1:8833/_aa.html <outdir|->`
- `node dev/test/minigame-tap.js http://127.0.0.1:8833/_aa.html`

## cdn_sync
None pending. Only existing CDN images are used (art-*, vir-*, info-*, act-*).

## Review r6 (11/15, review/tabs-kit-r6 = tabs-kit c9cd7e7cd merged on main 114887bc1) — FAIL (kit only; all tests pass)
- Merge: conflicts in assemble.py (kept main's jseal.js + added jpane.js, jtabs.js before j84) and KIT.md. KIT §39/§40 of this branch renumbered to
  **§45 (pane bar) / §46 (kit tabs)**; main already has §39 kitSeal / §40 APP ICON; kit-fig2 (§39/§40), ts-a (§39), kitRelTable (§39) still need
  numbers — §41–§44 left free for them (note under §44/§45 in KIT.md). File headers of jpane/jtabs/pane-bar/tabs-kit-shots updated.
- Tests (all green): pane-bar 6 sizes × 8 tabs 48/48 ok, 0 errs; tabs-kit-shots 5 sizes × 10 sub-tabs 50/50 ok, 0 errs; minigame-tap 3/3 at
  755x1000, 1000x755, 1180x820, 1366x1024, 844x390; old save (made with main build) loads at 5 sizes, tabs render, no overflow, 0 errs.
- FAIL items (kit rule 16:50Z):
  1. `kitSkillHead` (.ksk2) is a SECOND skill card beside KIT §21 `kitSkillCard` (.kskill, "every art and every Tứ đức course uses it"); §21 was
     not changed and kitSkillCard is now dead. One skill card only: evolve kitSkillCard into the new form (steps, bậc kế chip, compact acts) and
     update §21, or retire §21 explicitly and delete kitSkillCard + its CSS.
  2. New picture tiles `.ksk2art`, `.ktqart`, `.kemptyart` (64/56 px) and the act thumbnail `button.ka[data-kacc]::before` (40 px) are drawn with
     their own CSS, against KIT 28.19 / 31.10 ("kitSceneArt / kitArtFrame = THE ONE non-person picture component"). Needs a kit size of
     kitSceneArt (small/thumb) — KIT REQUEST to coordinator — then use it.
  3. `kitActCompact` (jtabs) duplicates review/kit-fig2's kit part of the same name (jk4 `kitActCompactOn`, kit-fig2 KIT §39, "only the act's
     own picture, no category picture"); jtabs falls back to the skill picture. Wait for / reuse kit-fig2's part, do not ship a second one.
  4. `.ktq` (Mệnh truyện chapter / sắc phong head card) and `.kempty` are new card frames; take them through the coordinator as kit parts
     (KIT REQUEST) or build them from an existing kit card (kitPanel / kitRows / kitInfoArt) before use.
  5. Minor: Việc nhờ › Đang làm at 755x1000 — the single compact act card sits in a 1/2-width column and wraps "Được" into 4 lines while the
     rest of the row is empty (.ktacts minmax 300px); let a lone card take the full row.
