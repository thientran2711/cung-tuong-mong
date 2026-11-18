# Act-card illustration inventory. Run: python3 acts_data.py  -> acts_list.json
# Each entry = one image (key -> img/act-<key>.webp). names = act names (exact, as shown on the card;
# a trailing "*" means prefix match for names built at run time, e.g. "Mua *").
# ids = engine ids (A("id",...) person acts). pri = usage order (1 = most used).
import json, os

CATS = {
 "hau-ha":     ("hầu hạ",      "a slender lady's hand in an embroidered silk sleeve setting a lidded porcelain tea cup on a red lacquer tray, steam rising, palace hall softly behind"),
 "hoc-tap":    ("học tập",     "an open thread-bound book, ink stone, brush rest and brushes on a rosewood desk by a lattice window with plum blossom"),
 "giao-thiep": ("giao thiệp",  "two porcelain tea cups and a teapot on a low carved table in a garden pavilion, two silk fans laid side by side"),
 "muu-ke":     ("mưu kế",      "a folded secret note and a silver ingot half hidden under a silk handkerchief on a dark lacquer table, single candle, lattice shadows"),
 "hai-nguoi":  ("hại người",   "a small slender dark plum-purple porcelain poison vial with a gold stopper and a red tassel, its stopper removed, beside a jade tea cup on a lacquer table at night, one candle, deep indigo evening shadows, ominous but beautiful (no skull, no symbols)"),
 "nghi-ngoi":  ("nghỉ ngơi",   "a canopy bed with gauze curtains half drawn, embroidered pillow, a bowl of tonic and a curl of incense smoke, warm lamplight"),
 "buon-ban":   ("buôn bán",    "rolls of fine silk, a small abacus and a pouch of silver ingots on a wooden counter in a palace side court"),
 "le-nghi":    ("lễ nghi",     "a gilded incense burner with rising smoke before an altar with offerings, red candles, palace shrine interior"),
 "di-lai":     ("đi lại",      "a long red palace corridor with lanterns and open vermilion gates leading on, stone path, golden roofs"),
 "tai-nghe":   ("tài nghệ",    "a guqin zither, a go board with stones and a painted silk scroll arranged on a stone table in a blossoming garden"),
 "cham-con":   ("chăm con",    "a small carved wooden cradle with a red embroidered tiger-head pillow and a little tiger toy, soft window light"),
 "trieu-chinh":("triều chính", "stacked imperial memorials with yellow brocade covers, a jade seal and a brush on a gold-trimmed desk"),
 "y-duoc":     ("y dược",      "a clay medicine pot on a little charcoal stove with herbs, ginseng and a wooden medicine chest with small drawers"),
 "sung-ai":    ("sủng ái",     "a pair of red silk embroidered pillows and a red candle on a carved bedside table, rose petals, warm intimate glow, tasteful"),
 "ban-thuong": ("ban thưởng",  "a red lacquer tray with silver ingots, a jade bracelet and red silk pouches being offered by a graceful hand"),
 "trang-diem": ("trang điểm",  "a bronze mirror on a dressing table with rouge jars, pearl powder, a jade comb and gold hairpins"),
 "tu-tinh":    ("tư tình",     "an embroidered silk handkerchief dropped on a moonlit stone path beside a rockery, a single lantern, romantic and secretive"),
}

A = []
def act(key, cat, pri, scene, names, ids=()):
    A.append(dict(key=key, cat=cat, pri=pri, scene=scene, names=list(names), ids=list(ids)))

# ---- deck cards (j2 pool) + common person acts: most used ----
act("dan-dem-trang","tai-nghe",1,"a lady's slender hands plucking a guqin on a stone table in a moonlit garden pavilion, plum blossoms",
    ["Đánh đàn ở ngự hoa viên","Đàn khúc Phượng cầu hoàng","Hiến khúc đàn dưới trăng","Phô tài: *"])
act("dang-canh","hau-ha",1,"a graceful hand presenting a lidded blue-and-white porcelain soup bowl on a red lacquer tray beside an imperial desk with memorials",
    ["Dâng canh ở ngự thư phòng","Dâng cháo lên Hoàng thượng"])
act("mua-yen","tai-nghe",1,"long flowing white silk water sleeves swirling in mid-dance across a lantern-lit banquet hall floor, seen from behind, no face",
    ["Múa trong yến tiệc","Kinh hồng vũ"])
act("cam-hoa","tai-nghe",1,"hands arranging pink peonies into a celadon vase on a carved table",["Cắm hoa dâng Hoàng thượng"])
act("cai-tai-mat","muu-ke",1,"a hand slipping a small silver ingot into the sleeve of a palace maid behind a red pillar, faces out of frame",
    ["Cài tai mắt","Mua chuộc cung nữ","Mua chuộc","Cài người vào cung khác","Nghe lời, làm tai mắt","Nhận bạc, làm tai mắt"],["bribe"])
act("nghi-ngoi","nghi-ngoi",1,"a canopy bed with gauze curtains half drawn, embroidered quilt, a bowl of tonic soup on a side table, incense curling",
    ["Nghỉ ngơi dưỡng sức","Nghỉ lấy sức","Ngủ sớm","Ở yên trong cung nghỉ ngơi","Tĩnh dưỡng"])
act("theu-khan-ban","buon-ban",1,"a neat bundle of finely embroidered silk handkerchiefs tied with ribbon, handed through a half-open palace gate",
    ["Thêu khăn bán ra ngoài","Thêu khăn bán"])
act("lam-tho","tai-nghe",1,"a brush writing elegant (illegible, abstract) calligraphy strokes on a scroll beside a branch of plum blossom",
    ["Làm thơ dâng lên","Gửi bài thơ cũ"])
act("cau-tu","le-nghi",2,"incense sticks before a golden altar with a split ripe pomegranate and a red child-blessing charm",
    ["Cầu tự ở Phụng Tiên điện"])
act("phat-chan","ban-thuong",2,"graceful hands handing out small cloth bags of rice and silver from a basket on palace steps",
    ["Phát chẩn cho cung nhân","Đưa cơm áo","Lì xì cung nhân","Tự tay nấu cháo phát cho cung nhân"])
act("duong-nhan","trang-diem",2,"a bronze mirror, a jar of crushed pearl powder, a jade face roller and rose petals in a basin of milk",
    ["Dưỡng nhan","Chải chuốt, giữ nhan sắc"])
act("luyen-cam-ky","hoc-tap",1,"a scholar's desk with a guqin, a go board, brushes and an unrolled painting, candle burning late",
    ["Luyện cầm kỳ thi họa","Tự học","Luyện tập"])
act("doc-binh-thu","hoc-tap",2,"bamboo slip scrolls and an open thread-bound history book by a candle, a chess piece of xiangqi beside",
    ["Đọc binh thư, sử sách"])
act("tung-kinh","le-nghi",2,"a hand holding sandalwood prayer beads beside a sutra being copied with a fine brush, small gilded Buddha statue and incense",
    ["Tụng kinh, làm việc thiện","Thỉnh an, chép kinh","Chép kinh, giữ đức"])
act("thuong","ban-thuong",2,"a hand placing a silver bangle onto red silk held in a maid's open palms",
    ["Thưởng cung nữ","Ban thưởng","Giúp đỡ nàng","Giúp nàng"])
act("gia-mang-thai","muu-ke",4,"a silk padding cushion hidden beneath an embroidered robe laid on a bed, a pouch of silver beside it, candlelight",
    ["Giả mang thai"])
act("danh-co","tai-nghe",2,"a go board mid-game, one hand in a golden yellow dragon-embroidered sleeve and one in a pink silk sleeve placing stones",
    ["Đánh cờ với Hoàng thượng"])
act("ve-tranh","tai-nghe",3,"a fine brush painting chrysanthemums and a regal robe on a silk scroll, paint dishes around, no face visible",
    ["Vẽ chân dung tặng Thái hậu"])
act("lat-the","sung-ai",1,"a silver tray holding a row of blank green-headed jade name tablets (no writing on them), one tablet being turned face down by a slender hand, warm lamplight",
    ["Tranh sủng","Rút thẻ bài","Đút lót lật thẻ","Giữ thẻ bài"],["steal","block"])
act("chan-ngu-gia","sung-ai",2,"a lantern-lit covered palace corridor at night, a lady's flowing pink silk sleeve in the foreground, an imperial palanquin's glowing lanterns approaching far away",
    ["Chặn ngự giá"],["road"])
act("dan-con-thinh-an","cham-con",2,"a small child's hand held in a lady's jeweled hand, climbing white marble palace steps toward a golden hall",
    ["Đưa con đến thỉnh an Hoàng thượng","Dẫn đi thỉnh an Hoàng thượng"])
act("chua-benh-con","cham-con",3,"a bowl of medicine and a spoon beside a sleeping child's small embroidered pillow, a cool cloth, soft lamplight",
    ["Chữa bệnh cho con","Xin thuốc cho *","Chăm sóc"])
act("an-thai","y-duoc",2,"a small clay herb pot simmering on a charcoal stove, dried herbs and red dates on a tray",
    ["Tự bào chế thuốc an thai","An thai"])
act("bao-tin-co-thai","sung-ai",3,"a lady's hand resting on her silk robe beside a split pomegranate and a pair of tiny embroidered baby shoes",
    ["Báo tin có thai"])
act("tro-chuyen-hoang-thuong","giao-thiep",1,"two tea cups on a low table, one hand in a golden yellow dragon sleeve and one in a delicate silk sleeve, intimate study",
    ["Tâng bốc","Nói thật lòng","Khen tài nghệ nàng","Trò chuyện","Hỏi chuyện"])
act("xin-an-dien","giao-thiep",2,"two silk sleeves raised in a deep curtsy before golden throne steps with a dragon carpet",
    ["Xin ân điển","Khất bổng lộc","Cầu xin Hoàng thượng","Xin Hoàng thượng ân xá"])
act("ban-trieu-chinh","trieu-chinh",2,"a hand pointing to a silk map of the empire spread over memorials on an imperial desk",
    ["Bàn chuyện triều chính"])
act("xin-xam","le-nghi",2,"a bamboo cylinder of fortune sticks with one stick sliding out, before a Buddhist altar with incense",
    ["Xin xăm ở Phật đường"])
act("thinh-an","le-nghi",1,"a pair of embroidered pearl shoes and the hem of a silk robe kneeling on a round cushion before a phoenix-carved dais",
    ["Thỉnh an","Xin bái kiến","Xin yết kiến","Chào hỏi đúng lễ"])
act("xin-che-cho","giao-thiep",2,"a young lady's hand clasped by an elder lady's hand wearing a large jade ring and gold nail guards",
    ["Xin Thái hậu đỡ lời","Xin Hoàng hậu che chở","Nhờ giúp đỡ","Cầu xin","Nhờ người bên ngoài","Cầu xin quản sự","Che chở (đang bị bắt tội)","Nhờ * cầu xin","Nhờ con vào cung nói giúp"],["xinhh"])
act("khieu-khich","hai-nguoi",3,"a shattered porcelain tea cup and spilled tea on a polished palace floor, a silk fan dropped nearby",
    ["Khiêu khích","Trút giận"])
act("tang-qua","giao-thiep",1,"a carved gift box wrapped with red silk ribbon on a tray, a sprig of peony on top",
    ["Tặng quà","Biếu quà","Biếu"],["gift"])
act("nghe-len","muu-ke",1,"an ear and jeweled hairpin pressed close to a paper lattice window with two glowing silhouettes talking inside",
    ["Nghe lén câu chuyện","Dò la","Sai đi dò la","Nhờ dò tin","Sai tai mắt dò nơi ở","Mượn dịp dò tin"],["spy"])
act("cai-do","muu-ke",2,"a hand hiding a jade pendant inside an open lacquered clothes chest full of folded silks, candlelight",
    ["Cài đồ vào rương nàng","Cài đồ vào rương","Vu oan"],["plant","frame"])
act("luc-ruong","muu-ke",2,"hands sifting through letters and papers in an open chest by candlelight",
    ["Lục rương tìm chứng cứ","Tìm chứng cứ cha trung thành","Điều tra án cũ","Tìm chứng cứ minh oan","Hỏi chuyện cũ"])
act("thai-y","y-duoc",2,"a physician's silk pulse pillow with a delicate wrist resting on it under a gauze cuff, a medicine box open beside",
    ["Xin chữa bệnh","Truyền thái y","Mời làm thái y tâm phúc","Bài thuốc dễ thụ thai"])
act("boc-thuoc","y-duoc",3,"a small brass scale weighing herbs beside an open medical book and a wall of herb drawers",
    ["Học hỏi y lý","Tự bốc thuốc"])
act("so-thi-tam","muu-ke",3,"an open bound register with columns of abstract marks and a silver ingot resting on it, red tassel bookmark",
    ["Hỏi sở thích Hoàng thượng","Xem sổ thị tẩm","Hối lộ Kính sự phòng sửa sổ"])
act("mua-hang","buon-ban",1,"a peddler's tray of palace wares: rolls of silk, jade bracelets, a ginseng root and little perfume bottles",
    ["Mua *","Mua thuốc bổ","Mua"])
act("thi-tham","giao-thiep",2,"two silk fans held close together hiding a whisper in a blossoming garden, only hands and fans visible",
    ["Tâm sự","Chia sẻ bí mật","Bàn tán về *","Cảnh báo nàng"])
act("hoi-han","giao-thiep",2,"a bowl of warm tonic soup and a folded embroidered quilt presented on a tray at a doorway",
    ["Hỏi han sức khỏe","Mang chăn ấm, thuốc men"])
act("ta-loi","giao-thiep",3,"two hands offering a tea cup with both palms in a humble bow, head ornaments lowered",
    ["Tạ lỗi","Nhún nhường","Tha lỗi"])
act("day-ho","hai-nguoi",2,"ripples spreading on a lotus pond by a marble railing, a gold hairpin and a silk ribbon floating",
    ["Đẩy nàng xuống hồ sen","Đẩy xuống hồ sen","Đẩy con nàng xuống hồ"],["pushp","pond"])
act("ngang-chan","hai-nguoi",3,"an embroidered shoe slyly stretched out on palace stairs as a silk hem sweeps past",
    ["Ngáng chân nàng","Ngáng chân"],["trip"])
act("ha-doc","hai-nguoi",2,"a hand tipping white powder from a tiny ornate vial into a jade tea cup, candlelight",
    ["Hạ độc","Hạ độc dần","Hạ độc con nàng"],["poison","slowpoison","kpoison"])
act("xa-huong","hai-nguoi",3,"a hand tucking a dark musk pod into an embroidered scent sachet, incense burner beside",
    ["Bỏ xạ hương"],["musk"])
act("tung-tin","muu-ke",2,"a folded note slipped under a palace door at night, lantern light through the crack",
    ["Tung tin đồn","Ly gián","Lén báo tin cho *"],["rumor","lygian"])
act("to-giac","muu-ke",2,"a written accusation and a bundle of evidence on a lacquer tray raised in two hands before a throne",
    ["Tố giác","Tố tội thật","Tố vượt phẩm","Bóc chuyện tư tình","Tố lỗi với chủ","Dọa tố đối thực"],["accuse","tocao","vp","expose"])
act("ket-giao","giao-thiep",2,"two hands raising small gold wine cups to toast under blossoming plum branches",
    ["Kết giao","Kết minh"],["ally"])
act("mua-chuoc-ba-do","muu-ke",4,"silver ingots set beside an empty swaddling cloth in a carved cradle, dim lantern",
    ["Mua chuộc bà đỡ"],["catswap"])
act("bong-con","cham-con",4,"a lady's jeweled arms gently holding a swaddled baby in red brocade",
    ["Xin bế con nàng về nuôi"],["takeaway"])
act("bua-chu","hai-nguoi",4,"a small cloth doll pierced with needles hidden beneath a child's embroidered pillow",
    ["Vu con nàng trù ẻo"],["kframe"])
act("pha-viec-hoc","hai-nguoi",4,"a child's copybook with spilled ink across it and a broken brush on a small desk",
    ["Phá việc học"],["ksab"])
act("huy-dung","hai-nguoi",3,"a slender hand opening a small jeweled powder box beside an ointment jar on a dressing table, a bronze mirror turned away, night",
    ["Hủy dung"],["huydung"])
# ---- origin story cards (j4) ----
act("buon-ban-len","buon-ban",3,"bolts of silk, an abacus and a pouch of coins on a cloth spread in a quiet palace alley",
    ["Buôn bán lén trong cung"])
act("dang-bac","trieu-chinh",4,"an open chest of silver ingots presented before the gate of the imperial treasury",["Dâng bạc vào quốc khố"])
act("phong-tuoc","trieu-chinh",4,"an imperial edict of yellow silk rolled on a tray with a jade seal (no writing visible)",
    ["Xin phong tước cho cha","Tâu xin cho người của cha"])
act("mat-thu","muu-ke",4,"a tiny folded letter hidden inside an open enamel rouge compact",["Gửi mật thư về Nam Chiếu"])
act("phong-tuc","trieu-chinh",4,"ornate southern-style silver jewelry and a woven brocade beside an unrolled map",["Giảng giải phong tục Nam Chiếu"])
act("dang-so","trieu-chinh",3,"a folded memorial in a brocade cover on a tray carried in both hands, palace hall",
    ["Dâng sớ lật án","Nhờ * đưa thư kêu oan","Dâng thư lên Hoàng thượng"])
act("thi-tai-nu","hoc-tap",4,"rows of low desks with paper and brushes in a grand academy hall, scrolls hanging",["Dự thi Tài nữ ở Hàn lâm viện"])
act("khac-sach","hoc-tap",4,"carved woodblocks for printing and a stack of freshly bound books",["Xin khắc in sách của cha"])
# ---- forbidden romance (j22) ----
act("liec-mat","tu-tinh",4,"a round silk fan lowered slightly in a garden, a man's dark blue sleeve passing in the background",["Liếc mắt đưa tình"])
act("trao-khan","tu-tinh",4,"a hand offering an embroidered handkerchief to another hand beside a rockery at dusk",["Trao khăn tay"])
act("hen-gap","tu-tinh",4,"a quiet moonlit rock garden corner with a single lantern on a stone bench",["Hẹn gặp riêng"])
act("dut-tinh","tu-tinh",4,"golden scissors cutting a red silk thread tied between two jade pendants",["Cắt đứt"])
act("pha-thai","y-duoc",5,"a dark bowl of bitter medicine on a table at night, single guttering candle",["Uống thuốc phá thai"])
act("thu-toi","le-nghi",4,"gold hairpins and jewels removed and laid on the stone floor before a palace hall, a hem kneeling",["Thú tội với Hoàng thượng","Quỳ xin tha"])
act("hau-thuoc","hau-ha",3,"a medicine bowl on a tray beside a bed with yellow dragon brocade curtains",["Hầu thuốc Hoàng thượng"])
act("gia-benh","muu-ke",3,"closed bed curtains with an untouched medicine bowl on the table and a hidden cosmetic powder box",["Giả bệnh","Cáo bệnh"])
# ---- cold palace (j14) ----
act("trong-rau","nghi-ngoi",4,"neat rows of green vegetables in a small courtyard bed by an old palace wall, a small hoe",["Trồng rau"])
act("xuat-gia","le-nghi",5,"a lock of long black hair, scissors and prayer beads laid on a grey nun's robe",["Xuất gia","Xuất gia, kết thúc kiếp này"])
# ---- servant mode (j42) ----
act("giat-do","hau-ha",1,"wooden basins of colourful silk garments by a palace well, sleeves rolled, soap beans",["Giặt đồ"])
act("nghi-tay","nghi-ngoi",2,"a moment of rest: a cup of tea set on a stack of folded laundry baskets in a sunny courtyard",["Nghỉ tay một lát"])
act("dang-tra","hau-ha",1,"a hand pouring tea from a porcelain teapot into a cup beside a plate of pastries",
    ["Dâng trà, hầu điểm tâm","Hầu trà khi ngự giá","Rót rượu gần ngự tọa"])
act("theo-hau","hau-ha",2,"a maid's hand carrying a round lantern following a lady's long embroidered train down a corridor",
    ["Theo hầu chủ","Việc chủ sai","Đứng sau hầu chủ"])
act("linh-do","hau-ha",3,"baskets of charcoal, bundles of red candles and bolts of fabric stacked at a storeroom counter",["Lĩnh đồ ở Nội vụ phủ"])
act("hoc-le","hoc-tap",2,"a tea tray balanced on two hands over a row of kneeling cushions, a lesson hall",["Học lễ nghi với cô cô","Dạy lễ nghi"])
act("theu-thua","hoc-tap",2,"an embroidery hoop with a half-stitched peony and a brush and copybook under an oil lamp",["Luyện thêu thùa, chữ nghĩa"])
act("so-sach","trieu-chinh",3,"an open ledger, an abacus and keys on a ribbon on a desk in a storeroom",["Quản sổ sách trong cung"])
act("binh-phong","hau-ha",3,"a painted folding screen with soft candle glow and two silhouettes behind it",["Lui sau bình phong"])
# ---- children (j25/j53/j54) ----
act("day-con-hoc","cham-con",2,"a mother's hand guiding a small child's hand holding a brush on paper",
    ["Dạy học","Dạy chữ","Dạy * học chữ","Tự dạy con tài nghệ","Tự dạy con *","Học với thầy","Mời thầy riêng","Mời thầy kèm con ôn luyện trước","Mời thầy dạy *","Thôi mời thầy *","Xin Hoàng thượng cử Đại học sĩ","Xin Thái hậu cho học cùng"])
act("vo-nghe","cham-con",4,"a small child's bow and arrows and a little saddle on a rack in a training yard",["Mời thầy cưỡi ngựa bắn cung","Thôi học võ"])
act("canh-con","cham-con",3,"sleeping children's cradle with a lantern beside and a maid's hand tucking the quilt",["Canh giữ các con"])
act("tham-con","cham-con",3,"a tiger toy, a letter and a box of sweets on a tray at a child's door",["Về tẩm cung thăm con","Gửi thư, quà thăm con"])
act("hon-su","cham-con",4,"a red phoenix wedding crown and red betrothal cards on a lacquer tray",["Bàn hôn sự","Gả * vào nhà quyền thần","Hứa gả cho *"])
# ---- household management / court buttons ----
act("chon-nguoi","trieu-chinh",3,"a row of wooden name tablets on a desk with a register and a brush",["Thêm cung nữ","Thêm thái giám","Đổi người","Tiến cử","Xem người"])
act("tra-khao","trieu-chinh",4,"a long wooden punishment paddle on a bench in a stern stone courtyard",["Tra khảo","Xử tội","Chưởng sự tra xét cung nữ"])
act("an-xa","le-nghi",4,"an open hand releasing a caged songbird by a palace window",["Ân xá"])
act("den-tham","di-lai",2,"vermilion palace doors opening onto a courtyard with lanterns, a silk sleeve at the threshold",
    ["Mời đến cung ta","Đến cung nàng thăm","Đến gặp *","Đến chỗ hắn"])
act("len-vao","muu-ke",3,"a dark palace corridor at night, a slipper stepping softly past a sleeping guard's lantern",["Lẻn vào"])

if __name__ == "__main__":
    out = {"categories": {k: {"label": v[0], "scene": v[1]} for k, v in CATS.items()}, "acts": A}
    p = os.path.join(os.path.dirname(os.path.abspath(__file__)), "acts_list.json")
    json.dump(out, open(p, "w"), ensure_ascii=False, indent=1)
    print(len(A), "images,", sum(len(a["names"]) for a in A), "names,", len(CATS), "categories")
