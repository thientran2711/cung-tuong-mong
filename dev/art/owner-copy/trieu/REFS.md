# Refs + settings for owner-copy/trieu/tN_c06.txt (ROOT-40 19/11 ~04:10Z; owner rejected image edits, Lượt 242–244)
References, in THIS order (= each original's own ref set + the Nữ quan picture as image 3), the same for t1–t8:
1. {type: image, identifier: TdU0vvvVNR}   own t1 face = upload "face-c06-t1" of img/_review/consort-tiers/c06/b10/c06_a18_t1_v0.png. VERIFIED: pixel diff 0.0, same 1520x2688. This is the ref set in t8-prompt-B/refs.txt (W72, used by goldenC2 t7/t8 and the golden_low t1–t6).
2. {type: style, identifier: eIyOFEidqL}   m09 style (fig-maid-m09-a18-hd)
3. {type: image, identifier: s7IO0AUl8e}   live Nữ quan m37 tm4 = new upload 19/11 04:10Z of https://ctm-img.victoria-tntt.workers.dev/img/hd/fig-maid-m37-tm4-a18.webp, md5 IDENTICAL (c02393ff2d9b…).
   Do NOT use P3uYQte42C: it is an OLDER m37 tm4 picture (holds a brush and paper, 261x900; mean pixel diff 36 vs the live file, which holds a fan).
No royal swatch: the originals never mention one.
Text: the originals keep "image 1 (her first reference)", so the order above must be kept. The block's last sentence names image 3.
Generation: Magnific images_generate, mode gpt-2-6, width 1024 height 2304, count 1, folder ba4aecfe-efce-47e2-b53f-30d292091886, NO transparentBackground (ROOT-40: transparent mode makes the fabric stiff), then images_remove_background. Prompt = the file content pasted unchanged (strip the final newline).
