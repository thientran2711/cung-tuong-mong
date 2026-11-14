/* Old save → new build (review/palace-map), then Dư đồ → a palace courtyard → a place courtyard (Ngự hoa viên) → enter.
   usage: node dev/test/palace-oldsave.js <oldIndexHtml> <W>x<H>@dpr <outdir> <tag>
   <oldIndexHtml> = dev/index.html built from the base branch (e.g. origin/review/page-curl), served at /old.html.
   Plays 2 buổi in the old build, saves to slot 3, reloads the NEW build, loads slot 3 from the title, then checks. */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');
const [,,OLD,SZ,OUT,TAG]=process.argv;const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);const ROOT=path.resolve(__dirname,'../..');
const MT={html:'text/html; charset=utf-8',js:'text/javascript',json:'application/json',webp:'image/webp',png:'image/png',jpg:'image/jpeg',mp3:'audio/mpeg',ogg:'audio/ogg',css:'text/css'};
const wrap=f=>'<!doctype html><meta charset=utf-8><meta name=viewport content="width=device-width,initial-scale=1"><base href="/">'+fs.readFileSync(f,'utf8');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:+(DPR||1),reducedMotion:'reduce'});
 await ctx.route('http://t.local/**',r=>{const u=decodeURIComponent(new URL(r.request().url()).pathname);
  if(u==='/old.html')return r.fulfill({status:200,contentType:MT.html,body:wrap(OLD)});
  const f=path.join(ROOT,u);if(!f.startsWith(ROOT)||!fs.existsSync(f)||fs.statSync(f).isDirectory())return r.fulfill({status:404,body:''});
  if(u==='/dev/index.html')return r.fulfill({status:200,contentType:MT.html,body:wrap(f)});
  r.fulfill({status:200,contentType:MT[path.extname(f).slice(1)]||'application/octet-stream',body:fs.readFileSync(f)})});
 const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message));
 const shot=async n=>{await p.waitForTimeout(2500);await p.screenshot({path:`${OUT}/${TAG}-${n}.jpg`,type:'jpeg',quality:82,animations:'disabled'})};
 await p.goto('http://t.local/old.html',{waitUntil:'domcontentloaded'});await p.waitForTimeout(3000);
 const old=await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;
  for(let i=0;i<30;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}
  Q.length=0;for(let i=0;i<2;i++){try{nextBuoi()}catch(e){}Q.length=0}const m=document.getElementById('modal');if(m)m.hidden=true;quiet=false;try{NLP=false}catch(e){}save();
  return {name:S.name,month:S.month,buoi:S.buoi,key:Object.keys(localStorage).filter(k=>/hclh/.test(k))}});
 const oldErrs=errs.splice(0);
 await p.goto('http://t.local/dev/index.html',{waitUntil:'domcontentloaded'});await p.waitForTimeout(3500);
 /* the title's 'Tiếp tục kiếp này' path (j6 data-load): loadSlot → deser → deal → render */
 const how=await p.evaluate(()=>{const b=document.querySelector('#title [data-load="3"]');if(b){b.click();return 'button'}
  const d=loadSlot(3);if(!d)return 'no save';SLOT=3;quiet=true;deser(d);quiet=false;document.getElementById('title').hidden=true;deal();render();return 'code'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;tab='go';render()});
 const loaded=await p.evaluate(how=>({how,name:typeof S!=='undefined'&&S&&S.name,month:typeof S!=='undefined'&&S&&S.month,keys:Object.keys(localStorage)}),how);console.log(JSON.stringify({old,oldErrs,loaded,errs}));if(!loaded.name){await b.close();return}
 await shot('1-map');
 /* a consort palace with a chủ vị */
 const pal=await p.evaluate(()=>{const b=[...document.querySelectorAll('#panel .mspot[data-go^="r"]')][0];if(!b)return null;const k=b.dataset.go;const q0=Q.length,tb=tab;b.click();
  const sp=kpmSplit(k);return {k,q0,tb,q:Q.length&&Q[0].t,open:!!document.querySelector('#panel .kpmv'),img:(document.querySelector('#panel .kpmv .mapimg')||{}).getAttribute&&document.querySelector('#panel .kpmv .mapimg').getAttribute('src'),sum:sp.chinh.n+sp.dong.n+sp.tay.n,countAt:countAt(k)}});
 await shot('2-palace');
 const fit=await p.evaluate(()=>{const v=document.querySelector('#panel .kpmv');if(!v)return null;const r=v.getBoundingClientRect();const rows=[...v.querySelectorAll('.kpm-row')].map(x=>x.getBoundingClientRect());
  const im=v.querySelector('.mapimg').getBoundingClientRect();return {mapv:[r.top|0,r.bottom|0],img:[im.top|0,im.bottom|0,im.width|0],rowsBottom:Math.max(...rows.map(x=>x.bottom))|0,clipped:rows.some(x=>x.bottom>r.bottom+1)||im.bottom>r.bottom+1,ox:document.documentElement.scrollWidth>innerWidth}});
 await p.evaluate(()=>{const b=document.querySelector('#panel [data-kpmback]');if(b)b.click()});await p.waitForTimeout(800);
 /* a place: Ngự hoa viên */
 const place=await p.evaluate(()=>{const b=document.querySelector('#panel .mspot[data-go="vuon"],#panel .mspot[data-ak="vuon"]');if(!b)return null;b.click();const v=document.querySelector('#panel .kpmv');
  return {open:!!v,spots:v?[...v.querySelectorAll('.kpm-spot')].map(x=>x.textContent.trim()):[],countAt:countAt('vuon'),img:v&&v.querySelector('.mapimg').getAttribute('src')}});
 await shot('3-place');
 await p.evaluate(()=>{const s=document.querySelector('#panel .kpm-spot');if(s)s.click()});await p.waitForTimeout(1500);
 await p.evaluate(()=>{if(Q.length){const o=Q[0].opts&&Q[0].opts[0];if(o&&o.go){Q.shift();document.getElementById('modal').hidden=true;o.go()}}});
 await shot('4-place-in');
 const inplace=await p.evaluate(()=>({place:S.place,tab,scimg:document.getElementById('scimg').style.backgroundImage.slice(0,80),title:(document.querySelector('#sc-t .rt1')||{}).textContent,ox:document.documentElement.scrollWidth>innerWidth}));
 console.log(JSON.stringify({TAG,old,oldErrs,loaded,pal,fit,place,inplace,errs},null,1));await b.close()})();
