# E-TITLES3-RV — DELTA review of review/titles-daycard-lrm5 709caa80 + land head on current LIVE (reviewer session_01DgYSWosMiUvqyAgcU6zyjW, 28/11)

PRIORITY #1 CHECK ('titles-daycard-lrm5|K-XL-GROW-SAME|kitHandWants|Thôi'): main a96564ad (LIVE moved 5ad52416 → 22afefb4 lc35-ui [has kit-kri-xl-rv178 786f65ad] → a96564ad lr-rules-r2 during this review) | review/* titles-daycard-lrm5 709caa80, titles-daycard-lrm4-rv db036137 (my PASS) | claims E-TITLES3-LRM5 (worker), Foreman E C10 session_01DgYSWp6UVPu114RgZTqHMq.
KIT CHECK: reuses kitPanel + kit rows, kitTitlePlate (§82), kit option cards, kit ✕ (32.10 close word «Thôi»), jkhand kitHandWants (§101 / §101.9 by kind; titles +1 spec.dh condition, KK58 ACK). No kit part added. kit-std-scan Fold + iPad: land head 16 {X06 12 · X08 4} = LIVE 22afefb4 16, FAIL list identical.

## VERDICT: **PASS 5b386917 — LAND READY** (review/titles-daycard-lrm5-rv; descendant of LIVE a96564ad, fast-forward). No kit-kri-xl wait: kit-kri-xl is in LIVE and dialog-fixed passes directly on the land head.
Branch = 709caa80 merged onto LIVE 22afefb4 (47e979cf) + test fix (1948a138) + LIVE a96564ad merged (5b386917).

## (1) Merge honesty
- 709caa80 vs LIVE 5ad52416 (excluding index.html / sw.js): line-for-line = my reviewed db036137 delta, plus only my lrm4 review file (the worker merged the -rv head 05086867). 23 paths = those + index/sw. jbal2.js (both sides changed): branch − LIVE = titles lines exactly, so LIVE's own jbal2 lines are kept. assets.json = LIVE.
- **Onto LIVE 22afefb4, NOT index/sw only:** assemble.py, jdh.js, jkhand.js conflicted (LIVE kit-stage r6 / §101.9). Resolved by me:
  - assemble.py = LIVE list (478) + `jdh3n.js, jdh3.js` after `jge.js` (checked: list − those two == LIVE).
  - jdh.js dhNotice: LIVE's close card name «Thôi» (kit-stage-r6, owner 26/11 ~22:43Z: close-only cards use the kit close word) + the titles' deferred «Đeo ngay» (setTimeout → dhPick + showModal).
  - jkhand.js kitHandWants: LIVE's new function (tab door / own act / kitKindOf §101.9 / long names) + the titles' one condition `m.kit.dh → not a hand` placed before the kind test. It is still needed: dhNotice is kind «reward» → kitKind "" → the structural test would make its 2 cards a hand.
- **Onto LIVE a96564ad:** only assemble.py (+ built files) conflicted → LIVE list (487) + jdh3n/jdh3; j71.js auto-merged, and the titles j71 delta is unchanged line for line.
- After both merges: (land head − LIVE) ± lines = (709caa80 − 5ad52416) ± lines except exactly those 3 resolved lines + the title-notice-tap test lines. assets.json = LIVE; sw.js recomputed against it.
- Test fix: title-notice-tap tapped the «Để sau» card; on LIVE kit-stage the close-only «Thôi» is drawn as the kit ✕ («Lui»), so the panel = «Đeo ngay» card + ✕. The test now taps the ✕ (same check: no hand, ONE tap closes it).

## (2) Gates
| gate | 709caa80 | land head (22afefb4 merge 47e979cf/1948a138) | final 5b386917 (on a96564ad) | LIVE A/B |
|---|---|---|---|---|
| titles2-unit | 84/0 ×3 | 84/0 ×3 | 84/0 ×2 | — |
| titles2-ui | PASS 0 | PASS 0 | — | — |
| chapter-title-hook | 41/0 | 41/0 | 41/0 | — |
| title-notice-tap | 10/0 | 8/2 with the old «Để sau»/«Thôi» tap → test fixed → 10/0 ×2 | 10/0 | — |
| titles2-scan | 1185 · 0 | 1185 · 0 | 1185 · 0 | — |
| dialog-fixed | 83 + **1 FAIL** iPad XL (K-XL-GROW-SAME, as lrm4) | **84 ok · all pass** | **all pass** | — |
| dialog-fixed trial 709caa80 + kit-kri-xl-rv178 786f65ad | 84 ok · all pass | | | |
| time-spill-guard | PASS | PASS | PASS | LIVE 5ad52416 PASS (worker's FAIL 20 identical on LIVE; with tsg-kpk on LIVE both pass) |
| quickcheck.js (old save from LIVE) | PASS · old save from 5ad52416 ok | PASS · old save from 22afefb4 ok | PASS · old save from a96564ad ok · open 2204 ms · buổi 1783/2132 | — |
| kit-std-scan (REPORT_ONLY) | — | 16 {X06 12 · X08 4} | — | 22afefb4: 16, identical list |
| kit-hand | — | 172 ok / 0 | — | 22afefb4: 172 / 0 |
| page errors | 0 | 0 | 0 | 0 |

## (3) ★ q-softlock «view parked by a tab change» — **NOT branch-born**
Pinned-life A/B (scratch copy of the test: `Math.random` replaced by a seeded mulberry32 via `ctx.addInitScript`, the same seed on both builds; 709caa80 vs LIVE 5ad52416, alternating, same box):
| seed | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|
| head | 4 FAIL (iPad: view rows incl. «parked») | 4 FAIL (iPad) | 0 | 0 | 0 | 1 («parked», iPad) |
| LIVE | 4 FAIL (Fold: same 4 rows) | 0 | 0 | 1 («parked», iPad) | 1 («parked», iPad) | 0 |
Head 3/6 runs, LIVE 3/6 runs, the same rows. Repeats: LIVE seed 4 failed again (same row); head seed 6 passed on repeat, so the row is timing-flaky even with a fixed life. With a fixed seed the two builds still get different lives (the titles code draws from the RNG stream), which explains the worker's unseeded 5/9 vs 1/9 split. The titles diff touches none of jdayq / jdfv / jkring / realtap. The waiting card still shows and «Sang buổi» stays enabled (no soft-lock). → FOR test owners / KK: q-softlock needs a pinned life and should accept a closed view as well as a parked one.

## (4) time-spill
709caa80, land head and final head all PASS here; LIVE 5ad52416 PASS too. The worker's FAIL 20 rows were identical on LIVE (worker's table) → LIVE-own, now gone with tsg-kpk on LIVE.

## (5) dialog-fixed with kit-kri-xl
Trial 709caa80 + 786f65ad: all pass (84 ok). On the land head (LIVE 22afefb4 contains 786f65ad): **all pass directly**, and again on 5b386917.

## Still open (not this branch)
K-NOTICE-ACK (LIVE-born, KK) · K-DH-CAPFIT WARN (filed) · q-softlock life pinning (test owners).
Shots: none new (law 12 shots of lrm4 + worker lrm5 §4 stand; the panels' only change here is LIVE's ✕ close word). Scratch logs only, deleted.
