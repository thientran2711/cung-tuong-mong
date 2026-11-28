/* review/place-close LOOK stills: 1 last khắc chip (pulse) · 2 grace chip (red) · 3 tap on the chip → her room · 4 grace used up → NHẸ notice (no dialog).
   usage: SHOT_DIR=<dir> DEV=fold|ipadAir node dev/test/place-close-look.js (shots never go in git) */
const {chromium}=require('./lib/dlgs-off').pw('tap');/* play bot: a side-line dialogue scene is tapped through like a player (lib/dlgs-off.js) */const D=require('./lib/device');const path=require('path');const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const dev=process.env.DEV||'fold',dir=process.env.SHOT_DIR||'/tmp';const srv=await D.serveRoot(path.resolve(__dirname,'../..'));const b=await chromium.launch();const ctx=await D.newDeviceContext(b,dev);const p=await ctx.newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));p.setDefaultTimeout(240000);
 await p.addInitScript(()=>{let a=24681357;window.__rnd=function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};Math.random=()=>window.__rnd()});
 const g=await D.openHost(p,srv.url);await g.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await sleep(1500);
 await g.evaluate(async()=>{SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;document.getElementById('modal').hidden=true;S.rank=Math.max(S.rank,2);S.danh=Math.max(S.danh,40);render();
  const s=document.createElement('style');s.textContent='#klife,#kroul,#kload,.kmov,.kmfls,#kpodov,#dawn,.krbox{display:none!important}';document.head.appendChild(s);
  try{asFestToday=function(){return null}}catch(e){}
  Q.length=0;S.buoi=0;used=0;S.place="home";S.visit={k:"home",people:homePeople(),talked:false,tk:{}};window.__accSilent=1;try{accGrant(S,"tn");goTo("tn")}finally{window.__accSilent=0}
  for(let i=0;i<4&&S.place!=="tn"&&Q.length;i++){const m=Q[0];const j=(m.opts||[]).findIndex(o=>o.n==="Đi một mình");if(j<0)break;chooseM(j);await new Promise(r=>setTimeout(r,300))}
  Q.length=0;document.getElementById('modal').hidden=true;S.closeSeen=null;used=BAL.time.khac-travel("tn","home");render()});
 const shot=async (n,w)=>{await sleep(w||700);await p.screenshot({path:`${dir}/${dev}-${n}.png`})};
 await shot('1-last-khac',6500);
 /* 2: talk spill + turn → grace */
 await g.evaluate(async()=>{used=BAL.time.khac-1;Q.push({t:"x",h:"",opts:[{n:"x",fx:{}}]});spend(2);Q.length=0;document.getElementById('modal').hidden=true;const b0=S.buoi;
  for(let i=0;i<8&&S.buoi===b0;i++){try{kmBusy=false;KMQ.length=0}catch(e){}try{nextBuoi()}catch(e){}await new Promise(r=>setTimeout(r,250));if(S.buoi===b0){Q.length=0;document.getElementById('modal').hidden=true}}
  await new Promise(r=>setTimeout(r,400));Q.length=0;document.getElementById('modal').hidden=true;render()});
 await shot('2-grace-red',9000);
 /* 3: tap the chip (chipGo → home, KIT §42.2a); a panel go row is tapped only if the panel opened instead */
 const how=await g.evaluate(()=>{const c=document.getElementById('kntchip');if(c&&!c.hidden){c.click();return "chip"}if(typeof homeGo==="function"&&homeGo()){render();return "homeGo"}return "none"});
 await sleep(500);const pan=await g.evaluate(()=>{const r=[...document.querySelectorAll('button')].find(b=>/^Về phòng · \d+ khắc/.test(b.textContent)&&b.offsetParent&&!b.closest('header'));if(r){r.click();return 1}return 0});
 await shot('3-tap-home');
 /* 4: back at a closed place in grace, grace used up, caught */
 await g.evaluate(async()=>{const b=S.buoi;S.place="tn";S.visit={k:"tn",people:[],talked:false,tk:{}};S.stayRoll=null;window.__hwCan=bkey()+"|tn";Math.random=()=>0.999;used=S.plGrace?S.plGrace.end:2;render()});
 await shot('4-penalty-notice');
 const st=await g.evaluate(()=>({place:S.place,confined:S.confined||0,Q:Q.length,modal:!document.getElementById('modal').hidden}));
 const nt=await g.evaluate(()=>(kitNoticeList()||[]).slice(0,6).map(x=>[x.id,x.line,x.hold,x.tone]));console.log(JSON.stringify({nt,dev,how,pan,st,errs}));await b.close();srv.close()})();
