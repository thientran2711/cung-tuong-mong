# PROGRESS — review/recipes (sub-styles, recipe books, tastes, repeats, allergies, teacher)

Owner asks (OWNER_DECISIONS 15/11 ~19:50Z) + coordinator additions (sub-styles per art; teacher redesign; bạc road must have an equal non-bạc road).
Code: `dev/build/jrcp.js` (assembled last, after jwkr). Numbers: `BAL.rcp` (top of jrcp.js). Test: `dev/test/recipes.js`.

## What existed (grep first)
- j83 WK (11 work kinds), jwkr WKR (10 recipes per kind, pick grid, level gate WKR_LV), j83 emperor 3-week fatigue (S.wkE, WFAT, once a week),
  j83 "hợp ý" (Emperor LIKES dish/flower/music, j1), jpoison "chân tình" with a visible cause (gfFor/gfSincere), jgift gift dialog, j8 giftVal/giveTo,
  j23 lessons (self / teacher Bạc 5+l*5 / Thái hậu), j7 "poisongift" accusation pattern, evA evidence, punish.
- Reused all of them; jrcp only wraps (wkrOpen, wkEval, wkGainTxt, wkGive, giftVal, giveTo, giftEval, gfFor, itemArt, kitItemRows, kitShopEff,
  kinvOpen, restock, lessonMode, wkLessonOK, ktArtSkills, ktWorksHTML, discover, monthTick, pool) and replaces jwkr's wkrTile.

## Design (as built)
1. **Sub-styles (lối)**: RCP_ST maps every recipe r01..r10 of the 11 kinds to 3–4 sub-styles (e.g. khúc: Đàn tranh / Tiêu / Tỳ bà / Cổ cầm;
   tranh: Thủy mặc / Hoa điểu / Sơn thủy / Công bút; thơ: Ngũ ngôn / Thất ngôn / Từ khúc; múa: dân ca / lụa / kiếm, xoay / cung đình).
   A recipe is makeable when its sub-style is learnt AND the art level reaches the recipe (old WKR_LV gate kept). First sub-style of each kind
   known from the start (it holds the bậc-0 recipes). Saved in `S.rcpL`; created lazily (`rcpKnown()`), so old saves get the basics + every
   sub-style of a work of hers in the chest. NPCs: first sub-style + a deterministic share growing with their art level (`rcpNpcKnows`).
   No new work art: every recipe keeps its existing 4 tier pictures.
2. **Learning roads**: book in the Nội vụ phủ tray (`wkb_<kind>_<sid>`, BAL.rcp.bookPr 18/30/45 bạc by sub-style; BAL.rcp.shopN=2 unlearnt books
   added per restock), hand-copied sheet (`wkp_…`, a friendly consort monthly, Thái hậu at th≥60 for kinh/thêu, the "rcpMama" event: bạc or
   Sức -15), and the TEACHER (only way besides books/sheets; self-study never opens a sub-style). Read a book from Tư trang: 1 khắc.
3. **Teacher (redesign)**: "Học với thầy" first asks WHO: Nữ quan Thượng nghi cục / Nhạc sư Giáo phường / Ma ma Thượng công cục for
   bạc = max(3, 8 % of her monthly bổng BAL.pay[rank]) (rank 0: 3 bạc, Quý nhân 6, Phi 13, Hoàng hậu 22; old fee 5+l*5 = 5..25),
   or a skilled consort (art higher than hers or ≥4, thiện cảm ≥ 25): no bạc, a favour (her thiện cảm −4, and no chân tình gift to her for
   BAL.gift.askW weeks). Both: Sức −10, 2 khắc, progress as before. The tile grid in a teacher session shows "Học lối này" on recipes of
   unlearnt sub-styles (a consort teaches only sub-styles she knows); the sub-style is learnt when the session starts. At bậc 5: new act
   "Học lối mới với thầy" (same two teachers, a practice session that makes a work of the new sub-style). Single fee source `tchFee(k)` in j23
   (j23 lessonMode, j83 wkLessonOK/wkAsk, jwkr wkrMat all read it; `tchPaid(k)` pays the favour).
4. **Tastes**: `rcpProf(person)` deterministic from S.rcpSeed + person key: per kind one favourite sub-style, a disliked one with BAL.rcp.hateP=70
   chance, an allergy with BAL.rcp.alP=35 chance (hải sản, hạt/hạnh nhân, nhân sâm, phấn hoa, khói trầm, sơn mài). Emperor's old LIKES
   (dish, flower, music) become his favourites in mon/bhoa/khuc. Handmade gift: favourite = +likeV(2) and counts as "hợp ý" for chân tình;
   other sub-style = ×neutral(0.6); disliked = refused when she knows it, else backfires (Sủng −3 / Thái hậu −6 / thiện cảm −6).
   The gift dialog only shows what she KNOWS (unknown facets display as neutral with "chưa rõ … thích lối nào").
   Performances: Đánh đàn ở ngự hoa viên / Phượng cầu hoàng / Múa trong yến tiệc / Kinh hồng vũ get Sủng +3 when she knows his favourite
   khúc/múa sub-style and has learnt it (positive only, no penalty — main favour acts kept stable).
5. **Learning tastes** (facets f:<kind>, h:<kind>, a; S.rcpK): gift result (observation), Emperor's old discover() roads (also reveal a taste
   facet, 40 % or once old likes are all known), monthly maid gossip (BAL.rcp.gossipP=25), acts in Tài nghệ › Tác phẩm › "Khẩu vị, kiêng kỵ":
   Hỏi thái y (1 khắc, bạc 5 % of bổng: an allergy, sure) vs Sai cung nữ dò la (2 khắc, odds by her Lòng: any facet; fail Lòng −3).
   That card lists every person's known facets (kitRows).
6. **Repeats**: same work (kind+recipe) or same bought item to the same person within BAL.rcp.fatW=8 weeks: ×fat[n] = 1 / .6 / .3 / 0, then
   bored (Sủng −1 / Thái hậu −2 / thiện cảm −3). Per giver (`a.rcpG`), every giver alike. j83's emperor once-a-week + WFAT kept.
7. **Allergy**: real give of a work holding the person's allergen → illness (consort Sức −15), the gift value replaced by the backfire;
   if she gave it: accusation chance BAL.rcp.accP 55 (Emperor/Thái hậu; accuser = Hoàng hậu or most hostile consort) or 25+hostility/2
   (consort herself), +30 when she knew → PEND.rcpacc: Kêu oan (odds 45+Đức/3+mat*4, −35 if she knew) · Mời thái y làm chứng (bạc, +25) ·
   cung nữ nhận thay (Lòng −30, Danh −2) · Nhận lỗi (Sủng/Thái hậu/thiện cảm loss). Fail = punish(sev 1 consort / 2 Emperor, Thái hậu),
   Danh −4, accuser holds 1 evidence (evA → j40 plots). NPC givers: the receiver/the Hoàng hậu gains evidence on them + news.
   Her own allergy is NOT modelled (gifts to her are not eaten on receipt).

## Art
12 covers (11 kinds + 1 hand-copied sheet), gpt-2-6, style ref style-ref-wd-tram-maudon, Magnific folder ba4aecfe…: grid "YMLOujRWeC",
cut "9ZQrog4NYZ"; cut + itemcut.py clean; on the CDN: img/item-wkbook-<kind|pho>.webp + img/item512/. Looked at each on cream and dark.

## Bạc vs non-bạc roads (owner balance rule)
book (bạc) ↔ teacher with consort favour / ma ma event with Sức; nữ quan fee (bạc) ↔ consort favour; thái y (bạc, sure, allergy only)
↔ maid (khắc + risk, any facet); thái y witness (bạc) ↔ maid takes the blame (Lòng).

## Tests (dev/test/recipes.js, served root index.html after `bash dev/site/build_site.sh`, root files NOT committed)
755x1000 (old save made on origin/main with a «Bánh hoa quế» in the chest → mon knows s1+s2), 1000x755, 1180x820, 1366x1024, 844x390:
no page errors, no horizontal overflow, no clipped text, dialogs inside the screen. Checked: Tác phẩm tab chips + Khẩu vị card; teacher picker
(nữ quan + consort); pick grid "Học lối này" → sub-style learnt, session cost via S.mg.cost (Bạc −fee); shop tiles with book covers; book panel +
Đọc; Emperor fav unknown shows neutral (Sủng +2), known fav Sủng +4; Thái hậu repeat ladder 4/2/1/0/−4; known dislike refused with reason;
allergy → illness Sức −15 + "Bị tố mưu hại" dialog (4 options); thái y dialog; bậc-5 "Học lối mới với thầy" + "Các lối, sách phổ" list.
Shots were kept out of git (dev/shots excluded). Phone landscape 844x390: the pick-grid dialog keeps main's kshop small-height layout (not changed here).

## Open / notes for the next worker
- "Hỏi thái y kiêng kỵ" act card has no act picture (act-pic map is by act name; the placeholder act pictures are another branch).
- NPC sub-style knowledge is derived (hash + art level), not stored; NPC books are only gifts.
- Her own allergy is not modelled.
- Balance bot: see section below.

## Balance
- Teacher fee by rank (bạc = max(3, 8 % of BAL.pay)): Đáp ứng 3 · Thường tại 4 · Quý nhân 6 · Tần 8 · Phi 10 · Quý phi 13 · HQP 17 · Hoàng hậu 22
  (old: 5+5×bậc = 5..25 whatever the rank, so it was dear at low rank and trivial at high rank). NPCs pay the same (j85 npcStudy → tchFeeOf).
  Bot lesson() (j2) and dev/measure/inpage6.js now read tchFee.
- Bot smoke (dev/measure run1b.sh, 1 shard, 2 lives, cap 40 min on a loaded machine; .art copy with CAP env): life 1 (dtq) 37 months, rank 4,
  28 lessons, 7 exams, no page errors. Life 2 hit the time cap. A full 5×6 run was not possible under the machine load: please run
  `dev/measure/run5b.sh` when the machine is free.

## Review r1 (review/recipes-r1, on main d51a393e4)
- Merge: assemble order keeps jrcp.js LAST (after jartc; jsfx stays after jmcal before j84). jrcp makes no sounds of its own; jsfx wraps
  nothing jrcp replaces (wkrTile/tchFee/tchPaid are not wrapped by jsfx). Site rebuilt; dev/audio/INVENTORY.md regenerated (0 unmapped/missing/mismatch).
- Owner 15/11 ~21:20Z: every art level-up grants ONE recipe of that art (`rcpLvGift`, `p.rcpR`, `p.rcpLv` = levels already rewarded),
  log "Học được: <món> (kind, lối «…»)" right after the level-up line. Order: a still-locked recipe of a sub-style she knows (lowest level);
  then the basic (first) recipe of an unlearnt sub-style; then the lowest other recipe of an unlearnt sub-style. The sub-style itself stays
  unlearnt (self-study never opens a lối). Player: addArt wrapper; NPCs: addArtP + npcMonthly wrappers (same rule). wkrOpen = granted ∪
  (level gate ∧ sub-style known). recipes.js case 9.
- Owner 15/11 ~21:50Z (1): every work kind has exactly 4 sub-styles (mon +Món chua ngọt, theu +Thêu bình phong, bhoa split Hoa xuân hạ /
  Hoa thu đông, huong +Hương kỳ nam long diên, tho +Thơ đề quạt, kinh +Kinh Quán Âm, the +Thế biến hóa, ao +Áo phượng nghê thường),
  all on the existing r01..r10 (each recipe in exactly one sub-style; checked by script).
- Balance (owner 20:30Z rule) fixes: book price = palace teacher fee (8 % bổng) + BAL.rcp.bookAdd [12,20,30] (was flat 18/30/45 = up to
  113 % of a month's bổng at rank 0 while a teacher session opening the same lối cost 3 bạc); ma ma copy = max(12, 15 % bổng) bạc vs Sức −15
  (was 3 bạc vs Sức −15 ≈ 25–35 bạc of tonic, and the sheet resold for 4 bạc: profit at rank 0–1).
- Co-op: the taste seed is kept on S.emp (a WORLD key) so both players' Emperor / Thái hậu / consorts have the same tastes; knowledge
  (S.rcpK) and learnt sub-styles stay personal.
- Old saves: a save without S.rcpL keeps every sub-style holding a recipe her art level had opened under the old WKR_LV gate; every
  save now writes S.rcpL (ser wrapper), so new games never take that road.
