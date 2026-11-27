/* map-icon-scan (law 11, owner 26/11 ~18:35Z «icon nơi chốn to bằng dấu Ta, đặt trên tên, không scale nhỏ như con kiến»): every Dư đồ view, the size of the «Ta» marker (.kmmapmk)
   vs every place icon (.kplic), the icon sits ABOVE its name, and label boxes (icon+name+meta of one spot) must not intersect. FAIL rows are printed.
   usage: node dev/test/map-icon-scan.js <url> [WxH] [shotDir] → JSON per view + table */
const {chromium}=require('playwright');const sl=t=>new Promise(r=>setTimeout(r,t));const [,,URL_,SZ,SHOT]=process.argv;const [W,H]=(SZ||'1180x820').split('x').map(Number);
const MEASURE=()=>{const vis=s=>s.offsetWidth&&getComputedStyle(s).display!=='none'&&getComputedStyle(s).visibility!=='hidden';const v=document.querySelector('#panel .kpmv')||document.querySelector('#panel .mapv');if(!v)return{err:'no map'};
 const R=e=>{const r=e.getBoundingClientRect();return{l:r.left,t:r.top,r:r.right,b:r.bottom,w:r.width,h:r.height}};
 const ta=[...v.querySelectorAll('.kmmapmk')].filter(vis).map(e=>R(e.querySelector('img:not(.kmglw)')||e))[0];
 const sp=[...v.querySelectorAll('.mspot')].filter(vis);const items=sp.map(s=>{const ic=s.querySelector('.kplic');const ir=ic&&ic.offsetWidth?R(ic):null;const parts=[...s.querySelectorAll('.mlab,.mmeta,.kplic')].filter(e=>e.offsetWidth).map(R);
  const nm=s.querySelector('.mlab');const nr=nm?R(nm):null;const box=parts.length?{l:Math.min(...parts.map(p=>p.l)),t:Math.min(...parts.map(p=>p.t)),r:Math.max(...parts.map(p=>p.r)),b:Math.max(...parts.map(p=>p.b))}:null;
  return{k:s.dataset.go||s.dataset.ak||s.dataset.zone||'?',ic:ir&&Math.round(Math.min(ir.w,ir.h)*10)/10,hasIc:!!ic,above:!!(ir&&nr&&ir.t-nr.t<4&&ir.h<nr.h-4),box}});
 let ov=0;const pairs=[];for(let i=0;i<items.length;i++)for(let j=i+1;j<items.length;j++){const a=items[i].box,b=items[j].box;if(!a||!b)continue;if(a.l<b.r-1&&b.l<a.r-1&&a.t<b.b-1&&b.t<a.b-1){ov++;pairs.push(items[i].k+'~'+items[j].k)}}
 const withIc=items.filter(i=>i.hasIc);const sizes=withIc.map(i=>i.ic);
 const noic=sp.filter(e=>!e.querySelector('.kplic')).map(e=>{const a=[...e.attributes].filter(x=>/^data-(go|ak|kcgo|kcmap|zone|kpm|k)$/.test(x.name)).map(x=>x.value)[0]||'?';const l=(e.querySelector('.mlab')||{}).textContent||'';return a+'='+l.trim().replace(/\s+/g,' ').slice(0,22)}).join(', ');return{noic,ta:ta?Math.round(Math.min(ta.w,ta.h)*10)/10:null,tags:items.length,icons:withIc.length,icMin:sizes.length?Math.min(...sizes):null,icMax:sizes.length?Math.max(...sizes):null,notAbove:withIc.filter(i=>!i.above).length,overlap:ov,pairs:pairs.slice(0,6).join(' ')}};
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
 await boot();const out=[];const row=async(view)=>{await sl(out.length?1800:4500);const c=await p.evaluate(MEASURE);if(SHOT){await p.evaluate(()=>{const m=document.getElementById('modal');if(m){m.hidden=true;m.style.display='none'}document.body.classList.remove('kdlg-on')});await sl(300);require('fs').mkdirSync(SHOT,{recursive:true});await p.screenshot({path:SHOT+'/'+W+'x'+H+'-'+view.replace(/[^a-z0-9]+/gi,'_')+'.png'})}out.push({view,...c});console.log(JSON.stringify({view,...c}))};
 await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;window.__mapZ=0;window.__kpm=null;window.__mapZone=null;tab='go';render()});await row('palace overview');
 for(const id of await p.evaluate(()=>typeof MAPZ_ZONES!=='undefined'?MAPZ_ZONES.map(z=>z.id):[])){const ok=await p.evaluate(id=>{if(!document.querySelector(`.mspot.mzone[data-zone="${id}"]`))return 0;mapzGo(id);return 1},id);if(ok){await row('zone '+id);await p.evaluate(()=>mapzGo(null))}}
 await p.evaluate(()=>{kpmOpenSlot('p:vuon','vuon')});await row('Ngự hoa viên areas');
 /* her palace courtyard by the real way in (BIG rv 26/11: kpmOpenSlot(palaceOf(S)) gave 'home' → no courtyard, the row repeated the overview): her zone → tap her own palace tag */
 await p.evaluate(()=>{window.__kpm=null;window.__mapZone=null;render();const z=document.querySelector('.mapw .mspot.mzone.mzhome');if(z)mapzGo(z.dataset.zone)});await sl(1500);
 await p.evaluate(()=>{const k=typeof plHomeK==='function'?plHomeK():'home';const s=document.querySelector(`.mapw .mspot[data-go="${k}"]`);if(s)s.click()});await sl(1500);
 if(!await p.evaluate(()=>!!document.querySelector('#panel .kpmv')))console.log('FAIL: her palace courtyard did not open');await row('her palace courtyard');
 await p.evaluate(()=>{window.__kpm=null;render()});
 for(const o of await p.evaluate(()=>KIT_ORIGINS)){await p.evaluate(o=>{S.origin=ORIGINS.find(x=>x.k===o);S.kcPick='nha';Q=[];window.__bot=1;try{kcInit()}catch(e){}delete window.__bot;Q=[]},o);await sl(600);
  for(let i=0;i<4;i++){const n=await p.evaluate(()=>{const B=[...document.querySelectorAll('button')].filter(b=>/^(Nhận|Bỏ qua)$/.test(b.textContent.trim())&&b.offsetParent);B.forEach(b=>b.click());return B.length});if(!n)break;await sl(400)}
  await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;window.__mapZ=0;tab='go';render()});await row('home '+o)}
 console.log('| view | Ta px | tags | icons | icon px min-max | not above name | label overlaps | pairs | no-icon keys |');for(const r of out)console.log(`| ${r.view} | ${r.ta} | ${r.tags} | ${r.icons} | ${r.icMin}-${r.icMax} | ${r.notAbove} | ${r.overlap} | ${r.pairs||''} | ${r.noic||''} |`);
 if(errs.length)console.log('pageerrors',errs);await b.close()})();
