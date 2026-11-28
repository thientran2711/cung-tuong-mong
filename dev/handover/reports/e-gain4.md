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
