# img-check-2511 — pictures + sounds on LIVE 17dfa64d (MAIN 142 for MAIN 145, owner question 18:45Z)
PRIORITY #1 CHECK ('missing image cdn scan'): OD 0 | ledger 0 | claims 0 | main 0 | review/* 0 | archive 0 (from MAIN 145). Read-only; no code change.

## 1. Every picture the game references vs the CDN (img/_index.json, 50 289 objects, 37 089 img keys outside _review)
- Manifests (29 img/*.json + 2 audio/*.json) pulled with curl; every img/… / audio/… path and every bare file name checked against the CDN key list:
  - FIGURES.json 2592 · FIGURES-servants 4224 · FIGURES-ty 5376 · FIGURES-x 1184 · FIGURES-kids 672 · FIGURES-kc 528 · FIGURES-others 168 · FIGURES-congtu 160 · FIGURES-huynh 16 · FIGURES-hd 4180 · EVENTS 186 · ACTS 189 act pictures + 9 category fallbacks · fit tables (body/face/fig-ht/keep/scar/toil/toil2/veil) · map hotspots → **0 missing**.
  - Only non-200: img/MANIFEST.json lists 40 old **img/old-nb/** files (old notebook icons) that are not on the CDN — the built game references "old-nb" **0 times** → harmless leftover lines in the manifest. fig-ht.json names unknown-fig-f/k/m = img/kit/unknown-fig-*.webp → present.
- Real game run (Fold 755x1000 + iPad 1180x820, real network): ~300–320 CDN pictures loaded per device (home, Hậu cung · Chí tôn + Phi tần, cung nữ card, Hành sự act cards): **0 HTTP errors on real pictures, 0 broken <img>**. Only 404s = img/kit/emo-anim/<k>.webp + img/kit/emo-fx/<k>.webp = OPTIONAL probes (jemoseal.js: «Probed once per file; when it exists the seal swaps its still for the loop») → still seal shows, by design. Two ERR_ABORTED (fig-player-look1/2) = request cancelled by a re-render; both files exist.
- Grey silhouettes in Phi tần = «Người lạ» (people she has not met; kit unknown-fig) = by design.

## 2. Shots (Fold left + iPad right, LOOKED: every portrait, maid figure and act picture shows)
- consorts (Hậu cung · Phi tần / Chí tôn): https://ctm-img.victoria-tntt.workers.dev/img/_review/img-check-2511/live17dfa64d-consorts-fold-ipad.webp
- cung nữ thân tín figure: https://ctm-img.victoria-tntt.workers.dev/img/_review/img-check-2511/live17dfa64d-maid-fold-ipad.webp
- act cards (Hành sự, 21 act pictures): https://ctm-img.victoria-tntt.workers.dev/img/_review/img-check-2511/live17dfa64d-acts-fold-ipad.webp

## 3. Sounds
- Wired in code (j11 mkAudio/SFXN + jsfx SFXL + bgm + voices j36): 104 real names (sfx-*/bgm-*/vo-*; 3 more = sfx-x/vo-x/bgm-x doc placeholders) → all present in audio/.
- Served from the game site (relative audio/…, https://thientran2711.github.io/cung-tuong-mong/audio/): all 129 .mp3 files → HTTP 200 (music bgm-day/night/cold/festival/sorrow/tension…, tap sfx-tap, open, coin, decree, promote, night, page, step…). CDN also holds 86 audio keys incl. MANIFEST/VOICES (both 0 missing).

## Verdict
Old pictures were NOT dropped: every picture any manifest or screen asks for is on the CDN (new repaints replace by the same name; old ones not redrawn stay). Sounds are in the game and load.
