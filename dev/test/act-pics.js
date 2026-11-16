/* review/act-pics: play several weeks (random acts, random choices, random walks), capture every Sổ tuần the dawn builds
   (facts + the picture chosen for each) and every log line. Fold 755x1000@2.
   usage: node dev/test/act-pics.js <baseURL> <outdir> [weeks=4] [seed=7] [shots=0]
   Writes <outdir>/result.json {weeks:[{head,pages:[{title,facts:[[text,art,label]]}]}], logs, dupAdj, dupL, errs};
   with shots>0 also week<N>.jpg = the "Việc của ngươi" spread of the first <shots> weeks. */
const {chromium}=require('./lib/pw-roulette');const fs=require('fs');const [,,BASE,OUT,WK,SEED,SHOTS]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const sleep=t=>new Promise(r=>setTimeout(r,t));const WEEKS=+(WK||4);
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:755,height:1000},deviceScaleFactor:2,hasTouch:true,isMobile:true});
 const p=await ctx.newPage();p.setDefaultTimeout(180000);const errs=[],bad=[];p.on('pageerror',e=>errs.push(e.message));
 p.on('response',r=>{if(r.status()>=400&&/\.webp|\.json/.test(r.url()))bad.push(r.status()+' '+r.url())});
 await p.goto(BASE+'index.html',{waitUntil:'domcontentloaded'});
 for(let i=0;i<300;i++){const s=await p.evaluate(()=>{const b=document.querySelector('#kload [data-kl="go"]');if(b){b.click();return ''}return window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)&&!document.getElementById('kload')?'ok':''});if(s)break;await sleep(500)}
 await sleep(1500);
 await p.evaluate(seed=>{let x=+seed||7;Math.random=()=>{x=(x*1103515245+12345)%2147483648;return x/2147483648};
  SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;quiet=false;Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;
  window.__BK=[];const w0=wkBookPages;wkBookPages=function(){const r=w0.apply(this,arguments);try{window.__BK.push({head:r.head,pages:r.pages.map(pg=>({title:pg.title||(pg.who&&pg.who.name)||"",facts:[].concat(...(pg.blocks||[]).map(bl=>(bl.facts||[]).map(f=>[kpPlain(f.text||""),f.art||"",f.artT||""])))})).filter(pg=>pg.facts.length)})}catch(e){window.__BK.push({err:String(e)})}return r};
  window.__LOGS=[];const l0=log;log=function(t){try{window.__LOGS.push(kpPlain(String(t)))}catch(e){}return l0.apply(this,arguments)};
  render()},SEED||'7');
 await sleep(800);
 let shots=0;const broken=[],overflow=[];
 for(let step=0;step<6000;step++){
  const st=await p.evaluate(()=>{try{
   const bk=document.querySelector('#dawn.kbkdawn:not([hidden]) .kbk');if(bk)return 'book';
   if(S.dead)return 'dead';
   if(Q.length){const m=Q[0];if(m.opts&&m.opts.length){const ok=m.opts.map((o,i)=>i).filter(i=>{const c=m.opts[i];return !(c.fx&&c.fx.bac&&S.bac+c.fx.bac<0)});const i=ok.length?ok[Math.floor(Math.random()*ok.length)]:0;try{chooseM(i)}catch(e){Q.shift();showModal()}}else{try{closeModal()}catch(e){Q.shift();showModal()}}return 'q'}
   if(S.mg){try{S.mg=null;render()}catch(e){}return 'mg'}
   const can_=deck.map((a,i)=>i).filter(i=>{const a=deck[i];return a&&!a.done&&!(a.b!=null&&(S.buoi||0)!==a.b)&&can(cardCost(a))&&canPay(a)});
   const r=Math.random();
   if(r<0.2){const ks=places().map(x=>x.k).filter(k=>k!==S.place);const k=ks[Math.floor(Math.random()*ks.length)];try{if(typeof j77Tap==="function")j77Tap(k);else goTo(k)}catch(e){}return 'go'}
   if(can_.length&&r<0.93){act(can_[Math.floor(Math.random()*can_.length)]);return 'act'}
   nextBuoi();return 'next'}catch(e){return 'err '+e.message}});
  if(st==='book'){const n=await p.evaluate(()=>window.__BK.length);
   if(SHOTS&&shots<+SHOTS){
    const mx=await p.evaluate(()=>window.__kbk.max);let found=false;
    for(let k=0;k<14&&!found;k++){await p.evaluate(k=>window.__kbk.go(k),k);await sleep(700);
     found=await p.evaluate(()=>{const b=document.querySelector('#dawn .kbk-book');if(!b)return false;const r=b.getBoundingClientRect();return [[.3,.5],[.7,.5],[.5,.3]].some(([fx,fy])=>document.elementsFromPoint(r.left+r.width*fx,r.top+r.height*fy).some(e=>e.classList&&e.classList.contains('kbk-face')&&/Việc của ngươi/.test(e.textContent)))})}
    if(found){await p.evaluate(()=>Promise.all([...document.querySelectorAll('#dawn img.kbk-evart')].map(i=>i.complete?0:new Promise(r=>{i.onload=i.onerror=r;setTimeout(r,8000)}))));await sleep(1200);
     broken.push(await p.evaluate(()=>[...document.querySelectorAll('#dawn img.kbk-evart')].filter(i=>!i.naturalWidth).map(i=>i.getAttribute('src'))));
     overflow.push(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth));
     await p.screenshot({path:`${OUT}/week${n}.jpg`,type:'jpeg',quality:80});shots++}}
   await p.evaluate(()=>{try{window.__kbk.close()}catch(e){}});await sleep(400);if(n>=WEEKS)break;continue}
  if(st==='dead')break;
 }
 const R=await p.evaluate(()=>({weeks:window.__BK,logs:window.__LOGS}));
 let dup=0;const dupL=[];for(const w of R.weeks)for(const pg of (w.pages||[]))for(let i=1;i<pg.facts.length;i++){const a=pg.facts[i-1],c=pg.facts[i];if(a[1]&&a[1]===c[1]&&a[0]!==c[0]){dup++;dupL.push([pg.title,a[0],c[0],a[1]])}}
 R.dupAdj=dup;R.dupL=dupL;R.broken=broken;R.overflow=overflow;R.errs=errs;R.bad=bad;fs.writeFileSync(`${OUT}/result.json`,JSON.stringify(R,null,1));
 console.log(JSON.stringify({weeks:R.weeks.length,logs:R.logs.length,dupAdj:dup,errs:errs.slice(0,5),bad:bad.slice(0,5),broken:[].concat(...broken),overflow}));await b.close()})();
