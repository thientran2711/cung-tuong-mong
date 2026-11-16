# PROGRESS review/promo-rules (owner 15/11 20:05Z: birth rules, servant-road exams #1, promotion rewards #9, rank FX #13)

Base: origin/main 23a8e80e. Worker: promo-rules (coordinator s7).

## Done
1. Rules (`jexam.js`, `j8.js`, `j42.js`, `j14.js`, `jbal2.js` BAL.ex.srvBar/srvCd)
   - Son's birth = decree at once, no exam (`exSonUp`, player + NPC). Daughter's birth = exam at once, conditions waived (`exGrace(p,"f")`,
     row/gloss "mừng công chúa"; pass → `exGraceUp`). Twins: one rank-up per birth.
   - Servant road: j42 srvMonth merit rise → `exSrvGate` opens a window (BAL.ex.win tuần) + card «Khảo hạch Nội vụ phủ» (Phận sự);
     pass → old rise (rank, merit 0, Chủ tin +5, «Thăng bậc»); fail / lapse → wait BAL.ex.srvCd months. Rounds = low-rank exam; examiner
     ma ma Nội vụ phủ; Chủ tin moves the bar. «Ở lại làm ma ma» = an exam (`exSrvMama`). Exam runner shared (`exRun`).
   - NPC servants (j14 servRanks): `exSrvNpc` seeded roll (same on both co-op clients); fail = cooldown.
   - Left as decrees (no exam): imperial pick srvRise, story r97rise/r97srvRk, cold-palace restore, pardon.
2. Promotion rewards (`jpromo.js`, KIT §65): full rank set as real items from Nội vụ phủ (y phục + trâm of the new phẩm, Đeo tay, Túi thơm,
   extras by rank), chest «Phẩm phục …» (+ jmark head mark), then kitPersonReveal of the servant Nội vụ phủ assigns (her cap +1 per rank,
   BAL.promo.cap; NPC caps unchanged because servant faces are unique — j17 roomFor). Servant road: pouch of humble goods, no servant.
   NPC consorts: same set + servant, data only, co-op host only. j92 month-end issue skipped (window.PROMO_SET). Old saves: silent.
3. Rank FX (j93, KIT §66): demotion / cold palace = portrait frame greys (demotion crossfades to the lower frame), old chip splits and falls,
   dim new chip; rank-up glow and crack line = KIT §68 painted FX (kitFxLight / kitFxSprite, typeof-guarded; review/fxkit not on origin yet —
   until then: no glow, chip splits without a drawn crack). No code-drawn effects (owner rule via coordinator).

## Tests
- NEW `dev/test/promo-rules.js` (logic 14 checks + chest / reveal / rank-down per size).
- `dev/test/promo-exam.js` step 6 updated to the new son rule. Its old-save step fails on main too (written for a pre-exam build).

## Missing art (not blocking)
- Per-rank Đeo eo pendants (only ngocboi «ngự ban» exists — not a rank item), Đeo tay bangles for middle ranks (only vongngoc r0 / vongvang r5),
  per-rank Túi thơm. Servant-road maid robes per maid rank as items (only y_cungnu / y_luamoc P0).
- KIT §68 painted gold light + crack sprite (review/fxkit).

## Open
- Servant road has no edict animation (j93 kitEdict uses consort frames); the chest is its moment.

## State (resume notes, 15/11 ~20:55Z)
- Branch review/promo-rules pushed, all code + site rebuilt committed. No art generated (nothing to download).
- Tests passed: `node dev/test/promo-rules.js <url> <oldBuild> <out>` 29/29 at 755x1000, 1000x755, 1180x820, 1366x1024, 844x390 (old save = origin/main index.html
  copied to repo root as old.html, NOT committed); item-gain (no fails), reward-box PASS, stipend (errs []), promo-exam 17/18 (the old-save step fails on main too).
- Co-op: `node dev/test/coop-e2e.js <outdir>` 59/59 (run with a local copy raising p.setDefaultTimeout to 240000: machine load 40 made the
  first page load exceed 30 s). NPC rewards run on the co-op host only; NPC servant exams are seeded (same on both clients).
- Next: when review/fxkit (KIT §68) lands, check kitFxLight/kitFxSprite signatures match the calls in j93 kitEdict / kitGloom and jpromo kitPersonReveal.

## Review r1 (review/promo-rules-r1, reviewer for Foreman C, 16/11)
- Merged 53b0084d onto origin/main 900ace7f. Conflicts: j93 kitReward (main's tappable rows §70 + branch km-long), jexam (main's round counter
  args + branch exRun), assemble.py (jpromo after jitd), generated files rebuilt.
- REQUIRED FX change (fxkit §68 live): the branch called `kitFxLight(el,{kind:"gold"})` and `kitFxSprite(el,{name:"crack"})` — wrong signatures /
  no such sprite, so nothing painted played, and the old CSS sweep + code-drawn dots stayed. Now (whole j93 family):
  rank-up = painted glowburst + glow-gold light on the new frame; crack = painted jade shards (kitFxBurst "jade"); kmSpark (edict, tablet, chest)
  = painted spark + gold-leaf petals; chest .kmlight, bloom .kmglow, incense ember/smoke = painted orb / ember / smoke atlases (CSS only scales,
  fades, warms). kitPersonReveal: painted orb light BEHIND the figure (a screen clip on top would wash the face). CSS sweep + dot CSS removed.
- Kit page §66.2 sample crashed with no game (#kit, S undefined) → guarded.
- Tests: promo-rules 29/29 (5 sizes, old save), painted-FX run (log glowburst, glow-gold, spark, petal-gold, jade; 0 .kmfx dots, 0 errors),
  promo-exam 17/18 (old-save step fails on main too), reward-box PASS, item-gain no fails, stipend errs [], kit-page 37 samples 0 bad (755, 1366),
  390x844 rotate prompt, no overflow.
- Follow-ups (art, not blocking): per-rank Đeo eo pendants, middle-rank Đeo tay bangles (now vongngoc r0–4 repeats each rank), per-rank Túi thơm,
  maid robes per maid rank; servant-road edict animation.
- r1 (after main 2afdafc39): kit consistency — kitPersonReveal's card copied the reward-list frame values privately; now ONE rule
  `.kmlist,.kprev-card` (j93). Re-run: promo-rules 23/23 (755, 844x390, 1366), kit-page 39 samples 0 bad, painted-FX run 0 errors.
- KIT REQUEST (ONE KIT KEEPER, owner 16/11): kit parts added/changed by this branch + review need the kit keeper's sign-off — §65 (rank chest use
  of kitReward, kitPersonReveal + .kprev), §66 (kitGloom rank-down kmRankDownHTML, kitEdict glow), j93 shared motion kit (kmSpark → painted,
  .kmlight/.kmglow/.kmember/.kmsmoke → painted atlases, .kmlist frame shared with .kprev-card, kitReward .km-long), BAL.ex.srvBar/srvCd, BAL.promo.
