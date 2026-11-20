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
