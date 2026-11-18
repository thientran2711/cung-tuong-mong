# t8 prompt B (Hoang hau, a18) -- FROZEN
Owner 18/11 ~18:15Z: "lấy cái prompt B đi, B cho đẹp"; ~18:20Z: draw ALL Hoàng hậu, 3 colours, all 90 people with THIS prompt, exactly, no additions/removals per painter.
- `build.py cNN v0|v1|v2` prints the exact prompt. `--golden` = byte-identical to the 4 prompts actually run in the A/B test (B side) -> `golden/pB_c06|c16|c20|c25.txt` (golden check: `python3 build.py c06 v0 --golden | cmp - golden/pB_c06.txt`).
- Default mode differs from golden ONLY in the colour slot: yellow words measured from c25 B = "rich warm royal golden yellow, a honey-gold close to hex #F2C985 (light-medium depth, 18K gold tone), not pale cream, not beige/tan/ochre, not heavy mustard, not lemon" (pixel median #F2C985, IQR #E1BA73..#FBD493, HSV ~37deg/45%/95%; old C2 median was #F2BB5D) + "all colours fresh, clear and luminous, never dusty or greyed" (owner 18:00Z).
- v0 = her own signature colour (palette from jobs.json) + royal yellow mixed; v1 = royal yellow MAIN + one fresh accent of her colour; v2 = a different fresh family (V2 table in build.py) + royal yellow mixed.
- Item = one 3f t8 item rotated per person (ITEMS table); c06 c16 c20 c25 keep the items used in the A/B test; hand template follows the item kind.
- New people nNN: add a row to DATA (palette = their signature colour, face words) and keep everything else.
- refs.txt = references + settings + selection rules.
