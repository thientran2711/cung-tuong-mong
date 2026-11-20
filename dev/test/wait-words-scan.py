#!/usr/bin/env python3
"""Scan every player-visible waiting/loading/progress/save/connect string for tech words or non-cổ-trang wording.
Usage: python3 dev/test/wait-words-scan.py [--all]   (default: only the lines flagged BAD; --all lists every wait line)"""
import re,sys,glob,os
D=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..')
files=[f for f in glob.glob(D+'/build/j*.js')+glob.glob(D+'/site/*.js') if not re.search(r'/(all|kvfallback|rot|sw\.tpl)',f)]
WAIT=re.compile(r'[Đđ]ang (tải|soát|nối|gửi|lấy|giữ|vào|mở|chờ|đợi|nạp|dựng|ghi|tìm|đồng bộ|xử lý|thỉnh|bày|chuyển|quay)|[Cc]hờ |[Đđ]ợi |Tạm (dừng|ngưng)|[Tt]ải|[Kk]ết nối|[Đđ]ồng bộ|mất kết nối|[Mm]ạng|bộ nhớ|[Ll]ưu|Đang lưu|trình duyệt|\bMB\b|\btệp\b|[Ss]erver|\bbuild\b|[Bb]ản mới|[Cc]ập nhật|Thỉnh tranh|thỉnh tranh')
BAD=re.compile(r'[Tt]ải|[Kk]ết nối|mất kết nối|[Đđ]ồng bộ|[Mm]ạng|bộ nhớ đệm|\bMB\b|\btệp\b|[Ss]erver|\bbuild\b|trình duyệt|[Cc]ập nhật|\.\.\.|…\s*["`\'<]|Đang (nối|gửi|lấy|giữ|soát)|Loading')
STR=re.compile(r'("(?:[^"\\\n]|\\.)*"|`(?:[^`\\]|\\.)*`|\'(?:[^\'\\\n]|\\.)*\')')
allm='--all' in sys.argv
for f in sorted(files):
  for i,l in enumerate(open(f,encoding='utf-8'),1):
    if l.lstrip().startswith(('/*','//','*')):continue
    for m in STR.finditer(l):
      s=m.group(1)
      if not re.search(r'[À-ỹ]',s):continue
      if WAIT.search(s) and (allm or BAD.search(s)):print('%s:%d: %s'%(os.path.relpath(f,D),i,s[:170]))
