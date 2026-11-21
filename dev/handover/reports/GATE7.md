# GATE7 — owner rulings L1935–L2020 put INTO the prompt gate (check_store.py) · owner L2021

## Cho sếp (tóm tắt)
- Sếp hỏi đúng: trước đây máy duyệt prompt CHƯA kiểm 10 luật sếp ra (áo choàng QP/HQP/HH, mật độ thêu Tần, hoa giữa ngực Đáp ứng, hoa cài tóc không lá, không chữ khe ngực, cổ vuông khung đủ, nơ dây dài, cổ chéo mùa đông, cổ áo Hán khoá, không hoa cúc).
- Nay đã gắn đủ 10 luật đó vào máy duyệt, có bài tự kiểm (29/29 đạt): prompt nào phạm luật thì máy chặn, không cho vẽ.
- Chạy lại trên các file đang dùng (thu, đông, Hán, cung nữ): trước sửa 20/83 file bị chặn, sau sửa 33/83 file bị chặn. Phần tăng thêm là lỗi thật mà máy cũ để lọt.
- Builder (máy viết prompt cho 90 người) thì 4480/4480 prompt đều phạm ít nhất một luật mới → phải sửa ngay tại gốc trước khi vẽ hàng loạt.
- Em không sửa file prompt nào; danh sách file phạm luật ở dưới để thợ sửa.

depth 1 (limit 8) · START_CTX ~5 % · 0 gens · commit gate 045bc8a1 (report commit below)

## (1)+(2) Rule table — owner prompt-word rulings vs the gate
| rule (owner Lượt) | in ART_RULES? | check BEFORE | check NOW (check_store.py) | self-test |
|---|---|---|---|---|
| G57 no body jade pendant, held items free (L1851/L1979) | yes | yes g57_fails | unchanged | existing |
| G59 no sachet (L1874) | yes | yes | unchanged | existing |
| G60 bow centred (L1890) | yes | yes g60_fails | unchanged | existing |
| **G60 ext: every bow LONG trailing ties (L1971 #2)** | yes (G60 EXTENSION) | **NO** | **g60b_fails**, all scopes; a non-negated bow needs long/trailing ties words in the prompt; cupid's bow / archery ignored | 4 cases |
| G61 front waist free (L1905) | yes | yes | unchanged | existing |
| G65 embroidery size/place, t4+ exempt (L1952/L1971) | yes | yes | unchanged | existing |
| **G67 QP/HQP/HH two layers, no open outer robe / coat / cloak / long cape / mantle (L1982, L1714, L1971 #1)** | yes | **NO** | **g67_fails** tp/pr 6–8, every season/era; triều phục (trieu) exempt; vân kiên / cloud-collar cape = collar, allowed; Hán quju+inner = the 2 layers | 5 cases |
| **G68 Tần t4 density lock (L2006)** | yes | **NO** | **g68_fails** t4 a18/a26 square-cut, not Hán/winter/maid: FAIL on old 'a few LARGE embroidered', require 'a few MEDIUM embroidered … (clearly more than at Thường tại, still fewer than the Phi)' | 2 cases |
| **G69 Đáp ứng t1 chest-centre flower (L2008)** | yes | **NO** | **g69_fails** t1 a18/a26 with square neckline, not Hán/winter/maid: require 'at the CENTRE of the chest' | 3 cases |
| **F19 hair flower = bloom only, NO leaves (L1723, L2011); embroidery leaves OK (L2015)** | yes (F19 (1)) | **NO** (gate's 'F19' id was only NOVASE) | **f19_hair_fails**: hair-flower clause with leaf/leafy/sprig/spray/stem = FAIL; a hair flower with no 'bloom only / no leaves' words anywhere = FAIL; robe-embroidery leaves never checked | 3 cases |
| **F19 (2) no chrysanthemum, hair or embroidery (L1723/L1726)** | yes | **NO** | in f19_hair_fails, all scopes | 1 case |
| **G35 no cleavage / khe ngực wording at all (L1442 'không có nhắc gì tới hết'; again L1990, L1996)** | yes (G35 revokes A42) | **NO** | **g35_fails**, all scopes, negated or not | 2 cases |
| **L1996 t7/t8 chest = lower-rank neckline: no layered neckline / inner top / bodice, no pearl swags across the chest** | **NO rule text** | **NO** | **g96_fails** (id 'L1996') tp/pr 7–8 every season; pearls lying on the vân kiên OK | 4 cases |
| **L1990/L1992 square neckline = framed (full frame at t7/t8)** | **NO rule text** | **NO** | **l1990_fails** (id 'L1990'): every non-maid consort file with a non-negated square neckline needs 'framed/edged/bordered … band' in that sentence; t7/t8 need 'on ALL sides' / 'up both sides … shoulders' | 3 cases |
| **G25 + L1971 #4 winter = crossed collar (cổ chéo), never square (t1–t5)** | yes (G25) | only via store args t1–t3 | in l1990_fails: winter + square neckline at t1–t5 = FAIL (id 'G25') | 1 case |
| **G62 Hán collar words frozen (L1915; G66 t1–t3)** | yes | **NO** | **g62_fails**: Hán prompt (Han-dynasty / quju / khúc cư / 'Thiết kế thời Hán') must carry the frozen NECKLINE sentence + collar clause of seasons4/HAN_COLLAR_L1915_FROZEN.txt verbatim. G66 per-person band colours NOT checked (person-specific). | 1 case |
| G63 / G64 frozen thu QP t6 / winter t1 files | yes | no | NOT added: file identity, not words — propose `diff` vs the FROZEN copy in the drawer's step | — |
| B31 Tang consort fabric ladder (L1965) | yes | no | NOT added: no fixed sentence yet (words differ per file); needs an owner-approved sentence per rank first | — |
| L1952 #5 / L1955 sash binds the jacket / outer robe | no | no | NOT added: no agreed words to test | — |
| L1981 / L1998 render @135 | n/a | n/a | not prompt words | — |
| L2005 / L2013 flower colour table | pending owner | — | add when the table is approved | — |

Self-test: `python3 dev/art/check_store.py --self` → 29/29 GATE7 cases pass; the 3 PROOF MISMATCH lines (S12 S14 S19) were there before my change (checked on the untouched file).

Conflicts for the foreman (A48 later wins, I applied the later word): G35 (L1442) says HH keeps 'pearl strands across the chest' → L1996 removed them; the t7/t8 files written by MAIDFIX4 (2b194953) say 'hint of cleavage' = A42 wording that G35 revoked → FAIL now. The #27 note 'keep A42 soft hint' is wrong: A42 is revoked by G35. Rule text to add (foreman, rule.py add): L1996 (t7/t8 chest words = lower-rank neckline; no layered neckline/inner top/bodice; no pearl swags across the chest) and L1990/L1992 (square neckline framed by an embroidered band; t7/t8 full frame on all sides up to the shoulders).

## (3) Before / after FAIL table (LUẬT SỬA CẢ NHÓM)
Live set = per person+rank the highest-Lượt prompt file (thu = the L1989-approved set + t1 L2008, t7 vankien2_L1973, t8 OLD_clasp_L1976, t6 L1924 + THU_QP_t6_L1933_FROZEN; winter1 L1924–L1971; seasons4 Hán L1971; maid7/prod latest per person+role). Full check_text, scope tpN / maid / mama.

| family | files | FAIL before | FAIL after | new faults |
|---|---|---|---|---|
| thu | 9 | 2 | 4 | G35 ×2 (t7, t8 'hint of cleavage'), F19 ×1 (t4 Tần no 'bloom only') |
| winter | 8 | 7 | 8 | F19 ×6 (t1–t6 no 'bloom only'), L1996 pearl swag ×2 (t7, t8), G67 ×1 (t8 'long ceremonial silk mantle') |
| Hán | 8 | 8 | 8 | F19 ×6 (t1 'a lilac spray' = leaves; t2–t6 no 'bloom only') |
| maid | 58 | 3 | 13 | G60 long ties ×6 (thô sử), G35 ×4 (hạ Đường 'modest, no cleavage') |
| **all live** | **83** | **20** | **33** | |

Failing live files per new rule (NOT edited by me):
- G35: thu_comoi/s62_t7_THU_vankien2_L1973.txt, thu_comoi/s62_t8_THU_vankien2_OLD_clasp_L1976.txt; maid7/prod/m18_{nhat,nhi,tam,thosu}_ha_DUONG_L1933.txt
- F19 no-leaf words: thu_comoi/s62_t4_THU_sqtest_L1994.txt; winter1/s62_t1_dong_L1924, t2_L1965, t3_L1952, t4_L1971, t5_L1952, t6_L1971; seasons4/s62_t2…t6_HAN_*_L1971
- F19 leaves: seasons4/s62_t1_HAN_COLLAR_L1971.txt ('a lilac spray')
- L1996 pearl swag: winter1/s62_t7_dong_L1952.txt, winter1/s62_t8_dong_L1952.txt
- G67: winter1/s62_t8_dong_L1952.txt (mantle). (Winter t7/t8 = L1803 'y chang' prompts; G67/L1996 are later rulings, so they now block — owner may say otherwise.)
- G60 long ties: maid7/prod/m09/m10/m12/m13/m18_thosu_L1919.txt, m11_thosu_L1905.txt
- G67/G68/G69/L1990/G62 on live files: 0 (thu t1 L2008 has the chest flower, t4 L1994 has the density words, t7/t8 have the full frame, Hán collar words intact).

Builder output (store-all/build_all.py → t8-prompt-B/build.py, every drawable person = c06 + m01–m52, t1–t8 × a18/a26/a36/a51/a65 = 4480 prompts; Nữ đế/undrawn persons are refused by the builder): before = 0 of these checks existed; after = **4480 / 4480 FAIL** at least one new check:
| new check | consort c06 (40) | maid-persons (4440) | where |
|---|---|---|---|
| F19 no 'bloom only' words | 30 | 3261 | t1–t6 every age |
| F19 hair-flower leaves | 0 | 69 | e.g. m02 t1 |
| F19 chrysanthemum | 0 | 361 | e.g. m02 t6 (F2 t6 list still has chrysanthemum) |
| G67 outer cloak | 10 | 1110 | t7, t8 (hqp_layer 'OPEN outer robe' / t8 mantle) |
| L1996 inner top | 5 | 555 | t7 ('LAYERED NECKLINE … inner top') |
| L1996 pearl swag | 10 | 1110 | t7, t8 |
| L1990 frame not full | 5 | 555 | t7 |
| L1990 square not framed | 2 | 222 | t2 a18/a26 ('LAYERED border of two stacked narrow bands' — no 'framed/edged … band') |
| G68 Tần density | 2 | 222 | t4 a18/a26 |
| G69 t1 chest flower | 2 | 222 | t1 a18/a26 |
| G60 long ties | 0 | 735 | e.g. m04 t2 |
Note G68/G69: VE6 put the words into t8-prompt-B/build.py (f5a47029, d05cc7ed), but `build.py c06 v0 --low 1 --age a18` output does NOT contain 'CENTRE of the chest' → a later step in the builder drops/overrides them; the builder must be fixed at the root (owner L1998: fix for 90 people), then re-run this sweep.
Sweep tool: per file `python3 dev/art/check_store.py <file> --scope tpN --age a18`; whole builder `python3 dev/art/check_store.py --audit`.

## Open / for the foreman
1. Builder root fix (all 11 rows above) — a writer worker; then `--audit`.
2. Live file word fixes listed above — owner already ordered these rules, so they are fixes, not new design (A18); still no redraw without her yes (A20/A21).
3. rule.py add for L1996 + L1990 (text above); correct the #27 note about A42.
4. G63/G64 frozen-file diff step, B31 sentence per rank — when wanted.
