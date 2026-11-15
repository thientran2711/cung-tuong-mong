"""Normalize SFX: trim silence, fades, equal loudness (max momentary K-weighted, 400 ms), peak <= -1 dBFS, mono mp3 64k.
usage: norm.py OUTDIR TARGET_LUFS in1.mp3 [in2 ...]   prints a table"""
import sys, subprocess, json, numpy as np
from scipy.signal import lfilter
SR=44100
import os
BRIGHT=set(os.environ.get("BRIGHT","").split(","))
def dec(f):
    n=f.split("/")[-1].rsplit(".",1)[0];af="lowpass=f=14000"+(",treble=g=-6:f=5500:w=0.7" if n in BRIGHT else "")
    if '--gain-only' in sys.argv: af="anull"
    b=subprocess.run(["ffmpeg","-v","error","-i",f,"-af",af,"-ac","1","-ar",str(SR),"-f","f32le","-"],capture_output=True,check=True).stdout
    return np.frombuffer(b,dtype=np.float32).astype(np.float64)
def kw(x):
    # BS.1770 K-weighting at 44.1k (shelf + highpass), coefficients from pyloudnorm design (approx for 44.1k)
    import math
    G=4.0;Q=1/math.sqrt(2);fc=1681.974450955533
    A=10**(G/40);w0=2*math.pi*fc/SR;al=math.sin(w0)/(2*Q)
    b0=A*((A+1)+(A-1)*math.cos(w0)+2*math.sqrt(A)*al);b1=-2*A*((A-1)+(A+1)*math.cos(w0));b2=A*((A+1)+(A-1)*math.cos(w0)-2*math.sqrt(A)*al)
    a0=(A+1)-(A-1)*math.cos(w0)+2*math.sqrt(A)*al;a1=2*((A-1)-(A+1)*math.cos(w0));a2=(A+1)-(A-1)*math.cos(w0)-2*math.sqrt(A)*al
    y=lfilter([b0/a0,b1/a0,b2/a0],[1,a1/a0,a2/a0],x)
    fc=38.13547087602444;Q=0.5003270373238773;w0=2*math.pi*fc/SR;al=math.sin(w0)/(2*Q)
    b=[1,-2,1];a0=1+al;a=[1,-2*math.cos(w0)/a0,(1-al)/a0]
    return lfilter([1/a0*(1+math.cos(w0))/2*0+1,-2,1],[1,a[1],a[2]],y)*((1+math.cos(w0))/2/a0)
def mmax(x):
    y=kw(x);n=int(.4*SR);h=int(.1*SR)
    if len(y)<n: y=np.pad(y,(0,n-len(y)))
    best=-99
    for i in range(0,len(y)-n+1,h):
        p=np.mean(y[i:i+n]**2)
        if p>0: best=max(best,-0.691+10*np.log10(p))
    return best
def rms_frames(x,w=int(.02*SR)):
    k=len(x)//w; return np.sqrt(np.mean(x[:k*w].reshape(k,w)**2,axis=1)+1e-20)
GO='--gain-only' in sys.argv;A=[a for a in sys.argv[1:] if a!='--gain-only']
out=A[0];T=float(A[1])
for f in A[2:]:
    name=f.split("/")[-1].rsplit(".",1)[0]
    x=dec(f);pk=np.max(np.abs(x))+1e-12
    r=rms_frames(x);db=20*np.log10(r/pk)
    on=np.where(db>-38)[0]
    s=max(0,on[0]*int(.02*SR)-int(.008*SR)) if len(on) else 0
    tail=np.where(db>-48)[0];e=min(len(x),(tail[-1]+1)*int(.02*SR)+int(.03*SR)) if len(tail) else len(x)
    if GO: s,e=0,len(x)
    x=x[s:e].copy()
    floor=np.percentile(20*np.log10(rms_frames(x)/pk),10)
    fi=int(.003*SR)
    if not GO: x[:fi]*=np.linspace(0,1,fi)
    fo=0 if GO else min(int(.08*SR),len(x)//4);x[len(x)-fo:]*=np.linspace(1,0,fo)**1.5
    L=mmax(x);g=10**((T-L)/20);pk2=np.max(np.abs(x))*g;lim=10**(-1/20)
    if pk2>lim*10**(12/20):g*=lim*10**(12/20)/pk2   # at most 12 dB into the limiter
    y=(x*g).astype(np.float32)
    o=f"{out}/{name}.mp3"
    af="alimiter=limit=0.84:attack=2:release=60:level=disabled" if pk2>lim else "anull"
    yb=subprocess.run(["ffmpeg","-v","error","-f","f32le","-ar",str(SR),"-ac","1","-i","-","-af",af,"-f","f32le","-"],input=y.tobytes(),capture_output=True,check=True).stdout
    y=np.frombuffer(yb,dtype=np.float32)
    subprocess.run(["ffmpeg","-v","error","-y","-f","f32le","-ar",str(SR),"-ac","1","-i","-","-c:a","libmp3lame","-b:a","64k","-ar",str(SR),o],input=y.tobytes(),check=True)
    import os
    print(f"{name:22s} dur={len(y)/SR:5.2f}s trimLead={s/SR:5.3f}s gain={20*np.log10(g):+6.1f}dB Mmax={mmax(y.astype(np.float64)):6.1f} peak={20*np.log10(np.max(np.abs(y))+1e-12):5.1f} floor={floor:6.1f}dB bytes={os.path.getsize(o)}")
