/* save-growth (b): NPC son phấn stock over time — the monthly issue (BAL.ration.n boxes × BAL.ration.uses lượt, parts rotating) against the
   NPC month spend (BAL.ration.npc.use lượt per part). Loads <save.json> (or a new life with "-"), plays MONTHS game months (real turns, every
   dialog closed), and prints per living NPC consort: son phấn boxes and lượt left at the start / every 12 months / end, plus lượt issued vs spent.
   usage: [OUT=end.json] node dev/test/savegrow-rouge.js <save.json|-> [months=36]   exit 1 when the mean NPC stock still grows > 1 box a year */
const {chromium}=require('./lib/pw-roulette');const {serve,BASE}=require('./coop-serve.js');const fs=require('fs');
const SV=process.argv[2]||'-',MON=+process.argv[3]||36;
(async()=>{const b=await chromium.launch({args:['--no-sandbox']});const ctx=await b.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});await serve(ctx);
 await ctx.addInitScript(()=>{window.COOP_URL='http://127.0.0.1:9/';window.MutationObserver=class{observe(){}disconnect(){}takeRecords(){return[]}};HTMLElement.prototype.focus=function(){}});
 await ctx.addInitScript(`(function(){let s=11>>>0;Math.random=function(){s=(s+0x6D2B79F5)>>>0;let t=s;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296}})();`);
 const p=await ctx.newPage();const pe=[];p.on('pageerror',e=>pe.push(String(e).slice(0,200)));
 await p.goto(BASE,{waitUntil:'domcontentloaded',timeout:120000});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:120000});await p.waitForTimeout(500);
 const sv=SV!=='-'?fs.readFileSync(SV,'utf8'):null;
 await p.evaluate(d=>{document.querySelectorAll('#kload,#kroul,#kroulw,#klife').forEach(e=>e.remove());document.getElementById('title').hidden=true;SLOT=3;Q=[];quiet=true;
  if(d)deser(JSON.parse(d));else start();quiet=true;try{Q.length=0;closeModal()}catch(e){}
  /* count issue / spend in lượt per NPC (wrap the two month steps; the numbers stay BAL's) */
  window.__rg={iss:0,sp:0,n:0};const box=v=>(v.inv||[]).filter(e=>e&&typeof lxOf==="function"&&lxOf(e.k));const lu=v=>box(v).reduce((a,e)=>a+(e.u|0),0);
  /* lượt that arrive in NPC hands, by road (from: noivu = monthly issue, buy, emp = tribute, …), counted once per box */
  window.__rgIn={};const seen=new WeakSet();window.__rgScan=()=>{for(const v of consorts())if(lxNpcOk(v))for(const e of box(v))if(!seen.has(e)){seen.add(e);const k=String(e.from||'?');__rgIn[k]=(__rgIn[k]||0)+(e.u|0)}};
  __rgScan();window.__rgIn={};
  const s0=lxNpcSpend;window.lxNpcSpend=lxNpcSpend=function(v){const a=lu(v);const r=s0.apply(this,arguments);__rg.sp+=a-lu(v);return r};
  window.__rgSnap=()=>{const L=consorts().filter(v=>lxNpcOk(v));const bx=L.map(v=>box(v).length),u=L.map(v=>lu(v));const m=a=>a.length?+(a.reduce((x,y)=>x+y,0)/a.length).toFixed(1):0;
   const hu=L.map(v=>(v.inv||[]).filter(e=>e&&lxOf(e.k)&&!(e.u>0)).length),fu=L.map(v=>box(v).filter(e=>e.u>0).length);
   return {y:S.year,m:S.month,npc:L.length,husk:m(hu),full:m(fu),boxMean:m(bx),boxMax:Math.max(0,...bx),luotMean:m(u),use:BAL.ration.npc.use,n:BAL.ration.n.join(""),uses:BAL.ration.uses.join("")}}},sv);
 const rows=[];rows.push(await p.evaluate(()=>__rgSnap()));let m0=await p.evaluate(()=>S.year*12+S.month),guard=0;const end=m0+MON;
 while(guard++<MON*40){const r=await p.evaluate(()=>{for(let i=0;i<20;i++){if(S.dead)return{dead:1};try{__rgScan()}catch(e){}try{Q.length=0;closeModal()}catch(e){}try{if(S.mg)S.mg=null}catch(e){}try{nextBuoi()}catch(e){}}try{Q.length=0;closeModal()}catch(e){}return{t:S.year*12+S.month,dead:!!S.dead}});
  if(r.dead)break;if(r.t>=m0+12){m0=r.t;rows.push(await p.evaluate(()=>__rgSnap()))}if(r.t>=end)break}
 rows.push(await p.evaluate(()=>__rgSnap()));const sp=await p.evaluate(()=>__rg.sp);const inn=await p.evaluate(()=>__rgIn);
 console.log('| game y/m | NPC | son phấn records / NPC | of which empty (0 lượt) | with lượt | max | lượt left / NPC | BAL n · uses · npc.use |');console.log('|---|---|---|---|---|---|---|---|');
 for(const r of rows)console.log(`| ${r.y}/${r.m} | ${r.npc} | ${r.boxMean} | ${r.husk} | ${r.full} | ${r.boxMax} | ${r.luotMean} | ${r.n} · ${r.uses} · ${r.use} |`);
 const yrs=Math.max(1,(rows[rows.length-1].y*12+rows[rows.length-1].m-(rows[0].y*12+rows[0].m))/12),gr=(rows[rows.length-1].boxMean-rows[0].boxMean)/yrs;
 console.log(`growth ${gr.toFixed(2)} records / NPC / year · lượt spent by NPC month ${sp} · lượt in by road ${JSON.stringify(inn)} · page errors ${pe.length}${pe.length?' '+pe.slice(0,3).join(' | '):''}`);
 if(process.env.OUT){const t=await p.evaluate(()=>{quiet=false;return JSON.stringify(ser())});fs.writeFileSync(process.env.OUT,t);console.log(`OUT ${process.env.OUT} ${t.length} chars (year ${rows[rows.length-1].y})`)}
 await b.close();process.exit(gr>1?1:0)})();
