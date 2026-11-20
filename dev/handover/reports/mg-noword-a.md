# mg-noword-a — SẴN SÀNG KIỂM (branch review/mg-noword-a, sha cfa9156c, on main a1aa8b19)
PRIORITY #1 CHECK: OD:L1264 + OD 20/11 ~05:10Z | main: no text-sign table | review/mg-visual d147f8a1 (cook; fx not touched) | claims mg-visual, mg-noword-b.
START_CTX ~8 %, finished well under the roll-over line.

## What
- ONE kit table `kg82Sym` (j82): every pop word becomes a sign (★★★/★★/★ how well, ✗ miss, ▼ look here, ↻ again, a/b count). kg82Pop, k91Say and the slap result go through it, so group b's kinds follow too.
- Buttons in play are signs (`?` hint, `✓` done), the word only in the tooltip (k91Btns takes a 4th item).
- k91DemoCard (in-play "CÁCH CHƠI" card) is off: the shared rules screen already teaches before «Sẵn sàng».
- Removed/replaced canvas labels: dan string names; hat lyric words → ♪, hint → ● ↑ ○ ↓; dauho wind words → · ~, hint → ↙; ve picture name; hoa Thiên/Nhân/Địa, length words, "Cân thế hoa"; kim "Chỗ chỉ chéo" → ✕ n; mua move words + "bước n trên m" → n/m; huong labels (◎ sample, ● hers, ★ closeness, no jar names); doden lamp text/"Đèn mẫu" → count; den wind words → → ← ·; tat/ne hint line removed.
- Test dev/test/mg-noword-a.js (hooks canvas fillText + DOM, play AND «Hướng dẫn», kit chip/rules block skipped): 15 kinds.

## Scan (Fold 755x1000) kind | words before → after
dan 5→0 · hat 14→0 · co 2→0 · dauho 2→0 · ban 0→0 · ve 1→0 · hoa 8→0 · theu 0→0 · kim 1→0 · mua 10→0 · huong 8→0 · doden 5→0 · den 3→0 · tat 6→0 · ne 6→0 (+ pops by source via kg82Sym).
## Tests
mg-noword-a all 15 clean (play + tutorial, no page errors); mg-ready-guide PASS 9/9. (dev/test/quickcheck.sh does not exist on main; mg-ready-guide used.) Shots LOOKED on Fold + iPad (huong, mua, hoa): only pictures/signs in the board.
## Notes for main / art
- Still words in the frame: the kit's "CÁCH CHƠI" line above the board and the HUD chips (Hồi/giây) — kit parts, left (rules row/numbers). Decide if the rules row must go.
- KIT_REQUESTS (painted icons wanted to replace glyph signs): hint (?), done (✓), huong sample/hers markers, hat ●↑○↓, dauho pull-back arrow. Glyphs used until then.
- Merge note: kg82Pop/k91Say/k91Btns/k91DemoCard touch the same lines as mg-visual/mg-noword-b; trivial merge.
- Not done: iPad/other-device shots of every kind; ban/theu already had no text.
