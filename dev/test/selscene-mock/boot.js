/* shared boot for SELSCENE-2 mock: serve the worktree, start a new life, clear queue */
const {chromium}=(require('../lib/bigpage'),require('playwright'));const fs=require('fs'),path=require('path');
const ROOT=require('path').resolve(__dirname,'../../..');
const MT={'.html':'text/html; charset=utf-8','.js':'application/javascript','.css':'text/css','.json':'application/json','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.mp3':'audio/mpeg','.webmanifest':'application/manifest+json','.woff2':'font/woff2'};
async function boot(b,W,H,o={}){const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',recordVideo:o.video?{dir:o.video,size:{width:W,height:H}}:undefined});
 await ctx.route('http://localhost:8812/**',r=>{const u=new URL(r.request().url());const f=path.join(ROOT,decodeURIComponent(u.pathname));if(!f.startsWith(ROOT)||!fs.existsSync(f)||fs.statSync(f).isDirectory())return r.fulfill({status:404,body:''});return r.fulfill({status:200,contentType:MT[path.extname(f)]||'application/octet-stream',body:fs.readFileSync(f)})});
 await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
 const p=await ctx.newPage();p.setDefaultTimeout(240000);p.errs=[];p.on('pageerror',e=>p.errs.push(e.message.slice(0,200)));
 await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
 await p.goto('http://localhost:8812/index.html',{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof kitScene!=='undefined',null,{timeout:240000});await p.waitForTimeout(1500);
 await p.evaluate((ok)=>{SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<80;i++){try{store.set(NL_KEY,null)}catch(e){}start();const k=S.origin&&S.origin.k;if(!ok||ok.includes(k))break}
   Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;for(let i=0;i<5;i++){try{nextBuoi()}catch(e){}Q.length=0}
   Q.length=0;m.hidden=true;const w=document.getElementById('dawn');if(w){w.hidden=true;w.innerHTML='';w.classList.remove('on')}document.body.classList.remove('kbk-open');tab='act';render()},o.origins||null);
 await p.waitForTimeout(2000);await p.addStyleTag({content:'#kload,#klife,.modal.kload,#modal,#dawn,.kne,#kneov{display:none!important}'});
 for(let i=0;i<5;i++){await p.evaluate(()=>{document.querySelectorAll('.kmend').forEach(b=>b.click());try{kmReset()}catch(e){}document.querySelectorAll('.kne,#kneov,.kmstage').forEach(e=>e.remove());Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true});await p.waitForTimeout(300)}
 return {ctx,p}}
module.exports={boot,chromium};
