/* nrask-scan (Q1, review/questline-q1a): static scan of EVERY dev/build/jnrask*.js (Q1a tt/dtq/muoi/cn, Q1b nc/td/ch/thd/cnv, Q1c men).
   Checks (audit QUESTLINES_AUDIT §4 Q1, OD:L1252 variety, VANPHONG):
   - every key is a real help chapter: a jroad chapter id "<road>_<n>" (rdDef in jrd_*.js) or a men template chapter "<NRM id>_<n>"
     (jnroadm.js), with n inside BAL.nroad.helpN;
   - coverage: an origin (or the men templates) that has any entry has ALL its help chapters;
   - every ask: kind in BAL.nroad.kinds (no «bac»), h + two options, each with a label and a loss line; ≥ 2 asks per chapter;
   - every chapter keeps ≥ 1 ask that does not name {B} (no real rival → nrAskPick drops {B} asks);
   - variety: no sentence of an ask is shared with another ask; no option label or loss line is used twice;
   - slots only {me} {Me} {call} {Call} {he} {B}; no typed pronoun of address in the NPC's words (VANPHONG §2: tỷ / muội / bổn cung … come
     from the slots); no %, no digits, no foreign / modern words (VANPHONG §3), no "Chắc chắn", no «…», no double quotes;
   - sizes: an ask fits the j72 card (h ≤ 260 chars), a label ≤ 64, a loss line ≤ 70.
   usage: node dev/test/nrask-scan.js   (exit 1 on any failure; prints a per-file table) */
const fs=require('fs'),path=require('path'),vm=require('vm');
const B=path.join(__dirname,'../build');
const files=fs.readdirSync(B).filter(f=>/^jnrask.*\.js$/.test(f)).sort();
const fails=[];const fail=(m,x)=>{fails.push(m);console.error('FAIL',m,x!==undefined?JSON.stringify(x).slice(0,400):'')};
/* BAL.nroad.kinds + helpN from jbal2.js (text: no game needed) */
const bal=fs.readFileSync(path.join(B,'jbal2.js'),'utf8');
const kinds=JSON.parse((bal.match(/\bkinds:(\[[^\]]*\])/)||[])[1]||'[]');
const helpN=JSON.parse((bal.match(/\bhelpN:(\[[^\]]*\])/)||[])[1]||'[5,10]');
if(!kinds.length)fail('BAL.nroad.kinds not found in jbal2.js');
if(kinds.includes('bac'))fail('BAL.nroad.kinds deals «bac» (D-Q2: off by default)',kinds);
/* chapter ids: jroad rdDef("<road>",n) in jrd_*.js, men templates NRM ids in jnroadm.js */
const rd={};for(const f of fs.readdirSync(B).filter(f=>/^jrd_.*\.js$/.test(f))){const t=fs.readFileSync(path.join(B,f),'utf8');
 for(const m of t.matchAll(/rdDef\("([a-z0-9_]+)",(\d+),/g)){const road=m[1],n=+m[2];(rd[road]=rd[road]||[]).push(n)}}
const men=fs.readFileSync(path.join(B,'jnroadm.js'),'utf8');
/* men templates that can ask: the hz (NPC princes) templates never ask (jnroadm nrMenL: a son has e.a=null) — no coverage owed there */
const menIds=[...new Set([...men.matchAll(/\bdef\("([a-z0-9_]+)","([a-z]+)",/g)].filter(m=>m[2]!=="hz").map(m=>m[1]))];
const isHelp=n=>n>=helpN[0]&&n<=helpN[1];
/* each file alone in its own sandbox (its own keys; fix r2: a key defined by two files would be silently overwritten by Object.assign),
   then all files together in one sandbox (they share window.NRASK, as in the game) */
const sb={window:{}};sb.window.window=sb.window;vm.createContext(sb);
const per={},owner={};
for(const f of files){const src=fs.readFileSync(path.join(B,f),'utf8');const one={window:{}};one.window.window=one.window;vm.createContext(one);
 try{vm.runInContext(src,one,{filename:f})}catch(e){fail(f+': does not load',e.message);continue}
 per[f]=Object.keys(one.window.NRASK||{});for(const k of per[f]){if(owner[k])fail(`${f}: key ${k} already defined in ${owner[k]}`,k);else owner[k]=f}
 try{vm.runInContext(src,sb,{filename:f})}catch(e){}}
const NR=sb.window.NRASK||sb.NRASK||{};
const SLOT=new Set(['me','Me','call','Call','he','B']);
const BAN=[/%/,/\d/,/Chắc chắn/i,/[«»"…]/,/\b(OK|buff|stat|level|combo|random|bot|test|game|click|tab|slot)\b/i,
 /(điểm số|chỉ số|cơ hội|kiểm tra|xét nghiệm|tải lại|cài đặt|dữ liệu|phiên bản|hệ thống)/i];
/* typed address pronouns are not allowed in the NPC's words (the slots give them); "chị em", "chị dâu", "một mình" are nouns, not address */
const PRON=/(^|[^\p{L}])(tỷ|muội|bổn cung|thần thiếp|tần thiếp|nô tỳ|nô tài|tiểu chủ|nương nương|bạn|tôi|(?<!chị )em|anh|chị(?! (em|dâu))|(?<!một )mình)(?=[^\p{L}]|$)/iu;
const sent=new Map(),lab=new Map(),los=new Map();const norm=s=>s.toLowerCase().replace(/\{\w+\}/g,'_').replace(/\s+/g,' ').trim();
let asks=0;const cov={};
for(const id of Object.keys(NR)){const m=id.match(/^(.+)_(\d+)$/);const road=m&&m[1],n=m&&+m[2];
 const isRd=!!(m&&rd[road]&&rd[road].includes(n)),isMen=!!(m&&menIds.includes(road));
 if(!m||!(isRd||isMen))fail('key is no road / men template chapter',id);else if(!isHelp(n))fail('chapter outside BAL.nroad.helpN',id);
 const grp=isMen?'men':road.split('_')[0];(cov[grp]=cov[grp]||new Set()).add(id);
 const L=[].concat(NR[id]);if(L.length<2)fail('fewer than 2 asks (variety across lives, OD:L1252)',id);
 /* fix 2 (review E7ar2 FIX 2): every chapter keeps ≥ 1 ask that does not name {B} — with no real rival (her rival is the player, or gone)
    nrAskPick drops every {B} ask, and a chapter with none falls back to the stock card */
 if(L.length&&L.every(a=>a&&/\{B\}/.test([a.h,a.c||''].concat(...(a.o||[])).join(' '))))fail('no {B}-free ask (with no real rival the chapter falls to stock)',id);
 L.forEach((a,i)=>{asks++;const w=`${id}[${i}]`;
  if(!a||!kinds.includes(a.k))return fail(w+': kind not in BAL.nroad.kinds',a&&a.k);
  if(typeof a.h!=='string'||!a.h)return fail(w+': no ask text');
  if(!Array.isArray(a.o)||a.o.length!==2||a.o.some(o=>!Array.isArray(o)||!o[0]||!o[1]))return fail(w+': needs two options [label, loss line]',a.o);
  const all=[a.h,a.c||''].concat(...a.o);
  for(const s of all){for(const t of s.matchAll(/\{(\w+)\}/g))if(!SLOT.has(t[1]))fail(w+': unknown slot {'+t[1]+'}',s);
   for(const r of BAN)if(r.test(s))fail(w+': VANPHONG banned '+r,s)}
  if(PRON.test(a.h))fail(w+': typed address pronoun in the ask (use {me}/{call})',a.h.match(PRON)[0]);
  if(a.k==='do'&&!/\{B\}/.test(a.h))fail(w+': a «do» ask must name its target {B} (the stock option hits {B})',a.h);
  if(a.h.length>260)fail(w+': ask too long for the card',a.h.length);
  for(const x of a.h.split(/(?<=[.!?:])\s+/).map(norm).filter(z=>z.length>8)){if(sent.has(x))fail(w+': sentence shared with '+sent.get(x),x);else sent.set(x,w)}
  a.o.forEach(([l,x],j)=>{if(l.length>64)fail(w+': label too long',l);if(x.length>70)fail(w+': loss line too long',x);
   const nl=norm(l),nx=norm(x);if(lab.has(nl))fail(w+': label used twice (also '+lab.get(nl)+')',l);else lab.set(nl,w);
   if(los.has(nx))fail(w+': loss line used twice (also '+los.get(nx)+')',x);else los.set(nx,w)})})}
/* coverage: an origin (or men) with any entry must cover every help chapter of every road of it */
const want={};for(const road of Object.keys(rd)){const o=road.split('_')[0];for(const n of rd[road])if(isHelp(n))(want[o]=want[o]||[]).push(road+'_'+n)}
const rows=[];for(const g of Object.keys(cov).sort()){if(g==='men'){const mw=menIds.flatMap(id=>Array.from({length:helpN[1]-helpN[0]+1},(_,i)=>id+'_'+(helpN[0]+i)));const mm=mw.filter(id=>!cov[g].has(id));rows.push([g,cov[g].size,mw.length+(mm.length?' MISSING '+mm.length:'')]);if(mm.length)fail('men: help chapters without an ask',mm);continue}
 const miss=(want[g]||[]).filter(id=>!cov[g].has(id));rows.push([g,cov[g].size,(want[g]||[]).length+(miss.length?' MISSING '+miss.length:'')]);if(miss.length)fail(g+': help chapters without an ask',miss)}
console.log('files:',files.join(', '));for(const f of files)console.log(`  ${f}: ${per[f]?per[f].length:0} chapters`);
console.log('origin | chapters with asks | help chapters');for(const r of rows)console.log('  '+r.join(' | '));
console.log(`asks ${asks} · sentences ${sent.size} · labels ${lab.size} · loss lines ${los.size} · kinds ${kinds.join('/')}`);
console.log(fails.length?`${fails.length} FAIL`:'ALL PASS');process.exit(fails.length?1:0);
