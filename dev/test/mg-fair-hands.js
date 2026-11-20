/* mg-fair-hands — NPC MINI-GAME HANDS FAIR TO HER (owner OD 20/11 ~01:10Z: "đa số npc chơi dở hơn tôi, tôi thấy không fair" → "Duyệt cả 3 ý, làm luôn đi").
   node dev/test/mg-fair-hands.js [dev/index.html]
   1 centred symmetric spread: the band of a calibrated kind (dan) is centred on her base b (centre b + w/2, lo/hi = centre ∓ sp); an untested kind (co)
     on the skilled human median; over 2000 people the middle NPC plays like her (±0.3), 45–55 % of hands at or above her, the hands above the centre
     mirror the hands below (mean − centre ≈ 0, the count beyond +sp/2 ≈ the count beyond −sp/2); no BAL skew key left
   2 art (law 6): the same person with one art level more than her plays higher (+BAL.ag.mg2.hand.art on the hand, plus the board ease); one less, lower;
     an equal NPC (same art, same rank) wins about half against her
   3 rank (law 5): the same person two ranks above her plays higher; two below, lower
   4 one core: every hand knob in BAL (w / sp / art / rank); the hand family (mgNpcRaw, jslap tat, jhd hoa điền) reads mgHandEff
   5 old saves: a hand rolled in the old skewed band (p.mgHv sig without "f/") re-rolls in the new band; her own play (S) never gets a hand
   6 no page errors */
const {chromium}=require('playwright');const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+require('path').resolve(URL0);
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 const r=await p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;window.__bot=1;Q.length=0;
  const H=BAL.ag.mg2.hand,o={H:Object.assign({},H)};
  /* 1 */
  o.k={};for(const kind of ["dan","co"]){const e=BAL.ag.mg2.cal.k[kind],base=e?e.b:mgMedD(0),Bd=mgBand(kind);const hs=[];for(let i=0;i<2000;i++)hs.push(mgHand(kind,{name:"Q"+i,id:50000+i}));
   const sorted=hs.slice().sort((a,b)=>a-b),mean=hs.reduce((a,x)=>a+x,0)/hs.length;
   o.k[kind]={base,Bd,cOk:Math.abs(Bd.c-(base+H.w/2))<.011&&Math.abs(Bd.hi-Bd.c-H.sp)<.011&&Math.abs(Bd.c-Bd.lo-H.sp)<.011,medPlay:+(sorted[1000]-H.w/2).toFixed(2),
    above:hs.filter(h=>h-H.w/2>=base).length/2000,meanOff:+(mean-Bd.c).toFixed(3),hiN:hs.filter(h=>h>Bd.c+H.sp/2).length,loN:hs.filter(h=>h<Bd.c-H.sp/2).length}}
  o.noSkew=!("skew" in H)&&!("lo" in H)&&!("hi" in H)&&!("up" in BAL.ag.mg2.cal)&&!("dn" in BAL.ag.mg2.cal);
  /* 2 + 3: one person, her art / rank moved */
  const kind="co",st=kg82FormulaOf(kind).map(x=>x[0]).find(s=>s!=="help"&&!KG82_STAT[s]);const keepA=Object.assign({},S.arts),keepR=S.rank;S.arts[st]=2;S.rank=3;
  const q={name:"Ri",id:61000,rank:3,arts:{[st]:2},alive:true};const N=1500;
  const mean=()=>{let s=0;for(let i=0;i<N;i++)s+=mgNpcRaw(kind,q,{occ:"hoi"});return s/N};
  o.h0=mgHand(kind,q);o.e0=mgHandEff(kind,q);o.m0=mean();q.arts[st]=3;o.eA=mgHandEff(kind,q);o.mA=mean();q.arts[st]=1;o.mA2=mean();q.arts[st]=2;
  q.rank=5;o.eR=mgHandEff(kind,q);o.mR=mean();q.rank=1;o.mR2=mean();q.rank=3;
  /* equal NPC vs her, over a population: her play = her base + her board shift + the same roll */
  {let w=0,n=0;const sh=mgMedD(mgTier(kind,{occ:"hoi",rank:3,lv:2}).d)-mgMedD(0);for(let i=0;i<800;i++){const x={name:"E"+i,id:62000+i,rank:3,arts:{[st]:2},alive:true};
    for(let j=0;j<4;j++){const u=(Math.random()+Math.random()+Math.random())/3,a=cl(Math.round(mgMedD(0)+sh+H.w*(u-.5)),0,10),y=mgNpcRaw(kind,x,{occ:"hoi"});w+=a>y?1:a===y?.5:0;n++}}o.eqWin=w/n}
  S.arts=keepA;S.rank=keepR;
  /* 4 */
  o.fam=[mgNpcRaw,slapNpcDraw,hdNpc].map(f=>/mgHandEff/.test(String(f)));
  /* 5 */
  const v={name:"Old",id:63000,mgH:{co:3.4},mgHv:{co:"3/9.5"}};o.oldRe=mgHand("co",v)!==3.4&&v.mgHv.co.indexOf("f/")===0;o.meNo=(()=>{const had=S.mgH;mgNpcRaw("co",S,{d:0});return !S.mgH&&!had})();
  return o});
 console.log(JSON.stringify(r));
 for(const k of ["dan","co"]){const t=r.k[k];ok(t.cOk,`1 ${k}: band centred on her base (${t.base}) + w/2, ∓ sp`,t.Bd);
  ok(Math.abs(t.medPlay-t.base)<=.3&&t.above>=.45&&t.above<=.55,`1 ${k}: the middle NPC plays like her; about half the hands at or above her`,{medPlay:t.medPlay,base:t.base,above:t.above});
  ok(Math.abs(t.meanOff)<=.1&&Math.abs(t.hiN-t.loN)<=80,`1 ${k}: symmetric draw (mean on the centre; as many hands far above as far below)`,{meanOff:t.meanOff,hiN:t.hiN,loN:t.loN})}
 ok(r.noSkew,'1 no skew / lo / hi / up / dn keys left in BAL (canon overwrite)',r.noSkew);
 ok(Math.abs(r.e0-r.h0)<1e-9&&Math.abs(r.eA-r.e0-r.H.art)<.011&&r.mA>r.m0+.4&&r.mA2<r.m0-.4,'2 art: one level above her lifts the hand by BAL art (and plays clearly higher); one below plays lower; equal = her hand',{h0:r.h0,e0:r.e0,eA:r.eA,m0:r.m0,mA:r.mA,mA2:r.mA2});
 ok(r.eqWin>=.44&&r.eqWin<=.56,'2 an equal NPC (same art, same rank) wins about half against her',{herWin:r.eqWin});
 ok(Math.abs(r.eR-r.e0-2*r.H.rank)<.011&&r.mR>r.m0+.4&&r.mR2<r.m0-.4,'3 rank: two ranks above her plays higher (law 5); two below lower',{eR:r.eR,m0:r.m0,mR:r.mR,mR2:r.mR2});
 ok(r.fam.every(Boolean),'4 the whole hand family reads mgHandEff (mgNpcRaw, slapNpcDraw, hdNpc)',r.fam);
 ok(r.oldRe&&r.meNo,'5 an old-save hand from the skewed band re-rolls in the new band; her own play never gets a hand',{oldRe:r.oldRe,meNo:r.meNo});
 ok(!errs.length,'6 no page errors',errs.slice(0,5));
 await b.close();process.exit(res.every(x=>x)?0:1)})().catch(e=>{console.error(e);process.exit(1)});
