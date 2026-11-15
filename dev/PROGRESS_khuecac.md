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
jkc reads it itself (see Code below).

## State
- Pilot 4 DONE (c05, c08, c29, m05)## Second dress: nhà nghèo (owner 02:30Z, pilot approved)
Tier `ngheo` in the same manifest: plain cotton/linen jacket + long skirt + plain apron or sash, muted faded tones of her own colours with
undyed beige, NO patches/rags/dirt, at most one wooden or plain silver hairpin, humble prop (ladle, clay teapot, mending, lantern, hemp
skeins, books bundle, bamboo fan, herb basket). `mkprompt.py --ngheo <face>`. Used for origins thd and td.

## Pipeline changes after the pilot
- idref hosting: idref jpgs pushed to the CDN under img/_kcwork/idref-<face>.jpg, then creations_upload_image from that URL (no presigned uploads).
  img/_kcwork/ is temporary work data (84 small jpgs) — can be pruned from the bucket later.
- Every cut goes through `retouch.py` (rtall.py sheet; compact dark blobs on forehead / outer cheeks inpainted) and is checked at a large
  crop; leftover specks by hand with `spot.py` (c09 kc, m41 kc, m52 kc). Cuts failing cutcheck get `harden.py` (alpha curve) and fin again.
- `fin.py WORKDIR TIER faces` → img/fig|por-...; `ledger2gens.py WORKDIR` → gens.txt batch section; `manifest.py WORKDIR`;
  `cp img/FIGURES-kc.json WORKDIR/img/` and `python3 tool/x/cdn_sync.py <files> img/FIGURES-kc.json` from WORKDIR.
- `grid.py WORKDIR TIER OUT.jpg` → contact sheet of all 84.

## State (11/15 ~04:00Z)
- DONE: 84 faces × 2 dresses = 168 records in img/FIGURES-kc.json; all 336 fig/por webp on the CDN (cdn_sync --check: 0 to upload).
- Sheets: dev/shots/khuecac/all.jpg (kc, 84) and all-ngheo.jpg (ngheo, 84); pilots pilot.jpg / pilot-ngheo.jpg.
- cutcheck after harden: all fig < 8, all por < 20. Hardened: c02 kc/ngheo, c06 ngheo, c11 kc, m13 m25 m33 m35 kc.

## Code (dev/build/jkc.js, end of file)
- KCFX loaded from img/FIGURES-kc.json (only here; re-read every 5 min). kcDress(): `ngheo` for origin thd/td, else `kc`.
- figFor wrapper: while isKc() (S.kc and not S.kc.inPal) her figure/portrait (S.pid / S.fid, consort or maid face) = the home dress;
  missing art → the old path (t1). Outside isKc nothing changes, so these tiers never show in the palace.
- kcPor wrapper: thứ muội wears the same dress as her, the two bạn khuê phòng wear kc.
- Tests: `node dev/test/outside/dress.js OUTDIR` (Fold 755x1000@2, iPad 1180x820@2; tt + thd; home, Gia tộc, then kcEnter → palace tier):
  all checks true, 0 page errors, no overflow. `node dev/test/outside/oldsave.js` (now Fold + iPad): old save loads and plays, 0 errors.
  Both need zz-test.html (dev/index.html with a <meta charset> line) and the kc/ngheo webp copied into img/ (not committed).
