# PROGRESS review/save-slots (owner 16/11 "Separate save slots for solo and co-op", HIGH)

## Cause (reproduced on main 3ef079f61, dev/test/save-slots.js, before the fix: 2 FAIL)
- j6 `render()` ends with `save()`. jcoopworld's save wrapper only skips the sổ while `COOPW.on`. After leaving a room
  (freeze panel "Về màn đầu", lobby "‹ Về màn đầu", COOP "stop") `COOPW.on=false` but `S` is still the co-op life, so the next
  render() (the title alone triggers one) wrote the co-op life into the current solo sổ `hclh-save-v2-<SLOT>`
  (a co-op death even removed that sổ). Repro: solo life in Sổ 1 → co-op start → COOP.leave(true) + showTitle → Sổ 1 = co-op life.
- Second path: the in-game title button kept the room open (COOPW.on), so a solo sổ loaded from the title kept running the
  co-op hooks (no solo save; the next room message rebuilt S into the co-op life).
- Lost sổ: not recovered (owner 16/11: drop recovery). Format had no backup copy; the overwritten sổ held the co-op life.

## Fix
- dev/build/jslots.js (new, after jcoopworld): a life built in a room is marked `S.coopRoom` (start / nlRun / deser wrapped);
  save() never writes a marked life into a solo sổ; picking a solo sổ (Tiếp tục kiếp này / Kiếp mới / home Chơi một mình) and
  the in-game title button leave the room first (code kept). Rooms list `ctm-coop-rooms` (max 3, newest first): ám hiệu, seat,
  friend line (her known name/rank or "chưa gặp mặt" / "chưa chọn thân phận" / "chưa vào phòng"), her character (rank, name,
  age, date). Old single `ctm-coop-room` shows as a room. `noroom` error drops the room.
- j74 Chọn sổ: Sổ một/hai/ba (+ Tuổi row) then Phòng hảo hữu một/hai/ba (same kit parts: .kslot h4.kpst + kitRows + .kbtn);
  .kslot stacks on short landscape (max-height:500px) too.
- jcooplobby "Cùng hảo hữu": Mời hảo hữu · Nhập ám hiệu + the 3 rooms (Trở lại phòng = rejoin that code, Bỏ phòng with confirm).
  When 3 rooms exist a kpnote says the oldest leaves the list on a new room.

## Tests
- node dev/test/save-slots.js [755x1000 1180x820 844x390]: ALL OK (17 checks each).
- coop-e2e plain (live Worker): 59/59 passed.

## Review r1 (review/save-slots-r1, merged onto origin/main 2d038139e)
- Save paths checked: j6 render()/endTurn → save(); death over() → save() (S.dead → removeItem); Kiếp mới (start / nlRun);
  deser on room messages (fromCanon, CW.restore); freeze panel "Về màn đầu" and lobby ‹ Lui (COOP.leave(true) + showTitle);
  in-game title button; no pagehide/beforeunload save exists. Only j6 save() and j16 import (user-driven) write hclh-save-v2-*.
- FIX (jslots): a life built OUTSIDE a room (sổ loaded, solo start/nlRun) is kept in a WeakSet and is never marked S.coopRoom.
  Before: a guest waiting for the host's world (or any save while CW.newLife was left over from an earlier room) marked the
  SOLO life with the room code, listed it as the room's character, and after leaving the room that solo life was never
  saved again (marked lives skip the sổ). save() now marks only with CW.base or CW.inLife; leaveRoom marks only with CW.base.
- Test additions (dev/test/save-slots.js): co-op death in the room and after leaving keeps Sổ 1; Kiếp mới after a co-op death
  stays a room life; guest waiting with a solo sổ open (before fix: FAIL, after: ok); reload mid co-op.
- Overlap with coop-timer: now on main (b2690dfb3); merged clean except assemble.py file list (jslots after jcoopworld, jcooptimer after jkitpage). After merge: save-slots ALL OK (755x1000, 844x390; earlier also 1000x755 1180x820 1366x1024), coop-e2e plain vs live Worker 59/59 twice.
