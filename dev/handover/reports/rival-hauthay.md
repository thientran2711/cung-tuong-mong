# rival-hauthay — j75 rivalNight «hầu thay» two-way (law 1)

Worker: RIVAL HAUTHAY #1, session_01964izDuRCG31a2ffq84NH7, depth 4, for Foreman D #12. Branch `review/rival-hauthay` (base `review/night-final-r3` 73a09248).

PRIORITY #1 CHECK ('hầu thay rivalNight'): OD 0 | ledger 0 | claims 0 | main 0 | review/* 0 | archive 0 (prio1.sh on a shallow clone). By hand: code in j75.js:137 rivalNight, jagmaid.js:140 sendMaid wrapper (it popped her night record, but she had already got the whole night), j8.js:317 PEND.ksp «Tiến cử … hầu thay» (the player's), test dev/test/night-book-day.js case 2. Claims: row «GAP j75 rivalNight hầu-thay» = this session. No other branch works on it (chain #5 confirmed it does not touch j75 hầu-thay).

## The gap
Her «Tiến cử <maid> hầu thay» (j8 PEND.ksp option 2) is a choice on the summons BEFORE the night: she gets nothing of the night, the maid gets it (jagmaid sendMaid: amNightGain, amRise → night() / amFav). An NPC who chose the same thing (j75 rivalNight → amSendQ / npcWhy) decided it AFTER her whole night: she still got prep spend, Sủng + Ân (nightGain), the jealousy rise (pgUp), the conception roll (night(v)), pillow talk, bestow — and then the maid also got the night. jagmaid only popped the record. So an NPC got both, she got one (law 1 broken, and law 6a: two nights a day).

## The fix (one core, no number)
- j75 rivalNight: the choice moved to the top, the same point as her ksp choice. If she sends → header line + `sendMaid(v)` and return: no prep, no Sủng/Ân, no record, no pgUp, no night(v), no pillow, no bestow, her tablet bribe kept (her own nightFx is what spends S.tablet; her «Tiến cử» keeps it too). The maid's night = the same `sendMaid` call (same BAL.ag.maid keys) as the player's.
- `htCan(v)` (j75, window.htCan): the same places her cards offer «Tiến cử»: a tablet night or the custom mùng 1 / rằm night (her ksp is pushed there too); NOT a night she took (nightWhy.cause "stolen": Tranh sủng / Chặn ngự giá, set by jnf and jsteal — her nfsum card has only «Tắm gội chờ giá»), NOT his visit (S.visNpc; her empnight card has no «Tiến cử»), NOT when she has no maid or her maid is busy elsewhere (jptime ptMaidOut: nobody to send — before, the night would have been lost to nobody). S.ntk is not used: resolveTonight writes it for every holder (r1 used it and blocked every real send; the co-op check caught it).
- jagmaid: the record pop is gone (she has no record to give up); her maids' «Hầu trà khi ngự giá» (amNightTea) runs only on her own night, not when her maid served in her place.
- Player path unchanged (PEND.ksp, nightFx, sendMaid(S) untouched).

## Whole group (law 11): every NPC night road and every reader
| Road into an NPC night | Before | After |
|---|---|---|
| Tablet flip → resolveTonight → rivalNight | night + maid both | her own choice first; sends → maid only (as hers) |
| Custom mùng 1 / rằm (Hoàng hậu) | night + maid both | same as tablet (her ksp also offered) |
| Tranh sủng / Chặn ngự giá (stolen) | could send after her night | no «Tiến cử» (as hers); night plays |
| His visit (jvisit) | could send after her night | no «Tiến cử» (as hers); night plays |
| Giữ chân (giuBlocked inside rivalNight) | after her choice | sending comes first; no giữ chân fee when she sends (she has no night) |
| Agents off (BAL.ag.on 0: npcWhy + j8 sendMaid) | night + maid both | same two-way result |

| Reader of the night result | After a send |
|---|---|
| nights / nightLog → Sổ thị tẩm (j21, j2 Xem sổ, j10 Kính sự phòng hỏi), nightsIn / sat | mistress none; raised maid ONE record (amRise); favoured maid none (as her own sent maid) |
| pregnancy night() | raised maid only (her conception roll); mistress none |
| Sủng / Ân (nightGain), pg jealousy (pgUp) | mistress none; maid: his regard amNightGain (BAL.ag.maid.night) |
| pillow talk (pillowNpc), bestow / empGive (item ledger, law 6c) | not run (no item made) |
| amNightTea (her maids' tea), empMet | not run for her night; maid as the player-sent maid |
| jnf text replace (stolen) | n/a (no send on stolen nights) |
| jmem cause ledger / jledger extra nights | no night entry in jmem; no jledger on this branch |
| people (law 6b) | the maid is the same real person: raised with her name/face/age (f88Carry) or stays in the staff, favoured |
| co-op | host only: amOn false on the guest, jcoopask mutes an NPC's sendMaid on the guest, jnf resolveTonight host-only; the guest reads the merged world |

## Tests
- NEW `dev/test/rival-hauthay.js` (solo, 11 checks): NPC send → mistress unchanged in Sủng/Ân/nights/record/pg/thai/Bạc/Sức/tablet, no night(), no bestow, no tea; the maid gets the night; the player's «Tiến cử» unchanged and her maid gets the SAME number as the NPC's maid (same Sắc, fixed Math.random); real entry resolveTonight; free seat → raised maid holds the one record + the conception roll; stolen / visit / maid busy → no send, night plays; not sending → night as before; agents off → same two-way result. On the base build it FAILS 7/10 (gap proven); on this branch 11/11.
- NEW `dev/test/coop-hauthay.js` (two seats, live Worker, Fold host + iPad guest): host NPC sends → mistress gets nothing, maid raised with one record; the guest decides nothing; after the week both seats see the same mistress and the same raised maid (id, name, night). 12/12.
- Gates: see the results block below.

## Results (sha ff63a590f342d761d031e1120f39af5e842ba8d3, one at a time)
| Gate | Result |
|---|---|
| rival-hauthay.js ×10 | 10/10 ALL PASS 11/11 |
| night-book-day | PASS 2/2 |
| agmaid_check | 23/23 |
| night-final | exit 0 (also PASS on r1 4ed3663a) |
| night-multi | exit 0 |
| night-day | exit 0 |
| coop-e2e | 68/68 |
| coop-hauthay (feature co-op check, 2 seats) | 12/12 |
| quickcheck | FAIL only on G1 «frozen list grew 3930 → 4212» — INHERITED: base review/night-final-r3 73a09248 gives the same 4212 (run here), this branch adds 0. Old save ok. Perf: run 1 tab 564/420 over limit, run 2 render 218/231, tab 413/411, buổi 1047/2703 = noise; base run tab 500/495. |

SSK: review/rival-hauthay ff63a590f342d761d031e1120f39af5e842ba8d3 (TIER BIG). For chain #5 / D #12: the G1 frozen-list growth belongs to night-final-r3 (coordinator must grow the list or move the numbers), not to this branch.

## Handover (if a successor is needed)
Done: code, tests, gates, report. Left: merge newer night-final-r3 tips if chain #5 pushes before the review (none as of 21/11 ~00:00Z); worktree /home/user/wt/rh (gate scripts in /home/user/wt/rh-gates).
