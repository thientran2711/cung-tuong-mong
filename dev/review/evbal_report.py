# Writes dev/review/event-balance.md from one or more dev/measure/evbot.js outputs (JSON).
# usage: python3 dev/review/evbal_report.py <label>=<out.json> [<label>=<out.json> ...]
import json, sys, os, re
DEATH = re.compile(r"chết|băng|tự vẫn|qua đời|tạ thế|bị giết|ban rượu|treo cổ|xử tử|độc|lìa đời|mất (?:sớm|khi)|đánh chết", re.I)
NAMES = {'hint': 'đọc gợi ý (hint)', 'rand': 'chọn bừa (rand)', 'same': 'luôn ô đầu (same)'}
def stats(L):
    L = [r for r in L if not r.get('err') and r.get('title') not in ('TIMEOUT', 'CRASH')]
    n = len(L) or 1
    pct = lambda f: round(100 * sum(1 for r in L if f(r)) / n, 1)
    return dict(lives=len(L), avgMax=round(sum(r['max'] for r in L) / n, 2), phi=pct(lambda r: r['max'] >= 5), hh=pct(lambda r: r['max'] >= 7),
                death=pct(lambda r: DEATH.search((r.get('fate') or '') + ' ' + (r.get('title') or ''))), early=pct(lambda r: r['yrs'] < 3),
                demoted=pct(lambda r: r['rank'] < r['max']), pun=round(sum(r.get('pun', 0) for r in L) / n, 2), yrs=round(sum(r['yrs'] for r in L) / n, 2))
runs = []
for a in sys.argv[1:]:
    lab, f = a.split('=', 1); d = json.load(open(f)); runs.append((lab, d))
out = ['# Event-choice balance audit (owner 15/11 15:10Z) — 3 bots', '',
       'KIT §28.6 points here. Method: `dev/measure/evbot.js` — three players play every ACT the same sensible way (dev/measure/inpage4.js);',
       'they differ ONLY on EVENT choices (pushDil / pushFront / mkP items: j67 chapters, j68 events, j72 offers, j70 dilemmas, kit choice panels):',
       '- **hint**: reads only what the player sees — the "Gợi ý" line, the risk tag (an toàn / có rủi ro / liều) and the Tốn row (never the hidden numbers);',
       '- **rand**: any affordable option; **same**: always the first affordable option.',
       'Same seeds per mode (seeded Math.random + crypto), 300 game iterations per step. Lives that were still running at the end are not counted.',
       'Owner goal: no option right in every context; the hint reader clearly beats random; always-the-same loses.', '']
for lab, d in runs:
    per = {}
    for x in d.get('lives', []): per.setdefault(x['mode'], []).extend(x['res'])
    out += [f'## {lab}', '', f"steps per page: {d.get('steps')} · pages: {len(d.get('lives', []))} · page errors: {len(d.get('errs', []))}", '',
            '| bot | lives | avg max rank | reached Phi (5+) % | reached Hoàng hậu (7+) % | died % | life < 3 yrs % | ended below best rank % | punishments / life | years / life |',
            '|---|---|---|---|---|---|---|---|---|---|']
    for m in ('hint', 'rand', 'same'):
        if m not in per: continue
        s = stats(per[m])
        out.append(f"| {NAMES[m]} | {s['lives']} | {s['avgMax']} | {s['phi']} | {s['hh']} | {s['death']} | {s['early']} | {s['demoted']} | {s['pun']} | {s['yrs']} |")
    out.append('')
    for m in ('hint', 'rand', 'same'):
        if m not in per: continue
        fates = {}
        for r in per[m]:
            k = (r.get('fate') or r.get('title') or '')[:48]; fates[k] = fates.get(k, 0) + 1
        top = sorted(fates.items(), key=lambda x: -x[1])[:6]
        out.append(f"- {NAMES[m]} endings: " + '; '.join(f'{k} ×{v}' for k, v in top))
    out.append('')
os.makedirs(os.path.dirname(os.path.abspath(__file__)), exist_ok=True)
open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'event-balance.md'), 'w').write('\n'.join(out) + '\n')
print('\n'.join(out[-14:]))
