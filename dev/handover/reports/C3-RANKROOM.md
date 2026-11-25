START_CTX ~8% (estimate)
# C3-RANKROOM — 65 rank rooms wired (branch review/c3-rankroom @16679f5c, off origin/main 5e013076 + review/rankroom 810e926a merged)
PRIORITY #1 CHECK: reused C8-RANKROOM table/script/jres.js lookup + D1-ROOMNC pictures; nothing built anew.
## Done
- ok-list = all 65 table rows: 58 no-curtain redraws (rooms-nc, src switched in rank_rooms.json, rev=nc) + 7 old pr13 pictures (ph02 06 18 27 37 clean, ph26 clean, ph59 bed-alcove curtains only, per D1-ROOMNC).
- rank_rooms_wire.py --go --all16: 15 live rooms x 16 mua/buoi files overwritten (240 keys, old copies backed up to CDN img/_review/rankroom-backup/, manifest in img/_review/rankroom-stage/manifest.json for --revert); 50 new keys <base>-ha-sang.webp; jres.js RANK_ROOM block = 50 bases. Script change: backups uploaded in ONE cdn_sync call (per-file call rebuilt the bucket index each time, hours).
- nvp: img/nvp-ha-sang.webp uploaded (jplw.js already references it; no live file existed before) from rooms-nc/nvp.webp.
- Rebuilt (assemble.py + build_site.sh). 290+1 files uploaded, 0 errors.
## Tests
- dev/test/rankroom-stage.js fold (755x1000) + ipadAir (1180x820): 0 page errors, 12 shots each; Khai Tuong Tan/Phi/Quy phi, Chung Tu Phi, Dien Huy Quy phi, Thua Minh Tan, day+night resolve to the new keys; night shows the -ngu bedroom. Looked at 6 shots (3 per device): windows without curtains, figures on floor, no cut-off. Shots in /tmp/shots (not git).
- Table: 50 wired bases, 192 lookups, 97 fall back to old picture (rooms with no picture, Hoang quy phi) as designed — nothing breaks.
- NOT run: a dedicated old-save load test (change is art keys + a lookup that falls back to old keys; no state fields touched).
## Drift rooms for MAIN to show sep (structure differs from old picture)
ph07 doorway right half; ph15 doorway inward; ph16 right chair pair gone; ph17 guqin gone; ph23 chairs bigger/forward + footstool; ph29 right arch -> robe rack; ph30 scroll -> horizontal painting; ph35 lattice window behind bed; ph36 doorway like shelf niche; (also ph44, ph48, ph52, ph56, ph60, ph61, ph64 per D1-ROOMNC). Revert one: remove it from ok list and rerun --revert flow (backups kept).
Open: bedroom trigger = buoi toi (C8 assumption), unchanged.
~90% xong / ~85% choi duoc


## Round 2 (Foreman C ROOT 3 order): +15 gap rooms from C3-STYLE
- Added rows gp01..gp15 to rank_rooms.json (src img/_review/c3-style/gap/<key>.webp, pilot vinh-hoa-cung-tan from .../pilot/). 14 new keys wired; thua-minh-cung-dong-phoi = live slot, swapped on all 16 mua/buoi keys (old copies backed up). Merged block (RANK_ROOM = 64 bases) and manifest (live 256, new 64) by hand because the script rewrites them per run; ran the 15 gap ids only so the earlier backups were not overwritten.
- Rebuilt; stage test fold + ipadAir: 0 page errors; table 192 lookups, fall back to old picture 80 (was 97).
- Per-palace Tan/Phi/Quy phi coverage is now whatever the table has; remaining fallbacks = rooms with no picture (Hoang quy phi etc.).
- OLD-SAVE LOAD TEST: NOT RUN. dev/test/palace-oldsave.js needs old and new builds on one origin; my local http.server on a shared port was refused by the auto-mode classifier (twice), I did not work around it. Please run: node dev/test/palace-oldsave.js <old main index url> <new index url> 755x1000@1 <outdir> with both builds under one server, or allow the server command. Change touches only art keys + the resBase lookup (falls back to old keys), no save fields.
~90% xong / ~88% choi duoc
LAND READY review/c3-rankroom d8ed8090 (old-save test pending)
