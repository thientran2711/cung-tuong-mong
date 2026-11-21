/* errand-bal guard (review/errand-bal, law 1 TWO-WAY + law 4 ONE CORE + law 11 whole family). Static, node only. FAILS when:
   1. an errand / servant / entry-exam module (FILES) types an odds literal as the first number of roll(N) / j95dice(N…) / chanceW(N) /
      od(N…) inside a function — the number must come from BAL (BAL.odb.<module>.<site>, BAL.errand, BAL.entry.bot …);
   2. the errand act reads two numbers: her maid card (SRVA.errand.offer, j42) and the NPC servant errand in the day record (j95plan)
      must both read BAL.errand.offer, and both must draw the destination from the ONE list srvErrList;
   3. the entry-exam bot / broken-round score is typed again (3+R(6), fin(5), o.skipped?5, «tính 5/10») instead of entBotRaw / entSkipRaw.
   4. runtime: BAL.errand.offer, BAL.entry.bot and every BAL.odb.<module>.<key> the FILES read exist and are numbers.
   usage: node dev/test/errand-bal.js */
const fs=require('fs'),path=require('path');const B=path.join(__dirname,'..','build');
const acorn=(()=>{try{return require('acorn')}catch(e){return require('/opt/node-tools/node_modules/acorn')}})();
const FILES=['j42.js','j95.js','j95b.js','jkc.js','jkc2.js','jentry.js'];
const fails=[];const F=(m)=>fails.push(m);const src={};for(const f of FILES)src[f]=fs.readFileSync(path.join(B,f),'utf8');
/* 1 */
for(const f of FILES){const s=src[f];const ast=acorn.parse(s,{ecmaVersion:'latest',locations:true});
 (function walk(n,inFn){if(!n||typeof n.type!=='string')return;const fn=inFn||/Function/.test(n.type);
  if(fn&&n.type==='CallExpression'&&n.callee.type==='Identifier'&&/^(roll|j95dice|chanceW|od)$/.test(n.callee.name)&&n.arguments.length){
   let a=n.arguments[0];while(a&&a.type==='BinaryExpression'&&(a.operator==='+'||a.operator==='-'))a=a.left;
   if(a&&a.type==='Literal'&&typeof a.value==='number'&&a.value!==100)F(`${f}:${a.loc.start.line} typed odds ${s.slice(n.start,Math.min(n.end,n.start+48))}`)}
  for(const k in n){if(k==='loc')continue;const c=n[k];if(Array.isArray(c))c.forEach(x=>walk(x,fn));else if(c&&typeof c.type==='string')walk(c,fn)}})(ast,false)}
/* 2 */
if(!/errand:\{k:1.*?get offer\(\)\{return BAL\.errand\.offer\}/.test(src['j42.js']))F('j42 SRVA.errand.offer does not read BAL.errand.offer');
if(!/kind==="st"[^;]*j95dice\(BAL\.errand\.offer\)/.test(src['j95.js']))F('j95plan NPC servant errand does not roll BAL.errand.offer');
if(!/function srvErrPick\(\)\{return pick\(srvErrList\(/.test(src['j42.js']))F('her errand does not pick from srvErrList');
if(!/pick\(srvErrList\(p\.ref\)\)/.test(src['j95.js']))F('NPC servant errand does not pick from srvErrList');
/* 3 */
for(const f of FILES){const s=src[f].replace(/\/\*[\s\S]*?\*\//g,'');for(const re of [/(^|[^\d.])3\+R\(6\)/,/\bfin\(5\)/,/skipped\?5\b/,/tính 5\/10/,/skip\?5\b/])if(re.test(s))F(`${f}: typed exam score ${re}`)}
/* 4 */
const jb=fs.readFileSync(path.join(B,'jbal2.js'),'utf8');const MK='/* ---- review/one-core-jkc-2: BAL.odb (one-core-odb-move.js) ---- */';
let ODB=null;try{const a0=jb.indexOf(MK),a1=jb.indexOf('\n}});',a0)+5;ODB=Function('const BAL={};'+jb.slice(a0,a1)+';return BAL.odb')()}catch(e){F('BAL.odb block: '+e.message)}
if(!/Object\.assign\(BAL,\{errand:\{[^}]*\boffer:\d+/.test(jb))F('BAL.errand.offer missing');
if(!/BAL\.entry\.bot=\{min:\d+,r:\d+,max:\d+\}/.test(jb))F('BAL.entry.bot missing');
if(!/pun:\{[^}]*lauWk:\d+[^}]*tin:\d+[^}]*spyPay:\d+/.test(jb))F('BAL.ag.why.srv.pun lauWk / tin / spyPay missing');
/* 5 (reviewer r1, law 1 + 4): the servant-road punishment family — Tân Giả khố weeks / Chủ tin after are BAL.ag.why.srv.pun keys, never typed;
   caught betraying = the SAME npwPick(kill vs lau) for her (j42) and an NPC servant (jagstaff asMonth), and her card prints that share */
{const s=src['j42.js'].replace(/\/\*[\s\S]*?\*\//g,'');for(const m of s.matchAll(/srvLaundry\(`[^`]*`,\s*(\d+)\)/g))F(`j42: typed Tân Giả khố weeks srvLaundry(…,${m[1]})`);
 for(const m of s.matchAll(/S\.tin=(\d+)\s*[;}]/g))if(m[1]!=='40')F(`j42: typed Chủ tin after punishment S.tin=${m[1]}`);
 if(/betray\.kill|kill:30/.test(s))F('j42: the old betray kill:30 number is back');
 if(!/Mật báo chuyện[^\n]*npwShare\(\["kill","lau"\]/.test(s))F('j42: the betray card does not print the true kill share (npwShare)');
 const ag=fs.readFileSync(path.join(B,'jagstaff.js'),'utf8');if(!/s\.betray&&[^\n]*npwPick\(\["kill","lau"\],k=>srvPunW\(p,k\)\)/.test(ag)||/SRVA\.betray\.kill/.test(ag))F('jagstaff: an NPC servant caught betraying is not judged by the same npwPick(srvPunW) as her');}
if(!/pun:\{[^}]*betrayWk:\d+[^}]*spyOutWk:\d+[^}]*orderWk:\d+[^}]*orderTin:\d+[^}]*stealWk:\d+[^}]*stealTin:\d+/.test(jb))F('BAL.ag.why.srv.pun betrayWk / spyOutWk / orderWk / orderTin / stealWk / stealTin missing');
if(ODB)for(const f of FILES)for(const m of src[f].matchAll(/BAL\.odb\.(\w+)\.(\w+)/g)){const v=(ODB[m[1]]||{})[m[2]];if(typeof v!=='number')F(`${f}: BAL.odb.${m[1]}.${m[2]} missing`)}
console.log(JSON.stringify({files:FILES.length,fails:fails.length}));for(const x of fails)console.log('FAIL',x);
console.log(fails.length?'FAIL: errand-bal':'PASS: errand-bal (one BAL key per errand / servant / exam odds)');process.exit(fails.length?1:0);
