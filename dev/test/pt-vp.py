#!/usr/bin/env python3
"""pt-vp (review/phutang-road): VANPHONG scan of every player-visible string in the Phù Tang road files
(jrd_pt.js, jrd_pt2.js) and the pf rows of jkc2.js / joi.js / j72.js: no %, no digits used as numbers in story text,
no machine marks ({token}, =>, undefined, NaN, null), no modern/foreign game words (VANPHONG §3), no cut text,
and the foreman bans for this land (no Wokou word; no thập nhị đơn / kimono dress words).
usage: python3 dev/test/pt-vp.py   (exit 1 on any BAD)"""
import re,sys,os
B=os.path.join(os.path.dirname(__file__),'..','build')
FILES=['jrd_pt.js','jrd_pt2.js']
BAN=[r'%',r'[{}]|=>|undefined|NaN|\bnull\b',r'\b(OK|buff|stat|level|combo|random|bot|test|game|click|tab|slot)\b',
     r'điểm|chỉ số|cơ hội|kiểm tra|dữ liệu|hệ thống|phiên bản',r'…|\.\.\.',
     r'(?i)wokou|oa khấu|uy khấu|thập nhị đơn|kimono|samurai|ninja|geisha|shogun|tướng quân mạc phủ',r'\d']
VI=re.compile(r'[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]',re.I)
STR=re.compile(r'"((?:[^"\\\n]|\\.)*)"|`((?:[^`\\]|\\.)*)`|\'((?:[^\'\\\n]|\\.)*)\'')
def strings(src):
  src=re.sub(r'/\*.*?\*/',lambda m:'\n'*m.group(0).count('\n'),src,flags=re.S)  # comments are not shown
  for m in STR.finditer(src):
    s=next(g for g in m.groups() if g is not None)
    if VI.search(s) and not re.search(r'\$\{[^}]*$',s):  # a cut template (nested quotes) is code, not text
      s=re.sub(r'\$\{[^}]*\}',' ',s)   # template holes are code, filled by the engine
      s=re.sub(r'\{[a-zA-Z_]\w*\}',' ',s)  # {v} {land} {maid}: engine name tokens (pt-roads-bal checks them: unknown tokens none)
      s=re.sub(r'(hồi|Hồi) \d+/\d+',' ',s)  # the shared chapter label «hồi n/m» of the kit header
      s=re.sub(r'<[^>]+>',' ',s)
      yield src.count('\n',0,m.start())+1,s
bad=[];n=0
for f in FILES:
  src=open(os.path.join(B,f),encoding='utf8').read()
  for ln,s in strings(src):
    n+=1
    for re_ in BAN:
      if re.search(re_,s):bad.append(f'{f}:{ln} {re_} :: {s[:160]}')
# pf rows in shared files: lines that mention pf / Phù Tang
for f in ['jkc2.js','joi.js','j72.js','jgecat.js','jentry.js']:
  src=open(os.path.join(B,f),encoding='utf8').read()
  for ln,line in enumerate(src.split('\n'),1):
    if 'Phù Tang' in line or re.search(r'\bpf\b',line):
      for _,s in strings(line):
        n+=1
        for re_ in BAN:
          if re.search(re_,s):bad.append(f'{f}:{ln} {re_} :: {s[:160]}')
for b in bad:print('BAD',b)
print(f'PT-VP FAIL ({len(bad)})' if bad else f'PT-VP PASS ({n} strings)');sys.exit(1 if bad else 0)
