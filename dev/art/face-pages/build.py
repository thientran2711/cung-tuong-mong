#!/usr/bin/env python3
"""Build page1_cung_nu.html (tick = XOA) and page2_du_phong.html (tick = CHON). Images base64-embedded from faces/."""
import base64,json,os
D=os.path.dirname(os.path.abspath(__file__))
def b(k): return "data:image/jpeg;base64,"+base64.b64encode(open(f"{D}/faces/{k}.jpg","rb").read()).decode()
P1=[("m09","Sắc sảo"),("m10","Đoan trang"),("m11","Công chúa (Tươi tắn)"),("m12","Công chúa (Tinh nghịch)"),("m13","Tươi tắn (đang để trong kho)"),("m18","Dịu dàng")]
# spare = KHO_L697.md: nhóm gốc của từng mặt trong kho
SRC={"Tươi tắn":"m13 m15 m17 m21 m27 m31 m33 m35 m37 m38 m39 m41 m45 m47 m49 m51","Dịu dàng":"m23 m26 m32 m44 m50","Đoan trang":"m34 m36 m40 m43 m46 m52","Sắc sảo":"c17 c23 c29","Tinh nghịch":"m42 m48"}
P2=sorted([(k,g) for g,v in SRC.items() for k in v.split()],key=lambda x:(x[1],x[0]))
T=open(f"{D}/template.html",encoding="utf-8").read()
def build(out,title,h1,sub,faces,verb,tick_label,mark):
    F=[{"id":k,"group":g,"img":b(k)} for k,g in faces]
    s=T.replace("%%TITLE%%",title).replace("%%H1%%",h1).replace("%%SUB%%",sub).replace("%%FACES%%",json.dumps(F,ensure_ascii=False)).replace("%%VERB%%",verb).replace("%%LABEL%%",tick_label).replace("%%MARK%%",mark)
    open(f"{D}/{out}","w",encoding="utf-8").write(s); print(out,len(s)//1024,"KB",len(F))
build("page1_cung_nu.html","Mặt cung nữ","Danh sách mặt cung nữ","Đây là các mặt đang dùng cho cung nữ trong cung. Mặt nào bạn thấy quá trẻ con thì tick ✗ để LOẠI BỎ. Tick được lưu tự động để quản đốc đọc.",P1,"remove","Loại bỏ","✗")
build("page2_du_phong.html","Mặt dự phòng","Mặt dự phòng","Các mặt đang cất trong kho, để dành (ví dụ cho công chúa). Mặt nào bạn ưng thì tick ✓ để CHỌN. Tick được lưu tự động để quản đốc đọc.",P2,"choose","Chọn","✓")
