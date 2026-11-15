# PROGRESS review/gift-ui (owner 11/15) — base: origin/main (branched from it, no merge yet)

## DONE (all tested in game, 5 viewports, no overflow)
- 4637a8bd3 Gift dialog redesign (jgift giftDialog): item picture left, item info panel, recipient tabs Chí tôn / Phi tần / Nam nhân / Cung nhân, kit rows (face, odds, cost, gain or "Cần"), ✕ close; kitOtherItem dialog (item someone else wears); giftin shows the item picture.
  Systemic Triều chính fallback fix: an id with no picture of its own gets the act-category picture from its title, recorded in KIT_PICFALL; test dev/test/dialog-art.js.
- 0ba511f57 Đoan ngọ banner: own picture via root key (j71f:doanngo); chip moved top-left, name chip 12 px off the edge; empty dots and "Tốn: không" rows removed.
- 8b9faa721 Shared-picture audit → dev/review/pic-shared.md (290 dialogs, 23 pictures, 16 shared, 121 meanings to draw, 76 fallback), scope outside act-pics2. Emperor / Thái hậu card group "Gặp ban ngày" (courtMeet: Xin yết kiến, đến gặp, thỉnh an, Dâng quà → giftto picker).
- 3ca31c972 Emperor daytime acts KM_EMPACT: Xin hầu cờ, Xin đánh đàn hầu ngài, Mời ngài dạo ngự hoa viên (odA, real success/failure, win-cleverly vs lose-on-purpose choice, the garden walk raises tonight's card odds, jealousy); NPCs use the same rule (BAL.empDay).
- 0237d795f jevban: kitEvBanner(dialog) → {src, lab, key, own}, picks img/ev-<key>.webp (keys from act-pics2 dev/figwork/acts/dlg_list.tsv) only when the file is on the CDN (_index.json); otherwise the room scene. kitEvArt uses it; kit-fig2 can call it.

## LEFT
1. ev-<key> pictures: 0/121 were on the CDN when checked. The ab06 / act-pics2 worker draws them; then nothing in the code changes (they appear on their own via _index.json).
2. Nam nhân tab is empty: there are no gift rules for men.
3. Emperor daytime acts: no balance pass yet (BAL.empDay p .06, suc 5, walkNight 15).
4. Tư trang shows handmade works as "Tác phẩm tự tay" with no picture (kinvItems → itemArt("tp")); not fixed.
5. Merge with review/act-pics2: both wrap kitEvArt. Mine only replaces ev-trieu-chinh and yields to their room-scene fallback; check the order in assemble.py after the merge (mine: jplace, jgift, jevban, j84).
6. Portrait-family normalisation lives on review/rank0-ivory (see dev/PROGRESS_rank0-ivory.md there).

## Known bugs
- None open in the gift dialog. The gift / giftto dialogs set Q[0].showOut = true; otherwise kit hidden-outcome mode hides the rows.

## Tests
- serve: `python3 /home/user/ctm-work/tools/serve.py <worktree>/dev <port>` (needs the utf-8 header), then `python3 dev/build/assemble.py`
- `node dev/test/dialog-art.js http://localhost:<port>/index.html` (fails if a mapped dialog shows Triều chính)
- `node dev/tools/pic_usage.js http://localhost:<port>/index.html out.json && python3 dev/tools/pic_usage_report.py out.json dev/review/pic-shared.md`

## cdn_sync pending
- none from this branch (ev-<key>.webp come from the art worker).
