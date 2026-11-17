PRIORITY #1 CHECK ('grand-endings|GRAND_ENDINGS|đại kết cục|sơ đồ nhánh'): OD 4 (L1601, L1613, L1618, L1623 (1)) | ledger 0 | claims 8 (this worker's row CLAIMS L835) | main 0 | review/* 1 (review/grand-endings-design r2 96b6f18b = the base revised here, reused, not restarted). Related on main (reused, nothing rebuilt): j97.js + dev/RARE_ENDINGS.md (rare endings), j67.js ARC67, jroad.js + jrd_<origin>.js (roads .5–.11, RD97L rare), jend14.js (ch12–14), jdh.js/jdh2.js + jtitle.js (titles, KIT §82), j90.js kitPodium «Bảng vàng», j32.js + j74 Sổ luân hồi, jagent.js.

# GRAND ENDINGS (Đại kết cục) — SKELETON DESIGN
Status: **REVISION 3** (owner batch 17/11 ~15:25Z, OD:L1623 point (1): 4 grand + 2 kỳ ngộ per branch, NO separate normal endings, option C shading variants with collectable titles, branch chart in Sổ luân hồi only). r2 (96b6f18b: no destined ending, fixed set, narrowing funnel, fail endings) and r1 (6580bfae) are superseded in place. DESIGN ONLY (feature freeze OD:L1402 — build after current work). No code, no BAL edits. Author: opus design worker for Foreman D #10 (brief dev/handover/briefs/D10-grand-endings-r3.md). Expert research: dev/handover/reports/grand-endings-expert.md (docs branch).
Owner words: READ VERBATIM in dev/OWNER_DECISIONS.md — "(17/11 ~14:30Z real, s32 chat) OWNER DESIGN grand endings" (L1613; rule (1) overwritten by ~14:55Z), "(17/11 ~14:55Z real, s32 chat) OWNER CORRECTION grand endings" (L1618), "(17/11 ~15:25Z real …) OWNER batch" point (1) ENDINGS (L1623–L1624), "(17/11 ~14:45Z real, s31 chat) OWNER IDEA" (L1601) points (3)–(5); plus L644, L1072, L1243, L1252 (NPC roads / side quests), L1306–L1324 (titles, name tag), L1327 (expert first), L1386 + L1403 (NPCs same rules, two-way). This doc never replaces her words.
Language: English; every player-visible string is Vietnamese per dev/kit/VANPHONG.md (cổ trang, no %, odds only as the ladder words).

---
## 0. One-paragraph summary (r3)
There is **no destined ending per life**. Every identity branch (10 identities × 4 roads = **40 branches**) has a **fixed set of endings: 4 grand endings (Đại kết cục) + 2 kỳ ngộ** — and nothing else. There are **no separately written "normal" endings**: the owner's rule is that a normal ending is simply the reverse of a grand ending, so **each grand ending has its own fail outcome (kết cục thua)**, and missing a grand ending = landing on its fail outcome. At the start of a life **all 4 grand endings are open**; her choices **pull** toward some and **close** others for good (a **narrowing funnel**), and one choice can leave only the fail outcome of ending A. At the end, one hồi — **Hồi kết nhánh** — asks the **last two choices**; they point to one grand ending, and its odds (her pull + one real condition) give **the grand ending** or **its fail outcome**. **Option C (owner pick)**: every grand ending has **two shadings — thiện and ác** — chosen by how she lived (a hidden thiện–ác lean from her choices, see §2.6); each shading has **its own title**, so a branch holds **8 collectable titles** (40 branches → **320**), each unlocked the first time it is earned. A **branch chart (sơ đồ nhánh)** in **Sổ luân hồi only** shows each branch's nodes: unlocked ones by name, locked ones as «?», and **where she is now** in this life (§2.10). The title of the grand ending she earned is the ONLY thing that carries to the next life. A per-life **Bảng Thiên mệnh** (reusing «Bảng vàng») lists who reached which grand ending and shading. NPCs follow the same set, funnel, shading and titles with their own choices.

## 1. AUDIT — what exists today (origin/main, read 17/11)
### 1.1 Life frame (ROAD_MAP §2, jst14/jroad/jend14)
P0 intro + home road → ch1–3 tutorial → **ch4–11 = one rolled road of her origin** (.4 = j67 premise arc, .5–.11 = jroad chapters) → ch12 (st_dong / st_con / noi14 / len14 for a still-maid cnv) → ch13 hau14 «Tranh ngôi Trung cung» → ch14 ke14 «Mẫu nghi thiên hạ» → free play until death. Fillers: 8 shared arcs s_* (only when a road chapter cannot run) + st_the.

### 1.2 Endings per identity × road (as on main today; r3: the .11 win/mid/lose become chapter results, not endings — §2.0)
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
### 2.0 The kinds of endings — what makes them different (owner asked L1618; r3 per L1623 (1))
| | **Đại kết cục** (grand) | **Kết cục thua** (fail outcome of a grand ending — this is what "normal" means now) | **Kết cục kỳ ngộ** (rare) |
|---|---|---|---|
| What it is | The destination of the whole branch: who she became | The reverse of one grand ending: she reached for it (or drifted toward it) and it did not happen | A lucky encounter that opens a hidden door off the road |
| Count per branch | **4**, each with **2 shadings (thiện / ác)** → 8 titles | **4** (one per grand ending; never written as a separate ending set — owner: "làm thêm chi cho nó rắc rối") | **2** |
| How it is reached | Her choices over the whole life steer toward it (pull) and keep it open, then the last two choices point to it and its odds hold | The last two choices point to it and the odds fail, or it is fail-only / closed, or her pair points to no ending (then the fail outcome of the ending she pulled hardest toward, quiet form) | A hidden chain of the right choices AND luck; a "✦" option appears (unchanged, j97 at .4 + RD97L at .11) |
| When | Hồi kết nhánh, after chapter 14 | Same moment | At .4 or .11 |
| Reward | Very large: big event + own painted scene + rank / stats / everyone's attitude + Kim sách + **the shading's title (the only thing that carries to the next life)** | None. Loss `BAL.ge.fail.<id>` only when she pointed at it (her pair) and missed; the quiet form (pair pointed at nothing) has no loss: «Cuộc đời ngươi vẫn tiếp tục như thế.» (L1613 "không unlock được … tiếp tục kiếp này như vậy thôi") | Large: stat jump + one Ngự tứ + a title for this life (unchanged) |
| Exists today | No — this design | No — written with each grand ending (one short event text each) | Yes (j97 + RD97L) |

**The old "normal" layer is removed.** The road finale .11 keeps its win / mid / lose RESULT (code on main) as a **chapter result** like .5–.10 — it feeds pull and conditions; it is no longer called or counted as an ending. Build note: the player-visible label «Kết cục xuất thân …» (jroad.js L92–93) becomes a chapter-result label (writers' wording, VANPHONG, e.g. «Khép nẻo đời …»), so the word «Kết cục» is used only for grand / fail / kỳ ngộ.

### 2.0b How other games do endings (expert survey, full table in reports/grand-endings-expert.md §3 + §3b)
- **Otome routes** (Mystic Messenger, Code: Realize, Amnesia): per route a fixed set — true / good / bad; bad endings are real failures of the route you chose. → our grand ending + its fail outcome.
- **Fire Emblem: Three Houses**: four endings all open at the start; one mid-game choice closes the others for the rest of the run. → our closing choices.
- **The Witcher 3 (Ciri's fate)**: a handful of scattered choices counted at the end — the player never sees the tally. → our pull, and the hidden thiện–ác lean that picks the shading.
- **Detroit: Become Human**: a flowchart after each chapter shows the branches opened and the ones still locked (names hidden until found), plus completion per chapter. → our branch chart in Sổ luân hồi (§2.10).
- **Mass Effect 2 (suicide mission)**: preparation + final orders decide; a wrong final order with good preparation still fails. → last two choices + odds from earlier pull.
- **Princess Maker 2 / Orange Light palace VNs**: many named endings (queen, general, nun, dark lord / Hoàng hậu, Thái hậu, xuất cung, lãnh cung…), evil endings equal; an ending gallery collected across plays. → named endings, evil allowed, titles collected per shading.
- **inFAMOUS / Fable / Mass Effect paragon–renegade**: the same story beat ends "hero" or "infamous" by the player's moral record, each with its own name and look. → option C shadings.

### 2.1 Fixed counts per branch (identity × road) — owner decided (L1623 (1): "làm đại kết cục 4 đi. Kết cục kỳ ngộ 2 đi")
| Kind | Count per branch | Source |
|---|---|---|
| **Đại kết cục** (grand) | **4**, all open at the start of every life; each with a thiện and an ác shading (2 titles) and one fail outcome | NEW (this doc) |
| **Kết cục kỳ ngộ** (rare) | **2** | EXISTS: j97 rare at .4 + RD97L rare at .11 |
| Normal | **0** (= the 4 fail outcomes; nothing written separately) | — |
Totals: 40 × 4 = **160 grand endings**, **320 shading titles**, 160 fail outcomes, 80 kỳ ngộ (72 exist + 8 for bd).

### 2.2 The 10 theme groups (expert report §4)
1 Quyền lực · 2 Chính trị · 3 Tình yêu · 4 Tình bạn / Tỷ muội · 5 Báo thù · 6 Con cái · 7 Gia tộc · 8 Tự do / Xuất cung · 9 Tài nghệ / Sự nghiệp · 10 Thiên hạ / Gia quốc. Every grand ending now has BOTH a thiện and an ác reading (nữ đế hiền / bạo; Thái hậu được kính / chuyên quyền; báo thù bằng công lý / tận diệt …). Evil roads are first-class (owner: "không ép … con đường thiện").

### 2.3 The funnel — all endings open at start, choices pull and close
- **Start of life**: the branch's 4 grand endings are all **open** (state per ending: open / fail-only / closed). Stored as `S.ge = {b:<road>, st:[o|f|x ×4], pull:[n ×4], lean:n}`.
- **Pull (lực kéo)** — reuse the j97 hidden-chain pattern: each grand ending lists **Chuỗi** options (from road chapters .4–.11, ch12–14, and shared lines that ran this life). Each Chuỗi taken adds `BAL.ge.pull.step` to that ending. One option may pull two endings and push a third.
- **Closing choices (Khóa)** — each grand ending lists the options that **close it for good**. Every road chapter .5–.11 has at least one real fork whose options close at least one grand ending, so the funnel narrows: target `BAL.ge.funnel` ≈ 4 open at .4 → 2–3 by .8 → 1–2 by .11 for a player with a consistent style.
- **Fail-only (chỉ còn đường thua)**: an ending becomes fail-only when its condition can no longer be met (the person it needs died, the seat it needs was taken, or a listed "doom" option was chosen). Pointing at it at the end gives its fail outcome. This is the owner's "chỉ còn kết cục thua" case.
- **Seat lock**: NDE (nữ đế), THH (Thái hậu buông rèm), HH (Hoàng hậu), TM (mẹ của vua) are one per world; when someone (her or an NPC) takes one, every other person's ending needing that seat turns fail-only.
- **Kỳ ngộ stay independent of the funnel** (j97 / RD97L unchanged): a life can end with a grand ending + a kỳ ngộ, a fail outcome + a kỳ ngộ, or just a fail outcome.
- The chapter results of .5–.11 (win / mid / lose, existing) are where most Chuỗi / Khóa options live; they are not endings.

### 2.4 Hồi kết nhánh — "the last two choices"
- **When**: one extra hồi right after ch14 (ke14) (OPEN DECISION D3; alt: at .11). A life that ended earlier (death, a rare exit that closes the life) never reaches it; Sổ luân hồi then marks the branch position where she stopped.
- **Same two questions every life** (kit event frame):
  - **Ngã rẽ 1 · Đi hay ở**: «Ở lại, giữ trọn phận mình» · «Ở lại, nắm lấy quyền bính» · «Rời khỏi cung cấm» · «Theo người ấy đi» (người ấy = the strongest real bond of her life; greyed «chưa có ai» if none).
  - **Ngã rẽ 2 · Đối đãi thế nào**: «Lấy ân mà đối đãi» · «Lấy uy mà trị» · «Buông bỏ tất cả».
  - No costs, no gating: never forced.
- **Resolve** — every life now lands on one of the branch's 8 outcome nodes (4 grand, 4 fail):
  - pair owned by an **open** ending → odds from its pull + its one condition (`BAL.ge.odds`), rolled once: success = **Đại kết cục** in the shading of §2.6; failure = its **fail outcome** with loss `BAL.ge.fail.<id>`;
  - pair owned by a **fail-only** or **closed** ending → its fail outcome with loss;
  - pair owned by **no** ending (8 of the 12 pairs per branch) → the fail outcome of the ending with the **highest pull** (tie: the first still open, else ge1), **quiet form**: no loss, notice «Cuộc đời ngươi vẫn tiếp tục như thế.»; her choice does not move her (choosing «Rời khỏi cung cấm» here does not throw her out).
- Odds are NOT shown on these two choices (like the j97 "✦" option) — OPEN DECISION D7.

### 2.5 Unlocking = big event + scene + very large reward + title
1. **Event**: full kit event frame (kitEventDp) titled «Đại kết cục · <tên>», the ending's painted scene in its shading (§6), 3–5 lines of narration written per shading, button «Tạ ơn». A world-wide news line to every NPC (world events = centre pop-up, OD 17/11 14:05–14:30Z) — "everyone knows".
2. **Reward** (very large, ONE CORE — names only, numbers measured later): `BAL.ge.rw.<id>` built from `BAL.ge.rw.size.{dai}`, target ≈ `BAL.ge.rw.mul` × the road's RD97L rare fx (start 3×): rank step (`rank`, never above the seat rules), Danh / Sủng / Bạc / Tai mắt / Đức (`danh` `sung` `bac` `mat` `duc`), every NPC's attitude (`rel`: thiện shading → thiện cảm +; ác shading → kính sợ / oán +), the summit effect (`seat`: Hoàng hậu through the existing lập hậu rules j8/j34; office posts; clan state…), and ONE treasure: a **Kim sách Thiên mệnh** (one item kind, the shading title engraved; cannot be sold, given or lost — item conservation OD:L1314) → `BAL.ge.rw.kimsach`. Both shadings of one ending have the same reward SIZE (fair, no "right" morality); only the attitude sign differs. Leaderboard points `BAL.ge.pt`.
3. **After** (OPEN DECISION D4): endings the game can live in (stay summits HH, QP, ADV, CLAN, SIS, TK, JUST, REV, POWER, OFFICE, ART, CHILD, PEACE …) **continue the life**; endings it cannot simulate (Rời cung, Theo người, and NDE, THH, NV, KING, ANNEX, TM) **close the life with an epilogue** (j97 exit pattern `over(title, text, fate, true)`).
4. **Fail outcome event**: a short kit notice «Kết cục · <tên thua>» (2–3 lines, the reverse of the ending: what she reached for and lost), the loss rows (kit Được/Mất chips), no title; the quiet form shows only «Cuộc đời ngươi vẫn tiếp tục như thế.» with the fail name as its header.

### 2.6 Option C — thiện / ác shadings inside each grand ending (owner L1623 (1): "vừa có thể sưu tập được danh hiệu, vừa có thể unlock")
- **What**: each grand ending = one destination (node), two ways of having got there. Same summit, same Ngã rẽ pair, same condition, same reward size; different **title**, **narration**, **scene shading** (light, crowd, faces) and attitude of the world. Example tt_co ge1 (NDE through her father's clan): thiện «Nữ đế hiền minh» (the protégés serve a merciful ruler) · ác «Ngai vàng họ ngoại» (the court rules by fear). Catalogue §3 lists both titles for all 160.
- **Which shading she gets — the hidden lean (thiện–ác)**: `S.ge.lean`, one number per life, never shown (Witcher-style tally), built from:
  1. **her road choices**: every option in road chapters .4–.11, ch12–14 and the shared lines carries a writer's tag thiện (+) / ác (−) / none (`BAL.ge.var.tag`); cruelty (vu oan, hãm hại, đầu độc, bán đứng, giết) is ác, mercy / help / sacrifice is thiện;
  2. **her deeds outside the story**: the change of **Đức** over this life (existing stat `p.duc`, end − start) × `BAL.ge.var.duc` — the same Đức the game already moves for kind and cruel acts, so the whole life counts, not only story options (ONE CORE: no second morality meter);
  3. **the last choice**: Ngã rẽ 2 «Lấy ân» + / «Lấy uy» − / «Buông» 0, × `BAL.ge.var.last` (weight of one big choice, never enough alone to flip a long life).
- **Cut**: lean ≥ `BAL.ge.var.cut` → **thiện** shading; lean ≤ −`cut` → **ác** shading; between → the ending's **natural** shading (catalogue column "Natural": thiện endings and giữa endings → thiện, ác endings → ác). So a player who never leans gets the ending as named; a player who leans hard gets the other face of it (a cruel woman who still takes «Hiền tướng hậu cung»'s road ends as «Gian tướng hậu cung»).
- **Collect + unlock**: each shading title is unlocked the FIRST time she earns it in any life and stays unlocked in `ctm-ge` (per title: life no., name, branch, ending, shading, when). Sổ luân hồi counts «Danh hiệu Thiên mệnh: n / 320» and per branch «n / 8». Earning the same title again adds a life to its row (no duplicate entry). Unlocking is collection only — nothing in play depends on how many she owns (only the last life's title carries, §2.7).
- **Fail outcomes have no shading** (one fail per grand ending; its text may read her lean in one line, writer's choice).

### 2.7 The ONLY carry-over: the title
- Next life starts with the title of the grand ending she earned in the life before (in its shading) available to wear (S.titleWorn may be set to it; still ONE worn title, OD 13:50Z). Carry rule = OPEN DECISION D5 (only the previous life's, cosmetic — recommended).
- Titles unlocked in older lives stay in the collection (Sổ luân hồi), but are not wearable unless D5 = "any ever earned".
- Nothing else carries: no stat, silver, item, rank, relation (owner rule 3). The branch chart's unlocked nodes are knowledge only.
- Title plate: registered in the jdh catalogue as group "Thiên mệnh" (kitTitlePlate / kitTitleOpen / 3-line tag). KIT REQUEST (kit keeper; art Foreman C later): one "Thiên mệnh" plate above tier 8, in two tones — thiện (gold-white) and ác (gold-crimson) — same shape. Info card: «Đạt được khi <câu kết>. Kiếp <n> · <Thân phận> · <Nhánh>.»

### 2.8 Bảng Thiên mệnh — leaderboard per life
Reuse j90 kitPodium («Bảng vàng» look, kit-ico-rank icon, KIT): a tab «Thiên mệnh» beside the Danh hiệu tab of NHIỆM VỤ (OD 13:00Z) listing every person of THIS life who reached a grand ending: figure · rank · title plate (its shading tone) · name · thân phận · when. Her row first; NPC rows in order reached. Co-op: each friend's own row (state only).

### 2.9 NPC parity (OD:L1386 / L1403, owner L1601 (4))
- NPC women draw an identity by the ORIGINS odds (j69 OW69) and one of its 4 roads (NPC roads OD:L1243, unit D); their branch has the SAME 4 grand endings + 2 kỳ ngộ, all open at their start, the same funnel, the same fail outcomes, the same two shadings.
- Their pull, closing choices and lean come from THEIR choices (jagent scores options by needs/traits — no flat roll) + their own Đức; their Hồi kết nhánh comes at the end of their own road; jagent picks Ngã rẽ 1/2 from her nature (Ân cần / Khiêm nhường → «Lấy ân»; Tham vọng / Kiêu ngạo / Xảo quyệt → «Lấy uy»; Kín đáo → «Buông»; strongest bond → «Theo người ấy»). Same resolve rule (open → odds → grand in a shading or fail; no ending owns the pair → quiet fail), same seat locks.
- On unlock: world news, their shading title over their name (3-line tag), their row on the Bảng, the summit applies to the world (an NPC can become Hoàng hậu / Thái hậu / leave the palace). An NPC's fail outcome is a news line only when it is a public fall (seat lost, exile).
- Helping: her side quest = one hồi from that NPC's road (OD:L1243/L1252); her help pulls the NPC toward an ending or keeps one open (sabotage can close one); if the NPC unlocks after her help → reward to her (`BAL.ge.help.rw`); she may sabotage (two-way law), and the NPC may strike back (L1601 (4)).
- NPCs have no branch chart (Sổ luân hồi is hers). Men (Emperor, Vương gia, officials) have no grand endings in this pass.

### 2.10 Sơ đồ nhánh — the branch chart, in Sổ luân hồi ONLY (owner L1623 (1): "nếu như bạn nói nó chỉ hiện ở sổ luân hồi ok đó ... họ biết được rằng là họ đang chơi tới đâu, cần phải làm gì")
- **Where**: a page «Sơ đồ nhánh» inside Sổ luân hồi (title sub-screen `.kpt-mount`, j74; and the in-game Sổ luân hồi). Nowhere else — not in Mệnh truyện, not as a pop-up. (This replaces r2's D6 "quiet line in Mệnh truyện".)
- **Pick**: 10 identity tabs × 4 road rows; the branch of the current life opens first. A branch never played shows all nodes as «?» with its road name.
- **Nodes** (one chart per branch, top → bottom):
  1. **Road spine**: Nhập cung → .4 → .5 … .11 → ch12 → ch13 → ch14 → **Hồi kết nhánh**. Each chapter node shows its name once she has played it in any life; unplayed = «?».
  2. **Kỳ ngộ** (2): hanging off .4 and .11; name once found in any life (reads `ctm-rare97` + RD97L), else «?».
  3. **4 grand endings** below Hồi kết nhánh, each node with **two shading slots** (thiện / ác): an earned shading shows its title on its plate tone; an unearned slot shows «?». The node's name shows once either shading is earned; else «?».
  4. **4 fail outcomes**, each under its grand ending; name once reached in any life, else «?».
- **Her position (this life only)**: a kit "you are here" marker (her face chip) on the chapter she is in; chapters already behind her this life drawn solid, ahead dotted. On each grand-ending node, its **state in this life**: **còn mở** (lit), **chỉ còn đường thua** (cracked; the fail node lit instead), **đã khép** (dim, with the chapter where it closed — «Khép ở chương 8»). This is the "đang chơi tới đâu".
- **"Cần phải làm gì"** without spoiling: tapping an **unlocked** grand-ending node opens its card: its Ngã rẽ pair in words («Ở lại, nắm lấy quyền bính» + «Lấy uy mà trị»), its condition in words (no numbers, no %: «cần Tai mắt rộng và sổ môn sinh trong tay»), and both shading titles (earned or «?»), plus «Ngươi từng đạt: kiếp <n>». Tapping a **«?»** node shows only «Chưa ai biết ngả này dẫn tới đâu.» and its state this life (open / closed). So she sees where she is, which doors are still open, and — for endings she has found before — exactly how to aim for them again (to collect the other shading).
- **Counts**: per branch «Đại kết cục n/4 · Danh hiệu n/8 · Kỳ ngộ n/2»; per identity and overall totals on the tab row.
- **Data**: reads `ctm-ge` (unlocked endings / titles / fail outcomes), `ctm-rare97` (kỳ ngộ), a new `ctm-gech` (chapters seen per branch, names only) and, for the current life, `S.ge` (states) + the road chapter index. Nothing here changes play.
- **KIT**: no kit part draws a node chart today (kitSteps, KIT §21 skill card, is a linear segment bar; kitPodium is a ranking). → **KIT REQUEST** filed in dev/kit/KIT_REQUESTS.md (this branch): `kitBranchMap` — vertical node chart (spine + side nodes + 2-slot end nodes), node states (seen / «?» / lit / cracked / dim), you-are-here chip, node card = existing kit info card. Built by the kit keeper before any build worker uses it; Fold 755x1000 + iPad 1180x820 first (spine vertical on Fold, ending row wraps 2×2).

### 2.11 Variety guard (machine-checked)
Data + checker: dev/design/ge_guard/cat.py (catalogue + `OTHER` shading titles) + check.py + gen.py on this branch (design data, not game code; move into dev/test when building). Rules per branch: exactly **4 grand endings** (no normal set), **≥ 3 theme groups**, **≥ 1 ending whose natural shading is ác**, **≥ 1 stay** and **≥ 1 leave/follow**, **4 different crossroads pairs**, **4 different summits**, every ending has **two different shading titles**; across all: **no duplicate ending name**, **no duplicate title among the 320**, **no duplicate shape** (summit + natural + lever), every title ≤ 4 chữ. Result r3: **0 errors** — branches 40 · grand 160 · titles 320 · fail outcomes 160 · kỳ ngộ 80 · normal 0. Spread: groups 1:22 · 2:18 · 3:19 · 4:12 · 5:21 · 6:8 · 7:10 · 8:26 · 9:14 · 10:10; natural thiện 79 · giữa 34 · ác 47; seat summits NDE 4 · THH 3 · HH 4 · TM 3 · NV 2 · QP 5 (each has a hiền and a bạo shading now, e.g. 4 nữ đế × 2 = 8 nữ đế titles).

### 2.12 What the 8 common + 3 mid-life lines become
- **s_* (8 shared arcs)**: stay fillers — they own **no grand ending**. Their j97 rares stay as kỳ ngộ outside the branch count. Their options carry Chuỗi / Khóa / lean tags for the branch's grand endings.
- **st_the / st_con / st_dong (+ noi14, hau14, ke14)**: stay as ch12–14 for everyone; no grand ending of their own; they are the main **conditions** for power/children summits (st_the win → POWER/QP; st_dong / ke14 → TM / THH; hau14 → HH) and Hồi kết nhánh comes right after ke14. Their win/mid/lose are chapter results, not endings.

### 2.13 Bắc Địch gets its own 4 roads (40 branches) — OPEN DECISION D2
Her 17/11 words count "10 thân phận × 4 nhánh = 40" (L1601), and main's ADD (D STATUS L361) orders 4 bd roads. This touches OD:L1213/L1215 (16/11: hòa thân is ONE origin with country branches; "no new structure"). Both readings are offered: (a) **recommended** — bd stays a country branch of hòa thân (no 10th origin, same jkc2 / KC2LAND frame) but its branch gets **4 roads of its own** (premises below, built by Foreman B like any road: .4 arc + .5–.11 + 2 kỳ ngộ), so the grand-ending table has 40 branches; (b) bd keeps nc's 4 roads (land words only) and gets only its own 4 grand-ending sets (36 road bodies, 40 grand sets). bd roads (a):
| Road | Premise (.4) | Arc to .11 | Theme |
|---|---|---|---|
| `bd_san` Mùa thu săn | At the autumn hunt (thu tiển) she rides and shoots among Đại Hy men; one arrow decides who notices her | horse office, the Emperor's riding companion, a rival's "accident", the call of the steppe | Tài nghệ · Tình yêu |
| `bd_soi` Sói đầu đàn | Phụ hãn falls from his horse; her uncle claims the golden tent and asks Đại Hy to recognise him; her young brother asks her help | succession war at home fought through the court (worked sample §4.2) | Quyền lực · Gia tộc |
| `bd_tuyet` Năm tuyết trắng | A white winter kills the herds; her people starve at the border; grain from Đại Hy or raids | relief, grain-for-peace market, opening the pass, a song of the winter | Thiên hạ |
| `bd_hen` Lời thề bên đống đá | Her betrothed from the steppe rides in with the embassy; the oath at the ovoo stone | love vs place, sworn brotherhood, a court plot against him, revenge | Tình yêu · Tự do |
Distinct from nc's roads (mật lệnh, sứ đoàn, người ngoại tộc, ngai vàng cố quốc). Story-only NPCs (uncle, brother, betrothed) need rows in ROAD_MAP §5.4 before writing (Foreman B).


### 2.14 BAL keys (names only — ONE CORE; no edits now)
`BAL.ge.n` {grand:4, rare:2} (no normal) · `BAL.ge.pull` {step} · `BAL.ge.funnel` (target open counts by chapter, measured) · `BAL.ge.odds` (pull + condition → odds) · `BAL.ge.gate.<id>` · `BAL.ge.fail.<id>` (fail-outcome loss; none in the quiet form) · `BAL.ge.var` {tag, duc, last, cut} (option C shading lean) · `BAL.ge.seat` {NDE, THH, HH, TM} · `BAL.ge.when` (hồi after ke14) · `BAL.ge.rw.size` · `BAL.ge.rw.mul` · `BAL.ge.rw.<id>` {rank, danh, sung, bac, mat, duc, rel, seat, kimsach} (same size for both shadings) · `BAL.ge.pt` (leaderboard points) · `BAL.ge.title` {tier, fx:none, carry:"prev"} · `BAL.ge.help.rw` · `BAL.ge.npc` {on} · `BAL.ge.target` {inChar, random, shade} (measured bands: a bot that follows one ending's road from early on reaches a grand ending in roughly one life of two or three; a random bot rarely does; the funnel leaves 1–2 open by .11; a bot that plays kindly / cruelly for most of a life gets that shading — set by measurement, D57 style).

---
## 3. CATALOGUE — the 160 grand endings × 2 shadings (node name; Ngã rẽ pair = the two last choices that point to it; Natural = the shading she gets when her lean is in the middle; the r2 name is the natural shading's title)
Natural: thiện / giữa (→ thiện title) / ác. Ngã rẽ 1: Ở · giữ phận / Ở · nắm quyền / Rời cung / Theo người. Ngã rẽ 2: Lấy ân / Lấy uy / Buông. Summit codes: NDE nữ đế · THH Thái hậu buông rèm · HH Hoàng hậu · TM mẹ của vua · QP quyền phi (hiệp lý lục cung) · NV nữ vương nơi cố quốc · KING lập vua · ADV hiền thần / cố vấn · OFFICE nữ quan · ART/TEACHER tài nghệ lưu danh · CLAN gia tộc · SIS tỷ muội · TK tri kỷ đế vương · JUST/MERCY/REV/PURGE công lý / tha / báo thù / diệt thân · POWER/SPY quyền trong bóng tối · PEACE/RELIEF/LOYAL/FAME/SCHOOL thiên hạ · FREE/NUN/REUNION tự do / xuất gia / đoàn tụ · FOLLOW theo người · CHILD/TM con cái · BETRAY phản bạn · WAR/ANNEX chiến tranh / thôn tính · TRADE thương nghiệp · GENERAL nữ tướng · SACRIFICE gánh thay. Each ending also has ONE fail outcome (named by the writer with its Chuỗi/Khóa; the 12 of §4 are named). Chuỗi / Khóa / lean tags are written per branch by the road writers (pattern: §4).

#### tt — Con gái Tể tướng
| Branch | # | Grand ending (node name) | Group | Natural | Ngã rẽ 1 | Ngã rẽ 2 | Summit · lever | Thiện title | Ác title |
|---|---|---|---|---|---|---|---|---|---|
| `tt_co` Quân cờ trong tay cha | ge1 | **Ngai vàng họ ngoại** | 1 Quyền lực | ác | Ở · nắm quyền | Lấy uy | NDE · clan | Nữ đế hiền minh | Ngai vàng họ ngoại |
|  | ge2 | **Hiền tướng hậu cung** | 2 Chính trị | thiện | Ở · giữ phận | Lấy ân | ADV · court | Hiền tướng hậu cung | Gian tướng hậu cung |
|  | ge3 | **Buông cờ về núi** | 8 Tự do | thiện | Rời cung | Buông | FREE · father hills | Buông cờ về núi | Lật bàn bỏ đi |
|  | ge4 | **Đại nghĩa diệt thân** | 7 Gia tộc | ác | Ở · giữ phận | Lấy uy | PURGE · clan | Vì nước khuyên cha | Đại nghĩa diệt thân |
| `tt_oan` Phủ Tể tướng mắc oan | ge1 | **Thanh thiên hậu cung** | 5 Báo thù | thiện | Ở · giữ phận | Lấy ân | JUST · law | Thanh thiên hậu cung | Án sắt hậu cung |
|  | ge2 | **Máu trả máu** | 5 Báo thù | ác | Ở · nắm quyền | Lấy uy | REV · clan | Lấy luật trả oan | Máu trả máu |
|  | ge3 | **Nữ phán quan** | 9 Tài nghệ | thiện | Ở · nắm quyền | Buông | OFFICE · law | Nữ phán quan | Phán quan khắc nghiệt |
|  | ge4 | **Hoa nở ngoài cung** | 3 Tình yêu | thiện | Theo người | Buông | FOLLOW · censor | Hoa nở ngoài cung | Bỏ nhà theo người |
| `tt_tranh` Phủ Tể tướng chia đôi | ge1 | **Nhất gia chi chủ** | 7 Gia tộc | thiện | Ở · giữ phận | Lấy ân | CLAN · clan | Nhất gia chi chủ | Gia chủ độc đoán |
|  | ge2 | **Huynh muội tương tàn** | 7 Gia tộc | ác | Ở · nắm quyền | Lấy uy | PURGE · brother | Thu phục huynh trưởng | Huynh muội tương tàn |
|  | ge3 | **Một mình một cõi** | 8 Tự do | giữa | Rời cung | Buông | FREE · self | Một mình một cõi | Đoạn tuyệt gia môn |
|  | ge4 | **Phượng ấn về nhà** | 1 Quyền lực | thiện | Ở · nắm quyền | Lấy ân | HH · clan | Phượng ấn về nhà | Họ ngoại chuyên quyền |
| `tt_mat` Mật ước với Hoàng hậu | ge1 | **Trung cung kế vị** | 1 Quyền lực | giữa | Ở · nắm quyền | Lấy ân | HH · pact | Trung cung kế vị | Đoạt ghế Trung cung |
|  | ge2 | **Tỷ muội Trung cung** | 4 Tình bạn | thiện | Ở · giữ phận | Lấy ân | SIS · queen | Tỷ muội Trung cung | Ám vệ Trung cung |
|  | ge3 | **Dao trong mật ước** | 5 Báo thù | ác | Ở · giữ phận | Lấy uy | REV · pact | Phá ước cứu người | Dao trong mật ước |
|  | ge4 | **Hai bóng chùa xa** | 8 Tự do | thiện | Rời cung | Buông | NUN · queen | Hai bóng chùa xa | Ép hậu xuất gia |

#### dtq — Con gái Đại tướng quân
| Branch | # | Grand ending (node name) | Group | Natural | Ngã rẽ 1 | Ngã rẽ 2 | Summit · lever | Thiện title | Ác title |
|---|---|---|---|---|---|---|---|---|---|
| `dtq_bien` Khói lửa Nhạn Môn | ge1 | **Nữ tướng Nhạn Môn** | 10 Thiên hạ | thiện | Rời cung | Lấy uy | GENERAL · army | Nữ tướng Nhạn Môn | Huyết tướng Nhạn Môn |
|  | ge2 | **Dưỡng giặc giữ quyền** | 2 Chính trị | ác | Ở · nắm quyền | Lấy uy | POWER · war | Trấn biên giữ nước | Dưỡng giặc giữ quyền |
|  | ge3 | **Con nối nghiệp ông** | 6 Con cái | giữa | Ở · nắm quyền | Lấy ân | CHILD · grandson | Con nối nghiệp ông | Con cầm binh quyền |
|  | ge4 | **Hồn về Nhạn Môn** | 3 Tình yêu | giữa | Theo người | Buông | FOLLOW · officer | Hồn về Nhạn Môn | Đào ngũ theo chàng |
| `dtq_vu` Bức thư mưu phản | ge1 | **Đan tâm chiếu sử** | 7 Gia tộc | thiện | Ở · giữ phận | Lấy ân | CLAN · loyalty | Đan tâm chiếu sử | Giữ nhà bằng máu |
|  | ge2 | **Lập vua trong máu** | 2 Chính trị | ác | Ở · nắm quyền | Lấy uy | KING · army | Phò vua chính thống | Lập vua trong máu |
|  | ge3 | **Cả nhà ra biên** | 8 Tự do | giữa | Rời cung | Buông | FREE · family | Cả nhà ra biên | Trốn án ra biên |
|  | ge4 | **Ấn giả đền mạng** | 5 Báo thù | ác | Ở · giữ phận | Lấy uy | REV · forger | Tìm ra ấn giả | Ấn giả đền mạng |
| `dtq_binh` Binh phù và long ngai | ge1 | **Binh phù trong tay** | 1 Quyền lực | ác | Ở · nắm quyền | Lấy uy | NDE · army | Nữ đế an dân | Binh phù trong tay |
|  | ge2 | **Trung thần giao binh** | 2 Chính trị | thiện | Ở · giữ phận | Lấy ân | PEACE · tally | Trung thần giao binh | Giao binh đổi quyền |
|  | ge3 | **Theo cờ vương phủ** | 3 Tình yêu | giữa | Theo người | Buông | FOLLOW · prince | Theo cờ vương phủ | Phản cung theo vương |
|  | ge4 | **Giải giáp quy điền** | 8 Tự do | thiện | Rời cung | Lấy ân | FREE · father | Giải giáp quy điền | Mang binh quy ẩn |
| `dtq_huynh` Người anh nơi đất giặc | ge1 | **Huynh muội trùng phùng** | 7 Gia tộc | thiện | Rời cung | Lấy ân | CLAN · brother | Huynh muội trùng phùng | Cướp huynh về nước |
|  | ge2 | **Hòa thư hai nước** | 10 Thiên hạ | thiện | Ở · giữ phận | Lấy ân | PEACE · treaty | Hòa thư hai nước | Hòa thư lừa giặc |
|  | ge3 | **Thù nhà nợ nước** | 5 Báo thù | ác | Ở · nắm quyền | Lấy uy | WAR · army | Đánh giặc cứu huynh | Thù nhà nợ nước |
|  | ge4 | **Hồng nhan đất giặc** | 3 Tình yêu | giữa | Theo người | Buông | FOLLOW · enemy prince | Hồng nhan đất giặc | Phản quốc theo chàng |

#### muoi — Con gái nhà buôn muối
| Branch | # | Grand ending (node name) | Group | Natural | Ngã rẽ 1 | Ngã rẽ 2 | Summit · lever | Thiện title | Ác title |
|---|---|---|---|---|---|---|---|---|---|
| `muoi_tuoc` Mua tước cho cha | ge1 | **Hoàng thương thiên hạ** | 9 Tài nghệ | thiện | Rời cung | Lấy ân | TRADE · silver | Hoàng thương thiên hạ | Gian thương thiên hạ |
|  | ge2 | **Vương tước cho con** | 6 Con cái | thiện | Ở · giữ phận | Lấy ân | CHILD · silver title | Vương tước cho con | Mua tước cho con |
|  | ge3 | **Thái hậu bạc vàng** | 1 Quyền lực | ác | Ở · nắm quyền | Lấy uy | THH · silver | Thái hậu tán tài | Thái hậu bạc vàng |
|  | ge4 | **Thuyền về cố hương** | 8 Tự do | giữa | Rời cung | Buông | FREE · home | Thuyền về cố hương | Ôm bạc trốn đi |
| `muoi_lau` Thuyền muối đêm | ge1 | **Diệt lưới muối lậu** | 2 Chính trị | thiện | Ở · giữ phận | Lấy ân | JUST · ledger | Diệt lưới muối lậu | Nuốt lưới muối lậu |
|  | ge2 | **Vua muối bóng tối** | 9 Tài nghệ | ác | Ở · nắm quyền | Lấy uy | TRADE · smuggling | Muối lậu nuôi dân | Vua muối bóng tối |
|  | ge3 | **Theo thuyền giang hồ** | 3 Tình yêu | giữa | Theo người | Buông | FOLLOW · boatman | Theo thuyền giang hồ | Thủ lĩnh giang hồ |
|  | ge4 | **Nợ máu nhà muối** | 5 Báo thù | ác | Ở · giữ phận | Lấy uy | REV · blood debt | Đòi công nhà muối | Nợ máu nhà muối |
| `muoi_doi` Năm đói ở Giang Nam | ge1 | **Bồ Tát Giang Nam** | 10 Thiên hạ | thiện | Rời cung | Lấy ân | RELIEF · grain | Bồ Tát Giang Nam | Bán lương Giang Nam |
|  | ge2 | **Kho lương thiên hạ** | 1 Quyền lực | ác | Ở · nắm quyền | Lấy uy | POWER · grain | Mở kho cứu đói | Kho lương thiên hạ |
|  | ge3 | **Hiền phi cứu đói** | 10 Thiên hạ | thiện | Ở · giữ phận | Buông | FAME · court | Hiền phi cứu đói | Mua danh cứu đói |
|  | ge4 | **Đầu cơ đền tội** | 5 Báo thù | ác | Ở · giữ phận | Lấy uy | REV · hoarder | Khuyên kẻ đầu cơ | Đầu cơ đền tội |
| `muoi_no` Món nợ trong cung | ge1 | **Chủ nợ lục cung** | 2 Chính trị | ác | Ở · nắm quyền | Lấy uy | POWER · debts | Ân nhân lục cung | Chủ nợ lục cung |
|  | ge2 | **Nợ hóa tình thân** | 4 Tình bạn | thiện | Ở · giữ phận | Lấy ân | SIS · debt | Nợ hóa tình thân | Nợ hóa xiềng xích |
|  | ge3 | **Xóa nợ ra đi** | 8 Tự do | thiện | Rời cung | Buông | FREE · debt | Xóa nợ ra đi | Quỵt nợ ra đi |
|  | ge4 | **Thư sinh trả nợ** | 3 Tình yêu | thiện | Theo người | Lấy ân | FOLLOW · scholar | Thư sinh trả nợ | Trói chàng bằng nợ |

#### cn — Cung nữ được sủng hạnh
| Branch | # | Grand ending (node name) | Group | Natural | Ngã rẽ 1 | Ngã rẽ 2 | Summit · lever | Thiện title | Ác title |
|---|---|---|---|---|---|---|---|---|---|
| `cn_chu` Chủ cũ | ge1 | **Tớ cũ thành chủ** | 1 Quyền lực | ác | Ở · nắm quyền | Lấy uy | QP · servants | Thương người hạ nhân | Tớ cũ thành chủ |
|  | ge2 | **Ân chủ trọn đời** | 4 Tình bạn | thiện | Ở · giữ phận | Lấy ân | SIS · mistress | Ân chủ trọn đời | Nắm thóp chủ cũ |
|  | ge3 | **Trả áo về quê** | 8 Tự do | thiện | Rời cung | Buông | FREE · maid village | Trả áo về quê | Cuỗm vàng về quê |
|  | ge4 | **Thay chủ nuôi con** | 6 Con cái | giữa | Ở · nắm quyền | Lấy ân | TM · foster son | Thay chủ nuôi con | Cướp con của chủ |
| `cn_tinh` Mối tình thuở hầu trà | ge1 | **Trốn cùng thị vệ** | 3 Tình yêu | thiện | Theo người | Buông | FOLLOW · guard | Trốn cùng thị vệ | Bỏ trốn đêm loạn |
|  | ge2 | **Chôn tình giữ ngôi** | 1 Quyền lực | ác | Ở · nắm quyền | Lấy uy | QP · sacrifice | Gạt lệ giữ ngôi | Chôn tình giữ ngôi |
|  | ge3 | **Tình hóa trung nghĩa** | 2 Chính trị | thiện | Ở · giữ phận | Lấy ân | ADV · guard | Tình hóa trung nghĩa | Lợi dụng tình xưa |
|  | ge4 | **Xuất gia đoạn tình** | 8 Tự do | giữa | Rời cung | Buông | NUN · love | Xuất gia đoạn tình | Đoạn tình tuyệt nghĩa |
| `cn_ban` Tri kỷ ở Tân Giả khố | ge1 | **Chưởng sự lục cục** | 9 Tài nghệ | thiện | Ở · nắm quyền | Lấy ân | OFFICE · craft | Chưởng sự lục cục | Bà chúa lục cục |
|  | ge2 | **Tỷ muội trọn đời** | 4 Tình bạn | thiện | Ở · giữ phận | Lấy ân | SIS · friend | Tỷ muội trọn đời | Tỷ muội đồng mưu |
|  | ge3 | **Cùng nhau ra cung** | 8 Tự do | thiện | Rời cung | Buông | FREE · friend | Cùng nhau ra cung | Trốn cung bỏ bạn |
|  | ge4 | **Bán bạn cầu vinh** | 4 Tình bạn | ác | Ở · nắm quyền | Lấy uy | BETRAY · friend | Bỏ bạn vì nghĩa | Bán bạn cầu vinh |
| `cn_than` Thân thế thật | ge1 | **Họ Thẩm phục hưng** | 7 Gia tộc | thiện | Ở · giữ phận | Lấy ân | CLAN · name | Họ Thẩm phục hưng | Họ Thẩm báo oán |
|  | ge2 | **Nữ đế khoan nhân** | 1 Quyền lực | thiện | Ở · nắm quyền | Lấy ân | NDE · bloodline | Nữ đế khoan nhân | Nữ đế huyết thống |
|  | ge3 | **Mang họ mẹ đi** | 8 Tự do | giữa | Rời cung | Buông | FREE · mother | Mang họ mẹ đi | Chối bỏ họ cha |
|  | ge4 | **Báo thù cho mẹ** | 5 Báo thù | ác | Ở · giữ phận | Lấy uy | REV · mother | Đòi công cho mẹ | Báo thù cho mẹ |

#### nc — Công chúa hòa thân · Nam Chiếu
| Branch | # | Grand ending (node name) | Group | Natural | Ngã rẽ 1 | Ngã rẽ 2 | Summit · lever | Thiện title | Ác title |
|---|---|---|---|---|---|---|---|---|---|
| `nc_gian` Mật lệnh cố quốc | ge1 | **Gián điệp hai triều** | 2 Chính trị | ác | Ở · nắm quyền | Lấy uy | SPY · homeland | Mật sứ hòa bình | Gián điệp hai triều |
|  | ge2 | **Một lòng Đại Hy** | 10 Thiên hạ | thiện | Ở · giữ phận | Lấy ân | LOYAL · court | Một lòng Đại Hy | Bán đứng cố quốc |
|  | ge3 | **Thoát vòng hai nước** | 8 Tự do | giữa | Rời cung | Buông | FREE · two realms | Thoát vòng hai nước | Phản cả hai triều |
|  | ge4 | **Tình nơi quán dịch** | 3 Tình yêu | thiện | Theo người | Lấy ân | FOLLOW · envoy | Tình nơi quán dịch | Câu chàng quán dịch |
| `nc_su` Sứ đoàn cố quốc | ge1 | **Cầu nối vạn dặm** | 10 Thiên hạ | thiện | Ở · giữ phận | Lấy ân | PEACE · envoys | Cầu nối vạn dặm | Bán tin vạn dặm |
|  | ge2 | **Nữ sứ hai triều** | 9 Tài nghệ | thiện | Rời cung | Lấy ân | OFFICE · envoy | Nữ sứ hai triều | Nữ sứ hai lòng |
|  | ge3 | **Sứ đoàn đẫm máu** | 5 Báo thù | ác | Ở · nắm quyền | Lấy uy | REV · faction | Che chở sứ đoàn | Sứ đoàn đẫm máu |
|  | ge4 | **Về nam theo sứ** | 3 Tình yêu | giữa | Theo người | Buông | FOLLOW · envoy | Về nam theo sứ | Trốn nam theo sứ |
| `nc_tuc` Người ngoại tộc | ge1 | **Vũ khúc truyền đời** | 9 Tài nghệ | thiện | Ở · giữ phận | Lấy ân | ART · dance | Vũ khúc truyền đời | Vũ khúc mê hồn |
|  | ge2 | **Thái hậu ngoại tộc** | 1 Quyền lực | thiện | Ở · nắm quyền | Lấy ân | THH · son | Thái hậu ngoại tộc | Ngoại tộc chuyên quyền |
|  | ge3 | **Trả nhục ngàn lần** | 5 Báo thù | ác | Ở · nắm quyền | Lấy uy | REV · scorn | Lấy đức rửa nhục | Trả nhục ngàn lần |
|  | ge4 | **Về với núi mây** | 8 Tự do | thiện | Rời cung | Buông | FREE · homeland | Về với núi mây | Phóng hỏa về núi |
| `nc_vuong` Ngai vàng cố quốc | ge1 | **Nữ vương máu lạnh** | 1 Quyền lực | ác | Rời cung | Lấy uy | NV · army | Nữ vương nhân từ | Nữ vương máu lạnh |
|  | ge2 | **Hai ngai một lòng** | 10 Thiên hạ | thiện | Ở · giữ phận | Lấy ân | PEACE · brother | Hai ngai một lòng | Hai ngai một chủ |
|  | ge3 | **Thôn tính cố quốc** | 2 Chính trị | ác | Ở · nắm quyền | Lấy uy | ANNEX · court | Hợp nhất hai cõi | Thôn tính cố quốc |
|  | ge4 | **Công chúa lưu vong** | 3 Tình yêu | giữa | Theo người | Buông | FOLLOW · exiled prince | Công chúa lưu vong | Lưu vong phục thù |

#### bd — Công chúa hòa thân · Bắc Địch
| Branch | # | Grand ending (node name) | Group | Natural | Ngã rẽ 1 | Ngã rẽ 2 | Summit · lever | Thiện title | Ác title |
|---|---|---|---|---|---|---|---|---|---|
| `bd_san` Mùa thu săn | ge1 | **Thống lĩnh ngự mã** | 9 Tài nghệ | thiện | Ở · nắm quyền | Lấy ân | OFFICE · horses | Thống lĩnh ngự mã | Ngự mã chuyên quyền |
|  | ge2 | **Tri kỷ lưng ngựa** | 3 Tình yêu | thiện | Ở · giữ phận | Lấy ân | TK · riding | Tri kỷ lưng ngựa | Lưng ngựa mưu sâu |
|  | ge3 | **Mũi tên trường săn** | 5 Báo thù | ác | Ở · giữ phận | Lấy uy | REV · hunt | Mũi tên cứu giá | Mũi tên trường săn |
|  | ge4 | **Về với thảo nguyên** | 8 Tự do | thiện | Rời cung | Buông | FREE · horse | Về với thảo nguyên | Cướp ngựa về bắc |
| `bd_soi` Sói đầu đàn | ge1 | **Nữ Khả hãn** | 1 Quyền lực | giữa | Rời cung | Lấy uy | NV · tribes | Nữ Khả hãn | Khả hãn sắt máu |
|  | ge2 | **Lập em làm hãn** | 2 Chính trị | thiện | Ở · giữ phận | Lấy ân | KING · diplomacy | Lập em làm hãn | Dựng hãn bù nhìn |
|  | ge3 | **Sói già phải chết** | 5 Báo thù | ác | Ở · nắm quyền | Lấy uy | REV · uncle | Bắt sói giao triều | Sói già phải chết |
|  | ge4 | **Con trai hai cõi** | 6 Con cái | giữa | Ở · nắm quyền | Lấy ân | TM · son | Con trai hai cõi | Con nắm hai cõi |
| `bd_tuyet` Năm tuyết trắng | ge1 | **Mẹ của thảo nguyên** | 10 Thiên hạ | thiện | Rời cung | Lấy ân | RELIEF · herds | Mẹ của thảo nguyên | Nữ chúa thảo nguyên |
|  | ge2 | **Lương thảo đổi hòa** | 2 Chính trị | thiện | Ở · giữ phận | Lấy ân | PEACE · trade | Lương thảo đổi hòa | Lương thảo đổi đất |
|  | ge3 | **Mở cửa ải bắc** | 10 Thiên hạ | ác | Ở · nắm quyền | Lấy uy | BETRAY · border | Mở ải cứu người | Mở cửa ải bắc |
|  | ge4 | **Khúc ca tuyết trắng** | 9 Tài nghệ | thiện | Ở · giữ phận | Buông | ART · song | Khúc ca tuyết trắng | Khúc ca oán hận |
| `bd_hen` Lời thề bên đống đá | ge1 | **Lời thề trọn vẹn** | 3 Tình yêu | thiện | Theo người | Buông | FOLLOW · betrothed | Lời thề trọn vẹn | Đốt cầu theo chàng |
|  | ge2 | **Chôn lời thề cũ** | 1 Quyền lực | ác | Ở · nắm quyền | Lấy uy | QP · oath | Gác lời thề cũ | Chôn lời thề cũ |
|  | ge3 | **Nghĩa huynh biên ải** | 4 Tình bạn | thiện | Ở · giữ phận | Lấy ân | SIS · betrothed | Nghĩa huynh biên ải | Lợi dụng nghĩa huynh |
|  | ge4 | **Đòi máu cho chàng** | 5 Báo thù | ác | Rời cung | Lấy uy | WAR · tribes | Đòi công cho chàng | Đòi máu cho chàng |

#### td — Con gái tội thần
| Branch | # | Grand ending (node name) | Group | Natural | Ngã rẽ 1 | Ngã rẽ 2 | Summit · lever | Thiện title | Ác title |
|---|---|---|---|---|---|---|---|---|---|
| `td_an` Lật lại án cũ | ge1 | **Rửa oan chín họ** | 7 Gia tộc | thiện | Ở · giữ phận | Lấy ân | CLAN · case | Rửa oan chín họ | Lật án đổ máu |
|  | ge2 | **Chín họ đền tội** | 5 Báo thù | ác | Ở · nắm quyền | Lấy uy | REV · case | Xử án công minh | Chín họ đền tội |
|  | ge3 | **Bút sử chép lại** | 9 Tài nghệ | thiện | Ở · nắm quyền | Lấy ân | OFFICE · history | Bút sử chép lại | Bút sử tùy tay |
|  | ge4 | **Tro tàn trở về** | 8 Tự do | giữa | Rời cung | Buông | FREE · grave | Tro tàn trở về | Mang thù trở về |
| `td_ke` Kẻ đứng sau màn | ge1 | **Diệt tận gốc** | 5 Báo thù | ác | Ở · nắm quyền | Lấy uy | REV · mastermind | Nhổ gốc trả oan | Diệt tận gốc |
|  | ge2 | **Tha để thắng** | 5 Báo thù | thiện | Ở · giữ phận | Lấy ân | MERCY · mastermind | Tha để thắng | Tha để trói |
|  | ge3 | **Mạng lưới bóng đêm** | 2 Chính trị | ác | Ở · giữ phận | Lấy uy | SPY · network | Mạng lưới che chở | Mạng lưới bóng đêm |
|  | ge4 | **Theo người cứu mạng** | 3 Tình yêu | giữa | Theo người | Buông | FOLLOW · rescuer | Theo người cứu mạng | Mượn người trốn án |
| `td_song` Người em còn sống | ge1 | **Tướng môn trở lại** | 7 Gia tộc | thiện | Ở · giữ phận | Lấy ân | CLAN · general house | Tướng môn trở lại | Tướng môn báo oán |
|  | ge2 | **Mở cổng thành đêm** | 1 Quyền lực | ác | Ở · nắm quyền | Lấy uy | KING · brother army | Mở cổng cứu giá | Mở cổng thành đêm |
|  | ge3 | **Chị em phiêu bạt** | 8 Tự do | thiện | Rời cung | Buông | FREE · brother | Chị em phiêu bạt | Chị em lục lâm |
|  | ge4 | **Thay em gánh tội** | 4 Tình bạn | giữa | Ở · giữ phận | Buông | SACRIFICE · brother | Thay em gánh tội | Đẩy tội cho người |
| `td_tha` Thù hay tha | ge1 | **Oán hóa thành ân** | 4 Tình bạn | thiện | Ở · giữ phận | Lấy ân | MERCY · enemy | Oán hóa thành ân | Giả tha chờ thời |
|  | ge2 | **Báo thù không tha** | 5 Báo thù | ác | Ở · nắm quyền | Lấy uy | REV · enemy | Báo thù đúng người | Báo thù không tha |
|  | ge3 | **Cửa Phật buông thù** | 8 Tự do | giữa | Rời cung | Buông | NUN · hatred | Cửa Phật buông thù | Mượn chùa náu thân |
|  | ge4 | **Yêu con kẻ thù** | 3 Tình yêu | giữa | Theo người | Lấy ân | FOLLOW · enemy son | Yêu con kẻ thù | Lấy tình làm dao |

#### ch — Cháu gái Thái hậu
| Branch | # | Grand ending (node name) | Group | Natural | Ngã rẽ 1 | Ngã rẽ 2 | Summit · lever | Thiện title | Ác title |
|---|---|---|---|---|---|---|---|---|---|
| `ch_co` Quân cờ của cô tổ | ge1 | **Đức Thọ đời sau** | 1 Quyền lực | thiện | Ở · nắm quyền | Lấy ân | THH · aunt | Đức Thọ đời sau | Đức Thọ chuyên quyền |
|  | ge2 | **Phản cô đoạt quyền** | 2 Chính trị | ác | Ở · nắm quyền | Lấy uy | POWER · aunt | Thay cô giữ nước | Phản cô đoạt quyền |
|  | ge3 | **Cháu hiền giữ lễ** | 7 Gia tộc | thiện | Ở · giữ phận | Lấy ân | CLAN · aunt | Cháu hiền giữ lễ | Cháu ngoan giấu dao |
|  | ge4 | **Cửa thiền thay cô** | 8 Tự do | giữa | Rời cung | Buông | NUN · faith | Cửa thiền thay cô | Mượn thiền tránh họa |
| `ch_benh` Thái hậu lâm bệnh | ge1 | **Thần y hậu cung** | 9 Tài nghệ | thiện | Ở · giữ phận | Lấy ân | ART · medicine | Thần y hậu cung | Độc y hậu cung |
|  | ge2 | **Chén thuốc cuối cùng** | 1 Quyền lực | ác | Ở · nắm quyền | Lấy uy | POWER · poison | Chén thuốc hồi sinh | Chén thuốc cuối cùng |
|  | ge3 | **Hiếu nữ cầm ấn** | 1 Quyền lực | giữa | Ở · nắm quyền | Lấy ân | QP · seal | Hiếu nữ cầm ấn | Mượn bệnh cầm ấn |
|  | ge4 | **Theo cô hành cung** | 8 Tự do | thiện | Rời cung | Buông | FREE · aunt | Theo cô hành cung | Giam cô hành cung |
| `ch_ho` Hai người cháu | ge1 | **Chị em một nhà** | 4 Tình bạn | thiện | Ở · giữ phận | Lấy ân | SIS · cousin | Chị em một nhà | Em làm bóng chị |
|  | ge2 | **Một phượng duy nhất** | 1 Quyền lực | ác | Ở · nắm quyền | Lấy uy | HH · cousin | Phượng nghi thiên hạ | Một phượng duy nhất |
|  | ge3 | **Nhường ngôi cho em** | 8 Tự do | thiện | Rời cung | Buông | FREE · cousin | Nhường ngôi cho em | Bỏ em gánh họa |
|  | ge4 | **Họ ngoại trăm năm** | 7 Gia tộc | giữa | Ở · nắm quyền | Lấy ân | CLAN · clan | Họ ngoại trăm năm | Họ ngoại lộng quyền |
| `ch_bi` Bí mật năm xưa | ge1 | **Trả lại công bằng** | 5 Báo thù | thiện | Ở · giữ phận | Lấy ân | JUST · secret | Trả lại công bằng | Bí mật thành dao |
|  | ge2 | **Giữ kín, nắm thóp** | 2 Chính trị | ác | Ở · nắm quyền | Lấy uy | POWER · secret | Giữ kín che người | Giữ kín, nắm thóp |
|  | ge3 | **Mẹ con nhận nhau** | 6 Con cái | giữa | Rời cung | Buông | REUNION · real mother | Mẹ con nhận nhau | Cướp mẹ về mình |
|  | ge4 | **Hoàng tử thất lạc** | 6 Con cái | giữa | Ở · nắm quyền | Lấy ân | TM · lost prince | Hoàng tử thất lạc | Hoàng tử giả danh |

#### thd — Con gái thầy đồ nghèo
| Branch | # | Grand ending (node name) | Group | Natural | Ngã rẽ 1 | Ngã rẽ 2 | Summit · lever | Thiện title | Ác title |
|---|---|---|---|---|---|---|---|---|---|
| `thd_tho` Danh hiệu Tài nữ | ge1 | **Thi tiên đương thời** | 9 Tài nghệ | thiện | Ở · giữ phận | Lấy ân | ART · poetry | Thi tiên đương thời | Thi ma đương thời |
|  | ge2 | **Ngòi bút giết người** | 5 Báo thù | ác | Ở · giữ phận | Lấy uy | REV · satire | Ngòi bút cứu người | Ngòi bút giết người |
|  | ge3 | **Thơ theo gió đi** | 8 Tự do | thiện | Rời cung | Buông | FREE · poetry | Thơ theo gió đi | Thơ đốt ra đi |
|  | ge4 | **Tri âm thiên tử** | 3 Tình yêu | thiện | Ở · giữ phận | Buông | TK · poetry | Tri âm thiên tử | Thi nữ dắt vua |
| `thd_sach` Di cảo của cha | ge1 | **Nữ đế biến pháp** | 1 Quyền lực | thiện | Ở · nắm quyền | Lấy ân | NDE · reform | Nữ đế biến pháp | Nữ đế khắc nghiệt |
|  | ge2 | **Đốt sách giữ ngôi** | 1 Quyền lực | ác | Ở · nắm quyền | Lấy uy | QP · censorship | Giấu sách giữ ngôi | Đốt sách giữ ngôi |
|  | ge3 | **Mở trường dạy chữ** | 10 Thiên hạ | thiện | Rời cung | Lấy ân | SCHOOL · books | Mở trường dạy chữ | Mở trường kết đảng |
|  | ge4 | **Gánh sách theo chàng** | 3 Tình yêu | giữa | Theo người | Buông | FOLLOW · scholar | Gánh sách theo chàng | Trộm sách theo chàng |
| `thd_tro` Học trò của cha | ge1 | **Trạng nguyên phò tá** | 2 Chính trị | thiện | Ở · giữ phận | Lấy ân | ADV · pupils | Trạng nguyên phò tá | Trạng nguyên con rối |
|  | ge2 | **Môn sinh thành phe** | 2 Chính trị | ác | Ở · nắm quyền | Lấy uy | POWER · pupils | Môn sinh đầy triều | Môn sinh thành phe |
|  | ge3 | **Theo trò đi xa** | 3 Tình yêu | giữa | Theo người | Buông | FOLLOW · pupil | Theo trò đi xa | Bỏ hết theo trò |
|  | ge4 | **Khoa trường vạch tội** | 5 Báo thù | thiện | Ở · giữ phận | Lấy uy | JUST · exam | Khoa trường vạch tội | Khoa trường thanh trừng |
| `thd_hoc` Thầy giáo trong cung | ge1 | **Đế sư thiên tử** | 9 Tài nghệ | thiện | Ở · nắm quyền | Lấy ân | TEACHER · pupil | Đế sư thiên tử | Đế sư lộng quyền |
|  | ge2 | **Dạy vua thành rối** | 1 Quyền lực | ác | Ở · nắm quyền | Lấy uy | KING · pupil | Dạy vua thành người | Dạy vua thành rối |
|  | ge3 | **Thư viện bên hồ** | 8 Tự do | thiện | Rời cung | Buông | FREE · books | Thư viện bên hồ | Ôm sách cấm đi |
|  | ge4 | **Mẹ nuôi Đông cung** | 6 Con cái | giữa | Ở · giữ phận | Lấy ân | CHILD · prince | Mẹ nuôi Đông cung | Mẹ nuôi tranh ngôi |

#### cnv — Cung nữ tuyển vào cung
| Branch | # | Grand ending (node name) | Group | Natural | Ngã rẽ 1 | Ngã rẽ 2 | Summit · lever | Thiện title | Ác title |
|---|---|---|---|---|---|---|---|---|---|
| `cnv_chu` Bí mật của chủ nhân | ge1 | **Bóng sau ghế chủ** | 2 Chính trị | ác | Ở · nắm quyền | Lấy uy | POWER · mistress secret | Bóng che ghế chủ | Bóng sau ghế chủ |
|  | ge2 | **Nghĩa chủ tình sâu** | 4 Tình bạn | thiện | Ở · giữ phận | Lấy ân | SIS · shared secret | Nghĩa chủ tình sâu | Chủ tớ đồng tội |
|  | ge3 | **Giữ kín ra cung** | 8 Tự do | giữa | Rời cung | Buông | FREE · kept secret | Giữ kín ra cung | Bán tin ra cung |
|  | ge4 | **Rửa oan người cũ** | 5 Báo thù | thiện | Ở · giữ phận | Lấy uy | JUST · old maid wrong | Rửa oan người cũ | Trả oán người cũ |
| `cnv_ban` Chị em đồng hương | ge1 | **Chị em ra cung** | 8 Tự do | thiện | Rời cung | Buông | FREE · village | Chị em ra cung | Một mình ra cung |
|  | ge2 | **Bước lên vai bạn** | 4 Tình bạn | ác | Ở · nắm quyền | Lấy uy | BETRAY · stolen credit | Kéo bạn cùng lên | Bước lên vai bạn |
|  | ge3 | **Kim chỉ thành danh** | 9 Tài nghệ | thiện | Ở · nắm quyền | Lấy ân | ART · embroidery | Kim chỉ thành danh | Kim chỉ cướp danh |
|  | ge4 | **Về làng theo chàng** | 3 Tình yêu | giữa | Theo người | Buông | FOLLOW · village lad | Về làng theo chàng | Bỏ bạn theo chàng |
| `cnv_mat` Ánh mắt nơi hành lang | ge1 | **Chiếc ô chiều mưa** | 3 Tình yêu | thiện | Ở · giữ phận | Buông | TK · umbrella | Chiếc ô chiều mưa | Chiếc ô giăng bẫy |
|  | ge2 | **Tỳ nữ lên phượng** | 1 Quyền lực | ác | Ở · nắm quyền | Lấy uy | HH · favour | Tỳ nữ mẫu nghi | Tỳ nữ lên phượng |
|  | ge3 | **Gác ô ra đi** | 8 Tự do | thiện | Rời cung | Lấy ân | FREE · self | Gác ô ra đi | Bẻ ô ra đi |
|  | ge4 | **Tỷ muội cùng hầu** | 4 Tình bạn | thiện | Ở · giữ phận | Lấy ân | SIS · shared favour | Tỷ muội cùng hầu | Mượn chị lên cao |
| `cnv_ma` Ma ma dạy việc | ge1 | **Tổng quản lục cung** | 9 Tài nghệ | giữa | Ở · nắm quyền | Lấy ân | OFFICE · palace | Tổng quản lục cung | Tổng quản hà khắc |
|  | ge2 | **Tay nắm Nội vụ** | 2 Chính trị | ác | Ở · nắm quyền | Lấy uy | POWER · supplies | Nội vụ thanh liêm | Tay nắm Nội vụ |
|  | ge3 | **Ma ma về quê** | 8 Tự do | thiện | Rời cung | Buông | FREE · old age | Ma ma về quê | Ma ma cuỗm bạc |
|  | ge4 | **Phụng Thánh phu nhân** | 6 Con cái | giữa | Ở · giữ phận | Lấy ân | CHILD · wet nurse | Phụng Thánh phu nhân | Nhũ mẫu nhiếp chính |

---
## 4. WORKED SAMPLES (r3, complete: pull → closing choices → condition → last two choices → odds → grand ending in its shading, or its fail outcome → reward → title)
Chuỗi (pull) / Khóa (closes it) use the REAL option names on main (jrd_tt.js, jrd_cnv.js) — chapter in brackets. Every number = BAL.ge keys, set by measurement. All 4 endings are open when the life starts; the Khóa lists are what narrows the funnel. Each ending lists BOTH shading titles (§2.6) — the natural one first — with the other shading's narration in one line; each ending's **fail outcome** is the branch's only "normal" ending (§2.0). Lean tags: options marked (+) thiện / (−) ác are examples of the writer's tag; untagged options are neutral.

### 4.1 `tt_co` · Con gái Tể tướng · Quân cờ trong tay cha
Road arc: her father's letters are orders (.4) → his protégés (.5) → the maid who copies letters (.6) → censors impeach dad (.7) → the Emperor tests her (.8) → her own people (.9) → the night before court (.10) → «Kết ván cờ» (.11). Existing on main: .11 chapter results (Người cầm quân cờ / Cha về quê, nhà yên / Phủ Tể tướng sa sút — no longer endings, §2.0) + 2 kỳ ngộ (Người cầm ấn phủ Tể tướng / Cha truyền sổ môn sinh).
This branch's 8 outcome nodes: ge1 Ngai vàng họ ngoại (thiện «Nữ đế hiền minh» · ác «Ngai vàng họ ngoại») / fail «Ngai đổ họ tan» · ge2 Hiền tướng hậu cung («Hiền tướng hậu cung» · «Gian tướng hậu cung») / «Lời ngay trái tai» · ge3 Buông cờ về núi («Buông cờ về núi» · «Lật bàn bỏ đi») / «Biểu xin về bị bác» · ge4 Đại nghĩa diệt thân («Vì nước khuyên cha» · «Đại nghĩa diệt thân») / «Bất hiếu bất trung».
Lean examples: «Bắt hắn khai ai đứng sau» (.5, −) · «Cho bạc nuôi mẹ nàng, giữ nàng ở lại» (.6, +) · «Lo cho mẹ hắn chữa bệnh» (.9, +) · «Cho thị vệ phục sẵn» (.6, −) · «Giao Thận hình ty xử» (.6, −).

Funnel in this road (all 4 open at .4): .8 «Thiếp đứng bên Hoàng thượng» closes ge1; «Mở xem, báo cha» closes ge2 and ge3; .10 «Hứa giữ cha» closes ge4; .11 «Bỏ bàn cờ» closes ge1 and ge4 — a player usually reaches Hồi kết nhánh with 1–2 still open.

**ge1 · Ngai vàng họ ngoại** — 1 Quyền lực · ác · Ngã rẽ «Ở lại, nắm lấy quyền bính» + «Lấy uy mà trị» · seat NDE · closes the life (epilogue)
- Chuỗi (pull): «Báo cha diệt kẻ hai lòng» (.5) · «Bắt hắn khai ai đứng sau» (.5) · «Tha cho nàng, bắt nàng làm hai mang» (.6) · «Cho thị vệ phục sẵn» (.6) · «Đáp lại sắc bén» (.7) · «Mở xem, báo cha» (.8) · «Tự gây dựng, bắt đầu từ thái giám giữ ấn» (.9) · «Đốt thư cha trước khi vua đến» (.10) · «Bắt kẻ rình» (.10) · «Xin cha giao sổ» (.11) · «Làm người đánh cờ» (.11) · st_the win.
- Khóa (closes it): «Xin Hoàng thượng đừng giao cho thiếp» (.8) · «Bỏ bàn cờ» (.11) · «Thôi viết thư nhà» (.6) · «Quỳ xin Hoàng thượng đừng hỏi» (.7).
- Condition: Tai mắt ≥ `BAL.ge.gate.tt_co_1.mat` and the môn sinh book is hers (.11 win or rare) and seat NDE free.
- Scene: Thái Hòa điện at dawn, she in imperial yellow on the dragon throne, officials kneeling, her father's protégés in front; nobody looks up.
- Event text: «Tiên đế băng hà, Thái tử còn bế ngửa. Môn sinh của phủ Tể tướng quỳ kín điện Thái Hòa, dâng biểu xin ngươi lâm triều. Ngươi không nhường. Từ hôm ấy, chiếu chỉ mang ấn của ngươi; kẻ nào cãi lời, cả nhà ra pháp trường. Thiên hạ khiếp sợ mà phục, sử quan chép tên ngươi bằng mực đỏ.»
- Shadings: natural **ác «Ngai vàng họ ngoại»** (text above) · **thiện «Nữ đế hiền minh»** — «Môn sinh quỳ kín điện Thái Hòa, nhưng chiếu đầu tiên của ngươi là đại xá thiên hạ và giảm thuế ba năm. Người ta quên rằng ngươi là con gái phủ Tể tướng; họ chỉ nhớ một nữ đế biết thương dân.» (same scene, morning light, officials looking up).
- Reward: epilogue + `BAL.ge.pt` + Kim sách engraved with the shading title; title = the shading. Info (ác): «Đạt được khi lên ngôi nữ đế nhờ thế lực phủ Tể tướng, lấy uy mà trị thiên hạ.» / (thiện): «… lấy nhân mà trị thiên hạ.»
- Fail outcome «Ngai đổ họ tan» (fail-only once the môn sinh book is lost or seat NDE is taken): the protégés turn on her, the clan is purged, she is shut in her palace; loss `BAL.ge.fail.tt_co_1` (rank −, Danh −, father lost).

**ge2 · Hiền tướng hậu cung** — 2 Chính trị · thiện · «Ở lại, giữ trọn phận mình» + «Lấy ân mà đối đãi» · continues the life
- Chuỗi (pull): «Trả lễ, bảo hắn tự lập công» (.5) · «Thử tài hắn bằng một việc nhỏ» (.5) · «Không nói, để Hoàng thượng tự chọn» (.5) · «Cho bạc nuôi mẹ nàng, giữ nàng ở lại» (.6) · «Tâu thật, xin xử công bằng cho cha» (.7) · «Thưa thật: thiếp không muốn ngài nghi» (.8) · «Giữ nguyên niêm, trả lại sau ba ngày» (.8) · «Lo cho mẹ hắn chữa bệnh» (.9) · «Tiến cử hắn với Hoàng thượng» (.9) · «Nhắn ông đứng về phía Hoàng thượng» (.10) · «Xin để Hoàng thượng chọn người hiền» (.11).
- Khóa (closes it): «Mở xem, báo cha» (.8) · «Bỏ bạc lo cho hắn thoát» (.5) · «Biếu Ngự sử chút lễ» (.7).
- Condition: Đức ≥ `gate.tt_co_2.duc` and Hoàng thượng → ngươi ≥ `gate.tt_co_2.emp`.
- Scene: Dưỡng Tâm điện by lamplight, the Emperor and she over memorials, a young Hàn lâm kneeling with a scroll.
- Text: «Hoàng thượng đặt tấu chương trước mặt ngươi: “Trẫm muốn nghe nàng nói.” Người ngươi tiến cử năm nào nay giữ Lại bộ, không một đồng bạc lót tay. Cả triều biết trong hậu cung có một người không vì nhà mình mà vì xã tắc.»
- Shadings: natural **thiện «Hiền tướng hậu cung»** · **ác «Gian tướng hậu cung»** — «Hoàng thượng vẫn hỏi ngươi trước khi phê tấu. Nhưng những người ngươi tiến cử đều nợ ngươi một ân; nửa triều đình gửi lễ vào cung ngươi trước khi gửi biểu lên ngự án.» (same lamplit hall, the Hàn lâm's eyes lowered, a gift box at her side).
- Reward (continues): rank +`rw.tt_co_2.rank` (never above the seat rules) · Danh · Hoàng thượng → ngươi · every consort's attitude (thiện cảm + / kính sợ +) · Kim sách; title = the shading.
- Fail outcome «Lời ngay trái tai»: the Emperor hears her advice as meddling; Sủng −, Hoàng thượng → ngươi −.

**ge3 · Buông cờ về núi** — 8 Tự do · thiện · «Rời khỏi cung cấm» + «Buông bỏ tất cả» · closes the life
- Chuỗi (pull): «Thôi viết thư nhà» (.6) · «Đáp cha: con không hỏi được» (.8) · «Xin Hoàng thượng đừng giao cho thiếp» (.8) · «Xin cha tự lui một bước» (.7) · «Khuyên cha lui một bước» (.10) · «Khuyên cha đốt sổ» (.11) · «Bỏ bàn cờ» (.11) · «Đóng cửa cung, chép kinh» (.7).
- Khóa (closes it): «Làm người đánh cờ» (.11) · «Tự gây dựng, bắt đầu từ thái giám giữ ấn» (.9) · «Báo cha diệt kẻ hai lòng» (.5).
- Condition: her father is alive.
- Scene: a mountain villa in autumn, she in plain robes pouring tea for her white-haired father, a chessboard with the pieces swept into the box.
- Text: «Ngươi dâng biểu xin về phụng dưỡng cha già. Hoàng thượng lặng thinh rất lâu, rồi phê một chữ “Chuẩn”. Biệt viện dưới chân núi Tây Sơn không có môn sinh, không có thư từ, chỉ có tiếng cờ gõ mỗi chiều. Cha thua ngươi ván nào cũng cười.»
- Shadings: natural **thiện «Buông cờ về núi»** · **ác «Lật bàn bỏ đi»** — «Trước khi đi, ngươi để lại trên ngự án một hộp thư: tội của từng môn sinh cha từng nuôi. Ngươi ra khỏi cung, sau lưng phủ Tể tướng sụp trong một mùa.» (same villa, but the chessboard overturned, no visitors).
- Reward: epilogue + points + Kim sách; title = the shading.
- Fail outcome «Biểu xin về bị bác» (fail-only if her father died): the request is refused and read as disloyalty; Sủng −, Danh −.

**ge4 · Đại nghĩa diệt thân** — 7 Gia tộc · ác · «Ở lại, giữ trọn phận mình» + «Lấy uy mà trị» · continues the life
- Chuỗi (pull): «Chối thẳng, để luật xử hắn» (.5) · «Giao Thận hình ty xử» (.6) · «Không nhận, để giữ mình» (.7) · «Thiếp đứng bên Hoàng thượng» (.8) · «Đáp: con đi đường con» (.9) · «Đưa thư cha cho Hoàng thượng xem» (.10) · «Chặn trước, nói với Hoàng thượng» (.11).
- Khóa (closes it): «Hứa giữ cha» (.10) · «Xin giữ cha ở lại» (.11) · «Xin Thái hậu nói giúp cha» (.10) · «Nhận, để giữ cha» (.7).
- Condition: Hoàng thượng → ngươi ≥ `gate.tt_co_4.emp` and Tâm cơ ≥ `gate.tt_co_4.tamco`.
- Scene: the Hình bộ hall; she stands beside the Emperor's screen while her father, stripped of his cap, is led away.
- Text: «Chính tay ngươi dâng lên sổ môn sinh và những bức thư cha viết. Phủ Tể tướng bị niêm phong trong một đêm. Hoàng thượng nói với cả triều: “Đại nghĩa diệt thân, trẫm có được mấy người như thế?” Từ đó không ai dám coi ngươi là con gái của ai nữa.»
- Shadings: natural **ác «Đại nghĩa diệt thân»** · **thiện «Vì nước khuyên cha»** — «Ngươi dâng sổ môn sinh, rồi quỳ xin cho cha được về quê thay vì vào ngục. Hoàng thượng chuẩn. Cha không nói với ngươi một lời, nhưng mùa xuân năm sau gửi vào cung một nhành mai.» (same hall, her father without his cap but unchained).
- Reward: Sủng · rank · Danh; family oán + (ác: dad and brother; thiện: brother only) — the dark price; title = the shading.
- Fail outcome «Bất hiếu bất trung»: the court calls it betrayal of her own blood; Danh −, Đức −, the clan's oán stays.

### 4.2 `bd_soi` · Công chúa hòa thân · Bắc Địch · Sói đầu đàn (NEW road, outline for Foreman B)
Cast (story-only, ROAD_MAP §5.4 rows needed): Phụ hãn ({dad}), Khả đôn ({mom}), thúc phụ Hô Diên Liệt (uncle), em trai Ô Lặc (brother), {emp}, {v}.
.4 Sói đầu đàn — Phụ hãn falls from his horse; the uncle's envoy asks the Emperor to recognise him; the Emperor asks her (win/mid/lose; j97 rare «Phụ hãn tỉnh lại»). .5 Hai phong thư — uncle and brother both write; the uncle asks for the border map. .6 Sứ giả mang dao — an assassin in the uncle's embassy. .7 Chợ ngựa đóng cửa — the uncle shuts the horse market; hawks at court want war. .8 Khả đôn vào kinh — her mother flees to the capital; sheltering her risks war. .9 Hội đua ngựa mùa hạ — the succession contest on the steppe; a champion or herself. .10 Đêm tuyết Âm Sơn — Đại Hy troops at the border: send, hold, or bargain. .11 Kim trướng chủ nhân — who sits in the golden tent. .11 chapter results (not endings): Em trai lên ngôi hãn / Thảo nguyên chia đôi / Thúc phụ thắng, mối hòa lung lay; kỳ ngộ: j97 «Phụ hãn tỉnh lại» (.4) + RD97L «Kim trướng gọi ngươi là Khả đôn» (.11).
Lean examples: «take the assassin alive» (.6, +) vs «kill him and send back his head» (.6, −); «shelter the Khả đôn openly» (.8, +) vs «use her as bait» (.8, −).
Funnel example: by .7 a player who pushed the court to war (Chuỗi of ge3) has usually closed ge2 (any war push closes it); sheltering the Khả đôn openly (.8) keeps ge2/ge4 and pulls them.
Grand endings (Chuỗi/Khóa below are the INTENT each chapter's options must carry; the road writer names them):
- **ge1 · Nữ Khả hãn** — 1 Quyền lực · giữa · «Rời khỏi cung cấm» + «Lấy uy mà trị» · seat: none in Đại Hy (NV abroad) · closes the life. Chuỗi: keep the map (.5), take the assassin alive and turn him (.6), refuse the market deal (.7), arm the Khả đôn's guard (.8), ride the contest herself (.9), bargain troops for the tribes' oath (.10). Khóa: hand the map to either side; send the Khả đôn back. Condition: Sức ≥ `gate`, the brother dead or failed (.11 mid/lose). Scene: snow plain, a hundred tribal banners, she in fur and gold before the golden tent, the tribes kneeling. Text: «Không ai trên thảo nguyên từng quỳ trước một nữ nhân. Đêm ấy, mười hai bộ lạc cắm cờ quanh kim trướng và gọi ngươi là Khả hãn. Ngươi gửi về Đại Hy một con tuấn mã trắng kèm một câu: “Biên ải yên ổn chừng nào thiếp còn sống.”» Shadings: natural **thiện «Nữ Khả hãn»** (text above) · **ác «Khả hãn sắt máu»** — the tribes kneel because the uncle's head hangs on the tent pole; she sends Đại Hy the same white horse, and the border fears her. Fail outcome «Kim trướng không nhận»: the tribes refuse a woman; she returns in disgrace, Danh −, Sủng −.
- **ge2 · Lập em làm hãn** — 2 Chính trị · thiện · «Ở lại, giữ trọn phận mình» + «Lấy ân mà đối đãi» · continues. Chuỗi: answer both letters honestly to the Emperor (.5), spare the assassin and send him home with a message (.6), plead for the market to reopen (.7), shelter the Khả đôn openly (.8), send a champion for the brother (.9), ask only for envoys, no troops (.10). Khóa: steal the map; poison the uncle. Condition: Hoàng thượng → ngươi ≥ `gate`, brother alive. Scene: the Emperor's hall, her brother in a wolf-fur cap kneeling to receive the Đại Hy seal while she stands at the Emperor's side. Reward: Danh · Sủng · horse-market silver every year (`rw.bd_soi_2.bac`) · Kim sách. Shadings: natural **thiện «Lập em làm hãn»** · **ác «Dựng hãn bù nhìn»** — the brother wears the cap, but every order to the tribes goes out under her seal; he does not ride without her leave. Fail outcome «Em ngã ngựa» (fail-only if the brother dies): the brother falls; mối hòa lung lay, Danh −.
- **ge3 · Sói già phải chết** — 5 Báo thù · ác · «Ở lại, nắm lấy quyền bính» + «Lấy uy mà trị» · continues. Chuỗi: let the uncle read a false map (.5), kill the assassin and send back his head (.6), push the court to war (.7), use the Khả đôn as bait (.8), bribe the contest judges (.9), ask for the whole army (.10). Khóa: any peace offer to the uncle. Condition: Tai mắt ≥ `gate`, st_the win. Scene: Âm Sơn at night, burning tents, she on the city wall watching the uncle's banner fall. Reward: Danh (feared) · Sủng · every NPC's oán + small · Kim sách. Shadings: natural **ác «Sói già phải chết»** · **thiện «Bắt sói giao triều»** — the uncle is taken alive and judged before both courts; his tribes are spared and join her brother. Fail outcome «Lửa cháy ngược»: the war goes badly and is blamed on her; Sủng −, Danh −, Đại Hy's border loses.
- **ge4 · Con trai hai cõi** — 6 Con cái · giữa · «Ở lại, nắm lấy quyền bính» + «Lấy ân mà đối đãi» · seat TM · closes the life (epilogue: her son reigns over both). Chuỗi: keep the steppe tongue alive for her son (any chapter's "teach the child" option), shelter the Khả đôn (.8), win the contest through her son's name (.9), bargain the brother's oath to her son (.10). Khóa: give the son to another consort to raise. Condition: a living son; seat TM free. Scene: a young emperor in dragon robes with a wolf-fur trim, both courts kneeling. Shadings: natural **thiện «Con trai hai cõi»** · **ác «Con nắm hai cõi»** — her son rules both, and she rules him; envoys of both courts wait at her door, not his. Fail outcome «Hai cõi nghi con» (fail-only if seat TM is taken): both courts distrust her son; his succession weight −.

### 4.3 `cnv_mat` · Cung nữ tuyển vào cung · Ánh mắt nơi hành lang
Road arc: the Emperor's glance in the corridor → the mistress is jealous (.5) → avoid or meet (.6) → Kính sự phòng writes her name (.7) → the first night (.8) → from servant to mistress (.9) → the seduction rumour (.10) → «Ánh mắt ấy» (.11). Existing on main: .11 chapter results (Ánh mắt thành ân tình / Được nhìn mà bị ghét / Ánh mắt khép lại — no longer endings) + 2 kỳ ngộ (Phá lệ phong Quý nhân / Chủ cũ thành tỷ muội).
Lean examples: «Lặng lẽ cho người thấy tay {mis} hất» (.5, −) · «Quỳ nhận lỗi về mình» (.5, +) · «Đưa bạc cho thái giám, trước kỳ lật thẻ» (.7, −) · «Xin ơn cho {mis}» (.11, +) · «Bắt tay {v} chèn {mis}» (.9, −).

Funnel in this road: .7 «Đưa bạc cho thái giám…» closes ge1 and ge3; .9 «Bắt tay {v} chèn {mis}» closes ge1, ge3 and ge4 (leaving ge2 only); .11 «Xin ơn cho {mis}» closes ge2; if {mis} dies, ge4 turns fail-only.

**ge1 · Chiếc ô chiều mưa** — 3 Tình yêu · thiện · «Ở lại, giữ trọn phận mình» + «Buông bỏ tất cả» · summit TK · continues
- Chuỗi (pull): «Hát khẽ bài dân ca bên giếng» (.5) · «Gửi lại cành mai, không đến» (.6) · «Thưa: muốn, nhưng không dám» (.6) · «Không đưa, chờ ngài tự lật» (.7) · «Tin vào lời ngài đã nói» (.7) · «Kể chuyện mùa gặt» (.8) · «Nói một câu thật lòng» (.8) · «Không xin gì, chỉ cúi đầu» (.8) · «Đứng chờ dưới mái hiên cũ» (.11) · «Xin ngài đừng quên chiều mưa ấy» (.11) · «Đứng yên, để ngài bước đến» (.11).
- Khóa (closes it): «Đưa bạc cho thái giám, trước kỳ lật thẻ» (.7) · «Trả bạc cao hơn {v}» (.7) · «Bắt tay {v} chèn {mis}» (.9).
- Condition: Hoàng thượng → ngươi ≥ `gate.cnv_mat_1.emp`.
- Scene: a covered corridor in rain, the Emperor holding an old oil-paper umbrella over her, no attendants.
- Text: «Mưa rơi đúng như chiều năm ấy. Hoàng thượng đứng dưới mái hiên cũ, tay cầm chiếc ô ngươi gửi trả, nói khẽ: “Cả lục cung xin trẫm đủ thứ. Chỉ có nàng chưa từng xin gì.” Từ đó, mỗi lần mưa, ngài đều đến cung ngươi.»
- Shadings: natural **thiện «Chiếc ô chiều mưa»** · **ác «Chiếc ô giăng bẫy»** — «Ngài vẫn đến mỗi lần mưa. Ngài không biết những chiều mưa ấy đều do ngươi sắp đặt, và những người từng đứng gần ngài dưới mái hiên đều đã rời cung.» (same corridor, a rival's figure leaving in the background).
- Reward: Sủng to near its cap · Hoàng thượng → ngươi · rank + · Kim sách; title = the shading.
- Fail outcome «Ô gãy giữa mưa»: the Emperor does not come; the palace laughs; Sủng −, Danh −.

**ge2 · Tỳ nữ lên phượng** — 1 Quyền lực · ác · «Ở lại, nắm lấy quyền bính» + «Lấy uy mà trị» · seat HH · continues as Hoàng hậu
- Chuỗi (pull): «Lặng lẽ cho người thấy tay {mis} hất» (.5) · «Kể lại một chuyện cũ của {mis}» (.5) · «Nhận lời {v}» (.5) · «Đưa {v} tin vặt, giữ lại tin thật» (.5) · «Đưa bạc cho thái giám, trước kỳ lật thẻ» (.7) · «Trả bạc cao hơn {v}» (.7) · «Đổi chỗ với {mis} mà không nói» (.9) · «Bắt tay {v} chèn {mis}» (.9) · «Đem chuyện gói bùa ra nói lại» (.11) · «Bước đến che ô cho ngài» (.11).
- Khóa (closes it): «Quỳ nhận lỗi về mình» (.5) · «Xin ơn cho {mis}» (.11) · «Quỳ lạy {mis} một lạy» (.11) · «Thôi ngóng, sống ngày của mình» (.11).
- Condition: Sủng ≥ `gate.cnv_mat_2.sung`, Tâm cơ ≥ `gate.cnv_mat_2.tamco`, seat HH free (the lập hậu rules j8/j34 are what crown her).
- Scene: the investiture: phoenix crown, kneeling consorts, her former mistress among them, eyes down.
- Text: «Ngày đội mũ phượng, người quỳ ở hàng đầu lục cung là chủ cũ của ngươi. Ngươi không bảo nàng đứng dậy. Cung nhân truyền tai nhau: từ giếng nước lên ngôi Trung cung chỉ cần một đời, và đừng bao giờ đứng chắn đường nàng.»
- Shadings: natural **ác «Tỳ nữ lên phượng»** · **thiện «Tỳ nữ mẫu nghi»** — «Ngày đội mũ phượng, ngươi bước xuống đỡ chủ cũ đứng dậy trước cả lục cung. Kẻ hầu kháo nhau: Trung cung từng xách nước như chúng ta, và chưa bao giờ quên.» (same investiture, the mistress raised by her hand).
- Reward: Hoàng hậu seat (existing rules) · Danh · consorts' attitude (ác: oán +; thiện: thiện cảm +) · Kim sách; title = the shading.
- Fail outcome «Ngã từ bậc phượng» (fail-only once seat HH is taken): her schemes are exposed; rank −, Danh −, {mis}'s oán.

**ge3 · Gác ô ra đi** — 8 Tự do · thiện · «Rời khỏi cung cấm» + «Lấy ân mà đối đãi» · closes the life
- Chuỗi (pull): «Gửi lại cành mai, không đến» (.6) · «Cảm ơn mà từ chối» (.6) · «Xin rút thẻ một kỳ» (.7) · «Cáo ốm ở lại» (.6) · «Thôi ngóng, sống ngày của mình» (.11) · «Gửi lại ô, kèm một lời» (.11) · «Cúi đầu, lui vào trong» (.11) · «Xin ơn cho {mis}» (.11).
- Khóa (closes it): «Bước đến che ô cho ngài» (.11) · «Bắt tay {v} chèn {mis}» (.9).
- Condition: Đức ≥ `gate.cnv_mat_3.duc`, lòng cung nữ ≥ `gate.cnv_mat_3.maid`.
- Scene: the Thần Vũ gate at morning, she in plain clothes with a small bundle and the umbrella, her maids waving.
- Text: «Ngươi xin Hoàng thượng cho mình và mấy cung nữ theo hầu được xuất cung. Ngài trả lại chiếc ô: “Mang theo, đừng để ướt.” Ngoài cổng Thần Vũ, kinh thành đang họp chợ sớm. Mấy năm sau, tiệm thêu nhỏ bên sông của ngươi nổi tiếng khắp kinh thành, và chẳng ai biết bà chủ từng được Hoàng thượng che ô.»
- Shadings: natural **thiện «Gác ô ra đi»** · **ác «Bẻ ô ra đi»** — she leaves with the Emperor's gifts and every secret of the palace she ever carried; the shop by the river is paid for in silence money. (same gate, she does not look back).
- Reward: epilogue + points + Kim sách; title = the shading.
- Fail outcome «Cổng Thần Vũ đóng»: the request is refused; she stays, marked as wanting to leave; Sủng −.

**ge4 · Tỷ muội cùng hầu** — 4 Tình bạn · thiện · «Ở lại, giữ trọn phận mình» + «Lấy ân mà đối đãi» · continues
- Chuỗi (pull): «Thưa thật với chủ: nô tỳ không dám quên ơn» (.5) · «Khuyên Hoàng thượng đến cung {mis}» (.5) · «Từ chối, báo {mis}» (.5) · «Báo cho {mis} biết {v} đang dụ ngươi» (.6) · «Quỳ tạ, rồi tạ {mis}» (.7) · «Ra chào {mis} trước khi đi» (.8) · «Xin ngài nhớ đến {mis}» (.8) · «Xin ngồi sau {mis}» (.9) · «Đến xin {mis} nói giúp» (.10) · «Thưa: là tỷ muội» (.11) · «Xin ơn cho {mis}» (.11).
- Khóa (closes it): «Bắt tay {v} chèn {mis}» (.9) · «Kể lại một chuyện cũ của {mis}» (.5) · «Lặng lẽ cho người thấy tay {mis} hất» (.5).
- Condition: {mis} alive and {mis} → ngươi ≥ `gate.cnv_mat_4.mis`.
- Scene: two consorts side by side on one long bench, sharing a single embroidery frame, the Emperor looking on.
- Text: «Lục cung chờ xem chủ tớ năm xưa trở mặt. Nhưng mỗi buổi thỉnh an, hai người vẫn đi cùng nhau. Hoàng thượng phong cho cả hai một bậc trong cùng một đạo chỉ, và ban chung một tấm biển: “Đồng tâm”.»
- Shadings: natural **thiện «Tỷ muội cùng hầu»** · **ác «Mượn chị lên cao»** — the plaque says «Đồng tâm», but {mis} knows whose name opens the Emperor's door now; she smiles at every thỉnh an and owes her everything. (same bench, {mis} sewing, she watching the Emperor).
- Reward: rank + for her AND for {mis} (real NPC) · their mutual thiện cảm + (ác: {mis} → ngươi stays, {mis}'s fear +) · Kim sách; title = the shading.
- Fail outcome «Một người lên, một người xuống» (fail-only if {mis} died or was demoted): only one of them rises and the other resents it; {mis} → ngươi −.


---
## 5. Player-visible strings (VANPHONG; final wording by the writers)
Hồi title «Hồi kết nhánh» · Ngã rẽ texts (§2.4) · quiet miss «Cuộc đời ngươi vẫn tiếp tục như thế.» · event header «Đại kết cục · <danh hiệu>» · button «Tạ ơn» · news «Thiên hạ truyền tai: <tên người> đã thành “<danh hiệu>”.» · Bảng tab «Thiên mệnh» · fail header «Kết cục · <tên thua>» · Sổ luân hồi page «Sơ đồ nhánh», states «Còn mở» / «Chỉ còn đường thua» / «Đã khép · chương <n>», «?» nodes «Chưa ai biết ngả này dẫn tới đâu.», counts «Đại kết cục n/4 · Danh hiệu n/8 · Kỳ ngộ n/2», «Danh hiệu Thiên mệnh: n/320», «Ngươi từng đạt: kiếp <n>» · Sổ luân hồi life line «Đại kết cục: <danh hiệu>» or «Kết cục: <tên thua>» · title info «Đạt được khi …». The .11 result label stops saying «Kết cục» (§2.0). No %, no numbers in prose beyond the kit's rules.

## 6. Art needs (for Foreman C LATER — nothing ordered now)
- **160 scene paintings**, one per grand ending, each in **2 shadings** (thiện: warm light, people at ease; ác: cold light, people afraid / kneeling) = 320 pictures but 160 compositions — the ác shading is an edit of the same painting (Magnific, same anchors), not a new scene. Pilot first: the 12 endings of §4 (24 pictures).
- Fail outcomes: **no new art** — the fail notice reuses the road's .11 chapter picture.
- 1 "Thiên mệnh" title plate above tier 8 in 2 tones (KIT REQUEST via the kit keeper).
- 1 item icon «Kim sách Thiên mệnh» (one picture; engraved text varies).
- Branch chart: kit part only (kitBranchMap, KIT REQUEST); her face chip from the existing kit; no paintings.
- bd roads: the usual chapter/rare art of 4 new roads (if D2 = a).
- Leaderboard reuses j90 podium figures — no new art.

## 7. Build order (after the freeze lifts; owner "take time")
1. **Kit first**: kitBranchMap + the 2-tone "Thiên mệnh" plate by the kit keeper (KIT REQUEST), registered in KIT.md + kit page.
2. **Engine + 3 pilot branches** (tt_co, cnv_mat, + one nc road): funnel state, pull, closing choices, conditions, lean (option tags + ΔĐức + Ngã rẽ 2), Hồi kết nhánh + odds + shading + fail outcomes (+ quiet form), event, reward, Kim sách, jdh "Thiên mệnh" group, `ctm-ge` / `ctm-gech`, Sơ đồ nhánh page, Bảng tab, the .11 label change, variety-guard test in dev/test. Measure unlock rates (`BAL.ge.target`) and the shading split (`BAL.ge.var.cut` so a player who plays kindly / cruelly for most of a life gets that shading; a mixed player gets the natural one).
3. **Writers, identity by identity**: Chuỗi / Khóa / lean tags / condition / both shading texts / fail outcome for the other 33 existing branches (catalogue §3 fixes names, pairs and both titles; changes go through this doc, canon overwrite).
4. **Bắc Địch 4 roads** (if D2 = a) by Foreman B (28 chapters + 4 arcs + 8 rares), then their 16 grand endings.
5. **NPC parity** with NPC roads (OD:L1243, unit D): NPC draw + jagent crossroads + lean + world news + help/sabotage side quest.
6. Art waves (§6) follow each writer wave.

## 8. DECISIONS
### 8.1 Answered by the owner (17/11 ~15:25Z, L1623 (1)) — folded in, no longer asked
- r2 D1 counts → **4 grand + 2 kỳ ngộ, no separate normal endings** (normal = each grand ending's fail outcome).
- r2 D6 showing the funnel → **branch chart in Sổ luân hồi only** (§2.10), unlocked nodes named, locked «?», her position.
- Variants inside a goal → **option C**: thiện / ác shadings, titles collectable and unlockable (§2.6).

### 8.2 Still open (recommendation first)
- **D2 Bắc Địch**: own 4 roads inside the hòa thân origin (40 branches, her "10 × 4 = 40") — **recommended** · alt: shares nc's roads, own grand-ending set only (her 16/11 rule OD:L1213/L1215). These two pull apart; she should pick.
- **D3 where the last two choices sit**: Hồi kết nhánh right after ch14 — **recommended** · alt: at the road finale .11.
- **D4 after a grand ending**: stay-endings continue the life with the reward; leave / throne / foreign-crown endings close it with an epilogue — **recommended** · alt A: every grand ending closes the life · alt B: every one continues.
- **D5 carried title**: only the previous life's grand title, cosmetic (all others stay in the Sổ luân hồi collection) — **recommended** · alts: any title ever unlocked is wearable; or one modest jdh bonus while worn.
- **D7 odds on the last two choices**: hidden — **recommended** · alt: show the ladder word on the pair that points to an open ending.
- **D8 (new, small) the quiet miss**: a pair that points at no ending lands on the fail outcome of her strongest-pulled ending with NO loss and «Cuộc đời ngươi vẫn tiếp tục như thế.» — **recommended** (keeps her L1613 "tiếp tục kiếp này như vậy thôi" and L1623 "missing = its fail" together) · alt: the same fail outcome WITH its loss.
