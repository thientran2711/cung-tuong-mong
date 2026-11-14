# EMOTION PLAN — tâm trạng của mọi người (review/emotion, module `dev/build/jemo.js`)

Owner 11/14 (02:20Z + later): every person has an emotion shown as a painted seal on the avatar frame; palace events move it through
personality; it feeds back into decisions (two-way, same rule for her), through the j95 motive gate; fog of knowledge.
Owner addition: anger/jealousy only raise the WISH to harm. Đức and traits are the brake.

## 1. States
Seals: owner-approved palace-lady set (gpt-2-6, Magnific VXUSWLpMMU), `img/kit/emo-<k>.webp`; earlier symbol / portrait / plain-emoji / topknot sets were rejected and removed.
One record per person `p.emo = {k, v 0–100, t (target key), why (true cause), w (tuần)}`; v < 15 = Bình thường.
| key | name | seal (img/kit/emo-*.webp) |
|---|---|---|
| vui | Vui | yellow ground, smiling eyes and red smile |
| binh | Bình thường | pale jade ground, calm |
| buon | Buồn | blue ground, drooping brows, frown |
| gian | Giận | red ground, V brows |
| so | Sợ | violet ground, round eyes, sweat drop |
| ghen | Ghen | green ground, side glance, pursed lips |
| lo | Lo âu | orange ground, wavy mouth, sweat drop |
| dau | Đau khổ | indigo ground, closed eyes, tear |
| muu | Toan tính | teal ground, sly half-smile |
| an | Chưa rõ | grey ground, white "?" over a faint hairstyle silhouette (fog) |

Who: her, the 12+ consorts (incl. Hoàng hậu), servants (staff + thân tín), Hoàng thượng (`S.emp.emo`, kept in step with the old `S.emp.mood` 0–3
both ways at strength ≥ 40), Thái hậu (`S.thO.emo`, in step with jcmood `S.cm.th`), officials (`S.court`), men, children.

## 2. Triggers (true events only) and how personality filters them
Read each tuần from real changes (rank, lãnh cung, cấm túc, children born/lost, thị tẩm, Sủng drop ≥ 6, Sức < 30, deaths) plus direct hooks:
`oanAdd` (a slight ≥ 5 → "slight" aimed at the doer), `affAdd` (kindness ≥ 8 → "gift"), `kidDie`, `punish`.
Default = `[emotion, strength]`; a trait replaces the emotion and multiplies strength (two traits multiply).

| event | default | Kiêu ngạo | Nhu mì | Tham vọng | Hiểm độc | Hiền lành | Đa nghi | Ghen tuông / Thù dai |
|---|---|---|---|---|---|---|---|---|
| a rival is promoted (aff < 25) | Ghen 30 | Giận ×1.4 | Buồn ×1 | Toan tính ×1.3 | Toan tính ×1.2 | Vui ×.5 | Lo âu ×1 | Ghen ×1.6 / – |
| a friend is promoted (aff ≥ 40) | Vui 20 | | | | | | | Trọng nghĩa ×1.4 |
| she is promoted | Vui 60 | ×1.2 | | ×1.3 | | | | |
| she is demoted | Buồn 55 | Giận ×1.3 | Buồn ×1.2 | Toan tính ×1.2 | | | | |
| a slight (oán gained) | Giận 35 | Giận ×1.5 | Buồn ×1 | | Toan tính ×1.3 | Buồn ×.6 | Giận ×1 | – / Giận ×1.4 |
| a gift / kindness | Vui 18 | ×.6 | ×1.2 | | ×.8 | ×1.3 | Lo âu ×.5 | Tham tiền ×1.6 |
| own child born | Vui 70 | | | | | | | |
| a rival bears a child | Ghen 25 | Ghen ×1.4 | Buồn ×.8 | Toan tính ×1.2 | Toan tính ×1.3 | Vui ×.5 | | Ghen ×1.6 |
| loses a child | Đau khổ 95 | | | | | | | |
| punished (cấm túc / phạt) | Sợ 50 | Giận ×1.2 | Sợ ×1.4 | Toan tính ×1 | Toan tính ×1.1 | Sợ ×1 | Sợ ×1.2 | |
| sent to lãnh cung | Đau khổ 85 | | | | | | | |
| thị tẩm | Vui 35 | | | | | | Lo âu ×.3 | rivals: Ghen ×.6 (Ghen tuông) |
| neglect (Sủng −6) | Buồn 30 | | | | | | | |
| illness (Sức < 30) | Lo âu 35 | | | | | | ×1.4 | Mê tín: Sợ |
| a friend dies / a foe dies | Buồn 55 / Vui 15 | | | | foe: Vui ×1.5 | foe: Buồn ×.6 | | |
| servants: mistress rises / falls | Vui 30 / Lo âu 40 | trung ×1.3 / ×1.4 · nhát: Sợ ×1.3 · tham: Toan tính | | | | | | |
| servants: Lòng ±5 in a tuần | Vui 25 / Buồn 30 | | | | | | | |
| children: mother dies / lãnh cung | Đau khổ 90 / Buồn 50 | | | | | | | |
| Emperor: child born / lost; punishes someone | Vui 55 / Đau khổ 60; Giận 35 at that person | nóng nảy: Giận ×1.5 on slights | | | | | | |

Same feeling again adds half its strength; a stronger different feeling replaces a weaker one.

## 3. Decay (points per tuần)
Vui 9 · Sợ 9 · Giận 8 · Buồn 6 · Ghen 6 · Lo âu 6 · Toan tính 5 · Đau khổ 3.
Trait multipliers: Thù dai Giận ×.4, Toan tính ×.6 · Hiền lành Giận/Ghen ×1.6, Toan tính ×1.5 · Nhu mì Buồn ×.7, Sợ ×.8 · Kiêu ngạo Giận ×.8 ·
Ghen tuông Ghen ×.6 · Hiểm độc Toan tính ×.6 · Trọng nghĩa Đau khổ ×.7. A child's death therefore weighs ~5 months; a slight ~1 month.

## 4. Effects (one rule for everyone, her included)
All effects scale by v/100.
| emotion | harm acts | kind acts (help, visit, warn, gift, ally…) | other | odds of own acts | tablet chance |
|---|---|---|---|---|---|
| Vui | ×.75 | ×1.5 | idle ×.9 | +2 | ×1.06 |
| Giận | ×1.6 (through the brake) | ×.6 | provoke/humiliate ×1.3, Emperor punish ×1.4 | −2 | ×.92 |
| Buồn | ×.75 | ×.75, visit ×.5 | idle ×1.7 (withdraws) | −1 | ×.94 (×1.05 with a nhân từ Emperor) |
| Sợ | ×.6 | ×.9 | apologise ×1.8, idle ×1.3 | −2 | ×.95 |
| Ghen | ×1.3 (brake); steal/block ×1.6, trip/rumor ×1.4 | ×.8 | | −1 | ×.96 |
| Lo âu | ×.9 | | spy/check ×1.6 | −1 | ×.97 |
| Đau khổ | ×.7 | ×.6 | idle ×2 | −2 | ×.92 |
| Toan tính | frame/plant/bribe/ally ×1.5, feign ×1.6, provoke ×.7 | | | +1 | |

- **Đức + personality brake** (EMO_BRAKE). Effective Đức = Đức + trait offset (Hiền lành +15, Nhu mì +8, Trọng nghĩa +8, Hiếu thảo +5,
  Hiểm độc −10, Tham vọng −5, Thù dai −5). Share `f` of the emotional harm boost that becomes harm:

  | effective Đức | f | anger at someone becomes… |
  |---|---|---|
  | ≥ 70 | 0 (harm ×.9; idle ×1.4) | withdrawing, cold words, complaints; no harm unless oán ≥ 60 toward the target (then f = .5) |
  | 40–69 | .5 | some harm |
  | < 40 | 1 | harm as the table |
  | < 40 and Hiểm độc / Tham vọng | 1.5 | strongly more harm |
- **Danger toward the target** of Giận/Ghen/Toan tính: + min(8, v/8 × f).
- **Motive gate (j95 `motiveOK`, wrapped lazily when the module is present)**: harm with "động cơ yếu" passes only when the feeling is aimed at that person,
  v ≥ 50 and f ≥ 1; the recorded reason reads "vì đang giận / ghen với / toan tính hạ <tên> (<cause>)". Passing harm gets the same phrase appended.
  Sợ/Đau khổ ≥ 60 block harm ("không còn lòng dạ nào"); Vui ≥ 60 opens friendly acts; Buồn/Đau khổ ≥ 60 refuse half of friendly calls ("muốn ở một mình").
- **Odds**: `odA` / `odT` (every act of every person, incl. her `od()`) get the odds column above (at most ±2 points).
- **Emperor's choice of whom to visit** (`nightCh`): her mood column above; the person he is angry with ×(1 − .5·v/100); the consort of his last good night
  (score ≥ 6) ×1.08 for 3 tuần; when he is sad/grieving/worried, Hiền lành and Nhu mì consorts ×1.08.
- **Servants' Lòng** each month: Vui +2, Giận −2, Buồn/Sợ/Ghen/Lo âu/Toan tính −1 (×v/60). A furious mistress may frighten her servants (30 %, Sợ 30).

## 5. Fog of knowledge
Her own: always. Others: known when she saw them within 2 tuần (anyone in `curPeople()`), her own servants and children, Thái hậu / Hoàng hậu by jcmood
`cmKnown`, all consorts when Tai mắt ≥ 3; the Emperor always (his mood is public court news). Known person but no fresh news → grey "?" seal; stranger (`kitIsKnown` false) → no seal.

## 6. UI (KIT.md 31)
`pcPort` draws `img.kemo` (the seal) on every frame size (tall frame, person card, small `mdH` frames incl. xs/sm strips) (no ring around the frame: owner removed it). Tooltip/alt: "Tâm trạng: Giận (bị ngươi làm nhục)". API `window.kitEmotion(p)` →
`{k,name,v,why,known}`. Owner 22:50Z: no code-reshaped facial expressions; this seal is the ONLY display of feelings.
The Emperor's mood is public (as the Hoàng thượng box always showed): his seal follows `S.emp.mood` unless a stronger (≥ 40) feeling is set.

## 7. Measurement
First pass (odds ±4, tablet ×1.15, danger +12) measured HH 47 % / early death 43 % (n=30) against off 35 % / 35 % (n=31): too strong a
self-reinforcing loop (happy → more nights → happier). Damped to the numbers above (v2), re-measured below.
Bot `dev/measure/run5b.sh` (sensible bot, 9 origins), emotion off (`window.__emoOff=1`) vs on — results in PROGRESS_emotion.md / section 8.
