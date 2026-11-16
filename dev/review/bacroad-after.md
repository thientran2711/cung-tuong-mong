# bạc ↔ road without silver — scan AFTER C7 (this branch)

Script: `NODE_PATH=$(npm root -g) BACSEED=7 node dev/measure/bacroad.js <page> <out.json> dev/measure/pass/data/val.json`. Values in khắc; gap = (E other − E silver) / price (j68: / max(price, 4)); |gap| ≤ 0.3 = she hesitates.

## Summary

| group | pairs | ok | other road obvious | silver obvious | no road | unpriced |
|---|---|---|---|---|---|---|
| j67 r1 | 170 | 152 | 6 | 12 | 0 | 0 |
| j72 r1 | 34 | 25 | 9 | 0 | 0 | 0 |
| jecon r1 | 4 | 0 | 3 | 1 | 0 | 0 |
| jrest r1 | 1 | 1 | 0 | 0 | 0 | 0 |
| j68 r1 | 35 | 15 | 17 | 3 | 0 | 0 |
| act r1 | 25 | 0 | 4 | 0 | 10 | 11 |
| j67 r3 | 170 | 146 | 3 | 21 | 0 | 0 |
| j72 r3 | 34 | 24 | 9 | 1 | 0 | 0 |
| jecon r3 | 4 | 2 | 2 | 0 | 0 | 0 |
| jrest r3 | 1 | 1 | 0 | 0 | 0 | 0 |
| j68 r3 | 35 | 16 | 14 | 5 | 0 | 0 |
| act r3 | 25 | 0 | 4 | 0 | 10 | 11 |
| j67 r5 | 170 | 139 | 3 | 28 | 0 | 0 |
| j72 r5 | 34 | 19 | 9 | 6 | 0 | 0 |
| jecon r5 | 4 | 2 | 1 | 1 | 0 | 0 |
| jrest r5 | 1 | 1 | 0 | 0 | 0 | 0 |
| j68 r5 | 35 | 13 | 13 | 9 | 0 | 0 |
| act r5 | 25 | 0 | 4 | 0 | 10 | 11 |
total 807, off by >30%: 251, errors []

## Every pair

| source | choice | rank | bạc | silver road (odds, khắc, Sức) | other road (odds, khắc, Sức, other) | price (khắc) | E silver | E other | gap | verdict |
|---|---|---|---|---|---|---|---|---|---|---|
| j67 | tt_co.s2 | 1 | 30 | 54.333333333333336%, 0k, Sức 0 | 19.533333333333335%, 0k, Sức 20 | 24 | -16.73 | -15.59 | 0.05 | ok (hesitate) |
| j67 | tt_co.c2 | 1 | 40 | 100%, 0k, Sức 0 | 43.2%, 0k, Sức 20 | 32 | 0 | 5.71 | 0.18 | ok (hesitate) |
| j67 | tt_co.t1 | 1 | 20 | 100%, 0k, Sức 0 | 57.2%, 0k, Sức 19 | 16 | 0 | 2.38 | 0.15 | ok (hesitate) |
| j67 | tt_co.x1 | 1 | 30 | 100%, 0k, Sức 0 | 45.2%, 0k, Sức 20 | 24 | 16 | 10.13 | -0.24 | ok (hesitate) |
| j67 | tt_oan.s1 | 1 | 30 | 100%, 0k, Sức 0 | 45.2%, 0k, Sức 20 | 24 | 0 | 2.9 | 0.12 | ok (hesitate) |
| j67 | tt_oan.s2 | 1 | 35 | 100%, 0k, Sức 0 | 43.2%, 0k, Sức 20 | 28 | 0 | 3.98 | 0.14 | ok (hesitate) |
| j67 | tt_oan.c1 | 1 | 40 | 100%, 0k, Sức 0 | 43.2%, 0k, Sức 20 | 32 | 0 | 5.71 | 0.18 | ok (hesitate) |
| j67 | tt_oan.c2 | 1 | 30 | 55%, 0k, Sức 0 | 20.2%, 0k, Sức 20 | 24 | -10.8 | -5.21 | 0.23 | ok (hesitate) |
| j67 | tt_tranh.s1 | 1 | 30 | 47%, 0k, Sức 0 | 12.2%, 0k, Sức 20 | 24 | -12.72 | -7.8 | 0.21 | ok (hesitate) |
| j67 | tt_tranh.s2 | 1 | 20 | 100%, 0k, Sức 0 | 57.2%, 0k, Sức 19 | 16 | 0 | 2.38 | 0.15 | ok (hesitate) |
| j67 | tt_tranh.c1 | 1 | 15 | 100%, 0k, Sức 0 | 64.2%, 0k, Sức 14 | 12 | 12 | 10.06 | -0.16 | ok (hesitate) |
| j67 | tt_tranh.c3 | 1 | 35 | 100%, 0k, Sức 0 | 43.2%, 0k, Sức 20 | 28 | 0 | 3.98 | 0.14 | ok (hesitate) |
| j67 | tt_tranh.t1 | 1 | 40 | 100%, 0k, Sức 0 | 43.2%, 0k, Sức 20 | 32 | 0 | 5.71 | 0.18 | ok (hesitate) |
| j67 | tt_mat.s1 | 1 | 20 | 45%, 0k, Sức 0 | 22.2%, 0k, Sức 19 | 16 | -8.8 | -6.17 | 0.16 | ok (hesitate) |
| j67 | tt_mat.s2 | 1 | 20 | 100%, 0k, Sức 0 | 57.2%, 0k, Sức 19 | 16 | 0 | 2.38 | 0.15 | ok (hesitate) |
| j67 | tt_mat.c3 | 1 | 30 | 100%, 0k, Sức 0 | 45.2%, 0k, Sức 20 | 24 | 0 | 2.9 | 0.12 | ok (hesitate) |
| j67 | dtq_bien.s1 | 1 | 40 | 100%, 0k, Sức 0 | 43.2%, 0k, Sức 20 | 32 | 0 | 5.71 | 0.18 | ok (hesitate) |
| j67 | dtq_bien.s2 | 1 | 35 | 100%, 0k, Sức 2 | 43.2%, 0k, Sức 20 | 28 | -0.33 | 3.98 | 0.15 | ok (hesitate) |
| j67 | dtq_bien.c1 | 1 | 20 | 35%, 0k, Sức 1 | 12.2%, 0k, Sức 19 | 16 | -10.57 | -8.61 | 0.12 | ok (hesitate) |
| j67 | dtq_bien.c2 | 1 | 20 | 100%, 0k, Sức 0 | 57.2%, 0k, Sức 19 | 16 | 0 | 2.38 | 0.15 | ok (hesitate) |
| j67 | dtq_bien.t1 | 1 | 40 | 100%, 0k, Sức 0 | 43.2%, 0k, Sức 20 | 32 | 0 | 5.71 | 0.18 | ok (hesitate) |
| j67 | dtq_vu.s2 | 1 | 35 | 100%, 0k, Sức 0 | 43.2%, 0k, Sức 20 | 28 | 0 | 3.98 | 0.14 | ok (hesitate) |
| j67 | dtq_vu.c1 | 1 | 30 | 40%, 0k, Sức 1 | 5.2%, 0k, Sức 20 | 24 | -14.57 | -10.07 | 0.19 | ok (hesitate) |
| j67 | dtq_vu.c2 | 1 | 15 | 100%, 0k, Sức 0 | 64.2%, 0k, Sức 14 | 12 | 0 | 2.36 | 0.2 | ok (hesitate) |
| j67 | dtq_binh.s2 | 1 | 20 | 40%, 0k, Sức 0 | 17.2%, 0k, Sức 19 | 16 | -9.6 | -7.39 | 0.14 | ok (hesitate) |
| j67 | dtq_binh.c1 | 1 | 30 | 100%, 0k, Sức 0 | 45.2%, 0k, Sức 20 | 24 | 0 | 2.9 | 0.12 | ok (hesitate) |
| j67 | dtq_binh.c2 | 1 | 20 | 41.666666666666664%, 0k, Sức 0 | 18.866666666666664%, 0k, Sức 19 | 16 | -10.31 | -8.33 | 0.12 | ok (hesitate) |
| j67 | dtq_huynh.s1 | 1 | 40 | 100%, 0k, Sức 0 | 43.2%, 0k, Sức 20 | 32 | 0 | 5.71 | 0.18 | ok (hesitate) |
| j67 | dtq_huynh.s2 | 1 | 20 | 100%, 0k, Sức 0 | 57.2%, 0k, Sức 19 | 16 | 0 | 2.38 | 0.15 | ok (hesitate) |
| j67 | dtq_huynh.c1 | 1 | 30 | 100%, 0k, Sức 0 | 45.2%, 0k, Sức 20 | 24 | 0 | 2.9 | 0.12 | ok (hesitate) |
| j67 | dtq_huynh.c2 | 1 | 15 | 100%, 0k, Sức 0 | 64.2%, 0k, Sức 14 | 12 | 0 | 2.36 | 0.2 | ok (hesitate) |
| j67 | dtq_huynh.t1 | 1 | 40 | 45%, 0k, Sức 0 | 8.2%, 0k, Sức 20 | 32 | -17.6 | -8.44 | 0.29 | ok (hesitate) |
| j67 | muoi_tuoc.s1 | 1 | 55 | 100%, 0k, Sức 0 | 43.2%, 0k, Sức 20 | 44 | 0 | 10.89 | 0.25 | ok (hesitate) |
| j67 | muoi_tuoc.s2 | 1 | 15 | 52%, 0k, Sức 0 | 36.2%, 0k, Sức 14 | 12 | -11.49 | -11.19 | 0.03 | ok (hesitate) |
| j67 | muoi_tuoc.c1 | 1 | 70 | 100%, 0k, Sức 0 | 43.2%, 0k, Sức 20 | 56 | 0 | 16.08 | 0.29 | ok (hesitate) |
| j67 | muoi_tuoc.c2 | 1 | 40 | 40%, 0k, Sức 0 | 5%, 0k, Sức 20 | 32 | -19.2 | -9.73 | 0.3 | ok (hesitate) |
| j67 | muoi_tuoc.c3 | 1 | 15 | 100%, 0k, Sức 0 | 64.2%, 0k, Sức 14 | 12 | 0 | 2.36 | 0.2 | ok (hesitate) |
| j67 | muoi_tuoc.t1 | 1 | 20 | 100%, 0k, Sức 0 | 57.2%, 0k, Sức 19 | 16 | 0 | 2.38 | 0.15 | ok (hesitate) |
| j67 | muoi_tuoc.x1 | 1 | 85 | 50.5%, 0k, Sức 0 | 13.7%, 0k, Sức 20 | 68 | -33.66 | -1.28 | 0.48 | other road obvious |
| j67 | muoi_lau.s1 | 1 | 35 | 100%, 0k, Sức 0 | 43.2%, 0k, Sức 20 | 28 | 0 | 3.98 | 0.14 | ok (hesitate) |
| j67 | muoi_lau.s2 | 1 | 40 | 100%, 0k, Sức 0 | 43.2%, 0k, Sức 20 | 32 | 12.63 | 11.16 | -0.05 | ok (hesitate) |
| j67 | muoi_lau.c1 | 1 | 30 | 100%, 0k, Sức 0 | 45.2%, 0k, Sức 20 | 24 | 0 | 2.9 | 0.12 | ok (hesitate) |
| j67 | muoi_lau.c2 | 1 | 20 | 55%, 0k, Sức 0 | 32.2%, 0k, Sức 19 | 16 | -12.88 | -12.29 | 0.04 | ok (hesitate) |
| j67 | muoi_lau.x1 | 1 | 70 | 100%, 0k, Sức 0 | 43.2%, 0k, Sức 20 | 56 | 0 | 16.08 | 0.29 | ok (hesitate) |
| j67 | muoi_doi.s1 | 1 | 30 | 100%, 0k, Sức 0 | 45.2%, 0k, Sức 20 | 24 | 16.84 | 10.51 | -0.26 | ok (hesitate) |
| j67 | muoi_doi.s2 | 1 | 40 | 100%, 0k, Sức 1 | 43.2%, 0k, Sức 20 | 32 | -0.17 | 5.71 | 0.18 | ok (hesitate) |
| j67 | muoi_doi.c1 | 1 | 55 | 100%, 0k, Sức 0 | 43.2%, 0k, Sức 20 | 44 | 0 | 10.89 | 0.25 | ok (hesitate) |
| j67 | muoi_doi.c2 | 1 | 35 | 100%, 0k, Sức 0 | 43.2%, 0k, Sức 20 | 28 | 0 | 3.98 | 0.14 | ok (hesitate) |
| j67 | muoi_doi.c3 | 1 | 35 | 100%, 0k, Sức 0 | 43.2%, 0k, Sức 20 | 28 | 17.05 | 11.35 | -0.2 | ok (hesitate) |
| j67 | muoi_doi.x1 | 1 | 70 | 60%, 0k, Sức 0 | 23.2%, 0k, Sức 20 | 56 | -22.4 | 3.19 | 0.46 | other road obvious |
| j67 | muoi_no.s1 | 1 | 30 | 100%, 0k, Sức 0 | 45.2%, 0k, Sức 20 | 24 | 0 | 2.9 | 0.12 | ok (hesitate) |
| j67 | muoi_no.s2 | 1 | 30 | 100%, 0k, Sức 0 | 45.2%, 0k, Sức 20 | 24 | 0 | 2.9 | 0.12 | ok (hesitate) |
| j67 | muoi_no.c3 | 1 | 15 | 100%, 0k, Sức 0 | 64.2%, 0k, Sức 14 | 12 | 0 | 2.36 | 0.2 | ok (hesitate) |
| j67 | muoi_no.t1 | 1 | 15 | 100%, 0k, Sức 0 | 64.2%, 0k, Sức 14 | 12 | 12 | 10.06 | -0.16 | ok (hesitate) |
| j67 | muoi_no.x1 | 1 | 40 | 40%, 0k, Sức 0 | 5%, 0k, Sức 20 | 32 | -19.2 | -9.73 | 0.3 | ok (hesitate) |
| j67 | cn_chu.s2 | 1 | 20 | 100%, 0k, Sức 0 | 57.2%, 0k, Sức 19 | 16 | 0 | 2.38 | 0.15 | ok (hesitate) |
| j67 | cn_chu.t1 | 1 | 20 | 40%, 0k, Sức 0 | 17.2%, 0k, Sức 19 | 16 | -9.6 | -7.39 | 0.14 | ok (hesitate) |
| j67 | cn_tinh.s1 | 1 | 30 | 55%, 0k, Sức 0 | 20.2%, 0k, Sức 20 | 24 | -10.8 | -5.21 | 0.23 | ok (hesitate) |
| j67 | cn_tinh.s2 | 1 | 20 | 50%, 0k, Sức 0 | 27.2%, 0k, Sức 19 | 16 | -8 | -4.95 | 0.19 | ok (hesitate) |
| j67 | cn_tinh.c1 | 1 | 35 | 100%, 0k, Sức 0 | 43.2%, 0k, Sức 20 | 28 | 0 | 3.98 | 0.14 | ok (hesitate) |
| j67 | cn_tinh.c2 | 1 | 30 | 55%, 0k, Sức 0 | 20.2%, 0k, Sức 20 | 24 | -16.48 | -15.29 | 0.05 | ok (hesitate) |
| j67 | cn_tinh.t1 | 1 | 30 | 42%, 0k, Sức 0 | 7.2%, 0k, Sức 20 | 24 | -23.69 | -25.05 | -0.06 | ok (hesitate) |
| j67 | cn_ban.s1 | 1 | 20 | 100%, 0k, Sức 0 | 57.2%, 0k, Sức 19 | 16 | 8 | 6.96 | -0.07 | ok (hesitate) |
| j67 | cn_ban.s2 | 1 | 30 | 100%, 0k, Sức 0 | 45.2%, 0k, Sức 20 | 24 | 0 | 2.9 | 0.12 | ok (hesitate) |
| j67 | cn_ban.c2 | 1 | 30 | 55%, 0k, Sức 0 | 20.2%, 0k, Sức 20 | 24 | -16.48 | -15.29 | 0.05 | ok (hesitate) |
| j67 | cn_ban.t1 | 1 | 30 | 55%, 0k, Sức 0 | 20.2%, 0k, Sức 20 | 24 | -10.8 | -5.21 | 0.23 | ok (hesitate) |
| j67 | cn_ban.x1 | 1 | 30 | 100%, 0k, Sức 0 | 45.2%, 0k, Sức 20 | 24 | 8 | 6.52 | -0.06 | ok (hesitate) |
| j67 | cn_than.s1 | 1 | 20 | 100%, 0k, Sức 0 | 57.2%, 0k, Sức 19 | 16 | 16 | 11.53 | -0.28 | ok (hesitate) |
| j67 | cn_than.s2 | 1 | 15 | 55%, 0k, Sức 0 | 39.2%, 0k, Sức 14 | 12 | -5.4 | -2.75 | 0.22 | ok (hesitate) |
| j67 | cn_than.c1 | 1 | 30 | 50%, 0k, Sức 0 | 15.2%, 0k, Sức 20 | 24 | -12 | -6.83 | 0.22 | ok (hesitate) |
| j67 | cn_than.c2 | 1 | 30 | 50%, 0k, Sức 0 | 15.2%, 0k, Sức 20 | 24 | -12 | -6.83 | 0.22 | ok (hesitate) |
| j67 | nc_gian.s2 | 1 | 30 | 52%, 0k, Sức 0 | 17.2%, 0k, Sức 20 | 24 | -11.52 | -6.18 | 0.22 | ok (hesitate) |
| j67 | nc_gian.c2 | 1 | 35 | 100%, 0k, Sức 0 | 43.2%, 0k, Sức 20 | 28 | 0 | 3.98 | 0.14 | ok (hesitate) |
| j67 | nc_su.s2 | 1 | 55 | 100%, 0k, Sức 0 | 43.2%, 0k, Sức 20 | 44 | 0 | 10.89 | 0.25 | ok (hesitate) |
| j67 | nc_su.c2 | 1 | 35 | 100%, 0k, Sức 0 | 43.2%, 0k, Sức 20 | 28 | 0 | 3.98 | 0.14 | ok (hesitate) |
| j67 | nc_tuc.s2 | 1 | 5 | 50%, 0k, Sức 0 | 38.2%, 0k, Sức 6 | 4 | -2.67 | -5.5 | -0.71 | silver obvious |
| j67 | nc_tuc.c2 | 1 | 20 | 50%, 0k, Sức 0 | 27.2%, 0k, Sức 19 | 16 | -6.47 | -5.03 | 0.09 | ok (hesitate) |
| j67 | nc_tuc.x1 | 1 | 40 | 100%, 0k, Sức 0 | 43.2%, 0k, Sức 20 | 32 | 0 | 5.71 | 0.18 | ok (hesitate) |
| j67 | nc_vuong.s2 | 1 | 20 | 40%, 0k, Sức 0 | 17.2%, 0k, Sức 19 | 16 | -9.6 | -7.39 | 0.14 | ok (hesitate) |
| j67 | nc_vuong.c2 | 1 | 30 | 100%, 0k, Sức 0 | 45.2%, 0k, Sức 20 | 24 | 0 | 2.9 | 0.12 | ok (hesitate) |
| j67 | nc_vuong.c3 | 1 | 40 | 100%, 0k, Sức 0 | 43.2%, 0k, Sức 20 | 32 | 0 | 5.71 | 0.18 | ok (hesitate) |
| j67 | td_an.s1 | 1 | 30 | 55%, 0k, Sức 0 | 20.2%, 0k, Sức 20 | 24 | -10.8 | -5.21 | 0.23 | ok (hesitate) |
| j67 | td_an.c1 | 1 | 30 | 100%, 0k, Sức 0 | 62%, 0k, Sức 6 | 24 | 0 | 9.08 | 0.38 | other road obvious |
| j67 | td_an.c2 | 1 | 35 | 35%, 0k, Sức 0 | 5%, 0k, Sức 20 | 28 | -18.2 | -9.93 | 0.3 | ok (hesitate) |
| j67 | td_an.c3 | 1 | 30 | 100%, 0k, Sức 0 | 45.2%, 0k, Sức 20 | 24 | 0 | 2.9 | 0.12 | ok (hesitate) |
| j67 | td_an.t1 | 1 | 30 | 45%, 0k, Sức 0 | 10.2%, 0k, Sức 20 | 24 | -13.2 | -8.45 | 0.2 | ok (hesitate) |
| j67 | td_ke.s1 | 1 | 30 | 50%, 0k, Sức 0 | 15.2%, 0k, Sức 20 | 24 | -12 | -6.83 | 0.22 | ok (hesitate) |
| j67 | td_ke.s2 | 1 | 20 | 50%, 0k, Sức 0 | 27.2%, 0k, Sức 19 | 16 | -8 | -4.95 | 0.19 | ok (hesitate) |
| j67 | td_ke.c2 | 1 | 30 | 100%, 0k, Sức 0 | 45.2%, 0k, Sức 20 | 24 | 0 | 2.9 | 0.12 | ok (hesitate) |
| j67 | td_song.s1 | 1 | 35 | 100%, 0k, Sức 0 | 43.2%, 0k, Sức 20 | 28 | 0 | 3.98 | 0.14 | ok (hesitate) |
| j67 | td_song.c1 | 1 | 35 | 60%, 0k, Sức 0 | 23.2%, 0k, Sức 20 | 28 | -11.2 | -3.3 | 0.28 | ok (hesitate) |
| j67 | td_song.t1 | 1 | 40 | 60%, 0k, Sức 0 | 23.2%, 0k, Sức 20 | 32 | -12.8 | -2.38 | 0.33 | other road obvious |
| j67 | td_song.x1 | 1 | 30 | 100%, 0k, Sức 0 | 45.2%, 0k, Sức 20 | 24 | 0 | 2.9 | 0.12 | ok (hesitate) |
| j67 | td_tha.c3 | 1 | 20 | 100%, 0k, Sức 0 | 57.2%, 0k, Sức 19 | 16 | 8 | 6.96 | -0.07 | ok (hesitate) |
| j67 | ch_co.s2 | 1 | 30 | 45%, 0k, Sức 0 | 10.2%, 0k, Sức 20 | 24 | -14.12 | -9.94 | 0.17 | ok (hesitate) |
| j67 | ch_benh.s1 | 1 | 40 | 50%, 0k, Sức 0 | 13.2%, 0k, Sức 20 | 32 | -16 | -6.42 | 0.3 | ok (hesitate) |
| j67 | ch_benh.s2 | 1 | 20 | 100%, 0k, Sức 0 | 57.2%, 0k, Sức 19 | 16 | 8 | 6.96 | -0.07 | ok (hesitate) |
| j67 | ch_benh.c1 | 1 | 20 | 45%, 0k, Sức 0 | 22.2%, 0k, Sức 19 | 16 | -8.8 | -6.17 | 0.16 | ok (hesitate) |
| j67 | ch_ho.s2 | 1 | 40 | 100%, 0k, Sức 0 | 43.2%, 0k, Sức 20 | 32 | 0 | 5.71 | 0.18 | ok (hesitate) |
| j67 | ch_ho.c1 | 1 | 35 | 100%, 0k, Sức 0 | 43.2%, 0k, Sức 20 | 28 | 0 | 3.98 | 0.14 | ok (hesitate) |
| j67 | ch_bi.s2 | 1 | 20 | 50%, 0k, Sức 0 | 27.2%, 0k, Sức 19 | 16 | -8 | -4.95 | 0.19 | ok (hesitate) |
| j67 | ch_bi.c3 | 1 | 35 | 35%, 0k, Sức 0 | 5%, 0k, Sức 20 | 28 | -19.07 | -11.2 | 0.28 | ok (hesitate) |
| j67 | ch_bi.t1 | 1 | 20 | 100%, 0k, Sức 0 | 57.2%, 0k, Sức 19 | 16 | 0 | 2.38 | 0.15 | ok (hesitate) |
| j67 | thd_tho.s2 | 1 | 35 | 100%, 0k, Sức 0 | 43.2%, 0k, Sức 20 | 28 | 0 | 3.98 | 0.14 | ok (hesitate) |
| j67 | thd_tho.c1 | 1 | 20 | 45%, 0k, Sức 0 | 22.2%, 0k, Sức 19 | 16 | -22.69 | -25.82 | -0.2 | ok (hesitate) |
| j67 | thd_tho.c2 | 1 | 35 | 50%, 0k, Sức 0 | 13.2%, 0k, Sức 20 | 28 | -30.84 | -36.18 | -0.19 | ok (hesitate) |
| j67 | thd_sach.c2 | 1 | 35 | 100%, 0k, Sức 0 | 43.2%, 0k, Sức 20 | 28 | 0 | 3.98 | 0.14 | ok (hesitate) |
| j67 | thd_sach.c3 | 1 | 15 | 50%, 0k, Sức 0 | 34.2%, 0k, Sức 14 | 12 | -6 | -3.77 | 0.19 | ok (hesitate) |
| j67 | thd_tro.s1 | 1 | 20 | 100%, 0k, Sức 0 | 57.2%, 0k, Sức 19 | 16 | 8 | 6.96 | -0.07 | ok (hesitate) |
| j67 | thd_tro.c1 | 1 | 20 | 100%, 0k, Sức 0 | 57.2%, 0k, Sức 19 | 16 | 0 | 2.38 | 0.15 | ok (hesitate) |
| j67 | thd_tro.c2 | 1 | 35 | 50%, 0k, Sức 0 | 13.2%, 0k, Sức 20 | 28 | -14 | -6.95 | 0.25 | ok (hesitate) |
| j67 | thd_tro.c3 | 1 | 30 | 100%, 0k, Sức 0 | 45.2%, 0k, Sức 20 | 24 | 0 | 2.9 | 0.12 | ok (hesitate) |
| j67 | thd_hoc.t1 | 1 | 20 | 55%, 0k, Sức 0 | 32.2%, 0k, Sức 19 | 16 | -14.78 | -15.14 | -0.02 | ok (hesitate) |
| j67 | cnv_chu.s2 | 1 | 5 | 50%, 0k, Sức 0 | 38.2%, 0k, Sức 6 | 4 | -3 | -5.91 | -0.73 | silver obvious |
| j67 | cnv_chu.x1 | 1 | 5 | 100%, 0k, Sức 0 | 68.2%, 0k, Sức 6 | 4 | 20 | 12.69 | -1.83 | silver obvious |
| j67 | cnv_ban.s1 | 1 | 5 | 50%, 0k, Sức 0 | 38.2%, 0k, Sức 6 | 4 | -2 | -4.68 | -0.67 | silver obvious |
| j67 | cnv_ban.c1 | 1 | 5 | 100%, 0k, Sức 1 | 68.2%, 0k, Sức 6 | 4 | 19.83 | 12.69 | -1.79 | silver obvious |
| j67 | cnv_ban.t1 | 1 | 5 | 50%, 0k, Sức 0 | 38.2%, 0k, Sức 6 | 4 | -2 | -4.68 | -0.67 | silver obvious |
| j67 | cnv_mat.c1 | 1 | 5 | 55%, 0k, Sức 0 | 43.2%, 0k, Sức 6 | 4 | -2.7 | -5.19 | -0.62 | silver obvious |
| j67 | cnv_mat.t1 | 1 | 5 | 40%, 0k, Sức 0 | 28.2%, 0k, Sức 6 | 4 | -4.4 | -8.31 | -0.98 | silver obvious |
| j67 | cnv_ma.c1 | 1 | 5 | 100%, 0k, Sức 0 | 68.2%, 0k, Sức 6 | 4 | 0 | -0.95 | -0.24 | ok (hesitate) |
| j67 | cnv_ma.c2 | 1 | 5 | 100%, 0k, Sức 0 | 68.2%, 0k, Sức 6 | 4 | 20 | 12.69 | -1.83 | silver obvious |
| j67 | cnv_ma.x1 | 1 | 5 | 45%, 0k, Sức 0 | 33.2%, 0k, Sức 6 | 4 | -2.2 | -5.3 | -0.77 | silver obvious |
| j67 | s_than.s1 | 1 | 15 | 100%, 0k, Sức 0 | 64.2%, 0k, Sức 14 | 12 | 4 | 4.92 | 0.08 | ok (hesitate) |
| j67 | s_than.s2 | 1 | 15 | 100%, 0k, Sức 0 | 64.2%, 0k, Sức 14 | 12 | 0 | 2.36 | 0.2 | ok (hesitate) |
| j67 | s_than.c1 | 1 | 15 | 45%, 0k, Sức 0 | 29.2%, 0k, Sức 14 | 12 | -13.55 | -13.73 | -0.02 | ok (hesitate) |
| j67 | s_than.c3 | 1 | 20 | 50%, 0k, Sức 0 | 27.2%, 0k, Sức 19 | 16 | -10.32 | -11.96 | -0.1 | ok (hesitate) |
| j67 | s_than.x1 | 1 | 30 | 100%, 0k, Sức 0 | 45.2%, 0k, Sức 20 | 24 | 0 | 2.9 | 0.12 | ok (hesitate) |
| j67 | s_thu.s2 | 1 | 15 | 100%, 0k, Sức 0 | 64.2%, 0k, Sức 14 | 12 | 0 | 2.36 | 0.2 | ok (hesitate) |
| j67 | s_thu.c1 | 1 | 20 | 55%, 0k, Sức 0 | 32.2%, 0k, Sức 19 | 16 | -7.2 | -3.72 | 0.22 | ok (hesitate) |
| j67 | s_thu.c3 | 1 | 20 | 100%, 0k, Sức 0 | 57.2%, 0k, Sức 19 | 16 | 0 | 2.38 | 0.15 | ok (hesitate) |
| j67 | s_hoa.s2 | 1 | 15 | 100%, 0k, Sức 0 | 64.2%, 0k, Sức 14 | 12 | 0 | 2.36 | 0.2 | ok (hesitate) |
| j67 | s_hoa.c3 | 1 | 35 | 100%, 0k, Sức 0 | 43.2%, 0k, Sức 20 | 28 | 0.84 | 4.34 | 0.13 | ok (hesitate) |
| j67 | s_su.c3 | 1 | 15 | 60%, 0k, Sức 0 | 44.2%, 0k, Sức 14 | 12 | -4.8 | -1.73 | 0.26 | ok (hesitate) |
| j67 | s_su.x1 | 1 | 20 | 49.666666666666664%, 0k, Sức 0 | 26.866666666666664%, 0k, Sức 19 | 16 | -8.05 | -5.03 | 0.19 | ok (hesitate) |
| j67 | s_dich.s1 | 1 | 20 | 100%, 0k, Sức 0 | 57.2%, 0k, Sức 19 | 16 | 0 | 2.38 | 0.15 | ok (hesitate) |
| j67 | s_dich.c1 | 1 | 30 | 55%, 0k, Sức 0 | 20.2%, 0k, Sức 20 | 24 | -6.4 | -3.59 | 0.12 | ok (hesitate) |
| j67 | s_dich.c2 | 1 | 15 | 100%, 0k, Sức 0 | 64.2%, 0k, Sức 14 | 12 | 0.63 | 2.76 | 0.18 | ok (hesitate) |
| j67 | s_dich.t1 | 1 | 35 | 100%, 0k, Sức 0 | 43.2%, 0k, Sức 20 | 28 | 0 | 3.98 | 0.14 | ok (hesitate) |
| j67 | s_tinh.c3 | 1 | 35 | 100%, 0k, Sức 0 | 43.2%, 0k, Sức 20 | 28 | 0 | 3.98 | 0.14 | ok (hesitate) |
| j67 | s_tinh.t1 | 1 | 30 | 60%, 0k, Sức 0 | 25.2%, 0k, Sức 20 | 24 | -16.34 | -16.18 | 0.01 | ok (hesitate) |
| j67 | s_thay.s2 | 1 | 15 | 100%, 0k, Sức 0 | 64.2%, 0k, Sức 14 | 12 | 0 | 2.36 | 0.2 | ok (hesitate) |
| j67 | s_thay.t1 | 1 | 15 | 45%, 0k, Sức 0 | 29.2%, 0k, Sức 14 | 12 | -6.6 | -4.79 | 0.15 | ok (hesitate) |
| j67 | s_ban.c2 | 1 | 20 | 50%, 0k, Sức 0 | 27.2%, 0k, Sức 19 | 16 | -8 | -4.95 | 0.19 | ok (hesitate) |
| j67 | s_ban.x1 | 1 | 20 | 100%, 0k, Sức 0 | 57.2%, 0k, Sức 19 | 16 | 0 | 2.38 | 0.15 | ok (hesitate) |
| j67 | st_the.s1 | 1 | 20 | 55%, 0k, Sức 0 | 32.2%, 0k, Sức 19 | 16 | -7.2 | -3.72 | 0.22 | ok (hesitate) |
| j67 | st_the.s2 | 1 | 30 | 100%, 0k, Sức 0 | 45.2%, 0k, Sức 20 | 24 | 0 | 2.9 | 0.12 | ok (hesitate) |
| j67 | st_the.c1 | 1 | 30 | 55%, 0k, Sức 0 | 20.2%, 0k, Sức 20 | 24 | -10.8 | -5.21 | 0.23 | ok (hesitate) |
| j67 | st_the.c3 | 1 | 15 | 100%, 0k, Sức 0 | 64.2%, 0k, Sức 14 | 12 | 2.63 | 4.05 | 0.12 | ok (hesitate) |
| j67 | st_the.x1 | 1 | 30 | 35%, 0k, Sức 0 | 5%, 0k, Sức 20 | 24 | -15.6 | -10.13 | 0.23 | ok (hesitate) |
| j67 | st_con.s1 | 1 | 20 | 100%, 0k, Sức 0 | 57.2%, 0k, Sức 19 | 16 | 0 | 2.38 | 0.15 | ok (hesitate) |
| j67 | st_con.s2 | 1 | 20 | 65%, 0k, Sức 6 | 42.2%, 0k, Sức 19 | 16 | -6.6 | -1.28 | 0.33 | other road obvious |
| j67 | st_con.c1 | 1 | 20 | 100%, 0k, Sức 0 | 57.2%, 0k, Sức 19 | 16 | 0 | 2.38 | 0.15 | ok (hesitate) |
| j67 | st_con.t1 | 1 | 20 | 40%, 0k, Sức 0 | 17.2%, 0k, Sức 19 | 16 | -9.6 | -7.39 | 0.14 | ok (hesitate) |
| j67 | st_dong.c2 | 1 | 35 | 100%, 0k, Sức 0 | 43.2%, 0k, Sức 20 | 28 | 0 | 3.98 | 0.14 | ok (hesitate) |
| j67 | st_dong.c3 | 1 | 35 | 55%, 0k, Sức 0 | 18.2%, 0k, Sức 20 | 28 | -12.6 | -5.13 | 0.27 | ok (hesitate) |
| j67 | st_dong.t1 | 1 | 20 | 45%, 0k, Sức 0 | 22.2%, 0k, Sức 19 | 16 | -8.8 | -6.17 | 0.16 | ok (hesitate) |
| j67 | tm96a.a1 | 1 | 5 | 100%, 0k, Sức 0 | 68.2%, 0k, Sức 6 | 4 | 20 | 12.69 | -1.83 | silver obvious |
| j67 | tm96a.a2 | 1 | 5 | 100%, 0k, Sức 0 | 68.2%, 0k, Sức 6 | 4 | 0 | -0.95 | -0.24 | ok (hesitate) |
| j67 | tm96a.a3 | 1 | 5 | 100%, 0k, Sức 0 | 68.2%, 0k, Sức 6 | 4 | 20 | 12.69 | -1.83 | silver obvious |
| j67 | tm96a.a5 | 1 | 15 | 100%, 0k, Sức 0 | 64.2%, 0k, Sức 14 | 12 | 0 | 2.36 | 0.2 | ok (hesitate) |
| j67 | tm96a.a6 | 1 | 5 | 100%, 0k, Sức 0 | 68.2%, 0k, Sức 6 | 4 | 0 | -0.95 | -0.24 | ok (hesitate) |
| j67 | tm96b.b1l | 1 | 55 | 100%, 0k, Sức 0 | 43.2%, 0k, Sức 20 | 44 | 0 | 10.89 | 0.25 | ok (hesitate) |
| j67 | tm96b.b2a | 1 | 15 | 100%, 0k, Sức 0 | 64.2%, 0k, Sức 14 | 12 | 4 | 4.92 | 0.08 | ok (hesitate) |
| j67 | tm96b.b3a | 1 | 40 | 45%, 0k, Sức 0 | 8.2%, 0k, Sức 20 | 32 | -17.6 | -8.44 | 0.29 | ok (hesitate) |
| j67 | tm96b.b3b | 1 | 35 | 100%, 0k, Sức 0 | 43.2%, 0k, Sức 20 | 28 | 0 | 3.98 | 0.14 | ok (hesitate) |
| j67 | tm96c.c1o | 1 | 40 | 100%, 0k, Sức 0 | 43.2%, 0k, Sức 20 | 32 | 0 | 5.71 | 0.18 | ok (hesitate) |
| j67 | tm96c.c2 | 1 | 40 | 52.5%, 0k, Sức 0 | 15.7%, 0k, Sức 20 | 32 | -23.2 | -19.61 | 0.11 | ok (hesitate) |
| j67 | tm96c.c4b | 1 | 55 | 45%, 0k, Sức 0 | 8.2%, 0k, Sức 20 | 44 | -24.2 | -7.46 | 0.38 | other road obvious |
| j67 | tm96c.c5 | 1 | 40 | 100%, 0k, Sức 0 | 43.2%, 0k, Sức 20 | 32 | 0 | 5.71 | 0.18 | ok (hesitate) |
| j72 | th_thuoc#1 | 1 | 40 | 75%, 1k, Sức 0 | 45%, 1k, Sức 0 | 32 | -9 | 13.4 | 0.7 | other road obvious |
| j72 | rv_thuoc#1 | 1 | 15 | 75%, 1k, Sức 0 | 56%, 8k, Sức 14 | 12 | -4 | -3.61 | 0.03 | ok (hesitate) |
| j72 | rv_tham_om#1 | 1 | 10 | 80%, 1k, Sức 0 | 67%, 6k, Sức 10 | 8 | -2.6 | -2.31 | 0.04 | ok (hesitate) |
| j72 | thuoc_cam#1 | 1 | 15 | 100%, 1k, Sức 0 | 81%, 8k, Sức 14 | 12 | -1 | -0.61 | 0.03 | ok (hesitate) |
| j72 | rv_con_om#1 | 1 | 15 | 85%, 1k, Sức 0 | 66%, 8k, Sức 14 | 12 | -2.8 | -2.41 | 0.03 | ok (hesitate) |
| j72 | bo_chung#2 | 1 | 30 | 100%, 1k, Sức 0 | 50%, 1k, Sức 0 | 24 | -1 | 11 | 0.5 | other road obvious |
| j72 | loi_thoi#2 | 1 | 10 | 65%, 1k, Sức 0 | 52%, 6k, Sức 10 | 8 | -3.8 | -3.51 | 0.04 | ok (hesitate) |
| j72 | bac_mat#2 | 1 | 20 | 100%, 1k, Sức 0 | 100%, 1k, Sức 0 | 16 | -1 | 15 | 1 | other road obvious |
| j72 | chuoc_sv#1 | 1 | 30 | 100%, 1k, Sức 0 | 62%, 14k, Sức 20 | 24 | -1 | -2.45 | -0.06 | ok (hesitate) |
| j72 | qua_tet#1 | 1 | 20 | 55%, 1k, Sức 0 | 29%, 10k, Sức 19 | 16 | -8.2 | -8.53 | -0.02 | ok (hesitate) |
| j72 | ao_bien#1 | 1 | 30 | 55%, 2k, Sức 0 | 17%, 15k, Sức 20 | 24 | -12.8 | -14.25 | -0.06 | ok (hesitate) |
| j72 | tham_o#1 | 1 | 20 | 40%, 2k, Sức 0 | 14%, 11k, Sức 19 | 16 | -11.6 | -11.93 | -0.02 | ok (hesitate) |
| j72 | vay_bac#1 | 1 | 66 | 100%, 1k, Sức 0 | 60%, 28k, Sức 20 | 52.8 | -1 | 0.35 | 0.03 | ok (hesitate) |
| j72 | rv_ngheo#1 | 1 | 30 | 100%, 1k, Sức 0 | 62%, 14k, Sức 20 | 24 | -1 | -2.45 | -0.06 | ok (hesitate) |
| j72 | rv_huong#1 | 1 | 10 | 50%, 2k, Sức 0 | 37%, 7k, Sức 10 | 8 | -6 | -5.71 | 0.04 | ok (hesitate) |
| j72 | canh_thai#1 | 1 | 15 | 55%, 1k, Sức 0 | 36%, 8k, Sức 14 | 12 | -6.4 | -6.01 | 0.03 | ok (hesitate) |
| j72 | lc_ao#1 | 1 | 15 | 100%, 1k, Sức 0 | 81%, 8k, Sức 14 | 12 | -1 | -0.61 | 0.03 | ok (hesitate) |
| j72 | maid_vay#1 | 1 | 30 | 100%, 1k, Sức 0 | 62%, 14k, Sức 20 | 24 | -1 | -2.45 | -0.06 | ok (hesitate) |
| j72 | sv_luong#1 | 1 | 15 | 100%, 1k, Sức 0 | 50%, 1k, Sức 0 | 12 | -1 | 5 | 0.5 | other road obvious |
| j72 | dt_che#1 | 1 | 20 | 100%, 1k, Sức 0 | 100%, 1k, Sức 0 | 16 | -1 | 15 | 1 | other road obvious |
| j72 | xc_uoc#1 | 1 | 20 | 55%, 1k, Sức 0 | 29%, 10k, Sức 19 | 16 | -8.2 | -8.53 | -0.02 | ok (hesitate) |
| j72 | xc_hoimon#1 | 1 | 30 | 100%, 1k, Sức 0 | 60%, 2k, Sức 0 | 24 | -1 | 12.4 | 0.56 | other road obvious |
| j72 | dong_tam#1 | 1 | 8 | 100%, 1k, Sức 0 | 90%, 5k, Sức 8 | 6.4 | -1 | -0.57 | 0.07 | ok (hesitate) |
| j72 | giau_cn#2 | 1 | 20 | 55%, 1k, Sức 0 | 60%, 1k, Sức 0 | 16 | -8.2 | 8.6 | 1.05 | other road obvious |
| j72 | th_trungcuu#2 | 1 | 10 | 55%, 1k, Sức 0 | 42%, 6k, Sức 10 | 8 | -4.6 | -4.31 | 0.04 | ok (hesitate) |
| j72 | hh_trungthu#2 | 1 | 40 | 100%, 1k, Sức 0 | 55%, 1k, Sức 0 | 32 | -1 | 16.6 | 0.55 | other road obvious |
| j72 | hh_trungcuu#2 | 1 | 30 | 100%, 1k, Sức 0 | 45%, 1k, Sức 0 | 24 | -1 | 9.8 | 0.45 | other road obvious |
| j72 | hh_doanngo#1 | 1 | 10 | 65%, 2k, Sức 0 | 52%, 7k, Sức 10 | 8 | -4.8 | -4.51 | 0.04 | ok (hesitate) |
| j72 | th_aodong#1 | 1 | 20 | 65%, 2k, Sức 0 | 39%, 11k, Sức 19 | 16 | -7.6 | -7.93 | -0.02 | ok (hesitate) |
| j72 | tv_mua#1 | 1 | 15 | 65%, 1k, Sức 0 | 46%, 8k, Sức 14 | 12 | -5.2 | -4.81 | 0.03 | ok (hesitate) |
| j72 | maid_tet#1 | 1 | 10 | 100%, 1k, Sức 0 | 87%, 6k, Sức 10 | 8 | -1 | -0.71 | 0.04 | ok (hesitate) |
| j72 | fam_muoi#1 | 1 | 20 | 50%, 1k, Sức 0 | 24%, 10k, Sức 19 | 16 | -9 | -9.33 | -0.02 | ok (hesitate) |
| j72 | fam_cn#1 | 1 | 15 | 55%, 1k, Sức 0 | 36%, 8k, Sức 14 | 12 | -6.4 | -6.01 | 0.03 | ok (hesitate) |
| j72 | fam_td#1 | 1 | 40 | 100%, 1k, Sức 0 | 60%, 18k, Sức 20 | 32 | -1 | -2.13 | -0.04 | ok (hesitate) |
| jecon | Dò la ↔ Tự đi dò la | 1 | 17 | 42%, 2k, Sức 0 | 28%, 2k, Sức 0 | 13.6 | -11.43 | -6.17 | 0.39 | other road obvious |
| jecon | Mua chuộc ↔ Sai cung nữ lấy lòng | 1 | 44 | 6%, 2k, Sức 0 | 5%, 2k, Sức 0, +8.3k | 35.2 | -37.91 | -11.42 | 0.75 | other road obvious |
| jecon | Rút thẻ bài ↔ Nhờ ơn người quen | 1 | 44 | 36%, 2k, Sức 0 | 36%, 2k, Sức 0, +10.0k | 35.2 | -24.53 | 0.67 | 0.72 | other road obvious |
| jrest | Nghỉ ngơi dưỡng sức ↔ Nghỉ ngơi một lát ×N | 1 | 3 | 100%, 2k, Sức 0 | 100%, 4k, Sức 0 | 2.4 | -0.4 | 0 | 0.17 | ok (hesitate) |
| jecon | Chu toàn lễ nghĩa ↔ Bớt lễ nghĩa | 1 | 4 | 100%, 0k, Sức 0 | 100%, 0k, Sức 0, +4.2k | 3.2 | 0 | -1.01 | -0.32 | silver obvious |
| j68 | giftArrive · Nhận, đáp lễ hậu hĩnh | 1 | 10 | 100%, 0k, Sức 0 | 100%, 0k, Sức 0 | 8 | 5.75 | 6 | 0.03 | ok (hesitate) |
| j68 | strayCat · Giữ lại nuôi | 1 | 4 | 100%, 0k, Sức 0 | 60%, 0k, Sức 3 | 3.2 | 2.3 | 2.49 | 0.05 | ok (hesitate) |
| j68 | leakRoof · Bỏ bạc thuê thợ ngay | 1 | 15 | 100%, 0k, Sức 0 | 100%, 0k, Sức 6 | 12 | 2.63 | 8.67 | 0.5 | other road obvious |
| j68 | letterHome · Gửi bạc về nhà | 1 | 20 | 100%, 0k, Sức 0 | 100%, 0k, Sức 2 | 16 | 11 | 9.67 | -0.08 | ok (hesitate) |
| j68 | eunuchSqueeze · Đưa bạc cho xong | 1 | 8 | 100%, 0k, Sức 0 | 54%, 0k, Sức 0 | 6.4 | -2.9 | -0.61 | 0.36 | other road obvious |
| j68 | embroidery · Thuê thợ thêu ngoài cung | 1 | 20 | 100%, 0k, Sức 0 | 73%, 0k, Sức 10 | 16 | 6.26 | 8.53 | 0.14 | ok (hesitate) |
| j68 | flowerBloom · Mời các phi tần ngắm hoa | 1 | 8 | 100%, 0k, Sức 0 | 34%, 0k, Sức 0 | 6.4 | 3.23 | 0.68 | -0.4 | silver obvious |
| j68 | proudVisit · Nhún nhường tiếp đãi | 1 | 20 | 100%, 0k, Sức 0 | 100%, 0k, Sức 0 | 16 | -1.33 | -0.83 | 0.03 | ok (hesitate) |
| j68 | thMama · Biếu ma ma chút quà | 1 | 8 | 100%, 0k, Sức 0 | 100%, 0k, Sức 0, +3.0k | 6.4 | -2.4 | 5 | 1.16 | other road obvious |
| j68 | docCheck · Để thái y kê thuốc bổ | 1 | 10 | 100%, 0k, Sức 0 | 100%, 0k, Sức 0, +3.0k | 8 | -3 | 1 | 0.5 | other road obvious |
| j68 | docCheck · Hỏi thăm dò chuyện các cung | 1 | 5 | 44%, 0k, Sức 0 | 100%, 0k, Sức 0, +3.0k | 4 | -4.08 | 1 | 1.27 | other road obvious |
| j68 | painter · Bỏ bạc nhờ vẽ cho đẹp | 1 | 15 | 100%, 0k, Sức 0 | 68%, 0k, Sức 4 | 12 | 5 | 5.25 | 0.02 | ok (hesitate) |
| j68 | musician · Học một khúc mới | 1 | 5 | 100%, 0k, Sức 6 | 100%, 0k, Sức 0, +3.0k | 4 | -2 | 5 | 1.75 | other road obvious |
| j68 | musician · Nhờ phổ nhạc bài thơ dâng Hoàng thượng | 1 | 10 | 59%, 0k, Sức 0 | 100%, 0k, Sức 0, +3.0k | 8 | 5.81 | 5 | -0.1 | ok (hesitate) |
| j68 | newGirlAdvice · Nhận làm người dưới trướng | 1 | 8 | 100%, 0k, Sức 0 | 100%, 0k, Sức 4 | 6.4 | 18.23 | 19.33 | 0.17 | ok (hesitate) |
| j68 | heatStroke · Xin đá lạnh hầm băng | 1 | 10 | 100%, 0k, Sức 0 | 38%, 0k, Sức 8 | 8 | -4 | 2.47 | 0.81 | other road obvious |
| j68 | snowDay · Phát áo bông cho cung nhân | 1 | 15 | 100%, 0k, Sức 0 | 100%, 0k, Sức 10 | 12 | 6.67 | 8 | 0.11 | ok (hesitate) |
| j68 | springAllergy · Mời Trương Bá Ngôn kê thuốc | 1 | 8 | 100%, 0k, Sức 0 | 100%, 0k, Sức 0, +3.0k | 6.4 | -3.4 | 1 | 0.69 | other road obvious |
| j68 | stormNight · Thắp hương cầu an cho cung | 1 | 25 | 100%, 0k, Sức 0 | 34%, 0k, Sức 6 | 20 | -2.67 | -2.59 | 0 | ok (hesitate) |
| j68 | stormNight · Cứu người, cho thuốc men | 1 | 40 | 100%, 0k, Sức 4 | 34%, 0k, Sức 6 | 32 | -4.46 | -2.59 | 0.06 | ok (hesitate) |
| j68 | famineDonate · Quyên nhiều bạc | 1 | 30 | 100%, 0k, Sức 0 | 100%, 0k, Sức 6 | 24 | 13.84 | 16 | 0.09 | ok (hesitate) |
| j68 | famineDonate · Góp chút ít cho phải lễ | 1 | 5 | 100%, 0k, Sức 0 | 100%, 0k, Sức 6 | 4 | 5.63 | 16 | 2.59 | other road obvious |
| j68 | borderNews · Thêu cờ, may áo gửi quân | 1 | 15 | 100%, 0k, Sức 10 | 100%, 0k, Sức 0, +3.0k | 12 | 6.96 | 5 | -0.16 | ok (hesitate) |
| j68 | rumorPreg · Cho người dò cho chắc | 1 | 8 | 45%, 0k, Sức 0 | 100%, 0k, Sức 0, +3.0k | 6.4 | -6.32 | 5 | 1.77 | other road obvious |
| j68 | rumorPreg · Sang chúc mừng thăm dò | 1 | 5 | 49%, 0k, Sức 0 | 100%, 0k, Sức 0, +3.0k | 4 | -3.44 | 5 | 2.11 | other road obvious |
| j68 | rumorEmpLove · Hỏi thái giám Kính sự phòng | 1 | 20 | 50%, 0k, Sức 0 | 44%, 0k, Sức 0, +3.0k | 16 | -17 | -18.51 | -0.09 | ok (hesitate) |
| j68 | rumorEmpLove · Sang thân thiết với nàng | 1 | 20 | 100%, 0k, Sức 0 | 44%, 0k, Sức 0, +3.0k | 16 | -17 | -18.51 | -0.09 | ok (hesitate) |
| j68 | silkAllot · Bỏ bạc may thêm cho cả hai | 1 | 15 | 100%, 0k, Sức 0 | 100%, 0k, Sức 0, +3.0k | 12 | 6.63 | 16.33 | 0.81 | other road obvious |
| j68 | templeRite · Cúng dầu đèn hậu hĩnh | 1 | 15 | 100%, 0k, Sức 0 | 100%, 0k, Sức 8 | 12 | 13.67 | 8.67 | -0.42 | silver obvious |
| j68 | fortuneNun · Bỏ bạc xin xem một quẻ | 1 | 8 | 100%, 0k, Sức 0 | 39%, 0k, Sức 0 | 6.4 | -4.9 | 5.24 | 1.58 | other road obvious |
| j68 | fortuneNun · Treo bùa cho cung nhân yên tâm | 1 | 5 | 100%, 0k, Sức 0 | 39%, 0k, Sức 0 | 4 | 1 | 5.24 | 1.06 | other road obvious |
| j68 | rumorTH · Hỏi ma ma thân tín của Thái hậu | 1 | 8 | 50%, 0k, Sức 0 | 100%, 0k, Sức 0, +3.0k | 6.4 | -5.4 | 5 | 1.63 | other road obvious |
| j68 | rumorFavor · Mua tin Kính sự phòng | 1 | 10 | 55%, 0k, Sức 0 | 100%, 0k, Sức 0, +3.0k | 8 | -6.2 | 5 | 1.4 | other road obvious |
| j68 | lotusSeason · Cùng làm, dâng lên | 1 | 5 | 100%, 0k, Sức 6 | 100%, 0k, Sức 5 | 4 | 6.33 | 3.5 | -0.71 | silver obvious |
| j68 | droughtPrayer · Lén mua nước sạch ngoài cung | 1 | 10 | 100%, 0k, Sức 0 | 100%, 0k, Sức 10 | 8 | -9 | 26.33 | 4.42 | other road obvious |
| act | deck · Hối lộ Kính sự phòng | 1 | 30 | 95%, 2k, Sức 0 | — |  |  |  |  | UNPRICED (gain only in words: 2 tuần tới dễ được lật thẻ: khả năng thấp → dễ hơn một bậc) |
| act | deck · Múa trong yến tiệc [sung] | 1 | 10 | 58%, 4k, Sức 20 | 62%, 2k, Sức 10 | 8 | 1.45 | 3.347 | 1.31 | other road obvious |
| act | deck · Phát chẩn cho cung nhân [danh] | 1 | 40 | 85%, 2k, Sức 0 | 75%, 2k, Sức 5 | 32 | 1.387 | 4.772 | 2.44 | other road obvious |
| act | deck · Tụng kinh, làm việc thiện | 1 | 10 | 95%, 2k, Sức 0 | — |  |  |  |  | NO ACT WITHOUT SILVER for duc |
| act | deck · Cầu tự ở Phụng Tiên điện | 1 | 10 | 50%, 2k, Sức 0 | — |  |  |  |  | UNPRICED (gain only in words: 2 tháng dễ có thai hơn (nay khả năng rất thấp)) |
| act | deck · Dưỡng nhan | 1 | 30 | 92%, 2k, Sức 0 | — |  |  |  |  | NO ACT WITHOUT SILVER for sac |
| act | deck · Cài tai mắt | 1 | 25 | 80%, 2k, Sức 0 | — |  |  |  |  | NO ACT WITHOUT SILVER for mat |
| act | deck · Nghỉ ngơi dưỡng sức [suc] | 1 | 3 | 95%, 4k, Sức 0 | 95%, 1k, Sức 0 | 2.4 | 0.594 | 2.217 | 2.73 | other road obvious |
| act | deck · Tự học Nấu nướng: nấu món | 1 | 6 | 95%, 2k, Sức 15 | — |  |  |  |  | UNPRICED (gain only in words: tiến bộ Nấu nướng +1..2 · tự tay chơi thì ra Cháo trắng hành) |
| act | talk:emp · Dâng một cành hoa [sung] | 1 | 5 | 50%, 2k, Sức 0 | 62%, 2k, Sức 10 | 4 | 0.667 | 3.347 | 4.02 | other road obvious |
| act | talk:ty · Bài thuốc dễ thụ thai | 1 | 40 | 95%, 2k, Sức 0 | — |  |  |  |  | UNPRICED (gain only in words: 3 tháng dễ có thai hơn) |
| act | talk:ty · Mời làm thái y tâm phúc | 1 | 50 | 95%, 2k, Sức 0 | — |  |  |  |  | UNPRICED (gain only in words: dễ phát hiện xạ hương, độc; bệnh của con nhẹ hơn) |
| act | talk:ty · Học hỏi y lý | 1 | 10 | 95%, 2k, Sức 0 | — |  |  |  |  | NO ACT WITHOUT SILVER for art |
| act | talk:ksp · Đút lót lật thẻ | 1 | 30 | 95%, 2k, Sức 0 | — |  |  |  |  | UNPRICED (gain only in words: 2 tuần tới dễ được lật thẻ: khả năng thấp → dễ hơn một bậc) |
| act | talk:ksp · Hỏi sở thích Hoàng thượng | 1 | 15 | 80%, 2k, Sức 0 | — |  |  |  |  | UNPRICED (gain only in words: biết thêm một điều ngài thích) |
| act | talk:peddler · Mua Son phấn Dương Châu | 1 | 8 | 95%, 2k, Sức 0 | — |  |  |  |  | NO ACT WITHOUT SILVER for sac |
| act | talk:peddler · Mua Lụa Hàng Châu | 1 | 30 | 95%, 2k, Sức 0 | — |  |  |  |  | NO ACT WITHOUT SILVER for sac |
| act | talk:peddler · Mua Trâm ngọc bích | 1 | 30 | 95%, 2k, Sức 0 | — |  |  |  |  | NO ACT WITHOUT SILVER for sac |
| act | talk:peddler · Mua Kim bạc thử độc | 1 | 15 | 95%, 2k, Sức 0 | — |  |  |  |  | UNPRICED (gain only in words: Cắm vào đồ ăn: kim đen là có độc) |
| act | talk:peddler · Mua Đàn cổ Tiêu Vĩ | 1 | 200 | 95%, 2k, Sức 0 | — |  |  |  |  | UNPRICED (gain only in words: Tặng Hoàng thượng, phi tần mê nhạc) |
| act | talk:peddler · Mua Nhân sâm trăm năm | 1 | 60 | 95%, 2k, Sức 0 | — |  |  |  |  | NO ACT WITHOUT SILVER for null |
| act | talk:fallen · Đưa cơm áo | 1 | 20 | 95%, 2k, Sức 0 | — |  |  |  |  | NO ACT WITHOUT SILVER for duc |
| act | talk:rival · Giúp đỡ nàng | 1 | 20 | 95%, 2k, Sức 0 | — |  |  |  |  | NO ACT WITHOUT SILVER for rel |
| act | talk:rival · Dò la | 1 | 22 | 44%, spyk, Sức 0 | — |  |  |  |  | UNPRICED (gain only in words: Bạc -30) |
| act | talk:rival · Bỏ độc vào trà nàng | 1 | 29 | 11%, poisonk, Sức 0 | — |  |  |  |  | UNPRICED (gain only in words: lộ: tội chết — năm đầu được tha một lần: giáng một bậc, cấm ) |
| j67 | tt_co.s2 | 3 | 35 | 54.333333333333336%, 0k, Sức 0 | 35.53333333333334%, 0k, Sức 17 | 14 | -12.16 | -11.43 | 0.05 | ok (hesitate) |
| j67 | tt_co.c2 | 3 | 55 | 100%, 0k, Sức 0 | 48.2%, 0k, Sức 20 | 22 | 0 | 2.91 | 0.13 | ok (hesitate) |
| j67 | tt_co.t1 | 3 | 25 | 100%, 0k, Sức 0 | 67.2%, 0k, Sức 12 | 10 | 0 | 1.96 | 0.2 | ok (hesitate) |
| j67 | tt_co.x1 | 3 | 35 | 100%, 0k, Sức 0 | 61.2%, 0k, Sức 17 | 14 | 26 | 18.38 | -0.54 | silver obvious |
| j67 | tt_oan.s1 | 3 | 35 | 100%, 0k, Sức 0 | 61.2%, 0k, Sức 17 | 14 | 0 | 2.47 | 0.18 | ok (hesitate) |
| j67 | tt_oan.s2 | 3 | 45 | 100%, 0k, Sức 0 | 54.2%, 0k, Sức 20 | 18 | 6 | 5.82 | -0.01 | ok (hesitate) |
| j67 | tt_oan.c1 | 3 | 55 | 100%, 0k, Sức 0 | 48.2%, 0k, Sức 20 | 22 | 0 | 2.91 | 0.13 | ok (hesitate) |
| j67 | tt_oan.c2 | 3 | 35 | 55%, 0k, Sức 0 | 36.2%, 0k, Sức 17 | 14 | -6.3 | -3.14 | 0.23 | ok (hesitate) |
| j67 | tt_tranh.s1 | 3 | 35 | 47%, 0k, Sức 0 | 28.2%, 0k, Sức 17 | 14 | -7.42 | -4.93 | 0.18 | ok (hesitate) |
| j67 | tt_tranh.s2 | 3 | 25 | 100%, 0k, Sức 0 | 67.2%, 0k, Sức 12 | 10 | 0 | 1.96 | 0.2 | ok (hesitate) |
| j67 | tt_tranh.c1 | 3 | 20 | 100%, 0k, Sức 0 | 68.2%, 0k, Sức 10 | 8 | 16 | 12.02 | -0.5 | silver obvious |
| j67 | tt_tranh.c3 | 3 | 45 | 100%, 0k, Sức 0 | 54.2%, 0k, Sức 20 | 18 | 0 | 2.57 | 0.14 | ok (hesitate) |
| j67 | tt_tranh.t1 | 3 | 55 | 100%, 0k, Sức 0 | 48.2%, 0k, Sức 20 | 22 | 0 | 2.91 | 0.13 | ok (hesitate) |
| j67 | tt_mat.s1 | 3 | 25 | 45%, 0k, Sức 0 | 32.2%, 0k, Sức 12 | 10 | -5.5 | -4.49 | 0.1 | ok (hesitate) |
| j67 | tt_mat.s2 | 3 | 25 | 100%, 0k, Sức 0 | 67.2%, 0k, Sức 12 | 10 | 0 | 1.96 | 0.2 | ok (hesitate) |
| j67 | tt_mat.c3 | 3 | 35 | 100%, 0k, Sức 0 | 61.2%, 0k, Sức 17 | 14 | 0 | 2.47 | 0.18 | ok (hesitate) |
| j67 | dtq_bien.s1 | 3 | 55 | 100%, 0k, Sức 0 | 48.2%, 0k, Sức 20 | 22 | 0 | 2.91 | 0.13 | ok (hesitate) |
| j67 | dtq_bien.s2 | 3 | 45 | 100%, 0k, Sức 2 | 54.2%, 0k, Sức 20 | 18 | -0.33 | 2.57 | 0.16 | ok (hesitate) |
| j67 | dtq_bien.c1 | 3 | 25 | 35%, 0k, Sức 1 | 22.2%, 0k, Sức 12 | 10 | -6.67 | -6.33 | 0.03 | ok (hesitate) |
| j67 | dtq_bien.c2 | 3 | 25 | 100%, 0k, Sức 0 | 67.2%, 0k, Sức 12 | 10 | 0 | 1.96 | 0.2 | ok (hesitate) |
| j67 | dtq_bien.t1 | 3 | 55 | 100%, 0k, Sức 0 | 48.2%, 0k, Sức 20 | 22 | 0 | 2.91 | 0.13 | ok (hesitate) |
| j67 | dtq_vu.s2 | 3 | 45 | 100%, 0k, Sức 0 | 54.2%, 0k, Sức 20 | 18 | 0 | 2.57 | 0.14 | ok (hesitate) |
| j67 | dtq_vu.c1 | 3 | 35 | 40%, 0k, Sức 1 | 21.2%, 0k, Sức 17 | 14 | -8.57 | -6.5 | 0.15 | ok (hesitate) |
| j67 | dtq_vu.c2 | 3 | 20 | 100%, 0k, Sức 0 | 68.2%, 0k, Sức 10 | 8 | 0 | 1.11 | 0.14 | ok (hesitate) |
| j67 | dtq_binh.s2 | 3 | 25 | 40%, 0k, Sức 0 | 27.2%, 0k, Sức 12 | 10 | -6 | -5.41 | 0.06 | ok (hesitate) |
| j67 | dtq_binh.c1 | 3 | 35 | 100%, 0k, Sức 0 | 61.2%, 0k, Sức 17 | 14 | 0 | 2.47 | 0.18 | ok (hesitate) |
| j67 | dtq_binh.c2 | 3 | 25 | 41.666666666666664%, 0k, Sức 0 | 28.866666666666664%, 0k, Sức 12 | 10 | -6.81 | -6.29 | 0.05 | ok (hesitate) |
| j67 | dtq_huynh.s1 | 3 | 55 | 100%, 0k, Sức 0 | 48.2%, 0k, Sức 20 | 22 | 0 | 2.91 | 0.13 | ok (hesitate) |
| j67 | dtq_huynh.s2 | 3 | 25 | 100%, 0k, Sức 0 | 67.2%, 0k, Sức 12 | 10 | 0 | 1.96 | 0.2 | ok (hesitate) |
| j67 | dtq_huynh.c1 | 3 | 35 | 100%, 0k, Sức 0 | 61.2%, 0k, Sức 17 | 14 | 0 | 2.47 | 0.18 | ok (hesitate) |
| j67 | dtq_huynh.c2 | 3 | 20 | 100%, 0k, Sức 0 | 68.2%, 0k, Sức 10 | 8 | 0 | 1.11 | 0.14 | ok (hesitate) |
| j67 | dtq_huynh.t1 | 3 | 55 | 45%, 0k, Sức 0 | 13.2%, 0k, Sức 20 | 22 | -12.1 | -7.74 | 0.2 | ok (hesitate) |
| j67 | muoi_tuoc.s1 | 3 | 70 | 100%, 0k, Sức 0 | 43.2%, 0k, Sức 20 | 28 | 0 | 3.98 | 0.14 | ok (hesitate) |
| j67 | muoi_tuoc.s2 | 3 | 20 | 52%, 0k, Sức 0 | 40.2%, 0k, Sức 10 | 8 | -7.49 | -9.18 | -0.21 | ok (hesitate) |
| j67 | muoi_tuoc.c1 | 3 | 90 | 100%, 0k, Sức 0 | 43.2%, 0k, Sức 20 | 36 | 0 | 7.44 | 0.21 | ok (hesitate) |
| j67 | muoi_tuoc.c2 | 3 | 55 | 40%, 0k, Sức 0 | 8.2%, 0k, Sức 20 | 22 | -13.2 | -9.26 | 0.18 | ok (hesitate) |
| j67 | muoi_tuoc.c3 | 3 | 20 | 100%, 0k, Sức 0 | 68.2%, 0k, Sức 10 | 8 | 0 | 1.11 | 0.14 | ok (hesitate) |
| j67 | muoi_tuoc.t1 | 3 | 25 | 100%, 0k, Sức 0 | 67.2%, 0k, Sức 12 | 10 | 0 | 1.96 | 0.2 | ok (hesitate) |
| j67 | muoi_tuoc.x1 | 3 | 110 | 50.5%, 0k, Sức 0 | 13.7%, 0k, Sức 20 | 44 | -21.78 | -4.57 | 0.39 | other road obvious |
| j67 | muoi_lau.s1 | 3 | 45 | 100%, 0k, Sức 0 | 54.2%, 0k, Sức 20 | 18 | 0 | 2.57 | 0.14 | ok (hesitate) |
| j67 | muoi_lau.s2 | 3 | 55 | 100%, 0k, Sức 0 | 48.2%, 0k, Sức 20 | 22 | 22.63 | 13.82 | -0.4 | silver obvious |
| j67 | muoi_lau.c1 | 3 | 35 | 100%, 0k, Sức 0 | 61.2%, 0k, Sức 17 | 14 | 0 | 2.47 | 0.18 | ok (hesitate) |
| j67 | muoi_lau.c2 | 3 | 25 | 55%, 0k, Sức 0 | 42.2%, 0k, Sức 12 | 10 | -10.18 | -9.95 | 0.02 | ok (hesitate) |
| j67 | muoi_lau.x1 | 3 | 90 | 100%, 0k, Sức 0 | 43.2%, 0k, Sức 20 | 36 | 0 | 7.44 | 0.21 | ok (hesitate) |
| j67 | muoi_doi.s1 | 3 | 35 | 100%, 0k, Sức 0 | 61.2%, 0k, Sức 17 | 14 | 26.84 | 18.89 | -0.57 | silver obvious |
| j67 | muoi_doi.s2 | 3 | 55 | 100%, 0k, Sức 1 | 48.2%, 0k, Sức 20 | 22 | 3.1 | 4.48 | 0.06 | ok (hesitate) |
| j67 | muoi_doi.c1 | 3 | 70 | 100%, 0k, Sức 0 | 43.2%, 0k, Sức 20 | 28 | 7.02 | 7.01 | 0 | ok (hesitate) |
| j67 | muoi_doi.c2 | 3 | 45 | 100%, 0k, Sức 0 | 54.2%, 0k, Sức 20 | 18 | 0 | 2.57 | 0.14 | ok (hesitate) |
| j67 | muoi_doi.c3 | 3 | 45 | 100%, 0k, Sức 0 | 54.2%, 0k, Sức 20 | 18 | 27.05 | 17.23 | -0.55 | silver obvious |
| j67 | muoi_doi.x1 | 3 | 90 | 60%, 0k, Sức 0 | 23.2%, 0k, Sức 20 | 36 | -14.4 | -1.45 | 0.36 | other road obvious |
| j67 | muoi_no.s1 | 3 | 35 | 100%, 0k, Sức 0 | 61.2%, 0k, Sức 17 | 14 | 10 | 8.59 | -0.1 | ok (hesitate) |
| j67 | muoi_no.s2 | 3 | 35 | 100%, 0k, Sức 0 | 61.2%, 0k, Sức 17 | 14 | 0 | 2.47 | 0.18 | ok (hesitate) |
| j67 | muoi_no.c3 | 3 | 20 | 100%, 0k, Sức 0 | 68.2%, 0k, Sức 10 | 8 | 0 | 1.11 | 0.14 | ok (hesitate) |
| j67 | muoi_no.t1 | 3 | 20 | 100%, 0k, Sức 0 | 68.2%, 0k, Sức 10 | 8 | 16 | 12.02 | -0.5 | silver obvious |
| j67 | muoi_no.x1 | 3 | 55 | 40%, 0k, Sức 0 | 8.2%, 0k, Sức 20 | 22 | -13.2 | -9.26 | 0.18 | ok (hesitate) |
| j67 | cn_chu.s2 | 3 | 25 | 100%, 0k, Sức 0 | 67.2%, 0k, Sức 12 | 10 | 0 | 1.96 | 0.2 | ok (hesitate) |
| j67 | cn_chu.t1 | 3 | 25 | 40%, 0k, Sức 0 | 27.2%, 0k, Sức 12 | 10 | -6 | -5.41 | 0.06 | ok (hesitate) |
| j67 | cn_tinh.s1 | 3 | 35 | 55%, 0k, Sức 0 | 36.2%, 0k, Sức 17 | 14 | -6.3 | -3.14 | 0.23 | ok (hesitate) |
| j67 | cn_tinh.s2 | 3 | 25 | 50%, 0k, Sức 0 | 37.2%, 0k, Sức 12 | 10 | -5 | -3.57 | 0.14 | ok (hesitate) |
| j67 | cn_tinh.c1 | 3 | 45 | 100%, 0k, Sức 0 | 54.2%, 0k, Sức 20 | 18 | 0 | 2.57 | 0.14 | ok (hesitate) |
| j67 | cn_tinh.c2 | 3 | 35 | 55%, 0k, Sức 0 | 36.2%, 0k, Sức 17 | 14 | -6.48 | -7.58 | -0.08 | ok (hesitate) |
| j67 | cn_tinh.t1 | 3 | 35 | 42%, 0k, Sức 0 | 23.2%, 0k, Sức 17 | 14 | -17.89 | -18.99 | -0.08 | ok (hesitate) |
| j67 | cn_ban.s1 | 3 | 25 | 100%, 0k, Sức 0 | 67.2%, 0k, Sức 12 | 10 | 14 | 11.37 | -0.26 | ok (hesitate) |
| j67 | cn_ban.s2 | 3 | 35 | 100%, 0k, Sức 0 | 61.2%, 0k, Sức 17 | 14 | 0 | 2.47 | 0.18 | ok (hesitate) |
| j67 | cn_ban.c2 | 3 | 35 | 55%, 0k, Sức 0 | 36.2%, 0k, Sức 17 | 14 | -11.98 | -11.2 | 0.06 | ok (hesitate) |
| j67 | cn_ban.t1 | 3 | 35 | 55%, 0k, Sức 0 | 36.2%, 0k, Sức 17 | 14 | -6.3 | -3.14 | 0.23 | ok (hesitate) |
| j67 | cn_ban.x1 | 3 | 35 | 100%, 0k, Sức 0 | 61.2%, 0k, Sức 17 | 14 | 18 | 13.48 | -0.32 | silver obvious |
| j67 | cn_than.s1 | 3 | 25 | 100%, 0k, Sức 0 | 67.2%, 0k, Sức 12 | 10 | 22 | 16.74 | -0.53 | silver obvious |
| j67 | cn_than.s2 | 3 | 20 | 55%, 0k, Sức 0 | 43.2%, 0k, Sức 10 | 8 | -3.6 | -2.99 | 0.08 | ok (hesitate) |
| j67 | cn_than.c1 | 3 | 35 | 50%, 0k, Sức 0 | 31.2%, 0k, Sức 17 | 14 | -7 | -4.26 | 0.2 | ok (hesitate) |
| j67 | cn_than.c2 | 3 | 35 | 50%, 0k, Sức 0 | 31.2%, 0k, Sức 17 | 14 | -7 | -4.26 | 0.2 | ok (hesitate) |
| j67 | nc_gian.s2 | 3 | 35 | 52%, 0k, Sức 0 | 33.2%, 0k, Sức 17 | 14 | -6.72 | -3.81 | 0.21 | ok (hesitate) |
| j67 | nc_gian.c2 | 3 | 45 | 100%, 0k, Sức 0 | 54.2%, 0k, Sức 20 | 18 | 0 | 2.57 | 0.14 | ok (hesitate) |
| j67 | nc_su.s2 | 3 | 70 | 100%, 0k, Sức 0 | 43.2%, 0k, Sức 20 | 28 | 0 | 3.98 | 0.14 | ok (hesitate) |
| j67 | nc_su.c2 | 3 | 45 | 100%, 0k, Sức 0 | 54.2%, 0k, Sức 20 | 18 | 0 | 2.57 | 0.14 | ok (hesitate) |
| j67 | nc_tuc.s2 | 3 | 10 | 50%, 0k, Sức 0 | 38.2%, 0k, Sức 6 | 4 | -2.67 | -5.5 | -0.71 | silver obvious |
| j67 | nc_tuc.c2 | 3 | 25 | 50%, 0k, Sức 0 | 37.2%, 0k, Sức 12 | 10 | -0.47 | -0.71 | -0.02 | ok (hesitate) |
| j67 | nc_tuc.x1 | 3 | 55 | 100%, 0k, Sức 0 | 48.2%, 0k, Sức 20 | 22 | 0 | 2.91 | 0.13 | ok (hesitate) |
| j67 | nc_vuong.s2 | 3 | 25 | 40%, 0k, Sức 0 | 27.2%, 0k, Sức 12 | 10 | -6 | -5.41 | 0.06 | ok (hesitate) |
| j67 | nc_vuong.c2 | 3 | 35 | 100%, 0k, Sức 0 | 61.2%, 0k, Sức 17 | 14 | 0 | 2.47 | 0.18 | ok (hesitate) |
| j67 | nc_vuong.c3 | 3 | 55 | 100%, 0k, Sức 0 | 48.2%, 0k, Sức 20 | 22 | 0 | 2.91 | 0.13 | ok (hesitate) |
| j67 | td_an.s1 | 3 | 35 | 55%, 0k, Sức 0 | 36.2%, 0k, Sức 17 | 14 | -6.3 | -3.14 | 0.23 | ok (hesitate) |
| j67 | td_an.c1 | 3 | 35 | 100%, 0k, Sức 0 | 62%, 0k, Sức 6 | 14 | 0 | 2.88 | 0.21 | ok (hesitate) |
| j67 | td_an.c2 | 3 | 45 | 35%, 0k, Sức 0 | 9.2%, 0k, Sức 20 | 18 | -11.7 | -9.32 | 0.13 | ok (hesitate) |
| j67 | td_an.c3 | 3 | 35 | 100%, 0k, Sức 0 | 61.2%, 0k, Sức 17 | 14 | 0 | 2.47 | 0.18 | ok (hesitate) |
| j67 | td_an.t1 | 3 | 35 | 45%, 0k, Sức 0 | 26.2%, 0k, Sức 17 | 14 | -7.7 | -5.38 | 0.17 | ok (hesitate) |
| j67 | td_ke.s1 | 3 | 35 | 50%, 0k, Sức 0 | 31.2%, 0k, Sức 17 | 14 | -7 | -4.26 | 0.2 | ok (hesitate) |
| j67 | td_ke.s2 | 3 | 25 | 50%, 0k, Sức 0 | 37.2%, 0k, Sức 12 | 10 | -5 | -3.57 | 0.14 | ok (hesitate) |
| j67 | td_ke.c2 | 3 | 35 | 100%, 0k, Sức 0 | 61.2%, 0k, Sức 17 | 14 | 0 | 2.47 | 0.18 | ok (hesitate) |
| j67 | td_song.s1 | 3 | 45 | 100%, 0k, Sức 0 | 54.2%, 0k, Sức 20 | 18 | 0 | 2.57 | 0.14 | ok (hesitate) |
| j67 | td_song.c1 | 3 | 45 | 60%, 0k, Sức 0 | 34.2%, 0k, Sức 20 | 18 | -7.2 | -2.72 | 0.25 | ok (hesitate) |
| j67 | td_song.t1 | 3 | 55 | 60%, 0k, Sức 0 | 28.2%, 0k, Sức 20 | 22 | -8.8 | -3.18 | 0.26 | ok (hesitate) |
| j67 | td_song.x1 | 3 | 35 | 100%, 0k, Sức 0 | 61.2%, 0k, Sức 17 | 14 | 10 | 8.59 | -0.1 | ok (hesitate) |
| j67 | td_tha.c3 | 3 | 25 | 100%, 0k, Sức 0 | 67.2%, 0k, Sức 12 | 10 | 14 | 11.37 | -0.26 | ok (hesitate) |
| j67 | ch_co.s2 | 3 | 35 | 45%, 0k, Sức 0 | 26.2%, 0k, Sức 17 | 14 | -8.62 | -6.61 | 0.14 | ok (hesitate) |
| j67 | ch_benh.s1 | 3 | 55 | 50%, 0k, Sức 0 | 18.2%, 0k, Sức 20 | 22 | -11 | -6.22 | 0.22 | ok (hesitate) |
| j67 | ch_benh.s2 | 3 | 25 | 100%, 0k, Sức 0 | 67.2%, 0k, Sức 12 | 10 | 14 | 11.37 | -0.26 | ok (hesitate) |
| j67 | ch_benh.c1 | 3 | 25 | 45%, 0k, Sức 0 | 32.2%, 0k, Sức 12 | 10 | -5.5 | -4.49 | 0.1 | ok (hesitate) |
| j67 | ch_ho.s2 | 3 | 55 | 100%, 0k, Sức 0 | 48.2%, 0k, Sức 20 | 22 | 0 | 2.91 | 0.13 | ok (hesitate) |
| j67 | ch_ho.c1 | 3 | 45 | 100%, 0k, Sức 0 | 54.2%, 0k, Sức 20 | 18 | 0 | 2.57 | 0.14 | ok (hesitate) |
| j67 | ch_bi.s2 | 3 | 25 | 50%, 0k, Sức 0 | 37.2%, 0k, Sức 12 | 10 | -5 | -3.57 | 0.14 | ok (hesitate) |
| j67 | ch_bi.c3 | 3 | 45 | 35%, 0k, Sức 0 | 9.2%, 0k, Sức 20 | 18 | -12.57 | -10.53 | 0.11 | ok (hesitate) |
| j67 | ch_bi.t1 | 3 | 25 | 100%, 0k, Sức 0 | 67.2%, 0k, Sức 12 | 10 | 0 | 1.96 | 0.2 | ok (hesitate) |
| j67 | thd_tho.s2 | 3 | 45 | 100%, 0k, Sức 0 | 54.2%, 0k, Sức 20 | 18 | 0 | 2.57 | 0.14 | ok (hesitate) |
| j67 | thd_tho.c1 | 3 | 25 | 45%, 0k, Sức 0 | 32.2%, 0k, Sức 12 | 10 | -18.21 | -20.77 | -0.26 | ok (hesitate) |
| j67 | thd_tho.c2 | 3 | 45 | 50%, 0k, Sức 0 | 24.2%, 0k, Sức 20 | 18 | -25.84 | -30.89 | -0.28 | ok (hesitate) |
| j67 | thd_sach.c2 | 3 | 45 | 100%, 0k, Sức 0 | 54.2%, 0k, Sức 20 | 18 | 3.05 | 4.22 | 0.06 | ok (hesitate) |
| j67 | thd_sach.c3 | 3 | 20 | 50%, 0k, Sức 0 | 38.2%, 0k, Sức 10 | 8 | -4 | -3.81 | 0.02 | ok (hesitate) |
| j67 | thd_tro.s1 | 3 | 25 | 100%, 0k, Sức 0 | 67.2%, 0k, Sức 12 | 10 | 14 | 11.37 | -0.26 | ok (hesitate) |
| j67 | thd_tro.c1 | 3 | 25 | 100%, 0k, Sức 0 | 67.2%, 0k, Sức 12 | 10 | 0 | 1.96 | 0.2 | ok (hesitate) |
| j67 | thd_tro.c2 | 3 | 45 | 50%, 0k, Sức 0 | 24.2%, 0k, Sức 20 | 18 | -9 | -5.36 | 0.2 | ok (hesitate) |
| j67 | thd_tro.c3 | 3 | 35 | 100%, 0k, Sức 0 | 61.2%, 0k, Sức 17 | 14 | 10 | 8.59 | -0.1 | ok (hesitate) |
| j67 | thd_hoc.t1 | 3 | 25 | 55%, 0k, Sức 0 | 42.2%, 0k, Sức 12 | 10 | -12.08 | -12.38 | -0.03 | ok (hesitate) |
| j67 | cnv_chu.s2 | 3 | 5 | 50%, 0k, Sức 0 | 38.2%, 0k, Sức 6 | 2 | -2 | -6.68 | -2.34 | silver obvious |
| j67 | cnv_chu.x1 | 3 | 10 | 100%, 0k, Sức 0 | 68.2%, 0k, Sức 6 | 4 | 20 | 12.69 | -1.83 | silver obvious |
| j67 | cnv_ban.s1 | 3 | 5 | 50%, 0k, Sức 0 | 38.2%, 0k, Sức 6 | 2 | -1 | -5.44 | -2.22 | silver obvious |
| j67 | cnv_ban.c1 | 3 | 5 | 100%, 0k, Sức 1 | 68.2%, 0k, Sức 6 | 2 | 21.83 | 12.69 | -4.57 | silver obvious |
| j67 | cnv_ban.t1 | 3 | 10 | 50%, 0k, Sức 0 | 38.2%, 0k, Sức 6 | 4 | -2 | -4.68 | -0.67 | silver obvious |
| j67 | cnv_mat.c1 | 3 | 5 | 55%, 0k, Sức 0 | 43.2%, 0k, Sức 6 | 2 | -1.07 | -5.48 | -2.21 | silver obvious |
| j67 | cnv_mat.t1 | 3 | 10 | 40%, 0k, Sức 0 | 28.2%, 0k, Sức 6 | 4 | -4.4 | -8.31 | -0.98 | silver obvious |
| j67 | cnv_ma.c1 | 3 | 5 | 100%, 0k, Sức 0 | 68.2%, 0k, Sức 6 | 2 | 0 | -2.31 | -1.16 | silver obvious |
| j67 | cnv_ma.c2 | 3 | 10 | 100%, 0k, Sức 0 | 68.2%, 0k, Sức 6 | 4 | 20 | 12.69 | -1.83 | silver obvious |
| j67 | cnv_ma.x1 | 3 | 10 | 45%, 0k, Sức 0 | 33.2%, 0k, Sức 6 | 4 | -2.2 | -5.3 | -0.77 | silver obvious |
| j67 | s_than.s1 | 3 | 20 | 100%, 0k, Sức 0 | 68.2%, 0k, Sức 10 | 8 | 8 | 6.57 | -0.18 | ok (hesitate) |
| j67 | s_than.s2 | 3 | 20 | 100%, 0k, Sức 0 | 68.2%, 0k, Sức 10 | 8 | 0 | 1.11 | 0.14 | ok (hesitate) |
| j67 | s_than.c1 | 3 | 20 | 45%, 0k, Sức 0 | 33.2%, 0k, Sức 10 | 8 | -11.35 | -13.07 | -0.22 | ok (hesitate) |
| j67 | s_than.c3 | 3 | 25 | 50%, 0k, Sức 0 | 37.2%, 0k, Sức 12 | 10 | -4.32 | -6.29 | -0.2 | ok (hesitate) |
| j67 | s_than.x1 | 3 | 35 | 100%, 0k, Sức 0 | 61.2%, 0k, Sức 17 | 14 | 10 | 8.59 | -0.1 | ok (hesitate) |
| j67 | s_thu.s2 | 3 | 20 | 100%, 0k, Sức 0 | 68.2%, 0k, Sức 10 | 8 | 0 | 1.11 | 0.14 | ok (hesitate) |
| j67 | s_thu.c1 | 3 | 25 | 55%, 0k, Sức 0 | 42.2%, 0k, Sức 12 | 10 | -4.5 | -2.65 | 0.19 | ok (hesitate) |
| j67 | s_thu.c3 | 3 | 25 | 100%, 0k, Sức 0 | 67.2%, 0k, Sức 12 | 10 | 0 | 1.96 | 0.2 | ok (hesitate) |
| j67 | s_hoa.s2 | 3 | 20 | 100%, 0k, Sức 0 | 68.2%, 0k, Sức 10 | 8 | 0 | 1.11 | 0.14 | ok (hesitate) |
| j67 | s_hoa.c3 | 3 | 45 | 100%, 0k, Sức 0 | 54.2%, 0k, Sức 20 | 18 | 10.84 | 8.44 | -0.13 | ok (hesitate) |
| j67 | s_su.c3 | 3 | 20 | 60%, 0k, Sức 0 | 48.2%, 0k, Sức 10 | 8 | -0.8 | -0.24 | 0.07 | ok (hesitate) |
| j67 | s_su.x1 | 3 | 25 | 49.666666666666664%, 0k, Sức 0 | 36.86666666666667%, 0k, Sức 12 | 10 | -5.03 | -3.63 | 0.14 | ok (hesitate) |
| j67 | s_dich.s1 | 3 | 25 | 100%, 0k, Sức 0 | 67.2%, 0k, Sức 12 | 10 | 0 | 1.96 | 0.2 | ok (hesitate) |
| j67 | s_dich.c1 | 3 | 35 | 55%, 0k, Sức 0 | 36.2%, 0k, Sức 17 | 14 | 3.6 | 3.38 | -0.02 | ok (hesitate) |
| j67 | s_dich.c2 | 3 | 20 | 100%, 0k, Sức 0 | 68.2%, 0k, Sức 10 | 8 | 4.63 | 4.27 | -0.05 | ok (hesitate) |
| j67 | s_dich.t1 | 3 | 45 | 100%, 0k, Sức 0 | 54.2%, 0k, Sức 20 | 18 | 0 | 2.57 | 0.14 | ok (hesitate) |
| j67 | s_tinh.c3 | 3 | 45 | 100%, 0k, Sức 0 | 54.2%, 0k, Sức 20 | 18 | 0 | 2.57 | 0.14 | ok (hesitate) |
| j67 | s_tinh.t1 | 3 | 35 | 60%, 0k, Sức 0 | 41.2%, 0k, Sức 17 | 14 | -12.34 | -11.92 | 0.03 | ok (hesitate) |
| j67 | s_thay.s2 | 3 | 20 | 100%, 0k, Sức 0 | 68.2%, 0k, Sức 10 | 8 | 0 | 1.11 | 0.14 | ok (hesitate) |
| j67 | s_thay.t1 | 3 | 20 | 45%, 0k, Sức 0 | 33.2%, 0k, Sức 10 | 8 | -4.4 | -4.64 | -0.03 | ok (hesitate) |
| j67 | s_ban.c2 | 3 | 25 | 50%, 0k, Sức 0 | 37.2%, 0k, Sức 12 | 10 | -5 | -3.57 | 0.14 | ok (hesitate) |
| j67 | s_ban.x1 | 3 | 25 | 100%, 0k, Sức 0 | 67.2%, 0k, Sức 12 | 10 | 0 | 1.96 | 0.2 | ok (hesitate) |
| j67 | st_the.s1 | 3 | 25 | 55%, 0k, Sức 0 | 42.2%, 0k, Sức 12 | 10 | -4.5 | -2.65 | 0.19 | ok (hesitate) |
| j67 | st_the.s2 | 3 | 35 | 100%, 0k, Sức 0 | 61.2%, 0k, Sức 17 | 14 | 0 | 2.47 | 0.18 | ok (hesitate) |
| j67 | st_the.c1 | 3 | 35 | 55%, 0k, Sức 0 | 36.2%, 0k, Sức 17 | 14 | -6.3 | -3.14 | 0.23 | ok (hesitate) |
| j67 | st_the.c3 | 3 | 20 | 100%, 0k, Sức 0 | 68.2%, 0k, Sức 10 | 8 | 6.63 | 5.63 | -0.12 | ok (hesitate) |
| j67 | st_the.x1 | 3 | 35 | 35%, 0k, Sức 0 | 16.2%, 0k, Sức 17 | 14 | -9.1 | -7.62 | 0.11 | ok (hesitate) |
| j67 | st_con.s1 | 3 | 25 | 100%, 0k, Sức 0 | 67.2%, 0k, Sức 12 | 10 | 0 | 1.96 | 0.2 | ok (hesitate) |
| j67 | st_con.s2 | 3 | 25 | 65%, 0k, Sức 6 | 52.2%, 0k, Sức 12 | 10 | -4.5 | -0.81 | 0.37 | other road obvious |
| j67 | st_con.c1 | 3 | 25 | 100%, 0k, Sức 0 | 67.2%, 0k, Sức 12 | 10 | 0 | 1.96 | 0.2 | ok (hesitate) |
| j67 | st_con.t1 | 3 | 25 | 40%, 0k, Sức 0 | 27.2%, 0k, Sức 12 | 10 | -6 | -5.41 | 0.06 | ok (hesitate) |
| j67 | st_dong.c2 | 3 | 45 | 100%, 0k, Sức 0 | 54.2%, 0k, Sức 20 | 18 | 0 | 2.57 | 0.14 | ok (hesitate) |
| j67 | st_dong.c3 | 3 | 45 | 55%, 0k, Sức 0 | 29.2%, 0k, Sức 20 | 18 | -8.1 | -4.04 | 0.23 | ok (hesitate) |
| j67 | st_dong.t1 | 3 | 25 | 45%, 0k, Sức 0 | 32.2%, 0k, Sức 12 | 10 | -5.5 | -4.49 | 0.1 | ok (hesitate) |
| j67 | tm96a.a1 | 3 | 10 | 100%, 0k, Sức 0 | 68.2%, 0k, Sức 6 | 4 | 20 | 12.69 | -1.83 | silver obvious |
| j67 | tm96a.a2 | 3 | 10 | 100%, 0k, Sức 0 | 68.2%, 0k, Sức 6 | 4 | 0 | -0.95 | -0.24 | ok (hesitate) |
| j67 | tm96a.a3 | 3 | 10 | 100%, 0k, Sức 0 | 68.2%, 0k, Sức 6 | 4 | 20 | 12.69 | -1.83 | silver obvious |
| j67 | tm96a.a5 | 3 | 20 | 100%, 0k, Sức 0 | 68.2%, 0k, Sức 10 | 8 | 0 | 1.11 | 0.14 | ok (hesitate) |
| j67 | tm96a.a6 | 3 | 10 | 100%, 0k, Sức 0 | 68.2%, 0k, Sức 6 | 4 | 0 | -0.95 | -0.24 | ok (hesitate) |
| j67 | tm96b.b1l | 3 | 70 | 100%, 0k, Sức 0 | 43.2%, 0k, Sức 20 | 28 | 0 | 3.98 | 0.14 | ok (hesitate) |
| j67 | tm96b.b2a | 3 | 20 | 100%, 0k, Sức 0 | 68.2%, 0k, Sức 10 | 8 | 8 | 6.57 | -0.18 | ok (hesitate) |
| j67 | tm96b.b3a | 3 | 55 | 45%, 0k, Sức 0 | 13.2%, 0k, Sức 20 | 22 | -12.1 | -7.74 | 0.2 | ok (hesitate) |
| j67 | tm96b.b3b | 3 | 45 | 100%, 0k, Sức 0 | 54.2%, 0k, Sức 20 | 18 | 0 | 2.57 | 0.14 | ok (hesitate) |
| j67 | tm96c.c1o | 3 | 55 | 100%, 0k, Sức 0 | 48.2%, 0k, Sức 20 | 22 | 0 | 2.91 | 0.13 | ok (hesitate) |
| j67 | tm96c.c2 | 3 | 55 | 52.5%, 0k, Sức 0 | 20.7%, 0k, Sức 20 | 22 | -18.45 | -18.81 | -0.02 | ok (hesitate) |
| j67 | tm96c.c4b | 3 | 70 | 45%, 0k, Sức 0 | 8.2%, 0k, Sức 20 | 28 | -15.4 | -8.77 | 0.24 | ok (hesitate) |
| j67 | tm96c.c5 | 3 | 55 | 100%, 0k, Sức 0 | 48.2%, 0k, Sức 20 | 22 | 0 | 2.91 | 0.13 | ok (hesitate) |
| j72 | th_thuoc#1 | 3 | 40 | 75%, 1k, Sức 0 | 45%, 1k, Sức 0 | 16 | -5 | 6.2 | 0.7 | other road obvious |
| j72 | rv_thuoc#1 | 3 | 15 | 75%, 1k, Sức 0 | 65%, 5k, Sức 7 | 6 | -2.5 | -2.27 | 0.04 | ok (hesitate) |
| j72 | rv_tham_om#1 | 3 | 10 | 80%, 1k, Sức 0 | 70%, 4k, Sức 6 | 4 | -1.8 | -2.2 | -0.1 | ok (hesitate) |
| j72 | thuoc_cam#1 | 3 | 15 | 100%, 1k, Sức 0 | 90%, 5k, Sức 7 | 6 | -1 | -0.77 | 0.04 | ok (hesitate) |
| j72 | rv_con_om#1 | 3 | 15 | 85%, 1k, Sức 0 | 75%, 5k, Sức 7 | 6 | -1.9 | -1.67 | 0.04 | ok (hesitate) |
| j72 | bo_chung#2 | 3 | 30 | 100%, 1k, Sức 0 | 50%, 1k, Sức 0 | 12 | -1 | 5 | 0.5 | other road obvious |
| j72 | loi_thoi#2 | 3 | 10 | 65%, 1k, Sức 0 | 55%, 4k, Sức 6 | 4 | -2.4 | -2.8 | -0.1 | ok (hesitate) |
| j72 | bac_mat#2 | 3 | 20 | 100%, 1k, Sức 0 | 100%, 1k, Sức 0 | 8 | 7 | 15 | 1 | other road obvious |
| j72 | chuoc_sv#1 | 3 | 30 | 100%, 1k, Sức 0 | 81%, 8k, Sức 14 | 12 | -1 | -0.61 | 0.03 | ok (hesitate) |
| j72 | qua_tet#1 | 3 | 20 | 55%, 1k, Sức 0 | 42%, 6k, Sức 10 | 8 | -4.6 | -4.31 | 0.04 | ok (hesitate) |
| j72 | ao_bien#1 | 3 | 30 | 55%, 2k, Sức 0 | 36%, 9k, Sức 14 | 12 | -7.4 | -7.01 | 0.03 | ok (hesitate) |
| j72 | tham_o#1 | 3 | 20 | 40%, 2k, Sức 0 | 27%, 7k, Sức 10 | 8 | -6.8 | -6.51 | 0.04 | ok (hesitate) |
| j72 | vay_bac#1 | 3 | 66 | 100%, 1k, Sức 0 | 60%, 15k, Sức 20 | 26.4 | -1 | -2.49 | -0.06 | ok (hesitate) |
| j72 | rv_ngheo#1 | 3 | 30 | 100%, 1k, Sức 0 | 81%, 8k, Sức 14 | 12 | -1 | -0.61 | 0.03 | ok (hesitate) |
| j72 | rv_huong#1 | 3 | 10 | 50%, 2k, Sức 0 | 40%, 5k, Sức 6 | 4 | -4 | -4.4 | -0.1 | ok (hesitate) |
| j72 | canh_thai#1 | 3 | 15 | 55%, 1k, Sức 0 | 45%, 5k, Sức 7 | 6 | -3.7 | -3.47 | 0.04 | ok (hesitate) |
| j72 | lc_ao#1 | 3 | 15 | 100%, 1k, Sức 0 | 90%, 5k, Sức 7 | 6 | -1 | -0.77 | 0.04 | ok (hesitate) |
| j72 | maid_vay#1 | 3 | 30 | 100%, 1k, Sức 0 | 81%, 8k, Sức 14 | 12 | -1 | -0.61 | 0.03 | ok (hesitate) |
| j72 | sv_luong#1 | 3 | 15 | 100%, 1k, Sức 0 | 50%, 1k, Sức 0 | 6 | -1 | 2 | 0.5 | other road obvious |
| j72 | dt_che#1 | 3 | 20 | 100%, 1k, Sức 0 | 100%, 1k, Sức 0 | 8 | -1 | 7 | 1 | other road obvious |
| j72 | xc_uoc#1 | 3 | 20 | 55%, 1k, Sức 0 | 42%, 6k, Sức 10 | 8 | -4.6 | -4.31 | 0.04 | ok (hesitate) |
| j72 | xc_hoimon#1 | 3 | 30 | 100%, 1k, Sức 0 | 60%, 2k, Sức 0 | 12 | -1 | 5.2 | 0.52 | other road obvious |
| j72 | dong_tam#1 | 3 | 8 | 100%, 1k, Sức 0 | 90%, 4k, Sức 6 | 3.2 | -1 | -2.12 | -0.35 | silver obvious |
| j72 | giau_cn#2 | 3 | 20 | 55%, 1k, Sức 0 | 60%, 1k, Sức 0 | 8 | -4.6 | 3.8 | 1.05 | other road obvious |
| j72 | th_trungcuu#2 | 3 | 10 | 55%, 1k, Sức 0 | 45%, 4k, Sức 6 | 4 | -2.8 | -3.2 | -0.1 | ok (hesitate) |
| j72 | hh_trungthu#2 | 3 | 40 | 100%, 1k, Sức 0 | 55%, 1k, Sức 0 | 16 | -1 | 7.8 | 0.55 | other road obvious |
| j72 | hh_trungcuu#2 | 3 | 30 | 100%, 1k, Sức 0 | 45%, 1k, Sức 0 | 12 | -1 | 4.4 | 0.45 | other road obvious |
| j72 | hh_doanngo#1 | 3 | 10 | 65%, 2k, Sức 0 | 55%, 5k, Sức 6 | 4 | -3.4 | -3.8 | -0.1 | ok (hesitate) |
| j72 | th_aodong#1 | 3 | 20 | 65%, 2k, Sức 0 | 52%, 7k, Sức 10 | 8 | -4.8 | -4.51 | 0.04 | ok (hesitate) |
| j72 | tv_mua#1 | 3 | 15 | 65%, 1k, Sức 0 | 55%, 5k, Sức 7 | 6 | -3.1 | -2.87 | 0.04 | ok (hesitate) |
| j72 | maid_tet#1 | 3 | 10 | 100%, 1k, Sức 0 | 90%, 4k, Sức 6 | 4 | -1 | -1.4 | -0.1 | ok (hesitate) |
| j72 | fam_muoi#1 | 3 | 20 | 50%, 1k, Sức 0 | 37%, 6k, Sức 10 | 8 | -5 | -4.71 | 0.04 | ok (hesitate) |
| j72 | fam_cn#1 | 3 | 15 | 55%, 1k, Sức 0 | 45%, 5k, Sức 7 | 6 | -3.7 | -3.47 | 0.04 | ok (hesitate) |
| j72 | fam_td#1 | 3 | 40 | 100%, 1k, Sức 0 | 74%, 10k, Sức 19 | 16 | -1 | -1.33 | -0.02 | ok (hesitate) |
| jecon | Dò la ↔ Tự đi dò la | 3 | 15 | 40%, 2k, Sức 0 | 28%, 2k, Sức 0 | 6 | -7.2 | -8.3 | -0.18 | ok (hesitate) |
| jecon | Mua chuộc ↔ Sai cung nữ lấy lòng | 3 | 40 | 14%, 2k, Sức 0 | 6%, 2k, Sức 0, +8.3k | 16 | -18.34 | -12.19 | 0.38 | other road obvious |
| jecon | Rút thẻ bài ↔ Nhờ ơn người quen | 3 | 40 | 36%, 2k, Sức 0 | 36%, 2k, Sức 0, +10.0k | 16 | -12.24 | -6.24 | 0.38 | other road obvious |
| jrest | Nghỉ ngơi dưỡng sức ↔ Nghỉ ngơi một lát ×N | 3 | 6 | 100%, 2k, Sức 0 | 100%, 4k, Sức 0 | 2.4 | -0.4 | 0 | 0.17 | ok (hesitate) |
| jecon | Chu toàn lễ nghĩa ↔ Bớt lễ nghĩa | 3 | 18 | 100%, 0k, Sức 0 | 100%, 0k, Sức 0, +8.4k | 7.2 | 0 | -1.22 | -0.17 | ok (hesitate) |
| j68 | giftArrive · Nhận, đáp lễ hậu hĩnh | 3 | 10 | 100%, 0k, Sức 0 | 100%, 0k, Sức 0 | 4 | 8.42 | 6 | -0.61 | silver obvious |
| j68 | strayCat · Giữ lại nuôi | 3 | 8 | 100%, 0k, Sức 0 | 60%, 0k, Sức 3 | 3.2 | 2.3 | 2.49 | 0.05 | ok (hesitate) |
| j68 | leakRoof · Bỏ bạc thuê thợ ngay | 3 | 15 | 100%, 0k, Sức 0 | 100%, 0k, Sức 6 | 6 | 8.63 | 8.67 | 0.01 | ok (hesitate) |
| j68 | letterHome · Gửi bạc về nhà | 3 | 45 | 100%, 0k, Sức 0 | 100%, 0k, Sức 2 | 18 | 9 | 9.67 | 0.04 | ok (hesitate) |
| j68 | eunuchSqueeze · Đưa bạc cho xong | 3 | 8 | 100%, 0k, Sức 0 | 70%, 0k, Sức 0 | 3.2 | 0.3 | 2.53 | 0.56 | other road obvious |
| j68 | embroidery · Thuê thợ thêu ngoài cung | 3 | 20 | 100%, 0k, Sức 0 | 73%, 0k, Sức 10 | 8 | 10.05 | 8.53 | -0.19 | ok (hesitate) |
| j68 | flowerBloom · Mời các phi tần ngắm hoa | 3 | 10 | 100%, 0k, Sức 0 | 34%, 0k, Sức 0 | 4 | 1.42 | 0.68 | -0.18 | ok (hesitate) |
| j68 | proudVisit · Nhún nhường tiếp đãi | 3 | 30 | 100%, 0k, Sức 0 | 100%, 0k, Sức 0 | 12 | 2.67 | -0.83 | -0.29 | ok (hesitate) |
| j68 | thMama · Biếu ma ma chút quà | 3 | 8 | 100%, 0k, Sức 0 | 100%, 0k, Sức 0, +3.0k | 3.2 | 0.8 | 5 | 1.05 | other road obvious |
| j68 | docCheck · Để thái y kê thuốc bổ | 3 | 10 | 100%, 0k, Sức 0 | 100%, 0k, Sức 0, +3.0k | 4 | -1 | -1 | 0 | ok (hesitate) |
| j68 | docCheck · Hỏi thăm dò chuyện các cung | 3 | 5 | 44%, 0k, Sức 0 | 100%, 0k, Sức 0, +3.0k | 2 | -2.96 | -1 | 0.49 | other road obvious |
| j68 | painter · Bỏ bạc nhờ vẽ cho đẹp | 3 | 15 | 100%, 0k, Sức 0 | 68%, 0k, Sức 4 | 6 | 7 | 5.25 | -0.29 | ok (hesitate) |
| j68 | musician · Học một khúc mới | 3 | 5 | 100%, 0k, Sức 6 | 100%, 0k, Sức 0, +3.0k | 2 | 0 | 5 | 1.25 | other road obvious |
| j68 | musician · Nhờ phổ nhạc bài thơ dâng Hoàng thượng | 3 | 10 | 59%, 0k, Sức 0 | 100%, 0k, Sức 0, +3.0k | 4 | 7.45 | 5 | -0.61 | silver obvious |
| j68 | newGirlAdvice · Nhận làm người dưới trướng | 3 | 8 | 100%, 0k, Sức 0 | 100%, 0k, Sức 4 | 3.2 | 20.43 | 19.33 | -0.27 | ok (hesitate) |
| j68 | heatStroke · Xin đá lạnh hầm băng | 3 | 10 | 100%, 0k, Sức 0 | 38%, 0k, Sức 8 | 4 | 0 | 2.47 | 0.62 | other road obvious |
| j68 | snowDay · Phát áo bông cho cung nhân | 3 | 25 | 100%, 0k, Sức 0 | 100%, 0k, Sức 10 | 10 | 8.67 | 8 | -0.07 | ok (hesitate) |
| j68 | springAllergy · Mời Trương Bá Ngôn kê thuốc | 3 | 8 | 100%, 0k, Sức 0 | 100%, 0k, Sức 0, +3.0k | 3.2 | -1.03 | -1 | 0.01 | ok (hesitate) |
| j68 | stormNight · Thắp hương cầu an cho cung | 3 | 30 | 100%, 0k, Sức 0 | 34%, 0k, Sức 6 | 12 | 5.33 | -2.59 | -0.66 | silver obvious |
| j68 | stormNight · Cứu người, cho thuốc men | 3 | 45 | 100%, 0k, Sức 4 | 34%, 0k, Sức 6 | 18 | 9.54 | -2.59 | -0.67 | silver obvious |
| j68 | famineDonate · Quyên nhiều bạc | 3 | 55 | 100%, 0k, Sức 0 | 100%, 0k, Sức 6 | 22 | 15.84 | 16 | 0.01 | ok (hesitate) |
| j68 | famineDonate · Góp chút ít cho phải lễ | 3 | 5 | 100%, 0k, Sức 0 | 100%, 0k, Sức 6 | 2 | 7.63 | 16 | 2.09 | other road obvious |
| j68 | borderNews · Thêu cờ, may áo gửi quân | 3 | 35 | 100%, 0k, Sức 10 | 100%, 0k, Sức 0, +3.0k | 14 | 4.96 | 5 | 0 | ok (hesitate) |
| j68 | rumorPreg · Cho người dò cho chắc | 3 | 8 | 45%, 0k, Sức 0 | 100%, 0k, Sức 0, +3.0k | 3.2 | -3.12 | 5 | 2.03 | other road obvious |
| j68 | rumorPreg · Sang chúc mừng thăm dò | 3 | 5 | 49%, 0k, Sức 0 | 100%, 0k, Sức 0, +3.0k | 2 | -1.44 | 5 | 1.61 | other road obvious |
| j68 | rumorEmpLove · Hỏi thái giám Kính sự phòng | 3 | 45 | 50%, 0k, Sức 0 | 44%, 0k, Sức 0, +3.0k | 18 | -18 | -18.51 | -0.03 | ok (hesitate) |
| j68 | rumorEmpLove · Sang thân thiết với nàng | 3 | 30 | 100%, 0k, Sức 0 | 44%, 0k, Sức 0, +3.0k | 12 | -13 | -18.51 | -0.46 | silver obvious |
| j68 | silkAllot · Bỏ bạc may thêm cho cả hai | 3 | 15 | 100%, 0k, Sức 0 | 100%, 0k, Sức 0, +3.0k | 6 | 12.63 | 16.33 | 0.62 | other road obvious |
| j68 | templeRite · Cúng dầu đèn hậu hĩnh | 3 | 20 | 100%, 0k, Sức 0 | 100%, 0k, Sức 8 | 8 | 9.33 | 8.67 | -0.08 | ok (hesitate) |
| j68 | fortuneNun · Bỏ bạc xin xem một quẻ | 3 | 8 | 100%, 0k, Sức 0 | 39%, 0k, Sức 0 | 3.2 | -1.7 | 5.24 | 1.73 | other road obvious |
| j68 | fortuneNun · Treo bùa cho cung nhân yên tâm | 3 | 5 | 100%, 0k, Sức 0 | 39%, 0k, Sức 0 | 2 | 3 | 5.24 | 0.56 | other road obvious |
| j68 | rumorTH · Hỏi ma ma thân tín của Thái hậu | 3 | 8 | 50%, 0k, Sức 0 | 100%, 0k, Sức 0, +3.0k | 3.2 | -1.2 | 5 | 1.55 | other road obvious |
| j68 | rumorFavor · Mua tin Kính sự phòng | 3 | 10 | 55%, 0k, Sức 0 | 100%, 0k, Sức 0, +3.0k | 4 | -1.3 | 5 | 1.57 | other road obvious |
| j68 | lotusSeason · Cùng làm, dâng lên | 3 | 5 | 100%, 0k, Sức 6 | 100%, 0k, Sức 5 | 2 | 3.67 | 3.5 | -0.04 | ok (hesitate) |
| j68 | droughtPrayer · Lén mua nước sạch ngoài cung | 3 | 10 | 100%, 0k, Sức 0 | 100%, 0k, Sức 10 | 4 | -5 | 26.33 | 7.83 | other road obvious |
| act | deck · Hối lộ Kính sự phòng | 3 | 30 | 95%, 2k, Sức 0 | — |  |  |  |  | UNPRICED (gain only in words: 2 tuần tới dễ được lật thẻ: khả năng thấp → dễ hơn một bậc) |
| act | deck · Dưỡng nhan | 3 | 30 | 92%, 2k, Sức 0 | — |  |  |  |  | NO ACT WITHOUT SILVER for sac |
| act | deck · Tụng kinh, làm việc thiện | 3 | 10 | 95%, 2k, Sức 0 | — |  |  |  |  | NO ACT WITHOUT SILVER for duc |
| act | deck · Cài tai mắt | 3 | 25 | 80%, 2k, Sức 0 | — |  |  |  |  | NO ACT WITHOUT SILVER for mat |
| act | deck · Tự học Nấu nướng: nấu món | 3 | 6 | 95%, 2k, Sức 15 | — |  |  |  |  | UNPRICED (gain only in words: tiến bộ Nấu nướng +1..2 · tự tay chơi thì ra Canh rau dền tô) |
| act | deck · Múa trong yến tiệc [sung] | 3 | 10 | 58%, 4k, Sức 20 | 62%, 2k, Sức 10 | 4 | 1.714 | 3.347 | 0.95 | other road obvious |
| act | deck · Nghỉ ngơi dưỡng sức [suc] | 3 | 6 | 95%, 4k, Sức 0 | 95%, 1k, Sức 0 | 2.4 | 0.594 | 2.217 | 2.73 | other road obvious |
| act | deck · Phát chẩn cho cung nhân [danh] | 3 | 40 | 85%, 2k, Sức 0 | 75%, 2k, Sức 5 | 16 | 2.62 | 4.772 | 0.82 | other road obvious |
| act | deck · Cầu tự ở Phụng Tiên điện | 3 | 10 | 50%, 2k, Sức 0 | — |  |  |  |  | UNPRICED (gain only in words: 2 tháng dễ có thai hơn (nay khả năng rất thấp)) |
| act | talk:emp · Dâng một cành hoa [sung] | 3 | 5 | 50%, 2k, Sức 0 | 62%, 2k, Sức 10 | 2 | 1 | 3.347 | 2.35 | other road obvious |
| act | talk:ty · Bài thuốc dễ thụ thai | 3 | 40 | 95%, 2k, Sức 0 | — |  |  |  |  | UNPRICED (gain only in words: 3 tháng dễ có thai hơn) |
| act | talk:ty · Mời làm thái y tâm phúc | 3 | 50 | 95%, 2k, Sức 0 | — |  |  |  |  | UNPRICED (gain only in words: dễ phát hiện xạ hương, độc; bệnh của con nhẹ hơn) |
| act | talk:ty · Học hỏi y lý | 3 | 10 | 95%, 2k, Sức 0 | — |  |  |  |  | NO ACT WITHOUT SILVER for art |
| act | talk:ksp · Đút lót lật thẻ | 3 | 30 | 95%, 2k, Sức 0 | — |  |  |  |  | UNPRICED (gain only in words: 2 tuần tới dễ được lật thẻ: khả năng thấp → dễ hơn một bậc) |
| act | talk:ksp · Hỏi sở thích Hoàng thượng | 3 | 15 | 80%, 2k, Sức 0 | — |  |  |  |  | UNPRICED (gain only in words: biết thêm một điều ngài thích) |
| act | talk:peddler · Mua Son phấn Dương Châu | 3 | 8 | 95%, 2k, Sức 0 | — |  |  |  |  | NO ACT WITHOUT SILVER for sac |
| act | talk:peddler · Mua Lụa Hàng Châu | 3 | 30 | 95%, 2k, Sức 0 | — |  |  |  |  | NO ACT WITHOUT SILVER for sac |
| act | talk:peddler · Mua Trâm ngọc bích | 3 | 30 | 95%, 2k, Sức 0 | — |  |  |  |  | NO ACT WITHOUT SILVER for sac |
| act | talk:peddler · Mua Kim bạc thử độc | 3 | 15 | 95%, 2k, Sức 0 | — |  |  |  |  | UNPRICED (gain only in words: Cắm vào đồ ăn: kim đen là có độc) |
| act | talk:peddler · Mua Đàn cổ Tiêu Vĩ | 3 | 200 | 95%, 2k, Sức 0 | — |  |  |  |  | UNPRICED (gain only in words: Tặng Hoàng thượng, phi tần mê nhạc) |
| act | talk:peddler · Mua Nhân sâm trăm năm | 3 | 60 | 95%, 2k, Sức 0 | — |  |  |  |  | NO ACT WITHOUT SILVER for null |
| act | talk:fallen · Đưa cơm áo | 3 | 20 | 95%, 2k, Sức 0 | — |  |  |  |  | NO ACT WITHOUT SILVER for duc |
| act | talk:rival · Giúp đỡ nàng | 3 | 20 | 95%, 2k, Sức 0 | — |  |  |  |  | NO ACT WITHOUT SILVER for rel |
| act | talk:rival · Dò la | 3 | 17 | 44%, spyk, Sức 0 | — |  |  |  |  | UNPRICED (gain only in words: Bạc -26) |
| act | talk:rival · Bỏ độc vào trà nàng | 3 | 23 | 11%, poisonk, Sức 0 | — |  |  |  |  | UNPRICED (gain only in words: lộ: tội chết — năm đầu được tha một lần: giáng một bậc, cấm ) |
| j67 | tt_co.s2 | 5 | 45 | 54.333333333333336%, 0k, Sức 0 | 34.53333333333334%, 0k, Sức 17 | 14.12 | -12.22 | -11.74 | 0.03 | ok (hesitate) |
| j67 | tt_co.c2 | 5 | 65 | 100%, 0k, Sức 0 | 50.2%, 0k, Sức 20 | 20.39 | 0 | 2.71 | 0.13 | ok (hesitate) |
| j67 | tt_co.t1 | 5 | 35 | 100%, 0k, Sức 0 | 65.2%, 0k, Sức 13 | 10.98 | 0 | 2.06 | 0.19 | ok (hesitate) |
| j67 | tt_co.x1 | 5 | 45 | 100%, 0k, Sức 0 | 60.2%, 0k, Sức 17 | 14.12 | 25.88 | 17.9 | -0.57 | silver obvious |
| j67 | tt_oan.s1 | 5 | 45 | 100%, 0k, Sức 0 | 60.2%, 0k, Sức 17 | 14.12 | 0 | 2.31 | 0.16 | ok (hesitate) |
| j67 | tt_oan.s2 | 5 | 55 | 100%, 0k, Sức 0 | 55.2%, 0k, Sức 20 | 17.25 | 6.75 | 6.14 | -0.03 | ok (hesitate) |
| j67 | tt_oan.c1 | 5 | 65 | 100%, 0k, Sức 0 | 50.2%, 0k, Sức 20 | 20.39 | 0 | 2.71 | 0.13 | ok (hesitate) |
| j67 | tt_oan.c2 | 5 | 45 | 55%, 0k, Sức 0 | 35.2%, 0k, Sức 17 | 14.12 | -6.35 | -3.32 | 0.21 | ok (hesitate) |
| j67 | tt_tranh.s1 | 5 | 45 | 47%, 0k, Sức 0 | 27.2%, 0k, Sức 17 | 14.12 | -7.48 | -5.12 | 0.17 | ok (hesitate) |
| j67 | tt_tranh.s2 | 5 | 35 | 100%, 0k, Sức 0 | 65.2%, 0k, Sức 13 | 10.98 | 0 | 2.06 | 0.19 | ok (hesitate) |
| j67 | tt_tranh.c1 | 5 | 20 | 100%, 0k, Sức 0 | 68.2%, 0k, Sức 8 | 6.27 | 17.73 | 12.36 | -0.86 | silver obvious |
| j67 | tt_tranh.c3 | 5 | 55 | 100%, 0k, Sức 0 | 55.2%, 0k, Sức 20 | 17.25 | 0 | 2.42 | 0.14 | ok (hesitate) |
| j67 | tt_tranh.t1 | 5 | 65 | 100%, 0k, Sức 0 | 50.2%, 0k, Sức 20 | 20.39 | 0 | 2.71 | 0.13 | ok (hesitate) |
| j67 | tt_mat.s1 | 5 | 35 | 45%, 0k, Sức 0 | 30.2%, 0k, Sức 13 | 10.98 | -6.04 | -4.73 | 0.12 | ok (hesitate) |
| j67 | tt_mat.s2 | 5 | 35 | 100%, 0k, Sức 0 | 65.2%, 0k, Sức 13 | 10.98 | 0 | 2.06 | 0.19 | ok (hesitate) |
| j67 | tt_mat.c3 | 5 | 45 | 100%, 0k, Sức 0 | 60.2%, 0k, Sức 17 | 14.12 | 0 | 2.31 | 0.16 | ok (hesitate) |
| j67 | dtq_bien.s1 | 5 | 65 | 100%, 0k, Sức 0 | 50.2%, 0k, Sức 20 | 20.39 | 0.66 | 3.04 | 0.12 | ok (hesitate) |
| j67 | dtq_bien.s2 | 5 | 55 | 100%, 0k, Sức 2 | 55.2%, 0k, Sức 20 | 17.25 | -0.33 | 2.42 | 0.16 | ok (hesitate) |
| j67 | dtq_bien.c1 | 5 | 35 | 35%, 0k, Sức 1 | 20.2%, 0k, Sức 13 | 10.98 | -7.3 | -6.67 | 0.06 | ok (hesitate) |
| j67 | dtq_bien.c2 | 5 | 35 | 100%, 0k, Sức 0 | 65.2%, 0k, Sức 13 | 10.98 | 0 | 2.06 | 0.19 | ok (hesitate) |
| j67 | dtq_bien.t1 | 5 | 65 | 100%, 0k, Sức 0 | 50.2%, 0k, Sức 20 | 20.39 | 0 | 2.71 | 0.13 | ok (hesitate) |
| j67 | dtq_vu.s2 | 5 | 55 | 100%, 0k, Sức 0 | 55.2%, 0k, Sức 20 | 17.25 | 0 | 2.42 | 0.14 | ok (hesitate) |
| j67 | dtq_vu.c1 | 5 | 45 | 40%, 0k, Sức 1 | 20.2%, 0k, Sức 17 | 14.12 | -8.64 | -6.7 | 0.14 | ok (hesitate) |
| j67 | dtq_vu.c2 | 5 | 20 | 100%, 0k, Sức 0 | 68.2%, 0k, Sức 8 | 6.27 | 0 | 0.27 | 0.04 | ok (hesitate) |
| j67 | dtq_binh.s2 | 5 | 35 | 40%, 0k, Sức 0 | 25.2%, 0k, Sức 13 | 10.98 | -6.59 | -5.7 | 0.08 | ok (hesitate) |
| j67 | dtq_binh.c1 | 5 | 45 | 100%, 0k, Sức 0 | 60.2%, 0k, Sức 17 | 14.12 | 0 | 2.31 | 0.16 | ok (hesitate) |
| j67 | dtq_binh.c2 | 5 | 35 | 41.666666666666664%, 0k, Sức 0 | 26.866666666666664%, 0k, Sức 13 | 10.98 | -7.38 | -6.59 | 0.07 | ok (hesitate) |
| j67 | dtq_huynh.s1 | 5 | 65 | 100%, 0k, Sức 0 | 50.2%, 0k, Sức 20 | 20.39 | 0 | 2.71 | 0.13 | ok (hesitate) |
| j67 | dtq_huynh.s2 | 5 | 35 | 100%, 0k, Sức 0 | 65.2%, 0k, Sức 13 | 10.98 | 0 | 2.06 | 0.19 | ok (hesitate) |
| j67 | dtq_huynh.c1 | 5 | 45 | 100%, 0k, Sức 0 | 60.2%, 0k, Sức 17 | 14.12 | 0 | 2.31 | 0.16 | ok (hesitate) |
| j67 | dtq_huynh.c2 | 5 | 20 | 100%, 0k, Sức 0 | 68.2%, 0k, Sức 8 | 6.27 | 0 | 0.27 | 0.04 | ok (hesitate) |
| j67 | dtq_huynh.t1 | 5 | 65 | 45%, 0k, Sức 0 | 15.2%, 0k, Sức 20 | 20.39 | -11.22 | -7.37 | 0.19 | ok (hesitate) |
| j67 | muoi_tuoc.s1 | 5 | 90 | 100%, 0k, Sức 0 | 43.2%, 0k, Sức 20 | 28.24 | 0 | 4.08 | 0.14 | ok (hesitate) |
| j67 | muoi_tuoc.s2 | 5 | 20 | 52%, 0k, Sức 0 | 40.2%, 0k, Sức 8 | 6.27 | -5.77 | -8.84 | -0.49 | silver obvious |
| j67 | muoi_tuoc.c1 | 5 | 110 | 100%, 0k, Sức 0 | 43.2%, 0k, Sức 20 | 34.51 | 0 | 6.79 | 0.2 | ok (hesitate) |
| j67 | muoi_tuoc.c2 | 5 | 65 | 40%, 0k, Sức 0 | 10.2%, 0k, Sức 20 | 20.39 | -12.24 | -8.82 | 0.17 | ok (hesitate) |
| j67 | muoi_tuoc.c3 | 5 | 20 | 100%, 0k, Sức 0 | 68.2%, 0k, Sức 8 | 6.27 | 0 | 0.27 | 0.04 | ok (hesitate) |
| j67 | muoi_tuoc.t1 | 5 | 35 | 100%, 0k, Sức 0 | 65.2%, 0k, Sức 13 | 10.98 | 0 | 2.06 | 0.19 | ok (hesitate) |
| j67 | muoi_tuoc.x1 | 5 | 130 | 50.5%, 0k, Sức 0 | 13.7%, 0k, Sức 20 | 40.78 | -20.19 | -5.01 | 0.37 | other road obvious |
| j67 | muoi_lau.s1 | 5 | 55 | 100%, 0k, Sức 0 | 55.2%, 0k, Sức 20 | 17.25 | 0 | 2.42 | 0.14 | ok (hesitate) |
| j67 | muoi_lau.s2 | 5 | 65 | 100%, 0k, Sức 0 | 50.2%, 0k, Sức 20 | 20.39 | 24.24 | 14.88 | -0.46 | silver obvious |
| j67 | muoi_lau.c1 | 5 | 45 | 100%, 0k, Sức 0 | 60.2%, 0k, Sức 17 | 14.12 | 0 | 2.31 | 0.16 | ok (hesitate) |
| j67 | muoi_lau.c2 | 5 | 35 | 55%, 0k, Sức 0 | 40.2%, 0k, Sức 13 | 10.98 | -10.63 | -10.34 | 0.03 | ok (hesitate) |
| j67 | muoi_lau.x1 | 5 | 110 | 100%, 0k, Sức 0 | 43.2%, 0k, Sức 20 | 34.51 | 0 | 6.79 | 0.2 | ok (hesitate) |
| j67 | muoi_doi.s1 | 5 | 45 | 100%, 0k, Sức 0 | 60.2%, 0k, Sức 17 | 14.12 | 26.72 | 18.4 | -0.59 | silver obvious |
| j67 | muoi_doi.s2 | 5 | 65 | 100%, 0k, Sức 1 | 50.2%, 0k, Sức 20 | 20.39 | 4.7 | 5.16 | 0.02 | ok (hesitate) |
| j67 | muoi_doi.c1 | 5 | 90 | 100%, 0k, Sức 0 | 43.2%, 0k, Sức 20 | 28.24 | 6.78 | 7.01 | 0.01 | ok (hesitate) |
| j67 | muoi_doi.c2 | 5 | 55 | 100%, 0k, Sức 0 | 55.2%, 0k, Sức 20 | 17.25 | 0 | 2.42 | 0.14 | ok (hesitate) |
| j67 | muoi_doi.c3 | 5 | 55 | 100%, 0k, Sức 0 | 55.2%, 0k, Sức 20 | 17.25 | 27.8 | 17.76 | -0.58 | silver obvious |
| j67 | muoi_doi.x1 | 5 | 110 | 60%, 0k, Sức 0 | 23.2%, 0k, Sức 20 | 34.51 | -13.8 | -1.79 | 0.35 | other road obvious |
| j67 | muoi_no.s1 | 5 | 45 | 100%, 0k, Sức 0 | 60.2%, 0k, Sức 17 | 14.12 | 9.88 | 8.26 | -0.11 | ok (hesitate) |
| j67 | muoi_no.s2 | 5 | 45 | 100%, 0k, Sức 0 | 60.2%, 0k, Sức 17 | 14.12 | 0 | 2.31 | 0.16 | ok (hesitate) |
| j67 | muoi_no.c3 | 5 | 20 | 100%, 0k, Sức 0 | 68.2%, 0k, Sức 8 | 6.27 | 0 | 0.27 | 0.04 | ok (hesitate) |
| j67 | muoi_no.t1 | 5 | 20 | 100%, 0k, Sức 0 | 68.2%, 0k, Sức 8 | 6.27 | 17.73 | 12.36 | -0.86 | silver obvious |
| j67 | muoi_no.x1 | 5 | 65 | 40%, 0k, Sức 0 | 10.2%, 0k, Sức 20 | 20.39 | -12.24 | -8.82 | 0.17 | ok (hesitate) |
| j67 | cn_chu.s2 | 5 | 35 | 100%, 0k, Sức 0 | 65.2%, 0k, Sức 13 | 10.98 | 0 | 2.06 | 0.19 | ok (hesitate) |
| j67 | cn_chu.t1 | 5 | 35 | 40%, 0k, Sức 0 | 25.2%, 0k, Sức 13 | 10.98 | -6.59 | -5.7 | 0.08 | ok (hesitate) |
| j67 | cn_tinh.s1 | 5 | 45 | 55%, 0k, Sức 0 | 35.2%, 0k, Sức 17 | 14.12 | -6.35 | -3.32 | 0.21 | ok (hesitate) |
| j67 | cn_tinh.s2 | 5 | 35 | 50%, 0k, Sức 0 | 35.2%, 0k, Sức 13 | 10.98 | -5.49 | -3.76 | 0.16 | ok (hesitate) |
| j67 | cn_tinh.c1 | 5 | 55 | 100%, 0k, Sức 0 | 55.2%, 0k, Sức 20 | 17.25 | 0 | 2.42 | 0.14 | ok (hesitate) |
| j67 | cn_tinh.c2 | 5 | 45 | 55%, 0k, Sức 0 | 35.2%, 0k, Sức 17 | 14.12 | -6.6 | -8.03 | -0.1 | ok (hesitate) |
| j67 | cn_tinh.t1 | 5 | 45 | 42%, 0k, Sức 0 | 22.2%, 0k, Sức 17 | 14.12 | -17.96 | -19.35 | -0.1 | ok (hesitate) |
| j67 | cn_ban.s1 | 5 | 35 | 100%, 0k, Sức 0 | 65.2%, 0k, Sức 13 | 10.98 | 13.02 | 10.55 | -0.22 | ok (hesitate) |
| j67 | cn_ban.s2 | 5 | 45 | 100%, 0k, Sức 0 | 60.2%, 0k, Sức 17 | 14.12 | 0 | 2.31 | 0.16 | ok (hesitate) |
| j67 | cn_ban.c2 | 5 | 45 | 55%, 0k, Sức 0 | 35.2%, 0k, Sức 17 | 14.12 | -12.04 | -11.51 | 0.04 | ok (hesitate) |
| j67 | cn_ban.t1 | 5 | 45 | 55%, 0k, Sức 0 | 35.2%, 0k, Sức 17 | 14.12 | -6.35 | -3.32 | 0.21 | ok (hesitate) |
| j67 | cn_ban.x1 | 5 | 45 | 100%, 0k, Sức 0 | 60.2%, 0k, Sức 17 | 14.12 | 17.88 | 13.08 | -0.34 | silver obvious |
| j67 | cn_than.s1 | 5 | 35 | 100%, 0k, Sức 0 | 65.2%, 0k, Sức 13 | 10.98 | 21.02 | 15.77 | -0.48 | silver obvious |
| j67 | cn_than.s2 | 5 | 20 | 55%, 0k, Sức 0 | 43.2%, 0k, Sức 8 | 6.27 | -2.82 | -3.41 | -0.09 | ok (hesitate) |
| j67 | cn_than.c1 | 5 | 45 | 50%, 0k, Sức 0 | 30.2%, 0k, Sức 17 | 14.12 | -7.06 | -4.45 | 0.18 | ok (hesitate) |
| j67 | cn_than.c2 | 5 | 45 | 50%, 0k, Sức 0 | 30.2%, 0k, Sức 17 | 14.12 | -7.06 | -4.45 | 0.18 | ok (hesitate) |
| j67 | nc_gian.s2 | 5 | 45 | 52%, 0k, Sức 0 | 32.2%, 0k, Sức 17 | 14.12 | -6.78 | -4 | 0.2 | ok (hesitate) |
| j67 | nc_gian.c2 | 5 | 55 | 100%, 0k, Sức 0 | 55.2%, 0k, Sức 20 | 17.25 | 0 | 2.42 | 0.14 | ok (hesitate) |
| j67 | nc_su.s2 | 5 | 90 | 100%, 0k, Sức 0 | 43.2%, 0k, Sức 20 | 28.24 | 0 | 4.08 | 0.14 | ok (hesitate) |
| j67 | nc_su.c2 | 5 | 55 | 100%, 0k, Sức 0 | 55.2%, 0k, Sức 20 | 17.25 | 0 | 2.42 | 0.14 | ok (hesitate) |
| j67 | nc_tuc.s2 | 5 | 10 | 50%, 0k, Sức 0 | 38.2%, 0k, Sức 6 | 3.14 | -2.24 | -5.83 | -1.15 | silver obvious |
| j67 | nc_tuc.c2 | 5 | 35 | 50%, 0k, Sức 0 | 35.2%, 0k, Sức 13 | 10.98 | -1.45 | -1.51 | 0 | ok (hesitate) |
| j67 | nc_tuc.x1 | 5 | 65 | 100%, 0k, Sức 0 | 50.2%, 0k, Sức 20 | 20.39 | 0 | 2.71 | 0.13 | ok (hesitate) |
| j67 | nc_vuong.s2 | 5 | 35 | 40%, 0k, Sức 0 | 25.2%, 0k, Sức 13 | 10.98 | -6.59 | -5.7 | 0.08 | ok (hesitate) |
| j67 | nc_vuong.c2 | 5 | 45 | 100%, 0k, Sức 0 | 60.2%, 0k, Sức 17 | 14.12 | 0 | 2.31 | 0.16 | ok (hesitate) |
| j67 | nc_vuong.c3 | 5 | 65 | 100%, 0k, Sức 0 | 50.2%, 0k, Sức 20 | 20.39 | 0 | 2.71 | 0.13 | ok (hesitate) |
| j67 | td_an.s1 | 5 | 45 | 55%, 0k, Sức 0 | 35.2%, 0k, Sức 17 | 14.12 | -6.35 | -3.32 | 0.21 | ok (hesitate) |
| j67 | td_an.c1 | 5 | 45 | 100%, 0k, Sức 0 | 62%, 0k, Sức 6 | 14.12 | 0 | 2.95 | 0.21 | ok (hesitate) |
| j67 | td_an.c2 | 5 | 55 | 35%, 0k, Sức 0 | 10.2%, 0k, Sức 20 | 17.25 | -11.22 | -9.14 | 0.12 | ok (hesitate) |
| j67 | td_an.c3 | 5 | 45 | 100%, 0k, Sức 0 | 60.2%, 0k, Sức 17 | 14.12 | 0 | 2.31 | 0.16 | ok (hesitate) |
| j67 | td_an.t1 | 5 | 45 | 45%, 0k, Sức 0 | 25.2%, 0k, Sức 17 | 14.12 | -7.76 | -5.57 | 0.16 | ok (hesitate) |
| j67 | td_ke.s1 | 5 | 45 | 50%, 0k, Sức 0 | 30.2%, 0k, Sức 17 | 14.12 | -7.06 | -4.45 | 0.18 | ok (hesitate) |
| j67 | td_ke.s2 | 5 | 35 | 50%, 0k, Sức 0 | 35.2%, 0k, Sức 13 | 10.98 | -5.49 | -3.76 | 0.16 | ok (hesitate) |
| j67 | td_ke.c2 | 5 | 45 | 100%, 0k, Sức 0 | 60.2%, 0k, Sức 17 | 14.12 | 0 | 2.31 | 0.16 | ok (hesitate) |
| j67 | td_song.s1 | 5 | 55 | 100%, 0k, Sức 0 | 55.2%, 0k, Sức 20 | 17.25 | 0 | 2.42 | 0.14 | ok (hesitate) |
| j67 | td_song.c1 | 5 | 55 | 60%, 0k, Sức 0 | 35.2%, 0k, Sức 20 | 17.25 | -6.9 | -2.72 | 0.24 | ok (hesitate) |
| j67 | td_song.t1 | 5 | 65 | 60%, 0k, Sức 0 | 30.2%, 0k, Sức 20 | 20.39 | -8.16 | -3.05 | 0.25 | ok (hesitate) |
| j67 | td_song.x1 | 5 | 45 | 100%, 0k, Sức 0 | 60.2%, 0k, Sức 17 | 14.12 | 9.88 | 8.26 | -0.11 | ok (hesitate) |
| j67 | td_tha.c3 | 5 | 35 | 100%, 0k, Sức 0 | 65.2%, 0k, Sức 13 | 10.98 | 13.02 | 10.55 | -0.22 | ok (hesitate) |
| j67 | ch_co.s2 | 5 | 45 | 45%, 0k, Sức 0 | 25.2%, 0k, Sức 17 | 14.12 | -8.68 | -6.82 | 0.13 | ok (hesitate) |
| j67 | ch_benh.s1 | 5 | 65 | 50%, 0k, Sức 0 | 20.2%, 0k, Sức 20 | 20.39 | -10.2 | -5.93 | 0.21 | ok (hesitate) |
| j67 | ch_benh.s2 | 5 | 35 | 100%, 0k, Sức 0 | 65.2%, 0k, Sức 13 | 10.98 | 13.02 | 10.55 | -0.22 | ok (hesitate) |
| j67 | ch_benh.c1 | 5 | 35 | 45%, 0k, Sức 0 | 30.2%, 0k, Sức 13 | 10.98 | -6.04 | -4.73 | 0.12 | ok (hesitate) |
| j67 | ch_ho.s2 | 5 | 65 | 100%, 0k, Sức 0 | 50.2%, 0k, Sức 20 | 20.39 | 0 | 2.71 | 0.13 | ok (hesitate) |
| j67 | ch_ho.c1 | 5 | 55 | 100%, 0k, Sức 0 | 55.2%, 0k, Sức 20 | 17.25 | 0 | 2.42 | 0.14 | ok (hesitate) |
| j67 | ch_bi.s2 | 5 | 35 | 50%, 0k, Sức 0 | 35.2%, 0k, Sức 13 | 10.98 | -5.49 | -3.76 | 0.16 | ok (hesitate) |
| j67 | ch_bi.c3 | 5 | 55 | 35%, 0k, Sức 0 | 10.2%, 0k, Sức 20 | 17.25 | -12.08 | -10.33 | 0.1 | ok (hesitate) |
| j67 | ch_bi.t1 | 5 | 35 | 100%, 0k, Sức 0 | 65.2%, 0k, Sức 13 | 10.98 | 0 | 2.06 | 0.19 | ok (hesitate) |
| j67 | thd_tho.s2 | 5 | 55 | 100%, 0k, Sức 0 | 55.2%, 0k, Sức 20 | 17.25 | 0 | 2.42 | 0.14 | ok (hesitate) |
| j67 | thd_tho.c1 | 5 | 35 | 45%, 0k, Sức 0 | 30.2%, 0k, Sức 13 | 10.98 | -19.19 | -21.86 | -0.24 | ok (hesitate) |
| j67 | thd_tho.c2 | 5 | 55 | 50%, 0k, Sức 0 | 25.2%, 0k, Sức 20 | 17.25 | -25.47 | -30.48 | -0.29 | ok (hesitate) |
| j67 | thd_sach.c2 | 5 | 55 | 100%, 0k, Sức 0 | 55.2%, 0k, Sức 20 | 17.25 | 3.8 | 4.52 | 0.04 | ok (hesitate) |
| j67 | thd_sach.c3 | 5 | 20 | 50%, 0k, Sức 0 | 38.2%, 0k, Sức 8 | 6.27 | -3.14 | -4.14 | -0.16 | ok (hesitate) |
| j67 | thd_tro.s1 | 5 | 35 | 100%, 0k, Sức 0 | 65.2%, 0k, Sức 13 | 10.98 | 13.02 | 10.55 | -0.22 | ok (hesitate) |
| j67 | thd_tro.c1 | 5 | 35 | 100%, 0k, Sức 0 | 65.2%, 0k, Sức 13 | 10.98 | 0 | 2.06 | 0.19 | ok (hesitate) |
| j67 | thd_tro.c2 | 5 | 55 | 50%, 0k, Sức 0 | 25.2%, 0k, Sức 20 | 17.25 | -8.63 | -5.28 | 0.19 | ok (hesitate) |
| j67 | thd_tro.c3 | 5 | 45 | 100%, 0k, Sức 0 | 60.2%, 0k, Sức 17 | 14.12 | 9.88 | 8.26 | -0.11 | ok (hesitate) |
| j67 | thd_hoc.t1 | 5 | 35 | 55%, 0k, Sức 0 | 40.2%, 0k, Sức 13 | 10.98 | -12.52 | -12.86 | -0.03 | ok (hesitate) |
| j67 | cnv_chu.s2 | 5 | 5 | 50%, 0k, Sức 0 | 38.2%, 0k, Sức 6 | 1.57 | -1.78 | -6.84 | -3.22 | silver obvious |
| j67 | cnv_chu.x1 | 5 | 10 | 100%, 0k, Sức 0 | 68.2%, 0k, Sức 6 | 3.14 | 20.86 | 12.69 | -2.61 | silver obvious |
| j67 | cnv_ban.s1 | 5 | 5 | 50%, 0k, Sức 0 | 38.2%, 0k, Sức 6 | 1.57 | -0.78 | -5.6 | -3.07 | silver obvious |
| j67 | cnv_ban.c1 | 5 | 5 | 100%, 0k, Sức 1 | 68.2%, 0k, Sức 6 | 1.57 | 22.26 | 12.69 | -6.1 | silver obvious |
| j67 | cnv_ban.t1 | 5 | 10 | 50%, 0k, Sức 0 | 38.2%, 0k, Sức 6 | 3.14 | -1.57 | -5.01 | -1.1 | silver obvious |
| j67 | cnv_mat.c1 | 5 | 5 | 55%, 0k, Sức 0 | 43.2%, 0k, Sức 6 | 1.57 | -0.64 | -5.48 | -3.09 | silver obvious |
| j67 | cnv_mat.t1 | 5 | 10 | 40%, 0k, Sức 0 | 28.2%, 0k, Sức 6 | 3.14 | -3.8 | -8.5 | -1.5 | silver obvious |
| j67 | cnv_ma.c1 | 5 | 5 | 100%, 0k, Sức 0 | 68.2%, 0k, Sức 6 | 1.57 | 0 | -2.61 | -1.66 | silver obvious |
| j67 | cnv_ma.c2 | 5 | 10 | 100%, 0k, Sức 0 | 68.2%, 0k, Sức 6 | 3.14 | 20.86 | 12.69 | -2.61 | silver obvious |
| j67 | cnv_ma.x1 | 5 | 10 | 45%, 0k, Sức 0 | 33.2%, 0k, Sức 6 | 3.14 | -1.73 | -5.58 | -1.23 | silver obvious |
| j67 | s_than.s1 | 5 | 20 | 100%, 0k, Sức 0 | 68.2%, 0k, Sức 8 | 6.27 | 9.73 | 6.9 | -0.45 | silver obvious |
| j67 | s_than.s2 | 5 | 20 | 100%, 0k, Sức 0 | 68.2%, 0k, Sức 8 | 6.27 | 0 | 0.27 | 0.04 | ok (hesitate) |
| j67 | s_than.c1 | 5 | 20 | 45%, 0k, Sức 0 | 33.2%, 0k, Sức 8 | 6.27 | -10.4 | -13.31 | -0.46 | silver obvious |
| j67 | s_than.c3 | 5 | 35 | 50%, 0k, Sức 0 | 35.2%, 0k, Sức 13 | 10.98 | -5.3 | -7.36 | -0.19 | ok (hesitate) |
| j67 | s_than.x1 | 5 | 45 | 100%, 0k, Sức 0 | 60.2%, 0k, Sức 17 | 14.12 | 9.88 | 8.26 | -0.11 | ok (hesitate) |
| j67 | s_thu.s2 | 5 | 20 | 100%, 0k, Sức 0 | 68.2%, 0k, Sức 8 | 6.27 | 0 | 0.27 | 0.04 | ok (hesitate) |
| j67 | s_thu.c1 | 5 | 35 | 55%, 0k, Sức 0 | 40.2%, 0k, Sức 13 | 10.98 | -4.94 | -2.79 | 0.2 | ok (hesitate) |
| j67 | s_thu.c3 | 5 | 35 | 100%, 0k, Sức 0 | 65.2%, 0k, Sức 13 | 10.98 | 0 | 2.06 | 0.19 | ok (hesitate) |
| j67 | s_hoa.s2 | 5 | 20 | 100%, 0k, Sức 0 | 68.2%, 0k, Sức 8 | 6.27 | 0 | 0.27 | 0.04 | ok (hesitate) |
| j67 | s_hoa.c3 | 5 | 55 | 100%, 0k, Sức 0 | 55.2%, 0k, Sức 20 | 17.25 | 11.59 | 8.81 | -0.16 | ok (hesitate) |
| j67 | s_su.c3 | 5 | 20 | 60%, 0k, Sức 0 | 48.2%, 0k, Sức 8 | 6.27 | 0.93 | 0.09 | -0.13 | ok (hesitate) |
| j67 | s_su.x1 | 5 | 35 | 49.666666666666664%, 0k, Sức 0 | 34.86666666666667%, 0k, Sức 13 | 10.98 | -5.53 | -3.82 | 0.16 | ok (hesitate) |
| j67 | s_dich.s1 | 5 | 35 | 100%, 0k, Sức 0 | 65.2%, 0k, Sức 13 | 10.98 | 0 | 2.06 | 0.19 | ok (hesitate) |
| j67 | s_dich.c1 | 5 | 45 | 55%, 0k, Sức 0 | 35.2%, 0k, Sức 17 | 14.12 | 3.48 | 2.97 | -0.04 | ok (hesitate) |
| j67 | s_dich.c2 | 5 | 20 | 100%, 0k, Sức 0 | 68.2%, 0k, Sức 8 | 6.27 | 6.36 | 4.6 | -0.28 | ok (hesitate) |
| j67 | s_dich.t1 | 5 | 55 | 100%, 0k, Sức 0 | 55.2%, 0k, Sức 20 | 17.25 | 0 | 2.42 | 0.14 | ok (hesitate) |
| j67 | s_tinh.c3 | 5 | 55 | 100%, 0k, Sức 0 | 55.2%, 0k, Sức 20 | 17.25 | 0 | 2.42 | 0.14 | ok (hesitate) |
| j67 | s_tinh.t1 | 5 | 45 | 60%, 0k, Sức 0 | 40.2%, 0k, Sức 17 | 14.12 | -12.38 | -12.27 | 0.01 | ok (hesitate) |
| j67 | s_thay.s2 | 5 | 20 | 100%, 0k, Sức 0 | 68.2%, 0k, Sức 8 | 6.27 | 0 | 0.27 | 0.04 | ok (hesitate) |
| j67 | s_thay.t1 | 5 | 20 | 45%, 0k, Sức 0 | 33.2%, 0k, Sức 8 | 6.27 | -3.45 | -4.88 | -0.23 | ok (hesitate) |
| j67 | s_ban.c2 | 5 | 35 | 50%, 0k, Sức 0 | 35.2%, 0k, Sức 13 | 10.98 | -5.49 | -3.76 | 0.16 | ok (hesitate) |
| j67 | s_ban.x1 | 5 | 35 | 100%, 0k, Sức 0 | 65.2%, 0k, Sức 13 | 10.98 | 0 | 2.06 | 0.19 | ok (hesitate) |
| j67 | st_the.s1 | 5 | 35 | 55%, 0k, Sức 0 | 40.2%, 0k, Sức 13 | 10.98 | -4.94 | -2.79 | 0.2 | ok (hesitate) |
| j67 | st_the.s2 | 5 | 45 | 100%, 0k, Sức 0 | 60.2%, 0k, Sức 17 | 14.12 | 0 | 2.31 | 0.16 | ok (hesitate) |
| j67 | st_the.c1 | 5 | 45 | 55%, 0k, Sức 0 | 35.2%, 0k, Sức 17 | 14.12 | -6.35 | -3.32 | 0.21 | ok (hesitate) |
| j67 | st_the.c3 | 5 | 20 | 100%, 0k, Sức 0 | 68.2%, 0k, Sức 8 | 6.27 | 8.36 | 5.97 | -0.38 | silver obvious |
| j67 | st_the.x1 | 5 | 45 | 35%, 0k, Sức 0 | 15.2%, 0k, Sức 17 | 14.12 | -9.18 | -7.83 | 0.1 | ok (hesitate) |
| j67 | st_con.s1 | 5 | 35 | 100%, 0k, Sức 0 | 65.2%, 0k, Sức 13 | 10.98 | 0 | 2.06 | 0.19 | ok (hesitate) |
| j67 | st_con.s2 | 5 | 35 | 65%, 0k, Sức 6 | 50.2%, 0k, Sức 13 | 10.98 | -4.84 | -0.85 | 0.36 | other road obvious |
| j67 | st_con.c1 | 5 | 35 | 100%, 0k, Sức 0 | 65.2%, 0k, Sức 13 | 10.98 | 0 | 2.06 | 0.19 | ok (hesitate) |
| j67 | st_con.t1 | 5 | 35 | 40%, 0k, Sức 0 | 25.2%, 0k, Sức 13 | 10.98 | -6.59 | -5.7 | 0.08 | ok (hesitate) |
| j67 | st_dong.c2 | 5 | 55 | 100%, 0k, Sức 0 | 55.2%, 0k, Sức 20 | 17.25 | 0 | 2.42 | 0.14 | ok (hesitate) |
| j67 | st_dong.c3 | 5 | 55 | 55%, 0k, Sức 0 | 30.2%, 0k, Sức 20 | 17.25 | -7.76 | -4 | 0.22 | ok (hesitate) |
| j67 | st_dong.t1 | 5 | 35 | 45%, 0k, Sức 0 | 30.2%, 0k, Sức 13 | 10.98 | -6.04 | -4.73 | 0.12 | ok (hesitate) |
| j67 | tm96a.a1 | 5 | 10 | 100%, 0k, Sức 0 | 68.2%, 0k, Sức 6 | 3.14 | 20.86 | 12.69 | -2.61 | silver obvious |
| j67 | tm96a.a2 | 5 | 10 | 100%, 0k, Sức 0 | 68.2%, 0k, Sức 6 | 3.14 | 0 | -1.54 | -0.49 | silver obvious |
| j67 | tm96a.a3 | 5 | 10 | 100%, 0k, Sức 0 | 68.2%, 0k, Sức 6 | 3.14 | 20.86 | 12.69 | -2.61 | silver obvious |
| j67 | tm96a.a5 | 5 | 20 | 100%, 0k, Sức 0 | 68.2%, 0k, Sức 8 | 6.27 | 0 | 0.27 | 0.04 | ok (hesitate) |
| j67 | tm96a.a6 | 5 | 10 | 100%, 0k, Sức 0 | 68.2%, 0k, Sức 6 | 3.14 | 0 | -1.54 | -0.49 | silver obvious |
| j67 | tm96b.b1l | 5 | 90 | 100%, 0k, Sức 0 | 43.2%, 0k, Sức 20 | 28.24 | 0 | 4.08 | 0.14 | ok (hesitate) |
| j67 | tm96b.b2a | 5 | 20 | 100%, 0k, Sức 0 | 68.2%, 0k, Sức 8 | 6.27 | 9.73 | 6.9 | -0.45 | silver obvious |
| j67 | tm96b.b3a | 5 | 65 | 45%, 0k, Sức 0 | 15.2%, 0k, Sức 20 | 20.39 | -11.22 | -7.37 | 0.19 | ok (hesitate) |
| j67 | tm96b.b3b | 5 | 55 | 100%, 0k, Sức 0 | 55.2%, 0k, Sức 20 | 17.25 | 0 | 2.42 | 0.14 | ok (hesitate) |
| j67 | tm96c.c1o | 5 | 65 | 100%, 0k, Sức 0 | 50.2%, 0k, Sức 20 | 20.39 | 0 | 2.71 | 0.13 | ok (hesitate) |
| j67 | tm96c.c2 | 5 | 65 | 52.5%, 0k, Sức 0 | 22.7%, 0k, Sức 20 | 20.39 | -17.69 | -18.23 | -0.03 | ok (hesitate) |
| j67 | tm96c.c4b | 5 | 90 | 45%, 0k, Sức 0 | 8.2%, 0k, Sức 20 | 28.24 | -15.53 | -8.75 | 0.24 | ok (hesitate) |
| j67 | tm96c.c5 | 5 | 65 | 100%, 0k, Sức 0 | 50.2%, 0k, Sức 20 | 20.39 | 0 | 2.71 | 0.13 | ok (hesitate) |
| j72 | th_thuoc#1 | 5 | 40 | 75%, 1k, Sức 0 | 45%, 1k, Sức 0 | 12.55 | -4.14 | 4.65 | 0.7 | other road obvious |
| j72 | rv_thuoc#1 | 5 | 15 | 75%, 1k, Sức 0 | 65%, 4k, Sức 6 | 4.71 | -2.18 | -1.94 | 0.05 | ok (hesitate) |
| j72 | rv_tham_om#1 | 5 | 10 | 80%, 1k, Sức 0 | 70%, 4k, Sức 6 | 3.14 | -1.63 | -2.8 | -0.38 | silver obvious |
| j72 | thuoc_cam#1 | 5 | 15 | 100%, 1k, Sức 0 | 90%, 4k, Sức 6 | 4.71 | -1 | -0.76 | 0.05 | ok (hesitate) |
| j72 | rv_con_om#1 | 5 | 15 | 85%, 1k, Sức 0 | 75%, 4k, Sức 6 | 4.71 | -1.71 | -1.47 | 0.05 | ok (hesitate) |
| j72 | bo_chung#2 | 5 | 30 | 100%, 1k, Sức 0 | 50%, 1k, Sức 0 | 9.41 | -1 | 3.71 | 0.5 | other road obvious |
| j72 | loi_thoi#2 | 5 | 10 | 65%, 1k, Sức 0 | 55%, 4k, Sức 6 | 3.14 | -2.1 | -3.27 | -0.37 | silver obvious |
| j72 | bac_mat#2 | 5 | 20 | 100%, 1k, Sức 0 | 100%, 1k, Sức 0 | 6.27 | 8.73 | 15 | 1 | other road obvious |
| j72 | chuoc_sv#1 | 5 | 30 | 100%, 1k, Sức 0 | 85%, 7k, Sức 11 | 9.41 | -1 | -0.83 | 0.02 | ok (hesitate) |
| j72 | qua_tet#1 | 5 | 20 | 55%, 1k, Sức 0 | 45%, 5k, Sức 8 | 6.27 | -3.82 | -3.51 | 0.05 | ok (hesitate) |
| j72 | ao_bien#1 | 5 | 30 | 55%, 2k, Sức 0 | 40%, 8k, Sức 11 | 9.41 | -6.24 | -6.07 | 0.02 | ok (hesitate) |
| j72 | tham_o#1 | 5 | 20 | 40%, 2k, Sức 0 | 30%, 6k, Sức 8 | 6.27 | -5.76 | -5.45 | 0.05 | ok (hesitate) |
| j72 | vay_bac#1 | 5 | 66 | 100%, 1k, Sức 0 | 67%, 12k, Sức 20 | 20.71 | -1 | -1.46 | -0.02 | ok (hesitate) |
| j72 | rv_ngheo#1 | 5 | 30 | 100%, 1k, Sức 0 | 85%, 7k, Sức 11 | 9.41 | -1 | -0.83 | 0.02 | ok (hesitate) |
| j72 | rv_huong#1 | 5 | 10 | 50%, 2k, Sức 0 | 40%, 5k, Sức 6 | 3.14 | -3.57 | -4.75 | -0.38 | silver obvious |
| j72 | canh_thai#1 | 5 | 15 | 55%, 1k, Sức 0 | 45%, 4k, Sức 6 | 4.71 | -3.12 | -2.88 | 0.05 | ok (hesitate) |
| j72 | lc_ao#1 | 5 | 15 | 100%, 1k, Sức 0 | 90%, 4k, Sức 6 | 4.71 | -1 | -0.76 | 0.05 | ok (hesitate) |
| j72 | maid_vay#1 | 5 | 30 | 100%, 1k, Sức 0 | 85%, 7k, Sức 11 | 9.41 | -1 | -0.83 | 0.02 | ok (hesitate) |
| j72 | sv_luong#1 | 5 | 15 | 100%, 1k, Sức 0 | 50%, 1k, Sức 0 | 4.71 | -1 | 1.35 | 0.5 | other road obvious |
| j72 | dt_che#1 | 5 | 20 | 100%, 1k, Sức 0 | 100%, 1k, Sức 0 | 6.27 | -1 | 5.27 | 1 | other road obvious |
| j72 | xc_uoc#1 | 5 | 20 | 55%, 1k, Sức 0 | 45%, 5k, Sức 8 | 6.27 | -3.82 | -3.51 | 0.05 | ok (hesitate) |
| j72 | xc_hoimon#1 | 5 | 30 | 100%, 1k, Sức 0 | 60%, 2k, Sức 0 | 9.41 | -1 | 3.65 | 0.49 | other road obvious |
| j72 | dong_tam#1 | 5 | 8 | 100%, 1k, Sức 0 | 90%, 3k, Sức 6 | 2.51 | -1 | -1.74 | -0.3 | ok (hesitate) |
| j72 | giau_cn#2 | 5 | 20 | 55%, 1k, Sức 0 | 60%, 1k, Sức 0 | 6.27 | -3.82 | 2.76 | 1.05 | other road obvious |
| j72 | th_trungcuu#2 | 5 | 10 | 55%, 1k, Sức 0 | 45%, 4k, Sức 6 | 3.14 | -2.41 | -3.59 | -0.37 | silver obvious |
| j72 | hh_trungthu#2 | 5 | 40 | 100%, 1k, Sức 0 | 55%, 1k, Sức 0 | 12.55 | -1 | 5.9 | 0.55 | other road obvious |
| j72 | hh_trungcuu#2 | 5 | 30 | 100%, 1k, Sức 0 | 45%, 1k, Sức 0 | 9.41 | -1 | 3.24 | 0.45 | other road obvious |
| j72 | hh_doanngo#1 | 5 | 10 | 65%, 2k, Sức 0 | 55%, 5k, Sức 6 | 3.14 | -3.1 | -4.27 | -0.37 | silver obvious |
| j72 | th_aodong#1 | 5 | 20 | 65%, 2k, Sức 0 | 55%, 6k, Sức 8 | 6.27 | -4.2 | -3.88 | 0.05 | ok (hesitate) |
| j72 | tv_mua#1 | 5 | 15 | 65%, 1k, Sức 0 | 55%, 4k, Sức 6 | 4.71 | -2.65 | -2.41 | 0.05 | ok (hesitate) |
| j72 | maid_tet#1 | 5 | 10 | 100%, 1k, Sức 0 | 90%, 4k, Sức 6 | 3.14 | -1 | -2.18 | -0.37 | silver obvious |
| j72 | fam_muoi#1 | 5 | 20 | 50%, 1k, Sức 0 | 40%, 5k, Sức 8 | 6.27 | -4.14 | -3.82 | 0.05 | ok (hesitate) |
| j72 | fam_cn#1 | 5 | 15 | 55%, 1k, Sức 0 | 45%, 4k, Sức 6 | 4.71 | -3.12 | -2.88 | 0.05 | ok (hesitate) |
| j72 | fam_td#1 | 5 | 40 | 100%, 1k, Sức 0 | 80%, 8k, Sức 15 | 12.55 | -1 | -0.46 | 0.04 | ok (hesitate) |
| jecon | Dò la ↔ Tự đi dò la | 5 | 17 | 40%, 2k, Sức 0 | 28%, 2k, Sức 0 | 5.33 | -6.8 | -8.49 | -0.32 | silver obvious |
| jecon | Mua chuộc ↔ Sai cung nữ lấy lòng | 5 | 44 | 6%, 2k, Sức 0 | 5%, 2k, Sức 0, +8.3k | 13.8 | -17.8 | -12.49 | 0.38 | other road obvious |
| jecon | Rút thẻ bài ↔ Nhờ ơn người quen | 5 | 44 | 36%, 2k, Sức 0 | 36%, 2k, Sức 0, +10.0k | 13.8 | -10.83 | -7.03 | 0.28 | ok (hesitate) |
| jrest | Nghỉ ngơi dưỡng sức ↔ Nghỉ ngơi một lát ×N | 5 | 8 | 100%, 2k, Sức 0 | 100%, 4k, Sức 0 | 2.51 | -0.51 | 0 | 0.2 | ok (hesitate) |
| jecon | Chu toàn lễ nghĩa ↔ Bớt lễ nghĩa | 5 | 48 | 100%, 0k, Sức 0 | 100%, 0k, Sức 0, +12.6k | 15.06 | 0 | 2.43 | 0.16 | ok (hesitate) |
| j68 | giftArrive · Nhận, đáp lễ hậu hĩnh | 5 | 10 | 100%, 0k, Sức 0 | 100%, 0k, Sức 0 | 3.14 | 8.95 | 6 | -0.74 | silver obvious |
| j68 | strayCat · Giữ lại nuôi | 5 | 10 | 100%, 0k, Sức 0 | 60%, 0k, Sức 3 | 3.14 | 2.36 | 2.49 | 0.03 | ok (hesitate) |
| j68 | leakRoof · Bỏ bạc thuê thợ ngay | 5 | 15 | 100%, 0k, Sức 0 | 100%, 0k, Sức 6 | 4.71 | 9.76 | 8.67 | -0.23 | ok (hesitate) |
| j68 | letterHome · Gửi bạc về nhà | 5 | 55 | 100%, 0k, Sức 0 | 100%, 0k, Sức 2 | 17.25 | 9.75 | 9.67 | 0 | ok (hesitate) |
| j68 | eunuchSqueeze · Đưa bạc cho xong | 5 | 8 | 100%, 0k, Sức 0 | 86%, 0k, Sức 0 | 2.51 | 1.32 | 5.67 | 1.09 | other road obvious |
| j68 | embroidery · Thuê thợ thêu ngoài cung | 5 | 20 | 100%, 0k, Sức 0 | 73%, 0k, Sức 10 | 6.27 | 7.57 | 8.53 | 0.15 | ok (hesitate) |
| j68 | flowerBloom · Mời các phi tần ngắm hoa | 5 | 15 | 100%, 0k, Sức 0 | 34%, 0k, Sức 0 | 4.71 | 0.72 | 0.68 | -0.01 | ok (hesitate) |
| j68 | proudVisit · Nhún nhường tiếp đãi | 5 | 30 | 100%, 0k, Sức 0 | 100%, 0k, Sức 0 | 9.41 | 5.25 | -0.83 | -0.65 | silver obvious |
| j68 | thMama · Biếu ma ma chút quà | 5 | 8 | 100%, 0k, Sức 0 | 100%, 0k, Sức 0, +3.0k | 2.51 | 1.49 | 5 | 0.88 | other road obvious |
| j68 | docCheck · Để thái y kê thuốc bổ | 5 | 10 | 100%, 0k, Sức 0 | 100%, 0k, Sức 0, +3.0k | 3.14 | -1.47 | -1.43 | 0.01 | ok (hesitate) |
| j68 | docCheck · Hỏi thăm dò chuyện các cung | 5 | 5 | 44%, 0k, Sức 0 | 100%, 0k, Sức 0, +3.0k | 1.57 | -2.53 | -1.43 | 0.27 | ok (hesitate) |
| j68 | painter · Bỏ bạc nhờ vẽ cho đẹp | 5 | 15 | 100%, 0k, Sức 0 | 68%, 0k, Sức 4 | 4.71 | 8.29 | 5.25 | -0.65 | silver obvious |
| j68 | musician · Học một khúc mới | 5 | 5 | 100%, 0k, Sức 6 | 100%, 0k, Sức 0, +3.0k | 1.57 | 0.43 | 5 | 1.14 | other road obvious |
| j68 | musician · Nhờ phổ nhạc bài thơ dâng Hoàng thượng | 5 | 10 | 59%, 0k, Sức 0 | 100%, 0k, Sức 0, +3.0k | 3.14 | 8.31 | 5 | -0.83 | silver obvious |
| j68 | newGirlAdvice · Nhận làm người dưới trướng | 5 | 8 | 100%, 0k, Sức 0 | 100%, 0k, Sức 4 | 2.51 | 20.79 | 19.33 | -0.36 | silver obvious |
| j68 | heatStroke · Xin đá lạnh hầm băng | 5 | 10 | 100%, 0k, Sức 0 | 38%, 0k, Sức 8 | 3.14 | 0.86 | 2.47 | 0.4 | other road obvious |
| j68 | snowDay · Phát áo bông cho cung nhân | 5 | 35 | 100%, 0k, Sức 0 | 100%, 0k, Sức 10 | 10.98 | 7.69 | 8 | 0.03 | ok (hesitate) |
| j68 | springAllergy · Mời Trương Bá Ngôn kê thuốc | 5 | 8 | 100%, 0k, Sức 0 | 40%, 0k, Sức 2 | 2.51 | -1.51 | -1.33 | 0.04 | ok (hesitate) |
| j68 | stormNight · Thắp hương cầu an cho cung | 5 | 30 | 100%, 0k, Sức 0 | 34%, 0k, Sức 6 | 9.41 | 7.92 | -2.59 | -1.12 | silver obvious |
| j68 | stormNight · Cứu người, cho thuốc men | 5 | 45 | 100%, 0k, Sức 4 | 34%, 0k, Sức 6 | 14.12 | 13.43 | -2.59 | -1.13 | silver obvious |
| j68 | famineDonate · Quyên nhiều bạc | 5 | 70 | 100%, 0k, Sức 0 | 100%, 0k, Sức 6 | 21.96 | 15.88 | 16 | 0.01 | ok (hesitate) |
| j68 | famineDonate · Góp chút ít cho phải lễ | 5 | 5 | 100%, 0k, Sức 0 | 100%, 0k, Sức 6 | 1.57 | 8.06 | 16 | 1.98 | other road obvious |
| j68 | borderNews · Thêu cờ, may áo gửi quân | 5 | 45 | 100%, 0k, Sức 10 | 100%, 0k, Sức 0, +3.0k | 14.12 | 4.85 | 5 | 0.01 | ok (hesitate) |
| j68 | rumorPreg · Cho người dò cho chắc | 5 | 8 | 45%, 0k, Sức 0 | 100%, 0k, Sức 0, +3.0k | 2.51 | -2.43 | 5 | 1.86 | other road obvious |
| j68 | rumorPreg · Sang chúc mừng thăm dò | 5 | 5 | 49%, 0k, Sức 0 | 100%, 0k, Sức 0, +3.0k | 1.57 | -1.01 | 5 | 1.5 | other road obvious |
| j68 | rumorEmpLove · Hỏi thái giám Kính sự phòng | 5 | 45 | 50%, 0k, Sức 0 | 44%, 0k, Sức 0, +3.0k | 14.12 | -13.9 | -18.51 | -0.33 | silver obvious |
| j68 | rumorEmpLove · Sang thân thiết với nàng | 5 | 30 | 100%, 0k, Sức 0 | 44%, 0k, Sức 0, +3.0k | 9.41 | -10.41 | -18.51 | -0.86 | silver obvious |
| j68 | silkAllot · Bỏ bạc may thêm cho cả hai | 5 | 15 | 100%, 0k, Sức 0 | 100%, 0k, Sức 0, +3.0k | 4.71 | 13.93 | 16.33 | 0.51 | other road obvious |
| j68 | templeRite · Cúng dầu đèn hậu hĩnh | 5 | 30 | 100%, 0k, Sức 0 | 100%, 0k, Sức 8 | 9.41 | 7.92 | 8.67 | 0.08 | ok (hesitate) |
| j68 | fortuneNun · Bỏ bạc xin xem một quẻ | 5 | 8 | 100%, 0k, Sức 0 | 39%, 0k, Sức 0 | 2.51 | -1.01 | 5.24 | 1.56 | other road obvious |
| j68 | fortuneNun · Treo bùa cho cung nhân yên tâm | 5 | 5 | 100%, 0k, Sức 0 | 39%, 0k, Sức 0 | 1.57 | 3.43 | 5.24 | 0.45 | other road obvious |
| j68 | rumorTH · Hỏi ma ma thân tín của Thái hậu | 5 | 8 | 50%, 0k, Sức 0 | 100%, 0k, Sức 0, +3.0k | 2.51 | -0.29 | 5 | 1.32 | other road obvious |
| j68 | rumorFavor · Mua tin Kính sự phòng | 5 | 10 | 55%, 0k, Sức 0 | 100%, 0k, Sức 0, +3.0k | 3.14 | -0.24 | 5 | 1.31 | other road obvious |
| j68 | lotusSeason · Cùng làm, dâng lên | 5 | 7 | 100%, 0k, Sức 6 | 100%, 0k, Sức 5 | 2.2 | 3.47 | 3.5 | 0.01 | ok (hesitate) |
| j68 | droughtPrayer · Lén mua nước sạch ngoài cung | 5 | 10 | 100%, 0k, Sức 0 | 100%, 0k, Sức 10 | 3.14 | -4.14 | 26.33 | 7.62 | other road obvious |
| act | deck · Hối lộ Kính sự phòng | 5 | 30 | 95%, 2k, Sức 0 | — |  |  |  |  | UNPRICED (gain only in words: 2 tuần tới dễ được lật thẻ: khả năng thấp → dễ hơn một bậc) |
| act | deck · Tụng kinh, làm việc thiện | 5 | 10 | 95%, 2k, Sức 0 | — |  |  |  |  | NO ACT WITHOUT SILVER for duc |
| act | deck · Cầu tự ở Phụng Tiên điện | 5 | 10 | 50%, 2k, Sức 0 | — |  |  |  |  | UNPRICED (gain only in words: 2 tháng dễ có thai hơn (nay khả năng rất thấp)) |
| act | deck · Múa trong yến tiệc [sung] | 5 | 10 | 58%, 4k, Sức 20 | 62%, 2k, Sức 10 | 3.14 | 1.784 | 3.347 | 0.88 | other road obvious |
| act | deck · Phát chẩn cho cung nhân [danh] | 5 | 40 | 85%, 2k, Sức 0 | 75%, 2k, Sức 5 | 12.55 | 3.241 | 4.772 | 0.47 | other road obvious |
| act | deck · Cài tai mắt | 5 | 25 | 80%, 2k, Sức 0 | — |  |  |  |  | NO ACT WITHOUT SILVER for mat |
| act | deck · Nghỉ ngơi dưỡng sức [suc] | 5 | 8 | 95%, 4k, Sức 0 | 95%, 1k, Sức 0 | 2.51 | 0.584 | 2.217 | 2.8 | other road obvious |
| act | deck · Tự học Nấu nướng: nấu món | 5 | 6 | 95%, 2k, Sức 15 | — |  |  |  |  | UNPRICED (gain only in words: tiến bộ Nấu nướng +1..2 · tự tay chơi thì ra Cháo trắng hành) |
| act | deck · Dưỡng nhan | 5 | 30 | 92%, 2k, Sức 0 | — |  |  |  |  | NO ACT WITHOUT SILVER for sac |
| act | talk:emp · Dâng một cành hoa [sung] | 5 | 5 | 50%, 2k, Sức 0 | 62%, 2k, Sức 10 | 1.57 | 1.121 | 3.347 | 1.99 | other road obvious |
| act | talk:ty · Bài thuốc dễ thụ thai | 5 | 40 | 95%, 2k, Sức 0 | — |  |  |  |  | UNPRICED (gain only in words: 3 tháng dễ có thai hơn) |
| act | talk:ty · Mời làm thái y tâm phúc | 5 | 50 | 95%, 2k, Sức 0 | — |  |  |  |  | UNPRICED (gain only in words: dễ phát hiện xạ hương, độc; bệnh của con nhẹ hơn) |
| act | talk:ty · Học hỏi y lý | 5 | 10 | 95%, 2k, Sức 0 | — |  |  |  |  | NO ACT WITHOUT SILVER for art |
| act | talk:ksp · Đút lót lật thẻ | 5 | 30 | 95%, 2k, Sức 0 | — |  |  |  |  | UNPRICED (gain only in words: 2 tuần tới dễ được lật thẻ: khả năng thấp → dễ hơn một bậc) |
| act | talk:ksp · Hỏi sở thích Hoàng thượng | 5 | 15 | 80%, 2k, Sức 0 | — |  |  |  |  | UNPRICED (gain only in words: biết thêm một điều ngài thích) |
| act | talk:peddler · Mua Son phấn Dương Châu | 5 | 8 | 95%, 2k, Sức 0 | — |  |  |  |  | NO ACT WITHOUT SILVER for sac |
| act | talk:peddler · Mua Lụa Hàng Châu | 5 | 30 | 95%, 2k, Sức 0 | — |  |  |  |  | NO ACT WITHOUT SILVER for sac |
| act | talk:peddler · Mua Trâm ngọc bích | 5 | 30 | 95%, 2k, Sức 0 | — |  |  |  |  | NO ACT WITHOUT SILVER for sac |
| act | talk:peddler · Mua Kim bạc thử độc | 5 | 15 | 95%, 2k, Sức 0 | — |  |  |  |  | UNPRICED (gain only in words: Cắm vào đồ ăn: kim đen là có độc) |
| act | talk:peddler · Mua Đàn cổ Tiêu Vĩ | 5 | 200 | 95%, 2k, Sức 0 | — |  |  |  |  | UNPRICED (gain only in words: Tặng Hoàng thượng, phi tần mê nhạc) |
| act | talk:peddler · Mua Nhân sâm trăm năm | 5 | 60 | 95%, 2k, Sức 0 | — |  |  |  |  | NO ACT WITHOUT SILVER for null |
| act | talk:fallen · Đưa cơm áo | 5 | 20 | 95%, 2k, Sức 0 | — |  |  |  |  | NO ACT WITHOUT SILVER for duc |
| act | talk:rival · Giúp đỡ nàng | 5 | 20 | 95%, 2k, Sức 0 | — |  |  |  |  | NO ACT WITHOUT SILVER for rel |
| act | talk:rival · Dò la | 5 | 15 | 44%, spyk, Sức 0 | — |  |  |  |  | UNPRICED (gain only in words: Bạc -21) |
| act | talk:rival · Bỏ độc vào trà nàng | 5 | 20 | 11%, poisonk, Sức 0 | — |  |  |  |  | UNPRICED (gain only in words: lộ: tội chết — năm đầu được tha một lần: giáng một bậc, cấm ) |
