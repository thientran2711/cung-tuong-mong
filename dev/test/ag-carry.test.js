/* AG-ALL-2d3 — LAST-KHẮC NEWS IS NOT LOST. node dev/test/ag-carry.test.js [dev/index.html] [days]
   (design gap §23.5: a deed in the last khắc of a buổi reaches her only after the buổi by the khắc chain (OD L1638) and the hap list is per buổi)
   1 a happening in the LAST khắc that her informer can bring only after the buổi (knFor null now, known at end + knRelay) is carried into the next
     buổi as an ENDED TIN BÁO item: ended 1, past tense ("vừa"), the "đã xong" sentence, same place, same informer, new (unseen); fires tinBaoOn
   2 the same rule decides: news nobody would bring stays hidden (not carried)
   3 a happening whose news could arrive inside the buổi (not the last khắc) is not carried (no double)
   4 already known in the buổi → not carried again
   5 bot: N days of real NPC deeds — carried items appear (KN.stat.carry > 0), every carried item is ended, no caught errors, no page errors */
const {chromium}=require('playwright');const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+require('path').resolve(URL0);
const DAYS=+(process.argv[3]||4);
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 const r=await p.evaluate((DAYS)=>{const o={};localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;for(let i=0;i<20;i++){window.__nlInner=1;start();window.__nlInner=0;if(!isSrv())break}
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
  const c0=KN.stat.carry||0;used=0;step();adHapNow=A0;knFor=F0;off();
  const L=tinBaoList();const it=L.find(x=>x.id===id0);o.it=it&&{ended:it.ended,line:it.line,place:it.place,inf:it.infName,seen:it.seen,b:it.b,carry:it.carry};o.buoi=S.buoi;
  o.cb=cb.includes(id0);o.hid=!!L.find(x=>x.id===idH);o.early=!!L.find(x=>x.id===idE);o.known=!!L.find(x=>x.id===idK);o.spy=spy.name;o.n=(KN.stat.carry||0)-c0;
  /* 5 bot */
  const e0=AG.errs.length,k0=KN.stat.carry||0;let seenC=0,badC=0;
  for(let d=0;d<DAYS*4;d++){step();try{for(const x of tinBaoList())if(x.carry){seenC++;if(x.ended!==1)badC++}}catch(e){}}
  o.bot={carry:(KN.stat.carry||0)-k0,seenC,badC,errs:AG.errs.slice(e0).filter(e=>/knCarry|knScan|know/.test(e)).slice(0,3)};
  return o},DAYS);
 console.log(JSON.stringify({D:r.D,KH:r.KH}));
 ok(r.D>0&&r.nowL===null,'1 setup: the chain delays it (knRelay > 0), she does not know it in the last khắc',{D:r.D,now:r.nowL});
 ok(r.it&&r.it.ended===1&&/vừa|đã/.test(r.it.line)&&/đã xong|đã qua/.test(r.it.line)&&!/%/.test(r.it.line)&&r.it.place==="vuon"&&r.it.inf===r.spy&&r.it.seen===0&&r.it.b===r.buoi,'1 next buổi: carried as an ENDED TIN BÁO item (past tense + "đã xong", same place, same informer, new)',r.it);
 ok(r.cb,'1 tinBaoOn fires for the carried item');
 ok(!r.hid,'2 news nobody would bring stays hidden (same knFor rule)');
 ok(!r.early,'3 a happening whose news came inside the buổi is not carried');
 ok(!r.known,'4 already known → not carried again');
 ok(r.bot.carry>0&&r.bot.seenC>0&&r.bot.badC===0&&!r.bot.errs.length,`5 bot ${DAYS} days: last-khắc news reaches her next buổi, always as ended`,r.bot);
 ok(!errs.length,'6 no page errors',errs.slice(0,3));
 await b.close();const n=res.filter(x=>!x).length;console.log(n?`${n} FAIL`:`AG-CARRY: ALL ${res.length} PASS`);process.exit(n?1:0)})().catch(e=>{console.error(e);process.exit(1)});
