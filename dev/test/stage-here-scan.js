/* review/stage-here group scan: EVERY place x {sáng, trưa, chiều, tối} x {first khắc, last khắc}: does the closing alert show, with which line;
   and EVERY place on the given device: stage picture after a tab switch = that place (never the room).
   usage (HOST mode, built root): DEV=ipadAir node dev/test/stage-here-scan.js → JSON {hours:[...], stage:[...]} */
const {chromium}=require('playwright');const D=require('./lib/device');const path=require('path');
const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const dev=process.env.DEV||'ipadAir';const srv=await D.serveRoot(path.resolve(__dirname,'../..'));const b=await chromium.launch();const ctx=await D.newDeviceContext(b,dev);const p=await ctx.newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));p.setDefaultTimeout(240000);
 const g=await D.openHost(p,srv.url);await g.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await sleep(1500);
 await g.evaluate(()=>{window.__forceOrigin='thd';SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;document.getElementById('modal').hidden=true;S.rank=Math.max(S.rank,2);render();
  const s=document.createElement('style');s.textContent='#kroul,#kload,.kmov,.kmfls,#kpodov,#dawn,.krbox{display:none!important}';document.head.appendChild(s)});
 await sleep(1000);
 const hours=await g.evaluate(()=>{const out=[];const keys=places().map(p=>p.k);for(const k of keys){const row={k,n:placeOf(k).n};
  for(let bu=0;bu<4;bu++)for(const us of [0,BAL.time.khac-1]){S.buoi=bu;used=us;S.place=k;S.acPass={};let c=null;try{c=stClose()}catch(e){}row[`b${bu}u${us}`]=c?(c.now?'CLOSED':'NEXT'):'-'}
  out.push(row)}S.place="home";S.buoi=0;used=0;S.visit={k:"home",people:homePeople(),talked:false,tk:{}};render();return out});
 const stage=[];
 for(const k of await g.evaluate(()=>['home'].concat(places().map(p=>p.k)))){
  const r=await g.evaluate(async k=>{Q.length=0;document.getElementById('modal').hidden=true;S.place="home";S.visit={k:"home",people:homePeople(),talked:false,tk:{}};S.buoi=0;used=0;tab="go";render();
   if(k!=="home"){accGrant(S,k);try{goTo(k)}catch(e){}if(S.place!==k){S.place=k;S.visit={k,people:[],talked:false,tk:{}}}}Q.length=0;document.getElementById('modal').hidden=true;render();
   await new Promise(r=>setTimeout(r,500));const res={};
   for(const t of ['act','rel','inv']){const bt=document.querySelector(`#tabs [data-tab="${t}"]`);if(bt&&!bt.classList.contains('on'))bt.click();await new Promise(r=>setTimeout(r,450));if(Q.length){Q.length=0;document.getElementById('modal').hidden=true}
    const st=document.getElementById('stage');const R=st.getBoundingClientRect();const im=document.getElementById('scimg').style.backgroundImage||'';const want=SCIMG[placeOf(S.place).sc]||'';
    res[t]=(im.indexOf(want)>=0&&want?'img':'IMG?')+'/'+(R.height>40&&getComputedStyle(st).visibility!=='hidden'?'vis':'hid')}
   return{k,place:S.place,...res}},k);stage.push(r)}
 console.log(JSON.stringify({dev,hours,stage,errs:errs.slice(0,5)}));await b.close();srv.close()})().catch(e=>{console.error(e);process.exit(1)});
