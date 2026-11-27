/* j82 mini-games: Playwright plays every mini-game by touch (test oracle KG82.peek) at one viewport.
   usage: node dev/test/minigames.js <baseURL> <W>x<H>[@dpr] <outdir> [kinds,comma]   (serve the built site with charset wrapper first) */
const {chromium}=require('./lib/pw-roulette');
const [,,BASE,SZ,OUT,KL]=process.argv;const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);
const KINDS=(KL||'dan,co,tho,ve,mua,ban').split(',');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:+(DPR||1)});
 const p=await ctx.newPage();await require('./lib/veil').guard(p);const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;start();Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;
  setTimeout(()=>{Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true},50);
  Object.assign(S.arts,{cam:3,ky:2,thi:4,hoa:1,vu:3,y:2});S.tai=62;render()});
 await require('./lib/roulette').dismissRoulette(p);
 const res=[];
 for(const k of KINDS){let realTouch=null;const skip=k.endsWith('!');const kind=k.replace('!','');
  await p.evaluate(kind=>{window.__res=null;const R=liveRivals(true).slice(0,4);startContest({art:kind,title:'Hội Thượng nguyên',rivals:R,prep:6,stakes:{win:{sung:8,danh:3},top3:{danh:1},last:{danh:-1},paid:{suc:-6}},onDone:r=>window.__res=r})},kind);
  await p.waitForTimeout(400);const panel=p.locator('#kg82');
  await panel.screenshot({path:`${OUT}/${kind}-${SZ}-1intro.png`,timeout:120000});
  if(skip){await p.locator('#kg82skip').tap()}else{
   await p.locator('#kg82go').tap();const t0=Date.now();let shot=false;
   /* one REAL touch on the game surface (CDP touch) must reach the game handler */
   const touchOK=await p.evaluate(()=>{const t=document.querySelector('#kg82box canvas,#kg82box button');if(!t)return null;window.__rt=0;t.addEventListener('pointerdown',e=>{if(e.pointerType==='touch'&&e.isTrusted)window.__rt++},{once:false});const r=t.getBoundingClientRect();return{x:r.left+r.width/2,y:r.top+Math.min(r.height-5,r.height*.9)}});
   if(touchOK&&!['tho','doi','doden','banh','huong'].includes(kind)){await p.touchscreen.tap(touchOK.x,touchOK.y);realTouch=await p.evaluate(()=>window.__rt>0)}else realTouch='button-tap';
   /* in-page auto-player: taps (touch-type pointer events at the oracle point, or clicks the right option) as soon as the oracle says so;
      in-page because headless touch dispatch here takes seconds, too slow for the timing games */
   await p.evaluate(()=>{let nx=0;const tick=()=>{if(KG82.phase!=='play')return;const pk=KG82.peek();const now=performance.now();
     if(pk&&now>nx){if(pk.sel){const el=document.querySelector(pk.sel);if(el)el.click()}else if(Number.isFinite(pk.x)&&Number.isFinite(pk.y)){const el=document.elementFromPoint(pk.x,pk.y);if(el)el.dispatchEvent(new PointerEvent('pointerdown',{clientX:pk.x,clientY:pk.y,pointerType:'touch',isPrimary:true,bubbles:true,cancelable:true}))}nx=now+120}
     setTimeout(tick,8)};tick()});
   while(Date.now()-t0<130000){const ph=await p.evaluate(()=>KG82.phase);if(ph!=='play')break;
    if(!shot&&Date.now()-t0>2200){await panel.screenshot({path:`${OUT}/${kind}-${SZ}-2play.png`,timeout:120000});shot=true}
    await p.waitForTimeout(400)}}
  await p.waitForTimeout(500);
  const info=await p.evaluate(()=>{const d=document.getElementById('kg82');const r=d.getBoundingClientRect();
   const trunc=[...d.querySelectorAll('*')].filter(e=>e.children.length===0&&/…/.test(e.textContent)).length;
   return{last:KG82.last,panelW:Math.round(r.width),overflowX:document.documentElement.scrollWidth>innerWidth,inner:d.scrollWidth>d.clientWidth+1,trunc,text:(d.innerText||'').includes('có thể')}});
  await panel.screenshot({path:`${OUT}/${kind}-${SZ}-3result.png`,timeout:120000});
  /* full scroll of the result panel */
  await p.evaluate(()=>{const d=document.getElementById('kg82');d.scrollTop=d.scrollHeight});await p.waitForTimeout(150);
  await panel.screenshot({path:`${OUT}/${kind}-${SZ}-4result-end.png`,timeout:120000});
  await require('./lib/roulette').closeResult(p);await p.waitForTimeout(200);
  const got=await p.evaluate(()=>window.__res);
  res.push({kind,skip,realTouch,raw:info.last&&info.last.raw,score:got&&got.score,place:got&&got.place,of:got&&got.of,done:!!got,overflowX:info.overflowX,inner:info.inner,trunc:info.trunc,coThe:info.text,panelW:info.panelW})}
 /* lightweight mode */
 await p.evaluate(()=>{window.__pa=null;playArt({art:'thi',onDone:r=>window.__pa=r})});await p.waitForTimeout(300);await p.locator('#kg82go').tap();
 for(let i=0;i<200;i++){const ph=await p.evaluate(()=>KG82.phase);if(ph!=='play')break;await p.evaluate(()=>{const pk=KG82.peek();if(pk&&pk.sel)document.querySelector(pk.sel).click()});await p.waitForTimeout(300)}
 await p.locator('#kg82').screenshot({path:`${OUT}/playArt-${SZ}.png`,timeout:120000});await require('./lib/roulette').closeResult(p);
 const pa=await p.evaluate(()=>window.__pa);
 /* lesson games for the j85 arts (Thêu, Nấu nướng) inside the Tài nghệ lesson overlay */
 const lessons={};
 for(const k of ['theu','nau']){await p.evaluate(k=>{window.__lp=null;openMG(k,2,g=>window.__lp=g)},k);await p.waitForTimeout(300);
  await p.evaluate(()=>{const tick=()=>{if(window.__lp!=null||mgDone)return;const pk=KG82.peek();if(pk){if(pk.sel){const el=document.querySelector(pk.sel);if(el)el.click()}else if(Number.isFinite(pk.x)&&Number.isFinite(pk.y)){const el=document.elementFromPoint(pk.x,pk.y);if(el)el.dispatchEvent(new PointerEvent('pointerdown',{clientX:pk.x,clientY:pk.y,pointerType:'touch',bubbles:true,cancelable:true}))}}setTimeout(tick,150)};tick()});
  for(let i=0;i<150;i++){if(await p.evaluate(()=>mgDone))break;if(i===6)await p.locator('#ov .mg:not([hidden])').screenshot({path:`${OUT}/lesson-${k}-${SZ}.png`,timeout:120000});await p.waitForTimeout(400)}
  await p.evaluate(()=>{const b=document.getElementById('mgok');if(b)b.click()});await p.waitForTimeout(200);lessons[k]=await p.evaluate(()=>window.__lp)}
 console.log(JSON.stringify({size:SZ,res,playArt:pa,lessons,errors:errs},null,0));await b.close()})();
