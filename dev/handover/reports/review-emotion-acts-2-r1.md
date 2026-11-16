# REVIEW — review/emotion-acts-2 @ 7b959216 → review/emotion-acts-2-r1 (reviewer, Foreman B)

Verdict: **FAIL** (2 numbered items below). Merge + small fixes are pushed and reusable: **review/emotion-acts-2-r1 @ 1d65c0e559c11183775d27643ff296e3e06a7510**
(descends from origin/main 8d14f6ef). The worker should continue ON this branch.
Spec: OD "16/11 13:08Z", "16/11 13:25Z" (B), "16/11 13:50Z, s17 chat" (3); FOREMAN_B INBOX 13:08Z s16, 13:30Z s17, 14:15Z s17; FAIL list of review-emotion-acts-r1.

## Merge onto origin/main 8d14f6ef
- Conflicts: assets.json, index.html, sw.js (rebuilt), dev/build/assemble.py (main's list incl. jmgt/jspread/jk95/… + `jemoact.js` last). jbal2 merged clean. Site rebuilt (build_site.sh, media-check 0).

## Small fixes made on r1
1. ONE CORE: typed `1`s in rules + player text (minister standing ±1 in qhac / qvui / act, court favour −1 in okhoc / act, a child's Tài −1 in act) → `BAL.ea.nk.one`.
2. The Emperor's chill after drinking alone (eruou) wrote `E.ill` by hand → now the one illness API `eaIll` like every other kind (same record).
3. New test `dev/test/emotion-acts-lines.js` (scan for FAIL #1; exits 1 today).

## Checks — OK
- FAIL r1 #1 (logic): every kind now has a real gain + loss from BAL.ea.nk / BAL.ea.quo (c, e, t, s, m, o, q, k), outbursts, acts and extremes; ministers get feelings from real causes with fading. Reactions by temper + current feeling: timid never Đập đồ / Đánh / Mắng cung nữ cung khác / Phạm thượng / Châm chọc / Khoe; Phạm thượng hot only and never under cấm túc; men / court / ministers: quarrel / hard on others only when not timid.
- FAIL r1 #2: quở trách by temper + mood (Emperor's cấm túc ±1 month by his feeling at that person, words by nết; Thái hậu ×hot / ×timid; hỏi tội odds by the mistress's nết) and pillow talk by mood ("(dễ / khó hơn)", hot + furious greys "Rót rượu", never a dead end) — built and seen in shots.
- Forced outbursts: kit event frame, only "Tiếp tục", neutral wording, positive outbursts present (Ban thưởng, Bày tiệc trà, Mở yến, Thái hậu thiên vị…). No damage-control choice (OD 13:50Z).
- KIT: no CSS / style / createElement in jemoact.js; only existing classes `past`, `r`; act cards, event frame, greyed option = existing kit. KIT REQUEST kitFaceH / S.maid ('undefined' in Tuần lục) still there, not caused by this branch.
- VANPHONG: no %, odds via kit ladder (`Chắc chắn ·` is stripped by the kit odds chip, as everywhere).

## Tests (r1 build)
- `emotion-acts.js` (10 cases) + `emotion-acts-2.js` (9 cases) × 755x1000@2, 1000x755, 1180x820@2, 1366x1024@2, 844x390, 390x844: **PASS**, 0 page errors, 0 overflow; rerun after my fixes at 755x1000@2 + 844x390: PASS. Looked at the shots (Long nhan đại nộ, Thái hậu quở trách hot, Đêm thị tẩm "(khó hơn)", cấm túc line with the Emperor's words, 390x844 rotate prompt).
- Old save: a save made on the LIVE main build (= origin/main) → deser into this build at 755x1000@2 and 1180x820@2, played on: PASS (no errors, S.ea created, NPC outbursts run).
- coop-e2e (live Worker): 59 ok / 0 FAIL.

## FAIL list (for the worker)
1. **Visible lines are broken / filed on HER page (LUẬT SỬA CẢ NHÓM, fog + wording).** The new lines go to Sổ ghi → the Tuần lục book reads every "Stat ±n" with its kit number grammar (j87 WKE_TOK: a bare `Sủng ±n` = the Emperor toward HER, a bare `Danh/Sức/Tài ±n` with no name before it = HERS; `<Name> <stat> ±n` or `Sủng của <Name>` = that person). Result in the real book (seen in the kinds shot at 755x1000: "VIỆC CỦA TA · Thái hậu tụng kinh suốt đêm, gọi Hoàng hậu … (Sức −5, )."):
   - empty brackets "()" / "(, )" left after the book moves a number: e nghi, e eyen, e ext gian, t tkinh (buon + so), c ext gian ("Chu Ngọc Dao giận quá lỡ lời ()"), k kvui, k act ×5 — 12 lines;
   - another person's number shown on HER own page "Việc của ngươi" as if hers: "Chu Ngọc Dao giận quá lỡ lời (Danh −4)", the Hoàng hậu's "Sức −5", a prince's "Tài −1", another consort's "Sủng −3/+3" (bare Sủng = hers);
   - every man / court line (31 lines: all m and o outbursts, acts, extremes) is filed on HER page, and with the name masked ("Một vị Thị vệ chưa quen biết …") even when eaSay judged the person seen (fxSeen) — the fog rule of eaSay and the book's name rule disagree; "nâng đỡ ngươi (+5) … (−3)" has numbers with no unit.
   Fix for the whole family: write every eaSay / eaHitMe line in the book's grammar (name before each number of another person, `Sủng của <Name>`), make the subject of the line its person (kpPeople) so it lands on that person's page, one seen rule for eaSay and the book; then `SEEN=1 node dev/test/emotion-acts-lines.js <url>` (and without SEEN) must exit 0 (ministers use tdNews in the game; their rows in the scan are scan-only).
2. **Bot measure not shown "not worse".** Life bots on the r1 rules (runb.js sens, INP=inpage6.js, HHSTOP=1, INP2=inmood.js,inemoact.js, 2 × 2 processes, cap 2700–3300 s):

   | arm | lives | HH | early death |
   |---|---|---|---|
   | ON | 29 | 0 % | 66 % |
   | OFF (`__eaOff=1`) | 23 | 4 % | 39 % |

   6 ON lives (0 OFF) end the same way: the Emperor dies at 32–34 (year 10–11) and she is made to tuẫn táng by the new Thái hậu. The worker's run showed the opposite (28 % vs 56 %); pooled ≈ 45 % vs 49 %, so it may be noise (z ≈ 1.9) — but the cluster is specific. Find why (Emperor illness / mood from eaExtNpc + eruou, reign power via ministers' pow, consorts' oán from outbursts → the new Thái hậu's grudge) and re-measure with n ≥ 40 per arm; report HH, early death and Emperor-death-by-year-12 per arm.

Not FAIL, note: her outbursts 1.56 / 100 tuần (hot 2.4–3.1, timid 0.26–0.78); NPC per 100 tuần: acts 75.8, outbursts 52.5, extremes 21.7; quở +1 month 44 / −1 month 12; pillow grades 1148; tablets not turned 103.
