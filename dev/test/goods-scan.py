#!/usr/bin/env python3
"""LUẬT SỬA CẢ NHÓM scan (owner 15/11 17:30Z): every player-visible text that GIVES her non-silver goods must come with a real item
in S.inv (picture, grade, use). Lists string literals in the game modules (assemble.py order) that pair a giving verb with a goods noun,
and whether the same line also gives a real item (inv.push / reward67 / r97give / bestow / stipGive / goodsGive / giveIt...).
usage: python3 dev/test/goods-scan.py [--all] [--fail]   (--all also prints lines that already give a real item)"""
import re,sys,os
D=os.path.dirname(os.path.abspath(__file__))+'/../build/'
mods=re.findall(r"'(j[^']+\.js)'",open(D+'assemble.py',encoding='utf-8').read())
GIVE=r"(?:ban(?! đêm| ngày)|ban thưởng|thưởng|tặng|biếu|gửi|gởi|phát|lĩnh|nhận|được|cho ngươi|khao|đem đến|mang đến|mang sang|dâng lên cho ngươi|đưa cho ngươi|giải thưởng)"
GOODS=r"(?:súc vải|xấp|tấm vải|vải|lụa|gấm|trà|than|son phấn|son|phấn|trâm|vòng|ngọc bội|ngọc|nhân sâm|sâm|yến sào|tổ yến|hương trầm|túi thơm|áo|quạt|khăn|bánh|mứt|rượu|tranh|đàn|nghiên|bút|mực|giấy|hoa tai|khuyên tai|châu|ngọc trai|thuốc bổ|thuốc quý|a giao|đệm|chăn|lò sưởi|hộp gấm|lễ vật|bộ đồ|y phục|trang sức|gạo|trái cây|hoa quả|điểm tâm|cung bạc|bộ cờ|cờ ngọc|giỏ cua|chè|rương|đèn lụa|gương|lược|hài|nến|kẹo|hộp quà|áo choàng|áo lông|thức ăn|món ăn|mâm cỗ|cỗ|vật phẩm|đồ ban|quà)"
REAL=re.compile(r"inv\.push|reward67\(|r97give\(|bestow\(|stipGive\(|goodsGive\(|kitReward\(|giveIt\(|wdGive\(|vlGive\(|gainItem\(")
pat=re.compile(GIVE+r"[^\"'`<>]{0,40}?\b"+GOODS,re.I)
STR=re.compile(r'"(?:[^"\\\n]|\\.)*"|`(?:[^`\\]|\\.)*`|\'(?:[^\'\\\n]|\\.)*\'',re.S)
SKIP=re.compile(r"lụa trắng|rượu độc|ban chết|thưởng hoa|thưởng trà|thưởng nguyệt|thưởng tuyết|thưởng mai|thưởng cúc|thưởng đèn|thưởng ngoạn|tranh sủng|tranh giành|tranh cãi|tranh đấu|tranh ghế|tranh công|bức tranh vẽ|đàn hặc|ban ngày|được lòng|được ngọc|châu báu triều|trà trộn|than thở|than khóc|kêu than|than vãn|ngọc thể|ngọc tỷ",re.I)
rows=[];allf='--all' in sys.argv
for f in mods:
  p=D+f
  if not os.path.exists(p):continue
  for i,line in enumerate(open(p,encoding='utf-8'),1):
    real=bool(REAL.search(line))
    for m in STR.finditer(line):
      s=m.group(0)[1:-1]
      for h in pat.finditer(s):
        t=h.group(0)
        if SKIP.search(s[max(0,h.start()-10):h.end()+12]):continue
        if real and not allf:continue
        rows.append((f,i,'REAL' if real else 'TEXT',re.sub(r'\s+',' ',s[max(0,h.start()-50):h.end()+50])))
for r in rows:print(f"{r[0]}:{r[1]}\t{r[2]}\t{r[3]}")
print(f"# {len(rows)} hits ({sum(1 for r in rows if r[2]=='TEXT')} text-only)",file=sys.stderr)
if '--fail' in sys.argv and any(r[2]=='TEXT' for r in rows):sys.exit(1)
