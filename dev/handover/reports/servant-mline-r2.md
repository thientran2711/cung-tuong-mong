SẴN SÀNG KIỂM c3e1cacd7b272788a2a6aa2d6b82788792d12fdb
# review/servant-mline-r2 — worker fixes of the reviewer FAIL (dev/handover/reports/review-servant-mline-r1.md), Foreman D
Branch review/servant-mline-r2 @c3e1cacd (= review/servant-mline-r1 93b39ee3 + merge origin/main 399483e3 + fixes). START_CTX ~3 % of the window.
Details: dev/PROGRESS_review-servant-mline-r2.md on the branch.

## Done (every FAIL item)
1. Gain and loss — one caught key per act in BAL.mline: frameCatch 30, poisonCatch 40, hitCatch 30 (beating: always a deed, hitEv 30 proof).
   Caught → true deed on the master (jtruth), proof evN×w + oán caughtOan×w to ANY victim's mistress, master Đức −caughtDuc×w (3), Danh −caughtDanh (2);
   framed maid cleared, framer kneels; poisoner to Thận hình ti. Her own maid caught: no deed/proof on her (she gave no order), her Danh −2, victim resents her.
   feudEv removed. use: useBac 20 bạc + useTurn 35 % the risen maid turns her back; "losing favour" = Sủng ≥ useGap 20 under the harem median
   (old Sủng < 30 never met a master who had maids: use was 0 in r1). j14 rise literals 60/25 → BAL.mline.riseLoy/riseRel.
2. Co-op family — on the guest: servRanks NPC half, jaudit đề bạt, servMonth NPC half (loyalty, NPC-vs-NPC spies, refill) skipped; NPC maids feud
   with HER maids and NPC consorts hit HER maids on the guest (her household is a target in co-op); NPC-vs-NPC + her maids attacking NPC maids: host only.
3. Wording "X, người hầu của <chủ>"; seekCd 6 months (BAL key).

## Before / after (dev/measure/sim_maidline_r2.js)
| per 25-year life, mean (Tai mắt 3, 3 maids of her own, she does nothing) | before r1 (4 runs) | after r2 (5 runs) |
|---|---|---|
| feud: frame | 8.8 | 9.0 |
|   caught (frameCatch 30) | 0.0 | 2.4 |
| feud: poison | 4.8 | 2.0 |
|   caught (poisonCatch 40) | 0.0 | 1.2 |
| feud: fight | 12.2 | 7.8 |
| hit: frame | 37.0 | 34.0 |
|   caught (hitCatch 30) | 0.0 | 11.8 |
| hit: beat (always a deed) | 8.0 | 7.0 |
| hit: bribe | 29.0 | 28.8 |
| framed maid thrown out | 10.8 | 4.8 |
| poisoned maid died | 1.2 | 0.2 |
| poisoner sent to Thận hình ti | 0.0 | 1.2 |
| use (master pushes her maid) | 0.0 | 0.4 |
|   bạc paid for use (useBac 20) | 0.0 | 8.0 |
|   used maid rose and turned (useTurn 35) | 0.0 | 0.0 |
| seek starts (seekCd 6) | 102.8 | 67.8 |
| NPC maid rises | 12.5 | 12.4 |
|   of them while seeking | 3.2 | 2.2 |
| deeds written on masters in the maid line | 29.0 | 51.2 |
| proof given to victims' mistresses | 25.2 | 43.4 |
|   of it to her | 2.2 | 4.0 |
| masters' Đức lost | 0.0 | 49.8 |
| masters' Danh lost | 0.0 | 30.8 |
| masters' bạc spent (bribe + use) | 791.2 | 770.0 |
| her Danh lost (her maid caught) | 0.0 | 0.0 |
| her maids targeted | 6.0 | 6.6 |
| her Sổ ghi lines (Tai mắt 3) | 192.2 | 143.6 |
| max lines in one month | 3.8 | 3.6 |

Co-op guest guard (dev/test/mline-guest.js, 36 months, same start as host vs as guest seat):
| NPC-only change on the guest | before (r1) | after (r2) |
|---|---|---|
| NPC staff merit | 612 | 0 |
| NPC maid rises | 0 | 0 |
| NPC staff refills | 360 | 0 |
| NPC staff loyalty decay | 487 | 0 |
| NPC bạc drops (wages) | 145 | 3 (NPC bribes aimed at her) |

## Tests
mline-guest PASS; mline-oldsave (main save, 24 months) ok 0 errors; coop-e2e 59/59 (first run 59/60 "fold #next enabled", timing, rerun clean);
evtruth-scan: no new unchecked evA (2 old in jlost.js); mline-shots 755x1000@2, 1000x755, 1180x820@2, 1366x1024@2, 844x390, 390x844: no overflow, 0 errors, no %.

## For the coordinator (not mine)
A. SEATCAP over cap in long sims (pre-existing, also with __mloff=1) — needs its own item.
B. Face pool full in most months → most eye hits wasted (part B H9).
C. NEW: a co-op GUEST's own maid cannot rise to consort: a rival made on the guest is dropped by the week merge (PROTOCOL §4.4, new ids
   under W are host-only). I turned rises off on the guest (else her maid vanished and no consort appeared). Needs a protocol hook (guest asks
   the host to create the consort) — co-op owner's item.
D. Co-op: NPC-maid side effects of an NPC→her act made on the guest (e.g. the NPC framer's loyalty) are host-wins in the merge (staff arrays have
   sid, not id); her side and the proof/oán/deed weight (numbers) do merge.
