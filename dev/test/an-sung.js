/* review/sub-odds (owner 04:05Z): Tai mắt + Ân sủng rows live on the stage under the court chips; the "Tư chất · trạng thái" sheet is gone.
   usage: node dev/test/an-sung.js <baseURL> <page> <outdir> <tag>
   Viewports: Fold 755x1000@2, iPad portrait 820x1180@2, iPad 1180x820@2 + 1366x1024@2, phones 412x1058@2 + 390x844@3.
   Checks: page errors, the right plaque column (court chips + Ân sủng) inside the stage, no overlap with figures / name tags, no clipped label,
   no ladder word (Liều…) in the chips, the sheet cannot open (top-bar Tư chất / plaque taps), collapsed "Ân sủng ›" chip opens its kit card. */
const {chromium}=require('./lib/pw-roulette');const fs=require('fs');
const OW=require('./odds-words.js');/* ladder words from the ONE source j0 */
const [,,BASE,PAGE,OUT,TAG]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const sleep=t=>new Promise(r=>setTimeout(r,t));
async function skipLoader(p){for(let i=0;i<300;i++){const s=await p.evaluate(()=>{const b=document.querySelector('#kload [data-kl="go"]');if(b){b.click();return 'skip'}
  return window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)&&!document.getElementById('kload')?'ok':''});if(s==='ok')return;await sleep(500)}}
const VPS=(process.env.VPS||'755x1000x2,820x1180x2,1180x820x2,1366x1024x2,412x1058x2,390x844x3').split(',').map(s=>s.split('x').map(Number));
(async()=>{const b=await chromium.launch();const R={};
 for(const [W,H,D] of VPS){const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:D,hasTouch:true,isMobile:W<1100});
  const p=await ctx.newPage();await require('./lib/veil').guard(p);const errs=[];p.on('pageerror',e=>errs.push(e.message));const r=R[W+'x'+H]={};
  await p.goto(BASE+PAGE,{waitUntil:'domcontentloaded'});await skipLoader(p);await sleep(1200);
  await p.evaluate(()=>{window.__forceOrigin='thd';SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;quiet=false;
   Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;tmPlace(S,2);S.an=12;S.aw=1;render()});await sleep(2500);
  /* CROWD=1: the busiest place on the map (most people on the stage) instead of her own room */
  if(process.env.CROWD){r.place=await p.evaluate(()=>{let best=null,n=-1;for(const pl of places()){try{goTo(pl.k);const c=curPeople().length;if(c>n){n=c;best=pl.k}}catch(e){}}
   try{goTo(best)}catch(e){}render();return best+':'+n});await sleep(2500)}
  await p.screenshot({path:`${OUT}/${TAG}-${process.env.CROWD?'crowd':'home'}-${W}x${H}.png`,animations:'disabled',timeout:120000});
  r.state=await p.evaluate(()=>{const st=document.getElementById('stage'),R=document.getElementById('kshR');const sr=st&&st.getBoundingClientRect();
   const rr=R&&!R.hidden?R.getBoundingClientRect():null;const figs=typeof kitFigRects==='function'?kitFigRects():[];
   const tags=[...document.querySelectorAll('#stage .tok .nm, #stage .ftag, #stage .tok .lbl, #stage .kfname, #stage [class*="tag"]')].filter(e=>e.offsetParent&&!R.contains(e)).map(e=>e.getBoundingClientRect()).filter(q=>q.width>4);
   const hit=(a,q)=>Math.min(a.right,q.right)-Math.max(a.left,q.left)>1&&Math.min(a.bottom,q.bottom)-Math.max(a.top,q.top)>1;
   const chips=R?[...R.querySelectorAll('.k3c,.k3r,.kas')].filter(e=>e.offsetParent):[];
   const clip=[];if(R)R.querySelectorAll('*').forEach(e=>{if(!e.offsetParent||!e.childNodes.length)return;if(e.scrollWidth>e.clientWidth+1&&getComputedStyle(e).overflow!=='visible')clip.push(e.className+': '+e.textContent.trim().slice(0,30))});
   const cut=chips.filter(e=>{const q=e.getBoundingClientRect();return q.right>sr.right+1||q.bottom>sr.bottom+1||q.left<sr.left-1||q.top<sr.top-1}).map(e=>e.textContent.trim().slice(0,30));
   const over=chips.filter(e=>{const q=e.getBoundingClientRect();return figs.some(f=>hit(f,q))||tags.some(t=>hit(t,q))}).map(e=>e.textContent.trim().slice(0,30));
   return {stage:sr&&[Math.round(sr.width),Math.round(sr.height)],col:rr&&[Math.round(rr.left),Math.round(rr.top),Math.round(rr.width),Math.round(rr.height)],
    text:R?R.innerText.replace(/\n+/g,' | '):'',collapsed:!!(R&&R.querySelector('.kas-one')),clip,cut,over,figs:figs.length,
    sheetBtn:!!document.querySelector('.khsh,.h2t:not([hidden])')&&!!document.querySelector('#hud2 .khsh'),
    overflowX:document.documentElement.scrollWidth>innerWidth,hc:[...document.querySelectorAll('#hud2 .hc')].map(e=>e.dataset.hx+'='+e.textContent.replace(/\s+/g,' ').trim().slice(0,40))}});
  /* the old opener: top-bar Tư chất group, a plaque tap -> no sheet */
  await p.evaluate(()=>{const g=document.getElementById('kstg-tc');if(g)g.click();const y=document.querySelector('#kshR .k3py');if(y)y.click()});await sleep(700);
  r.sheetOpen=await p.evaluate(()=>{const h=document.getElementById('hud2');return !!(h&&!h.classList.contains('col')&&h.querySelector('.khg'))});
  await p.screenshot({path:`${OUT}/${TAG}-tap-tuchat-${W}x${H}.png`,animations:'disabled',timeout:120000});
  await p.evaluate(()=>{const h=document.getElementById('hud2');if(h&&!h.classList.contains('col')&&typeof k3Sheet==='function')k3Sheet(false)});
  /* collapsed chip -> its card */
  r.card=await p.evaluate(async()=>{const c=document.querySelector('#kshR .kas-one');if(!c)return null;c.click();await new Promise(r=>setTimeout(r,600));const m=document.querySelector('.kascard');return m&&m.offsetParent?m.innerText.replace(/\n+/g,' | '):'(no card)'});
  if(r.card)await p.screenshot({path:`${OUT}/${TAG}-an-sung-card-${W}x${H}.png`,animations:'disabled',timeout:120000});
  r.ladder=OW.RE.test(r.state.text+(r.card||''));r.errs=errs;await ctx.close()}
 fs.writeFileSync(`${OUT}/${TAG}-an-sung.json`,JSON.stringify(R,null,1));for(const k in R)console.log(k,JSON.stringify(R[k]));await b.close()})();
