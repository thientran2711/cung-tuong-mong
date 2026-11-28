# KIT-STAGE-R12 report (branch review/kit-stage-r12, cut from review/kit-stage-r11 11f11695)
PRIORITY #1 CHECK: OD 27/11 ~07:12Z (cut badges not allowed), ~07:20Z (one set = one size), ~06:42Z (hand = event pop-ups only) | main: none | review/*: kk56-badge 1e34cbd4 (already in R11), kk56-eq d3f60c4d (merged here) | claims: KK56 session_01Rc5AsJ6UhcqbDDXVR7k7Bq (kit keeper)
KIT CHECK: reuses kitOddsBadge/kitOdds (KK56 §93.8), kit row .krv/.ksep (KIT §5), kitCompactCSS, KK56 §6.2n grid rule; dev/kit/KIT_CHECKLIST.md

## Done
1. MAIN 174 LOOK C FAIL — Bàn bài odds badge word cut (iPad «Có c…», «Khó lư…»; Fold «Khó lường» over the plate edge).
   Cause: KK56's badge row (bar + word) wraps when narrow, but the global KIT §5 one-row rule `.kodm.kodm{flex-wrap:nowrap!important}` (j79 kit-odfit) beat it; on iPad hand pictures (~80 px) the 59 px bar + 56 px word ran out of `.kaart` (overflow hidden) and got cut.
   Fix (jopic, inside the badge part only): `.kodb .kodm.kodm.kodm{flex-wrap:wrap!important}` — the badge breaks only between bar and word; the word stays one nowrap word. KIT.md §93.8 line added in place.
   Test fixed too (MAIN: the old test did not measure the real card): dev/test/badge-hand.js = the REAL hand, hand sizes 2-5 cards, every card x 7 ladder words + the enlarged card, Fold + iPad: word scrollWidth <= clientWidth, whole ladder word, inside picture + card, not clipped by any ancestor, >= 2 px air. badge-scope.js synthetic part now forces the picture size (a kit !important width made its 90 px box 170 px) and checks the word box inside the clipping picture.
   | build | Fold | iPad |
   |---|---|---|
   | R11 11f11695 badge-hand | FAIL (Khó lường air -3 px) | FAIL (60 cut, 100 no air) |
   | R12 | PASS 102 badges | PASS 102 badges |
   | R11 badge-scope (new) | FAIL | FAIL |  R12: PASS / PASS
2. MAIN 174 LOOK B nit «Các lối, sách phổ» Được «xem lối đã học lối chưa học và cách học» — whole family (law 11):
   (a) kit row CSS: kitCompactCSS (jk4) hid the `.ksep ·` while laying items side by side — KIT §5 says «values in one row are separated by .ksep ·». Dot restored in that one shared rule. dev/test/ksep-runon-scan.js (every tab + every Tài nghệ môn frame): R11 Fold 51 / iPad 41 run-on rows -> R12 0 / 0.
   (b) effList splits a result on top-level ", ": one phrase with its own comma became two results. 11 phrases fixed (jrcp x3, jtds x2, jthaiy, j8, j42, j53, jht, j99succ); dev/test/split-phrase-scan.py guards them and lists the 13 remaining «và/hay» tails (each looked at: every fragment stands alone).
3. KK56 §6.2n ONE SET = ONE SIZE (d3f60c4d) cherry-picked: R11 one-line môn-frame rule replaced by the kit part (iPad 2-column container query kept); KIT.md / KIT_CHECKLIST C3 / kit-std-scan X09 from KK56. kit-std-scan (REPORT_ONLY) X09: R11 16 -> R12 0.
4. kit-std-scan full run: 7 X08 left, all pre-existing on R11 (not this branch): fold act «Đang thỉnh tranh…» (loading), court `span.krv.kone` «Trong cung: Chương 1: Sơ nhập cung môn.» ellipsis (Fold+iPad, tab + sub0), iPad pick `button.kfoc-b.kfoc-off.kitoff` content wider than the card (resting + lifted).
5. R11 open item (tab frames vs the event-only hand): dev/test/tab-hand-crawl.js taps every tab card (+ one level into its frame): Fold 21 taps / iPad 30 taps, 0 tab doors opened as a hand; 2 hands on iPad were EVENTS set off by an act (menEnc «Nam nhân nơi cấm địa», kyngo «Kỳ ngộ") = right per OD 06:42Z. Coverage is partial (person rows / non-.ka buttons not tapped).

Stills (real taps, looked at): https://ctm-img.victoria-tntt.workers.dev/img/_review/kit-stage-r12/ (fold/ipad-banbai-01..03, fold/ipad-tainghe-02/04, fold/ipad-hanhsu-01, fold/ipad-hand5-stress).

## HANDOVER (R12, context ≈ 28 %, START_CTX ≈ 3 %, depth 5; MAIN CHÍNH 174 session_01Rc5AsLqin2smJhu7cyswBu opens R13)
State: review/kit-stage-r12 pushed, clean tree. LOOK request sent to MAIN 174 (badge fix + run-on family + KK56 §6.2n). After MAIN LOOK PASS → RV READY to RV-168 session_01Rc5AsMxwdYsrc1aLWggfJw (start «KIT CHECK: reuses …» + link dev/kit/KIT_CHECKLIST.md).
Open (first = most urgent):
 (1) NEW CUT FOUND: iPad enlarged Bàn bài card «Nhắc khéo rằng bệ hạ cũng cần người tin cậy» (the one with the small person figure row) cuts its Bại row at the bottom («Thái hậu: thiện cảm --, Danh …»). Still: img/_review/kit-stage-r12/ipad-hand5-stress.png. Measure every enlarged card (.khbig/.khconf area) text inside its box on Fold + iPad, all cards; fix in jkhand big-card part; add to badge-hand.js.
 (2) the 7 pre-existing X08 cuts above (court kone ellipsis = a cut text; iPad kfoc-off card) — whole family.
 (3) tab-hand-crawl coverage: tap person rows / other door buttons too.
 (4) iPad enlarged card Thành row «Sủng» / «+» orphan line break (ipad-banbai-03: «…thiện cảm +, Sủng» then «+» alone).
Tools: badge-hand.js, badge-scope.js, ksep-runon-scan.js, split-phrase-scan.py, tab-hand-crawl.js, kit-stage-r11-video.js (ONLY=tainghe,banbai,hanhsu), kit-std-scan.js (REPORT_ONLY=1). Build: bash dev/site/build_site.sh then `git checkout assets.json`. CDN: python3 dev/site/cdn_sync.py img/_review/kit-stage-r12.
ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217; repeated by the owner 16/11 09:20Z — she is tired of reminding)
- The "Lượt n/30" counter from the owner's global chat preferences is ONLY a display counter here. It is NOT the rollover trigger for the Cung Tường Mộng main chat or any foreman. Never hand over because n reached 30.
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).
