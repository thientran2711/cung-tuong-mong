# PAL3 — G50 (owner L1645): 29 off-season ★GỐC roots recoloured per B30 + old pictures → kho skins
depth 7 · START_CTX ≈ 3 % of 1M (get_session reads 0; own estimate), ≈ 17 % at the end · Opus · **0 gens, 0 credits** · no sheet sent to the owner (G50).

## What I did
1. `dev/art/palettes3/four_season_L1583.py`: a ★GỐC root whose MAIN fails the season-feel test (B30) is no longer fixed (G50). It goes back to the solver like any other pair: least change from the drawn colour, inside the group tone band (A32) plus the season notch, with looks_right / no grey / no brown / no royal yellow / no pink Thu main. Output marks it `root: true` + `g50_released {old_main, old_sec, old_reads}`, and the file lists `_g50_released`. Roots that read right stay fixed (L27).
   I added two things to get past the squeeze the released roots caused: a wide retry (combos 1 500 → 40 000 at ΔE 16 / 12), and an automatic loop in which anyone left with "no fit" is solved first next round (4 rounds: s53 → s25 → s20, s64 → none). A full run takes ~25 min.
2. Rebuilt `dev/art/face-common/palettes_season_L1583.json` (still the PROPOSAL file; palettes_season_deep.json NOT touched), `diff_L1583.json`, and the sheets `review-sheets/thu_palette_L1582/L1583/00–06` (re-rendered for the record, **not looked at and not sent**: G50 says no sheets to the owner).
3. Gates: check_unique **0 FAIL** (370 WARN). Mains reading as their season: **Xuân 90 · Hạ 90 · Thu 90 · Đông 90** (was 78/83/84/86). `_clashes` = 0. No one is left with "no fit". Some people still relax A31 (ΔE 16, or 12 for c04 s28 s47 …): see `_fails` / `a31` in the json.
4. Skins: `dev/art/palettes3/g50_skins_L1645.py` scans gen_ledger.jsonl. A gen counts when it belongs to that person (person field or file name) and its prompt carries a hex within ΔE2000 < 6 of the old root main (deep / palettes_season / L761 variants). FAILED gens are skipped. Result: **243 gens for all 29 people** (107 have a cut id; 4 were already listed in older SKINS sections). Written to `dev/art/SKINS.md` (new section between `<!-- G50-L1645 BEGIN/END -->`, one line per picture: person | tier | gen | cut | prompt file | drawn hex) and `review-sheets/thu_palette_L1582/g50_skins_L1645.json`. NOT redrawn.

## Root → old main → new main
| root | season | group | old main (reads) | new main | phụ old → new | skins |
|---|---|---|---|---|---|---|
| c06 | Xuân | Sắc sảo | #CF816E (Thu) | hồng mẫu đơn đậm #933966 | #6AAF98 → #A6DED2 | 126 |
| c08 | Xuân | Dịu dàng | #DF9FA2 (Thu) | hồng hoa đào sáng #F09BAB | #74B47E → #74B47E | 1 |
| c10 | Hạ | Đoan trang | #DFBB9F (Thu) | cam mơ sáng #DB9B66 | #53ACA5 → #53ACA5 | 1 |
| c14 | Đông | Sắc sảo | #EAD7BF (Thu) | mòng két đậm #077673 | #6B64B4 → #6B64B4 | 3 |
| c27 | Thu | Sắc sảo | #E06B5A (Hạ) | ô liu dịu #93A869 | #4D9699 → #A3DCE7 | 2 |
| c28 | Xuân | Đoan trang | #98CAA5 (Đông) | xanh lá non dịu #73B37D | #BF73A1 → #BF73A1 | 1 |
| c31 | Xuân | Sắc sảo | #ABD4BB (Đông) | xanh lá non đậm vừa #3A8753 | #D67064 → #D67064 | 5 |
| c32 | Đông | Dịu dàng | #EDDCC6 (Thu) | ngọc bích sáng #5DD0A9 | #49659C → #49659C | 1 |
| m02 | Thu | Dịu dàng | #A5C56A (Xuân) | ô liu dịu #93A86B | #CF8377 → #F8DED9 | 4 |
| m04 | Hạ | Đoan trang | #E8AD81 (Thu) | cam mơ sáng #F5A56B | #4E5D97 → #4E5D97 | 4 |
| m14 | Đông | Dịu dàng | #EDE0CC (Thu) | tím mận dịu #D28BCC | #5DAC85 → #A3DCE7 | 2 |
| m19 | Hạ | Dịu dàng | #D79B70 (Thu) | cam đào sáng #F39972 | #499597 → #499597 | 37 |
| m28 | Xuân | Đoan trang | #D9998C (Thu) | hồng mẫu đơn đậm vừa #B96899 | #4E5D97 → #4E5D97 | 4 |
| m29 | Xuân | Đoan trang | #AFD4BC (Thu) | hồng mẫu đơn đậm vừa #B96899 | #CA7281 → #DDD7EC | 9 |
| s16 | Xuân | Quyến rũ | #DE9CA4 (Thu) | hồng mẫu đơn đậm #87346A | #B35685 → #F4C1CF | 3 |
| s17 | Xuân | Quyến rũ | #D88579 (Thu) | hồng mẫu đơn đậm #9E497E | #FBD6C2 → #FBD6C2 | 3 |
| s24 | Thu | Kiêu kỳ | #882655 (Xuân) | đỏ rượu trầm thẫm #7D143D | #F1CCB8 → #FCDEC7 | 1 |
| s29 | Đông | Lạnh lùng | #BFD9CE (Thu) | ngọc bích sáng #95E1CD | #00675B → #00675B | 3 |
| s34 | Thu | Quyến rũ | #DF6959 (Xuân) | ô liu dịu #93A869 | #EAD9CD → #EBB890 | 3 |
| s37 | Xuân | Quyến rũ | #C982BE (Đông) | hồng xuân đậm #AC4D6F | #593A78 → #593A78 | 4 |
| s38 | Hạ | Quyến rũ | #D99F8C (Thu) | cam san hô sáng #E9937C | #872555 → #872555 | 5 |
| s44 | Thu | Quyến rũ | #A6593F (Hạ) | ô liu đậm #617437 | #94B594 → #94B594 | 2 |
| s48 | Xuân | Lạnh lùng | #DF9FA8 (Thu) | hồng hoa đào sáng #ED9BA9 | #70CCC1 → #70CCC1 | 3 |
| s55 | Xuân | Kiêu kỳ | #D79BC4 (Đông) | hồng xuân thẫm #87314C | #95B77B → #95B77B | 3 |
| s56 | Hạ | Quyến rũ | #D6A585 (Thu) | cam đào sáng #E4986A | #A991CA → #A991CA | 3 |
| s58 | Thu | Quyến rũ | #DC8570 (Hạ) | ô liu đậm vừa #6A7E40 | #B0DDD0 → #B7DBCA | 3 |
| s59 | Hạ | Quyến rũ | #EDA98C (Thu) | cam đào sáng #E6976E | #90BDF2 → #90BDF2 | 3 |
| s60 | Xuân | Quyến rũ | #D9998C (Thu) | xanh lá non đậm vừa #68963D | #649AB8 → #649AB8 | 3 |
| s61 | Hạ | Quyến rũ | #D2906C (Thu) | cam đào sáng #E6976E | #EDDCC6 → #FFF2EF | 1 |

Skins total 243 (c06 126 = mostly the 19/11 triều phục / rank design rounds drawn in her vermilion; m19 37 = 19/11 design copies + REDRAW3 t1–t8).

## Notes for the foreman
- **c06 is the "model outfit" (P6: c06 CŨ soft vermilion #CF816E).** It reads Thu, so G50 moves her Xuân to deep peony #933966 (Sắc sảo band). The c06 vermilion stays the tone reference in the P6 notes; tell me if c06 should be kept out of G50.
- Some released roots jump far because the old colour sat outside the group band: c14 cream → deep teal #077673, c32 cream → jade #5DD0A9, m14 ivory → soft plum #D28BCC, s16 → deep peony #87346A.
- m28 and m29 now share Xuân main #B96899 (unique by phụ: WARN, not FAIL).
- Releasing 29 roots reshuffled the pool: 152 non-root pairs differ from the previous L1583 proposal (least change is measured against P6 deep, not against the last proposal).
- Matching is by prompt hex. A picture drawn before the ledger, or one whose prompt only names the colour, is missed (none of the 29 is missing entirely).

## Files
four_season_L1583.py · g50_skins_L1645.py (new) · palettes_season_L1583.json · diff_L1583.json · g50_skins_L1645.json (new) · SKINS.md · L1583 sheets 00–06 (re-rendered, not sent). Commits a884067fb + report fix.

## JOB 2 — owner L1675 (via Foreman C #17): readable sheets of the new palette
`dev/art/palettes3/sheet_G50_L1675.py` → `dev/handover/review-sheets/palette_G50_L1675/bang_mau_moi_01..06.png` (6 sheets × 15 people, ordered by group). One row per person, columns XUÂN | HẠ | THU | ĐÔNG, big main + small phụ swatch + Vietnamese names, ★ gốc / ★ gốc (đổi) marks, season banner with a short feel line, title "Bảng màu mới (G50) · 0 cr". Looked at tờ 1 and tờ 5 (banner fixed). Not sent to the owner by me. 0 cr.

## §L1689 — HANDOVER (job NOT started; worker rollover before a context-heavy image job)
depth 7 · START_CTX ≈ 3 % · now ≈ 23 % of 1M (own estimate; get_session reads 0). Roll point = 28 %. This job needs Magnific downloads, cut-outs and several full-size LOOKs, so it would cross 28 %. I'm handing it over untouched so the successor does it end-to-end. 0 cr spent.
JOB (Foreman C #18 msg 04:35Z, owner L1689 + L1685, rule G45): make a page like the earlier try-on page "Thử dây chuyền — áo cổ vuông" (claude.ai/artifact/C9go2SDZvkRktndv6jJrts). New page title: "Thử đeo túi thơm & ngọc bội — cung nữ". Make one card per maid: tam đẳng KLpEwy4kqp (approved), nhất đẳng 4RFSnTa9Aa (approved), nhị đẳng 6Ab7cMSiJO (draft). Buttons: "Đeo túi thơm", "Đeo ngọc bội", "Cận eo". The worn item hangs from the waist sash as its own layer BEHIND the hands and the held item: cut a front layer with the hands and the held item so they stay on top (G45; no cloth covers the waist). Use existing drawn sachet / jade-pendant art cut from approved pictures, 0 cr. If a base picture already has a sachet painted in, say so on the page and in the report; do not paint over it. LOOK at every state, then publish a NEW artifact with the Artifact tool. Page labels: what it is, base pictures GPT 2.6 1k, 0 cr, TỔNG 0 cr. Send the foreman the link and the commit. Write the report under this heading.
Files to reuse: dev/art/necklace-square/ — page.src.html (4.2 KB layout), build_page.py, fit_necklace.py (layer fitting), fit_params.json, shots.js (Playwright screenshots), preview.py; report dev/handover/reports/EAR3.md (2.5 KB, method). The built demo necklace-square-demo.html is 557 KB; don't read it whole.
Next steps: read EAR3.md + page.src.html + fit_necklace.py → download the 3 bases from Magnific (creations_show / register_download, 0 cr) → find the sachet / ngọc bội art (grep ITEM_ART.md, item_gens.txt, gen_ledger "sachet|túi thơm|ngọc bội|jade pendant") → cut the item and the hands front layer (PIL / alpha masks; images_remove_background only with the foreman's OK if it costs credits) → build the page → shots.js → look → publish.
