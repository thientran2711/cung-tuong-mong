# PROGRESS review/item-ledger-solo (Foreman D #8 worker, opus) — 17/11
Base: review/item-ledger-r1 PASS 7aba5de9 + origin/main 7abaf07a merged. Brief: dev/handover/briefs/D8-item-ledger-solo.md (handover branch).
Report: dev/handover/reports/item-ledger.md (handover branch).

## Done
- Merge: jcoopworld.js = origin/main byte for byte (no co-op code of main changed). Conflicts j8 / jbal2 / jtoilr / assemble resolved (main's text + jil route).
- jil co-op transport REMOVED (ilRecv / ilGot / res.items of the branch). The live path (coop-b1b5 res.items → giftin, res.fam) is the only one.
  jil only RECORDS it: ilToFriend/ilSent (a piece of mine now in her entry → log "sang hảo hữu", never boxed), runAct wrapper (co-op, my acts on
  her entry), ilCoopRes (COOP "res" listener after onRes: res.fam rm → "hảo hữu lấy / đốt / nộp", not netted). Census at a new life (start / nlRun).
- Co-op "Trả lại quà" to the friend: no live way back → Nội vụ phủ store ("kho", ownerless), never lost (open fault for coop-thin).
- Main's new removal sites routed: jtwoway "check" (poisoned gift → tang vật, as j28), jdress dropJ (→ conf; file not assembled today).
- jdh2 (sắc phong book / seal, main): x.dh boxes keep jdh2's own road (jil never resells / nets them; Việc row shows no fake week count).
- Live main bug fixed (item conservation family): jvoice kept its line memory in S.vl = the worn VEIL slot → with no veil Tư trang crashed
  (vlInvHTML IT[undefined]) and "taking the veil off" put the memory in her chest as a fake item. Memory → S.vom; old saves cleaned (vomFix).
- One-core: jlost raise line numbers from LO (raiseK, hearW, thief) — guard PASS (6667 ≤ 6691).
- jil endTurn hook: render() then showModal() (the §64 tag is placed by showModal).

## Tests (all on the built site)
item-ledger.js 13 scenarios × 755x1000 / 1180x820 / 1366x1024 / 1000x755 / 844x390: 0 errors, net 0 (s10 planted=false = wdFrameItem picks
another piece; same as r1). lost-items 755/1180: same as r1 build. coop-e2e 60/60 (main 60/60). coop-pets 46/46 incl. new "one gift = one item"
checks. coop-b1: same 6 Worker-timing FAILs as main (35/41 main) + new ledger checks ok. ilbot 2 runs × 3 lives (516 / 393 weeks): census net 0,
3343/3345 + 2396/2396 located, her sold 39→39 / 23→23 back. quickcheck PASS (perf noisy: jil+vomFix cost measured ≈5 ms over 12 buổi).
