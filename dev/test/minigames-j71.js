/* j82 x j71: the festival contest path (mgRun7 -> startContest -> onDone -> j71 standings). usage: node dev/test/minigames-j71.js <baseURL> <outdir> */
const {chromium}=require('playwright');const [,,BASE,OUT]=process.argv;
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:904,height:2316},hasTouch:true,isMobile:true});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;start();setTimeout(()=>{Q.length=0;document.getElementById('modal').hidden=true},50)});await p.waitForTimeout(800);
 const out=[];
 for(const mode of ['skip','play']){
  await p.evaluate(()=>{window.__L=null;Q.length=0;const E=[S].concat(liveRivals(true).filter(present7).slice(0,3));mgRun7({title:'Hội thử',art:'co',E,kindOf:()=>'co',pr:[],meB:8,done:L=>window.__L=L})});
  await p.waitForTimeout(400);await p.locator('#kg82').screenshot({path:`${OUT}/j71-${mode}-intro.png`,timeout:120000});
  if(mode==='skip')await p.locator('#kg82skip').tap();else{await p.locator('#kg82go').tap();
   await p.evaluate(()=>{const tick=()=>{if(KG82.phase!=='play')return;const pk=KG82.peek();if(pk){const el=document.elementFromPoint(pk.x,pk.y);el.dispatchEvent(new PointerEvent('pointerdown',{clientX:pk.x,clientY:pk.y,pointerType:'touch',bubbles:true,cancelable:true}))}setTimeout(tick,300)};tick()});
   for(let i=0;i<200;i++){if(await p.evaluate(()=>KG82.phase)!=='play')break;await p.waitForTimeout(500)}}
  await p.waitForTimeout(300);await p.locator('#kg82').screenshot({path:`${OUT}/j71-${mode}-result.png`,timeout:120000});const last=await p.evaluate(()=>KG82.last);
  await p.locator('#kg82ok').tap();await p.waitForTimeout(300);
  const L=await p.evaluate(()=>(window.__L||[]).map(x=>({me:x.p===S,s:x.s,mg:!!x.mg})));out.push({mode,last,L})}
 console.log(JSON.stringify({out,errs}));await b.close()})();
