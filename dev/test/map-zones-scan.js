/* map-zones-scan (KIT §85.10, owner 25/11 ~23:45Z «Chữ quá nhiều ... gom lại»): on the palace Dư đồ (day, night, cấm túc) and the home Dư đồ:
   (0) every tag = name + at most ONE short count «N bóng» (her place / empty palaces / Ngoại triều excepted); no «cấm túc» / «khắc» on other tags;
   (1) zone members hidden under a visible zone tag; zone total = Σ members (countAt); (2) zone tap → zoom view: members visible, fog present;
   (4) no tag across the visible edge at open (left = right of the rail, right = card column on landscape). Also: Dưỡng Tú viện is a place.
   usage: node dev/test/map-zones-scan.js <url> <shotdir|-> [WxH,..] ; exit 1 on any failure */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs');const CDN='https://ctm-img.victoria-tntt.workers.dev/';const CACHE=(process.env.MFK_CACHE||'/home/user/wt/mfk-cache')+'/';fs.mkdirSync(CACHE,{recursive:true});
const [,,URL_,DIR,SIZES]=process.argv;const sl=t=>new Promise(r=>setTimeout(r,t));if(DIR&&DIR!=='-')fs.mkdirSync(DIR,{recursive:true});
const MEAS=()=>{const sc=document.querySelector('.game.maptab .mapsc');if(!sc)return{err:'no map'};const w=sc.querySelector('.mapw'),cs=getComputedStyle(w),sr=sc.getBoundingClientRect(),port=sc.clientHeight>sc.clientWidth;
 const VL=sr.left+(parseFloat(cs.marginLeft)||0),VR=sr.right-(port?0:(parseFloat(cs.marginRight)||0));const bad={long:[],cut:[]};const tags=[];
 for(const s of sc.querySelectorAll('.mspot')){const k=s.dataset.go||s.dataset.ak||s.dataset.kcgo||s.dataset.zone||'';const lab=(s.querySelector('.mlab')||{}).textContent||'';const m=s.querySelector(':scope>.mmeta');const mt=m?m.textContent.trim():'';
  tags.push({k,lab,mt,cls:s.className});const vis=s.offsetWidth&&getComputedStyle(s).display!=='none';
  if(!s.classList.contains('here')&&!s.classList.contains('mzme')&&!s.classList.contains('empty')&&!/Ngoại triều|Cổng nhà/.test(lab)&&mt&&!/^(Nhà ta · )?(\d+ bóng|vắng|Nhà ta)$/.test(mt))bad.long.push(lab+'«'+mt+'»');
  if(vis){const R=[...s.querySelectorAll('.mlab,.mmeta')].map(e=>e.getBoundingClientRect()).filter(r=>r.width>0);if(R.length){const l=Math.min(...R.map(r=>r.left)),r=Math.max(...R.map(r=>r.right));if((l<VL-1&&r>VL+1)||(l<VR-1&&r>VR+1))bad.cut.push(lab)}}}
 return{bad,tags}};
(async()=>{const b=await chromium.launch();let fail=0;const out=[];
for(const sz of (SIZES||'755x1000,1180x820').split(',')){const [W,H]=sz.split('x').map(Number);
 for(const mode of ['day','night','camtuc','zone','home']){const errs=[];
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});
  await ctx.route(u=>u.href.startsWith(CDN),async r=>{const u=new URL(r.request().url()),c=CACHE+u.pathname.slice(1).replace(/\//g,'__');const ct=u.pathname.endsWith('.json')?'application/json':u.pathname.endsWith('.webp')?'image/webp':'application/octet-stream';
   if(!u.pathname.endsWith('.json')&&fs.existsSync(c))return r.fulfill({status:200,body:fs.readFileSync(c),contentType:ct});
   for(let i=0;i<4;i++){try{const res=await r.fetch();const body=await res.body();if(res.status()===200&&!u.pathname.endsWith('.json'))fs.writeFileSync(c,body);return r.fulfill({status:res.status(),body,contentType:ct})}catch(e){}}return r.abort()});
  const p=await ctx.newPage();p.setDefaultTimeout(120000);p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  await p.goto(URL_,{waitUntil:'domcontentloaded'});await p.addStyleTag({content:'#kroul,#kroulw,.kroul,.kcf,#title,#kload{display:none!important}'});
  await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await sl(2500);
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;window.__forceOrigin='tt';document.getElementById('title').hidden=true;for(let i=0;i<60;i++){start();if(!isSrv())break}});
  for(let i=0;i<15;i++){await sl(400);const s=await p.evaluate(()=>{const s=isSrv();if(s)start();return s});if(!s)break}
  if(mode==='home'){await p.evaluate(()=>{S.origin=ORIGINS.find(x=>x.k==='tt');S.kcPick='nha';Q=[];window.__bot=1;kcInit();delete window.__bot;Q=[]});await sl(800);for(let i=0;i<4;i++){const n=await p.evaluate(()=>{const B=[...document.querySelectorAll('button')].filter(b=>/^(Nhận|Bỏ qua)$/.test(b.textContent.trim())&&b.offsetParent);B.forEach(b=>b.click());return B.length});if(!n)break;await sl(700)}}
  await p.evaluate(m=>{Q.length=0;document.getElementById('modal').hidden=true;if(m==='night')S.buoi=BUOI.length-1;if(m==='camtuc')S.confined=2;window.__mapZ=0;tab='go';render()},mode);await sl(2500);
  const r={sz,mode};
  if(mode==='zone'){r.z={};for(const id of await p.evaluate(()=>MAPZ_ZONES.map(z=>z.id))){
   const ok0=await p.evaluate(id=>{const z=document.querySelector(`.mspot.mzone[data-zone="${id}"]`);if(!z)return null;window.__mzk=z.dataset.mzk.split(' ').filter(Boolean);z.click();return 1},id);if(!ok0){r.z[id]='no tag';continue}await sl(1500);
   const z=await p.evaluate(id=>{const v=document.querySelector('.game.maptab .mapv');const mem=window.__mzk.map(k=>{const s=document.querySelector(`.mapw .mspot[data-go="${k}"],.mapw .mspot[data-ak="${k}"]`);return s&&s.offsetWidth&&!s.classList.contains('mzh')?1:0});
    const other=[...document.querySelectorAll('.mapw .mspot')].filter(s=>s.offsetWidth&&getComputedStyle(s).display!=='none'&&s.dataset.zn!==id).length;return{mz:v&&v.dataset.mz,fog:!!document.querySelector('.mapw .kmfog'),mem,other}},id);
   r.z[id]=z;if(z.mz!==id||!z.fog||z.mem.some(x=>!x)||z.other){fail++;r.FAIL='zone view '+id}
   if(DIR&&DIR!=='-')await p.screenshot({path:`${DIR}/${sz}-zone-${id}.png`});
   await p.evaluate(()=>{mapzGo(null)});await sl(800)}}
  else{const M=await p.evaluate(MEAS);r.long=M.bad.long;r.cut=M.bad.cut;if(M.bad.long.length||M.bad.cut.length){fail++;r.FAIL=1}
   if(mode!=='home'){r.zt=await p.evaluate(()=>{const o={};const hk=mapHereK();for(const Z of MAPZ_ZONES){const t=document.querySelector(`.mapw .mspot.mzone[data-zone="${Z.id}"]`);const mem=t&&t.dataset.mzk?t.dataset.mzk.split(' ').filter(Boolean):[];const lost=Z.keys.filter(k=>document.querySelector(`.mapw .mspot[data-go="${k}"],.mapw .mspot[data-ak="${k}"]`)&&!mem.includes(k));const hid=mem.every(k=>{const s=document.querySelector(`.mapw .mspot[data-go="${k}"],.mapw .mspot[data-ak="${k}"]`);return !s||s.classList.contains('mzh')});const sum=mem.reduce((a,k)=>a+countAt(k===hk?S.place:k),0);const mt=t?((t.querySelector('.mmeta')||{}).textContent||''):'';const m=/(\d+) bóng/.exec(mt);const n=t?(m?+m[1]:0):-1;o[Z.id]={tag:!!(t&&t.offsetWidth),hid,ok:n===sum&&!lost.length,n,sum,lost}}
     /* grouping never removes a place: every place spot is visible or inside a visible zone tag */
     const orphan=[...document.querySelectorAll('.mapw .mspot:not(.mzone)')].filter(s=>{if(s.offsetWidth&&getComputedStyle(s).display!=='none')return false;const z=s.dataset.zn&&document.querySelector(`.mapw .mspot.mzone[data-zone="${s.dataset.zn}"]`);return !(z&&z.offsetWidth)}).map(s=>(s.querySelector('.mlab')||{}).textContent);o.orphan=orphan;
     o.dtv=places().some(x=>x.k==='dtv');return o});
    if(r.zt.orphan.length){fail++;r.FAIL='orphan places '+r.zt.orphan}delete r.zt.orphan;
    for(const id in r.zt){const z=r.zt[id];if(id==='dtv'?!z:!(z.tag&&z.hid&&z.ok)){fail++;r.FAIL='zones '+JSON.stringify(r.zt)}}}}
  if(errs.length){fail++;r.errs=errs}
  if(DIR&&DIR!=='-')await p.screenshot({path:`${DIR}/${sz}-${mode}.png`});
  console.log(JSON.stringify(r));await ctx.close()}}
await b.close();console.log(fail?`FAIL ${fail}`:'PASS');process.exit(fail?1:0)})();
