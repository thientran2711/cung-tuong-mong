# art-complete-p2 (Foreman C worker, Sonnet art) — status 16/11 ~21:10Z — HANDOVER (context)

## Part 1 act-pics2: DONE already (nothing to paint)
Live CDN check (img/ACTS.json + img/_index.json): 803/804 meaning keys have img/act-<key>-h.webp or act-<key>.webp (709 "-h" files); live ACTS log 834/837 rules, 0 picture keys missing. Only `scene:rv` has no file by design (runtime room picture). "143 keys left" in review-art-complete-r2 is stale.

## Transparency answer (owner 21:02Z)
Magnific gpt-2-6 CAN paint on a transparent background: images_generate extraSettings {"transparentBackground": true, "quality": "high"} + resolution "4k" (270 credits per 21:9 sheet). Result = real RGBA PNG 3840x1648, clean edges on dark, sharper than the old route. Foreman C told by message. No remove_background step needed.

## Part 2 grown kids a26/a36/a51: 25/48 identities done and LIVE on CDN
Done: p01-p21, f01-f04 (p01-p04/f01-f04 = old batch; p05-p21 = this session, transparent 4k, all looked at on a dark sheet + brow crops: handsome/beautiful, same face as band 20, no pink/purple, no moles, no back-turned pose). 17 sheets x (3 fig + 3 por) + FIGURES-kids.json pushed (cdn_sync). por-kid-p21-a26 was mis-cropped by the haar detector and re-cropped by hand from the fig.
LEFT (23 sheets): p22 p23 p24 f05-f24. Job texts: `python3 kd_spec.py kd-p22` (in this folder; needs img/FIGURES-kids.json beside it, see below), refs = ref ids printed by kd_spec.
Gen ids so far: kd_gensT.txt, bg lines kd_bgT1.txt / kd_bgT2.txt (this folder).

## Method (copy exactly)
1. Tree: /home/user/wt/ctm (dev/figwork/artcomplete/{kd_spec.py,proc.py,browsheet.py,demole_por.py,.cache/pylib (opencv 4.10 via pip --target), dev/figwork/porcrop.py, dev/site/cdn_sync.py}); sources from origin/review/art-complete-r2 (`git show origin/review/art-complete-r2:dev/figwork/artcomplete/proc.py` etc.). img/FIGURES-kids.json from the CDN (cdn_sync --pull img/FIGURES-kids.json before editing).
2. Per id: images_generate gpt-2-6, aspect 21:9, resolution 4k, extraSettings {"transparentBackground":true,"quality":"high"}, ONE reference = that child's own 4-age sheet (the REF id from kd_spec), folder ba4aecfe-efce-47e2-b53f-30d292091886. Prompt = kd_spec prompt but with "TRANSPARENT background" instead of "plain light parchment background", plus "facing the viewer ... hands correct with five fingers". Princesses: kd_spec princess() text (women may wear pink/lilac; men never).
3. creations_wait; write a bg line `kd-fNN GEN GEN <result url>` (url is already RGBA); `python3 proc.py kd_jobs.json FIGURES-kids.json <bgfile>` (kd_jobs.json = `python3 kd_spec.py` with no args) -> img/fig-kid-X-a26/36/51 (900 px high) + por via porcrop + manifest.
4. LOOK: contact sheet on dark bg (3 ages x 9 ids), `browsheet.py` brow crops (no moles/marks), check faces/hands/crown; redo any bad sheet. Fix mis-cropped por by hand from the fig (head area, h*0.44).
5. `python3 dev/site/cdn_sync.py <new fig/por files> img/FIGURES-kids.json` (pull manifest first if someone else changed it).
6. Last: verify 48 ids x a26/a36/a51 fig+por answer 200 on the CDN; append the result here; tell Foreman C.
No code change was needed (jartc.js kidBandOf already maps 26/36/51; the 40 ids with no art fall back to band 20 until this lands) -> no review branch needed unless Foreman C wants one.

## Rollover note
START_CTX not measured at start (session resumed from a task prompt). Handing over at heavy context after 17 sheets; coordinator opens the successor.

## Successor #2 (art worker) 16/11: the 23 LEFT ids are DONE — 48/48 identities x a26/a36/a51 LIVE
Done: p22 p23 p24 f05-f24 = 23 sheets (21:9, 4k, gpt-2-6, transparentBackground+quality high, ref = each child's own 4-age sheet), 69 fig + 69 por webp + img/FIGURES-kids.json (336 records) pushed with cdn_sync (139 files). CDN check: 48 ids x 3 bands x (fig+por) = 288/288 answer 200.
Credits: 23 sheets x 270 = 6210 (no redo needed, 0 rejected sheets).
LOOKED at every sheet on dark and on light, plus brow crops: full body head to feet with shoes, front facing (no back-turned pose), hands right, men not pink/purple (p22 pine green, p23 russet brown, p24 midnight blue), no moles.
Hand fixes: por-kid-p23-a51, f11-a51, f21-a26, f23-a26, f23-a36 were mis-cropped by haar (cloth/robe) -> re-cropped by hand from the fig; f09-a26 had a tiny pale forehead dot (fig + por inpainted); f18-a26 one dark dot (demole_por).
Tooling note: porcrop needs opencv 4.10 (pip --target .cache/pylib "opencv-python-headless==4.10.0.84"), not 5.x.
Files here: kd_gensU.txt (gen ids), kd_bgU1.txt / kd_bgU2.txt (bg lines), kd_sheet_left23.jpg (contact sheet, dark bg, 23 ids x 3 ages).
No code change needed. No successor needed for this job.
