# review-kit-size-8-r1 (reviewer, sonnet, 11/16/2026)
START_CTX about 5 % of the window (estimate). No rollover needed.

VERDICT: PASS 61c3283d (review/kit-size-8-r1 = review/kit-size-8 @ 1a296f39 merged on origin/main 08725411; its ancestor is current main, so main can fast-forward it).

Merge notes: conflicts only in build outputs (index.html, sw.js, assets.json, rebuilt), dev/build/assemble.py (took main's file list + jksize.js after jeitem.js) and dev/kit/KIT.md section 23 (kept main's no-tabs text, replaced the old caption "trang 2/4 · 52 dung mạo" with "trang 2/4", no face count). j79.js caption confirmed: `trang x/y` only.

Checks (all on the merged build, served via cdn-overlay-serve; CDN is blocked in this sandbox, so pictures are beige boxes, layout only):
- kit-size8-lux: box/frame 0.227 (md, lg, xl), 0.269 sm, 0.241 slot; offsets 0.026-0.027; errors 0. One master for every kitItem caller (bag shot at 1180x820 shows the same box on every cell).
- kit-conform 755x1000: CONFORMS 100, MISSING 3, MIXED 0. 1180x820: CONFORMS 100, MISSING 2, MIXED 0, floats none. MISSING = contest + cold-palace (stale scenarios, already known) and place:etq at 755 only: the test line 83 calls accEtqCard(pl) without the `then` argument (page error "then is not a function" when that place has no etiquette card). Line comes from f0766462 (not from #8). With a local copy passing a no-op, 755 gives CONFORMS 101 / MISSING 2. Not a #8 fault; suggest the keeper fixes the test line later.
- kit-size5: 755x1000 and 1180x820, no overflow, no cut text, daHieu 0, errors [] (evidence scrolls inside XL by nature).
- coop-e2e 59/59 (both seats, rejoin, rebirth, solo + old save). quickcheck: QUICKCHECK PASS (open 960 ms, old save ok, render 250/253, tab 270/279, buổi 833/873).
- Shots looked at (local shots.js with 9 s wait, not committed): Fold 755x1000 and iPad 1180x820 of place cards tgk and ttp (ONE picture, rows below, option button with its picture, no second event picture), person-naming option (Hỏi thăm + rank-coloured name shows THAT person's portrait, other option keeps the act picture), face picker (caption "trang 1/5", no count), bag (Xa xỉ box inside the kit frame, same on all cells). No overflow, no page errors.
- Kit scan: no private chip/row/frame found in the changed parts (single guard in the jk2b hook, single rule in kitOptPic, single Xa xỉ master in kitItem; kszItem3 reuses it). BAL/VANPHONG not touched by this diff. Old save loads (quickcheck old save + coop-e2e).

Not built, as announced: grade-chip overlay on the item frame edge (open owner question) -> not a FAIL.

Open nits (non-blocking): the kit-conform place:etq test line above.
