#!/usr/bin/env python3
"""Build line for the game menu (owner OD:L1370 (d), go-live kit): writes window.CTM_BI into the built index.html.

usage: python3 dev/site/buildinfo.py <repo root> <content build hash B>   (called by dev/site/build_site.sh AFTER sw.js is made,
       so the shell version V never depends on it: a rebuild that only changes this line does not make players download a new build)

CTM_BI = {s: source commit (short sha, "+" when dev/build or dev/site has uncommitted edits), t: that commit's time (ISO UTC),
          c: ONE line of what changed, b: content build hash (= window.CTM_BUILD), h: [{s,t,c}, ...] the last 10 LIVE builds before this one}

What-changed line, first that exists:
  1. env CTM_CHANGE
  2. dev/site/CHANGE.txt (first line) when it differs from the live one (origin/main) -> the pusher writes it in the branch
  3. newest non-merge commit subject in <live>..HEAD
  4. HEAD subject
History = the live build's own CTM_BI (its line + its history), read from <live>:index.html, live = env CTM_LIVE_REF or origin/main.
When the live build has no CTM_BI yet (first time), the history is just the live commit itself.
Deterministic: the same HEAD + the same live ref give the same line (time = commit time, not the clock).
"""
import json, os, re, subprocess, sys

R, B = sys.argv[1], (sys.argv[2] if len(sys.argv) > 2 else "")
def git(*a):
    try:
        return subprocess.run(["git", "-C", R] + list(a), capture_output=True, text=True, check=True).stdout
    except Exception:
        return ""

def one(s, n=140):
    s = " ".join((s or "").split())
    return s if len(s) <= n else s[: n - 1] + "…"

LIVE = os.environ.get("CTM_LIVE_REF", "origin/main")
head = git("rev-parse", "--short=8", "HEAD").strip()
dirty = git("status", "--porcelain", "--", "dev/build", "dev/site").strip()
dirty = [l for l in dirty.splitlines() if not re.search(r"dev/build/all\.js|__pycache__|\.assets-cache|\.cdn-state|CHANGE\.txt", l)]
src = (head or "local") + ("+" if dirty else "")
def utc(x):
    import datetime
    try:
        return datetime.datetime.fromisoformat(x.strip()).astimezone(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%MZ")
    except Exception:
        return x.strip()
t = utc(git("log", "-1", "--format=%cI", "HEAD"))
live_ok = bool(git("rev-parse", "--verify", "-q", LIVE).strip())

chg = os.environ.get("CTM_CHANGE", "").strip()
if not chg:
    p = os.path.join(R, "dev/site/CHANGE.txt")
    mine = open(p, encoding="utf-8").read().strip().splitlines()[:1] if os.path.exists(p) else []
    live_line = (git("show", LIVE + ":dev/site/CHANGE.txt").strip().splitlines() or [""])[0] if live_ok else ""
    if mine and mine[0].strip() and mine[0].strip() != live_line.strip():
        chg = mine[0].strip()
if not chg and live_ok:
    chg = git("log", "--no-merges", "-1", "--format=%s", LIVE + "..HEAD").strip()
if not chg:
    chg = git("log", "-1", "--format=%s", "HEAD").strip()
chg = one(chg)

hist = []
if live_ok:
    m = re.search(r"^window\.CTM_BI=(\{.*\});\s*$", git("show", LIVE + ":index.html"), re.M)
    if m:
        try:
            lb = json.loads(m.group(1))
            hist = [{k: lb.get(k) for k in ("s", "t", "c")}] + list(lb.get("h") or [])
        except Exception:
            hist = []
    else:  # first build with a build line: the live build itself is the only known entry (its newest real change)
        s0 = git("rev-parse", "--short=8", LIVE).strip()
        c0 = git("log", "--no-merges", "-1", "--format=%s", LIVE).strip()
        hist = [{"s": s0, "t": utc(git("log", "-1", "--format=%cI", LIVE)), "c": one(c0)}]
seen, h2 = {src.rstrip("+")}, []
for e in hist:
    k = (e.get("s") or "").rstrip("+")
    if not k or k in seen:
        continue
    seen.add(k)
    h2.append({"s": e.get("s"), "t": e.get("t"), "c": one(e.get("c"))})
BI = {"s": src, "t": t, "c": chg, "b": B, "h": h2[:10]}

ix = os.path.join(R, "index.html")
html = open(ix, encoding="utf-8").read()
js = json.dumps(BI, ensure_ascii=False, separators=(",", ":")).replace("<", "\\u003c")
new, n = re.subn(r"^window\.CTM_BI=.*$", lambda _: "window.CTM_BI=" + js + ";", html, count=1, flags=re.M)
if n != 1:
    sys.exit("buildinfo: no window.CTM_BI line in index.html")
open(ix, "w", encoding="utf-8").write(new)
print(f"build line {src} · {t} · {chg} · history {len(BI['h'])}")
