# HIST-TUYENTU — Consort selection (选秀 / tuyển tú) for the cinematic scene (OD 23/11 ~21:50Z)
PRIORITY #1 CHECK: OD 10 | ledger 1 | claims 0 | main 15 (j2.js:28 "Nhập cung"; j27.js:49 tuyenTu(); jkc2.js:500-530 kc2Sel*; jentry.js:19-37 entScore) | review/* 0.
Report only, no code. Sources: web search (Qing palace-museum / academic abstracts, popular sites) + own knowledge. **[V]** = seen in a source this session, **[K]** = from memory of Qing Veritable/Palace records, secondary literature (毛立平 «壸政»), **[D]** = drama invention. Confidence is lower than HIST1/2: the web gave the skeleton only; detailed protocols are thin, so anything not marked [V] should be treated as plausible staging, not proof.

## 1. Order of the day (Qing)
- Who: banner girls (八旗秀女, ~13–17, every 3 yrs [V]; Nội vụ phủ bao-yi girls were picked yearly and mostly became cung nữ, not consorts [V]). No banner girl could marry privately before being presented [V-popular]. A girl failing = "撂牌子", home and free to marry [V].
- Arrival: carts at **Thần Vũ môn (神武门)** by banner, families/clansmen escorting, eunuchs call the roll and line them up [V]. Each girl wears banner dress, a blue cotton gown with a **wooden plaque (牌子)** at the right front button naming her family/banner [V NPM Taipei]. Usually 2 banners per day [V].
- Line-up: by banner then by father's rank; groups of **5–6 abreast**, sometimes 3–4 or one at a time for a standout [V]. Presented in a garden hall / pavilion near the Imperial Garden (e.g. 体元殿, 静怡轩) [V]. Girls stand, eyes lowered, do not speak unless asked; eunuch/ma ma announces banner + father's name + post.
- Seats [K]: Emperor on the throne seat; Empress Dowager beside him (or alone when the pick is for a prince/for the palace); Empress seated lower or beside the dowager. «Giá đáo» is staged order of entry, each on a call from the chief eunuch (总管太监): lowest-ranking enters first, Emperor last or Dowager last (dramas put the Emperor last for drama; real protocol: senior arrives last, [D/K]).
- Decision: the plaque. Emperor/Dowager's interest shown by a nod or by eunuch **removing/leaving the plaque**: "留牌子" (keep) = recorded 记名; "上记名" if the emperor himself picked [V]. Rejected = "撂牌子" (plaque dropped/ returned) [V]. Kept girls are re-viewed (复看) and finally stay in the palace overnight (留宫住宿) for observation [V].
- **赐花 (ban hoa)**: NOT found in any source; I believe it is a drama/novel flourish (flowers given to the chosen). Treat as optional, label "phỏng theo phim".

## 2. Who asks what (reality vs. drama)
Reality [K]: very short. Banner, father, age, name, sometimes how many siblings; the royals mostly *looked* (dáng đi, dung mạo, giọng, tay chân, khí độ), and Dowager decided on "phúc tướng". Written tests did not exist. Long Q&A scenes are **[D]**: Chân Hoàn (Hoàng thượng asks about her name «Chân Hoàn» / reading), Như Ý Truyện and Diên Hi (a girl called out for sharp or insolent line, Dowager testing nerve). The game owner wants dialogue, so stage the drama form, labelled as such.
Tone: Emperor curious, brief; Dowager grave, tests virtue and fertility-look; Empress measured, measures a rival (tests whether you threaten her); eunuch cold announcer.

## 3. Outcome and rank on entry
- Real Qing: noble/high banner fathers → 嫔 or 贵人 straight [K]; typical new girl → 贵人 / 常在 / 答应 [K]; low ones 答应; 官女子 (unranked) = not yet named [V]. Rank was the Emperor's/Dowager's gift; a strong showing could get a rank above family expectation (dramas: Ngụy Anh Lạc 答应 → Dowager lifts to 贵人 [V-popular, D]).
- 答应 / 常在 are still "servant line", 贵人 and above are "chủ tử" [V-popular]. Perfect to explain why the game's tier-0/ceiling matters.
- Ming difference [K]: 选淑女 picks commoner/low-official daughters, many (hundreds), strict body inspection (dáng, giọng, chân tay), an overnight "留宫" under 尚宫 women, a second view by Emperor/Hoàng thái hậu; ranks given 淑女 → 才人/选侍 → 嫔; the rank ladder is longer and the picked girls were NOT bannerwomen. For Qing-themed game keep to Qing.

## 4. Royal tests = MINI-GAMES (REVISED per MAIN 112 / OD 23/11 ~21:55Z; no dialogue choices, no word games)
Each royal in turn sets ONE existing mini-game (ids from j82.js KG82_KIND / dev/MINIGAMES.md); the 2–3 spoken lines frame it. Nothing new is invented. Result `raw` 0–10 → entScore as today (one core). Lines are draft cổ trang for VANPHONG pass (no %, no modern words).
| Royal | Plausible test (history / drama) | Best existing mini-game | Lines before | Lines after (good / poor) |
|---|---|---|---|---|
| Hoàng thượng | Music, poem, calligraphy, brush (Qianlong-style taste; Chân Hoàn: the Emperor hears her sing/play) | Đàn `dan` (Tấu khúc) — alt: Vẽ `ve`, Hát `hat`. Thư pháp `tho` only if allowed (see note) | "Ngẩng đầu lên. Trẫm nghe nói nhà ngươi có tài, tấu một khúc cho trẫm nghe." | Good: "Khá lắm, giữ thẻ lại." Poor: "Cũng được, chưa đủ tinh." |
| Thái hậu | Embroidery, needlework, manners/posture, virtue (she judges a "phúc tướng" and a good wife for the Emperor) | Thêu `theu` (Nhớ mẫu thêu) — alt: Khéo tay `kim`; Cắm hoa `hoa`; Đi đứng `td_dung` | "Lại gần để ai gia xem. Con thêu một mẫu cho ai gia coi tay nghề." | Good: "Tay khéo, tướng phúc hậu." Poor: "Còn vụng, phải học thêm." |
| Hoàng hậu | Tea service, palace rules/harem order, ledger sense (the Empress tests competence and whether you are a threat) | Điều hương `huong` / Pha trà (kc2 `cn` origin already uses `huong`) — alt: Cắm hoa `hoa`; Bày lễ `lay` / Phân kho `sort` (exam games `le`/`tc`) | "Nghe nói ngươi biết lễ. Pha một chén cho bổn cung xem." | Good: "Biết điều, bổn cung ghi tên." Poor: "Chưa đủ phép tắc." |
| Nội vụ phủ / ma ma (cung nữ origin) | Dáng đi, khéo tay, lễ nghi (already stated in PEND.kc2Sel text) | Khéo tay `kim` (Gỡ rối chỉ) + Thêu `theu` (the existing KC2DART.cnv pair) | "Ma ma xem tay chân, hôm nay là ngày chia việc. Làm cho khéo." | Good: "Chia về hầu cung chính vị." Poor: "Giặt đồ ở Tân Giả khố trước." |
Rules to keep: (a) each royal's pick follows her origin: nc/bd/cn use KC2DART; map as `kc2SelArts()` returns the best 2 non-word arts she knows, the 3 royals take them in the order *her best art* for the royal that matches it, else the next-best — so every royal tests something she can have trained (Law 2: no clearly best order). (b) Law 5: BAL.entry.w ease per rank; the Empress test is the hardest one. (c) Each royal's test adds a *separate raw* into entBase (average or weighted via a BAL key); three tests also stand in place of the old one `kc2SelPlay`. (d) A royal can have a taste (BAL key per royal → the art she prefers) so she may pick one of the two arts offered per royal.
Note / conflict to rule: BAL.entry.word (jbal2.js:661) currently *excludes* `tho, doi, doden, le, tc, xa, thq` from the entry exam (entArts), so Hoàng thượng's calligraphy and Hoàng hậu's Bày lễ are not allowed today; default plan uses `dan / ve / hat` and `theu / kim / hoa` and `huong / hoa`. If MAIN wants calligraphy/Bày lễ back, remove from BAL.entry.word (BAL only, one core) after the owner's OK.
Hoàng hậu is a reaction not only a judge: «ghi tên» (she marks you) can seed a later rivalry thread (Law 6).
Owner symbols: the owner's word "ban hoa" is the scene's own symbol for the one sent home (in sources I found only 撂牌子 = plaque returned, and 赐花 unverified); keep «giữ thẻ bài» / «ban hoa» as game words, say so in VANPHONG.

## 5. Mapping to the existing exam (read jkc2.js:500–530, jentry.js:19–37)
- Today: mini-game raw → entScore(road, raw, art) = entBase(W.base + sac/duc/tai/suc + raw + art lvl + …) + noise ±4 → tier by BAL.entry.cut [37,53]: ≥53 ceiling (origin rank), ≥37 one lower, else two lower; rank = max(0, top − (2 − tier)); a drop also loses `stepSung` favour; cung nữ road uses same tier for placement.
- Cleanest mapping: three kc2Play rounds (one per royal) → three raws → one combined raw (BAL weights per royal) → entScore → same cut. Spoken lines are frame text only, no numbers. Keep **one core**: no number in the scene, only BAL keys; reuse entOdds/entWord for the ladder wording («Khá chắc / Chắc» etc.) when showing a beat's chance.
- Law 5 harder as she climbs: higher origin rank = fewer free beats, sharper Hoàng hậu questions. Law 2/3: every attitude must give some gain (a favour/Thái hậu/NPC bond) and one cost; no always-best option. Law 6: the neighbour in line and the three royals are real NPCs with taste; the "ghi tên" of Hoàng hậu feeds a later rivalry thread.
- Fits existing flow: kc2Sel (PEND.kc2Sel) already shows Hoàng thượng + Thái hậu; add Hoàng hậu + 5-girl line-up as cinematic frames, then reuse `kc2SelDo` result text ("Nhập cung" card).

## 6. Pitfalls
- Anachronism: drama's modern phrases / fast quips; no "zero-sum" lines. "Giá đáo" is real court vocabulary but modern-feeling banter is drama.
- The Emperor rarely held a one-to-one interview with every girl; a long dialogue is staged — mark it "cảnh phỏng theo phim".
- Do NOT show Ming and Qing together (Ming: commoner girls, no banners). Do not give Hán women bannerwoman route.
- "Ban hoa" unverified; "lật thẻ" (翻牌子) is the Emperor's nightly choice, NOT the selection — avoid confusing the two.
- Selection happened at Thần Vũ môn/garden halls, not Thái Hòa điện. Girls did not shout; eunuch announced them. Rank "Đáp ứng/Thường tại/Quý nhân" per game RANKS only.
- Stars of drama (Ngụy Anh Lạc, Chân Hoàn) are fiction; real records name ranks by Nội vụ phủ ("theo thế gia").

## 7. Waiting-yard drama seeds (MAIN 112 ADDENDUM 4; owner OD 23/11 ~22:20Z)
PRIORITY #1 CHECK: OD 23/11 ~22:20Z + brief M112 ADD.4/5 | main: nết pools BAL.net F/M (jbal2.js:923), traits j1.js:45, netOf/netIs jnet.js, j61 npcKnows | review/* none | claims SELSCENE. Tags: [K] = real-history type of event from Qing records / secondary literature (no single quoted case, treat as plausible); [D] = palace drama; wording draft cổ trang for VANPHONG pass (no %, no modern words).
Honesty note: no source gives a named real brawl in the waiting yard. Real records show the *pressures* (banner pride, concealed age/defect, bribes to eunuch/ma ma, poor girls in borrowed clothes); the scenes below turn these into dramatic form.

### 7.0 Shared tables (use for every seed)
Our nết groups (female pool): Tính tình = Ân cần, Lạnh lùng, Nóng nảy, Điềm tĩnh, Nhiều chuyện, Kín đáo, Kiêu ngạo, Khiêm nhường · Lòng dạ = Thật thà, Xảo quyệt, Thanh liêm, Ham lợi, Rộng lượng, Thù dai, Trọng nghĩa, Thực dụng · Chí hướng = Tham vọng, An phận, Ham học, Ham vui, Mê tín, Thực tế, Vì gia tộc, Vì mình.
**Role fit** (pick by nết, not by rank alone): Bully ← Kiêu ngạo / Nóng nảy + (Thù dai, Ham lợi, Xảo quyệt) + (Tham vọng, Vì gia tộc, Vì mình). Victim ← Khiêm nhường / Kín đáo / An phận + (Thật thà, Thanh liêm) or a low-birth girl; a Kiêu ngạo victim makes a "pride clash" variant. Instigator (whispers, steals, bribes) ← Nhiều chuyện / Xảo quyệt / Ham lợi / Thực dụng.
**Bystander by nết** (fixed default; thiện cảm to victim/bully or banner shifts it up one step; rank above bully makes "defend" harder, not impossible):
| Nết | Acts |
|---|---|
| Ân cần, Trọng nghĩa, Rộng lượng, Thanh liêm | defend victim (Thanh liêm: speaks of the rule) |
| Nóng nảy | defend or join, whichever side she likes more |
| Nhiều chuyện | fetch ma ma / spread it (bring the drama to the royals' ears) |
| Điềm tĩnh | mediate softly, or stay silent if bully is above her |
| Kín đáo, An phận, Khiêm nhường | stay silent, eyes down; afterwards a small quiet kindness |
| Kiêu ngạo, Xảo quyệt, Thù dai, Vì mình, Tham vọng | join the bully (stronger if bully's banner/rank is higher) |
| Lạnh lùng | watch, no act; remembers who acted |
Four **player stances** (equal weight, Law 2/3; every cell has a gain and a cost, written once below as G/L and re-used with seed-specific nouns): **Bênh** (defend) = G victim's thiện cảm + "nghĩa" mark / L bully's grudge, risk of being noticed by ma ma as brawler. **Hùa** (join) = G bully's thiện cảm, safe from her / L victim's grudge, loss of face if the royals hear. **Hoà giải** (mediate) = G both lessen, calm name with ma ma / L takes time (the countdown) and neither fully thanks her. **Đứng ngoài** (stay out) = G keeps the clock for chatting with other girls, nobody marks her / L those two both think her cold; the victim may be the girl who would have been a friend. Deltas come from BAL (never typed here). Two-way (Law 1): any of the four can be done *to her* by the same roles; seed the player as victim in some lives.
**Ma ma close**: after the round the ma ma (narrator) speaks 1–2 lines about what she saw, naming no outcome in numbers.

### 7.1–7.12 Seeds
| # | Trigger | Bully / Victim / Others | Notes + ma ma closing line (draft) |
|---|---|---|---|
|1| **Chén trà đổ lên xiêm y** (a eunuch pours water; a girl "slips") [D: Như Ý/Diên Hi household spite; K: borrowed clothes] | Kiêu ngạo+Thù dai bully / Khiêm nhường victim / Nhiều chuyện fetches ma ma | Dress ruined 20 s before the royals; the victim must go on stained. Ma ma: "Xiêm áo có thể thay, lòng người một lần dơ khó rửa." |
|2| **Cây trâm bị mất** (a hairpin the victim borrowed from her mother) [D: Chân Hoàn-type theft] | Ham lợi+Xảo quyệt / Thật thà / Điềm tĩnh | Trâm found in the bully's sleeve if someone checks (Law 6c: the pin exists, it was taken; traceable). Ma ma: "Của đã mất, tìm được hay không, trời cho nhìn rõ ai." |
|3| **Chê xuất thân thấp** (a Bao-y / minor-official girl mocked by a great-banner girl) [K: banner/Bao-y class divide; D: An Lăng Dung] | Kiêu ngạo+Vì gia tộc / low-birth victim (Khiêm nhường / Vì mình) / Trọng nghĩa defends | Strongest seed for "known by face, name by nết". Ma ma: "Thứ bậc do cha mẹ cho, đức hạnh là ta tự lập." |
|4| **Tát tai** (a slap over a thin voice / a sharp tongue) [D per MAIN: Hạ Đông Xuân slaps An Lăng Dung, Chân Hoàn truyện] | Nóng nảy+Kiêu ngạo bully / Kín đáo victim / Nhiều chuyện, Lạnh lùng | Violence in the yard is a rule break: ma ma may mark both girls. Ma ma: "Chốn này không cho động tay; ai đánh, ai nhịn, ta đều nhớ." |
|5| **Hối lộ thái giám** (a girl pays the eunuch to be put in front of the Emperor's sight / to hide her age) [K: eunuch and ma ma bribery reported; also false-age concealment] | Ham lợi+Tham vọng / honest Thanh liêm or Thật thà witness / Nhiều chuyện | Player can *see* the bribe (real object, Law 6c). Ma ma: "Bạc mua được chỗ đứng, không mua được cái nhìn của bề trên." |
|6| **Giấu tuổi / giấu tật** (a girl hides a limp, scar or age; another sees) [K: ill/disabled girls were excused only through certification; concealment is an offence] | Xảo quyệt, Vì gia tộc (the concealer) / Thanh liêm witness / any | No one is "bully", the dilemma is report vs shield. Ma ma: "Khuyết điểm có thể giấu một buổi, giấu không nổi một đời." |
|7| **Tranh chỗ đứng** (who stands in front, first-row; banner order) [K: banner/father's rank ordering] | Kiêu ngạo+Tham vọng / Điềm tĩnh victim / Nhiều chuyện | Social, not violent: lets Điềm tĩnh/mediate shine. Ma ma: "Đứng trước hay sau, bề trên đều thấy cả." |
|8| **Cố ý làm xấu để khỏi vào cung** (a girl smears her face / blackens teeth so she is "撂牌子") [K/D: folk anecdote of girls avoiding the palace] | Reluctant girl (Vì mình / An phận, Ham vui) / Vì gia tộc sister forces her / bystanders | Player may help her escape or shame her. Ma ma: "Muốn đi hay muốn ở là tâm người; mặt chỉ là cái cớ." |
|9| **Khoe của, khoe thơ** (a girl boasts her jewelry/family; another is humiliated by comparison) [D: Diên Hi, Chân Hoàn] | Kiêu ngạo+Ham vui / Khiêm nhường / Thực tế (cool onlooker) | Light, funny variant for low-conflict lives. Ma ma: "Vàng ngọc trên người, chẳng bằng nét mặt khi gặp việc." |
|10| **Nói xấu sau lưng** (a whisper that a girl's father was dismissed / mother is a concubine) [K: pre-selection scandal; D: Như Ý] | Nhiều chuyện+Thù dai (instigator) / Kín đáo victim / Ân cần comforts | Rumour is evidence-less (Law 6a: she can be framed). Ma ma: "Lời đồn gió thổi, ai tin ai nghe đều tự chịu." |
|11| **Xô vào nhau, ngã** (crowding on the steps; a girl is pushed, her gown tears) [D: Diên Hi action scene] | Nóng nảy pusher (maybe accidental) / Thật thà victim / Rộng lượng helps | Ambiguous intent: stance of *Hoà giải* has bite. Ma ma: "Vô ý cũng là lỗi, cố ý lại là tội." |
|12| **Thù cũ giữa hai kỳ** (two clans' girls with a family feud; one insults the other's banner) [K: banner rivalries; D: Như Ý/Diên Hi family politics] | Vì gia tộc+Thù dai on both sides / Điềm tĩnh mediator / others side by banner | Both are bully and victim; player's banner decides who counts as "her side". Ma ma: "Thù nhà không nên mang vào chỗ này." |
Seed generator rule: pick the seed by the life seed; then fill roles from real tú nữ of this life by nết + thiện cảm (Role fit, 7.0); if no girl fits well, a seed with a lower fit bar is picked (e.g. 9, 7, 11) instead of forcing a bully. Seeds 1, 3, 4, 10 have *her* as the victim in some lives (two-way).
Pitfalls: no one dies or is permanently hurt in the yard; slaps and torn dresses only (palace discipline). Girls speak low; eunuchs and ma ma stand near, so a loud brawl would be stopped fast. Avoid Han-Chinese footbinding references (Manchu banner girls did not bind). Avoid naming real historical persons as bully/victim.

## 8. Three test types: mini-game / ĐỐI ĐÁP / HÀNH XỬ (MAIN 112 ADDENDUM 8; owner OD 23/11 ~22:36Z)
PRIORITY #1 CHECK: OD 23/11 ~21:55Z (royals' tests = mini-games) + ~22:36Z (3 types) | brief M112 ADD.8 | main: ETRAITS j1.js:58 (Emperor: Đa nghi, Mê sắc, Trọng tài, Hiếu thảo, Nóng nảy, Nhân từ, Chăm chính sự, Đa tình, Lạnh lùng), TH_ARCH jtrong.js:32 (Thái hậu: Từ ái, Nghiêm khắc, Đa nghi, Quyền uy, Sùng Phật), BAL.net F pool for Hoàng hậu | review/* none | claims SELSCENE.
Tags [K]/[D] as in §7. Historical honesty: *no* source records a questionnaire or an incident staged for a girl in the selection hall; these are drama devices ([D]) built on [K] values the Qing court really judged: lễ nghi, đức hạnh, phúc tướng, khiêm cung, biết giữ mình. Wording draft cổ trang for VANPHONG.
**Four WAYS to answer/act (same labels in both pools):** **Khiêm** (humble, deferential), **Mạnh** (bold, with spirit), **Dí dỏm** (witty, light), **Thật** (honest, plain). Order in the UI is randomised per draw (Law 2: none is the correct one).
### 8.0 Reaction table by royal nết (+ pleased, − displeased; same table for both pools; ± sizes are BAL keys, never typed here)
| Royal nết | + | − |
|---|---|---|
| Hoàng thượng: Trọng tài | Dí dỏm, Mạnh | Khiêm (flat) |
| Chăm chính sự | Thật, Mạnh (with substance) | Dí dỏm (empty) |
| Mê sắc / Đa tình | Dí dỏm, Mạnh | Khiêm (stiff) |
| Nhân từ / Hiếu thảo | Thật, Khiêm | Mạnh |
| Đa nghi | Thật (consistent) | Dí dỏm (reads as scheming) |
| Lạnh lùng | Khiêm, Thật (composed) | Dí dỏm |
| Nóng nảy | Mạnh | Khiêm (hesitation), and Thật that criticises him |
| Thái hậu: Từ ái | Khiêm, Thật | Mạnh |
| Nghiêm khắc | Khiêm | Dí dỏm, Mạnh |
| Đa nghi | Thật | Dí dỏm, Mạnh |
| Quyền uy | Khiêm (deference), Mạnh only when respectful | Dí dỏm |
| Sùng Phật | Khiêm, Thật (piety, compassion) | Mạnh |
| Hoàng hậu (BAL.net F): Ân cần / Rộng lượng / Thanh liêm / Thật thà | Thật, Khiêm | Dí dỏm at her expense |
| Kiêu ngạo / Tham vọng / Vì mình | Khiêm (you are no rival) | Mạnh, Dí dỏm (a threat) |
| Xảo quyệt / Thù dai | Khiêm (but she "ghi tên" anyway) | Mạnh |
| Điềm tĩnh / Kín đáo | Thật, Khiêm | Mạnh |
Equal-value guard (Law 2/3): every way has a + with some nết and a − with others; across the 7–9 nết of one royal no way is always + or always −; each answer also carries one small **gain** (e.g. "mark of đức", "thiện cảm") and one **cost** (a different royal, or a later rivalry mark). A *nết unknown to her* (royal nết not shown) keeps it a gamble: the player reads cues (how the royal sits, tone) — odds shown as ladder words only.
### 8.1 ĐỐI ĐÁP pool (the royal asks; she chooses HOW to answer; no trivia)
| # | Royal prompt (draft) | Khiêm | Mạnh | Dí dỏm | Thật | Tag |
|1| «Vì sao ngươi vào cung?» | Hầu hạ bề trên, cầu phận nhỏ | Vì muốn làm nên việc | Vì cha mẹ bảo, còn ta tự chọn ở lại | Vì nhà đã lo, ta chưa nghĩ kỹ | [D] Chân Hoàn |
|2| «Nếu người trên coi nhẹ, ngươi làm sao?» | Nhận lỗi, sửa mình | Chứng tỏ bằng việc làm | Nhận một lần, sau không thấy lần hai | Buồn, nhưng không oán | [D] |
|3| «Hoa nở sớm hay hoa nở muộn tốt hơn?» | Hoa nào cũng nhờ nắng | Nở sớm để thấy cuộc đời | Nở đúng lúc người ngắm | Muộn mới biết quý | [D] |
|4| «Ngươi có mong được sủng ái không?» | Chỉ mong giữ phận | Mong, và sẽ xứng | Ai chẳng mong; khéo giữ mới lâu | Có, nhưng không dám mong nhiều | [D] |
|5| «Thấy người tranh sủng, ngươi nghĩ gì?» | Tránh xa | Không sợ tranh | Xem họ tranh, mình làm việc mình | Hiểu, nhưng không thích | [D] |
|6| «Nhà ngươi dặn điều gì khi vào cung?» | Giữ lễ, nhẫn nhịn | Giữ tâm cao, đừng khom | Nhớ ăn ít, nói ít | Dặn phải nghe lời ma ma | [K] family teaching |
|7| Tiếp thơ: «Hoa rơi ai quét…» (continue a line by *stance*, not by the right word) | Quét giúp, không để người thấy | Để hoa rơi, đó cũng là ý trời | Quét xong, hoa tặng người thương | Người quét là kẻ cô đơn | [D]; stance, not quote |
|8| «Thấy ai làm sai, ngươi nói hay im?» | Im, báo bề trên | Nói thẳng | Nhắc nhẹ một câu | Tùy việc | [K] value: biết giữ mình |
|9| «Nếu hôm nay không được giữ thẻ, ngươi làm sao?» | Về nhà, hầu cha mẹ | Thử lại, ba năm nữa | Về, rồi sẽ có hoa khác | Buồn, rồi cũng đi | [D] |
|10| «Điều ngươi sợ nhất?» | Sợ làm phiền người | Không sợ gì | Sợ nhất là chán | Sợ cô độc | [D] |
|11| «Ngươi muốn bề trên nhớ ngươi vì điều gì?» | Vì lễ độ | Vì có chí | Vì làm người ta cười | Vì thật thà | [D] |
|12| «Có lời đồn nói ngươi kiêu, thật chăng?» | Xin nhận lỗi nếu có | Ai nói, dám đối chất | Kiêu ở đâu, xin chỉ giúp | Có lúc, ta biết | [D]; rival's earlier words can reappear (Law 6) |
Hard-by-rank (Law 5): at a higher origin ceiling the royal may follow with a *second* prompt (pressure), or hides her nết cues.
### 8.2 HÀNH XỬ pool (a surprise incident; options = what she does; gain **and** loss each, Law 2/3)
Options are 4 kinds: **Giữ yên** (stay composed) · **Tự xử** (act at once by herself) · **Cầu người** (ask a ma ma / eunuch / neighbour) · **Nhận lỗi / Nói thật** (own it / name the cause). Each carries a gain and a cost (examples below; numbers to BAL).
| # | Incident (draft) | Giữ yên | Tự xử | Cầu người | Nhận / Nói thật | Likes (+) | Tag |
|1| Mèo bị ném tới chân (cat flung at her feet) | G dáng điềm tĩnh · L bị coi lạnh nhạt | G nhanh nhẹn, bế mèo đưa ra · L lộ dáng không đoan | G nhờ ma ma, giữ lễ · L bị coi yếu | G nói thật mèo sợ, ai vứt · L làm người ném thù | Đa nghi/Quyền uy: Giữ yên; Nhân từ/Từ ái: Tự xử bế mèo; Nóng nảy: Tự xử | [D] Như Ý truyện / Diên Hi (cat gag) |
|2| Nước trà đổ lên xiêm y | G không loạn, giữ thể diện · L áo ướt vẫn đứng | G tự lau nhanh · L trễ, làm ồn | G xin ma ma thay áo · L chậm khắc | G nói "là con vô ý" · L nhận lỗi không phải của mình | Nghiêm khắc/Quyền uy: Giữ yên; Ân cần: Cầu người | [D] |
|3| Một tú nữ cố ý ngáng chân | G không đáp, bước đi · L bị chê vấp | G đỡ lấy và đứng dậy nhẹ nhàng · L lộ vết bẩn | G ma ma thấy liền · L bị coi mách | G nói rõ ai ngáng · L không bằng chứng (Law 6a) | Thanh liêm / Thật: Nói thật nếu có bằng chứng; Thù dai (Hoàng hậu) − | [D] Chân Hoàn |
|4| Trâm cài đầu rơi | G bước tiếp, nhặt sau · L trâm nằm đó | G cúi nhặt, nói "xin tha lỗi" · L ngắt nhịp | G nhờ người nhặt · L mất mặt | G nói "trâm của mẹ" · L lộ gia cảnh | Từ ái: Tự xử / Nói thật; Quyền uy: Giữ yên | [D] |
|5| Con ong bay tới | G đứng yên · L bị ong đốt | G khẽ phất · L bị coi thất lễ | G gọi thị nữ · L ồn | G nói "sợ ong" · L coi yếu | Điềm tĩnh/Quyền uy: Giữ yên; Nhân từ: Nói thật | [D] |
|6| Đứa trẻ (cháu / hoàng tử nhỏ) chạy vào | G cúi người giữ lễ · L bị coi lạnh | G ôm trẻ, dỗ · L vượt phép | G tìm nhũ mẫu · L chậm | G nói "xin ma ma dắt" · L không tự chủ | Từ ái/Nhân từ: Tự xử dỗ; Nghiêm khắc: Giữ lễ | [D] Chân Hoàn (royal child scene) |
|7| Ai đó hét "có rắn!" | G không động · L bị coi thờ ơ | G đứng chắn · L liều | G gọi thị vệ · L ồn | G nhìn rõ "chỉ là dây" · L không chắc | Chăm chính sự/Đa nghi: Giữ yên + nhìn rõ | [D] |
|8| Giỏ hoa bị rơi vỡ ngay chân | G bước qua · L bị coi vô tâm | G nhặt hoa, xếp lại · L trễ | G gọi thái giám · L chậm | G nói "xin phạt con vô ý" · L chịu phạt oan | Từ ái/Sùng Phật: Tự xử nhặt hoa | [D] |
|9| Tay áo bị người kéo giật | G rút tay, im · L bị coi yếu | G giữ tay áo, nhìn thẳng · L căng | G gọi ma ma · L mách | G nói "xin đừng kéo" · L mất lòng người đó | Quyền uy: Giữ yên; Nóng nảy: Tự xử | [D] |
|10| Chuông / pháo bất ngờ nổ | G không giật mình · L cứng | G cúi che tai, nhanh bình tĩnh · L lộ sợ | G nép sau người · L bị coi nhát | G nói "xin tha, con hơi giật mình" · L coi yếu | Đa nghi / Lạnh lùng: Giữ yên | [K] ceremonial fire-crackers not unusual; [D] |
|11| Ngọc bội của người bên cạnh rơi vỡ, cô ta trách mình | G im, chờ hỏi · L chịu tiếng oan | G chỉ ra chỗ rơi · L làm to chuyện | G gọi ma ma xem · L chậm | G nói thật mình không đụng · L không bằng chứng | Thanh liêm / Thật thà: Nói thật; Đa nghi: Giữ yên | [D] |
|12| Gió thổi bay khăn / quạt của mình | G đứng, nhặt sau · L khăn lấm | G nhặt nhanh · L mất nhịp | G nhờ cung nữ · L chậm | G nói "xin tha lỗi" · L mất khí độ | Nghiêm khắc: Giữ yên; Từ ái: Tự xử | [D] |
Hoàng hậu's nết can *cause* an incident (Thù dai / Xảo quyệt: #3, #11) while Thái hậu / Hoàng thượng only *judge* it — avoids "the Empress is always the villain": it needs a real motive from §7 (rivalry mark).
### 8.3 Which royal-nết fits which test type (per-life draw weights; all in BAL)
| Royal nết | Mini-game (§4) | ĐỐI ĐÁP | HÀNH XỬ |
|---|---|---|---|
| Hoàng thượng: Trọng tài | **high** (tests art) | mid | low |
| Chăm chính sự | low | **high** (asks about duty) | mid |
| Mê sắc / Đa tình | mid (múa / đàn) | **high** (banter) | low |
| Nhân từ / Hiếu thảo | low | **high** | mid |
| Đa nghi | low | mid | **high** (tests composure) |
| Lạnh lùng | mid | low | **high** |
| Nóng nảy | low | mid | **high** (sudden) |
| Thái hậu: Từ ái | mid (thêu) | **high** | mid |
| Nghiêm khắc | mid (thêu / lễ) | mid | **high** (tests lễ) |
| Đa nghi | low | mid | **high** |
| Quyền uy | mid | **high** (deference) | **high** |
| Sùng Phật | mid | **high** | low |
| Hoàng hậu: Ân cần / Rộng lượng / Thanh liêm / Thật thà | **high** (tea / huong) | mid | low |
| Kiêu ngạo / Tham vọng / Vì mình | mid | **high** (rival probe) | mid |
| Xảo quyệt / Thù dai | low | mid | **high** (she stages it) |
| Điềm tĩnh / Kín đáo | **high** | mid | low |
Draw rule: the three royals take three **different** types (a draw without repeats, weighted by the table), the pool item is seeded per life and excludes the last life's items so tests rarely repeat; the cung nữ origin uses the same 3 types with the Nội vụ phủ / ma ma as the third judge. All odds shown to the player in ladder words only (Law 7); the royal's nết is hidden at the start and read from cues (Law 6b: real person).
Pitfalls: no one in a selection hall ever "throws a cat" — a drama gag, so mark scene text "phỏng theo phim" and keep it brief; keep the royals polite (they never insult a candidate); incidents never injure; avoid modern slang in the answers; do not let the Hoàng hậu be the only source of trouble.
