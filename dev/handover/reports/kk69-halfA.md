# K-OPTS-READER half A — before/after runs (KK69 subagent; PARTIAL at 08:36Z, stopped on MAIN 189 order)
AFTER = kk69or 4a0d9669 (half A tests on lib), BEFORE = 09e10cd3. Done: AFTER 32 / 54, BEFORE 10 logs. Files missing from AFTER must be run by KK70 (runner idea: node <test> per file from the worktree root, 900 s timeout, act-audit 1800 s, ≤3 parallel, coop ≤2, time-spill-guard alone; assemble.py first).

## AFTER sum.csv
```
_fe_dbg.js,1,140,KOPTS reads 15 · blind-before 0 · plaques 0,KOPTS reads 15 · blind-before 0 · plaques 0
act-merge-j3-look.js,0,46,KOPTS reads 4 · blind-before 0 · plaques 0,KOPTS reads 4 · blind-before 0 · plaques 0
act-merge-j3-ways.js,1,443,KOPTS reads 106 · blind-before 0 · plaques 0,KOPTS reads 106 · blind-before 0 · plaques 0
act-text-scan.js,TIMEOUT,900,[900s] con place:ttp#6 3,
act-merge-j5-kcscan.js,0,407,ALL OK,
act-split-vp.js,1,151,KOPTS reads 3 · blind-before 0 · plaques 0,KOPTS reads 3 · blind-before 0 · plaques 0
ban-cung-shots.js,0,241,KOPTS reads 2 · blind-before 0 · plaques 0,KOPTS reads 2 · blind-before 0 · plaques 0
act-audit.js,TIMEOUT,1800,[1783s] con place:thu#4 11,
cb-gate.fn.js,0,66,},
cb-greet.fn.js,0,24,},
cb-ton.fn.js,0,38,},
bongloc-coop-catch.js,TIMEOUT,900,"ok   guest: after the merged week the host holds her bạc + her Lót tay (one world) {""her0"":{""name"":""Đổng Lạc Anh"",""bac"":120},""host"":{""bac"":350,""tip"":2,""inv"":42},""phone"":{""bac"":350,""tip"":2,""inv"":42}}",
charge-taps.js,0,133,page errors: 0 [],
cn-force.js,0,203,KOPTS reads 81 · blind-before 3 · plaques 3,KOPTS reads 81 · blind-before 3 · plaques 3
bongloc-coop.js,TIMEOUT,900,"ok   guest: the other seat's bạc untouched {""oth0"":{""name"":""Từ Chiêu Hoa"",""bac"":415},""oth1"":{""name"":""Từ Chiêu Hoa"",""bac"":415}}",
coop-b1.js,2,77,KOPTS reads 50 · blind-before 0 · plaques 0,KOPTS reads 50 · blind-before 0 · plaques 0
coop-b2b5.js,2,69,KOPTS reads 42 · blind-before 1 · plaques 1,KOPTS reads 42 · blind-before 1 · plaques 1
coop-ban-cung.js,1,96,KOPTS reads 63 · blind-before 1 · plaques 1,KOPTS reads 63 · blind-before 1 · plaques 1
coop-bot-x.js,1,153,KOPTS reads 29 · blind-before 0 · plaques 0,KOPTS reads 29 · blind-before 0 · plaques 0
coop-bot.js,1,140,KOPTS reads 80 · blind-before 3 · plaques 3,KOPTS reads 80 · blind-before 3 · plaques 3
coop-chat.js,1,106,KOPTS reads 11 · blind-before 0 · plaques 0,KOPTS reads 11 · blind-before 0 · plaques 0
coop-ask-srvprobe.js,TIMEOUT,900,ok   p0: week advanced for both,
coop-cyc.js,2,38,KOPTS reads 4 · blind-before 0 · plaques 0,KOPTS reads 4 · blind-before 0 · plaques 0
coop-cyhold.js,2,36,KOPTS reads 4 · blind-before 0 · plaques 0,KOPTS reads 4 · blind-before 0 · plaques 0
coop-dbg-hostdeath.js,1,55,Node.js v22.23.5,
coop-cold-faction.js,TIMEOUT,900,"FAIL other seat strikes B off the roll (facAct gach) {""off"":false}",
coop-dresscode-scan.js,TIMEOUT,900,"trans 0 B1 {""k"":""tram_maudon"",""lender"":""me"",""to"":10,""wk"":0} []",
coop-dresscode.js,TIMEOUT,900,"ok   2 guest: item detail loan row «Mượn của …» [""Mượn"",""của Hoàng hậu Lưu Hi Nguyệt · qua tuần sau trả"",""n""]",
coop-e2e-tr.js,TIMEOUT,900,"FAIL week 1: ipad advanced {""co"":{""code"":""74N5"",""seat"":""b"",""week"":0,""online"":{""a"":true,""b"":true},""ended"":{""a"":false,""b"":false},""on"":true,""frozen"":false,""waiting"":false,""world"":true},""sent"":-1,""pend"":f",
coop-emo-seat.js,1,286,KOPTS reads 45 · blind-before 1 · plaques 1,KOPTS reads 45 · blind-before 1 · plaques 1
coop-ending-screens.js,1,85,Node.js v22.23.5,KOPTS reads 140 · blind-before 0 · plaques 0
coop-errand.js,0,22,KOPTS reads 2 · blind-before 0 · plaques 0,KOPTS reads 2 · blind-before 0 · plaques 0
coop-e2e.js,TIMEOUT,900,"ok   after week 1: each sees the other as a person [""Bạch Anh Ninh"",""Nhan Như Yên"",""Nhan Như Yên"",""Bạch Anh Ninh""]",
```
## BEFORE sum.csv
```
_fe_dbg.js,1,165,FAIL 5,
cb-gate.fn.js,0,47,},
cb-greet.fn.js,0,23,},
cb-ton.fn.js,0,31,},
charge-taps.js,0,105,page errors: 0 [],
act-merge-j5-kcscan.js,0,294,ALL OK,
act-split-vp.js,1,140,FAIL 10,
act-merge-j3-ways.js,1,440,"132 way runs, 3 differences, 77 noisy (old path ≠ itself), page errors 0 []",
act-text-scan.js,TIMEOUT,900,[891s] con place:dtd#6 3,
```
