# PROGRESS — review/act-audit (+ review/rules-one-source)

Task (owner 11/14, re-given 11/15 05:40Z): every button must do what its card says. Plus 05:55Z (odds from real factors,
"Vì sao <bậc>?"), 06:15–07:05Z (rules one source, Đức note), 07:30Z (no do-nothing buttons).

## State
- review/rules-one-source = f33f94b8c (from origin/main b165b1f71): BAL/hhNeed single source; tests rules-one-source.js + bot-same.js.
- review/act-audit = rules-one-source + jwhy.js (spy formula, "Vì sao" popover, servant penalty on card odds) + the audit tools
  dev/test/act-audit.js (runner) and dev/test/act-audit-sum.py (judge), report dev/test/ACT_AUDIT.md.

## How to run
1. `python3 dev/build/assemble.py` then wrap dev/index.html with `<!doctype html><meta charset=utf-8><meta name=viewport …>` as _aa.html at the repo root.
2. Static server at the repo root (python3 -m http.server 8831).
3. `node dev/test/act-audit.js http://127.0.0.1:8831/_aa.html out.jsonl 755x1000@2 dau,toi,cao,con,hau,hh`
4. `python3 dev/test/act-audit-sum.py out.jsonl --md table.md`
Note: `let S` makes `typeof S` "undefined" before a game starts: wait for `typeof deser==='function'` instead.
