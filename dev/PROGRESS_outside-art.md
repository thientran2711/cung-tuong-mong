# PROGRESS review/outside-art (item D48, art worker)

Scope: content art for the outside (tiểu thư) road. No kit frames, no code edits (B2 = review/outside-r2-r1 wires it).
All art: Magnific gpt-2-6, folder ba4aecfe-..., every image looked at; none redone. Files are on the CDN (not in git); ids in dev/figwork/outsideart/gens.txt.

## Keys found in B2 code (origin/review/outside-r2-r1, dev/build/jkc.js)
- KCPL place keys kc_khue kc_sanh kc_thu kc_me kc_di kc_vuon kc_tu kc_hoc kc_chua kc_cho kc_tra kc_sach kc_hau; scene codes kcKhue... in `SCIMG` (code -> img base name, `img/<name>.webp`, 1280x720). B2's SCIMG currently points them at palace rooms (placeholders).
- Huynh trưởng: `T("huynh",...,["man:thive-1","man:thive-2"])` (guard armour placeholder), fid "role:identity" read via FIGIX.
- Dư đồ = list of pbtn, no map picture. No key for a map existed (proposed below).

## Delivered keys (all on CDN)
| What | Key / file | Use |
|---|---|---|
| Khuê phòng | img/kc-khue.webp | SCIMG.kcKhue="kc-khue" |
| Chính sảnh | img/kc-sanh.webp | kcSanh |
| Thư phòng của cha | img/kc-thu.webp | kcThu |
| Viện mẫu thân | img/kc-me.webp | kcMe |
| Viện di nương | img/kc-di.webp | kcDi |
| Hoa viên nhà | img/kc-vuon.webp | kcVuon |
| Từ đường | img/kc-tu.webp | kcTu |
| Phòng học | img/kc-hoc.webp | kcHoc |
| Chùa Hộ Quốc | img/kc-chua.webp | kcChua |
| Phố chợ | img/kc-cho.webp | kcCho |
| Trà lâu | img/kc-tra.webp | kcTra |
| Thư phường | img/kc-sach.webp | kcSach |
| Phủ thế giao | img/kc-hau.webp | kcHau |
| House map | img/map-kc-nha.webp (1792x1000) + img/map-kc-hotspots-nha.json | Dư đồ "Trong phủ" |
| City map | img/map-kc-kinh.webp (1792x1000) + img/map-kc-hotspots-kinh.json | Dư đồ "Kinh thành" |
| Huynh trưởng | img/FIGURES-huynh.json: role "man", sub "huynh", identity huynh-1 (sapphire blue scholar) / huynh-2 (emerald official); ageBand a18/a26/a36/a51; fig img/fig-man-huynh-N-aXX.webp, por img/por-man-huynh-N-aXX.webp (8 fig + 8 por) | own manifest like FIGURES-congtu (men pool never hands them to guards) |

Scenes are 1280x720 WebP, 190-250 KB, one base picture each; B2 grade by season/buổi through the existing scene-light grade (no own variants; add `-<sea>-<buổi>` files later if the owner wants hand-painted ones). Maps 440 KB / 467 KB (palace map is 393 KB). Rooms keep a clear middle-lower floor strip and furniture at the sides (same stage rule as palace rooms).
Hotspot JSON uses the palace map-hotspots.json schema (box x,y,w,h + anchor, normalised); extra keys kc_cong (house gate, goes out to the city), kc_nha (city map, back home), kc_ben (river/boats), kc_cung (Thần Võ môn, tuyển tú days only) — match OUTSIDE_PLAN §7.

## What B2 needs to wire
1. SCIMG: kcKhue:"kc-khue", kcSanh:"kc-sanh", kcThu:"kc-thu", kcMe:"kc-me", kcDi:"kc-di", kcVuon:"kc-vuon", kcTu:"kc-tu", kcHoc:"kc-hoc", kcChua:"kc-chua", kcCho:"kc-cho", kcTra:"kc-tra", kcSach:"kc-sach", kcHau:"kc-hau" (replace the palace placeholders; KIT_FLOOR/anchor: use the generic floor line like new rooms; check the figures' feet on the floor).
2. Huynh: load img/FIGURES-huynh.json like htLoad does for congtu (ix by `identity`), fid "man:huynh-1"/"man:huynh-2", pick by origin (any), band by age via figBest; replace "man:thive-*".
3. Dư đồ: show map picture + hotspots (kit map hotspot part used for the palace map) instead of the pbtn list, or above it; sub-tabs Trong phủ / Kinh thành.
4. Not drawn (not asked): bến sông and ngoại ô scenes, Thần Võ môn scene, grandmother/mother/di nương portraits.
## KIT REQUEST: none (content art only).

## Review r1 (art reviewer)
- 13 scenes, 2 maps + hotspot boxes (drawn on maps, all on the right buildings), Huynh trưởng 2 identities x 4 ages: all looked at, PASS.
- Huynh: same man across a18..a51 (hair greying, beard, stick), civilian blue/green dress, no pink/purple, fig 900 px tall like bacdich men; cutcheck figs <=0.34, portraits <=4.3 (existing congtu portraits score ~9); FIGURES-huynh.json keys match FIGURES-congtu (same set, order differs only).
- Maps recompressed 1792x1000 -> 1536x857 q72 (440/467 KB -> 385/408 KB); hotspot JSON image.w/h updated; re-uploaded to CDN (normalised boxes unchanged).
