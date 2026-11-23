/* coop-mg11-hand (B LANDER, CO-OP LAND GATE for review/mg11-thutay-r1): both seats list the 7 MG11 kinds in «Thử tay»; each player plays a NEW kind
   through its live result path (host «Nghe ngóng» mgPlayLearn, guest «Tưới cây» mgPlayRes) → her OWN hand b (S.mgB) learns it, the other's does not
   (law 1 two-way: the same rule on each seat); after two merged weeks each hand is still her own. Boot = wear-slots-coop.js (host Fold, guest iPad, live Worker).
   usage: python3 dev/build/assemble.py && node dev/test/coop-mg11-hand.js [workerURL] [level=9]. Exit 1 on a miss. */
const {chromium}=require('playwright');const {serve,BASE}=require('./coop-serve.js');const fs=require('fs'),path=require('path');
const WURL=process.argv[2]||'https://ctm-coop.victoria-tntt.workers.dev';const LVL=+(process.argv[3]||9);const SWAP=+(process.argv[4]||0);
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

 const NEW=["nghe","truyen","mac","thoico","thu_tam","thu_choi","tuoi"];
 for(const o of [H,G]){const ks=await o.p.evaluate(()=>typeof mgCalKinds==="function"?mgCalKinds():[]);const miss=NEW.filter(k=>!ks.includes(k));ok(!miss.length,o.name+': Thử tay lists the 7 MG11 kinds',miss.length?{miss,n:ks.length}:ks.length)}
 const snap=o=>o.p.evaluate(()=>JSON.parse(JSON.stringify(S.mgB||{})));
 const play=(o,kind,raw,how)=>o.p.evaluate(([kind,raw,how])=>{for(let i=0;i<3;i++){if(how==="learn")mgPlayLearn(kind,raw);else mgPlayRes(kind,raw)}return{b:mgIdB(kind,S),e:S.mgB&&S.mgB[kind]?JSON.parse(JSON.stringify(S.mgB[kind])):null}},[kind,raw,how]);
 const h0=await snap(H),g0=await snap(G);
 /* host plays a scheme board (live path mgPlayLearn, jsgame), guest plays the plant board (live path mgPlayRes, jshelf) — two different new kinds */
 const hp=await play(H,"nghe",10,"learn"),gp=await play(G,"tuoi",1,"res");
 const h1=await snap(H),g1=await snap(G);
 const n=(m,k)=>m&&m[k]?(m[k].n|0):0;
 ok(n(h1,"nghe")===n(h0,"nghe")+3,'host: her own hand b for «Nghe ngóng» learns her 3 plays',{before:h0.nghe||null,after:h1.nghe||null,b:hp.b});
 ok(n(g1,"tuoi")===n(g0,"tuoi")+3,'guest: her own hand b for «Tưới cây» learns her 3 plays',{before:g0.tuoi||null,after:g1.tuoi||null,b:gp.b});
 ok(JSON.stringify(g1.nghe||null)===JSON.stringify(g0.nghe||null),'guest: the host\'s «Nghe ngóng» plays do not touch the guest\'s hand',[g0.nghe||null,g1.nghe||null]);
 ok(JSON.stringify(h1.tuoi||null)===JSON.stringify(h0.tuoi||null),'host: the guest\'s «Tưới cây» plays do not touch the host\'s hand',[h0.tuoi||null,h1.tuoi||null]);
 const hb=await H.p.evaluate(()=>mgIdB("nghe",S)),gb=await G.p.evaluate(()=>mgIdB("tuoi",S));
 /* her identity offset reads her own hand: two-way, the same rule on each seat */
 const off=await H.p.evaluate(()=>({h:mgIdOff("nghe",S),cls:mgIdClass(S,"nghe")}));const offG=await G.p.evaluate(()=>({g:mgIdOff("tuoi",S),cls:mgIdClass(S,"tuoi")}));
 console.log('   hands',JSON.stringify({hb,gb,off,offG}));
 for(let i=0;i<2;i++)await week(H,G,'mg11 week '+(i+1));
 const h2=await snap(H),g2=await snap(G);
 ok(JSON.stringify(h2.nghe)===JSON.stringify(h1.nghe)&&JSON.stringify(g2.tuoi)===JSON.stringify(g1.tuoi),'after two merged weeks each keeps her own hand (the merge writes neither hand)',{h:[h1.nghe,h2.nghe],g:[g1.tuoi,g2.tuoi]});
 ok(JSON.stringify(g2.nghe||null)===JSON.stringify(g0.nghe||null)&&JSON.stringify(h2.tuoi||null)===JSON.stringify(h0.tuoi||null),'after two merged weeks the other\'s plays still did not reach her hand',{gNghe:g2.nghe||null,hTuoi:h2.tuoi||null});
 for(const o of [H,G])ok(!o.errs.length,o.name+': no page errors',o.errs.slice(0,5));
 const bad=res.filter(r=>!r[0]);console.log(bad.length?`FAIL coop-mg11-hand (${bad.length})`:'PASS coop-mg11-hand');await b.close();process.exit(bad.length?1:0)})();
