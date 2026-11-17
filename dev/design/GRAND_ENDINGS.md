PRIORITY #1 CHECK ('đại kết cục|grand ending|GRAND_ENDINGS|kết hiếm|RARE_ENDINGS|danh hiệu|Bảng vàng|Sổ luân hồi'): OD 2 direct (L1601, L1613) + 9 related (L644, L1072, L1243, L1252, L1306–L1324 titles, L1327, L1386, L1402, L1403) | ledger 0 | main: j97.js + dev/RARE_ENDINGS.md (rare endings), j67.js ARC67 (premise arcs, s_*, st_*), jroad.js + jrd_<origin>.js (roads .5–.11, RD97L rare finale), jend14.js (ch12–14), jdh.js/jdh2.js + jtitle.js (titles, KIT §82), j90.js kitPodium «Bảng vàng», j32.js Sổ luân hồi, jagent.js (NPC agent loop) | review/* none for grand endings (review/story-rare = j97, live) | claims: this worker only (D STATUS L360–L362)

# GRAND ENDINGS (Đại kết cục) — SKELETON DESIGN
Status: DESIGN ONLY (feature freeze OD:L1402 — build after current work). No code, no BAL edits. Author: opus design worker for Foreman D #9 (brief dev/handover/briefs/D9-grand-endings-design.md). Expert research (step 1): dev/handover/reports/grand-endings-expert.md (docs branch).
Owner words: READ VERBATIM in dev/OWNER_DECISIONS.md — "(17/11 ~14:30Z real, s32 chat) OWNER DESIGN grand endings" (L1613) and "(17/11 ~14:45Z real, s31 chat) OWNER IDEA" (L1601) point (3)–(5); plus L644, L1072, L1243, L1252 (NPC roads / side quests), L1306–L1324 (titles, name tag), L1327 (expert first), L1386 + L1403 (NPCs same rules, two-way). This doc never replaces her words.
Language: English; every player-visible string is Vietnamese per dev/kit/VANPHONG.md (cổ trang, no %, odds only as the ladder words).

---
## 0. One-paragraph summary
Every life, the machine secretly draws ONE **Thiên mệnh** (destined grand ending) from the 4 grand endings of her identity branch (10 identities × 4 roads = **40 branches × 4 = 160 grand endings**). Nobody — not she, not any NPC — is told. Her own choices across the road quietly gather or break it, and at the end of the life's story one hồi — **Hồi Thiên mệnh** — asks the **last two choices** (where: stay / take power / leave / follow someone; how: mercy / force / let go). If her choices match the destiny and its one condition holds, the **Đại kết cục** fires: a big event with its own painted scene, a very large reward and a unique **title**. If not: «Cuộc đời ngươi vẫn tiếp tục như thế.» — nothing else, never forced. The grand-ending title is the ONLY thing that carries to the next life (worn above the name, reusing the title plate). A per-life **Bảng Thiên mệnh** (reusing the «Bảng vàng» podium) lists everyone of that life who reached theirs. NPCs live by the same rules. Per branch the counts are fixed: **4 grand · 2 kỳ ngộ (rare) · 3 normal** — the 2 rare and 3 normal already exist on main.

## 1. AUDIT — what exists today (origin/main, read 17/11)
### 1.1 Life frame (ROAD_MAP §2, jst14/jroad/jend14)
P0 intro + home road → ch1–3 tutorial → **ch4–11 = one rolled road of her origin** (.4 = j67 premise arc, .5–.11 = jroad chapters) → ch12 (st_dong / st_con / noi14 / len14 for a still-maid cnv) → ch13 hau14 «Tranh ngôi Trung cung» → ch14 ke14 «Mẫu nghi thiên hạ» → free play until death. Fillers: 8 shared arcs s_* (only when a road chapter cannot run) + st_the.

### 1.2 Endings per identity × road
Every road today: **.4 premise arc** 3–4 endings (win / [win2] / mid / lose) + **1 j97 rare** (hidden chain, "✦" option, Ngự tứ + per-life title text); **.5–.10** each win/mid/lose (chapter results, not endings of the road); **.11 finale = 3 endings** (win / mid / lose; cn_chu 4) + **1 RD97L rare** (jroad.js, numbers BAL.road.rare). → per road: **3 normal finale endings + 2 rare = 5**; no "grand ending" layer exists anywhere (grep 'đại kết cục|grand' on main code: 0).

| Identity (key) | Roads (.11 finale: win · mid · lose) | j97 rare (.4) | RD97L rare (.11) |
|---|---|---|---|
| Con gái Tể tướng (tt) | tt_co: Người cầm quân cờ · Cha về quê, nhà yên · Phủ Tể tướng sa sút — tt_oan: Tiếng nhà trong sạch · Nhà yên, quyền mất · Nhà tan — tt_tranh: Một nhà một lòng · Mỗi người một ngả · Phủ đứng sau {v} — tt_mat: Trung cung là chỗ dựa · Mật ước khép lại · Trung cung thành đối thủ | Người cầm ấn phủ Tể tướng · Ngự bút minh oan, cha lên Thái sư · Huynh trưởng quỳ trước cửa cung · Hoàng hậu trao ấn phượng | Cha truyền sổ môn sinh · Ngự bút đề biển Thanh liêm · Huynh muội đồng lòng… · Hoàng hậu tiến lời… |
| Con gái Đại tướng quân (dtq) | dtq_bien: Khải hoàn, vua trọng mà dè · Biên ải yên, cha lui về · Cha bị giáng… — dtq_vu: Cha sạch án… · Sạch án, về nhàn chức · Cha mang tội, được tha chết — dtq_binh: Cha về hưu vinh hiển · Cha còn giữ binh, ngươi bị nghi · Cha bị gạch tên công thần — dtq_huynh: Huynh được minh oan, thăng chức · Huynh sạch tội, không cầm quân · Huynh mang nhục suốt đời | Bia Nhạn Môn khắc tên ngươi · Đan thư thiết khoán · Người giữ nửa binh phù · Huynh về cùng hòa thư | Bắt gián điệp giặc trong cung · Kẻ làm giả khai người trả bạc · Binh phù trao tay huynh trưởng · Huynh mang về thế trận của giặc |
| Con gái nhà buôn muối (muoi) | muoi_tuoc: Tước truyền đời · Tước vì công, một đời · Biển bị gỡ… — muoi_lau: Trắng án, nhà kẻ hãm hại đổ · Trắng án, mất diêm dẫn · Nộp phạt, mang tiếng — muoi_doi: Giang Nam nhớ ơn… · Giữ được của, nhạt tiếng nhà · Mất của, mất cả tiếng — muoi_no: Món nợ thành sợi chỉ đỏ · {v} lui khỏi đời ngươi · Kẻ thù cả đời | Hoàng gia thương hội · Lưới muối lậu của Hộ bộ · Sinh từ Giang Nam · Kim lan trước Phụng Tiên điện | Hoàng thương ngự phong · Sổ muối dâng ngự án · Ngự bút ban hai chữ Thục đức · Sổ riêng của Kính sự phòng |
| Cung nữ được sủng hạnh (cn) | cn_chu: Chủ tớ thành tỷ muội · Chủ cũ sa cơ · Mỗi người một vết sẹo · Mang tiếng vong ân — cn_tinh: Chôn sạch quá khứ · Hắn gánh tội thay · Lộ chuyện cũ, bị phạt — cn_ban: Tố Nga ở lại bên ngươi · Tố Nga về quê · Tố Nga không qua khỏi — cn_than: Họ Thẩm trở lại · Lặng lẽ mang họ Thẩm · Họ Thẩm không được nhận | Chủ cũ dâng trà · Người cũ cứu giá · Tố Nga làm nữ quan · Huyện chúa họ Thẩm | Chủ cũ tạ lỗi trước Hoàng hậu · Hộ vệ thề trọn đời · Bí mật cái giếng hạ bệ kẻ vu · Cố nhân của cha thành chỗ dựa |
| Công chúa hòa thân · Nam Chiếu (nc) | nc_gian: Một lòng, hai nước · Người của Đại Hy · Cái bóng gián điệp — nc_su: Cầu nối hai triều · Hai nước yên… · Sứ tiết thưa dần — nc_tuc: Được chấp nhận như chính mình · Thành người Đại Hy · Mãi là người ngoài — nc_vuong: Cố quốc một lòng · Cố quốc chia đôi · Cố quốc thành nước thù | Hòa ước mang tên ngươi · Chợ biên Vĩnh Hòa · Chim công của Thái hậu · Nữ vương Nam Chiếu (exit: closes the life) | Trung hiếu lưỡng toàn · Hai triều cùng sắc phong · Lễ cố hương vào lịch cung · Hai nhà thề hòa bằng rượu của ngươi |
| Công chúa hòa thân · Bắc Địch (bd) | **NO road file.** bd plays the 4 nc roads with its own land words (KC2LAND / {land}, ROAD_MAP §1; OD:L1213/L1215 "one origin, country branches") | (nc's) | (nc's) |
| Con gái tội thần (td) | td_an: Nhà ngươi rạng danh · Rửa oan, không trị tội · Án không lật được — td_ke: Kẻ chủ mưu đền tội · Chỉ con dao ngã · Buông cả hai để giữ mình — td_song: Chị em đoàn tụ · Em theo quân phương xa · Lạc mất em lần nữa — td_tha: Kết nghĩa tỷ muội · Thù trả, nghĩa tuyệt · Đường ai nấy đi | Nữ quan thảo chiếu · Kim bài tra án hậu cung · Em trai thành tướng quân · Cởi oan nghiệt hai nhà | Ngự bút phục tước, biển Trung hiếu · Nắm thóp kẻ chủ mưu · Em lập công, rửa tên cha · Con gái làm chứng cho cha |
| Cháu gái Thái hậu (ch) | ch_co: Người nối ván cờ Đức Thọ cung · Cháu ngoan giữ lễ · Đức Thọ cung quay lưng — ch_benh: Cô mẫu khỏe lại… · Nối người của cô mẫu · Đức Thọ cung tan đàn — ch_ho: Người đứng đầu họ ngoại · Hai người cháu chia ghế · {v} đứng đầu họ ngoại — ch_bi: Bí mật được chôn… · Bí mật thành quyền của ngươi · Bí mật ra ánh sáng | Nghĩa nữ của Thái hậu · Tạm cầm phượng ấn · Song phượng Đức Thọ cung · Người phi tần năm xưa còn sống | Cô mẫu trao ấn Đức Thọ cung · Vạch mặt kẻ dâng thuốc độc · Hai người cháu cùng cầm họ ngoại · Họ Lâm phục danh, hai nhà giải oán |
| Con gái thầy đồ nghèo (thd) | thd_tho: Tài nữ của Đại Hy · Thơ có tên, danh hiệu không · Gác bút — thd_sach: Sách cha thành sách triều đình · Sách cấm, cha bình an về quê · Cha bị giam… — thd_tro: Khoa trường trong sạch · Học trò được trả tên · Khoa án bị chôn vùi — thd_hoc: Người thầy được tôn kính · Được tôn mà một mẹ còn hận · Thôi dạy Thượng thư phòng | Nữ học sĩ Hàn lâm · Sách cha vào Quốc Tử Giám · Học trò đỗ Trạng nguyên ân khoa · Nữ sư của Đông cung | Ngươi biên tập Ngự tuyển thi tập · Sách mở đường cải cách… · Học trò thành Ngự sử… · Học trò bái ngươi làm thầy trọn đời |
| Cung nữ tuyển vào cung (cnv) | cnv_chu: Tâm phúc trọn đời của {mis} · {mis} ngã, ngươi đứng lên · Chủ tớ cùng lùi một bước — cnv_ban: Xuân Đào rửa oan… · Rửa oan, về quê · Mất Xuân Đào — cnv_mat: Ánh mắt thành ân tình · Được nhìn mà bị ghét · Ánh mắt khép lại — cnv_ma: Người nối nghiệp Lưu ma ma · Ghế về tay người khác · Nội vụ phủ về tay Phùng cô cô | Chủ nhân nhận làm nghĩa muội · Hai chị em vào Thượng cung cục · Phá lệ phong Quý nhân · Kế nhiệm Lưu ma ma | Việc thiện trong bóng tối · Thu Cúc tự thú, hai chị em cùng lên · Chủ cũ thành tỷ muội · Lưu ma ma trao lại cả Nội vụ phủ |

Shared / mid-life lines (j67): s_than, s_thu, s_hoa, s_su, s_dich, s_tinh, s_thay, s_ban (3–4 endings each + 1 j97 rare each); st_the, st_con, st_dong (win/mid/lose + 1 j97 rare each); jend14 noi14 / hau14 / ke14 (win/mid/lose, no rare).
Totals today: 36 roads × (3 normal + 2 rare) + 11 lines × 1 rare; **0 grand endings; 83 rare "danh hiệu kiếp này"** (47 j97 + 36 RD97L).

### 1.3 Titles that exist
- **jdh / jdh2 (KIT §82, jtitle.js)** — achievement titles (cook N times, contest podium «Bảng vàng đề tên», crafts, nights, children…), 3 steps each, rank-colour tiers 1–8 (KIT_TIER_NAME Sơ…Thất), ONE worn title (p.titleWorn) with ONE player-picked modest bonus (BAL.dh), NPC consorts earn/wear by the same rules; Emperor's hiệu joins the rank (kitHieuJoin); sắc phong book + seal, confiscation, atonement.
- **Rare-ending titles** (j97 + RD97L): stored as TEXT only in S.r97 (`ti`), shown in the Mệnh truyện panel "Cơ duyên hiếm kiếp này"; **not** in the jdh catalogue, **not wearable**, not on the name tag.
### 1.4 What carries between lives today
**Nothing that plays.** Sổ luân hồi (localStorage `cung-luanhoi`, j32) records each life; `ctm-rare97` remembers rare endings met ("x/y kết hiếm đã gặp", memory only); `ctm-arcs` keeps the last 10 roads per origin so a new life avoids repeats. No title, item or stat crosses lives.
### 1.5 NPCs today
jagent (AG1) — consorts act like players each buổi; jdh titles for NPC consorts. **NPC roads (OD:L1243) are not built** (ROAD_MAP §0 "NPC roads 0 done", unit D). So NPC grand endings depend on NPC roads (§7).

---
## 2. THE SKELETON
### 2.1 Fixed counts per branch (identity × road) — OWNER DECISION D1
| Kind | Count | Source | Who sees it coming |
|---|---|---|---|
| **Đại kết cục** (grand) | **4 written, 1 destined per life** | NEW (this doc) | nobody; unlocked only by her choices |
| **Kết cục kỳ ngộ** (rare) | **2** | EXISTS: j97 rare at .4 + RD97L rare at .11 | the "✦" option appears when its hidden chain + luck hit (unchanged) |
| **Kết cục thường** (normal) | **3** | EXISTS: .11 win / mid / lose (cn_chu: 4, keep) | normal chapter result |
Matches the owner's "4 đại kết cục và 2 kết cục cực kỳ hiếm" (L1601) with the normal endings already written. Totals: 40 × 4 = **160 grand endings**, 80 rare (72 exist + 8 for bd), 120 normal (108 exist + 12 for bd).

### 2.2 The 10 theme groups (expert report §4)
1 Quyền lực · 2 Chính trị · 3 Tình yêu · 4 Tình bạn / Tỷ muội · 5 Báo thù · 6 Con cái · 7 Gia tộc · 8 Tự do / Xuất cung · 9 Tài nghệ / Sự nghiệp · 10 Thiên hạ / Gia quốc. Each group has a thiện and an ác reading (nữ đế hiền / bạo; Thái hậu được kính / bị oán; báo thù bằng công lý / tận diệt …). Evil roads are first-class (owner: "không ép … con đường thiện").

### 2.3 Thiên mệnh — the hidden destiny (per life)
- **Draw** at đầu thai, right after the road is rolled (j67/jst14, the same moment `ctm-arcs` is consulted): one of the branch's 4 grand endings, weights `BAL.ge.draw.w` (equal by default), avoiding the last `BAL.ge.draw.hist` destinies of that branch (new localStorage `ctm-ge-hist`, same pattern as `ctm-arcs`). Stored as `S.ge = {b:<road>, g:<0..3>}`.
- **Hidden**: no UI, no omen, no hint text, not in Mệnh truyện, not in any NPC's knowledge (OD:L1613 rule 1). Co-op: personal key like S.dh (no co-op patching now — note only).
- **Lean (Mệnh khí)** — reuse the j97 hidden-chain pattern (np / Phá): each grand ending lists **Chuỗi** option names taken from her road chapters .4–.11 (+ ch12–14, + shared lines that ran this life) and **Phá** option names. Lean = (Chuỗi taken) − `BAL.ge.lean.pha` × (Phá taken); it must reach `BAL.ge.lean.np` (OWNER DECISION D7: Phá lowers lean, recommended; vs. one Phá breaks it for the life). No dice: unlocking is decided by her choices, not luck (owner: "dựa vào sự lựa chọn của mình").
- **One condition** (điều kiện thêm) per grand ending: a real state check (a stat floor, a relation, a living person, a son, a seat free), numbers in `BAL.ge.gate.<id>`.
- **Seat lock**: summits that exist once per world — NDE (nữ đế), THH (Thái hậu buông rèm), HH (Hoàng hậu seat), TM (mẹ của vua) — can be held by one person per life; whoever unlocks first holds it; anyone else destined to the same seat simply misses ("life goes on"). `BAL.ge.seat`.

### 2.4 Hồi Thiên mệnh — "the last two choices"
- **When**: one extra hồi right after ch14 (ke14) closes — the end of the life's written story (OWNER DECISION D3; alternative: at the road finale .11). A life that ended earlier (death, a rare exit that closes the life) never reaches it → no grand ending that life.
- **Same for everyone, every life** (no leak): two choices in the kit event frame.
  - **Ngã rẽ 1 · Đi hay ở**: «Ở lại, giữ trọn phận mình» · «Ở lại, nắm lấy quyền bính» · «Rời khỏi cung cấm» · «Theo người ấy đi» (người ấy = the man/woman with the strongest bond of her real life — S.men, a Vương gia, an old love; if nobody qualifies the option is shown greyed "chưa có ai", which reads her state, not her destiny).
  - **Ngã rẽ 2 · Đối đãi thế nào**: «Lấy ân mà đối đãi» · «Lấy uy mà trị» · «Buông bỏ tất cả».
  - No costs, no odds, no gating on these two: she is never forced and never told which is "right".
- **Unlock check** (deterministic): Ngã rẽ 1 = destiny's direction AND Ngã rẽ 2 = destiny's manner AND lean ≥ np AND condition holds AND seat free → **Đại kết cục**.
- **Miss**: one kit notice card: «Cuộc đời ngươi vẫn tiếp tục như thế.» — no reward, no penalty, nothing changes (her choice at the crossroads does not move her: choosing «Rời khỏi cung cấm» when it is not her destiny does not throw her out of the palace). OWNER DECISION D6: after the life ends, Sổ luân hồi may show «Thiên mệnh kiếp ấy: …» (recommended — the drama "hindsight"; never during the life).

### 2.5 Unlocking = big event + scene + very large reward + title
1. **Event**: full kit event frame (kitEventDp) titled «Đại kết cục · <tên>», the ending's own painted scene (one per grand ending, §6), 3–5 lines of narration, button «Tạ ơn». A world-wide news line to every NPC (world events = centre pop-up, OD 17/11 14:05–14:30Z) — "everyone knows".
2. **Reward** (very large, ONE CORE — names only, numbers measured later): `BAL.ge.rw.<id>` built from size classes `BAL.ge.rw.size.{dai}`, target ≈ `BAL.ge.rw.mul` × the road's RD97L rare fx (start 3×): rank step (`rank`, never above the seat rules), Danh / Sủng / Bạc / Tai mắt / Đức (`danh` `sung` `bac` `mat` `duc`), thiện cảm of every NPC (`rel`, + for thiện endings, oán for ác endings), the ending's summit effect (`seat`: Hoàng hậu through the existing lập hậu rules j8/j34; office posts; clan state…), and ONE treasure: a **Kim sách Thiên mệnh** (one item kind, the ending's name engraved; cannot be sold, given or lost — item conservation OD:L1314 still applies) → `BAL.ge.rw.kimsach`. Leaderboard points `BAL.ge.pt`.
3. **After** (OWNER DECISION D4, recommended): endings the game can live in (Ở · giữ phận / Ở · nắm quyền with summits HH, QP, ADV, CLAN, SIS, TK, JUST, REV, POWER, OFFICE, ART, CHILD, PEACE …) **continue the life** with the reward in hand; endings the game cannot simulate (Rời cung, Theo người, and the summits NDE, THH, NV, KING, ANNEX, TM) **close the life with an epilogue** — reusing the j97 exit pattern (`over(title, text, fate, true)`), the reward becoming the epilogue + leaderboard points + title.
4. **Title**: the grand ending's name IS its title (≤4 chữ, own evocative name, OD 13:15Z / 13:25Z). Registered in the jdh catalogue as group "Thiên mệnh" so it uses kitTitlePlate / kitTitleOpen / the 3-line tag. Plate: top tier with the strongest sparkle; KIT REQUEST (to the kit keeper, art by Foreman C later): one special "Thiên mệnh" plate above tier 8. Info card: «Đạt được khi <câu kết>. Kiếp <n> · <Thân phận> · <Nhánh>.»

### 2.6 The ONLY carry-over: the title
- On earning, the title is written to new localStorage `ctm-ge` (life no., name, branch, ending id, title, when) — beside `cung-luanhoi` / `ctm-rare97`.
- Next life starts with that title available to wear (S.titleWorn may be set to it; she can take it off and wear an earned jdh title instead — still ONE worn title, OD 13:50Z). OWNER DECISION D5: carry **only the previous life's** grand title (her literal words, recommended) vs. any grand title ever earned; **cosmetic, no bonus** (recommended, keeps every life fair) vs. one modest jdh-style bonus.
- Nothing else carries: no stat, silver, item, rank, relation (owner rule 3).

### 2.7 Bảng Thiên mệnh — leaderboard per life
Reuse j90 kitPodium («Bảng vàng» look, kit-ico-rank icon, KIT): a tab «Thiên mệnh» beside the Danh hiệu tab of NHIỆM VỤ (OD 13:00Z: titles live there) listing every person of THIS life who reached a grand ending: figure · rank · title plate · name · thân phận · when. Her row first; NPC rows in order reached. Sổ luân hồi line per life: «Đại kết cục: <title>» or nothing. Co-op: each friend's own row (state only).

### 2.8 NPC parity (OD:L1386 / L1403, owner L1601 (4))
- NPC women draw an identity by the ORIGINS odds (j69 OW69), one of its 4 roads (NPC roads OD:L1243 — not built yet), and a hidden Thiên mệnh from the same 4 grand endings, the same way.
- Their lean comes from THEIR road choices (jagent scores options by needs/traits — no flat roll); their Hồi Thiên mệnh comes at the end of their own road; jagent picks Ngã rẽ 1/2 from her nature (e.g. Ân cần / Khiêm nhường → «Lấy ân»; Tham vọng / Kiêu ngạo / Xảo quyệt → «Lấy uy»; Kín đáo → «Buông»; strongest bond → «Theo người ấy»). Same unlock rule, same seat locks.
- On unlock: world news, their title over their name (3-line tag, OD 13:00Z), their row on the Bảng, the summit applies to the world (an NPC can become Hoàng hậu / Thái hậu / leave the palace).
- Helping: her side quest = one hồi from that NPC's road (OD:L1243/L1252); she does not know the NPC's destiny either; if the NPC unlocks after her help → big reward to her (`BAL.ge.help.rw`); failure → none; she may also sabotage (two-way law), and the NPC may strike back (L1601 (4)). Asking NPCs for help on HER road follows L1601 (5) (their traits / liking decide how well they help) — separate design.
- Men (Emperor, Vương gia, officials) have no grand endings in this pass (they appear as levers / "người ấy").

### 2.9 Variety guard (machine-checked)
Rules (data + checker: dev/design/ge_guard/cat.py + check.py + gen.py on this branch — design data, not game code; move the check into dev/test when building): per branch the 4 endings span **≥ 3 theme groups**, include **≥ 1 ác** ending, **≥ 1 stay** (Ở) and **≥ 1 leave/follow** (Rời / Theo), use **4 different crossroads pairs** and **4 different summits**; across all 160: **no duplicate name**, **no duplicate shape** (summit + thiện/giữa/ác + lever); every name ≤ 4 chữ. Result on the catalogue below: **0 errors**. Spread: groups 1:22 · 2:18 · 3:19 · 4:12 · 5:21 · 6:8 · 7:10 · 8:26 · 9:14 · 10:10; thiện 79 · giữa 34 · ác 47; seat summits NDE 4 (2 hiền, 2 bạo) · THH 3 (2 kính, 1 bị oán) · HH 4 · TM 3.

### 2.10 What the 8 common + 3 mid-life lines become
- **s_* (8 shared arcs)**: stay fillers (only when a road chapter cannot run) — they own **no grand ending**. Their j97 rares stay as kỳ ngộ outside the branch count. Their option names may sit in a grand ending's Chuỗi / Phá lists (e.g. s_ban feeds Tình bạn endings, s_tinh feeds Theo-người endings, s_dich feeds Thiên hạ relief endings).
- **st_the / st_con / st_dong (+ noi14, hau14, ke14)**: stay as ch12–14 for everyone; no grand ending of their own; they are the main **conditions** for power/children summits (st_the win → POWER/QP gates; st_dong / ke14 → TM / THH gates; hau14 → HH gates) and Hồi Thiên mệnh comes right after ke14.

### 2.11 Bắc Địch gets its own 4 roads (40 branches) — OWNER DECISION D2
Her 17/11 words count "10 thân phận × 4 nhánh = 40" (L1601), and main's ADD (D STATUS L361) orders 4 bd roads. This touches OD:L1213/L1215 (16/11: hòa thân is ONE origin with country branches; "no new structure"). Both readings are offered: (a) **recommended** — bd stays a country branch of hòa thân (no 10th origin, same jkc2 / KC2LAND frame) but its branch gets **4 roads of its own** (premises below, built by Foreman B like any road: .4 arc + .5–.11 + 2 rares), so the grand-ending table has 40 branches; (b) bd keeps nc's 4 roads (land words only) and gets only its own 4 grand-ending sets (36 road bodies, 40 grand sets). bd roads (a):
| Road | Premise (.4) | Arc to .11 | Theme |
|---|---|---|---|
| `bd_san` Mùa thu săn | At the autumn hunt (thu tiển) she rides and shoots among Đại Hy men; one arrow decides who notices her | horse office, the Emperor's riding companion, a rival's "accident", the call of the steppe | Tài nghệ · Tình yêu |
| `bd_soi` Sói đầu đàn | Phụ hãn falls from his horse; her uncle claims the golden tent and asks Đại Hy to recognise him; her young brother asks her help | succession war at home fought through the court (worked sample §4.2) | Quyền lực · Gia tộc |
| `bd_tuyet` Năm tuyết trắng | A white winter kills the herds; her people starve at the border; grain from Đại Hy or raids | relief, grain-for-peace market, opening the pass, a song of the winter | Thiên hạ |
| `bd_hen` Lời thề bên đống đá | Her betrothed from the steppe rides in with the embassy; the oath at the ovoo stone | love vs place, sworn brotherhood, a court plot against him, revenge | Tình yêu · Tự do |
Distinct from nc's roads (mật lệnh, sứ đoàn, người ngoại tộc, ngai vàng cố quốc). Story-only NPCs (uncle, brother, betrothed) need rows in ROAD_MAP §5.4 before writing (Foreman B).

### 2.12 BAL keys (names only — ONE CORE; no edits now)
`BAL.ge.n` {grand:4, rare:2, norm:3} · `BAL.ge.draw` {w, hist} · `BAL.ge.lean` {np, pha} · `BAL.ge.gate.<id>` · `BAL.ge.seat` {NDE, THH, HH, TM} · `BAL.ge.when` (hồi after ke14) · `BAL.ge.rw.size` · `BAL.ge.rw.mul` · `BAL.ge.rw.<id>` {rank, danh, sung, bac, mat, duc, rel, seat, kimsach} · `BAL.ge.pt` (leaderboard points) · `BAL.ge.title` {tier, fx:none, carry:"prev"} · `BAL.ge.help.rw` (her reward when an NPC she helped unlocks) · `BAL.ge.npc` {on} · `BAL.ge.target` {inChar, random} (measured unlock-rate bands for the sim: a bot that plays one consistent style ≈ one life in three or four reaches it; a random bot rarely does — numbers set by measurement, D57 style).

---
## 3. CATALOGUE — the 160 grand endings (skeleton: name = title; Ngã rẽ pair = the destiny's two last choices)
Kind: thiện / giữa / ác. Ngã rẽ 1: Ở · giữ phận / Ở · nắm quyền / Rời cung / Theo người. Ngã rẽ 2: Lấy ân / Lấy uy / Buông. Summit codes: NDE nữ đế · THH Thái hậu buông rèm · HH Hoàng hậu · TM mẹ của vua · QP quyền phi (hiệp lý lục cung) · NV nữ vương nơi cố quốc · KING lập vua · ADV hiền thần / cố vấn · OFFICE nữ quan · ART/TEACHER tài nghệ lưu danh · CLAN gia tộc · SIS tỷ muội · TK tri kỷ đế vương · JUST/MERCY/REV/PURGE công lý / tha / báo thù / diệt thân · POWER/SPY quyền trong bóng tối · PEACE/RELIEF/LOYAL/FAME/SCHOOL thiên hạ · FREE/NUN/REUNION tự do / xuất gia / đoàn tụ · FOLLOW theo người · CHILD/TM con cái · BETRAY phản bạn · WAR/ANNEX chiến tranh / thôn tính · TRADE thương nghiệp · GENERAL nữ tướng. Chuỗi / Phá lists are written per branch by the road writers (pattern: §4); the 3 worked samples below are complete.

#### tt — Con gái Tể tướng
| Branch | # | Grand ending (= title, ≤4 chữ) | Group | Kind | Ngã rẽ 1 | Ngã rẽ 2 | Summit · lever |
|---|---|---|---|---|---|---|---|
| `tt_co` Quân cờ trong tay cha | ge1 | **Ngai vàng họ ngoại** | 1 Quyền lực | ác | Ở · nắm quyền | Lấy uy | NDE · clan |
|  | ge2 | **Hiền tướng hậu cung** | 2 Chính trị | thiện | Ở · giữ phận | Lấy ân | ADV · court |
|  | ge3 | **Buông cờ về núi** | 8 Tự do | thiện | Rời cung | Buông | FREE · father hills |
|  | ge4 | **Đại nghĩa diệt thân** | 7 Gia tộc | ác | Ở · giữ phận | Lấy uy | PURGE · clan |
| `tt_oan` Phủ Tể tướng mắc oan | ge1 | **Thanh thiên hậu cung** | 5 Báo thù | thiện | Ở · giữ phận | Lấy ân | JUST · law |
|  | ge2 | **Máu trả máu** | 5 Báo thù | ác | Ở · nắm quyền | Lấy uy | REV · clan |
|  | ge3 | **Nữ phán quan** | 9 Tài nghệ | thiện | Ở · nắm quyền | Buông | OFFICE · law |
|  | ge4 | **Hoa nở ngoài cung** | 3 Tình yêu | thiện | Theo người | Buông | FOLLOW · censor |
| `tt_tranh` Phủ Tể tướng chia đôi | ge1 | **Nhất gia chi chủ** | 7 Gia tộc | thiện | Ở · giữ phận | Lấy ân | CLAN · clan |
|  | ge2 | **Huynh muội tương tàn** | 7 Gia tộc | ác | Ở · nắm quyền | Lấy uy | PURGE · brother |
|  | ge3 | **Một mình một cõi** | 8 Tự do | giữa | Rời cung | Buông | FREE · self |
|  | ge4 | **Phượng ấn về nhà** | 1 Quyền lực | thiện | Ở · nắm quyền | Lấy ân | HH · clan |
| `tt_mat` Mật ước với Hoàng hậu | ge1 | **Trung cung kế vị** | 1 Quyền lực | giữa | Ở · nắm quyền | Lấy ân | HH · pact |
|  | ge2 | **Tỷ muội Trung cung** | 4 Tình bạn | thiện | Ở · giữ phận | Lấy ân | SIS · queen |
|  | ge3 | **Dao trong mật ước** | 5 Báo thù | ác | Ở · giữ phận | Lấy uy | REV · pact |
|  | ge4 | **Hai bóng chùa xa** | 8 Tự do | thiện | Rời cung | Buông | NUN · queen |

#### dtq — Con gái Đại tướng quân
| Branch | # | Grand ending (= title, ≤4 chữ) | Group | Kind | Ngã rẽ 1 | Ngã rẽ 2 | Summit · lever |
|---|---|---|---|---|---|---|---|
| `dtq_bien` Khói lửa Nhạn Môn | ge1 | **Nữ tướng Nhạn Môn** | 10 Thiên hạ | thiện | Rời cung | Lấy uy | GENERAL · army |
|  | ge2 | **Dưỡng giặc giữ quyền** | 2 Chính trị | ác | Ở · nắm quyền | Lấy uy | POWER · war |
|  | ge3 | **Con nối nghiệp ông** | 6 Con cái | giữa | Ở · nắm quyền | Lấy ân | CHILD · grandson |
|  | ge4 | **Hồn về Nhạn Môn** | 3 Tình yêu | giữa | Theo người | Buông | FOLLOW · officer |
| `dtq_vu` Bức thư mưu phản | ge1 | **Đan tâm chiếu sử** | 7 Gia tộc | thiện | Ở · giữ phận | Lấy ân | CLAN · loyalty |
|  | ge2 | **Lập vua trong máu** | 2 Chính trị | ác | Ở · nắm quyền | Lấy uy | KING · army |
|  | ge3 | **Cả nhà ra biên** | 8 Tự do | giữa | Rời cung | Buông | FREE · family |
|  | ge4 | **Ấn giả đền mạng** | 5 Báo thù | ác | Ở · giữ phận | Lấy uy | REV · forger |
| `dtq_binh` Binh phù và long ngai | ge1 | **Binh phù trong tay** | 1 Quyền lực | ác | Ở · nắm quyền | Lấy uy | NDE · army |
|  | ge2 | **Trung thần giao binh** | 2 Chính trị | thiện | Ở · giữ phận | Lấy ân | PEACE · tally |
|  | ge3 | **Theo cờ vương phủ** | 3 Tình yêu | giữa | Theo người | Buông | FOLLOW · prince |
|  | ge4 | **Giải giáp quy điền** | 8 Tự do | thiện | Rời cung | Lấy ân | FREE · father |
| `dtq_huynh` Người anh nơi đất giặc | ge1 | **Huynh muội trùng phùng** | 7 Gia tộc | thiện | Rời cung | Lấy ân | CLAN · brother |
|  | ge2 | **Hòa thư hai nước** | 10 Thiên hạ | thiện | Ở · giữ phận | Lấy ân | PEACE · treaty |
|  | ge3 | **Thù nhà nợ nước** | 5 Báo thù | ác | Ở · nắm quyền | Lấy uy | WAR · army |
|  | ge4 | **Hồng nhan đất giặc** | 3 Tình yêu | giữa | Theo người | Buông | FOLLOW · enemy prince |

#### muoi — Con gái nhà buôn muối
| Branch | # | Grand ending (= title, ≤4 chữ) | Group | Kind | Ngã rẽ 1 | Ngã rẽ 2 | Summit · lever |
|---|---|---|---|---|---|---|---|
| `muoi_tuoc` Mua tước cho cha | ge1 | **Hoàng thương thiên hạ** | 9 Tài nghệ | thiện | Rời cung | Lấy ân | TRADE · silver |
|  | ge2 | **Vương tước cho con** | 6 Con cái | thiện | Ở · giữ phận | Lấy ân | CHILD · silver title |
|  | ge3 | **Thái hậu bạc vàng** | 1 Quyền lực | ác | Ở · nắm quyền | Lấy uy | THH · silver |
|  | ge4 | **Thuyền về cố hương** | 8 Tự do | giữa | Rời cung | Buông | FREE · home |
| `muoi_lau` Thuyền muối đêm | ge1 | **Diệt lưới muối lậu** | 2 Chính trị | thiện | Ở · giữ phận | Lấy ân | JUST · ledger |
|  | ge2 | **Vua muối bóng tối** | 9 Tài nghệ | ác | Ở · nắm quyền | Lấy uy | TRADE · smuggling |
|  | ge3 | **Theo thuyền giang hồ** | 3 Tình yêu | giữa | Theo người | Buông | FOLLOW · boatman |
|  | ge4 | **Nợ máu nhà muối** | 5 Báo thù | ác | Ở · giữ phận | Lấy uy | REV · blood debt |
| `muoi_doi` Năm đói ở Giang Nam | ge1 | **Bồ Tát Giang Nam** | 10 Thiên hạ | thiện | Rời cung | Lấy ân | RELIEF · grain |
|  | ge2 | **Kho lương thiên hạ** | 1 Quyền lực | ác | Ở · nắm quyền | Lấy uy | POWER · grain |
|  | ge3 | **Hiền phi cứu đói** | 10 Thiên hạ | thiện | Ở · giữ phận | Buông | FAME · court |
|  | ge4 | **Đầu cơ đền tội** | 5 Báo thù | ác | Ở · giữ phận | Lấy uy | REV · hoarder |
| `muoi_no` Món nợ trong cung | ge1 | **Chủ nợ lục cung** | 2 Chính trị | ác | Ở · nắm quyền | Lấy uy | POWER · debts |
|  | ge2 | **Nợ hóa tình thân** | 4 Tình bạn | thiện | Ở · giữ phận | Lấy ân | SIS · debt |
|  | ge3 | **Xóa nợ ra đi** | 8 Tự do | thiện | Rời cung | Buông | FREE · debt |
|  | ge4 | **Thư sinh trả nợ** | 3 Tình yêu | thiện | Theo người | Lấy ân | FOLLOW · scholar |

#### cn — Cung nữ được sủng hạnh
| Branch | # | Grand ending (= title, ≤4 chữ) | Group | Kind | Ngã rẽ 1 | Ngã rẽ 2 | Summit · lever |
|---|---|---|---|---|---|---|---|
| `cn_chu` Chủ cũ | ge1 | **Tớ cũ thành chủ** | 1 Quyền lực | ác | Ở · nắm quyền | Lấy uy | QP · servants |
|  | ge2 | **Ân chủ trọn đời** | 4 Tình bạn | thiện | Ở · giữ phận | Lấy ân | SIS · mistress |
|  | ge3 | **Trả áo về quê** | 8 Tự do | thiện | Rời cung | Buông | FREE · maid village |
|  | ge4 | **Thay chủ nuôi con** | 6 Con cái | giữa | Ở · nắm quyền | Lấy ân | TM · foster son |
| `cn_tinh` Mối tình thuở hầu trà | ge1 | **Trốn cùng thị vệ** | 3 Tình yêu | thiện | Theo người | Buông | FOLLOW · guard |
|  | ge2 | **Chôn tình giữ ngôi** | 1 Quyền lực | ác | Ở · nắm quyền | Lấy uy | QP · sacrifice |
|  | ge3 | **Tình hóa trung nghĩa** | 2 Chính trị | thiện | Ở · giữ phận | Lấy ân | ADV · guard |
|  | ge4 | **Xuất gia đoạn tình** | 8 Tự do | giữa | Rời cung | Buông | NUN · love |
| `cn_ban` Tri kỷ ở Tân Giả khố | ge1 | **Chưởng sự lục cục** | 9 Tài nghệ | thiện | Ở · nắm quyền | Lấy ân | OFFICE · craft |
|  | ge2 | **Tỷ muội trọn đời** | 4 Tình bạn | thiện | Ở · giữ phận | Lấy ân | SIS · friend |
|  | ge3 | **Cùng nhau ra cung** | 8 Tự do | thiện | Rời cung | Buông | FREE · friend |
|  | ge4 | **Bán bạn cầu vinh** | 4 Tình bạn | ác | Ở · nắm quyền | Lấy uy | BETRAY · friend |
| `cn_than` Thân thế thật | ge1 | **Họ Thẩm phục hưng** | 7 Gia tộc | thiện | Ở · giữ phận | Lấy ân | CLAN · name |
|  | ge2 | **Nữ đế khoan nhân** | 1 Quyền lực | thiện | Ở · nắm quyền | Lấy ân | NDE · bloodline |
|  | ge3 | **Mang họ mẹ đi** | 8 Tự do | giữa | Rời cung | Buông | FREE · mother |
|  | ge4 | **Báo thù cho mẹ** | 5 Báo thù | ác | Ở · giữ phận | Lấy uy | REV · mother |

#### nc — Công chúa hòa thân · Nam Chiếu
| Branch | # | Grand ending (= title, ≤4 chữ) | Group | Kind | Ngã rẽ 1 | Ngã rẽ 2 | Summit · lever |
|---|---|---|---|---|---|---|---|
| `nc_gian` Mật lệnh cố quốc | ge1 | **Gián điệp hai triều** | 2 Chính trị | ác | Ở · nắm quyền | Lấy uy | SPY · homeland |
|  | ge2 | **Một lòng Đại Hy** | 10 Thiên hạ | thiện | Ở · giữ phận | Lấy ân | LOYAL · court |
|  | ge3 | **Thoát vòng hai nước** | 8 Tự do | giữa | Rời cung | Buông | FREE · two realms |
|  | ge4 | **Tình nơi quán dịch** | 3 Tình yêu | thiện | Theo người | Lấy ân | FOLLOW · envoy |
| `nc_su` Sứ đoàn cố quốc | ge1 | **Cầu nối vạn dặm** | 10 Thiên hạ | thiện | Ở · giữ phận | Lấy ân | PEACE · envoys |
|  | ge2 | **Nữ sứ hai triều** | 9 Tài nghệ | thiện | Rời cung | Lấy ân | OFFICE · envoy |
|  | ge3 | **Sứ đoàn đẫm máu** | 5 Báo thù | ác | Ở · nắm quyền | Lấy uy | REV · faction |
|  | ge4 | **Về nam theo sứ** | 3 Tình yêu | giữa | Theo người | Buông | FOLLOW · envoy |
| `nc_tuc` Người ngoại tộc | ge1 | **Vũ khúc truyền đời** | 9 Tài nghệ | thiện | Ở · giữ phận | Lấy ân | ART · dance |
|  | ge2 | **Thái hậu ngoại tộc** | 1 Quyền lực | thiện | Ở · nắm quyền | Lấy ân | THH · son |
|  | ge3 | **Trả nhục ngàn lần** | 5 Báo thù | ác | Ở · nắm quyền | Lấy uy | REV · scorn |
|  | ge4 | **Về với núi mây** | 8 Tự do | thiện | Rời cung | Buông | FREE · homeland |
| `nc_vuong` Ngai vàng cố quốc | ge1 | **Nữ vương máu lạnh** | 1 Quyền lực | ác | Rời cung | Lấy uy | NV · army |
|  | ge2 | **Hai ngai một lòng** | 10 Thiên hạ | thiện | Ở · giữ phận | Lấy ân | PEACE · brother |
|  | ge3 | **Thôn tính cố quốc** | 2 Chính trị | ác | Ở · nắm quyền | Lấy uy | ANNEX · court |
|  | ge4 | **Công chúa lưu vong** | 3 Tình yêu | giữa | Theo người | Buông | FOLLOW · exiled prince |

#### bd — Công chúa hòa thân · Bắc Địch
| Branch | # | Grand ending (= title, ≤4 chữ) | Group | Kind | Ngã rẽ 1 | Ngã rẽ 2 | Summit · lever |
|---|---|---|---|---|---|---|---|
| `bd_san` Mùa thu săn | ge1 | **Thống lĩnh ngự mã** | 9 Tài nghệ | thiện | Ở · nắm quyền | Lấy ân | OFFICE · horses |
|  | ge2 | **Tri kỷ lưng ngựa** | 3 Tình yêu | thiện | Ở · giữ phận | Lấy ân | TK · riding |
|  | ge3 | **Mũi tên trường săn** | 5 Báo thù | ác | Ở · giữ phận | Lấy uy | REV · hunt |
|  | ge4 | **Về với thảo nguyên** | 8 Tự do | thiện | Rời cung | Buông | FREE · horse |
| `bd_soi` Sói đầu đàn | ge1 | **Nữ Khả hãn** | 1 Quyền lực | giữa | Rời cung | Lấy uy | NV · tribes |
|  | ge2 | **Lập em làm hãn** | 2 Chính trị | thiện | Ở · giữ phận | Lấy ân | KING · diplomacy |
|  | ge3 | **Sói già phải chết** | 5 Báo thù | ác | Ở · nắm quyền | Lấy uy | REV · uncle |
|  | ge4 | **Con trai hai cõi** | 6 Con cái | giữa | Ở · nắm quyền | Lấy ân | TM · son |
| `bd_tuyet` Năm tuyết trắng | ge1 | **Mẹ của thảo nguyên** | 10 Thiên hạ | thiện | Rời cung | Lấy ân | RELIEF · herds |
|  | ge2 | **Lương thảo đổi hòa** | 2 Chính trị | thiện | Ở · giữ phận | Lấy ân | PEACE · trade |
|  | ge3 | **Mở cửa ải bắc** | 10 Thiên hạ | ác | Ở · nắm quyền | Lấy uy | BETRAY · border |
|  | ge4 | **Khúc ca tuyết trắng** | 9 Tài nghệ | thiện | Ở · giữ phận | Buông | ART · song |
| `bd_hen` Lời thề bên đống đá | ge1 | **Lời thề trọn vẹn** | 3 Tình yêu | thiện | Theo người | Buông | FOLLOW · betrothed |
|  | ge2 | **Chôn lời thề cũ** | 1 Quyền lực | ác | Ở · nắm quyền | Lấy uy | QP · oath |
|  | ge3 | **Nghĩa huynh biên ải** | 4 Tình bạn | thiện | Ở · giữ phận | Lấy ân | SIS · betrothed |
|  | ge4 | **Đòi máu cho chàng** | 5 Báo thù | ác | Rời cung | Lấy uy | WAR · tribes |

#### td — Con gái tội thần
| Branch | # | Grand ending (= title, ≤4 chữ) | Group | Kind | Ngã rẽ 1 | Ngã rẽ 2 | Summit · lever |
|---|---|---|---|---|---|---|---|
| `td_an` Lật lại án cũ | ge1 | **Rửa oan chín họ** | 7 Gia tộc | thiện | Ở · giữ phận | Lấy ân | CLAN · case |
|  | ge2 | **Chín họ đền tội** | 5 Báo thù | ác | Ở · nắm quyền | Lấy uy | REV · case |
|  | ge3 | **Bút sử chép lại** | 9 Tài nghệ | thiện | Ở · nắm quyền | Lấy ân | OFFICE · history |
|  | ge4 | **Tro tàn trở về** | 8 Tự do | giữa | Rời cung | Buông | FREE · grave |
| `td_ke` Kẻ đứng sau màn | ge1 | **Diệt tận gốc** | 5 Báo thù | ác | Ở · nắm quyền | Lấy uy | REV · mastermind |
|  | ge2 | **Tha để thắng** | 5 Báo thù | thiện | Ở · giữ phận | Lấy ân | MERCY · mastermind |
|  | ge3 | **Mạng lưới bóng đêm** | 2 Chính trị | ác | Ở · giữ phận | Lấy uy | SPY · network |
|  | ge4 | **Theo người cứu mạng** | 3 Tình yêu | giữa | Theo người | Buông | FOLLOW · rescuer |
| `td_song` Người em còn sống | ge1 | **Tướng môn trở lại** | 7 Gia tộc | thiện | Ở · giữ phận | Lấy ân | CLAN · general house |
|  | ge2 | **Mở cổng thành đêm** | 1 Quyền lực | ác | Ở · nắm quyền | Lấy uy | KING · brother army |
|  | ge3 | **Chị em phiêu bạt** | 8 Tự do | thiện | Rời cung | Buông | FREE · brother |
|  | ge4 | **Thay em gánh tội** | 4 Tình bạn | giữa | Ở · giữ phận | Buông | SACRIFICE · brother |
| `td_tha` Thù hay tha | ge1 | **Oán hóa thành ân** | 4 Tình bạn | thiện | Ở · giữ phận | Lấy ân | MERCY · enemy |
|  | ge2 | **Báo thù không tha** | 5 Báo thù | ác | Ở · nắm quyền | Lấy uy | REV · enemy |
|  | ge3 | **Cửa Phật buông thù** | 8 Tự do | giữa | Rời cung | Buông | NUN · hatred |
|  | ge4 | **Yêu con kẻ thù** | 3 Tình yêu | giữa | Theo người | Lấy ân | FOLLOW · enemy son |

#### ch — Cháu gái Thái hậu
| Branch | # | Grand ending (= title, ≤4 chữ) | Group | Kind | Ngã rẽ 1 | Ngã rẽ 2 | Summit · lever |
|---|---|---|---|---|---|---|---|
| `ch_co` Quân cờ của cô tổ | ge1 | **Đức Thọ đời sau** | 1 Quyền lực | thiện | Ở · nắm quyền | Lấy ân | THH · aunt |
|  | ge2 | **Phản cô đoạt quyền** | 2 Chính trị | ác | Ở · nắm quyền | Lấy uy | POWER · aunt |
|  | ge3 | **Cháu hiền giữ lễ** | 7 Gia tộc | thiện | Ở · giữ phận | Lấy ân | CLAN · aunt |
|  | ge4 | **Cửa thiền thay cô** | 8 Tự do | giữa | Rời cung | Buông | NUN · faith |
| `ch_benh` Thái hậu lâm bệnh | ge1 | **Thần y hậu cung** | 9 Tài nghệ | thiện | Ở · giữ phận | Lấy ân | ART · medicine |
|  | ge2 | **Chén thuốc cuối cùng** | 1 Quyền lực | ác | Ở · nắm quyền | Lấy uy | POWER · poison |
|  | ge3 | **Hiếu nữ cầm ấn** | 1 Quyền lực | giữa | Ở · nắm quyền | Lấy ân | QP · seal |
|  | ge4 | **Theo cô hành cung** | 8 Tự do | thiện | Rời cung | Buông | FREE · aunt |
| `ch_ho` Hai người cháu | ge1 | **Chị em một nhà** | 4 Tình bạn | thiện | Ở · giữ phận | Lấy ân | SIS · cousin |
|  | ge2 | **Một phượng duy nhất** | 1 Quyền lực | ác | Ở · nắm quyền | Lấy uy | HH · cousin |
|  | ge3 | **Nhường ngôi cho em** | 8 Tự do | thiện | Rời cung | Buông | FREE · cousin |
|  | ge4 | **Họ ngoại trăm năm** | 7 Gia tộc | giữa | Ở · nắm quyền | Lấy ân | CLAN · clan |
| `ch_bi` Bí mật năm xưa | ge1 | **Trả lại công bằng** | 5 Báo thù | thiện | Ở · giữ phận | Lấy ân | JUST · secret |
|  | ge2 | **Giữ kín, nắm thóp** | 2 Chính trị | ác | Ở · nắm quyền | Lấy uy | POWER · secret |
|  | ge3 | **Mẹ con nhận nhau** | 6 Con cái | giữa | Rời cung | Buông | REUNION · real mother |
|  | ge4 | **Hoàng tử thất lạc** | 6 Con cái | giữa | Ở · nắm quyền | Lấy ân | TM · lost prince |

#### thd — Con gái thầy đồ nghèo
| Branch | # | Grand ending (= title, ≤4 chữ) | Group | Kind | Ngã rẽ 1 | Ngã rẽ 2 | Summit · lever |
|---|---|---|---|---|---|---|---|
| `thd_tho` Danh hiệu Tài nữ | ge1 | **Thi tiên đương thời** | 9 Tài nghệ | thiện | Ở · giữ phận | Lấy ân | ART · poetry |
|  | ge2 | **Ngòi bút giết người** | 5 Báo thù | ác | Ở · giữ phận | Lấy uy | REV · satire |
|  | ge3 | **Thơ theo gió đi** | 8 Tự do | thiện | Rời cung | Buông | FREE · poetry |
|  | ge4 | **Tri âm thiên tử** | 3 Tình yêu | thiện | Ở · giữ phận | Buông | TK · poetry |
| `thd_sach` Di cảo của cha | ge1 | **Nữ đế biến pháp** | 1 Quyền lực | thiện | Ở · nắm quyền | Lấy ân | NDE · reform |
|  | ge2 | **Đốt sách giữ ngôi** | 1 Quyền lực | ác | Ở · nắm quyền | Lấy uy | QP · censorship |
|  | ge3 | **Mở trường dạy chữ** | 10 Thiên hạ | thiện | Rời cung | Lấy ân | SCHOOL · books |
|  | ge4 | **Gánh sách theo chàng** | 3 Tình yêu | giữa | Theo người | Buông | FOLLOW · scholar |
| `thd_tro` Học trò của cha | ge1 | **Trạng nguyên phò tá** | 2 Chính trị | thiện | Ở · giữ phận | Lấy ân | ADV · pupils |
|  | ge2 | **Môn sinh thành phe** | 2 Chính trị | ác | Ở · nắm quyền | Lấy uy | POWER · pupils |
|  | ge3 | **Theo trò đi xa** | 3 Tình yêu | giữa | Theo người | Buông | FOLLOW · pupil |
|  | ge4 | **Khoa trường vạch tội** | 5 Báo thù | thiện | Ở · giữ phận | Lấy uy | JUST · exam |
| `thd_hoc` Thầy giáo trong cung | ge1 | **Đế sư thiên tử** | 9 Tài nghệ | thiện | Ở · nắm quyền | Lấy ân | TEACHER · pupil |
|  | ge2 | **Dạy vua thành rối** | 1 Quyền lực | ác | Ở · nắm quyền | Lấy uy | KING · pupil |
|  | ge3 | **Thư viện bên hồ** | 8 Tự do | thiện | Rời cung | Buông | FREE · books |
|  | ge4 | **Mẹ nuôi Đông cung** | 6 Con cái | giữa | Ở · giữ phận | Lấy ân | CHILD · prince |

#### cnv — Cung nữ tuyển vào cung
| Branch | # | Grand ending (= title, ≤4 chữ) | Group | Kind | Ngã rẽ 1 | Ngã rẽ 2 | Summit · lever |
|---|---|---|---|---|---|---|---|
| `cnv_chu` Bí mật của chủ nhân | ge1 | **Bóng sau ghế chủ** | 2 Chính trị | ác | Ở · nắm quyền | Lấy uy | POWER · mistress secret |
|  | ge2 | **Nghĩa chủ tình sâu** | 4 Tình bạn | thiện | Ở · giữ phận | Lấy ân | SIS · shared secret |
|  | ge3 | **Giữ kín ra cung** | 8 Tự do | giữa | Rời cung | Buông | FREE · kept secret |
|  | ge4 | **Rửa oan người cũ** | 5 Báo thù | thiện | Ở · giữ phận | Lấy uy | JUST · old maid wrong |
| `cnv_ban` Chị em đồng hương | ge1 | **Chị em ra cung** | 8 Tự do | thiện | Rời cung | Buông | FREE · village |
|  | ge2 | **Bước lên vai bạn** | 4 Tình bạn | ác | Ở · nắm quyền | Lấy uy | BETRAY · stolen credit |
|  | ge3 | **Kim chỉ thành danh** | 9 Tài nghệ | thiện | Ở · nắm quyền | Lấy ân | ART · embroidery |
|  | ge4 | **Về làng theo chàng** | 3 Tình yêu | giữa | Theo người | Buông | FOLLOW · village lad |
| `cnv_mat` Ánh mắt nơi hành lang | ge1 | **Chiếc ô chiều mưa** | 3 Tình yêu | thiện | Ở · giữ phận | Buông | TK · umbrella |
|  | ge2 | **Tỳ nữ lên phượng** | 1 Quyền lực | ác | Ở · nắm quyền | Lấy uy | HH · favour |
|  | ge3 | **Gác ô ra đi** | 8 Tự do | thiện | Rời cung | Lấy ân | FREE · self |
|  | ge4 | **Tỷ muội cùng hầu** | 4 Tình bạn | thiện | Ở · giữ phận | Lấy ân | SIS · shared favour |
| `cnv_ma` Ma ma dạy việc | ge1 | **Tổng quản lục cung** | 9 Tài nghệ | giữa | Ở · nắm quyền | Lấy ân | OFFICE · palace |
|  | ge2 | **Tay nắm Nội vụ** | 2 Chính trị | ác | Ở · nắm quyền | Lấy uy | POWER · supplies |
|  | ge3 | **Ma ma về quê** | 8 Tự do | thiện | Rời cung | Buông | FREE · old age |
|  | ge4 | **Phụng Thánh phu nhân** | 6 Con cái | giữa | Ở · giữ phận | Lấy ân | CHILD · wet nurse |

---
## 4. WORKED SAMPLES (complete: draw → lean → condition → Ngã rẽ → event → reward → title)
Chuỗi / Phá use the REAL option names on main (jrd_tt.js, jrd_cnv.js) — chapter in brackets. np, pha and every number = BAL.ge keys (values set by measurement; the "start" values are design starting points, not shipped numbers).

### 4.1 `tt_co` · Con gái Tể tướng · Quân cờ trong tay cha
Road arc: her father's letters are orders (.4) → his protégés (.5) → the maid who copies letters (.6) → censors impeach dad (.7) → the Emperor tests her (.8) → her own people (.9) → the night before court (.10) → «Kết ván cờ» (.11). Existing: 3 normal (Người cầm quân cờ / Cha về quê, nhà yên / Phủ Tể tướng sa sút) + 2 rare (Người cầm ấn phủ Tể tướng / Cha truyền sổ môn sinh).

**ge1 · Ngai vàng họ ngoại** — 1 Quyền lực · ác · Ngã rẽ «Ở lại, nắm lấy quyền bính» + «Lấy uy mà trị» · seat NDE · closes the life (epilogue)
- Chuỗi (np start 6): «Báo cha diệt kẻ hai lòng» (.5) · «Bắt hắn khai ai đứng sau» (.5) · «Tha cho nàng, bắt nàng làm hai mang» (.6) · «Cho thị vệ phục sẵn» (.6) · «Đáp lại sắc bén» (.7) · «Mở xem, báo cha» (.8) · «Tự gây dựng, bắt đầu từ thái giám giữ ấn» (.9) · «Đốt thư cha trước khi vua đến» (.10) · «Bắt kẻ rình» (.10) · «Xin cha giao sổ» (.11) · «Làm người đánh cờ» (.11) · st_the win.
- Phá: «Xin Hoàng thượng đừng giao cho thiếp» (.8) · «Bỏ bàn cờ» (.11) · «Thôi viết thư nhà» (.6) · «Quỳ xin Hoàng thượng đừng hỏi» (.7).
- Condition: Tai mắt ≥ `BAL.ge.gate.tt_co_1.mat` and the môn sinh book is hers (.11 win or rare) and seat NDE free.
- Scene: Thái Hòa điện at dawn, she in imperial yellow on the dragon throne, officials kneeling, her father's protégés in front; nobody looks up.
- Event text: «Tiên đế băng hà, Thái tử còn bế ngửa. Môn sinh của phủ Tể tướng quỳ kín điện Thái Hòa, dâng biểu xin ngươi lâm triều. Ngươi không nhường. Từ hôm ấy, chiếu chỉ mang ấn của ngươi; kẻ nào cãi lời, cả nhà ra pháp trường. Thiên hạ khiếp sợ mà phục, sử quan chép tên ngươi bằng mực đỏ.»
- Reward: epilogue + `BAL.ge.pt` + Kim sách «Ngai vàng họ ngoại»; title «Ngai vàng họ ngoại». Info: «Đạt được khi lên ngôi nữ đế nhờ thế lực phủ Tể tướng, lấy uy mà trị thiên hạ.»

**ge2 · Hiền tướng hậu cung** — 2 Chính trị · thiện · «Ở lại, giữ trọn phận mình» + «Lấy ân mà đối đãi» · continues the life
- Chuỗi (np 6): «Trả lễ, bảo hắn tự lập công» (.5) · «Thử tài hắn bằng một việc nhỏ» (.5) · «Không nói, để Hoàng thượng tự chọn» (.5) · «Cho bạc nuôi mẹ nàng, giữ nàng ở lại» (.6) · «Tâu thật, xin xử công bằng cho cha» (.7) · «Thưa thật: thiếp không muốn ngài nghi» (.8) · «Giữ nguyên niêm, trả lại sau ba ngày» (.8) · «Lo cho mẹ hắn chữa bệnh» (.9) · «Tiến cử hắn với Hoàng thượng» (.9) · «Nhắn ông đứng về phía Hoàng thượng» (.10) · «Xin để Hoàng thượng chọn người hiền» (.11).
- Phá: «Mở xem, báo cha» (.8) · «Bỏ bạc lo cho hắn thoát» (.5) · «Biếu Ngự sử chút lễ» (.7).
- Condition: Đức ≥ `gate.tt_co_2.duc` and Hoàng thượng → ngươi ≥ `gate.tt_co_2.emp`.
- Scene: Dưỡng Tâm điện by lamplight, the Emperor and she over memorials, a young Hàn lâm kneeling with a scroll.
- Text: «Hoàng thượng đặt tấu chương trước mặt ngươi: “Trẫm muốn nghe nàng nói.” Người ngươi tiến cử năm nào nay giữ Lại bộ, không một đồng bạc lót tay. Cả triều biết trong hậu cung có một người không vì nhà mình mà vì xã tắc.»
- Reward (continues): rank +`rw.tt_co_2.rank` (never above the seat rules) · Danh · Hoàng thượng → ngươi · every consort's thiện cảm + · Kim sách; title «Hiền tướng hậu cung».

**ge3 · Buông cờ về núi** — 8 Tự do · thiện · «Rời khỏi cung cấm» + «Buông bỏ tất cả» · closes the life
- Chuỗi: «Thôi viết thư nhà» (.6) · «Đáp cha: con không hỏi được» (.8) · «Xin Hoàng thượng đừng giao cho thiếp» (.8) · «Xin cha tự lui một bước» (.7) · «Khuyên cha lui một bước» (.10) · «Khuyên cha đốt sổ» (.11) · «Bỏ bàn cờ» (.11) · «Đóng cửa cung, chép kinh» (.7).
- Phá: «Làm người đánh cờ» (.11) · «Tự gây dựng, bắt đầu từ thái giám giữ ấn» (.9) · «Báo cha diệt kẻ hai lòng» (.5).
- Condition: her father is alive.
- Scene: a mountain villa in autumn, she in plain robes pouring tea for her white-haired father, a chessboard with the pieces swept into the box.
- Text: «Ngươi dâng biểu xin về phụng dưỡng cha già. Hoàng thượng lặng thinh rất lâu, rồi phê một chữ “Chuẩn”. Biệt viện dưới chân núi Tây Sơn không có môn sinh, không có thư từ, chỉ có tiếng cờ gõ mỗi chiều. Cha thua ngươi ván nào cũng cười.»
- Reward: epilogue + points + Kim sách; title «Buông cờ về núi».

**ge4 · Đại nghĩa diệt thân** — 7 Gia tộc · ác · «Ở lại, giữ trọn phận mình» + «Lấy uy mà trị» · continues the life
- Chuỗi: «Chối thẳng, để luật xử hắn» (.5) · «Giao Thận hình ty xử» (.6) · «Không nhận, để giữ mình» (.7) · «Thiếp đứng bên Hoàng thượng» (.8) · «Đáp: con đi đường con» (.9) · «Đưa thư cha cho Hoàng thượng xem» (.10) · «Chặn trước, nói với Hoàng thượng» (.11).
- Phá: «Hứa giữ cha» (.10) · «Xin giữ cha ở lại» (.11) · «Xin Thái hậu nói giúp cha» (.10) · «Nhận, để giữ cha» (.7).
- Condition: Hoàng thượng → ngươi ≥ `gate.tt_co_4.emp` and Tâm cơ ≥ `gate.tt_co_4.tamco`.
- Scene: the Hình bộ hall; she stands beside the Emperor's screen while her father, stripped of his cap, is led away.
- Text: «Chính tay ngươi dâng lên sổ môn sinh và những bức thư cha viết. Phủ Tể tướng bị niêm phong trong một đêm. Hoàng thượng nói với cả triều: “Đại nghĩa diệt thân, trẫm có được mấy người như thế?” Từ đó không ai dám coi ngươi là con gái của ai nữa.»
- Reward: Sủng · rank · Danh; her family's oán + (dad, brother) — the dark price; title «Đại nghĩa diệt thân».

### 4.2 `bd_soi` · Công chúa hòa thân · Bắc Địch · Sói đầu đàn (NEW road, outline for Foreman B)
Cast (story-only, ROAD_MAP §5.4 rows needed): Phụ hãn ({dad}), Khả đôn ({mom}), thúc phụ Hô Diên Liệt (uncle), em trai Ô Lặc (brother), {emp}, {v}.
.4 Sói đầu đàn — Phụ hãn falls from his horse; the uncle's envoy asks the Emperor to recognise him; the Emperor asks her (win/mid/lose; j97 rare «Phụ hãn tỉnh lại»). .5 Hai phong thư — uncle and brother both write; the uncle asks for the border map. .6 Sứ giả mang dao — an assassin in the uncle's embassy. .7 Chợ ngựa đóng cửa — the uncle shuts the horse market; hawks at court want war. .8 Khả đôn vào kinh — her mother flees to the capital; sheltering her risks war. .9 Hội đua ngựa mùa hạ — the succession contest on the steppe; a champion or herself. .10 Đêm tuyết Âm Sơn — Đại Hy troops at the border: send, hold, or bargain. .11 Kim trướng chủ nhân — who sits in the golden tent. Normal: Em trai lên ngôi hãn / Thảo nguyên chia đôi / Thúc phụ thắng, mối hòa lung lay; RD97L rare «Kim trướng gọi ngươi là Khả đôn».
Grand endings (Chuỗi/Phá below are the INTENT each chapter's options must carry; the road writer names them):
- **ge1 · Nữ Khả hãn** — 1 Quyền lực · giữa · «Rời khỏi cung cấm» + «Lấy uy mà trị» · seat: none in Đại Hy (NV abroad) · closes the life. Chuỗi: keep the map (.5), take the assassin alive and turn him (.6), refuse the market deal (.7), arm the Khả đôn's guard (.8), ride the contest herself (.9), bargain troops for the tribes' oath (.10). Phá: hand the map to either side; send the Khả đôn back. Condition: Sức ≥ `gate`, the brother dead or failed (.11 mid/lose). Scene: snow plain, a hundred tribal banners, she in fur and gold before the golden tent, the tribes kneeling. Text: «Không ai trên thảo nguyên từng quỳ trước một nữ nhân. Đêm ấy, mười hai bộ lạc cắm cờ quanh kim trướng và gọi ngươi là Khả hãn. Ngươi gửi về Đại Hy một con tuấn mã trắng kèm một câu: “Biên ải yên ổn chừng nào thiếp còn sống.”» Title «Nữ Khả hãn».
- **ge2 · Lập em làm hãn** — 2 Chính trị · thiện · «Ở lại, giữ trọn phận mình» + «Lấy ân mà đối đãi» · continues. Chuỗi: answer both letters honestly to the Emperor (.5), spare the assassin and send him home with a message (.6), plead for the market to reopen (.7), shelter the Khả đôn openly (.8), send a champion for the brother (.9), ask only for envoys, no troops (.10). Phá: steal the map; poison the uncle. Condition: Hoàng thượng → ngươi ≥ `gate`, brother alive. Scene: the Emperor's hall, her brother in a wolf-fur cap kneeling to receive the Đại Hy seal while she stands at the Emperor's side. Reward: Danh · Sủng · horse-market silver every year (`rw.bd_soi_2.bac`) · Kim sách. Title «Lập em làm hãn».
- **ge3 · Sói già phải chết** — 5 Báo thù · ác · «Ở lại, nắm lấy quyền bính» + «Lấy uy mà trị» · continues. Chuỗi: let the uncle read a false map (.5), kill the assassin and send back his head (.6), push the court to war (.7), use the Khả đôn as bait (.8), bribe the contest judges (.9), ask for the whole army (.10). Phá: any peace offer to the uncle. Condition: Tai mắt ≥ `gate`, st_the win. Scene: Âm Sơn at night, burning tents, she on the city wall watching the uncle's banner fall. Reward: Danh (feared) · Sủng · every NPC's oán + small · Kim sách. Title «Sói già phải chết».
- **ge4 · Con trai hai cõi** — 6 Con cái · giữa · «Ở lại, nắm lấy quyền bính» + «Lấy ân mà đối đãi» · seat TM · closes the life (epilogue: her son reigns over both). Chuỗi: keep the steppe tongue alive for her son (any chapter's "teach the child" option), shelter the Khả đôn (.8), win the contest through her son's name (.9), bargain the brother's oath to her son (.10). Phá: give the son to another consort to raise. Condition: a living son; seat TM free. Scene: a young emperor in dragon robes with a wolf-fur trim, both courts kneeling. Title «Con trai hai cõi».

### 4.3 `cnv_mat` · Cung nữ tuyển vào cung · Ánh mắt nơi hành lang
Road arc: the Emperor's glance in the corridor → the mistress is jealous (.5) → avoid or meet (.6) → Kính sự phòng writes her name (.7) → the first night (.8) → from servant to mistress (.9) → the seduction rumour (.10) → «Ánh mắt ấy» (.11). Existing: normal (Ánh mắt thành ân tình / Được nhìn mà bị ghét / Ánh mắt khép lại) + rares (Phá lệ phong Quý nhân / Chủ cũ thành tỷ muội).

**ge1 · Chiếc ô chiều mưa** — 3 Tình yêu · thiện · «Ở lại, giữ trọn phận mình» + «Buông bỏ tất cả» · summit TK · continues
- Chuỗi (np 6): «Hát khẽ bài dân ca bên giếng» (.5) · «Gửi lại cành mai, không đến» (.6) · «Thưa: muốn, nhưng không dám» (.6) · «Không đưa, chờ ngài tự lật» (.7) · «Tin vào lời ngài đã nói» (.7) · «Kể chuyện mùa gặt» (.8) · «Nói một câu thật lòng» (.8) · «Không xin gì, chỉ cúi đầu» (.8) · «Đứng chờ dưới mái hiên cũ» (.11) · «Xin ngài đừng quên chiều mưa ấy» (.11) · «Đứng yên, để ngài bước đến» (.11).
- Phá: «Đưa bạc cho thái giám, trước kỳ lật thẻ» (.7) · «Trả bạc cao hơn {v}» (.7) · «Bắt tay {v} chèn {mis}» (.9).
- Condition: Hoàng thượng → ngươi ≥ `gate.cnv_mat_1.emp`.
- Scene: a covered corridor in rain, the Emperor holding an old oil-paper umbrella over her, no attendants.
- Text: «Mưa rơi đúng như chiều năm ấy. Hoàng thượng đứng dưới mái hiên cũ, tay cầm chiếc ô ngươi gửi trả, nói khẽ: “Cả lục cung xin trẫm đủ thứ. Chỉ có nàng chưa từng xin gì.” Từ đó, mỗi lần mưa, ngài đều đến cung ngươi.»
- Reward: Sủng to near its cap · Hoàng thượng → ngươi · rank + · Kim sách; title «Chiếc ô chiều mưa».

**ge2 · Tỳ nữ lên phượng** — 1 Quyền lực · ác · «Ở lại, nắm lấy quyền bính» + «Lấy uy mà trị» · seat HH · continues as Hoàng hậu
- Chuỗi: «Lặng lẽ cho người thấy tay {mis} hất» (.5) · «Kể lại một chuyện cũ của {mis}» (.5) · «Nhận lời {v}» (.5) · «Đưa {v} tin vặt, giữ lại tin thật» (.5) · «Đưa bạc cho thái giám, trước kỳ lật thẻ» (.7) · «Trả bạc cao hơn {v}» (.7) · «Đổi chỗ với {mis} mà không nói» (.9) · «Bắt tay {v} chèn {mis}» (.9) · «Đem chuyện gói bùa ra nói lại» (.11) · «Bước đến che ô cho ngài» (.11).
- Phá: «Quỳ nhận lỗi về mình» (.5) · «Xin ơn cho {mis}» (.11) · «Quỳ lạy {mis} một lạy» (.11) · «Thôi ngóng, sống ngày của mình» (.11).
- Condition: Sủng ≥ `gate.cnv_mat_2.sung`, Tâm cơ ≥ `gate.cnv_mat_2.tamco`, seat HH free (the lập hậu rules j8/j34 are what crown her).
- Scene: the investiture: phoenix crown, kneeling consorts, her former mistress among them, eyes down.
- Text: «Ngày đội mũ phượng, người quỳ ở hàng đầu lục cung là chủ cũ của ngươi. Ngươi không bảo nàng đứng dậy. Cung nhân truyền tai nhau: từ giếng nước lên ngôi Trung cung chỉ cần một đời, và đừng bao giờ đứng chắn đường nàng.»
- Reward: Hoàng hậu seat (existing rules) · Danh · every consort's oán + (dark price) · Kim sách; title «Tỳ nữ lên phượng».

**ge3 · Gác ô ra đi** — 8 Tự do · thiện · «Rời khỏi cung cấm» + «Lấy ân mà đối đãi» · closes the life
- Chuỗi: «Gửi lại cành mai, không đến» (.6) · «Cảm ơn mà từ chối» (.6) · «Xin rút thẻ một kỳ» (.7) · «Cáo ốm ở lại» (.6) · «Thôi ngóng, sống ngày của mình» (.11) · «Gửi lại ô, kèm một lời» (.11) · «Cúi đầu, lui vào trong» (.11) · «Xin ơn cho {mis}» (.11).
- Phá: «Bước đến che ô cho ngài» (.11) · «Bắt tay {v} chèn {mis}» (.9).
- Condition: Đức ≥ `gate.cnv_mat_3.duc`, lòng cung nữ ≥ `gate.cnv_mat_3.maid`.
- Scene: the Thần Vũ gate at morning, she in plain clothes with a small bundle and the umbrella, her maids waving.
- Text: «Ngươi xin Hoàng thượng cho mình và mấy cung nữ theo hầu được xuất cung. Ngài trả lại chiếc ô: “Mang theo, đừng để ướt.” Ngoài cổng Thần Vũ, kinh thành đang họp chợ sớm. Mấy năm sau, tiệm thêu nhỏ bên sông của ngươi nổi tiếng khắp kinh thành, và chẳng ai biết bà chủ từng được Hoàng thượng che ô.»
- Reward: epilogue + points + Kim sách; title «Gác ô ra đi».

**ge4 · Tỷ muội cùng hầu** — 4 Tình bạn · thiện · «Ở lại, giữ trọn phận mình» + «Lấy ân mà đối đãi» · continues
- Chuỗi: «Thưa thật với chủ: nô tỳ không dám quên ơn» (.5) · «Khuyên Hoàng thượng đến cung {mis}» (.5) · «Từ chối, báo {mis}» (.5) · «Báo cho {mis} biết {v} đang dụ ngươi» (.6) · «Quỳ tạ, rồi tạ {mis}» (.7) · «Ra chào {mis} trước khi đi» (.8) · «Xin ngài nhớ đến {mis}» (.8) · «Xin ngồi sau {mis}» (.9) · «Đến xin {mis} nói giúp» (.10) · «Thưa: là tỷ muội» (.11) · «Xin ơn cho {mis}» (.11).
- Phá: «Bắt tay {v} chèn {mis}» (.9) · «Kể lại một chuyện cũ của {mis}» (.5) · «Lặng lẽ cho người thấy tay {mis} hất» (.5).
- Condition: {mis} alive and {mis} → ngươi ≥ `gate.cnv_mat_4.mis`.
- Scene: two consorts side by side on one long bench, sharing a single embroidery frame, the Emperor looking on.
- Text: «Lục cung chờ xem chủ tớ năm xưa trở mặt. Nhưng mỗi buổi thỉnh an, hai người vẫn đi cùng nhau. Hoàng thượng phong cho cả hai một bậc trong cùng một đạo chỉ, và ban chung một tấm biển: “Đồng tâm”.»
- Reward: rank + for her AND for {mis} (real NPC) · their mutual thiện cảm + · Kim sách; title «Tỷ muội cùng hầu».

---
## 5. Player-visible strings (VANPHONG; final wording by the writers)
Hồi title «Hồi Thiên mệnh» · Ngã rẽ texts (§2.4) · miss notice «Cuộc đời ngươi vẫn tiếp tục như thế.» · event header «Đại kết cục · <tên>» · button «Tạ ơn» · news «Thiên hạ truyền tai: <tên người> đã thành “<danh hiệu>”.» · Bảng tab «Thiên mệnh» · Sổ luân hồi «Đại kết cục: <danh hiệu>» / after death (D6) «Thiên mệnh kiếp ấy: <danh hiệu>» · title info «Đạt được khi …». No %, no numbers in prose beyond the kit's rules.

## 6. Art needs (for Foreman C LATER — nothing ordered now)
- **160 scene paintings**, one per grand ending (landscape, kitEventDp right-top picture; the heroine's face shown; same style anchors). Pilot first: the 12 of §4.
- 1 special title plate «Thiên mệnh» above tier 8 (KIT REQUEST via the kit keeper).
- 1 item icon «Kim sách Thiên mệnh» (engraved name varies by text, one picture).
- bd roads: the usual chapter/rare art of 4 new roads (Foreman B/C, same as other roads) + story-only NPC faces from existing figures.
- Leaderboard reuses j90 podium figures — no new art.

## 7. Build order (after the freeze lifts; owner "take time")
1. **Engine + 3 pilot branches** (tt_co, cnv_mat, + one nc road): draw, lean, conditions, Hồi Thiên mệnh, notice, event, reward, Kim sách, jdh "Thiên mệnh" group, `ctm-ge` carry, Bảng tab, Sổ luân hồi line, variety-guard test in dev/test. Measure unlock rates (`BAL.ge.target`).
2. **Writers, identity by identity**: Chuỗi/Phá/condition/text for the other 33 existing branches (catalogue §3 fixes names + pairs; changes to a name/pair go through this doc's owner, canon overwrite).
3. **Bắc Địch 4 roads** (if D2 = a) by Foreman B (28 chapters + 4 arcs + 8 rares + 12 normal), then their 16 grand endings.
4. **NPC parity** with NPC roads (OD:L1243, unit D): NPC draw + jagent crossroads + world news + help/sabotage side quest.
5. Art waves (§6) follow each writer wave.

## 8. OWNER DECISIONS (listed with a recommendation)
- **D1 counts**: 4 grand (1 destined per life) · 2 kỳ ngộ · 3 normal per branch — **recommended** (her L1601 numbers, rares/normals already exist) · alt: 2 grand per branch (half the writing and 80 paintings instead of 160).
- **D2 Bắc Địch**: own 4 roads inside the hòa thân origin (40 branches) — **recommended** · alt: shares nc's roads, own grand endings only (OD:L1213/L1215 reading).
- **D3 where the last two choices sit**: Hồi Thiên mệnh right after ch14 — **recommended** (power / Thái hậu / children summits need the endgame) · alt: at the road finale .11 (earlier, more lives reach it, but summits feel premature).
- **D4 after unlocking**: stay-endings continue the life with the reward; leave/throne/realm endings close it with an epilogue — **recommended** · alt A: every grand ending closes the life · alt B: every one continues.
- **D5 carried title**: only the previous life's grand title, cosmetic — **recommended** · alts: any grand title ever earned; or one modest jdh bonus while worn.
- **D6 hindsight reveal**: after the life ends, Sổ luân hồi shows what the destiny was — **recommended** · alt: never shown.
- **D7 Phá choices**: lower the lean — **recommended** · alt: one Phá breaks that destiny for the life.
