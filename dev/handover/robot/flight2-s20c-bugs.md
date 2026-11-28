# flight2-s20c bugs

- [dead] x2 close button has no effect: .dlg «Danh hiệu mới» «Để sau»
- [dead] x1 close button has no effect: .dlg «Danh hiệu lên bậc» «Để sau»
- [game] x6 SAVE REWIND: the game went back to an older save (the buổi since its last good save are lost)
- [game] x1 item pick grid: the confirm «kipgo» stays off-screen after 8 real scrolls ()
- [game] x481 QuotaExceededError: the game save no longer fits localStorage (j6 save() swallows it: every later save is lost)
- [game] x1 SAVE STALE: the stored save stopped following the live game (QuotaExceededError)

## Illness scan (post-life, per F ROOT 7: no pick= on this life; harness has no illness logic)
- Her own illness: «Tâm bệnh · nặng» (year 4 turn 40) and «Tâm bệnh · nguy kịch» (year 4 turn 41): dialog shows ONLY «Lui», no cure road / no Tĩnh dưỡng / no Truyền thái y -> BUG per F ROOT 7 rule (illness dialog with no cure road).
- «Nổi mẩn» (year 8): has «Mời thái y kê thuốc» (cure road present, ok). «Thái hậu bệnh nặng» (year 4) is the Queen Mother ill, options present. «Cáo bệnh» options on invitations are exits from events, not cures.
- Tĩnh dưỡng / Truyền thái y never appeared as a label in the run log (0 hits).

## Save loss (IMPORTANT, game)
- QuotaExceededError: save reached 5.37M chars at buổi ~2790; 328+ setItem failures after that, SAVE STALE, 6 SAVE REWIND. Build pinned 1b04f52f65fd (LIVE bd47c753 has the B save-stack fix). Life ended buổi 2871 with the stored save frozen at ~buổi 2790.
