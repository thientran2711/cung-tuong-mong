#!/usr/bin/env python3
"""GAIN-REGARD-SCAN (E-GAIN3-LIVE, law 3): over a dev/test/gain-empty.js json, every card / option whose shown gain (Được / Thành) holds HER
regard or trust for someone FALLING, written in any pronoun form («nàng quý ta −−», «tin ngươi −», «Hoàng hậu → ta: thiện cảm −»).
A loss in the green row = a non-gain painted as gain.  «thiện cảm với chủ −» (a rival's servant turned against its master) is a harm she does = kept.
A rolled Thành row may hold a red price beside green gains (kit kaRows, read by gain-empty's probe): listed as INFO when the card has another gain.
usage: python3 dev/measure/gain-regard-scan.py <gain-empty.json>  -> exit 1 when a card's gain is ONLY such a loss."""
import json,re,sys,collections
REG=re.compile(r'((quý|tin|thương|nể|mến|kính)\s+(ngươi|ta|bổn cung|nàng)(?![^\W\d_])|→ ta: thiện cảm|^thiện cảm)[^,;]*?\s*[−-]')
d=json.load(open(sys.argv[1]));A=d['all'] if isinstance(d,dict) else d
bad=collections.Counter();info=collections.Counter()
for x in A:
  g=x.get('gain') or []
  hit=[p for p in g if REG.search(p) and 'với chủ' not in p]
  if not hit: continue
  k=f"{x.get('parent','') and x['parent']+' › '}{x['name']}: «{hit[0]}»"
  (bad if len(hit)==len(g) else info)[k]+=1
print(f'cards {len(A)} | regard-loss as the only gain: {sum(bad.values())} runs, {len(bad)} distinct | beside a real gain (info): {len(info)} distinct')
for k,n in bad.most_common(): print('  BAD:',k,'x',n)
for k,n in info.most_common(): print('  info:',k,'x',n)
sys.exit(1 if bad else 0)
