# kc2k-k2 — painter K2, JOB A c17–c32 (khuê các + nhà nghèo a18, 2K transparent re-make)
PRIORITY #1 CHECK: brief kc-ngheo-2k + FIGURE_GATE A0/H + states-sample W102c read; claims 0; method W102c reused. START_CTX ~13 %.
Transparent: gpt-2-6 has NO transparent setting (images_models_settings: no extraSettings) -> gen 9:16 2k, then images_remove_background (fallback, as brief allows). Output 1520x2688 RGBA.
Style ref: ROOT-31 correction ~ : refs = old live image + m09 eIyOFEidqL (no --nostyle). c17 redone with it (c17 sheet = styled). c18–c20 were generated BEFORE the correction (old image only) -> must be redone with m09 after ROOT-32 GO.
Items: kc keeps her fan (fan = KHUÊ CÁC list #2, no cup); nhà nghèo: old book (a kc item) -> list H: c17 basket+wild flowers, c18 hemp skein, c19 wooden comb in cloth, c20 bunch of herbs; plan c21 mulberry basket, c22 cloth bundle, c23 spindle, c24 plum branch, c25 bamboo fan, c26 clay orchid pot, then cycle. Forehead red dot of ngheo c18/c20 removed (bare).
Looked at all 8 images: pass (same figure, no cup, bare forehead, item fits status).
Sheets (old kc | new kc | old ngheo | new ngheo): https://ctm-img.victoria-tntt.workers.dev/img/_review/kc2k/c17_sheet.jpg (also c18/c19/c20_sheet.jpg). Files cNN_a18_{kc,ngheo}_2k.png same folder.
Gens so far: 8 + 8 cut-outs (c17 twice). Remaining c21–c32 not started; waits for ROOT-32.
~25% xong (slice) / ~10% chơi được.

## UPDATE (ROOT-32 order) — c17–c24 DONE, two refs, native transparent
transparentBackground works: images_generate extraSettings {"transparentBackground": true} (gpt-2-6) -> RGBA 1520x2688, corner alpha 0; no remove_background needed any more. Every gen = exactly 2 refs (old live image + m09 eIyOFEidqL). c18–c20 redone (1-ref versions discarded). Closed-lip smile sentence added. Looked at all 16 images: pass.
Sheets (old kc | new kc | old ngheo | new ngheo): https://ctm-img.victoria-tntt.workers.dev/img/_review/kc2k/sheet_c{17..24}.jpg ; files cNN_a18_{kc,ngheo}_2k.png same folder.
LESSON: kc prompt must say "held item stays EXACTLY the same object as in the first reference" (I named a wrong item for c22 once -> drifted to a book, redone). Ngheo items: c17 basket, c18 hemp skein, c19 comb in cloth, c20 herbs, c21 mulberry basket, c22 cloth bundle, c23 spindle, c24 plum branch; NEXT c25 bamboo-leaf fan, c26 clay orchid pot, c27 basket wild flowers, c28 hemp skein, c29 comb, c30 herbs, c31 mulberry basket, c32 cloth bundle.
## HANDOVER K2 -> successor (ctx ~50 %, rollover). Remaining c25–c32 (16 gens). Method: download old webp https://ctm-img.victoria-tntt.workers.dev/img/fig-consort-cNN-{kc,ngheo}-a18.webp, creations_upload_image, images_generate gpt-2-6 9:16 2k extraSettings transparentBackground, refs [old, eIyOFEidqL], folder ba4aecfe-efce-47e2-b53f-30d292091886. Prompt = see c22-kc / c23-ngheo wording above (changes: held item per list H, forehead bare, closed-lip smile). Check: sheet script /tmp (lost) - rebuild old|new on green bg; upload via worktree origin/main dev/site: CLOUDFLARE_API_TOKEN=proxy-injected python3 dev/site/cdn_sync.py img/_review/kc2k. Gens so far: 28 (+8 cut-outs, early).
~50% xong (slice) / ~20% chơi được.
