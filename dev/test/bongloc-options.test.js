/* review/bongloc-options (M83, owner 21/11 ~04:30Z + ~05:39Z): EVERY monthly «Bổng lộc tháng …» frame carries its action options,
   or says on the frame why there is none. Month 1..12 × state normal / cut / cấm túc / cấm túc+cut / lãnh cung × rank 0 / 3 / 6.
   Also: no visible «Ghi chú» row (the notes sit behind the kit «!» beside the line), the cut answers are on the month frame (no separate
   «Bổng lộc bị cắt xén» card), «Lót tay thái giám Nội vụ phủ» + «…đòi lại phần bị cắt xén» exist, odds in words (no %), and every
   option runs without a page error.   usage: node dev/test/bongloc-options.test.js [dev/index.html] [shotdir] */
const {chromium}=require('playwright');const path=require('path');const fs=require('fs');
const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+path.resolve(URL0);const SHOT=process.argv[3]||'';
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x).slice(0,600):''))};
const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();
 const ctx=await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'});const p=await ctx.newPage();p.setDefaultTimeout(240000);
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await sleep(2500);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<400;i++){try{nlNew()}catch(e){}start();if(!isSrv())break}
  Q.length=0;document.getElementById('modal').hidden=true;render();
  /* deterministic staging (no retries): roll() is capped at BAL.odds.hi, so a cut month pins Math.random low for this ONE stipend call */
  window.__st=cut=>{const mr=Math.random;if(cut)Math.random=()=>0.001;try{return stipend(S)}finally{Math.random=mr}}});await sleep(500);
 const R=await p.evaluate(()=>{const out=[];const B0=JSON.parse(JSON.stringify(BAL.stip));
  for(const rank of [0,3,6])for(const st of ["normal","cut","confined","confined+cut","out"])for(let m=1;m<=12;m++){
   S.rank=rank;S.month=m;S.out=st==="out"?1:0;S.confined=/confined/.test(st)?2:0;S.bac=500;S.cutPay=0;const sp=stipSt(S);delete sp.tip;sp.tips=0;delete sp.fault;
   const W=stipW();if(/cut/.test(st)){S.sung=5;W.greedy=1;delete W.pun;BAL.stip.cap=100;BAL.stip.w.sung=100}else{S.sung=80;W.greedy=0;Object.assign(BAL.stip,JSON.parse(JSON.stringify(B0)))}
   Q.length=0;let line="";try{line=__st(/cut/.test(st))}catch(e){line="ERR "+e.message}
   const c=Q.find(q=>/^Bổng lộc tháng/.test(q.t||"")&&!/Lễ nghĩa$/.test(q.t));const f=Q.find(q=>/Lễ nghĩa$/.test(q.t||""));const sep=Q.some(q=>q.t==="Bổng lộc bị cắt xén");
   const h=c?c.h:"";const said=/không có việc gì để chọn/.test(h);
   const O=(c&&c.opts||[]).map(o=>o.n);
   out.push({rank,st,m,has:!!c,opts:O,follow:f?(f.opts||[]).map(o=>o.n):null,said,sep,ghichu:/>Ghi chú</.test(h),bang:/kgnb/.test(h),pct:/%/.test(h+O.join("")+JSON.stringify((c&&c.opts||[]).map(o=>o.x))),cut:/Bị cắt xén|thiếu |hàng kém/.test(h),line:line.slice(0,80)});
  }
  Object.assign(BAL.stip,B0);S.out=0;S.confined=0;Q.length=0;return out});
 const bad=R.filter(r=>!r.has||(!r.opts.length&&!r.said));ok(R.length===180&&!bad.length,`every month 1..12 × 5 states × 3 ranks: options present or reason said (${R.length} cases)`,bad.slice(0,4));
 ok(!R.some(r=>r.ghichu),"no visible «Ghi chú» row on any month frame",R.filter(r=>r.ghichu).slice(0,2));
 ok(!R.some(r=>r.sep),"no separate «Bổng lộc bị cắt xén» card (answers are on the month frame)");
 ok(!R.some(r=>r.pct),"no % in frame or options");
 const cutR=R.filter(r=>r.cut&&r.st!=="out");ok(cutR.length>=60,"cut months really cut",cutR.length);
 ok(cutR.every(r=>r.opts.includes("Lót tay thái giám Nội vụ phủ")&&r.opts.some(n=>/đòi lại phần bị cắt xén$/i.test(n))),"every cut month: «Lót tay thái giám Nội vụ phủ» + «… đòi lại phần bị cắt xén»",cutR.filter(r=>!r.opts.includes("Lót tay thái giám Nội vụ phủ")).slice(0,2));
 ok(cutR.every(r=>r.bang),"every cut month: the cause sits behind the kit «!» beside the cut line");
 ok(R.filter(r=>r.st==="cut"&&r.cut).every(r=>r.follow&&r.follow.includes("Chu toàn lễ nghĩa")),"cut + duty: the lễ nghĩa choice follows on its own frame");
 ok(R.filter(r=>r.st==="normal").every(r=>r.opts.join()==="Chu toàn lễ nghĩa,Bớt lễ nghĩa"),"normal month (every rank incl. Đáp ứng): Chu toàn / Bớt lễ nghĩa");
 ok(R.filter(r=>r.st==="confined"||r.st==="out").every(r=>r.said),"cấm túc / lãnh cung with nothing cut: the frame says why there is no choice");
 /* every option of a cut month and of a normal month runs */
 const run=await p.evaluate(()=>{const o=[];for(const st of ["cut","normal"]){for(let i=0;i<6;i++){S.rank=3;S.month=4;S.out=0;S.confined=0;S.bac=500;S.cutPay=0;const W=stipW();const sp=stipSt(S);delete sp.tip;sp.tips=0;
   if(st==="cut"){S.sung=5;W.greedy=1;delete W.pun;BAL.stip.cap=100;BAL.stip.w.sung=100}else{S.sung=80;W.greedy=0}
   Q.length=0;__st(st==="cut");const c=Q.find(q=>/^Bổng lộc tháng/.test(q.t||""));const op=(c.opts||[])[i];if(!op)continue;try{if(op.go)op.go();o.push([st,op.n,"ok"])}catch(e){o.push([st,op.n,"ERR "+e.message])}}}
  Q.length=0;return o});
 ok(run.length>=6&&run.every(x=>x[2]==="ok")&&run.some(x=>/^Lót tay/.test(x[1]))&&run.some(x=>/^Chu toàn/.test(x[1])),"every option runs",run);
 /* the maid-less road: she goes herself */
 const selfRun=conf=>p.evaluate(conf=>{const m0=S.maid,sf=m0&&m0.spyFor;if(m0)m0.spyFor="x";const B0=JSON.stringify(BAL.stip);let c=null;
  for(let k=0;k<1;k++){S.rank=2;S.month=6;S.out=0;S.confined=conf?2:0;S.sung=5;S.bac=500;BAL.stip.cap=100;BAL.stip.w.sung=100;(S.staff||[]).forEach(x=>x.loyal=40);const W=stipW();W.greedy=1;delete W.pun;const st=stipSt(S);delete st.tip;st.tips=0;
   Q.length=0;__st(true);c=Q.find(q=>/^Bổng lộc tháng/.test(q.t||"")&&!/Lễ nghĩa$/.test(q.t))}
  Object.assign(BAL.stip,JSON.parse(B0));if(m0)m0.spyFor=sf;S.confined=0;Q.length=0;return c?(c.opts||[]).map(o=>o.n+" | "+(o.lock?"LOCK ":"")+o.x):[]},conf);
 const self=await selfRun(false);const selfC=await selfRun(true);
 ok(selfC.some(s=>/^Đòi lại phần bị cắt xén \| LOCK đang cấm túc/.test(s)),"no cung nữ + cấm túc: «Đòi lại phần bị cắt xén» locked with the reason (law 6: cannot leave her palace)",selfC);
 ok(self.some(s=>/^Đòi lại phần bị cắt xén \| (Liều|Khó|Tùy duyên|Khá chắc|Chắc|Nắm chắc|Nắm chắc)/.test(s)),"no cung nữ: «Đòi lại phần bị cắt xén» with odds in words",self);
 if(SHOT){fs.mkdirSync(SHOT,{recursive:true});
  for(const [W,H,nm] of [[755,1000,"fold"],[1180,820,"ipad"]])for(const st of ["cut","confined"]){
   await p.setViewportSize({width:W,height:H});for(let k=0;k<40;k++){const bt=p.locator('text=Vào cung ngay');if(await bt.count()&&await bt.first().isVisible()){await bt.first().click().catch(()=>{});await sleep(1500)}else break}
   await p.evaluate(st=>{document.querySelectorAll('.kmov,#kroul,.kroul').forEach(e=>e.remove());try{KMQ.length=0;kmBusy=false}catch(e){}
    S.rank=3;S.month=5;S.out=0;S.confined=st==="confined"?2:0;S.bac=300;const W=stipW();if(st==="cut"){S.sung=5;W.greedy=1;delete W.pun;BAL.stip.cap=100;BAL.stip.w.sung=100}else{S.sung=80;W.greedy=0}
    document.getElementById('title').hidden=true;document.querySelectorAll('#klife,.klife').forEach(e=>e.remove());{delete stipSt(S).tip;delete W.pun;(S.staff||[]).forEach(x=>x.loyal=40);Q.length=0;S.bac=300;__st(st==='cut')}Q.splice(1);render();showModal();setTimeout(()=>{document.querySelectorAll('.kmov').forEach(e=>e.remove())},300)},st);
   await sleep(1500);await p.evaluate(()=>{document.querySelectorAll('.kmov,#kroul,.kroul,#klife,.klife').forEach(e=>e.remove())});await sleep(300);
   await p.screenshot({path:`${SHOT}/bongloc-${st}-${nm}.png`})}}
 ok(!errs.length,"no page errors",errs.slice(0,3));
 await b.close();const n=res.filter(x=>!x).length;console.log(n?`BONGLOC FAIL ${n}/${res.length}`:`BONGLOC PASS ${res.length}/${res.length}`);process.exit(n?1:0)})();
