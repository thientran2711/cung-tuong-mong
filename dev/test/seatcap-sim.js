/* review/seatcap: long-life bots; per month, the max holders of each capped rank (j30 SEATCAP / BAL.seatCap) and every write that put a rank over cap.
   usage: node dev/test/seatcap-sim.js <url-of-dev/index.html> [lives=20] [months=120] [mode=idle|active] [trace=1] [firstLife=0]
   idle = she does nothing (kept alive); active = a bot that takes the first card each buổi and answers dialogs with option 0 (kept alive).
   Prints JSON: per life the max holders per rank, months over cap, and the source snippet of each over-cap write (trace=1). exit 1 on over-cap or page error. */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,LIVES='20',MON='120',MODE='idle',TRACE='1',L0='0']=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch({args:['--blink-settings=imagesEnabled=false']});const ctx=await b.newContext({serviceWorkers:'block'});
 await ctx.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)(\?|$)/,r=>r.abort().catch(()=>{}));
 const errs=[];const p=await ctx.newPage();p.on('pageerror',e=>errs.push(e.message.slice(0,160)));p.setDefaultTimeout(1200000);
 await p.goto(URL,{waitUntil:'domcontentloaded'});for(let i=0;i<200;i++){if(await p.evaluate(()=>typeof start==='function'&&!!window.__ctmBuilt).catch(()=>false))break;await sleep(300)}
 const ORIG=['tt','dtq','th','muoi','nc','td','thd','cn','cnv'];const out=[];
 for(let L=+L0;L<+L0+(+LIVES);L++){const r=await p.evaluate(([L,MON,MODE,TRACE,ORIG])=>{const CAP=SEATCAP;const mx={},over={},hits=[];
   const cnt=r=>consorts().filter(q=>rkOf(q)===r).length;
   const chk=()=>{const o=[];for(const k in CAP){const n=cnt(+k);if(n>CAP[k])o.push(+k)}return o};
   const tr=v=>{if(v.__tr)return;v.__tr=1;let rk=v.rank,qn=v.queen;Object.defineProperty(v,'rank',{enumerable:true,configurable:true,get(){return rk},set(x){const was=chk().join();rk=x;const now=chk().join();if(now&&now!==was&&hits.length<40)hits.push({k:'rank',to:x,q:!!qn,ov:now,st:(new Error).stack.split('\n').slice(2,6).join(' | ')})}});
     Object.defineProperty(v,'queen',{enumerable:true,configurable:true,get(){return qn},set(x){const was=chk().join();qn=x;const now=chk().join();if(now&&now!==was&&hits.length<40)hits.push({k:'queen',to:x,ov:now,st:(new Error).stack.split('\n').slice(2,6).join(' | ')})}});
     /* revive from cold palace: out flips back */ let ou=v.out;Object.defineProperty(v,'out',{enumerable:true,configurable:true,get(){return ou},set(x){const was=chk().join();ou=x;const now=chk().join();if(now&&now!==was&&hits.length<40)hits.push({k:'out',to:x,ov:now,st:(new Error).stack.split('\n').slice(2,6).join(' | ')})}});
     let al=v.alive;Object.defineProperty(v,'alive',{enumerable:true,configurable:true,get(){return al},set(x){const was=chk().join();al=x;const now=chk().join();if(now&&now!==was&&hits.length<40)hits.push({k:'alive',to:x,ov:now,st:(new Error).stack.split('\n').slice(2,6).join(' | ')})}})};
   const watchRivals=()=>{if(+TRACE)for(const v of rivals)tr(v)};
   window.__forceOrigin=ORIG[L%ORIG.length];SLOT=3;quiet=true;window.__nlInner=1;try{start()}catch(e){return {err:'start:'+e.message}}window.__nlInner=0;quiet=true;const r0=render;render=()=>{};
   if(+TRACE){/* her own rank too */let srk=S.rank;Object.defineProperty(S,'rank',{enumerable:true,configurable:true,get(){return srk},set(x){const was=chk().join();srk=x;const now=chk().join();if(now&&now!==was&&hits.length<40)hits.push({k:'S.rank',to:x,ov:now,st:(new Error).stack.split('\n').slice(2,6).join(' | ')})}})}
   const t0=S.turn;let g=0,bad=0,err='';const o0=chk();if(o0.length)hits.push({k:'start',ov:o0.join()});
   while(S.turn<t0+MON&&g++<MON*12){watchRivals();
    if(MODE==='active'){try{if(Q.length){const q=Q[0];const bt=document.querySelector('#modal button, #modal .opt');if(bt)bt.click();else Q.shift()}else if(S.mg){S.mg=null}else{const c=document.querySelector('[data-card],.act-card');if(c&&Math.random()<.7)c.click()}}catch(e){}}
    Q.length=0;S.mg=null;if(S.dead){S.dead=false;S.alive=true}if(S.suc<20)S.suc=60;if(S.out&&Math.random()<.02)S.out=false;
    try{endTurn()}catch(e){err='turn:'+e.message;break}
    for(const k in CAP){const n=cnt(+k);mx[k]=Math.max(mx[k]||0,n);if(n>CAP[k])over[k]=(over[k]||0)+1}}
   render=r0;quiet=false;return {L,orig:window.__forceOrigin,months:S.turn-t0,mx,over,hits,err,her:S.rank}},[L,+MON,MODE,TRACE,ORIG]);
  out.push(r);process.stderr.write(`life ${L} ${r.orig} mx=${JSON.stringify(r.mx)} over=${JSON.stringify(r.over)} hits=${(r.hits||[]).length} ${r.err||''} ${JSON.stringify((r.hits||[]).map(h=>h.k+'>'+h.ov+' @'+(h.st||'').split(' | ')[0].replace(/.*\//,'')))}\n`)}
 /* map stack positions back to source text */
 let src='';try{src=await p.evaluate(()=>document.documentElement.outerHTML)}catch(e){}
 const html=fs.existsSync('index.html')?fs.readFileSync('index.html','utf8').split('\n'):[];
 for(const r of out)for(const h of (r.hits||[]))if(h.st)h.src=h.st.split(' | ').map(f=>{const m=f.match(/:(\d+):(\d+)\)?$/);if(!m||!html.length)return f.trim();const ln=html[+m[1]-1]||'';return ln.slice(Math.max(0,+m[2]-70),+m[2]+50)});
 const tot={};for(const r of out)for(const k in (r.mx||{}))tot[k]=Math.max(tot[k]||0,r.mx[k]);const overM={};for(const r of out)for(const k in (r.over||{}))overM[k]=(overM[k]||0)+r.over[k];
 console.log(JSON.stringify({cap:await p.evaluate(()=>SEATCAP),maxHolders:tot,overMonths:overM,lives:out,errs:errs.slice(0,8)},null,0));
 await b.close();process.exit(errs.length||Object.keys(overM).length?1:0)})().catch(e=>{console.error(e);process.exit(1)});
