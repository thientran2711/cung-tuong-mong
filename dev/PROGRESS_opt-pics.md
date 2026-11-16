# PROGRESS review/opt-pics — every option card: picture LEFT, info RIGHT (KIT §6.2)

Owner 15/11 (verbatim): "Hình minh họa cho từng hành động bên trái. Bên phải là thông tin. Tôi nói hoài vậy." Markup
dev/handover/refs/owner-option-picture-left.jpg (docs branch). Owner rulings relayed by the coordinator: one picture per MEANING GROUP
(reuse), keep BOTH card forms (big Hành sự card untouched), the SMALL card's picture = 3:4 portrait rectangle, option cards = small card,
tap picture = enlarge.

## Done
- `dev/build/jopic.js` (assembled after jph): `kpOptArt(b)` in the outermost `kaNorm1` wrapper turns every dialog option
  (`#modal .opts > button.ka`, `.kpscopts > button.ka`; not the identity card `.nlopts`) into the small card: `.kaart` picture
  (kitArtFrame) + `.kabody`. `kitOptPic(title)` picks the picture: own act key → ACTS log rule → `KIT_OPT_RULES` meaning group →
  person portrait → item picture → carried picture → §59 placeholder (recorded in CTM_MISSING_PICS kind "opt").
  Tiny portrait icon in the title removed. `kitPicZoom(src)` + capture click on the picture (does not choose). Kit sample "§6.2".
- `dev/build/jk4.js`: §43 small-card CSS is now one function `kitCompactCSS(B,w,h)`; small card picture 84x112 (72x96 under 420 px pane).
- `dev/build/jk2b.js`: kitHideOut / kitHintOf find `.kat` also inside `.kabody` (risk chip + odds removal kept working on pictured cards).
- Options one per row, full width; card min-height = picture + padding (equal heights for the usual card).
- Painted 6 group pictures (gpt-2-6, hands-only house style; ids dev/figwork/optpics/gens.txt; on the CDN):
  opt-thoi, opt-thua-trinh, opt-buong-tay, opt-rinh-cho, opt-canh-giu, opt-hoang-so. ~45 other groups reuse existing act pictures (each looked at).
- KIT.md §6.2 (new) + §43 note.
- Tests: `dev/test/opt-pics.js` (classification table + layout + zoom), `dev/test/opt-pics-scan.py` (static option titles).
  Table: dev/test/opt-pics-table.md.

## Resume
- Rebuild: `bash dev/site/build_site.sh`; test: `node dev/test/opt-pics.js <url> <out> 1180x820 755x1000 --titles <static.json>[,<bot.json>]`
  (static.json from `python3 dev/test/opt-pics-scan.py static.json`; bot titles = [[title,count],…] e.g. from opt-render's F section).
- More pictures: add a regex group to `KIT_OPT_RULES` → existing act key, or paint `act-opt-<group>.webp` (384x506) and upload with
  `python3 dev/site/cdn_sync.py img/act-opt-<group>.webp`.

## Left / notes
- 38 titles still placeholder in the scan: ~24 are run-time templates ("…") or person names of another save (resolve in play);
  ~12 one-off lines (e.g. "Hồi âm một chữ “An”", "Thản nhiên rót rượu như với mọi quan") — next batch if the owner wants them.
- Kit page §28.1 sample throws before a game starts (rkOfFace … 'out') — on main already, not from this branch.

## Review r1 (review/opt-pics-r1, merged onto origin/main 2d038139e)
Fixed by the reviewer (jopic.js):
1. OVERLAP: in the person dialog (jk4 32.7 `.kdper`, rule `min-height:max-content` with 2 ids) the picture floor lost; in the short
   scrolling options grid at 844x390 and 755x1000 rows shrank to 41 px and the 130 px cards were drawn on top of each other (Tết, vlget,
   Một ánh mắt). Added a higher-specificity floor rule. opt-pics.js now FAILS any two overlapping cards or a picture sticking out of its card.
2. IDENTITY CARD: j79 kpIdentity moves the approved `.nlopts` pair into `.kpscopts`, so "Nhận thân phận / Đổi thân phận" got pictures
   (one a placeholder). KIT_OPT_SEL now `.kpscopts:not(.nlopts)`.
3. MEANING (LUẬT SỬA CẢ NHÓM): rules matched inside words ("dò"→"dòng", "sớ"→"sớm", "đồn"→"đồng", "đánh"→"Đánh lạc hướng").
   `kitOptHit` = whole-word match (Vietnamese letters). Regrouped: Đi / Vẫn đi / Đi (…) → den-ngay-h (were the turning-away picture),
   Ở lại → o-yen-nghi-h, "che phần lớn" → giau-trong-ruong-h, bare "chàng" → hen-gap only as the LAST rule (petitions for him now xin-an-dien).
   Before/after on the 551 static titles: 10 changed (see table, section r1); placeholders 23 → 25 ("Viết một dòng…", "Đánh lạc hướng…").
Tests r1: opt-pics.js 1180x820, 755x1000, 844x390, 1000x755, 1366x1024 (+390x844 = rotate prompt) 0 fails, zoom opens / does not choose;
opt-render.js 844x390@2 0 fails, no page errors. Six new pictures looked at: on-meaning, house style, 384x506, 38–53 KB.
Note for actcard-small C40: the odds label tap (jwhy `.kodm` capture handler → why-detail) still works on picture cards; there is no
separate "!" mark on option cards.
