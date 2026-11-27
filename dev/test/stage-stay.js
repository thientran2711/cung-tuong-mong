/* review/stage-here r2 (MAIN ROOT-55 20:08Z (d)): staying in a place after it closes = the «Lẻn vào» caught row, rolled ONCE at the buổi turn.
   cases: caught (roll forced to fail) → Danh -BAL.sneak.danh, punished, walked home, "Bị bắt" card; not caught (forced pass) → stays, no loss;
   a second render/turn in the same buổi does not roll again; her own palace / an open place never rolls; the closing notice (its «Tin báo» panel text, r4) names the odds.
   usage (HOST mode, built root): [DEV=ipadAir] node dev/test/stage-stay.js → JSON + exit 1 on a fault */
const {chromium}=require('playwright');const D=require('./lib/device');const path=require('path');const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const srv=await D.serveRoot(path.resolve(__dirname,'../..'));const b=await chromium.launch();const ctx=await D.newDeviceContext(b,process.env.DEV||'ipadAir');const p=await ctx.newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));p.setDefaultTimeout(240000);
 await p.addInitScript(()=>{window.__toastKeep=1;let a=24681357;window.__rnd=function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};Math.random=()=>window.__rnd()});
 const g=await D.openHost(p,srv.url);await g.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await sleep(1500);
 await g.evaluate(()=>{window.__forceOrigin='thd';SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;document.getElementById('modal').hidden=true;S.rank=Math.max(S.rank,2);render();
  const s=document.createElement('style');s.textContent='#klife,#kroul,#kload,.kmov,.kmfls,#kpodov,#dawn,.krbox{display:none!important}';document.head.appendChild(s);
  window.__chips=[];const o=window.kitNotice;window.kitNotice=function(t){const r=o.apply(this,arguments);try{if(r)window.__chips.push(r.text)}catch(e){}return r}});/* r4: the closing notice's panel text (kitNotice) names the odds; the chip is the short line */
 await sleep(1000);
 const run=(force)=>g.evaluate(async force=>{Q.length=0;document.getElementById('modal').hidden=true;S.dead=false;S.confined=0;S.out=0;S.closeSeen=null;S.stayRoll=null;window.__chips=[];
  S.place="home";S.visit={k:"home",people:homePeople(),talked:false,tk:{}};S.buoi=B4L-1;used=0;S.acPass={};render();Q.length=0;document.getElementById('modal').hidden=true;accGrant(S,"vuon");goTo("vuon");for(let i=0;i<4&&S.place!=="vuon"&&Q.length;i++){const j=(Q[0].opts||[]).findIndex(o=>o.n==="Đi một mình");if(j<0)break;chooseM(j);await new Promise(r=>setTimeout(r,300))}/* j95s «Chọn người theo hầu» */Q.length=0;document.getElementById('modal').hidden=true;
  used=BAL.time.khac-1;render();await new Promise(r=>setTimeout(r,300));
  const chip=window.__chips.find(x=>/sắp đóng cửa/.test(x))||"";/* place-rules: the entry notice «chỉ được lưu đến hết …» comes first; this checks the last-khắc one */const danh0=S.danh;const want=word(accSneakO("vuon"));
  const R0=Math.random;if(force!=null)Math.random=()=>force;let err="";const b0=S.buoi;let card0=false;try{for(let i=0;i<8&&S.buoi===b0;i++){/* place-rules: hidden motion scenes / a queued card must not hold the turn (jdayq, j9 Q.length) */try{kmBusy=false;KMQ.length=0}catch(e){}nextBuoi();await new Promise(r=>setTimeout(r,250));if(Q.some(m=>m.t==="Bị bắt"))card0=true;if(S.buoi===b0){Q.length=0;document.getElementById("modal").hidden=true}}}catch(e){err=String(e)}finally{Math.random=R0}
  await new Promise(r=>setTimeout(r,1500));
  const bk=bkey();const card=card0||Q.some(m=>m.t==="Bị bắt");const placeAfter=S.place;const danh1=S.danh;const seen=S.stayRoll;
  Q.length=0;document.getElementById('modal').hidden=true;render();await new Promise(r=>setTimeout(r,200));const again=S.stayRoll;
  return{force,chip,chipOdds:/* review/home-way r6: overstay = NHẸ; the chip names the light price from BAL (law 4) and the odds word (law 7), never «lẻn vào» */chip.includes("may rủi: "+want)&&chip.includes("Danh -"+BAL.sneak.danh)&&!/lẻn vào/.test(chip),buoi:S.buoi,placeAfter,dDanh:danh1-danh0,sneakDanh:BAL.sneak.danh,card,seen,rolledOnce:again===seen&&!!seen,err}},force);
 const caught=await run(0.999),free=await run(0);
 /* own palace at the same hour never rolls */
 const own=await g.evaluate(async()=>{Q.length=0;S.stayRoll=null;S.place="home";S.visit={k:"home",people:homePeople(),talked:false,tk:{}};S.buoi=B4L-1;used=BAL.time.khac-1;render();try{nextBuoi()}catch(e){}await new Promise(r=>setTimeout(r,1200));const x=S.stayRoll;Q.length=0;document.getElementById('modal').hidden=true;return{seen:x}});
 const old=await g.evaluate(()=>{try{delete S.stayRoll;S=JSON.parse(JSON.stringify(S));render();return true}catch(e){return String(e)}});
 const F=[];if(!caught.chipOdds)F.push('chip-odds');if(caught.placeAfter!=='home'||caught.dDanh>-caught.sneakDanh||!caught.card||!caught.rolledOnce)F.push('caught');
 if(free.placeAfter!=='vuon'||free.dDanh!==0||free.card||!free.rolledOnce)F.push('free');if(own.seen)F.push('own');if(old!==true)F.push('old');
 console.log(JSON.stringify({faults:F,caught,free,own,old,errs:errs.slice(0,3)}));await b.close();srv.close();process.exit(F.length||errs.length?1:0)})().catch(e=>{console.error(e);process.exit(1)});
