/* dev/test/lib/rt-save.js — FIXER #24 (F ROOT 7 item viii): LIVE bd47c753+ (save-growth rv26) stores hclh-save-v2-<n> packed «CTMZ…»
   (j6 slotEnc). ONE CORE (law 4): the harness never re-implements the codec — this loads the game's OWN slotDec (+ SLOTZ) out of
   dev/build/j6.js at run time. Plain-JSON (old) saves pass through slotDec unchanged, so both forms read. In the page, use the game's
   window.slotDec (pageDec below). */
const fs = require('fs'), path = require('path');
let DEC = null, ERR = null;
function load() {
  if (DEC || ERR) return DEC;
  try { const src = fs.readFileSync(path.join(__dirname, '..', '..', 'build', 'j6.js'), 'utf8');
    const z = /const SLOTZ\s*=\s*("[^"]*")/.exec(src); const i = src.indexOf('function slotDec(');
    if (!z || i < 0) throw new Error('slotDec / SLOTZ not found in dev/build/j6.js');
    let d = 0, j = src.indexOf('{', i); for (; j < src.length; j++) { const c = src[j]; if (c === '{') d++; else if (c === '}' && --d === 0) break }
    DEC = new Function('return (function(){const SLOTZ=' + z[1] + ';' + src.slice(i, j + 1) + ';return slotDec})()')() } catch (e) { ERR = e; DEC = null; /* FIXER #25 N8: say it once — else every clock reads «?» and the RESUME / ended-ckpt checks go quiet */ console.log('rt-save: slotDec not loaded (' + (e && e.message) + ') — CTMZ saves unreadable') }
  return DEC }
/* text of a stored save (packed or plain) → its plain JSON text; throws only on a broken packed string */
function dec(v) { const f = load(); if (!f) throw new Error('rt-save: ' + (ERR && ERR.message)); return f(v) }
/* stored save → its state object T (o.S || o), or null when unreadable */
function state(v) { try { const o = JSON.parse(dec(v)); return o && (o.S || o) } catch (e) { return null } }
/* page side (string for p.evaluate): the game's own decoder, plain text when the page has none (an older build) */
const PAGE_DEC = "(r => { try { return typeof window.slotDec === 'function' ? window.slotDec(r) : r } catch (e) { return null } })";
module.exports = { dec, state, PAGE_DEC, err: () => (load(), ERR ? String(ERR.message || ERR) : null), packed: v => typeof v === 'string' && v.slice(0, 4) === 'CTMZ' };
/* CLI: node dev/test/lib/rt-save.js <life>.ckpt.json [field,…] — reads each hclh-save-* of a ckpt (packed or plain) and prints the clock + fields
   (default name,rank,suc,ill,age,dead) — for seats / foremen reading a ckpt's S by hand */
if (require.main === module) { const f = process.argv[2]; if (!f) { console.error('usage: node dev/test/lib/rt-save.js <ckpt.json> [fields]'); process.exit(2) }
  const F = (process.argv[3] || 'name,rank,suc,ill,age,dead').split(','); const ck = JSON.parse(fs.readFileSync(f, 'utf8'));
  for (const [k, v] of Object.entries(ck.ls || {})) { if (!/^hclh-save/.test(k)) continue; const T = state(v);
    console.log(k + ' ' + (module.exports.packed(v) ? 'CTMZ' : 'plain') + ' ' + String(v).length + ' chars → ' + (T ? 'clock ' + [T.year, T.turn, T.tuan, T.buoi || 0].join('.') + ' · ' + F.map(x => x + ' ' + JSON.stringify(T[x])).join(' · ') : 'UNREADABLE')) } }
