# review/opt-pics3-r1 (D53b) — independent reviewer report
Branch review/opt-pics3 @ b7053b9bb merged onto latest origin/main 0a311183 → review/opt-pics3-r1. Conflicts: assemble.py (list: main's list + `jtds.js`, `jwkpics.js` appended, so jwkpics stays after jtds), generated index.html / sw.js / assets.json (rebuilt with `bash dev/site/build_site.sh`).

## PASS f02abdc41bb8be5a8e3f1553fdb2e0c8e6b0d3c9
Descends from origin/main 0a311183 (verified `merge-base --is-ancestor`). Pushed: origin/review/opt-pics3-r1. No code changes by me beyond the merge.

## Checks
1. Pictures: LOOKED at all 25 (12 banners ev-wk-*, 12 cards act-opt-wk-*, ev-q72-fam-thd) + the 3 acts pictures. Banners: one serene lady, fair, 18–25 look, calm pose, pink/green/cream palette; no man anywhere; no slanted eyes, smirks or moles. Cards: hands only (no faces), one prop set per art, same style anchor. Acts: hands only; the night one (sai-nguoi-trom-do-h) is dark teal/maroon, no men in pink/purple. Fit: right prop for every kind (guqin, ink-painting, sachet knot, go board, pot + ginseng/dates, rouge bowl, rosary bag, embroidery frame, brush + scroll, letter writing, dance silk + drum, herbs/mortar + sachet). Notes (no FAIL): ev-wk-vu shows trailing silk spread on the floor, no figure flying hem; ev-wk-kimchi / ev-wk-phanson crop the face partly (hands focus) — fine.
2. KIT: a KIT_EVFIT function row is an existing documented mechanism (jevfit.js header: "a group … a function of the dialog"; precedent: row "dress-remark"). Generated KIT_OPT_RULES rows (unshift, one per kind, built from WKR names) are plain data through the existing jopic §6.2 rule table. No new kit part, no per-place variant, no private CSS, UI is the stock dialog (kdlgart banner + option cards with picture left). → data, not a kit mechanism change. KIT REQUEST: none.
3. Three material cards share ONE picture per dialog: reads fine (the three differ by name/cost/outcome text; the picture is the art, consistent with §6.2 "one picture per meaning group"). Note only: if the owner later wants the tiers to differ (plain / fine / precious material), 3 more pictures × 12 kinds would be needed — not required now.
4. Rule-steal scan (dev/art/pp4/scan.js logic): regenerated the literal list from the MERGED tree (28511 quoted literals of dev/build/j*.js, merged with the worker's titles.json = 29266 titles) → old rules (opt-wk-* removed) vs new: 462 changed, all of shape "<recipe or work> · <material>" = 154 names × 3 materials = exactly the material-dialog titles; 0 non-dialog literal changed; 0 page errors.
5. All-recipes probe (dev/art/pp4/all_recipes.js, merged build): checked 150 bad 0, errs [] — banner ev-wk-<key>, 3 cards opt-wk-<key> (kinh: chep-kinh-h) for every recipe.
6. Live ACTS.json (CDN): valid JSON, 395 acts; the 3 new keys present ("Các lối, sách phổ" → cac-loi-sach-pho-h, "Sai cung nữ thân tín lấy đồ" → sai-cung-nu-lay-do-h, "Sai người lấy trộm đồ" → sai-nguoi-trom-do-h) and their act-*.webp files return 200 (384x506); all 25 + 3 pictures return 200 on the CDN. No key lost (all pre-existing sections _doc/acts/cats/have/prefix/log intact; no deletion visible, worker report: pulled, 3 added).
7. UI: opened the material dialog for Khúc «Xuân hiểu» (art Cầm), Hà bao thêu hoa mai (Tứ đức Công), Phấn gạo trắng (Tứ đức Dung, banner ev-wk-phanson), Cháo trắng hành phi (Nấu) and Kinh A Di Đà (Chép kinh) at 755x1000 and 1180x820: banner with kind chip, picture-left cards, no horizontal overflow, no cut text, no page errors. Chép kinh banner = Thi's, cards keep the older night picture chep-kinh-h by design (different tone, accepted by worker note).
   Test harness remark (not a game bug): the first dialog opened right after 60x start() sometimes sits under the Luân hồi screen; a warm-up dialog first avoids it.

## Tests run
all_recipes.js (150 ok), scan.js re-run on merged literals (462 = dialog titles only), build_site.sh rebuild OK (node --check ok), Playwright 755x1000 + 1180x820 screenshots looked at, CDN fetch of all pictures + ACTS.json.
Not run: other viewports of REVIEWER.txt (1000x755, 1366x1024, 844x390, 390x844) — the task named 755 and 1180 only; the dialog frame is the unchanged stock one.

## KIT REQUESTs
None.
