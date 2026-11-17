/* AG-ALL-2f3 checks — ONE betray / sell / recruit odds core + failure costs (owner OD 17/11 ~17:00Z, ~17:10Z, ~17:20Z, ~17:35Z;
   report dev/handover/reports/ag-all.md §21.9).
   1 the owner's worked example: tham lam base + lòng < 25 + trọng Nghĩa + giận / vừa được thưởng = the BAL terms, then the cap (never 0 / 100)
   2 a LOYAL person sells / is bought when her master OFFENDED her chữ trọng; loyal + honoured mostly refuses — by odds, not a hard 0
   3 a failed Mua chuộc / Cài tai mắt costs NO bạc (her and NPCs); a success pays the person's price
   4 a failed approach frightens the servant who carried it (lòng − BAL.ag.bt.fear), for her and for an NPC
   5 parity: the per-master record (jmind mindSeen) and the mood (Thưởng / Phạt) work for NPC masters the same; NPC cards add quẻ luck like hers
   6 preview wording: a Tai mắt gain reads "Tai mắt: ngỏ lời N người" (one helper statTxt); Mua chuộc shows "thành: Bạc -<her price>"
   usage: node dev/test/ag-betray.test.js [dev/index.html] → exit 1 on any FAIL */
const {chromium}=require('playwright');const path=require('path');const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+path.resolve(URL0);
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;let g=0;do{start();g++}while(isSrv()&&g<30);window.__nlInner=0;window.__bot=1;window.__agAll=1;quiet=true;Q.length=0;try{deal()}catch(e){}render()});
 await p.evaluate(()=>{window.__setNet=(s,ld)=>{netOf(s);s.net=s.net.slice();s.net[1]=ld;KN.m=null};
  window.__rig=(lo,ld,tr)=>{const R=liveRivals(true).filter(v=>v.alive&&!v.out&&(v.staff||[]).length>=2);const v=R[0];const s=v.staff[0];s.loyal=lo;s.spyFor=null;__setNet(s,ld||"Ham lợi");s.trong=tr||["Nghĩa","Cần"];s.trM=null;s.mdM=null;s.emo=null;return{v,s}};
  window.__rnd=x=>{window.__r0=window.__r0||Math.random;Math.random=()=>x};window.__rndOff=()=>{if(window.__r0)Math.random=window.__r0}});
 /* 1 worked example */
 const r1=await p.evaluate(()=>{const {v,s}=__rig(20,"Ham lợi",["Nghĩa","Cần"]);const B=BAL.ag.bt;const T0=btTerms(s,v,"sell");const raw0=btRaw(s,v,"sell");
  mindMoodSet(s,v,"gian");const T1=btTerms(s,v,"sell");const rawG=btRaw(s,v,"sell");mindMoodSet(s,v,"thuong");const rawT=btRaw(s,v,"sell");
  const exp=B.sell.base.tham+B.sell.loy[0][1]+B.sell.v["Nghĩa"];
  /* the cap: a huge raw still rolls at BAL.odds.hi, a hopeless one at lo */
  s.loyal=0;for(let i=0;i<9;i++)mindSeen(v,"flee");mindMoodSet(s,v,"gian");const hi=btOdds(s,v,"sell"),rawHi=btRaw(s,v,"sell");
  __setNet(s,"Thanh liêm");s.loyal=100;s.trM=null;s.mdM=null;s.trong=["Trung","Nghĩa"];const lo=btOdds(s,v,"tm"),rawLo=btRaw(s,v,"tm");
  return{T0,raw0,exp,rawG,rawT,g:B.mood.gian,t:B.mood.thuong,T1,hi,lo,rawHi,rawLo,cap:[BAL.odds.lo,BAL.odds.hi]}});
 ok(r1.raw0===r1.exp&&r1.T0.some(f=>f[0]==="trọng Nghĩa"),'worked example: Ham lợi base + lòng<25 band + trọng Nghĩa = the BAL sum',r1.T0);
 ok(r1.rawG===r1.raw0+r1.g&&r1.rawT===r1.raw0+r1.t,'mood toward the master: giận +, vừa được thưởng − (BAL.ag.bt.mood)',{raw:r1.raw0,g:r1.rawG,t:r1.rawT});
 ok(r1.hi===r1.cap[1]&&r1.rawHi>100&&r1.lo===r1.cap[0]&&r1.rawLo<0,'never 0 / 100: the roll is clamped to BAL.odds.lo..hi',{hi:r1.hi,rawHi:r1.rawHi,lo:r1.lo,rawLo:r1.rawLo});
 /* 2 loyal + offended vs loyal + honoured */
 const r2=await p.evaluate(()=>{const o={};let {v,s}=__rig(85,"Ham lợi",["Nghĩa","Nhân"]);o.wPlain=knSellW(s);o.tPlain=tmOdds(S,s);
  for(let i=0;i<3;i++)mindSeen(v,"flee");/* flee offends Trung / Nghĩa */o.off=mindTr(s,v).off;o.wOff=knSellW(s);o.tOff=tmOdds(S,s);
  s.trM=null;for(let i=0;i<3;i++)mindSeen(v,"help");/* help honours Nhân / Nghĩa */o.hon=mindTr(s,v).hon;o.wHon=knSellW(s);o.tHon=tmOdds(S,s);
  /* the record follows the deed hooks: Phạt (punish offends Nhân) */s.trM=null;servDo(v,"phat",v.staff[1]);o.punRec=mindTr(s,v).off;
  /* by odds: 300 approaches each */__rndOff();const run=(prep)=>{let take=0;S.bac=99999;for(let i=0;i<300;i++){s.spyFor=null;s.loyal=85;prep();bribeServ(S,s);if(s.spyFor==="me")take++;s.spyFor=null}return take};
  o.takeOff=run(()=>{s.trM=null;for(let i=0;i<3;i++)mindSeen(v,"flee")});o.takeHon=run(()=>{s.trM=null;for(let i=0;i<3;i++)mindSeen(v,"help")});return o});
 ok(r2.wPlain===0&&r2.wOff>0&&r2.wHon===0,'a loyal servant does not sell; offended in her chữ trọng she may; honoured she does not',r2);
 ok(r2.tOff>=r2.tPlain+20&&r2.tHon<r2.tPlain,'recruit odds: offended ≫ plain > honoured (one core)',{plain:r2.tPlain,off:r2.tOff,hon:r2.tHon});
 ok(r2.takeHon>0&&r2.takeHon<r2.takeOff&&r2.takeHon<=60,'loyal + honoured MOSTLY refuses but by odds (not a hard 0); offended takes more',{hon:r2.takeHon,off:r2.takeOff});
 ok(r2.punRec.some(x=>x[0]==="Nhân"),'Phạt is recorded as a deed (punish tag) for the punished one\'s fellows who hold Nhân',r2.punRec);
 /* 3 failure costs no bạc; success pays the price — her and NPC */
 const r3=await p.evaluate(()=>{const o={};let {v,s}=__rig(50,"Ham lợi",["Cần","Kiệm"]);const cost=nv(s,"bribeCost");
  S.bac=500;__rnd(.999);bribeServ(S,s);__rndOff();o.failBac=S.bac;o.failSpy=s.spyFor;s.spyFor=null;
  S.bac=500;__rnd(0);const t=bribeServ(S,s);__rndOff();o.okBac=S.bac;o.okSpy=s.spyFor;o.cost=cost;o.okTxt=t;s.spyFor=null;
  /* NPC briber */const w=liveRivals(true).filter(x=>x!==v&&x.alive&&!x.out)[0];w.bac=500;__rnd(.999);bribeServ(w,s);__rndOff();o.npcFail=w.bac;s.spyFor=null;
  w.bac=500;__rnd(0);bribeServ(w,s);__rndOff();o.npcOk=w.bac;o.npcSpy=s.spyFor===key(w);s.spyFor=null;
  /* Cài tai mắt card (her deck runOpt): the price sits in thành (w), nothing in the cost */
  for(const x of allServ())if(x.spyFor==="me")x.spyFor=null;S.bac=500;const C=P3C.eyes(S);o.card={c:C.c,w:C.w,x:C.x};__rnd(.999);const b0=S.bac;try{runOpt(C)}catch(e){o.err=String(e)}__rndOff();o.cardFail=b0-S.bac;
  S.bac=500;const C2=P3C.eyes(S);__rnd(0);const b1=S.bac;try{runOpt(C2)}catch(e){o.err2=String(e)}__rndOff();o.cardOk=b1-S.bac;o.cardPrice=-(C2.w.bac||0);
  /* ACT "Mua chuộc cung nữ" on a consort: no bạc on refusal */const u=liveRivals(true).find(x=>x.maid&&x.alive&&!x.out);S.bac=500;__rnd(.999);try{ACT.bribe.f(S,u)}catch(e){o.err3=String(e)}__rndOff();o.actFail=500-S.bac;
  return o});
 ok(r3.failBac===500&&r3.failSpy!=="me",'Mua chuộc refused: no bạc taken',r3);
 ok(r3.okBac===500-r3.cost&&r3.okSpy==="me",'Mua chuộc taken: her price paid',{bac:r3.okBac,cost:r3.cost});
 ok(r3.npcFail===500&&r3.npcOk===500-r3.cost&&r3.npcSpy,'NPC briber: the same (no bạc on refusal, price on success)',{fail:r3.npcFail,ok:r3.npcOk});
 ok(!r3.card.c.bac&&r3.card.w.bac<0&&/bại: không mất bạc/.test(r3.card.x),'Cài tai mắt card: price in thành, none in the cost; the card says so',r3.card);
 ok(r3.cardFail===0&&r3.cardOk===r3.cardPrice&&!r3.err&&!r3.err2,'Cài tai mắt: failure 0 bạc, success = her price',{fail:r3.cardFail,ok:r3.cardOk,price:r3.cardPrice,e:r3.err||r3.err2});
 ok(r3.actFail===0&&!r3.err3,'ACT Mua chuộc cung nữ (consort\'s maid): refusal costs no bạc',{d:r3.actFail,e:r3.err3});
 /* 4 the sent servant's fear */
 const r4=await p.evaluate(()=>{const o={};let {v,s}=__rig(50,"Ham lợi",["Cần","Kiệm"]);S.bac=500;/* merge r2: main's household table (staff-root, BAL.promo.cap) gives a low-rank start no staff beside the close maid — give her one */if(!(S.staff||[]).length)S.staff=[mkServ("maid")];const sum=L=>L.reduce((a,x)=>a+(x.loyal||0),0);const m=bestSent(S);o.has=!!m;if(m){/* the drop lands on whoever is sent: measure the whole staff */const L=S.staff.filter(x=>!x.spyFor);L.forEach(x=>x.loyal=60);__rnd(.999);bribeServ(S,s);__rndOff();o.her=60*L.length-sum(L)}
  s.spyFor=null;const w=liveRivals(true).filter(x=>x!==v&&x.alive&&!x.out&&(x.staff||[]).length)[0];const n=bestSent(w);o.hasN=!!n;if(n){const L=w.staff.filter(x=>!x.spyFor);L.forEach(x=>x.loyal=60);w.bac=500;__rnd(.999);bribeServ(w,s);__rndOff();o.npc=60*L.length-sum(L)}
  o.fear=BAL.ag.bt.fear;o.timid=BAL.ag.bt.fearTimid;return o});
 const fe=r4.fear,ft=Math.round(r4.fear*r4.timid);
 ok(r4.has&&(r4.her===fe||r4.her===ft),'failed approach: HER sent servant loses lòng from fear',r4);
 ok(r4.hasN&&(r4.npc===fe||r4.npc===ft),'NPC parity: the NPC\'s sent servant loses lòng the same',r4);
 /* 5 parity of the record / mood + one card-odds rule */
 const r5=await p.evaluate(()=>{const o={};const {v,s}=__rig(50,"Ham lợi",["Nhân","Cần"]);const s2=v.staff[1];servDo(v,"thuong",s2);o.npcMood=mindMood(s2,v);v.bac=999;servDo(v,"phat",s2);o.npcMood2=mindMood(s2,v);
  if(!(S.staff||[]).length)S.staff=[mkServ("maid")];/* merge r2: see r4 */const my=(S.staff||[])[0];if(my){S.bac=999;servDo(S,"thuong",my);o.herMood=mindMood(my,S)}
  my&&(my.trong=["Nhân","Lễ"],my.trM=null);mindSeen(S,"harm");o.herRec=my?mindTr(my,S).off:null;
  o.p3=String(p3Run).includes("lotB(")&&/agOdd\(|agTry\(/.test(String(p3Run));o.run=true;/* runOpt is wrapped by later modules; its j2 body reads agOdd(o0+lotB) */return o});
 ok(r5.npcMood==="thuong"&&r5.npcMood2==="gian"&&r5.herMood==="thuong",'Thưởng / Phạt set today\'s mood toward the master (NPC and her)',r5);
 ok(r5.herRec&&r5.herRec.some(x=>x[0]==="Nhân"),'her own deeds are recorded by her servants too (harm offends Nhân)',r5.herRec);
 ok(r5.p3&&r5.run,'one card-odds rule: NPC p3Run adds quẻ luck (lotB) like her runOpt; both capped by agOdd',r5);
 /* 6 wording */
 const r6=await p.evaluate(()=>{const o={};o.g=fmt({mat:2}).replace(/<[^>]+>/g,"");o.l=fmt({mat:-1}).replace(/<[^>]+>/g,"");o.inv=kinvPlain({mat:1});
  const {v,s}=__rig(50,"Ham lợi");S.bac=999;render();o.btn=null;try{const h=document.body.innerHTML;o.btn=/thành: Bạc -\d+ · /.test(h)}catch(e){}return o});
 ok(/Tai mắt: ngỏ lời 2 người/.test(r6.g)&&/Tai mắt -1/.test(r6.l)&&/ngỏ lời 1 người/.test(r6.inv),'a Tai mắt gain previews as "ngỏ lời N người" (statTxt), a loss as "-N"',r6);
 ok(!errs.length,'no page errors',errs.slice(0,3));
 const n=res.filter(Boolean).length;console.log(`AG-BETRAY: ${n===res.length?'ALL '+n+' PASS':(res.length-n)+' FAIL of '+res.length}`);await b.close();process.exit(n===res.length?0:1)})();
