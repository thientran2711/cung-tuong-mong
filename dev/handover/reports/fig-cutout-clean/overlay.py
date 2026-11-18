#!/usr/bin/env python3
"""overlay.py REF.webp REF_HAIR NEW.webp NEW_HAIR OUT.png  (hair = hairline y at 1800-tall scale)
NEW scaled so hairline->feet equals REF's, feet + head-centre aligned. Anaglyph: red channel = REF luminance, green/blue = NEW luminance -> grey where they agree, red where only REF, cyan where only NEW."""
import sys
from PIL import Image
import numpy as np
def load(p):
    im=Image.open(p).convert('RGBA');im=im.crop(im.split()[3].getbbox());s=1800/im.height;return im.resize((round(im.width*s),1800))
def headx(im):
    a=np.asarray(im)[...,3]>40;xs=np.nonzero(a[60:260].any(0))[0];return (xs[0]+xs[-1])/2
ref,rh,new,nh,out=sys.argv[1],float(sys.argv[2]),sys.argv[3],float(sys.argv[4]),sys.argv[5]
R=load(ref);N=load(new);k=(1800-rh)/(1800-nh)
N=N.resize((round(N.width*k),round(N.height*k)),Image.LANCZOS)
dx=int(round(headx(R)-headx(N)));W=max(R.width,N.width)+500;Hh=2000;ox=250
def canvas(im,x,y):
    c=Image.new('RGBA',(W,Hh),(255,255,255,255));c.alpha_composite(im,(x,y));return np.asarray(c.convert('L'))
Rl=canvas(R,ox,100);Nl=canvas(N,ox+dx,100+1800-N.height)
rgb=np.stack([Rl,Nl,Nl],2);Image.fromarray(rgb).save(out);print('scale NEW x',round(k,3))
