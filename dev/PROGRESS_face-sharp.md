# PROGRESS review/face-sharp (owner 15/11: her face hazy on stage; large half-body soft; yellow rectangle when selected)

## 1. Stage: hazy face beside a crisp maid (owner-face-blur.jpg)  — DONE (80f61826)
- NOT the file / background removal: fig-consort-c30-t2-a18 (her picture in the shot) is at the 69th percentile of face detail of
  6412 women figures (dev/measure/face_sharp_scan.py, face boxes from img/toil-fit.json); no see-through face; fringe normal.
- CAUSE: continuous animations on HER picture only: idle sway (meidle, non-uniform scale 1→1.012) + pulsing rank halo (j59halo, animated
  filter) / pulsing selection glow (j59selp). The compositor re-samples the picture every frame: face fine detail −8…−13 % vs the file
  (dev/test/face-sharp.js + face-sharp-cmp.py, variants: any one of the two animations alone already −8 %; static = 1.00).
- FIX (whole class): no infinite animation on any people picture (p1 #mefig / .tok.fig .figimg figidle, j59 meidle/j59halo/j59selp);
  halo + selection glow static. KIT.md motion rule STILL PEOPLE. Class scan dev/test/face-sharp-scan.js (stage home, stage 3 consorts,
  selected person, selected her, Hậu cung, Giao tình, Tư trang, dialog):
  | viewport | before animated people pictures | after |
  |---|---|---|
  | 755x1000@2 | 18 | 0 |
  | 1000x755@2 | 15 | 0 |
  | 1180x820@2 | 17 | 0 |
  | 1366x1024@2 | 22 | 0 |
  | 844x390@3 | 18 | 0 |
  Face detail on screen / file (her | maid): 755 before .92/.91 → after 1.008/1.003; 1000x755 .97/.87 → 1.009/1.005;
  1180 .88/.87 → 1.01/1.01; 1366 .95/.87 → 1.005/1.008 (844x390: figure drawn below native, not affected).
- skin-match uploads (1266 regenerated): NOT softer — 26 changed files sampled vs my pre-upload copies: head detail 0.991–1.010.

## 2. Large half-body soft (owner-face-blur-2.jpg, identity screen .kidfig2 at 94 dvh) + every figure drawn above 900 px — IN PROGRESS
- Cause: every fig-*.webp is 900 px tall; identity screen draws ~1.7–2.1x, stage 1.2–1.4x, dialogs up to ~1.5x → browser upscale.
- Source exists at ~1800 px: the gpt-2-6 background-removed sheets (3840x1920, Magnific bg id in FIGURES*.json). No AI upscale needed.
- dev/figwork/hdcut.py: cut the same figure from its sheet at ≤1800 px, keep all later fixes (skin-match colour, huadian shrink, moles)
  by DETAIL TRANSFER (hd = up(fixed900) + sheet fine detail, faded out where the 900 file was edited); registration checked, bad = skip.
- dev/figwork/hdqa.py: back-check (down(hd) == the approved 900 file: luma diff < 2.5, alpha < 3) + head detail gain ≥ 1 + face sheets to LOOK at.
- Game: dev/build/jfighd.js kitFigHD — every <img> of a fig-*.webp gets srcset "<900> w, <hd> w" + sizes = drawn width: the browser loads
  img/hd/<name> ONLY when the figure is drawn larger than its file (budget kept); src unchanged (layout code keyed on src untouched).
  Manifest img/FIGURES-hd.json {"files":{name:[w900,wHd]}}.
- Stage test with HD (755x1000@2): face detail 1.44x the 900 file upscaled (the HD file at 2.2x scale of the 900).
- Uploaded so far: see "CDN" below. Batch: FIGURES.json (consort / player / emperor / eunuch) 1556 files with a sheet URL.
  NOT yet: 380 FIGURES.json files whose sheet URL is not in dev/figwork/urls.json (need creations_get), FIGURES-servants (maids: no bg id,
  sheet = magnificUrl with background → needs luma-only registration + alpha from the 900 file), FIGURES-ty (local-isnet cut), por-* portraits.

## 3. Yellow RECTANGLE when she is selected (owner-stage-select-rect.jpg) — DONE (3b797182)
- Cause: cut-out figures keep faint alpha haze (1–12) over ~1–3 % (up to the whole box) of their rectangle (bg removal + lossy WebP alpha);
  the stacked drop-shadows (halo / selection glow / ground shadow) shadow that haze → a rectangle glow.
- Fix (family): SVG filter #kfa (alpha' = 1.07a − .065) FIRST in every people-picture filter: p1 #mefig/.figimg, j59 HG/SG/unknown/sil,
  jk4 .kesimg (dialogs), j79 .kidfig2 (identity), j90 .kpod-img (podium). Glow now traces the silhouette; sharpness unchanged (1.016).
  Pickers use framed portraits (.ksel ring on the frame, rectangular by design) — unchanged.

## CDN
- img/FIGURES-hd.json + img/hd/fig-*.webp uploaded with cdn_sync after hdqa PASS + looking at the face sheets (left 900 up, right HD).
- Uploaded: chunk 1 (68, incl. all c30), chunk 2 (262), chunk 3 (395) = 725 HD twins, all PASS, all face sheets looked at. Rest of FIGURES.json
  batch running (dev/figwork/hdcut.py, worker files in /home/user/wt/face-sharp/.work/hd; resume = rerun hdcut on hd/part0..3.tsv, it skips done).
- 25 of the 200 missing sheet URLs fetched with Magnific creations_get (49 files, part3). The other 175 sheets (~330 files, mostly t5/t7/t8 and
  tm*-a51 aged edits) still need creations_get (token-heavy: ~1 k tokens per id) — left for a helper with Magnific API access.

## KIT
- §71 kitFigHD + #kfa (registry: coordinator) in KIT.md + kit page sample.

## Not covered (decision needed)
- Maids / mama / servants (FIGURES-servants): their gpt-2-6 sheets are only 2048x1024 (figure ~950 px) — no higher-res source exists.
  HD would need Magnific images_upscale (~90–270 credits per sheet x 947 sheets). Stage maids are drawn 1.2–1.4x.
- FIGURES-ty (trung y, local isnet cut) and FIGURES-others (men, officials): not yet cut; same detail-transfer method works if their sheets have ≥1.5x.
- por-* portraits: cut from the 900 figure (~1.6x upscaled inside); re-cut from HD twins is the next step (needs por box registration).
