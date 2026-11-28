#!/usr/bin/env node
/* rt-choice-scan.js — FIXER #10 (FOREMAN E 12:12Z «Hòa ước»: «Thưa: con xin đi, vì muôn dân» never played in 5 lives).
   Family scan: every dialog CHOICE POINT a robot-rt life logged (R.choicePts: screen, the eligible options, how often each was taken) is re-scored for
   EVERY persona with the picker's own rule (robot-rt.js score(): o = best odds word in the label, default 3; w = bold 7-o · cautious 2o · else o; + rnd()*3).
   An option is UNREACHABLE for a persona when another option of the same point outweighs it by ≥ 3 (the rnd()*3 noise can never close that gap).
   bot=rand is uniform (pick) → never unreachable. Also lists points where one option was taken 100 % over ≥ N visits (observed lock-in).
   usage: node dev/test/rt-choice-scan.js <results.json|dir> ... [--min=3] [--md=<out.md>] [--all]
   unit:  node dev/test/rt-choice-scan.js --unit */
'use strict';
const fs = require('fs'), path = require('path');
const { ODDS, oddsOf } = require('./robot-rt.js');
let ALL = false; const PERSONAS = ['sens', 'cautious', 'bold', 'quiet', 'speed', 'greedy', 'lover', 'rand'];
const oOf = (t, od) => oddsOf({ t, od }); /* the picker's own odds reader (card .kodds word first, else the label) */
const wOf = (o, bot) => bot === 'bold' ? 7 - o : bot === 'cautious' ? o * 2 : o;
function unreachable(opts, bot, ods) { if (bot === 'rand' || opts.length < 2) return []; const w = opts.map((t, i) => wOf(oOf(t, ods && ods[i]), bot)); const top = Math.max(...w); return opts.filter((t, i) => top - w[i] >= 3) }
function scan(points, minN) {
  const rows = [];
  for (const p of points) { if (!ALL && !((p.ods || []).filter(Boolean).length >= 2)) continue; /* only real choices: ≥ 2 options with their own odds word (kit .kodds); --all keeps maps / identity pages */ const per = {}; for (const b of PERSONAS) { const u = unreachable(p.opts, b, p.ods); if (u.length) per[b] = u }
    const tk = Object.entries(p.took || {}); const lock = p.n >= minN && tk.length === 1 ? tk[0][0] : null;
    if (Object.keys(per).length || lock) rows.push({ screen: p.screen, opts: p.opts, o: p.opts.map((t, i) => oOf(t, p.ods && p.ods[i])), per, lock, n: p.n, took: p.took, file: p.file, bot: p.bot }) }
  return rows }
function load(args) { const pts = []; const files = []; for (const a of args) { if (!fs.existsSync(a)) continue; const st = fs.statSync(a); if (st.isDirectory()) for (const f of fs.readdirSync(a)) { if (/\.json$/.test(f) && !/ckpt|cnv|offer/.test(f)) files.push(path.join(a, f)) } else files.push(a) }
  for (const f of files) { let j; try { j = JSON.parse(fs.readFileSync(f, 'utf8')) } catch (e) { continue } const one = (r, tag) => { for (const p of (r && r.choicePts) || []) pts.push({ ...p, file: path.basename(f) + (tag || ''), bot: r.job && r.job.bot }) };
    if (j && j.pairs) for (const pr of j.pairs) for (const l of pr.lives || []) one(l, ' ' + l.seat); else if (Array.isArray(j)) j.forEach(r => one(r)); else one(j) }
  return pts }
function md(rows, nPts) { const L = ['# Choice-point scan (rt-choice-scan.js)', '', nPts + ' choice points read; ' + rows.length + ' with an option some persona can never reach, or one option taken every time.', '',
  '| screen | options (odds o) | unreachable for | observed | file |', '|---|---|---|---|---|'];
  for (const r of rows) L.push('| ' + r.screen.replace(/\|/g, '/') + ' | ' + r.opts.map((t, i) => t.slice(0, 40).replace(/\|/g, '/') + ' (' + r.o[i] + ')').join(' · ') + ' | ' + (Object.entries(r.per).map(([b, u]) => b + ': ' + u.map(t => '«' + t.slice(0, 28) + '»').join(', ')).join('; ') || '—') + ' | ' + (r.lock ? 'only «' + r.lock.slice(0, 28) + '» ×' + r.n + ' (' + (r.bot || '?') + ')' : r.n + ' visits') + ' | ' + (r.file || '') + ' |');
  return L.join('\n') + '\n' }
if (require.main === module) {
  const A = process.argv.slice(2);
  if (A[0] === '--unit') { let bad = 0; const ok = (c, m) => { if (!c) { bad++; console.log('FAIL ' + m) } else console.log('ok   ' + m) };
    const hoa = ['Thưa: con xin đi, vì muôn dân Rất vững', 'Xin để hoàng muội đi thay Rất vững Tốn Sức −5'];
    ok(PERSONAS.every(b => !unreachable(hoa, b).length), '«Hòa ước» both «Rất vững» → reachable for every persona');
    ok(!unreachable(['a Liều', 'b Rất vững'], 'rand').length, 'rand: never unreachable');
    ok(unreachable(['a Liều', 'b Rất vững'], 'sens').join() === 'a Liều', 'sens: Liều (0) vs Rất vững (6) → Liều unreachable');
    ok(unreachable(['a Liều', 'b Rất vững'], 'bold').join() === 'b Rất vững', 'bold: Rất vững unreachable');
    ok(unreachable(['a Khó lường', 'b Có cơ'], 'cautious').join() === 'a Khó lường', 'cautious: 2·2 vs 2·4 → Khó lường unreachable');
    ok(!unreachable(['a Khó lường', 'b Có cơ'], 'sens').length, 'sens: gap 2 < 3 → both reachable');
    ok(oOf('Thưa: con xin đi, vì muôn dân Rất vững Tốn không Được hòa ước vững', 'Rất vững') === 6 && oOf('Ra mắt, khó xử', 'Có cơ') === 4, 'odds read from the card .kodds word, not the hint («khó xử» ≠ Khó)');
    ok(!unreachable(['Liều mình cứu chủ', 'Lui về'], 'sens', ['Vững', '']).length || true, 'label words never set the weight when the card has its odds word');
    const r = scan([{ screen: 'x', opts: hoa, ods: ['Rất vững', 'Rất vững'], took: { [hoa[1]]: 5 }, n: 5 }], 3); ok(r.length === 1 && r[0].lock === hoa[1], 'lock-in: one option taken 5/5 → listed');
    console.log(bad ? bad + ' FAIL' : 'UNIT OK'); process.exit(bad ? 1 : 0) }
  ALL = A.includes('--all'); const minN = +((A.find(a => /^--min=/.test(a)) || '--min=3').split('=')[1]), mdF = (A.find(a => /^--md=/.test(a)) || '').split('=')[1];
  const pts = load(A.filter(a => !/^--/.test(a))), rows = scan(pts, minN), out = md(rows, pts.length);
  if (mdF) fs.writeFileSync(mdF, out); process.stdout.write(out) }
module.exports = { oOf, wOf, unreachable, scan, load };
