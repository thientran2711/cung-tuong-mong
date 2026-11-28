# E-GAIN4 — small E unit after e-gain3-live (worker report)

PRIORITY #1 CHECK: OD 0 | ledger 0 | claims: E-GAIN4 (this, session_01DgYSWkfJaoCNrHwituB9Pa, opened by FOREMAN E child7) | main LIVE **18003079** (jone.js / door-row-hint / door-loss / gain-empty present; e-gain3-live already in) | review/* 0 | orders: MAIN 179 27/11 ~17:00Z (APPROVED (a)(b)(c) + LAW3-DUOC-ROWS) + KK60 KIT §104.2d 27/11 ~19:00Z.
KIT CHECK: reuses kaRows / kcls rows via optLine + kitParse (x = Thành/Được, risk = Bại), KIT_ACT_CATS data lines (the jcycle / jexam way), DOOR.T row `cat`, doorGain (jdoor), ONE.tierRows (jone), j15 pop-up group tabs (.pct). No kit internal edited (j63, j19, j79 regexes, jk2b, jkring untouched), no CSS / frame / part added → no KIT REQUEST. kit-std-scan not run (no CSS / part touched).
depth 8 (get_session lineage.depth = limit). START_CTX ≈4 % (used_tokens reads 0; own estimate).

Branch **review/e-gain4**, base origin/main = LIVE 18003079. Files: dev/build/{jone,jtoil,jrcv,j9,j15}.js, dev/test/{gain-empty (e), e-gain4-unit (new), poptab-scan (new), row-law3-scan (new)}.js, index.html + sw.js (built; assets.json = LIVE). No BAL key added; every number printed comes from BAL (law 4).

## (a) WRONG TAB — «Đổi người chạy việc» under «Trừng phạt»
Cause: a pop-up card's tab = kitActCat(card name) (j15 groups); the groups match words ANYWHERE in the name, so a stray word picks the tab.
Scan: dev/test/poptab-scan.js — every card of every pop-up (people at home + every place, act-audit states dau/toi/cao/con/hau/hh) with its tab (LIST=1 prints every tab|card pair). Whole family found (LIVE, Fold 881 cards / 43 distinct pairs):

| card | LIVE tab | why | branch tab |
|---|---|---|---|
| Đổi người chạy việc (maid) | Trừng phạt | «đổi người» in the trừng-phạt group | Hầu hạ |
| every «Đổi người nấu / nếm món / đưa thư / gác cổng …» guard choice (static grep, 16 names) | Trừng phạt | same word | Hầu hạ |
| Hỏi người hầu: đó là ai? (npc) | Hầu hạ | «người hầu» | Giao thiệp |
| Cài người vào cung khác (maid) | Đi lại | «vào » | Mưu kế |
| Chưởng sự tra xét cung nữ (maid) | Đi lại | «ra » in «tra xét» | Mưu kế |
| Ban thưởng (rival door P13r, jone) | Trừng phạt | door row cat «trung-phat» | Ban thưởng |
| Chăm sóc (child pop-up) | Hầu hạ | «chăm» (the name alone also names pet / plant care) | Chăm con (only in a child's pop-up, beside «Canh giữ các con») |

Fix: jone.js KIT_ACT_CATS data lines first (`^đổi người` → hau-ha, `^hỏi người hầu` → giao-thiep, `^(cài người vào|chưởng sự tra xét)` → muu-ke); P13r `cat:"ban-thuong"`; j15 popCard: in a child pop-up a «hau-ha» card is «cham-con». Kept on purpose (same matter): «Thưởng phạt» (servant) and «Tha tội» under Trừng phạt; «Mua chuộc» under Hại người (kit regex, deliberate); default-group cards («Thêm cung nữ», «Đề bạt …», «Giao việc phòng bị») stay Giao thiệp.

## (b) LOCKED TIER prints «—»
Places that can print «—» for a tier (grep of every tier summary): jone doorFold (pop-up door line «nhẹ Vững · vừa —») and jone deckPaint (deck card line «nhẹ: … · vừa: —», jone.js:192). No other tier summary prints «—» (grep `"—"` over dev/build: only non-tier labels).
Fix: ONE.lockW(why) = the head of the tier's real lock reason (cardWhy / a.lock text / «không đủ bạc» / whyTime — the words its own row shows), before « — » and without «(…)» counts, first letter small; ONE.tierW used by BOTH summaries. Real state (dau/cao, 3 khắc spent): LIVE «Nghỉ ngơi — nhẹ: Nghỉ ngơi một lát · vừa: —» → branch «… · vừa: chỉ buổi tối» (Fold + iPad DOM; iPad shot). No %, no digit in the words.

## (c) BẠI ROW CARRYING A GAIN
Cause: jtoil put a consort's verdict on her look into `risk` (kit «hỏng:» → Bại) whatever its sign: praise «nàng ta chuộng giản dị: quý ta +N» and tease «nàng ta bớt ghen (Ghen −N)» are HER gains.
Scan: dev/test/row-law3-scan.js PLUS (a Mất / Bại / Kèm piece that is a gain: green .ef.g or «+N» on her side; KIT 6 failure-consolation exception listed apart as CONSOL). LIVE Fold: «Chào hỏi», «Nhờ giúp đỡ», «Hỏi han sức khỏe» (and every option of that consort's pop-up — the verdict rides on all of them) carry «Bại: nàng ta chuộng giản dị: quý ta +»; the Giao hảo «Ghé chơi · nhẹ» row of the order is the same rider. No other plus-in-Bại source found.
Fix: jtoil splits the verdict: gain pieces (TOILV.gain) → the option's x (Được / Thành), loss pieces (frown, ghen +) stay on risk; never added twice (a one-tap door already carries its way's line).

## (d) LAW3-DUOC-ROWS — every action result shows Được + Mất
Checked first on LIVE 18003079 (e-gain3-live in): rival «Trò chuyện» Mất-only draw — **0** in row-law3-scan (3 draws × 6 states × Fold) → already fixed by e-gain3-live (j9 «Bàn tán về» gate). Still open on LIVE:
| card | LIVE | branch |
|---|---|---|
| Nhờ giúp đỡ (rival / hh pop-up) | Được = «Sẵn lòng, nàng có thể giúp hết lòng, làm qua loa, từ chối, hoặc đem chuyện đi mách» (a description, no gain, no loss) | Thành: «nàng giúp hết lòng: Bạc +, hoặc chứng cứ + về kẻ khác, làm qua loa: Bạc +, <word>» · Bại: «nàng từ chối: hai bên quý nhau −, nàng đem chuyện đi mách: Danh −» (jrcv rcvHelpX from BAL.ag.cx2.help.bac / .fail, BAL.rcv.help.half / .danh, BAL.ag.ev.one — the numbers rcvHelpOpts pays) |
| Mua chuộc (servant of another palace, j15) | Thành = «Bạc −30» (its price) | Tốn Bạc · Thành «<tên> thành tai mắt của ngươi» (j29 bribeServ spyFor) · Bại «nàng mách chủ, chủ nàng có <BAL.eff.j29.evBribeServ> chứng cứ về ngươi» |
| Vu tội (servant, jmline) | Thành empty («bị phạt quỳ» read as a loss → Kèm) | Thành «nàng <tên> chịu phạt quỳ, lòng nàng với chủ −» (kit «nàng … −N» = her gain) |
| Lập phe cùng <tên> (ring plaque, j10) | Được empty when her word is «Không ưa …» (kit reads a «Không …» lead as a note) | word after the gain → Được «lập phe với <tên>, có phe thì được che chở» |
| Dò la (one-tap pop-up door, P5) | Thành = «Dò la: Bạc −−» (its PRICE; NODUOC in 3 of 6 states) | Thành = «Dò la: chứng cứ +» (+ Tâm cơ when shown) — jone one-tap: when the picked way's raw x names no gain, the button carries the gain of its own full line (doorGain; the jdoor E-GAIN3b rule), price pieces dropped (already in Tốn) |
Whole family = every one-tap door: e-gain4-unit (d) reads every one-tap door of every consort at every place × 3 draws (doorGain of the line non-empty, never only a price).

## (e) KK60 KIT §104.2d
dev/test/gain-empty.js NAV list skips `b.closest("[data-knav]")` beside `.tdseg` (ring openers = doors; law 3 is checked on the plaques the ring drops). row-law3-scan skips them too.

## C. Tests
Final head **2e5a4006** (review/e-gain4). Full gate queue ran on a7d93119; the three later commits only change the lines of «Nhờ giúp đỡ» / «Mua chuộc» / «Vu tội» / «Lập phe cùng» (+ unit), so the gates that read those cards were re-run on the newer heads (marked ²).

| gate | LIVE 18003079 (before) | branch |
|---|---|---|
| e-gain4-unit (new, 17 fixed cases a–d) | **3 ok / 14 fail** | **17 ok / 0 fail** (Fold ×4 runs + iPad)² |
| e-gain4-unit mutants a / b / c / d | — | exit 1 / 1 / 1 / 1 |
| poptab-scan (new) Fold / iPad | **8 wrong-tab** (881 cards) / – | 0 wrong (734 cards) / 0 wrong (791 cards) |
| row-law3-scan (new) Fold, 6 states × 3 draws | PLUS 4 (dau 2, hau 2) · NODUOC 3 (Dò la: con, hau, hh) · DASH 0 | **0 / 0 / 0** in all 6 states (341–965 cards each; hh re-run² 648) |
| row-law3-scan iPad | dau: NODUOC 3 (Dò la, Mua chuộc, Vu tội) · hau: PLUS 1 + NODUOC 1 · toi/cao 0 (con/hh stopped) | **0 / 0 / 0** in all 6 states (hh + dau re-run² 754 / 338) |
| (b) real state, 3 khắc spent (DOM, Fold + iPad) | «Nghỉ ngơi — nhẹ: … · vừa: —» | «… · vừa: chỉ buổi tối» |
| gain-empty Fold / iPad (with §104.2d skip) | – | 1541 / 1601 cards, **0 empty**² (one run before the j10 fix: Fold hh «Lập phe cùng <tên>» plaque empty → fixed, LIVE-own) |
| door-row-hint Fold / iPad | – | 8007 rows 0 bad / 7359 rows 0 bad, exit 0 |
| door-row-hint MUTANT=1 (dau) | – | exit 1 (2 bad) |
| door-loss Fold / iPad | – | 367 ways 0 bad / 698 ways 0 bad, exit 0 |
| act-audit cao Fold | – | errs=0 (a7d93119 and again on 25f749f9²) |
| quickcheck (build · core gates · old save · perf Fold/iPad) | – | run PASS (build own · open 2214 ms · **old save ok** · perf median new/live: render 355/307 ms, tab 526/544, buổi 2090/1780, tasks>200ms 29/30); core gate **G4 94-q-softlock FAIL (iPad 4)** = LIVE-own flake: re-run by hand on HTTP, LIVE 18003079 1 of 2 runs FAIL (Fold 4), branch 1 of 2 runs FAIL (Fold 1), same person-view/Q family (RV-173 recorded it LIVE-own); every other core gate PASS |
| page errors | 0 | 0 in every run |

Shots (looked at, not in git: /home/user/wt/eg4-shots, br-* = branch, live-* = LIVE; Fold 755×1000 + iPad 1180×820): a maid pop-up tabs (LIVE «Trừng phạt 1/1» → branch «Hầu hạ 1/1» holding «Đổi người chạy việc»); b iPad Hành sự «Nghỉ ngơi» line «nhẹ: Nghỉ ngơi một lát · vừa: chỉ buổi tối» (Fold: the deck sits behind the stage, DOM checked); c «Trò chuyện» Được «…, nàng ta chuộng giản dị: quý ta +» (LIVE: «Hỏi han sức khỏe» Bại «nàng ta chuộng giản dị: quý ta +»); d «Nhờ giúp đỡ» Thành / Bại, «Dò la» Thành «chứng cứ +» (LIVE «Bạc −−»).

## Not in this unit (LIVE-own, found while scanning — for Foreman E)
- Tier deck doors (e.g. «Nghỉ ngơi»): the card's Thành lists the WAY NAMES («Nghỉ ngơi một lát · Nghỉ ngơi dưỡng sức»), not their gains (jone deckPaint keeps the tier card's own grid). gain-empty counts names as a gain, so it passes. Same family as (d); needs the tier rows' gains in the deck card grid.
- j10 «Lập phe cùng» line types «2 khắc» / can(2) (law 4) — not changed here.
- Pop-up tier doors («Giao hảo», «Khiêu khích», «Cùng chơi / Thách đấu»): Được = the tier words line («nhẹ Rất vững vừa Rất vững nặng Tặng quà»), not a gain (kit reads d.x).

## Base / landing note
Base = LIVE 18003079. LIVE has since moved to **f7ea14b7** (lc34-savepid, save fix alone) — the lander re-merges (this unit touches dev/build/{jone,jtoil,jrcv,j9,j10,j15,jmline}.js + 4 tests; built files rebuilt on merge).

## HANDOVER (worker roll: context ≈ START_CTX + 30 %, past the +25 % line; only push + report remained, so I finished)
Nothing open in this unit. If a reviewer asks for more: tools in /home/user/wt/eg4-tools (ev.js probe, shots.js, gates.sh queue runner, r3.sh), shots in /home/user/wt/eg4-shots, worktree /home/user/wt/eg4 (branch review/e-gain4). Tests run on http (python3 -m http.server from /home/user/wt) or file:// (all except q-softlock).

---

# E-GAIN4B — fix the 3 FAIL items of review/e-gain4 (worker report)

PRIORITY #1 CHECK ('e-gain4|rcvWord|dress-verdict|lockW'): OD 0 | claims E-GAIN4 (archived), E-GAIN4-RV session_01DgYSWoUKNUCW56nNphgiiR FAIL (3 fixes), E-GAIN4B (this) | main LIVE **5ad52416** (unchanged; no merge needed) | review/* e-gain4 2e5a4006, e-gain4-rv-m cb84eec4 (base) | archive 0.
KIT CHECK: reuses kaRows / kcls rows (j63, untouched), j25 optLine (game-side line writer, KIT.md «game side j2/j17/j19/j25/j70»), jdoor doorFold line, jone tier summary, the Ghi chú note row («(…)» value → Ghi chú, KIT 6). No kit module edited (j19 / j63 / j79 / jk2b / jkring untouched), no CSS / frame / part → no KIT REQUEST. kit-std-scan: see table.
Worker: E-GAIN4B session_01DgYSWkaniqei11DuQ25PBJ, **depth 1** (get_session lineage.depth), START_CTX ≈5 % (used_tokens read 0; own estimate). Opened by FOREMAN E C9; reports to C10 session_01DgYSWp6UVPu114RgZTqHMq (C9 → C10 notice 28/11 07:59Z).

Branch **review/e-gain4b**, base review/e-gain4-rv-m cb84eec4 (= LIVE 5ad52416 merge + reviewer fixes). Head **d1afe230** (code = cc7b2ceb; d1afe230 only lengthens a unit wait). Files: dev/build/{j25,jdoor,jone,jrcv,j9,j10,j83,jration}.js, dev/test/{e-gain4-unit (4 new cases), e-gain4b-scan (new)}.js, index.html + sw.js (built; assets.json = LIVE). No BAL key added; no number typed (law 4).

## Fix item 1 — (b) had no failing test
New unit case **b2** reads the PRINTED tier summaries in REAL locked states: every Hành sự deck tier card (`.klead` / `p`, jone deckPaint) and every pop-up tier door (`d.x`, jone doorFold, + the pop-up button text), states dau / cao / toi / hh × khắc spent 0 / 3 × (second pass) empty purse; counts only tiers ONE.tierRows says are locked (≥ 1 deck AND ≥ 1 pop-up must be read) and FAILs on any «—».
SOURCE mutant (jone doorFold `${x.t} —` + deckPaint `"—"` restored, rebuilt): unit **exit 1** — «nhẹ: Nghỉ ngơi một lát · vừa: —» (deck) + «nhẹ — · vừa — · nặng —» (pop-up), 86 lines. Branch: deck 8–18 / pop-up 6–56 locked tiers read, 0 «—».

## Fix item 2 — the willingness word (rcvWord) shown as a gain
Whole group = every line that prints rcvWord (static grep: 9 sites), each read as the kit draws it:

| card (file) | before (head cb84eec4) | after |
|---|---|---|
| Nhờ giúp đỡ (j9) | Thành «…, làm qua loa: Bạc ++, **Lắm lời**, …» | Thành = gains only · Ghi chú «(ý nàng ta: Lắm lời)» |
| Lập phe cùng (j10) | Được «lập phe với …, có phe thì được che chở (…) **Sẵn lòng**» | Được = the gain · Ghi chú «(ý nàng ta: Sẵn lòng)» |
| Mời (j10, in a faction) | word first («Không ưa · được: …») | gain first · Ghi chú note |
| Đồ cấm from an ally (j83 illAsk) | Được «**Sẵn lòng** · nàng có thể đưa…» | Ghi chú «(ý nàng: …)» |
| Mượn son phấn (jration) | Thành «được chia nửa hộp … , **Miễn cưỡng**, nàng cũng có thể từ chối …» | Được «được chia nửa hộp … (hoặc chút ít cho có)» · Ghi chú «(ý nàng: Miễn cưỡng — nàng cũng có thể từ chối hoặc đem chuyện ngươi hết son phấn đi kể)» |
| Mời đến cung ta (j21), Kết giao xw (j8/j6), Nhờ ơn rút thẻ bài (jecon), Gửi thư xin vào phe (j14) | already Ghi chú | unchanged |

Helper: jrcv `rcvWordN(t,a,nm)` = «(ý <nàng>: <word>)», one «(…)» value → kit Ghi chú. Scan e-gain4b-scan WORD (every surface, 6 states): head **4** (Nhờ giúp đỡ ×3, Mượn son phấn) → branch **0** Fold + iPad. Unit case **f** (Nhờ giúp đỡ at every place, «Lập phe cùng» panel, «Mượn son phấn»): SOURCE mutant (j9/j10/j83/jration back to the bare word) **exit 1** (8 cards).

## Fix item 3 — the dress-verdict gain in Ghi chú
Root cause (law 11, the whole family): **j25 optLine** joined every x piece of a talk option into ONE «thành:» segment with «, ». A door's line «chọn một trong N việc: A, B · được: X; Y» became «thành: chọn…: A, B, được: X; Y», and the kit (kaModelStr: «; » split, a «nàng» clause kept whole) read «chọn…: A, B, được: X» as ONE neutral note → the door's FIRST gain sat in Ghi chú (the dress verdict when present, else the door's own first gain, e.g. «nàng bị phế hoặc giáng» / «nàng bị quở…»); a door without a «nàng» gain instead split its way NAMES into Được («Tố xa xỉ»); «Mặc cả chứng cứ» printed a literal «được: Bạc +++».
Fixes: (1) j25 `j25Gain`: a piece its writer LABELLED («được: / thành: / tốn: / hỏng: / bại: / mất: / kèm:») or wrote as a whole note «(…)» keeps its own « · » segment; (2) jdoor: the way list is one note «chọn một trong N việc (A, B)»; (3) jone tier summary: the tier line replaced jdoor's line and DROPPED the verdict → `toilG(L)` re-says the verdict pieces the talk members carry as «được: …» (a door of in-person acts only carries none — the verdict rides on talk options only, jtoil).

| card kind (rival pop-up, verdict on) | head | branch |
|---|---|---|
| door «Tố cáo», «Dò la» (jdoor) | Ghi chú «chọn một trong 2 việc: …, được: nàng ta chuộng giản dị: quý ta +» | Được «nàng ta chuộng giản dị: quý ta + · nàng bị phế hoặc giáng · Danh ++» · Ghi chú «chọn một trong 2 việc (Hặc ăn mặc sai phẩm, Tố xa xỉ)» |
| tier «Giao hảo / Khiêu khích / Hạ uy thế / Hãm hại» (jone) | verdict nowhere | Được «nhẹ … · vừa … · nặng … · nàng ta chuộng giản dị: quý ta +» |
| one-tap «Dò la» | Được «Dò la: chứng cứ +, …» | same (kept) |
| plain «Trò chuyện / Nhờ giúp đỡ» | Được | Được (kept) |
| one-tap act door «Ban thưởng» (no verdict) | Được «Ban thưởng, tốn: Bạc 30, thành: …» (price glued into Được) | Tốn «Bạc 30» · Được «thiện cảm +++ …» (way name still leads — LIVE-own family, below) |

Scan e-gain4b-scan: TOILNOTE head **2** → **0**, TOILMISS head **4** → **0** (Fold 1739 / iPad 1701 cards). Unit case **g** (every card kind: plain / door / tier / one-tap): SOURCE mutant (j25 join, jdoor «: A, B», jone toilG removed) **exit 1** (10 cards).
Reviewer's extra pin **d2** («Dò la» one-tap Thành names chứng cứ +, never only Bạc −): SOURCE mutant (jone one-tap block removed) **exit 1**.

## Gates (final build = head; each source mutant built from the head with only its fix reverted)
| gate | head cb84eec4 (before) | branch |
|---|---|---|
| e-gain4-unit Fold / iPad | 23 ok / 3 fail (f, g; b2 passes — fix was in) | **26 / 0** Fold ×3, iPad ×1 |
| unit source mutants b / f / g / d2 | — | exit **1 / 1 / 1 / 1** |
| e-gain4b-scan Fold, 6 states (verdict stubbed on) | WORD 4 · TOILNOTE 2 · TOILMISS 4 (1893 cards) | **0 / 0 / 0** Fold 1739 · iPad 1701 |
| row-law3-scan Fold, per state | (reviewer: cap hit) | dau 345 · toi 656 · cao 670 · con 514 · hau 454 · hh 721 cards — DASH / PLUS / NODUOC **0** each; re-run on the final build dau 803 / hh 456 cards **0** |
| row-law3-scan iPad, per state | — | dau / cao / con / hau / hh **0**; toi **NODUOC 1** «Cài người vào cung khác» picker row = LIVE-own (below; line not touched) |
| gain-empty Fold / iPad (with §104.2d skip) | — | 1162 / 1256 cards, **0 empty** |
| door-row-hint Fold / iPad / MUTANT=1 | 0 bad | **0 bad** (8136 rows) / **0 bad** (8802) / **exit 1** |
| door-loss Fold / iPad | — | 433 ways 0 bad / 561 ways 0 bad |
| poptab-scan Fold / iPad | — | 0 wrong (890 cards; final build 819) / 0 wrong (875) |
| act-audit cao Fold | — | done **errs=0** (486 s) |
| quickcheck (build-own · core gates incl. G4 q-softlock · time-spill · old save from LIVE 5ad52416 · perf) | — | **PASS** 1375 s: core gates PASS, time-spill PASS, open 1844 ms, **old save ok** (load + buổi, 0 errors), perf new/live render 249/244, tab 481/427, buổi 1430/1619, tasks>200 25/30 |
| q-softlock A/B (HTTP, 2 runs each) | LIVE 5ad52416: run1 **FAIL (4)** (LIVE-own flake, as RV-173 / E-GAIN4 recorded) · run2 PASS | **PASS · PASS** |
| kit-std-scan REPORT_ONLY SUBS=0 Fold + iPad | LIVE 28 FAIL in 3 rules (X02 20 · X06 4 · X08 4) | **= LIVE** 28 in 3 rules, per rule identical → nothing branch-born |
| time-spill-guard | — | PASS static + runtime |
| page errors | 0 | 0 in every run |
Note: the first iPad lane ran on the build before the last jration commit; its door-row-hint flagged that build's «Mượn son phấn» row hint (fixed in cc7b2ceb, re-run 0 bad); its other rows are unaffected (only the jration line changed).

Shots (law 12, Fold 755×1000 + iPad 1180×820, looked 3×, scratch only /home/user/wt/eg4b-shots, not in git): Nhờ giúp đỡ (Thành gains, Ghi chú «(ý nàng ta: …)») both; Tố cáo (Được verdict + gains, Ghi chú «chọn một trong 2 việc (…)») both; Giao hảo / Khiêu khích tier (verdict in Được) both; deck «Nghỉ ngơi — nhẹ: Nghỉ ngơi một lát · vừa: chỉ buổi tối» iPad; «Lập phe cùng» card (Được + Ghi chú) Fold.

## Not in this unit (LIVE-own, for Foreman E)
- «Cài người vào cung khác» (j10 PEND.plantsv): when no servant is free, parallel time replaces the option's line with «không còn ai rảnh để sai (người hầu đang đi việc)» but the option stays ENABLED with no Được (row-law3 iPad toi NODUOC). Should be locked with that reason.
- One-tap ACT doors («Ban thưởng», P13r) lead their Được with the way NAME («Ban thưởng · thiện cảm +++…»); tier doors print tier words as Được (same «names as gains» family the E-GAIN4 report noted).
- jk2b kitHint reads a willingness word as «thiện cảm +» when it builds a hint from a rendered line (kit internal — KIT REQUEST material if the kit keeper wants it).
- j83 illAsk: «đưa: có <item> (…)» (her gain) lands in Kèm (red) — the line has no «thành:».


HANDOVER: nothing open. Tools /home/user/wt/eg4b-tools (ev.js probe, shots.js, gates.sh / gates2.sh queues, mut.py = the four source mutants, units.sh), shots /home/user/wt/eg4b-shots, worktree /home/user/wt/eg4b. Context at finish ≈ 28 % (START ≈5 %), under the +25 % line plus push + report.
