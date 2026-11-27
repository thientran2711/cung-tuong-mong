# flight2-s2g review (honest note first)

**Honesty note.** Written by the life-runner session, which acted as a SUPERVISOR: it started the harness, switched harness files, watched logs / STATUS / CP lines and looked at a few screenshots (m-look-340, m-look-360, end.png) only to answer a foreman question. It did NOT play the life screen by screen. Art / text / pacing / emotion scores are N/A. Claims below are harness, stall, save and mechanics findings only.

## Life
- life flight2-s2g, persona rand, dev fold (755x1000), seed 2026112543, fresh profile, origin/road chosen by the harness.
- Ending: «Lãnh cung — Tuổi xuân qua đi», age 47, buổi 4150, year 29, rank 0, 35446 taps, 0 dead buttons, 0 stuck, 8 bugs (runner final line). Real taps only (jsClicks 0), no time cap, no voluntary exit road (exitPick none). Game-imposed ending, valid per rules.
- Promotion roads 244 seen / 83 taken (decree 240, select 4).
- SINGLE BUILD for the whole life: 539603bf+ (b c1633dab8e17, t 2026-11-26T21:29Z), served locally (127.0.0.1:8897), pin=1, started 00:31Z. NOT mixed-build.

## Harness timeline
- Started on 8ea10d7e (00:31Z), switched to 97e55a457 at buổi 16 (00:41Z, save restored 363794/363794). That process ran to the end (35k taps, one pid, no crash, no resume). 39c6e505 then f65d019b were checked out on disk (03:06Z / 04:46Z, buổi ~350 / ~850) per F ROOT #2 «no forced restart» but were NEVER loaded (no natural resume happened). The result header «harness 97e55a45» is therefore correct.
- pin server gap: GET /dev/vendor/pixi-8.5.2.min.js was 404 on the served root until 01:31Z (buổi ~100); fixed by copying dev/vendor/ from the pinned commit a22cf45d, no restart. Buổi 1–~100 are «degraded vs LIVE» for pixi.

## Findings
1. **SAVE FROZEN (game, major).** From buổi ~2550 (year 18) localStorage setItem fails with QuotaExceededError on key hclh-save-v2-1 (first failure at 5247844 chars). The stored save stays at 5154622 → 5222025 chars while the live save grows to 7883116; 8435 failed setItem calls; the game's j6 save() swallows the error so every later save is lost. Runner BUGs: «QuotaExceededError: the game save no longer fits localStorage», «SAVE STALE» ×5 (stored b<3000..b<3300 vs live b3800..b4100). A crash after b2550 would have restored b2550. Proof: handover a442694f dev/handover/robot/flight2-s2g-save-frozen/. Page-save freeze line ~5.2M chars.
2. **Rank 1 → 0 = «Phế phi · lãnh cung» (game state, observation).** Rank went 1→2 (year 1 turn 1), 2→1 («Bị giáng phẩm», year 1 turn 4), then 1→0 between buổi ~340 and ~360 (year 3, tháng 7→8): m-look-360 header «Phế phi · lãnh cung», Sủng 0, Danh 0. The trigger dialog was NOT captured (harness missed the 1→0 rank EVENT). Rank stayed 0 to the end (about 26 years, age 21 → 47) although a «Rời lãnh cung · Tạ ơn» dialog appeared once; the life ended «Lãnh cung — Tuổi xuân qua đi». Whether the cold palace has a way back is a design question for the owner; not judged here.
3. Gift picker «Biếu quà làm lành» (game, x1): confirm «kipgo» stays off-screen after 8 real scrolls (same family as flight2-s2f, far fewer hits).
4. Harness: BOARD «co» still in play after 6 min / 0 moves (round never ended); NO-EXIT dialog .kmov, picker stalled 79 steps / 61 s (unstuck by tapping «Ta biết rồi»); 2 blocked area taps (kemo … elements). 
5. No tab crash, no BUILD MISMATCH, no dead button, no stuck in 35446 taps; pace ~250 buổi/h even at 7 MB live save.

## Scores (supervisor view)
Not scored for art / text / emotion / pacing (not observed).

## Files
flight2-s2g.json (results), flight2-s2g.bugs.md (bug table + SAVE FROZEN notes), flight2-s2g.log, review/flight2-s2g-moments.md, review/flight2-s2g-review.md. Shots stay on the VM.
