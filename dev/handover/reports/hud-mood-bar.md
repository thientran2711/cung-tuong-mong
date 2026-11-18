# hud-mood-bar report (branch review/hud-mood-bar, sha bdfab16, base main a95e8d4)
PRIORITY #1 CHECK: OD L600 (Sims mood), L1689 (bar = signed sum), tail 18/11 ~05:40Z; main jmood.js (S.mood.v, mbBand, kitSignedBar KIT §49.1), jpcf.js (data-emo-open handler = existing mood box); review/npc-chain-land not fetched (not on origin in this clone) so moodBar(S) is read only if defined; claims: none on the HUD.

## What
- dev/build/jmood.js: `mbHud()` adds `#hud-mood.kstm` as the last child of `header.hud` (`grid-column:1/-1`, auto row = follows every top-bar grid variant incl. .khd2/.khd3, one-row bar). Content: her seal (emoBadge) · "Tâm trạng" · band word (mbBand + colour class) · kitSignedBar · signed number. Tap/Enter = existing mood box (`data-emo-open="me"`). Hooked after renderHUD.
- ONE accessor `kitMoodVal()` = moodBar(S) if defined else S.mood.v (no second number). Hidden when S.dead / __moodOff.
- Two layouts via `window.KIT_MOODBAR`: "row" (with words, +22 px header) and "slim" (seal + bar + number, +18 px). Owner picks, loser deleted (canon overwrite).
- KIT.md §49.2 written. No KIT_REQUESTS needed (kitSignedBar exists). Shots test: dev/test/hud-mood-shots.js.
- Tried a 9th stat cell instead (no header growth): rejected, it squeezed the 8 cells and forced icon-only labels (.khd3s).

## Tests (host mode, mood -45)
fold 755x1000, ipadAir 1180x820, ipadPro 1366x1024, pixel/iphone14 (rotate prompt devices): tabs act/rv/inv, 0 page errors, 0 horizontal overflow; header 129 -> 151 (row) / 147 (slim) px, bar box = full header width; tap opens the mood box on fold/ipadAir/ipadPro. Design canvas is 590x820 (page) / 1180x820 (spread), so 412x1058/390x844/1366x1024 render the same two frames.
NOT done: co-op / Fold cover 412x1058 shots, old-save and high-mood shots, kit-conform + mood-bar.js reruns (the local http server was denied by the sandbox). Header growth is +18..22 px, more than "a few px": that is the price of a full-width row; a 9th cell does not fit.

## Shots (CDN, delete after verdict: python3 dev/site/cdn_sync.py --wipe-review hud-mood-bar)
https://ctm-img.victoria-tntt.workers.dev/img/_review/hud-mood-bar/{fold-row-act,fold-slim-act,ipadAir-row-act,ipadAir-slim-act,fold-row-box}.png

## Update bdfab16
- Nghi ngoi card ("Tam trang dang ...") now reads mbBand(kitMoodVal()) (jrest.js), one accessor; the feeling line "Duoc: bot <cam xuc>" unchanged.
- Checked: +60 ("Han hoan", green) and old save (no S.mood -> "Binh than" 0) on fold, header 151 px, no errors/overflow.
- 412x1058 shows the rotate prompt in host mode (no top bar): accepted by main. Co-op shots, mood-bar.js and kit-conform not run here (no 2-player harness; both scripts launch Chromium without the proxy bypass, local goto times out).
- NEXT (after the owner picks row|slim): remove window.KIT_MOODBAR switch + the losing CSS in jmood.js, rebuild, push, report; main opens the small review.

## Final 04bb279 (owner picked layout 1, full row, ~06:05Z)
Switch KIT_MOODBAR + slim layout removed (jmood.js), KIT.md section renumbered 49.4 (49.2 was taken). Merged origin/main 9bbd78b (generated files rebuilt). Shots LOOKED fold 755x1000 + iPad 1180x820 (tabs act/rv/inv): header 151 px, 0 errors/overflow, tap opens the mood box; Nghi ngoi card reads the same accessor. Delete CDN shots: python3 dev/site/cdn_sync.py --wipe-review hud-mood-bar
