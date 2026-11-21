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

## JOB 3 — SWAP CANCEL on thu + builders + phi_bach()/S12 (0 gens) — DONE
- thu_comoi/s62_t5_THU_fix_L1803s (base fix_L1804, 9 007 ch): "an embroidered light olive pearl-edged cape/stole … beaded shoulder yoke … pearl net … over the WHOLE cape, never only half of it, never hiding the square collar;" → "an embroidered light olive cloud collar (yunjian) over the shoulders with a scalloped gold-thread edge and a fringe of small gold tassels, open at the front, never hiding the square collar;". Kept: square collar, short strand of small pearls across chest, old girdle + jade pendants, ivory phi bạch. NOTE: the pearl net/yoke (with the L1797 "small pearls") went with the swapped cape (winter sheet t5 has none). Gate: B26/M06 only (waived).
- thu_comoi/s62_t6_THU_fix_L1803s (base fix_L1804, 9 998 ch): "an embroidered SOFT silk cloud-collar cape (yunjian) DRAPING softly … scalloped gold-thread edge … gold tassels, open at the front, never rising up the neck, never hiding the square collar," → "TWO layered embroidered light olive SHORT shoulder capes of SOFT silk, one over the other (the upper cape shorter, the lower cape a little longer), DRAPING softly down over the shoulders, never stiff or flat, pearl-edged, open at the front, never rising up the neck, never hiding the square collar,"; "a pearl-edged collar trim" → "a pearl-edged collar and cape trim". No red, thick ivory phi bạch kept. Gate PASS.
- t8-prompt-B/build.py: t5 branch uses new CAPE5_VK (cloud collar, = sheet words) instead of CAPE5_V4; CAPE6_TWO = sheet two-capes words (old value kept as CAPE6_SWAP56 comment). build_all s62 5/6 (store + --season dong) build + gate OK.
- seasons4/make_comoi.py: t5 slot swaps the ladder_base two capes back to the vân kiên (open front), t6 slot swaps the cloud collar back to two capes (open front); outputs renamed seasons4/s62_t{5,6}_XUAN_COMOI_L1803s.txt (9 223 / 9 985; t6 PASS, t5 B26/M06 like its base). NOTE: the script as a whole already stops at t3 (len 10 126 > 10 000, pre-existing); I ran only t5/t6.
- store-all/build_all.py phi_bach(person,has_shawl,rank): G56 ivory + thin gold edge; rank 6 = thick form; rank ≥7 → "". Output equals the L1804 hand files exactly. check_store S12 text = G56 words with {colour} slot (X03 slot still works: colour = "pale IVORY-CREAM silk").
- Rules: G1 + G56 notes updated. keep --all PASS.

## JOB 4 — winter fur = approved G26 ladder (owner L1825) — DONE (0 gens)
dev/art/winter1/s62_tN_dong_L1825.txt = the _L1803 files with ONLY the fur sentence replaced by the gate text VERBATIM: t1–t3 W01 (Lông 1, about a hand's width), t4–t6 W02 (Lông 2, VERY WIDE, about two and a half hands), t7 + t8 W03 (Lông 3, WIDEST, THICKEST, about three and a half hands = seasons4/s62_t8_dong_LONG3moi.txt, checked identical). Chars t1–t8: 8998 8510 9399 9695 8762 9552 9592 9795. Gate PASS ×8, keep PASS ×8. G55 + W_L1803 gate forms marked SUPERSEDED.

## JOB 5 — AUDIT swap round-trip Phi t5 / Quý phi t6 (owner L1829, 0 gens, nothing fixed)
Baselines (pre-swap): thu = rank8-s62/s62_t5.txt + s62_t6.txt (Set A; t6 there is still the ONE-layer cape/stole, pre-G1); winter = winter1/s62_t{5,6}_dong.txt (sheet); xuân = swap56/base/s62_t{5,6}_XUAN_COMOI.txt; builder = swap56/base/s62_t{5,6}.txt. Current: thu *_L1803s, winter *_L1825, xuân *_XUAN_COMOI_L1803s, build_all s62 5/6. Full raw word diff: dev/handover/reports/REVERT2_audit_swap.txt (script REVERT2_audit_swap.py; WHY taken from each file's .keep chain).
| file | sentence | lost / added / changed | WHY |
|---|---|---|---|
| thu t5+t6 | opening | "Full-body standing figure … fair porcelain skin" lost | L1714 row 24 (repeat) |
| thu t5+t6 | looks | "face clearly visible, 3/4 or frontal view" lost | L1714 row 23/24 (allowed in rank8→revert_sq keep) |
| thu t5+t6 | colours (outfit, COLOUR, TWO-COLOUR, HELD ITEM) | ice blue/mint mist → light olive/lilac | L1714 row 21 thu palette |
| thu t5 | outfit | peonies → double hollyhocks; hair flower → deep rose-pink double hollyhock, bloom only | L1714 row 20 species + L1723 |
| thu t5+t6 | outfit | + SQUARE collar block (low square neckline, flat band in 2nd colour) | G53 L1747/L1776 |
| thu t5+t6 | outfit | + "the body motifs never over the borders or bands" | L1776 fix chain |
| thu t5 | outfit | cloud collar + "light olive", "open at the front, never hiding the square collar" | L1803 swap cancel + G53 |
| thu t5 | outfit | + "a SHORT strand of small round pearls swags ACROSS her chest" | L1797 |
| thu t5 | outfit | pearl NET / beaded yoke + small-pearl fringe (L1797 sizes) — LOST in JOB3 (not in pre-swap, it came with the swapped cape) | **DRIFT vs owner L1329/L1598/L1797 (net ordered for Phi)** |
| thu t5+t6 | outfit / hair | + "never covered by sleeve or shawl" (jade pendants), "none/nothing at the ears" | L1627/L1714 ear + pendant rules (fix chain) |
| thu t5+t6 | angle / grace / pose / item / slippers | changed | L1714 rows 22, 23 (new angle, pose, item, toe tips) |
| thu t6 | outfit | ice blue pearl-edged ONE-layer cape/stole → TWO layered SOFT draping short capes, pearl-edged | G1 (two capes) + L1803 + L1797 drape feel (Foreman JOB3) |
| thu t6 | outfit | pre-swap two-cape words "both resting on the shoulders", "never covering the neckline" not used | **DRIFT (my JOB3 wording)** |
| thu t6 | outfit | "necklace and" lost | L1714 row 12 no necklaces |
| thu t6 | luxury | + "with a little jade: small green jade beads set among the pearls" | L1794/L1797 fix chain |
| thu t6 | yellow | "image 2 is only a colour reference…" lost; + pendants never covered | A38 trim (repeat) + L1627 |
| thu t6 | + JEWELLERY: no red stones… | added | L1799 no red |
| thu t5+t6 | PHI BẠCH | mint mist → ivory-cream + thin gold edge; t6 thicker | L1801 + L1804 |
| winter t5 | FABRIC | gauze → satin đoạn | B26 (gate) |
| winter t5+t6 | PHI BẠCH | removed | G34/G36, L1803 pt1 |
| winter t5+t6 | WINTER fur | → W02 Lông 2 | L1825 |
| winter t5+t6 | collar / capes | IDENTICAL to sheet | — |
| xuân t5 _L1803s | outfit | "OPEN at the front (its lobes rest on the shoulders and back, never covering the neck or the square inner neckline)" → "open at the front, never hiding the neck" | **DRIFT (my make_comoi wording)** |
| xuân t6 _L1803s | outfit | "(the upper cape shorter, the lower cape a little longer, both resting on the shoulders, open … pearl-edged)" shortened; "pearl-edged collar and cape trim" → "collar trim" | **DRIFT (length cut to 9 985 + ladder_base still post-swap)** |
| builder t5 | fabric / flowers / shawl | gauze → satin; peonies → double hollyhocks; "a sheer silk shawl" + PHI BẠCH gone | B26 L1283/L1334; flower_outfit L1303; G36 (builder = xuân/đông, no phi bạch) |
| builder t5 | pose | + jade pendant stays visible | L1627 pendant rule |
| builder t6 | outfit | peonies and plum blossoms → incurved chrysanthemums; "necklace and" lost | flower_outfit L1303; L1714 no necklace |
| builder t6 | luxury | "a pearl-edged collar and cape trim" → "pearl-edged collar trim" | **DRIFT (lost during SWAP56 + length trim; QP has capes again)** |
| builder t6 | luxury | "rich", "covering", "with more gold ornaments", "clearly", "image 2 is only a colour reference" trimmed; + "her own colour stays clearly the main robe colour…" | Foreman length trims (A38/B26FAB2), no owner order — not swap-related |
| builder t6 | pose | + sleeves clear of the waist | pendant rule (L1627) |

## JOB 6 — drift fixes from the JOB 5 audit (owner L1829) — 0 gens
1. Phi pearl net back onto her own cloud collar: thu s62_t5_THU_fix_L1833 (9 156, B26/M06 waived); builder CAPE5_VK (+net, "never covering the neckline"); xuân s62_t5_XUAN_COMOI_L1833 (9 473, B26/M06 like base). Net words: "and laid over the cloud collar an airy open net of SMALL pearls (about the Tần's size) and small jade beads, lying flat, its short pearl fringe at the lower edge".
2. Thu t6 s62_t6_THU_fix_L1833 (9 996, PASS): "+ both resting on the shoulders". "never covering the neckline" did not fit. CUT: "Everyone beautiful at every age." (boilerplate; the gate does not require it). Tested and refused by the gate: the 2nd hairpin line (S24), NOTHING on the forehead (S34), Bare clean forehead (M11), No text (M14).
3. Xuân t5: pre-swap words VERBATIM "OPEN at the front (its lobes rest on the shoulders and back, never covering the neck or the square inner neckline)" + net.
4. Xuân t6 s62_t6_XUAN_COMOI_L1833 (9 989, PASS): pre-swap cape words VERBATIM + "a pearl-edged collar and cape trim". No cuts needed.
5. Builder YEL_T6/LUX_T6: "rich gold-thread embroidery covering much of the robe, a pearl-edged collar and cape trim, … a grander gold headdress with more gold ornaments, … still clearly less grand" (ITEMFIX2 words restored). s62 t5 8 667 / t6 9 077, store + dong build OK.
6b. owner L1834 (via #23): thu t5/t6 _L1833 phi bạch colour = "soft snow-violet silk (like #C6BAE0) … (a soft pastel, …)" (PALBACH1 words), colour words only; t6 keeps the thick form; t6 caption shortened ("on the background," dropped) to stay at 9 996. t5 9 181.
