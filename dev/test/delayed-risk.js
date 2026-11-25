/* DELAYED-RISK ROADS + RESULT SEALS (review/m-fix-3, robot M4 seed 104; laws 2/3/6a/7/11).
   (1) a card whose danger comes LATER shows the WHOLE-ROAD word: Giả mang thai (j2 staged act: oi = j8 fpRoad, first step oin),
       Giả bệnh (j13 oi), «Giấu đi, im lặng» / «Sai người lùng tìm» (j92 p) — and the later exposure has counter-plays (j22).
       Monte Carlo: the shown road % = what the months really do (±4).
   (2) the verdict cites the REAL Kính sự phòng record (nightLog), never "no night" when the book holds nights.
   (3) every played deck card: the THÀNH / BẠI seal of the result toast = the real roll (forced success / forced fail), and the rest
       card's BẠI is only the odds-cap soft fail (≈ 5 %, nothing gained).
   usage: node dev/test/delayed-risk.js <url>   (e.g. http://127.0.0.1:8765/index.html) */
const {chromium}=require('./lib/pw-roulette');const [,,URL]=process.argv;
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:755,height:1000},deviceScaleFactor:1,serviceWorkers:'block'})).newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));p.setDefaultTimeout(0);
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});
 for(let n=0;n<600;n++){const s=await p.evaluate(()=>{const b=document.querySelector('#kload [data-kl="go"]');if(b){b.click();return ''}return window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)&&!document.getElementById('kload')?'ok':''});if(s)break;await p.waitForTimeout(1000)}
 await p.waitForTimeout(1500);
 const r=await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;for(let i=0;i<12;i++){try{nlNew()}catch(e){}start();if(!isSrv())break}
  const close=()=>{Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;const t=document.getElementById('rtoast');if(t){t.classList.remove('on');t.innerHTML=''}};
  const seal=()=>{const T=document.getElementById('rtoast');return T&&T.classList.contains('on')?((T.querySelector('.seal')||{}).textContent||''):'none'};
  const txt=a=>{const i=deck.indexOf(a);render();const el=document.querySelector(`.card[data-i="${i}"]`);return el?el.innerText.replace(/\s+/g,' '):''};
  const R0=Math.random;const force=v=>{Math.random=()=>v};const unforce=()=>{Math.random=R0};
  close();tab="act";S.turn=Math.max(S.turn,30);/* past the new-girl mercy (BAL.eff.j8.mercyTurn) */const out={};
  const snap=JSON.stringify(ser());const reset=()=>{deser(JSON.parse(snap));close();tab="act";used=0;S.buoi=0;deck.forEach(a=>a.done=0)};
  /* ---------- (1)+(2) Giả mang thai, the M4 state: Tâm cơ 100, 21 nights, the last 7 tuần before today ---------- */
  const m4=()=>{S.tamco=100;S.preg=0;S.fake=0;S.doctor=0;S.khBook=0;S.out=0;S.bac=500;const W=wk();S.nightLog=[2,3,10,14,14,14,27,29,30,34,41,44,45,47,48,49,50,50,51,52,53].map(x=>x-60+W);S.nights=21};
  reset();m4();let a=pool().find(x=>x.n==="Giả mang thai");deck.push(a);
  const road=fpRoad(S,od(S.tamco),1,fpNoRec(S,wk()));out.fake={o1:od(S.tamco),road,word:word(optOdds(a)),noRec:fpNoRec(S,wk()),txt:txt(a).slice(0,420)};
  /* the same card with a fresh night and a Thái y tâm phúc */
  reset();m4();S.nightLog.push(wk());S.doctor=1;a=pool().find(x=>x.n==="Giả mang thai");out.fakeGood={road:a.oi,word:word(optOdds(a)),noRec:fpNoRec(S,wk())};
  /* staged act: the first step decides THÀNH / BẠI and its own gains / loss */
  reset();m4();a=pool().find(x=>x.n==="Giả mang thai");deck.push(a);let d0=S.danh,s0=S.sung;force(0.0001);act(deck.indexOf(a));unforce();out.stepWin={seal:seal(),fake:S.fake,preg:S.preg,dSung:S.sung-s0};close();
  reset();m4();a=pool().find(x=>x.n==="Giả mang thai");deck.push(a);d0=S.danh;force(0.9999);act(deck.indexOf(a));unforce();out.stepLose={seal:seal(),fake:S.fake,preg:S.preg,dDanh:S.danh-d0};close();
  /* the verdict cites the real book */
  reset();m4();S.preg=1;S.fake=1;S.pregWk=wk();let why=null;const ds0=deathSentence;deathSentence=function(p,w){why=typeof p==="string"?p:w};
  force(0.0001);pregMonthP(S);unforce();deathSentence=ds0;out.verdict=why;
  reset();m4();S.nightLog=[];S.preg=1;S.fake=1;S.pregWk=wk();why=null;deathSentence=function(p,w){why=typeof p==="string"?p:w};force(0.0001);pregMonthP(S);unforce();deathSentence=ds0;out.verdictNone=why;
  /* counter-plays offered while the fake runs (book not matching) */
  reset();m4();S.preg=3;S.fake=1;S.pregWk=wk();deal();out.counter=deck.filter(x=>/Hối lộ Kính sự phòng sửa sổ|Báo sảy thai/.test(x.n)).map(x=>({n:x.n,w:word(optOdds(x))}));
  const ex=deck.find(x=>x.n==="Báo sảy thai");out.exitTxt=ex?txt(ex).slice(0,300):"";force(0.0001);act(deck.indexOf(ex));unforce();out.exitWin={fake:S.fake,preg:S.preg,seal:seal()};close();
  reset();m4();S.preg=3;S.fake=1;S.pregWk=wk();deal();const kf=deck.find(x=>x.n==="Hối lộ Kính sự phòng sửa sổ");force(0.0001);act(deck.indexOf(kf));unforce();out.kspFix={khBook:S.khBook,noRec:fpNoRec(S)};close();
  /* Monte Carlo: the shown road (from month 1, first step done) = the months (NPC-shaped body, same pregMonthP) */
  const mc=(nightsNear,doc)=>{let ok=0,N=3000,cur=null;const ds=deathSentence,bp=birthP;deathSentence=function(p){if(p&&typeof p==="object")p.__d=1;return""};birthP=function(){if(cur&&!cur.__d)ok++;return""};
   const p0={name:"Thử",tamco:80,preg:1,fake:1,pregWk:100,doctor:doc,nightLog:nightsNear?[98]:[60],sung:50,suc:80,mat:0,arts:{}};let shown=fpRoad(p0,100,1,fpNoRec(p0));
   const ex0=BAL.tw.g.fakeX.npcExit;BAL.tw.g.fakeX.npcExit=0;
   for(let i=0;i<N;i++){const q=Object.assign({},p0,{nightLog:p0.nightLog.slice()});cur=q;for(let m=0;m<12&&q.preg&&!q.__d;m++)pregMonthP(q)}
   BAL.tw.g.fakeX.npcExit=ex0;deathSentence=ds;birthP=bp;return {shown,real:Math.round(ok*100/N)}};
  try{out.mcNoRec=mc(false,0);out.mcRec=mc(true,1)}catch(e){out.mcErr=e.message}
  /* ---------- Giả bệnh ---------- */
  reset();S.ill=null;S.fakeIll=0;a=illCards().find(x=>x.n==="Giả bệnh");deck.push(a);out.ill={word:word(optOdds(a)),want:word(100-fakeIllRisk()),risk:fakeIllRisk(),txt:txt(a).slice(0,300)};
  /* ---------- Giấu đi, im lặng (lost ngự tứ) ---------- */
  reset();try{const P=PEND.wdnt({k:Object.keys(WD_ITEMS)[0],how:"bị mất",by:""});out.wd=P.o.map(o=>({n:o.n,p:o.p,j67:o.j67}))}catch(e){out.wdErr=e.message}
  /* ---------- (3a) the rest card: BẠI only on the soft fail ---------- */
  reset();const rs={THÀNH:0,BẠI:0,other:0,badLie:0};
  for(let n=0;n<2000;n++){deck.forEach(x=>x.done=0);used=0;S.buoi=0;Q.length=0;S.suc=40;let j=deck.findIndex(x=>x.rest==="lat");if(j<0){deck.push(j76stand().find(x=>x.rest==="lat"));j=deck.length-1}
   close();const s1=S.suc;act(j);const sl=seal();const g=S.suc-s1;if(sl==="THÀNH"){rs.THÀNH++;if(g<=0)rs.badLie++}else if(sl==="BẠI"){rs.BẠI++;if(g>0)rs.badLie++}else rs.other++}
  out.rest=rs;
  /* ---------- (3b) the whole family: every dealt card, forced success and forced fail ---------- */
  const fam=[];const seen=new Set();
  for(let life=0;life<3;life++){reset();if(life===1){S.tamco=80;S.bac=600;S.suc=80}if(life===2){S.buoi=2;S.preg=0;S.tamco=60;S.sung=60}
   const names=[];try{deal()}catch(e){}deck.forEach(x=>{if(x&&!seen.has(x.n)){seen.add(x.n);names.push(x.n)}});
   const sn=JSON.stringify(ser());
   for(const n of names)for(const v of [0.0001,0.9999]){deser(JSON.parse(sn));close();tab="act";used=0;deck.forEach(x=>x.done=0);const i=deck.findIndex(x=>x.n===n);if(i<0)continue;const c=deck[i];
    if(c.b!=null&&(S.buoi||0)!==c.b)continue;if(!canPay(c))continue;force(v);let err="";try{act(i)}catch(e){err=e.message}unforce();const sl=seal();
    const want=v<0.5?"win":"lose";const sure=c.inner?c.oin==null:((c.o==null||c.o>=100)&&oddsSure(c));const lie=sure?sl==="THÀNH"||sl==="BẠI":(want==="win"&&sl==="BẠI")||(want==="lose"&&sl==="THÀNH");fam.push({n,want,seal:sl,o:c.o,inner:!!c.inner,lie,err})}}
  deser(JSON.parse(snap));close();
  out.famN=fam.length;out.famLies=fam.filter(x=>x.lie);out.famErr=fam.filter(x=>x.err).slice(0,5);out.fam=fam;
  return out});
 const F=r.fake||{};const ok=[
  ['fake road ≠ Rất vững at M4 state',F.word!=='Rất vững'&&F.road<F.o1&&F.noRec===true],
  ['fake card cites the real book',/đêm cuối 7 tuần trước/.test(F.txt)&&/không khớp tháng thai/.test(F.txt)&&/ban chết \(tội khi quân\): khả năng/.test(F.txt)],
  ['fake road better with a fresh night + doctor',r.fakeGood&&r.fakeGood.road>F.road&&r.fakeGood.noRec===false],
  ['staged first step THÀNH',r.stepWin&&r.stepWin.seal==='THÀNH'&&r.stepWin.fake===1&&r.stepWin.preg===1],
  ['staged first step BẠI',r.stepLose&&r.stepLose.seal==='BẠI'&&!r.stepLose.fake&&r.stepLose.dDanh<0],
  ['verdict cites 21 nights / 7 tuần',/ghi 21 đêm thị tẩm của ngươi, đêm cuối cách ngày báo có thai 7 tuần/.test(r.verdict||'')],
  ['verdict with an empty book',/chưa ghi đêm thị tẩm nào của ngươi/.test(r.verdictNone||'')],
  ['counter-plays offered',(r.counter||[]).length===2],
  ['Báo sảy thai ends the fake',r.exitWin&&r.exitWin.fake===0&&r.exitWin.preg===0&&r.exitWin.seal==='THÀNH'],
  ['KSP fix matches the book',r.kspFix&&r.kspFix.khBook===1&&r.kspFix.noRec===false],
  ['MC road (book off) ±4',r.mcNoRec&&Math.abs(r.mcNoRec.shown-r.mcNoRec.real)<=4],
  ['MC road (book on, doctor) ±4',r.mcRec&&Math.abs(r.mcRec.shown-r.mcRec.real)<=4],
  ['Giả bệnh word = road',r.ill&&r.ill.risk>0&&r.ill.word===r.ill.want&&r.ill.word!=='Rất vững'],
  ['Giấu đi shows the later risk',(r.wd||[]).some(o=>/Giấu đi/.test(o.n)&&o.p===55&&/kèm: 2–6 tuần sau/.test(o.j67))],
  ['rest BẠI only = soft fail, ≈5%',r.rest&&r.rest.badLie===0&&r.rest.BẠI>=50&&r.rest.BẠI<=160],
  ['seal = real roll, whole deck',r.famN>=20&&r.famLies.length===0&&r.famErr.length===0]];
 const fails=ok.filter(x=>!x[1]).map(x=>x[0]);
 console.log(JSON.stringify(Object.assign({},r,{fam:undefined}),null,1));console.log('FAMILY',JSON.stringify(r.fam.map(x=>`${x.n}|${x.want}|${x.seal}${x.lie?'|LIE':''}`)));
 console.log(fails.length?'FAIL '+fails.join(' · '):'PASS delayed-risk: '+ok.length+' checks',errs.slice(0,5));await b.close();process.exit(fails.length||errs.length?1:0)})();
