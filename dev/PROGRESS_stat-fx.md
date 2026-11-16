# PROGRESS review/stat-fx (queue C26) - slow, readable stat +/- with a green/red cell glow
Owner (15/11 s8): "+/- animations too fast, can't tell what changed" / "Danh cell glows: green if +, not gold" / "Tại sao + mà màu đỏ".
## What changed (branch review/stat-fx, base origin/main 3ef079f6)
- NEW `dev/build/jstatfx.js` (KIT 57.1, in KIT.md + kit page sample): `kitStatFx` / `kitStatGlow` / `kitStatFxSkip` / `kitStatDelta`. Label with stat NAME + delta,
  held/flown slowly (1.6 s hold, or 0.9 s hold + 1.5 s flight from the result card), queued 0.7-0.95 s apart, tap skips; target cell glows GREEN (+) / dim RED (-),
  3 pulses ~2.6 s, number scales 1.15x. Gọn = glow only; reduce-motion = steady glow. Added to assemble.py after jfxkit.js.
- `popNum` (j1, every apply()), `coinPop` (j11), `kfNumbers` (jfx, result card), old gold `kfhit/kfhit-r` (bag, coins in jitev/jkrev/jfx) all route to it (kfhit timers 700 -> 2700 ms).
- `kitStatSet` (jk4): a changed number in any non-HUD cell/tile (person card, status sheet) glows too.
- Gain-in-red family (owner screenshot "tiến bộ Thêu thùa +1..2" red): root cause `KHOST=/thù/` substring matched "thùa". `KRED/KHOST/KGOOD` are now whole-word (`KWB`, j19);
  KÈM rows keep an explicit gain green (`kemCol`).
## Scan (LUẬT SỬA CẢ NHÓM) - `python3 dev/test/stat-fx-scan.py`
745 signed effect strings in dev/build/j*.js coloured by the old vs new kcls: 11 change colour (all corrections), 0 left "+N red" without a hostile word.
| file | string | before | after |
|---|---|---|---|
| j10.js | }s.loyal=cl(s.loyal+5,0,100);evA(o,a,1);relAdd(a,o,-5);return  | g | r |
| j10.js | >Che chở<small>Danh -2</small></button><button data-sv= | g | r |
| j19.js | tiến bộ Thêu thùa +1..2 | r | g |
| j25.js | Danh ${RANKS[r+1].d}${p.hh<=-40&&r+1>=2?' | g | n |
| j6.js | }>Ban thưởng<small>Bạc -30 | g | r |
| j75.js | Mất: Bạc 300→295 (−5) | n | r |
| j85.js | đầu mỗi mùa thơ truyền ra ngoài: Danh +1 | r | g |
| j85.js | đầu mỗi mùa tranh được truyền xem: Danh +1 | r | g |
| jload.js | calc(env(safe-area-inset-bottom,0px) + 2px) | g | n |
| jtsb.js | Mất: thiện cảm -5 | g | r |
| jtsb.js | Mất: thiện cảm -3 | g | r |

(j25 "Danh ${...}" and jload "calc(... + 2px)" are not effects. "Che chở Danh -2", "Ban thưởng Bạc -30", "Mất: Bạc ... (-5)", "Mất: thiện cảm -5" were green losses, now red;
j85 "Danh +1" lines and the Thêu thùa line were red gains, now green.)
DOM scan `node dev/test/stat-fx-scan.js <url>`: 240 coloured values over every tab + act cards, 0 sign/colour contradictions.
## Tests `node dev/test/stat-fx.js <url> <out>` (VPS=fold,... picks sizes)
Label name+delta, glow green/red, label alive at 1.6 s and gone by 3.1 s, 4 changes queue ~0.7 s apart, Gọn glow-only, tap skips queue, result-card path flies +
both cells glow, 0 page errors, no horizontal overflow. 755x1000, 1000x755, 1180x820, 1366x1024, 844x390: all PASS.
## Open / notes
- A gain that still sits in a KÈM row should move to ĐƯỢC (review/act-text owns wording); here only the colour is fixed.
- No new images (nothing for CDN).
