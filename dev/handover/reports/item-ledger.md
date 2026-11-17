PRIORITY #1 CHECK ('item-ledger|ilSent'): OD 0 | ledger 0 | claims 8 | main 1 | review/* 2 → reuse review/item-ledger-r1 PASS 7aba5de9 (no rebuild).
# item-ledger SOLO landing (Foreman D #8 worker, opus) — review/item-ledger-solo
Branch review/item-ledger-solo @ac93910257223cc977f9e90ace0acd3562c95820 = item-ledger-r1 PASS 7aba5de9 + origin/main merged 3 times (7abaf07a, 64c39ca2 coop-thin A, 4719d424 batch-0415); origin/main is an ancestor.
Brief: dev/handover/briefs/D8-item-ledger-solo.md. Details: dev/PROGRESS_review-item-ledger-solo.md on the branch.
START_CTX ~5 % (1M window; get_session reads 0, own estimate). Finished at ~30 % (only push + report remained at the +25 % mark).

## What changed vs 7aba5de9
| Part | Before (7aba5de9) | After (solo) |
|---|---|---|
| co-op item transport | jil's own: runAct wrapper moved pieces out of her entry into res.items, ilRecv put them in her chest → doubled the live coop-b1b5 giftin path (2 deliveries) | REMOVED. jcoopworld.js = origin/main byte for byte (0 co-op code of main changed). The live path (res.items → her "Quà tặng" dialog, res.fam ops) is the only one |
| ledger in co-op | carried pieces | RECORDS only what the live path delivers: a piece of mine that now sits in her entry → "sang hảo hữu" (never also boxed: one gift = one item); a piece the live "rm" op took from my chest → "hảo hữu lấy / đốt / nộp" (COOP "res" listener after onRes), never netted; a piece taken as "lost" stays located in its Đồ thất lạc case. Census also runs at a new life (start / nlRun) |
| co-op "Trả lại quà" to the friend | pushed into her proxy entry (vanished at the next rebuild → net) | no live way back → Nội vụ phủ store ("kho", ownerless; resold later). Never lost |
| main's new removal sites (LUẬT SỬA CẢ NHÓM, ilscan.py 74 → 83 sites) | unrouted | jtwoway "Soát quà" poisoned gift → tang vật (as j28); jdress jewellery → conf (file not assembled today); jrd_cn "Bán trang sức đổi sâm" → sell (market, comes back); jweather worn-out weather gear = used up (ilDur, like charcoal/ice); jdemo (giáng phẩm / lãnh cung) shares S.il.box, its rows named "thu khi giáng phẩm"; jdh2 sắc phong book / seal boxes (x.dh) keep jdh2's own road (jil never resells / nets them, no fake week count). Remaining "unrouted?" = used up / slot moves / jdh2's own store / main's itClean of non-items (same as r1) |
| one core | branch's 2nd raise line typed "1 khắc · 1–2 tuần · Danh -10" (guard FAIL 3) | LO.raiseK / LO.hearW / LO.thief printed (guard PASS, 6667 ≤ 6691) |
| jvoice memory in S.vl (= veil slot) | fake veil crashed Tư trang, memory fell into her chest as a fake item | fixed here first; main fixed it the same way (it-key-guard S.vmem + itClean) → main's version kept |

## Tests (built site)
- item-ledger.js 13 scenarios × 755x1000, 1180x820, 1366x1024, 1000x755, 844x390: 0 page errors, play net 0 (only 404 = "/room" on the local test server). s10 planted=false = wdFrameItem picks another piece of the framer (same code as r1).
- coop-pets 46/46 (main 44/44; +2 new checks: A's ledger "sang hảo hữu", not in her box, net 0; B got exactly ONE hairpin = no double delivery).
- coop-e2e 60/60 (main 60/60), twice. coop-b1: same 6 Worker-timing FAILs as main (main 35/41) + new "no net" ledger checks ok on both seats.
- lost-items 755/1180: same results as the r1 build (higher-rank holder locked without the decree = solo law).
- ilbot (3 lives each): 516 w 3343/3345 located · 393 w 2396/2396 · 507 w 3456/3457; census net 0 in all; her sold 39→39, 23→23, 63→59 (4 sold in the last weeks). 1 renumbered twin id per ~3000 pieces = r1's known follow-up (piece still located).
- one-core-guard PASS. quickcheck PASS ×4 (old save loads + plays). Perf is noisy on this box (live alone 1068–1492 ms per buổi): medians new/live render 220/232 · buổi 1344/1424 (5 runs) and 211/220 · 1486/1143 (3 runs). Direct measure: jil (census, guards, week) costs ≈5 ms over 12 buổi.
- Fold 755x1000 + iPad 1180x820 shots LOOKED at: ransom dialog, tray, Tư trang › Việc "Đồ ở nơi khác" / "Tâu Hoàng thượng xin soát cung": no overlap, no overflow, feet not cut (CDN art needs a few s to load in the test).

## co-op transport parked at 7aba5de9, open faults (for Foreman B, coop-thin)
1. "Trả lại quà" to the friend has no live path back to her chest (now: Nội vụ phủ store, ownerless).
2. Ids: both seats number pieces (guest from 10 000 001); a gift copy keeps the giver's id → twin ids across seats (census renumbers, no loss).
3. The friend's proxy chest is rebuilt from her bag; a piece planted / given there exists in my world only until the rebuild — the live path must deliver it (it does for gift / plant / ret today).
4. Thin guest (jcoopthin withSeat, off today): when the host runs her turn, S.il (personal, in her S) must travel with her S; world NPC pieces stay host-only (jil already skips NPC nets in co-op).
5. A "lost" theft by the friend (laydo) leaves a case on her side and the piece in the thief's chest — both ledgers agree only by the case; no shared id yet.

## Main faults seen (not mine, not fixed — for the coordinator)
- §64 item tag missing on item dialogs on LIVE main (e.g. "Quà tặng", "Đồ cũ trở về"): kitFrameLive3 (kit-size-10, showModal wrapper) rebuilds the dialog body after jitev's ievPlace → tag gone (fb367740 build shows it, 64c39ca2/4719d424 do not). Kit keeper.

## QUESTIONS
none.
SẴN SÀNG KIỂM ac93910257223cc977f9e90ace0acd3562c95820
