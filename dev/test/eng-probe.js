/* eng-probe (review ag-later #2): ENGINE-only cost per buổi. Seeded Math.random, render/showModal stubbed, bot life; N buổi via placeWhere + agFlush + nextBuoi (Q cleared);
   prints ms per buổi + writes CDP inclusive/self ms of the top functions. Compare a branch with live main, alternating runs, same seeds (e.g. 1 2 3, N 80 and 160).
   usage: python3 dev/build/assemble.py && node dev/test/eng-probe.js dev/index.html <N> <seed> <out.json>   (perf rule: > +10 % vs live = FAIL) */
const {chromium}=require('./lib/dlgs-off').pw('tap');/* play bot: a side-line dialogue scene is tapped through like a player (lib/dlgs-off.js) */const fs=require('fs');const [,,F,N0,SD,OUT]=process.argv;const N=+N0||120,SEED=+SD||1;
(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.route(u=>/^https?:/.test(u.href),r=>r.abort());
await p.addInitScript(s=>{let x=s;Math.random=()=>{x=(x*1103515245+12345)%2147483648;return x/2147483648}},SEED);
await p.goto('file://'+require('path').resolve(F),{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
await p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;let g=0;do{start();g++}while(isSrv()&&g<30);window.__nlInner=0;window.__bot=1;quiet=false;Q.length=0;try{deal()}catch(e){}
 window.render=render=function(){};window.showModal=showModal=function(){};});
const run=n=>p.evaluate(n=>{const t=performance.now();let k=0;for(let i=0;i<n&&!S.dead;i++){Q.length=0;S.mg=0;try{placeWhere();if(typeof agFlush==='function')agFlush()}catch(e){}try{nextBuoi()}catch(e){}Q.length=0;k++}return{ms:performance.now()-t,k,dead:!!S.dead,at:[S.turn,S.buoi]}},n);
await run(8);const cdp=await p.context().newCDPSession(p);await cdp.send('Profiler.enable');await cdp.send('Profiler.setSamplingInterval',{interval:250});await cdp.send('Profiler.start');
const r=await run(N);const {profile}=await cdp.send('Profiler.stop');
const id2n={},kids={},selfN={};for(const n of profile.nodes){id2n[n.id]=n;kids[n.id]=n.children||[]}for(let i=0;i<profile.samples.length;i++)selfN[profile.samples[i]]=(selfN[profile.samples[i]]||0)+(profile.timeDeltas[i]||0)/1000;
const memo={};const tot=id=>{if(memo[id]!=null)return memo[id];let s=selfN[id]||0;for(const c of kids[id])s+=tot(c);return memo[id]=s};
const incl={},self={};const walk=(id,st)=>{const nm=id2n[id].callFrame.functionName||'(anon)';self[nm]=(self[nm]||0)+(selfN[id]||0);if(!st.has(nm))incl[nm]=(incl[nm]||0)+tot(id);const s2=new Set(st);s2.add(nm);for(const c of kids[id])walk(c,s2)};walk(profile.nodes[0].id,new Set());
const T=o=>Object.entries(o).filter(([k])=>!/^\((idle|program|garbage collector|root)\)/.test(k)).sort((a,b)=>b[1]-a[1]).slice(0,80).map(([k,v])=>[k,Math.round(v)]);
const o={msPer:+(r.ms/Math.max(1,r.k)).toFixed(1),k:r.k,dead:r.dead,at:r.at,errs:errs.slice(0,3),incl:T(incl),self:T(self)};fs.writeFileSync(OUT,JSON.stringify(o));console.log(JSON.stringify({msPer:o.msPer,k:o.k,dead:o.dead,at:o.at,errs:o.errs}));await b.close()})();
