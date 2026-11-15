#!/usr/bin/env python3
"""edge-cut.py — tìm tranh người bị CẮT THẲNG ở mép (vạt áo/đuôi áo bị tranh gốc cắt ngang khung).

Sếp 11/15 (Tuần lục, Thái hậu): vạt áo bên trái bị một mép thẳng đứng cắt cụt, gấu áo phẳng như dao cắt.
Dò: ở 4 mép ảnh (và 6 px sát mép), tìm đoạn dài nhất mà alpha nhảy thẳng từ đặc (≥ 200) sang trống (≤ 10) trên cùng một cột/hàng,
hoặc phần đặc chạm thẳng mép ảnh. Hình người bình thường chỉ chạm mép vài px (đỉnh đầu, mũi giày); bị cắt thì là một đoạn dài.
Ngưỡng: ≥ 20 px ở cỡ 900 (quy theo chiều cao). Dùng: python3 dev/art/edge-cut.py [--json R.json] FILE|GLOB|@list.txt
"""
import sys, os, glob, json, argparse
import numpy as np, cv2

def runs(b):
    best = cur = 0
    for v in b:
        cur = cur + 1 if v else 0; best = max(best, cur)
    return best

def check(path):
    im = cv2.imread(path, cv2.IMREAD_UNCHANGED)
    if im is None or im.ndim < 3 or im.shape[2] < 4: return None
    a = im[..., 3]; H, W = a.shape; out = {}
    for side in ("left", "right", "top", "bottom"):
        A = {"left": a, "right": a[:, ::-1], "top": a.T, "bottom": a[::-1].T}[side]   # columns = distance from that border
        best = 0; at = 0
        # solid touching the border
        r = runs(A[:, 0] >= 200)
        if r > best: best, at = r, 0
        # hard straight edge within 6 px of the border: solid at x, empty at x-1, same x along many rows
        for x in range(1, min(7, A.shape[1])):
            r = runs((A[:, x] >= 200) & (A[:, x - 1] <= 10))
            if r > best: best, at = r, x
        out[side] = (int(best), int(at))
    s = H / 900.0
    worst = max(out.items(), key=lambda kv: kv[1][0])
    return dict(file=path, W=W, H=H, sides={k: v[0] for k, v in out.items()}, worst=worst[0], run=worst[1][0],
                bad=bool(worst[1][0] >= 20 * s))

def main():
    ap = argparse.ArgumentParser(); ap.add_argument("files", nargs="+"); ap.add_argument("--json"); o = ap.parse_args(); files = []
    for f in o.files:
        if f.startswith("@"): files += [l.strip() for l in open(f[1:]) if l.strip()]
        else: files += sorted(glob.glob(f)) if any(c in f for c in "*?[") else [f]
    rep = [r for r in (check(f) for f in files) if r]
    if o.json: json.dump(rep, open(o.json, "w"))
    bad = sorted([r for r in rep if r["bad"]], key=lambda r: -r["run"] / r["H"])
    for r in bad: print("%-44s cắt %-6s %4d px  %s" % (os.path.basename(r["file"]), r["worst"], r["run"], r["sides"]))
    print("quét", len(rep), "hình;", len(bad), "bị cắt mép")

if __name__ == "__main__":
    main()
