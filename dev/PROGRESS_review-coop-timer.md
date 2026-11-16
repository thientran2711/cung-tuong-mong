# PROGRESS review/coop-timer — co-op buổi clock (owner 15/11 ~21:25Z, ~22:55Z, ~23:10Z, ~23:20Z), KIT §69

## OWNER TIMER RULES (all implemented in dev/build/jcooptimer.js)
1. One shared countdown per room buổi = the MOST a buổi lasts. Default 5 phút (BAL.coopTm.buoiMs 300000); the host picks 3 / 5 / 8 phút
   in the lobby ("Mời hảo hữu" screen, kitCoopLenRow; localStorage "ctm-coop-len").
2. "Sẵn sàng" (#next in co-op) ends her buổi; the friend sees "Hảo hữu đã sẵn sàng" (chip + kitLine). Both ready → advance at once.
3. Time out → both advance: day buổi via COOPW.forceBend (even under an open dialog / mini game; her step waits via CW.pendBuoi, no choice cut,
   nothing twice), tối via nextBuoi→endTurn→end once she has no dialog open. Overdue: no-choice / single-road dialogs read for her after
   readMs; real choices never made for her.
4. Pause ONLY for mini games (S.mg / #ov), cap BAL.coopTm.pauseCapMs (60 s) per buổi (23:20Z override: NOT for dialogs, rewards, gifts,
   edicts, night animations). The waiting friend sees only "Hảo hữu đang dở tay, xin đợi".
5. "Tạm dừng" chip button: holds the game for BOTH until the pauser presses "Tiếp tục" (kitCoopHold kit panel; friend: "Hảo hữu xin tạm dừng").
6. Lag-safe: host owns an ABSOLUTE deadline in host time (Worker has no time message; host time = server time stand-in); guest keeps a
   clock offset from ping pairs (tp/tq over the act relay, min-rtt of 8); stop/start sent at once with remaining ms; graceMs 1.5 s at 0
   before the step. Measured gap between the two screens under 300–800 ms lag: 96–124 ms.
7. Reconnect / refresh: host's clock rides on its `pos` (tm) → the room snapshot restores it on either seat; host also keeps localStorage
   "ctm-coop-tm". Built on fix-float r8 (merged @677e54e6b: CW.wkIn, bend resend).
8. Clock stands still (no budget) while the room is frozen or a player chooses her thân phận (Luân hồi / roulette / death / title).


## State (WIP pushed)
- `dev/build/jcooptimer.js` (new, assembled right after jkitpage.js): host-authoritative shared clock per room buổi; "Sẵn sàng" (#next label in co-op);
  friend-ready chip + kitLine "Hảo hữu đã sẵn sàng"; pause while a player has a dialog / mini game (cap BAL.coopTm.pauseCapMs); time out →
  COOPW.forceBend (day) / nextBuoi→endTurn (tối) when no dialog; overdue: info / single-road dialogs read for her after readMs, real choices never;
  reconnect: host localStorage "ctm-coop-tm" + guest "have" copy, guest "ask" → clk. Messages over the act relay {t:"act",k:"ctm-tm",mode:clk|st|ask|have} (no Worker change).
  Kit part kitCoopClock (chips over #next, #kctm) + KIT_SAMPLES §69.
- `dev/build/jcoopworld.js`: only an export block after `CW.toCanon=…` (isWaiting, isFrozen, lockNext, forceBend). Away from fix-float (nightEnd near bend) and coop-pets lines.
- `dev/build/jbal2.js`: BAL.coopTm {buoiMs:120000,pauseCapMs:60000,readMs:8000,syncMs:4000}.
- `dev/test/coop-timer.js`: cases 1 both ready early, 2 AFK timeout, 3 mini game pause+cap, 4 dialogs at tối timeout, 5 guest+host reload, 6 single-player.
  Run 1: 40/41 (only fail = test ordering in case 2: screenshots ate the shortened clock before the chip check; fix: shots first, then setTm/reset, then wait for chip).

## Round 2
- Merged origin/review/fix-float-r8 @677e54e6b (coordinator order): conflicts resolved = assemble (main list + jcooptimer + jkrel/jint/jnight
  at fix-float's places), KIT.md (both), j84 (main's relation rules, then fix-float's), built files rebuilt (build_site.sh).
- Clock stands still (no pause budget) while either player chooses her thân phận / is dead / on the title (st.lf): run 2 showed the
  default clock running out during the opening Luân hồi.
- Run 2: 32/35 (setup did not wait for Luân hồi; case 3 then started at tối; case 5 key check) → test fixed: waits for both in game, prints keys.

## Round 3 (owner ~22:55Z additions)
- Lag-safe clock: host owns an absolute deadline in host time (the Worker has no time message; host time stands in for server time);
  the guest keeps an offset to host time from ping pairs over the act relay (tp/tq, min-rtt of 8); start/stop sent at once with rem;
  graceMs 1500 before the step. Host's clock rides on its `pos` (tm) so the room snapshot restores it; host also keeps localStorage.
- "Tạm dừng" chip button → hold for both until the pauser presses "Tiếp tục" (kitCoopHold kit panel; friend sees "Hảo hữu xin tạm dừng").
- Friend busy line: "Hảo hữu đang dở tay, xin đợi" (never what she does). Stopped clock chip: "Đợi · còn …".
- Clock also stands still while the Luân hồi roulette (#kroul) is up.
- dev/test/coop-timer-lag.js: routeWebSocket 300–800 ms each way; agree (worst gap 124 ms), mini game mid-countdown, hold, guest reload, time out: 27/27.
- Earlier: coop-timer.js 42/42 ×3 (r4–r6, before round 3), coop-e2e 59/59 (fix-float-r8 merged), ts-oldsave OK.

## Round 4 (owner ~23:10Z + ~23:20Z)
- Default 5 phút per buổi (BAL.coopTm.buoiMs 300000); the host picks 3 / 5 / 8 phút on the lobby's "Mời hảo hữu" screen
  (kitCoopLenRow, one kitRows row of chip buttons; localStorage "ctm-coop-len"; one hook line in jcooplobby body("wait")).
- 23:20Z override: the clock stops ONLY for mini games (S.mg / #ov), cap BAL.coopTm.pauseCapMs; dialogs / animations do not stop it.
- Host logs real buổi lengths (COOPW.tm.lens()); coop-e2e prints "buổi lengths (s): n median p90 max timeouts" and writes buoi-lengths.txt.
  e2e2 (bots pressing at once, loaded machine): n=16 median 1.1 s, p90 15.4 s, max 22.8 s, 0 time outs. Real human lengths need real play.
- Runs before 23:20Z change: coop-timer r7–r9 42/42 ×3, coop-timer-lag l5–l6 27/27 ×2, coop-e2e 59/59.

## Final test state (code bd9e1b0c4 and later)
- coop-timer.js 43/43 ×3 (r10–r12) · coop-timer-lag.js 27/27 ×3 (l7–l9, worst screen gap 96 / 119 / 59 ms) · coop-e2e 59/59 on the final build
  (e2e3; buổi lengths n=16 median 1.1 s, p90 16.3 s, max 23.9 s, 0 time outs — bots) · ts-oldsave OK. Shots looked at: chip 755x1000@2, 1180x820, 844x390, hold panel 844x390, busy line.

## Next steps / commands
- Real human buổi lengths need real play (bots press at once: e2e2 median 1.1 s, p90 15.4 s).
- Merge with review/coop-pets when that lands (both touch jcoopworld: mine = one export block after CW.toCanon; pets edits sendPos/onPos —
  my pos `tm` rides on top via a COOP.send wrapper, so no line conflict expected).
- `python3 dev/build/assemble.py && node dev/test/coop-timer.js .tmp/rN` (≈8 min) · `node dev/test/coop-timer-lag.js .tmp/lN` (≈6 min)
  · `COOP_OLD_REF=origin/main node dev/test/coop-e2e.js .tmp/e2e` · ts-oldsave: serve .tmp with old.html (git show origin/main:index.html) + new.html
  on one free port, `node dev/test/ts-oldsave.js http://127.0.0.1:P/old.html http://127.0.0.1:P/new.html`.
- Site: `bash dev/site/build_site.sh` then commit index.html sw.js assets.json.

## Reviewer r1 (review/coop-timer-r1, 16/11) — merged onto origin/main 3ef079f61 + live co-op fixes
- Merge: assemble = main's list + jcooptimer after jkitpage; j84 = main (fix-float r9 resolution); jbal2 keeps BAL.itd + BAL.coopTm; KIT §69 after main's sections.
- LIVE BUG "xong buổi sáng, không sang buổi" (owner 16/11) — causes + fixes:
  1. jcoop.js: after a phone sleep / app switch the socket LOOKS open (readyState 1) but is dead; visibilitychange only reconnected a closed
     socket, so her `bend` went into the dead socket and the server dropped the seat after 45 s ("Hảo hữu đã rời cuộc"). Now: on visible /
     pageshow reconnect at once when away > 3 s or nothing came in for PING+5 s, else ping and reconnect after 3 s silence; PING 10 s, SILENT 25 s.
  2. jcoopworld syncRoom: catching up with a room that stepped while she was away was skipped when a dialog was open and never re-armed
     (her next bend → badbuoi → stuck). Now onBuoi always runs (keeps pendBuoi until the dialog closes); badbuoi while the room is ahead and
     multi-step gaps catch up too.
  3. #next lock always says why: "Chờ hảo hữu…" / "Đợi hảo hữu" / "Hảo hữu đang vắng" / "Đang nối lại…" / "Đợi cùng bản mới" (was a faded
     "Sang buổi" with no word). Freeze panel: "Hảo hữu mở lại trò chơi là tự vào lại". Khắc spent + can press → .ksel on #next.
- Friend chip at the top (KIT §69.2, coordinator spec of the owner's words): face (stranger rule) + name / "Hảo hữu của ta" + ✓ Đã sẵn sàng /
  ! Đang bận / … Đang làm việc / ✕ Đang vắng / ⏸ Tạm dừng + "Còn m:ss"; inside the bar (own strip when the bar is full); tap → kit panel.
  Status pushed on change (st: bz = dialog/event/mini game open, kh = khắc left). Waiting: bottom strip "Hảo hữu đang dở tay, xin đợi" +
  "Trong lúc đợi: xem các tab, Tư trang, Sổ ghi" + kitLine once.
- New test dev/test/coop-sleep.js (dead socket → lost bend → wake; room steps while away + dialog open; server STALE → freeze panel;
  friend chip states + shots at 755x1000 / 1180x820 / 1366x1024 / 1000x755 / 844x390).
- r1 results (merged onto main 2d038139e, build 6864793d2+): coop-timer.js 43/43 · coop-sleep.js 36/36 (reconnect on wake 7 s, catch-up
  with dialog, freeze panel words, chip in every state at 755x1000 / 1180x820 / 1366x1024 / 1000x755 / 844x390 / 390x844, no overflow) ·
  coop-e2e COOP_NIGHTS=1 ×3: 57/59, 57/59, 59/59 — the only misses are the known presence flake "A frozen when B left" (main's
  PROGRESS_fix-float / khac-day note it; lobby probe: presence arrives in < 5 s); e2e now waits 90 s and dumps COOP state + presence log on a miss.
