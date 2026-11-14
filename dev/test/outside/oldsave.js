// Old save -> new build: node dev/test/outside/oldsave.js  (old = repo-root index.html = the published main build; new = zz-test.html)
const {chromium}=require('playwright');const path=require('path');const fs=require('fs');
const ROOT=path.resolve(__dirname,'../../..');
async function serve(c){await c.route('http://game.local/**',r=>{const u=decodeURIComponent(new URL(r.request().url()).pathname);const f=path.join(ROOT,u);if(!f.startsWith(ROOT)||!fs.existsSync(f)||fs.statSync(f).isDirectory())return r.fulfill({status:404,body:''});r.fulfill({status:200,body:fs.readFileSync(f),contentType:/\.html$/.test(f)?'text/html':/\.json$/.test(f)?'application/json':/\.js$/.test(f)?'text/javascript':'image/webp'})})}
(async()=>{const b=await chromium.launch();const out={};
 const c=await b.newContext({viewport:{width:686,height:880},deviceScaleFactor:1,serviceWorkers:'block'});await serve(c);const p=await c.newPage();const e1=[];p.on('pageerror',e=>e1.push(e.message));
 await p.goto('http://game.local/index.html',{waitUntil:'domcontentloaded'});await p.waitForTimeout(2000);await p.evaluate(()=>localStorage.clear());await p.reload({waitUntil:'domcontentloaded'});await p.waitForTimeout(2000);
 await p.evaluate(()=>document.querySelector('#slots button[data-new="1"]').click());await p.waitForTimeout(1500);
 await p.evaluate(()=>{try{nlAccept()}catch(e){}for(let k=0;k<20&&Q.length;k++)closeModal();for(let i=0;i<5;i++){for(let k=0;k<20&&Q.length;k++)closeModal();nextBuoi()}for(let k=0;k<20&&Q.length;k++)closeModal();save()});
 out.old=await p.evaluate(()=>S.name+' '+S.turn+'/'+S.tuan+'/'+S.buoi);const st=await p.evaluate(()=>{const o={};for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);o[k]=localStorage.getItem(k)}return o});await c.close();
 for(const [W,H,D] of [[686,880,2.2],[1180,820,2]]){const c2=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:D,serviceWorkers:'block'});await serve(c2);
  await c2.addInitScript(o=>{if(!sessionStorage.getItem('x')){sessionStorage.setItem('x',1);localStorage.clear();for(const k in o)localStorage.setItem(k,o[k])}},st);
  const q=await c2.newPage();const e2=[];q.on('pageerror',e=>e2.push(e.message));await q.goto('http://game.local/zz-test.html',{waitUntil:'domcontentloaded'});await q.waitForTimeout(2500);
  const ok=await q.evaluate(()=>{const bt=document.querySelector('#slots button[data-load]');if(!bt)return'no slot';bt.click();return'clicked'});await q.waitForTimeout(1500);
  out[`${W}x${H}`]={ok,loaded:await q.evaluate(()=>S&&!S.dead?S.name+' '+S.turn+'/'+S.tuan+'/'+S.buoi+' kc:'+!!S.kc:'none'),errs:e2.slice(0,5)};
  await q.evaluate(()=>{for(let k=0;k<20&&Q.length;k++)closeModal();nextBuoi();nextBuoi()});await q.waitForTimeout(500);out[`${W}x${H}`].after=await q.evaluate(()=>S.turn+'/'+S.tuan+'/'+S.buoi);out[`${W}x${H}`].errs2=e2.slice(0,5);await c2.close()}
 out.oldErrs=e1.slice(0,5);console.log(JSON.stringify(out,null,1));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
