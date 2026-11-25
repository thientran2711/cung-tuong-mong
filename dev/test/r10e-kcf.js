/* robot10 E-FIX-2 proof (E round 1 «inpage6 TIMEOUT: Bỏ cuộc? opts []» over a MƯU game): the bot's modalStep (dev/measure/inpage6.js, or IP6=<file>)
   must answer the kit confirm the game asks when a live mini-game is left by its ✕ (j82 kg82Ask → j79 kitConfirm «Bỏ cuộc?») — it presses «Bỏ cuộc»,
   the caller's own lose path runs. LIVE harness: the confirm stays open (the bot loops until TIMEOUT).
   usage: node dev/test/r10e-kcf.js <save.json>   exit 1 on a fail */
const {chromium}=require('./lib/pw-roulette');const {serve,BASE}=require('./coop-serve.js');const fs=require('fs'),path=require('path');
const save=process.argv[2];let IP=fs.readFileSync(process.env.IP6||path.join(__dirname,'../measure/inpage6.js'),'utf8');
/* modalStep lives inside inpage6's IIFE: hand it out (same text otherwise) */IP=IP.replace('function modalStep(sens){','window.__modalStep=modalStep;function modalStep(sens){');
(async()=>{const b=await chromium.launch({args:['--no-sandbox']});const ctx=await b.newContext({viewport:{width:755,height:1000},reducedMotion:'reduce'});await serve(ctx);
 await ctx.addInitScript(()=>{window.COOP_URL='http://127.0.0.1:9/'});await ctx.addInitScript(t=>{try{localStorage.setItem('hclh-save-v2-1',t)}catch(e){}},fs.readFileSync(save,'utf8'));
 const p=await ctx.newPage();await p.goto(BASE,{waitUntil:'domcontentloaded',timeout:120000});await p.waitForFunction(()=>typeof deser==='function'&&document.querySelector('#modal.kpthome'),null,{timeout:90000});
 await p.evaluate(()=>{$("title").hidden=false;showTitle();document.querySelector('#slots [data-load="1"]').click()});await p.waitForTimeout(2500);
 const r=await p.evaluate(s=>{try{Q.length=0;closeModal()}catch(e){}window.__lifeIter=0;window.__acts={};(0,eval)(s);
  /* the game's own give-up ask, exactly as j82 kg82Ask builds it */window.__gaveUp=0;kg82Ask(["Bỏ dở thì tính như thua: 0/10."],"Bỏ cuộc",()=>{window.__gaveUp=1});
  const open0=!!document.querySelector('#modal:not([hidden]) [data-kcf-yes]');let steps=0;for(;steps<5&&!window.__gaveUp;steps++){try{window.__modalStep(false)}catch(e){}}
  const dbg={def:typeof window.__modalStep,has:typeof window.__modalStep==='function'&&String(window.__modalStep).includes('data-kcf-yes')};let er='';try{window.__modalStep(false)}catch(e){er=String(e)}return{dbg,er,open0,gaveUp:window.__gaveUp,steps,open1:!!document.querySelector('#modal:not([hidden]) [data-kcf-yes]')}},IP);
 console.log(JSON.stringify(r));const ok=r.open0&&r.gaveUp===1&&!r.open1;console.log(ok?'ok   the bot answers «Bỏ cuộc?» (lose path ran, confirm closed)':'FAIL the bot leaves «Bỏ cuộc?» open');
 await b.close();process.exit(ok?0:1)})();
