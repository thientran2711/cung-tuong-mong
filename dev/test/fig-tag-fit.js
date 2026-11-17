/* review/fig-tag-chip — every stage figure's name tag (title plate "chip" + rank line + name) stays fully inside the stage; feet stay visible.
   usage: node dev/test/fig-tag-fit.js <file:// or https url> <outdir> [WxH,...] [origins] ; env BAND=50 runs the OLD band for the before table.
   cases per origin x place: plate on every NPC + on her (worst case: 3-line tags) ; plain (2-line tags). cut = tag outside the stage rect (px). */
const {chromium}=require('playwright');const fs=require('fs');
const [,,URL,OUT,SIZES,ORIG]=process.argv;fs.mkdirSync(OUT,{recursive:true});const sleep=t=>new Promise(r=>setTimeout(r,t));
const BAND=+process.env.BAND||0,SHOT=process.env.SHOT||'';
(async()=>{const px=process.env.HTTPS_PROXY;const b=await chromium.launch(px?{proxy:{server:px,bypass:'127.0.0.1,localhost'}}:{});let tot=0,cut=0,worst=0;const rows=[];
 for(const sz of (SIZES||'755x1000,1180x820,1366x1024,412x1058,390x844').split(',')){const [W,H]=sz.split('x').map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:W<1100,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce',ignoreHTTPSErrors:true});
  const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function');await sleep(2000);
  await p.addStyleTag({content:'#kroul{display:none!important}'});
  for(const og of (ORIG||'thd,tt,td,cnv,muoi,dtq,cn,bd').split(',')){
   const ok=await p.evaluate(async([k,band])=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;window.__forceOrigin=k;document.getElementById('title').hidden=true;quiet=true;start();quiet=false;
    await new Promise(r=>{let n=0;const t=()=>{if((S&&S.origin)||++n>150)r();else setTimeout(t,100)};t()});Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true;const kr=document.getElementById('kroul');if(kr)kr.remove();if(band)KIT_SLOTS.band=band;return !!(S&&S.origin)},[og,BAND]);
   if(!ok){rows.push([sz,og,'no start']);continue}await sleep(500);
   for(const pl of ['home','vuon','lc']){for(const mode of ['plate','plain']){
    const r=await p.evaluate(async([pl,mode])=>{try{S.place=pl;const on=mode==='plate';const ppl=curPeople();
      const set=q=>{if(on){q.dh=Object.assign(q.dh||{},{nights:{n:5,i:1,at:[1,2]}});q.titleWorn="dh-nights"}else{q.titleWorn=null}};ppl.forEach(set);set(S);if(S.name&&on)S.name=S.name;render();
      for(let i=0;i<60;i++){const im=[...document.querySelectorAll('#stage .figimg,#stage img.j59sz')];if(im.length&&im.every(e=>e.complete&&e.naturalWidth))break;await new Promise(r=>setTimeout(r,250))}await new Promise(r=>setTimeout(r,700));
      const st=document.getElementById('stage');if(!st)return{n:0};const R=e=>e.getBoundingClientRect(),sr=R(st);const out=[];
      const tags=[...document.querySelectorAll('#stage #tokens .tok .tag,#stage #j59metag .tag')].filter(e=>e.offsetParent&&R(e).height>0);
      for(const t of tags){const r=R(t);if(r.right<=sr.left||r.left>=sr.right)continue;/* paged out (swipe stage), not in view */const k=t.querySelector('.kdh');out.push({n:(t.textContent||'').trim().slice(0,28),cutB:Math.round(Math.max(0,r.bottom-sr.bottom)),cutT:Math.round(Math.max(0,sr.top-r.top)),cutR:Math.round(Math.max(0,r.right-sr.right)),cutL:Math.round(Math.max(0,sr.left-r.left)),lines:t.querySelectorAll('.kdh,.j59t,.j59n').length,plate:!!k,h:Math.round(r.height)})}
      const feet=[...document.querySelectorAll('#stage #tokens .tok .figimg')].filter(e=>e.offsetParent).map(e=>Math.round(Math.max(0,R(e).bottom-sr.bottom)));
      return{n:out.length,out,feetCut:Math.max(0,...feet),place:S.place}}catch(e){return{err:e.message}}},[pl,mode]);
    if(r.err||!r.n){rows.push([sz,og,pl,mode,r.err||'no tags']);continue}
    for(const t of r.out){tot++;const c=Math.max(t.cutB,t.cutT,t.cutR,t.cutL);if(c>0){cut++;worst=Math.max(worst,c);rows.push([sz,og,pl,mode,t.n,'cut B'+t.cutB+' T'+t.cutT+' R'+t.cutR+' L'+t.cutL,'h'+t.h])}}
    if(r.feetCut>0){cut++;rows.push([sz,og,pl,mode,'FEET cut',r.feetCut])}
    if(SHOT&&og==='cnv'&&pl==='home'&&mode==='plate')await p.screenshot({path:`${OUT}/${sz}-${og}-${pl}-${mode}.png`});
   }}}
  if(errs.length)rows.push([sz,'pageerrors',errs.length,errs[0]]);await ctx.close()}
 await b.close();rows.forEach(r=>console.log(r.join(' ')));console.log(`TAGS ${tot} CUT ${cut} worst ${worst}px band ${BAND||'new(64)'}`)})();
