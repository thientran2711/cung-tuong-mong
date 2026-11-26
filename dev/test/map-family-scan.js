/* map-family-scan (law 11, owner 26/11 ~07:05Z «gộp cái dư đồ lại … bấm vào tầng 2 thì sẽ hiện ra chi tiết»): every Dư đồ view, the number of tags on its FIRST level
   (visible .mspot) and the number of places reachable from it (visible + inside a zone tag). Views: palace overview, each zone (level 2), Ngự hoa viên areas (kpm p:vuon),
   a consort courtyard (kpm), the home map of every home road (KIT_ORIGINS). A place is never lost: reachable(before) = reachable(after) per view.
   usage: node dev/test/map-family-scan.js <url> [WxH] → one JSON line per view + a table */
const {chromium}=require('playwright');const sl=t=>new Promise(r=>setTimeout(r,t));const [,,URL_,SZ]=process.argv;const [W,H]=(SZ||'1180x820').split('x').map(Number);
const COUNT=()=>{const vis=s=>s.offsetWidth&&getComputedStyle(s).display!=='none';const v=document.querySelector('#panel .kpmv')||document.querySelector('#panel .mapv');if(!v)return{err:'no map'};
 const S_=[...v.querySelectorAll('.mspot')];const tags=S_.filter(vis);const zones=tags.filter(s=>s.classList.contains('mzone'));
 const inz=S_.filter(s=>!vis(s)&&s.dataset.zn&&zones.some(z=>z.dataset.zone===s.dataset.zn));
 return{tags:tags.length,zones:zones.map(z=>z.dataset.zone).join('+'),places:tags.length-zones.length+inz.length}};
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},serviceWorkers:'block',reducedMotion:'reduce'});const p=await ctx.newPage();p.setDefaultTimeout(120000);
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,140)));
 await p.goto(URL_,{waitUntil:'domcontentloaded'});await p.addStyleTag({content:'#kroul,#kroulw,.kroul,.kcf,#title,#kload{display:none!important}'});
 await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await sl(2500);
 const boot=async()=>{await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;window.__forceOrigin='tt';document.getElementById('title').hidden=true;for(let i=0;i<60;i++){start();if(!isSrv())break}});
  for(let i=0;i<15;i++){await sl(400);const s=await p.evaluate(()=>{const s=isSrv();if(s)start();return s});if(!s)break}};
 await boot();const out=[];const row=async(view)=>{await sl(1800);const c=await p.evaluate(COUNT);out.push({view,...c});console.log(JSON.stringify({view,...c}))};
 await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;window.__mapZ=0;window.__kpm=null;window.__mapZone=null;tab='go';render()});await row('palace overview');
 for(const id of await p.evaluate(()=>typeof MAPZ_ZONES!=='undefined'?MAPZ_ZONES.map(z=>z.id):[])){const ok=await p.evaluate(id=>{if(!document.querySelector(`.mspot.mzone[data-zone="${id}"]`))return 0;mapzGo(id);return 1},id);if(ok){await row('zone '+id);await p.evaluate(()=>mapzGo(null))}}
 await p.evaluate(()=>{kpmOpenSlot('p:vuon','vuon')});await row('Ngự hoa viên areas');
 await p.evaluate(()=>{window.__kpm=null;const i=MAPH.rivalSlots.findIndex((s,i)=>{try{return palSlot(palaceOf(S))===i}catch(e){return false}});kpmOpenSlot(i>=0?i:0,palaceOf(S))});await row('her palace courtyard');
 await p.evaluate(()=>{window.__kpm=null;render()});
 for(const o of await p.evaluate(()=>KIT_ORIGINS)){await p.evaluate(o=>{S.origin=ORIGINS.find(x=>x.k===o);S.kcPick='nha';Q=[];window.__bot=1;try{kcInit()}catch(e){}delete window.__bot;Q=[]},o);await sl(600);
  for(let i=0;i<4;i++){const n=await p.evaluate(()=>{const B=[...document.querySelectorAll('button')].filter(b=>/^(Nhận|Bỏ qua)$/.test(b.textContent.trim())&&b.offsetParent);B.forEach(b=>b.click());return B.length});if(!n)break;await sl(400)}
  await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;window.__mapZ=0;tab='go';render()});await row('home '+o)}
 console.log('| view | level-1 tags | zones | places reachable |');for(const r of out)console.log(`| ${r.view} | ${r.tags} | ${r.zones||'-'} | ${r.places} |`);
 if(errs.length)console.log('pageerrors',errs);await b.close()})();
