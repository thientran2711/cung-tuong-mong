# PALGPT1 — ChatGPT palette v3 into the game (OWNER L2274)
Worker PALGPT1, depth 7, START_CTX ~3 % (get_session reads 0; estimate). Coordinator: Foreman C ROOT-B8 session_01D3E3NadxEFd7mXzQAPmzNG. 0 Magnific gens, no prompt files edited (A57 prompts_L2095 untouched).
OWNER L2274 verbatim: "Vậy thì giữ cái bảng màu của ChatGPT đi, bỏ cái bảng màu này vào game giùm tôi cái."

## What changed (LIVE data; old files kept as `*_preGPT_L2274.json`)
| file | slot from GPT | notes |
|---|---|---|
| face-common/palettes_season.json (B20) | Main, Secondary (+ Accent as `accent_hex/_vi/accent`, data only) | `*_vi` = GPT's own Vietnamese words; English `main`/`sec` = the existing helper chain (four_season_L1583.vi_sec → make_live_L1726.en + disambiguate, + a last chroma-word pass so no two people share a name pair). `main_before/sec_before` = old live hexes. `gpt_code` per person. root/root_drawn kept; 8 new root_drawn = old live root pair (m16 s47 s51 s52 s62 s65 đông, s63 thu, s64 xuân) so FACE-prompt ROOT HEX still matches their drawn pictures. |
| face-common/flower_colours_L2013.json (F20) | Flower | embroidery = GPT flower (345/360 exact; 15 moved by L2013 enforce()); hair = GPT flower one step lighter (or the L2013 maker's hair pick when GPT hue is outside pink/cream/lilac, F19); then the L2013 enforce + hair_by_tier ramp unchanged. Hair-lighter violations 0. |
| face-common/phibach_3rd_L1821.json (G56) | Veil | hạ/thu used by build_all.phi_bach; xuân/đông stored, unused (G36). prompt_colour = helper English + hex. Gold edge, t6 thickness unchanged. |
| phoenix_plumage_L2227.json (G33) | Feather outer/inner/tip | per person × season. **This REPLACES the 10 sets the owner approved at L2235** ("Bảng màu của Long Phượng. Ok, duyệt đi.") — old sets in phoenix_plumage_L2227_preGPT_L2274.json. Builder wiring still pending (as before); common_blocks/phoenix_plumage.txt still describes the 10-set form. |
HH royal yellow #EFBD69 untouched (not in the GPT set; nearest GPT colour is a flower, QR13 hạ #D6B771, OKLab dE 4.3 — flag). Maker: dev/art/palette_gpt_L2272/make_live_L2274.py (re-runnable; reads history files). Rules B20 F20 G33 G56 updated via rule.py set with the L2274 verbatim.

## Mapping (group: GPT nn = our id; sorted ids ↔ 01..N; counts 18/15/15/15/14/13 match; all 90 groups agree with OWNER_GROUPS_L686.json)
- QR Quyến rũ: 01=s16 02=s17 03=s18 04=s33 05=s34 06=s35 07=s36 08=s37 09=s38 10=s43 11=s44 12=s45 13=s56 14=s57 15=s58 16=s59 17=s60 18=s61
- SS Sắc sảo: 01=c05 02=c06 03=c11 04=c14 05=c19 06=c27 07=c31 08=m09 09=s07 10=s08 11=s09 12=s39 13=s40 14=s41 15=s42
- KK Kiêu kỳ: 01=s10 02=s11 03=s12 04=s19 05=s20 06=s21 07=s22 08=s23 09=s24 10=s25 11=s51 12=s52 13=s53 14=s54 15=s55
- LL Lạnh lùng: 01=s13 02=s14 03=s15 04=s26 05=s27 06=s28 07=s29 08=s30 09=s31 10=s32 11=s46 12=s47 13=s48 14=s49 15=s50
- DD Dịu dàng: 01=c02 02=c08 03=c20 04=c26 05=c32 06=m02 07=m08 08=m14 09=m18 10=m19 11=m20 12=s62 13=s63 14=s64
- DT Đoan trang: 01=c04 02=c10 03=c16 04=c22 05=c28 06=m04 07=m05 08=m10 09=m16 10=m22 11=m28 12=m29 13=s65
Machine copy: dev/art/palette_gpt_L2272/mapping_L2274.json. Swatch sheets (our id next to GPT code, 4 seasons × 8 slots, VN main/phụ names): dev/art/palette_gpt_L2272/sheet_L2274_{QR,SS,KK,LL,DD,DT}.png.

## Gates (before = HEAD 7b19b8f, after = this commit; BUILDFIX5 gsweep.py, 112 p × t1–t8 × root/xuân/hạ/thu/đông, a18, real builder gate)
| | before | after |
|---|---|---|
| total FAIL | 27 | 30 |
| non-LEN FAIL | 2 (s20 hạ t4, s56 đông t4) | 1 (s61 hạ t4) |
| LEN > 10 000 (thu t7/t8 only) | 25 (10+15) | 29 (12+17) |
- s61 hạ t4 = "2 store sentences missing" (expression + hairpin sentences) — same builder fault s20/s56 had with the old words; it moves with the colour words, not a palette error. For the foreman's builder list.
- LEN: known open class (LEN job cancelled, A55); longer helper words added 4 cells (new: s18 s34 s35 t7/t8, s38 t7, s43 s50 t8, s59 t7; gone: c06 t7/t8, s08 t8, s41 t8, s58 t7, s61 t7).
- check_unique (B20 uniqueness): before 0 FAIL / 206 WARN → after 0 FAIL / 25 WARN.
- palaudit1 (a18, dump_builder + run_builder): LEFTOVER 1064 → 1000 cells; build errors 637 = 637 (NotDrawn only).

## Open questions for the owner (data kept as GPT gave it, per L2274)
1. G56 L1847 hue rule (veil hue ≥ 60° from main): GPT veils are tints of her main family → 180/180 hạ/thu cells break it. Keep GPT veils (rule drops that condition) or re-pick?
2. F20 "hoa không trùng màu áo chính (dE ≥ 14)": 187/360 GPT flowers are < 14 from the main (same family by design). Keep?
3. G33: GPT plumage replaces the L2235-approved 10 sets — confirm.
4. English prompt words come from our old coarse helper (e.g. GPT "tím diên vĩ" → "soft indigo blue"); prompts for most people carry words only, no hex. 150/720 main/sec names differ in family word from GPT's Vietnamese (mostly periwinkle: tím ↔ chàm/lam). Fine, or switch to hex-in-prompt for everyone (needs builder change)?

## Tiếng Việt (cho chủ)
Đã đưa bảng màu ChatGPT v3 vào game: màu chính, phụ, hoa, voan (phi bạch), lông phượng cho 90 phi tần × 4 mùa. Bảng cũ vẫn giữ lại. Ghép mã: trong mỗi nhóm, người theo thứ tự số ↔ GPT 01…N (xem 6 tấm bảng màu có tên sNN cạnh mã GPT). Vàng hoàng hậu giữ nguyên. Cần chị chốt: voan và hoa của GPT cùng họ màu với áo chính (trái luật cũ) — giữ vậy hay chỉnh? Bảng lông phượng GPT thay 10 bộ đã duyệt L2235 — đồng ý không?

## Commit
(see below)
