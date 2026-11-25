# Co-op RERUN U2 — runner (sonnet) — 11/25/2026

Game: review/robot-coop-fix-6 c4163a93 built locally + its own Worker (wrangler dev --local, same sha). Harness: review/robot-realtap 1a29f470 (taps only, dump-on-stuck, ckpt, COOP_URL). Earlier rooms used LIVE main ca5af050 / fix-6 d16c5300 (see table). Local patch: none on 1a29f470.

## Rooms
| room | game | result |
|---|---|---|
| u2-r1 QB46 | LIVE ca5af050, harness c29a6b5b | STUCK 06:44Z: host (Fold) endless empty «Tâm trạng · Công chúa Ninh Thọ» card (known no-dedupe bug, F 06:45Z); guest waited. No dump (harness lacked it). Invalid. |
| u2-r2 CPZW | LIVE | runner process died (container), no result. Invalid. |
| u2-r3 TG9Y | fix-6 d16c5300 + local Worker | killed by me after 37 min: only ~20 buổi, host 15-min no-clock stuck on «Kính sự phòng ghi sổ» + 120+ unsticks, later host back on #title. Dumps kept on my container (stuck-1-localStorage.json both seats). Invalid. |
| u2-r4 XKG7 | fix-6 c4163a93 + local Worker | RUNNING since ~08:42Z; 09:09Z host+guest buổi 9, year 1 tháng ba hạ tuần, 0 stuck |

## Lives (valid only)
none yet — 0/41.

## Bugs / moments so far
- BUG «Tâm trạng · Phi Bạch Cẩm Sương» / «Tần Niên Vân Yên» / «Quý phi Tề Lệ Hoa»: «Lui» close has no effect (known duplicate-panel bug).
- ODD pace: ~3 min real time per buổi on co-op (both seats wait each other); a full life = hundreds of buổi => many hours per life. 41 lives cannot finish in one runner session.
- ODD: «Kính sự phòng ghi sổ» card on every morning, text identical (BORED) — «Đêm qua <rank> <name> hầu giá, Hoàng thượng rất vừa ý.» even in the first week.
