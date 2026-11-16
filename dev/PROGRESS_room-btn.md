# review/room-btn (queue C28) — header "‹ Phòng" bar → painted room icon button
Owner (15/11): "Làm thành biểu tượng phòng hay sao để bấm đi." Spec: OWNER_DECISIONS "Header ‹ Phòng bar → a room icon button".

## Done
- KIT §75 `kitBackBtnHtml(kind,label)` (jk3.js): painted icon + short label, class `.kbackb` (NOT `.kbk`/`.kbb`: both taken by the week book). Used by `#k3room` (header) and `#tomap` (stage).
- `#k3room`: icon + "Về phòng" / "Về <place>" (tooltip + aria-label); no border/ground; >=600 px right column under the time block; <600 px icon only under the menu button
  (jk4 grid areas "menu me" / "room tc" / "stats stats"; the old third column collapsed to 0 px at 390 so the old "‹ Phòng" was clipped too).
- `#tomap` ("‹ Bản đồ" on a place stage reached from Dư đồ): same part, map icon, paper pill over the art.
- Art (Magnific gpt-2-6, folder ba4aecfe…, both looked at, white ground flood-filled to alpha, 128 px WebP): img/kit/ico-room.webp 7.5 KB, img/kit/ico-map.webp 7.4 KB.
  Style = the HUD stat icons (duc/bac/sac…): gouache, cream/red/gold/jade, transparent.

## PENDING CDN UPLOAD (Cloudflare token fails auth: HTTP 401)
- img/kit/ico-room.webp, img/kit/ico-map.webp — in worktree /home/user/wt/room-btn/img/kit/ (img/ is git-ignored). Run `python3 dev/site/cdn_sync.py img/kit/ico-room.webp img/kit/ico-map.webp`.
  Until uploaded the img 404s and `onerror` removes it (label stays) — no break.

## Scan (family) — `python3 dev/test/room-btn-scan.py`
| | text place-back bars | kitBackBtnHtml sites |
|---|---|---|
| before | 3 (j38 tomap, jk3 create + relabel) | 0 |
| after | 0 | 3 |
Out of scope on purpose: "‹ Lui" (kit dialog kbtn.alt), pager ‹ ›. No other header back bars exist (room button exists only in the phone shell < 1000 px portrait).

## Tests `node dev/test/room-btn.js` (icons routed from img/kit locally)
- 755x1000: panel view button 103x34 (home label), away "Về Kính sự phòng" 147x34, no bar, in header, img loaded, tap -> room view, 0 errors.
- 390x844: 30x36 icon only, same checks. 1000x755 / 1180x820 / 1366x1024 / 844x390: no room button by design (not phone shell), 0 errors.
- #tomap measured 91x38 at 755 (screenshot not possible: Luân hồi roulette covered the stage in my script).
