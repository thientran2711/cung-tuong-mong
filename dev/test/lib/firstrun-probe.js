/* Probe: does the first-run tutorial tour start after a REAL new life (no test flag), when a player taps through the
   new-life popups? usage: node dev/test/lib/firstrun-probe.js <baseURL> <W> <H> <outdir> */
const {chromium}=require('./pw-roulette');
const [,,BASE,W0,H0,OUT]=process.argv;const W=+W0,H=+H0;
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,serviceWorkers:'block'});const p=await ctx.newPage();
 await ctx.addInitScript(f=>{localStorage.setItem('ctm-bgpause','1');if(f)localStorage.setItem('hclh-tut-test','1')},!!process.env.TUT); /* TUT=1: the test flag that lets the tour run in an automated browser (navigator.webdriver) */
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function');
 await p.evaluate(()=>{SLOT=1;document.getElementById('title').hidden=true;start()});
 let started=false;
 for(let i=0;i<40;i++){await p.waitForTimeout(1200);
  const r=await p.evaluate(()=>({Q:Q.length,modal:!document.getElementById('modal').hidden,kroul:!!document.querySelector('[id^=kroul]'),tour:KTUT.on&&!document.getElementById('ktut').hidden,busy:KTUT.busy(),fresh:KTUT.fresh,btns:[...document.querySelectorAll('#modal button')].filter(b=>b.offsetParent).map(b=>b.textContent.trim().slice(0,14))}));
  console.log(i,JSON.stringify(r));
  if(r.tour){started=true;await p.screenshot({path:`${OUT}/tour-${W}x${H}.png`});break}
  if(r.modal&&!r.kroul){const pri=['Nhận thân phận','Vào cung ngay','Đã hiểu','Tiếp','Đóng','Lui'];const bt=await p.locator('#modal button').all();let hit=null,hitT='';
   for(const t of pri){for(const x of bt){if(!(await x.isVisible()))continue;const tx=((await x.textContent())||'').trim();if(tx.startsWith(t)){hit=x;hitT=tx;break}}if(hit)break}
   if(!hit){for(const x of bt){if(await x.isVisible()&&/mclose|kit-x/.test((await x.getAttribute('class'))||(await x.getAttribute('id'))||'')){hit=x;hitT='(close)';break}}}
   if(hit){console.log('  tap',hitT.slice(0,30));await hit.tap().catch(()=>{})}}
 }
 console.log(started?'TOUR STARTED':'TOUR DID NOT START');
 await b.close()})()
