PASS 9a1133f0bdeb1c649e5fb9d1546d779f59154b80
# review-danh-balance-r1 — independent review of review/danh-balance @319dce59 (reviewer opus, START_CTX ~5 %)
Branch review/danh-balance-r1 = 319dce59 + merge of origin/main 92668096 (ancestor check OK) + one small value-neutral fix. Site rebuilt (assemble.py + build_site.sh).

## 1. Merge
Conflicts: index.html / sw.js / assets.json (generated → rebuilt); j4, j85, jtabs (main reworded "Dâng bản thảo…", "Tự học", "Học với ma ma", "chơi một trò nhỏ").
Resolved = main's wording + the branch's BAL reads (fatherBook in j4; BAL.charity in both charity card copies j85 + jtabs).

## 2. Value-neutral proof (ONE CORE, OD:L1267)
Static: every replaced literal vs its BAL value — all equal.
| place | literal before | BAL | value |
|---|---|---|---|
| j3 Bị bỏ quên | danh<=5 | danhG.forget | 5 |
| j4 sách cha (rule+text) | 40 / "Cần Danh 40" | danhG.fatherBook | 40 |
| j97 thd_tro x (rule+text) | 40 / "Danh từ 40" | danhG.thdBook | 40 (template evaluated at load; jbal2 loads before j97 — OK) |
| j42 servant wedding | 20 | danhG.srvWed | 20 |
| jkc vihanh / kcR5 | 60 / 50 | danhG.kcVihanh / kcR5 | 60 / 50 |
| j99succ b rows | 16, 50, 35, 100 | succN.bAge/bDanh/bTam/bBac | same |
| j99succ c rows | Phi(4), 70, 60, TH 60, 300 | succN.cRank/cDanh/cTam/cTh/cBac | same; RANKS[4].n = "Phi" |
| j99succ succSup | thB 50, thOpp 20 | succN.thB/thOpp | same |
| j99succ NPC claim / rare end | 50, 35 / 80 | succN.npcDanh/npcTam / rareCDanh | same |
| j85 charity act + j85/jtabs card + Đức panel | 1 khắc, 20, 3, 1 | charity.khac/bac/duc/danh | same |
New BAL keys danhG / charity / succN are unique (no collision in jbal*.js).
Runtime probe (built pages bad941b4 = before, 319dce59 = after, r1 = merged), same calls on all three: succNeeds b/c texts at Danh/Tâm cơ/Bạc/rank 49/34/99/Tần, 50/35/100/Phi, 70/60/300/Quý phi, 80/61/301/HQP;
succOdds b/c (incl. son 16 vs 17); succNpcClaims at age 15/16; R97L thd_tro gate at Danh 39/40 + text; Tài nghệ charity button HTML (artTabHTML + ktArtSkills); charity() effect.
Result: all identical (Bạc −20, Đức +3, Danh +1; odds 53/54/72/78 and 5/5/19/24 on all three; only diff = the random starting Thái hậu value in one row, state not rule). 0 page errors.
Same-seed bot re-run: NOT usable as proof — dev/measure/run_par.js is not reproducible: the same build with the same seed (501, 1 page, 2 lives, cap 24) gave different lives twice
(b1 [31,71] vs b2 [98 Thái phi,38]); 6-life cap-144 runs before/after also differ life by life. So neutrality rests on the static table + the probe above (exact).

## 3. Small fix made (value-neutral)
j99succ succOdds still typed the gate values as odds anchors ((danh−50)/2, (tamco−35)/3, (danh−70)/2, (tamco−60)/2) and age 16 twice (succOdds c penalty, succNpcClaims).
Now BAL.succN.bDanh/bTam/cDanh/cTam/bAge. Probe: odds identical before/after/r1.

## 4. Tests
dev/test/succession.js at 755x1000 + 1180x820: PASS. Smoke 755x1000@2 + 1180x820@2 (new game, 6 buổi, Đức panel): 0 page errors, 0 console errors, 0 horizontal overflow.
No UI/kit change in the branch (texts only print BAL constants; identical strings). No BAL value changed (P1–P3 not applied — checked: jbal2 adds only the 3 new keys).

## 5. Method behind P1–P3 (for the coordinator; not blocking)
1. Header of run_par.js says "seeded … (reproducible)" — false (see §2). Seeds are fine as independent samples; "seeds agree" means sample agreement, not replay. Fix the claim or find the unseeded source (timers/Date) before any "same seed before/after" proof is asked again.
2. P1 "restores ≈ +55 Danh a life" is arithmetic (11 uses × 5), not measured. Measured: Danh at tuần 144 71.8 ± 10.2 → 84.3 ± 7.2 (+12.5, CIs overlap), one seed, 48 lives. Danh-row hold 32 → 21 % has no CI. Needs a 2nd seed and the measured net in the owner text.
3. The charity trial bot uses charity when Bạc ≥ cost + 20, so a higher price also cuts uses (18 → 11/life): price and frequency are confounded; fine for a proposal, but say so.
4. Exam pass rate is a per-page counter (no CI, not per life); cause 2 (study cards left Hành sự) is unproven, as the report says — P2 correctly proposes no number.
5. P3 death rate 31 → 48 % (CIs 20–45 vs 34–62 overlap) — right to keep it as a flag only.
6. before/after columns compare act-dedupe (0a311183 → bad941b4), not this branch; correct for the Danh question, just label it so the owner does not read it as an effect of these ONE-CORE edits.
