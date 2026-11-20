# DESIGN15 — PHẦN 2 (owner L1534, B28): bảng vải có hình + kiểm tra GẤM
Sheet hình (0 gen, ảnh có sẵn): dev/handover/review-sheets/fabric_L1534/ S_cung_nu.jpg · A_t1_t3.jpg · B_tan_phi.jpg · C_quyphi_hh.jpg

## KIỂM TRA GẤM — Quý phi / HQP / HH (B28: MỘT gấm nhẹ cho mọi mùa)
| Mùa | t6 Quý phi | t7 Hoàng quý phi | t8 Hoàng hậu |
|---|---|---|---|
| Xuân · Hán | open5: **gấm nhẹ nhất Tống cẩm** (câu FABRIC) ✔ | open7: không câu FABRIC; áo = **sa dệt kim + lót Tống cẩm** ✔(nhẹ) | open8: như t7 + "FABRIC the richest of all, yet still light" ✔(nhẹ) |
| Xuân · cổ mới | XUAN_COMOI: **gấm dày (S07)** + "HEAVY silk brocade robe" ✘ | XUAN_COMOI: **gấm dày (S07)** ✘ | — (không có file) |
| Hạ · Đường | ha_DUONG: **gấm dày (S07)** + "HEAVY silk brocade robe" + "heavy gold brocade" (dải ngực) ✘ | — chưa có | — chưa có |
| Thu | THU_COMOI: **gấm dày (S07)** + "HEAVY silk brocade robe" ✘ | THU_COMOI_v8: **gấm dày (S07)** ✘ | THU_COMOI_v8: **gấm dày (S07)** ✘ |
| Đông | DONG_HIENTAI_cloak6: **gấm dày (S07)** + "HEAVY silk brocade robe" ✘ | cloak7: **"lụa mềm, không gấm"** ✘ (không phải gấm) | cloak7: **"lụa mềm, không gấm"** ✘ · cloak6: KHÔNG có câu vải ✘ |
| Đông cũ (winter1, LONG3moi) | gấm dày ✘ | gấm dày ✘ | gấm dày ✘ |

Khác nhau = **4 loại**: (1) gấm nhẹ Tống cẩm (Hán t6), (2) sa dệt kim + Tống cẩm (Hán t7/t8), (3) gấm dày S07 (+ "HEAVY silk brocade robe" trong câu Outfit t6), (4) lụa mềm không gấm (đông cloak7 t7/t8).
Đề xuất MỘT câu cho cả nhóm, mọi mùa = câu Hán t6 (gấm nhẹ nhất Tống cẩm), bỏ vế "lighter than … of the higher ranks"; xoá chữ "HEAVY" trong "HEAVY silk brocade robe" (t6 xuân/hạ/thu/đông) và "heavy gold brocade" dải ngực hạ t6; câu S07 thay bằng câu này. t7/t8 Hán: hỏi chị có giữ sa dệt kim (đẹp, đã duyệt) hay đổi về cùng gấm nhẹ Tống cẩm.

## BẢNG VẢI THEO NHÓM — file + người dùng NGAY BÂY GIỜ (ảnh trong sheet)
| Nhóm | NHẸ (hạ + thu) | NẶNG HƠN XÍU (xuân + đông) |
|---|---|---|
| Tam đẳng | maid7/gpt/tamdang_gpt.txt · lụa+sa (M06) · ảnh aFGdKgifSh | chưa có (cung nữ 1 bộ cho mọi mùa) |
| Nhị đẳng | maid7/gpt/nhi_gpt_v2.txt · M06 · ảnh gOm5NnCSXO (test5_nhi) | chưa có |
| Nhất đẳng | maid7/gpt/nhat_gpt_v4.txt · M06 · ảnh N2qSYXL6D9 (v3) | chưa có |
| Thân cận | maid7/gpt/thancan_gpt_v4.txt · M06 · ảnh thử L1476 (v2) | chưa có |
| Chưởng sự | maid7/gpt/chuongsu_gpt_v3.txt · M06 · ảnh hu2pbShvqL | chưa có |
| Ma ma | maid7/gpt/mama_gpt_v4_a51/_a65.txt · M06 · ảnh thang v5 (test5_mama) | chưa có |
| t1–t3 | kho t8-prompt-B/build.py --low (M06 + S06) · ảnh thu cổ vuông s62 | winter1/s62_t1..t3_dong.txt · **vẫn M06 lụa+sa** (chưa đục G28) ✘ |
| Công chúa | = t1–t3 (B28) | = t1–t3 |
| t4 Tần | ha_DUONG = M06 · thu_comoi/s62_t4_THU_COMOI = đoạn | Hán open5 = đoạn · dong cloak8 = đoạn · winter1 t4 = M06 ✘ |
| t5 Phi | ha_DUONG / thu_HAN = M06 · thu_comoi/s62_t5_THU_COMOI = đoạn | Hán open3 = đoạn · dong cloak6 = đoạn · XUAN_COMOI/xuan_TONG = M06 ✘ |
| t6–t8 | xem bảng GẤM ở trên (B28: không chia mùa) | |

Ghi chú: ảnh là ảnh có sẵn gần nhất; khi ảnh là bản cũ hơn file, sheet ghi "(cùng câu vải)" hoặc "(bản cũ)". Thu t4/t5 trong sheet là ảnh cũ lụa+sa (chưa có ảnh đoạn thu).

---

# DESIGN15 — bảng vải chung B27 (owner L1524) — ĐỀ XUẤT, chưa sửa prompt, 0 gen
depth 2 · START_CTX ~3 % (get_session đọc 0 → tự ước) · worker of Foreman C #11

## Bảng cho chị (mỗi nhóm 2 loại: NHẸ = hạ + thu · NẶNG HƠN XÍU = xuân + đông)
| Nhóm | NHẸ (hạ, thu) | NẶNG HƠN XÍU (xuân, đông) |
|---|---|---|
| S · Cung nữ mọi đẳng, thân cận, chưởng sự, ma ma | **lụa + sa mỏng** (đúng câu vải của tam đẳng / nhất đẳng, thướt tha) | **lụa mềm đục** (cùng câu đó, chỉ không xuyên thấu — câu mùa đông đang dùng) |
| A · t1–t3 | **lụa + sa hoa mỏng** (sa có hoa văn dệt chìm rất nhạt, thướt tha) | **lụa hoa dệt chìm, đục** (dày hơn lụa hè một chút, không phải đoạn, không phải gấm) |
| B · t4–t5 Tần, Phi | **đoạn mỏng mờ** (đoạn mặt mờ, mỏng nhẹ cho mùa hè, thướt tha) | **đoạn mờ vừa** (đúng câu đoạn B26 chị đã duyệt) |
| C · t6–t8 Quý phi → Hoàng hậu (+ Thái hậu, Nữ đế) | **sa dệt kim + lót Tống cẩm mỏng** (đúng chữ bộ Hán t7/t8) | **gấm nhẹ Tống cẩm** (gấm NHẸ NHẤT, mặt mờ, như bộ Hán t6) — bỏ "gấm dày" |

Càng lên nhóm càng sang (S < A < B < C) ở cả hai cột; không câu nào nặng, cứng, dày.
Thái hậu + Nữ đế + Hoàng thượng = nhóm C (giữ quy tắc màu riêng C5/B23). Công chúa theo bậc t của mình.

## 1. Câu vải đang dùng (hiện trạng, nhóm × mùa)
Câu gốc:
- **M06** (MASTER_COMMON.txt dòng 6, master_common.py M06_ID): `The FABRIC is thin, light, flowing silk and gauze with a soft sheen and fine delicate embroidery, long soft graceful drapery that sways and trails elegantly (thướt tha); the small embroidered motifs are stitched in fine gold thread.`
- **M06 đông (winter_g28.py dòng 15, G28)**: `The FABRIC is soft, light, flowing OPAQUE silk, never see-through, with a soft sheen … (thướt tha); …gold thread.`
- **M07**: `The silk has real weight: the wide sleeves and robe hang and fold naturally under their own weight, with natural creases, never stiff, flat or board-like.` (mọi nhóm)
- **M08**: `The fabric is exactly the cloth written in her outfit, …` (mọi nhóm)
- **S06 store t1–t3** (check_store.py, not đông): `Light, soft, thin flowing silk: the long sleeves, skirt and sash are supple and airy, …` (câu chuyển động, không phải tên vải)
- **DOAN B26** (master_common.py dòng 37 = m11_t4_VAI_DOAN.txt): `The FABRIC is medium-weight silk SATIN (đoạn) with a soft MATTE finish … NOT heavy stiff brocade like the Empress; it hangs in fuller, rounder, heavier folds while still flowing gracefully (thướt tha); …gold thread.`
- **BROCADE B12 / S07** (master_common.py BROCADE, store-all/build_all.py FABRIC_B dòng 128/137): `FABRIC: thick gold-embroidered brocade with a graceful, flowing drape.`
- **Hán t6 _open5**: `The FABRIC is the LIGHTEST brocade (gấm) of the high ranks: thin, supple Song brocade (Tống cẩm) with a soft MATTE finish …, one step lighter than the gold-woven gauze (sa dệt kim) of the higher ranks; it falls in soft, light folds close to the body, flowing gracefully (thướt tha); …`
- **Hán t7 _open6 / t8 _open7** (trong câu Outfit): `the OUTER robes in gold-woven gauze (sa dệt kim, zhijin sha): light, thin, airy silk gauze with gold and coloured patterns WOVEN in, soft drape close to the body, never stiff, thick or puffed; the INNER layer in thin, supple Song brocade (Tống cẩm), falling softly`
- **đông t8 cloak7** (dong_hientai, owner L1498 'Hoàng hậu vẫn thô kìa'): `FABRIC: soft light silk, not brocade, with a graceful, flowing drape.`

| Nhóm | hạ | thu | xuân | đông |
|---|---|---|---|---|
| S maid | M06 (tamdang_gpt, nhat_gpt_v4) | M06 | M06 | M06 đông G28 |
| A t1–t3 | M06 (+S06) | M06 (+S06) | M06 (+S06) | M06 đông (S06 tắt) |
| B t4–t5 | M06 (ha_DUONG — trước B26) | M06 (thu_HAN/MINH) · DOAN (thu_comoi t4) | M06 (XUAN_COMOI, xuan_TONG) · DOAN (Hán _open3/5, m11) | DOAN (dong_hientai cloak6/8) |
| C t6 | BROCADE (ha_DUONG) | BROCADE (thu_comoi) | BROCADE (XUAN_COMOI) · Tống cẩm nhẹ nhất (Hán _open5) | BROCADE (cloak5/6) |
| C t7–t8 | BROCADE (store S07) | BROCADE (thu_comoi v8) | BROCADE (XUAN_COMOI) · sa dệt kim + Tống cẩm (Hán _open6/7) | BROCADE (LONG3moi) · "soft light silk, not brocade" (t8 cloak7) |
| Thái hậu / Nữ đế / triều t6–8 | BROCADE (S07 scope) | ← | ← | ← |

→ Hiện trạng lộn xộn: cùng t5 có 2 vải ở xuân; C có 3 vải khác nhau; chữ "thick … brocade" trái ý chị (L1524: gấm nhẹ như bộ Hán).

## 2. 8 câu đề xuất (English, chính xác từng chữ)
Giữ chữ chị đã thích: M06 'thướt tha', đoạn B26, sa dệt kim / Tống cẩm Hán. M07 + M08 giữ nguyên cho mọi nhóm.

**S-NHẸ — lụa + sa mỏng** (= M06 verbatim, không đổi):
`The FABRIC is thin, light, flowing silk and gauze with a soft sheen and fine delicate embroidery, long soft graceful drapery that sways and trails elegantly (thướt tha); the small embroidered motifs are stitched in fine gold thread.`

**S-NẶNG HƠN XÍU — lụa mềm đục** (= M06 đông G28 verbatim, không đổi):
`The FABRIC is soft, light, flowing OPAQUE silk, never see-through, with a soft sheen and fine delicate embroidery, long soft graceful drapery that sways and trails elegantly (thướt tha); the small embroidered motifs are stitched in fine gold thread.`

**A-NHẸ — lụa + sa hoa mỏng**:
`The FABRIC is thin, light, flowing silk and patterned silk gauze (sa hoa) with a faint woven flower pattern and a soft sheen, a little finer than a palace maid's plain gauze, with fine delicate embroidery, long soft graceful drapery that sways and trails elegantly (thướt tha); the small embroidered motifs are stitched in fine gold thread.`

**A-NẶNG HƠN XÍU — lụa hoa dệt chìm, đục**:
`The FABRIC is soft, supple OPAQUE patterned silk (lụa hoa) with a faint woven flower pattern and a soft sheen, never see-through, just a little fuller than summer silk yet still thin, light and airy, NOT satin and NOT brocade; long soft graceful drapery that sways and trails elegantly (thướt tha); the small embroidered motifs are stitched in fine gold thread.`

**B-NHẸ — đoạn mỏng mờ**:
`The FABRIC is light, thin silk SATIN (đoạn) with a soft MATTE finish and only a very faint gentle lustre, like fine old silk, never glossy, shiny, wet-looking or plastic, with a faint woven self-pattern (damask), thinner and airier than the winter satin, soft and supple, NOT brocade; it falls in long, light, flowing folds (thướt tha); the small embroidered motifs are stitched in fine gold thread.`

**B-NẶNG HƠN XÍU — đoạn mờ vừa** (= DOAN B26 verbatim; 1 chữ cần chị chọn, xem Q1):
`The FABRIC is medium-weight silk SATIN (đoạn) with a soft MATTE finish and only a very faint gentle lustre, like fine old silk, never glossy, shiny, wet-looking or plastic: clearly thicker and more opaque than thin silk gauze, with a faint woven self-pattern (damask), yet still soft and supple, NOT heavy stiff brocade like the Empress; it hangs in fuller, rounder, heavier folds while still flowing gracefully (thướt tha); the small embroidered motifs are stitched in fine gold thread.`

**C-NHẸ — sa dệt kim + lót Tống cẩm mỏng** (chữ Hán t7/t8, đưa thành câu FABRIC):
`The FABRIC is gold-woven gauze (sa dệt kim, zhijin sha): light, thin, airy silk gauze with gold and coloured patterns WOVEN in, soft drape close to the body, never stiff, thick or puffed; any inner layer is thin, supple Song brocade (Tống cẩm), falling softly; it flows gracefully (thướt tha); the small embroidered motifs are stitched in fine gold thread.`

**C-NẶNG HƠN XÍU — gấm nhẹ Tống cẩm** (chữ Hán t6 _open5, bỏ vế "lighter than … of the higher ranks"):
`The FABRIC is the LIGHTEST brocade (gấm): thin, supple Song brocade (Tống cẩm) with a soft MATTE finish and only a very faint gentle lustre, never glossy, shiny, wet-looking or plastic, with a woven flower pattern all through the cloth, never stiff, thick, heavy or puffed; it falls in soft, light folds close to the body, flowing gracefully (thướt tha); the small embroidered motifs are stitched in fine gold thread.`

Ghi chú:
- Đông t1–t6 vẫn không xuyên thấu (G28): mọi câu NẶNG HƠN XÍU đều đục ✔. C-NHẸ (sa) chỉ dùng hạ/thu ✔.
- Thu dùng NHẸ: S/A-NHẸ có chữ "gauze" — G28 chỉ chặn đông, thu được phép (đúng ý chị "nhẹ cho hè và thu").
- Khăn phi bạch sa ở các bộ hè là phụ kiện riêng, không thuộc bảng này.
- C-NHẸ dùng chung t6–t8; khác bậc vẫn bằng thêu, cổ, mũ (không đổi vải theo bậc trong nhóm).

## 3. File/builder sẽ đổi khi chị duyệt (chưa sửa gì)
- `dev/art/master_common.py`: thay 3 hằng M06/DOAN/BROCADE bằng bảng `FABRIC[group][weight]` + hàm `fabric(rank|role, season)`; viết lại assert B12/B26 (dòng 185–201) và check dòng 244–252 thành 1 check B27 (đúng 1 câu của bảng, đúng nhóm × mùa). `make_master_common.py` + `MASTER_COMMON.txt` (M06 = S-NHẸ, không đổi chữ).
- `dev/art/winter_g28.py`: M06 đông = S-NẶNG; thêm: đông lấy cột NẶNG HƠN XÍU cho mọi nhóm.
- `dev/art/check_store.py`: S07 (gấm dày) → 8 mục mới (vd S07a–h) có scope theo nhóm × mùa; S06 giữ (câu chuyển động).
- `dev/art/store-all/build_all.py` dòng 128/137 FABRIC_B; `dev/art/t8-prompt-B/build.py`, `build_npc.py`; `emperor-B/build.py`; `nude-B/mk.py` (Nữ đế); `owner-copy/mk_hqp_hh.py`.
- Bộ mùa: `seasons4/make_comoi.py`, `make_han_bac.py`, `make_han_open*_L1389/L1406.py`, `make_han_vai_L1398.py`, `make_thu_ab.py`, `make_ladder.py`; `thu_comoi/make_thu_comoi.py`; prompt dong_hientai (cloak*), seasons4 `*_ha_DUONG`, `*_XUAN_COMOI`, `*_thu_*`, `*_xuan_*` → mỗi prompt mới cần `.keep` (A38) với `allow:` cho câu vải cũ.
- Cung nữ: `maid7/make*.py`, `maid7/gpt/*` — hè/thu đã đúng S-NHẸ; xuân đổi sang S-NẶNG HƠN XÍU; đông đã đúng (G28).
- Luật (việc của Foreman): B12 + B26 ghi "superseded by B27"; FIGURE_GATE ghi bảng; `mg1_gate_proof.py`, `mg2_l784_proof.py`, `mg1_conflicts.py` kiểm lại.
- Không cần vẽ lại ngay; tranh cũ đổi khi chị cho redraw (A20/A21).

## 4. Câu hỏi cho chị
- Q1: Câu đoạn B26 có chữ "NOT heavy stiff brocade like the Empress" — Hoàng hậu giờ là gấm nhẹ. Đổi thành "NOT brocade (gấm)" hay giữ nguyên chữ chị đã duyệt?
- Q2: Triều phục t6–t8 (lễ) có theo mùa không, hay luôn C-NẶNG HƠN XÍU?
- Q3: Công chúa t6 hiện dùng M06 — theo nhóm C như phi tần t6?
- Q4: t8 đông cloak7 đang "soft light silk, not brocade" (L1498) — đưa về C-NẶNG (gấm nhẹ) hay giữ lụa riêng cho áo choàng đông của Hoàng hậu?

Gens: 0. Gate: không chạy (không có prompt mới). Commit: xem tin nhắn cho Foreman.

---
# JOB L1536 — BẢNG MÀU LÔNG PHƯỢNG (G33, phương án A L1430) — 0 gen, không sửa prompt
Nguồn màu: dev/art/face-common/palettes_season_deep.json (P6, chị duyệt L1042 'Bản màu ổn rồi đó'), 90 phi tần (86 + s62–s65), 4 mùa.
Mỗi người × mùa: lông phượng = [màu chính, màu phụ, màu chính đậm hơn (đầu lông / mắt lông, dịu, sat ≤ 0.50)] + viền chỉ vàng #EFBD69. Cùng bộ màu cho phượng thêu trên áo (t7 HQP, t8 HH) và phượng trên mũ (t7/t8).
Hình (tên + nhóm ghi trên hình, A27): dev/handover/review-sheets/phoenix_L1536/phoenix_{xuan,ha,thu,dong}_{1,2}.jpg (8 tấm, 45 người/tấm).
Bảng: phoenix_L1536.json (kèm câu EN 'words' cho builder) + phoenix_L1536.md. Script: make_phoenix_L1536.py.
Ghi chú: lớp ngoài lông = màu áo chính → trên áo cùng màu, phượng chỉ nổi nhờ viền vàng + màu phụ + màu đậm (như v7 L1430). Nếu chị muốn phượng nổi hơn: đổi thứ tự (phụ ngoài, chính trong). Chưa nối vào builder (G33 builder HOLD).
Câu hỏi: 'đậm' là màu thứ 3 do tôi đề xuất (chính tối hơn một chút) — chị có muốn chỉ 2 màu (chính + phụ) không?

## A44 (owner L1538) — model + credit trên hình
fabric_L1534/*_A44.jpg: mỗi ảnh có dòng model + cr (Magnific GPT 2.6 · 135 cr theo gen_ledger/GEN1; ảnh chụp màn hình của chị = ChatGPT chị thử · 0 cr) + TỔNG mỗi tấm: S 675 · A 810 · B 270 · C 135 cr (đã tiêu trước đây; làm sheet = 0 gen). phoenix_L1536 sheets: 'vẽ bằng code · 0 cr · TỔNG 0 cr'.
