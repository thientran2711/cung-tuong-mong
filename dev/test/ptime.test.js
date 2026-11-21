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
  const s0=S.logSeq;spend(R.spy.n-R.spy.o);o.used3=used;o.back=!!(aw&&aw.back);o.rep=aw&&aw.rep?{t:aw.rep.t,L:aw.rep.L.length}:null;o.news=PTIME.news().length;/* only a modal about this send counts (a random world event may queue on its own while time passes) */o.q=Q.filter(x=>aw&&String(x.t||"").includes(aw.nm||"\u0000")).length;
  o.ledAfter=S.roster&&S.roster.P["mm:me"]?S.roster.P["mm:me"].map(e=>e[1]):null;
  /* panel reads the news */
  const pn=ptPanel();o.panel=!!(pn&&Array.isArray(pn.facts)&&pn.facts.join(" ").length>20&&!pn.h);o.news2=PTIME.news().length;
  /* 4 Đợi tin across a buổi: send "Nghe ngóng chung" at khắc 3 */
  toB0();spend(2);const L=talkOpts({kind:"maid"}).find(a=>a&&a.n==="Nghe ngóng chung");o.lpk=L&&L.pk;spend(talkK(L));const txt=L.run();o.ltxt=txt;
  const la=PTIME.away("mm:me");o.ldue=la&&la.due;o.lnow=ptNow();Q.length=0;S.mg=0;/* walk-cost de-flake: a random card queued at send time hides «Đợi tin» until read (ptWaitOk) — the player closes it first */o.waitOk=PTIME.waitOk();const b0=S.buoi||0;Q.length=0;S.mg=0;for(let w=0;w<6&&!la.back;w++){PTIME.wait();Q.length=0;S.mg=0}/* walk-cost de-flake: random cards (news, an NPC asking) can stop the jump more than twice *//* a modal popping on the way stops the jump (the player reads it, then taps «Đợi tin» again) */o.wb=[b0,S.buoi||0,used];o.lback=!!(la&&la.back);
  /* 5 invite */
  toB0();const v=liveRivals(true).find(x=>x.alive&&!x.out&&!x.confined&&!sameHouse(S,x));o.inv=!!v;
  if(v){BAL.invite.hate=-999;const before=used;invite(v.id);const ia=ptZ().find(a=>a.kind==="invite"&&!a.back);o.ia=ia?{who:ia.who,due:ia.due,now:ptNow()}:null;o.iused=used-before;
   const oo=ia.a.o;ia.a.o=100;/* walk-cost: pin the guest's answer (jrcv rcvInviteGo is the guest's own random choice; this check is the TIMING) - was a ~1/3 flake */const rg=typeof rcvInviteGo==="function"?rcvInviteGo:null;if(rg)rcvInviteGo=()=>true;try{spend(R.invite.n-R.invite.o)}finally{if(rg)rcvInviteGo=rg}o.iback=!!ia.back;o.iwhere=S.where[v.id];ia.a.o=oo}
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
 ok(r.waitOk&&r.lback&&r.wb[1]===r.wb[0]+1,"4 Đợi tin jumps to the return khắc in the next buổi and lands it",{wb:r.wb,due:r.ldue,now:r.lnow,waitOk:r.waitOk});
 ok(!r.inv||(r.ia&&r.iused===R.o&&r.iback&&r.iwhere==="home"),"5 invite: messenger away, guest comes at the due khắc",{ia:r.ia,used:r.iused,where:r.iwhere});
 ok(!r.npc||(r.npcAway&&r.npcAway.due===r.npcAway.now+R.n&&r.npcBack),"6 NPC cx2:maidSpy: her maid away n khắc, lands at due",{a:r.npcAway,back:r.npcBack});
 ok(r.old,"7 old save without S.away");
 ok(r.offK===2&&!r.offPk&&r.offAway===0,"7 off switch = old instant behaviour",{k:r.offK,away:r.offAway});
 ok(!r.errs.length,"no jptime errors",r.errs);

 /* 9 harm deed by a sent servant · 10 receiver side (maid road) */
 const r2=await p.evaluate(()=>{const o={};BAL.ptime.on=1;Q.length=0;S.adDoor={};
  const toB0=()=>{for(let i=0;i<12&&!((S.buoi||0)===0&&used===0);i++){Q.length=0;S.mg=0;try{nextBuoi()}catch(e){}Q.length=0}};toB0();
  if(!(S.staff||[]).some(s=>s&&s.sid!=null))S.staff=(S.staff||[]).concat([mkServ("maid")]);
  const i=rivals.findIndex(v=>v&&v.alive&&!v.out&&!together(S,v)&&(typeof k61Named!=="function"||k61Named(v))&&ACT.rumor&&ACT.rumor.ok(S,v));o.hv=i>=0;
  if(i>=0){const v=rivals[i];/* de-flake (review #4, 1 FAIL in 19): a random event at the new day may have sent her only free servant (errPtRun, law 6b: really away) — this test needs ONE free runner, so her earlier sends are cleared first (the same test assumption as errand-scene __erReset); dropped rows are logged */o.drop=ptZ().filter(x=>x&&x.by==="me"&&!x.back).map(x=>x.kind+":"+(x.a&&x.a.run||"")+":"+(x.a&&x.a.k||""));if(o.drop.length){S.away=ptZ().filter(x=>!(x&&x.by==="me"&&!x.back));ptLedger()}o.hk=harmK(v,"rumor");o.hx=ptHarmX(v,"rumor");const u0=used;window.__j70inst=1;doAct(i,"rumor");window.__j70inst=0;Q.length=0;const a=ptZ().find(x=>x.kind==="harm"&&!x.back);o.ha=a?{due:a.due,k:a.a.k}:null;o.hu=used-u0;spend(1);o.hback=!!(a&&a.back)}
  /* maid road */
  localStorage.clear();for(let k=0;k<40;k++){window.__nlInner=1;start();window.__nlInner=0;if(isSrv())break}if(!isSrv()){try{srvInit();deal()}catch(e){}}o.srv=isSrv();if(!o.srv)return o;Q.length=0;S.mg=0;toB0();
  o.P={ansK:BAL.ptime.ansK,half:BAL.road.hp.half,lo:BAL.odds.lo};S.srv.err={b:bid(),k:"vuon",n:"Ra Ngự hoa viên hái hoa cắm bình"};S.ordQ=[];const p0=S.place,q0=Q.length;o.fr=ptErrFrame();o.noPop=Q.length===q0;const oq=(S.ordQ||[])[0];o.oq=oq?{pid:oq.pid,dl:oq.due-ptNow()}:null;
  o.pan=ptPanel().opts.map(x=>x.n);/* shown = charged: the real walk + the task (FAIL 7 item 3) */o.nF=ptRecvN("vuon","errand",0);o.nH=ptRecvN("vuon","errand",1);o.walk=ptRecvWalk("vuon");o.nExp=Math.max(BAL.ptime.kinds.errand.n,BAL.ptime.taskMin+1,o.walk+BAL.ptime.kinds.errand.n-BAL.walk.near);if(oq){ptOrdOpen(oq)}const d=Q[Q.length-1];o.on=d&&d.opts.map(x=>x.n);o.ox=d&&d.opts[0].x;o.qx=d&&d.opts[1]&&d.opts[1].x;
  const u0=used;if(d){Q.pop();d.opts[0].go()}Q.length=0;o.place=[p0,S.place];o.used=used-u0;o.done=!!(S.srv.sent&&S.srv.sent.done);
  const m=srvM();const t=liveRivals(true).find(v=>v!==m&&v.alive&&!v.out);
  if(t){const c=PEND.cnvOrd({k:"spy",t:t.id});o.cn=c&&c.o.map(x=>x.n);o.cnN=[ptRecvN(palaceOf(t),"spy",0),ptRecvN(palaceOf(t),"spy",1)];/* her công lao on the hết lòng row (item 6) */o.cnMerit=srvOrdMerit();o.cnx=c&&c.o[0].x;o.chx=c&&c.o[1].x;
   /* the master's order arrives as a NOTICE (no pop-up) */const q1=Q.length;S.ordQ=[];window.__j95boff=1;const dd=mkP("cnvOrd",{k:"spy",t:t.id});window.__j95boff=0;pushDil(dd,"Lệnh của "+m.name);o.ordNo=Q.length===q1&&S.ordQ.length===1;
   /* qua loa = the same odds formula − BAL.road.hp.half */o.hp=[ordOdds("plant"),ordHalf(()=>ordOdds("plant"))];
   /* unanswered past the deadline = Từ chối with its cost */const tin0=S.tin;if(S.ordQ[0])S.ordQ[0].due=ptNow();ptTick();o.late={left:S.ordQ.length,dt:S.tin-tin0}}
  /* NPC receiver (two-way): an NPC servant ordered by its master picks among the SAME 4 (jagstf2 stf2Ord) */
  try{const K=BAL.ag.stf2.ord,K0=Object.assign({},K);Object.assign(K,{obey:0,refuse:0,tell:0,half:5,loyalTr:0});/* review #4 de-flake: half weighs ×(1−loyal/100) and a loyal-trait servant adds loyalTr to refuse → pick a servant not fully loyal */const v=rivals.find(x=>x&&x.alive&&!x.out&&bestSent(x)&&(bestSent(x).loyal||0)<100);const sv=v&&bestSent(v);
   o.npcHalf=sv&&typeof stf2Ord==="function"?stf2Ord(v,sv,t||v,"plant"):"none";Object.assign(K,K0);o.npcOpts=sv?cnvOrdOpts(sv,v,t||v,null).map(x=>x.id):null}catch(e){o.npcErr=String(e)}
  o.errs=PT.stat.errs.slice();return o});
 console.log(JSON.stringify(r2));
 ok(!r2.hv||(r2.hk===R.o&&/chờ 2 khắc/.test(r2.hx)&&r2.ha&&r2.hu===R.o&&r2.hback),"9 harm deed by a sent servant: order khắc, servant away, lands at due",{hk:r2.hk,hx:r2.hx,ha:r2.ha,hu:r2.hu,drop:r2.drop});
 ok(!r2.srv||(r2.fr&&r2.noPop&&r2.oq&&r2.oq.pid==="err"&&r2.oq.dl===r2.P.ansK&&r2.pan.includes("Nghe lệnh")),"10 receiver: Việc chủ sai = a NOTICE (no pop-up), answer before ansK khắc, «Nghe lệnh» in the 信 panel",{oq:r2.oq,pan:r2.pan});
 ok(!r2.srv||(JSON.stringify(r2.on)==='["Giúp hết lòng","Giúp qua loa","Từ chối"]'&&r2.nF===r2.nExp&&r2.nH===r2.nF-1&&r2.ox.includes(`tốn: ${r2.nF} khắc (cả đường đi)`)&&r2.qx.includes(`tốn: ${r2.nH} khắc (cả đường đi)`)),"10 receiver: Việc chủ sai = 3 answers (harmless: nothing to tell on); hết lòng = real walk + task, qua loa one khắc less",{on:r2.on,ox:r2.ox,qx:r2.qx,nF:r2.nF,nH:r2.nH,walk:r2.walk});
 ok(!r2.srv||(r2.place[1]==="vuon"&&r2.used===r2.nF&&r2.done),"10 receiver walks there; charged = shown (walk + task, via spend); errand done",{place:r2.place,used:r2.used,shown:r2.nF});
 ok(!r2.srv||(r2.cn&&r2.cn.length===4&&r2.cn[0]==="Giúp hết lòng"&&r2.cn[1]==="Giúp qua loa"&&r2.cn[2]==="Từ chối"&&/^Mách lẻo/.test(r2.cn[3])&&/Chủ tin -5 \(hoảng sợ\)/.test(r2.cnx)&&r2.cnx.includes(`tốn: ${r2.cnN[0]} khắc`)&&r2.chx.includes(`tốn: ${r2.cnN[1]} khắc`)&&r2.cnN[1]===r2.cnN[0]-1&&r2.cnx.includes(`ngươi công lao +${r2.cnMerit}`)),"10 receiver: master's order = the SAME 4 answers (OD L1876); dò la mirrors the sender row; khắc shown = real walk + task; her công lao shown",{cn:r2.cn,cnx:r2.cnx,chx:r2.chx,cnN:r2.cnN});
 ok(!r2.srv||(r2.ordNo&&r2.hp&&r2.hp[1]===Math.max(r2.P.lo,r2.hp[0]-r2.P.half)),"10 receiver: the master's order is a notice; qua loa odds = odds − BAL.road.hp.half",{ordNo:r2.ordNo,hp:r2.hp});
 ok(!r2.srv||(r2.late&&r2.late.left===0&&r2.late.dt<0),"10 receiver: unanswered past the deadline = Từ chối with its cost",r2.late);
 ok(!r2.srv||(r2.npcHalf==="half"&&JSON.stringify(r2.npcOpts)==='["obey","half","refuse","tell"]'),"10 two-way: an NPC servant picks among the same 4 (stf2Ord → half)",{h:r2.npcHalf,o:r2.npcOpts,e:r2.npcErr});
 ok(r2.srv!==false,"10 a maid-road life was started",r2.srv);
 ok(!(r2.errs||[]).length,"no jptime errors (part 2)",r2.errs);
 /* 11 FAIL 4 (round 5): CLICK the answers of a master's order (cnvOrd) — to ANOTHER palace the order is her pass (j41 accGrant), used == shown,
    the deed runs, the order is gone only after; a refused walk keeps the order (used +0); «Giúp qua loa» never costs 0 khắc and is always one
    khắc under «Giúp hết lòng» (laws 2/3) */
 const r3=!r2.srv?null:await p.evaluate(()=>{const o={rows:[],zero:[],errs:[]};BAL.ptime.on=1;
  const toB0=()=>{for(let i=0;i<12&&!((S.buoi||0)===0&&used===0);i++){Q.length=0;S.mg=0;try{nextBuoi()}catch(e){}Q.length=0}};
  const m=srvM();if(!m||!isSrv())return o;const mk=palaceOf(m);o.min=BAL.ptime.taskMin;
  const give=(k,t)=>{S.ordQ=[];Q.length=0;window.__j95boff=1;const dd=mkP("cnvOrd",{k,t:t.id});window.__j95boff=0;if(!dd)return null;pushDil(dd,"Lệnh của "+m.name);return S.ordQ[0]||null};
  const click=(oq,i)=>{ptOrdOpen(oq);const d=Q[Q.length-1];if(!d||!d.opts[i])return null;const x=d.opts[i].x;Q.length=0;const u0=used,s0=S.logSeq||0;/* the deed's own dice are not under test (a caught plant ends in Tân Giả khố or death): rolls succeed during the click only */const roll0=roll;roll=()=>true;let r="";try{r=cnvRun(S,d.opts[i],true)}finally{roll=roll0}if(r)log(r);Q.length=0;return{x,used:used-u0,logs:(S.logSeq||0)-s0}};
  const far=liveRivals(true).filter(v=>v!==m&&v!==S&&v.alive&&!v.out&&palaceOf(v)&&palaceOf(v)!==mk);
  for(const k of ["spy","plant","poison"])for(const t of far.slice(0,2)){toB0();S.place="home";S.srv.lau=0;const pl=palaceOf(t);const kind=k==="spy"?"spy":k==="plant"?"plant":"harm";
   const oq=give(k,t);if(!oq){o.rows.push({k,t:t.id,none:1});continue}const N=ptRecvN(pl,kind,0),H=ptRecvN(pl,kind,1);const c=click(oq,0);
   o.rows.push({k,pl,N,H,used:c&&c.used,shown:c&&/tốn: (\d+) khắc/.exec(c.x||"")?+/tốn: (\d+) khắc/.exec(c.x)[1]:null,at:S.place,exp:(srvM()&&pl===palaceOf(srvM()))?"home":pl,left:S.ordQ.filter(q=>q.id===oq.id).length/* walk-cost de-flake: only THIS order (a new random order — an NPC's rcvAsk — may arrive while the khắc pass) */,logs:c&&c.logs})}
  /* refused walk (Tân Giả khố): the order stays, nothing paid */
  /* first rival who can take an order (mkP may refuse one in this random world: its rows above then read none:1) */
  {let t=null,oq=null;for(const v of far){toB0();S.place="home";oq=give("spy",v);if(oq){t=v;break}}if(oq){S.srv.lau=1;const c=click(oq,0);o.refused={used:c&&c.used,left:S.ordQ.length,same:!!(S.ordQ[0]&&S.ordQ[0].id===oq.id),pass:!!(S.acPass&&S.acPass[palaceOf(t)]&&accHas(S,palaceOf(t)))};S.srv.lau=0}}
  /* walk 0 (a consort in the master's own palace, or the errand at home): never 0 khắc, qua loa = hết lòng − 1, charged = shown */
  for(const [kind,pl] of [["spy",mk],["plant",mk],["errand","home"],["errand",S.place]]){const F=ptRecvN(pl,kind,0),Hh=ptRecvN(pl,kind,1);o.zero.push({kind,pl,F,Hh})}
  {toB0();S.place="home";const t=liveRivals(true).find(v=>v!==m&&v!==S&&v.alive&&!v.out&&palaceOf(v)===mk);if(t){const oq=give("spy",t);if(oq){const H=ptRecvN(mk,"spy",1);const c=click(oq,1);o.half0={H,used:c&&c.used,left:S.ordQ.filter(q=>q.id===oq.id).length}}}}
  /* item 4: ONE NOTICE SYSTEM — every jptime notice goes through window.kitNotice({id,line,text,go,goLabel}) when jnotice is in the build (no kitLine) */
  {const got=[];let kl=0;const kn0=window.kitNotice,kl0=window.kitLine;window.kitNotice=sp=>{got.push(sp);return sp};const klW=kitLine;kitLine=function(){kl++;return null};
   try{toB0();const a=ptSend({who:"pt:test",nm:"Cung nữ thử",kind:"spy",lbl:"đi nghe ngóng"});if(a)spend(a.due-ptNow());/* first rival who can take an order (review #4 de-flake, same as test 11: mkP may refuse far[0] → no order notice) */for(const t of far){if(give("spy",t))break}
    o.note={n:got.length,go:got.some(x=>/đã đi/.test(x.line)),back:got.find(x=>/đã về: có tin báo/.test(x.line)),ord:got.find(x=>/có lệnh/.test(x.line)),kl};
    o.note.back=o.note.back&&{id:o.note.back.id,go:typeof o.note.back.go,gl:o.note.back.goLabel,text:!!o.note.back.text};o.note.ord=o.note.ord&&{id:o.note.ord.id,go:typeof o.note.ord.go,gl:o.note.ord.goLabel}}
   finally{window.kitNotice=kn0;kitLine=klW;S.ordQ=[]}}
  o.errs=PT.stat.errs.slice();return o});
 if(r3)console.log(JSON.stringify(r3));
 const R3=r3?r3.rows.filter(x=>!x.none):[];
 ok(!r3||(R3.length>=3&&R3.every(x=>x.used===x.N&&x.shown===x.N&&(x.at===x.pl||x.at===x.exp)&&x.left===0&&x.logs>0&&x.N-x.H===1)),"11 cnvOrd answer to ANOTHER palace (spy/plant/poison): the order is her pass; used == shown, she is there, the deed ran, the order gone only after",R3);
 ok(!r3||(r3.refused&&r3.refused.used===0&&r3.refused.left===1&&r3.refused.same&&!r3.refused.pass),"11 a refused walk keeps the order (same deadline), nothing paid, no pass left",r3&&r3.refused);
 ok(!r3||(r3.zero.every(z=>z.Hh>=r3.min&&z.F-z.Hh===1)&&(!r3.half0||(r3.half0.used===r3.half0.H&&r3.half0.H>=r3.min&&r3.half0.left===0))),"11 «Giúp qua loa» never 0 khắc (≥ BAL.ptime.taskMin), always one khắc under hết lòng; walk-0 click charged = shown",{z:r3&&r3.zero,h:r3&&r3.half0});
 ok(!r3||!r3.errs.length,"11 no jptime errors",r3&&r3.errs);
 ok(!r3||(r3.note&&r3.note.go&&r3.note.back&&r3.note.back.go==="function"&&r3.note.back.gl&&r3.note.back.text&&r3.note.ord&&r3.note.ord.go==="function"&&r3.note.ord.gl==="Nghe lệnh"&&r3.note.kl===0),"12 ONE NOTICE SYSTEM: send / landing «đã về: có tin báo» / order notices go through kitNotice({id,line,text,go,goLabel}), no kitLine",r3&&r3.note);
 ok(!errs.length,"8 no page errors",errs.slice(0,3));
 await b.close();const f=res.filter(x=>!x).length;console.log(f?`${f} FAIL`:'ALL OK');process.exit(f?1:0)})().catch(e=>{/* a crash inside the page is a clean FAIL line (reviewer note) */console.log("FAIL crash: "+(e&&e.message||e).toString().slice(0,300));process.exit(1)});
