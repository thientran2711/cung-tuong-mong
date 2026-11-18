# HERO family pilot (4k) — 16/11 ~23:45Z (worker, START_CTX ~6%)
NOT uploaded to CDN. Waiting for the lead's GO.

## 4k vs 2k test (same prompt/refs, player-look1-t1-a18 + emperor-a18-1)
- Price: 4k (2048x4096) = **80 cr**, 2k (1024x2048) = **65 cr** (+23%). Balance ~1.27M.
- 4k is visibly sharper at native pixels (hair strands, hairpin/crown metal, embroidery, skin grain); 2k blown up 2x is softer. Sheets: pilot-hero/cmp-{player,emp}-{face,full}.jpg (left 2k x2, right 4k native).
- Decision: pilot at 4k. Masters are scratch only (2048x4096 RGBA, true alpha, 4+ MB each).
## Files (10, all a18, 80 cr each = 800 cr + the 65 cr 2k test pair = ~1,090 cr incl. tests)
player-look1-t1 (flower branch + sleeve), look2-t1 (handkerchief + sleeve), look3-t1 (folded round fan + hand on forearm), look4-t1 (fingertips at hairpin + blossom), thaihau-h1 (prayer beads + sleeve), thaihau-h2 (handkerchief + sleeve), emperor-a18-1 (fan + jade pendant), emperor-a18-2 (scroll + hand behind back), physician-p1 (medicine scroll + box strap), official-o1 (court tablet + hand on jade belt).
Finishing: finish_fig.py -> fig 900 (height = OLD figure), hd 1800 (also made for thaihau/physician/official, which have none on CDN today), por 384x506 matched to old framing; extra hd2 = 2700 tall (finish_hd2.py) for judging sharpness. Outputs: pilot-hero/finished/img/{,hd/,hd2/}fig-*.webp + por-*.webp. Not uploaded.
## QA (qa_fig, fig kind)
PASS emperor-a18-2. WARN only (halo 1.5-2.4k/10k = look clean on dark; huadian auto = unreliable): emperor-a18-1, official, physician, look2, look4, thaihau h1/h2. FAIL by tool = 4 pinholes (hair strands) on player-look1 and look3, same as the accepted c28/m47; not visible on dark at 3x. Edge contact 0.
## Looked at (dark+light sheets: old | new hd1800 | face+bust native from hd2)
- Hands: five fingers, left/right right on all looked-at files; every pose frontal/calm, none back-turned; props readable. Shoes visible on all.
- Huadian: tiny flower/butterfly on the 6 women (looked at crops), none on the 4 men. No teardrop.
- Men: emperor yellow/gold dragon robe, crossed-collar style, no feathered hat; official crimson; physician pale blue/white; nobody pink/purple.
- Women are the praised-face skin tone; ladies stay pink/lilac/peach as in the old files (women only).
- Note: thaihau-h2 keeps the old stand-collar robe (it was in the old figure).
## Prompt changes vs FAMILY_BRIEF
None except per-figure additions: men "No forehead mark (man); no pink or purple clothing", emperor "original Chinese imperial style, crossed-collar robe, NO Qing-style feathered hat, no cheongsam collar". Canvas request 2048x4096 with resolution 4k works as is. The model still fills ~99% of canvas height (feet/head near edges) but fit_fig handles it; L/R margins fine.
## Problems
None blocking. Sheets contact: pilot-hero/<key>-{light,dark}.jpg. Not looked at individually at native: every forehead crop of the men (no mark expected).
