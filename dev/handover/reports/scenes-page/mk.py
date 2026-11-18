import json,subprocess,io,urllib.request
from PIL import Image
B="https://ctm-img.victoria-tntt.workers.dev/img/"
pal=[("canh-phuc","Cảnh Phúc cung",["Thể Hòa điện","Dưỡng Xuân hiên","Thanh Thu trai"]),("khai-tuong","Khải Tường cung",["Sùng Đức điện","Nhã Vận hiên","Tĩnh Nghi trai"]),("chung-tu","Chung Tú cung",["Diên Khánh điện","Minh Hòa hiên","Du Thanh trai"]),("ham-an","Hàm An cung",["Thụy Ngọc điện","Tuy Phúc hiên","Tịch Nguyệt trai"]),("thua-minh","Thừa Minh cung",["Chiêu Huy điện","Duyệt Xuân hiên","Thanh Dật trai"]),("dien-huy","Diên Huy cung",["Kính Ninh điện","Chiêu Nhân hiên","Sùng Nghĩa trai"]),("vinh-hoa","Vĩnh Hòa cung",["Hoài Nhu điện","Hòa Chương hiên","Tư Tĩnh trai"]),("truong-xuan","Trường Xuân cung",["Lạc Thọ điện","Vĩnh Xuân hiên","Hàm Thu trai"])]
stage=[("ngu-hoa-vien","Ngự hoa viên"),("ngu-thu-phong","Cần Chính điện (ngự thư phòng)"),("duong-tam-dien","Dưỡng Hòa điện (tẩm điện Hoàng thượng)"),("tu-ninh-cung","Đức Thọ cung (Thái hậu)"),("khon-ninh-cung","Càn Ninh cung (Hoàng hậu)"),("phi-tan-cung","Cung phi tần (tranh chung)"),("thai-y-vien","Thái y viện"),("kinh-su-phong","Kính sự phòng"),("lanh-cung","Lãnh cung"),("tam-cung-dem","Ngọc Thanh các (phòng ngủ của ngươi)"),("tan-gia-kho","Tân Giả khố"),("phong-cung-nu","Phòng cung nữ"),("cung-nhan-xuan-trua","Dãy nhà cung nhân")]
man=[]
def get(key):
    d=subprocess.run(["curl","-sS","-m","40",B+key+".webp"],capture_output=True,check=True).stdout
    im=Image.open(io.BytesIO(d)).convert("RGB");im.thumbnail((720,720),Image.LANCZOS)
    im.save("img/"+key+".webp","WEBP",quality=80,method=6);return B+key+".webp"
for k,n in stage: man.append(dict(key=k,palace="Sân khấu",kind="stage",name=n,url=get(k)))
for s,pn,h in pal:
    for part,kind,suf,hn in (("chinh","Chính điện","",h[0]),("dong","Đông phối điện (nơi ở)","-dong-phoi",h[1]),("tay","Tây phối điện (nơi ở)","-tay-phoi",h[2])):
        k=f"{s}-cung{suf}-xuan-trua";man.append(dict(key=k,palace=pn,kind=kind,name=hn,url=get(k)))
json.dump(man,open("manifest.json","w"),ensure_ascii=False,indent=1)
print(len(man))
