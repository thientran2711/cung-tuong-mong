# spec5pose-sample (W108) — poses = the ORIGINAL spec5 pose table (FIGURE_GATE D.3a), c06 + c25, a18 v0, t1 t4 t5 t6

PRIORITY #1 CHECK: ROOT-31 order + owner ~21:55Z (verbatim in FIGURE_GATE D.3a); source = dev/figwork/spec5.py POSES + consorts_ids.json on tip 63ebbf29. My earlier --pose8 table and head-crop ref were INVENTED and are CANCELLED (not used; branch review/pose8-sample is obsolete, do not use its sheet).
Sheet (row c06, row c25; cols t1 t4 t5 t6): https://ctm-img.victoria-tntt.workers.dev/img/_review/spec5pose-sample/sheet.jpg ; raws img/_review/spec5pose-sample/<cNN>_a18_t<N>_spec5pose_raw.jpg (background kept, sample).
gens = 8, regens = 0; identity ref = her own full t1 (as before: c06 EbYHAZpuuO, c25 UPvO378wny) + style kspkwKx16B (+ swatch at t6). All 8 pass: pose matches the spec5 entry, item = rank 3f item held, face fully visible, lips closed, eyes open, no forehead mark.

## build.py flag `--spec5pose` (everything else byte-identical; golden c06 cmp OK, test_low_all.py OK 2304 builds)
POSES copied verbatim from spec5.py (SPEC5_POSES), personality+index from consorts_ids.json (SPEC5_IDS: c01-06 kieungao 1-6, c07-12 numi, c13-17 hienlanh, c18-22 dangi, c23-27 thamvong, c28-32 thanhnha); pose = POSES[tr][(i+t-1)%6] with i=index-1, suffix ", poised" t5-t6, ", with stately grace" t7-t8. It REPLACES the shared "calm standing pose ... below the chin" + HAND_LOW/hand7 paragraph of build_low/build_t7/build. Identity line gets spec5's "do NOT copy the reference's poses".
Only changes allowed by D.3a: {prop} = the rank's 3f item (article kept: "a thread-bound book"); poses that hold a teacup / a second object / no object keep their movement but hold the rank item (SPEC5_ADAPT, 11 entries; sampled: only c25 t1 'walking while reading an unrolled scroll...' -> 'walking while holding {prop} in both hands, sleeves trailing').
Usage: `python3 build.py cNN --low N v0 --spec5pose` (t1-t6), `cNN --t7 v0 --spec5pose`, `cNN v0 --spec5pose` (t8). Not used for states/triều (no change made there).

## Poses used (a18 = i+t-1)
| fig | spec5 pose | item |
|---|---|---|
| c06 t1 | lifting her skirt hem slightly with one hand as if stepping up a stair, {prop} in the other hand | thread-bound book |
| c06 t4 | turning to look back over her shoulder, body in three-quarter view, {prop} held near her waist | silver-and-enamel hand mirror |
| c06 t5 | turning mid-step while adjusting a gold hairpin with one raised hand, her sleeve sliding back, {prop} in the other hand, poised | silver-gilt palace lantern |
| c06 t6 | standing as a breeze lifts her long silk stole, one hand catching the stole, {prop} in the other hand, poised | jade-and-gold round fan |
| c25 t1 | walking while holding {prop} in both hands, sleeves trailing (adapted from the scroll pose) | woven bamboo flower basket |
| c25 t4 | adjusting a gold hairpin with one raised hand, the other hand holding {prop} | silver-mounted book box |
| c25 t5 | walking forward mid-step with sleeves flowing, {prop} in one hand, poised | coral-and-pearl bead tassel |
| c25 t6 | turning to look back over her shoulder, holding {prop}, poised | white-jade ruyi |
Note: a pose repeats for people/ranks whose (i+t-1)%6 coincides (the spec5 design: 6 poses per personality, rotating by rank).
~100% xong (sample) / owner verdict pending.
