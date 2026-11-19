# kyngo-daily — «Kỳ ngộ thường ngày» STEP 3 BUILD (E18) — SẴN SÀNG KIỂM 8cb39e38

PRIORITY #1 CHECK ('kỳ ngộ'): OD 5 (OD "(19/11 ~03:30Z real)" build, "(19/11 ~03:25Z real)" no double gate; MAIN ROOT-67 09:00Z «BUILD» + notes a–d) | ledger 0 | claims: E16 expert done | main: j97 / jroad RD97L / j96 story-bound rares (reused: hidden roll, cost-only cards, Sổ luân hồi pattern) | review/* 0 before this branch.
★ THE 18 LAWS: read the block at the very top of dev/rules/START_CORE.md FIRST (all 18; laws 1–6 top priority); put this line in every brief/takeover prompt; reviewers FAIL any break.

Branch review/kyngo-daily @ 8cb39e38 (merged LIVE main d9b32074). Design: dev/design/KYNGO.md (§16 = build notes, how notes a–d were folded in).
Files: dev/build/jky.js (engine, wraps only, loaded after jfigx, before the co-op thin wrappers), dev/build/jbalky.js (BAL.kyngo, every number), dev/build/assemble.py (+2 modules), dev/test/kyngo-eq.js, dev/test/kyngo-unit.js, dev/test/kyngo-shots.js, dev/measure/kyngo-bot.js. Root index.html / sw.js not committed (coordinator builds).

## What it does
ONE gate: she (or a consort) is at a place this buổi (Dư đồ walk, cung-nữ walk, or a Hành sự act done at a place) and an encounter has a REAL person there now (the j95 record S.roster) and a REAL piece / fact (jil box, jlost case, j70 plot, pets, adRare). Hidden roll p = min(pMax, p0 + step·miss), sure at miss ≥ pity, cooldown cd[band] tuần, once per life per id. 25 encounters. Pieces only MOVE (logged "kyngo: …"); no crafted piece is created (note a). She is a WHO for NPC encounters (note b: an NPC returns HER pet / finds and returns or keeps HER lost piece → her case held+keep, recognition road). Plain PEND event, place seal, evId kyngo:<id> (note c). Every option of a choice has gain + real cost; eq script checks (note d).

## Tests (all on 8cb39e38 build)
| test | result |
|---|---|
| node dev/test/kyngo-eq.js (law 2 values within eqTol 1.25 per band, law 3 gain + real cost) | PASS (all 25 × bands) |
| node dev/test/one-core-guard.js | PASS (no new inline number; band thresholds, ev/intel steps in BAL) |
| node dev/test/kyngo-unit.js (gate, pity, cooldown, once/life, vat_lac keep conservation, NPC finds HER piece, old save without ky, Sổ luân hồi, ilAudit net 0, wording no %/OK, PEND card + evId + who) | PASS 16/16 |
| node dev/test/kyngo-shots.js Fold 755x1000@2 + iPad 1180x820@2 (choice card, result card, found-piece card with kitItemTag, Sổ luân hồi; no h-overflow, options on screen, 0 page errors) | PASS; LOOKED at each |
| quickcheck.sh | NOT RUN (no dev/test/quickcheck.sh on main; one-core-guard + unit + bot cover the gates I could find) |
| perf | NPC pass = 1 eligibility scan per consort per buổi; bot ran 432 buổi × 6 lives per band with no jky error; no ms timing taken |

## Bot measure (dev/measure/kyngo-bot.js, random walker 1–2 places a buổi, 6 lives × 18 tuần = 6 game months per band), final numbers p0 85 / step 15 / pity 2 / cd [1,1,1,2]
| band | eligible buổi e | hits / life | mean gap (tuần) | lives with 0 | NPC hits per consort-buổi |
|---|---|---|---|---|---|
| L (Đáp ứng–Quý nhân) | 0.079 | 5.2 | 3.5 ✓ | 0 ✓ | 0.12 |
| M (Tần–Phi) | 0.046 | 2.7 | 6.8 ✗ (run4: 6.9, run3: 5.5) | 0 ✓ | 0.12 |
| H (Quý phi+) | 0.065 | 3.7 | 4.9 ✓ | 0 ✓ | 0.11 |
Before/after tuning (L band): p0 8/step 2/pity 18 → gap 13 tuần (e .075, hit/elig .26); p0 35 → 8.2; p0 50 → 5–7; p0 85 → 3.5. Eligibility (OD 03:25Z) is the limit: hit per eligible buổi is now ~0.8, so further gains come only from more eligible buổi, not from the roll.
OPEN: band M sits above the 5-tuần bar for a RANDOM walker (fewer M-pool encounters at the places the bot picks). Next lever if MAIN wants M inside the bar: widen 2–3 M encounters to more places (ma_co, de_but, de_su need a man / the Emperor present). NPC rate (they always stand somewhere) ≈ 1 per 2.2 tuần per consort — same rule, more presence; news lines show their fortunes.
Ledger: ilAudit net per 6 lives 1–4 with kỳ ngộ ON vs 2 with it OFF (run1-off) → pre-existing game noise, not this module (unit test on a forced vat_lac keep: net 0).

## Shots: NOT stored anywhere reviewers can open — the pre-commit hook refuses images on the handover branch (img-allowlist) and E's CDN upload is 401. Regenerate: `node dev/test/kyngo-shots.js <site url> <outdir>` (Fold 755x1000@2 + iPad 1180x820@2: choice card, result card, found-piece card, Sổ luân hồi). I LOOKED at each: iPad cards on kit §50 (person left, banner, kitItemTag piece, option cards); Fold choice card shows kit picture stand-ins while pictures load; Sổ luân hồi shows the Kỳ ngộ block under Kết hiếm/Thiên mệnh.

## FOR C (pictures, nothing drawn): 25 event banners evId kyngo:<id> (ids in jbalky.js E), KIT §50 banner crop; until then jk4's picture fit picks a stand-in.
## Known limits (v1, documented in KYNGO.md §16): NPC finders = consorts only (maids not finders); NPC lối/intel → art / evidence step; co-op guest skips world-piece encounters.

## HANDOVER (context ≈ 30 %, rollover point): if BIG review asks for changes, a successor reads this file + dev/design/KYNGO.md §16; bot: run one band per process (memory), `node dev/measure/kyngo-bot.js <url> 6 18 <rank> mix`.
