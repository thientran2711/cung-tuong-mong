# Review: review/mg-balance-2 @ b011cf71 → review/mg-balance-2-r1

RESULT: PASS 961c1f8b2da212d0155b4f943b887f7193442b6f (descends from origin/main 5682ce6f)

Reviewer: opus (minigame difficulty numbers), 11/16/2026. Rules read: START_CORE / START_WORKER / START_REVIEWER, topic files wording, kit-ui, balance-economy, systems-other (OD:L1255 / L1265 no word games / L1266 MEDIUM 20–30 % / L1267 ONE CORE, KIT FIRST, VANPHONG).

## Branch history
1. 14893f76 merge b011cf71 onto origin/main 0ee35a63 (jbal2: main's BAL.mline + this BAL.mgTier both kept; assemble: main's list + jmgt after j91; site rebuilt).
2. 6824958a reviewer fixes (below).
3. 961c1f8b merge origin/main 5682ce6f (main moved during the review: nw-lantern / nw-quiz / nw-poem, title-tag, design-scale p2 …): j91 = main's (k91Lantern word game deleted by nw-lantern; this branch had only edited it), jbal2 both, assemble jmgt after j91 (before jnwp), MINIGAMES.md both sections; jnwq / jlant tier fix (below); site rebuilt.

## Code check
- Levers: every new board number in `BAL.mgTier.lev[kind]` read by `mgLev` (ease 0..5, linear): banh lag / gust / gap, co lim / fast / extra, mua beat / sp / retry, td_hanh lim / short, dauho aid / mouth, td_dung band / kick, td_ngon band / win / rate / fade. All are real board changes (fire lag + «Gió lùa» gusts, timer + busier Cờ boards + slow capture worth less, beat window + forgiven step, Làm phúc timer + short portions, aim-dot length + mouth size, sway + safe band, voice band + reply window).
- td_ngon «Nói đúng lúc, vừa tiếng»: no reading/word mechanic — the speaker line names who / mood, but the green band on the voice bar and the grey→green ring show everything needed; success = timing (wait for the ring) + hold/release inside the band. Old word bank gone. Gợi ý (tdWrap, ring on the Thưa button) + first-time demo card (k91DemoCard, moving example). Callers: tdPlay (Tài nghệ · Tứ đức, TD_OF ngon → td_ngon) and jtds lessons → same kind key, engine `tdtalk`; no other caller of the old engine (grep).
- Kit: no new CSS / classes / frames (k91Btns, kg82Canvas, kg82Lbl, kg82Rows, K91C palette). Consistency scan of the one new board element (vertical gauge): it copies the Nấu ăn fire gauge; two colours drifted (zone alpha .42 vs 0x44, gradient #e8c06a vs #f0b040) → aligned (fix 3).
- VANPHONG: new player words («Gió lùa, lửa bùng/lụi», «Lỡ một bước, chạm lại», «Ăn nhanh thì được trọn phần», «Đừng cướp lời, chờ vòng xanh», «Im lặng lâu quá», «Lớn tiếng quá», «Hơi khẽ/Hơi to», «Vừa tiếng, đúng lúc») — no %, no odds numbers.
- Old saves: no new save fields (only S.mgSeen["td_ngon-demo"] via kg82Seen).

## Fixes made on review/mg-balance-2-r1
1. Tứ đức wrapper `tdWrap` rounded the raw to an integer before `kg82Play` grades it (`Math.round(raw−hints)`) — the "float scores on every engine" rule was broken for the 4 Tứ đức games, so the graded result jumped 9→10 and kG could not tune them (td_ngon at kG 1.6: Tuyệt phẩm only for a perfect 10). Now the float goes through (mgGrade rounds).
2. kG re-trim on pooled reviewer raws (post-hoc grading, the raw runs stay valid): co 4 → 3 (n=120 at Vừa: 9 % → 22 %), td_ngon 1.6 → 2 (float raws n=60: 35 % → 28 %).
3. Ngôn voice bar uses the Nấu ăn gauge colours (consistency).
4. Integration with main: `jnwq.nwqTier` called `mgTier(env.kind, KG82.ctx)` (a STRING as options → occasion "hoc" and her own rank: an exam ignored the target-rank stakes) and `jlant.lmTier` expected a number from `mgTier` (object → always the ease fallback). Both now read `KG82.tier` (set by mgSet in jexam / startContest / playArt / jts) like jnwp's nwTier. Every kg82Play caller is preceded by mgSet (grep: j82 startContest, playArt, jexam exRun, jts tsGame, jtd tdPlay; kg82Lesson).

## Re-measured — dev/measure/mg-bots.js, skilled + random, graded ≥ 9 = Xuất sắc (Tuyệt phẩm)
Dễ = hoc/0/2, Vừa = hoc/4/2 (matching level), Khó = hoc/6/1. Worker n=30; reviewer n per cell in brackets; final = with this branch's kG.
| kind | worker Vừa | reviewer Dễ | reviewer **Vừa** | reviewer Khó | random Vừa |
|---|---|---|---|---|---|
| banh Nấu ăn | 27 | 100 (30) | **27** (60) | 0 | 0 |
| co Cờ (kG 3) | 27 | 75 (60) | **22** (120) | 2 | 0 |
| mua Múa | 30 | 40 (30) | **20** (60) | 0 | 0 |
| td_hanh Làm phúc (float) | 23 | 73 (30) | **23** (60) | 3 | 0 |
| dauho Đầu hồ | 22 | 57 (30) | **20** (60) | 3 | 0 |
| td_dung Đi đứng | 23 | 100 (30) | **22** (60) (all runs pooled n=120: 30) | 0 | 0 |
| td_ngon Ngôn (float, kG 2) | 23 | 73 (30) | **28** (60) | 10 | 0 |
All seven inside 20–30 % at Vừa, Dễ > Vừa > Khó, random 0 % (mean ≤ 0.7). Batch-to-batch spread at n=30 is large (banh 13 / 40, td_dung 27 / 50), so only pooled numbers were used for trims.

## Tests (merged build 961c1f8b)
- dev/test/mg-balance-vp.js, old save made on origin/main 5682ce6f → new build; every KG82 kind opens + FINISHES by bot at 755x1000@2, 1000x755, 1180x820@2, 1366x1024@2, 844x390@2, 390x844@2: old save loads at every size; 28/28 kinds open + finish at each of the 6 sizes, 0 page errors, 0 horizontal overflow, intro «Độ khó» row present (vp2.json)
- Own script (tdPlay → intro → demo → Gợi ý → play → result → Tiến bộ) for td_ngon at the 6 sizes: every size reaches the result card, 0 page errors, 0 horizontal overflow; 390x844 shows «Xoay ngang điện thoại để chơi». Lever boards (banh gust, td_hanh timer, co, mua, dauho, td_dung) at Khó, 755x1000 and 844x390: 0 errors / overflow. Screenshots looked at (intro, demo card, play with hint ring, result; Nấu ăn, Làm phúc, Cờ, Múa).

## Trial merge with review/mg-train 4988b374 (NOT pushed)
Conflicts: assets.json, index.html, sw.js (generated → rebuild); assemble.py (keep main's list + jmgt after j91); j82.js (KG82_KIND mua/banh/huong: take mg-train's `banh:{e:"cook"}`/`huong:{e:"blend"}` + THIS branch's longer mua `how`); j91.js (mg-train deletes dead word-game code k91Verse… → take mg-train); jk3.js / jk4.js (unrelated: mg-train's older copy vs main's design-scale p2 → take HEAD/main); jlant.js / jnwq.js (same API fix both sides → take mg-train's `mgTierOf(env)`); jmgt.js (exports: keep BOTH `mgLev` and `mgTierOf`); KIT.md (§82 title-tag vs §79 slap → keep both); mg-bots.js (BOT: keep MGBOT_RT/PX env + this branch's timing list incl. td_dung,td_ngon + mg-train's aim:40); **jbal2.js BAL.mgTier — NUMBER TRAP: mg-train carries its own kAdj (mua −2, co −2, banh −2, dauho 0, no td_*) and kG (mua 8, co 4, no td_ngon) and no `lev` → take THIS branch's whole mgTier object** (the calibration above assumes the levers), and keep slap's `Object.assign(BAL.mgTier.occ,{tat,ne})` AFTER it.

## Open items (non-blocking)
- td_cong (Thêu theo nét, not touched here): integer raws, Vừa 35 % / Khó 30 % (n=60) — flat across tiers like mua was; needs a lever + float raw (same as this round).
- 844x390: the Ngôn board + «Thưa» fit together only after one scroll inside the game frame (same for every j91 canvas game; measured: board 61–321, button 308–359 of 390 after scroll).
- Engine geometry literals still in engines (TD_MOOD calm s, talk length, 30/70 split of Ngôn, Cờ 60 % floor, gust 0.7 s) — acceptable as geometry, could move to BAL.
- Still untiered: Điểm trang, Chải chuốt, Phối đồ, pet care (worker's list).
