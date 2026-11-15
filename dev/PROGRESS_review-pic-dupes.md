# PROGRESS: review/pic-dupes (owner 15/11: two different acts share the same picture)

## Cause
"Nghỉ ngơi một lát" (j76) and "Đọc sách giải khuây" (j76) have no key in img/ACTS.json, so j79 kitActArt -> jph (KIT §59) gives both the
act PLACEHOLDER img/ph-act-light.webp. Every act without its own key shares that placeholder (light) or ph-act-dark-v2 (dark).
Owner ruling (15/11): only DIFFERENT meanings may not share; same-meaning groups (e.g. "Nhờ X trả ân", "Xin yết kiến ở ...") may.

## Scan
`node dev/test/pic-dupes.js <build url> <out.json> [extra-names.txt]` (ACTS_FILE=<json> tests a manifest patch): runs the game in 5 states
(fresh, high rank + staff, children, Empress, ill) + static act names, resolves every act with the game's kitActArt, groups by picture.
Before: 272 acts, 103 on a placeholder, 23 shared pictures. After the patch: 270 acts, 19 on placeholder (all static names that never render
as act cards: art-type names, sourcing-route buttons (.rbtn), story options (.opt), sample artefacts), shared pictures left = same-meaning groups only.
Near-duplicate files: dev/figwork/picdupes/phash.py (dHash over 1533 act-/ev- files on the CDN): 0 exact md5 dups, 0 pairs at distance <=6;
closest group (7-10) = act-them-cung-nu / ve-hau / thinh-an-th / tranh-ghe-xong / xin-hh-giang (old template full-figure pictures);
of these only ve-hau and tranh-ghe-xong are live (one log rule each) and both are in review/act-pics2's redraw queue (#269, #249) -> theirs.

## Done
- 36 new hands-only act pictures (gpt-2-6, act-pics2 rprompt template, scenes.txt, ids gens.txt), every one looked at on sheets + hand zooms,
  on the CDN as img/act-<key>.webp; ACTS.json patch = patch.py (exact names, pet/place names, "*" patterns); 3 remaps to existing same-meaning
  book pictures (Sai đi dò la -> sai-di-do-la-h, Xin Thái hậu đỡ lời -> xin-th-do-loi-g-h, Đưa cơm áo -> dua-com-ao-h); "Hành lễ" off bai-kien-h.
- Owner redraw "Đêm thị tẩm" quilt carry: img/ev-night1-v2.webp (new name, CDN caches by name), jevban KIT_DLGMAP night1 -> night1-v2.
- Drawn but NOT wired (coordinator dropped the tone task; review/night-end-r1 owns it): img/ev-night2-warm.webp, img/ev-night2-tender.webp (on CDN).
- ACTS.json patch APPLIED LIVE 15/11 (fresh pull, live == pulled, verified after push): acts 301 -> 386, distinct act keys 216 -> 255; log/prefix untouched.
  Includes nghe-ngong-chung (maid card act "Nghe ngóng chung", jwhy). 36 new pictures + 1 = 37 keys (scenes.txt/gens.txt).
- Tests (local build + live ACTS): Hành sự cards "Nghỉ ngơi một lát" -> act-nghi-ngoi-mot-lat, "Đọc sách giải khuây" -> act-doc-sach-giai-khuay;
  night1 dialog shows ev-night1-v2; 755x1000 and 1180x820: no horizontal overflow, 0 page errors.

## Left / for others
- review/act-pics2: near-duplicate template pictures ve-hau (#269) and tranh-ghe-xong (#249) are in its queue.
- Not covered: q72 quest step names ("Đến <consort palace>", step titles) only render with an active quest; a runtime pass with quests would list them.
- Coordinator: ev-night2-warm / ev-night2-tender are on the CDN but unused (night-end-r1 owns the tone pictures).
