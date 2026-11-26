# D WORKLIST LANDING LEAD — d-worklist-land (session_01D3E3NYmS8cc59UEvncC8wb, opus BIG, child of FOREMAN D ROOT 2 session_01D3E3NaCjS2HPpbV9vyoqqF)
depth 1 (lineage 1/8). START_CTX ≈ 4 % of the 1M window (get_session reads 0 → estimate); roll line ≈ 29 %, ceiling 60 %.
PRIORITY #1 CHECK: OD 24/11 ~09:10Z–09:35Z (#7 kỳ sắc phong / patrons / caps, #8 phân cung) read | main LIVE 5e013076: no jpromob / jsvt / jpdist / jtperc, no phanCungEdict caller | review/* d-followups-1-rv cc4fed89, law1-gifts-rv 99faeb2b, palace-distance-rv 9849ca5f, robot10-nc-fix-4-rv 5f23c140 (+rv2 f4611bff LC14 delta), talk-others-people-rv 25a9a9cc, net-ghen-2-r5 9d3b7b7b, net-thresholds 96c2859e, temper-perception-rv c56c1856, promo-build-2-rv 4defb821, servant-trust-rv 65abb0de, kit-promo-hook-rv 73c692ca, promo-root 1623b417 (PROMO-ROOT, not mine) | claims: this row 23:15Z; E91 e-pack-a + B law1-audit-r2 also re-merging on 5e013076 (whoever lands first, the others re-merge).

## 1. STATE TABLE (23:40Z, LIVE 5e013076)
| WORKLIST | branch | newest PASS sha | on LIVE? | carried by / notes |
|---|---|---|---|---|
| #7 (D part) promotion part A + special routes + PHÂN CUNG panel | review/promo-build-2-rv | 70571e8a (tip 4defb821 = LIVE re-merge only) | NO | inside d-followups-1-rv cc4fed89 (jpromob.js) |
| #7 (D part) kit promo hook | review/kit-promo-hook-rv | 73c692ca | NO | ancestor of d-followups-1-rv |
| #26 servant trust | review/servant-trust-rv | 59ea20a8 (tip 65abb0de = re-merge only) | NO | inside d-followups-1-rv (jsvt.js) |
| law gaps of promo-build-2 + servant-trust | review/d-followups-1-rv | cc4fed89 | NO | base ca5af050 |
| #10 gifts / likes / dislikes two-way | review/law1-gifts-rv | 99faeb2b | NO | base ca5af050 |
| #8 palace distance | review/palace-distance-rv | 9849ca5f | NO | base ca5af050 |
| nc-fix-4 (stipend card / khất bổng) | review/robot10-nc-fix-4-rv | 5f23c140 | NO | j15 hunk = LC14 rule (f4611bff) |
| #26 talking to others' people + greeting | review/talk-others-people-rv | 25a9a9cc | NO | contains dfu |
| #9 personality thresholds | review/net-thresholds | 96c2859e | NO | inside net-ghen-2-r5 |
| #9 ghen / oán saturation + law 11 shown==applied | review/net-ghen-2-r5 | 9d3b7b7b (RV5 BIG PASS 20:40Z) | NO | base 17dfa64d |
| temper perception | review/temper-perception-rv | c56c1856 | NO | base 17dfa64d |
| (net-build #9 wave 1) | review/net-build-rv | c6c3ca76 | YES | — |

## 2. RE-MERGE STACK on LIVE 5e013076 (each a FF of the previous; branches review/<topic>-lr, pushed)
| step | branch | sha | merged | conflicts → ONE rule |
|---|---|---|---|---|
| 1 | review/dfu-lr | 6459cdc8 | d-followups-1-rv cc4fed89 | assemble.py list = LIVE order + jpromob after jexam + jsvt after jagwhy1, jdeadcard dropped (LIVE merged it into jnolock); jbal2 both-added blocks kept (LIVE fakeX/kmus + BAL.svt) |
| 2 | review/law1-gifts-lr | f2a1b2ba | law1-gifts-rv 99faeb2b | generated only |
| 3 | review/palace-distance-lr | 5e477a63 | palace-distance-rv 9849ca5f | assemble union jpdist after jvisit (LC14 rule) |
| 4 | review/nc-fix-4-lr | 1388bfdb | robot10-nc-fix-4-rv 5f23c140 | j15 Quyền Hoàng hậu: whyTime(BAL.btn.empAct.k) + payCutTxt() (= LC14 f4611bff) |
| 5 | review/talk-others-people-lr | e0d05653 | talk-others-people-rv 25a9a9cc | dev/test/realtap.js = LIVE newer shared copy (robot-realtap superset, LC14 rule) |
| 6 | review/net-ghen-2-lr | 18c26259 | net-ghen-2-r5 9d3b7b7b (+ net-thresholds) | 13 files, 1 hunk each: dfu/law1/talk-others (BAL.btn.*.k, svtGiao, giftHand) vs net-ghen-2 (pvOan/pvQuy) on the same long lines → char-level 3-way, both edits kept, 16 sub-hunks 0 overlaps, node --check clean |
| 7 | review/temper-perception-lr | 6fccfccd | temper-perception-rv c56c1856 | j2 2 hunks char-level 3-way (tw tags + pvOan); assemble union jtperc after jfeel |
| 8 | review/temper-perception-lr2 | 2d153814 → **ed7be1ce** | 2 INTEGRATION FIXES found by gates on the top (see §3b) | — |
No owner wording was hand-resolved (no hunk touched owner text; CHANGE lines written per step).

## 3. GATES (filled as they finish)
| step | own tests | coop-e2e | quickcheck | shots / video |
|---|---|---|---|---|
| 1 dfu-lr 6459cdc8 **LAND READY 23:50Z** | promo-build ✓ · servant-trust ✓ · kit-promo-hook ✓ · net-build ✓ · one-core-khac ✓ · svt-scan 67/0 ✓ · promo-skip 2 FAIL = SAME 2 on bare LIVE 5e013076 with LIVE's own test (pre-existing: «passed grace exam waits for a free seat», «strike-back hits once when due») | 143/143 | PASS (old save ok; perf buổi 1659/4748 ms new/live; G4 only the known «Ô lưu · Lui» row) | 14 shots looked + dfu-fold.mp4 / dfu-ipad.mp4 on CDN img/_review/d-worklist-land/ (setup-driven promo-build-shots; ky-log shot covered by a «Bộ sưu tập» popup — script artifact) |

### 3b. Integration faults found on the stack top 6fccfccd (none exists on any single branch)
1. LAW 4 one core (net-build net-scan, 201/203): jtperc.js (temper) gates `oan(O,V)>=30` (foe) and `oan(X,V)>=BAL.tp.pubOan` (40, open feud) were typed / off netTh. Fix 2d153814: both read the holder's own «thù» level netTh(·,"thu") (BAL.net.th comment: «oán of a true enemy», the same gate as j32 kẻ thù / jcmood); BAL.tp.pubOan removed (canon overwrite). net-build 203/203. Numbers move from 30/40 to the per-nết thù level (base 45) — FOREMAN D/temper owner may veto.
2. LAW 11 shown==applied (ka-know CONTROL FAIL from step 6 net-ghen-2-lr on): two rsnap wrappers wrote the SAME key `kn` — net-ghen-2 (familiarity map S.known) and talk-others KAK (a counter) → after any learn, every later result card listed «<name>: quen biết» for people nothing happened to. Fix ed7be1ce: KAK key renamed `kak`; family scan of every rsnap wrapper key: no other clash; ka-know 6/6. Steps 6 and 7 (18c26259, 6fccfccd) are therefore NOT landable alone; land target = ed7be1ce (or any of steps 1–5).
Harness note: ka-know needs an absolute html path.

### 3c. GATES on the land target review/temper-perception-lr2 ed7be1ce (FF from LIVE 5e013076, carries steps 1–7 + 2 fixes) — **LAND READY 00:45Z**
Own tests of all 7 branches: promo-build ✓ · servant-trust ✓ · kit-promo-hook Fold+iPad ✓ · net-build 203/203 ✓ · one-core-khac ✓ · svt-scan 67/0 ✓ · law1-gifts ✓ · palace-distance ✓ · ban-cung ✓ · coop-ban-cung ✓ · emperor-visit 3×3 ✓ · r10-stip-noqueen (save .out/oldsave.json) ✓ · ka-know 6/6 ✓ · actwalk-scan ✓ · relshow-rt ✓ · relshow-scan ✓ · relshow-bal ✓ · promo-skip = the 2 LIVE-identical FAILs only.
Temper set (FOREMAN D 23:57Z): temper-judged 0 wrong · temper-moodsrc 11 readers 0 wrong · temper-equal 36 rows fail 0 · temper-signs 17 rows 0 wrong · temper-perception real taps Fold+iPad PASS ×3 of 4 runs (the 1 fail = Fold gateYes rolled «Bại» on a «Rất vững» act — chance, passed on 3 reruns) · temper-outburst Fold+iPad PASS.
coop-e2e 143/143 GREEN · QUICKCHECK: old save ok, perf new/live render 237/228 ms, tab 628/547, buổi 1592/2367, long tasks 24/28; G4 only the known «Ô lưu · Lui» row.
B2 re-check (short): the two moved gates are called ONLY by jtperc tpJudge (jtperc.js:112/114 — onlookers judging HER deed); they are not read by motiveOK / any NPC hostile gate, so NPC hostile pass % / harm acts have no code path to change. Old-robot runb.js stalls at turn 0 on this build (bot predates the opening / mini-game), and an in-page endTurn sim mostly stalls in year 1 → no rate table possible before 02:20Z; a real-tap B2 life pair (T1d G4 harness) can be run after land. Exposure (in-page sim seed 11, year 4, 196–225 ordered consort pairs): foe gate old oán≥30 = 4 pairs vs new ≥netTh thu = 2–3; feud gate old oán≥40 = 2 vs new 2–3.
Shots + FULL videos Fold/iPad (looked at): CDN img/_review/d-worklist-land/ — dfu-* (phân cung, HH đề cử, kỳ log) + dfu-fold/ipad.mp4 · svt-* (#26 «Giao thiệp» Hỏi chuyện / Hỏi lén, real taps: Fold refused, iPad talked) + svt-fold/ipad.mp4 · pd-* (#8 Ban cung near/far, log) + pd-fold/ipad.mp4 · card-* (#9/#10 consort card, real taps) + card-fold/ipad.mp4 · temper-* (perception + outburst) + temper-fold/ipad.mp4. Setup-driven scripts: promo-build-shots, palace-distance-shots (reviewers' own); real taps: svt-len-rt, temper-perception, card tour. No own screen: nc-fix-4 (stipend card logic, r10 test), law1 gifts NPC↔NPC (law1-gifts test).
NC-FIX-4 FULL VIDEOS (02:17Z, ed7be1ce, setup-driven like r10-stip-noqueen): https://ctm-img.victoria-tntt.workers.dev/img/_review/d-worklist-land/ncfix-fold.mp4 · https://ctm-img.victoria-tntt.workers.dev/img/_review/d-worklist-land/ncfix-ipad.mp4 (+ ncfix-*.png). Both: khất bổng running + no Hoàng hậu → «Bổng lộc … bị cắt xén» chest still reaches her, opened to the item card; Fold also: her Hoàng hậu card › Quyền Hoàng hậu › «Khất bổng lộc … bớt 3 phần 10» (BAL.payCut); iPad = stipend part only.
FOREMAN D now session_01D3E3NX3vWTRXcmN8Wi8Yxw (ROOT 2 rolled 02:14Z).
STALL CHECK 00:47Z (FOREMAN D ask): runb.js rand 2 SEED=7 and the in-page sim stall IDENTICALLY on bare LIVE 5e013076 (runb: TIMEOUT turn 0, states mg:true / Q:2 on both builds; sim: year 1 on LIVE seeds 7 and 11) → harness / pre-existing, not a stack softlock.
Pre-existing on LIVE (same on bare 5e013076, FYI MAIN): Fold Phi tần card of a known-name unmet consort says «Người lạ» while her tile says «Mi Trang» and the note names «Đáp ứng Âu Dương Mi Trang».

## 4. SPEC GAPS NOBODY BUILT (for FOREMAN D → MAIN; feature freeze OD:L1402, no new design here)
1. #8 / #1 wiring: SELSCENE's «Tin sắc phong» close must call window.phanCungEdict({list,then}) (jpromob, comes with dfu-lr); LIVE SELSCENE has no caller (grep main: 0) → the opening phân cung scene does not show until SELSCENE wires it (later promotions show the panel by themselves, jpromob:202).
2. #7: «đăng cơ in quốc tang» (owner question via MAIN) and co-op guest-queen «Hoàng hậu đề cử» nominate — not built (promo-build-2 report «Not built»).
3. #26: the RING / «vòng nhóm» place UI (OD ~07:52–08:05Z) — design not decided, not built (svTalk / svtEtq are ready for it); NPC↔NPC talks to the Thái hậu's women and the Thái hậu sending her people to others — pre-existing parity gap (review-talk-others-people N1/1).
4. #8: Dưỡng Tú viện not on the palace map (palace-audit: «not built»; belongs to SELSCENE #1).
5. PROMO-ROOT (MAIN child session_01V1ZZGzXMYdRFgHB23g5qvC) could not be reached from this session (send_message / get_session: not found) → FOREMAN D please relay: dfu-lr carries jpromob (promotion part A); promo-root 1623b417 touches j3/j14/jbal2 (forgetGrace) — checked: `git merge-tree` of promo-root onto the stack top 6fccfccd = code CLEAN (j14/jbal2 auto-merge), only generated index.html/sw.js/assets.json → rebuild; whoever lands second re-merges.
6. Pre-existing on LIVE (not D's): promo-skip 2 FAIL (above).
