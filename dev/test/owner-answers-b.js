/* owner-answers-b (QB1 QB2 Q6 Q15 Q25 Q12): shared harness + room button probe. usage: node dev/test/owner-answers-b.js <url> <outdir> [probe] */
const {chromium}=require('playwright');
const SIZES=[[755,1000,2],[1000,755,1],[1180,820,2],[1366,1024,2],[844,390,1],[390,844,1]];
async function boot(b,W,H,dsf){const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:dsf||1,hasTouch:true,isMobile:W<1100,reducedMotion:'reduce',serviceWorkers:'block'});const p=await ctx.newPage();p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,150)));return{ctx,p,errs}}
async function start(p,URL){await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await p.waitForTimeout(2000);
 await p.evaluate(()=>{try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){start();if(!isSrv())break}Q.length=0;document.getElementById('modal').hidden=true;['kload','kroul','kroulw','dawn'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});render()});await p.waitForTimeout(1200);
 await p.evaluate(()=>document.querySelectorAll('#kroulw,.kroul,#kload').forEach(e=>e.remove()))}
module.exports={SIZES,boot,start};
if(require.main===module)(async()=>{const [,,URL,OUT]=process.argv;const b=await chromium.launch();const out={};
 for(const [W,H,d] of SIZES){const {ctx,p,errs}=await boot(b,W,H,d);await start(p,URL);
  const meas=()=>p.evaluate(()=>{const e=document.getElementById('k3room');if(!e)return{none:1};const r=e.getBoundingClientRect(),hd=document.querySelector('header.hud').getBoundingClientRect();return{hidden:e.hidden,disp:getComputedStyle(e).display,label:getComputedStyle(e.querySelector('.kbl')||e).display,tip:e.title,aria:e.getAttribute('aria-label'),w:Math.round(r.width),h:Math.round(r.height),inHeader:r.top>=hd.top-1&&r.bottom<=hd.bottom+1&&r.right<=innerWidth+1&&r.left>=0}});
  const R={};R.home=await meas();await p.evaluate(()=>{const t=document.querySelector('#tabs [data-tab="hau"],#tabs [data-tab]:not(.on)');t.click()});await p.waitForTimeout(500);R.panel=await meas();
  await p.evaluate(()=>document.querySelectorAll('#kroulw,.kroul,#kload').forEach(e=>e.remove()));R.overflowX=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);await p.screenshot({path:`${OUT}/q6-${W}x${H}.jpg`,type:'jpeg',quality:60});R.errs=errs;out[W+'x'+H]=R;await ctx.close()}
 console.log(JSON.stringify(out));await b.close()})();
