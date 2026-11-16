#!/usr/bin/env python3
"""ONE CORE scan (owner OD:L1267) for the 14-chapter frame, review/story14-p1-r2 item 4.
Lists every number literal in dev/build/jst14.js code (comments stripped) and every number word in its player text, split into
game numbers (should come from BAL) and code numbers (indices, version tags, loop guards, Hoàng hậu rank index 7, string slices).
usage: python3 dev/measure/st14-onecore-scan.py [file]   (exit 1 if a game number is still typed)"""
import re,sys
f=sys.argv[1] if len(sys.argv)>1 else 'dev/build/jst14.js'
src=open(f,encoding='utf-8').read()
code=re.sub(r'/\*.*?\*/','',src,flags=re.S)
CODE_OK=[r'v2:4',r'v:1',r'nx:999',r'bm:-9',r'n:0',r'i:-1',r'slice\(3\)',r'g<8',r'S\.rank>=7',r'Math\.min\(S\.rank,7\)',r'"end:12"',r'p==="end:12"',
 r'\[2\]',r'\[1\]',r'\[0\]',r'-1',r'\b1\b',r'\b0\b',r'\b2\b',r'\*100',r'100-',r'<100',r'>=100',r'rnd67\(\)\*100',r'\.length-1',r'Math\.max\(1,',r'r0=1',r'\b4\b',r'return 100']
nums=[]
for m in re.finditer(r'(?<![\w.$"#-])(\d+)(?![\w])',code):
    ctx=code[max(0,m.start()-25):m.end()+15].replace('\n',' ')
    nums.append((m.group(1),ctx))
WORDS=re.findall(r'\b(sáu|tám|mười hai|mười|ba chương|tám chương)\b',code)
game=[]
for n,ctx in nums:
    if n in ('0','1','2','3','4','7','8','9','12','14','100','999') and any(re.search(p,ctx) for p in CODE_OK): continue
    game.append((n,ctx))
print(f'{f}: {len(nums)} number literals in code, {len(game)} not on the code-number list; number words in text: {len(WORDS)}')
for n,ctx in game: print('  ',n,'|',ctx)
for w in WORDS: print('   word |',w)
sys.exit(1 if game or WORDS else 0)
