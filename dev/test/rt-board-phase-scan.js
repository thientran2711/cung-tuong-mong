#!/usr/bin/env node
/* rt-board-phase-scan.js — FIXER #16 family scan (law 11): every board end path of the game and whether it sets KG82.phase «result».
   A round that ends with KG82.phase still «play» (result / next shown by kg82ShowRes, #kg82box hidden) is what the harness now reads as BOARD OVER
   (robot-rt.js mgOver); this lists every such path for MAIN (game side). usage: node dev/test/rt-board-phase-scan.js [git ref, default origin/main] */
'use strict';
const { execSync } = require('child_process');
const ref = process.argv[2] || 'origin/main', git = a => execSync('git ' + a, { encoding: 'utf8', maxBuffer: 64 << 20 });
const files = git('ls-tree --name-only ' + ref + ' dev/build/').split('\n').filter(f => /\/j[^/]*\.js$/.test(f));
const rows = [];
for (const f of files) { const s = git('show ' + ref + ':' + f);
  /* (1) kg82Play(kind, raw => NAME(...)) : the end callback NAME must set KG82.phase="result" (or be inline and set it) */
  for (const m of s.matchAll(/kg82Play\(([^,]+),\s*raw\s*=>\s*(\{?)\s*([A-Za-z_$][\w$]*)?/g)) { if (/^kind$/.test(m[1]) && /function kg82Play/.test(s.slice(Math.max(0, m.index - 9), m.index + 9))) continue;
    let sets, how; if (m[2] === '{') { sets = /^\{\s*KG82\.phase="result"/.test(s.slice(m.index + m[0].length - (m[3] || '').length - 1, m.index + m[0].length + 40)); how = 'inline' }
    else { const nm = m[3]; const d = s.match(new RegExp('const ' + nm.replace(/\$/g, '\\$') + '=\\(?[^=]*\\)?=>\\{([\\s\\S]{0,400})')); sets = !!d && /KG82\.phase="result"/.test(d[1].split('kg82ShowRes')[0]); how = nm + (d ? '' : ' (not found)') }
    rows.push({ f, path: 'kg82Play(' + m[1].trim() + ') → ' + how, sets }) }
  /* (2) own engines that set KG82.phase="play" themselves (not kg82Play): the file must set «result» somewhere */
  if (!/function kg82Play/.test(s)) for (const m of s.matchAll(/KG82\.phase="play"/g)) rows.push({ f, path: 'own engine @' + m.index, sets: /KG82\.phase="result"/.test(s) }) /* anywhere in the file (jsgame: finish() before sgEng) */ }
console.log('| file | end path | sets KG82.phase «result» |\n|---|---|---|'); for (const r of rows) console.log('| ' + r.f.replace('dev/build/', '') + ' | ' + r.path + ' | ' + (r.sets ? 'yes' : '**NO** (stays «play»)') + ' |');
const no = rows.filter(r => !r.sets); console.log('\n' + rows.length + ' end paths on ' + ref + ', ' + no.length + ' leave KG82.phase «play»: ' + no.map(r => r.f.replace('dev/build/', '') + ' ' + r.path).join(' · '));
