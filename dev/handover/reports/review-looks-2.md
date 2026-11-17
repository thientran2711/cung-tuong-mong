# REVIEW looks-2 r1 (PART 1) — review/looks-2 040ce3440 → FAIL (1 item)

PRIORITY #1 CHECK: OD (17/11 ~16:20Z real) (g) + 16:35Z/16:40Z/17:25Z tail lines + L126/L130/L139/L348/L1144/L1154/L1196 read verbatim | ORDER '(17/11 ~16:30Z) NEW LOOKS' + NOTE 16:35Z + ADD 16:40Z + NOTE 17:12Z in FOREMAN_B_STATUS | main 086f1d60 (jface KIT_FACEFX, jtoil kmkl, j13 ILL daumua, jweather wxHit, j70 scar70) | review/* makeup-lux 186e30831, coop-thin-b-r3 fee14ec5, coop-thin-c 475beba7, weather-khac e1d540cf (not on main), harm-acts-design e6e36106 | claims looks-2 worker session_01N1tNP5NugSQQVChrBKbF4p (READY), this reviewer session_01N1tNP4D3L5wFB1qrZAfoHp.

Reviewer: opus, session_01N1tNP4D3L5wFB1qrZAfoHp · coordinator Foreman B s7 (session_01N1tNP2EybzVZ1ao4kd6ovb; s6 rolled over). START_CTX ≈ 8 %.
Branch review/looks-2-r1 = 040ce3440 + merge origin/main e9bbc4d67 (086f1d60), site rebuilt (only index.html / sw.js conflicted: rebuilt) + repro test dev/test/coop-looks-act.js (head 4d9fcd648). No reviewer code fix (the FAIL items are worker scope).

## Verdict: FAIL (numbered list for the worker)

1. **CO-OP: a harm mark put on the friend by a REAL act never reaches her** (blocking; brief check (5) "both seats agree").
   Repro: `python3 dev/build/assemble.py && node dev/test/coop-looks-act.js <outdir>` → B runs `runAct(S, friendEntry, "tea")` (roll forced) on A's entry: B's entry shows "Áo loang vết trà", A never gets it (A after the merged week: still her old `uot`) → **20/21**. coop-looks.js passes 21/21 only because it writes `f.rash` directly, never through runAct.
   Causes (all three must go): (a) `sendRes` (jcoopworld ~L343) resets `v.__b.fx=fxSnap(v)` right after the act, so the week write-back sees no change and the live relay then takes her old value; (b) smudge / ink / stain are TUẦN-scoped (they clear at the next tuần), so the week write-back delivers them exactly when they expire — they must ride the live `res` message (like `fx` stats / `fam` ops) and be applied on her seat at once; (c) smudge / ink of a made-up friend are stored in `f.toilette.lk`, which `liveStats` overwrites from her `tl` and which is not in FXL. Same family: slap (jslap) / rash / scar acts on the friend through runAct — check them with the same test after the fix. Make coop-looks-act.js part of coop-looks (21 → 22+ checks).
SCOPE (Foreman B s6 17:32Z, after this review began): 040ce3440 = PART 1. Smudge 3 levels, minigames (tea/water/ink), scar ointment, HARM_ACTS, all-weather effects and the move onto C-AG weather-khac hooks are PART 2 (review/looks-2-2) — NOT FAIL reasons here. Recorded for part 2:
- weather: 040ce3440 reads the OLD per-buổi weather (jweather wxHit / wxSev / S.wx), not C-AG currentWeather(k) (weather-khac e1d540cf, not on main) → part 2 moves it onto currentWeather(k).lv / wxkHook.
- emotion faces: jlooks §7 (`looksEmoFace` + `kitFace` swap to por-X~key.webp) is an EMPTY slot — LOOKS_ART is empty, so nothing is ever shown (looks-2.js `emoNoSwap` true). Allowed by s6's rule ("an empty slot that draws nothing is fine").
- smallpox scar is still the permanent j13 `daumua scar:-8`; smudge has 2 levels; no water act — all part 2.

Not FAIL, note: `oTea` / `oInk` use the same inline formula shape as main's `oRash` (`45+(a.tamco||0)/5+(a.mat||0)*3`); base odds are BAL keys; one-core-guard does not grow. Fine to leave, better to move the /5 and ×3 into BAL.looks with the item-2 work.

## What PASSES (on review/looks-2-r1 = 040ce3440 + main 086f1d60)
| check | result |
|---|---|
| (1) states trigger, her + NPC | looks-2.js all checks true (rain without cover 100 %, umbrella ≈ 96/200 vs gear 50, cry ≈ 78/100 vs 70, tea lands, NPC ink + gone next tuần, men stain but no smudge, emp/thái hậu denied, thủy đậu in ILL, old-save object safe). NPC choice probe: jealous NPC (ghen 55) → mindMenu(v, her) holds tea + ink exactly like rash (10/10 pairs each); calm start = 0 (same as rash). 45-buổi rain sim: consort smudged by rain via the NPC garden path. |
| (2) LAYER LAW 36/36 | rerun on merged main 36/36 (4 places × 8 marks + ALL); also 36/36 on a trial merge with review/makeup-lux. The wrap re-sorts every render, so a mark added after a makeup change and an old save (no lk / stain fields) keep makeup under every mark. Makeup = only `img.kmkl` (jtoil, also on makeup-lux). |
| (3) no code-drawn effect | jlooks draws only `<img>` from LOOKS_ART (empty) — no CSS / canvas / SVG drawing; stain html "" (chip + Sắc only until the body-fit KIT REQUEST). OK. |
| (4) one core | one-core-guard PASS (inline 4956 ≤ baseline 4957), one-core-text-rule PASS; texts print BAL keys (Sắc −sac[sev], dryBuoi). |
| (5) co-op | coop-looks 21/21, coop-e2e 63/63 (first run 63/64 "fold #next enabled" flake, rerun clean), coop-toil-look 29/29 — but see FAIL 1. Trial merge with review/coop-thin-c (contains coop-thin-b-r3): one conflict in jcoopworld buildFriend `v.__b` (thin-c `hhSafe(v)` vs looks-2 `fx:fxSnap(v)`) — resolve by keeping BOTH; sendRes also conflicts textually with thin-D `resTo` (keep both; FAIL 1 changes this spot anyway). After resolution coop-looks 21/21; coop-thin-c.js L3 15/15 (tea + ink acts on the thin guest included: lensKept, hostGot, backOnHer, hostSame). |
| (6) weather read, not built | no weather code built; reads the old jweather wxHit / wxSev (not weather-khac) → part 2 (see scope). |
| (7) makeup-lux overlap | trial merge review/makeup-lux 186e30831: no source conflict (jcoopworld LOOK line auto-merges, `mkKnow` + FXL push both kept), only index.html/sw.js; looks-2.js 36/36 + all checks, coop-looks 21/21 on it. No shared function edited. |
| quickcheck | PASS (core gates incl. kit-conform + co-op one-world probe; old save from live loads + plays; perf new/live render 183/165 ms, buổi 1004/975 ms, tasks>200 ms 13/13) |
| devices | Fold 755x1000 + iPad 1180x820 (shots @1, reviewer-only): her with smudge + tea stain + ink + thủy đậu and a consort smudged + wet → no overflow, no page errors; HUD "Thủy đậu · nhẹ". No mark picture shows (slots empty, correct). Shots in scratch only, none uploaded, deleted. |
| VANPHONG | chips "Phấn son lem nhem", "Mặt dính mực", "Áo ướt sũng", "Áo loang vết trà"; no %; odds via chanceW. OK. |

## For the worker (fix round)
Base your fix on review/looks-2-r1 (has the main merge + the repro test). Then rerun: looks-2.js (scan 36/36 + checks), coop-looks.js + coop-looks-act.js, coop-e2e, quickcheck, one-core-guard. Fix item 1 only (part 1); then re-review.
