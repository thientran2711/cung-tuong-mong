PRIORITY #1 CHECK ('bộc phát|outburst|temper|nhìn nhận|perception|motiveOK|Khiêu khích'): OD 25/11 ~05:45Z + ~08:05Z (Option A) | main jtrong.js DEED/trongMul, jagknow knwSee/knwGossip (servants' witness + gossip record), jmoodknow moodCauseKnownBy, jmem memList, j95 motiveOK, jtwoway twDo, jemoact eaDo, jfeel feelDo | review/* none on perception (review/net-build = seat W's thresholds) | claims: this seat (T2 NXiL5b2g). Reuse: everything below hooks these; nothing rebuilt.

# temper-perception (seat T2 → T2b, Foreman D) — design rows #4 + #5 (+ #6 wording)
Branch **review/temper-perception** @ **3119cf02** (from origin/main 9f72524b; main unchanged since). STATUS: **SẴN SÀNG KIỂM** (BIG review).

## What is built (T2, 654a80cd — unchanged unless noted)
1. `dev/build/jtperc.js`: ONE rule `tpDeed(doer, deed, victim)` for her and every NPC (law 1): eye-witnesses from the ONE record (S.roster rows at the doer's place this khắc), servants' knowledge record (knwSee) carries it as gossip → judged at ×hear in tpTick; Emperor / Thái hậu only via a teller. Δ = base × trọngK × relK × kindK × reasonK × label × hear; caps per doer per 36 tuần; labels good/evil on the onlooker's «Tính nết» row (kit tap-word); her Sổ line «Người chứng kiến: …» (number shown = applied). All numbers BAL.tp.
2. Hooks: eaDo (jemoact), feelDo, twDo, agVent, her gây sự cards.
3. Option A (row #5): her Khiêu khích / Trút giận / Hạ nhục pass `motiveMe(t)` = j95 motiveOK(S,t,kind,1); locked «chưa có cớ», open card «cớ: oán 45 · …»; mood term tpMoodM for every doer.

## T2b (3119cf02) — two real bugs found by the real-tap cases, fixed as a group (law 11)
| # | fault | before | after |
|---|---|---|---|
| B1 | WHEN a deed is judged: her card costs 1 khắc and the khắc turns BEFORE go() runs → onlookers were whoever stood there the NEXT khắc | iPad seed 7: witness v2 at kh0 not judged, j=[] ; Fold: v5 (arrived kh1) judged | `tpAt` snapshot (place + khắc + eyes) taken when the deed STARTS, for every hook: her cards (khắc the card was built/chosen in), Hạ nhục via twDo (TP.pk), eaDo (jemoact line ~311), feelDo, twDo, agVent. Test: one onlooker set at kh0 and gone at kh1 → judged; kh1 arrivals not |
| B2 | tpTick (gossip path) let the DOER judge her own deed and the VICTIM count as an onlooker | gateYes j=["v2"(victim),"me"(doer)] | tpTick skips id = doer / victim (same as tpEye) |
Scan of the family: every path that writes `it.j` = tpDeed eyes (tpEye excludes X,V), tpUp (H===X skipped; teller may be the victim = legit), tpTick (fixed). Every tpDeed caller = 6 hooks, all now pass `at`.

## Tests — dev/test/temper-perception.js (real taps, harness dev/test/realtap.js from review/robot-realtap 4523381f)
Life started like a player (robot-rt way): real taps on the title → Chơi một mình → Bắt đầu kiếp mới; fixed seed (TPSEED, default 7) + thân phận "tt" via the game's own `window.__forceOrigin` hook (no tap simulated). A person off the stage view: real swipe (finger/CDP touch on Fold, pointer drag on iPad) after the scene's kload cover is gone. Focus card (.kfoc-b) buttons are tapped; the act's mini-game is left with a real tap on «Bỏ qua · kết quả thường». The label is read VISIBLE via Hậu cung → Phi tần → (› pager on iPad) → her portrait.
**Fold 755x1000@2 + iPad 1180x820@2: 7/7 PASS** (gateNo · gateYes · eaHook · math · label · npcMood · oldsave), 0 dead buttons, 0 JS clicks, 0 page errors, no h-scroll; seeds 7 / 11 / 23 (Fold) and 7 / 11 (both devices) all PASS. Shots looked at: gateNo pop «chưa có cớ» on the greyed Khiêu khích (both devices), gateYes mini-game intro, label row «Tính nết: chưa rõ · xem ta: Khẩu xà tâm Phật» (both devices).
npcMood case now picks a pair whose motive is short WITHOUT mood (a «Xảo quyệt» or other-side pair passed the gate already → false fail before).

## Gates on 3119cf02
- quickcheck: **PASS** (core gates PASS: one-core-guard · rules-one-source · kit-conform · co-op one-world · hooks 8; time-spill PASS; old save from LIVE loads + plays a buổi; perf new/live render 333/310, tab 613/736, buổi 2097/1972, tasks>200ms 28/28). One earlier run FAILED perf (buổi 3949/2058) — A/B with `window.__tpOff` shows the rule costs 0–5 ms over 8 buổi (tpDeed/tpTick/tpJudge/tpMoodM/motiveOK) → machine noise; rerun PASS.
- coop-e2e: **142/142 PASS**.
- oldsave: case `oldsave` PASS (save without S.tp loads, rule runs) + quickcheck old-save PASS.

## Wording (row #6) — NOT yet agreed
send_message to CO-NGU-TITLES session_01V1ZZH4mHp8bC9LZg8ZFKx6 FAILED «the requested resource was not found» → D please route. List: «chưa có cớ» (OD) · «cớ: oán N · ghen N · ghét (thiện cảm N) · khác phe · lòng đang bức bối · tính xảo quyệt» · Sổ «Người chứng kiến: Hoàng hậu -2 · …» · label good «Khẩu xà tâm Phật» · label evil «Hung hăng độc địa» (weakest) · row prefix: source «xem ngươi:», on screen «xem ta:» (a later pronoun pass) — which is canon?

## Coordination
T1 archived; T1b (session_01D3E3NaH1eX32YRAhiQCYnb) told: motiveMe unchanged; jemoact eaDo wrapper line now passes the tpAt snapshot — keep it on merge. review/temper-outburst @6b85187e is in review; merge it into this branch once it PASSES (only clash point: jemoact.js end-of-file eaDo wrapper).

## Open for the reviewer / next
(a) NPC-rate check of the mood term (J95.stat.gate before/after) — not run (handover step 4). (b) wording answers → TP_LAB + VANPHONG rows. (c) merge T1 when it passes.

## HANDOVER T2b → T2c (rollover at ~32 % context, 25/11 ~09:40Z)
READY sha for review stays **3119cf02** (game code). Branch head **fa9d8925** adds ONLY two WIP measure files (no game change).
Open task from ROOT D (09:15Z): **NPC mood-term rate check** (law 1: NPC gây sự rates with BAL.tp.moodM 10 vs 0) → add the numbers here.
What was tried (all on a fixed seed, both arms):
1. `dev/measure/temper-perc-mood.js` page driver: `nextBuoi`/`endTurn` loop does NOT advance the calendar — `endTurn` is held by the night flow (jnf: waits for her night choice, `S.nfX.st="wait"`) and by `S.mg` mini-games; `window.nfOn=()=>false` let one arm advance one tuần only. Driving `rivalsBuoi`/`rivalsTurn` directly gives 0 motiveOK calls (the hostile gate is called from the khắc agent sim `j95sync`, run by the `spend` wrapper in j95.js ~L518 and by goTo / endTurn wrappers).
2. `dev/measure/runb.js` (bot life runner) + INP2 module `dev/measure/intpmood.js` (counters ready: calls / pass / block / byMood / deeds / byKind; arm off = `XJS='BAL.tp.moodM=0'`): the bot life TIMEOUTs at turns 0 with `S.mg:true` (stuck in a mini-game) — same "robot runner stuck on main" T1 reported.
Next (successor): either (a) use the real-tap robot (review/robot-realtap `dev/test/robot-rt.js`, as T1's `temper-hh-rt.js` / `intemper-rt.js` on review/temper-outburst do) with `intpmood.js` evaluated after boot, a few lives per arm; or (b) fix the page driver: per step `spend(1)` ×4 (j95sync runs) + resolve the night (set the jnf night done) + clear `S.mg`, then `endTurn`; check the calendar moves (`when()`) in BOTH arms before counting. Early sample (one arm, ~1 tuần): 275 NPC hostile-gate calls, 11 pass, 1 owed to mood — too short to conclude.
Also still open: wording answers from CO-NGU (routed by ROOT D via FOR MAIN 136 → FOREMAN_D_STATUS.md) → TP_LAB + VANPHONG rows; merge review/temper-outburst when it passes (keep the jemoact eaDo `tpAt` snapshot).

## ROUND 2 — review FAIL B1 + N3 + N4 (seat T1b, worker session_01D3E3NaH1eX32YRAhiQCYnb, order FOREMAN D 09:55Z) — review/temper-perception-rv ab5d65ee
PRIORITY #1 CHECK: OD 25/11 ~05:45Z + ~08:05Z «Bộc phát theo tính cách» | review-temper-perception.md B1–B2, N1–N4 read in full | jtperc tpOut / tpDeed / tpK / tpP / tpWhere / tpLand / HOST gate, jemoact R_ + eaKind, jfeel BAL.feel.act, j9 relMS / relKey / relOwner, jhc relMSOf, j55 trS | branch from 3598bce8 (T2 3119cf02 + T1 6b85187e); B2 = seat T2c (not touched here).

**B1 (LAW 11 — whole table).** One map `BAL.tp.map` (law 4) sends every outburst reaction of every kind of person (jemoact R_ who c / e / t / s / m / o / q / k + jfeel acts) to the deed it is judged as (`tpDeedOf`: own key → map → jfeel `use`). New deeds with base + DEED virtue tags: soat (Lục soát: Nhân −, Tín −), bove (Lễ −), treo (Lễ −, Nhân −), noi (Long nhan đại nộ: Nhân −), nghi (Nghi kỵ: Tín −, Nhân −), quo (Thái hậu quở trách: Nhân −, Lễ +), cai (cãi nhau: Lễ −), okho (Làm khó các cung: Nhân −, Nghĩa −), qgian (Lễ −), qhac (Khiêm −, Trung +), khon (Đễ −), vuive (Nghĩa +); mapped: kexau / ohoi → ke, caugat → mang, noimoc / mhoi → cham, khoetai → khoe, ban → thuong, eyen / mvui / qvui → tiec, sk / okhoc → khoc, mcai → cai, kquay → dapdo, ovui / kvui → vuive. Harm list (labels) + soat, noi, nghi, quo, okho.
Same rule for every doer (law 1): `tpK` / `tpP` now know Hoàng thượng («emp»), Thái hậu («th») and the relMS people (servants, men, nữ quan, ministers, children: key `x<relKey>`, `relMSOf`); `tpWhere` puts a doer outside the ONE record where the person he serves stands (`tpAnchor`: servant → mistress, child → mother, nữ quan → Hoàng hậu, minister / man → Hoàng thượng); `tpLand` moves Sủng / Thái hậu regard only when the doer is a consort, otherwise the onlooker's thiện cảm of the doer (relMS store).
Scan `dev/measure/temper-judged.js` (fires each reaction through `window.tpOut` by a real doer of its kind, onlookers standing there, counts judgments + the doer's place):

| | rows | self-only (nobody touched) | reactions that touch someone | NOT judged | judged but nobody judged live |
|---|---|---|---|---|---|
| BEFORE 3598bce8 | 66 | 27 | 39 | **27** | 0 |
| AFTER ab5d65ee | 66 | 27 | 39 | **0** | 0 |

Not judged before: c soat, kexau, bove, caugat, khoetai, treo · e ban, noi, nghi, eyen · t ban, quo · s cai, sk · m mcai, mhoi, mvui · o okho, okhoc, ohoi, ovui · q qgian, qhac, qvui · k kquay, khon, kvui. Self-only (listed, never judged): nuot, boan, thu, huong, matngu, cau, trang, hat, tho, theu, tron, caobenh, bodo, moi, ngoithu, mach, quengio, sangtac, eruou, emat, tkinh, hang, mbo, mruou, ole, qbo, kbo.
**N3** — «Người chứng kiến …» now sits on the card's own Sổ line (gateYes log, Fold: «… Khiêu khích: thành. Danh 33 → 34. Người chứng kiến: Diệp Sương Hoa −1 · Doãn Mộng Điệp −1.»); other deeds: the next Sổ line of the step, else its own line at the next khắc. **N4** — HOST gate keyed by the card's deed id (`tw`: provoke / vent / humil on j2 talk cards + jtwoway twOpts), never by name.
Gates (ab5d65ee): temper-perception.js REAL TAPS Fold 755x1000@2 + iPad 1180x820@2 PASS · temper-outburst.js Fold + iPad PASS · temper-equal 36 rows fail 0, 330 cells ok · temper-signs 0 wrong · one-core-guard PASS · coop-e2e 142/142 · quickcheck alone: see below. Own build (index.html + sw.js).
quickcheck.sh alone (G4 robot lives paused): **PASS** · open 2176 ms · old save ok · perf median new/live: render 302/250, tab 657/506, buổi 1762/1547, tasks>200 ms 27/26 · core gates PASS.
B2 (NPC mood-term rate) stays with seat T2c. N1 / N2 unchanged (D / MAIN route).

## READY
**SẴN SÀNG KIỂM review/temper-perception-rv ab5d65ee** (B1 + N3 + N4; B2 = T2c).
