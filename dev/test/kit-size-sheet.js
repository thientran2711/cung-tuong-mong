/* kit-size-sheet.js — renders the KIT SIZE sample sheets (jksize.js kitSizeSheet) at one design size and full-page screenshots them.
   usage: node dev/test/kit-size-sheet.js "<url>/index.html" <W>x<H> <outdir> [areas=frames,buttons,long] [inject=dev/build/jksize.js]
   Prints per frame: wanted size vs picked size, frame w/h, empty px under the right column, figure aspect error, picture distortions. */
const {chromium}=require('playwright');const fs=require('fs');
const [,,URL,SZ,OUT,AS='frames,buttons,long',INJ]=process.argv;const [W,H]=SZ.split('x').map(Number);
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+(process.env.DPR||2),reducedMotion:'reduce',serviceWorkers:'block'});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(URL+(URL.includes('?')?'&':'?')+'khost=0',{waitUntil:'domcontentloaded'});
 await p.waitForFunction(()=>typeof start==='function',null,{timeout:60000});await p.waitForTimeout(2500);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){start();if(!isSrv())break}});
 for(let i=0;i<40;i++){const st=await p.evaluate(()=>{const k=document.getElementById('kroul');if(k){const b=[...k.querySelectorAll('button')].find(b=>/Bỏ qua/.test(b.textContent));if(b)b.click();return 'r'}return document.getElementById('kroulw')?'w':'n'});if(st==='n'&&i>4)break;await p.waitForTimeout(700)}
 await p.evaluate(()=>{try{nlAccept(true)}catch(e){}});await p.waitForTimeout(2500);
 await p.addStyleTag({content:'#krottip{display:none!important}'});if(INJ)await p.addScriptTag({content:fs.readFileSync(INJ,'utf8')});
 if(W<H)await p.evaluate(()=>{document.documentElement.classList.remove('kv2');document.documentElement.classList.add('kv1')});
 const out={};
 for(const a of AS.split(',')){await p.evaluate(a=>{document.querySelectorAll('.kmov,#kroul,#kroulw,#krottip').forEach(e=>e.remove());kitSizeSheet(a)},a);await p.waitForTimeout(4000);
  await p.evaluate(()=>document.querySelectorAll('#kszsheet .kszf.kpanel').forEach(f=>kitFrameApply(f)));await p.waitForTimeout(600);
  out[a]=await p.evaluate(()=>[...document.querySelectorAll('#kszsheet .kszf.kpanel')].map(f=>{const q=f.getBoundingClientRect(),R=f.querySelector('.kszright'),Bd=f.querySelector('.kszbody');
   const rb=R?Math.max(...[...R.children].map(c=>c.getBoundingClientRect().bottom)):0;const fig=f.querySelector('.kszfig img');let fe=null;if(fig&&fig.naturalWidth){const r=fig.getBoundingClientRect();fe=+((r.width/r.height)/(fig.naturalWidth/fig.naturalHeight)).toFixed(3)}
   const fb=f.querySelector('.kszfig')?f.querySelector('.kszfig').getBoundingClientRect().bottom:0;
   const pics=[...f.querySelectorAll('.ksart img')].filter(i=>i.naturalWidth).map(i=>getComputedStyle(i).objectFit);
   return{want:f.parentElement.dataset.want,got:f.dataset.ksz,w:q.width|0,h:q.height|0,emptyRight:Bd?Math.max(0,(Bd.getBoundingClientRect().bottom-12-rb)|0):0,emptyFig:fb?Math.max(0,(Bd.getBoundingClientRect().bottom-12-fb)|0):null,figAspectErr:fe,picFits:pics,scrolls:R?R.scrollHeight>R.clientHeight+1:false}}));
  const h=await p.evaluate(()=>document.getElementById('kszsheet').scrollHeight);
  await p.evaluate(h=>{const s=document.getElementById('kszsheet');s.style.position='absolute';s.style.height=h+'px';document.body.style.height=h+'px'},h);
  await p.setViewportSize({width:W,height:Math.min(h+30,6000)});await p.waitForTimeout(800);
  await p.screenshot({path:`${OUT}/sample-${a}-${process.env.TAGSZ||(W+'x'+H)}.jpg`,type:'jpeg',quality:80,fullPage:true});await p.setViewportSize({width:W,height:H});await p.evaluate(()=>{document.body.style.height=''})}
 console.log(JSON.stringify({W,H,out,errs}));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
