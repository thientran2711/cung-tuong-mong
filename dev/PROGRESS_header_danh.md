# PROGRESS review/header-danh (from origin/main 53a61f8e8)

Task (coordinator, owner rulings 15/11): top bar stat groups LEFT Sắc · Tài · Tâm cơ · Đức · Danh · Sủng | RIGHT Bạc · Sức (owner ~17:50Z, final;
replaces 17:36Z); merge what is still needed of review/header-fix (unreviewed); fix reviewer note kit-close.md #3 (1000x755 quẻ line over Sắc).

## Done
- Merged review/header-fix (f0590d9e + 1c7281f9): kitHdFit, her block never wraps ≥ 600 px, 600–999 px option A (owner 08:35Z: "‹ Nơi" under
  the time block, right column), ≥ 1000 px two-row fallback `.khd2`. Its KIT text "31.19" clashed with main's 31.19 ACT ORDER → KIT §32.12.
  Still needed on main: yes — main still had name on 2 lines / date on 3 lines at 755 away from home, and the quẻ/Sắc overlap at 1000 + 1180.
- p1.html: cells moved (ids unchanged, so popNum / coinPop / hudTween / srvHud / game-feel KF_CELL targets keep working); groups carry `--kn`
  (6 | 2); jk4 stretched rows grow by --kn (equal cell widths); kitStatRow writes --kn itself.
- jk3: every cell has tooltip "<name> <value> · chạm để xem đủ"; tap on any cell → k3Explain (servant road Sủng = Chủ tin → HX.tin);
  j79 HX for sung/danh/bac/suc from KIT_GLOSS (one source); k3Explain title from the cell label.
- jk4: portrait frame height = name block height (owner 10:30Z) via --kmeh measured in kitHdMe; kitHdFit measures the one-row form with the
  seal's .kseal-pad (1000–1179 icon-only cells) and calls kitSealHud after.
- Kit sample page: §32.1 stat row sample. KIT §32.1 text + new §32.12.
- Probe: dev/test/header-danh.js (5 sizes + old save; see KIT §32.12).

## Resume
`node dev/test/header-danh.js <built index.html> <outdir> 755x1000@2,1000x755@1,1180x820@2,1366x1024@2,844x390@3 <oldsave.json>`
(old save: `node dev/test/mk-oldsave.js <live url> oldsave.json`).

## Review r6 (review/header-danh-r6, merged onto origin/main 5e491704d, then ce840fa84; probe re-run after the second merge, same results)
- Merge: conflicts only in built index.html / sw.js (rebuilt; assets.json kept as main's: no asset changes here). Comments "KIT 31.19" in jk4 → 32.12.
- header-danh.js at 755x1000@2, 1000x755, 1180x820@2, 1366x1024@2, 844x390@3 + old save (live build): no page errors, groups 6|2, label/number
  spread 0 px, bars Danh/Sủng/Sức, all tooltips, no quẻ/time-vs-cell overlap, seal never over the quẻ line, her block 1 line each, portrait
  box height = name block, two-row only when needed (1000/1180 away + 1180 long quẻ), back home → one row, no horizontal overflow. Old save loads.
- Servant road (1180, 755): Sủng cell reads "Chủ tin" (value S.tin, tooltip "Chủ tin N · chạm để xem đủ"), tap → "Chủ tin" explanation, only ✕.
