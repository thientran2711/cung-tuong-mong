/* mg-fair-hands — NPC MINI-GAME HANDS FAIR TO HER (owner OD 20/11 ~01:10Z: "đa số npc chơi dở hơn tôi, tôi thấy không fair" → "Duyệt cả 3 ý, làm luôn đi").
   node dev/test/mg-fair-hands.js [dev/index.html]
   1 THIRDS (owner OD 20/11 ~01:18Z "1/3 ngang, 1/3 hơn, 1/3 kém"): the band of a calibrated kind (dan) is centred on her base b (centre b + w/2,
     lo/hi = centre ∓ far); an untested kind (co) on the skilled human median; over 3000 people (no art / rank lift) 30–37 % of the hands within
     centre ± eq (about equal to her), 30–37 % above, 30–37 % below; the middle NPC plays like her (±0.3); symmetric (mean − centre ≈ 0);
     bell inside a third (the better third is densest round its middle); no BAL skew / sp key left
   1b the shares are one BAL knob (BAL.ag.mg2.hand.split): retuned to [1,2,1] the equal third holds half
   2 art (law 6): the same person with one art level more than her plays higher (+BAL.ag.mg2.hand.art on the hand, plus the board ease); one less, lower;
     an equal NPC (same art, same rank) wins about half against her
   3 upbringing (owner OD 20/11 ~01:50Z + ~02:05Z per-identity table BAL.orig.art, origin × road): on dan a tt-born NPC with no road (origin row cam 1)
     plays clearly higher than her (thd, cam 0) at the same own level; on road tt_tranh (cam 2) higher still; cnv (no cam) = her; an own level above the start bậc counts as is;
     rank alone gives NO lift (same person two ranks up: same hand)
   4 one core: every hand knob in BAL (w / split / eq / far / art); upbringing from BAL.orig.art; the hand family (mgNpcRaw, jslap tat, jhd hoa điền) reads mgHandEff
   5 old saves: a hand rolled in the old skewed band (p.mgHv sig without "t/") re-rolls in the new band; her own play (S) never gets a hand
   6 no page errors */
const {chromium}=require('playwright');const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+require('path').resolve(URL0);
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 const r=await p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;window.__bot=1;Q.length=0;
  const H=BAL.ag.mg2.hand,o={H:Object.assign({},H)};
  /* 1 */
  o.k={};for(const kind of ["dan","co"]){const e=BAL.ag.mg2.cal.k[kind],base=e?e.b:mgMedD(0),Bd=mgBand(kind);const hs=[];for(let i=0;i<3000;i++)hs.push(mgHand(kind,{name:"Q"+i,id:50000+i}));
   const sorted=hs.slice().sort((a,b)=>a-b),mean=hs.reduce((a,x)=>a+x,0)/hs.length;
   o.k[kind]={base,Bd,cOk:Math.abs(Bd.c-(base+H.w/2))<.011&&Math.abs(Bd.hi-Bd.c-H.far)<.011&&Math.abs(Bd.c-Bd.lo-H.far)<.011,medPlay:+(sorted[1500]-H.w/2).toFixed(2),
    eqS:hs.filter(h=>Math.abs(h-Bd.c)<=H.eq+1e-9).length/3000,upS:hs.filter(h=>h>Bd.c+H.eq+1e-9).length/3000,dnS:hs.filter(h=>h<Bd.c-H.eq-1e-9).length/3000,meanOff:+(mean-Bd.c).toFixed(3),
    bell:(()=>{const u=hs.filter(h=>h>Bd.c+H.eq+1e-9),m=Bd.c+(H.eq+H.far)/2,q=(H.far-H.eq)/4;return u.filter(h=>Math.abs(h-m)<=q).length/Math.max(1,u.length)})()}}
  /* 1b retunable in one edit (OD 20/11 ~01:42Z): split [1,2,1] → half about equal, a quarter each side */
  {const k0=H.split;H.split=[1,2,1];const hs=[];for(let i=0;i<3000;i++)hs.push(mgHand("co",{name:"Z"+i,id:52000+i}));const Bd=mgBand("co");H.split=k0;
   o.re={eq:hs.filter(h=>Math.abs(h-Bd.c)<=H.eq+1e-9).length/3000,up:hs.filter(h=>h>Bd.c+H.eq+1e-9).length/3000}}
  o.noSkew=!("skew" in H)&&!("sp" in H)&&!("rank" in H)&&!("up" in H)&&!("lo" in H)&&!("hi" in H)&&!("up" in BAL.ag.mg2.cal)&&!("dn" in BAL.ag.mg2.cal);
  /* 2 + 3: one person, her art / rank moved */
  const kind="co",st=kg82FormulaOf(kind).map(x=>x[0]).find(s=>s!=="help"&&!KG82_STAT[s]);const keepA=Object.assign({},S.arts),keepR=S.rank,keepO=S.origin;S.arts[st]=2;S.rank=3;S.origin=originByKey("thd");
  const q={name:"Ri",id:61000,rank:3,arts:{[st]:2},alive:true,ag:{o:"thd"}};const N=1500;
  const mean=()=>{let s=0;for(let i=0;i<N;i++)s+=mgNpcRaw(kind,q,{occ:"hoi"});return s/N};
  o.h0=mgHand(kind,q);o.e0=mgHandEff(kind,q);o.m0=mean();q.arts[st]=3;o.eA=mgHandEff(kind,q);o.mA=mean();q.arts[st]=1;o.mA2=mean();q.arts[st]=2;
  /* 3 upbringing on dan (stat cam): tt (ORIGINS art cam 1) vs her thd (none) — same own cam level 0 for both */
  {const st2="cam",kA=Object.assign({},S.arts);S.arts[st2]=0;const u={name:"Up",id:61500,rank:3,arts:{[st2]:0},alive:true,ag:{o:"thd"}};const M=()=>{let s=0;for(let i=0;i<N;i++)s+=mgNpcRaw("dan",u,{occ:"hoi"});return s/N};
   o.u0=mgHandEff("dan",u);o.um0=M();u.ag.o="tt";o.uT=mgHandEff("dan",u);o.umT=M();o.orgLv=mgOrgLv(u,"dan");u.nr={o:"tt",r:"tt_tranh"};o.uR=mgHandEff("dan",u);o.orgLvR=mgOrgLv(u,"dan");delete u.nr;u.ag.o="cnv";o.uC=mgHandEff("dan",u);u.arts[st2]=3;u.ag.o="tt";o.uOwn=mgHandEff("dan",u)-o.u0;S.arts=kA}
  q.rank=5;o.eR=mgHandEff(kind,q);q.rank=3;
  /* equal NPC vs her, over a population: her play = her base + her board shift + the same roll */
  {let w=0,n=0;const sh=mgMedD(mgTier(kind,{occ:"hoi",rank:3,lv:2}).d)-mgMedD(0);for(let i=0;i<800;i++){const x={name:"E"+i,id:62000+i,rank:3,arts:{[st]:2},alive:true,ag:{o:"thd"}};
    for(let j=0;j<4;j++){const u=(Math.random()+Math.random()+Math.random())/3,a=cl(Math.round(mgMedD(0)+sh+H.w*(u-.5)),0,10),y=mgNpcRaw(kind,x,{occ:"hoi"});w+=a>y?1:a===y?.5:0;n++}}o.eqWin=w/n}
  S.arts=keepA;S.rank=keepR;S.origin=keepO;
  /* 4 */
  o.fam=[mgNpcRaw,slapNpcDraw,hdNpc].map(f=>/mgHandEff/.test(String(f)));
  /* 5 */
  const v={name:"Old",id:63000,mgH:{co:3.4},mgHv:{co:"3/9.5"}};o.oldRe=mgHand("co",v)!==3.4&&v.mgHv.co.indexOf("t/")===0;o.meNo=(()=>{const had=S.mgH;mgNpcRaw("co",S,{d:0});return !S.mgH&&!had})();
  return o});
 console.log(JSON.stringify(r));
 for(const k of ["dan","co"]){const t=r.k[k];ok(t.cOk,`1 ${k}: band centred on her base (${t.base}) + w/2, ∓ sp`,t.Bd);
  ok([t.eqS,t.upS,t.dnS].every(x=>x>=.30&&x<=.37),`1 ${k}: thirds — about equal / better / worse each ≈ 1/3`,{equal:t.eqS,better:t.upS,worse:t.dnS});
  ok(Math.abs(t.medPlay-t.base)<=.3&&Math.abs(t.meanOff)<=.1&&t.bell>.6,`1 ${k}: the middle NPC plays like her; symmetric; bell inside a third (middle half of the better third holds > 60 %)`,{medPlay:t.medPlay,base:t.base,meanOff:t.meanOff,bell:t.bell})}
 ok(r.re.eq>=.46&&r.re.eq<=.54&&r.re.up>=.21&&r.re.up<=.29,'1b the split is one BAL knob: [1,2,1] → half about equal, a quarter better',r.re);
 ok(r.noSkew,'1 no skew / sp / rank / lo / hi / cal up / dn keys left in BAL (canon overwrite)',r.noSkew);
 ok(Math.abs(r.e0-r.h0)<1e-9&&Math.abs(r.eA-r.e0-r.H.art)<.011&&r.mA>r.m0+.4&&r.mA2<r.m0-.4,'2 art: one level above her lifts the hand by BAL art (and plays clearly higher); one below plays lower; equal = her hand',{h0:r.h0,e0:r.e0,eA:r.eA,m0:r.m0,mA:r.mA,mA2:r.mA2});
 ok(r.eqWin>=.44&&r.eqWin<=.56,'2 an equal NPC (same art, same rank) wins about half against her',{herWin:r.eqWin});
 ok(r.orgLv===1&&r.orgLvR===2&&Math.abs(r.uT-r.u0-r.H.art)<.011&&Math.abs(r.uR-r.u0-2*r.H.art)<.011&&r.umT>r.um0+.4&&Math.abs(r.uC-r.u0)<1e-9&&Math.abs(r.uOwn-3*r.H.art)<.011,'3 upbringing from BAL.orig.art (origin × road): tt no road (cam 1) plays clearly higher than her (thd) on dan; road tt_tranh (cam 2) higher still; cnv (no cam) = her; an own level above the start bậc counts as is',{orgLv:r.orgLv,orgLvR:r.orgLvR,u0:r.u0,uT:r.uT,uR:r.uR,uC:r.uC,um0:r.um0,umT:r.umT,uOwn:r.uOwn});
 ok(Math.abs(r.eR-r.e0)<1e-9,'3 rank alone gives no skill (two ranks up: the same hand)',{e0:r.e0,eR:r.eR});
 ok(r.fam.every(Boolean),'4 the whole hand family reads mgHandEff (mgNpcRaw, slapNpcDraw, hdNpc)',r.fam);
 ok(r.oldRe&&r.meNo,'5 an old-save hand from the skewed band re-rolls in the new band; her own play never gets a hand',{oldRe:r.oldRe,meNo:r.meNo});
 ok(!errs.length,'6 no page errors',errs.slice(0,5));
 await b.close();process.exit(res.every(x=>x)?0:1)})().catch(e=>{console.error(e);process.exit(1)});
