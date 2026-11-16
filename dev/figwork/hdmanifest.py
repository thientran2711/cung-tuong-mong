#!/usr/bin/env python3
"""hdmanifest.py <hd_dir> <cur_figs_dir> <out FIGURES-hd.json> [existing FIGURES-hd.json to merge]
Writes {"files":{"fig-x.webp":[w900,wHd], ...}} for every HD twin in hd_dir (jfighd.js kitFigHD reads it)."""
import sys, os, json
from PIL import Image
hd,cur,out=sys.argv[1:4];M={}
if len(sys.argv)>4 and os.path.exists(sys.argv[4]):M=json.load(open(sys.argv[4])).get('files',{})
for f in sorted(os.listdir(hd)):
    if not(f.startswith('fig-') and f.endswith('.webp')):continue
    try:M[f]=[Image.open(os.path.join(cur,f)).size[0],Image.open(os.path.join(hd,f)).size[0]]
    except Exception as e:print(f,e)
json.dump({"files":M},open(out,'w'),separators=(',',':'));print(len(M))
