#!/usr/bin/env python3
"""review/tainghe-open-fix (LAW 11 family scan): every showModal wrapper in the built index.html that can RETURN WITHOUT calling the
layer below (a "hold gate": the dialog stays hidden), plus the blockers the jnf/jflip night gate waits on.
A hold gate is fine only when what it waits for is ON SCREEN or ends inside the same synchronous call (try/finally);
a gate on a bare state flag with nothing on screen = the Tài nghệ buổi-3 bug (orphaned NLP).
usage: python3 dev/test/modal-hold-scan.py [index.html]"""
import re, sys
s = open(sys.argv[1] if len(sys.argv) > 1 else 'index.html', encoding='utf-8').read()
ms = list(re.finditer(r'(\w+)\s*=\s*showModal\s*;\s*showModal\s*=\s*function\s*\([^)]*\)\s*\{', s))
print(f'showModal wrappers: {len(ms)}')
gates = []
for m in ms:
    v = m.group(1); i = m.end(); d = 1; j = i
    while d and j < len(s):
        d += {'{': 1, '}': -1}.get(s[j], 0); j += 1
    body = s[i:j]
    k = body.find(v + '.apply')
    pre = body[:k] if k >= 0 else body
    # an early return that is not "return <base>.apply(...)" and not inside a nested arrow/function
    pre_flat = re.sub(r'function\s*\([^)]*\)\s*\{[^{}]*\}|=>\s*\{[^{}]*\}', '', pre)
    if re.search(r'\breturn\b(?!\s+' + v + r'\.apply)', pre_flat):
        gates.append(re.sub(r'\s+', ' ', pre)[:220])
KNOWN = [  # (pattern, verdict) — reviewed by hand, review/tainghe-open-fix
    (r'RB\.d>0', 'jrbatch renderHold: synchronous, try/finally flush -> bounded, OK'),
    (r'SP13\.nb', 'jspread: inside nextBuoi (try/finally) -> bounded, OK'),
    (r'scene just closed|scene\(\)', 'jnf night gate: holds while the flip scene is queued/on screen; inputs = jflip cfBusy() -> see blockers below'),
    (r'dfSeen', 'jdfv: the same card is already playing in the focus scene (on screen), OK'),
    (r'succ', 'j99succ: returns its own path for succession cards (base still called), OK'),
]
print(f'hold-gate candidates: {len(gates)}')
for g in gates:
    v = next((t for p, t in KNOWN if re.search(p, g)), 'decorator (calls the base after) — not a hold')
    print(f'  - {v}\n      {g[:160]}')
print('jflip busy() / j93 kmFree() blockers (what a queued flip scene waits on):')
bz = re.search(r'function busy\(\)\{.*?\n.*?\n.*?\}', s)
for name, pat, ok in [
    ('NLP (identity card)', r'NLP&&nlOpen\(\)', 'only while the card is queued or on screen (FIXED)'),
    ('#dawn morning panel', r'getElementById\("dawn"\);if\(d&&!d\.hidden&&\(d\.classList', 'visible overlay (hidden attr + .on)'),
    ('.kbk book', r'querySelectorAll\("\.kbk"\)\]\.some\(e=>e\.offsetParent', 'visibility-checked'),
    ('#title screen', r'getElementById\("title"\);return !!\(ti&&!ti\.hidden\)', 'visible screen'),
]:
    print(f'  {name:22s} {"present" if re.search(pat, s) else "MISSING"} — {ok}')
old = re.search(r'function busy\(\)\{if\(typeof NLP!=="undefined"&&NLP\)return true;', s)
# review/sangbuoi-held-fix (rv 2yv2CZAt): kmFree wrapper FLAGS are blockers too — a queued scene held on a flag whose card a showModal gate
# holds for THAT scene is a mutual wait (jdayq newsHold ⇄ jnf night gate, Robot M4 ~80 s). Each flag must wait on something ON SCREEN or
# carry a breaker.
print('kmFree wrapper flags (what a queued scene waits on):')
kf_bad = 0
for name, pat, safe, why in [
    ('base: #dawn / podium / roulette / #kmrew', r'function kmFree\(\)\{const d=document\.getElementById\("dawn"\)', None, 'visible overlays'),
    ('jdayq actKm: #ov / DF.play', r'if\(\(ov&&!dqHidden\(ov\)\)\|\|\(window\.DF&&DF\.play\)\)\{DQ\.stat\.actKm\+\+', None, 'activity on screen'),
    ('jdayq kmTap: one pump inside a tap', r'DQ\.kmTap=1;setTimeout\(\(\)=>\{DQ\.kmTap=0\},0\)', None, 'cleared next task (bounded)'),
    ('jdayq newsHold: news card in Q', r'if\(DQ\.newsHold\)\{if\(dqUi\(\)&&Q\.some\(dqIsNews\)\)', r'DQ\.stat\.newsLet\+\+;return true', 'breaker: paints the news card; a swallowed paint lets the scene through (newsLet)'),
    ('jnf night gate pass for the held news', r'window\.dqNewsPass\(\)', r'function dqNewsPass\(\)', 'the news card jdayq holds the unstarted flip for paints first (dqNewsPass)'),
]:
    pres = bool(re.search(pat, s)); ok = pres and (safe is None or re.search(safe, s))
    if not ok and safe is not None: kf_bad += 1
    print(f'  {name:42s} {"present" if pres else "MISSING"} — {why if ok else "NO BREAKER: mutual wait possible"}')
print('RESULT:', 'FAIL (busy() still waits on bare NLP)' if old else ('FAIL (a kmFree flag waits on a card a gate holds for that scene)' if kf_bad else 'PASS (no gate waits on a bare state flag with nothing on screen)'))
sys.exit(1 if old or kf_bad else 0)
