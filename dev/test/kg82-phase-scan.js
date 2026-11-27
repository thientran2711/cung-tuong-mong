#!/usr/bin/env node
/* kg82-phase-scan.js — D-KG82PHASE family scan (law 11): EVERY board end path (every kg82ShowRes call = a result / next-round screen of the shared
   game frame) and whether KG82.phase reads «result» and the live run (KG82.run) is stopped when that screen shows.
   A path is covered when (a) the shared kg82ShowRes itself sets phase «result» + stops KG82.run (the fix: one place, no caller can forget), or
   (b) the caller sets KG82.phase="result" in the same end function before it calls kg82ShowRes.
   Builds on FIXER #16's dev/test/rt-board-phase-scan.js (review/robot-realtap f65d019b; copied in unchanged, it lists the kg82Play / own-engine paths).
   usage: node dev/test/kg82-phase-scan.js [git ref | "." for the working tree, default origin/main] */
'use strict';
const { execSync } = require('child_process'); const fs = require('fs');
const ref = process.argv[2] || 'origin/main', git = a => execSync('git ' + a, { encoding: 'utf8', maxBuffer: 64 << 20 });
const files = ref === '.' ? fs.readdirSync('dev/build').filter(f => /^j.*\.js$/.test(f)).map(f => 'dev/build/' + f) : git('ls-tree --name-only ' + ref + ' dev/build/').split('\n').filter(f => /\/j[^/]*\.js$/.test(f));
const src = f => ref === '.' ? fs.readFileSync(f, 'utf8') : git('show ' + ref + ':' + f);
const j82 = src('dev/build/j82.js'), def = (j82.match(/function kg82ShowRes\(html\)\{([\s\S]{0,600})/) || [])[1] || '';
const shared = /KG82\.phase="result"/.test(def) && /KG82\.run=null/.test(def) && /\.stop/.test(def);
const rows = [];
for (const f of files) { const s = src(f); const lines = s.split('\n');
  lines.forEach((ln, i) => { let k = -1; while ((k = ln.indexOf('kg82ShowRes(', k + 1)) >= 0) {
    if (/function kg82ShowRes|typeof kg82ShowRes|W\("kg82ShowRes"/.test(ln.slice(Math.max(0, k - 20), k + 14)) || /^\s*(\/\*|\*|-)/.test(ln)) continue;
    const before = (lines.slice(Math.max(0, i - 3), i).join('\n') + '\n' + ln.slice(0, k)); const fn = before.slice(Math.max(before.lastIndexOf('=>{'), before.lastIndexOf('function ')));
    const own = /KG82\.phase="result"/.test(fn); const name = (before.match(/(?:const |function )([A-Za-z_$][\w$]*)\s*=?\s*\(?[^()]*\)?\s*=>\s*\{[^{}]*$|function ([A-Za-z_$][\w$]*)\([^)]*\)\{[^]*$/) || []);
    const lbl = (ln.slice(k, k + 400).match(/id="(kg82ok|kg92ok|mgcal-nx|toildone|sgdo|[a-z0-9-]+)"[^>]*>([^<$]{0,24})/) || [, '', ''])[1];
    rows.push({ f: f.replace('dev/build/', ''), line: i + 1, btn: lbl || '(caller)', own, cov: own || shared }) } }) }
console.log(`kg82ShowRes (shared result path) sets «result» + stops KG82.run: ${shared ? 'YES' : 'no'}  [${ref}]\n`);
console.log('| file:line | result button | caller sets «result» itself | phase «result» + run stopped on screen |\n|---|---|---|---|');
for (const r of rows) console.log(`| ${r.f}:${r.line} | ${r.btn} | ${r.own ? 'yes' : 'no'} | ${r.cov ? 'yes' : '**NO** (stays «play»)'} |`);
const no = rows.filter(r => !r.cov); console.log(`\n${rows.length} result paths, ${no.length} leave KG82.phase «play»${no.length ? ': ' + no.map(r => r.f + ':' + r.line).join(' · ') : ''}`);
process.exitCode = no.length ? 1 : 0;
