# mkcat.py OUT.js : writes the wardrobe catalogue module (j92cat.js) for j92.
# 13 tiers x (10 trâm + 10 y phục) = 260 items + ngự tứ + mourning. Grades per tier: 4 Thường, 3 Tinh phẩm, 2 Trân phẩm, 1 Tuyệt phẩm.
import sys, json
TIERS = [  # key, P (phẩm phục scale used by j92 rules), name
 ("m0", -2, "Cung nữ thô sử"), ("m1", -1.5, "Cung nữ"), ("m2", -1, "Đại cung nữ"), ("m3", -0.5, "Chưởng sự cô cô"), ("m4", 0, "Nữ quan"),
 ("dapung", 1, "Đáp ứng"), ("thuongtai", 2, "Thường tại"), ("quynhan", 3, "Quý nhân"), ("tan", 4, "Tần"),
 ("phi", 5, "Phi"), ("quyphi", 6, "Quý phi"), ("hqp", 7, "Hoàng quý phi"), ("hh", 8, "Hoàng hậu")]
GY = [0, 0, 0, 0, 1, 1, 1, 2, 2, 3]  # y phục 01..10
# y phục: (name, colour family)  colour do/vang = festive (forbidden in quốc tang)
Y = {
"m0": [("Nhu quần lam nhạt viền hoa nhỏ","lam"),("Nhu quần hồng đào váy ngà","hong"),("Nhu quần tím nhạt thêu mai","tim"),("Nhu quần mơ viền dải thêu","cam"),("Nhu quần lam đai hồng","lam"),
       ("Nhu quần hồng phấn viền hoa","hong"),("Nhu quần tím lan thêu lan nhỏ","tim"),("Nhu quần san hô váy đào","hong"),("Nhu quần ngà váy tím","trang"),("Nhu quần hồng vạt yếm thêu","hong")],
"m1": [("Áo lục nhạt, tỷ giáp ngà thêu hoa","xanh"),("Áo xanh rêu đai xanh","xanh"),("Áo lam tro, tỷ giáp lam","lam"),("Áo mơ, vạt yếm đào","cam"),("Áo san hô, tỷ giáp hồng","hong"),
       ("Áo lam nhạt, tỷ giáp dài kết tua","lam"),("Áo hồng, tỷ giáp hồng thêu","hong"),("Áo vàng bơ, tỷ giáp ngà","vang"),("Áo tím nhạt, tỷ giáp kết tua","tim"),("Áo ngà xanh, tỷ giáp dài đai dệt","trang")],
"m2": [("Bộ áo hồng nhiều lớp viền mẫu đơn","hong"),("Bộ áo lam nhạt viền chỉ bạc","lam"),("Bộ áo mơ viền hoa mai","cam"),("Bộ áo tím lan nhiều lớp","tim"),("Bộ áo san hô viền hoa","hong"),
       ("Bộ áo thiên thanh đai thêu","lam"),("Bộ áo hồng thắm đai kết tua","hong"),("Bộ áo cam váy đào khoác khăn","cam"),("Bộ áo tím oải hương viền bạc","tim"),("Bộ áo hồng phấn kín hoa, ngọc bội","hong")],
"m3": [("Áo chưởng sự tím mận viền hồng","tim"),("Áo chưởng sự xám tro viền lam","xam"),("Áo chưởng sự đỏ rượu viền hoa vàng","do"),("Áo chưởng sự lam tro viền bạc","lam"),("Áo chưởng sự nâu đồng viền vàng","nau"),
       ("Áo chưởng sự lam thép viền hoa","lam"),("Áo chưởng sự đỏ sẫm viền hoa vàng","do"),("Áo chưởng sự lam đậm viền hoa dày","lam"),("Áo chưởng sự lục tro viền vàng","xanh"),("Áo chưởng sự lam thẫm viền kim tuyến","lam")],
"m4": [("Viên lĩnh hồng sẫm bổ tử hạc","do"),("Viên lĩnh đỏ gạch viền hoa","do"),("Viên lĩnh đỏ tro bổ tử hạc","do"),("Viên lĩnh đỏ thẫm viền gấm","do"),("Viên lĩnh đỏ anh đào dệt hoa","do"),
       ("Viên lĩnh đỏ cam bổ tử hạc","do"),("Viên lĩnh đỏ rượu viền gấm dày","do"),("Viên lĩnh đỏ tươi bổ tử hạc kim tuyến","do"),("Viên lĩnh đỏ sẫm viền vàng, đai ngọc","do"),("Viên lĩnh đỏ thắm bổ tử hạc kim tuyến, đai bài ngọc","do")],
"dapung": [("Áo sa lam điểm hoa trắng","lam"),("Áo lụa vàng nhạt thêu tử đằng","vang"),("Áo lụa đào thêu mai nhỏ","hong"),("Áo sa ngọc bích thêu lan trắng","xanh"),("Áo lụa tím nhạt thêu đinh hương","tim"),
       ("Áo lụa hồng thêu hoa đào","hong"),("Áo lụa xanh lá sen thêu sen nhỏ","xanh"),("Áo lụa mơ thêu cúc, khăn sa","cam"),("Áo lụa tím cà thêu hạc chỉ bạc","tim"),("Áo sa san hô thêu mẫu đơn, ngọc bội","do")],
"thuongtai": [("Áo lụa băng lam viền trúc","lam"),("Áo lụa ngà viền mai hồng","trang"),("Áo lụa hồng phấn thêu mẫu đơn nhỏ","hong"),("Áo lụa xanh rêu viền sen","xanh"),("Áo lụa san hô thêu bướm hoa","hong"),
       ("Áo tím khói dệt vân mây, khoác sa","tim"),("Áo lụa xanh non viền lan","xanh"),("Áo lụa tím cà viền tử đằng chỉ bạc","tim"),("Áo lụa lam ngọc viền mây chỉ bạc","lam"),("Áo lụa cam đất thêu hoa lựu kim tuyến","do")],
"quynhan": [("Áo gấm tím tro dệt hoa nhỏ","tim"),("Áo gấm hồng ngà dệt hoa đào","hong"),("Áo gấm thanh thiên dệt sen","xanh"),("Áo gấm hồng tro dệt mẫu đơn","hong"),("Áo gấm mơ viền cúc kim tuyến","cam"),
       ("Áo gấm tím lan khoác sa dài","tim"),("Áo gấm lam lục viền sen kim tuyến","xanh"),("Áo gấm san hô viền mai kim tuyến","do"),("Áo gấm tím hoàng gia viền mẫu đơn","tim"),("Áo gấm đỏ thẫm ba lớp thêu mẫu đơn kim tuyến","do")],
"tan": [("Áo sa thiên thanh thêu trúc bạc","lam"),("Áo lục nhạt khoác bối tử ngắn thêu mai","xanh"),("Áo hồng phấn khoác sa thêu mẫu đơn","hong"),("Áo giao lĩnh tím lan, đai lụa dài","tim"),("Áo lam ngọc vân kiên mây vàng","lam"),
       ("Áo mơ thêu cúc vàng, vân kiên kết tua","cam"),("Áo xanh ô liu khoác bối tử viền sen","xanh"),("Áo tím ba lớp thêu mẫu đơn vàng, vân kiên ngọc trai","tim"),("Áo lam lục thêu đuôi phượng, khăn choàng viền vàng","xanh"),("Áo đỏ thắm ba lớp thêu phượng mẫu đơn, vân kiên châu báu","do")],
"phi": [("Áo gấm lam nhạt viền mẫu đơn vàng","lam"),("Áo gấm vàng nhạt thêu tử đằng mây vàng","vang"),("Áo gấm xanh lục thêu sen vàng","xanh"),("Áo gấm tím lan thêu lan vàng","tim"),("Áo gấm san hô thêu đuôi phượng","hong"),
       ("Áo gấm xanh ô liu thêu cúc vàng","xanh"),("Áo gấm cam đất thêu phượng và lựu","do"),("Áo gấm lam sẫm thêu phượng mây kim tuyến","lam"),("Áo gấm tím thẫm thêu phượng mẫu đơn kim tuyến","tim"),("Áo gấm đỏ san hô kín phượng mẫu đơn, cổ viền ngọc trai","do")],
"quyphi": [("Gấm bào tím oải hương, khăn choàng viền ngọc","tim"),("Gấm bào vàng mơ viền phượng cúc","vang"),("Gấm bào hồng đào viền phượng mẫu đơn","hong"),("Gấm bào xanh ngọc viền phượng sen","xanh"),("Gấm bào hồng thắm viền phượng hoa đào","hong"),
       ("Gấm bào lam lục, áo choàng ngọc trai","xanh"),("Gấm bào lam sẫm thêu phượng mây","lam"),("Gấm bào đỏ cam kín phượng vàng","do"),("Gấm bào tím hoàng gia, áo choàng châu ngọc","tim"),("Gấm bào đỏ thắm phượng mẫu đơn, áo choàng vàng ngọc","do")],
"hqp": [("Lễ phục tím lan thêu phượng mây","tim"),("Lễ phục băng lam thêu phượng chỉ bạc","lam"),("Lễ phục vàng hổ phách thêu phượng mẫu đơn","vang"),("Lễ phục xanh ngọc thêu phượng sen","xanh"),("Lễ phục san hô thêu phượng hoa đào","hong"),
       ("Lễ phục hồng thắm, vân kiên ngọc trai","hong"),("Lễ phục lục bảo, vân kiên châu báu","xanh"),("Lễ phục lam lục, cổ điểm thúy","xanh"),("Lễ phục tím thẫm thêu phượng mây, đuôi dài","tim"),("Lễ phục lam sẫm kín phượng, vân kiên vàng ngọc","lam")],
"hh": [("Phượng bào tím oải hương","tim"),("Phượng bào vàng mơ","vang"),("Phượng bào xanh ô liu thêu sen vàng","xanh"),("Phượng bào hồng thêu mẫu đơn vàng","hong"),("Phượng bào đỏ son thêu mây vàng","do"),
       ("Phượng bào lục bảo, cổ châu báu","xanh"),("Phượng bào lam lục, cổ điểm thúy","xanh"),("Phượng bào lam sẫm cửu phượng","lam"),("Phượng bào minh hoàng","vang"),("Phượng bào đỏ thắm triều phục","do")],
}
# trâm cài: 8 new (files 01..08) + 2 kept old keys (files 09,10) for m0 + consort tiers; m1..m4: 10 new. Grade list follows the same order.
GT8 = [0, 0, 0, 1, 1, 2, 2, 3, 0, 1]     # new01..08, old09, old10
GT10 = GY
T = {
"m0": ([("Kẹp hoa lụa hồng","hong"),("Trâm xương đầu mai","trang"),("Lược gỗ đàn hương","nau"),("Trâm đồng chạm hoa","vang"),("Dải lụa kết hoa","lam"),("Đôi trâm bạc trơn","trang"),("Trâm gỗ vẽ ngọc lan","nau"),("Trâm bạc hạt lưu ly","lam")],
       [("tram_dao","Trâm gỗ đào","nau"),("tram_dong","Trâm đồng mai hoa","vang")], [0,0,1,0,1,2,2,3,0,1]),
"m1": [("Trâm bạc hạt lưu ly lam","lam"),("Đôi trâm hoa bạc","trang"),("Trâm mẫu đơn lụa hồng","hong"),("Trâm bạc chùm trai nhỏ","trang"),("Lược bạc chạm dây leo","trang"),
       ("Dải lụa chuông bạc","hong"),("Trâm bạc lá lưu ly xanh","xanh"),("Trâm bạc hoa lụa tím","tim"),("Đôi trâm bạc trai nhỏ","trang"),("Trâm bạc mai men hồng","hong")],
"m2": [("Trâm bạc hoa trân châu","trang"),("Trâm bạc hạt ngọc tua bạc","xanh"),("Lược bạc kết trai nhỏ","trang"),("Đôi trâm hoa men hồng","hong"),("Trâm bạc bướm men lam","lam"),
       ("Bộ diêu bạc hai chuỗi hạt","trang"),("Trâm bạc lá ngọc","xanh"),("Trâm bạc chùm hoa lụa trân châu","hong"),("Trâm bạc hạt san hô","do"),("Trâm bạc sen trai, ngọc rủ","trang")],
"m3": [("Trâm mạ vàng đĩa ngọc","xanh"),("Lược mạ vàng hoa ngọc","vang"),("Đôi trâm hạt san hô","do"),("Trâm mạ vàng đầu mây","vang"),("Trâm mạ vàng giọt trai","trang"),
       ("Trâm mạ vàng ngọc sẫm","xanh"),("Trâm mạ vàng hổ phách","vang"),("Trâm mạ vàng mẫu đơn men","hong"),("Trâm mạ vàng lá ngọc kết tua","xanh"),("Trâm mạ vàng hoa san hô trân châu","do")],
"m4": [("Trâm mạ vàng bài ngọc","xanh"),("Lược sơn mài viền vàng","nau"),("Trâm chùm san hô","do"),("Đôi trâm đầu ngọc như ý","xanh"),("Trâm mạ vàng chạm hạc","vang"),
       ("Trâm vàng hạt trai","vang"),("Trâm mã não lá vàng","do"),("Trâm đầu ngọc tường vân","xanh"),("Lược mạ vàng khảm ngọc","vang"),("Trâm vàng mẫu đơn san hô, ngọc rủ","do")],
"dapung": ([("Trâm bạc ngọc trai lá bạc","trang"),("Thoa bạc đầu mai","trang"),("Lược bạc kết trân châu","trang"),("Trâm bạc hoa lưu ly lam","lam"),("Trâm bạc nụ ngọc","xanh"),("Trâm bạc chùm hoa lụa hồng","hong"),("Bộ diêu bạc chuỗi trai","trang"),("Trâm bạc chim men lam","lam")],
       [("tramngoc","Trâm ngọc bích","xanh"),("tram_hoalua","Trâm hoa lụa","hong")], GT8),
"thuongtai": ([("Trâm bạc chạm lan ngọc trai","trang"),("Trâm bạc lá ngọc bích","xanh"),("Trâm bạc hoa đào lưu ly hồng","hong"),("Đôi trâm bạc chùm trân châu","trang"),("Lược bạc khảm ngọc","xanh"),("Bộ diêu bạc chuỗi trai lưu ly hồng","hong"),("Trâm bạc tử đằng men tím","tim"),("Trâm bạc trăng ngọc trai mây bạc","trang")],
       [("tram_ngoclan","Trâm bạc ngọc lan","trang"),("thoa_diep","Thoa bạc song điệp","trang")], GT8),
"quynhan": ([("Trâm mạ vàng hoa san hô","do"),("Lược mạ vàng lá ngọc","xanh"),("Trâm mạ vàng mai ngọc trắng","trang"),("Bộ diêu mạ vàng ba chuỗi trai","trang"),("Trâm mạ vàng hoa điểm thúy","lam"),("Đôi trâm mạ vàng mẫu đơn trân châu","trang"),("Trâm mạ vàng sen bích tỷ","hong"),("Trâm mạ vàng bướm ngọc","xanh")],
       [("tram_hong","Trâm thạch anh hồng","hong"),("hoadien_bac","Hoa điền bạc khảm lưu ly","lam")], [0,0,0,1,1,2,1,3,0,2]),
"tan": ([("Trâm vàng ngọc lan trắng","trang"),("Đôi thoa vàng đầu mây tua lá","vang"),("Bộ diêu vàng hoa chuỗi trai ngọc","vang"),("Lược vàng khảm ngọc san hô","vang"),("Trâm vàng thạch lựu mã não","do"),("Bộ diêu vàng bướm chuỗi châu","vang"),("Trâm vàng mai bích tỷ tua vàng","hong"),("Trâm vàng sen ngậm ngọc","xanh")],
       [("thoa_vang","Thoa vàng hồ điệp","vang"),("tram_phithuy","Trâm phỉ thúy hải đường","xanh")], [0,0,1,1,0,2,1,3,0,2]),
"phi": ([("Bộ diêu kim mẫu đơn năm chuỗi châu","vang"),("Trâm vàng mẫu đơn hồng ngọc","do"),("Lược vàng hoa vàng trân châu","vang"),("Đôi trâm vàng hoa điểm thúy","lam"),("Trâm vàng hạc ngậm ngọc","vang"),("Trâm vàng sen phỉ thúy tua vàng","xanh"),("Bộ diêu vàng song điệp","vang"),("Trâm hoa quan vàng ngọc hồng","hong")],
       [("boodieu","Bộ diêu vàng","vang"),("dientu_thuy","Điền tử điểm thúy","lam")], [2,1,0,0,1,0,2,3,0,1]),
"quyphi": ([("Trâm kim phượng tua dài","vang"),("Lược vàng mẫu đơn hồng ngọc","do"),("Đôi trâm đầu phượng mắt hồng ngọc","vang"),("Bộ diêu vàng hoa tầng tua châu","vang"),("Trâm vàng lục bảo trân châu","xanh"),("Trâm vàng đuôi phượng điểm thúy","lam"),("Trâm vàng mẫu đơn đá đỏ tua lá vàng","do"),("Trâm vàng tam hạc trân châu","vang")],
       [("bd_phuong","Bộ diêu kim phượng ngậm châu","vang"),("tram_maudon","Trâm hồng ngọc mẫu đơn","do")], [1,2,0,1,0,2,0,1,3,0]),
"hqp": ([("Trâm kim phượng xòe cánh điểm thúy","lam"),("Hoa quan điểm thúy trân châu","lam"),("Bộ diêu phượng chuỗi châu hồng ngọc","vang"),("Đôi trâm phượng cánh điểm thúy","lam"),("Lược vàng mây điểm thúy","lam"),("Trâm mẫu đơn hồng ngọc bướm thúy","do"),("Trâm phượng cuộn ngậm minh châu","vang"),("Điểm thúy ngũ hoa hồng ngọc","lam")],
       [("diemthuy_cuu","Điểm thúy cửu điệp","lam"),("kimthoa_phuong","Kim thoa song phượng","vang")], [1,2,2,0,0,0,1,0,1,3]),
"hh": ([("Kim trâm phượng hoàng điểm thúy chuỗi châu","lam"),("Phượng quan hậu tọa","vang"),("Trâm song phượng triều nhật","vang"),("Lược điểm thúy song phượng","lam"),("Bộ diêu kim phượng tua châu ngọc","vang"),("Trâm song phượng ngậm minh châu","vang"),("Đôi trâm phượng đuôi thúy","lam"),("Hoa quan điểm thúy mẫu đơn phượng","lam")],
       [("tramphuong","Trâm phượng cửu vĩ","vang"),("phuongquan","Phượng quan bán giá","vang")], [0,1,0,1,2,0,0,2,1,3]),
}
NT = [  # ngự tứ (one of a kind per life): key, slot, name, P, colour, icon
 ("nt_nhuy","tram","Trâm ngọc như ý ngự tứ",5,"xanh","wd-nt-tram-01"),("nt_haiduong","tram","Bộ diêu «Hải đường xuân thụy» ngự tứ",6,"hong","wd-nt-tram-02"),("nt_dongchau","tram","Trâm đông châu ngự tứ",7,"trang","wd-nt-tram-03"),
 ("nt_longchon","y","Áo gấm cổ lông chồn ngự tứ",5,"nau","wd-nt-y-01"),("nt_bachhoa","y","Áo «Bách hoa» ngự tứ",6,"hong","wd-nt-y-02"),("nt_hocuu","y","Hồ cừu trắng ngự tứ",7,"trang","wd-nt-y-03"),
 ("nt_nghethuong","y","Nghê thường vũ y ngự tứ",7,"hong","wd-nt-y-04"),("nt_kimlu","y","Kim lũ y thêu phượng ngự tứ",8,"vang","wd-nt-y-05"),("nt_tuyetlien","y","Băng tiêu tuyết liên y ngự tứ",6,"lam","wd-nt-y-06")]
TANG = [("y_tang","y","Áo tang vải trắng",-2,"trang","wd-tang-y-01"),("y_tanggai","y","Áo tang vải gai",-2,"trang","wd-tang-y-02")]
PR = {-2:8,-1.5:10,-1:13,-0.5:17,0:22,1:20,2:30,3:45,4:70,5:100,6:150,7:220,8:320}
PR[1]=25
GM = [1, 1.4, 2, 3]

def fx(P, g, nt=False):
    lv = (P + 2)  # 0..10
    sac = max(1, round(lv * 0.7 + g * 0.4)) if not nt else max(2, round(lv * 0.7 + 1.5))
    danh = (1 if g >= 2 and P >= 3 else 0) + (1 if P >= 6 and g >= 1 else 0) + (1 if g == 3 and P >= 1 else 0)
    if nt: danh = 3 + (1 if P >= 6 else 0) + (1 if P >= 7 else 0)
    o = {"sac": sac}
    if danh: o["danh"] = danh
    return o

def xa(P, g, nt=False):
    return max(1, min(10, round(1 + (P + 2) * 0.75 + g * 0.6 + (1.2 if nt else 0))))

rows = []; tierinfo = []
for key, P, tn in TIERS:
    tierinfo.append([key, P, tn])
    # y phục
    for i, (n, col) in enumerate(Y[key]):
        g = GY[i]; k = f"w_{key}_y{i+1:02d}"
        rows.append([k, "y", n, P, g, col, fx(P, g), "", f"wd-{key}-y-{i+1:02d}", xa(P, g), round(PR[P] * GM[g]), key])
    t = T[key]
    if isinstance(t, tuple):
        new, old, gl = t
        for i, (n, col) in enumerate(new):
            g = gl[i]; k = f"w_{key}_t{i+1:02d}"
            rows.append([k, "tram", n, P, g, col, fx(P, g), "", f"wd-{key}-tram-{i+1:02d}", xa(P, g), round(PR[P] * GM[g]), key])
        for j, (k, n, col) in enumerate(old):
            g = gl[8 + j]
            rows.append([k, "tram", n, P, g, col, fx(P, g), "", f"wd-{key}-tram-{9+j:02d}", xa(P, g), round(PR[P] * GM[g]), key])
    else:
        for i, (n, col) in enumerate(t):
            g = GT10[i]; k = f"w_{key}_t{i+1:02d}"
            rows.append([k, "tram", n, P, g, col, fx(P, g), "", f"wd-{key}-tram-{i+1:02d}", xa(P, g), round(PR[P] * GM[g]), key])
for k, sl, n, P, col, ic in NT:
    rows.append([k, sl, n, P, 4, col, fx(P, 3, True), "", ic, xa(P, 3, True), 0, "nt"])
for k, sl, n, P, col, ic in TANG:
    rows.append([k, sl, n, P, 0, col, {}, "mặc trong quốc tang", ic, 1, 6, "tang"])

# old saves: every retired key -> a new item of the same tier (P) and the nearest grade
OLD = {"y_cungnu": "w_m1_y01", "y_luamoc": "w_m1_y05", "y_hoanho": "w_dapung_y06", "y_saxanh": "w_dapung_y04", "y_maimai": "w_thuongtai_y02", "y_vanthuy": "w_thuongtai_y09",
       "y_lan": "w_quynhan_y06", "y_tramnep": "w_quynhan_y01", "y_haiduong": "w_tan_y08", "y_chimen": "w_tan_y05", "y_maudon": "w_phi_y09", "y_hac": "w_phi_y08",
       "y_kimtuyen": "w_quyphi_y10", "y_vancam": "w_quyphi_y07", "y_trieutim": "w_hqp_y09", "y_bachdieu": "w_hqp_y06", "y_minhhoang": "w_hh_y09", "y_phuongbao": "w_hh_y10"}
keys = [r[0] for r in rows]
assert len(keys) == len(set(keys)), "dup key"
names = [r[2] for r in rows]
dups = {n for n in names if names.count(n) > 1}
assert not dups, dups
for v in OLD.values(): assert v in keys, v
n260 = sum(1 for r in rows if r[11] not in ("nt", "tang"))
assert n260 == 260, n260
out = sys.argv[1]
with open(out, "w", encoding="utf-8") as f:
    f.write("/* ================= j92cat: wardrobe catalogue (generated by dev/figwork/wardrobe/mkcat.py; edit there) =================\n"
            "   13 tiers (5 cung nữ m0..m4 + 8 phi tần Đáp ứng..Hoàng hậu) x 20 = 260 items: per tier 10 trâm + 10 y phục,\n"
            "   grades 4 Thường / 3 Tinh phẩm / 2 Trân phẩm / 1 Tuyệt phẩm; plus 9 ngự tứ (one of a kind per life) and 2 áo tang.\n"
            "   Row: [key, slot, name, P (phẩm phục: cung nữ m0..m4 = -2..0 in halves, Đáp ứng..HH = 1..8), grade 0..4, colour, effect, note, icon, xa hoa 1..10, price, tier].\n"
            "   Icons: img/<icon>.webp 256x256 transparent, img/wd512/<icon>.webp 512x512 for detail (gpt-2-6, drawn from the game's own figures per tier). */\n")
    f.write("const WD_TIERS=" + json.dumps(tierinfo, ensure_ascii=False) + ";\n")
    f.write("const WD_LIST=[\n" + ",\n".join(json.dumps(r, ensure_ascii=False, separators=(",", ":")) for r in rows) + "];\n")
    f.write("const WD_OLDKEY=" + json.dumps(OLD, separators=(",", ":")) + ";\n")
print(len(rows), "rows,", n260, "tier items")
