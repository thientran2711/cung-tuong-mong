/* review/fig-headtop (owner 17/11): people stand level by the HEAD TOP. Event dialog with a crowned Hoàng hậu beside a low-rank woman (stage:[queen, low]).
   usage: node dev/test/fig-headtop.js <build url> <outdir> <tag> [WxH@dpr,...]
   Measures, with the head-top TABLE (img/fig-ht.json — independent of the build under test): per figure the on-screen head-top y, feet y, painted top y;
   prints head-top spread (|Δ head top| / body height) and the body heights. Shots go to <outdir> (never commit them). */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,OUT,TAG,SIZES]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const UNKV=process.env.UNK==='1';const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();const R={};
 for(const sz of (SIZES||"755x1000@2,1180x820@2").split(",")){const [wh,dpr]=sz.split("@");const [W,H]=wh.split("x").map(Number);const errs=[];
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+dpr,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});
  const p=await ctx.newPage();p.setDefaultTimeout(240000);p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await sleep(2500);
  await p.addStyleTag({content:'#kroul{display:none!important}'});
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<400;i++){start();if(!isSrv())break}Q.length=0;document.getElementById('modal').hidden=true;render()});await sleep(800);
  const tab=await p.evaluate(()=>fetch('https://ctm-img.victoria-tntt.workers.dev/img/fig-ht.json').then(r=>r.json()));
  await p.evaluate(UNK=>{Q.length=0;document.getElementById('modal').hidden=true;const R0=liveRivals(true);const q=R0.find(v=>v.queen)||R0[0];const lows=R0.filter(v=>!v.queen).sort((a,c)=>(a.rk||0)-(c.rk||0));kn();window.kitKnown=()=>!UNK;[q,lows[0],lows[1]].forEach(v=>{S.met[v.id]=1});
    S.place="home";S.visit={k:"home",people:[q,lows[0],lows[1]].filter(Boolean),talked:false,tk:{}};render()},!!UNKV);await sleep(1500);
  await p.evaluate(()=>Promise.all([...document.querySelectorAll('#stage img')].map(i=>i.complete?0:new Promise(r=>{i.onload=i.onerror=r;setTimeout(r,8000)}))));await sleep(2500);
  await p.screenshot({path:`${OUT}/ht-${TAG}-${wh}.jpg`,type:'jpeg',quality:75});
  R[sz]=await p.evaluate(tab=>{const st=document.getElementById('stage');
   const figs=[...st.querySelectorAll('img')].filter(im=>/fig-/.test(im.getAttribute('src'))&&im.getBoundingClientRect().height>50).map(im=>{const r=im.getBoundingClientRect(),n=im.getAttribute('src').split('?')[0].split('/').pop(),fb=(window.__KITFB||{})[im.getAttribute('src')],v=fb&&fb.v||{t:0,b:1};const ht=tab[n]!=null?tab[n]/4000:v.t;
    const head=r.top+ht*r.height,feet=r.top+v.b*r.height,paint=r.top+v.t*r.height;const cx=r.left+((v.cl!=null?v.cl+v.cr:v.l+v.r)/2)*r.width;return{n,cx:+cx.toFixed(1),head:+head.toFixed(1),feet:+feet.toFixed(1),paint:+paint.toFixed(1),body:+(feet-head).toFixed(1)}});return{shown:true,figs}},tab);
  {const f=R[sz].figs||[];if(f.length>1){f.sort((a,c)=>a.cx-c.cx);R[sz].gaps=f.slice(1).map((x,i)=>+(x.cx-f[i].cx).toFixed(1));const mb=Math.max(...f.map(x=>x.body));R[sz].spread=+((Math.max(...f.map(x=>x.head))-Math.min(...f.map(x=>x.head)))/mb).toFixed(4)}}
  R[sz].errs=errs;await ctx.close()}
 console.log(JSON.stringify(R,null,1));await b.close()})();
