# REVERT2 log

STATUS — depth 5 (get_session lineage.depth); START_CTX ~3 % (used_tokens reads 0; estimate). Coordinator #23 session_01D3E3NbPDzH9MSjxsnNqXEn. 0 gens.

## JOB 1 — WINTER L1803 (0 gens) — DONE
New files dev/art/winter1/s62_tN_dong_L1803.txt (+ .keep, keep_check PASS; keep --all 525 PASS). Gate: `check_store.py <f> --scope tpN --age a22`.
| rank | base | change | chars | gate |
|---|---|---|---|---|
| t1 | thu_comoi/s62_t1_THU_fix_L1794 (current t1: sash at waist) | made winter like t2/t3: square collar → G25 crossed collar (mint mist band, plum blossoms), palette olive/lilac → ice blue/mint mist, lilac → plum blossom, no phi bạch, fur W01_L1803, caption "Mùa Đông · Đáp ứng · L1803" | 9 005 | FAIL only M06/W04 (gauze fabric kept, pt7) |
| t1 _g28 | same | + G28 opaque fabric lines | 9 049 | PASS |
| t2 / t3 | sheet s62_t{2,3}_dong | no phi bạch, fur W01_L1803 | 8 523 / 9 412 | FAIL only M06/W04 (gauze) |
| t2 / t3 _g28 | same | + G28 opaque fabric | 8 561 / 9 450 | PASS |
| t4 | sheet s62_t4_dong_noangle (sheet cell) | "low square neckline, NO crossed collar" → "a CROSSED collar with a richer gold-brocade edge, the rounded lower edge of her small capelet lying visibly over the crossed collar"; fabric → B26 satin (gate); CAPELET CUT → current S13; no phi bạch; fur W02_L1803 | 9 710 | PASS |
| t5 | sheet | fabric → B26 satin (gate); no phi bạch; fur W02_L1803; cloud collar kept | 8 777 | PASS |
| t6 | sheet | no phi bạch; fur W02_L1803; two capes kept | 9 567 | PASS |
| t7 | sheet | S14 → S14_L1794 (gate; drops necklace + rubies); fur W03_L1803_T7 | 9 526 | PASS |
| t8 | sheet | unchanged (fur kept = sheet sentence, accepted as W03_L1803_T8) | 9 515 | PASS |
Fabric lines (pt7): t1–t3 _L1803 = "thin, light, flowing silk and gauze" + "Light, soft, thin flowing silk" (sheet); _L1803_g28 = "soft, light, flowing OPAQUE silk, never see-through" + W04. t4/t5 = satin đoạn (B26); t6–t8 = sheet (brocade).
Fur forms (check_store W_L1803, skip line next to S13): t1–t3 "THICK … DOUBLE the width and thickness of a slim trim, about four fingers wide"; t4–t6 "VERY THICK … twice as wide and twice as thick as at the three lower ranks, about two hands wide"; t7 "WIDE, THICK … a little wider and fuller than at the ranks below, about two and a half hands"; t8 sheet sentence. RISK: t8 keeps the plain sheet sentence while t4–t7 get number widths → t8 fur may come out thinner than t4–t7; owner may want t8 = old W03.
Rules: G1 set (SWAP56 CANCELLED, L1803: t5 Phi = vân kiên cloud collar, t6 QP = two layered short capes, all seasons); G55 added (fur L1803). No cloak added (owner being asked).
Files still carrying the swap (NOT edited): builder dev/art/t8-prompt-B/build.py (t5 branch CAPE5 capelet/pearl net, CAPE6_TWO = cloud collar on t6, SWAP56 comments ~l.1081-1098); dev/art/seasons4/make_comoi.py l.40-43; thu_comoi t5 s62_t5_THU_COMOI, COMOIc, fix_L1797 (cape/stole + pearl yoke) and t6 COMOI, COMOIc–n, revert_L1714, revert_sq_L1719, fix_L1723, fix2_L1726, fix_L1776, fix_L1794, fix_L1801 (yunjian cape); seasons4 s62_t5/t6_HAN_BAC*, s62_t6_HAN_BAC_gon/open/vai*, s62_t5/t6_XUAN_COMOI; dong_hientai s62_t5_DONG_HIENTAI(_cloak,_vk), s62_t6_DONG_HIENTAI(_cloak..cloak6,_vk); also b26, capes, f2, flower, swap56, owner-copy (old tests). Not affected: seasons4 HAN_LADDER5_L1794 t5/t6 (no cape piece), hạ s62_t6_ha_DUONG_L1801 ("no cape, no cloud collar").

## JOB 2 — PHI BẠCH IVORY + THIN GOLD EDGE (owner L1804, L1805) — DONE (0 gens)
Rule G56 added (cites L1801/L1804/L1805; exception to B20/A31 for phi bạch only; t1–t6 only, t7/t8 none in any season, t6 thicker). Change = ONE sentence per file (the "PHI BẠCH:" sentence; PLACEMENT sentence untouched) + caption " · phi bạch ngà L1804" where a caption exists.
| file (new) | base | chars | gate |
|---|---|---|---|
| thu_comoi/s62_t1_THU_fix_L1804 | s62_t1_THU_fix_L1794 | 9 143 | PASS |
| thu_comoi/s62_t2_THU_fix_L1804 | s62_t2_THU_fix_L1776 | 8 801 | PASS |
| thu_comoi/s62_t3_THU_fix_L1804 | s62_t3_THU_fix_L1776 | 9 722 | PASS |
| thu_comoi/s62_t4_THU_sqtest_L1804 | s62_t4_THU_revert_sqtest_L1714 | 9 743 | FAIL B26/M06/S13 — same as base (pre-existing, fabric/capelet; not touched) |
| thu_comoi/s62_t5_THU_fix_L1804 | s62_t5_THU_fix_L1797 | 9 414 | FAIL B26/M06 — same as base (pre-existing gauze on t5) |
| thu_comoi/s62_t6_THU_fix_L1804 (thick form) | s62_t6_THU_fix_L1801 | 9 951 | PASS |
| seasons4/s62_t4_ha_DUONG_L1804 | s62_t4_ha_DUONG | 9 530 | FAIL B26/M06/S13 — same as base |
| seasons4/s62_t5_ha_DUONG_L1804 | s62_t5_ha_DUONG | 9 327 | FAIL B26/M06 — same as base |
| seasons4/s62_t6_ha_DUONG_L1804 (thick form) | s62_t6_ha_DUONG_L1801 | 9 914 | PASS |
No new gate failure from the ivory colour (TWO-COLOUR/B20 checks did not flag it → no accepted form needed). t7/t8: thu fix5/fix7_L1794 have no phi bạch, winter L1803 none, no hạ t7/t8 files. Old hạ s62_t6_ha_DUONG (pre-L1801) left as is. keep_check PASS (--all 534). Builder phi_bach() + gate S12 text still say "secondary colour" (not changed).

## L1814 follow-up
Owner L1814: t1–t3 fabric = G28 opaque → the _g28 twins became s62_t{1,2,3}_dong_L1803.txt (gauze versions dropped). All 8 winter _L1803 files gate PASS. No cloaks. t8 fur = sheet sentence (owner: HH keep).
