/* AG-ALL-2d3 — SOFT FAIL at the odds cap. node dev/test/ag-soft.test.js [dev/index.html]
   (owner OD 17/11 ~17:35Z "Trần 95%, việc chắc ăn mà hỏng thì chỉ hỏng nhẹ": cap 95 / floor 5; an act that was sure before the cap and fails
   only because of it fails SOFTLY: cost / khắc spent, nothing gained, no failure consequence)
   1 ONE path: agOdd caps 100 → BAL.odds.hi, floor BAL.odds.lo; agSoft(raw ≥ hi) yes, below no; the BẠI line comes from BAL.odds.softFail
   2 agTry at the cap fails sometimes (nothing is 100 %) and counts soft fails; below the cap a failure is not soft
   3 every ag-all-2 site: forced failure at the cap = no consequence, below the cap = the normal consequence
     p3Run (NPC deck card: cost paid, l skipped, fail() skipped, BẠI line) · stf2Do (servant deed l skipped) · amDo (maid tea: no lòng loss)
     · pillowDo (no Sủng / Danh loss for the speaker) · runOpt (her card, r2 A3) · threatServ + j70 accomplice (r2 C5) · jworld yến "Dâng một khúc đàn" (no Danh loss, BẠI line in the log)
   4 no page errors
   ODDS CAP merge (main 5cbfd620): the BẠI line is j63 oddsSoft for her and the same words for an NPC (agSoftTxt(p,n,c)); an ag card rolls BEFORE
   paying, so a soft fail spends only its Sức share (oddsSoftCost), never bạc; a formerly-sure card (o 100, no fix) rolls at the cap like her runOpt */
const {chromium}=require('./lib/dlgs-off').pw('off');/* checks cards / screens: side-line dialogue scenes off (lib/dlgs-off.js) */const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+require('path').resolve(URL0);
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 const r=await p.evaluate(()=>{const o={};localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;for(let i=0;i<20;i++){window.__nlInner=1;start();window.__nlInner=0;if(!isSrv())break}
  window.__bot=1;Q.length=0;const R0=Math.random;const fail=f=>{Math.random=()=>0.999;try{return f()}finally{Math.random=R0}};
  /* 1 */
  o.cap=[agOdd(100),agOdd(250),agOdd(0),agOdd(-5),BAL.odds.hi,BAL.odds.lo];o.soft=[agSoft(100),agSoft(BAL.odds.hi),agSoft(BAL.odds.hi-1),agSoft(50)];
  {const vv=liveRivals(true)[0];const s0=S.suc;const tn=agSoftTxt(vv,"",{suc:-4,bac:-9}),s1=vv.suc;const th=agSoftTxt(S,"Thử",{suc:-4,bac:-9});o.txt=[/người tính không bằng trời tính/.test(tn)&&tn.startsWith(vv.name+":")&&!/undefined|NaN|\{n\}/.test(tn),th===window.__oddsSoft&&/không mất bạc/.test(th)&&!/undefined|NaN/.test(th),S.suc===s0-4,s1!==undefined]}
  /* 2 */
  const n0=AGSOFT.n;let f=0;for(let i=0;i<4000;i++)if(!agTry(100))f++;o.tries={f,soft:AGSOFT.n-n0};const n1=AGSOFT.n;fail(()=>agTry(50));o.notSoft=AGSOFT.n-n1;
  /* 3 p3Run */
  const v=liveRivals(true).find(x=>x.alive&&!x.out);v.suc=80;v.bac=100;let fl=0;
  const C=o2=>({n:"Thử việc",c:{bac:-5},o:o2,w:{suc:5},l:{suc:-20},fail:()=>{fl++;return"hỏng nặng"}});
  let t=fail(()=>p3Run(v,C(97),"t"));o.p3soft={suc:v.suc,bac:v.bac,fl,t,line:t===agSoftTxt(v,"",{bac:-5}).replace(/<[^>]+>/g,"").replace(/\.\s*$/,"")};
  v.suc=80;t=fail(()=>p3Run(v,C(50),"t"));o.p3hard={suc:v.suc,bac:v.bac,fl};
  /* stf2Do */
  const s={name:"Thử",loyal:60};let x=fail(()=>stf2Do(s,{o:100,w:{tin:5},l:{tin:-10}}));o.stfSoft={ok:x.ok,loyal:s.loyal};
  x=fail(()=>stf2Do(s,{o:40,w:{tin:5},l:{tin:-10}}));o.stfHard={ok:x.ok,loyal:s.loyal};
  /* amDo */
  try{const own=liveRivals(true).find(z=>z.alive&&!z.out&&(z.staff||[]).length);const m=own?own.staff[0]:null;if(m){m.loyal=60;fail(()=>amDo(m,own,"tea",100));o.amSoft=m.loyal;fail(()=>amDo(m,own,"tea",50));o.amHard=m.loyal}else o.amSkip=1}catch(e){o.amErr=String(e)}
  /* pillowDo (NPC speaker) */
  const a=v,tg=liveRivals(true).find(z=>z!==v&&z.alive&&!z.out);a.sung=50;a.danh=50;let pr=fail(()=>pillowDo(a,tg,99));o.pilSoft={pr,sung:a.sung,danh:a.danh};
  pr=fail(()=>pillowDo(a,tg,50));o.pilHard={pr,sung:a.sung};
  /* runOpt (her deck card / option: same soft fail as p3Run, review ag-all-2 r2 A3) */
  {S.suc=80;let fl2=0;const C2=o2=>({n:"Thử việc",o:o2,w:{suc:5},l:{suc:-20},fail:()=>{fl2++}});fail(()=>runOpt(C2(95)));o.roSoft={suc:S.suc,fl:fl2};
   S.suc=80;fail(()=>runOpt(C2(50)));o.roHard={suc:S.suc,fl:fl2};const ok100=runOpt(Object.assign(C2(100),{fix:1}));S.suc=80;const cap100=fail(()=>runOpt(C2(100)));o.ro100=ok100;o.roCap={r:cap100,suc:S.suc,fl:fl2}}
  /* threatServ (Dọa tố, review ag-all-2 r2 C5): cap = soft (no tell, no fear); below = refusal + her sent servant's fear */
  try{const own=liveRivals(true).find(z=>z.alive&&!z.out&&(z.staff||[]).length);const sv=own&&own.staff[0];if(!(S.staff||[]).length)S.staff=[mkServ("maid")];/* a low-rank start has none beside the close maid */const snt=typeof bestSent==="function"?bestSent(S):null;
   if(sv&&snt){sv.lover=1;sv.spyFor=null;const T0=window.tmOdds,P0=window.p3CnvOn;window.p3CnvOn=()=>false;/* the base j10 roll (the NPC-maid dilemma path has its own stf2Do soft fail) */const L60=()=>S.staff.forEach(x=>x.loyal=60),sum=()=>S.staff.reduce((a,x)=>a+(x.loyal||0),0)/S.staff.length;/* bestSent re-picks by lòng: measure the household */
     try{window.tmOdds=()=>BAL.odds.hi;L60();const t1=fail(()=>threatServ(S,sv));o.thSoft={sp:sv.spyFor,loy:sum(),t:t1};
     window.tmOdds=()=>30;L60();fail(()=>threatServ(S,sv));o.thHard={sp:sv.spyFor,loy:sum()}}finally{window.tmOdds=T0;window.p3CnvOn=P0}}else o.thSkip=1}catch(e){o.thErr=String(e)}
  /* j70 accomplice (tsv route, C5): cap = soft (the target hears nothing); below = refusal told, the target gains evidence */
  try{let mk=null,rid=null;for(const k in M70){const r=M70[k].R.find(x=>x.acc==="tsv");if(r){mk=k;rid=r.id;break}}
   const tg=liveRivals(true).find(z=>z.alive&&!z.out&&(z.staff||[]).length);if(mk&&tg){S.bac=500;const T0=window.tmOdds;try{window.tmOdds=()=>BAL.odds.hi;const e0=evG(tg,S);const p1=fail(()=>newPlot70(S,tg,mk,rid,"own"));o.acSoft={end:p1&&p1.end,pend:p1&&p1.pend,ev:evG(tg,S)-e0};
     window.tmOdds=()=>30;const e1=evG(tg,S);const p2=fail(()=>newPlot70(S,tg,mk,rid,"own"));o.acHard={end:p2&&p2.end,pend:p2&&p2.pend,ev:evG(tg,S)-e1}}finally{window.tmOdds=T0}}else o.acSkip=1}catch(e){o.acErr=String(e)}
  return o});
 ok(r.roSoft.suc===80&&r.roSoft.fl===0,'3 runOpt (her card) soft at the cap: no l, no fail(), as p3Run',r.roSoft);
 ok(r.roHard.suc===60&&r.roHard.fl===1,'3 runOpt below cap: l + fail()',r.roHard);
 ok(r.ro100===true,'3 runOpt bookkeeping (fix) o ≥ 100: no roll',r.ro100);
 ok(r.roCap.r===false&&r.roCap.suc===80&&r.roCap.fl===1,'3 runOpt formerly-sure (o 100, no fix): rolls at the cap, soft fail (odds cap)',r.roCap);
 ok(r.thSkip||(!r.thSoft.sp&&r.thSoft.loy===60&&r.thHard.loy<60&&!r.thHard.sp),'3 threatServ: soft at the cap (no fear), below: refusal + sent servant fear (BAL.ag.bt.fear)',{s:r.thSoft,h:r.thHard,e:r.thErr});
 ok(r.acSkip||(r.acSoft.end==="refused"&&!r.acSoft.pend&&r.acSoft.ev===0&&r.acHard.end==="refused"&&r.acHard.pend==="ownfail"&&r.acHard.ev>0),'3 j70 accomplice: soft at the cap (nothing told), below: refusal told + evidence',{s:r.acSoft,h:r.acHard,e:r.acErr});
 ok(r.cap[0]===r.cap[4]&&r.cap[1]===r.cap[4]&&r.cap[2]===r.cap[5]&&r.cap[3]===r.cap[5],'1 agOdd caps at BAL.odds.hi / floors at BAL.odds.lo',r.cap);
 ok(r.soft[0]&&r.soft[1]&&!r.soft[2]&&!r.soft[3],'1 agSoft: raw ≥ hi soft, below not',r.soft);
 ok(r.txt.every(Boolean),'1 BẠI line = j63 oddsSoft (her: logged, Sức share once, never bạc); NPC: same words, no undefined',r.txt);
 ok(r.tries.f>40&&r.tries.f<400&&r.tries.soft===r.tries.f,'2 nothing is 100 %: agTry(100) fails ~5 %, every one counted soft',r.tries);
 ok(r.notSoft===0,'2 a failure below the cap is not soft');
 ok(r.p3soft.suc===80&&r.p3soft.bac===100&&r.p3soft.fl===0&&r.p3soft.line,'3 p3Run soft: rolled before paying (no bạc), no l, no fail(), the BẠI line',r.p3soft);
 ok(r.p3hard.suc===60&&r.p3hard.fl===1,'3 p3Run below cap: l + fail() as before',r.p3hard);
 ok(r.stfSoft.ok===false&&r.stfSoft.loyal===60,'3 stf2Do soft: no lòng loss',r.stfSoft);
 ok(r.stfHard.loyal===50,'3 stf2Do below cap: l applied',r.stfHard);
 ok(r.amSkip||(r.amSoft===60&&r.amHard<60),'3 amDo soft: no lòng loss; below cap: loss',{s:r.amSoft,h:r.amHard,e:r.amErr});
 ok(r.pilSoft.pr.soft===1&&r.pilSoft.sung===50&&r.pilSoft.danh===50,'3 pillowDo soft: the speaker loses nothing',r.pilSoft);
 ok(r.pilHard.sung<50,'3 pillowDo below cap: the speaker pays',r.pilHard);
 const W=require('fs').readFileSync(require('path').join(__dirname,'../build/jworld.js'),'utf8');
 ok(/if\(agTry\(o\)\)apply\(\{sung:b\.showSung,danh:b\.showDanh\}\);else if\(agSoft\(o\)\)agSoftTxt\(S,"[^"]+"\);else apply\(\{danh:b\.failDanh\}\)/.test(W),'3 jworld yến "Dâng một khúc đàn": soft branch (no Danh loss) before the hard one');
 ok(!errs.length,'4 no page errors',errs.slice(0,3));
 await b.close();const n=res.filter(x=>!x).length;console.log(n?`${n} FAIL`:`ALL PASS (${res.length})`);process.exit(n?1:0)})();
