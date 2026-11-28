/* text-hygiene.js — TEXT HYGIENE, permanent test (owner OD 26/11 ~06:50Z (D): «repeated names/words in one line («thiện cảm thiện cảm»), code-like
   glue («=», «·» chains, double brackets), English/ids leaking, %, over-long lines → scan every string builder in QC»).
   ONE rule set (RULES below), used on two inputs:
     runtime  the text she SAW: every distinct visible line the real-tap robot's read-only sampler sent (dev/measure/noise-sampler.js → noise-*.jsonl),
              with the surface it was on (tinbao / chip / result / resrow / title / body / button / panel)
     static   every string builder in dev/build/j*.js (player-text literals: «…» / "…" / `…` with Vietnamese letters; ${…} → «X»)
   Rules (a hit = a FAULT; numbers from BAL.noise.text — law 4):
     dup     a two-word phrase said twice in a row («thiện cảm thiện cảm»; the KK38 vp-doubled rule, review/kit-stage-r2 919f6c1b), or one word
             of 3+ letters twice in a row that is not a Vietnamese doubled word (BAL.noise.text.redup lists the allowed ones)
     glue    code glue: «=» between words, «·» with an empty side («· ·», «··», a line that starts / ends on «·»), more than BAL.noise.text.dotMax «·»
             in one line, «=>», «&&», «||», «;» chains
     bracket double / empty brackets: «((», «))», «[[», «]]», «««», «»»», «()», «[]», ««»», «{ }», a stray «${»
     leak    English / ids / code values: undefined, NaN, null, [object, function, true/false, a word with f/j/w/z (letters Vietnamese has not),
             camelCase, snake_case, a picture id (c03, m12, u05 …), a file name (.webp/.js)
     pct     any «%» (VANPHONG: odds in words)
     long    one line longer than BAL.noise.text.lineMax[surface] (only the one-line surfaces: chip, tinbao, resrow, button)
   usage: node dev/test/text-hygiene.js [--static] [--runtime <dir or .jsonl …>] [--build <dev/build>] [--json out.json]
   Exit 1 when a FAULT is found that is not in the frozen list dev/test/text-hygiene-known.json (static only: the list may only shrink). */
'use strict';
const fs = require('fs'), path = require('path');
const A = process.argv.slice(2); const opt = k => { const i = A.indexOf(k); return i >= 0 ? A[i + 1] : null };
const BUILD = path.resolve(opt('--build') || path.join(__dirname, '..', 'build'));
/* the numbers: BAL.noise.text from the build's own jbal2.js (ONE CORE) */
function balText() { const src = fs.readFileSync(path.join(BUILD, 'jbal2.js'), 'utf8'); const m = src.match(/BAL\.noise=(\{[\s\S]*?\});\s*\/\*NOISE-END\*\//);
  if (!m) throw new Error('BAL.noise not found in ' + BUILD + '/jbal2.js'); return Function('return ' + m[1])() }
const NZ = balText(), TX = NZ.text;
const NODUP = new Set(TX.noDup); /* a single word twice in a row is a fault only for these (Vietnamese doubles many words on purpose: nương nương, rưng rưng) */
const VNL = /[àáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵđ]/i;
const RULES = [
  ['dup', s => { const m = /(?<![\p{L}\p{M}])(\p{L}+ \p{L}+) \1(?![\p{L}\p{M}])/u.exec(s); if (m) return m[1];
    const w = /(?<![\p{L}\p{M}])(\p{L}+) \1(?![\p{L}\p{M}])/iu.exec(s); if (w && NODUP.has(w[1].toLowerCase())) return w[1] + ' ' + w[1]; return null }],
  ['glue', (s, surf) => { let m = /[\p{L}\d)»”] ?= ?[\p{L}\d(«“+−-]/u.exec(s); if (m && !/=>|==/.test(m[0])) return m[0];
    if ((m = /=>|&&|\|\||;\s*;|·\s*·/.exec(s))) return m[0];
    /* a line that starts / ends on «·»: only on one-line surfaces (a kit row wraps its «·» items onto the next line of a panel's innerText) */
    if (!/^(body|panel|button)$/.test(surf || '') && (m = /^\s*·|·\s*$/.exec(s))) return m[0];
    const n = (s.match(/·/g) || []).length; if (n > TX.dotMax) return n + '×·'; return null }],
  ['bracket', s => { const m = /\(\(|\)\)|\[\[|\]\]|««|»»|\(\s*\)|\[\s*\]|«\s*»|\{\s*\}|\$\{/.exec(s); return m ? m[0] : null }],
  ['leak', s => { const m = /\b(undefined|NaN|null|\[object|function|true|false|Infinity)\b/.exec(s) || /(?<![\p{L}\p{M}])(?=[A-Za-z]*[fjwzFJWZ])[A-Za-z]{2,}(?![\p{L}\p{M}])/u.exec(s)
      || /(?<![\p{L}\p{M}])[a-z]+[A-Z][A-Za-z]*|[A-Za-z]+_[A-Za-z0-9_]+|(?<![\p{L}\p{M}\d])[a-z]{1,3}\d{2,3}(?![\p{L}\p{M}\d])|\.(webp|png|jpg|js|json)\b/u.exec(s);
    if (!m) return null; const w = m[0]; if (TX.leakOk.includes(w)) return null; return w }],
  ['pct', s => s.includes('%') ? '%' : null],
];
const longMax = surf => (TX.lineMax[surf] != null ? TX.lineMax[surf] : null);
function check(s, surf) { const out = []; for (const [k, f] of RULES) { let h = null; try { h = f(s, surf) } catch (e) {} if (h) out.push([k, h]) }
  const L = surf && longMax(surf); if (L != null && [...s].length > L) out.push(['long', [...s].length + '>' + L]); return out }
/* ---- runtime: the robot's visible lines ---- */
function runtime(srcs) { const F = []; for (const s of srcs) { const st = fs.statSync(s); if (st.isDirectory()) { for (const f of fs.readdirSync(s)) if (/^noise-.*\.jsonl$/.test(f)) F.push(path.join(s, f)) } else F.push(s) }
  const seen = new Set(), hits = [], per = {}; let n = 0;
  for (const f of F) for (const l of fs.readFileSync(f, 'utf8').split('\n')) { if (!l) continue; let j; try { j = JSON.parse(l) } catch (e) { continue }
    for (let [surf, t] of j.txt || []) { t = String(t).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim(); const k = surf + '|' + t; if (seen.has(k)) continue; seen.add(k); n++; per[surf] = (per[surf] || 0) + 1;
      for (const [r, h] of check(t, surf)) hits.push({ rule: r, hit: h, surf, text: t, life: j.life, dev: j.dev }) } }
  return { files: F.length, lines: n, per, hits } }
/* ---- static: string builders in dev/build/j*.js ---- */
/* static: a literal is often a PART of a line (joined with «·» / «+» later), so only the rules that a part alone can break */
const STATIC_RULES = ['dup', 'bracket', 'leak', 'pct'];
function statics() { const hits = [], files = fs.readdirSync(BUILD).filter(f => /^j.*\.js$/.test(f)).sort(); let n = 0;
  const req = m => { try { return require(m) } catch (e) { return require('/opt/node-tools/node_modules/' + m) } }; const acorn = req('acorn'), walk = req('acorn-walk');
  for (const f of files) { const src = fs.readFileSync(path.join(BUILD, f), 'utf8'); let ast; try { ast = acorn.parse(src, { ecmaVersion: 'latest', locations: true }) } catch (e) { hits.push({ rule: 'parse', hit: e.message, file: f, text: '' }); continue }
    /* DEV-ONLY builders are not player text (KK65 G4): the kit sample page (KIT_SAMPLES.push({...}), dev/kit page only) and the lifeStore(label, fn)
       label (an internal id). Literals inside those ranges are skipped. */
    const DEV = []; walk.full(ast, nd => { if (nd.type !== 'CallExpression') return; const c = nd.callee;
      if (c.type === 'MemberExpression' && c.object.type === 'Identifier' && c.object.name === 'KIT_SAMPLES' && c.property.name === 'push') DEV.push([nd.start, nd.end]);
      else if (c.type === 'Identifier' && c.name === 'lifeStore' && nd.arguments[0]) DEV.push([nd.arguments[0].start, nd.arguments[0].end]) });
    const isDev = nd => DEV.some(([a, b]) => nd.start >= a && nd.end <= b);
    const T = []; walk.full(ast, nd => { if ((nd.type === 'Literal' || nd.type === 'TemplateLiteral') && DEV.length && isDev(nd)) return; if (nd.type === 'Literal' && typeof nd.value === 'string') T.push([nd.value, nd.loc.start.line]);
      else if (nd.type === 'TemplateLiteral') T.push([nd.quasis.map(q => q.value.cooked == null ? q.value.raw : q.value.cooked).join('§'), nd.loc.start.line]) });
    for (let [t, ln] of T) { if (!VNL.test(t) || t.length > 3000 || /\(\?[:<=!]|\\p\{|\[\^/.test(t) || /^\s*\/\*|[{;]\s*[a-z-]+\s*:[^/]/.test(t)) continue; /* a regex source is not player text */
      t = t.replace(/<\/?(div|p|li|h\d|small|br|figcaption|header|footer|section|td|tr)\b[^>]*>/gi, '\n').replace(/<[^>]*>/g, ' ').replace(/\{[A-Za-z_$][\w$.:]*\}/g, '§'); /* {foe} / {n:art.stUp}: fill-in slots of a line pool (kLine) */
      for (const line of t.split(/\n|<br>/)) { const s = line.replace(/\s+/g, ' ').trim(); if (!s || !VNL.test(s)) continue; n++;
        for (const [r, h] of check(s, null)) { if (!STATIC_RULES.includes(r)) continue; if (/§/.test(h)) continue; hits.push({ rule: r, hit: h, file: f, line: ln, text: s.slice(0, 160) }) } } } }
  return { files: files.length, texts: n, hits } }
module.exports = { check, RULES, NZ };
if (require.main === module) {
  const R = {}; let bad = 0;
  const rt = A.indexOf('--runtime') >= 0 ? (() => { const o = []; for (let i = A.indexOf('--runtime') + 1; i < A.length && !A[i].startsWith('--'); i++) o.push(A[i]); return o })() : [];
  if (rt.length) { const r = R.runtime = runtime(rt); const by = {}; for (const h of r.hits) { by[h.rule] = (by[h.rule] || 0) + 1 }
    console.log(`RUNTIME ${r.lines} distinct lines from ${r.files} files · faults ${r.hits.length} ${JSON.stringify(by)}`);
    for (const h of r.hits.slice(0, +(opt('--show') || 40))) console.log(`  ${h.rule} «${h.hit}» [${h.surf}] ${h.text.slice(0, 150)}`);
    /* known LIVE debt families (listed for MAIN, owner of the text named in «why»): only the coordinator may add one; fixing = removing it */
    const KF = path.join(__dirname, 'text-hygiene-known.json'); const KR = (fs.existsSync(KF) ? JSON.parse(fs.readFileSync(KF, 'utf8')).runtime : null) || [];
    const isKnown = h => KR.some(k => k.rule === h.rule && (!k.surf || k.surf === h.surf) && new RegExp(k.re, 'u').test(h.text));
    const nw = r.hits.filter(h => !isKnown(h)); if (KR.length) console.log(`  known debt families ${KR.length}: ${r.hits.length - nw.length} hits · NEW ${nw.length}`);
    for (const h of nw.slice(0, 20)) console.log(`  NEW ${h.rule} «${h.hit}» [${h.surf}] ${h.text.slice(0, 150)}`);
    bad += nw.length }
  if (A.includes('--static')) { const r = R.static = statics(); const KF = path.join(__dirname, 'text-hygiene-known.json');
    const key = h => h.rule + '|' + h.file + '|' + h.text; const known = fs.existsSync(KF) ? JSON.parse(fs.readFileSync(KF, 'utf8')) : { keys: [] };
    if (A.includes('--update')) { { const old = fs.existsSync(KF) ? JSON.parse(fs.readFileSync(KF, 'utf8')) : {}; fs.writeFileSync(KF, JSON.stringify(Object.assign(old, { note: 'TEXT HYGIENE frozen debt (dev/test/text-hygiene.js). keys = static faults in string builders; runtime = families seen on LIVE by the real-tap robot, each with the worker / foreman that owns the text. Only the coordinator may grow either list; a fix removes its entry.', keys: [...new Set(r.hits.map(key))].sort() }), null, 1) + '\n') }; console.log('frozen ' + r.hits.length) }
    const K = new Set((fs.existsSync(KF) ? JSON.parse(fs.readFileSync(KF, 'utf8')) : known).keys); const nw = r.hits.filter(h => !K.has(key(h)));
    const by = {}; for (const h of r.hits) by[h.rule] = (by[h.rule] || 0) + 1;
    console.log(`STATIC ${r.texts} text lines in ${r.files} files · faults ${r.hits.length} ${JSON.stringify(by)} · new (not frozen) ${nw.length}`);
    for (const h of nw.slice(0, +(opt('--show') || 40))) console.log(`  ${h.rule} «${h.hit}» ${h.file}:${h.line}: ${h.text}`); bad += nw.length }
  if (opt('--json')) fs.writeFileSync(opt('--json'), JSON.stringify(R, null, 1));
  console.log(bad ? 'TEXT-HYGIENE FAIL ' + bad : 'TEXT-HYGIENE PASS'); process.exit(bad ? 1 : 0) }
