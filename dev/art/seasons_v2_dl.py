import sys, subprocess, os
# usage: python3 dl.py id url id url ...
D = os.path.dirname(os.path.abspath(__file__)) + "/raw"
os.makedirs(D, exist_ok=True)
a = sys.argv[1:]
for i in range(0, len(a), 2):
    subprocess.run(["curl", "-sS", "-o", f"{D}/{a[i]}.png", a[i+1]], check=True)
    print("ok", a[i])
