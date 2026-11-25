# WORKLIST #9 + #26 — real state (SEAT W, Foreman D ROOT, session_01D3E3NbRg56gb2yfm5JFnCP, 25/11)

PRIORITY #1 CHECK: OD 24/11 ~06:00Z / ~06:35Z / ~06:40Z (#9) + ~07:58Z / ~08:08Z / ~08:12Z (#26), read VERBATIM | WORKLIST_OPEN rows 9 + 26 (D) | main 9f72524b: jnet.js netTh (L70), jbal2.js BAL.net.th/thFrom/thClamp/T[t].th (L2141–2175), jdis.js (emp/th/rivals only) | review/*: net-build + net-build-rv (IN MAIN), d-followups-1-rv cc4fed89 (carries servant-trust + promo-build-2, LAND READY, not in main), law1-gifts-rv 99faeb2b (LAND READY, not in main), ring-design-4 / kit-ring5 (MAIN/KK, place UI) | claims: this seat only for #9/#26.
START_CTX ≈ 4.5 % (ceiling 29.5 %).

## #9 Personality-driven thresholds (thân / oán / ân) + deeper nết
| part | state | proof |
|---|---|---|
| Per-nết thresholds, one core: quen / than / than2 / ky / ghet / oan / act / thu / host / tell / nguoi / repay; same rule for her, consorts, servants, men | **LIVE** | jbal2.js:2141 BAL.net.th, :2142 thFrom, :2143 thClamp, :2149–2175 per-nết offsets; jnet.js:70 netTh / :74 netThK |
| Typed relation gates replaced (101 → 24 sign tests), friend copies collapsed | **LIVE** | reports/net-build.md §1, net-scan.py; net-build-rv r2 a2d00ead |
| ân repay reads the real nợ ân book (repay per nết) | **LIVE** | net-build.md L131 (jrtrig rtWhyAll, q72Debt ≥ netTh(v,"repay")) |
| Danger heat (ghen/dislike share), proud ÷ gentle harm ×2.9 | **LIVE** | jbal2.js BAL.net.heat; j28.js:38 danger() |
| Favour promotion Sủng cut per Emperor nết (OD ~06:35Z (2)) | **BRANCH** (WORKLIST #7 job) | review/d-followups-1-rv jpromob.js:69 pbSungCut (BAL.promoR.sp.sung.add[trait]) |
| Gifts likes/dislikes two-way for every giver/receiver | **BRANCH** | review/law1-gifts-rv 99faeb2b (jmind giftTaste, scan 23 → 0 one-way) |
| npcAct band-3 share ≤ 30 % (oán saturates NPC→NPC, p90 98) | **NOT DONE** (43 % sens) | net-build.md §4 L81 «per-nết oán fade / oán heat — not done» |
| §3.4 row 2: intent sign (mindTell) earlier for open nết (Nóng nảy, Kiêu ngạo), later/never for hidden (Điềm tĩnh, Xảo quyệt) | **NOT DONE** | net-build.md §4 L82; j40.js:54 mindTell has no nết term (git grep netTh in mindTell = 0) |
| Dislikes for servants, men, her (OD ~06:35Z (1)) | **LIVE** (correction of my first read) | jmind.js:73 mindDis — jdis owns emp/th/consorts, jmind everyone else (her included); two-way gift effects = law1-gifts-rv |

## #26 Talking to others' people (refuse / talk → suspicion, trust, leaks) + greeting etiquette
| part | state | proof |
|---|---|---|
| svTouch / svTalk / svtEtq / svtPeer: refusal by lòng + Chủ tin + nết; talk → master suspicion, Chủ tin −, real-deed leaks; bất kính when master present and not greeted; NPC↔her, NPC↔NPC, servant↔servant; no pre-warning | **BRANCH, LAND READY** (reviewer PASS) | review/d-followups-1-rv cc4fed89: dev/build/jsvt.js, BAL.svt (jbal2.js), tests servant-trust 80/80, svt-scan 67 / 0 unwired (reports/servant-trust.md, d-followups-1.md) — waits LC13 landing |
| Ring / «vòng nhóm» place UI (followers behind master, tap a follower) | **NOT MINE** — design/kit by MAIN + KK (RING-DESIGN-4, kit-ring5); jsvt rule functions are ready for it | reports/servant-trust.md §4 |
| Covert «hỏi lén» option (OD ~07:58Z «mình sẽ có cái option là hỏi lén … làm trước mặt và làm sau lưng») | **NOT DONE as a choice**: only the open «Hỏi chuyện» exists; covert kinds today are Mua chuộc / Dọa / Cài tai mắt (not a plain secret talk) | jsvt.js (d-followups-1-rv): svTalk = open only; j15 «Giao thiệp» has «Hỏi chuyện» only |

## Step 2 plan (one branch per item)
- review/net-thresholds (from origin/main): (a) dislikes for servants / men / her (jdis pool + disInit, same gift rule); (b) mindTell intent sign by nết (BAL.net.T[t].tell-sign share); (c) per-nết oán fade to bring band-3 share toward ≤ 30 % (robot nt-run sens). Kept consistent with temper-design.md (T1 outburst thresholds read BAL.net, no second copy).
- review/talk-others-people (from review/d-followups-1-rv, because jsvt is not on main yet): «Hỏi lén» next to «Hỏi chuyện» — same gain (learn a nết / news), no greeting needed (no bất kính), but if seen the suspicion and Chủ tin loss are heavier (law 2 equal value, law 3 gain+loss), NPCs use the same choice (law 1), BAL.svt only.

## Step 2 results (25/11)
### review/net-thresholds 9d214d541d9e9b938508d2b34bcd66a544ec47d0 (from origin/main 9f72524b) — NOT review-ready yet (robot gate open)
- (b) intent sign by nết: `BAL.net.th.sign` (base 0, clamp ±20) + per-nết `sign` offsets (Nóng nảy +15, Kiêu ngạo/Cương trực +10, Thật thà +8 … Kín đáo −12, Xảo quyệt −15); j40.js mindTell chance + netTh(v,"sign") (j40 and jagharm prep both call it). Matches the existing nết text (Nóng nảy «không giấu mưu»).
- (c) ONE oán cooling rule `oanCool(h,x)` (j28.js): (BAL.oanFade + x × BAL.net.oanCool .05) × persF forgive, for NPCs, men/servants AND her (law 1 fix: her S.ro faded flat before).
- Gates run: `node dev/test/net-build.js` 203/203 PASS. NOT run yet: one-core ×4, coop-e2e, quickcheck, two-way-oldsave.
- Robot band-3 measure (nt-run sens ×2 live vs new, 900 s): INCONCLUSIVE — live runs crashed at 26 weeks (timer error), new runs hit «bot step hang >120s» after 169 weeks; samples not comparable. Successor: rerun `NT_GAME=<html> node dev/measure/nt-run.js out.json 900 sens` ×3 each side, then nt-sum / nt-norm; target npcAct band-3 ≤ 30 %, proud ÷ gentle ≥ ×2; tune BAL.net.oanCool only.
### review/talk-others-people 89fd188a538156b4ffe5c051e1a8e8aab4155b0f (from review/d-followups-1-rv cc4fed89; lands after it)
- «Hỏi lén» (OD ~07:58Z): svTalk(a,s,len) — no greeting owed → no bất kính; same gain as «Hỏi chuyện»; covert (seen less, SVT_COVERT.len) but heavier when seen (BAL.svt.tin.len 13 / rel.len 10 vs 8 / 6) and longer (kLen 3 vs k 2) — laws 2/3; NPC masters pick it in svtMonth by nết (svtLenO = npc.len 30 + sharp 25) — law 1; refusal unchanged. Kit: one more pbtn in the existing «Giao thiệp» group (j15) + one row button in j10 «Kẻ hầu cung khác»; no new part; wording cổ trang, no number in the after-lines.
- Gates: servant-trust 89/89 (9 new «Hỏi lén» checks), svt-scan 68 sites / 0 UNWIRED. Real-tap: button renders «Hỏi lén · 3 khắc», behind the same stranger gate as «Hỏi chuyện»; the physical tap did NOT land (fresh-life opening keeps the board hidden; my quick script, not the realtap harness) → successor runs it on review/robot-realtap with a mid-game save, + Fold/iPad shots, one-core ×4, coop-e2e, quickcheck.

## HANDOVER (rollover: context at the ceiling)
Both branches pushed. Open for a successor: (1) net-thresholds robot gate + full gates; (2) talk-others-people real-tap via the harness + shots + full gates; then BIG review each. Not touched: ring/vòng-nhóm UI (MAIN/KK); T1/T2 temper seats read BAL.net — no second threshold copy made. Worktrees /home/user/wt/w9, /home/user/wt/w26 kept for the successor (scratch /home/user/wt/w9-out, w26-out).

## SEAT W2 (session_01D3E3NYFRLosstH2Jpw3nQP, 25/11 ~07:40–09:20Z) — START_CTX ≈ 6 %
PRIORITY #1 CHECK: this report + D-temper-robot-0725 «SEAT W» | main 9f72524b (base of net-thresholds; d-followups-1-rv cc4fed89 still NOT in main) | review/net-thresholds 9d214d54, review/talk-others-people 89fd188a, review/robot-realtap 4523381f | claims: this seat.

### review/talk-others-people → 8b288d9e (SẴN SÀNG KIỂM, reviewer session_01D3E3Nb7G3pi5N3uqUqqmAn per D)
- b7604887: real-tap test `dev/test/svt-len-rt.js <url> <robot-rt ckpt.json> <out> fold|ipad` (realtap.js copied byte-identical from review/robot-realtap; mid-game save = robot-rt.js sliced life 30 buổi, `slice=30 cp=10`). Fold + iPad PASS, 0 dead, 0 jsClicks. FOUND+FIXED: a named woman of another house (s.eid) showed two «Giao thiệp» tabs + two «Hỏi chuyện» (jstaff elderGroups + jsvt) → j15 `svtGiao`: one group = Biếu + jsvt «Hỏi chuyện» + «Hỏi lén» (elder's own «Hỏi chuyện» dropped on other-house cards only).
- 8b288d9e (D order, LAW 11): result card said «ta không được gì, cũng không mất gì» after a talk that taught a nết. ONE hook in the result kit (j63 `KAK`): every knowledge line written since the act's rsnap through the three hubs noteAdd (j21 Sổ) / kitKnow (jnotice) / intelAdd (j78 tin/secrets) is listed under «Được». Family = all 56 noteAdd + 30 kitKnow + 9 intelAdd call sites (learnTrait, trait-by-deed j28:82, k61Know, intelLearn, jmen/j92/j95/jagknow). kitResultCard (jkitsel 93.8) gets explicit rows from its callers — not touched.

| case (dev/test/ka-know.js) | BEFORE (b7604887) | AFTER (8b288d9e) |
|---|---|---|
| learnTrait shown («Hỏi chuyện» / «Hỏi lén») | Ghi chú: không được gì — FAIL | Được: Sổ ghi thêm về X: … biết nàng Kiêu ngạo |
| learnTrait with notice | FAIL | Được: Ngươi biết nết X: kiêu ngạo. |
| noteAdd shown | FAIL | Được: Sổ ghi thêm về X: … |
| intelLearn (tin / secret) | FAIL | Được: <the fact> (Sổ duplicate folded) |
| kitKnow only | FAIL | Được: <notice text> |
| CONTROL nothing learned | Ghi chú (correct) | Ghi chú (correct) |
| total | 1/6 | 6/6 |
- Real UI after fix (Fold, talked): «KẾT QUẢ … là người nóng nảy. ĐƯỢC Sổ ghi thêm về Hoàng hậu Từ Anh Ninh: Khâu Lưu Ly kể: biết nàng ta Nóng nảy».
- servant-trust flake fixed (the «Hỏi lén» seen case picked a rival of her own palace → svTouch exempt): 89/89 ×8 stable. svt-scan 68/0, one-core ×4 PASS, coop-e2e 142/142 (b7604887), quickcheck PASS on b7604887 and on 8b288d9e (render 302/291 ms, buổi 1958/1662 ms, tasks>200ms 27/27).

### review/net-thresholds 9d214d54 — NOT ready (tuning open)
- Gates PASS: one-core ×4, two-way-oldsave (main save → 40 weeks, 0 errors). net-build 203/203 (W).
- Robot band-3 (nt-run sens, 900 s slots, hang → fresh life in the same slot, `dev/measure` + /home/user/wt/w9-out/slot.sh):
| build | weeks | npcAct band-3 share | proud÷gentle harm | NPC→NPC oán p50/p90 |
|---|---|---|---|---|
| live main 9f72524b ×3 | 733 | 719/1313 = 54.8 % | 3.42 | 15/96 |
| net-thresholds oanCool .05 ×3 | 690 | 404/1086 = 37.2 % | 3.13 | 11/75 |
| cand oanCool .10 ×1 (starved, early weeks only) | 109 | 31/213 = 14.6 % | 4.20 | 13/60 |
| cand .15 ×1 (starved) | 134 | 12/173 = 6.9 % | 2.35 | 4/38 |
| cand .20 ×1 (starved) | 173 | 13/265 = 4.9 % | 1.94 ✗ | 3/28 |
- The candidate rows are NOT comparable (14 «bot step hang» under CPU load, early game only; band-3 grows with weeks). The «bot step hang >120s» also hits live and new alike (harness/life hang, not branch-specific).
- NPC→her band-3 is ghen-driven (ghen p50 99, top driver 93–97 %) — oanCool cannot move that part; if .10 does not reach ≤ 30 % on a clean run, the rest is ghen saturation → D/MAIN call, not oanCool.

### HANDOVER (W2 rolled at START_CTX + 25 %)
Successor: (1) rerun `cand/c10.html` (= w9 build with `BAL.net.oanCool=.10`) ×3 slots ALONE on the box (no other robots; `./slot.sh C10a|b|c <html>`), nt-sum / nt-norm vs N1–3; if band-3 ≤ 30 % and proud÷gentle ≥ 2 → set BAL.net.oanCool=.10 in jbal2.js:2152, rebuild site, net-build.js + one-core ×4 + quickcheck + coop-e2e, push, SẴN SÀNG KIỂM to D. Else report the ghen share to D. Summaries + slot.sh: dev/handover/reports/nt-w2/ (raw json not kept). c10.html = `sed "s/BAL.net.oanCool=.05;/BAL.net.oanCool=.10;/" dev/index.html` of the w9 build.

## SEAT W3 (session_01D3E3NbdM3P7qSzPcC9ZE7u, 25/11 ~09:05Z–) — START_CTX ≈ 4 %
PRIORITY #1 CHECK: this report (W2 HANDOVER) + D-temper-robot-0725 «SEAT W» + review-talk-others-people.md (FAIL B1/B2/B3, N1/N2) + D ROOT order 09:09Z | main 9f72524b | review/net-thresholds 9d214d54, review/talk-others-people 8b288d9e, -rv 98f093b3, review/robot-realtap (robot-rt.js, used from a scratch copy, not committed) | claims: this seat.

### review/net-thresholds → 96c2859e SẴN SÀNG KIỂM
- Fresh container: w9 worktree rebuilt; c10 = `sed s/oanCool=.05/oanCool=.10/` of the 9d214d54 build; `slot.sh` from nt-w2; 3 slots × 900 s ALONE (no other robot / gate on the box).
| build | weeks | npcAct band-3 share | proud÷gentle harm | NPC→NPC oán p50/p90 | NPC→her top driver ghen/oán/−aff |
|---|---|---|---|---|---|
| live main 9f72524b ×3 (W2) | 733 | 719/1313 = 54.8 % | 3.42 | 15/96 | — |
| oanCool .05 ×3 (W2) | 690 | 404/1086 = 37.2 % | 3.13 | 11/75 | 93 % / 2 % / 6 % |
| **oanCool .10 ×3 (W3, alone)** | **736** | **174/1056 = 16.5 %** | **2.13** | **8/54** | 83 % / 1 % / 16 % |
- Pick: BAL.net.oanCool = .10 (jbal2.js:2152; band-3 ≤ 30 % ✓, proud÷gentle ≥ 2 ✓ — Kiêu ngạo harm 13.9 / Rộng lượng 3.2 per 100 hw). Tables: reports/nt-w3/sumC10x3.md, normC10x3.md.
- Harness: 11 «read hang» parts over the 3 slots even alone (fresh life restarts in the slot; same as W2 saw on live) — harness, not branch.
- Gates on 96c2859e: net-build PASS, one-core-guard/-bind/-text/-text-rule PASS, two-way-oldsave (main 9f72524b save → new build, 40 weeks) ok 0 errors, coop-e2e 142/142, quickcheck PASS (render 291/237, tab 607/669, buổi 1823/1514, tasks>200 28/24, core gates PASS).
- NOT widened (report + proposal): NPC→her band-3 is ghen-driven (ghen p50 99, top driver 83 %); oanCool cannot touch it. Proposal for D/MAIN: one item «ghen saturation» (BAL.net.heat.ghenK / a ghen fade like oán) measured with the same nt-run.

### review/talk-others-people-rv → r2 (B1/B2/N1/N2; B3 = W2's 8b288d9e merged)
- Base: -rv 98f093b3 (R1 whyTime fix) + merge of review/talk-others-people 8b288d9e (B3 «Được» knowledge hook, ka-know 6/6).
- B1 (law 16): jstaff `elderTalkGain(st)` = the ONE elder talk gain (thiện cảm meAct + k61Meet + palace news line); elder «hoi» and jsvt svTalk (open and lén, when not refused) both call it (`svtElderGain`). Real tap Fold: «ĐƯỢC … Sổ ghi thêm …: Diệp Thanh Hòa kể: biết nàng ta Ân cần · Ta đã quen biết ma ma Diệp Thanh Hòa», thiện cảm 0→1.
- B2 (law 1): svtMonth rolls svtLenO(NPC) for PEND.svtAsk too (pp.len); covert card «… lén tìm đến lúc vắng người, kéo ngươi ra nói chuyện riêng …»; talk → no svtEtq (no bất kính), her master's suspicion through svTouch "len" (SVT_COVERT); the asker's own master: the same chat touch as the open road; refusing a covert ask owes no greeting either.
- N1 (D: Thái hậu household = others' people, law 11): card t:"thh" = svtGiao(elderGroups + «Hỏi chuyện» data-elder="hoi2" + «Hỏi lén» "hoi3"), plain elder talk dropped; jstaff act hoi2/hoi3 → svTalk → `svtThhTalk`: refusal svtRefO, elder gain when she talks, Thái hậu learns only through a real witness (a talkative woman of that household, BAL.svt.seen.talk − covert) → Chủ tin −BAL.svt.tin[kind], Thái hậu favour (th) −BAL.svt.rel[kind]. Gap noted (not built): NPCs do not talk to the Thái hậu's women (svtMonth targets consorts only); bất kính for the Thái hậu needs her place (no knAt for her) — open talk there has no bất kính.
- N2: svt-len-rt passes a full buổi as «locked with its own khắc reason, a tap changes nothing»; also re-finds «Cung nhân» before each tap (the live handle went «gone» on re-render), pages «‹» when «›» ends, checks B1 gain + N1 Thái hậu card.
| check | result |
|---|---|
| servant-trust (+12 cases B1/B2/N1) | 101/101 |
| ka-know | 6/6 |
| svt-scan | 69 sites, 0 UNWIRED |
| one-core ×4 | PASS |
| coop-e2e | 142/142 |
| svt-len-rt REAL TAPS, robot-rt sliced save (30 buổi, Fold) | Fold PASS (talked, B1 gain), iPad PASS (refused); Thái hậu card both: one «Giao thiệp», «Hỏi chuyện» + «Hỏi lén», locked «Cần ✗ hết khắc trong ngày», plain talk 0; 0 dead, 0 jsClicks |
| quickcheck | PASS (render 277/292, tab 708/731, buổi 2943/2089 ms — one 3-run median while nothing else ran after it; W2's -rv run was 1627/2073, watch it in round 2), core gates PASS |
- Found by the robot-rt slice (not this branch, for D): dead close «Lui» on .dlg «Tin chờ người sai đi» (tapped 3×, dialog stays) + stuck 15 min on .dlg «Kính sự phòng ghi sổ».
- PUSHED: review/talk-others-people-rv 25a9a9cc SẴN SÀNG KIỂM (reviewer session_01D3E3Nb7G3pi5N3uqUqqmAn, round 2).

### HANDOVER (W3 rolled at START_CTX + 25 %, 25/11 ~10:25Z) — next job = Foreman D order 10:24Z (verbatim in D's message to W3; D re-sends it to the successor)
Open: (1) GHEN SATURATION — NPC→her band-3 ghen-driven (top driver 83 %, ghen p50 99; tables reports/nt-w3/sumC10x3.md «danger drivers»). Start: main j28.js:38 danger() ghen×persF×BAL.net.heat.ghenK (.45, jbal2.js:2146); find why ghen sits at 99 (fade / caps / gain sources), BAL-only fix, same rule her↔NPC and NPC↔NPC (law 1), real causes (law 6). Branch: review/net-ghen ON review/net-thresholds 96c2859e (the before-row must be c10 = oanCool .10, else band-3 mixes two causes). Before/after: dev/measure/nt-run.js via reports/nt-w2/slot.sh ×3 ALONE (900 s each), nt-sum + nt-norm; targets band-3 ≤ 30 % on NPC→her too, proud÷gentle ≥ 2. (2) LAW 11 family: relation delta shown in option text (Oán / thiện cảm / ghen / tin …) is before the target's nết factor (shown +10, applied +7, j28 persF) → one shared function shown == applied everywhere, scan script + before/after table.
Setup notes (fresh container): mkdir -p /home/user/wt + touch fetch.lock; sparse worktrees need '/dev/art/mkfit/' + '/dev/art/toil-fit2.json' for quickcheck (G4) and '/rank/worker/src/' to assemble main; two-way-oldsave takes file:// URLs of CTM_IMG_BASE= builds (main + new); robot-rt.js must run from a scratch copy with review/robot-realtap's own realtap.js.

## REVIEW — review/net-thresholds 96c2859e (BIG, reviewer session_01D3E3Nb7G3pi5N3uqUqqmAn, 25/11) — VERDICT: PASS, FF sha 96c2859e
PRIORITY #1 CHECK: OD 24/11 ~06:00Z / ~06:35Z / ~06:40Z (#9) | WORKLIST #9 | main 9f72524b jbal2 BAL.net.th / thClamp / per-nết, j28 oanMonth, j40 mindTell | review/net-thresholds 9d214d54 + 96c2859e (parent chain = origin/main 9f72524b; LIVE has not moved) | claims W/W2/W3.
Change: (b) `BAL.net.th.sign` (clamp ±20) + per-nết sign offsets → j40 mindTell chance (open nết show a scheme early, hidden late); (c) ONE cooling rule `oanCool(h,x)` = x − (oanFade + x·BAL.net.oanCool .10)·persF(h,"forgive") for every holder: rivals' oán + ro, relMS men/servants, AND her S.ro (before: flat oanFade, no nết — law 1 fix).
Laws: 1 ✓ (same rule for her, NPCs, men/servants; NPC→her v.oan cools by the same rule) · 2/3 ✓ (open nết: tells show sooner, but act/forgive sooner; hidden nết: hidden but befriend later — existing offsets) · 4 ✓ (all in BAL; one-core PASS) · 6(b) ✓.
REVIEWER'S OWN ROBOT CHECK (the C10 736-week summary is not in the repo; nt-run sens, 2 slots × 900 s per side, same box, at the same time): 
| build | weeks | npcAct band-3 | NPC→NPC oán p50/p90 | NPC→her oán p50/p90 · ≥30 | NPC→her danger p50/p90 · ≥60 |
|---|---|---|---|---|---|
| live main 9f72524b | 271 | 137/483 = 28 % | 14/92 | 19/83 · 35 % | 39/79 · 20 % |
| net-thresholds 96c2859e | 526 | 115/592 = 19 % | 7/49 | 0/36 · 12 % | 34/53 · 7 % |
NPC→her is NOT made worse (D's question): her oán tail and her danger tail both fall, the danger middle (≥30: 65 % → 61 %) stays — NPCs still threaten her (ghen-driven), they just stop carrying saturated grudges. proud÷gentle not re-measured here (W3: 2.13).
Gates (reviewer, 96c2859e): net-build PASS · one-core PASS · two-way-oldsave main save → new build loads, 0 errors (its week driver does not advance: turn 0→0, harness; the robot ran 526 weeks on this build with 0 page errors) · quickcheck PASS (render 283/298, buổi 2004/4422, tasks>200ms 25/31, core gates PASS) · coop-e2e 142/142 (a first run 141/144: the same live-Worker flake seen on two other branches today, count varies → worth a harness ticket).
Notes: (1) her own grudges now cool faster too → fewer «cớ: oán» reasons for her gây sự once temper-perception (Option A gate) lands — intended by law 1, watch it in T2's mood-rate numbers. (2) Raw nt json not kept; summaries regenerated with dev/measure/nt-sum.js.

## SEAT W4 (session_01D3E3NYQa21C7i6ghmbEahF, 25/11 ~10:26Z–) — review/net-ghen
PRIORITY #1 CHECK: this file W3 HANDOVER + review-temper-outburst.md note A | main j28.js:38/46/47, j8.js:472, j1.js:226, jaudit.js §5 pvOan/pvQuy (REUSED) | review/net-thresholds 96c2859e (base) | claims none.

### (1) GHEN SATURATION — cause + fix (BAL only), branch review/net-ghen 6d7d2da9
- Cause (new nt-in ledger: every ghenUp rise toward HER by cause and by causer): 46 % of all ghen rises toward her were CAUSED BY ANOTHER CONSORT (ghenUp(t,n,why,X): j28 provoke/flaunt, j8 stealWin, jtwoway, jagacts3 dance, jgift walk, jinv luxury, jvisit, jagmaid) — v.ghen is jealousy OF HER, so X's deeds piled onto her (law 6 wrong target). Fade = flat −1/turn (−3 thân); her own v.pg −1 flat, no thân relief (law 1 gap).
- Fix: j1 ghenUp — by = another consort (not a co-op seat) → oán toward that consort × BAL.net.ghenOanK .5 + the Chạnh lòng feeling at her (= the rule jshelf already used for NPC↔NPC; jshelf now reads the same key, its npcOanK removed). j28 ghenCool = ONE cooling rule for every holder (NPC v.ghen and her v.pg): (BAL.net.ghenCool.fade[not thân, thân] + ghen × k) ÷ persF ghen, at least 1; k = .03.
| build (nt-run sens, 3 slots × 900 s ALONE) | weeks | ghen p50/p90 | NPC→her band-3 | NPC→NPC band-3 | all band-3 | proud÷gentle | NPC→her top ghen/oán/−aff |
|---|---|---|---|---|---|---|---|
| before = c10 (net-thresholds 96c2859e) | 459 | 99/100 | 43/509 = 8.4 % | 67/197 = 34.0 % | 110/706 = 15.6 % | 2.09 | 85/2/13 % |
| after k .03 | 726 | 25/96 | 69/608 = 11.3 % | 90/281 = 32.0 % | 159/889 = 17.9 % | 2.32 | 70/4/26 % |
- Note for D: on the c10 base NPC→her band-3 was ALREADY ≤ 30 % (8.4 %); the 83–85 % «ghen top driver» was a saturated term, not band-3. After the fix ghen lives (p50 25) and the targets hold (≤ 30 %, ≥ 2). NPC→NPC band-3 stays ~32–34 % (oanCool territory, not ghen). Tables: reports/nt-w4/sum*.md, norm*.md; slot.sh there.
- Many «read hang / bot step hang» parts in every slot (harness, same as W2/W3 saw).

### (2) LAW 11 family «shown == applied» — wave 1 (oán) done, thiện cảm = wave 2 open
- The gap is ONLY oán (oanAdd ×persF slight, NPC holder, rise) and thiện cảm (affAdd ×persF trust, NPC holder, rise). ghen (ghenN) / tin have no hidden factor.
- REUSED the existing shared preview jaudit §5 (pvOan / pvQuy = the SAME factor as the wrappers; honest range while her knowledge of the holder's nết is partial). Changes: label arg (pvOan(t,n,lab) / pvQuy), no target → any-person range (new pvOanAny(n,lab) rewrite + pvQuyAny, shared aaAnyRange); aaMulRange: an unknown nết ranges over its OWN group only (cards read «+3 đến +13», were «+4 đến +41»).
- Scan: dev/test/relshow-scan.py (needs dev/test/relshow-bal.json: node dev/test/relshow-bal.js <abs dev/index.html> dev/test/relshow-bal.json — not in git). Runtime proof: dev/test/relshow-rt.js (every consort × 4 amounts: shown range brackets applied, oán 40/40, thiện cảm 40/40; ghen rule checks; text builders no error) PASS.
| kind | WIRED | HER | NEG | NOFAC | RAW |
|---|---|---|---|---|---|
| oán before (96c2859e) | 13 | 0 | 13 | 0 | 74 |
| oán after (6d7d2da9) | 63 | 0 | 13 | 0 | 25 |
| thiện cảm before = after | 5→6 | 9 | 129 | 0 | 253 |
| ghen / tin | — | — | — | 94 | 0 |
- oán RAW left (25): log rewriters «thù −n → oán ngươi +n» (j25:76, j63:18/44, jint:23, jk2b:218 — n comes from an older text, holder unknown), static act outcome lists (jtsb:93 AOUT, j17:92), faction lines (j10:190/192, j14:34), j2:212 stealKem (already ×slight, exact), j25:10, j55:183/214, j95b:221, jration:159, jkc:212, jgreet:133 (her holder), kit sample pages (jkitpage, jkrel), jpet (a fall). List: python3 dev/test/relshow-scan.py --list.
- thiện cảm wave 2 (253 RAW sites, many servant «thiện cảm» via msAffAdd which the trust wrapper also scales) NOT done — needs a seat of its own: same pattern `${pvQuy(holder,n,"<words>")}`.

### Gates on 6d7d2da9
| gate | result |
|---|---|
| net-build | 203/203 PASS |
| one-core guard / bind / text / text-rule | PASS ×4 |
| relshow-rt (new) | PASS |
| two-way-oldsave main → new (file://, 40 wk) | ok, 0 errors — NOTE: turn stays 0 in this harness on main→main too (endTurn loop does not move S.turn); harness, not branch |
| coop-e2e | 142/142 |
| quickcheck | PASS (render 248/261, tab 640/506, buổi 1520/1704 ms, tasks>200 25/24, core gates PASS) |
| real taps Fold + iPad | NOT DONE — my touch script (reports/nt-w4/rt2.js, lib/device openHost) does not get past the title menu (taps on «Chơi một mình» do not register in the rot host); needs review/robot-realtap's realtap.js (W3 note) |

### HANDOVER (W4 rolls: ceiling) — open for the successor
1. Real taps Fold 755x1000 + iPad 1180x820 on review/net-ghen: open a consort's card → an option showing «… oán ngươi +a đến +b» (e.g. Tố giác / Uy hiếp / apHostOpts) → tap, check the line in the log and the real oán change; use review/robot-realtap realtap.js from a scratch copy.
2. Then SẴN SÀNG KIỂM for (1) ghen + (2) wave 1.
3. Law 11 wave 2 (thiện cảm, 253 sites) + the 25 oán rest: D's call whether it is a new item.
