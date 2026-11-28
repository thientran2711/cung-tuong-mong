/* review/gift-ui: every dialog shows its REAL subject picture — never the "Triều chính" fallback outside court business.
   Opens every PEND dialog builder (with a rival / an inventory item / nothing as parameter), plus a news card and the gift dialogs,
   and checks the left picture. FAIL when a dialog shows an ev-trieu-chinh picture while its own id is not mapped to the court category.
   usage: node dev/test/dialog-art.js <url of a build page> [WxH] → JSON {checked, fallback:[ids], court:[ids], errs}; exit 1 on any fallback. */
const {chromium}=(require('./lib/bigpage'),require('playwright'));
const [,,BASE,SZ]=process.argv;const [W,H]=(SZ||'755x1000').split('x').map(Number);
(async()=>{const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{});
 const ctx=await b.newContext({viewport:{width:W,height:H},reducedMotion:'reduce',ignoreHTTPSErrors:true,serviceWorkers:'block'});
 await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
 const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function');await p.waitForTimeout(3000);
 await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;
  for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}
  Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;
  document.querySelectorAll('.kroul,#kroul,#kroulw').forEach(e=>e.remove());
  /* something to give: a bought item and a handmade work */
  try{S.inv.push({k:"tramngoc",from:"me"})}catch(e){}try{if(typeof wkMake==="function")S.inv.push(wkMake(S,"mon",0,7))}catch(e){}render()});
 await p.waitForFunction(()=>typeof EVART!=='undefined'&&EVART,null,{timeout:60000}).catch(()=>{});
 const res=await p.evaluate(()=>{const out={checked:0,fallback:[],court:[],shown:[]};
  const R=liveRivals(true);const v=R[0];const wix=S.inv.findIndex(e=>e&&e.wk),iix=S.inv.findIndex(e=>e&&e.k==="tramngoc");
  const tries=id=>[{v:v&&v.id,ix:iix},{ix:id==="wkgive"?wix:iix},{v:v&&v.id},{}];
  const look=(id)=>{const M=document.getElementById('modal');if(M.hidden)return;out.checked++;const img=M.querySelector('#mb .kpsubj img, #mb .kdlgart img');const src=img?img.getAttribute('src')||"":"";
   const lab=(M.querySelector('#mb .kpsubj.kpev')||{}).innerText||"";const ev=/ev-trieu-chinh/.test(src)||/Triều chính/.test(lab);
   const mapped=typeof evArtCat==="function"&&evArtCat(id)==="trieu-chinh";out.shown.push([id,src.split('/').pop()||lab.split('\n')[0]||"-"]);
   if(ev)(mapped?out.court:out.fallback).push(id)};
  const close=()=>{Q.length=0;const M=document.getElementById('modal');M.hidden=true};
  for(const id of Object.keys(PEND)){for(const pp of tries(id)){let d=null;try{d=PEND[id](Object.assign({},pp))}catch(e){d=null}if(!d||!(d.o||d.t))continue;
    close();try{pushDil(mkP(id,pp),id);showModal()}catch(e){continue}look(id);close();break}}
  /* the gift dialogs from the chest + a news card */
  try{close();itemAct("gift",wix);look("giftpick")}catch(e){}close();
  try{close();wkAct("give",wix);look("wkgive")}catch(e){}close();
  try{close();Q.push({t:"Tin trong cung",kind:"news",h:"<p>Một tin.</p>"});showModal();look("news")}catch(e){}close();
  return out});
 console.log(JSON.stringify(Object.assign(res,{errs})));await b.close();process.exit(res.fallback.length?1:0)})().catch(e=>{console.error(e);process.exit(2)});
