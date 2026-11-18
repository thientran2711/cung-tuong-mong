# review/memories — D26 idea builds #1 Kỷ niệm + #3 hook ledger (Foreman C worker)

Branch `review/memories` @ **bfe85a88** (from origin/main a363cc14). Details + API: `dev/PROGRESS_memories.md` on the branch.

## Built
- `dev/build/jmem.js` (last module). **Memories**: per-pair records (≤5) in personal `S.mem` (co-op safe, old saves load empty), 34 cổ-trang deed templates,
  written by existing acts: runAct schemes both ways incl. NPC↔NPC (only when caught / accuse / proof / thiện cảm drop — secret acts write nothing), Kết giao,
  gifts (giveTo), Hoàng hậu powers (empAct), talk options, nợ-ân quests (q72End), big relation swings inside an event (generic, named after the event).
  Monthly fade (BAL.mem.fadeMo) with a keep floor for betrayal/poison/rescue; repeats reinforce. Recall: the person quotes it on the talk result (once a month)
  and on the card; ±10 modifier on talk/Kết giao odds and on NPC hostility; talk option "Nhắc lại ân xưa" spends a good memory → she is owed one ân in the
  existing j72 ledger (non-bạc road). Strong memories write a Sổ ghi line → Tuần lục.
- **Hook ledger** ("Ân oán chưa dứt"): documented API `hookAdd / hookQuery / hookPick / hookResolve / hookUse / hookTick / hookText`. Mirrors (no copies):
  her proof (v.ev), NPC proof on her (v.evm.me), j72 nợ ân (favour/debt), accepted j72 quests (promise with due). Own store for secret (auto from the notes
  that record an affair / a false pregnancy), promise, vow, threat, favour, debt. Monthly tick: lapsed / promise past due = broken (+memory) / strong secret fades.
  Use: rival talk option "Lấy chuyện riêng ép nàng" (odds ladder; side chances chanceW).
- Shown with kit parts only: person card (jpcf) blocks "Kỷ niệm" and "Ân oán chưa dứt" = `kitRows` + `.kpnote` (added `PCF_X` extension list in jpcf).
- Numbers: `BAL.mem`, `BAL.hook` at the end of jbal2.js.

## Tests
`node dev/test/memories.js <url> <out> 755x1000@1,1180x820@1` → **ALL OK** both sizes: 31 checks (add, cap, reinforce, runAct two-way, log line, recall line,
modifiers, invoke → nợ ân, fade/once-a-month/keep floor/gone, hook add/resolve kept/due broken/secret from note/press option/use strong+weak/mirror+resolve/pick/
lapsed, old save without fields, save/load round trip), card blocks present, no h-overflow, no page errors. Shots looked at (card + memory block, both sizes).
Note: serve dev/ with a UTF-8 charset header (plain http.server breaks every build: "Invalid or unexpected token").

## Skipped (marked in PROGRESS)
Memory invoke inside hard events (API ready: memTop/memLine); buy-back/steal proof; a whole-palace ledger page; dedicated Tuần lục page; toilGrudge wiring
(review/toil-react-r1 not on main — it can call memAdd when it lands); NPC↔NPC memories only from runAct.

## KIT REQUEST
None needed for what was built (kitRows + .kpnote). Only if a whole-palace ledger list is wanted later: a list view (kitIntel could carry it).

## Owner questions
1. Should "Nhắc lại ân xưa" also appear as an option inside hard events (instead of paying bạc)? Needs per-event wiring.
2. Is "Ân oán chưa dứt" the right name for the ledger block (design file said "Nắm thóp", which only covers what she holds)?

SẴN SÀNG KIỂM
