# DESIGN5 — Hán ladder body shapes per rank (Foreman C #5)
depth 5 · START_CTX ≈ 4 % of 1M window (get_session read 0; own estimate) · model Opus · 0 credits, 0 gens, text only. NOT sent to the owner.

Brief: dev/handover/briefs/design5-han-shapes.md (owner Lượt 1290/1291/1292/1293).
Base: the current files (DESIGN4 ed3e8fd + #4 t4 throat-clasp fix d04ed67) copied to `dev/art/seasons4/han_bac_base/s62_t{4,5,6,8}_HAN_BAC_ed3e8fd.txt` = the new A38 base. t7 is unchanged (owner: "vừa phải"), so its file, base and .keep are untouched.
Edit script (for audit): every replacement is an exact one-time swap; listed below word for word.

## Per-rank changes (shape words only; t6 also fabric)
**t4 Tần → khúc cư vạt ngắn (short simple wrap). v2 per owner Lượt 1300 (relayed by Foreman C #5): NO petal/lotus panels, NO swallowtail — same Hán wrap family as Phi/Quý phi. Fabric đoạn unchanged.**
- `the hem winds once around the body in a curved spiral wrap;` → `the front panel wraps across ONCE to the side and ends in a smooth, softly curved hem edge (a short simple wrap, simpler than the Phi's full spiral, never petal panels, never swallowtail points);`
- `the same triple band on the spiral hem edge` → `… on the curved wrap edge`
- Caption: `Tần · Khúc cư đoạn, …` → `Tần · Khúc cư vạt ngắn đoạn, cổ ba lớp + choàng ngắn lưới ngọc trai`
- Why this reads BELOW Phi: same khúc cư family, but Tần's wrap crosses only once and stops at the side (Phi: full spiral from waist to hem with a deep border along it); Tần keeps medium-size flowers vs Phi's LARGE; Phi has two layered capes vs Tần's one capelet; Quý phi steps up to three straight-hem gấm robes. So Tần < Phi < Quý phi in wrap length, layers and embroidery.
- (v1 petal/swallowtail text removed entirely; `quju` wording of the base kept.) Capelet, beaded yoke, open neck, belt, zupei, colours, embroidery, hair, CAPELET CUT: all kept.

**t5 Phi → khúc cư (Hán A, curved spiral wrap). Fabric đoạn unchanged.**
- `a long straight-hem outer robe (zhiju) in light clear warm plum reaching the floor over an inner robe…` → `a long curved-hem wrapped outer robe (quju, khúc cư) in light clear warm plum reaching the floor, its front panel wound in a curved spiral around the body from the waist down to the hem, over an inner robe…`
- `a deep embroidered border along the whole hem and front opening` → `… along the whole spiral wrap edge and hem`
- Caption: `Phi · Trực cư đoạn, …` → `Phi · Khúc cư đoạn, hai lớp áo cổ rộng + choàng vai hai lớp`

**t6 Quý phi → trực cư (Hán B, straight hem), fabric GẤM (owner Lượt 1291).**
- FABRIC sentence: đoạn satin text → `The FABRIC is silk BROCADE (gấm) with a soft MATTE finish and only a very faint gentle lustre, like fine old silk, never glossy, shiny, wet-looking or plastic: thicker and richer than the lower ranks' satin, with a woven flower pattern all through the cloth, yet still soft and supple, NOT the heavy gold-thread brocade (gấm kim tuyến) of the Empress; it hangs in fuller, rounder, heavier folds while still flowing gracefully (thướt tha); the small embroidered motifs are stitched in fine gold thread.` (the existing `FABRIC: thick gold-embroidered brocade…` line now agrees)
- Layers: `the Phi's two robes (…) under a NEW third layer, a … guiyi over-robe whose skirt ends in a ring of long swallowtail points (yanwei) to the shins, with floating silk ribbon streamers;` → `THREE visible straight-hem robes (trực cư, zhiju), collars WIDE to the shoulders: a bright blush pink inner robe, a light clear warm plum middle robe and a NEW third layer, a long light clear warm plum straight-hem outer robe falling STRAIGHT to the floor in clean vertical lines, its front edges and level hem bordered with deep embroidered bands, the three level hems stepped one above the other at the floor;` (still 3 layers)
- RANK BLOCK `the swallowtail ring` → `the three stepped straight hems`
- `an embroidered satin cloud collar (yunjian)` → `an embroidered brocade cloud collar (yunjian)`
- Caption: `Quý phi · Khuê y đuôi én, đoạn + vân kiên` → `Quý phi · Trực cư gấm ba lớp + vân kiên`

**t7 Hoàng quý phi: shape unchanged. v3 fact sync (Foreman C #5): `richer than the Quý phi's satin` → `richer than the Quý phi's brocade` (t6 is gấm); allow line added to its .keep; 9979 chars; gate PASS.**

**t8 Hoàng hậu → EXACTLY 4 layers = HQP's 4 (owner Lượt 1293), less bulk.**
- `in FIVE visible layers` → `in EXACTLY FOUR visible layers, the SAME four layers as the Hoàng quý phi (never a fifth)`
- Layers: inner pink robe, plum zhiju, swallowtail guiyi (`a DOUBLE ring of…` → `swallowtail points and many ribbon streamers`), and `the Hoàng quý phi's long open-front over-robe, at her rank in royal golden yellow gold-thread brocade, falling STRAIGHT and CLOSE to the body to the floor (no added width), with a long train trailing on the floor BEHIND her, with very wide sleeves (…) and broad light clear warm plum borders edged with pearls`. The 5th "grand mantle" layer is gone.
- `mantle` → `over-robe` in the embroidery clause; colour rule `DOMINANT colour of the robe, mantle, sleeves and skirt` → `of the over-robe, sleeves and skirt` (yellow still dominant).
- Cloud collar: `a wide jewelled gold-brocade and pearl cloud collar with layered pearl fringes` → `a FLAT, compact jewelled gold-brocade and pearl cloud collar lying close on the shoulders (never wide or standing out) with ONE single tier of pearl fringe`.
- Kept: gấm kim tuyến, SIX collar bands, densest/largest embroidery, yellow shou + jade rings, belt, two zupei, pearl/jade strands, nine-phoenix crown, slim tall silhouette.
- Caption: `Lễ phục gấm kim tuyến, thụ vàng + vân kiên ngọc trai` → `Lễ phục gấm kim tuyến bốn lớp, thụ vàng + vân kiên ngọc trai`

## Char counts (Python chars; gate limit 10 000)
| rank | base ed3e8fd | new |
|---|---|---|
| t4 | 9994 | 9958 |
| t5 | 9868 | 9975 |
| t6 | 9966 | 9965 |
| t8 | 9997 | 9970 (v3) |

## Every cut (boilerplate only, to stay ≤ 10 000; all listed as allow lines)
From the duplicated line `Full-body standing figure head to feet, soft even light; fair porcelain skin; gentle expression … mouth never open; elegant, slim, clearly adult; beautiful/handsome romantic-lead looks for everyone; 3/4 or frontal view.` (its content is repeated by the MASTER head-to-feet/skin/proportion sentences and the ANGLE line; S18 smile clause kept verbatim):
- t4: `Full-body standing figure head to feet, soft even light; fair porcelain skin;`, `elegant, slim, clearly adult;`, `beautiful/handsome romantic-lead looks for everyone;`, `; 3/4 or frontal view`
- t6: `Full-body standing figure head to feet, soft even light; fair porcelain skin;`, `beautiful/handsome romantic-lead looks for everyone;`
- t8: same as t4 except `3/4 or frontal view` kept, plus `Everyone beautiful at every age.`
- t5: no cut.
No outfit / embroidery / jewellery / hair words cut. Every removed shape phrase is an allow line with "owner Lượt 1290/1291/1292" (t8: 1293).

## Checks
- `python3 dev/art/keep_check.py --all` → 11 sidecars PASS (new .keep: base `_ed3e8fd`; old DESIGN3/4 sidecar kept below as `#` comments for history).
- `check_store --scope tpN --age a18` (after v2 pull): t4 M07+S12+S13 (M06 no longer reported), t5 M06+M07+S12, t6 M07+S12, t7/t8 PASS = exactly the same FAIL set as before DESIGN5 (no new FAIL).

## Gate conflicts — NOT decided (for the foreman/owner)
1. **S12 PHI BẠCH vs G32** (t4–t6): store wants the phi bạch shawl, G32/DESIGN2 removed it ("no shawl"). Unchanged.
2. **S13 throat clasp vs open neck** (t4): S13 says "the robe closes only at the throat clasp"; owner Lượt 1280 open neck. Unchanged (S13 still REWRITTEN).
3. **M06/M07 vs đoạn** (t4–t6; t6 now gấm): MASTER thin-silk/gauze fabric sentence vs owner's matte đoạn / gấm. Unchanged.
4. **RESOLVED v3 (owner Lượt 1294 OK'd the train) — S19 "no train" vs t8 train**: brief asks for a long train BEHIND the Empress; S19 boilerplate (verbatim, gate) says `floor-length robe, only slipper toe tips peeking under the hem, no train`. I kept S19 verbatim (editing it FAILS S19) and added the train in the outfit text, so t8 now contains both. v3: S19 kept verbatim; added right after it the separate sentence `Exception: her own long train behind her.` (inside S19's parentheses FAILS S19). To fit ≤10 000 the t8 outer-robe text was shortened (my own added words only): `falling STRAIGHT and CLOSE to the floor`, `with a long train BEHIND her`. t8 gate PASS.
5. **FIXED v3 — t7 said "thick BROCADE (gấm), richer than the Quý phi's satin"**: t6 is now gấm, so the t7 comparison is out of date. t7 left untouched per brief ("KEEP as is"); suggest a one-word fix (`satin` → `brocade`) if the owner agrees.
6. (pre-existing, left as is per Foreman C #5) t6 pose line says `a breeze lifts her long stole` while the outfit says `no shawl`.

## Handover
Done; nothing left but this report + push. No successor needed.
