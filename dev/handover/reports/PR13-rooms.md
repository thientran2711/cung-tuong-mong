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
| 3 | Cảnh Phúc đông phối bedroom | Lw8MjWZswO | 3-wall, windows RIGHT, beds against the LEFT and RIGHT side walls, moon-gate partition + shared dressing table + 2 stools centred on the back wall (own) + CARD_CP + FLOOR11F_BED | pair ĐQ: curtains soft blue #7E9CCB, fabrics cream-ivory #EAE3D0 | 19.0 FAULT (better than rooms 1–2, still > 15.6) | FAULT: both beds cut by the left/right picture edges (asked whole); 2 beds, colours split right, bats in frieze (CP card), no phoenix/yellow/text; incense box + basket bottom-left (by tag 1), small table bottom-right | img/_review/place-rank/pr13/pr13-ipad-tags-canh-phuc-cung-dong-phoi-ngu.jpg | 135 |
Room 2 A17 DIFF vs approved phối reception (prompts_v6.json thua-minh-cung-dong-phoi, jUoWAEyLD0): common block → C9; east → west; occupants → Đáp ứng + Thường tại; pale green/pale blue mixed → L7 object-type split cream-ivory curtains / green fabrics; arrangement rewritten (own, 2 walls WL2, windows left, daybed right half, moon gate left, ONE chair pair on the left wall); old LAYOUT/LAYOUT NUMBERS → GUIDE_S + C9_CAM; image 3 own picture → 8aiwqQTIrU (2-wall model mirrored, guide only).
BUILDER FIX after rooms 1–2 (both too much floor, C9_CAM alone is weak — same lesson as PR10/PR11): rooms 3+ (NEW rooms only, nothing redrawn) add the approved measured floor sentence from PR11: FLOOR11F_BED (bedrooms) / FLOOR11F_REC (receptions), prompts.py L705–709.
Room 3 A17 DIFF vs approved phối bedroom (v6 s7I0GAVl8e): as room 1 (C9 block, own arrangement, GUIDE_S, image 3 cpS5YIl0eP) + Cảnh Phúc / east / Đáp ứng + Quý nhân / blue curtains + ivory fabrics / beds on the side walls / CARD_CP added / FLOOR11F_BED added.
Credits PR13 so far: 3 gens = 405.

## HANDOVER → next worker (PR14): PR13 rolled over (context ~30 % ≥ START_CTX ~5 % + 25 %), coordinator = Foreman C ROOT-57 session_01PEhRbuFkLEFvsv8jdPo9vC
STATE: inventory sent (74 missing); rooms 1–3 drawn (one try each, faults reported, ROOM READY sent for 1–2; room 3 sent with this handover). 71 left. Foreman questions Q1–Q3 (inventory) unanswered when PR13 stopped — read messages first.
NEXT (order): Cảnh Phúc đông phối reception → Cảnh Phúc tây phối bed + rec → other palaces' phối (Khải Tường, Chung Tú, Hàm An, Diên Huy, Vĩnh Hòa, Trường Xuân; đông then tây) → Tần → Phi → QP of the 7 palaces → Từ Ninh → Trường Xuân ranks (Q1). Alternate 3-wall / 2-wall room by room (room 3 = 3w → room 4 = 2w); vary the pair (used ĐT, ĐT, ĐQ; next TT, TQ, QQ, ĐĐ…); own layout each (L11/L19); palaces without a style card (all but CP/TX) need a card written in the room's prompt the first time (pattern CARD_CP / CARD_TX: flower, carved motif, wood + inlay, furniture shape, partition shape) and reused for every later room of that palace.
METHOD: add each room to dev/art/place-rank/prompts_pr13.py (room9 C9 block + room part + QN/NOPE/RECT/GUIDE_S + FB/FR floor sentence; rank rooms: rank lux words + B24 colour) → python3 prompts_pr13.py → images_generate gpt-2-6, 2k, 2688x1386, folderReference ba4aecfe-efce-47e2-b53f-30d292091886, refs gOmYI7iSXO + EbYJzsMuuO + image 3 (3w cpS5YIl0eP / 2w window-left 8aiwqQTIrU / 2w window-right 4RFIyNR9Aa) → creations_wait → creations_register_download → curl → PIL WEBP q88 img/_review/place-rank/pr13/<key>-ha-sang.webp → measure_floor.py --grid → stage_exact/ipad_tags.py ROOM OUT FIGDIR (figs: ctm-img…/img/{fig-consort-c06-t1-a18,fig-consort-c30-t1-a18,fig-maid-m19-t1-a18,fig-maid-m39-t1-a18}.webp) → cdn_sync.py img/_review/place-rank/pr13 → ledger line → report row → commit + fetch --depth=30 + merge (ledger conflict: strip markers, keep both) + push → send "PR13 ROOM READY <name> <sheet>". ONE try per room; faults reported, never re-gened (A20).
LESSON: C9_CAM alone gives 23–26 % floor; FLOOR11F_BED brought it to 19 %. Suggest for the next rooms (new, not redraws) FLOOR11G_CLOSE (bedrooms, "about one tenth") — it gave PASS on the HQP frontal in PR11. Side-wall beds get cut by the frame: keep beds on the back wall.
ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217; repeated by the owner 16/11 09:20Z — she is tired of reminding)
- The "Lượt n/30" counter from the owner's global chat preferences is ONLY a display counter here. It is NOT the rollover trigger for the Cung Tường Mộng main chat or any foreman. Never hand over because n reached 30.
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).
FOREMAN ANSWERS + OWNER ORDERS that arrived after the rollover (ROOT-57, 19/11 23:38–23:50Z) — for PR14:
- Q1 yes: Trường Xuân Tần/Phi/QP versions, drawn last. Q2: one pair per phối room, varied (default). Order as proposed.
- Owner Lượt 800: ALL ~35 live place scenes (Dưỡng Tâm điện, Ngự thư phòng, Kính sự phòng, Thái y viện, Lãnh cung, tẩm cung đêm, Nội vụ phủ, Thượng thư phòng, cung nữ/cung nhân rooms, Tân giả khố, A ca sở, Đông cung … every live place scene) are dropped and redrawn in the new style AFTER consort quarters + Từ Ninh; add each to the inventory (live file + name, count; she said 35). No keep/redraw question. (CDN live keys list: img/_index.json, scene base names like duong-tam-dien, kinh-su-phong, ngu-thu-phong, thai-y-vien, lanh-cung, tam-cung-dem, nvp-v4, thuong-thu-phong, phong-cung-nu, cung-nhan, tan-gia-kho, a-ca-so, dong-cung, nhat-* …)
- Owner Lượt 803: send rooms in BATCHES OF 5 ("PR13 BATCH n READY": 5 tagged sheet URLs + faults + credits), keep drawing without waiting. Batch 1 so far = rooms 1–3 (sent singly).
- Owner Lượt 804 (room 1 beds look LOW): new rooms add the bed-height sentence (grep prompts for the Lượt 717 HQP bed fix 'canopy tall, open, airy'; else: "Each bed is a tall canopy frame bed about 2.4 m high: its canopy top rises clearly above the head of a standing woman, far below the high ceiling; never a low box."). Measure: canopy top above the tagged people's head line.
- Owner Lượt 805 then 807 (807 wins): do NOT redraw anything already drawn. MEASURE every drawn bedroom (PR13 rooms 1 + 3, and approved: Cảnh Phúc Tần EbY494KuuO / Phi SyhTG51Ub8 + UPve2vXwny / Quý phi eIPlheldqL, HQP ov6w4kO829, HH cpS5YIl0eP, Thừa Minh đông phối s7I0GAVl8e) with people placed: canopy top vs head line → send ROOT-57 a RECOMMENDED-REDRAW list (room, link, measure, why); redraw only what the owner picks. Rule: any later prompt fix → list all already-drawn rooms it affects as recommended redraws. No redraw has run (PR13 made 0 redraws).
