/* danh-p1 checks (owner P1 16/11 12:55Z): "Phát bạc cứu giúp cung nhân nghèo" = ONE act with TWO doors (Tài nghệ · Tứ đức button +
   Hành sự card), ONE monthly lock (S.charM), numbers from BAL.charity (bac 35, danh 5, duc 3, khac 1).
   usage: node dev/test/danh-p1.js <url> [W]x[H]@dpr [shot.png]  → prints lines + "FAIL n" */
const {chromium}=require('playwright');const fs=require('fs');
const src=fs.readFileSync(__dirname+'/act-audit.js','utf8');const LIB=src.match(/const LIB=String\.raw`([\s\S]*?)`;\n\(async/)[1];
const [,,URL,SZ,SHOT]=process.argv;const [WH,DPR]=(SZ||'755x1000@1').split('@');const [W,H]=WH.split('x').map(Number);
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+(DPR||1),hasTouch:W<1100,isMobile:W<1100,reducedMotion:'reduce',serviceWorkers:'block'});
 const p=await ctx.newPage();const perr=[];p.on('pageerror',e=>perr.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'load',timeout:0});await p.addStyleTag({content:'.modal.kload,#kload{display:none!important}'});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(3000);
 await p.evaluate(LIB);let fail=0;const ck=(n,ok,info)=>{if(!ok)fail++;console.log((ok?'ok   ':'FAIL ')+n+(info?' · '+JSON.stringify(info).slice(0,300):''))};
 const N="Phát bạc cứu giúp cung nhân nghèo";
 const r=await p.evaluate((N)=>{const out={};for(let t=0;t<30;t++){AA.scen('dau');const sv=typeof isSrv==="function"&&isSrv();if(sv&&out.srvNoCard==null){deal();out.srvNoCard=!deck.some(a=>a&&a.n===N)}if(!sv)break}const C=BAL.charity;out.C=Object.assign({},C);S.bac=500;S.suc=80;S.buoi=0;used=0;S.charM=null;deal();
  const tn=()=>{const s=ktArtSkills().find(x=>x.kind==="vir"&&x.k==="hanh");const h=(s&&s.acts||[]).find(h=>/data-charity/.test(h))||"";return {dis:/\bdisabled\b/.test(h),h:h.replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim()}};
  let i=deck.findIndex(a=>a.n===N);out.inDeck=i>=0;out.deckN=deck.filter(a=>a.n===N).length;
  if(i>=0){const a=deck[i];out.cardC=a.c;out.cardW=a.w;out.k=cardCost(a);out.lock0=!!a.lock;out.why0=cardWhy(a)}
  out.tn0=tn();
  /* door 1: Hành sự card → both locked */
  const b0={bac:S.bac,duc:S.duc,danh:S.danh,used};if(i>=0)act(i);out.d1={bac:S.bac-b0.bac,duc:S.duc-b0.duc,danh:S.danh-b0.danh,khac:used-b0.used};
  out.tn1=tn();out.lock1=i>=0?!!deck[i].lock:null;
  /* next month, next buổi: open again; door 2: Tài nghệ button → Hành sự card locked */
  S.turn++;S.buoi=1;used=0;deal();i=deck.findIndex(a=>a.n===N);out.lock2=i>=0?!!deck[i].lock:null;out.tn2=tn();
  const b1={bac:S.bac,duc:S.duc,danh:S.danh,used};charity();out.d2={bac:S.bac-b1.bac,duc:S.duc-b1.duc,danh:S.danh-b1.danh,khac:used-b1.used};
  i=deck.findIndex(a=>a.n===N);out.lock3=i>=0?!!deck[i].lock:null;out.why3=i>=0?cardWhy(deck[i]):null;
  /* a second try through either door this month does nothing */
  const b2={bac:S.bac,danh:S.danh};if(i>=0)act(i);charity();out.d3={bac:S.bac-b2.bac,danh:S.danh-b2.danh};
  /* not enough bạc: grey with the reason, both doors */
  S.turn++;S.bac=C.bac-1;used=0;deal();i=deck.findIndex(a=>a.n===N);out.why4=i>=0?cardWhy(deck[i]):null;out.tn4=tn();
  const b4=S.bac;if(i>=0)act(i);out.d4=S.bac-b4;
  /* old save without S.charM loads and shows the card open */
  S.bac=500;delete S.charM;const d=JSON.parse(JSON.stringify(ser()));quiet=true;deser(d);quiet=false;deal();i=deck.findIndex(a=>a.n===N);out.oldSave=i>=0&&!deck[i].lock;
  /* the Đức panel row prints the same numbers */
  try{Q.length=0;v85Table("duc");const m=Q.find(x=>/Đức/.test((x.t||"")+(x.h||"")))||Q[Q.length-1];const h=String((m&&m.h)||"")+(document.getElementById("modal").textContent||"");out.panel=h.replace(/<[^>]+>/g,"").includes(`Đức +${C.duc}, Danh +${C.danh}`)||h.slice(0,120);Q.length=0;try{closeModal()}catch(e){}}catch(e){out.panel="err "+e.message}
  /* Hành sự panel, real render */
  document.querySelectorAll("#kroul,#kroulw,#kload,#kboot").forEach(e=>e.remove());try{window.__kbootHostDrop&&window.__kbootHostDrop()}catch(e){}try{document.getElementById("title").hidden=true}catch(e){}Q.length=0;try{document.getElementById("modal").hidden=true}catch(e){}tab="act";S.buoi=0;used=0;render();const el=[...document.querySelectorAll("#panel .kcard")].find(x=>x.textContent.includes(N));out.cardShown=!!el;out.cardTxt=el?el.textContent.replace(/\s+/g," ").trim().slice(0,200):"";
  if(el)el.scrollIntoView({block:"center"});{const e=document.elementFromPoint(innerWidth/2,innerHeight/2);let x=e,c=[];while(x&&c.length<8){c.push((x.id||"")+"."+String(x.className).slice(0,30));x=x.parentElement}out.top=c.join(" < ")}
  return out},N);
 const C=r.C;
 ck('BAL.charity = P1 numbers',C.bac===35&&C.danh===5&&C.duc===3&&C.khac===1,C);
 ck('Hành sự has the charity card once',r.inDeck&&r.deckN===1,{n:r.deckN});
 ck('card shows BAL price and gains',r.cardC&&r.cardC.bac===-C.bac&&r.cardW&&r.cardW.danh===C.danh&&r.cardW.duc===C.duc&&r.k===C.khac,{c:r.cardC,w:r.cardW,k:r.k});
 ck('card open at start',!r.lock0&&!r.why0,{why:r.why0});
 ck('door 1 (Hành sự) effect = BAL',r.d1.bac===-C.bac&&r.d1.duc===C.duc&&r.d1.danh===C.danh&&r.d1.khac===C.khac,r.d1);
 ck('after door 1: Tài nghệ button greyed "tháng này đã làm"',r.tn1.dis&&/tháng này đã làm/.test(r.tn1.h),r.tn1);
 ck('after door 1: Hành sự card locked',r.lock1===true);
 ck('next month: open on both doors',r.lock2===false&&!r.tn2.dis,{l:r.lock2,tn:r.tn2});
 ck('door 2 (Tài nghệ) effect = BAL',r.d2.bac===-C.bac&&r.d2.duc===C.duc&&r.d2.danh===C.danh&&r.d2.khac===C.khac,r.d2);
 ck('after door 2: Hành sự card locked "Tháng này đã làm"',r.lock3===true&&/Tháng này đã làm/.test(r.why3||""),{why:r.why3});
 ck('second try this month does nothing',r.d3.bac===0&&r.d3.danh===0,r.d3);
 ck('short of bạc: card reason "Thiếu bạc (cần 35)", button greyed, no effect',/Thiếu bạc \(cần 35\)/.test(r.why4||"")&&r.tn4.dis&&r.d4===0,{why:r.why4,tn:r.tn4,d:r.d4});
 ck('old save (no S.charM): card open',r.oldSave===true);
 ck('Đức panel row prints BAL numbers',r.panel===true,r.panel);
 ck('card rendered in the Hành sự panel (kit card)',r.cardShown,r.cardTxt);
 ck('player text: no %',!/%/.test(r.cardTxt+r.tn0.h),{card:r.cardTxt,tn:r.tn0.h});
 if(SHOT){await p.evaluate((N)=>{document.querySelectorAll('#kroul,#kroulw,#kload,#kboot,.kroul').forEach(e=>e.remove());Q.length=0;document.getElementById('modal').hidden=true;tab="act";render();
   const el=[...document.querySelectorAll("#panel .kcard")].find(x=>x.textContent.includes(N));if(el)el.scrollIntoView({block:"center"})},N);await p.waitForTimeout(1200);
  await p.evaluate(()=>document.querySelectorAll('#kroul,#kroulw,.kroul').forEach(e=>e.remove()));await p.screenshot({path:SHOT});
  const C=p.locator('#panel .kcard',{hasText:N}).first();if(await C.count()){await C.scrollIntoViewIfNeeded();await C.screenshot({path:SHOT.replace(/\.png$/,'_card.png')})}}
 if(r.srvNoCard!=null)ck('servant mode (cung nữ): no charity card',r.srvNoCard===true);
 ck('no page errors',perr.length===0,perr);
 console.log('FAIL '+fail);await b.close();process.exit(fail?1:0)})().catch(e=>{console.error(e);process.exit(2)});
