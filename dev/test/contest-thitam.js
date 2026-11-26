/* contest-thitam (FOREMAN D job D3, owner OD 26/11 ~01:25Z ruling (1)): first place in ANY contest kind ⇒ the winner also serves THAT night
   (her, an NPC: two-way); current rewards unchanged; lật thẻ odds unchanged. Logic cases per contest kind, run on LIVE and on the branch:
     node dev/test/contest-thitam.js <url of built dev/index.html> [--json out.json]
   The night helpers (T.fresh / drain / toEvening / endDay / flipTo / recs) are night-final.js's own, read from that file (one copy).
   Each kind: the tablet is steered to an NPC (T.only) so a LIVE build shows what the flip alone gives; the branch must give the night to
   the contest winner, with no flip choice, exactly one night record that day. */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');
const URL=process.argv[2];const JO=(process.argv.indexOf('--json')>0)?process.argv[process.argv.indexOf('--json')+1]:null;
const NF=fs.readFileSync(path.join(__dirname,'night-final.js'),'utf8');
const H=NF.slice(NF.indexOf('await p.evaluate(()=>{window.T=')+'await p.evaluate('.length,NF.indexOf('\n const R={};'));
const HELP=H.replace(/\);\s*$/,'');/* "()=>{window.T=…}" */
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:755,height:1000},reducedMotion:'reduce',serviceWorkers:'block'})).newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));p.setDefaultTimeout(0);
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof nfOn==='function'&&typeof cRun7==='function',null,{timeout:0});await p.waitForTimeout(2000);
 await p.evaluate(`(${HELP})()`);
 await p.evaluate(()=>{
  /* one day around a contest: run(L) makes the contest happen in the morning (winner = W), then the day ends with the tablet steered to A */
  T.day=(pick,run)=>{const L=T.fresh();const un=T.noNpc();const A=L[0],B=L[1];const W=pick(A,B);const d=wk();const b=T.recs(L);const sg0=W===S?S.sung:W.sung,dn0=W===S?S.danh:W.danh;
   const q0=Q.length;let err="";try{run(W,A,B,L)}catch(e){err=String(e&&e.message||e)}
   const a={err,ntk:S.ntk&&S.ntk.w===d?S.ntk.who:null,meKey:W===S?"me":W.id,card:Q.some(m=>m&&m.t==="Kính sự phòng báo tin"),dSung:(W===S?S.sung:W.sung)-sg0,dDanh:(W===S?S.danh:W.danh)-dn0};
   T.drain();T.seen=[];T.toEvening();T.flipTo(A);T.drain();T.endDay();un();const e=T.recs(L);
   a.wNight=W===S?e.me-b.me:e["r"+L.indexOf(W)]-b["r"+L.indexOf(W)];a.aNight=e.r0-b.r0;a.tot=Object.keys(e).reduce((s,k)=>s+e[k]-b[k],0);a.choice=T.seen.length;a.next=wk()===d+1;return a};
  /* contest kinds (scan: dev/tools/contest-thitam-scan.py) */
  /* the contest formula itself is pinned for the call (SC7[kind].f = 999 for the winner, 0 for the rest): W places first whatever the luck draw */
  T.pin=(W,kinds,f)=>{const o={};for(const k of kinds){o[k]=SC7[k].f;SC7[k].f=p=>p===W?999:0}try{return f()}finally{for(const k of kinds)SC7[k].f=o[k]}};
  const big=(E,W)=>{/* the winner's talent towers over the others, so W places first by the shared formula itself */for(const p of E){const t=p===W?999:0;p.tai=t;p.sac=t;p.tamco=t;p.duc=t;p.arts=p.arts||{};for(const k of ["cam","ky","thi","hoa","vu","dan","hat","mua","tho","y"])p.arts[k]=p===W?5:0}};
  T.K={
   "j71 festival contest, played without the mini-game (cRun7)":(W,A,B)=>{const E=[S,A,B];big(E,W);window.__j71rows="";T.pin(W,["dan"],()=>cRun7("trungthu","dan",E,[],W===S?999:0,true))},
   "j71 festival contest, she did not enter (cRun7 meIn=false)":(W,A,B)=>{const E=[S,A,B];big(E,W);T.pin(W,["dan"],()=>cRun7("trungthu","dan",E,[],0,false))},
   "j71 festival contest after her mini-game (cFin7)":(W,A,B)=>{const L=[W,...[S,A,B].filter(x=>x!==W)].map((p,i)=>({p,kind:"dan",t:9-i,pr:0,lk:0,s:90-i*10}));cFin7("trungthu","dan",L,true)},
   "j71 feast contest after her mini-game (fxFin7: Yến tiệc đầu xuân / Thất tịch)":(W,A,B)=>{const L=[W,...[S,A,B].filter(x=>x!==W)].map((p,i)=>({p,kind:"mua",t:9-i,pr:0,lk:0,s:90-i*10}));fxFin7("Yến tiệc đầu xuân",L,true)},
   "j71 feast contest, no mini-game (festival wrapper auto path)":(W,A,B)=>{const j=j7s();j.fx=j.fx||{};j.fx.xuan={y:S.year,a:"mua",pr:0};liveRivals(true).forEach(v=>{if(v!==A&&v!==B){v.out=1;v.__ctOut=1}});big([S,A,B],W);
     const m0=mgOn7;window.mgOn7=()=>false;try{mgOn7=()=>false}catch(e){}try{T.pin(W,FX7.sac.arts,()=>festival("Yến tiệc đầu xuân","sac"))}finally{try{mgOn7=m0}catch(e){}liveRivals(false).concat(rivals).forEach(v=>{if(v&&v.__ctOut){v.out=0;delete v.__ctOut}})}},
   "j8 base feast (j71 off)":(W,A,B)=>{const C=consorts();C.forEach(p=>{if(p!==W){p.sac=0;p.tai=0;p.arts={}}});if(W===S){S.sac=999;S.tai=999}else{W.sac=999;W.tai=999}window.__j71off=1;try{festival("Yến tiệc đầu xuân","sac","Sắc và điệu múa")}finally{window.__j71off=0}},
   "j34 Tranh ghế (contestEnd)":(W,A,B)=>{const r=Math.max(1,rkOf(S)+1);for(const p of [S,A,B]){if(p===S)S.rank=r-1;else p.rank=r-1}
     S.contest={r,c:[S,A,B].map(key),t0:wk(),len:1,round:3,sc:{},bk:{},bp:{},pr:{},sab:{},cut:{},dq:[],hint:0};for(const p of [S,A,B])S.contest.sc[key(p)]=p===W?[10,10,10]:[1,1,1];const q=window.quiet;contestEnd()},
   "jts Hội phối đồ (dress contest)":(W,A,B)=>{const th=Object.keys(TS_THEME)[0];const s=tsS();s.dress={m:S.month,y:S.year,th};const tt=tsDressTotal;tsDressTotal=function(p){return p===W?999:0};
     const dg=tsDressGame;tsDressGame=(th,done)=>done({},0);const ms=tsMkSit;tsMkSit=(th,m,f)=>f();
     try{tsDressHold();if(W===S){const m=Q.find(x=>x&&x.opts&&x.opts.some(o=>/^Tự tay phối đồ/.test(o.n||"")));if(m){const i=m.opts.findIndex(o=>/^Tự tay phối đồ/.test(o.n||""));Q.splice(Q.indexOf(m),1);Q.unshift(m);chooseM(i)}}
      else{const m=Q.find(x=>x&&x.opts&&x.opts.some(o=>/^Cáo bệnh, không dự/.test(o.n||"")));if(m){const i=m.opts.findIndex(o=>/^Cáo bệnh, không dự/.test(o.n||""));Q.splice(Q.indexOf(m),1);Q.unshift(m);chooseM(i)}}}
     finally{tsDressTotal=tt;tsDressGame=dg;tsMkSit=ms}},
   "j67 Kỳ thi Tài nữ (story contest ending, her first place)":(W)=>{if(W!==S)throw new Error("her story only");const E=ARC67.thd_tho&&ARC67.thd_tho.E||null;const e=E&&E.win;if(!e||typeof e.go!=="function")throw new Error("no ending");S.arts=S.arts||{};e.go()}};
 });
 const kinds=await p.evaluate(()=>Object.keys(T.K));const out={url:URL,rows:[]};
 for(const k of kinds)for(const who of ["her","npc"]){if(/did not enter/.test(k)&&who==="her")continue;if(/Tài nữ/.test(k)&&who==="npc")continue;
  const r=await p.evaluate(([k,who])=>T.day((A,B)=>who==="her"?S:B,T.K[k]),[k,who]);out.rows.push(Object.assign({kind:k,who},r))}
 /* not given: she cannot serve tonight (with child) → no promise, the day goes on as before */
 out.preg=await p.evaluate(()=>T.day(()=>S,(W,A,B)=>{S.preg=2;S.pregUnk=0;const E=[S,A,B];for(const x of E){x.tai=x===S?999:0}cRun7("trungthu","dan",E,[],999,true)}));
 /* odds unchanged: the tablet weight of every consort is the same before / after the contest code (nightCh), and BAL.ag.emp.summon */
 out.odds=await p.evaluate(()=>{const L=T.fresh();return{summon:JSON.stringify(BAL.ag.emp.summon),nc:[S].concat(L.slice(0,4)).map(x=>nightCh(x))}});
 out.card=await p.evaluate(()=>{const L=T.fresh();const E=[S].concat(ents7({e:L.slice(0,3).map(v=>v.id)}));const pp={k:"trungthu",vi:FV7.trungthu.findIndex(v=>v[0]==="C"),e:L.slice(0,3).map(v=>v.id),pr:[],sd:7};const d=PEND.j71f(pp);return d&&d.o?d.o.map(o=>o.n+" — "+String(o.x||"").replace(/<[^>]+>/g,"")).join(" | "):""});
 out.errs=errs;console.log(JSON.stringify(out,null,1));if(JO)fs.writeFileSync(JO,JSON.stringify(out,null,1));await b.close()})();
