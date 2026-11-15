#!/usr/bin/env python3
"""LUẬT SỬA CẢ NHÓM scan (owner 15/11 17:30Z): every player-visible text that GIVES her non-silver goods must come with a real item
in S.inv (picture, grade, use). Lists string literals in the game modules (assemble.py order) that pair a giving verb with a goods noun,
and whether the same line also gives a real item (inv.push / reward67 / r97give / bestow / stipGive / goodsGive / giveIt...).
usage: python3 dev/test/goods-scan.py [--all] [--fail] [--root <build dir>]   (--all also prints lines that already give a real item)
   Each hit: REAL (the line gives an item), TABLE (jstip STIP_EV / STIP_FPRIZE gives it), NOTGIFT (triaged: not goods given to her, reason),
   TEXT (text-only gift: must be fixed). Before/after: run with --root on a checkout of origin/main dev/build."""
import re,sys,os
D=os.path.dirname(os.path.abspath(__file__))+'/../build/'
if '--root' in sys.argv:D=sys.argv[sys.argv.index('--root')+1].rstrip('/')+'/'
mods=re.findall(r"'(j[^']+\.js)'",open(D+'assemble.py',encoding='utf-8').read())
GIVE=r"(?:ban(?! đêm| ngày)|ban thưởng|thưởng|tặng|biếu|gửi|gởi|phát|lĩnh|nhận|được|cho ngươi|khao|đem đến|mang đến|mang sang|dâng lên cho ngươi|đưa cho ngươi|giải thưởng)"
GOODS=r"(?:súc vải|xấp|tấm vải|vải|lụa|gấm|trà|than|son phấn|son|phấn|trâm|vòng|ngọc bội|ngọc|nhân sâm|sâm|yến sào|tổ yến|hương trầm|túi thơm|áo|quạt|khăn|bánh|mứt|rượu|tranh|đàn|nghiên|bút|mực|giấy|hoa tai|khuyên tai|châu|ngọc trai|thuốc bổ|thuốc quý|a giao|đệm|chăn|lò sưởi|hộp gấm|lễ vật|bộ đồ|y phục|trang sức|gạo|trái cây|hoa quả|điểm tâm|cung bạc|bộ cờ|cờ ngọc|giỏ cua|chè|rương|đèn lụa|gương|lược|hài|nến|kẹo|hộp quà|áo choàng|áo lông|thức ăn|món ăn|mâm cỗ|cỗ|vật phẩm|đồ ban|quà)"
REAL=re.compile(r"\bgi:|\brw:\"|inv\.push|reward67\(|r97give\(|bestow\(|stipGive\(|goodsGive\(|kitReward\(|giveIt\(|wdGive\(|vlGive\(|gainItem\(")
pat=re.compile(GIVE+r"[^\"'`<>]{0,40}?\b"+GOODS,re.I)
STR=re.compile(r'"(?:[^"\\\n]|\\.)*"|`(?:[^`\\]|\\.)*`|\'(?:[^\'\\\n]|\\.)*\'',re.S)
SKIP=re.compile(r"lụa trắng|rượu độc|ban chết|thưởng hoa|thưởng trà|thưởng nguyệt|thưởng tuyết|thưởng mai|thưởng cúc|thưởng đèn|thưởng ngoạn|tranh sủng|tranh giành|tranh cãi|tranh đấu|tranh ghế|tranh công|bức tranh vẽ|đàn hặc|ban ngày|được lòng|được ngọc|châu báu triều|trà trộn|than thở|than khóc|kêu than|than vãn|ngọc thể|ngọc tỷ",re.I)
# triaged: texts that do NOT hand her goods (reason shown in the table)
NOTGIFT=[(r"nến đỏ cháy đến canh tư","NIGHTS: dead data, never shown"),(r"Ban cho \$\{S\.maid\.name\} vòng bạc|bà đỡ ấy|vú nuôi ấy","she gives to a servant"),
 (r"^Tặng quà$|Tặng trâm, kết thân|Biếu|Gửi |gửi quà có độc|Tặng bánh kẹo|Son phấn hỏng tặng|Gửi lễ vật","she gives, not receives"),
 (r"nhận quà|nhận lễ|Nhận quà|nhận chén trà|không nhận","someone else receives / refuses"),(r"điểm tâm$|mùi lạ trong điểm tâm|thử son phấn|người thử món","poison plot, no gift"),
 (r"Lĩnh than, nến, vải vóc theo phần của cung","servant chore: fetching the palace's goods"),(r"được Hoàng thượng|được chăng|nhớ được|Được thì|không moi được|giữ được|chưa ngóc đầu lên được|Chơi được|nghe nhận xét|được treo|được may","not a gift ('được' = can / is)"),
 (r"nhặt được trong lễ vật|mảnh giấy|mảnh thư","a clue / letter, not goods"),(r"Giặc nhận hòa|châu\.|bạc trà, ngựa, ngọc|ngọc điệp|cỗ quan tài","not goods (place / record / story)"),
 (r"trâm gãy đôi","a threat token (story prop), no use as goods"),(r"ban thuốc bổ\.","drunk at once (option Uống thuốc của cô tổ)"),(r"ban thuốc quý về nhà","given to her family"),
 (r"bát chè tổ yến|canh hạt sen","food eaten on the spot"),(r"Bức họa Thái hậu ban","an old gift being damaged"),(r"Phát áo bông cho cung nhân|Áo cờ hậu cung gửi ra ải","she gives to others"),
 (r"Sứ thần tặng một cây đàn lạ, ngài muốn","the Emperor's (only option 'Xin giữ' gives it: TABLE)"),(r"Ngươi có được hộp Ngọc dung cao","bought and used at once (scar cured)"),(r"chim họa mi|con vẹt|con công|đầu bếp","a live animal / a person, not a chest item"),
 (r"xin gửi cho ta tấm áo bông","a request from someone else"),(r"vải sa ra","craft output (real item, jveil)"),(r"Hai chị em thỉnh thoảng gửi nhau","story narration between others"),
 (r"Ngươi gửi thư và quà|h54GainTxt|y phục Nam Chiếu|gửi ít quà về cho mẹ|Không nhận túi thơm|mượn danh ngươi gửi|Mẹ gửi vào rương sách","not a gift to her (wording)"),(r"gửi quà: ‘Nghe nói cha","the gift is silver (option: Bạc +60)"),(r"Đồ phát là vật phẩm thật|Hàng kém Nội vụ phủ phát","item / rule descriptions (jstip)")]
TABLE=[]
try:
  J=open(D+'jstip.js',encoding='utf-8').read()
  for m in re.finditer(r'\["(\w+)",/([^/]+)/,"(\w+)"',J):TABLE.append((re.compile(m.group(2)),m.group(3)))
  FP=re.search(r'STIP_FPRIZE=\{([^}]*)\}',J)
  if FP:
    for k,v in re.findall(r'"(\w+:\w+)":"(\w+)"',FP.group(1)):TABLE.append((re.compile({'newyear:mua':'thưởng gấm Tô Châu','nguyentieu:co':'Hoàng thượng ban trà','phoenix:ban':'thưởng cung bạc'}.get(k,'$^')),v))
except FileNotFoundError:pass
rows=[];allf='--all' in sys.argv
for f in mods:
  p=D+f
  if not os.path.exists(p):continue
  L=open(p,encoding='utf-8').read().split('\n')
  for i,line in enumerate(L,1):
    real=bool(REAL.search('\n'.join(L[i-1:i+3])))  # the gift may sit on the option / end lines right under the text
    for m in STR.finditer(line):
      s=m.group(0)[1:-1]
      for h in pat.finditer(s):
        t=h.group(0)
        if SKIP.search(s[max(0,h.start()-10):h.end()+12]):continue
        if real and not allf:continue
        ctx=re.sub(r'\s+',' ',s[max(0,h.start()-50):h.end()+50]);st='REAL' if real else 'TEXT';why=''
        if st=='TEXT':
          tb=[k for r,k in TABLE if r.search(s)]
          if tb:st,why='TABLE',tb[0]
          else:
            ng=[w for r,w in NOTGIFT if re.search(r,s)]
            if ng:st,why='NOTGIFT',ng[0]
        if st!='TEXT' and st!='REAL' and not allf and st=='NOTGIFT':pass
        rows.append((f,i,st,ctx,why))
for r in rows:print(f"{r[0]}:{r[1]}\t{r[2]}\t{r[4]}\t{r[3]}")
print(f"# {len(rows)} hits ({sum(1 for r in rows if r[2]=='TEXT')} text-only)",file=sys.stderr)
if '--fail' in sys.argv and any(r[2]=='TEXT' for r in rows):sys.exit(1)
