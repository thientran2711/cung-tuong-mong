# event-art-dark-fix report (art worker, 17/11)
PRIORITY #1 CHECK ('too dark|tối quá|event-art-style|brighter'): OD 8 | ledger 0 | claims 8 | main 10 | review/* 0 — reuses event-art-style prompts/keys; refs = act-ha-doc-dan (cpghCxF0eP) + act-bat-dau-bay-muu (Bh9LHJJoQR, uploaded to Magnific folder). Found CDN img/_review/event-art-style2/dark-fix/ (11 FIX files by an earlier session, not in any report) — NOT used/judged here; ask C.

Target look: act-bat-dau-bay-muu lum 79.9, act-ha-doc-dan lum 63.8 (0-255).
## STEP 1 measurement (mean luminance 0-255, OLD = left panel of the OLD|NEW review sheet, LIVE = img/<key>.webp)
Rule applied: FAIL if LIVE < 65 or LIVE < 0.9*OLD while the key is dark by meaning. NOTE: OLD pictures that were pastel/light (poisonedfish, rumours, toil scolds, hhsummons, spoiledfood) were redrawn dark by meaning; for them 'OLD -10%' cannot apply, so target = act-card look (>=65, ~70-90). cal/* OLD crops are approximate (3-panel sheets).
| key | OLD | LIVE | ratio | verdict |
|---|---|---|---|---|
| ev-e68-poisonedfish | 181 | 24 | 0.13 | FAIL |
| ev-e68-rumoremplove | 179 | 28 | 0.16 | FAIL |
| ev-e68-rumorth | 162 | 28 | 0.17 | FAIL |
| ev-e68-hhsummons | 167 | 31 | 0.18 | FAIL |
| ev-e68-spoiledfood | 158 | 30 | 0.19 | FAIL |
| ev-toil-rival-tease | 181 | 41 | 0.22 | FAIL |
| ev-toil-hh-scold | 149 | 36 | 0.24 | FAIL |
| ev-toil-rival-jealous | 175 | 42 | 0.24 | FAIL |
| ev-e68-rumorpreg | 171 | 42 | 0.25 | FAIL |
| ev-toil-th-scold | 146 | 43 | 0.29 | FAIL |
| ev-e68-bordernews | 90 | 28 | 0.31 | FAIL |
| ev-e68-stormnight | 133 | 42 | 0.32 | FAIL |
| ev-e68-rumorfavor | 101 | 33 | 0.33 | FAIL |
| ev-taintpick | 104 | 36 | 0.35 | FAIL |
| ev-plantpick | 85 | 34 | 0.40 | FAIL |
| ev-e68-leakroof | 88 | 35 | 0.40 | FAIL |
| ev-tt3 | 90 | 37 | 0.41 | FAIL |
| opt-giu-chan-hoang-thuong | 89 | 47 | 0.53 | FAIL |
| ev-am-muu | 49 | 28 | 0.57 | FAIL |
| ev-td1 | 64 | 37 | 0.57 | FAIL |
| ev-news-tin-trong-cung | 71 | 43 | 0.60 | FAIL |
| ev-toil-crowd-jealous | 154 | 99 | 0.65 | FAIL |
| intro/td-2 | 79 | 60 | 0.76 | FAIL |
| ev-nc1 | 46 | 45 | 0.99 | FAIL |

24 FAIL keys. Every other dark-ish key (OLD or LIVE <115, 90 keys) is LIVE >= 1.25x OLD => pass. ev-nc1 OLD 46 / LIVE 46 equal to OLD but below 65 -> still on list. Not measured (no review sheet, never redrawn): q72/act pictures not touched by event-art-style, b13 intro skipped ones.

## STEP 2 samples (NOT uploaded): sheet OLD | LIVE | NEW with lum on tiles
dev/handover/reports/event-art-dark-fix/sample1-OLD-LIVE-NEW.jpg
| key | creation | LIVE lum | NEW lum |
|---|---|---|---|
| ev-am-muu | u5Y4lE1QLD | 28 | 74 |
| ev-e68-stormnight | huZwrFrvqL | 42 | 81 |
| ev-e68-poisonedfish | nVLuIBEYQD | 24 | 73 |
| ev-toil-hh-scold | mERU1rBhJQ | 36 | 85 |
gpt-2-6, 4:3 1k, refs act-bat-dau-bay-muu + act-ha-doc-dan. Self-check: warm rose/red interior, moon + lanterns/candles, room fully readable, no faces (all backs), no text. Waiting for Foreman C OK; then remaining ~20 fails in sheets of ~12.

## STEP 1 (UPDATE 2) table: every event/option/intro picture redrawn today (live on CDN at measure time; event-art #2 interim lift for its 11 NOT yet counted)
| key | class (event text) | OLD lum | LIVE lum | verdict |
|---|---|---|---|---|
| ev-am-muu | scheming | 49 | 28 | too dark |
| ev-ch1 | normal | 155 | 153 | OK |
| ev-ch2 | normal | 172 | 172 | OK |
| ev-con-tre | normal | 173 | 155 | OK |
| ev-cyrep | normal | 151 | 158 | OK |
| ev-e68-allyoffer | normal | 171 | 163 | OK |
| ev-e68-autumnmoon | normal | 105 | 157 | OK |
| ev-e68-bordernews | danger (border war) | 90 | 28 | too dark |
| ev-e68-borrowdress | normal | 165 | 166 | OK |
| ev-e68-clanfather | normal | 167 | 162 | OK |
| ev-e68-doccheck | normal | 146 | 133 | OK |
| ev-e68-doubtvisit | normal | 167 | 165 | OK |
| ev-e68-droughtprayer | normal | 162 | 154 | OK |
| ev-e68-embroidery | normal | 168 | 153 | OK |
| ev-e68-envoygift | normal | 164 | 164 | OK |
| ev-e68-eunrequest | normal | 163 | 151 | OK |
| ev-e68-faminedonate | normal | 179 | 156 | OK |
| ev-e68-fortunenun | normal | 175 | 155 | OK |
| ev-e68-giftarrive | normal | 176 | 166 | OK |
| ev-e68-hhsummons | sinister (Empress summons) | 167 | 31 | too dark |
| ev-e68-kindvisit | normal | 170 | 146 | OK |
| ev-e68-leakroof | danger (storm; weather - C to confirm) | 88 | 35 | too dark |
| ev-e68-letterhome | normal | 193 | 155 | OK |
| ev-e68-lotusseason | normal | 176 | 169 | OK |
| ev-e68-musician | normal | 168 | 124 | OK |
| ev-e68-newgirladvice | normal | 175 | 155 | OK |
| ev-e68-officialwife | normal | 163 | 149 | OK |
| ev-e68-painter | normal | 152 | 161 | OK |
| ev-e68-poisonedfish | sinister (poison) | 181 | 24 | too dark |
| ev-e68-proudvisit | normal | 167 | 153 | OK |
| ev-e68-rumoremplove | scheming (rumour) | 179 | 28 | too dark |
| ev-e68-rumorfavor | scheming (rumour) | 101 | 33 | too dark |
| ev-e68-rumorpreg | scheming (rumour) | 171 | 42 | too dark |
| ev-e68-rumorth | scheming (rumour) | 162 | 28 | too dark |
| ev-e68-servhero | normal | 91 | 156 | OK |
| ev-e68-servleave | normal | 179 | 162 | OK |
| ev-e68-sickservant | normal | 155 | 140 | OK |
| ev-e68-silkallot | normal | 160 | 154 | OK |
| ev-e68-snowday | normal | 211 | 176 | OK |
| ev-e68-spoiledfood | sinister (sabotage) | 158 | 30 | too dark |
| ev-e68-springallergy | normal | 178 | 175 | OK |
| ev-e68-stormnight | danger (storm; weather - C to confirm) | 133 | 42 | too dark |
| ev-e68-straycat | normal | 173 | 161 | OK |
| ev-e68-templerite | normal | 174 | 153 | OK |
| ev-e68-thmama | normal | 168 | 153 | OK |
| ev-evpick | normal | 78 | 134 | OK |
| ev-fest-dongchi | normal | 107 | 163 | OK |
| ev-fest-dongchi-b | normal | 108 | 144 | OK |
| ev-fest-giaothua | normal | 77 | 132 | OK |
| ev-fest-giaothua-b | normal | 80 | 136 | OK |
| ev-fest-lapbat | normal | 110 | 165 | OK |
| ev-fest-lapbat-b | normal | 112 | 150 | OK |
| ev-fest-newyear | normal | 112 | 165 | OK |
| ev-fest-nguyentieu | normal | 83 | 139 | OK |
| ev-fest-nguyentieu-b | normal | 78 | 151 | OK |
| ev-fest-thattich | normal | 83 | 131 | OK |
| ev-fest-thattich-b | normal | 78 | 146 | OK |
| ev-fest-trungthu | normal | 80 | 136 | OK |
| ev-fest-trungthu-b | normal | 83 | 155 | OK |
| ev-fest-vulan | normal | 80 | 127 | OK |
| ev-fest-vulan-b | normal | 84 | 147 | OK |
| ev-giftpick | normal | 108 | 161 | OK |
| ev-j70thr | normal | 117 | 171 | OK |
| ev-j71f-doanngo | normal | 111 | 167 | OK |
| ev-j71f-dongchi | normal | 112 | 175 | OK |
| ev-j71f-giaothua | normal | 88 | 139 | OK |
| ev-j71f-lapbat-1 | normal | 108 | 160 | OK |
| ev-j71f-lapbat-2 | normal | 111 | 158 | OK |
| ev-j71f-lapbat-3 | normal | 105 | 152 | OK |
| ev-j71f-newyear | normal | 114 | 159 | OK |
| ev-j71f-nguyentieu | normal | 84 | 137 | OK |
| ev-j71f-phoenix | normal | 117 | 178 | OK |
| ev-j71f-thanhminh | normal | 110 | 165 | OK |
| ev-j71f-thanhtho-1 | normal | 115 | 166 | OK |
| ev-j71f-thanhtho-2 | normal | 109 | 157 | OK |
| ev-j71f-thanhtho-3 | normal | 114 | 167 | OK |
| ev-j71f-thanhtho-4 | normal | 108 | 152 | OK |
| ev-j71f-thanhtho-5 | normal | 110 | 163 | OK |
| ev-j71f-thanhtho-6 | normal | 109 | 159 | OK |
| ev-j71f-thattich | normal | 70 | 128 | OK |
| ev-j71f-trungcuu | normal | 109 | 168 | OK |
| ev-j71f-trungthu | normal | 81 | 149 | OK |
| ev-j71f-vantho-1 | normal | 94 | 157 | OK |
| ev-j71f-vantho-2 | normal | 117 | 169 | OK |
| ev-j71f-vantho-3 | normal | 90 | 148 | OK |
| ev-j71f-vantho-4 | normal | 121 | 171 | OK |
| ev-j71f-vulan | normal | 76 | 137 | OK |
| ev-j71x-sac | normal | 115 | 173 | OK |
| ev-j71x-tai | normal | 83 | 141 | OK |
| ev-nc1 | sinister? (C to confirm) | 46 | 45 | too dark |
| ev-news-tin-trong-cung | scheming (gossip news) | 71 | 43 | too dark |
| ev-plantpick | scheming (plant) | 85 | 34 | too dark |
| ev-q72-dich-thu | normal | 101 | 144 | OK |
| ev-q72-doi-thuoc | normal | 101 | 135 | OK |
| ev-q72-don-ta | normal | 109 | 163 | OK |
| ev-q72-emp-co | normal | 102 | 154 | OK |
| ev-q72-hh-doanngo | normal | 102 | 161 | OK |
| ev-q72-hh-trungcuu | normal | 194 | 153 | OK |
| ev-q72-hh-trungthu | normal | 111 | 153 | OK |
| ev-q72-kho-tet | normal | 108 | 150 | OK |
| ev-q72-loi-thoi | normal | 108 | 168 | OK |
| ev-q72-maid-tet | normal | 105 | 155 | OK |
| ev-q72-mama-nghi | normal | 104 | 153 | OK |
| ev-q72-mat-tram | normal | 105 | 159 | OK |
| ev-q72-mat-tram2 | normal | 102 | 151 | OK |
| ev-q72-ns-doi | normal | 102 | 155 | OK |
| ev-q72-off-con | normal | 111 | 163 | OK |
| ev-q72-off-hoa | normal | 109 | 164 | OK |
| ev-q72-qua-tet | normal | 98 | 139 | OK |
| ev-q72-quat-rv | normal | 104 | 162 | OK |
| ev-q72-su-tet | normal | 117 | 171 | OK |
| ev-q72-th-aodong | normal | 115 | 174 | OK |
| ev-q72-th-kinh2 | normal | 108 | 158 | OK |
| ev-q72-th-mai | normal | 104 | 161 | OK |
| ev-q72-th-thanhminh | normal | 110 | 149 | OK |
| ev-q72-th-trungcuu | normal | 101 | 145 | OK |
| ev-q72-tho-te | normal | 112 | 161 | OK |
| ev-q72-tin-doi | normal | 110 | 167 | OK |
| ev-q72-tu-nu | normal | 112 | 164 | OK |
| ev-q72-tv-mua | normal | 108 | 174 | OK |
| ev-runner | normal | 163 | 168 | OK |
| ev-shop | normal | 154 | 116 | OK |
| ev-taintpick | scheming (taint) | 104 | 36 | too dark |
| ev-td1 | scheming | 64 | 37 | too dark |
| ev-thd1 | normal | 176 | 169 | OK |
| ev-toil-crowd-jealous | scheming | 154 | 99 | too bright |
| ev-toil-emp-dislike | normal | 164 | 158 | OK |
| ev-toil-emp-like | normal | 187 | 163 | OK |
| ev-toil-hh-praise | normal | 155 | 179 | OK |
| ev-toil-hh-scold | sinister (scold) | 149 | 36 | too dark |
| ev-toil-rival-jealous | scheming | 175 | 42 | too dark |
| ev-toil-rival-praise | normal | 177 | 165 | OK |
| ev-toil-rival-tease | scheming | 181 | 41 | too dark |
| ev-toil-th-praise | normal | 152 | 169 | OK |
| ev-toil-th-scold | sinister (scold) | 146 | 43 | too dark |
| ev-tt1 | normal | 165 | 165 | OK |
| ev-tt2 | normal | 165 | 155 | OK |
| ev-tt3 | scheming | 90 | 37 | too dark |
| ev-vlcraft | normal | 169 | 174 | OK |
| ev-vlnvp | normal | 157 | 139 | OK |
| ev-vlout | normal | 165 | 171 | OK |
| ev-vulan | normal | 88 | 110 | too dark (check buổi: night/evening scene?) |
| ev-wk-cam | normal | 161 | 139 | OK |
| ev-wk-hoa | normal | 179 | 153 | OK |
| ev-wk-ky | normal | 167 | 151 | OK |
| ev-wk-nau | normal | 168 | 147 | OK |
| ev-wk-phanson | normal | 159 | 158 | OK |
| ev-wk-phucthien | normal | 159 | 144 | OK |
| ev-wk-theu | normal | 180 | 146 | OK |
| ev-wk-thi | normal | 179 | 141 | OK |
| ev-wk-thuchuc | normal | 166 | 154 | OK |
| ev-wk-y | normal | 152 | 138 | OK |
| intro/G2 | normal | 131 | 160 | OK |
| intro/G4 | normal | 122 | 159 | OK |
| intro/G5 | normal | 109 | 145 | OK |
| intro/G7 | normal | 107 | 154 | OK |
| intro/ch-2 | normal | 82 | 142 | OK |
| intro/ch-3 | normal | 80 | 141 | OK |
| intro/ch-4 | normal | 124 | 166 | OK |
| intro/ch-h3 | normal | 126 | 171 | OK |
| intro/cn-1 | normal | 102 | 137 | OK |
| intro/cn-3 | normal | 124 | 160 | OK |
| intro/cnv-1 | normal | 116 | 159 | OK |
| intro/cnv-2 | normal | 72 | 123 | OK |
| intro/cnv-3 | normal | 121 | 165 | OK |
| intro/cnv-4 | normal | 103 | 153 | OK |
| intro/cnv-h3 | normal | 115 | 170 | OK |
| intro/dtq-h3 | normal | 100 | 153 | OK |
| intro/muoi-1 | normal | 128 | 170 | OK |
| intro/muoi-2 | normal | 88 | 145 | OK |
| intro/muoi-4 | normal | 120 | 169 | OK |
| intro/muoi-h3 | normal | 85 | 133 | OK |
| intro/td-2 | scheming | 79 | 60 | too dark |
| intro/td-3 | normal | 65 | 107 | too dark (check buổi: night/evening scene?) |
| intro/td-h1 | normal | 71 | 115 | OK |
| intro/td-h3 | normal | 100 | 143 | OK |
| intro/thd-2 | normal | 93 | 138 | OK |
| intro/thd-3 | normal | 96 | 144 | OK |
| intro/thd-4 | normal | 130 | 172 | OK |
| intro/thd-h3 | normal | 135 | 156 | OK |
| intro/tt-3 | normal | 74 | 136 | OK |
| opt-giu-chan-hoang-thuong | scheming (option) | 89 | 47 | too dark |

182 keys, 26 not OK. Normal keys with LIVE>=110 = OK for brightness; wrong-buổi/season check is by eye on the sheets and not automated (festival night scenes nguyentieu/vulan/thattich at 127-165 look like lit evenings).

## STEP 2 (UPDATE 2) samples: same composition, light/mood only (LIVE image + act-bat-dau-bay-muu as refs, gpt-2-6 4:3 1k) — NOT uploaded
Sheet LIVE | NEW with lum: dev/handover/reports/event-art-dark-fix/sample2-LIVE-NEWrelight.jpg (sample1 = earlier full repaint, superseded)
| key | creation | LIVE | NEW |
|---|---|---|---|
| ev-am-muu | lJIcGlJgv9 | 28 | 72 |
| ev-e68-poisonedfish | vQ27guza47 | 24 | 77 |
| ev-toil-hh-scold | 6AqIXYziJO | 36 | 69 |
| ev-plantpick | TdUbQagVNR | 34 | 62 |
Self-check: figures/props identical to LIVE, only lit; no faces (backs/far), no text. plantpick 62 slightly under 65 (can re-roll). Waiting for C OK.

## STEP 2 (C ROOT-6 12:30Z): LAB lift of the 12 remaining dark keys — NOT uploaded; Magnific repaint dropped (sample1/sample2 superseded)
Method = dev/handover/reports/event-art-dark-fix/lift.py: same live painted file, LAB lightness gamma solved so mean luma = 72, gentle S-curve, chroma x1.3, webp q86 (135-219 KB).
Sheet LIVE | LIFTED with lum: dev/handover/reports/event-art-dark-fix/lift-sheet-LIVE-LIFTED.jpg
| key | LIVE | LIFTED |
|---|---|---|
| ev-toil-rival-tease | 41 | 72 |
| ev-toil-hh-scold | 36 | 72 |
| ev-toil-rival-jealous | 42 | 72 |
| ev-toil-th-scold | 43 | 72 |
| ev-taintpick | 36 | 72 |
| ev-plantpick | 34 | 72 |
| ev-tt3 | 37 | 72 |
| opt-giu-chan-hoang-thuong | 47 | 72 |
| ev-td1 | 37 | 72 |
| ev-news-tin-trong-cung | 43 | 72 |
| intro/td-2 | 60 | 72 |
| ev-nc1 | 45 | 72 |
Self-check: compositions identical, deep red/indigo shadows kept, moon/candle/lantern glow still read, details readable, no haze/clipping seen at sheet size. ev-toil-crowd-jealous (99) skipped as told.

## UPLOADED (C OK 12:31Z, sample2 relight): ev-am-muu, ev-e68-poisonedfish, ev-toil-hh-scold, ev-plantpick (NEW 72/77/69/62 lum) — cdn_sync explicit paths, 1024x768 webp q84.
## Batch A (relight method, same prompt; 11 keys, NOT uploaded): sheet LIVE0 (original dark, before event-art #2 interim) | NEW with lum: dev/handover/reports/event-art-dark-fix/batchA-LIVE0-NEW.jpg
creations: rumoremplove YMsQKPsWeC, rumorfavor ovNs7Tv829, rumorpreg mERUPBLhJQ, rumorth LwoYDlZswO, spoiledfood ksp2clg16B, hhsummons 79aD8ZoJAL, bordernews 1leA04ur4r, stormnight lJIcezSgv9, leakroof 5jMRYRGKxe, nc1 huZw9ylvqL (scheming: spy envoy), news-tin-trong-cung 6AqICQBiJO. Refs = current live + act-bat-dau-bay-muu. 4 images >82 (stormnight 88) were gamma-trimmed to 80. Self-check: compositions kept, storm/rain kept, backs only, no text; nc1 keeps the live letter's small red seal (unchanged from live).

## Batch B (relight, 9 keys, NOT uploaded): dev/handover/reports/event-art-dark-fix/batchB-LIVE0-NEW.jpg
lum LIVE0 -> NEW: taintpick 36->69, td1 37->71, tt3 37->77, toil-rival-jealous 42->73, toil-rival-tease 41->80, toil-th-scold 43->79, opt-giu-chan-hoang-thuong 47->75, intro/td-2 60->80 (16:9 1280x720), toil-crowd-jealous 99->80 (pastel hall relit to scheming night). creations: taintpick EbnPzt9uuO, td1 6AqIH4KiJO, tt3 Xm4j48pBfo, rival-jealous Xm4j4fIBfo, rival-tease xSXzX9wjfW, th-scold p8O1OqPehw, giu-chan u5Y4Y9LQLD, intro td-2 DoJkJsqpcl, crowd-jealous CqzyzAvEEy. Compositions kept, backs only, no text.

## LIVE (relight method, C OK 12:33-12:40Z): ev-am-muu, ev-e68-poisonedfish, ev-toil-hh-scold, ev-plantpick (sample2) + batch A 11: rumoremplove, rumorfavor, rumorpreg, rumorth, spoiledfood, hhsummons, bordernews, stormnight, leakroof, ev-nc1, ev-news-tin-trong-cung. => all 11 of event-art #2's keys are now the RELIGHT version (LAB-lift interim replaced). LAB-lift versions of my 12 were NEVER uploaded.
## Re-classify pass (owner 12:3xZ: dark class = scheming + dangerous + SAD + dark-natured, incl. people pictures). Batch C (7 SAD keys, relight, NOT uploaded): batchC-sad-LIVE-NEW.jpg
sickservant 140->80, servleave 162->80 (autumn kept), faminedonate 156->74, droughtprayer 154->71, letterhome 155->80, q72-doi-thuoc 135->76 (illness), toil-emp-dislike 158->76 (rejection). creations: VXw560xMMU, xSXzflCjfW, jUBnCONLD0, LwoYE6iswO, huZwTLovqL, KLDZmZZkqp, LwoYEM3swO. Classified by key meaning (event text not read for every key). Not re-classified (look normal/festive by name): fest/j71f festivals incl. Vu Lan, q72 gift/visit, wk minigames, tt1/tt2/vlout/thd1/runner/shop, intro panels other than td-2.
