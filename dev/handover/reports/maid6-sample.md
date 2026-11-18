# maid6-sample (ROOT-54 sample worker) — branch review/maid6-sample eb73871 (sample only, not for landing)
PRIORITY #1 CHECK: OD people card 2 + 18/11 ~19:45Z (6) | main rightcol 2 hits (jk3 k3maid/k3court, KIT 31.2) | review/* none | claims none.
Owner question (OD 18/11 ~19:45Z point 6): right column with Hoàng thượng, Thái hậu, Hoàng hậu + maids; fine with 1 maid; with 6 maids too crowded? "recommend / make me a sample".
Today: the column shows ONE maid chip (k3maid, `data-k3go=staff`); no code path for 6. Samples are a DOM mock on the real game (dev/test/maid6-sample.js; maid chips cloned from the real kit chip, names mock; one "Cung nữ ???" is the game's own unknown-name mask).

## A — current layout forced to 6 maids (`A-current-6maids-*.jpg`)
Crowded: each maid chip ~118 px high. Fold 755x1000: the Ân sủng plaque is cut at "Bổng lộc", "Nguy hiểm/Xét phẩm" pushed off the stage floor. iPad 1180x820: the 6th maid is cut, Ân sủng and Nguy hiểm gone entirely. Answer to the owner: yes, too crowded from ~3 maids.

## B — recommended (`B-recommended-closed-*.jpg`, `B-recommended-open-*.jpg`)
Royals keep their 3 cards unchanged. The maids become ONE plaque "Cung nữ · 6 ›" holding a single row of 6 overlapped small portraits (~80 px high instead of ~700). Everything below it (Ân sủng, Nguy hiểm, Xét phẩm) stays fully visible on both devices. Tap = opens IN PLACE as the list of the normal kit maid chips (name + Thiện cảm), scrolls inside the column, ‹ folds — same pattern as Ân sủng `.kas-one` / `.kasfold` (KIT 31.2), so no new behaviour. 1 maid = today's single chip (unchanged); plaque only from 2 maids. Tap a chip = that maid's card (as today).
Why B: fixed height whatever the number of maids (law 10), reuses the existing open-in-place pattern (law 9), keeps the royals one tap, shows she has people with a count.
KIT REQUEST filed (KIT_REQUESTS.md): `kitCrewPlaque` (stacked-portrait plaque) — the mock only imitates it with existing kit pieces; header/fold chip in the OPEN shot is rough (mock), the real part will use the `.kasfold` header.
Mock caveats: portrait overlap uses a CSS scale on the xs portrait; the open mock hides the royals while open (in the real part the column scrolls like Ân sủng open).
Shots (handover branch, dev/handover/shots/maid6-sample/): A / B-closed / B-open × fold (755x1000@2) and ipad (1180x820@2), full screen, each looked 3x.
Tests: none beyond the mock run (no page errors). Rollover: not needed; no handover.
~50% xong / ~0% chơi được (mẫu)

## HANDOVER (maid6-sample worker → successor for review/stage-rightcol)
Context of this worker is past the rollover threshold, so it stops; coordinator please open the successor for the REAL BUILD (brief dev/handover/briefs/stage-rightcol.md).
Findings to reuse: right column = `#kshR` built by jk3.js `k3Stage` (court chips `k3court()` L54, maid chip `k3maid()` L59 with `data-k3go=staff`, Ân sủng `k3AsRows`/`k3AnSung` L70, crowded check `k3AsCrowded` L73); open-in-place pattern = `.kas-one`/`.kasfold` + `window.__kasOpen`; KIT §31.2 and §85.6/85.8 (column also on map). Place name today = plaque `#kpname` (KIT §33 line ~1661), shifts the cards by `--kpnh`.
Test harness that boots a real game headless: dev/test/maid6-sample.js (recipe: serve index.html under the live origin, remove #kroul/#kroulw/#kload/#klife overlays, `start()` loop until not isSrv, nextBuoi x2; freeze k3Stage/render before injecting a mock). Served maids today: only S.maid (1 chip); eunuchs/servants (S.staff) are not in the column — need the household list for «Cung nhân · N».
Mock caveat: in the open mock, flex column stretched the royal cards when a tall list was inserted (needs `flex:none` on `.k3c/.k3p` inside #kshR, or the real accordion must be height-capped and scroll inside).
Branch review/maid6-sample eb73871 holds the mock + KIT_REQUESTS row (rename it kitGroupFold in the real build).
