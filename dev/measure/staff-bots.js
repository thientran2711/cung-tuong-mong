// review/staff-root bot measure: node dev/measure/staff-bots.js <game html, relative to the repo root> <lives> [origins] [out.json] [capSeconds]
// The inpage6 palace bot (sensible) plays every life (as kchh.js "cung"). A probe at the end of every buổi checks
// (outermost nextBuoi = after the game's own trims, what the next stage shows) every household — hers and every live NPC consort's — against the ONE table: maids (incl. the personal maid) <= cap[0], eunuchs <= cap[1].
// Works on the old build too (it has no hhHas: the probe counts the same way, personal maid = +1). Prints per-rank max maids/eunuchs seen,
// over-cap counts, HH reach %, early death (dead before 5 palace years) %, servant-road lives.
const {chromium}=require('playwright');const path=require('path');const fs=require('fs');
const ROOT=path.resolve(__dirname,'../..');const GF=process.argv[2]||'dev/index.html';const GAME='http://game.local/'+GF;const M=__dirname;
const N=+process.argv[3]||4,ORIG=(process.argv[4]||'tt,dtq,muoi,cn,nc,td,ch,thd').split(','),OUTF=process.argv[5]||null,CAP=(+process.argv[6]||3000)*1e3;
(async()=>{const b=await chromium.launch({args:['--disable-dev-shm-usage','--disable-gpu']});const c=await b.newContext({viewport:{width:390,height:844}});
 await c.route('http://game.local/**',r=>{const u=decodeURIComponent(new URL(r.request().url()).pathname);if(/\.(webp|png|jpg|mp3|ogg)$/.test(u))return r.abort();const f=path.join(ROOT,u);if(!f.startsWith(ROOT)||!fs.existsSync(f)||fs.statSync(f).isDirectory())return r.fulfill({status:404,body:''});r.fulfill({status:200,body:fs.readFileSync(f),contentType:/\.html$/.test(f)?'text/html; charset=utf-8':/\.json$/.test(f)?'application/json':'text/javascript; charset=utf-8'})});
 const errs=[];const res=[];const t0=Date.now();
 async function life(o){const p=await c.newPage();p.on('pageerror',e=>{if(!/onerror/.test(e.stack||''))errs.push(String(e.message).slice(0,200))});
  await p.goto(GAME,{waitUntil:'domcontentloaded'});await p.waitForTimeout(1500);await p.evaluate(()=>localStorage.clear());await p.reload({waitUntil:'domcontentloaded'});await p.waitForTimeout(1500);
  await p.evaluate(()=>document.querySelector('#slots button[data-new="1"]').click());await p.waitForTimeout(1000);
  await p.evaluate(`window.__hhStop=1;window.__origO=${JSON.stringify(o)};try{PX.app.ticker.stop()}catch(e){}`);
  await p.evaluate(fs.readFileSync(path.join(M,'inpage6.js'),'utf8'));
  await p.evaluate(()=>{const P=window.__sp={over:[],max:{},n:0,srv:0,tot:0};
   const has=q=>{const L=q.staff||[];return[L.filter(s=>s.role==="maid").length+1,L.filter(s=>s.role==="eunuch").length]};
   window.__probe=function(){try{if(!S||S.dead)return;P.n++;if(typeof isSrv==="function"&&isSrv())P.srv=1;let tot=0;
    for(const q of [S].concat(rivals||[])){if(!q||(q!==S&&q.alive===false))continue;if(q===S&&typeof isSrv==="function"&&isSrv())continue;const c=capOf(q),h=has(q);tot+=h[0]-1+h[1];
     const rk=q.out?"cold":String(q===S?S.rank:(q.queen?7:q.rank));const m=P.max[rk]=P.max[rk]||[0,0];m[0]=Math.max(m[0],h[0]);m[1]=Math.max(m[1],h[1]);
     if(h[0]>c[0]||h[1]>c[1])P.over.push({who:q===S?"her":"npc",rk,h,c,t:S.turn})}P.tot=Math.max(P.tot,tot)}catch(e){}};
   const n0=nextBuoi;nextBuoi=function(){const r=n0.apply(this,arguments);window.__probe();return r}});
  await p.evaluate(()=>{try{start()}catch(e){console.error(e)}});
  const t1=Date.now();while(true){let n=0;try{n=await p.evaluate(()=>{/* bot-side unstick (pre-existing on main 17/11: a dilemma whose answer chooseM refuses keeps the bot looping; same on old and new build): drop it */if((window.__stn||0)>200&&Q.length){window.__sp.unstick=(window.__sp.unstick||0)+1;window.__sp.us=(Q[0].t||'').slice(0,30);Q.shift();try{const m=document.getElementById('modal');if(m)m.hidden=true}catch(e){}window.__stn=0;window.__stk=''}const r=window.__bot.step("sens",40);return r})}catch(e){errs.push('step '+String(e).slice(0,160));break}
   if(await p.evaluate(()=>window.__res.length>=1))break;if(Date.now()-t1>900e3){errs.push('life cap '+o);break}}
  const r=await p.evaluate(()=>{const x=window.__res[0];if(x&&x.stuck)x.ring=[Q.length,Q[0]&&Q[0].t,Q[0]&&(Q[0].o||Q[0].opts||[]).map(o=>o.n),String(Q[0]&&Q[0].h||'').replace(/<[^>]+>/g,'').slice(0,160),!document.getElementById('modal').hidden,typeof pending!=='undefined'?JSON.stringify(pending).slice(0,200):''];return x?{origin:x.origin,maxRank:x.maxRank,hhTurn:x.hhTurn,turns:x.turns,title:x.title,text:x.text,stuck:x.stuck,ring:x.ring,sp:window.__sp}:null});try{await p.close()}catch(e){}return r}
 for(let i=0;i<N;i++)for(const o of ORIG){if(Date.now()-t0>CAP)break;let r;try{r=await life(o)}catch(e){errs.push('life '+String(e).slice(0,160));continue}
  if(r){res.push(r);process.stderr.write(`${o} maxRank ${r.maxRank} turns ${r.turns} over ${r.sp.over.length} ${r.title||''}${r.stuck?' STUCK '+JSON.stringify(r.ring).slice(0,600):''}\n`)}if(OUTF)fs.writeFileSync(OUTF,JSON.stringify({res,errs}))}
 const pc=(a,b)=>Math.round(100*a/Math.max(1,b));const hh=r=>r.maxRank>=7||r.hhTurn!=null;
 const dead=r=>/mất|chết|qua đời|băng hà|tự vẫn|bị ban chết|ban rượu độc|thắt cổ/i.test((r.title||'')+' '+(r.text||''));
 const max={};for(const r of res)for(const [k,v] of Object.entries(r.sp.max)){const m=max[k]=max[k]||[0,0];m[0]=Math.max(m[0],v[0]);m[1]=Math.max(m[1],v[1])}
 const over=res.flatMap(r=>r.sp.over);
 console.log(JSON.stringify({game:GF,lives:res.length,HH:pc(res.filter(hh).length,res.length),earlyDeath:pc(res.filter(r=>dead(r)&&r.turns<60).length,res.length),
  srvLives:res.filter(r=>r.sp.srv).length,checks:res.reduce((a,r)=>a+r.sp.n,0),overCap:over.length,overHer:over.filter(x=>x.who==="her").length,overSample:over.slice(0,4),
  maxPerRank:max,unsticks:res.reduce((a,r)=>a+(r.sp.unstick||0),0),maxServantsInPalace:Math.max(0,...res.map(r=>r.sp.tot)),lifeMonths:Math.round(res.reduce((a,r)=>a+(r.turns||0),0)/Math.max(1,res.length)),errs:errs.slice(0,5),secs:Math.round((Date.now()-t0)/1000)}));
 await b.close()})().catch(e=>{console.error(e);process.exit(1)});
