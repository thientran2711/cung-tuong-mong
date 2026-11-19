import sys, json, os
sys.path.insert(0, "/home/user/wt/live1/dev/art/headtop"); import headtop as H
M = "/home/user/wt/face_landmarker.task"; F = "/home/user/wt/live1/img/fig-ht.json"
t = json.load(open(F)); keys = [l.strip() for l in open(sys.argv[1])]; miss = []
for k in keys:
    n = f"fig-{k}.webp"; r = H.face_rows(M, open(f"/home/user/wt/lt/out/img/{n}", "rb").read())
    if not r: miss.append(n); continue
    new = int(round((r[0] - H.HAIR_K * (r[1] - r[0])) / r[2] * H.U)); print(n, t.get(n), "->", new); t[n] = new
json.dump(t, open(F, "w"), separators=(",", ":"), sort_keys=True); print("MISSING", miss, "rows", len(t))
