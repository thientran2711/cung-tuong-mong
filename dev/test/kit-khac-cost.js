/* kit-khac-cost (K-KHAC-COST, KK70 28/11, law 4 ONE CORE; RV-183 find, pre-existing on LIVE a96564ad) — node dev/test/kit-khac-cost.js [dev/index.html]
   The talk-line builder (j25 optLine) also draws every deck card (Hành sự, the doors' members via jdoor / jone deckM, kit plaques) and printed «Tốn 1 khắc»
   (talkK) on all of them — Tĩnh dưỡng (k 4, empties the buổi), Nghỉ ngơi dưỡng sức, Múa, Thỉnh an, xin bắt mạch… Now optK: deck card → cardCost (what act() spends),
   talk option → talkK. Checks at Fold 755x1000 + iPad 1180x820: (A) every deck card's line names cardCost khắc; (B) the illness cards (copies, numeric k) too;
   (C) every talk option keeps talkK. KMUT=1 puts the old talkK back → A + B must FAIL. */
const {chromium}=require('playwright');const path=require('path');
const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+path.resolve(URL0);
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();
 for(const [vw,vh] of [[755,1000],[1180,820]]){const p=await (await b.newContext({viewport:{width:vw,height:vh}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof optLine==='function'&&typeof cardCost==='function');await p.waitForTimeout(2500);
  const r=await p.evaluate(mut=>{localStorage.clear();SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;try{render()}catch(e){}
   if(mut)optK=talkK;
   const pl=s=>String(s).replace(/<[^>]+>/g," ");const kh=l=>{const m=/(\d+) khắc/.exec(l);return m?+m[1]:null};
   const row=a=>{let l="";try{l=pl(optLine(a))}catch(e){l="ERR "+e.message}return {n:a.n,cc:cardCost(a),shown:kh(l)}};
   const D=deck.map(row);
   S.ill={k:"phonghan",st:2,wk:0};let I=[];try{I=illCards().map(row)}catch(e){I=[{n:"ERR "+e.message}]}S.ill=null;
   const T=[];const P=[];try{for(const v of (rivals||[]))P.push({ref:v,kind:"r",name:v.name})}catch(e){}
   for(const pp of P){let A=[];try{A=talkOpts(pp)||[]}catch(e){continue}for(const a of A){let l="";try{l=pl(optLine(a))}catch(e){continue}T.push({n:a.n,tk:talkK(a),ok:optK(a)===talkK(a),shown:kh(l)})}}
   return {D,I,T}},!!process.env.KMUT);
  const tag=`${vw}x${vh}`;
  const dBad=r.D.filter(x=>x.shown!==x.cc);ok(r.D.length>=10&&!dBad.length,`${tag} A: every deck card's line names its cardCost khắc (${r.D.length} cards, costs ${[...new Set(r.D.map(x=>x.cc))].join("/")})`,dBad.slice(0,6));
  ok(r.D.some(x=>x.cc>1),`${tag} A: the deck holds cards that cost more than 1 khắc (the check bites)`);
  const iBad=r.I.filter(x=>x.shown!==x.cc);ok(r.I.length>=2&&r.I.some(x=>x.n==="Tĩnh dưỡng"&&x.cc===4)&&!iBad.length,`${tag} B: illness cards (Tĩnh dưỡng 4 khắc) name their cardCost`,iBad.length?iBad:r.I.map(x=>x.n+":"+x.shown));
  const tBad=r.T.filter(x=>!x.ok||(x.shown!=null&&x.shown!==x.tk));ok(r.T.length>=5&&!tBad.length,`${tag} C: talk options keep talkK (${r.T.length})`,tBad.slice(0,6));
  ok(!errs.length,`${tag} page errors 0`,errs.slice(0,3));await p.close()}
 await b.close();const f=res.filter(x=>!x).length;console.log(f?`FAIL ${f}`:`ALL OK (${res.length})`);process.exit(f?1:0)})();
