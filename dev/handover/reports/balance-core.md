# balance-core — report (worker session_01UV1Szkjt9soqZga18GCoey, opened by MAIN s26)

START_CTX ≈ 4 % of the 1M window. Branch **review/balance-core** (base origin/main 08725411). Owner lines: OD 16/11 22:45Z, 22:50Z, 23:00Z, 23:05Z, 23:08Z, 22:10Z.
Status: built + tested at **10fa43d4**; **ships only after the owner agrees to the OWNER PROPOSAL (§7)** (main shows it to her first).

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
| Chặn ngự giá (road) | 14 | Sắc .35, Sủng .05 | 1.5 | Sủng +6, Danh +2 | Sủng −5, Danh −2 | −25 / +30 | −4 |
| Giữ chân (keep) | 35 | Sủng .3, Sắc .1 | 1 | success: every try against her −1 rung (`rungDown`); nobody took it: Sủng +2; robbed anyway: hit × 1.5 | — | | |
Best art: most points; Emperor's month art (S.emp.ea {f,d}, rolled monthly, his trait doubles the weight of the arts he prizes): favoured +odds[bậc] × 1, disfavoured −odds[bậc] × .75, other 0.
Who knows the month art: Tai mắt ≥ 5 at the month start; else each week a rumour 5 + Tai mắt × 4 %; "dò được" via discover 35 %; NPCs the same (measured: she knows it ≈ 18 % of weeks with Tai mắt 0–1, NPCs ≈ 13–18 %).
Measured on the real consort population (her + NPCs, 3 lives × 2 y, value of a night = 8 Sủng): **best choice Tranh sủng 58 %, Chặn ngự giá 37 %, Thôi 5 %**
(before: Tranh sủng ≈ 96 %, same prize for both). Chặn ngự giá is best for 67 % when her best art is his favoured one, 35 % neutral, 20 % disfavoured.
Odds 10/50/90 %: Tranh sủng 38/58/79, Chặn ngự giá 28/43/60, Giữ chân 41/60/80.

## 6. Two-way, co-op, old saves
- NPCs: same table (rstats → origSet), same ladder (addArtP, npcMonthly, npcStudy → crsPush), same growth curve (ap), same odds (oSteal/oKeep for everyone), same month-art knowledge rule.
- Co-op: the month art is rolled once on the host (empArtMonth MUTE on the guest; S.emp is a world key); knowledge is personal (p.eaK).
- Old saves: `crsMigrate` once per person (p.crsV): bậc kept, old progress share moved onto the new bậc width; bậc 5 = 100 points. Stats are not rescaled (nothing is taken away).
  The ladder change only slows FUTURE growth. ORIGINS objects of old saves keep their stale `o:` fields — nothing reads them now.

## 7. OWNER PROPOSAL (main shows this to sếp BEFORE shipping; plain words, VANPHONG ladder)
**Điểm khởi đầu theo thân phận** (nhập cung 18 tuổi, chưa ai giỏi quá "Thuần thục"):
| Thân phận | Sắc | Tài | Tâm cơ | Đức | Sở trường lúc vào cung |
|---|---|---|---|---|---|
| Con gái Tể tướng | 45–70 | 35–50 | 20–30 | 40 | Cầm, Thi, Họa, Kỳ đều Nhập môn; Dung, Ngôn Nhập môn |
| Con gái Đại tướng quân | 45–70 | 15–30 | 10–20 | 30 | Vũ Nhập môn, Sức 100 |
| Con gái nhà buôn muối | 50–75 | 20–35 | 20–30 | 25 | Nấu, Cầm, Thêu Nhập môn; Bạc nhiều nhất, Danh thấp |
| Cung nữ được sủng hạnh | 55–80 | 10–25 | 30–40 | 30 | Y, Nấu, Thêu Nhập môn; Tai mắt cao |
| Cung nữ tuyển | 45–70 | 10–25 | 15–25 | 30 | Thêu, Nấu Nhập môn |
| Công chúa Nam Chiếu | 55–80 | 20–35 | 15–25 | 30 | Vũ, Y Nhập môn |
| Công chúa Bắc Địch | 50–75 | 10–20 | 15–25 | 30 | Vũ Nhập môn, Sức 100 |
| Con gái tội thần | 45–70 | 30–45 | 30–40 | 30 | Thi, Cầm, Thêu Nhập môn |
| Cháu gái Thái hậu | 45–70 | 25–40 | 20–30 | 40 | Họa, Cầm, Thêu Nhập môn; Dung, Hạnh |
| Con gái thầy đồ nghèo | 45–70 | 40–55 | 15–25 | 45 | Thi Thuần thục, Kỳ Nhập môn |
(Bạc, Danh, Sủng, phẩm vị, Thái hậu/Hoàng hậu lúc đầu giữ như cũ.) Phi tần NPC cũng rút thân phận từ đúng bảng này.

**Thang tài nghệ (mỗi môn 0–100 điểm):** Chưa thạo → Nhập môn (10) → Thuần thục (25) → Tinh thông (45) → Xuất chúng (70) → Tông sư (100, cả đời khổ luyện).
Mỗi bậc cộng vào phần thắng việc dùng môn đó: +4 / +8 / +13 / +18 / +24. Thời gian chăm học **một** môn:
| học bao nhiêu | Nhập môn | Thuần thục | Tinh thông | Xuất chúng | Tông sư |
|---|---|---|---|---|---|
| 1 buổi/tuần (≈3/tháng) | ~2 tháng | ~4 tháng | ~9 tháng | ~1 năm rưỡi | ~2 năm rưỡi–3 năm |
| 2 buổi/tuần (≈6/tháng) | ~1 tháng | ~2 tháng | ~4–5 tháng | ~8 tháng | ~1 năm rưỡi |
| (trước đây) | vài ngày | 1 tuần | 2 tuần | 3 tuần | 1 tháng |
Sắc, Tài, Tâm cơ càng cao càng khó lên (từ 40 chậm một nửa, từ 60 còn một phần tư, từ 80 còn một phần mười).

**Đêm lật thẻ — ví dụ:**
| Người | Tranh sủng | Chặn ngự giá | Giữ chân |
|---|---|---|---|
| Tân nhân, Sủng 10, Sắc 75, Vũ Thuần thục — tháng ngài chuộng Vũ | Khó | Năm ăn năm thua | — |
| như trên — tháng ngài không ưa Vũ | Khó | Khó (sát Liều) | — |
| Sủng phi, Sủng 50, Sắc 60, Cầm Tinh thông — tháng thường | Năm ăn năm thua | Khó | Năm ăn năm thua |
| như trên — tháng ngài chuộng Cầm | Khá chắc | Khá chắc | Khá chắc |
| Mỹ nhân, Sủng 25, Sắc 85, Vũ Xuất chúng — tháng ngài chuộng Vũ | Khá chắc | Chắc | — |
Tranh sủng: dễ hơn, được ít, hỏng mất ít (Sủng −3, Đức −1). Chặn ngự giá: liều hơn, thắng thêm Sủng +6, Danh +2; hỏng mất Sủng −5, Danh −2; người bị cướp và Hoàng hậu giận hơn.
Giữ chân Hoàng thượng thành: mọi người tranh đêm của nàng tụt một bậc phần thắng. Mỗi tháng Hoàng thượng có một môn chuộng, một môn không ưa; biết qua Tai mắt, lời đồn hay dò la.

**Cần sếp chọn thêm (chưa bật):** Sủng hiện lên 100 sau khoảng 6–12 tháng chơi giỏi. Đề xuất cho Sủng vào cùng đường "càng cao càng khó lên" (một dòng BAL.grow.keys); phải đo lại tỉ lệ lên Hoàng hậu trước khi bật.
Được: Sủng không còn kịch trần sớm, thang phẩm vị có ý nghĩa. Rủi ro: tỉ lệ lên Hoàng hậu có thể giảm (khả năng: có thể; mức: vừa; phát hiện bằng bot lên Hoàng hậu, sửa bằng nới thang). → Được lớn hơn nếu đo trước.

## 8. Tests
- dev/test/balance-core.js (new): 38/38 PASS, 0 page errors (origins from table ×10, NPC origin, ladder 70–130 lessons, two-way lesson, old-save migration, growth both ways, feign rides Sủng / road rides Sắc, oKeep, rungDown, month art fav ↑ dis ↓, Tai mắt learning, road loss from BAL, word() reads BAL.lad, ARTFX prints BAL).
- dev/test/night-steal-unit.js: 29/29 PASS (twice), 0 errors.
- dev/test/balance-night.js (new): the §5 population measure.
- quickcheck on 10fa43d4: QUICKCHECK PASS · open 1246 ms · old save ok · perf new/live render 217/238 ms, tab 306/337, buổi 789/959, long tasks 11/12.
- Not run: coop-e2e (live Worker) — the co-op change is two guard names in jcoopone; please run once at go-live.

## 9. Notes for night-final (review/night-final) and merge
- nfOdds should call `oSteal(a,mode)` / `oKeep(p)`, apply `rungDown(o, BAL.steal.keep.rung)` to tries against a holder whose keep succeeded, use `stealFail(a,t,mode)` instead of `ap(a,{sung:-failSung})`+failTxt, and `keepNoSteal(p)` / `keepRobbed(p,winner,mode)`.
- Expected merge touch points with night-final: jbal2 (BAL.steal block — mine uses Object.assign after the original), j8 stealNight tail, assemble.py list (jbalcore before jcoopone, jnf placement theirs).
- Scratch measuring scripts (not in git): probe.js (start values), fast.js (NPC loop), lessons.py (ladder simulation), night.js (= dev/test/balance-night.js).
