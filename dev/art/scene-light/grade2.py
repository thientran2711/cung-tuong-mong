# grade2.py — chỉnh màu trưa/chiều/tối theo bản SÁNG cùng nơi (không vẽ lại, giữ từng điểm ảnh/bố cục)
# python3 grade2.py REF_SANG IN OUT buoi   (buoi = trua|chieu|toi)
# Lab: a,b quanh trung bình nhân k (k tìm để độ rực trung bình C = đích), trung bình a/b đặt về sáng + độ lệch của buổi;
# L: tương phản về gần bản sáng; tối = cách nightfix đã duyệt (nén vùng sáng, xanh đêm ở bóng, lọc giữ cạnh 35 %).
import sys,numpy as np,cv2
T={ # dC = C_đích / C_sáng ; da,db = lệch trung bình a,b so với sáng ; dL lệch sáng tối ; ls = tương phản / sáng
 "trua": dict(dC=1.18,da=1.5,db=5.5,dL=3.0,ls=1.03,paint=0.0),
 "chieu":dict(dC=1.32,da=3.5,db=10.0,dL=-5.0,ls=1.0,paint=0.15),
 "toi":  dict(dC=1.0,da=1.5,db=-4.0,dL=None,ls=None,paint=0.35),
}
def lab(im):
    return cv2.split(cv2.cvtColor(im.astype(np.float32)/255,cv2.COLOR_BGR2LAB))
def stats(im):
    L,a,b=lab(im);return dict(L=L.mean(),Ls=L.std(),a=a.mean(),b=b.mean(),C=np.sqrt(a*a+b*b).mean())
def skip(ref,im,bu):
    """None = cần chỉnh; còn lại = lý do giữ nguyên (đã trong khoảng đích, hoặc đêm đã lam như lãnh cung)."""
    R=stats(ref);X=stats(im);Ct=R['C']*T[bu]['dC']
    if bu=="toi" and X['b']<0: return "đêm đã lam (b<0), giữ"
    if X['C']<=Ct*1.06: return "đã trong khoảng đích, giữ"
    return None
def grade(ref,im,bu,strength=1.0,keep=None):
    # keep = tỉ lệ giữ sắc riêng (co độ rực quanh 0 thay vì dời trung bình): Dư đồ 1.0 (nước xanh không ngả nâu), chiều 0.5 (vàng kim không xám)
    if keep is None: keep={'trua':0.0,'chieu':0.5,'toi':1.0}[bu]
    p=T[bu];R=stats(ref)
    L,a,b=lab(im);am,bm=a.mean(),b.mean()
    at=R['a']+p['da'];bt=R['b']+p['db'];Ct=R['C']*p['dC']
    C0=np.sqrt(a*a+b*b)
    hi=1-0.25*np.clip((C0-40)/40,0,1)    # bớt thêm ở chỗ quá rực
    if bu=="toi":  # cách nightfix đã duyệt: co độ rực quanh 0 (giữ sắc vàng đèn), xanh đêm ở bóng
        t=62;Lh=np.where(L>t,t+(L-t)*0.72,L);w=np.clip(1-Lh/70,0,1)
        def mk(k): return a*k*hi-4*w, b*k*hi-18*w
    else:
        def mk(k):
            a1,b1=(a-am)*k*hi+at,(b-bm)*k*hi+bt
            a0,b0=a*k*hi+(at-am*k)*0.25,b*k*hi+(bt-bm*k)*0.25
            return keep*a0+(1-keep)*a1, keep*b0+(1-keep)*b1
    lo,hh=0.2,1.6
    for _ in range(22):
        k=(lo+hh)/2;a2,b2=mk(k)
        if np.sqrt(a2*a2+b2*b2).mean()>Ct: hh=k
        else: lo=k
    a2,b2=mk((lo+hh)/2)
    if bu=="toi":
        L2=Lh
    else:
        Lt=max(L.mean(),R['L']+p['dL']) if bu=="trua" else R['L']+p['dL']
        Lt=0.5*Lt+0.5*L.mean() if bu=="chieu" else Lt
        L2=(L-L.mean())*(R['Ls']*p['ls']/max(L.std(),1e-3))+Lt
        L2=np.clip(L2,0,100)
    if strength<1:
        L2=L+(L2-L)*strength;a2=a+(a2-a)*strength;b2=b+(b2-b)*strength
    out=cv2.cvtColor(cv2.merge([L2.astype(np.float32),a2.astype(np.float32),b2.astype(np.float32)]),cv2.COLOR_LAB2BGR)
    out=np.clip(out*255+0.5,0,255).astype(np.uint8)
    if p['paint']>0:
        pp=cv2.edgePreservingFilter(out,flags=cv2.RECURS_FILTER,sigma_s=30,sigma_r=0.25)
        out=cv2.addWeighted(out,1-p['paint'],pp,p['paint'],0)
    return out
if __name__=="__main__":
    ref=cv2.imread(sys.argv[1]);im=cv2.imread(sys.argv[2]);bu=sys.argv[4]
    out=grade(ref,im,bu)
    cv2.imwrite(sys.argv[3],out,[cv2.IMWRITE_WEBP_QUALITY,90])
