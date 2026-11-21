# huong-cue report (worker, 21/11)
PRIORITY #1 CHECK: OD 2014/2023/1998 + 21/11 ~00:40Z bug | main: mg-noword-a/b/kit landed (j91 k91Blend) | review/* none for huong cue | claims none

Branch review/huong-cue @ 54c3adfd (base origin/main f15146ea, includes mgcal-redo). Code: dev/build/j91.js k91Blend; KIT.md §13.1 note.

## Fix
Điều hương lost its words (còn xa / đã gần / rất gần / khớp, "Mẫu nặng về X") in mg-noword; only a tiny ★ line remained. Now, no word:
- ring round her smoke swatch: wider + colour step (hair → brown → gold → kit --good + BAL.mgFx glow);
- gauge of 3 pills (T.length of BAL.mgTier.blend.star) mid-board where the stars were: 0 empty … 3 full green = matched. Same thresholds as the grade (law 4); grading untouched. Verdict ★ still replaces the gauge after Dâng hương.
Uses kit colours (--good/--gold), BAL.mgFx glow; live canvas marks only (KIT §13.1 allows). No new kit part needed.

## Whole group (law 11) — scan of mg-noword-a/-b/-kit diffs (removed word cues)
| Engine | Before | Now | Action |
|---|---|---|---|
| huong | live line "độ khớp: còn xa…khớp" + dominant scent + slider labels | ★ glyphs only | FIXED (ring + gauge) |
| hoa/chai/theu/dauho/den etc. | one-shot pops ("Vừa khéo!", "Xa quá", "Mũi kim lệch nhiều") | painted signs / pops via kg82Signs | no continuous cue lost; unchanged |
Only huong lost a live continuous closeness cue.

## Tests
mg-allkinds 7/7, mgcal-redo 10/10, mg-noword-a/b/kit pass (31 kinds 0 words), quickcheck ALL OK. coop-e2e NOT run (no origins here; engine change is canvas-only, no sync). Shots Fold 755x1000 + iPad 1180x820 far/near/vnear/match looked: steps read clearly (empty / brown 1 / gold 2 / green 3 + ring). Shots not in git.

# ROUND 2 — WIDENED (owner 21/11 ~00:50Z: guiding words come back; reading-heavy text stays out)
Branch review/huong-cue (merged LIVE a4fdb642). New sha in HANDOVER_SESSION9.md.

## What changed (one place first, then per engine)
- **kg82Sym (j82)**: the ONE filter that turned every pop/verdict word into a sign now keeps the word when it is short (BAL.mgFx.popMax = 30 chars); longer lines still fall back to a sign. This restores every short pop/verdict word of group a at once ("Vừa khéo!", "Trượt", "Khớp hương mẫu!", "Gần giống", "Lệch hương", "Xa quá…").
- **Điều hương**: words back — "Hương mẫu / Hương ngươi pha", "Mẫu nặng về <vị> · độ khớp: còn xa / đã gần / rất gần / khớp" (exact old strings), scent names under the sliders, verdict words; the ring + 3-step gauge stay.
- Hát intro line, Cắm hoa «Cân thế hoa», Khéo tay «Chỗ chỉ chéo: n», Họa/Chải groom zone labels «Giản dị / Đúng phẩm / Lộng lẫy» + their pops, Tát (slap) guiding line, Hoa đăng wind line «Gió đẩy sang phải/trái · Lặng gió», Hộ giá warning «Lau sậy bên bờ khẽ động», Đố đèn «Đèn mẫu».
- Tests mg-noword-a/-b now assert "no reading-heavy text" (> 60 chars) instead of "no word at all" (the rule was overwritten).

## Table: kind | stripped text | guiding? | restored
| kind | stripped | guiding | restored |
|---|---|---|---|
| huong | còn xa/đã gần/rất gần/khớp, Mẫu nặng về X, Hương mẫu/ngươi pha, scent names, verdict | YES | YES (+ ring/gauge) |
| hat | «Giữ ngón tay: lên giọng · buông: xuống giọng» | YES | YES |
| dauho (j91 fling) | Gió …, «Kéo ngược về sau rồi buông tay» | YES | dauho-lv5 (not touched) |
| hoa (arrange) | «Cân thế hoa», verdict «Thế hoa cân đối» | YES | YES (label + verdict via kg82Sym) |
| kim | «Chỗ chỉ chéo: n» | YES | YES |
| co (j82) | «bước n trên m» | progress | no (a/b count stays) |
| den slap (jslap) | Chạm khi kim vào vùng xanh / lướt qua giữa vùng đỏ | YES | YES |
| lantern (jlant) | «Đèn mẫu», «Đã thấy a/b chiếc» | YES / count | «Đèn mẫu» yes; count stays a/b |
| groom (j92) | Giản dị / Đúng phẩm / Lộng lẫy | YES | YES |
| hoadien (jhd) | «Kéo hoa điền vào giữa trán, nghiêng cho cân», pops | instruction | **NOT YET** (successor) |
| jnwp (tho glyph / doi mirror) | VẾ RA / VẾ ĐỐI, KHAY NÉT BÚT, hint tips, verdicts | YES | **NOT YET** |
| jnwq (thq seats, xa) | «GẦN THÁI HẬU · PHẨM CAO → XA · PHẨM THẤP», «AI MẶC ÁO…?», evidence labels | YES | **NOT YET** (do NOT bring back «phong năm …» seat label: her bug) |
| jtd (theu thread, td_ngon, td_hanh, td_cong) | Chỉ mẫu, Chạm sợi chỉ cùng màu, bắt đầu/hết nét, giữ nửa trái/phải, Thưa…, voice/mood lines | YES | **NOT YET** |
| jts steer (hoa đăng) | wind line | YES | YES |
| jts hộ giá | Lau sậy bên bờ khẽ động | YES | YES |
| kit | «Cách chơi» row hidden in play; button small lines (hint cost etc.) hidden | long sentences | NOT restored — reading-heavy; main to decide |

## Handover (rollover) — for the successor
Remaining: jhd, jnwp, jnwq, jtd rows above (replace the NWB signs / pops with the old short strings; git show cfa9156c / 9e0638f9 for exact strings; keep tests assert ≤ 60 chars), and the kit «Cách chơi» decision. Test commands: node dev/test/mg-noword-a.js / -b / -kit, mg-allkinds, mgcal-redo, quickcheck, coop-e2e.
