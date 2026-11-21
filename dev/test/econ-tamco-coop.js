/* econ-tamco CO-OP LAND GATE (owner): the scheme roads (Tâm cơ / hired hand, ECONOMY §5) in a co-op room, both seats.
   Setup (room, thin guest level, sync) copied from coop-thin-f1.js. Checks: (1) both seats see the road card with the kit Tốn rows;
   (2) guest Tâm cơ road and (3) guest hire road: the HOST pays it ONCE in her context (econRoadPay on the host, a = her person), the roll
   uses the odds she saw (fzRun on the host with her shown odds), nothing is paid on her phone, her person on her phone shows the cost after
   the view; (4) two-way: a scheme road aimed at the friend (the host player); (5) host seat road (her own phone = host, solo path).
   usage: python3 dev/build/assemble.py && node dev/test/econ-tamco-coop.js [workerURL] [level=6]   (SHOTS=<dir outside git>: Fold 755x1000@2 + iPad 1180x820@2) */
const {chromium}=require('playwright');const {serve,BASE}=require('./coop-serve.js');const fs=require('fs'),path=require('path');
const WURL=process.argv[2]||'https://ctm-coop.victoria-tntt.workers.dev';const LVL=+(process.argv[3]||6);const SWAP=+(process.argv[4]||0);
const res=[];const ok=(c,m,x)=>{res.push([!!c,m]);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x).slice(0,c?300:2500):''))};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const TRIPSRC=process.env.TRIP?fs.readFileSync(path.join(__dirname,'coop-thin-trip.js'),'utf8'):null;
async function mk(b,name,vp,want){const ctx=await b.newContext({viewport:{width:vp[0],height:vp[1]},deviceScaleFactor:process.env.SHOTS?2:1,reducedMotion:'reduce'});await serve(ctx);
  await ctx.addInitScript(([u,w])=>{window.COOP_URL=u;if(w)try{localStorage.setItem('ctm-thin',String(w))}catch(e){}
   window.__co=()=>{const c=window.COOP;if(!c)return{};return{code:c.code,seat:c.seat,world:typeof S!=='undefined'&&!!S&&!!(window.COOPW&&COOPW.on)}}},[WURL,want]);
  if(TRIPSRC&&name==='guest')await ctx.addInitScript(TRIPSRC);
  /* LAG=<ms>: a 4G profile on this phone: every socket message out and in waits LAG ms (order kept) */
  if(+process.env.LAG)await ctx.addInitScript(L=>{const W=window.WebSocket;const P=function(u,p){const s=p===undefined?new W(u):new W(u,p);const snd=s.send.bind(s);
    s.send=d=>setTimeout(()=>{try{if(s.readyState===1)snd(d)}catch(e){}},L);let h=null;Object.defineProperty(s,'onmessage',{configurable:true,get(){return h},set(f){h=f}});
    W.prototype.addEventListener.call(s,'message',e=>setTimeout(()=>{try{h&&h.call(s,e)}catch(x){console.error(x)}},L));return s};
   P.prototype=W.prototype;for(const k of ['CONNECTING','OPEN','CLOSING','CLOSED'])P[k]=W[k];window.WebSocket=P},+process.env.LAG);
  const p=await ctx.newPage();p.setDefaultTimeout(90000);const o={name,ctx,p,errs:[]};
  p.on('pageerror',e=>o.errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|favicon|fonts\.gstatic|CORS/.test(m.text()))o.errs.push('console: '+m.text().slice(0,300))});return o}
const tapText=async(o,re,ms=8000)=>{const t0=Date.now();while(Date.now()-t0<ms){const r=await o.p.evaluate(src=>{const R=new RegExp(src);
  const b=[...document.querySelectorAll('button')].find(b=>b.offsetParent!==null&&!b.disabled&&R.test(b.textContent.trim()));if(b){b.click();return true}return false},re.source);if(r)return true;await sleep(250)}return false};
const clear=(()=>{const t=fs.readFileSync(path.join(__dirname,'coop-e2e.js'),'utf8');const i=t.indexOf('async function clear(');const j=t.indexOf("return'many'}",i)+13;return eval('('+t.slice(i,j)+')')})();
const until=async(o,fn,arg,ms=40000)=>{try{await o.p.waitForFunction(fn,arg,{timeout:ms});return true}catch(e){return false}};
const press1=o=>o.p.evaluate(()=>{const b=document.getElementById('next');if(!b||b.disabled)return false;b.click();return true});
async function press(o,ms=20000){const t0=Date.now();while(Date.now()-t0<ms){if(await press1(o))return true;await clear(o);await sleep(300)}return false}
async function week(A,B,tag){for(let i=0;i<3;i++){await clear(A);await clear(B)}const w0=await A.p.evaluate(()=>COOP.state.week);
 for(let g=0;g<12;g++){const a=await A.p.evaluate(()=>S.buoi||0),c=await B.p.evaluate(()=>S.buoi||0);await press(A);await press(B);
  const t0=Date.now();while(Date.now()-t0<30000){await clear(A);await clear(B);if(await A.p.evaluate(w=>COOP.state.week>w,w0)&&await B.p.evaluate(w=>COOP.state.week>w,w0))break;if(await A.p.evaluate(x=>(S.buoi||0)!==x,a)&&await B.p.evaluate(x=>(S.buoi||0)!==x,c))break;await sleep(400)}
  if(await A.p.evaluate(w=>COOP.state.week>w&&!COOPW.pend,w0)&&await B.p.evaluate(w=>COOP.state.week>w&&!COOPW.pend,w0))break}
 const okw=await A.p.evaluate(w=>COOP.state.week===w+1,w0)&&await B.p.evaluate(w=>COOP.state.week===w+1,w0);ok(okw,tag+': week merged once',okw?undefined:[await A.p.evaluate(()=>({w:COOP.state.week,b:S.buoi,pend:COOPW.pend,sent:COOPW.sent,Q:Q.map(q=>q.t).slice(0,3),dis:document.getElementById('next').disabled,nt:document.getElementById('next').textContent})),await B.p.evaluate(()=>({w:COOP.state.week,b:S.buoi,pend:COOPW.pend,sent:COOPW.sent,Q:Q.map(q=>q.t).slice(0,3),dis:document.getElementById('next').disabled,nt:document.getElementById('next').textContent,log:COOPW.thin.C.log.slice(-5),modal:(document.getElementById('modal')||{}).hidden,q0:Q[0]&&Object.keys(Q[0]).join(','),q0p:Q[0]&&(Q[0].pid||Q[0].ev||''),mg:!!S.mg,km:document.querySelectorAll('.kmov').length,fr:COOP.frozen,cy:COOPW.cyHold,dead:S.dead}))]);await sleep(1500);return okw}
(async()=>{const b=await chromium.launch(/127\.0\.0\.1|localhost/.test(WURL)?{args:['--disable-features=BlockInsecurePrivateNetworkRequests,PrivateNetworkAccessSendPreflights,PrivateNetworkAccessRespectPreflightResults,LocalNetworkAccessChecks']}:{});
 const FOLD=process.env.SHOTS?[755,1000]:[686,880],IPAD=[1180,820];/* SHOTS=<dir outside git>: the owner's devices Fold 755x1000@2 + iPad 1180x820@2 */
 const H=await mk(b,'host',SWAP?IPAD:FOLD,LVL),G=await mk(b,'guest',SWAP?FOLD:IPAD,0);
 await H.p.goto(BASE);await H.p.waitForTimeout(3000);await tapText(H,/^(Chơi cùng bạn|Cùng hảo hữu)/);await H.p.waitForTimeout(500);await tapText(H,/^(Mời bạn|Mời hảo hữu)/);
 await until(H,()=>window.COOP&&COOP.code&&COOP.seat==='a');const code=await H.p.evaluate(()=>COOP.code);console.log('room',code,'level',LVL,'swap',SWAP);
 if(+process.env.CPU){const c=await H.ctx.newCDPSession(H.p);await c.send('Emulation.setCPUThrottlingRate',{rate:+process.env.CPU})}/* CPU=4: the host phone ×4 slower */
 await G.p.goto(BASE+'?room='+code);await G.p.waitForTimeout(3000);await tapText(G,/^(Vào phòng|Tiếp tục)/,4000);
 ok(await until(G,()=>window.COOP&&COOP.seat==='b'&&!COOP.frozen,null,60000),'guest joined seat b');
 const inW=async()=>{const t0=Date.now();while(Date.now()-t0<150000){await clear(H);await clear(G);const a=await H.p.evaluate(()=>__co().world&&rivals.some(v=>v.coop)),c=await G.p.evaluate(()=>__co().world&&rivals.some(v=>v.coop));if(a&&c)return true;await sleep(500)}return false};
 await inW();
 for(const o of [H,G])await o.p.evaluate(()=>{try{if(BAL.coopTm)BAL.coopTm.buoiMs=600000}catch(e){}if(S.srv)S.srv.risen=1;if(S.kc)S.kc.inPal=1;S.rank=3;S.sung=Math.max(S.sung||0,40);S.kpWarn=1;render()});
 if(!(await until(H,()=>!!COOPW.friend(),null,20000)&&await until(G,()=>!!COOPW.friend(),null,20000)))await week(H,G,'setup');
 const both=async f=>[await H.p.evaluate(f),await G.p.evaluate(f)];
 ok(await until(G,lv=>COOPW.thin.lvl>=lv&&!!COOPW.thin.view&&COOPW.thin.C.isLens(rivals),LVL,40000),'F0 level on, the guest NPC list is the lens',await both(()=>[COOPW.thin.lvl,COOPW.thin.C.isLens(rivals)]));
 for(let i=0;i<3;i++){await clear(H);await clear(G);await sleep(300)}
 /* settle: the host's view of this moment has arrived */
 const sync=async(ms=15000)=>{const t0=Date.now();while(Date.now()-t0<ms){await H.p.evaluate(()=>{try{COOPW.thin.flush()}catch(e){}});await sleep(500);
   const [hv,gv]=[await H.p.evaluate(()=>COOPW.thin.hv),await G.p.evaluate(()=>COOPW.thin.view&&COOPW.thin.view.v)];if(hv===gv)return true}return false};
 /* hooks: every road payment on each phone (who paid, in whose context) + the odds each roll was frozen at */
 const hook=()=>{window.__ep=[];window.__fz=[];const ep0=econRoadPay;econRoadPay=function(a,k,t,r){const tc0=a.tamco,b0=a.bac;const x=ep0.apply(this,arguments);
   __ep.push({who:a.name,isS:a===S,ctx:!!(window.COOPW&&COOPW.ctx),road:r,k,t:t&&t.id,dTc:(a.tamco||0)-(tc0||0),dBac:(a.bac||0)-(b0||0)});return x};
  const fz0=fzRun;fzRun=function(o,k,fn){if(k&&ACT[k]&&ACT[k].__c0)__fz.push({o,k,who:S&&S.name});return fz0.apply(this,arguments)}};
 await H.p.evaluate(hook);await G.p.evaluate(hook);
 /* her act from the road card on one phone: the cheapest priced scheme both roads can pay; tgt 'npc' | 'friend' */
 const act=async(o,road,tgt)=>o.p.evaluate(([road,tgt])=>{Q.length=0;S.mg=null;S.confined=0;try{closeModal()}catch(e){}window.ptHarmSend=null;/* the direct road (a sent deed: solo test econ-tamco.test.js §3b) */
   const L=tgt==='friend'?rivals.filter(v=>v&&v.coop&&v.alive!==false):rivals.filter(v=>v&&!v.coop&&v.alive&&!v.out);
   const ks=Object.keys(ACT).filter(k=>ACT[k].__c0);let best=null;
   for(const k of ks)for(const v of L){try{if(!ACT[k].ok(S,v)||!econRoadOk(k,S,v,road))continue}catch(e){continue}const c=econRoadCost(k,S,v);if(!best||c.pr<best.c.pr)best={k,v,c}}
   if(!best)return {why:'no priced scheme this road can pay',bac:S.bac,tamco:S.tamco,n:L.length};
   const {k,v,c}=best;const i=rivals.indexOf(v);if(typeof can==='function'&&!can(2))return {why:'no khắc'};
   doAct(i,k);/* the real tap: doAct opens the road card */const m=Q[0];if(!m||!m.opts)return {why:'no road card',q:Q.length};
   try{showModal()}catch(e){}const rows=[...document.querySelectorAll('#modal:not([hidden]) .kr-ton .krv')].map(e=>e.innerText.replace(/\s+/g,' ').trim());
   const ix=road==='tc'?1:2;const shown=m.opts[ix].p;const F=COOPW.thin&&COOPW.thin.F;const s0=F?F.stat.sent:0;const tc0=S.tamco,b0=S.bac;
   window.__card={k,rows};return {k,v:v.name,vid:v.id,c,ix,shown,rows,tc0,b0,me:S.name}},[road,tgt]);
 const choose=async(o,ix)=>{await o.p.evaluate(ix=>{const F=COOPW.thin&&COOPW.thin.F;window.__s0=F?F.stat.sent:0;chooseM(ix)},ix);
   const host=await o.p.evaluate(()=>COOP.seat==='a');if(!host){await until(o,()=>!COOPW.thin.F.pend,null,20000);await sleep(600)}await sync();await nonneg('after the choice on '+o.name)};
 const shot=async(o,n)=>{if(!process.env.SHOTS)return;fs.mkdirSync(process.env.SHOTS,{recursive:true});await o.p.screenshot({path:path.join(process.env.SHOTS,`${n}-${o.name}.jpg`),quality:70,type:'jpeg'})};
 /* F4: no step may leave bạc or Tâm cơ below 0 (her on the host = the authority, her phone, the host player) */
 const neg=[];const nonneg=async lab=>{const h=await H.p.evaluate(()=>{const me={bac:S.bac,tamco:S.tamco};let her=null;try{her=COOPW.thin.withSeat('b',()=>({bac:S.bac,tamco:S.tamco}))}catch(e){}return {me,her}});
  const g=await G.p.evaluate(()=>({bac:S.bac,tamco:S.tamco}));for(const [w,x] of [['host',h.me],['her@host',h.her],['her phone',g]])if(x&&((x.bac||0)<0||(x.tamco||0)<0))neg.push({lab,w,x})};
 /* F4 (b): pinned staging — her bạc / Tâm cơ set on the HOST (her seat, the authority), so a priced scheme is always open to both roads */
 const stage=async()=>{await H.p.evaluate(()=>{try{COOPW.thin.withSeat('b',()=>{S.bac=600;S.tamco=40})}catch(e){console.error(e)}});await sync()};
 const reset=async()=>{for(const o of [H,G])await o.p.evaluate(()=>{__ep.length=0;__fz.length=0;try{Q.length=0;closeModal()}catch(e){}});await clear(H);await clear(G);await sync();await nonneg('reset');await stage();await nonneg('staged')};
 /* (1)+(2)(3) guest roads on an NPC */
 for(const road of ['tc']){await reset();
  const r=await act(G,road,'npc');if(!r||r.why){ok(false,`guest ${road}: staging`,r);continue}
  ok(r.rows.length===3&&r.rows.every(s=>new RegExp('Bạc\\s*[−-]\\s*\\d').test(s))&&r.rows.some(s=>new RegExp('Tâm cơ\\s*[−-]\\s*'+r.c.tc).test(s)),`guest ${road}: the road card on HER phone shows the kit Tốn rows (price, Tâm cơ, price + hire)`,r.rows);
  await shot(G,'roadcard-'+road);
  await choose(G,r.ix);
  const [he,ge]=[await H.p.evaluate(()=>({ep:__ep.slice(),fz:__fz.slice()})),await G.p.evaluate(()=>({ep:__ep.slice(),fz:__fz.slice(),tc:S.tamco,bac:S.bac}))];
  const want=road==='tc'?{dTc:-r.c.tc}:{dBac:-r.c.hire};const p=he.ep[0]||{};
  ok(he.ep.length===1&&p.road===road&&p.who===r.me&&p.ctx&&(road==='tc'?p.dTc===want.dTc:p.dBac===want.dBac),`guest ${road}: the HOST pays her road once, in her context, the cost the card showed`,{host:he.ep,want});
  ok(ge.ep.length===0,`guest ${road}: nothing paid on her phone (host computes)`,ge.ep);
  ok(he.fz.some(f=>f.k===r.k&&f.o===r.shown),`guest ${road}: the host rolls the odds she saw (${r.shown})`,{fz:he.fz,shown:r.shown});
  ok(road==='tc'?ge.tc<=r.tc0-r.c.tc+3:ge.bac<=r.b0-r.c.hire,`guest ${road}: her phone shows the cost after the host's view`,{tc:[r.tc0,ge.tc],bac:[r.b0,ge.bac],c:r.c})}
 /* (4) two-way: her road aimed at the friend (the host player) */
 {await reset();const r=await act(G,'tc','friend');
  if(r&&r.why)console.log('NOTE two-way: no priced scheme on the friend right now:',JSON.stringify(r));
  else{await choose(G,r.ix);const he=await H.p.evaluate(()=>__ep.slice());const p=he[0]||{};
   ok(he.length===1&&p.road==='tc'&&p.who===r.me&&p.ctx&&p.t===r.vid,'two-way: her Tâm cơ road on the friend is paid by the host in her context',{he,r:{k:r.k,v:r.v}})}}
 /* (3) guest hire road on an NPC (a new merged week first: her khắc of the day are spent) */
 await reset();await week(H,G,'refresh');
 for(const road of ['hire']){await reset();
  const r=await act(G,road,'npc');if(!r||r.why){ok(false,`guest ${road}: staging`,r);continue}
  ok(r.rows.length===3&&r.rows.every(s=>new RegExp('Bạc\\s*[−-]\\s*\\d').test(s))&&r.rows.some(s=>new RegExp('Tâm cơ\\s*[−-]\\s*'+r.c.tc).test(s)),`guest ${road}: the road card on HER phone shows the kit Tốn rows (price, Tâm cơ, price + hire)`,r.rows);
  await shot(G,'roadcard-'+road);
  await choose(G,r.ix);
  const [he,ge]=[await H.p.evaluate(()=>({ep:__ep.slice(),fz:__fz.slice()})),await G.p.evaluate(()=>({ep:__ep.slice(),fz:__fz.slice(),tc:S.tamco,bac:S.bac}))];
  const want=road==='tc'?{dTc:-r.c.tc}:{dBac:-r.c.hire};const p=he.ep[0]||{};
  ok(he.ep.length===1&&p.road===road&&p.who===r.me&&p.ctx&&(road==='tc'?p.dTc===want.dTc:p.dBac===want.dBac),`guest ${road}: the HOST pays her road once, in her context, the cost the card showed`,{host:he.ep,want});
  ok(ge.ep.length===0,`guest ${road}: nothing paid on her phone (host computes)`,ge.ep);
  ok(he.fz.some(f=>f.k===r.k&&f.o===r.shown),`guest ${road}: the host rolls the odds she saw (${r.shown})`,{fz:he.fz,shown:r.shown});
  ok(road==='tc'?ge.tc<=r.tc0-r.c.tc+3:ge.bac<=r.b0-r.c.hire,`guest ${road}: her phone shows the cost after the host's view`,{tc:[r.tc0,ge.tc],bac:[r.b0,ge.bac],c:r.c})}
 /* (5) host seat: his own road on his phone (solo path), the card in the kit */
 {await reset();await H.p.evaluate(()=>{S.bac=Math.max(S.bac||0,300);S.tamco=Math.max(S.tamco||0,30)});/* his own person: the host is its authority */const r=await act(H,'hire','npc');
  if(!r||r.why)ok(false,'host hire: staging',r);
  else{ok(r.rows.length===3,'host: the road card on HIS phone shows the kit Tốn rows',r.rows);await shot(H,'roadcard-hire');await choose(H,r.ix);
   const he=await H.p.evaluate(()=>__ep.slice());const p=he[0]||{};
   ok(he.length===1&&p.road==='hire'&&p.isS&&!p.ctx&&p.dBac===-r.c.hire,'host: his hire road is paid once on his phone, his own person',he)}}
 ok(!H.errs.length&&!G.errs.length,'no page errors',{h:H.errs.slice(0,4),g:G.errs.slice(0,4)});
 ok(neg.length===0,'F4: no step leaves bạc or Tâm cơ below 0 (her on the host, her phone, the host)',neg);
 const bad=res.filter(x=>!x[0]);console.log(bad.length?`ECON-TAMCO-COOP FAIL ${bad.length}/${res.length}`:`ECON-TAMCO-COOP PASS ${res.length}`);
 await b.close();process.exit(bad.length?1:0)})().catch(e=>{console.error(e);process.exit(1)});
