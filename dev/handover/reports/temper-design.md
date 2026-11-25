PRIORITY #1 CHECK ('bộc phát|outburst|nóng tính|gây sự|temper'): OD 7 | ledger 0 | claims 4 (status lines + this seat) | main 15 (jemoact.js R_/eaMeOut/BAL.ea, jtrong.js DEED+trọng, j95.js motiveOK, j95s.js witnesses+gossip, jmoodknow, j2.js Khiêu khích/Trút giận, BAL.pm.val) | review/* 0 | archive 0. Reuse: everything below extends these; nothing is rebuilt.

# TEMPER-DRIVEN PLAY: design proposal (E TEMPER DESIGN, opus, no code)
For MAIN 134. It answers OD 25/11 ~05:45Z (read verbatim), and keeps 16/11 13:25Z B, 16/11 13:50Z s17 (3), 17/11 ~18:33Z (1) and 17/11 ~19:10Z. Laws 1–8 checked on every row. All numbers are proposed BAL keys; the measures below set the final values. Nothing is built before sếp says yes.

## 0. Expert pass (law 8): how hot, kind and cold women are seen, and how they still rise
| Source | Character / mechanic | What we take |
|---|---|---|
| Chân Hoàn truyện | Hoa phi (Niên Thế Lan): hot, beats and scolds servants, open jealousy. The palace fears her; nobody loves her. Her favour and her brother's power carry her. She falls through her clan and a real crime, not through her temper. | Temper costs **liking**, not **rank**. The climb is carried by favour, clan and Danh. A fall needs a real event (law 6a). |
| Như Ý truyện | Cao Quý phi: proud and sharp-tongued, but rarely deadly. Kim Ngọc Nghiên: soft words, cruel deeds. | People judge **deeds they witnessed**, not the face (it matches the art rule "faces never reveal personality"). Whoever has seen only her sweet side is fooled. |
| Diên Hi công lược | Ngụy Anh Lạc: quick to anger, talks back to superiors, takes revenge. She is fiercely loyal and kind to the people she protects (Phú Sát hoàng hậu, friends). The Emperor values her frankness. She rises to Lệnh Quý phi. | **"Hot but kind" = khẩu xà tâm phật**: those she was kind to forgive her outbursts. Lễ-minded judges (Thái hậu, a strict Hoàng hậu) resent them. Some Emperors like frankness. |
| History (Qing, 1765) | Kế hậu Ô Lạp Na Lạp cuts her hair in front of the Emperor: one outburst, and she loses everything although she is already Empress. | An outburst against the **Emperor himself** is real but must stay rare and tightly gated. Phạm thượng against lower superiors is survivable. |
| Đại Hy | I can't cite a scene from it that I'm sure of, so it is not used. | n/a |
| The Sims 4 | Traits (Hot-headed, Good, Mean…) make some emotions more frequent. Each emotion unlocks its own social options. | The **option set comes from personality × feeling**. This is the R_ table we already have. |
| Crusader Kings 3 | Stress builds up. At a threshold comes a **mental break**: a forced event with several options. Every option relieves stress, each costs something different, and the options are filtered by traits. Opinions shift by trait compatibility (Wrathful vs Calm). | This is exactly sếp's 05:45Z idea. **No "hold back"** option. ~4 trait-filtered options of equal value. Observers' opinion is scaled by what *they* value (our trọng). |

## (a) What exists today (main)
1. `jemoact.js` R_ = 57 outburst reactions, keyed by who × feeling group (vui/giận/buồn/lo/ghen), each with a temper gate `ok(p,T)`. T = `eaTemper` (hot/even/timid + gen/stingy/sus/pious) from the person's nết (`traitsOf`).
2. Her forced outburst `eaMeOut(g)` fires when the mood bar is past `BAL.ea.out.v` 45, the dominant feeling matches, and the feeling is at the heavy level. The weekly chance is `out.ch` 30 % × `out.t` (hot 1.6 / even 1 / timid .6), with a `cd` of 2 tuần. **One** reaction is drawn (`eaPick`) and shown with only «Tiếp tục».
3. NPCs (consorts, servants, Emperor, Thái hậu, men, court, ministers, children) do the same through `eaNpcWeek`, using their own reaction rows.
4. `BAL.ea.fx` holds what each reaction costs (vent, bạc, Sức, Danh, Đức, Lòng, Oán, thiện cảm). `BAL.ea.hoi` is two-way hỏi tội when someone hits a higher mistress's maid. `quo`/`pillow` hold the temper effects on quở trách and pillow talk. The "Nhịn" lock already stops a furious hot temper from picking hold-back answers in events.
5. `jtrong.js`: each person trọng 2 of 13 virtues. `DEED` gives each deed virtue tags. The regard a deed moves is scaled ×(1 + .5 per matched virtue − .6 per offended one) by the **judge's** trọng. Today the judge is **only the target**.
6. `j95.js motiveOK`: an NPC may gây sự or harm only with a motive of at least 30 (max of Oán, ghen, −thiện cảm, plus 10 if in a rival faction), and never while liking ≥ 40. **Her own acts skip this** ("người chơi tự chọn").
7. `j95s.js` witnesses + gossip: whoever stands at the same place and khắc sees a deed, and servants pass it on up to 3 hops. `jmoodknow` splits mood causes into public and secret. `newsAdd` brings news to her through a real witness.
8. Measured (PROGRESS_emotion-acts-2/-3): her outbursts per 100 tuần: timid ≈ 1.0, even ≈ 1.6–2.2, hot ≈ 5.6. With 36 tuần a year, that is about **0.4 / 0.7 / 2 a year**. The ON/OFF arms both reached HH 3 %, so there is no harm, but the measure has low power.
9. Gap vs 05:45Z: (i) she gets no choice; (ii) the R_ rows are not equal in value (Đánh cung nữ ≈ 68 bạc-eq vs Khóc ≈ 8); (iii) bystanders don't judge; (iv) her gây sự needs no reason; (v) some temper × feeling cells have fewer than 4 options.

## (b) Forced-outburst choice (replaces «only Tiếp tục», OD 25/11 05:45Z (1) canon overwrite)
- **Trigger:** unchanged (`BAL.ea.out`).
- **Options:** the R_ rows with who = her kind, g = the feeling and `ok(p,T)` true. They are sorted by `eaRW` temper weight and the top `BAL.ea.pick.n` = 4 are shown in the kit event frame (existing option rows with Được / Mất lines, no new UI part).
- **No hold-back option.** She must pick one. If fewer than 4 options are allowed, show the ones that are; every cell below has at least 3.
- **NPCs:** they pick from the same list by `npwPick` (temper weight × their needs), instead of drawing one reaction blindly. That is law 1.
- **Equal value (laws 2 and 3):** every option vents the same amount, `BAL.ea.pick.vent` (≈ 18 tâm trạng / feeling points). Each one then has its own **gain G** and **loss L**. The net price L − G is measured in one unit, bạc, using the existing rates `BAL.pm.val` (danh 5, aff 2, oán 1, khắc 6, Sức 1) plus new keys **loy 2, duc 3, th 2, hh 2, sung 4**. Every option must land within `BAL.pm.eqTol` 8 of the target `BAL.ea.pick.net` ≈ 10.
- **Measure:** a new `dev/measure/temper-equal.js` (pm-equal pattern) checks every temper × feeling cell. A reviewer reruns it.

Proposed sets (✓ = row exists in R_; + = new row). Prices use the rates above; the final values come from the measure.
| Feeling | Option | Allowed for | Gain (besides vent) | Loss | Net |
|---|---|---|---|---|---|
| Giận | ✓ Đập đồ | not timid | sleeps it off: Sức +5 | bạc 12 (the piece stays broken in her chest, law 6c), Danh −1 | 12 |
| | ✓ Mắng cung nữ (she picks the maid) | has a maid | that maid works carefully: her next errand +1 odds band | that maid's Lòng −6, Nhân judges −1 (see c) | 10 |
| | ✓ Gây sự với kẻ mình oán (the `cham`/`khac` rows widened) | not timid + has a reason (d) | the rival loses face: her Danh −2 (≈5 to her) | the rival's Oán +10, Danh −1 | 10 |
| | ✓ Nói thẳng trước mặt bề trên (Phạm thượng) | hot, a superior exists, not cấm túc | Tín / Trung / Cương trực witnesses +3 each; if that superior wronged her first, it counts as "có lý" (c) | the superior's thiện cảm −8, Danh −1, cấm túc risk (Mong manh, at most once per `pick.phamCd` 12 months) | 14 |
| | ✓ Đánh cung nữ (re-tuned) | hot | servants fear her: none of her own servants leaks her secrets for 4 tuần (gossip `keep` 0) | that maid's Lòng −14, Đức −1 | 12 |
| | ✓ Khóc vì uất ức / + Nuốt giận chép kinh / + Bỏ bữa | timid and even | the sympathy of Nhân judges +2 / Đức +1 / — | Sức −10 / Sức −8 + 1 khắc / Sức −12 | 8–12 |
| Buồn | ✓ Khóc suốt đêm | all | if the Emperor comes, he comforts her (Sủng +1, odds Có cơ) | Sức −10 | 8 |
| | ✓ Bỏ bữa | all | the Thái y comes by: a free check-up | Sức −14 | 10 |
| | ✓ Gửi thư nhà kể khổ | all | her family answers: ánh + (exists) | bạc 6, and her father learns her troubles (he may press her) | 9 |
| | + Thắp hương tụng kinh | all | Đức +1; Phật-type Thái hậu +2 | bạc 8 + 1 khắc | 10 |
| Lo âu | ✓ Thức trắng đêm | all | sharp eyes: +1 oSee the next day | Sức −12 | 9 |
| | ✓ Lục soát tẩm cung | not timid | finds a planted item or evidence if one really exists (law 6a/c) | Lòng −5 for each servant | 10–14 |
| | ✓ Cầu khấn khắp nơi | all | Đức +1 | bạc 12 | 9 |
| | + Sai người dò la tin tức | all | learns one rumour (j78 intel) | bạc 8 to the eunuchs + 1 khắc | 11 |
| Ghen (Chạnh lòng) | ✓ Châm chọc tình địch | not timid | the rival's Danh −1, she feels avenged | the rival's Oán +8, Khiêm judges −2 | 10 |
| | ✓ Tủi thân khóc thầm | all | Nhân judges' sympathy +2 | Sức −8 | 6 |
| | + Trang điểm lộng lẫy chờ ngự giá | all | if she meets the Emperor that day: Sủng +2 (odds Tùy duyên) | bạc 10, ghen of the rivals +3 | 10 |
| | + Kể xấu tình địch với cung nữ | not timid | the rumour spreads: rival Danh −1 (law 6a: it can trace back to her) | Tín judges −3 when traced | 10 |
| Vui | ✓ Ban thưởng cung nhân | not stingy | every servant's Lòng +3 | bạc 15 | 9 |
| | ✓ Khoe khoang | not timid | Danh +1 with those below her | rivals' ghen +6, Khiêm judges −2 | 10 |
| | ✓ Bày tiệc trà | not stingy | 2 guests' thiện cảm +4 | bạc 10 | 2–6 (bạc ↑ to fit) |
| | ✓ Ca hát thâu đêm | all | Tài +1 | Sức −6 | 6–9 |

The NPC kinds (Emperor, Thái hậu, servants, men, court, ministers, children) keep their own rows. Each cell gets topped up to at least 3 options in the same way, each with its own stat (`BAL.ea.nk`).

## (c) Perception model: who saw it, what they trọng, and what they know
**Who sees.** The eye-witnesses come from the j95s roster (same place and khắc). The rest hear through the gossip hops (×`tp.hear` .5). The Emperor and Thái hậu hear only through someone who tells them (`newsAdd` / `knTell`). Nobody judges a deed they never saw or heard about. This keeps law 6 (real evidence).

**What each observer O does.** O's thiện cảm toward the doer X changes by
`Δ = tp.base[deed] × trọngK(O, DEED tags) × relK(O, victim) × kindK(O, X) × reasonK(O)`, with these parts:
- **trọngK:** the jtrong idea (`BAL.trong.up` .5 / `off` .6), now applied to **bystanders**, not only the target. For a harsh deed, each offended virtue O trọng makes the loss ×(1 + .6), and each honoured one makes it ×(1 − .5), floored at 0. For a kind deed it is the reverse. New DEED rows: dapdo {Kiệm −, Lễ −}, mang {Nhân −}, danh {Nhân −, Lễ −}, gaysu {Lễ −, Khiêm −}, pham {Lễ −, Đễ −, Tín +, Trung +}, khoc {Nhân +}, thuong {Nhân +, Kiệm −}, khoe {Khiêm −}, cau {Kiệm −}, ke {Tín −}.
- **relK:** the victim's friend (aff ≥ than) gets ×`tp.friend` 1.5. The victim's enemy (Oán ≥ 30) sees the sign flip, at ×`tp.foe` .5 (they are glad). The victim gets Oán + (fx) as today.
- **kindK ("hot but kind"):** say X did kind deeds (help, visit, gift, thưởng, tiệc, tạ lỗi; jmem hooks) for O or O's people within `tp.kindWk` 24 tuần. Then harsh-deed losses are ×(1 − `tp.forgive` .5), or .7 if O trọng Nhân or Nghĩa. When O has seen at least `tp.tagN` 3 outbursts **and** at least 3 kind deeds from X, O stores the label **«Nóng mà tốt bụng»** for X: from then on outburst losses are ×.5 and kind deeds ×1.2. Outbursts plus harms give **«Nóng mà ác»** instead: losses ×1.5 and Oán + `tp.evilOan` 3. The label shows on O's person card on the existing «Tính nết» chip line (kitPcGrid; no new part).
- **reasonK:** if O knows a reason (public cause in jmoodknow, or the victim wronged X before), the deed counts ×`tp.reason` .6 ("có lý"). With no reason known it counts ×`tp.noReason` 1.3 ("vô cớ").
- **The Emperor** judges the same way, through his own trọng. If he has a frankness-loving nết, `pham` and `gaysu` "có lý" bring Sủng +1 (the Anh Lạc case). A strict-Lễ Emperor gives −. Never against him personally: that stays a separate, rare event (the Kế hậu case).

Example: a hot but kind consort scolds her maid. `tp.base` mang = −2. The numbers are proposals.
| Observer | trọng / ties | Δ thiện cảm toward her | Oán |
|---|---|---|---|
| Hoàng hậu (Lễ, Nhân), saw it; she helped HH last month | Nhân offended ×1.6, kind ×.5 ⇒ −1.6 | **−2** | 0 |
| A consort she nursed when sick (Nghĩa), saw it, label «Nóng mà tốt bụng» | forgive ×.3, label ×.5 ⇒ −0.3 | **0** | 0 |
| A rival who holds Oán 40 toward her | no tag hit, not the victim's friend | **−2** | 0 |
| The maid (victim) | | −6 Lòng (fx) | +4 |
| Thái hậu Từ ái (Nhân, Hiếu), heard it | hear ×.5, Nhân offended ×1.6 ⇒ −1.6 | **−2** | 0 |
| Thái hậu Nghiêm khắc (Lễ, Cần), heard it, no reason known | hear ×.5, vô cớ ×1.3 ⇒ −1.3 | **−1** | 0 |
| A strict-Lễ consort who knew the maid had stolen from her | có lý ×.6 ⇒ −1.2 | **−1** | 0 |

The same consort beating a maid **without** a reason, with no kindness record, in front of a Nhân judge: `tp.base` danh −5 × Nhân 1.6 × vô cớ 1.3 ≈ **−10**, and she risks the «Nóng mà ác» label. That is the Hoa phi road: feared, not loved, but still climbing on favour and clan.

## (d) Reasons to pick fights, the same for her and the NPCs (law 1)
- **One reason rule:** `motiveOK(a,t,kind)` (j95) for **every** doer, her included. Her motive = max(her Oán of t `S.ro`, her ghen, −her thiện cảm of t `S.rl`), plus 10 for a rival faction, plus her mood: `tp.moodM` +10 when the dominant feeling is giận or chạnh lòng at the card level. The threshold is the same 30. A recorded reason is always logged in the cause ledger (OD 16/11 13:40Z: every action has a reason).
- **Her «Gây sự» options = the NPC set:** Khiêu khích (j2), Trút giận (cx2.vent), Châm chọc, Kể xấu (rumour), Bẽ mặt (humiliate), Cãi lại bề trên. Each card shows its reason line (e.g. «cớ: oán 42 · ghét»). When she has a reason, the observers' reasonK applies in her favour.
- **Two-way:** NPCs gây sự with her through the same gate (exists). An NPC can now also become the **target** of her fights in their outbursts, and the victim's Oán gives them a reason to strike back (motiveOK). The drama loops: oán → gây sự → oán.
- **OPEN, needs sếp (law 16):** today Khiêu khích is free for her at any time. There are two options:
  - **Option A (recommended, it matches her own words "tôi cũng phải có lý do" + law 1):** lock it behind the reason gate, like the NPCs. A locked card shows «chưa có cớ».
  - **Option B:** keep it free, but count a deed with no reason as «vô cớ» (×1.3 harsher with every judge).

## (e) Proof it never blocks the Hoàng hậu road
The Hoàng hậu gate (j8 promoReqP / hhNeed / seatW) is Sủng 85, Danh 78, Đức hhDuc, Thái hậu th, Hoàng hậu không chặn, not cấm túc, plus seat weight from sons, clan, th and Danh.
| Temper | Outbursts a year (measured) | Net price each | Yearly temper bill | Upside (c) | Gate-stat bill a year (after caps) |
|---|---|---|---|---|---|
| Timid | ≈ 0.4 | ≈ 9 bạc-eq | ≈ 4 bạc-eq | the sympathy of Nhân judges | Danh ≈ 0, th ≈ 0 |
| Even | ≈ 0.7 | ≈ 10 | ≈ 7 | — | Danh ≤ 1 |
| Hot | ≈ 2 | ≈ 11 | ≈ 22 (≈ one charity act, 35 bạc → Danh 5) | Tín / Trung judges, frankness Emperor, «Nóng mà tốt bụng» halves losses | Danh ≤ 2–4, th ≤ 2 |

Guarantees, all as BAL keys and the same for every NPC (law 1):
- **G1, yearly cap** `BAL.ea.pick.cap` {danh 6, duc 3, th 6, hh 8} per 12 months from outbursts. Once a stat is capped, the options that pay in it drop out of the 4; the rest remain. The number shown is always the number applied.
- **G2,** Phạm thượng cấm túc at most once per `pick.phamCd` 12 months (r2 measured 5 in one hot life).
- **G3,** every Oán an outburst causes can be repaired with the existing Tạ lỗi / apologise deed (Khiêm and Sỉ judges weigh it ×1.2).
- **G4, measure before merge:** runb.js + inpage6 with arms forcing her nết hot / even / timid, 12 lives each, OFF arm `__eaOff`. Pass = rank reached by tuần 300, HH reach and early death within one SE across all arms, plus `temper-equal.js` green. HH reach alone is 3 %, too low in power, so the rank curve is the main metric.

Estimate: a hot life loses at most about 4 Danh a year to its temper, against the 78 needed and ordinary Danh gains of several points a month. Danh, the seat weight and the th / hh gates stay reachable for every temper. What really differs is **who likes her**, which is drama, not a blocked road.

## (f) What changes in code
| # | File(s) | Change | Size |
|---|---|---|---|
| 1 | jemoact.js `eaMeOut` / `eaPick` | top-4 options in the kit event frame (existing Được / Mất rows); NPC picks from the same list | SMALL |
| 2 | jemoact.js R_ + `BAL.ea.fx/rw` + new `BAL.ea.pick` | +6 rows (table b), re-tune the fx to equal value, caps G1 / G2; act art reuses img/act-*.webp (any new art goes to Foreman C) | SMALL |
| 3 | jbal2.js `BAL.pm.val` | add the loy / duc / th / hh / sung rates (one exchange table, law 4) | SMALL |
| 4 | new jtperc.js (or inside jtrong.js) + hooks in eaDo, agVent / provoke, the j2 gây sự acts | perception: witnesses (j95s) → trọngK / relK / kindK / reasonK, labels on the «Tính nết» chip; new `BAL.tp` | BIG |
| 5 | j95.js `motiveOK` for a===S + j2 card lock lines | her reason gate (Option A) or the «vô cớ» weight (Option B) | SMALL (after sếp's answer) |
| 6 | dev/kit/VANPHONG.md + text | the new option names, reason lines and labels in cổ trang wording; odds in words (law 7) | SMALL |
| 7 | dev/measure/temper-equal.js + runb arms + dev/test cases | the equal-value and never-blocks measures | MEDIUM |
Total: one BIG build (#4) plus small ones. Suggested order: 1 + 2 + 3 + 7 (one worker), then 4 (one worker), then 5 after sếp answers. Parking lot / FEATURE FREEZE: Foreman E may build it (OD 25/11 05:45Z).

## For MAIN 134: show sếp (Vietnamese) and ask only the open point
1. The ~4 forced options per outburst, all of equal value (table b).
2. The "hot but kind" perception (table c).
3. The never-blocks guarantees (e).
4. **Question:** (d) Option A or Option B for her Khiêu khích reason gate.
