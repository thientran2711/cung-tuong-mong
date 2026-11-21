# rv-chai-ramp — BIG REVIEW verdict (brief briefs/main83-rv-chai-ramp.md, MAIN CHÍNH 83)
PRIORITY #1 CHECK: OD 2067 (this bug, verbatim) + OD 2016 (chai zw default) + OD 2069 (chai 8.7 counted) + law 5 | main LIVE e4fd4dcf: j92 kg92Groom (no ease read before), jmgt mgLev + BAL.mgTier.lev (den.band / td_dung.band = existing per-ease band lever) | review/chai-ramp 8338d1f5 (base a4fdb642) | claims chai-ramp worker session_01Rc5AsLmuLUhQcCbodJsoEB

## VERDICT: PASS 976c5247 (review/chai-ramp-rv = review/chai-ramp 8338d1f5 + merge of LIVE e4fd4dcf; fast-forward of LIVE e4fd4dcf)
Merge: only index.html / sw.js conflicted (as expected) → took LIVE, rebuilt with dev/site/build_site.sh, committed. No reviewer code change.

## (1) Band tightens hồi 1→5, base from rank, BAL only
- j92 kg92Groom: w = (env.zw ?? wdGroomW(S)) × mgLev(env,"chai","zone"). Knob only in BAL.mgTier.lev.chai.zone = [.6, 1.6] (law 4; same lever pattern as den.band, td_dung.band; ×1.0 at ease 2 = the width she was measured on).
- Thử tay: kg82Play gives env.lv = KG82.lv (mgSet d −2..2 → ease 3.6/2.8/2/1.2/0.4). Guided round: kgReady tutor env = {lv: ease, zw} (j82 L577) → also ramps. Real play: wdGroomUI «Bắt đầu» now passes lv = mgSet("chai",{occ:"hoc"}).ease (stake rises with rank → law 5). All three paths read the same mgLev. Only kg92Groom callers are those three (grep).
- Measured (chai-ramp test, fresh life wdGroomW .50): Thử tay .66/.58/.50/.42/.34; real play rank 0 → .50, rank 6 → .30.
- Nit (not blocking): `let lv=5` fallback in real play if mgSet throws would give the widest band; mgSet cannot throw on a live S, so left as is.

## (2) Her chai 8.7 untouched; fairness
- BAL.ag.mg2.cal.k.chai = {b:8.7,n:5,at:"11/20/2026"} present after the merge; redo stamp for chai unchanged (brief: do not touch her record; OD 2067/2069).
- NPC plays: jmgt mgNpcRaw draws from BAL.ag.mg2.med (pooled per gap d) + per-kind hand; engine-independent → unchanged. mgCalBase normalises her raws with pooled mgMedD; chai now slopes with d like every other engine, which fits that normalisation better than the old flat board.
- My own independent human-hand model (scratch hm.py: aim at the centre crossing, timing N(0,sd), the board's exact `one()` score and needle speeds, n=20000), mean grade old flat → new hồi 1..5 (5-hồi mean):
  | base w | sd ms | old | new hồi1..5 | mean |
  |---|---|---|---|---|
  | .26 | 120 | 6.58 | 7.27 6.93 6.59 6.20 5.79 | 6.56 |
  | .26 | 200 | 5.09 | 5.67 5.38 5.09 4.78 4.50 | 5.08 |
  | .38 | 120 | 7.53 | 8.18 7.88 7.52 7.08 6.57 | 7.45 |
  | .50 | 60 | 9.13 | 9.34 9.25 9.13 8.98 8.72 | 9.09 |
  | .50 | 150 | 7.63 | 8.31 7.99 7.61 7.15 6.61 | 7.53 |
  | .50 | 250 | 5.90 | 6.84 6.43 5.91 5.44 4.94 | 5.91 |
  Matches the worker's numbers; 5-hồi mean within ≤0.1 of the old flat value → a new 5-hồi Thử tay stays comparable with her counted 8.7. Claim confirmed.

## (3) «every other engine already ramps» — spot-check (source of the engine function)
dan kg82Rhythm: env.lv + mgTol · ban kg82Aim: env.lv + mgTol · den tsEngSteer: mgLev den.swing/band · hoadien kgHoaDien: env.lv · tat kg82SlapBar: env.lv · td_dung (jtd): mgLev td_dung.band/kick/spill. All 6 ramp → claim holds; chai was the only "no".

## (4) Tests on 976c5247 (http server on the built worktree, root index.html)
chai-ramp ALL OK 4/4 · mg-allkinds PASS 7/7 · ag-mgcal 0 FAIL · mgcal-redo 12/12 · one-core bind / guard / text-rule / text PASS · quickcheck PASS (core gates PASS, old save ok, perf new≈live; nothing committed from it) · coop-e2e (tt/nc) 68/68 · role-parity: not run to the end (box too slow, 500 s timeout; change does not touch roles/acts).
Note for other reviewers: serving dev/index.html over python http.server gives "Invalid or unexpected token" (no charset → page decoded wrong); use the root index.html or file://.

## (5) Shots (looked; scratch only, not in git, not on CDN)
fold-hoi1 / fold-hoi5 (755x1000), ipad-hoi1 / ipad-hoi5 (1180x820), real Thử tay board via mgSet d −2 / +2: green band centred on ◈, hồi 1 ≈ 0.47 of the bar, hồi 5 ≈ 0.24 (ratio 1.94); no cut text, no overflow, no page errors; kit frame unchanged (canvas only, no new UI part, no new player text → laws 7/9/10 untouched).

## Laws touched
4 ONE CORE ✔ (one BAL lever, mgLev) · 5 HARDER AS SHE CLIMBS ✔ (per hồi + rank via mgSet) · 11 WHOLE GROUP ✔ (31-engine table in worker report, spot-checked) · 12 TWO DEVICES ✔ · 13 PRIORITY #1 ✔ (reuses mgLev/BAL.mgTier.lev, no new helper) · 16/17 ✔ (her 8.7 kept as she chose).
