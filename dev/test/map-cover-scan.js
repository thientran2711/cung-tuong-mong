/* map-cover-scan (law 11, MAIN 165 26/11 ~22:37Z; Foreman E 22:20Z + D 09:17Z: map cards / markers / .kmov / .kfoc / .mapsc covered by the shop sheet #kshR or a portrait frame img.kfr):
   every Dư đồ view (overview, every zone, her courtyard, home map), Fold 755x1000 + iPad 1180x820, the map scrolled to its 4 corners + the open view:
   every tappable map element (.mspot / .khap / .kmmapmk host / map tools / .kmov / .kfoc controls) is hit-tested on 5 points (centre + 4 inner points) that lie inside the visible
   map scroller; a point whose topmost element is outside the target and inside #kshR, #kshL, .krailb or is an img.kfr = COVERED. A target is FAULT when its centre is covered
   or 3+ of its 5 points are. usage: node dev/test/map-cover-scan.js <url> [WxH,..] → one row per view + summary; exit 1 on any fault */
const {chromium}=require('playwright');const sl=t=>new Promise(r=>setTimeout(r,t));const [,,URL_,SZS]=process.argv;
const SCAN=()=>{const v=document.querySelector('#panel .kpmv')||document.querySelector('#panel .mapv');if(!v)return{err:'nomap'};const sc=v.querySelector('.mapsc')||v;const S0=sc.getBoundingClientRect();
 const vis=e=>e.offsetWidth&&e.getClientRects().length&&getComputedStyle(e).visibility!=='hidden'&&getComputedStyle(e).display!=='none';
 const T=[...document.querySelectorAll('#panel .mapv .mspot,#panel .kpmv .mspot,#panel .mapv .khap,#panel .mapv .maptools button,#panel .kpmv .maptools button,.kmov button,.kfoc button')].filter(vis);
 const bad=[];let pts=0,cov=0;const who={};
 for(const t of T){if(t.disabled&&!t.classList.contains('mspot'))continue;const r=t.getBoundingClientRect();const P=[[.5,.5],[.25,.25],[.75,.25],[.25,.75],[.75,.75]].map(([a,b])=>[r.left+r.width*a,r.top+r.height*b]);
  const inMap=t.closest('.maptools')||t.closest('.kmov')||t.closest('.kfoc')&&!t.closest('.mapsc');let n=0,c0=false,cn=0,by='';
  P.forEach(([x,y],i)=>{if(x<0||y<0||x>=innerWidth||y>=innerHeight)return;if(!inMap&&(x<S0.left||x>S0.right||y<S0.top||y>S0.bottom))return;n++;pts++;const e=document.elementFromPoint(x,y);if(!e||t.contains(e)||e.contains(t))return;
   const cv=e.closest('#kshR,#kshL,.krailb')||(e.matches('img.kfr')?e:null);if(!cv)return;cn++;cov++;if(i===0)c0=true;const d=(e.tagName.toLowerCase()+(e.id?'#'+e.id:'')+'.'+String(e.className||'').split(' ').slice(0,2).join('.')).slice(0,40);by=by||d;who[d]=(who[d]||0)+1});
  if(n&&(c0||cn>=3))bad.push(((t.querySelector('.mlab')||t).textContent||t.className).trim().replace(/\s+/g,' ').slice(0,22)+'<'+by)}
 return{targets:T.length,pts,cov,fault:bad.length,bad:bad.slice(0,6).join(' | '),who:Object.entries(who).map(([k,n])=>k+'×'+n).slice(0,4).join(' ')}};
(async()=>{let faults=0;const b=await chromium.launch();
 for(const sz of (SZS||'755x1000,1180x820').split(',')){const [W,H]=sz.split('x').map(Number);const p=await (await b.newContext({viewport:{width:W,height:H},serviceWorkers:'block',reducedMotion:'reduce'})).newPage();p.setDefaultTimeout(120000);
  await p.goto(URL_,{waitUntil:'domcontentloaded'});await p.addStyleTag({content:'#kroul,#kroulw,.kroul,.kcf,#title,#kload{display:none!important}'});await p.waitForFunction(()=>typeof start==='function');await sl(2500);
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();localStorage.clear();SLOT=3;window.__forceOrigin='tt';document.getElementById('title').hidden=true;for(let i=0;i<60;i++){start();if(!isSrv())break}});
  for(let i=0;i<15;i++){await sl(400);if(!await p.evaluate(()=>{const s=isSrv();if(s)start();return s}))break}
  const view=async name=>{await sl(2500);const acc={targets:0,pts:0,cov:0,fault:0,bad:[],who:[]};
   for(const pos of ['open','tl','tr','bl','br']){if(pos!=='open')await p.evaluate(pos=>{const v=document.querySelector('#panel .kpmv')||document.querySelector('#panel .mapv');const sc=v&&v.querySelector('.mapsc');if(!sc)return;sc.scrollLeft=pos[1]==='l'?0:sc.scrollWidth;sc.scrollTop=pos[0]==='t'?0:sc.scrollHeight},pos);await sl(350);
    const r=await p.evaluate(SCAN);if(r.err)continue;acc.targets=Math.max(acc.targets,r.targets);acc.pts+=r.pts;acc.cov+=r.cov;acc.fault+=r.fault;if(r.bad)acc.bad.push(pos+':'+r.bad);if(r.who)acc.who.push(r.who)}
   faults+=acc.fault;console.log(`| ${sz} | ${name} | ${acc.targets} | ${acc.pts} | ${acc.cov} | ${acc.fault} | ${acc.bad.join(' ; ').slice(0,300)} | ${[...new Set(acc.who)].join(' ').slice(0,160)} |`)};
  const map=()=>p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;window.__kpm=null;window.__mapZone=null;tab='go';render()});
  await map();await view('palace overview');
  for(const id of await p.evaluate(()=>typeof MAPZ_ZONES!=='undefined'?MAPZ_ZONES.map(z=>z.id):[])){if(await p.evaluate(id=>{const z=document.querySelector(`.mspot.mzone[data-zone="${id}"]`);if(!z)return 0;mapzGo(id);return 1},id)){await view('zone '+id);await map()}}
  await p.evaluate(()=>{const z=document.querySelector('.mapw .mspot.mzone.mzhome');if(z)mapzGo(z.dataset.zone)});await sl(1500);await p.evaluate(()=>{const s=document.querySelector(`.mapw .mspot[data-go="${plHomeK()}"]`);if(s)s.click()});await view('her courtyard');
  await p.evaluate(()=>{S.buoi=BUOI.length-1;window.__kpm=null;window.__mapZone=null;tab='go';render()});await view('overview night');
  await p.evaluate(o=>{S.buoi=0;S.origin=ORIGINS.find(x=>x.k===o);S.kcPick='nha';Q=[];window.__bot=1;try{kcInit()}catch(e){}delete window.__bot;Q=[]},'tt');await sl(600);
  for(let i=0;i<4;i++){const n=await p.evaluate(()=>{const B=[...document.querySelectorAll('button')].filter(b=>/^(Nhận|Bỏ qua)$/.test(b.textContent.trim())&&b.offsetParent);B.forEach(b=>b.click());return B.length});if(!n)break;await sl(400)}
  await map();await view('home map');await p.context().close()}
 console.log(faults?`MAP-COVER FAIL · ${faults} covered targets`:'MAP-COVER PASS');await b.close();process.exit(faults?1:0)})();
