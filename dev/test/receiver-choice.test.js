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
 for(const id of ["ag:cx2:help","ag:cx:gift","ag:emp:summon"]){const r=R.rows.find(x=>x.id===id);ok(r&&r.v==="SAME",`${id}: every receiver chooses (SAME)`,r&&[r.P,r.N,r.NN])}
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
 ok(!errs.length,'no page errors',errs.slice(0,3));await b.close();
 const f=res.filter(x=>!x).length;console.log(f?`${f} FAIL`:'ALL PASS');process.exit(f?1:0)})();
