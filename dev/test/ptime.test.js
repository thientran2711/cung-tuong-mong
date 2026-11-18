/* PARALLEL TIME (jptime, owner OD 18/11 ~20:15Z/~20:20Z/~20:35Z) — unit test of the ONE mechanism.
   node dev/test/ptime.test.js [dev/index.html]
   1 sender card: "Sai đi dò la" costs the ORDER khắc (BAL.ptime.kinds.spy.o) and says "chờ N khắc"
   2 order: her clock moves by o only; the maid is AWAY (S.away / PTIME.away) until tap + n; she cannot be sent again (lock) nor follow (ledger)
   3 the result lands exactly at the due khắc (not before), as a report behind the status icon (no modal)
   4 «Đợi tin» jumps her clock to the return khắc (across a buổi of the same day) and lands it
   5 invite: the messenger goes, the guest comes at the due khắc
   6 NPC sender (two-way): an NPC's cx2:maidSpy keeps her maid away n khắc and lands at the due khắc
   7 old save (no S.away) loads; off switch BAL.ptime.on=0 = old instant behaviour
   8 no page errors */
const {chromium}=require('playwright');const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+require('path').resolve(URL0);
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>window.__ctmBuilt===1,null,{timeout:60000}).catch(()=>{});
 const r=await p.evaluate(()=>{const o={};localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;
  for(let i=0;i<20;i++){window.__nlInner=1;start();window.__nlInner=0;if(!isSrv()&&S.maid&&!S.out)break}
  window.__bot=1;Q.length=0;S.mg=0;
  const toB0=()=>{for(let i=0;i<12&&!((S.buoi||0)===0&&used===0);i++){Q.length=0;S.mg=0;try{nextBuoi()}catch(e){}Q.length=0}};toB0();
  const R=BAL.ptime.kinds;o.row=R.spy;
  /* 1 card */
  const A=talkOpts({kind:"maid"});const sp=A.find(a=>a&&a.n==="Sai đi dò la");o.pk=sp&&sp.pk;o.k=sp?talkK(sp):null;o.x=sp&&sp.x;
  let line="";try{line=kaPlain?optLine(sp):""}catch(e){line=String(e)}o.line=String(line).replace(/<[^>]*>/g,"");
  /* 2 order */
  const t0=ptNow();S.payOnPick=talkK(sp);spyPick(talkK(sp));const pick=Q.length?Q[Q.length-1].opts.find(x=>x.kgt):null;o.pick=!!pick;if(pick)pick.go();Q.length=0;
  o.used1=used;const aw=PTIME.away("mm:me");o.away=aw?{due:aw.due,t0:aw.t0,kind:aw.kind}:null;o.t0=t0;
  S.adDoor={};const A2=talkOpts({kind:"maid"});const sp2=A2.find(a=>a&&a.n==="Sai đi dò la");o.lock2=!!(sp2&&sp2.lock);o.lockT=sp2&&sp2.t;
  try{j95sync(false,true)}catch(e){}const RP=S.roster&&S.roster.P["mm:me"];o.led=RP?RP.map(e=>e[1]):null;
  o.landEarly=!!(aw&&aw.back);
  /* 3 lands at due */
  const s0=S.logSeq;spend(R.spy.n-R.spy.o);o.used3=used;o.back=!!(aw&&aw.back);o.rep=aw&&aw.rep?{t:aw.rep.t,L:aw.rep.L.length}:null;o.news=PTIME.news().length;o.q=Q.length;
  o.ledAfter=S.roster&&S.roster.P["mm:me"]?S.roster.P["mm:me"].map(e=>e[1]):null;
  /* panel reads the news */
  const pn=ptPanel();o.panel=!!(pn&&pn.h&&pn.h.length>20);o.news2=PTIME.news().length;
  /* 4 Đợi tin across a buổi: send "Nghe ngóng chung" at khắc 3 */
  toB0();spend(2);const L=talkOpts({kind:"maid"}).find(a=>a&&a.n==="Nghe ngóng chung");o.lpk=L&&L.pk;spend(talkK(L));const txt=L.run();o.ltxt=txt;
  const la=PTIME.away("mm:me");o.ldue=la&&la.due;o.lnow=ptNow();o.waitOk=PTIME.waitOk();const b0=S.buoi||0;PTIME.wait();Q.length=0;o.wb=[b0,S.buoi||0,used];o.lback=!!(la&&la.back);
  /* 5 invite */
  toB0();const v=liveRivals(true).find(x=>x.alive&&!x.out&&!x.confined&&!sameHouse(S,x));o.inv=!!v;
  if(v){BAL.invite.hate=-999;const before=used;invite(v.id);const ia=ptZ().find(a=>a.kind==="invite"&&!a.back);o.ia=ia?{who:ia.who,due:ia.due,now:ptNow()}:null;o.iused=used-before;
   const oo=ia.a.o;ia.a.o=100;spend(R.invite.n-R.invite.o);o.iback=!!ia.back;o.iwhere=S.where[v.id];ia.a.o=oo}
  /* 6 NPC sender two-way */
  toB0();const n=liveRivals(true).find(x=>x.maid&&x.alive&&!x.out);o.npc=!!n;
  if(n&&typeof AGRUN!=="undefined"&&AGRUN["cx2:maidSpy"]){const tg=S;const s1=ptZ().length;const ret=AGRUN["cx2:maidSpy"](n,tg);const na=ptZ().find(a=>a.who==="mm:"+n.id&&!a.back);o.npcAway=na?{due:na.due,now:ptNow(),by:na.by}:null;o.npcRet=ret;
   if(na){spend(R.spy.n);o.npcBack=!!na.back}}
  /* 7 old save + off */
  delete S.away;o.old=Array.isArray(ptZ())&&PTIME.away("mm:me")===null;
  BAL.ptime.on=0;toB0();const A3=talkOpts({kind:"maid"});const sp3=A3.find(a=>a&&a.n==="Sai đi dò la");o.offK=talkK(sp3);o.offPk=!!(sp3&&sp3.pk);const tg3=liveRivals(true)[0];spyMaidRun(tg3);o.offAway=ptZ().length;BAL.ptime.on=1;
  o.errs=PT.stat.errs.slice();return o});
 console.log(JSON.stringify(r));const R=r.row;
 ok(r.pk==="spy"&&r.k===R.o,"1 card: Sai đi dò la costs the order khắc",{k:r.k});
 ok(/Tốn\s*1 khắc\s*·\s*chờ 2 khắc/.test(r.line),"1 card line: tốn 1 khắc, chờ N khắc",r.line.slice(0,120));
 ok(r.pick&&r.used1===R.o,"2 her clock moved by the order only",r.used1);
 ok(r.away&&r.away.kind==="spy"&&r.away.due===r.t0+R.n,"2 maid away until tap + n",r.away);
 ok(r.lock2&&/về/.test(r.lockT||""),"2 busy maid cannot be sent again",r.lockT);
 ok(!r.led||(r.led[0]==="errand"&&r.led[1]==="errand"),"2 ledger: the maid is on the errand (not following)",r.led);
 ok(!r.landEarly,"3 not landed before the due khắc");
 ok(r.back&&r.rep&&r.rep.L>0&&r.q===0,"3 landed at the due khắc as a report, no modal",{rep:r.rep,q:r.q});
 ok(r.news===1&&r.panel&&r.news2===0,"3 status icon panel shows and reads the report");
 ok(r.lpk==="listen"&&/về/.test(r.ltxt||""),"4 Nghe ngóng chung is a parallel order",r.ltxt);
 ok(r.waitOk&&r.lback&&r.wb[1]===r.wb[0]+1,"4 Đợi tin jumps to the return khắc in the next buổi and lands it",{wb:r.wb,due:r.ldue,now:r.lnow});
 ok(!r.inv||(r.ia&&r.iused===R.o&&r.iback&&r.iwhere==="home"),"5 invite: messenger away, guest comes at the due khắc",{ia:r.ia,used:r.iused,where:r.iwhere});
 ok(!r.npc||(r.npcAway&&r.npcAway.due===r.npcAway.now+R.n&&r.npcBack),"6 NPC cx2:maidSpy: her maid away n khắc, lands at due",{a:r.npcAway,back:r.npcBack});
 ok(r.old,"7 old save without S.away");
 ok(r.offK===2&&!r.offPk&&r.offAway===0,"7 off switch = old instant behaviour",{k:r.offK,away:r.offAway});
 ok(!r.errs.length,"no jptime errors",r.errs);
 ok(!errs.length,"8 no page errors",errs.slice(0,3));
 await b.close();const f=res.filter(x=>!x).length;console.log(f?`${f} FAIL`:'ALL OK');process.exit(f?1:0)})();
