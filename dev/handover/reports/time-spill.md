# time-spill sweep — report (worker, session_01UV1Szj4yZNwkozR5fw5yAp)

Branch: review/time-spill (rebuilt from origin/main b53ba8b9; the old review/time-spill b656c416 was merged in session 8).
Owner rule: OD L852 + L886 + 16/11 ~21:42Z (Chung Tú cung, 1 khắc left, Bái kiến 2 khắc → "không kịp trong buổi chiều").
Root cause: j76 (merged) made deck acts and the kit Cần chip read the whole DAY, but every walk-in act in j77/jclose
(greeting, ask, sneak, eunuch lead, 'Đến gặp') still gated on `j77Kh(n)` = walkOk = `used+n<=4` (this buổi only) and said
`j77Bound` = "không kịp trong <buổi>". A few other spots did the same (j55 Quốc sự, j42 servant walk) or cut a cost to what
was left (jmen, jtsb), and co-op switched walk spill off.

## Fix (one rule, in the time core)
- j76: `dayFit(n)` / `dayWhy(n)` = the ONE day-time gate (fits this buổi, or spills via j76spills; words = j76need, same as the
  kit Cần chip). `spend()` now also carries khắc spent at exactly 4 used (walk-then-bow).
- j77Bound now returns dayWhy (only "hết khắc trong ngày …"). `j77In(k)`: go in now or walk on into the next buổi keeping the pass.
- j9 walkSpill/walkSpillGo take `{pass, pre}`; pass is granted again on arrival; co-op allowed (tick waits for the room's turn).

## Before / after (every gate found; scan = dev/test/time-spill-guard.js)
| # | where | gate before | after |
|---|---|---|---|
| 1 | jclose cbGreetCard/Go — Bái kiến while inside (OWNER CASE) | j77Kh(khac) → "Bái kiến: không kịp trong buổi chiều" | dayFit; bow spills (carry); counts for next buổi too (S.acGreetNx) |
| 2 | j77 accEtqCard/accEtqGo — "Bái kiến … rồi vào" at the gate | j77Kh(tc+khac) | dayFit; walk in, bow spills; walk too long → "Đi (đến nơi vào buổi sau)", greet on arrival |
| 3 | j77 accState askOk — Xin bái kiến / yết kiến | j77Kh(tc+1) | dayFit(tc+1); accepted → j77In (pass holds next buổi) |
| 4 | j77 accState sneakOk + accSneak — Lẻn vào | j77Kh(tc+1) | dayFit(tc+1); success → j77In; caught → walk cost spills |
| 5 | j77 accLead — Nhờ thái giám dẫn vào (off by ACC_ETQ.lead, fixed anyway) | j77Kh(tc+1) | dayFit(tc+1) + j77In |
| 6 | j77 seeBtn/goSee — Đến gặp | bound: "không kịp gặp nàng trong <buổi>" | walk spill like 'Đến cung nàng thăm'; kit chip "đi N khắc (đến nơi buổi X)" |
| 7 | j77 accGuestWhy fallback | "không kịp đến trong <buổi>" | dayWhy |
| 8 | j77WalkWhy co-op | "không kịp đến trong <buổi>" (co-op had no walk spill) | removed; co-op walks spill |
| 9 | j9 walkSpill (co-op) | returned null in co-op | same rule as solo; walkSpillTick waits for the room |
| 10 | j41 goTo gate card text | j77Bound(tc+2) (price differed from j77's tc+1) | j77Bound(tc+1) (one price) |
| 11 | j55 Quốc sự ×2 | used+2>4 → "hết khắc" | !can(2) → whyTime(2) (day-aware) |
| 12 | j42 servant walk (srvGoTo) | !walkOk → toast "đi N khắc, còn M" | dayFit → walk, rest carried; else dayWhy |
| 13 | jmen menKh | cost cut to khắc left | j76spills → full cost spills |
| 14 | jtsb Thái hậu option | spend(min(2,left)) | tsbKh(2) (spills) |
| 15 | j76 spend() | carry only when used<4 before | also when used==4 before (walk then bow) |

Kept (real limits, by the rule's own words):
- buổi tối never runs past the night (j76spills, walkSpill, dayWhy "hết khắc trong ngày") — OD L852 (a).
- "Chỉ buổi …" deck cards (a.b) and the sáng-only Thái hậu lesson (j76 __j76win): "không kịp xong trong buổi …" — tied to their buổi (L852 (b)).
- jrest "Uống thuốc bổ, ngủ sớm" (buổi tối only, needs BAL.restDsMinK left): night end.
- A place closed in the arrival buổi (walkSpill access check): red with the reason (L852 (b)).

Not gates (narrative text, checked and left): j67:824/973, j68f:73, j71:193, j72:547, j95:390, jreign:121, jroute:166, jts:93.
All j76 "không kịp xong" lines are the window-bound cases above.

## Guard (cannot come back)
- dev/test/time-spill-guard.js `<site root>`: (1) static scan of every live module (assemble.py) for buổi-only gates
  (used+N<=4 / >4, Math.min(N,4-used), "không kịp … trong ${…}", j77Kh(a+b)); allowed occurrences listed with reasons;
  (2) runtime: chiều / 1 khắc left — owner case (greet inside, cost 2), gate greeting, ask/sneak on every place card (sáng + chiều),
  person cards, every deck card, can(2), tối refusal words, co-op walkSpill == solo. ~5 s.
- Wired into dev/tools/quickcheck.sh step 1b (FAIL = not live).
- On origin/main it FAILs: static 5 families + runtime 34 bad (e.g. "Lẻn vào: không kịp trong buổi chiều (cần 2 khắc)" on A ca sở,
  Thượng thư phòng, Tân Giả khố, Đông cung; co-op walkSpill null). On this branch: PASS (static + 46 runtime checks).

## Tests
- time-spill-guard: PASS. walk-spill.js: spill PASS, closed PASS, night FAIL — same FAIL on origin/main (test's night tap opens no card in the current UI; pre-existing, not from this branch).
- dudo-lock.js: page errors 0.
- coop-e2e.js: 59/59. COOP_SPILL=2 (new: co-op walk spill): all 24 walk-spill steps ok (her buổi ends on the road, arrives in the new buổi with the rest paid); 81/83 — the 2 FAILs are the B-leaves/frozen step (live Worker timing), which passed in the plain 59/59 run on the same code.
- build_site.sh + quickcheck.sh 98526684: QUICKCHECK PASS (time-spill guard PASS, old save ok, perf render 354/269 ms within gate).

SẴN SÀNG KIỂM 985266845749b18036d0005beb6da701c8582db3 (review/time-spill)

## Co-op
One rule for both seats: dayFit/j76spills/walkSpill have no co-op switch now; a spill ends her buổi (bend) and the rest is paid
when the room turns (j76 carry / walkSpillTick). Time is per seat; the shared world (NPC places) stays host-computed.

## Kit keeper note
Option lists touched (time is no grey reason): place card j77Card (Xin bái kiến/yết kiến, Lẻn vào, Nhờ thái giám, Đi (đến nơi vào buổi sau)),
gate greeting card accEtqCard (Bái kiến … rồi vào / Đi (đến nơi vào buổi sau) / Vào thẳng), in-place greeting cbGreetCard,
person buttons visitBtn/seeBtn (kit Cần chip data-kneed), j55 Quốc sự buttons. No new UI part.

## Follow-up (reviewer r1: seed the guard, flake 2/56) — review/time-spill-seed a6a61b2e (on review/time-spill-r1 27fa7955)
- Seeded RNG for the life and every roll (env SEED, default 7), like coop-one-world.js; `SEED=n node dev/test/time-spill-guard.js <root>` replays.
- Root cause found with seeds 31/33/35: start() picked a random origin; a MAID life (isSrv) has no consort gate greeting, so goTo did
  nothing ("place home, carry 0"). Guard now starts a consort life (__forceOrigin 'thd', as walk-spill.js). Seed 3: a random event card
  blocked nextBuoi after the in-palace greeting → cards cleared first. Gate-greeting row prints the blocking state.
- 100/100 seeds PASS; default seed 10/10 PASS. Test-only change (no game code, no build change).
SẴN SÀNG KIỂM a6a61b2eaf799afcef9e04871621df6ba8547a02 (review/time-spill-seed)
