# F-TIER-B2 — WORKLIST row 42 batch 2: FLAT retune, BAL only (law 2 NHẸ · VỪA · NẶNG)

PRIORITY #1 CHECK: OD 27/11 ~00:46Z law 2 rewrite + ~00:50Z (one resource at 3 sizes is fine) + ~00:57Z (Đức falls on wicked deeds) | main c03d6ee7: BAL.road.fx (jbalroad.js), BAL.arc.fx (jbalarc.js) + the same tables in jbalbd.js / jbalpt.js; jstory.js opts67 → ALT67 / altOf67 = the existing «road without silver» for every bạc beat (REUSED, not rebuilt); dev/measure/road-onecore-same.js; no tier step key on main | review/e-tier-b13 not pushed yet (E batches 1 + 3; its BAL.road.c.tier = [1,2,3] is the same steps) | claims E-TIER-B13 session_01DgYSWkbLTwZBwq2854wSdA (batches 1+3); batch 2 = F (this).
START_CTX ~3 % (used_tokens read 0; own estimate). Worker, depth 1, child of Foreman F ROOT 8.
KIT CHECK: no UI change (numbers only; the kit j67 option card prints them as before).

## Result
Branch **review/f-tier-b2** (base origin/main c03d6ee7 = LIVE a96564ad + lc35-ui5).
- **Audit FLAT 1885 → 14** (the 14 left = jrdcsd composed roads = batch 1, E-TIER-B13's jroadc rule; not touched). Every one of the 1871 retuned sets now classifies **OK** (classify.js of the audit, rerun on the built branch). **No non-FLAT set changed status** (MERGE 151, CAP 2236 unchanged → E's batches 1 + 3 untouched).
- 1730 rulebook beats edited (1871 sets: the Bắc Địch legacy premises bd_hoa / bd_ngua / bd_tuc / bd_hoang play the Cao Ly chapters and ch_ho after the Thái hậu's death plays ch_hoD, so one rulebook row serves several sets). 4948 option edits, all in BAL (jbalroad.js, jbalarc.js, jbalbd.js, jbalpt.js). No text, no option removed, odds / Lợi thế / go amounts / flags / exits untouched.
- New key **BAL.road.tier3** = {step:[1,2,3], unit:1, gain:["tamco","danh"], cost:"suc", keep:["mat","nt"]} (law 4: the script reads it from jbalroad.js; no number typed in the tool).

| | before (LIVE c03d6ee7) | after (review/f-tier-b2) |
|---|---|---|
| sets (ARC67) | 4889 | 4889 |
| OK | 617 | 2488 |
| FLAT | 1885 | 14 (jrdcsd = batch 1) |
| MERGE | 151 | 151 |
| CAP | 2236 | 2236 |

FLAT rows per file before → after: j67 195→0 · j96 20→0 · jend14 15→0 · jorigins 7→0 · jrd_bd 83→0 · jrd_bd2 51→0 · jrd_ch 174→0 · jrd_cn 149→0 · jrd_cnv 100→0 · jrd_dtq 162→0 · jrd_muoi 131→0 · jrd_nc 262→0 · jrd_pt 70→0 · jrd_pt2 48→0 · jrd_td 152→0 · jrd_thd 118→0 · jrd_tt 134→0 · jrdcsd 14→14.

## The rule (dev/tools/tier-b2-retune.js, repeatable: a second run on the retuned tree changes nothing)
Per FLAT beat (cancel words Thôi / Lui / Đóng / Bỏ qua / Để sau untouched):
1. order the options by what they cost today (audit scale: Tốn + ½ Mất, bạc ×0.1, Sức ×0.5, other stats ×1) — the cheapest stays NHẸ, so the words still fit;
2. option j gets step 1 / 2 / 3 (2 options: 1 / 2) of the beat's own unit U = (Σ cost + Σ gain) / (2 Σ steps), floor BAL.road.tier3.unit; cost and gain both scaled to step × U, same stat keys and signs → Tốn and Được / Mất rise together;
3. law 3: an option with no Được gets one — Tâm cơ (the craft any act teaches), else Danh; never Đức (a wicked deed must not earn virtue, OD ~00:57Z). 1020 gains added; 79 free options above tier 1 now pay a little Sức;
4. Tai mắt (counted in informants, «ngỏ lời N người») and nt are kept as they are; the rest of a tier's size goes to the other keys;
5. bạc in tens, every amount ≥ one unit; ties nudged until cost AND gain strictly rise, and no two options of the same kind at a near size (the audit's MERGE test) — 0 left.
Economy of the 1871 sets: Tốn ×1.07, Được ×1.26 (incl. the law-3 gains) — a beat keeps about its old size.
Arcs (every ARC67 entry not a road chapter): j67 halves story Sức / Hoàng hậu costs at run time, so the tiers are set on the PLAYED number and BAL holds 2× (proof below reads the played value).
Bạc (law 2 last clause): every beat with a bạc option already offers a road without silver at run time with the same Được and Lợi thế (jstory.js opts67 → ALT67 hand roads / altOf67 «Nhờ người quen lo liệu, không dùng bạc», Sức priced by what the silver is worth, BAL.altK) → the matching non-bạc road of the same tier exists for all 1871 sets. Residue for MAIN: 80 beats hold TWO bạc options; altOf67 copies the first only → the second bạc option has no same-tier twin (needs a jstory rule change: one alt per bạc option — not BAL, not this batch).

Examples (played numbers, tier order):
- tt_co.s2 «Cha cài người vào cung ngươi» (arc): before Nhận, để cha yên tâm [Tai mắt−1 | Bạc+40] · Nhận, rồi mua chuộc nàng [Bạc−40 | — | Danh−3] · Gửi trả về phủ [— | Đức+2 Tâm cơ+2] → after 1 Gửi trả về phủ [— | Đức+1 Tâm cơ+1] · 2 Nhận, để cha yên tâm [Tai mắt−1 Sức−4 | Bạc+30] · 3 Nhận, rồi mua chuộc nàng [Bạc−30 | Tâm cơ+5 | Danh−2] (the bribe gets Tâm cơ, not Đức).
- tt_co_5.c2 «Môn sinh của cha» (road): 1 Hẹn gặp {v} nói thẳng [— | Đức+1 | Sủng−2] · 2 Đổi người đưa thư [Bạc−20 | Tai mắt+1 Tâm cơ+1] · 3 Để {v} đọc thư giả [Sức−3 | Tâm cơ+3 | Danh−3].
- dtq_vu_9.t1 «Niêm phong» (road): 1 Nhờ mẹ niêm bằng gia ấn [Bạc−10 Sức−1 | Tai mắt+1] · 2 Gửi về để mẹ đệ đơn kèm chứng cứ [Danh−1 | Tâm cơ+2 | Sủng−2] · 3 Nhờ Thái hậu giữ tráp đến ngày xử [Thái hậu−2 | Tâm cơ+3 | Thái hậu−2]. Full table of every option: the tool's --list output (rerun: node dev/tools/tier-b2-retune.js arc.tsv reg.json --list out.json).

## Step 0 — history / drama expert (law 8, sub-agent)
1. Gift NHẸ: embroidered sachet, copied sutra or snacks, about 10 taels or a month's stipend; gain: the elder remembers your name, slight warmth, nothing promised.
2. Gift VỪA: jade bracelet, rare tea or a fine painting, about 2–3× light (20–30 taels); gain: the elder puts in one good word or grants a small favour.
3. Gift NẶNG: heirloom, gold Buddha or a season's savings, about 4–5× light (50+ taels); gain: patronage and protection through one crisis, but also envy and debt.
4. Plea NHẸ: kneel briefly at the gate or send a written petition; gain: a hearing. Plea VỪA: kneel two or three hours in sun or snow; gain: the sentence halved.
5. Plea NẶNG: kneel all night in snow, knock your head till it bleeds, stake your rank or life; gain: a condemned kinsman spared, or you share the fall.
6. Bribe NHẸ: a few taels or a silver hairpin to a junior eunuch or maid; gain: gossip, a message carried, the summons plates shuffled once.
7. Bribe VỪA: about 30 taels to a head eunuch or physician; gain: access or a warning. Bribe NẶNG: hundreds of taels to the chief eunuch; gain: evidence buried, but exposure brings death.
8. Taking punishment: NHẸ = 10–20 slaps, an hour kneeling, a month's stipend; VỪA = 20–30 strokes, confinement, half a year's stipend; NẶNG = demotion, cold palace, 50+ strokes.
9. Giving punishment: NHẸ = a scolding or fine that cows a maid; VỪA = strokes or exile to the laundry, which wins fear; NẶNG = death or exile, which cements authority but breeds hatred and suspicion.
10. Recommend 1:2:4 over 1:2:3: history scales faster than linear, so match gains 1:2:4 and give NẶNG lasting side effects.
How it was used: cost and gain rise TOGETHER (lines 1–9) → one step list for both; NẶNG keeps its Mất (lines 3, 5, 7 «envy / share the fall / exposure») because Mất is scaled with the cost. Steps set to **1 : 2 : 3**, not the expert's 1 : 2 : 4: (a) one core — batch 1 (E-TIER-B13, BAL.road.c.tier = [1,2,3]) uses 1 : 2 : 3 for the 2138 composed sets, two step lists in one game would break law 4's one table; (b) 1 : 2 : 4 on the same unit makes the retuned sets Tốn ×1.15 / Được ×1.32 instead of ×1.07 / ×1.26 (measured: same tool, step key only). If MAIN wants 1 : 2 : 4, it is ONE BAL edit (BAL.road.tier3.step) + rerun of the tool, for both batches together.

## Proofs
- **Robot proof dev/measure/tier-b2-same.js** (before = regdump of LIVE c03d6ee7, after = regdump of the built branch, plan = tool --list): SAME — 3025 sets outside batch 2 identical (all ARC67 + E68 + NRASK: c, w, l, odds, flag, exit); 1871 batch-2 sets / 5363 options read exactly their planned tier numbers; odds, flags, exits untouched; cancel options untouched.
- **dev/measure/road-onecore-same.js origin/main**: SAME (tt/cn/muoi/dtq data files + odds on 466 400 trials unchanged; that script loads ONE jbalroad.js for both sides, so it proves the data files did not move — the BAL change itself is proven by tier-b2-same).
- Audit rerun (regdump.js + classify.js on the built branch): table above.
- **QUICKCHECK** (bash dev/tools/quickcheck.sh on ff1803db, then the step-2/3 rerun on 878145fa with --runs 5): open 2095 ms 0 errors · **old LIVE save loads and plays** · perf PASS (median of 5, new/live: render 264/307, tab 511/588, buổi 1769/2105 ms, tasks>200 ms 34/47; the first 3-run sample had buổi 3666/2023 = noise, the 5-run rerun is below LIVE). Core gates: one-core-guard PASS (balKeys 898, fails 0) · one-core bind / text / text-rule / khắc PASS · **time-spill PASS** (static + runtime) · webkit syntax/boot PASS · odds-cap PASS · coop-one-world PASS · dialog-fixed PASS · dead-card PASS · button-crawl PASS · look-dedupe / press-keep / next-dead / noise-hygiene PASS · **kit-std-scan total 6 ≤ LIVE baseline 28** {X06:4, X08:2} · **q-softlock FAIL (4) = the SAME 4 rows on LIVE c03d6ee7** (rerun of dev/test/q-softlock.js on the LIVE build: same 4 FAIL lines «inside a person view…», UI queue, not numbers) → not this branch.
- **Pending beat in an old save** (dev/test/tier-b2-pendsave.js, new): a beat left pending in a save made on LIVE (tt_co.s2, tt_co_5.c2, dtq_vu_9.t1) loads on this build and resolves through the game's own chooseM — 3/3 resolved, 0 page errors (no option removed, indices unchanged).
- **Shots** Fold 755×1000 + iPad 1180×820 of the 3 beats above (looked at all 6, three passes): CDN img/_review/f-tier-b2/ (tt_co.s2, tt_co_5.c2, dtq_vu_9.t1 × 755 / 1180). Cards fit, odds words cổ trang, no %, the bạc beat shows the no-silver road «Nhờ người quen lo liệu, không dùng bạc» beside it.
- **Road tests that exist**, branch vs LIVE c03d6ee7 on the same box: road-cut PASS 270/270 · road-full 366/646 = LIVE 366/646 (same 280 FAIL checks, only the random road id differs — harness drift, lives stall at ch.1) · road-end 26/27 = LIVE 26/27 (same cnv/maid row) · road-rare FAIL 36 = LIVE FAIL 36 (identical FAIL set) · road-saves 5/7 = LIVE 5/7 (same 2 rows) → no test worse than LIVE. dev/test/rdseeds_validate.py / rdc-* = composed roads (batch 1), not touched.

## Residue / for MAIN (not this batch)
1. **jrdcsd 14 FLAT** = composed roads → batch 1 (E-TIER-B13, jroadc rule).
2. **80 beats with two bạc options**: jstory altOf67 builds the no-silver road from the FIRST bạc option only → the second bạc option has no same-tier non-bạc twin. Fix = one jstory rule (an alt per bạc option, or a hand ALT67 row) — code, not BAL. List: node dev/tools/tier-b2-retune.js … --v («2 bạc» lines).
3. **Kit card face (KK)**: the option card prints «Tốn» from Sức / Bạc / Danh but not a Thái hậu / Hoàng hậu favour or Tai mắt cost — e.g. dtq_vu_9.t1 tier 3 «Nhờ Thái hậu giữ tráp» reads «Tốn không» on the face while it costs Thái hậu favour (the detail row shows «Thái hậu: Không ưa»); tt_co.s2 tier 2 shows «Sức 4» but not «Tai mắt 1». So on the face a NẶNG option can look free. LIVE does the same (not new); after the retune it matters more → KK: print every cost key on the face (or the tier word, batch 6).
4. Steps 1 : 2 : 3 vs the expert's 1 : 2 : 4: MAIN's call; one key BAL.road.tier3.step, rerun the tool.

## Handover
Done: retune + proofs + gates + shots. Branch review/f-tier-b2 (commits ff1803db retune · 878145fa tool rerun-safe · 3f37d9d6 pending-save test). Next: BIG review. To redo after a rebase: rebuild, regdump the base, run the tool with --write on the base dump (it is idempotent), rebuild, rerun tier-b2-same + classify.
