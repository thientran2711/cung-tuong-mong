# PROGRESS review/tuduc-sub (item D16) — Tứ đức sub-styles + CDNH works + A13 teacher notes

Owner rulings: OD 15/11 ~21:50Z (Công Dung Ngôn Hạnh 4 sub-styles each, learnt and valued like the arts), ~23:05Z (CDNH works, giftable),
~23:15Z (10 items per kind × 4 tiers with own art). Session-7 coordinator decisions (binding): (a) Tứ đức bậc 2/4/5 each open the next
sub-style; (b) consort-teacher cost scales with rank to match the palace fee in value; (c) Tứ đức teacher fee = 8% of pay like the arts.
A13 reviewer notes folded in (FOREMAN_C_STATUS): consort-favour teacher vs nữ quan fee, NPC sub-style knowledge, flat Tứ đức fee.

## Base
- Branch from origin/main 4f5e5f3b3, then merged origin/review/recipes-r2 9eafa355b (A13 PASS, not yet on main; jrcp = the lối system this
  builds on). assemble list = main's + `jrcp.js`, `jtds.js` last. If recipes-r2 lands on main first, this merge is a no-op.
- The recipes-r1 PROGRESS said the Tứ đức spec was "in the reviewer report to the coordinator" (not in the file); the design below follows
  OD 21:50Z + the s7 decisions.

## What was built (dev/build/jtds.js, ~150 lines; j85 two small edits)
1. **4 work kinds, one per course** (j83 `WK` + jwkr `WKR` + jrcp `RCP_ST`, same shape as the 11 art kinds):
   | course | kind key | work | 4 lối (sub-styles) |
   |---|---|---|---|
   | Công | `kimchi` | Đồ kim chỉ | Hà bao, túi thơm · Thắt nút, tua kết · Hài thêu · Đai, khăn choàng |
   | Dung | `phanson` | Phấn son tự chế | Phấn sáp · Son, yên chi · Dầu tóc, hoa cài · Cao dưỡng nhan |
   | Ngôn | `thuchuc` | Thư từ, lời chúc | Thư thăm hỏi · Thiếp chúc mừng · Câu đối, quạt đề · Lời khuyên can |
   | Hạnh | `phucthien` | Vật cầu phúc (Đức +1 per work, like chép kinh) | Vật cầu an · Đồ cúng, hoa đăng · Chép sách nữ huấn · Đồ cứu tế |
   10 recipes each (names in jtds.js), WKR_LV level gates, first recipe of every lối open at bậc 0 (jrcp rule). Books + hand-copied sheets
   for lối 2–4 (`wkb_/wkp_<kind>_<sid>`, Nội vụ phủ shop, friends' gifts) come from the jrcp machinery. Pollen allergy on 3 phấn son.
2. **Sub-styles = the kind's lối**: lối 1 known; course bậc 2/4/5 opens lối 2/3/4 (`BAL.tds.open`), for her and NPCs; every course
   level also grants one recipe (`rcpLvGift`, owner 21:20Z rule). Teacher (ma ma or a better consort) can open any lối earlier; books too.
   Tastes: every person has a favourite / disliked lối per new kind (jrcp `rcpProf` iterates RCP_ST) → gifts valued the same way.
3. **Lessons make works**: "Tự học" / "Học với thầy" on a course card → pick WHAT to make (jwkr grid, lối locks, teacher mode shows
   "Học lối này") → material (bạc paid only when the work is made) → the lesson (j85 `lessonVir`, or tuduc-mg `tdPlay`) → the work in the
   chest (`wkFinishLesson`, same name/tier/picture/value/sale rules as the art works). Bậc 5: "Tự luyện, làm đồ" in Tác phẩm.
   NPCs: each NPC Tứ đức lesson that raises progress can end with a work (`BAL.tds.npcWk` 50%, cap 4 works), via `wkNpcMake`.
4. **Fees** (bạc rule): `virCost(l,p)` = `tchFeeOf(p)` = 8% of the learner's bổng (min 3): rank 0..7 → 3,4,6,8,10,13,17,22 bạc
   (was flat 5+5×bậc = 5..25). NPC study pays its own fee (`virCost(l,v)`).
   Consort-favour teacher (arts and courses): thiện cảm cost `rcpFavorOf(S)` = clamp(2 + fee/4, 3, 9) → 3,3,4,4,5,5,6,8 by rank
   (was flat 4). Rule: the favour is worth the fee it replaces on the j8 gift scale (a gift of pr bạc gives pr/12+2 thiện cảm, rounded up so
   the favour never undercuts the fee at high rank). `BAL.rcp.tFavor` is now a getter, so every jrcp text and charge follows it.
5. **NPC lối knowledge** (A13 note): arts: lối 1 + their own favourite lối first, the others by a per-person order, the disliked one last;
   count by art level `BAL.tds.npcLv` = [0,1,1,2,2,3] extra lối for bậc 0..5. Tứ đức: same 2/4/5 rule as hers. No storage (derived).
6. UI (kit parts only: pbtn act cards, kitSkillCard, kitModal/kitRows/kitFacts, kchip, the jwkr kshpick grid): Tứ đức cards get real
   fee + favour text, "ra một món …", and "Các lối, sách phổ"; Tác phẩm tab gets one card per course (lối đã học n/4, what it makes,
   odds line, practice at bậc 5). Gloss "Lối Tứ đức". j85 log "Tự rèn" → "Tự học" (owner one-word rule).
7. Old saves: no `S.rcpL` → jrcp migration, then Tứ đức lối reset to the level rule; saves with `S.rcpL` but no new kinds → `tdsSync`
   adds lối by level on load/render. ts-oldsave main → this build: ok.

## Art (Magnific gpt-2-6, folder ba4aecfe…, every sheet looked at)
- 40 recipe sheets (2x2, Thường→Tuyệt phẩm, same template as j83 sheets) + 1 book-cover sheet; Magnific background removal;
  cut by `dev/art/cdnh_cut.py` (components of the whole sheet assigned to the quarter of their centroid, 88% fill, 512 + 256 webp).
  Ids: `dev/art/cdnh_sheets.txt`; prompts: `dev/art/cdnh_prompts.py`. Redo: phucthien r10 (first sheet's tier-1 quilt had a patch).
- On the CDN: 160 `img/item-tp-<kind>-rNN-b1..4.webp` + item512, 4 `img/item-wkbook-<kind>.webp` + item512 (328 files, 7.9 MB;
  256 px ≈ 10–18 KB, 512 px ≈ 40–70 KB). Loaded on demand (item tiles), nothing added to first load.

## Tests (dev/test/tuduc-sub.js; recipes.js; ts-oldsave.js)
- tuduc-sub.js at 755x1000@2, 1000x755@1, 1180x820@2, 1366x1024@2, 844x390@3: 0 page errors, no overflow, no clipped text,
  dialogs inside, no broken work/book pictures. Checks: 4 kinds × 10 × 4 lối; lessons make the picked work; ma ma opens a new lối and
  charges the 8% fee; consort teacher costs 0 bạc and thiện cảm −rcpFavorOf; bậc 2/4/5 open lối 2/3/4; practice at bậc 5; NPC lối by
  taste/level; NPC lesson makes a work; old-save lối by level.
- 390x844: rotate prompt shown ("Xoay ngang điện thoại để chơi").
- recipes.js 755x1000: all steps clean (teacher learn, lvup ok, gift repeat ladder unchanged).
- ts-oldsave.js (origin/main build → this build): ok, 12 weeks, 0 errors.
- tuduc-mg compatibility (combined build: this branch + origin/review/tuduc-mg jtd.js/jtabs.js, jtd after j85): bot path makes a work;
  "Để trời định" makes no work and charges no material; a played result (raw 8) makes the work at raw 8 and charges fee + material;
  "Thôi, để lúc khác" charges nothing and the card fee stays right.

## Measures (dev/measure/tds_measure.js, heavy driver: up to 2 Tứ đức lessons per buổi, teacher when bạc ≥ fee+20)
See the table appended below (before = origin/main build, after = this build).

## Overlaps with review/tuduc-mg (C41, not on main)
- Conflicts on merge: only generated files (index.html, sw.js, assets.json) + the assemble list (add 'jtd.js' after 'j85.js' and keep
  'jrcp.js', 'jtds.js' last) + KIT.md (tuduc-mg vs main, not this branch).
- Runtime: jtds wraps `lessonVir` (captures tdPlay when jtd loads first) and `tdFinish` (raw/skip → the work); tuduc-mg reads
  `virCost(l)` → gets the 8% fee automatically. jtds rebuilds the Tứ đức card buttons and keeps tuduc-mg's "chơi một trò nhỏ" text when present.

## KIT REQUEST
- None. No new CSS, no KIT.md change.

## Open / for the coordinator
- Favour formula (2 + fee/4) is my reading of decision (b); the gift-scale argument says flat 4 was already roughly fair, so this is a
  mild scale-up at high rank (6–8). Easy to tune in BAL.rcp.tFavB/tFavK.
- D19 can value works with `wkEval(S,e.wk,target)`; Tứ đức kinds via `tdsKinds()`.
