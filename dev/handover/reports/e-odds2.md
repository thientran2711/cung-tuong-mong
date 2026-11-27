# E-ODDS2 — raw odds words in player text → the 7-band ladder (branch review/e-odds2, base review/e-f4fac 4fd3bf42)

PRIORITY #1 CHECK: OD 0 | ledger 0 | claims 3 | reuse: e-f4fac form «(cơ may: ${word(o)})» (j3:185/186, j55:124/125/137), odds-offladder-scan.
Laws touched: 7 (ladder words), 4 (word(o) = KIT_ODDS = BAL.odds.cut, no typed number/word), 11 (scan + tables), 16 (side-chance scale untouched, owner question).

## Scan: dev/test/odds-word-scan.js (new)
Source scan of dev/build/j*.js (non-comment lines): FAIL on «khả năng …${chanceLo(», typed «khả năng đổi ngôi / rất thấp / thấp / vừa / cao / rất cao», «xác suất/tỉ lệ/tỷ lệ» outside the allow-list; counts the chanceW/chanceLo side-chance calls (owner question) and the not-a-roll hits. Typed «NN %» in player strings: hand grep, 0 hits outside CSS/comments/design notes.
Before (e-f4fac base): exit 1, 6 FAIL. After: exit 0, 0 FAIL. Mutant (jpq:102 re-typed «khả năng ${chanceLo(o)}»): FAIL 1, exit 1 (restored).

## Table 1 — roll-outcome lines FIXED (6 sites, 2 files)
| file:line | before | after | kind |
|---|---|---|---|
| j51.js:66 | Hoàng thượng phế X, lập Y làm Thái tử (khả năng đổi ngôi: ${chanceLo(p)}) | (cơ may: ${word(p)}) | roll-outcome fixed |
| j51.js:67 | Hoàng thượng giữ X ở ngôi Thái tử (khả năng đổi ngôi: ${chanceLo(p)}) | (cơ may: ${word(p)}) | roll-outcome fixed |
| jpq.js:102 | Tông nhân phủ tra xét Ngự thiện phòng … (khả năng ${chanceLo(o)}) | (cơ may: ${word(o)}) | roll-outcome fixed |
| jpq.js:107 | Vương gia đăng cơ … (khả năng ${chanceLo(o2)}) | (cơ may: ${word(o2)}) | roll-outcome fixed |
| jpq.js:108 | mưu đoạt ngôi không thành (khả năng ${chanceLo(o2)}) | (cơ may: ${word(o2)}) | roll-outcome fixed |
| jpq.js:114 | tra xét cái chết của Thái hậu (khả năng ${chanceLo(I.o)}) | (cơ may: ${word(I.o)}) | roll-outcome fixed |
(Already fixed in e-f4fac, untouched: j3:185/186, j55:124/125/137.)

## Table 2 — LEFT FOR OWNER (law 16, Q1: OD:L221/L228 side-chance scale Rất thấp…Rất cao)
~101 sites (scan count, includes 2 definitions in j1.js:101/102 and 2 «:"khả năng thấp"» guard fallbacks jaudit:271, jweather:59): status cells, Được/Mất/Kèm rows, hints, Sổ ghi — all chanceW/chanceLo/chanceLvl. Not changed. Includes two Kèm rows that read «khả năng ${chanceLo(…)}» inside an option's Kèm line: jpq.js:126 and jpoison.js:79 (allow-listed in the scan with signature «kèm: hỏng mà bị lần ra (khả năng»). If the owner puts the Kèm/status scale on the ladder: one edit in j1.js chanceW/chanceLo, plus these two lines.
Also on the same scale, prints a chance for a preview not a result: j67.js:137 «có thể xoay chiều: ${chanceLvl(100-w)}», j75.js:230, jcycle.js:137, j6.js:36, j64.js:6, jk3.js:139 (HUD).

## Table 3 — not odds of a roll (11 scan hits, no change)
j64.js «khả năng có thai cao hay thấp» (mechanic help, no value); j72sd/jchatl/jselxd/jrdcsd/jrd_bd story dialog («khả năng» = ability, «cơ hội» = chance in prose); j13.js lot poems «cơ hội lớn»; j23/jtq14/jtut/j79/j84 «cơ hội» wording of the kit ladder title; jkitpage/jplfs/jopic «tỉ lệ/tỷ lệ» = aspect ratio; jbal2/jbancung/j97/jsmg design comments.

## Tests (rebuilt with assemble.py; index.html/sw.js/assets.json not committed)
node --check j51 jpq OK. odds-word-scan exit 0. odds-offladder-scan exit 0 (purge text «cơ may: Khó lường», page errors 0). facact-log-scan exit 0 (silent 0). cold-faction ALL PASS 20. odds-unknown-scan unchanged (exempt 18, jdf.js:113). fac-parity-play 4 FAIL and role-parity-drift2-play 1 FAIL = identical to e-f4fac/LIVE (pre-existing, not caused). npc-roads-fix-scan needs a URL arg and is untouched by this change (not run).
Not played: the j51 Thái tử line and the jpq lines were checked by source scan + the shared word() path the purge-text play already proves; no UI change.
