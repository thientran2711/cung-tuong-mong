# t8-mass-B W77h (c01 a36 + a51 redo with new age text) - ROLLOVER before c02
PRIORITY #1 CHECK: brief t8-mass-B.md + W77c report; build.py --age (handover branch e0c55c5, new a36/a51 text in AGE_TXT) | review/* none else | claims W77h.
## Done (each gens=6, 1 per prompt, no regen; every figure looked at)
- c01 a36 REDONE (new text) + c01 a51 REDONE (new text; faces read ~50, fine lines, no white hair): t7+t8 v0/v1/v2 + c01_aXX_t7t8_sheet.jpg overwritten on CDN img/_review/t8-reprompt/. READY sent for both.
## Method / gotchas
- Order of one message of 6 gens: t8 v0,v1,v2, t7 v0,v1,v2 (use THIS order for labels in dl.py/fin.py: t8v0 t8v1 t8v2 t7v0 t7v1 t7v2; W77h mislabelled once on a36 and fixed by renaming files).
- t1 refs this account (re-upload if gone): c01 a36 cpSTVJs0eP, c01 a51 0eUVMPLTfW (live img/hd/fig-consort-c01-t1-a51.webp). c02: a18 img/_review/consort-tiers/c02/b10/c02_a18_t1_v0.png, a26/a36 .../c02/b10-a26|a36/c02_aXX_t1_v0.png (exist), a51 = live img/hd/fig-consort-c02-t1-a51.webp. Upload via creations_upload_image (public URL), folder ba4aecfe....
- Workdir /home/user/w77h/work (tools: dl.py, fin.py, push.sh, facesheet.py = 3x2 face crops to check age), scratch cdn root /home/user/w77h/cdn (cdn_sync.py+manifest_guard.py from main). Recreate if container is new.
- Cut-out: images_remove_background per gen, then fin.py cNN aXX t8v0=url ... ; push.sh cNN aXX; send READY.
- ~25k tokens per person-age (prompt pasting dominates). Rollover after ~3 person-ages.
## Next (successor)
c02 a18, a26, a36, a51 (t7+t8 v0/v1/v2, 6 gens each, new age text via build.py --age; for a51 check faces with facesheet.py).
