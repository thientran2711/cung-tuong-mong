#!/usr/bin/env python3
"""LAW 11 scan (CO-OP HEIR FIX r2): every place that changes who is Thai tu (or clears it) and the co-op road that carries
the mother's gain / loss to the OTHER player's seat. Prints one row per call site; a site with no road listed = a miss.
usage: python3 dev/test/scan-heir-family.py   (exit 1 when a site has no co-op road)"""
import re, glob, os, sys
ROOT = os.path.join(os.path.dirname(__file__), '..', 'build')
PAT = re.compile(r'setHeir\(|deposeHeir\(|\.heir=false|S\.heir=(?!=)')
# file -> (where it runs in co-op, how the other seat gets the same gain/loss as solo)
ROAD = {
    'j1.js': ('j1 setHeir / kidDie (core)', 'setHeir / deposeHeir: jkidlife wrap in the caller context; kidDie (S.heir only when that son): no Danh in solo, her side via res.fam kdie op'),
    'j3.js': ('heirMonth (host only, her entry in the harem)', "her son: hrCard gain (P1); her son put aside: hrCard loss r2 (P2); host/NPC mother: host-context wrap"),
    'j51.js': ('kvDebate phe/lap inside heirMonth (host only)', 'same S.hr road as j3 -> hrCard (gain P1 / loss P2)'),
    'j4.js': ('her act (coup with her father) in her context', 'r2 withSeat heir mirror: the put-aside mother (NPC / the host stand-in) loses via the wrap, her son -> S.hr + host hrApply'),
    'j8.js': ('kframe (tru eo) NPC or her act', 'j1 deposeHeir (fix-kframe-heir): mother -heirDanh via the jkidlife wrap in the caller context (her entry on the host: her numbers back as kframeDanh); heir0 in res.fam kd op clears her flag'),
    'j97.js': ('her act (mat chieu) in her context', 'r2 withSeat heir mirror: reads world S.hr, her new heir -> S.hr + host hrApply'),
    'jend14.js': ('her act (ch14 win) in her context', 'r2 withSeat heir mirror: reads world S.hr, her new heir -> S.hr + host hrApply'),
    'j99succ.js': ('succession pick at the Emperor death (host world)', 'S.heir only when none alive; no Danh in solo (line 203 = succDebug, a debug jump)'),
    'jcoopworld.js': ('co-op roads', 'hrApply / hrCard / res.fam ops'),
    'jcoopthinb.js': ('a new life (blank person)', 'her new life: no heir; no Danh'),
    'jkidlife.js': ('setHeir / deposeHeir wraps (the Danh)', 'the rule itself'),
}
miss = 0; rows = []
for f in sorted(glob.glob(os.path.join(ROOT, 'j*.js'))):
    b = os.path.basename(f)
    for i, line in enumerate(open(f, encoding='utf8'), 1):
        for m in PAT.finditer(line):
            ctx = line[max(0, m.start() - 50):m.end() + 40].replace('\n', ' ')
            r = ROAD.get(b)
            rows.append((b, i, r[0] if r else '?', r[1] if r else 'NO CO-OP ROAD', ctx))
            if not r: miss += 1
for b, i, w, h, c in rows:
    print(f'{b}:{i} | {w} | {h} | ...{c}...')
print(f'scan-heir-family: {len(rows)} sites, {miss} without a co-op road')
sys.exit(1 if miss else 0)
