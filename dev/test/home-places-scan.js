/* home-places-scan (law 6 real world, OB-PHU3): the home «Danh sách» place list (map list view, home «Dư đồ» both sub-tabs) lists ONLY the places of the road she is on.
   For every home origin: each [data-kcgo] key must carry that road's own prefix (base khuê các road: kc_; kind roads: kc2Pre()), never another road's (dn_ Nhà tranh / Ruộng nhà,
   nn_/nb_/np_ Thọ Xương cung …). usage: node dev/test/home-places-scan.js <url> [WxH] ; exit 1 on a foreign place */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs');const CDN='https://ctm-img.victoria-tntt.workers.dev/';const CACHE=(process.env.MFK_CACHE||'/home/user/wt/mfk-cache')+'/';fs.mkdirSync(CACHE,{recursive:true});
const [,,URL_,SZ]=process.argv;const sl=t=>new Promise(r=>setTimeout(r,t));const ORG=(process.env.ORIGINS||'tt,dtq,muoi,nc,td,ch,thd,cnv').split(',');
(async()=>{const b=await chromium.launch();const [W,H]=(SZ||'1180x820').split('x').map(Number);let fail=0;
 for(const o of ORG){const errs=[];const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});
  await ctx.route(u=>u.href.startsWith(CDN),async r=>{const u=new URL(r.request().url()),c=CACHE+u.pathname.slice(1).replace(/\//g,'__');const ct=u.pathname.endsWith('.json')?'application/json':u.pathname.endsWith('.webp')?'image/webp':'application/octet-stream';
   if(!u.pathname.endsWith('.json')&&fs.existsSync(c))return r.fulfill({status:200,body:fs.readFileSync(c),contentType:ct});
   for(let i=0;i<4;i++){try{const res=await r.fetch();const body=await res.body();if(res.status()===200&&!u.pathname.endsWith('.json'))fs.writeFileSync(c,body);return r.fulfill({status:res.status(),body,contentType:ct})}catch(e){}}return r.abort()});
  const p=await ctx.newPage();p.setDefaultTimeout(120000);p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  await p.goto(URL_,{waitUntil:'domcontentloaded'});await p.addStyleTag({content:'#kroul,#kroulw,.kroul,.kcf,#title,#kload{display:none!important}'});
  await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await sl(2500);
  await p.evaluate(o=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;window.__forceOrigin=o;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){start();if(!isSrv())break}},o);
  for(let i=0;i<15;i++){await sl(400);const s=await p.evaluate(()=>{const s=isSrv();if(s)start();return s});if(!s)break}
  const r=await p.evaluate(o=>{try{S.origin=ORIGINS.find(x=>x.k===o);S.kcPick='nha';Q=[];window.__bot=1;kcInit();delete window.__bot;Q=[];document.getElementById('modal').hidden=true;window.__mapList=1;tab='go';
   const pre=S.kc&&S.kc.kd?kc2Pre():"kc_";const out={};for(const sub of ['phu','kinh']){try{KTSUB.kcgo=sub}catch(e){}render();out[sub]=[...document.querySelectorAll('#panel [data-kcgo]')].map(b=>b.dataset.kcgo)}
   const all=Object.values(out).flat();return{kd:S.kc&&S.kc.kd||'',pre,n:all.length,foreign:all.filter(k=>!k.startsWith(pre))}}catch(e){return{err:String(e)}}},o);
  const bad=r.err||(r.foreign&&r.foreign.length)||!r.n||errs.length;if(bad)fail++;console.log(o,JSON.stringify(r),errs.slice(0,2).join('|'),bad?'FAIL':'ok');await ctx.close()}
 await b.close();console.log(fail?`FAIL ${fail}`:'PASS');process.exit(fail?1:0)})();
