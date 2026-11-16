# PROGRESS: palace detail map + residence paintings (D30) — branch review/palace-map-port

Re-port of owner-approved review/palace-map (9717707e6, which already merged review/residence-art 2c39d1ca) onto current main (b2690dfb3).
Spec: OWNER_DECISIONS L134-166 (Dư đồ -> palace detail map by chủ vị rank, PL grade `nhat` only -> hall -> room painting with the real people;
25 rooms x 16 variants; PL art only for the map, rooms use our own paintings).

## What was ported
- `dev/build/jres.js` (residence rooms: residenceArt/residenceOf/roomResidents/roomPeople/resRoomName, stage rooms, visit rooms) — assemble: after jk4.
- `dev/build/jpm.js` (kitPalaceMap, KIT §76 — number 71 because main's §33 is the figure scale; coordinator please confirm) — assemble: last module.
- `dev/build/j11.js`: PX.src guard (a slow background load no longer overwrites a newer room picture).
- `dev/art/{gen_res_var.py,residence_proc.py,residence_prompts.txt,residence_sheet.py,residence_season_sheet.py}`, `dev/tools/pl2_sync.py`.
- Tests: `dev/test/palace-map.js` (now takes the page URL; waits for the game state), `palace-oldsave.js` (new).
- Kit: KIT.md §76 + sample on the kit page (KIT_SAMPLES).
- Pictures: NOT in git. 675 missing files (400 residence paintings + 275 img/pl2 courtyards + hotspots.json) uploaded to the CDN from
  origin/review/palace-map with `cdn_sync.py --git origin/review/palace-map --missing-only` (231.7 MB). No Magnific credits used; nothing redrawn.

## Adaptations to current main
- Pictures now carry the CDN prefix (assemble rewrites "img/..."): jpm `kpmRoomImg` strips everything up to `img/` (was `^img/`) — otherwise the room
  painting URL was doubled and the room showed no painting.
- Dư đồ is still the kit leather map (name tags = kit `.mlab`); readable name tags are the later C46 item (review/map-labels) — untouched here.
- Reviewer notes in the old branch: none beyond owner approvals; round-2 fixes (courtyard fits the frame, hall line lists only that hall's people,
  more places, old-save test) are all inside the ported jpm.js.

## Tests (node dev/test/palace-map.js <url> <W>x<H>@dpr <outdir> <tag>, 4 CPU box, load ~30, one browser at a time)
See bottom table.

| viewport | Σ hall chips = countAt | room people = hall people | overflow x | back room>cung>Dư đồ | page errors |
|---|---|---|---|---|---|
| 755x1000@2 | 5 = 5 | yes | none | ok | 0 |
| 1000x755@2 | 5 = 5 | yes | none | ok | 0 |
| 1180x820@2 | 5 = 5 | yes (2/2) | none | ok | 0 |
| 1366x1024@2 | 5 = 5 | yes | none | ok | 0 |
| 844x390@2 | 5 = 5 | yes | none | ok | 0 (first run); see note |

Old save: `dev/test/palace-oldsave.js` (2 buổi on the previous main build, slot 3, load in the new build, Dư đồ -> palace detail) = ok, 0 errors.
Kit sample (§76) added to the kit page.

Found + fixed while testing: (1) doubled CDN prefix on room painting (see above); (2) at 844x390 the courtyard was a cropped strip with hidden
hotspots -> in short landscape (max-height 520px) the picture is hidden and the three kit hall rows stand alone (same tap, same counts); the test
now taps the rows (`data-kpmpart`) so it runs at every size. Screenshots are not committed (dev/shots is not in the sparse checkout; shots in .old only).

Open: (a) KIT section number 71 to be confirmed by the coordinator; (b) rooms for Đông cung / A ca sở are D42; (c) the room-view back button
"‹ <cung>" sits over the bottom-left name label like main's "‹ Bản đồ" button (pre-existing layout, not changed here).
