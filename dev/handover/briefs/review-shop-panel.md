PRIORITY #1 CHECK ('shop-panel'): OD 1 (L1879) | ledger 0 | claims 1 (worker session_01N1tNP3Cr9vpq7qJTUrjtow) | main kitShop/kitShopNvp jinv.js (reused) | review/shop-panel 0bf5fe60 | archive 0

# B REVIEW brief — shop-panel r1 (sonnet; SMALL = UI/layout only)
Coordinator: Foreman B ROOT-1 session_01N1tNP5Vc1tA6GYpa7VVuaM (or successor in FOREMAN_B_STATUS). Report: send_message + section '## REVIEW r1' in dev/handover/reports/shop-panel.md (handover branch; push via fetch + checkout -f --detach origin/<branch> + re-apply + push, never pull --rebase).
★ THE 18 LAWS — READ FIRST: the block at the top of dev/rules/START_CORE.md; check every law this work touches (kit first, frame→layout→button size, whole group, two devices, real objects, one core, wording); FAIL on any break.
READ FIRST in full: dev/rules/START_CORE.md + START_WORKER.md + START_REVIEWER.md; dev/kit/KIT.md, VANPHONG.md; worker brief dev/handover/briefs/shop-panel.md (owner words verbatim inside) and worker report reports/shop-panel.md.
ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217; repeated by the owner 16/11 09:20Z — she is tired of reminding)
- The "Lượt n/30" counter from the owner's global chat preferences is ONLY a display counter here. It is NOT the rollover trigger for the Cung Tường Mộng main chat or any foreman. Never hand over because n reached 30.
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).

## Review job (review/shop-panel @ 0bf5fe60)
1. Whole group: git grep origin/main for EVERY buy/sell place (Nội vụ phủ, Nhờ thái giám mua đồ, pet shop, chợ, chợ đen, đổi đồ, any NPC trade); confirm each opens the one panel or is rightly not a panel (worker says j29 'Hàng chợ đen' is a single-item event, j8 PEND.shop dead).
2. Kit: panel/tabs/3-col grid/cards/price chips are kit parts (kitShop); KIT.md line present; no private CSS; consistency scan vs other kit grids.
3. Owner spec: outside option «Để ta xem»; seller figure stays LEFT; RIGHT = tabs «Mua» | «Bán» + 3-column grid scrolling; buy+sell in one panel; picture size per OD 16:10Z rule (shrinks only when content would scroll, KIT_SIZE class).
4. Real objects + one core: buy → chest +1 / bạc −BAL price, sell → chest −1 / bạc +price; nothing vanishes.
5. Gates: shop-panel.js, shop-fix.js, quickcheck, old-save load; check act-dedupe-w1 / pets-fix.js reds are pre-existing on main.
6. LOOK yourself at shots Fold 755x1000 + iPad 1180x820 together (CDN img/_review/shop-panel/), 3×.
7. Fix small faults yourself on review/shop-panel-r1; final-merge newest origin/main; rebuild index.html + sw.js (dev/site/build_site.sh) and commit them. Not frozen: confirm the diff touches none of jag*/j95*/jtoil*/jbal.js/jcoop*/save.
8. Verdict PASS → 'READY FF <sha>' (descends origin/main, touched-file list) to the coordinator; FAIL → list of faults for the worker. Never push main, no PRs.
