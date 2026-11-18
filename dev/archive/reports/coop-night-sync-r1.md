# coop-night-sync-r1 — reviewer report (16/11)

**Result: PASS bd6342c732a1e3f8396c36d922883bf2271f1b0b** (branch review/coop-night-sync-r1; descends from origin/main a942395b3, fast-forwardable)

Target review/coop-night-sync @ 22e7932d. Merged main 6 times while testing (a363cc14 → 0a311183 → 02a0d3f1 → c4e89f89 → 0c23da40 → a942395b);
generated files rebuilt each time (never hand-merged). Real conflict: jcoopworld begin() vs main's jkc home road (kept the
branch's snapshot restore + main's CW.fWasHome). Client-only fix, no Worker change. No new UI parts (button words only; kit clean).

## Tests (two real Chromium clients, live Worker)
| test | result |
|---|---|
| coop-night.js FULL (14 cases), 13 runs over the merges | final 105/105; 105/105 ×8 in total; 4 runs had ONE fail each = test flake (a seat already night-ready from an Emperor night via jnight, so its button was locked; all state checks passed; test fixed), 2 runs failed setup on main's new identity card (bot regex, fixed as main did in coop-timer) |
| coop-timer.js | 43/43 ×4 (final on a942395b) |
| coop-e2e.js | 59/59 ×8 (final on a942395b) |
| coop-rejoin-stats.js (NEW: host + guest rejoin mid-buổi, both seats' stats/khắc/clock, next-week merge) | 31/31 ×6 (final on a942395b); one run 29/31 = host drew the jkc home road, so the guest has no palace friend entry by design (assertion fixed) |
| solo boot/step 755x1000, 1180x820, 844x390 | OK, no co-op clock, no overflow, no page errors |

## Per bug
1. Night runs ahead (friend jumps to next day): FIXED — host-authoritative night gate; cases 1-5, 9 (host first, guest first, night event open, AFK time-out, reconnect at tối): same date, exactly one week step.
2. Friend stuck after rejoin: FIXED — cases 6-9 + rejoin-stats: the stayer drops the wait without reload and both step the buổi.
3. Shared buổi timer freezes after rejoin: FIXED — case 12 (host reloads with the clock already run out → time-up fires again); rejoin-stats: clock runs + counts down on both, same key.
4. Buổi acts / khắc reset on rejoin: FIXED — cases 10-11 + rejoin-stats (not reset, not doubled).
5. Stats roll back (23→10): FIXED for a rejoin on the same browser — cases 13-14 + rejoin-stats: rejoiner and stayer keep stats, and the next week merge keeps both seats' gains; each sees the friend's real stats.

## Follow-ups (not blocking)
- The kept week is localStorage only: a rejoin from ANOTHER device / cleared storage still restarts her week from the room base. Full "newest personal state wins" needs a per-seat Worker copy.
- Host commits the night alone when the guest seat is empty; the Worker then takes the host's end wholesale (absent guest's week lost).
- Night `go` ignores a dialog that opens on a seat after it became ready: the other seat shows the new date while it reads (both had pressed). Stricter gate: host commits only with its own Q empty, guest re-sends rd only while free.
- Cross-device rejoin may now be possible via main's Sổ mây per-room pid (jcoop pidFor): that path restarts the week from the room base (no local copy) — worth a test once cloud save is used with co-op.
- Pre-existing on main: closeModal() with empty Q at the title (S undefined) throws "reading 'dead'".

Tests added/changed on r1 (test-only, no game code): dev/test/coop-rejoin-stats.js (new), dev/test/coop-night.js (already-ready seat counts as pressed; identity card by ^Nhận thân phận). Details: dev/PROGRESS_coop-night-sync-r1.md on the branch.
