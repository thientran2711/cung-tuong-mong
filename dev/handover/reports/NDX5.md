# NDX5 report (worker; Foreman C ROOT-56 session_01PEhRbxQAS4sqEvJjdStdLX)

depth 8 (limit 8: cannot open a child) · START_CTX ≈3 % of 1M · rule: roll at START+25 %, ceiling 60 %.

## 1. Nữ đế crown + colour job (ROOT-55 brief): NOT DONE BY ME
ROOT-55 said STOP: NDX4 had already done it (ea60aa80d, owner Lượt 701+702). mk.py untouched, no gens.

## 2. Owner Lượt 703 face-tick page: DONE
Link: https://claude.ai/artifact/FQADgRrxsN5ZQphqSQDUsx (private; the owner opens it with her own account; ROOT-56 sends it).
- Tabs: Tất cả (64) + Tươi tắn 11, Dịu dàng 11, Đoan trang 11, Sắc sảo 11, Tinh nghịch 11, Kiêu kỳ 3, Lạnh lùng 3, Quyến rũ 3. Kho (32) hidden.
- Each card: face crop + id + version · cut id + group + tick box "Vẽ lại". Red counter "N vẽ lại" on each tab; the line under the tabs lists the ticked ids for the open tab.
- Ticks persist in the artifact db: collection `picks`, doc id = person id, {id, group, cut, redraw: true/false, at}. Read them with ArtifactData list `picks` (redraw:true = must redraw). Empty at publish (checked).
- Pictures = durable artifact assets (/_blob/…), not Magnific links. Map cut → asset url: dev/art/face-common/face_page/ASSETS_L703.json.
- Looked at all 9 tabs (desktop) + phone width: all 64 pictures show, no JS errors, no sideways scroll.

Files (dev/art/face-common/face_page/): page.src.html (source), build_page.py (FACE_MAP_L703.json + ASSETS_L703.json → face_tick.html), crop_faces.py (crop recipe: 460 px window from the top of the figure, centred on the head, on #f4f0ee, 460×521 JPEG; c15 shifted −150 px because of the lotus leaf), face_tick.html (published file). NF4's older template.html left as is (not used).

## To add s19–s38 (when NF4 has put them in OWNER_GROUPS_L686.json + gen_ledger)
1. python3 dev/art/face-common/face_map_L703.py
2. For the new/changed people: creations_get their cut ids → download `url` → crop with crop_faces.py logic → Artifact publish asset:true, url above, file_paths (≤25/call).
3. Add {cut: "/_blob/<id>"} to ASSETS_L703.json; python3 build_page.py (must print "missing picture: []").
4. Artifact publish file_path …/face_tick.html (same path keeps the URL; ticks stay in the db). A redrawn face = new cut id = needs a new upload.
## Update: s19–s38 ADDED (version 3 of the page)
NF4's s19–s38 arrived in the merge; I re-ran face_map_L703.py (116 people, 84 shown, the old 64 unchanged) and uploaded the 20 new crops.
Tabs now: Tất cả 84 · Tươi tắn 11 · Dịu dàng 11 · Đoan trang 11 · Sắc sảo 11 · Tinh nghịch 11 · Kiêu kỳ 10 (s10–s12, s19–s25) · Lạnh lùng 10 (s13–s15, s26–s32) · Quyến rũ 9 (s16–s18, s33–s38). Kho 32 hidden.
I looked at all 9 tabs again: all 84 pictures show, no errors.
