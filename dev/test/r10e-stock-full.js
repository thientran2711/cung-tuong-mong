/* robot10 E-FIX-3 r4 (E81r r2 item 2, law 1): the Nội vụ phủ counted stock (S.il.stock) hands out ONLY full pieces — a whole candle, a hair-oil
   bottle with all its lượt (BAL.allot.oil.uses) — i.e. the same piece her own monthly issue mints; part-used bottles stay counted in the stock.
   usage: node dev/test/r10e-stock-full.js <save.json>   exit 1 on a fail */
const {chromium}=require('./lib/pw-roulette');const fs=require('fs');const SV=process.argv[2];const {serve,BASE}=require('./coop-serve.js');let bad=0;const ok=(c,m,x)=>{if(!c)bad++;console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch({args:['--no-sandbox']});const ctx=await b.newContext({viewport:{width:755,height:1000},reducedMotion:'reduce'});await serve(ctx);
 await ctx.addInitScript(()=>{window.COOP_URL='http://127.0.0.1:9/'});const p=await ctx.newPage();const pe=[];p.on('pageerror',e=>pe.push(String(e)));
 await p.goto(BASE,{waitUntil:'domcontentloaded',timeout:120000});await p.waitForFunction(()=>typeof start==='function',null,{timeout:120000});await p.waitForTimeout(800);
 await p.evaluate(d=>{document.querySelectorAll('#kload,#kroul,#kroulw,#klife').forEach(e=>e.remove());document.getElementById('title').hidden=true;SLOT=3;Q=[];quiet=true;deser(JSON.parse(d));quiet=false;try{Q.length=0;closeModal()}catch(e){}render()},fs.readFileSync(SV,'utf8'));await p.waitForTimeout(800);
 const r=await p.evaluate(()=>{const F=BAL.allot.oil.uses,I=S.il;const T0=I.stock;const out={F};
  I.stock={["aldau0.2"]:3,["aldau0.4"]:2,["aldau0."+F]:1,alnen0:2};
  out.a=ilStockTake("aldau0");out.b=ilStockTake("aldau0");out.c=ilStockTake("alnen0");out.d=ilStockTake("alnen0");out.e=ilStockTake("alnen0");out.left=JSON.parse(JSON.stringify(I.stock));
  /* a month's NPC issue (jstip stipGoods) with only part-used oil in stock: the NPC gets a full bottle, the part-used stay */
  I.stock={["aldau0.2"]:5};out.npc=0;out.got=[];for(const n of (rivals||[])){if(!n||n.dead||!Array.isArray(n.inv))continue;out.npc++;const before=n.inv.length;let G=[];try{G=stipGoods(n)}catch(e){out.err=String(e)}
   for(const g of G||[])for(const e of g.E||[])if(/^aldau/.test(e.k))out.got.push(e.u);if(out.got.length>=3)break}
  out.left2=JSON.parse(JSON.stringify(I.stock));I.stock=T0;return out});
 ok(r.a&&r.a.u===r.F,'oil: the stock hands out the FULL bottle',r.a);ok(r.b===null,'oil: part-used bottles (2, 4 lượt) are never handed out → mint a new one',r.b);
 ok(r.c&&r.d&&r.e===null,'candles (no lượt) are whole: handed out while counted',[r.c,r.d,r.e]);
 ok(r.left["aldau0.2"]===3&&r.left["aldau0.4"]===2,'part-used bottles stay counted in the stock (law 6c)',r.left);
 ok(r.got.length>0&&r.got.every(u=>u===r.F),'NPC month issue: every bottle is full, like hers',{got:r.got,err:r.err});
 /* E81r: the same stipGoods also trims that NPC's surplus INTO the stock, so the part-used count may grow — it must never drop */ok(r.got.length>0&&r.left2["aldau0.2"]>=5,'NPC month issue leaves the part-used stock as it was',r.left2);
 ok(!pe.length,'no page error',pe.slice(0,3));await b.close();console.log(bad?`FAIL ${bad}`:'ALL OK');process.exit(bad?1:0)})();
