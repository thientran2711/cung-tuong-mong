# WAIST1 — đai lưng theo bậc t1–t8 (owner L2101) — words only, 0 gens
depth 3 · START_CTX ~3 % of 1M (get_session read 0; my own estimate) · coordinator ROOT-B3

## PRIORITY #1 CHECK (rules + existing words, reused)
- G60 (L1890 + L1971): bow/knot always CENTRE front; every bow has LONG trailing ties. Stays true — it only applies where a bow exists.
- G44 (L1645): "bow only centred or none t1–t6; t7 HQP bow allowed". **Must change** (L2101: no bow for HQP/HH/QP).
- G40 (L1592) + G51 (L1664): the sash/girdle is tied OVER the outer robe and holds it in, all 8 tiers. Kept: every sentence below says "wrapped/tied OVER the outer robe". G51 also says "each tier KEEPS its ORIGINAL sash words" → **superseded for the waist by L2101**. The second G51 line (L1653 brocade-flower sash carry-up) was already voided by L1657 → delete the duplicate line.
- G42 (L1605) carry-up: G47 (L1645) narrowed it to EMBROIDERY only, so a bow at t1 does NOT have to carry up. G42 text still says "every tier wears jade pendant(s)", which clashes with G57 → clean the G42 text.
- G57 (L1851/L1979): no ngọc bội/pendant on the body. The plaques below are part of the belt (flat, sewn on), nothing hangs from it; the words avoid "pendant/disc/plaques linked" (gate regex tested: PASS).
- G61/G45: the front waist is the in-game ngọc bội slot. From t4 up the ties and streamers hang "either side of" the clasp, so the centre stays clear.
- B27 (L1524) light fabric + owner L2099 ("cồng kềnh"): every rank says "slim and flat, close to the waist, never wide, thick or bulky". Today's words include "WIDE stiff", "broad" and "wide" (see below), so this fixes them too.
- A46: t7/t8 have no red gems on the belt (the JEWELLERY sentence already says so). Only jade, pearl and gold are used.
- K30: EVERY maid has a front bow. Keeping a bow at all 8 consort ranks blurs the consort/maid line (H12). A ladder that drops the bow from Tần up fixes that.
- H-rules (triều phục H1–H13): nothing about the waist. Triều phục is not touched here.
- Research: HAN6 Hán dress research L1953 ("Đai lụa, có thể thắt nơ hoặc nút ở giữa; người quyền quý đeo thêm… từ đai") + Tang research (đai/khoa lăng ladder, B31): silk sash for the low ranks, plaque belt (đai bản / ngọc đái) for the high ranks. That is the logic of this table.

## CURRENT waist words (why the owner sees bows everywhere)
Thu s62 live files: t1 `s62_t1_THU_fix_L1847` "broad ribbon band and its bow … centre front … two long ribbons" · t2 `L1723` "a soft silk sash" · t3 `L1723` "a wide stiff lilac brocade girdle" (+ apron panel, G15) · t4 `Tan_thu_L2079` "embroidered silk sash tied at the centre front, two LONG silk ties … tassels" · t5 `NECK` "a broad gold brocade girdle" · t6 `vankien2_NECK` "a yellow sash in a centre-front bow with two LONG trailing silk ties" · **t7 and t8 identical**: "a plain gold belt with a silk sash in a centre-front bow with two LONG trailing silk ties (thướt tha)".
Hán L1971 set: t1 plain narrow sash · t2 bow · t3 girdle + bow · **t4 = t6** "WIDE stiff embroidered waist belt with a gold buckle plaque" · t5 flat knot · **t7 = t8** "WIDE jade-and-gold belt".
→ t7 = t8 and t4 = t6, so nothing gets grander, and the bow sits on HQP/HH.

## PROPOSAL — bảng cho chủ nhân (Việt) + English prompt words
Chung mọi bậc: đai thon, dẹt, ôm sát eo, không to bản, không dày, không cồng kềnh; đai buộc ngoài áo khoác để ôm áo vào người. Phía dưới giữa eo để trống cho ngọc bội gắn sau. Nơ chỉ còn ở ba bậc đầu.
SLIM = "slim and flat, close to the waist, never wide, thick or bulky" (the tail of every sentence; it can be dropped where the file already says "slim silhouette"). {sec} = her secondary colour.

| Bậc | Lời cho chủ nhân | English prompt words (chars) |
|---|---|---|
| t1 Đáp ứng | Đai lụa mềm bản hẹp, màu phụ của nàng. Thắt một nơ nhỏ giản dị ngay giữa eo, hai dải lụa dài buông thướt tha. | a narrow soft silk ribbon sash in {sec}, tied OVER the outer robe in a small simple bow at the CENTRE front of the waist, two LONG plain silk ties trailing down the skirt (thướt tha); SLIM (245) |
| t2 Thường tại | Đai lụa dệt hoa nhỏ chìm. Nơ hai vòng đầy đặn hơn, ngay giữa eo; đầu mỗi dải thêu một đóa hoa nhỏ. | a narrow silk sash in {sec} with small woven flowers, tied OVER the outer robe in a fuller double-loop bow at the CENTRE front of the waist, two LONG silk ties trailing down the skirt (thướt tha), each tip embroidered with one tiny flower; SLIM (301) |
| t3 Quý nhân | Đai gấm bản thon, viền chỉ vàng mảnh. Nơ ngay ngắn giữa eo; cuối mỗi dải một tua lụa nhỏ. Đây là bậc cuối còn nơ. | a slim {sec} brocade girdle edged with thin gold braid, tied OVER the outer robe in a neat bow at the CENTRE front of the waist, two LONG silk ties trailing down the skirt (thướt tha), each ending in a small silk tassel; SLIM (282) |
| t4 Tần | Bỏ nơ. Đai lụa thêu hoa riêng của nàng, giữa eo cài một khấu tròn vàng chạm lưới. Hai dải dài buông thẳng hai bên khấu, đầu có tua lụa. | NO bow: a slim embroidered {sec} silk sash with her small flowers along it, wrapped OVER the outer robe and closed at the CENTRE front of the waist by a small round gold-filigree clasp, two LONG silk ties falling straight down either side of the clasp, with small silk tassels (thướt tha); SLIM (351) |
| t5 Phi | Đai gấm vàng đính một hàng bản vàng nhỏ dẹt, chạm hoa riêng của nàng. Giữa eo cài khấu hoa vàng; hai dải dài buông thẳng hai bên. | NO bow: a slim gold-brocade girdle set with a row of small flat gold plaques chased with her flower, wrapped OVER the outer robe and closed at the CENTRE front of the waist by a gold flower clasp, two long silk ties falling straight down either side of it; SLIM (318) |
| t6 Quý phi | Dải lụa vàng hoàng gia lót dưới đai bản vàng nhỏ, hai mép viền ngọc trai hạt. Giữa eo thắt nút đồng tâm dẹt bằng dây tơ vàng, không phải nơ. Hai dải vàng buông thẳng. | NO bow: a narrow royal-yellow silk sash wrapped OVER the outer robe under a slim girdle of small flat gold plaques edged with seed pearls, closed at the CENTRE front of the waist by a flat endless knot of yellow silk cord (no loops), two long yellow ties falling straight down either side of it; SLIM (357) |
| t7 Hoàng quý phi | Không nơ, không nút. Ngọc đái: đai kết bản bạch ngọc chạm, mỗi bản viền khung vàng, hai mép đính ngọc trai, lót dải lụa vàng. Giữa eo khóa bản vàng chạm mây; hai dải lụa vàng hẹp rủ thẳng hai bên. | NO bow, NO knot: a slim belt of small carved white-jade plaques in gold frames with seed pearls along both edges, over a narrow royal-yellow silk sash wrapped OVER the outer robe, closed at the CENTRE front of the waist by a gold cloud plaque; two narrow yellow silk streamers fall straight down from under the belt, one either side of centre; SLIM (405) |
| t8 Hoàng hậu | Không nơ, không nút. Ngọc đái bậc nhất: bản bạch ngọc chạm phượng và mây, khung vàng viền ngọc trai. Giữa eo khóa song phượng vàng lớn khảm bạch ngọc, ngọc trai; hai dải lụa vàng thêu phượng nhỏ, đầu bọc vàng. | NO bow, NO knot: a slim belt of carved white-jade phoenix-and-cloud plaques, each in a gold frame with pearl rims, over a narrow royal-yellow silk sash wrapped OVER the outer robe, closed at the CENTRE front of the waist by a larger gold double-phoenix plaque set with white jade and pearls; two narrow yellow silk streamers embroidered with small gold phoenixes fall straight down from under the belt, one either side of centre, their tips capped in gold; SLIM (518) |

Each step up adds one thing that shows at game size: plain ribbon → woven flowers → brocade + gold edge (bow ends here) → gold clasp → gold plaques → pearl-edged plaques + yellow knot → jade plaques in gold → phoenix jade + phoenix buckle + gold-tipped streamers.

## Gate test (words only, no gen)
- `check_store.g57_fails / g60_fails / g60b_fails` on all 8 sentences: PASS (no pendant hit; "NO bow" is negated; t1–t3 bows are centred with long ties).
- I put the new words into the scratch copies of `s62_t7_THU_vaiphi_L2099.txt` / `s62_t8_…` and ran `check_store --scope tp7/tp8 --age a26`. The fail set is the same as the old file's except LEN: both files are ALREADY over 10 000 (10 154 / 10 039 chars). With the new waist words they reach 10 458 / 10 456. The builder must trim ~460 chars of boilerplate (A38, listed in .keep). No outfit words may be cut.

## Rules to change (foreman's job, after the owner's yes)
1. NEW rule (e.g. G7x WAIST LADDER, L2101): the table above. Bow only t1–t3. t4–t8 "NO bow". t6 flat knot. t7/t8 no bow and no knot. Every rank slim and flat. The ties/streamers sit either side of centre from t4 up.
2. G44 → rewrite: "bow t1–t3 only (centred, long ties); t4–t8 no bow" (drops the t7 exception, L1645).
3. G51 (L1664) → its "keep original sash words" part is superseded by L2101 for the waist; the "sash over the outer robe" part stays. Delete the second G51 line (L1653, already void).
4. G15 t3 "wide stiff brocade girdle" → "slim brocade girdle" (B27 + L2099 bulky). The apron panel is not touched.
5. G42 text: remove "every tier wears jade pendant(s)" (clashes with G57).
6. G60 unchanged. Add to check_store: a WAIST gate, t4–t8 FAIL on a non-negated "bow"; t7/t8 FAIL on "plain gold belt".

## Builder / file lines that change
- `dev/art/master_common.py`: add a `WAIST = {1..8}` dict + `SLIM` (one source, copied verbatim, like OUTER_IN line 257).
- `dev/art/thu_comoi/make_thu_s63_65_L2026.py:70-71` (t4 sash sub) → WAIST[4]; add subs for t1 ("broad ribbon band and its bow…"), t2 ("a soft silk sash"), t3 ("a wide stiff … brocade girdle"), t5 ("a broad gold brocade girdle").
- Thu s62 files: t6 `s62_t6_THU_vankien2_NECK.txt` / `prompts_L2095/QuyPhi_thu_L2095.txt` ("a yellow sash in a centre-front bow …" / "a yellow sash") → WAIST[6]; t7 `s62_t7_THU_vankien2_L2079` + `vaiphi_L2099`, t8 `HoangHau_thu_L2023` + `s62_t8_THU_vaiphi_L2099` ("a plain gold belt with a silk sash in a centre-front bow with two LONG trailing silk ties (thướt tha)") → WAIST[7]/[8].
- `dev/art/seasons4/make_han_L1971.py:9` BOW + R[2]/R[3] (t2/t3 keep a bow, words → WAIST[2]/[3]); Hán t4/t6 "a WIDE stiff embroidered waist belt with a gold buckle plaque", t5 "a broad embroidered waist sash tied in a flat knot…", t7/t8 "a WIDE jade-and-gold belt" → WAIST[4..8]. The hạ Đường / xuân / đông sets get the same sweep (grep `bow|girdle|belt|sash`).
- `strip_bow.py` line "waist sash tied in a flat knot" is t5 Hán only. It is no longer needed once WAIST[5] is in.

## Open questions for the owner (via foreman)
1. Does this apply to all seasons and eras (thu, Hán, hạ Đường, xuân, đông)? Or thu first?
2. t6 Quý phi: is the flat endless knot OK, or no knot at all (clasp only)?
3. t3 Quý nhân: may the girdle go from "rộng, cứng" to "thon"?

No gens. No rule or prompt files changed (proposal only).
