/* robot10 E-FIX-1 runtime proof: the monthly bổng lộc card with a khất bổng while the Hoàng hậu seat is EMPTY (robot «econ card TypeError null.queen»).
   Loads a save, empties the seat (no queen), sets a khất bổng, runs econStipend(S): the card must be built, its «Khất bổng» row must name a real
   orderer (the order's cutBy, else Nội vụ phủ), and no console.error. Also: the same with a queen on the seat (unchanged path).
   usage: node dev/test/r10e-econ-noqueen.js <save.json>   exit 1 on a fail */
const {chromium}=require('./lib/pw-roulette');const {serve,BASE}=require('./coop-serve.js');const fs=require('fs');
const save=process.argv[2];let bad=0;const ok=(c,m,x)=>{if(!c)bad++;console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch({args:['--no-sandbox']});const ctx=await b.newContext({viewport:{width:755,height:1000},reducedMotion:'reduce'});await serve(ctx);
 await ctx.addInitScript(()=>{window.COOP_URL='http://127.0.0.1:9/'});await ctx.addInitScript(t=>{try{localStorage.setItem('hclh-save-v2-1',t)}catch(e){}},fs.readFileSync(save,'utf8'));
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load|net::ERR_/.test(m.text()))errs.push(m.text())});
 await p.goto(BASE,{waitUntil:'domcontentloaded',timeout:120000});await p.waitForFunction(()=>typeof deser==='function'&&document.querySelector('#modal.kpthome'),null,{timeout:90000});
 await p.evaluate(()=>{$("title").hidden=false;showTitle();const bt=document.querySelector('#slots [data-load="1"]');if(bt)bt.click()});await p.waitForTimeout(2500);
 const run=(c)=>p.evaluate(c=>{const q=rivals[0];if(!c.queen){q.queen=false;q.alive=false}else{q.queen=true;q.alive=true;q.out=false}
  if(S.rank>=7)S.rank=5;S.out=false;S.confined=0;S.sung=0;S.cutPay=1;S.cutBy=c.by;Q.length=0;let e0=null;const ce=console.error;console.error=(...a)=>{e0=a.map(String).join(' ');ce.apply(console,a)};
  let evH='';const se=stipEvent;stipEvent=function(){const r=se.apply(this,arguments);evH=r&&r.h||'';return r};try{econStipend(S)}finally{console.error=ce;stipEvent=se}const card=Q.find(x=>/Bổng lộc tháng/.test(x.t||''));const h=card?String(card.h+' '+evH).replace(/<[^>]+>/g,' ').replace(/\s+/g,' '):'';
  const i=h.indexOf('Khất bổng');return{qOn:qOn(),err:e0,card:!!card,row:i>=0?h.slice(i,i+60):null}},c);
 for(const c of [{queen:false,by:"",want:/theo ý Nội vụ phủ/},{queen:false,by:"Hoàng hậu",want:/theo ý Hoàng hậu/},{queen:true,by:"",want:/theo ý Hoàng hậu/}]){
  const r=await run(c);ok(!r.err&&r.card,`seat ${c.queen?'filled':'EMPTY'}, cutBy «${c.by}»: bổng lộc card built, no console.error`,r.err||undefined);
  ok(r.row&&c.want.test(r.row),`  Khất bổng row names the orderer`,r.row)}
 ok(!errs.length,'no page errors',errs.slice(0,2));await b.close();console.log(bad?`FAIL ${bad}`:'ALL OK');process.exit(bad?1:0)})();
