# PR16 — rooms worker (successor of PR15). depth 3, START_CTX ~5 % (estimate; context_usage reads 0). Coordinator ROOT-59 session_01PEhRbxKh3jLw4atknQREnq.

## JOB 1 — owner Lượt 824 robe chroma test (0 gens, 0 credits)
Owner: "hạ cái màu xuống … đừng có vẽ lại … hạ xuống thì người có bị dìm không … thử xem".
Tool NEW dev/art/place-rank/stage_exact/robe_lower.py (uses robe_colour.py): in CIELAB, a,b × k inside the robe mask; hue and L kept.
Mask = alpha>0, rows below the collar (soft ramp 15→21 % of figure box), minus skin (ΔE < 6 to the figure's OWN face skin AND L > skin L − 4, ramp to 10 / −8) → face, neck, hands, hair, hair ornaments untouched (checked by eye on all 16).
k = max(0.55, min(1, 14 / MAIN C, 20 / SEC C)). First pass had no 0.55 floor and a wide skin guard: s58 k .43 / s60 .45 went muddy brown, and peach robes (s59, s56 top) were wrongly protected as "skin" (peach robe ΔE only 8–11 from skin; separated by L: skin L≈84, robes ≈76). Fixed before the sheets.
Sources: cut-outs = latest cut_id per s from gen_ledger (s51 YMlKiMSWeC, s54 tCRyDEwmZJ = L786 eye redraws), same as PR14 nf817. Nothing approved overwritten (new files only).
Sheets (TOP gốc | BOTTOM màu hạ, tag line 3 "màu hạ", same rooms/groups as nf817), CDN https://ctm-img.victoria-tntt.workers.dev/img/_review/place-rank/pr16/nf824/:
nf824-thua-minh-cung-tay-phoi-ngu.jpg (s46–49) · nf824-thua-minh-cung-tay-phoi.jpg (s50–53) · nf824-canh-phuc-cung-dong-phoi-ngu.jpg (s54–57) · nf824-canh-phuc-cung-dong-phoi.jpg (s58–61) · nf824-canh-phuc-cung-tay-phoi-ngu.jpg (s46 s51 s56 s61). Lowered cut-outs: sNN-mau-ha.webp same folder (review only, not in the game).
Numbers (robe_colour.py k-means; NB cluster labels can swap after recolour, e.g. s48 MAIN 22→4 is the green skirt becoming the biggest cluster, not the pink losing that much):
```
s46 k=0.60 | MAIN #ACBEBA L76 C7 -> #B4BEBB L76 C4 | SEC #6F649B L46 C33 -> #6F6788 L46 C20
s47 k=0.93 | MAIN #B3C1B8 L77 C7 -> #B4C1B8 L77 C7 | SEC #9192B8 L62 C21 -> #9192B6 L62 C20
s48 k=0.63 | MAIN #D49C9D L70 C22 -> #AFB6B1 L74 C4 | SEC #E2B6B5 L78 C17 -> #C4A1A1 L70 C14
s49 k=0.71 | MAIN #66787A L49 C7 -> #6B7879 L49 C5 | SEC #B5727C L56 C28 -> #A7787E L55 C20
s50 k=0.59 | MAIN #B7B8C4 L75 C6 -> #B9B9C0 L76 C4 | SEC #B6687F L54 C34 -> #A1737F L54 C20
s51 k=0.79 | MAIN #BFA4BE L71 C18 -> #BAA4B9 L70 C14 | SEC #D9BEBF L79 C10 -> #D6C0C5 L80 C8
s52 k=0.81 | MAIN #AEC3CD L78 C9 -> #B1C2CA L78 C7 | SEC #D9A193 L71 C25 -> #D4A599 L72 C20
s53 k=0.67 | MAIN #C1A2C2 L70 C21 -> #BBA6BB L71 C14 | SEC #B0B0A6 L72 C6 -> #B0B1AA L72 C4
s54 k=0.57 | MAIN #E5A8B0 L75 C24 -> #C49DA2 L68 C15 | SEC #D28F98 L66 C27 -> #D8B6B8 L77 C13
s55 k=0.97 | MAIN #B4A38F L68 C13 -> #B5A490 L68 C13 | SEC #CC99A3 L68 C21 -> #CA99A2 L68 C20
s56 k=0.63 | MAIN #C89FBC L70 C22 -> #C0A6B7 L71 C14 | SEC #E1AD9E L75 C23 -> #D6B2A7 L76 C15
s57 k=0.65 | MAIN #C395AD L67 C22 -> #BA9DAC L68 C14 | SEC #D8B5A5 L76 C16 -> #D6BAAC L78 C13
s58 k=0.55 | MAIN #C98073 L61 C33 -> #AD827B L59 C18 | SEC #B36A5D L53 C34 -> #987067 L51 C18
s59 k=0.60 | MAIN #E5AF9F L76 C24 -> #E2BCAF L79 C16 | SEC #D29989 L68 C26 -> #C7A59C L71 C15
s60 k=0.55 | MAIN #E79B96 L72 C31 -> #C19490 L66 C19 | SEC #D07F7A L62 C35 -> #D7B0AC L75 C15
s61 k=0.55 | MAIN #EDD1BC L86 C16 -> #C19989 L66 C19 | SEC #BE755D L57 C36 -> #A67C6F L56 C20
```
Liked sheet people for reference: c06 MAIN 84/16 SEC 54/45 · c30 89/6 72/6 · m19 75/21 58/23 · m39 78/4 70/5.
MY LOOK (full size, 2 of 5 sheets + all 16 cut-outs before/after): faces/skin identical. Cool colours (s46 violet, s50 raspberry, s49 raspberry coat, s53/s56/s57 lilac) soften well and still read as colour, not "dìm". Pinks/peach (s54 s59 s60) become dusty rose — blend with the room, still lively. Warm red-orange (s58, s61) turn tan / rose-brown and sit close to the brown wood floor/furniture → these two are the ones that start to look "dìm"; a milder k (~0.7) or keeping them as the "deeper" people fits the owner's idea "some light, some deeper". s49's dark teal is dark by LIGHTNESS (L49), which this test keeps by design; lowering colour does not make her lighter.
