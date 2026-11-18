# t8-mass-B W77c (c01 a26/a36/a51, then c02-c04 x 4 ages) - ROLLOVER after c01
PRIORITY #1 CHECK: brief t8-mass-B.md + report W77 + W77b; build.py --age (3939488) | review/* none else | claims W77c.
## Done (all gens 1 each, no regen; every figure looked at: yellow C2 dominant t8, phoenix, face visible, closed lips, hairpins up)
- c01 a26, a36, a51: t7+t8 v0/v1/v2 on CDN img/_review/t8-reprompt/c01_a{26,36,51}_t{7,8}_v{0,1,2}.png + c01_aXX_t7t8_sheet.jpg. gens=6 each, READY sent to Foreman C each.
- c01 a18 = W77b (old yellow? W77b did a18 with new yellow per its report) - not touched.
- a51 t1 ref for c01/c02 = live img/hd/fig-consort-cNN-t1-a51.webp (no B10 a51 t1 exists for c01,c02; c03,c04 have img/_review/consort-tiers/cNN/b10-a51/cNN_a51_t1_v0.png).
- a26/a36 t1 ref = img/_review/consort-tiers/cNN/b10-a26|a36/cNN_aXX_t1_v0.png (exist for c01-c04).
## Method (works; tools updated in dev/art/t8-prompt-B/tools: dl.py, fin.py cNN aXX label=url.., push.sh cNN aXX)
1 upload t1 (creations_upload_image, folder ba4aecfe...). 2 build.py cNN v0|v1|v2 --age aXX; build.py cNN --t7 [v1|v2] --age aXX (only the age phrase differs between ages). 3 images_generate gpt-2-6 1024x2304 2k, refs [image t1, style eIyOFEidqL], six in ONE message. 4 dl.py review, look. 5 images_remove_background x6, fin.py (black-fill check, sheet), push.sh (scratch cdn root needs dev/site/cdn_sync.py + manifest_guard.py from main, paths in push.sh /home/user/w77c/cdn). 6 send READY.
Magnific t1 upload ids (this account): c01 a26 jUBjCr8LD0, a36 gOtgKVGSXO, a51 KLDKCz5kqp (re-upload if needed).
## Next (successor): c02 a18,a26,a36,a51; c03; c04 (each 4 ages, 6 gens/age). ~15k tokens of pasted prompts per person-age -> rollover every ~3 person-ages.
## Foreman C update 19:19Z (relayed message)
build.py AGE_TXT a36/a51 strengthened at handover-branch commit 252c25f5 (a18/a26 unchanged). Successor: pull it first; REDO c01 a36 (6 gens, new text) and re-check c01 a51 faces read ~51 (fine lines at the eyes, fuller mature face, a few silver strands, never white); a36 clearly older than a26. c01 a51 as pushed used the OLD text (may need redo). c02-c04 use the new text from the start.
