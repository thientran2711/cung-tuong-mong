/* NPC-PURPOSE RATE GATE (review/npc-purpose FAIL items 1-8, rates review 18/11). The owner's rule (OD 18/11 ~04:08Z) says every NPC deed
   needs a reason; it does not say events may vanish. This gate keeps both: a seeded bot plays N tuần per seed (the reviewer's evbot counting:
   nextBuoi loop, every card closed by a seeded pick, fresh life on death) and counts NPW.stat fires per kind, card titles and log-line heads.
   Checks (numbers + reasons in dev/test/npc-purpose-rates.json):
   1 every registered kind (NPW.reg) fires ≥ 1 over all seeds, unless "rare": {kind: written reason}
   2 every tracked event (the review's table + the card spread) stays inside its band: (head + 1) / (base + 1) in [lo, hi] (band per row or the
     default "band"; per:"srv" rows scale base by the maid-road tuần of each run, the others by the tuần lived as a consort); rows with base + head < "minN" are reported, not judged (too few to tell)
   3 no page error
   4 EVERY card title and EVERY name-stripped log head with base + head ≥ minN (not a hand-picked list): 0 ↔ many fails; ratio outside bandAll / bandSmall fails unless json why has a written reason
   Base counts are committed in the json ("base", from the build without npc-purpose) so the gate runs without the base build.
   usage: node dev/test/npc-purpose-rates.js <index.html> [tuần=200] [seeds=12] [--base <base index.html>] [--write-base]
     --base <f>      also run the base build (same seeds) and judge against it instead of the committed counts
     --write-base    with --base: store the base counts in the json (then commit it)
   exit 0 = PASS */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const A=process.argv.slice(2);const fl=k=>{const i=A.indexOf(k);if(i<0)return null;const v=A[i+1];A.splice(i,2);return v};
const writeBase=A.includes('--write-base');if(writeBase)A.splice(A.indexOf('--write-base'),1);const BASE=fl('--base');
const F=A[0]||'index.html';const WK=+A[1]||200;const NS=+A[2]||12;const JP=path.join(__dirname,'npc-purpose-rates.json');const J=JSON.parse(fs.readFileSync(JP,'utf8'));
const url=f=>/^(https?|file):/.test(f)?f:'file://'+path.resolve(f);
/* one seeded life-run (copy of the reviewer's evbot.js counting) */
async function run1(b,file,seed){const ctx=await b.newContext({viewport:{width:390,height:844},serviceWorkers:'block'});
 await ctx.addInitScript(sd=>{let s=sd;Math.random=()=>{s|=0;s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};window.__reseed=()=>{s=sd};try{const g=crypto.getRandomValues.bind(crypto);crypto.getRandomValues=a=>{if(a&&a.length!=null&&!(a instanceof Float32Array)){const m=Math.pow(2,8*(a.BYTES_PER_ELEMENT||1));for(let i=0;i<a.length;i++)a[i]=Math.floor(Math.random()*m);return a}return g(a)}}catch(e){}/* j52 nlSeed / j67 rnd67 draw from crypto: seeded too */let pk=0;performance.now=()=>(pk+=0.05);/* the same seed gives the same life: reseed right before the first life (load-time timers draw a varying number of randoms), clock fixed */let tk=1.7e12;const D0=Date;window.__clock=()=>{tk=1.7e12;Date.now=()=>(tk+=7)};window.__bot={pre:1}},seed);
 await ctx.route(/\.(webp|png|jpe?g|mp3|ogg|m4a|mp4|webm)(\?|$)/i,r=>r.abort());
 const p=await ctx.newPage();p.setDefaultTimeout(0);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await p.goto(url(file),{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function',null,{timeout:0});await p.waitForTimeout(1500);
 const r=await p.evaluate(W=>{const strip=x=>String(x).replace(/<[^>]+>/g,'');const norm=x=>strip(x).replace(/\d+/g,'#').trim().slice(0,60);
  try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;
  window.popNum=()=>{};window.curtain=()=>{};window.fx=()=>{};window.save=()=>{};window.renderHUD=()=>{};window.renderStage=()=>{};window.renderPanel=()=>{};window.render=()=>{};
  const cards={},cardR={},logs={},lgs={},lgx={};const srvNow=()=>{try{return typeof isSrv==='function'&&!!isSrv()}catch(e){return false}};let weeks=0,lives=0,lastSeq=0,err=0,srvW=0,conW=0;
  const newLife=()=>{lives++;window.__nlInner=1;start();window.__nlInner=0;quiet=false;try{deal()}catch(e){}lastSeq=S.logSeq||0};
  window.__clock();window.__reseed();newLife();const seen=new WeakSet();
  const drain=()=>{let n=0;while(Q.length&&n++<60){const m=Q[0];if(!seen.has(m)){seen.add(m);const k=norm(m.t||'(no title)');cards[k]=(cards[k]||0)+1;const ck=(srvNow()?'[cung nữ] ':'')+k;cardR[ck]=(cardR[ck]||0)+1}
    if(m.opts&&m.opts.length){const ok=m.opts.map((c,i)=>i).filter(i=>{const c=m.opts[i];return !c.off&&!(c.fx&&c.fx.bac&&S.bac+c.fx.bac<0)});
     if(!ok.length){Q.shift();continue}const i=ok[Math.floor(Math.random()*ok.length)];try{chooseM(i)}catch(e){err++;Q.shift()}if(Q[0]===m)Q.shift()}else Q.shift();if(S.dead)break}};
  while(weeks<W){if(S.dead){newLife();continue}drain();if(S.dead)continue;S.mg=null;const w0=(S.year*12+S.month)*3+S.tuan;let g=0;
   while(!S.dead&&(S.year*12+S.month)*3+S.tuan===w0&&g++<12){drain();if(S.dead)break;S.mg=null;try{nextBuoi()}catch(e){err++;Q.length=0}}weeks++;try{if(typeof isSrv==="function"&&isSrv())srvW++;else if(!S.out&&!S.dead)conW++}catch(e){}drain();
   const sq=S.logSeq||0;const nn=Math.min(sq-lastSeq,(S.logs||[]).length);for(let i=0;i<nn;i++){const raw=norm(String(S.logs[i]).replace(/<span class="ld">.*?<\/span>/,''));const k=raw.split(/[.:;,]/)[0].split(' ').slice(0,5).join(' ');logs[k]=(logs[k]||0)+1;const ks=raw.split(/[.:;,]/)[0].split(/\s+/).filter((w,i,a)=>w&&!/^[\p{Lu}]/u.test(w)&&!(i>0&&/^[\p{Lu}]/u.test(a[i-1]))).slice(0,5).join(' ')||'(names only)';/* names dropped = every capitalised word and the word right after one (ranks: Đáp ứng, Thường tại, Quý nhân, Uyển tần, Thái y) */const kr=(srvNow()?'[cung nữ] ':'')+ks;lgs[kr]=(lgs[kr]||0)+1;if(!lgx[kr])lgx[kr]=raw.slice(0,50)}lastSeq=sq}
  return {ea:(typeof EA_N!=='undefined'&&EA_N.npcExt?{...EA_N.npcExt}:{}),weeks,lives,err,srvW,conW,cards,cardR,logs,lgs,lgx,npw:(typeof NPW!=='undefined'?NPW.stat:null),reg:(typeof NPW!=='undefined'?Object.keys(NPW.reg):[])}},WK);
 r.pageErr=errs;await ctx.close();return r}
async function runAll(b,file,S0){S0=S0||0;const seeds=Array.from({length:NS},(_,i)=>i+1+S0);const out=[];let i=0;
 await Promise.all(Array.from({length:Math.min(+(process.env.RATES_PAR||4),NS)},async()=>{while(i<seeds.length){const s=seeds[i++];out.push(await run1(b,file,s))}}));return out}
/* tracked events: card titles (c), log heads (l) or NPC outburst events EA_N.npcExt kind:feeling (e) matching re; log heads count the same with or without the names in them */
function count(R){const t={_srvWeeks:R.reduce((a,r)=>a+(r.srvW||0),0),_conWeeks:R.reduce((a,r)=>a+(r.conW||0),0)};for(const row of J.track){const re=new RegExp(row.re);let n=0;for(const r of R){const o=row.f==='c'?r.cards:row.f==='e'?(r.ea||{}):r.logs;for(const k in o)if(re.test(k))n+=o[k]}t[row.n]=n}return t}
(async()=>{const b=await chromium.launch();const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+(typeof x==='string'?x:JSON.stringify(x)):''))};
 const H=await runAll(b,F,+(process.env.RATES_SEED0||0));if(process.env.RATES_DUMP)fs.writeFileSync(process.env.RATES_DUMP,JSON.stringify(H));let BC=J.base||{};
 let Bs=null;if(BASE){Bs=await runAll(b,BASE,+(process.env.RATES_BSEED0||process.env.RATES_SEED0||0));/* RATES_BSEED0: other seeds for the base = the noise floor of one build */BC=count(Bs);if(writeBase){J.base=BC;J.baseInfo=`${NS} seeds × ${WK} tuần, ${path.basename(path.dirname(path.resolve(BASE)))}/${path.basename(BASE)}`;fs.writeFileSync(JP,JSON.stringify(J,null,1)+'\n');console.log('base counts written to',JP)}}
 await b.close();
 const errs=[].concat(...H.map(r=>r.pageErr));ok(!errs.length,'no page error ('+NS+' seeds × '+WK+' tuần)',errs.slice(0,3));
 /* 1 every kind fires */
 const fire={},asks={};for(const r of H)for(const k in (r.npw||{})){const s=r.npw[k];fire[k]=(fire[k]||0)+(s.fire||0);asks[k]=(asks[k]||0)+(s.fire||0)+(s.quiet||0)+(s.cd||0)+(s.miss||0)}
 const reg=[...new Set([].concat(...H.map(r=>r.reg)))].sort();const rare=J.rare||{};
 const dead=reg.filter(k=>!(fire[k]>0)&&!rare[k]);ok(!dead.length,`every registered kind fires ≥ 1 (${reg.length} kinds; ${Object.keys(rare).length} listed rare with a reason)`,dead.map(k=>k+' 0/'+(asks[k]||0)).join(' '));
 const rareFired=Object.keys(rare).filter(k=>fire[k]>0);if(rareFired.length)console.log('note: kinds listed rare that fired this run: '+rareFired.map(k=>k+' '+fire[k]).join(' '));
 const stale=Object.keys(rare).filter(k=>!reg.includes(k));ok(!stale.length,'every "rare" entry is a registered kind',stale);
 /* 2 tracked events inside their band */
 const HC=count(H);const D=J.band||[.4,2.5];const minN=J.minN||8;console.log('event | base | head | ratio (per tuần on its road) | band   (maid-road tuần base/head: '+(BC._srvWeeks||0)+'/'+HC._srvWeeks+')');
 for(const row of J.track){const bb=BC[row.n]||0,h=HC[row.n]||0;/* per:"srv" = a maid-road event: judged per tuần spent on the cung nữ road (seed paths decide how long a life stays there) */
  const tw=NS*WK,sw=row.per==="srv"?Math.max(1,HC._srvWeeks||0)/Math.max(1,BC._srvWeeks||0):Math.max(1,tw-(HC._srvWeeks||0))/Math.max(1,tw-(BC._srvWeeks||0));/* every other row: per tuần lived as a consort (a seed may spend its life on the maid road in one build and not the other) */const r=(h+1)/(bb*sw+1);const [lo,hi]=row.band||D;const judged=bb+h>=minN&&!row.report;
  const line=`${row.n} | ${bb} | ${h} | ${r.toFixed(2)} | ${lo}–${hi}${judged?'':row.report?' (reported, not judged: see json why)':' (too few, not judged)'}`;if(!judged){console.log('    '+line);continue}ok(r>=lo&&r<=hi,line)}
 /* 4 EVERY card title (c:) and EVERY name-stripped log head (l:, capitalised words = names dropped, first 5 words before . : ; ,) with base + head ≥ minN:
    0 ↔ many (one side 0, the other ≥ zeroN) fails; otherwise (head + 1) / (base × consort-tuần scale + 1) must sit in the band of its size tier (json tiers [[minN,[lo,hi]],…]: set from the noise floor = the same build on seeds 1-12 vs 13-24, RATES_BSEED0=12).
    Rows seen while she is on the maid road carry '[cung nữ] ' and are scaled by maid-road tuần. A row whose larger side comes ≥ oneSeed (0.6) from ONE seed is a seed-path row (reported, not judged). A row outside needs a written reason in json "why" {"c:<title>"|"l:<head>": reason} (kept shift, explained); a "why" entry no row needs any more is reported stale. */
 const sum=(R,f)=>{const o={};for(const r of R)for(const k in (r[f]||{}))o[k]=(o[k]||0)+r[f][k];return o};const mx=(R,f)=>{const o={};for(const r of R)for(const k in (r[f]||{}))o[k]=Math.max(o[k]||0,r[f][k]);return o};const ex={};for(const r of H)for(const k in (r.lgx||{}))ex[k]=ex[k]||r.lgx[k];
 const HA={c:sum(H,'cardR'),l:sum(H,'lgs')},HM={c:mx(H,'cardR'),l:mx(H,'lgs')};let BA=J.baseAll||{c:{},l:{}};if(BASE){BA={c:sum(Bs,'cardR'),l:sum(Bs,'lgs'),m:{c:mx(Bs,'cardR'),l:mx(Bs,'lgs')},x:{}};for(const r of Bs)for(const k in (r.lgx||{}))BA.x[k]=BA.x[k]||r.lgx[k];if(writeBase){J.baseAll=BA;fs.writeFileSync(JP,JSON.stringify(J,null,1)+'\n')}}
 const tw=NS*WK,swA=1;/* the rest: same seeds × same tuần, no scale (NPC-world events run whatever her own road; her own-life events that follow her consort tuần are explained in json why with the probe numbers) */const mA=J.minN||8,tiers=J.tiers||[[8,[.1,10]],[20,[.2,5]],[40,[.33,3]]],zN=J.zeroN||10;const why=J.why||{};let nAll=0,nWhy=0,nSeed=0,nSrv=0;const bad=[],used=new Set();
 for(const f of ['c','l']){const keys=new Set([...Object.keys(HA[f]),...Object.keys(BA[f]||{})]);for(const k of keys){const b0=(BA[f]||{})[k]||0,h=HA[f][k]||0;if(b0+h<mA)continue;nAll++;
  const big=h>=b0?h:b0,bigM=h>=b0?(HM[f][k]||0):((BA.m||{})[f]||{})[k]||0;if(bigM>=big*(J.oneSeed||.6)){nSeed++;continue}/* seed path: most of the larger side comes from ONE life (a seed's story differs between builds once any roll moves) → reported in the count, not judged */
  if(k.startsWith('[cung nữ] ')&&Math.min(HC._srvWeeks||0,BC._srvWeeks||0)<(J.srvMin||300)){nSrv++;continue}/* maid road too short in one build to tell a rate */
  const sc=k.startsWith('[cung nữ] ')?Math.max(1,HC._srvWeeks||0)/Math.max(1,BC._srvWeeks||0):swA;/* '[cung nữ] ' rows = seen while she is on the maid road: scaled by maid-road tuần, the rest by consort tuần */const r=(h+1)/(b0*sc+1);let lo=0,hi=1e9;for(const [n0,bd] of tiers)if(b0+h>=n0){lo=bd[0];hi=bd[1]}const zero=(b0===0||h===0)&&big>=zN;const out=zero||r<lo||r>hi;if(!out)continue;const id=f+':'+k;const xs=f==='l'?' «'+(ex[k]||(BA.x||{})[k]||'')+'»':'';
  if(why[id]){used.add(id);nWhy++;console.log(`    kept ${id} | ${b0} → ${h} | ${r.toFixed(2)}${xs} — ${why[id]}`);continue}bad.push(`${id} | ${b0} → ${h} | ${r.toFixed(2)}${zero?' (0 ↔ many)':''}${xs}`)}}
 console.log(`consort tuần base/head ${BC._conWeeks}/${HC._conWeeks}, maid-road ${BC._srvWeeks}/${HC._srvWeeks}`);console.log(`all events: ${nAll} rows with base+head ≥ ${mA} (cards + name-stripped log heads; ${nSeed} one-seed rows, ${nSrv} maid-road rows with < srvMin maid tuần in one build: not judged); ${nWhy} out of band kept with a reason; ${bad.length} unexplained`);for(const x of bad)console.log('    OUT '+x);
 ok(!bad.length,'every card title and log head stays inside its band (or has a written reason in json why)',bad.length+' rows');
 const staleW=Object.keys(why).filter(k=>!used.has(k));if(staleW.length)console.log('note: why entries no row needs now: '+staleW.join(' | '));
 const nf=res.filter(x=>!x).length;console.log(nf?`FAIL npc-purpose-rates: ${nf} check(s)`:'PASS npc-purpose-rates');process.exit(nf?1:0)})().catch(e=>{console.error(e);process.exit(1)});
