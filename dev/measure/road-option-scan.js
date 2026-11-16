/* road-option-scan (reviewer road-map-r1): every option of every road chapter (dev/build/jrd_*.js) must have a real loss (cost c, failure loss l with odds, or an ending) — lists FREE GAIN and NO-EFFECT options, digits in text, and road completeness. usage: node dev/measure/road-option-scan.js (from the repo root). Note: options with go (relation/oan) are listed with "go" — check by hand. */
const fs=require('fs');global.ARC67={};global.RTHEME67={};global.BAL={road:{first:5,last:11}};
global.rdK=()=>0;global.rdPrev=()=>"";global.window=global;global.RD97L=[];
const J=fs.readFileSync('dev/build/jroad.js','utf8');const src=J.slice(J.indexOf('const ROAD14'),J.indexOf('function rdOn'));
eval(src+(process.argv.length>2?process.argv.slice(2):fs.readdirSync('dev/build').filter(f=>/^jrd_.*\.js$/.test(f)).map(f=>'dev/build/'+f)).map(f=>fs.readFileSync(f,'utf8')).join('\n')+';global.ROAD14=ROAD14');
/* story tokens {n1} {n2} {v2} are not typed numbers (B2 finding) */
const nd67tok=x=>typeof x==='function'?'':String(x==null?'':x).replace(/\{[a-z]+\d\}/g,'');
let free=[],textOnly=[],n=0,chap=0,noLossCount=0;const typed=[];
for(const [id,a] of Object.entries(ARC67)){chap++;
 for(const [bk,b] of Object.entries(a.B||{})){const O=typeof b.o==='function'?[]:b.o;
  for(const o of O){n++;const cost=o.c&&Object.values(o.c).some(v=>v<0);const odds=o.o!=null;const lossNum=o.l&&Object.keys(o.l).length;
   const endLose=o.e&&(Array.isArray(o.e)?o.e.some(k=>a.E[k]&&a.E[k].k<0||k==='mid'):a.E[o.e]&&a.E[o.e].k<=0);
   const go=!!o.go;const gain=o.w&&Object.values(o.w).some(v=>v>0);
   if(!cost&&!(odds&&(lossNum||o.e))&&!endLose){(gain?free:textOnly).push(`${id}.${bk} «${o.n}» w=${JSON.stringify(o.w||{})} lx=${o.lx||''}${go?' go':''}${odds?' odds':''}`)}
  }}
 for(const k of ['t','g'])if(/\d/.test(nd67tok(a[k]||'')))typed.push(id+'.'+k);
 for(const [bk,b] of Object.entries(a.B||{})){if(/\d/.test(nd67tok(b.t||''))||/\d/.test(nd67tok(b.h||'')))typed.push(id+'.'+bk);(b.o||[]).forEach(o=>{for(const k of['n','rt','rf','wx','lx'])if(/\d|%/.test(nd67tok(o[k]||'')))typed.push(`${id}.${bk}.${k}:${o[k]}`)})}
 for(const [ek,E] of Object.entries(a.E||{}))if(/\d|%/.test(nd67tok(E.t)+nd67tok(E.tag)))typed.push(id+'.E.'+ek)}
console.log('chapters',chap,'options',n);console.log('FREE GAIN (no cost, no numeric loss):',free.length);free.forEach(x=>console.log('  '+x));
console.log('NO COST NO GAIN NO LOSS (text-only):',textOnly.length);textOnly.forEach(x=>console.log('  '+x));
console.log('digits/% in text:',typed);
const R=ROAD14;for(const r in R)console.log(r,Object.keys(R[r]).join(','));
/* climax options must not read A.sc: j67 oOf67 already adds Lợi thế (A.sc*7) to every option with e: or in an x beat */
{let d=[];for(const[id,a]of Object.entries(ARC67))for(const[bk,b]of Object.entries(a.B||{}))for(const o of (typeof b.o==='function'?[]:b.o)){if(typeof o.o==='function'&&/A\.sc\*/.test(o.o.toString())&&(o.e||b.x))d.push(id+'.'+bk+' «'+o.n+'»')}
 console.log('DOUBLE LỢI THẾ (A.sc in a climax option):',d.length);d.forEach(x=>console.log('  '+x))}
