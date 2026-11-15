# PROGRESS review/rank0-ivory (owner 11/15) — base: origin/main (merged d69030384)

## DONE
- f63e764be / 7b9faf092: Đáp ứng = option A (old brown-grey carved frame + crest kept; ivory pearl brocade `bg-consort-0`, pearl gem `gem-0`), KIT_CREST consort-0 restored; RCOL[0] `#9c8f74`; KIT §1.3/§4.1b.
- frame-cold (withered grey) + frame-consort-6 (grander HQP) drawn — NOT approved/uploaded (owner never decided; 6 may look grander than 7).
- 10 emotion badges (final Sợ + Giận), approved; 8 rank markers me-mark-0..7 (6↔7 swapped), approved. kitMeMark v2 (jmark.js): 8 markers as items (Tư trang tab "Dấu ấn", Dùng, rank-chest hook via kitReward), one placement rule (marker bottom = head top − 1.2 % figure height, shrinks in dialogs), bob only.
- jemo tap tooltip (kpPop mood + cause).
- jkpor (portrait fit) f1db91621: same 1.14 scale, head top 3 % under window top, body centred (all 32 consort sheets dev/shots/rank0/portrait-fit.jpg).

## WIP (this commit)
- jkpor: per-picture FACE-size normalisation for every family (owner: kids' heads at different zoom). jkpor.js now reads `img/POR_FACE.json`
  ([faceTop, faceH, faceX, opaqueTop, bodyX] per por picture; z = 0.319 / faceH clamped [1, 1.6]); without the manifest it behaves as before.
- dev/tools/por_face.py (OpenCV Haar face boxes → POR_FACE.json; multiprocessing) and dev/tools/por_family.py (per-family contact sheets OLD|NEW + ±3 % check).
  Haar on 549 samples: 0 misses, face/picture ≈ 0.28 (family spread 5–10 %, kid-a4 26 %).

## LEFT
1. Run `python3 dev/tools/por_face.py <dir with all 5365 img/por-*.webp> img/POR_FACE.json` (download: `cdn_sync.py --pull 'img/por-*'`;
   took >10 min on 4 cores), then `python3 dev/tools/por_family.py <dir> img/POR_FACE.json <out>` → one contact sheet per family
   (consort, maid, mama, eunuch, man, official, physician, emperor, thaihau, player, kid-a4/a9/a14/a20), check "within ±3 %" and side gaps
   (z min is 1.0, so pictures whose face is already bigger than the target stay bigger — decide whether to allow z < 1). Send sheets to the owner.
2. Upload POR_FACE.json: `python3 dev/site/cdn_sync.py img/POR_FACE.json`.
3. Pending art decision: frame-cold.webp, frame-consort-6.webp (in this worktree's img/kit, not uploaded).

## Known bugs / notes
- jkpor data: avatars (data: URLs) and face-* art keep their old rules.
- kitMeMark: in dialogs there is no room above the head, so the marker shrinks to 12 px.

## Tests
- Marker placement: dev shots in dev/shots/me-mark; rule measured gap = 1.2 % of figure height on Fold/iPad/390 (see commit 5589d224e).
- Portrait: dev/tools/por_family.py numbers.

## cdn_sync pending
- `python3 dev/site/cdn_sync.py img/POR_FACE.json` (after step 1). frame-cold / frame-consort-6 only if approved.
