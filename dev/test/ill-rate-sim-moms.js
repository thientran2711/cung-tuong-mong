/* ILLNESS-CURE r5: a copy of Foreman E dev/test/ill-rate-sim.js (review/e-ill-rate 29b0ac00, same seeds / counters) + env MOMS=1 = the NPC mothers buổi kid roads (jagacts2 cx2 kidMed / kidAsk / kidWatch) modelled as one try a month at BAL.illCure.npc. Aggregate with E dev/test/ill-rate-agg2.js. */
/* E-ILL-RATE (Foreman E C10): same-seed headless illness death-rate sim. MEASURES only (no game change).
   usage: node dev/test/ill-rate-sim.js <rootA> <rootB> <out.json> [seeds=10] [years=3] [policies=idle,best]
   Each root = a checkout with a built root index.html. Per build, per origin (every ORIGINS key + every ORIGIN_BR branch; bd rolled per road
   bd_san / bd_soi / bd_tuyet / bd_hen), per seed: Math.random = mulberry32(seed), __forceOrigin, start(), then monthTick() × 12·years
   (dialog queue cleared each month = no player action). Policy "best": before every month, while she is ill (not the jmort omen), she takes the
   best cure road she can pay once per tuần (3 a month): A = Truyền thái y (bạc 40) else Tĩnh dưỡng (+ Tự bốc thuốc if Y ≥ 3, as A's illCards);
   B = jillcure bestWay (ty · cau · vien · rest, same prices) — the cost is paid with ap().
   Instrumentation (black box, same on both builds): before/after each month every person's ill state + alive; groups consort (rivals) ·
   maid (cung nữ: staff + her maid) · eunuch (staff role eunuch) · kid · emp · th (S.thIll / thDead). An illness DEATH = a person ill at the month
   start (or who fell ill that month) who is dead / gone after it; a CURE = ill → well and alive. Heroine: die() is wrapped to read the cause. */
require('./lib/bigpage');const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const [RA,RB,OUT]=[process.argv[2],process.argv[3],process.argv[4]];const SEEDS=+process.argv[5]||10,YEARS=+process.argv[6]||3;
const POL=(process.argv[7]||'idle,best').split(',');const ONLY=process.env.ONLY?process.env.ONLY.split(','):null;
async function runBuild(b,root,tag){const ctx=await b.newContext({viewport:{width:1000,height:755},reducedMotion:'reduce'});
 await ctx.route('http://ts.local/**',r=>{const u=decodeURIComponent(new URL(r.request().url()).pathname);const f=path.join(root,u);
  if(!fs.existsSync(f)||fs.statSync(f).isDirectory())return r.fulfill({status:404,body:''});
  r.fulfill({status:200,contentType:/\.html$/.test(f)?'text/html; charset=utf-8':/\.json$/.test(f)?'application/json':'application/octet-stream',body:fs.readFileSync(f)})});
 await ctx.route(/^https?:\/\/(?!ts\.local|127\.0\.0\.1)/,r=>/image|media|font/.test(r.request().resourceType())?r.abort():r.continue());
 const page=await ctx.newPage();const errs=[];page.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await page.goto('http://ts.local/index.html',{waitUntil:'domcontentloaded',timeout:180000});await page.waitForFunction(()=>typeof start==='function'&&typeof monthTick==='function',null,{timeout:180000});await page.waitForTimeout(2000);
 const origins=await page.evaluate(()=>{const L=ORIGINS.map(o=>o.k).concat(Object.keys(ORIGIN_BR));return [...new Set(L)]});
 const jobs=[];for(const o of origins){const roads=o==='bd'?['','bd_san']:[''];for(const rd of roads){const id=rd||o;if(ONLY&&!ONLY.includes(id))continue;for(const pol of POL)for(let s=1;s<=SEEDS;s++)jobs.push({o,rd,pol,seed:s*7919+13,moms:!!process.env.MOMS})}}
 const res=[];let n=0;
 for(const j of jobs){const r=await page.evaluate(([j,YEARS])=>{
  const mb=a=>function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};
  const R0=Math.random;let tries=0,ok=false;
  for(;tries<40&&!ok;tries++){Math.random=mb(j.seed+tries*100003);window.__forceOrigin=j.o;window.__MOMS=!!j.moms;try{try{localStorage.clear()}catch(e){}SLOT=3;try{store.set(NL_KEY,null)}catch(e){}start()}catch(e){return{err:'start '+String(e).slice(0,120)}}
   try{Q.length=0}catch(e){}ok=!j.rd||(S.st&&S.st.f14&&S.st.f14.road===j.rd)}
  if(!ok)return{err:'road not rolled '+j.rd};
  const out={o:j.o,rd:j.rd||(S.st&&S.st.f14&&S.st.f14.road)||'',pol:j.pol,seed:j.seed,age0:S.age,suc0:S.suc,bac0:S.bac,rank0:S.rank,me:null,g:{},months:0,meIll:[],treats:0};
  let why=null;const d0=window.die;window.die=function(m){if(!why)why={m:String(m),y:S.year,mo:S.month,age:S.age,ill:illOf(S)?{k:S.ill.k,st:S.ill.st,mort:!!S.ill.mort}:null,turn:S.turn};return d0.apply(this,arguments)};
  const G=(k)=>out.g[k]||(out.g[k]={cases:0,cures:0,deaths:0,illMo:0,deathK:{},illMo2:0,cures2:0,dS:0,gone:0,kAll:0});
  const people=()=>{const L=[];for(const p of KIT_FACEFX.everyone()){if(!p||p===S)continue;let k=KIT_FACEFX.kind(p);if(k==='thaihau'||k==='player')continue;if(k==='cold')k='consort';if(!KIT_FACEFX.live(p))continue;L.push([p,k])}
   const seen=new Set();return L.filter(([p])=>!seen.has(p)&&seen.add(p))};
  const iso=p=>{const i=typeof illOf==='function'&&illOf(p);return i&&!i.mort?{k:i.k,st:i.st}:null};
  const bestA=()=>{if(S.bac>=40)return['ty',{bac:-40}];if(S.arts&&S.arts.y>=3&&S.suc>=5)return['self',{suc:-5}];return['rest',{}]};
  const best=()=>{try{if(window.IC&&IC.bestWay)return IC.bestWay(S)}catch(e){}return bestA()};
  const M=12*YEARS;
  for(let m=0;m<M&&!S.dead;m++){
   const meI=iso(S);
   if(j.pol==='best'){for(let t=0;t<3&&!S.dead;t++){const i=illOf(S);if(!i||i.mort)break;const [w,c]=best();try{ap(S,c)}catch(e){}try{treat(S,w)}catch(e){}out.treats++}}
   if(window.__MOMS){for(const v of (rivals||[]))if(v&&v.alive!==false&&!v.dead&&(v.kids||[]).some(k=>k.alive&&(k.kIll||illOf(k)))&&roll(BAL.illCure?BAL.illCure.npc:60)){for(const a of ['cx2:kidMed','cx2:kidAsk','cx2:kidWatch']){try{if(AGRUN[a]&&AGRUN[a](v))break}catch(e){}}}}/* ILLNESS-CURE r5: MOMS=1 models the NPC mothers' buổi kid roads (jagacts2) as one try a month at BAL.illCure.npc */
   const P=people();const pre=P.map(([p,g])=>[p,g,iso(p),p.alive!==false&&!p.dead]);
   const thI=S.thIll&&!S.thIll.mort&&!S.thDead?{k:S.thIll.k,st:S.thIll.st}:null,thD=!!S.thDead;
   try{monthTick()}catch(e){out.err='month '+String(e).slice(0,120);break}try{Q.length=0}catch(e){}
   const now=new Set(people().map(x=>x[0]));
   for(const [p,g,i0,a0] of pre){if(!a0)continue;if(g==='kid'&&(p.alive===false||p.dead))G('kid').kAll++;const i1=iso(p);const a1=p.alive!==false&&!p.dead&&now.has(p);const X=G(g);
    if(i0){X.illMo++;if(i0.st>=2)X.illMo2++;if(!a1){X.deaths++;X.deathK[i0.k]=(X.deathK[i0.k]||0)+1;if(i0.st>=2&&ILL[i0.k].die>0&&(p.alive===false||p.dead||!KIT_FACEFX.everyone().includes(p)))X.dS++;else X.gone++}else if(!i1){X.cures++;if(i0.st>=2)X.cures2++}}
    else if(i1){X.cases++}
    else if(!a1&&p.ill&&!p.ill.mort){X.cases++;X.deaths++;X.deathK[p.ill.k]=(X.deathK[p.ill.k]||0)+1}}
   /* new people this month who are ill (kids born ill etc.) are ignored */
   {const X=G('th');if(thI){X.illMo++;if(S.thDead&&!thD){X.deaths++}else if(!S.thIll)X.cures++}else if(!thD&&S.thIll&&!S.thIll.mort)X.cases++}
   {const X=G('me');const i1=iso(S);if(meI){X.illMo++;if(meI.st>=2)X.illMo2++;if(!S.dead&&!i1&&meI.st>=2)X.cures2++;out.meIll.push(m+':'+meI.k+meI.st);if(S.dead){X.deaths++}else if(!i1)X.cures++}else if(i1)X.cases++;
    if(S.dead&&!meI&&i1){X.cases++;X.deaths++}}
   out.months=m+1}
  window.die=d0;Math.random=R0;
  out.me={dead:!!S.dead,why,yearEnd:S.year,ageEnd:S.age,fate:S.fate||''};
  out.meIll=out.meIll.slice(0,40).join(' ');return out},[j,YEARS]);
  res.push(Object.assign({build:tag},r));n++;if(n%20===0)console.log(tag,n,'/',jobs.length,errs.length?'errs '+errs.length:'')}
 await ctx.close();return {res,errs:errs.slice(0,20),origins}}
(async()=>{const b=await chromium.launch();const A=await runBuild(b,RA,'A');const B=await runBuild(b,RB,'B');await b.close();
 fs.writeFileSync(OUT,JSON.stringify({A,B,SEEDS,YEARS,POL},null,0));console.log('wrote',OUT)})();
