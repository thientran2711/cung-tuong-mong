START_CTX ~8 % (own estimate) · worker C3-S16LOOK (sonnet) of Foreman C ROOT 3-1-1 · credits 0 (no Magnific)
PRIORITY #1 CHECK: OD MAIN 158 order 26/11 (restore s16 room, LOOK on both devices) | main jres.js resPick/resBase + rank_rooms_manifest.json | review/* none | claims Foreman C ROOT 3-1-1 (this task). Reused: review/c3-rankroom dev/test/rankroom-stage.js approach, dev/test/lib/device.js. No game code changed.

## What was done
Built current main (3af7896e, `bash dev/site/build_site.sh`, CDN pictures) and put the game on the stage of Khải Tường cung · Nhã Vận hiên (side room "dong phoi"): harness sets a rival head with pal=1, S.rank=2, S.resHead=head, S.resHall="dong", then goTo("home"). Each stop waits until the picture is loaded and checks `resScene` key = `khai-tuong-cung-dong-phoi-<mùa>-<buổi>`.
Seen on stage: xuân-sáng, hạ-sáng, hạ-tối, thu-trưa, đông-sáng, đông-tối, đông-chiều (+ bedroom key). Fold 755x1000 and iPad Air 1180x820 (video 1x, stills at device DSF).
NOTE (by design in jres.js resBase): at tối in her own room the game picks the BEDROOM key `khai-tuong-cung-dong-phoi-ngu-ha-sang` (RANK_ROOM), not the `-toi` picture. To LOOK at the restored `-toi` pictures the harness empties RANK_ROOM in-page for the steps named `*-toi-s16key` (no code change); `dong-toi-ngu-bedroom` is the real in-game tối view.

## Result
Page errors: Fold 0, iPad 0 (stills run and video run each).
LOOKED (all 8 fold + 8 iPad stills on two contact sheets + 3 full stills): warm peach room, round-arch canopy bed with red/cream drapes, lattice windows, honey floor, red carpet; full frame in the game frame on both devices, no wrong crop, nothing important cut; both figures stand on the floor/carpet, names + chips readable; tối keys are the same room, darker and more orange, no artefacts; different mùa/buổi pictures differ in light as expected. Bedroom (-ngu) is untouched, curtains + pink bed as before.

## Links (CDN, ?v=1)
Base https://ctm-img.victoria-tntt.workers.dev/img/_review/c3-s16restore/
- s16look-fold.mp4 (Fold 755x1000, 1x), s16look-ipadAir.mp4 (iPad 1180x820, 1x)
- still-fold-sheet.jpg, still-ipad-sheet.jpg (8 stops each); still-fold-xuan-sang/ha-toi-s16key/dong-toi-s16key/dong-chieu.jpg; still-ipadAir-… same four.

## Verdict
PASS: the restored s16 room reads full-frame on Fold and iPad, figures stand right, 0 page errors. Open point (not a fault of the restore): own-room tối shows the bedroom, so the s16 `-toi` pictures are only reached when the room is not "ngu" (e.g. tối at another time path); sếp may want that confirmed.
Harness: scratch only (stage.js, in worker container); recipe above reproduces it.

~100 % xong / ~90 % chơi được
