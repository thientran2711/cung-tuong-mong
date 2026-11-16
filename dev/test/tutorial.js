/* Lời dặn tân thủ (jtut, KIT §36): the whole tour, skip midway, replay from ☰, an old sổ, bots.
   usage: node dev/test/tutorial.js <baseURL> <W>x<H>@dpr <outdir> <tag> [modes=tour,skip,replay,old,bot]
   Writes <tag>-NN-<step>.jpg for every step (tour) + a few shots of the other modes; prints one JSON line per check. */
const {chromium}=require('./lib/pw-roulette');
const [,,BASE,SZ,OUT,TAG,MODES]=process.argv;const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);
const modes=(MODES||'tour,skip,replay,old,bot').split(',');
const fs=require('fs');fs.mkdirSync(OUT,{recursive:true});
const out=o=>console.log(JSON.stringify(o));
(async()=>{const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{});let fails=0;const fail=(m,o)=>{fails++;out({FAIL:m,...(o||{})})};
 async function page(flag){const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:+(DPR||1),serviceWorkers:'block',reducedMotion:process.env.MOTION?'no-preference':'reduce'});
  await ctx.addInitScript(f=>{try{localStorage.setItem('ctm-bgpause','1');if(f)localStorage.setItem('hclh-tut-test','1')}catch(e){}},flag);
  const p=await ctx.newPage();p.setDefaultTimeout(120000);p.errs=[];p.on('pageerror',e=>p.errs.push(e.message));
  await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:300000});await p.evaluate(()=>{const k=document.getElementById('kload');if(k)k.remove()});await p.addStyleTag({content:'#kroul,#kroulw,.kroul{display:none!important}'});await p.waitForTimeout(800);return p}
 async function newLife(p,slot){await p.evaluate(s=>{SLOT=s;window.__forceOrigin='tt';document.getElementById('title').hidden=true;start();showModal()},slot||1);
  await require('./lib/roulette').passNewLifePopups(p)}
 const shot=(p,n)=>p.screenshot({path:`${OUT}/${TAG}-${n}.jpg`,type:'jpeg',quality:82});
 const metrics=p=>p.evaluate(()=>{const R=e=>{if(!e||e.hidden)return null;const r=e.getBoundingClientRect();return r.width?{x:Math.round(r.left),y:Math.round(r.top),w:Math.round(r.width),h:Math.round(r.height),b:Math.round(r.bottom),r:Math.round(r.right)}:null};
  const card=R(document.querySelector('#ktut .ktut-card')),hole=R(document.querySelector('#ktut .ktut-hole'));const s=KTUT_STEPS[KTUT.step]||{};
  const ov=card&&hole?Math.max(0,Math.min(card.r,hole.r)-Math.max(card.x,hole.x))*Math.max(0,Math.min(card.b,hole.b)-Math.max(card.y,hole.y)):0;
  const cut=[...document.querySelectorAll('#ktut .ktut-card *, .ktip *')].filter(e=>e.children.length===0&&e.scrollWidth>e.clientWidth+1&&getComputedStyle(e).overflow!=='visible').length;
  return{step:KTUT.step,id:s.id,interact:!!s.interact,card,hole,overlap:ov,inView:!!card&&card.x>=0&&card.y>=0&&card.r<=innerWidth&&card.b<=innerHeight,overflowX:document.documentElement.scrollWidth>innerWidth,cut,
   sub:(document.querySelector('#ktut .kpsub')||{}).textContent}});
 const until=async(p,fn,ms,arg)=>{const t=Date.now();while(Date.now()-t<(ms||15000)){if(await p.evaluate(fn,arg).catch(()=>false))return true;await p.waitForTimeout(300)}return false};

 if(modes.includes('tour')){const p=await page(true);await newLife(p,1);
  if(!await until(p,()=>KTUT.on&&!document.getElementById('ktut').hidden,20000)){fail('tour did not start',await p.evaluate(()=>({q:Q.map(m=>m.t),busy:KTUT.busy(),fresh:KTUT.fresh,rec:KTUT.rec,opt:OPT.tut,wd:navigator.webdriver,tf:localStorage.getItem('hclh-tut-test'),tutTour:S.tutTour,title:document.getElementById('title').hidden,ask:KTUT.ask})));await shot(p,'fail');await b.close();process.exit(1)}
  for(let n=1;n<=14;n++){await p.waitForTimeout(1700);const m=await metrics(p);if(m.step<0)break;
   await shot(p,String(n).padStart(2,'0')+'-'+m.id);out({TAG,...m});
   if(!m.inView)fail('card out of view',{id:m.id});if(m.overflowX)fail('overflowX',{id:m.id});if(m.cut)fail('cut text',{id:m.id});if(m.interact&&m.overlap)fail('card over the tap target',{id:m.id});
   if(m.id==='thu'){const h=m.hole;await p.mouse.click(h.x+h.w*.7,h.y+h.h/2);await until(p,()=>KTUT_STEPS[KTUT.step].id!=='thu',20000);continue}
   if(m.id==='chao'){/* the 4 intro pages "Game này chơi gì" */for(let pg=1;pg<=4;pg++){const s2=await metrics(p);await shot(p,'00-intro-'+pg);out({TAG,intro:pg,sub:s2.sub,inView:s2.inView,cut:s2.cut});if(!s2.inView)fail('intro page out of view',{pg});
     if(!new RegExp('trang '+pg+'/4').test(s2.sub||''))fail('intro page number',{pg,sub:s2.sub});if(pg<4){await p.evaluate(()=>document.querySelector('#ktut [data-ktut=next]').click());await p.waitForTimeout(900)}}}
   const st=m.step;await p.evaluate(()=>{const b=document.querySelector('#ktut [data-ktut=next]');if(b)b.click()});
   await until(p,s=>KTUT.step!==s,8000,st)}
  const r=await p.evaluate(()=>({tour:KTUT.rec.tour,saved:S.tutTour,hidden:document.getElementById('ktut').hidden,used}));out({TAG,end:r});if(r.tour!=='done'||!r.hidden)fail('tour end');
  /* resize / rotate mid-tour: replay to step 2 and turn the screen */
  await p.evaluate(()=>{kitTour()});await until(p,()=>!document.getElementById('ktut').hidden);for(let i=0;i<4;i++){await p.evaluate(()=>document.querySelector('#ktut [data-ktut=next]').click());await p.waitForTimeout(700)}await p.waitForTimeout(1500);
  await p.setViewportSize({width:H,height:W});await p.waitForTimeout(1800);const rm=await metrics(p);out({TAG,rotated:rm});await shot(p,'rot-'+rm.id);
  const hr=await p.evaluate(()=>{const r=document.querySelector('#kstrow').getBoundingClientRect(),h=document.querySelector('#ktut .ktut-hole').getBoundingClientRect();return Math.abs(r.top-6-h.top)+Math.abs(r.left-6-h.left)});if(hr>4)fail('hole not on target after rotate',{hr});
  await p.setViewportSize({width:W,height:H});await p.waitForTimeout(800);await p.evaluate(()=>document.querySelector('#ktut [data-ktut=skip]').click());
  out({TAG,mode:'tour',errs:p.errs});if(p.errs.length)fail('page errors');await p.context().close()}

 if(modes.includes('skip')){const p=await page(true);await newLife(p,1);await until(p,()=>KTUT.on&&!document.getElementById('ktut').hidden,20000);
  for(let i=0;i<2;i++){await p.waitForTimeout(1200);await p.evaluate(()=>document.querySelector('#ktut [data-ktut=next]').click())}
  await p.waitForTimeout(1500);await p.evaluate(()=>document.querySelector('#ktut [data-ktut=skip]').click());await p.waitForTimeout(800);
  const r=await p.evaluate(()=>({tour:KTUT.rec.tour,hidden:document.getElementById('ktut').hidden}));out({TAG,skip:r});if(r.tour!=='skip'||!r.hidden)fail('skip');
  /* a first-open tip (Tài nghệ), non-blocking */
  await p.evaluate(()=>document.querySelector('#tabs [data-tab=art]').click());const ok=await until(p,()=>{if(KTUT.tip&&KTUT.tip!=='tab-art'){const b=document.querySelector('#ktip [data-ktut=tip]');if(b)b.click();return false}return KTUT.tip==='tab-art'},12000);/* a queued earlier tip (Hành sự) may show first: the player taps its Đã hiểu */await p.waitForTimeout(600);await shot(p,'tip-tai-nghe');
  const tb=await p.evaluate(()=>{const t=document.getElementById('ktip');if(!t)return null;const r=t.querySelector('.dlg').getBoundingClientRect(),tb=document.getElementById('tabs').getBoundingClientRect();return{above:r.bottom<=tb.top,pe:getComputedStyle(t).pointerEvents}});
  out({TAG,tip:ok,tb});if(!ok||!tb||!tb.above)fail('tip');
  await p.evaluate(()=>document.querySelector('#ktip [data-ktut=tip]').click());await p.waitForTimeout(500);
  const again=await p.evaluate(async()=>{document.querySelector('#tabs [data-tab=act]').click();await new Promise(r=>setTimeout(r,1500));document.querySelector('#tabs [data-tab=art]').click();await new Promise(r=>setTimeout(r,2500));return KTUT.tip});
  if(again==='tab-art')fail('tip shown twice');
  out({TAG,mode:'skip',errs:p.errs});if(p.errs.length)fail('page errors');await p.context().close()}

 if(modes.includes('replay')){const p=await page(true);await p.evaluate(()=>{localStorage.setItem('hclh-tut',JSON.stringify({tour:'done',asked:1,seen:{}}));KTUT.rec.tour='done';KTUT.rec.asked=1});await newLife(p,1);await p.waitForTimeout(1500);
  if(await p.evaluate(()=>KTUT.on))fail('tour restarted after done');
  await p.evaluate(()=>document.getElementById('menu').click());await until(p,()=>!!document.querySelector('#modal .ktutb'),8000);await p.waitForTimeout(800);await shot(p,'menu-xem-lai');
  await p.evaluate(()=>document.querySelector('#modal .ktutb').click());const ok=await until(p,()=>KTUT.on&&!document.getElementById('ktut').hidden,15000);await p.waitForTimeout(1200);await shot(p,'replay-1');
  out({TAG,replay:ok});if(!ok){fail('replay',await p.evaluate(()=>({on:KTUT.on,replay:KTUT.replay,busy:KTUT.busy(),q:Q.map(m=>m.t||(m.kit&&m.kit.title)),title:!document.getElementById('title').hidden,modal:!document.getElementById('modal').hidden,mcls:document.getElementById('modal').className,S:!!S})));await shot(p,'replay-fail')}
  /* Thiết lập switch */
  await p.evaluate(()=>document.querySelector('#ktut [data-ktut=skip]').click());await p.evaluate(()=>document.getElementById('menu').click());await p.waitForTimeout(1200);
  await p.evaluate(()=>{const b=[...document.querySelectorAll('#modal .kbtn')].find(b=>/Thiết lập/.test(b.textContent));b.click()});await p.waitForTimeout(1200);await shot(p,'thiet-lap');
  const sw=await p.evaluate(()=>{const t=document.getElementById('o-tut');if(!t)return null;t.click();return OPT.tut});out({TAG,switchOff:sw});if(sw!==false)fail('switch');
  out({TAG,mode:'replay',errs:p.errs});if(p.errs.length)fail('page errors');await p.context().close()}

 if(modes.includes('old')){/* an old player: a sổ in play + a past life, nothing recorded on this device */
  const p=await page(true);await newLife(p,2);await p.evaluate(()=>{S.turn=0;S.tuan=1;save();/* inside its first 2 weeks: asked once (past week 2: nothing, checked in goal.js) */localStorage.removeItem('hclh-tut');localStorage.setItem('cung-luanhoi',JSON.stringify([{n:'Cũ',o:'x',r:'Quý nhân',age:30,y:3,kids:0,f:'bệnh'}]))});
  await p.reload({waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:300000});await p.waitForTimeout(1500);
  await p.evaluate(()=>{const k=document.getElementById('kload');if(k)k.remove();localStorage.setItem('hclh-tut-test','1');const b=document.querySelector('#modal [data-tgo="cont"]');if(b)b.click();else{SLOT=2;const s=loadSlot(2);if(s){deser(s);document.getElementById('title').hidden=true;render()}}});
  const asked=await until(p,()=>!document.getElementById('ktut').hidden&&!!document.querySelector('#ktut [data-ktut=yes]'),15000);await p.waitForTimeout(800);await shot(p,'so-cu-hoi');
  const st=await p.evaluate(()=>({loaded:!!S&&S.tuan===1,name:S&&S.name,on:KTUT.on}));out({TAG,old:st,asked});if(!asked||!st.loaded||st.on)fail('old sổ');
  await p.evaluate(()=>document.querySelector('#ktut [data-ktut=no]').click());await p.waitForTimeout(1500);
  const r=await p.evaluate(()=>({tut:OPT.tut,hidden:document.getElementById('ktut').hidden,asked:KTUT.rec.asked}));out({TAG,oldNo:r});if(r.tut!==false||!r.hidden)fail('old no');
  out({TAG,mode:'old',errs:p.errs});if(p.errs.length)fail('page errors');await p.context().close()}

 if(modes.includes('bot')){const p=await page(false);await newLife(p,1);await p.waitForTimeout(3000);const a=await p.evaluate(()=>({on:KTUT.on,tip:KTUT.tip}));
  const p2=await page(true);await p2.evaluate(()=>{window.__bot=true});await newLife(p2,1);await p2.waitForTimeout(3000);const c=await p2.evaluate(()=>({on:KTUT.on,tip:KTUT.tip}));
  out({TAG,webdriver:a,bot:c});if(a.on||a.tip||c.on||c.tip)fail('bot blocked');await p.context().close();await p2.context().close()}
 out({TAG,fails});await b.close();process.exit(fails?1:0)})();
