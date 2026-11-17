# review-one-core-dup3-land — delta re-review 3213abc8 → 5507baafa (opus, BIG)

PRIORITY #1 CHECK ('one-core-dup3-land'): OD ONE CORE OD:L1267 + go-live OD:L1370 (START_CORE read in full) | ledger 0 | claims B one-core-dup3-land session_01N1tNP33c2NR3dwmam25S4X READY FF 5507baafa; this review CLAIMS:790 | main 25bfd7cf (unchanged at verdict; ancestor of 5507baafa) | review/* review/one-core-dup3-land 5507baafa, review/one-core-dup3-r2 3213abc8 (PASS). Reused: dev/tools/quickcheck.sh, shots.js, the repo gates. No code written in the repo.
START_CTX ≈ 3 % of 1M (estimate) → rollover 28 %, ceiling 60 %. Finished well below; no successor needed.

## VERDICT: PASS review/one-core-dup3-land 5507baafa
No fix needed, so no -r1 branch. main 25bfd7cf is an ancestor (FF-able). If main moves before go-live, it goes back to the land worker.

## 1. Merge lost nothing (independent re-merge, token level)
Re-merged every file myself: base 65dcf52f (merge-base of 3213abc8 and 25bfd7cf), ours 3213abc8, theirs main 25bfd7cf, compared with 5507baafa (351 files).
- 286 files EQUAL to the clean 3-way result (O-only 103, T-only 183 incl. batch-d8 / voice-trait / makeup-theme / jtone* / jmkt files untouched by the stack = byte-identical to main).
- 13 code files with line conflicts (j22 j23 j28 j67 j8 j97 jcmaid jlost jrd_cn jroute jthaiy jkc jstaff): token-level 3-way merge is clean and EQUAL to 5507baafa for j22 j23 j28 j67 j8 j97 jcmaid jrd_cn jthaiy. Residuals only:
  - jlost: 3 token conflicts (stack's balAb/balSg prints vs main's text edits) — checked by hand: all 19 main hunks present (raiseK / thief / loLoseE / loGoneOwner / loHigh / loEmpEv / il* conservation / «Tâu Hoàng thượng xin soát cung» …; LO.* reads same counts as main), stack's BAL.eff.jlost prints kept.
  - jroute: blood-test fin = main's BAL.ngh.accOan (stack's BAL.route.oan.demand dropped; as decided in r2 §7).
  - jkc: only kgt<25 → BAL.kc2.st.kgtLow (land move, value 25).
  - jstaff: only talkLine → BAL.staff.say (see §2).
- assemble.py list = main's list exactly + jbaleff.js, jbalarc.js right after jbal.js (diff of the two lists: only those 2 lines).
- generated index.html / sw.js / assets.json: quickcheck step 1 rebuilt the site from 5507baafa and it came out the same (only the build line may differ).
- BAL runtime dump (jbal + jbaleff + jbalarc + jbal2 evaluated): every key of main 25bfd7cf has the same value in 5507baafa (0 changed / 0 removed). Every key of 3213abc8 same too, except mgTier.occ.tuyen[0] 1.5→1 = main's own later override (main has 1 too).

## 2. Moved numbers keep their value
Own check (not the worker's script): every BAL.<path>, ${balSg()} / ${balAb()} in a file inlined with its runtime value, then token-compared with main 25bfd7cf:
| file | residual vs main | note |
|---|---|---|
| jkc2.js (82 kcAf, 11 me/tin/loyal, 66 kap/kgt/oan writes, 17 od, 21 roll, 13 card slots, 41 st reads, help texts) | 0 | value-identical incl. the printed help words |
| jkh.js (rtCard k → BAL.route.k.ngn_) | 0 | |
| jnroadm.js (k:1/0/-1 → BAL.arc.tier.win/mid/lose) | 0 | |
| joi.js | ladder → Math.max(0,+S.kc.r||0) | INTENDED, real: S.kc.r is set only by kcEnter(rank), rank = sc>=C[2]?2:sc>=C[1]?1:0 (jkc:523/530) → 0..2 integer; missing r (old save) → 0 = old ladder |
| jentry.js | dead fallback copy [3,5,7,9] dropped | INTENDED, real: BAL.mgTier.word = [3,5,7,9] (jbal2, loads at 130, jentry at 297) |
| jstaff.js | ladder → BAL.staff.say {tn:[30,0], kn:[10,-10]} | INTENDED, same cuts: tn t>=30 hi / t>=0 mid; kn v>=10 hi / v>-10 mid; pool name w[0].toUpperCase()+w.slice(1) = Hi/Mid/Lo |
Texts print the key the rule reads: help «Tới ${siet}» / «tới ${pha}» (jkc2:52/55) and the rules (jkc2:283-284 / 307-308) read the same BAL.kc2.st.dan.siet / nc.pha; kgtLow is one key read by jkc (566, 615) and jkc2 (426-456).

## 3. New guard kinds odb / hst / oan
- Baseline 3213abc8 → 5507baafa: old 15 kinds: 0 entries grew (scripted compare per file/kind/site); new kinds frozen: odb 345, hst 47, oan 12 (jkc2 = 0 in every kind; jkc keeps hst 47 / oan 12 / odb 45 for the follow-up).
- Plant on the worktree copy (od(61+1), x.oan+=3, S.kap>=57, S.kgt=33, c:{kap:-9}): 5 NEW FAILs; `--update` without --allow-grow → REFUSED. Plant removed, tree clean.
- maskBal / dup-set check now also read Object.assign(BAL.x,{…}): can only add findings, not hide any.

## 4. Gates on 5507baafa (main 25bfd7cf = live)
| gate | result |
|---|---|
| one-core-guard / text / bind | PASS 5093=5093 / 0 sites / 848 prints 0 mismatches |
| quickcheck (own build, core gates incl. kit-conform + coop-one-world, time-spill, open Fold, old save solo from live, perf iPad) | PASS 330 s; old save ok; render 204/190, tab 313/315, buổi 889/844 ms (new/live) |
| coop-e2e | 63/63 first try |
| coop-one-world (old room = old co-op save) | PASS (in quickcheck core gates) |
| road-rare / road-end | ALL PASS / 51/51 |
| greet_check | ALL 13 PASS |
| tone-pool-check / voice-trait / voice-trait-shots | OK 86 pools / PASS no page errors / SHOTS OK |
| dev/tools/shots.js Fold 755x1000@2 + iPad 1180x820@2 | 10+10 SHOTS OK, 0 page errors; looked at home (Fold) and Dư đồ (iPad): fine |
(One quickcheck run of mine was spoiled by my own plant test running at the same time; killed and rerun clean = the PASS above.)
Shots in scratch outside the repo, deleted; none in git, no CDN review folder.

## 5. FINDING for Foreman B — follow-up wave (NOT fixed here)
Confirmed, pre-existing on main 25bfd7cf, jkc.js (tiểu thư home road), the exact OD:L1267 example:
- help jkc:47 «Từ 60 nhà bàn chuyện gả ngươi; tới 85 cha định hôn» and KIT_GLOSS jkc:596 «Từ 60 … tới 90 cha định hôn» — the two texts even disagree with each other (85 vs 90).
- rules: suitors come at S.kap>=40 (jkc:320), forced match at S.kap>=90 (jkc:321); 60 is only the red HUD cut, typed 5 times (jkc:566, 572, 595, 615, 638), the row shows from S.kap>=40 (jkc:572), chiêu tổ mẫu at S.kap>=50 (jkc:733).
- Wave: keys for 40 / 50 / 60 / 90 (BAL.kc2.st has kapHot:70 / kapRow:50 for jkc2 — check whether jkc's road should share them or get its own), both help texts print them (player words change 60→40, 85→90); plus the rest of jkc frozen hst 47 / oan 12 / odb 45.
