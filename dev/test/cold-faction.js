/* cold-faction PLAY CHECK (law 1 TWO-WAY, law 2/3 roads, law 4 BAL, law 6 REAL WORLD): faction life while someone is in lãnh cung.
   ONE rule (j10 herCold / facIn): a woman in lãnh cung (her, an NPC, the co-op friend's mirror v.out) stays on her faction's ROLL (named, sold out,
   struck off) but is not PRESENT (cannot lead, meet, be rủ / mời face to face). From inside she acts only by LETTER (j14 coldFacActs, the same cards for
   her deck and an NPC's p3Cold): two roads, the food eunuch (Bạc) or her own kept maid (no bạc, the maid at risk).
   Rows play the game's own functions on both sides. usage: node dev/test/cold-faction.js [dev/index.html] → exit 1 on FAIL */
const path=require('path');const {chromium}=require('playwright');const HTML=process.argv[2]||'dev/index.html';
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.route(u=>/^https?:/.test(u.href)||/\.(webp|png|jpg|mp3|ogg|mp4|webm)$/.test(u.pathname),r=>r.abort());
 await p.goto('file://'+path.resolve(HTML),{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{window.__seed=s=>{let sd=s;Math.random=()=>{sd=(sd*16807)%2147483647;return (sd-1)/2147483646}};__seed(20261121);localStorage.clear();SLOT=4;
  document.getElementById('title').hidden=true;window.__nlInner=1;start();for(let i=0;i<60&&isSrv();i++)start();window.__nlInner=0;window.__bot=1;quiet=false;Q.length=0;try{render()}catch(e){}});
 const r=await p.evaluate(()=>{const o={};const B=BAL.ag.par3,LT=B.cold.lt,FD=B.fac.drop,PD=BAL.rcv.prop.danh;
  const snap={};for(const k of ["out","coldTurn","rank","place","staff","maid","bac","danh"])snap[k]=JSON.stringify(S[k]===undefined?null:S[k]);
  const L=()=>liveRivals(true).filter(x=>x!==S&&!x.out&&!sameHouse(S,x)&&!x.queen);
  const reset=s=>{__seed(s);S.facs=[];S.out=0;S.coldTurn=null;S.dead=false;S.rank=4;S.kh=0;S.bac=200;S.danh=50;try{used=0}catch(e){}Q.length=0;for(const x of rivals){if(x.p3Out){x.out=false;x.p3Out=0}}};
  const goCold=()=>{cold("Thử lãnh cung");Q.length=0;S.bac=200};
  const npcCold=v=>{v.out=true;v.p3Out=1};
  const names=A=>A.map(c=>c.n);
  /* 1. the rule */
  reset(1);o.r1=[herCold(),facIn(S)];goCold();o.r1.push(herCold(),facIn(S));
  {const oc=S.coldTurn;S.out=1;S.coldTurn=null;o.r1b=herCold();S.coldTurn=oc}/* a stand-in S.out (srvW / kcW) without a cold() is not lãnh cung */
  /* 2. her faction while she is in lãnh cung: still on the roll, not present, a present member leads; facMonth keeps it */
  reset(2);{const [m,n]=L();found(S,m);joinFac(n,facOf(S));const f=facOf(S);goCold();
   o.roll=[facOf(S)===f,facRoll(f).includes(S),!facMembers(f).includes(S),facLeader(f)!==S];
   const dp=FD.p;FD.p=0;try{facMonth()}catch(e){o.e2=e.message}FD.p=dp;o.keep=facOf(S)===f}
  /* 3. her Phe phái tab in lãnh cung: no face-to-face button, a note; facAct does nothing */
  reset(3);{const [m,t]=L();affAdd(t,S,60);goCold();const h=facHTML();o.tab=[!/data-fa=/.test(h),/lãnh cung/.test(h)];facAct("lap",{fv:String(t.id)});o.tabAct=!facOf(S)&&!Q.length}
  /* 4. an NPC → her in lãnh cung: never rủ / mời face to face (p3FacFr, rcvAsk ok, j10 facInvite) */
  reset(4);{const [v,l,m]=L();affAdd(v,S,80);for(const x of L())if(x!==v)affAdd(v,x,-100);found(l,m);affAdd(l,S,80);goCold();
   o.nh=[!p3FacFr(v).includes(S),rcvAsk("facFound",v,S)==="",rcvAsk("facInvite",l,S)===""];}
  /* 5. her letters from lãnh cung: Rời phe + Tố phe; two roads when a trusted maid is kept */
  reset(5);{const [m,n]=L();found(S,m);joinFac(n,facOf(S));const f=facOf(S);goCold();S.staff=[];S.maid=null;
   const A1=coldActs();o.l1=names(A1).filter(x=>/^Gửi thư/.test(x));
   const md=mkServ("maid");md.loyal=90;md.name="Thu Cúc";S.staff=[md];const A2=coldActs();o.l2=names(A2).filter(x=>/^Gửi thư/.test(x));
   const lv=A2.find(c=>/^Gửi thư xin rời/.test(c.n)&&/thái giám đưa cơm/.test(c.n));o.lvCost=lv&&lv.c.bac===-LT.bac;const d0=S.danh;lv.go();o.lvDone=[!facOf(S),S.danh===d0+PD];
   reset(6);found(S,m);joinFac(n,facOf(S));goCold();S.staff=[md];md.loyal=90;const A3=coldActs();const mr=A3.find(c=>/^Gửi thư xin rời/.test(c.n)&&/Thu Cúc/.test(c.n));
   o.l3=names(A3).filter(x=>/^Gửi thư/.test(x));if(!mr){o.mdRoad=false;o.mdFail=false}else{o.mdRoad=!!mr&&!mr.c.bac&&mr.o<100;const l0=md.loyal;mr.fail();o.mdFail=md.loyal===l0-LT.maidLoy}
   reset(7);found(S,m);joinFac(n,facOf(S));const g=facOf(S);goCold();S.staff=[];const so=coldActs().find(c=>/^Gửi thư tố/.test(c.n));const om=oan(m,S),d1=S.danh;so.go();
   o.sell=[!facOf(S),oan(m,S)>=om+Math.min(B.fac.sell.oan,100-om)-1,S.danh>=d1+B.fac.sell.danh-0]}
  /* 6. her letter asking to join a faction: the leader (an NPC) answers by jrcv's own pick */
  reset(8);{const [l,m]=L();found(l,m);const f=facOf(l);affAdd(l,S,60);goCold();S.staff=[];const jc=coldActs().find(c=>/^Gửi thư xin vào/.test(c.n));o.jCard=!!jc;
   const RP=window.rcvPick;let got=null;window.rcvPick=function(t,a,O,k){const c=RP.apply(this,arguments);if(t===l&&a===S)got=c&&c.id;return c};
   if(jc)jc.go();window.rcvPick=RP;o.jAns=got;o.jOk=!!got&&(facOf(S)===f)===(got==="full"||got==="half");
   reset(9);found(l,m);goCold();const yes=RCVK.facJoin.opts(S,l,facOf(l).id)[0];o.jYesCost=yes.fx.danh===-PD;const dl=l.danh;yes.go();o.jYes=[facOf(S)===facOf(l),facRoll(facOf(l)).includes(S),l.danh===dl-PD]}
  /* 7. an NPC in lãnh cung: the SAME letter cards (coldActsOf), p3Cold weighs them (C.ag), and a letter to HER faction is her 4-answer card */
  reset(10);{const [v,m,y]=L();found(v,m);npcCold(v);const A=coldActsOf(v);o.nc=names(A).filter(x=>/^Gửi thư/.test(x));
   const lv=A.find(c=>/^Gửi thư xin rời/.test(c.n));o.ncAg=!!lv&&!!lv.ag;v.bac=200;lv.go();o.ncLeave=!facOf(v);
   reset(11);found(S,m);npcCold(y);affAdd(S,y,60);y.bac=200;y.staff=[];const jc=coldActsOf(y).find(c=>/^Gửi thư xin vào/.test(c.n));o.ncJ=!!jc;let rs="";if(jc)rs=jc.go();
   o.ncJSent=/xin vào phe của ngươi/.test(String(rs));const it=(S.rcvPend||[]).slice(-1)[0];const card=PEND.rcvAsk({k:"facJoin",a:key(y),x:facOf(S).id});
   o.ncJCard=!!card&&card.o.length===4&&/lãnh cung/.test(card.t);Q.length=0;if(card)card.o[0].go();o.ncJYes=facOf(y)===facOf(S)&&!facMembers(facOf(S)).includes(y)}
  /* 8. struck off the roll: she (leader) drops an NPC in lãnh cung (button + facAct); an NPC leader drops her (facMonth) */
  reset(12);{const [m,n]=L();S.rank=6;m.rank=1;n.rank=1;found(S,m);joinFac(n,facOf(S));const f=facOf(S);o.lead=facLeader(f)===S;npcCold(m);const h=facHTML();o.gachBtn=new RegExp('data-fa="gach" data-fv="'+m.id+'"').test(h);
   const om=oan(m,S),d0=S.danh;facAct("gach",{fv:String(m.id)});o.gach=[facOf(m)!==f,!f.m.includes(key(m)),oan(m,S)>om,S.danh===d0+PD];
   reset(13);const [l,k]=L();found(l,k);joinFac(S,facOf(l));const g=facOf(l);goCold();affAdd(l,S,-100);const dp=FD.p;FD.p=100;let ev="";try{ev=facMonth()}catch(e){o.e8=e.message}FD.p=dp;
   o.drop=[facOf(S)!==g,/gạch tên ngươi/.test(ev)]}
  /* 9. NPC → NPC in lãnh cung: an NPC never rủ another NPC who is inside (p3FacFr) */
  reset(14);{const [v,y]=L();affAdd(v,y,80);npcCold(y);o.nn=!p3FacFr(v).includes(y)}
  /* 10. co-op: the friend's mirror (v.coop) in lãnh cung (v.out from her seat) follows the NPC rule on this seat; on her own seat she is S (rows 1–8) */
  reset(15);{const [v,m]=L();const c0=v.coop;v.coop=1;found(v,m);npcCold(v);o.co=[!facIn(v),!p3FacFr(m).includes(v),facRoll(facOf(m)).includes(v),!facMembers(facOf(m)).includes(v)];
   joinFac(S,facOf(m));v.coop=c0}
  /* 11. back from lãnh cung: present again, still a member */
  reset(16);{const [m,n]=L();found(S,m);joinFac(n,facOf(S));const f=facOf(S);goCold();restore(false,"Thử");Q.length=0;o.back=[!herCold(),facMembers(f).includes(S)]}
  /* 12. every number from BAL (law 4): the card / button words print the keys */
  reset(17);{const [m,n]=L();found(S,m);joinFac(n,facOf(S));const h=facHTML();o.bal=[h.includes("Danh "+balSg(B.fac.sell.danh)),h.includes("oán "+balSg(B.fac.sell.oan)),h.includes(balSg(-B.fac.leave.rel))]}
  /* 13. review (law 3 + law 2): Rời phe of her own will is never cost-only — her tab and an NPC's cx3:facLeave = the letter (Danh + prop.danh);
     the free maid road never beats the eunuch road outright (best maid odds ≤ eunuch odds) */
  reset(18);{const [m,n]=L();found(S,m);joinFac(n,facOf(S));const h=facHTML();const d0=S.danh;facAct("roi",{});o.lv13=[h.includes("Rời phe<small>Danh "+balSg(PD)),!facOf(S),S.danh===d0+PD];
   const [v,x,y]=L();found(v,x);joinFac(y,facOf(v));const dv=v.danh;AGRUN["cx3:facLeave"](v);o.lv13.push(!facOf(v),v.danh===dv+PD);
   o.lv13.push(LT.maidO+100/LT.loyD<=LT.euO)}
  for(const k in snap){try{S[k]=JSON.parse(snap[k])}catch(e){}}S.facs=[];S.out=0;Q.length=0;
  return o});
 console.log(JSON.stringify(r));
 ok(JSON.stringify(r.r1)==='[false,true,true,false]'&&r.r1b===false,'1 rule: herCold only after cold(); a stand-in S.out is not lãnh cung',r.r1);
 ok(r.roll&&r.roll.every(Boolean)&&r.keep,'2 her faction in lãnh cung: on the roll, not present, a present member leads, facMonth keeps it',[r.roll,r.keep,r.e2]);
 ok(r.tab&&r.tab.every(Boolean)&&r.tabAct,'3 her tab in lãnh cung: no face-to-face buttons, a note; facAct is shut',[r.tab,r.tabAct]);
 ok(r.nh&&r.nh.every(Boolean),'4 NPC → her in lãnh cung: no rủ / mời face to face',r.nh);
 ok(r.l1.length===2&&r.l2.length===4,'5a her letters: Rời + Tố, one road (eunuch) without a trusted maid, two with one',[r.l1,r.l2]);
 ok(r.lvCost&&r.lvDone.every(Boolean),'5b letter Rời phe (eunuch road): Bạc from BAL, out of the faction, Danh + prop.danh',[r.lvCost,r.lvDone]);
 ok(r.mdRoad&&r.mdFail,'5c maid road: no bạc, real odds; caught → maid loyalty − BAL lt.maidLoy',[r.mdRoad,r.mdFail,r.l3]);
 ok(r.sell.every(Boolean),'5d letter Tố phe: out, members oán + BAL sell.oan, Danh + sell.danh',r.sell);
 ok(r.jCard&&r.jOk,'6a her letter Xin vào phe: the NPC leader answers (jrcv pick), the faction changes only on yes',[r.jCard,r.jAns,r.jOk]);
 ok(r.jYesCost&&r.jYes.every(Boolean),'6b taking a phế phi in: yes costs the leader Danh − prop.danh (law 2/3)',[r.jYesCost,r.jYes]);
 ok(r.nc.length>=1&&r.ncAg&&r.ncLeave,'7a NPC in lãnh cung: the same letter cards (weighed by C.ag), Rời phe works',[r.nc,r.ncAg,r.ncLeave]);
 ok(r.ncJ&&r.ncJSent&&r.ncJCard&&r.ncJYes,'7b NPC in lãnh cung → HER faction by letter: her 4-answer card (law 1 reverse), yes = on the roll',[r.ncJ,r.ncJSent,r.ncJCard,r.ncJYes]);
 ok(r.lead&&r.gachBtn&&r.gach.every(Boolean),'8a she (leader) strikes an NPC in lãnh cung off the roll: button + facAct, Danh + prop.danh, oán',[r.lead,r.gachBtn,r.gach]);
 ok(r.drop&&r.drop.every(Boolean),'8b an NPC leader strikes HER off while she is in lãnh cung (facMonth, BAL drop)',[r.drop,r.e8]);
 ok(r.nn,'9 NPC → NPC in lãnh cung: never rủ face to face');
 ok(r.co&&r.co.every(Boolean),'10 co-op friend mirror in lãnh cung: same rule on this seat (not present, on the roll)',r.co);
 ok(r.back&&r.back.every(Boolean),'11 back from lãnh cung: present again, still a member',r.back);
 ok(r.bal&&r.bal.every(Boolean),'12 words print BAL keys (sell / leave)',r.bal);
 ok(r.lv13&&r.lv13.every(Boolean),'13 review: Rời phe (her tab, NPC cx3) has the Danh gain like the letter; maid road odds ≤ eunuch road',r.lv13);
 ok(!errs.length,'no page errors',errs.slice(0,3));
 const n=res.filter(x=>!x).length;console.log(n?`COLD-FACTION FAIL ${n}/${res.length}`:`COLD-FACTION ALL PASS ${res.length}`);await b.close();process.exit(n?1:0)})();
