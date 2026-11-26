# C3-RANKROOM-r2 — review/c3-rankroom @ 9bbebc9f
PRIORITY #1 CHECK: OD none new | main none | review/c3-rankroom 9bbebc9f | claims C3-RANKROOM.

## VERDICT: PASS 9bbebc9f
1. Diff d8ed8090..9bbebc9f = 1 file, dev/art/place-rank/rank_rooms_manifest.json (+326). No code/BAL change, so the r1 build checks (rebuild hash e4cc1fa5bfd2 identical, 0 page errors, old-save load OK) stand unchanged.
2. CDN manifest https://ctm-img.victoria-tntt.workers.dev/img/_review/rankroom-stage/manifest.json = 200, 12173 bytes, live 256 + new 64; byte-for-byte equal to the committed rank_rooms_manifest.json. --revert is now possible from git or CDN.
3. Videos (downloaded, ffprobe + sampled frames): c3-rankroom-fold-755x1000.mp4 754x1000, 543 s, 25.6 MB; c3-rankroom-ipad-1180x820.mp4 1180x820, 563 s, 31.2 MB (both 200 at img/_review/c3-rankroom-video/). 12-frame sheets looked: Cảnh Phúc, Khải Tường, Chung Tú, Hàm An, Thừa Minh, Diên Huy, Vĩnh Hòa, Trường Xuân day rooms + night/bedroom rooms (Cảnh Phúc, Chung Tú, Diên Huy quý phi ngủ, Khải Tường); full stage with figures on the floor, no curtains at windows, nothing cut off. The pale iPad frame (~t=444 s) is a room-to-room crossfade (3 consecutive frames checked) — fine.
4. The two "curtain" rooms (thua-minh dong-phoi-ngu, chung-tu tay-phoi-ngu) stay foreman-LOOK PASS (bed hangings), not re-failed.
Reminder (r1): staged-vs-live: keep manifest; revert = restore from img/_review/rankroom-backup.
~97% xong / ~92% choi duoc
