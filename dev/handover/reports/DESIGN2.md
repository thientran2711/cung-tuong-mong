# DESIGN2 — Hán rank ladder t4–t8 (owner Lượt 1259, 20/11) — prompts only, 0 cr, no Magnific (G30)
depth 4 · START_CTX ≈ 5 % (get_session read 0, own estimate) · child of Foreman C #4 (session_01D3E3NZPt7cysxtbybnExBK)

## Bảng bậc (v2, owner Lượt 1262: vải t4–t6 GIỐNG NHAU = đoạn; khác bậc nhờ LỚP ÁO NGOÀI; gấm từ t7)
| Bậc | Lớp áo ngoài (mới ở bậc này) | Vải | Số lớp | Dấu hiệu bậc | Vàng hoàng gia |
|---|---|---|---|---|---|
| t4 Tần = Hán A | Khúc cư (quju) quấn xoắn ốc | Đoạn (y hệt m03_t4_VAI_DOAN) | 2 | Cổ 3 dải rộng ra vai + viền vạt xoắn; đai cứng + 1 bộ ngọc bội | không |
| t5 Phi = Hán B | Trực cư (zhiju) 2 áo, cả 2 cổ mở rộng | Đoạn (y hệt) | 2 | Cổ 3 dải; đai lưng thắt nút + 2 ngọc bội | không |
| t6 Quý phi | + Khuê y (guiyi) đuôi én: vòng đuôi én dài hông→ống chân + dải lụa bay | Đoạn (y hệt) | 3 | Cổ 4 dải; thụ (dải bậc) vàng ngắn | ít (dải cổ ngoài, thụ ngắn, + swatch Image 2) |
| t7 Hoàng quý phi | + Đại bào mở vạt dài chạm đất, ống tay rất rộng, vạt trước viền ngọc trai | Gấm | 4 | Cổ 5 dải; thụ vàng dài treo vòng ngọc; mũ phượng (store) | nhiều (cổ tay, 2 vạt trước, thụ) |
| t8 Hoàng hậu | + Áo khoác lễ (mantle) gấm kim tuyến vàng phủ ngoài cùng, viền mận | Gấm kim tuyến | 5 | Cổ 6 dải; đuôi én 2 vòng; thụ vàng dài tới gấu; mũ cửu phượng (store) | chủ đạo (store: >½) |

Garments are real Han-era pieces: 曲裾 quju, 直裾 zhiju, 袿衣 guiyi with 襳髾 swallowtail points + ribbons, 綬 shou rank ribbon (the Han rank marker), 組佩 zupei, 步搖 bu yao.

## Files (dev/art/seasons4/)
- make_han_bac.py — builder (base = ladder_base/s62_tN.txt = store-all/build_all.py s62 N; added ladder_base/s62_t8.txt)
- s62_t4_HAN_BAC.txt 9986 · s62_t5_HAN_BAC.txt 9479 · s62_t6_HAN_BAC.txt 10000 · s62_t7_HAN_BAC.txt 9996 · s62_t8_HAN_BAC.txt 9983 chars (all ≤ 10 000)
Image 1 = dev/handover/review-sheets/winter1/refs/image1_s62_face_style.webp (all); Image 2 = royal-yellow swatch (B21), t6–t8 only.

## Diff vs base (A17)
1. Colours as HAN_A/B (ice blue→light clear warm plum #DF9ED9, mint mist→bright blush pink).
2. Only the Outfit design words replaced; t6 Image-2 yellow wording kept; t7/t8 crown clause + colour rules + Image-2 sentence kept.
3. G32: PHI BẠCH sentence removed, "no shawl" in every outfit (HAN_A/B had a shawl → dropped).
4. F6: t8 store "The phoenix is the main embroidered motif…" removed (phoenix only on crown). Approved S04 ("All flowers, birds and the phoenix are … embroidery") and S14 ("trims along the cape edges") kept verbatim — gate refuses edits.
5. t6/t7 colour-rule word "cape" → "over-robe" (outfit says no cape).
6. Spring motifs (peonies, peach blossoms, swallows, clouds) instead of autumn ones; CAPTION G31 large bold top-left "Mùa Xuân · Thiết kế thời Hán · <bậc> · <tên bộ>".
7. Every outfit: DENSE ALL-OVER embroidery sentence (H6/H12), long garments only, "one single visible sleeve layer, every inner sleeve hidden inside" (sleeve law), no Qing words (F14), no extra colour (t8 shou yellow only — 3-colour rule).

8. v2 (owner Lượt 1262 via Foreman): t4–t6 fabric = the FABRIC sentence + "The satin has real weight, a little more than thin silk:" copied verbatim from m03_t4_VAI_DOAN.txt (replaces the thin-silk sentence; inserted at t6 where the base had none); per-rank fabric words removed from t4–t6 outfits; t6 outfit shortened to fit 10 000; t7 'richer than the Quý phi's satin'.

## Gate (`check_store.py <file> --scope tpN --age a18`)
- t7 PASS · t8 PASS
- t4, t5, t6 FAIL only **S12 MISSING (PHI BẠCH t1–t6)** = the known conflict S12 vs G32 (no phi bạch in Hán). Not faked. Fine for owner ChatGPT tests (no Magnific); the gate needs a G32 exemption (Hán/Minh scope) before any Magnific use — Foreman's call.

## Open questions for Foreman / owner
- Colours: kept HAN_A/B plum + pink although the caption says Mùa Xuân (season plan not confirmed). If Xuân gets its own palette, only the colour swap line in make_han_bac.py changes.
- t7 store S14 still says "cape edges" (verbatim, approved) while the outfit says no cape — watch for a cape in the ChatGPT result.
- t7/t8 store S04 still names "the phoenix" in the embroidery sentence; outfit names only flowers/clouds.

Gens used: 0. Credits: 0.
