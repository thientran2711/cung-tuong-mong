#!/usr/bin/env node
/* robot-lint.js — STATIC SELF-TEST of the real-tap harness (HARNESS FIXER #7, 25/11; s2d on 64d62d9b: ReferenceError
   «bareTap is not defined» in unstick — bareTap lived in play()'s scope, unstick sits one level up, so the name only
   failed at run time, on the rare tap-out branch, 15 min into a stuck life).
   For every harness file: (1) node --check (syntax), (2) every identifier that resolves to NO declaration (scope
   analysis of eslint's own scope manager) is a FAIL, except Node globals and names inside functions that run IN THE
   PAGE (arguments of evaluate / evaluateHandle / waitForFunction / addInitScript / $eval / $$eval / evalOnSelector),
   where the game's own globals (S, Q, KG82, …) live.
   usage: node dev/test/robot-lint.js [files…]   (default: the harness set below) — exit 1 on any finding.
   robot-rt.js / robot-rt-coop.js run it at start-up and refuse to play a life on a FAIL (lint=0 skips). */
'use strict';
const fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');
/* The eslint package lives in /opt/node-tools on these containers; where it is missing the scope check is SKIPPED with a WARN (node --check still runs) — BIG #7 nit 17:10Z */
let Linter = null; try { ({ Linter } = require('eslint')) } catch (e) { Linter = null }
const HERE = __dirname;
const DEFAULT = ['robot-rt.js', 'robot-rt-coop.js', 'realtap.js', 'robot-save-replay.js', 'robot-lint.js', 'rt-offer.js', 'rt-membase.js'].map(f => path.join(HERE, f)).filter(f => fs.existsSync(f));
const NODE_GLOBALS = ['require', 'module', 'exports', 'process', 'console', 'Buffer', '__dirname', '__filename', 'global', 'globalThis',
  'setTimeout', 'setInterval', 'setImmediate', 'clearTimeout', 'clearInterval', 'clearImmediate', 'queueMicrotask', 'structuredClone',
  'URL', 'URLSearchParams', 'TextEncoder', 'TextDecoder', 'AbortController', 'AbortSignal', 'fetch', 'performance', 'atob', 'btoa'];
const PAGE_CALL = /^(evaluate|evaluateHandle|waitForFunction|addInitScript|\$eval|\$\$eval|evalOnSelector|evalOnSelectorAll)$/;

function lintFile(file) {
  const out = [];
  try { execFileSync(process.execPath, ['--check', file], { stdio: 'pipe' }) } catch (e) { out.push({ line: 0, msg: 'node --check: ' + String(e.stderr || e.message).split('\n').filter(Boolean).slice(0, 4).join(' | ') }); return out }
  if (!Linter) return out;
  const code = fs.readFileSync(file, 'utf8').replace(/^#!.*/, '');
  const linter = new Linter();
  const pageNames = new Set();
  const rule = { create(ctx) { const src = ctx.sourceCode; return {
    /* a function handed to the page BY NAME (p.evaluate(SCAN), rt probes PROBE / INFO) is page code too */
    CallExpression(n) { const cal = n.callee, nm = cal.type === 'MemberExpression' ? (cal.property.name || cal.property.value) : cal.name;
      if (PAGE_CALL.test(nm || '')) for (const a of n.arguments) if (a.type === 'Identifier') pageNames.add(a.name) },
    'Program:exit'(node) {
    const gs = src.getScope(node);
    for (const ref of gs.through) {
      const id = ref.identifier, name = id.name;
      if (NODE_GLOBALS.includes(name)) continue;
      /* inside a function that is handed to the page? */
      const anc = src.getAncestors(id); let inPage = false;
      for (let k = anc.length - 1; k > 0; k--) { const fn = anc[k], par = anc[k - 1];
        if (/Function/.test(fn.type) && par.type === 'CallExpression' && par.arguments.includes(fn)) {
          const cal = par.callee, nm = cal.type === 'MemberExpression' ? (cal.property.name || cal.property.value) : cal.name;
          if (PAGE_CALL.test(nm || '')) { inPage = true; break } }
        if (/Function/.test(fn.type) && par.type === 'VariableDeclarator' && par.init === fn && pageNames.has(par.id.name)) { inPage = true; break } }
      if (!inPage) ctx.report({ node: id, message: 'undeclared identifier «' + name + '»' + (ref.isWrite() ? ' (assigned → implicit global)' : '') });
    } } } } };
  const msgs = linter.verify(code, [{ files: ['**/*.js'], plugins: { rt: { rules: { undef: rule } } }, rules: { 'rt/undef': 'error' },
    languageOptions: { ecmaVersion: 'latest', sourceType: 'commonjs', globals: {} } }], { filename: path.basename(file) });
  for (const m of msgs) out.push({ line: m.line, msg: m.fatal ? 'parse: ' + m.message : m.message });
  return out;
}

function run(files) { let bad = 0; const rep = [];
  for (const f of files) { const r = lintFile(f); bad += r.length; for (const x of r) rep.push(path.basename(f) + ':' + x.line + ' ' + x.msg) }
  return { ok: bad === 0, n: bad, rep, files: files.map(f => path.basename(f)), warn: Linter ? null : 'eslint not found — undeclared-identifier check skipped, node --check only' } }

module.exports = { run, lintFile, DEFAULT };

if (require.main === module) {
  const files = process.argv.slice(2).length ? process.argv.slice(2).map(f => path.resolve(f)) : DEFAULT;
  const r = run(files);
  if (r.warn) console.log('WARN ' + r.warn);
  for (const l of r.rep) console.log('FAIL ' + l);
  console.log((r.ok ? 'LINT OK ' : 'LINT FAIL ') + r.n + ' finding(s) in ' + r.files.join(', '));
  process.exit(r.ok ? 0 : 1);
}
