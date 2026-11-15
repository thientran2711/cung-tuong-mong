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

## Next steps
1. Fix case 2 ordering in coop-timer.js; run ≥3 times (one browser pair at a time):
   `python3 dev/build/assemble.py && node dev/test/coop-timer.js .tmp/rN`
2. Look at chip shots (755x1000@2, 1180x820, 844x390) in .tmp/rN.
3. KIT.md §69 section (kitCoopClock); ts-oldsave: `node dev/test/ts-oldsave.js <old url> <new url>`; coop-e2e once for regression.
4. Rebuild site (dev/site/build_site.sh), commit, push, report "SẴN SÀNG KIỂM".
