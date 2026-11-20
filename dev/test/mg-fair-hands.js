/* mg-fair-hands — NPC MINI-GAME HANDS FAIR TO HER (owner OD 20/11 ~01:10Z: "đa số npc chơi dở hơn tôi, tôi thấy không fair" → "Duyệt cả 3 ý, làm luôn đi").
   node dev/test/mg-fair-hands.js [dev/index.html]
   1 BELL CURVE (owner OD 20/11 ~06:40Z, OK ~07:15Z; BAL.ag.mg2.hand ctr / sd / eqZ / grp): per kind (dan artistic, co careful, tat reflex, one untested)
     the average plays of 3000 people ~ Normal(ctr, sd of the group) (68 / 95 % within 1 / 2 sd); her b places her on it: the people better / about equal
     (± eqZ·sd) / worse than her = mgCalShare; an untested kind has no place yet
   1b one BAL knob each: ctr per kind moves that curve only, sd per group sets the spread; hands re-roll
   1c every kind she can test (mgCalKinds) sits in exactly one group
   2 art (law 6): the same person with one art level more than her plays higher (+BAL.ag.mg2.hand.art on the hand, plus the board ease); one less, lower;
     NPCs equal to her in art / rank: her win share follows her place on the curve
   3 upbringing (owner OD 20/11 ~01:50Z + ~02:05Z per-identity table BAL.orig.art, origin × road): on dan a tt-born NPC with no road (origin row cam 1)
     plays clearly higher than her (thd, cam 0) at the same own level; on road tt_tranh (cam 2) higher still; cnv (no cam) = her; an own level above the start bậc counts as is;
     rank alone gives NO lift (same person two ranks up: same hand)
   4 one core: every hand knob in BAL (w / split / eq / far / art); upbringing from BAL.orig.art; the hand family (mgNpcRaw, jslap tat, jhd hoa điền) reads mgHandEff
   5 old saves: a hand rolled in the old skewed band or the old thirds (p.mgHv sig not "n/") re-rolls on the curve; her own play (S) never gets a hand
   6 no page errors */
const {chromium}=require('playwright');const BAL_K=(r,k)=>k===r.U?', not tested':'';const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+require('path').resolve(URL0);
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 const r=await p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;window.__bot=1;Q.length=0;
  const H=BAL.ag.mg2.hand,o={H:Object.assign({},H)};
  /* 1 bell curve per kind (OD 20/11 ~06:40Z, OK ~07:15Z): average play of 3000 people ~ Normal(ctr, sd of the kind's group); her b places her on it */
  const UNC=mgCalKinds().filter(k=>!(BAL.ag.mg2.cal.k||{})[k]);o.U=UNC[0];
  o.k={};for(const kind of ["dan","co","tat",o.U]){const e=BAL.ag.mg2.cal.k[kind],Bd=mgBand(kind),ctr=H.ctr[kind]!=null?H.ctr[kind]:H.ctr[""],sd=H.sd[mgCalGrp(kind)];
   const pl=[];for(let i=0;i<3000;i++)pl.push(mgHand(kind,{name:"Q"+i,id:50000+i})-H.w/2);const mean=pl.reduce((a,x)=>a+x,0)/3000,SD=Math.sqrt(pl.reduce((a,x)=>a+(x-mean)**2,0)/3000);
   const w1=pl.filter(x=>Math.abs(x-ctr)<=sd).length/3000,w2=pl.filter(x=>Math.abs(x-ctr)<=2*sd).length/3000;
   const sh=mgCalShare(kind),q=H.eqZ*sd,got=e?{better:pl.filter(x=>x>e.b+q).length/3000,equal:pl.filter(x=>Math.abs(x-e.b)<=q).length/3000,worse:pl.filter(x=>x<e.b-q).length/3000}:null;
   o.k[kind]={grp:mgCalGrp(kind),ctr,sd,Bd,b:e?e.b:null,mean:+mean.toFixed(3),SD:+SD.toFixed(3),w1:+w1.toFixed(3),w2:+w2.toFixed(3),sh,got}}
  /* 1c every kind she can test sits in exactly one skill group */
  {const G=H.grp,all=[].concat(...Object.values(G));o.grpMiss=mgCalKinds().filter(k=>all.filter(x=>x===k).length!==1);o.grpExtra=all.filter(k=>!mgCalKinds().includes(k))}
  /* 1b one BAL knob each: ctr.co 8 moves the co curve (only co), sd.c 1 narrows the careful kinds; the band sig changes so hands re-roll */
  {const c0=Object.assign({},H.ctr),s0=Object.assign({},H.sd),sg=mgBand("co").sig,sd0=mgBand("dan").sig;H.ctr.co=8;H.sd.c=1;const pl=[];for(let i=0;i<3000;i++)pl.push(mgHand("co",{name:"Z"+i,id:52000+i})-H.w/2);
   const m=pl.reduce((a,x)=>a+x,0)/3000,S2=Math.sqrt(pl.reduce((a,x)=>a+(x-m)**2,0)/3000);o.re={mean:+m.toFixed(3),SD:+S2.toFixed(3),sig:mgBand("co").sig!==sg,danSame:mgBand("dan").sig===sd0};H.ctr=c0;H.sd=s0}
  o.noSkew=!("split" in H)&&!("eq" in H)&&!("far" in H)&&!("skew" in H)&&!("sp" in H)&&!("rank" in H)&&!("up" in H)&&!("lo" in H)&&!("hi" in H)&&!("up" in BAL.ag.mg2.cal)&&!("dn" in BAL.ag.mg2.cal);
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
  {let w=0,n=0;const e=BAL.ag.mg2.cal.k[kind],base=e?e.b:mgMedD(0),sh=mgMedD(mgTier(kind,{occ:"hoi",rank:3,lv:2}).d)-mgMedD(0),z=(base-(H.ctr[kind]!=null?H.ctr[kind]:H.ctr[""]))/H.sd[mgCalGrp(kind)];o.eqZ=+z.toFixed(2);for(let i=0;i<800;i++){const x={name:"E"+i,id:62000+i,rank:3,arts:{[st]:2},alive:true,ag:{o:"thd"}};
    for(let j=0;j<4;j++){const u=(Math.random()+Math.random()+Math.random())/3,a=cl(Math.round(base+sh+H.w*(u-.5)),0,10),y=mgNpcRaw(kind,x,{occ:"hoi"});w+=a>y?1:a===y?.5:0;n++}}o.eqWin=w/n}
  S.arts=keepA;S.rank=keepR;S.origin=keepO;
  /* 4 */
  o.fam=[mgNpcRaw,slapNpcDraw,hdNpc].map(f=>/mgHandEff/.test(String(f)));
  /* 5 */
  const v={name:"Old",id:63000,mgH:{co:3.4,dan:12.1},mgHv:{co:"3/9.5",dan:"t/7.8/12.8"}};o.oldRe=mgHand("co",v)!==3.4&&mgHand("dan",v)!==12.1&&v.mgHv.co.indexOf("n/")===0&&v.mgHv.dan.indexOf("n/")===0;o.meNo=(()=>{const had=S.mgH;mgNpcRaw("co",S,{d:0});return !S.mgH&&!had})();
  return o});
 console.log(JSON.stringify(r));
 for(const k of ["dan","co","tat",r.U]){const t=r.k[k];
  ok(Math.abs(t.Bd.c-(t.ctr+r.H.w/2))<.011&&Math.abs(t.mean-t.ctr)<=.1&&Math.abs(t.SD-t.sd)<=.1&&Math.abs(t.w1-.683)<=.03&&Math.abs(t.w2-.954)<=.02,`1 ${k} (group ${t.grp}): average plays ~ Normal(ctr ${t.ctr}, sd ${t.sd}) — 68 % within 1 sd, 95 % within 2`,{mean:t.mean,SD:t.SD,w1:t.w1,w2:t.w2});
  if(t.b!=null)ok(t.sh&&['better','equal','worse'].every(x=>Math.abs(t.got[x]-t.sh[x])<=.03),`1 ${k}: her b ${t.b} on the curve → better / equal / worse fall out (mgCalShare = the people counted)`,{share:t.sh,got:t.got});
  else ok(t.sh===null,`1 ${k} (not tested by her): no place on the curve yet`,t.sh)}
 ok(!r.grpMiss.length&&!r.grpExtra.length,'1c every kind she can test is in exactly one skill group (BAL.ag.mg2.hand.grp)',{miss:r.grpMiss,extra:r.grpExtra});
 ok(Math.abs(r.re.mean-8)<=.1&&Math.abs(r.re.SD-1)<=.08&&r.re.sig&&r.re.danSame,'1b one BAL knob each: ctr.co 8 → co average 8; sd.c 1 → spread 1; hands re-roll (sig); other groups untouched',r.re);
 ok(r.noSkew,'1 no skew / sp / rank / lo / hi / cal up / dn keys left in BAL (canon overwrite)',r.noSkew);
 ok(Math.abs(r.e0-r.h0)<1e-9&&Math.abs(r.eA-r.e0-r.H.art)<.011&&r.mA>r.m0+.4&&r.mA2<r.m0-.4,'2 art: one level above her lifts the hand by BAL art (and plays clearly higher); one below plays lower; equal = her hand',{h0:r.h0,e0:r.e0,eA:r.eA,m0:r.m0,mA:r.mA,mA2:r.mA2});
 ok(r.eqZ>1?r.eqWin>=.75:Math.abs(r.eqWin-.5)<=.1,'2 NPCs equal to her in art / rank / upbringing: her win share follows her place on the curve (co: b well above the adult average → she wins most)',{herWin:r.eqWin,z:r.eqZ});
 ok(r.orgLv===1&&r.orgLvR===2&&Math.abs(r.uT-r.u0-r.H.art)<.011&&Math.abs(r.uR-r.u0-2*r.H.art)<.011&&r.umT>r.um0+.4&&Math.abs(r.uC-r.u0)<1e-9&&Math.abs(r.uOwn-3*r.H.art)<.011,'3 upbringing from BAL.orig.art (origin × road): tt no road (cam 1) plays clearly higher than her (thd) on dan; road tt_tranh (cam 2) higher still; cnv (no cam) = her; an own level above the start bậc counts as is',{orgLv:r.orgLv,orgLvR:r.orgLvR,u0:r.u0,uT:r.uT,uR:r.uR,uC:r.uC,um0:r.um0,umT:r.umT,uOwn:r.uOwn});
 ok(Math.abs(r.eR-r.e0)<1e-9,'3 rank alone gives no skill (two ranks up: the same hand)',{e0:r.e0,eR:r.eR});
 ok(r.fam.every(Boolean),'4 the whole hand family reads mgHandEff (mgNpcRaw, slapNpcDraw, hdNpc)',r.fam);
 ok(r.oldRe&&r.meNo,'5 an old-save hand from the skewed band / the thirds re-rolls on the curve; her own play never gets a hand',{oldRe:r.oldRe,meNo:r.meNo});
 ok(!errs.length,'6 no page errors',errs.slice(0,5));
 await b.close();process.exit(res.every(x=>x)?0:1)})().catch(e=>{console.error(e);process.exit(1)});
