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

## Next steps
1. Fix case 2 ordering in coop-timer.js; run ≥3 times (one browser pair at a time):
   `python3 dev/build/assemble.py && node dev/test/coop-timer.js .tmp/rN`
2. Look at chip shots (755x1000@2, 1180x820, 844x390) in .tmp/rN.
3. KIT.md §69 section (kitCoopClock); ts-oldsave: `node dev/test/ts-oldsave.js <old url> <new url>`; coop-e2e once for regression.
4. Rebuild site (dev/site/build_site.sh), commit, push, report "SẴN SÀNG KIỂM".
