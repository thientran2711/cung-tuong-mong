import sys,subprocess,numpy as np
for f in sys.argv[1:]:
    b=subprocess.run(["ffmpeg","-v","error","-i",f,"-ac","1","-ar","44100","-f","f32le","-"],capture_output=True).stdout
    x=np.frombuffer(b,dtype=np.float32).astype(float)
    X=np.abs(np.fft.rfft(x*np.hanning(len(x))))**2;fr=np.fft.rfftfreq(len(x),1/44100)
    c=(X*fr).sum()/X.sum();hf=X[fr>6000].sum()/X.sum();fl=np.exp(np.mean(np.log(X[(fr>100)&(fr<10000)]+1e-20)))/np.mean(X[(fr>100)&(fr<10000)])
    print(f"{f.split('/')[-1]:24s} centroid={c:6.0f}Hz hf>6k={hf*100:5.1f}% flat={fl:.3f}")
