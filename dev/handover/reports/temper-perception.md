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
