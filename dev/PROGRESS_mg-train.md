# PROGRESS — review/mg-train (minigame family integration, Foreman B)

Base: origin/main ee5d33de (11/16/2026). One branch so the main coordinator can land the whole minigame family in one fast-forward.

## Merges (in order, all reviewer-PASSED)
| # | branch @ sha | conflicts | resolution |
|---|---|---|---|
| 1 | review/mg-balance-r1 @288aa4f6 (core BAL.mgTier + jmgt.js) | assemble.py, jbal2.js, index.html, sw.js | main's file list + jmgt.js after j91; jbal2 keeps main's BAL.mline and adds BAL.mgTier; site rebuilt |
| 2 | review/nw-poem-r1 @5d200041 | assemble.py, generated | jnwp.js after jmgt.js |
| 3 | review/nw-quiz-r1 @33730518 | assemble.py, generated | jnwq.js after jbal2.js |
| 4 | review/owner-answers-b-r1 @07f84484 (+ nw-lantern-r1, presentation-r1) | MINIGAMES.md, assemble.py, j91.js, generated | j91: theirs (k91Lantern deleted); MINIGAMES.md: tho/doi rows from nw-poem, doden row from nw-lantern; jlant.js after jbal2, jpres.js after jsfx |
| 5 | review/slap-mg-r3 @6444443b | assets.json, assemble.py, jbal2.js, KIT.md, mg-bots.js, generated | see below |

## Fixes (whole family)
- ONE tier helper `mgTierOf(env)` in jmgt.js: the tier mgSet() put in KG82.tier (occasion stakes incl. exam), else `kg82Tier(env.lv)`.
  Used by every no-word engine: jnwp `nwTier` (was correct, now via the helper), jnwq `nwqTier` (BUG: passed the string KG82.ctx as options →
  occ "hoc" + her own rank, exam stakes ignored), jlant `lmTier` (BUG: expected a number from window.mgTier, got an object → always fell back).
  Scan: no other `mgTier(` caller outside jmgt except j82 kg82DiffWord (correct object use) and jslap slapMg (correct; sets KG82.tier itself).
- slap-mg-r3 carried an OLD jmgt.js / BAL.mgTier (wk.th 14, no kG/tol/easeMin): jmgt.js = mg-balance-r1 version (git kept ours); jbal2: the old
  mgTier assign dropped, order = core `Object.assign(BAL,{mgTier:…})` → `BAL.slap` → `Object.assign(BAL.mgTier.occ,{tat,ne})` (order trap).
  KIT.md keeps §45.4 + §28.13b (main) and §79 (slap). mg-bots.js: core bot + slap `aim` + `KG82.noDemo`; the bot now sets KG82.tier from the
  tier spec (null for raw `eN`), so nw-* engines measure at the asked tier.
- Dead word-game code deleted (scan of the assembled files + runtime check: KG82_KIND engines used = rhythm/go/pattern/steps/aim/hold/fling/trace/
  arrange/untangle/cook/blend/calli/doiline/lamp/lay/sort/seat/clue/td*/groom/tspluck/tssteer/slapbar/kinh/may — none uses quiz/verse/pair; every
  MG lesson key (thi, y included) is replaced through KG82_MGL by the openMG wrapper in j82):
  j5 DOI, YQ, MG.thi, MG.y, quiz(); j82 KG82_HUONG, KG82_BEP, kg82Bank, kg82Quiz, KG82_ENG.quiz (kind keys tho/doi/banh/huong kept as one-line
  placeholders so the kind order stays); j91 K91_LB, k91Verse, k91Pair, verse/pair registration + kinds. Kind list + order identical before/after.

- Page error found by the bots: jnwp calli read F.S[ns] when a stroke ended in the 250 ms after the last one → same guard as mg-balance's j91 trace fix.

## Tests (final build) — full numbers in dev/handover/reports/mg-train.md (docs branch)
- mg-balance-vp.js: 30/30 kinds open + finish, old save loads, 0 page errors, 0 overflow at 755x1000@2, 1000x755, 1180x820@2, 1366x1024@2, 844x390@2, 390x844@2.
- slap-mg.js all sizes pass (844x390 demoShown = timing: tát paintings not on CDN, preload waits ≤2.5 s); promo-exam 23/24 (known pre-existing FAIL); coop-e2e 59/59 ×2.
- Exam path: intro "Độ khó: Khó · … khảo hạch", nwqTier = exam tier.
- mg-bots n=30 Vừa: slap tat 33 % ≥9 (target 20–30); nw-* engines 67–100 % ≥9 (FAR above target) → open item for Foreman B (engine scoring has no time component).
- KIT REQUEST (pre-existing): j82 frame at 844x390 — board bottom under the screen / under Gợi ý for every engine; jlant has a private scroll fix.

## Open (not this branch)
- review/mg-balance-2 (other B worker) tunes banh/co/td_hanh/mua + td_ngon on top.
- BAL.mgTier.kAdj has no entries for tho/doi/doden/le/tc/xa/thq (0 = default); the nw-* engines read the tier word, not the ease trim.
