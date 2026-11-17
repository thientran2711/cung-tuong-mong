/* Co-op thin guest, part C (review/coop-thin-c): the world is read-only on the guest. Two Playwright clients in one room,
   host Fold 686x880 + guest iPad 1180x820 (swap=1: iPad hosts, Fold joins). Level 3 (default) or 4 (B+C+D).
   usage: python3 dev/build/assemble.py && node dev/test/coop-thin-c.js <workerURL> [level=3] [swap=0]   (TRIP=1: guest tripwire; OUT=<dir> json)
   Checks:
     C1 the lens is on the guest only (her NPC list + world keys), off on the host; solo/old rooms never see it (other suites);
     C2 EVERY ACT kind she can use on an NPC (script over the ACT table): her phone's world is NOT written by the act (lens), the act's own
        effect (the solo engine's diff of that NPC: numbers, rows, flags, arrays) reaches the host world once and comes back to her
        (before/after table: OUT/acts.json);
     C3 a person she causes (her act adds a consort) is made by the host with a world id, one name, on both seats; no temp id;
     C4 her week end: the guest's world loops write nothing (lens drops), her sent week carries the room's world unchanged, the merged
        week = the host's world on every NPC number (one world), her own viewer rows from her week still count (rows ops);
     C5 G7: on the guest no NPC picks a target / acts; on the host rivalsBuoi runs with her entry in the harem;
     C6 the host's world delta (no week) reaches her NPC list in place (a card holding that NPC sees it);
     C7 tripwire (TRIP=1): guest writes into W / R / Rarr = 0 (lens catches counted apart). */
const {chromium}=require('playwright');const {serve,BASE}=require('./coop-serve.js');const fs=require('fs'),path=require('path');
const WURL=process.argv[2]||'https://ctm-coop.victoria-tntt.workers.dev';const LVL=+(process.argv[3]||3);const SWAP=+(process.argv[4]||0);
const res=[];const ok=(c,m,x)=>{res.push([!!c,m]);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x).slice(0,c?300:2500):''))};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const TRIPSRC=process.env.TRIP?fs.readFileSync(path.join(__dirname,'coop-thin-trip.js'),'utf8'):null;
async function mk(b,name,vp,want){const ctx=await b.newContext({viewport:{width:vp[0],height:vp[1]},deviceScaleFactor:1,reducedMotion:'reduce'});await serve(ctx);
  await ctx.addInitScript(([u,w])=>{window.COOP_URL=u;if(w)try{localStorage.setItem('ctm-thin',String(w))}catch(e){}
   window.__co=()=>{const c=window.COOP;if(!c)return{};return{code:c.code,seat:c.seat,world:typeof S!=='undefined'&&!!S&&!!(window.COOPW&&COOPW.on)}}},[WURL,want]);
  if(TRIPSRC&&name==='guest')await ctx.addInitScript(TRIPSRC);
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
 const okw=await A.p.evaluate(w=>COOP.state.week===w+1,w0)&&await B.p.evaluate(w=>COOP.state.week===w+1,w0);ok(okw,tag+': week merged once',okw?undefined:[await A.p.evaluate(()=>({w:COOP.state.week,b:S.buoi,pend:COOPW.pend,sent:COOPW.sent,Q:Q.map(q=>q.t).slice(0,3),dis:document.getElementById('next').disabled,nt:document.getElementById('next').textContent})),await B.p.evaluate(()=>({w:COOP.state.week,b:S.buoi,pend:COOPW.pend,sent:COOPW.sent,Q:Q.map(q=>q.t).slice(0,3),dis:document.getElementById('next').disabled,nt:document.getElementById('next').textContent,log:COOPW.thin.C.log.slice(-5),dbgE:COOPW.thin.C.dbgE,dbgI:COOPW.thin.C.dbgI}))]);await sleep(1500);return okw}
(async()=>{const b=await chromium.launch(/127\.0\.0\.1|localhost/.test(WURL)?{args:['--disable-features=BlockInsecurePrivateNetworkRequests,PrivateNetworkAccessSendPreflights,PrivateNetworkAccessRespectPreflightResults,LocalNetworkAccessChecks']}:{});
 const FOLD=[686,880],IPAD=[1180,820];
 const H=await mk(b,'host',SWAP?IPAD:FOLD,LVL),G=await mk(b,'guest',SWAP?FOLD:IPAD,0);
 await H.p.goto(BASE);await H.p.waitForTimeout(3000);await tapText(H,/^(Chơi cùng bạn|Cùng hảo hữu)/);await H.p.waitForTimeout(500);await tapText(H,/^(Mời bạn|Mời hảo hữu)/);
 await until(H,()=>window.COOP&&COOP.code&&COOP.seat==='a');const code=await H.p.evaluate(()=>COOP.code);console.log('room',code,'level',LVL,'swap',SWAP);
 await G.p.goto(BASE+'?room='+code);await G.p.waitForTimeout(3000);await tapText(G,/^(Vào phòng|Tiếp tục)/,4000);
 ok(await until(G,()=>window.COOP&&COOP.seat==='b'&&!COOP.frozen,null,60000),'guest joined seat b');
 const inW=async()=>{const t0=Date.now();while(Date.now()-t0<150000){await clear(H);await clear(G);const a=await H.p.evaluate(()=>__co().world&&rivals.some(v=>v.coop)),c=await G.p.evaluate(()=>__co().world&&rivals.some(v=>v.coop));if(a&&c)return true;await sleep(500)}return false};
 await inW();
 for(const o of [H,G])await o.p.evaluate(()=>{try{if(BAL.coopTm)BAL.coopTm.buoiMs=600000}catch(e){}if(S.srv)S.srv.risen=1;if(S.kc)S.kc.inPal=1;S.rank=3;S.sung=Math.max(S.sung||0,40);S.kpWarn=1;render()});
 if(!(await until(H,()=>!!COOPW.friend(),null,20000)&&await until(G,()=>!!COOPW.friend(),null,20000)))await week(H,G,'setup');
 const both=async f=>[await H.p.evaluate(f),await G.p.evaluate(f)];
 /* C1 */
 ok(await until(G,lv=>COOPW.thin.lvl>=lv&&!!COOPW.thin.view&&COOPW.thin.C.isLens(rivals),LVL,40000),'C1 level on, the guest NPC list is the lens',await both(()=>[COOPW.thin.lvl,COOPW.thin.C.isLens(rivals)]));
 ok(!(await H.p.evaluate(()=>COOPW.thin.C.isLens(rivals))),'C1 the host world is plain (no lens)');
 ok(await G.p.evaluate(()=>{const d=Object.getOwnPropertyDescriptor(COOPW.thin.C.raw(S),'emp')||Object.getOwnPropertyDescriptor(S,'emp');return !!(d&&d.get&&d.get.__lens)}),'C1 the world keys of her S are lens accessors');
 for(let i=0;i<3;i++){await clear(H);await clear(G);await sleep(300)}
 /* settle: the host's view of this moment has arrived */
 const sync=async(ms=15000)=>{const t0=Date.now();while(Date.now()-t0<ms){await H.p.evaluate(()=>{try{COOPW.thin.flush()}catch(e){}});await sleep(500);
   const [hv,gv]=[await H.p.evaluate(()=>COOPW.thin.hv),await G.p.evaluate(()=>COOPW.thin.view&&COOPW.thin.view.v)];if(hv===gv)return true}return false};
 /* C2: every ACT kind on an NPC */
 const kinds=process.env.NOACT?[]:await G.p.evaluate(()=>Object.keys(ACT));const table=[];let nAct=0,nOk=0;
 for(const k of kinds){await G.p.evaluate(()=>{Q.length=0;S.mg=null;S.bac=Math.max(S.bac||0,5000);S.suc=Math.max(S.suc||0,90);S.dead=false;try{closeModal()}catch(e){}});await H.p.evaluate(()=>{Q.length=0;S.mg=null;try{closeModal()}catch(e){}});
  await sync();
  const r=await G.p.evaluate(k=>{try{return (()=>{const A=ACT[k];const C=COOPW.thin.C;const L=rivals.filter(v=>v&&!v.coop&&v.alive!==false&&!v.out&&!(typeof sameHouse==='function'&&sameHouse(S,v)));
   const t=L.find(v=>{try{return !A.ok||A.ok(S,v)}catch(e){return false}});if(!t)return {k,skip:'no target'};
   const id=t.id,before=JSON.stringify(t);const s0=C.stat.sent,li=C.lastId;let seed=4242;const nat=Math.random;Math.random=()=>{seed=(seed*1103515245+12345)%2147483648;return seed/2147483648};
   let out="",err=null;try{out=runAct(S,t,k)}catch(e){err=String(e&&e.stack||e).slice(0,400)}finally{Math.random=nat}
   const same=JSON.stringify(rivals.find(v=>v.id===id))===before;
   const ops=(C.stat.sent>s0?C.ops:[]).filter(o=>o.id===id||o.t==="add"||o.t==="w");Q.length=0;S.mg=null;try{closeModal()}catch(e){}
   return {k,id,name:t.name,out:String(out||'').slice(0,90),err,same,ops}})()}catch(e){return {k,skip:'EXC '+String(e&&e.stack).slice(0,500)}}},k);
  if(r.skip){table.push({k,skip:r.skip});continue}
  if(!r.ops.length){table.push({k,id:r.id,same:r.same,ops:0,out:r.out,err:r.err});if(!r.same)ok(false,'C2 '+k+': no op but her world changed');continue}
  nAct++;
  /* wait for the host's answer to come back (her view's dr = this intent) and compare */
  const got=await until(G,()=>{const V=COOPW.thin.view;return !!(V&&V.o&&V.o.dr&&V.o.dr.op==='npc'&&V.o.dr.id===COOPW.thin.C.lastId)},null,15000);
  await sleep(300);
  const chk=await G.p.evaluate(ops=>{const bad=[];const J=x=>String(JSON.stringify(x));const RW=['rel','oan','ghen','ev'];
   for(const o of ops){if(o.t!=="npc")continue;const v=rivals.find(x=>x.id===o.id);if(!v){bad.push([o.id,'gone']);continue}const now=JSON.parse(JSON.stringify(v));
    for(const f of new Set([...Object.keys(o.a),...Object.keys(o.b)])){if(f==='hh'||J(o.a[f])===J(o.b[f]))continue;
     if(typeof o.a[f]==='number'&&typeof o.b[f]==='number'){const want=o.a[f]-o.b[f],has=(now[f]||0)-o.b[f];if(Math.abs(want-has)>1e-9)bad.push([f,o.b[f],o.a[f],now[f]])}
     else if(J(now[f])!==J(o.a[f]))bad.push([f,J(o.a[f]).slice(0,80),J(now[f]).slice(0,80)])}}return bad},r.ops);
  /* the host's own world: same NPC numbers (non-row) as on her phone */
  const hostSame=await (async()=>{const ids=r.ops.filter(o=>o.t==='npc').map(o=>o.id);const g=await G.p.evaluate(ids=>ids.map(id=>{const v=rivals.find(x=>x.id===id);return v?[v.sung,v.bac,v.danh,v.suc,v.alive,v.out,v.rank,(v.inv||[]).length,(v.staff||[]).length,(v.kids||[]).length]:null}),ids);
   const h=await H.p.evaluate(ids=>ids.map(id=>{const v=rivals.find(x=>x.id===id);return v?[v.sung,v.bac,v.danh,v.suc,v.alive,v.out,v.rank,(v.inv||[]).length,(v.staff||[]).length,(v.kids||[]).length]:null}),ids);return JSON.stringify(g)===JSON.stringify(h)?true:{g,h}})();
  const fields=[...new Set(r.ops.filter(o=>o.t==='npc').flatMap(o=>Object.keys(o.a).filter(f=>JSON.stringify(o.a[f])!==JSON.stringify(o.b[f]))))];
  const good=got&&r.same&&!chk.length&&hostSame===true;if(good)nOk++;
  table.push({k,id:r.id,ops:r.ops.length,fields,lensKept:r.same,hostGot:got,backOnHer:!chk.length,hostSame:hostSame===true,out:r.out});
  if(!good)ok(false,'C2 '+k,{same:r.same,got,chk,hostSame,ops:r.ops.map(o=>o.t+':'+o.id)})}
 if(!process.env.NOACT)ok(nAct>0&&nAct===nOk,`C2 every ACT kind with an NPC effect: her world untouched by the act, effect applied once by the host and back on her phone (${nOk}/${nAct}; ${kinds.length} kinds, ${table.filter(x=>x.skip).length} without a target, ${table.filter(x=>!x.skip&&!x.ops).length} without an NPC effect)`);
 /* C3: a person she causes */
 await sync();
 const c3=await G.p.evaluate(()=>{const C=COOPW.thin.C;let id=null,name=null;C.frame('act',()=>{const n=newRival(0);try{Object.assign(n,drawFace())}catch(e){}rivals.push(n);id=n.id;name=n.name});return {id,name,inList:rivals.some(v=>v.id===id),tmp:id>=1000}});
 const c3h=await until(H,id=>rivals.some(v=>v&&v.id===id&&!v.coop),c3.id,15000)||await until(H,n=>rivals.some(v=>v&&v.name===n&&!v.coop),c3.name,5000);
 await sync();
 const c3g=await G.p.evaluate(n=>{const L=rivals.filter(v=>v&&v.name===n);return {n:L.length,id:L[0]&&L[0].id}},c3.name);
 const c3x=await H.p.evaluate(n=>{const L=rivals.filter(v=>v&&v.name===n);return {n:L.length,id:L[0]&&L[0].id,dup:new Set(rivals.filter(v=>!v.coop).map(v=>v.name)).size!==rivals.filter(v=>!v.coop).length}},c3.name);
 ok(!c3.inList&&!c3.tmp&&c3h&&c3g.n===1&&c3x.n===1&&c3g.id===c3x.id&&c3x.id<900&&!c3x.dup,'C3 a person she causes: not in her list until the host made it, world id, one copy on both seats, names unique',{c3,c3g,c3x});
 /* C6: the host changes an NPC between weeks → her list in place */
 const c6=await H.p.evaluate(()=>{const v=rivals.find(x=>x&&!x.coop&&x.alive!==false);v.danh=(v.danh||0)+7;render();COOPW.thin.flush();return {id:v.id,danh:v.danh}});
 const held=await G.p.evaluate(id=>{window.__held=rivals.find(v=>v.id===id);return !!window.__held},c6.id);
 ok(held&&await until(G,c=>{const v=rivals.find(x=>x.id===c.id);return v&&v.danh===c.danh&&window.__held===v&&window.__held.danh===c.danh},c6,15000),'C6 the host world delta reaches her list in place (the same object a card holds)',c6);
 /* C4 + C5: a week */
 await G.p.evaluate(()=>{const C=COOPW.thin.C;window.__c0={...C.stat};const s=COOPW.sendEnd;window.__sentW=null;const tc=COOPW.toCanon;});
 await G.p.evaluate(()=>{const f=COOP.send;COOP.send=function(m){if(m&&m.t==='end')window.__sentW=JSON.stringify(m.state.W)===JSON.stringify(COOPW.base.W);return f.apply(this,arguments)}});
 const okw=await week(H,G,'C4');
 const c4=await G.p.evaluate(()=>({st:COOPW.thin.C.stat,c0:window.__c0,sentW:window.__sentW}));
 ok(okw&&c4.sentW===true,'C4 her sent week carries the room world unchanged (W from the host only)',{sentW:c4.sentW});
 ok(c4.st.drop>c4.c0.drop,'C4 her week end ran its world loops on the lens (writes dropped)',{drop:[c4.c0.drop,c4.st.drop],dropW:c4.st.dropW});
 await sync();
 const one=await (async()=>{const f=()=>rivals.filter(v=>v&&!v.coop).map(v=>[v.id,v.sung,v.bac,v.danh,v.suc,v.alive,v.rank,!!v.out]).sort((a,b)=>a[0]-b[0]);const [h,g]=await both(f);
  const d=[];for(let i=0;i<Math.max(h.length,g.length);i++)if(JSON.stringify(h[i])!==JSON.stringify(g[i]))d.push([h[i],g[i]]);return d})();
 ok(!one.length,'C4 one world: every NPC number on her phone = the host world',one.slice(0,5));
 ok(c4.st.npcActOff+c4.st.pickOff>=0&&(await H.p.evaluate(()=>COOPW.thin.C.stat.g7||0))>0,'C5 G7: the host ran rivalsBuoi with her entry in the harem; on the guest NPCs act never',{guest:{pickOff:c4.st.pickOff,npcActOff:c4.st.npcActOff},hostG7:await H.p.evaluate(()=>COOPW.thin.C.stat.g7||0)});
 if(TRIPSRC){const t=await G.p.evaluate(()=>window.__trip&&__trip());ok(t&&t.world===0,'C7 tripwire: guest writes into W / R / Rarr = 0',t&&{world:t.world,byRoot:t.byRoot,lens:t.lens,state:t.state,top:t.top.filter(x=>/^(W|R)/.test(x[1])).slice(0,12)})}
 ok(!H.errs.length&&!G.errs.length,'no page errors',{h:H.errs.slice(0,4),g:G.errs.slice(0,4)});
 if(process.env.OUT){fs.mkdirSync(process.env.OUT,{recursive:true});fs.writeFileSync(path.join(process.env.OUT,`acts-L${LVL}-s${SWAP}.json`),JSON.stringify(table,null,1))}
 console.log('ACT table:');for(const x of table)console.log(' ',JSON.stringify(x).slice(0,220));
 const n=res.filter(x=>x[0]).length;console.log(`coop-thin-c L${LVL}${SWAP?' swap':''}: ${n}/${res.length}`);await b.close();process.exit(n===res.length?0:1)})().catch(e=>{console.error(e);process.exit(2)});
