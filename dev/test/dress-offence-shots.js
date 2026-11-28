/* review/dress-offence shots: the person card (Phi tần tab) of a consort the player has SEEN — 7-cell wear row (6 slots + follow pet),
   red "Vượt phẩm" corner tag, "Xa xỉ N / M" label — the Hại nặng group with Tố vượt phẩm / Tố xa xỉ, then the Tố xa xỉ result.
   usage: CTM_CURL_CDN=1 node dev/test/dress-offence-shots.js <url-or-file> <outdir> [WxH,...]   (dpr 2) */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs');const cp=require('child_process');const path=require('path');
const [,,U,OUT,SIZES]=process.argv;const URL=/^(https?|file):/.test(U)?U:'file://'+path.resolve(U);fs.mkdirSync(OUT,{recursive:true});const cdn={};
(async()=>{const b=await chromium.launch();
 for(const wh of (SIZES||"755x1000,1180x820").split(",")){const [W,H]=wh.split("x").map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:2,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});
  if(process.env.CTM_CURL_CDN)await ctx.route(/ctm-img\.victoria-tntt\.workers\.dev/,r=>{const u=r.request().url();try{if(!cdn[u])cdn[u]=cp.execFileSync('curl',['-sSf','-m','30',u],{maxBuffer:60e6});r.fulfill({status:200,body:cdn[u],contentType:u.endsWith('.json')?'application/json':'image/webp',headers:{'access-control-allow-origin':'*'}})}catch(e){r.abort()}});
  await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
  const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));console.error('loading',wh);
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function',null,{timeout:240000});await p.waitForTimeout(1500);
  const info=await p.evaluate(()=>{SLOT=3;save=()=>{};document.getElementById('title').hidden=true;for(let i=0;i<80;i++){try{nlNew()}catch(e){}start();if(typeof isSrv==='function'&&isSrv())continue;try{tab='rv';render();try{k3Shell()}catch(e){}}catch(e){}if(/Phi tần/.test(document.body.innerText))break}
   Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;document.querySelectorAll('.kroul,#kroul,#kroul2').forEach(e=>e.remove());
   const L=rivals.map((v,i)=>[v,i]).filter(([v])=>v.alive&&!v.out&&!v.queen&&rkOf(v)<5);const [v,i]=L[0];npcLearnAll&&0;
   /* she owns and wears: wrist + waist + scent of her rank (lavish), one wrist piece above her rank is swapped in, a follow pet */
   const r=rkOf(v);const by=sl=>Object.keys(IT).filter(k=>IT[k].sl===sl&&IT[k].rk!=null);v.inv=(v.inv||[]).filter(e=>!(e.w&&IT[e.k]&&IT[e.k].sl));
   const top=(sl,lim)=>by(sl).filter(k=>IT[k].rk<=lim).sort((a,b)=>luxVal(b)-luxVal(a))[0];
   const ov=sl=>by(sl).filter(k=>IT[k].rk>r).sort((a,b)=>IT[a].rk-IT[b].rk)[0];const over=ov("wrist")||ov("waist")||ov("scent");const osl=over?IT[over].sl:"";
   for(const k of [over,...["wrist","waist","scent"].filter(sl=>sl!==osl).map(sl=>top(sl,r))])if(k)v.inv.push({k,w:1});
   try{v.pets=[{t:"meomuop",from:"test"}];v.petOn=0}catch(e){}
   S.met=S.met||{};S.met[v.id]=wk();try{k61Meet(v,"đã gặp",3)}catch(e){}dressLook(S,v,"cùng chỗ");PG.rv=i;window.tabGo=t=>{tab=t;try{K3SH.home=false}catch(e){};render();try{k3Shell()}catch(e){}};tabGo('rv');
   const x=luxOf(v);return{name:v.name,rank:r,over,sc:x.sc,bud:x.bud,cause:!!xxCause(S,v),vp:!!wdCause(S,v)}});
  console.error('set',JSON.stringify(info));await p.waitForTimeout(2000);
  await p.evaluate(nm=>{const sn=shortN(nm);const el=[...document.querySelectorAll('.pfaces [data-pi],.pfaces button,.pfaces .pf')].find(e=>e.textContent.trim().endsWith(sn));if(el)el.click()},info.name);await p.waitForTimeout(1500);
  await p.evaluate(()=>{const b=[...document.querySelectorAll('button.pct')].find(b=>/Hại nặng/.test(b.textContent));if(b)b.click()});await p.waitForTimeout(1200);
  await p.evaluate(()=>{const c=document.querySelector('.pc .kwear');if(c)c.scrollIntoView({block:'center'})});await p.waitForTimeout(600);
  await p.screenshot({path:`${OUT}/card-${W}x${H}.png`});
  await p.evaluate(()=>{const b=document.querySelector('button[data-a="xx"]');if(b){b.scrollIntoView({block:'center'})}});await p.waitForTimeout(500);
  await p.screenshot({path:`${OUT}/acts-${W}x${H}.png`});
  await p.evaluate(()=>{const lr=Math.random;Math.random=()=>.001;try{const b=document.querySelector('button[data-a="xx"]');if(b)b.click()}finally{setTimeout(()=>{Math.random=lr},50)}});await p.waitForTimeout(2500);
  await p.screenshot({path:`${OUT}/result-${W}x${H}.png`});
  const ov=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
  console.log(wh,JSON.stringify(info),"hOverflow:",ov,"errors:",errs.length,errs.slice(0,3).join(" | "));await ctx.close()}
 await b.close()})();
