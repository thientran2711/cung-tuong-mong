/* KIT 33.10 full-screen place view test (review/stage-pets r6): usage node dev/test/place-fs.js <page URL> <WxH@dpr> <outdir> [tag]  (SHOTS=0 to skip shots)
   Flow: her room (Hành sự stage, split on iPad) → Dư đồ → courtyard of a multi-hall palace → hall → visit choice → FULL-SCREEN place painting
   (no panel, no plaque columns, people at kit height, fixed columns, no overlap, "+N" chips) → swipe (mid-drag shot) → tap a person = pop-up page
   → close = painting → Hành sự tab = cards page → single-hall place straight from Dư đồ (no courtyard) → home again = split stage. */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,VP,OUT,TAG]=process.argv;
const m=/^(\d+)x(\d+)@([\d.]+)$/.exec(VP);const W=+m[1],H=+m[2],DPR=+m[3];fs.mkdirSync(OUT,{recursive:true});const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{});const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:DPR,hasTouch:true,isMobile:W<1000,serviceWorkers:'block'});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.setDefaultTimeout(240000);
 await p.addInitScript(()=>{window.__nlInner=1;addEventListener('DOMContentLoaded',()=>{const s=document.createElement('style');s.textContent='#kroul,#kload,.krbox{display:none!important}';document.head.appendChild(s)})});
 await p.route(/ctmload=1/,r=>r.abort());await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await sleep(1500);
 await p.evaluate(()=>{window.__forceOrigin='thd';SLOT=3;document.getElementById('title').hidden=true;start();window.__nlInner=0;quiet=false;Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;S.buoi=0;used=0;deal();render();document.querySelectorAll('#kload,.krbox,#kroul').forEach(e=>e.remove())});
 await sleep(1500);await p.addStyleTag({content:'img.figimg,#mefig,#tokens .tok,.kspet{animation:none!important}#kroul,#kload,.kmov,.kmfls,#kpodov,#dawn{display:none!important}'});
 const sh=n=>process.env.SHOTS==='0'?null:p.screenshot({path:`${OUT}/${TAG||'pfs'}-${W}x${H}-${n}.jpg`,type:'jpeg',quality:70});
 const lg=(...a)=>console.log(...a);const R={vp:VP,steps:{}};
 const info=()=>p.evaluate(()=>{const g=document.querySelector('.game'),st=document.getElementById('stage'),pn=document.getElementById('panel');const box=e=>{if(!e)return null;const q=e.getBoundingClientRect();return q.width>2&&q.height>2&&getComputedStyle(e).visibility!=='hidden'?[Math.round(q.left),Math.round(q.top),Math.round(q.width),Math.round(q.height)]:null};
  const S0=st.getBoundingClientRect();const vis=e=>e&&e.offsetParent!==null&&getComputedStyle(e).display!=='none'&&e.getBoundingClientRect().width>2&&!e.classList.contains('j59off');
  const figs=[...document.querySelectorAll('#mefig,#tokens .tok img.figimg')].filter(vis).map(e=>{const q=e.getBoundingClientRect(),bb=kitFigBody(e.getAttribute('src'))||{t:0,b:1,l:0,r:1,ht:0};return{body:Math.round(q.height*(bb.b-(bb.ht>bb.t?bb.ht:bb.t))),l:Math.round(q.left+q.width*bb.l-S0.left),r:Math.round(q.left+q.width*bb.r-S0.left),t:Math.round(q.top+q.height*bb.t-S0.top),b:Math.round(q.top+q.height*bb.b-S0.top)}}).sort((a,b)=>a.l-b.l);
  let ov=0;for(let i=1;i<figs.length;i++)ov=Math.max(ov,figs[i-1].r-figs[i].l);
  const chips=[...st.querySelectorAll('.j59more')].map(c=>{const q=c.getBoundingClientRect();return{t:c.textContent,l:Math.round(q.left-S0.left),r:Math.round(q.right-S0.left),top:Math.round(q.top-S0.top),b:Math.round(q.bottom-S0.top)}});
  let chipOnFig=0;chips.forEach(c=>figs.forEach(f=>{if(c.r>f.l+1&&c.l<f.r-1&&c.b>f.t+1&&c.top<f.b-1)chipOnFig++}));
  const tm=document.getElementById('tomap');return{place:S.place,tab,cls:g.className,fs:st.classList.contains('kplfs'),stage:box(st),panel:box(pn),kshR:box(document.getElementById('kshR')),pop:box(document.getElementById('popw')),tomap:tm?tm.textContent.trim():null,pg:st.dataset.j59pg||'',n:figs.length,body:figs.map(f=>f.body),overlap:ov,chips,chipOnFig,pets:[...st.querySelectorAll('.kspet')].filter(vis).length}});
 const step=async(name,fn,arg,wait)=>{const r=await p.evaluate(fn,arg).catch(e=>'ERR '+e.message);await sleep(wait||3500);const i=await info();R.steps[name]={r,i};lg(name,JSON.stringify(r),JSON.stringify(i));await sh(name);return i};
 const prep=()=>p.evaluate(()=>{Q.length=0;window.kmPush=function(){};document.querySelectorAll('.kmov,#dawn,#kpodov,.kmfls').forEach(e=>e.remove());const md=document.getElementById('modal');if(md)md.hidden=true;S.dead=false;S.confined=0;used=0});
 /* 1 her room */
 await prep();await step('1-room',()=>{const mk=t=>({t,at:0,src:"emp",care:90,full:90,clean:90,joy:90,aff:60,stg:2});S.pets=[mk("meomuop")];S.petOn=0;S.place="home";tab="act";render();return S.place},null,7000);
 /* 2 Dư đồ */
 await prep();await step('2-dudo',()=>{document.querySelector('#tabs [data-tab="go"]').click();return tab});
 /* 3 courtyard of a multi-hall palace with people in it */
 await prep();await step('3-court',()=>{let i=[0,1,2,3,4,5,6,7].find(i=>{const k=kpmKeyOf(i);return k&&k!=="home"&&kpmParts(i,k).length>=2});const k=kpmKeyOf(i);
   const Wh=S.where||(S.where={});liveRivals(true).filter(v=>"r"+v.id!==k).slice(0,4).forEach(v=>Wh[v.id]=k);kpmOpenSlot(i,k);return [i,k,kpmParts(i,k).length]},null,5000);
 /* 4 hall → visit choice → arrival */
 await prep();const ch=await p.evaluate(()=>{kpmTapPart('chinh');const bs=[...document.querySelectorAll('#modal button, .modal button')].filter(b=>b.offsetParent&&!/✕|Đóng/.test(b.textContent));return bs.map(b=>b.textContent.trim().slice(0,30))});lg('choices',JSON.stringify(ch));
 await sleep(1200);await sh('4a-visit-choice');
 await step('4-place',()=>{const bs=[...document.querySelectorAll('#modal button, .modal button')].filter(b=>b.offsetParent&&/Vào|vào/.test(b.textContent));if(bs[0])bs[bs.length-1].click();return [S.place,Q.length]},null,6000);
 const swipeTap=async(T)=>{
 const box=await p.evaluate(()=>{const q=document.getElementById('stage').getBoundingClientRect();return{x:q.left,y:q.top,w:q.width,h:q.height}});
 const cov=await p.evaluate(([x,y])=>{const out=[];for(let k=0;k<4;k++){const e=document.elementFromPoint(x,y);if(!e||e.closest('#stage'))break;let t=e;while(t.parentElement&&t.parentElement!==document.body&&!t.parentElement.classList.contains('game'))t=t.parentElement;out.push(t.id||t.className);t.style.display='none'}return out},[box.x+box.w*.7,box.y+box.h*.6]);if(cov.length)lg('covering stage (event result cards, hidden for the swipe):',JSON.stringify(cov));
 const pg0=(await info()).pg;if(pg0){const y=box.y+box.h*.6;await p.mouse.move(box.x+box.w*.7,y);await p.mouse.down();for(let i=1;i<=8;i++){await p.mouse.move(box.x+box.w*(.7-.04*i),y);await sleep(16)}await sh(T+'a-swipe-drag');await p.mouse.up();await sleep(150);await sh(T+'b-swipe-anim');await sleep(900);R.steps[T+'-after-swipe']={i:await info()};lg(T+'-after-swipe',JSON.stringify(R.steps[T+'-after-swipe'].i));await sh(T+'c-view2')}
 const tp=await p.evaluate(()=>{const ppl=curPeople();const t=[...document.querySelectorAll('#tokens .tok')].find(e=>e.style.display!=='none'&&e.querySelector('img.figimg')&&ppl[+e.dataset.p]&&ppl[+e.dataset.p].kind!=='chest');if(!t)return null;const q=t.querySelector('img.figimg').getBoundingClientRect();return{x:q.left+q.width/2,y:q.top+q.height*.5}});
 if(tp){await p.mouse.click(tp.x,tp.y);await sleep(2500);R.steps[T+'-pop']={i:await info()};lg(T+'-pop',JSON.stringify(R.steps[T+'-pop'].i));await sh(T+'d-pop');
  await p.evaluate(()=>{const c=[...document.querySelectorAll('#popw button')].find(b=>/✕|Đóng/.test(b.textContent)||b.classList.contains('x'));if(c)c.click();else{popIdx=null;renderStage()}});await sleep(2000);R.steps[T+'-closed']={i:await info()};lg(T+'-closed',JSON.stringify(R.steps[T+'-closed'].i))}};
 await swipeTap('5');
 /* 7 Hành sự tab = cards page */
 await step('7-cards',()=>{document.querySelector('#tabs [data-tab="act"]').click();return tab},null,2500);
 /* 8 single-hall places straight from Dư đồ (no courtyard): Ngự hoa viên with 6 people (swipe + chips + tap), Thái y viện */
 await prep();await step('8-vuon',()=>{goTo("home");tab="go";render();const Wh=S.where||(S.where={});liveRivals(true).slice(0,5).forEach(v=>Wh[v.id]="vuon");const sl=kpmSlotOf("vuon");const multi=sl!=null&&kpmMulti(sl,"vuon");j77Tap("vuon","");const bs=[...document.querySelectorAll('#modal button')].filter(b=>b.offsetParent&&/Đi|đi|Vào|vào|Đến/.test(b.textContent));if(bs[0])bs[0].click();return ["vuon",sl,multi,!!window.__kpm,S.place]},null,6000);
 await swipeTap('8');
 await prep();await step('8-tyv',()=>{goTo("home");tab="go";render();const sl=kpmSlotOf("tyv");const multi=sl!=null&&kpmMulti(sl,"tyv");j77Tap("tyv","");const bs=[...document.querySelectorAll('#modal button')].filter(b=>b.offsetParent&&/Đi|đi|Vào|vào|Đến/.test(b.textContent));if(bs[0])bs[0].click();return ["tyv",sl,multi,!!window.__kpm,S.place]},null,5000);
 /* 9 home again = split */
 await prep();await step('9-home',()=>{goTo("home");tab="act";render();return S.place},null,4000);
 R.errs=errs;fs.writeFileSync(`${OUT}/${TAG||'pfs'}-${W}x${H}.json`,JSON.stringify(R,null,1));lg('errs',JSON.stringify(errs));await b.close()})();
