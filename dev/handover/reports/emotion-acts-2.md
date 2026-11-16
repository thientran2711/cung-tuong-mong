# REPORT — review/emotion-acts-2 (worker, Foreman B) — fix of the reviewer FAIL on emotion-acts r1

Branch: review/emotion-acts-2 @ 7b9592160257e1f10ba1a66e46b45be723632f30 (from review/emotion-acts-r1 af2e5ce5; descends from main 50299942 —
main has moved since; the reviewer merges as for r1). START_CTX ~5 % of the window. Full details: dev/PROGRESS_emotion-acts-2.md on the branch.
Spec: OD "16/11 13:08Z", "16/11 13:25Z" (B), "16/11 13:50Z, s17 chat" (3); INBOX 13:08Z s16, 13:30Z s17, 14:15Z s17; FAIL list r1.

## FAIL #1 — every NPC kind: real gain + loss on that person, a visible line (all numbers BAL.ea.nk / BAL.ea.quo — ONE CORE)
eaKind now: c consort · e Emperor · t Thái hậu · s servant · m man (S.men) · o court eunuch / Thái y viện (S.court) · q minister (S.trieu.H,
NEW: they had no feelings; now from real causes = their standing at court moved, fading by jemo's EMO_DECAY) · k child.

LUẬT SỬA CẢ NHÓM scan (kind × path; "line" = something she can see):
| kind | path | before (r1) | after |
|---|---|---|---|
| c consort | outburst / act / extreme | effects yes; line = S.news only → INVISIBLE (see below) | same effects; line → Sổ ghi when word reaches her (newsAdd tai mắt rule) |
| e Emperor | outburst | ban, noi real; khoc / matngu vent only; ghen none | Uống rượu (no tablet that tuần, chill 10 %), Mất ngủ (mood phiền, tablets ×0.7), Nghi kỵ (Sủng −), Mở yến (Sủng + one, others jealous), ban costs quốc khố −1; public line |
| e | act | vent only | own act names + tablets ×0.7 that tuần |
| e | extreme | buon/so ill (no line); gian / vui nothing | gian: every consort Sủng −6 (her: event "Long nhan đại nộ"); vui: favourite Sủng +6, others jealous (her: event); ill + line |
| t Thái hậu | outburst | ban, quo real; khoc / matngu vent only; ghen none | Tụng kinh (calls her favourite: Sức −5, thiện cảm +2; ill 10 %), Lạnh nhạt (ghen), quở trách by nết |
| t | act | vent only | own names + ill chance |
| t | extreme | set S.thO.ill (wrong field, never drawn); gian / vui nothing | ill through S.thIll (Hầu bệnh mission appears); gian: every consort thiện cảm −6 (her: event); vui: favourite +6, others jealous (her: event) |
| s servant | outburst / act / extreme | Lòng / ill; no line | same + own act names; line when seen / her household |
| m man | outburst / act / extreme | "self" = vent only; buồn/sợ p.ill only; no line | Lòng −, his regard for her ±, sent home N tuần (off the Dư đồ); extreme: ill + home 3 tuần / Lòng −12; line when seen |
| o court | same | same as m | their favour af toward the consorts (her too) −/+, ill; line when seen |
| q minister | all | no feelings at all | pow (standing) ±, clan relations ±; court news (tdNews, Triều tab) |
| k child | same | same as m | hp −, the Emperor's fondness ±, Tài −; ill; line when seen / always for her own children |

FOUND (group fault): S.news "Tin trong cung" is no longer drawn anywhere since the kit week card (j79 dawn draws wkSummary groups;
j28 appends newsHTML only to a string) → r1's consort lines were invisible. Lines now go to Sổ ghi (log) — read by the Tuần lục week card —
as jlost already does (newsAdd + log). Fog: everyone but Emperor / Thái hậu / her household only when she knows the person (jface fxSeen).

## FAIL #2 — the "not built" audit rows, built
- QUỞ TRÁCH BY TEMPER + MOOD: the Emperor's cấm túc (j8 punish) +1 month when he is angry at that person (emo gian ≥ 75), −1 when joyful
  (never under 1); his words by nết in the log line ("đập bàn quát lớn / nghiêm giọng hạ chỉ / thở dài hạ chỉ"). Thái hậu quở trách ×1.5 hot /
  ×0.5 timid + words by nết. Hỏi tội: the mistress's words by nết; arguing back +10 vs a timid one, −10 vs a hot one.
- PILLOW TALK BY MOOD (j8 night1): her mood band moves each answer's grade (joy +1 lively answers; low −1 / −2 all but the quiet one; ladder
  word rebuilt by j8 nx; "(dễ / khó hơn)" in the line); hot + furious → "Rót rượu, nũng nịu" greyed (eaLockWhy, never a dead end).
- No other "not built" row in the audit list (the comfort-visit row is a deliberate keep).

## Measurements (runb.js sens, inpage6, HHSTOP, INP2 inmood+inemoact, cap 3300 s; build c0d77857)
| arm | lives | HH | early death |
|---|---|---|---|
| ON | 36 | 3 % | 28 % |
| OFF | 36 | 3 % | 56 % |
Not worse. Per kind with effects (outbursts / acts / extremes / lines seen / hidden): c 7497/8604/3126/16224/3003 · e 270/2131/86/2487/0 ·
k 220/467/143/735/95 · q 0/440/0/440/0 · s 25/527/12/564/0 · t 0/570/0/570/0 · m, o 0 (jemo seeds their feelings at 25–30 only, under
the act line: reactions built + tested, rarely fire). Her outbursts 1.88 / 100 tuần. Quở +1 month 53 / −1 month 19; pillow grades 2017;
tablets not turned 174. A first run with ministers' feelings never fading gave 1276 minister extremes and +1 month on 95 % of cấm túc →
fixed before the final run.

## Tests
- `node dev/test/emotion-acts-2.js` (kinds: every kind × every feeling moves a real stat + lines on the Tuần lục card; egian, tvui, quo,
  pillow, plock, punish, hoitimid, oldsave) and the r1 `dev/test/emotion-acts.js` (10 cases) × 755x1000@2, 1000x755, 1180x820@2,
  1366x1024@2, 844x390, 390x844 (rotate prompt): PASS, 0 page errors, 0 page / dialog overflow. Looked at the shots (event frames,
  night answers with "(khó hơn)", greyed Rót rượu, Tuần lục page with Hoàng thượng / Thái hậu lines). Old saves load (oldsave cases).

## KIT REQUEST (bug in a kit part, not fixed here)
- kitFaceH (j79) treats her maid record as a ready face because S.maid has a `src` field (origin "home") → "undefined" text instead of the
  maid's face in Tuần lục "Sổ này ghi" (any week whose log names her maid). Fix belongs to the kit keeper (check `__kp` / a person record).

SẴN SÀNG KIỂM 7b9592160257e1f10ba1a66e46b45be723632f30
