/* robot10 E-FIX-6 proof (R8 bd_tuyet lazy-5 + bd_hen lazy-2 / lazy-5: TIMEOUT, ring «spyQueen / dilemma» ×400, logs «Dò la: Thôi.»):
   the lazy bot takes the LAST option of every card; «Dò la» on the Hoàng hậu opens the act's road card (jtamco roadpick: Làm như thường /
   Hao tâm cơ / Thuê người / Thôi) → «Thôi» → no time passes → the bot chose spyQueen again: that option had no L label, so inpage6's
   3-per-buổi ban never hit it (the same hole the E-FIX-2 r3 lesson loop went through). Whole family: every unlabeled bot option.
   Check on a rank-6 save (R8-cautious-3, review/robot10-saves-r5): lazy persona, rich, spy open; 450 sensible steps must (a) not TIMEOUT,
   (b) move the clock, (c) list the dropped act in window.__selfLoop.
   usage: node dev/test/r10e-selfloop.js <save.json> [IP6=<inpage6 file> to run an older harness]   exit 1 on a fail */
const {chromium}=require('./lib/pw-roulette');const {serve,BASE}=require('./coop-serve.js');const fs=require('fs'),path=require('path');
const save=process.argv[2];const IP=fs.readFileSync(process.env.IP6||path.join(__dirname,'../measure/inpage6.js'),'utf8');
(async()=>{const b=await chromium.launch({args:['--no-sandbox']});const ctx=await b.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});await serve(ctx);
 await ctx.addInitScript(()=>{window.COOP_URL='http://127.0.0.1:9/';window.MutationObserver=class{observe(){}disconnect(){}takeRecords(){return[]}};HTMLElement.prototype.focus=function(){}});
 await ctx.addInitScript(require('../measure/robot10-lag.js').BOT_INIT);
 const p=await ctx.newPage();await p.goto(BASE,{waitUntil:'domcontentloaded',timeout:120000});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:120000});await p.waitForTimeout(500);
 await p.evaluate(IP);const sv=JSON.parse(fs.readFileSync(save,'utf8'));
 const r=await p.evaluate(d=>{document.querySelectorAll('#kload,#kroul,#kroulw,#klife').forEach(e=>e.remove());document.getElementById('title').hidden=true;SLOT=1;Q=[];deser(d);try{closeModal()}catch(e){}
  /* lazy persona exactly as robot10-in.js PERS.lazy: only strong options, takes the last option of every card */
  window.__minS=1.5;window.__noSelf=1;window.__persPick=ok=>ok[ok.length-1][1];
  S.bac=900;S.tamco=100;S.suc=100;S.place="home";const A=ACT.spy,o0=A.o;A.o=()=>60;/* the harness reads ACT.spy.o ≥ 40 to offer it */
  const t0=S.turn+'_'+S.tuan+'_'+(S.buoi||0),acts={};let roadCards=0;
  Q.length=0;for(let i=0;i<450;i++){if(Q[0]&&Q[0].pid==="roadpick")roadCards++;try{window.__bot.step('sens',1)}catch(e){}if(window.__res.length)break}
  A.o=o0;Object.assign(acts,window.__acts||{});
  return{rank:S.rank,qOn:qOn(),roadCards,spyQueen:acts.spyQueen||0,res:window.__res.map(x=>x.title),moved:t0!==(S.turn+'_'+S.tuan+'_'+(S.buoi||0)),selfLoop:window.__selfLoop||null,ring:(window.__ring||[]).slice(-4)}},sv);
 console.log(JSON.stringify(r));
 const pre=r.qOn&&r.roadCards>0;const ok=pre&&!r.res.includes('TIMEOUT')&&r.moved&&r.selfLoop&&Object.keys(r.selfLoop).some(k=>/^spyQueen/.test(k));
 console.log(!pre?'FAIL setup: spy on the Hoàng hậu was never offered (no queen / no spy button)':ok?'ok   the lazy bot drops the act it declined and moves on (listed in selfLoop)':'FAIL the bot keeps choosing an act it then declines (no progress)');
 await b.close();process.exit(ok?0:1)})();
