#!/usr/bin/env python3
"""split-merge-fix family scan (law 11): every look-alike split the split-merge audit (A1-A6, B1-B3, P2, P3, P6, P7) found, counted on two shas.
usage: python3 dev/test/split-merge-scan.py [base_sha] [head_sha]   (defaults: ae2e0a07 HEAD) — reads files with `git show`, no build needed."""
import re, subprocess, sys
BASE = sys.argv[1] if len(sys.argv) > 1 else "ae2e0a07"
HEAD = sys.argv[2] if len(sys.argv) > 2 else "HEAD"
def src(sha, f):
    try: return subprocess.run(["git", "show", f"{sha}:dev/build/{f}"], capture_output=True, text=True, check=True).stdout
    except subprocess.CalledProcessError: return ""
def seg(s, a, b):
    i = s.find(a); j = s.find(b, i + 1) if i >= 0 else -1
    return s[i:j] if i >= 0 and j > i else ""
def door(s, k):
    m = re.search(r'\{k:"%s",.*?acts:\{a:\[([^\]]*)\]' % k, s, re.S)
    return len(re.findall(r'"\w+"', m.group(1))) if m else 0
def panel_rows(s):
    b = seg(s, "function evidenceActs(", "\nfunction evidenceOf(")
    return len(re.findall(r'(?:^|\s|\))add\("', b)) + b.count('R0.push({k:"judge"')
CHECKS = [
 ("A1 j95 bribe card «Lời nhờ cậy» (buy the witness)", lambda g: g("j95.js").count('t:"Lời nhờ cậy"')),
 ("A2 j95 silent roads on the catch card", lambda g: len(re.findall(r'n:"(Lặng im, đổi lấy ân tình|Giả như không thấy)"', g("j95.js")))),
 ("A2 j95 z.wit witness tag writes", lambda g: len(re.findall(r'z\.wit\[', g("j95.js")))),
 ("B3 j95 catch card accuse buttons (one per listener)", lambda g: len(re.findall(r'O\.push\(\{n:"(Tố giác[^"]*|Xử tội theo luật cung)"', g("j95.js")))),
 ("B3 j95 accuse button gated on chReady", lambda g: int("chReady(S,v,c)" in seg(g("j95.js"), "function j95catchOpts", "\nfunction j95accuse"))),
 ("j95 catch card options total", lambda g: len(re.findall(r'O\.push\(\{n:"', seg(g("j95.js"), "function j95catchOpts", "\nfunction j95accuse")))),
 ("P2 write-only z.owe ledger writes", lambda g: len(re.findall(r'\.owe\[', g("j95.js")))),
 ("A3 jroute monthly blackmail repeat (paid / since / k counter)", lambda g: len(re.findall(r'T\.bm\.since<|T\.bm\.paid|T\.bm\.k\b|B\.k\+\+|B\.paid=', g("jroute.js")))),
 ("A4 j42 «Đút bạc bịt miệng» on the maid blackmail card", lambda g: g("j42.js").count('n:"Đút bạc bịt miệng"')),
 ("A6 j4 «Đút bạc bịt miệng» half road", lambda g: g("j4.js").count('n:"Đút bạc bịt miệng"')),
 ("B1 evidence panel act code paths (evidenceActs; HEAD shows ONE accusation by listener + 2 trades)", lambda g: panel_rows(g("j78.js"))),
 ("B1 «Dùng chứng cứ» card group keys", lambda g: len(re.findall(r'"\w+"', (re.search(r'const J78EVK=\[([^\]]*)\]', g("j78.js")) or [None, ""])[1]))),
 ("B1 door P11 «Tố cáo» members", lambda g: door(g("jdoor.js"), "P11")),
 ("B2 door P12 «Mặc cả chứng cứ» members", lambda g: door(g("jdoor.js"), "P12")),
 ("B1 NPC menus offering tocao / expose / trinhth / trinhhh", lambda g: len(re.findall(r'push\([^)]*"(tocao|expose|trinhth|trinhhh)"', g("j30.js") + g("j78.js"))) + len(re.findall(r'\["(trinhth|trinhhh)",\d\]', g("j78.js"))) + len(re.findall(r'"(tocao|expose)"', (re.search(r'const PUSHK=\[[^\]]*\]', g("j43.js")) or [""])[0])) + len(re.findall(r'"(tocao|expose)"', (re.search(r'const L=\["lygian"[^\]]*\]', g("j30.js")) or [""])[0]))),
 ("B2 NPC «Trả chứng cứ lấy lòng» road (jagharm)", lambda g: g("jagharm.js").count('k:"harm:tieuhuy"')),
 ("P6 jtsb «Báo lên …» buttons on one card", lambda g: len(re.findall(r'O\.push\(\{n:`Báo lên', g("jtsb.js")))),
 ("P3 jdoor typed crime tiers (P7–P10 «a:<act>»:tier pairs)", lambda g: len(re.findall(r'"a:\w+":"(nhẹ|vừa|nặng)"', "".join(seg(g("jdoor.js"), '{k:"P%d"' % i, '{k:"P%d"' % (i + 1)) for i in (7, 8, 9, 10))))),
 ("P3 arson (phonghoa) charge = Mưu hại (mh)", lambda g: int('phonghoa:"mh"' in g("jbal2.js"))),
 ("P7 reads of BAL.wit (Tâm cơ marks under a «witness» name)", lambda g: sum(len(re.findall(r'BAL\.wit\.', g(f))) for f in ["j40.js", "j43.js", "j51.js", "j70.js", "jbal.js"])),
]
print(f"| check | {BASE} | {HEAD} |\n|---|---|---|")
for n, f in CHECKS:
    print(f"| {n} | {f(lambda x: src(BASE, x))} | {f(lambda x: src(HEAD, x))} |")
