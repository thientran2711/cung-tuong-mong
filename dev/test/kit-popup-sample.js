/* §8 kit page pop-up sample test: opens #kit, taps each data-kpop button, checks the real modal opens (kind, in view, no h-overflow) and the kit page returns on close.
   usage: node dev/test/kit-popup-sample.js "<site url>/index.html?khost=1" <W>x<H> <outdir> */
const {chromium}=require('playwright');
const [,,URL,SZ,OUT]=process.argv;const [WH]=SZ.split('@');const [W,H]=WH.split('x').map(Number);
(async()=>{const b=await chromium.launch({proxy:{server:process.env.HTTPS_PROXY,bypass:'127.0.0.1,localhost'}});const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:2,reducedMotion:'reduce',ignoreHTTPSErrors:true,serviceWorkers:'block'});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));await p.goto(URL,{waitUntil:'domcontentloaded'});
 const fe=await p.waitForSelector('#krotf');const f=await fe.contentFrame();f.page&&0;
 const fr=()=>p.frames().find(x=>/krot=1/.test(x.url()));await p.waitForTimeout(1500);const F=fr();F.on&&0;
 await F.waitForFunction(()=>typeof start==='function');await p.waitForTimeout(2500);
 await F.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){start();if(!isSrv())break}});
 for(let i=0;i<40;i++){const st=await F.evaluate(()=>{const k=document.getElementById('kroul');if(k){const b=[...k.querySelectorAll('button')].find(b=>/Bỏ qua/.test(b.textContent));if(b)b.click();return 'r'}return document.getElementById('kroulw')?'w':'n'});if(st==='n'&&i>4)break;await p.waitForTimeout(700)}
 await F.evaluate(()=>{try{nlAccept(true)}catch(e){}});await p.waitForTimeout(2000);await F.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;kitSamplePage();const s=document.querySelector('#kitpage [data-kit="§8"]');s.scrollIntoView({block:'start'})});
 await p.waitForTimeout(1500);await p.screenshot({path:`${OUT}/kitpage-s8-${W}x${H}.jpg`,type:'jpeg',quality:70});
 const res={};
 for(const k of ['info','rule','event','result','news']){await F.evaluate(k=>document.querySelector(`#kitpage [data-kpop="${k}"]`).click(),k);await p.waitForTimeout(2500);
  res[k]=await F.evaluate(()=>{const M=document.getElementById('modal'),d=M.querySelector('.dlg'),pg=document.getElementById('kitpage');const q=d.getBoundingClientRect();return{modal:!M.hidden,kind:d.dataset.kind,pgHidden:pg.hidden,figs:M.querySelectorAll('.kesimg').length,dlg:[q.left|0,q.top|0,q.width|0,q.height|0],inView:q.left>=0&&q.right<=innerWidth+1&&q.top>=0&&q.bottom<=innerHeight+1,hovf:document.documentElement.scrollWidth>innerWidth+1}});
  if(k==='event'&&W===844)await p.screenshot({path:`${OUT}/kitpage-pop-event-${W}x${H}.jpg`,type:'jpeg',quality:70});
  await F.evaluate(k=>{const o=document.querySelector('#mb .opts button');if(k==='event'&&o)o.click();else closeModal()},k);await p.waitForTimeout(1200);
  res[k].after=await F.evaluate(()=>({modal:!document.getElementById('modal').hidden,pg:!document.getElementById('kitpage').hidden,q:Q.length}))}
 console.log(JSON.stringify({W,H,res,errs}));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
