PRIORITY #1 CHECK ('ghenUp|v\.ghen'): OD 0 | ledger 0 | claims 2 | main 15 | review/* 0 · ('jemoact|emoact'): OD 0 | ledger 0 | claims 3 | main 2 | review/* 0 (foreman's line) — reused: review/ag-moodknow-r1 a2a1f6b5 base, main 96e0efae test fix; nothing rebuilt.
# REVIEW mood-mem step 0 (AG-MOODKNOW final) — BIG (opus), delta a2a1f6b5..8e2ac171 (+ a07ffb73 handover doc)
VERDICT: PASS = head of review/mood-mem-r1 (c942d3cc + this report commit; code/site identical to c942d3cc). FAST-FORWARD BLOCKED by landing condition A: origin/main d4a850ce is NOT an ancestor because the
base review/ag-all-2 is not on main yet (it is still moving: 6badc4d4 "AG-ALL-2d4"); a trial merge of main = 30 conflicting files, all ag-all-2-vs-main,
none from this delta → not done here (that is ag-all-2's landing merge). When ag-all-2 lands: merge the new main into review/mood-mem-r1 (delta ≈ 35 files), rebuild site, coop-one-world 7+3, then FF.
Reviewer session_01UV1SzgWE17y4bj2Nh4xG1c. START_CTX ≈ 5 %.

## Fixes made by the reviewer (f7d04350, f5da431b, c942d3cc; this report on top)
1. eaGrpK had no group for the khóc / hờn seals (MOODKNOW keys). Under step 0's "bar line AND matching dominant feeling", a crying her (khóc wins the
   summed seal at heavy sadness) or a crying NPC got NO buồn act / outburst / extreme at any bar — against OD 17/11 ~18:33Z (1) "buồn → khóc".
   Now khoc → buồn group, hon → giận group (they weigh like đau khổ / giận in BAL.mood.emo). +2 lines in moodknow-step0 (19/19).
2. 13 ghenAll calls still used the default why "thấy ngươi nổi bật hơn người" (worker routed 25 of 40): night (j8 nightFx, the most common one),
   visit (jvisit), exam promotions ×3 (jexam), Kinh hồng vũ + pregnancy news (j2), period lie rumour (jcycle "nghe xì xào ngươi có tin vui"),
   jemoact ×5 joy acts. Each now passes its true why (owner s35 Lượt 41: the cause is the real event).
3. VANPHONG.md: one line for "Chạnh lòng" (EMO_GHEN, feeling) vs "Ghen" (score).
4. emotion-acts / -2: out, gen, lock, plock set S.pTr, which the p.net trait pool no longer reads → random temper → random FAIL. Ported main 96e0efae
   (neutral filler in p.net). After: emotion-acts 60/60 cases ok; -2 only hoitimid (same on base a2a1f6b5: "Nhu mì" not a timid word any more).
5. Site build (index.html, sw.js, assets.json).

## Checks
(A) ghenUp: one function (j1) = clamp + Chạnh lòng cause (ghenFeel: true why, aimed at 'by', BAL.mood2.dur.e.ghenUp, strength BAL.mood2.ghen, NPC host-only).
    dev/measure/ghen-raise-scan.py: 0 direct raises, 30 via ghenUp. My own grep (++, +=, x.ghen=…+, ap/twAp/apply objects with ghen, [k] writes, Object.assign,
    co-op paths jcoopask/jcoopworld = per-seat copies, not raises): 0 more raise paths. ghenAll wrappers (jmood, jemoact smug) pass arguments → why kept.
    Lowering = plain writes (14), the feeling ending never writes the score (test). Runtime setter probe in moodknow-step0: 0 direct.
(B) bar = signed sum: mkBarOne = d + BAL.mood.emo[k] × s, her S.mood.v via mkSync, moodBar(p) for anyone; jmood's feeling push off under mk (no double
    count; old 'e:' log pushes skipped in mkMigrate, carry recomputed). Gates: her cards / outburst / extreme (eaMine), timid lock, hot lock, NPC act /
    outburst / extreme (eaBarOk on BAL.ea.npc.bar) all need bar line + matching seal. Pillow-talk odds by band = odds, not an act (unchanged, fine).
    NPC rates, dev/measure/ea-npc-rate.js 8 days × 3 runs, per tuần (all NPCs): base a2a1f6b5 act .62 / out .083 / ext .036 → branch (with fix 1)
    .83 / .112 / .052. Up ≈ ⅓ (fix 1 lets crying / sulking NPCs act at all); one outburst every ~9 tuần across the whole court: no runaway.
(D) EMO_GHEN "Chạnh lòng": one constant (jemo), EMO.ghen + eaMeOut read it; score words "Ghen" untouched (j79 gloss, jk2b chips).
ONE CORE: one-core-guard PASS; no typed numbers (BAL.mood.emo khoc/hon, BAL.mood2.ghen, BAL.ea.npc.bar).
OLD SAVE: quickcheck old save from live loads + plays a buổi. CO-OP: ghenFeel / mck NPC writes host-only; coop-one-world 7 + 3 PASS.
TESTS (c942d3cc build): moodknow-step0 19/19, ag-moodknow 33/33, ag-know 23/23 (base 23/23; an earlier branch run had 1 'spyRoll' FAIL = the known
  base randomness), ag-truth 10/10, emotion-acts all ok, emotion-acts-2 only hoitimid (pre-existing), one-core-guard PASS.
QUICKCHECK --cpu 4 on c942d3cc: open / old save / perf PASS (render 174/158, tab 313/306, buổi 859/847 ms, long tasks 12/12), TIME-SPILL PASS.
  CORE GATES: G1 one-core-bind + "frozen list 3843 → 5093" = identical on the ag-all-2 base (r1 report). G4 coop-one-world seed 3 failed once
  ("merged vs host R.bel 1"); re-runs seed 3: branch 2/6 differ (S.wwin), base a2a1f6b5 2/6 differ (S.wwin) → base flake from ag-all-2, not this delta.
  → for ag-all-2's reviewer / coordinator: coop-one-world seed 3 is ~1-in-3 flaky on the ag-all-2 line (S.wwin / R.bel).
Screens: no UI part changed in this delta (words only); emotion-acts shots at 6 sizes: no page errors; 390x844 'over' on kchip/krl = the .krl label
  collision fixed on main 132e91af (comes with the main merge).

## Clash with kit-figure-mood e684d672 (khóc/hờn seal fallback)
git merge-tree: jemo.js merges clean (EMO_GHEN line + the KIT FALLBACK block both kept); the seal key stays 'ghen' (only the label changed), khoc/hon
fallback pictures unaffected. Other conflicts in that trial = the same ag-all-2-vs-main files. No semantic clash.

## Notes for the next steps (not FAILs of step 0)
- OD 17/11 ~19:25Z (approved model): acts fire at the HEAVY level of the feeling + the bar line. Step 0 gates on the dominant feeling (levels do not
  exist yet). FEELINGS-18 must replace "matching dominant feeling" by "that kind at heavy level" in eaSealG / eaMine / eaNpcWeek (one place each)
  and re-map khoc/hon (khóc becomes an ACT, OD ~19:10Z) — fix 1 is the bridge until then.
- Reviewer branch also needs the main merge for the 390-wide .krl fix and main's test fixes once ag-all-2 is in.
