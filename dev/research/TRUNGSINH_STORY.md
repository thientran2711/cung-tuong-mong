# TRUNGSINH_STORY — how trungsinhgame.com builds story, endings and replay (study only)

PRIORITY #1 CHECK: OD 25/11 ~07:10Z–08:10Z (≥20 lives, closure endings, why replay, death/life length, morning report) | main: dev/RARE_ENDINGS.md, j32.js over(), jroute.js, j99succ.js, jmort.js (ours, read-only) | review/* review/trungsinh-story (this) | claims TRUNGSINH lead + TS-P2/P3/P4b.
STUDY ONLY — no game build (feature freeze, law 18). Every recommendation goes to PARKING_LOT for sếp's pick. Nothing of theirs (art, text, assets) is copied into our game; Vietnamese names below are quoted only to identify what we saw.
Sources: dev/research/trungsinh/life-NN.md (one file per life, real taps), endings_catalog.txt (their 32 endings), ach_catalog.txt (33 achievements), CATALOG_endings_achievements.md, ledger-TS-P3.md, OURS_endings_summary.md, our robot rates (handover branch dev/handover/robot/rates-E-valid-20261125.md, 314 lives).
LIVES IN THIS VERSION: ALL 20 (01–20), 4 seats: lead 01–05, TS-P2 06–10, TS-P3 11–15, TS-P4/P4b 16–20. Honest gap: no life reached son → Thái tử → abdication.

## Tóm tắt cho sếp (≤8 dòng)
1. Trùng Sinh chết nhanh thật: 20 kiếp, 13 chết (65 %), giữa 37 phút thật, tuổi chết giữa 20; 6/13 chết vì MỘT thanh sức khỏe bị thẻ hãm hại hàng tháng rút dần (−4…−18), chữa chỉ +3; còn lại chết vì khó sinh, ám sát trên hồ, bị xử, tuẫn táng, già.
2. Sinh nở: 8 lần mang thai → 6 lần sinh, 2 chết khi sinh (33 %/lần sinh; 1 lần sức khỏe 98 vẫn chết, không báo trước, không lựa chọn), 1 sảy thai vì bị hại. Chỉ «An Thai Hoàn» 1000 bạc mới chắc an toàn. Game mình: 14,4 %/lần sinh.
3. Kết cục KHÉP LẠI (không chết) chiếm 35 % (7/20): ra cung lấy chồng, cung nữ 25 tuổi ra cung (2 lần), vua băng → vào chùa, dưỡng thai biệt cung khi vua bị ám sát, lãnh cung trọn đời, trượt tuyển về quê sống tới 55 — mỗi cái 1 đoạn văn + 1 thẻ kết. Vua băng mà không có con thì bị tuẫn táng.
4. Vì sao người ta chơi lại: kiếp ngắn (7–40 phút), bấm 1 lần là kiếp mới (~5 giây), thẻ kết có danh hiệu (nguyên nhân + để lại tiếng), sưu tập 32 kết cục + 33 thành tựu, giữ 60 kiếp.
5. Game mình đã có nhiều kết cục hơn hẳn (176 đại kết cục, 83 hiếm, 14 lối riêng) nhưng kiếp dài, vào lại 2 chạm + mở đầu, chưa có danh hiệu trên thẻ kết, chưa có thẻ chia sẻ.
6. TOP 10 đề xuất (đưa vào PARKING_LOT, sếp chọn): thẻ kết 2 danh hiệu, "vua thoái vị cùng nàng du ngoạn", "dưỡng thai biệt cung khi đổi triều", lời kết tua nhanh cả đời, chuyển kiếp 1 chạm…
7. Không sao chép gì của họ; chỉ học cách làm.
~100% xong (đủ 20 kiếp) / 0% chơi được (chỉ nghiên cứu, không build)

## 1 · Their story machinery
- **One body, one meter.** A single health meter (HP 0–100) decides almost every death. Each game month brings ~1 modal; about 1 in 3 is a forced loss (water splash, swapped tea, night shift in rain, rumours, chép sổ, kneeling) costing −4…−18 HP. The healer gives +3 HP for 15 bạc. When HP hits 0 the life ends with a COMPOSED sentence: a fixed head («Sức khỏe suy kiệt sau biến cố tháng này / sau lần bị hãm hại») + the body text of the last harm card. No death warning is ever shown.
- **Odds on every option** («Thuận lợi NN %»), moved by stats: the same card read 8 %/11 % at low stats and 75 %/84 % at high stats; self-care 15–18 % at low Trí, 82–91 % at high Trí; cap 96 %; luck stunts fixed at 8 %; scheme options 8–37 %. Paid options show a price instead and grey out when unaffordable.
- **Envy (Đố kỵ) as the danger dial.** +9 on promotion, +14 on pregnancy. High envy fires «Lệnh triệu tra» (trial; failure = quản thúc 6 months, HP −18, demotion; «Nhận lỗi» = demotion, HP −12, −30 bạc, envy −20) and «Thai kỳ bị hãm hại» (miscarriage, HP −17). Conception shows the only real warning: «Điểm đố kỵ cao có thể bị hãm hại, ảnh hưởng quá trình mang thai».
- **Template arcs with NAMED, rank-climbing NPCs.** A bully maid climbs Thải nữ → Bảo lâm; the Empress escalates gift box → water ×4 → cat attack (Dung set to 0 forever, blocking every later exam). Harm chains: «Sóng ngầm sau cửa son» → «Chén trà sau lời gièm» → «Đêm dài chịu phạt» kill even a maid who never met the Emperor. A defence chain exists (evidence wins: «Mật thư lộ nét giả», envy −8…−11; or «Chứng cứ thành cạm bẫy», −16 HP).
- **Ladders.** Tuyển tú drawing (85 Bảo lâm / 70 Ngự nữ / 50 Thải nữ / <50 fail → go home or become a maid, no point). «Đại khảo nội đình» every 24 months (3 stat thresholds + drawing), caps at Tiệp dư; above that only the Emperor's grace («đặc cách thăng một phẩm» after a pleased night). Maids: memory-pair exam every 2 years (Cung nữ thường → trưởng → Nữ quan), one-off «Một lần đặc tuyển» drawing jumps a maid to consort, and at 25 «Cửa cung mở» offers to leave.
- **Emperor favour engine.** Per-NPC Thiện cảm (50 unlocks random events, cap 100); gifts once per person per month (a crafted sachet +18), talk +6; all from the same 5 actions a month. Minigames with the Emperor: cổ cầm rhythm 30 s (<25 = favour loss, a fail sent one life to Lãnh cung 15 months), caro, boat trip, fishing (score 90 → chest or the night).
- **Childbirth is a hidden roll, not a health check.** Life 20 conceived on the first night and died in labour at HP 98 with all stats 100: one card «Khó sinh · Không giữ được con … Sức khỏe −30 … không còn khả năng mang thai», then death; no odds, no choice. The only protection is the shop item «An Thai Hoàn» (1000 bạc, once per 5 years, guarantees a safe pregnancy/birth) — a money gate, not a skill gate.
- **Disfigurement blocks the whole favour road.** A rival's cat/lynx scratch sets Dung to 0; every later summons is refused at the door («đã bị hủy dung, gương mặt gớm ghiếc, liền đuổi về», 16 and 20 refusals in lives 09/10) until «Dịch Dung đan» (500 bạc) is bought — one bought it at 32.
- **No heir = buried with the late Emperor.** When the Emperor dies of old age and she has no child: «Lệnh tuẫn táng được ban xuống» (life 10, 39y6). With no child but a gentler roll: royal temple for life (life 09, 35y11).
- **Titled story chapters.** At very high favour with a rival targeting her, the game switches to scripted cards under a chapter header («YÊU PHI HOẠ QUỐC», then «Báo thù cho tiên đế»), no odds, few choices; the rival climbs to Hoàng hậu through «Đại lễ sắc phong»; pressing «Ám sát tân đế» ended in «Trả thù thất bại · Ban án tử» at 21y8 (life 13).
- **Pleasure trips can kill.** «Thích khách trên hồ» on a Du hồ trip: «Tìm chỗ ẩn nấp…» / «Lao ra cứu giá», NO odds shown; life 14 died with the Emperor («Sóng dữ ngự hồ», 19y2); life 11 hid and lived. The only prevention is declining the trip («Xin hẹn dịp khác»).
- **Maid exit at 25.** «Hai mươi lăm tuổi · Cửa cung mở»: leave (epilogue: never married, lived to 46) or stay by passing exams; the head-maid career reaches Tổng quản ma ma at 24 (life 19).
- **Pregnancy.** Only from «lật thẻ bài» nights (accept / «Cáo bệnh xin khất» → night dress → «Có tin thai» or not), not tied to love (conceived at favour −23). Chip «Mang thai (tháng 6/9)»; sex and grade («Tư chất») revealed at birth; birth = rank +1 edict, outfit, Ân điển +12, achievement. No child-raising seen; children outlive the mother in «hồ sơ con cái».
- **Reign change for everyone.** Each life has its own Emperor and cast; old Emperors die and a 23–25-year-old successor takes over (rank and exam progress carry over); an assassination can close the life.
- **Yearly rhythm.** Mùng Một feast (outfit, 3 blessings, lottery), fashion festival in month 6 (Hoa khôi wins the night; skip for 50 bạc), «Chiếu thăng phẩm» news of rivals, rivals' long «ĐẠI LỄ SẮC PHONG».
- **Real objects.** Fires burn named outfits; bullies take items and they vanish from the collection.
- **Lãnh cung / cấm túc** swaps the action menu (Trồng cây, Viết kinh, May vá, Thiền…), pauses the exam, returns her one rank lower.
- **Hidden-father plot.** Overheard «Mật ước» → the Thân vương's night visits → child registered as the Emperor's heir → «Lời hẹn dưới hàng liễu» romance (+10 each) → elopement at shown 50 % with three named outcomes.
- **Late-life loop.** A maid life after year ~12 recycles the same ~40 cards; old age is a hidden timer (death at 54 with HP 76).

## 2 · Ending catalog (their own 32 + what we reached)
End card: «KIẾP THỨ N · ĐÃ KHÉP LẠI» / «Một kiếp phù sinh» / name / age · rank / one cause sentence / 1–4 epithets (a CAUSE epithet + LEGACY epithets: silver, kindness, scheming, talent, rank). A small «Khép lại một kiếp · +1» modal comes first. Buttons «Luân hồi · Một kiếp mới» / «Đọc lại cuộc đời» (full journal). Non-death closures show ONE epithet; deaths show cause + legacy; old age showed 4.

| Ending | Kind | Trigger / meaning | Seen (life) |
|---|---|---|---|
| Hoa rụng vì bệnh | death | illness | 01, 05 |
| Áo vải bạc màu | death / tag | worn out (HP drain) | 02, 03, 16, 17 |
| Khó sinh | death | dies in childbirth (child saved + posthumous rank in 12; child also lost in 20, at HP 98) | 12, 20 |
| Thọ chung chính tẩm | death | old age timer | 07 |
| (extra) Trả thù thất bại · Ban án tử | death | failed revenge (assassinating the new Emperor) in a titled chapter | 13 |
| Khép cùng tiên đế (tuẫn táng) | death | Emperor dies of old age, she has no child | 10 |
| Hương độc sau rèm | death | poison | — |
| Án dưới cửa son | death | verdict | — |
| Một đêm biến cố | death | sudden accident | — |
| Xả thân cứu giá | death | shields the Emperor | — (rescue survived in 18) |
| Sóng dữ ngự hồ | death | dies with the Emperor in the lake attack (no odds shown) | 14 |
| Tranh ngôi thất bại · Ban chết | death | loses the succession fight | — |
| Ám sát vì thù cũ / Bóng dao đoạt mệnh | death | revenge / sudden assassination | — |
| Lạc nhau ngoài kinh thành | death-like closure | failed elopement, lover named on card | 18 |
| Trăng lạnh cô cung | closure-bad / tag | life sentence to lãnh cung («Bạch nguyệt quang… trở về») | 04 (+ tag 02) |
| Mật thư bại lộ | closure-bad | elopement found out → lãnh cung | — |
| Bình yên sau đổi triều | closure-good | Emperor dies; mother + child sent to a detached palace / fief | 11 |
| Mẫu nghi tân triều | closure-good | her son crowned, she becomes Thái hậu | — |
| Cùng người du ngoạn thiên hạ | closure-good | Emperor abdicates to the Crown Prince, travels with her | — |
| Tiếng chuông cuối đời | closure | late Emperor dies (old age), no heir, she enters the royal temple | 09 |
| Rời cung khi đổi triều | closure | new court sends staff home | — |
| Duyên nơi chân trời | closure-good | elopement succeeds, new name | — |
| Duyên ngoài cửa son | closure-good | granted a marriage, leaves with her soulmate | 06 |
| Ngoài bức tường son | closure-good | lives out her life outside the palace (maid exit at 25 → epilogue to 46 / to 54 with 5 children) | 06, 15, 19 |
| Tự chọn luân hồi | forced quit | player ends it (no point, all lost) | button only |
| Phượng ghi sử sách · Một đời chưởng sự · Mực thơm còn mãi · Người giữ lòng lành · Bóng người sau rèm · Gấm vóc đầy rương · Một đời vô danh | legacy tags | Empress · head maid · talent · good deeds · schemer · fortune · nameless | Mực thơm 09/10/18; chưởng sự 15/19; gấm vóc 07/15; lòng lành/sau rèm 07; vô danh 01/03/05/16/17 |
| (extra) Trượt tuyển tú · Xuất cung | closure, no point | failed drawing → home; epilogue to 55 | 08 |

### Closure endings — why they satisfy
- **Short and certain.** One paragraph, then the card. The life-sentence ending is one forced button («Lặng người tiếp chỉ»), no fight.
- **Time-skip epilogue.** The failed-selection ending tells the whole rest of her life in 4 sentences (married a scholar at 20, 3 children, trade went well, lived to 55) with stat tiles «Hưởng thọ 55 tuổi», «Con cái 3». It turns a "fail" into a gentle full life.
- **Story, not stats, closes the life.** Assassination of the Emperor while pregnant → «Bình yên sau đổi triều»: the player did not cause it, but the closure reads as protection, not loss. Drama tropes (white-moonlight first love returns) close a life the way a TV episode would.
- **Every closure still pays** (+1 point) except forced quit and failed selection — so a calm ending is never "wasted".
- **Named people on the card** (the lover on the failed elopement) make the end personal and shareable.

## 3 · Side by side with OURS
| Topic | Trùng Sinh | Ours (origin/main) |
|---|---|---|
| Ending count | 32 catalog endings (≈15 causes/closures + legacy tags) | death texts 63; Đại kết cục 176 (352 titles, 62 summits); rare 83; Kế vị 13; Lối riêng 14 |
| Alive closures | ~10 (marriage out, abdication trip, temple, fief, new-court release, elopement, lãnh cung for life) | Xuất gia j14:21 / jroute:182; Được ban hôn jroute:190; Xuất cung về quê jroute:194; Phế làm thứ dân jroute:197; Một đời an nhiên jroute:253; Cao chạy xa bay jroute:172; Thái phi theo con ra phủ jmort:194-198; Tân đế đăng cơ jpq:107; Nữ đế thoái vị j99succ; maid Ma ma / Xuất giá / Được ban hôn j42:302-619 |
| Missing in ours | — | Emperor abdicates and leaves WITH her (PARKING #14); mother+child sent away safely at a reign change; failed-selection epilogue; lãnh cung for life as a closure (ours: «Lãnh cung» = death 10 lives) |
| End card | cause + legacy epithets, journal re-read, +1 point modal | j32.js over(): «Kiếp này», narration, Nguyên do chain, «Chuyển kiếp»; jend.js ceremonial frame 8 types; Phúc duyên line; NO epithet pair, NO share card, NO journal recap |
| Restart | 1 tap → identity card (~5 s) | Chuyển kiếp → Nhận thân phận (2 taps) then P0 intro + tutorial ch1–3; quitting early = Kiếp dở dang −30 (jkiep) |
| Carry-over | luân hồi points (reroll origin 1 pt, looks), 32 endings, 33 achievements, 60 past lives | Sổ luân hồi 40 lives (j32:17), Phúc duyên buys Đổi thân phận (100), Thiên mệnh n/352, rare x/y, kỳ ngộ/route/succ books, arc anti-repeat |
| Death engine | one HP meter, monthly forced harm, no warning | many causes (execution 36 %, lifespan 19 %, poison 15 %, other 12 %, childbirth 10 %, illness 8 %), framing, evidence, Thái hậu review (j3:164) |
| Odds | «Thuận lợi NN %» | word bands (law 7) — keep ours |

## 4 · Why people replay (FB player at «Kiếp 467»)
- **Short lives:** 7–120 real min, median 33. A careless life ends in 7 minutes; a careful consort 33–41.
- **Instant restart:** end card → «Luân hồi» → identity card, ~5 s, no intro.
- **Variety per life:** origin roll (tú nữ vs maid, 8 family tiers), a fresh Emperor and cast each life, different first arc.
- **Collection:** 32 endings + 33 achievements each paying +1 point; milestones for lives 5/10, 8 endings, 50 outfits across lives; a «Kết cục» tab showing «Đã ghi nhận N lần».
- **Points with a use:** reroll origin (1 pt), face pick, VIP looks.
- **A card worth showing:** epithets read like a title for the life («Trăng lạnh cô cung»).
- **Low loss:** outfits/items are lost, but achievements, endings and points stay; even a 7-minute death pays.
- Ours: our lives are far longer (robot pace model median 576 min, uncalibrated) and richer, but restart costs an intro + tutorial and an early quit costs −30. Our replay hook (Thiên mệnh n/352) is strong but not shown as a title on the end card.

## 5 · Death & life length (all 20 lives)
| Life | Seat / style | Start | End age | Real min | End type | Exact cause / ending (+ epithets) | Pregnancies → outcome | Warning / odds before the end |
|---|---|---|---|---|---|---|---|---|
| 01 | lead · obedient | tú nữ, Huyện úy | 17y1 | ~20 | death | illness, free self-care failed · Hoa rụng vì bệnh + Một đời vô danh | 0 | self-care 18 %; no warning |
| 02 | lead · virtuous | tú nữ, Huyện úy | 22y7 | 41 | death | HP drain after harmed miscarriage · Áo vải bạc màu + Trăng lạnh cô cung | 1: 21y9 → miscarriage by harm 22y4 | conception envy warning; trials 8 % |
| 03 | lead · careful maid | maid, embroidery | 24y5 | 38 | death | harm chain («chép sổ, trực đêm giữa gió lạnh») · Áo vải bạc màu + Một đời vô danh | 0 | none; HP 78 → 3 in 14 months |
| 04 | lead · consort | tú nữ, Huyện lệnh | 22y0 | 33 | closure-bad (alive) | «Bạch nguyệt quang… trở về» → lãnh cung for life · Trăng lạnh cô cung | 0 (3 nights) | one forced button |
| 05 | lead · reckless maid | maid, potter | 17y7 | 7 | death | illness · Hoa rụng vì bệnh + Một đời vô danh | 0 | self-care 16 % |
| 06 | P2 · schemer maid | maid, farmer | 60 | ~30 | closure-good | left the palace · Ngoài bức tường son + Duyên ngoài cửa son | 0 | — |
| 07 | P2 · safe maid | maid, weaver | 54y4 | ~70 | death (old age) | Thọ chung chính tẩm + Người giữ lòng lành + Bóng người sau rèm + Gấm vóc đầy rương | 0 | none (HP 76) |
| 08 | P2 · blank drawing | tú nữ, Huyện lệnh | 16 (epilogue 55) | ~8 | failed selection → closure | Xuất cung, married a scholar, 3 children, lived to 55 (no point) | 0 | score bands only |
| 09 | P2 · consort | tú nữ, Ngự nữ → Bảo lâm | 35y11 | ~25 | closure | Emperor died of old age, no heir → royal temple · Tiếng chuông cuối đời + Mực thơm còn mãi | 0 (16 summons refused: disfigured) | none |
| 10 | P2 · consort | tú nữ, Ngự nữ → Bảo lâm | 39y6 | 49 | death (by order) | «…băng hà vì tuổi cao. Lệnh tuẫn táng được ban xuống. Không có hoàng tự che chở…» · Khép cùng tiên đế + Mực thơm còn mãi | 0 (3 nights; disfigured 17–32) | none |
| 11 | P3 · favourite | maid → Tài nhân | ~31 | ~120 | closure-good | Emperor assassinated → biệt cung dưỡng thai · Bình yên sau đổi triều | 3: princess born safe · princess born safe · 3rd pregnant at end | none |
| 12 | P3 · favourite | tú nữ, Huyện lệnh | 19y11 | ~35 | death (childbirth) | «Cơn khó sinh lấy đi sinh mạng…», son saved, posthumous Bảo lâm · Khó sinh | 1: son born, mother died | none at the birth; HP ~49 at conception |
| 16 | P4 · maid → consort | maid, fisherman | 19y3 | ~18 | death | HP drain · Áo vải bạc màu + Một đời vô danh | 0 | none; HP 37–40 for months |
| 17 | P4b · studious maid | maid, kitchen | 20y2 | ~17 | death | HP drain · Áo vải bạc màu + Một đời vô danh | 0 | none |
| 18 | P4b · favourite + prince lover | tú nữ, Huyện lệnh | 22y1 | ~52 | death-like closure | failed elopement with the Thân vương · Lạc nhau ngoài kinh thành + Mực thơm còn mãi | 1: princess born safe 21y2 | «Thành công 50 %», 3 named outcomes |
| 19 | P4b · career maid | maid, kitchen → Tổng quản ma ma | 25y0 (card: lived to 46) | ~40 | closure | «Cửa cung mở» → left: never married, no child, lived to 46 · Ngoài bức tường son + Một đời chưởng sự | 0 | choice card only |
| 20 | P4b · favourite, heals | tú nữ, Ngự nữ | 18y11 | ~8 | death (childbirth) | «Cơn khó sinh lấy đi sinh mạng của nàng. Hoàng tự cũng không qua khỏi.» · Khó sinh | 1: first night 18y2 → mother + child died | NONE: no odds, no choice, HP 98, all stats 100 |
| 13 | P3 · favourite | consort | 21y8 | ~105 | death (executed) | «Trả thù thất bại · Ban án tử» after «Ám sát tân đế» (chapter YÊU PHI HOẠ QUỐC / Báo thù cho tiên đế) | 1: son (Quận vương) born safe — An Thai Hoàn given | scripted chapter, no odds |
| 14 | P3 · favourite | consort | 19y2 | ~45 | death (assassins) | «Sóng dữ ngự hồ» — killed with the Emperor on the lake | 0 | «Tìm chỗ ẩn nấp / Lao ra cứu giá», NO odds |
| 15 | P3 (maid roll) | maid career | 25y0 (card: died 54) | ~140 | closure | maid exit at 25 · Ngoài bức tường son + Một đời chưởng sự + Gấm vóc đầy rương; epilogue 5 children | 0 in game | choice card only |

**Counts (20 lives):** deaths 13 (65 %) · closures 7 (35 %). Death causes (n = 13): HP drain/illness 6 (46 %) · childbirth 2 (15 %) · executed after failed revenge 1 · lake assassination 1 · tuẫn táng 1 · failed elopement 1 · old age 1 (8 % each). Pregnancies 8 → births 6 → childbirth deaths 2 (**33 % per birth, 25 % per pregnancy**; tiny n; the one birth with An Thai Hoàn was safe) · miscarriage by harm 1 (13 %) · still pregnant at end 1. Real minutes: median ~37 (7–140). End age: median 22y1 (16–60); age at death median 20y2, deaths cluster 17–24.

| Measure | Trùng Sinh (20 lives, real play) | Ours (robot, 314 valid lives, short-life bias) |
|---|---|---|
| Lives that die | 65 % | 78 % |
| Top cause | HP drain / illness 46 % | execution 36 % (illness only 8 %) |
| Childbirth deaths | 33 % per birth (2/6, tiny n; one at HP 98) | 14.4 % per birth (24/167) vs target 8–12 % |
| Pregnancies per life | 0.40 | 0.5 |
| Median life | ~37 real min, age 22 (death age 20) | 6.5 game years avg; pace-model median 576 min (uncalibrated) |
| Warnings before death | almost none | omens (jmort omenSt), framing shown, odds words |

Reading: the owner's feeling is right — their lives die fast and young, mostly from a silent health drain, and childbirth is a coin-flip-feeling event with tiny n. Ours dies about as often but from more varied, more "caused" deaths, and lives far longer in real time.

## 6 · TOP 10 recommendations → PARKING_LOT (own designs; feature freeze, sếp picks)
Sizes: S ≤ 1 worker-day · M 2–4 · L 5+. Laws touched listed per item.
1. **Two-title end card (danh hiệu kiếp này).** Ours already knows cause + road + rank + Thiên mệnh; add a CAUSE title + a LEGACY title (e.g. kind, rich, schemer, talent, nameless) to over() j32.js and the jend frame. Size S–M. Laws 4 (titles from BAL rules), 7, 9 (kit card part first), 14.
2. **Closure «Cùng người du ngoạn thiên hạ» (our PARKING #14).** Trigger from our stats: she is Hoàng hậu/Hoàng quý phi, Sủng ≥ BAL high band for ≥ 3 years, her son is Thái tử and ≥ BAL adult age, Emperor ≥ 50 or ill (jmort omen), no active scheme heat. Emperor abdicates (jpq Tân đế đăng cơ path) and leaves with her. Size M. Laws 1, 2 (equal-value against staying as Thái hậu), 6b, 18.
3. **Closure «Dưỡng thai nơi biệt cung» at a reign change.** When the Emperor dies (jmort) while she is pregnant or has a child under BAL.route.kidAge and no claim to the throne: offer withdraw-to-a-fief with the child (alive closure) vs stay and fight (j3:164 Thái hậu review risk). Size M. Laws 2, 3, 6a.
4. **Time-skip epilogue for every alive closure.** 3–4 sentences + 2 tiles (lived to N, children N) built from her real stats (age, kids, Phúc duyên, road) for Xuất cung về quê, Được ban hôn, Cao chạy xa bay, Xuất gia, failed selection. Size S. Laws 4, 6b, 9.
5. **Failed tuyển tú = a real closure, not a wall.** Offer «làm cung nữ» (our maid road j42) or «về quê» with the epilogue of #4. Size S. Laws 2, 3.
6. **One-tap rebirth after the first life.** From the end card go straight to the identity card; skip P0 intro/tutorial ch1–3 once seen (setting). Size S. Laws 9, 16 (Kiếp dở dang −30 stays unless sếp changes it).
7. **Lãnh cung for life as a CLOSURE** (alive, one title) instead of the slow «Lãnh cung» death (10 robot lives), when she is sentenced with Sủng at the floor and no ally; keep the death for the cold-and-hunger branch (j14:43). Size S. Laws 6a, 14.
8. **Ending collection page with "Đã gặp N lần" + milestones** (5/10 lives, 8 endings, outfits across lives) on top of Thiên mệnh n/352 and rare x/y, each paying Phúc duyên. Size M. Laws 4, 9.
9. **Childbirth tuning + visible omen.** Our rate is 14.4 % per birth vs the 8–12 % target (robot rec: BAL.mort.birth.hardDie 45 → 31). Add one omen line during late pregnancy (health/age/poison) so a childbirth death is never silent — their silent roll killed a full-health girl on her first pregnancy (life 20), and only a 1000-bạc pill protects; ours must let health, care and allies matter (law 2: a paid safety road needs an equal unpaid one). Size S. Laws 4, 6a, 7.
10. **Shareable end card image** (name, age · rank, the two titles, kiếp number, a pretty frame from the kit) — their «Kiếp 467» culture comes from showing the card. Size M. Laws 9, 10, 12 (Fold + iPad first).

### Closure endings OUR roads should get (trigger conditions from our stats/roads)
| Closure | Our road / code hook | Trigger (our stats) |
|---|---|---|
| Cùng người du ngoạn thiên hạ (abdication trip) | jpq Tân đế đăng cơ + j99succ | rank ≥ Hoàng quý phi, Sủng high band ≥ 36 months, son = Thái tử ≥ adult age, Emperor ≥ 50 or omen ill |
| Dưỡng thai / ra phủ khi đổi triều | jmort:194-198 Thái phi theo con ra phủ (extend) | Emperor dies while S.preg or kid < BAL.route.kidAge, no throne claim, Thái hậu S.th not hostile |
| Về quê sống trọn đời (epilogue) | jroute hl_que:194 | already gated (Đáp ứng/Thường tại, 2 years, no kids, Sủng < queSung) — add epilogue #4 |
| Trượt tuyển → về quê / làm cung nữ | tuyển tú + j42 maid road | drawing below pass mark |
| Lãnh cung trọn đời (alive) | j14 Lãnh cung | sentenced, Sủng at floor, no ally ≥ BAL threshold, health > illness band |
| Ra cung khi đổi triều (maid) | j42 + jpq | maid, new Emperor enthroned, age ≥ 25 |
| Duyên nơi chân trời / Cao chạy xa bay | jroute rtFled tc_cung | already exists — give it the two-title card + epilogue |

## 7 · Notes
- Their % odds are NOT for us (law 7 word bands stay).
- Their silent single-meter death is cheap to build but felt unfair in play (no warning, +3 heal vs −18 harm); ours keeps cause variety and law 6 evidence.
- Shots: none uploaded in this version (CDN folder img/_review/trungsinh-story/ unused so far).
