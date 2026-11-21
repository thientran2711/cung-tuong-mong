# J5 WARDROBE (IT02) - prompt files, INDEX

PRIORITY #1 CHECK: git grep origin/main 'wd512|wd-' (dev/build/jinv.js:329-335, j92.js:70-100, assets.json) + OWNER_DECISIONS.md:45 (OD 11/14: per tier 20 items = 10 hairpins + 10 outfits, 8 consort ranks + 5 maid ranks = 260) + GAP_LIST_v4.md:19/66 + FOREMAN_C_STATUS.md:1567/1623 | no review/wardrobe branch exists on origin (stale 66d1bd95 not used) | assets.json already has 138 outfit pictures wd512/wd-<tier>-y-NN, all 53 WD_LIST icons (img/wd-<key>.webp, 25 hi/ twins) and 20 hoa-dien variants -> SKIPPED; missing = the 130 hairpin pictures wd512/wd-<tier>-t-NN, written below.

ART LAW A53: no Magnific generation; these are paste-ready prompts for the owner to draw in ChatGPT (zero credits spent).

How to use: ChatGPT new chat, attach `dev/handover/prompts_L2095/refs/mau_net_ve.jpg` (style reference only, ART takes drawing style only) and NO other reference (objects, no person), paste ONE .txt, ask for ONE image. Result: object on pure white; owner removes background later (utility op after she asks, A53), reduce to 512 x 512 px webp transparent.

Targets: 1024x1024 master -> img/wd512/wd-<tier>-t-NN.webp 512x512 transparent (size per jinv.js:335 / KIT.md:4321 'img/wd512/... already 512'). Tier keys = jinv.js:331 KEQ_TIER (dapung thuongtai quynhan tan phi quyphi hqp hh) + maid m0..m4 (jinv.js:333 isSrv -> 'm1'; SRK.maid j14.js:50).

Rank ladder is referenced by rank (DESIGN_BIBLE s2 ladder t1..t8; hair words = store ladder words build.py TIER_LOW / c06-t4..t6 / t7 crown / TM maid outfits; fabric B12; hair flowers bloom only, no leaves, no chrysanthemum F19, species per rank F2/F19(4); t7/t8 no hair flower; maids no hair flowers K15).

## Counts by tier

| tier key | rank | hairpin prompts | outfit y-NN already on CDN (skipped) |
|---|---|---|---|
| dapung | t1 Đáp ứng | 10 | 10 |
| thuongtai | t2 Thường tại | 10 | 10 |
| quynhan | t3 Quý nhân | 10 | 10 |
| tan | t4 Tần | 10 | 10 |
| phi | t5 Phi | 10 | 10 |
| quyphi | t6 Quý phi | 10 | 10 |
| hqp | t7 Hoàng quý phi | 10 | 10 |
| hh | t8 Hoàng hậu | 10 | 10 |
| m0 | m0 Cung nữ thô sử | 10 | 10 |
| m1 | m1 Cung nữ tam đẳng | 10 | 10 |
| m2 | m2 Cung nữ nhị đẳng | 10 | 10 |
| m3 | m3 Chưởng sự cô cô | 10 | 10 |
| m4 | m4 Nữ quan | 10 | 10 |
| total | | 130 | 138 |

## Consort ranks t1-t8

| code | key (as the CDN would hold it) | prompt file | refs to attach | target | code reads it | note |
|---|---|---|---|---|---|---|
| **t1 Đáp ứng** | | | | | | |
| AJ5-T1T-01 | img/wd512/wd-dapung-t-01.webp | J5/wd-dapung-t-01.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | osmanthus cluster |
| AJ5-T1T-02 | img/wd512/wd-dapung-t-02.webp | J5/wd-dapung-t-02.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | lilac flower |
| AJ5-T1T-03 | img/wd512/wd-dapung-t-03.webp | J5/wd-dapung-t-03.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | pear blossom |
| AJ5-T1T-04 | img/wd512/wd-dapung-t-04.webp | J5/wd-dapung-t-04.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | single-petal peach blossom |
| AJ5-T1T-05 | img/wd512/wd-dapung-t-05.webp | J5/wd-dapung-t-05.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | plum blossom |
| AJ5-T1T-06 | img/wd512/wd-dapung-t-06.webp | J5/wd-dapung-t-06.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | osmanthus cluster |
| AJ5-T1T-07 | img/wd512/wd-dapung-t-07.webp | J5/wd-dapung-t-07.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | lilac flower |
| AJ5-T1T-08 | img/wd512/wd-dapung-t-08.webp | J5/wd-dapung-t-08.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | pear blossom |
| AJ5-T1T-09 | img/wd512/wd-dapung-t-09.webp | J5/wd-dapung-t-09.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | single-petal peach blossom |
| AJ5-T1T-10 | img/wd512/wd-dapung-t-10.webp | J5/wd-dapung-t-10.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | plum blossom |
| **t2 Thường tại** | | | | | | |
| AJ5-T2T-01 | img/wd512/wd-thuongtai-t-01.webp | J5/wd-thuongtai-t-01.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | cymbidium orchid |
| AJ5-T2T-02 | img/wd512/wd-thuongtai-t-02.webp | J5/wd-thuongtai-t-02.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | tiger lily |
| AJ5-T2T-03 | img/wd512/wd-thuongtai-t-03.webp | J5/wd-thuongtai-t-03.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | narcissus |
| AJ5-T2T-04 | img/wd512/wd-thuongtai-t-04.webp | J5/wd-thuongtai-t-04.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | lily magnolia |
| AJ5-T2T-05 | img/wd512/wd-thuongtai-t-05.webp | J5/wd-thuongtai-t-05.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | pomegranate blossom |
| AJ5-T2T-06 | img/wd512/wd-thuongtai-t-06.webp | J5/wd-thuongtai-t-06.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | cymbidium orchid |
| AJ5-T2T-07 | img/wd512/wd-thuongtai-t-07.webp | J5/wd-thuongtai-t-07.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | tiger lily |
| AJ5-T2T-08 | img/wd512/wd-thuongtai-t-08.webp | J5/wd-thuongtai-t-08.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | narcissus |
| AJ5-T2T-09 | img/wd512/wd-thuongtai-t-09.webp | J5/wd-thuongtai-t-09.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | lily magnolia |
| AJ5-T2T-10 | img/wd512/wd-thuongtai-t-10.webp | J5/wd-thuongtai-t-10.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | pomegranate blossom |
| **t3 Quý nhân** | | | | | | |
| AJ5-T3T-01 | img/wd512/wd-quynhan-t-01.webp | J5/wd-quynhan-t-01.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | michelia flower |
| AJ5-T3T-02 | img/wd512/wd-quynhan-t-02.webp | J5/wd-quynhan-t-02.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | semi-double China rose |
| AJ5-T3T-03 | img/wd512/wd-quynhan-t-03.webp | J5/wd-quynhan-t-03.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | double azalea |
| AJ5-T3T-04 | img/wd512/wd-quynhan-t-04.webp | J5/wd-quynhan-t-04.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | semi-double rose of Sharon |
| AJ5-T3T-05 | img/wd512/wd-quynhan-t-05.webp | J5/wd-quynhan-t-05.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | wintersweet flower |
| AJ5-T3T-06 | img/wd512/wd-quynhan-t-06.webp | J5/wd-quynhan-t-06.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | michelia flower |
| AJ5-T3T-07 | img/wd512/wd-quynhan-t-07.webp | J5/wd-quynhan-t-07.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | semi-double China rose |
| AJ5-T3T-08 | img/wd512/wd-quynhan-t-08.webp | J5/wd-quynhan-t-08.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | double azalea |
| AJ5-T3T-09 | img/wd512/wd-quynhan-t-09.webp | J5/wd-quynhan-t-09.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | semi-double rose of Sharon |
| AJ5-T3T-10 | img/wd512/wd-quynhan-t-10.webp | J5/wd-quynhan-t-10.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | wintersweet flower |
| **t4 Tần** | | | | | | |
| AJ5-T4T-01 | img/wd512/wd-tan-t-01.webp | J5/wd-tan-t-01.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | epiphyllum flower |
| AJ5-T4T-02 | img/wd512/wd-tan-t-02.webp | J5/wd-tan-t-02.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | lotus blossom |
| AJ5-T4T-03 | img/wd512/wd-tan-t-03.webp | J5/wd-tan-t-03.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | double peach blossom |
| AJ5-T4T-04 | img/wd512/wd-tan-t-04.webp | J5/wd-tan-t-04.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | double kerria flower |
| AJ5-T4T-05 | img/wd512/wd-tan-t-05.webp | J5/wd-tan-t-05.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | double daylily |
| AJ5-T4T-06 | img/wd512/wd-tan-t-06.webp | J5/wd-tan-t-06.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | epiphyllum flower |
| AJ5-T4T-07 | img/wd512/wd-tan-t-07.webp | J5/wd-tan-t-07.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | lotus blossom |
| AJ5-T4T-08 | img/wd512/wd-tan-t-08.webp | J5/wd-tan-t-08.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | double peach blossom |
| AJ5-T4T-09 | img/wd512/wd-tan-t-09.webp | J5/wd-tan-t-09.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | double kerria flower |
| AJ5-T4T-10 | img/wd512/wd-tan-t-10.webp | J5/wd-tan-t-10.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | double daylily |
| **t5 Phi** | | | | | | |
| AJ5-T5T-01 | img/wd512/wd-phi-t-01.webp | J5/wd-phi-t-01.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | formal double camellia |
| AJ5-T5T-02 | img/wd512/wd-phi-t-02.webp | J5/wd-phi-t-02.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | double hollyhock |
| AJ5-T5T-03 | img/wd512/wd-phi-t-03.webp | J5/wd-phi-t-03.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | tea-scented China rose |
| AJ5-T5T-04 | img/wd512/wd-phi-t-04.webp | J5/wd-phi-t-04.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | double cotton-rose hibiscus |
| AJ5-T5T-05 | img/wd512/wd-phi-t-05.webp | J5/wd-phi-t-05.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | peony-flowered Chinese aster |
| AJ5-T5T-06 | img/wd512/wd-phi-t-06.webp | J5/wd-phi-t-06.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | formal double camellia |
| AJ5-T5T-07 | img/wd512/wd-phi-t-07.webp | J5/wd-phi-t-07.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | double hollyhock |
| AJ5-T5T-08 | img/wd512/wd-phi-t-08.webp | J5/wd-phi-t-08.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | tea-scented China rose |
| AJ5-T5T-09 | img/wd512/wd-phi-t-09.webp | J5/wd-phi-t-09.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | double cotton-rose hibiscus |
| AJ5-T5T-10 | img/wd512/wd-phi-t-10.webp | J5/wd-phi-t-10.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | peony-flowered Chinese aster |
| **t6 Quý phi** | | | | | | |
| AJ5-T6T-01 | img/wd512/wd-quyphi-t-01.webp | J5/wd-quyphi-t-01.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | hundred-petal centifolia rose |
| AJ5-T6T-02 | img/wd512/wd-quyphi-t-02.webp | J5/wd-quyphi-t-02.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | formal thousand-petal camellia |
| AJ5-T6T-03 | img/wd512/wd-quyphi-t-03.webp | J5/wd-quyphi-t-03.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | thousand-petal lotus |
| AJ5-T6T-04 | img/wd512/wd-quyphi-t-04.webp | J5/wd-quyphi-t-04.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | mophead hydrangea |
| AJ5-T6T-05 | img/wd512/wd-quyphi-t-05.webp | J5/wd-quyphi-t-05.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | double crabapple blossom |
| AJ5-T6T-06 | img/wd512/wd-quyphi-t-06.webp | J5/wd-quyphi-t-06.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | hundred-petal centifolia rose |
| AJ5-T6T-07 | img/wd512/wd-quyphi-t-07.webp | J5/wd-quyphi-t-07.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | formal thousand-petal camellia |
| AJ5-T6T-08 | img/wd512/wd-quyphi-t-08.webp | J5/wd-quyphi-t-08.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | thousand-petal lotus |
| AJ5-T6T-09 | img/wd512/wd-quyphi-t-09.webp | J5/wd-quyphi-t-09.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | mophead hydrangea |
| AJ5-T6T-10 | img/wd512/wd-quyphi-t-10.webp | J5/wd-quyphi-t-10.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | double crabapple blossom |
| **t7 Hoàng quý phi** | | | | | | |
| AJ5-T7T-01 | img/wd512/wd-hqp-t-01.webp | J5/wd-hqp-t-01.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | no flower |
| AJ5-T7T-02 | img/wd512/wd-hqp-t-02.webp | J5/wd-hqp-t-02.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | no flower |
| AJ5-T7T-03 | img/wd512/wd-hqp-t-03.webp | J5/wd-hqp-t-03.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | no flower |
| AJ5-T7T-04 | img/wd512/wd-hqp-t-04.webp | J5/wd-hqp-t-04.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | no flower |
| AJ5-T7T-05 | img/wd512/wd-hqp-t-05.webp | J5/wd-hqp-t-05.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | no flower |
| AJ5-T7T-06 | img/wd512/wd-hqp-t-06.webp | J5/wd-hqp-t-06.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | no flower |
| AJ5-T7T-07 | img/wd512/wd-hqp-t-07.webp | J5/wd-hqp-t-07.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | no flower |
| AJ5-T7T-08 | img/wd512/wd-hqp-t-08.webp | J5/wd-hqp-t-08.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | no flower |
| AJ5-T7T-09 | img/wd512/wd-hqp-t-09.webp | J5/wd-hqp-t-09.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | no flower |
| AJ5-T7T-10 | img/wd512/wd-hqp-t-10.webp | J5/wd-hqp-t-10.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | no flower |
| **t8 Hoàng hậu** | | | | | | |
| AJ5-T8T-01 | img/wd512/wd-hh-t-01.webp | J5/wd-hh-t-01.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | no flower |
| AJ5-T8T-02 | img/wd512/wd-hh-t-02.webp | J5/wd-hh-t-02.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | no flower |
| AJ5-T8T-03 | img/wd512/wd-hh-t-03.webp | J5/wd-hh-t-03.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | no flower |
| AJ5-T8T-04 | img/wd512/wd-hh-t-04.webp | J5/wd-hh-t-04.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | no flower |
| AJ5-T8T-05 | img/wd512/wd-hh-t-05.webp | J5/wd-hh-t-05.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | no flower |
| AJ5-T8T-06 | img/wd512/wd-hh-t-06.webp | J5/wd-hh-t-06.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | no flower |
| AJ5-T8T-07 | img/wd512/wd-hh-t-07.webp | J5/wd-hh-t-07.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | no flower |
| AJ5-T8T-08 | img/wd512/wd-hh-t-08.webp | J5/wd-hh-t-08.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | no flower |
| AJ5-T8T-09 | img/wd512/wd-hh-t-09.webp | J5/wd-hh-t-09.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | no flower |
| AJ5-T8T-10 | img/wd512/wd-hh-t-10.webp | J5/wd-hh-t-10.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | no flower |
## Maid rank sets (own group)

| code | key (as the CDN would hold it) | prompt file | refs to attach | target | code reads it | note |
|---|---|---|---|---|---|---|
| **m0 Cung nữ thô sử** | | | | | | |
| AJ5-M0T-01 | img/wd512/wd-m0-t-01.webp | J5/wd-m0-t-01.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | no flower |
| AJ5-M0T-02 | img/wd512/wd-m0-t-02.webp | J5/wd-m0-t-02.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | no flower |
| AJ5-M0T-03 | img/wd512/wd-m0-t-03.webp | J5/wd-m0-t-03.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | no flower |
| AJ5-M0T-04 | img/wd512/wd-m0-t-04.webp | J5/wd-m0-t-04.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | no flower |
| AJ5-M0T-05 | img/wd512/wd-m0-t-05.webp | J5/wd-m0-t-05.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | no flower |
| AJ5-M0T-06 | img/wd512/wd-m0-t-06.webp | J5/wd-m0-t-06.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | no flower |
| AJ5-M0T-07 | img/wd512/wd-m0-t-07.webp | J5/wd-m0-t-07.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | no flower |
| AJ5-M0T-08 | img/wd512/wd-m0-t-08.webp | J5/wd-m0-t-08.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | no flower |
| AJ5-M0T-09 | img/wd512/wd-m0-t-09.webp | J5/wd-m0-t-09.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | no flower |
| AJ5-M0T-10 | img/wd512/wd-m0-t-10.webp | J5/wd-m0-t-10.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | no flower |
| **m1 Cung nữ tam đẳng** | | | | | | |
| AJ5-M1T-01 | img/wd512/wd-m1-t-01.webp | J5/wd-m1-t-01.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | no flower |
| AJ5-M1T-02 | img/wd512/wd-m1-t-02.webp | J5/wd-m1-t-02.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | no flower |
| AJ5-M1T-03 | img/wd512/wd-m1-t-03.webp | J5/wd-m1-t-03.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | no flower |
| AJ5-M1T-04 | img/wd512/wd-m1-t-04.webp | J5/wd-m1-t-04.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | no flower |
| AJ5-M1T-05 | img/wd512/wd-m1-t-05.webp | J5/wd-m1-t-05.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | no flower |
| AJ5-M1T-06 | img/wd512/wd-m1-t-06.webp | J5/wd-m1-t-06.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | no flower |
| AJ5-M1T-07 | img/wd512/wd-m1-t-07.webp | J5/wd-m1-t-07.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | no flower |
| AJ5-M1T-08 | img/wd512/wd-m1-t-08.webp | J5/wd-m1-t-08.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | no flower |
| AJ5-M1T-09 | img/wd512/wd-m1-t-09.webp | J5/wd-m1-t-09.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | no flower |
| AJ5-M1T-10 | img/wd512/wd-m1-t-10.webp | J5/wd-m1-t-10.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | no flower |
| **m2 Cung nữ nhị đẳng** | | | | | | |
| AJ5-M2T-01 | img/wd512/wd-m2-t-01.webp | J5/wd-m2-t-01.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | no flower |
| AJ5-M2T-02 | img/wd512/wd-m2-t-02.webp | J5/wd-m2-t-02.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | no flower |
| AJ5-M2T-03 | img/wd512/wd-m2-t-03.webp | J5/wd-m2-t-03.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | no flower |
| AJ5-M2T-04 | img/wd512/wd-m2-t-04.webp | J5/wd-m2-t-04.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | no flower |
| AJ5-M2T-05 | img/wd512/wd-m2-t-05.webp | J5/wd-m2-t-05.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | no flower |
| AJ5-M2T-06 | img/wd512/wd-m2-t-06.webp | J5/wd-m2-t-06.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | no flower |
| AJ5-M2T-07 | img/wd512/wd-m2-t-07.webp | J5/wd-m2-t-07.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | no flower |
| AJ5-M2T-08 | img/wd512/wd-m2-t-08.webp | J5/wd-m2-t-08.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | no flower |
| AJ5-M2T-09 | img/wd512/wd-m2-t-09.webp | J5/wd-m2-t-09.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | no flower |
| AJ5-M2T-10 | img/wd512/wd-m2-t-10.webp | J5/wd-m2-t-10.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | no flower |
| **m3 Chưởng sự cô cô** | | | | | | |
| AJ5-M3T-01 | img/wd512/wd-m3-t-01.webp | J5/wd-m3-t-01.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | no flower |
| AJ5-M3T-02 | img/wd512/wd-m3-t-02.webp | J5/wd-m3-t-02.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | no flower |
| AJ5-M3T-03 | img/wd512/wd-m3-t-03.webp | J5/wd-m3-t-03.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | no flower |
| AJ5-M3T-04 | img/wd512/wd-m3-t-04.webp | J5/wd-m3-t-04.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | no flower |
| AJ5-M3T-05 | img/wd512/wd-m3-t-05.webp | J5/wd-m3-t-05.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | no flower |
| AJ5-M3T-06 | img/wd512/wd-m3-t-06.webp | J5/wd-m3-t-06.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | no flower |
| AJ5-M3T-07 | img/wd512/wd-m3-t-07.webp | J5/wd-m3-t-07.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | no flower |
| AJ5-M3T-08 | img/wd512/wd-m3-t-08.webp | J5/wd-m3-t-08.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | no flower |
| AJ5-M3T-09 | img/wd512/wd-m3-t-09.webp | J5/wd-m3-t-09.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | no flower |
| AJ5-M3T-10 | img/wd512/wd-m3-t-10.webp | J5/wd-m3-t-10.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | no flower |
| **m4 Nữ quan** | | | | | | |
| AJ5-M4T-01 | img/wd512/wd-m4-t-01.webp | J5/wd-m4-t-01.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | no flower |
| AJ5-M4T-02 | img/wd512/wd-m4-t-02.webp | J5/wd-m4-t-02.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | no flower |
| AJ5-M4T-03 | img/wd512/wd-m4-t-03.webp | J5/wd-m4-t-03.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | no flower |
| AJ5-M4T-04 | img/wd512/wd-m4-t-04.webp | J5/wd-m4-t-04.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | no flower |
| AJ5-M4T-05 | img/wd512/wd-m4-t-05.webp | J5/wd-m4-t-05.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | no flower |
| AJ5-M4T-06 | img/wd512/wd-m4-t-06.webp | J5/wd-m4-t-06.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | no flower |
| AJ5-M4T-07 | img/wd512/wd-m4-t-07.webp | J5/wd-m4-t-07.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | no flower |
| AJ5-M4T-08 | img/wd512/wd-m4-t-08.webp | J5/wd-m4-t-08.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | no flower |
| AJ5-M4T-09 | img/wd512/wd-m4-t-09.webp | J5/wd-m4-t-09.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | no flower |
| AJ5-M4T-10 | img/wd512/wd-m4-t-10.webp | J5/wd-m4-t-10.txt | REF_STYLE only | 512x512 webp transparent | NOT YET READ (no hairpin wd512 lookup; see Q1) | no flower |

## Skipped (already exists)

- 138 outfit pictures `img/wd512/wd-<tier>-y-01..10` (13 tiers x 10) + `wd-nt-y-*` (6) + `wd-tang-y-*` (2): in assets.json.
- all 53 WD_LIST icons `img/wd-<key>.webp` (j92.js:70-98, 53 keys incl. 6 nt_ and 3 hd_ ) and 25 `img/hi/wd-*` twins; `img/wd-hd-<kind>-01..20` hoa-dien variants.
- Outfit keys list: `python3 -c` over assets.json regex `img/wd512/wd-\w+-y-\d+`.

## Open questions for the owner / C

1. Q1 CODE: no code reads wd512 hairpins (jinv.js:347 ghost for tram uses keqArt('tramngoc'); WD_ITEMS icon = img/wd-<key>.webp j92.js:100). Per-tier t-NN pictures need a wiring decision (B/C): data key + pick rule like keqRobe.
2. Q2 OUTFITS: OD 11/14 asks 10 outfits + 10 hairpins per tier; the 10 outfits per tier already exist (wd-<tier>-y-NN). I could not tell from git whether the owner has approved them (history: 'owner rejected the first set'). If she wants them redrawn, say so and I add a y-NN group (130 prompts).
3. Q3 MAID hair flowers: K15 (Lượt 520, no flowers for maids) vs F8 ('each maid rank its own set, all with flower pins'): I followed K15 (no flowers; metal/jade/wood only).
4. Q4 t7/t8: F2 says no hair flower at t7/t8, so their sets are phoenix/crown parts, not blooms; confirm sets of 10 crown parts are fine.
5. Q5 WD_LIST vs 260: j92.js:70 WD_LIST is 53 named items not 260; 'sets' = the tier t-NN/y-NN pictures, not WD_LIST rows.

## Checks

`python3 dev/art/prompts/check_prompts.py dev/art/prompts/J5` -> `checked 130 files, 0 FAIL`. check_store.py (outfit-figure gate) not applicable (object pictures, no figure); keep_check n/a (all new). Sentences S_STYLE/S_COLOUR etc. from _lib (byte-identical). Generator: dev/art/prompts/J5/gen_J5.py (reads KEQ_TIER, RANKS, assets.json from code).
