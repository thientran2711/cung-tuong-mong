#!/usr/bin/env python3
"""W4d: per-key design assignment for the maid consort-tier redraw.
usage: ct_design.py <key> ...  -> TSV key<TAB>colour<TAB>motif<TAB>prop<TAB>pose
Greedy: neighbours mNN+-1,2 of the same tier+age never share colour/prop/pose."""
import sys,re,hashlib
COL=["peach apricot","rose pink","coral red","crimson","lavender","violet plum","sky blue","teal","jade green","sage green","butter yellow","gold ochre","ivory cream","dusty mauve","sea-foam mint","navy indigo","burgundy wine","turquoise","champagne beige","lilac grey"]
MOT=["peonies","plum blossoms","cranes","butterflies","lotus","chrysanthemums","phoenix feathers","orchids","clouds and waves","bamboo leaves","magnolias","peach blossoms"]
PROP=["a folded silk fan","a small glowing lantern","a silk handkerchief","a porcelain teacup","a flower branch","a rolled scroll","a jade pendant between two fingers","a small book","a small round palace fan","a string of prayer beads","a lotus flower","a small brush and scroll"]
POSE=["three-quarter turn to the left, one hand holding the prop at chest","gentle frontal, the prop lifted at shoulder height","slight lean, one sleeve lifted with the free hand","three-quarter turn to the right, prop held low in both hands","frontal, one hand holding the prop out to the side","slightly angled, prop held at the waist with one hand, the other hand lightly touching the sleeve","walking pose, one foot a little forward, prop in one hand","frontal, prop held up near the face level, other hand resting on the sash"]
def h(s,n): return int(hashlib.md5(s.encode()).hexdigest(),16)%n
def parse(k):
    m=re.match(r"maid-m(\d+)-ty(\d)-(a\d+)$",k); return int(m[1]),int(m[2]),m[3]
chosen={}
def pick(k,lst,name):
    n,t,a=parse(k); i=h(k+name,len(lst))
    bad={chosen.get((n+d,t,a,name)) for d in (-2,-1,1,2)}
    for j in range(len(lst)):
        c=lst[(i+j)%len(lst)]
        if c not in bad: chosen[(n,t,a,name)]=c; return c
for k in sys.argv[1:]:
    print("\t".join([k,pick(k,COL,'c'),pick(k,MOT,'m'),pick(k,PROP,'p'),pick(k,POSE,'o')]))
