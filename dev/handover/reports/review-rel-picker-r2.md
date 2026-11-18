PRIORITY #1 CHECK ('rel-picker'): OD 2 | claims 2 | review/rel-picker-r2 only; reviewed per briefs/root59-rel-picker-r2-review.md.
# REVIEW rel-picker-r2 @ 9e58660e (contains origin/main 1130a49e) — verdict PASS (SMALL tier, UI only)
1. KIT FIRST: PASS. Only kit parts: pager() optional `sz` (default "sm" unchanged) feeding kit mdH xs (KIT.md 4.2); size/basis tweaks inside the existing kit-hc §49.2 block; no new frame/chip/row.
2. WHOLE GROUP: PASS. Re-ran relpick-scan.js on head: Fold 755x1000 picker 154 (def) / 167 (pick another), iPad 1180x820 154 / 167 (before 200/234); card in view yes/yes, no horizontal overflow, 0 page errors. Worker's relpick-group (72 screens) accepted; Khuê hữu/ban strips (jkc, jkc2) get the same xs.
3. LAW 10: PASS. Card portrait columns minmax(88,104) resolve to the same ~100 px on Fold and iPad; rank-tall frames (Hoàng thượng) keep the kit's own frame ratio (pre-existing).
4. old save + quickcheck on head 9e58660e: QUICKCHECK PASS (core gates, time-spill, open 1524 ms, old save loads + plays a buổi, perf render 269/209, tab 493/457, buổi 1405/1187 vs live).
5. LOOKED Fold + iPad, default Ân oán + after picking another person (shrunk): picker is two compact rows, no empty band, card + Thiện cảm/Oán rows fully in view. Minor (not blocking): Fold default leaves ~15 % empty below the card; Ta/Phi portrait frames differ in size by rank (kit).
Origin/main still 1130a49e = already merged in branch; nothing to push. Branch sha = LAND READY sha. CDN img/_review/rel-picker-r2 delete after land (main tells).
