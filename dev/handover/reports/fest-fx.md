# fest-fx — festival night FX (owner bug, screenshot dev/handover/refs/owner-fireworks-room.jpg)

## Root cause
dev/build/jfx.js render wrapper fired kitFx("festival") (sky lanterns + fireworks) when `S.buoi===2 && festToday()`. Buổi 2 was "tối" in the 3-buổi system; with 4 buổi (sáng/trưa/chiều/tối) it is chiều. It also ignored indoor/outdoor and which festival. Tháng ba thượng tuần = FEST.thanhminh (Tiết Thanh minh, tảo mộ) — a festival that must never get fireworks.

## Fix (v2, after the owner corrections of 11/16: no fireworks; indoor/outdoor irrelevant; effect must match the current buổi AND current event)
- Fireworks layer REMOVED (FX.festival row deleted; no kind uses light "fireworks").
- Indoor/outdoor condition DROPPED.
- ONE table `FESTFX` (jfx.js) = effect x allowed festivals x allowed buổi (null = any), checked by `kfFestFx(effect)`:
  | effect | festivals | buổi |
  | lantern (sky lanterns, once per night) | nguyentieu, trungthu | tối (B4L) |
  | gold (gold/red sparks, j33 pxKind) | newyear, giaothua, nguyentieu | any |
  | fly (fireflies, j33 pxKind) | thattich, trungthu | tối (B4L) |
  Thanh minh and every unlisted festival: nothing. j33 pxKind now reads the table (before: fireflies in daytime, effects keyed by place list).
- Already buổi-gated and left: kfDeco night orbs/sparks (B4L).
QUESTION for the owner: should Giao thừa (cuối năm, đêm) keep fireworks? NOT added. Also Tết currently has only gold sparks (no sky lantern) — add lantern to newyear?

## 3-buổi leftovers audit (grep S.buoi===N / b:N / w*3+b / *3 clocks / BUK / "% 3" over every j*.js)
FIXED
1. jmen.js `night=b===2` (menPlace): thái y / vương gia / sứ thần left their post at CHIỀU and stayed at tối -> `b===B4L`.
2. jmen.js menDuty guard roster `(w*3+b+i)%3` with b now 0..3 (period broke: tối == sáng) -> `MEN_SHIFT=[0,0,1,2]` table (trưa rides the sáng shift), old balance kept exactly (2 of 3 shifts on duty, off-duty tối identical to old).
3. jmen.js tryst plans `b:2` (the "night") fell on chiều; guard-free check `menDuty(m,t,2)` -> B4L. Secret letters `[2,1,0]` -> `[B4L,2,0]`.
4. jmen.js thái y "summons" `b===1` (old chiều, now trưa) -> `b===2`; craftsmen's orders `o.b` 1 (old chiều) -> 2.
5. jstory.js absB67 `wk()*3+buổi` (non-monotonic with 4 buổi: wk*3+3 == (wk+1)*3+0, pledge deadlines could lapse early/late) -> `wk()*B4N+buổi`; dlT67 day maths /3 -> /B4N.
6. jgift.js `buoi>=3` x2 -> `>=B4L` (same value, now named).
7. Old-save migration (jtime4z deser): S.menPlans[].b and S.pl67.due/t0 re-mapped like the other 3->4 buổi fields.
CHECKED, left as is (correct or harmless)
- jkc.js `S.buoi===3`, jplx/jty/jlogsync/jcoopworld use B4L (fallbacks 2/3 only when B4L undefined — never at runtime).
- jbal2 `b:` values are achievement weights, j70 `b:` risk weights, j95 has its own 4-slot table, j94/jpm/jres/jsl have 4-name arrays, jclose WX_BUOI has 4 entries, j26/j27/j31 BUK gets "trua" spliced in by jtime4z.
- wk()/jnight/jmcal `*3` = 3 tuần per month, not buổi.
- jweather S.wx.clr (1-2 buổi after storm start) is a plain buổi offset, fine.
NOT CHANGED (balance call for the owner): jstory deadlines dl67Khan/Vua/Lon stay in buổi (4/9/21), so a pledge is ~25% shorter in real days than under 3 buổi.

## Tests — node dev/test/fest-fx.js dev <outdir> [shots]  (ALL PASS, 0 page errors)
- matrix 14 festivals x 4 buổi x 5 scenes x 3 effects = each effect true only for its festivals/buổi, scene never matters; thanhminh nothing; no fireworks row.
- end to end render(): Thanh minh chiều none; Nguyên tiêu chiều none; Tết tối none; Giao thừa tối none; Nguyên tiêu tối (garden and room) lantern; Trung thu tối lantern; Thanh minh tối none.
- old 3-buổi save: buổi 2->3, plans [2,1,0]->[3,2,0], pledge due 7->10, t0 3->4; jstory clock monotonic; guard roster tối == old tối shift.
- Shots dev/shots/fest-fx/ (Fold 755x1000 + iPad 1180x820). Fold panels are blank offline (CDN pictures).
