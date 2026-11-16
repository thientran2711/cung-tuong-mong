# opt-greyed-2 HANDOVER (written by session_01UV1SzjgvGrBcSGqJv7jQTH at ~29.5 % context; coordinator opens the successor)

Rollover rules (verbatim, copy into the takeover prompt):
- ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217; repeated by the owner 16/11 09:20Z — she is tired of reminding)
- The "Lượt n/30" counter from the owner's global chat preferences is ONLY a display counter here. It is NOT the rollover trigger for the Cung Tường Mộng main chat or any foreman. Never hand over because n reached 30.
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Workers roll over too (owner 16/11 08:22Z s14): the worker writes its handover, tells its coordinator, the COORDINATOR opens the successor.

## Done (all reported to main s25)
- review/opt-greyed 68acf6d1 -> reviewer fixes -> PASS 75a8833b (KIT §84: kitOff / kitWhy* / kitTam in dev/build/jgrey.js; j3 showModal renders opt.off).
- review/map-frame-kit 036c5dd5 (KIT §85 Dư đồ style C, jmapc.js), READY, report reports/map-frame-kit.md, awaiting review.

## TASK for the successor (from s25): opt-greyed-2
Leftovers still HIDDEN (item/evidence gated; the ch70/evChoice engine uses need[] not opt.off):
1. jface.js:137 giải độc item;  2. jtruth.js:117 trình chứng cứ (+115 maid, 116 thái y);  3. jtoilr.js:47 tặng lại item.
Do: map the engine's need[{t,ok}] to the kitWhy* chip in the engine, ONE place, whole group (kitOff + data-kneed already exist, see jgrey.js and j3 showModal). New branch review/opt-greyed-2 from main after the next go-live (or from 75a8833b now). Scope: COST / rank / ITEM only, never time (TIME-spill worker owns khắc; use dayWhy for any khắc reason). Tests (extend dev/test/opt-greyed.js) + bash dev/site/build_site.sh + bash dev/tools/quickcheck.sh <sha> + node dev/test/coop-e2e.js; devices Fold 755x1000, iPad 1180x820, then 1366x1024, 412x1058; LOOK at shots (scratch outside git). Report dev/handover/reports/opt-greyed-2.md, CLAIMS row, "SẴN SÀNG <sha>" to main s25 (session_01UV1SziKxSHwSbnqfZWF5mM).

## Gotchas learned
- Shell `rev`/long `sleep` pipes hang here: use python for string tails; use `until grep -q DONE log; do sleep 3; done` for waits; run long jobs in background with a log.
- Test pages load images from the CDN via a Playwright route (see dev/test/map-frame-kit.js) — without it maps/pictures collapse and overlap counts are wrong.
- Handover branch pushes race with others: loop fetch --depth=30 / rebase / push (or reset --hard origin then cherry-pick).
- assemble.py module list is shared: both open branches append a module -> trivial conflict.
