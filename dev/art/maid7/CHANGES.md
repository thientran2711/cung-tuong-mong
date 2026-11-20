# MAID7 — sentences changed vs the live builder (for the owner's approval, 21/11)
Live = `python3 dev/art/t8-prompt-B/build.py m18 --state tmK --age a18 --nostyle` (live_tmK.txt); ma ma = `build.py m18 v0 --state mama --age a36 --nostyle --twocol auto --noflower` (D16 frozen recipe, slots only).
Test copies = test_*.txt made by make.py (every swap asserted). **build.py is NOT changed.**

## Common block (step 2 of the brief): what was copied
- The maid prompts ALREADY carry the master block (MASTER_COMMON.txt) incl. **M06 "The FABRIC is thin, light, flowing silk and gauze … drapery that sways and trails elegantly (thướt tha)"** + M07 "the silk has real weight". Nothing more to copy for the fabric; consorts t1–t5 use the same M06 (t6+ use BROCADE, not for maids).
- Embroidery wording copied from the consort low-rank style (build.py t1–t3: "a narrow band of small embroidered …", "embroidered … borders at the collar, cuffs and hem", "small sprays of embroidered …"), scaled DOWN for maids.

## 3D / realistic words (step 3)
Only one hit in every prompt: master M01 "…; NOT a photo, NOT a realistic real person, NOT 3D." It is a NEGATIVE and the gate requires master sentences verbatim (check_store MASTER) → KEPT. No positive realism word ("realistic", "photorealistic", "lifelike", "tả thực", "3D render") exists in any maid/ma ma prompt.

## Embroidery ladder (owner: "mày cứ tự xét")
| rank | embroidery |
|---|---|
| thô sử | NONE, but pretty neat clean cloth |
| tam đẳng | narrow band of small flowers at collar edge + cuffs only |
| nhị đẳng | narrow flower borders collar/cuffs/hem + a few sprays on the jacket |
| nhất đẳng | flower borders collar/cuffs/hem + sprays on the skirt + embroidered vest edge |
| chưởng sự cô cô | tone-on-tone woven pattern + flower borders a little wider than a maid's |
| nữ quan | live (crane rank badge + neat borders), unchanged |
| ma ma | D16 recipe unchanged |

## Swaps (old → new)
### tm0 thô sử (4)
1. `A palace maid of the lowest rank (cung nu tho su).` → `… (cung nu tho su), neat, pretty and well dressed.`
2. `plain coarse cotton/hemp in one plain faded colour (faded indigo-blue)` → `fine smooth plain cotton-silk in one soft clear colour (soft indigo-blue), pretty, well-fitted and spotless, never coarse, never ragged, patched or faded` (owner 20/11 overrides K2 "coarse cotton/hemp, faded")
3. COLOUR RULE `one plain faded faded indigo-blue` → `one plain soft indigo-blue` (also fixes the live doubled "faded faded")
4. ADDED before "Any flower or pattern…": `This uniform has NO embroidery at all and no gold thread: the embroidery words of the fabric sentence above do not apply to her; the cloth itself is pretty, smooth and clean.` (master M06 says "fine delicate embroidery … gold thread" for everyone)
### tm1 tam đẳng (1)
`with visible delicate embroidery (floral borders on the layered collar, sleeves and hem, small embroidered flower motifs), crisp fabric folds,` → `with SMALL SIMPLE embroidery fit for a tam đẳng maid: only a narrow band of small embroidered flowers along the collar edge and the cuffs, in a lighter tone of the same colour, no embroidery elsewhere; soft flowing fabric folds,`
### tm2 nhị đẳng (1)
`with woven brocade trim at collar, cuffs and hem,` → `with narrow embroidered flower borders at the collar, cuffs and hem and a few small embroidered flower sprays on the jacket (a little more embroidery than a tam đẳng maid),`
### nhất đẳng — NEW (from tm2 + K2), 3 swaps on the tm2 text
1. who: `A first-rank palace maid (cung nu, nhat dang), the highest palace maid rank, clearly finer than a nhị đẳng maid.`
2. Outfit: `a fine silk ruqun in {main}, with embroidered flower borders at the collar, cuffs and hem and small embroidered flower sprays scattered on the skirt, a long sleeveless silk vest on top (the ONE added layer, with a narrow embroidered border down its front edges; NO outer coat, NO cloak, NO cape), an embroidered silk sash with a jade pendant and a short silk tassel on a silk cord; neat double-loop buns with several silver and pearl hairpins and one small silver comb; clearly finer than a nhị đẳng maid, still far simpler than any imperial consort. Sleeves about two and a half hand-spans wide,`
3. item: tm2 letter → `an embroidered handkerchief` (the builder's default item; nhất đẳng has no item cell)
### tm3 chưởng sự cô cô (1)
`with subtle tone-on-tone woven pattern and neat embroidered borders,` → `… and neat embroidered flower borders at the collar, cuffs and hem, a little wider than a maid's,`
### tm4 nữ quan, ma ma: 0 swaps (live text).

## Gate (check_store.py, store args = live args)
tm0 tm2 tm3 tm4 mama: STORE PASS + APPROVED PASS. tm1, nhất: STORE FAIL only on the swapped outfit/who sentences (expected, test); `--scope tm1` / `--scope tm2` APPROVED PASS; MASTER/NOEAR/NOFRUIT/PETS pass; all ≤ 10 000 chars.

# ROUND 2 (owner 20/11 ~14:50Z, brief maid7b.md) — make2.py → test2_*.txt (builder untouched)
Colours m18: main powder blue #A7BAD2, secondary deep rose #CA7281 (her M_COLS, same as her round-1 ma ma).
### thô sử v2 (base test_tm0)
- Outfit sentence replaced whole: WORKING uniform, powder blue cotton-silk, TWO SEPARATE PIECES (never one long robe neck-to-feet): short crossed-collar jacket to the hip + ankle skirt + plain work APRON (tạp dề, lighter tone) tied at the waist; sleeves ~1 hand-span, cuffs tied back with a cord; NO embroidery; deep rose ONLY on a narrow sash + small hair tie; simple bun, one wooden pin. ("no apron" of the live text removed.)
- COLOUR RULE: jacket/skirt/apron = powder blue held-back tone; deep rose only on sash + hair tie.
### tam đẳng v2 (base live_tm1)
- Outfit: ruqun, long inner robe + skirt powder blue, SMALL SHORT outer top (short jacket, short outer sleeves, ends just below the waist, smaller/shorter than nhị đẳng's half-sleeve jacket) in deep rose; small embroidery only at collar edge + short-sleeve edges; sash + small jade/tassel; double buns, silver pearl pins.
- COLOUR RULE tail: "her main colour powder blue on the inner robe and skirt, her secondary colour deep rose clearly visible on the short outer top."
### nhị đẳng: round-1 picture kept (KLpM5Iokqp), no regen.
### nhất đẳng v2 (base live_tm2)
- who = nhất đẳng (as round 1). Outfit = the round-1 MA MA outfit sentence VERBATIM (D16 recipe words) with 3 slot changes: "(the ma ma costume, never poor)" → "(a first-rank palace maid, nhất đẳng, never poor)"; hair → "hair in neat double-loop buns with several silver and pearl hairpins"; "a palace ma ma's sleeves" → "a palace maid's sleeves".
- tm2 COLOUR RULE → the ma ma COLOUR RULE + TWO-COLOUR RULE sentences verbatim. Item: embroidered handkerchief.
### nữ quan v2 (base test_tm4 = live)
- master M06 (thin silk + gauze, thướt tha) REMOVED; consort store BROCADE sentence verbatim ("FABRIC: thick gold-embroidered brocade with a graceful, flowing drape.", master_common.BROCADE / build_all FABRIC_B) put right before "Pose:" (same place the builder puts it for high ranks).
- Hair: the builder's own a36+ words used at a18: "…over her hair, which is ALL pinned UP in a neat bun under the cap (nothing loose down her back);"
- Gate: approved FAIL on exactly 2 lines (B12 "brocade in a maid prompt", M06 missing) = the owner's ordered change; if approved, rule B12 needs a nữ quan exception (foreman).
### ma ma (new outfit) + chưởng sự (new colour): NOT drawn (owner deciding uniform colours).

# ROUND 3 (owner 20/11 ~15:35Z, brief maid7c.md; K19 uniform colours; new rules K22 hair always up, K23 no broom) — make3.py → test3_*.txt
Uniform (K19) cung nữ = powder blue #A7BAD2 main + deep rose #CA7281 secondary (the round-1 ma ma pair). Her own accent colour: NOT added (owner proposal still open).
HAIR sentence (copied from build_mama --oneref) added before "Pose:" in every round-3 prompt: "HAIR: ALL her hair is pinned UP in a neat bun: NO long loose hair down her back or over her shoulders, NO ribbons in the hair." (thô sử: without "NO ribbons", she has a cloth hair tie).
- thô sử: sash → "ONE single clean narrow cloth sash at the waist (one even solid colour, no second band under or over it, never blotchy, mottled or patchy)".
- tam đẳng: short top "made of the SAME fine silk brocade with a soft sheen as the outer jacket of the higher maids (never a plainer or duller cloth), its FRONT PANEL (vạt áo) one continuous piece clearly and fully visible from the collar down to its hem, never cut off or hidden behind the sleeve"; + "a narrow band of small embroidered flowers along the SKIRT HEM border".
- nhị đẳng (base round-1 test_tm2): robe+skirt deep rose, half-sleeve brocade jacket powder blue; "narrow embroidered hem band, NO embroidery on the body of the skirt"; COLOUR RULE tail names both colours.
- nhất đẳng (base round-2): "+ no extra jewellery" after the hairpins; hair sentence.
- chưởng sự: plum purple → "eggplant purple (tím cà), a soft medium eggplant purple (clearly purple, not dark, not black, not grey)" (+ COLOUR RULE); a18 bun words (builder's own a36+ words); item broom → "a small cloth-bound palace ledger book"; + "She never holds a broom."
- ma ma a36: NEW outfit (owner: round-1 ma ma outfit moved to nhất đẳng): "a long floor-length robe of fine silk with a crossed collar closing to the right, under a long-sleeved knee-length outer coat (beizi) worn open at the front with straight front edges, a broad embroidered border band along its front edges, hem and cuffs; a softly pleated skirt below; a narrow brocade belt with a small jade pendant; restrained embroidery of small clouds and plum blossoms ONLY on the border bands; … two plain silver hairpins …"; colour = jade blue-green (xanh lam ngọc bích leaning green) #4E8FA3 + soft ivory secondary (secondary my pick, owner gave none). Gate: approved FAIL only S32 "two front panels (hai tà)" = the old ma ma outfit (expected).
- nữ quan: v2 kept (5jDomu5Kxe).
