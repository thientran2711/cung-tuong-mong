# E-GAIN4-RV — BIG review of review/e-gain4 2e5a4006 — VERDICT: FAIL (3 fix items)

PRIORITY #1 CHECK ('e-gain4|gain-empty|poptab|row-law3'): OD 0 | claims E-GAIN4 session_01DgYSWkfJaoCNrHwituB9Pa RV READY 2e5a4006 (no other reviewer) | main LIVE **5ad52416** (webkit-lb, contains f7ea14b7; no e-gain4) | review/* e-gain4 2e5a4006 | archive 0.
KIT CHECK: reuses kaRows / kcls rows (optLine + kitParse), KIT_ACT_CATS data lines (jcycle / jexam way), DOOR.T row `cat`, doorGain, ONE.tierRows, j15 pop-up group tabs (.pct). Checklist: dev/kit/KIT_CHECKLIST.md. kit-std-scan (REPORT_ONLY, SUBS=0, Fold 755×1000 + iPad 1180×820): merge **28 FAIL in 3 rules = LIVE 28 in 3 rules**, per rule identical (fold X02 10 · X06 2 · X08 1; ipad X02 10 · X06 2 · X08 3) → nothing branch-born.
Reviewer: E-GAIN4-RV session_01DgYSWoUKNUCW56nNphgiiR, depth 1 (get_session lineage.depth), START_CTX ≈6 % (used_tokens read 0; own estimate).

## (0) Merge with LIVE
LIVE moved past f7ea14b7 to **5ad52416** (webkit-lb = f7ea14b7 + regex-lookbehind → kRx + webkit-syntax / webkit-boot hard gates). Merged origin/main 5ad52416 into 2e5a4006: **only index.html + sw.js conflicted** (as expected), rebuilt with dev/site/build_site.sh, assets.json = LIVE, sw.js regenerated on the LIVE assets.json → **a7e334b3** on review/e-gain4-rv-m. webkit-syntax on the merge: 476 modules, 0 parse-level hits (the branch adds no lookbehind). Head 2e5a4006 rebuild = its committed index.html except the build line (CTM_BI).
Reviewer small fixes on top (**f462ba55**, see §3): j10 faction panel khắc from BAL, j15 «Mua chuộc» pronoun for a thái giám. Branch tip = this review commit (child of f462ba55). NOT for landing (FAIL) — the worker's next round starts from it.

## (1) The five items — rerun by me + REAL source mutants (each fix reverted in dev/build, rebuilt, scans rerun)
| item | gate (head 2e5a4006) | source mutant (fix reverted, rebuilt) |
|---|---|---|
| (a) wrong tab | unit 17/0 Fold + iPad; poptab-scan Fold 839 cards / 43 pairs **0 wrong**, iPad 799 / 35 **0 wrong** | unit **exit 1** (8 fail); poptab **exit 1** — ok |
| (b) locked tier reason | unit (b) ok; iPad shot «Nghỉ ngơi — nhẹ: Nghỉ ngơi một lát · vừa: chỉ buổi tối» | **both summaries back to «—» (jone doorFold + deckPaint): unit 17 ok / 0 fail (exit 0), row-law3-scan dau,cao DASH 0 (exit 0) → NOT CAUGHT** (fix item 1) |
| (c) gains off Bại | unit (c) ok; Fold/iPad shot «Trò chuyện» Được «…, nàng ta chuộng giản dị: quý ta +» | jtoil = LIVE: unit **exit 1** (praise on Bại 1); row-law3 dau,cao 0 (world-drawn) — caught by unit |
| (d) Được + Mất | unit (d) ok; shots «Nhờ giúp đỡ» Thành, «Dò la» Thành «chứng cứ +» (LIVE «Bạc −−») | j9/j15/jmline/j10 = LIVE + jone one-tap block removed: unit **exit 1** (only the «Nhờ giúp đỡ» case; its one-tap check stays ok: 6 doors, 0 without gain), row-law3 dau,cao **exit 1** (NODUOC Dò la @cao) — caught |
| (e) §104.2d knav skip | diff = exactly the ordered `b.closest("[data-knav]")` beside `.tdseg`; gain-empty Fold 1663 cards **0 empty**, iPad 1442 **0 empty** | — |
Worker's MUTANT=a|b|c|d env mutants patch the page from the test itself (b replaces ONE.lockW) — they do not prove the printed summary; the source mutant above does, and (b) slips through.

## (2) Gates (merge-side gate queue stopped once FAIL was certain; quickcheck + kit-std-scan + webkit-syntax ran on the merge)
| gate | head 2e5a4006 | merge a7e334b3 |
|---|---|---|
| e-gain4-unit Fold / iPad | 17 ok / 0 fail ×2 | (same code; quickcheck build) |
| poptab-scan Fold / iPad | 0 wrong / 0 wrong | — |
| row-law3-scan | Fold dau/toi/cao clean then my 20-min cap hit (rc 124, load 4–8 on 4 CPUs); iPad cap hit — **not a full run**; source-mutant runs dau,cao clean on b/c builds | — |
| gain-empty Fold / iPad | 0 / 0 empty | — |
| door-row-hint Fold / iPad / MUTANT=1 dau | 7401 rows 0 bad / 7554 0 bad / **exit 1** (1 bad) | — |
| door-loss Fold / iPad | 351 ways 0 bad / 423 0 bad | — |
| act-audit cao Fold | done **errs=0** (578 s) | — |
| time-spill-guard | PASS static + runtime | PASS (in quickcheck) |
| quickcheck on merge (build-own · core gates incl. G4 q-softlock · time-spill · old save from LIVE 5ad52416 · perf) | — | **PASS** 1335 s: core gates PASS (16 hooks, q-softlock PASS first run → no LIVE-shared FAIL to A/B), time-spill PASS, open 1803 ms, **old save ok** (load + buổi, 0 errors), perf new/live render 193/199, tab 323/283, buổi 975/918, tasks>200 16/16 |
| kit-std-scan | — | = LIVE (28 / 3 rules both) |
| webkit-syntax | — | 0 hits |
| page errors | 0 in every run | 0 |

## (3) Law scan of every changed line
- Law 2: no tier set changed; (b) only the summary words. OK.
- Law 3: see fix items 2 and 3 (a non-gain shown as Được; a gain shown as Ghi chú). Otherwise every touched card now has Được + Mất.
- Law 4: rcvHelpX reads BAL.ag.cx2.help.bac / .fail, BAL.rcv.help.half / .danh, BAL.ag.ev.one — checked against rcvHelpOpts / rcvNoO / rcvSabO: the numbers and pieces match what the answers pay. j15 «Mua chuộc» prints BAL.eff.j29.evBribeServ (= j29 bribeServ evA). **j10: the worker rewrote the «Lập phe cùng» line and kept the typed «2 khắc» / can(2)** (the report says «not changed here») — a touched line with a typed number. Reviewer fixed the whole faction-panel group in f462ba55: facHTML + facAct, 13 sites (can / spend / «N khắc») → BAL.ag.par3.fac.k (=2, the constant «Gạch tên» already used). Behaviour identical. Left LIVE-own: «Ly gián» odds `odA(S,40+S.tamco/3)` (typed 40), j10 staff panel can(2) (lines 101–134), j29 relAdd(a,o,-5).
- Law 7 / VANPHONG: no %, no foreign words. Reviewer fixed j15 «Mua chuộc» Bại «nàng mách chủ, chủ nàng …» for a THÁI GIÁM → «hắn» (jpromsv's maid ? "nàng" : "hắn"). (b) lockW can print a BAL number when the head of the reason is «Sức dưới N» (whyTime) — a rule number, not prose; noted, not failed.
- Law 9/10: no CSS, no frame, no part; KIT_ACT_CATS edited only by unshifting data lines at runtime (jcycle / jexam do the same); kit modules j19/j63/j79/jk2b/jkring untouched — claim verified (git diff --stat: jone, jtoil, jrcv, j9, j10, j15, jmline only).
- Law 11 (other cards of the family the scans miss): poptab LIST pairs read by hand (43 Fold / 35 iPad) — no other wrong pop-up tab. Outside pop-ups (LIVE-own, for Foreman E): the Cung nhân staff card groups are HAND-LABELLED (j15 «Mưu kế» holds «Mua chuộc», «Dọa tố đối thực», «Bắt quỳ, vả miệng», «Vu tội») while the same cards in a place pop-up sit under «Hại người» / «Trừng phạt» — one card, two tabs.
- Law 12: shots Fold 755×1000 + iPad 1180×820, looked 3×, scratch only (not in git): (a) maid pop-up «Hầu hạ 1/1» holding «Đổi người chạy việc» (both); (b) iPad Hành sự «Nghỉ ngơi … vừa: chỉ buổi tối» (Fold: deck sits behind the stage, DOM read: same line); (c) «Trò chuyện» Được with the praise (both); (d) «Nhờ giúp đỡ» Thành, «Dò la» Thành «chứng cứ +» / Bại «chỉ uổng công» (both), «Mua chuộc» Thành «<tên> thành tai mắt của ngươi», «Vu tội» Thành «nàng <tên> chịu phạt quỳ, lòng nàng với chủ −−−», «Lập phe cùng» (DOM).

## FIX LIST (worker, on top of review/e-gain4-rv-m)
1. **(b) has no test that fails when the fix is broken.** Source mutant (jone doorFold `${x.t} —` + deckPaint `"—"` restored) → e-gain4-unit 17/0 and row-law3-scan DASH 0 both exit 0. The unit calls ONE.tierW directly; the scan never reaches a locked tier (LIVE DASH 0 in the worker's own table too). Add a fixed case that builds a real locked-tier state (khắc spent so «vừa» is evening-only, as your iPad shot) and reads the PRINTED line — deck card `button[data-ddoor] p` text and a pop-up tier door `d.x` — and fails on «—». Prove it with the source mutant.
2. **A non-gain sits in the green Thành / Được row** (law 3, KIT 6 rows): the receiver's willingness word rcvWord («Sẵn lòng», «Không ưa») is now the last x piece of «Nhờ giúp đỡ» (j9: «THÀNH … làm qua loa: Bạc ++, Không ưa» — Fold + iPad shots) and of «Lập phe cùng <tên>» (j10: «ĐƯỢC lập phe với …, có phe thì được che chở (nếu nàng nhận lời) Sẵn lòng»). It is not a gain; show it where a word / note goes (odds side or Ghi chú), never in Được/Thành, without emptying Được again (gain-empty hh:fac). Whole group: every option line that carries rcvWord (j10 «Mời», j9, jrcv users).
3. **(c) whole group: the dress-verdict gain lands in Ghi chú on cards whose x is a description**, e.g. rival pop-up «Tố cáo» (hh state, Fold): «GHI CHÚ chọn một trong 2 việc: …, được: nàng ta chuộng giản dị: quý ta +» — the gain is shown inside the note, not in Được (Trò chuyện / Dò la get it right). Route TOILV gain pieces to the Được row on every card kind (door / tier cards included); add the case to the unit.
Also (not a FAIL line, please add): e-gain4-unit (d) one-tap check passes with the jone one-tap block removed (6 doors read, none price-only in its world) — only row-law3-scan catches it; pin a «Dò la» one-tap case.
Rerun on the new head: unit + the three new cases with their source mutants, row-law3-scan per state (dau / toi / cao / con / hau / hh, Fold + iPad; a full run is > 20 min under load), gain-empty, door-row-hint (+MUTANT), door-loss, act-audit, quickcheck, kit-std-scan (= LIVE), shots of items 2–3 Fold + iPad.

## Not in this unit (LIVE-own, for Foreman E)
- Pop-up tier doors show the tier words as Được («Giao hảo / Khiêu khích / Hạ uy thế: nhẹ Rất vững vừa Rất vững nặng Tặng quà»; worker noted it too).
- Cung nhân staff-card groups hand-labelled (one card, two tabs — §3 law 11).
- j10 typed «40» (Ly gián odds), j10 staff panel can(2), j29 relAdd(…,-5); other-palace «Người lạ» thái giám card says «nàng» («nếu nàng ở nhà thì gặp mặt», «chuyện gì với hắn» beside it).
