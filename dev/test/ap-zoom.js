/* zoom shots of the face layers on her stage figure and her tall portrait. usage: node ap-zoom.js url WxH@dpr outdir */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,SZ,OUT]=process.argv;const [WH,DPR]=(SZ||'1180x820@2').split('@');const [W,H]=WH.split('x').map(Number);fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch({args:['--disable-dev-shm-usage']});const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+(DPR||2),serviceWorkers:'block',reducedMotion:'reduce'});
 const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await p.waitForTimeout(2500);await p.addStyleTag({content:'#kroul,#kroulw{display:none!important}'});
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;window.__forceOrigin='tt';document.getElementById('title').hidden=true;start()});
 await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.name&&S.known);await p.waitForTimeout(5000);
 await p.evaluate(()=>{document.querySelectorAll('#kroul,#kroulw').forEach(e=>e.remove());Q.length=0;document.getElementById('modal').hidden=true;render()});
 const conds={none:()=>{},ill3:()=>{S.sick=3;S.suc=80},poison:()=>pzGive(S,2,'t',null),slap:()=>slapGive(S,rivals[0],''),rash1:()=>rashGive(S,1,'t'),rash2:()=>rashGive(S,2,'t'),rash3:()=>rashGive(S,3,'t'),rashveil:()=>{rashGive(S,3,'t');const k=vlKey(Math.min(8,wdPOf(S)),2);S.inv.push({k,src:'cu'});vlWear(S,S.inv.length-1)}};
 for(const [n,fn] of Object.entries(conds)){await p.evaluate(fn=>{S.sick=0;S.pz=null;S.slap=null;S.pen=null;S.rash=null;if(S.vl)vlOff(S);new Function('return '+fn)()();render()},fn.toString());
  await p.waitForFunction(()=>[...document.querySelectorAll('#stage img')].every(i=>i.complete),null,{timeout:60000}).catch(()=>{});await p.waitForTimeout(1500);
  const box=await p.evaluate(()=>{const i=document.querySelector('.kfxf');const r=(i||document.querySelector('#stage')).getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height,n:document.querySelectorAll('.kfxf').length}});
  const clip={x:Math.max(0,box.x+box.w*.1),y:Math.max(0,box.y),width:Math.min(W,box.w*.8),height:Math.min(H,box.h*.30)};
  await p.screenshot({path:`${OUT}/z-${n}.jpg`,type:'jpeg',quality:80,clip});console.log(n,JSON.stringify(box))}
 console.log('errs',errs);await b.close()})().catch(e=>{console.error(e);process.exit(1)});
