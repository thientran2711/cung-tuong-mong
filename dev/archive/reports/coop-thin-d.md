# coop-thin D — REMOTE DIALOGS (cards) built on the host — SẴN SÀNG KIỂM 099ce05b

PRIORITY #1 CHECK ('remote dialog|serialized card|do pick|nbribe'): OD 1 (17/11 ~01:40Z wave plan) | ledger 0 | claims 0 | main 2 (jcoopworld.js P2H.nbribe / ctm-p2 relays = the old path this part replaces) | review/* 0 (no part D branch existed; part A contract on main 64c39ca2).

Worker session_01N1tNP2zKazQevGeQbxzSnq (opus), coordinator Foreman B s9 (session_01N1tNP35FF3tYRLkr6a7v7Y). Branch **review/coop-thin-d** from main 4719d424, merged with main 6c4f21c3.
Spec: reports/coop-thin-guest-audit.md §3 row D + contract reports/coop-thin-a.md C1–C6 + review-coop-thin-a-r1 §3. START_CTX ≈ 4 % (1M window).
**No player-visible change while the room level is 0 (production). Worker unchanged** (uses part A's snap/delta/do only).

## What (one path)
- **jcoopthin.js §6 (engine, TH.D)**: a card for a seat is built INSIDE `withSeat(seat)` (her context, "ngươi" = her). Whatever her context
  queues in her Q becomes a SERIALIZED card in her stored person `S.thq` (serQ form `{pid,pp,t}` / note `{t,h,cls,btn,w}` + id + `v` = text and
  options rendered in her context, no functions). It travels in the host view as `P.<seat>.thq` → the Worker's stored snapshot → **survives
  reconnect / reload**; the host also keeps thq + pending patches in localStorage per room (a host reload).
  Guest: `thinview` → a stand-in entry `{thin:id}` in her Q, shown by the normal kit dialog (showModal, KIT FIRST: no new UI part); her tap →
  `do pick {card,i}` (her chooseM / closeModal / serQ wrapped only for `thin` entries; fx never applied on her phone).
  Host `onDo("pick")`: rebuilds the card from its pid IN HER CONTEXT (closures are never stored → the "closure captured the host's person"
  risk is removed by construction) and runs the option exactly as chooseM (fx, go, logChoice), **once** (the card leaves thq; a 2nd pick = `gone`).
- **Her person** still lives on her phone until part G, so what the host's run did to her stored S goes back as a **patch** (diff of her stored S
  before/after: numbers as deltas, other values set, arrays by element add/remove or by id) in the view `pq`; she applies each n once (`S.thpn`)
  and acks `do pack`; the host's week end waits for the ack exactly like the old res ack (CW.rpend); a seat that already sent its end re-sends it (CW.reEnd).
- withSeat (one place, gated by dOn): takeQ at exit, patch out, `D.after` = the host's own side after her context closes, `D.later` = enter her
  context from the top of the event loop (contract C3: never inside an engine call), bridge extended: items her turn put in the host's entry →
  the host's own "Quà tặng" card. UI no-op list extended (C3): kitLine, sfx, kitSfx, kitStatFx/Glow/Delta, kitEdict, kitGloom, kitReward.
- **Moved cards** (jcoopworld.js, new PEND kinds `thInv`, `thBribe`; existing `cnvBribe`, `giftin` reused):
  invite Kết giao / Tặng quà both ways (host→her: her card; her→host: `do inv`, his card, her act then runs in her context) · Mua chuộc both ways
  (`do bribe`; the buyer's result runs in the buyer's context) · nbribe (NPC buys her: j42 card built in her context) · ev (tai mắt proof to the
  holder: D.after / D.later / `do ev`) · heir card "Lập Thái tử" (+ the j1 setHeir Danh, printed number) built the month it happens · res notes
  (host's act on her and the host world / festival / contest result via b4Send → resApply in her context; **death / lãnh cung stay on the old
  res path** = part B/G: her life).
- jkiep.js: `kpGate(i)` split out of its chooseM wrapper (same behaviour) so the "Kiếp này chưa trọn" warning is asked on HER phone before the
  pick; the host runs her pick with `__kpNoWarn` (found by the test: the warning card hijacked the Mua chuộc pick on the host).
- **Gate** `TH.dOn()` = `on(4)` OR (`on(1)` + test-only `localStorage ctm-thin-part-4=1`, both seats) — contract C1, B not on main. **TH.CAP stays 1**
  (C1: the last merged of B/D sets CAP=4). Old relays (act invite / actr, ctm-p2 bribe/briber/nbribe/ev, guest hrWeek card) run only while dOn is off.

## OLD PATH — deletion (needs Foreman B's call)
The brief says DELETE the old relays. Contract C1: "new path behind on(n) until PASS, then the old branch goes", and production rooms stay at
level 0 until the owner turns thin on for players. Deleting now = co-op at level 0 (all live rooms) loses invites / Mua chuộc / heir card.
So on this branch the old code is still there but gated `!dOn()`; the exact blocks to delete at go-live: jcoopworld onAct invite card +
onActr/actr (invite part), runAct ASK `COOP.send({t:"act",mode:"invite"})`, P2H.bribe/briber/nbribe/ev + p2say calls for them, CW.hrWeek card branch,
sendRes/b4Send `COOP.send(msg)` for non-death res. One commit when the level goes on for players (or now, if B says level-0 co-op may lose them).

## Tests (final 099ce05b)
- **coop-thin-d.js (new, local wrangler Worker with part A, level 1 + part-4 flag)**: **44/44** host Fold 686x880 + guest iPad 1180x820; **44/44 swapped**
  (iPad hosts). Covers: each moved card with guest AND host as receiver (invite ally/gift both ways, bribe, nbribe, heir, host-world item →
  her chest), card serialized with no closure and in her perspective, effect lands on HER live person (Thân sơ / Bạc / spyFor / Danh / chest)
  and the host's side on his (bridge Thân sơ, his Bạc − and Mua chuộc result, NPC paid in the host world), reload while a card is open
  (card back from the stored snapshot) + double pick → applied once, no old relay on the wire (0/0), selfTest round trip exact, D.bad empty, no page errors.
- coop-e2e LIVE Worker (flag off): **60/60**, swapped **60/60** (old save, solo, rebirth, leave/return).
- coop-thin-a.js flag off LIVE **19/19**; level 1 local **24/24**; swapped level 1 local 24/24 in 4 of 6 runs — the 2 fails (host not the friend
  entry in context b) are **pre-existing on main 4719d424**: same test on a main build failed 2/3 with host origin "cnv" (a cung-nữ host); D code is inert there (no part flag).
- coop-p2 (old relays, flag off): **45/45**. coop-one-world: **PASS**. one-core-guard: **0 fails** (no --allow-grow).
- quickcheck: **PASS** (old save ok; perf new/live render 228/219, tab 326/325, buổi 888/896 ms; core gates PASS); site rebuilt.
- Shots: none in git; test shots (SHOTS=dir) kept in scratch only.

## Guest tripwire (TRIP=1 coop-bot 4 weeks, local Worker, THIN=1 THINPART=4; corrected by FIX D r1 from the r1 reviewer's 4/4-week runs)
Only runs that played all 4 weeks are compared (the first table mixed 2/4 and 3/4-week main runs, which skewed the per-run total).
| build | run | weeks | D STATE | D·patch |
|---|---|---|---|---|
| main 6c4f21c3 (D off) | 1 | 4/4 | 2 872 | – |
| main 6c4f21c3 (D off) | 2 | 4/4 | 2 794 | – |
| review/coop-thin-d 099ce05b | 1 | 4/4 | 2 194 | 29 |
| review/coop-thin-d 099ce05b | 2 | 4/4 | 2 166 | 370 |
D STATE **≈ −23 %** (2 872 / 2 794 → 2 194 / 2 166); ≈ −16 % when the D·patch writes (the host's results copied onto her person until G)
are counted. Not "≈1 740 → ≈880" as first written (that came from the stalled main runs).
Most remaining "D" writes are HER OWN dialogs (chooseM of her own events: her week still runs on her phone) — they move with E/F/G.
Note: the main build stalled before week 4 in both level-1 runs (not investigated; outside D).

## Trial merge with review/coop-thin-b
review/coop-thin-b does **not exist** on origin at 099ce05b time (ls-remote empty) → no trial merge possible; B's reviewer must trial-merge D.
Overlap to expect: jcoopthin.js withSeat finally block (D adds takeQ / patch / afterRun / bridgeItems there) and the UI no-op list (C3 says B adds
it; D already added it — B should extend the same list, not a second one). B's host-side rebirth must call `TH.seatDrop` as before; D keeps her
thq across a drop via localStorage. D drops the stored seat at each merged week ONLY while `!TH.on(2)` (B absent).

## Risks / open (each: likelihood · severity · how seen / fixed)
- Patch onto a stale stored person (her stored S = week base until B/G): numbers go as deltas so the result is right; a non-number set by a card
  overwrites her live value of that one field (e.g. S.srv.spyFor) — that IS the card's effect · rare · small · test checks the live value.
- Her invite gives an item bought this week: handled (copied into her stored chest first, D.rebase) · covered by the code, not by the test.
- Death / lãnh cung from a res: old path (B/G) · by design.
- A choice gated by another chooseM wrapper that queues its own card with handlers on the host → lands in D.bad (test asserts empty for all moved cards).

## Rollover
Not needed for the work; context ≈ ≈28 % of 1M at report time.
