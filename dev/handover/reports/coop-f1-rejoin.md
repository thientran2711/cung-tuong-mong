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

~~SẴN SÀNG KIỂM 112fab25~~ superseded by the scope add below (not ready yet).

## Scope add (Foreman B child 1/2, 26/11 05:21Z/05:45Z, sếp 05:20Z): «no ✕/Lui leaves the co-op room; only the «Rời phòng» confirm»
PRIORITY #1: the rule already exists in review/robot-coop-fix-7-r3 a32a931d (PASS, LAND READY: j74 lifeBehind/homeMr/backToGame, jslots CTM_ROOM_LIFE «Rời phòng?» kitConfirm + the friend is told; on 04a45597 ☰ itself runs leaveRoom() → bare #title = U1d s134's shape). Reused, not rebuilt:
- a44e3cbb = merge of fix-7 r3 into this branch (only index.html/sw.js conflicted = generated; rebuilt) + the last close that still left without asking: the waiting panel's «‹ Về màn đầu» → the same confirmed «Rời phòng» (PG "pickask" while the confirm is up; the host's pick still lifts the title; «Thôi»/✕ → back on the panel).
- test rows P8 (confirm first, its kit ✕ = «Thôi» keeps the room) PASS 10/10 Fold host; P9 (scan: every #modal close met in 3 co-op buổi — kit ✕ / ‹ Lui / Thôi / Đóng / Esc — and ☰ → ✕, both seats; after each both open in the same room) PASS on the pre-final tree (7 closes: ☰ menu ✕ ×6, Kính sự phòng ✕).
- Land note: this branch now CARRIES fix-7 r3 → land fix-7 r3 first, or this branch alone.

## HANDOVER (worker rollover at START_CTX ~5 % + 25 %; the COORDINATOR opens the successor)
Head: review/coop-f1-rejoin a44e3cbb41e6125db5a888e768dff9f3b32f6001. Worktree recipe: sparse worktree of that branch; `cd coop/worker && npm i && npx wrangler dev --local --port 8788 --ip 127.0.0.1`; `python3 dev/build/assemble.py`.
TODO for the successor (all on a44e3cbb, nothing else to code unless a gate fails):
1. `node dev/test/coop-f1-rejoin.js` and `COOP_SWAP=1 …` (P1–P9, ~30 min each, run the two in parallel) → expect all PASS.
2. coop-e2e ×2 seatings (`node dev/test/coop-e2e.js <outdir outside git> http://127.0.0.1:8788`, COOP_SWAP=1) → 143/143; coop-presence-reload ×2 → 35/35; coop-title-leave ×2 (fix-7's own: 110/110) ; title-never-bare 18/18.
3. quickcheck ALONE with `CTM_LIVE_REF=5e013076` (origin/main f009e1a6 failed to load as «live» here). Known PRE-EXISTING: G4 button-crawl «fold · Ô lưu · Lui · close did not close its layer» fails identically on base 04a45597 (A/B done) — report, not this branch. fix-7 rv saw the same row PASS on a32a931d, so recheck it on a44e3cbb.
4. Videos: `VIDEO=<dir> ROWS=P1,P8 node dev/test/coop-f1-rejoin.js` (+ COOP_SWAP=1), ffmpeg webm→mp4, put in img/_review/coop-f1-rejoin/ (overwrite the 4 old ones), `python3 dev/site/cdn_sync.py img/_review/coop-f1-rejoin`, curl 200, rm the local folder, look at frames 3×.
5. Write «SẴN SÀNG KIỂM <sha>» here + STATUS line; tell Foreman B (child 2 = session_01N1tNP3uEmVZq9qfYDmWJUZ) to open the BIG opus reviewer.

## RE-REVIEW (BIG co-op rv session_01N1tNP5jcP3hHwSv7nspxfp, 26/11 ~07:00–09:30Z) — head a44e3cbb41e6125db5a888e768dff9f3b32f6001 → **PASS**
PRIORITY #1 CHECK: as in «## REVIEW» above + the head now merges review/robot-coop-fix-7-r3 a32a931d (LAND READY 01:40Z, rv 2KxFM4UD).
FAIL rows of 112fab25 CLOSED: (a) the waiting panel «Đợi hảo hữu chọn thân phận» «‹ Về màn đầu» → jcooplobby back() pg "pick" → CTM_ROOM_LIFE.askThen = the same kitConfirm «Rời phòng?» (friend told by the "say" line; «Thôi» = back on the panel; PG "pickask" so the host's pick still lifts the title and the confirm stays over her game); fallback leave only when the socket is not open. (b) fix-7 r3 in: ☰ in a co-op life = the life menu (Trở lại cuộc chơi / Rời phòng / Sổ luân hồi / Bảng vàng / Thiết lập + ✕), ✕ / Esc / ‹ Lui go back to the game, freeze «Về màn đầu» = the same confirm. ONE confirmed leave for every co-op leave button (law 11). Code read: no other COOP.leave / leaveRoom path mid-room except the confirmed one and the solo-sổ capture (by design).
| gate (local wrangler dev :8788 unless said) | result |
|---|---|
| coop-f1-rejoin.js P1–P9 COOP_SWAP unset / =1 | **82/82 / 82/82** rc 0 |
| MUTATE: the new test on 112fab25 build, ROWS=P8 | FAIL (no «Rời phòng?», seat off at once, host freezes) = the old fault |
| coop-e2e SWAP0 / SWAP1 | 143/143 / 143/143 |
| coop-presence-reload SWAP0 / SWAP1 | 35/35 / 35/35 |
| coop-title-leave SWAP0 / SWAP1 | 110/110 / 110/110 |
| title-never-bare | 18/18 |
| coop-keymove-unit | 12/12 |
| coop/worker npm test | merge · vault 48 · seat · stale · thin · range · presence ALL OK (Worker unchanged) |
| build | assemble.py on the head = no diff |
| sangbuoi-held | Fold+iPad all rows PASS except Fold D «setup: card already painted» in 2 of 3 full runs (test precondition: a queued card painted itself, dqWake, before the 200 ms check — not a game assertion). Targeted: CASES=D ×5 = 10/10 PASS, CASES=CD ×3 = 12/12 PASS. Base 04a45597 full run PASS. Run 1 iPad A FAIL was under load (2 suites in parallel), PASS in runs 2–3. → flake of the test set-up, not this diff (diff = lobby / title menu only). Foreman B: own lane if it repeats. |
| quickcheck ALONE (CTM_LIVE_REF=5e013076) run 1 / run 2 | core gates PASS incl. G4 90-button-crawl (**«Ô lưu · Lui» cured**; base 04a45597 still FAILS it) / G4 50-coop-one-world seed 7 FAIL once → re-run seed 7 ×3 PASS (flake; diff touches no merge). open ~2 s, old save ok both. perf buổi run 1 3918 vs live 2116 (FAIL), run 2 2174 vs 3847 (PASS); base run: 2054 vs live 5890 → the buổi number is bimodal by random life (live itself 2116↔5890), render/tab ≈ live. |
| real 2-seat runs, REAL taps (touchscreen Fold / mouse iPad), both seatings, videos | 23/25 each — the 2 FAILs were my probe reading only 90 chars of the menu; the video frames show the co-op life menu right. Videos (CDN, not git, ~150 s each): img/_review/coop-f1-rejoin/f1r2-hostFold-755x1000.mp4, f1r2-guestIpad-1180x820.mp4, f1r2-hostIpad-1180x820.mp4, f1r2-guestFold-755x1000.mp4 — guest reload while the host is on «Thân phận kiếp này» → Cùng hảo hữu › Trở lại phòng → waiting panel (never the invite) → «‹ Về màn đầu» → «Rời phòng?» → Thôi → still on the panel → host Nhận thân phận → both in the game → ☰ = co-op menu, ✕ back → guest Rời phòng confirmed → host freeze «Hảo hữu đã rời phòng». Frames looked 3×: no cut text, no overflow. |
| reviewer close scan (mid-play, random #modal/.dlg/#kpop closed by own ✕/Lui, real taps) on 112fab25 | 0 leaves; P9 covers it on the head |
Laws: 1 n/a · 4 no number · 7 wording = existing kit confirm lines (VANPHONG ok) · 9 kitConfirm + existing kit panels, no new part · 11 one confirmed leave for every co-op leave button + landed() for every way in · 12 Fold + iPad videos · 13 check line · 14 old join() guard and old leave lines replaced in place · images: none in git.
LAND: branch = 04a45597 (B co-op land head) + F1 + fix-7 r3 → lands AFTER coop-week-wait-land and INSTEAD of fix-7 r3 (or after it). Without 04a45597: jcooplobby.js / j74.js / jslots.js are identical on LIVE 02f564ae, 5e013076 and 04a45597, so the game diff (git diff 04a45597 a44e3cbb -- dev/build) applies cleanly onto LIVE; only dev/test/lib/coop-clear.js conflicts — a LIVE port is possible but needs its own rebuild + gate run (not done here). Worker deploy: NO.

**LAND READY review/coop-f1-rejoin a44e3cbb41e6125db5a888e768dff9f3b32f6001**
