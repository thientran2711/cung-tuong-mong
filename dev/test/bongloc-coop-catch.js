/* E47r repro (co-op one-world lag ticket): bongloc-coop.js + 6 more merged weeks, logs «CATCH wkN phone … host …» (guest bạc on her phone vs the host copy). usage: node dev/test/bongloc-coop-catch.js [workerURL] */
/* review/bongloc-options CO-OP LAND GATE (owner OD L594): the Bổng lộc month frame on BOTH seats of a co-op room (host + thin guest).
   Each seat: the cut month frame carries «Lót tay thái giám Nội vụ phủ» + «… đòi lại phần bị cắt xén»; the buttons are drawn; choosing «Lót tay»
   resolves on that seat only (tip paid, goods restored), the other seat untouched, the guest's new bạc held by the host (one world); a month
   without a cut has options or says why. Setup copied from econ-tamco-coop.js.
   usage: python3 dev/build/assemble.py && node dev/test/bongloc-coop.js [workerURL] [level=6]   (SHOTS=<dir outside git>) */
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
 
 const shot=async(o,n)=>{if(!process.env.SHOTS)return;fs.mkdirSync(process.env.SHOTS,{recursive:true});await o.p.screenshot({path:path.join(process.env.SHOTS,`${n}-${o.name}.jpg`),quality:70,type:'jpeg'})};
 /* the Bổng lộc month frame on ONE seat: cut forced (low Sủng + greedy Nội vụ phủ eunuch), the card read, «Lót tay thái giám Nội vụ phủ» chosen */
 const month=async(o,want)=>o.p.evaluate(want=>{try{closeModal()}catch(e){}const B0=JSON.stringify(BAL.stip);let c=null,t=null;
   const mr=Math.random;for(let k=0;k<1;k++){S.out=0;S.confined=0;S.rank=3;S.sung=5;S.bac=Math.max(S.bac||0,300);BAL.stip.cap=100;BAL.stip.w.sung=100;const W=stipW();W.greedy=1;delete W.pun;const st=stipSt(S);delete st.tip;st.tips=0;(S.staff||[]).forEach(x=>x.loyal=40);
    Q.length=0;/* deterministic: roll() is capped at BAL.odds.hi → pin Math.random for this one call */if(want)Math.random=()=>0.001;try{stipend(S)}finally{Math.random=mr}c=Q.find(q=>/^Bổng lộc tháng/.test(q.t||"")&&!/Lễ nghĩa$/.test(q.t))}
   Object.assign(BAL.stip,JSON.parse(B0));
   const kem=S.inv.filter(e=>/hàng kém/.test((IT[e.k]||{}).n||"")).length;
   if(c){const i=Q.indexOf(c);Q.splice(0,i);try{render();showModal()}catch(e){}}
   const vis=[...document.querySelectorAll('#modal:not([hidden]) #mb .opts > *')].filter(x=>x.offsetParent).map(x=>x.textContent.trim().slice(0,40));
   return{me:S.name,seat:COOP.seat,opts:c?(c.opts||[]).map(x=>x.n):[],vis,said:c?/không có việc gì để chọn/.test(c.h):false,bac:S.bac,kem,tip:BAL.stip.tip[Math.min(7,rkOf(S))]}},want);
 const pick=async(o)=>{await o.p.evaluate(()=>{const j=Q.findIndex(q=>(q.opts||[]).some(x=>/^Lót tay/.test(x.n)));if(j>0)Q.unshift(...Q.splice(j,1));try{showModal()}catch(e){}const i=Q[0]&&Q[0].opts?Q[0].opts.findIndex(x=>/^Lót tay/.test(x.n)):-1;if(i>=0)chooseM(i)});await sleep(1500);if(await o.p.evaluate(()=>COOP.seat!=='a'))await until(o,()=>!(COOPW.thin&&COOPW.thin.F&&COOPW.thin.F.pend),null,20000);await sync();
   return o.p.evaluate(()=>({bac:S.bac,kem:S.inv.filter(e=>/hàng kém/.test((IT[e.k]||{}).n||"")).length,tip:stipSt(S).tip===S.turn}))};
 const herOnHost=()=>H.p.evaluate(()=>{try{return COOPW.thin.withSeat('b',()=>({name:S.name,bac:S.bac}))}catch(e){return{err:e.message}}});
 for(const [o,tag] of [[H,'host'],[G,'guest']]){
  for(let i=0;i<3;i++){await clear(H);await clear(G);await sleep(200)}
  const other=o===H?G:H;const oth0=await other.p.evaluate(()=>({name:S.name,bac:S.bac}));const her0=await herOnHost();
  const r=await month(o,true);
  ok(r.opts.some(n=>/^Lót tay/.test(n))&&r.opts.some(n=>/đòi lại phần bị cắt xén$/.test(n)),`${tag}: the cut month frame carries Lót tay + đòi lại`,r);
  ok(r.vis.length>=2,`${tag}: the option buttons are drawn on the frame`,r.vis);await shot(o,'bongloc-cut');
  const a=await pick(o);
  ok(a.tip&&a.kem<r.kem&&a.bac<=r.bac-r.tip+1,`${tag}: «Lót tay» resolves on her own seat (tip paid, goods restored)`,{before:r,after:a});
  const oth1=await other.p.evaluate(()=>({name:S.name,bac:S.bac}));ok(oth1.bac===oth0.bac,`${tag}: the other seat's bạc untouched`,{oth0,oth1});
  if(o===G){await o.p.evaluate(()=>{Q.length=0;try{closeModal()}catch(e){}});await week(H,G,'merge after her choice');await sync();for(let k=0;k<20;k++){const a1=await G.p.evaluate(()=>S.bac),b1=await H.p.evaluate(()=>{try{return COOPW.thin.withSeat('b',()=>S.bac)}catch(e){return null}});if(a1===b1)break;await sync(3000);await sleep(500)}const her1=await herOnHost();const ph=await G.p.evaluate(()=>({bac:S.bac,tip:stipSt(S).tip,inv:S.inv.length}));const hv=await H.p.evaluate(()=>{try{return COOPW.thin.withSeat('b',()=>({bac:S.bac,tip:stipSt(S).tip,inv:S.inv.length}))}catch(e){return{err:e.message}}});
   ok(hv.bac===ph.bac&&hv.tip===ph.tip,'guest: after the merged week the host holds her bạc + her Lót tay (one world)',{her0,host:hv,phone:ph});
   for(let wk=1;wk<=6;wk++){await G.p.evaluate(()=>{Q.length=0;try{closeModal()}catch(e){}});await H.p.evaluate(()=>{Q.length=0;try{closeModal()}catch(e){}});await week(H,G,'catch '+wk);await sync();await sleep(1500);
    const a1=await G.p.evaluate(()=>({bac:S.bac,m:S.month,w:COOP.state.week})),b1=await H.p.evaluate(()=>{try{return COOPW.thin.withSeat('b',()=>({bac:S.bac,m:S.month}))}catch(e){return{err:e.message}}});console.log('CATCH wk'+wk+' phone '+JSON.stringify(a1)+' host '+JSON.stringify(b1)+(a1.bac===b1.bac?' EQUAL':' DIFF '+(a1.bac-b1.bac)))}}
  const n=await month(o,false);ok(n.opts.length||n.said,`${tag}: a month without a cut still has options or says why`,n.opts);
  await o.p.evaluate(()=>{Q.length=0;try{closeModal()}catch(e){}})}
 const errs=[...H.errs,...G.errs].filter(e=>!/ResizeObserver/.test(e));ok(!errs.length,'no page errors on either seat',errs.slice(0,4));
 await b.close();const nf=res.filter(r=>!r[0]).length;console.log(nf?`BONGLOC-COOP FAIL ${nf}/${res.length}`:`BONGLOC-COOP PASS ${res.length}/${res.length}`);process.exit(nf?1:0)})().catch(e=>{console.error(e);process.exit(1)});
