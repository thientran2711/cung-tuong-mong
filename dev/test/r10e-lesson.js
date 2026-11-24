/* robot10 E-FIX-2 r3 proof (E round 1 TIMEOUT «lc out:1» (R1, ring lesson:@lc ×400) and «tgk» (R4 cnv_mat, ring lesson:@tgk ×400)):
   an art can hold 100 points below level 5 (jbalcore crsPts); j2 lesson() then refuses (artPts>=100) and nothing moves. The bot (dev/measure/inpage6.js,
   or IP6=<file>) offered that lesson again and again (its option had no L, so the 3-pick ban never hit) → no progress → TIMEOUT.
   Check: with one art at level 4 / 100 points and every other art at 5, (a) the bot's lesson candidates leave it out, (b) 450 sensible steps move the clock.
   usage: node dev/test/r10e-lesson.js <save.json>   exit 1 on a fail */
const {chromium}=require('./lib/pw-roulette');const {serve,BASE}=require('./coop-serve.js');const fs=require('fs'),path=require('path');
const save=process.argv[2];let IP=fs.readFileSync(process.env.IP6||path.join(__dirname,'../measure/inpage6.js'),'utf8');
IP=IP.replace('function lessonCands(){','window.__lessonCands=()=>lessonCands();function lessonCands(){');
(async()=>{const b=await chromium.launch({args:['--no-sandbox']});const ctx=await b.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});await serve(ctx);
 await ctx.addInitScript(()=>{window.COOP_URL='http://127.0.0.1:9/';window.MutationObserver=class{observe(){}disconnect(){}takeRecords(){return[]}};HTMLElement.prototype.focus=function(){}});
 await ctx.addInitScript(require('../measure/robot10-lag.js').BOT_INIT);
 const p=await ctx.newPage();await p.goto(BASE,{waitUntil:'domcontentloaded',timeout:120000});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:120000});await p.waitForTimeout(500);
 await p.evaluate(IP);const sv=JSON.parse(fs.readFileSync(save,'utf8'));
 const r=await p.evaluate(d=>{document.querySelectorAll('#kload,#kroul,#kroulw,#klife').forEach(e=>e.remove());document.getElementById('title').hidden=true;SLOT=1;Q=[];deser(d);try{closeModal()}catch(e){}
  /* only one thing to do: every art mastered but «thi» = level 4 with 100 points; rich and rested; no visit, no cards, no places worth going */
  S.artp=S.artp||{};ARTS.forEach(a=>{S.arts[a.k]=5});S.arts.thi=4;S.artp.thi=200;S.bac=900;S.suc=100;window.__noSelf=1;window.__minS=1.9;
  const k=window.__lessonCands().map(a=>a.k);const pts=artPts(S,"thi");const t0=S.turn+'_'+S.tuan+'_'+(S.buoi||0);
  Q.length=0;for(let i=0;i<450;i++){try{window.__bot.step('sens',1)}catch(e){}if(window.__res.length)break}
  return{cands:k,pts,res:window.__res.map(x=>x.title),moved:t0!==(S.turn+'_'+S.tuan+'_'+(S.buoi||0)),ring:(window.__ring||[]).slice(-4)}},sv);
 console.log(JSON.stringify(r));const ok=!r.cands.includes('thi')&&!r.res.includes('TIMEOUT');
 console.log(ok?'ok   a maxed-points art is not offered; the bot moves on':'FAIL the bot keeps offering a lesson the game refuses');await b.close();process.exit(ok?0:1)})();
