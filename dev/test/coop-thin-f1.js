/* Co-op thin guest, part F1 (review/coop-thin-f1): her Hành động acts are intents run on the host. Two Playwright clients in one room,
   host Fold 686x880 + guest iPad 1180x820 (swap=1: iPad hosts, Fold joins). Level 6 (default).
   usage: python3 dev/build/assemble.py && node dev/test/coop-thin-f1.js <workerURL> [level=6] [swap=0]   (TRIP=1, OUT=<dir>, KINDS=a,b, NOACT=1)
   F0 level on · F1 every ACT kind from the guest (script over the ACT table; before/after table): runAct returns "" on her phone, her world
   untouched, no NPC op / res sent, the host ran it ONCE in her context, the answer back in one view, the NPC + her person the same on both
   phones · F2 acts on the friend both directions (pet care / steal, gift, steal an item, harm a kid) · F8 one switch · no page errors. */
const {chromium}=require('playwright');const {serve,BASE}=require('./coop-serve.js');const fs=require('fs'),path=require('path');
const WURL=process.argv[2]||'https://ctm-coop.victoria-tntt.workers.dev';const LVL=+(process.argv[3]||6);const SWAP=+(process.argv[4]||0);
const res=[];const ok=(c,m,x)=>{res.push([!!c,m]);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x).slice(0,c?300:2500):''))};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const TRIPSRC=process.env.TRIP?fs.readFileSync(path.join(__dirname,'coop-thin-trip.js'),'utf8'):null;
const REALL=require('./lib/coop-real.js');async function mk(b,name,vp,want){const ctx=await b.newContext({viewport:{width:vp[0],height:vp[1]},deviceScaleFactor:process.env.SHOTS?2:1,reducedMotion:'reduce'});await serve(ctx);await REALL.origin(ctx,name==='host'?'a':'b');
  await ctx.addInitScript(([u,w])=>{window.COOP_URL=u;if(w)try{localStorage.setItem('ctm-thin',String(w))}catch(e){}
   window.__co=()=>{const c=window.COOP;if(!c)return{};return{code:c.code,seat:c.seat,world:typeof S!=='undefined'&&!!S&&!!(window.COOPW&&COOPW.on)}}},[WURL,want]);
  if(TRIPSRC&&name==='guest')await ctx.addInitScript(TRIPSRC);
  if(process.env.UISCAN&&name==='host')await ctx.addInitScript(fs.readFileSync(path.join(__dirname,'coop-thin-uiscan.js'),'utf8'));/* hostnull: the host-side UI scan of her runs */
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
 for(const o of [H,G])await o.p.evaluate(()=>{try{if(BAL.coopTm)BAL.coopTm.buoiMs=600000}catch(e){}if(S.srv)S.srv.risen=1;if(S.kc)S.kc.inPal=1;S.rank=3;/* the test's rank is staged, not earned: her rank set counted as seen (jpromo prCheck), else the host gives it at her first act (L13) and the twin differs */S.prSeen={r:3,s:null};S.sung=Math.max(S.sung||0,40);S.kpWarn=1;render()});
 if(!(await until(H,()=>!!COOPW.friend(),null,20000)&&await until(G,()=>!!COOPW.friend(),null,20000)))await week(H,G,'setup');
 await REALL.realize(H,G,()=>week(H,G,'setup'),ok);
 const both=async f=>[await H.p.evaluate(f),await G.p.evaluate(f)];
 ok(await until(G,lv=>COOPW.thin.lvl>=lv&&!!COOPW.thin.view&&COOPW.thin.C.isLens(rivals),LVL,40000),'F0 level on, the guest NPC list is the lens',await both(()=>[COOPW.thin.lvl,COOPW.thin.C.isLens(rivals)]));
 for(let i=0;i<3;i++){await clear(H);await clear(G);await sleep(300)}
 /* settle: the host's view of this moment has arrived */
 const sync=async(ms=15000)=>{const t0=Date.now();while(Date.now()-t0<ms){await H.p.evaluate(()=>{try{COOPW.thin.flush()}catch(e){}});await sleep(500);
   const [hv,gv]=[await H.p.evaluate(()=>COOPW.thin.hv),await G.p.evaluate(()=>COOPW.thin.view&&COOPW.thin.view.v)];if(hv===gv)return true}return false};
 const STAGE={musk:{h:'t.preg=3;t.hidden=0'},catswap:{h:'t.preg=7;t.hidden=0;delete t.catplot'},
  kpoison:{h:"t.kids=(t.kids||[]).concat([mkKid('f',4)])"},pond:{h:"t.kids=(t.kids||[]).concat([mkKid('f',4)])"},kframe:{h:"t.kids=(t.kids||[]).concat([mkKid('m',8)])"},
  vp:{h:"const k=Object.keys(IT).find(k=>IT[k].sl&&itm(k).sl&&itm(k).rk>rkOf(t)&&!itm(k).nt);t.inv=(t.inv||[]).concat([{k}]);wear(t,t.inv.length-1)",g:"S.wdSeen=S.wdSeen||{};const st=wdStatus(t);S.wdSeen[wdKey(t)]={st:st&&st!=='ok'?st:'over',w:wk(),it:wdCur(t)}"},plant:{},
  takeaway:{h:"t.rank=Math.min(t.rank||0,1);t.kids=(t.kids||[]).concat([mkKid('f',2)])"},phatquy:{h:'t.rank=0;delete t.pen'},
  accuse:{h:'t.ev=9'},tocao:{h:'t.schemes=1;t.ev=3'},expose:{h:'t.scandal=1;t.ev=5'},trinhth:{h:'t.ev=3'},uyhiep:{h:'t.ev=3;t.bac=Math.max(t.bac||0,50)'},banphe:{h:'t.ev=3'},tieuhuy:{h:'t.ev=3'},
  xinhh:{h:'const q=rivals[0];q.queen=true;q.alive=true;q.out=0;q.rel=80;t.rank=Math.max(t.rank||0,1)'},trinhhh:{h:'const q=rivals[0];q.queen=true;q.alive=true;q.out=0;t.ev=4'},
  tat:{h:'t.rank=Math.min(t.rank||0,1);delete t.slap',g:"S.place='vuon';S.where=S.where||{};S.where[t.id]='vuon'"},trip:{g:"S.place='vuon';S.where=S.where||{};S.where[t.id]='vuon'"},pushp:{g:"S.place='vuon';S.where=S.where||{};S.where[t.id]='vuon'"},
  steal:{g:'S.tonight=t;delete S.ntTry;delete S.ntk'},road:{g:'S.tonight=t;delete S.ntTry;delete S.ntk'},bribel:{g:'if(!S.maid&&S.staff&&S.staff[0])S.maid=S.staff[0];if(S.maid){S.maid.loyal=60;delete S.maid.spyFor}',h:"if(!t.maid){const o=rivals.find(x=>x&&x.maid&&x!==t&&!x.coop);if(o)t.maid=Object.assign(JSON.parse(JSON.stringify(o.maid)),{sid:800+t.id})}"},
  laydo:{h:"const k=Object.keys(IT).find(k=>{const e={k};return loOk(e)});t.inv=(t.inv||[]).concat([{k}])"},laydol:{h:"const k=Object.keys(IT).find(k=>{const e={k};return loOk(e)});t.inv=(t.inv||[]).concat([{k}])",g:'if(S.maid){S.maid.loyal=60;delete S.maid.spyFor}'},
  blockf:{h:'delete t.block;const v=rivals.find(x=>x&&x!==t&&!x.coop&&x.alive!==false&&!x.out&&x.id<900);if(v)v.rel=95'},phonghoa:{h:"t.out=0;t.inv=(t.inv||[]).concat([{k:'tranhco'}])"},
  thaopet:{h:"t.pets=[{t:Object.keys(PET)[0],from:'',src:'',care:80,at:tsbWk()}]"},petcare:{h:"t.pets=[{t:Object.keys(PET)[0],from:'',src:'',care:80,at:tsbWk()}]"},petsteal:{h:"t.pets=[{t:Object.keys(PET)[0],from:'',src:'',care:80,at:tsbWk()}]"}};
 /* F1: every ACT kind on an NPC, from the guest: never run on her phone, run once on the host in her context, back to her in one view */
 await G.p.evaluate(()=>{S.inv=S.inv||[];for(const k of ['yensao','yensao','yensao','hacdinh','hacdinh'])S.inv.push({k});if(S.maid){S.maid.loyal=60;delete S.maid.spyFor}});
 const kinds=process.env.NOACT?[]:(await G.p.evaluate(()=>Object.keys(ACT))).filter(k=>!process.env.KINDS||process.env.KINDS.split(',').includes(k));const table=[];let nAct=0,nOk=0;
 const npcOf=(o,id)=>o.p.evaluate(id=>{const v=rivals.find(x=>x&&x.id===id&&!x.coop);return v?JSON.parse(JSON.stringify(v,(k,x)=>k==='hh'?undefined:x)):null},id);
 const herS=o=>o.p.evaluate(()=>({bac:S.bac,danh:S.danh,sung:S.sung,duc:S.duc,suc:S.suc,tamco:S.tamco,inv:(S.inv||[]).length,log:String((S.logs||[])[0]||'').replace(/<[^>]+>/g,'').slice(0,120),logs:(S.logs||[]).slice(0,8).map(x=>String(x).replace(/<[^>]+>/g,''))}));
 const hostHer=()=>H.p.evaluate(()=>{const B=COOPW.thin.seatOf('b');const s=B&&B.S||{};return {bac:s.bac,danh:s.danh,sung:s.sung,duc:s.duc,suc:s.suc,tamco:s.tamco,inv:(s.inv||[]).length,log:String((s.logs||[])[0]||'').replace(/<[^>]+>/g,'').slice(0,120),logs:(s.logs||[]).slice(0,8).map(x=>String(x).replace(/<[^>]+>/g,''))}});
 const dd=(B,A2)=>{const o=[];const d=(x,y,p)=>{if(JSON.stringify(x)===JSON.stringify(y))return;if(x&&y&&typeof x==='object'&&typeof y==='object'&&!Array.isArray(x)&&!Array.isArray(y)){for(const f of new Set([...Object.keys(x),...Object.keys(y)]))d(x[f],y[f],p+'.'+f);return}o.push(p)};d(B,A2,'');return o};
 for(const k of kinds){await G.p.evaluate(()=>{Q.length=0;S.mg=null;S.confined=0;S.rank=Math.max(S.rank||0,4);S.bac=Math.max(S.bac||0,5000);S.suc=Math.max(S.suc||0,90);S.dead=false;try{closeModal()}catch(e){}});await H.p.evaluate(()=>{Q.length=0;S.mg=null;try{closeModal()}catch(e){}});
  await sync();
  let st=null;const has=await G.p.evaluate(k=>{const A=ACT[k];return rivals.some(v=>v&&!v.coop&&v.alive!==false&&!v.out&&!(typeof sameHouse==='function'&&sameHouse(S,v))&&(()=>{try{return !A.ok||A.ok(S,v)}catch(e){return false}})())},k);
  if(!has&&STAGE[k]){const pk=await G.p.evaluate(()=>{const q=rivals[0];return (rivals.filter(v=>v&&!v.coop&&v!==q&&v.alive!==false&&!v.out&&!(typeof sameHouse==='function'&&sameHouse(S,v))&&!v.queen).sort((a,b)=>(a.rank||0)-(b.rank||0))[0]||{}).id},null);
   if(pk!=null){const sg=STAGE[k];if(sg.h)st=await H.p.evaluate(([id,src])=>{try{return COOPW.thin.withSeat('b',()=>{const t=rivals.find(v=>v&&v.id===id&&!v.coop);if(!t)return 'gone';(0,eval)('(function(t){'+src+'})')(t);return 'ok'})}catch(e){return 'EXC '+e.message}},[pk,sg.h]);
    await H.p.evaluate(()=>{try{COOPW.thin.flush()}catch(e){}});await sync();
    if(sg.g)await G.p.evaluate(([id,src])=>{const t=rivals.find(v=>v&&v.id===id);(0,eval)('(function(t){'+src+'})')(t)},[pk,sg.g]);st={id:pk,h:st}}}
  /* pick the target on her phone */
  const pick=await G.p.evaluate(([k,sid])=>{const A=ACT[k];const L=rivals.filter(v=>v&&!v.coop&&v.alive!==false&&!v.out&&!(typeof sameHouse==='function'&&sameHouse(S,v)));
   const okT=v=>{try{return !A.ok||A.ok(S,v)}catch(e){return false}};const t=(sid!=null&&L.find(v=>v.id===sid&&okT(v)))||L.find(okT);return t?t.id:null},[k,st&&st.id]);
  if(pick==null){table.push({k,skip:'no target'});continue}
  const hB=await npcOf(H,pick),gB=await npcOf(G,pick),her0=await herS(G);const run0=await H.p.evaluate(()=>COOPW.thin.F.stat.run);
  const r=await G.p.evaluate(([k,id])=>{const t=rivals.find(v=>v&&v.id===id);const C=COOPW.thin.C,F=COOPW.thin.F;const s0=C.stat.sent,n0=F.stat.sent;
   const extra=(k==='gift'||k==='plant')?S.inv.findIndex(e=>e&&!e.h&&!e.w&&!e.wk&&e.k==='yensao'):undefined;const before=JSON.stringify(t);let out,err=null;
   try{out=runAct(S,t,k,extra)}catch(e){err=String(e&&e.stack||e).slice(0,300)}
   /* the pending state is there in the same tick (#next locked); a 2nd tap (double tap) is ignored, never queued */
   const nx=document.getElementById('next'),pendNow={pend:!!F.pend,next:!!(nx&&nx.disabled)};const b0=F.stat.busy;try{runAct(S,t,k,extra)}catch(e){}pendNow.dbl=F.stat.busy-b0;
   return {pendNow,out:String(out),err,local:JSON.stringify(rivals.find(v=>v.id===id))!==before,npcOps:C.stat.sent-s0,sent:F.stat.sent-n0,pend:!!F.pend,id:F.pend&&F.pend.id}},[k,pick]);
  const got=await until(G,id=>!COOPW.thin.F.pend&&COOPW.thin.F.lastAns&&COOPW.thin.F.lastAns.id===id,r.id,15000);
  await sleep(400);await sync();
  const hA=await npcOf(H,pick),gA=await npcOf(G,pick),her1=await herS(G),hh=await hostHer();const run1=await H.p.evaluate(()=>COOPW.thin.F.stat.run);
  const ans=await G.p.evaluate(()=>COOPW.thin.F.lastAns);const hl=await H.p.evaluate(id=>(COOPW.thin.lat||[]).find(x=>x.id===id)||null,r.id);
  const num=o=>o?[o.sung,o.bac,o.danh,o.suc,o.alive,!!o.out,o.rank,(o.inv||[]).length,(o.kids||[]).length]:null;/* rel/oan/ghen/ev are each phone's own viewer rows */
  const sameW=JSON.stringify(num(hA))===JSON.stringify(num(gA));/* her log line: her phone's render adds the Sổ ghi sync suffix (jlogsync lsSync, as in solo); the host's copy holds the act line */
  /* her phone may add its own lines after it (guest-side log writers from the world delta: evidence gained, staff cap — tripwire F6/G) */
  const actL=String((ans&&ans.r&&ans.r.r)||'').trim().slice(0,40);/* the act's own line (the host's runAct result, logged in her context): on her phone among her newest lines */
  /* r1 #2: her log names a person she has not met in her own words ("một vị Phế phi chưa quen biết", main's viewer names) while the answer
     text names the target: the act line then counts when its words around the name are in her log AND her log on the host == her phone */
  const actIn=l=>{if(l.includes(actL))return true;const m=actL.match(/^(Ngươi(?:\s+[\p{Ll}]+)+)\s+(?:\p{Lu}\S*\s+)+?(\p{Ll}.*)$/u);return !!(m&&l.includes(m[1]+' ')&&l.includes(m[2].replace(/[.\s]+$/,'').slice(0,24))&&JSON.stringify(her1.logs)===JSON.stringify(hh.logs))};
  const herSame=Object.keys(hh).every(x=>x==='log'?(actL?her1.logs.some(actIn):true):x==='logs'||her1[x]===hh[x]);
  const good=!r.err&&r.out===''&&!r.local&&r.npcOps===0&&r.sent===1&&r.pendNow.pend&&r.pendNow.next&&r.pendNow.dbl===1&&got&&run1===run0+1&&sameW&&herSame;nAct++;if(good)nOk++;
  const sp=ans&&hl?{pre:ans.pre,pr:ans.pr,run:hl.run,q:hl.q,v:hl.v,ap:ans.ap,tries:ans.tries}:null;if(sp)sp.net=ans.ms-sp.run-sp.q-sp.v-(sp.ap||0);
  const row={k,id:pick,staged:!!st,hostRan:run1-run0,ans:ans&&ans.r&&ans.r.st,ms:ans&&ans.ms,sp,text:ans&&ans.r&&ans.r.r,npc:dd(hB,hA).slice(0,8),her:Object.keys(her1).filter(x=>x!=='log'&&x!=='logs'&&her0[x]!==her1[x]).map(x=>x+':'+her0[x]+'→'+her1[x]),log:her1.log.slice(0,60)};table.push(row);
  if(!good)ok(false,'F1 '+k,{statDiff:Object.keys(hh).filter(x=>x!=='log'&&x!=='logs'&&her1[x]!==hh[x]).map(x=>x+':'+her1[x]+'/'+hh[x]),actL:String((ans&&ans.r&&ans.r.r)||'').slice(0,60),r,got,run:[run0,run1],sameW,hA:num(hA),gA:num(gA),herSame,her1,hh,flog:await G.p.evaluate(()=>COOPW.thin.F.log.slice(-4)),hlog:await H.p.evaluate(()=>COOPW.thin.F.log.slice(-4))})}
 if(!process.env.NOACT)ok(nAct>0&&nAct===nOk,`F1 every ACT kind from the guest: not run on her phone, run once on the host in her context, world + her person the same on both phones (${nOk}/${nAct}; ${kinds.length} kinds, ${table.filter(x=>x.skip).length} without a target)`);
 /* reviewer r1: a real tap (doAct = the Hậu cung act card, wrapR's result-card snapshot): her phone shows the kit result card (#rtoast)
    once the host's answer has landed, as in solo; the host's screen gets no card from her act */
 if(!process.env.NOACT){await G.p.evaluate(()=>{Q.length=0;S.mg=null;try{closeModal()}catch(e){}const t=document.getElementById('rtoast');if(t)t.classList.remove('on')});await H.p.evaluate(()=>{const t=document.getElementById('rtoast');if(t)t.classList.remove('on')});await sync();
  const hc0=await H.p.evaluate(()=>{const t=document.getElementById('rtoast');return t?t.innerHTML:''});
  let r=null;for(let tr=0;tr<3;tr++){  await until(G,()=>!COOPW.thin.F.pend,null,15000);
  r=await G.p.evaluate(()=>{Q.length=0;S.mg=null;S.confined=0;/* same staging as the F1 table: a caught act just before (cấm túc) blocks every act, as in solo */try{closeModal()}catch(e){}const i=rivals.findIndex(v=>v&&!v.coop&&v.alive&&!v.out&&ACT.spy.ok(S,v)&&(typeof k61Named!=='function'||k61Named(v)));/* the Hậu cung card acts only on a person she knows by name (j61) */if(i<0)return {why:'no target'};if(!can(2))return {why:'can(2) false',used,suc:S.suc};const c0=COOPW.thin.F.stat.card|0,F=COOPW.thin.F,l0=F.stat.local,b0=F.stat.busy,s0=F.stat.sent;
    /* parallel time (jptime, LIVE 801b86b7): not together + a free servant → the deed is SENT (order khắc, lands at due; solo the same): no intent now */
    const pt=typeof ptHarmSent==='function'&&ptHarmSent(rivals[i],'spy')&&!!bestSent(S);const n0=(S.away||[]).length;doAct(i,'spy');
    if(pt)return {pt:1,v:rivals[i].id,sent:F.stat.sent-s0,task:(S.away||[]).slice(n0).map(a=>[a.kind,a.a&&a.a.k,a.back]),c0,on0:false};return {id:F.pend&&F.pend.id,dbg:F.pend?null:{local:F.stat.local-l0,busy:F.stat.busy-b0,sent:F.stat.sent-s0,q:Q.length,dead:!!S.dead,on:F.on(),ctx:!!COOPW.ctx,inW:!!(COOPW.thin.C&&COOPW.thin.C.inWorld&&COOPW.thin.C.inWorld()),allow:!!COOPW.allow,inLife:!!COOPW.inLife,mg:!!S.mg},c0,on0:!!(document.getElementById('rtoast')||{classList:{contains:()=>0}}).classList.contains('on')}});
   if(r&&(r.id||r.pt))break;await clear(G);await sync();await sleep(800)}/* a tap the game itself refused (a card / the week turning in between) sends nothing: tap again, as a player would */
  if(r&&r.pt){/* the sent deed (coop-ptime-reds): her task on her phone, nothing sent, no card yet; at the due khắc («Đợi tin» on her phone) it lands
    ONCE on the host in her context (the tick intent), her phone gets the task back + the deed's line, the host's screen gets no card */
   await sync();const hb0=await H.p.evaluate(()=>PTIME.stat.back),gb0=await G.p.evaluate(()=>PTIME.stat.back);
   /* «Đợi tin» (PTIME.wait) when the due khắc is still today; else her clock moves the way it always does: the khắc she spends (her own clock) */
   const w=await G.p.evaluate(()=>{const K=PTIME.next(),n0=PTIME.now();if(PTIME.waitOk()){let x=null;try{x=PTIME.wait()}catch(e){x='EXC '+e.message}return x}
    Q.length=0;S.mg=null;const d=K-PTIME.now();if(d>0&&used+d<=BAL.time.khac){spend(d);return true}return {K,n0,used,q:Q.length,mg:!!S.mg}});await sleep(1500);await until(G,()=>!COOPW.thin.F.pend,null,15000);await sleep(800);await sync();
   const g2=await G.p.evaluate(()=>({task:(S.away||[]).filter(a=>a.kind==='harm'&&a.a&&a.a.k==='spy').map(a=>a.back),back:PTIME.stat.back,ask:COOPW.thin.F.stat.ptAsk|0}));
   const hb1=await H.p.evaluate(()=>PTIME.stat.back);const hc1=await H.p.evaluate(()=>{const t=document.getElementById('rtoast');return t?t.innerHTML:''});
   ok(r.sent===0&&r.task.length===1&&r.task[0][0]==='harm'&&r.task[0][1]==='spy'&&r.task[0][2]===0&&w===true&&g2.task.includes(1)&&g2.back===gb0&&hb1===hb0+1&&hc1===hc0,
    'F1 a real tap (doAct) under parallel time: the deed is sent (her task, nothing sent yet), lands at the due khắc once on the host in her context, back on her phone, no card on the host',{r,w,g2,hb:[hb0,hb1],gb0,hostSame:hc1===hc0})}
  else{
  const got=r&&r.id?await until(G,id=>COOPW.thin.F.lastAns&&COOPW.thin.F.lastAns.id===id&&!COOPW.thin.F.pend,r.id,15000):false;await sleep(500);
  const g=await G.p.evaluate(()=>{const t=document.getElementById('rtoast');return {card:COOPW.thin.F.stat.card|0,on:!!(t&&t.classList.contains('on')),txt:t?t.textContent.replace(/\s+/g,' ').slice(0,80):''}});
  const hc1=await H.p.evaluate(()=>{const t=document.getElementById('rtoast');return t?t.innerHTML:''});
  ok(!!r&&!!r.id&&got&&!r.on0&&g.card===r.c0+1&&g.on&&/Dò la/.test(g.txt)&&hc1===hc0,'F1 a real tap (doAct): her phone shows the kit result card once the answer landed (not before), the host gets none from her act',{r,got,g,hostSame:hc1===hc0})}}
 {const ms=table.filter(x=>typeof x.ms==='number').map(x=>x.ms).sort((a,b)=>a-b);if(ms.length)console.log('LATENCY tap→answer ms (LAG '+(+process.env.LAG||0)+', host CPU ×'+(+process.env.CPU||1)+'): n='+ms.length+' median='+ms[ms.length>>1]+' min='+ms[0]+' max='+ms[ms.length-1])}
 {const L=table.filter(x=>x.sp&&!x.sp.tries);const med=f=>{const a=L.map(f).filter(v=>typeof v==='number').sort((a,b)=>a-b);return a.length?a[a.length>>1]:null};
  if(L.length)console.log('LATENCY split (median ms, no resend, n='+L.length+'): total='+med(x=>x.ms)+' network(2 legs)='+med(x=>x.sp.net)+' host run='+med(x=>x.sp.run)+' host wait='+med(x=>x.sp.q)+' host view+diff+send='+med(x=>x.sp.v)+' guest apply+render='+med(x=>x.sp.ap)+' | guest pre-send='+med(x=>x.sp.pre)+' guest pending render='+med(x=>x.sp.pr))}
 if(TRIPSRC){const t=await G.p.evaluate(()=>window.__trip&&__trip()).catch(e=>({err:e.message}));
  const ent=Object.entries((t&&t.entries)||{}).filter(([k])=>/^F1\|/.test(k));
  console.log('TRIPWIRE F1 act table (guest writes outside fromCanon during the ACT loop): total',t&&t.total,'state',t&&t.state,'· statePart',JSON.stringify(t&&t.statePart),'· F1 entries',JSON.stringify(ent),'· F1 top',JSON.stringify(((t&&t.parts)||{}).F1||[]).slice(0,600))}
 console.log('ACT table:');for(const x of table)console.log(' ',JSON.stringify(x).slice(0,300));
 if(process.env.OUT){fs.mkdirSync(process.env.OUT,{recursive:true});fs.writeFileSync(path.join(process.env.OUT,`f1-acts-L${LVL}-s${SWAP}.json`),JSON.stringify(table,null,1))}
 /* F3: the old relay messages for acts are not sent at level 6 (counted on both pages during F2): res / actr / act invite / do inv */
 for(const o of [H,G])await o.p.evaluate(()=>{window.__sent={};if(COOP.__ws)return;COOP.__ws=1;const s=COOP.send;COOP.send=function(m){try{const k=m&&m.t+(m.op?':'+m.op:'')+(m.k?':'+m.k:'')+(m.mode?':'+m.mode:'');__sent[k]=(__sent[k]||0)+1}catch(e){}return s.apply(this,arguments)}});
 /* F2: acts between the two, both directions. Each act is checked on the TARGET's real person (guest→host: the host's S; host→guest: her
    phone's S after the patch) and on the actor. Every act runs on the host (hers as an intent), so success is forced there for the act:
    roll()→true (but j29's 30 = a loyal servant refusing a dirty job), caught()→"" (restored after). Her person is staged through the host's store (withSeat b → patch), never on her phone. */
 /* every roll succeeds; j29's loyal servant (netIs 'loyal' + roll(30)) is the one refusal, switched off by its trait, not by the odds value (an act whose own odds were 30 failed: laydo) */
 const force=v=>H.p.evaluate(v=>{if(v){if(!window.__fr){window.__fr=[roll,caught,netIs,typeof stf2Ord==='function'?stf2Ord:null];const n0=netIs;roll=o=>true;caught=()=>'';netIs=function(s,n){return n==='loyal'?false:n0.apply(this,arguments)};if(window.__fr[3])stf2Ord=()=>'obey'/* AG-ALL-2 G10: the sent servant chooses (Vâng lệnh / Từ chối / Mật báo): forced to obey */}}else if(window.__fr){[roll,caught,netIs]=window.__fr;if(window.__fr[3])stf2Ord=window.__fr[3];delete window.__fr}},v);
 const STP=()=>{S.kids=(S.kids||[]).filter(k=>k.alive!==false);if(!S.kids.some(k=>k.age>=3||k.heir))S.kids.push(mkKid('f',4));/* a kid the harm acts can aim at (tKid: age 3+ or heir); a baby alone is no target */for(const k of S.kids)k.hp=100;
  S.pets=[{t:Object.keys(PET)[0],from:'',src:'',care:80,at:tsbWk(),full:40,clean:40,joy:40,aff:50}];S.inv=S.inv||[];
  const lk=Object.keys(IT).find(k=>typeof loOk==='function'&&loOk({k}));for(const k of [lk||'tranhco','yensao','yensao'])S.inv.push({k});S.bac=Math.max(S.bac||0,5000);S.confined=0;S.suc=Math.max(S.suc||0,90)};
 const stageP=async o=>{if(o===H)await H.p.evaluate(src=>{(0,eval)('('+src+')')();render()},STP.toString());
  else{await H.p.evaluate(src=>COOPW.thin.withSeat('b',()=>(0,eval)('('+src+')')()),STP.toString());await H.p.evaluate(()=>{try{COOPW.thin.flush()}catch(e){}});
   await until(G,()=>(S.pets||[]).length===1&&S.pets[0].full===40,null,15000)}};
 const pers=o=>o.p.evaluate(()=>({inv:(S.inv||[]).filter(e=>e&&!e.h).length,kids:(S.kids||[]).filter(k=>k.alive!==false).map(k=>[k.name,k.hp]),
  pets:(S.pets||[]).map(p=>[p.t,Math.round(p.full||0),Math.round(p.joy||0)]),bac:S.bac,suc:S.suc}));
 const notes=o=>o.p.evaluate(()=>{const m=document.getElementById('modal');const t=[];if(m&&!m.hidden){const h=m.querySelector('h2,h3,.mt,.kt');if(h)t.push(h.textContent.trim())}for(const q of Q)if(q&&q.t)t.push(String(q.t));for(const x of (S.thq||[]))if(x&&x.t)t.push(String(x.t));return t.slice(0,6)});
 const sum=x=>x.reduce((a,p)=>a+p[1]+p[2],0);
 const PAIRS=[['petcare','pet',(t0,t1)=>t1.pets.length===t0.pets.length&&sum(t1.pets)>sum(t0.pets)],
  ['petsteal','pet',(t0,t1,a0,a1)=>t1.pets.length===t0.pets.length-1&&a1.pets.length===a0.pets.length+1],
  ['gift','gift',(t0,t1,a0,a1)=>t1.inv===t0.inv+1&&a1.inv===a0.inv-1],
  ['laydo','steal',(t0,t1,a0,a1)=>t1.inv===t0.inv-1&&a1.inv===a0.inv+1],
  ['kpoison','kid',(t0,t1)=>t1.kids.length<t0.kids.length||t1.kids.some((k,i)=>t0.kids[i]&&k[1]<t0.kids[i][1])]];
 for(const [dir,A,B] of [['guest→host',G,H],['host→guest',H,G]]){
  for(const [k,what,chk] of PAIRS){for(let i=0;i<3;i++){await clear(H);await clear(G)}
   await stageP(B);await stageP(A);await H.p.evaluate(()=>{try{COOPW.thin.flush()}catch(e){}});await sync();
   if(A===G)await G.p.evaluate(()=>{S.pets=[];});/* her own pets: none, so petsteal has room (petHasFree) */
   /* the host sees her staged kid / pets on her entry before he acts on her (her fam reaches his entry of her) */
   if(A===H)await until(H,()=>{const f=COOPW.friend();return !!(f&&tKid(f))},null,20000);
   const a0=await pers(A),t0=await pers(B);await force(true);
   const r=await A.p.evaluate(k=>{const f=COOPW.friend();if(!f)return {err:'no friend'};const A2=ACT[k];let okd=false;try{okd=!A2.ok||A2.ok(S,f)}catch(e){okd='EXC '+e.message}
    if(okd!==true)return {err:'not ok '+okd,fk:(f.kids||[]).map(x=>[x.name,x.age,!!x.heir,x.alive])};const ex=k==='gift'?S.inv.findIndex(e=>e&&!e.h&&e.k==='yensao'):undefined;let out='';
    try{out=runAct(S,f,k,ex)}catch(e){return {err:String(e)}}return {out:String(out).replace(/<[^>]+>/g,'').slice(0,120)}},k);
   if(A===G){await until(G,()=>!COOPW.thin.F.pend,null,15000);const la=await G.p.evaluate(()=>COOPW.thin.F.lastAns);r.ans=la&&la.r}
   if(k==='gift'){const sm=()=>B.p.evaluate(()=>{try{const m=document.getElementById('modal');if(Q.length&&(!m||m.hidden))showModal()}catch(e){}});await sleep(1500);await sm();r.inv=await tapText(B,/^Nhận/,10000);await sleep(2500);await sm();r.keep=await tapText(B,/^Nhận/,10000)}
   await force(false);await H.p.evaluate(()=>{try{COOPW.thin.flush()}catch(e){}});await sleep(2000);
   if(k==='laydo'&&A===H)ok(!r.err&&await H.p.evaluate(()=>!Q.some(q=>q&&q.pid==='giftin')),'F2 host→guest laydo: no «Quà tặng» card of the stolen piece on the host (her mirror of the thief was bridged back: a second piece; review coop-thin-laydo)',await H.p.evaluate(()=>[Q.map(q=>q&&[q.pid||q.t,JSON.stringify(q.pp||{}).slice(0,300)])]));
   const nt=await notes(B);for(let i=0;i<4;i++){await clear(H);await clear(G);await sleep(300)}await sync();
   const a1=await pers(A),t1=await pers(B);const good=!r.err&&chk(t0,t1,a0,a1);
   table.push({dir,k,r,t0,t1,a0,a1,notes:nt});ok(good,`F2 ${dir} ${k} (${what}): the effect on the target's own person + the actor`,{r,t0,t1,a0,a1,notes:nt});
   if(dir==='guest→host'&&k!=='laydo')ok(nt.length>0||k==='gift','F2 '+dir+' '+k+': the host got his note (resApply in his context)',nt)}}
 {const [hs,gs]=await both(()=>window.__sent||{});const bad=o=>Object.keys(o).filter(k=>/^res$|^actr$|^act:[^:]+:invite$|^do:inv$/.test(k));
  ok(LVL<6||!bad(hs).length&&!bad(gs).length,'F3 no old act relay message at level 6 (res / actr / act invite / do inv), both seats',{host:hs,guest:gs})}
 {const st=await H.p.evaluate(()=>({f:COOPW.fStat||0}));ok(st.f>0,'F2 her acts on the host went through the local applier (no res message)',st)}
 {const [ho,go]=await both(()=>COOPW.oldRun||{});const n=o=>Object.values(o).reduce((a,b)=>a+b,0);
  ok(LVL>=3?n(ho)+n(go)===0:true,'F8 no old guest state guard ran (COOPW.oldRun, both seats)',{host:ho,guest:go})}
 ok(!H.errs.length&&!G.errs.length,'no page errors',{h:H.errs.slice(0,4),g:G.errs.slice(0,4)});
 if(process.env.SHOTS){fs.mkdirSync(process.env.SHOTS,{recursive:true});for(const o of [H,G]){await clear(o);for(let i=0;i<8;i++){if(!await tapText(o,/^(Bỏ qua|Đóng|Lui|Đã hiểu)$/,800))break;await sleep(400)}await o.p.evaluate(()=>{try{closeModal()}catch(e){}try{render()}catch(e){}});await sleep(800);
   const vp=o.p.viewportSize();await o.p.screenshot({path:path.join(process.env.SHOTS,`L${LVL}-${o.name}-${vp.width}x${vp.height}.jpg`),type:'jpeg',quality:70})}}
 if(process.env.UISCAN)try{fs.writeFileSync(process.env.UISCAN,JSON.stringify(await H.p.evaluate(()=>window.__uiscan)))}catch(e){console.error('uiscan',e.message)}
 const n=res.filter(x=>x[0]).length;console.log(`coop-thin-f1 L${LVL}${SWAP?' swap':''}: ${n}/${res.length}`);await b.close();process.exit(n===res.length?0:1)})().catch(e=>{console.error(e);process.exit(2)});
