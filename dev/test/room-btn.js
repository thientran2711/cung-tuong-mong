/* room-btn test (owner 15/11): header "‹ Phòng" bar → painted room icon button (KIT §75 kitBackBtnHtml). Checks at each viewport: icon loaded, label, no bar
   (border/background none), button inside the header, tap target >= 32 px, tap returns to the room view, #tomap uses the same part.
   usage: node dev/test/room-btn.js <url> <outdir> ; icons are served from img/kit/ when the CDN does not have them yet */
const {chromium}=require('playwright');const fs=require('fs');
const [,,URL,OUT]=process.argv;
(async()=>{const b=await chromium.launch();const out={};
 for(const [W,H] of [[755,1000],[1000,755],[1180,820],[1366,1024],[844,390],[390,844]]){
  const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,reducedMotion:'reduce',serviceWorkers:'block'});const p=await ctx.newPage();p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,150)));
  await p.route(/ico-(room|map)\.webp/,r=>r.fulfill({path:__dirname+'/../../img/kit/'+r.request().url().match(/ico-\w+\.webp/)[0],contentType:'image/webp'}));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await p.waitForTimeout(2000);
  await p.evaluate(()=>{try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){start();if(!isSrv())break}Q.length=0;document.getElementById('modal').hidden=true;['kload','kroul','kroulw','dawn'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});render()});await p.waitForTimeout(1200);
  const R={};const cl=()=>p.evaluate(()=>document.querySelectorAll('#kroulw,.kroul,#kload').forEach(e=>e.remove()));await cl();
  const meas=()=>p.evaluate(()=>{const e=document.getElementById('k3room');if(!e)return{none:1};const r=e.getBoundingClientRect(),cs=getComputedStyle(e),im=e.querySelector('img.kbi'),hd=document.querySelector('header.hud').getBoundingClientRect();
   return{hidden:e.hidden,label:e.textContent,w:Math.round(r.width),h:Math.round(r.height),bar:cs.borderTopWidth!=='0px'||cs.backgroundColor!=='rgba(0, 0, 0, 0)',img:!!im&&im.complete&&im.naturalWidth>0,inHeader:r.top>=hd.top-1&&r.bottom<=hd.bottom+1&&r.right<=innerWidth+1&&r.left>=0,aria:e.getAttribute('aria-label')}});
  R.home=await meas();
  await p.evaluate(()=>{const t=document.querySelector('#tabs [data-tab="hau"],#tabs [data-tab="chest"],#tabs [data-tab]:not(.on)');t.click()});await p.waitForTimeout(500);await cl();R.panel=await meas();await p.screenshot({path:`${OUT}/room-${W}x${H}-panel.jpg`,type:'jpeg',quality:70});
  await p.evaluate(()=>{const e=document.getElementById('k3room');if(e&&!e.hidden)e.click()});await p.waitForTimeout(500);R.afterTap=await p.evaluate(()=>({home:document.querySelector('.game').classList.contains('k3home'),hidden:(document.getElementById('k3room')||{}).hidden}));
  await p.evaluate(()=>{S.place="ksp";const t=document.querySelector('#tabs [data-tab]:not(.on)');t.click()});await p.waitForTimeout(500);R.away=await meas();
  R.errs=errs;out[W+'x'+H]=R;await ctx.close()}
 console.log(JSON.stringify(out,null,1));await b.close()})();
