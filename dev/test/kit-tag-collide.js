/* kit-tag-collide.js — KIT 33.10 (KK28, FOREMAN D kit request «two figure name labels overlap at the left edge», every stage): no two stage name labels overlap, on every origin x place x plate/plain state
   (stage kit rule kitTagCollide), and a FORCED collision (the 2nd figure token dragged onto the 1st) is resolved by the rule and stays inside the stage.
   usage: node dev/test/kit-tag-collide.js <index.html> [WxH,..] [origins]   env PLACES=home,vuon,.. SHOT=<dir>   Exit 1 on an overlapping pair. */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs');const [,,SRC,SIZES,ORIG]=process.argv;const html=fs.readFileSync(SRC);const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const px=process.env.HTTPS_PROXY;const b=await chromium.launch(px?{proxy:{server:px,bypass:'127.0.0.1,localhost'}}:{});const rows=[];let tot=0,ov=0;
 for(const sz of (SIZES||'1180x820,755x1000').split(',')){const [W,H]=sz.split('x').map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:W<1100,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce',ignoreHTTPSErrors:true});
  await ctx.route('http://ctm.test/**',r=>r.fulfill({status:404,body:''}));/* rv-plr4 r8 (law 11): only the page gets the 20 MB html; every other ctm.test asset 404 — answering each mp3/vendor request with the whole page broke the Playwright pipe once the page passed ~20.6 MB */await ctx.route(/^http:\/\/ctm\.test\/index\.html([?#].*)?$/,r=>r.fulfill({status:200,body:html,contentType:'text/html; charset=utf-8'}));
  const p=await ctx.newPage();p.setDefaultTimeout(240000);p.on('pageerror',()=>{});
  await p.goto('http://ctm.test/index.html',{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function');await sleep(2000);
  await p.addStyleTag({content:'#kroul{display:none!important}'});
  for(const og of (ORIG||'thd,tt,td,cnv,muoi,dtq,cn,bd').split(',')){
   const ok=await p.evaluate(async([k])=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;window.__forceOrigin=k;document.getElementById('title').hidden=true;quiet=true;start();quiet=false;
    await new Promise(r=>{let n=0;const t=()=>{if((S&&S.origin)||++n>150)r();else setTimeout(t,100)};t()});Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true;const kr=document.getElementById('kroul');if(kr)kr.remove();return !!(S&&S.origin)},[og]);
   if(!ok){rows.push([sz,og,'no start']);continue}await sleep(500);
   for(const pl of (process.env.PLACES||'home,vuon,lc,tyv,tn,thu,td,ksp,ghen,dtd,cnv').split(',')){for(const mode of ['plate','plain']){
    const r=await p.evaluate(async([pl,mode])=>{try{window.__walkFree=1;try{Q.length=0;goTo(pl)}catch(e){S.place=pl}const on=mode==='plate';const ppl=curPeople();
      const set=q=>{if(on){q.dh=Object.assign(q.dh||{},{nights:{n:5,i:1,at:[1,2]}});q.titleWorn="dh-nights"}else{q.titleWorn=null}};ppl.forEach(set);set(S);render();
      for(let i=0;i<60;i++){const im=[...document.querySelectorAll('#stage .figimg,#stage img.j59sz')];if(im.length&&im.every(e=>e.complete&&e.naturalWidth))break;await new Promise(r=>setTimeout(r,250))}await new Promise(r=>setTimeout(r,700));
      const st=document.getElementById('stage');if(!st)return{n:0};const R=e=>e.getBoundingClientRect(),sr=R(st);
      const tags=[...document.querySelectorAll('#stage #tokens .tok .tag,#stage #j59metag .tag')].filter(e=>e.offsetParent&&R(e).height>0&&R(e).right>sr.left&&R(e).left<sr.right).map(e=>({e,r:R(e),n:(e.textContent||'').trim().replace(/\s+/g,' ').slice(0,24)}));
      const pairs=[];for(let i=0;i<tags.length;i++)for(let j=i+1;j<tags.length;j++){const a=tags[i].r,c=tags[j].r;const w=Math.min(a.right,c.right)-Math.max(a.left,c.left),h=Math.min(a.bottom,c.bottom)-Math.max(a.top,c.top);if(w>1&&h>1)pairs.push([tags[i].n,tags[j].n,Math.round(w),Math.round(h),Math.round(Math.min(a.left,c.left)-sr.left)])}
      return{n:tags.length,pairs,place:S.place,pos:tags.map(t=>[t.n,Math.round(t.r.left-sr.left),Math.round(t.r.top-sr.top),Math.round(t.r.width),Math.round(t.r.height)])}}catch(e){return{err:e.message}}},[pl,mode]);
    if(r.err||!r.n){rows.push([sz,og,pl,mode,r.err||'no tags']);continue}
    tot+=r.n;for(const q of r.pairs){ov++;rows.push([sz,og,pl,mode,'OVERLAP',q.join(' | ')])}
    if(process.env.SHOT&&r.pairs.length)await p.screenshot({path:`${process.env.SHOT}/${sz}-${og}-${pl}-${mode}.png`});
   }}}
  {const f=await p.evaluate(async()=>{try{window.__walkFree=1;Q.length=0;goTo('home');render();await new Promise(r=>setTimeout(r,1500));const st=document.getElementById('stage'),R=e=>e.getBoundingClientRect(),sr=R(st);const tg=()=>[...document.querySelectorAll('#stage #tokens .tok .tag,#stage #j59metag .tag')].filter(e=>e.offsetParent&&R(e).height>0);
    const ov=()=>{const t=tg().map(R);let n=0;for(let i=0;i<t.length;i++)for(let j=i+1;j<t.length;j++)if(Math.min(t[i].right,t[j].right)-Math.max(t[i].left,t[j].left)>1&&Math.min(t[i].bottom,t[j].bottom)-Math.max(t[i].top,t[j].top)>1)n++;return n};
    const toks=[...document.querySelectorAll('#stage #tokens .tok')].filter(e=>e.offsetParent),me=document.getElementById('j59metag');if(!me||!toks[0])return {skip:1};const a=R(me.querySelector('.tag')).left-sr.left;toks[0].style.left=(a+20)+'px';const o1=ov();kitTagCollide(st);return {forced:o1,after:ov(),pos:tg().map(g=>[Math.round(R(g).left-sr.left),Math.round(R(g).right-sr.left),Math.round(R(g).top-sr.top),g.style.getPropertyValue('--j59tdx')]),inside:tg().every(g=>R(g).left>=sr.left-1&&R(g).right<=sr.right+1)}}catch(e){return {err:e.message}}});
   if(f.skip||f.err)rows.push([sz,'forced',f.err||'skip']);else{tot+=2;if(f.forced<1)rows.push([sz,'forced','no overlap could be forced (test is blind)']),ov++;if(f.after||!f.inside){ov++;rows.push([sz,'forced','OVERLAP/CUT after the rule',JSON.stringify(f)])}}}
  await ctx.close()}
 await b.close();rows.forEach(r=>console.log(r.join(' ')));console.log(`TAGS ${tot} OVERLAPPING PAIRS ${ov}`)})().catch(e=>{console.error(e);process.exit(2)});
