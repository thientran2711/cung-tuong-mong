# PROGRESS review/tabs-kit

Base: origin/main 70c792d41 (rebased, fast-forward). Branch tip before this file: 306b001f1.

## DONE
- Kit pane rule (KIT §39, `dev/build/jpane.js`): the sub-tab / filter row is a fixed bar flush under the header; the list scrolls below it, cut at its edge. Applies to Hành sự categories, Tư trang filters, Hậu cung / Giao tình / Hoàng tự / Mệnh truyện sub-tabs. jk3 k3CatTabs finds its row by data-g; j79 kgSub finds .ksub inside the bar.
  - `dev/test/pane-bar.js`: 5 sizes, every tab, at rest and scrolled: 0 bad, 0 errors (measured on main 218a591fd and again on 6e6c2ae6d).
- Tài nghệ, Mệnh truyện, Việc nhờ rebuilt with kit parts (KIT §40, `dev/build/jtabs.js`):
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

## LEFT
- kitActCompact is my own spec. When kit-fig2 (a85ed9d7e3e67c112) pushes its kitActCompact, switch to it.
- After the rebase onto 70c792d41 (shop-fix), the tests were not re-run: the run was cut off (exit 144). Re-run pane-bar and tabs-kit-shots on all 5 sizes.
- Owner (A): the Việc nhờ "Đang làm" pager and the Tác phẩm (works) section are still the old cards inside the sub-tabs. Make them kit cards too.
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
