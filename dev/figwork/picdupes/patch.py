# python3 patch.py LIVE.json INDEX.json OUT.json : add review/pic-dupes act keys to ACTS.json "acts" (exact names + "*" patterns); asserts every key is on the CDN
import json,sys
L=json.load(open(sys.argv[1]));IX={f[0].split('img/')[-1] for f in json.load(open(sys.argv[2]))['files']}
P={"Nghỉ ngơi một lát":"nghi-ngoi-mot-lat","Đọc sách giải khuây":"doc-sach-giai-khuay","Xin hầu cờ":"xin-hau-co","Xin đánh đàn hầu ngài":"xin-danh-dan-hau",
"Sang Đức Thọ cung thỉnh an":"sang-duc-tho-thinh-an","Giúp chăm thú nuôi của nàng":"giup-cham-thu-nuoi","Tự đi dò la":"tu-di-do-la","Ép nộp của":"ep-nop-cua",
"Hại thú nuôi của nàng":"hai-thu-nuoi","Nhờ ơn người quen rút thẻ bài":"nho-rut-the-bai","Sai cung nữ thân tín lấy lòng":"sai-cung-nu-lay-long",
"Thả thú dữ làm hại dung nhan":"tha-thu-du","Phóng hỏa kho đồ":"phong-hoa-kho-do","Trộm thú nuôi của nàng":"trom-thu-nuoi","Giao việc phòng bị":"giao-viec-phong-bi",
"Đổi việc phòng bị":"doi-viec-phong-bi","Đề bạt lên Thủ lĩnh thái giám":"de-bat-thai-giam","Đề bạt lên Đại cung nữ":"de-bat-dai-cung-nu",
"Phát bạc cứu giúp cung nhân nghèo":"phat-bac-cuu-giup","Hỏi han ở *: ai cần giúp?":"hoi-han-ai-can-giup","Xem con ở mục Con của ngươi":"xem-con-muc-con",
"Bỏ việc này":"bo-viec-nho","Dâng, tặng":"dang-tang-tac-pham","Bày ở yến tiệc":"bay-tac-pham-yen-tiec","Tự luyện, làm tác phẩm":"tu-luyen-tac-pham",
"Gửi về Ngự thú viên":"gui-ngu-thu-vien","Giao * chăm":"giao-nguoi-cham-thu","Mời ngài dạo ngự hoa viên":"moi-dao-ngu-hoa-vien","Tặng quà ăn có độc":"tang-qua-co-doc",
"Hành lễ":"hanh-le-v2","Bán cho Nội vụ phủ":"ban-noi-vu-phu","Dâng quà lên Thái hậu":"dang-qua-thai-hau",
# same meaning as an existing book-line picture (reuse, not a new drawing)
"Sai đi dò la":"sai-di-do-la-h","Nghe ngóng chung":"nghe-ngong-chung","Xin Thái hậu đỡ lời":"xin-th-do-loi-g-h","Đưa cơm áo":"dua-com-ao-h"}
for pet in json.load(open(sys.argv[4]))['pets'] if len(sys.argv)>4 else []:
    P["Chăm "+pet]="cham-thu-nuoi";P["Cho "+pet+" theo hầu"]="cho-thu-theo-hau"
for pl in ["tẩm cung ngươi","Ngự hoa viên","Cần Chính điện","Dưỡng Hòa điện","Đức Thọ cung","Càn Ninh cung","Thái y viện","Kính sự phòng","Lãnh cung"]:
    P["Đến "+pl]="den-noi-lam-viec"
import urllib.request
def live(k):
    try:return urllib.request.urlopen(urllib.request.Request('https://ctm-img.victoria-tntt.workers.dev/img/act-%s.webp'%k,method='HEAD',headers={'User-Agent':'ctm'}),timeout=30).status==200
    except Exception:return False
miss=[k for k in set(P.values()) if 'act-%s.webp'%k not in IX and not live(k)];assert not miss,miss
before=(len(L['acts']),len(set(L['acts'].values())));chg=[(n,L['acts'].get(n),k) for n,k in P.items() if L['acts'].get(n)!=k]
L['acts'].update(P);json.dump(L,open(sys.argv[3],'w'),ensure_ascii=False,separators=(',',':'))
print('acts before %d (keys %d) after %d (keys %d); changed %d'%(before+(len(L['acts']),len(set(L['acts'].values())),len(chg))))
for c in chg:
    if c[1]: print('REMAP',c)
