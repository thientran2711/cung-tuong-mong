# NET-BUILD — nết thresholds built (Foreman D, worker session_01D3E3NYsFNUq9PXUiPGzBEH, 24/11)

PRIORITY #1 CHECK ('net.T' / 'netTh' / 'friend' levels): OD rows 24/11 ~06:00Z / ~06:35Z / ~06:40Z (verbatim, OD L2307/L2316/L2317) | ledger 0 | claims: net-thresholds report NZ3P5j3c DONE (design reused whole: reports/net-thresholds.md + its tools) | main 056c2402: jnet.js, BAL.net.T (jbal2.js:921), BAL.mem.fadeT, BANDS j24.js:3, BAL.quyLv/oanLv, ETRAITS — no netTh / BAL.net.th existed | review/*: none for thresholds; review/promo-build 7c4116de has NO BAL.promo.favK yet (favour stays with that worker, not defined here).
Order: FOREMAN_D_STATUS «FROM MAIN 119 (24/11 07:40Z)» → BUILD (brief dev/handover/briefs/D-net-build.md).

Branch **review/net-build** (from origin/main 056c2402). Commits: c2476873 (build), 948d1fcc (site rebuilt), c5b2abed (npcTell fix + test + rebuilt), ed1be95a (nt-norm.js). **Final sha ed1be95a64ed73a5d40dc9e15b30e9137fff0b92.**

---------------------------------------------------------------------------------------------------
## 1. What was built
**STEP 0 — heat and range (the saturation the report found)**
- Range bug (thiện cảm read −101…−135): 55 modules write `.rel / .rl / .oan / .ro` straight, past affAdd's clamp. Fix for the whole family (law 11): `aff()` / `oan()` (j9.js) clamp on read to BAL.linkRange; `netClampAll()` (jnet.js) puts every stored rel/rl/oán/ro/ghen of consorts, her (S.rl/S.ro), men and servants back in range every week (endTurn) and on load (deser) → old saves with out-of-range values load clean (test).
- Heat: robot showed NPC→her danger driven by ghen (ghen p50 99 for a favoured girl → danger 114 for EVERY consort). `danger()` (j28.js, in place) now counts oán whole, ghen × `BAL.net.heat.ghenK` .45 and dislike (−thiện cảm) × `BAL.net.heat.affK` .6 (hostility already halved both).
**STEP 1 — ONE BAL constant per relation level (law 4)**
- `BAL.net.th` (jbal2.js end): quen 10 · than 30 · than2 50 · ky −10 · ghet −30 · oan 15 · act 30 · thu 45 · host 45 · tell 40 · nguoi 30 · repay 1 · repay2 2; `thFrom` (than2←than, ky←ghet×.5, oan←act×.5, thu/host←act, repay2←repay), `thClamp`, `thK` (provoke .34 / humiliate .6 / feign .67 / hostLo .5 / hostHi 1.33 of act/host), `bandHi` .5.
- Typed relation gates (scan `python3 dev/measure/net-scan.py`): **101 → 24**, the 24 left are sign tests (`aff ≥ 0`, `oan > 0`), not levels. Every "friend/thân" copy (20 / 25 / 30 / 35 / 40 / 50 / 60) now reads `netTh(holder,"than"|"than2")`.
- BAL keys that were a second copy of a level, deleted in place (law 14) and their readers moved to netTh: `BAL.ag.goal.friend` 30, `BAL.ag.know.friend` 30 / `.close` 70, `BAL.ag.why.tell` {host 40, friend 30}, `BAL.ag.par3.cold.friend` 40, `BAL.steal.friend` 60, `BAL.st14.hate.friend` 20, `BAL.mood.fr.aff` 30, `BAL.hook.czClose` 20, `BAL.j68c.need.friend/feud` 10/−10, `BAL.eff.jemo.wk.friend/foeOan/foeAff/upFriend/downOan/downAff` 30/30/−20/40/25/−25.
- Not converted (on purpose): `BAL.facJoinAff` (printed to her in the «lập phe» rule line, her own road); `BAL.j72c.need.friend/feud` (q72RelV scale, not thiện cảm); her own ân gates `evG(S,·)≥1` (sign test; her choices are never blocked).
**STEP 2 — per-nết levels, same rule for everyone (law 1)**
- `BAL.net.T[t].th` = the §3.3 offsets for all 24 + 2 nết (Mê tín none, by design). `netTh(p,key)` (jnet.js) = base + Σ over p's 3 nết, clamped; her = S.net (same function); Emperor / Thái hậu → base.
- Harm bands per holder: `bandVT(v,t)` / `bandCut(v,d)` — band 1 = BANDS[1][0] + act shift, bands 2/3 + half of it (`bandHi`), `T[t].th.act3` for Xảo quyệt (waits, then strikes hard). All 50 `bandOf(danger(..))` sites moved (43 by script + 7 by hand).
- Ân repay: 11 NPC `evG(x,y)≥1/2` gates → `netTh(x,"repay"/"repay2")` (Kiêu ngạo / Xảo quyệt / Thực dụng… need one more favour; Thù dai / Trọng nghĩa repay at once).
**Reactions (§3.4, kit news lines only — no new UI, KIT FIRST)**
- Apology (SOC.apologise) and mediation are accepted only while the wronged one's oán < her «nguoi» level, else «…sang xin lỗi …, nhưng bị gạt đi» / «… không chịu bỏ qua».
- Gossip needs hostility ≥ the gossip's «tell» level toward the one talked about (Nhiều chuyện 20, Kín đáo 65).
- Crossing a level: thiện cảm toward her rising past the holder's own «than» → one line in her nết's voice (newsAdd, told to her: «Thẩm thị vốn ít khi mở lòng, nay lại coi ngươi là chỗ thân tình» / Kiêu ngạo / Ân cần / Kín đáo / Nóng nảy / Cương trực / Xu nịnh / default); thiện cảm toward anyone falling under «ghet» → «… từ nay ghét … ra mặt» by the witness rule. Once per crossing (S.netX). jemo friend/foe events (die / rise / fall) read than / ghet / oan / act of the one who feels.
- Player-visible: words only, cổ trang, no number, no % (law 7).

## 2. Robot BEFORE (main 056c2402) vs AFTER (this branch) — sens bot, same runner
Tools: dev/measure/nt-in.js + nt-run.js (`node nt-run.js out.json <capSec> sens|rand`, NT_GAME=<html>) + nt-sum.js + nt-norm.js (new: per-nết rates per 100 holder-weeks). The bot hangs inside a step about once per life ON BOTH BUILDS (main too: rand run on main hung at week 7) → runner now has a 120 s step guard / 60 s read guard and many short runs are merged.
Sens: BEFORE 316 weeks (7 runs), AFTER 273 weeks (5 runs).
| measure | BEFORE | AFTER | target |
|---|---|---|---|
| NPC→her danger p50 / p90 | 95 / 115 | **37 / 55** | p50 35–50 |
| NPC→her danger ≥60 (band 2+) share | 82 % | **6 %** | few deep enemies |
| NPC→her thiện cảm p10 / p50 | −101 / −52 | −74 / −2 | in range |
| npcAct band 3 share of calls | 69 % | **43 %** (rand 55 → 31 %) | ≤ 30 % (sens not reached, §4) |
| harm band 3 per 100 holder-weeks (all nết) | 14.9 | 5.6 | — |
| harm proud (Kiêu ngạo/Nóng nảy/Thù dai) ÷ gentle (Ân cần/Khiêm nhường/Rộng lượng) | ×1.32 | **×2.60** | ≥ ×2 |
| harm max ÷ min over nết | ×1.76 | **×8.1** | spread |
| kind acts (help+warn+visit+mediate) warm nết per 100 hw | 8.0 | 9.2 | ≥ 2 |
| help per 100 hw (all) | 0.5 | 2.1 | up |
Per nết (per 100 holder-weeks, BEFORE → AFTER):
| nết | provoke | help | warn | mediate | apologise | gossip | harm any | harm band 3 |
|---|---|---|---|---|---|---|---|---|
| An phận | 3.6 → 4.8 | 0.4 → 1.3 | 0.5 → 0.3 | 3.5 → 1.3 | 2.1 → 1.3 | 3.6 → 3.8 | 20.3 → 13.1 | 13.5 → 4.1 |
| Ham học | 6.3 → 4.3 | 0.5 → 3.8 | 1.4 → 0.8 | 5.0 → 2.6 | 1.8 → 2.3 | 0.9 → 1.3 | 26.7 → 11.7 | 19.5 → 4.8 |
| Ham lợi | 2.9 → 3.9 | 0.4 → 1.2 | 0.2 → 0.4 | 5.3 → 1.8 | 2.8 → 1.4 | 2.8 → 6.4 | 18.6 → 14.8 | 14.3 → 7.8 |
| Ham vui | 6.6 → 4.1 | 0.5 → 1.9 | 0.8 → 1.6 | 2.5 → 1.9 | 1.9 → 1.6 | 4.7 → 4.1 | 19.0 → 13.1 | 12.9 → 8.8 |
| Khiêm nhường | 1.0 → 0.6 | 0.5 → 0.6 | 0.8 → 0.0 | 3.8 → 3.8 | 2.8 → 1.9 | 5.5 → 2.5 | 19.5 → 9.6 | 12.3 → 0.0 |
| Kiêu ngạo | 6.1 → 7.7 | 0.0 → 0.9 | 0.0 → 0.3 | 1.0 → 0.6 | 0.2 → 0.6 | 2.8 → 3.7 | 22.2 → 14.8 | 18.5 → 9.8 |
| Kín đáo | 4.2 → 4.2 | 0.0 → 0.6 | 0.0 → 1.0 | 4.0 → 1.0 | 2.2 → 1.9 | 1.6 → 1.3 | 16.3 → 18.7 | 11.6 → 10.0 |
| Lạnh lùng | 5.8 → 4.7 | 0.2 → 0.5 | 0.0 → 0.0 | 2.6 → 1.6 | 1.3 → 1.1 | 1.6 → 1.4 | 23.2 → 13.2 | 17.1 → 3.8 |
| Mê tín | 5.8 → 4.1 | 0.6 → 2.1 | 0.8 → 0.0 | 5.0 → 3.3 | 2.5 → 2.1 | 3.1 → 0.8 | 17.2 → 10.3 | 12.4 → 1.2 |
| Nhiều chuyện | 2.4 → 2.5 | 0.9 → 1.1 | 0.3 → 0.3 | 3.1 → 1.4 | 1.2 → 2.0 | 10.3 → 10.7 | 22.0 → 12.4 | 16.1 → 6.5 |
| Nóng nảy | 9.4 → 8.3 | 0.3 → 1.5 | 0.2 → 0.7 | 1.6 → 0.3 | 1.0 → 1.5 | 3.6 → 3.6 | 26.5 → 16.7 | 20.3 → 11.4 |
| Rộng lượng | 1.9 → 2.0 | 1.1 → 4.1 | 0.4 → 1.0 | 5.1 → 0.8 | 2.1 → 2.9 | 4.6 → 4.0 | 19.4 → 5.5 | 14.2 → 2.3 |
| Tham vọng | 3.0 → 1.6 | 0.0 → 1.4 | 0.0 → 0.8 | 3.3 → 0.4 | 1.0 → 3.7 | 4.3 → 4.5 | 26.3 → 9.2 | 20.5 → 4.5 |
| Thanh liêm | 1.6 → 5.6 | 0.2 → 0.0 | 0.2 → 0.9 | 4.8 → 1.7 | 3.0 → 0.0 | 6.7 → 0.9 | 21.3 → 14.2 | 13.5 → 6.4 |
| Thù dai | 4.7 → 5.5 | 0.2 → 0.4 | 0.0 → 0.2 | 2.8 → 3.4 | 1.3 → 1.5 | 3.1 → 2.5 | 22.8 → 13.8 | 17.3 → 7.2 |
| Thật thà | 5.3 → 2.6 | 0.3 → 0.0 | 0.8 → 0.0 | 2.3 → 4.3 | 2.3 → 0.0 | 5.8 → 2.6 | 17.5 → 12.0 | 10.5 → 0.9 |
| Thực dụng | 5.3 → 0.6 | 0.5 → 2.5 | 0.9 → 0.3 | 3.0 → 1.3 | 1.4 → 3.8 | 3.4 → 2.5 | 19.5 → 7.3 | 14.5 → 1.6 |
| Thực tế | 5.1 → 0.0 | 0.7 → 0.0 | 0.4 → 0.0 | 4.7 → 4.1 | 1.1 → 0.0 | 2.5 → 3.4 | 15.3 → 9.6 | 11.3 → 0.7 |
| Trọng nghĩa | 4.8 → 5.2 | 0.4 → 2.2 | 1.3 → 1.8 | 5.2 → 1.2 | 1.3 → 2.7 | 2.2 → 4.2 | 18.3 → 13.0 | 14.8 → 10.0 |
| Vì gia tộc | 3.1 → 2.5 | 0.5 → 3.4 | 0.0 → 1.6 | 2.9 → 0.7 | 0.8 → 2.5 | 4.6 → 3.6 | 21.2 → 9.7 | 15.1 → 6.1 |
| Vì mình | 2.8 → 4.9 | 0.6 → 1.5 | 0.3 → 0.4 | 3.5 → 1.5 | 2.1 → 2.1 | 5.9 → 5.5 | 20.9 → 11.2 | 16.3 → 7.3 |
| Xảo quyệt | 6.3 → 1.8 | 0.4 → 1.8 | 0.0 → 0.0 | 0.8 → 0.9 | 0.2 → 1.8 | 5.0 → 3.6 | 26.9 → 14.5 | 19.4 → 1.8 |
| Ân cần | 1.1 → 0.6 | 0.9 → 4.8 | 1.3 → 1.5 | 8.5 → 2.5 | 3.6 → 4.0 | 2.6 → 3.6 | 15.4 → 2.3 | 9.6 → 1.0 |
| Điềm tĩnh | 1.7 → 0.6 | 0.8 → 1.4 | 1.1 → 1.1 | 5.4 → 2.5 | 2.5 → 1.4 | 3.0 → 3.1 | 17.6 → 10.6 | 11.8 → 3.3 |
| ALL | 4.0 → 3.6 | 0.5 → 2.1 | 0.4 → 0.8 | 3.6 → 1.7 | 1.8 → 2.1 | 4.2 → 3.8 | 20.6 → 11.1 | 14.9 → 5.6 |
Random policy (rand): BEFORE 189 weeks (5 runs) / AFTER 150 weeks (6 runs). NPC→her danger p50 29 → 29, ≥60 31 % → 20 %; npcAct band-3 share 55 % → **31 %**; harm band 3 per 100 hw 9.0 → 4.8; proud ÷ gentle harm ×1.26 → **×2.89**; harm max ÷ min over nết ×3.3 → ×25; kind acts warm nết 5.0 → 11.5, cold (Lạnh lùng/Kiêu ngạo) 1.4 → 0.3 per 100 hw. (The 77 BEFORE «lives ended» are bot TIMEOUTs — one main run stuck on one modal at year 0 — not deaths; AFTER 0 TIMEOUT.)

## 3. Tests (all on this branch)
- `node dev/test/net-build.js` **170/170 PASS**: 26 nết rows + known keys; 4 worked examples (Kiêu ngạo+Thù dai+Tham vọng → than 55 / act 10; Ân cần+Rộng lượng+An phận → than 17 / act 60 / nguoi 60; Lạnh lùng+Thù dai+Thực tế → than 52; Ân cần+Thật thà+Ham vui → than 15); all 512 female combos inside clamps; her = an NPC with the same nết; Emperor = base; range read clamp + old save carrying −135/150/130/−180 loads clean + weekly sweep; ghen 99 alone < band 3, oán 90 reaches the top; same danger 35 → proud band 1, gentle band 0; npcTell + 8 weeks played with no console error; static scan: no typed relation gate left.
- `npcmind-check` (old main save → new build): people 53, miss [], stable, ERRS [].
- one-core ×3: one-core-guard PASS (inline 3112 < baseline 3592), one-core-text PASS, one-core-bind PASS (1590 prints, 0 mismatches).
- coop-e2e: first run 139/142 — caught a real bug (npcTell read the deleted `BAL.ag.why.tell`) → fixed c5b2abed; re-run **142/142 passed**.
- two-way-oldsave (main save, NPC deeds on the new build): ok, errs [].
- quickcheck (HEAD c5b2abed build; ed1be95a adds only dev/measure/nt-norm.js): **QUICKCHECK PASS** · core gates PASS · old save ok · perf new/live: render 255/261 ms, tab 438/455 ms, buổi 1317/1191 ms, tasks>200ms 24/24. (An earlier run under 3 parallel robots failed G4 dialog-fixed on widths 538/560; dialog-fixed alone passes on this build and on main → load flake.)

## 4. Not done / limits (honest)
- npcAct band-3 share 43 % (target ≤ 30 %): NPC→NPC danger is driven by oán that itself saturates (NPC→NPC oán p90 98, unchanged by this job); per-holder-week band-3 harm fell 14.9 → 5.6. Next lever if MAIN wants it: per-nết oán fade / oán heat — not done here (numbers on small data; one policy).
- §3.4 row 2 (mindTell sign earlier for open nết, later for hidden ones) and the likes/dislikes gap (servants/men/her, OD ~06:35Z (1)) are not in this build.
- FAVOUR (BAL.promo.favK) is owned by promo-build (session_01D3E3NZySUEoGSM1U1L4WvJ); its branch has no favK yet — nothing defined here, no shape change needed.
- The 07:58Z MAIN 119 order (servant trust when another master talks to her people) is NOT in my brief → not built; D to brief it (it can reuse netTh "tell" / "than" + BAL.net.th).
- Robot: data volume is modest (273–316 sens weeks) because the bot hangs once per life on both builds.

## 5. Laws check
1 two-way: one netTh for every holder (consorts, servants, men, her S.net); Emperor/Thái hậu base. 2/3: each offset row keeps the gain/cost of its nết (BAL.net.T gain/cost words); apology refusal / acceptance both ways. 4: all levels in BAL.net.th / T[t].th / thK / heat; 101 → 24 typed gates (sign tests); 14 duplicate BAL level keys deleted. 6: people act by their own nết; news only by real witnesses (newsAdd). 7: words only, no numbers. 9: no UI added; lines use the existing news feed. 11: scan script + before/after (101 → 24; 50 band sites; 55 raw writers covered by read clamp + sweep). 14: every level replaced in place, old keys deleted. 18: owner order, not a new feature.

## Handover
Job complete; only review remains. Worktrees /home/user/wt/netb (review/net-build) and /home/user/wt/netb-ho removed after push. Re-run robot: `NT_GAME=<html> node dev/measure/nt-run.js out.json 600 sens|rand`, then `node dev/measure/nt-sum.js out*.json` and `node dev/measure/nt-norm.js out*.json`.
