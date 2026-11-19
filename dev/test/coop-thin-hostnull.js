/* Co-op thin guest, review/coop-thin-hostnull: the three gaps of her runs on the host, each as a whole family (report
   dev/handover/reports/coop-thin-hostnull.md). Two Playwright clients, host Fold 686x880 + guest iPad 1180x820 (swap=1: iPad hosts).
   usage: python3 dev/build/assemble.py && node dev/test/coop-thin-hostnull.js <workerURL> [level=9] [swap=0]   (UISCAN=<file>, LAG=<ms>, CPU=<rate>, SHOTS=<dir>)
   H1 (a) talk / scout / invite from the guest (the registrations with no walk repaint): run once, her result on her phone, the host's
   screen = a fresh render of HIS state · H6 the repaint: his own open card kept, no loop, its cost · H2 (b) her face reveal plays once on her phone, none on the host · H3 (c) more effects than the
   old cap: none lost, in order, paced by BAL.coopUi · H4 (d) sounds / scenes her walk engines raise reach her phone, none on the host.
   Review r1: H5b law 1 the other way (her context) · H7 (LONG=<n>) the repaint cost over a long session · H10 every run of hers (not only tap runs) that
   wrote the host's page is followed by his repaint. */
const {chromium}=require('playwright');const {serve,BASE}=require('./coop-serve.js');const fs=require('fs'),path=require('path');
const WURL=process.argv[2]||'https://ctm-coop.victoria-tntt.workers.dev';const LVL=+(process.argv[3]||9);const SWAP=+(process.argv[4]||0);
const res=[];const ok=(c,m,x)=>{res.push([!!c,m]);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x).slice(0,c?300:2500):''))};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const TRIPSRC=process.env.TRIP?fs.readFileSync(path.join(__dirname,'coop-thin-trip.js'),'utf8'):null;
async function mk(b,name,vp,want){const ctx=await b.newContext({viewport:{width:vp[0],height:vp[1]},deviceScaleFactor:process.env.SHOTS?2:1,reducedMotion:'reduce'});await serve(ctx);
  await ctx.addInitScript(([u,w])=>{window.COOP_URL=u;if(w)try{localStorage.setItem('ctm-thin',String(w))}catch(e){}
   window.__co=()=>{const c=window.COOP;if(!c)return{};return{code:c.code,seat:c.seat,world:typeof S!=='undefined'&&!!S&&!!(window.COOPW&&COOPW.on)}}},[WURL,want]);
  if(TRIPSRC&&name==='guest')await ctx.addInitScript(TRIPSRC);
  /* H10 (review r1): EVERY run in her context on the host (TH.withSeat, not only tap runs): did it write the host's DOM, and was the host
     repainted after it (paintN / rpN step, or a render outside her context before the next one)? window.__ws = rows [curDo, dom, painted, stack] */
  if(name==='host')await ctx.addInitScript(()=>{const t=setInterval(()=>{const TH=window.COOPW&&COOPW.thin;if(!TH||!TH.withSeat||!document.body)return;clearInterval(t);
    window.__ws=[];const mo=new MutationObserver(()=>{});const ws=TH.withSeat;let depth=0;
    TH.withSeat=function(seat,fn){if(depth||seat===COOPW.seat)return ws.apply(this,arguments);depth++;const p0=(TH.rpN|0);mo.takeRecords();mo.observe(document.body,{subtree:true,childList:true,attributes:true,characterData:true,attributeOldValue:true});
     let R;const ids={};let pre=null;const D=TH.D,ar=D&&D.afterRun;if(ar)D.afterRun=function(){if(!pre){pre=mo.takeRecords();mo.disconnect()}return ar.apply(this,arguments)}/* only what was written BEFORE the host's own after-run (his repaint) */;
     try{R=ws.apply(this,arguments)}finally{depth--;if(ar)D.afterRun=ar;const L=pre||mo.takeRecords();mo.disconnect();for(const m of L){let e=m.target.nodeType===1?m.target:m.target.parentElement;while(e&&!e.id)e=e.parentElement;const k=e?e.id:'body';ids[k]=(ids[k]|0)+1}
      const row={do:TH.curDo||'?',dom:L.length,ids,rec:L.slice(0,8).map(m=>[m.type,m.attributeName,m.target.nodeType===1?(m.target.tagName+'#'+m.target.id+'.'+String(m.target.className).slice(0,40)):'text',m.type==='attributes'?String(m.target.getAttribute&&m.target.getAttribute(m.attributeName)).slice(0,60):'',m.addedNodes?m.addedNodes.length:0,m.removedNodes?m.removedNodes.length:0]),rp:(TH.rpN|0)-p0,st:L.length?String(new Error().stack).split('\n').slice(2,7).map(x=>x.trim().split(' ')[1]).join('<'):''};window.__ws.push(row)}
     return R}},50)});
  if(process.env.UISCAN&&name==='host')await ctx.addInitScript(fs.readFileSync(path.join(__dirname,'coop-thin-uiscan.js'),'utf8'));/* hostnull: the host-side UI scan of her runs */
  /* P10 a dead socket on her phone (as coop-thin-e-net): while __mute her `do` frames are dropped, while __deafThin the host's views
     ("t":"delta" / "snap") never reach her; __wss = her sockets (closed by the test → COOP reconnects, "room") */
  if(name==='guest')await ctx.addInitScript(()=>{const W0=window.WebSocket,s0=W0.prototype.send;window.__wss=[];window.__drop=[];window.__lostV=0;
   W0.prototype.send=function(d){if(window.__mute&&typeof d==='string'&&d.indexOf('"t":"do"')>=0){window.__drop.push(d.slice(0,120));return}return s0.apply(this,arguments)};
   window.WebSocket=function(u,p){const s=p===undefined?new W0(u):new W0(u,p);window.__wss.push(s);s.addEventListener('message',ev=>{if(window.__deafThin&&typeof ev.data==='string'&&/"t":"(delta|snap)"/.test(ev.data)){window.__lostV++;ev.stopImmediatePropagation()}});return s};
   window.WebSocket.prototype=W0.prototype;Object.assign(window.WebSocket,{CONNECTING:0,OPEN:1,CLOSING:2,CLOSED:3})});
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
 /* scan rows reached only through the buổi / week steps (nextBuoi, endTurn, monthTick, contestWeek): those steps never run INSIDE her intent
    run (E / G run them, quiet unchanged there); counted on the host for the whole suite, plus any card with handlers and no pid (D.bad) */
 await H.p.evaluate(()=>{window.__inTap={};for(const n of ['nextBuoi','endTurn','monthTick','contestWeek','rivalsTurn']){const f=window[n];if(typeof f!=='function')continue;window[n]=function(){if(COOPW.ctx&&COOPW.thin.uiCap&&(COOPW.thin.curDo==='f'||COOPW.thin.curDo==='pick'))__inTap[n]=(__inTap[n]|0)+1;/* her E step runs nextBuoi on purpose (P13) */return f.apply(this,arguments)}}
  const tr=COOPW.thin.tapRun;COOPW.thin.tapRun=function(fn){const b=COOPW.thin.D.bad.length;try{return tr.apply(this,arguments)}finally{const d=COOPW.thin.D.bad.length-b;if(d)__inTap.bad=(__inTap.bad||[]).concat(COOPW.thin.D.bad.slice(-d))}}});
 ok(await until(G,lv=>COOPW.thin.lvl>=lv&&!!COOPW.thin.view&&COOPW.thin.C.isLens(rivals),LVL,40000),'F0 level on, the guest NPC list is the lens',await both(()=>[COOPW.thin.lvl,COOPW.thin.C.isLens(rivals)]));
 for(let i=0;i<3;i++){await clear(H);await clear(G);await sleep(300)}
 /* settle: the host's view of this moment has arrived */
 const sync=async(ms=15000)=>{const t0=Date.now();while(Date.now()-t0<ms){await H.p.evaluate(()=>{try{COOPW.thin.flush()}catch(e){}});await sleep(500);
   const [hv,gv]=[await H.p.evaluate(()=>COOPW.thin.hv),await G.p.evaluate(()=>COOPW.thin.view&&COOPW.thin.view.v)];if(hv===gv)return true}return false};
 const table=[];
 const reset=async()=>{for(let i=0;i<3;i++){await clear(H);await clear(G)}await G.p.evaluate(()=>{Q.length=0;S.mg=null;S.confined=0;S.dead=false;try{closeModal()}catch(e){}});await H.p.evaluate(()=>{Q.length=0;S.mg=null;try{closeModal()}catch(e){}})};
 const herPl=()=>H.p.evaluate(()=>{const B=COOPW.thin.seatOf('b');const s=B&&B.S||{};const f=COOPW.friend();const m=f&&COOPW.herPl7&&COOPW.herPl7();/* her key → the host's key (jcoopworld mapPlace): her 'home' = her palace, the host's palace r901 = his 'home' */const exp=!m?null:m==='home'?palaceOf(f):m==='r901'?'home':m;return {place:s.place,n:s.visit&&(s.visit.people||[]).length,vk:s.visit&&s.visit.k,where:f&&S.where&&S.where[f.id],mapped:exp}});
 const gPl=()=>G.p.evaluate(()=>({place:S.place,n:S.visit&&(S.visit.people||[]).length,vk:S.visit&&S.visit.k,used,pop:popIdx,tab}));
 /* one walk from her phone: returns the row (pending at once, no local change, one host run, answer) */
 const walk=async(fn,arg,tag)=>{await until(G,()=>!COOPW.thin.F.pend,null,15000);await G.p.evaluate(()=>{Q.length=0;try{closeModal()}catch(e){}});/* a player taps with no card open */
  const run0=await H.p.evaluate(()=>COOPW.thin.F.stat.run);const g0=await gPl();
  const r=await G.p.evaluate(([fn,arg])=>{const F=COOPW.thin.F;const l0=F.stat.local,b0=F.stat.busy,s0=F.stat.sent,gt0=F.stat.gate|0;const p0=S.place,v0=JSON.stringify(S.visit),u0=used;let err=null;
   const tc=typeof arg==='string'&&arg!==S.place?travel(S.place,arg):null;
   try{window[fn](arg)}catch(e){err=String(e&&e.stack||e).slice(0,300)}
   const nx=document.getElementById('next');const now={pend:!!F.pend,next:!!(nx&&nx.disabled),place:S.place===p0,visit:JSON.stringify(S.visit)===v0,used:used===u0};
   try{window[fn](arg)}catch(e){}now.dbl=F.stat.busy-b0;
   return {err,now,tc,local:F.stat.local-l0,sent:F.stat.sent-s0,gate:(F.stat.gate|0)-gt0,id:F.pend&&F.pend.id}},[fn,arg]);
  const got=r.id?await until(G,id=>!COOPW.thin.F.pend&&COOPW.thin.F.lastAns&&COOPW.thin.F.lastAns.id===id,r.id,15000):false;
  await sleep(300);await sync();const run1=await H.p.evaluate(()=>COOPW.thin.F.stat.run);
  const g1=await gPl(),h1=await herPl(),ans=await G.p.evaluate(()=>COOPW.thin.F.lastAns);
  const row={tag,fn,arg,from:g0.place,tc:r.tc,r,got,ran:run1-run0,ms:ans&&ans.id===r.id?ans.ms:null,st:ans&&ans.r0&&ans.r0.st,g1,h1,used:[g0.used,g1.used]};table.push(row);return row};
 await reset();await sync();
 const PL=await G.p.evaluate(()=>places().map(x=>x.k).filter(k=>typeof k==='string'&&k!=='home'));
 /* ---------------- hostnull tests ---------------- */
 const SCR=()=>H.p.evaluate(()=>{const tx=e=>e?String(e.textContent||'').replace(/\s+/g,' ').trim():'';const pw=document.getElementById('popw');
  return {place:S.place,toks:[...document.querySelectorAll('#tokens .tok')].map(b=>(b.dataset.p||'')+':'+tx(b).slice(0,30)).join('|'),want:(typeof curPeople==='function'?curPeople():[]).length,
   pop:pw&&!pw.hidden&&pw.offsetParent!==null?tx(pw).slice(0,120):'',popIdx:popIdx,acts:tx(document.getElementById('acts')).slice(0,400)}});
 const hostSame=async()=>{await sleep(1200);const a=await SCR();await H.p.evaluate(()=>{try{render()}catch(e){}});await sleep(400);const b=await SCR();return {same:a.toks===b.toks&&a.pop===b.pop&&a.acts===b.acts&&(a.popIdx!=null||!a.pop),a,b}};
 const herRun=async(fn,arg)=>{await until(G,()=>!COOPW.thin.F.pend,null,15000);const p0=await H.p.evaluate(()=>COOPW.thin.paintN|0),run0=await H.p.evaluate(()=>COOPW.thin.F.stat.run);
  const r=await G.p.evaluate(([fn,arg])=>{Q.length=0;try{closeModal()}catch(e){}const F=COOPW.thin.F,s0=F.stat.sent,u0=used;window[fn](arg);return {sent:F.stat.sent-s0,pend:!!F.pend,id:F.pend&&F.pend.id,u0}},[fn,arg]);
  const got=r.id?await until(G,id=>!COOPW.thin.F.pend&&COOPW.thin.F.lastAns&&COOPW.thin.F.lastAns.id===id,r.id,15000):false;await sleep(500);await sync();
  const after=await G.p.evaluate(()=>({used,msg:String(popMsg||'').replace(/<[^>]+>/g,'').slice(0,80)}));
  return Object.assign(r,{got,ran:(await H.p.evaluate(()=>COOPW.thin.F.stat.run))-run0,paint:(await H.p.evaluate(()=>COOPW.thin.paintN|0))-p0,after})};
 /* her place with a person to talk to (the host stays home: his own stage differs from hers) */
 await reset();await H.p.evaluate(()=>{if(S.place!=='home')goTo('home');used=0;tab='act';render()});
 let K=null,PI=-1;for(const k of PL){if(!await G.p.evaluate(k=>{try{return accessOf(S,k).ok&&!accEtq(S,k)}catch(e){return false}},k))continue;await G.p.evaluate(()=>{used=0});await walk('goTo',k,'H walk');
  PI=await G.p.evaluate(()=>(S.visit&&S.visit.people||[]).findIndex(p=>p.kind==='rival'&&p.ref&&!p.ref.coop));if(PI>=0){K=k;break}}
 ok(!!K,'H0 she stands at a place with a person, the host at home',{K,PI});
 /* H1 (a) the registrations with no walk repaint (talk, scout, invite): the host's screen is HIS after her run (repainted from host state) */
 const H1=[];
 /* review r1 (H1 flake: his token "Phi ???" vs her name after a fresh render): what the HOST learned by himself (outside her context) — k61Know /
    k61Meet calls with their callers, so a red row shows whether his own world (parallel time arrivals …) changed his knowledge with no render */
 await H.p.evaluate(()=>{window.__hk61=[];for(const n of ['k61Know','k61Meet']){const f=window[n];if(typeof f!=='function'||f.__hn)continue;const w=function(){if(!COOPW.ctx)__hk61.push([n,Math.round(performance.now()),String(new Error().stack).split('\n').slice(2,7).map(x=>x.trim().split(' ')[1]).join('<')]);return f.apply(this,arguments)};w.__hn=1;window[n]=w;try{(0,eval)(n+'=window.'+n)}catch(e){}}});
 {await G.p.evaluate(i=>{popIdx=i;popMsg='';used=0;S.visit.tk={};S.visit.talked=false;render()},PI);await H.p.evaluate(()=>{render()});
  const oi=await G.p.evaluate(()=>{const p=curPeople()[popIdx];return talkOpts(p).findIndex(a=>!a.open&&!a.lock&&canPay(a))});
  const k0=await H.p.evaluate(()=>__hk61.length);const r=await herRun('talk',oi);const hs=await hostSame();hs.hostLearn=await H.p.evaluate(k=>__hk61.slice(k),k0);H1.push(['talk',r,hs]);
  if(process.env.SHOTS){fs.mkdirSync(process.env.SHOTS,{recursive:true});for(const p of [H,G]){await tapText(p,/^Bỏ qua$/,1500)/* the Luân hồi intro overlay (as coop-thin-f5 shots) */;await p.p.evaluate(()=>{for(const el of document.querySelectorAll('.nl-intro,#nlIntro,[data-nlintro]'))el.remove()}).catch(()=>{})}await sleep(900);for(const [p,nm] of [[H,'host'],[G,'guest']]){const vp=p.p.viewportSize();await p.p.screenshot({path:path.join(process.env.SHOTS,`hn-talk-s${SWAP}-${nm}-${vp.width}x${vp.height}.jpg`),type:'jpeg',quality:70})}}/* LOOK: after her talk, host screen = his own place, her pop-up only on her phone */
  ok(r.sent===1&&r.got&&r.ran===1&&!!r.after.msg&&r.after.used>0&&hs.same,'H1 talk from the guest: run once on the host, her pop-up shows her result, the host\'s screen = his own state (repainted)',{r,hs})}
 for(const [fn,src] of [['scout',"(S.seenLoc={},0)||rivals.find(v=>v&&!v.coop&&v.alive&&!v.out&&!locKnown(v)&&!together(S,v))"],['invite',"rivals.find(v=>v&&!v.coop&&v.alive&&!v.out&&!sameHouse(S,v))"]]){
  await reset();await G.p.evaluate(()=>{used=0;render()});await H.p.evaluate(()=>{render()});await sync();
  const id=await G.p.evaluate(s=>{const v=(0,eval)(s);return v?v.id:null},src);if(id==null){ok(true,'H1 '+fn+': no target (skipped)');continue}
  const r=await herRun(fn,id);const hs=await hostSame();H1.push([fn,r,hs]);
  ok(r.sent===1&&r.got&&r.ran===1&&r.after.used===r.u0+1&&hs.same,'H1 '+fn+' from the guest: run once, her khắc +1 (as solo), the host\'s screen = his own state',{r,hs})}
 /* H6 (a) r2, cost + safety of the host repaint: (i) the host's OWN open card is never rebuilt by her run unless her run wrote into #modal
    (marker node kept, his card still Q[0], still open); (ii) no loop: with no run of hers, 3 s idle, no repaint / paintN step; (iii) cost:
    her intent's host run time (TH.lat run: the repaint is no longer inside it), the repaint time (TH.rpMs / rpN), host long tasks */
 {await reset();await H.p.evaluate(()=>{window.__lt=[];try{new PerformanceObserver(l=>{for(const e of l.getEntries())__lt.push(Math.round(e.duration))}).observe({type:'longtask',buffered:false})}catch(e){}});
  await G.p.evaluate(i=>{popIdx=i;popMsg='';used=0;if(S.visit){S.visit.tk={};S.visit.talked=false}render()},PI);
  const card=await H.p.evaluate(()=>{const c={t:'hn-own',h:'hn-own card',opts:[{n:'Thôi'}]};Q.unshift(c);showModal();const mb=document.getElementById('mb');mb.__hn=1;const mk=document.createElement('i');mk.id='hn-mark';mb.appendChild(mk);return !document.getElementById('modal').hidden});
  const oi=await G.p.evaluate(()=>{const p=curPeople()[popIdx];return p?talkOpts(p).findIndex(a=>!a.open&&!a.lock&&canPay(a)):-1});
  await H.p.evaluate(()=>{window.__hsfx=[];for(const n of ['kitSfx','sfx']){const f=window[n];if(typeof f!=='function'||f.__hn)continue;const w=function(){if(!COOPW.ctx)__hsfx.push(n+':'+String(arguments[0]));return f.apply(this,arguments)};w.__hn=1;window[n]=w}});
  const r=oi>=0?await herRun('talk',oi):null;await sleep(600);
  const m=await H.p.evaluate(()=>({sfx:__hsfx.slice(),mark:!!document.getElementById('hn-mark'),q0:Q[0]&&Q[0].t,open:!document.getElementById('modal').hidden,rpN:COOPW.thin.rpN|0}));
  await H.p.evaluate(()=>{const i=Q.findIndex(c=>c.t==='hn-own');if(i>=0)Q.splice(i,1);showModal();render()});
  ok(!!card&&!!r&&r.got&&r.ran===1&&m.mark&&m.q0==='hn-own'&&m.open&&!m.sfx.length,'H6 his own open card is not rebuilt by her run (her talk wrote no #modal): same card, still open; no sound on the host',{card,r:r&&{got:r.got,ran:r.ran,paint:r.paint},m});
  const i0=await H.p.evaluate(()=>[COOPW.thin.rpN|0,COOPW.thin.paintN|0]);await sleep(3000);const i1=await H.p.evaluate(()=>[COOPW.thin.rpN|0,COOPW.thin.paintN|0]);
  ok(i0[0]===i1[0]&&i0[1]===i1[1],'H6 no repaint loop: 3 s with no run of hers, no repaint and no paint step',{i0,i1});
  const c=await H.p.evaluate(()=>({run:(COOPW.thin.lat||[]).map(x=>Math.round(x.run||0)),rpN:COOPW.thin.rpN|0,rpMs:Math.round(COOPW.thin.rpMs||0),paintN:COOPW.thin.paintN|0,lt:__lt}));
  console.log('COST host (CPU ×'+(+process.env.CPU||1)+', LAG '+(+process.env.LAG||0)+'): her runs (TH.lat run ms) '+JSON.stringify(c.run)+' · repaints '+c.rpN+' ('+c.rpMs+' ms total) · paintN '+c.paintN+' · long tasks '+JSON.stringify(c.lt))}
 /* H7 (review r1, LONG=<n>): the repaint cost over a long session: n talks of hers in a row; each repaint's ms (TH.rpMs step) beside a
    plain host render() at the same moment (the repaint = one host render; it must stay comparable and not grow with the run count) */
 if(+process.env.LONG){const N=+process.env.LONG,rows=[];await reset();
  for(let i=0;i<N;i++){const oi=await G.p.evaluate(i=>{popIdx=i;popMsg='';used=0;if(S.visit){S.visit.tk={};S.visit.talked=false}render();const p=curPeople()[popIdx];return p?talkOpts(p).findIndex(a=>!a.open&&!a.lock&&canPay(a)):-1},PI);
   if(oi<0)break;const m0=await H.p.evaluate(()=>[COOPW.thin.rpN|0,COOPW.thin.rpMs||0]);const r=await herRun('talk',oi);
   const m1=await H.p.evaluate(()=>{const t=performance.now();render();return [COOPW.thin.rpN|0,COOPW.thin.rpMs||0,performance.now()-t,(S.logs||[]).length,document.getElementsByTagName('*').length]});
   rows.push({i,got:r.got,rp:m1[0]-m0[0],ms:Math.round(m1[1]-m0[1]),render:Math.round(m1[2]),logs:m1[3],dom:m1[4]})}
  const a=rows.slice(0,Math.ceil(rows.length/2)).filter(x=>x.rp),b=rows.slice(Math.ceil(rows.length/2)).filter(x=>x.rp);const med=L=>{const v=L.map(x=>x.ms).sort((x,y)=>x-y);return v.length?v[v.length>>1]:0};
  console.log('LONG '+JSON.stringify(rows));
  ok(rows.length===N&&rows.every(x=>x.got&&x.rp===1)&&med(b)<=Math.max(2*med(a),med(a)+150),'H7 long session ('+N+' talks): one repaint per run, the repaint cost does not grow (median first half '+med(a)+' ms, second half '+med(b)+' ms)',rows.map(x=>[x.ms,x.render]))}
 /* H2 (b) her face reveal: she walks to a place where a consort she never met stands (arrival = k61Meet → krvFlip): the reveal plays once on HER
    phone, none on the host (no host reveal state, no host flip) */
 {await reset();await both(()=>{window.__pt2=BAL.ptime?BAL.ptime.on:undefined;if(BAL.ptime)BAL.ptime.on=0})/* review r1: parallel time moves the stranger in real time while she walks there (H2 red 1 in 6: she arrived, he had not) — the staging needs him to stay */;
  if(await G.p.evaluate(()=>S.place!=='home'))await walk('goTo','home','home');await G.p.evaluate(()=>{used=0;render()});await sync();
  const pk=await G.p.evaluate(()=>{for(const v of rivals){try{if(!v||v.coop||!v.alive||v.out||met61(v))continue;const k=whereOf(v);if(k&&k!=='home'&&k!==S.place&&accessOf(S,k).ok&&!accEtq(S,k)&&!(typeof tyOn==='function'&&tyOn(S))&&walkOk(travel(S.place,k)))return {k,id:v.id,key:kOf61(v)}}catch(e){}}return null});
  if(!pk){ok(true,'H2 no unmet consort at an open place (skipped)');await both(()=>{if(BAL.ptime&&window.__pt2!==undefined)BAL.ptime.on=window.__pt2})}else{
   await G.p.evaluate(()=>{});
   await H.p.evaluate(()=>{window.__hk=[];const kf=window.krvFlip;window.__kf0=kf;window.krvFlip=function(k){if(!COOPW.ctx){__hk.push(k);(window.__hks=window.__hks||[]).push(String(new Error().stack).split("\n").slice(1,9).join(" < "))}return kf.apply(this,arguments)};window.__hev=Object.keys(kitReveal.KRV.ev)});
   await G.p.evaluate(()=>{window.__gk=[];const kf=window.krvFlip;window.__gkf0=kf;window.krvFlip=function(k){__gk.push(k);return kf.apply(this,arguments)}});
   const row=await walk('goTo',pk.k,'H2');await sleep(800);await until(G,id=>(S.visit&&S.visit.people||[]).some(p=>p.ref&&p.ref.id===id),pk.id,8000)/* 4G / slow host: her scene's people arrive with the view */;
   /* she talks to the stranger (face to face = met: k61Meet, j21 talk) */
   const oi=await G.p.evaluate(id=>{const i=(S.visit&&S.visit.people||[]).findIndex(p=>p.ref&&p.ref.id===id);if(i<0)return -1;popIdx=i;popMsg='';S.visit.tk={};S.visit.talked=false;used=0;render();const L=talkOpts(curPeople()[popIdx]);return L.findIndex(a=>!a.open&&!a.lock&&canPay(a))},pk.id);
   const tr=oi>=0?await herRun('talk',oi):null;row.got=row.got&&!!tr&&tr.got;row.ran=tr?tr.ran:0;await sleep(2500);
   const g=await G.p.evaluate(k=>({flips:__gk.filter(x=>x===k).length,all:__gk,met:met61(rivals.find(v=>kOf61(v)===k)||{}),ev:!!kitReveal.KRV.ev[k]}),pk.key);
   const h=await H.p.evaluate(()=>({st:window.__hks,flips:__hk.length,ev:Object.keys(kitReveal.KRV.ev).filter(x=>!__hev.includes(x))}));
   await H.p.evaluate(()=>{window.krvFlip=__kf0});await G.p.evaluate(()=>{window.krvFlip=__gkf0});
   await both(()=>{if(BAL.ptime&&window.__pt2!==undefined)BAL.ptime.on=window.__pt2});
   ok(row.got&&row.ran===1&&g.met&&g.flips===1&&g.ev&&h.flips===0&&h.ev.length===0,'H2 her face reveal (she meets a stranger: walk there, talk face to face): played once on HER phone, none on the host',{pk,place:row.g1.place,oi,tr,g,h,ppl:await G.p.evaluate(id=>{const v=rivals.find(x=>x.id===id);return{ids:(S.visit&&S.visit.people||[]).map(p=>p.ref&&p.ref.id),where:v?whereOf(v):null,hw:null,away:typeof ptAwayOf==='function'&&v?!!ptAwayOf('mm:'+id):null}},pk.id),hp:await H.p.evaluate(id=>{const v=rivals.find(x=>x.id===id);return v?whereOf(v):null},pk.id)})}}
 /* H3 (c) more effects than the old cap: the host-side staging adds 7 lines to her scout run (seeLoc wrapped on the host only): all of them
    play on HER phone, in order, batch by batch (BAL.coopUi), none lost; none on the host */
 {await reset();await G.p.evaluate(()=>{used=0;render()});await sync();
  const id=await G.p.evaluate(()=>{S.seenLoc={};const v=rivals.find(v=>v&&!v.coop&&v.alive&&!v.out&&!together(S,v)&&!locKnown(v));return v?v.id:null});
  if(id==null)ok(true,'H3 no one to scout (skipped)');else{
   await both(()=>{window.__pt=BAL.ptime?BAL.ptime.on:undefined;if(BAL.ptime)BAL.ptime.on=0})/* parallel time (jptime) would send a runner and land later: the staging needs her scout run itself */;
   await H.p.evaluate(()=>{window.__r0=roll;roll=()=>true;window.__sl0=seeLoc;seeLoc=function(){const r=__sl0.apply(this,arguments);for(let i=0;i<7;i++)kitLine('hn-cap '+i);return r};
    window.__hl=[];const kl=window.kitLine;window.__kl0=kl;window.kitLine=function(t){if(!COOPW.ctx)__hl.push(String(t));return kl.apply(this,arguments)}});
   await G.p.evaluate(()=>{window.__gl=[];const kl=window.kitLine;window.__gkl0=kl;window.kitLine=function(t){__gl.push([String(t),Date.now()]);return kl.apply(this,arguments)}});
   const r=await herRun('scout',id);await sleep(4500);
   await H.p.evaluate(()=>{roll=__r0;seeLoc=__sl0;window.kitLine=__kl0});
   await both(()=>{if(BAL.ptime&&window.__pt!==undefined)BAL.ptime.on=window.__pt});
   const g=await G.p.evaluate(()=>({lines:__gl.filter(x=>/^hn-cap /.test(x[0])),B:BAL.coopUi}));await G.p.evaluate(()=>{window.kitLine=__gkl0});
   const h=await H.p.evaluate(()=>__hl.filter(x=>/^hn-cap /.test(x)).length);
   const L=g.lines.map(x=>x[0]),T=g.lines.map(x=>x[1]);const B=g.B||{batch:4,gapMs:900};
   const inOrder=L.length===7&&L.every((x,i)=>x==='hn-cap '+i);const paced=L.length===7&&T[B.batch]-T[0]>=B.gapMs*0.8;
   ok(r.got&&inOrder&&paced&&h===0,'H3 more effects than the old cap (7 lines in one run): all 7 on her phone, in order, '+B.batch+' at once then the rest '+B.gapMs+' ms later (BAL.coopUi), none lost; none on the host',{L,dt:T.map(t=>t-T[0]),host:h})}}
 /* H4 (d) her act's figure move (jpres: the act wrapper's kpmGo, e.g. Tát → slap) raised in her run on the host: captured, played once on HER
    stage (kpmPlay), never on the host's stage — neither at once nor by the act wrapper's later timer (staging: her scout run on the host
    also runs the Tát act body on the scouted consort) */
 {await reset();await G.p.evaluate(()=>{used=0;render()});await sync();
  const id=await G.p.evaluate(()=>{S.seenLoc={};const v=rivals.find(v=>v&&!v.coop&&v.alive&&!v.out&&!together(S,v)&&!locKnown(v));return v?v.id:null});
  if(id==null||!await H.p.evaluate(()=>!!(ACT.tat&&ACT.tat.f)))ok(true,'H4 no one to scout / no Tát act (skipped)');else{
   await both(()=>{window.__pt=BAL.ptime?BAL.ptime.on:undefined;if(BAL.ptime)BAL.ptime.on=0})/* parallel time (jptime) would send a runner and land later: the staging needs her scout run itself */;
   /* solo reference: the same act body on the host's own screen (his context), its moves counted (the act wrapper's timer included) */
   const solo=await H.p.evaluate(async id=>{const v=rivals.find(x=>x.id===id);const c=[];const f=window.kpmGo;window.kpmGo=function(m){if(!COOPW.ctx)c.push(m);return f.apply(this,arguments)};try{const s0=JSON.stringify(v.slap||null);ACT.tat.f(S,v);await new Promise(r=>setTimeout(r,1200));v.slap=JSON.parse(s0)}finally{window.kpmGo=f}return c.filter(m=>m==='slap').length},id);
   await H.p.evaluate(()=>{window.__r0=roll;roll=()=>true;window.__sl0=seeLoc;seeLoc=function(v){const r=__sl0.apply(this,arguments);try{ACT.tat.f(S,v)}catch(e){console.error(e)}return r};window.__kl=KPM_LOG.length});await sleep(300);await H.p.evaluate(()=>{window.__kl=KPM_LOG.length});
   await G.p.evaluate(()=>{window.__kp=[];const f=window.kpmPlay;window.__kp0=f;window.kpmPlay=function(m,a){__kp.push([m,a]);return f?f.apply(this,arguments):false}});
   const r=await herRun('scout',id);await sleep(2500);
   await H.p.evaluate(()=>{roll=__r0;seeLoc=__sl0});
   await both(()=>{if(BAL.ptime&&window.__pt!==undefined)BAL.ptime.on=window.__pt});
   const g=await G.p.evaluate(()=>{const o=__kp.slice();window.kpmPlay=__kp0;return o});const h=await H.p.evaluate(()=>KPM_LOG.length-__kl);
   ok(r.got&&r.ran===1&&solo>0&&g.length===solo&&g.every(x=>x[0]==='slap')&&h===0,'H4 her act\'s figure move: played on HER stage as often as solo, none on the host\'s stage (not even after the act wrapper\'s timer)',{g,solo,hostMoves:h})}}
 /* H5 (e) law 1 two-way: an ASK act the OTHER PLAYER accepted (CW.inv set, the target = her entry) is never refused by an NPC roll after:
    the gift a dislike would refuse (jdis, its roll forced on) is given; Kết giao (its roll forced to fail) succeeds. Control: the same gift to
    an NPC with the same staging is still refused (the NPC rule unchanged). */
 {await reset();const r=await H.p.evaluate(()=>{const f=COOPW.friend();const o={};const r0=roll,a0=aRoll,p0=window.rcvPick;try{
   const ik=Object.keys(IT).find(k=>{try{const i=itm(k);return i&&i.kd&&!(i.tg||[]).length&&!i.wk}catch(e){return false}});S.inv=S.inv||[];S.inv.push({k:ik},{k:ik});const e=S.inv[S.inv.length-1];
   const n=rivals.find(v=>v&&!v.coop&&v.alive&&!v.out);for(const v of [f,n])if(v)v.dis=['kd:'+itm(ik).kd];o.hit=[disHit(f,e),n&&disHit(n,e)];roll=()=>true;
   COOPW.inv='hn-test';try{o.gift=String(giveTo(S,f,S.inv.length-1)||'').replace(/<[^>]+>/g,'')}finally{COOPW.inv=false}
   o.npc=n?String(giveTo(S,n,S.inv.length-1)||'').replace(/<[^>]+>/g,''):'skip';
   aRoll=()=>false;window.rcvPick=(t,a,O)=>(O||[]).find(o=>o&&o.id==='no')||null/* receiver choice (jrcv): the NPC pick forced to refuse */;COOPW.inv='hn-test';try{o.ally=String(ACT.ally.f(S,f)||'').replace(/<[^>]+>/g,'')}finally{COOPW.inv=false}
   o.allyNpc=n?String(ACT.ally.f(S,n)||'').replace(/<[^>]+>/g,''):'skip'}finally{roll=r0;aRoll=a0;window.rcvPick=p0}return o});
  ok(!!r.hit[0]&&!!r.hit[1]&&!/không nhận/.test(r.gift)&&/không nhận/.test(r.npc)&&/thành/.test(r.ally)&&!/thành/.test(r.allyNpc),'H5 law 1: the gift / Kết giao the other player accepted is never refused by a roll after (an NPC still can)',r)}
 /* H5b (review r1) law 1 the OTHER way: the same staging in HER context on the host (she gives / asks Kết giao, the HOST's entry accepted:
    CW.inv set, target = his entry in her world): never refused after; an NPC still can. Item count (law 6c): the accepted gift left her chest once. */
 {await reset();const r=await H.p.evaluate(()=>{const o={};const r0=roll,a0=aRoll,p0=window.rcvPick;try{COOPW.thin.withSeat('b',()=>{const f=rivals.find(v=>v&&v.coop);o.f=!!f;if(!f)return;
   const ik=Object.keys(IT).find(k=>{try{const i=itm(k);return i&&i.kd&&!(i.tg||[]).length&&!i.wk}catch(e){return false}});S.inv=S.inv||[];S.inv.push({k:ik,hn5b:1},{k:ik,hn5b:1});const e=S.inv[S.inv.length-1];
   const n=rivals.find(v=>v&&!v.coop&&v.alive&&!v.out);for(const v of [f,n])if(v)v.dis=['kd:'+itm(ik).kd];o.hit=[disHit(f,e),n&&disHit(n,e)];roll=()=>true;
   const c0=S.inv.filter(x=>x.hn5b).length;COOPW.inv='hn-test-b';try{o.gift=String(giveTo(S,f,S.inv.length-1)||'').replace(/<[^>]+>/g,'')}finally{COOPW.inv=false}o.left=c0-S.inv.filter(x=>x.hn5b).length;
   o.npc=n?String(giveTo(S,n,S.inv.length-1)||'').replace(/<[^>]+>/g,''):'skip';o.npcKept=S.inv.filter(x=>x.hn5b).length;
   aRoll=()=>false;window.rcvPick=(t,a,O)=>(O||[]).find(o=>o&&o.id==='no')||null/* receiver choice (jrcv): the NPC pick forced to refuse */;COOPW.inv='hn-test-b';try{o.ally=String(ACT.ally.f(S,f)||'').replace(/<[^>]+>/g,'')}finally{COOPW.inv=false}
   o.allyNpc=n?String(ACT.ally.f(S,n)||'').replace(/<[^>]+>/g,''):'skip';S.inv=S.inv.filter(x=>!x.hn5b)})}finally{roll=r0;aRoll=a0;window.rcvPick=p0}return o});
  ok(r.f&&!!r.hit[0]&&!!r.hit[1]&&!/không nhận/.test(r.gift)&&r.left===1&&/không nhận/.test(r.npc)&&r.npcKept===1&&/thành/.test(r.ally)&&!/thành/.test(r.allyNpc),'H5b law 1 the other way (her context): the gift / Kết giao the host accepted is never refused after, the gift left her chest once (an NPC still can refuse, the gift stays)',r);
  for(let i=0;i<3;i++){await clear(H);await clear(G)}}
 if(process.env.UISCAN)try{fs.writeFileSync(process.env.UISCAN,JSON.stringify(await H.p.evaluate(()=>window.__uiscan)))}catch(e){console.error('uiscan',e.message)}
 {const W=await H.p.evaluate(()=>window.__ws||[]);const by={};for(const r of W){const k=r.do+(r.dom?(r.rp?' dom+repaint':' DOM NO REPAINT'):' clean');by[k]=(by[k]||0)+1}
  console.log('WSCAN '+JSON.stringify(by));const miss=W.filter(r=>r.dom&&!r.rp);for(const r of miss.slice(0,8))console.log('WSCAN miss '+JSON.stringify(r).slice(0,600));
  ok(W.length>0&&miss.length===0,'H10 every run in her context on the host (tap runs, her life, her picks, E / D work) that wrote the host\'s page is followed by his repaint ('+W.filter(r=>r.dom).length+' of '+W.length+' runs wrote it)',miss.slice(0,3))}
 const pe=[...H.errs,...G.errs].filter(e=>!/ERR_|net::|WebSocket/.test(e));ok(pe.length===0,'H8 no page errors',pe.slice(0,6));
 const n=res.filter(x=>x[0]).length;console.log(`coop-thin-hostnull L${LVL}${SWAP?' swap':''}: ${n}/${res.length}`);await b.close();process.exit(n===res.length?0:1)})().catch(e=>{console.error(e);process.exit(2)});
