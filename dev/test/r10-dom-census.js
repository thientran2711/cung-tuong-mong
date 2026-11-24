/* robot-fix-cnv F4 (bot-page memory): the robot's bot page (render OFF) grows to 200k+ DOM nodes / 1 GB heap. This census plays the same bot
   (inpage6 + inty + robot10-in, forced origin/road, seeded) and every STEP buổi prints: CDP Nodes (all live nodes, detached ones too), the nodes
   attached to the document, and the 8 biggest attached subtrees (id/class) — so a growth is pinned to its container (game) or to a detached pile.
   usage: node dev/test/r10-dom-census.js <origin> <road> <buoi> [step] [seed]  (game = dev/index.html via coop-serve) */
const {chromium}=require('./lib/pw-roulette');const {serve,BASE}=require('./coop-serve.js');const fs=require('fs'),path=require('path');
const [ORIGIN,ROAD,NB,STEP,SEED]=process.argv.slice(2);const M=path.join(__dirname,'..','measure');const rd=f=>fs.readFileSync(path.join(M,f),'utf8');
(async()=>{const b=await chromium.launch({args:['--no-sandbox']});const ctx=await b.newContext({viewport:{width:755,height:1000},reducedMotion:'reduce'});await serve(ctx);
 await ctx.route(/\.(webp|png|jpe?g|gif|mp3|ogg|m4a|mp4|webm)(\?|$)/i,r=>r.abort());await ctx.addInitScript(()=>{window.COOP_URL='http://127.0.0.1:9/'});
 await ctx.addInitScript(`window.__seed=${+SEED||7};(function(){let s=(window.__seed||1)>>>0;Math.random=function(){s=(s+0x6D2B79F5)>>>0;let t=s;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296}})();`);
 const p=await ctx.newPage();await p.goto(BASE,{waitUntil:'domcontentloaded',timeout:120000});await p.waitForFunction(()=>typeof start==='function',null,{timeout:120000});await p.waitForTimeout(500);
 await p.evaluate(()=>localStorage.clear());
 await p.evaluate(`window.__r10cfg=${JSON.stringify({origin:ORIGIN,road:ROAD,locked:false,pers:'skilled',uiEvery:0,lagMs:1e9,rtEvery:+process.env.RTEVERY||1})}`);
 await p.evaluate(rd('inpage6.js'));await p.evaluate(rd('inty.js'));await p.evaluate(rd('robot10-in.js'));const mode=await p.evaluate(()=>window.__r10.mode);
 await p.evaluate(()=>{document.querySelectorAll('#kload,#kroul,#kroulw,#klife').forEach(e=>e.remove());document.getElementById('title').hidden=true;SLOT=1;Q=[];start()});
 const cdp=await ctx.newCDPSession(p);await cdp.send('Performance.enable');
 const met=async()=>{const m=(await cdp.send('Performance.getMetrics')).metrics;const g=k=>(m.find(x=>x.name===k)||{}).value||0;return {nodes:g('Nodes'),lis:g('JSEventListeners'),heap:Math.round(g('JSHeapUsedSize')/1048576)}};
 const census=()=>p.evaluate(()=>{const all=document.getElementsByTagName('*').length;const nm=e=>e.tagName.toLowerCase()+(e.id?'#'+e.id:'')+(e.className&&typeof e.className==='string'?'.'+e.className.trim().split(/\s+/).slice(0,2).join('.'):'');
  const L=[];const walk=(e,d)=>{const n=e.getElementsByTagName('*').length;if(n<300)return;if(d<4)[...e.children].forEach(c=>walk(c,d+1));L.push([nm(e),n,d])};walk(document.body,0);
  L.sort((a,b)=>b[1]-a[1]);return {attached:all,top:L.filter(x=>x[2]>=1).slice(0,8).map(x=>x[0].slice(0,50)+':'+x[1]),buoi:window.__r10.buoi}});
 const want=+NB||600,step=+STEP||150;let next=0;
 for(let i=0;i<20000;i++){const r=await p.evaluate(([m])=>{try{window.__bot.step(m,5)}catch(e){}return {b:window.__r10.buoi,dead:!S||S.dead}},[mode]);
  if(r.b>=next||r.dead||r.b>=want){next=r.b+step;await cdp.send('HeapProfiler.collectGarbage').catch(()=>{});const m=await met();const c=await census();console.log(`buoi ${c.buoi} · CDP nodes ${m.nodes} · attached ${c.attached} · listeners ${m.lis} · heap ${m.heap} MB · top ${c.top.join(' | ')}`)}
  if(r.dead||r.b>=want)break}
 await b.close()})();
