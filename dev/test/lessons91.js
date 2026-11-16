/* j91: every Tài nghệ lesson (openMG) plays its own art's game; auto-played through the oracle. usage: node dev/test/lessons91.js <url> <W>x<H>@<dpr> <outdir> */
const {chromium}=require('./lib/pw-roulette');const [,,BASE,SZ,OUT]=process.argv;const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:+DPR});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;start();Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;setTimeout(()=>{Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true},50)});
 const out={};
 for(const k of ['cam','ky','thi','hoa','vu','y','theu','nau']){await p.evaluate(k=>{window.__lp=null;KG82.phase='play';openMG(k,2,g=>window.__lp=g)},k);await p.waitForTimeout(300);
  const title=await p.evaluate(()=>document.getElementById('mgt').textContent);
  await p.evaluate(()=>{let hold=null,busy=false,nx=0;const pe=(el,t,x,y,id)=>el.dispatchEvent(new PointerEvent(t,{clientX:x,clientY:y,pointerType:'touch',pointerId:id,isPrimary:true,bubbles:true,cancelable:true}));
   const tick=()=>{if(window.__lp!=null||mgDone){if(hold)pe(hold.el,'pointerup',0,0,7);return}const pk=KG82.peek();const now=performance.now();
    if(pk){if('hold' in pk){const el=pk.hsel?document.querySelector(pk.hsel):document.elementFromPoint(pk.x,pk.y);if(pk.hold&&!hold&&el){pe(el,'pointerdown',pk.x||0,pk.y||0,7);hold={el}}else if(!pk.hold&&hold){pe(hold.el,'pointerup',0,0,7);hold=null}}
     if(pk.drag&&!busy&&now>nx){busy=true;const D=pk.drag;const el=document.elementFromPoint(D[0][0],D[0][1]);const pts=[];for(let i=1;i<D.length;i++){const n=Math.max(1,Math.ceil(Math.hypot(D[i][0]-D[i-1][0],D[i][1]-D[i-1][1])/12));for(let s=1;s<=n;s++)pts.push([D[i-1][0]+(D[i][0]-D[i-1][0])*s/n,D[i-1][1]+(D[i][1]-D[i-1][1])*s/n])}
      pe(el,'pointerdown',D[0][0],D[0][1],3);let i=0;const mv=()=>{if(i<pts.length){pe(el,'pointermove',pts[i][0],pts[i][1],3);i++;setTimeout(mv,10)}else{const l=pts[pts.length-1];pe(el,'pointerup',l[0],l[1],3);busy=false;nx=performance.now()+260}};mv()}
     else if(pk.sel&&!busy&&now>nx){const el=document.querySelector(pk.sel);if(el)el.click();nx=now+300}
     else if(pk.x!=null&&!('hold' in pk)&&!pk.drag&&!busy&&now>nx){const el=document.elementFromPoint(pk.x,pk.y);if(el){pe(el,'pointerdown',pk.x,pk.y,5);pe(el,'pointerup',pk.x,pk.y,5)}nx=now+120}}
    setTimeout(tick,8)};tick()});
  let shot=false;for(let i=0;i<300;i++){if(await p.evaluate(()=>mgDone))break;if(!shot&&i===8){await p.locator('#ov .mg').screenshot({path:`${OUT}/lesson-${k}-${SZ}.jpg`,type:'jpeg',quality:82});shot=true}await p.waitForTimeout(400)}
  await p.evaluate(()=>{const b=document.getElementById('mgok');if(b)b.click()});await p.waitForTimeout(200);out[k]={title,g:await p.evaluate(()=>window.__lp)}}
 console.log(JSON.stringify({size:SZ,out,errors:errs}));await b.close()})();
