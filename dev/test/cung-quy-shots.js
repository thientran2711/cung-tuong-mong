/* CUNG QUY breach notice shots + video (Fold 755x1000@2, iPad 1180x820@2): a bold lower consort (Kiêu ngạo / Nóng nảy, cậy sủng) mocks her = «Phạm thượng» card.
   usage: node dev/test/cung-quy-shots.js <index.html> <outdir> */
const {chromium}=require('playwright');const path=require('path');const [,,G,OUT]=process.argv;const fs=require('fs');fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{});const errs=[];
 for(const [nm,w,h] of [["fold",755,1000],["ipad",1180,820]]){const c=await b.newContext({viewport:{width:w,height:h},deviceScaleFactor:2,recordVideo:{dir:OUT,size:{width:w,height:h}}});const p=await c.newPage();await p.addInitScript(()=>{window.__nlInner=1});p.on('pageerror',e=>errs.push(nm+': '+e.message));
  for(let tr=0;tr<6;tr++){await p.goto('file://'+path.resolve(G));await p.waitForTimeout(1500);await p.evaluate(()=>localStorage.clear());await p.reload();await p.waitForTimeout(1500);
   await p.evaluate(()=>document.querySelector('#slots button[data-new="1"]').click());await p.waitForTimeout(2500);
   for(let k=0;k<4;k++){const sk=p.locator('button',{hasText:/^Bỏ qua$/});if(await sk.count()){await sk.first().click();await p.waitForTimeout(1500)}}
   if(await p.evaluate(()=>!isSrv()&&S.rank>=1&&liveRivals(true).some(x=>!x.queen&&BAL.cq.bold.traits.some(t=>hasT(x,t)))))break}
  for(let k=0;k<6;k++){const ov=await p.evaluate(()=>{const e=[...document.querySelectorAll('body *')].find(x=>x.offsetParent&&/Chạm để mở|Chạm để tiếp|Nhận hết|Cất vào rương/.test(x.textContent||'')&&x.children.length<3);if(e){e.click();return 1}return 0});if(!ov)break;await p.waitForTimeout(1500);await p.keyboard.press('Escape');const nh=p.locator('button',{hasText:/^Nhận$/});if(await nh.count()){await nh.first().click();await p.waitForTimeout(1500)}}
  await p.evaluate(()=>{for(let n=0;n<40&&Q.length;n++){const m=Q[0];try{if(m.opts&&m.opts.length)chooseM(0);else closeModal()}catch(e){}if(Q[0]===m)Q.shift()}try{closeModal()}catch(e){}render()});await p.waitForTimeout(1500);
  const r=await p.evaluate(()=>{const L=liveRivals(true).filter(v=>!v.queen);let v=L.find(x=>BAL.cq.bold.traits.some(t=>hasT(x,t)));if(!v)return"no bold consort";v.rank=0;v.sung=Math.max(v.sung,BAL.cq.bold.sung+5);v.cqB=null;
   let x="";for(let i=0;i<12&&!x;i++){v.cqB=null;AG.inTick++;try{x=twDo(v,S,"provoke")}finally{AG.inTick--}}try{showModal()}catch(e){}return v.name+" | "+x});
  await p.waitForTimeout(2500);for(let k=0;k<6;k++){const vis=await p.evaluate(()=>{const m=document.getElementById('modal');return !!(m&&!m.hidden&&/Trái cung quy/.test(m.textContent))});if(vis)break;
   const ok=p.locator('button:visible',{hasText:/^(Đã hiểu|Khâm thử|Tiếp)$/});if(await ok.count())await ok.first().click();else await p.evaluate(()=>{try{showModal()}catch(e){}});await p.waitForTimeout(2000)}
  await p.waitForTimeout(1500);await p.screenshot({path:path.join(OUT,`cq-breach-${nm}.png`)});console.log(nm,r);await p.waitForTimeout(1000);await c.close()}
 console.log('errs',errs.length,errs.slice(0,3));await b.close()})();
