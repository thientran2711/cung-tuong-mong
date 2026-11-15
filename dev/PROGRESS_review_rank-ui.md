# PROGRESS review/rank-ui (Bảng vàng UI + bục vinh danh + thẻ kết kiếp) — 15/11

Base: origin/review/rank (d5ad2e93e) + origin/main merged (4c0291deb; assemble.py conflict fixed: main list + score.js + jrank.js before j84).
Continue on THIS branch (review/rank-ui). Never push main.

## DONE
- 895c898ef (+ this commit): 
  1. Bục vinh danh j90 (KIT §26; every user: j82/j71 contests, Tranh ghế j34, khảo thí j53, dâng nghệ j54, Bảng vàng): no red dais block;
     the step = the name plaque (cream kit card) under the feet, Nhất highest / Nhì left / Tam right; medal at the plaque's top-RIGHT
     corner (pokes up); "Ta" tag top-left; figures take all the height left (Nhất 100 %, others 90 %), height wins over width
     (`.kpod-img` width:auto, max-width 150 %); compact plaque on landscape ≤ 500 px high.
  2. Bảng vàng (jrank): ONE title "Bảng vàng" (RK_T.screen) + kit-x ✕ (kitXHTML copied verbatim from review/shop-fix jk4, KIT 32.10),
     no seal chip, no "Lui"; "Ta" for own row/tag; row portraits framed by the life's highest phẩm (rkRole → face.__kr → kitDecor:
     frame-consort-N / frame-maid-N / frame-mama-3); "Cách tính" = floating kit card with ✕: lead text, worked life (her latest life or
     sample "Phi Tô Uyển Như") scored by CTM_RANK.score, kitTiles for phẩm + kết cục, kitRows for the rest; Đổi tên hiệu: title in header,
     ✕ goes back; short landscape: stage = visible body height (rkFit).
  3. End card "Kiếp này" (coordinator request): j32 over() → kit sections only (h3 headline, kitRows Nguyên do/Phòng được…, h4.kpst
     "Kiếp này" + kitRows, jrank block h4.kpst "Bảng vàng" + kitRows + "Xem Bảng vàng"); no `.pcb` boxes; "Chuyển kiếp" stays primary.
     Shared 32.7 person dialog (jk4 kitDpFit, so EVERY person dialog follows): name chip (rank over name) at the TOP of the column, figure
     fills from under the chip to the floor (measured 99–100 % of the column incl. name); her own chip = rank + name (kitStageFig named:q===S);
     32.7 dialogs with no option list: text side scrolls, figure column sticky (--kdcolh) → full figure visible at 844x390.
     Components used: kitRows, h4.kpst/.kpsec, kitTiles, kitXHTML (kit-x), kitDpApply/kitDpFit (32.7), kitName two-line chip, mdH/pframe+kitDecor.
  4. Docs: KIT.md §26 (new podium rule + users list), 32.7b, 32.10; dev/LEADERBOARD.md "Giao diện" rewritten.
  5. Tests: dev/test/rank-e2e.js new checks (one title + ✕ no Lui, podium figure ≥ 55 % & > 2× plaque, medal on plaque corner, frame by phẩm
     per row, Cách tính card, end card fill ≥ .95 / name above / no boxes / "Xem Bảng vàng"); dev/test/podium.js skips main's roulette.
- Results: rank-e2e 755x1000@2 39 ok 0 FAIL, 1000x755@2 39 ok 0 FAIL, 1180x820@2 rc=0 (earlier run; Cách tính regex fixed since);
  score.test + board.test ALL OK. Shots (jpg) dev/shots/rank-ui/before|after/{1-board,2-board-list,3-rules,4-players,5-endcard}-<size>.jpg
  for 755x1000_2, 1000x755_2, 1180x820_2, 844x390_3: 0 page errors, no overflow, no clipped text.

## LEFT
- rank-e2e at 844x390@3 not re-run after the last changes (machine load ~60); podium.js full run at the 4 sizes not finished
  (an earlier partial run at 755x1000 produced scenes 1–7 fine: contest win, stranger, Tranh ghế; it hung on screenshots under load).
  Commands below; save podium shots to dev/shots/rank-ui/podium/ and look at them.
- Coordinator item 1 overlaps review/kit-fig2 (KIT_FIG ≥ .95, KIT 37 kitNameRank, not pushed when I worked): at merge, take kit-fig2's
  kitDpFit/kitNameRank and keep my end-card/sticky-column parts; kitNameRank() itself was NOT added here (the chip uses kitName's two-line look).
- Sổ luân hồi list (j32 pastHTML) still uses `.pcb rows` + round `md xs` avatar — not the end card's code, not changed; candidate for kit rows + mdH.
- Phúc duyên lines on the end card (j52 / j69 / jkiep `p.pdend`) are plain paragraphs (not boxed); could get a kpst header.
- Nhất's plaque has some empty space at the bottom (lift between tiers); optional polish.

## Known bugs
- none open from my tests. podium.js `.kpod-stage` tap now uses {force:true} (stability wait hung under load).

## Test commands (local stand-in only, NEVER the real Worker)
python3 dev/build/assemble.py
node rank/worker/test/score.test.mjs ; node rank/worker/test/board.test.mjs
node rank/worker/test/local-server.mjs 8750 &        # fresh per e2e run
serve dev/index.html + img/ with charset utf-8 (http-server; python http.server breaks UTF-8 → "Invalid or unexpected token")
NODE_PATH=/opt/node-tools/node_modules node dev/test/rank-e2e.js http://127.0.0.1:8731/index.html http://127.0.0.1:8750 755x1000@2 <outdir>
NODE_PATH=/opt/node-tools/node_modules node dev/test/podium.js http://127.0.0.1:8731/index.html 755x1000@2 <outdir>
(sizes 755x1000@2 1000x755@2 1180x820@2 844x390@3). Note: the shared scratchpad gets wiped by other agents; keep temp files inside the worktree.

## cdn_sync: none pending (no new art).
