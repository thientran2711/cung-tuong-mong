# popup-fullbody-r1 — REVIEW RESULT: FAIL (review/popup-fullbody @ 591bde42)

Reviewer branch: review/popup-fullbody-r1 @ 0b1d3096 (main 399483e3 + popup-fullbody merged; assemble.py conflict resolved = main list + jpdlg.js after jk4.js; index.html/sw.js rebuilt; PLUS reviewer fix jkpc.js, see 1). NOT ready for main.

START_CTX: low (fresh session, ~5%).

## FAIL list (for worker session_01UV1Szh9gWrn3DgqoTxQvpj)
1. FIXED BY REVIEWER (keep it): ĐIỀU / LUẬT / BÁO / KẾT QUẢ / ĐÊM / intel panels about a person collapse to a ~84-134 px strip at 755x1000 and 1366x1024 (figure clipped to a sliver, name cut). Cause: dev/build/jkpc.js kitPanelCompact (from main) treats them as "short content" because they have no .kdlgart. Fix on r1: `.kpsubj.kes` added to the "keeps the one big size" selector. popup-fullbody.js scored these OK (h=84) — test blind spot, see 3.
2. OPEN (worker): those same pop-ups (ĐIỀU, LUẬT, BÁO, KẾT QUẢ, ĐÊM, intel/evidence) have NO event picture. Owner template = LEFT full-body, RIGHT TOP event picture, info below, buttons bottom. After fix 1 they show the figure with a blank right side (text floating top-centre, figure bottom-left; see 755x1000 "info-person"). Needs a per-kind default banner (kitPersonBanner / .kdlgart) in the same frame, or an owner decision. Only events (VIỆC) and TIN have the picture.
3. OPEN (worker, tests): popup-fullbody.js must FAIL (a) person pop-up with no .kdlgart/.kdpban, (b) frame height < ~50% of the std frame / figure clipped (figure bottom outside panel), (c) different frame size across kinds in one viewport (std 560x700 vs 84/134/100 seen; coach steps 560x540 differ from pages 700 = accepted by coordinator). kit-conform.js: 14 MISSING cases at 755x1000 (place:*, contest, cold-palace) exit 0 — check they are not hiding a small-portrait form.
4. Tutorial page 1/2 first paint shows an empty figure column while the CDN figure measures (kitFigBody); OK after wait (7 s), same latent flake as report point 4. Not a FAIL, keep on list.

## What passed
- popup-fullbody.js: 755x1000 35 OK/1 WARN(shop, CDN)/0 FAIL; 1180x820 36 OK; 1366x1024 37 OK/2 WARN(CDN); 844x390 36 OK; 412x1058 skipped (Xoay ngang by design).
- kit-conform 755x1000: 85 CONFORMS, 0 MIXED/CUSTOM, no floats.
- All 25-28 PEND events: figure left, picture right top, buttons below, one size (560x700 @755, 560x574 @1180, 620x717 @1366, 560x358 @844). Tutorial pages 1-4 identical; spotlight steps + tip identical (shorter than pages, accepted).
- TIN panel good. Tutorial LỜI DẶN good at 755x1000, 844x390.
- Group panel Nhập cung (.kpsc faces row) out of scope per coordinator.
- Not run: coop-e2e (stopped at FAIL). Run it on the next round.

Shots (reviewer scratch): 755x1000 info-person / rule-person / notice-person show the collapse.
