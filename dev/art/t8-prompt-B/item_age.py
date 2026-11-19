# item_age.py — FIGURE_GATE 3e + 3f + H (owner 19/11 ~00:45Z): ONE table, cell = (AGE x RANK/STATUS) -> 10 items.
# Single source for build.py (pick_item) and for dev/art/item-rank-age.md (python3 item_age.py md > ../item-rank-age.md).
# N5c rewrite (ROOT-36 fault on b6b8233: one rank held the SAME 10 items at every age, only reordered):
#   * every AGE has its OWN pool of item KINDS per group; only 3 kinds per group are shared by all ages,
#     so a cell has at most 3 items that also appear in that rank's other ages (check: overlap <= 3);
#   * the KIND fixes WHAT the item is (suited to the age), the RANK fixes its MATERIAL (MAT), so luxury rises
#     rank by rank inside every age (same kind, richer material, 3e);
#   * reserved: ruyi t6+, hand censer t7+, phoenix (and the seal box) t8 only, dragons / sceptre / edict /
#     hốt / ngọc tỷ Nữ đế only; t6+ never basket, pouch/sachet, loose branch, rosary (Thái hậu may hold beads);
#     never a cup / bowl / teapot; nothing held over the face;
#   * groups: POOR (lãnh cung, nhà nghèo), MAID (cung nữ tm0–tm4, ma ma), LADY (khuê các, t1–t8, Thái hậu,
#     Nữ đế, princesses). Trung y holds no item (no row).
TIERS=["lanh","ngheo","tm0","tm1","tm2","tm3","tm4","mama","kc","t1","t2","t3","t4","t5","t6","t7","t8","thaihau","nude","nc","bd"]
TIER_NAME={"lanh":"Lãnh cung","ngheo":"Nhà nghèo","tm0":"tm0 Cung nữ thô sử","tm1":"tm1 Cung nữ","tm2":"tm2 Đại cung nữ",
"tm3":"tm3 Chưởng sự cô cô","tm4":"tm4 Nữ quan","mama":"Ma ma","kc":"Khuê các","t1":"t1 Đáp ứng","t2":"t2 Thường tại",
"t3":"t3 Quý nhân","t4":"t4 Tần","t5":"t5 Phi","t6":"t6 Quý phi","t7":"t7 Hoàng quý phi","t8":"t8 Hoàng hậu",
"thaihau":"Thái hậu","nude":"Nữ đế","nc":"Công chúa Nam Chiêu","bd":"Công chúa Bắc Địch"}
AGES=["a18","a26","a36","a51","a65"]
TIER_AGES={t:AGES for t in TIERS}; TIER_AGES.update({"ngheo":["a18","a26"],"kc":["a18","a26"],"thaihau":["a36","a51","a65"]})
GROUP={t:("poor" if t in("lanh","ngheo") else "maid" if t[:2]=="tm" or t=="mama" else "lady") for t in TIERS}
# luxury level inside the group (reserved kinds use it)
LEVEL={"lanh":0,"ngheo":1,"tm0":0,"tm1":1,"tm2":2,"tm3":3,"tm4":4,"mama":4,"kc":0,"t1":1,"t2":2,"t3":3,"t4":4,"t5":5,
"t6":6,"t7":7,"t8":8,"thaihau":7,"nude":9,"nc":5,"bd":5}
# Item cloth contrasts with the robe (D3c): Nữ đế / Thái hậu robes are yellow, so their item cloth is deep crimson / deep indigo.
# MATERIAL per rank: A = plain adjective (poor group), H = hard material, S = cloth, D = trailing trim ("" or ", with ...")
#        A_en, A_vn, H_en, H_vn, S_en, S_vn, D_en, D_vn
MAT={
"lanh":("old, worn","cũ sờn","","","","","",""),
"ngheo":("plain","mộc","","","","","",""),
"tm0":("","","rough plain wood","gỗ thô","coarse undyed cotton","vải thô mộc","",""),
"tm1":("","","plain wood","gỗ mộc","plain blue cotton","vải bông xanh","",""),
"tm2":("","","smooth polished wood","gỗ đánh bóng","dyed cotton","vải nhuộm",", with a cotton cord tassel",", tua dây vải"),
"tm3":("","","lacquered wood","gỗ sơn then","plain silk","lụa trơn",", with a small silk tassel",", tua lụa nhỏ"),
"tm4":("","","red-lacquered wood with brass fittings","gỗ sơn son bịt đồng","fine plain silk","lụa mịn",", with a silk tassel and a brass bead",", tua lụa hạt đồng"),
"mama":("","","dark lacquered wood with brass fittings","gỗ sơn then bịt đồng","dark fine silk","lụa mịn màu trầm",", with a dark silk tassel",", tua lụa màu trầm"),
"kc":("","","plain carved wood","gỗ chạm mộc","painted cotton-silk","lụa vẽ",", with a cotton-silk cord",", dây lụa"),
"t1":("","","smooth bamboo","tre mài nhẵn","plain silk","lụa trơn",", with a small silk cord",", dây lụa nhỏ"),
"t2":("","","lacquered wood","gỗ sơn mài","embroidered silk","lụa thêu",", with a small silk tassel",", tua lụa nhỏ"),
"t3":("","","red lacquer with silver fittings","sơn son bịt bạc","finely embroidered silk","lụa thêu tinh xảo",", with a silk tassel and a silver bead",", tua lụa hạt bạc"),
"t4":("","","carved jade","ngọc chạm","silk brocade","gấm lụa",", with a jade tassel",", tua ngọc"),
"t5":("","","gold-inlaid lacquer","sơn mài khảm vàng","gold-thread brocade","gấm kim tuyến",", with a gem tassel",", tua đá quý"),
"t6":("","","white jade mounted in gold","bạch ngọc nạm vàng","pearl-embroidered silk","lụa thêu ngọc trai",", with pearl tassels",", tua ngọc trai"),
"t7":("","","gold filigree set with gems","vàng chạm lưới nạm đá quý","gold silk inlaid with kingfisher feathers","lụa vàng điểm lông chim trả",", with gem tassels",", tua đá quý"),
"t8":("","","gold carved with phoenixes and set with pearls","vàng chạm phượng nạm ngọc trai","imperial silk embroidered with phoenixes","lụa ngự thêu phượng",", with pearl phoenix tassels",", tua phượng ngọc trai"),
"thaihau":("","","dark sandalwood with gilt-bronze mounts","trầm hương bịt đồng mạ vàng","deep indigo brocade with a gold longevity pattern","gấm chàm thẫm hoa văn chữ Thọ vàng",", with a deep indigo-and-gold tassel",", tua chàm thẫm điểm vàng"),
"nude":("","","gold carved with dragons","vàng chạm rồng","deep crimson silk embroidered with gold dragons","lụa đỏ thẫm thêu rồng vàng",", with crimson-and-gold dragon tassels",", tua đỏ thẫm hạt rồng vàng"),
"nc":("","","chased silver","bạc chạm","batik-edged silk","lụa viền batik",", with a silver camellia tassel",", tua bạc hoa trà"),
"bd":("","","silver inlaid with turquoise","bạc nạm lam ngọc","fur-trimmed felt","nỉ viền lông",", with coral beads",", chuỗi san hô"),
}
# KIND: name -> (en template, vn template, rule); rule: None | ("max",L) | ("min",L) | ("only",{tiers}) | ("max+",L,{tiers})
K={}
def k(name,en,vn,rule=None): K[name]=(en,vn,rule)
# ---- LADY (khuê các, t1–t8, Thái hậu, Nữ đế, princesses) ----
k("rfan","round fan of {S}, handle of {H}{D}","quạt tròn {S}, cán {H}{D}")
k("ffan","folding fan of {S}, ribs of {H}{D}","quạt xếp {S}, nan {H}{D}")
k("mirror","hand mirror framed in {H}{D}","gương cầm tay khung {H}{D}")
# a18 — young, lively
k("ball","embroidered ball (tú cầu) of {S}{D}","tú cầu {S}{D}")
k("slant","small lantern of {S} on a short stick of {H}{D}","đèn lồng nhỏ {S}, cán {H}{D}")
k("flute","flute of {H}{D}, held across both hands","sáo {H}{D}")
k("bfly","butterfly hair ornament of {H} held in the hand{D}","trâm bướm {H} cầm tay{D}")
k("fbask","small flower basket of {H} with fresh flowers{D}","giỏ hoa nhỏ {H} cắm hoa tươi{D}",("max",5))
k("sachet","sachet of {S}{D}","túi thơm {S}{D}",("max",5))
k("hoop","embroidery hoop of {H} with a half-finished flower on {S}","khung thêu {H}, mặt {S} thêu dở bông hoa",("max",5))
k("speony","artificial peony made of {S} on a stem of {H}","mẫu đơn kết bằng {S}, cành {H}")
k("pipa","small pipa lute inlaid with {H}{D}","đàn tỳ bà nhỏ khảm {H}{D}")
k("parasol","closed parasol of {S}, handle of {H}{D}","dù {S} xếp lại, cán {H}{D}")
k("sceptre","sceptre of {H}{D}","quyền trượng {H}{D}",("only",{"nude"}))
# a26 — poised young woman
k("sealbox","seal box of {H}{D}","hộp ấn {H}{D}",("only",{"t8"}))
k("edict","imperial edict scroll of {S} on rollers of {H}","thánh chỉ {S}, trục {H}",("only",{"nude"}))
k("vase","small vase of {H} with a flower sprig","bình hoa nhỏ {H} cắm một cành hoa")
k("pbook","poetry book bound in {S}, clasps of {H}","tập thơ bọc {S}, khóa {H}")
k("pscroll","painted scroll of {S} on rollers of {H}","cuộn tranh {S}, trục {H}")
k("combbox","small comb box of {H}{D}","hộp lược nhỏ {H}{D}")
k("plant","palace lantern of {S} on a frame of {H}{D}","đèn cung đình {S}, khung {H}{D}")
k("gobox","box of go stones of {H}","hộp quân cờ vây {H}")
k("pend","pendant of {H} on a silk cord{D}","mặt bội {H} trên dây lụa{D}")
# a36 — mature lady
k("ruyi","ruyi (như ý) of {H}{D}","như ý {H}{D}",("min",6))
k("hot","court tablet (hốt) of jade edged in {H}","hốt ngọc viền {H}",("only",{"nude"}))
k("incbox","small incense box of {H}{D}","hộp hương nhỏ {H}{D}")
k("casket","small lidded jewel casket of {H}{D}","tráp nữ trang nhỏ {H}{D}")
k("hanky","handkerchief of {S}, folded in the hand","khăn tay {S}")
k("orchid","small potted orchid in a pot of {H}","chậu lan nhỏ {H}")
k("powder","small lidded powder box of {H}","hộp phấn nhỏ {H}")
k("hcomb","ornamental hair comb of {H}, held in the hand","lược cài tóc {H} cầm tay")
k("beads","string of beads of {H}{D}, held in the hand","chuỗi hạt {H}{D}",("max+",5,{"thaihau"}))
# a51 — elder lady, calm and devout
k("censer","hand censer of {H}{D}","lư hương cầm tay {H}{D}",("min",7))
k("jseal","imperial jade seal (ngọc tỷ) mounted in {H}","ngọc tỷ bịt {H}",("only",{"nude"}))
k("sutra","sutra book bound in {S}","kinh sách bọc {S}")
k("warmer","small hand warmer of {H} in a cover of {S}","lò sưởi tay nhỏ {H}, bọc {S}")
k("brush","calligraphy brush with a shaft of {H}{D}","bút lông cán {H}{D}")
k("iball","openwork incense ball of {H} on a cord{D}","cầu hương chạm thủng {H}{D}")
k("whisk","fly-whisk with a handle of {H}{D}","phất trần cán {H}{D}")
k("album","painting album bound in {S}","tập tranh bọc {S}")
k("pouch","small drawstring pouch of {S}{D}","túi gấm rút dây {S}{D}",("max",5))
k("coral","small coral branch on a stand of {H}","cành san hô nhỏ trên đế {H}",("min",6))
# a65 — old lady, longevity
k("staff","walking staff of {H}{D}","gậy chống {H}{D}")
k("peach","carved longevity peach of {H}","đào thọ chạm {H}")
k("almanac","thread-bound almanac in a cover of {S}","lịch thư đóng chỉ bìa {S}")
k("pastebox","small lidded seal-paste box of {H}","hộp mực son nhỏ {H}")
k("pine","hanging scroll of pine and cranes on {S}, rollers of {H}","tranh tùng hạc trên {S}, trục {H}")
k("hballs","pair of health balls of {H} held in the palm","đôi bi dưỡng sinh {H}")
k("chrys","spray of chrysanthemums tied with a ribbon of {S}","bó cúc buộc dải {S}",("max",5))
k("bell","small hand bell of {H}{D}","chuông cầm tay nhỏ {H}{D}")
# ---- MAID (cung nữ tm0–tm4, ma ma): work items of the palace ----
k("m_lant","palace lantern of {S} on a carrying pole of {H}{D}","đèn lồng {S}, sào {H}{D}")
k("m_robe","neatly folded robe wrapped in {S}","xấp áo gấp gọn bọc {S}")
k("m_duster","feather duster with a handle of {H}","chổi lông gà cán {H}")
k("m_ftray","small tray of {H} with fresh fruit","khay nhỏ {H} đựng trái cây")
k("m_fbask","flower basket of {H} for the vases{D}","giỏ hoa {H} để cắm bình{D}")
k("m_tbask","small sewing basket of {H} with thread","giỏ chỉ khâu nhỏ {H}")
k("m_broom","small hand broom with a handle of {H}","chổi nhỏ cán {H}")
k("m_ribbon","bundle of rolled ribbons wrapped in {S}","cuộn dải lụa bọc {S}")
k("m_cbox","her mistress's comb box of {H}","hộp lược của chủ tử, {H}")
k("m_letter","folded letter in an envelope of {S}","phong thư bọc {S}")
k("m_incbox","incense box of {H} carried for the hall","hộp hương {H}")
k("m_ptray","tray of {H} with pastries","khay {H} đựng bánh")
k("m_hoop","embroidery hoop of {H} with plain {S}","khung thêu {H}, mặt {S}")
k("m_bolt","roll of fabric bound with a strip of {S}","cây vải buộc dải {S}")
k("m_meds","bundle of medicine packets tied with {S}","gói thuốc buộc dây {S}")
k("m_sewbox","sewing box of {H}","hộp kim chỉ {H}")
k("m_candle","bundle of candles wrapped in {S}","bó nến bọc {S}")
k("m_food","lidded food carrier of {H}","hộp đựng thức ăn có nắp {H}")
k("m_keys","ring of keys on a cord of {S}","chùm chìa khóa dây {S}")
k("m_umb","closed oiled-paper umbrella, handle of {H}","dù giấy dầu xếp, cán {H}")
k("m_ruler","measuring ruler of {H}","thước đo {H}")
k("m_brocade","folded length of brocade on a board of {H}","xấp gấm trên tấm lót {H}")
k("m_slip","list on a bamboo slip tied with {S}","thẻ tre ghi danh mục buộc {S}")
k("m_medbox","small medicine box of {H}","hộp thuốc nhỏ {H}")
k("m_abacus","abacus framed in {H}","bàn tính khung {H}")
k("m_ledger","account book bound in {S}","sổ sách bọc {S}")
k("m_beads","string of prayer beads of {H}{D}","chuỗi tràng hạt {H}{D}")
k("m_herbs","bundle of dried herbs tied with {S}","bó thảo dược khô buộc {S}")
k("m_warmer","hand warmer of {H} in a cover of {S}","lò sưởi tay {H}, bọc {S}")
k("m_bcase","brush case of {H}","ống bút {H}")
k("m_mend","mending basket of {H}","giỏ khâu vá {H}")
k("m_cane","walking cane of {H}{D}","gậy chống {H}{D}")
k("m_sutra","sutra book bound in {S}","kinh sách bọc {S}")
k("m_incst","bundle of incense sticks wrapped in {S}","bó nhang bọc {S}")
k("m_whisk","horsehair fly-whisk with a handle of {H}","phất trần cán {H}")
k("m_almanac","rolled almanac tied with {S}","cuộn lịch buộc {S}")
k("m_chrys","basket of {H} with dried chrysanthemum petals","giỏ {H} đựng cánh cúc khô")
k("m_fish","small wooden fish (mõ) of {H} with its striker","mõ nhỏ {H} kèm dùi")
# ---- POOR (lãnh cung, nhà nghèo): wood, bamboo, clay, hemp, plain cloth only ----
k("p_fan","{A} bamboo-leaf fan","quạt lá tre {A}")
k("p_comb","{A} wooden comb wrapped in cloth","lược gỗ {A} gói trong khăn")
k("p_bundle","{A} cloth bundle tied with a knot","tay nải vải {A} thắt nút")
k("p_sprig","sprig of wild flowers tied with a {A} straw cord","cành hoa dại buộc dây rơm {A}")
k("p_wbask","small {A} bamboo basket of wild flowers","giỏ tre nhỏ {A} đựng hoa dại")
k("p_hemp","{A} skein of hemp thread","con sợi gai {A}")
k("p_flute","{A} bamboo flute","sáo trúc {A}")
k("p_lant","small {A} paper lantern on a bamboo stick","đèn giấy nhỏ {A} trên que tre")
k("p_orchid","small {A} clay pot with an orchid sprout","chậu đất nhỏ {A} trồng mầm lan")
k("p_hsach","{A} cloth sachet of dried herbs","túi vải {A} đựng thảo mộc khô")
k("p_spindle","{A} wooden spindle with spun thread","con suốt gỗ {A} quấn chỉ")
k("p_mulb","small {A} basket of mulberry leaves","giỏ nhỏ {A} đựng lá dâu")
k("p_fherbs","bunch of fresh herbs tied with {A} straw","bó rau thơm buộc rơm {A}")
k("p_hoop","{A} wooden embroidery hoop with coarse cloth","khung thêu gỗ {A} căng vải thô")
k("p_broom","small {A} straw broom","chổi rơm nhỏ {A}")
k("p_laundry","{A} folded washed cloth","xấp vải giặt {A} gấp gọn")
k("p_sewb","{A} sewing basket with needle and thread","giỏ kim chỉ {A}")
k("p_sheets","hand-copied sutra sheets tied with a {A} cord","xấp kinh chép tay buộc dây {A}")
k("p_umb","{A} closed oiled-paper umbrella","dù giấy dầu {A} xếp lại")
k("p_plum","branch of plum blossoms picked from the roadside","cành hoa mơ hái ven đường")   # TY0 fix1: replaces p_lamp (drawn as a teapot, 2K sample); wording = FIGURE_GATE H NHÀ NGHÈO #8 verbatim
k("p_twigs","bundle of dry twigs tied with {A} rope","bó củi nhỏ buộc dây {A}")
k("p_greens","small {A} basket of fresh greens","rổ rau nhỏ {A}")
k("p_paddle","{A} wooden laundry paddle","chày đập áo gỗ {A}")
k("p_sandals","pair of {A} straw sandals","đôi dép rơm {A}")
k("p_beads","string of {A} wooden prayer beads","chuỗi tràng hạt gỗ {A}")
k("p_stick","{A} bamboo walking stick","gậy tre {A}")
k("p_roots","bundle of dried medicinal roots in {A} paper","bó rễ thuốc khô gói giấy {A}")
k("p_sutra","{A} thread-bound sutra","cuốn kinh đóng chỉ {A}")
k("p_seeds","small {A} cloth pouch of seeds","túi vải nhỏ {A} đựng hạt giống")
k("p_inc","bundle of incense sticks in {A} paper","bó nhang gói giấy {A}")
k("p_whisk","{A} hemp fly-whisk","phất trần sợi gai {A}")
k("p_cane","{A} knotted-wood cane","gậy gỗ mắt {A}")
k("p_fish","small {A} wooden fish (mõ) with its striker","mõ gỗ nhỏ {A} kèm dùi")
k("p_chrys","bundle of dried chrysanthemums tied with {A} cord","bó cúc khô buộc dây {A}")
k("p_warm","small {A} clay hand warmer wrapped in cloth","lò sưởi tay đất nung nhỏ {A} bọc vải")
k("p_keep","small {A} wooden keepsake box","hộp gỗ nhỏ {A} đựng kỷ vật")
k("p_yarn","{A} ball of coarse yarn","cuộn len thô {A}")
k("p_hanky","{A} embroidered handkerchief","khăn tay thêu {A}")
# POOL[group][age]: kinds in priority order (first 3 = the only kinds shared by every age of the group);
# reserved kinds sit right after the shared 3 so the rank that owns them always gets them.
_LS=["rfan","ffan","mirror"]; _MS=["m_lant","m_robe","m_duster"]; _PS=["p_fan","p_comb","p_bundle"]
POOL={"lady":{
 "a18":_LS+["sceptre","ball","slant","flute","bfly","fbask","sachet","hoop","speony","pipa","parasol"],
 "a26":_LS+["sealbox","edict","vase","pbook","pscroll","combbox","plant","gobox","pend"],
 "a36":_LS+["ruyi","hot","incbox","casket","hanky","orchid","powder","hcomb","beads"],
 "a51":_LS+["censer","jseal","sutra","warmer","brush","iball","whisk","album","pouch","coral"],
 "a65":_LS+["staff","peach","almanac","pastebox","pine","hballs","chrys","bell"]},
"maid":{
 "a18":_MS+["m_ftray","m_fbask","m_tbask","m_broom","m_ribbon","m_cbox","m_letter"],
 "a26":_MS+["m_incbox","m_ptray","m_hoop","m_bolt","m_meds","m_sewbox","m_candle"],
 "a36":_MS+["m_food","m_keys","m_umb","m_ruler","m_brocade","m_slip","m_medbox"],
 "a51":_MS+["m_abacus","m_ledger","m_beads","m_herbs","m_warmer","m_bcase","m_mend"],
 "a65":_MS+["m_cane","m_sutra","m_incst","m_whisk","m_almanac","m_chrys","m_fish"]},
"poor":{
 "a18":_PS+["p_sprig","p_wbask","p_hemp","p_flute","p_lant","p_orchid","p_hsach"],
 "a26":_PS+["p_spindle","p_mulb","p_fherbs","p_hoop","p_broom","p_laundry","p_sewb"],
 "a36":_PS+["p_sheets","p_umb","p_plum","p_twigs","p_greens","p_paddle","p_sandals"],
 "a51":_PS+["p_beads","p_stick","p_roots","p_sutra","p_seeds","p_inc","p_whisk"],
 "a65":_PS+["p_cane","p_fish","p_chrys","p_warm","p_keep","p_yarn","p_hanky"]}}
def allowed(kind,tier):
    r=K[kind][2]; L=LEVEL[tier]
    if r is None: return True
    if r[0]=="max": return L<=r[1]
    if r[0]=="min": return L>=r[1] and tier not in("nc","bd")
    if r[0]=="only": return tier in r[1]
    if r[0]=="max+": return L<=r[1] or tier in r[2]
def fill(kind,tier,vn=False):
    A,Av,H,Hv,S,Sv,D,Dv=MAT[tier]; t=K[kind][1 if vn else 0]
    return t.format(A=Av if vn else A,H=Hv if vn else H,S=Sv if vn else S,D=Dv if vn else D)
def cell_kinds(age,tier):
    return [x for x in POOL[GROUP[tier]][age] if allowed(x,tier)][:10]
def cell(age,tier,vn=False):
    return [fill(x,tier,vn) for x in cell_kinds(age,tier)]
_ITEM2KIND={}
def kind_of(item):
    if not _ITEM2KIND:
        for t in TIERS:
            for a in TIER_AGES[t]:
                for x in cell_kinds(a,t): _ITEM2KIND[fill(x,t)]=x
    return _ITEM2KIND.get(item)
OFFSET={"nude":5}   # Nữ đế and Hoàng hậu share the lady pool: shift so her Nữ đế item is never the same kind as her t8 item
def pick_kind(c,age,tier):
    """Person cNN at age: rotate by person index; never the same KIND at two of her ages (owner 3f)."""
    n=int(c[1:]) if c[1:].isdigit() else sum(map(ord,c))
    used=set()
    for a in AGES:
        if a not in TIER_AGES[tier]: continue
        L=cell_kinds(a,tier); i=(n-1+OFFSET.get(tier,0))%len(L)
        for j in range(len(L)):
            x=L[(i+j)%len(L)]
            if x not in used: break
        used.add(x)
        if a==age: return x
    raise KeyError((c,age,tier))
def pick_item(c,age,tier,vn=False):
    return fill(pick_kind(c,age,tier),tier,vn)
def check():
    import re
    bad=[]
    for t in TIERS:
        for a in TIER_AGES[t]:
            ks=cell_kinds(a,t)
            if len(ks)<10: bad.append(f"SHORT {a} {t} {len(ks)}")
            items=cell(a,t)
            if len(set(items))!=10: bad.append(f"DUP {a} {t}")
            other=set(i for b in TIER_AGES[t] if b!=a for i in cell(b,t))
            ov=[i for i in items if i in other]
            if len(ov)>3: bad.append(f"OVERLAP {a} {t} {len(ov)}: {ov}")
            for i in items+cell(a,t,True):
                lo=i.lower()
                if re.search(r"\b(cup|teacup|teapot|bowl|goblet|chén|tách|ấm trà|bát)\b",lo): bad.append(f"CUP {a} {t} {i}")
                if ("phoenix" in lo or "phượng" in lo) and t!="t8": bad.append(f"PHOENIX {a} {t} {i}")
                if re.search(r"\bdragon|\brồng\b",lo) and t!="nude": bad.append(f"DRAGON {a} {t} {i}")
                if t=="nude" and ("phoenix" in lo or "phượng" in lo): bad.append(f"NUDE-PHOENIX {a} {i}")
                if GROUP[t]=="poor" and re.search(r"jade|gold|silver|pearl|lacquer|silk|brocade|gem|ngọc|vàng|bạc|lụa|gấm",lo): bad.append(f"POOR-LUXE {a} {t} {i}")
                if t=="kc" and re.search(r"gold|jade|vàng|ngọc",lo): bad.append(f"KC-LUXE {a} {t} {i}")
            for x in ks:
                if x in("ruyi","coral") and (LEVEL[t]<6 or t in("nc","bd")): bad.append(f"RESERVED-RUYI {a} {t}")
                if x=="censer" and LEVEL[t]<7: bad.append(f"RESERVED-CENSER {a} {t}")
                if LEVEL[t]>=6 and GROUP[t]=="lady" and x in("fbask","sachet","pouch","chrys") : bad.append(f"T6-LOWITEM {a} {t} {x}")
                if x=="beads" and LEVEL[t]>=6 and t!="thaihau": bad.append(f"T6-BEADS {a} {t}")
    # luxury: inside every age, every lady rank t1..t8 differs from the rank below in every item (material ladder)
    for g in ("lady",):
        for a in AGES:
            for lo_,hi_ in zip(["kc","t1","t2","t3","t4","t5","t6","t7"],["t1","t2","t3","t4","t5","t6","t7","t8"]):
                if a in TIER_AGES[lo_] and set(cell(a,lo_))&set(cell(a,hi_)): bad.append(f"SAME-ITEM {a} {lo_}/{hi_}")
    for t in TIERS:
        for n in range(1,53):
            c=f"c{n:02d}"; ks=[pick_kind(c,a,t) for a in TIER_AGES[t]]
            if len(set(ks))!=len(ks): bad.append(f"REPEAT {t} {c} {ks}")
    for n in range(1,53):
        c=f"c{n:02d}"
        for a in AGES:
            if pick_kind(c,a,"nude")==pick_kind(c,a,"t8"): bad.append(f"NUDE=T8 {c} {a}")
    return bad
if __name__=="__main__":
    import sys
    if sys.argv[1:2]==["md"]:
        print("# Held items by AGE x RANK/STATUS (FIGURE_GATE 3e + 3f + H; generated by dev/art/t8-prompt-B/item_age.py md — edit the .py, never this file)\n")
        print("Rules: one item; never a cup/bowl/teapot; nothing over the face; each AGE has its own kinds of item (only 3 kinds per group are shared by all ages, check overlap <= 3); the RANK sets the material, so luxury rises rank by rank inside every age; ruyi t6+, hand censer t7+, phoenix and seal box t8 only, dragon / sceptre / edict / hốt / ngọc tỷ Nữ đế only; t6+ never basket, sachet/pouch, loose branch or rosary (Thái hậu may hold beads); each person holds a DIFFERENT kind at each of her ages (builder pick_item). Format: English prompt text — Vietnamese name.\n")
        for a in AGES:
            print(f"## {a}\n\n| Rank / status | 10 items |\n|---|---|")
            for t in TIERS:
                if a in TIER_AGES[t]:
                    print(f"| {TIER_NAME[t]} | "+" · ".join(f"{i+1} {e} — *{v}*" for i,(e,v) in enumerate(zip(cell(a,t),cell(a,t,True))))+" |")
            print()
    elif sys.argv[1:2]==["check"]:
        b=check(); print("\n".join(b)); print("bad",len(b))
    elif sys.argv[1:2]==["pick"]:
        print(pick_item(sys.argv[2],sys.argv[3],sys.argv[4]))
