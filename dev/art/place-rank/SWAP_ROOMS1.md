# ROOMS1 swap — 16 consort-room bases, window drapes removed (owner 23/11 03:15Z/03:25Z; rule L30 structure-true, G78 structure check)
New pictures = gpt-2-6 2k EDIT of each LIVE img/<key>-ha-sang.webp (codes RM1-01..16, prompts dev/handover/prompts_L2095/RM1-* on the handover branch,
report dev/handover/reports/ROOMS1.md). Resized to 1620x1080 like the live files, WebP q76–82 (total 5.63 MB vs 5.58 MB old, +44 KB).
Staged on the CDN: img/_review/rooms1/new/ (new), img/_review/rooms1/old/ (backup of the live files), OLD|NEW sheets img/_review/rooms1/rooms1-old-new-*.jpg.
SWAP (not yet run — the live overwrite was refused by this session's permission check, so it is left to the lander):
  python3 dev/art/place-rank/swap_rooms1.py --go      (dry run without --go: 16 would change)   revert: --revert
  then the site build (assets.py reads img/_index.json) so assets.json gets the new content keys.
Only the summer-morning base changes; the 15 season x buổi variants per room stay old (option 1 = bases only).
LOOK (pre-swap, new files served in place of the CDN ones): `NEW=<dir> node dev/test/rooms1-look.js file://$PWD/index.html <out>`
 755x1000@2 + 1180x820@2, real path S.hall + goTo -> placeOf/kpmRoomImg -> residenceArt -> stage: 32/32 OK (each hall shows <key>-ha-sang), 0 page errors.
 After --go run it without NEW to confirm the live files.
