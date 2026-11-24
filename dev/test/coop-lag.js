/* dev/test/coop-lag.js — CO-OP play-time lag budget (owner 16/11 15:05Z: "chơi online chung hai người mà nó lag là nổi điên lắm").
   Two real Chromium clients (Fold host 755x1000@2, iPad guest 1180x820@2), both CPU-throttled (--cpu, default 4), one room on the LIVE Worker.
   usage: bash dev/site/build_site.sh && node dev/test/coop-lag.js [--buoi 8] [--cpu 4] [--worker <url>] [--out result.json] [--budget dev/test/play-perf-budget.json]
   Measures (every socket frame is logged in the page: time, direction, bytes, message type):
     coopTurnP95      both pressed Sang buổi -> BOTH screens on the new buổi (ms; the slower of the two)
     coopActionP95    one player's own state message leaves her socket -> the friend's socket has it (ms, same machine clock)
     coopSyncKBMax    biggest single frame (KB); coopKBPerMin = traffic per minute per client
     coopResendPerMin same message type + same bytes sent again within 3 s (a resend storm) per client per minute
     coopRejoinMs     guest reloads mid-week -> both unfrozen and on the same buổi again (OD L1189). REPORT ONLY, not in the budget yet:
                      on 11/16 this check never saw both seats back within 120 s on main NOR on this branch (the test's own detection
                      may be wrong: dev/test/coop-rejoin-stats.js is the authority for rejoin); -1 = not seen
     coopLongTasksPerMin / coopLongTaskMax  main-thread tasks > 50 ms on the two clients while playing
   ORDER #8 (ROBOT-10 ANIM-STRESS, default off, test-only): --anim <css|sprite|webm>:<n> = both clients stage n synthetic animated figures (dev/test/lib/anim-stress.js) during the measured
     buổi; R.anim = fps p5/p50 + long tasks of each client. --no-rejoin skips the reload test. Compare two runs (with / without --anim) for the coopTurnP95 / coopActionP95 delta.
   Budget: the "coop*" keys of dev/test/play-perf-budget.json (ONE place). Any miss = FAIL, exit 1. */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');
const {serve,BASE}=require('./coop-serve.js');const PP=require('./lib/playperf');
const A_=process.argv.slice(2);const opt=(k,d)=>{const i=A_.indexOf('--'+k);return i<0?d:(A_[i+1]===undefined||A_[i+1].startsWith('--')?true:A_[i+1])};
const ANIM=opt('anim',null),NOREJ=!!opt('no-rejoin',false);const AS=ANIM?require('./lib/anim-stress.js'):null;
const FXLITE=opt('fx','full')==='lite';/* --fx lite = «Hiệu ứng: Gọn» on both clients (isolates the figures / sync from the game's own effects) */
const NB=+opt('buoi',8),CPU=+opt('cpu',4),WURL=opt('worker','https://ctm-coop.victoria-tntt.workers.dev'),OUT=opt('out',null);
const BUDGET=JSON.parse(fs.readFileSync(opt('budget',path.join(__dirname,'play-perf-budget.json')),'utf8'));
const sleep=ms=>new Promise(r=>setTimeout(r,ms));const L=(...a)=>console.error(new Date().toISOString().slice(11,19),...a);
const DCL={waitUntil:'domcontentloaded'};
const {WSLOG,CO,collect,verdict}=require('./lib/coop-lag-hooks.js');/* the hooks live in lib/coop-lag-hooks.js so every co-op runner can record the same metrics (ROBOT-10 order #7) */
async function mk(b,name,vp){const ctx=await b.newContext({viewport:{width:vp[0],height:vp[1]},deviceScaleFactor:vp[2],hasTouch:true,isMobile:vp[0]<1100});
 await serve(ctx);await ctx.addInitScript(u=>{window.COOP_URL=u;window.__bot={pre:1}},WURL);await ctx.addInitScript(WSLOG);await ctx.addInitScript(PP.INIT);
 /* the card-flip scene waits for its kit end button (KIT 81): hidden like coop-e2e does */
 await ctx.addInitScript(()=>{document.addEventListener('DOMContentLoaded',()=>{const s=document.createElement('style');s.textContent='#kcfl,.kcfl{display:none!important}';document.head.appendChild(s)})});
 if(AS){await ctx.addInitScript(AS.FRAMES);await AS.install(ctx,mk.pre)}
 const p=await ctx.newPage();p.setDefaultTimeout(30000);p.setDefaultNavigationTimeout(180000);const o={name,ctx,p,errs:[]};p.on('pageerror',e=>o.errs.push(e.message.slice(0,160)));
 o.cdp=await ctx.newCDPSession(p);return o}
async function tapText(o,re,ms=8000){const t0=Date.now();while(Date.now()-t0<ms){const h=await o.p.evaluateHandle(src=>{const R=new RegExp(src);
  return [...document.querySelectorAll('button,a,[role=button]')].find(b=>b.offsetParent!==null&&!b.disabled&&R.test(b.textContent.trim()))||null},re.source);
  const el=h.asElement();if(el){try{await el.click({noWaitAfter:true,timeout:15000});return true}catch(e){}}await sleep(250)}return false}
/* close story/news dialogs (never the co-op wait panel) */
const CLEAR1=()=>{const c=(window.__co2||(()=>({})))();if(c.frozen||c.waiting)return'coop';if(typeof S!=='undefined'&&S&&S.mg){try{S.mg=null;render()}catch(e){}return'mg'}
 const ov=[...document.querySelectorAll('button')].find(x=>x.offsetParent!==null&&!x.disabled&&!x.closest('#panel,#tabs,#hud,#modal')&&x.closest('[class^=km],[class*=" km"]')&&/^(Nhận|Đã hiểu|Tạ ơn|Lĩnh chỉ|Tuân chỉ)$/.test(x.textContent.trim()));if(ov){ov.click();return'x'}
 const m=document.getElementById('modal');if(!m||m.hidden)return'';const all=[...m.querySelectorAll('button:not([disabled])')].filter(x=>x.offsetParent!==null&&!x.dataset.kcp);
 const b=all.find(x=>/^Nhận thân phận/.test(x.textContent.trim()))||m.querySelector('.opts button:not([disabled])')||all.pop();if(b){b.click();return'x'}return''};
async function clear(o){for(let i=0;i<25;i++){const s=await require('./lib/coop-clear.js').first(o,CLEAR1).catch(()=>'');if(s!=='x'&&s!=='mg')return s;await sleep(200)}}
async function press(o,k0){for(let t=0;t<80;t++){await clear(o);const r=await o.p.evaluate(k0=>{if(window.COOPW&&(COOPW.bend||COOPW.pend||__co2().waiting))return'end';
  const b=document.getElementById('next');if(!b||b.disabled)return'';b.click();return'pressed'},k0).catch(()=>'');if(r)return Date.now();await sleep(250)}return 0}
(async()=>{if(AS)mk.pre=await AS.prep({dir:process.env.ANIM_CACHE,formats:[ANIM.split(':')[0]]});const b=await chromium.launch({args:PP.LAUNCH_ARGS});const A=await mk(b,'fold',[755,1000,2]),B=await mk(b,'ipad',[1180,820,2]);
 for(const o of [A,B])await o.ctx.addInitScript('window.__co2='+CO.toString());
 const R={cpu:CPU,turns:[],rejoin:null};let fail=[];
 await A.p.goto(BASE,DCL);await A.p.waitForFunction(()=>typeof start==='function',null,{timeout:180000});await sleep(2500);
 if(!await tapText(A,/^(Chơi cùng bạn|Cùng hảo hữu)/))throw new Error('no co-op button');await sleep(600);await tapText(A,/^(Mời bạn|Mời hảo hữu)/);
 await A.p.waitForFunction(()=>__co2().code&&__co2().seat==='a',null,{timeout:40000});const code=(await A.p.evaluate(()=>__co2())).code;L('room',code);
 await B.p.goto(BASE+'?room='+code,DCL);await B.p.waitForFunction(()=>typeof start==='function',null,{timeout:180000});await sleep(2500);await tapText(B,/^Vào phòng/,4000);
 await B.p.waitForFunction(()=>__co2().seat==='b'&&!__co2().frozen,null,{timeout:60000});
 {const t0=Date.now();while(Date.now()-t0<90000){await clear(A);await clear(B);if(await A.p.evaluate(()=>__co2().world)&&await B.p.evaluate(()=>__co2().world))break;await sleep(500)}}
 L('both in the world');for(const o of [A,B]){await o.cdp.send('Emulation.setCPUThrottlingRate',{rate:CPU});await o.p.evaluate(PP.RESET);await o.p.evaluate(()=>{window.__wsl.length=0})}
 /* --trace (robot-coop-fix-1): a per-page timeline of the measured window (frames up/down with the message type BEFORE gzip, room events, long tasks) → R.trace, to split a slow turn into client / server time */
 if(opt('trace',false))for(const o of [A,B])await o.p.evaluate(()=>{const L=window.__tr=[];const sd=COOP.send;COOP.send=function(t,f){try{const x=typeof t==='string'?t:t&&t.t;L.push([Date.now(),'up',x])}catch(e){}return sd.apply(this,arguments)};
  for(const t of ['week','buoi','bended','presence','room','end','state','snap','delta','seatok','error','thin','me','init','where','pos'])COOP.on(t,()=>L.push([Date.now(),'ev',t]));
  {const r0=window.render;window.render=function(){const t=performance.now();try{return r0.apply(this,arguments)}finally{const d=performance.now()-t;if(d>=50)L.push([Date.now(),'render',Math.round(d)+'ms '+(new Error().stack.split('\n').slice(2,5).map(x=>x.trim().replace(/^at /,'').replace(/ \(.*:(\d+):\d+\)$/,':$1')).join(' < '))])}}}
  window.__kcw=window.__kcw||[];setInterval(()=>{try{const k=__co2().key;if(window.__kcl!==k){window.__kcl=k;L.push([Date.now(),'key',k])}}catch(e){}},50)});
 if(FXLITE)for(const o of [A,B])await o.p.evaluate(()=>{try{OPT.fxon=false;OPT.fxpick=true;saveOpt()}catch(e){}});
 if(AS){const [fm,n]=ANIM.split(':');for(const o of [A,B]){await AS.inject(o.p,{format:fm,n:+n||6,seed:o===A?7:11});await sleep(3000);await o.p.evaluate(()=>{window.__r10fps.t.length=0;window.__r10fps.lt.length=0;window.__r10fps.on=true})}L('anim',ANIM,'on both clients')}
 const tPlay=Date.now();
 /* play NB buổi: each seat taps one act card (own state changes -> sync message), then both press Sang buổi */
 for(let i=0;i<NB;i++){const k0=await A.p.evaluate(()=>__co2().key);
  for(const o of [A,B]){await clear(o);await o.p.evaluate(()=>{const c=[...document.querySelectorAll('button.card.ka:not(:disabled):not(.kdis)')].filter(x=>x.offsetParent!==null);if(!c.length){const t=document.querySelector('#tabs [data-tab="act"]');if(t)t.click();return}c[Math.floor(Math.random()*c.length)].click()}).catch(()=>{});await sleep(700);await clear(o)}
  if(process.env.CL_DBG)L('pre-press',k0,JSON.stringify(await A.p.evaluate(()=>({co:__co2(),Q:Q.length,mg:!!(S&&S.mg),next:(document.getElementById('next')||{}).disabled,modal:!document.getElementById('modal').hidden,mt:(document.querySelector('#modal .dlg')||{}).textContent?.slice(0,80)}))));
  /* --prof <k0> (robot-coop-fix-1): CPU profile of that one turn on both clients → R.prof (top self-time functions) */
  const PROF=opt('prof',null)===k0;if(PROF)for(const o of [A,B]){await o.cdp.send('Profiler.enable');await o.cdp.send('Profiler.setSamplingInterval',{interval:1000});await o.cdp.send('Profiler.start')}
  const ta=await press(A,k0),tb=await press(B,k0);if(process.env.CL_DBG)L('pressed',ta,tb);const t2=Math.max(ta,tb);let done=false;
  for(let t=0;t<200&&!done;t++){const a=await A.p.evaluate(()=>__co2()),c=await B.p.evaluate(()=>__co2());if(a.key!==k0&&c.key!==k0&&(a.key===c.key||a.waiting||c.waiting))done=true;else{await clear(A);await clear(B);await sleep(150)}}
  const ka=await A.p.evaluate(()=>__co2().key),kb=await B.p.evaluate(()=>__co2().key);
  const ca=await A.p.evaluate(k=>window.__kch[k]||0,ka),cb=await B.p.evaluate(k=>window.__kch[k]||0,kb);
  /* robot-coop-fix-1 r2 review N3: the buổi can step before the second press() returns (press() spends time in clear() on dialogs) → the
     raw time went NEGATIVE and the turn counted as «stuck» although both keys moved. A turn is stuck only when the key did not move (moved);
     a step that landed before the last press returned took 0 ms after it. */
  const ms=done&&t2&&ca&&cb?Math.max(0,Math.max(ca,cb)-t2):-1;R.turns.push({k0,to:[ka,kb],ms,moved:done});
  if(PROF){R.prof=R.prof||{};for(const o of [A,B]){const {profile:P}=await o.cdp.send('Profiler.stop');const dt={};const N=new Map(P.nodes.map(n=>[n.id,n]));const par={};for(const n of P.nodes)for(const c of n.children||[])par[c]=n.id;
   for(let i=0;i<P.samples.length;i++)dt[P.samples[i]]=(dt[P.samples[i]]||0)+(P.timeDeltas[i]||0);const self={},tot={};
   for(const [id,us] of Object.entries(dt)){const n=N.get(+id);const f=n.callFrame;const k=(f.functionName||'(anon)')+' '+(f.url||'').split('/').pop()+':'+(f.lineNumber+1);self[k]=(self[k]||0)+us;
    const seen=new Set();let x=+id;while(x!=null){const m=N.get(x);const g=m.callFrame;const kk=(g.functionName||'(anon)')+' '+(g.url||'').split('/').pop()+':'+(g.lineNumber+1);if(!seen.has(kk)){seen.add(kk);tot[kk]=(tot[kk]||0)+us}x=par[x]}}
   const top=o=>Object.entries(o).sort((a,b)=>b[1]-a[1]).slice(0,250).map(([k,v])=>[k,Math.round(v/1000)]);R.prof[o.name]={self:top(self),total:top(tot)}}}L('buổi',k0,'->',ka,kb,'turn',ms,'ms')}
 const playMin=(Date.now()-tPlay)/60000;
 if(AS){R.anim={spec:ANIM};for(const o of [A,B]){const f=await o.p.evaluate(()=>{window.__r10fps.on=false;return{t:window.__r10fps.t.slice(),lt:window.__r10fps.lt.slice()}});const st=AS.fpsStats(f.t);R.anim[o.name]={fps5:st.p5,fps50:st.p50,fpsMean:Math.round(st.mean*10)/10,longTasks:f.lt.length,longTaskMax:Math.max(0,...f.lt),stat:await o.p.evaluate(()=>window.__r10anim.stat())}}console.log('ANIM '+JSON.stringify(R.anim))}
 /* metrics: lib/coop-lag-hooks.js collect() reads the socket logs + long tasks of the measured window (before the rejoin test reloads a client) */
 const C=await collect(A.p,B.p,{turns:R.turns,nbTurns:NB,playMin});const turnMs=R.turns.map(x=>x.ms).filter(x=>x>=0);
 if(opt('trace',false)){R.trace={};for(const o of [A,B])R.trace[o.name]=await o.p.evaluate(()=>({tr:window.__tr||[],lt:(window.__pp&&window.__pp.lt||[]).map(x=>[Math.round(performance.timeOrigin+x.t),x.d])})).catch(e=>({err:e.message}))}
 /* rejoin: the guest reloads mid-week */
 if(!NOREJ){const t0=Date.now();await B.p.reload(DCL);await B.p.waitForFunction(()=>typeof start==='function',null,{timeout:180000});await sleep(2000);await tapText(B,/^Vào phòng/,4000);let ok=false;
  for(let t=0;!ok&&Date.now()-t0<120000;t++){await clear(A);await clear(B);const a=await A.p.evaluate(()=>__co2()).catch(()=>({})),c=await B.p.evaluate(()=>__co2()).catch(()=>({}));if(a.on&&c.on&&!a.frozen&&!c.frozen&&c.world&&a.key===c.key)ok=true;else await sleep(250)}
  R.rejoin={ok,ms:ok?Date.now()-t0:-1};L('rejoin',R.rejoin)}else R.rejoin={ok:false,ms:-1};
 R.frames=C.frames;R.lat=C.lat;R.metrics=Object.assign(C.metrics,{coopRejoinMs:R.rejoin.ms,pageErrors:A.errs.length+B.errs.length});
 R.errs=A.errs.concat(B.errs).slice(0,8);
 const over=verdict(R.metrics,BUDGET);
 {const nStuck=R.turns.filter(x=>!x.moved).length;if(nStuck)over.push('buổi stuck: '+nStuck+' of '+NB)}if(R.metrics.pageErrors)over.push('page errors '+R.metrics.pageErrors);
 R.over=over;console.log(JSON.stringify({metrics:R.metrics,over}));console.log(JSON.stringify(C.frames));
 if(OUT)fs.writeFileSync(OUT,JSON.stringify(R,null,1));await b.close();console.log(over.length?'FAIL\n'+over.join('\n'):'PASS coop-lag');process.exit(over.length?1:0)})().catch(e=>{console.error(e);process.exit(2)});
