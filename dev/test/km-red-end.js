/* km-red-end — KIT §81 family scan (robot-coop-fix-5, week-end stuck cause 3): every kit motion scene (kmStage) must show its ONE way out
   (the §81 end button .kmend or its own [data-km-close] button) WITHOUT a tap, with motion on AND with reduced motion (OS setting or the
   game's «hiệu ứng» off: kmReduced). Found by robot pairs: under reduced motion kmStage auto-finishes at 0 ms and that finish cleared the
   scene's own later() beats, so kitNightEnd's «Tiếp tục» beat never ran: the night card stayed on screen with no button (z 9100) over
   the next steal game (kg82) and the co-op week never ended.
   usage: python3 dev/build/assemble.py && node dev/test/km-red-end.js   → one row per scene × motion mode, exit 1 on any FAIL. */
const {chromium}=require('playwright');const path=require('path');
const {serve,BASE}=require(path.join(__dirname,'coop-serve.js'));
const sleep=t=>new Promise(r=>setTimeout(r,t));
/* [name, page code that opens the scene] — every public kit scene built on kmStage (j93, jne, jpromo, jlevel) */
const SCENES=[
 ['kitFlipTablet',()=>kitFlipTablet(S)],
 ['kitEdict',()=>kitEdict({})],
 ['kitGloom',()=>kitGloom({})],
 ['kitBloom',()=>kitBloom({})],
 ['kitInk',()=>kitInk({})],
 ['kitEntryGate',()=>kitEntryGate({})],
 ['kitReward',()=>kitReward({kind:'chest',items:[{n:'Trâm',tier:1}],bac:5})],   /* with motion the chest is the scene's own action: the player taps it open (one tap on .kmbox, below) */
 ['kitNightEnd',()=>kitNightEnd({tier:'normal',m0:1,m1:1,before:null,items:[],line:'test'})],
 ['kitPersonReveal',()=>{const v=(rivals||[]).find(x=>x&&x.alive&&!x.out);if(!v)return 'skip';kitPersonReveal({who:v})}],
];
const OUT=()=>{const vis=b=>!!b&&b.getClientRects().length>0&&getComputedStyle(b).visibility!=='hidden'&&getComputedStyle(b).display!=='none'&&(b.offsetParent!==null||getComputedStyle(b).position==='fixed');
 const ov=[...document.querySelectorAll('.kmov')].filter(o=>!o.classList.contains('km-out'));if(!ov.length)return {ov:0};
 const o=ov[ov.length-1];const b=[...o.querySelectorAll('.kmend,[data-km-close]')].find(vis);return {ov:ov.length,cls:o.className,btn:b?(b.textContent||'').trim().slice(0,20):null}};
(async()=>{const b=await chromium.launch();let fails=0;const rows=[];
 for(const mode of ['reduce','no-preference']){
  const c=await b.newContext({viewport:{width:755,height:1000},reducedMotion:mode,serviceWorkers:'block'});await serve(c);const p=await c.newPage();
  const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto(BASE,{waitUntil:'domcontentloaded',timeout:120000});await p.waitForFunction(()=>typeof start==='function',null,{timeout:120000});await sleep(1500);
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;
   for(let i=0;i<40;i++){try{nlNew()}catch(e){}start();if(!isSrv())break}Q.length=0;document.getElementById('modal').hidden=true});
  await sleep(1500);
  const red=await p.evaluate(()=>kmReduced());
  for(const [nm,fn] of SCENES){
   await p.evaluate(()=>{if(typeof kmReset==='function')kmReset();document.querySelectorAll('.kmov,[id^=kroul],.kroul,#dawn').forEach(e=>e.remove());Q.length=0;document.getElementById('modal').hidden=true});
   const r=await p.evaluate(fn).catch(e=>'err '+e.message);if(r==='skip'){rows.push([mode,nm,'skip','']);continue}
   const t0=Date.now();let o={ov:0};
   if(nm==='kitReward'&&mode!=='reduce'){await sleep(400);await p.evaluate(()=>{const x=document.querySelector('.kmov .kmbox');if(x)x.click()})}
   while(Date.now()-t0<15000){o=await p.evaluate(OUT);if(o.btn)break;await sleep(150)}
   let gone=false;if(o.btn){await p.evaluate(()=>{const ov=[...document.querySelectorAll('.kmov')].filter(x=>!x.classList.contains('km-out'));const x=ov[ov.length-1];
     const b=[...x.querySelectorAll('.kmend,[data-km-close]')].find(b=>b.getClientRects().length&&getComputedStyle(b).visibility!=='hidden');b.click()});
    for(let i=0;i<20&&!gone;i++){await sleep(150);gone=(await p.evaluate(OUT)).ov===0}}
   const ok=!!o.btn&&gone;if(!ok)fails++;
   rows.push([mode+(red?' (kmReduced)':''),nm,ok?'ok':'FAIL',o.btn?`button «${o.btn}» after ${Date.now()-t0} ms${gone?', closes':', DOES NOT CLOSE'}`:`no way out in 15 s without a tap (overlay ${o.cls||'none'})`])}
  if(errs.length){fails++;rows.push([mode,'pageerror','FAIL',errs.slice(0,3).join(' | ')])}
  await c.close()}
 await b.close();
 for(const r of rows)console.log(r.join(' · '));
 console.log(fails?`KM-RED-END FAIL ${fails}`:'KM-RED-END PASS');process.exit(fails?1:0)})().catch(e=>{console.error(e);process.exit(2)});
