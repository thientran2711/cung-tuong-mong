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

### Measure results (3 lives × 24 months each, ranks stayed 0–1 in this driver)
| build | Tứ đức lessons (teacher) | fee paid | fee per teacher lesson | fee / bổng over the run | Tứ đức works made | lối learnt | Đức end | NPC works (Tứ đức) |
|---|---|---|---|---|---|---|---|---|
| before (main) | 51/52/52 (22/17/18) | 330/240/250 | ≈14 | 23% / 18% / 19% | 0 | – | 52 | 0.4–0.6 (0) |
| after | 34/75/34 (32/3/34) | 192/9/136 | 4–6 | 13% / 1% / 10% | 34/75/34 (≈even over 4 kinds) | 4/4/4/4 | 62–63 | 0.55–1.3 (0–0.5) |
- The fee now follows bổng: 3–4 bạc at the low ranks (was 5–25 by bậc, ≈14 average), up to 22 at Hoàng hậu pay, so a teacher lesson is
  the same share of the month at every rank (owner 20:15Z "lower the price a lot" for low ranks; bạc rule).
- Đức +10 in this heavy driver comes from Hạnh works (Đức +1 each, same as chép kinh); a normal player makes far fewer. Tune by
  removing `fin` from WK.phucthien if reviewers find it too strong.
- NPCs now carry Tứ đức works (≈0.5 each after 2 years), which feed their gifts through wkNpcUse.

## Review r1 (reviewer, branch review/tuduc-sub-r1)
- Merged origin/main 9b4f1697a (conflicts: generated files + assemble list → main's list + `jstaff.js`, then `jrcp.js`, `jtds.js` last).
  recipes-r2 is still not on main; this branch carries it.
- Checked vs owner rulings: 4 kinds × 10 recipes × 4 tiers × 4 lối; lối 1 known, bậc 2/4/5 open lối 2/3/4 (player + NPC); fee 8% of bổng
  [3,4,6,8,10,13,17,22]; NPC study pays its own fee; lesson → work, material paid only when made; NPC works cap 4; old saves (ts-oldsave ok).
- `BAL.rcp.tFavor` getter: only callers are jrcp tchPaid + rcpTchAsk text (both use S at the same moment) → art-teacher text and charge
  agree (3..8 by rank instead of flat 4). OK.
- Favour vs fee (bạc-equivalence): j8 gift scale turns the fee into round(fee/12)+2 = 2..4 thiện cảm; the favour 3..8 is never below that
  and at most ~2×, and the consort road also blocks chân tình gifts to her for askW weeks and teaches only lối she knows. Judged
  EQUIVALENT ENOUGH (the bạc road is 8% of a month's pay at every rank, so neither road is free). Kept.
- FIX (Đức farm, LUẬT SỬA CẢ NHÓM: whole family = every work with `WK.fin` = Chép kinh + Vật cầu phúc): Đức from handmade works is now at
  most `BAL.wkFinCap` = 1 per month (j83 `wkFinLeft/wkFinTxt`; `S.wkFin`). Before, a bậc-5 "Tự luyện" (Thi kinh or Hạnh) gave Đức +1 per
  2 khắc without limit. All 5 text sites (j83 ×2, jwkr, jtds ×2) show "Đức +1, mỗi tháng một lần" / "tháng này Đức đã tăng rồi"; log says
  "Tháng này Đức đã tăng rồi, món này không thêm Đức." The work is still made.
  | heavy driver, 24 months | main | tuduc-sub | tuduc-sub-r1 |
  |---|---|---|---|
  | Đức at end | 52 | 62–63 | 55–56 |
  | Hạnh works | 0 | ≈10–19 | 8–9 |
- FIX: consort-taught Tứ đức lesson logged "Theo <giáo tập ma ma> … học Ngôn" (jstaff name) though a consort taught → now "Học Ngôn." and
  tdsFinish names the consort.
- Art: contact sheets (r01/r07/r10 × 4 tiers × 4 kinds + 4 covers; r02–r09 tiers 1+4): transparent 256 px, tiers rise clearly, no people.
  Note only: phấn son r03/r07 tier 1 (son giấy) reads a little like a stained paper; several tier-1 pieces look worn (by design "Thường").
- Kit: Tứ đức cards / Tác phẩm cards / "Các lối, sách phổ" = the same pbtn / kitSkillCard / kitModal parts as the art cards (identical
  "Các lối, sách phổ" pbtn as jrcp's). No CSS added. Consistent.
- Pre-existing on main (not this branch): material-choice option cards clip their last Được line vertically at 755x1000 (art kinds too:
  Cầm/Thi "Tuyệt phẩm: chỉ vật liệu quý", "quà giá trị +1"); ranges "+2..3", "(0..10)" in card text → review/act-text net covers them.
- Second merge: origin/main eba64ead4 (recipes-r2 is now ON main, jrcp.js sits at main's place after jnotes) → assemble = main's list +
  `jtds.js` last (after jtruth, jkpc). Diff vs main: assemble, j83, j85, jbal, jtds, jwkr (+ docs/art scripts/tests).
- Tests on the final build: tuduc-sub.js 755x1000@2, 1000x755, 1180x820@2, 1366x1024@2, 844x390@3: 0 errors, no overflow/cut/dialog-out,
  all checks right; 390x844 rotate prompt; recipes.js 755 clean; ts-oldsave (main → this) ok 12 weeks; coop-e2e 59/59. Đức cap unit
  check: 1st Hạnh work of the month +1, 2nd/3rd 0 with the log line, next month +1 again.
- Also seen (pre-existing family, main): teacher-picker option cards clip their last line vertically at 755x1000@1 (jrcp art version has
  the same text length) → actcard-one / act-text family.
