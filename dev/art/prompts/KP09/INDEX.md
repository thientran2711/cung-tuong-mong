# KP09 INDEX - BODY-FIT overlay pictures (fx-hair-* / fx-cloth-*), 27 prompts
PRIORITY #1 CHECK: git grep origin/main for body-fit / fx-hair- / fx-cloth-: code present (dev/build/jbody.js, KIT.md 1284 section 28.8e, jlooks.js:14/76); assets.json has NO fx-hair-toc/tocam/vuong and NO fx-cloth-* (only older fx-hair-xo-1..3, fx-stain-*, fx-crease-*, fx-vuong-*, fx-muoi-*: other effects, other keys, left alone); dev/art/LOOK_DECALS.md read (those decals are the face/stain set, not these keys). No earlier KP09 prompt exists. img/body-fit.json is not in git (CDN data).
A53: prompt files only, no Magnific, nothing drawn, no credits spent; the owner draws these in ChatGPT.
HOW TO USE: new ChatGPT chat, attach REF_STYLE (dev/handover/prompts_L2095/refs/mau_net_ve.jpg on the handover branch) as the ONLY reference, paste the .txt, ask for ONE image. No person appears, so no identity reference. Each picture is marks on a plain white background; the owner removes the white later (utility op after she asks), then names the file exactly as in the 'key' column and uploads to the CDN img/ folder. Code draws a slot only when the file is in LOOKS_ART (C adds it after delivery).
KEYS: jbody.js line 84-87 builds fx-hair-<id>-<lv>.png (id from LK_HAIR = toc, tocam, vuong) and fx-cloth-<id>-<lv>.png (id from LK_CLOTH = uot, tra, bun, xoc, khoi, moc), lv 1..3 (jlooks.js:76, lkGive clamps 1..3). 3 hair x 3 + 6 cloth x 3 = 27.
SIZES: the layer is stretched onto the measured zone box (jbody.js:70 style = left/top/width/height %). Zone per BAL.body.cloth (jbody.js:~28): uot hem, tra chest, bun hem, xoc waist, khoi chest, moc hem; hair = zone hair. Sizes below were derived from the BAL.body ratios (hair box about 1.45:1, chest about 1.6:1, waist about 2.7:1, hem about 3:1) at 768 px wide; webp/PNG target under 90 KB each.

| code | key (img/ path as code reads it) | prompt file | refs | target | code reads it | note |
|---|---|---|---|---|---|---|
| AJKP09-TOC1-01 | img/fx-hair-toc-1.png | fx-hair-toc-1.txt | REF_STYLE only | 768x512 transparent PNG | dev/build/jbody.js:84 | zone hair; look 'Tóc rối' |
| AJKP09-TOC2-02 | img/fx-hair-toc-2.png | fx-hair-toc-2.txt | REF_STYLE only | 768x512 transparent PNG | dev/build/jbody.js:84 | zone hair; look 'Tóc rối, trâm lệch' |
| AJKP09-TOC3-03 | img/fx-hair-toc-3.png | fx-hair-toc-3.txt | REF_STYLE only | 768x512 transparent PNG | dev/build/jbody.js:84 | zone hair; look 'Tóc xổ tung, trâm rơi' |
| AJKP09-TOCAM1-04 | img/fx-hair-tocam-1.png | fx-hair-tocam-1.txt | REF_STYLE only | 768x512 transparent PNG | dev/build/jbody.js:84 | zone hair; look 'Tóc ẩm' |
| AJKP09-TOCAM2-05 | img/fx-hair-tocam-2.png | fx-hair-tocam-2.txt | REF_STYLE only | 768x512 transparent PNG | dev/build/jbody.js:84 | zone hair; look 'Tóc ướt' |
| AJKP09-TOCAM3-06 | img/fx-hair-tocam-3.png | fx-hair-tocam-3.txt | REF_STYLE only | 768x512 transparent PNG | dev/build/jbody.js:84 | zone hair; look 'Tóc ướt bết' |
| AJKP09-VUONG1-07 | img/fx-hair-vuong-1.png | fx-hair-vuong-1.txt | REF_STYLE only | 768x512 transparent PNG | dev/build/jbody.js:84 | zone hair; look 'Hoa lá vương tóc' |
| AJKP09-VUONG2-08 | img/fx-hair-vuong-2.png | fx-hair-vuong-2.txt | REF_STYLE only | 768x512 transparent PNG | dev/build/jbody.js:84 | zone hair; look 'Hoa lá vương tóc' |
| AJKP09-VUONG3-09 | img/fx-hair-vuong-3.png | fx-hair-vuong-3.txt | REF_STYLE only | 768x512 transparent PNG | dev/build/jbody.js:84 | zone hair; look 'Hoa lá vương tóc' |
| AJKP09-UOT1-10 | img/fx-cloth-uot-1.png | fx-cloth-uot-1.txt | REF_STYLE only | 768x256 transparent PNG | dev/build/jbody.js:87 | zone hem; look 'Áo ẩm' |
| AJKP09-UOT2-11 | img/fx-cloth-uot-2.png | fx-cloth-uot-2.txt | REF_STYLE only | 768x256 transparent PNG | dev/build/jbody.js:87 | zone hem; look 'Áo ướt' |
| AJKP09-UOT3-12 | img/fx-cloth-uot-3.png | fx-cloth-uot-3.txt | REF_STYLE only | 768x256 transparent PNG | dev/build/jbody.js:87 | zone hem; look 'Áo ướt sũng' |
| AJKP09-TRA1-13 | img/fx-cloth-tra-1.png | fx-cloth-tra-1.txt | REF_STYLE only | 768x480 transparent PNG | dev/build/jbody.js:87 | zone chest; look 'Áo vấy trà' |
| AJKP09-TRA2-14 | img/fx-cloth-tra-2.png | fx-cloth-tra-2.txt | REF_STYLE only | 768x480 transparent PNG | dev/build/jbody.js:87 | zone chest; look 'Áo loang vết trà' |
| AJKP09-TRA3-15 | img/fx-cloth-tra-3.png | fx-cloth-tra-3.txt | REF_STYLE only | 768x480 transparent PNG | dev/build/jbody.js:87 | zone chest; look 'Áo ướt đẫm nước trà' |
| AJKP09-BUN1-16 | img/fx-cloth-bun-1.png | fx-cloth-bun-1.txt | REF_STYLE only | 768x256 transparent PNG | dev/build/jbody.js:87 | zone hem; look 'Gấu áo lấm bùn' |
| AJKP09-BUN2-17 | img/fx-cloth-bun-2.png | fx-cloth-bun-2.txt | REF_STYLE only | 768x256 transparent PNG | dev/build/jbody.js:87 | zone hem; look 'Gấu áo lấm bùn' |
| AJKP09-BUN3-18 | img/fx-cloth-bun-3.png | fx-cloth-bun-3.txt | REF_STYLE only | 768x256 transparent PNG | dev/build/jbody.js:87 | zone hem; look 'Áo lấm lem bùn đất' |
| AJKP09-XOC1-19 | img/fx-cloth-xoc-1.png | fx-cloth-xoc-1.txt | REF_STYLE only | 768x288 transparent PNG | dev/build/jbody.js:87 | zone waist; look 'Áo xốc xếch' |
| AJKP09-XOC2-20 | img/fx-cloth-xoc-2.png | fx-cloth-xoc-2.txt | REF_STYLE only | 768x288 transparent PNG | dev/build/jbody.js:87 | zone waist; look 'Áo xốc xếch' |
| AJKP09-XOC3-21 | img/fx-cloth-xoc-3.png | fx-cloth-xoc-3.txt | REF_STYLE only | 768x288 transparent PNG | dev/build/jbody.js:87 | zone waist; look 'Áo xộc xệch tả tơi' |
| AJKP09-KHOI1-22 | img/fx-cloth-khoi-1.png | fx-cloth-khoi-1.txt | REF_STYLE only | 768x480 transparent PNG | dev/build/jbody.js:87 | zone chest; look 'Áo ám khói' |
| AJKP09-KHOI2-23 | img/fx-cloth-khoi-2.png | fx-cloth-khoi-2.txt | REF_STYLE only | 768x480 transparent PNG | dev/build/jbody.js:87 | zone chest; look 'Áo ám khói' |
| AJKP09-KHOI3-24 | img/fx-cloth-khoi-3.png | fx-cloth-khoi-3.txt | REF_STYLE only | 768x480 transparent PNG | dev/build/jbody.js:87 | zone chest; look 'Áo ám khói' |
| AJKP09-MOC1-25 | img/fx-cloth-moc-1.png | fx-cloth-moc-1.txt | REF_STYLE only | 768x256 transparent PNG | dev/build/jbody.js:87 | zone hem; look 'Vạt áo móc chỉ' |
| AJKP09-MOC2-26 | img/fx-cloth-moc-2.png | fx-cloth-moc-2.txt | REF_STYLE only | 768x256 transparent PNG | dev/build/jbody.js:87 | zone hem; look 'Vạt áo rách chỉ' |
| AJKP09-MOC3-27 | img/fx-cloth-moc-3.png | fx-cloth-moc-3.txt | REF_STYLE only | 768x256 transparent PNG | dev/build/jbody.js:87 | zone hem; look 'Vạt áo rách toạc' |

## Skipped (already exists)
None of the 27 keys exist in assets.json. Older look pictures untouched: fx-hair-xo-1..3, fx-stain-tra/uot/bun/moc, fx-crease-*, fx-vuong-hoadao/la/tuyet, fx-muoi-*.

## Open questions for the owner / C
1. Q1 (C): does the .klk layer CSS keep the picture aspect (object-fit) or stretch it to the zone box? Not found in jbody.js; prompts assume stretch, so keep marks away from the canvas edges.
2. Q2 (C): jbody.js:86 skips baked xoc/tra/uot/bun on figures when jcloth already painted them, so on figures only khoi and moc show; the other cloth files show on portraits and when no bake exists. All 18 are still requested (portraits need them).
3. Q3 (owner): xoc is asked as neutral grey folds (same idea as fx-crease, code tints); say if you want it coloured instead.
4. Q4: vuong levels have the same word at all 3 levels, so the level = the amount (5 / 9 / 14 items).

## Checks
$ python3 dev/art/prompts/check_prompts.py dev/art/prompts/KP09
checked 27 files, 0 FAIL
check_prompts canon checks that apply: length, caption code unique, style sentence byte-identical, no percent sign, no mole/earring, no Qing headdress, no-text sentence. check_store.py is the OUTFIT-figure gate: not applicable (no figure). keep_check: not applicable (all new). Generator: gen_KP09.py (reads LK_HAIR / LK_CLOTH / zone map from the code; it also writes _rows.json, deleted after INDEX is built).
