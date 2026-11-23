# N13 places swap (PLACES5, owner 23/11 03:25Z via MAIN 107: "tranh vẽ xong rồi thì thay luôn đi")
Ran `python3 dev/art/place-rank/swap_L2370.py --go` (highest rN wins; caption decapped; NOT swap_L2387_khon.py).
CDN (img/ is not in git): 6 base hạ-sáng pictures replaced, 9 unchanged, 2 skipped (nvp, tu-ninh-cung-ngu: no live key, as before).
| live file | new | was |
|---|---|---|
| img/a-ca-so-ha-sang.webp | M2370-47 a-ca-so-r7 | M2370-29 |
| img/ngu-thu-phong-ha-sang.webp | M2370-48 ngu-thu-phong-r6 | M2370-26 |
| img/tu-ninh-cung-ha-sang.webp | M2370-49 tu-ninh-cung-r5 | M2370-25 |
| img/dong-cung-ha-sang.webp | M2370-51 dong-cung-r5 | M2370-14 |
| img/thuong-thu-phong-ha-sang.webp | M2370-41 thuong-thu-phong-r7 | M2370-30 |
| img/phi-tan-cung-ha-sang.webp | M2370-43 phi-tan-cung-r3 | M2370-15 |
Khôn Ninh untouched (old approved picture). Only the hạ-sáng base changes; the other 15 season×buổi variants of each place stay the old picture (known, later job).
Look: `node dev/test/places-swap-look.js file://$PWD/index.html <outdir>` (755x1000@2 + 1180x820@2; summer morning; place card of acs/thu/tn/dc/ttp/r0):
all 12 cards load the new -ha-sang.webp, 0 page errors. The rig builds a bare card (the "undefined" rows / "r0" title are the rig's, not the game's).
