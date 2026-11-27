# REPORT — B NUMBERS LAO-HEALTH (session_01N1tNP6QJZQkBVLWCaMR97K, child of FOREMAN B ROOT 3)
PRIORITY #1 CHECK: OD 'lao|illness|bệnh' L1141 / L1143 / L1151 / L1168 (lifespan + illness rules), L557–629 (Thái y visits) | main jmort.js, j13.js, jbal2.js L38–43, jkh.js L108, jface.js L235 (no lao fix anywhere) | review/* 0 | claims none (brief b-lao-health.md).
Base LIVE origin/main 772bee4f. **VERDICT: LAO-HEALTH = DESIGN (OD:L1141, L1151, L1168, L1143). No code. No ruling is broken.**

## (a) The real lao curve (code on LIVE)
- **How she catches it** (j13 illMonthP, monthly): base 1.5 % (+4 when Sức < 40, +1.5 per storm), +3 in Hạ/Thu/Đông. On a hit, 70 % a seasonal illness, else one of lao / mất ngủ / phong hàn (so lao ≈ 1/3 of non-seasonal hits; in Xuân every hit). Extra: jbal2 BAL.illAdd 1 %/month (lao 1/3 of the 40 % non-seasonal); jmort illAge after 35; j35 after 50. Measured natural rate: **lao 4–14 catches per 60 lives over 4 years** (~2–6 % of lives a year).
- **Known flag**: catchIll sets `known: p===S` → **always true for her**; illKnown(S) returns true for her always (j13 L8). She gets the log «Ngươi mắc lao phổi.» at once, the HUD chip «Lao phổi · nhẹ/nặng/nguy kịch» (j19 L95, kit chip k3r hot), a log line at every stage change («Lao phổi trở nặng»), and the routine Thái y verdict names it (jthaiy L73/L101).
- **Stages** (her, care c = careOdds = doctor 15 + Y thuật + an thai 5): each month first a cure roll BAL.odb.j13.rbIllMonthP 30 + c − 15 (lao is `slow`) = 15 % + c; else a worsening roll rbIllMonthP_2 35 − c/2 (st 1→2→3); at st 3 (nguy kịch) a death roll 25 × die(1) = 25 % (j13), then a second one 25 × die × BAL.illDie(2) = 50 % (jbal2 L41). Untreated: ≈ 44 % of catches reach nguy kịch, ≈ 78 % of those die → ≈ 1/3 of catches.
- **What she can do**: deck cards «Truyền thái y» (40 bạc, treatO 55 + Sức-lot + care → Vững band; failing that, one stage down at BAL.rk.treatStep), «Tự bốc thuốc» (Y thuật ≥ 3), «Tĩnh dưỡng» (free, 4 khắc), the map button «Bắt mạch, chữa bệnh» at Thái y viện, «Mời thái y bắt mạch». jmort care: Sức ≥ 70 / own doctor / Y thuật ≥ 2 each give careIll 15 % to shake a new illness off at once.
- **The lifespan omen** (jmort, «Tuổi trời đã tận, trọng bệnh …») is a different death (lifespan roll, owner curve mean 45 sd 15 clipped 15–85, no floor); it also shows to her (known p===S) except the ruled «sudden» share.

## (b) Measures (real build, month loop, dev/handover/reports/lao-health-bots.js — copy of dev/measure/lao-bots.js; one browser process at a time)
Forced catch (FORCE=lao, she catches lao in month 0), 200 lives × 1 year per style:

| style | lives | lao deaths | % of catches | months catch→death (median, range) | deaths with a month known:false |
|---|---|---|---|---|---|
| never treats (= s21a/b robots: chip «Lui») | 200 | 61 / 203 | **30 %** | 4–5 (0–12) | **0** |
| Tĩnh dưỡng once a month (free) | 200 | 21 / 208 | **10 %** | 3 (1–10) | 0 |
| Truyền thái y once a month (40 bạc) | 200 | 0 / 206 | **0 %** | — | 0 |

Natural play, 60 lives × 4 years per style: never → lao killed 1 life (1.7 %, age 22, year 3 — the same shape as F's two lives); thái y → 0 of 14 catches; rest → 0 of 8. Her illness known flag was true in every month of every life (0 hidden months in 1 140 lives).
NPC side (same runs): 26–36 consort illness deaths per 60 lives happen while she has not learnt the illness (lao 14–18) — NPC illness is hidden by design until she learns it (thái y tells jthaiy L140, «Hỏi han sức khỏe» jaudit L108, visiting j2 L146, Tai mắt ≥ 3, contagious st ≥ 2). That matches F's s18d save line {k:"lao",st:2,known:false}: it can only be an NPC record (her own record is never known:false; the save itself is not in the evidence branch).
F evidence: s21b json shows the robot opened the chip «Lao phổi · nặng» twice (taps 5896, 6119) and closed it with «Lui»; it never used a cure road. So the two deaths at 22 / year 3 = untreated lao (≈ 30 %) after a start age of ~19–20 — chance + persona, not a forced death.

## (c) Judgement against the rulings
- Law 6a REAL EVIDENCE / learnability: she learns it at once (log + HUD chip + stage logs + thái y); 0 hidden months → PASS.
- OD:L1141 (verbatim): "Sudden death is accepted as luck; it is not "the game cheating". … poison, illness, childbirth and epidemics shorten it." OD:L1151: "The owner says lives are too long ('3% before 30' is wrong; don't force long lives)." OD:L1168: "Lifespan: no floor; the roll decides; care can still add 2–3 years (careMax 3) as already ruled." OD:L1143: "Care lengthens a life only a little, with a hard ceiling (careMax 3 years); fate (số trời) rules." → an untreated illness killing a young woman is the ruled design; careMax governs the lifespan bonus only (jmort), not illness cures.
- Law 3 GAIN-AND-LOSS: every road has a gain — rest (free, time) 30 → 10 %, thái y (40 bạc) 30 → 0 % → PASS (and it reads as a tier: nothing / nhẹ / vừa).
- Law 4 ONE CORE: all lao numbers read BAL (odb.j13, illAdd, illDie, mort) except the j13 literals 1.5/4/3/70/25 and the `-15` slow malus (legacy, not part of this finding; logged here only).
- Law 11 family: every illness that can kill her (lao, đậu mùa, kiết lỵ, sốt rét, hậu sản, độc mãn, long thể, thủy đậu, omen) goes through catchIll / omen / KIT_FACEFX.api.ill with known true for her → no member kills her while hidden.

## (d) Verdict
**LAO-HEALTH = DESIGN (OD:L1141, L1151, L1168, L1143).** No BAL or rule change, no branch. STOP per brief.

## Side notes for Foreman B (not numbers, not done here — route if wanted)
1. The illness chip dialog (HUD k3r «Lao phổi · nặng» → .dlg kpcompact) shows only the name twice and «✕»: no danger word, no road to a cure. That is likely why both robots pressed «Lui». A kit / VANPHONG item (info-chip body text: what the stage means + «Truyền thái y / Tĩnh dưỡng / Thái y viện» road), for the kit keeper — not a numbers fix.
2. Natural runs: the Emperor died at 23–27 and a Tân Thái hậu forced tuẫn táng in 5 of 60 "never" lives within 4 years (7 / 180 over all styles). It follows the ruled adult curve (no floor), but Foreman may want a numbers look at the tuẫn táng share.
