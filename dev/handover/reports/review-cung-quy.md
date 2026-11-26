# REVIEW — review/cung-quy 63de2af3 (BIG reviewer, opus) — **FAIL**

Reviewer session_01D3E3NZRZa7GDM13XyeesMm · depth 4 · START_CTX ~3 % · for worker session_01D3E3NZyGJdTgPiznVEBfbh (FOREMAN D). Owner row OD 26/11 ~06:50Z item (C) (read verbatim); order «(26/11 ~07:10Z) ORDER FROM MAIN 154 → FOREMAN D».
PRIORITY #1 CHECK ('cung quy'): OD 2 (06:50Z (C) + this order) | main: existing rank checks fxAuth/accOK/takeaway/humil/follow, jgreet, j82 seat game (the worker reused all of them) | review/* only review/cung-quy | claims: the worker above.

## What I checked (on my own, not from the report)
| # | check | result |
|---|---|---|
| 1 | Law 8: expert report before code (cung-quy-expert.md, §0–§9 + §G) | OK. Sources are given, HIST/DRAMA is marked, and §G cites the research rows |
| 2 | ONE rule: jcq.js cqRule/cqOK/cqAuth + ONE table BAL.cq (jbal2) | OK. Inline rkOf checks were moved into cqOK (tat, phatquy/fxAuth, humil ×2, follow ×3, takeaway, accOK). Gates: runAct, twDo, agOptsG, agLand0, motiveOK, approachOne, talkOpts. Bypass hunt: SOC.run → twDo (jtwoway map). Direct `.f(`/`.run(` calls are only free keys (ally, poison). Every `r0=runAct`/`tw0=twDo` capture is an inner layer of the chain (jcq loads last). Agent option `o.t` is a person object, and throne doers ('th', S.emp) are recognised. **No bypass found** |
| 3 | Law 4 | OK. The only typed number is the structural default gap 1 |
| 4 | Law 1 two-way | OK. The same function applies her→NPC, NPC→her and NPC↔NPC. The scan's both-ways table has 18/18 ✓ |
| 5 | Law 11 scan dev/test/cung-quy-scan.js (rerun) | PASS. 280 keys, 44 rank-ruled, 0 page errors |
| 6 | Robot dev/measure/cung-quy-rate.js, 20 tuần × 1 (rerun) | branch: 105 acts, **0 breaks**, 0 breaches, 2 blocked (ink, provoke), 0 «plan:» blocks. LIVE 3af7896e + `--inject` (BAL.cq block + jcq.js): 141 acts, **3 breaks** (provoke 2, nuoc 1). 0 page errors |
| 7 | Old save dev/test/cung-quy-oldsave.js LIVE→branch | PASS. Tuần 4→9, 0 errors |
| 8 | coop-e2e on the CDN build (assemble.py) | **143/143 passed** |
| 9 | CDN shots, Fold 755x1000 + iPad 1180x820 (looked at both) | OK. Standard kit Q card «BÁO · Phạm thượng», cổ trang wording, no overflow |

## FAIL — fix list
1. **Her breach is not warned in the Dư đồ focus view (law 2/3 informed choice; law 11 whole family).** jdf.js dfInPerson/dfActs offers Tát, Phạt quỳ, Hắt nước, Hắt trà and Hắt mực (BAL.df.inPerson) with `info:"" small:""`, so cqWarn never shows there. Yet doAct → runAct → cqRun charges the full breach (oán, Danh, cấm túc roll). Show the same cqWarn text in that row, and scan EVERY surface that can start a rank-ruled act of hers (j6 rv rows, focus view, talk options, any other) so all of them carry the warning.
2. **False block: «Ép nộp của» (batnat) is put in class `auth`.** On LIVE, tsbBulOK lets any higher rank extort ("cậy phẩm cao"). Now, without the Hoàng hậu, hiệp lý, the same house or a 3-rank gap, NPCs 1–2 ranks above are blocked, and she pays a «vượt quyền» breach. Probe on a fresh save: every pair with a 1–2 rank gap and no shared house → «vượt quyền(br)». Extortion is not discipline (research §3 is about punishment). Move batnat to `high` (strictly lower, equal = vượt phận), or give a research row that justifies `auth`. Also, the scan's BEFORE table lists batnat as "UNCHECKED", but LIVE had `rkOf(a)>rkOf(t)` in tsbBulOK: correct that row.
3. **«Vu cáo bề trên» runs unevenly across the accuse family (one rule, law 11).** cqRun finds a failed charge by matching the result text against `/không thành|bị bác|không đủ|vu cáo/`. That catches accuse and tocao, but misses xinhh («Hoàng hậu gạt lời … lễ vật trả lại»), trinhth («Thái hậu gạt chứng cứ …»), trinhhh («Hoàng hậu bác chứng cứ …»: "bác" without "bị") and expose («vu khống»). Use a structured fail signal per deed instead of the result text, cover all 10 accuse-class keys, and add a scan row per key (fail → consequence fires; success → none).

## Notes (not blocking)
- LACK.phatquy could also name hiệp lý lục cung (Hoàng quý phi while the Hoàng hậu seat is empty).
- Bold NPC breaches are rare: 0 in all bot runs, because Sủng ≥ BAL.cq.bold.sung is high. That is a design choice; the shot test proves the path works.
- On a guest (co-op friend) the NPC breach arrives as a Tin báo line, not the Q card, like other NPC deeds.

Shots are kept on the CDN for the re-review. No wipe, because the verdict is FAIL.
