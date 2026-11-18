PRIORITY #1 CHECK ('odds cap|oddsCl|softFail|oddsSoft|Chắc chắn'): OD 7 (L1657 17:00Z, L1659 17:10Z, L1664 17:35Z + earlier) | ledger 0 | claims 8 (ODDS CAP row, D, worker session_01964izGRJM7BJPNcVuaqdcU) | main 15 (BAL.odds.lo/hi, seeMaxP, 'Chắc chắn' ladder on live) | review/* 0 besides review/odds-cap (this)
(prio1.sh in this worktree: OD 0 | ledger 0 | claims 0 | main 15 | review/* 0 — the docs files are not in the code worktree. REUSED, not rebuilt: BAL.odds {cut, lo:5, hi:95} (jbal, one-core-dup) already held the ladder's lo/hi → it IS the one cap now; odA already clamped to 5..95 by typed numbers → BAL. BAL.seeMaxP (jbal2, 70) stays: it is a tighter local cap under the global one. BAL.st14.odds [5,95] was a second copy of the cap → removed, jst14 reads BAL.odds.)

# ODDS CAP — worker report (Foreman D #10 brief D10-odds-cap.md)

Branch `review/odds-cap` (from live origin/main d5ea786). START_CTX ≈ 3 % of a 1M window; ended ≈ 20 %.

## What the code does now (ONE cap, ONE roll, ONE soft fail)
- **BAL** (jbal): `BAL.odds = {cut, lo:5, hi:95, softFail:{spend:["suc"]}}` — lo/hi are the one cap (owner 17:35Z "Trần 95%" / floor 5). `softFail.spend` = which cost keys a soft failure still spends (Sức = effort); bạc and every other cost are NOT taken (owner 17:10Z (1)).
- **j1** `roll(o)` = THE roll of every chance (hers + NPCs'): `Math.random()*100 < min(o, BAL.odds.hi)` → nothing is ever above 95 (same RNG consumption as before). `oddsCl(o)` = an act's odds clamped to [lo, hi] (odA + all 133 act-odds sites; the 126 typed `cl(…,5,95)` are gone). `oddsSure(a)` = bookkeeping (a.fix, a.open picker/panel, a.adShop, a.exam, a.aaMG minigame). `oddsCapped(a)` = formerly sure (o null/100) and not bookkeeping. `oddsOf(a)` = shown/rolled odds (capped acts → 95). `capW()` = word(hi) = **Nắm chắc**.
- **ONE soft-fail path** (j63, kit): `oddsSoft(n,c)` spends only `softFail.spend` keys of the cost, gains nothing, writes the one BẠI line "<act>: bại — người tính không bằng trời tính: chỉ uổng công[, không mất bạc], không mất gì khác." and hands it to the result card (`resultShow` shows it even when no number changed). The act's own khắc are spent by its runner as before. Hint words: `kitSoftW` / `kitCapLine`; kit model auto-adds the soft "hỏng/Mất" row to any Nắm chắc act that names no failure.
- **Runners that rolled nothing before now roll at the cap** (fail → oddsSoft): `runOpt` (every deck card + talk option without run), talk `a.run` path (j2), `chooseM` dialog options with `cap:K` (j3), deck `adRun` (jact), greet replies (jgreet), two-way deeds `twDo` (hers and NPCs'; NPC failure = nothing happens), court/reign sure choices (jreign). Buttons (pbtn etc.) with `capAt(khắc,cost)` → ONE capture listener (j63) rolls before the button's handler; failure stops the click, spends the khắc + Sức it names.
- **Stragglers routed through roll**: j68 / j70 event options (`Math.random()*100<p` → `roll(oddsCl(p))`), j95dice, jmort (early-death risk, sudden-death omen, odd-accident text), jpetlife care, NPC scheme rate (j8 `want*.04`), NPC act rate (j24), night steal (jsteal), servant mood event (j42).
- **Ladder**: "Chắc chắn" removed from every regex/ladder (j17 ODDW, j19 kitParse/oddsChip, j63 KA_ODDS/kaOdds/kaRows, j79 oddsChip/kitActMini/dilLine, jk2b, j87, jworld prefix, VANPHONG.md, KIT.md). Top word = Nắm chắc. "No word" now = no roll. (The confirm prompts "Chắc chắn?" / "Chắc chắn ghi" in jcloud / jcooplobby / j6 / j16 / j79 kitConfirm are yes/no questions, not the ladder — kept.)

## Scan (dev/tools/odds-cap-scan.py; before = origin/main d5ea786, after = this branch)
| pattern | before | after |
|---|---|---|
| sure acts `o:100` (now roll at the cap through their runner) | 88 | 72 |
| `o:100,fix:1` (bookkeeping, never rolled) | 0 | 16 |
| ladder word "Chắc chắn" in code | 151 | 0 |
| typed cap `cl(…,5,95)` | 126 | 0 (→ `oddsCl`, 133 uses) |
| raw `Math.random()*100<` bypassing roll | 8 | 1 (roll itself) |
| `>=100\|\|roll` sure skips | 5 | 5 — each now preceded by the cap roll (runOpt, j42 talk T helpers via the talk gate, twDo, rgRes) |
| roll at the cap `roll(BAL.odds.hi)` | 0 | 8 |
| button gates `capAt(` | 0 | 36 |
| dialog option gates `{cap:K,` | 0 | 10 |
Per-site transform of every old "Chắc chắn" hint: dev/tools/odds-cap-sites.py (table below).

## For the owner — what stays deterministic (never rolled) and why
Not a chance, so no odds word and no roll (owner 17:35Z: "Non-chance bookkeeping … stays deterministic"):
- **Walking / going somewhere**: Về tẩm cung thăm con, Đến gặp …, Đến cung nàng thăm, Đến chỗ hắn, Đi / Đi (đến nơi vào buổi sau), Bái kiến … rồi vào, Vào thẳng, Đến ngay (Thái hậu triệu), Theo hầu chủ, Việc chủ sai, Lui sau bình phong.
- **Fixed-price buying / paying**: Mua <món> (Nhờ thái giám mua đồ), Mua thuốc bổ, Xem hàng Nội vụ phủ, Dâng bạc vào quốc khố, hiring / changing / stopping a tutor (Mời thầy riêng, chọn thầy, Thôi học võ, Mời thầy cưỡi ngựa bắn cung, Mời thầy dạy nghệ), Gieo lại (quẻ — it is itself a draw).
- **Opening a panel / picker** (the result comes from the next step): Tặng quà, Cài đồ, Dâng tặng, Bàn hôn sự, Giao/Đổi việc phòng bị, Xem người, Tiến cử, Đổi người, Tra khảo (jhouse orders), Mệnh truyện card, Thả đèn (wish chosen next), Điểm trang, Xem sổ thị tẩm.
- **Her own orders with authority** (executed, not attempted): Hoàng hậu — Tịch thu, Ban thưởng, Ân xá, Khất bổng lộc; master to own servants — Thưởng, Phạt, Tra khảo, Tha lỗi, Che chở.
- **Decisions in an event** (choosing, not trying): Bỏ qua, Giao, Nhún nhường đáp lễ, Im lặng ghi nhớ, Phạt kẻ hầu, Nhịn, Nhận lời, Khéo từ chối, Nhận lời xin lỗi, Lạnh lùng, Cáo bệnh, Đuổi về, Vẫn đi, Ở lại, Về tẩm cung, Đã rõ, Làm như không thấy, the pet choices (Tạ ơn nhận nuôi / Xin gửi Ngự thú viên / Xin <con>), the emotion choices (Mắng, Sang hỏi tội, Bỏ qua, Tạ lỗi đền bạc, Đổ lỗi), succession titles, Xuất gia, Thú tội với Hoàng thượng, Cắt đứt (tư tình), Báo tin có thai, Mệnh truyện story branches without odds, festival options without odds (jts tsOpt).
- **First meeting**: Chào hỏi / Hành lễ, Hỏi danh tính (knowing who someone is; failing would block every talk card behind the stranger gate).
- **Her own skill decides**: khảo hạch exam, minigame cards and minigame study (Tự học / Học với ma ma "chơi một trò nhỏ", the Tài đức minigame variants) — the play is the chance.
- **Result texts** (something already happened: a gift received, a warning heard) — no word.
Everything else that was sure now shows **Nắm chắc** and can fail softly at 1 in 20.

Rates (per-tick event chances: illness onset, lifespan/death draws, NPC scheme / act frequency, births, weather) go through `roll` too, so they are capped at 95; the floor 5 is NOT forced on them (a 1-in-100 sudden illness per buổi must stay rare — forcing 5 would multiply it). The floor applies to every act's odds (`oddsCl`, odA). Visual randomness (minigame layouts, effects) untouched.

## Soft failure — what each kind spends (owner 17:35Z + 17:10Z (1): never the bạc)
| kind | spends on a soft fail | gains | other loss |
|---|---|---|---|
| deck card / talk option (runOpt, talk run, adRun, greet reply) | its khắc (card cost) + Sức in its cost | nothing | none (Danh/Đức/bạc costs not taken, a.l not applied, a.fail not called) |
| button act (capAt) | the khắc + Sức named in capAt (per row in the table below) | nothing | none |
| dialog option (cap:K) | K khắc + Sức of its fx | nothing | none (its go never runs) |
| court choice (jreign, sure) | Sức of its cost | nothing | none |
| NPC sure deed (twDo) | — | nothing happens | none |

## Before / after — every old "Chắc chắn" hint (file:line on origin/main)
| file:line | old | new | soft fail spends (never bạc) |
|---|---|---|---|
| j15.js:30 | Chắc chắn (sure, no roll) | no odds word, never rolled (bookkeeping / decision / walk / result text) | — |
| j15.js:33 | Chắc chắn (sure, no roll) | no odds word, never rolled (bookkeeping / decision / walk / result text) | — |
| j15.js:49 | Chắc chắn (sure, no roll) | no odds word, never rolled (bookkeeping / decision / walk / result text) | — |
| j15.js:66 | Chắc chắn (sure, no roll) | button → Nắm chắc + capAt gate | 2 khắc (court «Hỏi chuyện» generic; tq keeps its own odds, ksp = bookkeeping) |
| j15.js:66 | Chắc chắn (sure, no roll) | no odds word, never rolled (bookkeeping / decision / walk / result text) | — |
| j19.js:89 | Chắc chắn (sure, no roll) | no odds word, never rolled (bookkeeping / decision / walk / result text) | — |
| j20.js:25 | Chắc chắn (sure, no roll) | no odds word, never rolled (bookkeeping / decision / walk / result text) | — |
| j21.js:52 | Chắc chắn (sure, no roll) | no odds word, never rolled (bookkeeping / decision / walk / result text) | — |
| j21.js:67 | Chắc chắn (sure, no roll) | no odds word, never rolled (bookkeeping / decision / walk / result text) | — |
| j22.js:53 | Chắc chắn (sure, no roll) | no odds word, never rolled (bookkeeping / decision / walk / result text) | — |
| j23.js:27 | Chắc chắn (sure, no roll) | button → Nắm chắc + capAt gate | 2 khắc, Sức 15 |
| j23.js:28 | Chắc chắn (sure, no roll) | button → Nắm chắc + capAt gate | 2 khắc, Sức 10 |
| j23.js:29 | Chắc chắn (sure, no roll) | button → Nắm chắc + capAt gate | 2 khắc, Sức 10 |
| j24.js:23 | Chắc chắn (sure, no roll) | no odds word, never rolled (bookkeeping / decision / walk / result text) | — |
| j24.js:29 | Chắc chắn (sure, no roll) | no odds word, never rolled (bookkeeping / decision / walk / result text) | — |
| j24.js:65 | Chắc chắn (sure, no roll) | no odds word, never rolled (bookkeeping / decision / walk / result text) | — |
| j24.js:66 | Chắc chắn (sure, no roll) | no odds word, never rolled (bookkeeping / decision / walk / result text) | — |
| j24.js:67 | Chắc chắn (sure, no roll) | no odds word, never rolled (bookkeeping / decision / walk / result text) | — |
| j24.js:68 | Chắc chắn (sure, no roll) | no odds word, never rolled (bookkeeping / decision / walk / result text) | — |
| j25.js:48 | Chắc chắn (sure, no roll) | button → Nắm chắc + capAt gate | 2 khắc |
| j25.js:49 | Chắc chắn (sure, no roll) | button → Nắm chắc + capAt gate | 2 khắc |
| j25.js:51 | Chắc chắn (sure, no roll) | button → Nắm chắc + capAt gate | 2 khắc |
| j42.js:358 | Chắc chắn (sure, no roll) | button → Nắm chắc + capAt gate | 1 khắc |
| j42.js:359 | Chắc chắn (sure, no roll) | button → Nắm chắc + capAt gate | 1 khắc |
| j53.js:186 | Chắc chắn (sure, no roll) | button → Nắm chắc + capAt gate | 2 khắc, Sức 5 |
| j53.js:187 | Chắc chắn (sure, no roll) | button → Nắm chắc + capAt gate | 2 khắc, Sức 5 |
| j53.js:189 | Chắc chắn (sure, no roll) | no odds word, never rolled (bookkeeping / decision / walk / result text) | — |
| j53.js:192 | Chắc chắn (sure, no roll) | no odds word, never rolled (bookkeeping / decision / walk / result text) | — |
| j53.js:198 | Chắc chắn (sure, no roll) | no odds word, never rolled (bookkeeping / decision / walk / result text) | — |
| j53.js:199 | Chắc chắn (sure, no roll) | no odds word, never rolled (bookkeeping / decision / walk / result text) | — |
| j54.js:203 | Chắc chắn (sure, no roll) | button → Nắm chắc + capAt gate | 1 khắc |
| j54.js:207 | Chắc chắn (sure, no roll) | button → Nắm chắc + capAt gate | 2 khắc, Sức 5 |
| j54.js:209 | Chắc chắn (sure, no roll) | no odds word, never rolled (bookkeeping / decision / walk / result text) | — |
| j54.js:212 | Chắc chắn (sure, no roll) | no odds word, never rolled (bookkeeping / decision / walk / result text) | — |
| j70.js:457 | Chắc chắn (sure, no roll) | no odds word, never rolled (bookkeeping / decision / walk / result text) | — |
| j77.js:71 | Chắc chắn (sure, no roll) | no odds word, never rolled (bookkeeping / decision / walk / result text) | — |
| j77.js:80 | Chắc chắn (sure, no roll) | no odds word, never rolled (bookkeeping / decision / walk / result text) | — |
| j77.js:155 | Chắc chắn (sure, no roll) | no odds word, never rolled (bookkeeping / decision / walk / result text) | — |
| j77.js:156 | Chắc chắn (sure, no roll) | no odds word, never rolled (bookkeeping / decision / walk / result text) | — |
| j77.js:158 | Chắc chắn (sure, no roll) | no odds word, never rolled (bookkeeping / decision / walk / result text) | — |
| j77.js:186 | Chắc chắn (sure, no roll) | no odds word, never rolled (bookkeeping / decision / walk / result text) | — |
| j83.js:139 | Chắc chắn (sure, no roll) | no odds word, never rolled (bookkeeping / decision / walk / result text) | — |
| j83.js:185 | Chắc chắn (sure, no roll) | no odds word, never rolled (bookkeeping / decision / walk / result text) | — |
| j83.js:187 | Chắc chắn (sure, no roll) | button → Nắm chắc + capAt gate | 2 khắc |
| j83.js:196 | Chắc chắn (sure, no roll) | button → Nắm chắc + capAt gate | 2 khắc, Sức 10 |
| j83.js:246 | Chắc chắn (sure, no roll) | button → Nắm chắc + capAt gate | R0.k khắc (only the «ally» route, which was sure) |
| j85.js:174 | Chắc chắn (sure, no roll) | button → Nắm chắc + capAt gate | 2 khắc, Sức 15 |
| j85.js:175 | Chắc chắn (sure, no roll) | button → Nắm chắc + capAt gate | 2 khắc, Sức 10 |
| j85.js:176 | Chắc chắn (sure, no roll) | button → Nắm chắc + capAt gate | BAL.charity.khac khắc |
| j85.js:180 | Chắc chắn (sure, no roll) | button → Nắm chắc + capAt gate | 2 khắc, Sức 15 |
| j85.js:181 | Chắc chắn (sure, no roll) | button → Nắm chắc + capAt gate | 2 khắc, Sức 10 |
| j85.js:182 | Chắc chắn (sure, no roll) | button → Nắm chắc + capAt gate | 2 khắc, Sức 10 |
| j99succ.js:78 | Chắc chắn (sure, no roll) | no odds word, never rolled (bookkeeping / decision / walk / result text) | — |
| j99succ.js:148 | Chắc chắn (sure, no roll) | no odds word, never rolled (bookkeeping / decision / walk / result text) | — |
| jact.js:80 | Chắc chắn (sure, no roll) | button → Nắm chắc + capAt gate | 2 khắc, Sức 10 |
| jclose.js:21 | Chắc chắn (sure, no roll) | no odds word, never rolled (bookkeeping / decision / walk / result text) | — |
| jemoact.js:199 | Chắc chắn (sure, no roll) | no odds word, never rolled (bookkeeping / decision / walk / result text) | — |
| jemoact.js:372 | Chắc chắn (sure, no roll) | no odds word, never rolled (bookkeeping / decision / walk / result text) | — |
| jemoact.js:373 | Chắc chắn (sure, no roll) | no odds word, never rolled (bookkeeping / decision / walk / result text) | — |
| jemoact.js:399 | Chắc chắn (sure, no roll) | no odds word, never rolled (bookkeeping / decision / walk / result text) | — |
| jemoact.js:400 | Chắc chắn (sure, no roll) | no odds word, never rolled (bookkeeping / decision / walk / result text) | — |
| jht.js:121 | Chắc chắn (sure, no roll) | no odds word, never rolled (bookkeeping / decision / walk / result text) | — |
| jht.js:122 | Chắc chắn (sure, no roll) | button → Nắm chắc + capAt gate | 1 khắc |
| jkitpage.js:23 | Chắc chắn (sure, no roll) | kit sample → Nắm chắc (word only) | 2 khắc |
| jkitpage.js:23 | Chắc chắn (sure, no roll) | kit sample → Nắm chắc (word only) | 2 khắc, Sức 15 |
| jlost.js:187 | Chắc chắn (sure, no roll) | loBtn «Lén trả lại» → Nắm chắc + capAt(1) | 1 khắc |
| jmen.js:111 | Chắc chắn (sure, no roll) | dialog option → Nắm chắc + cap:K gate | 1 khắc |
| jmen.js:169 | Chắc chắn (sure, no roll) | dialog option → Nắm chắc + cap:K gate | 1 khắc |
| jmen.js:171 | Chắc chắn (sure, no roll) | dialog option → Nắm chắc + cap:K gate | 1 khắc |
| jmen.js:172 | Chắc chắn (sure, no roll) | dialog option → Nắm chắc + cap:K gate | 2 khắc |
| jmen.js:176 | Chắc chắn (sure, no roll) | no odds word, never rolled (bookkeeping / decision / walk / result text) | — |
| jpet.js:190 | Chắc chắn (sure, no roll) | no odds word, never rolled (bookkeeping / decision / walk / result text) | — |
| jpet.js:191 | Chắc chắn (sure, no roll) | no odds word, never rolled (bookkeeping / decision / walk / result text) | — |
| jpet.js:194 | Chắc chắn (sure, no roll) | no odds word, never rolled (bookkeeping / decision / walk / result text) | — |
| jstaff.js:96 | Chắc chắn (sure, no roll) | button → Nắm chắc + capAt gate | B().talk||2 khắc |
| jtabs.js:36 | Chắc chắn (sure, no roll) | no odds word, never rolled (bookkeeping / decision / walk / result text) | — (minigame study: the play decides) |
| jtabs.js:37 | Chắc chắn (sure, no roll) | no odds word, never rolled (bookkeeping / decision / walk / result text) | — (minigame study: the play decides) |
| jtabs.js:38 | Chắc chắn (sure, no roll) | button → Nắm chắc + capAt gate | BAL.charity.khac khắc |
| jtabs.js:41 | Chắc chắn (sure, no roll) | button → Nắm chắc + capAt gate | 2 khắc, Sức 15 |
| jtabs.js:42 | Chắc chắn (sure, no roll) | button → Nắm chắc + capAt gate | 2 khắc, Sức 10 |
| jtabs.js:43 | Chắc chắn (sure, no roll) | button → Nắm chắc + capAt gate | 2 khắc, Sức 10 |
| jtabs.js:61 | Chắc chắn (sure, no roll) | button → Nắm chắc + capAt gate | 2 khắc, Sức 10 |
| jtds.js:135 | Chắc chắn (sure, no roll) | button → Nắm chắc + capAt gate | BAL.td.k khắc, Sức (plain variant; the minigame variant has no word / no roll) |
| jtds.js:136 | Chắc chắn (sure, no roll) | button → Nắm chắc + capAt gate | BAL.td.k khắc, Sức (plain variant; minigame variant: no roll) |
| jtds.js:146 | Chắc chắn (sure, no roll) | button → Nắm chắc + capAt gate | BAL.tds.pracK khắc, Sức BAL.tds.pracSuc |
| jts.js:143 | Chắc chắn (sure, no roll) | dialog option → Nắm chắc + cap:K gate | 0 khắc |
| jtsb.js:124 | Chắc chắn (sure, no roll) | dialog option → Nắm chắc + cap:K gate | 1 khắc |
| jtsb.js:127 | Chắc chắn (sure, no roll) | dialog option → Nắm chắc + cap:K gate | 1 khắc |
| jtsb.js:128 | Chắc chắn (sure, no roll) | no odds word, never rolled (bookkeeping / decision / walk / result text) | — |
| jtsb.js:139 | Chắc chắn (sure, no roll) | no odds word, never rolled (bookkeeping / decision / walk / result text) | — |
| jtsb.js:144 | Chắc chắn (sure, no roll) | dialog option → Nắm chắc + cap:K gate | 1 khắc |
| jtsb.js:167 | Chắc chắn (sure, no roll) | no odds word, never rolled (bookkeeping / decision / walk / result text) | — |
| jtsb.js:170 | Chắc chắn (sure, no roll) | no odds word, never rolled (bookkeeping / decision / walk / result text) | — |
| jtsb.js:189 | Chắc chắn (sure, no roll) | dialog option → Nắm chắc + cap:K gate | 1 khắc |
| jtsb.js:190 | Chắc chắn (sure, no roll) | no odds word, never rolled (bookkeeping / decision / walk / result text) | — |
| jtsb.js:191 | Chắc chắn (sure, no roll) | dialog option → Nắm chắc + cap:K gate | 1 khắc |
| jtsb.js:192 | Chắc chắn (sure, no roll) | no odds word, never rolled (bookkeeping / decision / walk / result text) | — |
| jtsb.js:225 | Chắc chắn (sure, no roll) | no odds word, never rolled (bookkeeping / decision / walk / result text) | — |
| jtsb.js:231 | Chắc chắn (sure, no roll) | no odds word, never rolled (bookkeeping / decision / walk / result text) | — |
| jtsb.js:232 | Chắc chắn (sure, no roll) | no odds word, never rolled (bookkeeping / decision / walk / result text) | — |
| jtsb.js:233 | Chắc chắn (sure, no roll) | no odds word, never rolled (bookkeeping / decision / walk / result text) | — |
| jtsb.js:234 | Chắc chắn (sure, no roll) | no odds word, never rolled (bookkeeping / decision / walk / result text) | — |
| jtsb.js:236 | Chắc chắn (sure, no roll) | no odds word, never rolled (bookkeeping / decision / walk / result text) | — |
| jtsb.js:238 | Chắc chắn (sure, no roll) | no odds word, never rolled (bookkeeping / decision / walk / result text) | — |
| jty.js:65 | Chắc chắn (sure, no roll) | no odds word, never rolled (bookkeeping / decision / walk / result text) | — |
| jty.js:66 | Chắc chắn (sure, no roll) | no odds word, never rolled (bookkeeping / decision / walk / result text) | — |
| jty.js:98 | Chắc chắn (sure, no roll) | no odds word, never rolled (bookkeeping / decision / walk / result text) | — |
| jty.js:107 | Chắc chắn (sure, no roll) | no odds word, never rolled (bookkeeping / decision / walk / result text) | — |

## Before / after — every o:100 act (this branch, file:line)
| file:line | act | old o | new |
|---|---|---|---|
| j13.js:41 | Truyền thái y | 100 | → rolls at 95 (cap), soft fail |
| j13.js:42 | Tự bốc thuốc | 100 | → rolls at 95 (cap), soft fail |
| j13.js:43 | Tĩnh dưỡng | 100 | → rolls at 95 (cap), soft fail |
| j13.js:44 | Giả bệnh | 100 | → rolls at 95 (cap), soft fail |
| j14.js:14 | Chép kinh, giữ đức | 100 | → rolls at 95 (cap), soft fail |
| j14.js:14 | Trồng rau | 100 | → rolls at 95 (cap), soft fail |
| j14.js:15 | Xuất gia | 100 | 100, fix:1 → bookkeeping, no roll |
| j2.js:42 | Nghỉ ngơi dưỡng sức | 100 | → rolls at 95 (cap), soft fail |
| j2.js:48 | Luyện cầm kỳ thi họa | 100 | → rolls at 95 (cap), soft fail |
| j2.js:49 | Đọc binh thư, sử sách | 100 | → rolls at 95 (cap), soft fail |
| j2.js:50 | Tụng kinh, làm việc thiện | 100 | → rolls at 95 (cap), soft fail |
| j2.js:51 | Thưởng cung nữ | 100 | → rolls at 95 (cap), soft fail |
| j2.js:68 | Dạy dỗ ${k.sex=== | 100 | → rolls at 95 (cap), soft fail |
| j2.js:71 | Chữa bệnh cho con | 100 | → rolls at 95 (cap), soft fail |
| j2.js:72 | Tự bào chế thuốc an thai | 100 | → rolls at 95 (cap), soft fail |
| j2.js:73 | An thai | 100 | → rolls at 95 (cap), soft fail |
| j2.js:74 | Báo tin có thai | 100 | 100, fix:1 → bookkeeping, no roll |
| j2.js:147 | Xin xăm ở Phật đường | 100 | 100, fix:1 → bookkeeping, no roll |
| j2.js:154 | Khiêu khích | 100 | → rolls at 95 (cap), soft fail |
| j2.js:156 | Tặng quà | 100 | → opens a picker / order (a.open): no roll |
| j2.js:157 | Khiêu khích | 100 | → rolls at 95 (cap), soft fail |
| j2.js:158 | Trút giận | 100 | → rolls at 95 (cap), soft fail |
| j2.js:163 | Xin chữa bệnh | 100 | → rolls at 95 (cap), soft fail |
| j2.js:163 | Bài thuốc dễ thụ thai | 100 | → rolls at 95 (cap), soft fail |
| j2.js:164 | Mời làm thái y tâm phúc | 100 | → rolls at 95 (cap), soft fail |
| j2.js:165 | Xin thuốc cho ${k.name} | 100 | → rolls at 95 (cap), soft fail |
| j2.js:166 | Học hỏi y lý | 100 | → rolls at 95 (cap), soft fail |
| j2.js:167 | Đút lót lật thẻ | 100 | → rolls at 95 (cap), soft fail |
| j2.js:169 | Xem sổ thị tẩm | 100 | 100, fix:1 → bookkeeping, no roll |
| j2.js:170 | Mua ${itm(k).n} | 100 | 100, fix:1 → bookkeeping, no roll |
| j2.js:172 | Đưa cơm áo | 100 | → rolls at 95 (cap), soft fail |
| j2.js:175 | Tâm sự | 100 | → rolls at 95 (cap), soft fail |
| j22.js:24 | Chào hỏi đúng lễ | 100 | → rolls at 95 (cap), soft fail |
| j22.js:28 | Cắt đứt | 100 | 100, fix:1 → bookkeeping, no roll |
| j22.js:38 | Thú tội với Hoàng thượng | 100 | 100, fix:1 → bookkeeping, no roll |
| j4.js:32 | Dâng bạc vào quốc khố | 100 | 100, fix:1 → bookkeeping, no roll |
| j42.js:143 | Mua thuốc bổ | 100 | 100, fix:1 → bookkeeping, no roll |
| j42.js:145 | Giặt đồ | 100 | → rolls at 95 (cap), soft fail |
| j42.js:150 | (helper default) | 100 | → rolls at 95 (cap), soft fail |
| j42.js:152 | Theo hầu chủ | 100 | 100, fix:1 → bookkeeping, no roll |
| j42.js:153 | Lĩnh đồ ở Nội vụ phủ | 100 | → rolls at 95 (cap), soft fail |
| j42.js:154 | Học lễ nghi với cô cô | 100 | → rolls at 95 (cap), soft fail |
| j42.js:163 | Việc chủ sai | 100 | 100, fix:1 → bookkeeping, no roll |
| j42.js:166 | Lui sau bình phong | 100 | 100, fix:1 → bookkeeping, no roll |
| j61.js:156 | Hành lễ | 100 | 100, fix:1 → bookkeeping, no roll |
| j61.js:157 | Kính cẩn hỏi danh tính | 100 | 100, fix:1 → bookkeeping, no roll |
| j76.js:109 | Nghỉ ngơi một lát | 100 | → rolls at 95 (cap), soft fail |
| j76.js:110 | Trò chuyện với cung nữ | 100 | → rolls at 95 (cap), soft fail |
| j76.js:111 | Đọc sách giải khuây | 100 | → rolls at 95 (cap), soft fail |
| j83.js:164 | ${prac? | 100 | → rolls at 95 (cap), soft fail |
| j9.js:53 | Hỏi han sức khỏe | 100 | → rolls at 95 (cap), soft fail |
| j9.js:55 | Bàn tán về ${third.name} | 100 | → rolls at 95 (cap), soft fail |
| j9.js:56 | Chia sẻ bí mật | 100 | → rolls at 95 (cap), soft fail |
| j9.js:57 | Nhờ giúp đỡ | 100 | → rolls at 95 (cap), soft fail |
| j9.js:59 | Cảnh báo nàng | 100 | → rolls at 95 (cap), soft fail |
| j9.js:60 | Tạ lỗi | 100 | → rolls at 95 (cap), soft fail |
| j9.js:61 | Nhún nhường | 100 | → rolls at 95 (cap), soft fail |
| j9.js:62 | Giúp đỡ nàng | 100 | → rolls at 95 (cap), soft fail |
| j9.js:63 | Cùng cung | 100 | 100, fix:1 → bookkeeping, no roll |
| j93.js:348 | (helper default) | 100 | → rolls at 95 (cap), soft fail |
| jact.js:34 | Nghe ngóng chung | 100 | → rolls at 95 (cap), soft fail |
| jact.js:40 | (helper default) | 100 | → rolls at 95 (cap), soft fail |
| jact.js:69 | Trò chuyện với cung nữ | 100 | → rolls at 95 (cap), soft fail |
| jact.js:70 | Xem hàng Nội vụ phủ | 100 | → rolls at 95 (cap), soft fail |
| jbal2.js:929 | (BAL card) | 100 | → rolls at 95 (cap), soft fail |
| jbalarc.js:51 | (BAL card) | 100 | → rolls at 95 (cap), soft fail |
| jcycle.js:209 | Xem sổ nguyệt sự | 100 | → rolls at 95 (cap), soft fail |
| jcycle.js:218 | Xem sổ nguyệt sự | 100 | → rolls at 95 (cap), soft fail |
| jemoact.js:178 | (helper default) | 100 | → rolls at 95 (cap), soft fail |
| jhouse.js:35 | Tâm sự | 100 | → rolls at 95 (cap), soft fail |
| jhouse.js:39 | Nghe ngóng chung | 100 | → rolls at 95 (cap), soft fail |
| jhouse.js:43 | (helper default) | 100 | → opens a picker / order (a.open): no roll |
| jhouse.js:45 | Tra khảo | 100 | → opens a picker / order (a.open): no roll |
| jhouse.js:48 | Che chở (đang bị bắt tội) | 100 | → opens a picker / order (a.open): no roll |
| jhouse.js:51 | (helper default) | 100 | → opens a picker / order (a.open): no roll |
| jhouse.js:52 | Xem người | 100 | → opens a picker / order (a.open): no roll |
| jhouse.js:53 | Tiến cử | 100 | → opens a picker / order (a.open): no roll |
| jhouse.js:54 | Đổi người | 100 | → opens a picker / order (a.open): no roll |
| jhouse.js:60 | (helper default) | 100 | → opens a picker / order (a.open): no roll |
| jkc.js:198 | (helper default) | 100 | → rolls at 95 (cap), soft fail |
| jmem.js:358 | Nhắc lại ân xưa | 100 | → rolls at 95 (cap), soft fail |
| jmen.js:121 | Chào hỏi đúng lễ | 100 | → rolls at 95 (cap), soft fail |
| jthaiy.js:127 | Mời thái y bắt mạch | 100 | → rolls at 95 (cap), soft fail |
| jthaiy.js:128 | Sang Thái y viện xin bắt mạch | 100 | → rolls at 95 (cap), soft fail |
| jthaiy.js:145 | Xin bắt mạch | 100 | → rolls at 95 (cap), soft fail |
| jtoil.js:253 | Điểm trang | 100 | 100, fix:1 → bookkeeping, no roll |
| jts.js:256 | Thả đèn hoa đăng | 100 | → rolls at 95 (cap), soft fail |
| jwhy.js:77 | Nghe ngóng chung | 100 | → rolls at 95 (cap), soft fail |

## Gates (sha d3589f39a11c3c8ae5bbeb1314ad9a316972f943)
- one-core-guard: PASS, 0 fails (inline 3843 = baseline 3843; balKeys 306; BAL.st14.odds removed, BAL.odds.softFail added).
- quickcheck.sh: PASS on a389d2d (core gates PASS · time-spill PASS · old save from live loads + plays a buổi, 0 errors · perf median of 3 new/live: render 192/157 ms, tab 355/339, buổi 922/863, tasks>200ms 13/12 — inside the ±25 % noise the brief names; the change adds one Math.min per roll). Re-run on the final sha: PASS (161 s; old save ok; perf new/live render 195/223 ms, tab 290/291, buổi 1006/1101, tasks>200ms 14/14; core gates PASS).
- perf seeded A/B: the 8-seed bot runs below (same seeds, same steps, both builds on this box at the same time) took the same wall time per seed (~12 min each, 4 processes in parallel) — no measurable cost.
- coop-e2e (regression guard only, no co-op code touched): live 63 ok / 0 FAIL, this branch 63 ok / 0 FAIL — no worse.
- old save loads: yes (quickcheck step 2).
- balance smoke (dev/measure/inpage4.js sensible bot, seeded Math.random, seeds 11…88, 25×300 steps each, live vs this branch): 0 page errors on both; 0 early deaths on both; lives finished in the budget: live 0, new 1 (cnv, married out at 24 turns); highest rank reached per seed — live 0,1,2,0,3,1,0,2 (mean 1.1), new 1,1,2,2,1,1,3,1 (mean 1.5): no shift beyond noise. HONEST LIMIT: the bot finishes ~0–1 life per seed in this budget, so Hoàng hậu reach / early-death RATE could not be measured here (needs a long nightly run: dev/test/bot-same.js with N≥200 or the nightly harness). Expected effect is small: formerly-sure acts now give nothing 1 time in 20 and cost only khắc/Sức then.
- Fold 755x1000@2 + iPad 1180x820@2 shots LOOKED at: deck card soft fail (Hối lộ Kính sự phòng) and a button soft fail (Phát bạc cứu giúp cung nhân nghèo): the result card reads "<act>: bại — người tính không bằng trời tính: chỉ uổng công, không mất bạc, không mất gì khác." + "không đổi gì"; bạc unchanged, the khắc spent; act cards show Nắm chắc + Mất "chỉ uổng công, không mất bạc, không mất gì khác"; no overlap beyond the normal result toast; feet not involved. (Shots kept out of git; not uploaded — the seal still says HỎNG: HỎNG→BẠI is the kit worker's job per OD 17:10Z (2); the seal animation stamp already reads BẠI.)

## For the reviewer / notes
- KIT: no new visual part. The soft line uses the existing result card + log; `capAt` adds data attributes only. Text helpers registered in KIT.md (odds chip row).
- `resultShow`/seal word HỎNG→BẠI is NOT changed here (separate kit order, OD 17:10Z (2)).
- `window.__oddsSoft` carries the last soft line to the card; cleared on use and at each runOpt.
- jmood: soft fails are not counted as "failed acts" for mood (rolled flag stays o<100) — deliberate: "no big loss".
- C-AG #3: send_message to session_01UV1Szh8FwC7dVrdZpdtNPP (brief) and session_01UV1SzhW8pwS5jUZNP7cmH8 (FOREMAN_C_STATUS) both failed "not found" → list put in FOREMAN_C_STATUS.md (dated line) and the appendix below; Foreman C please relay.
- Files: dev/build j1 j2 j3 j15 j17 j19 j23 j24 j25 j42 j53 j54 j63 j67 j68 j70 j77 j79 j83 j85 j87 j95 j99succ j14 j22 j4 j61 j9 j8 jact jbal jclose jcycle jemoact jgreet jht jk2b jkitpage jlost jmen jmort jpet jpetlife jreign jstaff jst14 jsteal jtabs jtds jtoil jts jtsb jtwoway jty jworld + oddsCl sweep files; dev/kit/VANPHONG.md, KIT.md; dev/test fixtures; dev/tools/odds-cap-scan.py, odds-cap-sites.py.

## Appendix — AG call sites (origin/review/ag-all-2, lines not on main)
- jagacts3.js:29 | o:100 | …ay được.":"Tự sắc thuốc an thai.",c:{...X.self.c},o:100,w:{},x,go:()=>{p.anthai=1}}…
- jagacts3.js:30 | o:100 | …,t:"Nằm nghỉ, uống thuốc an thai.",c:{...X.buy.c},o:100,w:{...X.buy.w},x,go:()=>{p.anthai=…
- jagacts3.js:36 | o:100 | …p=>({n:"Xin chữa bệnh",c:{...BAL.ag.par3.treat.c},o:100,x:illName(p),run:()=>treat(p,"ty")…
- jagacts3.js:68 | o:100 | ….g))P(p3O(v,"restLat",{n:"Nghỉ ngơi một lát",c:{},o:100,k:BAL.restLatK,w:{suc:BAL.restLatS…
- jagacts3.js:69 | o:100 | …Phát bạc cứu giúp cung nhân nghèo",c:{bac:-C.bac},o:100,k:C.khac},N,X.charity.g,"help"))}…
- jagacts3.js:70 | o:100 | …se.g)&&p3UseIx(v)>=0)P(p3O(v,"use",{n:"Dùng",c:{},o:100},N,X.use.g,"self"));…
- jagacts3.js:71 | o:100 | …elow&&p3SellIx(v)>=0)P(p3O(v,"sell",{n:"Bán",c:{},o:100},N,X.sell.g,"self"));…
- jagacts3.js:72 | o:100 | …(v,"tyGift",{n:"Biếu",c:{bac:-BAL.court.gift.bac},o:100},N,X.tyGift.g,"bribe"));…
- jagacts3.js:73 | o:100 | …p3WorkArt(v);if(a)P(p3O(v,"work",{n:"Tự học",c:{},o:100,k:2},N,X.work.g,"art"))}…
- jagacts3.js:75 | o:100 | …oUpperCase()+a.slice(1);P(p3O(v,k,{n:AGC3BTN[k],c,o:100,k:a==="hoi"?2:1},N,g,"staff"))}…
- jagacts3.js:124 | o:100 | …th.round(T.health*f));return{n:"Hỏi han sức khỏe",o:100,x:`nàng quý ngươi +${n}`,…
- jagacts3.js:129 | o:100 | …und(G.hit*f));return{n:`Bàn tán về ${third.name}`,o:100,…
- jagacts3.js:134 | o:100 | …Math.round(T.secret*f));return{n:"Chia sẻ bí mật",o:100,x:`nàng quý ngươi +${n}${v.malice>…
- jagacts3.js:147 | o:100 | …L.mem.invokeMin)add("invoke",{n:"Nhắc lại ân xưa",o:100},X.invoke);…
- jagacts3.js:165 | o:100 | …(p3O(v,"test",{n:"Nghiệm độc",c:{bac:-X.test.bac},o:100},N,X.test.g,"self",()=>"tyv"));…
- jagacts3.js:166 | o:100 | …3O(v,"hire",{n:"Thêm cung nữ",c:{bac:-X.hire.bac},o:100},N,X.hire.g,"staff"));…
- jagacts3.js:168 | o:100 | …)<H.tamBelow))P(p3O(v,"staffTam",{n:"Tâm sự",c:{},o:100},N,H.gTam,"staff"));…
- jagacts3.js:169 | o:100 | …",c:{bac:-BAL.house.upBac,danh:-BAL.house.upDanh},o:100},N,H.gUp,"staff"));…
- jagacts3.js:170 | o:100 | …d"&&srk(s)>=3))P(p3O(v,"search",{n:"Tra xét",c:{},o:100,k:2},N,H.gSearch,"staff"));…
- jagacts3.js:171 | o:100 | …ThreatT(v);if(s)P(p3O(v,"threat",{n:"Dọa tố",c:{},o:100},N,H.gThreat,"scheme",(kh)=>agAt(o…
- jagacts3.js:188 | o:100 | …try{const f=facOf(v);const k={n:"",c:{},o:100,k:F.k};…
- jagacts3.js:192 | o:100 | …nd(F.gLeave))P(p3O(v,"facLeave",{n:"Rời phe",c:{},o:100,k:0},N,F.gLeave,"self"));…
- jagacts3.js:232 | o:100 | …,"def_"+k,{n:"Phòng bị",c:Od.bac?{bac:-Od.bac}:{},o:100,k:1},N,D.g[k],"self",null,t);if(x)…
- jagacts3.js:250 | o:100 | …,x)),v);P(p3O(v,"petcare",{n:AGC3BTN.petcare,c:{},o:100,k:BAL.time.cost.harm||1},N,X.petca…
- jagacts3.js:251 | o:100 | …":"teachD",{n:"Dạy con",c:{suc:-BAL.kidTeach.suc},o:100,k:BAL.kidTeach.k},N,X.teach.g,"sel…
- jagknow.js:240 | o:100 | …ung ${m.name} suốt buổi này.`,k:SRVA.watch.k,c:{},o:100,w:SRVA.watch.w,x:"kẻ nào đến giở t…

SẴN SÀNG KIỂM d3589f39a11c3c8ae5bbeb1314ad9a316972f943


---
# § ROUND 2 — fix of review r1 "FAIL 5 @bc58dd46" (Foreman D #11 brief D11-odds-cap-fix2.md)
PRIORITY #1 CHECK ('odds cap|oddsCl|softFail|oddsSoft|Chắc chắn'): OD 7 (L1657 17:00Z, L1659 17:10Z, L1664 17:35Z + earlier) | ledger 0 | claims 8 (ODDS CAP row, D, worker session_01964izGRJM7BJPNcVuaqdcU) | main 15 (BAL.odds.lo/hi, seeMaxP, 'Chắc chắn' ladder on live) | review/* 0 besides review/odds-cap (this)

Worker session_01964izBuoCyMCGvstmPMb5T. Branch review/odds-cap, started from bc58dd46, newest origin/main 99f3978d merged (kit-thanh-bai landed on main: its j17 sure-option line and j63 kaRows `sure0` regex brought "Chắc chắn" back → resolved without it; its "Bại" row in j19 keeps the soft-fail words). START_CTX ≈ 4 % of 1M; now ≈ 30 (estimate; the session tool reports 0) %.
Read in full: review-odds-cap-r1.md, odds-cap.md (r1 + appendix), OD L1657 / L1659 / L1664 verbatim, START_CORE + START_WORKER + START_REVIEWER, topic files balance-economy + wording (odds lines).

## 1. One cap, one roll — every typed second clamp and raw draw at a chance site (FAIL 1)
New in j1: `capRes(ok,o)` — a result that comes from noise draws (score vs score), not from roll(), keeps its odds inside the ONE cap: above hi a win is undone with share 1−hi/o, below lo a loss is turned with share (lo−o)/(100−o), so P(ok) = oddsCl(o) exactly. Used where the result is a draw: kid exam (j53 ktRun), contests (jbal2 `capRank7`, called from j71 cRun7 / mgRun7 / the festival contest), NPC + auto court exam (jexam `exSimC`). Her OWN minigame play is her skill and is not touched (OD 17:35Z: the play decides).
Own scan (script: every `cl(e,lo,hi)` with literal bounds, every `Math.min/max(literal,…)`, every `Math.random()/rnd…()` compared to a value, in all of dev/build, near a chance word) → before / after:

| file:line (bc58dd46) | before | after |
|---|---|---|
| jbac.js:20 | `Math.max(5,Math.min(95,Math.round(s.p)))/100` | `oddsCl(Math.round(s.p))/100` |
| j43.js:30 | `p=cl(p,10,95)` (mindBelief roll) | `p=oddsCl(p)` |
| j43.js:56, j40.js:55 | `roll(cl(c,5,80))` | `roll(oddsCl(Math.min(c,80)))` |
| jtrong.js:83 | `cl(…,20,95)` | `cl(…,20,BAL.odds.hi)` (local floor 20 kept, cap from BAL) |
| jvisit.js:51 | `Math.max(0,Math.min(95,…))` (a rate) | `Math.max(0,…)` — roll() holds the cap |
| jts.js:263 / 267 | `Math.min(95,odds)` shown | `oddsCl(odds)` |
| j70.js:343 selfP70maid | `cl(…,0,95)` | `Math.max(0,…)` — a rate, roll() caps |
| j70.js:167 / 169 / 332 | `cl(c,3,85)` / `cl(…,3,80)` / `cl(c,3,90)` | `oddsCl(Math.min(c,85 / 80 / 90))` (floor 5 from BAL) |
| j70.js:187 / 346 / 347 | `roll(cl(…,3,40))` / `roll(cl(p,0,85))` / `roll(cl(…,0,25))` | `roll(Math.min(…,40 / 85 / 25))` — rates, roll caps |
| j97.js:254 | `p=Math.min(.95,…)` + raw `rnd67()<p` | `roll(p*100)` |
| j96.js:68 tmRoll96 | raw `rnd67()<w` | `roll(w*100)` |
| j51.js:56 NPC kv scheme | raw `Math.random()>=c` | `!roll(c*100)` |
| j75.js:172 NPC effort | raw `Math.random()>pt*FAIRN.eff` | `!roll(pt*FAIRN.eff*100)` |
| jpetcare.js:34 sniff | `Math.min(95,…)` | `oddsCl(…)` |
| jpetcare.js:132 petStealO | `cl(…,3,90)`, `return 5` | `oddsCl(Math.min(…,90))`, `return BAL.odds.lo` |
| jpet.js:90 / 92 | `cl(…,3,95)` | `oddsCl(…)` |
| jpoison.js:49 | `cl(…,3,92)` | `oddsCl(Math.min(…,92))` |
| j29.js:41 / 46 servSellO | `cl(…,0,90)` (a loyal servant NEVER sells) + a typed copy at :46 | `oddsCl(Math.min(…,90))`; :46 now calls servSellO (one formula) |
| j53.js:130 ktOdds | `cl(…,3,97)` shown as word(97) | `oddsCl(…)`; ktRun result through capRes |
| j71.js:89 / 132 / 372, jbal2.js:40 / 42 | `cl(…,3,97)` | `oddsCl(…)`; result through capRank7 |
| jexam.js:161 / 199 | NPC / auto exam `exSim` (certain pass) | `exSimC` = exSim + capRes(pass, exChance) |
| jevb.js:35 | `od(cl(…,1,99))` | `od(…)` (od → odA → oddsCl) |
| j34.js:27 / 31, j95.js:396 / 414×2 / 442, j95b.js:204 / 212 / 220 / 225 / 226 / 236, jpet.js:205, jrcp.js:154 / 157 / 168, jthaiy.js:62, jtsb.js:48 / 49 / 89, jveil.js:123×2 | `cl(…,5,X)` (typed copy of the floor) | `oddsCl(Math.min(…,X))` — 23 sites, script-rewritten, same behaviour, floor read from BAL |

Left as they are (not a chance, or a rate — the r1 rule: rates are capped by roll(), the floor is not forced on them): rank / level clamps (j79:16, jts:16, jmgt:21, j92:402, jsgame:198, j83:136, jface, jrash), birth sex j1 (P.sonP), jdh stochastic rounding, minigame layouts / effects (jlant, jnwp, jsgame, jtd, jts spawn, j90, j11 thunder, j67:82 beat layout), rates with a floor below 5: conceiveCh j8:38 (2..85), birth jbal:214 (1.5..60), nightCh walk jgift:199/213 (0..70), ccRisk j55:42 (3..45), j42:201 servant events. Local tighter design bounds inside the cap (10..90 etc., e.g. j55:86/90/124, jroute:120/172/380, jtoilr:51, jinv:291, j96 tryst options) keep their own numbers; the cap itself is BAL.odds everywhere.
After: `cl(…,5,…)` or `cl(…,…,95)` in dev/build = 0 (clfix.py), raw `Math.random()*100<` = 1 (roll itself).

## 2. No second roll on acts that already roll inside (FAIL 2 — the early illness deaths)
New flag `inner:1` (j1 `oddsSure`): the act's OWN inner roll decides; roll() caps that inner roll once, the act is NOT gated again at the cap and shows no false Nắm chắc. `oi` = the inner odds shown as its word (cure cards: treatO).

| file:line | act | r1 | r2 |
|---|---|---|---|
| j13.js:41 / 42 / 43 | Truyền thái y / Tự bốc thuốc / Tĩnh dưỡng | cap roll + treat() roll, "Nắm chắc" | inner:1, word = treatO (cure odds) |
| j13.js:44 | Giả bệnh | cap roll + later caught roll | inner:1 (no word; the risk is its kèm) |
| j2.js:163 | Xin chữa bệnh (thái y) | cap roll + treat() | inner:1, oi treatO |
| j2.js:167 | Đút lót lật thẻ | cap roll + night chance | inner:1 |
| j9.js:55 / 56 / 57 | Bàn tán / Chia sẻ bí mật / Nhờ giúp đỡ | cap roll + inner roll | inner:1 |
| j76.js:110 / 111, jact.js:69 | Trò chuyện với cung nữ / Đọc sách giải khuây | cap roll + side roll | inner:1 |
| jthaiy.js:127 / 128 / 145 | Mời thái y bắt mạch / Sang Thái y viện / Xin bắt mạch | cap roll + finding rolls | inner:1 (own scan) |
| jkc.js:224 / 227 / 236 / 257 / 260 | Đi lễ chùa / Lựa sách / Học lễ nghi / Lên chùa / Đứng đọc (kcChance encounters) | cap roll + encounter roll | inner:1 (own scan) |
| j53.js:186 / 187 | Dạy chữ / Dạy lễ nghi (button, roll(25) reveal inside) | capAt gate | no gate, no Nắm chắc |
| j23.js:27-29, jtabs.js:41-43, j85.js:180-182 (lessonMode → openMG) | Tự học / Học với thầy / Học với Thái hậu | capAt before a MINIGAME | no gate (the play decides — same rule as jtabs:36/37) |
| j85.js:174 / 175, jtds.js:135 / 136 (lessonVir = jtd tdPlay minigame) | Tự học / Học với ma ma (Tứ đức) | capAt before a minigame | no gate |
| j83.js:196, jtabs.js:61, jtds.js:146 (wkAsk → playArt) | Tự học, làm tác phẩm | capAt before picker + minigame | no gate |
| j83.js:246 | «ally» illicit-buy button (opens a picker) | capAt on the opener | gate moved onto the ally options (`cap:R0.k`, kitCapLine) |
Scan used: every o:100 / o-less act whose run/go (or the function it calls) holds roll/chanceW/Math.random; the rest (deterministic gains) keep the cap roll. Runtime: cure cards → `inner:true, capped:false, oddsOf = treatO` (55 / 20 …).
Balance proof: § 6.

## 3. Tra khảo, Che chở, Thú tội are chances (FAIL 3)
- Tra khảo a planted spy (jhouse card AND the staff-tab button j24 — one roll in j10 servAct): odds `traO(s)` = oddsCl(BAL.house.tra.base 55 + Tâm cơ/4 − 25 if loyal by nature). Thành: names the master, is sent away (as before). Bại: "Tra khảo X: hỏng, nàng/hắn cắn răng không khai: lòng −15", the spy stays. Card shows the word; result seal THÀNH/BẠI from the real outcome.
- Che chở before Thận Hình ti (same two doors): `cheO()` = oddsCl(BAL.house.che.base 45 + Danh/4 + rank×4). Bại: the Danh is spent, lòng +BAL.house.che.failLoy (8).
- Thú tội với Hoàng thượng (j22): no longer fix:1. Odds oddsCl(BAL.confess.base 70 + Sủng/4 + Thái hậu/5). Thành: lãnh cung, the man is executed (as before). Bại: "Hoàng thượng không tha", death sentence (like jroute mercy; affairExposed without confession is 50/50).
- Report list fix: "Tra khảo" and "Che chở" leave the "Opening a panel / picker" and "Her own orders" lines; they are chances. Thưởng / Phạt / Tha lỗi stay orders. "Thú tội" leaves the decisions list.
- Borderline items named by r1 (Khéo từ chối, Cáo bệnh, Xin <con>) left as decisions — for Foreman / owner.

## 4. One soft-fail path for buttons (FAIL 4)
- capAt(K, bạc): K = the act's ONE BAL key {k, suc} (new BAL.btn table: courtHoi, kidTeach, kidCare, kidGuard, cnv, h54Thu, h54Day, wkShow, kidHeal, htAsk, loSneak; plus existing BAL.td, BAL.charity, BAL.staff.talk). The handler, its hint text and the gate read the SAME key — the typed `spend(2)`, `apply({suc:-5})`, "tốn: 2 khắc, Sức -5" copies in those handlers are gone (j10 courtAct, j25 kidAct, j42 srvStaffAct, j54 h54Act, j83 wkShow, jact kid heal, jht htAct, jlost sneak).
- The bạc of the act goes as data-capbac; the ONE listener calls the ONE `oddsSoft(n,{suc,bac})`, so the BẠI line reads "chỉ uổng công, không mất bạc, không mất gì khác" exactly like the card's Bại row. What is spent = BAL.odds.softFail.spend (Sức) + the khắc; never the bạc.
- Runtime: Dò hỏi gia thế forced fail → bạc 500 → 500, line "…chỉ uổng công, không mất bạc, không mất gì khác." (shots § 7).
- capAt gates now: 17 (r1 36): the minigame / inner-roll ones left (§ 2).

## 5. C-AG ag-all-2 list completed (FAIL 5)
Complete list = appendix "Appendix R2" at the end of this file (110 lines, file:line, with what to do). Dated line written in dev/handover/FOREMAN_C_STATUS.md "FOR C-AG via Foreman C". Their branch not edited.

## 6. BALANCE — paired bot measure
Setup: dev/measure/run_par.js, sensible bot inpage6 + inty, cut at 8 years (dev/measure/inpage6cut8.js, fate CUT8 at turn 96), Vừa, seed 1, 2 pages per arm, 64 lives per arm, both arms on this box at the same time. Live = origin/main 99f3978d, branch = 174a998d (same code as the final sha for rules; later commits are a text pronoun + the measure file). One page per arm crashed once on memory (my runtime checks ran beside them) and was replaced by run_par with a fresh seed.

| arm | lives | Hoàng hậu reached | early end < 3 y | early DEATH < 3 y | ended before 8 y | max rank mean / median |
|---|---|---|---|---|---|---|
| live 99f3978d | 64 | 18 (28 %) | 19 (30 %) | 12 | 43 | 5.00 / 6 |
| branch | 64 | 22 (34 %) | 5 (8 %) | 4 | 26 | 5.75 / 6 |

Early ends < 3 y by cause — live: left the palace / Emperor died (Thái phi, băng hà, về quê) 7, poison 6, other death 3, childbirth 2, illness 1 · branch: poison 3, other 1, xuất gia 1.
All ends before 8 y — live: poison 12, childbirth 10, left / Emperor died 11, other 6, illness 4 · branch: childbirth 10, poison 9, left / Emperor died 4, other 1, illness 1, xuất gia 1.

Reading:
- FAIL 2 is fixed: illness deaths 1 (branch) vs 4 (live) over 8 y; r1 had 7. The double roll on cures is gone.
- Hoàng hậu reach is the same or a little higher.
- The branch now has FEWER early ends than live (5 vs 19), and both halves of each arm agree (live 9 + 10, branch 1 + 4), so this is probably not noise. Most of the gap is Emperor-death endings (live 9 vs branch 3) and her own lifespan / accident deaths (live 6 vs 1), not acts she takes. I checked what I could and found no code cause:
  - the lifespan draws are the same in both builds (20 000 samples each: Emperor at 21 dies within 3 y 2.8 % vs 2.9 %; her at 18 1.9 % vs 2.1 %);
  - a forced Emperor death fires and ends the life the same way in both builds;
  - no console errors in either build under the bot;
  - roll() is not shadowed anywhere my changes run;
  - jmort's r1 change is the same rule in a new form.
  The lifespan curve predicts about 14 % of lives see the Emperor die within 8 y. Live's 9/64 matches that; the branch's 3/64 is low. OPEN for the reviewer: please re-measure with a second seed (e.g. seed 7) or 128 lives. If the gap stays, bisect between bc58dd46 and 174a998d (F1 rate sites j51 / j75 / j97 / j96 / j70 are the candidates that touch NPC and world rates).

## 7. Gates
| gate | result |
|---|---|
| quickcheck.sh fcefca42 (--runs 5) | PASS · old save from live loads and plays a buổi, 0 errors · perf median of 5, new / live: render 171 / 170 ms, tab 356 / 333 ms, buổi 864 / 961 ms, tasks > 200 ms 13 / 12 |
| core gates (inside quickcheck) | PASS: one-core-guard (inline 3806 vs baseline 3843, balKeys 312, 0 fails) · rules-one-source · kit-conform · coop-one-world · hooks 1 |
| time-spill guard | PASS |
| coop-e2e (guard only, co-op code not touched) | live 99f3978d 63 ok / 0 FAIL · branch 63 ok / 0 FAIL — no worse |
| runtime checks (my script, Math.random forced) | capRes(true,100) = 0.956, capRes(false,0) = 0.057 · cure cards inner, capped false, word = treatO · Tra khảo fail → "hỏng, nàng cắn răng không khai", spy stays; pass → names the master, sent away · contest with a dominant her: she wins 0.93 (≈ cap) · ktOdds bounds 95 / 5 · capAt Dò hỏi gia thế forced fail → bạc 500 → 500, line "…chỉ uổng công, không mất bạc, không mất gì khác." |
| shots, LOOKED at (scratch only, never in git, deleted after this report) | Fold 755x1000@2 + iPad 1180x820@2: (a) capAt soft fail "Dò hỏi gia thế": the BẠI result card reads "Dò hỏi gia thế: bại — người tính không bằng trời tính: chỉ uổng công, không mất bạc, không mất gì khác." + "không đổi gì". Bạc stays 500. On iPad the deck card "Nghỉ ngơi một lát" shows Nắm chắc · THÀNH Sức +6 · BẠI "chỉ uổng công · không mất gì khác" (kit-thanh-bai merged). (b) Tra khảo fail: BẠI card "Tra khảo Tiểu Linh: hỏng, nàng ta cắn răng không khai: thiện cảm −15." No overlap. Figures' feet are not cut. The BẠI stamp sits over the end of the first line, which is the kit seal's normal place on every result card, as r1 also noted. |
Known cosmetic carry-over from r1 (not changed here): j99succ hint text now starts with " · thành:" where "Chắc chắn" was removed. kitHint drops the empty lead in the card rows, but the raw string has it.

## 8. Scan after (dev/tools/odds-cap-scan.py on the final sha)
dev/tools/odds-cap-scan.py on fcefca42:
- o:100 not fix: 71. These are deterministic gains that roll at the cap, plus the inner:1 acts, which are counted here too (20 inner:1 sites).
- fix:1: 15. It was 16; Thú tội is now a chance.
- "Chắc chắn" in code: 0.
- typed cl(…,5,95): 0. clfix.py also finds 0 `cl(…,5,…)` / `cl(…,…,95)`.
- raw Math.random()*100<: 1 (roll itself).
- sure skips: 5 (r1).
- roll at the cap: 8.
- capAt: 17 (was 36).
- cap: options: 10 (+ the ally illicit-buy options).
- oddsCl(: 181 (was 133).

Files changed in r2 (dev/build):
j1 j2 j9 j10 j13 j15 j17 j19 j22 j23 j24 j25 j29 j34 j40 j42 j43 j51 j53 j54 j63 j70 j71 j75 j76 j83 j85 j95 j95b j96 j97 jact jbac jbal jbal2 jevb jexam jhouse jht jkc jlost jpet jpetcare jpoison jrcp jstaff jtabs jtds jthaiy jtrong jts jtsb jveil jvisit, plus the site build and dev/measure/inpage6cut8.js.
Branch commits: 02be97ff F2 · 037e56f5 F1 · 5d25285f + aef462e8 F3/F4 · 174a998d merge main 99f3978d · fcefca42 pronoun + measure file.


## Appendix R2 — C-AG ag-all-2 call sites, COMPLETE (origin/review/ag-all-2 @ 6badc4d4)
Method: every line ag-all-2 ADDS against its merge-base with main (ce29592e, `git diff -U0`), scanned for: o:100 (not fix) · ladder "Chắc chắn" · typed cap (cl(…,0–20,8x–99) / Math.min(95|.95,…) / Math.max(5,Math.min(95,…))) · raw draw (Math.random()/rnd…() compared to a chance) · sure skip (>=100||) · own soft path (agSoft). 110 lines. Totals: AG files — o:100 26, agSoft 24, sure skip 2, raw draw 1; shared files — typed cap 29, o:100 23, agSoft 3, raw draw 1, sure skip 1; "Chắc chắn" 0 added (the r1 reviewer's jtsb×7/jtabs×2/… count compared against main, so it counted lines main changed, not ag-all-2: ag-all-2 has exactly the merge-base count in every file, e.g. jtsb 19 = 19).
What C-AG must do when ag-all-2 meets odds-cap: o:100 → runner cap roll or fix:1 / inner:1 (inner roll decides, j1 oddsSure); typed caps → oddsCl(…) (local tighter bound only as Math.min/Math.max inside it); raw draws → roll(p*100); agSoft/agSoftTxt → j63 oddsSoft (ONE soft path); `o>=100||agTry(o)` sure skips → roll at the cap. Re-apply odds-cap r2 inner:1 on the ag-rewritten lines j9:55 (Nhờ giúp đỡ) and jact:69 (Trò chuyện với cung nữ).
- j14.js:17 | o:100 | shared file | …c",t:"Ngày ngày chép kinh Kim Cương.",c:{...X.sutra.c},o:100,k:2,w:{...X.sutra.w}},{n:"Trồng rau",t:"Cuốc…
- j14.js:18 | o:100 | shared file | …n:"Xuất gia",t:"Cắt tóc đi tu, rời bỏ hồng trần.",c:{},o:100,k:4,w:{},x:"kết thúc kiếp này, yên ổn (sẽ hỏ…
- j2.js:69 | o:100 | shared file | …yếu, ngươi tự bốc thuốc.`,c:{...BAL.ag.cx2.kidHeal.c},o:100,w:{},x:`Sức khỏe ${sick.name} +${BAL.ag.cx2.…
- j2.js:87 | sure skip | shared file | …rds (jagacts3 p3Run): + lotB, cap BAL.odds */const ok=o>=100||roll(o);…
- j2.js:146 | o:100 | shared file | …const PK=BAL.talk.provoke;A.push({n:"Khiêu khích",o:100,w:{danh:PK.danh},x:`nàng quý ngươi -${PK.rel…
- j2.js:147 | o:100 | shared file | …if(v.pg>=BAL.ag.cx2.vent.pg)A.push({n:"Trút giận",o:100,w:{...BAL.ag.cx2.vent.c},x:"hả cơn ghen; nàn…
- j2.js:152 | o:100 | shared file | …sh({n:"Bài thuốc dễ thụ thai",c:{...BAL.ag.cx2.fert.c},o:100,x:`${BAL.ag.cx2.fert.m} tháng dễ có thai hơn…
- j2.js:153 | o:100 | shared file | …n:"Mời làm thái y tâm phúc",c:{...BAL.ag.cx2.doctor.c},o:100,x:"dễ phát hiện xạ hương và độc; bệnh của co…
- j2.js:154 | o:100 | shared file | …n:`Xin thuốc cho ${k.name}`,c:{...BAL.ag.cx2.kidMed.c},o:100,x:`Sức khỏe +${BAL.ag.cx2.kidMed.up}`,go:()=…
- j2.js:164 | o:100 | shared file | …{n:"Tâm sự",o:100,w:{...BAL.ag.cx2.maidTalk.w}},…
- j30.js:26 | typed cap | shared file | …)>=40&&rkOf(t)>=1},o:(a,t)=>{const q=queenP();return q?cl(30+aff(q,a)/2-aff(q,t)/2,5,95):5},get x(){return `cần Hoàng hậu thiện cảm 4…
- j42.js:199 | o:100 | shared file | …ủa tiểu thái giám bán rong.",k:SRVA.med.k,c:SRVA.med.c,o:100,w:SRVA.med.w,once:"med"};…
- j42.js:206 | o:100 | shared file | …bàn ghế trong điện.",k:SRVA.sweep.k,c:srvCa("sweep",S),o:100,w:SRVA.sweep.w,x:`công lao +${SRVA.sweep.mp}…
- j42.js:208 | o:100 | shared file | …{placeOf(mw).n}. Ngươi theo hầu.`,k:SRVA.follow.k,c:{},o:100,w:SRVA.follow.w,x:"đến nơi chủ đang ở",once:…
- j42.js:209 | o:100 | shared file | …vải vóc theo phần của cung.",k:SRVA.nvp.k,c:SRVA.nvp.c,o:100,w:SRVA.nvp.w,x:`công lao +${SRVA.nvp.mp} · c…
- j42.js:210 | o:100 | shared file | …đứng, dâng trà, quỳ lạy.",k:SRVA.rite.k,c:SRVA.rite.c,o:100,w:SRVA.rite.w,x:`công lao +${SRVA.rite.mp}`,…
- j42.js:531 | typed cap | shared file | …){const fr=srvFriendList();T("Hẹn gặp riêng",fr.length?cl(SRVA.tryst.o(S,m,{risk}),5,95):0,`cần bạn canh cửa · đêm kín đáo: Sức +${SR…
- j70.js:334 | typed cap | shared file | …r=cl(Math.round(r),5,95)}…
- j70.js:335 | typed cap | shared file | …"&&window.__j70A&&o.tgt===tid70(window.__j70A))r+=12}r=cl(Math.round(r),5,95)}}catch(e){}return r}})();…
- j70.js:342 | typed cap | shared file | …+=30;if(o.k==="canh")c+=canhB70(o,t)}}catch(e){}return cl(Math.round(c),3,90)}})();…
- j8.js:61 | typed cap | shared file | …function oSee(t=S,p){return cl(Math.round(15+eyes(t)*9+t.tamco/4+(t.maid&&t.maid.loyal>=BAL.loy.trust?10:0)+(p?(t.doctor?25:0)+(t.arts.y>=2?20:0):0)),5,95)}…
- j8.js:510 | typed cap | shared file | …if(e.t&&e.by!==key(p)&&roll(cl(oSee(p,true)+T.o,5,95))){p.inv.splice(ix,1);const by=byKey(e.by);if…
- j83.js:112 | typed cap | shared file | …function wkSellO(p){return cl(75+(eyes(p)*3),5,95)}…
- j83.js:232 | typed cap | shared file | …ng",k:1,ks:Object.keys(WILL),cost:k=>itm(k).pr+15,o:p=>cl(Math.round(55+(p.maid?p.maid.loyal:0)/3+eyes(p)*2),5,95),…
- j83.js:234 | typed cap | shared file | …k:1,ks:["hacdinh","xahuong"],cost:k=>itm(k).pr+40,o:p=>cl(70+eyes(p)*3,5,95),need:()=>"",when:"có ngay",fail:()=>`thái y…
- j9.js:55 | o:100 | shared file | …A.push({n:"Nhờ giúp đỡ",o:100,x:aff(v,S)>=BAL.ag.cx2.help.aff?"nàng thân v…
- j9.js:59 | o:100 | shared file | …A.push({n:"Nhún nhường",o:100,c:{...BAL.ag.cx.humble.c},x:`oán -${BAL.ag.c…
- j92.js:333 | typed cap | shared file | …const o=cl(WD.clearBase+eyes(t)*WD.clearMat+wdFrameEv(t,a,e)*10,5,95);…
- j92.js:341 | typed cap | shared file | …const o1=cl(WD.clearBase+25+eyes(S)*WD.clearMat,5,95),o2=cl(WD.clearBase+eyes(S)*WD.clearMat+(tr?1…
- j92.js:389 | typed cap | shared file | …const o=cl(50+eyes(S)*5,5,95);…
- j95b.js:212 | typed cap | shared file | …/* she hears of it only as hearsay */const hear=cl(15+eyes(S)*12+(spyOther95b(y)?25:0),5,80);if(j95dice(hear))j95bHear(r);return r}…
- j95b.js:220 | typed cap | shared file | …nction j95bRumOpts(r,y,x){const oc=j95bClearOdds(r),ot=cl(35+eyes(S)*8+(S.tamco||0)/4,5,90);…
- j95b.js:236 | typed cap | shared file | …let msg;if(x&&x.alive&&j95dice(cl(35+eyes(S)*8+(S.tamco||0)/4,5,90))){r.traced=1;evA(S,x,BAL.eff.j95b.evJ95bTrac…
- jact.js:69 | o:100 | shared file | …n==="Tâm sự");if(i>=0)A[i]={n:"Trò chuyện với cung nữ",o:100,w:{},x:`lòng +${BAL.ag.cx2.maidTalk.w.maid}…
- jact.js:153 | own soft path | shared file | …đàn làm Hoàng thượng dừng bước. Sủng +${w}.`)}else if(agSoft(o))log(agSoftTxt(S));else{apply({sung:-C.l.s…
- jagacts.js:36 | own soft path | AG file | …)){ap(v,X.w);return `Thái hậu đỡ lời cho ${v.name}`}if(agSoft(o))return agSoftTxt(v);ap(v,X.l);return `${v…
- jagacts.js:37 | own soft path | AG file | ….sh;return `${agcNm(q)} nhận che chở cho ${v.name}`}if(agSoft(o))return agSoftTxt(v);ap(v,X.l);return `${v…
- jagacts.js:62 | own soft path | AG file | …name} vẽ chân dung dâng Thái hậu, Thái hậu rất vui`}if(agSoft(o))return agSoftTxt(v);ap(v,X.l);return `${v…
- jagacts2.js:65 | own soft path | AG file | …2.maidSpy,o=odA(v,cx2O(v,"maidSpy"));if(!agTry(o)){if(!agSoft(o))m.loyal=cl((m.loyal||0)+X.l.maid,0,100);r…
- jagacts2.js:73 | own soft path | AG file | …n null;const o=odA(v,cx2O(v,k)),ok=agTry(o);ag2Sf=!ok&&agSoft(o);ap(v,ok?X.w||{}:ag2Sf?{}:X.l||{});return…
- jagacts2.js:78 | own soft path | AG file | …ap(v,ok?{"sung":X.w.sung+lv,"danh":X.w.danh}:agSoft(o)?{}:X.l);return ag2Res(v,"show",ok,ok?`${v…
- jagacts2.js:97 | own soft path | AG file | …if(agSoft(o))return ag2Res(v,"chest",0,agSoftTxt(v));r…
- jagacts3.js:29 | o:100 | AG file | …úng tay được.":"Tự sắc thuốc an thai.",c:{...X.self.c},o:100,w:{},x,go:()=>{p.anthai=1}}…
- jagacts3.js:30 | o:100 | AG file | …thai",t:"Nằm nghỉ, uống thuốc an thai.",c:{...X.buy.c},o:100,w:{...X.buy.w},x,go:()=>{p.anthai=1}}},…
- jagacts3.js:36 | o:100 | AG file | …reat:p=>({n:"Xin chữa bệnh",c:{...BAL.ag.par3.treat.c},o:100,x:illName(p),run:()=>treat(p,"ty")})};…
- jagacts3.js:39 | sure skip | AG file | …rn"";agcPay(v,C.c);const o=C.o==null?100:C.o;const ok=o>=100||agTry(o+lotB(v,C.dom)),sf=!ok&&agSoft(o);p3Ap…
- jagacts3.js:39 | own soft path | AG file | …00:C.o;const ok=o>=100||agTry(o+lotB(v,C.dom)),sf=!ok&&agSoft(o);p3Ap(v,ok?C.w:sf?null:C.l);let r="";…
- jagacts3.js:68 | o:100 | AG file | …stLat.g))P(p3O(v,"restLat",{n:"Nghỉ ngơi một lát",c:{},o:100,k:BAL.restLatK,w:{suc:BAL.restLatSuc}},N,X.r…
- jagacts3.js:69 | o:100 | AG file | …,{n:"Phát bạc cứu giúp cung nhân nghèo",c:{bac:-C.bac},o:100,k:C.khac},N,X.charity.g,"help"))}…
- jagacts3.js:70 | o:100 | AG file | …d(X.use.g)&&p3UseIx(v)>=0)P(p3O(v,"use",{n:"Dùng",c:{},o:100},N,X.use.g,"self"));…
- jagacts3.js:71 | o:100 | AG file | ….bacBelow&&p3SellIx(v)>=0)P(p3O(v,"sell",{n:"Bán",c:{},o:100},N,X.sell.g,"self"));…
- jagacts3.js:72 | o:100 | AG file | …P(p3O(v,"tyGift",{n:"Biếu",c:{bac:-BAL.court.gift.bac},o:100},N,X.tyGift.g,"bribe"));…
- jagacts3.js:73 | o:100 | AG file | …st a=p3WorkArt(v);if(a)P(p3O(v,"work",{n:"Tự học",c:{},o:100,k:2},N,X.work.g,"art"))}…
- jagacts3.js:75 | o:100 | AG file | …(0).toUpperCase()+a.slice(1);P(p3O(v,k,{n:AGC3BTN[k],c,o:100,k:a==="hoi"?2:1},N,g,"staff"))}…
- jagacts3.js:124 | o:100 | AG file | …(1,Math.round(T.health*f));return{n:"Hỏi han sức khỏe",o:100,x:`nàng quý ngươi +${n}`,…
- jagacts3.js:128 | own soft path | AG file | …if(agSoft(o))return agSoftTxt(p);affAdd(v,p,-T.praiseF…
- jagacts3.js:129 | o:100 | AG file | …th.round(G.hit*f));return{n:`Bàn tán về ${third.name}`,o:100,…
- jagacts3.js:134 | o:100 | AG file | …ax(1,Math.round(T.secret*f));return{n:"Chia sẻ bí mật",o:100,x:`nàng quý ngươi +${n}${v.malice>BAL.talk.s…
- jagacts3.js:147 | o:100 | AG file | …g>=BAL.mem.invokeMin)add("invoke",{n:"Nhắc lại ân xưa",o:100},X.invoke);…
- jagacts3.js:165 | o:100 | AG file | …>=0)P(p3O(v,"test",{n:"Nghiệm độc",c:{bac:-X.test.bac},o:100},N,X.test.g,"self",()=>"tyv"));…
- jagacts3.js:166 | o:100 | AG file | …))P(p3O(v,"hire",{n:"Thêm cung nữ",c:{bac:-X.hire.bac},o:100},N,X.hire.g,"staff"));…
- jagacts3.js:168 | o:100 | AG file | …al||0)<H.tamBelow))P(p3O(v,"staffTam",{n:"Tâm sự",c:{},o:100},N,H.gTam,"staff"));…
- jagacts3.js:169 | o:100 | AG file | …ến cử",c:{bac:-BAL.house.upBac,danh:-BAL.house.upDanh},o:100},N,H.gUp,"staff"));…
- jagacts3.js:170 | o:100 | AG file | …="maid"&&srk(s)>=3))P(p3O(v,"search",{n:"Tra xét",c:{},o:100,k:2},N,H.gSearch,"staff"));…
- jagacts3.js:171 | o:100 | AG file | …s=p3ThreatT(v);if(s)P(p3O(v,"threat",{n:"Dọa tố",c:{},o:100},N,H.gThreat,"scheme",(kh)=>agAt(ownerOf(s),…
- jagacts3.js:188 | o:100 | AG file | …try{const f=facOf(v);const k={n:"",c:{},o:100,k:F.k};…
- jagacts3.js:192 | o:100 | AG file | …){if(nd(F.gLeave))P(p3O(v,"facLeave",{n:"Rời phe",c:{},o:100,k:0},N,F.gLeave,"self"));…
- jagacts3.js:217 | own soft path | AG file | …if(agTry(io)){S.where[g.id]=k;S.where[h.id]=k}else if(!agSoft(io))affAdd(h,g,BAL.eff.j21.top)}}…
- jagacts3.js:232 | o:100 | AG file | …p3O(v,"def_"+k,{n:"Phòng bị",c:Od.bac?{bac:-Od.bac}:{},o:100,k:1},N,D.g[k],"self",null,t);if(x)O.push(x)}…
- jagacts3.js:250 | o:100 | AG file | …aff(v,x)),v);P(p3O(v,"petcare",{n:AGC3BTN.petcare,c:{},o:100,k:BAL.time.cost.harm||1},N,X.petcare.g,"soci…
- jagacts3.js:251 | o:100 | AG file | …eachV":"teachD",{n:"Dạy con",c:{suc:-BAL.kidTeach.suc},o:100,k:BAL.kidTeach.k},N,X.teach.g,"self"));…
- jagacts3.js:322 | own soft path | AG file | …|!t)return"";const so=spyRoll(v,t,m);if(!agTry(so)){if(agSoft(so))return ag2Res(v,"maidSpy",0,agSoftTxt(v)…
- jagday.js:248 | own soft path | AG file | …ame} nghe lén được ${dv?dv.name:""} ${p.act}`}else if(!agSoft(ho)){if(dv)affAdd(dv,w,-B.caught)}}…
- jagemp.js:69 | own soft path | AG file | …if(agSoft(o)){if(a===S)log(agSoftTxt(S));return{ok:0,s…
- jagent.js:35 | own soft path | AG file | …(owner OD 17/11 ~17:35Z): agTry(o) = the capped roll; agSoft(o) = a failure at this RAW o is soft…
- jagent.js:39 | own soft path | AG file | …function agSoft(o){return(+o||0)>=BAL.odds.hi}…
- jagent.js:40 | own soft path | AG file | …function agTry(o){const ok=roll(agOdd(o));if(!ok&&agSoft(o))AGSOFT.n++;return ok}…
- jagent.js:238 | own soft path | AG file | …else if(agSoft(o))log(agSoftTxt(S));else{affAdd(v,S,-B.caug…
- jagent.js:260 | own soft path | AG file | …teAdd(v.id,"nàng để ý chỗ ngươi hay lui tới")}else if(!agSoft(o)){affAdd(S,v,-B.caught);log(`Ngươi bắt gặp…
- jagharm.js:125 | raw draw | AG file | …function haStealTry(v,t,w){if(!haOn())return Math.random()<w.p;const c=mindPick([[1,w.u],[0,haB().steal.n…
- jagknow.js:186 | own soft path | AG file | …if(agSoft(ho))return"";affAdd(t,v,-BAL.ag.wit.caught);…
- jagknow.js:252 | o:100 | AG file | …cửa cung ${m.name} suốt buổi này.`,k:SRVA.watch.k,c:{},o:100,w:SRVA.watch.w,x:"kẻ nào đến giở trò ở cung…
- jagknow.js:369 | own soft path | AG file | …if(agSoft(bo)){if(p===S&&!quiet)try{log(agSoftTxt(S))}…
- jagknow.js:405 | own soft path | AG file | …apped near-sure miss is soft (no report, no fear) */if(agSoft(o)){if(p===S&&!quiet)try{log(agSoftTxt(S))}c…
- jagmaid.js:54 | own soft path | AG file | …ealD(p);if(d)s.loyal=cl((s.loyal||0)-d,0,100)}else if(!agSoft(o))s.loyal=cl((s.loyal||0)-amD().tea.fail,0,…
- jagstaff.js:104 | sure skip | AG file | …const A=SRVA[o.sk];asC(s,o.sk);asAp(s,o.c);const ok=o.p>=100||agTry(o.p),sf=!ok&&agSoft(o.p);…
- jagstaff.js:104 | own soft path | AG file | ….sk);asAp(s,o.c);const ok=o.p>=100||agTry(o.p),sf=!ok&&agSoft(o.p);…
- jagstf2.js:22 | own soft path | AG file | …let ok=true;if(c.o!=null){ok=agTry(c.o);stfAp(a,ok?c.w:agSoft(c.o)?null:c.l)}const r=c.go?c.go(ok)||"":"";…
- jbal2.js:857 | o:100 | shared file | …,o:92,w:{"sac":3},need:{"sung":2}},arts:{c:{"suc":-10},o:100,w:{"tai":2},need:{"danh":2}},book:{c:{"suc":…
- jbal2.js:858 | o:100 | shared file | …"duc":3},need:{"danh":5,"duc":3}},sutra:{c:{"bac":-10},o:100,w:{"duc":3},need:{"duc":3}},maidR:{c:{"bac":…
- jbal2.js:859 | o:100 | shared file | …rest:{c:{},o:100,w:{"suc":20},need:{rest:6}},study:{"suc":10,…
- jbal2.js:1026 | typed cap | shared file | …})/10*J71.luck;if(x>b){b=x;bi=i}}if(bi===mi)w++}return cl(Math.round(100*w/N),3,97)};…
- jeitem.js:57 | typed cap | shared file | …const P=BAL.eit.pil;const see=cl(P.see+eyes(S)*P.seeMat+(S.maid&&S.maid!==hit&&(S.maid.loyal||0)>=BAL.loy.trust?P.seeMaid:0),5,95);…
- jeitem.js:62 | typed cap | shared file | …function eitPilSee(p){const P=BAL.eit.pil;return cl(P.see+((p&&p.tamco)|0)/4,5,95)}…
- jeitem.js:120 | typed cap | shared file | …?S.maid:null;const alt=eitAlt(R.tip[r],r);const maid=m?cl(bribe-alt.pen+cl(Math.round(((m.loyal||0)-50)/10)+Math.floor(eyes(S)/2),-R.maidAdj,R.maidAdj),5,95):0;…
- jhouse.js:35 | o:100 | shared file | …A.push({n:"Tâm sự",dom:"Sai bảo",o:100,x:`lòng ${nm} ${balSg(BAL.eff.jhouse.loyalRu…
- jhouse.js:39 | o:100 | shared file | …A.push({n:"Nghe ngóng chung",dom:"Mưu kế",o:100,x:`${nm} đi nghe ngóng: biết 1 điều thật tro…
- jlost.js:109 | typed cap | shared file | …function loKeepOdds(c,a,h){return cl(Math.round(40+lostEv(c.id)*10+evG(a,h)*10+((a.danh||0)-(h.danh||0))/10-eyes(h)*3),5,95)}…
- jlost.js:124 | typed cap | shared file | …function loOdds(kind,p){if(kind==="ask")return cl(Math.round(35+eyes(p)*6+(p.tamco||0)/5+(loWatch(p)?10:0)),5,95);…
- jlost.js:125 | typed cap | shared file | …if(kind==="cct")return cl(Math.round(50+(p.danh||0)/8+rkOf(p)*3),5,95);if(kind==="book")return cl(Math.round(55+(p.…
- jlost.js:189 | typed cap | shared file | …if(known){const x=loEntry(c);const o=x?cl(WD.clearBase+eyes(h)*WD.clearMat+wdFrameEv(h,S,x.e)*10,5,95):50;…
- jlost.js:240 | typed cap | shared file | …function loStealO(a,t,self){return cl(Math.round(odA(a,38+(a.tamco||0)/4+eyes(a)*3-((t.maid&&t.maid.loyal)||50)/5))-(self?(BAL.selfMinus):0),5,95)}…
- jpet.js:276 | typed cap | shared file | …function petBuyO(k,p){const T=PET[k];return cl(Math.round([78,62,38][T.tr]+(((p||S).mat)||0)*[3,4,5][T.tr]),5,95)}…
- jsteal.js:41 | raw draw | shared file | …de||!(typeof haStealTry==="function"?haStealTry(v,t,w):Math.random()<w.p))continue;/* AG-ALL C: her choice (mindPic…
- jstip.js:145 | typed cap | shared file | …const om=cl(B.remember+eyes(S)*10,5,95);…
- jthaiy.js:62 | typed cap | shared file | …if(roll(cl(20+eyes(S)*8,5,90)))log(`<span class="r">Tai mắt báo: thái y vừ…
- jtsb.js:48 | typed cap | shared file | …function tsbThuO(a,t){return cl(Math.round(odA(a,44+(a.tamco||0)/5+eyes(a)*3)-tsbGuard(t)),5,90)}…
- jwhy.js:77 | o:100 | shared file | …A.splice(i+1,0,{n:"Nghe ngóng chung",o:100,x:`${m.name} đi nghe ngóng: biết 1 điều thật…
- jworld.js:177 | own soft path | shared file | …{sung:b.showSung,danh:b.showDanh});S1.push(v)}else if(!agSoft(o))ap(v,{danh:b.failDanh})}}…
- jworld.js:183 | own soft path | shared file | …ry(o))apply({sung:b.showSung,danh:b.showDanh});else if(agSoft(o))log(agSoftTxt(S));else apply({danh:b.fail…

SẴN SÀNG KIỂM fcefca42f574cb73082083eac9db98cfce246c59


---
# § FIX ROUND 3 — fix of review r2 "FAIL 3 @9df9204d" (Foreman D #12 brief D12-odds-cap-fix3.md)
PRIORITY #1 CHECK ('odds-cap|capRes|Nắm chắc|Thú tội'): OD 2 | ledger 0 | claims 8 | main 15 | review/* 2 | archive 23

Worker session_01964izECUsWiXJp3oXeZY7A (opus). Branch review/odds-cap, continued from 9df9204d; merged newest origin/main twice (94a9375, then a95e8d4). START_CTX ≈ 4 % of 1M (estimate; the session tool reads 0).
Read in full: START_CORE, START_WORKER, START_REVIEWER, review-odds-cap-r1.md § ROUND 2, this report (r1 + r2), OD L1657 / L1659 (1) / L1664 verbatim.
Merge notes (94a9375): two conflicts. j61: main's new k61Gate greet / name options keep `fix:1` (greeting is bookkeeping). jmen: main's new "Hỏi thái giám tin ngoại triều" text came back with "Chắc chắn" → `cap:1` + `capW()`, as r1 did. Main's other new lines: no o:100, no "Chắc chắn", no typed cap, no raw draw.

## A. capRes keeps the cap at raw odds 96–99 (FAIL A)
j1.js:116, before: `if(o>H)return !!ok&&roll(H/o*100); if(o<L)return !!ok||roll((L-o)/(100-o)*100)`. roll() clips at 95, so the keep share was too small.
After: `if(o>H)return !!ok&&Math.random()*o<H; if(o<L)return !!ok||Math.random()*(100-o)<L-o` (direct draw, same form in both branches; H/L = BAL.odds.hi/lo).
Unit draw test: new `node dev/test/odds-cap.js` (reads capRes/roll/oddsCl/cl from j1 and BAL.odds from jbal; 200 000 draws per o; tolerance ±.004; `--old` runs the r2 formula):

| raw o | 0–4 | 5 | 50 | 94 | 95 | 96 | 97 | 98 | 99 | 100 |
|---|---|---|---|---|---|---|---|---|---|---|
| before (r2, --old) | .050 | .050 | .500 | .940 | .949 | **.912** | **.921** | **.931** | **.940** | .950 |
| after | .050 | .051 | .501 | .940 | .950 | .950 | .950 | .950 | .951 | .950 |
Result: PASS (floor .05 for o ≤ 5, .950 for every o ≥ 95).

## B. ONE CORE odds word — no typed ladder word (FAIL B)
Rule applied: a decision (never rolled) shows NO ladder word (KIT.md:494); a real chance gets its word only from word() / oddsOf / capW; a side chance reads chanceW. Scan: new `python3 dev/tools/typed-ladder-scan.py [ref]`. It looks for every rung (Liều, Khó, Năm ăn năm thua, Khá chắc, Chắc, Rất chắc, Nắm chắc) typed as a hint segment, i.e. at a string start or after " · ". It skips regexes, comments and help prose. I cross-checked it with a broad grep of every quoted rung (89 lines; the extra hits are comments, help text, the difficulty / minigame "Khó", and flavour lines).
Count: **42 before (e35e829, after the main merge) → 14 after**. The 14 left are listed under "Left" below.

| file:line | text / option | before | after | why |
|---|---|---|---|---|
| j95.js:411 ×2 | Nhận lễ, giữ im lặng / Trả lại hộp gấm | `Nắm chắc · thành: …` | `thành: …` | decision, never rolled |
| j95.js:421 | Giữ làm con bài khống chế | `Nắm chắc · …` | no word | decision |
| j95.js:423 | Lặng im, đổi lấy ân tình | `${word(100-risk)}` = Nắm chắc + an impossible BẠI when risk 0 | the word only when risk > 0 (it rolls only then) | found by the runtime shot |
| j95.js:424 | Giả như không thấy | `Nắm chắc · …` | no word | decision |
| j95b.js:223 | Mặc kệ | `Nắm chắc · kèm: …` | `kèm: …` | decision |
| jagent.js:216 / 217 | Thôi, lui về cung / Mặc kệ | `Nắm chắc · …` | no word | decision |
| jagmaid.js:91 | Tắm gội chờ giá | `Nắm chắc · …` | no word | decision |
| jagmaid.js:101 | amSendX (maid serves in her place) | `Nắm chắc · …` | no word | decision |
| jgift.js:20 | giftEval (every gift line) | `Nắm chắc · tốn: 2 khắc` | `tốn: 2 khắc` | giving is deterministic |
| jgift.js:161 / 164 | Đến … gặp ngài / Sang Đức Thọ cung thỉnh an | `Nắm chắc · …` | no word | walking |
| jgift.js:166 | Dâng quà lên Hoàng thượng / Thái hậu | `Nắm chắc · …` | no word | opens the chest picker |
| jrcp.js:251 / 252, jtds.js:85 / 86 | teacher choice (ma ma / a consort) | `Nắm chắc · …` | no word | a choice before the lesson |
| j15.js:71 | Đổi người (own-servant card button) | `Chắc · …` | no word | her own order, no roll in servAct("doi") |
| jhouse.js:54 | Đổi người (jhouse act) | o:100 (rolled at the cap) | o:100,**fix:1** | same act, same rule as Thưởng / Phạt (her orders); both doors now agree |
| j15.js:36 | deadly scheme acts | forced `"Liều"` | `word(oddsCl(o+lotB))` + lotTag | jaudit #9 already says the word must be the real one |
| j8.js:305 nx() | night (thị tẩm) quality word | its own ladder: v≥3 "Rất chắc" … <0 "Khó" | `word(BAL.night.vO[v])`, new BAL.night.vO [40,50,60,75,85] | one ladder (BAL.odds.cut); the same words as before |
| jroute.js:221 rtX | 16 route options at o 100 | broken word `"Chắc cy"` (also live) | no word when o ≥ 100 | those options are decisions (blackmail pay, plan the escape …) |
| jtsb.js:238 | Thu làm tai mắt | typed `Khá chắc` + "hỏng: … bán tin ngươi" (the act never fails; the 35 is a side leak) | no act word; `kèm: … ${chanceW(BAL.odb.jtsb.leakO)}`; roll(35) → roll(BAL.odb.jtsb.leakO) | new BAL key leakO 35, the same value |
| jrcp.js:294 | Sai cung nữ dò la khẩu vị | `S.maid?word(rcpSpyO()):"Khó"` | `word(rcpSpyO())` | rcpSpyO already handles "no maid" |
| jgrey.js:36 (kit sample page) | Ma ma giáo tập sample | `Nắm chắc · …` | no word | the sample must match the game |
| jkitpage.js:147 (kit sample page) | Nghe hết rồi mới định / Cho lui | `Chắc · …` / `"Chắc"` | `thành: …` / `""` | decision samples |

Left (14 scanner hits, not a game odds word): KIT_ODDS itself (j79:192); difficulty "Khó" (jdiff:20) and minigame tier "Khó" (jmgt:3/28); kit sample page chance demos that show one rung each (jkitpage:144 ×3, 153 ×2, 156 ×3, jksize:382, jopic:226; samples of the chip, not game text).
Outside the scanner's pattern, left: j13:66 ("Chắc → Khá chắc" explains a one-step shift) and jgrey:37 (a chance demo).

## C. Failure text stays in BẠI (FAIL C + family)
- j22.js:38 Thú tội: `hỏng: Hoàng thượng không tha, bị ban chết` → `hỏng: Hoàng thượng không tha — có thể bị ban chết` (one item, "có thể" because death() mercy exists). The deck card now reads THÀNH "giữ được mạng (vào lãnh cung) · hắn bị xử trảm" / BẠI "Hoàng thượng không tha — có thể bị ban chết", with no KÈM row. Seen on Fold and iPad.
- Family scan: new `node dev/test/kem-split-scan.js <base>` runs every string literal with "hỏng:" (205) through the kit's own kaModelStr + kaRows in the page. I also checked every `hỏng: ${var}` by hand (28 sites; ktLoss, pz7, accSneakPen, R0.fail, rcp fail, reign lose …), and the shots read real cards / options.

| file:line | card / option | before | after |
|---|---|---|---|
| j22.js:37 | Uống thuốc phá thai | `…; hỏng: băng huyết …` sat inside THÀNH; "mất đứa bé" went to KÈM; "kèm khi hỏng: băng huyết mà chết" went to KÈM | `mất đứa bé, Sức −20 · hỏng: băng huyết — có thể băng huyết mà chết: <chanceW>`. BẠI = "băng huyết — có thể … · Sức −30" (the Sức from a.l, no duplicate). |
| j42.js:465 | the same act (other door) | "kèm khi hỏng" → KÈM | same form as j22:37 |
| jpoison.js:86 | Nhờ … nếm trước | `· Lòng X −5` after hỏng went to KÈM | `— Lòng X −5` inside BẠI (the loss happens only on fail, jpoison.js:87) |
| j95.js:417 | accuse options (lose) | `vu cáo: Danh −8 · bị cấm túc · nàng oán +25 …` (cấm túc and oán went to KÈM) | joined with ", ", all in BẠI (Fold / iPad dialog shot) |
| jreign.js:200 | reign options (lose) | `fmt(l) · có thể bị giáng bậc / bị cấm túc` joined with " · " → KÈM | joined with ", " → BẠI |
After: kem-split-scan 0 of 205; the shots show no failure in KÈM.

## Lists completed (reviewer notes)
- spProudCh (jpromsv.js:27, cl(…,3,70), shown with chanceW) belongs to the left-as-is list of § ROUND 2 ¶1: it is a rate with a floor below 5, the same as conceiveCh / confessRisk.
- agSoftTxt lines that were missing from Appendix R2 (origin/review/ag-all-2): jagacts2.js:71, jagacts3.js:40, jagent.js:37 (comment), jagent.js:41 (the agSoftTxt definition), jagstaff.js:106. Each one → j63 oddsSoft (one soft-fail path). I sent them to C-AG in a dated FOREMAN_C_STATUS line. Their branch was not edited.
- r3 adds for C-AG too: their decision options must not type a ladder word (dev/tools/typed-ladder-scan.py on their branch).

## Gates (final sha below; shots and runtime on 18dcebfb, same rules code)
| gate | result |
|---|---|
| odds unit draw | `node dev/test/odds-cap.js` PASS (table § A) |
| typed ladder word | 42 → 14 (all 14 are non-odds or kit samples, § B) |
| failure → KÈM | kem-split-scan 0 / 205 + runtime cards |
| odds-cap-scan | Chắc chắn 0 · typed cl(…,5,95) 0 · raw draw 1 (roll itself) · fix:1 16 (+ jhouse Đổi người) · o:100 not fix 70 · capAt 17 · oddsCl( 181 |
| quickcheck (core gates: one-core-guard 0 fails · rules-one-source · kit-conform · coop-one-world · time-spill) | PASS ×2 on 18dcebfb, interleaved, 6 pairs each. Medians new/live: run 1 render 153/140, tab 321/291, buổi 671/783; run 2 render 144/154, tab 281/301, buổi 757/749. tasks>200ms 12/11, 12/12. The render sign flips between runs, so it is noise. Old save loads and plays a buổi. Final sha 27713d87 (live = a95e8d4): PASS, render 162/155, tab 329/305, buổi 832/790, tasks 13/12. This run alone is borderline (+4.5 % render, +5.3 % buổi). Over all 18 pairs (3 runs): render 459/449 ms (+2 %), buổi 2260/2322 ms (−3 %), so the perf does not move. |
| coop-e2e (regression guard only) | branch 18dcebfb 63/63 · live origin/main 94a9375 63/63 — no worse |
| shots, LOOKED at (scratch only, never in git, deleted after this report; `node dev/test/odds-cap-shots.js <base> <out>` reproduces them) | Fold 755x1000@2 + iPad 1180x820@2. (1) Thú tội deck card: BẠI only, "có thể bị ban chết". (2) Uống thuốc phá thai: failure in BẠI. (3) Decision dialog "Bắt gặp": Giữ làm con bài / Lặng im / Giả như không thấy show no word and no BẠI; Tố giác keeps its real word (Liều), its failure all in BẠI. No overlap, no cut text, page errors 0, no horizontal overflow. |
Balance: no new run. A is the only odds change (it raises 96–99 wins to exactly the cap). The other changes are wording, plus Đổi người losing a 5 % soft fail. Per the reviewer, no new balance run is needed.

Branch commits: e35e829 merge main 94a9375 · d8aba20 A · bcafa0c + 18dcebf B/C · 27713d8 merge main a95e8d4.

SẴN SÀNG KIỂM 27713d87945a59ba9e69e1d88fd892b086ea48c8
