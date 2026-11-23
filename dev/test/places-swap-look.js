const {chromium}=require('playwright');const [,,URL,OUT]=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
const WANT=process.env.ONLY?process.env.ONLY.split(','):['a-ca-so','ngu-thu-phong','tu-ninh-cung','dong-cung','thuong-thu-phong','phi-tan-cung'];
(async()=>{const b=await chromium.launch();
for(const [W,H] of [[755,1000],[1180,820]]){
 const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:2,hasTouch:true,isMobile:W<1000,serviceWorkers:'block'});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.setDefaultTimeout(240000);
 await p.addInitScript(()=>{window.__nlInner=1});
 await p.route(/ctmload=1/,r=>r.abort());await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await sleep(1500);
 await p.evaluate(()=>{window.__forceOrigin='thd';SLOT=3;document.getElementById('title').hidden=true;start();window.__nlInner=0;quiet=false;Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;S.buoi=0;used=0;deal();render();document.querySelectorAll('#kload,.krbox,#kroul').forEach(e=>e.remove())});
 await sleep(1200);await p.addStyleTag({content:'#kroul,#kload,.kmov,.kmfls,#kpodov,#dawn,#kmrew{display:none!important}'});
 const map=await p.evaluate(W=>{const ks=new Set(Object.keys(PLNAME));for(const k in (typeof PLX==='object'?PLX:{}))ks.add(k);const o={};
   const mo=SEASON.findIndex(s=>SCN_SEAS[s]==='ha');S.month=mo+1;S.buoi=0;
   for(const k of ks){try{const P=placeOf(k);const f=SCIMG[P.sc];const base=f&&f.replace(/-(xuan|ha|thu|dong)-(sang|trua|chieu|toi)$/,'');if(W.includes(base)&&!o[base])o[base]=k}catch(e){}}if(!o['phi-tan-cung'])for(let i=0;i<60;i++){try{const a=kitPlaceArt('r'+i);if(a&&/phi-tan-cung/.test(a.src)){o['phi-tan-cung']='r'+i;break}}catch(e){}}return o},WANT);
 console.log(W,'map',JSON.stringify(map));
 for(const base of WANT){const k=map[base];if(!k){console.log('NO KEY',base);continue}
  const src=await p.evaluate(k=>{Q.length=0;const m={t:palName(k),h:'',opts:[{t:'Đóng'}]};Q.push(m);kitPlaceDress(m,k);showModal();const a=kitPlaceArt(k);return a&&a.src},k);
  await p.waitForFunction(()=>[...document.querySelectorAll('#modal img')].every(i=>i.complete)).catch(()=>{});await sleep(2500);
  const info=await p.evaluate(()=>{const im=[...document.querySelectorAll('#modal img, #modal [style*=background]')].map(e=>(e.currentSrc||e.style.backgroundImage||'').slice(-60));return im.slice(0,3)});
  console.log(W,base,k,src&&src.split('/').pop(),JSON.stringify(info));
  await p.screenshot({path:`${OUT}/${W}-${base}.jpg`,type:'jpeg',quality:70});}
 console.log(W,'errors',errs.length,errs.slice(0,2));await ctx.close()}
await b.close()})();
