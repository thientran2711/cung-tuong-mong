/* save-residue-probe (BIG rv save-unseen-lists, LAW 11 / 6c): plays seeded lives over many buổi; at every save that REALLY reached the slot (SAVE_N moved) it lists
   unseen cards the sổ cannot carry (Q code cards without rk, SP13.L code cards, EVHOLD cards evSer1 cannot write) = cards a true reload then loses. Must print no LOST line.
   usage: node dev/test/save-residue-probe.js [page=index.html] [dev=fold] [seeds=1,2,3] [buoi=40]   (exit 0 always; read the LOST-AT-WRITE lines) */
const {chromium}=require('playwright');const D=require('./lib/device');const fs=require('fs');
const [,,PAGE='index.html',DEV='fold',SEEDS='1,2,3',NB='40']=process.argv;
const SBR=fs.readFileSync(__dirname+'/save-boundary-reload.js','utf8');
const H=eval(SBR.match(/const H=(`[\s\S]*?`);\n/)[1]);const seedInit=eval(SBR.match(/const seedInit=(seed=>\{[\s\S]*?\}\};)\n/)[1].replace(/;$/,''));
(async()=>{const http=require('http'),path=require('path');const root=path.resolve(__dirname,'../..');
 const srv=http.createServer((q,r)=>{let f=path.join(root,decodeURIComponent(q.url.split('?')[0]));if(f.endsWith('/'))f+='index.html';fs.readFile(f,(e,b)=>{if(e){r.writeHead(404);r.end();return}r.writeHead(200,{'content-type':f.endsWith('.html')?'text/html':f.endsWith('.js')?'text/javascript':'application/octet-stream'});r.end(b)})}).listen(0);
 const url=`http://127.0.0.1:${srv.address().port}/${PAGE}`;const b=await chromium.launch();const ALL={};
 for(const seed of SEEDS.split(',').map(Number)){const ctx=await D.newDeviceContext(b,DEV,{serviceWorkers:'block'});await ctx.addInitScript(seedInit,seed);
  await ctx.route(/\.(webp|png|jpg|jpeg|mp3|ogg|m4a|mp4|webm)(\?|$)/,r=>r.abort());const p=await ctx.newPage();p.setDefaultTimeout(600000);const pe=[];p.on('pageerror',e=>pe.push(e.message.slice(0,120)));
  await D.openDirect(p,url);await p.waitForFunction(()=>typeof deser==='function'&&typeof start==='function'&&document.querySelector('#slots button'));await p.waitForTimeout(1500);await p.evaluate(H);
  const r=await p.evaluate(async(NB)=>{__sbr.newLife();const seen=new WeakSet();const lost={};const T=m=>String(m&&(m.t||m.pid)||'?').replace(/\d+/g,'#').slice(0,40);
   const add=(m,src)=>{if(!m||seen.has(m))return;seen.add(m);const k=src+': '+T(m);lost[k]=(lost[k]||0)+1};let writes=0;
   const s0=save;save=function(){const n0=SAVE_N;const r=s0.apply(this,arguments);if(SAVE_N!==n0){writes++;
     try{for(const m of Q)if(typeof jqSaveable==='function'&&!jqSaveable(m))add(m,'Q')}catch(e){}
     try{for(const x of SP13.L)if(x.code)add(x.m,'SP13')}catch(e){}
     try{for(const h of EVHOLD)if(typeof evSer1==='function'&&!evSer1(h.m))add(h.m,'EVHOLD')}catch(e){}}return r};
   const sl=t=>new Promise(r=>setTimeout(r,t));let steps=0;
   for(let i=0;i<NB&&!S.dead;i++){const k=__sbr.key();used=BAL.time.khac;const n=document.getElementById('next');if(n){n.disabled=false;n.click()}await __sbr.after(k);steps++}
   return {steps,writes,lost,key:__sbr.key()}},+NB);
  console.log(`seed ${seed} ${DEV}: ${r.steps} steps, ${r.writes} real writes, end ${r.key}; page errors ${pe.length}`);for(const k in r.lost){console.log('   LOST-AT-WRITE',k,'×'+r.lost[k]);ALL[k]=(ALL[k]||0)+r.lost[k]}
  await ctx.close()}
 console.log('TOTAL families',Object.keys(ALL).length,JSON.stringify(ALL));await b.close();srv.close()})().catch(e=>{console.error(e);process.exit(2)});
