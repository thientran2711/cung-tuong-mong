/* review/hau-cung-ui shots + checks (Hậu cung / Giao tình tabs, thẻ quan hệ 3 cột, portrait box, week book, download chip).
   usage: node dev/test/hau-cung-ui.js <url of a build page> <W>x<H>@dpr <outdir> <tag> [steps,comma]
   steps: port rel staff court men rv book chip curl   (default: all)
   Prints JSON: per step overflowX, clipped text, text under the download chip; port = portrait box rect for 10 people (first frame -> settled). */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs');
const [,,BASE,SZ,OUT,TAG,ONLY]=process.argv;const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:+(DPR||1),reducedMotion:'reduce'});
 await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
 const p=await ctx.newPage();await require('./lib/veil').guard(p);p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForTimeout(3000);
 await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;
  for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}
  Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;
  for(let i=0;i<5;i++){try{nextBuoi()}catch(e){}Q.length=0}
  kn();for(const v of rivals){S.met[v.id]=1;try{intelLearn(v,3,{by:S.maid.name,how:"Sai đi dò la"})}catch(e){};try{noteAdd(v.id,S.maid.name+" dò được: nàng thích hoa mai.")}catch(e){}}
  try{for(const v of rivals)k61Meet(v,"gặp",3);k61Meet(S.emp,"gặp",3)}catch(e){}
  Q.length=0;if(m)m.hidden=true;const w=document.getElementById('dawn');if(w){w.hidden=true;w.innerHTML='';w.classList.remove('on')}document.body.classList.remove('kbk-open');try{render()}catch(e){}});
 await p.waitForTimeout(1500);
 const shot=n=>p.screenshot({path:`${OUT}/${TAG}-${n}.jpg`,type:'jpeg',quality:80});
 const R={};const meas=async k=>{R[k]=await p.evaluate(()=>{const vw=innerWidth;
  const cut=[...document.querySelectorAll('#panel *, .kbk *')].filter(e=>e.offsetParent&&e.children.length===0&&e.scrollWidth>e.clientWidth+2&&['hidden','clip'].includes(getComputedStyle(e).overflowX)).slice(0,8).map(e=>e.className+':'+e.textContent.slice(0,30));
  const c=document.querySelector('#krail [data-rail="st-dl"]');let cov=[];if(c&&!c.hidden&&getComputedStyle(c).visibility!=='hidden'){const r=c.getBoundingClientRect();
   cov=[...document.querySelectorAll('#panel *, #tabs *, #stage *')].filter(e=>{if(e.children.length||!e.textContent.trim()||!e.offsetParent)return false;const q=e.getBoundingClientRect();const pr=document.getElementById('panel').getBoundingClientRect();if(e.closest('#panel')&&(q.bottom<=pr.top||q.top>=pr.bottom))return false;return q.width&&q.right>r.left&&q.left<r.right&&q.bottom>r.top&&q.top<r.bottom}).slice(0,5).map(e=>e.textContent.trim().slice(0,30))}
  const sub=[...document.querySelectorAll('.ksubb')].filter(e=>e.scrollWidth>e.clientWidth+1).map(e=>e.textContent);
  return{ovf:document.documentElement.scrollWidth>vw+1,cut,cov,subCut:sub}})};
 const tab=async t=>{await p.evaluate(t=>{tab=t;render()},t);await p.waitForTimeout(1800)};
 const rect=()=>{const e=document.querySelector('#panel .pc>.pcl>.pcp.kit');const r=e?e.getBoundingClientRect():{};return [Math.round(r.left),Math.round(r.top),Math.round(r.width),Math.round(r.height)].join(',')};
 const steps=(ONLY||'port,rel,staff,court,men,rv,book,chip').split(',');
 for(const s of steps){
  if(s==='port'){await tab('rv');R.port=[];for(let i=0;i<10;i++){
    const a=await p.evaluate(([i,rs])=>new Promise(ok=>{PG.rv=i;renderPanel();requestAnimationFrame(()=>ok(new Function('return ('+rs+')()')()))}),[i,rect.toString()]);
    await p.waitForTimeout(700);const z=await p.evaluate(rs=>new Function('return ('+rs+')()')(),rect.toString());R.port.push(a===z?z:a+'->'+z)}
   R.portSame=new Set(R.port).size===1;await shot('phitan-khung')}
  if(s==='rel'){await tab('rel');await shot('aanoan');await meas('rel');
   await p.evaluate(()=>{const b=document.querySelectorAll('.relsel button[data-rel]')[2];if(b)b.click()});await p.waitForTimeout(1500);await shot('aanoan-nguoikhac');await meas('rel2')}
  if(s==='staff'){await tab('staff');await shot('cungnhan');await meas('staff')}
  if(s==='court'){await tab('court');await shot('thanhthuong');await meas('court');await p.evaluate(()=>{PG.court=1;renderPanel()});await p.waitForTimeout(1200);await shot('thaihau');await meas('court2')}
  if(s==='men'){await p.evaluate(()=>{try{menInit();(S.men||[]).slice(0,4).forEach((m,j)=>{try{k61Meet(m,"gặp",j<3?3:1)}catch(e){}})}catch(e){}});await tab('men');await shot('namnhan');await meas('men');R.menNames=await p.evaluate(()=>(S.men||[]).map(m=>m.name))}
  if(s==='rv'){for(const r of [7,6,5,4,3]){await p.evaluate(r=>{let i=rivals.findIndex(v=>v.alive&&rkOf(v)===r);if(i<0){i=rivals.findIndex(v=>v.alive&&!v.queen&&rkOf(v)<3);if(i>=0)rivals[i].rank=r}PG.rv=Math.max(0,i)},r);await tab('rv');await p.waitForTimeout(600);await shot('phitan-r'+r);await meas('rv'+r)}}
  if(s==='book'){await p.evaluate(()=>{try{Q.length=0;dawn()}catch(e){console.error(e)}});await p.waitForTimeout(2500);
   for(let i=0;i<4;i++){await shot('sotuan-'+i);await meas('book'+i);await p.evaluate(()=>{const n=document.querySelector('.kbk-next');if(n)n.click()});await p.waitForTimeout(1800)}
   await p.evaluate(()=>{const w=document.getElementById('dawn');if(w){w.hidden=true;w.innerHTML=''}document.body.classList.remove('kbk-open')})}
  if(s==='chip'){await p.evaluate(()=>{if(window.KLOAD&&KLOAD.testChip)KLOAD.testChip(37e6,635e6)});
   for(const t of ['staff','rv','rel','act']){await tab(t);await p.waitForTimeout(1600);await shot('chip-'+t);await meas('chip-'+t)}}
 }
 console.log(JSON.stringify({TAG,R,errs}));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
