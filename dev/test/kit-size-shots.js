/* kit-size-shots.js — opens each §8 kit pop-up sample (info, rule, event, result, news, long) at one design size,
   screenshots the dialog and measures empty space (frame vs content) + figure fit.
   usage: node dev/test/kit-size-shots.js "<url>/index.html" <W>x<H> <outdir> [tag] [kinds,comma] */
const {chromium}=require('playwright');
const [,,URL,SZ,OUT,TAG='now',KS='info,rule,event,result,news,long']=process.argv;const [W,H]=SZ.split('x').map(Number);
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:2,reducedMotion:'reduce',serviceWorkers:'block'});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(URL+(URL.includes('?')?'&':'?')+'khost=0',{waitUntil:'domcontentloaded'});
 await p.waitForFunction(()=>typeof start==='function',null,{timeout:60000});await p.waitForTimeout(2500);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){start();if(!isSrv())break}});
 for(let i=0;i<40;i++){const st=await p.evaluate(()=>{const k=document.getElementById('kroul');if(k){const b=[...k.querySelectorAll('button')].find(b=>/Bỏ qua/.test(b.textContent));if(b)b.click();return 'r'}return document.getElementById('kroulw')?'w':'n'});if(st==='n'&&i>4)break;await p.waitForTimeout(700)}
 await p.evaluate(()=>{try{nlAccept(true)}catch(e){}});await p.waitForTimeout(2000);
 await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;kitSamplePage()});await p.waitForTimeout(800);
 const res={};
 for(const k of KS.split(',')){await p.evaluate(k=>{document.querySelectorAll('.kmov,#kroul,#kroulw').forEach(e=>e.remove());Q.length=0;kitPopSample(k)},k);await p.waitForTimeout(3500);
  res[k]=await p.evaluate(()=>{const M=document.getElementById('modal'),d=M.querySelector('.dlg');if(!d)return null;const q=d.getBoundingClientRect();
   const mb=d.querySelector('#mb');const last=[...d.querySelectorAll('#mb *')].filter(e=>e.offsetParent&&e.children.length===0).map(e=>e.getBoundingClientRect().bottom);const cb=last.length?Math.max(...last):0;
   const fig=d.querySelector('.kesimg,.kpsubj img');let f=null;if(fig){const r=fig.getBoundingClientRect();f={w:r.width|0,h:r.height|0,nat:[fig.naturalWidth,fig.naturalHeight],ratioErr:fig.naturalWidth?+((r.width/r.height)/(fig.naturalWidth/fig.naturalHeight)).toFixed(3):null}}
   const col=d.querySelector('.kpsubj');const cr=col&&col.getBoundingClientRect();
   return{kind:d.dataset.kind,cls:d.className,dlg:[q.left|0,q.top|0,q.width|0,q.height|0],contentBottom:cb|0,emptyBelow:Math.max(0,(q.bottom-cb)|0),fig:f,col:cr?[cr.width|0,cr.height|0]:null}});
  res[k]&&(res[k].top=await p.evaluate(()=>{const q=document.querySelector('#modal .dlg').getBoundingClientRect();return document.elementsFromPoint(q.left+q.width/2,q.top+q.height/2).slice(0,3).map(e=>e.id+'.'+String(e.className).slice(0,40))}));
  const d=await p.$('#modal .dlg');if(d)await d.screenshot({path:`${OUT}/${TAG}-${k}-${W}x${H}.jpg`,type:'jpeg',quality:72});
  await p.evaluate(()=>{try{closeModal()}catch(e){}Q.length=0;document.getElementById('modal').hidden=true});await p.waitForTimeout(500)}
 console.log(JSON.stringify({W,H,res,errs},null,1));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
