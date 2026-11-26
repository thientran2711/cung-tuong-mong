#!/usr/bin/env node
/* dev/measure/heap-retainers.js <file.heapsnapshot> <name-regex> [n=3] — F10: for detached DOM nodes whose name matches, print the shortest
   retainer chain from a GC root (BFS over the snapshot graph, weak edges skipped), so a leak is named by the JS that holds it. */
'use strict';
const fs = require('fs'); const s = JSON.parse(fs.readFileSync(process.argv[2], 'utf8')); const RE = new RegExp(process.argv[3]); const NMAX = +(process.argv[4] || 3);
const m = s.snapshot.meta, NF = m.node_fields.length, EF = m.edge_fields.length, NT = m.node_types[0], ET = m.edge_types[0], N = s.nodes, E = s.edges, STR = s.strings;
const it = m.node_fields.indexOf('type'), iname = m.node_fields.indexOf('name'), iec = m.node_fields.indexOf('edge_count'), idet = m.node_fields.indexOf('detachedness'), iid = m.node_fields.indexOf('id');
const et = m.edge_fields.indexOf('type'), en = m.edge_fields.indexOf('name_or_index'), eto = m.edge_fields.indexOf('to_node');
const cnt = N.length / NF; const first = new Uint32Array(cnt + 1); for (let i = 0, e = 0; i < cnt; i++) { first[i] = e; e += N[i * NF + iec] * EF } first[cnt] = E.length;
const nm = i => { const t = NT[N[i * NF + it]]; let x = STR[N[i * NF + iname]]; return (t === 'string' ? '"' + x.slice(0, 30) + '"' : x.slice(0, 70)) + (t === 'closure' ? '()' : '') };
const ename = e => { const t = ET[E[e + et]]; return t === 'element' || t === 'hidden' ? '[' + E[e + en] + ']' : String(STR[E[e + en]]) };
/* BFS from root (node 0) — parent pointers */
const par = new Int32Array(cnt).fill(-1), pe = new Int32Array(cnt).fill(-1); par[0] = 0; const q = [0];
for (let h = 0; h < q.length; h++) { const i = q[h]; for (let e = first[i]; e < first[i + 1]; e += EF) { const t = ET[E[e + et]]; if (t === 'weak' || t === 'shortcut') continue; const j = E[e + eto] / NF; if (par[j] >= 0) continue; par[j] = i; pe[j] = e; q.push(j) } }
let shown = 0; const seen = new Set();
for (let i = 0; i < cnt && shown < NMAX; i++) { if (idet >= 0 && N[i * NF + idet] !== 2) continue; if (!RE.test(STR[N[i * NF + iname]])) continue; if (par[i] < 0) continue;
  const ch = []; let j = i; while (j !== 0 && ch.length < 40) { ch.push(nm(j) + (pe[j] >= 0 ? ' ←.' + ename(pe[j]) : '')); j = par[j] }
  const key = ch.slice(-6).join('|'); if (seen.has(key)) continue; seen.add(key); shown++;
  console.log('--- ' + nm(i)); ch.reverse().forEach(x => console.log('   ' + x)) }
