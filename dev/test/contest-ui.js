/* contest-ui (C34): picture left / info right on the game frame, no empty counters on the intro, rivals box scrolls alone, real prizes by place,
   podium figures at one scale, contestants known. usage: node dev/test/contest-ui.js <baseURL> <W>x<H>@dpr <outdir> */
const {chromium}=require('playwright');
const [,,BASE,SZ,OUT]=process.argv;const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);const tag=SZ.replace('@','_');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({serviceWorkers:'block',viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:+(DPR||1)});
 const p=await ctx.newPage();p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))errs.push('console: '+m.text())});
 const out={size:SZ};
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await p.waitForTimeout(2500);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;start()});
 await p.waitForFunction(()=>typeof S!=="undefined"&&S&&S.name&&typeof KIT_CDNHAVE!=="undefined"&&KIT_CDNHAVE,null,{timeout:90000});await p.waitForTimeout(2000);
 await p.addStyleTag({content:'#kroul,#kroulw{display:none!important}'});
 await p.evaluate(()=>{document.querySelectorAll('#kroul,#kroulw').forEach(e=>e.remove());Q.length=0;document.getElementById('modal').hidden=true;render()});
 await p.evaluate(()=>{Q.length=0;Object.assign(S.arts,{cam:5,ky:5,thi:5,hoa:5,vu:5,y:5});S.tai=95;S.bac=10;window.__rv=liveRivals(true).slice(0,5);window.__rv.forEach(v=>{if(S.known)delete S.known[kOf61(v)];if(S.met)delete S.met[v.id];v.tai=20;Object.keys(v.arts||{}).forEach(k=>v.arts[k]=0)});
  window.__pre=window.__rv.map(v=>kitIsKnown(v));
  startContest({art:'hoa',title:'Tết Thất tịch · Cắm thế thiên – nhân – địa',artName:'cắm hoa',rivals:window.__rv,prep:3,big:true,fk:'tt',stakes:{win:{sung:8,danh:3},top3:[["Danh",1]],last:[["Danh",-1]],paid:[["Sức",-6]]},onDone:r=>window.__res=r})});
 await p.waitForTimeout(900);await p.waitForFunction(()=>{const i=document.querySelector('#kg82 .kgpic img');return !i||(i.complete&&i.naturalWidth>0)},null,{timeout:20000}).catch(()=>{});await p.waitForTimeout(1500);
 out.intro=await p.evaluate(()=>{const d=document.getElementById('kg82'),pic=d.querySelector('.kgpic'),inf=d.querySelector('.kginfo'),hud=d.querySelector('.kghud'),rv=d.querySelector('.kgrv');
  const r=e=>e?e.getBoundingClientRect():null;const pr=r(pic),ir=r(inf),dr=r(d);const wide=innerWidth>=700;
  return{wide,pic:!!pic,picLeftOfInfo:wide?(pr.right<=ir.left+2):(pr.bottom<=ir.top+2),hudHidden:getComputedStyle(hud).display==='none',rv:!!rv,rvScrolls:rv?rv.scrollHeight>rv.clientHeight+1||getComputedStyle(rv).overflowY==='auto':null,
   panelInView:dr.bottom<=innerHeight+1&&dr.top>=-1,goVisible:(()=>{const g=document.getElementById('kg82go').getBoundingClientRect();return g.bottom<=innerHeight+1&&g.top>=0})(),
   panelScroll:d.scrollHeight>d.clientHeight+2,picLoaded:pic?(pic.querySelector('img').complete&&pic.querySelector('img').naturalWidth>0):false,
   met:window.__rv.map(v=>kitIsKnown(v)),pre:window.__pre,overX:document.documentElement.scrollWidth>innerWidth}});
 await p.screenshot({path:`${OUT}/intro-${tag}.jpg`,type:'jpeg',quality:60});
 await p.locator('#kg82skip').tap();await p.waitForTimeout(900);
 out.podium=await p.evaluate(()=>{const r=document.querySelector('.kpod');if(!r)return{missing:true};const f=[...r.querySelectorAll('.kpod-fig')].map(e=>Math.round(e.offsetHeight));
  const im=[...r.querySelectorAll('.kpod-img')].map(e=>e.offsetHeight);
  const hb=r.querySelector('.kpod-hd').getBoundingClientRect().bottom;const tops=[...r.querySelectorAll('.kpod-img,.kpod-you')].map(e=>e.getBoundingClientRect().top);const fb=r.querySelector('.kpod-next').getBoundingClientRect();const sb=Math.max(...[...r.querySelectorAll('.kpod-step')].map(e=>e.getBoundingClientRect().bottom));
  return{clearOfHeader:Math.min(...tops)>=hb-1,stepsAboveFooter:sb<=fb.top+1,hdBottom:Math.round(hb),figH:f,imgH:im,sameFig:Math.max(...f)-Math.min(...f)<=1,unk:r.querySelectorAll('.kpod-unk').length,chips:[...r.querySelectorAll('.kpod-plq')].map(e=>e.querySelectorAll('.kchip').length),txt:r.innerText.replace(/\n+/g,' | ').slice(0,420)}});
 await p.waitForTimeout(3500);await p.screenshot({path:`${OUT}/podium-${tag}.jpg`,type:'jpeg',quality:60});
 await p.locator('.kpod-next').click({force:true});await p.waitForTimeout(2500);
 out.chest=await p.evaluate(()=>({kmrew:!!document.getElementById('kmrew'),last:window.CU&&CU.last&&{place:CU.last.mine&&CU.last.mine.place,k:CU.last.mine&&CU.last.mine.k,bac:CU.last.mine&&CU.last.mine.bac,title:CU.last.mine&&CU.last.mine.title,pl:CU.last.places.map(x=>[x.k,x.bac])},bac:S.bac,honors:S.honors}));
 await p.screenshot({path:`${OUT}/chest-${tag}.jpg`,type:'jpeg',quality:60});
 await p.evaluate(()=>{const t=document.querySelector('#kmrew [data-km-close]');if(document.getElementById('kmrew')){document.getElementById('kmrew').click();}});
 await p.waitForTimeout(500);await p.evaluate(()=>{const e=document.getElementById('kmrew');if(e){e.click();}});await p.waitForTimeout(3500);
 await p.evaluate(()=>{const b=document.querySelector('#kmrew [data-km-close]');if(b)b.click()});await p.waitForTimeout(600);
 out.result=await p.evaluate(()=>{const d=document.getElementById('kg82');if(!d)return{missing:true};const pic=d.querySelector('.kgpic'),res=d.querySelector('.kgres');const wide=innerWidth>=700;
  const pr=pic&&pic.getBoundingClientRect(),rr=res.getBoundingClientRect();return{wide,picLeft:pic?(wide?pr.right<=rr.left+2:pr.bottom<=rr.top+2):'nopic',hasPrize:/Ban thưởng hội thi/.test(d.innerText),hasTitle:/Danh hiệu/.test(d.innerText),ok:!!document.getElementById('kg82ok'),overX:document.documentElement.scrollWidth>innerWidth}});
 await p.screenshot({path:`${OUT}/result-${tag}.jpg`,type:'jpeg',quality:60});
 out.errs=errs;console.log(JSON.stringify(out));await b.close()})();
