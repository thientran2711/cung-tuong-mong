# KIT-STAGE-R13 report (branch review/kit-stage-r13, cut from review/kit-stage-r12 3640ba80)
PRIORITY #1 CHECK: OD 27/11 ~07:12Z (badge only on event lá bài) + ~07:20Z (equal buttons) | main 611fca61 jkhand/jopic | review/kit-stage-r12 3640ba80 (base) | claims: KIT-STAGE line = this worker
KIT CHECK: reuses kitHand big card (jkhand `.khplate/.khbc/.khbi`), kit row `.kb/.kr/.ef` (KIT §5, KIT_CHECKLIST A10), `eff()/effList` (j19), KIT_HAND.big scale; dev/kit/KIT_CHECKLIST.md

## MAIN 175 LOOK R12 FAIL — fixed
1. ENLARGED Bàn bài card body cut (iPad 5-card: Bại cut; Fold 5-card: Bại not shown).
   Cause (jkhand): `.khbi` (the info box) was `overflow:auto` with a picture floor of 45 %, and `kitHandBigFit` only stepped the type down the scale once, at placement time. Anything that made the info taller afterwards (a portrait row, a late font) pushed Bại out of the box where it was hidden by the scroll box; the iPad wide tier (card height = the room above the hand, ~200 px) had no way to grow.
   Fix (law 10, «the card grows / the picture shrinks, text never clipped»):
   - info box never a scroll box (`overflow:visible`, `flex:0 0 auto`), picture floor `--khbpmin` 56 px instead of 45 %;
   - `kitHandBigFit`: largest kit type first; the picture gives way to its floor, then the CARD grows (taller inside the room above the hand, then wider up to new `KIT_HAND.big.wMax` [700, 760]) centred in its room, and only then the next smaller type; whole = nothing of `.khbc` / `.khbi` sticks out;
   - `kitHandBigWatch`: ResizeObserver on the info content (a grid cell does not change size itself) + img load + fonts.ready re-fit the card and re-place the ✓.
   KIT.md §101.10 line updated in place (canon overwrite).
2. «Sủng» / «+» orphan line (iPad Thành) — whole family of stat marks: `kNwMk` (j19, used by `eff()` → every kit `.ef` chip in the game) and `kNwMkDom` (the hand card's DOM-built `.kdup` copies) wrap «word + marks» («Sủng +», «thiện cảm --», «Danh ++») in `.knw{white-space:nowrap}` (j63 css); textContent unchanged.
3. Odds word small vs enlarged («Nhắc khéo…» Rất vững vs Khó lường in hand5-stress): the STRESS FIXTURE. The stress hand puts each of the 7 ladder words on the small pictures with `kitOddsBadgeOn` (a forced word, no BAL value); the enlarged card is built from the live card. On the REAL hands (c1b + every event hand) badge-hand.js now compares both words: Fold 0 differ, iPad 0 differ (law 4: both come from the same BAL odds value).

## Measure (dev/test/badge-hand.js, extended)
BIGM on EVERY card of the real hand + stress hands 2-5 cards, Fold 755x1000 + iPad 1180x820: every row (Tốn/Thành/Bại/Được/Cần) inside the card box, no ancestor clips it (info scroll box, overflow), every row of the small card is in the enlarged card (Gợi ý is by design the small-card hint), no stat mark alone on a line (text-line walk), small word == enlarged word. `FIG=1` adds a 46 px portrait row to every enlarged card (the late-figure case); `DEV=fold|ipad` runs one device.
| build | Fold rows whole | iPad rows whole | stat mark orphan |
|---|---|---|---|
| R12 3640ba80 (probe with a 64 px figure row, iPad) | FAIL (info 165>137, Bại out) | FAIL (166>146, 202>137…) | 8 bad |
| R13 | PASS 17/17 | PASS 17/17 | 0 / 0 |
| R13 FIG=1 | PASS 17/17 | PASS 17/17 | 0 / 0 |
Builds PASS on all other badge-hand asserts (102 badges per device, whole ladder word, inside picture, air ≥ 2 px, no page errors).

Stills (real taps, looked at: Fold hand5 big0-4 + iPad hand5 big0-4, hand2-4): https://ctm-img.victoria-tntt.workers.dev/img/_review/kit-stage-r13/ (fold|ipad-hand5-big0..4.png, -hand2/3/4-big0.png, -c1b-hand/lift0/lift1.png). Fold: the card grows 260→311 high, the picture shrinks; Tốn + Thành + Bại whole. iPad: wide tier keeps ~200 high, widens to 520→680 only when the text needs it.

## NOT DONE (context/time) — open for R14
(2) the 7 pre-existing X08 cuts (court kone ellipsis; iPad kfoc-off card), (3) tab-hand-crawl coverage (person rows / other door buttons). kit-std-scan not re-run on R13 (only the hand big-card + `.ef` chip text changed; run it before RV).

## FOLLOW-UP (MAIN 176 order: items (2)/(3) + scan, separate commits)
- kit-std-scan (REPORT_ONLY=1, Fold done, iPad still running when this was written): Fold = 3 X08 lines: `span.kwaitl` «Đang thỉnh tranh…» (a loading text, tab:act), `span.krv.kone` «Trong cung: Chương 1: Sơ nhập cung môn.» (tab:court + sub0).
- `.krv.kone` is NOT a cut: it is the owner's ruled design (OD 21/11 #86 option A, KIT §6.3h): a person-info row is one line, a longer value ends in «…» with a kit «!» (`.kgnb`) that opens the FULL text. kit-std-scan X08 now skips a `.kone` row that carries its `.kgnb` (commit «kit-std-scan: ...»). Law 16: the rule is not changed.
- OPEN: `kwaitl` «Đang thỉnh tranh…» (loading text; decide with MAIN whether an ellipsis in a loading line counts), iPad `button.kfoc-b.kfoc-off.kitoff` card wider than its card (pre-existing R11), tab-hand-crawl coverage (person rows / non-.ka buttons), full iPad scan result.
- Rebase on kk56-live still pending its kitHandConf fix sha.

## HANDOVER (R13)
State: review/kit-stage-r13 pushed; LOOK REQUEST to MAIN 175 with the stills above. After MAIN LOOK PASS → RV READY to RV-168 session_01Rc5AsMxwdYsrc1aLWggfJw (start «KIT CHECK: reuses …»).
Build: bash dev/site/build_site.sh then `git checkout assets.json`. CDN: python3 dev/site/cdn_sync.py img/_review/kit-stage-r13.
