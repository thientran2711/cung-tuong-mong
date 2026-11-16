/* KIT 33.12 FIXED SLOT TABLE test (review/stage-pets-r7; owner 16/11 19:54Z + ~20:04Z: Fold = 2 people per view at FIXED slots, puzzle pieces, pets at a fixed spot of the owner's slot).
   usage: node dev/test/stage-slots-fixed.js <page URL> <WxH@dpr> <outdir> [tag]   env SHOTS=0 (no shots), OLD=<url of an older build page> (old-save load check)
   Stages: her room (her + her pet + maid + maid's pet + Giáo tập ma ma + eunuch), Ngự hoa viên (her + up to 5 consorts, all with pets), Thái y viện (her + Thái y + 2 consorts).
   Each stage: view 1, then every further view by a real mouse SWIPE. Per view it measures every visible person's BODY centre (core column of kitFigBody) and feet
   line, and every pet's visible bottom-centre, and checks:
   (1) people per view = KIT_SLOTS (page 2 / spread 4) while enough people remain — on Fold (one page) exactly 2;
   (2) person i of a view stands on slot i: body centre = kit slot centre (kitSlotCxE of the free width) ±2 px, feet = kit floor line ±2 px;
   (3) the slot x set and the floor y are the SAME on every view (no shift on swipe) and on every stage of the same view type (room page = place page on Fold);
   (4) every pet's bottom-centre = kitPetSpot(owner slot centre, slot width) ±2 px and its feet on the floor line ±2 px; a pet per person who has one;
   (5) no page errors; nothing visible while pictures load sits off its slot (unplaced figures are hidden: .j59wait). Prints JSON; exit code 1 on any FAIL. */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,VP,OUT,TAG]=process.argv;
const m=/^(\d+)x(\d+)@([\d.]+)$/.exec(VP);const W=+m[1],H=+m[2],DPR=+m[3];fs.mkdirSync(OUT,{recursive:true});const sleep=t=>new Promise(r=>setTimeout(r,t));
const PX=process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{};
async function boot(b,url,errs){const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:DPR,hasTouch:true,isMobile:W<1000,serviceWorkers:'block'});
 const p=await ctx.newPage();p.on('pageerror',e=>errs.push(e.message.slice(0,200)));p.setDefaultTimeout(240000);
 await p.addInitScript(()=>{window.__nlInner=1;addEventListener('DOMContentLoaded',()=>{const s=document.createElement('style');s.textContent='#kroul,#kload,.krbox{display:none!important}';document.head.appendChild(s)})});
 await p.route(/ctmload=1/,r=>r.abort());await p.goto(url,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await sleep(1500);return p}
(async()=>{const b=await chromium.launch(PX);const errs=[];const p=await boot(b,URL,errs);const FAIL=[];const OUTR={vp:VP,stages:{},fail:FAIL};
 await p.evaluate(()=>{window.__forceOrigin='thd';SLOT=3;document.getElementById('title').hidden=true;start();window.__nlInner=0;quiet=false;Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;S.buoi=0;used=0;deal();render();document.querySelectorAll('#kload,.krbox,#kroul').forEach(e=>e.remove())});
 await sleep(1200);await p.addStyleTag({content:'img.figimg,#mefig,#tokens .tok,.kspet{animation:none!important}#kroul,#kload,.kmov,.kmfls,#kpodov,#dawn{display:none!important}'});
 const sh=n=>process.env.SHOTS==='0'?null:p.screenshot({path:`${OUT}/${TAG||'ssf'}-${W}x${H}-${n}.jpg`,type:'jpeg',quality:72});
 const settle=async()=>{for(let k=0;k<60;k++){const ok=await p.evaluate(()=>{const st=document.getElementById('stage');if(!st.dataset.j59slots||st.classList.contains('j59wait'))return false;
   const pend=Object.values(KIT_PET.img).some(v=>v===null)||[...st.querySelectorAll('.kspet')].some(e=>!e.complete||!kitFigBody(e.getAttribute('src')));const need=+st.dataset.j59n;return !pend});if(ok)break;await sleep(1000)}await sleep(1800)};
 const info=()=>p.evaluate(()=>{const st=document.getElementById('stage'),R=st.getBoundingClientRect();const vis=e=>e&&e.offsetParent!==null&&getComputedStyle(e).display!=='none'&&getComputedStyle(e).visibility!=='hidden'&&!e.classList.contains('j59off')&&e.getBoundingClientRect().width>2;
  const dx=parseFloat(st.style.getPropertyValue('--j59dx'))||0;
  const figs=[...document.querySelectorAll('#mefig,#tokens .tok img.figimg')].filter(vis).map(e=>{const q=e.getBoundingClientRect(),b=kitFigBody(e.getAttribute('src'))||{t:0,b:1,l:0,r:1,ht:0};const cm=b.cl!=null&&b.cr>b.cl?(b.cl+b.cr)/2:(b.l+b.r)/2;
   const tk=e.closest('.tok');const pp=tk?curPeople()[+tk.dataset.p]:S;let wp=false;try{const w=pp===S?S:(typeof figWho==='function'?figWho(pp):pp);wp=!!kitPetOf(pp)&&(pp===S||typeof kitKnown!=='function'||kitKnown(w,pp)!==false)}catch(x){}
   return{wantPet:wp,id:e.id||('p'+(e.closest('.tok')||{dataset:{}}).dataset.p),cx:+(q.left-R.left-st.clientLeft+q.width*cm).toFixed(1),feet:+(q.top-R.top-st.clientTop+q.height*b.b).toFixed(1),body:Math.round(q.height*(b.b-(b.ht>b.t?b.ht:b.t))),l:Math.round(q.left-R.left+q.width*b.l),r:Math.round(q.left-R.left+q.width*b.r)}}).sort((a,b)=>a.cx-b.cx);
  const pets=[...st.querySelectorAll('.kspet')].filter(vis).map(e=>{const q=e.getBoundingClientRect(),b=kitFigBody(e.getAttribute('src'))||{t:0,b:1,l:0,r:1};return{pk:e.dataset.pk,pet:e.dataset.pet,ph:!!e.dataset.ph,x:+(q.left-R.left-st.clientLeft+q.width*(b.l+b.r)/2).toFixed(1),feet:+(q.top-R.top-st.clientTop+q.height*b.b).toFixed(1),h:Math.round(q.height*(b.b-b.t))}});
  const [x0,av]=(st.dataset.j59free||'0,0').split(',').map(Number);const N=+st.dataset.j59n||0;const slots=[];for(let i=0;i<N;i++)slots.push(+kitSlotCxE(i,N,x0,av).toFixed(1));
  const ppl=curPeople();const owner={};[...document.querySelectorAll('#tokens .tok')].forEach(t=>{const pp=ppl[+t.dataset.p];owner['p'+t.dataset.p]=pp?(pp.kind+':'+pp.name):''});
  return{place:S.place,fs:st.classList.contains('kplfs'),pages:kitView().pages,N,x0,av,sw:+(av/Math.max(1,N)).toFixed(1),floor:+(st.clientHeight-kitSlotFloor(st.clientHeight)).toFixed(1),slots,ds:st.dataset.j59slots,pg:st.dataset.j59pg||'',dx,figs,pets,owner,stage:[Math.round(R.width),Math.round(R.height)],petSx:KIT_SLOTS.pet.sx}});
 const check=(name,v,i,total,pagesN)=>{const f=(c,msg)=>{if(!c)FAIL.push(name+' view'+(i+1)+': '+msg)};
  const exp=v.N;const left=total-v.seen;f(v.figs.length===Math.min(exp,left),`people in view ${v.figs.length}, expected ${Math.min(exp,left)} (slots ${exp}, people left ${left})`);
  if(v.pages===1)f(v.N===2,'Fold/one-page view has '+v.N+' slots, expected 2');
  v.figs.forEach((g,k)=>{f(Math.abs(g.cx-v.slots[k])<=2,`${g.id} body centre ${g.cx} not on slot ${k+1} ${v.slots[k]}`);f(Math.abs(g.feet-v.floor)<=2,`${g.id} feet ${g.feet} not on floor ${v.floor}`)});
  v.figs.forEach(g=>{if(g.wantPet&&!v.pets.some(q=>(q.pk==='me'&&g.id==='mefig')||g.id===q.pk))FAIL.push(name+' view'+(i+1)+': '+g.id+' has a following pet but none stands at its spot')});
  v.pets.forEach(q=>{const k=v.figs.findIndex(g=>(q.pk==='me'&&g.id==='mefig')||g.id===q.pk);f(k>=0,'pet '+q.pk+' without its owner in view');if(k<0)return;const want=v.slots[k]+v.petSx*v.sw;
   f(Math.abs(q.x-want)<=2,`pet ${q.pet} of ${q.pk} at x ${q.x}, kit spot ${want.toFixed(1)}`);f(Math.abs(q.feet-v.floor)<=2,`pet ${q.pet} feet ${q.feet} not on floor ${v.floor}`)})};
 const stage=async(name,setup,arg)=>{await p.evaluate(()=>{Q.length=0;window.kmPush=function(){};document.querySelectorAll('.kmov,#dawn,#kpodov,.kmfls').forEach(e=>e.remove());const md=document.getElementById('modal');if(md)md.hidden=true;S.dead=false;S.confined=0;used=0});
  await p.evaluate(setup,arg);await sleep(2500);await settle();const total=await p.evaluate(()=>(document.getElementById('mefig')?1:0)+curPeople().filter(x=>x&&x.kind!=='chest'&&x.kind!=='task'&&!(x.kind==='srv'&&x.sk==='task')).length);const views=[];let v=await info();v.seen=0;views.push(v);await sh(name+'-v1');
  const box=await p.evaluate(()=>{const q=document.getElementById('stage').getBoundingClientRect();return{x:q.left,y:q.top,w:q.width,h:q.height}});
  const pages=+(v.pg.split(',')[1]||1);let seen=v.figs.length;
  for(let s=1;s<pages;s++){const y=box.y+box.h*.45;await p.mouse.move(box.x+box.w*.62,y);await p.mouse.down();for(let k=1;k<=8;k++){await p.mouse.move(box.x+box.w*(.62-.045*k),y);await sleep(16)}await p.mouse.up();await sleep(900);await settle();
   v=await info();v.seen=seen;seen+=v.figs.length;views.push(v);await sh(name+'-v'+(s+1))}
  views.forEach((x,i)=>check(name,x,i,total,pages));
  for(let i=1;i<views.length;i++){if(JSON.stringify(views[i].slots)!==JSON.stringify(views[0].slots))FAIL.push(name+': slots moved on swipe '+JSON.stringify(views[0].slots)+' → '+JSON.stringify(views[i].slots));if(Math.abs(views[i].floor-views[0].floor)>.5)FAIL.push(name+': floor moved on swipe')}
  OUTR.stages[name]={total,views:views.map(x=>({place:x.place,fs:x.fs,N:x.N,slots:x.slots,floor:x.floor,sw:x.sw,pg:x.pg,figs:x.figs.map(g=>[g.id,g.cx,g.feet,g.body,g.l,g.r]),pets:x.pets.map(q=>[q.pk,q.pet,q.x,q.feet,q.h,q.ph]),owner:x.owner}))};
  console.log(name,JSON.stringify({total,views:views.map(x=>({N:x.N,n:x.figs.length,slots:x.slots,floor:x.floor,cx:x.figs.map(g=>g.cx),pets:x.pets.map(q=>q.pet+'@'+q.x)}))}));return views};
 const mkp=`const mk=t=>({t,at:0,src:"emp",care:90,full:90,clean:90,joy:90,aff:60,stg:2});`;
 /* 1 her room: her + pet, maid + pet, Giáo tập ma ma, eunuch (homePeople order) */
 const V1=await stage('room',new Function(mkp+`S.pets=[mk("meomuop")];S.petOn=0;if(S.maid){S.maid.pets=[mk("cho")];S.maid.petOn=0}S.place="home";tab="act";render();return 1`));
 /* 2 Ngự hoa viên: her + 5 consorts, everyone with a pet */
 const V2=await stage('vuon',new Function('a',mkp+`const k="vuon";S.where=S.where||{};const Wh=S.where;for(const v of rivals){if(Wh[v.id]===k)Wh[v.id]="r"+v.id;v.pets=[];v.petOn=-1}Wh.emp="tn";S.menW={};S.minW={};
  const P=["tho","cuuvi","kylan","hac","sutu"];const L=liveRivals(true).slice(0,5);L.forEach((v,i)=>{Wh[v.id]=k;v.pets=[mk(P[i])];v.petOn=0});S.pets=[mk("meomuop")];S.petOn=0;S.place="home";tab="act";goTo(k);return 1`));
 /* 3 Thái y viện: her + Thái y (a man) + 2 consorts with pets */
 const V3=await stage('tyv',new Function('a',mkp+`const k="tyv";const Wh=S.where;for(const v of rivals)if(Wh[v.id]===k||Wh[v.id]==="vuon")Wh[v.id]="r"+v.id;
  liveRivals(true).slice(0,2).forEach((v,i)=>{Wh[v.id]=k;v.pets=[mk(["meo","phuong"][i])];v.petOn=0});S.place="home";tab="act";goTo(k);return 1`));
 /* (3) same slots + floor on every stage of the same view type */
 const typ=v=>v.N+'@'+(v.fs&&v.pages===2?'spread':'page');const ref={};
 for(const [n,V] of [['room',V1],['vuon',V2],['tyv',V3]])for(const v of V){const t=typ(v);if(!ref[t])ref[t]={n,slots:v.slots,floor:v.floor};else{if(JSON.stringify(ref[t].slots)!==JSON.stringify(v.slots))FAIL.push(`${n}: slots ${JSON.stringify(v.slots)} differ from ${ref[t].n} ${JSON.stringify(ref[t].slots)} (same view type ${t})`);if(Math.abs(ref[t].floor-v.floor)>.5)FAIL.push(`${n}: floor ${v.floor} differs from ${ref[t].n} ${ref[t].floor}`)}}
 OUTR.types=ref;
 /* (5) loading: while a picture is missing nobody stands unplaced (hidden) */
 const ld=await p.evaluate(async()=>{const st=document.getElementById('stage');S.place="home";tab="act";render();const me=document.getElementById('mefig');const s0=me.getAttribute('src');me.setAttribute('src',s0+(s0.includes('?')?'&':'?')+'slow='+Date.now());
  const vis=[...document.querySelectorAll('#mefig,#tokens .tok')].filter(e=>getComputedStyle(e).visibility!=='hidden'&&getComputedStyle(e).display!=='none').length;return{wait:st.classList.contains('j59wait'),complete:me.complete,visibleWhileLoading:vis}});
 if(ld.wait===false&&ld.complete===false)FAIL.push('loading: stage not in j59wait while a figure loads');if(ld.wait&&ld.visibleWhileLoading)FAIL.push('loading: '+ld.visibleWhileLoading+' figures visible while waiting');OUTR.loading=ld;
 /* old save (optional): a save written by an older build loads, her room lays out on the fixed slots */
 if(process.env.OLD){const e1=[];const o=await boot(b,process.env.OLD,e1);const ls=await o.evaluate(()=>{try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<400;i++){start();if(!isSrv())break}Q.length=0;quiet=false;save();const r={};for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);r[k]=localStorage.getItem(k)}return r});
  await o.context().close();const e2=[];const n=await boot(b,URL,e2);await n.evaluate(r=>{for(const k in r)localStorage.setItem(k,r[k])},ls);
  const res=await n.evaluate(async()=>{document.getElementById('title').hidden=true;try{const d=loadSlot(3);SLOT=3;quiet=true;deser(d);quiet=false;Q.length=0;document.getElementById('modal').hidden=true;document.querySelectorAll('#kload,.krbox,#kroul').forEach(e=>e.remove());S.place="home";tab="act";render();
   for(let k=0;k<60;k++){const st=document.getElementById('stage');if(st.dataset.j59slots&&!st.classList.contains('j59wait'))break;await new Promise(r=>setTimeout(r,1000))}const st=document.getElementById('stage');return{ok:true,N:+st.dataset.j59n,slots:st.dataset.j59slots,name:S.name}}catch(e){return{ok:false,err:String(e)}}});
  OUTR.oldSave={res,errsOld:e1,errsNew:e2};if(!res.ok||res.N!==(W<1000?2:2)||e2.length)FAIL.push('old save: '+JSON.stringify(res)+' errs '+JSON.stringify(e2));console.log('oldSave',JSON.stringify(OUTR.oldSave))}
 if(errs.length)FAIL.push('page errors: '+JSON.stringify(errs.slice(0,3)));
 fs.writeFileSync(`${OUT}/${TAG||'ssf'}-${W}x${H}.json`,JSON.stringify(OUTR,null,1));console.log('FAIL',JSON.stringify(FAIL));console.log(FAIL.length?'RESULT FAIL':'RESULT PASS');await b.close();process.exit(FAIL.length?1:0)})();
