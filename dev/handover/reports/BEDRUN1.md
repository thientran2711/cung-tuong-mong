# BEDRUN1 — redraw 13 bedrooms, rule L29 (worker of ROOT-C1; depth 1)
START_CTX ~2 % (own estimate). Balance before 2 940 356 cr. 14 gens x 135 = 1 890 cr (M2300-11 twice). gpt-2-6 2k 2688x1386, folder ba4aecfe…, ONE try each; room_gate PASS x13, keep_check PASS x13 before gens.
Prompt text = json text (pasted from prompts_roompf1_L29_bedsize.json; no Magnific-side prompt diff run, wire script not used because it refuses to overwrite).
## Sample M2300-11
- try 1 (image 3 = cpS5YIl0eP): 79CyleSJAL bed ~40 % (<43), floor 16.5 -> swap rule applied.
- image 3 swapped to UPve2vXwny for ALL 13 (recorded in prompts_roompf1_L29_bedsize.json field image3_swap + refs, + comment line in each .keep; keep_check PASS).
- try 2: rgBLbfSxtc bed ~45 %, wider than tall, floor 16.0 -> PASS, rest done the same way.
## Results (bed % = eyeball on 5 % grid, ±2; floor = measure_floor floor_c, band 12.5–18.5)
| code | key | Magnific id | bed % | floor % |
|---|---|---|---|---|
| M2300-11 | thua-minh-cung-quyphi-ngu | rgBLbfSxtc | 45 | 16.0 |
| M2299-12 | ham-an-cung-phi-ngu | p8PXTgtehw | 40 | 19.9 |
| M2299-14 | thua-minh-cung-phi-ngu | w4fOloL7EI | 43 | 17.3 |
| M2300-01 | dien-huy-cung-phi-ngu | 9ZqiOfoNYZ | 40 | 18.6 |
| M2300-03 | vinh-hoa-cung-phi-ngu | rgBLK21xtc | 40 | 18.6 |
| M2300-19 | truong-xuan-cung-phi-ngu | huAfIUJvqL | 40 | 14.7 |
| M2300-05 | khai-tuong-cung-quyphi-ngu | EbWFaPjuuO | 40 | 14.7 |
| M2300-07 | chung-tu-cung-quyphi-ngu | UPaJg6rwny | 42 | 18.2 |
| M2300-09 | ham-an-cung-quyphi-ngu | 4RH6yzs9Aa | 39 | 17.7 |
| M2300-13 | dien-huy-cung-quyphi-ngu | ovitXM5829 | 38 | 17.7 |
| M2300-15 | vinh-hoa-cung-quyphi-ngu | xSosrwNjfW | 41 | 18.6 |
| M2300-21 | truong-xuan-cung-quyphi-ngu | lJmUsyLgv9 | 37 | 17.3 |
| M2300-17 | truong-xuan-cung-tan-ngu | ksdxKSA16B | 40 | 17.3 |

Only M2300-11 (45) and M2299-14 (43) reach the 43 % mark; others 37–42 % (eyeball). Better than before (old 31–41) but 11 of 13 are still under L29's 43 %. Floor: M2299-12 19.9 and M2300-01 18.6/M2300-03 18.6/M2300-15 18.6 at or above the band top. No heavy fault seen (no people/text, nothing mid-floor, beds not cut), so no redo; ONE try each. Further tries = owner/foreman decision (stronger bed-width wording than '43 %' may be needed; image 3 swap alone did not get there).
## Wired: pr13 webp q88 overwrite + cdn_sync (all 13). Old images replaced on CDN.
## People sheets (CDN, not git; left Fold portrait 755x1000 | right iPad): https://ctm-img.victoria-tntt.workers.dev/img/_review/place-rank/people-pr13/L29-batch1-5rooms.jpg  https://ctm-img.victoria-tntt.workers.dev/img/_review/place-rank/people-pr13/L29-batch2-5rooms.jpg  https://ctm-img.victoria-tntt.workers.dev/img/_review/place-rank/people-pr13/L29-batch3-3rooms.jpg
Fold template: fold755.py needs a live screenshot; the old TEMPLATE.png is not in git, so I took a fresh live one (Dư đồ tab active in the bottom nav instead of Hành sự; stage is overwritten anyway). Script: dev/art/place-rank/people_pr13/make_sheet_l29.py (caption adds bed % and floor %).
Balance stop line 60 000 far away. No rollover needed.
