# review night-multi-kem — reviewer session_01964izDB3m7tHHRtbyaUBZX (depth 1, START_CTX 0%) — SMALL tier

PRIORITY #1 CHECK: OD 0 | ledger 0 | claims D #18 night-multi-kem | main 0 | review/* night-multi-kem b026f747 | archive 0.

## Verdict: PASS — LAND READY review/night-multi-kem-rv b979f5a441e0068ed76634413720014ac65ea351 (FF from LIVE 7303aa58)

1. Diff: LIVE origin/main 7303aa58 merged onto review/night-multi-kem-rv (b979f5a441e0068ed76634413720014ac65ea351); `git diff origin/main..HEAD` = ONLY dev/test/night-multi.js (+11/-5). Game bytes identical to LIVE.
2. Case 6 is stronger: walks {none, nồng nàn, lạnh lùng, both}; parses the number from the printed «Giữ chân Hoàng thượng» card text and compares it with the Sủng keepNoSteal really adds (S.sung delta, through ap→apply→sg); also requires rung text and applied>0 for every set. A card printing a typed +2 would give shown 2 vs applied 3/1 → red. Seen: none 2/2, nồng nàn 3/3, lạnh lùng 1/1, both 2/2.
   Independent group spot-check (own probe, card text vs ap() delta): none / nồng nàn / lạnh lùng — Tranh sủng lose -3/-4/-3 and win +1; Chặn ngự giá lose -8/-10/-8, win +8/+10/+6; all shown == applied. Matches the worker's table.
3. Gates (build = LIVE + test change): night-multi x10: 10/10 green, 0 red in case 6, case 7 green all 10 (no ledger flake) · night-final PASS · balance-core PASS · one-core-guard PASS (fails 0) · sg-card-scan PASS · quickcheck PASS (249 s) · coop-e2e x1 129/129 (guest-stuck flake not seen on the new LIVE; single run).
