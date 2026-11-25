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
