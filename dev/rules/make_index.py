import json,os,re,glob
# Regenerates dev/PRIORITY_RULES.md and dev/art/OWNER_ART_RULES.md (short indexes) from dev/rules/. Run from the repo root: python3 dev/rules/make_index.py
SETS=[('Main chat','START_CORE + START_FOREMAN + START_MAIN'),('Foreman','START_CORE + START_FOREMAN'),('Worker','START_CORE + START_WORKER'),('Reviewer','START_CORE + START_WORKER + START_REVIEWER'),('Art work (incl. main making samples)','START_CORE + START_WORKER + START_ART')]
def kb(p): return '%.1f KB'%(os.path.getsize(p)/1024)
def desc(p):
    for l in open(p,encoding='utf-8'):
        if l.startswith('Holds: '): return l[7:].strip().rstrip('.')
def build(title,art):
    o=['# %s — INDEX (the rules themselves live in dev/rules/)'%title,'',
    "Owner rule OD:L1241 (low context): every session starts small. Do NOT read the whole canon. Read your role's START set in full, then ONLY the topic files your task touches. Every owner line is kept verbatim with its [source:Lnn] tag, in exactly ONE file under dev/rules/ (find a tag: grep -rn '\\[OD:L123\\]' dev/rules). Canon overwrite (OD:L1232) applies inside those files: old line deleted, new line written in its place.",'',
    '## Start sets (read in full at start)','']
    for r,s in SETS: o.append('- %s: %s'%(r,' + '.join('dev/rules/%s.md'%x.strip() for x in s.split('+'))))
    o+=['','## Start files','']
    for p in sorted(glob.glob('dev/rules/START_*.md')): o.append('- %s (%s): %s'%(p,kb(p),desc(p)))
    o+=['','## Topic files (read only when the task touches the topic)','']
    tp=sorted(glob.glob('dev/rules/topic/*.md'))
    tp=[p for p in tp if ('/art-' in p)==art]+[p for p in tp if ('/art-' in p)!=art]
    for p in tp: o.append('- %s (%s): %s'%(p,kb(p),desc(p)))
    o+=['','Before 11/16/2026 this file held all lines itself (~%s); split by script with 0 lines lost, 0 duplicated, 0 text changes (report: dev/handover/reports/canon-pairs.md).'%('200 KB' if not art else '192 KB')]
    return '\n'.join(o)+'\n'
open('dev/PRIORITY_RULES.md','w',encoding='utf-8').write(build('PRIORITY RULES',False))
open('dev/art/OWNER_ART_RULES.md','w',encoding='utf-8').write(build('OWNER ART RULES',True))
