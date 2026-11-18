# men-emperor — 4 Emperor (Hoàng thượng) identities at a18, prompt-only (W32, 18/11)

PRIORITY #1 CHECK: OD 85 | ledger 11 | claims 8 (none RUNNING for emperor figures) | main 15 (live fig-emperor-a18-*.webp) | review/* 2 | archive 0 — reused: approved man look img/_review/male-proportion/man_prompt_fresh.png + its prompt (male-proportion.md §prompt-only man), live emperor art for role/identity.

Rules applied: FIGURE_GATE WHO (men = prompt only, no proportion gate), D4b brighter closed-lip smile, F Emperor (yellow-main OR black+gold-main, dragons, stiff SHORT cầu vai, crossed collar, NO Qing feathered hat), STYLE_ANCHOR men colours (no pink/purple). Model gpt-2-6, folder ba4aecfe…, 768x2000, style ref face-consort-01 only, bg cut.

Live a18 as listed: fig-emperor-a18-1 / -2 = ONE man (e1) in two outfits (yellow medallion robe + gold crown; fan / scroll); face-emperor-1..8 = 8 older/younger faces (several with Qing-style or black hats, beards). Owner's art plan wants 4 Hoàng thượng faces, so these are 4 NEW distinct young identities, each with his own robe + crown (no shared template).

| who | gens | robe / crown | notes |
|---|---|---|---|
| emp1 | 1 | imperial yellow, gold dragons + waves, jade belt; small gold+jade guan, long pin | gentlest face, closed smile; pointed cầu vai |
| emp2 | 1 | BLACK + gold dragons, dark-red lining, gold borders; tall black-gold crown, scroll | sharper jaw, confident; black+gold family (suits a51 later) |
| emp3 | 1 | golden yellow, crimson collar/borders, red clouds; flat miện board, bead strings only to brow | softest/palest face; rounded cầu vai; hands in front |
| emp4 | 2 | pale saffron yellow, jade-green trim + collar; gold dragon-head crown, red jade pin, fan | light stubble, manlier; gen1 was navy+gold → off-rule, regenerated yellow-main |

Files (CDN img/_review/men/emperor/, md5 verified, nothing live): emp1_a18.png … emp4_a18.png (cut, 768x2000), emp_a18_row.jpg (4 side by side, feet aligned), emp_a18_faces.jpg (face crops sheet).
Credits: 5 gens x 80 = 400 + 4 cuts x 3 = 12 → 412 cr. Gens per figure: 1,1,1,2 (max 4).

Weak points: the 4 faces share one "gpt-2-6 handsome" look (same eye/brow family; told apart mostly by jaw, stubble, crown, robe) — fine at game size, a face-swap pass could widen it; emp3's face is small under the wide miện; faces are all ~18-22, older bands (a26/a36/a51) not drawn; robes are bulky-wide in sleeves (not gate-checked: men have no proportion gate). Not matched to live e1 face (live ones are for review only; swap-in is the foreman's call).

## v2 — emp3 redo (owner 18/11 ~06:08Z: emp1/2/4 OK; emp3 "hơi bị 2D", different feel)
emp3 redone keeping design (golden-yellow + crimson robe, miện with bead strings to the brow, gentle face idea) with emp1 raw gen as STYLE ref + prompt "near-3D, same fabric/skin texture, NOT flat 2D". 2 gens (count 2), picked gen 2 (clearer soft smile, strings reach the brow); 1 cut. 163 cr (2x80+3); running total 575 cr; emp3 gens 3 of max 3. Files CDN img/_review/men/emperor/: emp3_a18_v2.png, emp_a18_row_v2.jpg (1,2,3v2,4), md5 OK, nothing live. Weak: emp3 v2 face sits closer to emp1's family (style-ref pull) — still distinguishable by crown, brows, jaw.

## v3 — proportion redo of all four (Foreman C addendum, owner ~06:30Z: use the live emperor's proportion as the men standard)
Tool: MediaPipe FaceLandmarker (lm10→152 = F, skull top = y10 − 0.30·F, feet = alpha bottom), same as overlay_m09. Standard = live fig-emperor-a18-1 F/(skull→feet) = 0.0841 (foreman's 0.083 → band 0.079–0.087). Refs per gen: image 1 = the approved emp raw gen (design/face), image 2 = live fig-emperor-a18-1 (proportion). Before redo: emp1 0.0753, emp2 0.0732, emp3 0.0780, emp4 0.0726 (heads ~12 % too small).

| who | gens (this redo) | F/body | vs live 0.0841 | vs 0.083 | verdict |
|---|---|---|---|---|---|
| live a18-1 | – | 0.0841 | 0 | +1.3 % | standard |
| emp1 | 4 (0.1093 stubby / 0.0894 / 0.0918 / 0.0764) → alt 0.0894 kept | 0.0897 | +6.7 % | +8.1 % | OUT of ±5 % (head ~7 % big); gens at cap 4 — not regenerated |
| emp2 | 3 (0.1033 stubby / 0.0786 / 0.0816) | 0.0826 | −1.8 % | −0.5 % | PASS |
| emp3 | 3 (0.0998 / 0.0848 / 0.0906) | 0.0873 | +3.9 % | +5.2 % | PASS vs live, on the edge vs 0.083 |
| emp4 | 3 (0.0927 / 0.0831 / 0.0777) | 0.0832 | −1.1 % | +0.2 % | PASS |

Lesson: prompting "head as large as reference 2" overshoots (stubby, child-like heads at 0.100–0.109); "head ~8–12 % larger than reference 1 + natural 7.5 heads tall" lands near the band (the prompt % overshoots ~1.6×). Designs, faces, colours kept; emp3 keeps the near-3D rendering. Rough pre-cut estimates (colour-diff alpha) were used to pick candidates; final numbers above are on the cut images.
Files (CDN img/_review/men/emperor/, md5 OK, nothing live): emp1_a18_v2.png, emp2_a18_v2.png, emp3_a18_v2.png (OVERWRITES the earlier emp3_a18_v2 near-3D-only version: same design, new proportion), emp4_a18_v2.png, emp_a18_v2_vs_live.jpg (live | 1 | 2 | 3 | 4 on red skull-top/feet lines with F/body). Older emp_a18_row_v2.jpg is now outdated (old proportions).
Credits this redo: 13 gens × 80 = 1040 + 9 cuts × 3 = 27 → 1067 cr. Overall men-emperor total ≈ 1642 cr.
Weak points: emp1 head still ~7 % big (decision needed: accept, or +1–2 gens beyond the cap-4); emp3 edge of band; sleeves wide/bulky; a26/a36/a51 not drawn.

### v3b — emp1 fix (ROOT-18 OK: up to 2 more gens, FIGURE_GATE G stop at 6)
Prompt "head ~8 % larger than ref 1, 7.5 heads tall", refs = approved emp1 raw + live. 2 gens: 0.0875 / 0.0877; kept the 0.0875 one (faces identical). emp1 now 0.0875 = +4.1 % vs live 0.0841 → PASS (vs 0.083 it is +5.4 %, same edge case as emp3). Final table: emp1 0.0875 (+4.1 %), emp2 0.0826 (−1.8 %), emp3 0.0873 (+3.9 %), emp4 0.0832 (−1.1 %). emp1 gens this redo: 6 total (stop). Credits +166 (2×80 + 2 cuts×3) → redo 1233 cr, men-emperor total ≈ 1808 cr. CDN emp1_a18_v2.png + emp_a18_v2_vs_live.jpg replaced (md5 OK); nothing live. Weak: emp1/emp3 sit at the top of the band (heads slightly large vs live).

## v4 / "v3" files — fresh redraw, NO proportion target (ROOT-18 order, owner 18/11: stop the ratio work; give back the square sheet 1-2-3-4)
Cancels the ratio redo above (v2 files + the ratio table are superseded; no measuring, no live/m09 body reference). Each figure drawn FRESH from the prompt only (approved a18 design prompt + "natural well-balanced male body whose head matches the body"), gpt-2-6, 768x2000, style ref face-consort-01 (emp3: emp1 raw as style ref, near-3D). Same robe/colours/crown/held item as approved: emp1 yellow+jade guan, emp2 black+gold+scroll, emp3 yellow-crimson miện+beads to brow, emp4 pale yellow+jade+dragon crown+fan. 1 gen each, all four LOOKED at: balanced head/body, handsome, soft closed-lip smile, no regen needed.

| who | gens | notes |
|---|---|---|
| emp1 | 1 | yellow dragon robe, jade belt, pointed cầu vai; face a bit different from v1 (fresh gen) |
| emp2 | 1 | black+gold, scroll, tall crown, stiff pointed cầu vai |
| emp3 | 1 | yellow-crimson, miện board with bead strings to the brow, near-3D |
| emp4 | 1 | pale-yellow + jade trim, dragon crown, fan, light stubble |

Files CDN img/_review/men/emperor/ (md5 OK, nothing live): emp1..4_a18_v3.png (cut 768x2000), emp_a18_v3_square.jpg (2000x2000, 1|2|3|4 labelled, feet aligned).
Credits: 4 gens × 80 + 4 cuts × 3 = 332 cr. Men-emperor running total ≈ 2140 cr.
Weak points: fresh gens ⇒ faces are close cousins of v1 but not identical (owner approved v1 faces — if she wants the exact v1 faces back, use the v1 PNGs with this v3 body); robes are wide-sleeved; a26/a36/a51 not drawn.

### v3c — emp3 redo, painterly face (owner 18/11: emp1/2/4 v3 OK; emp3 "như mặt người thật")
Old emp3 v3 read as a photo-real face. Redo, same design (yellow-crimson robe, miện with bead strings to the brow, stiff short rounded cầu vai), STYLE_ANCHOR prefix + explicit "hand-painted illustrated face, soft brushwork, idealised features, NOT a photograph". Refs: emp1_a18_v3 raw as STYLE (gpt-2-6 allows only 1 style ref) + emp4_a18_v3 raw as image ref ("draw a different man"). count 2 = 2 gens, both painterly; face crops side by side with emp1/2/4: both match; kept gen 1 (cleaner crown, strings reach the brow). 1 cut. Credits 2×80 + 3 = 163 → men-emperor total ≈ 2300 cr. emp3 gens in this round: 2 of max 3.
Files CDN img/_review/men/emperor/: emp3_a18_v3.png (replaced), emp_a18_v3_square.jpg (rebuilt with the new 3; emp1/2/4 v3 unchanged), md5 OK, nothing live.
Weak: emp3's face is a cousin of emp4's (image ref pull) — told apart by crown, brows, hands/robe; wide sleeves.

## M1 (W37) — ages a26 / a36 / a51 (18/11)
PRIORITY #1 CHECK: brief men-M1 (OD 0 | claims 0 | main 0 | review/* 0); reused emp a18 v3 (owner-approved) as the only identity+style ref (1 image ref each).
| figure | gens | credits | notes |
|---|---|---|---|
| emp1 a26 / a36 / a51 | 1 / 1 / 1 | 3×135 gen + 3×3 cut = 414 | same face + robe design; a26 mature young man, a36 light moustache/short beard, a51 grey temples + moustache, deep black + antique gold robe, both hands holding one jade ruyi in front |
Files (CDN img/_review/men/emperor/, md5 OK, nothing live): emp1_a26.png, emp1_a36.png, emp1_a51.png (cut, 2048x3072), emp1_ages.jpg (a18|a26|a36|a51 labelled sheet, feet aligned).
Weak points: a26 is very close to a18 (only slightly firmer); a36 beard is light; a51 greying subtle but clear in the sheet; wide sleeves as in a18.
| emp2 a26 / a36 / a51 | 1 / 1 / 1 | 414 | black+gold robe, dark-red lining, tall crown, scroll kept; a36 moustache + light beard; a51 grey temples + moustache, deeper antique gold, both hands in front holding the scroll. Files emp2_a26/a36/a51.png + emp2_ages.jpg (CDN, md5 OK). Weak: a26 close to a18; a51 sleeves very wide. |
| emp3 a26 / a36 / a51 | 1 / 1 / 1 | 414 | painterly (style ref emp1 a18, image ref emp3 a18; not photo-real); yellow-crimson robe + miện with bead strings kept; a36 moustache + light beard; a51 muted deep ochre-gold + wine-crimson, grey temples, both hands holding one jade ruyi. Files emp3_a26/a36/a51.png + emp3_ages.jpg (CDN, md5 OK). Weak: a26 close to a18; a51 sleeves wide. |
| emp4 a26 / a36 / a51 | 1 / 1 / 1 | 414 | pale-saffron + jade trim, dragon-head crown with red jade pin, fan kept; a26 light stubble; a36 moustache + light beard; a51 black + antique gold with dark jade trim, grey temples, both hands in front holding the (half-open) fan. Files emp4_a26/a36/a51.png + emp4_ages.jpg (CDN, md5 OK). Weak: a26 close to a18; a51 fan is half-open, not fully closed. |

M1 W37 TOTAL (emperor group done): 12 gens × 135 + 12 cuts × 3 = 1656 cr; 1 gen per figure (cap 3); all 12 looked at, none regenerated. Nothing live. LIST DONE.

## M1 round 2 (W37, 18/11) — owner: a26/a36/a51 proportion OK, a18 redone to a26 proportion; emp3 rejected (proportion), redone
- emp1/emp2/emp4 a18 REDRAWN: refs = that man's a26 cut (head size, head-to-body, silhouette) + old a18 (younger face). 1 gen each; looked at; sheets rebuilt (empN_ages.jpg).
- emp3 a18/a26/a36/a51 ALL redone: refs = emp1 a26 cut (body/head scale) + emp3's own a26 (face, robe, miện); a26 first (1 gen), then a18/a36/a51 from the new a26 (+ emp1 a26, a18 also old emp3 a18 for the younger face). 4 gens. Slimmer body, rounded shoulder pieces, hands together kept; painterly.
- Check sheet img/_review/men/emperor/emp3_check.jpg: emp1 a26 | emp3 a18 | a26 | a36 | a51, scaled to the same total bbox height. Caveat: emp3's tall miện counts in the height, so emp3 is scaled ~6-8 % smaller than emp1 on that sheet; by eye head and body match.
- Credits: 7 gens × 135 + 7 cuts × 3 = 966 cr (round total with round 1: 2622 cr). Nothing live. Old emp3_a26/a36/a51 on CDN overwritten by the new ones.
