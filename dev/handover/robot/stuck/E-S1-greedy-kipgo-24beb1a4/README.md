# E-S1 greedy 1522350896 (fold, thd/thd_tho) — gift picker «Biếu quà làm lành» still stuck on LIVE s=24beb1a4 (D af294eb2 landing)
Resumed from the old ckpt (b761) on LIVE pin=0 (harness f65d019b); flag «mixed build (gift-picker fix resume)».
- «Nguy hiểm chung» → «Làm lành với Quý nhân Liêu Trình Hổ Phách» → «Biếu quà làm lành»: the confirm «kipgo» stays off-screen after 8 real scrolls (fold/iPad K-PICK-GO-REACH, kk61/ui3 not live yet); «Tiếp ▸» re-opens the picker 3× with no gift given; the dialog «Phòng bị» loops.
- Harness: «stuck no progress 15 min» ×2 at buổi 780 (page «Dực Khôn cung · Hòa Sướng hiên · Ở đây còn 1/2 người»), unstick reloads do not help. Parked again at b780 as ordered (child6 20:53Z).
- Files: stuck-2.png (screen), ckpt.json.gz (harness state + game save at b780, resume=1 on a build with K-PICK-GO-REACH).
Resume with: node dev/test/robot-rt.js <LIVE> <out> dev=fold origin=thd road=thd_tho bot=bold seed=1522350896 life=E-S1-R1-greedy-5-1522350896 resume=1 pin=0 (ckpt in the runner out dir).
