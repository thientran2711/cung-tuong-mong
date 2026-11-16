/* review/title-sys (owner 16/11 13:00Z–13:30Z): DANH HIỆU game logic (jdh.js) over KIT §82. usage: node dev/test/title-sys.js <page URL> <outdir> [WxH@dpr]
   Checks: catalogue (own names, max 4 words, unique, every title has its BAL row = one core); steps 1/5/10 → same name, higher tier; her new title → kit
   reward panel; wear / take off: Sắc via wearBonus, Danh/Sủng/Đức given back exactly; NPC wears its best; kit ids resolve ("dh-key@pid");
   the contest hook (cFin7) counts podium + win for her and NPCs; an old save (no dh, honors only) loads and is seeded; save JSON round-trip;
   NHIỆM VỤ (rail goal icon) shows the tab row, the Danh hiệu tab lists + wears; her worn title on the stage tag (3 lines) and an NPC's in the
   pop-up left figure; no horizontal overflow in the panel; 0 page errors. Shots in <outdir>. */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,OUT,SZ]=process.argv;fs.mkdirSync(OUT,{recursive:true});const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const PX=process.env.HTTPS_PROXY;const b=await chromium.launch(PX?{proxy:{server:PX,bypass:'127.0.0.1,localhost'}}:{});const R={errs:[],fail:[]};
 const [wh,d]=(SZ||'755x1000@2').split('@');const [W,H]=wh.split('x').map(Number);
 const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+d,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce',ignoreHTTPSErrors:!!PX});
 const p=await ctx.newPage();p.setDefaultTimeout(240000);p.on('pageerror',e=>R.errs.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:240000});await p.waitForFunction(()=>typeof start==='function'&&typeof render==='function'&&typeof dhSync==='function');await sleep(2500);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove()});await p.addStyleTag({content:'img.figimg,#mefig,#tokens .tok{animation:none!important}#kroul{display:none!important}'});
 const fresh=()=>p.evaluate(()=>{window.__forceOrigin='thd';SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;quiet=false;Q.length=0;deal();render()});
 await fresh();await sleep(800);
 const clean=()=>p.evaluate(()=>{try{kmReset()}catch(e){}document.querySelectorAll('.kmov').forEach(e=>e.remove());Q.length=0;for(const id of['modal','dawn']){const e=document.getElementById(id);if(e){e.hidden=true;if(id==='dawn')e.innerHTML=''}}});
 await clean();
 /* 3. pop-up left figure: the worn title is line 1 above the head. Own page at @1: in this container at @2 the queued test pop-up is often dropped right after a new life (Q emptied by the start flow; the kit's own title-tag.js flakes the same way). */
 {const c1=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce',ignoreHTTPSErrors:!!PX});const q=await c1.newPage();q.on('pageerror',e=>R.errs.push(e.message.slice(0,200)));await q.goto(URL,{waitUntil:'domcontentloaded',timeout:240000});await q.waitForFunction(()=>typeof start==='function'&&typeof dhSync==='function');await sleep(2500);
  await q.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();window.__forceOrigin='thd';SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;quiet=false;Q.length=0;deal();render()});await sleep(3000);
  for(let t=0;t<3&&!R.dp;t++){await q.evaluate(()=>{try{kmReset()}catch(e){}Q.length=0;document.getElementById('modal').hidden=true;
    const v=liveRivals(true).filter(x=>!x.queen)[1];v.nights=12;dhSync(v);S.dh={w_kim:{n:1}};dhSync(S,true);dhWear(S,'w_kim');S.met=S.met||{};S.met[v.id]=1;
    Q.unshift({t:"Có người đến",who:pv(v),stage:[v],headArt:{src:"img/ev-khach-den.webp"},h:`<p>${v.name} đến thăm.</p>`,opts:[{n:"Nhịn",fx:{duc:2},x:"giữ lễ",go:()=>{}}]});showModal()});
   await q.waitForFunction(()=>{const c=[...document.querySelectorAll('.kdpcap, .kesf>.kpsn')].find(e=>e.getClientRects().length);return c&&c.innerText.trim().length>0},null,{timeout:40000}).catch(()=>{});
   await sleep(1500);R.dp=await q.evaluate(()=>{const c=[...document.querySelectorAll('.kdpcap, .kesf>.kpsn')].find(e=>e.getClientRects().length);return c?c.innerText.replace(/\n/g,' / '):null})}
  if(!R.dp)R.fail.push('no dialog');else if(!/^(Trăng soi rèm ngọc|Chức Nữ)/.test(R.dp))R.fail.push('worn title not in pop-up figure: '+R.dp);/* the kit shows the visitor (desktop) or her (touch) on the left: either way the worn title must be line 1 */
  await q.screenshot({path:`${OUT}/dh-popup-${wh}.jpg`,type:'jpeg',quality:75});await c1.close()}
 await fresh();await sleep(800);await clean();
 /* 1. logic */
 R.logic=await p.evaluate(()=>{const F=[],o={};const C=DH_CAT,K=Object.keys(C),T=BAL.dh.T;
  const names=K.map(k=>C[k].n);o.n=K.length;
  names.forEach(n=>{const w=n.trim().split(/\s+/).length;if(w>4)F.push('name > 4 words: '+n)});if(new Set(names).size!==names.length)F.push('duplicate names');
  o.lens=[...new Set(names.map(n=>n.split(/\s+/).length))].sort();if(o.lens.length<3)F.push('name lengths do not vary '+o.lens);
  K.forEach(k=>{if(!T[k])F.push('no BAL.dh.T row: '+k)});Object.keys(T).forEach(k=>{if(!C[k])F.push('BAL row without title: '+k)});
  if(names.some(n=>/·|Tết|Hội /.test(n)))F.push('place/festival style name');
  /* steps: 1 / 5 / 10 = same name, higher tier */
  S.dh={};const t=[];for(const n of [1,4,5,9,10]){S.dh.w_dan={n};dhSync(S,true);const x=dhObj(S,'w_dan');t.push(x&&x.tier)}o.steps=t;
  if(!(t[0]&&t[1]===t[0]&&t[2]>t[1]&&t[3]===t[2]&&t[4]>t[3]))F.push('steps '+t);if(dhObj(S,'w_dan').name!=='Tiếng tơ đồng')F.push('name changed by step');
  /* her new title → reward panel */
  Q.length=0;dhInc(S,'a_doc',BAL.dh.T.a_doc.n[0]);o.notice=Q.map(m=>m.t);if(!Q.some(m=>m.kit&&m.kit.kind==='reward'&&/Danh hiệu mới/.test(m.t)))F.push('no reward notice');Q.length=0;
  /* wear / take off */
  S.dh.w_kim={n:1};dhSync(S,true);const s0=effSac(S);dhWear(S,'w_kim');const s1=effSac(S);if(s1<=s0&&s0<100)F.push('Sắc not added while worn '+s0+'>'+s1);
  dhWear(S,null);if(effSac(S)!==s0)F.push('Sắc not removed');
  S.nights=30;dhSync(S,true);const g0=S.sung;dhWear(S,'nights');const g1=S.sung;dhWear(S,'kids');dhWear(S,null);o.sung=[g0,g1,S.sung];if(g1<=g0&&g0<100)F.push('Sủng not added');if(S.sung!==g0)F.push('Sủng not given back '+o.sung);if(S.dhOn)F.push('dhOn left');
  dhWear(S,'w_kim');if(!kitTitleWorn(S)||kitTitleWorn(S).name!=='Chức Nữ')F.push('kitTitleWorn(S)');
  if(!kitTitleDef('dh-w_kim@me')||kitTitleDef('dh-w_kim@me').name!=='Chức Nữ')F.push('kitTitleDef id');
  /* NPC by the same rules + contest hook */
  const L=liveRivals(true).filter(v=>!v.queen),v=L[0],w=L[1];v.dh=undefined;v.nights=10;dhSync(v);o.npc=v.titleWorn;if(!/^dh-/.test(v.titleWorn||''))F.push('NPC does not wear');
  if(!kitTitleWorn(v)||kitTitleWorn(v).id!==`dh-nights@${v.id}`)F.push('NPC kit id');
  const before=(S.dh.podium||{}).n||0,wb=((w.dh||{}).w_tho||{}).n||0;const e=(q,s)=>({p:q,kind:'tho',t:s,pr:0,lk:0,s});cFin7('trungthu','tho',[e(w,90),e(S,80),e(v,70),e(L[2],10)]);
  if(((S.dh.podium||{}).n||0)!==before+1)F.push('podium not counted');if((((w.dh||{}).w_tho||{}).n||0)!==wb+1)F.push('NPC win not counted');if(!w.titleWorn)F.push('NPC winner not wearing');
  /* old save: no dh, honors only */
  const H=[{d:'T7/1',t:CU_KHOI.kim+' · Hội thi',p:1},{d:'T8/1',t:'Á quân · Hội thi',p:2}];const old=JSON.parse(JSON.stringify(S));delete old.dh;delete old.titleWorn;delete old.dhOn;old.honors=H;
  Object.keys(S).forEach(k=>delete S[k]);Object.assign(S,old);Q.length=0;dhSync(S);o.old=JSON.stringify(S.dh.w_kim)+' '+JSON.stringify(S.dh.podium);
  if(!S.dh.w_kim||S.dh.w_kim.i!==0)F.push('old save win not seeded');if(Q.length)F.push('old save popped notices');
  /* JSON round trip */
  dhWear(S,'w_kim');const J=JSON.parse(JSON.stringify(S));if(J.titleWorn!=='dh-w_kim'||!J.dh.w_kim)F.push('save round trip');
  /* BONUSES (owner 13:55Z/14:10Z s17): each type on/off at its ONE hook; ONE title worn, ONE bonus picked */
  const W=(key,n,pick)=>{S.dh[key]={n,pick};S.dh[key].i=undefined;dhSync(S,true);S.dh[key].pick=pick;dhWear(S,key,true)};const off=()=>dhWear(S,null,true);
  const B={};const two=(key,n,pick,f)=>{off();const a=f();W(key,n,pick);const c=f();off();B[pick]=[a,c];return [a,c]};
  const R0=Math.random;Math.random=()=>0.5;
  try{
  S.dead=false;
  two('nights',30,'gSung',()=>{S.sung=0;apply({sung:Math.round(70/sg(1))});return S.sung});
  {dhWear(S,'nights',true);S.dh.nights.pick='gSung';dhWear(S,'nights',true);const sh=new Set();for(let i=0;i<30;i++)sh.add(fmt({sung:5}));if(sh.size!==1)F.push('gSung: preview text rolls');dhWear(S,null,true)}if(!(B.gSung[1]>B.gSung[0]))F.push('gSung');
  two('meta',10,'gDanh',()=>{S.danh=0;apply({danh:60});return S.danh});if(!(B.gDanh[1]>B.gDanh[0]))F.push('gDanh');
  two('w_theu',1,'gBac',()=>{S.bac=0;apply({bac:120});return S.bac});if(B.gBac[1]-B.gBac[0]!==10)F.push('gBac');
  two('w_hat',1,'gTren',()=>{S.th=0;apply({th:48});return S.th});if(!(B.gTren[1]>B.gTren[0]))F.push('gTren');
  const v0=liveRivals(true).filter(v=>!v.queen)[0];two('w_hoa',1,'gHau',()=>{v0.rel=0;affAdd(v0,S,48);return v0.rel});if(!(B.gHau[1]>B.gHau[0]))F.push('gHau');
  two('m_mon',1,'gTrung',()=>{S.maid.loyal=0;apply({maid:40});return S.maid.loyal});if(!(B.gTrung[1]>B.gTrung[0]))F.push('gTrung');
  two('w_kim',1,'phuc',()=>lotB(S,'Thi'));if(B.phuc[1]-B.phuc[0]!==BAL.dh.B.phuc.v[0])F.push('phuc');
  two('w_kim',1,'phuc',()=>lotB(S,'Con cái'));if(B.phuc[1]!==B.phuc[0])F.push('luck touched conception');
  S.preg=null;S.lastBirth=null;two('kids',3,'thai',()=>conceiveCh(S));if(B.thai[0]>0&&B.thai[1]-B.thai[0]!==BAL.dh.B.thai.v[1])F.push('thai '+B.thai);
  if(dhObj(S,'kids')&&(BAL.dh.T.kids.ch||[]).includes('thai')&&dhB(S,'thai'))F.push('thai at step 1');
  two('a_doc',50,'nghe',()=>{const k='thi';S.arts[k]=1;S.artp[k]=0;const tot=()=>S.arts[k]*1000+S.artp[k];const a=tot();Math.random=()=>0;try{addArt(k,1)}finally{Math.random=()=>0.5}return tot()-a});if(!(B.nghe[1]>B.nghe[0]))F.push('nghe');
  two('w_tho',1,'thi',()=>SC7.tho.f(S));if(B.thi[1]-B.thi[0]!==BAL.dh.B.thi.v[0])F.push('thi');
  two('a_nhan',5,'suc',()=>j76sleep(S));if(B.suc[1]-B.suc[0]!==BAL.dh.B.suc.v[0])F.push('suc');
  {const r0=window.roll;const rec=[];window.roll=o=>{rec.push(o);return false};try{two('m_kinh',1,'don',()=>{rec.length=0;try{ACT.rumor.f(v0,S)}catch(e){}return rec.join(',')})}finally{window.roll=r0}
   if(B.don[0]===B.don[1])F.push('don '+B.don)}
  two('w_tho',1,'tai',()=>S.tai);const t0=S.tai;if(B.tai[1]-B.tai[0]!==1&&B.tai[0]<100)F.push('flat tai');if(S.tai!==B.tai[0])F.push('tai not given back');
  /* NPC by the same rules */
  {const v=v0;v.dh={nights:{n:30,i:undefined}};dhSync(v);v.dh.nights.pick='gSung';const a=()=>{v.sung=0;ap(v,{sung:60});return v.sung};const w0=v.titleWorn;v.titleWorn=null;const x=a();v.titleWorn='dh-nights';const y=a();B.npc=[x,y];if(!(y>x))F.push('NPC gSung')}
  /* the picker */
  Q.length=0;S.dh.w_kim={n:1};dhSync(S,true);dhPick('w_kim');B.pick=(Q[0]&&Q[0].opts||[]).map(o=>o.n);if(B.pick.length!==4)F.push('picker '+B.pick);Q[0].opts[1].go();if(dhB(S,'phuc')!==BAL.dh.B.phuc.v[0])F.push('pick phuc not worn');Q.length=0;
  /* one bonus only: wearing another title drops the first */
  dhWear(S,'w_tho',true);if(dhB(S,'phuc'))F.push('two bonuses');off();
  }finally{Math.random=R0}
  o.B=B;
  o.F=F;return o});
 R.fail.push(...R.logic.F);delete R.logic.F;
 /* 2. stage: her worn title in the 3-line tag */
 await fresh();await clean();await p.evaluate(()=>{S.rank=Math.max(S.rank,3);S.dh={w_kim:{n:1}};dhSync(S,true);dhWear(S,'w_kim');S.dead=false;S.confined=0;S.buoi=0;const k='vuon';S.where=S.where||{};const Wh=S.where;for(const v of rivals)if(Wh[v.id]===k)Wh[v.id]="r"+v.id;Wh.emp="tn";S.menW={};S.minW={};
  const L=liveRivals(true).filter(v=>!v.queen);L.slice(0,2).forEach(v=>{Wh[v.id]=k;S.met=S.met||{};S.met[v.id]=1;try{S.known[kOf61(v)]=3}catch(e){}});
  S.place="home";used=0;tab="act";goTo(k);Q.length=0});await sleep(3000);await clean();
 await p.evaluate(()=>Promise.all([...document.querySelectorAll('#stage img')].map(i=>i.complete?0:new Promise(r=>{i.onload=i.onerror=r;setTimeout(r,20000)}))));await sleep(1200);
 R.stage=await p.evaluate(()=>[...document.querySelectorAll('#tokens .tok .tag, #j59metag .tag')].filter(e=>e.offsetParent).map(g=>g.innerText.replace(/\n/g,' / ')));
 if(!R.stage.some(s=>/Chức Nữ/.test(s)))R.fail.push('her title not on the stage');
 await p.screenshot({path:`${OUT}/dh-stage-${wh}.jpg`,type:'jpeg',quality:75});
 /* 4. NHIỆM VỤ: rail goal icon → tab row → Danh hiệu tab → wear */
 await clean();await p.evaluate(()=>{S.dh=S.dh||{};S.dh.w_kim={n:1};S.nights=12;dhSync(S,true);dhWear(S,'w_kim');Q.length=0;tab='act';render()});await sleep(800);
 const rail=await p.$('#krail [data-rail="goal"]');if(rail){await rail.click()}else{R.fail.push('no goal rail icon');await p.evaluate(()=>window.kitGoalDetail())}await sleep(1500);
 R.goalTabs=await p.evaluate(()=>[...document.querySelectorAll('#modal [data-kdhtab]')].map(b=>b.innerText));if(R.goalTabs.length<2)R.fail.push('no tab row on the goal panel');
 await p.evaluate(()=>{const b=document.querySelector('#modal [data-kdhtab="dh"]');b&&b.click()});await sleep(1500);
 R.panel=await p.evaluate(()=>{const m=document.querySelector('#modal .dlg');if(!m)return null;return{title:(m.querySelector('.kptitle')||{}).innerText,plates:m.querySelectorAll('.kdh').length,opts:[...m.querySelectorAll('.opt')].map(b=>b.innerText.split('\n')[0]).slice(0,6),over:[...m.querySelectorAll('*')].some(e=>e.scrollWidth>e.clientWidth+2&&getComputedStyle(e).overflowX==='hidden'&&e.closest('.kpb')&&!e.closest('.kdh'))||m.scrollWidth>m.clientWidth+2}});
 if(!R.panel||R.panel.title!=='Danh hiệu')R.fail.push('Danh hiệu tab did not open');else if(R.panel.over)R.fail.push('panel overflow');
 await p.screenshot({path:`${OUT}/dh-panel-${wh}.jpg`,type:'jpeg',quality:75});
 await p.evaluate(()=>{const b=[...document.querySelectorAll('#modal .opt')].find(x=>/^Đeo/.test(x.innerText));b&&b.click()});await sleep(1500);
 R.picker=await p.evaluate(()=>({title:(document.querySelector('#modal .kptitle')||{}).innerText,opts:[...document.querySelectorAll('#modal .opt')].map(b=>b.innerText.replace(/\n/g,' / '))}));if(!/^Đeo «/.test(R.picker.title||''))R.fail.push('no picker '+JSON.stringify(R.picker));
 await p.screenshot({path:`${OUT}/dh-pick-${wh}.jpg`,type:'jpeg',quality:75});
 await p.evaluate(()=>{const b=document.querySelector('#modal .opt');b&&b.click()});await sleep(1500);
 R.afterWear=await p.evaluate(()=>({worn:S.titleWorn,title:(document.querySelector('#modal .kptitle')||{}).innerText}));if(R.afterWear.worn==='dh-w_kim'||R.afterWear.title!=='Danh hiệu')R.fail.push('wear option '+JSON.stringify(R.afterWear));
 await p.evaluate(()=>{const x=document.querySelector('#modal .kpb .kdh[data-kdh]');x&&x.click()});await sleep(1200);R.card=await p.evaluate(()=>{const m=document.getElementById('modal');return m&&!m.hidden?m.innerText.slice(0,220).replace(/\n/g,' | '):'no card'});
 if(!/Đạt được/.test(R.card))R.fail.push('info card');await p.screenshot({path:`${OUT}/dh-card-${wh}.jpg`,type:'jpeg',quality:75});
 console.log(JSON.stringify(R,null,1));await b.close();process.exit(R.errs.length||R.fail.length?1:0)})();
