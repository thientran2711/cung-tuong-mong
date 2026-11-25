# SEAT W9 (successor of W8, 25/11, START_CTX ~4 % of window) — review/net-ghen-2 @ e6c88875 — ROLLOVER
PRIORITY #1 CHECK: OD net-ghen / LAW 11 wave 2 (FOREMAN_D_STATUS) | main none | review/net-ghen-2 99faa7e7 (W5–W8) | claims W9 (CLAIMS.md by D). Reused: j63 kit result card (kaMorePeople), j61 KREG/k61Title/k61Desc, KIT 6b option showOut, KIT_REQUESTS K-EF-REL (already filed 24/11).

Commits: b5cfd0f3 (jky jkyRelW pasted 6x → once), b1ac65ff (site), e6c88875 (fixes below + site + 2 kit requests).

## (1) BLOCKER coop-e2e — NOT REPRODUCIBLE, no bisect target
99faa7e7 with a fresh `python3 dev/build/assemble.py` (coop-e2e serves dev/index.html): 142/142 three times in a row, and 142/142 once more under
3-core CPU load. W8's two FAIL runs (different buổi each time) were most likely a stale dev/index.html or a load spike from W8's parallel rc-scan.
Re-run on final sha: see gate table (NOT re-run on e6c88875 — next seat must).

## (2) Real-tap findings (Fold 755x1000 + iPad 1180x820 touch, drv.js/realtap.js from nt-w8/rt, setup by `read` = act-audit AA.scen('hau'))
a) FIXED j70 «Ra tay ngay» (W7 NB-a): the option got the act's full line as x, but the Bày mưu dialog is a hidden-outcome event → kitHint
   turned it into lies: ĐƯỢC «không tốn bạc, thêm thể diện» (target's Danh −8 read as hers), MẤT «mất một chứng cứ, mất mạng» (the SENT maid's
   «có khi bị đánh chết» read as her death). Fix: `now.showOut=true` (KIT 6b per-option flag) → shows the act card itself (Tốn / Được Danh nàng ta −8 ·
   tin cậy … +3, Bại/Kèm folded like every kodw option). Looked at Fold + iPad shots: true numbers.
b) FIXED j63 result card: evidence held AGAINST her (evG(h,S), h.evm) was never on the card (rumor fail: «nàng ta nắm 1 chứng cứ» applied, card
   showed only thiện cảm −5 / oán +5). rsnap keeps `evOn` per consort/servant; row «<tên>: nắm chứng cứ về ta ±N» (Mất when it rises).
   Unit check in page: «Hoàng hậu …: nắm chứng cứ về ta +1» under Mất. rc-scan.js now snapshots `rv.<name>.evon` (rc-sum family «consort evon»).
c) FIXED j63 familiarity rows via KREG: every person whose S.known step rose (men, Thái y, court), not only consorts/servants; who-words k61Title / k61Desc.
d) KIT REQUEST (filed, dev/kit/KIT_REQUESTS.md end): rumor WIN on iPad — Hoàng hậu Danh 65→57 (preview «Danh nàng ta −8 · tin cậy … +3») and the
   card says «ta không được gì». The card has no row kind for a consort's Danh/Sủng, a servant's tin cậy, or a servant who leaves (W8 residual a). rc-sum
   SKIPs rv.*.danh/sung and staff.* — so the scan cannot see this family until the kit rule exists.
e) K-EF-REL (existing request, note added): «tin cậy Thái giám Tiểu Quế Tử +3» chip 31 px past the option body on Fold (`.ef.kef1` nowrap).
f) Seen, not fixed: a sent servant's return result shows under the NEXT act's title (rumor result under «Kết giao»; sentence is right).

## (3) rc-scan (dau,hau)
| run | runs | not named | familiarity | servant af/loyal | her stat |
|---|---|---|---|---|---|
| 99faa7e7 site (before) | 599 | 46 | 16 | 12/12 | 6 |
| after KREG fix (pre-evOn build) | 1022 | 21 | 3 (Thỉnh an arrival = W8 residual b) | 8/8 («Đổi người» / servant leaves = residual a) | 2 (Múa LOSE Sủng = residual c) |
Consort chứng cứ (stranger): 0 changes occurred in both runs (cannot confirm W8's fix by scan; code path read OK). evOn family: NOT yet scanned (re-run).
Also seen in run 1 only: «Để ý một nam nhân áo gấm» / «Xin rút thẻ bài» Bạc 380→395 win+lose not named (likely stipend landing during the act).

## (4) Gates on e6c88875 (source) — partial
| gate | result |
|---|---|
| build (assemble + build_site) | OK |
| one-core-guard / -text / -text-rule / -bind | PASS (bind 1524 prints, 0 mismatches) |
| c6-cancel-scan | 0 cards |
| relshow-rt | PASS |
| net-build | PASS |
| relshow-scan --fail-raw | FAIL exit 1: RAW oán 2 / aff 27 (list: `python3 dev/test/relshow-scan.py --list`). SAME on 99faa7e7 and even on 1ac2e2a7 (W6 «RAW 0»): W5–W8's RAW 0 is not reproducible here; not caused by W9. Sites: j24:24/25/28, j25:93, j30:26, j55:185/218, j68e:100, j7:78, j70:462, j71:126/190, j72:525/527, j78:126/159/187/190/191×2/195, j9:130×2, jaudit:25, jgift:28, jpoison:91, jts:412, jtsb:235/237 |
| two-way-oldsave (old = origin/main build) | exit 0, no page errors — but its week loop left turn 0 on both builds (tool limitation) |
| coop-e2e | 99faa7e7 4/4 PASS; NOT re-run on e6c88875 |
| quickcheck ALONE | NOT RUN |
| real taps | Fold: Tung tin đồn full flow (dialog, warning, minigame skip, Bày mưu, Ra tay ngay, servant return), Kết giao. iPad: Tung tin đồn → Ra tay ngay → return. NOT done: Tát, Phạt quỳ, Ngáng chân, Bỏ phấn lạ, Ban thưởng (rank 7 setup triggers promo chest), gift, Hỏi han, elder Hỏi chuyện/Biếu, court Biếu |

## HANDOVER (next seat)
1. Sparse worktree of review/net-ghen-2 (e6c88875); `python3 dev/build/assemble.py`; `bash dev/site/build_site.sh`.
2. Re-run coop-e2e on the final sha (serve dev/index.html fresh), quickcheck ALONE (`bash dev/tools/quickcheck.sh`), rc-scan dau,hau (~8 min here) + rc-sum (check «consort evon» 0 not named).
3. relshow-scan RAW 29: ask Foreman D whether the gate is valid as written (W5–W8 claimed 0; 0 does not reproduce at their own commits) or wire the 29 sites to pvQuy/pvOan.
4. Remaining real taps from the list above, Fold + iPad (IPT=1); tools: copy dev/handover/reports/nt-w8/rt/*.js, set ROOT in drv.js, RTD for c.sh; setup = `read` that evals act-audit LIB then AA.scen('hau'), removes .kmov/#kroul, hides #modal, Q.length=0; wait ~8 s after reload for the load card.
5. Foreman rulings needed: kit request (2)d (rows for other people's stats / lost servant), residuals b, c, f.
6. Then SSK to Foreman D.
