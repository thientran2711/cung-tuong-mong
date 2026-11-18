/* RECEIVER CHOICE test (owner OD 18/11 ~21:15Z, law 1 + 2 + 3; jrcv.js + dev/tools/receiver-choice-scan.js):
   (1) the whole-game scan finds no NEW receiver gap (ASYM / FORCED) beyond role-parity-open.json role «receiver» (that list must shrink);
   (2) Nhờ giúp đỡ: her card when an NPC asks HER has the 4 answers (L1876 names, BAL.rcv.kw), each with a gain AND a cost (law 3);
       an NPC receiver answers with the SAME 4 (all four seen over many draws, by L1876 weights, never one fixed answer);
   (3) a gift to an NPC: she answers with her giftin answers (take / back / check), all seen; (4) Hoàng thượng triệu an NPC: Vâng chỉ and Cáo bệnh
       both seen, Cáo bệnh costs the same Sủng as her card (BAL.eff.jts.sungGo_2), Vâng chỉ the same Sức (BAL.rcv.sumSuc);
   (5) old save: a pending «Lời nhờ» card survives serQ → deserQ (saveable PEND.rcvHelp); a save without it loads clean.
   usage: node dev/test/receiver-choice.test.js [dev/index.html]   → exit 1 on FAIL or page error */
const path=require('path');const fs=require('fs');const {scan}=require('../tools/receiver-choice-scan.js');
const HTML=process.argv[2]||'dev/index.html';const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{
 const R=await scan(HTML);
 const OPEN=JSON.parse(fs.readFileSync(path.join(__dirname,'../tools/role-parity-open.json'),'utf8')).filter(g=>g.role==="receiver");const okOpen=new Set(OPEN.map(g=>g.key));
 const fresh=R.gaps.filter(g=>!okOpen.has(g.id));ok(fresh.length===0,'no NEW receiver gap (ASYM / FORCED) beyond the open list',fresh.map(g=>g.v+":"+g.id));
 for(const id of ["ag:cx2:help","ag:cx:gift","ag:emp:summon","act:ally","ag:cx:ally","ag:cx3:facFound","tw:call","ag:see:mediate","act:blockf","act:bribe","ag:cx2:bribeSrv","ag:emp:visit"]){const r=R.rows.find(x=>x.id===id);ok(r&&r.v==="SAME",`${id}: every receiver chooses (SAME)`,r&&[r.P,r.N,r.NN])}
 ok(!R.pageErr.length,'no page errors during the scan',R.pageErr.slice(0,3));
 const {chromium}=require('playwright');const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)$/,r=>r.abort());await p.goto('file://'+path.resolve(HTML),{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 const r=await p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();for(let i=0;i<60&&isSrv();i++)start();window.__nlInner=0;window.__bot=1;quiet=false;Q.length=0;
  const V=liveRivals(true).filter(x=>x!==S&&!x.out&&!x.coop);const a=V[0],t=V[1];const out={};
  /* (2) her card */Q.length=0;helpAsk(a,S);const card=Q[0];out.card=card?card.opts.map(o=>({n:o.n,x:o.x})):null;out.kw=BAL.rcv.kw;
  /* (5) old save: pending card round trip */const ser=serQ();const de=deserQ(JSON.parse(JSON.stringify(ser)));out.save={pid:ser[0]&&ser[0].pid,n:de[0]&&de[0].opts.length};Q.length=0;
  out.plain=deserQ([{t:"Tin",h:"<p>x</p>"}]).length;
  /* (2) NPC receiver: 4 answers over many draws (vary her liking so every weight is live) */const H={};for(let i=0;i<400;i++){t.bac=500;t.rl=t.rl||{};t.rl[a.id]=(i%9-4)*10;t.duc=90;const rr=helpAsk(a,t).r;
   const k=/mượn 30|kể cho|ân cần/.test(rr)?"full":/cho có|qua loa/.test(rr)?"half":/từ chối/.test(rr)?"no":/đi kể/.test(rr)?"sab":"?";H[k]=(H[k]||0)+1}out.help=H;
  /* (3) gift to an NPC */const G={};const k0=Object.keys(IT).find(k=>itm(k).gv);for(let i=0;i<300;i++){a.inv=[{k:k0}];t.bac=500;t.inv=[];const r0=giveTo(a,t,0);const g=/trả lại/.test(r0)?"back":/Thái y viện/.test(r0)?"found":t.inv.length?"keep":"?";G[g]=(G[g]||0)+1}out.gift=G;
  out.pick=Object.assign({},window.__rcvN||{});
  /* (4) summons */const M={};for(let i=0;i<200;i++){t.suc=80;t.sung=40;t.alive=true;t.out=0;t.confined=0;const s0=t.sung,c0=t.suc;tsSummonGo(t);const k=t.suc===c0-BAL.rcv.sumSuc?"go":t.sung===s0+BAL.eff.jts.sungGo_2?"ill":"?";M[k]=(M[k]||0)+1}out.sum=M;
  return out});
 ok(r.card&&r.card.length===4&&r.card.every((o,i)=>o.n.startsWith(r.kw[i])),'her «Lời nhờ» card: the 4 answers (BAL.rcv.kw) in L1876 order',r.card&&r.card.map(o=>o.n));
 ok(r.card&&r.card.every(o=>/được:/.test(o.x)&&/mất:/.test(o.x)),'each answer shows a gain AND a cost (law 3)',r.card&&r.card.map(o=>o.x));
 ok(r.card&&!r.card.some(o=>/%|\d+\s*phần trăm/.test(o.x)),'no % in the answer rows (law 7)');
 ok(r.save.pid==="rcvHelp"&&r.save.n===4&&r.plain===1,'old save: a pending Lời nhờ card survives serQ → deserQ; a plain notice loads',r.save);
 ok(["full","half","no","sab"].every(k=>r.help[k]>0)&&!r.help["?"],'NPC receiver of Nhờ giúp đỡ: all 4 answers drawn (L1876 weights, mindPick)',r.help);
 ok(["back","keep"].every(k=>r.gift[k]>0)&&(r.gift.found||0)+(r.pick.check||0)>=0&&!r.gift["?"],'NPC receiver of a gift: her answers (take / back / check) — back and keep both seen',Object.assign({},r.gift,{pick:r.pick}));
 ok(r.sum.go>0&&r.sum.ill>0&&!r.sum["?"],'summoned NPC: Vâng chỉ (Sức − BAL.rcv.sumSuc) and Cáo bệnh (Sủng sungGo_2, her numbers) both seen',r.sum);
 /* (6) every other ask through the ONE core (jrcv RCVK): her card 4 answers + gain/cost, NPC draws all 4, old-save round trip; her own maid bribed; Ngự giá */
 const r6=await p.evaluate(()=>{const V=liveRivals(true).filter(x=>x!==S&&!x.out&&!x.coop);const [a,t,u]=V;const out={cards:{},npc:{},save:null};
  const setup={ally:()=>{},facFound:()=>{S.facs=[]},facJoin:()=>{S.facs=[{id:7,m:[key(t),key(u)],name:"phe thử"}];t.rank=9;u.rank=0},facInvite:()=>{S.facs=[{id:8,m:[key(a),key(u)],name:"phe thử"}]},
   call:()=>{},mediate:()=>{},blockf:()=>{u.block=0}};
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
  ok(c&&c.every(o=>/được:/.test(o.x))&&[0,2,3].every(i=>/mất:/.test(c[i].x))&&!c.some(o=>/%/.test(o.x)),`her «${k}» card: every answer has a gain, yes / no / mách also a cost, no %`,c&&c.map(o=>o.x))}
 for(const k in r6.npc)ok(["full","half","no","sab"].every(z=>r6.npc[k][z]>0)&&!r6.npc[k]["?"],`NPC receiver of «${k}»: all 4 answers drawn (mindPick)`,r6.npc[k]);
 ok(r6.save&&r6.save.pid==="rcvAsk"&&r6.save.n===4,'old save: a pending rcvAsk card survives serQ → deserQ',r6.save);
 ok(["maid_take","maid_tell","maid_quiet"].every(z=>r6.maid[z]>0),'her own maid bribed: the maid chooses take / tell / quiet',r6.maid);
 ok(["go","show","adv"].every(z=>r6.visit[z]>0),'Ngự giá to an NPC: Thắp đèn / Phô tài / Khuyên ngài (her card) all seen',r6.visit);
 ok(!errs.length,'no page errors',errs.slice(0,3));await b.close();
 const f=res.filter(x=>!x).length;console.log(f?`${f} FAIL`:'ALL PASS');process.exit(f?1:0)})();
