/* review/care-overlap scan: opens every dialog of the kdper family (person dialog, banner + body) and reports whether the banner and the body overlap.
   usage: node dev/test/care-scan.js <base url> <W>x<H>@dpr <outdir> */
const {chromium}=require('playwright');const fs=require('fs');
const [,,BASE,SZ,OUT]=process.argv;const [WH,DPR]=(SZ||'755x1000@2').split('@');const [W,H]=WH.split('x').map(Number);fs.mkdirSync(OUT,{recursive:true});
const sleep=t=>new Promise(r=>setTimeout(r,t));const prox=process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{};
const fresh=`(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();document.querySelectorAll('.krbox').forEach(e=>e.remove());try{localStorage.clear()}catch(e){}
 SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<400;i++){start();if(!isSrv())break}Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true;try{NLP=null}catch(e){}
 const kr=document.getElementById('kroul');if(kr)kr.remove();const dw=document.getElementById('dawn');if(dw)dw.remove();document.body.classList.remove('kbk-open');window.kmPush=function(){};document.querySelectorAll('.kmov').forEach(e=>e.remove());render()})()`;
const probe=()=>{const R=e=>e.getBoundingClientRect();const mb=document.getElementById('mb'),d=document.querySelector('#modal .dlg');if(!mb||!d||document.getElementById('modal').hidden)return{open:false};
 const ban=mb.querySelector(':scope > .kdlgart'),body=[...mb.querySelectorAll(':scope > .kpb > .kpmain, :scope > .kpb > #kpcare, :scope > .kdpr:not(.kdlgart), :scope > .opts')];
 const rb=ban?R(ban):null;const ov=[];if(rb)body.forEach(e=>{const r=R(e);if(r.height>0&&r.top<rb.bottom-2&&r.bottom>rb.top+2&&r.left<rb.right&&r.right>rb.left){const ch=[...e.children].find(c=>{const q=R(c);return q.height>0&&q.top<rb.bottom-2&&q.bottom>rb.top+2});ov.push((e.className||e.id)+'>'+(ch?String(ch.className).slice(0,24):'-'))}});
 const km=mb.querySelector(':scope > .kpb > .kpmain');const kc=km&&getComputedStyle(km);return{open:true,scroll:km&&{oy:kc.overflowY,ch:km.clientHeight,sh:km.scrollHeight,pad:kc.paddingBottom},title:(d.querySelector('.kptitle')||{}).textContent||'',cls:d.className.slice(0,70),banner:!!ban,ban:rb&&[Math.round(rb.top),Math.round(rb.bottom)],overlap:ov,rows:getComputedStyle(mb).gridTemplateRows}};
(async()=>{const b=await chromium.launch(prox);const errs=[];
 const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+(DPR||1),hasTouch:true,isMobile:W<1100,reducedMotion:'reduce',serviceWorkers:'block',ignoreHTTPSErrors:true});
 const p=await ctx.newPage();p.setDefaultTimeout(240000);p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.addInitScript(()=>{window.__nlInner=1;addEventListener('DOMContentLoaded',()=>{const s=document.createElement('style');s.textContent='#kroul,#kload,.krbox{display:none!important}';document.head.appendChild(s)})});
 await p.route(/ctmload=1/,r=>r.abort());await p.goto(BASE+'/index.html',{waitUntil:'domcontentloaded'});
 await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await sleep(2000);
 await p.evaluate(fresh);await sleep(800);
 const clean=()=>p.evaluate(()=>{Q.length=0;document.querySelectorAll('.kmov').forEach(e=>e.remove());const m=document.getElementById('modal');m.hidden=true;S.petTip=1});
 const shot=async n=>{await p.evaluate(()=>Promise.all([...document.querySelectorAll('#modal img')].map(i=>i.complete?0:new Promise(r=>{i.onload=i.onerror=r;setTimeout(r,6000)}))));await sleep(400);await p.screenshot({path:`${OUT}/${n}-${WH}.jpg`,type:'jpeg',quality:60})};
 const R=[];const T=process.env.CASES?process.env.CASES.split(','):null;
 const cases=require('./care-cases.js');
 for(const c of cases){if(T&&!T.includes(c.id))continue;
  await clean();try{await p.evaluate(c.setup);await sleep(1500);await p.evaluate(()=>{document.querySelectorAll('.kmov').forEach(e=>e.remove())});await sleep(300);const r=await p.evaluate(probe);r.id=c.id;R.push(r);await shot(c.id)}catch(e){R.push({id:c.id,err:e.message.slice(0,150)})}}
 console.log(JSON.stringify(R,null,1));console.error('page errors',errs.length,errs.slice(0,3));await b.close()})();
