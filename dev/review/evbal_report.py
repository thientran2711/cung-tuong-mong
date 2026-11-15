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
       'Owner goal: no option right in every context; the hint reader clearly beats random; always-the-same loses.', '',
       '## What this branch changed for that goal', '',
       '- Context, not a fixed answer (jevb §1): rolled event options take the odds of THIS moment — the person\'s hidden taste for that answer (drawn once per life), their mood, how much they like her, the Emperor\'s mood on his scenes; sure options scale the relation change by the same taste. The best answer moves between lives and days (dev/test/event-context.js: the same answer to the same consort ranges −12…+12 across 12 lives).',
       '- Hints that tell options apart (jevb §5, data only): at the vague level many dialogs gave several options the same words. Now colliding options get the lowest clearer wording that differs, then their own chance in words, their gain size, their odds number (`od`). dev/review/hint-dedup.md: over the game\'s own dialogs, dialogs with duplicate hints 88 → 36, duplicate options 189 → 78; every one left is a true tie (same odds, same outcome).',
       '- Bots run on current main (inpage4: j82 mini-games, refused places, no-op cards, long lives).', '',
       '## Limits of this measurement', '',
       '- One life takes 8–16 game years ≈ 10 minutes of one page; the shared machine (4 CPU, 16 GB, other workers\' art jobs) kills pages when 4+ run at once. So the final table has 3–6 lives per bot: it shows the direction, it does not prove it.',
       '- A firm verdict needs ≥30 lives per bot: `EVPAR=3 node dev/measure/evbot.js <page> 45 hint,rand,same 1 12` (≈ 3–4 h on a quiet machine), then `python3 dev/review/evbal_report.py run=<out.json>`.',
       '- Acts are played the same sensible way by all three bots, so differences come only from event choices; acts still decide most of a life (thousands of acts vs ~300–500 event choices a life).', '']
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
pool = {}
for lab, d in runs:
    for x in d.get('lives', []): pool.setdefault(x['mode'], []).extend(x['res'])
out += ['## All runs pooled (different builds — indicative only)', '', '| bot | lives | avg max rank | reached Phi (5+) % | reached Hoàng hậu (7+) % | died % | life < 3 yrs % | ended below best rank % | years / life |', '|---|---|---|---|---|---|---|---|---|']
for m in ('hint', 'rand', 'same'):
    if m in pool:
        s = stats(pool[m]); out.append(f"| {NAMES[m]} | {s['lives']} | {s['avgMax']} | {s['phi']} | {s['hh']} | {s['death']} | {s['early']} | {s['demoted']} | {s['yrs']} |")
out.append('')
first = {}
for x in (runs[0][1].get('lives', []) if runs else []): first.setdefault(x['mode'], []).extend(x['res'])
if all(m in first for m in ('hint','rand','same')):
    H,R_,Sm = stats(first['hint']), stats(first['rand']), stats(first['same'])
    ok1 = H['avgMax'] > R_['avgMax'] and H['death'] <= R_['death']
    ok2 = Sm['avgMax'] <= min(H['avgMax'], R_['avgMax']) or Sm['death'] >= max(H['death'], R_['death'])
    n = min(H['lives'], R_['lives'], Sm['lives'])
    out += [f'## Verdict (first run: {runs[0][0]})', '',
            f"- hint vs rand: avg max rank {H['avgMax']} vs {R_['avgMax']}, died {H['death']}% vs {R_['death']}%, Hoàng hậu {H['hh']}% vs {R_['hh']}% → {'hint ahead' if ok1 else 'NOT clearly ahead'}.",
            f"- always-the-same: avg max rank {Sm['avgMax']}, died {Sm['death']}% → {'loses' if ok2 else 'does NOT lose'}.",
            f"- sample: {n} lives in the smallest group — {'too small for a firm verdict (≥30 lives per bot wanted)' if n < 30 else 'enough for a first verdict'}.", '']
os.makedirs(os.path.dirname(os.path.abspath(__file__)), exist_ok=True)
open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'event-balance.md'), 'w').write('\n'.join(out) + '\n')
print('\n'.join(out[-14:]))
