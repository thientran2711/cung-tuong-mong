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
