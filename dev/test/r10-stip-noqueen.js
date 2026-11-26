/* robot10 nc-fix-3b (js row «econ card TypeError: reading 'queen' of null»): a khất bổng order (S.cutPay, set by the Hoàng hậu in j20 payCuts)
   runs for months; when there is no Hoàng hậu any more (queenP() null) the month stipend card read rkName(null) and the whole card was lost.
   Also LAW 4: the cut share text comes from BAL.payCut («bớt N phần 10»). usage: node dev/test/r10-stip-noqueen.js <save.json>   exit 1 on a fail */
const {chromium}=require('./lib/pw-roulette');const {serve,BASE}=require('./coop-serve.js');const fs=require('fs');
let bad=0;const ok=(c,m,x)=>{if(!c)bad++;console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch({args:['--no-sandbox']});const txt=fs.readFileSync(process.argv[2],'utf8');
 const ctx=await b.newContext({viewport:{width:755,height:1000},reducedMotion:'reduce'});await serve(ctx);
 await ctx.addInitScript(()=>{window.COOP_URL='http://127.0.0.1:9/'});await ctx.addInitScript(t=>{try{localStorage.setItem('hclh-save-v2-1',t)}catch(e){}},txt);
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text().slice(0,200))});
 await p.goto(BASE,{waitUntil:'domcontentloaded',timeout:120000});await p.waitForFunction(()=>typeof deser==='function'&&document.querySelector('#modal.kpthome'),null,{timeout:90000});
 await p.evaluate(()=>{$("title").hidden=false;showTitle();const bt=document.querySelector('#slots [data-load="1"]');if(bt)bt.click();Q.length=0;try{closeModal()}catch(e){}});errs.length=0;
 const r=await p.evaluate(()=>{const out={};const q0=window.queenP;
  /* a cut ordered while there was a Hoàng hậu, then no Hoàng hậu: every stipend card road (her card + the stip event rows) */
  S.cutPay=2;S.cutBy="Hoàng hậu";window.queenP=queenP=()=>null;const n0=Q.length;
  try{econStipend(S)}catch(e){out.thrown=e.message}
  const cards=Q.slice(n0);out.cards=cards.length;out.text=cards.map(c=>(c.h||"").replace(/<[^>]+>/g," ")).join(" ").replace(/\s+/g," ");
  /* the stip event rows themselves (the road the robot hit: a skim WITH a cut, the cause list not empty) */
  try{const ev=stipEvent([],{cut:true,sup:null,bac:0,items:0,why:"",C:[{k:"x",txt:"x"}]});out.evRow=JSON.stringify(ev&&ev.h||ev).replace(/<[^>]+>/g," ").match(/Khất bổng[^"]{0,60}/);out.evOk=true}catch(e){out.evThrown=e.message}
  window.queenP=queenP=q0;Q.length=0;
  out.word=typeof payCutTxt==="function"?payCutTxt():"(typed)";out.expect=`${Math.round((1-BAL.payCut)*10)} phần 10`;return out});
 ok(!r.evThrown&&r.evOk,'stip event rows with a running cut and no Hoàng hậu',r.evThrown||r.evRow);
 ok(!r.thrown,'stipend with a running cut and no Hoàng hậu does not throw',r.thrown);
 ok(r.cards>=1,'the month stipend card still reaches her',r.cards);
 ok(!errs.some(e=>/econ card|stip/.test(e)),'no «econ card» / stip console error',errs.slice(0,3));
 ok(r.word===r.expect,'cut share text = BAL.payCut',[r.word,r.expect]);
 ok(!/3 phần 10/.test(r.text)||r.expect==='3 phần 10','no typed share on the card',r.text.slice(0,160));
 await b.close();process.exit(bad?1:0)})();
