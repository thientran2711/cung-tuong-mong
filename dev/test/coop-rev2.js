/* REVIEWER r2 (review/coop-b1b5-r2): 64-item bag + 4 kids + pregnancy: every pos (both seats) < 4000; laydo + takeaway; then B rejoins, A rejoins,
   a week merges: no duplicate / lost item or child across both seats (tally), entry == own; then B on the OLD build (mixed clients): no page errors,
   her place still reaches A, A sends no endless 'ask', the week still merges. usage: build .tmp/old.html (origin/main) first; node dev/test/coop-rev2.js
   (was: Co-op B1 (review/coop-b1b5): steal / burn / extort the FRIEND's items, harm / take her children, miscarriage — 2 browsers, LIVE Worker.
   usage: python3 dev/build/assemble.py && node dev/test/coop-b1.js [outdir] [workerURL]
   A = host 755x1000@2, B = guest 1180x820@2. Dice forced (success, undetected) where the case needs it.
   Checks per act: the act is OFFERED on her entry (ACT.ok), my gain lands on my side, her loss lands on HER own S through `res.fam`,
   her note / Đồ thất lạc case, and after the week merge her entry on my side == her own S (bag keys, children). */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');
const ROOT=path.resolve(__dirname,'../..');const BASE='http://ctm.local/';let HTML=path.join(ROOT,'.tmp/old.html');
const MIME={'.html':'text/html; charset=utf-8','.js':'text/javascript','.json':'application/json','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.mp3':'audio/mpeg','.css':'text/css','.webmanifest':'application/manifest+json','.svg':'image/svg+xml'};
async function serve(ctx){ctx.__html=ctx.__html||path.join(ROOT,'dev/index.html');await ctx.route(BASE+'**',async route=>{const u=new URL(route.request().url());let p=decodeURIComponent(u.pathname);
 if(p==='/'||p==='/index.html'){const body='<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"></head><body>'+fs.readFileSync(ctx.__html,'utf8')+'</body></html>';return route.fulfill({status:200,contentType:MIME['.html'],body})}
 const f=path.join(ROOT,p);if(!f.startsWith(ROOT)||!fs.existsSync(f)||fs.statSync(f).isDirectory())return route.fulfill({status:404,body:'nf'});route.fulfill({status:200,contentType:MIME[path.extname(f)]||'application/octet-stream',body:fs.readFileSync(f)})})}
const OUT=path.resolve(process.argv[2]||path.join(__dirname,'../../.tmp/coop-rev2'));fs.mkdirSync(OUT,{recursive:true});
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
   const rs=document.querySelector('#kroul .krskip');if(rs&&rs.offsetParent!==null){rs.click();return'x'}/* bot family (jfocus «Tiếp ▸» dialogue line, e.g. cnvScold on a cung nữ): a player taps the line on */{const kf=[...document.querySelectorAll('.kfoc-next')].find(x=>x.offsetParent!==null);if(kf){kf.click();return'x'}}
   const bk=[...document.querySelectorAll('.kbk-x,.kbk-bar button')].find(x=>x.offsetParent!==null&&(/^Lui$/.test(x.textContent.trim())||/^(Lui|Đóng)$/.test(x.getAttribute('aria-label')||'')));if(bk){bk.click();return'x'}
   const m=document.getElementById('modal');if(!m||m.hidden)return typeof S!=='undefined'&&S&&S.mg?'mg':'';const all=[...m.querySelectorAll('button:not([disabled])')].filter(x=>x.offsetParent!==null);const b=all.find(x=>/^Nhận thân phận/.test(x.textContent.trim()))||all.find(x=>!x.dataset.kcp&&/Nhận thân phận|Nhập cung|Tiến cung|Vào cung/.test(x.textContent))||m.querySelector('#mr button:not([disabled])')||m.querySelector('.opts button:not([disabled]):not([data-kcp])')||m.querySelector('.kbk-x,[aria-label="Đóng"]')||[...m.querySelectorAll('.dlg .kit-x')].find(x=>x.offsetParent!==null);if(b){b.click();return'x'}return'stuck'}).catch(()=>'err');
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
const act=(o,k,extra)=>o.p.evaluate(([k,extra])=>{const r0=roll,c0=caught;roll=()=>true;caught=()=>"";/* reviewer fix-r1 (as coop-b1 r1 fix 5): a loyal (trung) runner refuses dirty work on a roll: none is trung for the forced act *//* trait pool (owner OD 17/11 ~05:45Z, d296f3cd): loyalty is the pool quality netQ(p,"loyal"), the old .tr field is no longer read */const q0=netQ,SV=new Set(S.staff||[]);netQ=function(p,q){return q==="loyal"&&SV.has(p)?0:q0.apply(this,arguments)};try{const f=COOPW.friend();
  const okk=!!(f&&ACT[k]&&ACT[k].ok(S,f));const r=okk?runAct(S,f,k,extra):"";return{okk,r:String(r).replace(/<[^>]+>/g,'').slice(0,240)}}finally{netQ=q0;roll=r0;caught=c0}},[k,extra]);
async function waitFr(o,fn,arg,ms=15000){return until(o,fn,arg,ms)}
const seenTxt=o=>o.p.evaluate(()=>JSON.stringify(Q.map(q=>q.t+' '+(q.h||'')))+((document.getElementById('modal')||{}).textContent||''));


const tally=async(A,B)=>{const a=await A.p.evaluate(()=>({inv:(S.inv||[]).filter(e=>!e.h).map(e=>e.k),kids:(S.kids||[]).filter(k=>k.alive!==false).map(k=>k.name)}));
 const b=await B.p.evaluate(()=>({inv:(S.inv||[]).filter(e=>!e.h).map(e=>e.k),kids:(S.kids||[]).filter(k=>k.alive!==false).map(k=>k.name)}));
 const inv={};for(const k of a.inv.concat(b.inv).sort())inv[k]=(inv[k]||0)+1;const kc={};for(const k of a.kids.concat(b.kids).sort())kc[k]=(kc[k]||0)+1;
 return {n:a.inv.length+b.inv.length,inv,kids:kc,dupKids:Object.keys(kc).filter(k=>kc[k]>1),aK:a.kids.length,bK:b.kids.length}};
const same=(x,y)=>JSON.stringify(x)===JSON.stringify(y);
const entryEq=async(o,p)=>{const f=await fr(o),w=await own(p);return f&&same(f.inv,w.inv)&&same(f.kids,w.kids)};
(async()=>{const b=await chromium.launch();
 const A=await mk(b,'host',[755,1000,2]),B=await mk(b,'guest',[1180,820,2]);
 const inGame=o=>o.p.evaluate(()=>!!(COOPW.on&&typeof S!=='undefined'&&S&&!COOPW.inLife&&document.getElementById('title').hidden&&!document.getElementById('kroul')&&document.getElementById('next').offsetParent)).catch(()=>false);
 async function bothIn(lbl){const t0=Date.now();while(Date.now()-t0<150000){await clear(A);await clear(B);if(await inGame(A)&&await inGame(B))break;await sleep(700)}ok(await inGame(A)&&await inGame(B),lbl)}
 const hook=o=>o.p.evaluate(()=>{window.__pos=[];window.__ask=0;window.__fam=[];const s0=COOP.send.bind(COOP);COOP.send=function(m){try{if(m&&m.t==='pos'){const x=Object.assign({},m);delete x.t;delete x.from;window.__pos.push(JSON.stringify(x).length)}if(m&&m.t==='act'&&m.k==='ctm-fam'){if(m.mode==='ask')window.__ask++;else window.__fam.push(JSON.stringify(m).length)}}catch(e){}return s0.apply(this,arguments)}});
 const posMax=o=>o.p.evaluate(()=>[Math.max(0,...(window.__pos||[])),(window.__pos||[]).length,window.__ask||0,Math.max(0,...(window.__fam||[]))]);
 await A.page();await A.p.goto(BASE,DCL);await A.p.waitForTimeout(3000);
 ok(await tapText(A,/^(Chơi cùng bạn|Cùng hảo hữu)/),'A: Cùng hảo hữu');await A.p.waitForTimeout(600);
 ok(await tapText(A,/^(Mời bạn|Mời hảo hữu)/),'A: Mời hảo hữu');
 ok(await until(A,()=>COOP.code&&COOP.seat==='a'),'A has a room');const code=await A.p.evaluate(()=>COOP.code);console.log('room',code);
 await join(B,code);ok(await until(B,()=>COOP.seat==='b'&&!COOP.frozen,null,60000),'B in seat b');
 await bothIn('both in the game');
 for(const o of [A,B])await setTm(o,{buoiMs:600000});
 for(const [o,rk] of [[A,5],[B,1]])await o.p.evaluate(rk=>{if(S.srv)S.srv.risen=1;S.rank=rk;S.bac=Math.max(S.bac||0,400);S.duc=Math.max(S.duc||0,60);render()},rk);
 ok(await until(A,()=>!!COOPW.friend(),null,30000)&&await until(B,()=>!!COOPW.friend(),null,30000),'each has the other as a consort entry');
 for(const o of [A,B])await hook(o);
 /* 64 real items with long provenance strings + 4 kids (<6) + a pregnancy on B; 12 items + 2 kids on A */
 await B.p.evaluate(()=>{const L=Object.keys(IT).filter(x=>loOk({k:x}));S.inv=S.inv||[];for(let i=0;i<64;i++)S.inv.push({k:L[(i*7)%L.length],src:'Ngự ban dịp Vạn thọ tiết năm thứ '+i+' của Hoàng thượng',giver:'Hoàng thượng',d:'được ban sau yến tiệc ở Ngự hoa viên, có khắc chữ'});
  S.kids=S.kids||[];let j=0;for(const [g,a] of [['m',3],['f',4],['m',5],['f',2]]){const k=mkKid(g,a);k.name+=' B'+(++j);S.kids.push(k)}S.preg=2;S.hidden=false;S.fake=0;render()});
 await A.p.evaluate(()=>{const L=Object.keys(IT).filter(x=>loOk({k:x}));S.inv=S.inv||[];for(let i=0;i<12;i++)S.inv.push({k:L[(i*5+3)%L.length],src:'quà Thái hậu ban'});S.kids=S.kids||[];{const k1=mkKid('m',7),k2=mkKid('f',9);k1.name+=' A1';k2.name+=' A2';S.kids.push(k1,k2)}render()});
 const nB=await B.p.evaluate(()=>({inv:S.inv.length,kids:S.kids.filter(k=>k.alive!==false).length}));ok(nB.inv>=64&&nB.kids>=4,'B: >=64 items + >=4 children',nB);
 ok(await until(A,n=>{const f=COOPW.friend();return f&&(f.inv||[]).length===n.inv&&(f.kids||[]).length===n.kids},nB,20000),'A: her whole bag + kids on her entry');
 for(const o of [A,B])await o.p.evaluate(()=>{S.sung=Math.min(100,(S.sung||0)+3);used=0;try{goTo('vuon')}catch(e){}render()});await sleep(3000);
 {const pa=await posMax(A),pb=await posMax(B);console.log('pos A',pa,'pos B',pb);ok(pa[0]>0&&pa[0]<4000&&pb[0]>0&&pb[0]<4000,'every pos from both seats < 4000 chars (Worker measure)',{A:pa,B:pb});
  ok(pb[3]>4000,'the ctm-fam relay carries the big bag (it alone is over the pos cap)',pb[3])}
 const T0=await tally(A,B);console.log('tally0',T0.n,T0.aK,T0.bK);ok(!T0.dupKids.length,'tally0 no duplicate kid',T0.dupKids);
 /* laydo + takeaway: A gains, B loses, totals stay */
 {const r=await act(A,'laydo');ok(r.okk,'laydo offered on her big bag',r);await sleep(2500);await clear(B);
  const r2=await act(A,'takeaway');ok(r2.okk,'takeaway offered (A higher rank)',r2);await sleep(2500);await clear(B);await clear(A)}
 const T1=await tally(A,B);console.log('tally1',T1.n,T1.aK,T1.bK);
 ok(T1.aK===T0.aK+1&&T1.bK===T0.bK-1&&!T1.dupKids.length&&same(Object.keys(T1.kids).sort(),Object.keys(T0.kids).sort()),'takeaway: kid moved A+1 / B-1, none duplicated or lost',[T0.aK,T0.bK,T1.aK,T1.bK,T1.dupKids]);
 const lostB=await B.p.evaluate(()=>(S.lost||[]).filter(c=>c.st!=='done').map(c=>c.k||(c.e&&c.e.k)));
 ok(T1.n===T0.n&&same(T1.inv,T0.inv),'laydo: the item moved (total and per-key counts unchanged across seats)',[T0.n,T1.n,lostB]);
 ok(await until(A,()=>true,null,1)&&await entryEq(A,B)||await until(A,()=>true,null,6000)&&await entryEq(A,B),'A: her entry == her own after the acts');
 ok(await entryEq(B,A),'B: my entry == my own after the acts');
 /* B rejoins (reload, same build) */
 await B.p.goto(BASE+'?room='+code,DCL);await B.p.waitForTimeout(3000);await tapText(B,/^Vào phòng|^Tiếp tục|^Trở lại phòng/,4000);
 ok(await until(B,()=>typeof COOPW==='object'&&COOPW.on&&COOP.seat==='b',null,60000),'B rejoined');await bothIn('both in the game after B rejoin');
 for(let i=0;i<20&&!(await entryEq(A,B)&&await entryEq(B,A));i++)await sleep(1000);
 {const T=await tally(A,B);console.log('tally B-rejoin',T.n,T.aK,T.bK);ok(T.n===T0.n&&same(T.inv,T0.inv)&&same(T.kids,T1.kids),'after B rejoin: no item / kid duplicated or lost',[T.n,T.aK,T.bK,T.dupKids]);
  ok(await entryEq(A,B)&&await entryEq(B,A),'after B rejoin: both entries == own',[await fr(A).then(x=>x&&[x.inv.length,x.kids.length]),await own(B).then(x=>[x.inv.length,x.kids.length])])}
 /* A rejoins */
 await A.p.goto(BASE+'?room='+code,DCL);await A.p.waitForTimeout(3000);await tapText(A,/^Vào phòng|^Tiếp tục|^Trở lại phòng/,4000);
 ok(await until(A,()=>typeof COOPW==='object'&&COOPW.on&&COOP.seat==='a',null,60000),'A rejoined');await bothIn('both in the game after A rejoin');
 for(let i=0;i<20&&!(await entryEq(A,B)&&await entryEq(B,A));i++)await sleep(1000);
 {const T=await tally(A,B);console.log('tally A-rejoin',T.n,T.aK,T.bK);ok(T.n===T0.n&&same(T.inv,T0.inv)&&same(T.kids,T1.kids),'after A rejoin: no item / kid duplicated or lost',[T.n,T.aK,T.bK,T.dupKids]);
  ok(await entryEq(A,B)&&await entryEq(B,A),'after A rejoin: both entries == own')}
 /* the week merges */
 const wk2=await A.p.evaluate(()=>COOP.state.week||0);
 for(let i=0;i<50;i++){await clear(A);await clear(B);await press1(A);await press1(B);await sleep(800);
  const w=await A.p.evaluate(()=>COOP.state.week||0);const w2=await B.p.evaluate(()=>COOP.state.week||0);if(w>wk2&&w2>wk2)break}
 ok((await A.p.evaluate(()=>COOP.state.week||0))>wk2&&(await B.p.evaluate(()=>COOP.state.week||0))>wk2,'a week merged after both rejoins');
 for(let i=0;i<6;i++){await clear(A);await clear(B);await sleep(400)}
 for(let i=0;i<20&&!(await entryEq(A,B)&&await entryEq(B,A));i++)await sleep(1000);
 {const T=await tally(A,B);console.log('tally merged',T.n,T.aK,T.bK);
  /* the merged week may legitimately add/remove items through the normal game (gifts, stipend events): compare the moved item + kids only */
  ok(same(T.kids,T1.kids)||(!T.dupKids.length&&T.aK>=T1.aK-0&&T.bK<=T1.bK),'merged week: kids not duplicated or lost',[T.aK,T.bK,T.dupKids]);
  ok(await entryEq(A,B)&&await entryEq(B,A),'merged week: both entries == own')}
 const pa=await posMax(A),pb=await posMax(B);ok(pa[0]<4000&&pb[0]<4000,'every pos still < 4000 after rejoin + merge',{A:pa,B:pb});
 await shot(A,'rev2-host-755x1000');await shot(B,'rev2-guest-1180x820');
 /* main's jcycle defers the host's week flip behind the maid's Kỳ nguyệt sự card (flip runs again from the card, after endTurn):
    the night must still be ONE fact: the host draws with the friend in its deck, tn names the NEW week, the guest gets her night */
 await A.p.evaluate(()=>{window.__fw='f';if(!window.__ff){window.__ff=1;const f=flip;flip=function(){const w=window.__fw;if(w==null)return f.apply(this,arguments);
   const r0=roll,n0=nightCh;roll=x=>x>=60;nightCh=p=>{const id=p===S?'me':p.coop?'f':'npc'+p.id;return id===w?100:0};try{return f.apply(this,arguments)}finally{roll=r0;nightCh=n0}}}
  /* her cycle tuần = the tuần the week's flip opens (S.tuan+1): a name whose cyBase t matches (cycle = pure function of the name), a maid, not pregnant */
  if(!S.maid)S.maid=(S.staff||[])[0]||{name:'Thử',loyal:60};S.preg=0;S.hidden=false;if(S.cyb){delete S.cyb.rk;delete S.cyb.df}
  const want=((S.tuan||0)+1)%3,base=S.name;window.__nm0=base;for(let i=0;i<400;i++){S.name=base+(i?' '+i:'');if(cyBase(S).t===want)break}window.__cyWant=[want,cyBase(S).t,S.name];
  const p0=PEND.cyrep;PEND.cyrep=function(){window.__cyRan=1;return p0.apply(this,arguments)};render()});
 {const w0=await A.p.evaluate(()=>COOP.state.week||0);
  for(let i=0;i<50;i++){await clear(A);await clear(B);await press1(A);await press1(B);await sleep(800);
   const w=await A.p.evaluate(()=>COOP.state.week||0);const w2=await B.p.evaluate(()=>COOP.state.week||0);if(w>w0&&w2>w0)break}
  for(let i=0;i<4;i++){await clear(A);await sleep(300)}
  const a=await A.p.evaluate(()=>({w:COOP.state.week,tn:S.tn,t:S.tonight==='me'?'me':S.tonight&&S.tonight.id,ran:window.__cyRan,want:window.__cyWant})),c=await B.p.evaluate(()=>({w:COOP.state.week,tn:S.tn,t:S.tonight==='me'?'me':S.tonight&&S.tonight.id,dil:(window.__dl||[])}));
  ok(a.ran&&a.tn&&a.tn.w===a.w&&a.tn.who===902&&a.t===902,'deferred flip (jcycle card): host drew the guest, tn = the new week',a);
  ok(c.tn&&c.tn.w===c.w&&c.tn.who===902&&c.t==='me','deferred flip: the guest has her night from the host (one fact)',c);
  await A.p.evaluate(()=>{window.__fw=null})}
 /* mixed clients: B on the OLD build (origin/main) */
 B.ctx.__html=path.join(ROOT,'.tmp/old.html');B.errs.length=0;
 await B.p.goto(BASE+'?room='+code,DCL);await B.p.waitForTimeout(3000);await tapText(B,/^Vào phòng|^Tiếp tục|^Trở lại phòng/,4000);
 ok(await until(B,()=>typeof COOPW==='object'&&COOPW.on&&COOP.seat==='b',null,60000),'OLD B rejoined');await bothIn('both in the game (B old)');
 await A.p.evaluate(()=>{window.__ask=0});
 {const pl=await B.p.evaluate(()=>{used=0;try{goTo('thu')}catch(e){}S.sung=Math.min(100,(S.sung||0)+2);render();return {place:S.place,sung:S.sung}});
  ok(await until(A,s=>{const f=COOPW.friend();return f&&COOPW.fpos&&COOPW.fpos.place===s.place&&f.sung===s.sung},pl,15000),'new A: old B place + Sủng still arrive',pl)}
 await sleep(6000);ok((await A.p.evaluate(()=>window.__ask||0))<=1,'new A sends no endless ask to the old client',await A.p.evaluate(()=>window.__ask||0));
 const wk3=await A.p.evaluate(()=>COOP.state.week||0);
 for(let i=0;i<50;i++){await clear(A);await clear(B);await press1(A);await press1(B);await sleep(800);
  const w=await A.p.evaluate(()=>COOP.state.week||0);const w2=await B.p.evaluate(()=>COOP.state.week||0);if(w>wk3&&w2>wk3)break}
 ok((await A.p.evaluate(()=>COOP.state.week||0))>wk3&&(await B.p.evaluate(()=>COOP.state.week||0))>wk3,'mixed: a week merges (new host, old guest)');
 const tn=await A.p.evaluate(()=>JSON.stringify((S.tn&&S.tn.w)||null)),tnB=await B.p.evaluate(()=>JSON.stringify((S.tn&&S.tn.w)||null));console.log('tn',tn,tnB);
 await shot(B,'rev2-oldguest-1180x820');
 ok(!A.errs.length,'host: no page errors',A.errs.slice(0,5));ok(!B.errs.length,'old guest: no page errors',B.errs.slice(0,5));
 await b.close();const f=res.filter(x=>!x[0]).length;console.log('RESULT',res.length-f,'/',res.length);process.exit(f?1:0)})().catch(e=>{console.error(e);process.exit(2)});
