# Review C41b tuduc-pic (r1)
PASS 2954ff9fb9367940b62bb9b824645a14c60191e0
(origin/main eba64ead is an ancestor; branch already contained latest main, so review branch review/tuduc-pic-r1 = same sha, no rebuild needed.)

## Change
Call site only: jtd.js tdPlay passes `pic:kg82Pic(kind)` to kg82Open; TD_BG override gives the study-room paintings (theu/mua/tho/ve -bg-hoc).

## Tests: node dev/test/tuduc-mg.js . <vp> out all all (4 games x self+master = 8 runs each)
755x1000@2 8/8 · 1000x755@1 8/8 · 1180x820@2 8/8 · 1366x1024@2 8/8 · 844x390@2 8/8 · 390x844@2 8/8. Page errors: none, no overflow, no ellipsis, no "%". Play + result + progress OK.
CDN: img/kit/mg-{theu,mua,tho,ve}-bg-hoc.webp all HTTP 200 (175-235 KB, within budget).

## Visual (looked at screenshots)
- Wide: picture left, info right for Công/Dung/Ngôn/Hạnh, intro and result.
- 844x390: picture left, fits, no cut text.
- 390x844: picture as top band; rotate prompt overlay shows (expected).
- KIT CONSISTENCY: same kitGameFrame({pic}) call path as j82 contest/knowledge games, jexam, jts. No private CSS.

## Observations (non-blocking, not caused by this change)
1. First harness iteration (cong self, wide) shot shows the page behind, not the frame (timing artefact of the shot; cong master and all other runs show the frame; test passes).
2. Transient floating delta chips (e.g. "Bạc -5", "Sức -15") from the previous run's apply() can fade over the frame corner at 844x390 — page toast layer, pre-existing.

## KIT REQUESTS: none. Owner questions: none.
