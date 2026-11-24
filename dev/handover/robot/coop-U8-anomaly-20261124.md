# U8 (pairs 7-8, SWAP=1) anomaly — guest lives never end (24/11 14:25Z)

Harness 1e85205d, SEED=1 SWAP=1, run file coop-20261124-0823-p7-8-s.json (same dir).

- Pair 7 (coop-p07s-S1), after ~6 h wall and 3 resumed 2 h jobs: Y host (iPad) = 10 kiếp + 4 «extra» (harness keeps the host playing until the guest has its kiếp); X guest (Fold) = 1 completed kiếp (kiếp 1, ch/ch_co, 1.6 min).
- Guest lives are not ending or not being detected as ended (game bug or harness bug — undecided). Related rows in the main file: stuck (no room week step in 240 s, 6 hits), js «[guest fold] Cannot read properties of undefined (reading 'off')».
- Effect: pair 7 cannot reach 10 guest kiếp; pair 8 not started.
- Waiting for Foreman F #3 (session_01UV1Szh65j3XesUF1y6Hq5g) to decide cap/skip; runner keeps resuming meanwhile.

## Update 14:40Z (Foreman F #3 decision: stop host extras, close pair 7 as 10 host / 1 guest + this family; pair 8 started alone, out dir fu8-out8)
BUG FAMILY «guest life never ends» (seat X guest Fold, pair 7, SEED=1 SWAP=1, room family coop-p07s-S1):
- Guest completed only kiếp 1 (ch/ch_co, week 9, 2 min). After that the host finished kiếp 2..14 (lengths min: 10,20,2,11,10,11,34,25,12,40,9,1,61 after the first 15) while the guest's second life never produced an ending in ~6 h wall; rooms kept stepping weeks (host kiếp end → fresh room each time), so turns DO advance for the room, the guest life just never reports an ending.
- Not captured by this harness version: guest's week/year/rank at the cut and the last 20 actions (harness logs only per-life summary + stuck snapshots). Closest evidence: stuck row (6–9 hits) host/guest both buoi 3 week 11, next:true, pend:false, Q:0, peer:true, repro save saves/coop-20261124-0823-p7-8-s-yr97b6.json (same file dir); guest JS error «Cannot read properties of undefined (reading 'off')».
- Suspect: guest page not detecting its own life end / ending screen in the room flow, or guest stuck in a non-ending loop while host rooms rotate. Fixer: reproduce with the repro save and SWAP=1, watch the guest page after host kiếp 2.
- Pair 7 closed here: host 10 kiếp (+4 extra, stopped), guest 1 kiếp.

## Update 16:30Z pair 8 (coop-p08s-S1, fu8-out8, file coop-20261124-1426-p8-8-s.*)
Same family, opposite seat: after 2 h guest X (Fold) has 3 kiếp, host Y (iPad) only 1 (bd/bd_tuyet) and its kiếp 2 not ending. So «one seat's life never ends while the other seat cycles» hits either seat; room keeps stepping weeks (room NUQH 34 weeks, turn p95 66 s, stuck). Pair 8 resumed (2nd job).

## Check 18:27Z (pair 8, 4 h in): guest 7 kiếp (weeks 6,16,26,9,24,28,39), host 3 kiếp (weeks 25, 152, 152). Host kiếp 2 ran to week 152 (76 min) before ending; host kiếp 3 ended at week 152 in 0 min (suspicious: same week count, looks like the previous life's counter). The never-ending host life = host kiếp 2, reached week 152.

## FINAL 20:30Z (F #3 wind-down; harness gap = night picture not tapped, fix on review/robot10-coop-stuckcap)
- TAG for every «stuck» row in coop-20261124-0823-p7-8-s.* (pair 7) and coop-20261124-1426-p8-8-s.* (pair 8): **harness: night-picture tap (stuckcap)**. Snapshots all show buoi 3, next:true, pend:false, Q:0, st open, peer:true on both seats = room waiting at the night step, consistent with the untapped night picture (not verified on screens).
- TAG the «one seat's life never ends» rows (pair 7 guest, pair 8 host kiếp 2 week 152) **stuckcap (probable)**: rooms rotated on stuck/rejoin, so the slow seat's life most likely sat on the night picture; not individually verified.
- Counts. Pair 7 (SWAP=1): host 10 (+4 extra stopped), guest 1. Pair 8 (SWAP=1): guest 10 (+2 extra), host 4. Not completed: pair 7 guest 9 kiếp, pair 8 host 6 kiếp (round 2 on fixed harness).
