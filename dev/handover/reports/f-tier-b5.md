# F-TIER-B5 — WORKLIST row 42, audit v2 batch 5: exit marks (worker session_01UV1SzkPgUHohAF6MkZ1naG, Foreman F ROOT 8)
PRIORITY #1 CHECK: OD 27/11 ~00:46Z law 2 (tiers) + 26/11 ~18:25Z §6.2b-END (odds word / life option) | main: the exit mark ALREADY EXISTS = kit §6.2b-END (jk2b `kitLifeOpt` + `KIT_END_RE` → `kitChoiceWarn` → §6.2k «Cẩn thận khi lựa chọn», `kitRiskOpt(o,p,loss,end)`, «…, kiếp này dừng» words) — REUSED, no new kit part | review/*: e-tier-b13 (batch 1+3, not touched), ob-ngoaicung-r6 (dinhhon2 unchanged there), D-SELX-FAIR (Lễ ra mắt new lives already say selxLossW «bị ban hoa, kiếp này dừng» — reused) | claims: none for batch 5.
KIT CHECK: reuses kitLifeOpt / kitChoiceWarn (§6.2k line), kitRiskOpt, kit lock reason (j75 `lk` → kit «why» row, KK28), kc3Line rows; no CSS, no new part.
START_CTX ~6 % (estimate); now ~13 %.

Branch **review/f-tier-b5 @ 695bf615** (2 commits: 63f627bf work + 695bf615 kit-conform knows `.kwarnl`), base LIVE c03d6ee7.

## STEP 0 — history / drama expert (law 8, sub-agent)
- 1. Lễ ra mắt: NHẸ bow and wait in the row (Qing xiunu); VỪA answer with one fitting classical line; NẶNG offer a talent unasked — higher prestige, higher fall.
- 2. Fail = ban hoa (Qing 撂牌子, drama flower): name it plainly «bị ban hoa, kiếp này dừng»; odds word on the rolling option, the end on its failure only.
- 3. Hòa ước: NHẸ go yourself (Huyền Trân to Champa 1306, An Tư); NẶNG ask the younger sister to go instead; going ends the palace life («xuất giá viễn phương»).
- 4. Courts often sent substitutes (clan daughters titled princess, Wang Zhaojun); refusing cost favour; Taiping Princess dodged a Tibetan match as a Daoist nun; a sister sent instead needs the throne's yes and her hatred follows.
- 5. Cha định hôn: accepted sính lễ bound the match (Ming law, Lê Code punished breaking it). NHẸ obey = xuất giá, kiếp khuê các dừng; VỪA kneel and beg; NẶNG cut hair / hang herself, named plainly.
- 6. Real stay road: girls registered for selection could not be betrothed before inspection (father must return gifts); mourning delayed weddings; nunhood needed parental consent. Card: «tự vẫn: mất mạng, kiếp này dừng».
- 7. Elopement: «bôn giả vi thiếp» (an eloped woman could only be a concubine); caught lovers were punished; families pursued; night river crossings drowned people.
- 8. The boat card names every outcome: caught = dragged home, the house knows; drowning = «có thể chết đuối, kiếp này dừng»; the odds word sits beside the death, never hidden.
- 9. Staying unmarried to teach is plausible but conditional: Jiangnan women tutors (Huang Yuanjie, Wang Duanshu), Đoàn Thị Điểm taught pupils, Bà Huyện Thanh Quan was cung trung giáo tập.
- 10. Conditions: known literary talent + scholar family + father's consent; the card states it up front («Cần: Tài … hoặc nhà thầy đồ; thiếu thì cha vẫn gả»), the fallback never applied silently.

## What the job found (truth, hand-checked against the code, not the word scan)
The audit's 23 «exit-mixed» static rows + C41/C42/C44 = **30 sets** here (C60 lists 25 lines; + dinhhon, dinhhon2, Hòa ước n_c1, Lễ ra mắt kc2Sel, Trả thẻ bài). 13 are FALSE hits of the audit's word scan (the «exit» is another person's, or a word like «chết oan» / «giả chết» in a stay road): j4 cn2 / nc1, j7 jealousprince / vulan, j96 c5, jcmaid cmTd, jkc chieu, jkc2 d_xd, jkc3 vhtrieu / thtrieu (they ENTER the palace), jroute rtNpcEsc (the NPC's exit). They are left as they are, except where the kit itself misreads them (below).

## The two FOR MAIN finds (fixed, law 11 family)
1. **«Đến bến sông»** (the live card is the kc3 home chapter jkc3b.js x1 «Lời rủ trốn đi»; jkc.js tmtron is the old-save card and was already right): the option's gain words «thoát chết, bị người nhà kéo về» contain «chết», which the kit hint reader (jk2b `KIT_DEADLY`/`kitHintSign`) takes for a death and DROPS from the Thành row and the hint → the card read «Vững · kết: Bị ép chia lìa» with no word that «Vững» is the chance to LIVE, and a robot that tapped it on «Vững» drowned 1 time in 4 (BAL.odb.jkc.rlKcElope 25). Fix: wx «giữ được mạng, về lại nhà» → card now reads Thành «giữ được mạng, về lại nhà, kết: Bị ép chia lìa» · Bại «chết đuối giữa sông, kiếp này dừng» (Fold lv0: «mất mạng») + «Cẩn thận khi lựa chọn». The kit root (same fault in 11 composed-road gains) → **KIT REQUEST K-GAIN-DEADLY** (KIT_REQUESTS.md, for KK70).
2. **«Xin ở vậy, mở lớp dạy chữ cho con gái»** (jkc.js kcTraveD): with Tài < 60 it silently ran kcMarry. Now: new key **BAL.kc2.st.kc.nuPhuTu = 60** (law 4; the typed 60 is gone), `kcNptOk()` = the one condition for the roll AND the card, and the option carries the kit lock `lk` → greyed card with the kit «why» row «Cần Tài 60 trở lên, hoặc con nhà thầy đồ» (expert line 10). Hint (KCH) = «không lấy chồng, mở lớp thành nữ phu tử; nhưng kiếp này dừng ngoài cung». Probe: Tài 30 → LOCKED; Tài 80 → open.

## Other changes (all in the 30 sets)
| set | before (LIVE c03d6ee7) | after |
|---|---|---|
| j4 tt3 «Theo cha mưu đại sự» | exit FIRST; hỏng «cả họ bị tru di» (her death unnamed, no warn line) | NHẸ Mật tâu first · NẶNG Theo cha last; hỏng «…, ngươi cũng chết, kiếp này dừng» → warn line |
| j4 ch2 «Vâng mệnh» (poison) | exit first; hỏng «bị ban chết» | Từ chối first; hỏng «bị ban chết, thường thì kiếp này dừng» (deathSentence has mercy rules → «thường thì») |
| j42 cnvWed / cnvGrant / cnvPrince | exit («kết thúc kiếp này») first | stay first, exit last (NẶNG) |
| j96 c6 ✦ «Giả chết, theo chàng rời cung» | success = over() «Cao chạy xa bay», no word on the card | wx «rời cung cùng chàng; nhưng kiếp này dừng ngoài cung» |
| j99succ «Tha cho …, cho xuất gia» | «xuất gia» in the NAME → kit warned as if HER life ended | «Tha cho …, cho vào chùa tu hành» (the Thái phi leaves, not her) |
| jroute rtAn «Khép kiếp này trong an nhiên» | exit first | «Sống tiếp» first |
| jroute rtNg / rtNg2 (blood test) | «Kêu oan rồi cúi đầu chịu tội» rolled BAL.route.ngDeath (50) with NO odds word and no «kiếp này dừng»; the other fails said «bị xử tội» | Nhận tội (NHẸ, sure lãnh cung) first; «Kêu oan» shows its TRUE word (100 − ngDeath → «Tùy duyên»), Bại «bị ban chết, kiếp này dừng»; the two other fails add «có thể bị ban chết, kiếp này dừng» |
| jkc2 kc2Sel Lễ ra mắt | «Cúi đầu chờ xét» last on the direct / old path (the selection days already put it first, SELSCENE-8) | first on every path (source `unshift`); new lives keep D-SELX-FAIR's selxLossW «bị ban hoa, kiếp này dừng» |
| test leave-palace.test.js | took `d.o[0]` as the vương phủ option | finds it by name |

Already right on LIVE (kept): jkc doc / tmtron / moi / dinhhon / dinhhon2 / trave (KCH hints name every end), jkc2 n_c1 Hòa ước (FIRSTCARD kitRiskOpt: Bại «được ở lại cố quốc thì kiếp này dừng ngoài Đại Hy», NHẸ first), jkc3b kc_hon x1 (Mất «thôi đường vào cung, kiếp này dừng ở đây»).

## PROOF
- **Scan (law 11)** `node dev/test/f-tier-b5/exit-scan.js <dev/build> [--md]` (sets in dev/test/f-tier-b5/sets.js; reads only what the card shows): **LIVE 20/30 PASS → branch 29/30 PASS**. The 1 left = j7 «Xin cho con đi tuần biên»: kit `KIT_END_RE` `đi tu\b` matches «đi tuần» (JS `\b` is ASCII) → a false «Cẩn thận khi lựa chọn» on LIVE → **KIT REQUEST K-END-RE-TU** (one kit line). jkc3b kc_hon x1 keeps its order (exit first) on purpose: a kc3 pending card stores its odds by option INDEX (PEND.kc3 pp.o) — a reorder would mis-map an old saved beat.
- **Page probe** `WT=<wt> node dev/test/f-tier-b5/probe.js <out> fold|ipad 1` (dev/test/f-tier-b5/cards.js, 24 real cards built by their PEND, 0 page errors both devices): every real exit card has the one warn line; rows above.
- **Shots** (Fold 755x1000 + iPad 1180x820 @2, looked 3×): https://ctm-img.victoria-tntt.workers.dev/img/_review/f-tier-b5/after-{kc-trave,kc3-tm96z-x1,rt-ng2}-{fold,ipad}.jpg — wipe after verdict: `python3 dev/site/cdn_sync.py --wipe-review f-tier-b5`.
- **Gates**: leave-palace.test.js 135/135 · kc-roads/scope-cards.js exit 0 (0 ReferenceError, 0 page error, every KCE/KCALT option clicked) · kit-std-scan (REPORT_ONLY, SUBS=0, Fold+iPad) X06 4 + X08 2 = within the frozen LIVE baseline (X06 4, X08 4) · quickcheck core gates: one-core / BAL-key / text-rule / kit-conform / webkit / odds-cap / coop-one-world / dialog-fixed / dead-card / button-crawl all PASS, old LIVE save loads (rules gate). Full quickcheck (`dev/tools/quickcheck.js`, branch vs LIVE c03d6ee7, idle box): **QUICKCHECK PASS · open 2518 ms · old save ok (LIVE save loads, plays a buổi, 0 errors) · perf new/live render 333/359, tab 596/656, buổi 1887/2147, tasks>200ms 42/37**. On a loaded box the bundled quickcheck.sh run hit timing-only reds (Q-SOFTLOCK, TIME-SPILL runtime, perf longTasks 50/25); re-run alone: **time-spill-guard PASS (89 checks, 0 bad)**, **q-softlock PASS on the branch AND on LIVE**, perf PASS as above. kit-conform first read the new §6.2k line on j4 tt3 as a hand-made #mb child (MIXED) → `.kwarnl` added to its kit list (695bf615).
- Saved pending beats: every set changed here is a `pid + pp` card rebuilt by its PEND on load (tt3 {o,son}, ch2 {o}, cnv* {w/m/by}, rtNg2 {}, rtAn {}, kc2Sel {}, kcE {e,s}); none stores an option index, so an old save with one of these cards open rebuilds it in the new order and resolves.

## Open for Foreman F (not done here, with why)
- **Cha định hôn 2 (dinhhon2) has 3 exits and no stay road** (audit C44): owned by OB-NGOAICUNG; review/ob-ngoaicung-r6 did not add one. A stay road is NEW content (law 18 / design) — expert line 6 offers the real one (a girl already registered for the selection could not be betrothed → father must return the gifts; or a mourning delay). Needs a ruling / owner of the road.
- **rtNg2 «Kêu oan rồi cúi đầu chịu tội» is dominated** by «Nhận tội» (same lãnh cung, + 50 % death, no gain) — law 3; a numbers/design call.
- **jroute rtNpcEsc keeps 4 options** (Báo / Giúp / Uy hiếp / Làm như không thấy) — 4 different results, no merge without removing content (law 2 cap; E batch 3 / design).
- Lễ ra mắt «Dâng <art1>» = «Dâng <art2>» MERGE is E-TIER-B13 batch 3 (not touched).
- **Kit (KK70)**: K-END-RE-TU, K-GAIN-DEADLY, K-LIFE-NOT-HERS (KIT_REQUESTS.md); and seen in every shot: the §6.2k «Cẩn thận khi lựa chọn» line sits BEHIND the event title pill (only its «!» edge shows) on the picture-card event layout — the warning is not readable; kit placement, LIVE.
