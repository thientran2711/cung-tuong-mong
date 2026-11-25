/* save-residue-probe (BIG rv save-unseen-lists, LAW 11 / 6c; GATE since save-unseen-lists r4): plays seeded lives over many buổi; at every save that REALLY
   reached the slot (SAVE_N moved) it lists unseen cards the sổ cannot carry (Q code cards without rk, SP13.L code cards, EVHOLD cards evSer1 cannot write)
   = cards a true reload then loses (LOST-AT-WRITE), and makes every generator card (rk) waiting there again ONCE from its save form (j3 rcpMk, as a load
   does): it must come back with its choices (REMAKE-FAIL) and the remake must not touch the world (REMAKE-SIDE: ser() / NT.list / Q before = after).
   usage: node dev/test/save-residue-probe.js [page=index.html] [dev=fold|ipadAir] [seeds=1,2,3] [buoi=40]
   env RP_STACK=1 (where each code card was made) · RP_MUTATE=<rk kind> (strip that generator's rk as cards enter Q = the generator not registered;
   the gate must then FAIL) · exit 1 = any LOST / REMAKE line or a page error, 0 = clean. */
const {chromium}=require('playwright');const D=require('./lib/device');const fs=require('fs');
const [,,PAGE='index.html',DEV='fold',SEEDS='1,2,3',NB='40']=process.argv;
const SBR=fs.readFileSync(__dirname+'/save-boundary-reload.js','utf8');
const H=eval(SBR.match(/const H=(`[\s\S]*?`);\n/)[1]);const seedInit=eval(SBR.match(/const seedInit=(seed=>\{[\s\S]*?\}\};)\n/)[1].replace(/;$/,''));
(async()=>{const http=require('http'),path=require('path');const root=path.resolve(__dirname,'../..');
 const srv=http.createServer((q,r)=>{let f=path.join(root,decodeURIComponent(q.url.split('?')[0]));if(f.endsWith('/'))f+='index.html';fs.readFile(f,(e,b)=>{if(e){r.writeHead(404);r.end();return}r.writeHead(200,{'content-type':f.endsWith('.html')?'text/html':f.endsWith('.js')?'text/javascript':'application/octet-stream'});r.end(b)})}).listen(0);
 const url=`http://127.0.0.1:${srv.address().port}/${PAGE}`;const b=await chromium.launch();const ALL={};
 for(const seed of SEEDS.split(',').map(Number)){const ctx=await D.newDeviceContext(b,DEV,{serviceWorkers:'block'});await ctx.addInitScript(seedInit,seed);
  await ctx.route(/\.(webp|png|jpg|jpeg|mp3|ogg|m4a|mp4|webm)(\?|$)/,r=>r.abort());const p=await ctx.newPage();p.setDefaultTimeout(600000);const pe=[];p.on('pageerror',e=>pe.push(e.message.slice(0,120)));
  await D.openDirect(p,url);await p.waitForFunction(()=>typeof deser==='function'&&typeof start==='function'&&document.querySelector('#slots button'));await p.waitForTimeout(1500);await p.evaluate(H);if(process.env.RP_STACK)await p.evaluate(()=>{window.__rpStack=1});if(process.env.RP_MUTATE)await p.evaluate(k=>{window.__rpMut=k},process.env.RP_MUTATE);
  const r=await p.evaluate(async(NB)=>{__sbr.newLife();const seen=new WeakSet();const lost={};const T=m=>String(m&&(m.t||m.pid)||'?').replace(/\d+/g,'#').slice(0,40);
   const add=(m,src)=>{if(!m||seen.has(m))return;seen.add(m);const k=src+': '+T(m)+(m.__rpSt?' @ '+m.__rpSt:'');lost[k]=(lost[k]||0)+1};let writes=0;
   /* where each code card was made (env RP_STACK=1): the first game frames of the stack when it entered Q, for the fixer */
   /* RP_MUTATE: a generator «not registered» — its cards lose rk as they enter the queue */
   if(window.__rpMut){const P0=Array.prototype.push,U0=Array.prototype.unshift;const strip=a=>{for(const m of a)if(m&&m.rk===window.__rpMut){delete m.rk;delete m.ra}};
    Array.prototype.push=function(...a){if(this===Q)strip(a);return P0.apply(this,a)};Array.prototype.unshift=function(...a){if(this===Q)strip(a);return U0.apply(this,a)}}
   if(window.__rpStack){const tag=(a)=>{for(const m of a)try{if(m&&typeof m==='object'&&m.opts&&!m.__rpSt&&m.opts.some(o=>o&&Object.values(o).some(v=>typeof v==='function'))){const st=String(new Error().stack).split('\n').slice(2).map(l=>(l.match(/at ([\w$.<>]+) /)||[])[1]).filter(f=>f&&!/^(Array|Object|Function|new|eval)\b/.test(f)).slice(0,6).join('<');m.__rpSt=st}}catch(e){}};
    const P0=Array.prototype.push,U0=Array.prototype.unshift,S0=Array.prototype.splice;Array.prototype.push=function(...a){if(this===Q)tag(a);return P0.apply(this,a)};Array.prototype.unshift=function(...a){if(this===Q)tag(a);return U0.apply(this,a)};Array.prototype.splice=function(...a){if(this===Q&&a.length>2)tag(a.slice(2));return S0.apply(this,a)}}
   const s0=save;save=function(){const n0=SAVE_N;const r=s0.apply(this,arguments);if(SAVE_N!==n0){writes++;
     try{for(const m of Q)if(typeof jqSaveable==='function'&&!jqSaveable(m))add(m,'Q')}catch(e){}
     try{for(const x of SP13.L)if(x.code)add(x.m,'SP13')}catch(e){}
     try{for(const h of EVHOLD)if(typeof evSer1==='function'&&!evSer1(h.m))add(h.m,'EVHOLD')}catch(e){}
     /* every generator card waiting at this write, made again once from its save form (as on load) */
     try{const W=[...Q,...(typeof SP13!=='undefined'?SP13.L.map(x=>x.m):[]),...(typeof EVHOLD!=='undefined'?EVHOLD.map(h=>h.m):[])].filter(m=>m&&m.rk&&!rem.has(m));
      for(const m of W){rem.add(m);remN++;const fp=()=>JSON.stringify(ser())+'|'+JSON.stringify(typeof NT!=='undefined'?NT.list.map(x=>x.id):[])+'|'+Q.length;const a=fp();let c=null;
       try{c=rcpMk(JSON.parse(JSON.stringify({rk:m.rk,ra:m.ra,t:m.t})))}catch(e){}const b=fp();
       if(!c||!c.opts||!c.opts.length){const k='REMAKE-FAIL '+m.rk+': '+T(m);lost[k]=(lost[k]||0)+1}
       if(a!==b){const k='REMAKE-SIDE '+m.rk+': '+T(m);lost[k]=(lost[k]||0)+1}}}catch(e){const k='REMAKE-ERR '+String(e&&e.message).slice(0,60);lost[k]=(lost[k]||0)+1}}return r};
   const rem=new WeakSet();let remN=0;
   const sl=t=>new Promise(r=>setTimeout(r,t));let steps=0;
   for(let i=0;i<NB&&!S.dead;i++){const k=__sbr.key();used=BAL.time.khac;const n=document.getElementById('next');if(n){n.disabled=false;n.click()}await __sbr.after(k);steps++}
   return {steps,writes,lost,key:__sbr.key(),remN}},+NB);
  console.log(`seed ${seed} ${DEV}: ${r.steps} steps, ${r.writes} real writes, ${r.remN} generator cards remade, end ${r.key}; page errors ${pe.length}${pe.length?' '+JSON.stringify(pe.slice(0,3)):''}`);if(pe.length)PE+=pe.length;for(const k in r.lost){console.log('   LOST-AT-WRITE',k,'×'+r.lost[k]);ALL[k]=(ALL[k]||0)+r.lost[k]}
  await ctx.close()}
 const nF=Object.keys(ALL).length;console.log('TOTAL families',nF,JSON.stringify(ALL));console.log(nF||PE?`SAVE-RESIDUE FAIL (${nF} families, ${PE} page errors)`:'SAVE-RESIDUE PASS (0 cards lost at a write, every generator card remade clean)');
 await b.close();srv.close();process.exit(nF||PE?1:0)})().catch(e=>{console.error(e);process.exit(2)});let PE=0;
