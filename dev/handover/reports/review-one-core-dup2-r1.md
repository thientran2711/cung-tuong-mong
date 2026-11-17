# review-one-core-dup2-r1 — independent opus reviewer (BIG tier), session_01N1tNP2aBFygh2hzMbxRRU3, coordinator Foreman B ROOT

PRIORITY #1 CHECK ('one-core|BAL.cut|quyLv|sungLv|ducLv|loy'): OD 6 + OD:L247, L221 | ledger 0 | claims B one-core-dup2 session_01N1tNP5YW8yGvX2ZkQozRyk | main 15 | review/* one-core-dup(-r1, -r2 landed f97a5841), one-core-roads 75bc9f05, one-core-arcs c682afe6
START_CTX ≈ 5 % of window (own estimate); at verdict ≈ 15 %.
Reviewed review/one-core-dup2 @ 0ffa37bf. Work branch review/one-core-dup2-r1 @ 8e75df35 = 0ffa37bf + merge review/one-core-dup-r2 f97a5841 (r2 HAD landed: merged, gates re-run). Descends from origin/main 6c4f21c3 (current main).

## VERDICT: FAIL — one item (texts still type the numbers that now live in the new keys). Everything else PASS.

## 1. Cuts value-identical except the two owner-ruled word changes — PASS
- one-core-dup2-same c0ba82de origin/review/one-core-dup-r1 (run myself on 0ffa37bf): 66 modules, 237 refs put back, AST identical except INTENDED affW / tsQuy / window.quyW / ccWord (+ dead j21 oanW). Re-run on 8e75df35 with REF2 = r2: 72 modules, 237 refs, PASS. (Report says 241 refs: the 4 jroute rtHeatW refs went back to one-core-arcs at c66ef16a — fine.)
- BAL files: only additions (quyLv, loy, wit, ducLv, sungLv, tinhLv, tinLv, rareLv, sucLv, oanFade, tsDanger, age.adult, srvAge.old, pet.life.careLow, cut.*); no existing key changed; BAL.cut / BAL.age.adult do not overwrite an existing key.
- Hand spot-check, 24 random cuts (old literal vs BAL value): jts tsNpcDanger 35=tsDanger.act · jk2b + j69 rarity 6/9=rareLv · j82 + j8 ×2 loyal≥60=loy.close · jaudit + jeitem + j24 + j8 ≥70=loy.trust · j55 tdRelW ±25=cut.clanRel · j40 tc<30=wit.lo · j72 <40=loy.low, <45=loy.warn · j92 ≥40=loy.low · jk3 colour 60/45=loy.close/warn · j85 wkQ 25/45/65/85 · jsgame sgStep 7/3 · jkc sung 60/30=sungLv.kc · jpet 70/30=careOk/careLow · jage 18=age.adult · j21 feel + jk2b att ±10=quyLv[2]/[1] · jreign 60/35/15=cut.rgTrust: 24/24 equal.
- Owner-ruled words, checked in the browser (Fold + iPad, affW / quyW / tsQuy at −70,−60,−31,−30,−29,−11,−10,10,11,29,30,59,60,90): all three give the VANPHONG:69 / OD:L247 ladder exactly (Ghét ≤ −30 · Không ưa −29…−11 · Bình thường −10…10 · Có cảm tình 11…29 · Quý mến 30…59 · Thân thiết ≥ 60). Changed vs live: affW ≤ −60 Thù→Ghét, −29…−11 Lạnh nhạt→Không ưa, 30…59 Thân→Quý mến (Lạnh nhạt / Thân are banned words in VANPHONG:69). No other word moved.
- ccWord → chanceLo (j1 chanceLvl 8/18/35/60, Rất thấp…Rất cao) per OD:L221 + VANPHONG:65; ccRisk is clamped 3…45, so "rất cao" is never shown (fine).
- Disagreements (two live copies): chosen = live in every case, listed in the worker report §6b (Sủng 5 sets, Đức word vs Thang Đức page, Thái hậu double drift, Tâm cơ spot 15 vs 12, Lòng word/colour/rule tiers, Sức 2 ladders, art age bands → Foreman C). Only rulings applied: OD:L247 and OD:L221. Correct.

## 2. Guard — PASS
- one-core-guard 0 fails on 0ffa37bf (11826) and on 8e75df35 (--update shrink only → 11790 after r2).
- --allow-grow at c66ef16a is ONLY the new single-argument detection: running the old and the new amt regex over the same tree, new − old per file = exactly the count of single-argument calls: j67 39, j97 10, jrd_dtq 109, jrd_tt 68, jrd_nc 32, jrd_muoi 9, jrd_td 2 (roads 220 + arcs 49 = 269), 0 files where the difference is anything else. Baseline diff d0e7994d→c66ef16a = those 269 amt + 1 ladder in jroute (rtHeatW put back to main's own typed line, byte-identical to origin/main; not a new number). Nothing lost.
- Texts print constants: r2's new dev/test/one-core-text.js passes (0 sites) but it only knows BAL.eff / BAL.road / BAL.arc — see FAIL item.

## 3. Tests — PASS
- quickcheck on 0ffa37bf: run 1 FAIL perf (longTaskMaxMs 33 s in all 3 new runs, box 10 min after boot); run 2 PASS (render 242/234, tab 347/324, buổi 1008/858 ms); review/one-core-dup-r1 3d43d535 PASS perf; my own CPU-4x profile of new life ×2: 4.7 / 5.5 s, no long loop. → cold-box flake, not the branch. On 8e75df35: PASS (core gates PASS, old save ok, render 290/319 ms).
- coop-e2e 60/60 (LIVE Worker) on 0ffa37bf and on 8e75df35; coop-one-world PASS (default seed + SEED=7) on both (merge == host on every world path: both players read the host value). Solo: no page errors, no horizontal overflow (Fold 755x1000, iPad 1180x820).
- Shots (scratch, looked at, deleted): fold/ipad-act (odds chips Năm ăn năm thua / Khó / Liều, kit chips), fold-duc (Thang Đức), ipad-giao (Có thai: Rất thấp · Lật thẻ: Không có; Nguy hiểm chung 0 green), Luân hồi rarity chips Hiếm / Rất hiếm / Thường gặp. Kit: no UI part touched (words/colour cuts inside existing kit rows only).

## 4. Trial merges (on 8e75df35) — clean; landing order
- + origin/main 6c4f21c3: already contained (main = merge base).
- + review/one-core-roads 75bc9f05: generated files only (assets.json, baseline, index.html, sw.js).
- + review/one-core-arcs c682afe6: generated files + ONE code conflict j96 rare96 / ARC67.tm96c: keep ours `w.loyal>=BAL.loy.trust` + arcs' `arcFx("tm96c",{…` wrapper (2 lines, parses).
- arcs + roads + this together: guard PASS 0 fails (inline 4840), one-core-text PASS, assemble OK, coop-one-world PASS.
- Order: (1) review/one-core-dup-r2 (its own reviewer) → (2) this branch after the FAIL fix → (3) one-core-arcs (j96 2-line resolve above) → (4) one-core-roads (regenerate + guard --update). Arcs/roads can also go first; then this branch takes the j96 resolve.

## FAIL — numbered list for the worker
1. Player texts still TYPE the cut that this branch moved into a BAL key (owner OD:L1267 "text must print the constant, never a typed number"; same family as the r1 FAIL item 3). Change the BAL value and these lie. Verified per line (text ↔ the rule beside it):
   - j83.js:225 "Lòng … dưới 40, nàng không dám đi" — BAL.loy.low on the same line
   - j22.js:24 "người hầu trung thành (lòng 60+)" — watcher() = BAL.loy.close
   - jroute.js:89 + :95 "canh cửa (lòng 60+, Chủ tin 60+)" — watcher() (BAL.loy.close; NB watcher checks no Chủ tin at all: text claims a rule that does not exist → Foreman B)
   - jroute.js:83 "cung nữ thân cận (lòng 50+)" — BAL.loy.mid
   - jroute.js:136 + :321 "(lòng 70+, có ${mL})" AND the rule `mL>=70` is still typed (missed cut) — BAL.loy.trust
   - jlost.js:246 "cung nữ thân tín (Lòng 40+)" — econLoyalMaid = BAL.loy.low
   - j24.js:58, jhouse.js:46, jpromsv.js:51 "lòng dưới 30 … bán mình" — BAL.loy.out (j24:69)
   - jtut.js:199 + :316 "Lòng dưới 45 dễ bị mua chuộc" — BAL.loy.warn (confirm which rule; if staff-root's bribe rule, print that key)
   - j85.js:164 Thang Đức page: tiers "80–100 / 60–79 / 20–49 / 0–19", "+1 mỗi tháng", "từ 70", "dưới 25" and the on: cuts d>=80 / d>=60 / d<20 — BAL.ducLv (word / up / down / staffUp / staffDown); j85.js:31 "(đến 80)" — check its key.
   Fix: print the BAL value (balSg / template) in each; and extend dev/test/one-core-text.js to the dup2 keys (loy, ducLv, quyLv, wit, sungLv, tinhLv, tinLv, sucLv, rareLv, tsDanger, oanFade, cut, age.adult, srvAge.old) so the family stays guarded (LUẬT SỬA CẢ NHÓM: rerun its scan, before/after table). jroute lines touch one-core-arcs' file: base the fix on this branch, keep it mechanical.

## Open questions for the owner (not blocking; from §6b, Foreman B to ask)
- Sủng words: 5 different cut sets (70/45/25 · 55/30 · 60/35/15 · 60/30/10 · 60/30) — one ladder? (worker proposal [10,30,60], Chưa để ý / Biết mặt / Để mắt / Sủng ái)
- Đức: the Thang Đức page says 20–49 "bạc đức" / 50–59 "đủ Đức", the Đức word says 40–59 "thường" — seen live: Đức 45 → page "bạc đức (đang ở)", word "thường". Which ladder?
- Thái hậu / Hoàng hậu Đức drift runs twice a month for the player (j3 + j85) — intended?
- Lòng: rule tiers vs word ladder 70/50/30 vs colour 60/45; Sức: 70/50/30 vs 60/30; Tâm cơ spot bonus 15 vs 12 — unify?
- (seen, pre-existing) j21 relLines still labels "Ngươi với nàng:" — OD:L247 asked "Nàng quý ngươi / Ngươi quý nàng" labels everywhere.

## FIX dup2 r2 — texts print the moved cuts (reviewer FAIL item 1, review-one-core-dup2-r1)
PRIORITY #1 CHECK: OD:L1267 | main: balSg/balAb + dev/test/one-core-text.js landed in r2 f97a5841 only | review/* one-core-dup2(-r1) | claims B. START_CTX ≈ 5 %; no rollover.
Branch review/one-core-dup2-r2 @ 097658ce4976876512b0b60770e90d9db54e33df (from review/one-core-dup2-r1 8e75df35, 1 commit, site rebuilt).

### Before / after (whole-game scan, not only the reviewer's list)
| concept (BAL key) | typed copies before | now | notes |
|---|---|---|---|
| loy.close 60 | j22:24, jroute:89, :95 | print balAb(BAL.loy.close) | watcher() |
| loy.mid 50 | jroute:83 | print | |
| loy.trust 70 | jroute:136, :321 text + rule mL>=70 ×2 | text printed AND rule reads BAL.loy.trust (value same) | missed cut |
| loy.low 40 | j83:225, jlost:246 | print | |
| loy.out 30 | j24:58, j24:64 (found by the new scan), jhouse:46, jpromsv:51 | print | |
| loy.warn 45 | jtut:199, :316 | print | rule = maidMonthP / j72 rf (bribe) |
| ducLv up 60 / down 20 / word[3] 80 / staffUp 70 / staffDown 25 | j85:164 Thang Đức tiers "80–100 / 60–79 / 20–49 / 0–19", "từ 70", "dưới 25" + 5 on: cuts | labels printed from BAL.ducLv, on: cuts read BAL.ducLv.* | "50–59", "49", "mẹ Thái tử: 40" stay typed (other rules, not ducLv) |
Total 16 loy texts + 1 table (7 refs) in 9 modules: j22, j24, j83, j85, jhouse, jlost, jpromsv, jroute, jtut. Visible words unchanged.
Left typed on purpose (number shared by coincidence with another rule, in the frozen list, listed by OC_WIDE=1): j8:171 + jinv:116/:258 "Sủng không dưới 15" (ngọc bội's own floor ≠ sungLv.kinh), j97 ×7 road gates "Đức từ 40 / Sủng từ 35 / 45" (typed gates S.duc>=40 …), j42:290 "Chủ tin dưới 60" (rule S.tin>=60 typed), j85:31 "(đến 80)" + j85:144 ducOf(p)<80 (Hạnh month cap, typed), jts:210/:216 "Sủng ≥ 30" (bestow rule, typed), jroute:89/:95 "Chủ tin 60+" (watcher() checks no Chủ tin at all: the TEXT claims a rule that does not exist → Foreman B's call, not changed here), jroute:184 "tình ý 50+" (rule (m.tinh||0)>=50 typed).

### Guard
dev/test/one-core-text.js extended (same file, same G1 gate, no baseline, 0 now): (1) beside-ref: any typed number equal to a leaf of a BAL.loy / wit / ducLv / quyLv / sungLv / tinhLv / tinLv / rareLv / sucLv / oanFade / tsDanger / cut / odds / ageBand / age.adult / srvAge.old / pet.life read in the same option object (±300 chars), the stat word just before it must be that ladder's own; (2) stat-word scan of the WHOLE game, rule far away or not: "lòng 60+" / "dưới 40" / "từ 30" for BAL.loy (any shape), a typed tier range "A–B" for ducLv / sungLv / sucLv / wit / tinLv. Loader now runs the BAL files statement by statement (jbal.js stops at contestOpen; the Object.assign after it never ran before). Planted in scratch: j22 "lòng 60+" typed → FAIL; j85 "20–49" typed → FAIL.

### Proofs (all PASS)
- one-core-text-same (r2→this, generalised: any ${balSg|balAb(BAL path + arithmetic)} printed, every numeric BAL path put back, both sides): 9 modules identical.
- one-core-dup-same origin/review/one-core-dup2-r1: 4408 live functions before / after, 4408 identical (rule mL>=BAL.loy.trust proven by the put-back).
- one-core-guard 0 fails, no --allow-grow (11790 = baseline). one-core-text 0 sites, 0 early reads.
- quickcheck PASS (core gates PASS, old save ok, open 1233 ms, perf render 236/200 tab 340/303 buổi 743/828, longTaskMax 1310 vs live 1347). coop-e2e 60/60; coop-one-world seed 7 + 3 PASS.
- Shots (scratch): Fold 755x1000 + iPad 1180x820 of the real Đức rule page (kitModal v85DucPanel): tiers 80–100 / 60–79 (từ 70) / 50–59 / 20–49 (dưới 25) / 0–19 identical, 0 page errors.
- No rule value changed.
