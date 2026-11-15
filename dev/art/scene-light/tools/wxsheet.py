import cv2,numpy as np,os,sys
D="/home/user/cung-tuong-mong/.claude/worktrees/agent-a4e8c6432e582a50a/.ahcache/wx/";OUT=sys.argv[1]
WX={"xuan":["hoa dao bay","MUA PHUN","suong som","troi quang"],"ha":["nang gat","ve keu","GIONG TO","dom dom"],"thu":["la phong","nang vang","gio heo may","trang ram"],"dong":["tuyet nhe","TUYET DAY","suong gia","mai no"]}
BU=["sang","trua","chieu","toi"];NM={"home":"Ngoc Thanh cac (phong cua nang)","dtd":"Duong tam dien","lc":"Lanh cung"}
w=210
for pl in ("home","dtd","lc"):
    rows=[]
    hd=np.full((40,150+4*(2*w+14),3),235,np.uint8);cv2.putText(hd,NM[pl]+"  -  moi o: TRUOC | SAU",(6,28),cv2.FONT_HERSHEY_SIMPLEX,.8,(0,0,0),2)
    sub=np.full((24,hd.shape[1],3),235,np.uint8)
    for i,b in enumerate(BU): cv2.putText(sub,b,(150+i*(2*w+14)+w-20,18),cv2.FONT_HERSHEY_SIMPLEX,.6,(0,0,0),2)
    rows+=[hd,sub]
    for se in ("xuan","ha","thu","dong"):
        for wi in range(4):
            cells=[]
            for bu in range(4):
                a=cv2.imread(f"{D}before/{pl}-{se}-{bu}-{wi}.jpg");b=cv2.imread(f"{D}after/{pl}-{se}-{bu}-{wi}.jpg")
                if a is None or b is None: a=b=np.zeros((300,260,3),np.uint8)
                f=lambda x:cv2.resize(x,(w,int(w*x.shape[0]/x.shape[1])))
                a,b=f(a),f(b);h=min(a.shape[0],b.shape[0]);cells.append(np.hstack([a[:h],np.full((h,3,3),235,np.uint8),b[:h],np.full((h,11,3),235,np.uint8)]))
            h=min(c.shape[0] for c in cells);lab=np.full((h,150,3),235,np.uint8)
            cv2.putText(lab,se,(6,30),cv2.FONT_HERSHEY_SIMPLEX,.7,(0,0,0),2);cv2.putText(lab,WX[se][wi],(6,60),cv2.FONT_HERSHEY_SIMPLEX,.5,(0,0,180) if WX[se][wi].isupper() else (0,0,0),1)
            rows.append(np.hstack([lab]+[c[:h] for c in cells]))
    W=max(r.shape[1] for r in rows);rows=[np.hstack([r,np.full((r.shape[0],W-r.shape[1],3),235,np.uint8)]) for r in rows]
    cv2.imwrite(f"{OUT}-{pl}.jpg",np.vstack(rows),[cv2.IMWRITE_JPEG_QUALITY,80]);print(pl)
