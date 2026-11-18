PRIORITY #1 CHECK ('item-ledger|ilSent'): OD 0 | ledger 0 | claims 8 | main 1 | review/* 3 → reviewed the existing branch review/item-ledger-solo @ac939102, no rebuild.
# review item-ledger-solo r1 (Foreman D #8 reviewer, opus) — 17/11
START_CTX ~3 % (1M window; get_session reads 0, own estimate). Finished well under the +25 % mark.
Branch review/item-ledger-solo-r1 @be8dd7a1e966c05572f8824029405ae6fa14a7da = review/item-ledger-solo ac939102 + 1 reviewer fix. LIVE origin/main 4719d424 (unchanged at verdict time) is an ancestor → fast-forward possible. Nothing to merge: the worker branch already holds 4719d424.

## Owner words checked (OD 16/11 13:30Z (3) + 13:40Z items part, read verbatim)
| Owner line | Verdict |
|---|---|
| every item, even lost, stays somewhere in the game and can come back; never vanishes | YES: ilbot 2 lives × 200 weeks (398 weeks): 2765 pieces seen = 2765 located, missing 0, census net 0, page errors 0. Static scan ilscan.py: 83 removal sites (incl. main's new jtwoway / jrd_cn / jweather / jdemo / jdh2); 34 "unrouted?" all read by me = used up (medicine, tea, ice, poison, kim bạc, food past date, cloth sewn, evidence handed in, story items via jitev), slot moves (wear / take off robe → chest, veil → chest, pawn slot), jdemo/jdh2 own box roads |
| lost / stolen piece sits in SOMEONE's chest; found by searching | YES: item-ledger s4 (ngự tứ lost → case), s7 (robbed robe → plotter's chest), s10 (giá họa piece back to the framer) |
| higher-rank room: only by reporting to the Emperor with REAL evidence | YES: loHigh + loEmpEv (case evidence + evidence on the holder) ≥ BAL.il.empEv; act card "Tâu Hoàng thượng xin soát cung" (s5 lock/open). Note: lost-items.js s2 / s6 on this branch now stop at the lock (main: back to her) because the holder is higher rank and the test gives no evidence → behaviour = the owner's law, the test text is old (follow-up below, not FAIL) |
| sold items come back (weekly shop chance, ransom visit, ceiling, unpaid → later) | YES: s1 tray tile "Đồ cũ của ta" → buy back; s2 ransom "Chuộc về" / "chưa đủ bạc, hẹn lần sau"; ret 6 / 8 weeks ∈ BAL.il.retW [6,12]; bot: her sold 14 → 14 back (10 tray, 4 ransom), max 15 weeks; NPC sold 7: 4 back to owner, 2 bought by another, 1 still in the market |
| ONE ledger: every item of every person recorded | YES: S.il.log + census ids + ilAudit (s8 / s12 old saves get ids, net 0) |
| numbers from BAL | YES after reviewer fix (see below); one-core-guard PASS (6662 ≤ 6691) |

## Co-op (owner 17/11 02:05Z: no co-op patching)
- jcoopworld.js and every jcoop* file = origin/main byte for byte (git diff origin/main..HEAD lists none). jil only RECORDS: a pass-through runAct wrapper (logs "sang hảo hữu") + a COOP "res" listener (logs, no state change). Accepted as record-only.
- coop-e2e 60/60 (= main). coop-pets 50/50 incl. "A ledger: gift logged sang hảo hữu, not in her box, no net" and "B: exactly one hairpin arrived" → one gift = one item.
- The 5 parked co-op faults in reports/item-ledger.md stay for Foreman B (coop-thin); not ours.

## Gates
- quickcheck.sh PASS on be8dd7a1 (build holds its own build, core gates, time-spill, old LIVE save loads + plays a buổi). Perf 7-run median new/live: render 206/200 ms (+3 %), buổi 919/1233 ms, tab 295/266 ms (within perfgate); 3-run on the final sha: render 206/194, buổi 783/1453 (box noise; jil does not touch render()).
- item-ledger.js 13 scenarios at 755x1000 + 1180x820: 0 page errors, play net 0, modal fits, no overflow (s10 planted=false = known r1 behaviour, piece still back to the framer).
- lost-items.js 755 + 1180: 0 page errors (s2 / s6 see above).
- Shots LOOKED at (scratch, not in git, not on CDN): Fold 755x1000 "Đồ cũ trở về" ransom dialog (§64 frame + item tag + figure feet visible, act cards kit), iPad 1180x820 Tư trang › Việc "Đồ ở nơi khác" rows = same kwdsel + kitChip + kitFacts + loPic as "Đồ thất lạc"; no overlap, no overflow. Kit only, no private CSS; wording cổ trang, no %, numbers printed from BAL (e.g. "Còn 8 tuần mới xin lại được" = BAL.il.confW). KIT REQUEST: none.

## Reviewer fix (small, on review/item-ledger-solo-r1)
- be8dd7a1 jlost loKeepHear: the NPC-holder verdict still typed "Danh -10, Sủng -5" while her own line printed LO.thief → both print LO.thief now (ONE CORE, same family). Site rebuilt.

## FOR MAIN (kit keeper) — confirmed, not this branch
- §64 item tag missing on item dialogs on LIVE main 4719d424: a "Quà tặng" (giftin) dialog never gets the .kiev tag (MutationObserver: never placed), while the fb367740 build shows it (IEV_PID.giftin present in both). Same on this branch (it carries main's code). Kit-size-10 kitFrameLive3 / showModal wrapper is the suspect named by the worker. Note: the jil ransom dialog ("Đồ cũ trở về") does show its tag.

## Follow-ups (not FAIL)
- dev/test/lost-items.js s2 / s6: give the case BAL.il.empEv evidence (or a lower-rank holder) so the test checks the decree road instead of stopping at the lock.
- one-core baseline can be shrunk (6691 → 6662) by the coordinator with --update.

PASS be8dd7a1e966c05572f8824029405ae6fa14a7da
