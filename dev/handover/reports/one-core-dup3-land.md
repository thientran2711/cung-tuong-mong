# one-core-dup3-land — ONE CORE stack + main batch-d8 numbers, go-live prep

PRIORITY #1 CHECK ('one-core-dup3-land'): OD ONE CORE OD:L1267 (START_CORE, read verbatim) | ledger 0 | claims B one-core-dup3-land = this session (CLAIMS:766) | main 6ca04148 (batch-d8; unchanged at 13:20Z) | review/* review/one-core-dup3-r2 3213abc8 (PASS), review/one-core-dup3-r2-main cd2810ff (trial merge, base of this branch); reused: dev/measure/one-core-eff-move.js, one-core-text-move.js, one-core-dup3-stat-move.js, one-core-dup2-same.js (proof); existing keys BAL.arc.tier, BAL.route.k.ngn_, BAL.mgTier.word, BAL.kc2.
START_CTX ≈ 4 % of 1M (get_session reads 0; estimate) → rollover ≈ 29 %, ceiling 60 %. Finished below it; no successor needed.

Branch **review/one-core-dup3-land**: cd2810ff (reviewer's token-careful trial merge of 6ca04148, jroute: main's BAL.ngh.accOan wins, BAL.route.oan.demand unread) + 05ab2d01 (numbers) + 5b001208 (CHANGE line + site) = READY candidate. See §5 for the READY sha.

## 1. Merge
- cd2810ff = the r2 reviewer's merge of 6ca04148 (12 code conflicts token-merged, 0 overlap; jroute fin = BAL.ngh.accOan; see review-one-core-dup3-r2.md §7).
- main moved again to **25bfd7cf** (makeup-theme-r1, + jmkt.js) → merged in **5507baafa**: same 4 conflicts, same resolution; guard 5093 = baseline (jmkt adds 0), text / bind PASS.
- main moved to **d0a839e8** (voice-trait-r1 + batch-s31a) while gates ran → merged in **8acca13b1**: conflicts assemble.py (= main's list incl. jtone*.js + the stack's jbaleff / jbalarc right after jbal, order of both kept), CHANGE.txt (both lines, ours on top), index.html / sw.js (generated, rebuilt). No logic conflict.
  ONE CORE on the merged code: guard NEW ladder ×2 in jstaff talkLine (voice-trait copied the greeting cuts t>=30/t>=0 and v>=10/v>-10 into 3 copies each) → **BAL.staff.say {tn:[30,0], kn:[10,-10]}** (jbal.js), tier worked out once per office; guard 5097 → 5093.
- BAL.eff.j2.start: 0 new readers (grep) — only j2 start() reads it, ready for coop-thin-b's BAL.allyRel at that merge.

## 2. The 70 guard fails → BAL (values unchanged)
| guard fail (cd2810ff) | n | moved to | how |
|---|---|---|---|
| jkc2 kcAf(…,±N) amt | 65 sites (82 calls, the whole family in jkc2) | BAL.eff.jkc2.go…go_20 / fail…fail_14 / o…o_48 | dev/measure/one-core-eff-move.js jkc2.js; the 18 x lines «… với ngươi +N» print `${balSg(key)}` (one-core-text-move.js) |
| jnroadm k:1 / k:-1 (ending tier) | 2 (+ k:0) | BAL.arc.tier.win / mid / lose | by hand (same key as j67 / j97) |
| joi ladder S.kc.r>=2?2:S.kc.r>=1?1:0 | 1 | reads S.kc.r (the entry tier kcEnter got: jkc kcDien `sc>=C[2]?2:sc>=C[1]?1:0`, fall = 0) | by hand; Math.max(0,+S.kc.r||0) = the old ladder for 0..2 |
| jkh rtCard «Tâu xin nghiệm thân» k:1 | 1 | BAL.route.k.ngn_ (the SAME card as jroute's ngn_; jkh skips when ngn_ is shown) — one key, no new key | by hand |
| jentry typed copy [3,5,7,9] of BAL.mgTier.word | 1 | BAL.mgTier.word[3] (the dead fallback copy dropped) | by hand |

## 3. Extra finds in batch-d8's code (kinds the guard did not count) — moved
jkc2.js is new in batch-d8 (origin-intros); its BAL.kc2 move left these typed:
| family | n | moved to |
|---|---|---|
| person stat writes x.me / .tin / .loyal (stack's stat family) | 11 | BAL.eff.jkc2.meGo… / meO… / tinKc2EnterSrv / loyalKc2EnterNc / tinKc2SelDo (one-core-dup3-stat-move.js) |
| home-stat + oán writes S.kap / S.kgt ±= N, x.oan += N | 66 | BAL.eff.jkc2.kapGo… / kgtO… / oanO… (dev/measure/one-core-land-kc2-sw-move.js = stat-move with oan/kap/kgt/khm) |
| card odds base od(N+…) | 17 | BAL.kc2.<card>_od (dev/measure/one-core-land-kc2-move.js) |
| event option odds base roll(N±…) | 21 | BAL.kc2.<option>_rb (same script) |
| card c / w / l kap / kgt / khm amounts | 13 | BAL.kc2.<card>_<slot>_<stat> (same script) |
| home-stat starts / cuts / set-values (S.kgt=40+R(20), S.kap>=100 siết, >=90 phe chủ chiến, >=55 / >=50 events, «Siết nợ» / «Triều đình» set-values, kgt<25 / kap>=70 / kap>=50 HUD cuts, bd bonus 15, nc month +4 (+1)) | 41 reads (incl. 2 help texts, 5 kgtLow in jkc2) | BAL.kc2.st (one block in jbal2 with comment) |
| text copies: help «Tới 100 chủ nợ đến siết», «tới 90 họ ra tay» | 2 | print `${BAL.kc2.st.dan.siet}` / `${BAL.kc2.st.nc.pha}` |
| duplicate cut kgt<25 (red Gia thanh) in jkc.js AND jkc2.js | 2 + 5 | ONE key BAL.kc2.st.kgtLow |

Guard grown for the future: new kinds **odb** (od(N…) / roll(N±…)), **hst** (card {kap/kgt/khm:N}, S.kap/kgt/khm/kgtu compare/assign N), **oan** (x.oan±=N) — frozen with one `--update` (no --allow-grow; refused growth = none); maskBal now also masks `Object.assign(BAL.x,{…})` blocks (BAL.kc2 / BAL.net.k). Plants on a copy: od(60 / {kap:-12} / S.kap>=55 in jkc2 → 3 NEW FAILs. Old kinds 4708 → **4693** (shrank 15).

NOT moved (left for a follow-up wave; frozen by the new kinds, may only shrink): odb 397 game-wide (j42 34, j68e 32, j2 27, jroute 24, j68f 23, j7 20, j71 19, jkc 45 …); jkc.js hst 47 + oan 12 (pre-batch-d8 tiểu thư home road); jkc2 family ages 50+R(8)…, event weights add(id,w), month windows, clamps Math.min(30/400…), S.bac caps — not amounts/thresholds of a shown rule.
**FINDING for Foreman B (pre-existing, jkc.js, not changed here):** the tiểu thư help «Áp lực hôn sự … Từ 60 nhà bàn chuyện gả ngươi; tới 85 cha định hôn» (jkc:47 + KIT_GLOSS jkc:596) does not match the rules: suitors come at S.kap>=40 (jkc:320), the forced match at S.kap>=90 (jkc:321); 60 is only the red HUD cut. The exact OD:L1267 example (text says one number, the rule another). Fix = a jkc wave: keys for 40 / 60 / 90 and the help prints them (changes player words 60→40, 85→90).

## 4. Gates
| gate | 5b001208 (on 6ca04148) | 8acca13b1 (+ d0a839e8) | 5507baafa (+ 25bfd7cf) = READY |
|---|---|---|---|
| one-core-guard | PASS 4693 old kinds (was 4708) + 404 new-kind sites frozen = 5097 | PASS 5093 (jstaff −4) | PASS 5093 |
| one-core-text / one-core-bind | PASS 0 / 848 prints, 0 mismatches | PASS / PASS | PASS / PASS |
| proof one-core-dup2-same | cd2810ff → 05ab2d01 SAME (257 refs; INTENDED jentry entExam, joi kcDien, jkc2 KC2W) | 5b001208 + REF2 origin/main: SAME except INTENDED jstaff talkLine + main's new files jtone* (cannot compare) | (merge only) |
| quickcheck (core gates, open, old save solo, perf) | PASS | PASS | PASS via golive.sh (render 163/151, tab 220/227, buổi 793/648 ms) |
| greet_check | 13/13 (1 run AG-MEET 'cards 0' random sample → reran 13/13 ×2) | 13/13 | 13/13 |
| road-rare / road-end | ALL PASS / 51/51 | ALL PASS / 51/51 | — (no road code changed after 8acca13b1) |
| coop-one-world (old room = old co-op save + single) | PASS | PASS | PASS |
| coop-e2e | 63/63 first try | 63/63 | 63/63 |
| voice-trait-shots / tone-pool-check (jstaff touched) | — | PASS / PASS (looked: staff kn line Fold) | — |
| Fold 755x1000@2 · iPad 1180x820@2 | kc-roads/route.js cnv + nc (home, go, rv, palace) 0 fails; KC2W help words identical on both, 0 page errors | — | dev/tools/shots.js 10+10 shots, SHOTS OK (0 page errors, no h-overflow); looked at home / act / go |
Shots in /home/user/wt/ocland-tmp (scratch, deleted at the end), none in git, no CDN folder.

## 5. READY
**READY FF 5507baafa** (review/one-core-dup3-land; contains live main 25bfd7cf). CHANGE line (top of dev/site/CHANGE.txt): «Mọi con số trong game nay cùng đọc từ một sổ chung: lời báo được mất, số chứng cứ, công lao, giá mỗi việc và các ngưỡng ở nhà trước ngày vào cung đều khớp đúng với điều thật sự xảy ra.»
tier.js = BIG (merge touches many modules; foreman's delta review = the merges + the moved numbers). `bash dev/tools/golive.sh 5507baafa` → "checks OK. To go live run again with --yes". Not pushed to main.
If main moves again before --yes: merge (assemble = main's list + jbaleff/jbalarc after jbal; CHANGE both lines; generated rebuilt) and rerun guard/text/bind.
Delta for the reviewer: commits 05ab2d01 (numbers), 5b001208 (CHANGE+site), 8acca13b1 (merge d0a839e8 + jstaff BAL.staff.say), 5507baafa (merge 25bfd7cf). New scripts: dev/measure/one-core-land-kc2-move.js, one-core-land-kc2-sw-move.js. Guard change: dev/test/one-core-guard.js (odb / hst / oan kinds, maskBal Object.assign(BAL.x,{…})).
