/* wx.js before|after OUTDIR : stage shots for place × season × buổi × weather (graded scene images from the CDN) */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const [,,WHICH,OUT]=process.argv;const WT='/home/user/cung-tuong-mong/.claude/worktrees/agent-a4e8c6432e582a50a/';
const CDN='https://ctm-img.victoria-tntt.workers.dev/';
const CT={'.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.json':'application/json','.js':'text/javascript; charset=utf-8','.html':'text/html; charset=utf-8','.mp3':'audio/mpeg','.ogg':'audio/ogg'};
const SCN=/^img\/(kinh-su-phong|tu-ninh-cung|thai-y-vien|tam-cung-dem|phi-tan-cung|ngu-thu-phong|ngu-hoa-vien|khon-ninh-cung|duong-tam-dien|lanh-cung)(-|\.)/;
fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:1180,height:820},deviceScaleFactor:1});
 await ctx.route('http://ctm.test/**',async r=>{const p=decodeURIComponent(new URL(r.request().url()).pathname).slice(1);
  if(p===''||p==='index.html')return r.fulfill({status:200,body:fs.readFileSync(WT+`.ahcache/wx/${WHICH}.html`),contentType:CT['.html']});
  if(SCN.test(p)){try{const res=await r.fetch({url:CDN+p});return r.fulfill({response:res})}catch(e){}}
  const f=WT+p;if(fs.existsSync(f))return r.fulfill({status:200,body:fs.readFileSync(f),contentType:CT[path.extname(f)]||'application/octet-stream'});
  return r.fulfill({status:404,body:''})});
 const p=await ctx.newPage();p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto('http://ctm.test/index.html',{waitUntil:'domcontentloaded'});await p.waitForTimeout(4000);
 await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;try{store.set(NL_KEY,null)}catch(e){}start()});await p.waitForTimeout(3000);
 const clean=()=>p.evaluate(()=>{Q.length=0;try{showModal()}catch(e){}for(const e of [...document.body.querySelectorAll('*')]){const cs=getComputedStyle(e);if((cs.position==='fixed')&&/Luân hồi|Tiếp/.test(e.textContent||'')&&!e.closest('#stage'))e.remove()}const k=document.getElementById('kroul');if(k)k.remove();const m=document.getElementById('modal');if(m)m.classList.remove('on')});
 await clean();
 const places=[['home','home'],['dtd','dtd'],['lc','lc']];const months={xuan:4,ha:6,thu:8,dong:11};
 for(const [nm,sc] of places)for(const [se,mo] of Object.entries(months))for(let bu=0;bu<4;bu++){
  const wxs=await p.evaluate(mo=>WX[SEASON[mo-1]],mo);
  for(let wi=0;wi<wxs.length;wi++){
   await p.evaluate(([sc,mo,bu,w])=>{if(sc==='home')S.place='home';else{const pl=places().find(x=>x.sc===sc);if(pl)S.place=pl.k}
     S.month=mo;S.buoi=bu;S.wx={n:w[0],k:w[1],f:w[2]};S.visit={k:S.place,people:[],talked:false};Q.length=0;try{render()}catch(e){}try{lightTick()}catch(e){}},[sc,mo,bu,wxs[wi]]);
   await clean();await p.waitForTimeout(900);
   const st=await p.$('#stage');await st.screenshot({path:`${OUT}/${nm}-${se}-${bu}-${wi}.jpg`,type:'jpeg',quality:80});
  }}
 fs.writeFileSync(`${OUT}/errs.json`,JSON.stringify(errs.slice(0,20)));console.log('done',errs.length);await b.close()})();
