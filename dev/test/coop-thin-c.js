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
async function mk(b,name,vp,want){const ctx=await b.newContext({viewport:{width:vp[0],height:vp[1]},deviceScaleFactor:process.env.SHOTS?2:1,reducedMotion:'reduce'});await serve(ctx);
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
 const okw=await A.p.evaluate(w=>COOP.state.week===w+1,w0)&&await B.p.evaluate(w=>COOP.state.week===w+1,w0);ok(okw,tag+': week merged once',okw?undefined:[await A.p.evaluate(()=>({w:COOP.state.week,b:S.buoi,pend:COOPW.pend,sent:COOPW.sent,Q:Q.map(q=>q.t).slice(0,3),dis:document.getElementById('next').disabled,nt:document.getElementById('next').textContent})),await B.p.evaluate(()=>({w:COOP.state.week,b:S.buoi,pend:COOPW.pend,sent:COOPW.sent,Q:Q.map(q=>q.t).slice(0,3),dis:document.getElementById('next').disabled,nt:document.getElementById('next').textContent,log:COOPW.thin.C.log.slice(-5),modal:(document.getElementById('modal')||{}).hidden,q0:Q[0]&&Object.keys(Q[0]).join(','),q0p:Q[0]&&(Q[0].pid||Q[0].ev||''),mg:!!S.mg,km:document.querySelectorAll('.kmov').length,fr:COOP.frozen,cy:COOPW.cyHold,dead:S.dead}))]);await sleep(1500);return okw}
(async()=>{const b=await chromium.launch(/127\.0\.0\.1|localhost/.test(WURL)?{args:['--disable-features=BlockInsecurePrivateNetworkRequests,PrivateNetworkAccessSendPreflights,PrivateNetworkAccessRespectPreflightResults,LocalNetworkAccessChecks']}:{});
 const FOLD=process.env.SHOTS?[755,1000]:[686,880],IPAD=[1180,820];/* SHOTS=<dir outside git>: the owner's devices Fold 755x1000@2 + iPad 1180x820@2 */
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
 /* her own things for the acts that need them (her person, on her phone): a plain gift / plant piece, a poison and a food (pgift), a loyal maid */
 await G.p.evaluate(()=>{S.inv=S.inv||[];for(const k of ['yensao','yensao','yensao','hacdinh','hacdinh'])S.inv.push({k});if(S.maid){S.maid.loyal=60;delete S.maid.spyFor}});
 const kinds=process.env.NOACT?[]:(await G.p.evaluate(()=>Object.keys(ACT))).filter(k=>!process.env.KINDS||process.env.KINDS.split(',').includes(k));const table=[];let nAct=0,nOk=0;
 for(const k of kinds){await G.p.evaluate(()=>{Q.length=0;S.mg=null;/* her person between acts: a failed scheme may confine or demote her (j17: no crime while confined) */S.confined=0;S.rank=Math.max(S.rank||0,4);S.bac=Math.max(S.bac||0,5000);S.suc=Math.max(S.suc||0,90);S.dead=false;try{closeModal()}catch(e){}});await H.p.evaluate(()=>{Q.length=0;S.mg=null;try{closeModal()}catch(e){}});
  await sync();
  /* stage a target when the scripted state has none: the world part on the HOST (her context: withSeat b, so her rows ev/rel are hers),
     her own part (place, tonight, items, maid) on her phone; then the host's world reaches her and the act runs on the staged NPC */
  let st=null;const has=await G.p.evaluate(k=>{const A=ACT[k];return rivals.some(v=>v&&!v.coop&&v.alive!==false&&!v.out&&!(typeof sameHouse==='function'&&sameHouse(S,v))&&(()=>{try{return !A.ok||A.ok(S,v)}catch(e){return false}})())},k);
  if(!has&&STAGE[k]){const pk=await G.p.evaluate(()=>{const q=rivals[0];return (rivals.filter(v=>v&&!v.coop&&v!==q&&v.alive!==false&&!v.out&&!(typeof sameHouse==='function'&&sameHouse(S,v))&&!v.queen).sort((a,b)=>(a.rank||0)-(b.rank||0))[0]||{}).id},null);
   if(pk!=null){const sg=STAGE[k];if(sg.h)st=await H.p.evaluate(([id,src])=>{try{return COOPW.thin.withSeat('b',()=>{const t=rivals.find(v=>v&&v.id===id&&!v.coop);if(!t)return 'gone';(0,eval)('(function(t){'+src+'})')(t);return 'ok'})}catch(e){return 'EXC '+e.message}},[pk,sg.h]);
    await H.p.evaluate(()=>{try{COOPW.thin.flush()}catch(e){}});await sync();
    if(sg.g)await G.p.evaluate(([id,src])=>{const t=rivals.find(v=>v&&v.id===id);(0,eval)('(function(t){'+src+'})')(t)},[pk,sg.g]);st={id:pk,h:st}}}
  const r=await G.p.evaluate(([k,sid])=>{try{return (()=>{const A=ACT[k];const C=COOPW.thin.C;const L=rivals.filter(v=>v&&!v.coop&&v.alive!==false&&!v.out&&!(typeof sameHouse==='function'&&sameHouse(S,v)));
   const okT=v=>{try{return !A.ok||A.ok(S,v)}catch(e){return false}};const t=(sid!=null&&L.find(v=>v.id===sid&&okT(v)))||L.find(okT);if(!t)return {k,skip:'no target'+(sid!=null?' (staged '+sid+')':'')};
   const extra=(k==='gift'||k==='plant')?S.inv.findIndex(e=>e&&!e.h&&!e.w&&!e.wk&&e.k==='yensao'):undefined;
   const id=t.id,before=JSON.stringify(t);const s0=C.stat.sent,li=C.lastId;let seed=4242;const nat=Math.random;Math.random=()=>{seed=(seed*1103515245+12345)%2147483648;return seed/2147483648};
   let out="",err=null;try{out=runAct(S,t,k,extra)}catch(e){err=String(e&&e.stack||e).slice(0,400)}finally{Math.random=nat}
   const aft=JSON.stringify(rivals.find(v=>v.id===id)),same=aft===before;let diff=null;if(!same){const B=JSON.parse(before),A2=JSON.parse(aft);const dd=(x,y,p,o)=>{if(JSON.stringify(x)===JSON.stringify(y))return;if(x&&y&&typeof x==='object'&&typeof y==='object'){for(const f of new Set([...Object.keys(x),...Object.keys(y)]))dd(x[f],y[f],p+'.'+f,o);return}o.push([p,JSON.stringify(x),JSON.stringify(y)].map(z=>String(z).slice(0,120)))};diff=[];dd(B,A2,'',diff)}
   const ops=(C.stat.sent>s0?C.ops:[]).filter(o=>o.id===id||o.t==="add"||o.t==="w");Q.length=0;S.mg=null;try{closeModal()}catch(e){}
   return {k,id,tog:(()=>{try{return together(S,t)}catch(e){return 'x'}})(),name:t.name,out:String(out||'').slice(0,90),err,same,ops,diff,staged:sid!=null&&t.id===sid}})()}catch(e){return {k,skip:'EXC '+String(e&&e.stack).slice(0,500)}}},[k,st&&st.id]);
  if(r.skip){const dbg=process.env.DBG&&st?{g:await G.p.evaluate(([id,k])=>{const t=rivals.find(v=>v&&v.id===id);if(!t)return 'gone';let ok=null;try{ok=ACT[k].ok(S,t)}catch(e){ok='EXC '+e.message}
     return {ok,preg:t.preg,hid:t.hidden,kids:(t.kids||[]).map(x=>[x.age,x.alive,x.sex]),inv:(t.inv||[]).length,rank:t.rank,rk:rkOf(t),rkS:rkOf(S),tog:together(S,t),ton:tonightOf()===t,tn:String(S.tonight&&S.tonight.id||S.tonight),sh:sameHouse(S,t),alive:t.alive,out:t.out,pen:t.pen,inS:(S.inv||[]).length,conf:S.confined,vpi:vpItems(t).length,inv0:JSON.stringify((t.inv||[])[0]),it0:(t.inv||[])[0]&&JSON.stringify(itm(t.inv[0].k)).slice(0,160)}},[st.id,k]),
    h:await H.p.evaluate(id=>{const t=rivals.find(v=>v&&v.id===id&&!v.coop);return t?{preg:t.preg,kids:(t.kids||[]).length,inv:(t.inv||[]).length,rank:t.rank,alive:t.alive,out:t.out}:'gone'},st.id)}:undefined;
   table.push({k,skip:r.skip,stage:st,dbg});if(dbg)console.log('skip',k,JSON.stringify(dbg).slice(0,600));continue}
  if(!r.ops.length){table.push({k,id:r.id,tog:r.tog,same:r.same,ops:0,out:r.out,err:r.err});if(!r.same)ok(false,'C2 '+k+': no op but her world changed',{diff:r.diff,out:r.out,err:r.err});continue}
  nAct++;
  /* wait for the host's answer to come back (her view's dr = this intent) and compare */
  const got=await until(G,()=>{const V=COOPW.thin.view;return !!(V&&V.o&&V.o.dr&&V.o.dr.op==='npc'&&V.o.dr.id===COOPW.thin.C.lastId)},null,15000);
  await sleep(300);
  const chk=await G.p.evaluate(ops=>{const bad=[];const J=x=>String(JSON.stringify(x));const RW=['rel','oan','ghen','ev'];
   for(const o of ops){if(o.t!=="npc")continue;const v=rivals.find(x=>x.id===o.id);if(!v){bad.push([o.id,'gone']);continue}const now=JSON.parse(JSON.stringify(v));
    const key=x=>x&&typeof x==='object'?(x.id!=null?'i'+x.id:x.sid!=null?'s'+x.sid:x.ci!=null?'c'+x.ci:typeof x.name==='string'&&x.name?'n'+x.name:null):null;/* = jcoopthinc key (r1: children by name) */const pl=x=>x&&typeof x==='object'&&!Array.isArray(x);
    /* her change is in the host's world: numbers by her delta, keyed arrays with her members in / out, objects key by key, anything else = hers */
    const has=(b,a,n,pa)=>{if(J(a)===J(b))return;if(typeof a==='number'&&typeof b==='number'){if(typeof n!=='number'||Math.abs((n-b)-(a-b))>1e-9)bad.push([pa,b,a,n]);return}
     if(Array.isArray(a)&&Array.isArray(b)&&Array.isArray(n)&&a.every(key)&&b.every(key)&&n.every(key)){const mb=new Map(b.map(x=>[key(x),x])),ma=new Map(a.map(x=>[key(x),x])),mn=new Map(n.map(x=>[key(x),x]));
      for(const [q,x] of ma){if(!mb.has(q)){if(!mn.has(q))bad.push([pa+'+'+q,'missing'])}else has(mb.get(q),x,mn.get(q),pa+'.'+q)}for(const q of mb.keys())if(!ma.has(q)&&mn.has(q))bad.push([pa+'-'+q,'still there']);return}
     /* r1: a child's face identity (j73 kid, rolled lazily by display code on whichever phone shows her first) and kk (each phone's own k61
        handle, j61) are not the act's effect: on a child staged a moment before the act both phones may roll one (report: lazy identity note) */
     if(pl(a)&&pl(b)&&pl(n)){const lazy=/\.kids\.n[^.]*$/.test(pa);for(const f of new Set([...Object.keys(a),...Object.keys(b)]))if(f!=='hh'&&!(lazy&&(f==='kid'||f==='kk')))has(b[f],a[f],n[f],pa+'.'+f);return}
     if(J(n)!==J(a))bad.push([pa,J(a).slice(0,80),J(n).slice(0,80)])};
    has(o.b,o.a,now,String(o.id))}return bad},r.ops);
  /* the host's own world: same NPC numbers (non-row) as on her phone */
  const hostSame=await (async()=>{const ids=r.ops.filter(o=>o.t==='npc').map(o=>o.id);const g=await G.p.evaluate(ids=>ids.map(id=>{const v=rivals.find(x=>x.id===id);return v?[v.sung,v.bac,v.danh,v.suc,v.alive,v.out,v.rank,(v.inv||[]).length,(v.staff||[]).length,(v.kids||[]).length]:null}),ids);
   const h=await H.p.evaluate(ids=>ids.map(id=>{const v=rivals.find(x=>x.id===id);return v?[v.sung,v.bac,v.danh,v.suc,v.alive,v.out,v.rank,(v.inv||[]).length,(v.staff||[]).length,(v.kids||[]).length]:null}),ids);return JSON.stringify(g)===JSON.stringify(h)?true:{g,h}})();
  const fields=[...new Set(r.ops.filter(o=>o.t==='npc').flatMap(o=>Object.keys(o.a).filter(f=>JSON.stringify(o.a[f])!==JSON.stringify(o.b[f]))))];
  const good=got&&r.same&&!chk.length&&hostSame===true;if(good)nOk++;
  table.push({k,id:r.id,staged:r.staged,ops:r.ops.length,fields,lensKept:r.same,hostGot:got,backOnHer:!chk.length,hostSame:hostSame===true,out:r.out});
  /* TRACE=1 (reviewer r1): per changed field of her op: before / after on her act frame, now on the host world, now on her phone */
  if(process.env.TRACE){const pick=async(o,ops)=>o.p.evaluate(ops=>ops.filter(x=>x.t==='npc').map(x=>{const v=rivals.find(y=>y.id===x.id);const f={};for(const k of Object.keys(x.a))if(JSON.stringify(x.a[k])!==JSON.stringify(x.b[k]))f[k]=v?JSON.stringify(v[k]):'gone';return [x.id,f]}),ops);
   const hN=await pick(H,r.ops),gN=await pick(G,r.ops);for(const o of r.ops.filter(x=>x.t==='npc')){const h=(hN.find(x=>x[0]===o.id)||[])[1]||{},g=(gN.find(x=>x[0]===o.id)||[])[1]||{};
    for(const f of Object.keys(h)){const N=+process.env.TRACE_N||160;console.log('TRACE',k,o.id,f,'b='+String(JSON.stringify(o.b[f])).slice(0,N),'a='+String(JSON.stringify(o.a[f])).slice(0,N),'host='+String(h[f]).slice(0,N),'her='+String(g[f]).slice(0,N))}}
   for(const o of r.ops.filter(x=>x.t!=='npc'))console.log('TRACE',k,'op',o.t,JSON.stringify(o).slice(0,300))}
  if(!good)ok(false,'C2 '+k,{same:r.same,got,chk,hostSame,ops:r.ops.map(o=>o.t+':'+o.id),glog:await G.p.evaluate(()=>[COOPW.thin.C.log.slice(-4),COOPW.thin.C.lastId,COOPW.thin.view&&COOPW.thin.view.o&&COOPW.thin.view.o.dr]),hlog:await H.p.evaluate(()=>[COOPW.thin.C.log.slice(-4),COOPW.thin.C.stat.applied,COOPW.thin.held&&COOPW.thin.held('b'),(COOPW.thin.D&&COOPW.thin.D.log||[]).slice(-4)])})}
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
 /* part G (level >= 13): her phone never runs / sends her week end (jcoopworld sendEnd returns at gG(); the Worker refuses a guest end): no world of hers travels */
 ok(okw&&(LVL>=13?c4.sentW===null:c4.sentW===true),LVL>=13?'C4 level 13: she sends no week end (the host ran it), no world of hers travels':'C4 her sent week carries the room world unchanged (W from the host only)',{sentW:c4.sentW});
 ok(c4.st.drop>c4.c0.drop,'C4 her week end ran its world loops on the lens (writes dropped)',{drop:[c4.c0.drop,c4.st.drop],dropW:c4.st.dropW});
 await sync();
 const one=await (async()=>{const f=()=>rivals.filter(v=>v&&!v.coop).map(v=>[v.id,v.sung,v.bac,v.danh,v.suc,v.alive,v.rank,!!v.out]).sort((a,b)=>a[0]-b[0]);const [h,g]=await both(f);
  const d=[];for(let i=0;i<Math.max(h.length,g.length);i++)if(JSON.stringify(h[i])!==JSON.stringify(g[i]))d.push([h[i],g[i]]);return d})();
 ok(!one.length,'C4 one world: every NPC number on her phone = the host world',one.slice(0,5));
 ok(c4.st.npcActOff+c4.st.pickOff>=0&&(await H.p.evaluate(()=>COOPW.thin.C.stat.g7||0))>0,'C5 G7: the host ran rivalsBuoi with her entry in the harem; on the guest NPCs act never',{guest:{pickOff:c4.st.pickOff,npcActOff:c4.st.npcActOff},hostG7:await H.p.evaluate(()=>COOPW.thin.C.stat.g7||0)});
 if(TRIPSRC){const t=await G.p.evaluate(()=>window.__trip&&__trip());ok(t&&t.world===0,'C7 tripwire: guest writes into W / R / Rarr = 0',t&&{world:t.world,byRoot:t.byRoot,lens:t.lens,state:t.state,top:t.top.filter(x=>/^(W|R)/.test(x[1])).slice(0,12)})}
 {const st=await G.p.evaluate(()=>{const C=COOPW.thin.C;let mx=0,mk='';for(const v of rivals)if(v&&!v.coop)for(const k in v){const l=JSON.stringify(v[k]||0).length;if(l>mx){mx=l;mk=v.id+'.'+k}}return {bado:C.stat.bado||0,big:C.stat.big||0,packs:C.stat.packs||0,sent:C.stat.sent,maxField:[mx,mk]}});
  ok(st.bado===0&&st.big===0,'C9 every NPC op reached the host: no intent over the Worker cap (bado 0, unsplittable 0)',st)}
 /* C10 (review r1): a pack the Worker could not hand to the host ("nohost": his socket closed between her act and the send) is sent again
    and applied ONCE (before: lost). Simulated on her phone: the first npc intent is swallowed and the Worker's nohost error emitted. */
 {await sync();const x=await H.p.evaluate(()=>{const v=rivals.find(v=>v&&!v.coop&&v.alive!==false&&!v.out&&v.id<900);return {id:v.id,sung:v.sung}});
  await G.p.evaluate(id=>{const s0=COOP.send;let n=0;COOP.send=function(o){if(o&&o.t==='do'&&o.op==='npc'&&!n++){setTimeout(()=>COOP.emit('error',{t:'error',code:'nohost',id:o.id}),300);return Promise.resolve(true)}return s0.apply(this,arguments)};
   COOPW.thin.C.frame('act',()=>{const v=rivals.find(v=>v.id===id);v.sung=(v.sung||0)+3})},x.id);
  const got=await until(H,x=>{const v=rivals.find(v=>v.id===x.id);return v&&v.sung===x.sung+3},x,15000);await sleep(2500);
  const h1=await H.p.evaluate(id=>rivals.find(v=>v.id===id).sung,x.id),g=await G.p.evaluate(()=>({resend:COOPW.thin.C.stat.resend||0}));
  ok(got&&h1===x.sung+3&&g.resend===1,'C10 a pack the host never got (nohost) is sent again and applied once',{before:x.sung,host:h1,guest:g})}
 {const [ho,go]=await both(()=>COOPW.oldRun||{});const n=o=>Object.values(o).reduce((a,b)=>a+b,0);
  ok(LVL>=3?n(ho)+n(go)===0:true,'C8 one switch: no old guest state guard ran in a C room (COOPW.oldRun, both seats)',{host:ho,guest:go})}
 ok(!H.errs.length&&!G.errs.length,'no page errors',{h:H.errs.slice(0,4),g:G.errs.slice(0,4)});
 if(process.env.SHOTS){fs.mkdirSync(process.env.SHOTS,{recursive:true});for(const o of [H,G]){await clear(o);for(let i=0;i<8;i++){if(!await tapText(o,/^(Bỏ qua|Đóng|Lui|Đã hiểu)$/,800))break;await sleep(400)}await o.p.evaluate(()=>{try{closeModal()}catch(e){}try{render()}catch(e){}});await sleep(800);
   const vp=o.p.viewportSize();await o.p.screenshot({path:path.join(process.env.SHOTS,`L${LVL}-${o.name}-${vp.width}x${vp.height}.jpg`),type:'jpeg',quality:70})}}
 if(process.env.OUT){fs.mkdirSync(process.env.OUT,{recursive:true});fs.writeFileSync(path.join(process.env.OUT,`acts-L${LVL}-s${SWAP}.json`),JSON.stringify(table,null,1))}
 console.log('ACT table:');for(const x of table)console.log(' ',JSON.stringify(x).slice(0,220));
 const n=res.filter(x=>x[0]).length;console.log(`coop-thin-c L${LVL}${SWAP?' swap':''}: ${n}/${res.length}`);await b.close();process.exit(n===res.length?0:1)})().catch(e=>{console.error(e);process.exit(2)});
