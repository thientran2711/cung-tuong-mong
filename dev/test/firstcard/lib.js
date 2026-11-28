/* FIRSTCARD (review/firstcard): shared page opener for the firstcard tests — serves <WT>/dev (default: this worktree) at http://localhost:8813 */
const {chromium}=(require('../lib/bigpage'),require('playwright'));const fs=require('fs'),path=require('path');
const WT=process.env.WT||path.resolve(__dirname,'../../..');const ROOT=path.join(WT,'dev');
async function open(vp,opt){opt=opt||{};const b=opt.browser||await chromium.launch();
 const ctx=await b.newContext(Object.assign({viewport:vp||{width:755,height:1000},deviceScaleFactor:1,serviceWorkers:'block'},opt.ctx||{}));
 await ctx.route('http://localhost:8813/**',r=>{const u=new URL(r.request().url());const f=path.join(ROOT,decodeURIComponent(u.pathname));
  if(!f.startsWith(ROOT)||!fs.existsSync(f)||fs.statSync(f).isDirectory())return r.fulfill({status:404,body:''});
  const ct=f.endsWith('.html')?'text/html; charset=utf-8':f.endsWith('.webp')?'image/webp':f.endsWith('.js')?'text/javascript':f.endsWith('.json')?'application/json':'application/octet-stream';
  return r.fulfill({status:200,contentType:ct,body:fs.readFileSync(f)})});
 const p=await ctx.newPage();p.errs=[];p.on('pageerror',e=>p.errs.push(e.message.slice(0,200)));p.setDefaultTimeout(240000);
 await p.goto('http://localhost:8813/index.html',{waitUntil:'domcontentloaded'});
 await p.waitForFunction(()=>typeof start==='function'&&typeof selxDay==='function',null,{timeout:240000});
 return {b,ctx,p}}
module.exports={open};
