# coop-f1-rejoin — FIXER F1 (opus, BIG co-op), Foreman B ROOT 2 child 1
PRIORITY #1 CHECK ('Mời hảo hữu|Trở lại phòng|đang vào cuộc|Thân phận kiếp này|resume|hostPick'): OD 9 | ledger 0 | claims = this fixer | main jcooplobby resume()/join()/make() + jcoopworld begin()/onState() hostPick, jslots «Trở lại phòng» list | review/coop-rejoin-xdev-r1 e4775317 (woken-device seat copy) is ALREADY in base 04a45597 (jcoopworld «snap wake server»), different fault (stale week), not F1 | review/coop-presence-reload-land 8d5fa1fd in base, does not cover F1 (measured: base fails) | archive 0. Reused: coop-serve.js, lib/coop-clear.js, the rejoin/press/advance shape of coop-presence-reload.js.

Branch review/coop-f1-rejoin, base review/coop-week-wait-land 04a455979bbcaf96a34e60c3eb7dcfd175323b85.

## Root cause
Guest reload while the host is still before her life (Luân hồi roulette / «Thân phận kiếp này» card): the room has no world yet (C = null).
«Cùng hảo hữu» › «Trở lại phòng» → jcooplobby `resume()`: `open("join"); await COOP.resume(); open("wait")`.
The room's "both" arrives BEFORE the promise resolves → lobby drops, emits start → jcoopworld `begin()` sees no world and a guest seat →
`CW.waitWorld=true` + `COOP_LOBBY.hostPick(true)` = title up + the kit panel «Đợi hảo hữu chọn thân phận» (PG "pick").
Then the promise resolves and `resume()` re-opens the INVITE screen «Mời hảo hữu … 3 · Cùng chơi … đang vào cuộc» over that panel
(PG "wait"). When the host then takes her card, `onState()` → `hostPick(false)` lifts the title only when PG === "pick" → never:
the guest stays on the invite screen for ever, her game (her own roulette + identity card) hidden under the title. That screen's ✕
(= its «‹ Lui», kit closer) runs back() → `COOP.leave()` → the host freezes «Đợi hảo hữu trở lại».
`join()` already had the guard (`if(PG==="join")open("wait")`); `resume()` and `make()` did not; all three opened «Chưa vào được phòng»
(err) on a late failure whatever the screen was by then.

## Fix — ONE rule (law 11), jcooplobby.js only
`landed(from, e)`: a tap's answer (or its error) opens the invite / err screen ONLY while the lobby still stands on the screen that tap
opened; a late answer, a late error, or the first tap's «replaced» after a newer tap never covers what she sees now (the game, the
identity card, the waiting panel, the room list after ‹ Lui). Used by all three ways into a room: «Mời hảo hữu» (make), «Vào phòng» /
?room= link (join), «Trở lại phòng» (resume). No UI / CSS / wording change (law 9: nothing new on screen; the waiting panel is the
existing kit panel). No number (law 4).
Esc: on the waiting panel Esc did send her to the title home (j74 Esc → home) over the room's panel (found by P1) → now Esc does nothing there (capture-phase guard in jcooplobby, only while PG = "pick").
✕: the waiting panel «Đợi hảo hữu chọn thân phận» has no kit ✕ / Esc / ground close (no #mr closer; its only way out «‹ Về màn đầu» =
`COOP.leave(true)`, room kept in the list) — tested (P1). The ✕ that left the room belonged to the invite screen that should never have
been there.

## Family scan (law 11) — every pre-life / lobby / identity screen the host may be on, every way back in, both seatings
| row | situation | base 04a45597 Fold host/iPad guest | base SWAP | fix Fold/iPad | fix SWAP |
|---|---|---|---|---|---|
| P1 | guest reload, host on «Thân phận kiếp này» | FAIL (invite screen, then stuck under title after host picks; room never advances) | FAIL | PASS | PASS |
| P2 | guest reload twice (second from the waiting panel) | FAIL | FAIL | PASS | PASS |
| P3 | guest reload, host still on the Luân hồi roulette | not reached (run timed out on P1–P2 waits) | FAIL | PASS | PASS |
| P4 | host reload on her card, guest on the panel | not reached | not reached | PASS | PASS |
| P5 | both reload, host on her card | not reached | not reached | PASS | PASS |
| P6 | guest reload after the host picked (control) | not reached | not reached | PASS | PASS |
| P7 | guest reload, «Trở lại phòng» then at once «Vào phòng» (first answer «replaced») | — | — | PASS | PASS |
Final sha: **65/65 Fold host + iPad guest, 65/65 iPad host + Fold guest**. Base 04a45597: FAIL 11/23 (Fold host, timed out at P3) and 12/30 (iPad host, timed out at P4) — the owner shape: guest «Mời hảo hữu … đang vào cuộc» (invite:true over waitWorld), after the host's pick still under the title, the room never advances.
Each row = a fresh room; after each: host takes her card → guest goes into the game → the room advances one buổi for both; no page errors.

## Gates (final sha, local Worker wrangler dev --local :8788)
| gate | result |
|---|---|
| coop-f1-rejoin.js COOP_SWAP unset / =1 | 65/65 / 65/65 (base FAIL) |
| coop-e2e SWAP unset / SWAP=1 | 143/143 / 143/143 |
| coop-presence-reload SWAP unset / =1 | 35/35 / 35/35 |
| coop/worker npm test (merge, vault, seat, stale, thin, range, presence) | ALL OK (Worker unchanged) |
| quickcheck ALONE, live = 5e013076 (brief's LIVE) | open 2271 ms · old save ok · perf new/live render 238/271, tab 689/732, buổi 2609/1994 (bimodal by random life, see fix7-r3 rv), tasks>200 28/29 · TIME-SPILL PASS · core gates G1–G3 PASS, G4 all hooks PASS except 90-button-crawl |
| G4 90-button-crawl | 1 FAIL «fold · Ô lưu [#modal.kptitle] · Lui · close button did not close its layer» — **PRE-EXISTING**: same row FAILs on base 04a45597 (A/B --fast, same box, same server: base rc=1 same line, fix rc=1 same line). Not this branch (solo title Ô lưu page; this branch touches only the co-op lobby's connect answers + Esc on the waiting panel). For Foreman B: own lane. |
| quickcheck run 1 (live = origin/main f009e1a6) | old save + perf live timed out loading the f009e1a6 build (live side, not the new build); G4 95-next-dead FAIL 1 (known jdayq flake, PASS in run 2) |

## Videos (CDN, never in git)
Two 2-seat rooms, row P1 (guest reload while the host sits on «Thân phận kiếp này» → «Cùng hảo hữu» › «Trở lại phòng» → waiting panel → host picks → both in the game → one buổi), each ~62 s, PASS 11/11, 0 page errors, frames looked 3×:
- https://ctm-img.victoria-tntt.workers.dev/img/_review/coop-f1-rejoin/f1-hostFold-755x1000.mp4 (Fold host)
- https://ctm-img.victoria-tntt.workers.dev/img/_review/coop-f1-rejoin/f1-guestIpad-1180x820.mp4 (iPad guest)
- https://ctm-img.victoria-tntt.workers.dev/img/_review/coop-f1-rejoin/f1-hostIpad-1180x820.mp4 (iPad host, swapped)
- https://ctm-img.victoria-tntt.workers.dev/img/_review/coop-f1-rejoin/f1-guestFold-755x1000.mp4 (Fold guest, swapped)
Looked: guest panel «Đợi hảo hữu chọn thân phận» (Ám hiệu, Hảo hữu đang chọn thân phận, Ta đã vào phòng, «‹ Về màn đầu») before and after the reload, never the invite; then Luân hồi → her «Nhập cung» card → game. Host: invite → roulette → her card, «Đợi hảo hữu trở lại» while the guest reloads (correct), lifts by itself, card → game. No cut text, no overflow. The verdict giver wipes img/_review/coop-f1-rejoin.

Laws touched: 4 no number · 7 no new wording · 9 no UI/CSS change (existing kit panel) · 11 one rule for all three ways into a room + every pre-life screen, both seatings, host reload · 12 Fold 755x1000 + iPad 1180x820 videos looked 3× · 13 check line · 14 one rule, the old guard in join() replaced by it.
Files: dev/build/jcooplobby.js (+ index.html/sw.js/assets.json rebuilt), dev/test/coop-f1-rejoin.js (new).

**SẴN SÀNG KIỂM 112fab2560ef15f6711d19a70076abf14b44b67c** (review/coop-f1-rejoin)
