/* "Xem lại lời dặn" replay stress (jtut): N times from the ☰ menu (title screen over a live kiếp); each time the menu modal must be closed and tour step 1 visible.
   usage: node dev/test/tut-replay.js <baseURL> <W>x<H>@dpr [N=20] ; exit 1 on any miss */
const {chromium}=require('./lib/pw-roulette');
const [,,BASE,SZ,NN]=process.argv;const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);const N=+(NN||20);
(async()=>{const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{});
 const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:+(DPR||1),serviceWorkers:'block',reducedMotion:'reduce'});
 await ctx.addInitScript(()=>{try{localStorage.setItem('ctm-bgpause','1');localStorage.setItem('hclh-tut-test','1')}catch(e){}});
 const p=await ctx.newPage();p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:300000});
 await p.evaluate(()=>{const k=document.getElementById('kload');if(k)k.remove()});await p.addStyleTag({content:'#kroul,#kroulw,.kroul{display:none!important}'});await p.waitForTimeout(800);
 await p.evaluate(()=>{localStorage.setItem('hclh-tut',JSON.stringify({tour:'done',asked:1,seen:{}}));KTUT.rec.tour='done';KTUT.rec.asked=1});
 await p.evaluate(()=>{SLOT=1;window.__forceOrigin='tt';document.getElementById('title').hidden=true;start();showModal()});
 await require('./lib/roulette').passNewLifePopups(p,{max:150});await p.waitForTimeout(1500);
 const until=async(fn,ms)=>{const t=Date.now();while(Date.now()-t<ms){if(await p.evaluate(fn).catch(()=>false))return true;await p.waitForTimeout(100)}return false};
 const state=()=>p.evaluate(()=>({on:KTUT.on,step:KTUT.step,replay:KTUT.replay,busy:KTUT.busy(),tutHidden:(document.getElementById('ktut')||{}).hidden,modalOpen:!document.getElementById('modal').hidden,mcls:document.getElementById('modal').className,title:!document.getElementById('title').hidden,q:Q.map(m=>m.t||(m.kit&&m.kit.title)),btns:[...document.querySelectorAll('#modal button')].map(x=>x.dataset.tgo||x.dataset.ktutReplay||x.textContent.slice(0,12)),slots:(document.getElementById('slots')||{innerHTML:''}).innerHTML.length,load:[1,2,3].map(n=>!!loadSlot(n)),SLOT,dead:!!(S&&S.dead),bot:!!window.__bot}));
 let ok=0;const bad=[];
 for(let i=1;i<=N;i++){
  /* nothing from the previous round may linger: the tour is ended with its own "Bỏ qua lời dặn" button */
  await p.evaluate(()=>{document.getElementById('menu').click()});
  if(!await until(()=>!!document.querySelector('#modal .ktutb'),8000)){bad.push({i,why:'no replay button',s:await state()});continue}
  await p.waitForTimeout(Math.floor(Math.random()*400));
  if(i%2)await p.evaluate(()=>save());/* odd rounds: an autosave while the menu is open (the slot now holds whatever Q held) */
  await p.evaluate(()=>document.querySelector('#modal .ktutb').click());
  const t=await until(()=>KTUT.on&&!!document.getElementById('ktut')&&!document.getElementById('ktut').hidden&&KTUT.step===0&&document.getElementById('modal').hidden,6000);
  if(t)ok++;else bad.push({i,why:'replay did not start within 6s',s:await state()});
  await p.evaluate(()=>{const k=document.querySelector('#ktut [data-ktut=skip]');if(k)k.click()});await until(()=>!KTUT.on,3000);await p.evaluate(()=>{KTUT.rec.tour='done';KTUT.replay=false});
  await p.waitForTimeout(300)}
 /* second entry: ☰ > Thiết lập > "Xem lại lời dặn" (OPT=1 rounds) */
 let okO=0;const badO=[];
 for(let i=1;i<=(+process.env.OPT_N||0);i++){
  await p.evaluate(()=>document.getElementById('menu').click());
  if(!await until(()=>!!document.querySelector('#modal [data-tgo=opt]'),8000)){badO.push({i,why:'no Thiết lập button',s:await state()});continue}
  await p.evaluate(()=>document.querySelector('#modal [data-tgo=opt]').click());
  if(!await until(()=>!!document.querySelector('#modal .ktutb'),8000)){badO.push({i,why:'no replay button in Thiết lập',s:await state()});continue}
  await p.evaluate(()=>save());
  await p.evaluate(()=>document.querySelector('#modal .ktutb').click());
  const t=await until(()=>KTUT.on&&!!document.getElementById('ktut')&&!document.getElementById('ktut').hidden&&KTUT.step===0&&document.getElementById('modal').hidden,6000);
  if(t)okO++;else badO.push({i,why:'Thiết lập replay did not start within 6s',s:await state()});
  await p.evaluate(()=>{const k=document.querySelector('#ktut [data-ktut=skip]');if(k)k.click()});await until(()=>!KTUT.on,3000);await p.evaluate(()=>{KTUT.rec.tour='done';KTUT.replay=false});await p.waitForTimeout(300)}
 /* old save: a slot that already holds the stale menu card loads clean, a real pending event stays */
 const oldQ=await p.evaluate(()=>{const d=ser();d.P=[{t:"Cung Tường Mộng",h:"",cls:"kptitle kpthome kpscene"},{t:"Việc thật",h:"<p>x</p>",cls:"",btn:"Đã hiểu"}];deser(JSON.parse(JSON.stringify(d)));return Q.map(m=>m.t)});
 const oldOk=JSON.stringify(oldQ)==='["Việc thật"]';if(!oldOk)bad.push({why:'old save kept the menu card',oldQ});
 console.log(JSON.stringify({W,H,N,ok,bad,okO,badO,oldOk,errs}));await b.close();process.exit(ok===N&&okO===(+process.env.OPT_N||0)&&!errs.length?0:1)})();
