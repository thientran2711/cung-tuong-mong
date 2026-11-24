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

## REVIEW (reviewer session_01D3E3NaqgB7naRGuobjMu4H, opus, 24/11)
PRIORITY #1 CHECK ('netTh' / 'evG' / relation levels): OD 24/11 ~06:00Z / ~06:35Z / ~06:40Z read verbatim | ledger 0 | claims net-build NYsFNUq9 (SSK) | main ac4790f0: no netTh / BAL.net.th; evG = EVIDENCE count (j8.js:35 `h===S?t.ev:h.evm[key(t)]`) | review/*: deleted friend keys — readers on promo-build-rv, law1-gifts-rv, palace-distance-rv, promo-build-2, robot10-nc-fix-4-rv, kit-promo-hook-rv are byte-identical to main's (no new reader) | none other.

**VERDICT: FAIL** — review/net-build-rv b029879aed464ac180f7a49f1fae0ea22cc3eee6 (= ed1be95a + final merge LIVE ac4790f0 + rebuild + 2 small reviewer fixes + scan tool). Not land-ready; D opens a fixer on review/net-build-rv.

### FAIL list (for the fixer)
1. **evG is EVIDENCE, not owed ân (law 6a, law 1 / her choices).** `evG(h,t)` (j8.js:35) = pieces of chứng cứ h holds on t (S: `t.ev`, NPC: `h.evm`). Step 2 turned 11 evidence gates into the nết «repay / repay2» favour levels: j78.js:137 «Trình Thái hậu», :140 «Trình Hoàng hậu», :142 «Uy hiếp đòi bạc», :145 «Bán cho phe khác», :150 «Trả chứng cứ lấy lòng», :176 mindMenu; j95.js:79, :456; j95b.js:246; jagharm.js:101; jtsb.js:100. j78 builds HER evidence acts with `a.ok(S,p)` (j78.js:183) → a Kiêu ngạo / Xảo quyệt / Thực dụng… player (repay 2) holding 1 real proof can no longer present it, blackmail, sell or return it; an NPC's use of proof now depends on her nết instead of the proof. Fix: put these 11 back to «has proof» gates (the old ≥1 / ≥2, as one BAL key if a count ≠ 1 is wanted); the §3.3 «repay» row must read the real ân / favour store (find it first — PRIORITY #1), or be dropped from this build.
2. **Forgiveness level is one-way (law 1).** SOC.apologise / SOC.mediate (j28.js:58/71) are refused while the wronged one's oán ≥ her «nguoi»; HER «Tạ lỗi» (j9.js:130, talk menu) and the two-way «Tạ lỗi» (jtwoway.js:51, every doer) always succeed. Every apology / mediation road (her, NPC→NPC, NPC→her, jtwoway, jagwhy1 sorry) must use the same nguoi rule with the same «… bị gạt đi» line.
3. **Step 1/2 coverage incomplete (law 4 + law 11 «whole game», OD ~06:00Z (2)).** net-scan.py reads only `aff(..)/oan(..) <op> number`; it misses raw `.rel` reads and BAL level keys. `python3 dev/measure/net-scan-rv.py dev/build` (added on this branch) lists **99** relation gates that do not read netTh:
   - 7 typed numbers left: j15.js:42/44 rvCard «Thù ngươi» `v.rel<-20` / «Thân với ngươi» `v.rel>20` (PLAYER-VISIBLE: the card says «Thân» at 21 while the game's own «than» is 30 ± nết — one place says 20, another 30, the OD:L1267 example); j8.js:369 + j75.js:156 pillow-talk `v.rel<-20`; j8.js:461 gift `v.rel>5`; j8.js:472 ghen fade `v.rel>20`.
   - 69 gates on per-module BAL level keys, each a second copy of a level netTh already holds, e.g. BAL.invite.hate −30 (= th.ghet −30), BAL.cv.tsBorrow.aff 25, BAL.dc.bor.fav 20, BAL.ag.why.dil.coldFriend, BAL.ag.hh.pardonAff, BAL.emo2.hon.aff, BAL.m30.xinhhAff, BAL.shelf.visit.affMin, BAL.route.seen.aff, BAL.cyc.foeHost, BAL.mline.feudHost and aliases (X.minAff, F.clanAff, TK.warn.foe, N.feud, B.feudHost, M.hate …) in jagacts3 7, jagwhy1 5, jemo 4, jshelf 3 and 35 more modules. Classify every row: NPC-holder level → netTh / netThK (delete the BAL copy in place, law 14); her own road, another scale (q72RelV, tdRel, tinh, loyalty) or a printed rule → keep, with the reason in a table. Report «Every friend/thân copy now reads netTh» is not true yet.
   - (23 evidence gates `evG ≥ n` are not relation levels — leave them, see 1.)
4. **Perf not on par (gate 5).** quickcheck PASS but buổi is slower in both of my runs: new/live **1807/1216 ms** and **1887/1464 ms** (+29…49 %; the report's run had 1317/1191). Likely hot path: the affAdd wrapper (jnet.js) now reads aff() twice and netTh() twice on EVERY thiện cảm change (netCross), and every bandVT() call walks traitsOf + netTh + danger again (SOC.warn `liveRivals.some(bandVT)` per call, 50 band sites). Fix: memo netTh(p,key) / band shift per person per turn (clear on nết change / endTurn), netCross only when |Δ| can cross; re-measure until buổi is within the live noise.

### Reviewer fixes on review/net-build-rv (small)
- bandCut (jnet.js): a cut never falls below the band under it. Before: 11 of 512 female combos (Ân cần/Lạnh lùng/Điềm tĩnh + Xảo quyệt + …) had band 3 at 72 while their band 2 began at 75 (a gentle schemer murdered before she plotted). After: band 3 ≥ band 2 cut (Xảo quyệt «strikes hard once moved» kept: band 2 may be zero-width).
- NET_TH_LINE «Cương trực»: «chuyện của y» → «chuyện của nàng» (netCross is consorts only; VANPHONG §2.1: nữ = nàng, y = nam).
- dev/measure/net-scan-rv.py (wider scan, for fix 3).

### Checks
1. Step 0: aff()/oan() clamp on read + netClampAll weekly/on load — correct. My own writer scan: men's afw, S.srv.af, loyalty are written only through clamped helpers or bounded seeds (R(41)−20); no missed writer of rel/rl/oan/ro that the read clamp does not cover. Heat keys in BAL.net.heat ✓. Old save with −135/150/130/−180 loads clean (test) ✓.
2. Step 1: net-scan 24 left = sign tests ✓; but see FAIL 3. The 14 deleted keys: no reader left on newest main merge + 6 open D branches (git grep identical to main's old readers, which this branch replaces) ✓.
3. Step 2: BAL.net.th / thFrom / thClamp / thK / bandHi + T[t].th for all 26 nết ✓ (Mê tín {} by design); one netTh for her / NPCs / servants / men ✓; laws 2/3: every offset row trades a gain for a cost (Kiêu ngạo acts sooner but befriends later and forgives less; Rộng lượng forgives but…); no nết strictly better ✓. News lines via newsAdd (law 9) ✓, cổ trang, no number / % (law 7) ✓ after the pronoun fix. Law 1 ✗ (FAIL 2), law 6a ✗ (FAIL 1).
4. Robot (this branch before my fixes, same runner, CPU shared by 5 runs): sens 101 weeks / 3 runs: NPC→her danger p50 **35**, ≥60 **10 %**, proud ÷ gentle harm **×2.97**, harm max ÷ min ×14.9; npcAct band at call {0:41, 1:74, 2:14, 3:21}. rand 36 weeks / 2 runs: danger p50 20, ≥60 11 %, proud ÷ gentle ×2.41. Report's direction reproduced (×2.6 / p50 37). Band-3 target ≤ 30 % (NPC→NPC oán saturation) stays a FOLLOW-UP, not a fail.
5. Gates: net-build 170/170 ✓ · npcmind-check ERRS [] ✓ · one-core-guard PASS (3112 < 3592) · one-core-text PASS · one-core-bind PASS (1590 / 0) ✓ · two-way-oldsave ok, errs [] ✓ · coop-e2e: 1st run 138/142 («same world» S.fidUsed maid face ids A=undefined / B=maid:mXX, weeks 1–3 + rejoin), re-run **142/142**; LIVE ac4790f0 142/142 → one flake in 2 runs, watch it on the fixer's run · quickcheck PASS ×2 (core gates PASS, old save ok) but perf ✗ (FAIL 4).

## FIX r1 (fixer session_01D3E3NXVfZy3ocFNYujBsPy, opus, 24/11)
PRIORITY #1 CHECK ('evG netTh'): OD 24/11 ~06:00Z / ~06:35Z / ~06:40Z read verbatim | ledger 0 | claims net-build NYsFNUq9 (archived) + rv NaqgB7na (FAIL) | main 178cac37: jnet.js BAL.net.T, BAL.mem.fadeT, no netTh | review/*: net-build ed1be95a, net-build-rv b029879a (start), servant-trust 42db050c (stacked; merged in a scratch tree, not pushed) | real ân store found and reused: the j72 nợ ân book (q72Debt / jrtrig rtDebt).

**Branch review/net-build-rv, final sha e41f4f7933458870fbc689c7128730938cc1e644** (c1266dec fixes · 7c580d3e merge LIVE origin/main 178cac37 + site rebuilt · 228531af npc-purpose row follows the j83 line · e41f4f79 BAL.eff.jemo.wk.upRival deleted + site rebuilt).

### Fix 1 — evG is EVIDENCE (law 6a, her choices)
| gate | b029879a | 228531af |
|---|---|---|
| j78 Trình Thái hậu / Uy hiếp / Bán phe / Trả chứng cứ / mindMenu (j78:137/142/145/150/176) | evG ≥ netTh(a,"repay") (1–3 by nết) | evG ≥ 1 (holds proof) |
| j78 Trình Hoàng hậu, j95:79 nắm thóp, j95:456 tố giác | evG ≥ netTh(·,"repay2") | evG ≥ BAL.evFirm (2, new key next to accNeedEv) |
| j95b:246, jagharm:101, jtsb:100 | evG ≥ netTh(·,"repay") | evG ≥ 1 |
| scan `evG(..)>=netTh` in dev/build | 11 | **0** (net-build test checks it) |
- «repay» now reads the REAL ân store: jrtrig rtWhyAll «… muốn trả ân cho ngươi» fires only when the j72 nợ ân debt d ≥ netTh(v,"repay") (Thù dai / Trọng nghĩa at 1, Kiêu ngạo / Thực dụng … later). «repay2» deleted (no reader).
- Test: a player with the slowest «repay» nết (Kiêu ngạo + …, repay 3) holding 1 proof: Trình Thái hậu / Uy hiếp / Bán phe / Trả chứng cứ all open; Trình Hoàng hậu shut at 1, open at BAL.evFirm; no proof → shut.

### Fix 2 — one forgiveness rule, both ways (law 1)
ONE function `netForgive(t,a)` (jnet.js) = oán(t→a) < netTh(t,"nguoi"); one refusal line `netRefused` («…, nhưng bị gạt đi» / to her «…, nhưng ngươi vẫn chưa nguôi giận»). Told after, in words; no pre-warning (the hint only says «thành: oán −N», the shape every odds hint uses).
| road | before | after |
|---|---|---|
| her «Tạ lỗi» (j9:130 → jtwoway TW apol) | always accepted | netForgive(v,S) |
| her «Nhún nhường» (j9:131) | always | netForgive(v,S) |
| TW apol, any doer incl. NPC→her (jtwoway:51) | always | netForgive(t,a) — her own nết decides when she is the wronged one |
| SOC.apologise / SOC.mediate (j28) | inline nguoi check | netForgive (same function) |
| NPC cx:humble (jagacts:63) | always | netForgive(t,v) (cost still paid) |
| her «Tạ lỗi, đền bạc» (jemoact:429) | always | netForgive; refused → the silver still pleases her (thiện cảm +), oán stays |
| jrcv RCVK.mediate, NPC receiver | free pick | yes answers removed while oán ≥ her «nguoi»; her own answer stays her choice; co-op friend untouched |
| j24 apSorry / jtsb «Nhận lời xin lỗi» | her choice (2 buttons) | unchanged — her choice IS the two-way side |

### Fix 3 — every relation level on netTh (laws 4, 11, 14)
Scan = `python3 dev/measure/net-scan-rv.py dev/build`, widened for the whole family: + rel() calls, + levels tested through a local copy (const h=hostility(..) … h>=X), + raw (x.oan||0)>=X; a KEEP table in the script holds the 8 rows that are not levels (running max, two-person compare, a change of thiện cảm, a bar the caller passes as netTh).
| scan row kind | b029879a | 228531af |
|---|---|---|
| typed number | 14 | **0** |
| BAL / alias copy of a level | 75 | **0** |
| via a local copy | 15 | **0** |
| raw (x.oan||0) | 3 | **0** |
| total relation gates off netTh | **107** (reviewer's narrower scan: 99) | **0** |
| evidence gates evG ≥ n (not levels, fix 1) | 23 | 34 (= 23 + the 11 restored) |
- Player-visible: rvCard «Thù ngươi» / «Thân với ngươi» now read the holder's own ghet / than (was −20 / 20); printed «nàng thân với ngươi (x/N)» (jmkt, jts) and «cần Hoàng hậu thiện cảm N+» (j30) print netTh; «Cần một phi tần quý ngươi từ 30» (j10) and «(thiện cảm 40)» (j83) → words without a per-nết number.
- Mapping used: 5–15 → quen · 20–40 → than · 45–60 (life bond, patron, keeps her secret) → than2 · −10…−20 → ky · −30 → ghet · oán 12–20 → oan · 25–30 → act · 40–60 → thu · hostility 20–25 → host×hostLo · 30 → host×hostMid (new thK .67) · 35–50 → host · 60 → host×hostHi.
- BAL copies DELETED in place (law 14; every reader moved, grep shows no code reader left): facJoinAff, ag.par3.fac.{frAff,clanAff,sharedOan,drop.aff}, invite.hate, ag.why.dil.{coldFriend,allyAff}, m30.xinhhAff, mline.feudHost, j72c.need.feud, ag.why.g2wk.relMe, talk.warn.foe, ag.cx.humble.oan, ag.hh.{pardonAff,cutRelMax}, ag.cx2.help.aff + bacFee.lendAff, ag.par3.invite.minAff, ag.par4.kidGuard.host, ag.why.ap.{fr,ally,gift,sorry}, ag.why.fav.{aff,host}, ag.why.job.aff, ag.why.srvWk.host, ag.why.wd.{host,fr,spyHost}, ag.why.bul.host, ag.why.j22.host, ag.why.lie (whole), ag.why.g2rcp.accHost, ag.why.fxSrv.hot, ag.why.cmood.oan, cyc.foeHost, dc.bor.fav, eff.jemo.wk.{kidAff,nightAff,upRival}, eff.jemo.brake.grudge, eff.jemo.mot.aff, ge.bond.sis, preT.mot.{aff,hate,oan}, toil.taste.scout.ask.need, mood.foe.oan, mood.comfort.aff, emo2.hon.aff, nroad.askRel, pm.npc.minAff, pm.eye.likeMin, route.seen.aff, ngh.frameAff, shelf.visit.affMin, shelf.acc.hostMin, stip.oan, thy.bribeHost, cv.tsBorrow.aff, ag.cx.ally.rel, pet.{helpFr,helpMind}, patronRel, favorRel, ty.plotRel, rcp.giftRel, lux.xx.hostMin, arc.trig.gr, WD.frameHost (j92), entry.phuc.foul.oan, kc3 nm.do.oanMin, world2 day.coldOan (≈80 keys).
- Kept on purpose (not thiện cảm / oán / hostility levels): ghen cuts (g ≥ 70 …), q72RelV / tdRel / loyalty / tình scales, jkrel number colours (>10 green / <−10 red, the colour of a printed number, not a person's level).

### Fix 4 — perf
- netTh and the band cuts depend only on the holder's 3 nết → kept per person in a WeakMap keyed on the p.net array (p.net is only ever replaced, never edited: scan `.net[i]=` / `.net.push(` = 0), so a redraw / migration / a new S.net recomputes. netCross exits before any work unless the change reaches or leaves a level. bandVT not memoised on danger (ghen is written raw in many places; a stale band would change behaviour) — measured cost 7 ms per 6 buổi, not the hot spot.
- Probe (CPU ×4, 6 buổi, wrapped calls): traitsOf 41 ms, danger 35, hostility 15, netTh 11, aff 10, bandVT 7, netCross 3 — the net-build functions are a few % of a buổi; the reviewer's +29…49 % was mostly run noise (my own 3-run A/B before the memo: CPU new/live 4934/4174 ms, wall 19771/19467 ms, spread 3180–6780).
- **quickcheck e41f4f79 (final): QUICKCHECK PASS · core gates PASS · old save ok · perf new/live render 249/266 ms, tab 471/457 ms, buổi 1477/4331 ms (live run noisy), tasks>200ms 24/25.** quickcheck 228531af: PASS, buổi 1438/1406 ms, render 228/237, tab 441/450. (Run on 7c580d3e: buổi 1243/1777; failed only G4 npc-purpose-scan → the row text for the j83 line updated in 228531af.)
- Robot direction reproduced (new build, CPU shared): sens 91 weeks / 3 runs: NPC→her danger p50 42, proud ÷ gentle harm **×3.02**, max ÷ min ×22; rand 2 runs: proud ÷ gentle **×2.40**, max ÷ min ×16 (report ×2.6 / rv ×2.97 / rv rand ×2.41).

### Gates
- `node dev/test/net-build.js` **189/189 PASS** (new: (8) fix 1 acts, (9) fix 2 every road, (10) net-scan-rv = 0 + no evG gate on a nết level, (11) memo = computed levels / band cuts).
- npcmind-check (main 178cac37 save → new): ERRS [] · two-way-oldsave: ok, errs [] · one-core-guard PASS (inline 3108 < 3592) · one-core-text PASS · one-core-bind PASS (1587 prints, 0 mismatches) · npc-purpose-scan PASS (419 rows).
- servant-trust: review/servant-trust 42db050c merged into a scratch tree on top of c1266dec (assemble list: jsvt.js kept after jagwhy1.js, main's new modules kept): **servant-trust.js 48/48 PASS**, net-build 189/189, net-scan-rv 0 — svTouch unbroken. Not pushed.
- **coop-e2e: NOT green, and not from this branch.** New build 131/154 (23 FAIL); LIVE origin/main 178cac37 run the same way: 25 FAIL of the SAME family («#next enabled» at buổi 0:0 with Q 7–8 opening cards, then «week 1/3 advanced», «same world»), its run then crashed at the end (scratch tree is not git). The count of checks changed (142 → 154/162) since ac4790f0 → main's test or the LIVE Worker moved. D / MAIN: please check coop on main itself.

### Handover
Done; only review remains. Worktrees: /home/user/wt/nbfix (review/net-build-rv), /home/user/wt/nbst (scratch merge, delete), /home/user/wt/nbho (this report) — removed after push.
