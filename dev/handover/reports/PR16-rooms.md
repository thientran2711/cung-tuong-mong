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

## JOB 2 — rooms (BLOCKED on A24 room gate)
check_store.py does not accept room prompts (scopes tp/pr/trieu/mama/nude/face only; every scope demands the figure MASTER block); no room gate file in the repo → 0 room gens until ROOT-59 sends the room gate (told ROOT-59 ~00:45Z). Credits 146 024 at ~00:45Z.
Built, NOT drawn: room 18 = Hàm An tây phối reception (prompts_pr13.py HA_TAY_REC, key ham-an-cung-tay-phoi, 5 425 chars, builder GATE PASS; refs G9 + M3 cpS5YIl0eP; 3w windows right; TQ swapped curtains soft green / fabrics soft blue; layout = low raised dais + kang table in the LEFT two thirds under three orchid scrolls, begonia doorway RIGHT end, curio shelf left wall, chess table + drum stools + orchid stand at the right windows). A17: new room on the HA_DONG_REC frame; only layout sentences, occupants and colour pair differ.
Built, NOT drawn (ROOT-59 00:38Z "pre-build Diên Huy"): new CARD_DH (chrysanthemums; swallows among willows; chestnut-brown huanghuali + small white jade plaques; tall-backed lamp-hanger side chairs; octagonal doorway in an interlocking-coin lattice). Pairs = least used: đông TT (all soft green), tây QQ (all soft blue). Builder GATE PASS all.
- 19 dien-huy-cung-dong-phoi-ngu 6 200 ch, 2w left M2X: beds side by side in the RIGHT two thirds (own steps, bedside cabinet between), doorway LEFT end, dressing table + clothes rack on the window wall. BEDH4 + BEDW.
- 20 dien-huy-cung-dong-phoi 5 459 ch, 3w right M3: lamp-hanger chair pair + square tea table CENTRED before a long side table under a chrysanthemum panel; doorway LEFT end; embroidered willow screen RIGHT end; desk left wall; chrysanthemum stands + weiqi table at the windows.
- 21 dien-huy-cung-tay-phoi-ngu 6 260 ch, 2w left M2X: beds at both ends (L816), centre = pair of tall compound wardrobes; doorway at the far end of the left wall; tea table + 2 stools at the windows. BEDH4 + BEDW.
- 22 dien-huy-cung-tay-phoi 5 395 ch, 3w right M3: chair pair + tea table on a low platform in the RIGHT two thirds before a round-framed embroidered screen; doorway LEFT end; painting table left wall; flower stand + fish-bowl cabinet at the windows.
Pending from ROOT-60: room gate path + GO; brief on the room #5 "different" redraw (owner L835: rooms 11–15 all OK).
- 10 r3 chung-tu-cung-dong-phoi-ngu-r3 (owner L835: r2 identical to old → redraw DIFFERENTLY, new prompt), 6 386 ch, builder GATE PASS, NOT drawn. Kept: occupants ĐT, pair_cols(2,1) green curtains / ivory fabrics, CARD_CT, BEDH4, FG. Changed: windows RIGHT→LEFT (W3→WL3, image 3 M3→M3X 1ldYySkr4r); beds side by side on one platform → beds at the LEFT and RIGHT ends (L816); centre = plum-and-magpie folding screen + two rose chairs + tea table; doorway moved to the right side wall; dressing table on the left window wall; + BEDW.

## BATCH 4 (GO ROOT-60 00:41Z; every prompt through room_gate.py (MG4) right before the call = PASS). 3 gens × 135 = 405 credits; balance 141 054 before room 19.
| # | room | gen | floor_c | notes / faults (list only) | sheet |
|---|---|---|---|---|---|
| 10 r3 | Chung Tú đông bedroom NEW prompt (L835 "khác đi") | YMlk515WeC | 16.0 | clearly different from old/r2: windows left, beds at both ends, plum-magpie screen centre, doorway right; small cabinet + boxes bottom-left over tag 1 | https://ctm-img.victoria-tntt.workers.dev/img/_review/place-rank/pr13/pr13-ipad-tags-chung-tu-cung-dong-phoi-ngu-r3.jpg |
| 16 | Hàm An đông reception (PR15) | 0eUxEthTfW | 19.9 | only one armchair; wood dark red (PR15 note) | https://ctm-img.victoria-tntt.workers.dev/img/_review/place-rank/pr13/pr13-ipad-tags-ham-an-cung-dong-phoi.jpg |
| 17 | Hàm An tây bedroom (PR15) | Xm9wKXbBfo | 14.3 | armchair + box bottom-left over tag 1; extra doorway with robe at right edge (PR15 note) | https://ctm-img.victoria-tntt.workers.dev/img/_review/place-rank/pr13/pr13-ipad-tags-ham-an-cung-tay-phoi-ngu.jpg |
| 18 | Hàm An tây reception | rgXT0Ozxtc | 18.2 | dais came out centred (asked left two thirds); armchair at left near tag 1 | https://ctm-img.victoria-tntt.workers.dev/img/_review/place-rank/pr13/pr13-ipad-tags-ham-an-cung-tay-phoi.jpg |
| 19 | Diên Huy đông bedroom (new CARD_DH) | SyhXdjbUb8 | 16.0 | basket + low table bottom-left over tag 1; golden chrysanthemums painted on bedding | https://ctm-img.victoria-tntt.workers.dev/img/_review/place-rank/pr13/pr13-ipad-tags-dien-huy-cung-dong-phoi-ngu.jpg |
Diên Huy pairs: game data has no fixed occupants for Diên Huy (map only) → TT / QQ kept. NEXT: 20 Diên Huy đông rec, 21 tây bed, 22 tây rec (prompts built + gate PASS), then Vĩnh Hòa, Trường Xuân phối.

## BATCH 5 (part: rooms 20–22, Diên Huy done) — room_gate PASS before each call; 3 gens × 135 = 405. PR16 total 6 gens = 810 credits. Balance 114 179 before room 22 (others spend fast: 146k → 114k in ~40 min).
| # | room | gen | floor_c | notes / faults (list only) | sheet |
|---|---|---|---|---|---|
| 20 | Diên Huy đông reception TT | TdwjLhkVNR | 12.1 (under range) | chair pair centred under chrysanthemum-swallow panel as asked; host chairs small; desk cabinet bottom-left over tag 1 | https://ctm-img.victoria-tntt.workers.dev/img/_review/place-rank/pr13/pr13-ipad-tags-dien-huy-cung-dong-phoi.jpg |
| 21 | Diên Huy tây bedroom QQ | P3QhvUA42C | 19.0 (too much floor) | wide beds both ends + wardrobes centre as asked; basket + box bottom-left over tag 1 | https://ctm-img.victoria-tntt.workers.dev/img/_review/place-rank/pr13/pr13-ipad-tags-dien-huy-cung-tay-phoi-ngu.jpg |
| 22 | Diên Huy tây reception QQ | EbYR22suuO | 15.6 | chairs came out centred (asked right two thirds); scroll jar bottom-left over tag 1 | https://ctm-img.victoria-tntt.workers.dev/img/_review/place-rank/pr13/pr13-ipad-tags-dien-huy-cung-tay-phoi.jpg |
RECURRING (list, not fixed): small furniture / basket / jar bottom-left over tag 1 in r3, 17, 19, 20, 21, 22 (+ armchair near tag 1 in 18). The "left part near the viewer holds only small, low objects" sentence invites exactly this; a fix needs an owner-raised wording change (A18) — for the foreman.

## HANDOVER → next worker (PR17): PR16 rolls over (context ≈ START_CTX ~5 % + ~25 % by estimate — many full-size room reads; get_session context_usage reads 0). depth 3. Coordinator = Foreman C ROOT-60 session_01PEhRbxsHLiHaB6yGGXAQRY; the coordinator opens PR17.
STATE: job 1 (L824 chroma test) done + sent. Batch 4 (r3, 16, 17, 18, 19) sent to ROOT-60. Rooms 20–22 drawn = batch 5 items 1–3: send them with the next 2. 0 redraws pending (owner verdicts come via ROOT-60).
GATE: A24 room gate = python3 dev/art/place-rank/room_gate.py FILE.txt (also wired into prompts_pr13.py: the builder exits 1 on FAIL). Run it on the exact prompt text right before every images_generate call; balance check before every gen; under 60 000 start nothing.
NEXT (order): Vĩnh Hòa đông bed + rec → Vĩnh Hòa tây bed + rec (new CARD_VH first time; pattern of CARD_DH; pick the least-used pair: ĐĐ is least now (1×) — TT/QQ 3×, others 4–6×) → Trường Xuân phối (CARD_TX in prompts.py) → Tần → Phi → Quý phi → Từ Ninh → TX Tần/Phi/QP → ~35 live place scenes. Alternation continues from room 22 (3w right): 23 = 2w left (WL2, M2X 8aiwqQTIrU), 24 = 3w right (W3R, M3), … Pairs used so far: ĐT ĐT ĐQ ĐQ TT QQ QQ ĐĐ ĐĐ ĐT ĐT TT TQ TQ ĐQ ĐQ TQ TQ TT TT QQ QQ (rooms 1–22).
METHOD (PR16): add the room to prompts_pr13.py before "# GATE" (copy the DH_* blocks: bedrooms = … + CARD + pair1/pair_cols + QN + " Exactly two beds; …" + NOPE + RECT + GUIDE_S + BEDH4 + BEDW + FG; receptions = … + NOPE + P['NOSOFA'] + RECT + GUIDE_S + FR) → python3 prompts_pr13.py (builder gate + room gate) → dump the prompt text to a file → room_gate.py on it → images_generate mode gpt-2-6, resolution 2k, width 2688, height 1386, folderReference ba4aecfe-efce-47e2-b53f-30d292091886, refs gOmYI7iSXO, EbYJzsMuuO, image 3 → creations_wait → creations_register_download → curl → PIL webp q88 img/_review/place-rank/pr13/<key>-ha-sang.webp → measure_floor.py → stage_exact/ipad_tags.py ROOM OUT FIGDIR (figs: curl https://ctm-img.victoria-tntt.workers.dev/img/fig-consort-c06-t1-a18.webp, c30, fig-maid-m19-t1-a18, m39 into a folder) → LOOK full size → cdn_sync.py the 2 files → ledger lines (append-only JSON; on rebase conflict keep both sides) → report row → commit, pull --rebase, push.
Tools from PR16: stage_exact/robe_lower.py (L824 chroma lowering; k = max(0.55, min(1, 14/MAIN C, 20/SEC C)); skin guard by face colour + lightness).
