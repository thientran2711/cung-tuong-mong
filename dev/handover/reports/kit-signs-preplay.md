# kit-signs-preplay — report (kit-mark; order of ROOT-78 12:27Z, rv-kit-signs-odds note)

Branch `review/kit-signs-preplay` from LIVE 26f3bfa9. Code gate: `bash dev/tools/quickcheck.sh daa4c717` PASS (core gates PASS, old save ok, perf like live); `golive.sh` not run (classifier refuses). The head commit only adds the rebuilt build label to index.html.

## Cause
Makeup «Trước gương đồng» builds its own screens (dress, pre-play «Trang điểm / Điểm trang nhanh / Để mặt mộc», colour pick, result) and never sets KG82.phase, so `kg82Signs` treated them as play: red start button and third button became «●».

## Fix (one kit pass)
`KG82.setup=1` marks a self-built non-play screen (jtoil: toilDressUI, pre-play screen, toilColUI, toilFinish); `toilMakeup` clears it when the board starts; `kg82Open` / `kg82Play` clear it; `kg82Open` also resets the stale `KG82.phase` and `KG82.ready` of the previous game (a stale ready blocked the ✓ sign on the drawing step). `pass()` returns while `KG82.setup` is set. KIT §13.12.

## Before / after (dev/test/mg-signs-preplay.js, Fold 755x1000)
| screen | before (LIVE 26f3bfa9) | after |
|---|---|---|
| 31 kinds: rules / pre-play | no sign | no sign (unchanged) |
| makeup dress | ● ● ● ● ● ● | Tất cả · Trâm cài · Y phục · Trang sức · Mặc bộ này · Giữ đồ hôm qua |
| makeup pre-play | ● · Điểm trang nhanh · ● | Trang điểm · Điểm trang nhanh · Để mặt mộc |
| makeup colour pick | ● ×5 · quick · ● | words kept |
| makeup drawing step | ✓ | ✓ (still a sign) |
Before 3/6, after 6/6. Stays green: mg-noword-kit (31 kinds, 0 words, odds words stay), mg-noword-b, mg-ui-rest 39/39, mg-skip (run as `node dev/test/mg-skip.js file://…/dev/index.html 755x1000@1 <dir>`).
Not covered by a before/after: result screens of the 31 kinds are excluded by the existing phase check (unchanged). The scan only reaches the rules screen of each kind; self-built screens of other callers (jentry, jroute) were not found to differ.
