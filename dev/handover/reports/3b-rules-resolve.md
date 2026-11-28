# 3b × rules resolve — review/lc34-3b-r1

PRIORITY #1 CHECK: OD L2649 (26/11 ~20:35Z tier contents) / L2666 (~21:30Z age-40 end removed) / L2670 (~21:40Z «Giữ bệnh, độc, ám sát») | main LIVE 5ad52416 | review/lr-rules caa95310 (rules-r1 cc86c635 + ui6 935c008b + tsg-kpk 09e10cd3), review/tmk-oanpace-fix-rv 4206db2c (lc31-b3b 07f7cd16 + TMK×oan-pace + RV-163L) | claims LR-RULES land-rules.md 06:10Z trial, MAIN 186 order.
KIT CHECK: reuses pbtn kit buttons + kitParse rows (tốn / thành labels); no new UI part.

Role: BIG reviewer-resolver (session_01Rc5AsNP4x7K5VHaCokJ1BK, child of MAIN CHÍNH 186). Laws read: ★ 18 LAWS, START_CORE, START_WORKER, START_REVIEWER.

## Result
`review/lc34-3b-r1` (pushed) = **1715054c** merge (caa95310 + 4206db2c, merge base 05804755) + **fcbc1992** (law-3 gain line on the jsvt talk buttons + tai-mat-know.test harness fix).
- LIVE 5ad52416 ancestor: yes. Files deleted vs LIVE / vs lr-rules / vs 3b: 0 / 0 / 0.
- assemble.py = union (asmunion: + jpromob jsideq jreignend jpdist joanpace jtperc jsvt jkpcard jstack); 487 modules.
- assets.json = 3b's (only "v" differs from lr-rules; same 33925 files). CHANGE.txt = 3b's line. index.html / sw.js rebuilt (dev/site/build_site.sh).

## Method (and a WARNING for later landers)
44 conflicted paths. `d3line.py` first (per line). **charmerge.py was NOT safe here**: on jaudit it put 3b's `spSee("oan",…)` from pvOanAny onto rules' NEW pvQuyAny (thiện cảm read as oán). So no charmerge; instead a token re-apply (`alignmerge.py`, below): every 3b edit (base→3b, token level, spSee wraps paired) is re-applied on the rules text only where rules left that exact window untouched; else the hunk stays for hand work. 72 hunks this way, 9 by `spdrop.py`, ~20 by hand. Every hunk then checked: (1) every `spSee("k",X)` of 3b is in the merge or X sits inside a pv*() call (3 left: j10 af → rules' BAL key, wrapped; jtsb go_10/11/13 moved by rules into the tsbAp card → wrapped by hand); (2) every added line of both sides found ≥ .85 similar or reviewed by hand (list in the log); (3) duplicate-insert scan (found 1: jtwoway flauntDanh twice → fixed).
Tools (copied to dev/handover/reports/lc34-3b-tools/): alignmerge.py, spdrop.py, show.py, rh.py / rhpy.py, linecheck.py, gates.sh.

## The one ruling that covers ~70 hunks (law 4 + law 11)
Rules (rank-pace / net-ghen) turned many shown numbers into `pvQuy(v,N,"quý ngươi")` / `pvOan(v,N,"oán")` (nết range); 3b (pace) wrapped the SAME numbers as `balSg(spSee("rel"|"oan",N))` (paced view). Both intents kept with ONE rule: **jaudit `aaSee`** — pvQuy, pvOan (rise), pvOanSet, pvQuyAny, pvOanAny now print the spSee-paced number after the nết factor (who = the target). So a 3b wrap on a number rules made a pv*() call is dropped (it is paced inside); every other 3b wrap is kept. No double pacing (3b never wrapped spSee inside a pv* arg; checked).

## Hunk table (after d3line; A = alignmerge token re-apply, D = spSee wrap dropped into pv*, H = by hand)
| file | hunks | resolution |
|---|---|---|
| jaudit | 2 | A: 3b spSee on pvOan «bớt oán» + pvOanAny lo/hi kept on the RULES functions; then H: aaSee in pvQuy/pvOan/pvOanSet + spSee("rel") in pvQuyAny (the ruling above) |
| j10 | 4 | A: TAI-MAT-KNOW confess / knSoldK on servPunish + spSee rel on Thưởng; D ×2 (pvOan SB.oan / DB.oan); H: courtGive = rules BAL.eff.j10.meCourtAct key wrapped `spSee("rel",…)` |
| j14 | 3 | A: TAI-MAT-KNOW spyLearn on Tra xét (her + NPC) with rules searchEv(); D: sell oán (pvOan) |
| j15 | 4 | H: Hoàng hậu acts = 3b ACT-MOVE-6 lines + khắc **BAL.ag.hh.kh** (the khắc jagacts hhAct really spends at rank ≥7; rules' BAL.btn.empAct.k is only the fallback path) + rules payCutTxt(); Ân xá (lãnh cung) = 3b; Cung nhân card = 3b tốn/thành wording + rules BAL.btn.svPlant/svSearch/svLook/svHoi keys + searchEv() count; court Biếu / Hỏi = rules BAL keys wrapped spSee rel; Thái hậu servant = rules svtGiao; other house's servant = rules svtGiao talks + 3b Mua chuộc / Dọa tố lines with BAL.btn.svDoa.k |
| j17 j30 j31 j8 j9 j95b jecon jpoison jthaiy jpma | 1–2 | A (3b edits on untouched windows; D where pv*) |
| j2 j25 j42 j71 j78 j95 jexam jmem jmen jrcv | 1–5 | A + D (3b spSee kept where rules kept balSg; dropped into rules pv*) |
| j24 | 7 | A ×6; H: svSell = 3b spyLeak (no naming notice, TAI-MAT-KNOW) + rules svTouch(v,g,"tm") |
| j55 | 3 | A ×2; H: rules tdLeakSay (pvOan/pvQuy) |
| j70 ×3, jagacts3, jemoact ×3, jroad, jtsb ×1 | — | D (spdrop: 3b's only change = spSee pacing, rules made it pv*) |
| jamove | 1 | H: ONE runner line: label «thành:» (3b) + rules' gain words |
| jbal2 | 2 | A: pace-speed numbers (BAL.ex bar [21,26,30], 3b) + rules win:3 / cdLapse; end of file = rules BAL.svt + 3b BAL.sideq (union) |
| jemoact | 1 | H: rules eaHitMineCard (uses pvOan) |
| jhouse | 2 | A; H: Tiến cử = rules BAL merit key, wording = the j15 line («thêm công lao lên bậc +N») |
| jration | 3 | D; H: Mượn son phấn = 3b kit rows (thành / hỏng); tribute = rules (giftTaste, invAdd, ghenUp for every target) |
| jshelf | 2 | H: rules — every jealousy through j1 ghenUp incl. NPC targets (ghenUp's own NPC branch = oán × BAL.oanCool.ghen.npc) |
| jts | 4 | A/D; H: d19 real-ease tsGiftEase (rules, the real amounts; 3b's spSee on a FALL of oán was a no-op); lễ tấn phong = rules tsLeMeCard (pvQuy) |
| jtsb | 7 | D ×6; H: «Thu làm tai mắt» moved by rules into tsbApCard → 3b TAI-MAT-KNOW (price BAL.ag.know.tm.def.bac, learn oán line, spyLearn on leak) ported into the card; go_10/11/13 wrapped |
| jtwoway | 4 | A (+ duplicate flauntDanh removed); H: humil = 3b thành/kèm with rules pvOanAny; drop/gossip/admon/flaunt = 3b lines; follow = rules pvQuy |
| time-spill-guard.js, jgift, jstip | — | d3line (kpk-b selector kept) |

## Extra fix found by the gates (fcbc1992)
- act-move-law3-scan (3b law-3 gate) on the merge: **NOGAIN 12/99** = rules' jsvt «Hỏi chuyện» / «Hỏi lén» on another house's servant (and a Thái hậu servant) showed only «N khắc». New `svtGainX(s)` in jsvt (the gain svTalk really gives: a nết of her master; Thái hậu servant: elderTalkGain thiện cảm BAL.eff.jstaff.meAct); the suspicion after stays unwarned (OD 24/11 ~08:08Z). Whole family: j15 ×2 cards + j10 staff list. → **0/104 PASS**.
- tai-mat-know.test on the merge: 20/22 about 1 run in 2 — rules' jsvt svTouch «seen» (a real witness, the master learns) changes the master's feeling on the recruit roads the test treats as NO knowledge. Test-only: those checks run with `__svtOff=1` (the witness rule has its own tests); also «Hoán Bích» matched /oán/ → letter-safe regex. → 22/22 ×8.

## Gates (fcbc1992 unless said)
| gate | result | baseline |
|---|---|---|
| node --check all dev/build/*.js | 0 errors | — |
| assemble + build_site | built, media-check 0, img-allowlist OK | — |
| oan-pace.js | ALL PASS 33 | — |
| tai-mat-know.test.js | 22/22 ×8 (after harness fix) | 3b alone: same rare cap flake (nết ×2.1 → 16.8 > oanPace.day 16; «aff −1») 3/12 runs = pre-existing, RV-163L owner |
| tai-mat-know-scan | 0 breaches | — |
| rank-pace.js | ALL PASS | — |
| pace-speed.js / stat-pace.js | PASS / PASS | — |
| leave-palace.test.js (tư thông E74 family) | 135/135 | — |
| reignend.js | PASS | — |
| charge-trinh-punish | ALL PASS | — |
| act-move-law3-scan | 0/104 PASS | 3b alone 0/91 |
| webkit-syntax | 487 modules, 0 parse hits | — |
| lookbehind-scan | 57 via kRx, 0 BAD | — |
| punish-scan.py | clean | — |
| punish-weight-scan.py | 1 fault jstagehere stayRoll sev | same on LIVE + b3a (pre-existing, rankpace-b3a report) |
| ghen-shown.js | FAIL «visit: no Thắp đèn line» | same FAIL on lr-rules caa95310 and 3b 4206db2c (pre-existing) |
| oldsave-r1 (LIVE save → new build, 3 sizes) | 16/16 | — |
| quickcheck.sh --runs 3 ALONE (CTM_LIVE_REF=5ad52416) | fcbc1992: CORE GATE G1 one-core-bind FAIL (svtGainX printed BAL.eff.jstaff.meAct) — rest PASS; **f857c7f3: CORE GATES PASS · TIME-SPILL PASS · QUICKCHECK PASS** (open 2454 ms, old save ok, perf new/live render 288/323, tab 577/568, buổi 2416/2019, tasks>200 45/37) | — |
| LIVE ancestor / deletions | yes / 0 | — |

## OD checks (no rule changed — law 16)
- L2666 / L2670: 3b's reign-end removes the age-40 «Tuổi xuân qua đi» end; the merge keeps it removed (no age end trigger; «Tuổi xuân» only in the jend fate-name map and j32 regex). reignend.js PASS.
- L2649 (tư thông tiers): this merge does not touch ttExposed / deathSentence (3b changed none of j22 / j8 deathSentence); E74 (tư thông = ban chết, mercy lãnh cung) vs L2649 rec (tử tội only for mưu phản …) stays the open question rankpace-b3a-resolve.md already sent MAIN — punish-stack (PUNISH-TIER-9) job.

## Open for MAIN (law 11 question, not changed here)
- jsvt svTouch «seen» on covert kinds (bribe / threat / tm / plot) is a real learning by the master but does not go through jagknow spyLearn (no learn oán, no m.spyKn record): two rules for «the master learns her servant was turned». Rec: svTouch seen + covert kind → spyLearn(m, A, BAL.svt.rel[kind]). Needs MAIN / owner word (law 16).
- RV-163L question carried (LR-RULES): NPC grouped harm 15/15 LIVE vs 7/15 b3b.

## LOG after the merge
- 07:4xZ RESOLVED PASS f857c7f3 sent (LR-RULES, MAIN 187, PUNISH-TIER-9). TMK-WARN-2 session_01Rc5AsKKRbFjb8jq7W9R9UA inactive (refused).
- Reviewer heads: RV-181 2849705d (jaudit pvOan prints a whole fall) → RV-184 ce77c7cc (elderTalkAmt shared amount; SUPERSEDES f857c7f3) → MAIN 188: 3b r2 = review/lc34-3b-r2-rv184 1a6a1aed (re-merge onto lr-rules-r2 a96564ad). Do NOT land f857c7f3 / lc34-3b-r1-rv.
- MAIN 187 ruling (07:04Z): svTouch «seen» on turn kinds → spyLearn. **review/svtouch-spylearn-r2 d6e7ac24** on 1a6a1aed (3f8bdc08 on ce77c7cc superseded): SVT_TURN {bribe,threat,tm,plot} seen → spyLearn(m,A,BAL.svt.rel[kind]); tai-mat-know-scan section 5 «witness roads» before 1 → after 0; tai-mat-know.test 24/24 (+2 checks); servant-trust.js 3b-merge harness gap (joanpace fold of exact oán/ghét rows) fixed: 1a6a1aed-equivalent 97–98/101 → 100/101 (last «Hỏi lén seen −10» pre-existing on caa95310). RV READY → RV-184, lander LR-RULES.
