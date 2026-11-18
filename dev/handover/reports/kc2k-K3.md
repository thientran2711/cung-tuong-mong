# kc2k-K3 — JOB B (maids m01–m52, kc + nhà nghèo 2K transparent re-make), SAMPLE round
PRIORITY #1 CHECK: live CDN img/FIGURES-kc.json (420 records: kc a18 = 52 maids + 32 consorts, ngheo a18 = 52 + 32, none missing) | review/khuecac dev/PROGRESS_khuecac.md ("all 84 faces, both dresses") | brief root32-orders K3 + FIGURE_GATE A0 REFERENCES re-read | claims: own. START_CTX ~8 %.
FINDING (accepted by ROOT-31/32): the 58 non-consort faces = m01–m52 (52) + 6 princesses (3 NC + 3 BD, painted separately, not on the ladder). All 52 maids ALREADY have live kc + ngheo a18 (img/fig-maid-mNN-{kc,ngheo}-a18.webp, ~350x900 px) → re-make, not new drawing. Princesses skipped here.

## Method (JOB A method)
Per figure: refs = EXACTLY TWO: (1) the live kc/ngheo image of that maid (the liked image, uploaded under a neutral name), (2) m09 style image eIyOFEidqL as type `style`. gpt-2-6, 9:16, 2k, `extraSettings {"transparentBackground": true}` → output 1520x2688 RGBA straight from the model (alpha 0..254, ~60 % transparent pixels); NO images_remove_background used. Prompt = "same woman/face/hair/outfit/colours/pose, redraw sharp 2K; second ref ONLY for skin/painterly style/fabric; change ONLY the held item → ONE item of FIGURE_GATE H for the status; bare forehead, no moles; closed-lip smile; no cup/teacup/teapot/bowl; transparent background". (nhà nghèo: + plain cotton, no silk sheen/embroidery, no jade/gold.)
Credits: 6 gens x 135 = 810.

## Sample (3 maids, 6 gens) — CDN https://ctm-img.victoria-tntt.workers.dev/img/_review/kc2k/
| maid | colour | kc old → new item | ngheo old → new item | files |
|---|---|---|---|---|
| m01 | sage green and cream | CUP → embroidered silk handkerchief (kc H1) | scroll → small woven bamboo basket with wild flowers (ngheo H1) | m01_a18_kc_2k.png, m01_a18_ngheo_2k.png, sheet_m01.jpg |
| m20 | slate blue and gold | cup/bowl → small embroidery hoop with half-finished silk flower (kc H4) | cloth → plain cloth bundle tied with a knot (ngheo H6) | m20_a18_kc_2k.png, m20_a18_ngheo_2k.png, sheet_m20.jpg |
| m37 | pale aqua and silver | scroll → thread-bound book (kc H3) | plum branch kept (already ngheo H8) | m37_a18_kc_2k.png, m37_a18_ngheo_2k.png, sheet_m37.jpg |
Sheets = old kc | new kc | old ngheo | new ngheo.
Magnific gens: m01 kc iG5AG6m3uK, m20 kc 9ZHRZ9xNYZ, m37 kc 9ZHR26jNYZ, m01 ngheo 1ldsgLXr4r, m20 ngheo fHzFqhTCDY, m37 ngheo lJt7OLxgv9. Live-image uploads (refs): m01 kc jUoSUdjLD0, ngheo 6Ab2AqaiJO; m20 kc kseLseI16B, ngheo gOmJOvUSXO; m37 kc SyhOyftUb8, ngheo Xm9tm3GBfo. Folder ba4aecfe-efce-47e2-b53f-30d292091886.

## Looked at every image (≤600 px, old|new)
All 6 pass at first look: same face/hair/outfit/colours/pose, sharp, bare forehead, closed-lip smile, no cup, still sleeves, transparent. FIXED vs live: m01 kc cup; m01 ngheo had a forehead mark (gone) ; m20 kc bowl; m20/m01/m37 scrolls/cloth replaced by list items.
Honest notes: (1) m01 ngheo new keeps the gold flower hairpins of the live image (the nhà nghèo prompt rule says at most one plain pin) — if the owner wants it stricter, add "one plain wooden pin only, no gold, no flowers in her hair" to the nhà nghèo edit prompt; (2) m37 ngheo hair ornament became a simpler pin (ok); (3) not run: dev/figwork/cutcheck.py (figwork not checked out; PNG alpha scan only).

## Next (after owner look): same prompt per maid for the other 49 maids x 2 dresses (98 gens = 13,230 cr); item per maid spread over the 10-item H lists so neighbours differ; ledger of old item → new item per maid.
STATE: nothing live changed; no code changed; only CDN review folder img/_review/kc2k/ (wipe: python3 dev/site/cdn_sync.py --wipe-review kc2k).
~100 % samples / waits owner look; ~6 % of 104 re-makes (6/104) done.

## ROUND 2 (v2) — ROOT-33 order 23:13Z: NEW rules, same 3 maids × kc + ngheo
PRIORITY #1 CHECK: FIGURE_GATE A0 REFERENCES re-read (style3_girls a3d2b08) + order of ROOT-33 | claims own | main none. ctx ~45 %.
RULES USED: refs = EXACTLY TWO: (1) her live kc/ngheo image (identity/design), (2) style3_girls Xm9tPkMBfo as type `style` (replaces m09 alone). gpt-2-6 9:16 2k transparentBackground. kc = same prompt as v1 + "IGNORE its background completely"; one item from FIGURE_GATE H (same items as v1). NHÀ NGHÈO rewritten to READ POOR: plain cross-collar short jacket of coarse undyed-looking cotton/linen, plain long cotton skirt, cotton apron; muted faded colour + natural beige, matte, no silk sheen/brocade/vest, thin plain border stitch at most; hair = one plain low knot, cloth ribbon, ONE plain wooden pin; NO gold/flowers in hair/crown/tassels/jade/necklace/earrings/bracelet.
FILES (CDN img/_review/kc2k/): mNN_a18_{kc,ngheo}_2k_v2.png + sheet_mNN_v2.jpg (order: old kc | 2K v1 kc | v2 kc | old ngheo | 2K v1 ngheo | v2 ngheo).
GENS: 10 = 6 first + 4 regens (1350 cr). FINDING: with style3_girls as the style ref, 4 of 6 first outputs leaked the style image's parchment/floral background into the "transparent" canvas (m01 kc big blob, m37 kc halo, m37 ngheo cloud, m01 ngheo 28 % haze; m20 clean). Regenerated those 4 with the extra sentence "IGNORE its background completely … background completely transparent with NOTHING behind or around her: no backdrop, no parchment, no painted flowers/branches, no smoke, no haze, no glow, no stain" → all clean (margin alpha 0.00 %). ADD THIS SENTENCE TO THE MASS PROMPT (kc + ngheo) when style3_girls is used.
Gens v2 final: m01 kc vQAuzLka47, m20 kc p8yoypMehw, m37 kc 1ldsB63r4r, m01 ngheo xSBg8rljfW, m20 ngheo fHzFnL6CDY, m37 ngheo rgXlo3Kxtc. (rejected first tries: gOmJmlbSXO, tCRfZvFmZJ, gOmJhOxSXO, Lw8UI3HswO.)
Looked at all 6 (≤600 px): face/hair/outfit colours kept, items = H list (m01 kc handkerchief, m20 kc embroidery hoop, m37 kc thread-bound book; m01 basket with wild flowers, m20 cloth bundle, m37 plum branch), bare forehead, closed lips, no cup. Ngheo v2 clearly reads poor vs v1 (no gold/flowers/jewellery, rough matte cloth, plain apron, one wooden pin). Verified alpha numerically: margins empty, 0.4–0.7 % semi-transparent edge px.
Honest notes: m37 ngheo has one pin + knot (ok); m01 kc v2 sash became a small bow (minor change vs live); m37 kc book colour now rosy-brown. cutcheck.py not run.
~12 % xong (6 of 104 in v2) / ~0 % chơi được (nothing live).
