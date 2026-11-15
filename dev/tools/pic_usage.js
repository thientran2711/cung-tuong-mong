/* Shared-picture audit for DIALOGS (review/gift-ui, owner 11/15). Scope: dialogs / popups / festival + invitation cards / news / gift + item
   dialogs / NPC event banners / fallbacks. Act cards, the week book (Tuần lục) and act result lines are mapped by review/act-pics2
   (dev/art/ACT_PIC_ALL.md, dev/figwork/acts/meanings*.py) and are NOT re-audited here; the report cross-references that list by file name.
   Runs the game (Playwright), opens every dialog it can build and records the picture each one shows:
     · every PEND builder (with a rival / an item / nothing as parameter)   · every E68 event template (e68Test)
     · every T72 quest (q72Test)   · every festival: invitation variants (j71Fest), the festival day (j71Day), feast invitations (j71FeastInvite)
     · news cards   · the gift dialog (item picture expected)
   For each: id, title, first sentence, picture file, label, and whether the id has its OWN mapping in img/EVENTS.json or fell back.
   usage: node dev/tools/pic_usage.js <url of a build page> <out.json>
   then:  python3 dev/tools/pic_usage_report.py <out.json> dev/review/pic-shared.md [ACT_PIC_ALL.md] */
const {chromium}=require('playwright');const fs=require('fs');
const [,,BASE,OUT]=process.argv;
(async()=>{const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{});
 const ctx=await b.newContext({viewport:{width:1180,height:820},reducedMotion:'reduce',ignoreHTTPSErrors:true,serviceWorkers:'block'});
 await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
 /* pictures are not needed, only their names: answer every image request with an empty 1x1 so the run is fast and offline-safe */
 await ctx.route(/\.(webp|png|jpg)(\?|$)/,r=>r.fulfill({status:200,contentType:'image/png',body:Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==','base64')}));
 const p=await ctx.newPage();p.setDefaultTimeout(600000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function');await p.waitForTimeout(3000);
 await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;
  for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}
  Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;document.querySelectorAll('.kroul,#kroul,#kroulw').forEach(e=>e.remove());
  try{S.inv.push({k:"tramngoc",from:"me"})}catch(e){}try{if(typeof wkMake==="function")S.inv.push(wkMake(S,"mon",0,7))}catch(e){}render()});
 await p.waitForFunction(()=>typeof EVART!=='undefined'&&EVART,null,{timeout:60000}).catch(()=>{});
 const res=await p.evaluate(()=>{const rows=[];const P=s=>String(s||"").replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim();
  const close=()=>{Q.length=0;const M=document.getElementById('modal');M.hidden=true};
  const idOf=m=>{if(!m)return"";const pp=m.pp||{};return m.evId||(m.pid?(m.pid+(pp&&(pp.id||pp.k)?":"+(pp.id||pp.k):"")):"")||(m.kind==="news"?"news:"+(m.t||""):"")};
  const look=(src,extra)=>{const M=document.getElementById('modal');if(M.hidden)return;const m=Q[0]||{};
   const img=M.querySelector('#mb .kdlgart .ksart > img, #mb .kpsubj .ksart > img, #mb .kpsubj.kgiftpic img');const fr=M.querySelector('#mb .kdlgart .ksart, #mb .kpsubj .ksart');
   const pic=img?(img.getAttribute('src')||"").split('/').pop().split('?')[0]:"";const id=extra&&extra.id||idOf(m);
   const own=id&&typeof evArtCat==="function"?(evArtCat(id)||""):"";
   rows.push({src,id,title:P(document.getElementById('mt').textContent),first:(P(m.h||"").split(/(?<=[.!?…])\s/)[0]||P(M.querySelector('#mb .kpmain, #mb .kpb')?.innerText||"")).slice(0,160),
    pic,label:fr?P(fr.querySelector('figcaption,.ksart-chip')?.textContent||fr.title||""):"",own,person:!!M.querySelector('#mb .kes, #mb .kesov'),item:!!M.querySelector('.kgiftpic')})};
  const R=liveRivals(true);const v=R[0];const wix=S.inv.findIndex(e=>e&&e.wk),iix=S.inv.findIndex(e=>e&&e.k==="tramngoc");
  /* 1. PEND */
  for(const id of Object.keys(PEND)){for(const pp of [{v:v&&v.id,ix:iix},{ix:id==="wkgive"?wix:iix},{v:v&&v.id},{}]){let d=null;try{d=PEND[id](Object.assign({},pp))}catch(e){d=null}if(!d||!(d.o||d.t))continue;
    close();try{pushDil(mkP(id,pp),id);showModal()}catch(e){continue}look("PEND");close();break}}
  /* 2. E68 events */
  try{for(const id of Object.keys(E68I||{})){close();try{if(e68Test(id))look("E68",{id:"e68:"+id})}catch(e){}close()}}catch(e){}
  /* 3. T72 quests */
  try{for(const id of Object.keys(T72I||{})){close();try{if(q72Test(id,true))look("T72",{id:"q72:"+id})}catch(e){}close()}}catch(e){}
  /* 4. festivals */
  try{for(const k of Object.keys(FV7||{})){for(let vi=0;vi<(FV7[k]||[]).length;vi++){close();try{if(j71Fest(k,vi))look("FEST-invite",{id:"j71f:"+k+"#"+vi})}catch(e){}close()}
    close();try{if(j71Day(k))look("FEST-day",{id:"j71d:"+k})}catch(e){}close()}}catch(e){}
  try{for(const kk of Object.keys(FX7||{})){close();try{if(j71FeastInvite(kk))look("FEAST-invite",{id:"j71x:"+kk})}catch(e){}close()}}catch(e){}
  /* 5. news */
  try{const N=(S.news||[]).slice(0,6);const L=N.length?N:[{t:"Tin trong cung"}];for(const n of L){close();Q.push({t:"Tin trong cung",kind:"news",h:`<p>${P(n.t||n.h||n.s||"")}</p>`});showModal();look("NEWS");close()}}catch(e){}
  /* 6. gift */
  try{close();itemAct("gift",wix);look("GIFT",{id:"giftpick:item"})}catch(e){}close();
  return{rows,fallback:window.KIT_PICFALL||{}}});
 fs.writeFileSync(OUT,JSON.stringify(Object.assign(res,{errs}),null,1));console.log(res.rows.length,'dialogs',Object.keys(res.fallback).length,'fallback ids',errs.length,'errors');await b.close()})().catch(e=>{console.error(e);process.exit(2)});
