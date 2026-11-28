# COOP-REBIRTH-RESYNC + co-op «Ban hoa» b1 every kiếp — B FIXER session_01N1tNP4AAwyivs8RtLx14fV (Foreman B ROOT 3)
PRIORITY #1 CHECK ('seatresync|coop-rebirth|rebirth-resync'): OD 0 | ledger 0 | claims 8 | main 5 (jcoopworld.js seatresync) | review/* 3 (coop-rebirth-stuck r6/r7 = Foreman D's host «Sẵn sàng» heal, other family) | archive 0. ('ban hoa'): OD 19 | ledger 0 | claims 8 | main 15 | review/* 0. Same-family check: COOP-QCARD r2 9f0bd3ed (held result card under a kit scene, z order) and coop-dayq-noclock c32160d8 (kmFree hold on the «Phối đồ» board) are OTHER families (no overlap with seat copies / begin / sendMe). RV-163J flake verdict on «same world» = consistent with (B) below.
KIT CHECK: no UI touched (no new or changed part; no player-visible word added).
Branch review/coop-rebirth-resync on LIVE bd47c753.

## (A) Fault 2 — co-op «Ban hoa» b1 every kiếp: REAL GAME FAULT (not harness, not a fixed seed)
Evidence 19dd13c0 (room RCT6): guest k1 played a real life to «Ban hoa» at Điện tuyển. k2…k6 were 3 taps each: title «Chơi một mình» → «Chọn sổ» «Trở lại phòng» → «Thái hậu» card → Ban hoa again, ident «Nhan Kiều Ân» every time. So no new life was ever rolled: the ENDED life came back alive just before its end and replayed it.
Root: a life that ends in a co-op room (any over(): death, ban hoa, xuất cung) left (1) this device's rolling seat snapshot and (2) the server's seat copy at the last alive moment (CW.snap returns null once S.dead), and (3) the room's P[seat] alive (the room learns of the end only from her NEXT life's sendMe). begin() on a rejoin (reload, «Trở lại phòng», room link, another device) saw P[seat] alive → fromCanon + snapLoad → CW.restore of the pre-end copy («restored 0.0 u1»). Same for the host seat (law 1) and from another device (server copy). Also: a death could be undone by a reload.
The j52 fixed thân phận is NOT the cause (nlNew runs on accept, also on the thin guest's accept); a new kiếp does roll fresh once it is actually reached.
Fix (dev/build/jcoopworld.js): endMark() on every over() (and on any render that finds S.dead) writes an END MARK {ended:1, room, seat, life} over the local seat snapshot and pushes it as the server seat copy; begin() treats P[seat] whose life carries the mark as ended → newLife (Luân hồi), the same road as a room that already says dead. Two law-11 neighbours found by the new test on that road and fixed: (i) a fresh page had CW.life 0 → the reborn life became life 1 again (an older life number, LIVE had it on the P.dead road too) → begin sets CW.life from P[seat].life first; (ii) the reborn guest on a fresh page never ran syncRoom → no «where» of the buổi → «Đợi hảo hữu» for ever → sendMe takes the room snapshot's where, and the host re-sends where when the friend's new life arrives.

## (B) Fault 1 — «week after rebirth advances» stall + «same world on both seats»
LIVE bd47c753, my box, one browser test at a time, local Worker (wrangler dev --local :8799), COOP_LIFETR=1:
| run | result | «week after rebirth advances» | other FAILs |
|---|---|---|---|
| LIVE-1 | 140/143 | PASS | same world after week 3, after rejoin; R10RV after rejoin |
| LIVE-2 | 139/143 | PASS | same world after week 1, 2, 3, after rejoin |
The stall did not reproduce in 2 LIVE runs (RV-163K: LIVE 1/2 bad). «err seatresync undefined» is NOT an error: it is the Worker's normal answer to a seat DELTA based on a stale version (index.js seatd → client sends the full copy; jcoopworld seatresync handler); it shows in good runs too.
«same world» root (WDIFF-SEAT dump added to the test): at every failing compare BOTH seats were already in buổi 1 of the new week (trace «bend n.0 → onBuoi n.1», wxDay.at/sk 4 = host khắc 4): the post-merge check chain outlived the room clock (BAL.coopTm 5 min on this box), the HOST's time-up stepped both seats (forceBend). The paths that then differ are host in-buổi NPC numbers (staff suc / bac / loyal / tin / af / mp, danh, spc.rel, doctor, ky.cd, chatM, pmW, wxDay.at/sk) and one guest post-merge night card (gUc fractions from her thị tẩm cards closed after the merge). By design a number with a numeric base waits for the merge (jcoophl header, merge.js m3 «added twice» guard) — not a lost resync.
LAW 11 table (every per-seat / world field named by MAIN 179 + every path in the dumps):
| field | where written | reaches the other seat | verdict |
|---|---|---|---|
| S.emp.met.* | host + guest acts | merge (numbers) | KEEP — not seen in my dumps; in-week by design |
| S.wxDay.at / sk | host wxkSync (host's own khắc marks inside the world day) | merge; guest keeps S.wxkG | KEEP (host-personal marks; d/s/u/lv equal) |
| staff loyal / tin / af / suc / bac / mp | host buổi NPC turn, guest acts | merge | KEEP (in-buổi numbers) |
| danh, spc.rel, doctor, ky.cd, chatM, pmW | host buổi turn | merge | KEEP |
| emoH / mk (feelings) | each seat (jmoodknow) | merge; test prints as «other family» | KEEP (already info-only) |
| gUc | ghenUp on the seat whose card closed | merge | KEEP |
| P[seat] life / end (rebirth) | sendMe only | — | FIXED (end mark, life counts on) |
| seat copy after an end | none | — | FIXED (end mark local + server) |
| where after a fresh-page rebirth | syncRoom only | — | FIXED (room snapshot + host re-send) |
Test fix (dev/test/coop-e2e.js, test only): room clock long in this test (COOP_CLOCK=1 keeps it; the clock has coop-timer.js / coop-rejoin-stats.js), each seat's world copied AT the merge (COOP «week»), a NUMBER one seat moved after its own merge copy is printed as info, everything else still gated; WDIFF-SEAT dump on a fail.

## Tests
- NEW dev/test/coop-rebirth-end.js (Fold 755x1000 host + iPad 1180x820 guest, local Worker): G1 guest ban hoa same device, H1 host death same device, G2 guest death from ANOTHER device, then one week for both. LIVE FAIL 6/29 (all three «restored» the ended life) · fix PASS 29/29 · MUTATE (endMarked removed from begin) FAIL 7/29.

### The trace «err seatresync undefined» explained (Foreman B 21:29Z)
- Printer: jcoopworld.js:485 `COOP.on("error",m=>{T("err "+m.code+" "+m.msg)…` — the generic error logger prints `m.msg`.
- Sender: coop/worker/src/index.js `seatd` branch (~:204/:207): `{t:"error", code:"seatresync", sv:cur}` — it carries `sv`, never `msg` → «undefined». It is sent when her seat DELTA is based on a version that is not exactly the stored one (normal after a reconnect, a week change or a rebirth: the server's seat copy was dropped by `me` / `week`, or a seatok was lost).
- Client answer: jcoopworld.js:1201 `seatresync` handler: seatBase/seatBusy/seatPend/seatLast reset, `T("seatresync "+sv)`, snapSoon() → next push is the FULL copy. It touches ONLY the seat-copy state (never pend / sent / bend / nrdy / ngoW / Q). In my runs it appears in passing runs too (e.g. coop-rebirth-end G1 host trace «err seatresync undefined · seatresync 7» and the week went on).
- So it is a real, harmless game path, not the cause of «B pend:true / B never sends ended». With pend true, sendEnd is gated in tryEnd only by Q.length / S.mg / S.dead / frozen() / resWait() and in sendEnd by cyHold / cyHer(); none is read or written by the seat-copy code.

### (C) Real-play hang 3T7K wk70 (Foreman F 21:15Z via Foreman B 21:41Z) — ROOT + FIX
Symptom: host ended (server ended.a true, #coopfz «Đợi hảo hữu xong tuần»); guest at tối, #next «Chờ hảo hữu…» DISABLED, server ended.b false. F's probe (flight2-coop1j.d/cw.js) read `CW` (not a page global; the object is window.COOPW) and the profiles live on F's box, so no replay here; root read from the code against the screen:
- «Chờ hảo hữu…» at tối with pend false and sent ≠ week = lockNext's nReady() (her «rd» is out, CW.nrdy = week).
- Host commits on her rd (nfr) → his night → his end → nOtherEnded() → guest nCheck sets ngoW = week; her night then waited on needWhere() (whereKey ≠ week.3).
- After his night the host's next sendWhere is buổi 0 of the SAME room week, which also becomes the room snapshot's `where`: a guest who missed the tối «where» (rejoin / reload / a life begun at tối on a fresh page — this room had many rebirths + 4 reopenings) can never get it → her night never runs → her end never goes out → both seats stuck for ever. The «Nghỉ ngơi with no khắc cost» side finding is the same state (her khắc are spent, the buổi never steps).
Fix (law 11, every tối gate that waited on the «where»): whereWait() = needWhere() && !(at night && the friend's end is out) used in nCheck (night run), the tối press (wantB / nightReady), wantB go, CW.nightEnd and lockNext's lock. Day buổi steps keep needWhere (the host is still in that buổi there).
Test: coop-rebirth-end.js N1 (guest ready at tối, her tối «where» dropped, host ends first → the week must merge).

## Results so far (fix = review/coop-rebirth-resync; local Worker wrangler dev --local :8799; one browser test at a time)
- coop-rebirth-end.js r2 (31 checks, + N1): LIVE 8330e8b8 FAIL 7 (G1 life not new, H1 ×3 restored, G2 ×2 restored, N1 guest stuck at tối «Chờ hảo hữu…», wk 'missed', ended {a:true,b:false} = the 3T7K hang) · fix 30/31: N1 was a TEST fault (the loop never read the guest's night cards; her night DID run, pend true, Q full) → test fixed in 9c… «N1: the guest's night cards are read too». Earlier r1 (29 checks): LIVE FAIL 6 · fix 29/29 · MUTATE (endMarked removed) FAIL 7.
- coop-e2e on the fix (base 8330e8b8): s1-1 143/143 · s0-2 142/143 (one guest post-merge face id S.fidUsed.52 from her deferred thị tẩm card → same-world filter refined, commit «a value equal at the merge that only the guest moved…») · s0-1 browser crash «Target page … closed» in week 2 then hang to timeout (infra, re-run queued as s0-4). s1-2 / s0-3 / s1-3 were running at rollover.

## HANDOVER (27/11 ~23:59Z, ctx 39 % ≥ START_CTX 4 % + 25 %) — for the successor B fixer
Branch review/coop-rebirth-resync 07c5d9c5 (pushed) = my commits + merge LIVE 5fb13d60 (NOT yet assembled / gated on 5fb13d60).
Commits: 6bfa86ed (end mark, life counts on, fresh-page where, coop-e2e clock + merge copy, new coop-rebirth-end.js) · e2e stall dump widened · whereWait tối family + N1 · N1 test fix · same-world filter refine · merge 8330e8b8 · merge 5fb13d60.
TODO:
1. Sparse worktree from origin/review/coop-rebirth-resync; `python3 dev/build/assemble.py`; `cd coop/worker && npm install && npx wrangler dev --local --port 8799` (background).
2. coop-rebirth-end.js on the fix (expect 31/31) + MUTATE N1: in dev/index.html replace `function whereWait(){return needWhere()&&!(nAtNight()&&nOtherEnded())}` by `function whereWait(){return needWhere()}` → expect N1 FAIL; re-assemble after.
3. coop-e2e SWAP0 + SWAP1 ×3 green on the fix (`COOP_LIFETR=1 [COOP_SWAP=1] node dev/test/coop-e2e.js <out> http://127.0.0.1:8799`, ~25 min each). A FAIL «same world» now prints «WDIFF-SEAT» per seat: if a path differs AT the merge (not moved after it) that is real — root it.
4. Foreman B ask: ≥6 LIVE samples of «week after rebirth advances» (LIVE worktree, same test copy from the branch). 2/2 + my rebirth-end runs so far never stalled after the rebirth itself; RV-163K's «B pend:true» matches the 3T7K shape once a guest misses the tối where (now fixed) — if a LIVE stall shows, the widened dump (Q0 / modal / cyHold / rpend / frozen / selx / life trace) names the gate.
5. Gates ALONE: coop-qcard.js, dayq-hold-coop.js, oldsave-r1 (dev/test/oldroom-r1.js / oldsave test per brief), quickcheck (one process).
6. Then «SẴN SÀNG KIỂM review/coop-rebirth-resync <full sha> (BIG co-op)» at END of FOREMAN_B_STATUS.md + send_message Foreman B child 1 session_01N1tNP4nhQ82RVmZCb5akZg.
Notes: «err seatresync undefined» = harmless (see above). F's probe cw.js reads `CW` (undefined global) — use window.COOPW in any replay. Disk: delete worktrees when done.

## r2 (B FIXER COOP-REBIRTH-RESYNC r2, session_01N1tNP2Y1YMPHDUwpnNDb8J, 28/11 ~00:00–09:55Z)
PRIORITY #1 CHECK ('coop-rebirth-resync|whereWait|endMark|heartbeat|kg82skip'): OD 1 | ledger 0 | claims 8 | main 4 | review/* 1 (this branch) | archive 0.
Branch review/coop-rebirth-resync **752a40b8** (pushed) = r1 work + merges LIVE 5fb13d60 → f7ea14b7 → 22afefb4 → a96564ad (merge-tree clean each time; assembled clean) + 4 r2 commits:
- 34d6c2af test: coop-e2e «same world after rejoin» — the guest's fresh page has no merge copy; her restored world stands in for it (host-only in-buổi NUMBER moves, e.g. R#10.spc.rel:me = statpace carry, law-11 table KEEP, stay info as after week n).
- 78652f5e + 11446a4b FIX (real, found by coop-e2e SWAP1 on LIVE f7ea14b7 week 1: guest pend:true sent -1, Q 0, no modal, not frozen, > 90 s = RV-163K «B pend:true» shape): seat steps were retried only by events (render / closeModal / status / ack); a gate that cleared with no event left the seat waiting for ever → jcoopworld: one 2.5 s heartbeat `soonEnd()` while CW.pend / pendBuoi / wantB (NOT the night flags: nCheck would re-enter an open night choice every beat); tryEnd traces «endHold <gate>» once per change. Test coop-rebirth-end **N2**: no-heartbeat FAIL / fix PASS (MUTATE run 32/33 with N2 the only FAIL; fix run N2 PASS).
- coop-rebirth-end H1 test fix: a host reborn as a palace servant sits in her mistress's staff (placeFriend friendSrv), the «sees the new life» check now looks there too.
- 11446a4b test: dev/test/lib/coop-clear.js — the steal game has no «Thôi, không chơi» any more (owner 26/11 ~22:43Z, jsmg quick:false) → bot gives up with the kg82 ✕ (SWAP1 sat on the steal rules screen at 1:3, both seats «Chờ hảo hữu…»: harness only).
GATES done: coop-rebirth-end 31/31 on 07c5d9c5 (+ MUTATE N1 27/31 FAIL as expected); coop-e2e on 34d6c2af: SWAP0 143/143 ×2, SWAP1 143/143 ×1; on 65df9553: SWAP0 143/143 ×1, SWAP1 140/143 (→ the heartbeat fault above). On 752a40b8 SWAP1 run 1 was at 135 checks / 0 FAIL when I rolled (result lost with my container).
coop1i (WORKLIST row 19) verdict: same screen pair as N1 (guest «Hết buổi · Chờ hảo hữu…», host «Đợi hảo hữu xong tuần», survives rejoin) = tối whereWait root, closed by N1; matched by shape (coop1i evidence holds no COOPW trace).

## HANDOVER (28/11 ~09:55Z, ctx ~25 % of 1M, START_CTX 6 % → roll line 31 %) — for the successor (opened by Foreman B)
NEW ORDER (Foreman B 09:42Z, from MAIN 189, verbatim in FOREMAN_B_STATUS / MAIN_STATUS 09:12Z): ★ PLAY-STOPPER room e E8EH (review/flight2-coop d41e7776, dev/handover/robot/flight2-coop1j.md §«COOP HANG REAL — room e», CDN img/_review/coop1j-e/{HANG-host,HANG-guest,P-guest-rest-nomove}.png): host ended week 306; guest (seat b) Phế phi · LÃNH CUNG, tuần 2 buổi 3 «Hết buổi», #next «Chờ hảo hữu…» DISABLED, server ended {a:true,b:false}; «Nghỉ ngơi» / «Che chở» resolve but the clock stops at used 3 («còn 1» for ever); only «Rời cung» left. + (4) in that state the last khắc is never spent = free rest / thiện cảm farm; (5) co-op reload → save rewind (host lost 6 buổi). Fix the WHOLE family: every guest place/state at the host's week end (lãnh cung, xuất cung, sick, away, dialog open). Merge LIVE c03d6ee7 (has coop-qcard-r3). ONE SSK for all.
Leads (not proven): lãnh cung week path = jkc.js:314–318 (endTurn → COOPW.weekEnd when isKc(); COOPW.altTurn = kcEndTurn). Guest #next lock = jcoopworld lockNext:356 (`waiting()||frozen()||pend||!base||bend||eR (CW.eWait: jcoopthine:84 + jcoopthinf:93 F.pend)||nReady()||whereWait()||pendBuoi||gap`) → first dump which term is true on a lãnh cung guest after the host's end (the endHold trace + a lock-reason trace would name it). The «còn 1» clock stop suggests her last khắc is capped by the room clock / host hour (thin E/F) once the host has ended — same idea as whereWait: when nOtherEnded() her own tối must be able to finish. Repro: coop-rebirth-end style pair (local Worker), put the guest in lãnh cung (find how tests do it: git grep -n "kc\|lanhcung" dev/test | grep -i coop), host ends first → guest must end (no-fix FAIL / fix PASS / MUTATE FAIL).
Then: coop-e2e SWAP0 + SWAP1 ×3 (each ~10–70 min; run each in its OWN background call — the tool kills a call at 2 h; never two browsers), coop-rebirth-end, ≥6 LIVE samples (LIVE worktree + this branch's coop-e2e.js + lib/coop-clear.js), coop-qcard (now on LIVE c03d6ee7), dayq-hold-coop, oldsave-r1, quickcheck ALONE → SSK to Foreman B session_01N1tNP4FQic23a4wJXFSmP4.
Notes: dev/index.html is gitignored (built by assemble.py); local Worker `cd coop/worker && npm install && npx wrangler dev --local --port 8799`; coop-e2e «buổi lengths» median ~360 s on some runs = room clock 5 min + pause, not a game stall (timeouts 0).
<<<<<<< HEAD

## r3 (B FIXER COOP-REBIRTH-RESYNC r3, session_01N1tNP2oQWGfQiP1xarkywv, depth 3, START_CTX ~3 %, 28/11 09:45Z–)
PRIORITY #1 CHECK ('coop hang room e|coop1j|whereWait|COOP HANG 772bee4f|lockNext|nfFin|dateFix'): OD row 19 | main LIVE c03d6ee7 | review/* this branch + review/flight2-coop d41e7776 (evidence) | claims B-COOP-REBIRTH-RESYNC r3 = me. KIT CHECK: no UI part touched; one existing player word reused («hết khắc buổi này», j15 whyTime), no new word.
Branch review/coop-rebirth-resync **c48d44c7** (pushed) = 752a40b8 + merge LIVE c03d6ee7 (257bebf3, clean) + the r3 fix. Test file updated after it (harness only, see «Open»).

### ROOM E ROOT (from the room-e checkpoints on review/flight2-coop: dev/handover/robot/flight2-coop1j.d/room-e/{guest,host}-final.ckpt.json, seat copy «ctm-coop-wk» decoded with j6 slotDec)
- Guest seat copy: room week 306, buổi 3, nrdy 306, sent 305, pend false, whereKey 306:3 (she HAD the where → not r1's whereWait), S.turn 105 tuần 2 → **jnf day 317**, S.nfC 317, **S.nfW 317 (waiting for the host's word of day 317)**, nfFin 311.
- Host seat copy (new life k4 after the in-room «Chuyển kiếp»): sent 306, S.turn 105 tuần 0 → **day 315**, nfFin/nfLast 314 (he ended day 314).
- So ONE room week held TWO seat calendars (jnf/jnight/night gate read the day as S.turn*3+S.tuan). jnf guest endTurn (`else if(S.nfFin!==d){S.nfW=d;ask();hold();…}`) waits for the host's word of HER day; the host's reply(d) answers only today or a past day (again(d<day())) → day 317 > his 315 → no answer, ever. Her night never ran → no end → server ended {a:true,b:false} for ever.
- «còn 1» (item 4) = the same state: jnf hold() puts used 4 back to 3 (so j6 does not turn the day while the night waits) → every act («Nghỉ ngơi», «Che chở») ran again for free at «còn 1», the clock never moved (and each auto-turn went back into the same wait).
- Repro on LIVE c03d6ee7 (new test case D1: guest's calendar one tuần off the room's, both ready at tối, host ends) = **FAIL: the week never merges in 150 s** (guest nf x «wait», «Chờ hảo hữu…»). Plain lãnh cung (L1) and host-reborn-at-tối (K1) do NOT hang by themselves: the calendar is the trigger, lãnh cung was the bystander.
- Where the drift came from in room e is not proven (candidates: a life built on CW.dying = the world at a death inside her own night / month tick — host-k3 «Phát điên trong lãnh cung» is a month-tick death; a restored seat copy / rewind). The fix closes it at the two places it matters, whatever the source.

### FIX (c48d44c7)
1. jcoopworld **dateFix** (ONE ROOM CALENDAR): before her night (nightReady, nCheck's night run) her year/month/tuần/turn = the merged world's date CW.base.W.S (never while her night / end runs or is out, never in selection days / thin E); attach (a new life put into the room) takes the merged week's date, not CW.dying's.
2. jnf **frEnded → finOut**: a guest waiting for the host's night word stops waiting once his WEEK END is out (his end is his last word; who held tonight comes with the merged week, B2 S.tn). LAW 1: the host's wait for her choice ends (Thôi) once her week end is out (step).
3. jnf **nfDayHeld** (item 4): while the night holds her spent day (S.nfC = today, waiting for the word / a held choice, no card open) can() is false and whyTime says «hết khắc buổi này» → no free last khắc.

### LAW 11 table (every guest place/state at the host's week end; + LAW 1 host side) — dev/test/coop-hang-e.js cases
| case | state of the late seat | how | LIVE c03d6ee7 | fix |
|---|---|---|---|---|
| D1 | guest, calendar off by 1 tuần (room e) | ready, host ends | FAIL (never merges) | PASS (merge + one calendar) |
| D2 | host, calendar off (law 1) | guest ends first | PASS (host waits ≤ waitMs 90 s) | PASS |
| M1 | guest lãnh cung, host's night words all lost | ready, host ends | (run pending) | PASS merge; «ended first ≤60 s» strict check FAIL = host's designed ≤90 s wait for her choice → check widened to 150 s |
| L1 | guest lãnh cung | ready, host ends | – | PASS |
| K1 | guest lãnh cung, host dies + reborn in room at tối | host ends | – | PASS |
| F1 | guest lãnh cung, host's own night played early (S.nfN, no fin) | ready, host ends | – | PASS (host's again() fallback) |
| L3/L4/L5/S1/W1/R1/H1/H2/HK/K2/F2/FH | clock run out / rejoin (5) / dialog open / sick / away / plain rejoin / host lãnh cung / host clock / host reborn | | full run in progress at handover (old harness hit «Việc khó xử» kopt cards: fixed in the test after) | |

### Item (5) co-op reload «SAVE REWIND» — analysis, not fixed yet
- Guest b1227→b1223: harness clock 9.104.0.0 → 9.103.2.0 = her LOCAL next day (after her own night, before the merge) went back to the room's week start on reload; host b8→b2: clock 9.105.1.0 → 9.105.0.0 = same shape (the host's local post-end day). A seat's local day after her night is not real until the merge (fromCanon on onWeek replaces it), so the reload restores the room week — the harness reads it as a rewind. Open question for the successor: does the replayed night after such a reload give anything twice before the merge overwrites it (law 6c)? Cases L4/R1 («(5) the reload keeps her tối») gate the at-tối reload.

### Gates / results so far
- coop-hang-e (fix c48d44c7 + test fixes): D1 PASS, D2 PASS, M1/F1 PASS (merge), K1/L1 PASS (earlier runs). LIVE: D1 FAIL.
- NOT done yet: MUTATE (dateFix → return false; frEnded → return false: expect D1 / M1 FAIL), full coop-hang-e SWAP0 + SWAP1, coop-rebirth-end, coop-e2e SWAP0/1 ×3 (+ MAIN 189 09:46Z: make coop-e2e green on LIVE as proof; r2's SWAP1 135/0 on 752a40b8 — result lost, re-run), coop-qcard, dayq-hold-coop, oldsave-r1, quickcheck ALONE.

## HANDOVER (28/11 ~11:15Z, ctx ≈ START_CTX 3 % + 25 % → roll) — for the successor B fixer (opened by Foreman B)
Branch review/coop-rebirth-resync **d1ae72a3** (pushed) = c48d44c7 fix + test harness fix. A full coop-hang-e run on the fix (all 18 cases) was started at ~11:10Z in my container (result dies with it): re-run it.
TODO, in order (ONE browser test process at a time; local Worker `cd coop/worker && npm install && npx wrangler dev --local --port 8799`; `python3 dev/build/assemble.py` after every build change; LIVE worktree for CTM_ROOT):
1. `node dev/test/coop-hang-e.js <out> http://127.0.0.1:8799` on the fix (SWAP0) and `COOP_SWAP=1` (SWAP1); LIVE = `CTM_ROOT=<LIVE worktree> …` (expect D1 FAIL, M1 FAIL). `CASES=D1,M1` picks cases. Any «both at tối» FAIL with a card in the dump (btn list) = harness (a card the bot does not close): extend clear(), not the game.
2. MUTATE: dev/build/jcoopworld.js dateFix → first line `return false` → D1 FAIL «friend ended first» (host waits); dev/build/jnf.js frEnded → `return false` → M1 FAIL (week never merges). Re-assemble after each.
3. Item (5) (see §r3 analysis): decide with L4 / R1 whether a reload at tối / after her night gives anything twice before the merge; if a real double → fix (law 6c) + test.
4. r2 gates still owed: coop-rebirth-end.js, coop-e2e SWAP0 + SWAP1 ×3 (each in its OWN background call, ~25–70 min; never two browsers) + MAIN 189 09:46Z «make coop-e2e green on LIVE as proof» (LIVE worktree + this branch's coop-e2e.js + lib/coop-clear.js), coop-qcard.js, dayq-hold-coop.js, oldsave-r1, quickcheck ALONE.
5. SSK «SẴN SÀNG KIỂM review/coop-rebirth-resync <full sha> (BIG co-op)» at END of FOREMAN_B_STATUS.md + send_message Foreman B session_01N1tNP4FQic23a4wJXFSmP4 (BIG rv → LC35 ALONE).
ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217; repeated by the owner 16/11 09:20Z — she is tired of reminding)
- The "Lượt n/30" counter from the owner's global chat preferences is ONLY a display counter here. It is NOT the rollover trigger for the Cung Tường Mộng main chat or any foreman. Never hand over because n reached 30.
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).
=======
>>>>>>> e655ad96c (F c1: s18f evidence)
