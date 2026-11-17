# DISPLAY SHELF — displayable imperial-gift / décor items (step 1: history / drama expert)

Worker: history/drama expert (sonnet). Brief: dev/handover/briefs/display-shelf-expert.md. Owner rulings: OD:L1670 (A), L1673 (1)-(5).
START_CTX (estimate, get_session not read): ~10 % of window at start; rollover at ~35 %, hard ceiling 60 %. No rollover needed: single-pass file.

PRIORITY #1 CHECK: OD L1670/L1673 are the only "trưng bày" rulings (shelf = new, owner-ordered). Reused from main: dev/ITEMS.md
(tranhco, nghien, dancoc, demgam, huongtram, bienvang, bienngu, vongngoc, tuithom + j83 handmade `tp` kinds: Bức tranh, Bình hoa,
Bức thư pháp, Quyển kinh, Thế cờ tàn, Khăn thêu, Túi hương), dev/ITEMS_EARNED.md (earn-or-receive rule: nothing falls from the sky;
sources = tự làm / mua / nhận), jbal2.js:121 + KIT.md "LUXURY axis" (item xa xỉ = [8,16,28,44,64][grade] + giá/10; allowance =
36 + 16 × rank index (+10 if Sủng ≥ 60); rank index 0 Đáp ứng · 1 Thường tại · 2 Quý nhân · 3 Tần · 4 Phi · 5 Quý phi ·
6 Hoàng quý phi · 7 Hoàng hậu), jpet.js care model (petCareW: Khỏe / Cần chăm / Biếng ăn). Nothing for a shelf exists on main or review/*.

Conventions
- Name = Vietnamese (cổ trang). `[ex:key]` = an item that already exists in ITEMS.md (reuse name/value). `[new]` = new item.
- Rank = lowest rank that may display it without being "vượt phận". Rank words: ĐƯ Đáp ứng · TT Thường tại · QN Quý nhân · Tần · Phi · QP Quý phi · HQP Hoàng quý phi · HH Hoàng hậu · "—" = imperial (Hoàng thượng / Thái hậu only; a consort showing it = đại bất kính).
- Xa xỉ band: L low (≈8–24) · M mid (≈25–44) · H high (≈45–74) · I imperial-only (≥75). The number is a proposal on the existing formula (grade + giá/10); the rules worker may retune.
- Source: NB ngự ban (Hoàng thượng) · TH Thái hậu · HH Hoàng hậu · PT gift from a consort · MUA buy (hàng rong / Nội vụ phủ / lén ngoài cung) · EV event reward (sinh thần, Vạn thọ, tấn phong, thi tài, Mệnh truyện) · TT tự tay (j83 handmade) · NVP Nội vụ phủ issue on promotion.
- Care: plants = tưới (water, per tuần), nắng (sun placement), héo = weeks of neglect until it withers (a withered plant stays on the shelf as "héo", xa xỉ → 0 and a small "bỏ bê" cue; replace = buy / ask). Everything else = none unless noted.
- Note confidence: [S] well-attested in the history / the drama; [~] period practice, plausible, wording approximate; [?] drama detail from memory, check before quoting to the player.

## Group slots (ONE item per group is shown at a time) — 12 groups, 70 items

| # | Group (shelf slot) | Vietnamese | Items |
|---|---|---|---|
| 1 | Plants & flowers | Hoa cảnh | 8 |
| 2 | Porcelain | Đồ sứ | 7 |
| 3 | Jade & curios | Ngọc ngoạn | 7 |
| 4 | Scrolls, paintings, calligraphy | Thư họa | 7 |
| 5 | Incense & burners | Hương lô | 6 |
| 6 | Wind chimes & bells | Chuông gió | 5 |
| 7 | Table screens & curtains | Bình phong, rèm | 6 |
| 8 | Clocks & western tribute curios | Đồ Tây dương | 5 |
| 9 | Fans | Quạt | 5 |
| 10 | Birds & small creatures | Chim cá | 4 |
| 11 | Music on a stand | Nhạc khí | 5 |
| 12 | Scholar's table & lamps | Văn phòng, đèn | 5 |

(Open question for the rules worker: "Chim cá" overlaps the existing pet system jpet. Recommendation: pets stay in jpet; the shelf gets only a caged songbird / fish bowl as décor with a light care need, so the two do not double-count xa xỉ.)

## 1. Hoa cảnh — potted plants & flowers (care: tưới 1×/tuần, héo after the stated weeks)

| Item | Rank | Xa xỉ | Source | Care | History / drama note |
|---|---|---|---|---|---|
| Chậu lan (Quân tử lan) [new] | ĐƯ | L ~14 | MUA, PT, NB | tưới 1×/tuần, shade; héo 3 tuần | Lan = "quân tử", the gentlewoman's flower [S]. The owner's own example. Safe for every rank. |
| Chậu cúc thu [new] | ĐƯ | L ~12 | MUA, PT | tưới 1×/tuần, sun; héo 2 tuần | Cúc = ẩn sĩ, long life; chrysanthemum viewing on the 9th-month 重阳 festival was a court custom [S]. Seasonal: best 9th month. |
| Mai trắng trong chậu [new] | TT | M ~26 | MUA, TH, HH | tưới 1×/tuần, cool; héo 3 tuần | Mai = endurance in snow; plum blossom recurs in Chân Hoàn truyện's winter scenes [?]. |
| Thủy tiên (củ nở Tết) [new] | ĐƯ | L ~10 | MUA, NVP | tưới 2×/tuần (water-bowl); héo 2 tuần | Narcissus forced to bloom at the New Year; the Qing court set them in basins for Tết and gave them as gifts [~]. Cheap, short-lived, a good "first shelf item". |
| Mẫu đơn (Hoa vương) [new] | QN | M ~36 | NB, HH, EV | tưới 1×/tuần, sun; héo 2 tuần | Peony = phú quý, "king of flowers"; Dương Quý phi is the peony beauty in Tang tradition (Lý Bạch, Thanh bình điệu) [S]. Over-showy for a Đáp ứng; fits Quý nhân up. |
| Chậu hải đường [new] | QN | M ~30 | MUA, PT | tưới 1×/tuần, sun; héo 3 tuần | Hải đường = "ngọc đường phú quý" pun; the Qing palace garden grew it; Dương Quý phi's sleepy look compared to hải đường (Minh Hoàng) [S]. |
| Bonsai tùng thọ (tùng bách cảnh) [new] | Tần | H ~52 | NB, TH, EV | tưới 1×/2 tuần, sun; héo 5 tuần (hardy) | Tùng bách = thọ, loyalty; pine penjing was a Tết and Vạn thọ gift to Thái hậu [~]. Slow-dying plant: low care, good for a busy consort. |
| Chậu Phật thủ (quả thơm) [new] | QN | M ~32 | TH, HH, PT | tưới 1×/tuần; thối quả sau 3 tuần | Phật thủ citron kept in bowls for scent in Qing palaces (= phúc / thọ pun) [~]. A fruit-plant "xông hương" that also hides a taint if scent is trusted: tie to xạ hương risk below. |

Group note: all plants share one withering clock. Display increases xa xỉ only while alive. A withered plant is seen by visitors as "bỏ bê" (neglect = a faint Danh cue, not a luxury cue). The existing j83 `tp` "Bình hoa" (cut flowers, lasts 1 tuần) may also take this slot as the cheapest, short-lived option [ex:tp].

## 2. Đồ sứ — porcelain (care: none)

| Item | Rank | Xa xỉ | Source | Care | History / drama note |
|---|---|---|---|---|---|
| Bình sứ men xanh trắng (thanh hoa) [new] | ĐƯ | L ~22 | MUA | — | The everyday "good" vase of any wealthy room; Jingdezhen ware [S]. Safe baseline. |
| Đĩa men ngọc Long Tuyền [new] | TT | M ~30 | MUA, PT | — | Celadon (thanh từ) = "ngọc giả"; modest, scholarly gift between consorts [~]. |
| Bình mai (mai bình) men lam [new] | QN | M ~38 | NB, PT, EV | — | Meiping is the classic shape to hold one plum-branch; pairs with a mai plant [~]. |
| Chén bát bảo, đĩa chín quả đào (cửu đào) [new] | QN | M ~40 | HH, TH, EV | — | Nine-peach plate = thọ (peach longevity); a standard Vạn thọ / sinh thần gift to Thái hậu [S, Qing]. |
| Bình phấn thái hoa điểu [new] | Phi | H ~58 | NB, TH, EV | — | Famille-rose (phấn thái) was the Qianlong court's pride; Diên Hy công lược decorates with "phấn thái" ware [~]. |
| Chén đấu thái (gà) [new] | QP | H ~70 | NB only | — | Chenghua doucai "chicken cup": already priceless in Qing times and kept by emperors [S]. Showing it as a Phi is vượt phận; as Quý phi ngự ban only. |
| Bình men Nhữ (Nhữ diêu thiên thanh) [new] | — | I ~100 | none (EV reward from Hoàng thượng for Hoàng hậu / grand ending) | — | Ru ware: under ~100 pieces exist, treated as imperial treasure [S]. Planted-contraband candidate (see §Drama), not buyable. |

## 3. Ngọc ngoạn — jade & curios (care: none)

| Item | Rank | Xa xỉ | Source | Care | History / drama note |
|---|---|---|---|---|---|
| Hồ lô ngọc nhỏ (phúc lộc) [new] | ĐƯ | L ~16 | MUA, PT | — | Hồ lô = phúc, lộc; humble jade; cheap, reusable as a gift [~]. |
| Ngọc bích tư ấn (con dấu nhỏ) [new] | TT | M ~28 | MUA, TT | — | A private seal (tư ấn) a literate consort cuts for her paintings [~]. Do NOT confuse with the imperial seal (below). |
| Ngọc Như Ý (Như Ý ngọc) [new] | QN | M ~40 | NB, TH, EV | — | Ruyi = "as you wish": the sceptre an emperor gives with a promotion or a betrothal; the title of the drama Như Ý truyện [S]. Strongest "tình ý" read: others gossip it is a mark of favour. |
| San hô đỏ cây (hồng san hô) [new] | Phi | H ~56 | NB, HH, EV | — | Red coral from the southern seas, given as tribute and kept in the inner palace [~]. A tree on a stand is a showpiece. |
| Cải thảo phỉ thúy (cabbage ngọc) [new] | Phi | H ~64 | NB (dowry gift), EV | — | The famed jadeite cabbage with a locust and katydid (= nhiều con cháu) was in the dowry of Cẩn phi (Guangxu) [S]. Dowry / ngự ban only, never bought. |
| Ngọc sơn tử «Đại Vũ trị thủy» nhỏ [new] | — | I ~96 | none (imperial) | — | Giant jade mountains were imperial commissions (Qianlong) [S]; a small copy shown by a consort reads as aping the throne. |
| Ngọc tỷ nhỏ (bản ấn thu nhỏ) [new, TRAP] | — | I ~110 | none | — | Showing an imperial seal = đại bất kính [S in law]. Reserve as a "cài đồ" frame-up item (ties to ITEMS `h`): an enemy plants it, or Nội vụ phủ finds it. Never obtainable by the player. |

## 4. Thư họa — scrolls, paintings, calligraphy (care: none; handmade works can use this slot)

| Item | Rank | Xa xỉ | Source | Care | History / drama note |
|---|---|---|---|---|---|
| Tranh cổ [ex:tranhco] | TT | M ~34 | MUA, EV, TH | — | Existing item (giá 90, Hoàng thượng / Thái hậu like it). Fits the owner's "tranh" example. |
| Bức tranh tự tay vẽ [ex:tp Bức tranh] | ĐƯ | L–H by bậc | TT | — | j83 handmade, 4 bậc Thường / Khá / Tinh xảo / Tuyệt phẩm; xa xỉ follows bậc. Gives low ranks a way to show something personal and "thanh cao". |
| Bức thư pháp [ex:tp Bức thư pháp] | ĐƯ | L–H by bậc | TT | — | Handmade; calligraphy as a literate consort's pride [~]. |
| Câu đối đỏ thêu chỉ vàng [new] | TT | L ~20 | MUA, NVP | — | Couplets are hung at Tết; every palace room carried "đối liễn" from Nội vụ phủ [~]. |
| Chữ «Phúc» ngự bút [new] | QN | M ~40 | NB at Tết only | — | The emperor wrote a "Phúc" at New Year and gave it to princes / ministers / favoured consorts (Khang Hy's "Phúc" written for the ailing Hiếu Trang Thái hậu is the famous case) [S]. Strong favour signal; event reward only, not buyable. |
| Thập nhị mỹ nhân đồ (một bức) [new] | Phi | H ~50 | NB, EV | — | The Yongzheng-era album of twelve beauties, long a palace room decoration (the paintings hung in the Yuanming yuan Thâm Liễu Độc Thư Đường, Yongzheng's study) [S]. Over a low consort's shelf it is a lure (reads "tự nhận mỹ nhân"). |
| Biển ngự bút (treo cao) [ex:bienvang / bienngu] | QP | H ~60 | EV (Mệnh truyện) | — | Existing items already "treo trước cửa cung: Danh +8 / +12". Flag: do they sit on the shelf or at the door? Recommend door-only (no shelf slot) to avoid double Danh. |

## 5. Hương lô — incense & burners (care: none; incense burned = renewable consumable)

| Item | Rank | Xa xỉ | Source | Care | History / drama note |
|---|---|---|---|---|---|
| Hương trầm (đốt) [ex:huongtram] | ĐƯ | L ~12 | MUA, TH | refill 1×/tuần (an item per tuần) | Existing item. Visitors smell it: the cheap daily choice [~]. |
| Lư hương đồng nhỏ [new] | ĐƯ | L ~18 | MUA | — | Plain bronze burner; the base of every sitting room [~]. |
| Lư hương Tuyên Đức (đồng đỏ) [new] | QN | M ~36 | NB, TH, EV | — | "Xuande bronze burners" were the connoisseur's ideal in Ming–Qing [S]. Not for a low rank: reads as showy collecting. |
| Lư men pháp lam bốn chân [new] | Phi | H ~52 | NB, HH, EV | — | Cloisonné (pháp lam) burners were imperial workshop products [S, Qing]. |
| Hộp hương hình hạc đứng (lư hạc) [new] | Tần | M ~40 | HH, PT | — | Crane burners (smoke from the beak) = thọ; used in Thái hậu's rooms [~]. |
| Hoan Nghi hương (hương xông phòng) [new, DRAMA] | QN | M ~34 | MUA lén, PT gift | — | Chân Hoàn truyện: Hoa Phi and Hoàng hậu use "Hoan Nghi hương" laced with musk (xạ hương) so Chân Hoàn miscarries [S]. In-game: a gifted incense can be tainted; a shelf burner makes the taint reach the whole room's visitors and the Hoàng thượng who comes. Ties to ITEMS `xahuong` / TAINT. |

## 6. Chuông gió — wind chimes & bells (care: none; some make a sound the visitors "hear")

| Item | Rank | Xa xỉ | Source | Care | History / drama note |
|---|---|---|---|---|---|
| Chuông gió vỏ sò [new] | ĐƯ | L ~10 | MUA, TT | — | The cheapest chime; seashells strung on silk. Owner's example [~]. |
| Chuông gió đồng nhỏ (phong linh) [new] | ĐƯ | L ~16 | MUA | — | Eave bells (phong linh / phong đạc) hung under palace and temple eaves for centuries [S]. |
| Chuông gió ngọc khánh [new] | QN | M ~34 | NB, PT | — | Jade-chime pieces strung together; jade chimes (khánh) are a ritual and courtly sound [S]. |
| Chuông gió pha lê Tây dương [new] | Phi | H ~54 | NB (tribute), EV | — | Western glass was a tribute curiosity; clear sound unlike metal [~]. |
| Thiết mã nhỏ (chuông mái hiên đồng) [new] | Tần | M ~30 | NVP, MUA | — | "Thiết mã / phong linh" under eave corners are an architectural piece; Nội vụ phủ fits them to rank-appropriate halls [~]. |

## 7. Bình phong, rèm — table screens & curtains (care: none)

| Item | Rank | Xa xỉ | Source | Care | History / drama note |
|---|---|---|---|---|---|
| Rèm trúc (thúy trúc liêm) [new] | ĐƯ | L ~10 | MUA, NVP | — | Bamboo blinds for summer; the standard shelter of a low consort [~]. |
| Bình phong thêu để bàn (bàn bình) [new] | TT | M ~26 | MUA, TT | — | Small embroidered tabletop screens (Tô thêu) = Suzhou embroidery gifts [S]. Handmade version = j83 "Khăn thêu"-style. |
| Rèm lụa mỏng [new] | TT | M ~28 | MUA, HH | — | Ties into the existing Lụa Hàng Châu supply [ex:luahang]. |
| Rèm châu (châu liêm) [new] | QN | M ~42 | NB, PT | — | Bead curtains: Triệu Hợp Đức's Chiêu Dương điện had "châu ngọc" fittings (Hán thư Ngoại thích truyện) [S]. Visible wealth; the drama risk is Danh. |
| Bình phong khảm xà cừ / lưu ly [new] | Phi | H ~58 | NB, HH, EV | — | Lacquer-and-mother-of-pearl table screens were Qing court make [~]. |
| Bình phong hoa ngự bút (tứ quân tử) [new] | QP | H ~66 | NB only | — | A screen of the four gentlemen (mai-lan-trúc-cúc) in the emperor's hand: a pure favour trophy [~]. |

## 8. Đồ Tây dương — clocks & western tribute curios (care: winding for clocks 1×/tuần)

| Item | Rank | Xa xỉ | Source | Care | History / drama note |
|---|---|---|---|---|---|
| Đồng hồ tự minh chung nhỏ (tự minh) [new] | Tần | H ~58 | NB, EV | upon-tuần lên dây (wound by servant) | Western chiming clocks: Matteo Ricci gave one to Wanli (1601); the Qing Nội vụ phủ had a clock workshop "Tự minh chung xử" [S]. The best gift for a consort who loves "novelty". |
| Hộp nhạc Tây dương [new] | QN | M ~44 | NB, EV (tribute) | wind | Mechanical music boxes and automata came as tribute; Qianlong prized them [~]. |
| Gương pha lê Tây (soi mặt) [new] | QN | M ~38 | NB, HH | — | Western plate glass mirrors replaced bronze mirrors in Qing palaces [~]. The kit already has mirror UI (makeup mirror, face off-centre bug): not the same item, a décor mirror. |
| Kính viễn vọng Tây dương (nhỏ) [new] | Phi | H ~50 | NB, EV | — | Khang Hy kept telescopes; Qianlong's court collected them [S]. |
| Địa cầu nhỏ (cầu địa lý) [new] | Quý phi | H ~48 | NB | — | Globes: Jesuit gifts to Khang Hy [S]. A scholarly, not romantic, token. |

## 9. Quạt — fans (care: none)

| Item | Rank | Xa xỉ | Source | Care | History / drama note |
|---|---|---|---|---|---|
| Quạt tròn lụa (đoàn phiến) [new, DRAMA] | ĐƯ | L ~14 | MUA, TT | — | Ban Tiệp dư's "Oán ca hành": the autumn round fan = a favoured woman who is dropped [S]. Displaying one reads as a sad / abandoned signal: gossip may whisper "thất sủng". Good for the "mood" system. |
| Quạt gấp trúc vẽ [new] | TT | L ~20 | MUA, TT | — | Handpainted folding fans are the common courtesy gift [~]. |
| Quạt đàn hương chạm [new] | QN | M ~36 | NB, HH | — | Sandalwood fans carve and scent; Suzhou make [~]. |
| Quạt lông công (khổng tước phiến) [new] | Phi | H ~56 | NB, EV | — | Peacock-feather fans belonged to ceremonial / nghi trượng use [S]. The tail-feather set is vượt phận below Phi. |
| Quạt lông trĩ cung đình (trường phiến) [new] | — | I ~85 | none (imperial) | — | Long pheasant fans = Hoàng thượng / Thái hậu processions only [S]. Trap item. |

## 10. Chim cá — caged birds & small creatures (care: feed; some chirp)

| Item | Rank | Xa xỉ | Source | Care | History / drama note |
|---|---|---|---|---|---|
| Chim họa mi trong lồng trúc [new] | TT | M ~28 | MUA, PT | cho ăn 2×/tuần; ốm sau 2 tuần | Songbirds in cages were a literati / palace pastime [~]. |
| Chim vẹt (anh vũ) biết nói [new] | QN | M ~40 | NB, PT, EV | cho ăn 2×/tuần | Dương Quý phi's parrot "Tuyết y nữ" that warned of the emperor [S, Khai Nguyên Thiên Bảo di sự]. A parrot that "repeats a secret": candidate evidence source (scouting). |
| Chậu cá vàng (kim ngư) [new] | TT | M ~30 | MUA, NVP | thay nước 1×/tuần | Goldfish bowls: Ming–Qing court and household fashion [~]. |
| Dế trong lồng (cricket) [new] | ĐƯ | L ~12 | MUA, PT | cho ăn 1×/tuần; ngắn thọ | The Xuande emperor loved cricket fighting ("Xúc chức thiên tử") [S]. Small, cheap, a pastime for servants. |

## 11. Nhạc khí — instruments on a stand (care: none; may be played = minigame)

| Item | Rank | Xa xỉ | Source | Care | History / drama note |
|---|---|---|---|---|---|
| Sáo trúc treo giá [new] | ĐƯ | L ~14 | MUA | — | The humble reed; Chân Hoàn plays a flute / xiao in scenes [~]. |
| Đàn cổ Tiêu Vĩ [ex:dancoc] | QN | M ~50 | MUA, EV, NB | — | Existing item (giá 100). Fits the "gentlewoman with music" shelf. |
| Tỳ bà lưng ngà [new] | TT | M ~36 | MUA, PT | — | Tỳ bà = Tang musical court taste; Dương Quý phi's famous skill (also played the jade chime "khánh") [S]. |
| Tranh (đàn tranh) nhỏ [new] | TT | M ~30 | MUA, TT | — | Common consort instrument [~]. |
| Ngọc địch (sáo ngọc) [new] | Phi | H ~54 | NB, EV | — | Jade flute: Tang / Qing court taste; rare carved piece [~]. |

## 12. Văn phòng, đèn — scholar's table & lamps (care: oil / candle refill for lamps)

| Item | Rank | Xa xỉ | Source | Care | History / drama note |
|---|---|---|---|---|---|
| Nghiên mực Đoan Khê [ex:nghien] | TT | M ~38 | MUA, EV | — | Existing item (giá 60). Hoàng thượng-pleasing gift for a literate consort. |
| Chặn giấy ngọc (trấn chỉ) [new] | TT | M ~28 | MUA, PT | — | Jade paperweights are the standard desk item of a scholar [~]. |
| Thạch (kỳ thạch Thái Hồ) nhỏ [new] | Tần | H ~48 | NB, PT | — | Taihu "scholar's rocks" were a literati cult object [S]. A low-rank flaunt reads as pretension. |
| Cung đăng lụa (đèn cung) [new] | ĐƯ | L ~14 | NVP, MUA | thêm dầu 1×/tuần | The palace silk lantern (cung đăng) hung in halls [~]. |
| Dạ minh châu (ngọc phát sáng) [new] | Quý phi | H ~72 | NB only | — | "Night-shining pearl": Hán thư's Chiêu Dương điện decoration of jade and pearls [S], lore of dạ minh châu as an imperial gem [~]. Imperial-feeling; Quý phi+ by ngự ban only. |

## Quick table — what a freshly promoted consort can plausibly place (for balance)

| Rank | Allowance (36+16×r) | Examples that fit without vượt phận |
|---|---|---|
| ĐƯ (0) | 36 | lan, cúc, thủy tiên, sáo, chuông vỏ sò, lư đồng, hồ lô ngọc, dế, tranh tự vẽ |
| TT (1) | 52 | + mai, đĩa Long Tuyền, tỳ bà, nghiên Đoan Khê, chim họa mi |
| QN (2) | 68 | + mẫu đơn, như ý ngọc, rèm châu, gương Tây, chữ Phúc ngự bút |
| Tần (3) | 84 | + bonsai tùng, đồng hồ tự minh, thạch Thái Hồ |
| Phi (4) | 100 | + phấn thái, san hô, cải thảo phỉ thúy, thập nhị mỹ nhân |
| QP (5) | 116 | + chén đấu thái, bình phong ngự bút, dạ minh châu |
| HQP / HH (6–7) | 132 / 148 | everything non-imperial |
| — | n/a | Nhữ diêu, ngọc tỷ, ngọc sơn tử, trường phiến lông trĩ: never displayable by a consort |

Suggestion for the rules worker (not binding): count the shelf's xa xỉ as the sum of the shown items (one per group), compared to the SAME allowance as worn xa xỉ (dwelling score kept separate, owner OD:L1670). Visitors use their own rank: a superior notices more.

## Historical / drama examples of envy or censure over a too-luxurious room (for the rules worker)

1. **Niên Canh Nghiêu and his sister Niên phi (Thanh, Ung Chính)** [S]. The family's wealth and show of rank (vượt phận) became charges: Niên Canh Nghiêu was ordered to die in 1726 on ~92 charges including extravagance and over-rank behaviour; his sister, the Dunsu Noble Consort, had died the year before, so the fall followed her loss of cover. Rule: the accuser needs scouting evidence (matches OD:L1673 (2) "tố xa xỉ") and the target's Danh and family suffer.
2. **Triệu Hợp Đức's Chiêu Dương điện (Hán Thành Đế)** [S, Hán thư Ngoại thích truyện]. Her hall decorated with gold, jade, pearl, jade steps and curtains was listed by the historian as a sign of the rot behind the throne; other consorts and officials resented her. Rule: a tall room-luxury total makes superiors and other consorts' Ghen grow, and the Hoàng thượng may be told (rumour) rather than see it.
3. **Dương Quý phi (Tang Huyền Tông)** [S, Cựu Đường thư]. 700 embroiderers worked for her alone; officials' censure after the An Lộc Sơn rebellion held her extravagance as a cause. Rule: censure arrives late and in a pile; "bị quở" (owner's timer idea, OD:L1670 (B)) from Hoàng hậu / Thái hậu with a mood cost.
4. **Hoa Phi (Niên Thế Lan), Chân Hoàn truyện / Hoàng hậu Ô Lạp Na Lạp** [? details from memory]. Hoa Phi's lavish Dực Khôn cung and her sets of imperial-gift items drew Hoàng hậu's veiled rebukes and the other consorts' envy; the Hoàng hậu often sits in judgement over "vượt phận" in her morning audience. Check against the script before quoting; the pattern (a favoured consort rebuked by the Hoàng hậu at thỉnh an) is certain [~].
5. **Counter-example: Phú Sát Hoàng hậu in Như Ý truyện / Diên Hy công lược** [S in the drama]. She refused jewels and wore nhung hoa (velvet flowers); the emperor praised her frugality. Rule: very bare quarters from Quý nhân up can earn a small Đức / Danh gain (the existing LUXURY rule says "nothing worn from Quý nhân up: 1 in 4 Đức +1").

## How a consort's room was seen by visitors (who, when)

Based on how Qing / Chinese-drama palace routine reads; wording for the rules worker [~].
- **Hoàng thượng**: visits on the night he "lật bài" or unexpectedly; sees the whole shelf; gifted items are what he notices first. Rare, but the most weighty viewer (Sủng).
- **Hoàng hậu / Thái hậu**: Hoàng hậu comes seldom (e.g., at a consort's illness or a feast); Thái hậu summons rather than visits. Both rely on reports from their ma ma / cung nữ.
- **Other consorts (equals and juniors)**: pay visits in the afternoon, on festivals (Tết, Trung thu, sinh thần), when someone is sick or has a child; bring small gifts (j24 visitors' gifts). Seniors call juniors in rather than visit them. A junior visiting a senior notes her shelf: a Chân Hoàn-style "thỉnh an" is also an inspection.
- **Own servants and the maids of other palaces**: see the shelf every day; they carry the talk (rumour channel, OD:L1673 (2)). A loyal maid is also a witness in a "tố xa xỉ".
- **Nội vụ phủ** (monthly): counts furnishing against rank when issuing and when fitting a hall; its report is the "official" xa xỉ record. [~]
- **Visitors from outside** (family on a rare visit, doctors, craftsmen): minor, but a doctor sees incense and herbs on the shelf (links to poison/taint plots).

Rule hint (not binding): the number of visitors per month is rank-dependent (a high-Sủng consort is visited more, a low or cold one hardly at all), and visits are the moment an NPC's shelf reaction (envy, disapproval, admiration) is rolled.

## Care model for plants (recommendation, matches OD:L1673 (4) open question)

Use the jpet model (petCareW: Khỏe / Cần chăm / Biếng ăn): a plant has `care`; "Tự tay chăm" = 1 khắc once a week with a short minigame; when she is busy a servant waters it (quality by the servant's trait / lòng); neglected plants wither in the stated weeks, shown as "héo" on the shelf. Non-plant items need no care (reserve care only for plants, birds, fish, clocks, lamps).

## Open flags for the foreman / rules worker

1. Door vs shelf: `bienvang` / `bienngu` already give Danh when hung at the door; keep them off the shelf slot (§4).
2. Pets: keep real pets in jpet; shelf animals are décor only (§10).
3. Imperial-only and TRAP items (Nhữ diêu, ngọc tỷ, ngọc sơn tử, trường phiến) = never given to a player; only a "cài đồ" frame-up may place one.
4. Tainted décor (incense, Phật thủ, flowers) rides the existing TAINT system; a shelf item can carry `t` (tainted) and `by`.
5. Notes marked [?] and [~] must be checked before any wording shown to the player; VANPHONG.md applies to every player word (cổ trang; odds ladder; no %).
6. Counts: 12 groups, 70 items; about 10 reuse existing keys / mechanics, the rest `[new]` (names only, no art, no code).
