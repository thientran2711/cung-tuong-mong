#!/usr/bin/env node
/* robot-audit.js — owner rules 25/11 (OD ~05:10Z real taps · ~05:15Z one life = until death/real ending, no cap ·
   ~05:20Z/~05:40Z no bot-chosen exit road unless it is the ONLY option · ~05:45Z audit + rerun every invalid life).
   Reads robot result files and marks every life VALID or INVALID, with why.

   USAGE  node dev/measure/robot-audit.js [path ...] [--md out.md] [--json out.json] [--only <regex on file path>] [--quiet]
          default path = dev/handover/robot (walked recursively; saves/ folders skipped).
   INPUTS (auto-detected)
     · robot10 solo array  [ {job,life:{id,type,fate,...},harness?,exitPick?,...}, ... ]  (robot10.js, flight-*, nc/pf/thd/cnv/bd)
     · co-op               { run, pairs:[ {job,lives:[{seat,kiep,life,...}],partial?,harness?} ] }      (coop runner)
     · lives list          [ {seat,kiep,id|life,...} ]                                                (flight-A-coop-repro/guest-cold)
     · robot-rt LIFE DONE log lines (*.log) when no <life>.json is beside the log
     · robot-rt solo       { job, harness:{kind:'realtap'}, life, exitPick, bugs }  one life per file (flight2-*, robot-rt.js)
     · markdown life tables (only when no same-stem .json exists): header with a «life» column and an «ending|result|end» column.
   A LIFE IS VALID ONLY IF ALL THREE HOLD
     (1) REAL TAPS: the record carries harness {realtap:true, jsClicks:0} (written by dev/test/realtap.js harness,
         review/robot-realtap). Records without it were played by the old JS-click harness → INVALID (pre-25/11).
     (2) REAL END: death / grand ending / an ending the game imposed (age-out, Thái phi, lãnh cung, ban chết, ...).
         cap / TIMEOUT / stuck / soft-lock / crash / harness error / no ending → INVALID.
     (3) NO BOT EXIT: an exit road (Xuất gia, Dâng biểu xuất gia, Xuất cung về quê, phế làm thứ dân, Một đời an nhiên,
         Cao chạy xa bay, accepted marriage/leave roads) ends the life INVALID unless the record proves it was the ONLY
         option the game left: exitPick {label, n:<options on screen>, only:true} (owner ~05:40Z: then it IS a real ending).
   HARNESS CONTRACT for new runners: put on every life record
     harness:{kind:'realtap', sha:'<harness sha>', realtap:true, jsClicks:0, deadButtons:<n>, cap:null, stuck:<n>}
     exitPick:{label,n,only} whenever the life ended on an exit-road option (n = enabled options when it was tapped). */
'use strict';
const fs = require('fs'), path = require('path');

/* ---- ending classes (titles of over(...) in dev/build/j*.js; checked 25/11 on LIVE) ---- */
// voluntary exit roads = options the player taps (j14 Xuất gia; jroute hl_tu/hl_que/hl_phe/an nhiên/hl_hon;
// j42 «Xuất cung về quê» at age-out, «Tạ ơn, xuất giá», «Theo về vương phủ», «Xuất cung thành thân»; j96 giả chết)
const EXIT_IDS = ['Xuất gia', 'Dâng biểu xuất gia', 'Xuất cung về quê', 'Phế làm thứ dân', 'Một đời an nhiên',
  'Cao chạy xa bay', 'Xuất giá', 'Được ban hôn', 'Vào vương phủ', 'Thành thân'];
// game-imposed: j42:303 «Xuất cung tuổi N» (Nội vụ phủ age-out, no choice), Ma ma, Bị đuổi khỏi cung, Lãnh cung, Thái phi, ...
// exit-road option labels as the robot-rt harness blacklists them (EXIT_RE in dev/test/robot-rt.js)
const EXIT_TAP_RE = /xuất gia|xuất cung|về quê|thứ dân|bỏ cuộc|kiếp mới|luân hồi|an nhiên|giả chết|cao chạy|xuất giá|thành thân|vương phủ|ban hôn/i;
const NOEND_TYPES = { cap: 'wall cap (no ending)', stuck: 'stuck / timeout (abandoned)', softlock: 'soft-lock (abandoned)',
  crash: 'crash (abandoned)', harness: 'harness error (no life)', '?': 'no ending recorded' };
const NOEND_IDS = { CAP: 'cap', TIMEOUT: 'stuck', SOFTLOCK: 'softlock', CRASH: 'crash', HARNESS: 'harness' };

function endClass(life) {
  if (!life) return { k: 'none', why: 'no ending recorded' };
  const id = String(life.id || life.title || ''), type = String(life.type || ''), fate = String(life.fate || life.cause || '');
  const nt = NOEND_IDS[id.toUpperCase()] || (NOEND_TYPES[type] && type);
  if (nt) return { k: 'none', why: NOEND_TYPES[nt] || nt };
  if (/^CAP\d*$/i.test(id) || /\bcap ?\d+\b/i.test(id)) return { k: 'none', why: NOEND_TYPES.cap };
  if (id === 'Xuất cung') {
    if (/tuổi \d+/.test(fate) && !/về quê/.test(fate)) return { k: 'imposed', why: 'age-out (Nội vụ phủ, j42:303)' };
    return { k: 'exit', why: 'exit road «Xuất cung về quê» (option)' };
  }
  if (EXIT_IDS.includes(id) || type === 'leave' && !/Ma ma|đuổi/.test(id)) return { k: 'exit', why: 'exit road «' + id + '»' };
  if (type === 'death' || life.death) return { k: 'death', why: '' };
  if (type === 'grand' || /^Đại kết cục/.test(id)) return { k: 'grand', why: '' };
  if (id) return { k: 'imposed', why: '' };
  return { k: 'none', why: 'no ending recorded' };
}

/* MINI-GAME QUIT (F #10 25/11 ~10:49Z): harness ≤ 93812531 tapped the mini-game header ✕ «Quay lại» → «Bỏ cuộc?» → «Bỏ cuộc» (0/10) instead of playing.
   That is NOT a life-ending exit: the life keeps its verdict (death / game-imposed ending stays VALID); its mini-game results are flagged «mg quit, not played».
   n = «Bỏ cuộc?» «Bỏ cuộc» taps in the kept trace (last 400 taps only → a lower bound) + harness.mgGiveUp (harness ≥ the fix: given up after 6 min with no end), ≥ 1 when exitPick is «Bỏ cuộc». */
const MGQ_RE = /^bỏ cuộc$/i;
function mgQuitOf(rec, life) { const xp = rec.exitPick || (life && life.exitPick) || null, h = rec.harness || (life && life.harness) || {}; const tr = Array.isArray(rec.trace) ? rec.trace : [];
  let n = tr.filter(t => Array.isArray(t) && /«bỏ cuộc\?»\s*«bỏ cuộc»\s*$/i.test(String(t[1]))).length; if (!n && xp && MGQ_RE.test(String(xp.label || '').trim())) n = 1; return { n, giveUp: +h.mgGiveUp || 0, lowerBound: tr.length >= 400 } }
function verdict(rec, life) {
  const why = [], e = endClass(life), h = rec.harness || (life && life.harness) || null; let xp = rec.exitPick || (life && life.exitPick) || null; if (xp && MGQ_RE.test(String(xp.label || '').trim())) xp = null; /* a mini-game «Bỏ cuộc» is never the life's exit pick */
  const real = !!(h && h.realtap === true && +h.jsClicks === 0);
  if (!real) why.push(h ? 'harness not real-tap (realtap=' + h.realtap + ', jsClicks=' + h.jsClicks + ')' : 'JS-click harness (pre-25/11, no realtap proof)');
  if (e.k === 'none') why.push(e.why);
  if (e.k === 'exit') { if (xp && (xp.only === true || +xp.n === 1)) e.note = 'exit was the only option (real ending)'; else if (!xp && rec.lastTap) e.note = 'game-imposed: last bot tap was a non-exit option «' + rec.lastTap.slice(0, 40) + '»'; else why.push('bot-chosen ' + e.why + (xp ? ' with ' + xp.n + ' options' : ' (no proof it was the only option)')); }
  if (h && h.cap && e.k === 'none') why.push('harness had a cap (' + h.cap + ')');
  return { valid: why.length === 0, why, end: e };
}

/* ---- readers ---- */
const stemOf = f => path.basename(f).replace(/\.(json|md)$/, '');
function endText(life) { if (!life) return '—'; const id = life.id || life.title || '?'; const f = life.fate || life.cause || ''; return f && f !== id ? id + ' — ' + f : id }
function ageText(life) { return life && life.age != null ? 'age ' + life.age + (life.year != null ? ' y' + life.year : '') : '' }

function fromJson(file, j, out) {
  const round = path.relative(process.cwd(), file);
  const push = (lifeName, rec, life, extra) => { const v = verdict(rec, life), mq = mgQuitOf(rec, life); out.push({ mgQuit: mq.n + mq.giveUp, mgQuitLB: mq.lowerBound, file: round, life: lifeName, end: endText(life), age: ageText(life), valid: v.valid, why: v.why, cls: v.end.k, note: v.end.note || v.end.why || '', sig: [lifeName, endText(life), life && life.years, life && life.age, rec.t && rec.t.total, rec.job && rec.job.seed].join('|'), ...extra }) };
  if (Array.isArray(j) && j.length && j[0] && (j[0].job || j[0].life && j[0].bugs)) { for (const r of j) push((r.job && r.job.id) || '?', r, r.life || r.res); return true }
  if (j && Array.isArray(j.pairs)) {
    for (const p of j.pairs) { const ls = p.lives || []; if (!ls.length) out.push({ file: round, life: (p.job && p.job.id) || 'pair?', end: '—', age: '', valid: false, why: ['co-op pair with no finished life' + (p.partial ? ' (partial)' : '')], cls: 'none', note: '', sig: round + (p.job && p.job.id) });
      for (const l of ls) push(((p.job && p.job.id) || 'pair') + ' ' + (l.seat || '?') + ' k' + (l.kiep != null ? l.kiep : '?') + (l.tp ? ' ' + l.tp.origin + '/' + l.tp.road : ''), { harness: l.harness || p.harness || j.run && j.run.harness, exitPick: l.exitPick }, l.life, { seat: l.seat }) }
    return true
  }
  /* robot-rt.js solo (review/robot-realtap): ONE life per file { job:{id,...}, harness:{kind:'realtap',...}, life, exitPick, bugs, ... } */
  if (j && !Array.isArray(j) && j.job && j.harness && 'life' in j) { if (j.life && j.life.type === 'slice') return true /* self-test slice, not a life */; const tr = Array.isArray(j.trace) ? j.trace.filter(t => Array.isArray(t) && typeof t[1] === 'string' && !/^DEAD /.test(t[1])) : []; const last = tr.length ? tr[tr.length - 1][1] : null; const lab = last ? (last.match(/«([^»]*)»\s*$/) || [])[1] || last : null;
    /* the last real tap before over(): if it was NOT an exit-road option, the exit ending was imposed by the game (e.g. «Xin ở lại» failed at the age-out) */
    const rec = Object.assign({}, j); if (!j.exitPick && lab && !EXIT_TAP_RE.test(lab)) rec.lastTap = lab;
    push(j.job.id || '?', rec, j.life || { id: '?', type: '?' }); return true }
  if (Array.isArray(j) && j.length && j[0] && j[0].seat && j[0].kiep != null) { for (const l of j) push('seat ' + l.seat + ' k' + l.kiep, l, l.life || { id: l.id, age: l.age, year: l.year, type: l.die ? 'death' : '' }); return true }
  return false
}

function fromMd(file, txt, out) {
  const lines = txt.split('\n'); let hdr = null, n = 0;
  for (const ln of lines) {
    if (!/^\|/.test(ln)) { hdr = null; continue }
    const cells = ln.split('|').slice(1, -1).map(s => s.trim());
    if (!hdr) { const lc = cells.map(c => c.toLowerCase()); const li = lc.findIndex(c => /^(life|kiếp|kiep)$/.test(c)); const ei = lc.findIndex(c => /^(ending|result|end|endings?)$/.test(c)); if (li >= 0 && ei >= 0) hdr = { li, ei, cells: lc }; continue }
    if (/^-+$/.test(cells[0].replace(/[:\s]/g, ''))) continue;
    const lifeName = cells.slice(0, hdr.li + 1).join(' · '), endT = cells[hdr.ei] || '';
    const life = mdLife(endT); const v = verdict({}, life); n++;
    out.push({ file: path.relative(process.cwd(), file), life: lifeName, end: endT.slice(0, 90), age: '', valid: v.valid, why: v.why, cls: v.end.k, note: v.end.why || '', sig: file + lifeName + endT, md: true });
  }
  return n > 0
}
function mdLife(t) {
  if (/HARNESS|crash|page closed/i.test(t)) return { id: 'HARNESS', type: 'harness' };
  if (/\bCAP\d*\b|no ending|cap\b/i.test(t)) return { id: 'CAP', type: 'cap' };
  if (/TIMEOUT|stuck|soft-?lock/i.test(t)) return { id: 'TIMEOUT', type: 'stuck' };
  if (/Xuất cung tuổi \d+/.test(t)) return { id: 'Xuất cung', type: 'leave', fate: t };
  for (const id of EXIT_IDS.concat(['Xuất cung'])) if (t.includes(id)) return { id, type: 'leave', fate: t };
  if (/death|chết|bạc mệnh|Thái phi|Lãnh cung|Đại kết cục|băng hà/i.test(t)) return { id: t, type: /Đại kết cục/.test(t) ? 'grand' : 'death', death: true };
  return t ? { id: t } : null;
}

/* robot-rt runner logs: «LIFE DONE <life> <ending id> age <n> · buổi <n> · taps …» (printed only by the real-tap harness dev/test/robot-rt.js).
   Used only when no <life>.json sits beside the log (the json is the full record). A SLICE line is a self-test, not a life. */
function fromLog(file, txt, out, files) {
  const dir = path.dirname(file), round = path.relative(process.cwd(), file);
  for (const m of txt.matchAll(/^LIFE DONE (\S+) (.+?) age (\S+) · buổi (\d+) · taps (\d+)/gm)) {
    const [, life, id, age, buoi] = m; if (id === 'SLICE') continue; if (files.includes(path.join(dir, life + '.json'))) continue;
    const L = { id, age: age === '?' ? null : +age, type: /^(\?|HARNESS)$/.test(id) ? (id === '?' ? '?' : 'harness') : '' };
    const v = verdict({ harness: { kind: 'realtap', realtap: true, jsClicks: 0 } }, L);
    out.push({ file: round, life, end: endText(L), age: ageText(L), valid: v.valid, why: v.why, cls: v.end.k, note: (v.end.note || v.end.why || '') + ' (from LIFE DONE log line, buổi ' + buoi + ')', sig: [life, endText(L), null, L.age, null, null].join('|') }) } }
function walk(p, acc) { const s = fs.statSync(p); if (s.isDirectory()) { for (const f of fs.readdirSync(p)) if (f !== 'saves' && f !== 'node_modules') walk(path.join(p, f), acc) } else if (/\.(json|md|log)$/.test(p)) acc.push(p); return acc }

function audit(paths, only) {
  const files = [].concat(...paths.map(p => walk(p, []))).filter(f => !only || only.test(f)).sort();
  const jsonStems = new Set(files.filter(f => f.endsWith('.json')).map(f => path.join(path.dirname(f), stemOf(f))));
  const out = [], skipped = [];
  for (const f of files) {
    try {
      if (f.endsWith('.json')) { if (/catalog|bal\.json|anim-|SAVES/.test(path.basename(f))) continue; const j = JSON.parse(fs.readFileSync(f, 'utf8')); if (!fromJson(f, j, out)) skipped.push(f + ' (no lives)') }
      else if (f.endsWith('.log')) fromLog(f, fs.readFileSync(f, 'utf8'), out, files)
      else { const st = path.join(path.dirname(f), stemOf(f)); if (jsonStems.has(st) || fs.existsSync(st) && fs.statSync(st).isDirectory()) continue; if (/^rates-/.test(path.basename(f))) continue; fromMd(f, fs.readFileSync(f, 'utf8'), out) }
    } catch (e) { skipped.push(f + ' (' + e.message.split('\n')[0].slice(0, 60) + ')') }
  }
  // the same life merged into several files (e.g. *-merged.json = its chunks): count once
  const seen = new Map(); for (const r of out) { if (r.md) continue; const k = r.sig; if (seen.has(k)) r.dup = seen.get(k); else seen.set(k, r.file) }
  return { lives: out, skipped };
}

function counts(lives) {
  const u = lives.filter(r => !r.dup), c = { total: u.length, valid: 0, invalid: 0, reasons: {} };
  for (const r of u) { if (r.valid) c.valid++; else { c.invalid++; for (const w of r.why) { const k = w.replace(/ \(.*$/, '').replace(/«.*»/, '«…»').replace(/ with \d+ options/, ''); c.reasons[k] = (c.reasons[k] || 0) + 1 } } }
  c.byEnd = {}; for (const r of u) c.byEnd[r.cls] = (c.byEnd[r.cls] || 0) + 1;
  c.mgQuitLives = u.filter(r => r.mgQuit > 0).length; c.mgQuit = u.reduce((a, r) => a + (r.mgQuit || 0), 0);
  return c;
}
function countsLine(c) { return 'COUNTS: lives ' + c.total + ' · VALID ' + c.valid + ' · INVALID ' + c.invalid + ' · ends ' + Object.entries(c.byEnd).map(([k, v]) => k + ' ' + v).join(' / ') + ' · why ' + Object.entries(c.reasons).sort((a, b) => b[1] - a[1]).map(([k, v]) => k + ' ' + v).join(' / ') + ' · mgQuit ' + (c.mgQuit || 0) + ' in ' + (c.mgQuitLives || 0) + ' lives (mini-games quit, not played; life verdict unchanged)' }
function mdTable(lives) {
  const esc = s => String(s).replace(/\|/g, '/');
  return ['| round | life | end | valid? | why |', '|---|---|---|---|---|'].concat(lives.map(r => '| ' + esc(r.file.replace(/^dev\/handover\/robot\//, '')) + ' | ' + esc(r.life) + ' | ' + esc(r.end.slice(0, 80)) + (r.age ? ' (' + r.age + ')' : '') + ' | ' + (r.dup ? 'dup' : r.valid ? 'VALID' : 'INVALID') + ' | ' + esc(r.dup ? 'same life as ' + r.dup.replace(/^dev\/handover\/robot\//, '') : (r.why.join('; ') || r.note) + (r.mgQuit ? ' · mg quit ' + r.mgQuit + (r.mgQuitLB ? '+' : '') + ', not played' : '')) + ' |')).join('\n');
}

module.exports = { audit, verdict, endClass, counts, countsLine, mdTable, EXIT_IDS };

if (require.main === module) {
  const a = process.argv.slice(2), paths = [], opt = {};
  for (let i = 0; i < a.length; i++) { if (a[i] === '--md' || a[i] === '--json' || a[i] === '--only') opt[a[i].slice(2)] = a[++i]; else if (a[i] === '--quiet') opt.quiet = 1; else paths.push(a[i]) }
  if (!paths.length) paths.push('dev/handover/robot');
  const r = audit(paths, opt.only ? new RegExp(opt.only) : null), c = counts(r.lives);
  if (opt.json) fs.writeFileSync(opt.json, JSON.stringify({ at: new Date().toISOString(), counts: c, lives: r.lives, skipped: r.skipped }, null, 1));
  if (opt.md) fs.writeFileSync(opt.md, mdTable(r.lives) + '\n\n' + countsLine(c) + '\n');
  if (!opt.quiet) console.log(mdTable(r.lives));
  if (r.skipped.length) console.log('\nSKIPPED: ' + r.skipped.join(' · '));
  console.log('\n' + countsLine(c));
}
