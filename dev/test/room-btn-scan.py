#!/usr/bin/env python3
"""room-btn scan (LUAT SUA CA NHOM): every text "back to a place" bar ('‹ Phòng', '‹ Bản đồ', '‹ <place>') built by game code.
Fails (exit 1) when one is left as a text bar instead of kitBackBtnHtml. '‹ Lui' (kit dialog kbtn) and pager ‹ › are NOT place bars."""
import re,glob,sys
bad=[];ok=[]
for f in sorted(glob.glob('dev/build/j*.js')):
    if re.search(r'/(all|j[0-9]*no)',f) or '/all' in f: continue
    for n,l in enumerate(open(f,encoding='utf-8'),1):
        if re.search(r'(innerHTML|textContent)\s*=\s*"(‹|\\u2039)\s*(Phòng|Bản đồ|Nơi)',l) or re.search(r'"\\u2039 "\s*\+\s*k3PlaceName',l):
            bad.append(f'{f}:{n}')
        if 'kitBackBtnHtml(' in l and 'function kitBackBtnHtml' not in l: ok.append(f'{f}:{n}')
print('text place-back bars left:',len(bad),bad);print('kitBackBtnHtml sites:',len(ok),ok);sys.exit(1 if bad else 0)
