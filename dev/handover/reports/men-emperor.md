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
