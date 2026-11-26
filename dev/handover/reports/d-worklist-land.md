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

## HANDOVER (05:06Z) — lead session_01D3E3NYmS8cc59UEvncC8wb rolls over (context 48 % ≥ roll line 29 %, depth 1/8)
OPEN ORDER (FOREMAN D session_01D3E3NX3vWTRXcmN8Wi8Yxw, 05:03Z «FOR LEAD: re-stack»): LIVE moved 5e013076 → f009e1a6 (place-rules, thin-p8-r2-rv, c3-rankroom, c3-farshot, selection-scene-r19; WITHOUT promo-root). Re-merge the D stack content ed7be1ce8 (review/temper-perception-lr2) onto f009e1a6 → review/d-stack-lr3, rebuild, re-run touched gates, keep videos unless UI changed, then «LAND READY <sha> (FF from f009e1a6)» to FOREMAN D.
- promo-root dependency: NONE — the stack never contained review/promo-root (1623b417); jpromob/dfu stand alone (merge-tree of promo-root onto the old top was code-clean).
- Pre-check `git merge-tree origin/main(f009e1a6) ed7be1ce8`: conflicts = generated (assets.json, index.html, sw.js, dev/site/CHANGE.txt → theirs/rebuild) + SOURCE dev/build/assemble.py (module-list union: python3 /home/user/wt/dlr-tools/asmunion.py — ours order + jpromob after jexam, jsvt after jagwhy1, jpdist after jvisit, jtperc after jfeel; drop files not on disk) + SOURCE dev/build/jstagehere.js (inspect; if both sides edited different parts of the same long line use `git checkout --conflict=diff3 <f>` + python3 /home/user/wt/dlr-tools/charmerge.py <f>, then node --check; owner wording → ask FOREMAN D). Auto-merged: j10 j28 j61 j67 j78 j93 jagknow jaudit jbal2 jopic jptime jration jstaff jtabs jtoil.
- Tools (this container, may be gone in a new one — copies of the logic are described here): /home/user/wt/dlr-tools/{gates.sh, asmunion.py, charmerge.py, both.py, u8srv.py, vid.sh+vidhook.js (video), tour.js, ncfix-vid.js, b2sim.js, hopush.sh}. Gate list used on ed7be1ce = §3c above (all own tests of the 7 branches + temper set + coop-e2e + quickcheck alone; ka-know needs an ABSOLUTE html path; r10-stip-noqueen takes .out/oldsave.json; known: promo-skip 2 FAIL = LIVE; G4 «Ô lưu · Lui» = known).
- Also re-run on the new top: rsnap key scan (no clash besides kn/kak) and net-build net-scan (law 4) since f009e1a6 brought new code.
- Videos on CDN img/_review/d-worklist-land/ (dfu, svt, pd, card, temper, ncfix-fold, ncfix-ipad2) — redo only for screens the new LIVE changed (selection-scene-r19 / place-rules may touch phân cung & Ban cung panels → re-shoot dfu + pd if their panels look different).
- CDN review folder d-worklist-land must be wiped by the verdict giver after land (python3 dev/site/cdn_sync.py --wipe-review d-worklist-land).

## LR3 (lead #2 session_01D3E3NZeAqwoAJM9sKXozFJ, depth 2/8, START_CTX ≈ 4 % est., roll line 29 %; rolled at ~25 % to stay under it)
PRIORITY #1 CHECK: OD 0 new | main LIVE f009e1a6 (selection-scene-r19 now CALLS window.phanCungEdict, jselxday.js:285 — spec gap §4.1 is now wired) | review/* review/temper-perception-lr2 ed7be1ce | claims D row «D WORKLIST re-merge + land lead».
**review/d-stack-lr3 8d0f7143 = FF from LIVE f009e1a6** (merge of ed7be1ce, pushed). Conflicts → one rule each: assemble.py = LIVE list + jpromob after jexam, jsvt after jagwhy1, jpdist after jvisit, jtperc after jfeel (456 files, all on disk); jstagehere.js disjoint 3-way = LIVE `window.actPendRun` export line + stack actPendRun body (kn0/actKn); generated rebuilt; CHANGE.txt = stack line. node --check clean.
Contract check: LIVE selxPhanCung passes {list:[{p,fav}],then} = jpromob phanCungEdict signature; then() runs on panel close (fin) — selx-days2 stub + real-tap flow agree.

### GATES on 8d0f7143
PASS: promo-build · servant-trust · kit-promo-hook Fold+iPad · net-build 203/203 · one-core-khac · svt-scan 69 sites / 0 unwired (LIVE added 2) · law1-gifts · palace-distance 27/27 · ban-cung 33 · r10-stip-noqueen · ka-know 6/6 · actwalk-scan · relshow-bal + relshow-scan (bal json must be built first from $PWD/dev/index.html) · temper-judged/moodsrc 11/equal 36/signs 17 all 0 wrong · temper-perception Fold+iPad · temper-outburst · net-scan (law 4) · coop-e2e 143/143 · selx-days · selx-days2 · selx-wire · place-rules Fold+iPad · stage-stay · selx-flow (Fold+iPad real taps to «Tin sắc phong»).
rsnap key scan (5 wrappers): maidL rel | court evOn kn learn srv | kak | whyAt | __ctx — no clash.
SAME AS BARE LIVE f009e1a6 (pre-existing, not D): promo-skip 2 FAIL (known) · quickcheck G4 80-dialog-fixed «kit-dialog-2 a no empty Tốn/Được cell» Fold+iPad (dialog-fixed.js run on both builds: identical 2 FAIL) · emperor-visit «forced visit did not pick her / no empnight card / no 2nd card» · coop-ban-cung «Xin cards / dialog drawn» 4 FAIL.
TEST-SIDE (emperor-visit.js:40): «nx shown≠applied» compares the card's sgStat (= sg(), Emperor nature ×1.3/×0.7) with RAW nightGain; the applied half (line 43, nightFx vs sg()) never fails → shown == applied in the game; check should read sg(hi.sung)/sg(lo.sung). Appears only when the life's Emperor nature ≠ ×1. 1 rare extra mismatch on a «· kèm …» line seen once, not in 3 reruns.

### OPEN — coop-ban-cung «each seat sees the friend as a person» (BLOCKS LAND READY until judged)
Stack: 8 fail / 15 runs (incl. 3/3 alone on an idle box). Bare LIVE: 0 fail / 7 runs. Captured state at every failure (4/4): the missing friend is on a **cung nữ life** (P.S.srv {risen:0}, selx2 {}), from life 0 up to life 8, once BOTH seats cung nữ → buildFriend skips her (friendSrv → she is a servant in the staff, not a rival) and the test looks only in `rivals`. On LIVE runs the seats were never cung nữ (lives 0–11, all consorts). Solo start() origin mix is the same on both builds (300 rolls: cnv ≈ 7 % both) → the co-op new-life path picks cung nữ far more often on the stack. NOT found yet: no stack hunk touches srvInit / ORIGINS / S.srv= (grep of the diff). Next: find how the co-op room rolls the seat's new life (title «Chơi cùng bạn» → roulette / ban hoa rebirth, jcoop* + j42 start wrapper) and diff that path's random draws stack vs LIVE; jsvt / jpromob / jtperc are the only new modules (all wrap existing fns). If the cung nữ seat is legal and only the RATE is shifted by RNG consumption, the test needs a servant-aware friend lookup instead (ask FOREMAN D).

### VIDEOS
Unchanged screens keep their CDN videos (img/_review/d-worklist-land/: svt, card, temper, ncfix-fold, ncfix-ipad, pd — Ban cung panel code jbancung/jpdist unchanged by LIVE; place-rules touched only stay/entry rules).
dfu (phân cung): RE-SHOOT running at roll time — /home/user/wt/lr3-tools/selx-flow-lr3.js (= dev/test/selx-flow.js + real taps «Về nơi ở mới» on «Tin sắc phong» → jpromob «Phân cung» panel shot → «Về nơi ở mới» → the game) → /home/user/wt/lr3-out/flow3/{fold,ipad}{,-2x}.mp4 + *-phan-cung.png; then quickcheck ALONE → /home/user/wt/lr3-out/qc2.log. Successor: look at the shots, upload with `python3 dev/site/cdn_sync.py img/_review/d-worklist-land` (copy the mp4s to img/_review/d-worklist-land/dfu3-fold.mp4 / dfu3-ipad.mp4 inside the dlr3 worktree first; never commit them).
Tools (this container): /home/user/wt/lr3-tools/{gates.sh, gates2.sh, origins.js, selx-flow-lr3.js}; logs /home/user/wt/lr3-out/; worktrees /home/user/wt/dlr3 (review/d-stack-lr3), /home/user/wt/live-f009 (bare LIVE, assembled).
STATUS: NOT LAND READY yet (coop-ban-cung friend). FOREMAN D = session_01D3E3NaVk7n7f8KTo2enJna.
