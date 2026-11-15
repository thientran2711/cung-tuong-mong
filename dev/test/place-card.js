/* place card test (KIT 32.8): opens the place card for 6 situations, screenshots each, prints picture / layout / cut text / scrollers / errors.
   usage: node dev/test/place-card.js <site url> <W>x<H>@dpr <outdir> <tag> [kinds]
   kinds: spill (walk spills into the next buổi) · last (arriving ends the buổi) · night (not enough khắc at night) · rank (Emperor's hall,
   locked by rank) · etq (must greet the chủ vị) · sneak (Xin bái kiến / Lẻn vào) */
const {chromium}=require('playwright');
const [,,URL,SZ,OUT,TAG,KINDS]=process.argv;const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);
const kinds=(KINDS||'spill,last,night,rank,etq,sneak').split(',');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:+(DPR||1),reducedMotion:'reduce',serviceWorkers:'block'});
 const p=await ctx.newPage();p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await p.waitForTimeout(2500);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){start();if(!isSrv())break}
  Q.length=0;const md=document.getElementById("modal");if(md)md.hidden=true;try{NLP=null}catch(e){}
  const s=document.createElement("style");s.textContent=".kroul{display:none!important}";document.head.appendChild(s);tab="go";render()});
 for(let i=0;i<15;i++){await p.waitForTimeout(400);const srv=await p.evaluate(()=>{const s=isSrv();if(s){Q.length=0;start()}return s});if(!srv)break}
 await p.evaluate(()=>{Q.length=0;const md=document.getElementById("modal");if(md)md.hidden=true;tab="go";render()});
 await p.waitForTimeout(1200);
 const res={};
 for(const k of kinds){
  res[k]={setup:await p.evaluate(k=>{document.querySelectorAll(".kroul").forEach(e=>e.remove());Q.length=0;document.getElementById('modal').hidden=true;
   S.place="home";S.visit={k:"home",people:homePeople(),talked:false,tk:{}};S.out=0;S.confined=0;window.__walkSpill=null;S.wx=S.wx||{};tab="go";
   const C={spill:[0,3,'tyv',1],last:[0,2,'tyv',0],night:[2,3,'r5',1],rank:[0,0,'thu',0],sneak:[1,0,'kn',0]}[k];
   let place;
   if(k==='etq'){S.buoi=0;used=0;S.wx.f=0;place=places().map(x=>x.k).find(x=>{try{return accEtq(S,x)&&accessOf(S,x).ok}catch(e){return false}});
    if(!place){const R=liveRivals(false).filter(v=>v.alive&&!v.out&&rkOf(v)>rkOf(S)+1);const h=R[0];if(h){place=palaceOf(h);S.where[h.id]=place}}}
   else{S.buoi=C[0];used=C[1];place=C[2];S.wx.f=C[3]?1:0}
   if(k==='sneak'){S.acPass={};S.invite=null}render();j77Tap(place);return{place,buoi:S.buoi,srv:isSrv(),acc:(accessOf(S,place)||{}).why,left:4-used,tc:travel(S.place,place)}},k)};
  await p.waitForTimeout(1500);
  for(let t=0;t<3;t++){try{await p.screenshot({path:`${OUT}/${TAG}-${k}.jpg`,type:'jpeg',quality:80});break}catch(e){await p.waitForTimeout(2000)}}
  Object.assign(res[k],await p.evaluate(()=>{const M=document.getElementById('modal');if(!M||M.hidden)return{shown:false};const d=M.querySelector('.dlg');
   const r=e=>{if(!e)return null;const q=e.getBoundingClientRect();return [Math.round(q.left),Math.round(q.top),Math.round(q.width),Math.round(q.height)]};const vis=e=>e&&e.offsetParent;
   const cut=[...M.querySelectorAll('button, p, figcaption, .kplinfo *, .opt small')].filter(e=>vis(e)&&e.scrollWidth>e.clientWidth+2&&getComputedStyle(e).overflow!=='visible').map(e=>e.textContent.slice(0,40));
   const scr=[...M.querySelectorAll('*')].concat([d]).filter(e=>vis(e)&&e.scrollHeight>e.clientHeight+2&&/auto|scroll/.test(getComputedStyle(e).overflowY)).map(e=>e.id||e.className);
   const dd=d.getBoundingClientRect();const out=[...M.querySelectorAll('.dlg *')].filter(vis).filter(e=>{const q=e.getBoundingClientRect();return q.width&&(q.left<dd.left-1||q.right>dd.right+1)}).map(e=>e.className).slice(0,5);
   const img=M.querySelector('.kdlgart img, .kplpic img');const o=M.querySelector('#mb .opts');
   return{title:document.getElementById('mt').textContent,dlg:r(d),pic:img?img.getAttribute('src'):null,picBox:r(img),sil:M.querySelectorAll('.kplsil').length,
    optsCls:o?o.className:null,opts:[...M.querySelectorAll('#mb .opts > button')].map(x=>[x.innerText.replace(/\s+/g,' ').trim().slice(0,90),r(x)]),
    btn:[...M.querySelectorAll('.dlg > .kbtnrow button, .dlg #mclose, .dlg .mbtn')].filter(vis).map(x=>x.innerText.trim()),
    info:(M.querySelector('.kplinfo')||M.querySelector('#mb .kpmain')||{}).innerText,cut,scr,out,hovf:document.documentElement.scrollWidth>innerWidth+1,fits:dd.bottom<=innerHeight+1&&dd.top>=-1}}));
 }
 console.log(JSON.stringify({TAG,res,errs}));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
