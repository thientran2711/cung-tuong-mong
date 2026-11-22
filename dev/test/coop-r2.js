/* Co-op r1 fixes (review/coop-b1b5-p2 successor): (1) big chest — 150 items + 6 children: every pos < the LIVE Worker's 4000-char cap,
   the friend's place / stats keep updating, bag + kids reach her entry over the ctm-fam relay, a lost relay is asked again;
   (2) every NPC act on the guest through the REAL mindRun path (takeaway / petsteal / musk / kpoison, forced dice): she loses exactly what
   the NPC gains, no second copy after the merge; (3) the in-week night is host-authoritative (crossing claims → one value); (4) full seat
   = the OD:L1228 compensation, no waiting claim. usage: python3 dev/build/assemble.py && node dev/test/coop-r2.js [outdir] [workerURL] */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');
const {serve,BASE}=require('./coop-serve.js');
const OUT=path.resolve(process.argv[2]||path.join(__dirname,'../../.tmp/coop-r2'));fs.mkdirSync(OUT,{recursive:true});
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
async function clear(o,n=25){for(let i=0;i<n;i++){const st=await require('./lib/coop-clear.js').first(o,()=>{const ke=[...document.querySelectorAll('.kmov .kmend')].find(x=>x.offsetParent!==null&&!x.disabled);if(ke){ke.click();return'x'}const kv=[...document.querySelectorAll('.kmov')].find(x=>!x.classList.contains('km-out')&&!x.querySelector('.kmend')&&!x.dataset.tsk);if(kv){kv.dataset.tsk=1;kv.click();return'x'}
   
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
const act=(o,k,extra)=>o.p.evaluate(([k,extra])=>{const r0=roll,c0=caught;roll=()=>true;caught=()=>"";/* r1 fix 5: a loyal (trung) runner refuses dirty work on a roll: none of my runners is trung for the forced act *//* trait pool (owner OD 17/11 ~05:45Z, d296f3cd): loyalty is the pool quality netQ(p,"loyal"), the old .tr field is no longer read */const q0=netQ,SV=new Set(S.staff||[]);netQ=function(p,q){return q==="loyal"&&SV.has(p)?0:q0.apply(this,arguments)};try{const f=COOPW.friend();
  const okk=!!(f&&ACT[k]&&ACT[k].ok(S,f));const r=okk?runAct(S,f,k,extra):"";return{okk,r:String(r).replace(/<[^>]+>/g,'').slice(0,240)}}finally{roll=r0;caught=c0;netQ=q0}},[k,extra]);
async function waitFr(o,fn,arg,ms=15000){return until(o,fn,arg,ms)}
let CW_kid=null;
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
 /* the pos the Worker would store: what B sends, measured as the Worker does (t / from dropped) */
 await B.p.evaluate(()=>{window.__pos=[];const s0=COOP.send.bind(COOP);COOP.send=function(o){try{if(o&&o.t==='pos'){const x=Object.assign({},o);delete x.t;delete x.from;window.__pos.push(JSON.stringify(x).length)}}catch(e){}return s0.apply(this,arguments)}});
 /* ================= (1) big chest ================= */
 const kSteal=await pickIt(A,'steal');
 await B.p.evaluate(k=>{const L=Object.keys(IT).filter(x=>loOk({k:x}));S.inv=S.inv||[];for(let i=0;i<150;i++)S.inv.push({k:L[i%L.length],src:'Phần thưởng hội thi mùa xuân năm thứ '+i,giver:'Hoàng thượng',d:'ngự ban sau đêm thị tẩm, khắc tên'});
   S.inv.push({k},{k});S.kids=S.kids||[];for(const [g,a] of [['m',7],['m',5],['f',4],['m',3],['f',6],['m',8]])S.kids.push(mkKid(g,a));S.preg=3;S.hidden=false;S.fake=0;
   try{petAdd(S,Object.keys(PET)[0],'shop')}catch(e){}render()},kSteal);
 const nB=await B.p.evaluate(()=>({inv:S.inv.length,kids:S.kids.filter(k=>k.alive!==false).length,pets:(S.pets||[]).length}));
 ok(nB.inv>=150&&nB.kids>=6,'1 B: big chest + 6 children',nB);
 ok(await until(A,n=>{const f=COOPW.friend();return f&&(f.inv||[]).length===n.inv&&(f.kids||[]).length===n.kids&&f.preg>0},nB,20000),'1 A: her whole bag + children reached her entry (ctm-fam relay)',await fr(A).then(x=>x&&{inv:x.inv.length,kids:x.kids.length}));
 const bagLen=await B.p.evaluate(()=>JSON.stringify(COOPW.famPack().fm).length);console.log('bag json chars',bagLen);
 ok(bagLen>4000,'1 the bag alone is over the cap (the old pos would have been dropped)',bagLen);
 {const st0=await B.p.evaluate(()=>{S.sung=Math.min(100,(S.sung||0)+7);used=0;try{goTo('vuon')}catch(e){}render();return {sung:S.sung,place:S.place}});
  ok(await until(A,s=>{const f=COOPW.friend();return f&&f.sung===s.sung&&COOPW.fpos&&COOPW.fpos.place===s.place},st0,15000),'1 A: her place + Sủng still update with the big chest',[st0,await A.p.evaluate(()=>{const f=COOPW.friend();return [f&&f.sung,COOPW.fpos&&COOPW.fpos.place]})]);}
 const mx=await B.p.evaluate(()=>Math.max(0,...window.__pos));ok(mx>0&&mx<4000,'1 every pos B sent < 4000 chars',[mx,await B.p.evaluate(()=>window.__pos.length)]);
 /* a relay lost (A forgot it): the next pos hash makes A ask, B sends again */
 {await A.p.evaluate(()=>{COOPW.famGotH='';COOPW.famLast=null;const f=COOPW.friend();f.inv=[];f.kids=[]});await B.p.evaluate(()=>{S.danh=Math.min(100,(S.danh||0)+1);render()});
  ok(await until(A,n=>{const f=COOPW.friend();return f&&(f.inv||[]).length===n.inv&&(f.kids||[]).length===n.kids},nB,15000),'1 A: a lost relay is asked again and restored')}
 /* B steals from the big chest of A? no: A steals from B's big chest — the item op still names the right entry */
 {const a0=await A.p.evaluate(()=>(S.inv||[]).length),b0=await nOk(B);const r=await act(A,'laydo');ok(r.okk,'1 laydo offered on the big chest',r);const g=await A.p.evaluate(n=>(S.inv||[]).length===n+1,a0);ok(g,'1 laydo: gain on A');
  ok(g&&await waitFr(B,n=>(S.inv||[]).filter(e=>loOk(e)).length===n-1,b0),'1 laydo: loss on B');await clear(B);await clear(A)}
 /* ================= (2) NPC acts on her, the real mindRun path ================= */
 const npc=(k,pre)=>A.p.evaluate(([k,pre])=>{const f=COOPW.friend();if(!f)return {err:'no friend'};const r0=roll,c0=caught;
   /* deterministic (r1 fix 5): every roll forced; a fresh NPC per act whose runners are not loyal (a trung runner refuses dirty work), the next one if the act did not run */
   window.__usedN=window.__usedN||[];const L=liveRivals(true).filter(r=>!r.coop&&r.alive&&!r.out&&!r.confined&&!window.__usedN.includes(r.id)).sort((a,b)=>rkOf(b)-rkOf(a));let last={err:'no npc'};
   for(const v of L.slice(0,6)){if(pre==='rank'){v.rank=Math.max(v.rank||0,6)}if(pre==='pet'){v.pets=[]}/* trait pool d296f3cd: no loyal runner (netIs 'loyal'), swap the loyal nết for a non-loyal one of the same group */(v.staff||[]).forEach(x=>{if(!netIs(x,'loyal'))return;const n=netOf(x).slice(),P=BAL.net[netSex(x)==='m'?'M':'F'],lq=t=>((BAL.net.T[t]||{}).q||{}).loyal>0;['tt','ld','ch'].forEach((g,i)=>{if(lq(n[i]))n[i]=P[g].find(t=>!lq(t))||n[i]});x.net=n});
    const ok=!!(ACT[k]&&ACT[k].ok(v,f));if(!ok){last={ok,v:v.id};continue}const kids0=(v.kids||[]).length,pets0=(v.pets||[]).length,inv0=(v.inv||[]).length;
    roll=()=>true;caught=()=>"";const j0=window.__j95off;window.__j95off=1;/* main j95 motive gate (schedules3): a forced act by a random NPC has no motive; this suite checks the co-op relay, not motives */let r="";try{r=mindRun(v,f,k,0)}finally{roll=r0;caught=c0;window.__j95off=j0}window.__usedN.push(v.id);
    last={ok,v:v.id,vn:v.name,r:String(r).replace(/<[^>]+>/g,'').slice(0,200),kids:(v.kids||[]).length-kids0,pets:(v.pets||[]).length-pets0,inv:(v.inv||[]).length-inv0,
     kidN:(v.kids||[]).length>kids0?v.kids[v.kids.length-1].name:null,on:(COOPW.npcOn||[]).slice(-1)[0]||null};if(last.r)return last}
   return last},[k,pre]);
 /* takeaway: a child under 6 goes to the NPC's house */
 {await sleep(1200);const b0=await B.p.evaluate(()=>S.kids.filter(k=>k.alive!==false).length);const x=await npc('takeaway','rank');ok(x.ok,'2 NPC takeaway offered on her',x);
  ok(x.kids===1&&!!x.kidN,'2 takeaway: the child is in the NPC\'s house (gain)',x);
  ok(!!x.kidN&&await waitFr(B,([n,b])=>!(S.kids||[]).some(k=>k.name===n)&&S.kids.filter(k=>k.alive!==false).length===b-1,[x.kidN,b0]),'2 takeaway: the child left HER house (loss)',await B.p.evaluate(()=>S.kids.map(k=>k.name)));
  ok(!!x.kidN&&await A.p.evaluate(n=>{const f=COOPW.friend();return !(f.kids||[]).some(k=>k.name===n)},x.kidN),'2 takeaway: not on her entry either (no copy)');CW_kid=x.kidN;await clear(B)}
 /* petsteal: her pet to the NPC */
 {await sleep(1200);const p0=await B.p.evaluate(()=>(S.pets||[]).length);const x=await npc('petsteal','pet');ok(x.ok,'2 NPC petsteal offered on her',x);
  ok(x.pets===1,'2 petsteal: the NPC has the pet (gain)',x);ok(x.pets===1&&await waitFr(B,n=>(S.pets||[]).length===n-1,p0),'2 petsteal: her pet is gone on HER side (loss)',await B.p.evaluate(()=>(S.pets||[]).map(P=>P.t)));await clear(B)}
 /* musk: she loses the pregnancy */
 {await sleep(1200);const x=await npc('musk');ok(x.ok,'2 NPC musk offered (open pregnancy)',x);ok(x.ok&&await waitFr(B,()=>!S.preg),'2 musk: she lost the pregnancy on HER side',await B.p.evaluate(()=>S.preg));await clear(B)}
 /* kpoison: her child ≥3 is harmed / dies on her side */
 {await sleep(1200);const k0=await B.p.evaluate(()=>{const k=tKid(S);return k&&{n:k.name,hp:k.hp,alive:k.alive!==false}});const x=await npc('kpoison');ok(x.ok,'2 NPC kpoison offered',x);
  ok(x.ok&&!!k0&&await waitFr(B,k=>{const c=(S.kids||[]).find(z=>z.name===k.n);return !c||c.alive===false||c.hp!==k.hp},k0),'2 kpoison: her child harmed on HER side',[k0,await B.p.evaluate(()=>(S.kids||[]).map(k=>k.name+':'+k.hp+':'+k.alive))]);await clear(B)}
 ok(await A.p.evaluate(()=>(COOPW.npcOn||[]).length>=4),'2 host relayed each NPC act (npcOn log)',await A.p.evaluate(()=>COOPW.npcOn));
 /* the guest never runs an NPC act on the host's entry */
 ok(await B.p.evaluate(()=>{const f=COOPW.friend();const v=liveRivals(true).find(r=>!r.coop&&r.alive);const n=(f.kids||[]).length;const r=runAct(v,f,'takeaway');return r===''&&(f.kids||[]).length===n}),'2 guest: an NPC act on the host\'s entry does nothing there');
 /* ================= (3) night: host-authoritative ================= */
 const night=o=>o.p.evaluate(()=>{const t=S.tonight;return t==='me'?(COOPW.seat==='a'?901:902):t&&t.id!=null?t.id:null});
 const claim=o=>o.p.evaluate(()=>{S.tonight='me';render();return true});
 {for(let i=0;i<3;i++){await clear(A);await clear(B)}await claim(B);await sleep(2500);const a=await night(A),b=await night(B);ok(a===902&&b===902,'3 guest claim alone: the host takes it, both say the guest',[a,b]);
  await Promise.all([claim(A),claim(B)]);await sleep(3000);for(let i=0;i<3;i++){await clear(A);await clear(B)}await sleep(800);const a2=await night(A),b2=await night(B);
  ok(a2===b2&&a2!=null,'3 crossing claims (both in the same buổi): ONE night on both screens',[a2,b2]);ok(a2===901,'3 crossing: the host\'s word stands',a2);
  ok(await A.p.evaluate(()=>S.tn&&S.tn.w===COOP.state.week&&S.tn.who===901),'3 host world key S.tn = the final night',await A.p.evaluate(()=>S.tn))}
 /* ================= (4) full seat: compensation, no waiting claim ================= */
 {for(let i=0;i<3;i++){await clear(A);await clear(B)}
  const x=await B.p.evaluate(()=>{const r=6,f=COOPW.friend();const was={rank:S.rank,ex:S.ex};COOPW.mine=COOPW.mine||{};const m0=COOPW.mine.rank;COOPW.mine.rank=r-1;S.rank=r;f.rank=r;
   const b0=S.bac,d0=S.danh,h0=S.hieu,g0=liveRivals(true).filter(v=>!v.coop).map(v=>v.ghen);Q.length=0;
   COOPW.seatWeek();const txt=Q.map(q=>q.t+' '+q.h).join(' ');const g1=liveRivals(true).filter(v=>!v.coop).map(v=>v.ghen);
   const out={rank:S.rank,bac:S.bac-b0,danh:S.danh-d0,hieu:S.hieu&&S.hieu!==h0?S.hieu:'',txt:txt.replace(/<[^>]+>/g,''),ghen:g1.filter((g,i)=>g>g0[i]).length,n:g1.length,
     exp:Math.round(BAL.psk.seat.bacM*BAL.pay[Math.min(7,r)]),B:BAL.psk.seat};COOPW.mine.rank=m0;return out});
  ok(x.rank===5,'4 seat full: she stays one rank lower',x.rank);ok(!/đợi khi có ghế/.test(x.txt),'4 no waiting claim on the seat (OD:L1228)',x.txt);
  ok(x.bac>=x.exp,'4 large silver = BAL.psk.seat.bacM × the seat rank\'s stipend',[x.bac,x.exp]);ok(x.danh>0,'4 Danh up',x.danh);
  ok(!!x.hieu||x.bac>=x.exp+x.B.hieuBac,'4 a phong hiệu (or its silver)',x.hieu);ok(/khảo hạch/.test(x.txt),'4 she must pass the normal exam later',x.txt);
  ok(x.ghen>0,'4 loss: the consorts\' jealousy',[x.ghen,x.n]);console.log('seat card:',x.txt.slice(0,400));
  /* look at the card on both priority sizes: the seat card alone (the rank-outfit / gift dialogs the forced rank brings are cleared first) */
  const seatH=await B.p.evaluate(()=>{const q=Q.find(q=>q.t==='Ghế đã có người');return q?q.h:''});ok(!!seatH,'4 the seat card is queued');
  for(let i=0;i<6;i++){await clear(B);await clear(A);await sleep(200)}await sleep(5000);for(const o of [A,B])await o.p.evaluate(()=>{document.querySelectorAll('.kmstage,[class*=km-edict]').forEach(e=>e.click())});await sleep(800);
  for(const [o,n] of [[B,'r2-seat-guest-1180x820'],[A,'r2-seat-host-755x1000']]){for(let i=0;i<12;i++){const c=await o.p.evaluate(()=>{const m=document.getElementById('modal');const b=[...document.querySelectorAll('button')].find(x=>x.offsetParent!==null&&!(m&&m.contains(x))&&/^Nhận$/.test(x.textContent.trim()));if(b){b.click();return true}return false});if(!c)break;await sleep(500)}
   await o.p.evaluate(h=>{pushModal({t:'Ghế đã có người',h});showModal()},seatH);await sleep(700);await shot(o,n)}
  for(let i=0;i<4;i++){await clear(B);await clear(A);await sleep(200)}}
 /* ================= merged week: no second copy anywhere ================= */
 {for(let i=0;i<3;i++){await clear(A);await clear(B)}const w0=await A.p.evaluate(()=>COOP.state.week);
  for(let g=0;g<8;g++){const a=await A.p.evaluate(()=>S.buoi||0),c=await B.p.evaluate(()=>S.buoi||0);await press(A);await press(B);
   const t0=Date.now();while(Date.now()-t0<30000){await clear(A);await clear(B);if(await A.p.evaluate(w=>COOP.state.week>w,w0)&&await B.p.evaluate(w=>COOP.state.week>w,w0))break;if(await A.p.evaluate(x=>(S.buoi||0)!==x,a)&&await B.p.evaluate(x=>(S.buoi||0)!==x,c))break;await sleep(400)}
   if(await A.p.evaluate(w=>COOP.state.week>w&&!COOPW.pend,w0)&&await B.p.evaluate(w=>COOP.state.week>w&&!COOPW.pend,w0))break}
  ok(await A.p.evaluate(w=>COOP.state.week===w+1,w0)&&await B.p.evaluate(w=>COOP.state.week===w+1,w0),'5 week merged');for(let i=0;i<3;i++){await clear(A);await clear(B);await sleep(300)}await sleep(2500);
  const fa=await fr(A),ob=await own(B);
  ok(JSON.stringify(fa&&fa.kids)===JSON.stringify(ob.kids),'5 A\'s entry children == B\'s own children',[fa&&fa.kids,ob.kids]);
  ok(fa&&fa.inv.length===ob.inv.length,'5 A\'s entry bag size == B\'s own',[fa&&fa.inv.length,ob.inv.length]);
  if(CW_kid){const ha=await A.p.evaluate(n=>rivals.filter(v=>(v.kids||[]).some(k=>k.name===n&&k.alive!==false)).length+((S.kids||[]).some(k=>k.name===n)?1:0),CW_kid);
   const hb=await B.p.evaluate(n=>rivals.filter(v=>!v.coop&&(v.kids||[]).some(k=>k.name===n&&k.alive!==false)).length+((S.kids||[]).some(k=>k.name===n)?1:0),CW_kid);
   ok(ha===1&&hb===1,'5 the taken child exists ONCE in the world (host and guest view)',[ha,hb])}
  const mx2=await B.p.evaluate(()=>Math.max(0,...window.__pos));ok(mx2<4000,'5 every pos of the run < 4000',mx2)}
 await A.p.screenshot({path:OUT+'/r2-host-755x1000.png'});await B.p.screenshot({path:OUT+'/r2-guest-1180x820.png'});
 for(const o of [A,B])ok(!o.errs.length,o.name+': no page errors',o.errs.slice(0,5));
 const bad=res.filter(r=>!r[0]);console.log(`\n${res.length-bad.length}/${res.length} passed`);fs.writeFileSync(OUT+'/result.txt',res.map(r=>(r[0]?'ok  ':'FAIL')+' '+r[1]).join('\n')+'\n');
 await b.close();process.exit(bad.length?1:0)})().catch(e=>{console.error(e);process.exit(2)});
