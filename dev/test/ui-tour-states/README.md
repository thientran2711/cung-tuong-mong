# ui-tour-states — capture scripts (owner 21/11 ~02:20Z: show every frame WITH content, separate file)

Read-only: no game code change. The built site (assemble.py + build_site.sh) is served from disk by Playwright routes (`lib.js`, host http://ctm.local/), no local server.

- `seed.js` — `rich(opt)`: a filled life through the game's own functions: rank (default 5 Quý phi; `queen:1` → Hoàng hậu), her 4 children (2/9/16/17) + rivals' 5, 3 factions (she leads/joins one), 6 men met, 3 pets, items of every Tư trang kind, 1–3 Việc nhờ in progress + debts + palace news, the 17-year-old daughter betrothed, grand endings in Sổ ghi (ctm-ge). opts: org, rank, queen, nokids, nofac, nomen, nopet, noq72, noge, nobetroth.
- `walk.js` — every tab group, sub-tab and Tư trang filter; `sections.js` adds every kit sub-tab row (Mệnh truyện, Việc nhờ, Tài nghệ…) and a scrolled shot.
- `sections.js` — sections: tabs, queen, fac (no faction + notice tray + invite card), q72 (favour offer), hon (Bàn hôn sự), night (thị tẩm chain), dress (Trước gương đồng), detail (act buttons of filled views), mg (every mini-game result + contest podium), tut (Lời dặn tân thủ cards), cnv (cung nữ popups retaken after the fade).
- `cap.js <fold|ipad> <outdir> [sections]` — shots + manifest (Math.random seeded so both devices get the same world).
- `compose.py <dir> [q] [scale]` then `compose.js <dir> <out.pdf> [pagesPerPart]` — TOC + one page per frame, Fold left, iPad right.
