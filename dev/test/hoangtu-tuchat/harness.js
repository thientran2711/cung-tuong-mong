/* shared harness: serves the worktree's dev/index.html as http://ht.local/, images from the CDN through curl (cached) */
const {chromium}=(require('../lib/bigpage'),require('playwright'));const fs=require('fs');const path=require('path');const cp=require('child_process');
const WT=require('path').resolve(__dirname,'../../..');const CACHE=process.env.CTM_CACHE||require('os').tmpdir()+'/ctm-imgcache';fs.mkdirSync(CACHE,{recursive:true});
const SKIPIMG=!!process.env.SKIPIMG;const CDN='https://ctm-img.victoria-tntt.workers.dev/';
const MIME={html:'text/html; charset=utf-8',js:'text/javascript; charset=utf-8',json:'application/json',webp:'image/webp',png:'image/png',jpg:'image/jpeg',css:'text/css',mp3:'audio/mpeg',ogg:'audio/ogg'};
async function open(W,H,page){const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:1,reducedMotion:'reduce'});
 await ctx.route('**/*',r=>{const u=new URL(r.request().url());if(u.host!=='ht.local')return r.fulfill({status:404,body:''});
  let p=decodeURIComponent(u.pathname);if(p==='/')p='/'+(page||'dev/index.html');
  if(/^\/(img|audio)\//.test(p)){if(/^\/audio/.test(p))return r.fulfill({status:404,body:''});const f=CACHE+'/'+p.replace(/\//g,'_');
   const send=()=>{const d=fs.existsSync(f)?fs.readFileSync(f):Buffer.alloc(0);if(!d.length)return r.fulfill({status:404,body:''});return r.fulfill({status:200,body:d,headers:{'content-type':MIME[p.split('.').pop()]||'application/octet-stream'}})};
   if(fs.existsSync(f))return send();if(SKIPIMG&&!/kit\/|\.json$/.test(p))return r.fulfill({status:404,body:''});
   return new Promise(res=>cp.execFile('curl',['-sSf','--max-time','25','-o',f+'.t',CDN+p.slice(1)],e=>{try{if(!e)fs.renameSync(f+'.t',f);else{try{fs.unlinkSync(f+'.t')}catch(x){}fs.writeFileSync(f,'')}}catch(x){}res(send())}))}
  const f=path.join(WT,p);if(/assets\.json$/.test(f)||!fs.existsSync(f)||fs.statSync(f).isDirectory())return r.fulfill({status:404,body:''});
  r.fulfill({status:200,body:fs.readFileSync(f),headers:{'content-type':MIME[f.split('.').pop()]||'application/octet-stream'}})});
 await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
 const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,300)));
 await p.goto('http://ht.local/',{waitUntil:'domcontentloaded'});await p.waitForTimeout(3500);return {b,ctx,p,errs}}
const clean=p=>p.evaluate(()=>{try{KMQ.length=0}catch(e){}document.querySelectorAll('.kmov').forEach(o=>o.remove());for(let i=0;i<4;i++)document.querySelectorAll('[data-km-close]').forEach(b=>b.click());Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;const w=document.getElementById('dawn');if(w){w.hidden=true;w.innerHTML='';w.classList.remove('on')}document.body.classList.remove('kbk-open');try{render()}catch(e){}});
module.exports={open,clean,WT};
