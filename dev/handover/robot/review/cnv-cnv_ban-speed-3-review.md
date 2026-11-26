# Review — cnv-cnv_ban-speed-3 (speed (bold bot))
Run rerun-cnv-cnv_ban · harness 8f20a330 (+F10 watchdog) · born cnv, road cnv_ban · seed 672669439.
Summary: UNFINISHED (hang). Reached year 20, buổi 2819, then «Page crashed» (tab crash). No ending seen, so this life does not count as valid. Evidence kept for F10: speed-3.hang.json, ckpt lategame-speed-3.ckpt.json (buổi 2493) and crash-speed-3-b2819.ckpt.json (buổi 2819).
Caveat: autonomous run, not watched live; scores from harness logs, trace and shots I opened (end.png). n/a = not honestly scorable.

## Scores
- a. First 15 minutes: n/a.
- b. Gameplay loop & pacing: 2/10. ~+40 buổi in 3 h late game; the page slows to a crawl, then crashes.
- c. Buttons & UI: 3/10. 11 dead buttons: pet-shop «Xem …» covered by b.kidn / span.kitb in #mb ×9, «Lui» of «Nhờ thái giám tìm thú nuôi» no effect ×2.
- d–g: n/a (life not finished).
- h. Mini-games: n/a. i. Visuals: n/a. j. Co-op: n/a.

## Top 3 hated
1. Late-game slowness then a tab crash at buổi 2819 (F10 case, fix 008662ef on review/renderer-mem).
2. Pet-shop buttons under a cover (dead-fold shots).
3. «Lui» does nothing on «Nhờ thái giám tìm thú nuôi».

## Bugs
1. Page crash at buổi 2819 (log: PAGE CRASHED, exit 3).
2. Late-game hang family: see speed-3.hang.json.
3. Pet-cover dead buttons ×9, «Lui» no effect ×2 (noeffect-1795664285043.png).
4. Year 20 reached without a forced age-30 end: see report scope note.
