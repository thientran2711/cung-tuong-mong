# POSEFIX1 — G45 jade pendant visible: pose fix at the source (owner L1622, Foreman C #15)
depth 6 · START_CTX ~4 % (used_tokens read 0; estimate) · **0 gens, 0 credits** · 0 stored prompt files edited (sources only) → keep_check --all: 273 sidecars PASS

Owner L1622 (G45): hands / the held item in front of the waist are FINE (pendant = a layer behind the hands in game, like the L1619 letter picture).
What must not cover the pendant: sleeves, robe flaps (tà áo), shawl, cape, any cloth. So NO item was moved away from the waist; only cloth words were added.

## 1. Dropped (never drawn again)
- **P30-M6** "one hand adjusting her belt pendant…" and **P30-C3** "hands folded at her waist under the long sleeves…".
  The lines stay in `dev/art/POSES_30.md` marked `[DROPPED G45 owner L1622: never drawn]` (so the P30 index of every other pose stays the same).
  `build_all.py plan()`: a THIRD re-pick pass (same method as A41 necklace / G36 shawl): a cell whose plan pose is M6/C3 takes another allowed pose; every other cell keeps exactly its pose.
  Proof (plan dump before/after, 5 ages): changed cells = exactly the M6/C3 cells (a18 29, a26 27, a36 29, a51 28, a65 28 = 141), 0 other changes, 0 M6/C3 left.
- kieungao2 (look back) + hienlanh0 (looking down): still banned by `_banned` (E2 / D3d), unchanged.

## 2. COVER + RISK poses fixed at the source (36 texts)
Same pose, same hand/item; added at the end: **", her sleeves kept clear of the front of her waist"** (no "jade" word: spec5 poses are also maid poses, G43; no "sash/shawl/stole" word: X05/_banned t7–t8; no lively/gesture regex words, so the plan does not move).
- `dev/art/POSES_30.md` (16): L1 L4 L5 L6 L8 L9 · M1 M7 M9 · C1 C4 C5 C6 C7 C8 C9. Example M1 old "a small step forward, the item held at her waist with both hands, head tilted gracefully" → new "…head tilted gracefully, her sleeves kept clear of the front of her waist".
- `dev/art/t8-prompt-B/build.py` SPEC5_POSES (13 texts with {prop}): numi0, kieungao3, kieungao4, kieungao5, numi1, numi3, numi5, hienlanh1, dangi3, thamvong0, thamvong4, thamvong5, thanhnha3.
- SPEC5_ADAPT values (7): numi2 lantern→"holding {prop} in one hand, mid-step, the other hand lifting her sleeve", hienlanh2 offer, hienlanh5 walk, dangi2 dance, thamvong2+thanhnha2 (one shared ADAPT text) both hands, thanhnha1 pipa, thanhnha5 turning lightly. (FRONTAL / DEPET prefixes unchanged.)

## 3. ONE common clause (shared source)
`dev/art/master_common.py`: **`JADE_CLEAR = "the jade pendant at her waist stays fully visible, no sleeve, robe flap or cloth over it"`** (87 chars; "shawl" left out because X05 bans that word in t7/t8 poses; "cloth" covers it).
`build_all.py g45_post()`: added at the END of the pose slot **after the B26 length fit**, only while the prompt stays ≤ 10 000:
jade prompt → JADE_CLEAR (it already says "no sleeve", so the pose's own sleeve clause is not repeated); non-jade prompt with a COVER/RISK pose → the sleeve clause; else nothing and the cell is logged in `G45_OVER`.
→ G45 never makes the fit cut a sentence (A38). First try (clause inside the pose before the fit) made B26 cut ANGLE / background / "no teeth" in 13 cells — rejected, that is why it is post-fit.
Season path (`_build_season2`): same g45_post after winter_g28.season + its fit. `check()` invariant ignores the two G45 clauses.

## 4. Gate: check_store G45
`check_store.py g45_fails` (wired into check_text, selftest 7 cases pass): FAIL on hands folded/hidden UNDER the sleeves, sleeves draped/falling OVER the waist/sash/pendant, shawl/stole/cape/scarf/robe flap/cloth over the waist / sash front / pendant, "adjusting her belt pendant". Negated wording (no/never/not/without …) passes. `--self`: same 2 old problems as before (S14, S19 PROOF MISMATCH), nothing new.
Stored prompts that now FAIL G45 (old M6/C3 text, need a rebuild from the builder — foreman's call, no gen): `rank8-old4/m29_t4.txt`, `rank8-s62/g20/m29_t4.txt`, `rank8-t78/s54_t7.txt`, `s59_t8.txt`, `s23_t7.txt`, `s17_t8.txt`, `s07_t7.txt`.

## 5. Builder run a18 (896 cells, before = HEAD 1dc5afb vs after)
0 new gate FAIL · 22 old FAIL fixed (= the M6/C3 cells, now G45) · 22 FAIL left = all old (F16 fruit 8, X08 phoenix 12, X11 teeth 2) · 0 cells > 10 000 (max 9 998) · 0 cells with any non-pose text changed (no cut).
333 cells carry JADE_CLEAR, 342 the sleeve clause.
**OVER (clause left out, too long, a18 — 12):** jade: s44 t5 (9 962), s59 t5 (9 948) · sleeve: s26 s29 s32 s33 s35 s42 s43 s47 s54 s59 t7 (9 954–9 998). Owner words NOT cut; the foreman decides (A38).
Other ages: see §7.

## 6. NOT done (outside a source edit; foreman decides)
Hand-made season prompt files (dapung4, thu_comoi, seasons4, dong_hientai, phi_cape_l1596 …) are made by their own make scripts, not build_all; they do not get JADE_CLEAR until their make script imports `master_common.JADE_CLEAR` (as with OUTER_IN). 598 stored jade prompts; **62 would go over 10 000 with +90 chars** (list below).

## 7. Other ages (builder run before/after, 896 cells each) + `--check`
- `build_all.py --check` a18: 548 FAIL cells before = 548 after, identical messages (all old: store invariant / X08 / F16 …); 0 new. Nữ đế path: JADE_CLEAR goes at the end of the pose sentence (fixed a crash there: that path has no "The item is in a contrasting colour").
- a26: 0 new FAIL · G45_OVER 7 · 1 cell cut by B26: **s23 t7 a26** (its M6 re-pick pose is longer → ANGLE dropped by the existing B26 rule).
- a36: 22 FAIL (all old) · not diffed.
- a51 / a65: cells > 10 000 ALREADY at HEAD (707 / 644, elder prompts, never cut, HEAD_OVER) → those get NO G45 clause (G45_OVER 581 / 574); 0 new FAIL, 0 new > 10 000. 1 cell cut: **m41 t4 a65** (M6 re-pick → doan_fit drops a repeated "face clearly visible,").
- So the only B26 cuts caused by this job = 2 re-picked M6 cells (s23 t7 a26, m41 t4 a65): the drop itself (owner order), the existing approved fit trimmed boilerplate; foreman may OK or pick a shorter pose.

## Appendix — stored jade prompts that would go over 10 000 with ", " + JADE_CLEAR (+90)
- `dapung4/s62_t2_COMOI_v4.txt` 9978 → 10068
- `dapung4/s62_t2_COMOI_v5.txt` 9962 → 10052
- `dapung4/s62_t3_COMOI_v2.txt` 9947 → 10037
- `dapung4/s62_t3_COMOI_v2c.txt` 9995 → 10085
- `dapung4/s62_t3_COMOI_v2d.txt` 9982 → 10072
- `dapung4/s62_t3_COMOI_v2e.txt` 9949 → 10039
- `dapung4/s62_t3_COMOI_v2f.txt` 9934 → 10024
- `dapung4/s62_t3_COMOI_v5.txt` 9983 → 10073
- `dapung4/s62_t3_quynhan_COMOI.txt` 9982 → 10072
- `dong_hientai/m02_t8_DONG_HIENTAI.txt` 10370 → 10460
- `dong_hientai/m02_t8_DONG_HIENTAI_cloak.txt` 9955 → 10045
- `dong_hientai/m02_t8_DONG_HIENTAI_cloak2.txt` 9967 → 10057
- `dong_hientai/m02_t8_DONG_HIENTAI_cloak3.txt` 9960 → 10050
- `dong_hientai/m02_t8_DONG_HIENTAI_cloak4.txt` 9960 → 10050
- `dong_hientai/m02_t8_DONG_HIENTAI_cloak5.txt` 9969 → 10059
- `dong_hientai/m02_t8_DONG_HIENTAI_cloak7.txt` 9916 → 10006
- `dong_hientai/m02_t8_DONG_HIENTAI_cloak8.txt` 9923 → 10013
- `dong_hientai/m02_t8_DONG_HIENTAI_cloak9c.txt` 9960 → 10050
- `dong_hientai/m02_t8_DONG_HIENTAI_vk.txt` 9993 → 10083
- `dong_hientai/s62_t5_DONG_HIENTAI.txt` 9945 → 10035
- `dong_hientai/s62_t8_DONG_HIENTAI.txt` 10386 → 10476
- `dong_hientai/s62_t8_DONG_HIENTAI_cloak.txt` 9982 → 10072
- `dong_hientai/s62_t8_DONG_HIENTAI_cloak2.txt` 9994 → 10084
- `dong_hientai/s62_t8_DONG_HIENTAI_cloak3.txt` 9987 → 10077
- `dong_hientai/s62_t8_DONG_HIENTAI_cloak4.txt` 9987 → 10077
- `dong_hientai/s62_t8_DONG_HIENTAI_cloak5.txt` 10000 → 10090
- `dong_hientai/s62_t8_DONG_HIENTAI_cloak6.txt` 9982 → 10072
- `dong_hientai/s62_t8_DONG_HIENTAI_cloak7.txt` 9998 → 10088
- `dong_hientai/s62_t8_DONG_HIENTAI_cloak7_LUAMONG_test.txt` 10344 → 10434
- `dong_hientai/s62_t8_DONG_HIENTAI_cloak9.txt` 9992 → 10082
- `dong_hientai/s62_t8_DONG_HIENTAI_vk.txt` 9973 → 10063
- `maid7/gpt/mama_gpt_v5_a51.txt` 9972 → 10062
- `nude-B/prompts/m04_a51.txt` 9933 → 10023
- `nude-B/prompts/m16_a51.txt` 9918 → 10008
- `rank8-t78/s36_t8.txt` 9913 → 10003
- `rank8-t78/s57_t8.txt` 9932 → 10022
- `rank8-t78/s58_t8.txt` 9921 → 10011
- `seasons4/han_bac_base/s62_t5_HAN_BAC_a2128fc.txt` 9977 → 10067
- `seasons4/s62_t3_HAN_BAC.txt` 9923 → 10013
- `seasons4/s62_t3_HAN_BAC_v2.txt` 9994 → 10084
- `seasons4/s62_t3_HAN_BAC_v3.txt` 9954 → 10044
- `seasons4/s62_t3_HAN_BAC_v4.txt` 9953 → 10043
- `seasons4/s62_t3_HAN_BAC_v5.txt` 9992 → 10082
- `seasons4/s62_t3_HAN_BAC_v6.txt` 9988 → 10078
- `seasons4/s62_t5_HAN_BAC.txt` 9977 → 10067
- `seasons4/s62_t5_HAN_BAC_gon.txt` 9994 → 10084
- `seasons4/s62_t5_HAN_BAC_open.txt` 9992 → 10082
- `seasons4/s62_t5_HAN_BAC_open2.txt` 9993 → 10083
- `seasons4/s62_t5_HAN_BAC_open3c.txt` 9926 → 10016
- `seasons4/s62_t5_HAN_BAC_vai.txt` 29912 → 30002
- `seasons4/s62_t6_MINH_LADDER.txt` 9990 → 10080
- `seasons4/s62_t8_dong_LONG3moi.txt` 10035 → 10125
- `thu_comoi/m02_t8_THU_COMOI_v4.txt` 9963 → 10053
- `thu_comoi/m02_t8_THU_COMOI_v5.txt` 9999 → 10089
- `thu_comoi/m02_t8_THU_COMOI_v6.txt` 9981 → 10071
- `thu_comoi/m28_t8_THU_COMOI_v5.txt` 9973 → 10063
- `thu_comoi/m28_t8_THU_COMOI_v6.txt` 9979 → 10069
- `thu_comoi/s62_t5_THU_COMOI.txt` 9912 → 10002
- `thu_comoi/s62_t5_THU_COMOId.txt` 9985 → 10075
- `thu_comoi/s62_t8_THU_COMOI_v3.txt` 9954 → 10044
- `thu_comoi/s62_t8_THU_COMOI_v4.txt` 9973 → 10063
- `thu_comoi/s62_t8_THU_COMOI_v5.txt` 9998 → 10088
