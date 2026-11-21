# SEASON1: season common-prompt audit + proposal for xuân/hạ rank signatures (REPORT ONLY)
Depth 6 · START_CTX ~3 % · 0 gens · no prompt, builder or rule edits (A55) · worker of ROOT-B6 · owner order L2219.
Source checked: `store-all/build_all.py s62 <1-8> --season xuan|ha|thu|dong` (32 builds, scratch only) + the thu test prompts
`thu_comoi/M2213/M2213-01,02` and `thu_comoi/M2217/M2217-03..08` + ART_RULES + FOREMAN_C_STATUS L1581–L1614.

---
## PHẦN CHO CHỊ (owner, tiếng Việt ngắn)

**1. Đã có "prompt chung mùa" chưa?** CHƯA. `dev/art/common_blocks/` mới có README, chưa có file nào (luật A57: chị chưa "duyệt" phần nào).
Hiện giờ mỗi mùa lấy từ cái máy (builder) + vài câu thêm riêng: đông có thêm lông + vải không xuyên thấu, hạ/thu có thêm phi bạch, thu có thêm câu vân kiên. Xuân và hạ gần như là CÙNG MỘT prompt (giống nhau từng chữ, chỉ khác màu, và hạ có thêm phi bạch).

**2. Dáng đứng, góc, đồ cầm tay: có luật trong prompt chung không?** Có luật, nhưng là luật THEO TỪNG NGƯỜI chứ không phải phần chung của mùa:
- Mỗi người × mỗi bậc có dáng + góc + đồ cầm riêng, máy bốc sẵn (E1, E3/E4, E5/E6, E12, G72; dữ liệu ở `t8-prompt-B/build.py` `_e6_picks` + bảng góc ANG). Một người thì giống nhau ở cả 4 mùa.
- Phần chung chỉ có mấy luật chung: đồ cầm thấp hơn cằm, không che eo phía trước (G61), màu đồ cầm khác hai màu áo (B16), không đổi dáng/góc chỉ để nhìn cho thon (A54).
- Nên để phần này nằm ngoài khối mùa. Khối mùa chỉ ghi: "dáng / góc / đồ cầm = của riêng người đó, lấy từ máy".

**3. Thắt lưng + dây buộc + tua (L2194–L2200):** thang này hiện CHỈ CÓ trong mấy prompt thu đang thử (M2213/M2217). Xuân, hạ, đông và luôn cả bản thu của máy vẫn dùng chữ cũ (t3 còn chữ "stiff brocade girdle", t5 "broad gold brocade girdle", t8 "jade-and-gold belt"). → Khi chị duyệt thì chép NGUYÊN thang này vào cả 4 mùa (một khối chung `sash_ties.txt`).

**4. Lời khuyên cũ "mỗi mùa thêu hoa khác nhau" đã đưa vào prompt chưa?** CHƯA. Chị đã đồng ý ở L1726 ("điểm nhấn trên áo": xuân mai/đào · hạ sen/chuồn chuồn · thu lá phong/trăng · đông mai trong tuyết), nhưng chưa ai ghi thành luật và chưa đưa vào máy. Ngược lại, đợt COLORFIX1 còn bỏ chữ "spring flowers / peach blossoms" để thay bằng hoa của bậc (F2). Nên bây giờ LOẠI hoa thêu đi theo người × bậc (F2), giống nhau ở cả 4 mùa; chỉ có MÀU hoa là đổi theo mùa (F20). Bảng chim theo mùa (F21, `season_birds_L2040.json`) cũng có rồi mà máy CHƯA dùng: máy chỉ ghi chung chung "small birds" ở bậc t5.

**5. Đề xuất "dấu hiệu bậc" cho xuân và hạ** (giống vân kiên của thu và lông của đông). Mỗi mùa có 2 cách, chị chọn 1:

**XUÂN, cách X1: "Viền cổ hoa đào"** (lấy luôn ý mai/đào chị đã đồng ý ở L1726)
- Trên viền cổ vuông có thêu một cành đào/mai nhỏ, bậc càng cao thì cành càng dài và càng sang.
- t1 vài cánh hoa ở hai góc cổ · t2 thêm một nụ nhỏ · t3 một cành nhỏ, chỉ màu loang.
- t4 cành dài hơn + viền chỉ bạc · t5 + vài hạt ngọc trai nhỏ · t6 chỉ vàng xoắn + ngọc trai.
- t7 cành hoa đi hết viền cổ + phượng nhỏ · t8 đẹp nhất: cành + phượng + mây, ngọc trai.
- Chỉ là chỉ thêu nằm phẳng trên vải: không thêm lớp áo, không cộm, áo vẫn thướt tha.

**XUÂN, cách X2: "Tay áo hai lớp voan"**
- Ở cổ tay áo có thêm một lớp voan mỏng màu phụ, dài hơn lớp trong một chút và bay nhẹ theo gió (e ấp, mùa xuân).
- t1–t3: một lớp voan trơn, rồi có viền thêu mảnh · t4–t5: hai lớp, viền chỉ bạc · t6: viền chỉ vàng + ngọc trai nhỏ.
- t7–t8: hai lớp, viền chỉ vàng thêu phượng nhỏ và ngọc trai.
- Voan mỏng và mềm, không xếp nếp phồng. Cần cẩn thận: xuân không có phi bạch (G36), nên chỗ voan này phải nhỏ, chỉ ở cổ tay.

**HẠ, cách H1: "Viền váy cánh sen"**
- Gấu váy cắt thành những cánh sen nằm phẳng (không phồng), có thêm một con chuồn chuồn nhỏ (theo ý L1726).
- t1 cánh sen trơn, viền mảnh · t2 viền thêu mảnh · t3 thêu nhẹ trên cánh.
- t4 viền chỉ bạc + một con chuồn chuồn nhỏ · t5 + hạt ngọc trai ở đầu cánh · t6 chỉ vàng + ngọc trai.
- t7 cánh sen viền vàng + phượng nhỏ trên váy · t8 đẹp nhất: hai tầng cánh sen mỏng, ngọc trai, phượng + mây.
- Vải hạ thì mềm nhưng không rủ xẹp: cánh sen giữ được nếp nhẹ chỉ nhờ đường viền thêu.

**HẠ, cách H2: "Áo bán tí (áo ngắn tay lửng) bằng sa mỏng"**
- Mặc ngoài áo một lớp sa rất mỏng, ngắn tới eo, có thắt lưng giữ lại (G40), mát, đúng kiểu áo mùa hè thời Đường.
- Viền áo đi theo thang bậc: t1 viền trơn → t3 thêu nhẹ → t4 chỉ bạc + lưới ngọc nhỏ → t6 chỉ vàng + ngọc trai → t8 phượng + mây.
- Cần cẩn thận: Quý phi, HQP, HH không được mặc áo choàng ngoài (G67). Áo bán tí ngắn và ôm theo thắt lưng nên không phải áo choàng, nhưng vẫn phải chị đồng ý cho 3 bậc này.

Em khuyên chọn **X1 + H1**: chỉ thêm chỉ thêu, không thêm lớp vải, nên không bị cộm. Cả hai cũng dùng đúng ý mùa chị đã đồng ý ở L1726.

**6. Đề xuất cách xếp file** (NHÁP, chỉ tạo khi chị nói "duyệt"):
`dev/art/common_blocks/`
- `sash_ties.txt`: thắt lưng + 2 dây + tua, thang t1–t8, giống nhau ở 4 mùa
- `clasp.txt`: khuy/khóa (ở cổ + ở thắt lưng), thang t1–t8
- `jewel_net.txt`: lưới ngọc / ngọc trai, thang t4–t8 (L2210–L2212)
- `thread.txt`: thang chỉ thêu H15 · `inner_embroidery.txt`: thêu áo trong H14 · `fabric_<mùa>.txt`: một câu vải cho mỗi mùa (L2214)
- `season_xuan.txt` / `season_ha.txt` / `season_thu.txt` / `season_dong.txt`: mỗi file ghi ① vải của mùa ② cổ áo (G25) ③ phi bạch có/không (G36) ④ DẤU HIỆU BẬC của mùa (xuân X?, hạ H?, thu vân kiên G75, đông lông G26) ⑤ điểm nhấn mùa (L1726) ⑥ chim của mùa (F21) ⑦ một dòng ghi "màu hoa = F20, loại hoa = F2, dáng/góc/đồ cầm = của riêng người đó".
- Mỗi file mùa CHỈ GHI TÊN các khối chung (sash_ties, clasp…), không chép chữ của khối vào. Như vậy khi một khối được sửa thì không còn bản cũ nằm lại ở chỗ khác (A57 L2201).

---
## 1. TABLE season × part (EN, for foreman/workers)
Legend: **C** = exists as common text (all seasons, file) · **1S** = only in one season · **M** = missing / not wired · (t) = test prompt only.

| Part | xuân | hạ | thu | đông | Status / where |
|---|---|---|---|---|---|
| Fabric t1–t3 | gauze (M06) | gauze (M06) = xuân | gauze (M06) | OPAQUE silk (G28, winter_g28.py) | xuân=hạ identical; **B29 not wired** (B29: xuân+đông t1–t3 = opaque lụa hoa) |
| Fabric t4–t5 | đoạn B26 | đoạn B26 | thin silk (B32) | đoạn B26 (opaque) | C (B26 in store) for xuân/hạ/đông; thu B32 wired |
| Fabric t6–t8 | "HEAVY…/thick gold-embroidered brocade" (B12) | same | thin silk (B32, BUILDFIX5) | same heavy brocade | **conflict** with B28/B29 light gấm Tống cẩm + L2214 "one fabric wording, all ranks"; đông t6 heavy vs G28 "not thick" (G28 exempts only t7/t8) |
| Collar | t1–t3 open square · t4 crossed · t5–t8 closed (store) | = xuân | square all tiers (G53, thu_ladder.py) | t1–t3 old crossed (G25) · t4 crossed · t5–t8 store | rule G25 (ART_RULES:191); C in builder; xuân/hạ t4/t5 open version still pending (G25 "once it exists") |
| Phi bạch | none | t1–t6 (G36, G54 t6 thicker, G56 3rd colour) | t1–t6 | none (G34) | C, wired: build_all.py `phi_bach()` L253–277 |
| Vân kiên / cloud collar | t4 capelet, t5 yunjian, t6–t8 cloud collar (store) | = xuân | t1–t8 vân kiên (G75) (t: M2217) | = xuân | **1S** thu signature; xuân/hạ/đông only store collars from t4 |
| Fur | – | – | – | W01/W02/W03 (G26/G55) | **1S** đông, wired (winter_g28.py + check_store W slots) |
| Sash + 2 ties + tassels (L2194–L2200) | store words | store words | (t) M2213-01/02 + M2217-03..08 | store words | **1S, test only.** Builder thu has a 3rd wording |
| Clasp ladder (throat + sash, L2196) | t4 "jade clasp at the throat" only | same | (t) M2217 all ranks | t4 only | **1S, test only** |
| Jewel / pearl-net ladder (L2210–L2212) | store (t4 beaded yoke, t5 pearl fringe, t7/t8 pearls) | same | (t) inside the vân kiên sentence M2217 | store | **1S, test only** |
| Thread ladder H15 | M | M | (t) M2213/M2217 | M | rule H15 (ART_RULES:259); **not in builder for any season** |
| Inner-robe embroidery H14 | store generic "inner robe ALSO embroidered" | same | same + (t) | same | rule H14 (ART_RULES:258); ladder not wired |
| Flower KIND | F2 per person×rank | same | same (M2217 t4 kind differs from builder t4) | same | C (F2), **identical in all 4 seasons**; season flower kind = M |
| Flower COLOUR | F20 xuân | F20 hạ | F20 thu | F20 đông | C, `face-common/flower_colours_L2013.json` |
| Season accent motif (L1726: mai/đào · sen/chuồn chuồn · lá phong/trăng · mai trong tuyết) | M | M | M | M (fur only) | owner OK L1726 (TAKEOVER_FOREMAN_C_ROOT19b.md:26–29), **no rule ID, not wired** |
| Season birds F21 (t4–t6) | M | M | M | M | table `face-common/season_birds_L2040.json`, **no builder reads it**; store has generic "small birds" at t5 |
| Pose / angle / held item | per person×rank | same | same (thu t8 + some đông drop ANGLE for length) | same | per-person data `t8-prompt-B/build.py _e6_picks` + ANG; rules E1 E3 E4 E5 E6 E12 G61 G72 A54. Not a season block |

## 2. Same part, different wording across seasons (dup/conflict)
1. **Sash**, 3 versions: (a) store xuân/hạ/đông: t1 none, t2 "soft silk sash", t3 "wide **stiff** … brocade girdle" (stiff vs G74), t4 "embroidered silk sash with silk tassels", t5 "broad gold brocade girdle", t6 yellow sash (colour only), t7 "wide yellow sash", t8 "jade-and-gold belt with long tassels"; (b) builder thu: t4 "embroidered silk sash tied at the centre front … LONG ties", t8 "plain gold belt with a silk sash in a centre-front bow"; (c) test thu M2213/M2217 (the owner's L2194–L2200 ladder). Inside (c): t8 "a little longer than the others" vs L2194 "same length as others"; t6 "exactly as long as the Tần's and the HQP's ties" is said only at t6; "nothing tight, never bulky" only at t5.
2. **Fabric t6–t8**: "HEAVY silk brocade … SATURATED" + "thick gold-embroidered brocade" (xuân/hạ/đông) vs thu "thin, light, flowing" vs B28/B29 light gấm vs L2214 one common fabric wording.
3. **xuân = hạ**: whole prompt identical except colours + phi bạch → nothing seasonal (the reason for this job).
4. **Flowers**: L1726 season accents approved but COLORFIX1 removed "spring flowers / peach blossoms" in favour of F2 → the owner's L1726 OK was never carried into any rule.
5. **Birds**: F21 table vs store generic "small birds" (t5 all seasons) and boilerplate "birds and butterflies are fine silk-thread embroidery…" at t1.
6. **Thu builder vs thu tests**: the builder thu (thu_ladder.py) still has t4 capelet + lotus and t8 "plain gold belt…", while M2217 has vân kiên + kerria + new sash. The builder will need its own sync after chốt (A55, not this job).
7. Note (A18, not to be fixed by us): s62 t6 and t8 start with the same ANGLE words ("a SLIGHT turn toward the LEFT side…") in every season (E1: 8 distinct values per person). Only the first 60 characters were compared.

## 3. Proposal: see owner part §5 (X1/X2, H1/H2; recommend X1 + H1). Both recommended options are embroidery-only (no new layer → no bulk, G28/G74 safe), use the L1726 season accents, and reuse the common ornament ladder (thread H15 + pearl/gold steps) so that only the motif is seasonal.

## 4. File layout: owner part §6 (draft, NOT approved, A57).

## Commit / gens
0 gens. Scratch builds in the session scratchpad only (not committed). Commit: see the git log for "SEASON1 report".
