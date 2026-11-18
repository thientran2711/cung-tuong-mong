# Event art data: categories (title, dark?, scenes = one per variant file) and event id -> category.
# Event id namespaces (see dev/art/EVENT_ART.md):
#   e68:<id>  j68 EV6 templates (review/events)      j7:<id>   j7 ev() palace events (main)
#   arc:<id>  j67 ARC67 story arcs (review/stories)  plot:<k>  j70 plot methods (review/intrigue)
#   qs:<k>    j55 Quốc sự month kinds (main)         fest:<k>  festivals (img/map-hotspots.json)
#   news:<k>  j55 court news lines                   sys:<k>   engine beats (birth, death, promotion, moods...)
C = {}
def cat(k, title, dark, *scenes): C[k] = dict(title=title, dark=dark, scenes=list(scenes))

# ---- triều chính / quốc sự
cat('trieu-chinh', 'Triều chính', 0,
    'a vast golden throne hall during morning audience, rows of officials in dark blue and crimson court robes seen only from behind kneeling on the stone floor, the empty dragon throne far away under hanging lanterns',
    'an imperial desk piled with folded memorial books, a vermilion brush resting on a jade brush stand, an inkstone and a dragon paperweight, warm lamp light')
cat('tham-quan', 'Án tham ô', 1,
    'a confiscated open chest spilling silver ingots beside a thick closed ledger and an abacus on a dark lacquer table, one candle')
cat('duoc-mua', 'Được mùa', 0,
    'endless golden ripe rice terraces at harvest under a clear sky, sheaves stacked high, a granary with red pillars, tiny farmers seen from far away')
cat('lu-lut', 'Lũ lụt', 0,
    'a great yellow river bursting its dykes in heavy rain, flooded villages and rooftops half under water, small boats far away, grey clouds, muted grey-blue and ochre washes')
cat('han-han', 'Hạn hán, cầu mưa', 0,
    'cracked dry earth and withered rice stalks under a pale burning sun, a round white marble altar of heaven in the distance with incense smoke rising straight up')
cat('bien-ai', 'Chiến sự biên ải', 0,
    'a mountain pass fortress gate on the great wall at dusk, beacon fires burning on the towers, war banners in the wind, a column of armoured soldiers far away seen from behind',
    'a sealed war dispatch tube with a red feather, a bronze tiger tally and a military map scroll of mountains (no writing) on a dark wooden desk by lamp light')
cat('thang-tran', 'Thắng trận', 0,
    'a victorious army returning through a grand vermilion city gate, rows of banners and armoured horsemen seen from behind, petals and gold light, cheering crowds tiny in the distance')
cat('su-than', 'Sứ thần, triều cống', 0,
    'a foreign envoy procession entering the palace courtyard seen from behind, white horses, camels and porters carrying lacquer tribute chests under silk parasols',
    'tribute treasures displayed on a long red lacquer table: a white jade vase, coral branches, pearls and exotic brocade bolts, a golden armillary sphere')
cat('hoa-than', 'Hòa thân', 0,
    'a red and gold bridal palanquin with a long escort leaving through the northern palace gate toward far snowy grasslands, seen from behind, red ribbons in the wind')
# ---- Hoàng thượng
cat('hoang-de-vui', 'Hoàng thượng vui', 0,
    'the emperor in a yellow dragon robe seen only from behind, strolling across a marble bridge among blooming peonies, a eunuch with a parasol following at a distance',
    'an imperial gift tray of yellow silk: a bowl of bird nest soup, a folded poem on gold-flecked paper and a jade ruyi, beside a go board on a garden table')
cat('hoang-de-gian', 'Hoàng thượng phiền muộn, giận', 1,
    'a dark imperial study at night, memorials scattered on the floor, a toppled tea cup on the desk, the emperor in yellow robe seen from behind standing at the lattice window')
cat('hoang-de-dem', 'Hoàng thượng ngự giá', 1,
    'a long palace corridor at night lit by red lanterns, the emperor in a yellow cloak seen from behind standing before a gauze curtained doorway, warm glow inside')
cat('vi-hanh', 'Vi hành, chơi đùa', 0,
    'a lively night market outside a palace gate, lantern stalls, sugar figures and paper kites, two cloaked figures seen from behind walking into the crowd',
    'a cricket fighting pot of blue and white porcelain on a garden table with a small silver wager pouch, peony garden behind')
cat('di-san', 'Đi săn, Hội Phượng', 0,
    'an imperial hunting and archery field in summer, saddled horses with gold tack, archery targets, bows on racks and banners, riders seen from far behind')
cat('quoc-tang', 'Quốc tang', 1,
    'the palace in mourning: white silk banners hanging from golden roofs, white lanterns, an empty dragon throne draped with white cloth, candles')
# ---- lễ hội, tế lễ
cat('le-xuan', 'Lễ hội mùa xuân', 0,
    'the palace at the lunar new year: hundreds of red lanterns, plum blossoms, blank red couplet scrolls on vermilion gates, firecracker smoke, tiny figures far away',
    'the lantern festival night: a lake full of glowing lotus lanterns and lantern-lined bridges under the first full moon')
cat('le-ha', 'Tết Đoan ngọ', 0,
    'dragon boats racing on a palace lake under a summer sun, rowers far away, mugwort bundles and five-colour threads hung on a pavilion railing in the foreground')
cat('le-thu', 'Lễ hội mùa thu', 0,
    'a mid-autumn full moon over a lakeside pavilion, mooncakes, osmanthus and a tea set on a table, golden leaves',
    'floating river lanterns drifting on a palace canal at night, small paper boats with candles under a starry sky, gentle and wistful',
    'chrysanthemums in many colours on a hilltop pavilion, a jug of dogwood wine and cups, autumn mountains behind')
cat('le-dong', 'Lễ hội mùa đông', 0,
    'snow covering golden palace roofs on a winter solstice morning, a round three-tiered white altar of heaven in the distance with incense, red lanterns',
    'new year eve night in the palace, fireworks bursting over golden roofs in snow, red lanterns and a warm glowing hall')
cat('te-le', 'Tế lễ, lễ Phật', 0,
    'a palace buddhist shrine hall with a golden bronze incense burner, rising smoke, rows of candles, sutra books and prayer beads on cushions')
cat('yen-tiec', 'Yến tiệc, mừng thọ', 0,
    'a grand longevity banquet hall: low tables with longevity peaches and wine cups, a painted screen of cranes and pines, dancers far away seen from behind')
# ---- hậu cung đời sống
cat('sinh-no', 'Sinh nở, có thai', 0,
    'a carved rosewood cradle with red silk quilts, tiny embroidered tiger shoes and a gold longevity lock, soft morning light through gauze curtains')
cat('con-tre', 'Chuyện các con', 0,
    'a palace schoolroom for young princes: small desks with brush, ink, a wooden toy horse and a kite, a child seen from behind practising calligraphy',
    'a sick child\'s small empty bed with gauze curtains, a bowl of medicine and a traditional embroidered cloth tiger toy on the side table, lamp light')
cat('tang-le', 'Tang lễ, qua đời', 1,
    'a mourning hall with white curtains, a spirit tablet without writing, white chrysanthemums and tall white candles, incense smoke')
cat('tan-phong', 'Tấn phong', 0,
    'an imperial edict scroll of bright yellow silk with dragon borders resting on a red lacquer tray beside a gold rank plaque and a phoenix hairpin')
cat('tuyen-tu', 'Tuyển tú', 0,
    'a palace courtyard where a row of young ladies in pastel silk stand seen only from behind, facing a distant hall, cherry blossoms falling')
cat('thinh-an', 'Thỉnh an Thái hậu, Hoàng hậu', 0,
    'the empress dowager\'s grand hall with a phoenix screen, an empty carved seat, incense, consorts in rich silk kneeling in rows seen only from behind')
cat('khach-den', 'Có người đến chơi', 0,
    'a tea set for two on a low table in a palace pavilion, a plate of osmanthus cakes and a fan left on the cushion, peonies outside',
    'a lacquer gift box tied with ribbon and opened to show perfume bottles and a bolt of silk, carried on a tray across a palace threshold')
cat('tranh-sung', 'Tranh chấp hậu cung', 0,
    'a broken porcelain pot of peonies spilled on the stone path of the imperial garden, two dropped silk fans lying apart')
cat('cung-nhan', 'Chuyện kẻ hầu', 0,
    'a palace servants\' back courtyard: a well, laundry on bamboo poles, wooden tubs and brooms, a maid in embroidered silk seen from behind carrying a basin')
cat('thu-nha', 'Thư nhà', 0,
    'an opened family letter on plum-blossom paper (no writing visible) beside a basket of fruit and a jade pendant on a window sill')
cat('tai-nghe', 'Tài nghệ', 0,
    'a palace art studio: a guqin on a stand, an unfinished ink painting of plum blossoms on an easel, embroidery hoop with silk threads')
cat('thoi-tiet', 'Thời tiết, bốn mùa', 0,
    'a summer palace lake covered with pink lotus and big green leaves, a small boat moored by a willow, heat haze',
    'heavy snow on palace courtyards and red walls, bare plum trees, a charcoal brazier glowing under an eave',
    'a stormy night over palace roofs, lightning striking an ancient tree, rain pouring from the eaves')
cat('dieu-troi', 'Điềm trời', 1,
    'a comet streaking across the night sky above golden palace roofs, an observatory bronze armillary sphere in the foreground')
cat('dieu-lanh', 'Điềm lành', 0,
    'nine pink peonies blooming together in a courtyard at dawn, a golden phoenix-shaped cloud glowing in the sky above the palace')
cat('benh-tat', 'Ốm đau, thái y', 0,
    'a physician\'s medicine box open on a table: herbs, a pulse pillow, silver needles and a steaming bowl of tonic, gauze bed curtains behind')
cat('dich-benh', 'Dịch bệnh', 1,
    'a quarantined palace lane with gates sealed by plain paper strips, big cauldrons of herbal medicine steaming, physicians far away seen from behind')
cat('hoa-hoan', 'Hỏa hoạn', 1,
    'a palace hall burning at night, flames licking golden roof tiles, sparks and smoke, servants far away seen from behind carrying water buckets')
# ---- mưu hại, bê bối (dark)
cat('tin-don', 'Tin đồn, bê bối', 1,
    'two silhouettes whispering behind a translucent painted silk screen at night, only dark shadow shapes, a lantern behind them')
cat('tai-mat', 'Tai mắt, kẻ khả nghi', 1,
    'a lattice paper window glowing at night with the shadow of a listening figure behind it, footprints on a moonlit roof')
cat('chuyen-la', 'Chuyện lạ, ma quái', 1,
    'an old stone well behind a palace at night under a pale moon, mist drifting, a white silk scarf caught on the well rim, bare branches')
cat('dau-doc', 'Đầu độc', 1,
    'a lidded porcelain bowl of soup and a plate of pastries on a dark tray, a silver testing needle turned black beside them, one candle')
cat('vu-oan', 'Vu oan, bùa ngải', 1,
    'a small cloth doll pierced with needles half buried under a tree root at night, a dropped lantern, moonlight')
cat('hai-thai', 'Hại thai, xạ hương', 1,
    'an embroidered scented sachet leaking dark musk grains on a dark lacquer dressing table, a curl of smoke from an incense burner')
cat('hoi-lo', 'Hối lộ, uy hiếp', 1,
    'a sleeve slipping a pouch of silver across a dark table toward a stack of jade name tablets, one dim lantern, only the edge of a sleeve visible')
cat('mat-uoc', 'Mật ước, liên thủ', 1,
    'two tea cups facing each other on a stone table in a secluded garden pavilion at night, a folded closed fan between them, lantern light')
cat('hinh-phat', 'Trừng phạt', 1,
    'a punishment courtyard at dusk: a long wooden bench, bamboo rods leaning on a red wall, a hairpin dropped on the stone, cold grey light')
cat('lanh-cung', 'Lãnh cung', 1,
    'a cold empty courtyard with fallen leaves, a closed faded door with peeling red paint and a bare tree under grey sky',
    'a bare cold room in the cold palace: a thin quilt on a plain bed, a small charcoal brazier with a faint glow, a chipped tea bowl, moonlight through a torn paper window',
    'a neglected cold palace garden with a dry well, weeds between stones and a single winter plum blossoming against a grey wall')
cat('dai-xa', 'Đại xá, ân điển', 0,
    'great palace gates swinging open at sunrise, an unrolled yellow edict on a stand, broken chains on the steps, doves rising')

# ---- reserved for modules still coming (coordinator 11/14): Hoàng hậu quests, cold palace life, maid-mode variants; affairs
cat('hh-viec', 'Việc Hoàng hậu giao', 0,
    'the empress\'s desk in a grand hall: open account ledgers of the six palaces, a ring of bronze keys, a golden phoenix seal box (closed, no characters) and an abacus, morning light',
    'a eunuch and maids seen from behind carrying lacquer boxes and bolts of silk in a long procession across a palace courtyard on an errand, banners of the empress\'s palace')
cat('cung-nu', 'Đời cung nữ', 0,
    'a long red palace corridor where a maid in embroidered silk with hairpins is seen from behind carrying a tea tray toward a lit hall',
    'the palace laundry court of the Tân Giả khố: rows of wooden tubs, silk garments drying on bamboo poles, maids seen from far behind at the well, steam and soft light')
cat('tu-tinh', 'Tư tình, ánh mắt', 1,
    'a moonlit garden path under a flowering pear tree, a lady and a guard seen only as distant silhouettes standing apart on either side of a moon gate')

# ---- event id -> category
E = {}
def m(cat_, *ids):
    assert cat_ in C, cat_
    for i in ids: E[i] = cat_

# j55 Quốc sự kinds, news, moods
m('duoc-mua', 'qs:mua'); m('su-than', 'qs:cong'); m('yen-tiec', 'qs:hoi'); m('trieu-chinh', 'qs:yen')
m('lu-lut', 'qs:lut'); m('han-han', 'qs:han'); m('tham-quan', 'qs:tham')
m('thang-tran', 'qs:giac-thang', 'news:thang-tran'); m('bien-ai', 'qs:giac-thua', 'news:thua-tran', 'news:nam-chieu')
m('hoa-than', 'news:hoa-than')
m('hoang-de-vui', 'sys:mood-vui'); m('trieu-chinh', 'sys:mood-binh'); m('hoang-de-gian', 'sys:mood-phien', 'sys:mood-gian')
# engine beats
m('sinh-no', 'sys:co-thai', 'sys:sinh-con', 'sys:sinh-npc'); m('tang-le', 'sys:qua-doi', 'sys:chet-npc', 'sys:chet-con', 'sys:thai-hau-mat')
m('quoc-tang', 'sys:bang-ha'); m('tan-phong', 'sys:tan-phong', 'sys:lap-hau', 'sys:lap-thai-tu', 'sys:tranh-ghe')
m('hinh-phat', 'sys:giang-chuc'); m('lanh-cung', 'sys:lanh-cung'); m('tuyen-tu', 'sys:tuyen-tu')
m('dai-xa', 'sys:dai-xa', 'sys:an-xa'); m('hoang-de-dem', 'sys:thi-tam'); m('benh-tat', 'sys:om')
# festivals
m('le-xuan', 'fest:newyear', 'fest:nguyentieu', 'fest:thanhminh'); m('le-ha', 'fest:doanngo'); m('di-san', 'fest:phoenix')
m('le-thu', 'fest:thattich', 'fest:trungthu', 'fest:trungcuu'); m('le-dong', 'fest:dongchi', 'fest:giaothua')
# j7
m('vu-oan', 'j7:doll', 'j7:rvframe'); m('dau-doc', 'j7:poisongift', 'j7:taster'); m('tin-don', 'j7:guardrumour')
m('chuyen-la', 'j7:ghost'); m('mat-uoc', 'j7:pact'); m('tai-mat', 'j7:eunuch'); m('hoang-de-dem', 'j7:empnight')
m('trieu-chinh', 'j7:minister'); m('hoang-de-gian', 'j7:jealousprince'); m('lu-lut', 'j7:flood'); m('tuyen-tu', 'j7:newgirl')
m('con-tre', 'j7:princefever'); m('hoa-than', 'j7:foreignwed'); m('hoi-lo', 'j7:maidhostage', 'j7:doctorblack', 'j7:rvbribe')
m('dieu-troi', 'j7:comet'); m('dieu-lanh', 'j7:phoenix'); m('le-ha', 'j7:doanngo'); m('le-thu', 'j7:trungcuu', 'j7:vulan')
m('le-dong', 'j7:dongchi'); m('yen-tiec', 'j7:thbirthday'); m('hinh-phat', 'j7:caning', 'j7:condemnedmaid')
m('lanh-cung', 'j7:coldvisit'); m('thu-nha', 'j7:letterhome'); m('hoa-hoan', 'j7:fire'); m('tranh-sung', 'j7:rvquarrel')
m('hai-thai', 'j7:rvmusk')
# j68 EV6
m('khach-den', 'e68:gossipTea', 'e68:giftArrive', 'e68:kindVisit', 'e68:newGirlAdvice', 'e68:eunRequest', 'e68:borrowDress', 'e68:officialWife')
m('chuyen-la', 'e68:lostItem', 'e68:hairpinThief', 'e68:nightSteps', 'e68:poisonedFish')
m('cung-nhan', 'e68:sickServant', 'e68:maidQuarrel', 'e68:servGamble', 'e68:servRomance', 'e68:servLeave', 'e68:brokenHeirloom', 'e68:strayCat')
m('dau-doc', 'e68:spoiledFood'); m('thoi-tiet', 'e68:leakRoof', 'e68:snowDay', 'e68:stormNight', 'e68:lotusSeason', 'e68:heatStroke')
m('thu-nha', 'e68:letterHome'); m('hoi-lo', 'e68:eunuchSqueeze', 'e68:bribedServ'); m('tai-nghe', 'e68:embroidery', 'e68:painter', 'e68:musician')
m('dieu-lanh', 'e68:flowerBloom'); m('tranh-sung', 'e68:proudVisit', 'e68:doubtVisit', 'e68:silkAllot')
m('tai-mat', 'e68:slyVisit', 'e68:newServSus', 'e68:rumorSpy'); m('thinh-an', 'e68:thMama', 'e68:hhSummons')
m('benh-tat', 'e68:docCheck', 'e68:springAllergy'); m('hoang-de-vui', 'e68:empDish', 'e68:empPoem', 'e68:empChess', 'e68:empGiftOdd', 'e68:empAsksAbout')
m('hoang-de-gian', 'e68:empSulk', 'e68:empOldFlame'); m('vi-hanh', 'e68:empIncognito', 'e68:empWager'); m('hoang-de-dem', 'e68:empSleepRead')
m('dieu-troi', 'e68:empDream'); m('le-thu', 'e68:autumnMoon'); m('lu-lut', 'e68:famineDonate'); m('bien-ai', 'e68:borderNews')
m('tham-quan', 'e68:clanFather'); m('con-tre', 'e68:kidSick', 'e68:kidFight', 'e68:kidGift', 'e68:kidTutor', 'e68:kidLie')
m('tin-don', 'e68:rumorPreg', 'e68:rumorEvidence', 'e68:rumorTH', 'e68:rumorFavor'); m('tan-phong', 'e68:rumorEmpLove')
m('te-le', 'e68:templeRite', 'e68:fortuneNun'); m('mat-uoc', 'e68:allyOffer'); m('hoa-hoan', 'e68:servHero')
m('han-han', 'e68:droughtPrayer'); m('su-than', 'e68:envoyGift')
# j70 plot methods
m('dau-doc', 'plot:poison', 'plot:kpoison'); m('hai-thai', 'plot:musk', 'plot:catswap'); m('chuyen-la', 'plot:pond', 'plot:pushp')
m('vu-oan', 'plot:kframe', 'plot:frame', 'plot:plant', 'plot:joint', 'plot:accuse'); m('hoi-lo', 'plot:bribe', 'plot:block')
m('tin-don', 'plot:rumor'); m('con-tre', 'plot:ksab'); m('hinh-phat', 'plot:huydung')
# j67 story arcs
m('thu-nha', 'arc:tt_co', 'arc:tt_tranh', 'arc:cn_than', 'arc:td_song', 'arc:s_than', 'arc:muoi_tuoc')
m('tham-quan', 'arc:tt_oan', 'arc:muoi_lau', 'arc:thd_sach', 'arc:thd_tro', 'arc:muoi_no')
m('mat-uoc', 'arc:tt_mat', 'arc:ch_co', 'arc:s_ban', 'arc:nc_gian'); m('bien-ai', 'arc:dtq_bien', 'arc:dtq_huynh', 'arc:dtq_binh')
m('vu-oan', 'arc:dtq_vu', 'arc:td_an', 'arc:td_ke', 'arc:cnv_ban', 'arc:cn_ban'); m('lu-lut', 'arc:muoi_doi')
m('tranh-sung', 'arc:cn_chu', 'arc:ch_ho', 'arc:td_tha'); m('cung-nhan', 'arc:cn_tinh', 'arc:cnv_ma', 'arc:s_thay')
m('su-than', 'arc:nc_su', 'arc:s_su', 'arc:nc_vuong'); m('thinh-an', 'arc:nc_tuc'); m('benh-tat', 'arc:ch_benh')
m('tai-mat', 'arc:ch_bi', 'arc:cnv_chu', 'arc:s_thu'); m('tai-nghe', 'arc:thd_tho', 'arc:thd_hoc'); m('hoang-de-dem', 'arc:cnv_mat', 'arc:s_tinh')
m('hoa-hoan', 'arc:s_hoa'); m('dich-benh', 'arc:s_dich')

def files(k):
    n = len(C[k]['scenes'])
    return ['img/ev-%s.webp' % k] + ['img/ev-%s-%d.webp' % (k, i) for i in range(2, n + 1)]
def keys():
    out = []
    for k in C:
        out.append(k)
        out += ['%s-%d' % (k, i) for i in range(2, len(C[k]['scenes']) + 1)]
    return out
def scene(key):
    import re
    mm = re.match(r'(.*?)-(\d)$', key)
    if mm and mm.group(1) in C: return C[mm.group(1)], C[mm.group(1)]['scenes'][int(mm.group(2)) - 1]
    return C[key], C[key]['scenes'][0]

# older stock sources (j3 fixed dilemmas, j24 approaches, j54 princess moments, j55 court pop-up, j22 affairs)
m('cung-nhan', 'j3:vase'); m('lanh-cung', 'j3:coldletter'); m('tham-quan', 'j3:embezzle'); m('tuyen-tu', 'j3:tuyen')
m('benh-tat', 'j3:thbenh'); m('tin-don', 'j3:loveletter')
m('khach-den', 'j24:co-nguoi-den'); m('cung-nhan', 'j24:ke-hau-xin', 'j24:viec-ke-hau'); m('thinh-an', 'j24:thai-hau-trieu')
m('hoang-de-dem', 'j24:hoang-thuong-den'); m('tu-tinh', 'j24:mot-anh-mat', 'j22:affair', 'e68:servRomance', 'arc:cn_tinh', 'arc:s_tinh')
m('con-tre', 'j54:h54met', 'j54:h54sad', 'j54:h54tut', 'j54:h54show'); m('trieu-chinh', 'j55:tdPop')
# reserved ids for coming modules (rename freely; the category is what matters)
m('hh-viec', 'hh:*'); m('lanh-cung', 'lc:*'); m('cung-nu', 'cnv:*', 'j42:*')
