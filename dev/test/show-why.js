/* SHOW WHY A NUMBER (review/show-why): every result box + Sổ ghi line with a changed number carries "Vì sao" with the factors
   (nết, trọng, mood, repetition…), named when known, generic when not; the shown number = the applied number.
   usage: node dev/test/show-why.js [index.html] [base.html for the old-save check] */
const {chromium}=require('playwright');const path=require('path');
const NEW='file://'+path.resolve(process.argv[2]||path.join(__dirname,'../index.html'));const BASE=process.argv[3]?'file://'+path.resolve(process.argv[3]):null;
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x).slice(0,500):''))};
async function open(b,url,errs){const p=await b.newPage();p.on('pageerror',e=>errs.push(e.message));p.setDefaultTimeout(120000);await p.route(/^https?:/,r=>r.abort());
 await p.goto(url,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function');return p}
(async()=>{const b=await chromium.launch();const errs=[];const p=await open(b,NEW,errs);
 const r=await p.evaluate(async()=>{SLOT=2;document.getElementById('title').hidden=true;start();Q.length=0;const out={};const tick=()=>new Promise(r=>setTimeout(r,5));
  const N=BAL.net.T;const tTrust=Object.keys(N).find(t=>N[t].g==="tt"&&N[t].trust>1)||Object.keys(N).find(t=>N[t].trust>1);
  const v=liveRivals(true)[0];const g=N[tTrust].g;const idx={tt:0,ld:1,ch:2}[g];v.net=traitsOf(v);v.net[idx]=tTrust;
  /* 1 unknown nết → generic */
  S.trK={};let b0=rsnap();const a0=aff(v,S);affAdd(v,S,5);log(`${v.name} cười với ngươi: thiện cảm +${aff(v,S)-a0}.`);resultShow("Thử 1",b0,true);
  const R1=window.kaLastResult;out.gen=(R1.rows.find(x=>x.k==="vi")||{}).items;out.genLog=plain(S.logs[0]);out.d1=aff(v,S)-a0;await tick();
  /* 2 known nết → named */
  S.trK[v.id]=[tTrust];b0=rsnap();const a1=aff(v,S);affAdd(v,S,5);log(`${v.name} cười với ngươi: thiện cảm +${aff(v,S)-a1}.`);resultShow("Thử 2",b0,true);
  out.named=((window.kaLastResult.rows.find(x=>x.k==="vi")||{}).items)||[];out.d2=aff(v,S)-a1;out.trust=tTrust;out.namedLog=plain(S.logs[0]);
  out.row=!!document.querySelector("#rtoast .kb .kr-vi .krl");await tick();
  /* 3 a change with no factor → no why */
  const P=BAL.net[netSex(v)==="m"?"M":"F"];v.net=["tt","ld","ch"].map(k=>P[k].find(t=>N[t].trust==null||N[t].trust===1));out.t0=v.net;window.__moodOff=true;
  {const T=traitsOf(v);out.noF=T.every(t=>N[t].trust==null||N[t].trust===1)}
  b0=rsnap();affAdd(v,S,5);log(`${v.name} gật đầu: thiện cảm +5.`);resultShow("Thử 3",b0,true);out.none=(window.kaLastResult.rows.find(x=>x.k==="vi"))||null;out.noneLog=plain(S.logs[0]);window.__moodOff=false;await tick();
  /* 4 Thái hậu greeting through the real option */
  try{const ths={kind:"th"};const A=talkOpts(ths);const g1=A.find(a=>a&&/^Thỉnh an/.test(a.n));S.thO.archK=1;
   const tg=DEED.greet;const vm=trongMul("th",tg);out.vm=vm;S.tgK=S.tgK||{};S.tgK.th=1;
   b0=rsnap();const th0=S.th;if(g1.run)g1.run();else if(g1.go)g1.go();resultShow("Thỉnh an",b0,true);out.greet=((window.kaLastResult.rows.find(x=>x.k==="vi")||{}).items)||[];out.thd=S.th-th0}catch(e){out.greetErr=String(e)}
  await tick();
  /* 4b the greeting's Sổ ghi line */
  out.greetLog=S.logs.slice(0,4).map(plain).filter(t=>/Vì sao: Thái hậu/.test(t));
  /* 6 a gift: her nết gift column, known → named */
  try{const tg=Object.keys(N).find(t=>N[t].g==="tt"&&N[t].gift&&N[t].gift!==1)||Object.keys(N).find(t=>N[t].gift&&N[t].gift!==1);const w=liveRivals(true)[1]||v;w.net=traitsOf(w);w.net[{tt:0,ld:1,ch:2}[N[tg].g]]=tg;S.trK[w.id]=[tg];try{k61Know(w,"Thử")}catch(e){}out.giftNamed=kaNamed(w);
   const k=Object.keys(IT).find(k=>IT[k]&&IT[k].pr>20&&IT[k].pr<200&&Array.isArray(IT[k].tg));S.inv.push({k,q:1});b0=rsnap();const a2=aff(w,S);const h=giveTo(S,w,S.inv.length-1);if(h)log(h);resultShow("Tặng quà",b0,true);
   out.gift=((window.kaLastResult.rows.find(x=>x.k==="vi")||{}).items)||[];out.giftT=tg;out.giftD=aff(w,S)-a2}catch(e){out.giftErr=String(e)}
  await tick();
  /* 7 a topic talk said again → repetition named */
  try{const w=liveRivals(true)[2]||v;S.chat=S.chat||{};S.chat[w.id]=2;const A=topicOpts(w).filter(a=>a&&a.run);b0=rsnap();const h=A[0].run();if(typeof h==="string"&&h)log(h);resultShow(A[0].n,b0,true);
   out.talk=((window.kaLastResult.rows.find(x=>x.k==="vi")||{}).items)||[]}catch(e){out.talkErr=String(e)}
  await tick();
  /* 8 a night: Sủng from her preparation and his mood (her own stat in words, never "+N") */
  try{S.emp.mood=0;PEND.night1({q:2,vp:0});const s0=S.sung;nightFx(5);out.nightD=S.sung-s0;await tick();out.night=S.logs.slice(0,6).map(plain).filter(t=>/Vì sao: Đêm thị tẩm/.test(t))}catch(e){out.nightErr=String(e)}
  /* 5 NPC deed toward her (TR_DEED context) — trọng of the judge */
  try{const k=Object.keys(SOC).find(k=>DEED[k]&&k!=="serveTH");out.soc=k}catch(e){}
  return out});
 console.log(JSON.stringify(r).slice(0,1500));
 ok(r.gen&&r.gen.length&&/theo tính nết/.test(r.gen[0])&&!r.gen[0].includes(r.trust),'unknown nết → generic "theo tính nết", no nết name',r.gen);
 ok(r.named.length&&r.named[0].includes('tính '+r.trust),'known nết → named',r.named);
 ok(r.named.length&&r.named[0].includes('+'+r.d2),'shown number = applied number',[r.named[0],r.d2]);
 ok(/Vì sao:/.test(r.namedLog)&&r.namedLog.includes('+'+r.d2),'Sổ ghi line carries the same why',r.namedLog);
 ok(r.row,'result card has the kit row "Vì sao" (.kb .kr-vi)');
 ok(r.noF&&(!r.none&&!/Vì sao/.test(r.noneLog)),'no factor → no why row, no why tail',[r.none,r.noneLog]);
 ok(!r.greetErr,'Thái hậu greeting runs',r.greetErr);
 ok(r.greet&&r.greet.length&&/Thái hậu/.test(r.greet[0]),'greeting result shows the why',r.greet);
 ok(r.greetLog&&r.greetLog.length,'greeting Sổ ghi line carries the why',r.greetLog);
 ok(!r.giftErr&&r.giftNamed&&(!r.giftD||r.gift.some(x=>x.includes('tính '+r.giftT))),'gift: the nết that changed its worth is named',[r.giftErr,r.gift,r.giftT,r.giftD]);
 ok(!r.talkErr&&r.talk.some(x=>/chuyện trò 2 lần/.test(x)),'talk said again: repetition named',[r.talkErr,r.talk]);
 ok(!r.nightErr&&r.night.length&&/sửa soạn chu đáo/.test(r.night[0])&&/Hoàng thượng đang vui/.test(r.night[0])&&/Đêm thị tẩm:/.test(r.night[0])&&/Sủng thêm \d/.test(r.night[0])&&!/Vì sao[^]*Sủng \+/.test(r.night[0]),'night: preparation + his mood, Sủng said in words',[r.nightErr,r.night,r.nightD]);
 ok(!errs.length,'no page errors',errs.slice(0,3));
 await b.close();const f=res.filter(x=>!x).length;console.log(f?`${f} FAIL`:'ALL OK');process.exit(f?1:0)})();
