/* review/flip-newlife-r1: Luân hồi identity card — the pinned 'Nhận thân phận / Đổi thân phận' bar must stay ABOVE the face-pick .ksub strip at every scroll step. usage: [OLD=1] [SHOT=1] node dev/test/idcard-bar-overlap.js <url> WxH@dpr <outdir> */
const {chromium}=require('playwright');
const [,,URL,SZ,OUT]=process.argv;const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+DPR||1,hasTouch:W<1100,isMobile:W<1100,reducedMotion:'reduce',serviceWorkers:'block'});
const p=await ctx.newPage();const pe=[];p.on('pageerror',e=>pe.push(e.message));await p.goto(URL,{waitUntil:'load',timeout:0});await p.addStyleTag({content:'.modal.kload,#kload{display:none!important}'});
await p.waitForFunction(()=>typeof start==='function'&&typeof kmReset==='function',null,{timeout:0});await p.waitForTimeout(3000);
await p.evaluate(()=>{try{$("title").hidden=true}catch(e){}start()});await p.waitForFunction(()=>!!NLP,null,{timeout:20000});await p.waitForTimeout(4500);
await p.evaluate(()=>{const b=[...document.querySelectorAll('button')].find(x=>x.textContent.trim()==='Tiếp'&&x.offsetParent);if(b)b.click()});await p.waitForTimeout(2500);
await p.evaluate(()=>{const t=[...document.querySelectorAll('.kroul button')].find(x=>x.textContent.trim()==='Bỏ qua');if(t)t.click()});await p.waitForFunction(()=>!document.querySelector('.kroul')&&document.querySelector('#mb .kpscopts'),null,{timeout:30000}).catch(()=>{});await p.waitForTimeout(2500);
if(process.env.OLD)await p.addStyleTag({content:'.dlg.kpsc>#mb>.kpscopts{z-index:3!important}'});
const r=await p.evaluate(async()=>{const mb=document.getElementById('mb');const sub=mb.querySelector('.ksub');const bar=mb.querySelector('.kpscopts');const out={steps:0,overlapSteps:0,bad:[],maxTop:mb.scrollHeight-mb.clientHeight};
 const R=e=>e.getBoundingClientRect();
 for(let t=0;t<=out.maxTop+40;t+=20){mb.scrollTop=t;await new Promise(r=>setTimeout(r,30));out.steps++;
  const a=R(sub),c=R(bar);const x0=Math.max(a.left,c.left),x1=Math.min(a.right,c.right),y0=Math.max(a.top,c.top),y1=Math.min(a.bottom,c.bottom);
  if(x1>x0&&y1>y0){out.overlapSteps++;const e=document.elementFromPoint((x0+x1)/2,(y0+y1)/2);if(!(e&&bar.contains(e)))out.bad.push([t,e&&e.className.toString().slice(0,20)])}}
 mb.scrollTop=0;return out});
console.log(SZ,JSON.stringify(r),pe.length?pe:'');
const wantShot=process.env.SHOT;if(wantShot){await p.evaluate(()=>{const mb=document.getElementById('mb');const s=mb.querySelector('.ksub');const bar=mb.querySelector('.kpscopts');const need=s.getBoundingClientRect().bottom-bar.getBoundingClientRect().top;mb.scrollTop=0});await p.waitForTimeout(300);await p.screenshot({path:`${OUT}/f-${W}x${H}.png`})}
await b.close()})();
