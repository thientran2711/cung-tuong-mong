START_CTX ~5% of 1M window (estimate; get_session context_usage reads 0) | depth 1 (child of ROOT-57 session_01PEhRbuFkLEFvsv8jdPo9vC) | rollover at ~30% (ceiling 60%)
# PR13 — missing rooms (Foreman C ROOT-57, owner Lượt 793)

PRIORITY #1 CHECK: OD L41/L134/L136 (housing: HH + HQP alone, Tần/Phi/Quý phi = palace heads, low ranks in phối) | game data = dev/build/j26.js MAPH (8 palaces in rivalSlots + places vuon kn dtd thu tn tyv ksp lc home), j94.js scene keys | CDN img/_index.json (live old-round scenes per palace main/đông phối/tây phối; img/_review/place-rank/ v1–v12) | approved list = place-rank-sample.md PR7–PR12 + brief | prompts.py has style cards ONLY for Cảnh Phúc (CARD_CP) and Trường Xuân (CARD_TX) | claims: none other on rooms.

## Step 1 — INVENTORY (0 gens)
Room = frontal, rank-method picture (ART_RULES L1–L20). "live old" = the game has an older round-1/2 scene there (not the rank method) — kept as skins.

### A. Chính điện, palace heads Tần (t4) / Phi (t5) / Quý phi (t6) — bedroom (-ngu) + reception (L2: each palace × 3 ranks)
| palace | Tần bed | Tần rec | Phi bed | Phi rec | QP bed | QP rec |
|---|---|---|---|---|---|---|
| Cảnh Phúc | EbY494KuuO | iG5hVwC3uK | SyhTG51Ub8 / 3w UPve2vXwny | If3UKjGtvE | eIPlheldqL | 9ZHIVwlNYZ |
| Khải Tường | none | none | none | none | none | none |
| Chung Tú(y) | none | none | none | none | none | none |
| Hàm An | none | none | none | none | none | none |
| Thừa Minh | none | none | none | none | none | none |
| Diên Huy | none | none | none | none | none | none |
| Vĩnh Hòa | none | none | none | none | none | none |
| Trường Xuân | none | none | none | none | none | none |
Missing 42 (7 palaces × 6). Each of the 7 palaces has NO style card yet (only CP/TX exist) → the first room of each palace also fixes its card.
(Brief place-mass Round 3 says "10 palaces"; the game data has 8 rival palaces + Khôn Ninh → 8 used here. Trường Xuân is also the HQP palace: question below.)

### B. Hoàng quý phi (t7) — Trường Xuân, alone
| bedroom | reception |
|---|---|
| ov6w4kO829 (v12 frontal) | O6EoWbJynm (frontal) |
Missing 0.

### C. Hoàng hậu (t8) — Khôn Ninh
| bedroom | reception |
|---|---|
| cpS5YIl0eP (B 3-wall) | bxMA4ov5Y2 (frontal 3w) |
Missing 0.

### D. Phối (t1 Đáp ứng / t2 Thường tại / t3 Quý nhân, shared, L7: 2 beds, colours split by object type by the pair)
| palace | đông phối bed | đông phối rec | tây phối bed | tây phối rec |
|---|---|---|---|---|
| Thừa Minh | s7I0GAVl8e (TQ pair) | jUoWAEyLD0 | none | none |
| Cảnh Phúc, Khải Tường, Chung Tú, Hàm An, Diên Huy, Vĩnh Hòa, Trường Xuân | none ×7 | none ×7 | none ×7 | none ×7 |
Missing 30 (base rooms). L7 pairs (ĐĐ ĐT ĐQ TT TQ QQ) are COLOURS by the occupants: question below.

### E. Thái hậu — Từ Ninh cung (map 'tn')
bedroom none · reception none (live old tu-ninh-cung). Missing 2.

### F. Emperor + other places opened from the dư đồ (live old scene exists, no rank-method room)
Dưỡng Tâm điện (dtd), Ngự thư phòng, Kính sự phòng (ksp), Thái y viện (tyv), Lãnh cung (lc, L-rule: plain), tẩm cung đêm (night bedchamber), Nội vụ phủ, Thượng thư phòng, phòng cung nữ, cung nhân, Tân giả khố, A ca sở, Đông cung. Ngự hoa viên (vuon) = garden, L9 (Phượng Lệnh, not ours). → 13 places, listed as "not in scope unless the foreman says so" (they are not consort rank quarters; L9: we paint rooms only).

### TOTAL missing (A + D + E): 42 + 30 + 2 = 74 rooms ≈ 74 × 135 = 9,990 cr (F not counted).

### QUESTIONS for the foreman (not blocking; I proceed with the order below)
Q1 Trường Xuân = HQP palace: does it also need Tần/Phi/Quý phi versions (another head may live there)? I draw it LAST.
Q2 L7 pair colours: one phối room per place with ONE pair (varied across places), or 6 pair colour versions per phối room (×6 = 180 more)? I draw one pair per room, a different pair for each.
Q3 Section F places in scope?

### DRAW ORDER (lowest missing ranks first, L2/L7/L19)
1. Phối rooms (t1–t3): Thừa Minh tây phối bed → rec; then the other palaces' phối (đông then tây), alternating 3-wall / 2-wall, own layout, a different pair each.
2. Tần (t4) bed + rec of the 7 palaces → 3. Phi (t5) → 4. Quý phi (t6) → 5. Từ Ninh (Thái hậu) → 6. Trường Xuân ranks (Q1).

## Step 2 — rooms drawn (one try each; faults reported, not re-gened — A20)
Builder: dev/art/place-rank/prompts_pr13.py → prompts_pr13.json (C9 common block via prompts.py room9 verbatim + room part; refs gOmYI7iSXO + EbYJzsMuuO + image 3 model GUIDE). Files: img/_review/place-rank/pr13/ (CDN). Sheet = stage_exact/ipad_tags.py (4 figs c06/c30/m19/m39 t1 a18).
| # | room | gen | walls / layout | colours | floor_c (bedroom pass 8.7–15.6) | eye check | sheet | cr |
|---|---|---|---|---|---|---|---|---|
| 1 | Thừa Minh tây phối bedroom | KLpYH26kqp | 3-wall, windows LEFT, 2 beds in left/right halves of the back wall, shelf + round window between (own; đông phối = beds side by side + screen, back wall only) | pair ĐT: curtains cream-ivory #EAE3D0, fabrics green #7FB394 (L7) | 23.4 FAULT (bed bases ~73 % H) | 2 beds, colours split right, no phoenix/yellow/text; with people the beds stand well behind them; small incense stand bottom-left beside tag 1 | img/_review/place-rank/pr13/pr13-ipad-tags-thua-minh-cung-tay-phoi-ngu.jpg | 135 |
| 2 | Thừa Minh tây phối reception | w4aBSJr7EI | 2-wall (back + LEFT window wall), daybed + orchid screen in the RIGHT half of the back wall, moon gate to an inner room in the left half, armchair pair + tea table along the left window wall (own; đông phối = centred daybed + mirrored rows) | pair ĐT: curtains cream-ivory, fabrics green | 26.0 FAULT (reception pass 16.5–25.1; daybed base ~66 % H) | no bed, no sofa, no phoenix/yellow/text; with people the furniture stands well behind; polished floor has sun reflections in the tag strip (tags still readable) | img/_review/place-rank/pr13/pr13-ipad-tags-thua-minh-cung-tay-phoi.jpg | 135 |
A17 DIFF vs last approved phối bedroom prompt (prompts_v6.json thua-minh-cung-dong-phoi-ngu, s7I0GAVl8e): common block → C9 (approved common block, as for all v9+ rooms); Đông/east → Tây/west; occupants (Thường tại + Quý nhân) → (Đáp ứng + Thường tại); colours pale blue/pale green → B24 #EAE3D0 curtains / #7FB394 fabrics; room arrangement rewritten (own layout L11/L19, 3 walls WL3, windows left); old LAYOUT NUMBERS / "same arrangement as image 3" → GUIDE_S + C9_CAM; image 3 own picture → cpS5YIl0eP (3-wall model, guide only).
Room 2 A17 DIFF vs approved phối reception (prompts_v6.json thua-minh-cung-dong-phoi, jUoWAEyLD0): common block → C9; east → west; occupants → Đáp ứng + Thường tại; pale green/pale blue mixed → L7 object-type split cream-ivory curtains / green fabrics; arrangement rewritten (own, 2 walls WL2, windows left, daybed right half, moon gate left, ONE chair pair on the left wall); old LAYOUT/LAYOUT NUMBERS → GUIDE_S + C9_CAM; image 3 own picture → 8aiwqQTIrU (2-wall model mirrored, guide only).
BUILDER FIX after rooms 1–2 (both too much floor, C9_CAM alone is weak — same lesson as PR10/PR11): rooms 3+ (NEW rooms only, nothing redrawn) add the approved measured floor sentence from PR11: FLOOR11F_BED (bedrooms) / FLOOR11F_REC (receptions), prompts.py L705–709.
Credits PR13 so far: 2 gens = 270.
