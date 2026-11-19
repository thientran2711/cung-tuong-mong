# Rules cleanup ("dọn sổ") — Lượt 766, 19/11

No gens. No builder code changed. Only the rule book files.

## Counts
- Before: 186 rules, 2 likely duplicate pairs (A19~B3, B25~D2), 0 duplicate ids, 15 open conflicts.
- After: 184 rules, 0 likely duplicates, 0 duplicate ids, 9 open conflicts (8 old + 1 new note). `check_store.py --self`: 0 problems.

## Merged (removed line → ART_RULES_HISTORY.md "merged into X")
- B3 (store gate, Lượt 371/373/375) → merged into **A19** (one store gate, Lượt 500/504).
- D2 (M09 = style + skin only, Lượt 279/283) → merged into **B25** (master common prompt, Lượt 745).

## Updated in place (`rule.py set --luot 766`; old text → HISTORY)
| Rule | What changed | Owner Lượt |
|---|---|---|
| A19 | One gate for every gen (B3 inside); gate must also cover faces + master block; mass = one person at a time, not "spot-check every 8" | 371/373/375, 500/504, 724, 745 |
| A2 | Even after GO, mass = one person at a time (A23) | 724 |
| B20 | Season palette APPROVED; 86 consort faces, unique pair per season; Xuân/Hạ tone; base pictures NOT redrawn for root colour | 733/734, 742/744, 750, 757, 758, 763 |
| B21 | Royal yellow #EFBD69 kept; Quý phi = small touch, less than t7 | 616/619, 749 |
| B24 | Hexes written per rank; t6 CAM / t7 ĐỎ; old triều option-B teal/blue codes and j1 RCOL dead; colour changes = prompt only, no redraw | 726, 728, 749, 765 |
| B25 | Master block now names Xuân/Hạ tone + "thướt tha" fabric sentence; D2 merged in; notes MASTER_COMMON.txt + gate scope "face" still not built | 744/745/748/750, 279/283 |
| D8 | Groups now: Sắc sảo 18, Đoan trang 12 (m05 in), Dịu dàng 11, Kiêu kỳ 15, Lạnh lùng 15, Quyến rũ 15 = 86; Tinh nghịch + Tươi tắn → Công chúa group (21) | 737, 738, 739, 759, 760, 761 |
| D15 | Style lock DONE in builders (4900574c4); open: NPC/men a36 ref | 692/694 |
| F7 | Nữ đế crown = HH t8 crown sentence with phoenix→dragon swaps + lưu | 765 |
| F10 | Drawn Nữ đế crowns stay; new gens use F7 sentence | 765 |
| G13 | One main+secondary pair per person at every rank; rank colour only in rank accents | 499, 583, 726, 758 |
| I2 | Royal yellow prompt hex #EFBD69 + swatch TdwDfOyVNR | 749 |
| K13 | Trung y tiers = pale B24 colours | 726 |
| K16 | Nữ đế correct form = m05 round 4 (NDX4); one person at a time | 713, 724, 765 |
| K17 | Old 6 looks (Tươi tắn/Trong trẻo/Tinh nghịch) gone; split per D8 | 737, 738, 761 |
| L1 | Room accent = B24 rank colour | 726 |
| L7 | Phối colours named as B24 (kem / xanh lá / xanh dương) | 726 |
| L14 | Two-version rule (frontal + góc xéo) RETIRED → frontal only; HQP red, Quý phi orange (B24) | 718, 726/728, 765 |
| L20 | Says every older góc xéo rule is retired | 718 |

Checked, no change needed: L17 (already t6 cam / t7 đỏ), B23 (Nữ đế bright), A23 (mass one person at a time).

## Conflicts (dev/art/ART_RULES_CONFLICTS.md)
- Resolved by newer owner decisions: 4 (B8, Lượt 551), 5 (B11, Lượt 555), 6 (B15/B17/B20/B24), 8 (G4/F12), 9 (B25, Lượt 748), 10 (H6, Lượt 492), 15 (K1/D16, Lượt 694).
- Still open (one-line note each): 1 t8 angle, 2 sleeve v2/v3, 3 store text vs later laws, 7 hair colour, 11 triều mantle/fringe, 12 Nữ đế phoenix vs dragons (crown settled by 765, robe not), 13 cung nữ ladder, 14 "vẽ lại" meaning.
- New note 16: B12 "no gauze" vs B25/B18 "silk and gauze" — ask owner when the master block is shown.
