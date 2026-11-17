/* review/seatcap: ACTIVE play — the measure smart bot (dev/measure/inpage6.js, mode "sens" | "rand") plays real lives (she can die, fall, rise);
   a monitor checks the holders of every capped rank at the end of every turn. usage: node dev/test/seatcap-active.js <url> [lives=10] [mode=sens]
   Prints JSON {maxHolders, overMonths, lives, months, settle}; exit 1 on over-cap or page error. */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,LIVES='10',MODE='sens']=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch({args:['--blink-settings=imagesEnabled=false']});const ctx=await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'});
 await ctx.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)(\?|$)/,r=>r.abort().catch(()=>{}));const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));p.setDefaultTimeout(1200000);
 await p.goto(URL,{waitUntil:'domcontentloaded'});for(let i=0;i<300;i++){if(await p.evaluate(()=>typeof start==='function'&&!!window.__ctmBuilt).catch(()=>false))break;await sleep(300)}
 await p.evaluate(()=>{localStorage.clear();window.__nlInner=1;SLOT=1;start();window.__nlInner=0});
 await p.evaluate(fs.readFileSync(__dirname+'/../measure/inpage6.js','utf8'));
 await p.evaluate(()=>{window.__sc={mx:{},over:{},months:0};const e0=endTurn;endTurn=function(){const t=S&&S.turn;const r=e0.apply(this,arguments);try{if(S&&S.turn!==t){window.__sc.months++;
   for(const k in SEATCAP){const n=consorts().filter(q=>rkOf(q)===+k).length;window.__sc.mx[k]=Math.max(window.__sc.mx[k]||0,n);if(n>SEATCAP[k])window.__sc.over[k]=(window.__sc.over[k]||0)+1}}}catch(e){}return r}});
 const t0=Date.now();let n=0;while(true){n=await p.evaluate(([m])=>window.__bot.step(m,300),[MODE]).catch(e=>{errs.push('step:'+e.message.slice(0,120));return 1e9});if(n>=+LIVES||Date.now()-t0>3000e3)break}
 const r=await p.evaluate(()=>({sc:window.__sc,lives:(window.__res||[]).length,maxRank:(window.__res||[]).map(x=>x.rank!=null?x.rank:x.r).slice(0,40),settle:window.__seatN||null}));
 console.log(JSON.stringify({cap:await p.evaluate(()=>SEATCAP),maxHolders:r.sc.mx,overMonths:r.sc.over,months:r.sc.months,lives:r.lives,ranks:r.maxRank,settle:r.settle,errs:errs.slice(0,6)}));
 await b.close();process.exit(errs.length||Object.keys(r.sc.over).length?1:0)})().catch(e=>{console.error(e);process.exit(1)});
