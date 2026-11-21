/* coop-hl-faces (review/coop-host-lag-r2, law 11 the whole lazy-face family): N real rooms (level 0, two seats, the real Worker). For EVERY figure
   (Thái hậu, each consort, her maid, every staff member): the face the host holds is the face the guest holds at the start (within 20 s) and
   after one merged week (within 10 s), and no figure's face is re-drawn by the week. Before r2: 3/8 rooms bad (Thái hậu c29 on the host only
   at the start, re-drawn c22 after week 1; consort c16 on the host vs maid:m34 stored on the guest).
   r2c: a world person given HER portrait (S.pid) before her person reached the host was wiped on her seat by j88 (r5 consort:c19 host / none
   guest, 3/8 rooms on LIVE aee7ff84): now counted (guest-missing after week 1 = bad) and fixed in jcoophl reserveFriend.
   usage: python3 dev/build/assemble.py && N=8 node dev/test/coop-hl-faces.js [workerURL]  → exit 1 if any room is bad */
const {chromium}=require('playwright');const {serve,BASE}=require('./coop-serve.js');const fs=require('fs'),path=require('path');
const WURL=process.argv[2]||'https://ctm-coop.victoria-tntt.workers.dev';const LVL=+(process.argv[3]||9);const SWAP=+(process.argv[4]||0);
const res=[];const ok=(c,m,x)=>{res.push([!!c,m]);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x).slice(0,c?300:2500):''))};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const TRIPSRC=process.env.TRIP?fs.readFileSync(path.join(__dirname,'coop-thin-trip.js'),'utf8'):null;
async function mk(b,name,vp,want){const ctx=await b.newContext({viewport:{width:vp[0],height:vp[1]},deviceScaleFactor:process.env.SHOTS?2:1,reducedMotion:'reduce'});await serve(ctx);
  await ctx.addInitScript(([u,w])=>{window.COOP_URL=u;if(w)try{localStorage.setItem('ctm-thin',String(w))}catch(e){}
   window.__co=()=>{const c=window.COOP;if(!c)return{};return{code:c.code,seat:c.seat,world:typeof S!=='undefined'&&!!S&&!!(window.COOPW&&COOPW.on)}}},[WURL,want]);
  if(TRIPSRC&&name==='guest')await ctx.addInitScript(TRIPSRC);
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
const FACES=()=>{const L=[];const add=(k,p)=>{if(p)L.push([k,p.fid||null])};try{add('th',S.thO);for(const v of rivals||[]){if(!v||v.coop)continue;add('r'+v.id,v);if(v.maid)add('m'+v.id,v.maid);for(const s of v.staff||[])if(s&&!s.coop)add('s'+s.sid,s)}}catch(e){}
 return {L,th:typeof figFor==='function'?figFor({kind:'th'},'fig'):'',ready:typeof figxReady==='function'?figxReady():null,wk:COOP.state&&COOP.state.week,hl:COOPW.hl?JSON.stringify(COOPW.hl.stat):'',log:COOPW.hl?JSON.stringify(COOPW.hl.log.slice(-12)):''}};
async function room(b,ri){const H=await mk(b,'host',[686,880],0),G=await mk(b,'guest',[1180,820],0);
 await H.p.goto(BASE);await H.p.waitForTimeout(3000);await tapText(H,/^(Chơi cùng bạn|Cùng hảo hữu)/);await H.p.waitForTimeout(500);await tapText(H,/^(Mời bạn|Mời hảo hữu)/);
 await until(H,()=>window.COOP&&COOP.code&&COOP.seat==='a');const code=await H.p.evaluate(()=>COOP.code);
 await G.p.goto(BASE+'?room='+code);await G.p.waitForTimeout(3000);await tapText(G,/^(Vào phòng|Tiếp tục)/,4000);
 await until(G,()=>window.COOP&&COOP.seat==='b'&&!COOP.frozen,null,60000);
 const t0=Date.now();while(Date.now()-t0<150000){await clear(H);await clear(G);const a=await H.p.evaluate(()=>__co().world&&rivals.some(v=>v.coop)),c=await G.p.evaluate(()=>__co().world&&rivals.some(v=>v.coop));if(a&&c)break;await sleep(500)}
 const tw=Date.now();let h0,g0;const mm=(h,g)=>{const m=new Map(g.L);return h.L.filter(([k,f])=>f&&m.get(k)!==f).length};while(Date.now()-tw<20000){h0=await H.p.evaluate(FACES);g0=await G.p.evaluate(FACES);if(h0.th&&h0.th===g0.th&&!mm(h0,g0))break;await sleep(400)}
 const gm=new Map(g0.L);const miss0=h0.L.filter(([k,f])=>f&&gm.get(k)!==f).map(([k,f])=>k+':'+f+'/'+gm.get(k));const noF=h0.L.filter(([k,f])=>!f).map(x=>x[0]);
 console.log(`R${ri} ${code} start th host=${h0.th.slice(-22)} guest=${(g0.th||'').slice(-22)} ready=${h0.ready}/${g0.ready} host-no-face=${noF.length} guest-missing=${miss0.length} ${miss0.slice(0,5).join(' ')}`);
 if(!h0.th||h0.th!==g0.th)console.log('  HOSTHL',h0.hl,h0.log);
 await week(H,G,'w1');let h1,g1;{const t1=Date.now();while(Date.now()-t1<10000){h1=await H.p.evaluate(FACES);g1=await G.p.evaluate(FACES);const m=new Map(g1.L);if(!h1.L.filter(([k,f])=>f&&m.get(k)!==f).length)break;await sleep(400)}}const hm0=new Map(h0.L);
 const redraw=h1.L.filter(([k,f])=>hm0.get(k)&&f&&hm0.get(k)!==f).map(([k,f])=>k+':'+hm0.get(k)+'>'+f);const gm1=new Map(g1.L);const miss1=h1.L.filter(([k,f])=>f&&gm1.get(k)!==f).map(([k,f])=>k);
 if(miss1.length||miss0.length){const ks=miss1.concat(miss0.map(x=>x.split(':')[0]));const info=async o=>o.p.evaluate(ks=>{const out={};for(const k of ks){if(k[0]!=='r')continue;const v=rivals.find(x=>x&&('r'+x.id)===k);const c=COOPW.hl.canon();out[k]={fid:v&&v.fid,canon:c.R[k.slice(1)]&&c.R[k.slice(1)].fid,name:v&&v.name}}return {out,stat:JSON.stringify(COOPW.hl.stat),log:JSON.stringify(COOPW.hl.log.slice(-10))}},ks);console.log('  HOSTI',JSON.stringify(await info(H)));console.log('  GUESTI',JSON.stringify(await info(G)))}
 console.log(`R${ri} w1 th host=${h1.th.slice(-22)} guest=${(g1.th||'').slice(-22)} redrawn=${redraw.length} ${redraw.slice(0,5).join(' ')} guest-missing=${miss1.length} ${miss1.slice(0,5).join(' ')}`);
 if(redraw.length)console.log('  HOSTHL1',h1.hl,h1.log);
 await H.ctx.close();await G.ctx.close();return {bad:(!h0.th||h0.th!==g0.th||redraw.length>0||miss1.length>0/* r2c: a face the guest still lacks or holds differently after the week = a split */)}}
(async()=>{const b=await chromium.launch();let bad=0;const N=+(process.env.N||6);for(let i=0;i<N;i++){try{const r=await room(b,i);if(r.bad)bad++}catch(e){console.log('R'+i+' EXC',e.message.slice(0,200))}}console.log('coop-hl-faces rooms',N,'bad',bad);await b.close();process.exit(bad?1:0)})();
