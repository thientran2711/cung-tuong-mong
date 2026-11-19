# item_lists.py — ART_RULES E11 (owner Lượt 583): HELD-ITEM LISTS, 5 different items PER AGE for EVERY rank of EVERY person-type
# (a18 a26 a36 a51 a65 -> 25 items per rank), so rising in rank OR in age never repeats an item.
# Generator only (NOT a builder): `python3 dev/art/item_lists.py` writes dev/art/item_lists.json + dev/art/ITEM_LISTS.md and runs check().
# Builders (BW3) read item_lists.json; this file never imports or edits a builder. Reuses the item kinds / materials of
# t8-prompt-B/item_age.py and the old 3f lists (build.py L3F / ITEMS7 / ITEMS), re-cut so that each rank gets its OWN kinds.
#
# Guarantees (check() asserts every one):
#  1 cell (tier, age) = 5 different item KINDS, 5 different FAMILIES (no two fans, no two boxes in one cell), 5 different colours;
#  2 one tier = 25 different kinds over its 5 ages (E7/E11: her ages never repeat an item); a family at most 2x per tier (box 3x),
#    and two items of one family in a tier never share a colour (no "three crimson books");
#  3 ADJACENT ranks share NO kind at the same age (kc|t1|t2|…|t8|Nữ đế/Thái hậu, tm0|…|tm4|ma ma): going up one rank = 5 new things;
#  4 PICK COLUMN: within one person-chain a kind never sits twice at the same index, so person n (index (n-1)%5) never holds the
#    same kind twice over all her ranks AND ages (E6 "no item kind repeated within one person"); 5 people in a row differ (5 indices);
#  5 E5/D10/B16: one real hand-held object, never cup/teacup/teapot/bowl/goblet, colour family written in the text (+ an alt colour of
#    another family for when the default clashes with her outfit); reserved: ruyi/coral t6+, hand censer t7+, phoenix + seal box t8
#    only, dragon / sceptre / edict / hốt / ngọc tỷ Nữ đế only; t6+ never basket, sachet/purse, loose flower branch, bead string
#    (Thái hậu may hold beads); poor tiers no jade/gold/silver/silk; t7/t8/Nữ đế/Thái hậu never a red/orange/yellow item.
import json, random, re, os, sys
HERE=os.path.dirname(os.path.abspath(__file__))
AGES=["a18","a26","a36","a51","a65"]
# ---------------------------------------------------------------- tiers
TIER_NAME={"lanh":"Lãnh cung","ngheo":"Nhà nghèo","tm0":"tm0 Cung nữ thô sử","tm1":"tm1 Cung nữ","tm2":"tm2 Đại cung nữ",
"tm3":"tm3 Chưởng sự cô cô","tm4":"tm4 Nữ quan","mama":"Ma ma","kc":"Khuê các","t1":"t1 Đáp ứng","t2":"t2 Thường tại",
"t3":"t3 Quý nhân","t4":"t4 Tần","t5":"t5 Phi","t6":"t6 Quý phi","t7":"t7 Hoàng quý phi","t8":"t8 Hoàng hậu",
"thaihau":"Thái hậu","nude":"Nữ đế","nc":"Công chúa Nam Chiêu","bd":"Công chúa Bắc Địch"}
# ages actually drawn today (item_age.TIER_AGES); the other ages are still filled so a builder never falls back to a neighbour's item
DRAWN={t:AGES for t in TIER_NAME}; DRAWN.update({"ngheo":["a18","a26"],"kc":["a18","a26"],"thaihau":["a36","a51","a65"]})
# chains = people who can move through these tiers (pick-column guarantee 4 holds inside a chain); ladder = order for guarantee 3
CHAINS={"lady":["kc","t1","t2","t3","t4","t5","t6","t7","t8","nude","thaihau","nc","bd"],
        "maid":["tm0","tm1","tm2","tm3","tm4","mama"],"poor":["ngheo","lanh"]}
ADJ=[("kc","t1"),("t1","t2"),("t2","t3"),("t3","t4"),("t4","t5"),("t5","t6"),("t6","t7"),("t7","t8"),("t8","nude"),("t8","thaihau"),
     ("nude","thaihau"),("nc","t1"),("bd","t1"),("nc","bd"),
     ("tm0","tm1"),("tm1","tm2"),("tm2","tm3"),("tm3","tm4"),("tm4","mama"),("ngheo","lanh")]
LEVEL={"kc":0,"t1":1,"t2":2,"t3":3,"t4":4,"t5":5,"t6":6,"t7":7,"t8":8,"thaihau":7,"nude":9,"nc":5,"bd":5,
       "tm0":0,"tm1":1,"tm2":2,"tm3":3,"tm4":4,"mama":4,"ngheo":1,"lanh":0}
GROUP={t:g for g,ts in CHAINS.items() for t in ts}
# ---------------------------------------------------------------- colours (en, vn, family)
COL={"jade green":("xanh ngọc bích","green"),"celadon":("xanh men ngọc","green"),"moss green":("xanh rêu","green"),"leaf green":("xanh lá non","green"),
"sky blue":("xanh da trời","blue"),"indigo":("chàm","blue"),"kingfisher blue":("xanh lông chim trả","blue"),"turquoise":("lam ngọc","blue"),"teal":("xanh mòng két","blue"),
"grey-blue":("xanh xám","blue"),"lilac":("tím hoa cà","purple"),"plum purple":("tím mận","purple"),"lavender":("tím oải hương","purple"),
"ivory white":("trắng ngà","white"),"pearl white":("trắng ngọc trai","white"),"cream":("kem","white"),"peach pink":("hồng đào","pink"),
"rose pink":("hồng phấn","pink"),"coral":("đỏ san hô","red"),"crimson":("đỏ thẫm","red"),"amber":("vàng hổ phách","yellow"),
"sandalwood brown":("nâu trầm","brown"),"rust brown":("nâu gỉ sắt","brown"),"natural undyed":("mộc chưa nhuộm","brown"),
"black":("đen tuyền","black"),"silver grey":("xám bạc","grey")}
AGE_PAL={"a18":["peach pink","rose pink","sky blue","lilac","leaf green","coral","turquoise","pearl white","lavender","jade green"],
"a26":["rose pink","sky blue","lavender","jade green","kingfisher blue","coral","celadon","ivory white","plum purple","turquoise","crimson"],
"a36":["jade green","celadon","kingfisher blue","plum purple","crimson","ivory white","teal","lavender","indigo","pearl white"],
"a51":["indigo","celadon","plum purple","sandalwood brown","moss green","teal","ivory white","silver grey","jade green","crimson"],
"a65":["indigo","sandalwood brown","moss green","silver grey","ivory white","black","celadon","plum purple","teal","jade green"]}
POOR_PAL=["indigo","grey-blue","moss green","sandalwood brown","cream","rust brown","natural undyed"]
# outfit colours known per tier (B16): t7 HQP orange+yellow, t8 HH red+yellow, Nữ đế / Thái hậu yellow robes -> never red/orange/yellow items there
EXCL={"t7":{"coral","peach pink","amber","crimson","rust brown"},"t8":{"coral","peach pink","amber","crimson","rust brown"},
      "nude":{"amber","coral","peach pink"},"thaihau":{"amber","coral","peach pink","crimson"}}
ALT_FAM={"green":["lilac","sky blue","ivory white"],"blue":["peach pink","ivory white","jade green"],"purple":["celadon","ivory white","sky blue"],
"white":["indigo","jade green","plum purple"],"pink":["celadon","sky blue","indigo"],"red":["jade green","ivory white","indigo"],
"yellow":["indigo","jade green","lilac"],"brown":["celadon","sky blue","ivory white"],"black":["ivory white","celadon","lilac"],"grey":["plum purple","jade green","indigo"]}
POOR_ALT={"blue":["moss green","sandalwood brown","cream"],"green":["indigo","cream","rust brown"],"brown":["indigo","moss green","cream"],"white":["indigo","moss green","rust brown"]}
JADE=["jade green","ivory white","lavender","celadon","pearl white","teal"]
FLOWER=["pearl white","rose pink","crimson","lilac"]
# ---------------------------------------------------------------- materials per tier
# lady: S cloth, B body finish, H fittings/hard, G stone, D trailing trim (en, vn pairs)
LMAT={
"kc":(("painted cotton-silk","lụa vẽ"),("painted wood","gỗ sơn vẽ"),("plain carved wood","gỗ mộc chạm"),("glass","thủy tinh"),(", with a cotton-silk cord",", dây lụa")),
"t1":(("plain silk","lụa trơn"),("painted wood","gỗ sơn"),("smooth bamboo","tre mài nhẵn"),("glass","thủy tinh"),(", with a small silk cord",", dây lụa nhỏ")),
"t2":(("embroidered silk","lụa thêu"),("lacquer","sơn mài"),("lacquered wood","gỗ sơn mài"),("glazed porcelain","sứ men"),(", with a small silk tassel",", tua lụa nhỏ")),
"t3":(("finely embroidered silk","lụa thêu tinh xảo"),("fine lacquer","sơn mài tinh"),("silver","bạc"),("agate","mã não"),(", with a silk tassel and a silver bead",", tua lụa hạt bạc")),
"t4":(("silk brocade","gấm lụa"),("jade-inlaid lacquer","sơn mài khảm ngọc"),("carved jade","ngọc chạm"),("jade","ngọc"),(", with a jade tassel",", tua ngọc")),
"t5":(("gold-thread brocade","gấm kim tuyến"),("gold-inlaid lacquer","sơn mài khảm vàng"),("gilded silver","bạc mạ vàng"),("fine jade","ngọc tốt"),(", with a gem tassel",", tua đá quý")),
"t6":(("pearl-embroidered silk","lụa thêu ngọc trai"),("mother-of-pearl lacquer","sơn mài khảm xà cừ"),("white jade mounted in gold","bạch ngọc nạm vàng"),("fine jade set in gold","ngọc quý nạm vàng"),(", with pearl tassels",", tua ngọc trai")),
"t7":(("silk inlaid with kingfisher feathers","lụa điểm lông chim trả"),("cloisonné enamel","men pháp lam"),("gold filigree set with gems","vàng chạm lưới nạm đá quý"),("imperial jade in gold filigree","ngọc ngự trong lưới vàng"),(", with gem tassels",", tua đá quý")),
"t8":(("imperial silk embroidered with phoenixes","lụa ngự thêu phượng"),("cloisonné enamel with phoenixes","men pháp lam vẽ phượng"),("gold carved with phoenixes and set with pearls","vàng chạm phượng nạm ngọc trai"),("imperial jade carved with a phoenix","ngọc ngự chạm phượng"),(", with pearl phoenix tassels",", tua phượng ngọc trai")),
"thaihau":(("brocade with a longevity pattern","gấm hoa văn chữ Thọ"),("dark lacquer","sơn then"),("dark sandalwood with gilt-bronze mounts","trầm hương bịt đồng mạ vàng"),("old jade","ngọc cổ"),(", with a long silk tassel",", tua lụa dài")),
"nude":(("silk embroidered with gold dragons","lụa thêu rồng vàng"),("cloisonné enamel with dragons","men pháp lam vẽ rồng"),("gold carved with dragons","vàng chạm rồng"),("imperial jade carved with a dragon","ngọc ngự chạm rồng"),(", with dragon tassels",", tua rồng")),
"nc":(("batik-edged silk","lụa viền batik"),("lacquer","sơn mài"),("chased silver","bạc chạm"),("jade set in chased silver","ngọc bịt bạc chạm"),(", with a silver camellia tassel",", tua bạc hoa trà")),
"bd":(("fur-trimmed brocade","gấm viền lông"),("lacquer","sơn mài"),("silver inlaid with turquoise","bạc nạm lam ngọc"),("polished stone set in silver","đá mài bịt bạc"),(", with coral beads",", chuỗi san hô")),
}
MMAT={"tm0":(("coarse cotton","vải thô"),("rough plain wood","gỗ thô"),("","")),
"tm1":(("plain cotton","vải bông"),("plain wood","gỗ mộc"),("","")),
"tm2":(("dyed cotton","vải nhuộm"),("smooth polished wood","gỗ đánh bóng"),(", with a cotton cord tassel",", tua dây vải")),
"tm3":(("plain silk","lụa trơn"),("lacquered wood","gỗ sơn then"),(", with a small silk tassel",", tua lụa nhỏ")),
"tm4":(("fine plain silk","lụa mịn"),("lacquered wood with brass fittings","gỗ sơn bịt đồng"),(", with a silk tassel and a brass bead",", tua lụa hạt đồng")),
"mama":(("fine silk","lụa mịn"),("dark lacquered wood with brass fittings","gỗ sơn then bịt đồng"),(", with a dark silk tassel",", tua lụa màu trầm"))}
PMAT={"lanh":("old, worn","cũ sờn"),"ngheo":("plain","mộc")}
# ---------------------------------------------------------------- kinds
# K[key] = dict(group, fam, ages, lo, hi, only, pref, hand, en, vn, cols)
K={}
def k(group,key,fam,ages,lo,hi,pref,hand,en,vn,cols=None,only=None):
    K[key]=dict(group=group,fam=fam,ages=["a"+a for a in ages.split()],lo=lo,hi=hi,pref=pref,hand=hand,en=en,vn=vn,cols=cols,only=only)
ALL="18 26 36 51 65"
L=lambda *a,**kw: k("lady",*a,**kw)
# fans / mirror / lanterns
L("rfan","fan",ALL,0,9,3,"rfan","round fan of {C} {S}, handle of {H}{D}","quạt tròn {S} màu {C}, cán {H}{D}")
L("ffan","fan",ALL,0,9,4,"ffan","folding fan of {C} {S}, ribs of {H}{D}","quạt xếp {S} màu {C}, nan {H}{D}")
L("featherfan","fan","18 26 36 51",2,9,5,"one","feather fan of {C}-dyed plumes, handle of {H}{D}","quạt lông vũ nhuộm màu {C}, cán {H}{D}")
L("mirror","mirror",ALL,0,9,4,"mirror","hand mirror with a {C} {B} back, framed in {H}{D}","gương cầm tay lưng {B} màu {C}, khung {H}{D}")
L("slant","lantern","18 26",0,9,2,"lantern","small lantern of {C} {S} on a short stick of {H}{D}","đèn lồng nhỏ {S} màu {C}, cán {H}{D}")
L("rabbitlant","lantern","18",0,5,1,"lantern","small rabbit-shaped lantern of {C} {S} on a stick of {H}","đèn con thỏ nhỏ {S} màu {C}, cán {H}")
L("plant","lantern","26 36 51 65",0,9,5,"lantern","palace lantern of {C} {S} on a frame of {H}{D}","đèn cung đình {S} màu {C}, khung {H}{D}")
L("lotuslamp","lantern","51 65",0,9,5,"two","small lotus-shaped lamp of {C} {B}, fittings of {H}","đèn hoa sen nhỏ {B} màu {C}, viền {H}")
L("vase","vase",ALL,0,9,4,"vase","small vase of {C} glazed porcelain mounted in {H}, with one flower sprig","bình hoa nhỏ sứ men màu {C} bịt {H}, cắm một cành hoa")
# books / scrolls
L("pbook","book","18 26 36",0,9,3,"book","poetry book bound in {C} {S}, clasps of {H}","tập thơ bọc {S} màu {C}, khóa {H}")
L("album","book","36 51 65",0,9,5,"book","painting album bound in {C} {S}, clasps of {H}","tập tranh bọc {S} màu {C}, khóa {H}")
L("sutra","book","51 65",0,9,5,"book","sutra book bound in {C} {S}","kinh sách bọc {S} màu {C}")
L("almanac","book","65",0,9,5,"book","thread-bound almanac in a cover of {C} {S}","lịch thư đóng chỉ bìa {S} màu {C}")
L("pscroll","scroll","26 36 51",0,9,4,"scroll","painted scroll of {C} {S} on rollers of {H}","cuộn tranh {S} màu {C}, trục {H}")
L("pine","scroll","65",0,9,6,"scroll","hanging scroll of pine and cranes on {C} {S}, rollers of {H}","tranh tùng hạc trên {S} màu {C}, trục {H}")
L("letter","paper","18 26",0,6,2,"two","folded letter on {C} flower-patterned paper, tied with a silk cord","phong thư giấy hoa màu {C}, buộc dây lụa")
# boxes
L("casket","box","26 36 51 65",0,9,6,"box","small lidded jewel casket of {C} {B}, fittings of {H}{D}","tráp nữ trang nhỏ {B} màu {C}, bịt {H}{D}")
L("combbox","box","18 26",0,9,3,"box","small comb box of {C} {B}, fittings of {H}","hộp lược nhỏ {B} màu {C}, bịt {H}")
L("powder","box","18 26 36",0,9,4,"box","small round powder box of {C} {B}, lid rimmed with {H}","hộp phấn tròn nhỏ {B} màu {C}, nắp viền {H}")
L("incbox","box","36 51 65",0,9,6,"box","small incense box of {C} {B}, fittings of {H}","hộp hương nhỏ {B} màu {C}, bịt {H}")
L("gobox","box","26 36 51",0,9,4,"box","box of go stones of {C} {B}, fittings of {H}","hộp quân cờ vây {B} màu {C}, bịt {H}")
L("inkbox","box","36 51 65",0,9,5,"box","small inkstone case of {C} {B}, fittings of {H}","hộp nghiên mực nhỏ {B} màu {C}, bịt {H}")
L("pastebox","box","51 65",0,9,5,"box","small lidded seal-paste box of {C} {B}","hộp mực son nhỏ có nắp {B} màu {C}")
L("sealbox","box",ALL,8,8,9,"box","phoenix seal box of {C} {B}, fittings of {H}","hộp ấn phượng {B} màu {C}, bịt {H}",only={"t8"})
# pendants / hairpins / small worn things held in the hand
L("pend","pendant",ALL,0,9,4,"dangle","pendant of {C} {G} on a silk cord{D}","mặt bội {G} màu {C} trên dây lụa{D}",cols=JADE)
L("duckpend","pendant","18 26",0,9,3,"dangle","pair of mandarin ducks carved in {C} {G}, hung on a silk cord{D}","đôi uyên ương chạm {G} màu {C} trên dây lụa{D}",cols=JADE)
L("knot","pendant","18 26",0,6,2,"dangle","Chinese knot of {C} silk cord with a bead of {G}","nút thắt dây lụa màu {C}, hạt {G}")
L("hcomb","hairpin","26 36 51",0,9,4,"one","ornamental hair comb of {C} {G}, held in the hand","lược cài tóc {G} màu {C}, cầm tay",cols=JADE)
L("bfly","hairpin","18 26",0,9,2,"dangle","butterfly hairpin of {H} with {C} {G} wings, held in the hand{D}","trâm bướm {H} cánh {G} màu {C}, cầm tay{D}")
L("buyao","hairpin","18 26 36",2,7,5,"dangle","dangling hairpin (bộ diêu) of {H} with {C} {G} drops, held in the hand","trâm bộ diêu {H} rủ hạt {G} màu {C}, cầm tay")
L("phairpin","hairpin",ALL,8,8,9,"dangle","phoenix hairpin of {H} with {C} gem drops, held in the hand","trâm phượng {H} rủ hạt đá quý màu {C}, cầm tay",only={"t8"})
L("silkflower","hairpin","18",0,5,1,"sprig","{C} silk hair flower on a pin of {H}, held in the hand","trâm hoa lụa màu {C}, chân {H}, cầm tay")
L("kerchief","kerchief","26 36 51",0,9,3,"kerchief","handkerchief of {C} {S}, folded in the hand","khăn tay {S} màu {C}")
L("sachet","pouch","18 26 36",0,5,2,"dangle","sachet of {C} {S}{D}","túi thơm {S} màu {C}{D}")
L("purse","pouch","26 36 51",0,5,3,"dangle","small drawstring purse of {C} {S}{D}","túi rút dây nhỏ {S} màu {C}{D}")
L("perfume","flask","18 26 36",0,9,3,"one","small perfume flask of {C} {G}, stopper of {H}","lọ nước hoa nhỏ {G} màu {C}, nút {H}")
L("nseal","seal","26 36 51",0,9,4,"one","personal name seal of {C} {G} with a silk tassel","con dấu tên {G} màu {C}, tua lụa")
# flowers / baskets / needlework (t5 and below: basket, loose branch)
L("fbask","basket","18 26",0,5,2,"basket","small flower basket of {H} filled with fresh {C} flowers","giỏ hoa nhỏ {H} đựng hoa tươi màu {C}",cols=FLOWER)
L("fruitbask","basket","26 36",0,5,3,"basket","small basket of {H} with fresh fruit, lined with {C} silk","giỏ nhỏ {H} đựng trái cây, lót lụa màu {C}")
L("hoop","hoop","18 26 36",0,5,2,"hoop","embroidery hoop of {H} holding {C} {S} with a half-finished flower","khung thêu {H} căng {S} màu {C}, bông hoa thêu dở")
L("speony","sprig","18 26",0,9,3,"sprig","{C} artificial peony made of {S} on a stem of {H}","mẫu đơn kết bằng {S} màu {C}, cành {H}",cols=FLOWER)
L("lotus","sprig","18 26",0,5,2,"sprig","single {C} lotus flower on a long stem","một bông sen màu {C} cành dài",cols=["rose pink","pearl white"])
L("plum","sprig","18 26 36",0,5,2,"sprig","sprig of {C} plum blossoms","cành hoa mơ màu {C}",cols=["pearl white","rose pink","crimson"])
L("osman","sprig","26 36",0,5,3,"sprig","spray of {C} osmanthus tied with a silk ribbon","chùm hoa quế màu {C} buộc dải lụa",cols=["ivory white","amber"])
L("lotuspod","sprig","36 51",0,5,3,"sprig","dried lotus seed pod on a long stem tied with a {C} ribbon","đài sen khô cành dài buộc dải màu {C}")
L("chrys","sprig","51 65",0,5,4,"sprig","spray of {C} chrysanthemums tied with a ribbon of {S}","bó cúc màu {C} buộc dải {S}",cols=["ivory white","lilac","amber"])
# young play / music
L("ball","ball","18",0,9,2,"dangle","embroidered ball (tú cầu) of {C} {S}{D}","tú cầu {S} màu {C}{D}")
L("jianzi","toy","18",0,4,1,"one","feathered shuttlecock (quả cầu) with {C} feathers on a base of {H}","quả cầu lông màu {C}, đế {H}")
L("kite","toy","18",0,3,1,"two","small paper kite painted {C} like a swallow, its string wound on a reel of {H}","diều giấy nhỏ hình chim én màu {C}, ống chỉ {H}")
L("drum","toy","18",0,3,1,"one","small pellet drum (trống lắc) of {C} {B} with a handle of {H}","trống lắc nhỏ {B} màu {C}, cán {H}")
L("cricket","cage","18 26",0,5,2,"dangle","small cricket cage of {H} with a {C} silk tassel","lồng dế nhỏ {H}, tua lụa màu {C}")
L("birdcage","cage","26 36",0,9,4,"lantern","small birdcage of {H} with its {C} silk cover drawn back","lồng chim nhỏ {H}, tấm phủ lụa màu {C} vén lên")
L("flute","music","18 26",0,9,2,"flute","flute of {C} {B} with bands of {H}{D}, held across both hands","sáo {B} màu {C}, đai {H}{D}")
L("xiao","music","36 51",0,9,4,"flute","vertical flute (tiêu) of {C} {B} with bands of {H}, held across both hands","ống tiêu {B} màu {C}, đai {H}")
L("pipa","music","18 26 36",0,9,3,"two","small pipa lute with a {C} {B} body inlaid with {H}{D}","đàn tỳ bà nhỏ thân {B} màu {C}, khảm {H}{D}")
L("ruan","music","26 36 51",0,9,4,"two","small moon lute (nguyệt cầm) with a round {C} {B} body inlaid with {H}","đàn nguyệt nhỏ thân tròn {B} màu {C}, khảm {H}")
L("parasol","parasol","18 26 36",0,9,3,"one","closed parasol of {C} {S}, handle of {H}{D}","dù {S} màu {C} xếp lại, cán {H}{D}")
L("screen","screen","26 36 51",2,9,5,"two","small hand-held table screen of {C} {S} embroidered with flowers, frame of {H}","bình phong nhỏ cầm tay {S} màu {C} thêu hoa, khung {H}")
# mature / elder
L("brush","writing","36 51 65",0,9,4,"one","calligraphy brush with a {C} {B} shaft and a cap of {H}","bút lông cán {B} màu {C}, nắp {H}")
L("warmer","warmer","36 51 65",0,9,5,"two","small hand warmer of {H} in a cover of {C} {S}","lò sưởi tay nhỏ {H}, bọc {S} màu {C}")
L("iball","iball","36 51 65",2,9,6,"dangle","openwork incense ball of {H} hung on a {C} silk cord","cầu hương chạm thủng {H} trên dây lụa màu {C}")
L("whisk","whisk","51 65",0,9,5,"one","fly-whisk of {C} horsehair with a handle of {H}","phất trần lông đuôi ngựa màu {C}, cán {H}",cols=["ivory white","black","silver grey"])
L("staff","staff","65",0,9,6,"one","walking staff of {C} {B} topped with {H}","gậy chống {B} màu {C}, đầu {H}",cols=["sandalwood brown","black","moss green","indigo"])
L("hballs","balls","51 65",0,9,5,"two","pair of health balls of {C} {G} held in the palm","đôi bi dưỡng sinh {G} màu {C}",cols=JADE)
L("bell","bell","51 65",0,9,5,"dangle","small hand bell of {H} with a {C} silk tassel","chuông cầm tay nhỏ {H}, tua lụa màu {C}")
L("peach","carving","51 65",0,9,6,"two","carved longevity peach of {C} {G}","đào thọ chạm {G} màu {C}",cols=["rose pink","jade green","ivory white"])
L("guanyin","carving","51 65",0,9,6,"two","small statuette of Guanyin in {C} {G} on a base of {H}","tượng Quan Âm nhỏ {G} màu {C}, đế {H}",cols=JADE)
L("crane","carving","65",3,9,6,"stand","small carving of a crane in {C} {G} on a stand of {H}","tượng hạc nhỏ {G} màu {C}, đế {H}",cols=JADE)
L("mountain","stand","36 51 65",3,9,6,"stand","small mountain carving (sơn tử) of {C} {G} on a stand of {H}","núi đá chạm nhỏ (sơn tử) {G} màu {C}, đế {H}",cols=JADE)
L("lingzhi","stand","51 65",3,9,6,"stand","carved lingzhi fungus of {C} {G} on a stand of {H}","nấm linh chi chạm {G} màu {C}, đế {H}",cols=JADE)
L("coral","stand","36 51 65",6,9,8,"stand","small {C} coral branch on a stand of {H}","cành san hô nhỏ màu {C} trên đế {H}",cols=["rose pink","pearl white","coral"])
L("orchid","pot","36 51 65",0,9,4,"two","small potted orchid in a {C} glazed pot rimmed with {H}","chậu lan nhỏ men màu {C}, viền {H}")
L("bonsai","pot","51 65",0,9,5,"two","miniature pine in a small {C} glazed pot rimmed with {H}","chậu tùng nhỏ men màu {C}, viền {H}")
L("beads","beads","36 51 65",0,5,4,"dangle","string of {C} {G} beads{D}, held in the hand","chuỗi hạt {G} màu {C}{D}",only=None)
L("ruyi","ruyi","26 36 51 65",6,9,8,"ruyi","ruyi (như ý) of {C} {G}{D}","như ý {G} màu {C}{D}",cols=JADE)
L("censer","censer","36 51 65",7,9,8,"one","hand censer of {C} {B}, fittings of {H}{D}","lư hương cầm tay {B} màu {C}, bịt {H}{D}")
L("harp","harp","18 26 36",0,9,4,"two","small konghou harp with a {C} {B} frame inlaid with {H}","đàn không hầu nhỏ khung {B} màu {C}, khảm {H}")
L("disc","pendant","26 36 51",0,9,5,"dangle","carved disc (bích) of {C} {G} on a silk cord{D}","ngọc bích hình đĩa chạm {G} màu {C} trên dây lụa{D}",cols=JADE)
L("birdfig","carving","18 26 36",2,9,5,"stand","small figurine of a songbird on a flowering branch in {C} {B}, on a stand of {H}","tượng chim nhỏ đậu cành hoa {B} màu {C}, đế {H}")
L("pomegr","carving","26 36",0,9,4,"two","carved pomegranate of {C} {G}","quả lựu chạm {G} màu {C}",cols=["rose pink","jade green","ivory white","lavender"])
L("embstand","embroidery","26 36 51",2,9,5,"stand","small round double-sided embroidery of {C} {S} on a stand of {H}","tranh thêu hai mặt tròn nhỏ {S} màu {C}, đế {H}")
L("lychee","tray","18 26",0,9,3,"box","small tray of {C} {B} holding fresh lychees","khay nhỏ {B} màu {C} đựng vải tươi")
L("ladyfish","fish","51 65",0,9,5,"one","small wooden fish (mõ) of {C} {B}, with its striker","mõ nhỏ {B} màu {C} kèm dùi")
L("gourd","gourd","51 65",0,9,5,"dangle","small gourd (hồ lô) of {C} {B} carved with longevity characters, on a silk cord{D}","hồ lô nhỏ {B} màu {C} chạm chữ Thọ, trên dây lụa{D}")
L("persim","carving","51 65",0,9,5,"two","pair of carved persimmons of {C} {G}","đôi quả hồng chạm {G} màu {C}",cols=["jade green","ivory white","teal","celadon"])
L("citron","carving","51 65",2,9,6,"two","carved Buddha's-hand citron of {C} {G}","quả phật thủ chạm {G} màu {C}",cols=JADE)
L("pillbox","box","51 65",0,9,5,"box","small pill box of {C} {B}, fittings of {H}","hộp thuốc viên nhỏ {B} màu {C}, bịt {H}")
L("sutrascroll","scroll","51 65",0,9,5,"scroll","hand-copied sutra scroll of {C} {S} on rollers of {H}","cuộn kinh chép tay {S} màu {C}, trục {H}")
# Nữ đế only
L("sceptre","sceptre",ALL,9,9,9,"one","sceptre of {H} set with {C} jade{D}","quyền trượng {H} nạm ngọc màu {C}{D}",cols=JADE,only={"nude"})
L("edict","scroll",ALL,9,9,9,"scroll","imperial edict scroll of {C} {S} on rollers of {H}","thánh chỉ {S} màu {C}, trục {H}",only={"nude"})
L("hot","tablet",ALL,9,9,9,"two","court tablet (hốt) of {C} jade edged in {H}","hốt ngọc màu {C} viền {H}",cols=JADE,only={"nude"})
L("jseal","seal",ALL,9,9,9,"two","imperial seal (ngọc tỷ) of {C} jade with a dragon knob, mounted in {H}","ngọc tỷ màu {C} núm rồng, bịt {H}",cols=JADE,only={"nude"})
# ---- MAID: work items of the palace ({S} cloth, {H} wood, {D} trim of the maid rank)
M=lambda *a,**kw: k("maid",*a,**kw)
M("m_lant","lantern",ALL,0,9,3,"lantern","palace lantern of {C} {S} on a carrying pole of {H}{D}","đèn lồng {S} màu {C}, sào {H}{D}")
M("m_robe","fold",ALL,0,9,3,"two","neatly folded robe wrapped in {C} {S}","xấp áo gấp gọn bọc {S} màu {C}")
M("m_duster","duster",ALL,0,9,3,"one","feather duster of {C}-dyed feathers with a handle of {H}","chổi lông gà nhuộm màu {C}, cán {H}")
M("m_fan","fan","18 26 36",0,9,3,"rfan","plain round fan of {C} {S} with a handle of {H}","quạt tròn {S} màu {C}, cán {H}")
M("m_mirror","mirror","18 26",0,9,3,"mirror","her mistress's hand mirror wrapped in a {C} {S} cloth","gương cầm tay của chủ tử bọc khăn {S} màu {C}")
M("m_ftray","tray","18 26",0,9,2,"box","small tray of {H} with fresh fruit on a {C} cloth","khay nhỏ {H} đựng trái cây, lót khăn màu {C}")
M("m_fbask","basket","18 26",0,9,2,"basket","flower basket of {H} for the vases, with {C} flowers{D}","giỏ hoa {H} để cắm bình, hoa màu {C}{D}",cols=FLOWER)
M("m_tbask","basket","18 26 36",0,9,2,"basket","small sewing basket of {H} with skeins of {C} thread","giỏ chỉ khâu nhỏ {H}, cuộn chỉ màu {C}")
M("m_broom","broom","18 26",0,9,2,"one","small hand broom of {C}-bound straw with a handle of {H}","chổi nhỏ rơm buộc dây màu {C}, cán {H}")
M("m_ribbon","roll","18 26",0,9,2,"two","bundle of rolled {C} ribbons wrapped in {S}","cuộn dải lụa màu {C} bọc {S}")
M("m_cbox","box","18 26",0,9,3,"box","her mistress's comb box of {H} wrapped in a {C} cloth","hộp lược của chủ tử, {H}, bọc khăn màu {C}")
M("m_letter","paper","18 26",0,9,2,"two","folded letter in a {C} {S} envelope","phong thư bọc {S} màu {C}")
M("m_hoop","hoop","18 26 36",0,9,2,"hoop","embroidery hoop of {H} with {C} {S}","khung thêu {H}, mặt {S} màu {C}")
M("m_incbox","box","26 36",0,9,3,"box","incense box of {H} tied with a {C} cord","hộp hương {H} buộc dây màu {C}")
M("m_ptray","tray","26 36",0,9,3,"box","tray of {H} with pastries on a {C} cloth","khay {H} đựng bánh, lót khăn màu {C}")
M("m_bolt","roll","26 36",0,9,3,"two","roll of {C} fabric bound with a strip of {S}","cây vải màu {C} buộc dải {S}")
M("m_meds","packet","26 36 51",0,9,3,"two","bundle of medicine packets tied with {C} {S}","gói thuốc buộc dây {S} màu {C}")
M("m_sewbox","box","26 36 51",0,9,3,"box","sewing box of {H} with a {C} cloth lining","hộp kim chỉ {H}, lót vải màu {C}")
M("m_candle","candle","26 36",0,9,3,"two","bundle of {C} candles wrapped in {S}","bó nến màu {C} bọc {S}",cols=["ivory white","crimson","cream"])
M("m_umb","parasol","26 36 51",0,9,3,"one","closed oiled-paper umbrella of {C} paper, handle of {H}","dù giấy dầu màu {C} xếp lại, cán {H}")
M("m_pot","pot","26 36",0,9,3,"two","small potted flower in a {C} glazed pot","chậu hoa nhỏ men màu {C}")
M("m_pattern","paper","26 36",0,9,3,"two","rolled embroidery pattern sheets tied with a {C} cord","cuộn mẫu thêu buộc dây màu {C}")
M("m_food","carrier","36 51",0,9,4,"box","lidded food carrier of {H} with a {C} cloth wrapped on its handle","hộp đựng thức ăn có nắp {H}, quai quấn vải màu {C}")
M("m_keys","keys","36 51 65",0,9,4,"dangle","ring of keys on a {C} {S} cord","chùm chìa khóa dây {S} màu {C}")
M("m_ruler","ruler","36 51",0,9,4,"one","measuring ruler of {H} with a {C} cord","thước đo {H}, dây màu {C}")
M("m_brocade","fold","36 51",0,9,4,"two","folded length of {C} brocade on a board of {H}","xấp gấm màu {C} trên tấm lót {H}")
M("m_slip","paper","36 51",0,9,4,"one","list on a bamboo slip tied with {C} {S}","thẻ tre ghi danh mục buộc {S} màu {C}")
M("m_medbox","box","36 51 65",0,9,4,"box","small medicine box of {H} with a {C} label","hộp thuốc nhỏ {H}, nhãn màu {C}")
M("m_abacus","abacus","36 51 65",0,9,4,"two","abacus framed in {H} with {C} beads","bàn tính khung {H}, hạt màu {C}")
M("m_ledger","book","36 51 65",0,9,4,"book","account book bound in {C} {S}","sổ sách bọc {S} màu {C}")
M("m_bcase","case","36 51",0,9,4,"one","brush case of {H} with a {C} cord","ống bút {H}, dây màu {C}")
M("m_beads","beads","51 65",0,9,4,"dangle","string of {C} prayer beads{D}","chuỗi tràng hạt màu {C}{D}",cols=["sandalwood brown","black","jade green","ivory white"])
M("m_herbs","packet","51 65",0,9,4,"two","bundle of dried herbs tied with {C} {S}","bó thảo dược khô buộc {S} màu {C}")
M("m_warmer","warmer","51 65",0,9,4,"two","hand warmer of {H} in a cover of {C} {S}","lò sưởi tay {H}, bọc {S} màu {C}")
M("m_mend","basket","51 65",0,9,4,"basket","mending basket of {H} with folded {C} cloth","giỏ khâu vá {H}, vải gấp màu {C}")
M("m_cane","staff","65",0,9,5,"one","walking cane of {H} with a {C} cord{D}","gậy chống {H}, dây màu {C}{D}")
M("m_sutra","book","51 65",0,9,4,"book","sutra book bound in {C} {S}","kinh sách bọc {S} màu {C}")
M("m_incst","packet","51 65",0,9,4,"two","bundle of incense sticks wrapped in {C} {S}","bó nhang bọc {S} màu {C}")
M("m_whisk","whisk","51 65",0,9,4,"one","fly-whisk of {C} horsehair with a handle of {H}","phất trần lông đuôi ngựa màu {C}, cán {H}",cols=["ivory white","black","silver grey"])
M("m_almanac","paper","65",0,9,5,"one","rolled almanac tied with {C} {S}","cuộn lịch buộc {S} màu {C}")
M("m_chrys","basket","65",0,9,5,"basket","basket of {H} with dried {C} chrysanthemum petals","giỏ {H} đựng cánh cúc khô màu {C}",cols=["ivory white","amber","lilac"])
M("m_fish","fish","51 65",0,9,5,"one","small wooden fish (mõ) of {H} with its striker, on a {C} cord","mõ nhỏ {H} kèm dùi, dây màu {C}")
# ---- POOR (lãnh cung, nhà nghèo): wood, bamboo, clay, hemp, plain cloth only ({A} = old, worn / plain)
P=lambda *a,**kw: k("poor",*a,**kw)
P("p_fan","fan",ALL,0,9,1,"rfan","{A} bamboo-leaf fan edged with {C} cloth","quạt lá tre {A} viền vải màu {C}")
P("p_comb","comb",ALL,0,9,1,"one","{A} wooden comb wrapped in a {C} cloth","lược gỗ {A} gói trong khăn màu {C}")
P("p_bundle","bundle",ALL,0,9,1,"two","{A} {C} cloth bundle tied with a knot","tay nải vải {A} màu {C} thắt nút")
P("p_sprig","sprig","18 26",0,9,1,"sprig","sprig of {C} wild flowers tied with a {A} straw cord","cành hoa dại màu {C} buộc dây rơm {A}",cols=["cream","lilac","rose pink"])
P("p_wbask","basket","18 26",0,9,1,"basket","small {A} bamboo basket of {C} wild flowers","giỏ tre nhỏ {A} đựng hoa dại màu {C}",cols=["cream","lilac","rose pink"])
P("p_hemp","thread","18 26 36",0,9,1,"two","{A} skein of {C}-dyed hemp thread","con sợi gai {A} nhuộm màu {C}")
P("p_flute","music","18 26",0,9,1,"flute","{A} bamboo flute with a {C} cord","sáo trúc {A}, dây màu {C}")
P("p_lant","lantern","18 26 36",0,9,1,"lantern","small {A} {C} paper lantern on a bamboo stick","đèn giấy nhỏ {A} màu {C} trên que tre")
P("p_hsach","pouch","18 26 36",0,9,1,"dangle","{A} {C} cloth sachet of dried herbs","túi vải {A} màu {C} đựng thảo mộc khô")
P("p_mulb","basket","18 26",0,9,1,"basket","small {A} basket of mulberry leaves lined with {C} cloth","giỏ nhỏ {A} đựng lá dâu, lót vải màu {C}")
P("p_hoop","hoop","18 26 36",0,9,1,"hoop","{A} wooden embroidery hoop with {C} coarse cloth","khung thêu gỗ {A} căng vải thô màu {C}")
P("p_spindle","thread","26 36",0,9,1,"one","{A} wooden spindle wound with {C} thread","con suốt gỗ {A} quấn chỉ màu {C}")
P("p_fherbs","sprig","26 36",0,9,1,"sprig","bunch of fresh herbs tied with a {A} {C} cloth strip","bó rau thơm buộc dải vải {A} màu {C}")
P("p_orchid","pot","26 36 51",0,9,1,"two","small {A} {C}-glazed clay pot with an orchid sprout","chậu đất nhỏ {A} men màu {C} trồng mầm lan")
P("p_broom","broom","26 36 51",0,9,1,"one","small {A} straw broom bound with {C} cord","chổi rơm nhỏ {A} buộc dây màu {C}")
P("p_laundry","fold","26 36",0,9,1,"two","{A} folded {C} washed cloth","xấp vải giặt {A} màu {C} gấp gọn")
P("p_umb","parasol","26 36 51",0,9,1,"one","{A} closed {C} oiled-paper umbrella","dù giấy dầu {A} màu {C} xếp lại")
P("p_plum","sprig","26 36",0,9,1,"sprig","branch of {C} plum blossoms picked from the roadside","cành hoa mơ màu {C} hái ven đường",cols=["cream","rose pink"])
P("p_hanky","kerchief","26 36 51 65",0,9,1,"kerchief","{A} handkerchief embroidered with {C} thread","khăn tay {A} thêu chỉ màu {C}")
P("p_sewb","basket","36 51",0,9,1,"basket","{A} sewing basket with {C} thread","giỏ kim chỉ {A}, chỉ màu {C}")
P("p_sheets","paper","36 51 65",0,9,1,"two","hand-copied sutra sheets tied with a {A} {C} cord","xấp kinh chép tay buộc dây {A} màu {C}")
P("p_twigs","bundle2","36 51",0,9,1,"two","bundle of dry twigs tied with {A} {C} rope","bó củi nhỏ buộc dây {A} màu {C}")
P("p_greens","basket","26 36 51",0,9,1,"basket","small {A} basket of fresh greens lined with {C} cloth","rổ rau nhỏ {A}, lót vải màu {C}")
P("p_paddle","paddle","36 51",0,9,1,"one","{A} wooden laundry paddle with a {C} cloth grip","chày đập áo gỗ {A}, chuôi quấn vải màu {C}")
P("p_seeds","pouch","36 51",0,9,1,"dangle","small {A} {C} cloth pouch of seeds","túi vải nhỏ {A} màu {C} đựng hạt giống")
P("p_yarn","thread","36 51 65",0,9,1,"two","{A} ball of {C} coarse yarn","cuộn len thô {A} màu {C}")
P("p_beads","beads","51 65",0,9,1,"dangle","string of {A} wooden prayer beads with a {C} tassel","chuỗi tràng hạt gỗ {A}, tua màu {C}")
P("p_stick","staff","51 65",0,9,1,"one","{A} bamboo walking stick with a {C} cloth grip","gậy tre {A}, chuôi quấn vải màu {C}")
P("p_roots","packet","51 65",0,9,1,"two","bundle of dried medicinal roots in {A} {C} paper","bó rễ thuốc khô gói giấy {A} màu {C}")
P("p_sutra","book","51 65",0,9,1,"book","{A} thread-bound sutra with a {C} cover","cuốn kinh đóng chỉ {A}, bìa màu {C}")
P("p_inc","packet","51 65",0,9,1,"two","bundle of incense sticks in {A} {C} paper","bó nhang gói giấy {A} màu {C}")
P("p_chrys","sprig","51 65",0,9,1,"sprig","bundle of dried {C} chrysanthemums tied with {A} cord","bó cúc khô màu {C} buộc dây {A}",cols=["cream","lilac","rose pink"])
P("p_warm","warmer","51 65",0,9,1,"two","small {A} clay hand warmer wrapped in {C} cloth","lò sưởi tay đất nung nhỏ {A} bọc vải màu {C}")
P("p_keep","box","51 65",0,9,1,"box","small {A} wooden keepsake box tied with a {C} cord","hộp gỗ nhỏ {A} đựng kỷ vật, buộc dây màu {C}")
P("p_whisk","whisk","65",0,9,1,"one","{A} hemp fly-whisk with a {C} cord","phất trần sợi gai {A}, dây màu {C}")
P("p_cane","staff2","65",0,9,1,"one","{A} knotted-wood cane with a {C} cord","gậy gỗ mắt {A}, dây màu {C}")
P("p_fish","fish","65",0,9,1,"one","small {A} wooden fish (mõ) with its striker on a {C} cord","mõ gỗ nhỏ {A} kèm dùi, dây màu {C}")
# t6+ (and Nữ đế/Thái hậu) never: basket, sachet/purse, loose branch, bead string (Thái hậu may hold beads)
LOWONLY={"fbask","fruitbask","sachet","purse","lotus","plum","osman","lotuspod","chrys","beads","hoop","jianzi","kite","drum","rabbitlant","silkflower","cricket","knot","letter"}
def allowed(key,tier,age):
    d=K[key]
    if d["group"]!=GROUP[tier] or age not in d["ages"]: return False
    if d["only"] is not None: return tier in d["only"]
    Lv=LEVEL[tier]
    if key=="beads" and tier=="thaihau": return True
    if key in LOWONLY and (Lv>=6 or tier in("nude","thaihau")): return False
    if key in("ruyi","coral","censer") and tier in("nc","bd"): return False
    return d["lo"]<=Lv<=d["hi"]
FAMCAP={"box":3}
# ---------------------------------------------------------------- solver
def neighbours(t): return {b for a,b in ADJ if a==t}|{a for a,b in ADJ if b==t}
def solve(chain,seed):
    rnd=random.Random(seed); sel={}; use={}; row={t:set() for t in chain}; fam={t:{} for t in chain}
    todo={(t,a) for t in chain for a in AGES}
    def cands(t,a):
        banned=set()
        for n in neighbours(t): banned|=set(sel.get((n,a),[]))
        return [x for x in K if allowed(x,t,a) and x not in row[t] and x not in banned and use.get(x,0)<5]
    while todo:
        t,a=min(todo,key=lambda c:(len(cands(*c)),rnd.random())); todo.discard((t,a))
        cand=cands(t,a); rnd.shuffle(cand)
        cand.sort(key=lambda x:abs(K[x]["pref"]-min(LEVEL[t],8)*0.75-1)*0.6+use.get(x,0)*0.8+len(K[x]["ages"])*0.5-(3 if K[x]["only"] else 0)+rnd.random()*1.5)
        got=[]; fams=set()
        for x in cand:
            f=K[x]["fam"]
            if f in fams or fam[t].get(f,0)>=FAMCAP.get(f,2): continue
            got.append(x); fams.add(f)
            if len(got)==5: break
        if len(got)<5: return None
        sel[(t,a)]=got
        for x in got: use[x]=use.get(x,0)+1; row[t].add(x); fam[t][K[x]["fam"]]=fam[t].get(K[x]["fam"],0)+1
    return sel
def edge_colour(sel):
    """bipartite edge colouring cells x kinds with 5 colours (max degree 5, König) -> index of each kind inside its cell"""
    cu={c:{} for c in sel}; ku={}   # cu[cell][colour]=kind ; ku[kind][colour]=cell
    for c,ks in sel.items():
        for x in ks:
            ku.setdefault(x,{})
            a=next(i for i in range(5) if i not in cu[c]); b=next(i for i in range(5) if i not in ku[x])
            if a not in ku[x]: cu[c][a]=x; ku[x][a]=c; continue
            # flip the a/b alternating path starting at kind x
            path=[]; node=("k",x); col=a
            while True:
                if node[0]=="k":
                    if col not in ku[node[1]]: break
                    nxt=ku[node[1]][col]; path.append((nxt,node[1],col)); node=("c",nxt)
                else:
                    if col not in cu[node[1]]: break
                    nxt=cu[node[1]][col]; path.append((node[1],nxt,col)); node=("k",nxt)
                col=b if col==a else a
            for cc,kk,co in path: del cu[cc][co]; del ku[kk][co]
            for cc,kk,co in path:
                nc=b if co==a else a; cu[cc][nc]=kk; ku[kk][nc]=cc
            cu[c][a]=x; ku[x][a]=c
    return {c:[cu[c][i] for i in range(5)] for c in sel}
def palette(tier,age,key):
    d=K[key]; ex=EXCL.get(tier,set())
    if d["cols"]: base=[c for c in d["cols"] if c not in ex] or [c for c in JADE if c not in ex]
    elif GROUP[tier]=="poor" or tier=="tm0": base=POOR_PAL
    else: base=[c for c in AGE_PAL[age] if c not in ex]
    return base
def colours(tier,cells,seed):
    rnd=random.Random(seed); out={}; famcol={}; cnt={}
    for a in AGES:
        used=set(); row=[]
        for x in cells[a]:
            f=K[x]["fam"]; pal=palette(tier,a,x)
            opts=[c for c in pal if c not in used and c not in famcol.get(f,set())] or [c for c in pal if c not in used] or pal
            opts.sort(key=lambda c:(cnt.get(c,0),rnd.random())); c=opts[0]
            used.add(c); famcol.setdefault(f,set()).add(c); cnt[c]=cnt.get(c,0)+1; row.append(c)
        out[a]=row
    return out
def alt_colour(tier,c):
    fam=COL[c][1]; ex=EXCL.get(tier,set())
    src=POOR_ALT.get(fam,["indigo","moss green","cream"]) if (GROUP[tier]=="poor" or tier=="tm0") else ALT_FAM[fam]
    return next(x for x in src if x not in ex and COL[x][1]!=fam)
def fill(key,tier,c,vn):
    d=K[key]; t=d["vn" if vn else "en"]; i=1 if vn else 0; cv=COL[c][0] if vn else c
    g=GROUP[tier]
    if g=="lady": S,B,H,G,D=[m[i] for m in LMAT[tier]]; return t.format(C=cv,S=S,B=B,H=H,G=G,D=D)
    if g=="maid": S,H,D=[m[i] for m in MMAT[tier]]; return t.format(C=cv,S=S,H=H,D=D)
    return t.format(C=cv,A=PMAT[tier][i])
def _fixart(s): return re.sub(r"\ba ([aeiou])",r"an \1",s)
def build():
    data={};
    for chain_name,chain in CHAINS.items():
        for s in range(5000):
            sel=solve(chain,1000+s)
            if sel: break
        else: raise SystemExit("no solution for "+chain_name)
        idx=edge_colour(sel)
        for t in chain:
            cells={a:idx[(t,a)] for a in AGES}; cols=colours(t,cells,LEVEL[t]*7+len(t))
            data[t]={a:[dict(kind=x,family=K[x]["fam"],hand=K[x]["hand"],colour=c,colour_vn=COL[c][0],colour_family=COL[c][1],
                en=_fixart(fill(x,t,c,False)),vn=fill(x,t,c,True),alt_colour=alt_colour(t,c),
                en_alt=_fixart(fill(x,t,alt_colour(t,c),False)),vn_alt=fill(x,t,alt_colour(t,c),True)) for x,c in zip(cells[a],cols[a])] for a in AGES}
    return data
BAN=re.compile(r"\b(cup|teacup|teapot|bowl|goblet|chalice|wine|chén|tách|ấm trà|bát)\b",re.I)
def check(data):
    bad=[]
    for t,ages in data.items():
        allk=[]; famc={}
        for a,items in ages.items():
            ks=[i["kind"] for i in items]
            if len(items)!=5 or len(set(ks))!=5: bad.append(f"CELL {t} {a}")
            if len({i['family'] for i in items})!=5: bad.append(f"CELLFAM {t} {a}")
            if len({i['colour'] for i in items})!=5: bad.append(f"CELLCOL {t} {a}")
            allk+=ks
            for i in items:
                famc.setdefault(i["family"],[]).append(i["colour"])
                for s in (i["en"],i["vn"],i["en_alt"],i["vn_alt"]):
                    lo=s.lower()
                    if BAN.search(lo): bad.append(f"CUP {t} {a} {s}")
                    if ("phoenix" in lo or "phượng" in lo) and t!="t8": bad.append(f"PHOENIX {t} {a} {s}")
                    if re.search(r"\bdragon|\brồng\b",lo) and t!="nude": bad.append(f"DRAGON {t} {a} {s}")
                    if GROUP[t]=="poor" and re.search(r"jade|gold|silver|pearl|lacquer|silk|brocade|gem|ngọc|vàng|bạc|lụa|gấm",lo): bad.append(f"POOR-LUXE {t} {s}")
                if i["colour"] in EXCL.get(t,()) : bad.append(f"COLOUR-CLASH {t} {a} {i['colour']}")
                if COL[i["alt_colour"]][1]==i["colour_family"]: bad.append(f"ALT-SAME {t} {a}")
                x=i["kind"]
                if x in("ruyi","coral") and (LEVEL[t]<6 or t in("nc","bd")): bad.append(f"RESERVED {t} {x}")
                if x=="censer" and (LEVEL[t]<7 or t in("nc","bd")): bad.append(f"RESERVED {t} {x}")
                if x in LOWONLY and (LEVEL[t]>=6 or t in("nude","thaihau")) and not (x=="beads" and t=="thaihau"): bad.append(f"T6-LOW {t} {x}")
        if len(set(allk))!=25: bad.append(f"ROW-REPEAT {t}")
        for f,cs in famc.items():
            if len(cs)>FAMCAP.get(f,2): bad.append(f"FAMCAP {t} {f} {len(cs)}")
            if len(set(cs))!=len(cs): bad.append(f"SAME-FAMILY-SAME-COLOUR {t} {f} {cs}")
    for a_,b_ in ADJ:
        for a in AGES:
            s=set(i["kind"] for i in data[a_][a])&set(i["kind"] for i in data[b_][a])
            if s: bad.append(f"ADJ {a_}/{b_} {a} {s}")
    for cn,chain in CHAINS.items():   # pick column: person index never sees a kind twice over her ranks and ages
        for j in range(5):
            seen={}
            for t in chain:
                for a in AGES:
                    x=data[t][a][j]["kind"]
                    if x in seen: bad.append(f"COLUMN {cn} idx{j} {x} {seen[x]} & {t}/{a}")
                    seen[x]=f"{t}/{a}"
    return bad
def pick(data,tier,age,n,outfit_families=()):
    """BUILDER HOOK: person number n (c07 -> 7) -> her item at (tier, age). Returns (en, vn, hand, kind)."""
    it=data[tier][age][(n-1)%5]
    if it["colour_family"] in outfit_families: return it["en_alt"],it["vn_alt"],it["hand"],it["kind"]
    return it["en"],it["vn"],it["hand"],it["kind"]
ORDER=["nude","t8","t7","t6","t5","t4","t3","t2","t1","kc","thaihau","nc","bd","mama","tm4","tm3","tm2","tm1","tm0","lanh","ngheo"]
def md(data):
    o=["# ITEM LISTS — 5 held items per AGE for every rank (ART_RULES E11, owner Lượt 583)","",
    "Generated by `python3 dev/art/item_lists.py` (edit the .py, never this file). Machine form: `dev/art/item_lists.json`.","",
    "**How a builder picks:** person number *n* (c07 → 7) at rank/status *T* and age *A* holds `item_lists.json[T][A][(n-1) % 5]` — so 5 people in a row hold 5 different items, and the SAME person never holds the same kind of item twice over all her ranks and ages (checked: a kind never sits twice at one index inside a person-chain). Write the item's `en` text and its colour into the prompt (B16); if the item's `colour_family` equals one of her two outfit colour families, use `en_alt` (same item, `alt_colour`, another family). `hand` = the existing hand key (build.py HAND_LOW / hand7: rfan ffan mirror lantern vase book scroll box dangle kerchief basket sprig hoop flute ruyi stand one two).","",
    "**Guarantees (all checked by the script, 0 faults):** 5 different kinds + 5 different families + 5 different colours per cell · 25 different kinds per rank · adjacent ranks (kc→t1→…→t8→Nữ đế/Thái hậu, tm0→…→tm4→Ma ma, nhà nghèo↔lãnh cung) share NO item at the same age · luxury rises with the rank material · never cup/teacup/teapot/bowl · ruyi/coral t6+, hand censer t7+, phoenix + seal box t8 only, dragon/sceptre/edict/hốt/ngọc tỷ Nữ đế only · t6+ never basket/sachet/purse/loose flower branch/bead string (Thái hậu may hold beads) · t7/t8/Nữ đế/Thái hậu never a red/orange/yellow item · poor tiers no jade/gold/silver/silk.","",
    "Ages the builders draw today: Khuê các, Nhà nghèo a18/a26; Thái hậu a36/a51/a65; everyone else all five. The other ages are filled too, so no builder ever borrows a neighbour age's item.",""]
    for t in ORDER:
        o.append(f"## {TIER_NAME[t]} (`{t}`)\n\n| Age | 1 | 2 | 3 | 4 | 5 |\n|---|---|---|---|---|---|")
        for a in AGES:
            mark="" if a in DRAWN[t] else " (not drawn)"
            o.append(f"| {a}{mark} | "+" | ".join(f"{i['en']} — *{i['vn']}* · **{i['colour']}**" for i in data[t][a])+" |")
        o.append("")
    return "\n".join(o)
if __name__=="__main__":
    data=build(); bad=check(data)
    out={"rule":"ART_RULES E11 (owner Lượt 583)","generator":"dev/art/item_lists.py","ages":AGES,
         "pick":"item = tiers[T][A][(n-1)%5] for person number n; if item.colour_family is one of her outfit colour families use en_alt/vn_alt",
         "drawn_ages":DRAWN,"names":TIER_NAME,"tiers":data}
    json.dump(out,open(os.path.join(HERE,"item_lists.json"),"w"),ensure_ascii=False,indent=1)
    open(os.path.join(HERE,"ITEM_LISTS.md"),"w").write(md(data)+"\n")
    print("\n".join(bad)); print("tiers",len(data),"items",sum(len(v) for d in data.values() for v in d.values()),"bad",len(bad))
