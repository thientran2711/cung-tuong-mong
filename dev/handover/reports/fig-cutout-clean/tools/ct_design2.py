#!/usr/bin/env python3
"""W4d v2: design per key from W5c's rank-sample/maid-consort-tier-design-table.md
usage: ct_design2.py <key> ... -> TSV key, colour(tinted by tier), motif, hair accent, prop, pose, richness"""
import sys,re,hashlib
T={}
for l in open('/tmp/claude-0/w/design-table.md'):
    m=re.match(r"\| m(\d+) \| (\w+) \| ([^|]+)\| ([^|]+)\| ([^|]+)\| ([^|]+)\|",l)
    if m: T[int(m[1])]=[x.strip() for x in m.groups()[2:]]
OVR={4:'warm orange-apricot (clearly more orange than peach-pink)',13:'strong coral (coral-orange-pink, clearly stronger than salmon)',14:'bright yellow-green (clearly yellower than mint or jade)',15:'bluer wisteria-violet (clearly bluer than lilac)',16:'deep rose-red (clearly deeper than blush pink)'}  # ROOT-3 redo overrides for ty1 a18
TINT={1:"soft pale tint of",2:"mid-tone",3:"deep jewel tone of"}
RICH={1:"ONE flowing sheer layer, wide flowing sleeves, embroidered border with a modest motif on hem and cuffs, crossed collar, thin sash, small hairpins",
2:"TWO layers with a contrasting inner skirt, wide flowing sleeves, motif embroidered over bodice and sleeves, a sheer gauze shawl over one arm, richer hairpins",
3:"THREE layers: sheer gauze outer robe over a patterned tunic over a layered skirt, wide flowing sleeves, rich embroidery and beaded edges, ornate hairpiece, jewelled girdle pendants"}
POSE=["three-quarter turn to the left, prop held at chest","gentle frontal, prop lifted at shoulder height","slight lean, one sleeve lifted with the free hand","three-quarter turn to the right, prop held low in both hands","frontal, one hand holding the prop out to the side","slightly angled, prop at the waist, the other hand lightly touching the sleeve","walking pose, one foot a little forward, prop in one hand","frontal, prop held near face level, other hand resting on the sash"]
for k in sys.argv[1:]:
    m=re.match(r"maid-m(\d+)-ty(\d)-(a\d+)$",k); n,t=int(m[1]),int(m[2])
    col,mot,hair,prop=T[n]
    if n in OVR: col=OVR[n]
    pose=POSE[int(hashlib.md5((k+'p').encode()).hexdigest(),16)%len(POSE)]
    print("\t".join([k,f"{TINT[t]} {col}",mot,hair,prop,pose,RICH[t]]))
