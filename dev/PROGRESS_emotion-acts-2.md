# PROGRESS — review/emotion-acts-2 (worker, Foreman B) — fix of the reviewer FAIL on emotion-acts (r1)

Base: review/emotion-acts-r1 @ af2e5ce5 (reviewer's merge onto main 50299942 + 3 fixes). Report: dev/handover/reports/emotion-acts-2.md (docs branch).
Spec: OD "16/11 13:08Z", "16/11 13:25Z" (B), "16/11 13:50Z, s17 chat" (3); FOREMAN_B INBOX 13:08Z s16, 13:30Z s17, 14:15Z s17; FAIL list in
dev/handover/reports/review-emotion-acts-r1.md.

## What changed (all in dev/build/jemoact.js; numbers in BAL.ea — ONE CORE)
1. FAIL #1 — every NPC kind gets a real gain + loss and a line she can see. eaKind now splits: c consort, e Emperor, t Thái hậu, s servant,
   m man (S.men), o court eunuch / Thái y viện (S.court), q minister (S.trieu.H, new: they had no feelings), k child.
   - Outbursts (EA_REACT, by temper): m Cãi nhau với đồng liêu / Ấm ức cáo bệnh về nhà / Uống rượu giải sầu / Hậm hực ra mặt / Mở tiệc đãi
     bằng hữu (Lòng, his regard for her, sent home off the map); o Làm khó các cung / Lơ là việc / Nói xấu người được sủng / Nâng đỡ người
     quen (their favour af toward the consorts, her included); q Lớn tiếng trên triều / Cáo bệnh / Dâng sớ hặc phe đối đầu / Mở tiệc mời
     đồng liêu (pow standing at court, clan relations); k Khóc quấy / Biếng ăn / Ác mộng / Hờn dỗi / Nô đùa (hp, the Emperor's fondness,
     learning); e Một mình uống rượu (no tablet that tuần, chill chance) / Mất ngủ (fewer tablets) / Nghi kỵ (Sủng −) / Mở yến ngắm hoa
     (Sủng + to one, others jealous) / ban thưởng now costs the realm treasury; t Tụng kinh (calls her favourite: Sức −, thiện cảm +;
     illness chance) / Thái hậu lạnh nhạt (ghen) / quở trách by temper.
   - Emotion ACTS of non-consorts (act band): own names per kind × feeling (EA_NACT) + a small price in their own stat (BAL.ea.nk.act).
   - Extremes ≥ 3 tuần for every kind: illness through the one everyone-illness API (jface; Thái hậu → S.thIll, was S.thO.ill = never
     drawn), Emperor anger → every consort Sủng − (her: event), Emperor / Thái hậu joy → the favourite +, others jealous (her: event),
     Thái hậu anger → every consort thiện cảm − (her: event), men sent home, court favour −, ministers pow −, children hp / fondness.
   - Visible line: eaSay → Sổ ghi (log), which the kit week card (Tuần lục) reads. FOUND: S.news "Tin trong cung" is no longer drawn
     anywhere since the kit week card (j79 dawn draws wkSummary groups; j28 appends newsHTML only to a string) — so r1's consort news lines
     were invisible too. Consorts: newsAdd decides if word reaches her (tai mắt, keeps nết discovery) then log; ministers: court news
     (tdNews, Triều tab); Emperor / Thái hậu: public; others: the fog rule of faces (fxSeen) or her own household.
2. FAIL #2 — the two "not built" audit rows, built:
   - QUỞ TRÁCH BY TEMPER + MOOD: punish (the Emperor's cấm túc) +1 month when he is angry (emo gian ≥ BAL.ea.quo.v), −1 when joyful
     (never under 1); his words follow his nết in the log line. Thái hậu quở trách: ×1.5 hot / ×0.5 timid + words by nết (event + line).
     Hỏi tội: the mistress's words by nết; arguing back with a timid mistress +10, a hot one −10 (BAL.ea.quo.tryT).
   - PILLOW TALK BY MOOD (j8 night1): her mood band moves every answer's grade (joy +1 to lively answers; low −1 / −2 to all but the quiet
     one; ladder word rebuilt by j8 nx, "(dễ / khó hơn)" in the line); hot + furious → "Rót rượu, nũng nịu" greyed (eaLockWhy, never a dead end).
   - No other "not built" row in the audit (the comfort-visit row was a deliberate keep).

## Tests
- `node dev/test/emotion-acts-2.js <url> <out> [sizes]`: kinds, egian, tvui, quo, pillow, plock, punish, hoitimid, oldsave.
- `node dev/test/emotion-acts.js <url> <out>`: the 10 r1 cases (regression).
- Measure: runb.js sens, INP=inpage6.js, HHSTOP=1, INP2=inmood.js,inemoact.js; OFF arm XJS='window.__eaOff=1'; `python3 dev/measure/anemoact.py`
  now prints per kind (outbursts / acts / extremes / lines seen / hidden) + misc (quở ±, pillow, tablets not turned).

## Known (not this branch)
- KIT bug seen in Tuần lục "Sổ này ghi": kitFaceH(S.maid) treats her maid object as a ready face (the maid record has a `src` field =
  origin "home") → "undefined" text instead of the maid's face. Kit part (j79 kitFaceH) → KIT REQUEST to the kit keeper.
