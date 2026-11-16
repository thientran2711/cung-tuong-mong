/* name-mask DOM scan (review/name-mask-r1, extends name-mask-scan.js): after every bot step the WHOLE rendered page (textContent incl. hidden panels,
   title/aria-label/alt/placeholder attributes, document.title) + weekly news card + Sổ tay notes + Sổ ghi are checked for the RAW name of a consort she has not met.
   usage: NODE_PATH=$(npm root -g) node dev/test/name-mask-dom-scan.js <url|file> [WxH] [STEPS]   exit 1 on any hit */
const {chromium}=require('playwright');const path=require('path');const fs=require('fs');
const [,,URL0,VP,ST]=process.argv;const [W,H]=(VP||'755x1000').split('x').map(Number);const STEPS=+ST||60;
const URL=/^https?:/.test(URL0)?URL0:'file://'+path.resolve(URL0);
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,serviceWorkers:'block'});const p=await ctx.newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof newsHTML==='function',null,{timeout:120000});await p.waitForTimeout(1500);
 await p.addScriptTag({content:fs.readFileSync(path.join(__dirname,'../measure/inpage4.js'),'utf8')});
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;start()});
 await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.origin,null,{timeout:60000});
 const hits=new Map();let checks=0;
 for(let i=0;i<STEPS;i++){
  await p.evaluate(()=>window.__bot.step('sens',40));
  const r=await p.evaluate(async()=>{
   const un=(rivals||[]).filter(v=>v!==S&&v.name&&v.name.split(' ').length>=2&&!kitKnownName(v));
   const oth=[S.maid&&S.maid.name,...(S.staff||[]).map(x=>x.name),S.name].filter(Boolean);
   const box=document.createElement('div');box.id='__nmbox';document.body.appendChild(box);
   try{box.innerHTML=newsHTML()}catch(e){}
   try{const T=document.createElement('div');T.innerHTML=(S.logs||[]).slice(0,30).map(x=>`<p>${x}</p>`).join('');box.appendChild(T)}catch(e){}
   try{const T=document.createElement('div');T.innerHTML=Object.values(S.notes||{}).flat().map(x=>`<p>${x}</p>`).join('');box.appendChild(T)}catch(e){}
   await new Promise(r=>setTimeout(r,120));
   const cl=document.body.cloneNode(true);cl.querySelectorAll('script,style').forEach(n=>n.remove());let t=cl.textContent+' '+document.title;
   document.querySelectorAll('[title],[aria-label],[alt],[placeholder]').forEach(n=>{for(const a of['title','aria-label','alt','placeholder'])t+=' '+(n.getAttribute(a)||'')});
   box.remove();
   const out=[];for(const v of un){const vs=[v.name];const w=v.name.split(' ');if(w.length>=3)vs.push(w.slice(-2).join(' '));
    for(const n of vs){if(oth.some(o=>o.includes(n)||n.includes(o)))continue;const k=t.indexOf(n);if(k>=0){out.push({n,ctx:t.slice(Math.max(0,k-50),k+n.length+30).replace(/\s+/g,' ')});break}}}
   return {out,un:un.length}});
  checks++;for(const h of r.out){const k=h.n;if(!hits.has(k))hits.set(k,h.ctx)}
 }
 console.log('checks',checks,'distinct raw hits',hits.size);for(const [k,v] of hits)console.log('RAW',k,'::',v);
 console.log('page errors',errs.length,errs.slice(0,3));await b.close();process.exit(hits.size||errs.length?1:0)})();
