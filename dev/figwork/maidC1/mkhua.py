import os,sys; sys.argv=["x"]; __file__=os.path.abspath("cjobs.py")
exec(open("cjobs.py").read().split('if __name__')[0])
L=['# Hoa điền Part C (cung nữ lên phi tần) — m01–m26 (thợ C1)','',
'Cùng luật với dev/figwork/HUADIAN.md (c01–c32, origin/review/consort-art): mỗi người một kiểu riêng giữ suốt đời (mọi bậc t1–t8, mọi tuổi);',
'luôn NHỎ (cỡ đầu ngón tay, giữa hai mày ngay trên sống mũi), sang, tinh tế; bậc cao chỉ sang hơn bằng chất liệu và nét, KHÔNG to hơn; không che trán, không lan xuống mày/má.',
't1–t2: vẽ màu riêng, nét đơn giản; t3–t4: cùng màu, nét kỹ hơn; t5–t6: cùng màu viền vàng mảnh; t7–t8: vàng lá + son đỏ, 1 hạt ngọc trai nhỏ, nét kỹ nhất.',
'Lãnh cung (tcold): KHÔNG hoa điền. Không nốt ruồi, không beauty mark.',
'84 kiểu không trùng: 26 kiểu dưới đây đã đối chiếu, khác hết 32 kiểu c01–c32. Thợ m27–m52 (C2) ghi bảng của mình bên dưới, tránh trùng các kiểu này.','',
'| ID | Hoạ tiết | màu t1–t6 | màu áo chủ đạo |','|---|---|---|---|']
L+=[f'| m{i+1:02d} | {HUA[i]} | {COL[i%13]} | {PAL["m%02d"%(i+1)]} |' for i in range(26)]
L+=['','## m27–m52 (thợ C2)','','(thợ C2 điền)']
open('HUADIAN_C.md','w').write("\n".join(L)+"\n")
