# PROGRESS · review/balance-pass (base origin/main eb7886c10)

Brief (coordinator 15/11): measure and tune balance with bots on current main; targets (OWNER_DECISIONS 11/14 + 15/11 15:10Z): early death
~40–45 %, Hoàng hậu ~32 %, childbirth death 8–12 % per birth; hint-reading play clearly beats random; always-first loses; pace 16 khắc/week,
HH after ~188 tuần; no route to HH/Thái hậu/nữ đế broken. Also: 2 opt-render failures on main.

## Done
| what | where |
|---|---|
| Night silver through the ONE ân thưởng path: `BBAC.night` = getter on `BAL.nightBac` (was a second bestow wrapper adding silver after the tray counted its coins: stray "Bạc +20", no award record) | jecon.js |
| opt-render D: Bạc in Mất fails; Bạc in Được only as the night's real ân thưởng (S.awards, = BBAC.night) | dev/test/opt-render.js |
| jty "Ra ngoài khi mặc trung y?" (confirm), "Bị giật y phục giữa đường", "Điềm báo" (acknowledge cards) flagged `act:1` — opt-scan --fail 3 → 0 | jty.js |
| Honest deadly hint: food gift "Nhận ngay" said only "món có độc thì ta dùng phải" though Hạc đỉnh hồng kills on the spot → "độc nặng thì mất mạng", risk "liều" (same card for every food gift, no tell) | jpoison.js |
| Harness: see "Bots" | dev/measure |

## Bots (what changed in the harness, and why)
- `inty.js` — bots never dressed. Once robbed / without a robe, every walk showed "Ra ngoài khi mặc trung y?" and inpage4 retried the
  same place forever (time stood still; lives ended as TIMEOUT). Now a bot in trung y puts on a robe from her chest (player act
  `wdWearUI`, choice = NPC rule `earnFromChest`), and a place whose walk-out card showed is not retried that buổi.
- inpage4 + inpage6 `BAD`: "Đẩy con nàng xuống hồ", "Đẩy nàng xuống hồ sen", "Ngáng chân" — the caught penalty of these acts is not in
  the card's numbers, so the bots did them ~26 times a life, were caught each time, lost ~400 Đức and every promotion.
- inpage4 + inpage6: make up each morning (the jtoil "Điểm trang" card; without it "Thái hậu chê dung nhan" every week).
- inpage4: sits the promotion exam when it opens (as inpage6; it never did, so evbot lives could not rise past the exam rows).
- Speed on the loaded shared box (load 45–60 on 4 cores): `reducedMotion:'reduce'` (the game's own reduce CSS; the software GPU process
  burned as much CPU as the page), layout-only helpers stubbed (fixTitles, k3OptCols, kitOptIsLong), MutationObserver/focus off → ~4×.
- `evbot.js`: EVLIFE1 (one life per fresh page: long pages grew past memory → "Target crashed"), EVSTOP (life ends at HH or EVCAP
  months, default 96), EVOUT partial files, last 5 event picks + hint per life, inx/inpz/inty/inpromo counters.
- `inpromo.js`: tuần blocked per promotion row, Đức lost per cause, punishments per reason.
- `pass/sens1.sh`, `pass/sensloop.sh`: one sensible life per process (inpage6 + inx/inpz/inty/inpromo, HHSTOP), restarted until time is up.
- `anpass.py`: target table with 95 % Wilson intervals (`ev` for evbot files, `sens` for runb files).

## How to run
```
python3 -m http.server <free port> --bind 127.0.0.1      # worktree root, serves index.html (built site)
EVLIFE1=1 EVSTOP=1 EVOUT=<dir>/b EVPAR=3 NODE_PATH=$(npm root -g) node dev/measure/evbot.js http://127.0.0.1:<port>/index.html 5000 hint,rand,same <seed> 1
bash dev/measure/pass/sensloop.sh <abs path>/index.html <dir>/s <origin offset> <seconds>     # EXTRA='Object.assign(BAL,{...})' for knob trials
python3 dev/measure/anpass.py ev <label> <dir>/b_*.json ; python3 dev/measure/anpass.py sens <label> <dir>/s_*.json
```

## Results
(see the final report section below; filled at the end of the pass)
