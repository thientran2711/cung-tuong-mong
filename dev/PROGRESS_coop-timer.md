# PROGRESS review/coop-timer — co-op buổi clock (owner 15/11 ~21:25Z), KIT §69

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

## Next steps / commands
- `python3 dev/build/assemble.py && node dev/test/coop-timer.js .tmp/rN` (≈8 min) · `node dev/test/coop-timer-lag.js .tmp/lN` (≈6 min)
  · `COOP_OLD_REF=origin/main node dev/test/coop-e2e.js .tmp/e2e` · ts-oldsave: serve .tmp with old.html (git show origin/main:index.html) + new.html
  on one free port, `node dev/test/ts-oldsave.js http://127.0.0.1:P/old.html http://127.0.0.1:P/new.html`.
- Site: `bash dev/site/build_site.sh` then commit index.html sw.js assets.json.
