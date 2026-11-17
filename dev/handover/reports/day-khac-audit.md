PRIORITY #1 CHECK ('khắc còn lại|day-khắc|time-spill|khacLeft'): OD 3 (L852, L886, L1473) + OD tail '(17/11 ~16:45Z real' | main 11 (time-spill j76 live; jrest.js:5/19 'khắc còn lại của buổi'; jtut.js:254) | review/* 3 (incl. review/ag-all-2 = C-AG NPC khắc code) | claims: this order only (row "DAY-KHẮC AUDIT", D)

# DAY-KHẮC AUDIT — worker report (review/day-khac-audit)

START_CTX ≈ 8 % of the window (estimate). Branch `review/day-khac-audit`, cut from live origin/main 086f1d6.
Rules read verbatim: OD L852, L886, L1473, OD tail 17/11 ~16:45Z (s34), START_CORE, START_WORKER, topic/time-calendar, topic/wording.

## What was already right (reused, no second system)
The live time-spill core j76 (review/time-spill, merged 14/11 + sweep 16/11) already holds the rule for the player:
`can()` / `dayFit()` / `dayWhy()` / `j76need()` (kit Cần chip) / `whyTime()` / `walkSpill()` all read the khắc left in the DAY
and spill into the next buổi. The existing guard `dev/test/time-spill-guard.js` (46 runtime checks) passed on live main.
So this audit kept ONE function — **`j76left(b,u)`** (j76.js:17) = khắc left in the DAY from buổi b with u khắc used — and
made it callable for an NPC row too (`j76left(S.buoi, kh)`), instead of adding anything new.

## Scan (dev/build, the 308 live modules of assemble.py; j80.js is not built)
Patterns: `used+N<=4 / >4`, `4-used`, `BAL.time.khac-used`, `Math.min(N,4-used)`, `used>=BAL.time.khac`, `walkOk(`, `can(`,
`J95.KH` / `kh<4` loops, "không kịp", "kịp", "của buổi", "còn lại", `!can(N)?"hết khắc"`, plus a runtime probe at
buổi chiều with 1 khắc left (Dư đồ map + list, every place, deck, rest card, event Cần rows) and at buổi tối.

## Before / after per call site
| file:line (main) | check | before | after |
|---|---|---|---|
| j76.js:14→17 | THE day function | `j76left()` only for the player's current buổi | `j76left(b,u)` — same function, optional buổi/khắc so NPC rows use it (default = player) |
| j76.js:34 (j76need) | kit Cần chip, window-bound act at buổi tối | "không kịp xong trong buổi tối (cần 2 khắc)" | buổi tối = end of day → "hết khắc trong ngày (cần 2, còn 1)" |
| j76.js:72 (whyTime) | reason words, window-bound act at tối | "không kịp xong trong buổi tối" | "hết khắc trong ngày" |
| **j41.js:99 accSpot (Dư đồ map)** | open place whose walk is longer than THIS buổi (owner OD L1418 grey) | label greyed `.off.awalk` + grey "đi 2 khắc" although the walk spills (Đức Thọ cung, Cảnh Phúc, Khải Tường, Hàm An at chiều 1 left) | plain open label, `<em class="ok">2 khắc · sang buổi tối</em>`; grey only when the DAY cannot hold it (tối) or the place is closed on arrival (Ngự hoa viên "đóng cửa tối"). Tap still opens the kit card "Đi (đến nơi vào buổi sau)" |
| **j41.js:110 (Danh sách tiles)** | same, list view | tile `.awalk` grey + red chip | plain tile when the walk spills |
| j9.js:86 (Danh sách header) | player words | "Đi được khi đường đi không quá số khắc còn; đến nơi hết khắc thì chỉ kịp xem ai ở đó." (per buổi) | "Đường xa hơn số khắc còn trong buổi thì đi tiếp sang buổi sau, miễn trong ngày còn đủ khắc; riêng buổi tối không đi qua đêm." |
| jrest.js:5/17/19 (Nghỉ ngơi dưỡng sức) | rest length / min khắc / words | `4-used` (typed 4), "dùng hết số khắc còn lại của buổi", min check on `BAL.time.khac-used` | `j76left(restDsB(), …)` (the rest of the DAY from buổi tối), "dùng hết số khắc còn lại trong ngày", min check on `j76left()`; at tối 1 left → "Hết khắc trong ngày" |
| jtut.js:228 (Chơi thế nào row) | tutorial | "mỗi buổi N khắc, việc nào cũng tốn khắc" | + "làm được hay không là tính theo tổng số khắc còn lại trong ngày, việc dài hơn buổi thì kéo sang buổi sau" |
| jtut.js:254 (step Buổi · khắc) | tutorial | "… Việc nào cũng tốn khắc; hết khắc thì qua buổi." | "… Làm được hay không là tính theo tổng số khắc còn lại trong ngày: việc dài hơn số khắc còn trong buổi thì kéo sang buổi sau; riêng buổi tối không kéo qua đêm." |
| j72.js:176 (dịch vụ / Q72 reason) | reason after `!can(k)` | "hết khắc" | `whyTime(k)` (day words / Sức words) |
| jthaiy.js:92 (Thái y pay road) | reason after `!can` | "hết khắc" | `whyTime(khPay)` |
| jgift.js:196 (court day walk) | reason after `!can(2)` | "hết khắc" | `whyTime(2)` |
| jkc2.js:455 (HUD buổi chip) | one core | `${4-used} khắc` | `${BAL.time.khac-used} khắc` (label only) |
| j95c.js:80 (next-buổi bind) | one core | `kh<4` / `kh>=4` | `J95.KH` |

Checked and already right (no change): j1 `can` (replaced by j76 day `can`), j15 `whyTime` (wrapped by j76), j19:94 guessWhy (wrapped j76:92),
j9 walkOk/walkSpill/walkGo/walkLate/walkBlock, j21 visit/see (walkGo spill), j42 servant walks (dayFit), j77 accState/j77Bound/j77WalkWhy
(dayFit/dayWhy), j63/j79/jclose kaTimeNeeds (j76need), jmen menKh + jtsb tsbKh (j76spills), jagent agKhLock/agSpendKh (day `can`),
pbtn "hết khắc" reasons (j15:65, j41:46/47, j72:255/271/278, jgift:160–166/229, jtabs:102/105) — rewritten to `whyTime` by the j76 pbtn
wrapper at render; HUD "còn N khắc" chips (j6, j27, j42, jkc, jk3) = the buổi label only, no gate; j25/j6 `used>=BAL.time.khac` = the
buổi turns when it is used up (not a gate); jcoopworld/jnight `used=BAL.time.khac` = buổi transition.
Story text "không kịp" (j67, j68f, j71, j72:553, j95, jreign, jroute, jts, jrd_*, jnroadm) = narrative words, not time checks.

Kept per buổi BY NATURE (justified):
- "Nghỉ ngơi dưỡng sức" (only window-bound deck card, `a.b` = buổi tối): tối is the last buổi, so its window IS the rest of the day — now said in day words.
- Học với Thái hậu (j76:78 artTabHTML, sáng-only lesson, 2 khắc): the Thái hậu teaches in the morning only (place/time tied, like thỉnh an in OD L852 (b)); shortfall says "không kịp xong trong buổi sáng".
- Buổi tối never spills into the next day (OD L852 "ALL khắc left in the DAY").

NPC side on main: an NPC deed is one khắc in one row slot (jagent agSlot, one deed per buổi) — nothing on main checks an NPC
length against the buổi. The rule for every NPC length check (incl. C-AG's new code) is `n <= j76left(buổi, her khắc)`.

## Tests
`node dev/test/time-spill-guard.js <root>` (quickcheck step 1c) extended — 52 runtime checks, PASS on this branch; on live main the new
checks FAIL 8 (Dư đồ map + list grey spill places tn, r2, r3, r5):
- her act at buổi chiều, 1 khắc left, needing 2 → allowed, spills (existing checks 0/1: can, dayFit, greeting, gate greeting, carry into next buổi);
- last khắc of the day (tối, 1 left) needing 2 → refused, "hết khắc trong ngày" (check 0 + rest card check 8);
- NPC (two-way): `j76left(chiều, kh 3) ≥ 2` allowed, `j76left(tối, kh 3) < 2` refused, and NPC rows = player rows for every buổi × khắc (check 9);
- Dư đồ: no place whose walk spills is greyed, map + list (check 7);
- static: new patterns `four` (typed `4-used`) and `ofbuoi` ("khắc còn lại của buổi") — 0 hits allowed;
- old save loads: quickcheck (old save from the live build).

## Gates (on 4408ef0a91ccb7776b3e83a78c7c5e0b4719b641)
- one-core-guard / rules-one-source / kit-conform / coop-one-world: CORE GATES PASS (quickcheck step 1b).
- time-spill guard (extended): PASS, static + 52 runtime checks; the same guard FAILs 8 on live main (greyed spill places).
- quickcheck.sh: PASS. Open 1947 ms, old save from the live build loads and plays a buổi. Perf median of 3 runs, new/live: render 205/204 ms, tab 368/372 ms, tasks>200ms 15/15,
  **buổi 1178/1018 ms (+16 %)**. The script passed it, but it is over the brief's +5 % line. The runs are noisy (new 1317/1178/880, live 978/1432/1018), and no change sits on the buổi path
  (only text, the Dư đồ label regex and j76left arguments). The reviewer should rerun perf.
- coop-e2e: 63/63 passed on this branch (live Worker, Fold host + iPad guest, solo + old save), so it is no worse than live. No co-op code was touched.
- Fold 755x1000@2 + iPad 1180x820@2: shots taken at buổi chiều with 1 khắc left (dev/tools/shots.js with the state set) and looked at. There is no overlap, no page error and no horizontal overflow; header,
  side cards and the result toast fit. The map art and labels did not load in this sandbox (CDN pictures blocked), so the label states are checked in the DOM by
  guard check 7 (map + list), not by picture. No images were committed or uploaded.


## FOR C-AG #3 (review/ag-all-2 @ 41b98bf93d1512a7d917f69088ade4b3ef2368ce — NOT edited; fix in your r2)
Your 2d2 sweep (3c716a2a) already lets NPC deeds spill (agSpan p.sp, agSpill) — good. What still breaks "ONE function = total khắc left in the DAY":
Rule (OD L852/L1473 + 17/11 ~16:45Z): an NPC deed of kc khắc that starts at buổi b, khắc kh may run when `kc <= j76left(b, kh)`
(j76.js:17 on review/day-khac-audit — the SAME function the player's can/dayFit/j76need read); it spills over as many buổi as needed; only buổi tối has no next buổi.
| ag-all-2 file:line | what breaks the rule | fix |
|---|---|---|
| jagday.js:354–355 agDayRoom / agFitDay | a SECOND day function: `kh+kc-1 < J95.KH + (spill ? J95.KH : 0)` = "this buổi + the next one" (BAL.ag.kh2.spill), not the khắc left in the day; at sáng/trưa it refuses deeds the day can hold, and it is not the function the player reads | `function agFitDay(kh,kc){return kh<J95.KH&&Math.max(1,kc)<=j76left(S.buoi||0,kh)}` (after review/day-khac-audit lands; drop agDayRoom / BAL.ag.kh2.spill), agSpill carrying `sp>J95.KH` over more than one buổi like j76carry |
| jagday.js:268 (re-decide) | `if(k0>=J95.KH-1)return 0` — no re-decide at the buổi's last khắc although the day goes on | refuse only when `j76left(S.buoi,k0)<1` |
| jagday.js:292, 301–304 (tell / news due) | news whose khắc passes the buổi end goes down a different path (`q.due>=J95.KH` → agTouch re-plan) | carry `due-J95.KH` into the next buổi's record (same clock as the deed spill) |
| jagday.js:339 (presence check) | `k1=Math.min(J95.KH-1,agK1(p))` ignores the spilled part (p.sp) | include the spilled khắc of the next buổi |
| jagknow.js:49–51 knWin (tin báo window) | window `[p.kh, p.k1]` / `[kh, KH-1]` ends with the buổi even when the deed spilled | end = the deed's real end (p.sp in the next buổi) |
| main files your branch also carries (j15:17, j9:84/95, j72:176, jrest:5/19, j41 Dư đồ grey) | old per-buổi words / grey | taken from review/day-khac-audit when you rebase (your jrest change is on restLat lines only: no conflict) |
Fine as is: agCanDay/agWhyDay (dayFit/dayWhy), jagknow.js:388/399 (dayFit), agSlot / jagday.js:146 (a START khắc is picked inside this buổi; length is agFitDay's job).

SẴN SÀNG KIỂM 4408ef0a91ccb7776b3e83a78c7c5e0b4719b641
