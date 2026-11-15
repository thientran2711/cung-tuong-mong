/* review/kit-fig2: KIT §48 kitNameRank — the person's rank + name sit ABOVE the portrait / figure everywhere.
   usage: node dev/test/name-rank.js <build url> <outdir> <tag> [WxH@dpr,...]
   Shots of Hậu cung › Phi tần, Cung nhân, Hoàng thượng person cards; measures for each visible portrait: name-block bottom ≤ picture top. */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,OUT,TAG,SIZES]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();const R=[];
 for(const sz of (SIZES||"755x1000@2,1000x755@2,1180x820@2,844x390@3").split(",")){const [wh,dpr]=sz.split("@");const [W,H]=wh.split("x").map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+dpr,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});
  const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof render==='function');await sleep(2500);
  await p.addStyleTag({content:'#kroul{display:none!important}'});
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;
   for(let i=0;i<400;i++){start();if(!isSrv())break}Q.length=0;const md=document.getElementById("modal");if(md)md.hidden=true;try{NLP=null}catch(e){}
   S.met=S.met||{};liveRivals(true).forEach(v=>{S.met[v.id]=1;try{S.known[kOf61(v)]=3}catch(e){}});render()});
  await sleep(1000);const res={};
  for(const t of ["rv","staff","court"]){
   await p.evaluate(t=>{tab=t;render();window.scrollTo(0,0);const P=document.getElementById('panel');if(P)P.scrollTop=0},t);await sleep(1500);
   await p.evaluate(()=>Promise.all([...document.querySelectorAll('#panel img')].map(i=>i.complete?0:new Promise(r=>{i.onload=i.onerror=r;setTimeout(r,6000)}))));
   for(let k=0;k<3;k++){try{await p.screenshot({path:`${OUT}/card-${t}-${TAG}-${wh}.jpg`,type:'jpeg',quality:72,timeout:120000});break}catch(e){await sleep(2000)}}
   res[t]=await p.evaluate(()=>{const P=document.getElementById('panel');const R=e=>e.getBoundingClientRect();
    return [...P.querySelectorAll('.pc')].filter(c=>c.offsetParent).slice(0,2).map(c=>{const pic=c.querySelector('.pcl > .pcp')||c.querySelector('.pcl .kpor');
     const nm=c.querySelector('.pcl .knr, .pcl .pcname, .pcl .kpnm');if(!pic||!nm)return{missing:!pic?'pic':'name'};const a=R(nm),q=R(pic);
     return{name:nm.textContent.replace(/\s+/g,' ').trim().slice(0,40),nameBottom:Math.round(a.bottom),picTop:Math.round(q.top),above:a.bottom<=q.top+2}})});
  }
  R.push({sz,res,errs});await ctx.close()}
 console.log(JSON.stringify(R,null,1));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
