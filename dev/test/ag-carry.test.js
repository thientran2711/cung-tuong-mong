/* AG-ALL-2d3 — LAST-KHẮC NEWS IS NOT LOST. node dev/test/ag-carry.test.js [dev/index.html] [days]
   (design gap §23.5: a deed in the last khắc of a buổi reaches her only after the buổi by the khắc chain (OD L1638) and the hap list is per buổi)
   1 a happening in the LAST khắc that her informer can bring only after the buổi (knFor null now, known at end + knRelay) is carried into the next
     buổi as an ENDED TIN BÁO item: ended 1, past tense ("vừa"), the "đã xong" sentence, same place, same informer, new (unseen); fires tinBaoOn
   2 the same rule decides: news nobody would bring stays hidden (not carried)
   3 a happening whose news could arrive inside the buổi (not the last khắc) is not carried (no double)
   4 already known in the buổi → not carried again
   5 bot: N days of real NPC deeds — carried items appear (KN.stat.carry > 0), every carried item is ended, no caught errors, no page errors
     DETERMINISTIC SAMPLE (review live-servants FAIL 5, 18/11): since live servants (OD 18/11 ~19:45Z (4)) her close maid knows only what her
     own row sees, so last-khắc news is rarer: one UNSEEDED 8-day bot gave carry 0 in 3 of 6 runs (live 0 of 5) — a thin sample, not a lost
     path. Now every life is SEEDED (Math.random re-seeded right before start(): the boot timers draw a varying count) and the bot runs
     SEEDS lives (default 1,2,3) × DAYS (default 16) days; §5 = carried items appear in the sum of the lives (carry > 0 and seen > 0), and in EVERY
     life every carried item is ended, no caught error. §1–4 (the planted case that proves the path) run in every life.
     usage: node dev/test/ag-carry.test.js [dev/index.html] [days=16] [seeds=1,2,3] */
const {chromium}=require('./lib/dlgs-off').pw('off');/* checks cards / screens: side-line dialogue scenes off (lib/dlgs-off.js) */const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+require('path').resolve(URL0);
const DAYS=+(process.argv[3]||16);const SEEDS=String(process.argv[4]||process.env.AGC_SEEDS||'1,2,3').split(',').map(Number).filter(Boolean);
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const errs=[];const BOT={carry:0,seenC:0,badC:0,errs:[],lives:[]};for(const SEED of SEEDS){const p=await b.newPage({viewport:{width:755,height:1000}});p.on('pageerror',e=>errs.push(e.message));
 await p.addInitScript(s=>{let x=s;Math.random=()=>{x=(x*1103515245+12345)%2147483648;return x/2147483648}},SEED);
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 const r=await p.evaluate(([DAYS,SEED])=>{const o={};if(SEED){let x=SEED;Math.random=()=>{x=(x*1103515245+12345)%2147483648;return x/2147483648}}/* re-seeded HERE: the boot timers before this point draw a varying count */localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;for(let i=0;i<20;i++){window.__nlInner=1;start();window.__nlInner=0;if(!isSrv())break}
  window.__bot=1;window.__agAll=1;Q.length=0;const step=()=>{Q.length=0;S.mg=0;try{nextBuoi()}catch(e){}Q.length=0;try{placeWhere();agFlush()}catch(e){}};
  while((S.buoi||0)!==0)step();step();while((S.buoi||0)!==1)step();
  o.D=knRelay();o.KH=J95.KH;const v=liveRivals(true).find(x=>x.alive&&!x.out);const spy=(S.staff||[]).find(s=>s&&!s.out)||{name:"Thử",sid:99};
  const mk=(id,w)=>({k:"vuon",id:"deed",x:{pid:id,vid:v.id},w0:w});
  const hL=mk("tLast",[J95.KH-1,J95.KH-1]),hH=mk("tHid",[J95.KH-1,J95.KH-1]),hE=mk("tEarly",[0,0]),hK=mk("tKnown",[J95.KH-1,J95.KH-1]);
  const A0=adHapNow,F0=knFor;const fake=[hL,hH,hE,hK];
  adHapNow=function(){const L=A0.apply(this,arguments);KN.raw=(KN.raw||[]).concat(fake);return L};
  knFor=function(x,h){if(fake.includes(h)){if(x!==S||h===hH)return null;if(h===hK)return{by:"here",how:"here"};return agKh()>=J95.KH-1+knRelay()?{by:"s"+(spy.sid||0),how:"here",s:spy}:null}return F0.apply(this,arguments)};
  used=J95.KH-1;try{tinBaoList()}catch(e){}const T0=knTb();T0.K[knHid(hK)]={id:knHid(hK),k:"deed",place:"vuon",b:S.buoi,k0:3,k1:3,who:[],line:"đã biết",by:"here",seen:1,ended:0};
  o.nowL=knFor(S,hL);let cb=[];const off=tinBaoOn(it=>cb.push(it.id));const id0=knHid(hL)+":c",idH=knHid(hH)+":c",idE=knHid(hE)+":c",idK=knHid(hK)+":c";
  const c0=KN.stat.carry||0;used=0;step();adHapNow=A0;knFor=F0;
  /* AG-ALL-2d4 (OD 17/11 ~17:55Z (3)): it lands when the bearer arrives — this fake bearer needs the longest walk (knRelay) → khắc (KH-1 + D − KH) */
  used=0;o.at0=!!tinBaoList().find(x=>x.id===id0);used=Math.min(J95.KH-1,J95.KH-1+o.D-J95.KH);
  const L=tinBaoList();off();const it=L.find(x=>x.id===id0);o.it=it&&{ended:it.ended,line:it.line,place:it.place,inf:it.infName,seen:it.seen,b:it.b,carry:it.carry};o.buoi=S.buoi;
  o.cb=cb.includes(id0);o.hid=!!L.find(x=>x.id===idH);o.early=!!L.find(x=>x.id===idE);o.known=!!L.find(x=>x.id===idK);o.spy=spy.name;o.n=(KN.stat.carry||0)-c0;
  /* 5 bot */
  const e0=AG.errs.length,k0=KN.stat.carry||0;let seenC=0,badC=0;
  for(let d=0;d<DAYS*4;d++){step();try{used=J95.KH-1;/* every carried bearer has arrived by the last khắc */for(const x of tinBaoList())if(x.carry){seenC++;if(x.ended!==1)badC++}}catch(e){}used=0}
  o.bot={carry:(KN.stat.carry||0)-k0,seenC,badC,errs:AG.errs.slice(e0).filter(e=>/knCarry|knScan|know/.test(e)).slice(0,3)};
  return o},[DAYS,SEED]);
 console.log(`life seed ${SEED}:`,JSON.stringify({D:r.D,KH:r.KH}));
 ok(r.D>0&&r.nowL===null,'1 setup: the chain delays it (knRelay > 0), she does not know it in the last khắc',{D:r.D,now:r.nowL});
 ok(r.it&&r.it.ended===1&&/vừa|đã/.test(r.it.line)&&/đã xong|đã qua/.test(r.it.line)&&!/%/.test(r.it.line)&&r.it.place==="vuon"&&r.it.inf===r.spy&&r.it.seen===0&&r.it.b===r.buoi,'1 next buổi: carried as an ENDED TIN BÁO item (past tense + "đã xong", same place, same informer, new)',r.it);
 ok(r.cb,'1 tinBaoOn fires for the carried item');
 ok(r.D<=1||r.at0===false,'1 (2d4 walk) not before its bearer arrives: a far bearer is not there at khắc 1 of the next buổi',{at0:r.at0,D:r.D});
 ok(!r.hid,'2 news nobody would bring stays hidden (same knFor rule)');
 ok(!r.early,'3 a happening whose news came inside the buổi is not carried');
 ok(!r.known,'4 already known → not carried again');
 ok(r.bot.badC===0&&!r.bot.errs.length,`5 life seed ${SEED}, bot ${DAYS} days: every carried item ended, no caught error`,r.bot);
 BOT.carry+=r.bot.carry;BOT.seenC+=r.bot.seenC;BOT.badC+=r.bot.badC;BOT.errs.push(...r.bot.errs);BOT.lives.push(r.bot.carry);await p.close()}
 ok(BOT.carry>0&&BOT.seenC>0&&BOT.badC===0&&!BOT.errs.length,`5 bot ${SEEDS.length} seeded lives × ${DAYS} days: last-khắc news reaches her next buổi, always as ended`,BOT);
 ok(!errs.length,'6 no page errors',errs.slice(0,3));
 await b.close();const n=res.filter(x=>!x).length;console.log(n?`${n} FAIL`:`AG-CARRY: ALL ${res.length} PASS`);process.exit(n?1:0)})().catch(e=>{console.error(e);process.exit(1)});
