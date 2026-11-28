/* RECEIVER CHOICE test (owner OD 18/11 ~21:15Z, law 1 + 2 + 3; jrcv.js + dev/tools/receiver-choice-scan.js):
   (1) the whole-game scan finds no NEW receiver gap (ASYM / FORCED) beyond role-parity-open.json role «receiver» (that list must shrink);
   (2) Nhờ giúp đỡ: her card when an NPC asks HER has the 4 answers (L1876 names, BAL.road.hp.kw), each with a gain AND a cost (law 3);
       an NPC receiver answers with the SAME 4 (all four seen over many draws, by L1876 weights, never one fixed answer);
   (3) a gift to an NPC: she answers with her giftin answers (take / back / check), all seen; (4) Hoàng thượng triệu an NPC: Vâng chỉ and Cáo bệnh
       both seen, Cáo bệnh costs the same Sủng as her card (BAL.eff.jts.sungGo_2), Vâng chỉ the same Sức (BAL.rcv.sumSuc);
   (5) old save: a pending «Lời nhờ» card survives serQ → deserQ (saveable PEND.rcvHelp); a save without it loads clean.
   (7) round 3 (review FAIL 6): every slot-1 «qua loa» answer has a real cost (Sức / bạc) AND the seen-through risk (BAL.road.hp.half) on every card;
       judge requests (xinhh / trinhhh): she as the Hoàng hậu gets the card, an NPC queen gives both answers; Mời đến cung ta (invite) 4 answers both
       ways; bribel's target maid picks through the ONE stf2BribeW rule with the cnvBribeOpts numbers; one core: no BAL.rcv.kw copy.
   usage: node dev/test/receiver-choice.test.js [dev/index.html]   → exit 1 on FAIL or page error */
const path=require('path');const fs=require('fs');const {scan}=require('../tools/receiver-choice-scan.js');
const HTML=process.argv[2]||'dev/index.html';const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{
 const R=await scan(HTML);
 const OPEN=JSON.parse(fs.readFileSync(path.join(__dirname,'../tools/role-parity-open.json'),'utf8')).filter(g=>g.role==="receiver");const okOpen=new Set(OPEN.map(g=>g.key));
 const fresh=R.gaps.filter(g=>!okOpen.has(g.id));ok(fresh.length===0,'no NEW receiver gap (ASYM / FORCED) beyond the open list',fresh.map(g=>g.v+":"+g.id));
 for(const id of ["ag:cx2:help","ag:cx:gift","ag:emp:summon","act:ally","ag:cx:ally","ag:cx3:facFound","tw:call","ag:see:mediate","act:blockf","act:bribe","ag:cx2:bribeSrv","ag:emp:visit","act:bribel","ag:cx3:invite2","act:xinhh","act:trinhhh","srv:bribel","srv:laydol","srv:laydo","srv:poison"]){const r=R.rows.find(x=>x.id===id);ok(r&&r.v==="SAME",`${id}: every receiver chooses (SAME)`,r&&[r.P,r.N,r.NN])}
 ok(!R.pageErr.length,'no page errors during the scan',R.pageErr.slice(0,3));
 ok(R.nkeys>200&&R.unclassed.length===0,'every key of the live act tables (TW / ACT / AGRUN) is classified (no hand list sends an unlisted act to DONE)',{n:R.nkeys,un:R.unclassed});
 const {chromium}=require('playwright');const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)$/,r=>r.abort());/* stat-pace (review/stat-pace): this test checks its own feature's exact BAL numbers and forces its own cards; the stat-pace rule (BAL.stp) and the daily big-event cap (BAL.evc) are switched off here — they have their own test dev/test/stat-pace.js */await p.addInitScript(()=>addEventListener('DOMContentLoaded',()=>{try{BAL.stp.on=0;BAL.evc.on=0}catch(e){}}));await p.goto('file://'+path.resolve(HTML),{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 const r=await p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();for(let i=0;i<60&&isSrv();i++)start();window.__nlInner=0;window.__bot=1;quiet=false;Q.length=0;
  /* the card checks read the queued dialog: the real kit notice (review/stage-here, live) is set aside here and checked on its own in (8) */window.__KN=window.kitNotice;window.__KND=window.kitNoticeDrop;window.kitNotice=undefined;/* and on the instant path (parallel time only delays the same card: checked in (8b)) */window.__PT=BAL.ptime?BAL.ptime.on:0;if(BAL.ptime)BAL.ptime.on=0;
  const V=liveRivals(true).filter(x=>x!==S&&!x.out&&!x.coop);const a=V[0],t=V[1];const out={};
  /* (2) her card */Q.length=0;helpAsk(a,S);const card=Q[0];out.card=card?card.opts.map(o=>({n:o.n,x:o.x})):null;out.kw=[BAL.road.hp.kw.full,BAL.road.hp.kw.half,BAL.road.hp.kw.no,BAL.road.hp.kw.lk];out.kwCopy=BAL.rcv.kw!==undefined;
  /* (5) old save: pending card round trip */const ser=serQ();const de=deserQ(JSON.parse(JSON.stringify(ser)));out.save={pid:ser[0]&&ser[0].pid,n:de[0]&&de[0].opts.length};Q.length=0;
  out.plain=deserQ([{t:"Tin",h:"<p>x</p>"}]).length;
  /* (2) NPC receiver: 4 answers over many draws (vary her liking so every weight is live) */const H={};for(let i=0;i<400;i++){t.bac=500;t.rl=t.rl||{};t.rl[a.id]=(i%9-4)*10;t.duc=90;const rr=helpAsk(a,t).r;
   const k=/mượn 30|kể cho|ân cần/.test(rr)?"full":/cho có|qua loa/.test(rr)?"half":/từ chối/.test(rr)?"no":/đi kể/.test(rr)?"sab":"?";H[k]=(H[k]||0)+1}out.help=H;
  /* (3) gift to an NPC */const G={};const k0=Object.keys(IT).find(k=>itm(k).gv);/* review/oan-pace-2: 300 tries in ONE day — the per-day pace (BAL.oanPace.day / ghet.day, checked by dev/test/oan-pace.js) would freeze the scores that make an answer possible; switched off for this answer-variety scan only */const OPg=BAL.oanPace&&BAL.oanPace.on;if(OPg)BAL.oanPace.on=0;try{for(let i=0;i<300;i++){a.inv=[{k:k0}];t.bac=500;t.inv=[];const r0=giveTo(a,t,0);const g=/trả lại/.test(r0)?"back":/Thái y viện/.test(r0)?"found":t.inv.length?"keep":"?";G[g]=(G[g]||0)+1}}finally{if(OPg)BAL.oanPace.on=OPg}out.gift=G;
  out.pick=Object.assign({},window.__rcvN||{});
  /* (4) summons */const M={};for(let i=0;i<200;i++){t.suc=80;t.sung=40;t.alive=true;t.out=0;t.confined=0;const s0=t.sung,c0=t.suc;tsSummonGo(t);const k=t.suc===c0-BAL.rcv.sumSuc?"go":t.sung===s0+BAL.eff.jts.sungGo_2?"ill":"?";M[k]=(M[k]||0)+1}out.sum=M;
  return out});
 ok(r.card&&r.card.length===4&&r.card.every((o,i)=>o.n.startsWith(r.kw[i])),'her «Lời nhờ» card: the 4 answers (BAL.road.hp.kw) in L1876 order',r.card&&r.card.map(o=>o.n));
 ok(r.card&&r.card.every(o=>/được:/.test(o.x)&&/mất:/.test(o.x)),'each answer shows a gain AND a cost (law 3)',r.card&&r.card.map(o=>o.x));
 ok(r.card&&!r.card.some(o=>/%|\d+\s*phần trăm/.test(o.x)),'no % in the answer rows (law 7)');
 ok(r.save.pid==="rcvHelp"&&r.save.n===4&&r.plain===1,'old save: a pending Lời nhờ card survives serQ → deserQ; a plain notice loads',r.save);
 ok(["full","half","no","sab"].every(k=>r.help[k]>0)&&!r.help["?"],'NPC receiver of Nhờ giúp đỡ: all 4 answers drawn (L1876 weights, mindPick)',r.help);
 ok(["back","keep"].every(k=>r.gift[k]>0)&&(r.gift.found||0)+(r.pick.check||0)>=0&&!r.gift["?"],'NPC receiver of a gift: her answers (take / back / check) — back and keep both seen',Object.assign({},r.gift,{pick:r.pick}));
 ok(r.sum.go>0&&r.sum.ill>0&&!r.sum["?"],'summoned NPC: Vâng chỉ (Sức − BAL.rcv.sumSuc) and Cáo bệnh (Sủng sungGo_2, her numbers) both seen',r.sum);
 /* (6) every other ask through the ONE core (jrcv RCVK): her card 4 answers + gain/cost, NPC draws all 4, old-save round trip; her own maid bribed; Ngự giá */
 const r6=await p.evaluate(()=>{const V=liveRivals(true).filter(x=>x!==S&&!x.out&&!x.coop);const [a,t,u]=V;const out={cards:{},npc:{},save:null};
  const setup={ally:()=>{},facFound:()=>{S.facs=[]},facJoin:()=>{S.facs=[{id:7,m:[key(t),key(u)],name:"phe thử"}];t.rank=9;u.rank=0},facInvite:()=>{S.facs=[{id:8,m:[key(a),key(u)],name:"phe thử"}]},
   call:()=>{},mediate:()=>{},blockf:()=>{u.block=0},invite:()=>{}};
  const X={facJoin:7,mediate:key(u),blockf:key(u)};
  for(const k in setup){setup[k]();Q.length=0;const x=X[k]||null;
   if(k!=="facJoin"){rcvAsk(k,a,S,x);const c=Q[0];out.cards[k]=c?c.opts.map(o=>({n:o.n,x:o.x})):null;if(c&&k==="mediate"){const ser=serQ();const de=deserQ(JSON.parse(JSON.stringify(ser)));out.save={pid:ser[0]&&ser[0].pid,n:de[0]&&de[0].opts.length}}}
   Q.length=0;const H={};for(let i=0;i<300;i++){setup[k]();S.facs=k==="facFound"?[]:S.facs;t.rl=t.rl||{};t.rl[a.id]=(i%9-4)*10;t.suc=80;t.bac=500;t.duc=90;a.bac=500;
    const asker=k==="facJoin"?a:a,recv=k==="facJoin"?t:t;if(k==="facJoin"&&facOf(a))S.facs.forEach(f=>f.m=f.m.filter(m=>m!==key(a)));
    window.__rcvN={};rcvAsk(k,asker,recv,k==="facInvite"?null:x);const id=Object.keys(window.__rcvN)[0]||"?";H[id]=(H[id]||0)+1}out.npc[k]=H}
  Q.length=0;S.facs=[];
  /* her own maid, bribed by an NPC: the maid chooses (take / tell / quiet) */const MB={};for(let i=0;i<300;i++){a.bac=500;S.maid.loyal=(i%5)*25;window.__rcvN={};try{ACT.bribe.f(a,S)}catch(e){}const id=Object.keys(window.__rcvN).find(z=>/^maid_/.test(z))||"?";MB[id]=(MB[id]||0)+1}out.maid=MB;
  /* Ngự giá to an NPC: her card's roads */const VG={};for(let i=0;i<300;i++){t.suc=80;VG[rcvVisit(t)]=(VG[rcvVisit(t)]||0)+0;const c=rcvVisit(t);VG[c]=(VG[c]||0)+1}out.visit=VG;
  Q.length=0;return out});
 for(const k in r6.cards){const c=r6.cards[k];ok(c&&c.length===4&&c[2].n==="Từ chối"&&/^(Mách lẻo|Tiếp rồi)/.test(c[3].n),`her «${k}» card: 4 answers, slot 3 «Từ chối» (the deadline answer), slot 4 mách`,c&&c.map(o=>o.n));
  ok(c&&c.every(o=>/được:/.test(o.x))&&[0,1,2,3].every(i=>/mất:/.test(c[i].x))&&!c.some(o=>/%/.test(o.x)),`her «${k}» card: every answer has a gain AND a cost, no %`,c&&c.map(o=>o.x));
  ok(c&&/Sức -\d/.test(c[1].x)&&/bị nhìn thấu \(khả năng/.test(c[1].x),`her «${k}» card: slot 1 «qua loa» = Sức cost + the seen-through risk in words (law 2 + 3)`,c&&c[1].x)}
 for(const k in r6.npc)ok(["full","half","no","sab"].every(z=>r6.npc[k][z]>0)&&!r6.npc[k]["?"],`NPC receiver of «${k}»: all 4 answers drawn (mindPick)`,r6.npc[k]);
 ok(r6.save&&r6.save.pid==="rcvAsk"&&r6.save.n===4,'old save: a pending rcvAsk card survives serQ → deserQ',r6.save);
 ok(["maid_take","maid_tell","maid_quiet"].every(z=>r6.maid[z]>0),'her own maid bribed: the maid chooses take / tell / quiet',r6.maid);
 ok(["go","show","adv"].every(z=>r6.visit[z]>0),'Ngự giá to an NPC: Thắp đèn / Phô tài / Khuyên ngài (her card) all seen',r6.visit);
 /* (7) round 3 */
 const r7=await p.evaluate(()=>{const V=liveRivals(true).filter(x=>x!==S&&!x.out&&!x.coop);const [a,t,u]=V;const out={};Q.length=0;
  /* the qua loa answer really costs: an NPC that answers «qua loa» to Kết giao loses Sức; the seen-through roll fires sometimes */
  let seen=0,half=0,sucOk=0;for(let i=0;i<400;i++){t.suc=80;t.bac=500;a.bac=500;t.rl=t.rl||{};t.rl[a.id]=(i%9-4)*10;window.__rcvN={};const s0=t.suc;rcvAsk("ally",a,t);const N=window.__rcvN;if(N.half){half++;if(t.suc===s0-Math.round(BAL.rcv.prop.suc*BAL.rcv.help.half))sucOk++;if(N.seen)seen++}}
  out.half={half,sucOk,seen};
  /* judge: she as the Hoàng hậu */const rk0=S.rank;S.rank=7;affAdd(S,a,300);for(const x of [a,t])Object.assign(x,{bac:5000,alive:true,out:0});if(rkOf(u)<1)u.rank=2;evA(a,u,6);
  Q.length=0;ACT.trinhhh.f(a,u);ACT.xinhh.f(a,u);out.judge=Q.map(m=>({t:m.title||m.t,o:(m.opts||[]).map(o=>o.n+" | "+o.x)}));
  const ser=serQ();out.jsave=deserQ(JSON.parse(JSON.stringify(ser))).map(m=>(m.opts||[]).length);Q.length=0;S.rank=rk0;
  /* an NPC queen: both answers drawn */const q=queenP();const J={};if(q&&q!==S){const aa=V.find(z=>z!==q);for(let i=0;i<200;i++){const x=V.find(z=>z!==q&&z!==aa&&rkOf(z)>=1)||u;affAdd(q,aa,(i%5-2)*30);evA(aa,x,4);x.rank=Math.max(1,rkOf(x));window.__rcvN={};try{ACT.trinhhh.f(aa,x)}catch(e){}const id=Object.keys(window.__rcvN).find(z=>/^judge_/.test(z))||"?";J[id]=(J[id]||0)+1;x.rank=3}}out.npcJudge=J;
  /* invite: her card at landing (NPC host), an NPC guest's 4 answers */Q.length=0;S.invQ=[{h:a.id,g:"me"}];p3InvLand();out.inv=Q.map(m=>(m.opts||[]).map(o=>o.n));Q.length=0;
  /* bribel: the target maid picks (ONE rule stf2BribeW, cnvBribeOpts numbers) */const BL={};for(let i=0;i<300;i++){a.maid=a.maid||{name:"x",loyal:90};a.maid.loyal=90;a.maid.spyFor=null;t.maid.loyal=(i%5)*25;t.maid.spyFor=null;window.__rcvN={};try{ACT.bribel.f(a,t)}catch(e){}const id=Object.keys(window.__rcvN).find(z=>/^maid_/.test(z))||"?";BL[id]=(BL[id]||0)+1}out.bribel=BL;
  /* her own maid takes / tells with her card's numbers */const ml0=S.maid.loyal;const ev0=evG(S,a);let tk=null,tl=null;for(let i=0;i<200&&!(tk&&tl);i++){a.bac=500;S.maid.loyal=50;S.maid.spyFor=null;window.__rcvN={};evA(S,a,BAL.evWipe);const e0=evG(S,a);const b0=S.maid.bac||0;try{ACT.bribe.f(a,S)}catch(e){}
   if(window.__rcvN.maid_take&&!tk)tk={spy:S.maid.spyFor===key(a),pay:(S.maid.bac||0)-b0};if(window.__rcvN.maid_tell&&!tl)tl={ev:evG(S,a)-e0,tin:S.maid.loyal-50}}out.own={tk,tl,one:BAL.ag.ev.one,tin:BAL.coopBribe.tin,price:econSchemePrice("bribe",a,S)||BAL.actBac.bribe};S.maid.loyal=ml0;S.maid.spyFor=null;
  /* Xin son phấn (cx4:rougeBeg): she as the Hoàng hậu gets the card; Mượn son phấn (cx4:rougeBorrow): the NPC lender answers through rcvOddsPick */
  {const rk1=S.rank;S.rank=7;Q.length=0;const g=V.find(z=>!z.queen)||a;g.inv=[];g.lxBeg={};let r0="";try{r0=AGRUN["cx4:rougeBeg"](g,null,{k:"cx4:rougeBeg",vid:g.id,id:"v"+g.id,key:"rc"})}catch(e){r0="ERR "+e.message}
   out.beg={q:Q.map(m=>(m.opts||[]).map(o=>o.n+" | "+o.x)),r:String(r0).slice(0,80),miss:lxMiss(g).length};Q.length=0;S.rank=rk1;
   /* Mượn son phấn: deterministic (review FAIL 6 #1: the AG deed picked its own lender) — the asker's card run() on a SEEDED lender, every draw */
   const BR={};const ln=V.find(z=>z!==a&&!z.coop);for(let i=0;i<300;i++){a.inv=(a.inv||[]).filter(e=>!lxOf(e.k));const M=lxMiss(a);if(!M.length||!ln){BR["?"]=(BR["?"]||0)+1;continue}
    ln.inv=(ln.inv||[]).filter(e=>!lxOf(e.k));ln.inv.push({k:lxKey(M[0],3),d:S.turn,u:BAL.ration.borrow.spare*2});try{lxFix(ln)}catch(e){}ln.rl=ln.rl||{};ln.rl[a.id]=(i%9-4)*10;ln.suc=80;ln.duc=90;
    window.__rcvN={};lxBorrowCard(a,ln).run();const id=["full","half","no","sab"].find(z=>window.__rcvN[z])||"?";BR[id]=(BR[id]||0)+1}out.borrow=BR}
  out.oneCore={kw:BAL.rcv.kw===undefined,w:/stf2BribeW/.test(rcvMaidBribe.toString())&&/stf2BribeW/.test(stf2Bribe.toString())&&/stf2Tr/.test(stf2BribeW.toString())};
  Q.length=0;return out});
 ok(r7.half.half>0&&r7.half.sucOk===r7.half.half&&r7.half.seen>0&&r7.half.seen<r7.half.half,'NPC «qua loa» (Kết giao): Sức − prop.suc × half every time, seen-through sometimes (BAL.road.hp.half)',r7.half);
 ok(r7.judge.length===2&&r7.judge.every(m=>m.o.length===2&&m.o.every(x=>/được:/.test(x))),'she as the Hoàng hậu: «Trình Hoàng hậu» and «Xin Hoàng hậu giáng» give HER the card (2 answers, each with a gain)',r7.judge);
 ok(r7.jsave.length===2&&r7.jsave.every(n=>n===2),'old save: pending judge cards survive serQ → deserQ',r7.jsave);
 ok(Object.keys(r7.npcJudge).some(z=>/_yes$/.test(z))&&Object.keys(r7.npcJudge).some(z=>/_no$/.test(z))&&!r7.npcJudge["?"],'an NPC queen judges with the SAME two answers (both drawn)',r7.npcJudge);
 ok(r7.inv.length===1&&r7.inv[0].length===4&&r7.inv[0][2]==="Từ chối",'Mời đến cung ta: an NPC host\'s invitation lands as HER 4-answer card',r7.inv);
 ok(["maid_take","maid_tell","maid_quiet"].every(z=>r7.bribel[z]>0),'Sai cung nữ thân tín lấy lòng: the target maid picks take / tell / quiet (same pick as Mua chuộc)',r7.bribel);
 ok(r7.own.tk&&r7.own.tk.spy&&r7.own.tk.pay===r7.own.price&&r7.own.tl&&r7.own.tl.ev===r7.own.one&&r7.own.tl.tin===r7.own.tin,'her own maid bribed: take / tell apply the maid card\'s numbers (pay, tai mắt · ev.one, Chủ tin + coopBribe.tin)',r7.own);
 ok(r7.beg.q.length===1&&r7.beg.q[0].length===2,'Xin son phấn (cx4 rougeBeg): she as the Hoàng hậu gets the card (2 answers)',r7.beg);
 ok(["full","half","no","sab"].every(z=>r7.borrow[z]>0)&&!r7.borrow["?"],'Mượn son phấn: the NPC lender (seeded, deterministic) answers with the 4 answers of her lender card (rcvPick)',r7.borrow);
 ok(r7.oneCore.kw&&r7.oneCore.w,'one core: no BAL.rcv.kw copy; rcvMaidBribe and stf2Bribe share stf2BribeW (with stf2Tr)',r7.oneCore);
 /* (8) round 4 (review RE-CHECK #2 FAIL 6): illMaid ordered maid · illAlly holder · her lender card · Kết giao law 2 · ONE NOTICE SYSTEM · scan UNREACHED */
 const r8=await p.evaluate(()=>{const V=liveRivals(true).filter(x=>x!==S&&!x.out&&!x.coop);const [a,t,u]=V;const out={};Q.length=0;const ik=Object.keys(WILL)[0];
  const strip=x=>{x.inv=(x.inv||[]).filter(e=>!WILL[e.k])};
  /* her card: a queued dialog, or (kitNotice live, review/stage-here on main) the ONE notice — open the newest pending one (rcvOpen) */
  const card0=()=>{if(Q[0])return Q[0];const it=(S.rcvPend||[]).slice(-1)[0];if(it){rcvOpen(it.id)}return Q[0]};
  /* illMaid: the trusted maid answers obey / refuse / tell (stf2Ord) — her maid and an NPC's */
  const O0=window.stf2Ord;const OM={me:{},npc:{}};window.stf2Ord=function(A,sv){const r=O0.apply(this,arguments);const w=A===S?OM.me:OM.npc;if(sv===A.maid)w[r||"null"]=(w[r||"null"]||0)+1;return r};
  for(let i=0;i<240;i++){const A=i%2?S:a;A.bac=5000;if(A.maid){A.maid.loyal=40+(i%6)*12;A.maid.spyFor=null}try{illBuy(A,"maid",ik)}catch(e){}A.illP=[]}window.stf2Ord=O0;out.maid=OM;
  /* illAlly: she as the holder gets the 4-answer card; an NPC holder draws all 4; she is in illAllies now */
  for(const x of [S].concat(V))strip(x);S.inv.push({k:ik});affAdd(S,a,300);out.allies=illAllies(a).includes(S);Q.length=0;illBuy(a,"ally",ik);const c=card0();out.illCard=c?c.opts.map(o=>({n:o.n,x:o.x})):null;
  {const ser=serQ();out.illSave=deserQ(JSON.parse(JSON.stringify(ser))).map(m=>(m.opts||[]).length)}Q.length=0;strip(S);
  const IA={};for(let i=0;i<300;i++){strip(t);t.inv.push({k:ik});t.rl=t.rl||{};t.rl[a.id]=(i%9-4)*10;t.suc=80;t.bac=500;a.bac=500;window.__rcvN={};illBuy(a,"ally",ik,t);const id=["full","half","no","sab"].find(z=>window.__rcvN[z])||"?";IA[id]=(IA[id]||0)+1}out.illNpc=IA;strip(t);strip(a);
  /* her lender card (was a private 2-answer Q.push): 4 answers, saveable */
  a.inv=(a.inv||[]).filter(e=>!lxOf(e.k));const M=lxMiss(a);S.inv=S.inv.filter(e=>!lxOf(e.k));if(M.length){S.inv.push({k:lxKey(M[0],3),d:S.turn,u:BAL.ration.borrow.spare*2});lxFix(S)}
  Q.length=0;lxBorrowCard(a,S).run();const lc=card0();out.lend=lc?lc.opts.map(o=>({n:o.n,x:o.x})):null;{const ser=serQ();out.lendSave=deserQ(JSON.parse(JSON.stringify(ser))).map(m=>(m.opts||[]).length)}Q.length=0;
  /* Kết giao law 2: the yes carries «kết bè» Danh − ally.danh and the asker's foe's dislike (− f_2); the no Danh + ally.danh and the foe's + f_2 × half — her card and an NPC */
  Q.length=0;/* review/oan-pace: this block checks law 2 (the same numbers for her card and an NPC, 300 tries in one buổi); how fast the scores move (BAL.oanPace) is checked by dev/test/oan-pace.js */const OP0=BAL.oanPace&&BAL.oanPace.on;if(OP0)BAL.oanPace.on=0;oanAdd(u,a,80);rcvAsk("ally",a,S);const ac=card0();out.ally=ac?ac.opts.map(o=>o.x):null;out.allyFx=ac?ac.opts.map(o=>o.fx&&o.fx.danh||0):null;Q.length=0;
  {const fo=rcvFoe(a,t);out.foe=!!fo;const F=BAL.eff.j8.f_2,H=BAL.rcv.help.half,A2=BAL.rcv.ally;const D={};/* review/oan-pace-2 (RV-163B F3): the foe's liking GAIN goes through affAdd — × the foe's own trust nết (j28, can be < 1), × the receiver's joy (jfeel), then stat-pace (BAL.stp band) — so the expected gain is what that same door gives (control), not the raw f_2 × half */let ctl=null;if(fo){t.suc=80;t.bac=500;t.danh=50;affAdd(fo,t,-aff(fo,t));fo.spc={};const c0=aff(fo,t);affAdd(fo,t,Math.round(F*H));ctl=aff(fo,t)-c0;affAdd(fo,t,-aff(fo,t));fo.spc={}}out.allyCtl={ctl,trust:fo?persF(fo,'trust',1):null};for(let i=0;i<300&&!(D.full&&D.no);i++){t.suc=80;t.bac=500;a.bac=500;t.danh=50;t.rl=t.rl||{};t.rl[a.id]=(i%9-4)*10;
    if(fo)affAdd(fo,t,-aff(fo,t));const f0=fo?aff(fo,t):0,d0=t.danh;window.__rcvN={};rcvAsk("ally",a,t);const id=["full","half","no","sab"].find(z=>window.__rcvN[z]);if((id==="full"||id==="no")&&!D[id])D[id]={foe:fo?aff(fo,t)-f0:null,danh:t.danh-d0}}
   out.allyNpc=D;out.allyWant={full:{foe:-F,danh:-A2.danh},no:{foe:ctl!=null?ctl:Math.round(F*H),danh:A2.danh}}}if(OP0)BAL.oanPace.on=OP0;
  /* ONE NOTICE SYSTEM: with window.kitNotice present her card waits as ONE notice (saveable S.rcvPend), its option row opens the card; no queued dialog */
  {const got=[];window.kitNotice=x=>{got.push(x);return x};window.kitNoticeDrop=()=>{};Q.length=0;S.rcvPend=[];rcvAsk("call",a,S);out.nt={n:got.length,q:Q.length,pend:(S.rcvPend||[]).length,go:!!(got[0]&&got[0].go),line:got[0]&&got[0].line};
   if(got[0]&&got[0].go){got[0].go();out.nt.open=Q[0]?Q[0].opts.length:0;out.nt.after=(S.rcvPend||[]).length}delete window.kitNotice;delete window.kitNoticeDrop;Q.length=0;try{document.getElementById('modal').hidden=true}catch(e){}}
  /* the REAL kit notice (jnotice, on main): one «rcv» notice, no dialog, «Trả lời» opens the 4-answer card, S.rcvPend emptied */
  {window.kitNotice=window.__KN;window.kitNoticeDrop=window.__KND;Q.length=0;S.rcvPend=[];const R={has:typeof window.kitNotice==="function"};if(R.has){rcvAsk("call",a,S);const L=kitNoticeList().filter(x=>x.kind==="rcv");R.n=L.length;R.q=Q.length;R.pend=S.rcvPend.length;
    if(L[0]&&L[0].go){L[0].go();R.open=Q[0]?Q[0].opts.length:0;R.after=S.rcvPend.length;R.left=kitNoticeList().filter(x=>x.kind==="rcv").length}}out.real=R;window.kitNotice=undefined;Q.length=0;try{document.getElementById('modal').hidden=true}catch(e){}}
  /* (8b) PARALLEL TIME on (jptime): her card waits ONLY as the parallel-time order notice (S.ordQ; no rcv notice, no dialog), opening it gives the 4 answers;
     unanswered past its deadline (ptOrdTick) = «Từ chối» with its cost (both likings − help.fail) */
  {const R={has:!!(BAL.ptime&&typeof ptOrdAdd==="function")};if(R.has){BAL.ptime.on=1;window.kitNotice=window.__KN;window.kitNoticeDrop=window.__KND;S.ordQ=[];S.rcvPend=[];Q.length=0;
    const n0=kitNoticeList().filter(x=>x.kind==="rcv").length;rcvAsk("call",a,S);R.oq=S.ordQ.length;R.pend=S.rcvPend.length;R.rcvN=kitNoticeList().filter(x=>x.kind==="rcv").length-n0;R.q=Q.length;
    const o=S.ordQ[0];if(o){ptOrdOpen(o);R.open=Q[0]?Q[0].opts.length:0;R.after=S.ordQ.length}Q.length=0;
    S.ordQ=[];rcvAsk("call",a,S);const o2=S.ordQ[0];const d0=S.danh,f0=aff(a,S)+aff(S,a);if(o2){o2.due=-1;ptOrdTick();R.tick={left:S.ordQ.length,q:Q.length,ddanh:S.danh-d0,want:BAL.rcv.prop.danh,daff:aff(a,S)+aff(S,a)-f0}}
    BAL.ptime.on=0;window.kitNotice=undefined;Q.length=0;S.ordQ=[];try{document.getElementById('modal').hidden=true}catch(e){}}out.pt=R}
  return out});
 ok(r8.maid.me.obey>0&&(r8.maid.me.refuse||0)+(r8.maid.me.tell||0)>0&&r8.maid.npc.obey>0&&(r8.maid.npc.refuse||0)+(r8.maid.npc.tell||0)>0,'Sai cung nữ thân tín mua lén ngoài cung: the trusted maid answers obey / refuse / tell (stf2Ord) — her maid and an NPC\'s',r8.maid);
 ok(r8.allies&&r8.illCard&&r8.illCard.length===4&&r8.illCard[2].n==="Từ chối"&&r8.illCard.every(o=>/được:/.test(o.x)&&/mất:/.test(o.x)),'Xin đồng minh: she is a holder (illAllies), an NPC asking HER gets her 4-answer card, every answer gain AND cost',r8.illCard&&r8.illCard.map(o=>o.n));
 ok(r8.illSave.length===1&&r8.illSave[0]===4,'old save: a pending Xin đồng minh card survives serQ → deserQ',r8.illSave);
 ok(["full","half","no","sab"].every(z=>r8.illNpc[z]>0)&&!r8.illNpc["?"],'Xin đồng minh: an NPC holder draws all 4 answers (rcvPick)',r8.illNpc);
 ok(r8.lend&&r8.lend.length===4&&r8.lend[2].n==="Từ chối"&&/Sức -\d/.test(r8.lend[1].x)&&/bị nhìn thấu/.test(r8.lend[1].x)&&r8.lendSave[0]===4,'Mượn son phấn: her lender card = the 4 answers (RCVK, qua loa Sức + risk), saveable',r8.lend&&r8.lend.map(o=>o.n));
 ok(r8.ally&&/kết bè: Danh -\d/.test(r8.ally[0])&&/Danh \+\d/.test(r8.ally[2])&&r8.allyFx[0]<0&&r8.allyFx[2]>0&&(!r8.foe||/kẻ đối đầu/.test(r8.ally[0])),'Kết giao law 2: «nhận lời» costs Danh (kết bè) + the asker\'s foe\'s dislike; «từ chối» gains Danh + the foe\'s regard (her card)',r8.ally);
 ok(r8.allyNpc.full&&r8.allyNpc.no&&r8.allyNpc.full.danh===r8.allyWant.full.danh&&r8.allyNpc.no.danh===r8.allyWant.no.danh&&(r8.allyNpc.full.foe===null||r8.allyNpc.full.foe===r8.allyWant.full.foe&&r8.allyNpc.no.foe>=r8.allyWant.no.foe-1&&r8.allyNpc.no.foe<=2*r8.allyWant.no.foe+1),'Kết giao law 2: an NPC receiver pays / gains the same numbers (BAL.rcv.ally, f_2; a liking GAIN is scaled by the foe\'s own nết / mood, j28 / jfeel — one rule both ways)',{got:r8.allyNpc,want:r8.allyWant,ctl:r8.allyCtl});
 ok(!r8.pt.has||(r8.pt.oq===1&&r8.pt.pend===0&&r8.pt.rcvN===0&&r8.pt.q===0&&r8.pt.open===4&&r8.pt.after===0&&r8.pt.tick&&r8.pt.tick.left===0&&r8.pt.tick.q===0&&r8.pt.tick.ddanh===r8.pt.tick.want&&r8.pt.tick.daff<=0),'PARALLEL TIME on: her card waits only as the order notice (S.ordQ, no double notice), opens with the 4 answers; unanswered past its deadline = «Từ chối» with its cost',r8.pt);
 ok(!r8.real.has||(r8.real.n===1&&r8.real.q===0&&r8.real.pend===1&&r8.real.open===4&&r8.real.after===0&&r8.real.left===0),'ONE NOTICE SYSTEM (the REAL jnotice kitNotice when present): one notice, no dialog, «Trả lời» opens the 4-answer card',r8.real);
 ok(r8.nt.n===1&&r8.nt.q===0&&r8.nt.pend===1&&r8.nt.go&&r8.nt.open===4&&r8.nt.after===0,'ONE NOTICE SYSTEM: with kitNotice her card is ONE notice (no queued dialog), saved in S.rcvPend, its option row opens the 4-answer card',r8.nt);
 {const {build}=require('../tools/receiver-choice-scan.js');const B=build({rows:{"ag:cx2:help":{fam:"ag",k:"cx2:help",P:null,N:null,NN:null,self:true},"ag:cx4:illMaid":{fam:"ag",k:"cx4:illMaid",P:null,N:null,NN:null}},keys:[],err:[]});
  ok(B.gaps.length===2&&B.gaps.every(g=>g.v==="UNREACHED"),'scan: a REQ / ORDER_SRV key the probe never reaches is a gap (UNREACHED), never a silent pass',B.gaps)}
 ok(!r.kwCopy,'no BAL.rcv.kw (the L1876 words live in BAL.road.hp.kw only)');
 ok(!errs.length,'no page errors',errs.slice(0,3));await b.close();
 const f=res.filter(x=>!x).length;console.log(f?`${f} FAIL`:'ALL PASS');process.exit(f?1:0)})();
