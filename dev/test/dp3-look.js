/* dialog-person-3 LOOK: open named dialogs on Fold 755x1000 + iPad 1180x820 and shoot them (scratch dir only).
   usage: node dev/test/dp3-look.js file://…/index.html <outdir> '(i)=>{…}' opener run in page for i<N> [N] */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,OUT,OPEN,NN]=process.argv;const N=+(NN||1);fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch();
 for(const [W,H,tag] of [[755,1000,'fold'],[1180,820,'ipad']]){
  const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:1,reducedMotion:'no-preference',serviceWorkers:'block'});
  const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await p.route(u=>/^https?:/.test(u.href)&&!/ctm-img/.test(u.href),r=>r.abort());
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await p.waitForTimeout(4500);
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{kbootDone()}catch(e){}document.querySelectorAll('#kboot,.kboot').forEach(x=>x.remove());try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;try{girlChestShow=function(){};window.girlChestShow=girlChestShow;kitReward=function(){};window.kitReward=kitReward}catch(e){}window.__nlInner=1;let g=0;do{start();g++}while(isSrv()&&g<30);window.__nlInner=0;Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true;try{NLP=null}catch(e){}render()});
  await p.waitForTimeout(1500);
  for(let i=0;i<N;i++){
   const r=await p.evaluate(([o,i])=>{Q.length=0;try{const r=eval("("+o+")")(i);showModal();return String(r)}catch(e){return "ERR "+e.message}},[OPEN,i]);console.log(tag,i,r);
   await p.waitForTimeout(1500);await p.evaluate(()=>document.querySelectorAll('#klife,.klife').forEach(x=>x.remove()));await p.waitForTimeout(400);
   await p.screenshot({path:`${OUT}/${tag}-${i}.png`});}
  console.log(tag,'errs',errs.length?errs.join(' | '):'none');await ctx.close()}
 await b.close()})();
