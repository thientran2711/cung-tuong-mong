/* AG-ALL-2d2 — ONE DAY-KHẮC GATE for AG-ALL-2 + TIN BÁO "ended" flag. node dev/test/ag-dayk.js [dev/index.html]
   (owner OD L852 / L886 / 16/11 ~21:42Z / 17/11 ~16:45Z: "can it still be done" = khắc left in the DAY, never the buổi; C-AG #3 order: a TIN BÁO about a
   happening already over says so)
   1 NPC gate agFitDay: a deed starting late in a buổi may run on into the next buổi of the same day; not in the last buổi; BAL.ag.kh2.spill 0 = this buổi only
   2 an NPC deed started late runs ON into the next buổi: when the buổi turns it is carried (same deed, khắc 0 … sp−1 at the same place), not landed;
     it lands at its real end (a buổi later)
   3 her side: AG popups ask the day gate (agCanDay = j76 dayFit + Sức): 3 of 4 khắc used in a morning → a 2-khắc act still OK; in the evening → locked with words
   4 TIN BÁO: an item whose happening is over stays in her list with ended = 1 and a past-tense line + the "đã xong" sentence; a running one has ended 0;
     a landed deed keeps its window (knWin) instead of looking "now"
   5 no page errors */
const {chromium}=require('playwright');const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+require('path').resolve(URL0);
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 const r=await p.evaluate(()=>{const o={};localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;for(let i=0;i<20;i++){window.__nlInner=1;start();window.__nlInner=0;if(!isSrv())break}
  window.__bot=1;window.__agAll=1;Q.length=0;const step=()=>{Q.length=0;S.mg=0;try{nextBuoi()}catch(e){}Q.length=0;try{placeWhere();agFlush()}catch(e){}};
  while((S.buoi||0)!==0)step();step();while((S.buoi||0)!==0)step();/* a fresh morning with a record */
  try{placeWhere();agFlush()}catch(e){}
  /* 1 */
  o.g={b0:[agFitDay(3,1),agFitDay(3,2),agFitDay(3,6),agFitDay(4,1),agFitDay(3,14)]};const sp=BAL.ag.kh2.spill;BAL.ag.kh2.spill=0;o.g.off=agFitDay(3,2);BAL.ag.kh2.spill=sp;
  /* 3 her side (morning) */
  used=BAL.time.khac-1;S.suc=100;o.her={mCan:agCanDay(2),mLock:agWhyDay(2),buoiCan:can(2)};used=0;
  /* 2 carry */
  const R=agRec();o.rec=!!R;const v=liveRivals(true).find(x=>x.alive&&!x.out&&R&&R.P["v"+x.id]);const id="v"+v.id,key0=agKey();
  for(let q=0;q<4;q++)R.P[id][q]=[palaceOf(v),"rest",null,""];
  const pd={id,vid:v.id,k:"effort",pl:palaceOf(v),kh:3,act:"luyện tài nghệ",why:"test",key:key0,t:null};const z=agZ();z.pend.push(pd);agSpan(pd,{k:"effort",kc:3},v);
  o.span={k1:pd.k1,sp:pd.sp};
  step();const R1=agRec();o.carry={key:pd.key===agKey(),kh:pd.kh,k1:pd.k1,cont:pd.cont,inPend:z.pend.includes(pd),row:R1&&R1.P[id]?R1.P[id].slice(0,3).map(e=>e&&e[1]):null};
  step();o.landed=!z.pend.includes(pd);
  /* 3 her side (evening) */
  while((S.buoi||0)!==3)step();o.g.ev=[agFitDay(3,1),agFitDay(3,2)];used=BAL.time.khac-1;S.suc=100;o.her.eCan=agCanDay(2);o.her.eLock=agWhyDay(2);used=0;
  /* 4 TIN BÁO ended */
  while((S.buoi||0)!==3)step();const T=knTb();const now=agKh();
  T.K["t:run"]={id:"t:run",k:"deed",place:"vuon",b:S.buoi||0,k0:now,k1:3,who:[],line:"Tai mắt báo: ở Ngự hoa viên Lan quý nhân đang ngắm hoa.",by:"mat",seen:0,ended:0};
  T.K["t:end"]={id:"t:end",k:"deed",place:"vuon",b:S.buoi||0,k0:0,k1:-1,who:[],line:"Tai mắt báo: ở Ngự hoa viên Lan quý nhân đang ngắm hoa.",by:"mat",seen:0,ended:0};
  const L=tinBaoList();const a=L.find(x=>x.id==="t:run"),e=L.find(x=>x.id==="t:end");o.tb={run:a&&{ended:a.ended,line:a.line},end:e&&{ended:e.ended,line:e.line}};
  const h={k:"vuon",id:"deed",x:{pid:"nope",vid:1},w0:[0,1]};o.win=knWin(h);
  o.odds=[agOdd(120),agOdd(-3),agOdd(50),agCap(1.5),agCap(140)];o.lohi=[BAL.odds.lo,BAL.odds.hi];
  return o});
 console.log(JSON.stringify(r));
 ok(r.g.b0[0]&&r.g.b0[1]&&r.g.b0[2]&&!r.g.b0[3]&&!r.g.b0[4]&&!r.g.off&&r.g.ev&&r.g.ev[0]&&!r.g.ev[1],'1 NPC day gate = j76left (khắc left in the DAY): a late morning deed may run on over several buổi, never past the day, never starting after the buổi; evening: only what the day holds; spill 0 = this buổi only',r.g);
 ok(r.span.k1===3&&r.span.sp===2,'2 a 3-khắc deed at khắc 3 holds khắc 3 here and marks 2 khắc to run on',r.span);
 ok(r.carry.key&&r.carry.inPend&&r.carry.kh===0&&r.carry.k1===1&&r.carry.cont===1&&r.carry.row&&r.carry.row[0]==="ag_effort"&&r.carry.row[1]==="ag_effort",'2 the buổi turns: the deed is carried (khắc 0–1 of the new buổi, same place), not landed',r.carry);
 ok(r.landed,'2 it lands at its real end (a buổi later)',r.landed);
 ok(r.her.mCan&&r.her.mLock==="",'3 her side: morning, 3 of 4 khắc used → a 2-khắc AG act is still allowed',r.her);
 ok(!r.her.eCan&&/khắc/.test(r.her.eLock||""),'3 her side: evening, same → locked, the reason in words',{eCan:r.her.eCan,eLock:r.her.eLock});
 ok(r.tb.run&&r.tb.run.ended===0&&/đang/.test(r.tb.run.line)&&r.tb.end&&r.tb.end.ended===1&&/vừa/.test(r.tb.end.line)&&/đã xong|đã qua/.test(r.tb.end.line)&&!/%/.test(r.tb.end.line),'4 TIN BÁO: an item about an ended happening stays, ended = 1, past-tense line + "đã xong"; a running one ended 0',r.tb);
 ok(r.win&&r.win[0]===0&&r.win[1]===1,'4 a landed deed keeps its window (knWin), not "now"',r.win);
 ok(r.odds[0]===r.lohi[1]&&r.odds[1]===r.lohi[0]&&r.odds[2]===50&&r.odds[3]===1.5&&r.odds[4]===r.lohi[1],'6 nothing is ever 100 % (owner 17/11 ~17:00Z): act odds agOdd clamp to BAL.odds lo..hi; chance rolls agCap only capped (a rare event stays rare)',{odds:r.odds,lohi:r.lohi});
 ok(!errs.length,'5 no page errors',errs.slice(0,5));
 await b.close();process.exit(res.every(x=>x)?0:1)})().catch(e=>{console.error(e);process.exit(1)});
