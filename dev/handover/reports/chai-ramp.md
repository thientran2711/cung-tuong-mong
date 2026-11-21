# chai-ramp — worker report (MAIN CHÍNH 83 brief briefs/main83-chai-ramp.md)
PRIORITY #1 CHECK: OD 2016 (chai zw default, fixed 20/11), OD 2067 (this bug), law 5 | main: j92.js kg92Groom (w = env.zw ?? wdGroomW, no ease read), jmgt mgLev + BAL.mgTier.lev (den.band, td_dung.band = the existing per-ease band lever) | review/* none on chai ramp (hoadien-easy runs on hoadien, not touched) | claims none

## Result: review/chai-ramp 8338d1f5 (base origin/main a4fdb642) — SẴN SÀNG KIỂM
Owner bug: Chải chuốt green «đúng phẩm» band kept one width for all 5 Thử tay hồi.
Root cause: kg92Groom was the ONLY engine of the 31 kinds that never read the board ease (env.lv); every other engine narrows via jmgt mgTol / mgLev / mgFull / mgMore / mgPace / mgTierOf.
Fix (reuse, no new helper, BAL only — law 4):
- jbal2.js BAL.mgTier.lev.chai = {zone:[.6,1.6]} (value at ease 0 / ease 5, same lever pattern as den.band, td_dung.band).
- j92.js kg92Groom: w = (env.zw ?? wdGroomW(S)) × mgLev(env,"chai","zone"). Base width still wdGroomW (Tài, khéo tay, ma ma); ×1.0 at ease 2 = the width she was calibrated on.
- j92.js wdGroomUI «Bắt đầu»: real play now passes lv = mgSet("chai",{occ:"hoc"}).ease (her seat: rank, law 5) — set after the guided round (which sets its own easiest-hồi ease). Thử tay (mgCalRun → mgSet d) and the guided round (kgReady env.lv) needed no change.
- New test dev/test/chai-ramp.js.

Band width, fresh life (wdGroomW 0.50 here): Thử tay hồi 1..5 (ease 3.6/2.8/2/1.2/0.4) = 0.66 / 0.58 / 0.50 / 0.42 / 0.34 (before: 0.50 all five). Real play rank 0 → 0.50, rank 6 → 0.30.

## WHOLE GROUP (law 11) — every KG82_ENG engine: does it tighten across hồi?
Static: in-page scan of each engine's source for env.lv / mgTol / mgLev / mgFull / mgMore / mgPace / mgTierOf / nwTier / nwqTier (wrappers followed by hand).
Dynamic: dev/measure/mg-bots.js MGBOT_ALL31, skilled bot, n=12, ease 3.6 (hồi 1) vs 0.4 (hồi 5), BEFORE this fix.
| kind | engine | how it ramps | skilled mean hồi1 → hồi5 |
|---|---|---|---|
| dan, hat | rhythm / hold | env.lv + mgTol hit window (hat mgFull) | 9.0→8.0 / 10→5.3 |
| co | go | mgLev lim/fast/extra + mgPace | 9.33→8.79 |
| dauho | fling | mgLev aid/mouth/pull | 9.72→9.56 |
| ban | aim | mgTol | 7.15→5.21 |
| tho | calli | nwTier + mgFull + mgPace | 9.36→7.36 |
| doi | doiline | nwTier + mgPace | 9.95→8.36 |
| doden | lamp | mgPace | 9.78→7.45 |
| ve, kinh, may | trace (kinh/may wrap k91Trace) | mgTol + mgFull | 9.55→7.54 / 9.98→7.62 / 9.89→8.04 |
| hoa | arrange (wrap k91Arrange) | env.lv piece count | 9.74→9.22 |
| theu | pattern | mgMore (longer pattern) + shorter show time (env.lv) | 9.35→9.41 (oracle bot has perfect memory; ramp is static yes) |
| kim | untangle | mgTol + mgPace | 10→9.51 |
| mua | steps | mgMore + mgLev beat/sp | 8.1→3.67 |
| banh | cook (wrap k91Cook) | mgLev lag/gust/gap | 10→7.85 |
| huong | blend | mgTol | 9.68→9.21 |
| td_cong/dung/ngon/hanh | td* | mgLev tol / band / win / lim | 9.36→6.31 / 10→6.94 / 9.97→7.87 / 9.12→5.31 |
| duho | tspluck | mgFull | 9.88→7.81 |
| den | tssteer | mgLev band | 9.07→7.95 |
| hoadien | hoadien | env.lv | 7.84→6.37 |
| tat, ne | slapbar | env.lv | 7.33→5.33 / 8.33→3.33 |
| le, tc, thq, xa | nwq lay/sort/seat/clue | nwqTier (KG82.tier from mgSet d) | 9.91→8.13 / 10→8.72 / 9.91→8.17 / 9.92→7.46 |
| **chai** | groom | **NONE → fixed** (mgLev zone) | 1.71→1.87 before (flat) |
Only "no" = chai. Nothing else to fix.

## NPC curve / cal re-measure (changed engine: chai only)
- NPC plays (jmgt mgNpcRaw) draw from BAL.ag.mg2.med (pooled per gap d) + hand ctr/sd per kind — engine-independent formulas; mgCalBase normalises her rounds with the same pooled mgMedD. No number changed; her chai 8.7 record untouched.
- mg-bots skilled bot cannot play chai (before 1.7, after 1.4–2.5; the random bot beats it) — a pre-existing bot fault on this board, not a measure of difficulty. Random bot after: hồi1 3.85 → 3.73 → 2.90 → 2.60 → hồi5 2.45 (n=30).
- Human-hand model on the board formulas (/home/user/wt/chai-out/human.js style: aim at the centre crossing, timing error N(0,sd)), mean grade before → after hồi1..5:
  base 0.26 sd120ms: 6.60 flat → 7.28 / 6.94 / 6.59 / 6.18 / 5.78 ; base 0.38 sd120: 7.54 flat → 8.18 / 7.87 / 7.52 / 7.07 / 6.56 ; base 0.5 sd60: 9.14 flat → 9.35 / 9.26 / 9.13 / 8.98 / 8.72.
  Mean of the 5 hồi ≈ the old flat value, so a 5-hồi Thử tay base stays comparable with her counted 8.7.

## Tests (http server on the built worktree)
chai-ramp ALL OK (4/4) · mg-allkinds PASS 7/7 · ag-mgcal 0 FAIL · mgcal-redo 12/12 · one-core bind/guard/text-rule/text PASS · quickcheck PASS (only "NOT BUILT" before commit; built + committed) · coop-e2e (tt/nc) 68/68.
## Shots (looked): CDN img/_review/chai-ramp/ — fold-hoi1, fold-hoi5, ipad-hoi1, ipad-hoi5 (Fold 755x1000, iPad 1180x820; real Thử tay run played through hồi 1→5). Band ≈ 2/3 of the bar at hồi 1, ≈ 1/3 at hồi 5.
