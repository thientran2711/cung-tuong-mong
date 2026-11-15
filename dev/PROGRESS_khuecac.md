# PROGRESS — khuê các thường phục (branch review/khuecac, from origin/review/outside)

Order (owner 01:40Z, scope widened 01:55Z): an at-home "khuê các" dress (tier `kc`, age band a18 only) for EVERY face the player can wear
on the tiểu thư route = all 84 faces (32 consorts c01–c32 + 52 maids m01–m52). Not lễ phục tuyển tú (not ordered).
Player looks look1–4 (role player) are NOT needed: j66 rolls only consort faces for new lives, j86/j88 picker adds maid faces; looks are old saves only.

## Rules applied
gpt-2-6 only, Magnific folder ba4aecfe…; identity ref = the face's live t1 a18 figure (idref.py: + face close-up, red/gold huadian painted out)
+ 1 style ref (consort-01/05/12/18 rotated). No huadian, no moles ("no moles, no beauty marks, clean even skin" in every prompt),
unmarried half-up hair with ribbons, light jewellery, narrow sleeves + vest + pleated skirt (clearly simpler than t1), signature colours
per face, calm standing pose, a different prop per face. Every face checked at a large crop (forehead, cheeks, chin, lips) before cutout.

## Pipeline (dev/art/khuecac/)
1. `python3 getref.py dev/figwork/out/khuecac/ref c05 m05 …` (live t1 a18 figures) → `python3 idref.py dev/figwork/out/khuecac c05 …`
2. upload idref png (creations_request_upload/finalize) → images_generate gpt-2-6 9:16 2k with `mkprompt.py <face>` (add EXTRA prop/motif per face)
3. look (heads.py), forehead/mole check; fix marks (gpt-2-6 edit, else tiny local retouch) → remove-background on that single image
4. fig = alpha bbox → 900 px high webp in dev/figwork/out/khuecac/img/; `porcrop.py`; `cutcheck.py` (fig <8, por <20)
5. gens.txt row with status `final` → `python3 manifest.py dev/figwork/out/khuecac` writes img/FIGURES-kc.json
6. images + manifest to Cloudflare: cdn_sync.py from origin/review/cdn-images (copy to dev/figwork/out/khuecac/tool/x/ so its root is the work dir)
Images are NOT in git (dev/figwork/out/ ignored). Separate manifest img/FIGURES-kc.json: j39 does not load it and must not (figTier('kc') = null);
jkc must read it for her figure while S.kc is active (not wired yet — code task).

## State
- Pilot 4 DONE (c05, c08, c29, m05): dev/shots/khuecac/pilot.jpg, on CDN (img/fig|por-<role>-<face>-kc-a18.webp + img/FIGURES-kc.json).
  cutcheck: fig 0.9–2.5, por 4.4–8.2 (all pass). WAITING FOR OWNER APPROVAL — do not draw the other 80 before the go.
- Spare: c14 round-1 gen 1lppEaJr4r (clean, can be used if the look is approved).
- Remaining after approval: 30 consorts + 51 maids; EXTRA props/motifs per face to be added to mkprompt.py (MPAL from FIGURES-servants t1 a18 palette).
