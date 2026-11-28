#!/usr/bin/env node
/* noise-day.js — PLAYER-NOISE BUDGET table + gate (owner OD 26/11 ~06:50Z (A): «one robot-measured «noise per day» table for EVERY channel that
   interrupts her … with BAL budgets + a QC gate that FAILS a build over budget — so floods can't come back»).
   Lives = REAL-TAP robot lives (dev/test/robot-rt.js, review/robot-realtap) with the read-only sampler (noise-preload.js / noise-sampler.js).
   usage:
     node dev/measure/noise-day.js run <url> <out> [lives=fold:sens:11,ipad:sens:21] [slice=<buổi>] [mins=<wall-clock cap per lane>] [mindays=<full days needed>] [harness=<dir with dev/test/robot-rt.js>]
         plays the lives in parallel (one robot = one life, real taps), then prints the table (same as «table»)
     node dev/measure/noise-day.js table <out> [--md out.md] [--build dev/build]
         reads <out>/noise-*.jsonl → per life per game day (wk(), tuần) the count of every channel; budget = BAL.noise (+ FOREMAN D's BAL.evc for
         big / visit) read from the build that was played (the sampler sends it), else from --build.
   A day counts when the life played it to its end (the last, unfinished day of a slice is left out). Exit 1 = a channel over budget on a day
   (FAIL), 0 = PASS. Last line = one-line summary. */
'use strict';
const fs = require('fs'), path = require('path'), { spawn, execSync } = require('child_process');
const [, , MODE, ...ARGS] = process.argv;
const KV = Object.fromEntries(ARGS.filter(a => /^[a-z]+=/.test(a)).map(a => [a.slice(0, a.indexOf('=')), a.slice(a.indexOf('=') + 1)]));
const POS = ARGS.filter(a => !/^[a-z]+=/.test(a) && !a.startsWith('--')); const opt = k => { const i = ARGS.indexOf(k); return i >= 0 ? ARGS[i + 1] : null };
const KIT = path.resolve(__dirname, '..', '..');
/* channels: key, label, budget getter (bud = {noise, evc} of the played build) */
const CH = [
  ['tinbao', 'Tin báo rows / day', b => b.noise && b.noise.tinbao],
  ['chip', 'toast chips / day', b => b.noise && b.noise.chip],
  ['dlg', 'dialogs / cards that came to her / day', b => b.noise && b.noise.dlg],
  ['dlgB', 'dialogs / cards in one buổi (worst)', b => b.noise && b.noise.dlgB],
  ['big', 'BIG event cards / day (D2 BAL.evc.cap)', b => b.evc && b.evc.cap],
  ['visit', 'people coming to find her / day (D2 BAL.evc.q.visit)', b => b.evc && b.evc.q && b.evc.q.visit],
  ['seal', 'emotion-seal cards / day', b => b.noise && b.noise.seal],
  ['resRowsMax', 'rows on one result card (worst)', b => b.noise && b.noise.resRows],
  ['result', 'result cards / day (her own acts: measured, no budget)', () => null],
  ['tinag', 'world news items / day (feeds Tin báo: measured)', () => null],
  ['story', 'story pages she pages through (measured)', () => null],
  ['own', 'cards she opened herself by a tap on the page (measured)', () => null]];
function balOf(build) { const o = { noise: null, evc: null }; try { const s = fs.readFileSync(path.join(build, 'jbal2.js'), 'utf8'); const m = s.match(/BAL\.noise=(\{[\s\S]*?\});\s*\/\*NOISE-END\*\//); if (m) o.noise = Function('return ' + m[1])() } catch (e) {}
  try { const s = fs.readFileSync(path.join(build, 'jbalsp.js'), 'utf8'); const m = s.match(/BAL\.evc=(\{[^;]*\});/); if (m) { o.evc = Function('return ' + m[1])(); const p = s.match(/BAL\.stpPre=(\{[^;]*\});/), k = s.match(/BAL\.stpPick="(\w+)"/); if (p && k) { const P = Function('return ' + p[1])()[k[1]]; if (P && P.cap != null) o.evc.cap = P.cap } } } catch (e) {}
  return o }
function table(out, build) {
  const F = fs.readdirSync(out).filter(f => /^noise-.*\.jsonl$/.test(f)); const L = {}; let bud = null;
  for (const f of F) for (const l of fs.readFileSync(path.join(out, f), 'utf8').split('\n')) { if (!l) continue; let j; try { j = JSON.parse(l) } catch (e) { continue } const r = j.row; if (!r || r.day == null) continue;
    if (r.bud && r.bud.noise) bud = r.bud; const life = (L[j.life] = L[j.life] || { dev: j.dev, sids: {}, last: null }); const k = r.sid || 'x';
    (life.sids[k] = life.sids[k] || {})[r.day] = r; if (!life.last || r.at >= life.last.at) life.last = r }
  if (!bud) bud = balOf(build); if (!bud.evc) { const b2 = balOf(build); if (b2.evc) bud.evc = b2.evc }
  /* per life per day: the sum over page loads (a reload starts a new sampler; its baseline never recounts old rows) */
  const days = []; for (const [life, o] of Object.entries(L)) { const D = {}; for (const sd of Object.values(o.sids)) for (const [d, r] of Object.entries(sd)) { const x = D[d] = D[d] || { life, dev: o.dev, day: +d, ex: {}, kinds: {}, buoi: {} };
        for (const [c] of CH) if (c !== 'dlgB' && c !== 'resRowsMax') x[c] = (x[c] || 0) + (r[c] || 0); x.resRowsMax = Math.max(x.resRowsMax || 0, r.resRowsMax || 0);
        for (const [b, n] of Object.entries(r.buoiDlg || {})) x.buoi[b] = (x.buoi[b] || 0) + n; for (const [k, n] of Object.entries(r.kinds || {})) x.kinds[k] = (x.kinds[k] || 0) + n;
        for (const [c, a] of Object.entries(r.ex || {})) x.ex[c] = (x.ex[c] || []).concat(a).slice(0, 8) }
    const lastDay = o.last ? o.last.day : null; for (const x of Object.values(D)) { x.dlgB = Math.max(0, ...Object.values(x.buoi)); x.done = x.day !== lastDay; days.push(x) } }
  const full = days.filter(d => d.done); const q = (a, p) => { if (!a.length) return 0; const s = a.slice().sort((x, y) => x - y); return s[Math.min(s.length - 1, Math.floor(p * (s.length - 1) + .5))] };
  const rows = [], fails = [];
  for (const [c, lab, g] of CH) { const v = full.map(d => d[c] || 0); const B = g(bud); const over = B == null ? [] : full.filter(d => (d[c] || 0) > B);
    rows.push({ c, lab, n: v.length, mean: v.length ? v.reduce((a, b) => a + b, 0) / v.length : 0, p90: q(v, .9), max: v.length ? Math.max(...v) : 0, B, over: over.length, worst: over.sort((a, b) => (b[c] || 0) - (a[c] || 0))[0] || null });
    if (B != null && over.length) fails.push(c + ' ' + Math.max(...v) + '>' + B + ' on ' + over.length + ' day(s)') }
  const noEvc = !bud.evc;
  const md = []; md.push(`Lives ${Object.keys(L).length} (${Object.entries(L).map(([k, o]) => k + ':' + o.dev).join(', ')}) · full game days ${full.length} (unfinished last days left out ${days.length - full.length})`);
  md.push(''); md.push('| channel | days | mean / day | p90 | worst | budget (BAL) | days over |'); md.push('|---|---|---|---|---|---|---|');
  for (const r of rows) md.push(`| ${r.lab} | ${r.n} | ${r.mean.toFixed(1)} | ${r.p90} | ${r.max} | ${r.B == null ? (/D2/.test(r.lab) && noEvc ? 'no D2 cap in this build' : '—') : r.B} | ${r.B == null ? '—' : r.over} |`);
  md.push(''); md.push('Worst day per channel over budget (examples the sampler saw):');
  for (const r of rows) if (r.worst) md.push(`- ${r.c}: ${r.worst.life} day ${r.worst.day} = ${r.worst[r.c]} · ${(r.worst.ex[r.c === 'dlgB' ? 'dlg' : r.c === 'resRowsMax' ? 'result' : r.c] || []).slice(0, 4).map(s => '«' + s + '»').join(' ')}`);
  if (noEvc) { const v = full.map(d => d.big || 0); md.push(''); md.push(`NOTE: this build has no BAL.evc (FOREMAN D's D2 daily big-event cap, review/stat-pace): big cards ${v.length ? Math.max(...v) : 0} worst / day, visit ${full.length ? Math.max(...full.map(d => d.visit || 0)) : 0} worst / day are measured, not gated (no second set of caps).`) }
  return { md: md.join('\n'), fails, rows, full: full.length, bud } }
async function run(url, out) {
  fs.mkdirSync(out, { recursive: true });
  let H = KV.harness || process.env.RT_HARNESS || (fs.existsSync(path.join(KIT, 'dev/test/robot-rt.js')) ? KIT : null);
  if (!H) { /* the shared real-tap harness from its own branch (review/robot-realtap) when this kit has no copy yet */
    const ref = process.env.RT_HARNESS_REF || 'origin/review/robot-realtap'; H = path.join(out, 'harness');
    try { fs.mkdirSync(path.join(H, 'dev/test'), { recursive: true }); fs.mkdirSync(path.join(H, 'dev/measure'), { recursive: true });
      for (const f of ['robot-rt.js', 'realtap.js', 'rt-offer.js', 'robot-lint.js']) fs.writeFileSync(path.join(H, 'dev/test', f), execSync(`git -C "${KIT}" show ${ref}:dev/test/${f}`, { maxBuffer: 64e6 })) }
    catch (e) { console.log('NOISE-DAY FAIL · no real-tap harness (dev/test/robot-rt.js here, RT_HARNESS, or git ref ' + ref + ')'); process.exit(1) } }
  const lives = (KV.lives || 'fold:sens:11,ipad:sens:21').split(',').map(s => s.split(':')); const slice = KV.slice || '40', MINS = +(KV.mins || 0) || Math.ceil(+slice * 0.5) + 3; /* wall-clock cap per life (a stuck robot never blocks the gate; ~0.35 min / buổi measured) */
  /* one LANE per device: a life that ends early (a real ending at buổi 1, e.g. «Ban hoa») is followed by the next seed (seed + 100·k) until the lane
     has played <slice> buổi or its wall-clock cap is spent — so the gate always measures days, not one lucky / unlucky life */
  const T0 = Date.now();
  await Promise.all(lives.map(([dev, bot, seed]) => (async () => { let done = 0;
    for (let k = 0; k < 8 && done < +slice; k++) { const left = MINS * 60e3 - (Date.now() - T0); if (left < 60e3) break; const sd = +seed + 100 * k, life = `nz-${dev}-${bot}-${sd}`;
      const env = Object.assign({}, process.env, { RT_NOISE: path.join(out, `noise-${life}.jsonl`), RT_NOISE_DEV: dev });
      const code = await new Promise(res => { const c = spawn(process.execPath, ['-r', path.join(__dirname, 'noise-preload.js'), path.join(H, 'dev/test/robot-rt.js'), url, out, 'dev=' + dev, 'bot=' + bot, 'seed=' + sd, 'life=' + life, 'slice=' + (+slice - done), 'lint=0', 'force=1'], { env, stdio: ['ignore', 'pipe', 'pipe'] });
        const lg = fs.createWriteStream(path.join(out, life + '.log')); c.stdout.pipe(lg); c.stderr.pipe(lg);
        const kill = setTimeout(() => { lg.write('NOISE-DAY: time limit ' + MINS + ' min — life stopped, its full days count\n'); try { c.kill('SIGTERM') } catch (e) {} setTimeout(() => { try { c.kill('SIGKILL') } catch (e) {} }, 15e3) }, left);
        c.on('exit', code => { clearTimeout(kill); lg.end(); res(code) }) });
      let b = 0; try { const m = fs.readFileSync(path.join(out, life + '.log'), 'utf8').match(/LIFE DONE .*? · buổi (\d+)/); b = m ? +m[1] : +slice } catch (e) { b = +slice } done += Math.max(1, b); if (code == null) break } })()));
}
(async () => {
  if (MODE === 'run') { const [url, out] = POS; if (!url || !out) { console.error('usage: noise-day.js run <url> <out> [lives=..] [slice=..]'); process.exit(2) } await run(url, out); POS.splice(0, 1) }
  const out = POS[0]; if (!out) { console.error('usage: noise-day.js table <out>'); process.exit(2) }
  const T = table(path.resolve(out), path.resolve(opt('--build') || path.join(KIT, 'dev/build'))); console.log(T.md); if (opt('--md')) fs.writeFileSync(opt('--md'), T.md + '\n');
  const MIND = +(KV.mindays || 1); if (T.full < MIND) { console.log(`NOISE-DAY FAIL · only ${T.full} full game day(s) measured (need ${MIND}): the robot lives ended or stuck early`); process.exit(1) }
  console.log(T.fails.length ? 'NOISE-DAY FAIL · over budget: ' + T.fails.join(' · ') : `NOISE-DAY PASS · ${T.full} game days, every channel inside BAL.noise${T.bud.evc ? ' + BAL.evc' : ' (big / visit: no D2 cap in this build, measured only)'}`);
  process.exit(T.fails.length ? 1 : 0) })();
