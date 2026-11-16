# NVP v4: Noi vu phu scene set, 16 pictures (season x buoi), NOT WIRED
Owner target (16/11 07:42Z): the circled Kinh su phong rows. Pictures are on the CDN (images never go in git, dev/art/CDN.md):
  tone-passed (final candidates): https://ctm-img.victoria-tntt.workers.dev/img/nvp-v4-<season>-<buoi>.webp
  raw edits (before the tone pass): https://ctm-img.victoria-tntt.workers.dev/img/nvp-v4-raw-<season>-<buoi>.webp
  season = xuan|ha|thu|dong, buoi = sang|trua|chieu|toi; 3072x2048 webp q90 (served from img/ on the CDN, key = path).
Comparison sheet: https://ctm-img.victoria-tntt.workers.dev/img/nvp-scene-v4-vs-ksp-sheet.jpg (KSP row above new row).
Method and measured numbers: dev/handover/reports/place-glyphs.md (handover branch), section "NVP v4". Tone pass: dev/art/tone_match.py (handover branch) with approved set prefix kinh-su-phong.
Model for EVERY picture below: Magnific gpt-2-6 (GPT 2.6), 2k, 3:2, edit with references (first ref = the matte base 6AHwfCliJO, second ref = the Kinh su phong tile of the same season+buoi as colour reference only); the base 6AHwfCliJO itself = edit of the v1 base lJ8bS37gv9 with KSP xuan-sang. 65 credits each, 16 pictures = 1,040. Magnific creations (raw): xuan-sang 6AHwfCliJO, xuan-trua bxTaYhL5Y2, xuan-chieu aF2XiBMfSh, xuan-toi CqGoRv8EEy, ha-sang eIOYwBUdqL, ha-trua lJ85XO3gv9, ha-chieu XmPcJC4Bfo, ha-toi 1lpuV9yr4r, thu-sang 8aNVPLCIrU, thu-trua s7obdLnl8e, thu-chieu UPm1I4ywny, thu-toi Bh40yQroQR, dong-sang mE3p6LQhJQ, dong-trua s7obXTHl8e, dong-chieu JNajh8ROq4, dong-toi XmPcONIBfo.
To wire later (after owner approval; places use img/<name>-<season>-<buoi>.webp via jplx-style SCN_HAVE/SCIMG + KIT_FLOOR): copy nvp-v4-<s>-<b>.webp to img/noi-vu-phu-<s>-<b>.webp on the CDN (cdn_sync), then point nvp (jact.js, currently sc "ksp") at the new set.
md5 (first 12) of the CDN files:
  c1a5bc7059df img/nvp-v4-dong-chieu.webp
  534ce98b607b img/nvp-v4-dong-sang.webp
  dc33904e5c6d img/nvp-v4-dong-toi.webp
  a7985e8db15f img/nvp-v4-dong-trua.webp
  cb90d3ad05f7 img/nvp-v4-ha-chieu.webp
  b313f8f5478d img/nvp-v4-ha-sang.webp
  86fed91a29fa img/nvp-v4-ha-toi.webp
  72ba0564205d img/nvp-v4-ha-trua.webp
  16f2c3c9d768 img/nvp-v4-raw-dong-chieu.webp
  afaf6ae90f38 img/nvp-v4-raw-dong-sang.webp
  939650549c07 img/nvp-v4-raw-dong-toi.webp
  5a2923f39ac6 img/nvp-v4-raw-dong-trua.webp
  7da3f9787067 img/nvp-v4-raw-ha-chieu.webp
  0ad2a5b6005f img/nvp-v4-raw-ha-sang.webp
  5c013fd22eb3 img/nvp-v4-raw-ha-toi.webp
  70f6cdc05758 img/nvp-v4-raw-ha-trua.webp
  04c42091337d img/nvp-v4-raw-thu-chieu.webp
  fbd9038b4d6e img/nvp-v4-raw-thu-sang.webp
  91061bb5c71a img/nvp-v4-raw-thu-toi.webp
  bf0fea4c93b6 img/nvp-v4-raw-thu-trua.webp
  61770e82d736 img/nvp-v4-raw-xuan-chieu.webp
  ca56c943e5ce img/nvp-v4-raw-xuan-sang.webp
  3c877c0c69da img/nvp-v4-raw-xuan-toi.webp
  f5e8a078d127 img/nvp-v4-raw-xuan-trua.webp
  228878d5ac9b img/nvp-v4-thu-chieu.webp
  b4ed9d846080 img/nvp-v4-thu-sang.webp
  9a14915cf82c img/nvp-v4-thu-toi.webp
  c5e0eb8c4853 img/nvp-v4-thu-trua.webp
  eaf986f11155 img/nvp-v4-xuan-chieu.webp
  532d7a22903c img/nvp-v4-xuan-sang.webp
  4b76934d1891 img/nvp-v4-xuan-toi.webp
  d9b02994a863 img/nvp-v4-xuan-trua.webp

Podium backdrop sample (separate, not wired): gpt-2-6, 2k, landscape 16:9 creation 3zbJx06REY (edit of the approved Duong Hoa dien hall + KSP colour ref), portrait 3:4 creation WDs3JwscXe (edit of the landscape result). 65 cr each. Sheet: https://ctm-img.victoria-tntt.workers.dev/img/podium-bg3-sample-sheet.jpg
