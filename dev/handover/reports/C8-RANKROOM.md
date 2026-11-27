# C8-RANKROOM — frontal rank rooms into the game
PRIORITY #1 CHECK ('place-rank'): OD 0 | ledger 0 | claims ROOMSPAGE (review page only) | main 0 (no rank-room table) | review/* 0 (review/rankroom is this job).
depth 8 (limit 8; create_session not tried, no rollover needed). START_CTX ~0 %; finished far under the roll line.
Branch: review/rankroom (off origin/main f7016b8d). Status: BUILT + TESTED, waiting for the owner's ROOMS PICK ok-list. Nothing uploaded to the CDN, nothing live touched.

## How the game finds a room (and what I extended)
Lookup = dev/build/jres.js `resBase → resPick → residenceArt/resScene` (key img/<palace>-cung[-dong-phoi|-tay-phoi]-<mùa>-<buổi>.webp, 16 variants). It had no rank and no bedroom.
Added (kit-first, no frame/UI): `resBase(pal,part,head,ngu)`; rank = `rkOf(head)` named through `RANKS[r].n` (Tần/Phi/Quý phi → tan/phi/quyphi) — no number typed (law 4);
bedroom (`-ngu`) is shown in the chủ vị's room at buổi tối (`resTime()==="toi"`) — my assumption, change in `resScene` if the owner wants another trigger. A rank/bedroom picture is used only if its base is in `RANK_ROOM`
(block `/*@RANK_ROOM*/…/*@END_RANK_ROOM*/`, rewritten by the script, EMPTY now); otherwise the old picture (nothing breaks). One painting per room (hạ-sáng file) for any mùa/buổi. Floor line/anchor like the palace's chính điện.
Not wired (no picture exists): Tần rooms of canh-phuc/chung-tu/ham-an(tiếp khách)/dien-huy/vinh-hoa, Thừa Minh/Trường Xuân phối đông — they fall back to the old picture. Phối bedrooms (`-dong-phoi-ngu`/`-tay-phoi-ngu`) are in the table (13 pictures) but the game has no "sleeping in a phối room" trigger beyond the same night rule — wired through the same night rule for phối residents (resBase handles dong/tay with ngu).

## Table: dev/art/place-rank/rank_rooms.json (65 rows) — 15 live-slot (swap) + 50 new-slot (wire)
Columns: id, base, palace, rank (tan|phi|quyphi|phoi), kind (tiep-khach|ngu), side, slot, drape. Full rows are in the JSON (regenerate: `python3 dev/art/place-rank/rank_rooms_wire.py --table`).
Live slot (15, = Đông/Tây phối tiếp khách): ph01 03 05 11 13 19 21 28 30 38 46 48 56 58 64.

## L2387 / L30 no-window-curtain check — HEADLINE: most rooms FAIL
- Prompt gate: `room_gate.py --json prompts_pr13.json` = 31 prompts PASS (the other prompts live in other builders; the gate is on text only).
- Picture check by eye (left+right 21 % strips of all 65 pictures, 5 sheets): fabric curtains/drapes with tie-backs at REAL windows in the large majority.
  CLEAN (bed canopy / arch hanging only): ph02 ph06 ph18 ph27 ph37 (5)
  UNSURE, re-look: ph19 ph26 ph59 (3)
  DRAPE at a window = repaint list (57): everything else (ph01 03 04 05 07-17 20-25 28-36 38-58 60-65 minus the above; exact list in the JSON, drape="drape").
  Triage at thumbnail scale — the owner's rooms-page pick decides; no repaint done (0 credits).

## Commands
- dry run: `python3 dev/art/place-rank/rank_rooms_wire.py --ok OKFILE`   (OKFILE = ids ph07 / bases, spaces/commas/lines, # comments)
- apply: `... --ok OKFILE --go [--all16]`  → decap (caption) + resize 1620 wide webp q80 (~270 KB), backs up every live key it overwrites to img/_review/rankroom-backup/ on the CDN, uploads (cdn_sync), rewrites the jres.js block; then `bash dev/site/build_site.sh`, commit jres.js only.
  live rooms: `-ha-sang` only by default (like swap_L2370); `--all16` overwrites all 16 mùa×buổi files (recommended, else the new picture shows only in hạ-sáng).
- undo: `... --revert`  (restores the backed-up keys from the manifest, empties the block).
- local test (no upload): `... --all-rooms --stage` then `node dev/test/rankroom-stage.js fold|ipadAir <outdir>` (serves staged pictures, prints palace×rank×part×night → picture table).
- Rooms the owner marked `no` simply are not in OKFILE → stay old / go to the repaint list.

## In the game (law 12) — 0 page errors
Fold (755x1000 host) and iPad Air landscape 1180x820, palaces Khải Tường/Chung Tú/Diên Huy/Thừa Minh × Tần/Phi/Quý phi × day/night: 12 shots each, e.g. Khải Tường Phi day → khai-tuong-cung-phi-ha-sang; Quý phi night → …quyphi-ngu-ha-sang (bed room, figures stand on the floor).
Shots (never in git): /tmp/w/shots/fold-*.jpg, /tmp/w/shots/ipadAir-*.jpg in the worker container. Resolution table: 50 wired bases, 192 lookups, 97 fall back to old (rooms without a picture / Hoàng quý phi) — as designed.

## Waiting / next
Send ROOMS PICK ok=… no=… (ids). I run `--ok … --go --all16`, rebuild, re-shoot 2 devices, push, report LAND READY. Open question: bedroom trigger (buổi tối) and `--all16` — confirm.
