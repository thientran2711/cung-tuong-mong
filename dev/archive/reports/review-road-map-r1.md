# Review road-map r1 — review/road-map @ 240c68a7 (jroad.js engine + jrd_tt.js pilot + BAL.road)
Reviewer: Foreman B reviewer (opus) session_01N1tNP4jWtq6Qf3eWpQ7krw. START_CTX ~5 % of a 1M window.
Read: PREAMBLE, REVIEWER, START_CORE/WORKER/REVIEWER, PRIORITY_RULES index, topic story-roads.md + balance-economy.md, ROAD_MAP.md, worker report road-map.md.

Merge: `review/road-map-r1` = origin/main 2e9615fb + review/road-map 240c68a7 → **83e48a8b** (conflicts only in built index.html / sw.js → rebuilt with build_site.sh). Pushed.

## VERDICT: FAIL (5 items). Items 1–4 are PATTERN flaws: B1/B2/B3 helpers must apply the same fix in their jrd_<origin>.js now.

1. **Lợi thế counted twice at every climax (pattern flaw).** j67 `oOf67` already adds `A.sc*7` to the odds of every option with `e:` (or a `x` beat). 30 climax options in jrd_tt.js add `A.sc*6/7/8` again in their own `o:` function (e.g. tt_mat_7 x1 `45+A.sc*7+S.tai/6`), so 3 Lợi thế = +39..45 instead of +21 → climax wins near-certain once the player has stacked Lợi thế. j67 itself never does this (0 uses). Fix: drop `A.sc*N` from every `o:` (keep it only in the 4 non-climax uses if wanted: tt_co_7 s1, tt_co_11 c1, tt_oan_6 c2, tt_oan_10 t1). Helpers: never read A.sc in `o:`.
2. **Gain without loss / choices with no effect (gain-and-loss rule, OD:L582, OD:L243, OD:L266, OD:L477 true hints, OD:L478 no fixed best answer).** Scan (`node dev/measure/road-option-scan.js`, committed on review/road-map-r1 38b78cce; also lists double Lợi thế) over 507 options in 28 chapters:
   - 183 options give a numeric gain with NO cost and NO numeric loss — the only "loss" is the `lx` text, which changes nothing (e.g. tt_co_5 s2 «Để mặc cha» Đức+2 free; tt_mat_7 s1 «Nhận, xin Hoàng hậu chỉ bảo» Hoàng hậu+3 + Lợi thế, free → dominant over «Nhận, tự lo trọn» which costs Sức).
   - 42 options have no gain, no cost, no loss at all (e.g. tt_mat_7 s2 «Nhận, không lo xa» w:{} wx:"" lx:"rủi ro"; tt_tranh_11 c2 «Không bàn» lx empty; tt_mat_9 c1 «Đổi chủ đề»).
   - Promised losses not applied: tt_mat_7 t1 «Nhận lời khen» says "Hoàng hậu mất mặt" but `go:()=>{}` (empty).
   Fix (whole group, all 28 chapters): every option carries a REAL loss — a cost `c`, a failure loss `l` with odds, a relation/oán change via `go` (rdRel/rdOan), a flag that changes the next chapter's opening, or an ending; `lx` text must describe that real effect. No option with zero effect. Re-run the scan to 0/0 and put the before/after table in the report.
3. **Beat text does not match the cast person (real-people rule OD:L1247, ROAD_MAP §5.2).** tt_mat_6 c2 "{v} được tấn phong vượt qua ngươi" fires with a rival of LOWER rank (seen at 755x1000: Thường tại Tống Tú Uyển while she is Quý nhân; another run a Quý phi already above her). Fix: guard such beats with `if:` on the cast person's state (rank above hers / alive / in favour) or cast with a filter (`rdCast(A,["v"],{v:fn})`); scan every beat text that states rank, rise, illness, child or office of a cast person.
4. **Recast is silent (engine, ROAD_MAP §5.2).** `rdCast` replaces a dead/out rival with a new consort but nothing tells the player ("… nay đã khuất, kẻ nối tay là …"); the next chapter simply names a new person as if she had been there all road. Fix in jroad.js (engine owner): log + chapter-open line when a key is recast; helpers need nothing extra once the engine does it.
5. **ONE CORE small items (OD:L1267).** jrd_tt.js `RANKS[Math.min(S.rank,7)]` (typed 7 → RANKS.length−1); jroad.js `const i=3-q.length` (typed 3 → BAL.road.tm.length). Rare finale chance `p:.12/.1` is typed like every j97 entry (same convention as j97; OK unless Foreman B moves j97 to BAL).

## Checked and OK
- Road order / frame: road-full bot (755x1000) tt_co: 1 nhap14 · 2 sung14 · 3 tap14 · 4 tt_co · 5–11 tt_co_5…11 · 12 s_hoa · 13 hau · 14 ke, finale "Người cầm quân cờ", same rival all road, Thanh mai trúc mã opened as side story (tm96a) never numbered. (Other 3 roads: worker run; not re-run by me.)
- .5 opens on the .4 aftermath (RDW(1)/RDW(0) openings filtered on rdK); same cast carried (S.st.f14.act); finale card «Kết cục xuất thân» with family reward from BAL.road.finTier; road endings never kill / lãnh cung.
- Deadlines: silver options in road chapters get the generic jstory pledge + countdown + rank price + "Nhờ người quen lo liệu, không dùng bạc" route (seen on tt_co_7, tt_oan_9 cards) — OD:L499 / L582 covered by the shared wrapper.
- Wording: cổ trang, no %, odds as ladder words (an toàn / có rủi ro / liều on the cards); 1 digit in text only (tt_mat_11 t1 prints RANKS via function — fine).
- Kit: chapters render through the j67 kit event card (VIỆC frame, speaker figure, option cards, TỐN / GỢI Ý rows); no private CSS/parts added (jroad/jrd_tt contain no style/HTML parts except the result card rows through card67 → kitPanel). Eyeballed tt_co_7, tt_oan_9 (755x1000@2, 1180x820@2) and tt_mat_6 (755x1000@2); tt_co_7 at 1000x755, 1366x1024@2, 844x390, 390x844: no horizontal overflow, no page errors, text not cut (option list scrolls inside the card).
- Old saves: road-saves.js 4/4 PASS (main-build save, phase-1 save, full-road mid-road save tt_tranh ch11, no page errors).

## Notes (not FAIL)
- DEPENDENCY: this branch carries review/story14-p1-r2 (14-chapter frame, jst14), which is NOT on main and is under its own review (review/story14-p1-r3). Main must not take road-map before story14 PASSes.
- Inline choice costs/odds in chapter data (c:{bac:-60}, o:()=>40+S.tamco/3) follow the j67 arc convention (j67 has 110 + 193 such). If Foreman B wants ONE CORE to cover per-option data, decide it once for j67 + all roads before helpers write 224 more chapters.
- tm96b/c stay queued in bot runs because the bot never plays side threads (tm96a never done) — real play fine; the "busy" gate means b/c open only after a is finished.
- Image load: the chapter event picture and option thumbnails come from the CDN theme (RTHEME67 → road theme); they loaded at 1180 and stayed blank in some 755 shots within 2.5–4 s (lazy load timing, same as main arcs).

## HISTORY CHECK (OD:L1327 expert pass, not FAIL)
- tt_oan .9 «Tam ty hội thẩm» (Ming/Qing three judicial offices; fits only if the court setting allows it).
- tt_co .10 she "sits behind the screen" at the court meeting — buông rèm thính chính belongs to a Thái hậu regency, not a consort.
- tt_mat rare «Hoàng hậu tiến cử ngươi làm người kế vị Trung cung» — a living empress naming her successor is doubtful.
- tt_co .8 the Emperor gives a consort a sealed memorial to keep 3 days (consorts handling memorials).
- tt_mat .7 lễ thân tằm led by the Hoàng hậu — historically right (no doubt; listed as checked).

## Tests
| test | result |
|---|---|
| road-saves.js @1180x820 (this build + main build) | 4/4 PASS |
| road-full.js @755x1000, 1 life per road | tt_co PASS (1..14 in order, finale, same rival, tm96 side); tt_oan/tt_tranh/tt_mat not re-run by me (bot ~15 min per road; worker run 10/10) |
| own scan (gain/loss, digits) | 183 free-gain + 42 no-effect options, 30 double Lợi thế |
| shots 755x1000@2, 1180x820@2, 1000x755, 1366x1024@2, 844x390, 390x844 | no overflow, 0 page errors |
