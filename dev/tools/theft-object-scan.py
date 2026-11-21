#!/usr/bin/env python3
"""IT05 whole-group scan (law 6c REAL OBJECTS, OD:L1313): every code line whose player-visible text says an OBJECT was stolen / taken /
lost while the code on that line moves only silver (bac:-) and no real piece (no chest splice / jlost case / item-ledger route).
Usage: python3 dev/tools/theft-object-scan.py [--all]   (from a worktree root). Exit 1 if an unrouted hit remains.
--all also prints the lines that DO move a real piece (the routed ones), for the before/after table."""
import re,sys,glob,os
VERB=re.compile(r'(lấy trộm|trộm|lấy cắp|đánh cắp|cuỗm|cướp|thất lạc|lấy mất|đánh mất|mất trộm|bị lấy|vơi đi|ôm .{0,20}bỏ trốn)',re.I)
OBJ=re.compile(r'(hộp trang sức|trang sức|trâm|vòng|ngọc|xuyến|khuyên|nhẫn|áo|lụa|gấm|bình|đồ quý|món đồ|tráp|châu báu|vàng bạc châu báu|hoa tai|kim bộ dao)',re.I)
SILVER=re.compile(r'\{[^{}]*\bbac:\s*-|bac:-|apply\(\{bac:-|-=\s*g\b')
ROUTED=re.compile(r'inv\.splice|loLose|loLoseE|maidTheft|ilGone|ilMove|wdTake|itemTake|takeItem|lostTake|loSteal|dhConfiscate|confisc|stealItem|\.inv\.push|wdFrame|loEvBack')
SILVER_TXT=re.compile(r'bạc|lượng')
def scan():
  out=[]
  for f in sorted(glob.glob('dev/build/j*.js')):
    if os.path.basename(f) in ('jbal.js','jbal2.js','jbaleff.js','jbalarc.js'):continue
    for i,l in enumerate(open(f,encoding='utf-8'),1):
      if len(l)>6000:segs=re.split(r'(?<=;)\s*(?=else|if\(|const |let )',l)
      else:segs=[l]
      for sg in segs:
        if not (VERB.search(sg) and OBJ.search(sg) and SILVER.search(sg)):continue
        m=VERB.search(sg);ctx=sg[max(0,m.start()-60):m.end()+80].replace('\n',' ')
        routed=bool(ROUTED.search(sg))
        # the object named is the silver itself ("bạc trong hộp", "lượng") → fine
        obj=OBJ.search(sg[max(0,m.start()-80):m.end()+80])
        silver_only_txt=bool(re.search(r'[Bb]ạc (cất|trong)|lượng',sg[max(0,m.start()-60):m.end()+60]))
        out.append((f,i,'routed' if routed else ('silver text' if silver_only_txt else 'UNROUTED'),ctx))
  # outcomes that make an object vanish for good ("đồ mất hẳn", "mất món đồ") with no real piece behind them
  for f in sorted(glob.glob('dev/build/j*.js')):
    for i,l in enumerate(open(f,encoding='utf-8'),1):
      for m in re.finditer(r'R6\("[^"]*(mất hẳn|đồ mất"|mất món đồ)[^"]*"\)',l):
        ctx=l[max(0,m.start()-60):m.end()+40]
        out.append((f,i,'routed' if 'loEvBack' in l or 'LO_EV' in l else 'UNROUTED',ctx))
  return out
if __name__=='__main__':
  R=scan();bad=[r for r in R if r[2]=='UNROUTED']
  for f,i,st,ctx in R:
    if st=='UNROUTED' or '--all' in sys.argv:print(f'| {f}:{i} | {st} | {ctx.strip()[:150]} |')
  print(f'theft-object-scan: {len(R)} lines name a taken object and move silver · routed/real piece {sum(1 for r in R if r[2]=="routed")} · UNROUTED {len(bad)}')
  sys.exit(1 if bad else 0)
