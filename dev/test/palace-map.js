/* kitPalaceMap (KIT §33) on the live layout: Dư đồ → Cảnh Phúc detail (counts per hall) → Đông phối điện room (its people) → back.
   usage: node dev/test/palace-map.js <url of dev/index.html> <W>x<H>@dpr <outdir> <tag>
   Serves the repo itself at http://t.local/ (no server). Writes <tag>-1-map.jpg, -2-detail.jpg, -3-room.jpg, -4-back.jpg; prints checks. */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');
const [,,BASE,SZ,OUT,TAG]=process.argv;const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);const ROOT=path.resolve(__dirname,'../..');
const MT={html:'text/html; charset=utf-8',js:'text/javascript',json:'application/json',webp:'image/webp',png:'image/png',jpg:'image/jpeg',mp3:'audio/mpeg',ogg:'audio/ogg',css:'text/css'};
(async()=>{const px=process.env.HTTPS_PROXY?{server:process.env.HTTPS_PROXY,bypass:'127.0.0.1,localhost'}:undefined;const b=await chromium.launch(px?{proxy:px}:{});const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:+(DPR||1),reducedMotion:'reduce',ignoreHTTPSErrors:true});
 const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message));
 const shot=async n=>{await p.waitForTimeout(2500);await p.screenshot({path:`${OUT}/${TAG}-${n}.jpg`,type:'jpeg',quality:82,animations:'disabled'})};
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&document.getElementById('title'),null,{timeout:180000});await p.waitForTimeout(2500);
 await p.evaluate(()=>{try{localStorage.clear()}catch(e){}setInterval(()=>{document.querySelectorAll('#kroul,#kroulw,.kroul,#kload').forEach(r=>r.remove())},200)});
 for(let i=0;i<8&&!(await p.evaluate(()=>typeof S!=='undefined'&&!!S&&typeof rivals!=='undefined'&&!!rivals&&rivals.length>0));i++){await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;for(let j=0;j<30;j++){try{store.set(NL_KEY,null)}catch(e){}try{start()}catch(e){}if(!(typeof isSrv==='function'&&isSrv()))break}});await p.waitForTimeout(2000)}
 await p.waitForTimeout(1500);
 const setup=await p.evaluate(()=>{Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;
  /* Cảnh Phúc (slot 0): a Phi as chủ vị, three lower consorts in its side halls; she is a Phi too (no greeting card) */
  const L=rivals.filter(v=>v.alive&&!v.out&&!v.queen);const hd=L[0];hd.rank=4;rivals.forEach(v=>{if(v!==hd&&v.pal===0)v.pal=null});hd.pal=0;
  const side=L.filter(v=>v!==hd&&rkOf(v)<PAL_HEAD).slice(0,3);side.forEach(v=>v.resHead=hd.id);S.rank=4;palFix();
  const k=palaceOf(hd);const W=S.where||(S.where={});W[hd.id]=k;side.forEach(v=>W[v.id]=k);const guest=L.find(v=>v!==hd&&!side.includes(v));if(guest)W[guest.id]=k;
  used=0;S.place='home';tab='go';window.__mapZ=1;render();setTimeout(()=>{Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true},50);
  return {k,name:PALN[palSlot(k)].replace(/ cung$/,''),hd:hd.name,side:side.map(v=>v.name+'→'+kpmHallOf(v,k)),guest:guest&&guest.name,count:countAt(k),slot:palSlot(k)}});
 await shot('1-map');
 await p.evaluate(nm=>{const b=[...document.querySelectorAll('#panel .mspot')].find(x=>x.textContent.includes(nm));b.click()},setup.name);
 await shot('2-detail');
 const det=await p.evaluate(k=>{const sp=[...document.querySelectorAll('#panel .kpm-spot')].map(x=>x.textContent.trim());const sp2=kpmSplit(k);
  return {open:!!document.querySelector('#panel .kpmv'),spots:sp,sum:sp2.chinh.n+sp2.dong.n+sp2.tay.n,countAt:countAt(k),img:(document.querySelector('#panel .kpmv .mapimg')||{}).src,
   ox:document.documentElement.scrollWidth>innerWidth}},setup.k);
 await p.evaluate(()=>{document.querySelector('#panel [data-kpmpart="dong"]').click()});
 await p.waitForTimeout(1500);await p.evaluate(()=>{if(Q.length){const o=Q[0].opts&&Q[0].opts[0];if(o&&o.go){Q.shift();document.getElementById('modal').hidden=true;o.go()}}});
 await shot('3-room');
 const room=await p.evaluate(k=>({tok0:document.getElementById('tokens').textContent.slice(0,80),visitK:S.visit&&S.visit.k,vppl:(S.visit.people||[]).map(x=>x.kind+':'+x.name),tok1:(renderStage(),document.getElementById('tokens').textContent.slice(0,80)),game:document.querySelector('.game').className,tab,place:S.place,hall:S.hall&&S.hall.part,scimg:document.getElementById('scimg').style.backgroundImage,
   people:curPeople().map(x=>x.name),want:kpmSplit(k).dong.ppl.map(v=>v.name),back:(document.getElementById('tomap')||{}).textContent,title:(document.querySelector('#sc-t .rt1')||{}).textContent,
   ox:document.documentElement.scrollWidth>innerWidth}),setup.k);
 await p.evaluate(()=>document.getElementById('tomap').click());
 await shot('4-back');
 const back1=await p.evaluate(()=>({tab,detail:!!document.querySelector('#panel .kpmv')}));
 await p.evaluate(()=>document.querySelector('#panel [data-kpmback]').click());await p.waitForTimeout(800);
 const back2=await p.evaluate(()=>({tab,detail:!!document.querySelector('#panel .kpmv'),map:!!document.querySelector('#panel .mapv .mspot')}));
 /* her own home courtyard → Dãy nhà cung nhân (jres cung-nhan room, her servants) */
 await p.evaluate(()=>{const b=document.querySelector('#panel .mspot[data-go="home"]');if(b)b.click()});await p.waitForTimeout(800);
 const homeC=await p.evaluate(()=>({open:!!document.querySelector('#panel .kpmv'),rows:[...document.querySelectorAll('#panel .kpm-row')].map(x=>x.textContent.trim())}));
 await shot('5-home');
 await p.evaluate(()=>{const r=document.querySelector('#panel [data-kpmpart="cungnhan"]');if(r)r.click()});
 await shot('6-cungnhan');
 const srv=await p.evaluate(()=>({place:S.place,tab,scimg:document.getElementById('scimg').style.backgroundImage.slice(0,70),title:(document.querySelector('#sc-t .rt1')||{}).textContent,people:curPeople().map(x=>x.kind+':'+x.name),ox:document.documentElement.scrollWidth>innerWidth}));
 console.log(JSON.stringify({TAG,setup,det,room,back1,back2,homeC,srv,errs},null,1));await b.close()})();
