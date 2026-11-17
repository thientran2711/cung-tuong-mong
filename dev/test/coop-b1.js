/* Co-op B1 (review/coop-b1b5): steal / burn / extort the FRIEND's items, harm / take her children, miscarriage — 2 browsers, LIVE Worker.
   usage: python3 dev/build/assemble.py && node dev/test/coop-b1.js [outdir] [workerURL]
   A = host 755x1000@2, B = guest 1180x820@2. Dice forced (success, undetected) where the case needs it.
   Checks per act: the act is OFFERED on her entry (ACT.ok), my gain lands on my side, her loss lands on HER own S through `res.fam`,
   her note / Đồ thất lạc case, and after the week merge her entry on my side == her own S (bag keys, children). */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');
const {serve,BASE}=require('./coop-serve.js');
const OUT=path.resolve(process.argv[2]||path.join(__dirname,'../../.tmp/coop-b1'));fs.mkdirSync(OUT,{recursive:true});
const WURL=process.argv[3]||'https://ctm-coop.victoria-tntt.workers.dev';
const res=[];const ok=(c,m,x)=>{res.push([!!c,m]);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const DCL={waitUntil:'domcontentloaded'};
async function mk(b,name,vp){const ctx=await b.newContext({viewport:{width:vp[0],height:vp[1]},deviceScaleFactor:vp[2],hasTouch:true,isMobile:vp[0]<1100,reducedMotion:'reduce'});
  await serve(ctx);await ctx.addInitScript(u=>{window.COOP_URL=u},WURL);
  const o={ctx,name,errs:[]};o.page=async()=>{const p=await ctx.newPage();p.setDefaultTimeout(30000);p.setDefaultNavigationTimeout(120000);
    p.on('pageerror',e=>o.errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|favicon|navigator.vibrate/.test(m.text()))o.errs.push('console: '+m.text())});o.p=p;return p};return o}
async function until(o,fn,arg,ms=30000){try{await o.p.waitForFunction(fn,arg,{timeout:ms,polling:250});return true}catch(e){return false}}
async function tapText(o,re,ms=8000){const t0=Date.now();while(Date.now()-t0<ms){const h=await o.p.evaluateHandle(src=>{const R=new RegExp(src);
  return [...document.querySelectorAll('button,a,[role=button]')].find(b=>b.offsetParent!==null&&!b.disabled&&R.test(b.textContent.trim()))||null},re.source);
  const el=h.asElement();if(el){try{await el.click({timeout:5000});return true}catch(e){}}await sleep(250)}return false}
const shot=async(o,n)=>{try{await o.p.screenshot({path:`${OUT}/${n}.png`,timeout:120000})}catch(e){console.log('shot failed',n,e.message.split('\n')[0])}};
/* close the normal game's dialogs (any button that only reads / takes the first road), end mini games: the test's own player */
async function clear(o,n=25){for(let i=0;i<n;i++){const st=await o.p.evaluate(()=>{const ke=[...document.querySelectorAll('.kmov .kmend')].find(x=>x.offsetParent!==null&&!x.disabled);if(ke){ke.click();return'x'}const kv=[...document.querySelectorAll('.kmov')].find(x=>!x.classList.contains('km-out')&&!x.querySelector('.kmend')&&!x.dataset.tsk);if(kv){kv.dataset.tsk=1;kv.click();return'x'}
   const rs=document.querySelector('#kroul .krskip');if(rs&&rs.offsetParent!==null){rs.click();return'x'}
   const bk=[...document.querySelectorAll('.kbk-x,.kbk-bar button')].find(x=>x.offsetParent!==null&&(/^Lui$/.test(x.textContent.trim())||/^(Lui|Đóng)$/.test(x.getAttribute('aria-label')||'')));if(bk){bk.click();return'x'}
   const m=document.getElementById('modal');if(!m||m.hidden)return typeof S!=='undefined'&&S&&S.mg?'mg':'';const all=[...m.querySelectorAll('button:not([disabled])')].filter(x=>x.offsetParent!==null);const b=all.find(x=>/^Nhận thân phận/.test(x.textContent.trim()))||all.find(x=>!x.dataset.kcp&&/Nhận thân phận|Nhập cung|Tiến cung|Vào cung/.test(x.textContent))||m.querySelector('#mr button:not([disabled])')||m.querySelector('.opts button:not([disabled]):not([data-kcp])')||m.querySelector('.kbk-x,[aria-label="Đóng"]');if(b){b.click();return'x'}return'stuck'}).catch(()=>'err');
  if(st==='mg'){await o.p.evaluate(()=>{try{S.mg=null;render()}catch(e){}});continue}
  if(st!=='x')return st;await sleep(200)}return'many'}
const K=o=>o.p.evaluate(()=>({k:COOPW.tm.myKey(),rk:COOPW.tm.roomKey(),v:COOPW.tm.view(),bend:COOPW.bend,pend:COOPW.pend,pb:!!COOPW.pendBuoi,Q:Q.length,mg:!!S.mg,next:document.getElementById('next').textContent,chip:(document.getElementById('kctm')||{}).textContent||'',chipOn:!!(document.getElementById('kctm')&&!document.getElementById('kctm').hidden)}));
/* r1: a seat already night-ready by itself (a night with the Emperor → jnight) counts as pressed */
const isRd=o=>o.p.evaluate(()=>!!(window.COOPW&&COOPW.on&&COOPW.nReady&&COOPW.nReady()));
const press1=o=>o.p.evaluate(()=>{const b=document.getElementById('next');if(!b||b.disabled)return false;b.click();return true});
async function press(o,ms=20000){const t0=Date.now();while(Date.now()-t0<ms){if(await press1(o))return true;await clear(o);await sleep(300)}return false}
const setTm=(o,t)=>o.p.evaluate(t=>{Object.assign(BAL.coopTm,t)},t);
const reset=o=>o.p.evaluate(()=>COOPW.tm.reset());
/* wait until a seat has moved past key k (its own buổi, or its week end is out) */
const past=(o,k,ms)=>until(o,k=>COOPW.tm.myKey()!==k||COOPW.pend||COOPW.sent===(COOP.state.week||0),k,ms);
async function bothPast(A,B,k,ms){const t0=Date.now();while(Date.now()-t0<ms){const a=await A.p.evaluate(k=>COOPW.tm.myKey()!==k,k),b=await B.p.evaluate(k=>COOPW.tm.myKey()!==k,k);if(a&&b)return Date.now()-t0;await sleep(250)}return -1}
async function join(B,code){await B.page();await B.p.goto(BASE+'?room='+code,DCL);await B.p.waitForTimeout(3000);await tapText(B,/^Vào phòng|^Tiếp tục/,4000)}

const pickIt=(o,kind)=>o.p.evaluate(kind=>{const L=Object.keys(IT).filter(k=>{const e={k};if(!loOk(e))return false;if(kind==='burn')return typeof tsbBurnable==='function'&&tsbBurnable({inv:[e]}).length>0;return true});return L[0]||null},kind);
const give=(o,k)=>o.p.evaluate(k=>{S.inv=S.inv||[];S.inv.push({k});render();return S.inv.length},k);
const cnt=(o,k)=>o.p.evaluate(k=>(S.inv||[]).filter(e=>(k?e.k===k:loOk(e)||e.lo)&&!e.h).length,k);
const nOk=o=>o.p.evaluate(()=>(S.inv||[]).filter(e=>loOk(e)).length);
const fr=o=>o.p.evaluate(()=>{const f=COOPW.friend();return f?{inv:(f.inv||[]).map(e=>e.k).sort(),kids:(f.kids||[]).filter(k=>k.alive!==false).map(k=>k.name).sort(),preg:f.preg||0}:null});
const own=o=>o.p.evaluate(()=>({inv:(S.inv||[]).map(e=>e.k).sort(),kids:(S.kids||[]).filter(k=>k.alive!==false).map(k=>k.name).sort(),preg:S.hidden?0:(S.preg||0)}));
const act=(o,k,extra)=>o.p.evaluate(([k,extra])=>{const r0=roll,c0=caught;roll=()=>true;caught=()=>"";/* r1 fix 5: a loyal (trung) runner refuses dirty work on a roll: none of my runners is trung for the forced act */const SV=(S.staff||[]).filter(x=>x.tr==="trung");SV.forEach(x=>x.tr="lanh");try{const f=COOPW.friend();
  const okk=!!(f&&ACT[k]&&ACT[k].ok(S,f));const r=okk?runAct(S,f,k,extra):"";return{okk,r:String(r).replace(/<[^>]+>/g,'').slice(0,240)}}finally{roll=r0;caught=c0;SV.forEach(x=>x.tr="trung")}},[k,extra]);
async function waitFr(o,fn,arg,ms=15000){return until(o,fn,arg,ms)}
const seenTxt=o=>o.p.evaluate(()=>JSON.stringify(Q.map(q=>q.t+' '+(q.h||'')))+((document.getElementById('modal')||{}).textContent||''));
(async()=>{const b=await chromium.launch();
 const A=await mk(b,'host',[755,1000,2]),B=await mk(b,'guest',[1180,820,2]);
 await A.page();await A.p.goto(BASE,DCL);await A.p.waitForTimeout(3000);
 ok(await tapText(A,/^(Chơi cùng bạn|Cùng hảo hữu)/),'A: Cùng hảo hữu');await A.p.waitForTimeout(600);
 ok(await tapText(A,/^(Mời bạn|Mời hảo hữu)/),'A: Mời hảo hữu');
 ok(await until(A,()=>COOP.code&&COOP.seat==='a'),'A has a room');const code=await A.p.evaluate(()=>COOP.code);console.log('room',code);
 await join(B,code);ok(await until(B,()=>COOP.seat==='b'&&!COOP.frozen,null,60000),'B in seat b');
 {const inGame=o=>o.p.evaluate(()=>!!(COOPW.on&&typeof S!=='undefined'&&S&&!COOPW.inLife&&document.getElementById('title').hidden&&!document.getElementById('kroul')&&document.getElementById('next').offsetParent)).catch(()=>false);
  const t0=Date.now();while(Date.now()-t0<150000){await clear(A);await clear(B);if(await inGame(A)&&await inGame(B))break;await sleep(700)}
  ok(await inGame(A)&&await inGame(B),'both in the game')}
 for(let i=0;i<4;i++){await clear(A);await clear(B);await sleep(400)}
 for(const o of [A,B])await setTm(o,{buoiMs:600000});
 /* both consorts (not on the cung nữ road), A of higher rank (Xin bế con nàng về nuôi needs it) */
 for(const [o,rk] of [[A,5],[B,1]])await o.p.evaluate(rk=>{if(S.srv)S.srv.risen=1;S.rank=rk;S.bac=Math.max(S.bac||0,400);S.duc=Math.max(S.duc||0,60);render()},rk);
 ok(await until(A,()=>!!COOPW.friend(),null,30000)&&await until(B,()=>!!COOPW.friend(),null,30000),'each has the other as a consort entry');
 const kSteal=await pickIt(A,'steal'),kBurn=await pickIt(A,'burn');console.log('items',kSteal,kBurn);ok(kSteal&&kBurn,'test items found',[kSteal,kBurn]);
 /* B: two valuables, a burnable thing, three children (son 7, son 4, daughter 3), pregnant (open) */
 await B.p.evaluate(([a,c])=>{S.inv=S.inv||[];S.inv.push({k:a},{k:a},{k:c});S.kids=S.kids||[];
   const s1=mkKid('m',7),s2=mkKid('m',4),d1=mkKid('f',3);S.kids.push(s1,s2,d1);S.preg=3;S.hidden=false;S.fake=0;render()},[kSteal,kBurn]);
 ok(await waitFr(A,()=>{const f=COOPW.friend();return f&&(f.kids||[]).length>=3&&(f.inv||[]).length>=3&&f.preg>0}),'A\'s friend entry carries B\'s bag, children and open pregnancy (live pos)',await fr(A));
 const own0=await own(B);
 /* 1 laydo: thất lạc case on her side, the item in my chest */
 {const a0=await A.p.evaluate(()=>(S.inv||[]).length),b0=await nOk(B);const r=await act(A,'laydo');ok(r.okk,'1 laydo offered on the friend',r);
  const g1=await A.p.evaluate(n=>(S.inv||[]).length===n+1,a0);ok(g1,'1 laydo: the item is in A\'s chest (gain)');
  ok(g1&&await waitFr(B,n=>(S.inv||[]).filter(e=>loOk(e)).length===n-1,b0),'1 laydo: one left B\'s chest (loss)');
  ok(await B.p.evaluate(k=>(S.lost||[]).some(c=>c.cause==='riv'&&c.st==='held')),'1 laydo: B has a Đồ thất lạc case (held by the thief)',await B.p.evaluate(()=>(S.lost||[]).slice(-1)));
  ok(/thất lạc/.test(await seenTxt(B))&&!/ngấm ngầm/.test(await seenTxt(B)),'1 laydo: B sees only "thất lạc" (as from an NPC thief)');await clear(B)}
 /* 2 phonghoa: burnt on her side */
 {const b0=await cnt(B,kBurn);await sleep(1200);const r=await act(A,'phonghoa');ok(r.okk,'2 phonghoa offered',r);
  ok(await waitFr(B,b=>(S.inv||[]).filter(e=>e.k===b.k).length<b.n||(S.tsbLog||[]).some(x=>x.how==='cháy'),{k:kBurn,n:b0})||/không mất gì/.test(r.r),'2 phonghoa: B lost burnt things',r);await clear(B)}
 /* 3 ksab: her eldest child's Tài -15 */
 {await sleep(1200);const t0=await B.p.evaluate(()=>{const k=tKid(S);return k&&[k.name,k.tal]});const r=await act(A,'ksab');ok(r.okk,'3 ksab offered',r);
  ok(await waitFr(B,t=>{const k=(S.kids||[]).find(x=>x.name===t[0]);return k&&k.tal===Math.max(0,t[1]-15)},t0),'3 ksab: B\'s '+(t0&&t0[0])+' Tài -15',await B.p.evaluate(()=>(S.kids||[]).map(k=>k.name+':'+k.tal)));await clear(B)}
 /* 4 musk: she miscarries */
 {await sleep(1200);const s0=await B.p.evaluate(()=>S.suc);const r=await act(A,'musk');ok(r.okk,'4 musk offered (open pregnancy)',r);
  ok(await waitFr(B,s=>!S.preg&&S.suc<s,s0),'4 musk: B lost the pregnancy, Sức down',await B.p.evaluate(()=>[S.preg,S.suc]));await clear(B)}
 /* 5 takeaway: a child under 6 moves to A */
 {await sleep(1200);const nA=await A.p.evaluate(()=>(S.kids||[]).length);const r=await act(A,'takeaway');ok(r.okk,'5 takeaway offered (A higher rank)',r);
  const nm=await A.p.evaluate(n=>(S.kids||[]).length>n?S.kids[S.kids.length-1].name:null,nA);ok(!!nm,'5 takeaway: the child is in A\'s house (gain)',nm);
  ok(!!nm&&await waitFr(B,n=>!(S.kids||[]).some(k=>k.name===n),nm),'5 takeaway: the child left B\'s house (loss)');await clear(B)}
 /* 6 pond (forced: drowns): her child dies on her side */
 {await sleep(1200);const r=await act(A,'pond');ok(r.okk,'6 pond offered',r);
  ok(await waitFr(B,()=>(S.kids||[]).some(k=>k.alive===false)),'6 pond: a child of B died on HER side',await B.p.evaluate(()=>(S.kids||[]).map(k=>k.name+':'+k.alive)));
  await B.p.screenshot({path:OUT+'/b1-guest-note-1180x820.png'});await clear(B)}
 /* 7 plant: a hidden thing lands in her chest silently */
 {await sleep(1200);await give(A,kSteal);const ix=await A.p.evaluate(k=>S.inv.findIndex(e=>e.k===k&&!e.h&&!e.lo),kSteal);const b0=await B.p.evaluate(()=>(S.inv||[]).filter(e=>e.h).length);
  const r=await act(A,'plant',ix);ok(r.okk,'7 plant offered',r);
  ok(await waitFr(B,n=>(S.inv||[]).filter(e=>e.h).length===n+1,b0),'7 plant: the hidden item is in B\'s chest');
  ok(!/Quà tặng/.test(await seenTxt(B)),'7 plant: no gift dialog for a planted thing');await clear(B)}
 /* 7b "Lén trả lại": the stolen thing (case 1) slipped back through Cài đồ: her case closes, the thing is back, no gift dialog */
 {await sleep(1200);const ix=await A.p.evaluate(()=>S.inv.findIndex(e=>e.lo&&!e.h));const n0=await B.p.evaluate(()=>(S.inv||[]).length);
  if(ix<0)ok(false,'7b A still holds the stolen thing');else{const r=await act(A,'plant',ix);ok(r.okk,'7b return offered',r);
   ok(await waitFr(B,n=>(S.inv||[]).length===n+1&&(S.lost||[]).some(c=>c.cause==='riv'&&c.st==='done'),n0),'7b B: the thing is back, her thất lạc case closed',await B.p.evaluate(()=>(S.lost||[]).map(c=>c.st)));
   ok(!/Quà tặng/.test(await seenTxt(B)),'7b no gift dialog for a returned thing')}await clear(B)}
 /* 8 guest → host: B steals from A */
 {await sleep(1200);await give(A,kSteal);await give(A,kSteal);await sleep(1500);const a0=await cnt(A,kSteal),b0=await cnt(B,kSteal);
  ok(await waitFr(B,k=>{const f=COOPW.friend();return f&&(f.inv||[]).some(e=>e.k===k)},kSteal),'8 B sees A\'s bag');
  const a1=await nOk(A),b1=await B.p.evaluate(()=>(S.inv||[]).length);const r=await act(B,'laydo');ok(r.okk,'8 B: laydo on the host',r);const g8=await B.p.evaluate(n=>(S.inv||[]).length===n+1,b1);ok(g8,'8 B gained it');
  ok(g8&&await waitFr(A,n=>(S.inv||[]).filter(e=>loOk(e)).length===n-1,a1),'8 A lost it',[a1,await nOk(A)]);await clear(A)}
 await A.p.screenshot({path:OUT+'/b1-host-755x1000.png'});
 /* 9 week merge: each entry == the other's own */
 {for(let i=0;i<3;i++){await clear(A);await clear(B)}const w0=await A.p.evaluate(()=>COOP.state.week);
  for(let g=0;g<8;g++){const a=await A.p.evaluate(()=>S.buoi||0),c=await B.p.evaluate(()=>S.buoi||0);await press(A);await press(B);
   const t0=Date.now();while(Date.now()-t0<30000){await clear(A);await clear(B);if(await A.p.evaluate(w=>COOP.state.week>w,w0)&&await B.p.evaluate(w=>COOP.state.week>w,w0))break;if(await A.p.evaluate(x=>(S.buoi||0)!==x,a)&&await B.p.evaluate(x=>(S.buoi||0)!==x,c))break;await sleep(400)}
   if(await A.p.evaluate(w=>COOP.state.week>w&&!COOPW.pend,w0)&&await B.p.evaluate(w=>COOP.state.week>w&&!COOPW.pend,w0))break}
  ok(await A.p.evaluate(w=>COOP.state.week===w+1,w0)&&await B.p.evaluate(w=>COOP.state.week===w+1,w0),'9 week merged');for(let i=0;i<3;i++){await clear(A);await clear(B);await sleep(300)}await sleep(2500);
  const fa=await fr(A),ob=await own(B),fb=await fr(B),oa=await own(A);
  ok(JSON.stringify(fa&&fa.kids)===JSON.stringify(ob.kids),'9 A\'s entry children == B\'s own children',[fa&&fa.kids,ob.kids]);
  ok(JSON.stringify(fa&&fa.inv)===JSON.stringify(ob.inv),'9 A\'s entry bag == B\'s own bag',[fa&&fa.inv,ob.inv]);
  ok(JSON.stringify(fb&&fb.inv)===JSON.stringify(oa.inv),'9 B\'s entry bag == A\'s own bag',[fb&&fb.inv,oa.inv]);
  ok(ob.kids.length===own0.kids.length-2,'9 B: two children fewer after the week (taken + drowned)',[own0.kids,ob.kids])}
 for(const o of [A,B])ok(!o.errs.length,o.name+': no page errors',o.errs.slice(0,5));
 /* item ledger (review/item-ledger-solo): pieces the live path took from her chest are recorded, never netted into a store copy (one piece, one place) */
 if(await B.p.evaluate(()=>typeof ilS==='function')){for(const [n,P] of [['A',A],['B',B]]){const L=await P.p.evaluate(()=>{try{ilCensus()}catch(e){}const I=ilS();return{net:I.net,coop:I.log.filter(l=>/hảo hữu/.test(l[5])).map(l=>l[2]+':'+l[5]).slice(-6)}});
   ok(L.net===0,n+' ledger: no net after the co-op item acts',L)}
  /* a piece taken as "lost" stays in her Đồ thất lạc case (located); burnt / handed-over ones are logged "hảo hữu …" — either way never netted */}
 const bad=res.filter(r=>!r[0]);console.log(`\n${res.length-bad.length}/${res.length} passed`);fs.writeFileSync(OUT+'/result.txt',res.map(r=>(r[0]?'ok  ':'FAIL')+' '+r[1]).join('\n')+'\n');
 await b.close();process.exit(bad.length?1:0)})().catch(e=>{console.error(e);process.exit(2)});
