#!/usr/bin/env python3
# Law 11 scan for E20 caoly-road: every Nam Chieu / Yunnan-image hit in dev/build/j*.js
import re,sys,glob,os
P=re.compile(r'Nam Chi[ếê]u|Nam Chiêu|chim công|voi trắng|voi |hoa trà|Nhĩ Hải|Sùng Thánh|Quân Ân|đèn bơ|lá rừng|man nữ|người rợ|chữ Hán|Hoàng huynh|hoàng huynh|hoàng thúc|canh chua|múa voi|té nước|Tết đuốc|Đoàn|Mông|cá nướng|lá chuối|ngọc bích|Hội Đồng|lão Kha|quốc vương|Quốc vương|Phụ vương|Mẫu hậu|NCL|cố quốc|Nam Chiếu|\bnc_\w+')
KEEP=set(sys.argv[2].split(',')) if len(sys.argv)>2 else set()
d=sys.argv[1] if len(sys.argv)>1 else 'dev/build'
tot=0
for f in sorted(glob.glob(d+'/j*.js')):
    for i,l in enumerate(open(f,encoding='utf8'),1):
        if 'Nam Chi' in l or 'Nhĩ Hải' in l or 'chim công' in l or P.search(l):
            tot+=1
            print(f"{os.path.basename(f)}:{i}: {l.strip()[:170]}")
print('TOTAL',tot,file=sys.stderr)
