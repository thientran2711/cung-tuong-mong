/* SELSCENE-6 shot driver for the selection scenes (owner mock): node dev/test/selx-mock.js <worktree> <outdir OUTSIDE git> [scale 1|2] [rooms,hall,drama,result,map]; serves dev/ via page.route (local http.server is blocked), CDN images pass through; shots never in git (OD:L203) */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs'),path=require('path');
const WT=process.argv[2],OUT=process.argv[3],SCALE=+(process.argv[4]||1),ONLY=process.argv[5]||'';const ROOT=path.join(WT,'dev');fs.mkdirSync(OUT,{recursive:true});
const DEV={fold:{width:755,height:1000},ipad:{width:1180,height:820}};
/* plan: [scene, setup js (returns after starting the scene), [[taps before shot, label, extra wait ms]]] */
const PLANS=[
 ['rooms',`Q.shift();selxD1Rooms()`,[[0,'ma-typing',350],[2,'call1',500],[11,'room1-sum',700],[13,'room2-call1',900],[23,'room3-call1',900],['Ai về sở','end',1500]]],
 ['hall',`S.selx2.days=2;selxHall()`,[[0,'think-E',500],[2,'think-T',500],[4,'think-H',500],[6,'tq',500],[8,'call1',500],[10,'call2',500],[14,'call4',700]]],
 ['drama',`selxDramaShot()`,[[0,'l0',600],[2,'l1',600],[4,'l2',600],[6,'l3',600]]],
 ['result',`selxResultShot()`,[[0,'call1',600],[2,'call2',700],[4,'call3',700],[9,'round2',700],[30,'mine',900],[31,'mine2',900]]],
 ['map',`window.__selxNoSc=1;const close=()=>document.querySelectorAll(".kmov,#kprevov,#kg82").forEach(x=>x.remove());for(let n=0;n<60&&Q.length;n++){const m=Q[0];const nm=(m.opts||[]).map(o=>o.n);const j=nm.indexOf("Ra Dư đồ");if(j>=0){showModal();const bb=document.querySelector('#modal button[data-m="'+j+'"]');bb?bb.click():chooseM(j);break}const c=nm.findIndex(s=>/Cất đồ|Theo|Tập thật kỹ|Quỳ|Nghe/.test(s));if(m.opts)chooseM(c<0?0:c);else closeModal();close()}window.__selxNoSc=0;render()`,[[0,'view',2500]]],
];
(async()=>{const b=await chromium.launch();
 for(const [dn,vp] of Object.entries(DEV)){const ctx=await b.newContext({viewport:vp,deviceScaleFactor:SCALE,serviceWorkers:'block'});
  await ctx.route('http://localhost:8813/**',r=>{const u=new URL(r.request().url());const f=path.join(ROOT,decodeURIComponent(u.pathname));
   if(!f.startsWith(ROOT)||!fs.existsSync(f)||fs.statSync(f).isDirectory())return r.fulfill({status:404,body:''});
   const ct=f.endsWith('.html')?'text/html; charset=utf-8':f.endsWith('.webp')?'image/webp':f.endsWith('.js')?'text/javascript':f.endsWith('.json')?'application/json':'application/octet-stream';
   return r.fulfill({status:200,contentType:ct,body:fs.readFileSync(f)})});
  /* CDN images → local dev/img when present, else let it fail silently */
  await ctx.route(/^https?:\/\/(?!localhost)/,async r=>{const u=new URL(r.request().url());const m=u.pathname.match(/\/(img\/.*)$/);if(m){const f=path.join(ROOT,m[1]);if(fs.existsSync(f))return r.fulfill({status:200,contentType:'image/webp',body:fs.readFileSync(f)})}return r.continue().catch(()=>{})});
  const p=await ctx.newPage();await p.addInitScript(()=>{document.addEventListener('DOMContentLoaded',()=>{const st=document.createElement('style');st.textContent='#kroul,#kroulw,.kroul,#klife,#title,.dawn,#kdaytc{display:none!important}';document.head.appendChild(st)})});p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await p.goto('http://localhost:8813/index.html',{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof selxScRooms==='function',null,{timeout:240000});
  await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;try{store.set(NL_KEY,null)}catch(e){}start()});await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.origin,null,{timeout:60000});
  for(const [nm,setup,shots] of PLANS){if(ONLY&&!ONLY.split(',').includes(nm))continue;
   await p.evaluate(()=>{SLOT=3;const t=document.getElementById('title');if(t)t.hidden=true;for(let i=0;i<600;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(S&&S.origin&&S.origin.k==="tt")break}S.kcPick="cung";nlAccept();
    document.querySelectorAll('.kbd,#klife,#kroulw,#title,.dawn').forEach(x=>x.remove());try{renderHUD()}catch(e){}
    window.selxDramaShot=()=>{const Z=S.selx2;const L=selxAll();const A=L[0],B=L[1];SELX_CUR={c:{bully:A,victim:B},her:false,type:"yard",intro:`${A.name} giật lấy chiếc trâm: «Trâm này vốn của ta, ngươi nhặt ở đâu?» ${B.name} đỏ mặt: «Tỷ tỷ nhầm rồi, là mẫu thân muội cho.» «Nói dối! Hôm qua ta còn cài nó.» «Tỷ không tin thì hỏi ma ma.»`};selxScDrama()};
    window.selxResultShot=()=>{const L=[S,...selxAll()].map((v,i)=>({v,kept:i<4}));selxScResult(L)}});
   await p.waitForTimeout(300);await p.evaluate(setup);await p.waitForTimeout(4500);let tapped=0;
   for(const [n,lab,w] of shots){if(typeof n==='string'){for(let k=0;k<120;k++){const hit=await p.evaluate(re=>{const b=document.querySelector('.kscn .kdv-box');return !!b&&new RegExp(re).test(b.textContent)},n);if(hit)break;const has=await p.evaluate(()=>{const L=document.querySelector('.kscn');if(!L)return false;L.click();return true});if(!has)break;await p.waitForTimeout(160)}}
    else while(tapped<n){const has=await p.evaluate(()=>{const L=document.querySelector('.kscn');if(!L)return false;L.click();return true});tapped++;await p.waitForTimeout(has?160:20)}
    await p.waitForTimeout(w||400);await p.screenshot({path:path.join(OUT,`${dn}-${nm}-${lab}.png`)})}
   for(let i=0;i<80;i++){const has=await p.evaluate(()=>{const L=document.querySelector('.kscn');if(!L)return false;L.click();return true});if(!has)break;await p.waitForTimeout(60)}
  }
  console.log(dn,'errors',errs.length,errs.slice(0,3));await ctx.close()}
 await b.close()})();
