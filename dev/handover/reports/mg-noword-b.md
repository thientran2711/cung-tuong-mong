# mg-noword-b — SẴN SÀNG KIỂM (branch review/mg-noword-b, sha 7e0d6c26 (first no-text pass b22ca51f; newest main merged))
PRIORITY #1 CHECK ('noword|chữ trong mini'): OD:L1264 + OD 20/11 ~05:10Z | main: none | review/mg-visual d147f8a1 (Nấu ăn pictures, not on main) | review/mg-noword-a cfa9156c (group a; same «?» / «✓» signs, kg82Sym) | claims mg-noword-b only me.
START_CTX ≈ 8 %; ended ≈ 45 % (no rollover needed).

## What
No word on screen during PLAY (and in «Hướng dẫn») for group b: td_cong td_dung td_ngon td_hanh chai le tc xa thq hoadien duho kinh may doi tho. Rules screen / kgr untouched. Numbers, score, clock, HUD round chips stay.
- NEW dev/build/jnwb.js (after jnwq in assemble.py): `NWB` = ONE sign set — hint button «?» and done «✓» (same `.kgbtn` signs as group a), svg icons (voice, rotl/rotr, shield, bowl, person elder/child/sick/adult, cross), `NWB.pips` (dots), `NWB.POP` (✓ ✗ ★ ★★ ★★★). Word only in `title`/`aria-label`.
- CSS `#kg82.kg-run .kghow{display:none}`: the frame «Cách chơi» sentence goes while a game runs (every kind; it stays on the rules screen).
- jtd (td_*): labels/words → ▼ ▶ ■ ◀ ▶ ▲ ▼, speaker rank = 1–3 dots, Thưa = voice icon, Xong = ✓, Hạnh rows = person sign + need pips + bowl pool (no sentence), hint ring only (no Ma ma line).
- jnwp (tho, doi): hint «?», result = stars, strokes = dots, panel captions + tips removed. jnwq (le tc thq xa): «?»/«✓» buttons, tips/captions/colour words removed (captions stay on the demo card only), ♛ for Thái hậu, ◷ year, result stars or a/b.
- j92 chai: zone words → ○ ◈ ✿✿, step = 3 dots, pops ▼ ✓ ▲. jhd hoadien: tilt = ↺ ↻ icons, Dán = ✓, pops stars. jts duho: label/tips removed, alarm «!», Hộ giá = shield icon, pops signs. j91 k91Trace (kinh, may): figure name → dots, verdict stars.
- Test dev/test/mg-noword-b.js: per kind: play + «Hướng dẫn» (canvas fillText/strokeText + every visible DOM text node of #kg82 except rules/header/chips) → 0 words. ALL OK on the merged tree. mg-ready-guide PASS 9/9 (run before the final merge; engines unchanged since). banh (Nấu ăn) prints INFO only: it is fixed on review/mg-visual, so it passes once that lands (run with MGV_STRICT_BANH=1 then).

## Scan (755x1000, words in play: before → after)
| kind | before | after |
|---|---|---|
| tho / doi | hint+sub, «CÁCH CHƠI…» card, VẾ RA/VẾ ĐỐI/KHAY, glyph name, verdict words | 0 (? + signs) |
| td_cong | Chỉ mẫu, Chạm sợi chỉ…, bắt đầu/hết nét, Gợi ý, Ma ma, Xong mảnh này, pops | 0 |
| td_dung | nghiêng trái/phải, ◀ trái, giữ nửa…, pop sentence | 0 |
| td_ngon | who·class, sắc mặt…, phase words, lớn/khẽ, band word, Thưa, pops | 0 |
| td_hanh | Còn lại, Việc cần, names+notes, cần N phần·nhận, Phát xong | 0 |
| chai | Giản dị / Đúng phẩm / Lộng lẫy, step names | 0 |
| le tc thq xa | MẪU/BÀN LỄ/Kho…/Thái hậu/GẦN THÁI HẬU…/AI MẶC ÁO…/colour+thing words, tips, Gợi ý/Xong, verdicts | 0 |
| hoadien | prompt line, Nghiêng trái/phải, Dán, pops | 0 |
| duho | Tầm tay, Lau sậy…, Hộ giá, pops | 0 |
| kinh / may | HÀNG KINH THỨ… / TAY ÁO…, verdict | 0 |
| banh | words (cook) | waits for mg-visual |

## Shots (looked, Fold 755x1000 + iPad 1180x820, all 15 kinds, contact sheets)
https://ctm-img.victoria-tntt.workers.dev/img/_review/mg-noword-b/sheet-fold.png · .../sheet-ipad.png (delete after the verdict).

## Notes for main
- Painted signs wanted: dev/kit/KIT_REQUESTS.md «mg-noword-b» (svg placeholders replace in ONE place, NWB.P).
- Not touched (not mine): den/tat/ne/steer labels (group a), group a kinds, BAL.mgFx, pops code. Group a's kg82Sym/k91Btns/k91DemoCard-off will merge beside this; if k91DemoCard is switched off my «demo» paths are simply null.
- Possible merge conflict with mg-noword-a in j91 k91Trace (verdict/label lines): take either side (both stars/dots).
- Frame header title («Lễ nghi: …») kept: it names the game, not an instruction.

## ROUND 2 (ROOT-74 asks, same branch): CLARITY + thq bug
- thq «phong năm 209.8» = real bug: guest year lived in field `y`, which the place-engine overwrites with the PIXEL y of the card. Field renamed `yr` (jnwq); regression check in mg-noword-b.js. Header words / «Thái hậu» word card were already gone (♛ + ◷ n only).
- Rules screens by PICTURE: NWB_DEMO (jnwb.js) draws a wordless looping animation in place of the generic dot demo (kgReady hook in j82): tdwalk (floor arrow → bowl tips → hand HOLDS the opposite half → bowl stands), tdalms (hand taps «+», pips fill, ✓), tdtalk (dots → green ring → hand holds voice → bar rises into band → ✓), tdthread (sample colour → tap same thread → needle draws the line), groom (needle on bar, tap in the green, ✓). Under Cảnh động off the CSS animation is off.
- Text cut: td_* rules = 2 short lines (TD_RULES + KG82_KIND.how), «Ví dụ» row and the «Gợi ý: Chơi dễ…» row removed; the frame «Cách chơi» row is hidden on the rules screen too (the .kgr block already says it). chai had NO rule text (how:"") → one line added.
- «Hướng dẫn» = the existing guided round (hand from KG82.peek, td_dung hand holds the half to press) — unchanged, mg-ready-guide PASS 9/9.
- Not touched (as told): env.zw / green-zone NaN (mg-env), touch highlight (mg-visual).

| kind | clear before? | change |
|---|---|---|
| td_dung | NO (owner) | picture demo (arrow → tip → hold half → upright), 2 short lines |
| td_hanh | NO (owner) | pips + person signs, demo (tap + fills pips, ✓), 2 short lines |
| td_ngon | weak (3 long lines) | demo (wait ring, hold voice, band), 2 short lines |
| td_cong | weak | demo (colour match then stitch), 2 short lines |
| chai | NO rule line | demo + one line |
| le tc thq xa | ok (drag/tap picture; sample on board) | text only trimmed by removing duplicate «Cách chơi» row; generic drag demo kept |
| tho doi kinh may | ok (numbered green dot + dashed lane) | generic drag demo kept |
| hoadien duho | ok-ish (drag / swing generic) | unchanged; a painted demo would be nicer (art order) |
