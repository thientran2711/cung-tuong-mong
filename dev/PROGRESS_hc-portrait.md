# PROGRESS review/hc-portrait (worker, session 8 queue)

Owner 15/11: "Ảnh 1 phía trên này còn dư chỗ nhiều nè, ảnh 2, 2 bên trái phải còn dư kìa, kéo giãn cạnh trái và phải cho khung avatar to bề ngang xíu đi."
(refs on docs branch: dev/handover/refs/owner-hc-portrait-top-gap.jpg, owner-hc-portrait-width.jpg)

## Cause
- Person card cell `.pc>.pcl>.pcp.kit` = the whole 550x1037 frame canvas at column width, top trimmed by ONE constant (KIT_PORT_TRIM .015,
  the tallest crest). Low-crest frames (Người lạ stone frame: art starts at row ~97 incl. its crest, consort-0: 184) left a 40–70 px empty
  band under the name; the name block was also padded to 2.4em.
- Narrow frames (Người lạ, consort-0..3, maids, mamas, eunuchs…) span only ~81 % of the canvas width → empty space left and right.

## Fix (one kit part, every pcard: Chí tôn / Phi tần / Nam nhân / Cung nhân, stage pop-up card, kit page)
- `dev/build/jhcpor.js` (assembled before jph.js): KIT §36.4 amendment (KIT.md).
  - WIDE frame variant `img/kit/frame-<x>-w.webp` for 32 frames (emp/thaihau already full width → s = 0, no file used), made by
    `dev/tools/frame_wide.py` (content-aware seam insertion only through plain bar segments; corners, side bars, crest, pendant untouched;
    looked at all 32). Uploaded to the CDN (32 files, 1.9 MB total, each about the size of its original). Table `KIT_FRW` = dev/tools/frame_wide.json.
  - Portrait NOT zoomed (KIT_POR face size unchanged): ground widens, por clip widens by s, picture's side edges fade (mask).
  - Cell top = higher of frame art top and KIT_CREST crest top, 4 px under the name; bottom under the tassel. Constants per frame (no measuring).
  - Name block keeps its natural height (flex-shrink 0; the 2.4em pad removed inside wide cells).
  - Fallback: a -w file that fails to load → normal frame (kitFrwErr).
- Trade-off (stated in KIT.md): the box top now differs between tall-crest and low-crest frames (owner's newer ruling: no empty band). The
  180 ms cross-fade on person switch stays.

## Tests
- `dev/test/hc-portrait.js <url> <WxH> <out> <tag> [known] [shots]` (LOCAL_W=<dir> serves -w frames before upload). Measures name, cell,
  window, last left-column item, column scroll, page overflow per sub-tab + a "Người lạ" pick.
- Window width (px) before → after, 1180x820: Người lạ 140 → 173, maid 140 → 165, consort-7 140 → 147, Emperor 140 → 140.
  755x1000/820x1180: 165 → 191–205. Cell starts 4 px under the name everywhere (was +40–70 px band on low crests).
  No page overflow at 755x1000, 1000x755, 1180x820, 1366x1024, 844x390; chips stay in the left column (scrollable as before; columns got shorter).
- Network flakes through the proxy sometimes leave a picture unloaded in a shot (same on main); re-run.

## Not done / notes
- assets.json (offline precache list) not regenerated for the -w files (coordinator's site build owns it); they load on demand like any img.

## Review r1 (reviewer, review/hc-portrait-r1, merged onto main 2d038139e)
- Looked at all 32 -w frames vs originals (full + close-ups of crest/top bar/pendant): no visible seam, stretch or doubled ornament.
- Fixed here: (1) -w frames warmed on panel render (first switch showed a frameless portrait); (2) 180 ms FLIP slide of the cell + column
  when the per-frame box top changes (measured shifts 3–21 px at 1180x820); (3) fallback: kitFrwErr never ran for a -w already broken
  in the cache — sweep after render + KFRW_BAD; tested with -w routed to 404 (SW blocked): normal frame, old layout.
- Owner 16/11 "Mất chữ" (roster labels cut under the sub-tab bar): KIT 45.2 in jk2b kitPcSize (pane bar bottom + gap). Table in KIT.md §45.2.
- Old save made with the pre-change build loads; all Hậu cung sub-tabs render the card.
