# PR17 — rooms worker (successor of PR16). depth 4, START_CTX ~5 % (estimate; get_session context_usage reads 0) → roll line ~30 %, ceiling 60 %. Coordinator = Foreman C ROOT-61 session_01PEhRbxPG7XXXVSg4KgDLkW (successor of ROOT-60).

## JOB 1 — owner Lượt 840 PASTEL robe redo (0 gens, 0 credits)
Owner: "Quyết định hạ màu áo" BUT s61 orange went BROWN in PR16's test → "hạ màu tức là vẫn giữ tông màu đó nhưng cho nó pastel hơn … chứ không phải đổi sắc màu".
Why PR16 browned: a,b × k with L kept → orange/red at the same lightness with less chroma = tan/brown.
Tool NEW dev/art/place-rank/stage_exact/robe_pastel.py (mask + skin guard = robe_lower.py; only the colour step changed).
### FORMULA (P2 season palette: reuse exactly)
CIELAB, per pixel; w = robe mask weight ∈ [0,1] (robe_lower.py: rows below the collar ramp 15→21 % of the figure box, minus own-face-skin guard, alpha > 0):
```
k  = max(0.55, min(1, 14 / MAIN C, 20 / SEC C))      MAIN/SEC from robe_colour.py (same k as PR16)
kc = sqrt(k)                                          chroma factor   (k 0.55 → kc 0.74)
t  = 1.2 · (1 − k)                                    lightness lift  (k 0.55 → t 0.54)
g  = clip((C_px − 4)/12, 0, 1) · clip((L_px − 35)/15, 0, 1)   only coloured, not-dark pixels lift (dark hair over the robe, ink lines, whites stay)
a' = a · (1 − w·(1 − kc))      b' = b · (1 − w·(1 − kc))      → hue angle atan2(b, a) unchanged
L' = L + max(0, 88 − L) · t · g · w                           → only lighter, toward L 88; never darker
```
For a flat palette hex (no mask): w = 1, g from the hex itself. Hue check in Oklab: s61 SEC #BE755D 38.9° → #D79B89 ~39°; s58 #C98073 30.7° → ~31°; s60 #E79B96 23.6° → ~24°.
Tried first: kc = k, t = 0.9(1 − k) and t = 1.26 → s61 read pinkish and the long hair over the robe turned grey (no dark guard) → added g's L term + kc = sqrt(k).
### Numbers (robe_colour.py; cluster labels can swap after recolour, e.g. s58 SEC = the green sleeves after)
```
s46 k=0.60 t=0.48 | MAIN #ACBEBA L75 C6 -> #AFBDBB L75 C5 | SEC #6F649B L45 C33 -> #8077A2 L52 C25
s47 k=0.93 t=0.08 | MAIN #B3C1B8 L76 C7 -> #B4C2B9 L77 C6 | SEC #9192B8 L61 C21 -> #9697BC L63 C20
s48 k=0.63 t=0.45 | MAIN #D49C9D L69 C22 -> #E4B7B8 L78 C17 | SEC #E2B6B5 L78 C17 -> #B1BBB4 L75 C5
s49 k=0.71 t=0.34 | MAIN #66787A L49 C7 -> #707F81 L52 C5 | SEC #B5727C L55 C28 -> #CA8E97 L65 C24
s50 k=0.59 t=0.49 | MAIN #B7B8C4 L75 C6 -> #D595A6 L68 C26 | SEC #B6687F L53 C33 -> #A36B7A L51 C24
s51 k=0.79 t=0.25 | MAIN #BFA4BE L70 C17 -> #C9B1C9 L75 C15 | SEC #D9BEBF L79 C10 -> #99ACAD L69 C6
s52 k=0.81 t=0.23 | MAIN #AEC3CD L77 C9 -> #B2C5CF L78 C8 | SEC #D9A193 L71 C24 -> #DFAB9E L74 C22
s53 k=0.67 t=0.39 | MAIN #C1A2C2 L70 C20 -> #CEB4CE L76 C17 | SEC #B0B0A6 L72 C5 -> #B3B4AC L73 C4
s54 k=0.57 t=0.51 | MAIN #E5A8B0 L74 C24 -> #EBB8BF L79 C19 | SEC #D28F98 L66 C27 -> #B5B9C1 L75 C4
s55 k=0.97 t=0.04 | MAIN #B4A38F L68 C13 -> #B6A591 L68 C12 | SEC #CC99A3 L68 C20 -> #CB99A2 L68 C20
s56 k=0.63 t=0.44 | MAIN #C89FBC L70 C22 -> #D1B1CB L75 C18 | SEC #E1AD9E L75 C22 -> #E9B8A9 L78 C21
s57 k=0.65 t=0.42 | MAIN #C395AD L66 C21 -> #D5B0C3 L75 C17 | SEC #D8B5A5 L76 C16 -> #E1C2B2 L80 C14
s58 k=0.55 t=0.54 | MAIN #C98073 L61 C32 -> #E3A69B L73 C25 | SEC #B36A5D L52 C34 -> (green sleeves now SEC)
s59 k=0.60 t=0.48 | MAIN #E5AF9F L76 C23 -> #EDC2B3 L81 C18 | SEC #D29989 L68 C25 -> #E4B5A8 L77 C19
s60 k=0.55 t=0.54 | MAIN #E79B96 L71 C31 -> #EFB0AB L77 C25 | SEC #D07F7A L61 C34 -> #F0C0BA L82 C18
s61 k=0.55 t=0.54 | MAIN #EDD1BC L85 C15 -> #EBB29C L77 C26 (orange became the biggest cluster) | SEC #BE755D L56 C36 -> #D79B89 L69 C27
```
Sheets (TOP gốc | BOTTOM pastel, tag line 3 "pastel", same rooms/groups as nf817/nf824), CDN https://ctm-img.victoria-tntt.workers.dev/img/_review/place-rank/pr17/nf840/ :
nf840-thua-minh-cung-tay-phoi-ngu.jpg (s46–49) · nf840-thua-minh-cung-tay-phoi.jpg (s50–53) · nf840-canh-phuc-cung-dong-phoi-ngu.jpg (s54–57) · nf840-canh-phuc-cung-dong-phoi.jpg (s58–61) · nf840-canh-phuc-cung-tay-phoi-ngu.jpg (s46 s51 s56 s61). Pastel cut-outs sNN-pastel.webp same folder (review only, not in the game; originals untouched).
MY LOOK (s58–61 sheet full size + s58/s60/s61 cut-outs before/after): s61 = soft peach-orange (not brown), s58 = soft coral-rose, s60 = soft pink; faces, skin, hair same; still clearly coloured, lighter overall. Trade-off: chroma ends ~25 (PR16's ~18): lightness carries the softness now.

## JOB 2 — L22 two-bed template (before any bedroom gen)
Owner-OK two-bed rooms with one bed LEFT + one RIGHT (L835 "rooms 11–15 all OK"; room 3 = L816 NOT OK; room 8 = recommended-redraw, no OK; rooms 17/21 not OK'd yet):
- room 13 Chung Tú tây phối bedroom aFG6jdzfSh (first made from owner L816 "frontal 2-bed layout"; 2-wall, windows LEFT M2X 8aiwqQTIrU; left bed just right of the window strip, right bed at the right edge, dressing table + panel + doorway centre) ← RECOMMENDED template
- room 15 Hàm An đông phối bedroom WDg1hlscXe (same composition, quatrefoil doorway centre)
Both look alike; neither has the left bed touching the left edge (window strip + small furniture there). → asked ROOT-61 which the owner means. HOLD all bedrooms until named.

## JOB 2 — batch 5 rooms (receptions not on hold)
| # | room | gen | layout | pair | floor_c | faults (list only, no redraw without owner yes) | tags sheet |
|---|---|---|---|---|---|---|---|
| 24 | Vĩnh Hòa đông phối reception | 8aiORuSIrU | 3-wall, windows RIGHT (cpS5YIl0eP); official's-hat chair pair + tea table in the LEFT third under a camellia/oriole scroll; gourd doorway in a lozenge lattice CENTRE; curio shelf right third; guqin on a low table left wall; bamboo-root flower stand + birdcage at the windows + NEW CARD_VH + FR | ĐĐ all cream-ivory | 17.3 | flowers read as pink peonies more than camellias; doorway = round-topped arch, gourd shape weak; nothing large over tag 1 | https://ctm-img.victoria-tntt.workers.dev/img/_review/place-rank/pr13/pr13-ipad-tags-vinh-hoa-cung-dong-phoi.jpg |
A17: new room on the DH_DONG_REC frame; new CARD_VH; only layout sentences, occupants, card and colour differ. Gates: builder GATE PASS + room_gate.py PASS. Credits after: ~93 200.
Room 23 = Vĩnh Hòa đông phối BEDROOM (2w left) HOLD until ROOT-61 names the L22 template.

## A27 labels (ROOT-61 01:03Z): labelled copies, same CDN folders, suffix -lbl
nf840-<room>-lbl.jpg ×5 (header per half: GỐC/PASTEL — palace · đông/tây phối · phòng ngủ/khách · occupants' ranks; under each figure: GROUP big + "thiếu nữ · sNN"; s46–50 Lạnh lùng, s51–55 Kiêu kỳ, s56–61 Quyến rũ from OWNER_GROUPS_L686.json; small numbers kept). Room 24: pr13-ipad-tags-vinh-hoa-cung-dong-phoi-lbl.jpg. Every later sheet gets the same header (A27).
Batch 5 labelled (A27, 2-line 64 px header: "Phòng NN — palace" / "side hall · room type · occupants' ranks"): pr13-ipad-tags-{dien-huy-cung-dong-phoi, dien-huy-cung-tay-phoi-ngu, dien-huy-cung-tay-phoi, vinh-hoa-cung-dong-phoi}-lbl.jpg (CDN img/_review/place-rank/pr13/). ROOT-61 01:08Z: owner says rooms 13/15 are NOT the template she meant; candidates 1/3/5 sent to her (ROOT-61 guess room 3 Lw8MjWZswO). Bedrooms HOLD.
