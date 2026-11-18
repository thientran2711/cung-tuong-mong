# balance-core — report (worker session_01UV1Szkjt9soqZga18GCoey, opened by MAIN s26)

START_CTX ≈ 4 % of the 1M window. Branch **review/balance-core** (base origin/main 08725411). Owner lines: OD 16/11 22:45Z, 22:50Z, 23:00Z, 23:05Z, 23:08Z, 22:10Z.
Status (r2): built + tested at **9abcfa72** (r1 at 80dbed1e); **ships only after the owner agrees to the OWNER PROPOSAL (§7)** (main shows it to her first).

## 0. What the owner saw ("một cái tài lên 75 … chơi một xíu lên 100")
Measured on main (dev/index.html, 12 starts per origin, probe + sens bot):
- "Tài" is the 0–100 stat. It started at **30 + R(50) = 30–79** for everyone (thầy đồ +20 → up to 97, tội thần +15 → up to 86). That is her "75".
- Every art bậc gave **Tài +2** (Vũ/Y: Sắc +2): 8 arts × 5 bậc = +80 Tài → 100 quickly.
- Arts were **bậc 0–5** with progress need = bậc+2 points: a lesson gives 1–3 → **Tông sư after 9–15 lessons (18–30 khắc ≈ 1–2 weeks)**.
- NPCs had a SECOND private study rule (j8 npcMonthly: own `artp += 1+R(3)`, old ladder, no bậc effects) on top of j85 npcStudy → NPC best art bậc 4–5 within 2–3 years.
- Sắc 40–94 random for everyone (no origin), Tâm cơ 10–29, Đức 30 flat; sens bot: Sắc ≈ 95–100 and Tâm cơ 100 by year 2, Sủng 100 by month 6–12.
- Each place that used an art in a roll had its own multiplier: bậc × 3, 4, 5, 6, 8, 9, 12 (37 sites, 18 files).

## 1. History / drama check (OD:L1327) — what each daughter really brings at 18
Sources: Qing/Ming selection practice (tuyển tú 13–17, bao y vs bát kỳ, nữ huấn/nữ tắc schooling of official families), Tang–Song gentry education, Yangzhou salt-merchant culture, steppe/southwest courts; dramas Chân Hoàn truyện (Niên Thế Lan = general's sister: riding, pride, weak letters; An Lăng Dung = minor official's daughter, sings; Chân Hoàn = mid official, poetry), Diên Hi công lược (Ngụy Anh Lạc = embroidery-house maid: needle, cunning, no name, no money), Như Ý truyện (Thái hậu's clan girl = etiquette, protection).
| origin | what history/dramas say | numbers chosen (table §3) |
|---|---|---|
| Tể tướng | tutors since childhood: cầm, thi, thư pháp, hoạ, a little cờ; perfect lễ (Dung/Ngôn); family name; good dowry; grew up among politics | Tài 35–50, Tâm cơ 20–30, Đức 40, Cầm 22 / Thi 18 / Họa 14 / Kỳ 10, Dung + Ngôn Nhập môn; Danh/Bạc kept high |
| Đại tướng quân | horses, sword-dance, strong body; proud, direct; letters weak | Sức 100, Tài 15–30, Tâm cơ 10–20, Vũ 22, Kỳ 8 (binh pháp), Y 6 (bandaging) |
| buôn muối | richest class but lowest status; Yangzhou daughters learn tì bà, cooking, needle to marry up; money sense | Bạc 380, Danh 8, Đức 25 (scorned), Tâm cơ 20–30, Sắc 50–75, Nấu 16, Cầm 12, Thêu 10, Công Nhập môn |
| cung nữ được sủng hạnh | tea/medicine service, needle, kitchen; knows every servant; noticed for her looks | Sắc 55–80, Tâm cơ 30–40, Tai mắt 3, Tài 10–25, Y 16 / Nấu 16 / Thêu 14, Công + Ngôn |
| cung nữ tuyển (cnv) | commoner, labour, needle and kitchen | Tài 10–25, Sức 85, Thêu 12, Nấu 12, Công |
| Nam Chiếu công chúa | Bai/Yi court dance and music, herb and gu lore; Han verse weak | Sắc 55–80, Vũ 24, Y 16, Cầm 10 |
| Bắc Địch công chúa | riding, archery, steppe dance, mare's-milk tea; Han letters and rites weak | Sức 100, Tài 10–20, Vũ 22, Nấu 10, Y 8 |
| tội thần | noble schooling before the fall, then hard years (confiscation, servitude) | Tài 30–45, Tâm cơ 30–40, Thi 18, Cầm 12, Thêu 12 |
| cháu gái Thái hậu | raised near the Thái hậu: rites, painting, needle | Đức 40, Họa 16, Cầm 12, Thêu 10, Dung + Hạnh |
| thầy đồ nghèo | letters and chess from the father, chores at home, Confucian conduct | Tài 40–55, Đức 45, Thi 26 (Thuần thục), Kỳ 16, Hạnh Nhập môn |
| NPC "quan" (new, NPC-only) | the usual consort: daughter of a mid official | Tài 25–40, Cầm 14, Thi 12, Thêu 12, Dung |
Nobody enters above ~26 points in an art (Thuần thục at most): mastery is earned in the palace.

## 2. How arts work now (answer to the brief) — ONE scale
Before: two scales mixed — arts `p.arts[k]` 0–5 bậc (+ `artp` progress) while the player-visible "Tài" was 0–100 and each art bậc pushed Tài +2.
Now: every art (8) and every Tứ đức course (4) = **points 0–100 on one ladder** `BAL.art`:
bậc 0 Chưa thạo 0 · 1 Nhập môn 10 · 2 Thuần thục 25 · 3 Tinh thông 45 · 4 Xuất chúng 70 · 5 **Tông sư 100 (a lifetime)**.
`p.arts[k]` stays the bậc (all old readers keep working), `p.artp[k]` = points inside the bậc; `crsPush` (jbalcore) is the only grower
(her lessons, events, NPC study, Tứ đức). Gain per lesson point by bậc `BAL.art.gain` [1.2, 1, .8, .6, .4]. **One odds bonus per bậc everywhere**
`BAL.art.odds` [0, 4, 8, 13, 18, 24] (`artO`); when the Emperor himself judges and his trait prizes the art (Trọng tài / Mê sắc) × `BAL.art.emp` 1.5 (`artOE`);
passive weights (flip, mưu kế) × `BAL.art.side` .4. Tài/Sắc per new bậc `BAL.art.stUp` = 1 (was 2). The art page (kit `kitSkillCard`, existing `kicker` field — no new UI part)
shows "Tinh thông · 52/100", the bar = points inside the bậc; the ⓘ ladder modal lists bậc · name · points, the odds per bậc and the night rule; every ARTFX/VIRFX number is printed from BAL.

## 3. What changed (code)
- **jbal2.js**: `BAL.orig` (one table, her + NPC; npcW, npc per-rank), `BAL.art`, `BAL.grow`, `BAL.lad` (word ladder), `BAL.steal.m/art/keep/ea`, `BAL.steal.cost` = 0 (owner 22:45Z).
- **jbalcore.js** (new, before jcoopone): crsPush/artPts/artO/artOE/artSide/virO, origSet (start + NPC via rstats), crsMigrate (old saves), growth curve on apply/ap,
  Emperor's month art (empArtMonth / eaLearn / eaTell / eaText / discover hook), bestArt, stealBase, oKeep, stealLose, stealFail, keepNoSteal, keepRobbed, rungDown; ARTFX/VIRFX texts from BAL.
- j1 ORIGINS: numbers removed (one core) — key/name/rank/ally/text only; `x:{thu:1}` for td. j2 start → `origSet`; addArt → crsPush; deck cards l: `stealLose(mode)`; stealX/stealKem per mode.
- j8: `oSteal` reads BAL.steal.m; `stealWin` applies the mode's rel/ghen/win/Hoàng hậu; failure → `stealFail`; **npcMonthly's private study → addArtP** (same ladder); festival art score via artOE.
- j85: addArtP/addVir → crsPush; NPC study chance/focus from `BAL.orig.npc` (study 60 %/month, best art ×4); artBonus/virtueBonus odds → artO/virO; ladder modal texts.
- jtabs: art/vir/works cards show tier name + points (kicker), bar = points/width.
- **37 odds sites** (j2, j4, j7, j8, j13, j14, j20, j22, j31, j67, jstory, jts, jact, jorigins, jgift) `bậc × N` → `artO`/`artOE`/`artSide` (table: `python3 sweep.py` output in the branch commit dd417699 message context; before/after below).
- j1 `ladIdx` + `word()`, j79 `kitOddsLv`, jsgame `sgLv` read `BAL.lad` (three copies of the ladder were typed).
- jcoopone: `empArtMonth` MUTE on the guest (host rolls; `emp` is a W_KEY), `eaLearn` ONLY_ME.

| site group (whole family) | before | after |
|---|---|---|
| Emperor-facing art acts (Phượng cầu hoàng, Kinh hồng vũ, cờ, chân dung, đàn vườn, thơ dâng, thi đối, thọ yến) | bậc × 4 / 6 / 8 (× 2 trait) → up to +80 | artOE: +4…+24 (× 1.5 trait) |
| Y thuật (thuốc, chữa con, an thai, sắc thuốc, phá thai, tự chữa) | bậc × 5 / 6 / 8 / 9 / 12 | artO +4…+24 |
| thi/vũ story acts (j67, jorigins) | bậc × 5 / 6 | artO |
| flip weight (Vũ, Y), mưu kế (Kỳ) | bậc × 2 / 1.5 | artSide (× .4) |
| festival / contest score | bậc×6, (cầm+thi)×3 | artOE vu, (cam+thi)/2 |
| gift by art (jgift) | bậc × 10 | artOE |

## 4. Measurements (bots; tools dev/measure/inbc.js, dev/test/balance-night.js; scratch scripts in the report section 9)
Start values (12 starts per origin; before = origin/main, after = this branch):
| origin | Sắc before→after | Tài | Tâm cơ | Đức | best art at start (bậc) |
|---|---|---|---|---|---|
| tt | 40–86 → 45–70 | 34–79 → 35–50 | 10–29 → 20–30 | 30 → 40 | Cầm 1 → Cầm 22 pts (1) + Thi/Họa/Kỳ 1 |
| dtq | 43–94 → 45–70 | 30–71 → 15–30 | 10–28 → 10–20 | 30 | none → Vũ 22 (1) |
| muoi | 54–87 → 50–75 | 33–79 → 20–35 | 15–29 → 20–30 | 30 → 25 | none → Nấu 16, Cầm 12, Thêu 10 |
| cn | 40–88 → 55–80 | 31–70 → 10–25 | 12–28 → 30–40 | 30 | Y 2 → Y/Nấu/Thêu 1 |
| nc | 42–94 → 55–80 | 33–71 → 20–35 | 10–28 → 15–25 | 30 | Vũ 1 → Vũ 24, Y 16 |
| bd | 40–94 → 50–75 | 40–72 → 10–20 | 13–29 → 15–25 | 30 | Vũ 1 → Vũ 22 |
| td | 45–84 → 45–70 | 48–86 → 30–45 | 25–38 → 30–40 | 30 | Thi 1 → Thi 18, Cầm/Thêu 12 |
| ch | 43–93 → 45–70 | 34–71 → 25–40 | 13–25 → 20–30 | 30 → 40 | none → Họa 16, Cầm 12 |
| thd | 41–82 → 45–70 | 50–97 → 40–55 | 10–28 → 15–25 | 40 → 45 | Thi 1 → Thi 26 (2), Kỳ 16 |
| cnv | 42–93 → 45–70 | 30–79 → 10–25 | 10–26 → 15–25 | 30 | none → Thêu/Nấu 12 |
Bạc / Danh / Sủng / Tai mắt / rank / Thái hậu / Hoàng hậu: **unchanged** (approved origin odds OD:L19/L43; OD:L1218 do not re-test old origins), except cn Bạc 120 → 70 (a maid's savings).

Lessons to reach each bậc (exact ladder simulation, lesson game 1/2/3 at 20/40/40 %):
| way | before bậc 1…5 | after bậc 1…5 |
|---|---|---|
| Tự học | 1.6 · 3.8 · 6.6 · 10.2 · **14.5** | 6.6 · 17.3 · 35.2 · 64.6 · **118.6** |
| Học với thầy | 1.0 · 2.4 · 4.1 · 6.2 · **8.6** | 4.1 · 10.3 · 20.7 · 38.1 · **69.1** |
| Thái hậu | 1.2 · 2.6 · 4.4 · 6.7 · **9.5** | 4.4 · 11.2 · 22.6 · 41.4 · **75.6** |

Growth in real play (sens bot, months 0 / 12 / 24 / 36, averages):
| stat | before (main) | after |
|---|---|---|
| Sắc | 66 / 89 / 90 / 96 | 62 / 72 / 76 / 80 (ch 54/61/69/75) |
| Tâm cơ | 17 / 70 / 100 / 100 | 25 / 57–70 / 79–90 / 85–98 (curve v1→v2; v2 = 25/57/79/85) |
| Tài (bot takes few lessons) | 50 → 52 | 38 → 38 |
| Sủng | 20 → 100 by month 6–12 | unchanged (proposal §7) |
| Danh / Bạc | bot spends both to ~0 | unchanged |
NPC consorts (fast weekly loop, 6 lives × 4 y; best-art bậc counts 0/1/2/3/4/5):
| | before | after |
|---|---|---|
| Tài / Sắc / Đức | 57 / 70 / 48–51 | 33 / 59 / 38–41 → Đức offset `BAL.orig.npc.duc` 10 restores ≈ 48 |
| best art year 0 | 0/21/39/0/0/0 | 0/25/35/1/0/0 |
| best art year 4 | 0/0/13/38/18/4 (Xuất chúng/Tông sư common) | 0/16/48/9/0/0 (Thuần thục–Tinh thông) |
| origins drawn | none | quan 52 %, muoi 10, tt 9, thd 7, cn 8, dtq 5, ch 3, td 3, bd 2, nc 1 |
Page errors in every run: 0.

## 5. Night choices (BAL.steal.m; owner 22:45Z/22:50Z/23:05Z)
Odds = b + Σ w×stat + best-art bonus + trait fit (stealFit) + Emperor mood (mm), clamped 5–95 (odA).
| choice | b | stats | art × | win (beside the night) | lose | holder thiện cảm / ghen | Hoàng hậu |
|---|---|---|---|---|---|---|---|
| Tranh sủng (feign) | 34 | Sủng .35, Sắc .05 | .5 | — | Sủng −3, Đức −1 | −10 / +15 | 0 |
| Chặn ngự giá (road) | 12 | Sắc .35, Sủng .05 | 1.5 | Sủng +6, Danh +2 | Sủng −5, Danh −2 | −25 / +30 | −4 |
| Giữ chân (keep) `BAL.steal.keep` (names agreed with night-final) | base 35 | Sủng .3, Sắc .1 | 1 | success: every try against her −1 rung (`rungDown`); nobody took it: Sủng +gain 2; robbed anyway: hit × oan 1.5; npcP .85 (night-final value) | — | | |
Best art: most points; Emperor's month art (S.emp.ea {f,d}, rolled monthly, his trait doubles the weight of the arts he prizes): favoured +odds[bậc] × 1, disfavoured −odds[bậc] × .75, other 0.
Who knows the month art: Tai mắt ≥ 5 at the month start; else each week a rumour 5 + Tai mắt × 4 %; "dò được" via discover 35 %; NPCs the same (measured: she knows it ≈ 18 % of weeks with Tai mắt 0–1, NPCs ≈ 13–18 %).
Measured on the real consort population (her + NPCs, 2 seeds × 3 lives × 2 y, value of a night = 8 Sủng), road base 12: **best choice Tranh sủng ≈ 62 %, Chặn ngự giá ≈ 33 %, Thôi ≈ 5 %**
(before: Tranh sủng ≈ 96 %, same prize for both). Chặn ngự giá is best ≈ 84 % of nights when her best art is his favoured one, ≈ 28 % neutral, ≈ 13 % disfavoured.
(Tried: base 10 → 66/25, base 14 → 36/60.) Odds 10/50/90 %: Tranh sủng 39/57/75, Chặn ngự giá 27/42/58, Giữ chân 42/60/77.
Fix found while measuring: my `bestArt` clashed with j1/j85 `bestArt()` (singer pick) → renamed `stBestArt`; earlier night numbers were re-measured after it.

## 6. Two-way, co-op, old saves
- NPCs: same table (rstats → origSet), same ladder (addArtP, npcMonthly, npcStudy → crsPush), same growth curve (ap), same odds (oSteal/oKeep for everyone), same month-art knowledge rule.
- Co-op: the month art is rolled once on the host (empArtMonth MUTE on the guest; S.emp is a world key); knowledge is personal (p.eaK).
- Old saves: `crsMigrate` once per person (p.crsV): bậc kept, old progress share moved onto the new bậc width; bậc 5 = 100 points. Stats are not rescaled (nothing is taken away).
  The ladder change only slows FUTURE growth. ORIGINS objects of old saves keep their stale `o:` fields — nothing reads them now.

## 7. OWNER PROPOSAL (r2, corrected — main shows this to sếp BEFORE shipping; plain words, VANPHONG ladder)
**Điểm khởi đầu theo thân phận** (nhập cung 18 tuổi; chưa ai giỏi quá "Thuần thục"):
| Thân phận | Sắc | Tài | Tâm cơ | Đức | Sở trường lúc vào cung |
|---|---|---|---|---|---|
| Con gái Tể tướng | 45–70 | 35–50 | 20–30 | 40 | Cầm, Thi, Họa, Kỳ Nhập môn; Dung, Ngôn Nhập môn |
| Con gái Đại tướng quân | 45–70 | 15–30 | 10–20 | 30 | Vũ Nhập môn, Sức 100 |
| Con gái nhà buôn muối | 50–75 | 20–35 | 20–30 | 30 | Nấu, Cầm, Thêu Nhập môn; Bạc nhiều nhất, Danh thấp |
| Cung nữ được sủng hạnh | 55–80 | 10–25 | 30–40 | 30 | Y, Nấu, Thêu Nhập môn; Tai mắt cao |
| Cung nữ tuyển | 45–70 | 10–25 | 25–35 | 30 | Thêu, Nấu Nhập môn; Danh, Bạc gần như không có |
| Công chúa Nam Chiếu | 55–80 | 20–35 | 15–25 | 30 | Vũ, Y Nhập môn |
| Công chúa Bắc Địch | 50–75 | 10–20 | 15–25 | 30 | Vũ Nhập môn, Sức 100 |
| Con gái tội thần | 45–70 | 30–45 | 30–40 | 30 | Thi, Cầm, Thêu Nhập môn |
| Cháu gái Thái hậu | 45–70 | 25–40 | 20–30 | 40 | Họa, Cầm, Thêu Nhập môn; Dung, Hạnh |
| Con gái thầy đồ nghèo | 45–70 | 40–55 | 15–25 | 45 | Thi Thuần thục, Kỳ Nhập môn |
(Bạc, Danh, Sủng, phẩm vị, Thái hậu/Hoàng hậu lúc đầu giữ như cũ.)
**Phi tần NPC** rút thân phận từ đúng bảng này: 4 trong 10 người là con gái quan lại thường (Tài 25–40, Đức 40, Cầm/Thi/Thêu Nhập môn), còn lại chia theo các thân phận trên. Phẩm càng cao thì càng nhiều năm trong cung: mỗi phẩm thêm Danh +8, Bạc +20 và hai môn giỏi nhất +4 điểm; người hiền thì Đức cao, người hiểm thì Tâm cơ cao.

**Thang tài nghệ (mỗi môn 0–100 điểm):** Chưa thạo → Nhập môn (10) → Thuần thục (25) → Tinh thông (45) → Xuất chúng (70) → Tông sư (100, cả đời khổ luyện). Mỗi bậc cộng vào phần thắng việc dùng môn đó: +4 / +8 / +13 / +18 / +24.
Thời gian chăm **một** môn từ con số 0:
| cách học | Nhập môn | Thuần thục | Tinh thông | Xuất chúng | Tông sư |
|---|---|---|---|---|---|
| Tự học, 3 buổi/tháng | ~2 tháng | ~6 tháng | ~1 năm | ~2 năm | ~3 năm |
| Học với thầy, 3 buổi/tháng | ~1 tháng rưỡi | ~3 tháng | ~7 tháng | ~1 năm | ~2 năm |
| Học với thầy, 6 buổi/tháng | ~3 tuần | ~2 tháng | ~3 tháng rưỡi | ~6 tháng | ~1 năm |
| (trước đây, tự học) | vài ngày | 1 tuần | 2 tuần | 3 tuần | 1 tháng |
Môn mang theo từ nhà thì nhanh hơn (ví dụ Vũ Nhập môn lúc vào: học với thầy ~2–4 tháng là Tinh thông).
Việc cần tài cao: tự bốc thuốc chữa con, an thai cần **Y Tinh thông** (trước là bậc 4: nay bậc 4 mất hơn một năm nên hạ xuống); "thơ truyền ra ngoài cung" cần **Thi Tinh thông** (thầy đồ không còn được ngay ngày đầu).
Sắc, Tài, Tâm cơ càng cao càng khó lên (từ 40 chậm một nửa, từ 60 còn một phần tư, từ 80 còn một phần mười). Bị độc, sẹo, ốm mà tụt thì **hồi lại bình thường** tới mức cũ; chỉ phần vượt lên cao mới chậm.

**Đêm lật thẻ — ví dụ (tháng Hoàng thượng vui vẻ bình thường):**
| Người | tháng | Tranh sủng | Chặn ngự giá | Giữ chân |
|---|---|---|---|---|
| Tân nhân, Sủng 10, Sắc 75, Vũ Thuần thục | thường | Khó | Khó | Năm ăn năm thua |
| | ngài chuộng Vũ | Khó | Năm ăn năm thua | Năm ăn năm thua |
| | ngài không ưa Vũ | Liều | Liều | Khó |
| Sủng phi, Sủng 50, Sắc 60, Cầm Tinh thông | thường | Năm ăn năm thua | Khó | Khá chắc |
| | ngài chuộng Cầm | Khá chắc | Chắc | Chắc |
| | ngài không ưa Cầm | Khó | Liều | Năm ăn năm thua |
| Mỹ nhân, Sủng 25, Sắc 85, Vũ Xuất chúng | thường | Khó | Khó | Năm ăn năm thua |
| | ngài chuộng Vũ | Năm ăn năm thua | Chắc | Chắc |
| | ngài không ưa Vũ | Liều | Liều | Khó |
| Sủng phi lâu năm, Sủng 90, Sắc 65, Cầm Tinh thông | thường | Khá chắc | Năm ăn năm thua | Chắc |
| | ngài chuộng Cầm | Chắc | Chắc | Rất chắc |
(Ngài mê sắc / trọng tài / đa tình / lạnh lùng, tâm trạng ngài, người hầu thân tín còn thêm bớt.)
- **Tranh sủng**: dựa vào Sủng, dễ hơn; được: Sủng +1 ngoài đêm thị tẩm; hỏng: Sủng −3, Đức −1; người bị cướp đêm quý ngươi −10, ghen +15.
- **Chặn ngự giá**: dựa vào Sắc + Sủng + môn giỏi nhất (môn tháng tác động mạnh gấp đôi), liều hơn; được: Sủng +8, Danh +3; hỏng: Sủng −8, Danh −2; người bị cướp quý ngươi −18, ghen +20; Hoàng hậu quý ngươi −2.
- **Giữ chân Hoàng thượng** (người được lật thẻ): thành thì mọi người tranh đêm của nàng tụt một bậc phần thắng; nếu không ai giành được: Sủng +2; nếu vẫn bị cướp: oán người thắng nặng gấp rưỡi.
- Mỗi tháng Hoàng thượng chuộng một môn, không ưa một môn; biết qua Tai mắt, lời đồn hay dò la. **Chưa biết thì chữ phần thắng hiện ra không tính môn tháng** (không đoán ngược được), lúc gieo vẫn tính thật.
- Đo trên trạng thái thật (cả nàng lẫn phi tần NPC): Tranh sủng là lựa chọn tốt nhất khoảng 30–60 % số đêm, Chặn ngự giá 30–60 %, còn lại Thôi; trước đây với người chơi giỏi (Sủng gần 100) Tranh sủng tốt nhất 73–88 % số đêm. Chặn ngự giá đáng chọn nhất khi môn giỏi nhất của nàng đúng môn ngài chuộng.

**Cần sếp chọn thêm (chưa bật):** Sủng vẫn lên khoảng 80 sau 12 tháng (cả bản cũ lẫn bản mới). Đề xuất cho Sủng vào cùng đường "càng cao càng khó lên" (một dòng BAL.grow.keys).
Được: Sủng không còn kịch trần sớm, thang phẩm vị có ý nghĩa. Rủi ro: lên phẩm chậm hơn (khả năng: dễ xảy ra; mức: vừa; phát hiện bằng bot đo phẩm vị, sửa bằng nới ngưỡng thăng phẩm). → Được lớn hơn nếu đo trước khi bật.
**Rủi ro của bản này:** bot đo 41 đời: phẩm cao nhất như cũ (trung bình 2,3 so với 2,4), nhưng chết trước 3 năm 7 đời so với 2 đời ở bản cũ (khả năng: có thể; mức: vừa; nhiều nguyên nhân rải rác, có thể do Tâm cơ / Y thuật lên chậm hơn nên ít phát hiện mưu hại; phát hiện: chạy bot lại lúc lên bản, sửa: nới BAL.grow.mul cho Tâm cơ). Bot hiện không lên Hoàng hậu ở cả hai bản nên chưa đo được tỉ lệ Hoàng hậu.
→ Được lớn hơn: tài nghệ không còn 100 sau một tháng, khởi đầu đúng thân phận, đêm lật thẻ có lựa chọn thật; rủi ro chết sớm cần đo lại một lần khi lên bản.

(r1 §7 replaced by the corrected r2 table above, canon overwrite.)

## 8. Tests
- dev/test/balance-core.js (new): 38/38 PASS, 0 page errors (origins from table ×10, NPC origin, ladder 70–130 lessons, two-way lesson, old-save migration, growth both ways, feign rides Sủng / road rides Sắc, oKeep, rungDown, month art fav ↑ dis ↓, Tai mắt learning, road loss from BAL, word() reads BAL.lad, ARTFX prints BAL).
- dev/test/night-steal-unit.js: 29/29 PASS (twice), 0 errors.
- dev/test/balance-night.js (new): the §5 population measure.
- quickcheck on 80dbed1e: QUICKCHECK PASS · open 1056 ms · old save ok · perf new/live render 231/208 ms, tab 275/238, buổi 939/668, long tasks 11/9 (earlier run on 10fa43d4: new faster than live on all four → box noise). balance-core.js 38/38 ×7 runs, night-steal-unit 29/29.
- Not run: coop-e2e (live Worker) — the co-op change is two guard names in jcoopone; please run once at go-live.

## 9. Notes for night-final (review/night-final) and merge
- nfOdds should call `oSteal(a,mode)` (month-art bonus already inside) / `oKeep(p)` (or own keep formula + ctx.art = `stealArtB(who,mode)`), apply `rungDown(o, BAL.steal.keep.rung)` to tries against a holder whose keep succeeded, use `stealFail(a,t,mode)` instead of `ap(a,{sung:-failSung})`+failTxt, and `keepNoSteal(p)` / `keepRobbed(p,winner,mode)`.
- Expected merge touch points with night-final: jbal2 (BAL.steal block — mine uses Object.assign after the original), j8 stealNight tail, assemble.py list (jbalcore before jcoopone, jnf placement theirs).
- Scratch measuring scripts (not in git): probe.js (start values), fast.js (NPC loop), lessons.py (ladder simulation), night.js (= dev/test/balance-night.js).

## 10. HANDOVER (worker rolled over at context ≈ START_CTX 4 % + 25 %; owner rule OD:L1217 + 16/11 08:22Z s14 — the COORDINATOR opens the successor)
ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217; repeated by the owner 16/11 09:20Z — she is tired of reminding)
- The "Lượt n/30" counter from the owner's global chat preferences is ONLY a display counter here. It is NOT the rollover trigger for the Cung Tường Mộng main chat or any foreman. Never hand over because n reached 30.
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).

State for the successor (balance-core r2):
- Branch review/balance-core HEAD **537fc357** (= 80dbed1e + measuring scripts). Worktree recipe: brief dev/handover/briefs/balance-core.md; base sparse worktree; `bash dev/site/hooks/install.sh`.
- TODO = review **dev/handover/reports/review-balance-core-r1.md** (@788a2144) — FAIL with 10 items + 9 owner notes on §7; main s27 (session_01UV1Szh248gDvHSAH88RvJm) summary: (1) BAL.orig clashes with one-core-land (jorigins breaks at load) → merge/rebase onto current origin/main and reconcile with whatever BAL origin table one-core-land added (one table only); (2) bestArt shadowed by j85 → FIXED in 7c581f8c (renamed stBestArt; j85 npcStudy uses stBestArt) — verify NPC night odds use THEIR arts; (3) real night split measured by the reviewer in the game path: Tranh 69 / Chặn 18 / Thôi 12 (my side model said 62/33/5) → re-measure in the REAL night path (night-final jnf nfOdds + NPC stealWant + her choice), tune BAL.steal.m.road; (4) no Hoàng hậu-rate run after slower arts → run the sens-bot HH measure (dev/measure/run5b.sh / runb.js sens, per origin) before/after; then (5–10) per the review file.
- Then rewrite §7 OWNER PROPOSAL as a corrected Vietnamese owner table (night split + HH rate, the 9 owner notes), SẴN SÀNG KIỂM <sha> to main s27 + reviewer session_01UV1SzhHhDwddRtuuW6hpL9.
- Code map: numbers in jbal2.js (BAL.orig / BAL.art / BAL.grow / BAL.lad / BAL.steal.m,art,keep,ea); logic in dev/build/jbalcore.js (assembled before jcoopone); edits in j1 (ORIGINS numbers removed, ladIdx/word), j2 (start→origSet, addArt→crsPush, deck card loss), j8 (oSteal, stealWin, stealFail, npcMonthly→addArtP), j85 (addArtP/addVir/npcStudy/artBonus/ladder modal), jtabs (kicker + bar), 37 art-odds sites (artO/artOE/artSide), jcoopone (empArtMonth MUTE, eaLearn ONLY_ME).
- Tests: dev/test/balance-core.js (38 checks), dev/test/balance-night.js (side model — r1 says use the game path instead), dev/test/night-steal-unit.js 29/29. Scripts: dev/measure/bc-probe.js, bc-fast.js, bc-lessons.py, bc-sum.py, inbc.js (sens-bot monthly trace: INP2=inbc.js).
- night-final #3 (session_01UV1SzhwBU5vBCvZomnavDM) merged 10fa43d4 and was told to take 80dbed1e; keep BAL.steal.keep names {base,sung,sac,art,rung,gain,oan,npcP}; BAL.steal.choice is theirs.

## 11. ROUND 2 (successor worker session_01UV1SzikYHwChrtLtsPGaQy; START_CTX ≈ 6 % of the 1M window) — fixes for review-balance-core-r1 (FAIL @10fa43d4)
Branch **review/balance-core** HEAD **9abcfa72** (base: r1 537fc357 + merge of review/one-core-land 29e3738f).

| # | r1 FAIL item | what changed (r2) |
|---|---|---|
| 1 | BAL.orig clash with one-core-land | Merged origin/review/one-core-land into the branch (conflicts resolved: j2 stealX = one-core's nightG/nightA text + mode-aware stealKem; jorigins = one-core's BAL-read costs + artO; j13 / jtds = main's worldOn / kitOffBac + one-core's BAL keys). My start table renamed **BAL.start** (BAL.orig stays one-core's). Bắc Địch start numbers live only in BAL.start.bd (one-core's `BAL.orig.bd {o,th}` + jorigins `o:/th:/art:` removed: dead duplicates, nothing reads ORIGINS numbers since origSet). |
| 2 | bestArt shadowed | Verified: stealArtB / npcStudy use stBestArt(p) on p's own arts, Thêu/Nấu count. New test: NPC best Thêu vs her Cầm, month art Thêu favoured / Cầm disfavoured → NPC up, her down; disfavoured Thêu lowers the NPC. balance-core.js 42/42 ×3, the r1 flaky case cannot recur (month art forced). |
| 3 | night split came from bug 2 | Re-measured on REAL states (below, §11.2) and BAL.steal.m retuned. |
| 4 | one-core-guard syntax | `BAL.steal.cost= / .m= / .art= / .keep= / .ea=` plain assignments (no Object.assign). |
| 5 | bậc × N leftovers (whole family) | Scan (bậc×N / arts.k×N / lv×N / bestArt().w×N): 23 rule sites → 0. j68e ×5, j68f ×2, j7 empnight, j75 her night prep + NPC night (one best-art pick `nightArt` for both, no Thêu/Nấu, artOE), jkc kcFest (artOE × BAL.art.score), j85 handmade quality / gift / Công / Hạnh now per POINT (BAL.art.fx), teacher fee `5+bậc×5` typed in 7 places → artFee (BAL.art.fee). Kept (justified): j71 / j82 contest scores = bậc × weight, relative between people, the same function for everyone; minigame speed by lv (j5/j91/jts) = difficulty, not odds. |
| 6 | HH rate after slower arts / stats; 22+ gates | Gate table §11.3; Y cure / an thai and "thơ truyền ra ngoài" moved to BAL.art.gate. Sens-bot life run branch vs main §11.4. |
| 7 | thd story beat on day 1 | `BAL.art.gate.thiFame` 3 (Tinh thông): thd (Thi 26) reaches it in ~2–6 months. |
| 8 | "gấp đôi" text | prints BAL.art.emp in words (xWord: "gấp rưỡi"); lật thẻ part prints new BAL.art.flipX 2 (was a typed 2 in j8 nightCh). |
| 9 | old ladder words | Tông sư (artNm(5)) in j23 / j85 badges; KIT_GLOSS "Tác phẩm" prints BAL.art.nm[5]; the course cards pass bar:false at bậc 5 so the kit's generic "Đã tinh thông" chip never shows on an art. (Kit text itself untouched: kit keeper's part.) |
| 10 | one fact, three numbers | Course / Tứ đức / Tác phẩm cards: kicker = tier name, bar = points/100 ("Tiến bộ 52/100"); the kit's "Bậc n/5" steps stay (they open the ladder ⓘ). KIT REQUEST (optional polish): kitSkillCard steps label from a word list (tier names) instead of "Bậc n/5". |

Owner notes on §7 (r1): 1 corrected night table below; 2 cnv Tâm cơ 15–25 → **25–35**; 3 salt merchant Đức 25 → **30** (low status stays in Danh 8); 4 NPC side now in the table; 5 time table says Tự học / thầy; 6 **stealShown(a,mode)**: the odds word she SEES leaves out the month-art part while she does not know his month art (eaKnows), the roll uses the true odds — night-final must print word(stealShown) on the flip buttons (told); 7 regaining a LOST value below her own peak (poison, scar, illness) runs at **BAL.grow.back 1**, only new heights are slow (p.pk = peak, her and NPCs); 8 examples recomputed with the game functions; 9 Sủng / Danh / Bạc growth measured (§11.4), Sủng on the curve stays an owner choice.

### 11.2 Night choices — re-measured (dev/measure/bc-night-collect.js → bc-night-opt.js / bc-night-search.js)
States: NPC consorts from the real weekly game loop (2 seeds × 3 lives × 2 y, 966 person-weeks) + HER states from the sens-bot palace play (41 lives, 3900 person-weeks; her Sủng median **94**, Sắc 70). The old numbers rode Tranh sủng on Sủng, so a real player (Sủng near 100) found Tranh sủng best in 73–88 % of nights (her row, r1 numbers) = the owner's "đa số tôi đều chọn tranh sủng".
EV per option = odds × (N + win − holder cost) + (1 − odds) × loss; holder cost = (thiện cảm + ghen) × 0.2 Sủng/pt + Hoàng hậu /3; Thôi = 0.
| best choice Tranh / Chặn / Thôi (%) | NPCs | her |
|---|---|---|
| N 8, no holder cost | 34 / 60 / 7 | 30 / 62 / 7 |
| N 15, no holder cost | 46 / 53 / 1 | 45 / 53 / 2 |
| N 8, holder cost | 24 / 39 / 37 | 31 / 46 / 24 |
| N 15, holder cost | 64 / 32 / 4 | 58 / 37 / 5 |
Median odds Tranh sủng 9 points above Chặn ngự giá (the safer one). Chặn ngự giá best in ≈ 83 % of states when her best art is his favoured art, ≈ 25 % when disfavoured. Close calls (EV gap < 1 Sủng) 30–60 % of states: the choice is often genuinely close.
New BAL.steal.m: feign b 30, Sủng .35, art .75, win Sủng +1, lose Sủng −3 Đức −1, holder thiện cảm −10 ghen +15; road b 4, Sắc .35 + Sủng .25, art 2, win Sủng +8 Danh +3, lose Sủng −8 Danh −2, holder −18 / +20, Hoàng hậu −2. Keep unchanged.
NPCs in jnf pick their mode by odds (jsteal stealWant), so their actual split follows the odds, not the EV.

### 11.3 Course gates (bậc) — old time → new time (lessons, from 0 / from the origin start)
| gate | where | old (Tự học) | new Tự học · thầy | decision |
|---|---|---|---|---|
| Cầm/Vũ/Kỳ/Họa ≥ 3 (Emperor art acts) | j2 | ~7 lessons | from 22 pts: 21 · 12 (≈ 2–4 months at 6/month); from 0: 35 · 20 | keep (signature acts, first-year reachable in her origin art) |
| Y ≥ 4 → **3** (chữa bệnh cho con, an thai, jact sick child) | j2, jact | ~10 | bậc 4 from 16 pts: 54 · 32 (> 1 year) → bậc 3: 25 · 15 | lowered (BAL.art.gate.yCure) |
| Thi ≥ 2 → **3** ("thơ truyền ra ngoài cung") | j4 | ~4 | from 26: 17 · 10 | raised (F7: thd fired on day 1) |
| Thi ≥ 3 / Tài ≥ 70 (Tài nữ) | j4 | ~7 | as above | keep |
| Y ≥ 2 (detect poison / rash / face, NPC doctor) | j8 j32 j70 j67 jrash jface | ~4 | from 0: 17 · 10; cn starts 16 → 6 · 4 | keep |
| Y ≥ 3 (Tự bốc thuốc, jtruth) | j13 jtruth | ~7 | 25 · 15 from 16 | keep |
| Thi ≥ 3, Cầm ≥ 1 / 4, monthly passives at 3–5 | j3 j23 j85 | 1–15 | months–years | keep (mastery rewards) |
| Cầm/Thi/Họa ≥ 1–2 (craft stories, gifts) | j72 jgift jevb | 2–4 | 7–17 · 4–10 | keep |
| NPC teacher ≥ 4 or better than her | jrcp jtds | — | NPC best art year 4 is bậc 2–3 → she mostly learns from teachers who are simply better | keep |

### 11.4 Life run, branch vs main (sens bot inpage6, 9-origin rotation, HHSTOP; dev/measure/runb.js + inbc.js + inns.js; 41 / 42 lives)
| | main | branch |
|---|---|---|
| reached Hoàng hậu | 0 / 42 | 0 / 41 |
| highest rank (avg) / rank ≥ 4 | 2.38 / 5 | 2.33 / 6 |
| mean life (years) | 12.2 | 10.8 |
| died < 3 years | 2 (5 %) | 7 (17 %) — causes spread (2 poison, 2 illness, birth, bùa, an old-age event); cause mix over all lives the same (poison 3 / 3, illness 12 / 13) |
| Sắc month 0 / 12 / 24 / 36 | 63 / 82 / 88 / 91 | 62 / 68 / 69 / 70 |
| Tài | 59 / 62 / 63 / 65 | 31 / 32 / 32 / 32 |
| Tâm cơ | 22 / 69 / 92 / 93 | 24 / 54 / 70 / 79 |
| Đức | 32 / 50 / 52 / 53 | 34 / 51 / 58 / 66 |
| Sủng | 23 / 80 / 80 / 81 | 24 / 80 / 80 / 73 |
| Danh | 20 / 14 / 17 / 15 | 19 / 11 / 13 / 14 |
| Bạc | 85 / 7 / 6 / 6 | 88 / 5 / 10 / 5 |
Honest limits: the sens bot never reaches Hoàng hậu on MAIN either (it takes almost no lessons, artMax bậc 1), so the HH target (OD:L20 ~32 %) cannot be checked with this bot; the rank ladder is unchanged (2.38 vs 2.33). The early-death gap (2 vs 7 of ~40) is within noise for n≈40 (p≈0.08) but is the one risk to watch at go-live (likely cause: slower Tâm cơ / Y detection). Sủng still reaches 80 by month 12 on both (owner choice, §7).

### 11.5 Tests (r2)
- dev/test/balance-core.js 42/42 ×4 runs, 0 page errors (new: NPC uses her own best art; Thêu disfavoured lowers the NPC best at it; stealShown hides the unknown month art; regain below peak not slowed).
- dev/test/night-steal-unit.js 29/29, 0 page errors.
- dev/test/coop-e2e.js (live Worker) 59/59 passed (fold / ipad / solo 0 page errors).
- quickcheck.sh: QUICKCHECK PASS (open 1306 ms, old save ok, perf new/live render 262/251, tab 292/302, buổi 863/844, long tasks 10/10) but CORE GATES G1 one-core-guard FAIL = 5 numbers in **dev/build/jgrey.js** only (KIT §84 opt-greyed kit sample on main, added after the one-core baseline; not touched by this branch). Every other module: inline count 6656 vs baseline 6691 (−35). Any branch that carries one-core-land onto current main hits the same 5; kit keeper / one-core owner to move them to BAL (or allow the kit sample).
- Life run §11.4 (sens bot, 41/42 lives); night measure §11.2.

### 11.6 For the reviewer / night-final / merge
- night-final (#3 session_01UV1SzhwBU5vBCvZomnavDM) told: keep keys {base,sung,sac,art,rung,gain,oan,npcP} (its jnf still reads keep.keepSung / keep.oanX from 10fa43d4 → use keep.gain / keep.oan or keepNoSteal/keepRobbed), new m values, BAL.orig → BAL.start, and print word(stealShown(a,mode)) on the flip buttons (roll = nfOdds).
- This branch now CONTAINS review/one-core-land 29e3738f: ship it with or after one-core-land.
- Scratch tools moved into the repo: dev/measure/bc-night-collect.js (states), bc-night-opt.js (EV/share model), bc-night-search.js (random search), inns.js (her night states in a sens-bot life).

