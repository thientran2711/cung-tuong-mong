/* j90: the celebration follows her place. usage: node dev/test/podium-place.js <baseURL> <W>x<H>@dpr <outdir>
   Shots: place-1 / place-2 / place-3 (her place; light + petals over her step, frozen mid-fall), place-5 (outside the top: lights only). */
const {chromium}=require('playwright');
const [,,BASE,SZ,OUT]=process.argv;const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);const tag=SZ.replace('@','_');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:+(DPR||1)});
 const p=await ctx.newPage();p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;start();Q.length=0;render();setTimeout(()=>{Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true},50)});
 await p.waitForTimeout(1200);const out=[];
 for(const place of [1,2,3,5]){
  await p.evaluate(place=>{const R=liveRivals(true).slice(0,4);const L=R.map(v=>({who:v}));L.splice(place-1,0,{who:S});
   kitPodiumShow(L.map((x,i)=>({who:x.who,place:i+1,score:90-i*7,prize:i===0?[["Sủng",8],["Danh",3]]:i<3?[["Danh",1]]:null})),{title:'Hội Thượng nguyên · Nối vần',sub:'Môn Thơ'})},place);
  if(place<=3){await p.waitForFunction(()=>document.querySelectorAll('.kpc').length>25,null,{timeout:15000}).catch(()=>{});
   await p.waitForTimeout(250);
   await p.evaluate(()=>{document.querySelector('.kpod').classList.add('kpod-skip');document.querySelectorAll('.kpc').forEach(e=>e.getAnimations().forEach(a=>{a.pause();a.currentTime=650}))})}
  else{await p.waitForTimeout(800);await p.evaluate(()=>document.querySelector('.kpod').classList.add('kpod-skip'));await p.waitForTimeout(3000)}
  await p.waitForTimeout(200);
  const info=await p.evaluate(()=>{const r=document.querySelector('.kpod');const vw=innerWidth,vh=innerHeight;const bad=[];
   r.querySelectorAll('.kpod-plq,.kpod-plq *,.kpod-next,.kpod-mine').forEach(e=>{const q=e.getBoundingClientRect();if(q.width&&(q.left<-1||q.right>vw+1||q.top<-1||q.bottom>vh+1))bad.push(e.className)});
   const pcs=[...document.querySelectorAll('.kpc')].map(e=>e.getBoundingClientRect().left+e.getBoundingClientRect().width/2);
   const cols=Object.fromEntries([...r.querySelectorAll('.kpod-col')].map(c=>{const q=c.getBoundingClientRect();return[c.className.match(/kpod-p\d/)[0],[Math.round(q.left),Math.round(q.right)]]}));
   const mean=pcs.length?Math.round(pcs.reduce((a,b)=>a+b,0)/pcs.length):null;
   return{cls:r.className,pieces:pcs.length,meanX:mean,cols,bad,overflowX:document.documentElement.scrollWidth>vw,rays:!!r.querySelector('.kpod-rays')}});
  await p.screenshot({path:`${OUT}/place-${place}-${tag}.png`});out.push({place,...info});
  await p.evaluate(()=>kitPodiumClose());await p.waitForTimeout(300)}
 console.log(JSON.stringify({size:SZ,out,errors:errs}));await b.close()})();
