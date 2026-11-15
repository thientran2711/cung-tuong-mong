/* Thiếu lễ (jaudit §16): underdressed at Thỉnh an Thái hậu → the card warns in Kèm, the act costs Danh/Đức and Thái hậu's favour;
   properly dressed (a bestowed rank set worn) → no warning, no cost. usage: node dev/test/thieu-le.js <url> */
const {chromium}=require('playwright');const [,,URL]=process.argv;
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:755,height:1000},deviceScaleFactor:2,serviceWorkers:'block'})).newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));p.setDefaultTimeout(0);
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(1500);
 const r=await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;for(let i=0;i<8;i++){start();if(!isSrv())break}Q.length=0;
  const out={};const roll0=roll;roll=()=>true;
  const run=(dressed)=>{S.inv=(S.inv||[]).map(e=>Object.assign({},e,{w:0}));if(!dressed&&!S.inv.some(e=>IT[e.k]&&IT[e.k].sl)){const k=Object.keys(IT).find(k=>IT[k].sl);if(k)S.inv.push({k})}S.dress=null;S.rankSet=dressed?S.rank:null;S.rankSetWorn=!!dressed;S.buoi=0;used=0;S.suc=80;
   const a=talkOpts({kind:"th"}).find(x=>/^Thỉnh an/.test(x.n));const card=[a.x,a.risk].join(" | ");const b0={danh:S.danh,duc:S.duc,th:S.th};a.lock=false;const rr=runOpt(a);out.dbg=out.dbg||[];out.dbg.push({rr,lock:a.lock,c:a.c,w:a.w,o:a.o,n:a.n,danh:S.danh});
   return{card,thieu:aaThieuLe(S),d:{danh:S.danh-b0.danh,duc:S.duc-b0.duc,th:S.th-b0.th}}};
  out.under=run(false);out.dressed=run(true);roll=roll0;
  out.ok=out.under.thieu&&/thiếu lễ/.test(out.under.card)&&!out.dressed.thieu&&!/thiếu lễ/.test(out.dressed.card)&&(out.dressed.d.danh-out.under.d.danh)===-BAL.thieuLe.danh&&(out.under.d.th-out.dressed.d.th)===+((out.under.card.match(/Thái hậu thiện cảm (-?\d+)/)||[])[1]);
  return out});
 console.log(JSON.stringify({r,errs},null,1));await b.close();process.exit(r.ok&&!errs.length?0:1)})();
