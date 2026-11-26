# flight2-s3f — BLOCKED-SAVE-QUOTA (game save stops growing at 5,213,477 chars)
Runner: slot 3 (s3 runner). Life flight2-s3f (iPad, bot=cautious, seed 2026112519). Stopped 11/26 13:50Z by F #23 order. End tag BLOCKED-SAVE-QUOTA (not VALID, also MIXED-BUILD, see BUILD-TIMELINE below).

## Proof
- Harness ckpt «ls» snapshot at 13:44:12Z: localStorage key hclh-save-v2-1 = 5,213,477 chars, parsed S = year 21, turn 240, tuần 2, buổi 1 (the buổi ~3010 resume point of 12:34Z).
- Live run at that moment: R.buoi = 3214, year 22 (log: STATUS buổi 3188 year 22, CP buổi 3210 year 22).
- So the save write has failed since ~b3010. First frozen CP: buổi 3060 (save 5,213,477 chars, equal to the value at the b3010 resume CP); the last growing CP is buổi 2996 (5,181,961). The last CP lines after it: 3060/3110/3160/3210 all 5,213,477.
- Console errors not captured by the harness (no QuotaExceededError line available in the log).
- Cause (suspected): localStorage quota ~5M chars; game save has no compaction, grows ~+60k chars / 50 buổi.
- Consequence: any resume loses everything since ~b3010 (at stop: ~210 buổi, ~1.3 game years, ~2 h).

## Growth curve («save N chars» per CP, from flight2-s3f.log, unique buổi)
| buổi | year | save chars |
|---|---|---|
| 50 | 1 | 291293 |
| 100 | 1 | 386041 |
| 150 | 2 | 422365 |
| 200 | 2 | 479943 |
| 250 | 2 | 513178 |
| 300 | 3 | 621736 |
| 350 | 3 | 769859 |
| 400 | 3 | 778979 |
| 450 | 3 | 941297 |
| 500 | 4 | 1050069 |
| 554 | 4 | 1142138 |
| 604 | 4 | 1269171 |
| 654 | 5 | 1335660 |
| 704 | 5 | 1440746 |
| 754 | 5 | 1594427 |
| 811 | 6 | 1705364 |
| 861 | 6 | 1844580 |
| 911 | 6 | 1913978 |
| 961 | 7 | 1964486 |
| 1020 | 7 | 2103790 |
| 1070 | 7 | 2134639 |
| 1120 | 8 | 2241928 |
| 1170 | 8 | 2320861 |
| 1220 | 8 | 2370105 |
| 1270 | 9 | 2500063 |
| 1320 | 9 | 2552706 |
| 1417 | 10 | 2735266 |
| 1467 | 10 | 2838010 |
| 1517 | 10 | 2876246 |
| 1567 | 11 | 2982537 |
| 1617 | 11 | 3070114 |
| 1667 | 12 | 3157494 |
| 1717 | 12 | 3224628 |
| 1767 | 12 | 3289680 |
| 1871 | 13 | 3425033 |
| 1921 | 13 | 3523957 |
| 1990 | 14 | 3637067 |
| 2040 | 14 | 3723035 |
| 2090 | 14 | 3773831 |
| 2140 | 15 | 3850137 |
| 2208 | 15 | 3921045 |
| 2258 | 16 | 3997480 |
| 2341 | 16 | 4134987 |
| 2391 | 16 | 4224408 |
| 2441 | 17 | 4287422 |
| 2491 | 17 | 4366258 |
| 2541 | 18 | 4470960 |
| 2591 | 18 | 4512423 |
| 2645 | 18 | 4605457 |
| 2696 | 19 | 4644288 |
| 2746 | 19 | 4718703 |
| 2796 | 19 | 4830386 |
| 2846 | 20 | 4943811 |
| 2896 | 20 | 4972521 |
| 2946 | 20 | 5090247 |
| 2996 | 21 | 5181961 |
| 3060 | 21 | 5213477 |
| 3110 | 21 | 5213477 |
| 3160 | 22 | 5213477 |
| 3210 | 22 | 5213477 |

## Build timeline (MIXED-BUILD)
- 11/25 19:25Z start: game build unknown (LIVE then ~08e7d79f+ 18:33Z; 3762da08+ landed 19:34Z). Harness b4b181f8.
- 11/26 03:22Z resume on 4d7a22c6: logged GAME BUILD 3762da08+ (b fa8da73cecdc, 19:34Z).
- Resumes at 05:22, 06:11, 07:38, 08:32, 10:25, 10:41Z: build NOT logged (unknown); LIVE moved to 6b5d3d05+ at 06:59Z, so resumes after ~07:00Z probably loaded 6b5d3d05+ unless the persistent profile's service worker kept the older build.
- Harness sequence: b4b181f8 → 496b6b66 (11/25 22:19Z) → 8dc395ba (11/26 00:53Z) → 4d7a22c6 (03:22Z) → d2e03d80 (05:22Z) → fd9218fe (06:11Z) → 89f5b956 (07:38Z) → 08a4ff8b (08:32Z) → ec026335 (10:41Z).

## State at stop
buổi ~3219 · year 22 (~40 tuổi) · rank 0 · harness 2df8f5fa · bugs 4 types · stuck 4 · dead buttons 0.
