/* dialog-person-3: open EVERY PEND builder, shoot the frames whose title matches RE (Fold 755x1000 + iPad 1180x820), list titles. usage: node dp3-sweep-look.js <index.html url> <outdir> <RE> [max] */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,OUT,RE,MX]=process.argv;fs.mkdirSync(OUT,{recursive:true});const MAX=+(MX||12);
(async()=>{const b=await chromium.launch();
 for(const [W,H,tag] of [[755,1000,'fold'],[1180,820,'ipad']]){
  const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:1,reducedMotion:'reduce',serviceWorkers:'block'});
  const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await p.route(u=>/^https?:/.test(u.href)&&!/ctm-img/.test(u.href),r=>r.abort());
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await p.waitForTimeout(4500);
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{kbootDone()}catch(e){}document.querySelectorAll('#kboot,.kboot').forEach(x=>x.remove());try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;try{girlChestShow=function(){};window.girlChestShow=girlChestShow;kitReward=function(){};window.kitReward=kitReward}catch(e){}window.__nlInner=1;let g=0;do{start();g++}while(isSrv()&&g<30);window.__nlInner=0;Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true;try{NLP=null}catch(e){}render();try{S.inv.push({k:"tramngoc",from:"me"})}catch(e){}});
  await p.waitForTimeout(1500);
  const ids=await p.evaluate(()=>Object.keys(PEND));let shot=0;const seen=new Set();
  for(const id of ids){if(MAX&&shot>=MAX)break;
   const t=await p.evaluate(async(id)=>{const R0=liveRivals(true);const v=R0[0];const iix=S.inv.findIndex(e=>e&&e.k==="tramngoc");let res=null;
    for(const pp of [{v:v&&v.id,ix:iix},{ix:iix},{v:v&&v.id},{}]){let d=null;try{d=PEND[id](Object.assign({},pp))}catch(e){d=null}if(!d||!(d.o||d.t))continue;Q.length=0;document.getElementById('modal').hidden=true;try{pushDil(mkP(id,pp),id);showModal()}catch(e){continue}const T=document.querySelector("#modal .kdh-t,#modal .dlg h2,#modal h2,#modal .kttl");return (T?T.textContent:(Q[0]&&Q[0].t||""))+"";}return null},id);
   if(!t||!new RegExp(RE,'i').test(t+" "+id)||seen.has(t))continue;seen.add(t);
   if(!MAX&&tag==="fold"){console.log(id,"|",t.replace(/<[^>]+>/g,"").slice(0,50));continue}await p.waitForTimeout(1300);await p.evaluate(()=>document.querySelectorAll('#klife,.klife,.kmov').forEach(x=>x.remove()));await p.waitForTimeout(300);
   await p.screenshot({path:`${OUT}/${tag}-${id.replace(/\W/g,'_')}.png`});shot++;console.log(tag,id,'|',t.replace(/<[^>]+>/g,'').slice(0,60))}
  console.log(tag,'errs',errs.length?errs.join(' | '):'none');await ctx.close()}
 await b.close()})();
