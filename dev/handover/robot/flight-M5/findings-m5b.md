# findings-m5b (build 0756a05b; LIVE 9f72524b recheck pending)
1. [0756a05b] On resume (turn 27 wk1 buoi3, loaded from save) modal «Nhờ thái giám tìm thú nuôi» («BÁO») showed one pet-card image, no name/price/buy button; ✕ and backdrop tap did NOT close it (bot looped ~3 min). Cleared by a fresh page load. Likely a shop modal reopened from save state with no usable buttons. Repro not yet re-tested; LIVE check pending.
- relaunch 17:47Z: worktree switched 0756a05b -> 17dfa64d (MAIN 144 order); life age 23 rank 3 turn 66
- relaunch 19:47Z on 351122ba
- [351122ba] SAVE-DRIFT at relaunch: turn 101/1/1 at stop -> loaded turn 94/0/0 (age 26) = ~7 game turns lost (autosave not per action; same as M5 finding 3). Container also paused ~30 min (bot clock 0.9m vs 30m wall).
- [351122ba] PAGE HANG ~20:00-20:37Z: bot idle, chromium renderer ~58% CPU, no log lines for ~35 min after 'Sang buổi' -> 'Hành sự' (turn 94/0/0, age 26, rank 2). Killed + restarted (reload). Cause unknown; recheck if recurs.
- relaunch 22:37Z on 5e013076
- [5e013076] UI: event dialog «Sai … đi dò la» (picker card «Đáp ứng / Phó Nhã Ninh»): card is clipped at the dialog bottom (needs dialog scroll) and the centre of the card is the portrait = no action; bot looped ~30 min tapping centre. A human would tap the title/scroll. Check on LIVE whether the whole card is tappable (UX: centre tap does nothing).
- [5e013076] DAWN-WAIT ~6 min: after 'Sang ngày mới' (turn 190/0/0 age 34) screen 'dawn' showed nothing tappable (els 52, q 3), chromium ~115% CPU; recovered only via bot true reload (save-drift 190->189/2/3). Possibly slow dawn render/animation at heavy save size (ls-dump 5.2 MB). Not a hard lock.
- NEW LIFE run 04:12Z on b69f0f5f: La Lưu Ly (thd), screenshot-on-death fix active
- [50f8a13b] REBIRTH NOT PERSISTED: after death at 193 (age 34) the game rolled to a new life (La Lưu Ly), but a bot relaunch/true reload ~2.5 h later loaded the PRE-death dtq save (turn 190/0/1, alive, age 34). The death and the new life were never saved (autosave lag) -> a dead life can come back after reload. Same family as save-drift; MAIN 151 routed it to 'B save job'. Replaying: same SEED so death at ~193 expected; ENDSHOT fix will capture the ending.
- switched worktree to f009e1a6 04:33Z; dtq life alive turn 199 age 34 (did NOT die at 193 on replay: death not deterministic w/ same seed)
