# PROGRESS review/origins (D18, 16/11) - foreign princess origin visible + one more

## Ask (OWNER_DECISIONS L750)
"Foreign princess origin: owner hadn't seen it. Checked: origin nc = Công chúa nước Nam Chiếu hòa thân exists in j1. Make it visible/clear in the
identity pick; consider more foreign-princess origins/variants (e.g. Bắc Địch) - add at least one more with its own story line."

## What existed (LUẬT ƯU TIÊN SỐ 1: git grep origin/main + origin/review/*)
- `nc` is fully built on main: ORIGINS (j1), STORY.nc (j4, v1), QUEST67.nc + 4 arcs nc_gian/nc_su/nc_tuc/nc_vuong (j67), rare endings (j97, RARE_ENDINGS.md),
  men role "Phó sứ Nam Chiếu" (j96), family letter fam_nc + dich_thu (j72), BAL.home.nc (jecon), wide + bg pictures (CDN), emblem origin-nc (kit).
- Why she never saw it: weight 6 of 130 (j69, "Rất hiếm"), and the identity card showed only one blurb line ("Người ngoại tộc. Thái hậu không ưa.").
- No other foreign-princess origin on main or any review branch (git grep "Bắc Địch" = only the Bắc Địch envoy/prince events, men, act pictures).

## Built
1. NEW origin `bd` = "Công chúa Bắc Địch hòa thân" (dev/build/jorigins.js, last module in assemble.py):
   rank 2 (Quý nhân; nc starts at Tần), Danh 15, Sức 90, Bạc 90, Thái hậu ưa -20 (nc -15). Harder than nc on purpose (nc measured easiest by far, 54% HH).
   Own story line "Tờ hòa ước còn sống": QUEST67.bd (3 results) + 4 arcs x (>=4 endings): bd_hoa (hòa ước mười năm), bd_ngua (ngựa chiến phương Bắc),
   bd_tuc (người rợ phương Bắc, Thái hậu), bd_hoang (ngai Khả hãn). STORY.bd = v1 slot only (the chapter line runs the story).
   Family letter fam_bd in j72 (xin mở chợ ngựa). Weight OW69.bd=7 ("Hiếm"; j69 + jk2b fallback), BAL.home.bd=20 (jecon).
   Placed right after nc in ORIGINS, so the two foreign princesses sit side by side on the roulette face-up row.
2. Identity card (kpIdentity, wrapped in jorigins.js, same `.kpidt` text slot, no new UI part): for EVERY origin (9 + bd) two lines:
   "Gốc gác." (backstory) and "Triều đình đối đãi." (how court treats her). ORIGIN_LORE table, window.originLore(k).
3. Pictures (gpt-2-6, style ref = origin-wide-nc, looked at): img/origin-wide-bd.webp 1280x720 (233 KB), img/bg-origin-bd.webp 1350x1800 (237 KB), uploaded to CDN.
   Scenes with crowds seen from behind: no single character drawn, so ART COMPLETENESS (4 ages x ranks) does not apply.
4. Test: dev/test/origins.js (roulette 10 cards, both cards, lore, pictures, arcs play to an end, save round trip).

## Compatibility
- Old saves: ORIGINS.find by key, unchanged keys; bd only appears for new rolls. Co-op: per-player S.origin.k (blob `ok`), no new shared state.
- A pre-rolled, not yet accepted life (seed stored, "ow") may roll a different origin after this update (total weight changed 130 -> 137). Accepted lives unaffected.
- Not touched: j79/jk4/j2/j42/jsl (C45 newgame-ui) and palace-start files. Overlap risk only assemble.py line (one name appended at the end).

## KIT REQUEST (not built, one kit keeper)
1. Emblem `img/kit/origin-bd.webp` (+ add "bd" to KIT_ORIGINS in j60): the small origin seal next to her portrait. Without it bd shows no seal (graceful null).
2. Roulette grid (jk2b `.krgrid`): 10 cards = 3+3+3+1 in portrait, the last card sits alone on the left. Suggest centring the last row (flex-wrap + justify-content:center) or 4 columns.

## Not done / art scope (report)
- Her LOOK: the player face is picked from the common consort face set; there is no origin-specific look for nc or bd. A distinct foreign dress/face set
  = new set x 8 ranks x 4 ages (a18/a26/a36/a51) = 32 figures per origin (+ 32 portraits), ~65 credits each ≈ 2 000+ credits per origin. NOT drawn; awaiting go.
- Rare endings (j97 entries) for the 4 bd arcs are not written (arcs have their own 4 endings each).
- Men role for cross-origin love arc (j96 TM96_W/role) for bd not added.
- Balance: bd stats set from nc/dtq anchors; no bot measure run (HH reach not measured). Suggest balance-pass to measure.

## Reviewer r1 (review/origins-r1, 16/11)
Ask confirmed: OWNER_DECISIONS L750 / OWNER_LEDGER item 208 (D18) = make the existing nc visible + add at least one more foreign princess with its own story (Bắc Địch named as the example).
Fixes made by the reviewer:
- Wording (VANPHONG / tone): arc title bd_tuc "Người rợ phương Bắc" -> "Phong tục thảo nguyên" (the slur stays only in characters' mouths: Thái hậu, gossip);
  "cơ hội" -> "dịp" (x2, VANPHONG); "trà sữa ... mời nàng" -> "trà sữa ngựa ... mời các cung nữ"; "viếng ngươi" (said of a living person) -> "an ủi ngươi";
  "Hoàng thúc" (a Han title) -> "Thúc phụ"; "ông" -> "người"; "thái bộc / thượng tứ viện" capitalised as offices; fam_bd letter made logical (salt/tea shortage, open the border market).
- Balance rule: bd_hoang c1 "Nhận ngọc, hứa suông" was +80 bạc for free (obvious pick); now costs Đức -3 like the nc twin ("Nhận vàng", Đức -3).
- Pre-rolled lives (j69): a life rolled before bd existed (ow=1) now keeps its origin (ow69Pick(seed,noBd) uses the old table order without bd);
  new rolls are marked ow=2 and include bd. So the update re-rolls nobody.
Reviewer checks: dev/test/origins.js 20/20 at 755x1000@2 and 1180x820@2 (10-card roulette, bd + nc cards with lore, every bd arc ends, fam_bd, save round trip), 0 page errors.
Pre-roll check: 5000 seeds, ow69Pick(seed,true) == old table 5000/5000; new table bd 6.8 %, nc 5.7 %.
Bots (run_par + inpage6 + inx/inpz + inty from review/balance-pass-r1, alternating bd/nc, 28 lives on main+this branch):
bd 11 lives: HH 0, avg max rank 4.45 (start 2); nc 13 lives: HH 0, avg max rank 4.23 (start 3). Main itself gives 0 HH with this bot now
(poison / Thái phi endings), so the 20-40 % target cannot be judged here: re-measure bd vs nc after balance-pass lands.
