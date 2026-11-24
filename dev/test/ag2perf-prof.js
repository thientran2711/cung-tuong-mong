/* ag2perf-prof (review/ag-deed-perf): CDP CPU profile of the 4x khắc step only — samples under __KHAC_STEP (= spend(1)) vs __BUOI_STEP; self + inclusive ms per function. usage: node dev/test/ag2perf-prof.js <index.html> <N buổi> <seed> <out.json> (live line numbers differ: compare by function name) */
const {chromium}=require('./lib/dlgs-off').pw('tap');/* play bot: a side-line dialogue scene is tapped through like a player (lib/dlgs-off.js) */const fs=require('fs');const [,,F,N0,SD,OUT]=process.argv;const N=+N0||40,SEED=+SD||1;
(async()=>{const b=await chromium.launch();const p=await b.newPage();await p.route(u=>/^https?:/.test(u.href),r=>r.abort());
await p.addInitScript(s=>{let x=s;Math.random=()=>{x=(x*1103515245+12345)%2147483648;return x/2147483648}},SEED);
await p.goto('file://'+require('path').resolve(F),{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
await p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;let g=0;do{start();g++}while(isSrv()&&g<30);window.__nlInner=0;window.__bot=1;quiet=false;Q.length=0;try{deal()}catch(e){}
 window.render=render=function(){};window.showModal=showModal=function(){};
 window.__KHAC_STEP=function __KHAC_STEP(){spend(1)};window.__BUOI_STEP=function __BUOI_STEP(){placeWhere();if(typeof agFlush==='function')agFlush();nextBuoi()};
 window.__run=n=>{for(let i=0;i<n&&!S.dead;i++){for(let j=0;j<3;j++){Q.length=0;S.mg=0;try{__KHAC_STEP()}catch(e){}}Q.length=0;S.mg=0;try{__BUOI_STEP()}catch(e){}Q.length=0}}});
await p.evaluate(()=>__run(4));const c=await p.context().newCDPSession(p);await c.send('Emulation.setCPUThrottlingRate',{rate:4});
await c.send('Profiler.enable');await c.send('Profiler.setSamplingInterval',{interval:200});await c.send('Profiler.start');
await p.evaluate(n=>__run(n),N);const {profile}=await c.send('Profiler.stop');
const byId=new Map();for(const n of profile.nodes)byId.set(n.id,n);const par=new Map();for(const n of profile.nodes)for(const ch of n.children||[])par.set(ch,n.id);
const cnt=new Map();profile.samples.forEach((id,i)=>cnt.set(id,(cnt.get(id)||0)+(profile.timeDeltas[i]||0)));
const key=n=>{const f=n.callFrame;return `${f.functionName||'(anon)'}:${(f.url||'').split('/').pop()}:${f.lineNumber+1}`};
const self={},incl={};let tot={K:0,B:0};
for(const [id,t] of cnt){let n=byId.get(id),chain=[],top=null;let cur=n;while(cur){chain.push(cur);const f=cur.callFrame.functionName;if(f==='__KHAC_STEP'){top='K';break}if(f==='__BUOI_STEP'){top='B';break}cur=byId.get(par.get(cur.id))}
 if(!top)continue;tot[top]+=t;if(top!=='K')continue;const k=key(n);self[k]=(self[k]||0)+t;const seen=new Set();for(const x of chain){const kk=key(x);if(seen.has(kk))continue;seen.add(kk);incl[kk]=(incl[kk]||0)+t}}
const top=(o,m)=>Object.entries(o).sort((a,b)=>b[1]-a[1]).slice(0,m).map(([k,v])=>[k,+(v/1000).toFixed(1)]);
const r={totK_ms:+(tot.K/1000).toFixed(1),totB_ms:+(tot.B/1000).toFixed(1),self:top(self,40),incl:top(incl,80)};fs.writeFileSync(OUT,JSON.stringify(r));console.log(r.totK_ms,r.totB_ms);await b.close()})();
