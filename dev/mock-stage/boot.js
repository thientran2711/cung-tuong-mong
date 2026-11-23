// shared boot for mock-stage probes: opens the real game (local build of origin/main) into a playing state
const {chromium}=require('playwright');
const ROOT=process.env.MKROOT||'/home/user/cung-tuong-mong';const fs=require('fs'),path=require('path');
const MT={'.html':'text/html; charset=utf-8','.js':'application/javascript','.css':'text/css','.json':'application/json','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.mp3':'audio/mpeg','.ogg':'audio/ogg','.webmanifest':'application/manifest+json','.woff2':'font/woff2'};
async function boot(b,W,H,dpr,extra){
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:dpr||1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',...(extra||{})});
  await ctx.route('http://localhost:8811/**',r=>{const u=new URL(r.request().url());const f=path.join(ROOT,decodeURIComponent(u.pathname));if(!f.startsWith(ROOT)||!fs.existsSync(f)||fs.statSync(f).isDirectory())return r.fulfill({status:404,body:''});return r.fulfill({status:200,contentType:MT[path.extname(f)]||'application/octet-stream',body:fs.readFileSync(f)})});
  await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
  const p=await ctx.newPage();p.setDefaultTimeout(240000);p.errs=[];p.on('pageerror',e=>p.errs.push(e.message.slice(0,200)));
  await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
  await p.goto('http://localhost:8811/index.html',{waitUntil:'domcontentloaded'});
  await p.waitForFunction(()=>typeof start==='function'&&window.kitFocus,null,{timeout:240000});await p.waitForTimeout(2000);
  await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}
   Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;for(let i=0;i<5;i++){try{nextBuoi()}catch(e){}Q.length=0}
   Q.length=0;m.hidden=true;const w=document.getElementById('dawn');if(w){w.hidden=true;w.innerHTML='';w.classList.remove('on')}document.body.classList.remove('kbk-open');tab='act';render()});
  await p.waitForTimeout(2500);await p.addStyleTag({content:'#kload,#klife,.modal.kload,#modal.kptitle,#dawn,.kne,#kneov{display:none!important}'});
  await p.evaluate(()=>{for(const b of document.querySelectorAll('button'))if(/Vào cung ngay/.test(b.textContent)&&b.offsetParent)b.click()});await p.waitForTimeout(1500);
  for(let i=0;i<6;i++){await p.evaluate(()=>{document.querySelectorAll('.kmend').forEach(b=>b.click());try{kmReset()}catch(e){}document.querySelectorAll('.kne,#kneov,.kmstage').forEach(e=>e.remove());Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true});await p.waitForTimeout(400)}
  return {ctx,p};
}
async function settle(p){await p.waitForTimeout(800);await p.waitForFunction(()=>[...document.images].filter(i=>i.offsetParent&&i.getBoundingClientRect().width>30).every(i=>i.complete),null,{timeout:20000}).catch(()=>{});await p.waitForTimeout(600)}
module.exports={boot,settle,chromium};
