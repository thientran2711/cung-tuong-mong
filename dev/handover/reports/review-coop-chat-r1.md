PASS 24578406f31621373e65bded2d37a102a456f05a

# review/coop-chat-r1 (reviewer, 16/11)
Branch review/coop-chat-r1 @ 24578406f31621373e65bded2d37a102a456f05a — origin/main 5e5c4128 is an ancestor (fast-forwardable). Source: review/coop-chat bdd2b6b5.

## What was wrong / what -r1 did
1. The branch predated the rail: it drew its own floating button (#kchat, `kitChatBtn`, own CSS) with the rail only as a half-way hook. FIXED: the chat icon is now ONLY a kitStageRail entry (`add({id:"chat",order:20,icon:"img/kit/ico-chat.webp",title:"Thư từ",when,badge,onTap})`); own button, own CSS, `kitChatBtn` and the fallback were deleted. Rail shows Lịch · Chat · Mục tiêu in one column; solo has no Chat icon; leaving co-op removes it.
2. KIT number: §76 on main is palace-map → chat renumbered to **§80** (KIT.md, KIT_NUMBERS.md, sample id, comments). Registry rows 77/78 kept; 79 marked reserved.
3. Own-message bubble class `.kcm.me` collided with the global `.me` / `.me b` header CSS (j79) and blew the bubble up → renamed `.kcm.mine` (screenshots before/after seen).
4. Arrival glow (kitFxLight glow-gold, scale 1.5) covered the rail icons → smaller (scale .8, opacity .45). Gọn/reduced motion/bots: only the rail's kit dot.
5. Conflicts with main resolved (assemble.py list: jcoopchat after jcooptimer; KIT.md; KIT_NUMBERS.md; generated files rebuilt with assemble.py + build_site.sh).
6. dev/test/coop-chat.js re-pointed at the rail button and made to pass the new Luân hồi / identity-card steps; `--disable-web-security` only when the Worker URL is local.

## Results
- coop-e2e: **59/59** (also re-run on the final merge).
- coop-chat (2 browsers, text-only): **47/47** at 755x1000@2 + 1000x755@1 earlier run and 686x880@2.2 + 1180x820@2 (clean). Re-runs at other pairs gave 46/47: the only miss is the test's early "both in the shared world" wait (roulette timing, flaky harness; the later world check passes and every chat check passes).
- Worker server test coop/worker/test/chat.test.mjs: ALL OK (against a local `wrangler dev`).
- stage-rail.js: PASS at 1180x820, 755x1000, 844x390, 1000x755 (one earlier run flagged "goal over a face" once; two re-runs PASS — figure placement, not chat).
- panel-size.js 755x1000 / 1180x820: no chat frame in the family; only pre-existing btnOut PEND:plantpick at 1180x820 (not from this branch).
- Screenshots looked at: rail column (Lịch, Chat, Mục tiêu+dot) at 755x1000 and 1180x820, chat frame with 2 lines (own right/cream-gold, friend left), unread dot, shake, history after rejoin, frame at 844x390 and 1000x755 (list scrolls inside, input + Gửi visible, no overflow), 390x844 = rotate prompt, no Chat in solo.
- No page errors. Old saves: no save fields added. Text is escaped plain text (HTML shown literally). Only text state is sent (`{t:"chat",text,nm,g}`), never graphics; Worker keeps 300 chars / 50 lines, 350 ms gap.
- Icon `img/kit/ico-chat.webp` is on the CDN (200, 7950 B).

## MUST DO BEFORE PLAYERS SEE IT (coordinator)
- **Deploy the Worker** (coop/worker, `wrangler deploy`): the LIVE Worker has no chat (fresh room has no `chat` array; coop/worker/test/chat.test.mjs fails against the live URL). Without it the icon is there but messages never arrive. I did not deploy.
- After the fast-forward re-run `node coop/worker/test/chat.test.mjs` against the live URL.

## Notes
- The rail shows on every stage (not only her room), so Chat is reachable everywhere in co-op; arrival away from a rail stage still falls back to kitLine "Có thư từ hảo hữu".
- ~100% xong / ~95% chơi được (after Worker deploy).
