/* NPC-PURPOSE RATE GATE (review/npc-purpose FAIL items 1-8, rates review 18/11). The owner's rule (OD 18/11 ~04:08Z) says every NPC deed
   needs a reason; it does not say events may vanish. This gate keeps both: a seeded bot plays N tuần per seed (the reviewer's evbot counting:
   nextBuoi loop, every card closed by a seeded pick, fresh life on death) and counts NPW.stat fires per kind, card titles and log-line heads.
   Checks (numbers + reasons in dev/test/npc-purpose-rates.json):
   1 every registered kind (NPW.reg) fires ≥ 1 over all seeds, unless "rare": {kind: written reason}
   2 every tracked event (the review's table + the card spread) stays inside its band: (head + 1) / (base + 1) in [lo, hi] (band per row or the
     default "band"; per:"srv" rows scale base by the maid-road tuần of each run); rows with base + head < "minN" are reported, not judged (too few to tell)
   3 no page error
   Base counts are committed in the json ("base", from the build without npc-purpose) so the gate runs without the base build.
   usage: node dev/test/npc-purpose-rates.js <index.html> [tuần=200] [seeds=5] [--base <base index.html>] [--write-base]
     --base <f>      also run the base build (same seeds) and judge against it instead of the committed counts
     --write-base    with --base: store the base counts in the json (then commit it)
   exit 0 = PASS */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const A=process.argv.slice(2);const fl=k=>{const i=A.indexOf(k);if(i<0)return null;const v=A[i+1];A.splice(i,2);return v};
const writeBase=A.includes('--write-base');if(writeBase)A.splice(A.indexOf('--write-base'),1);const BASE=fl('--base');
const F=A[0]||'index.html';const WK=+A[1]||200;const NS=+A[2]||5;const JP=path.join(__dirname,'npc-purpose-rates.json');const J=JSON.parse(fs.readFileSync(JP,'utf8'));
const url=f=>/^(https?|file):/.test(f)?f:'file://'+path.resolve(f);
/* one seeded life-run (copy of the reviewer's evbot.js counting) */
async function run1(b,file,seed){const ctx=await b.newContext({viewport:{width:390,height:844},serviceWorkers:'block'});
 await ctx.addInitScript(sd=>{let s=sd;Math.random=()=>{s|=0;s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};window.__bot={pre:1}},seed);
 await ctx.route(/\.(webp|png|jpe?g|mp3|ogg|m4a|mp4|webm)(\?|$)/i,r=>r.abort());
 const p=await ctx.newPage();p.setDefaultTimeout(0);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await p.goto(url(file),{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function',null,{timeout:0});await p.waitForTimeout(1500);
 const r=await p.evaluate(W=>{const strip=x=>String(x).replace(/<[^>]+>/g,'');const norm=x=>strip(x).replace(/\d+/g,'#').trim().slice(0,60);
  try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;
  window.popNum=()=>{};window.curtain=()=>{};window.fx=()=>{};window.save=()=>{};window.renderHUD=()=>{};window.renderStage=()=>{};window.renderPanel=()=>{};window.render=()=>{};
  const cards={},logs={};let weeks=0,lives=0,lastSeq=0,err=0,srvW=0;
  const newLife=()=>{lives++;window.__nlInner=1;start();window.__nlInner=0;quiet=false;try{deal()}catch(e){}lastSeq=S.logSeq||0};
  newLife();const seen=new WeakSet();
  const drain=()=>{let n=0;while(Q.length&&n++<60){const m=Q[0];if(!seen.has(m)){seen.add(m);const k=norm(m.t||'(no title)');cards[k]=(cards[k]||0)+1}
    if(m.opts&&m.opts.length){const ok=m.opts.map((c,i)=>i).filter(i=>{const c=m.opts[i];return !c.off&&!(c.fx&&c.fx.bac&&S.bac+c.fx.bac<0)});
     if(!ok.length){Q.shift();continue}const i=ok[Math.floor(Math.random()*ok.length)];try{chooseM(i)}catch(e){err++;Q.shift()}if(Q[0]===m)Q.shift()}else Q.shift();if(S.dead)break}};
  while(weeks<W){if(S.dead){newLife();continue}drain();if(S.dead)continue;S.mg=null;const w0=(S.year*12+S.month)*3+S.tuan;let g=0;
   while(!S.dead&&(S.year*12+S.month)*3+S.tuan===w0&&g++<12){drain();if(S.dead)break;S.mg=null;try{nextBuoi()}catch(e){err++;Q.length=0}}weeks++;try{if(typeof isSrv==="function"&&isSrv())srvW++}catch(e){}drain();
   const sq=S.logSeq||0;const nn=Math.min(sq-lastSeq,(S.logs||[]).length);for(let i=0;i<nn;i++){const k=norm(String(S.logs[i]).replace(/<span class="ld">.*?<\/span>/,'')).split(/[.:;,]/)[0].split(' ').slice(0,5).join(' ');logs[k]=(logs[k]||0)+1}lastSeq=sq}
  return {weeks,lives,err,srvW,cards,logs,npw:(typeof NPW!=='undefined'?NPW.stat:null),reg:(typeof NPW!=='undefined'?Object.keys(NPW.reg):[])}},WK);
 r.pageErr=errs;await ctx.close();return r}
async function runAll(b,file){const seeds=Array.from({length:NS},(_,i)=>i+1);const out=[];let i=0;
 await Promise.all(Array.from({length:Math.min(4,NS)},async()=>{while(i<seeds.length){const s=seeds[i++];out.push(await run1(b,file,s))}}));return out}
/* tracked events: card titles (c) or log heads (l) matching re; log heads count the same with or without the names in them */
function count(R){const t={_srvWeeks:R.reduce((a,r)=>a+(r.srvW||0),0)};for(const row of J.track){const re=new RegExp(row.re);let n=0;for(const r of R){const o=row.f==='c'?r.cards:r.logs;for(const k in o)if(re.test(k))n+=o[k]}t[row.n]=n}return t}
(async()=>{const b=await chromium.launch();const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+(typeof x==='string'?x:JSON.stringify(x)):''))};
 const H=await runAll(b,F);let BC=J.base||{};
 if(BASE){const Bs=await runAll(b,BASE);BC=count(Bs);if(writeBase){J.base=BC;J.baseInfo=`${NS} seeds × ${WK} tuần, ${path.basename(path.dirname(path.resolve(BASE)))}/${path.basename(BASE)}`;fs.writeFileSync(JP,JSON.stringify(J,null,1)+'\n');console.log('base counts written to',JP)}}
 await b.close();
 const errs=[].concat(...H.map(r=>r.pageErr));ok(!errs.length,'no page error ('+NS+' seeds × '+WK+' tuần)',errs.slice(0,3));
 /* 1 every kind fires */
 const fire={},asks={};for(const r of H)for(const k in (r.npw||{})){const s=r.npw[k];fire[k]=(fire[k]||0)+(s.fire||0);asks[k]=(asks[k]||0)+(s.fire||0)+(s.quiet||0)+(s.cd||0)+(s.miss||0)}
 const reg=[...new Set([].concat(...H.map(r=>r.reg)))].sort();const rare=J.rare||{};
 const dead=reg.filter(k=>!(fire[k]>0)&&!rare[k]);ok(!dead.length,`every registered kind fires ≥ 1 (${reg.length} kinds; ${Object.keys(rare).length} listed rare with a reason)`,dead.map(k=>k+' 0/'+(asks[k]||0)).join(' '));
 const rareFired=Object.keys(rare).filter(k=>fire[k]>0);if(rareFired.length)console.log('note: kinds listed rare that fired this run: '+rareFired.map(k=>k+' '+fire[k]).join(' '));
 const stale=Object.keys(rare).filter(k=>!reg.includes(k));ok(!stale.length,'every "rare" entry is a registered kind',stale);
 /* 2 tracked events inside their band */
 const HC=count(H);const D=J.band||[.4,2.5];const minN=J.minN||8;console.log('event | base | head | ratio | band   (maid-road tuần base/head: '+(BC._srvWeeks||0)+'/'+HC._srvWeeks+')');
 for(const row of J.track){const bb=BC[row.n]||0,h=HC[row.n]||0;/* per:"srv" = a maid-road event: judged per tuần spent on the cung nữ road (seed paths decide how long a life stays there) */
  const sw=row.per==="srv"?Math.max(1,HC._srvWeeks||0)/Math.max(1,BC._srvWeeks||0):1;const r=(h+1)/(bb*sw+1);const [lo,hi]=row.band||D;const judged=bb+h>=minN;
  const line=`${row.n} | ${bb} | ${h} | ${r.toFixed(2)} | ${lo}–${hi}${judged?'':' (too few, not judged)'}`;if(!judged){console.log('    '+line);continue}ok(r>=lo&&r<=hi,line)}
 const nf=res.filter(x=>!x).length;console.log(nf?`FAIL npc-purpose-rates: ${nf} check(s)`:'PASS npc-purpose-rates');process.exit(nf?1:0)})().catch(e=>{console.error(e);process.exit(1)});
