/* robot10 E-FIX-3 proof (E round 1 R1 «save does not load: setItem exceeded the quota» at year 17): how big the save grows and why.
   Plays the robot's sensible bot (dev/measure/inpage6.js, render off like the robot) for YEARS game years (default 2) from <save.json>
   (or a new life with NEW=1) and prints: the save size (JSON chars of ser(), what j6 save() writes), S.il.box pieces (all / Nội vụ phủ «kho»+«net»
   allotment consumables = used-up candles, hair oil, son phấn boxes), and growth per year. Chrome keeps ~5.2 M chars per site (all slots together).
   usage: [OUT=end.json] node dev/test/r10e-save-size.js <save.json|-> [years]   exit 1 when used-up consumables still pile up in the store (> 50 after the run) */
const {chromium}=require('./lib/pw-roulette');const {serve,BASE}=require('./coop-serve.js');const fs=require('fs'),path=require('path');
const save=process.argv[2],YEARS=+process.argv[3]||2;const IP=fs.readFileSync(path.join(__dirname,'../measure/inpage6.js'),'utf8');
(async()=>{const b=await chromium.launch({args:['--no-sandbox']});const ctx=await b.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});await serve(ctx);
 await ctx.addInitScript(()=>{window.COOP_URL='http://127.0.0.1:9/';window.MutationObserver=class{observe(){}disconnect(){}takeRecords(){return[]}};HTMLElement.prototype.focus=function(){}});
 await ctx.addInitScript(require('../measure/robot10-lag.js').BOT_INIT);
 await ctx.addInitScript(`(function(){let s=7>>>0;Math.random=function(){s=(s+0x6D2B79F5)>>>0;let t=s;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296}})();`);
 const p=await ctx.newPage();await p.goto(BASE,{waitUntil:'domcontentloaded',timeout:120000});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:120000});await p.waitForTimeout(500);
 await p.evaluate(IP);const sv=save&&save!=='-'?JSON.parse(fs.readFileSync(save,'utf8')):null;
 await p.evaluate(d=>{document.querySelectorAll('#kload,#kroul,#kroulw,#klife').forEach(e=>e.remove());document.getElementById('title').hidden=true;SLOT=1;Q=[];if(d){deser(d);try{closeModal()}catch(e){}try{deal()}catch(e){}}else start()},sv);
 const snap=()=>p.evaluate(()=>{let n=0;try{n=JSON.stringify(ser()).length}catch(e){}const box=(S.il&&S.il.box)||[];
  const used=box.filter(x=>x.at==='nvp'&&(x.why==='kho'||x.why==='net')&&x.e&&(/^al(dau|nen)\d$/.test(x.e.k)||(typeof lxOf==='function'&&lxOf(x.e.k)&&!(x.e.u>0)))).length;
  return {year:S.year,month:S.month,dead:!!S.dead,chars:n,box:box.length,used,kho:box.filter(x=>x.why==='kho').length,inv:(S.inv||[]).length,npcInv:rivals.reduce((a,v)=>a+((v.inv||[]).length),0),top:Object.entries(box.reduce((m,x)=>{const k=x.at+':'+x.why+':'+String(x.e&&x.e.k).slice(0,6);m[k]=(m[k]||0)+1;return m},{})).sort((a,b)=>b[1]-a[1]).slice(0,6).map(x=>x.join('='))}});
 const a=await snap();console.log('start',JSON.stringify(a));const y1=a.year+YEARS;let z=a,guard=0;
 while(guard++<4000){await p.evaluate(()=>window.__bot.step('sens',200));z=await snap();if(z.dead||z.year>y1||(z.year===y1&&z.month>=a.month))break;if(guard%10===0)console.log('  ..',JSON.stringify(z))}
 console.log('end  ',JSON.stringify(z));if(process.env.OUT)fs.writeFileSync(process.env.OUT,await p.evaluate(()=>JSON.stringify(ser())));/* OUT=<file>: the end save, for dev/test/r10e-grow-scan.js */const yrs=Math.max(.25,(z.year-a.year)+(z.month-a.month)/12);
 console.log(`per year: save +${Math.round((z.chars-a.chars)/yrs)} chars · box +${Math.round((z.box-a.box)/yrs)} pieces · used-up consumables in the store ${a.used} → ${z.used}`);
 await b.close();process.exit(z.used>50?1:0)})();
