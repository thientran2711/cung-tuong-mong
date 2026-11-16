# PROGRESS review/act-split-w2 (opus, Foreman D) — act-split waves 2 + 3 + the Emperor-stroll "!" first slot
Base: origin/main bad941b4 (wave 1 live 02a0d3f108). Rules: OD 16/11 L1123/L1137/L1146/L1152/L1153, wave-1 design notes (PROGRESS_act-dedupe.md).
Table (before/after, family scan): dev/review/act-split-w2.md.

## Done
1. Wave 2 festivals/outings — `dev/build/jact2.js` (assembled right after jact.js):
   j31 FESTEV light events (7) + j7 festival month events (5) → the festival's place on Dư đồ ("!" on the day, open to her that day,
   fired on arrival, once a year). j71 festival dialog unchanged (THE dialog of the day). Option equal to this year's j71 act left out
   (AS_SAME; "Đứng xem rồi về" keeps ≥2 options). "Thả đèn cầu con" → Hành sự lantern card wish "Cầu con". S.festDone still set at day start.
2. Wave 3 night: Lẻn vào odds + BAL.ad.nightSneak / caught Danh + BAL.ad.nightCaught (+ line text); j7 coldvisit → night "!" at
   Trường Môn viện; "Nghe lén câu chuyện" one door per place per buổi (all pop-ups + the gossip "!").
3. Flag 2: stroll takes the FIRST "!" slot (BAL.ad.strollP 80), ≤2 per buổi kept. `dev/build/jact.js` adHapRoll/adHapArrive (AD_HAP_FIX,
   AD_HAP_FIRE hooks). Numbers: `BAL.ad` in jbal2.js (hapP, hap2, strollP, rareMinGrade, nightSneak, nightCaught).
State keys (personal, lazy): S.adFest {k: year}, S.adF71 {y,k,t}, S.adDoor.__nghe. Co-op: no world writes beyond festDone (as before).

## Tests
- `dev/test/act-split-inv.js` inventory (before), `dev/test/act-split-scan.js` family scan (dup 31 → 0), `dev/test/act-split-w2.js`
  functional (0 FAIL), `dev/test/act-split-vp.js` viewports, panel-size.js, coop-e2e.js. Results: see report.
Build: `python3 dev/build/assemble.py`; serve dev/ with a page that starts with `<meta charset="utf-8">` (python http.server).

## Not done (needs owner / art)
- Outer outing places (Ngự uyển ngoài, chùa Hộ Quốc): Dư đồ outer picture must come from Phượng Lệnh + a stage picture (art paused). ART NEEDED.

## Results (final build)
- act-split-w2.js 0 FAIL (stroll over 300 buổi: Emperor in the garden 42–49 buổi; stroll "!" before 8–11 → after 33–37, always slot 1, max 2 per buổi;
  all "!" marks 220–248 → 291–315).
- act-split-scan.js: duplicate acts 31 → 0; festival dialogs at day start 2 → 1 for 12 festivals.
- act-split-vp.js (site index.html): 755x1000@2, 1000x755@1, 1180x820@2, 1366x1024@2, 844x390@2 all ok; 390x844@3 rotate prompt ok. 0 page errors. Shots looked at.
- panel-size.js 5 viewports: exit 0. coop-e2e.js: 59/59.
- Site rebuilt (index.html, sw.js, assets.json) with dev/site/build_site.sh.
