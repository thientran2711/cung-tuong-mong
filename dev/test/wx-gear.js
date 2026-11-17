/* Q14 rain gear wears out (review/diff-remeasure). usage: node dev/test/wx-gear.js <url> <outdir> [WxH@dpr,...]
   Checks: gear stamped on buy (S.turn + BAL.wx.gearMo), halves the risk while it lasts, leaves the chest after gearMo month ends (log line),
   old save without the stamp loads with a fresh season, NPC gear wears out the same way, kit item card (§70) shows "còn N tháng"
   + the shop text prints the BAL number; kiệu still per trip; no page errors / horizontal overflow; one screenshot of the item card. */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,OUT,SIZES]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();let bad=0;
 for(const sz of (SIZES||"755x1000@2").split(",")){const [wh,dpr]=sz.split("@");const [W,H]=wh.split("x").map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+dpr||1,hasTouch:W<1100,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});
  const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof render==='function');await sleep(2500);
  await p.addStyleTag({content:'#kroul{display:none!important}'});
  const r=await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();SLOT=3;document.getElementById('title').hidden=true;
   for(let i=0;i<400;i++){start();if(!isSrv())break}Q.length=0;document.getElementById('modal').hidden=true;try{NLP=null}catch(e){}render();
   const o={mo:BAL.wx.gearMo};S.wx={n:"giông tố",k:"storm",f:3};S.rank=1;S.inv=S.inv||[];S.bac=200;
   const r0=wxRisk(S,{kieu:false});o.buy=buy(S,"aotoi");const e=S.inv[S.inv.length-1];o.stamp=[e.wxe,S.turn+BAL.wx.gearMo];
   const r1=wxRisk(S,{kieu:false});o.cold=[r0.cold,r1.cold];
   /* item card: kit §70 rows */
   const ix=S.inv.indexOf(e);kitItemCard({ix});const f=document.getElementById('kidfl');o.card=f?f.innerText.replace(/\s+/g," "):"";
   o.shop=kitItemRows("du").replace(/<[^>]+>/g," ").replace(/\s+/g," ");
   return o});
  await sleep(400);await p.screenshot({path:`${OUT}/card-${wh}.png`});
  const ov=await p.evaluate(()=>{const d=document.documentElement;const f=document.getElementById('kidfl');const c=f&&f.querySelector('.dlg');const r=c&&c.getBoundingClientRect();
   return{hx:d.scrollWidth>d.clientWidth+1,card:r?[Math.round(r.left),Math.round(r.right),innerWidth]:null}});
  const r2=await p.evaluate(()=>{kitItemCardClose();const o={};const e=S.inv.find(x=>x.k==="aotoi");
   /* month ends: S.turn moves; the gear goes after gearMo of them */
   const left=[];for(let m=0;m<BAL.wx.gearMo;m++){S.turn++;wxGearAll();left.push(S.inv.includes(e)?wxGearLeft(e):"gone")}o.left=left;
   o.log=(S.logs[0]||"").replace(/<[^>]+>/g,"");S.wx={n:"giông tố",k:"storm",f:3};o.after=wxRisk(S,{kieu:false}).cold;o.has=wxHasGear(S,"cold");
   /* old save: gear without a stamp, through ser/deser */
   S.inv.push({k:"giaycoi"});const blob=ser();deser(blob);const g=S.inv.find(x=>x.k==="giaycoi");o.old=g?[g.wxe,S.turn+BAL.wx.gearMo]:null;
   /* NPC */const v=liveRivals(true)[0];v.inv=v.inv||[];v.inv.push({k:"du"});wxGearAll();const ve=v.inv.find(x=>x.k==="du");o.npcStamp=ve&&ve.wxe;
   S.turn+=BAL.wx.gearMo;wxGearAll();o.npcGone=!v.inv.includes(ve);
   /* kiệu still per trip */S.rank=4;S.bac=100;o.kieu=wxRisk(S).kieu;return o});
  const ok=r.buy&&r.stamp[0]===r.stamp[1]&&r.cold[1]<r.cold[0]&&/còn 3 tháng/.test(r.card)&&new RegExp(`Dùng được ${r.mo} tháng`).test(r.shop)
   &&r2.left[r2.left.length-1]==="gone"&&r2.left[0]===r.mo-1&&/hết mùa/.test(r2.log)&&!r2.has&&r2.after===r.cold[0]&&r2.old&&r2.old[0]===r2.old[1]&&r2.npcStamp&&r2.npcGone&&r2.kieu
   &&!ov.hx&&(!ov.card||ov.card[0]>=0&&ov.card[1]<=ov.card[2]+1)&&!/%/.test(r.card+r.shop);
  console.log(sz,ok?"OK":"FAIL",JSON.stringify({r,r2,ov}));if(!ok)bad++;
  console.log('pageerrors',errs.length,errs.slice(0,3));if(errs.length)bad++;await ctx.close()}
 await b.close();console.log(bad?`FAIL ${bad}`:"ALL OK");process.exit(bad?1:0)})();
