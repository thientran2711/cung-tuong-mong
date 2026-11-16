/* ACT DEDUPE wave 1 checks (review/act-dedupe): Hành sự has no study cards and every pool card; shared doors lock both sides;
   removed copies gone; Nội vụ phủ place + rare item; place icons on map/list; "!" happenings fire on arrival; grey-card tap → reason.
   usage: node dev/test/act-dedupe-w1.js <url> [W]x[H]@dpr  → prints JSON lines + "FAIL n" */
const {chromium}=require('playwright');const fs=require('fs');
const src=fs.readFileSync(__dirname+'/act-audit.js','utf8');const LIB=src.match(/const LIB=String\.raw`([\s\S]*?)`;\n\(async/)[1];
const [,,URL,SZ]=process.argv;const [WH,DPR]=(SZ||'755x1000@1').split('@');const [W,H]=WH.split('x').map(Number);
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+(DPR||1),hasTouch:W<1100,isMobile:W<1100,reducedMotion:'reduce',serviceWorkers:'block'});
 const p=await ctx.newPage();const perr=[];p.on('pageerror',e=>perr.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'load',timeout:0});await p.addStyleTag({content:'.modal.kload,#kload{display:none!important}'});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(3000);
 await p.evaluate(LIB);let fail=0;const ck=(n,ok,info)=>{if(!ok)fail++;console.log((ok?'ok   ':'FAIL ')+n+(info?' · '+JSON.stringify(info).slice(0,300):''))};
 const r=await p.evaluate(()=>{AA.scen('dau');const out={};S.bac=500;S.suc=80;S.buoi=0;used=0;deal();
  out.deck=deck.map(a=>a.n);
  out.study=deck.filter(a=>/^(Tự học|Tự luyện)/.test(a.n)).length;
  out.gone=deck.filter(a=>/^(Phát chẩn|Tụng kinh|Đánh đàn ở ngự hoa viên|Chữa bệnh cho con|Đưa con đến)/.test(a.n)).map(a=>a.n);
  out.pool=pool().map(a=>a.n).filter(n=>!deck.some(a=>a.n===n)&&!/^(Phát chẩn|Tụng kinh|Đánh đàn|Luyện cầm|Thưởng cung nữ)/.test(n));
  /* doors: Thỉnh an Thái hậu via Hành sự → Thái hậu pop-up locked */
  const i=deck.findIndex(a=>a.n==="Thỉnh an Thái hậu");out.thIdx=i;if(i>=0){act(i)}
  const o=talkOpts({kind:"th"}).find(a=>/^Thỉnh an/.test(a.n));out.thPopLock=!!(o&&o.lock);out.thPopWhy=o&&o.t;
  /* maid pop-up door → Hành sự card */
  const mi=deck.findIndex(a=>a.n==="Trò chuyện với cung nữ");goTo("home");const mp=curPeople().findIndex(x=>x.kind==="maid");popIdx=mp;
  const mo=talkOpts(curPeople()[mp]);out.maidOpts=mo.map(a=>a.n);const ti=mo.findIndex(a=>a.n==="Trò chuyện với cung nữ");if(ti>=0)talk(ti);
  out.maidDeckLock=mi>=0?!!deck[mi].lock:null;out.maidDeckWhy=mi>=0?cardWhy(deck[mi]):null;popIdx=null;
  {deal();used=0;Q.length=0;const si=deck.findIndex(a=>a.n==="Sai cung nữ đi dò la");out.spyIdx=si;if(si>=0){act(si);out.spyQ=Q.length&&Q[0].t;const m=Q[0];if(m&&m.opts){chooseM(0)}out.spyDone=!!deck[si].done;out.spyPopLock=!!(talkOpts({kind:"maid"}).find(a=>a.n==="Sai đi dò la")||{}).lock;Q.length=0}}
  out.tyv=talkOpts({kind:"ty"}).map(a=>a.n);out.fallen=talkOpts({kind:"fallen"}).map(a=>a.n);
  /* Nội vụ phủ */
  out.places=places().map(x=>x.k);used=0;S.buoi=1;goTo("nvp");out.atNvp=S.place;out.nvpPeople=curPeople().map(x=>x.kind+":"+x.name);
  const pi=curPeople().findIndex(x=>x.kind==="peddler");out.nvpOpts=pi>=0?talkOpts(curPeople()[pi]).map(a=>a.n):[];
  if(pi>=0){popIdx=pi;Q.length=0;document.getElementById('modal').hidden=true;talk(0);out.shopOpen=!!document.querySelector('.kshop[data-kshop="nvp"]');out.rare=adRare()&&adRare().k;
   out.rareTile=out.rare?!!document.querySelector('.kshop .kshg')&&document.querySelector('.kshop').innerHTML.includes(IT[out.rare].n):false}
  try{Q.length=0;showModal()}catch(e){}popIdx=null;
  /* icons on the map + list */
  tab="go";window.__mapList=0;render();out.mapIcons=document.querySelectorAll("#panel .mspot .kplic").length;out.mapNvp=!!document.querySelector('#panel .mspot[data-go="nvp"],#panel .mspot[data-ak="nvp"]');
  window.__mapList=1;render();out.listIcons=document.querySelectorAll("#panel .mtile .kplic").length;window.__mapList=0;
  /* faces on place names: none */
  render();out.faces=document.querySelectorAll("#panel .mspot .mlab img:not(.kplic)").length;
  /* happenings: force a roll with every kind, then arrive */
  let fired=0,kinds={};for(let t=0;t<40;t++){S.adHap=null;S.buoi=t%3;used=0;goTo("home");Q.length=0;const L=adHapNow();for(const h of L){kinds[h.id]=(kinds[h.id]||0)+1}
   const h=L[0];if(h){used=0;const q0=Q.length;goTo(h.k);if(Q.length>q0||S.place===h.k&&h.done)fired++;Q.length=0;try{showModal()}catch(e){}}}
  out.hapKinds=kinds;out.hapFired=fired;
  /* the mark shows on the map */
  S.adHap=null;S.buoi=0;used=0;goTo("home");let L=adHapNow();for(let t=0;t<30&&!L.length;t++){S.adHap=null;L=adHapNow()}
  tab="go";render();out.mark=document.querySelectorAll("#panel .khap").length;out.hapN=L.length;
  /* next buổi: the mark is gone or re-rolled */
  const b0=S.adHap.b;S.buoi=(S.buoi+1)%4;adHapNow();out.reroll=S.adHap.b!==b0;
  return out});
 ck('no study cards in Hành sự',r.study===0,r.deck);
 ck('moved acts gone from Hành sự',r.gone.length===0,r.gone);
 ck('every pool card dealt',r.pool.length===0,r.pool);
 ck('Thỉnh an door: pop-up locked after Hành sự',r.thIdx<0||r.thPopLock,{i:r.thIdx,why:r.thPopWhy});
 ck('maid door: Hành sự card locked after pop-up talk',r.maidDeckLock===true,{why:r.maidDeckWhy,opts:r.maidOpts});
 ck('maid pop-up has no "Tâm sự" twin',!r.maidOpts.includes('Tâm sự'),r.maidOpts);
 ck('Sai cung nữ đi dò la: picker, done, pop-up door shut',r.spyIdx>=0&&!!r.spyQ&&r.spyDone&&r.spyPopLock,{i:r.spyIdx,q:r.spyQ,d:r.spyDone,l:r.spyPopLock});
 ck('Thái y viện: no "Học hỏi y lý"',!r.tyv.includes('Học hỏi y lý'),r.tyv);
 ck('Lãnh cung: no "Đưa cơm áo"',!r.fallen.includes('Đưa cơm áo'),r.fallen);
 ck('Nội vụ phủ is a place',r.places.includes('nvp')&&r.atNvp==='nvp',{pl:r.places,at:r.atNvp});
 ck('Nội vụ phủ eunuch + shop',r.nvpOpts.includes('Xem hàng Nội vụ phủ')&&r.shopOpen,{p:r.nvpPeople,o:r.nvpOpts,shop:r.shopOpen});
 ck('weekly rare item in the shop',!!r.rare&&r.rareTile,{rare:r.rare,tile:r.rareTile});
 ck('place icons on map',r.mapIcons>=6&&r.mapNvp,{n:r.mapIcons,nvp:r.mapNvp});
 ck('place icons in list',r.listIcons>=6,{n:r.listIcons});
 ck('no faces on place names',r.faces===0,{n:r.faces});
 ck('happenings roll + fire on arrival',r.hapFired>=5&&Object.keys(r.hapKinds).length>=2,{f:r.hapFired,k:r.hapKinds});
 ck('gold ! on the map',r.mark===r.hapN&&r.mark>=1,{mark:r.mark,n:r.hapN});
 ck('re-rolled next buổi',r.reroll);
 /* grey card tap: needs the real visible panel → dev/test/act-dedupe-vp.js */
 ck('no page errors',perr.length===0,perr);
 console.log('FAIL '+fail);await b.close();process.exit(fail?1:0)})().catch(e=>{console.error(e);process.exit(2)});
