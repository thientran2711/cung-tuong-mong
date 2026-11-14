# EMOTION PLAN — tâm trạng của mọi người (review/emotion, module `dev/build/jemo.js`)

Owner 11/14 (02:20Z + later): every person has an emotion shown as a painted seal on the avatar frame; palace events move it through
personality; it feeds back into decisions (two-way, same rule for her), through the j95 motive gate; fog of knowledge.
Owner addition: anger/jealousy only raise the WISH to harm. Đức and traits are the brake.

## 1. States
One record per person `p.emo = {k, v 0–100, t (target key), why (true cause), w (tuần)}`; v < 15 = Bình thường.
| key | name | seal (img/kit/emo-*.webp) | ring colour | expression hook (kitFaceExpr) |
|---|---|---|---|---|
| vui | Vui | yellow, smiling arcs | #f2c230 | vui |
| binh | Bình thường | pale jade, level face | (no ring) | – |
| buon | Buồn | blue, drooping | #3f7fd0 | buon |
| gian | Giận | red, V brows | #d8322a | gian |
| so | Sợ | violet, round eyes + sweat | #8a5cc8 | dau |
| ghen | Ghen | green, side glance | #3fa04a | gian |
| lo | Lo âu | orange, wavy mouth + sweat | #f08a24 | buon |
| dau | Đau khổ | indigo, closed eyes + tear | #2e3a8c | khoc |
| muu | Toan tính | teal, sly half-smile | #1f6f6a | – |
| an | Chưa rõ | grey "?" (fog) | – | – |

Who: her, the 12+ consorts (incl. Hoàng hậu), servants (staff + thân tín), Hoàng thượng (`S.emp.emo`, kept in step with the old `S.emp.mood` 0–3
both ways at strength ≥ 40), Thái hậu (`S.thO.emo`, in step with jcmood `S.cm.th`), officials (`S.court`), men, children.

## 2. Triggers (true events only) and how personality filters them
Read each tuần from real changes (rank, lãnh cung, cấm túc, children born/lost, thị tẩm, Sủng drop ≥ 6, Sức < 30, deaths) plus direct hooks:
`oanAdd` (a slight ≥ 5 → "slight" aimed at the doer), `affAdd` (kindness ≥ 6 → "gift"), `kidDie`, `punish`.
Default = `[emotion, strength]`; a trait replaces the emotion and multiplies strength (two traits multiply).

| event | default | Kiêu ngạo | Nhu mì | Tham vọng | Hiểm độc | Hiền lành | Đa nghi | Ghen tuông / Thù dai |
|---|---|---|---|---|---|---|---|---|
| a rival is promoted (aff < 25) | Ghen 30 | Giận ×1.4 | Buồn ×1 | Toan tính ×1.3 | Toan tính ×1.2 | Vui ×.5 | Lo âu ×1 | Ghen ×1.6 / – |
| a friend is promoted (aff ≥ 40) | Vui 20 | | | | | | | Trọng nghĩa ×1.4 |
| she is promoted | Vui 60 | ×1.2 | | ×1.3 | | | | |
| she is demoted | Buồn 55 | Giận ×1.3 | Buồn ×1.2 | Toan tính ×1.2 | | | | |
| a slight (oán gained) | Giận 35 | Giận ×1.5 | Buồn ×1 | | Toan tính ×1.3 | Buồn ×.6 | Giận ×1 | – / Giận ×1.4 |
| a gift / kindness | Vui 25 | ×.6 | ×1.2 | | ×.8 | ×1.3 | Lo âu ×.5 | Tham tiền ×1.6 |
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
| Vui | ×.75 | ×1.5 | idle ×.9 | +3 | ×1.15 |
| Giận | ×1.6 (through the brake) | ×.6 | provoke/humiliate ×1.3, Emperor punish ×1.4 | −3 | ×.85 |
| Buồn | ×.75 | ×.75, visit ×.5 | idle ×1.7 (withdraws) | −2 | ×.88 (×1.05 with a nhân từ Emperor) |
| Sợ | ×.6 | ×.9 | apologise ×1.8, idle ×1.3 | −3 | ×.9 |
| Ghen | ×1.3 (brake); steal/block ×1.6, trip/rumor ×1.4 | ×.8 | | −1 | ×.92 |
| Lo âu | ×.9 | | spy/check ×1.6 | −2 | ×.95 |
| Đau khổ | ×.7 | ×.6 | idle ×2 | −4 | ×.85 |
| Toan tính | frame/plant/bribe/ally ×1.5, feign ×1.6, provoke ×.7 | | | +2 | |

- **Đức + personality brake** (EMO_BRAKE). Effective Đức = Đức + trait offset (Hiền lành +15, Nhu mì +8, Trọng nghĩa +8, Hiếu thảo +5,
  Hiểm độc −10, Tham vọng −5, Thù dai −5). Share `f` of the emotional harm boost that becomes harm:

  | effective Đức | f | anger at someone becomes… |
  |---|---|---|
  | ≥ 70 | 0 (harm ×.9; idle ×1.4) | withdrawing, cold words, complaints; no harm unless oán ≥ 60 toward the target (then f = .5) |
  | 40–69 | .5 | some harm |
  | < 40 | 1 | harm as the table |
  | < 40 and Hiểm độc / Tham vọng | 1.5 | strongly more harm |
- **Danger toward the target** of Giận/Ghen/Toan tính: + min(12, v/6 × f).
- **Motive gate (j95 `motiveOK`, wrapped lazily when the module is present)**: harm with "động cơ yếu" passes only when the feeling is aimed at that person,
  v ≥ 50 and f ≥ 1; the recorded reason reads "vì đang giận / ghen với / toan tính hạ <tên> (<cause>)". Passing harm gets the same phrase appended.
  Sợ/Đau khổ ≥ 60 block harm ("không còn lòng dạ nào"); Vui ≥ 60 opens friendly acts; Buồn/Đau khổ ≥ 60 refuse half of friendly calls ("muốn ở một mình").
- **Odds**: `odA` / `odT` (every act of every person, incl. her `od()`) get the odds column above (at most ±4 points).
- **Emperor's choice of whom to visit** (`nightCh`): her mood column above; the person he is angry with ×(1 − .5·v/100); the consort of his last good night
  (score ≥ 6) ×1.15 for 3 tuần; when he is sad/grieving/worried, Hiền lành and Nhu mì consorts ×1.15.
- **Servants' Lòng** each month: Vui +2, Giận −2, Buồn/Sợ/Ghen/Lo âu/Toan tính −1 (×v/60). A furious mistress may frighten her servants (30 %, Sợ 30).

## 5. Fog of knowledge
Her own: always. Others: known when she saw them within 2 tuần (anyone in `curPeople()`), her own servants and children, Thái hậu / Hoàng hậu by jcmood
`cmKnown`, all consorts when Tai mắt ≥ 3, the Emperor within 2 tuần of a night. Known person but no fresh news → grey "?" seal; stranger (`kitIsKnown` false) → no seal.

## 6. UI (KIT.md 31)
`pcPort` draws `img.kemo` (the seal) on every frame size (tall frame, person card, small `mdH` frames incl. xs/sm strips) and a soft drop-shadow glow in the
emotion colour around the frame picture (`.kin.kemo-r`). Tooltip/alt: "Tâm trạng: Giận (bị ngươi làm nhục)". API `window.kitEmotion(p)` →
`{k,name,v,why,known,expr}` for kitFaceExpr.

## 7. Measurement
Bot `dev/measure/run5b.sh` (sensible bot, 9 origins), emotion off (`window.__emoOff=1`) vs on — results in PROGRESS_emotion.md / section 8.
