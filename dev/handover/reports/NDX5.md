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

## D15 STYLE LOCK job (ROOT-56 21:51Z): NOT STARTED, nothing edited. NDX5 HANDOVER (roll line)
depth 8 · START_CTX ≈3 % · now 24 % (get_session 236,812 / 1M) → roll line 28 %; this job needs more, so I stop here. The COORDINATOR opens the successor (I am at depth 8, cannot open a child).
ROOT-56 decisions (verbatim from its 21:51Z message): (1) insert in build.py AGE_TXT a51/a65 at the ma ma spot (before "Her robe keeps…"); Thái hậu: between the 18/11 AGE TEXT and COLOUR TEXT. (2) Nữ đế (--nude3 and nude-B/mk.py): EXCLUDE (NDX4 owns nude). (3) Men: a his/he copy in emperor-B/build.py so build_npc.py's gender-swap assert passes. (4) Do NOT renumber the swatch sentences: where image 2 is already the royal swatch (t6–t8, Thái hậu) the a36 ref = image 3 and ONLY the ordinal changes ("second reference" → "third reference"); everywhere else verbatim "second reference". (5) gen_refs(): add the a36 ref for a51/a65. (6) new check_store S rule (a51/a65, every scope except nude, exactly once); then build_all.py --check for all 5 ages + check_store.py --self. Push, then send ROOT-56 the diff summary + gate output.
What I found (read-only):
- Sentence (verbatim, from dev/handover/reports/mama-specs/m05-a51.styleref.r55.prompt.txt; same in a65): "STYLE LOCK (same drawing as her 36-year-old picture, the second reference): exactly the same soft painterly guofeng illustration rendering, the same smooth luminous painted skin, soft stylised features and gentle painted shading as the 36-year-old picture; her age shows ONLY through the silver in her hair and a few soft painted lines, NEVER photographic, NEVER photo-realistic, no realistic skin texture, no pores, no detailed wrinkles."
- Spot: a51 after "…never haggard or plain." / a65 after "…never haggard." and before " Her robe keeps" in both (checked in the two r55 files) = build.py line 281 AGE_TXT.
- build.py users of AGE_TXT: lines 460, 521, 1156, 1298 (Nữ đế nude3 → must strip the sentence there), 1337, 1393 (ma ma), 1445, 1482, 1508, 1525, 1581. Also line 1319 _A51EX slices AGE_TXT["a51"] by "(e.g. pink" … "; the royal yellow" (unaffected if the sentence goes before "Her robe keeps").
- nude-B/mk.py runs build.py --state nude via _build_item.py; check how NDX4's r4 mk.py treats the a51/a65 age text before deciding where to strip (it must NOT get the sentence).
- Men: emperor-B/build.py line 18 AGE_TXT; build_npc.py line 41 asserts M_AGE == _gswap(W_AGE). The swapped sentence reads "his 36-year-old picture" / "his age shows" automatically if _gswap covers her→his; check _gswap.
- gen_refs(): build.py line 1836. Refs = image 1 own (--nostyle) [+ swatch at 3, renumbered to 2 in store/build_all under --nostyle]. a36 ref must be appended as image 2 (or 3 where the swatch is image 2). The person's a36 picture id must come from the store ledger / KC_REFS (find where a36 ids live; ma ma: BhNUblSoQR per MMX4).
- Thái hậu: build_all.py thaihau() → th1811(age) joins "AGE TEXT"+" "+"COLOUR TEXT" from dev/art/elder-copy/THAIHAU_1811_AGE_COLOUR.md.
