/* AG-MOODKNOW checks — the CAUSE of a mood is shown only when she KNOWS it (owner OD 17/11 ~17:55Z (1); jmoodknow.js, BAL.mck)
   1 secret unknown → moodCauseKnown null; seal (kitEmotion) why "" ; mood box rows say "Nguyên do chưa rõ", no event picture
   2 scouted (intelLearn picks the j78 "mood" fact) → the TRUE cause text; a newer cause is unknown again (keyed by mood + cause)
   3 public leak by odds: a PUBLIC cause leaks into the morning news at ≈ BAL.mck.pub odds (clamped BAL.odds.hi when set to 100); a SECRET one never leaks
   4 NPC parity: the same rule for a consort (involved → knows; public leak → knows; Tai mắt in the household → knows like her)
   5 old save: no S.mck / S.mckPub / unstamped causes → no throw, classified by the cause words
   6 bot days: every cause she knows is the person's real current cause; no page errors
   usage: node dev/test/ag-moodknow.test.js [dev/index.html] [days] → exit 1 on any FAIL or page error */
const {chromium}=require('playwright');const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+require('path').resolve(URL0);const DAYS=+process.argv[3]||6;
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;let g=0;do{start();g++}while(isSrv()&&g<30);window.__nlInner=0;window.__bot=1;window.__agAll=1;quiet=false;Q.length=0;try{deal()}catch(e){}render()});
 await p.evaluate(()=>{window.kitKnown=()=>true;/* strangers have no seal at all (kitIsKnown); the test looks at known people */window.__M={
  R(){return liveRivals(true).filter(v=>v.alive&&!v.out&&!k61Own(v))},
  clean(){for(const v of rivals){v.mk=[];v.mk=[];v.__mkL=null;v.emo=null;v.__mkL=null}S.mck={};S.mckPub={};for(const v of rivals)v.mck={};tmPlace(S,0);for(const s of tmSrv())s.spyFor=null;S.mat=0},
  sec(v,y,tag){v.mk=[];v.mk=[];v.__mkL=null;v.emo=null;v.__mkL=null;emoEv(v,"slight",`bị ${y.name} làm nhục${tag||""}`,emoKey(y),1.5);return v.emo},
  pub(v,tag){v.mk=[];v.mk=[];v.__mkL=null;v.emo=null;v.__mkL=null;emoEv(v,"selfDown",`bị giáng phẩm${tag||""}`);return v.emo}}});
 /* 1 secret unknown */
 const r1=await p.evaluate(()=>{__M.clean();const [v,y]=__M.R();const e=__M.sec(v,y);S.emoSeen=S.emoSeen||{};S.emoSeen[emoKey(v)]=emoW();
  const m=kitEmotion(v);const C=emoCauses(v);return {c:e&&e.c,why:e&&e.why,k:moodCauseKnown(v),kit:m&&{known:m.known,why:m.why,ck:m.causeKnown},rows:C.map(x=>x.why),art:emoCauseArt(C[0]||null)}});
 ok(r1.c==="sec"&&r1.why&&r1.k===null,'secret cause, no route → moodCauseKnown null',r1);
 ok(r1.kit&&r1.kit.known&&r1.kit.why===""&&r1.kit.ck===false,'seal (kitEmotion): cause hidden',r1.kit);
 ok(r1.rows.length>=1&&r1.rows.every(w=>w==="Nguyên do chưa rõ")&&r1.art==="",'mood box rows: "Nguyên do chưa rõ", no event picture',r1.rows);
 /* 2 scouted */
 const r2=await p.evaluate(()=>{const [v]=__M.R();const t=intelLearn(v,20,{by:"Tiểu Thúy",how:"Tự đi dò la"});const a=moodCauseKnown(v);const m=kitEmotion(v);
  const rows=emoCauses(v).map(x=>x.why);const y=__M.R()[2]||__M.R()[1];__M.sec(v,y," lần nữa");const b2=moodCauseKnown(v);return {t,a,why:v.emo&&v.emo.why,kw:m.why,rows,b2,why2:v.emo.why}});
 ok(r2.a&&r2.t.includes(r2.a)&&r2.kw===r2.a,'scouted: the j78 mood fact tells the TRUE cause; seal shows it',{a:r2.a,kw:r2.kw});
 ok(r2.rows[0]&&r2.rows[0]!=="Nguyên do chưa rõ",'mood box row shows the known cause',r2.rows);
 ok(r2.b2===null,'a new cause is unknown again (no stale cause)',{b2:r2.b2,why2:r2.why2});
 /* 3 public leak by odds */
 const r3=await p.evaluate(()=>{const B=BAL.mck.pub,max0=B.max,o0=B.o.selfDown;B.max=999;const V=__M.R();let n=0,hit=0,sec=0,secHit=0,line=0;
  const eye0=BAL.mck.eye;BAL.mck.eye=0;
  for(let i=0;i<12;i++){__M.clean();S.tb.seed=1000+i;V.forEach((v,j)=>{if(j%2)__M.pub(v," #"+i);else __M.sec(v,V[(j+1)%V.length]," #"+i)});Q.length=0;mckMorning();
   V.forEach((v,j)=>{const k=moodCauseKnown(v);if(j%2){n++;if(k)hit++}else{sec++;if(k)secHit++}});line+=Q.filter(x=>/Tin trong cung/.test(x.t||"")&&/truyền tai nhau/.test(x.h)).length}
  let n2=0,h2=0;B.o.selfDown=100;for(let i=0;i<12;i++){__M.clean();S.tb.seed=5000+i;V.forEach((v,j)=>{if(j%2){__M.pub(v," @"+i);n2++}});mckMorning();V.forEach((v,j)=>{if(j%2&&moodCauseKnown(v))h2++})}
  B.max=max0;B.o.selfDown=o0;BAL.mck.eye=eye0;return {n,hit,rate:Math.round(hit*100/n),o:o0,sec,secHit,line,n2,h2,rate2:Math.round(h2*100/n2),hi:BAL.odds.hi}});
 ok(Math.abs(r3.rate-r3.o)<=15,'public cause leaks in the morning at about its BAL odds',r3);
 ok(r3.secHit===0,'a secret cause never leaks into the news',{sec:r3.sec,secHit:r3.secHit});
 ok(r3.line>=10,'the leak is a line in "Tin trong cung buổi này"',{line:r3.line});
 ok(r3.rate2<100&&r3.rate2>=80,'odds clamped to BAL.odds.hi (set 100 → still a miss sometimes)',{rate2:r3.rate2,hi:r3.hi});
 /* 4 NPC parity */
 const r4=await p.evaluate(()=>{__M.clean();const V=__M.R();const [a,v,y]=V;const out={};
  __M.sec(v,a);out.aimedA=moodCauseKnownBy(a,v);out.aimedMe=moodCauseKnown(v);
  __M.sec(v,y);out.secA=moodCauseKnownBy(a,v);
  S.mckPub={};S.mckPub[emoKey(v)]=[mckSig(v.emo.k,v.emo.why)];out.pubSecA=moodCauseKnownBy(a,v);
  __M.pub(v);S.mckPub[emoKey(v)]=[mckSig(v.emo.k,v.emo.why)];out.pubA=moodCauseKnownBy(a,v);out.pubMe=moodCauseKnown(v);
  /* Tai mắt in v's household: same odds for her and for a */
  const s=(v.staff||[]).find(x=>x&&x.sid!=null&&!x.out);if(!s)return Object.assign(out,{skip:1});let kA=0,kS=0,N=40;
  for(let i=0;i<N;i++){__M.clean();__M.sec(v,y," ~"+i);s.spyFor=key(a);if(moodCauseKnownBy(a,v))kA++;s.spyFor="me";if(moodCauseKnown(v))kS++}s.spyFor=null;
  return Object.assign(out,{kA,kS,N,spy:BAL.mck.spy})});
 ok(r4.aimedA&&r4.aimedMe===null,'NPC: a cause aimed at her (a consort) — she knows, the player does not',r4);
 ok(r4.secA===null&&r4.pubSecA===null,'NPC: a secret cause stays unknown (and a public-leak mark never opens a secret one)',r4);
 ok(r4.pubA&&r4.pubMe,'public leak: everyone knows (her and the consort)',r4);
 ok(r4.skip||(Math.abs(r4.kA*100/r4.N-r4.spy)<=20&&Math.abs(r4.kS*100/r4.N-r4.spy)<=20),'Tai mắt in the household: same odds for a consort and for her',r4);
 /* 5 old save */
 const r5=await p.evaluate(()=>{const [v]=__M.R();delete S.mck;delete S.mckPub;for(const x of rivals)delete x.mck;v.emo={k:"buon",v:55,why:"bị giáng phẩm",t:null,w:emoW()};v.emoH=[{k:"buon",v:55,why:"bị giáng phẩm",w:emoW()}];
  let err="";let k=null;try{k=moodCauseKnown(v);Q.length=0;for(let i=0;i<3;i++){S.tb.seed=77+i;mckMorning()}kitEmotion(v);emoCauses(v)}catch(e){err=String(e)}return {err,k,cls:mckCls(v.emo),pub:!!S.mckPub}});
 ok(!r5.err&&r5.k===null&&r5.cls==="pub"&&r5.pub,'old save: no store / unstamped cause → no throw, classified by its words',r5);
 /* 7 KHÓC + HỜN (owner OD 17/11 ~18:00Z) */
 const r7=await p.evaluate(()=>{const B=BAL.emo2,o0=B.khoc.o,h0=B.hon.o,s0=B.khoc.slap.slice();const V=__M.R();const out={};
  B.khoc.o=200;let kc=0,el=0;V.forEach((v,i)=>{v.mk=[];v.__mkL=null;v.emo=null;emoEv(v,"selfDown","bị giáng phẩm (k"+i+")");if(v.emo&&["khoc","buon","dau","so"].includes(v.emo.k)&&v.emo.v>=B.khoc.v){el++;if(v.emo.k==="khoc")kc++}});out.khocHi=[kc,el];
  B.khoc.o=0;kc=0;V.forEach((v,i)=>{v.mk=[];v.__mkL=null;v.emo=null;emoEv(v,"selfDown","bị giáng phẩm (n"+i+")");if(v.emo&&v.emo.k==="khoc")kc++});out.khocLo=[kc,V.length];B.khoc.o=o0;
  let v=V[0];B.khoc.slap=[100,100,100,100];for(let i=0;i<V.length*3;i++){v=V[i%V.length];v.mk=[];v.__mkL=null;v.emo=null;v.slap=null;if(slapGive(v,S,"thử",3)&&v.emo&&v.emo.k==="khoc")break}out.slap=v.emo&&{k:v.emo.k,why:v.emo.why,c:v.emo.c,known:moodCauseKnown(v)};B.khoc.slap=s0;
  /* hờn: her own servant scolded by her */
  B.hon.o=200;const s=(S.staff||[]).find(x=>x&&x.sid!=null&&!x.out);if(s){for(let i=0;i<6&&!(s.emo&&s.emo.k==="hon");i++){s.mk=[];s.__mkL=null;s.emo=null;emoEv(s,"loyalDown","bị chủ nhân quát mắng"+(i?" ("+i+")":""))}out.srv=s.emo&&{k:s.emo.k,t:s.emo.t,known:moodCauseKnown(s)}}
  /* NPC parity: a consort slighted by a close friend sulks at HER, not at a stranger */
  const [a,b2,c]=V;const af=(x,y,n)=>{try{x.aff=x.aff||{};}catch(e){}};let ab=0;try{ab=aff(a,b2)}catch(e){}
  try{affAdd(a,b2,60-ab)}catch(e){}for(let i=0;i<6&&!((a.mk||[]).some(m=>m.k==="hon")||a.emo&&a.emo.k==="hon");i++){a.mk=[];a.__mkL=null;a.emo=null;emoEv(a,"slight",`bị ${b2.name} làm nhục (${i})`,emoKey(b2))}out.npc=(()=>{/* r1: the sulk is a cause of its own; the seal shows the strongest SUMMED feeling (a big mưu may outweigh it), so read the hờn cause */const h=(typeof mkCauses==="function"?mkCauses(a):[]).find(m=>m.k==="hon")||a.emo;return h&&{k:h.k,t:h.t,b:emoKey(b2),aff:aff(a,b2),byB:moodCauseKnownBy(b2,a)}})();
  /* sulking blocks friendly acts toward that person (motive gate) */
  try{render()}catch(e){}a.emo={k:"hon",v:60,why:"thử",t:emoKey(b2),w:emoW()};const g=motiveOK(a,b2,"visit");out.gate={ok:g.ok,why:g.why,f95:typeof F95!=="undefined"&&F95.has("visit")};
  B.hon.o=h0;
  /* tears dry fast: the khóc cause has the shortest timer */
  a.mk=[];a.__mkL=null;a.emo=null;emoSet(a,"khoc",60,"thử khóc");const m=a.mk.find(x=>x.k==="khoc");out.decay=[m.k1-m.k0,BAL.mood2.dur.k.khoc];
  out.names=[EMO.khoc,EMO.hon];return out});
 ok(r7.khocHi[0]>=r7.khocHi[1]*.7&&r7.khocLo[0]<=r7.khocLo[1]*.3,'KHÓC: strong sadness turns into tears by BAL odds (clamped)',r7);
 ok(r7.slap&&r7.slap.k==="khoc"&&/tát/.test(r7.slap.why)&&r7.slap.c==="pub"&&r7.slap.known,'KHÓC: a slap brings tears; cause "bị … tát" is public, she (the slapper) knows it',r7.slap);
 ok(!r7.srv||(r7.srv.k==="hon"&&r7.srv.t==="me"&&r7.srv.known),'HỜN: her servant scolded by her sulks AT her; she knows why',r7.srv);
 ok(r7.npc&&r7.npc.k==="hon"&&r7.npc.t===r7.npc.b&&r7.npc.byB,'HỜN NPC: a consort slighted by a close friend sulks at that friend (who knows why)',r7.npc);
 ok(!r7.gate.f95||(r7.gate.ok===false&&/hờn/.test(r7.gate.why)),'HỜN: friendly acts toward that person refused while sulking',r7.gate);
 /* r1: a cause that brings KHÓC: a known cause shows in the mood box on the khóc row, never "Nguyên do chưa rõ" */
 const r8k=await p.evaluate(()=>{const B=BAL.emo2.khoc,o0=B.o,t0=B.tr;B.o=100;B.tr={};const Rv=__M.R();const out=[];
  try{for(let i=0;i<20&&out.length<2;i++){const v=Rv[i%Rv.length];v.emo=null;v.emoH=[];v.mk=[];emoEv(v,"kidDie","mất hoàng tự r8 "+i,null,3);if(!v.emo||v.emo.k!=="khoc")continue;
   S.intel={};intelLearn(v,20,{by:"Tiểu Thúy",how:"Tự đi dò la"});const C=emoCauses(v);out.push({k:moodCauseKnown(v),rows:C.map(x=>x.k+"|"+x.why)})}}finally{B.o=o0;B.tr=t0}return out});
 ok(r8k.length&&r8k.every(x=>x.k&&x.rows.includes("khoc|"+x.k)&&!x.rows.includes("khoc|Nguyên do chưa rõ")),'KHÓC: a known cause shows on the khóc row of the mood box',r8k);
 ok(r7.decay[0]===r7.decay[1]&&r7.names[0]==="Khóc"&&r7.names[1]==="Hờn",'KHÓC lasts BAL.mood2.dur.k.khoc khắc; words Khóc / Hờn',{d:r7.decay,n:r7.names});
 /* 8–13 THE SIMS MODEL (owner OD 17/11 ~18:10Z) */
 const r8=await p.evaluate(()=>{const V=__M.R();const D=BAL.mood2.dur;const out={tab:[]};const go=(p,n)=>{for(const m of p.mk||[]){m.k0-=n;m.k1-=n}p.__mkAt=-1;mkSync(p)};
  /* per-cause timer table */
  const E=[["selfDown","bị giáng phẩm"],["slight","bị ai đó làm nhục"],["kidDie","mất con"],["night","được Hoàng thượng lật thẻ"],["gift","được tặng quà"],["ill","sức khỏe sa sút"]];
  for(const [ev,why] of E){const v=V[1];v.mk=[];v.__mkL=null;v.emo=null;const o=BAL.emo2.khoc.o,h=BAL.emo2.hon.o;BAL.emo2.khoc.o=-999;BAL.emo2.hon.o=-999;emoEv(v,ev,why);BAL.emo2.khoc.o=o;BAL.emo2.hon.o=h;
   const m=(v.mk||[]).find(x=>x.e===ev);if(!m){out.tab.push([ev,"(trait shrug)"]);continue}const d=m.k1-m.k0;go(v,d-1);const live=!!(v.emo&&v.mk.length);go(v,1);out.tab.push([ev,d,D.e[ev],live,!v.emo])}
  /* summed seal */
  const v=V[2];v.mk=[];v.__mkL=null;v.emo=null;emoSet(v,"buon",30,"chuyện A");emoSet(v,"buon",30,"chuyện B");emoSet(v,"gian",50,"chuyện C");out.sum={k:v.emo.k,v:v.emo.v,seal:sealKeyFor(v),list:mkCauses(v).map(x=>[x.k,x.v,x.left])};
  /* the strongest single cause ends → the seal follows the sum that is left */
  const c=v.mk.find(m=>m.why==="chuyện A");c.k1=mkNow();v.__mkAt=-1;mkSync(v);out.after={k:v.emo.k,v:v.emo.v};
  /* decay gone: a week passes for jemo, the feeling stays; her bar = sum of live pushes, a push ends by its khắc */
  out.decayK=Object.values(EMO_DECAY).every(x=>x===Number.MIN_VALUE);const v0=v.emo.v;try{emoWeek()}catch(e){}out.week=[v0,v.emo&&v.emo.v];
  S.mk=[];S.__mkL=null;S.emo=null;mkSync(S);const b0=S.mood.v;const real=mbAdd(20,"thử việc thành","ok");const b1=S.mood.v;const sum=Math.round(S.mk.reduce((a,m)=>a+(m.d||0),0));
  const okm=S.mk.find(m=>m.kd==="ok");go(S,okm.k1-okm.k0);out.bar={b0,real,b1,sum,end:S.mood.v,durOk:okm?D.bar.ok:null,log:S.mood.log.length};
  /* NPC parity: the same event lands with the same timer on her and on a consort */
  S.mk=[];v.mk=[];emoEv(S,"selfUp","được tấn phong");emoEv(v,"selfUp","được tấn phong");const ms=S.mk.find(m=>m.e==="selfUp"),mv=v.mk.find(m=>m.e==="selfUp");out.par=[ms&&ms.k1-ms.k0,mv&&mv.k1-mv.k0,D.e.selfUp];
  return out});
 const tabOk=r8.tab.every(r=>r[1]==="(trait shrug)"||(r[1]===r[2]&&r[3]&&r[4]));
 ok(tabOk&&r8.tab.some(r=>r[1]!=="(trait shrug)"),'timer table: each cause lasts its BAL.mood2.dur khắc, alive one khắc before, gone at the end',r8.tab);
 ok(r8.sum.k==="buon"&&r8.sum.v===60&&r8.sum.seal==="buon"&&r8.sum.list.length===3&&r8.sum.list.every(x=>x[2]>0),'summed seal: buồn 30+30 beats giận 50; tap list = 3 causes with khắc left',r8.sum);
 ok(r8.after.k==="gian"&&r8.after.v===50,'a cause ends → the seal follows what is left',r8.after);
 ok(r8.decayK&&r8.week[0]===r8.week[1],'no whole-bar decay: a tuần passes, the feeling stays until its khắc end',{k:r8.decayK,w:r8.week});
 ok(r8.bar.b1-r8.bar.b0===r8.bar.real&&r8.bar.real>0&&r8.bar.b1===r8.bar.sum&&r8.bar.end===r8.bar.b0,'her bar = sum of live pushes; a push ends by its khắc (no drift)',r8.bar);
 ok(r8.par[0]===r8.par[1]&&r8.par[0]===r8.par[2],'NPC parity: same event, same khắc timer for her and a consort',r8.par);
 const r9=await p.evaluate(()=>{const [v]=__M.R();const W=emoW();v.mk=undefined;delete v.mk;v.__mkL=null;v.emoH=[{k:"buon",v:40,why:"chuyện cũ hôm nay",w:W},{k:"lo",v:30,why:"chuyện cũ lâu rồi",w:W-30}];v.emo={k:"gian",v:50,why:"giận từ hôm qua",w:W-1};
  let err="";let r={};try{const k=sealKeyFor(v);r={k,mk:(v.mk||[]).map(m=>[m.k,m.why,m.k1>mkNow()])};
   delete S.mk;S.__mkL=null;S.emo=null;S.mood={v:-30,log:[{w:W,k:"ok",d:5,why:"việc thành",n:1}]};mkSync(S);r.bar=S.mood.v;r.carry=!!S.mk.find(m=>m.kd==="carry");r.left=S.mood.log.map(x=>x.left)}catch(e){err=String(e)}
  /* the mood box rows say "còn N khắc" */
  let rows="";try{const km=kitModal;kitModal=o=>{window.__spec=o};S.emoSeen[emoKey(v)]=W;window.mckStat&&0;emoBox(emoKey(v));kitModal=km;rows=JSON.stringify(window.__spec.sections)}catch(e){err+=String(e)}
  return Object.assign(r,{err,rows})});
 ok(!r9.err&&r9.mk.some(x=>x[1]==="giận từ hôm qua"&&x[2])&&r9.mk.some(x=>x[1]==="chuyện cũ hôm nay")&&!r9.mk.some(x=>x[1]==="chuyện cũ lâu rồi"),'old save: day-stamped causes → khắc timers (old ones already over); the current feeling kept',r9);
 ok(!r9.err&&r9.bar===-30&&r9.carry,'old save: her old bar is kept (leftover = one "chuyện cũ còn vương" cause)',{bar:r9.bar,carry:r9.carry});
 ok(/còn \d+ khắc/.test(r9.rows),'mood box rows show "còn N khắc"',r9.rows.slice(0,200));
 /* 6 bot days: all known causes true */
 const r6=await p.evaluate(async DAYS=>{const bad=[];let known=0;for(let d=0;d<DAYS;d++){for(let bb=0;bb<4;bb++){Q.length=0;S.mg=0;try{nextBuoi()}catch(e){}Q.length=0}
   for(const v of rivals){const k=moodCauseKnown(v);if(k==null)continue;known++;if(!v.emo||k!==v.emo.why)bad.push([v.name,k])}}
  return {bad,known,stat:mckStat(),dead:!!S.dead}},DAYS);
 ok(!r6.bad.length,'bot: every cause she knows is the real current cause',r6);
 ok(!errs.length,'no page errors',errs.slice(0,5));
 await b.close();const f=res.filter(x=>!x).length;console.log(f?`${f} FAIL`:`ALL ${res.length} PASS`);process.exit(f||errs.length?1:0)})();
