# PROGRESS — emotion-acts-3 (fix of reviewer FAIL on emotion-acts-2-r1)
Base: review/emotion-acts-2-r1 1d65c0e5 + origin/main 84c00794 + 08725411. Code: dev/build/jemoact.js (+ BAL.ea), tests, measures.

## Fix 1 — Tuần lục / Sổ ghi NPC lines (whole family)
- Every number in an NPC line now goes through ONE helper set in jemoact.js that speaks the existing book grammar of j87 (WKE_TOK):
  `eaN(person,label,n)` → hers: "Danh −2"; another person: "<short name> Danh −2" / "Sủng của <name> +3" / "Thái hậu thiện cảm −2";
  non-token labels (lòng, lòng y) stay plain text. `eaL(head,nums)` joins "head, n1, n2." — no brackets, so the book's wkeStrip
  never leaves "()" or "(, )". No new display part (KIT FIRST: Tuần lục book + j87 helpers only).
- Each line shows that person's own numbers (the act's real costs/gains: Sủng, Danh, Sức, Tài, quốc khố, Thái hậu…); lines that hit her
  carry her numbers bare (her page).
- Fog rule: one seen rule in `eaSay` (court/q → court news; Emperor/Thái hậu public; others only if her household or fxSeen AND the name
  is known (k61 kitKnownName); lines aimed at her always written). Unknown persons get no named number (`eaN` returns "").
- Fallback "ngươi bị …" log in eaHitMe removed (the hit is only written when her slot shows it).
- Test: `node dev/test/emotion-acts-lines.js <url> <out> [sizes]` (fog), `SEEN=1 …` (all faces seen), `ALL=1` prints every row.

| scan (130 line kinds) | before (r1) | after |
|---|---|---|
| broken "()" / "(, )" / "undefined" | 12 | 0 |
| lines about others filed on her page | 39 | 0 |
| written (fog) / not written | 130 / 0 | 60 / 47 (court news or unseen) |
| written (SEEN=1) | — | 114 / 11 |

## Fix 2 — bots: ON was harsher than OFF
Causes found (counters added to dev/measure/inemoact.js: empD snapshot at the Emperor's death, hitMe, rivals regard/oán):
1. Mocking (cham) by jealous rivals hit her ~3.5 / 100 tuần and r1's relAdd lowered the MOCKER's regard toward her −10 each time
   → a hatred loop (rivals ended at −80 regard, more plots on her). Fix: the mocked one's regard / oán toward the mocker moves
   (affAdd(t,p,−rel), oanAdd(t,p,oan)); her numbers move only when she is the one mocked.
2. Emperor / Thái hậu bestowals ("Ban thưởng hậu cung") drained quốc khố → kho < 40 → reign power fell monthly (jreign) → more
   assassination / poison plots on the Emperor (jmort mortPlotY) → early Emperor deaths → tuẫn táng. Fix: bestowal only while
   kho − BAL.ea.nk.e.kho ≥ BAL.ea.nk.e.khoMin (50); `eaKhoOk()`. Emperor lifespan itself is untouched.
Every outburst keeps a real gain and loss (unchanged list). Numbers only in BAL.ea.

Bots: runb.js sens, INP=inpage6.js, HHSTOP=1, INP2=inmood.js,inemoact.js, cap 7000 s, same seeds per arm (new SEED env in runb.js),
OFF arm XJS='window.__eaOff=1'.
| run | arm | lives | HH | early death | tuẫn táng | Emperor died (by year 12) |
|---|---|---|---|---|---|---|
| r1 (reviewer) | ON | 29 | 0 % | 66 % | — | ~year 10 in 6 lives |
| r1 (reviewer) | OFF | 23 | 4 % | 39 % | — | — |
| d1 (r1 code, seeded) | ON / OFF | 7 / 6 | 0 / 0 | 43 % / 17 % | — | — |
| f1 (cham fix) | ON / OFF | 18 / 14 | 0 / 0 | 44 % / 57 % | 1 / 1 | 8 (6) / 3 (1) |
| **f2 final (8ef43573), seeds 31–34** | **ON** | **57** | **0 %** | **49 %** | **4** | **14 (10); 2.0 / 100 life-years** |
| **f2 final** | **OFF** | **48** | **0 %** | **42 %** | **6** | **21 (13); 3.8 / 100 life-years** |
Early death gap 7 points at n ≈ 50 (SE ≈ 10 points) = not measurably harsher; Emperor deaths and tuẫn táng are now lower ON.
Hits on her per 100 tuần: cham 2.67, noi 0.14, egian 0.54; her outbursts 1.79. HH 0 % in both arms (inpage6 bot, cap 7000 s).

## Tests (final build 2ecd73f4 = 8ef43573 + main 08725411)
- emotion-acts.js, emotion-acts-2.js, emotion-acts-lines.js (fog + SEEN=1): PASS at 755x1000@2, 1180x820@2, 1000x755@1, 1366x1024@2,
  844x390@1, 390x844@1.
- coop-e2e (after assemble.py): 59/59 (one earlier run 57/59 under 17-load CPU: "A frozen when B left" timing; rerun clean twice).
- Old save (origin/main save → this build) at 755x1000 and 1180x820: no page errors, S.ea created, NPC acts run.

## KIT REQUESTS (not this branch)
- j87 wkeStrip: when it strips another person's tokens inside "( … )" it leaves "()" / "(, )" — game-wide tidy wanted.
- j79 kitFaceH(S.maid) prints "undefined" for the maid face (already filed in emotion-acts-2).
