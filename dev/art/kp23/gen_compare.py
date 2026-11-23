#!/usr/bin/env python3
"""Generate dev/art/kp23/compare.html: 194 act keys, LEFT = live img/act-<key>-h.webp, RIGHT = new img/act-<key>.webp.
Labels = the Vietnamese 'moment' sentence of the J3 prompt (git origin/review/art-prompts-j). Run from repo root:
  python3 dev/art/kp23/gen_compare.py   ->  upload: python3 dev/site/cdn_sync.py img/_review/kp23-compare.html"""
import json, re, subprocess, html
R = json.load(open('dev/art/kp23/keys.json'))
def moment(k):
    t = subprocess.check_output(['git', 'show', 'origin/review/art-prompts-j:dev/art/prompts/J3/act-%s.txt' % k]).decode()
    m = re.search(r'in Vietnamese[^:]*: «([^»]+)»', t)
    return m.group(1).strip() if m else k
rows = [[k, moment(k)] for k in R]
json.dump(rows, open('dev/art/kp23/labels.json', 'w'), ensure_ascii=False, indent=0)
TPL = open('dev/art/kp23/compare.tpl.html', encoding='utf-8').read()
open('dev/art/kp23/compare.html', 'w', encoding='utf-8').write(TPL.replace('/*ROWS*/[]', json.dumps(rows, ensure_ascii=False)))
print(len(rows))
