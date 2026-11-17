PRIORITY #1 CHECK ('odds cap|o:100|Chắc chắn|seeMaxP|softFail'): OD 7 | ledger 0 | claims 7 | main 15 | review/* 0
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
