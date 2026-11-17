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

## Round 2 — HANDOVER (not started by r1; 17/11 18:52Z)
Context: r1 reviewer at ~24 % of the window (START_CTX ≈ 8 %, rollover ≈ 33 %). Round 2 = review/looks-2-2 cfd4a6813 = part 1 + the FAIL-1 fix + ALL of part 2 (part 2 replaced the part-1 storage), so it is a BIG fresh review. Round 1 needed ~16 % of the window, so it would not fit before rollover. Hand it to a fresh opus reviewer.
For the successor (task text = Foreman B ROOT msg 18:50Z):
1. Merge newest origin/main (c114ab9e) into review/looks-2-r2 (base cfd4a6813); only index.html / sw.js conflicted last time → `git checkout --theirs index.html sw.js && bash dev/site/build_site.sh`.
2. FAIL-1 check: dev/test/coop-looks-act.js (on review/looks-2-r1 4d9fcd648 and, per Foreman B, folded into cfd4a6813) must pass on both seats (23/23 ×3). The r1 root causes are listed in item 1 above: sendRes reset of __b.fx; tuần marks only at the week write-back; f.toilette.lk overwritten by liveStats. Also try slap and rash through runAct, not just tea.
3. Trial merges that were clean in r1: review/makeup-lux (no source conflict), review/coop-thin-c (one jcoopworld buildFriend `v.__b` conflict: keep hhSafe + fxSnap; sendRes next to the thin-D resTo; coop-thin-c.js L3 needs about 15 min → run it in the background). Re-check both on the new sha.
4. Tools that worked in r1: serve the worktree root (`python3 -m http.server`) and run looks-2.js / facefx-scan / one-core-*.js against <url>/index.html; coop-*.js take [outdir] (NOT a url; a url makes an "http:" folder inside the repo); quickcheck `bash dev/tools/quickcheck.sh` (~6 min); to get past the 'Luân hồi' intro cover in custom shots, wait about 9 s and remove that fixed overlay.

## Round 2 — review/looks-2-2 cfd4a6813 → PASS review/looks-2-r2 fc7c649f7c93efcdd150f4f6baa56664c803d906

PRIORITY #1 CHECK: OD '(17/11 ~16:20Z real' (g), ~16:35Z, ~16:40Z, ~17:40Z (1)(3), ~17:55Z (2), ~18:10Z AVATAR = ID CARD (read verbatim) | main 579e8976 (jwxk currentWeather {lv, kd, kl}, jk2b KIT_LASTING / KIT_BAKE avatar rule, j70 SCAR70 + heal70 + ngocdungcao, jslap slapGame / slapNpcTier) | review/* looks-2-2 cfd4a6813, looks-2-r1 4d9fcd648, makeup-lux 7c6ef2fda | claims looks-2 worker session_01N1tNP5NugSQQVChrBKbF4p; this reviewer session_01N1tNP45Tvkk65nx19mgPyQ.
Reviewer: opus, session_01N1tNP45Tvkk65nx19mgPyQ · coordinator Foreman B ROOT session_01N1tNP3WvLNPV6guHYCkC66. START_CTX ≈ 8 %.
Branch review/looks-2-r2 = cfd4a6813 + merge main c114ab9e (337fc519) + reviewer fixes (49cc0139) + merge main 579e8976 (c975f067; assemble.py conflict: main's list + jlooks.js kept LAST, after jfigseal/jemoseal, so its kitFxLayers wrap stays outermost) + scan update (fc7c649f). golive.sh dry run on fc7c649f: checks OK (FF-only, quickcheck PASS, core gates PASS).

### Reviewer fixes (small, on review/looks-2-r2)
1. jlooks lkWxNow read only `.lv` (wet intensity) and rolled its own level for dry kinds (BAL.looks.wxLv + windUp). Main now gives C-AG's per-kind level `kl` for EVERY state (FOREMAN_B_STATUS 18:14Z; jwxk "gió lớn" [0,6,4] = never nhẹ). So "gió lớn · nặng" shown to her was a nhẹ look 70 % of the time (two levels for one weather = one-core break). Now: lv → kl → BAL fallback (old saves only). looks-2.js check `cagKl` (gió lớn kl 3 → level 3; nắng gắt kl 1 → 1).
2. dev/test/coop-looks-act.js 23 → 28 checks: A → B direction (real runAct "nuoc" + "ink" on the friend → reach B live, both seats agree) and one whole tuần for both seats (rash — unless its own time ran out — + scar the friend put on her survive the week write-back / liveStats, B still sees them).
3. dev/test/looks-2.js layer scan follows the owner AVATAR = ID CARD rule (OD 17/11 ~18:10Z, main kit-fx-register): portrait / avatar rows must show NO makeup and NO temporary mark; stage + mirror must keep makeup under every mark. (After the main merge the old scan read 18/36 — correct behaviour, stale test.)
4. dev/kit/KIT_REQUESTS.md: request (2) EMOTION PORTRAIT SWAP marked WITHDRAWN (owner 17:40Z (1) dropped emotion faces).

### Brief checks
| # | check | result |
|---|---|---|
| 1 | FAIL-1: real acts on the co-op friend reach her seat and survive | coop-looks-act 23/23 ×3 on 337fc519; extended 28/28 ×3 + ×1 on c975f067 (tea, slap, rash, hủy dung B→A; water + ink A→B; marks survive a tuần turn). One run 26/28 = test bug (rash nhẹ lasts 1 tuần → expired by rule), fixed in the test. Root causes a/b/c gone (sendRes `fxl` before the baseline refresh; resApply lkMergeIn on her seat; live pos carries it back). |
| 2 | every weather kind + env causes vs the A/B table | BAL.looks.wx covers every WX / WX_KH kind (petal, rain, mist, sun = nắng gắt only, storm, leaf, wind, snow, snowh, frost, snowp; dust / cloud quiet). Smudge 3 levels (cat.smu, LK_N nhẹ/nhem/nặng). Umbrella lowers odds (rain ×0.4 → 72–88/200), useless in wind/mist, kiệu ×0.05. Gió lớn: now C-AG kl (fix 1). Env: cành cây (garden), bùn (rain earlier today, wxDayAny), khói bếp (cooking acts), fall → bùn + tóc; storm fear (jemo Sợ), say nắng Sức − (prints BAL). looks-2.js 30/30 checks true. |
| 3 | tea / water / ink minigames on the slap/dodge kit | A("nuoc"/"tea"/"ink") → her throw = slapGame bar (skip = nhẹ); an NPC's throw on her = slapNpcTier (calibrated rank table) + "Né" card (BAL.slap.dodgeOdds, tsOpt) → one level less, nhẹ = miss. Looked at Fold 755x1000 + iPad 1180x820: kit panel "TÀI NGHỆ · Hắt: Hắt trà", rows Vùng đỏ/vàng/Ngoài vùng, no overflow, 0 page errors. |
| 4 | đậu mùa scar via the hủy dung path | ILL.daumua.scar 0; on recovery (j13 illMonthP, the only place the old −8 was applied) lkPoxScar sets p.scar (how "daumua", SCAR70 by st) → heal70 weekly, Ngọc dung cao / Tuyết liên (bought) set cure → no permanent loss; no new system. Avatar: kitScarOf returns the pox-scar picture only when delivered (never the slash art) → KIT_LASTING bakes it then. |
| 5 | no emotion faces | looksEmoFace / ~vui swap gone (grep 0); test emoGone true; KIT request withdrawn (fix 4). |
| 6 | one core, kit, VANPHONG | one-core-guard PASS (inline 3843 = baseline), one-core-text / text-rule / bind PASS, rules-one-source + kit-conform PASS (core gates). Chips "Phấn son lem nhem nặng · Mặt lem mực", "Tóc rối, trâm lệch", "Áo ướt sũng" through KIT_FACEFX chip → pcard; no %, numbers printed from BAL. |
| 7 | layer law | wrap re-sorts every kitFxLayers output (img.kmkl first); scan 36/36 with the ID-card rule (fix 3). |
| — | makeup-lux 7c6ef2fda trial merge | conflicts assemble.py, j92, jbaleff, jdress, jts, index.html, sw.js = EXACTLY the set makeup-lux has against main alone (its own main merge is due); looks-2 adds none. Either order: whoever lands second keeps 'jlooks.js' LAST in the assemble list. |
| — | suites | quickcheck PASS ×2 (337fc519; fc7c649f inside golive: render 145/151 ms, buổi 946/744 ms, old save ok); coop-looks 21/21 ×3; coop-e2e 63/63 ×3 (one run on c975f067 failed with a co-op server WebSocket 502 → rerun 63/63). |

### Notes (not FAIL; for Foreman B / later)
- NPC → NPC throws use `1+(roll(npcUp)?1:0)` (never nặng); NPC → her uses the calibrated slapNpcTier. Existing slap NPC → NPC uses BAL.slap.def, so not a new family break; align when HARM_ACTS.md lands.
- Co-op: a throw by the FRIEND on her gives her no "Né" card (an NPC's throw does). Same on both seats, so parity holds; consider the dodge card for friend throws later (two-way law OD:L1403).
- "ve kêu râm ran" is sun f=0 → no heat look (A/B table lumped it with nắng gắt); follows C-AG's heat flag. Fine unless the owner wants it.
- Minigame panel reuses the slap difficulty word "giáng tay" for throws — wording nit for VANPHONG.
- dev/design/HARM_ACTS.md still to fold in; hair/clothes pictures wait for the body-fit KIT REQUEST; every picture slot empty until Foreman C delivers (correct).
- No shots uploaded (none in img/_review); scratch shots deleted.
