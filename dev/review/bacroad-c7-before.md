# bạc ↔ road without silver — scan BEFORE C7 (build e50687dff = branch d02658a9d merged with main 900ace7fb)

Script: `NODE_PATH=$(npm root -g) BACSEED=7 node dev/measure/bacroad.js <page> <out.json> dev/measure/pass/data/val.json`. Values in khắc; gap = (E other − E silver) / price (j68: / max(price, 4)); |gap| ≤ 0.3 = she hesitates.

## Summary

| group | pairs | ok | other road obvious | silver obvious | no road | unpriced |
|---|---|---|---|---|---|---|
| j67 r1 | 170 | 148 | 5 | 17 | 0 | 0 |
| j72 r1 | 34 | 2 | 32 | 0 | 0 | 0 |
| jecon r1 | 4 | 0 | 3 | 1 | 0 | 0 |
| jrest r1 | 1 | 0 | 1 | 0 | 0 | 0 |
| j68 r1 | 35 | 3 | 27 | 5 | 0 | 0 |
| act r1 | 25 | 0 | 5 | 0 | 7 | 13 |
| j67 r3 | 170 | 134 | 4 | 32 | 0 | 0 |
| j72 r3 | 34 | 24 | 9 | 1 | 0 | 0 |
| jecon r3 | 4 | 1 | 2 | 1 | 0 | 0 |
| jrest r3 | 1 | 1 | 0 | 0 | 0 | 0 |
| j68 r3 | 35 | 5 | 23 | 7 | 0 | 0 |
| act r3 | 25 | 1 | 4 | 0 | 7 | 13 |
| j67 r5 | 170 | 135 | 4 | 31 | 0 | 0 |
| j72 r5 | 34 | 18 | 9 | 7 | 0 | 0 |
| jecon r5 | 4 | 2 | 1 | 1 | 0 | 0 |
| jrest r5 | 1 | 1 | 0 | 0 | 0 | 0 |
| j68 r5 | 35 | 4 | 22 | 9 | 0 | 0 |
| act r5 | 25 | 1 | 4 | 0 | 7 | 13 |
total 807, off by >30%: 327, errors []

## Every pair

| source | choice | rank | bạc | silver road (odds, khắc, Sức) | other road (odds, khắc, Sức, other) | price (khắc) | E silver | E other | gap | verdict |
|---|---|---|---|---|---|---|---|---|---|---|
| j67 | tt_co.s2 | 1 | 30 | 51.333333333333336%, 0k, Sức 0 | 13.933333333333335%, 0k, Sức 20 | 24 | -17.83 | -18.11 | -0.01 | ok (hesitate) |
| j67 | tt_co.c2 | 1 | 40 | 100%, 0k, Sức 0 | 40.6%, 0k, Sức 20 | 32 | 0 | 4.66 | 0.15 | ok (hesitate) |
| j67 | tt_co.t1 | 1 | 20 | 100%, 0k, Sức 0 | 54.6%, 0k, Sức 19 | 16 | 0 | 1.75 | 0.11 | ok (hesitate) |
| j67 | tt_co.x1 | 1 | 30 | 100%, 0k, Sức 0 | 42.6%, 0k, Sức 20 | 24 | 16 | 8.87 | -0.3 | ok (hesitate) |
| j67 | tt_oan.s1 | 1 | 30 | 100%, 0k, Sức 0 | 42.6%, 0k, Sức 20 | 24 | 0 | 2.06 | 0.09 | ok (hesitate) |
| j67 | tt_oan.s2 | 1 | 35 | 100%, 0k, Sức 0 | 40.6%, 0k, Sức 20 | 28 | 0 | 3.03 | 0.11 | ok (hesitate) |
| j67 | tt_oan.c1 | 1 | 40 | 100%, 0k, Sức 0 | 40.6%, 0k, Sức 20 | 32 | 0 | 4.66 | 0.15 | ok (hesitate) |
| j67 | tt_oan.c2 | 1 | 30 | 55%, 0k, Sức 0 | 17.6%, 0k, Sức 20 | 24 | -10.8 | -6.05 | 0.2 | ok (hesitate) |
| j67 | tt_tranh.s1 | 1 | 30 | 44.75%, 0k, Sức 0 | 7.35%, 0k, Sức 20 | 24 | -13.26 | -9.37 | 0.16 | ok (hesitate) |
| j67 | tt_tranh.s2 | 1 | 20 | 100%, 0k, Sức 0 | 54.6%, 0k, Sức 19 | 16 | 0 | 1.75 | 0.11 | ok (hesitate) |
| j67 | tt_tranh.c1 | 1 | 15 | 100%, 0k, Sức 0 | 61.6%, 0k, Sức 14 | 12 | 12 | 9.22 | -0.23 | ok (hesitate) |
| j67 | tt_tranh.c3 | 1 | 35 | 100%, 0k, Sức 0 | 40.6%, 0k, Sức 20 | 28 | 0 | 3.03 | 0.11 | ok (hesitate) |
| j67 | tt_tranh.t1 | 1 | 40 | 100%, 0k, Sức 0 | 40.6%, 0k, Sức 20 | 32 | 0 | 4.66 | 0.15 | ok (hesitate) |
| j67 | tt_mat.s1 | 1 | 20 | 45%, 0k, Sức 0 | 19.6%, 0k, Sức 19 | 16 | -8.8 | -6.8 | 0.12 | ok (hesitate) |
| j67 | tt_mat.s2 | 1 | 20 | 100%, 0k, Sức 0 | 54.6%, 0k, Sức 19 | 16 | 0 | 1.75 | 0.11 | ok (hesitate) |
| j67 | tt_mat.c3 | 1 | 30 | 100%, 0k, Sức 0 | 42.6%, 0k, Sức 20 | 24 | 0 | 2.06 | 0.09 | ok (hesitate) |
| j67 | dtq_bien.s1 | 1 | 40 | 100%, 0k, Sức 0 | 40.6%, 0k, Sức 20 | 32 | 0 | 4.66 | 0.15 | ok (hesitate) |
| j67 | dtq_bien.s2 | 1 | 35 | 100%, 0k, Sức 2 | 40.6%, 0k, Sức 20 | 28 | -0.33 | 3.03 | 0.12 | ok (hesitate) |
| j67 | dtq_bien.c1 | 1 | 20 | 35%, 0k, Sức 1 | 9.6%, 0k, Sức 19 | 16 | -10.57 | -9.24 | 0.08 | ok (hesitate) |
| j67 | dtq_bien.c2 | 1 | 20 | 100%, 0k, Sức 0 | 54.6%, 0k, Sức 19 | 16 | 0 | 1.75 | 0.11 | ok (hesitate) |
| j67 | dtq_bien.t1 | 1 | 40 | 100%, 0k, Sức 0 | 40.6%, 0k, Sức 20 | 32 | 0 | 4.66 | 0.15 | ok (hesitate) |
| j67 | dtq_vu.s2 | 1 | 35 | 100%, 0k, Sức 0 | 40.6%, 0k, Sức 20 | 28 | 0 | 3.03 | 0.11 | ok (hesitate) |
| j67 | dtq_vu.c1 | 1 | 30 | 40%, 0k, Sức 1 | 5%, 0k, Sức 20 | 24 | -14.57 | -10.13 | 0.18 | ok (hesitate) |
| j67 | dtq_vu.c2 | 1 | 15 | 100%, 0k, Sức 0 | 61.6%, 0k, Sức 14 | 12 | 0 | 1.82 | 0.15 | ok (hesitate) |
| j67 | dtq_binh.s2 | 1 | 20 | 40%, 0k, Sức 0 | 14.6%, 0k, Sức 19 | 16 | -9.6 | -8.02 | 0.1 | ok (hesitate) |
| j67 | dtq_binh.c1 | 1 | 30 | 100%, 0k, Sức 0 | 42.6%, 0k, Sức 20 | 24 | 0 | 2.06 | 0.09 | ok (hesitate) |
| j67 | dtq_binh.c2 | 1 | 20 | 41.666666666666664%, 0k, Sức 0 | 16.266666666666666%, 0k, Sức 19 | 16 | -10.31 | -9.01 | 0.08 | ok (hesitate) |
| j67 | dtq_huynh.s1 | 1 | 40 | 100%, 0k, Sức 0 | 40.6%, 0k, Sức 20 | 32 | 0 | 4.66 | 0.15 | ok (hesitate) |
| j67 | dtq_huynh.s2 | 1 | 20 | 100%, 0k, Sức 0 | 54.6%, 0k, Sức 19 | 16 | 0 | 1.75 | 0.11 | ok (hesitate) |
| j67 | dtq_huynh.c1 | 1 | 30 | 100%, 0k, Sức 0 | 42.6%, 0k, Sức 20 | 24 | 0 | 2.06 | 0.09 | ok (hesitate) |
| j67 | dtq_huynh.c2 | 1 | 15 | 100%, 0k, Sức 0 | 61.6%, 0k, Sức 14 | 12 | 0 | 1.82 | 0.15 | ok (hesitate) |
| j67 | dtq_huynh.t1 | 1 | 40 | 45%, 0k, Sức 0 | 5.6%, 0k, Sức 20 | 32 | -17.6 | -9.49 | 0.25 | ok (hesitate) |
| j67 | muoi_tuoc.s1 | 1 | 55 | 100%, 0k, Sức 0 | 40.6%, 0k, Sức 20 | 44 | 0 | 9.53 | 0.22 | ok (hesitate) |
| j67 | muoi_tuoc.s2 | 1 | 15 | 49.75%, 0k, Sức 0 | 31.35%, 0k, Sức 14 | 12 | -12.06 | -12.83 | -0.06 | ok (hesitate) |
| j67 | muoi_tuoc.c1 | 1 | 70 | 100%, 0k, Sức 0 | 40.6%, 0k, Sức 20 | 56 | 0 | 14.4 | 0.26 | ok (hesitate) |
| j67 | muoi_tuoc.c2 | 1 | 40 | 40%, 0k, Sức 0 | 5%, 0k, Sức 20 | 32 | -19.2 | -9.73 | 0.3 | ok (hesitate) |
| j67 | muoi_tuoc.c3 | 1 | 15 | 100%, 0k, Sức 0 | 61.6%, 0k, Sức 14 | 12 | 0 | 1.82 | 0.15 | ok (hesitate) |
| j67 | muoi_tuoc.t1 | 1 | 20 | 100%, 0k, Sức 0 | 54.6%, 0k, Sức 19 | 16 | 0 | 1.75 | 0.11 | ok (hesitate) |
| j67 | muoi_tuoc.x1 | 1 | 85 | 50.5%, 0k, Sức 0 | 11.1%, 0k, Sức 20 | 68 | -33.66 | -3.27 | 0.45 | other road obvious |
| j67 | muoi_lau.s1 | 1 | 35 | 100%, 0k, Sức 0 | 40.6%, 0k, Sức 20 | 28 | 0 | 3.03 | 0.11 | ok (hesitate) |
| j67 | muoi_lau.s2 | 1 | 40 | 100%, 0k, Sức 0 | 40.6%, 0k, Sức 20 | 32 | 12.63 | 9.78 | -0.09 | ok (hesitate) |
| j67 | muoi_lau.c1 | 1 | 30 | 100%, 0k, Sức 0 | 42.6%, 0k, Sức 20 | 24 | 0 | 2.06 | 0.09 | ok (hesitate) |
| j67 | muoi_lau.c2 | 1 | 20 | 55%, 0k, Sức 0 | 29.6%, 0k, Sức 19 | 16 | -12.88 | -13.25 | -0.02 | ok (hesitate) |
| j67 | muoi_lau.x1 | 1 | 70 | 100%, 0k, Sức 0 | 40.6%, 0k, Sức 20 | 56 | 0 | 14.4 | 0.26 | ok (hesitate) |
| j67 | muoi_doi.s1 | 1 | 30 | 100%, 0k, Sức 0 | 42.6%, 0k, Sức 20 | 24 | 16.84 | 9.23 | -0.32 | silver obvious |
| j67 | muoi_doi.s2 | 1 | 40 | 100%, 0k, Sức 1 | 40.6%, 0k, Sức 20 | 32 | -0.17 | 4.66 | 0.15 | ok (hesitate) |
| j67 | muoi_doi.c1 | 1 | 55 | 100%, 0k, Sức 0 | 40.6%, 0k, Sức 20 | 44 | 0 | 9.53 | 0.22 | ok (hesitate) |
| j67 | muoi_doi.c2 | 1 | 35 | 100%, 0k, Sức 0 | 40.6%, 0k, Sức 20 | 28 | 0 | 3.03 | 0.11 | ok (hesitate) |
| j67 | muoi_doi.c3 | 1 | 35 | 100%, 0k, Sức 0 | 40.6%, 0k, Sức 20 | 28 | 17.05 | 9.96 | -0.25 | ok (hesitate) |
| j67 | muoi_doi.x1 | 1 | 70 | 60%, 0k, Sức 0 | 20.6%, 0k, Sức 20 | 56 | -22.4 | 1.52 | 0.43 | other road obvious |
| j67 | muoi_no.s1 | 1 | 30 | 100%, 0k, Sức 0 | 42.6%, 0k, Sức 20 | 24 | 0 | 2.06 | 0.09 | ok (hesitate) |
| j67 | muoi_no.s2 | 1 | 30 | 100%, 0k, Sức 0 | 42.6%, 0k, Sức 20 | 24 | 0 | 2.06 | 0.09 | ok (hesitate) |
| j67 | muoi_no.c3 | 1 | 15 | 100%, 0k, Sức 0 | 61.6%, 0k, Sức 14 | 12 | 0 | 1.82 | 0.15 | ok (hesitate) |
| j67 | muoi_no.t1 | 1 | 15 | 100%, 0k, Sức 0 | 61.6%, 0k, Sức 14 | 12 | 12 | 9.22 | -0.23 | ok (hesitate) |
| j67 | muoi_no.x1 | 1 | 40 | 40%, 0k, Sức 0 | 5%, 0k, Sức 20 | 32 | -19.2 | -9.73 | 0.3 | ok (hesitate) |
| j67 | cn_chu.s2 | 1 | 20 | 100%, 0k, Sức 0 | 54.6%, 0k, Sức 19 | 16 | 0 | 1.75 | 0.11 | ok (hesitate) |
| j67 | cn_chu.t1 | 1 | 20 | 40%, 0k, Sức 0 | 14.6%, 0k, Sức 19 | 16 | -9.6 | -8.02 | 0.1 | ok (hesitate) |
| j67 | cn_tinh.s1 | 1 | 30 | 55%, 0k, Sức 0 | 17.6%, 0k, Sức 20 | 24 | -10.8 | -6.05 | 0.2 | ok (hesitate) |
| j67 | cn_tinh.s2 | 1 | 20 | 50%, 0k, Sức 0 | 24.6%, 0k, Sức 19 | 16 | -8 | -5.58 | 0.15 | ok (hesitate) |
| j67 | cn_tinh.c1 | 1 | 35 | 100%, 0k, Sức 0 | 40.6%, 0k, Sức 20 | 28 | 0 | 3.03 | 0.11 | ok (hesitate) |
| j67 | cn_tinh.c2 | 1 | 30 | 55%, 0k, Sức 0 | 17.6%, 0k, Sức 20 | 24 | -16.48 | -16.46 | 0 | ok (hesitate) |
| j67 | cn_tinh.t1 | 1 | 30 | 39.75%, 0k, Sức 0 | 5%, 0k, Sức 20 | 24 | -24.61 | -26.13 | -0.06 | ok (hesitate) |
| j67 | cn_ban.s1 | 1 | 20 | 100%, 0k, Sức 0 | 54.6%, 0k, Sức 19 | 16 | 8 | 6.11 | -0.12 | ok (hesitate) |
| j67 | cn_ban.s2 | 1 | 30 | 100%, 0k, Sức 0 | 42.6%, 0k, Sức 20 | 24 | 0 | 2.06 | 0.09 | ok (hesitate) |
| j67 | cn_ban.c2 | 1 | 30 | 55%, 0k, Sức 0 | 17.6%, 0k, Sức 20 | 24 | -16.48 | -16.46 | 0 | ok (hesitate) |
| j67 | cn_ban.t1 | 1 | 30 | 55%, 0k, Sức 0 | 17.6%, 0k, Sức 20 | 24 | -10.8 | -6.05 | 0.2 | ok (hesitate) |
| j67 | cn_ban.x1 | 1 | 30 | 100%, 0k, Sức 0 | 42.6%, 0k, Sức 20 | 24 | 8 | 5.46 | -0.11 | ok (hesitate) |
| j67 | cn_than.s1 | 1 | 20 | 100%, 0k, Sức 0 | 54.6%, 0k, Sức 19 | 16 | 16 | 10.48 | -0.34 | silver obvious |
| j67 | cn_than.s2 | 1 | 15 | 55%, 0k, Sức 0 | 36.6%, 0k, Sức 14 | 12 | -5.4 | -3.28 | 0.18 | ok (hesitate) |
| j67 | cn_than.c1 | 1 | 30 | 50%, 0k, Sức 0 | 12.6%, 0k, Sức 20 | 24 | -12 | -7.67 | 0.18 | ok (hesitate) |
| j67 | cn_than.c2 | 1 | 30 | 50%, 0k, Sức 0 | 12.6%, 0k, Sức 20 | 24 | -12 | -7.67 | 0.18 | ok (hesitate) |
| j67 | nc_gian.s2 | 1 | 30 | 49.75%, 0k, Sức 0 | 12.35%, 0k, Sức 20 | 24 | -12.06 | -7.75 | 0.18 | ok (hesitate) |
| j67 | nc_gian.c2 | 1 | 35 | 100%, 0k, Sức 0 | 40.6%, 0k, Sức 20 | 28 | 0 | 3.03 | 0.11 | ok (hesitate) |
| j67 | nc_su.s2 | 1 | 55 | 100%, 0k, Sức 0 | 40.6%, 0k, Sức 20 | 44 | 0 | 9.53 | 0.22 | ok (hesitate) |
| j67 | nc_su.c2 | 1 | 35 | 100%, 0k, Sức 0 | 40.6%, 0k, Sức 20 | 28 | 0 | 3.03 | 0.11 | ok (hesitate) |
| j67 | nc_tuc.s2 | 1 | 5 | 50%, 0k, Sức 0 | 35.6%, 0k, Sức 6 | 4 | -2.67 | -5.86 | -0.8 | silver obvious |
| j67 | nc_tuc.c2 | 1 | 20 | 50%, 0k, Sức 0 | 24.6%, 0k, Sức 19 | 16 | -6.47 | -5.85 | 0.04 | ok (hesitate) |
| j67 | nc_tuc.x1 | 1 | 40 | 100%, 0k, Sức 0 | 40.6%, 0k, Sức 20 | 32 | 0 | 4.66 | 0.15 | ok (hesitate) |
| j67 | nc_vuong.s2 | 1 | 20 | 40%, 0k, Sức 0 | 14.6%, 0k, Sức 19 | 16 | -9.6 | -8.02 | 0.1 | ok (hesitate) |
| j67 | nc_vuong.c2 | 1 | 30 | 100%, 0k, Sức 0 | 42.6%, 0k, Sức 20 | 24 | 0 | 2.06 | 0.09 | ok (hesitate) |
| j67 | nc_vuong.c3 | 1 | 40 | 100%, 0k, Sức 0 | 40.6%, 0k, Sức 20 | 32 | 0 | 4.66 | 0.15 | ok (hesitate) |
| j67 | td_an.s1 | 1 | 30 | 55%, 0k, Sức 0 | 17.6%, 0k, Sức 20 | 24 | -10.8 | -6.05 | 0.2 | ok (hesitate) |
| j67 | td_an.c1 | 1 | 30 | 100%, 0k, Sức 0 | 57.66666666666667%, 0k, Sức 6 | 24 | 0 | 7.49 | 0.31 | other road obvious |
| j67 | td_an.c2 | 1 | 35 | 35%, 0k, Sức 0 | 5%, 0k, Sức 20 | 28 | -18.2 | -9.93 | 0.3 | ok (hesitate) |
| j67 | td_an.c3 | 1 | 30 | 100%, 0k, Sức 0 | 42.6%, 0k, Sức 20 | 24 | 0 | 2.06 | 0.09 | ok (hesitate) |
| j67 | td_an.t1 | 1 | 30 | 45%, 0k, Sức 0 | 7.6%, 0k, Sức 20 | 24 | -13.2 | -9.29 | 0.16 | ok (hesitate) |
| j67 | td_ke.s1 | 1 | 30 | 50%, 0k, Sức 0 | 12.6%, 0k, Sức 20 | 24 | -12 | -7.67 | 0.18 | ok (hesitate) |
| j67 | td_ke.s2 | 1 | 20 | 50%, 0k, Sức 0 | 24.6%, 0k, Sức 19 | 16 | -8 | -5.58 | 0.15 | ok (hesitate) |
| j67 | td_ke.c2 | 1 | 30 | 100%, 0k, Sức 0 | 42.6%, 0k, Sức 20 | 24 | 0 | 2.06 | 0.09 | ok (hesitate) |
| j67 | td_song.s1 | 1 | 35 | 100%, 0k, Sức 0 | 40.6%, 0k, Sức 20 | 28 | 0 | 3.03 | 0.11 | ok (hesitate) |
| j67 | td_song.c1 | 1 | 35 | 60%, 0k, Sức 0 | 20.6%, 0k, Sức 20 | 28 | -11.2 | -4.25 | 0.25 | ok (hesitate) |
| j67 | td_song.t1 | 1 | 40 | 60%, 0k, Sức 0 | 20.6%, 0k, Sức 20 | 32 | -12.8 | -3.43 | 0.29 | ok (hesitate) |
| j67 | td_song.x1 | 1 | 30 | 100%, 0k, Sức 0 | 42.6%, 0k, Sức 20 | 24 | 0 | 2.06 | 0.09 | ok (hesitate) |
| j67 | td_tha.c3 | 1 | 20 | 100%, 0k, Sức 0 | 54.6%, 0k, Sức 19 | 16 | 8 | 6.11 | -0.12 | ok (hesitate) |
| j67 | ch_co.s2 | 1 | 30 | 45%, 0k, Sức 0 | 7.6%, 0k, Sức 20 | 24 | -14.12 | -10.83 | 0.14 | ok (hesitate) |
| j67 | ch_benh.s1 | 1 | 40 | 50%, 0k, Sức 0 | 10.6%, 0k, Sức 20 | 32 | -16 | -7.47 | 0.27 | ok (hesitate) |
| j67 | ch_benh.s2 | 1 | 20 | 100%, 0k, Sức 0 | 54.6%, 0k, Sức 19 | 16 | 8 | 6.11 | -0.12 | ok (hesitate) |
| j67 | ch_benh.c1 | 1 | 20 | 45%, 0k, Sức 0 | 19.6%, 0k, Sức 19 | 16 | -8.8 | -6.8 | 0.12 | ok (hesitate) |
| j67 | ch_ho.s2 | 1 | 40 | 100%, 0k, Sức 0 | 40.6%, 0k, Sức 20 | 32 | 0 | 4.66 | 0.15 | ok (hesitate) |
| j67 | ch_ho.c1 | 1 | 35 | 100%, 0k, Sức 0 | 40.6%, 0k, Sức 20 | 28 | 0 | 3.03 | 0.11 | ok (hesitate) |
| j67 | ch_bi.s2 | 1 | 20 | 50%, 0k, Sức 0 | 24.6%, 0k, Sức 19 | 16 | -8 | -5.58 | 0.15 | ok (hesitate) |
| j67 | ch_bi.c3 | 1 | 35 | 35%, 0k, Sức 0 | 5%, 0k, Sức 20 | 28 | -19.07 | -11.2 | 0.28 | ok (hesitate) |
| j67 | ch_bi.t1 | 1 | 20 | 100%, 0k, Sức 0 | 54.6%, 0k, Sức 19 | 16 | 0 | 1.75 | 0.11 | ok (hesitate) |
| j67 | thd_tho.s2 | 1 | 35 | 100%, 0k, Sức 0 | 40.6%, 0k, Sức 20 | 28 | 0 | 3.03 | 0.11 | ok (hesitate) |
| j67 | thd_tho.c1 | 1 | 20 | 45%, 0k, Sức 0 | 19.6%, 0k, Sức 19 | 16 | -22.69 | -27.11 | -0.28 | ok (hesitate) |
| j67 | thd_tho.c2 | 1 | 35 | 50%, 0k, Sức 0 | 10.6%, 0k, Sức 20 | 28 | -30.84 | -38.01 | -0.26 | ok (hesitate) |
| j67 | thd_sach.c2 | 1 | 35 | 100%, 0k, Sức 0 | 40.6%, 0k, Sức 20 | 28 | 0 | 3.03 | 0.11 | ok (hesitate) |
| j67 | thd_sach.c3 | 1 | 15 | 50%, 0k, Sức 0 | 31.6%, 0k, Sức 14 | 12 | -6 | -4.3 | 0.14 | ok (hesitate) |
| j67 | thd_tro.s1 | 1 | 20 | 100%, 0k, Sức 0 | 54.6%, 0k, Sức 19 | 16 | 8 | 6.11 | -0.12 | ok (hesitate) |
| j67 | thd_tro.c1 | 1 | 20 | 100%, 0k, Sức 0 | 54.6%, 0k, Sức 19 | 16 | 0 | 1.75 | 0.11 | ok (hesitate) |
| j67 | thd_tro.c2 | 1 | 35 | 50%, 0k, Sức 0 | 10.6%, 0k, Sức 20 | 28 | -14 | -7.89 | 0.22 | ok (hesitate) |
| j67 | thd_tro.c3 | 1 | 30 | 100%, 0k, Sức 0 | 42.6%, 0k, Sức 20 | 24 | 0 | 2.06 | 0.09 | ok (hesitate) |
| j67 | thd_hoc.t1 | 1 | 20 | 55%, 0k, Sức 0 | 29.6%, 0k, Sức 19 | 16 | -14.78 | -16.22 | -0.09 | ok (hesitate) |
| j67 | cnv_chu.s2 | 1 | 5 | 50%, 0k, Sức 0 | 35.6%, 0k, Sức 6 | 4 | -3 | -6.29 | -0.82 | silver obvious |
| j67 | cnv_chu.x1 | 1 | 5 | 100%, 0k, Sức 0 | 65.6%, 0k, Sức 6 | 4 | 20 | 11.85 | -2.04 | silver obvious |
| j67 | cnv_ban.s1 | 1 | 5 | 50%, 0k, Sức 0 | 35.6%, 0k, Sức 6 | 4 | -2 | -5 | -0.75 | silver obvious |
| j67 | cnv_ban.c1 | 1 | 5 | 100%, 0k, Sức 1 | 65.6%, 0k, Sức 6 | 4 | 19.83 | 11.85 | -2 | silver obvious |
| j67 | cnv_ban.t1 | 1 | 5 | 50%, 0k, Sức 0 | 35.6%, 0k, Sức 6 | 4 | -2 | -5 | -0.75 | silver obvious |
| j67 | cnv_mat.c1 | 1 | 5 | 55%, 0k, Sức 0 | 40.6%, 0k, Sức 6 | 4 | -2.7 | -5.57 | -0.72 | silver obvious |
| j67 | cnv_mat.t1 | 1 | 5 | 40%, 0k, Sức 0 | 25.6%, 0k, Sức 6 | 4 | -4.4 | -8.72 | -1.08 | silver obvious |
| j67 | cnv_ma.c1 | 1 | 5 | 100%, 0k, Sức 0 | 65.6%, 0k, Sức 6 | 4 | 0 | -1.27 | -0.32 | silver obvious |
| j67 | cnv_ma.c2 | 1 | 5 | 100%, 0k, Sức 0 | 65.6%, 0k, Sức 6 | 4 | 20 | 11.85 | -2.04 | silver obvious |
| j67 | cnv_ma.x1 | 1 | 5 | 45%, 0k, Sức 0 | 30.6%, 0k, Sức 6 | 4 | -2.2 | -5.62 | -0.86 | silver obvious |
| j67 | s_than.s1 | 1 | 15 | 100%, 0k, Sức 0 | 61.6%, 0k, Sức 14 | 12 | 4 | 4.29 | 0.02 | ok (hesitate) |
| j67 | s_than.s2 | 1 | 15 | 100%, 0k, Sức 0 | 61.6%, 0k, Sức 14 | 12 | 0 | 1.82 | 0.15 | ok (hesitate) |
| j67 | s_than.c1 | 1 | 15 | 45%, 0k, Sức 0 | 26.6%, 0k, Sức 14 | 12 | -13.55 | -14.59 | -0.09 | ok (hesitate) |
| j67 | s_than.c3 | 1 | 20 | 50%, 0k, Sức 0 | 24.6%, 0k, Sức 19 | 16 | -10.32 | -13.14 | -0.18 | ok (hesitate) |
| j67 | s_than.x1 | 1 | 30 | 100%, 0k, Sức 0 | 42.6%, 0k, Sức 20 | 24 | 0 | 2.06 | 0.09 | ok (hesitate) |
| j67 | s_thu.s2 | 1 | 15 | 100%, 0k, Sức 0 | 61.6%, 0k, Sức 14 | 12 | 0 | 1.82 | 0.15 | ok (hesitate) |
| j67 | s_thu.c1 | 1 | 20 | 55%, 0k, Sức 0 | 29.6%, 0k, Sức 19 | 16 | -7.2 | -4.36 | 0.18 | ok (hesitate) |
| j67 | s_thu.c3 | 1 | 20 | 100%, 0k, Sức 0 | 54.6%, 0k, Sức 19 | 16 | 0 | 1.75 | 0.11 | ok (hesitate) |
| j67 | s_hoa.s2 | 1 | 15 | 100%, 0k, Sức 0 | 61.6%, 0k, Sức 14 | 12 | 0 | 1.82 | 0.15 | ok (hesitate) |
| j67 | s_hoa.c3 | 1 | 35 | 100%, 0k, Sức 0 | 40.6%, 0k, Sức 20 | 28 | 0.84 | 3.37 | 0.09 | ok (hesitate) |
| j67 | s_su.c3 | 1 | 15 | 60%, 0k, Sức 0 | 41.6%, 0k, Sức 14 | 12 | -4.8 | -2.26 | 0.21 | ok (hesitate) |
| j67 | s_su.x1 | 1 | 20 | 46.166666666666664%, 0k, Sức 0 | 20.766666666666666%, 0k, Sức 19 | 16 | -8.61 | -6.52 | 0.13 | ok (hesitate) |
| j67 | s_dich.s1 | 1 | 20 | 100%, 0k, Sức 0 | 54.6%, 0k, Sức 19 | 16 | 0 | 1.75 | 0.11 | ok (hesitate) |
| j67 | s_dich.c1 | 1 | 30 | 55%, 0k, Sức 0 | 17.6%, 0k, Sức 20 | 24 | -6.4 | -4.64 | 0.07 | ok (hesitate) |
| j67 | s_dich.c2 | 1 | 15 | 100%, 0k, Sức 0 | 61.6%, 0k, Sức 14 | 12 | 0.63 | 2.21 | 0.13 | ok (hesitate) |
| j67 | s_dich.t1 | 1 | 35 | 100%, 0k, Sức 0 | 40.6%, 0k, Sức 20 | 28 | 0 | 3.03 | 0.11 | ok (hesitate) |
| j67 | s_tinh.c3 | 1 | 35 | 100%, 0k, Sức 0 | 40.6%, 0k, Sức 20 | 28 | 0 | 3.03 | 0.11 | ok (hesitate) |
| j67 | s_tinh.t1 | 1 | 30 | 60%, 0k, Sức 0 | 22.6%, 0k, Sức 20 | 24 | -16.34 | -17.46 | -0.05 | ok (hesitate) |
| j67 | s_thay.s2 | 1 | 15 | 100%, 0k, Sức 0 | 61.6%, 0k, Sức 14 | 12 | 0 | 1.82 | 0.15 | ok (hesitate) |
| j67 | s_thay.t1 | 1 | 15 | 45%, 0k, Sức 0 | 26.6%, 0k, Sức 14 | 12 | -6.6 | -5.32 | 0.11 | ok (hesitate) |
| j67 | s_ban.c2 | 1 | 20 | 50%, 0k, Sức 0 | 24.6%, 0k, Sức 19 | 16 | -8 | -5.58 | 0.15 | ok (hesitate) |
| j67 | s_ban.x1 | 1 | 20 | 100%, 0k, Sức 0 | 54.6%, 0k, Sức 19 | 16 | 0 | 1.75 | 0.11 | ok (hesitate) |
| j67 | st_the.s1 | 1 | 20 | 55%, 0k, Sức 0 | 29.6%, 0k, Sức 19 | 16 | -7.2 | -4.36 | 0.18 | ok (hesitate) |
| j67 | st_the.s2 | 1 | 30 | 100%, 0k, Sức 0 | 42.6%, 0k, Sức 20 | 24 | 0 | 2.06 | 0.09 | ok (hesitate) |
| j67 | st_the.c1 | 1 | 30 | 55%, 0k, Sức 0 | 17.6%, 0k, Sức 20 | 24 | -10.8 | -6.05 | 0.2 | ok (hesitate) |
| j67 | st_the.c3 | 1 | 15 | 100%, 0k, Sức 0 | 61.6%, 0k, Sức 14 | 12 | 2.63 | 3.45 | 0.07 | ok (hesitate) |
| j67 | st_the.x1 | 1 | 30 | 35%, 0k, Sức 0 | 5%, 0k, Sức 20 | 24 | -15.6 | -10.13 | 0.23 | ok (hesitate) |
| j67 | st_con.s1 | 1 | 20 | 100%, 0k, Sức 0 | 54.6%, 0k, Sức 19 | 16 | 0 | 1.75 | 0.11 | ok (hesitate) |
| j67 | st_con.s2 | 1 | 20 | 65%, 0k, Sức 6 | 39.6%, 0k, Sức 19 | 16 | -6.6 | -1.92 | 0.29 | ok (hesitate) |
| j67 | st_con.c1 | 1 | 20 | 100%, 0k, Sức 0 | 54.6%, 0k, Sức 19 | 16 | 0 | 1.75 | 0.11 | ok (hesitate) |
| j67 | st_con.t1 | 1 | 20 | 40%, 0k, Sức 0 | 14.6%, 0k, Sức 19 | 16 | -9.6 | -8.02 | 0.1 | ok (hesitate) |
| j67 | st_dong.c2 | 1 | 35 | 100%, 0k, Sức 0 | 40.6%, 0k, Sức 20 | 28 | 0 | 3.03 | 0.11 | ok (hesitate) |
| j67 | st_dong.c3 | 1 | 35 | 55%, 0k, Sức 0 | 15.6%, 0k, Sức 20 | 28 | -12.6 | -6.07 | 0.23 | ok (hesitate) |
| j67 | st_dong.t1 | 1 | 20 | 45%, 0k, Sức 0 | 19.6%, 0k, Sức 19 | 16 | -8.8 | -6.8 | 0.12 | ok (hesitate) |
| j67 | tm96a.a1 | 1 | 5 | 100%, 0k, Sức 0 | 65.6%, 0k, Sức 6 | 4 | 20 | 11.85 | -2.04 | silver obvious |
| j67 | tm96a.a2 | 1 | 5 | 100%, 0k, Sức 0 | 65.6%, 0k, Sức 6 | 4 | 0 | -1.27 | -0.32 | silver obvious |
| j67 | tm96a.a3 | 1 | 5 | 100%, 0k, Sức 0 | 65.6%, 0k, Sức 6 | 4 | 20 | 11.85 | -2.04 | silver obvious |
| j67 | tm96a.a5 | 1 | 15 | 100%, 0k, Sức 0 | 61.6%, 0k, Sức 14 | 12 | 0 | 1.82 | 0.15 | ok (hesitate) |
| j67 | tm96a.a6 | 1 | 5 | 100%, 0k, Sức 0 | 65.6%, 0k, Sức 6 | 4 | 0 | -1.27 | -0.32 | silver obvious |
| j67 | tm96b.b1l | 1 | 55 | 100%, 0k, Sức 0 | 40.6%, 0k, Sức 20 | 44 | 0 | 9.53 | 0.22 | ok (hesitate) |
| j67 | tm96b.b2a | 1 | 15 | 100%, 0k, Sức 0 | 61.6%, 0k, Sức 14 | 12 | 4 | 4.29 | 0.02 | ok (hesitate) |
| j67 | tm96b.b3a | 1 | 40 | 45%, 0k, Sức 0 | 5.6%, 0k, Sức 20 | 32 | -17.6 | -9.49 | 0.25 | ok (hesitate) |
| j67 | tm96b.b3b | 1 | 35 | 100%, 0k, Sức 0 | 40.6%, 0k, Sức 20 | 28 | 0 | 3.03 | 0.11 | ok (hesitate) |
| j67 | tm96c.c1o | 1 | 40 | 100%, 0k, Sức 0 | 40.6%, 0k, Sức 20 | 32 | 0 | 4.66 | 0.15 | ok (hesitate) |
| j67 | tm96c.c2 | 1 | 40 | 50.25%, 0k, Sức 0 | 10.85%, 0k, Sức 20 | 32 | -24.3 | -22.38 | 0.06 | ok (hesitate) |
| j67 | tm96c.c4b | 1 | 55 | 45%, 0k, Sức 0 | 5.6%, 0k, Sức 20 | 44 | -24.2 | -8.82 | 0.35 | other road obvious |
| j67 | tm96c.c5 | 1 | 105 | 35%, 0k, Sức 0 | 5%, 0k, Sức 20 | 84 | -54.6 | -7.13 | 0.57 | other road obvious |
| j72 | th_thuoc#1 | 1 | 40 | 75%, 1k, Sức 0 | 45%, 1k, Sức 0 | 32 | -9 | 13.4 | 0.7 | other road obvious |
| j72 | rv_thuoc#1 | 1 | 15 | 75%, 1k, Sức 0 | 65%, 5k, Sức 7 | 12 | -4 | 1.63 | 0.47 | other road obvious |
| j72 | rv_tham_om#1 | 1 | 10 | 80%, 1k, Sức 0 | 70%, 4k, Sức 6 | 8 | -2.6 | 0.6 | 0.4 | other road obvious |
| j72 | thuoc_cam#1 | 1 | 15 | 100%, 1k, Sức 0 | 90%, 5k, Sức 7 | 12 | -1 | 4.63 | 0.47 | other road obvious |
| j72 | rv_con_om#1 | 1 | 15 | 85%, 1k, Sức 0 | 75%, 5k, Sức 7 | 12 | -2.8 | 2.83 | 0.47 | other road obvious |
| j72 | bo_chung#2 | 1 | 30 | 100%, 1k, Sức 0 | 50%, 1k, Sức 0 | 24 | -1 | 11 | 0.5 | other road obvious |
| j72 | loi_thoi#2 | 1 | 10 | 65%, 1k, Sức 0 | 55%, 4k, Sức 6 | 8 | -3.8 | -0.6 | 0.4 | other road obvious |
| j72 | bac_mat#2 | 1 | 20 | 100%, 1k, Sức 0 | 100%, 1k, Sức 0 | 16 | -1 | 15 | 1 | other road obvious |
| j72 | chuoc_sv#1 | 1 | 30 | 100%, 1k, Sức 0 | 81%, 8k, Sức 14 | 24 | -1 | 9.11 | 0.42 | other road obvious |
| j72 | qua_tet#1 | 1 | 20 | 55%, 1k, Sức 0 | 42%, 6k, Sức 10 | 16 | -8.2 | -0.95 | 0.45 | other road obvious |
| j72 | ao_bien#1 | 1 | 30 | 55%, 2k, Sức 0 | 36%, 9k, Sức 14 | 24 | -12.8 | -2.69 | 0.42 | other road obvious |
| j72 | tham_o#1 | 1 | 20 | 40%, 2k, Sức 0 | 27%, 7k, Sức 10 | 16 | -11.6 | -4.35 | 0.45 | other road obvious |
| j72 | vay_bac#1 | 1 | 66 | 100%, 1k, Sức 0 | 60%, 15k, Sức 20 | 52.8 | -1 | 13.35 | 0.27 | ok (hesitate) |
| j72 | rv_ngheo#1 | 1 | 30 | 100%, 1k, Sức 0 | 81%, 8k, Sức 14 | 24 | -1 | 9.11 | 0.42 | other road obvious |
| j72 | rv_huong#1 | 1 | 10 | 50%, 2k, Sức 0 | 40%, 5k, Sức 6 | 8 | -6 | -2.8 | 0.4 | other road obvious |
| j72 | canh_thai#1 | 1 | 15 | 55%, 1k, Sức 0 | 45%, 5k, Sức 7 | 12 | -6.4 | -0.77 | 0.47 | other road obvious |
| j72 | lc_ao#1 | 1 | 15 | 100%, 1k, Sức 0 | 90%, 5k, Sức 7 | 12 | -1 | 4.63 | 0.47 | other road obvious |
| j72 | maid_vay#1 | 1 | 30 | 100%, 1k, Sức 0 | 81%, 8k, Sức 14 | 24 | -1 | 9.11 | 0.42 | other road obvious |
| j72 | sv_luong#1 | 1 | 15 | 100%, 1k, Sức 0 | 50%, 1k, Sức 0 | 12 | -1 | 5 | 0.5 | other road obvious |
| j72 | dt_che#1 | 1 | 20 | 100%, 1k, Sức 0 | 100%, 1k, Sức 0 | 16 | -1 | 15 | 1 | other road obvious |
| j72 | xc_uoc#1 | 1 | 20 | 55%, 1k, Sức 0 | 42%, 6k, Sức 10 | 16 | -8.2 | -0.95 | 0.45 | other road obvious |
| j72 | xc_hoimon#1 | 1 | 30 | 100%, 1k, Sức 0 | 60%, 2k, Sức 0 | 24 | -1 | 12.4 | 0.56 | other road obvious |
| j72 | dong_tam#1 | 1 | 8 | 100%, 1k, Sức 0 | 90%, 4k, Sức 6 | 6.4 | -1 | 0.76 | 0.28 | ok (hesitate) |
| j72 | giau_cn#2 | 1 | 20 | 55%, 1k, Sức 0 | 60%, 1k, Sức 0 | 16 | -8.2 | 8.6 | 1.05 | other road obvious |
| j72 | th_trungcuu#2 | 1 | 10 | 55%, 1k, Sức 0 | 45%, 4k, Sức 6 | 8 | -4.6 | -1.4 | 0.4 | other road obvious |
| j72 | hh_trungthu#2 | 1 | 40 | 100%, 1k, Sức 0 | 55%, 1k, Sức 0 | 32 | -1 | 16.6 | 0.55 | other road obvious |
| j72 | hh_trungcuu#2 | 1 | 30 | 100%, 1k, Sức 0 | 45%, 1k, Sức 0 | 24 | -1 | 9.8 | 0.45 | other road obvious |
| j72 | hh_doanngo#1 | 1 | 10 | 65%, 2k, Sức 0 | 55%, 5k, Sức 6 | 8 | -4.8 | -1.6 | 0.4 | other road obvious |
| j72 | th_aodong#1 | 1 | 20 | 65%, 2k, Sức 0 | 52%, 7k, Sức 10 | 16 | -7.6 | -0.35 | 0.45 | other road obvious |
| j72 | tv_mua#1 | 1 | 15 | 65%, 1k, Sức 0 | 55%, 5k, Sức 7 | 12 | -5.2 | 0.43 | 0.47 | other road obvious |
| j72 | maid_tet#1 | 1 | 10 | 100%, 1k, Sức 0 | 90%, 4k, Sức 6 | 8 | -1 | 2.2 | 0.4 | other road obvious |
| j72 | fam_muoi#1 | 1 | 20 | 50%, 1k, Sức 0 | 37%, 6k, Sức 10 | 16 | -9 | -1.75 | 0.45 | other road obvious |
| j72 | fam_cn#1 | 1 | 15 | 55%, 1k, Sức 0 | 45%, 5k, Sức 7 | 12 | -6.4 | -0.77 | 0.47 | other road obvious |
| j72 | fam_td#1 | 1 | 40 | 100%, 1k, Sức 0 | 74%, 10k, Sức 19 | 32 | -1 | 10.51 | 0.36 | other road obvious |
| jecon | Dò la ↔ Tự đi dò la | 1 | 17 | 32%, 2k, Sức 0 | 19%, 2k, Sức 0 | 13.6 | -13.06 | -8.4 | 0.34 | other road obvious |
| jecon | Mua chuộc ↔ Sai cung nữ lấy lòng | 1 | 44 | 5%, 2k, Sức 0 | 5%, 2k, Sức 0, +8.3k | 35.2 | -38.29 | -11.42 | 0.76 | other road obvious |
| jecon | Rút thẻ bài ↔ Nhờ ơn người quen | 1 | 44 | 34%, 2k, Sức 0 | 34%, 2k, Sức 0, +10.0k | 35.2 | -25.23 | -0.03 | 0.72 | other road obvious |
| jrest | Nghỉ ngơi dưỡng sức ↔ Nghỉ ngơi một lát ×N | 1 | 6 | 100%, 2k, Sức 0 | 100%, 4k, Sức 0 | 4.8 | -2 | 0.8 | 0.58 | other road obvious |
| jecon | Chu toàn lễ nghĩa ↔ Bớt lễ nghĩa | 1 | 4 | 100%, 0k, Sức 0 | 100%, 0k, Sức 0, +4.2k | 3.2 | 0 | -1.01 | -0.32 | silver obvious |
| j68 | giftArrive · Nhận, đáp lễ hậu hĩnh | 1 | 20 | 100%, 0k, Sức 0 | 100%, 0k, Sức 0 | 16 | -9.12 | 6 | 0.95 | other road obvious |
| j68 | strayCat · Giữ lại nuôi | 1 | 5 | 100%, 0k, Sức 0 | 60%, 0k, Sức 3 | 4 | 1.5 | 2.49 | 0.25 | ok (hesitate) |
| j68 | leakRoof · Bỏ bạc thuê thợ ngay | 1 | 30 | 100%, 0k, Sức 0 | 100%, 0k, Sức 6 | 24 | -19.12 | 8.67 | 1.16 | other road obvious |
| j68 | letterHome · Gửi bạc về nhà | 1 | 30 | 100%, 0k, Sức 0 | 100%, 0k, Sức 2 | 24 | 3 | 9.67 | 0.28 | ok (hesitate) |
| j68 | eunuchSqueeze · Đưa bạc cho xong | 1 | 15 | 100%, 0k, Sức 0 | 54%, 0k, Sức 0 | 12 | -8.67 | -0.61 | 0.67 | other road obvious |
| j68 | embroidery · Thuê thợ thêu ngoài cung | 1 | 35 | 100%, 0k, Sức 0 | 63%, 0k, Sức 10 | 28 | -22.58 | 6.14 | 1.03 | other road obvious |
| j68 | flowerBloom · Mời các phi tần ngắm hoa | 1 | 15 | 100%, 0k, Sức 0 | 34%, 0k, Sức 0 | 12 | -6.58 | 0.68 | 0.61 | other road obvious |
| j68 | proudVisit · Nhún nhường tiếp đãi | 1 | 10 | 100%, 0k, Sức 0 | 100%, 0k, Sức 0 | 8 | 6.67 | -0.83 | -0.94 | silver obvious |
| j68 | thMama · Biếu ma ma chút quà | 1 | 15 | 100%, 0k, Sức 0 | 100%, 0k, Sức 0, +3.0k | 12 | -10.67 | 5 | 1.31 | other road obvious |
| j68 | docCheck · Để thái y kê thuốc bổ | 1 | 20 | 100%, 0k, Sức 0 | 100%, 0k, Sức 0, +3.0k | 16 | -14.33 | 1 | 0.96 | other road obvious |
| j68 | docCheck · Hỏi thăm dò chuyện các cung | 1 | 10 | 41%, 0k, Sức 0 | 100%, 0k, Sức 0, +3.0k | 8 | -10.2 | 1 | 1.4 | other road obvious |
| j68 | painter · Bỏ bạc nhờ vẽ cho đẹp | 1 | 30 | 100%, 0k, Sức 0 | 69%, 0k, Sức 4 | 24 | -17 | 5.44 | 0.94 | other road obvious |
| j68 | musician · Học một khúc mới | 1 | 10 | 100%, 0k, Sức 6 | 100%, 0k, Sức 0, +3.0k | 8 | -10 | 5 | 1.88 | other road obvious |
| j68 | musician · Nhờ phổ nhạc bài thơ dâng Hoàng thượng | 1 | 20 | 49%, 0k, Sức 0 | 100%, 0k, Sức 0, +3.0k | 16 | -11.73 | 5 | 1.05 | other road obvious |
| j68 | newGirlAdvice · Nhận làm người dưới trướng | 1 | 15 | 100%, 0k, Sức 0 | 100%, 0k, Sức 4 | 12 | -5.79 | 19.33 | 2.09 | other road obvious |
| j68 | heatStroke · Xin đá lạnh hầm băng | 1 | 20 | 100%, 0k, Sức 0 | 38%, 0k, Sức 8 | 16 | -14.67 | 2.47 | 1.07 | other road obvious |
| j68 | snowDay · Phát áo bông cho cung nhân | 1 | 25 | 100%, 0k, Sức 0 | 100%, 0k, Sức 10 | 20 | -1.33 | 8 | 0.47 | other road obvious |
| j68 | springAllergy · Mời Trương Minh Viễn kê thuốc | 1 | 15 | 100%, 0k, Sức 0 | 100%, 0k, Sức 0, +3.0k | 12 | -11 | 1 | 1 | other road obvious |
| j68 | stormNight · Thắp hương cầu an cho cung | 1 | 10 | 100%, 0k, Sức 0 | 34%, 0k, Sức 6 | 8 | 9.33 | -2.59 | -1.49 | silver obvious |
| j68 | stormNight · Cứu người, cho thuốc men | 1 | 15 | 100%, 0k, Sức 4 | 34%, 0k, Sức 6 | 12 | 15.54 | -2.59 | -1.51 | silver obvious |
| j68 | famineDonate · Quyên nhiều bạc | 1 | 60 | 100%, 0k, Sức 0 | 100%, 0k, Sức 6 | 48 | -10.16 | 16 | 0.54 | other road obvious |
| j68 | famineDonate · Góp chút ít cho phải lễ | 1 | 10 | 100%, 0k, Sức 0 | 100%, 0k, Sức 6 | 8 | -6.79 | 16 | 2.85 | other road obvious |
| j68 | borderNews · Thêu cờ, may áo gửi quân | 1 | 15 | 100%, 0k, Sức 10 | 100%, 0k, Sức 0, +3.0k | 12 | 6.96 | 5 | -0.16 | ok (hesitate) |
| j68 | rumorPreg · Cho người dò cho chắc | 1 | 15 | 45%, 0k, Sức 0 | 100%, 0k, Sức 0, +3.0k | 12 | -13.72 | 5 | 1.56 | other road obvious |
| j68 | rumorPreg · Sang chúc mừng thăm dò | 1 | 10 | 46%, 0k, Sức 0 | 100%, 0k, Sức 0, +3.0k | 8 | -8.68 | 5 | 1.71 | other road obvious |
| j68 | rumorEmpLove · Hỏi thái giám Kính sự phòng | 1 | 15 | 50%, 0k, Sức 0 | 41%, 0k, Sức 0, +3.0k | 12 | -13 | -19.61 | -0.55 | silver obvious |
| j68 | rumorEmpLove · Sang thân thiết với nàng | 1 | 10 | 100%, 0k, Sức 0 | 41%, 0k, Sức 0, +3.0k | 8 | -9 | -19.61 | -1.33 | silver obvious |
| j68 | silkAllot · Bỏ bạc may thêm cho cả hai | 1 | 30 | 100%, 0k, Sức 0 | 100%, 0k, Sức 0, +3.0k | 24 | -17.79 | 16.33 | 1.42 | other road obvious |
| j68 | templeRite · Cúng dầu đèn hậu hĩnh | 1 | 25 | 100%, 0k, Sức 0 | 100%, 0k, Sức 8 | 20 | -2.67 | 8.67 | 0.57 | other road obvious |
| j68 | fortuneNun · Bỏ bạc xin xem một quẻ | 1 | 15 | 100%, 0k, Sức 0 | 39%, 0k, Sức 0 | 12 | -11.5 | 5.24 | 1.39 | other road obvious |
| j68 | fortuneNun · Treo bùa cho cung nhân yên tâm | 1 | 10 | 100%, 0k, Sức 0 | 39%, 0k, Sức 0 | 8 | -6.33 | 5.24 | 1.45 | other road obvious |
| j68 | rumorTH · Hỏi ma ma thân tín của Thái hậu | 1 | 15 | 50%, 0k, Sức 0 | 100%, 0k, Sức 0, +3.0k | 12 | -13 | 5 | 1.5 | other road obvious |
| j68 | rumorFavor · Mua tin Kính sự phòng | 1 | 20 | 55%, 0k, Sức 0 | 100%, 0k, Sức 0, +3.0k | 16 | -16.4 | 5 | 1.34 | other road obvious |
| j68 | lotusSeason · Cùng làm, dâng lên | 1 | 10 | 100%, 0k, Sức 6 | 100%, 0k, Sức 5 | 8 | -2.33 | 3.5 | 0.73 | other road obvious |
| j68 | droughtPrayer · Lén mua nước sạch ngoài cung | 1 | 20 | 100%, 0k, Sức 0 | 100%, 0k, Sức 10 | 16 | -18.33 | 26.33 | 2.79 | other road obvious |
| act | deck · Hối lộ Kính sự phòng | 1 | 30 | 95%, 2k, Sức 0 | — |  |  |  |  | UNPRICED (gain only in words: 2 tuần tới dễ được lật thẻ: khả năng thấp → dễ hơn một bậc) |
| act | deck · Nghỉ ngơi dưỡng sức [suc] | 1 | 6 | 95%, 4k, Sức 0 | 95%, 1k, Sức 0 | 4.8 | 0.432 | 2.217 | 4.13 | other road obvious |
| act | deck · Cầu tự ở Phụng Tiên điện | 1 | 10 | 50%, 2k, Sức 0 | — |  |  |  |  | UNPRICED (gain only in words: 2 tháng dễ có thai hơn (nay khả năng rất thấp)) |
| act | deck · Cài tai mắt | 1 | 25 | 80%, 2k, Sức 0 | — |  |  |  |  | NO ACT WITHOUT SILVER for mat |
| act | deck · Tụng kinh, làm việc thiện | 1 | 10 | 95%, 2k, Sức 0 | — |  |  |  |  | NO ACT WITHOUT SILVER for duc |
| act | deck · Phát chẩn cho cung nhân [danh] | 1 | 40 | 85%, 2k, Sức 0 | 75%, 2k, Sức 5 | 32 | 1.387 | 4.772 | 2.44 | other road obvious |
| act | deck · Múa trong yến tiệc [sung] | 1 | 10 | 68%, 4k, Sức 20 | 51%, 2k, Sức 10 | 8 | 1.883 | 2.538 | 0.35 | other road obvious |
| act | deck · Dưỡng nhan | 1 | 30 | 92%, 2k, Sức 0 | — |  |  |  |  | NO ACT WITHOUT SILVER for sac |
| act | deck · Tự học Nấu nướng: nấu món | 1 | 6 | 95%, 2k, Sức 15 | — |  |  |  |  | UNPRICED (gain only in words: tiến bộ Nấu nướng +1..2 · tự tay chơi thì ra Canh rau dền tô) |
| act | talk:emp · Dâng một cành hoa [sung] | 1 | 5 | 50%, 2k, Sức 0 | 51%, 2k, Sức 10 | 4 | 0.667 | 2.538 | 2.81 | other road obvious |
| act | talk:ty · Bài thuốc dễ thụ thai | 1 | 40 | 95%, 2k, Sức 0 | — |  |  |  |  | UNPRICED (gain only in words: 3 tháng dễ có thai hơn) |
| act | talk:ty · Mời làm thái y tâm phúc | 1 | 50 | 95%, 2k, Sức 0 | — |  |  |  |  | UNPRICED (gain only in words: dễ phát hiện xạ hương, độc; bệnh của con nhẹ hơn) |
| act | talk:ty · Học hỏi y lý | 1 | 10 | 95%, 2k, Sức 0 | — |  |  |  |  | NO ACT WITHOUT SILVER for art |
| act | talk:ksp · Đút lót lật thẻ | 1 | 30 | 95%, 2k, Sức 0 | — |  |  |  |  | UNPRICED (gain only in words: 2 tuần tới dễ được lật thẻ: khả năng thấp → dễ hơn một bậc) |
| act | talk:ksp · Hỏi sở thích Hoàng thượng | 1 | 15 | 80%, 2k, Sức 0 | — |  |  |  |  | UNPRICED (gain only in words: biết thêm một điều ngài thích) |
| act | talk:peddler · Mua Nghiên mực Đoan Khê | 1 | 60 | 95%, 2k, Sức 0 | — |  |  |  |  | UNPRICED (gain only in words: Tặng Hoàng thượng: hợp ý) |
| act | talk:peddler · Mua Thuốc giải độc | 1 | 60 | 95%, 2k, Sức 0 | — |  |  |  |  | UNPRICED (gain only in words: Để trong rương: cứu một lần trúng độc) |
| act | talk:peddler · Mua Đệm gấm | 1 | 12 | 95%, 2k, Sức 0 | — |  |  |  |  | UNPRICED (gain only in words: Tặng: êm ấm, ai cũng nhận) |
| act | talk:peddler · Mua Gấm Tô Châu [danh] | 1 | 120 | 95%, 2k, Sức 0 | 75%, 2k, Sức 5 | 96 | 0.138 | 4.772 | 33.64 | other road obvious |
| act | talk:peddler · Mua Thuốc an thai | 1 | 15 | 95%, 2k, Sức 0 | — |  |  |  |  | UNPRICED (gain only in words: Dùng khi có thai: nguy cơ sảy giảm nửa) |
| act | talk:peddler · Mua Lụa Hàng Châu | 1 | 30 | 95%, 2k, Sức 0 | — |  |  |  |  | NO ACT WITHOUT SILVER for sac |
| act | talk:fallen · Đưa cơm áo | 1 | 20 | 95%, 2k, Sức 0 | — |  |  |  |  | NO ACT WITHOUT SILVER for duc |
| act | talk:rival · Giúp đỡ nàng | 1 | 20 | 95%, 2k, Sức 0 | — |  |  |  |  | NO ACT WITHOUT SILVER for rel |
| act | talk:rival · Dò la | 1 | 22 | 29%, spyk, Sức 0 | — |  |  |  |  | UNPRICED (gain only in words: Bạc -29) |
| act | talk:rival · Bỏ độc vào trà nàng | 1 | 29 | 5%, poisonk, Sức 0 | — |  |  |  |  | UNPRICED (gain only in words: lộ: tội chết — năm đầu được tha một lần: giáng một bậc, cấm ) |
| j67 | tt_co.s2 | 3 | 35 | 51.333333333333336%, 0k, Sức 0 | 29.933333333333337%, 0k, Sức 17 | 14 | -12.96 | -13.39 | -0.03 | ok (hesitate) |
| j67 | tt_co.c2 | 3 | 55 | 100%, 0k, Sức 0 | 45.6%, 0k, Sức 20 | 22 | 0 | 2.12 | 0.1 | ok (hesitate) |
| j67 | tt_co.t1 | 3 | 25 | 100%, 0k, Sức 0 | 64.6%, 0k, Sức 12 | 10 | 0 | 1.48 | 0.15 | ok (hesitate) |
| j67 | tt_co.x1 | 3 | 35 | 100%, 0k, Sức 0 | 58.6%, 0k, Sức 17 | 14 | 26 | 17.12 | -0.63 | silver obvious |
| j67 | tt_oan.s1 | 3 | 35 | 100%, 0k, Sức 0 | 58.6%, 0k, Sức 17 | 14 | 0 | 1.88 | 0.13 | ok (hesitate) |
| j67 | tt_oan.s2 | 3 | 45 | 100%, 0k, Sức 0 | 51.6%, 0k, Sức 20 | 18 | 6 | 4.97 | -0.06 | ok (hesitate) |
| j67 | tt_oan.c1 | 3 | 55 | 100%, 0k, Sức 0 | 45.6%, 0k, Sức 20 | 22 | 0 | 2.12 | 0.1 | ok (hesitate) |
| j67 | tt_oan.c2 | 3 | 35 | 55%, 0k, Sức 0 | 33.6%, 0k, Sức 17 | 14 | -6.3 | -3.72 | 0.18 | ok (hesitate) |
| j67 | tt_tranh.s1 | 3 | 35 | 44.75%, 0k, Sức 0 | 23.35%, 0k, Sức 17 | 14 | -7.73 | -6.02 | 0.12 | ok (hesitate) |
| j67 | tt_tranh.s2 | 3 | 25 | 100%, 0k, Sức 0 | 64.6%, 0k, Sức 12 | 10 | 0 | 1.48 | 0.15 | ok (hesitate) |
| j67 | tt_tranh.c1 | 3 | 20 | 100%, 0k, Sức 0 | 65.6%, 0k, Sức 10 | 8 | 16 | 11.18 | -0.6 | silver obvious |
| j67 | tt_tranh.c3 | 3 | 45 | 100%, 0k, Sức 0 | 51.6%, 0k, Sức 20 | 18 | 0 | 1.88 | 0.1 | ok (hesitate) |
| j67 | tt_tranh.t1 | 3 | 55 | 100%, 0k, Sức 0 | 45.6%, 0k, Sức 20 | 22 | 0 | 2.12 | 0.1 | ok (hesitate) |
| j67 | tt_mat.s1 | 3 | 25 | 45%, 0k, Sức 0 | 29.6%, 0k, Sức 12 | 10 | -5.5 | -4.97 | 0.05 | ok (hesitate) |
| j67 | tt_mat.s2 | 3 | 25 | 100%, 0k, Sức 0 | 64.6%, 0k, Sức 12 | 10 | 0 | 1.48 | 0.15 | ok (hesitate) |
| j67 | tt_mat.c3 | 3 | 35 | 100%, 0k, Sức 0 | 58.6%, 0k, Sức 17 | 14 | 0 | 1.88 | 0.13 | ok (hesitate) |
| j67 | dtq_bien.s1 | 3 | 55 | 100%, 0k, Sức 0 | 45.6%, 0k, Sức 20 | 22 | 0 | 2.12 | 0.1 | ok (hesitate) |
| j67 | dtq_bien.s2 | 3 | 45 | 100%, 0k, Sức 2 | 51.6%, 0k, Sức 20 | 18 | -0.33 | 1.88 | 0.12 | ok (hesitate) |
| j67 | dtq_bien.c1 | 3 | 25 | 35%, 0k, Sức 1 | 19.6%, 0k, Sức 12 | 10 | -6.67 | -6.81 | -0.01 | ok (hesitate) |
| j67 | dtq_bien.c2 | 3 | 25 | 100%, 0k, Sức 0 | 64.6%, 0k, Sức 12 | 10 | 0 | 1.48 | 0.15 | ok (hesitate) |
| j67 | dtq_bien.t1 | 3 | 55 | 100%, 0k, Sức 0 | 45.6%, 0k, Sức 20 | 22 | 0 | 2.12 | 0.1 | ok (hesitate) |
| j67 | dtq_vu.s2 | 3 | 45 | 100%, 0k, Sức 0 | 51.6%, 0k, Sức 20 | 18 | 0 | 1.88 | 0.1 | ok (hesitate) |
| j67 | dtq_vu.c1 | 3 | 35 | 40%, 0k, Sức 1 | 18.6%, 0k, Sức 17 | 14 | -8.57 | -7.08 | 0.11 | ok (hesitate) |
| j67 | dtq_vu.c2 | 3 | 20 | 100%, 0k, Sức 0 | 65.6%, 0k, Sức 10 | 8 | 0 | 0.68 | 0.09 | ok (hesitate) |
| j67 | dtq_binh.s2 | 3 | 25 | 40%, 0k, Sức 0 | 24.6%, 0k, Sức 12 | 10 | -6 | -5.89 | 0.01 | ok (hesitate) |
| j67 | dtq_binh.c1 | 3 | 35 | 100%, 0k, Sức 0 | 58.6%, 0k, Sức 17 | 14 | 0 | 1.88 | 0.13 | ok (hesitate) |
| j67 | dtq_binh.c2 | 3 | 25 | 41.666666666666664%, 0k, Sức 0 | 26.266666666666666%, 0k, Sức 12 | 10 | -6.81 | -6.81 | 0 | ok (hesitate) |
| j67 | dtq_huynh.s1 | 3 | 55 | 100%, 0k, Sức 0 | 45.6%, 0k, Sức 20 | 22 | 0 | 2.12 | 0.1 | ok (hesitate) |
| j67 | dtq_huynh.s2 | 3 | 25 | 100%, 0k, Sức 0 | 64.6%, 0k, Sức 12 | 10 | 0 | 1.48 | 0.15 | ok (hesitate) |
| j67 | dtq_huynh.c1 | 3 | 35 | 100%, 0k, Sức 0 | 58.6%, 0k, Sức 17 | 14 | 0 | 1.88 | 0.13 | ok (hesitate) |
| j67 | dtq_huynh.c2 | 3 | 20 | 100%, 0k, Sức 0 | 65.6%, 0k, Sức 10 | 8 | 0 | 0.68 | 0.09 | ok (hesitate) |
| j67 | dtq_huynh.t1 | 3 | 55 | 45%, 0k, Sức 0 | 10.6%, 0k, Sức 20 | 22 | -12.1 | -8.53 | 0.16 | ok (hesitate) |
| j67 | muoi_tuoc.s1 | 3 | 70 | 100%, 0k, Sức 0 | 40.6%, 0k, Sức 20 | 28 | 0 | 3.03 | 0.11 | ok (hesitate) |
| j67 | muoi_tuoc.s2 | 3 | 20 | 49.75%, 0k, Sức 0 | 35.35%, 0k, Sức 10 | 8 | -8.06 | -10.81 | -0.34 | silver obvious |
| j67 | muoi_tuoc.c1 | 3 | 90 | 100%, 0k, Sức 0 | 40.6%, 0k, Sức 20 | 36 | 0 | 6.28 | 0.17 | ok (hesitate) |
| j67 | muoi_tuoc.c2 | 3 | 55 | 40%, 0k, Sức 0 | 5.6%, 0k, Sức 20 | 22 | -13.2 | -10.05 | 0.14 | ok (hesitate) |
| j67 | muoi_tuoc.c3 | 3 | 20 | 100%, 0k, Sức 0 | 65.6%, 0k, Sức 10 | 8 | 0 | 0.68 | 0.09 | ok (hesitate) |
| j67 | muoi_tuoc.t1 | 3 | 25 | 100%, 0k, Sức 0 | 64.6%, 0k, Sức 12 | 10 | 0 | 1.48 | 0.15 | ok (hesitate) |
| j67 | muoi_tuoc.x1 | 3 | 110 | 50.5%, 0k, Sức 0 | 11.1%, 0k, Sức 20 | 44 | -21.78 | -5.94 | 0.36 | other road obvious |
| j67 | muoi_lau.s1 | 3 | 45 | 100%, 0k, Sức 0 | 51.6%, 0k, Sức 20 | 18 | 0 | 1.88 | 0.1 | ok (hesitate) |
| j67 | muoi_lau.s2 | 3 | 55 | 100%, 0k, Sức 0 | 45.6%, 0k, Sức 20 | 22 | 22.63 | 12.44 | -0.46 | silver obvious |
| j67 | muoi_lau.c1 | 3 | 35 | 100%, 0k, Sức 0 | 58.6%, 0k, Sức 17 | 14 | 0 | 1.88 | 0.13 | ok (hesitate) |
| j67 | muoi_lau.c2 | 3 | 25 | 55%, 0k, Sức 0 | 39.6%, 0k, Sức 12 | 10 | -10.18 | -10.76 | -0.06 | ok (hesitate) |
| j67 | muoi_lau.x1 | 3 | 90 | 100%, 0k, Sức 0 | 40.6%, 0k, Sức 20 | 36 | 0 | 6.28 | 0.17 | ok (hesitate) |
| j67 | muoi_doi.s1 | 3 | 35 | 100%, 0k, Sức 0 | 58.6%, 0k, Sức 17 | 14 | 26.84 | 17.61 | -0.66 | silver obvious |
| j67 | muoi_doi.s2 | 3 | 55 | 100%, 0k, Sức 1 | 45.6%, 0k, Sức 20 | 22 | 3.1 | 3.61 | 0.02 | ok (hesitate) |
| j67 | muoi_doi.c1 | 3 | 70 | 100%, 0k, Sức 0 | 40.6%, 0k, Sức 20 | 28 | 7.02 | 5.88 | -0.04 | ok (hesitate) |
| j67 | muoi_doi.c2 | 3 | 45 | 100%, 0k, Sức 0 | 51.6%, 0k, Sức 20 | 18 | 0 | 1.88 | 0.1 | ok (hesitate) |
| j67 | muoi_doi.c3 | 3 | 45 | 100%, 0k, Sức 0 | 51.6%, 0k, Sức 20 | 18 | 27.05 | 15.84 | -0.62 | silver obvious |
| j67 | muoi_doi.x1 | 3 | 90 | 60%, 0k, Sức 0 | 20.6%, 0k, Sức 20 | 36 | -14.4 | -2.6 | 0.33 | other road obvious |
| j67 | muoi_no.s1 | 3 | 35 | 100%, 0k, Sức 0 | 58.6%, 0k, Sức 17 | 14 | 10 | 7.74 | -0.16 | ok (hesitate) |
| j67 | muoi_no.s2 | 3 | 35 | 100%, 0k, Sức 0 | 58.6%, 0k, Sức 17 | 14 | 0 | 1.88 | 0.13 | ok (hesitate) |
| j67 | muoi_no.c3 | 3 | 20 | 100%, 0k, Sức 0 | 65.6%, 0k, Sức 10 | 8 | 0 | 0.68 | 0.09 | ok (hesitate) |
| j67 | muoi_no.t1 | 3 | 20 | 100%, 0k, Sức 0 | 65.6%, 0k, Sức 10 | 8 | 16 | 11.18 | -0.6 | silver obvious |
| j67 | muoi_no.x1 | 3 | 55 | 40%, 0k, Sức 0 | 5.6%, 0k, Sức 20 | 22 | -13.2 | -10.05 | 0.14 | ok (hesitate) |
| j67 | cn_chu.s2 | 3 | 25 | 100%, 0k, Sức 0 | 64.6%, 0k, Sức 12 | 10 | 0 | 1.48 | 0.15 | ok (hesitate) |
| j67 | cn_chu.t1 | 3 | 25 | 40%, 0k, Sức 0 | 24.6%, 0k, Sức 12 | 10 | -6 | -5.89 | 0.01 | ok (hesitate) |
| j67 | cn_tinh.s1 | 3 | 35 | 55%, 0k, Sức 0 | 33.6%, 0k, Sức 17 | 14 | -6.3 | -3.72 | 0.18 | ok (hesitate) |
| j67 | cn_tinh.s2 | 3 | 25 | 50%, 0k, Sức 0 | 34.6%, 0k, Sức 12 | 10 | -5 | -4.05 | 0.1 | ok (hesitate) |
| j67 | cn_tinh.c1 | 3 | 45 | 100%, 0k, Sức 0 | 51.6%, 0k, Sức 20 | 18 | 0 | 1.88 | 0.1 | ok (hesitate) |
| j67 | cn_tinh.c2 | 3 | 35 | 55%, 0k, Sức 0 | 33.6%, 0k, Sức 17 | 14 | -6.48 | -8.75 | -0.16 | ok (hesitate) |
| j67 | cn_tinh.t1 | 3 | 35 | 39.75%, 0k, Sức 0 | 18.35%, 0k, Sức 17 | 14 | -18.58 | -20.89 | -0.16 | ok (hesitate) |
| j67 | cn_ban.s1 | 3 | 25 | 100%, 0k, Sức 0 | 64.6%, 0k, Sức 12 | 10 | 14 | 10.52 | -0.35 | silver obvious |
| j67 | cn_ban.s2 | 3 | 35 | 100%, 0k, Sức 0 | 58.6%, 0k, Sức 17 | 14 | 0 | 1.88 | 0.13 | ok (hesitate) |
| j67 | cn_ban.c2 | 3 | 35 | 55%, 0k, Sức 0 | 33.6%, 0k, Sức 17 | 14 | -11.98 | -12.11 | -0.01 | ok (hesitate) |
| j67 | cn_ban.t1 | 3 | 35 | 55%, 0k, Sức 0 | 33.6%, 0k, Sức 17 | 14 | -6.3 | -3.72 | 0.18 | ok (hesitate) |
| j67 | cn_ban.x1 | 3 | 35 | 100%, 0k, Sức 0 | 58.6%, 0k, Sức 17 | 14 | 18 | 12.43 | -0.4 | silver obvious |
| j67 | cn_than.s1 | 3 | 25 | 100%, 0k, Sức 0 | 64.6%, 0k, Sức 12 | 10 | 22 | 15.69 | -0.63 | silver obvious |
| j67 | cn_than.s2 | 3 | 20 | 55%, 0k, Sức 0 | 40.6%, 0k, Sức 10 | 8 | -3.6 | -3.42 | 0.02 | ok (hesitate) |
| j67 | cn_than.c1 | 3 | 35 | 50%, 0k, Sức 0 | 28.6%, 0k, Sức 17 | 14 | -7 | -4.84 | 0.15 | ok (hesitate) |
| j67 | cn_than.c2 | 3 | 35 | 50%, 0k, Sức 0 | 28.6%, 0k, Sức 17 | 14 | -7 | -4.84 | 0.15 | ok (hesitate) |
| j67 | nc_gian.s2 | 3 | 35 | 49.75%, 0k, Sức 0 | 28.35%, 0k, Sức 17 | 14 | -7.04 | -4.9 | 0.15 | ok (hesitate) |
| j67 | nc_gian.c2 | 3 | 45 | 100%, 0k, Sức 0 | 51.6%, 0k, Sức 20 | 18 | 0 | 1.88 | 0.1 | ok (hesitate) |
| j67 | nc_su.s2 | 3 | 70 | 100%, 0k, Sức 0 | 40.6%, 0k, Sức 20 | 28 | 0 | 3.03 | 0.11 | ok (hesitate) |
| j67 | nc_su.c2 | 3 | 45 | 100%, 0k, Sức 0 | 51.6%, 0k, Sức 20 | 18 | 0 | 1.88 | 0.1 | ok (hesitate) |
| j67 | nc_tuc.s2 | 3 | 10 | 50%, 0k, Sức 0 | 35.6%, 0k, Sức 6 | 4 | -2.67 | -5.86 | -0.8 | silver obvious |
| j67 | nc_tuc.c2 | 3 | 25 | 50%, 0k, Sức 0 | 34.6%, 0k, Sức 12 | 10 | -0.47 | -1.53 | -0.11 | ok (hesitate) |
| j67 | nc_tuc.x1 | 3 | 55 | 100%, 0k, Sức 0 | 45.6%, 0k, Sức 20 | 22 | 0 | 2.12 | 0.1 | ok (hesitate) |
| j67 | nc_vuong.s2 | 3 | 25 | 40%, 0k, Sức 0 | 24.6%, 0k, Sức 12 | 10 | -6 | -5.89 | 0.01 | ok (hesitate) |
| j67 | nc_vuong.c2 | 3 | 35 | 100%, 0k, Sức 0 | 58.6%, 0k, Sức 17 | 14 | 0 | 1.88 | 0.13 | ok (hesitate) |
| j67 | nc_vuong.c3 | 3 | 55 | 100%, 0k, Sức 0 | 45.6%, 0k, Sức 20 | 22 | 0 | 2.12 | 0.1 | ok (hesitate) |
| j67 | td_an.s1 | 3 | 35 | 55%, 0k, Sức 0 | 33.6%, 0k, Sức 17 | 14 | -6.3 | -3.72 | 0.18 | ok (hesitate) |
| j67 | td_an.c1 | 3 | 35 | 100%, 0k, Sức 0 | 57.66666666666667%, 0k, Sức 6 | 14 | 0 | 1.73 | 0.12 | ok (hesitate) |
| j67 | td_an.c2 | 3 | 45 | 35%, 0k, Sức 0 | 6.6%, 0k, Sức 20 | 18 | -11.7 | -10.01 | 0.09 | ok (hesitate) |
| j67 | td_an.c3 | 3 | 35 | 100%, 0k, Sức 0 | 58.6%, 0k, Sức 17 | 14 | 0 | 1.88 | 0.13 | ok (hesitate) |
| j67 | td_an.t1 | 3 | 35 | 45%, 0k, Sức 0 | 23.6%, 0k, Sức 17 | 14 | -7.7 | -5.96 | 0.12 | ok (hesitate) |
| j67 | td_ke.s1 | 3 | 35 | 50%, 0k, Sức 0 | 28.6%, 0k, Sức 17 | 14 | -7 | -4.84 | 0.15 | ok (hesitate) |
| j67 | td_ke.s2 | 3 | 25 | 50%, 0k, Sức 0 | 34.6%, 0k, Sức 12 | 10 | -5 | -4.05 | 0.1 | ok (hesitate) |
| j67 | td_ke.c2 | 3 | 35 | 100%, 0k, Sức 0 | 58.6%, 0k, Sức 17 | 14 | 0 | 1.88 | 0.13 | ok (hesitate) |
| j67 | td_song.s1 | 3 | 45 | 100%, 0k, Sức 0 | 51.6%, 0k, Sức 20 | 18 | 0 | 1.88 | 0.1 | ok (hesitate) |
| j67 | td_song.c1 | 3 | 45 | 60%, 0k, Sức 0 | 31.6%, 0k, Sức 20 | 18 | -7.2 | -3.41 | 0.21 | ok (hesitate) |
| j67 | td_song.t1 | 3 | 55 | 60%, 0k, Sức 0 | 25.6%, 0k, Sức 20 | 22 | -8.8 | -3.97 | 0.22 | ok (hesitate) |
| j67 | td_song.x1 | 3 | 35 | 100%, 0k, Sức 0 | 58.6%, 0k, Sức 17 | 14 | 10 | 7.74 | -0.16 | ok (hesitate) |
| j67 | td_tha.c3 | 3 | 25 | 100%, 0k, Sức 0 | 64.6%, 0k, Sức 12 | 10 | 14 | 10.52 | -0.35 | silver obvious |
| j67 | ch_co.s2 | 3 | 35 | 45%, 0k, Sức 0 | 23.6%, 0k, Sức 17 | 14 | -8.62 | -7.24 | 0.1 | ok (hesitate) |
| j67 | ch_benh.s1 | 3 | 55 | 50%, 0k, Sức 0 | 15.6%, 0k, Sức 20 | 22 | -11 | -7.01 | 0.18 | ok (hesitate) |
| j67 | ch_benh.s2 | 3 | 25 | 100%, 0k, Sức 0 | 64.6%, 0k, Sức 12 | 10 | 14 | 10.52 | -0.35 | silver obvious |
| j67 | ch_benh.c1 | 3 | 25 | 45%, 0k, Sức 0 | 29.6%, 0k, Sức 12 | 10 | -5.5 | -4.97 | 0.05 | ok (hesitate) |
| j67 | ch_ho.s2 | 3 | 55 | 100%, 0k, Sức 0 | 45.6%, 0k, Sức 20 | 22 | 0 | 2.12 | 0.1 | ok (hesitate) |
| j67 | ch_ho.c1 | 3 | 45 | 100%, 0k, Sức 0 | 51.6%, 0k, Sức 20 | 18 | 0 | 1.88 | 0.1 | ok (hesitate) |
| j67 | ch_bi.s2 | 3 | 25 | 50%, 0k, Sức 0 | 34.6%, 0k, Sức 12 | 10 | -5 | -4.05 | 0.1 | ok (hesitate) |
| j67 | ch_bi.c3 | 3 | 45 | 35%, 0k, Sức 0 | 6.6%, 0k, Sức 20 | 18 | -12.57 | -11.26 | 0.07 | ok (hesitate) |
| j67 | ch_bi.t1 | 3 | 25 | 100%, 0k, Sức 0 | 64.6%, 0k, Sức 12 | 10 | 0 | 1.48 | 0.15 | ok (hesitate) |
| j67 | thd_tho.s2 | 3 | 45 | 100%, 0k, Sức 0 | 51.6%, 0k, Sức 20 | 18 | 0 | 1.88 | 0.1 | ok (hesitate) |
| j67 | thd_tho.c1 | 3 | 25 | 45%, 0k, Sức 0 | 29.6%, 0k, Sức 12 | 10 | -18.21 | -21.97 | -0.38 | silver obvious |
| j67 | thd_tho.c2 | 3 | 45 | 50%, 0k, Sức 0 | 21.6%, 0k, Sức 20 | 18 | -25.84 | -32.46 | -0.37 | silver obvious |
| j67 | thd_sach.c2 | 3 | 45 | 100%, 0k, Sức 0 | 51.6%, 0k, Sức 20 | 18 | 3.05 | 3.45 | 0.02 | ok (hesitate) |
| j67 | thd_sach.c3 | 3 | 20 | 50%, 0k, Sức 0 | 35.6%, 0k, Sức 10 | 8 | -4 | -4.24 | -0.03 | ok (hesitate) |
| j67 | thd_tro.s1 | 3 | 25 | 100%, 0k, Sức 0 | 64.6%, 0k, Sức 12 | 10 | 14 | 10.52 | -0.35 | silver obvious |
| j67 | thd_tro.c1 | 3 | 25 | 100%, 0k, Sức 0 | 64.6%, 0k, Sức 12 | 10 | 0 | 1.48 | 0.15 | ok (hesitate) |
| j67 | thd_tro.c2 | 3 | 45 | 50%, 0k, Sức 0 | 21.6%, 0k, Sức 20 | 18 | -9 | -6.05 | 0.16 | ok (hesitate) |
| j67 | thd_tro.c3 | 3 | 35 | 100%, 0k, Sức 0 | 58.6%, 0k, Sức 17 | 14 | 10 | 7.74 | -0.16 | ok (hesitate) |
| j67 | thd_hoc.t1 | 3 | 25 | 55%, 0k, Sức 0 | 39.6%, 0k, Sức 12 | 10 | -12.08 | -13.3 | -0.12 | ok (hesitate) |
| j67 | cnv_chu.s2 | 3 | 5 | 50%, 0k, Sức 0 | 35.6%, 0k, Sức 6 | 2 | -2 | -7 | -2.5 | silver obvious |
| j67 | cnv_chu.x1 | 3 | 10 | 100%, 0k, Sức 0 | 65.6%, 0k, Sức 6 | 4 | 20 | 11.85 | -2.04 | silver obvious |
| j67 | cnv_ban.s1 | 3 | 5 | 50%, 0k, Sức 0 | 35.6%, 0k, Sức 6 | 2 | -1 | -5.71 | -2.36 | silver obvious |
| j67 | cnv_ban.c1 | 3 | 5 | 100%, 0k, Sức 1 | 65.6%, 0k, Sức 6 | 2 | 21.83 | 11.85 | -4.99 | silver obvious |
| j67 | cnv_ban.t1 | 3 | 10 | 50%, 0k, Sức 0 | 35.6%, 0k, Sức 6 | 4 | -2 | -5 | -0.75 | silver obvious |
| j67 | cnv_mat.c1 | 3 | 5 | 55%, 0k, Sức 0 | 40.6%, 0k, Sức 6 | 2 | -1.07 | -5.84 | -2.39 | silver obvious |
| j67 | cnv_mat.t1 | 3 | 10 | 40%, 0k, Sức 0 | 25.6%, 0k, Sức 6 | 4 | -4.4 | -8.72 | -1.08 | silver obvious |
| j67 | cnv_ma.c1 | 3 | 5 | 100%, 0k, Sức 0 | 65.6%, 0k, Sức 6 | 2 | 0 | -2.58 | -1.29 | silver obvious |
| j67 | cnv_ma.c2 | 3 | 10 | 100%, 0k, Sức 0 | 65.6%, 0k, Sức 6 | 4 | 20 | 11.85 | -2.04 | silver obvious |
| j67 | cnv_ma.x1 | 3 | 10 | 45%, 0k, Sức 0 | 30.6%, 0k, Sức 6 | 4 | -2.2 | -5.62 | -0.86 | silver obvious |
| j67 | s_than.s1 | 3 | 20 | 100%, 0k, Sức 0 | 65.6%, 0k, Sức 10 | 8 | 8 | 5.93 | -0.26 | ok (hesitate) |
| j67 | s_than.s2 | 3 | 20 | 100%, 0k, Sức 0 | 65.6%, 0k, Sức 10 | 8 | 0 | 0.68 | 0.09 | ok (hesitate) |
| j67 | s_than.c1 | 3 | 20 | 45%, 0k, Sức 0 | 30.6%, 0k, Sức 10 | 8 | -11.35 | -13.83 | -0.31 | silver obvious |
| j67 | s_than.c3 | 3 | 25 | 50%, 0k, Sức 0 | 34.6%, 0k, Sức 12 | 10 | -4.32 | -7.46 | -0.31 | silver obvious |
| j67 | s_than.x1 | 3 | 35 | 100%, 0k, Sức 0 | 58.6%, 0k, Sức 17 | 14 | 10 | 7.74 | -0.16 | ok (hesitate) |
| j67 | s_thu.s2 | 3 | 20 | 100%, 0k, Sức 0 | 65.6%, 0k, Sức 10 | 8 | 0 | 0.68 | 0.09 | ok (hesitate) |
| j67 | s_thu.c1 | 3 | 25 | 55%, 0k, Sức 0 | 39.6%, 0k, Sức 12 | 10 | -4.5 | -3.13 | 0.14 | ok (hesitate) |
| j67 | s_thu.c3 | 3 | 25 | 100%, 0k, Sức 0 | 64.6%, 0k, Sức 12 | 10 | 0 | 1.48 | 0.15 | ok (hesitate) |
| j67 | s_hoa.s2 | 3 | 20 | 100%, 0k, Sức 0 | 65.6%, 0k, Sức 10 | 8 | 0 | 0.68 | 0.09 | ok (hesitate) |
| j67 | s_hoa.c3 | 3 | 45 | 100%, 0k, Sức 0 | 51.6%, 0k, Sức 20 | 18 | 10.84 | 7.47 | -0.19 | ok (hesitate) |
| j67 | s_su.c3 | 3 | 20 | 60%, 0k, Sức 0 | 45.6%, 0k, Sức 10 | 8 | -0.8 | -0.78 | 0 | ok (hesitate) |
| j67 | s_su.x1 | 3 | 25 | 46.166666666666664%, 0k, Sức 0 | 30.766666666666666%, 0k, Sức 12 | 10 | -5.38 | -4.75 | 0.06 | ok (hesitate) |
| j67 | s_dich.s1 | 3 | 25 | 100%, 0k, Sức 0 | 64.6%, 0k, Sức 12 | 10 | 0 | 1.48 | 0.15 | ok (hesitate) |
| j67 | s_dich.c1 | 3 | 35 | 55%, 0k, Sức 0 | 33.6%, 0k, Sức 17 | 14 | 3.6 | 2.33 | -0.09 | ok (hesitate) |
| j67 | s_dich.c2 | 3 | 20 | 100%, 0k, Sức 0 | 65.6%, 0k, Sức 10 | 8 | 4.63 | 3.72 | -0.11 | ok (hesitate) |
| j67 | s_dich.t1 | 3 | 45 | 100%, 0k, Sức 0 | 51.6%, 0k, Sức 20 | 18 | 0 | 1.88 | 0.1 | ok (hesitate) |
| j67 | s_tinh.c3 | 3 | 45 | 100%, 0k, Sức 0 | 51.6%, 0k, Sức 20 | 18 | 0 | 1.88 | 0.1 | ok (hesitate) |
| j67 | s_tinh.t1 | 3 | 35 | 60%, 0k, Sức 0 | 38.6%, 0k, Sức 17 | 14 | -12.34 | -12.94 | -0.04 | ok (hesitate) |
| j67 | s_thay.s2 | 3 | 20 | 100%, 0k, Sức 0 | 65.6%, 0k, Sức 10 | 8 | 0 | 0.68 | 0.09 | ok (hesitate) |
| j67 | s_thay.t1 | 3 | 20 | 45%, 0k, Sức 0 | 30.6%, 0k, Sức 10 | 8 | -4.4 | -5.06 | -0.08 | ok (hesitate) |
| j67 | s_ban.c2 | 3 | 25 | 50%, 0k, Sức 0 | 34.6%, 0k, Sức 12 | 10 | -5 | -4.05 | 0.1 | ok (hesitate) |
| j67 | s_ban.x1 | 3 | 25 | 100%, 0k, Sức 0 | 64.6%, 0k, Sức 12 | 10 | 0 | 1.48 | 0.15 | ok (hesitate) |
| j67 | st_the.s1 | 3 | 25 | 55%, 0k, Sức 0 | 39.6%, 0k, Sức 12 | 10 | -4.5 | -3.13 | 0.14 | ok (hesitate) |
| j67 | st_the.s2 | 3 | 35 | 100%, 0k, Sức 0 | 58.6%, 0k, Sức 17 | 14 | 0 | 1.88 | 0.13 | ok (hesitate) |
| j67 | st_the.c1 | 3 | 35 | 55%, 0k, Sức 0 | 33.6%, 0k, Sức 17 | 14 | -6.3 | -3.72 | 0.18 | ok (hesitate) |
| j67 | st_the.c3 | 3 | 20 | 100%, 0k, Sức 0 | 65.6%, 0k, Sức 10 | 8 | 6.63 | 5.03 | -0.2 | ok (hesitate) |
| j67 | st_the.x1 | 3 | 35 | 35%, 0k, Sức 0 | 13.6%, 0k, Sức 17 | 14 | -9.1 | -8.21 | 0.06 | ok (hesitate) |
| j67 | st_con.s1 | 3 | 25 | 100%, 0k, Sức 0 | 64.6%, 0k, Sức 12 | 10 | 0 | 1.48 | 0.15 | ok (hesitate) |
| j67 | st_con.s2 | 3 | 25 | 65%, 0k, Sức 6 | 49.6%, 0k, Sức 12 | 10 | -4.5 | -1.28 | 0.32 | other road obvious |
| j67 | st_con.c1 | 3 | 25 | 100%, 0k, Sức 0 | 64.6%, 0k, Sức 12 | 10 | 0 | 1.48 | 0.15 | ok (hesitate) |
| j67 | st_con.t1 | 3 | 25 | 40%, 0k, Sức 0 | 24.6%, 0k, Sức 12 | 10 | -6 | -5.89 | 0.01 | ok (hesitate) |
| j67 | st_dong.c2 | 3 | 45 | 100%, 0k, Sức 0 | 51.6%, 0k, Sức 20 | 18 | 0 | 1.88 | 0.1 | ok (hesitate) |
| j67 | st_dong.c3 | 3 | 45 | 55%, 0k, Sức 0 | 26.6%, 0k, Sức 20 | 18 | -8.1 | -4.73 | 0.19 | ok (hesitate) |
| j67 | st_dong.t1 | 3 | 25 | 45%, 0k, Sức 0 | 29.6%, 0k, Sức 12 | 10 | -5.5 | -4.97 | 0.05 | ok (hesitate) |
| j67 | tm96a.a1 | 3 | 10 | 100%, 0k, Sức 0 | 65.6%, 0k, Sức 6 | 4 | 20 | 11.85 | -2.04 | silver obvious |
| j67 | tm96a.a2 | 3 | 10 | 100%, 0k, Sức 0 | 65.6%, 0k, Sức 6 | 4 | 0 | -1.27 | -0.32 | silver obvious |
| j67 | tm96a.a3 | 3 | 10 | 100%, 0k, Sức 0 | 65.6%, 0k, Sức 6 | 4 | 20 | 11.85 | -2.04 | silver obvious |
| j67 | tm96a.a5 | 3 | 20 | 100%, 0k, Sức 0 | 65.6%, 0k, Sức 10 | 8 | 0 | 0.68 | 0.09 | ok (hesitate) |
| j67 | tm96a.a6 | 3 | 10 | 100%, 0k, Sức 0 | 65.6%, 0k, Sức 6 | 4 | 0 | -1.27 | -0.32 | silver obvious |
| j67 | tm96b.b1l | 3 | 70 | 100%, 0k, Sức 0 | 40.6%, 0k, Sức 20 | 28 | 0 | 3.03 | 0.11 | ok (hesitate) |
| j67 | tm96b.b2a | 3 | 20 | 100%, 0k, Sức 0 | 65.6%, 0k, Sức 10 | 8 | 8 | 5.93 | -0.26 | ok (hesitate) |
| j67 | tm96b.b3a | 3 | 55 | 45%, 0k, Sức 0 | 10.6%, 0k, Sức 20 | 22 | -12.1 | -8.53 | 0.16 | ok (hesitate) |
| j67 | tm96b.b3b | 3 | 45 | 100%, 0k, Sức 0 | 51.6%, 0k, Sức 20 | 18 | 0 | 1.88 | 0.1 | ok (hesitate) |
| j67 | tm96c.c1o | 3 | 55 | 100%, 0k, Sức 0 | 45.6%, 0k, Sức 20 | 22 | 0 | 2.12 | 0.1 | ok (hesitate) |
| j67 | tm96c.c2 | 3 | 55 | 50.25%, 0k, Sức 0 | 15.85%, 0k, Sức 20 | 22 | -19.32 | -21.11 | -0.08 | ok (hesitate) |
| j67 | tm96c.c4b | 3 | 70 | 45%, 0k, Sức 0 | 5.6%, 0k, Sức 20 | 28 | -15.4 | -9.71 | 0.2 | ok (hesitate) |
| j67 | tm96c.c5 | 3 | 135 | 35%, 0k, Sức 0 | 5%, 0k, Sức 20 | 54 | -35.1 | -8.63 | 0.49 | other road obvious |
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
| jecon | Dò la ↔ Tự đi dò la | 3 | 15 | 37%, 2k, Sức 0 | 19%, 2k, Sức 0 | 6 | -7.46 | -9.84 | -0.4 | silver obvious |
| jecon | Mua chuộc ↔ Sai cung nữ lấy lòng | 3 | 40 | 5%, 2k, Sức 0 | 5%, 2k, Sức 0, +8.3k | 16 | -20.05 | -12.38 | 0.48 | other road obvious |
| jecon | Rút thẻ bài ↔ Nhờ ơn người quen | 3 | 40 | 34%, 2k, Sức 0 | 34%, 2k, Sức 0, +10.0k | 16 | -12.56 | -6.56 | 0.38 | other road obvious |
| jrest | Nghỉ ngơi dưỡng sức ↔ Nghỉ ngơi một lát ×N | 3 | 6 | 100%, 2k, Sức 0 | 100%, 4k, Sức 0 | 2.4 | -0.4 | 0 | 0.17 | ok (hesitate) |
| jecon | Chu toàn lễ nghĩa ↔ Bớt lễ nghĩa | 3 | 18 | 100%, 0k, Sức 0 | 100%, 0k, Sức 0, +8.4k | 7.2 | 0 | -1.22 | -0.17 | ok (hesitate) |
| j68 | giftArrive · Nhận, đáp lễ hậu hĩnh | 3 | 20 | 100%, 0k, Sức 0 | 100%, 0k, Sức 0 | 8 | -1.12 | 6 | 0.89 | other road obvious |
| j68 | strayCat · Giữ lại nuôi | 3 | 5 | 100%, 0k, Sức 0 | 60%, 0k, Sức 3 | 2 | 3.5 | 2.49 | -0.25 | ok (hesitate) |
| j68 | leakRoof · Bỏ bạc thuê thợ ngay | 3 | 30 | 100%, 0k, Sức 0 | 100%, 0k, Sức 6 | 12 | -7.12 | 8.67 | 1.32 | other road obvious |
| j68 | letterHome · Gửi bạc về nhà | 3 | 30 | 100%, 0k, Sức 0 | 100%, 0k, Sức 2 | 12 | 15 | 9.67 | -0.44 | silver obvious |
| j68 | eunuchSqueeze · Đưa bạc cho xong | 3 | 15 | 100%, 0k, Sức 0 | 70%, 0k, Sức 0 | 6 | -2.67 | 2.53 | 0.87 | other road obvious |
| j68 | embroidery · Thuê thợ thêu ngoài cung | 3 | 35 | 100%, 0k, Sức 0 | 63%, 0k, Sức 10 | 14 | -8.58 | 6.14 | 1.05 | other road obvious |
| j68 | flowerBloom · Mời các phi tần ngắm hoa | 3 | 15 | 100%, 0k, Sức 0 | 34%, 0k, Sức 0 | 6 | -0.58 | 0.68 | 0.21 | ok (hesitate) |
| j68 | proudVisit · Nhún nhường tiếp đãi | 3 | 10 | 100%, 0k, Sức 0 | 100%, 0k, Sức 0 | 4 | 10.67 | -0.83 | -2.87 | silver obvious |
| j68 | thMama · Biếu ma ma chút quà | 3 | 15 | 100%, 0k, Sức 0 | 100%, 0k, Sức 0, +3.0k | 6 | -4.67 | 5 | 1.61 | other road obvious |
| j68 | docCheck · Để thái y kê thuốc bổ | 3 | 20 | 100%, 0k, Sức 0 | 100%, 0k, Sức 0, +3.0k | 8 | -6.33 | -1 | 0.67 | other road obvious |
| j68 | docCheck · Hỏi thăm dò chuyện các cung | 3 | 10 | 41%, 0k, Sức 0 | 100%, 0k, Sức 0, +3.0k | 4 | -6.2 | -1 | 1.3 | other road obvious |
| j68 | painter · Bỏ bạc nhờ vẽ cho đẹp | 3 | 30 | 100%, 0k, Sức 0 | 69%, 0k, Sức 4 | 12 | -5 | 5.44 | 0.87 | other road obvious |
| j68 | musician · Học một khúc mới | 3 | 10 | 100%, 0k, Sức 6 | 100%, 0k, Sức 0, +3.0k | 4 | -6 | 5 | 2.75 | other road obvious |
| j68 | musician · Nhờ phổ nhạc bài thơ dâng Hoàng thượng | 3 | 20 | 49%, 0k, Sức 0 | 100%, 0k, Sức 0, +3.0k | 8 | -3.73 | 5 | 1.09 | other road obvious |
| j68 | newGirlAdvice · Nhận làm người dưới trướng | 3 | 15 | 100%, 0k, Sức 0 | 100%, 0k, Sức 4 | 6 | 0.21 | 19.33 | 3.19 | other road obvious |
| j68 | heatStroke · Xin đá lạnh hầm băng | 3 | 20 | 100%, 0k, Sức 0 | 38%, 0k, Sức 8 | 8 | -6.67 | 2.47 | 1.14 | other road obvious |
| j68 | snowDay · Phát áo bông cho cung nhân | 3 | 25 | 100%, 0k, Sức 0 | 100%, 0k, Sức 10 | 10 | 8.67 | 8 | -0.07 | ok (hesitate) |
| j68 | springAllergy · Mời Trương Minh Viễn kê thuốc | 3 | 15 | 100%, 0k, Sức 0 | 100%, 0k, Sức 0, +3.0k | 6 | -5 | -1 | 0.67 | other road obvious |
| j68 | stormNight · Thắp hương cầu an cho cung | 3 | 10 | 100%, 0k, Sức 0 | 34%, 0k, Sức 6 | 4 | 13.33 | -2.59 | -3.98 | silver obvious |
| j68 | stormNight · Cứu người, cho thuốc men | 3 | 15 | 100%, 0k, Sức 4 | 34%, 0k, Sức 6 | 6 | 21.54 | -2.59 | -4.02 | silver obvious |
| j68 | famineDonate · Quyên nhiều bạc | 3 | 60 | 100%, 0k, Sức 0 | 100%, 0k, Sức 6 | 24 | 13.84 | 16 | 0.09 | ok (hesitate) |
| j68 | famineDonate · Góp chút ít cho phải lễ | 3 | 10 | 100%, 0k, Sức 0 | 100%, 0k, Sức 6 | 4 | -2.79 | 16 | 4.7 | other road obvious |
| j68 | borderNews · Thêu cờ, may áo gửi quân | 3 | 15 | 100%, 0k, Sức 10 | 100%, 0k, Sức 0, +3.0k | 6 | 12.96 | 5 | -1.33 | silver obvious |
| j68 | rumorPreg · Cho người dò cho chắc | 3 | 15 | 45%, 0k, Sức 0 | 100%, 0k, Sức 0, +3.0k | 6 | -7.72 | 5 | 2.12 | other road obvious |
| j68 | rumorPreg · Sang chúc mừng thăm dò | 3 | 10 | 46%, 0k, Sức 0 | 100%, 0k, Sức 0, +3.0k | 4 | -4.68 | 5 | 2.42 | other road obvious |
| j68 | rumorEmpLove · Hỏi thái giám Kính sự phòng | 3 | 15 | 50%, 0k, Sức 0 | 41%, 0k, Sức 0, +3.0k | 6 | -6 | -19.61 | -2.27 | silver obvious |
| j68 | rumorEmpLove · Sang thân thiết với nàng | 3 | 10 | 100%, 0k, Sức 0 | 41%, 0k, Sức 0, +3.0k | 4 | -5 | -19.61 | -3.65 | silver obvious |
| j68 | silkAllot · Bỏ bạc may thêm cho cả hai | 3 | 30 | 100%, 0k, Sức 0 | 100%, 0k, Sức 0, +3.0k | 12 | -5.79 | 16.33 | 1.84 | other road obvious |
| j68 | templeRite · Cúng dầu đèn hậu hĩnh | 3 | 25 | 100%, 0k, Sức 0 | 100%, 0k, Sức 8 | 10 | 7.33 | 8.67 | 0.13 | ok (hesitate) |
| j68 | fortuneNun · Bỏ bạc xin xem một quẻ | 3 | 15 | 100%, 0k, Sức 0 | 39%, 0k, Sức 0 | 6 | -5.5 | 5.24 | 1.79 | other road obvious |
| j68 | fortuneNun · Treo bùa cho cung nhân yên tâm | 3 | 10 | 100%, 0k, Sức 0 | 39%, 0k, Sức 0 | 4 | -2.33 | 5.24 | 1.89 | other road obvious |
| j68 | rumorTH · Hỏi ma ma thân tín của Thái hậu | 3 | 15 | 50%, 0k, Sức 0 | 100%, 0k, Sức 0, +3.0k | 6 | -6 | 5 | 1.83 | other road obvious |
| j68 | rumorFavor · Mua tin Kính sự phòng | 3 | 20 | 55%, 0k, Sức 0 | 100%, 0k, Sức 0, +3.0k | 8 | -7.5 | 5 | 1.56 | other road obvious |
| j68 | lotusSeason · Cùng làm, dâng lên | 3 | 10 | 100%, 0k, Sức 6 | 100%, 0k, Sức 5 | 4 | 1.67 | 3.5 | 0.46 | other road obvious |
| j68 | droughtPrayer · Lén mua nước sạch ngoài cung | 3 | 20 | 100%, 0k, Sức 0 | 100%, 0k, Sức 10 | 8 | -10.33 | 26.33 | 4.58 | other road obvious |
| act | deck · Hối lộ Kính sự phòng | 3 | 30 | 95%, 2k, Sức 0 | — |  |  |  |  | UNPRICED (gain only in words: 2 tuần tới dễ được lật thẻ: khả năng thấp → dễ hơn một bậc) |
| act | deck · Nghỉ ngơi dưỡng sức [suc] | 3 | 6 | 95%, 4k, Sức 0 | 95%, 1k, Sức 0 | 2.4 | 0.594 | 2.217 | 2.73 | other road obvious |
| act | deck · Cầu tự ở Phụng Tiên điện | 3 | 10 | 50%, 2k, Sức 0 | — |  |  |  |  | UNPRICED (gain only in words: 2 tháng dễ có thai hơn (nay khả năng rất thấp)) |
| act | deck · Phát chẩn cho cung nhân [danh] | 3 | 40 | 85%, 2k, Sức 0 | 75%, 2k, Sức 5 | 16 | 2.62 | 4.772 | 0.82 | other road obvious |
| act | deck · Dưỡng nhan | 3 | 30 | 92%, 2k, Sức 0 | — |  |  |  |  | NO ACT WITHOUT SILVER for sac |
| act | deck · Tụng kinh, làm việc thiện | 3 | 10 | 95%, 2k, Sức 0 | — |  |  |  |  | NO ACT WITHOUT SILVER for duc |
| act | deck · Múa trong yến tiệc [sung] | 3 | 10 | 68%, 4k, Sức 20 | 51%, 2k, Sức 10 | 4 | 2.271 | 2.538 | 0.12 | ok (hesitate) |
| act | deck · Cài tai mắt | 3 | 25 | 80%, 2k, Sức 0 | — |  |  |  |  | NO ACT WITHOUT SILVER for mat |
| act | deck · Tự học Nấu nướng: nấu món | 3 | 6 | 95%, 2k, Sức 15 | — |  |  |  |  | UNPRICED (gain only in words: tiến bộ Nấu nướng +1..2 · tự tay chơi thì ra Cháo trắng hành) |
| act | talk:emp · Dâng một cành hoa [sung] | 3 | 5 | 50%, 2k, Sức 0 | 51%, 2k, Sức 10 | 2 | 1 | 2.538 | 1.54 | other road obvious |
| act | talk:ty · Bài thuốc dễ thụ thai | 3 | 40 | 95%, 2k, Sức 0 | — |  |  |  |  | UNPRICED (gain only in words: 3 tháng dễ có thai hơn) |
| act | talk:ty · Mời làm thái y tâm phúc | 3 | 50 | 95%, 2k, Sức 0 | — |  |  |  |  | UNPRICED (gain only in words: dễ phát hiện xạ hương, độc; bệnh của con nhẹ hơn) |
| act | talk:ty · Học hỏi y lý | 3 | 10 | 95%, 2k, Sức 0 | — |  |  |  |  | NO ACT WITHOUT SILVER for art |
| act | talk:ksp · Đút lót lật thẻ | 3 | 30 | 95%, 2k, Sức 0 | — |  |  |  |  | UNPRICED (gain only in words: 2 tuần tới dễ được lật thẻ: khả năng thấp → dễ hơn một bậc) |
| act | talk:ksp · Hỏi sở thích Hoàng thượng | 3 | 15 | 80%, 2k, Sức 0 | — |  |  |  |  | UNPRICED (gain only in words: biết thêm một điều ngài thích) |
| act | talk:peddler · Mua Nghiên mực Đoan Khê | 3 | 60 | 95%, 2k, Sức 0 | — |  |  |  |  | UNPRICED (gain only in words: Tặng Hoàng thượng: hợp ý) |
| act | talk:peddler · Mua Thuốc giải độc | 3 | 60 | 95%, 2k, Sức 0 | — |  |  |  |  | UNPRICED (gain only in words: Để trong rương: cứu một lần trúng độc) |
| act | talk:peddler · Mua Đệm gấm | 3 | 12 | 95%, 2k, Sức 0 | — |  |  |  |  | UNPRICED (gain only in words: Tặng: êm ấm, ai cũng nhận) |
| act | talk:peddler · Mua Gấm Tô Châu [danh] | 3 | 120 | 95%, 2k, Sức 0 | 75%, 2k, Sức 5 | 48 | 0.27 | 4.772 | 16.67 | other road obvious |
| act | talk:peddler · Mua Thuốc an thai | 3 | 15 | 95%, 2k, Sức 0 | — |  |  |  |  | UNPRICED (gain only in words: Dùng khi có thai: nguy cơ sảy giảm nửa) |
| act | talk:peddler · Mua Lụa Hàng Châu | 3 | 30 | 95%, 2k, Sức 0 | — |  |  |  |  | NO ACT WITHOUT SILVER for sac |
| act | talk:fallen · Đưa cơm áo | 3 | 20 | 95%, 2k, Sức 0 | — |  |  |  |  | NO ACT WITHOUT SILVER for duc |
| act | talk:rival · Giúp đỡ nàng | 3 | 20 | 95%, 2k, Sức 0 | — |  |  |  |  | NO ACT WITHOUT SILVER for rel |
| act | talk:rival · Dò la | 3 | 17 | 29%, spyk, Sức 0 | — |  |  |  |  | UNPRICED (gain only in words: Bạc -24) |
| act | talk:rival · Bỏ độc vào trà nàng | 3 | 23 | 5%, poisonk, Sức 0 | — |  |  |  |  | UNPRICED (gain only in words: lộ: tội chết — năm đầu được tha một lần: giáng một bậc, cấm ) |
| j67 | tt_co.s2 | 5 | 45 | 51.333333333333336%, 0k, Sức 0 | 28.933333333333337%, 0k, Sức 17 | 14.12 | -13.02 | -13.71 | -0.05 | ok (hesitate) |
| j67 | tt_co.c2 | 5 | 65 | 100%, 0k, Sức 0 | 47.6%, 0k, Sức 20 | 20.39 | 0 | 1.96 | 0.1 | ok (hesitate) |
| j67 | tt_co.t1 | 5 | 35 | 100%, 0k, Sức 0 | 62.6%, 0k, Sức 13 | 10.98 | 0 | 1.56 | 0.14 | ok (hesitate) |
| j67 | tt_co.x1 | 5 | 45 | 100%, 0k, Sức 0 | 57.6%, 0k, Sức 17 | 14.12 | 25.88 | 16.64 | -0.65 | silver obvious |
| j67 | tt_oan.s1 | 5 | 45 | 100%, 0k, Sức 0 | 57.6%, 0k, Sức 17 | 14.12 | 0 | 1.73 | 0.12 | ok (hesitate) |
| j67 | tt_oan.s2 | 5 | 55 | 100%, 0k, Sức 0 | 52.6%, 0k, Sức 20 | 17.25 | 6.75 | 5.3 | -0.08 | ok (hesitate) |
| j67 | tt_oan.c1 | 5 | 65 | 100%, 0k, Sức 0 | 47.6%, 0k, Sức 20 | 20.39 | 0 | 1.96 | 0.1 | ok (hesitate) |
| j67 | tt_oan.c2 | 5 | 45 | 55%, 0k, Sức 0 | 32.6%, 0k, Sức 17 | 14.12 | -6.35 | -3.91 | 0.17 | ok (hesitate) |
| j67 | tt_tranh.s1 | 5 | 45 | 44.75%, 0k, Sức 0 | 22.35%, 0k, Sức 17 | 14.12 | -7.8 | -6.22 | 0.11 | ok (hesitate) |
| j67 | tt_tranh.s2 | 5 | 35 | 100%, 0k, Sức 0 | 62.6%, 0k, Sức 13 | 10.98 | 0 | 1.56 | 0.14 | ok (hesitate) |
| j67 | tt_tranh.c1 | 5 | 20 | 100%, 0k, Sức 0 | 65.6%, 0k, Sức 8 | 6.27 | 17.73 | 11.51 | -0.99 | silver obvious |
| j67 | tt_tranh.c3 | 5 | 55 | 100%, 0k, Sức 0 | 52.6%, 0k, Sức 20 | 17.25 | 0 | 1.75 | 0.1 | ok (hesitate) |
| j67 | tt_tranh.t1 | 5 | 65 | 100%, 0k, Sức 0 | 47.6%, 0k, Sức 20 | 20.39 | 0 | 1.96 | 0.1 | ok (hesitate) |
| j67 | tt_mat.s1 | 5 | 35 | 45%, 0k, Sức 0 | 27.6%, 0k, Sức 13 | 10.98 | -6.04 | -5.23 | 0.07 | ok (hesitate) |
| j67 | tt_mat.s2 | 5 | 35 | 100%, 0k, Sức 0 | 62.6%, 0k, Sức 13 | 10.98 | 0 | 1.56 | 0.14 | ok (hesitate) |
| j67 | tt_mat.c3 | 5 | 45 | 100%, 0k, Sức 0 | 57.6%, 0k, Sức 17 | 14.12 | 0 | 1.73 | 0.12 | ok (hesitate) |
| j67 | dtq_bien.s1 | 5 | 65 | 100%, 0k, Sức 0 | 47.6%, 0k, Sức 20 | 20.39 | 0.66 | 2.28 | 0.08 | ok (hesitate) |
| j67 | dtq_bien.s2 | 5 | 55 | 100%, 0k, Sức 2 | 52.6%, 0k, Sức 20 | 17.25 | -0.33 | 1.75 | 0.12 | ok (hesitate) |
| j67 | dtq_bien.c1 | 5 | 35 | 35%, 0k, Sức 1 | 17.6%, 0k, Sức 13 | 10.98 | -7.3 | -7.17 | 0.01 | ok (hesitate) |
| j67 | dtq_bien.c2 | 5 | 35 | 100%, 0k, Sức 0 | 62.6%, 0k, Sức 13 | 10.98 | 0 | 1.56 | 0.14 | ok (hesitate) |
| j67 | dtq_bien.t1 | 5 | 65 | 100%, 0k, Sức 0 | 47.6%, 0k, Sức 20 | 20.39 | 0 | 1.96 | 0.1 | ok (hesitate) |
| j67 | dtq_vu.s2 | 5 | 55 | 100%, 0k, Sức 0 | 52.6%, 0k, Sức 20 | 17.25 | 0 | 1.75 | 0.1 | ok (hesitate) |
| j67 | dtq_vu.c1 | 5 | 45 | 40%, 0k, Sức 1 | 17.6%, 0k, Sức 17 | 14.12 | -8.64 | -7.29 | 0.1 | ok (hesitate) |
| j67 | dtq_vu.c2 | 5 | 20 | 100%, 0k, Sức 0 | 65.6%, 0k, Sức 8 | 6.27 | 0 | -0.11 | -0.02 | ok (hesitate) |
| j67 | dtq_binh.s2 | 5 | 35 | 40%, 0k, Sức 0 | 22.6%, 0k, Sức 13 | 10.98 | -6.59 | -6.2 | 0.04 | ok (hesitate) |
| j67 | dtq_binh.c1 | 5 | 45 | 100%, 0k, Sức 0 | 57.6%, 0k, Sức 17 | 14.12 | 0 | 1.73 | 0.12 | ok (hesitate) |
| j67 | dtq_binh.c2 | 5 | 35 | 41.666666666666664%, 0k, Sức 0 | 24.266666666666666%, 0k, Sức 13 | 10.98 | -7.38 | -7.14 | 0.02 | ok (hesitate) |
| j67 | dtq_huynh.s1 | 5 | 65 | 100%, 0k, Sức 0 | 47.6%, 0k, Sức 20 | 20.39 | 0 | 1.96 | 0.1 | ok (hesitate) |
| j67 | dtq_huynh.s2 | 5 | 35 | 100%, 0k, Sức 0 | 62.6%, 0k, Sức 13 | 10.98 | 0 | 1.56 | 0.14 | ok (hesitate) |
| j67 | dtq_huynh.c1 | 5 | 45 | 100%, 0k, Sức 0 | 57.6%, 0k, Sức 17 | 14.12 | 0 | 1.73 | 0.12 | ok (hesitate) |
| j67 | dtq_huynh.c2 | 5 | 20 | 100%, 0k, Sức 0 | 65.6%, 0k, Sức 8 | 6.27 | 0 | -0.11 | -0.02 | ok (hesitate) |
| j67 | dtq_huynh.t1 | 5 | 65 | 45%, 0k, Sức 0 | 12.6%, 0k, Sức 20 | 20.39 | -11.22 | -8.12 | 0.15 | ok (hesitate) |
| j67 | muoi_tuoc.s1 | 5 | 90 | 100%, 0k, Sức 0 | 40.6%, 0k, Sức 20 | 28.24 | 0 | 3.13 | 0.11 | ok (hesitate) |
| j67 | muoi_tuoc.s2 | 5 | 20 | 49.75%, 0k, Sức 0 | 35.35%, 0k, Sức 8 | 6.27 | -6.34 | -10.48 | -0.66 | silver obvious |
| j67 | muoi_tuoc.c1 | 5 | 110 | 100%, 0k, Sức 0 | 40.6%, 0k, Sức 20 | 34.51 | 0 | 5.68 | 0.16 | ok (hesitate) |
| j67 | muoi_tuoc.c2 | 5 | 65 | 40%, 0k, Sức 0 | 7.6%, 0k, Sức 20 | 20.39 | -12.24 | -9.56 | 0.13 | ok (hesitate) |
| j67 | muoi_tuoc.c3 | 5 | 20 | 100%, 0k, Sức 0 | 65.6%, 0k, Sức 8 | 6.27 | 0 | -0.11 | -0.02 | ok (hesitate) |
| j67 | muoi_tuoc.t1 | 5 | 35 | 100%, 0k, Sức 0 | 62.6%, 0k, Sức 13 | 10.98 | 0 | 1.56 | 0.14 | ok (hesitate) |
| j67 | muoi_tuoc.x1 | 5 | 130 | 50.5%, 0k, Sức 0 | 11.1%, 0k, Sức 20 | 40.78 | -20.19 | -6.29 | 0.34 | other road obvious |
| j67 | muoi_lau.s1 | 5 | 55 | 100%, 0k, Sức 0 | 52.6%, 0k, Sức 20 | 17.25 | 0 | 1.75 | 0.1 | ok (hesitate) |
| j67 | muoi_lau.s2 | 5 | 65 | 100%, 0k, Sức 0 | 47.6%, 0k, Sức 20 | 20.39 | 24.24 | 13.5 | -0.53 | silver obvious |
| j67 | muoi_lau.c1 | 5 | 45 | 100%, 0k, Sức 0 | 57.6%, 0k, Sức 17 | 14.12 | 0 | 1.73 | 0.12 | ok (hesitate) |
| j67 | muoi_lau.c2 | 5 | 35 | 55%, 0k, Sức 0 | 37.6%, 0k, Sức 13 | 10.98 | -10.63 | -11.17 | -0.05 | ok (hesitate) |
| j67 | muoi_lau.x1 | 5 | 110 | 100%, 0k, Sức 0 | 40.6%, 0k, Sức 20 | 34.51 | 0 | 5.68 | 0.16 | ok (hesitate) |
| j67 | muoi_doi.s1 | 5 | 45 | 100%, 0k, Sức 0 | 57.6%, 0k, Sức 17 | 14.12 | 26.72 | 17.12 | -0.68 | silver obvious |
| j67 | muoi_doi.s2 | 5 | 65 | 100%, 0k, Sức 1 | 47.6%, 0k, Sức 20 | 20.39 | 4.7 | 4.28 | -0.02 | ok (hesitate) |
| j67 | muoi_doi.c1 | 5 | 90 | 100%, 0k, Sức 0 | 40.6%, 0k, Sức 20 | 28.24 | 6.78 | 5.88 | -0.03 | ok (hesitate) |
| j67 | muoi_doi.c2 | 5 | 55 | 100%, 0k, Sức 0 | 52.6%, 0k, Sức 20 | 17.25 | 0 | 1.75 | 0.1 | ok (hesitate) |
| j67 | muoi_doi.c3 | 5 | 55 | 100%, 0k, Sức 0 | 52.6%, 0k, Sức 20 | 17.25 | 27.8 | 16.37 | -0.66 | silver obvious |
| j67 | muoi_doi.x1 | 5 | 110 | 60%, 0k, Sức 0 | 20.6%, 0k, Sức 20 | 34.51 | -13.8 | -2.91 | 0.32 | other road obvious |
| j67 | muoi_no.s1 | 5 | 45 | 100%, 0k, Sức 0 | 57.6%, 0k, Sức 17 | 14.12 | 9.88 | 7.42 | -0.17 | ok (hesitate) |
| j67 | muoi_no.s2 | 5 | 45 | 100%, 0k, Sức 0 | 57.6%, 0k, Sức 17 | 14.12 | 0 | 1.73 | 0.12 | ok (hesitate) |
| j67 | muoi_no.c3 | 5 | 20 | 100%, 0k, Sức 0 | 65.6%, 0k, Sức 8 | 6.27 | 0 | -0.11 | -0.02 | ok (hesitate) |
| j67 | muoi_no.t1 | 5 | 20 | 100%, 0k, Sức 0 | 65.6%, 0k, Sức 8 | 6.27 | 17.73 | 11.51 | -0.99 | silver obvious |
| j67 | muoi_no.x1 | 5 | 65 | 40%, 0k, Sức 0 | 7.6%, 0k, Sức 20 | 20.39 | -12.24 | -9.56 | 0.13 | ok (hesitate) |
| j67 | cn_chu.s2 | 5 | 35 | 100%, 0k, Sức 0 | 62.6%, 0k, Sức 13 | 10.98 | 0 | 1.56 | 0.14 | ok (hesitate) |
| j67 | cn_chu.t1 | 5 | 35 | 40%, 0k, Sức 0 | 22.6%, 0k, Sức 13 | 10.98 | -6.59 | -6.2 | 0.04 | ok (hesitate) |
| j67 | cn_tinh.s1 | 5 | 45 | 55%, 0k, Sức 0 | 32.6%, 0k, Sức 17 | 14.12 | -6.35 | -3.91 | 0.17 | ok (hesitate) |
| j67 | cn_tinh.s2 | 5 | 35 | 50%, 0k, Sức 0 | 32.6%, 0k, Sức 13 | 10.98 | -5.49 | -4.26 | 0.11 | ok (hesitate) |
| j67 | cn_tinh.c1 | 5 | 55 | 100%, 0k, Sức 0 | 52.6%, 0k, Sức 20 | 17.25 | 0 | 1.75 | 0.1 | ok (hesitate) |
| j67 | cn_tinh.c2 | 5 | 45 | 55%, 0k, Sức 0 | 32.6%, 0k, Sức 17 | 14.12 | -6.6 | -9.2 | -0.18 | ok (hesitate) |
| j67 | cn_tinh.t1 | 5 | 45 | 39.75%, 0k, Sức 0 | 17.35%, 0k, Sức 17 | 14.12 | -18.65 | -21.26 | -0.18 | ok (hesitate) |
| j67 | cn_ban.s1 | 5 | 35 | 100%, 0k, Sức 0 | 62.6%, 0k, Sức 13 | 10.98 | 13.02 | 9.71 | -0.3 | ok (hesitate) |
| j67 | cn_ban.s2 | 5 | 45 | 100%, 0k, Sức 0 | 57.6%, 0k, Sức 17 | 14.12 | 0 | 1.73 | 0.12 | ok (hesitate) |
| j67 | cn_ban.c2 | 5 | 45 | 55%, 0k, Sức 0 | 32.6%, 0k, Sức 17 | 14.12 | -12.04 | -12.42 | -0.03 | ok (hesitate) |
| j67 | cn_ban.t1 | 5 | 45 | 55%, 0k, Sức 0 | 32.6%, 0k, Sức 17 | 14.12 | -6.35 | -3.91 | 0.17 | ok (hesitate) |
| j67 | cn_ban.x1 | 5 | 45 | 100%, 0k, Sức 0 | 57.6%, 0k, Sức 17 | 14.12 | 17.88 | 12.03 | -0.41 | silver obvious |
| j67 | cn_than.s1 | 5 | 35 | 100%, 0k, Sức 0 | 62.6%, 0k, Sức 13 | 10.98 | 21.02 | 14.72 | -0.57 | silver obvious |
| j67 | cn_than.s2 | 5 | 20 | 55%, 0k, Sức 0 | 40.6%, 0k, Sức 8 | 6.27 | -2.82 | -3.79 | -0.15 | ok (hesitate) |
| j67 | cn_than.c1 | 5 | 45 | 50%, 0k, Sức 0 | 27.6%, 0k, Sức 17 | 14.12 | -7.06 | -5.03 | 0.14 | ok (hesitate) |
| j67 | cn_than.c2 | 5 | 45 | 50%, 0k, Sức 0 | 27.6%, 0k, Sức 17 | 14.12 | -7.06 | -5.03 | 0.14 | ok (hesitate) |
| j67 | nc_gian.s2 | 5 | 45 | 49.75%, 0k, Sức 0 | 27.35%, 0k, Sức 17 | 14.12 | -7.09 | -5.09 | 0.14 | ok (hesitate) |
| j67 | nc_gian.c2 | 5 | 55 | 100%, 0k, Sức 0 | 52.6%, 0k, Sức 20 | 17.25 | 0 | 1.75 | 0.1 | ok (hesitate) |
| j67 | nc_su.s2 | 5 | 90 | 100%, 0k, Sức 0 | 40.6%, 0k, Sức 20 | 28.24 | 0 | 3.13 | 0.11 | ok (hesitate) |
| j67 | nc_su.c2 | 5 | 55 | 100%, 0k, Sức 0 | 52.6%, 0k, Sức 20 | 17.25 | 0 | 1.75 | 0.1 | ok (hesitate) |
| j67 | nc_tuc.s2 | 5 | 10 | 50%, 0k, Sức 0 | 35.6%, 0k, Sức 6 | 3.14 | -2.24 | -6.16 | -1.25 | silver obvious |
| j67 | nc_tuc.c2 | 5 | 35 | 50%, 0k, Sức 0 | 32.6%, 0k, Sức 13 | 10.98 | -1.45 | -2.33 | -0.08 | ok (hesitate) |
| j67 | nc_tuc.x1 | 5 | 65 | 100%, 0k, Sức 0 | 47.6%, 0k, Sức 20 | 20.39 | 0 | 1.96 | 0.1 | ok (hesitate) |
| j67 | nc_vuong.s2 | 5 | 35 | 40%, 0k, Sức 0 | 22.6%, 0k, Sức 13 | 10.98 | -6.59 | -6.2 | 0.04 | ok (hesitate) |
| j67 | nc_vuong.c2 | 5 | 45 | 100%, 0k, Sức 0 | 57.6%, 0k, Sức 17 | 14.12 | 0 | 1.73 | 0.12 | ok (hesitate) |
| j67 | nc_vuong.c3 | 5 | 65 | 100%, 0k, Sức 0 | 47.6%, 0k, Sức 20 | 20.39 | 0 | 1.96 | 0.1 | ok (hesitate) |
| j67 | td_an.s1 | 5 | 45 | 55%, 0k, Sức 0 | 32.6%, 0k, Sức 17 | 14.12 | -6.35 | -3.91 | 0.17 | ok (hesitate) |
| j67 | td_an.c1 | 5 | 45 | 100%, 0k, Sức 0 | 57.66666666666667%, 0k, Sức 6 | 14.12 | 0 | 1.79 | 0.13 | ok (hesitate) |
| j67 | td_an.c2 | 5 | 55 | 35%, 0k, Sức 0 | 7.6%, 0k, Sức 20 | 17.25 | -11.22 | -9.8 | 0.08 | ok (hesitate) |
| j67 | td_an.c3 | 5 | 45 | 100%, 0k, Sức 0 | 57.6%, 0k, Sức 17 | 14.12 | 0 | 1.73 | 0.12 | ok (hesitate) |
| j67 | td_an.t1 | 5 | 45 | 45%, 0k, Sức 0 | 22.6%, 0k, Sức 17 | 14.12 | -7.76 | -6.16 | 0.11 | ok (hesitate) |
| j67 | td_ke.s1 | 5 | 45 | 50%, 0k, Sức 0 | 27.6%, 0k, Sức 17 | 14.12 | -7.06 | -5.03 | 0.14 | ok (hesitate) |
| j67 | td_ke.s2 | 5 | 35 | 50%, 0k, Sức 0 | 32.6%, 0k, Sức 13 | 10.98 | -5.49 | -4.26 | 0.11 | ok (hesitate) |
| j67 | td_ke.c2 | 5 | 45 | 100%, 0k, Sức 0 | 57.6%, 0k, Sức 17 | 14.12 | 0 | 1.73 | 0.12 | ok (hesitate) |
| j67 | td_song.s1 | 5 | 55 | 100%, 0k, Sức 0 | 52.6%, 0k, Sức 20 | 17.25 | 0 | 1.75 | 0.1 | ok (hesitate) |
| j67 | td_song.c1 | 5 | 55 | 60%, 0k, Sức 0 | 32.6%, 0k, Sức 20 | 17.25 | -6.9 | -3.38 | 0.2 | ok (hesitate) |
| j67 | td_song.t1 | 5 | 65 | 60%, 0k, Sức 0 | 27.6%, 0k, Sức 20 | 20.39 | -8.16 | -3.8 | 0.21 | ok (hesitate) |
| j67 | td_song.x1 | 5 | 45 | 100%, 0k, Sức 0 | 57.6%, 0k, Sức 17 | 14.12 | 9.88 | 7.42 | -0.17 | ok (hesitate) |
| j67 | td_tha.c3 | 5 | 35 | 100%, 0k, Sức 0 | 62.6%, 0k, Sức 13 | 10.98 | 13.02 | 9.71 | -0.3 | ok (hesitate) |
| j67 | ch_co.s2 | 5 | 45 | 45%, 0k, Sức 0 | 22.6%, 0k, Sức 17 | 14.12 | -8.68 | -7.45 | 0.09 | ok (hesitate) |
| j67 | ch_benh.s1 | 5 | 65 | 50%, 0k, Sức 0 | 17.6%, 0k, Sức 20 | 20.39 | -10.2 | -6.68 | 0.17 | ok (hesitate) |
| j67 | ch_benh.s2 | 5 | 35 | 100%, 0k, Sức 0 | 62.6%, 0k, Sức 13 | 10.98 | 13.02 | 9.71 | -0.3 | ok (hesitate) |
| j67 | ch_benh.c1 | 5 | 35 | 45%, 0k, Sức 0 | 27.6%, 0k, Sức 13 | 10.98 | -6.04 | -5.23 | 0.07 | ok (hesitate) |
| j67 | ch_ho.s2 | 5 | 65 | 100%, 0k, Sức 0 | 47.6%, 0k, Sức 20 | 20.39 | 0 | 1.96 | 0.1 | ok (hesitate) |
| j67 | ch_ho.c1 | 5 | 55 | 100%, 0k, Sức 0 | 52.6%, 0k, Sức 20 | 17.25 | 0 | 1.75 | 0.1 | ok (hesitate) |
| j67 | ch_bi.s2 | 5 | 35 | 50%, 0k, Sức 0 | 32.6%, 0k, Sức 13 | 10.98 | -5.49 | -4.26 | 0.11 | ok (hesitate) |
| j67 | ch_bi.c3 | 5 | 55 | 35%, 0k, Sức 0 | 7.6%, 0k, Sức 20 | 17.25 | -12.08 | -11.03 | 0.06 | ok (hesitate) |
| j67 | ch_bi.t1 | 5 | 35 | 100%, 0k, Sức 0 | 62.6%, 0k, Sức 13 | 10.98 | 0 | 1.56 | 0.14 | ok (hesitate) |
| j67 | thd_tho.s2 | 5 | 55 | 100%, 0k, Sức 0 | 52.6%, 0k, Sức 20 | 17.25 | 0 | 1.75 | 0.1 | ok (hesitate) |
| j67 | thd_tho.c1 | 5 | 35 | 45%, 0k, Sức 0 | 27.6%, 0k, Sức 13 | 10.98 | -19.19 | -23.07 | -0.35 | silver obvious |
| j67 | thd_tho.c2 | 5 | 55 | 50%, 0k, Sức 0 | 22.6%, 0k, Sức 20 | 17.25 | -25.47 | -32.02 | -0.38 | silver obvious |
| j67 | thd_sach.c2 | 5 | 55 | 100%, 0k, Sức 0 | 52.6%, 0k, Sức 20 | 17.25 | 3.8 | 3.75 | 0 | ok (hesitate) |
| j67 | thd_sach.c3 | 5 | 20 | 50%, 0k, Sức 0 | 35.6%, 0k, Sức 8 | 6.27 | -3.14 | -4.52 | -0.22 | ok (hesitate) |
| j67 | thd_tro.s1 | 5 | 35 | 100%, 0k, Sức 0 | 62.6%, 0k, Sức 13 | 10.98 | 13.02 | 9.71 | -0.3 | ok (hesitate) |
| j67 | thd_tro.c1 | 5 | 35 | 100%, 0k, Sức 0 | 62.6%, 0k, Sức 13 | 10.98 | 0 | 1.56 | 0.14 | ok (hesitate) |
| j67 | thd_tro.c2 | 5 | 55 | 50%, 0k, Sức 0 | 22.6%, 0k, Sức 20 | 17.25 | -8.63 | -5.95 | 0.16 | ok (hesitate) |
| j67 | thd_tro.c3 | 5 | 45 | 100%, 0k, Sức 0 | 57.6%, 0k, Sức 17 | 14.12 | 9.88 | 7.42 | -0.17 | ok (hesitate) |
| j67 | thd_hoc.t1 | 5 | 35 | 55%, 0k, Sức 0 | 37.6%, 0k, Sức 13 | 10.98 | -12.52 | -13.8 | -0.12 | ok (hesitate) |
| j67 | cnv_chu.s2 | 5 | 5 | 50%, 0k, Sức 0 | 35.6%, 0k, Sức 6 | 1.57 | -1.78 | -7.15 | -3.42 | silver obvious |
| j67 | cnv_chu.x1 | 5 | 10 | 100%, 0k, Sức 0 | 65.6%, 0k, Sức 6 | 3.14 | 20.86 | 11.85 | -2.87 | silver obvious |
| j67 | cnv_ban.s1 | 5 | 5 | 50%, 0k, Sức 0 | 35.6%, 0k, Sức 6 | 1.57 | -0.78 | -5.86 | -3.24 | silver obvious |
| j67 | cnv_ban.c1 | 5 | 5 | 100%, 0k, Sức 1 | 65.6%, 0k, Sức 6 | 1.57 | 22.26 | 11.85 | -6.64 | silver obvious |
| j67 | cnv_ban.t1 | 5 | 10 | 50%, 0k, Sức 0 | 35.6%, 0k, Sức 6 | 3.14 | -1.57 | -5.31 | -1.19 | silver obvious |
| j67 | cnv_mat.c1 | 5 | 5 | 55%, 0k, Sức 0 | 40.6%, 0k, Sức 6 | 1.57 | -0.64 | -5.84 | -3.32 | silver obvious |
| j67 | cnv_mat.t1 | 5 | 10 | 40%, 0k, Sức 0 | 25.6%, 0k, Sức 6 | 3.14 | -3.8 | -8.89 | -1.62 | silver obvious |
| j67 | cnv_ma.c1 | 5 | 5 | 100%, 0k, Sức 0 | 65.6%, 0k, Sức 6 | 1.57 | 0 | -2.87 | -1.83 | silver obvious |
| j67 | cnv_ma.c2 | 5 | 10 | 100%, 0k, Sức 0 | 65.6%, 0k, Sức 6 | 3.14 | 20.86 | 11.85 | -2.87 | silver obvious |
| j67 | cnv_ma.x1 | 5 | 10 | 45%, 0k, Sức 0 | 30.6%, 0k, Sức 6 | 3.14 | -1.73 | -5.88 | -1.33 | silver obvious |
| j67 | s_than.s1 | 5 | 20 | 100%, 0k, Sức 0 | 65.6%, 0k, Sức 8 | 6.27 | 9.73 | 6.27 | -0.55 | silver obvious |
| j67 | s_than.s2 | 5 | 20 | 100%, 0k, Sức 0 | 65.6%, 0k, Sức 8 | 6.27 | 0 | -0.11 | -0.02 | ok (hesitate) |
| j67 | s_than.c1 | 5 | 20 | 45%, 0k, Sức 0 | 30.6%, 0k, Sức 8 | 6.27 | -10.4 | -14.02 | -0.58 | silver obvious |
| j67 | s_than.c3 | 5 | 35 | 50%, 0k, Sức 0 | 32.6%, 0k, Sức 13 | 10.98 | -5.3 | -8.53 | -0.29 | ok (hesitate) |
| j67 | s_than.x1 | 5 | 45 | 100%, 0k, Sức 0 | 57.6%, 0k, Sức 17 | 14.12 | 9.88 | 7.42 | -0.17 | ok (hesitate) |
| j67 | s_thu.s2 | 5 | 20 | 100%, 0k, Sức 0 | 65.6%, 0k, Sức 8 | 6.27 | 0 | -0.11 | -0.02 | ok (hesitate) |
| j67 | s_thu.c1 | 5 | 35 | 55%, 0k, Sức 0 | 37.6%, 0k, Sức 13 | 10.98 | -4.94 | -3.29 | 0.15 | ok (hesitate) |
| j67 | s_thu.c3 | 5 | 35 | 100%, 0k, Sức 0 | 62.6%, 0k, Sức 13 | 10.98 | 0 | 1.56 | 0.14 | ok (hesitate) |
| j67 | s_hoa.s2 | 5 | 20 | 100%, 0k, Sức 0 | 65.6%, 0k, Sức 8 | 6.27 | 0 | -0.11 | -0.02 | ok (hesitate) |
| j67 | s_hoa.c3 | 5 | 55 | 100%, 0k, Sức 0 | 52.6%, 0k, Sức 20 | 17.25 | 11.59 | 7.85 | -0.22 | ok (hesitate) |
| j67 | s_su.c3 | 5 | 20 | 60%, 0k, Sức 0 | 45.6%, 0k, Sức 8 | 6.27 | 0.93 | -0.44 | -0.22 | ok (hesitate) |
| j67 | s_su.x1 | 5 | 35 | 46.166666666666664%, 0k, Sức 0 | 28.766666666666666%, 0k, Sức 13 | 10.98 | -5.91 | -5.01 | 0.08 | ok (hesitate) |
| j67 | s_dich.s1 | 5 | 35 | 100%, 0k, Sức 0 | 62.6%, 0k, Sức 13 | 10.98 | 0 | 1.56 | 0.14 | ok (hesitate) |
| j67 | s_dich.c1 | 5 | 45 | 55%, 0k, Sức 0 | 32.6%, 0k, Sức 17 | 14.12 | 3.48 | 1.92 | -0.11 | ok (hesitate) |
| j67 | s_dich.c2 | 5 | 20 | 100%, 0k, Sức 0 | 65.6%, 0k, Sức 8 | 6.27 | 6.36 | 4.06 | -0.37 | silver obvious |
| j67 | s_dich.t1 | 5 | 55 | 100%, 0k, Sức 0 | 52.6%, 0k, Sức 20 | 17.25 | 0 | 1.75 | 0.1 | ok (hesitate) |
| j67 | s_tinh.c3 | 5 | 55 | 100%, 0k, Sức 0 | 52.6%, 0k, Sức 20 | 17.25 | 0 | 1.75 | 0.1 | ok (hesitate) |
| j67 | s_tinh.t1 | 5 | 45 | 60%, 0k, Sức 0 | 37.6%, 0k, Sức 17 | 14.12 | -12.38 | -13.29 | -0.06 | ok (hesitate) |
| j67 | s_thay.s2 | 5 | 20 | 100%, 0k, Sức 0 | 65.6%, 0k, Sức 8 | 6.27 | 0 | -0.11 | -0.02 | ok (hesitate) |
| j67 | s_thay.t1 | 5 | 20 | 45%, 0k, Sức 0 | 30.6%, 0k, Sức 8 | 6.27 | -3.45 | -5.26 | -0.29 | ok (hesitate) |
| j67 | s_ban.c2 | 5 | 35 | 50%, 0k, Sức 0 | 32.6%, 0k, Sức 13 | 10.98 | -5.49 | -4.26 | 0.11 | ok (hesitate) |
| j67 | s_ban.x1 | 5 | 35 | 100%, 0k, Sức 0 | 62.6%, 0k, Sức 13 | 10.98 | 0 | 1.56 | 0.14 | ok (hesitate) |
| j67 | st_the.s1 | 5 | 35 | 55%, 0k, Sức 0 | 37.6%, 0k, Sức 13 | 10.98 | -4.94 | -3.29 | 0.15 | ok (hesitate) |
| j67 | st_the.s2 | 5 | 45 | 100%, 0k, Sức 0 | 57.6%, 0k, Sức 17 | 14.12 | 0 | 1.73 | 0.12 | ok (hesitate) |
| j67 | st_the.c1 | 5 | 45 | 55%, 0k, Sức 0 | 32.6%, 0k, Sức 17 | 14.12 | -6.35 | -3.91 | 0.17 | ok (hesitate) |
| j67 | st_the.c3 | 5 | 20 | 100%, 0k, Sức 0 | 65.6%, 0k, Sức 8 | 6.27 | 8.36 | 5.37 | -0.48 | silver obvious |
| j67 | st_the.x1 | 5 | 45 | 35%, 0k, Sức 0 | 12.6%, 0k, Sức 17 | 14.12 | -9.18 | -8.41 | 0.05 | ok (hesitate) |
| j67 | st_con.s1 | 5 | 35 | 100%, 0k, Sức 0 | 62.6%, 0k, Sức 13 | 10.98 | 0 | 1.56 | 0.14 | ok (hesitate) |
| j67 | st_con.s2 | 5 | 35 | 65%, 0k, Sức 6 | 47.6%, 0k, Sức 13 | 10.98 | -4.84 | -1.35 | 0.32 | other road obvious |
| j67 | st_con.c1 | 5 | 35 | 100%, 0k, Sức 0 | 62.6%, 0k, Sức 13 | 10.98 | 0 | 1.56 | 0.14 | ok (hesitate) |
| j67 | st_con.t1 | 5 | 35 | 40%, 0k, Sức 0 | 22.6%, 0k, Sức 13 | 10.98 | -6.59 | -6.2 | 0.04 | ok (hesitate) |
| j67 | st_dong.c2 | 5 | 55 | 100%, 0k, Sức 0 | 52.6%, 0k, Sức 20 | 17.25 | 0 | 1.75 | 0.1 | ok (hesitate) |
| j67 | st_dong.c3 | 5 | 55 | 55%, 0k, Sức 0 | 27.6%, 0k, Sức 20 | 17.25 | -7.76 | -4.67 | 0.18 | ok (hesitate) |
| j67 | st_dong.t1 | 5 | 35 | 45%, 0k, Sức 0 | 27.6%, 0k, Sức 13 | 10.98 | -6.04 | -5.23 | 0.07 | ok (hesitate) |
| j67 | tm96a.a1 | 5 | 10 | 100%, 0k, Sức 0 | 65.6%, 0k, Sức 6 | 3.14 | 20.86 | 11.85 | -2.87 | silver obvious |
| j67 | tm96a.a2 | 5 | 10 | 100%, 0k, Sức 0 | 65.6%, 0k, Sức 6 | 3.14 | 0 | -1.84 | -0.59 | silver obvious |
| j67 | tm96a.a3 | 5 | 10 | 100%, 0k, Sức 0 | 65.6%, 0k, Sức 6 | 3.14 | 20.86 | 11.85 | -2.87 | silver obvious |
| j67 | tm96a.a5 | 5 | 20 | 100%, 0k, Sức 0 | 65.6%, 0k, Sức 8 | 6.27 | 0 | -0.11 | -0.02 | ok (hesitate) |
| j67 | tm96a.a6 | 5 | 10 | 100%, 0k, Sức 0 | 65.6%, 0k, Sức 6 | 3.14 | 0 | -1.84 | -0.59 | silver obvious |
| j67 | tm96b.b1l | 5 | 90 | 100%, 0k, Sức 0 | 40.6%, 0k, Sức 20 | 28.24 | 0 | 3.13 | 0.11 | ok (hesitate) |
| j67 | tm96b.b2a | 5 | 20 | 100%, 0k, Sức 0 | 65.6%, 0k, Sức 8 | 6.27 | 9.73 | 6.27 | -0.55 | silver obvious |
| j67 | tm96b.b3a | 5 | 65 | 45%, 0k, Sức 0 | 12.6%, 0k, Sức 20 | 20.39 | -11.22 | -8.12 | 0.15 | ok (hesitate) |
| j67 | tm96b.b3b | 5 | 55 | 100%, 0k, Sức 0 | 52.6%, 0k, Sức 20 | 17.25 | 0 | 1.75 | 0.1 | ok (hesitate) |
| j67 | tm96c.c1o | 5 | 65 | 100%, 0k, Sức 0 | 47.6%, 0k, Sức 20 | 20.39 | 0 | 1.96 | 0.1 | ok (hesitate) |
| j67 | tm96c.c2 | 5 | 65 | 50.25%, 0k, Sức 0 | 17.85%, 0k, Sức 20 | 20.39 | -18.52 | -20.45 | -0.09 | ok (hesitate) |
| j67 | tm96c.c4b | 5 | 90 | 45%, 0k, Sức 0 | 5.6%, 0k, Sức 20 | 28.24 | -15.53 | -9.7 | 0.21 | ok (hesitate) |
| j67 | tm96c.c5 | 5 | 165 | 35%, 0k, Sức 0 | 5%, 0k, Sức 20 | 51.76 | -33.65 | -8.75 | 0.48 | other road obvious |
| j72 | th_thuoc#1 | 5 | 40 | 75%, 1k, Sức 0 | 45%, 1k, Sức 0 | 12.55 | -4.14 | 4.65 | 0.7 | other road obvious |
| j72 | rv_thuoc#1 | 5 | 15 | 75%, 1k, Sức 0 | 65%, 5k, Sức 7 | 4.71 | -2.18 | -3.11 | -0.2 | ok (hesitate) |
| j72 | rv_tham_om#1 | 5 | 10 | 80%, 1k, Sức 0 | 70%, 4k, Sức 6 | 3.14 | -1.63 | -2.8 | -0.38 | silver obvious |
| j72 | thuoc_cam#1 | 5 | 15 | 100%, 1k, Sức 0 | 90%, 5k, Sức 7 | 4.71 | -1 | -1.93 | -0.2 | ok (hesitate) |
| j72 | rv_con_om#1 | 5 | 15 | 85%, 1k, Sức 0 | 75%, 5k, Sức 7 | 4.71 | -1.71 | -2.64 | -0.2 | ok (hesitate) |
| j72 | bo_chung#2 | 5 | 30 | 100%, 1k, Sức 0 | 50%, 1k, Sức 0 | 9.41 | -1 | 3.71 | 0.5 | other road obvious |
| j72 | loi_thoi#2 | 5 | 10 | 65%, 1k, Sức 0 | 55%, 4k, Sức 6 | 3.14 | -2.1 | -3.27 | -0.37 | silver obvious |
| j72 | bac_mat#2 | 5 | 20 | 100%, 1k, Sức 0 | 100%, 1k, Sức 0 | 6.27 | 8.73 | 15 | 1 | other road obvious |
| j72 | chuoc_sv#1 | 5 | 30 | 100%, 1k, Sức 0 | 81%, 8k, Sức 14 | 9.41 | -1 | -2.71 | -0.18 | ok (hesitate) |
| j72 | qua_tet#1 | 5 | 20 | 55%, 1k, Sức 0 | 42%, 6k, Sức 10 | 6.27 | -3.82 | -5.03 | -0.19 | ok (hesitate) |
| j72 | ao_bien#1 | 5 | 30 | 55%, 2k, Sức 0 | 36%, 9k, Sức 14 | 9.41 | -6.24 | -7.95 | -0.18 | ok (hesitate) |
| j72 | tham_o#1 | 5 | 20 | 40%, 2k, Sức 0 | 27%, 7k, Sức 10 | 6.27 | -5.76 | -6.97 | -0.19 | ok (hesitate) |
| j72 | vay_bac#1 | 5 | 66 | 100%, 1k, Sức 0 | 60%, 15k, Sức 20 | 20.71 | -1 | -5.91 | -0.24 | ok (hesitate) |
| j72 | rv_ngheo#1 | 5 | 30 | 100%, 1k, Sức 0 | 81%, 8k, Sức 14 | 9.41 | -1 | -2.71 | -0.18 | ok (hesitate) |
| j72 | rv_huong#1 | 5 | 10 | 50%, 2k, Sức 0 | 40%, 5k, Sức 6 | 3.14 | -3.57 | -4.75 | -0.38 | silver obvious |
| j72 | canh_thai#1 | 5 | 15 | 55%, 1k, Sức 0 | 45%, 5k, Sức 7 | 4.71 | -3.12 | -4.05 | -0.2 | ok (hesitate) |
| j72 | lc_ao#1 | 5 | 15 | 100%, 1k, Sức 0 | 90%, 5k, Sức 7 | 4.71 | -1 | -1.93 | -0.2 | ok (hesitate) |
| j72 | maid_vay#1 | 5 | 30 | 100%, 1k, Sức 0 | 81%, 8k, Sức 14 | 9.41 | -1 | -2.71 | -0.18 | ok (hesitate) |
| j72 | sv_luong#1 | 5 | 15 | 100%, 1k, Sức 0 | 50%, 1k, Sức 0 | 4.71 | -1 | 1.35 | 0.5 | other road obvious |
| j72 | dt_che#1 | 5 | 20 | 100%, 1k, Sức 0 | 100%, 1k, Sức 0 | 6.27 | -1 | 5.27 | 1 | other road obvious |
| j72 | xc_uoc#1 | 5 | 20 | 55%, 1k, Sức 0 | 42%, 6k, Sức 10 | 6.27 | -3.82 | -5.03 | -0.19 | ok (hesitate) |
| j72 | xc_hoimon#1 | 5 | 30 | 100%, 1k, Sức 0 | 60%, 2k, Sức 0 | 9.41 | -1 | 3.65 | 0.49 | other road obvious |
| j72 | dong_tam#1 | 5 | 8 | 100%, 1k, Sức 0 | 90%, 4k, Sức 6 | 2.51 | -1 | -2.74 | -0.69 | silver obvious |
| j72 | giau_cn#2 | 5 | 20 | 55%, 1k, Sức 0 | 60%, 1k, Sức 0 | 6.27 | -3.82 | 2.76 | 1.05 | other road obvious |
| j72 | th_trungcuu#2 | 5 | 10 | 55%, 1k, Sức 0 | 45%, 4k, Sức 6 | 3.14 | -2.41 | -3.59 | -0.37 | silver obvious |
| j72 | hh_trungthu#2 | 5 | 40 | 100%, 1k, Sức 0 | 55%, 1k, Sức 0 | 12.55 | -1 | 5.9 | 0.55 | other road obvious |
| j72 | hh_trungcuu#2 | 5 | 30 | 100%, 1k, Sức 0 | 45%, 1k, Sức 0 | 9.41 | -1 | 3.24 | 0.45 | other road obvious |
| j72 | hh_doanngo#1 | 5 | 10 | 65%, 2k, Sức 0 | 55%, 5k, Sức 6 | 3.14 | -3.1 | -4.27 | -0.37 | silver obvious |
| j72 | th_aodong#1 | 5 | 20 | 65%, 2k, Sức 0 | 52%, 7k, Sức 10 | 6.27 | -4.2 | -5.4 | -0.19 | ok (hesitate) |
| j72 | tv_mua#1 | 5 | 15 | 65%, 1k, Sức 0 | 55%, 5k, Sức 7 | 4.71 | -2.65 | -3.58 | -0.2 | ok (hesitate) |
| j72 | maid_tet#1 | 5 | 10 | 100%, 1k, Sức 0 | 90%, 4k, Sức 6 | 3.14 | -1 | -2.18 | -0.37 | silver obvious |
| j72 | fam_muoi#1 | 5 | 20 | 50%, 1k, Sức 0 | 37%, 6k, Sức 10 | 6.27 | -4.14 | -5.35 | -0.19 | ok (hesitate) |
| j72 | fam_cn#1 | 5 | 15 | 55%, 1k, Sức 0 | 45%, 5k, Sức 7 | 4.71 | -3.12 | -4.05 | -0.2 | ok (hesitate) |
| j72 | fam_td#1 | 5 | 40 | 100%, 1k, Sức 0 | 74%, 10k, Sức 19 | 12.55 | -1 | -3.88 | -0.23 | ok (hesitate) |
| jecon | Dò la ↔ Tự đi dò la | 5 | 15 | 31%, 2k, Sức 0 | 19%, 2k, Sức 0 | 4.71 | -7 | -10.03 | -0.64 | silver obvious |
| jecon | Mua chuộc ↔ Sai cung nữ lấy lòng | 5 | 40 | 5%, 2k, Sức 0 | 5%, 2k, Sức 0, +8.3k | 12.55 | -16.77 | -12.56 | 0.34 | other road obvious |
| jecon | Rút thẻ bài ↔ Nhờ ơn người quen | 5 | 40 | 34%, 2k, Sức 0 | 34%, 2k, Sức 0, +10.0k | 12.55 | -10.28 | -7.73 | 0.2 | ok (hesitate) |
| jrest | Nghỉ ngơi dưỡng sức ↔ Nghỉ ngơi một lát ×N | 5 | 6 | 100%, 2k, Sức 0 | 100%, 4k, Sức 0 | 1.88 | 0.12 | 0 | -0.06 | ok (hesitate) |
| jecon | Chu toàn lễ nghĩa ↔ Bớt lễ nghĩa | 5 | 48 | 100%, 0k, Sức 0 | 100%, 0k, Sức 0, +12.6k | 15.06 | 0 | 2.43 | 0.16 | ok (hesitate) |
| j68 | giftArrive · Nhận, đáp lễ hậu hĩnh | 5 | 20 | 100%, 0k, Sức 0 | 100%, 0k, Sức 0 | 6.27 | 0.6 | 6 | 0.86 | other road obvious |
| j68 | strayCat · Giữ lại nuôi | 5 | 5 | 100%, 0k, Sức 0 | 60%, 0k, Sức 3 | 1.57 | 3.93 | 2.49 | -0.36 | silver obvious |
| j68 | leakRoof · Bỏ bạc thuê thợ ngay | 5 | 30 | 100%, 0k, Sức 0 | 100%, 0k, Sức 6 | 9.41 | -4.53 | 8.67 | 1.4 | other road obvious |
| j68 | letterHome · Gửi bạc về nhà | 5 | 30 | 100%, 0k, Sức 0 | 100%, 0k, Sức 2 | 9.41 | 17.59 | 9.67 | -0.84 | silver obvious |
| j68 | eunuchSqueeze · Đưa bạc cho xong | 5 | 15 | 100%, 0k, Sức 0 | 86%, 0k, Sức 0 | 4.71 | -1.37 | 5.67 | 1.5 | other road obvious |
| j68 | embroidery · Thuê thợ thêu ngoài cung | 5 | 35 | 100%, 0k, Sức 0 | 63%, 0k, Sức 10 | 10.98 | -5.56 | 6.14 | 1.07 | other road obvious |
| j68 | flowerBloom · Mời các phi tần ngắm hoa | 5 | 15 | 100%, 0k, Sức 0 | 34%, 0k, Sức 0 | 4.71 | 0.72 | 0.68 | -0.01 | ok (hesitate) |
| j68 | proudVisit · Nhún nhường tiếp đãi | 5 | 10 | 100%, 0k, Sức 0 | 100%, 0k, Sức 0 | 3.14 | 11.53 | -0.83 | -3.09 | silver obvious |
| j68 | thMama · Biếu ma ma chút quà | 5 | 15 | 100%, 0k, Sức 0 | 100%, 0k, Sức 0, +3.0k | 4.71 | -3.37 | 5 | 1.78 | other road obvious |
| j68 | docCheck · Để thái y kê thuốc bổ | 5 | 20 | 100%, 0k, Sức 0 | 100%, 0k, Sức 0, +3.0k | 6.27 | -4.61 | -1.43 | 0.51 | other road obvious |
| j68 | docCheck · Hỏi thăm dò chuyện các cung | 5 | 10 | 41%, 0k, Sức 0 | 100%, 0k, Sức 0, +3.0k | 3.14 | -5.34 | -1.43 | 0.98 | other road obvious |
| j68 | painter · Bỏ bạc nhờ vẽ cho đẹp | 5 | 30 | 100%, 0k, Sức 0 | 69%, 0k, Sức 4 | 9.41 | -2.41 | 5.44 | 0.83 | other road obvious |
| j68 | musician · Học một khúc mới | 5 | 10 | 100%, 0k, Sức 6 | 100%, 0k, Sức 0, +3.0k | 3.14 | -5.14 | 5 | 2.53 | other road obvious |
| j68 | musician · Nhờ phổ nhạc bài thơ dâng Hoàng thượng | 5 | 20 | 49%, 0k, Sức 0 | 100%, 0k, Sức 0, +3.0k | 6.27 | -2.01 | 5 | 1.12 | other road obvious |
| j68 | newGirlAdvice · Nhận làm người dưới trướng | 5 | 15 | 100%, 0k, Sức 0 | 100%, 0k, Sức 4 | 4.71 | 1.5 | 19.33 | 3.79 | other road obvious |
| j68 | heatStroke · Xin đá lạnh hầm băng | 5 | 20 | 100%, 0k, Sức 0 | 38%, 0k, Sức 8 | 6.27 | -4.94 | 2.47 | 1.18 | other road obvious |
| j68 | snowDay · Phát áo bông cho cung nhân | 5 | 25 | 100%, 0k, Sức 0 | 100%, 0k, Sức 10 | 7.84 | 10.82 | 8 | -0.36 | silver obvious |
| j68 | springAllergy · Mời Trương Minh Viễn kê thuốc | 5 | 15 | 100%, 0k, Sức 0 | 40%, 0k, Sức 2 | 4.71 | -3.71 | -1.33 | 0.5 | other road obvious |
| j68 | stormNight · Thắp hương cầu an cho cung | 5 | 10 | 100%, 0k, Sức 0 | 34%, 0k, Sức 6 | 3.14 | 14.2 | -2.59 | -4.2 | silver obvious |
| j68 | stormNight · Cứu người, cho thuốc men | 5 | 15 | 100%, 0k, Sức 4 | 34%, 0k, Sức 6 | 4.71 | 22.84 | -2.59 | -5.4 | silver obvious |
| j68 | famineDonate · Quyên nhiều bạc | 5 | 60 | 100%, 0k, Sức 0 | 100%, 0k, Sức 6 | 18.82 | 19.02 | 16 | -0.16 | ok (hesitate) |
| j68 | famineDonate · Góp chút ít cho phải lễ | 5 | 10 | 100%, 0k, Sức 0 | 100%, 0k, Sức 6 | 3.14 | -1.93 | 16 | 4.48 | other road obvious |
| j68 | borderNews · Thêu cờ, may áo gửi quân | 5 | 15 | 100%, 0k, Sức 10 | 100%, 0k, Sức 0, +3.0k | 4.71 | 14.26 | 5 | -1.97 | silver obvious |
| j68 | rumorPreg · Cho người dò cho chắc | 5 | 15 | 45%, 0k, Sức 0 | 100%, 0k, Sức 0, +3.0k | 4.71 | -6.42 | 5 | 2.43 | other road obvious |
| j68 | rumorPreg · Sang chúc mừng thăm dò | 5 | 10 | 46%, 0k, Sức 0 | 100%, 0k, Sức 0, +3.0k | 3.14 | -3.82 | 5 | 2.2 | other road obvious |
| j68 | rumorEmpLove · Hỏi thái giám Kính sự phòng | 5 | 15 | 50%, 0k, Sức 0 | 41%, 0k, Sức 0, +3.0k | 4.71 | -4.49 | -19.61 | -3.21 | silver obvious |
| j68 | rumorEmpLove · Sang thân thiết với nàng | 5 | 10 | 100%, 0k, Sức 0 | 41%, 0k, Sức 0, +3.0k | 3.14 | -4.14 | -19.61 | -3.87 | silver obvious |
| j68 | silkAllot · Bỏ bạc may thêm cho cả hai | 5 | 30 | 100%, 0k, Sức 0 | 100%, 0k, Sức 0, +3.0k | 9.41 | -3.2 | 16.33 | 2.08 | other road obvious |
| j68 | templeRite · Cúng dầu đèn hậu hĩnh | 5 | 25 | 100%, 0k, Sức 0 | 100%, 0k, Sức 8 | 7.84 | 9.49 | 8.67 | -0.11 | ok (hesitate) |
| j68 | fortuneNun · Bỏ bạc xin xem một quẻ | 5 | 15 | 100%, 0k, Sức 0 | 39%, 0k, Sức 0 | 4.71 | -4.21 | 5.24 | 2.01 | other road obvious |
| j68 | fortuneNun · Treo bùa cho cung nhân yên tâm | 5 | 10 | 100%, 0k, Sức 0 | 39%, 0k, Sức 0 | 3.14 | -1.47 | 5.24 | 1.68 | other road obvious |
| j68 | rumorTH · Hỏi ma ma thân tín của Thái hậu | 5 | 15 | 50%, 0k, Sức 0 | 100%, 0k, Sức 0, +3.0k | 4.71 | -4.49 | 5 | 2.02 | other road obvious |
| j68 | rumorFavor · Mua tin Kính sự phòng | 5 | 20 | 55%, 0k, Sức 0 | 100%, 0k, Sức 0, +3.0k | 6.27 | -5.58 | 5 | 1.69 | other road obvious |
| j68 | lotusSeason · Cùng làm, dâng lên | 5 | 10 | 100%, 0k, Sức 6 | 100%, 0k, Sức 5 | 3.14 | 2.53 | 3.5 | 0.24 | ok (hesitate) |
| j68 | droughtPrayer · Lén mua nước sạch ngoài cung | 5 | 20 | 100%, 0k, Sức 0 | 100%, 0k, Sức 10 | 6.27 | -8.61 | 26.33 | 5.57 | other road obvious |
| act | deck · Hối lộ Kính sự phòng | 5 | 30 | 95%, 2k, Sức 0 | — |  |  |  |  | UNPRICED (gain only in words: 2 tuần tới dễ được lật thẻ: khả năng thấp → dễ hơn một bậc) |
| act | deck · Tụng kinh, làm việc thiện | 5 | 10 | 95%, 2k, Sức 0 | — |  |  |  |  | NO ACT WITHOUT SILVER for duc |
| act | deck · Cài tai mắt | 5 | 25 | 80%, 2k, Sức 0 | — |  |  |  |  | NO ACT WITHOUT SILVER for mat |
| act | deck · Dưỡng nhan | 5 | 30 | 92%, 2k, Sức 0 | — |  |  |  |  | NO ACT WITHOUT SILVER for sac |
| act | deck · Phát chẩn cho cung nhân [danh] | 5 | 40 | 85%, 2k, Sức 0 | 75%, 2k, Sức 5 | 12.55 | 3.241 | 4.772 | 0.47 | other road obvious |
| act | deck · Múa trong yến tiệc [sung] | 5 | 10 | 68%, 4k, Sức 20 | 51%, 2k, Sức 10 | 3.14 | 2.376 | 2.538 | 0.07 | ok (hesitate) |
| act | deck · Tự học Nấu nướng: nấu món | 5 | 6 | 95%, 2k, Sức 15 | — |  |  |  |  | UNPRICED (gain only in words: tiến bộ Nấu nướng +1..2 · tự tay chơi thì ra Cháo trắng hành) |
| act | deck · Cầu tự ở Phụng Tiên điện | 5 | 10 | 50%, 2k, Sức 0 | — |  |  |  |  | UNPRICED (gain only in words: 2 tháng dễ có thai hơn (nay khả năng rất thấp)) |
| act | deck · Nghỉ ngơi dưỡng sức [suc] | 5 | 6 | 95%, 4k, Sức 0 | 95%, 1k, Sức 0 | 1.88 | 0.646 | 2.217 | 2.43 | other road obvious |
| act | talk:emp · Dâng một cành hoa [sung] | 5 | 5 | 50%, 2k, Sức 0 | 51%, 2k, Sức 10 | 1.57 | 1.121 | 2.538 | 1.26 | other road obvious |
| act | talk:ty · Bài thuốc dễ thụ thai | 5 | 40 | 95%, 2k, Sức 0 | — |  |  |  |  | UNPRICED (gain only in words: 3 tháng dễ có thai hơn) |
| act | talk:ty · Mời làm thái y tâm phúc | 5 | 50 | 95%, 2k, Sức 0 | — |  |  |  |  | UNPRICED (gain only in words: dễ phát hiện xạ hương, độc; bệnh của con nhẹ hơn) |
| act | talk:ty · Học hỏi y lý | 5 | 10 | 95%, 2k, Sức 0 | — |  |  |  |  | NO ACT WITHOUT SILVER for art |
| act | talk:ksp · Đút lót lật thẻ | 5 | 30 | 95%, 2k, Sức 0 | — |  |  |  |  | UNPRICED (gain only in words: 2 tuần tới dễ được lật thẻ: khả năng thấp → dễ hơn một bậc) |
| act | talk:ksp · Hỏi sở thích Hoàng thượng | 5 | 15 | 80%, 2k, Sức 0 | — |  |  |  |  | UNPRICED (gain only in words: biết thêm một điều ngài thích) |
| act | talk:peddler · Mua Nghiên mực Đoan Khê | 5 | 60 | 95%, 2k, Sức 0 | — |  |  |  |  | UNPRICED (gain only in words: Tặng Hoàng thượng: hợp ý) |
| act | talk:peddler · Mua Thuốc giải độc | 5 | 60 | 95%, 2k, Sức 0 | — |  |  |  |  | UNPRICED (gain only in words: Để trong rương: cứu một lần trúng độc) |
| act | talk:peddler · Mua Đệm gấm | 5 | 12 | 95%, 2k, Sức 0 | — |  |  |  |  | UNPRICED (gain only in words: Tặng: êm ấm, ai cũng nhận) |
| act | talk:peddler · Mua Gấm Tô Châu [danh] | 5 | 120 | 95%, 2k, Sức 0 | 75%, 2k, Sức 5 | 37.65 | 0.341 | 4.772 | 13.01 | other road obvious |
| act | talk:peddler · Mua Thuốc an thai | 5 | 15 | 95%, 2k, Sức 0 | — |  |  |  |  | UNPRICED (gain only in words: Dùng khi có thai: nguy cơ sảy giảm nửa) |
| act | talk:peddler · Mua Lụa Hàng Châu | 5 | 30 | 95%, 2k, Sức 0 | — |  |  |  |  | NO ACT WITHOUT SILVER for sac |
| act | talk:fallen · Đưa cơm áo | 5 | 20 | 95%, 2k, Sức 0 | — |  |  |  |  | NO ACT WITHOUT SILVER for duc |
| act | talk:rival · Giúp đỡ nàng | 5 | 20 | 95%, 2k, Sức 0 | — |  |  |  |  | NO ACT WITHOUT SILVER for rel |
| act | talk:rival · Dò la | 5 | 15 | 29%, spyk, Sức 0 | — |  |  |  |  | UNPRICED (gain only in words: Bạc -20) |
| act | talk:rival · Bỏ độc vào trà nàng | 5 | 20 | 5%, poisonk, Sức 0 | — |  |  |  |  | UNPRICED (gain only in words: lộ: tội chết — năm đầu được tha một lần: giáng một bậc, cấm ) |
