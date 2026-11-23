/* coop-craft-hand (B LANDER, CO-OP LAND GATE for review/mg-craft-r2; copy of coop-mg11-hand): both seats list the craft kinds (Khéo tay, Vẽ, Cắm hoa, Công «Thêu theo nét» = the stitch board) and Thêu «Nhớ mẫu thêu» (kept, owner 21/11 ~01:05Z);
   each player plays crafts through the kinds' ONE result path (kg82Play end: mgGrade → mgIdRes) (host Công + Khéo tay, guest Vẽ + Cắm hoa + Thêu) → her OWN hand b (S.mgB) learns it, the other's does not
   (law 1 two-way: the same rule on each seat); after two merged weeks each hand is still her own. Boot = wear-slots-coop.js (host Fold, guest iPad, live Worker).
   usage: python3 dev/build/assemble.py && node dev/test/coop-mg11-hand.js [workerURL] [level=9]. Exit 1 on a miss. */
const {chromium}=require('playwright');const {serve,BASE}=require('./coop-serve.js');const fs=require('fs'),path=require('path');
const WURL=process.argv[2]||'https://ctm-coop.victoria-tntt.workers.dev';const LVL=+(process.argv[3]||9);const SWAP=+(process.argv[4]||0);
const res=[];const ok=(c,m,x)=>{res.push([!!c,m]);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x).slice(0,c?300:2500):''))};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const TRIPSRC=process.env.TRIP?fs.readFileSync(path.join(__dirname,'coop-thin-trip.js'),'utf8'):null;
const REALL=require('./lib/coop-real.js');async function mk(b,name,vp,want){const ctx=await b.newContext({viewport:{width:vp[0],height:vp[1]},deviceScaleFactor:process.env.SHOTS?2:1,reducedMotion:'reduce'});await serve(ctx);await REALL.origin(ctx,name==='host'?'a':'b');
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
 await REALL.realize(H,G,()=>week(H,G,'set-up week'),ok);

 const NEW=["theu","kim","ve","hoa","td_cong"];
 for(const o of [H,G]){const ks=await o.p.evaluate(()=>typeof mgCalKinds==="function"?mgCalKinds():[]);const miss=NEW.filter(k=>!ks.includes(k));ok(!miss.length,o.name+': Thử tay lists the craft kinds + Thêu',miss.length?{miss,n:ks.length}:ks.length)}
 const snap=o=>o.p.evaluate(()=>JSON.parse(JSON.stringify(S.mgB||{})));
 const play=(o,kind,raw,how)=>o.p.evaluate(([kind,raw,how])=>{for(let i=0;i<3;i++){if(how==="learn")mgPlayLearn(kind,raw);else mgIdRes(kind,mgGrade(raw,kind))}return{b:mgIdB(kind,S),e:S.mgB&&S.mgB[kind]?JSON.parse(JSON.stringify(S.mgB[kind])):null}},[kind,raw,how]);
 const h0=await snap(H),g0=await snap(G);
 /* host plays a scheme board (live path mgPlayLearn, jsgame), guest plays the plant board (live path mgPlayRes, jshelf) — two different new kinds */
 const HK=["td_cong","kim"],GK=["ve","hoa","theu"];for(const k of HK)await play(H,k,9,"res");for(const k of GK)await play(G,k,2,"res");
 const h1=await snap(H),g1=await snap(G);
 const n=(m,k)=>m&&m[k]?(m[k].n|0):0;
 for(const k of HK){ok(n(h1,k)===n(h0,k)+3,'host: her own hand b for '+k+' learns her 3 plays',{before:h0[k]||null,after:h1[k]||null});ok(JSON.stringify(g1[k]||null)===JSON.stringify(g0[k]||null),'guest: the host\'s '+k+' plays do not touch the guest\'s hand',[g0[k]||null,g1[k]||null])}
 for(const k of GK){ok(n(g1,k)===n(g0,k)+3,'guest: her own hand b for '+k+' learns her 3 plays',{before:g0[k]||null,after:g1[k]||null});ok(JSON.stringify(h1[k]||null)===JSON.stringify(h0[k]||null),'host: the guest\'s '+k+' plays do not touch the host\'s hand',[h0[k]||null,h1[k]||null])}
 for(let i=0;i<2;i++)await week(H,G,'craft week '+(i+1));
 const h2=await snap(H),g2=await snap(G);
 ok(HK.every(k=>JSON.stringify(h2[k])===JSON.stringify(h1[k]))&&GK.every(k=>JSON.stringify(g2[k])===JSON.stringify(g1[k])),'after two merged weeks each keeps her own hand (the merge writes neither hand)',{h1,h2,g1,g2});
 ok(HK.every(k=>JSON.stringify(g2[k]||null)===JSON.stringify(g0[k]||null))&&GK.every(k=>JSON.stringify(h2[k]||null)===JSON.stringify(h0[k]||null)),'after two merged weeks the other\'s plays still did not reach her hand');
 for(const o of [H,G])ok(!o.errs.length,o.name+': no page errors',o.errs.slice(0,5));
 const bad=res.filter(r=>!r[0]);console.log(bad.length?`FAIL coop-craft-hand (${bad.length})`:'PASS coop-craft-hand');await b.close();process.exit(bad.length?1:0)})();
