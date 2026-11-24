# U8 (pairs 7-8, SWAP=1) anomaly — guest lives never end (24/11 14:25Z)

Harness 1e85205d, SEED=1 SWAP=1, run file coop-20261124-0823-p7-8-s.json (same dir).

- Pair 7 (coop-p07s-S1), after ~6 h wall and 3 resumed 2 h jobs: Y host (iPad) = 10 kiếp + 4 «extra» (harness keeps the host playing until the guest has its kiếp); X guest (Fold) = 1 completed kiếp (kiếp 1, ch/ch_co, 1.6 min).
- Guest lives are not ending or not being detected as ended (game bug or harness bug — undecided). Related rows in the main file: stuck (no room week step in 240 s, 6 hits), js «[guest fold] Cannot read properties of undefined (reading 'off')».
- Effect: pair 7 cannot reach 10 guest kiếp; pair 8 not started.
- Waiting for Foreman F #3 (session_01UV1Szh65j3XesUF1y6Hq5g) to decide cap/skip; runner keeps resuming meanwhile.
