/* coop-thin-e-net (review coop-thin-f1 r1 #2): part E on a socket that dies. A phone's socket can look open while it is dead (4G, sleep):
   what she sends on it is lost, then it closes and COOP reconnects. Root cause of the coop-cyc THIN=6 reds (her maid's card never asked,
   the room stood at "Chờ hảo hữu…"): her `do ready` was lost on the dead socket and nobody sent it again after the reconnect.
   N1 her ready sent on a dead socket never reaches the host (the stall is real) · N2 after her reconnect her ready is sent again (once) ·
   N3 the host's step then moves both one buổi · N4 her person on the host == her phone (no change doubled by the resend) · N5 no page errors.
   usage: python3 dev/build/assemble.py && node dev/test/coop-thin-e-net.js <workerURL> [level=6] [swap=0] */
const {chromium}=require('playwright');const {serve,BASE}=require('./coop-serve.js');const fs=require('fs'),path=require('path');
const WURL=process.argv[2]||'https://ctm-coop.victoria-tntt.workers.dev';const LVL=+(process.argv[3]||6);const SWAP=+(process.argv[4]||0);
const res=[];const ok=(c,m,x)=>{res.push([!!c,m]);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x).slice(0,c?300:2500):''))};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const REALL=require('./lib/coop-real.js');async function mk(b,name,vp,want){const ctx=await b.newContext({viewport:{width:vp[0],height:vp[1]},deviceScaleFactor:1,reducedMotion:'reduce'});await serve(ctx);await REALL.origin(ctx,name==='host'?'a':'b');
  await ctx.addInitScript(([u,w])=>{window.COOP_URL=u;if(w)try{localStorage.setItem('ctm-thin',String(w))}catch(e){}
   window.__co=()=>{const c=window.COOP;if(!c)return{};return{code:c.code,seat:c.seat,world:typeof S!=='undefined'&&!!S&&!!(window.COOPW&&COOPW.on)}};
   /* a dead socket: while __mute, every `do` frame this page sends is dropped (the socket still looks open); __wss = the page's sockets */
   const W0=window.WebSocket,s0=W0.prototype.send;window.__wss=[];window.__drop=[];
   W0.prototype.send=function(d){if(window.__mute&&typeof d==='string'&&d.indexOf('"t":"do"')>=0){window.__drop.push(d.slice(0,80));return}return s0.apply(this,arguments)};
   window.WebSocket=function(u,p){const s=p===undefined?new W0(u):new W0(u,p);window.__wss.push(s);/* r1 #3: a dead HOST socket: while __deaf, every relayed `do` frame that reaches this page is dropped (registered first: stops onmessage too) */s.addEventListener('message',ev=>{if(window.__holdThin&&typeof ev.data==='string'&&ev.data.indexOf('"t":"thin"')>=0){(window.__thq=window.__thq||[]).push([s,ev.data]);ev.stopImmediatePropagation();return}if(window.__deaf&&typeof ev.data==='string'&&ev.data.indexOf('"t":"do"')>=0){window.__lost=(window.__lost||[]);window.__lost.push(ev.data.slice(0,80));ev.stopImmediatePropagation()}});return s};window.WebSocket.prototype=W0.prototype;
   Object.assign(window.WebSocket,{CONNECTING:0,OPEN:1,CLOSING:2,CLOSED:3})},[WURL,want]);
  const p=await ctx.newPage();p.setDefaultTimeout(90000);const o={name,ctx,p,errs:[]};
  p.on('pageerror',e=>o.errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|favicon|fonts\.gstatic|CORS|WebSocket/.test(m.text()))o.errs.push('console: '+m.text().slice(0,300))});return o}
const tapText=async(o,re,ms=8000)=>{const t0=Date.now();while(Date.now()-t0<ms){const r=await o.p.evaluate(src=>{const R=new RegExp(src);
  const b=[...document.querySelectorAll('button')].find(b=>b.offsetParent!==null&&!b.disabled&&R.test(b.textContent.trim()));if(b){b.click();return true}return false},re.source);if(r)return true;await sleep(250)}return false};
const clear=(()=>{const t=fs.readFileSync(path.join(__dirname,'coop-e2e.js'),'utf8');const i=t.indexOf('async function clear(');const j=t.indexOf("return'many'}",i)+13;return eval('('+t.slice(i,j)+')')})();
const until=async(o,fn,arg,ms=40000)=>{try{await o.p.waitForFunction(fn,arg,{timeout:ms});return true}catch(e){return false}};
const press1=o=>o.p.evaluate(()=>{const b=document.getElementById('next');if(!b||b.disabled)return false;b.click();return true});
async function press(o,ms=20000){const t0=Date.now();while(Date.now()-t0<ms){if(await press1(o))return true;await clear(o);await sleep(300)}return false}
(async()=>{const b=await chromium.launch(/127\.0\.0\.1|localhost/.test(WURL)?{args:['--disable-features=BlockInsecurePrivateNetworkRequests,PrivateNetworkAccessSendPreflights,PrivateNetworkAccessRespectPreflightResults,LocalNetworkAccessChecks']}:{})/* a local wrangler dev Worker (as coop-thin-e) */;const FOLD=[755,1000],IPAD=[1180,820];
 const H=await mk(b,'host',SWAP?IPAD:FOLD,LVL),G=await mk(b,'guest',SWAP?FOLD:IPAD,0);
 await H.p.goto(BASE);await H.p.waitForTimeout(3000);await tapText(H,/^(Chơi cùng bạn|Cùng hảo hữu)/);await H.p.waitForTimeout(500);await tapText(H,/^(Mời bạn|Mời hảo hữu)/);
 await until(H,()=>window.COOP&&COOP.code&&COOP.seat==='a');const code=await H.p.evaluate(()=>COOP.code);console.log('room',code,'level',LVL,'swap',SWAP);
 await G.p.goto(BASE+'?room='+code);await G.p.waitForTimeout(3000);await tapText(G,/^(Vào phòng|Tiếp tục)/,4000);
 ok(await until(G,()=>window.COOP&&COOP.seat==='b'&&!COOP.frozen,null,60000),'guest joined seat b');
 {const t0=Date.now();while(Date.now()-t0<150000){await clear(H);await clear(G);const a=await H.p.evaluate(()=>__co().world&&rivals.some(v=>v.coop)),c=await G.p.evaluate(()=>__co().world&&rivals.some(v=>v.coop));if(a&&c)break;await sleep(500)}}
 for(const o of [H,G])await o.p.evaluate(()=>{try{if(BAL.coopTm)BAL.coopTm.buoiMs=600000}catch(e){}if(S.srv)S.srv.risen=1;if(S.kc)S.kc.inPal=1;S.kpWarn=1;render()});
 await REALL.realize(H,G,()=>REALL.weekGeneric(H,G,clear,press1),ok,{low:1});
 const lv=[await H.p.evaluate(()=>COOPW.thin.lvl),await G.p.evaluate(()=>COOPW.thin.lvl)];ok(lv[0]===LVL&&lv[1]===LVL,'room level '+LVL+' on both seats',lv);
 /* a day buổi with both seats free: her ready not asked yet */
 for(let i=0;i<6;i++){await clear(H);await clear(G);await sleep(300)}
 if(await G.p.evaluate(()=>!!(COOPW.eAsked&&COOPW.eAsked()))){const b0=await G.p.evaluate(()=>S.buoi||0);await press(H);await until(G,b=>(S.buoi||0)!==b,b0,20000);for(let i=0;i<3;i++){await clear(H);await clear(G);await sleep(300)}}
 if(await H.p.evaluate(()=>(S.buoi||0)>=((typeof B4L==='number'?B4L:2))))console.log('note: the host is at the night buổi; the step check below runs on the night gate');
 const st=o=>o.p.evaluate(()=>({w:COOP.state.week,b:S.buoi||0,bac:S.bac,rd:COOPW.thin.E.stat.rd,reRd:COOPW.thin.E.stat.reRd||0,net:COOPW.thin.E.stat.reNet||0,mine:COOPW.thin.E.mine,dis:document.getElementById('next').disabled,nt:document.getElementById('next').textContent}));
 const g0=await st(G),h0=await st(H);
 /* her own change this buổi (it rides her erd before the ready) */
 await G.p.evaluate(()=>{S.bac=(S.bac||0)+5;render()});const gb=g0.bac+5;
 /* N1: the socket is dead: her press sends erd + ready into nothing */
 await G.p.evaluate(()=>{window.__mute=1});
 ok(await press(G),'guest pressed Sẵn sàng (socket dead)');
 await sleep(3000);
 const hr=await H.p.evaluate(()=>{const r=COOPW.thin.E.rd.b;return {rd:r||null,log:COOPW.thin.E.log.filter(x=>x[0]==='her-ready').slice(-2)}});
 const dropped=await G.p.evaluate(()=>window.__drop.slice());
 ok(dropped.some(x=>/"op":"ready"/.test(x))&&!(hr.rd&&hr.rd.w===g0.w&&hr.rd.b===g0.b),'N1 her ready was lost on the dead socket (the host never heard it)',{dropped,hr});
 /* the socket closes (the ping finds it silent / the phone wakes): COOP reconnects by itself */
 await G.p.evaluate(()=>{window.__mute=0;for(const s of window.__wss)try{if(s.readyState<=1)s.close()}catch(e){}});
 ok(await until(G,()=>window.COOP&&COOP.state.status==='open'&&!COOP.frozen&&window.__wss.some(s=>s.readyState===1),null,30000),'guest reconnected');
 /* N2: her ready again, once */
 ok(await until(H,([w,b])=>{const r=COOPW.thin.E.rd.b;return !!(r&&r.w===w&&r.b===b)},[g0.w,g0.b],20000),'N2 her ready reached the host after the reconnect',await H.p.evaluate(()=>({rd:COOPW.thin.E.rd,log:COOPW.thin.E.log.slice(-8)})));
 /* N3: the host's press steps both */
 await press(H);
 const moved=await until(H,([w,b])=>(S.buoi||0)!==b||COOP.state.week>w,[h0.w,h0.b],30000)&&await until(G,([w,b])=>(S.buoi||0)!==b||COOP.state.week>w,[g0.w,g0.b],30000);
 const g2=await st(G),h2=await st(H);
 ok(moved,'N3 the host\'s step moved both after her lost ready',[h0,h2,g0,g2]);
 ok(g2.net===1,'N2 her ready was sent again exactly once (E.stat.reNet)',g2);
 /* N4: her person on the host == her phone: her +5 bạc arrived once (the resend diff starts from the host's copy) */
 await sleep(2000);
 const hc=await H.p.evaluate(()=>{const B=COOPW.thin.seatOf('b');return B&&B.S.bac});const gc=await G.p.evaluate(()=>S.bac);
 ok(hc===gc&&gc===gb,'N4 her bạc on the host == her phone == before +5 (nothing doubled, nothing lost)',[hc,gc,gb]);
 /* r1 #3 — the HOST's socket dies (her frames relayed to it are lost, the Worker gave her no "nohost"), then it reconnects */
 for(let i=0;i<4;i++){await clear(H);await clear(G);await sleep(300)}
 if(await H.p.evaluate(()=>(S.buoi||0)>=((typeof B4L==='number'?B4L:2)))){console.log('note: night buổi; the host-net part needs a day buổi: skipped');}
 else{const g3=await st(G),h3=await st(H);await G.p.evaluate(()=>{S.bac=(S.bac||0)+7;render()});const gb3=g3.bac+7;
  await H.p.evaluate(()=>{window.__deaf=1;window.__lost=[]});
  ok(await press(G),'guest pressed Sẵn sàng (the host socket dead)');await sleep(3000);
  const lost=await H.p.evaluate(()=>window.__lost.slice());const hr3=await H.p.evaluate(()=>COOPW.thin.E.rd.b||null);
  ok(lost.some(x=>/"op":"ready"/.test(x))&&!(hr3&&hr3.w===g3.w&&hr3.b===g3.b),'N6 her ready was lost on the host\'s dead socket',{lost,hr3});
  await H.p.evaluate(()=>{window.__deaf=0;for(const s of window.__wss)try{if(s.readyState<=1)s.close()}catch(e){}});
  ok(await until(H,()=>window.COOP&&COOP.state.status==='open'&&!COOP.frozen&&window.__wss.some(s=>s.readyState===1)&&COOPW.thin.lvl>0,null,30000),'host reconnected');
  ok(await until(H,([w,b])=>{const r=COOPW.thin.E.rd.b;return !!(r&&r.w===w&&r.b===b)},[g3.w,g3.b],20000),'N7 her ready reached the host after HIS reconnect',await H.p.evaluate(()=>({rd:COOPW.thin.E.rd,log:COOPW.thin.E.log.slice(-8)})));
  await press(H);
  const mv=await until(H,([w,b])=>(S.buoi||0)!==b||COOP.state.week>w,[h3.w,h3.b],30000)&&await until(G,([w,b])=>(S.buoi||0)!==b||COOP.state.week>w,[g3.w,g3.b],30000);
  const g4=await st(G);ok(mv,'N8 the host\'s step moved both after his reconnect',[h3,g3,g4]);
  await sleep(2000);const hc4=await H.p.evaluate(()=>{const B=COOPW.thin.seatOf('b');return B&&B.S.bac});const gc4=await G.p.evaluate(()=>S.bac);
  ok(hc4===gc4&&gc4===gb3,'N9 her bạc on the host == her phone == before +7 (nothing doubled, nothing lost)',[hc4,gc4,gb3,await G.p.evaluate(()=>COOPW.thin.E.stat.hNet||0)])}
 /* r1 #3 — he presses Sẵn sàng in the gap after his reconnect, before the room level is back (the old road's bend): kept, not stuck */
 for(let i=0;i<4;i++){await clear(H);await clear(G);await sleep(300)}
 if(!(await H.p.evaluate(()=>(S.buoi||0)>=((typeof B4L==='number'?B4L:2))))){const h5=await st(H),g5=await st(G);
  ok(await press(G),'guest pressed Sẵn sàng (before his reconnect)');await sleep(1500);
  await H.p.evaluate(()=>{window.__holdThin=1;window.__thq=[];for(const s of window.__wss)try{if(s.readyState<=1)s.close()}catch(e){}});
  await until(H,()=>window.COOP&&COOP.state.status==='open'&&window.__wss.some(s=>s.readyState===1)&&window.__thq.length>0,null,30000);
  const gap=await H.p.evaluate(()=>({lvl:COOPW.thin.lvl,eW:COOPW.eW()}));
  const pr=await press1(H);await sleep(500);const bd=await H.p.evaluate(()=>COOPW.bend);
  await H.p.evaluate(()=>{window.__holdThin=0;for(const [s,d] of window.__thq.splice(0))s.dispatchEvent(new MessageEvent('message',{data:d}))});
  ok(gap.lvl===0&&!pr,'N10 his #next is locked in the level gap after his reconnect (no press lost to the old road)',[gap,pr,bd]);
  ok(await until(H,()=>COOPW.eW()&&!document.getElementById('next').disabled,null,20000),'N10b level back: his #next free again');await press(H);
  const mv=await until(H,([w,b])=>(S.buoi||0)!==b||COOP.state.week>w,[h5.w,h5.b],30000)&&await until(G,([w,b])=>(S.buoi||0)!==b||COOP.state.week>w,[g5.w,g5.b],30000);
  ok(mv,'N11 that press still steps both once the level is back (no stuck "Chờ hảo hữu…")',[h5,await st(H),g5,await st(G),await H.p.evaluate(()=>({bend:COOPW.bend,next:document.getElementById('next').textContent,tr:COOPW.tr.slice(-5)}))])}
 ok(!H.errs.length&&!G.errs.length,'N5 no page errors',[H.errs.slice(0,3),G.errs.slice(0,3)]);
 const p=res.filter(r=>r[0]).length;console.log(`RESULT ${p} / ${res.length}`);await b.close();process.exit(p===res.length?0:1)})().catch(e=>{console.error(e);process.exit(2)});
