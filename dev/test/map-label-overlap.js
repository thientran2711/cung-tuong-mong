/* map-label-overlap: bounding-box overlap count of EVERY Dư đồ place label must be 0 (law 11 whole group; Foreman D robot find 23/11: Trường Xuân / Vĩnh Hòa / Hàm An / Trường Môn viện overlapped on iPad 1180x820).
   Per size x rank x buổi (day/night) x zoom step (fit, +0.5 ... as the +/- buttons) on the whole map, plus the courtyard level (.kpmv) of every palace.
   A place's label box = union of .mlab + .mmeta (what mapFit/kmSolve treat as ONE tag); two visible boxes may not overlap by more than 1 px in both axes.
   usage: node dev/test/map-label-overlap.js <url> [WxH,..] [ranks e.g. -,3,6 (- = keep)] [zoomSteps default 0,1,2,3,4] ; exit 1 on any overlap. Prints one row per case + a summary table. Reuses the CDN cache of map-labels-scan.js. */
const {chromium}=require('playwright');const fs=require('fs');const CDN='https://ctm-img.victoria-tntt.workers.dev/';const CACHE=(process.env.MFK_CACHE||'/home/user/wt/mfk-cache')+'/';fs.mkdirSync(CACHE,{recursive:true});
const [,,URL_,SIZES,RK,ZS]=process.argv;const sl=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch({proxy:process.env.HTTPS_PROXY?{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}:undefined});let bad=0,cases=0,tot=0;const table=[];
for(const sz of (SIZES||'755x1000,1180x820,1366x1024,390x844').split(',')){const [W,H]=sz.split('x').map(Number);const errs=[];
 const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce',ignoreHTTPSErrors:true});
 await ctx.route(u=>u.href.startsWith(CDN),async r=>{const u=new URL(r.request().url()),c=CACHE+u.pathname.slice(1).replace(/\//g,'__');const ct=u.pathname.endsWith('.json')?'application/json':u.pathname.endsWith('.webp')?'image/webp':'application/octet-stream';
  if(!u.pathname.endsWith('.json')&&fs.existsSync(c))return r.fulfill({status:200,body:fs.readFileSync(c),contentType:ct});
  for(let i=0;i<4;i++){try{const res=await r.fetch();const body=await res.body();if(res.status()===200&&!u.pathname.endsWith('.json'))fs.writeFileSync(c,body);return r.fulfill({status:res.status(),body,contentType:ct})}catch(e){}}return r.abort()});
 const p=await ctx.newPage();p.setDefaultTimeout(120000);p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await p.goto(URL_,{waitUntil:'domcontentloaded'});await p.addStyleTag({content:'#kroul,#kroulw,.kroul,.kcf,#title,#kload{display:none!important}'});
 await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await sl(2500);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;window.__forceOrigin='tt';document.getElementById('title').hidden=true;for(let i=0;i<60;i++){start();if(!isSrv())break}});
 for(let i=0;i<15;i++){await sl(400);const s=await p.evaluate(()=>{const s=isSrv();if(s)start();return s});if(!s)break}
 /* in-page: overlapping pairs among the visible label boxes of the spots matched by sel */
 const OV=(sel)=>{const R=[...document.querySelectorAll(sel)].map(s=>{const q=[...s.querySelectorAll('.mlab,.mmeta')].map(e=>({r:e.getBoundingClientRect(),cs:getComputedStyle(e)})).filter(x=>x.cs.display!=='none'&&x.cs.visibility!=='hidden'&&x.r.width>1&&x.r.height>1).map(x=>x.r);if(!q.length)return null;return{n:((s.querySelector('.mlab')||{}).textContent||s.dataset.go||'?').trim().replace(/\s+/g,' ').slice(0,18),l:Math.min(...q.map(r=>r.left)),t:Math.min(...q.map(r=>r.top)),r:Math.max(...q.map(r=>r.right)),b:Math.max(...q.map(r=>r.bottom))}}).filter(Boolean);
  const o=[];for(let i=0;i<R.length;i++)for(let j=i+1;j<R.length;j++){const a=R[i],c=R[j];if(Math.min(a.r,c.r)-Math.max(a.l,c.l)>1&&Math.min(a.b,c.b)-Math.max(a.t,c.t)>1)o.push(a.n+'|'+c.n)}return{n:R.length,o}};
 const ranks=(RK||'-').split(','),zsteps=(ZS||'0,1,2,3,4').split(',').map(Number);
 for(const rk of ranks)for(const buoi of [0,-1])for(const zs of zsteps){
  const r=await p.evaluate(([b,rk,zs,OVs])=>{if(rk!=='-'){S.rank=Math.min(+rk,RANKS.length-1)}Q.length=0;document.getElementById('modal').hidden=true;S.buoi=b<0?BUOI.length-1:b;window.__mapZ=0;tab='go';render();
    const f=window.__mapFit||1;window.__mapZ=zs?Math.min(f+2.5,f+zs*.5*Math.max(.6,f)):0;render();const ov=eval('('+OVs+')')('.game.maptab .mapw .mspot');return{rank:S.rank,z:+(window.__mapZ||f).toFixed(2),fit:+f.toFixed(2),mls:window.__mapMls,hard:(window.__mapSolve||{}).hard,ov}},[buoi,rk,zs,OV.toString()]);
  await sl(120);const r2=await p.evaluate(OVs=>Object.assign(eval('('+OVs+')')('.game.maptab .mapw .mspot'),{solve:window.__mapSolve,err:window.__mapErr}),OV.toString());const o=r2.o;cases++;tot+=o.length;if(o.length)bad++;
  table.push([sz,'map',buoi<0?'night':'day','rk'+r.rank,'z'+r.z,'n='+r2.n,'overlap='+o.length,o.join(', ')]);console.log(sz,'map',buoi<0?'night':'day','rank='+r.rank,'zoom='+r.z+'(fit '+r.fit+')','labels='+r2.n,'mls='+r.mls,'overlaps='+o.length,o.length?'FAIL '+o.join(', ')+' solve='+JSON.stringify(r2.solve)+(r2.err?' ERR '+r2.err:''):'PASS')}
 /* courtyard level: every palace's hall tags */
 const cy=await p.evaluate(async OVs=>{const ov=eval('('+OVs+')');const out=[];Q.length=0;document.getElementById('modal').hidden=true;S.buoi=0;for(let i=0;i<PALN.length;i++){let art=null;try{art=kpmArt(i)}catch(e){}if(!art)continue;const k=kpmKeyOf(i);window.__kpm={slot:i,k,empty:!k};window.__mapZ=0;tab='go';render();await new Promise(r=>setTimeout(r,700));const x=ov('.game .kpmv .mspot.kpm-spot');out.push({slot:i,k:k||'(empty)',n:x.n,o:x.o})}window.__kpm=null;render();return out},OV.toString());
 for(const c of cy){cases++;tot+=c.o.length;if(c.o.length)bad++;table.push([sz,'courtyard',c.k,'','','n='+c.n,'overlap='+c.o.length,c.o.join(', ')])}
 console.log(sz,'courtyards',cy.length,cy.some(c=>c.o.length)?'FAIL '+JSON.stringify(cy.filter(c=>c.o.length)):'PASS');
 if(errs.length)console.log('errs',errs.join('|'));await ctx.close()}
await b.close();console.log('\nSUMMARY cases='+cases+' casesWithOverlap='+bad+' totalOverlapPairs='+tot);process.exit(bad?1:0)})();
