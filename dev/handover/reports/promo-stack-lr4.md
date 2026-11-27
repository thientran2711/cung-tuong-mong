# promo-stack-lr4 — PROMO-STACK REMERGE (Foreman D worker, session_01D3E3NZ4EBSHMcWVkhfsBVX)

START_CTX ~3 % (get_session used_tokens read 0; own estimate) · depth 1 (limit 8).

PRIORITY #1 CHECK: OD 24/11 ~09:20Z «Kỳ sắc phong theo dịp lễ ok, làm luôn đi» (OD L2350) + ~07:00Z đại lễ / quốc tang (L2366) + 26/11 ~22:45Z «giữ sắc phong theo lễ trong năm như đang có» (L2682) + 26/11 ~22:58Z HUD «5/32 tuần», counts in TUẦN (L2685–2686) | main 4cfcda61: jpromob.js MISSING, promotion still monthly promoGap (j8.js:431) | review/* d-stack-lr3 cb398c07 (jpromob, BAL.promoR.ky, cung-quy, contest-thitam), d-followups-1-rv cc4fed89 — PASSED 24–26/11, never landed | claims PROMO-STACK REMERGE = this session (CLAIMS.md 23:55Z).

Task (verbatim source): dev/handover/FOREMAN_D_STATUS.md «ORDER FROM MAIN 165 (26/11 23:12Z)», «ADD TO ORDER FROM MAIN 165 23:12Z (26/11 23:11Z)», «FOR D (MAIN 167 relay of HUD-SACPHONG findings, 23:48Z)».

## Branch
review/promo-stack-lr4 = LIVE origin/main 4cfcda61 + merge of review/d-stack-lr3 cb398c07, then LIVE moved twice and was merged twice: a22cf45d (firstcard-3, wording-gain, LC26 _aa.html; sources clean, .gitignore union) and fa722503 (title-bal; sources clean). Only built files / CHANGE.txt conflicted in those two.
review/d-followups-1-rv cc4fed89 is an ancestor of cb398c07 (merge-base(lr3, followups) = cc4fed89): nothing of it was missing, nothing merged separately.
Stack size: lr3 = 134 commits over its base 3af7896e; LIVE moved 286 commits since that base.

## Code conflicts (24 code files) — for the BIG reviewer
Rule used: keep LIVE behaviour + the PASSed D code. Where LIVE and D built THE SAME feature twice, LIVE was kept (marked ★ = semantic decision, please re-check).

| # | file:line (final tree) | LIVE side | D side | resolution |
|---|---|---|---|---|
| 1 ★ | dev/build/j1.js:230 ghenUp | review/pace-all: NPC-caused jealousy → oán v→by × BAL.oanCool.ghen.npc (.5), diminishing near the top (dm), fractions v.gUc | review/net-ghen: same idea × BAL.net.ghenOanK (.5), no dm | LIVE kept |
| 2 ★ | dev/build/j28.js:56 oanCool / ghenCool / oanMonth | pace-all PART B: weekly cool-down oanCool(w,mine,onlyMine) by oán band ÷ season × nết, floors from memory; ghenCool(v) base/than + pct | net-thresholds oanCool(h,x) monthly (oanFade + x × BAL.net.oanCool) and net-ghen ghenCool(h,x,close) | LIVE kept (D signatures had no other caller once #3 kept LIVE) |
| 3 ★ | dev/build/j8.js:519 rivalsTurn ghen fade | v.ghen −= ghenCool(v); v.pg −1 | ghenCool(v,…) for v.ghen and her v.pg | LIVE kept (her v.pg stays −1 a turn) |
| 4 | dev/build/j8.js:109 punish + DIE_K | punish-reason punish (sev 0 warning, punTwice, punDown/punMark, punNote) | DIE_K / dieKOf / dieMk death-cause mark appended | both: LIVE punish + D block |
| 5 | dev/build/j2.js:172, :175 Khiêu khích / Trút giận | lock mockOK + t «phận dưới không dám…» | tw:"provoke"/"vent" + pvOan preview | both combined |
| 6 | dev/build/j63.js:312 result card | kitAim block (KA_AIM, kaAimVerdict…) + kaResultRows(before,title,ok) | NB2 kaSrvList / kaLearn / rsnap srv+court+kn+evOn / kaKnRows / kaMorePeople / kaWalkKn | both (D block first, then LIVE); kaMorePeople servant + court rows now print totals with LIVE kaNT (same form as LIVE consort rows) |
| 7 | dev/build/j63.js:397 stranger rows | kaNT totals, per rows carry [.., v, delta] for nsCard | NB2: a stranger's chứng cứ row | D addition put into LIVE line, row carries v + delta |
| 8 | dev/build/j63.js:403 | ONE SIEVE nsCard | kaMorePeople(before,per,G) | kaMorePeople BEFORE nsCard (the sieve sees every row; D rows without x[4] stay in «keep») |
| 9 | dev/build/jky.js:182 | stat-pace: real added numbers | jkyRelW (nết preview of thiện cảm) | both: jkyRelW(c, rs) |
| 10 | dev/build/jky.js:229 | stat-pace SE() on the button | net-ghen-2: × place grade gm(c) + jkyRelW | both: SE(k, round(G × gq)), jkyRelW(c, SE(…)) |
| 11 | dev/build/jts.js:340 lì xì | BAL.eff.jts.liXiAff | pvQuy previews | both: pvQuy(null, BAL.eff.jts.liXiAff, …) |
| 12 | dev/build/jbal2.js:2373 | BAL.pun + BAL.charge | BAL.svt (servant-trust) | both (additive) |
| 13–27 | assemble.py (module list union: + jpromob, jpdist, jtperc, jsvt), j10, j15, j17, j30, j42, j6, j67, j70, j78 (2), j95 (2), jagacts3 (2), jemoact, jtoil, jtsb (2) | — | — | token-level 3-way merge (disjoint edits on the same lines, e.g. LIVE chSearch/chOK charge evidence + D pvOan/pvQuy/svTouch/dieMk/BAL.btn.*.k); every hunk read |
| gen | index.html, sw.js, assets.json, dev/site/CHANGE.txt | — | — | rebuilt by build_site.sh; CHANGE line = the promo stack |

## New in this branch (order items 2–3)
- j8.js:448 `pbKyOn()` + j8.js:453: the old monthly promoReqP row «Cách lần sắc phong trước N tháng (cần M)» is pushed ONLY when the kỳ rule is off (rollback path: no BAL.promoR / exam system off). Canon overwrite per OD 24/11 ~09:20Z. jexam.js:312 kitPromoHook: the monthly gap no longer counts when pbKyOn().
- jpromob.js:53 `pbWk(months)` = months × (BAL.cut.tuanDays.length + 1) — ONE tuần count (law 4).
- Family scan (law 11) — every «còn N tháng» to a kỳ / every exam retry wait:

| site | before | after |
|---|---|---|
| jpromob pbKyRow | Kỳ sắc phong: chưa tới (kỳ tới X, còn N tháng) | … còn ${pbWk(N)} tuần) |
| jpromob pbDl not eligible | chờ kỳ sắc phong tới (X, còn N tháng) | … còn ${pbWk(N)} tuần |
| jpromob kỳ notice | Kỳ tới: X, còn N tháng. | … còn ${pbWk(N)} tuần. |
| jpromob chip (kitChip) | Kỳ tới: X, còn N tháng | … còn ${pbWk(N)} tuần |
| jexam act card (cardH) | trượt: chờ N tháng mới được thi lại | trượt: chờ ${pbWk(N)} tuần … |
| jexam result | Trượt. Chờ N tháng mới được thi lại. | Trượt. Chờ ${pbWk(N)} tuần … |
| not changed (not a kỳ countdown) | quốc tang «còn N tháng» (mourning length), favour cap «sau 24 tháng», promoRuleTxt gapMin–gapMax tháng (rule text) | — |

- jpromob.js:160 `pbDlNext()` READ-ONLY → {A, k, name, m, w} | null: next SCHEDULED đại lễ (Thánh thọ Thái hậu at BAL.promoR.dl.thTho ages, Vạn thọ at dl.empTho ages; ages +1 at month 1); skips seen / quốc tang / closer than dl.minGap to the last đại lễ. Never calls pbSt / pbDlSt (never writes S.pb).

## Accessor names → HUD-SACPHONG
session_01Rc5AsMfzAWwHhtkBmdZG1w returned «not found» to send_message → line written in dev/handover/MAIN_STATUS.md (handover branch).
Names: BAL.promoR.ky / BAL.promoR.dl, pbA(), S.pb.ky.last, S.pb.mt, pbNextKy(A), pbKyAt(A), pbKyOn(), pbWk(m), pbDlNext(), window.kitPromoHook().

## Gates (final sha below)
Final sha **d713f162** (review/promo-stack-lr4, pushed; LIVE fa722503 is an ancestor → FF).
| gate | result |
|---|---|
| promo-build (dev/test/promo-build.js, Fold) | 48/48 ok, 0 page errors (×3 across shas; lr3 alone 48/48) |
| kit-promo-hook | 8/8 ok, 0 errors |
| coop-e2e (live Worker, Fold host + iPad guest) | 143/143 passed (on fa31f123 and again on d713f162) |
| one-core (coregates G1: guard / text / khac / bind / text-rule / c6) | all PASS on d713f162 |
| old save (quickcheck: LIVE save → new build, plays a buổi) | ok, 0 errors (fa31f123 and d713f162) |
| quickcheck core gates G4 | odds-cap, coop-one-world, mk-layer, manifest, npc-purpose, dialog-fixed, dead-card, look-dedupe, press-keep, q-softlock, next-dead, anchor: PASS. **button-crawl FAIL** «fold · Ô lưu · Lui · close button did not close its layer» = the SAME fault on LIVE fa722503 (re-run on LIVE: identical line) → pre-existing, not this stack |
| quickcheck perf (fa31f123) | PASS · render 243/220 ms, tab 477/545, buổi 1206/1284 (new/live) |
| quickcheck part 2 on d713f162 (full re-run) | QUICKCHECK PASS · open 2055 ms · old save ok · perf new/live: render 262/243 ms, tab 694/591, buổi 1320/1227, tasks>200ms 31/30 (overall line FAIL only by the pre-existing button-crawl above) |
| pre-existing on LIVE (same result on LIVE / lr3) | promo-next-rank 8 BAD «card names ""»; promo-rules 26/28 (844x390 reveal button, NPC servant exam roll) |

Videos + shots (Fold 755x1000@2, iPad 1180x820@2), CDN https://ctm-img.victoria-tntt.workers.dev/img/_review/promo-stack-lr4/ (curl 206 each):
fold-755x1000.webm, ipad-1180x820.webm, fold-sacphong.jpg, ipad-sacphong.jpg, ipad-stage-hud.jpg, fold-hanhsu.jpg.
Shot on fa31f123 (the promo code is byte-identical in d713f162; only title-bal sources came in). Sắc phong panel: rows Sủng / Danh / «Kỳ sắc phong ✗ chưa tới (kỳ tới Tiết Vạn thọ, còn 15 tuần)» / Khảo hạch / Hoàng hậu không chặn / Ghế; chip «Kỳ tới: …, còn 15 tuần»; NO «Cách lần sắc phong trước» row. 0 page errors both devices.

## Test fixes (tools only)
- dev/test/promo-build.js: the probe sets exact values (S.hh = the cut, x.sung = 99 …); LIVE stat-pace paces raw writes, so 4 rows went BAD (all ok on lr3). The probe now runs with window.SP_OFF on (same as dev/test/ag-moodknow.test.js set-ups). 48/48 ok ×2.
- dev/test/kit-promo-hook.js: «gap not met» replaced by «monthly gap gone (kỳ rule)» (canon overwrite of the rule it tested).

## Open points for the BIG reviewer
1. ★ #1–#3: D's net-ghen / net-thresholds cooling and raise were NOT taken (LIVE pace-all covers the same owner pain, same .5 NPC→oán factor). Commit 80c628ea removes the D copies BAL.net.ghenOanK / ghenCool / oanCool (law 4: one number, one home); jagacts3 dance preview prints BAL.oanCool.ghen.npc with the applied rounding; jshelf / jration comments and dev/test/relshow-rt.js read the LIVE key. D's robot tuning of the fade (ghenCool k .03, oanCool .10) is therefore not live — if Foreman D wants those numbers, they go into BAL.oanCool (owner/MAIN call, not a merge call).
3. KIT §77c kitPromoChip (jrail.js, kit part) still prints «Kỳ thăng: N tháng · <bậc>» (iPad shot ipad-stage-hud.jpg: «5 tháng» next to the rows' «15 tuần»). Not touched here (law 9: kit keeper / HUD-SACPHONG own that slot, which becomes «Sắc phong x/y tuần»); the data is ready: pbWk(kitPromoHook().months).
4. Fold portrait: the stage (and its HUD chip) is not on the Hành sự screen of a fresh life; the Fold video shows the Sắc phong panel only.
2. Pre-existing on LIVE 4cfcda61 (same result there): promo-next-rank 8 BAD («card names ""»), promo-rules 844x390 reveal button out of view + NPC servant exam roll (26/28 on LIVE, lr3 and this branch).

## LIVE drift
LIVE was merged twice during the work (a22cf45d, fa722503). After the last gates LIVE moved again to 17f23656 — NOT merged (the order allowed one more merge; done twice). If the lander wants FF on 17f23656, one more remerge (built files expected) + promo-build / coop-e2e / quickcheck re-run.

## Handover (worker rollover rule)
Context at report ≈ 16 % (START_CTX ≈ 3 %; roll at 28 %) — no rollover needed. Worktrees: /home/user/wt/plr4 (branch), /home/user/wt/lr3base + /home/user/wt/livebase (comparison, deleted at the end), scripts in /home/user/wt/plr4-tools (vid.js = the review video script, tokmerge.py = token-level diff3 used for the 15 auto hunks, resolve.py = the hand resolutions).
