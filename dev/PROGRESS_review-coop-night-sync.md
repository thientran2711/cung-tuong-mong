# PROGRESS review/coop-night-sync (worker for coordinator session 8, 16/11)

## Bugs (owner, live co-op)
1. Friend finished buổi tối and was moved into the NEW day while the owner was still in her tối.
2. After a leave + rejoin the still-connected client looked stuck / the shared clock froze ("Còn 0:00", buổi never advances).
3. After a reload / rejoin her khắc and the acts of the buổi were reset (she had to redo them: double gains).

## Root causes
1. jcoopworld nextBuoi at tối ran endTurn() at once on the pressing client (lật thẻ, night events, quẻ, month steps, week book,
   jbuoi curtain), then sent `end` and waited. There was no ready gate before the night, only after it.
2. jcooptimer: a host clock restored already run out (localStorage / room snapshot, up=true) never crossed the run→up edge, so
   timeUp() never fired again; the host never ended its buổi. Also fromCanon clamped S.buoi to 0..2 (3-buổi era): a rejoin at tối
   (buổi 3) landed in chiều.
3. begin() rebuilt her from the room's base C = the state at the START of the week; her local week only survived the swreg
   new-build reload (CW.snap written just before it).

## Fix (client only, no Worker change)
- Night gate: tối "Sẵn sàng" = ready only (CW.nrdy; guest relays act k:"ctm-nr" mode "rd"). The HOST commits mode "go" when both
  are ready, the room clock ran out (CW.forceNight from jcooptimer dueTick), the other seat is empty, or the other's `end` is out.
  Each seat runs its night on go once no dialog / mini game is open. rd / go re-sent on room snapshot + peer return.
- jcooptimer: time-up is a state (host K.up / guest G.up re-fire timeUp when `due` is not set); myRd counts the night ready.
- Rolling week snapshot localStorage "ctm-coop-wk" (CW.snap, ~1 s after renders + pagehide); begin() restores it for the same
  room/seat/week/life/name (never a sent/pending week end); her bend for the buổi is kept from the room snapshot.

## Tests
dev/test/coop-night.js (two browsers, live Worker): host first / guest first at tối, night event open, time out, reconnects
(host, guest, after time-out, at tối), 2 acts → reload → kept (guest + host), clock run out → host reload → no freeze.
Baseline on main 9b4f1697a: cases 1-3 FAIL (the presser jumps to the next date).
