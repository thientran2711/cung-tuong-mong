/* Co-op B1–B5 PART 2 (review/coop-b1b5-p2) — 2 browsers, LIVE Worker (no Worker change: relays ride act/res).
   usage: python3 dev/build/assemble.py && node dev/test/coop-p2.js [outdir] [workerURL]
   A = host 755x1000@2, B = guest 1180x820@2.
   (1) B1 the guest serves as a cung nữ: Mua chuộc on her servant entry = HER card (Nhận / Bẩm chủ / Im lặng), gain + loss on both sides;
       an NPC's bribe reaches her as the j42 card; what she reports as my tai mắt becomes MY proof (relay ev).
   (2) B2 one heir: the host's heirMonth picks the GUEST's son → world key hr → both read the same Thái tử; her Danh gain on her side;
       the guest's heirMonth never runs; her heir dies on her side → hr cleared on both.
   (4) B4 the host's NPC turn takes her item (thất lạc case held by THAT NPC), harms / kills her child, gives her a thing; festival with
       her own registration (her art + teacher) → her score, Sức cost, registration closed, result card.
   (3) B3 the Emperor dies while the guest's son is heir: the guest gets the j99succ choice (Ba đường) on her own client, the host the
       base ending; the epilogue never moves the shared year; both reborn in the room. */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');
const {serve,BASE}=require('./coop-serve.js');
const OUT=path.resolve(process.argv[2]||path.join(__dirname,'../../.tmp/coop-p2'));fs.mkdirSync(OUT,{recursive:true});
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


const D=o=>o.p.evaluate(()=>({w:COOP.state.week,b:S.buoi||0,tn:S.tn||null,tonight:S.tonight==='me'?'me':S.tonight&&S.tonight.id!=null?S.tonight.id:null,dead:!!S.dead,emp:S.emp&&[S.emp.era,S.emp.age,!!S.emp.dead].join('/'),rank:S.rank,Q:Q.map(q=>q.t).slice(0,4)}));
async function week(A,B,tag){for(let i=0;i<3;i++){await clear(A);await clear(B)}const w0=await A.p.evaluate(()=>COOP.state.week);
 for(let g=0;g<10;g++){const a=await A.p.evaluate(()=>S.buoi||0),c=await B.p.evaluate(()=>S.buoi||0);await press(A);await press(B);
  const t0=Date.now();while(Date.now()-t0<30000){await clear(A);await clear(B);if(await A.p.evaluate(w=>COOP.state.week>w,w0)&&await B.p.evaluate(w=>COOP.state.week>w,w0))break;if(await A.p.evaluate(x=>(S.buoi||0)!==x,a)&&await B.p.evaluate(x=>(S.buoi||0)!==x,c))break;await sleep(400)}
  if(await A.p.evaluate(w=>COOP.state.week>w&&!COOPW.pend,w0)&&await B.p.evaluate(w=>COOP.state.week>w&&!COOPW.pend,w0))break}
 const okw=await A.p.evaluate(w=>COOP.state.week===w+1,w0)&&await B.p.evaluate(w=>COOP.state.week===w+1,w0);ok(okw,tag+': week merged once',[await D(A),await D(B)]);await sleep(1500);return okw}
/* the host's tablet forced to one card (pick(p) → true for the chosen one), dice inside flip set so the draw always happens and nobody steals */
const forceFlip=(o,who)=>o.p.evaluate(who=>{window.__fw=who;if(!window.__ff){window.__ff=1;const f=flip;flip=function(){const w=window.__fw;if(w==null)return f.apply(this,arguments);
  const r0=roll,n0=nightCh;roll=x=>x>=60;nightCh=p=>{const id=p===S?'me':p.coop?'f':'npc'+p.id;return (w==='npc'?(!p.coop&&p!==S&&p.id===window.__npc):id===w)?100:0};try{return f.apply(this,arguments)}finally{roll=r0;nightCh=n0}}}
  if(who==='npc')window.__npc=liveRivals(true).filter(v=>!v.coop&&v.alive&&!v.out)[0].id},who);
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
 for(const [o,rk] of [[A,3],[B,3]])await o.p.evaluate(rk=>{if(S.srv)S.srv.risen=1;if(S.kc)S.kc.inPal=1;S.rank=rk;S.sung=Math.max(S.sung||0,40);render()},rk);
 if(!(await until(A,()=>!!COOPW.friend(),null,20000)&&await until(B,()=>!!COOPW.friend(),null,20000)))await week(A,B,'setup');/* a life on the tiểu thư road at home: her palace entry comes with the merged week */
 ok(await until(A,()=>!!COOPW.friend(),null,30000)&&await until(B,()=>!!COOPW.friend(),null,30000),'each has the other as a consort entry');
 for(let i=0;i<4;i++){await clear(A);await clear(B);await sleep(400)}/* review/coop-b1b5-fix: the setup week (tiểu thư road) leaves 'Tuần mới' / reward dialogs queued in front of the B1 card */
 for(const o of [A,B])await o.p.evaluate(()=>{window.__dil=[];const d=pushDil;pushDil=function(x,t){window.__dil.push(t||'');return d.apply(this,arguments)}});
 const MT=o=>o.p.evaluate(()=>{const M=document.getElementById('modal');return M&&!M.hidden?M.textContent.replace(/\s+/g,' ').slice(0,400):''});
 const tapM=async(o,re,ms=15000)=>{const t0=Date.now();while(Date.now()-t0<ms){const r=await o.p.evaluate(src=>{const M=document.getElementById('modal');if(!M||M.hidden)return false;const R=new RegExp(src);
   const b=[...M.querySelectorAll('button')].find(x=>x.offsetParent!==null&&!x.disabled&&R.test(x.textContent.trim()));if(!b)return false;b.click();return true},re.source);if(r)return true;await sleep(300)}return false};
 /* ================= (1) B1 servant ================= */
 {const mid=await B.p.evaluate(()=>{const m=liveRivals(true).find(v=>!v.coop&&v.alive&&!v.out&&v.rank>=1)||liveRivals(true).find(v=>!v.coop);S.srv={mid:m.id,rk:1,mp:0,lau:0,rk0:1,lw:0,af:{},know:{},met:[],sec:0,msch:0,intel:[],spyFor:null,betray:null,sent:null,err:null,once:{},mama:0,risen:0};
    deedAdd(m,"sbribe",null,3);return m.id});
  /* her servant entry in that NPC's staff on the host (as placeFriend builds it from her blob) */
  const se=await A.p.evaluate(mid=>{const m=RV(mid);deedAdd(m,"sbribe",null,3);m.staff=m.staff||[];const s={sid:902,coop:true,name:'Hảo hữu',role:'maid',fc:'',fk:'',face:0,hue:0,age:18,tr:'trung',loyal:60,spyFor:null,lover:null,af:{},kn:1,imp:'',org:''};m.staff.push(s);S.bac=Math.max(S.bac||0,60);return {bac:S.bac,own:ownerOf(s)===m}},mid);
  ok(se.own,'B1 host: the guest is a servant entry in an NPC house',se);
  const b0=await B.p.evaluate(()=>({bac:S.bac,tin:S.tin}));
  const r1=await A.p.evaluate(()=>{const s=allServ().find(x=>x.coop);return String(bribeServ(S,s))});ok(/đợi nàng trả lời/.test(r1),'B1 host: Mua chuộc on her = an offer, no dice on my screen',r1);
  ok(await until(B,()=>{const M=document.getElementById('modal');return M&&!M.hidden&&/Bạc lạ/.test(M.textContent)},null,15000),'B1 guest: the Bạc lạ card from the player',await MT(B));
  await B.p.screenshot({path:OUT+'/b1-guest-bribe-1180x820.png'});
  ok(await tapM(B,/^Nhận bạc/),'B1 guest: Nhận bạc, làm tai mắt');
  ok(await until(A,()=>{const s=allServ().find(x=>x.coop);return s&&s.spyFor==='me'},null,15000),'B1 host: she is now my tai mắt');
  const PAY=await A.p.evaluate(()=>BAL.coopBribe.pay);const a1=await A.p.evaluate(()=>S.bac),c1=await B.p.evaluate(()=>({bac:S.bac,spy:S.srv.spyFor}));
  ok(a1===se.bac-PAY,'B1 host: my loss Bạc −pay',[se.bac,a1]);ok(c1.bac===b0.bac+PAY&&c1.spy===901,'B1 guest: her gain Bạc +pay, spy for the host (901)',[b0,c1]);
  await A.p.screenshot({path:OUT+'/b1-host-bribe-755x1000.png'});await clear(A);await clear(B);
  /* she reports (j42 Lén báo tin: evA with my entry as holder) → MY proof against her mistress */
  const ev0=await A.p.evaluate(mid=>RV(mid).ev||0,mid);
  await B.p.evaluate(mid=>evA(COOPW.friend(),RV(mid),1),mid);
  ok(await until(A,([mid,e])=>(RV(mid).ev||0)>e,[mid,ev0],15000),'B1 host: her spy report = my proof +1 on her mistress',[ev0,await A.p.evaluate(mid=>RV(mid).ev,mid)]);
  /* second offer: she refuses and tells her mistress → the mistress holds proof against ME; her Chủ tin +tin */
  await A.p.evaluate(()=>{const s=allServ().find(x=>x.coop);s.spyFor=null});const t0=await B.p.evaluate(()=>S.tin||0);const em0=await A.p.evaluate(mid=>(RV(mid).evm||{}).me||0,mid);
  await A.p.evaluate(()=>bribeServ(S,allServ().find(x=>x.coop)));ok(await tapM(B,/^Từ chối, bẩm chủ/),'B1 guest: Từ chối, bẩm chủ');
  ok(await until(A,([mid,e])=>((RV(mid).evm||{}).me||0)>e,[mid,em0],15000),'B1 host: her mistress holds proof of my bribe (my loss)');
  ok(await B.p.evaluate(t=>(S.tin||0)>t,t0),'B1 guest: Chủ tin up (her gain)');await clear(A);await clear(B);
  /* an NPC's bribe aimed at her (host world) → her j42 card */
  await A.p.evaluate(mid=>{const v=liveRivals(true).find(x=>!x.coop&&x.id!==mid&&x.alive);v.bac=Math.max(v.bac||0,80);bribeServ(v,allServ().find(x=>x.coop))},mid);
  ok(await until(B,()=>window.__dil.includes('Bạc lạ'),null,15000),'B1 guest: an NPC bribe reaches her as the j42 card',await B.p.evaluate(()=>window.__dil));
  await clear(B);await A.p.evaluate(mid=>{const m=RV(mid);m.staff=m.staff.filter(s=>!s.coop)},mid);await B.p.evaluate(()=>{S.srv.risen=1;render()});for(let i=0;i<3;i++){await clear(A);await clear(B)}}
 /* ================= (2) B2 heir ================= */
 const kn=await B.p.evaluate(()=>{const k=mkKid('m',8);k.tal=90;k.fond=90;S.kids=S.kids||[];S.kids.push(k);render();return k.name});
 ok(await until(A,n=>{const f=COOPW.friend();return f&&(f.kids||[]).some(k=>k.name===n)},kn,15000),'B2 host: her son is on her entry (live)');
 ok(await B.p.evaluate(()=>{const h=S.heir,hr=S.hr,r0=roll;roll=()=>true;try{heirMonth()}finally{roll=r0}return S.heir===h&&S.hr===hr}),'B2 guest: her own heirMonth never runs (no heir drawn even with the dice forced)');
 const hp=await A.p.evaluate(n=>{const keep=[];for(const [k,v] of allKids())if(!(v&&v.coop&&k.name===n)&&k.age>=6){keep.push([k,k.age]);k.age=0}S.heir=null;for(const [k] of allKids())k.heir=false;
   const r0=roll,m0=Math.random;roll=()=>true;try{const L=COOPW.pulled;heirMonth()}finally{roll=r0;for(const [k,a] of keep)k.age=a}
   return {hr:S.hr,v:S.heir&&S.heir.v&&S.heir.v.coop,k:S.heir&&S.heir.k.name}},kn);
 ok(hp.v&&hp.k===kn&&/^p902\|/.test(hp.hr||''),'B2 host: the host\'s heirMonth names HER son (world key hr)',hp);
 const d0=await B.p.evaluate(()=>S.danh);ok(await week(A,B,'B2'),'B2 week');
 {const a=await A.p.evaluate(()=>({hr:S.hr,k:S.heir&&S.heir.k.name,v:!!(S.heir&&S.heir.v&&S.heir.v.coop)})),c=await B.p.evaluate(()=>({hr:S.hr,k:S.heir&&S.heir.k.name,mine:!!(S.heir&&!S.heir.v),heir:(S.kids||[]).filter(k=>k.heir).map(k=>k.name),danh:S.danh}));
  ok(a.hr===c.hr&&a.k===kn&&c.k===kn&&a.v&&c.mine&&c.heir[0]===kn,'B2 both: the same Thái tử (her son), hers on her side',[a,c]);
  ok(c.danh>d0||await B.p.evaluate(()=>window.__dil.length>=0&&Q.some(q=>q.t==='Lập Thái tử'))||c.danh>=100,'B2 guest: her Danh gain + card',[d0,c.danh]);
  await B.p.screenshot({path:OUT+'/b2-guest-heir-1180x820.png'})}
 for(let i=0;i<3;i++){await clear(A);await clear(B)}
 /* ================= (4) B4 NPC acts on her items / children + festival ================= */
 {const it=await B.p.evaluate(()=>{const k=Object.keys(IT).find(k=>loOk({k}));S.inv=S.inv||[];S.inv.push({k});const g=mkKid('f',5);S.kids.push(g);render();return {k,g:g.name}});
  ok(await until(A,x=>{const f=COOPW.friend();return f&&(f.inv||[]).some(e=>e.k===x.k)&&(f.kids||[]).some(k=>k.name===x.g)},it,15000),'B4 host: her item + daughter on her entry');
  const n0=await B.p.evaluate(k=>(S.inv||[]).filter(e=>e.k===k).length,it.k);
  const th=await A.p.evaluate(x=>{let id=null;COOPW.b4Run(()=>{const f=COOPW.friend();const i=f.inv.findIndex(e=>e.k===x.k);const e=f.inv.splice(i,1)[0];const v=liveRivals(true).find(r=>!r.coop&&r.alive);(v.inv=v.inv||[]).push(e);id=v.id;
    const g=f.kids.find(k=>k.name===x.g);g.alive=false;const pr=Object.keys(IT).find(k=>k!==x.k&&loOk({k}));f.inv.push({k:pr})});return id},it);
  ok(await until(B,([k,n,id])=>(S.inv||[]).filter(e=>e.k===k).length<n&&(S.lost||[]).some(c=>c.k===k&&c.st!=='done'),[it.k,n0,th],15000),'B4 guest: the NPC theft = her thất lạc case',await B.p.evaluate(()=>(S.lost||[]).slice(-1)));
  ok(await until(B,g=>(S.kids||[]).some(k=>k.name===g&&k.alive===false),it.g,15000),'B4 guest: her daughter died on HER side (NPC harm)');
  ok(await B.p.evaluate(()=>/Được ban/.test(JSON.stringify(Q.map(q=>q.h))+(document.getElementById('modal')||{}).textContent)),'B4 guest: a thing given to her lands in her chest, told');
  await B.p.screenshot({path:OUT+'/b4-guest-npc-1180x820.png'});for(let i=0;i<3;i++){await clear(B)}
  /* festival with her own registration */
  const fk=await B.p.evaluate(()=>{const kk=Object.keys(FX7)[0],F=FX7[kk];const j=j7s();j.fx=j.fx||{};const a=F.arts[F.arts.length-1];j.fx[F.f]={y:S.year,a,pr:1};S.suc=Math.max(S.suc,60);render();return {kk,f:F.f,a,suc:S.suc}});
  ok(await until(A,f=>{const e=COOPW.friend();return e&&e.fx7&&e.fx7[f.f]&&e.fx7[f.f].a===f.a},fk,15000),'B4 host: her festival entry reached her entry (live)');
  const fl=await A.p.evaluate(f=>{COOPW.b4Fest('Hội thi thử',f.kk);return COOPW.f7last||null},fk);
  ok(fl&&fl.reg&&fl.kind===fk.a,'B4 host: her score used HER chosen art + registration',[fl,fk.a]);
  ok(await until(B,f=>S.j71.fx[f.f].done===1,fk,15000),'B4 guest: her registration closed');
  ok(await B.p.evaluate(f=>S.suc===f.suc-J71.cost,fk),'B4 guest: she pays the same Sức as playing it herself',[fk.suc,await B.p.evaluate(()=>S.suc)]);
  ok(/Hội thi thử/.test(await MT(B)+await B.p.evaluate(()=>JSON.stringify(Q.map(q=>q.t)))),'B4 guest: her result card',await MT(B));
  await B.p.screenshot({path:OUT+'/b4-guest-fest-1180x820.png'});for(let i=0;i<3;i++){await clear(A);await clear(B)}}
 /* ================= (3) B3 j99succ in co-op: her son is the heir when the Emperor dies ================= */
 {const y0=await A.p.evaluate(()=>S.year);await A.p.evaluate(()=>{COOPW.inTurn=true;try{emperorDies('')}finally{COOPW.inTurn=false}});
  const w0=await A.p.evaluate(()=>COOP.state.week);const EL=o=>o.p.evaluate(()=>COOPW.empLog||[]);
  for(let g=0;g<12;g++){if((await EL(A)).length&&(await EL(B)).length)break;if(!(await EL(A)).length)await press(A);if(!(await EL(B)).length){if(!await press1(B))await clear(B,3)}const t0=Date.now();while(Date.now()-t0<15000){if((await EL(A)).length&&(await EL(B)).length)break;await sleep(400)}
   if(!(await EL(A)).length)await clear(A)}
  const la=await EL(A),lb=await EL(B);ok(la.length===1&&lb.length===1&&la[0].w===w0+1&&lb[0].w===w0+1,'B3 the reign ends on both in the same merged week',[la,lb]);
  const c=await B.p.evaluate(()=>({succ:!!(S.succ&&S.succ.on),q:Q[0]&&Q[0].t,year:S.year}));ok(c.succ&&c.q==='Tiên đế băng hà','B3 guest (the mother): the j99succ choice card',c);
  ok(la[0]&&la[0].dead,'B3 host: the base reign ending (no NPC claim on a player\'s son)',la);
  await B.p.screenshot({path:OUT+'/b3-guest-succ-1180x820.png'});
  const ch=[];for(let i=0;i<12;i++){const st=await B.p.evaluate(()=>({end:S.succ&&S.succ.end||'',t:Q[0]&&Q[0].t||''}));if(st.end)break;if(st.t)ch.push(st.t);if(!await tapM(B,/./,4000))await clear(B,2);await sleep(400)}
  const se=await B.p.evaluate(()=>({end:S.succ&&S.succ.end||'',on:!!(S.succ&&S.succ.on)}));ok(se.end&&!se.on&&ch.some(t=>/Chương/.test(t)),'B3 guest: the 3-chapter epilogue plays as kit cards and ends her life (personal ending)',[se,ch]);
  ok(await B.p.evaluate(y=>!COOPW.dying||!COOPW.dying.W||COOPW.dying.W.S.year===y,y0),'B3 guest: the epilogue never moved the shared year',await B.p.evaluate(()=>COOPW.dying&&COOPW.dying.W&&COOPW.dying.W.S.year));
  {const alive=o=>o.p.evaluate(()=>!!(COOPW.on&&S&&!S.dead&&!COOPW.inLife&&document.getElementById('next').offsetParent)).catch(()=>false);
   const t0=Date.now();while(Date.now()-t0<180000){await clear(A);await clear(B);if(await alive(A)&&await alive(B))break;await sleep(700)}ok(await alive(A)&&await alive(B),'B3 both reborn in the room')}
  ok(await week(A,B,'B3 next'),'B3 a week after the rebirth');ok(await A.p.evaluate(()=>S.year)===await B.p.evaluate(()=>S.year),'B3 same year on both')}
 for(const o of [A,B])ok(!o.errs.length,o.name+': no page errors',o.errs.slice(0,5));
 const bad=res.filter(r=>!r[0]);console.log(`\n${res.length-bad.length}/${res.length} passed`);fs.writeFileSync(OUT+'/result.txt',res.map(r=>(r[0]?'ok  ':'FAIL')+' '+r[1]).join('\n')+'\n');
 await b.close();process.exit(bad.length?1:0)})().catch(e=>{console.error(e);process.exit(2)});
