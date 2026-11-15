# python3 meanings_table.py meanings_out.json OUT.md : dev/art/ACT_PIC_ALL.md from the meanings check (rule order = table order)
import json,sys,os,re
H=os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0,H)
from meanings import R
M=json.load(open(sys.argv[1]))
SC={}
for k,rx,sc in R:
    if sc and k not in SC: SC[k]=sc
order=[];seen=set()
for k,rx,sc in R:
    if k in M and k not in seen and k!='-': order.append(k); seen.add(k)
extra=[]
for k,rx,sc in R:
    if k!='-' and k not in M and k not in seen and k not in extra: extra.append(k)
for k in extra:
    rx=next(r for kk,r,_ in R if kk==k)
    M[k]={'heads':['(chỉ gặp khi chơi) /'+rx[:60]+'/'],'old':[],'src':[]}; order.append(k); seen.add(k)
def esc(t): return t.replace('|','/').replace('\n',' ')
new=[k for k in order if SC.get(k)]; keep=[k for k in order if not SC.get(k)]
shared_before=sum(1 for k in order for o,_ in M[k]['old'][:1] if o)  # informational
L=[]
L.append('# Mọi nghĩa trong game → một tranh riêng (review/act-pics2, sếp 15/11: "MỖI NGHĨA KHÁC NHAU = MỘT TRANH RIÊNG")\n')
L.append('Nguồn: quét tĩnh toàn bộ mã (acorn, 93 module: mọi `log(...)`, mọi chuỗi trả về/`+=` có câu, mọi thẻ việc `{n,c,o,run}`/`A(id,tên)`/`pbtn`, mọi lựa chọn sự kiện `{n,fx}`) '
         '→ chạy câu mẫu qua đúng hàm chọn tranh của game (j87 `kbkCands`, j79 `kitActKey`) để biết tranh hiện tại → áp luật nghĩa `dev/figwork/acts/meanings.py` '
         '(một luật = một nghĩa = một tranh `img/act-<khóa>.webp`; thứ tự luật = thứ tự game dùng trong ACTS.json `log`). Công cụ: `dev/figwork/acts/meanings_check.py`, `meanings_table.py`.\n')
L.append(f'**Tổng: {len(order)} nghĩa** · giữ tranh đã có đúng nghĩa: **{len(keep)}** · **tranh mới cần vẽ: {len(new)}** · '
         f'trước khi sửa: {sum(1 for k in order if M[k]["old"] and any(not o[0].startswith("act-"+k) for o in M[k]["old"][:1]))} nghĩa đang mượn tranh chung/khác nghĩa.\n')
L.append('Câu không thành nghĩa riêng (không cần tranh): chữ nút điều hướng (Thôi, Đi, Đợi buổi sau…), tên đồ/xuất thân/phẩm, dòng chỉ có số (Sủng +3…), '
         'và **câu thứ hai trở đi trong cùng một dòng nhật ký** (phản ứng/kết quả: "Lan Tần cảm động.", "Hắn giấu vội vào tay áo."…): j87 gộp vào dòng của câu đầu, '
         'một dòng = một việc = một tranh. Danh sách các mẫu này ở đầu `meanings.py` (khóa "-").\n')
L.append('Cột "tranh hiện tại" = tranh game đang chọn cho câu mẫu (Sổ tuần, trang Việc của ngươi), "(thẻ)" = tranh trên thẻ việc. Khóa có cảnh để trống = giữ tranh đã có.\n')
L.append('| # | khóa tranh (img/act-…) | nghĩa (câu / tên thẻ, X = tên người, N = số) | tranh hiện tại | tranh mới: cảnh |')
L.append('|---|---|---|---|---|')
for i,k in enumerate(order,1):
    v=M[k]; hs=v['heads']; hs_s=' · '.join(esc(h)[:70] for h in hs[:4])+(f' · (+{len(hs)-4})' if len(hs)>4 else '')
    old=', '.join(o for o,_ in v['old'][:2])
    sc=SC.get(k); L.append(f'| {i} | `{k}` | {hs_s} | {esc(old)} | {"**MỚI** — "+esc(sc) if sc else "giữ"} |')
open(sys.argv[2],'w').write('\n'.join(L)+'\n'); print(sys.argv[2],len(order),len(new),len(keep))
