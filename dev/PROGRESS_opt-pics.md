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
