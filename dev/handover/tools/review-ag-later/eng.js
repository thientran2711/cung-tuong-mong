/* eng: engine-only buổi cost. Seeded Math.random, render/showModal/DOM log stubbed, bot life; N buổi via placeWhere+agFlush+nextBuoi, Q cleared.
   → ms per buổi (total / N) + CDP inclusive time of top functions. usage: node eng.js <index.html> <N> <seed> <out.json> */
const {chromium}=require('playwright');const fs=require('fs');const [,,F,N0,SD,OUT]=process.argv;const N=+N0||120,SEED=+SD||1;
(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.route(u=>/^https?:/.test(u.href),r=>r.abort());
await p.addInitScript(s=>{let x=s;Math.random=()=>{x=(x*1103515245+12345)%2147483648;return x/2147483648}},SEED);
await p.goto('file://'+require('path').resolve(F),{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
await p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;let g=0;do{start();g++}while(isSrv()&&g<30);window.__nlInner=0;window.__bot=1;quiet=false;Q.length=0;try{deal()}catch(e){}
 window.render=render=function(){};window.showModal=showModal=function(){};});
await p.evaluate(()=>{window.__dd={all:0,con:0,srv:0};try{const d0=deedAdd;window.deedAdd=deedAdd=function(q){const r=d0.apply(this,arguments);if(r){__dd.all++;if(q&&q.role)__dd.srv++;else __dd.con++}return r}}catch(e){}});
const stats=()=>p.evaluate(()=>{const g=o=>{try{return o&&o.stat&&o.stat.land||0}catch(e){return 0}};return{agLand:g(window.AG),ag2:g(window.AG2),ag3:g(window.AG3),as:(()=>{try{return Object.values(AS.stat.by||{}).reduce((a,b)=>a+b,0)}catch(e){return 0}})(),deeds:Object.assign({},window.__dd)}});
const run=n=>p.evaluate(n=>{const t=performance.now();let k=0;for(let i=0;i<n&&!S.dead;i++){Q.length=0;S.mg=0;try{placeWhere();if(typeof agFlush==='function')agFlush()}catch(e){}try{nextBuoi()}catch(e){}Q.length=0;k++}return{ms:performance.now()-t,k,dead:!!S.dead,at:[S.turn,S.buoi]}},n);
const cdp=await p.context().newCDPSession(p);const TH=+process.env.THROTTLE||1;if(TH>1)await cdp.send('Emulation.setCPUThrottlingRate',{rate:TH});await run(8);await cdp.send('Profiler.enable');await cdp.send('Profiler.setSamplingInterval',{interval:250});await cdp.send('Profiler.start');
const st0=await stats();const r=await run(N);const st1=await stats();const dlt={};for(const k of ['agLand','ag2','ag3','as'])dlt[k]=st1[k]-st0[k];for(const k of ['all','con','srv'])dlt['deed_'+k]=st1.deeds[k]-st0.deeds[k];const {profile}=await cdp.send('Profiler.stop');
const id2n={},kids={},selfN={};for(const n of profile.nodes){id2n[n.id]=n;kids[n.id]=n.children||[]}for(let i=0;i<profile.samples.length;i++)selfN[profile.samples[i]]=(selfN[profile.samples[i]]||0)+(profile.timeDeltas[i]||0)/1000;
const memo={};const tot=id=>{if(memo[id]!=null)return memo[id];let s=selfN[id]||0;for(const c of kids[id])s+=tot(c);return memo[id]=s};
const incl={},self={};const walk=(id,st)=>{const nm=id2n[id].callFrame.functionName||'(anon)';self[nm]=(self[nm]||0)+(selfN[id]||0);if(!st.has(nm))incl[nm]=(incl[nm]||0)+tot(id);const s2=new Set(st);s2.add(nm);for(const c of kids[id])walk(c,s2)};walk(profile.nodes[0].id,new Set());
const T=o=>Object.entries(o).filter(([k])=>!/^\((idle|program|garbage collector|root)\)/.test(k)).sort((a,b)=>b[1]-a[1]).slice(0,80).map(([k,v])=>[k,Math.round(v)]);
const o={dlt,throttle:TH,msPer:+(r.ms/Math.max(1,r.k)).toFixed(1),k:r.k,dead:r.dead,at:r.at,errs:errs.slice(0,3),incl:T(incl),self:T(self)};fs.writeFileSync(OUT,JSON.stringify(o));console.log(JSON.stringify({dlt,throttle:TH,msPer:o.msPer,k:o.k,dead:o.dead,at:o.at,errs:o.errs}));await b.close()})();
