/* AG-ALL-2d3 — SOFT FAIL at the odds cap. node dev/test/ag-soft.test.js [dev/index.html]
   (owner OD 17/11 ~17:35Z "Trần 95%, việc chắc ăn mà hỏng thì chỉ hỏng nhẹ": cap 95 / floor 5; an act that was sure before the cap and fails
   only because of it fails SOFTLY: cost / khắc spent, nothing gained, no failure consequence)
   1 ONE path: agOdd caps 100 → BAL.odds.hi, floor BAL.odds.lo; agSoft(raw ≥ hi) yes, below no; the BẠI line comes from BAL.odds.softFail
   2 agTry at the cap fails sometimes (nothing is 100 %) and counts soft fails; below the cap a failure is not soft
   3 every ag-all-2 site: forced failure at the cap = no consequence, below the cap = the normal consequence
     p3Run (NPC deck card: cost paid, l skipped, fail() skipped, BẠI line) · stf2Do (servant deed l skipped) · amDo (maid tea: no lòng loss)
     · pillowDo (no Sủng / Danh loss for the speaker) · jworld yến "Dâng một khúc đàn" (no Danh loss, BẠI line in the log)
   4 no page errors */
const {chromium}=require('playwright');const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+require('path').resolve(URL0);
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 const r=await p.evaluate(()=>{const o={};localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;for(let i=0;i<20;i++){window.__nlInner=1;start();window.__nlInner=0;if(!isSrv())break}
  window.__bot=1;Q.length=0;const R0=Math.random;const fail=f=>{Math.random=()=>0.999;try{return f()}finally{Math.random=R0}};
  /* 1 */
  o.cap=[agOdd(100),agOdd(250),agOdd(0),agOdd(-5),BAL.odds.hi,BAL.odds.lo];o.soft=[agSoft(100),agSoft(BAL.odds.hi),agSoft(BAL.odds.hi-1),agSoft(50)];
  o.txt=[agSoftTxt(S)===BAL.odds.softFail.me,!!BAL.odds.softFail.npc];
  /* 2 */
  const n0=AGSOFT.n;let f=0;for(let i=0;i<4000;i++)if(!agTry(100))f++;o.tries={f,soft:AGSOFT.n-n0};const n1=AGSOFT.n;fail(()=>agTry(50));o.notSoft=AGSOFT.n-n1;
  /* 3 p3Run */
  const v=liveRivals(true).find(x=>x.alive&&!x.out);v.suc=80;v.bac=100;let fl=0;
  const C=o2=>({n:"Thử việc",c:{bac:-5},o:o2,w:{suc:5},l:{suc:-20},fail:()=>{fl++;return"hỏng nặng"}});
  let t=fail(()=>p3Run(v,C(97),"t"));o.p3soft={suc:v.suc,bac:v.bac,fl,t,line:t===agSoftTxt(v).replace(/\.\s*$/,"")};
  v.suc=80;t=fail(()=>p3Run(v,C(50),"t"));o.p3hard={suc:v.suc,bac:v.bac,fl};
  /* stf2Do */
  const s={name:"Thử",loyal:60};let x=fail(()=>stf2Do(s,{o:100,w:{tin:5},l:{tin:-10}}));o.stfSoft={ok:x.ok,loyal:s.loyal};
  x=fail(()=>stf2Do(s,{o:40,w:{tin:5},l:{tin:-10}}));o.stfHard={ok:x.ok,loyal:s.loyal};
  /* amDo */
  try{const own=liveRivals(true).find(z=>z.alive&&!z.out&&(z.staff||[]).length);const m=own?own.staff[0]:null;if(m){m.loyal=60;fail(()=>amDo(m,own,"tea",100));o.amSoft=m.loyal;fail(()=>amDo(m,own,"tea",50));o.amHard=m.loyal}else o.amSkip=1}catch(e){o.amErr=String(e)}
  /* pillowDo (NPC speaker) */
  const a=v,tg=liveRivals(true).find(z=>z!==v&&z.alive&&!z.out);a.sung=50;a.danh=50;let pr=fail(()=>pillowDo(a,tg,99));o.pilSoft={pr,sung:a.sung,danh:a.danh};
  pr=fail(()=>pillowDo(a,tg,50));o.pilHard={pr,sung:a.sung};
  return o});
 ok(r.cap[0]===r.cap[4]&&r.cap[1]===r.cap[4]&&r.cap[2]===r.cap[5]&&r.cap[3]===r.cap[5],'1 agOdd caps at BAL.odds.hi / floors at BAL.odds.lo',r.cap);
 ok(r.soft[0]&&r.soft[1]&&!r.soft[2]&&!r.soft[3],'1 agSoft: raw ≥ hi soft, below not',r.soft);
 ok(r.txt[0]&&r.txt[1],'1 BẠI line from BAL.odds.softFail (one core)');
 ok(r.tries.f>40&&r.tries.f<400&&r.tries.soft===r.tries.f,'2 nothing is 100 %: agTry(100) fails ~5 %, every one counted soft',r.tries);
 ok(r.notSoft===0,'2 a failure below the cap is not soft');
 ok(r.p3soft.suc===80&&r.p3soft.bac===95&&r.p3soft.fl===0&&r.p3soft.line,'3 p3Run soft: cost paid, no l, no fail(), the BẠI line',r.p3soft);
 ok(r.p3hard.suc===60&&r.p3hard.fl===1,'3 p3Run below cap: l + fail() as before',r.p3hard);
 ok(r.stfSoft.ok===false&&r.stfSoft.loyal===60,'3 stf2Do soft: no lòng loss',r.stfSoft);
 ok(r.stfHard.loyal===50,'3 stf2Do below cap: l applied',r.stfHard);
 ok(r.amSkip||(r.amSoft===60&&r.amHard<60),'3 amDo soft: no lòng loss; below cap: loss',{s:r.amSoft,h:r.amHard,e:r.amErr});
 ok(r.pilSoft.pr.soft===1&&r.pilSoft.sung===50&&r.pilSoft.danh===50,'3 pillowDo soft: the speaker loses nothing',r.pilSoft);
 ok(r.pilHard.sung<50,'3 pillowDo below cap: the speaker pays',r.pilHard);
 const W=require('fs').readFileSync(require('path').join(__dirname,'../build/jworld.js'),'utf8');
 ok(/if\(agTry\(o\)\)apply\(\{sung:b\.showSung,danh:b\.showDanh\}\);else if\(agSoft\(o\)\)log\(agSoftTxt\(S\)\);else apply\(\{danh:b\.failDanh\}\)/.test(W),'3 jworld yến "Dâng một khúc đàn": soft branch (no Danh loss) before the hard one');
 ok(!errs.length,'4 no page errors',errs.slice(0,3));
 await b.close();const n=res.filter(x=>!x).length;console.log(n?`${n} FAIL`:`ALL PASS (${res.length})`);process.exit(n?1:0)})();
