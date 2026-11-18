PRIORITY #1 CHECK ('display-set-bonus|setBonus|shelf.set'): OD 2 | ledger 0 | claims 8 | main 0 | review/* 1 (review/display-set-bonus, builder session_01UV1SzjpfceWSitedZq3R6g)

# BIG review — review/display-set-bonus (depth 3)

Reviewer: session_01UV1SzmDekHiFMVcVBmxdRT (successor of session_01UV1SzkUH3pxqYSkZMUQX7v). Foreman C-AG #10 session_01UV1SzjAd8BYMMz2rKFZitp; MAIN ROOT-45 session_01UV1SzikTZwNu6Q6dJKkcGi.
Builder declared: SẴN SÀNG KIỂM 0c97c0c3 (contains main e24d5838).

## VERDICT: PASS a95e8d4 (fast-forwardable onto live main 94a9375)

a95e8d4 = 0c97c0c3 + reviewer fixes 231cd3b + merge of live main 94a9375 (only generated files conflicted: taken from main, site rebuilt; assemble order keeps 'jshelf.js', 'jlooks.js'; jlooks last of the shelf/looks pair, jdisp after as on main).

## Owner rules checked (verbatim sources)
- OD 17/11 ~21:15Z approved table (dev/research/display-set-bonus.md @500faf22): 26 sets / 12 groups, pair +1 / triple +2 / five +3, never Sủng, 4 minus rows, cap 6, Danh ≤3, set-broken rule, NPC same, 6 new pieces. Verified by script against BAL.shelf.set: {"n":26,"cap":6,"capDanh":3,"out":[]}; every member name matches.
- OD ~20:47Z (she sees what to collect; random pieces show nothing): shelfSetLines / shelfView(S).sets, her room only. OD ~21:20Z glow: shelfView items[i].set {id,name,full}, keyed by slot, read by main's jdisp setMap.
- OD ~21:22Z name Đa Bảo Các: player text in jshelf/jdisp/KIT; VANPHONG row added by reviewer.
- One core: numbers only in BAL.shelf.set; words in SHELF_SET_N / SHELF_SET_STAT. one-core-guard / bind / text-rule PASS.
- Kit first: no new UI part; interim shelfOpen uses kitFacts; set lines + glow UI filed as KIT_REQUESTS (6). BAL.shelf.ui stays 0, so nothing new is drawn for the player yet.
- Sắc counted once: one wearBonus wrapper (b.shSac); worn-only chips (jinv, jtoil, jwdinv, j8 dressing header) and jewellery readers (j75 night prep, j8 "Điểm trang lộng lẫy") subtract shSac. Family scan: the only remaining wb.sac reader without shSac is effSac (intended total).

## Reviewer fixes (231cd3b)
1. VANPHONG §1: row "Phòng bày đồ quý → Đa Bảo Các (… của <tên>) | not Nơi/Phòng/Kệ trưng bày"; row for the set wording.
2. jshelf cap line: «Bộ X: đã đủ điểm bộ.» used the banned word "điểm" → «Bộ X: đủ bộ, nhưng đã tới mức, không thêm.»
3. j8 "Điểm trang lộng lẫy": night quality q read wb.sac (incl. shelf set Sắc) while its own label and j75 night prep read worn Sắc only → q now worn only (LUẬT SỬA CẢ NHÓM, same family).

## Gates (on a95e8d4 unless noted)
| gate | result |
|---|---|
| set-bonus-check (incl. old save, co-op guest, NPC parity) | PASS |
| shelf-check | PASS |
| one-core-guard / one-core-text-rule / one-core-bind | PASS / PASS / PASS (1219 prints, 0 mismatches) |
| it-key-guard (old save, unknown keys) | PASS |
| quickcheck --cpu 4 --runs 5 | PASS; perf median new/live: render 161/154 ms, tab 319/359, buổi 863/848, tasks>200ms 14/13; old save ok |
| coop-e2e (live Worker) | 63/63 on a95e8d4. On 231cd3b 7/10 runs clean; the 3 fails were different timing steps (fold #next enabled ×2, friend "Người lạ" ×1), then 6 clean runs in a row; main 4/4. Read as live-Worker timing flake; worth a watch. |
| display-room.js fold + ipadAir | PASS (needs an http URL; file:// times out — that was the builder's timeout) |
| rebuild = committed | yes (same build hash; only the build stamp differs) |

## Balance (Hoàng hậu band must not move)
Important: run_par.js is NOT reproducible — same seed + same build gave two different lives (turns 234 vs 35). All "paired" smokes are independent samples.
| sample | main | branch |
|---|---|---|
| builder, 65 v 65 | HH 46 %, early death 48 % | HH 46 %, early death 32 % |
| reviewer, 60 v 60 (eb3675a v 72e3e62) | HH 50 %, early death 38 % | HH 42 %, early death 38 % |
| pooled 125 v 125 | HH ~48 %, early death ~43 % | HH ~44 %, early death ~34 % |
HH difference ≈ 0.6 SE: band holds. The reviewer sample also showed lower Danh / maxRank / kids on the branch; checked:
- the sens bot never uses the shelf (no shelf call in inpage6), so the player gets no set;
- probe of NPC sets over 3 bot lives: only "Tay mình" ever whole, mean applied Tài +0.12 per NPC, no Danh / hh / th;
- CPU profile: all shelf/set functions < 1 % of bot time; quickcheck perf equal to live;
- a no-sets variant (BAL.shelf.set.s = {}) gave HH 72 % on 36 lives — above both main and branch, i.e. the spread between 12-life samples is far wider than the set code can explain.
Conclusion: no mechanism for a balance shift; differences are sample noise of a non-reproducible harness. Follow-up (not this branch): make run_par lives reproducible (the game reads wall-clock / async timing), else every balance A/B needs ~150+ lives per side.

## Visible change
Only the 6 new décor pieces (market "m" / imperial "n" pools) with description "… · bày ở Đa Bảo Các". Like every existing décor piece on main they have no picture yet (kitItemSrc "" — KIT_REQUESTS (4), Foreman C art). Set lines and glow are not visible while BAL.shelf.ui = 0. No new screen ⇒ no new shots; display-room shots (fixture, main's jdisp) looked at: fine, the cabinet picture is still missing on the CDN (main's own item).

## Notes for MAIN
- Shots were kept in scratch only; nothing on CDN img/_review/display-set-bonus/.
- Worktree /home/user/wt/rv-sb (reviewer) can be deleted after the fast-forward.
