/* robot-coop-fix-2 r2 (law 11 FIX THE WHOLE GROUP + law 4 ONE CORE): every game clamp site of a person field vs THE table
   (BAL.personRange, dev/build/jbalpr.js) and the co-op Worker's generated copy (coop/worker/src/ranges.gen.js).
   usage: node dev/tools/coop-range-scan.js [--all]
   A site = `x.f=cl(…,lo,hi)` / `x.f=Math.max(lo,…)` / `x.f=Math.min(hi,…)` / `x.f[k]=…` in dev/build/j*.js (not all.js).
   Verdict per table field: OK = every constant bound in the game lies inside the table's range (a floor like «hp ≥ 30 after a cure» is a rule
   inside the range); WIDER = some site lets the value go OUTSIDE the table (the Worker would cut a value the game allows) → FAIL.
   Also lists fields the game clamps with a constant range at ≥ 3 sites that are NOT in the table (--all: every such field) for a hand check.
   Last line: COOP-RANGE PASS/FAIL. */
const fs=require('fs'),path=require('path'),vm=require('vm');const ROOT=path.resolve(__dirname,'../..'),DIR=path.join(ROOT,'dev/build');
const ctx={BAL:{}};vm.createContext(ctx);vm.runInContext(fs.readFileSync(path.join(DIR,'jbalpr.js'),'utf8'),ctx);const PR=JSON.parse(JSON.stringify(ctx.BAL.personRange));
/* hand-checked sites (not a person's stored number) and fields (not merged additively) — every entry says why */
const EXEMPT_SITE={'j67.js:1594':'an option\'s EFFECT block (o.c / o.l: a Sức / Hận cost halved, kept ≤ −1), not a person'};
const EXEMPT_FIELD={p:'an option\'s odds (j87 / jmkt rows), not a person',aff:'a pet\'s (jpetcare; her own pets change only through `res` pet ops, never the week write-back) and the market\'s toilFx rows (effect rows)',
 full:'a pet\'s (as aff)',clean:'a pet\'s (as aff)',pc:'a shelf entry\'s freshness (jshelf, her own room), not a person',
 kap:'her own tiểu thư road numbers (jkc: S.kap / kld / kgt; her blob is written by her seat only, the host write-back carries STAT keys only)',kld:'as kap',kgt:'as kap',le:'as kap (jkc2)',kim:'as kap (jkc2)',
 h:'the T96 arc state (j96 T96().h / sus), not a person',sus:'as h',heat:'a route\'s heat (jroute), not a person',tr:'the reign state (jreign), not a person',me:'a link value inside jcoopthinc\'s own clamp (the link table: BAL.linkRange)',
 'rel[]':'the court\'s faction links (j55 trS().rel), world, host-run court acts',v:'emotion / generic values (jemo, j91), not a stored person field',
 volume:'sound UI',__mapZ:'map UI',lineWidth:'canvas UI',width:'UI',sk:'toilette roll (jtoilr), not a person','v[]':'emotion values (j91)',care:'a pet\'s (as aff)',age:'NOADD in the Worker (never summed; host wins)',
 joy:'covered: BAL.personRange.sub.hW.joy (a married daughter\'s household); the rest are pets (as aff)',bien:'covered: BAL.personRange.world.trieu.bien',kho:'covered: BAL.personRange.world.trieu.kho'};
const gen=fs.readFileSync(path.join(ROOT,'coop/worker/src/ranges.gen.js'),'utf8');const G={};for(const k of ['STAT','MAP'])G[k]=JSON.parse(gen.match(new RegExp('export const '+k+' = (\\{.*\\});'))[1]);
function args(s,i){let d=0,a=[],st=i;for(let j=i;j<s.length;j++){const c=s[j];if('([{'.includes(c))d++;else if(')]}'.includes(c)){if(d===0){a.push(s.slice(st,j));return a}d--}else if(c===','&&d===0){a.push(s.slice(st,j));st=j+1}}return null}
const num=x=>{x=(x||'').trim();if(/^-?\d+(\.\d+)?$/.test(x))return +x;if(/^BAL\.personRange|^BAL\.linkRange|^R\[[01]\]$|^L\[[01]\]$/.test(x))return 'T';return undefined};
const R={};const files=fs.readdirSync(DIR).filter(f=>/^j.*\.js$/.test(f)&&f!=='all.js'&&f!=='jbalpr.js');
for(const f of files){const s=fs.readFileSync(path.join(DIR,f),'utf8');const re=/\.(\w+)(\[[^\]=]{1,40}\])?\s*=\s*(cl|Math\.max|Math\.min)\(/g;let m;
 while((m=re.exec(s))){const a=args(s,m.index+m[0].length);if(!a)continue;let lo,hi;
  if(m[3]==='cl'){if(a.length<3)continue;lo=num(a[a.length-2]);hi=num(a[a.length-1])}
  else if(m[3]==='Math.max'){lo=num(a[0]);const mm=a.slice(1).join(',').match(/^\s*Math\.min\((-?\d+)/);hi=mm?+mm[1]:null}
  else{hi=num(a[0]);const mm=a.slice(1).join(',').match(/^\s*Math\.max\((-?\d+)/);lo=mm?+mm[1]:null}
  if(lo===undefined&&hi===undefined)continue;const k=m[1]+(m[2]?'[]':'');const line=s.slice(0,m.index).split('\n').length;
  (R[k]=R[k]||[]).push({lo:lo===undefined?null:lo,hi:hi===undefined?null:hi,at:f+':'+line})}}
const rows=[];let fail=0;
const look=(k)=>k.endsWith('[]')?[PR.map[k.slice(0,-2)],G.MAP[k.slice(0,-2)]]:[PR.stat[k],G.STAT[k]];
const GS=JSON.parse(gen.match(/export const SUB = (\{.*\});/)[1]),GW=JSON.parse(gen.match(/export const WORLD = (\{.*\});/)[1]);
const extra={};for(const o in PR.sub)for(const f in PR.sub[o])extra[o+'.'+f]=[PR.sub[o][f],(GS[o]||{})[f],f];for(const o in PR.world)for(const f in PR.world[o])extra[o+'.'+f]=[PR.world[o][f],(GW[o]||{})[f],f];
for(const k of [...Object.keys(PR.stat),...Object.keys(PR.map).map(x=>x+'[]'),...Object.keys(extra)]){const [t,w]=extra[k]?extra[k]:look(k);const S=(R[extra[k]?extra[k][2]:k]||[]).filter(x=>!EXEMPT_SITE[x.at]);
 const out=S.filter(x=>(typeof x.lo==='number'&&t[0]!=null&&x.lo<t[0])||(typeof x.hi==='number'&&t[1]!=null&&x.hi>t[1])||(typeof x.lo==='number'&&t[1]!=null&&x.lo>t[1])||(typeof x.hi==='number'&&t[0]!=null&&x.hi<t[0]));
 const same=JSON.stringify(t)===JSON.stringify(w);const rg={};S.forEach(x=>{const r=`${x.lo==null?'·':x.lo}…${x.hi==null?'·':x.hi}`;rg[r]=(rg[r]||0)+1});
 const v=!same?'WORKER≠BAL':out.length?'WIDER':'OK';if(v!=='OK')fail++;
 rows.push(`| ${k} | ${S.length} | ${Object.entries(rg).map(([r,n])=>r+' ×'+n).join(', ')||'—'} | ${JSON.stringify(t)} | ${JSON.stringify(w)} | ${v}${out.length?' '+out.slice(0,3).map(x=>x.at).join(' '):''} |`)}
console.log('| field | game clamp sites | constant bounds at those sites (T = reads the table) | BAL.personRange | Worker ranges.gen.js | verdict |\n|---|---|---|---|---|---|\n'+rows.join('\n'));
const inT=new Set([...Object.keys(PR.stat),...Object.keys(PR.map).map(x=>x+'[]')]);const ALL=process.argv.includes('--all');
const miss=Object.entries(R).filter(([k,S])=>!inT.has(k)&&!EXEMPT_FIELD[k]&&S.filter(x=>typeof x.lo==='number'&&typeof x.hi==='number').length>=(ALL?1:3));
console.log('\nNot in the table, clamped with a constant range at '+(ALL?'≥ 1':'≥ 3')+' sites (hand check: a person field? then add it to BAL.personRange):');
for(const [k,S] of miss){const rg={};S.forEach(x=>{const r=`${x.lo==null?'·':x.lo}…${x.hi==null?'·':x.hi}`;rg[r]=(rg[r]||0)+1});console.log(`- ${k}: ${S.length} sites ${Object.entries(rg).map(([r,n])=>r+' ×'+n).join(', ')} (e.g. ${S[0].at})`)}
console.log('\nHand-checked (not merged as a person\'s number):\n'+Object.entries(EXEMPT_FIELD).map(([k,v])=>`- ${k}: ${v}`).join('\n')+'\n'+Object.entries(EXEMPT_SITE).map(([k,v])=>`- site ${k}: ${v}`).join('\n'));
console.log(`COOP-RANGE ${fail?'FAIL':'PASS'} · ${rows.length} table fields · ${fail} wider / mismatched · ${Object.values(R).reduce((a,S)=>a+S.length,0)} clamp sites read`);process.exit(fail?1:0);
