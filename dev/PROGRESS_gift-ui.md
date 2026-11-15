# PROGRESS review/gift-ui (owner 11/15) — base: origin/main d50f5f772 merged (includes rank0-ivory jkpor)

## DONE (all tested in game, 5 viewports, no overflow)
- 4637a8bd3 Gift dialog redesign (jgift giftDialog): item picture left, item info panel, recipient tabs Chí tôn / Phi tần / Nam nhân / Cung nhân, kit rows (face, odds, cost, gain or "Cần"), ✕ close; kitOtherItem dialog (item someone else wears); giftin shows the item picture.
  Systemic Triều chính fallback fix: an id with no picture of its own gets the act-category picture from its title, recorded in KIT_PICFALL; test dev/test/dialog-art.js.
- 0ba511f57 Đoan ngọ banner: own picture via root key (j71f:doanngo); chip moved top-left, name chip 12 px off the edge; empty dots and "Tốn: không" rows removed.
- 8b9faa721 Shared-picture audit → dev/review/pic-shared.md (290 dialogs, 23 pictures, 16 shared, 121 meanings to draw, 76 fallback), scope outside act-pics2. Emperor / Thái hậu card group "Gặp ban ngày" (courtMeet: Xin yết kiến, đến gặp, thỉnh an, Dâng quà → giftto picker).
- 3ca31c972 Emperor daytime acts KM_EMPACT: Xin hầu cờ, Xin đánh đàn hầu ngài, Mời ngài dạo ngự hoa viên (odA, real success/failure, win-cleverly vs lose-on-purpose choice, the garden walk raises tonight's card odds, jealousy); NPCs use the same rule (BAL.empDay).
- 0237d795f jevban: kitEvBanner(dialog) → {src, lab, key, own}, picks img/ev-<key>.webp (keys from act-pics2 dev/figwork/acts/dlg_list.tsv) only when the file is on the CDN (_index.json); otherwise the room scene. kitEvArt uses it; kit-fig2 can call it.

- (session 2) Emperor daytime acts: one meeting a day SHARED with Xin yết kiến (accState wrapper in jgift sets st.dayDone + st.askWhy, the one reason every yết kiến button/card shows: j41 accBtns, j77 accMini/j77Card, jgift courtMeet; accAsk marks S.kmEmpDay when it spends khắc). Garden walk blocked by weather flag (S.wx.f 3 giông tố / 4 tuyết dày) instead of a name regex.
- (session 2) Dialog banners actually show: kitDlgId maps runtime pids (e68<id> → e68:<id>, q72o + pp.x.tid, j71i + pp.k, j71x + pp.kk) and KIT_CDNHAVE strips the CDN base from _index.json keys. 24/121 ev-<key> on the CDN now appear. On an own banner the stage figure overlay (.kesov) is removed (it stood a grey second person in the painting); ev-* pictures crop at 50% 14% (heads kept in the wide band).
- (session 2) No stand-in pictures (whole class): evArtOf / evArtTitle return "" for an id with no category (no more j89 default = Triều chính), jk2b kitEvArt no default, Tuần lục kbkArt: ACTS log key "-" → no picture, and the catch-all "Có người đến"/"qs:yen"(=Triều chính) only on the Emperor's / Thái hậu's own pages. Scan dev/test/pic-fallback-scan.js (bot plays, 6 steps, seed 4242):
  | | before (749ebd5f0) | after |
  |---|---|---|
  | Tuần lục distinct lines with the catch-all "Có người đến" room | 34 / 569 | 1 / 402 (a real "tặng" line) |
  | Triều chính stand-ins (book + dialogs) | 0 seen by bot (code path existed: evArtOf default) | 0, path removed |
  | own dialog banners shown | 0 | 4 (of 284 dialogs) |
  | broken act key | 0 | 0 |
- (session 2) Portrait head size for every family (jkpor on main + img/POR_FACE.json): coordinator: NO zoom beyond the approved 1.14. KIT_POR.zr = [1, 1.14], face target .2975 (5th-percentile face 0.261 × 1.14), face boxes > .40 ignored (5 false detections). por_face.py: detection on a half-size copy (4x faster), POR_PROCS env. por_family.py in sync (ZR, FACE, FBAD). Within ±3 % of the common face size: 5551/5744 (old fixed 1.14: 3973/5744). Sheets + numbers: dev/review/gift-ui-por/ (por-<family>.jpg, por_family.json).
  Cannot be done without zooming OUT below 1.0 (the picture would no longer cover the window): kid-a4 boys (faces 0.33–0.38 at z=1, 27/48 outside ±3 %), and ~90 consorts / ~50 maids with big faces (≤0.40). Fix = redraw/expand those pictures with more margin (Magnific images_expand), or allow a background fill.

## LEFT
1. ev-<key> pictures: 24/121 on the CDN (11/15 12:00Z); the rest are drawn by act-pics2. The ab06 / act-pics2 worker draws them; then nothing in the code changes (they appear on their own via _index.json).
2. Nam nhân tab is empty: there are no gift rules for men.
3. Emperor daytime acts: no balance pass yet (BAL.empDay p .06, suc 5, walkNight 15).
4. Tư trang shows handmade works as "Tác phẩm tự tay" with no picture (kinvItems → itemArt("tp")); not fixed.
5. Merge with review/act-pics2: both wrap kitEvArt. Mine only replaces ev-trieu-chinh and yields to their room-scene fallback; check the order in assemble.py after the merge (mine: jplace, jgift, jevban, j84).
6. **cdn_sync pending AFTER this branch merges** (not before: main's jkpor would read it with zr up to 1.6 = zoom): `cp dev/review/gift-ui-por/POR_FACE.json img/ && python3 dev/site/cdn_sync.py img/POR_FACE.json`.
7. kid-a4 boys + big-face consorts/maids need re-cropped art for an equal head (see above).

## Known bugs
- None open in the gift dialog. The gift / giftto dialogs set Q[0].showOut = true; otherwise kit hidden-outcome mode hides the rows.

## Tests
- serve: `python3 /home/user/ctm-work/tools/serve.py <worktree>/dev <port>` (needs the utf-8 header), then `python3 dev/build/assemble.py`
- `node dev/test/dialog-art.js http://localhost:<port>/index.html` (fails if a mapped dialog shows Triều chính)
- `node dev/tools/pic_usage.js http://localhost:<port>/index.html out.json && python3 dev/tools/pic_usage_report.py out.json dev/review/pic-shared.md`

## cdn_sync pending
- img/POR_FACE.json (copy in dev/review/gift-ui-por/) — only after merge, see LEFT 6.

## Tests (session 2)
- `node dev/test/gift-ui-shots.js <url> <W>x<H>@dpr <out> <tag>` (POR_FACE=<file> serves the manifest locally): Emperor card, hầu cờ, Dưỡng Tâm yết kiến reason, own banner, gift dialog, portrait zoom range.
- `node dev/test/pic-fallback-scan.js <url> 6`
