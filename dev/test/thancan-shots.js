/* review/thancan LOOK shots: her Cung nhân tab, the person card of a trusted maid with the kit group «Thân cận» open
   («Chọn làm cung nữ thân cận» + gain/loss), then the same card after the tap («Thôi làm cung nữ thân cận», title «Cung nữ thân cận»).
   usage: CTM_CURL_CDN=1 node dev/test/thancan-shots.js <url-or-file> <outdir> [WxH,...]   (dpr 2; default Fold 755x1000 + iPad 1180x820) */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs');const cp=require('child_process');const path=require('path');
const [,,U,OUT,SIZES]=process.argv;const URL=/^(https?|file):/.test(U)?U:'file://'+path.resolve(U);fs.mkdirSync(OUT,{recursive:true});const cdn={};
(async()=>{const b=await chromium.launch();
 for(const wh of (SIZES||"755x1000,1180x820").split(",")){const [W,H]=wh.split("x").map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:2,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});
  if(process.env.CTM_CURL_CDN)await ctx.route(/ctm-img\.victoria-tntt\.workers\.dev/,r=>{const u=r.request().url();try{if(!cdn[u])cdn[u]=cp.execFileSync('curl',['-sSf','-m','30',u],{maxBuffer:60e6});r.fulfill({status:200,body:cdn[u],contentType:u.endsWith('.json')?'application/json':'image/webp',headers:{'access-control-allow-origin':'*'}})}catch(e){r.fulfill({status:404,body:''})}});
  await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
  const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function',null,{timeout:240000});await p.waitForTimeout(1500);
  const info=await p.evaluate(()=>{SLOT=3;save=()=>{};document.getElementById('title').hidden=true;for(let i=0;i<80;i++){try{nlNew()}catch(e){}start();if(typeof isSrv==='function'&&isSrv())continue;break}
   Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;document.querySelectorAll('.kroul,#kroul,#kroul2').forEach(e=>e.remove());
   S.bac=Math.max(S.bac,120);/* her personal maid (Đáp ứng keeps no other maid: BAL.promo.cap row 0) */const s=S.maid;s.loyal=82;PG.staff=0;
   window.tabGo=t=>{tab=t;try{K3SH.home=false}catch(e){};render();try{k3Shell()}catch(e){}};tabGo('staff');return{name:s.name}});
  await p.waitForTimeout(2000);await p.evaluate(()=>{Q.length=0;document.querySelectorAll('#kitEdict,.kedict,.kscroll').forEach(e=>e.remove());const m=document.getElementById('modal');if(m)m.hidden=true;PG.staff=0;tabGo('staff')});await p.waitForTimeout(800);
  const openG=async()=>{await p.evaluate(()=>{const b=[...document.querySelectorAll('button.pct')].find(b=>/Thân cận/.test(b.textContent));if(b&&!b.classList.contains('on'))b.click()});await p.waitForTimeout(900);
   await p.evaluate(()=>{const c=document.querySelector('button[data-thcp]');if(c)c.scrollIntoView({block:'center'})});await p.waitForTimeout(500)};
  await openG();await p.screenshot({path:`${OUT}/card-choose-${W}x${H}.png`});
  const st=await p.evaluate(()=>{const c=document.querySelector('button[data-thcp][data-thcon="1"]');const t=c?c.textContent:"";if(c)c.click();return{btn:t,disabled:c?c.disabled:null}});await p.waitForTimeout(1500);
  await p.evaluate(()=>{Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;render();try{k3Shell()}catch(e){}});await p.waitForTimeout(1200);
  await openG();await p.screenshot({path:`${OUT}/card-chosen-${W}x${H}.png`});
  const after=await p.evaluate(()=>({thc:S.thc,log:(S.logs[0]||"").replace(/<[^>]+>/g,""),dismiss:!!document.querySelector('button[data-thcp][data-thcon="0"]')}));
  const ov=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
  console.log(wh,JSON.stringify(info),JSON.stringify(st),JSON.stringify(after),"hOverflow:",ov,"errors:",errs.length,errs.slice(0,3).join(" | "));await ctx.close()}
 await b.close()})();
