/* KK63 K-HAND-MAT probe: open a PEND-style option modal (servant bribe card) and dump every option's rows as the player sees them.
   usage: node dev/test/kit-hand-rows.js <index.html> <outdir> [WxH@dpr,...] */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');const [,,FILE,OUT,SIZES]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();
 for(const sz of (SIZES||"755x1000@1,1180x820@1").split(",")){const [wh,dpr]=sz.split("@");const [W,H]=wh.split("x").map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+dpr,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});
  const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await p.goto('file://'+path.resolve(FILE),{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof render==='function');await sleep(2500);
  await p.addStyleTag({content:'#kroul,#kroulw,.klife,#curtain{display:none!important}'});
  const r=await p.evaluate(()=>{document.querySelectorAll('#kload,.klife,#curtain').forEach(e=>e.remove());SLOT=3;document.getElementById('title').hidden=true;
   for(let i=0;i<400;i++){try{nlNew()}catch(e){}start();if(isSrv())break}Q.length=0;document.getElementById('modal').hidden=true;
   if(!isSrv())return 'no srv';const m=srvM();const v=rivals.find(x=>x.alive&&x!==m);
   Q.length=0;document.querySelectorAll('.klife,#curtain,.kload').forEach(e=>e.remove());pushModal({t:'<p>probe</p>',who:pv(v),opts:cnvPend(S,cnvBribeOpts(S,v,m,BAL.coopBribe.pay))});showModal();document.querySelectorAll('.klife,#curtain').forEach(e=>e.remove());return document.getElementById('modal').className+' ok:'+document.getElementById('modal').innerHTML.length+':'+document.getElementById('modal').innerText.slice(0,600)});
  await p.evaluate(()=>{document.querySelectorAll('#kroulw,.klife,#curtain').forEach(e=>e.remove());document.body.classList.remove('kscn-on')});await sleep(1500);
  console.log(await p.evaluate(()=>{const o=[...document.querySelectorAll('body *')].filter(e=>e.children.length<4&&/Luân hồi/.test(e.textContent)).map(e=>e.tagName+'#'+e.id+'.'+e.className+' parent '+(e.parentElement&&e.parentElement.id+'.'+e.parentElement.className)).slice(0,4);const M=document.getElementById('modal');const ch=[];let e=M.querySelector('button.kopt');while(e){const cs=getComputedStyle(e);if(cs.display==='none'||cs.visibility==='hidden'||e.hidden)ch.push(e.tagName+'#'+e.id+'.'+e.className+' '+cs.display+'/'+cs.visibility);e=e.parentElement}return JSON.stringify({ch,o,btn:[...M.querySelectorAll('button')].map(b=>b.className+' | '+b.textContent.slice(0,40))})}));
  const d=await p.evaluate(()=>{const M=document.getElementById('modal');return [...M.querySelectorAll('button.ka')].filter(x=>x.offsetParent).map(c=>({n:(c.querySelector('.kan,b')||c).textContent.trim().slice(0,40),
   rows:[...c.querySelectorAll('.kr')].map(r=>({cls:r.className,vis:!!r.offsetParent&&getComputedStyle(r).display!=='none',t:r.textContent.replace(/\s+/g,' ').trim().slice(0,160)}))}))});
  console.log(sz,r,JSON.stringify(d,null,1));await p.screenshot({path:`${OUT}/modal-${W}.png`});
  // click first option
  await sleep(3000);const btn=await p.$('#modal button.kopt');if(btn){await btn.click({force:true});await sleep(1500);await p.screenshot({path:`${OUT}/tap-${W}.png`});
   const h=await p.evaluate(()=>{const vis=[...document.querySelectorAll('body *')].filter(e=>e.getClientRects().length&&/ĐƯỢC|Được/.test(e.textContent)&&e.children.length>=1&&e.children.length<12).map(e=>e.tagName+'#'+e.id+'.'+e.className+' :: '+e.innerText.replace(/\s+/g,' ').slice(0,300));const z=document.querySelector('.khplate');const el=z&&z.querySelector('.kr-kem');const hits=[];if(el){for(const sh of document.styleSheets){let rs;try{rs=sh.cssRules}catch(e){continue}const walk=L=>{for(const r of L){if(r.cssRules&&!r.selectorText)walk(r.cssRules);else if(r.selectorText&&r.style&&r.style.display==='none'){try{if(el.matches(r.selectorText))hits.push(r.selectorText.slice(0,300))}catch(e){}}}};walk(rs)}}return {hits,vis:vis.slice(-2),rows:z?[...z.querySelectorAll('.kr')].map(r=>r.className+' disp='+getComputedStyle(r).display+' :: '+r.textContent.slice(0,90)):null}});console.log('after tap',JSON.stringify(h,null,1))}
  console.log('errs',errs);await ctx.close()}
 await b.close()})();
