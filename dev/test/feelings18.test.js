/* FEELINGS-18 checks (owner OD 17/11 ~19:10Z + ~19:25Z; jfeel.js, BAL.feel)
   1 the set: EMO = 18 kinds with the VANPHONG names; old keys never stay (dau → buon heavy, muu → none, ghen = Chạnh lòng, khoc → buon)
   2 levels: summed strength of one kind's live causes → nhẹ / vừa / nặng; heavy names
   3 old save: stored causes / p.emo / emoH with old keys are converted on first read
   4 effects: odds by act category (her deck card a.o + NPC runAct), nightCh × Tình tứ, thiện cảm × Vui
   5 intent: born from Giận high + low bar + traits, aimed at the cause's person; NEVER on the face or the card (owner 20:15Z); ends acted / exposed / faded;
     never evidence (no chứng cứ written)
   6 faceKeyFor priority act > strongest feeling (an intent is skipped) + card lines; act face act-<feeling>; fallback art key; NPC parity (servant, Emperor)
   8 acts (owner 20:45Z): 17 acts one per feeling; gate heavy + bar line; khắc timer ends; cooldown; her ≤ meWk a tuần; NPC parity; host-only
   9 seal of anyone she knows always shown (no grey seal); a Người lạ shows none; cause still scouted (owner 20:25Z / 20:35Z)
   7 bot days: no page errors, every feeling key in the set
   usage: node dev/test/feelings18.test.js [dev/index.html] [days] → exit 1 on any FAIL or page error */
const {chromium}=require('./lib/dlgs-off').pw('off');/* checks cards / screens: side-line dialogue scenes off (lib/dlgs-off.js) */const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+require('path').resolve(URL0);const DAYS=+process.argv[3]||4;
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;let g=0;do{start();g++}while(isSrv()&&g<30);window.__nlInner=0;window.__bot=1;quiet=false;Q.length=0;try{deal()}catch(e){}render()});
 await p.evaluate(()=>{window.__F={R(){return liveRivals(true).filter(v=>v.alive&&!v.out&&!v.coop)},clean(v){v.mk=[];v.__mkL=null;v.emo=null;v.fi=null;v.fa=null}}});
 /* 1 the set */
 const r1=await p.evaluate(()=>{const v=__F.R()[0];__F.clean(v);const o={keys:Object.keys(EMO).sort(),names:Object.assign({},EMO)};
  emoSet(v,"dau",50,"mất con (thử)");o.dau=[v.emo.k,v.emo.v];__F.clean(v);emoSet(v,"muu",80,"toan tính (thử)");o.muu=v.emo;__F.clean(v);
  emoSet(v,"ghen",40,"ghen (thử)");o.ghen=v.emo&&v.emo.k;__F.clean(v);emoSet(v,"khoc",40,"khóc (thử)");o.khoc=v.emo&&v.emo.k;return o});
 const WANT=["vui","tutin","hanghai","tinhtu","chuyentam","hungkhoi","tinhnghich","binh","buon","gian","lo","so","hothen","chan","khochiu","choang","hon","ghen"].sort();
 ok(JSON.stringify(r1.keys)===JSON.stringify(WANT),'EMO = the 18 approved kinds',r1.keys);
 ok(r1.names.ghen==="Chạnh lòng"&&r1.names.hon==="Hờn dỗi"&&r1.names.binh==="Bình thản"&&r1.names.tinhtu==="Tình tứ",'VANPHONG names',r1.names);
 ok(r1.dau[0]==="buon"&&r1.dau[1]>=70&&r1.muu===null&&r1.ghen==="ghen"&&r1.khoc==="buon",'old keys convert at emoSet: dau→buon heavy, muu→none, ghen stays (Chạnh lòng), khoc→buon',r1);
 /* 2 levels */
 const r2=await p.evaluate(()=>{const v=__F.R()[0];__F.clean(v);const L=[];emoSet(v,"gian",20,"bị mỉa mai (a)");L.push([feelLv(v,"gian"),faceKeyFor(v).lines[0]]);
  emoSet(v,"gian",25,"bị mỉa mai (b)");L.push([feelLv(v,"gian"),faceKeyFor(v).lines[0]]);emoSet(v,"gian",30,"bị làm nhục (c)");L.push([feelLv(v,"gian"),faceKeyFor(v).lines[0]]);
  return {L,sum:feelSums(v).gian,lv:BAL.feel.lv}});
 ok(r2.L[0][0]===1&&r2.L[1][0]===2&&r2.L[2][0]===3,'level = summed strength of the kind\'s causes (nhẹ → vừa → nặng)',r2);
 ok(r2.L[0][1]==="Cảm xúc: Giận (nhẹ)"&&r2.L[2][1]==="Cảm xúc: Phẫn nộ (nặng)",'card line + heavy name',r2.L.map(x=>x[1]));
 /* 3 old save */
 const r3=await p.evaluate(()=>{const v=__F.R()[1];__F.clean(v);const now=mkNow();v.__feelMig=0;
  v.mk=[{kd:"e:x",k:"dau",s:40,why:"mất con",k0:now,k1:now+50,w:0,n:1},{kd:"e:y",k:"muu",s:60,why:"tính kế",k0:now,k1:now+50,w:0,n:1},{kd:"e:z",k:"ghen",s:30,why:"bị cướp sủng",k0:now,k1:now+50,w:0,n:1}];
  v.emo={k:"muu",v:60,why:"tính kế",mk:1};v.emoH=[{k:"dau",v:40,why:"mất con",w:0}];v.__mkL={k:"muu",v:60};const e=emoGet(v);
  return {mk:v.mk.map(m=>[m.k,m.s]),emo:e&&[e.k,e.v],h:v.emoH.map(h=>h.k),bad:v.mk.some(m=>["dau","muu","khoc"].includes(m.k))}});
 ok(!r3.bad&&r3.mk.some(x=>x[0]==="buon"&&x[1]>=70)&&r3.mk.some(x=>x[0]==="ghen")&&r3.h[0]==="buon"&&r3.emo&&r3.emo[0]==="buon",'old save: stored dau/muu/ghen causes converted on first read',r3);
 /* 4 effects */
 const r4=await p.evaluate(()=>{const v=__F.R()[0];__F.clean(v);const o={};o.none=feelOdPts(v,"Học thêu");emoSet(v,"chuyentam",75,"chép kinh trọn quyển");o.focus=feelOdPts(v,"Học thêu");o.other=feelOdPts(v,"Hạ độc");
  __F.clean(S);S.mk=[];S.emo=null;const D=BAL.feel.od;let fk=null;const a=deck.find(x=>{if(!x||x.o==null||x.o>=100||x.exam||x.o>=BAL.odds.hi-6)return false;const c=kitActCat(String(x.n).replace(/<[^>]+>/g,""));fk=Object.keys(D).find(k=>D[k].c&&D[k].c.includes(c)&&D[k].p[2]>0);return !!fk});o.card=null;
  if(a){const o0=a.o-(a.__fo||0);/* the base odds (a feeling she already had may move it) */emoSet(S,fk,80,"(thử) "+fk);feelDeck();o.card=[o0,a.o,a.__fo];S.mk=[];S.emo=null;feelDeck();o.card.push(a.o)}
  __F.clean(v);const n0=nightCh(v);emoSet(v,"tinhtu",80,"đêm qua được lật thẻ");const n1=nightCh(v);o.night=[n0,n1];
  const y=__F.R()[1];__F.clean(y);const a0=aff(y,v);affAdd(y,v,10);const g0=aff(y,v)-a0;__F.clean(v);emoSet(v,"vui",80,"vui (thử)");const a1=aff(y,v);affAdd(y,v,10);o.aff=[g0,aff(y,v)-a1];return o});
 ok(r4.none===0&&r4.focus>0&&r4.other===0,'Chuyên tâm raises study odds only (by kit category)',r4);
 ok(!r4.card||(r4.card[1]>r4.card[0]&&r4.card[3]===r4.card[0]),'her deck card odds carry Vui and go back when it ends',r4.card);
 ok(r4.night[1]>=r4.night[0],'Tình tứ: tablet chance not lower',r4.night);
 ok(r4.aff[1]>=r4.aff[0],'Vui: thiện cảm gains toward her not lower',r4.aff);
 /* 5 intent */
 const r5=await p.evaluate(()=>{const [v,y]=__F.R();__F.clean(v);__F.clean(y);const o={};const ev0=JSON.stringify(y.ev||null);
  emoSet(y,"gian",50,"bị làm nhục (i)",emoKey(v));emoSet(y,"gian",40,"bị làm nhục (ii)",emoKey(v));o.bar=feelBar(y);
  const o0=BAL.feel.intent.o;BAL.feel.intent.o=100;for(let i=0;i<3&&!y.fi;i++)feelIntentTick(y);BAL.feel.intent.o=o0;o.fi=y.fi&&{t:y.fi.t,from:y.fi.from};o.t=emoKey(v);
  o.face=faceKeyFor(y);o.of=!!feelIntentOf(y);o.ev=JSON.stringify(y.ev||null)===ev0;o.seenFn=typeof window.feelIntentSeen;
  feelActed(y,v,"rumor");o.acted=!y.fi;y.fi={id:99,t:emoKey(v),from:"gian",k0:0,k1:mkNow()+40};try{punish(y,"thử",1)}catch(e){}o.exposed=!y.fi;
  y.fi={id:98,t:emoKey(v),from:"gian",k0:0,k1:mkNow()-1};o.faded=feelIntentOf(y)===null&&!y.fi;return o});
 ok(r5.fi&&r5.fi.t===r5.t&&r5.fi.from==="gian",'intent born from heavy Giận + low bar, aimed at the person who caused it',r5);
 ok(r5.of&&r5.face.kind==="feel"&&r5.face.key==="gian"&&!r5.face.lines.some(l=>/Toan tính|Vẻ mặt/.test(l))&&r5.seenFn==="undefined",'intent NEVER on the face or card: the seal shows the next row (feeling)',r5.face);
 ok(r5.ev,'intent writes no chứng cứ (a clue, never evidence)');
 ok(r5.acted&&r5.exposed&&r5.faded,'intent ends: acted / exposed (punished) / faded',{a:r5.acted,e:r5.exposed,f:r5.faded});
 /* 6 faceKeyFor */
 const r6=await p.evaluate(()=>{const [v,y]=__F.R();__F.clean(y);emoSet(y,"buon",80,"mất người thân");const o={};o.feel=faceKeyFor(y);
  y.fi={id:7,t:emoKey(v),from:"gian",k0:0,k1:mkNow()+40};o.intent=faceKeyFor(y);y.fa={k:"khoc",n:"Khóc suốt đêm",f:"buon",face:"act-buon",k0:mkNow(),k1:mkNow()+4};o.act=faceKeyFor(y);
  y.fa={k:"dapdo",n:"Đập đồ",face:"phanno",k0:mkNow(),k1:mkNow()+4};o.old=faceKeyFor(y);
  y.fa=null;y.fi=null;const s=allServ()[0];if(s){s.mk=[];s.emo=null;emoSet(s,"hothen",50,"bị mắng trước mặt mọi người");o.serv=faceKeyFor(s)}
  S.emp.mk=[];S.emp.emo=null;emoSet(S.emp,"lo",75,"biên ải có biến");o.emp=faceKeyFor(S.emp);o.empKit=kitEmotion(S.emp)&&kitEmotion(S.emp).k;
  o.fbAct=feelFb("act-hothen");o.art=feelArt("act-hothen","");return o});
 ok(r6.feel.kind==="feel"&&r6.feel.key==="buon"&&r6.feel.level===3&&r6.feel.name==="Đau khổ",'feeling seal: dominant kind + level',r6.feel);
 ok(r6.intent.kind==="feel"&&r6.intent.key==="buon",'a live intent is skipped (seal = strongest feeling)',r6.intent);
 ok(r6.act.kind==="act"&&r6.act.key==="act-buon"&&r6.act.fb==="buon"&&r6.act.lines[0]==="Đang: Khóc suốt đêm",'an act outranks the feeling, face act-<feeling>, fallback = that feeling',r6.act);
 ok(r6.old.key==="act-gian",'old-save act (old face key) maps to its feeling act face',r6.old);
 ok(r6.serv&&r6.serv.key==="hothen"&&r6.serv.fb==="buon",'servant parity + fallback art key',r6.serv);
 ok(r6.emp.key==="lo"&&r6.emp.name==="Bấn loạn"&&r6.empKit==="lo",'Emperor uses the full set (no 4-kind map)',{f:r6.emp,k:r6.empKit});
 ok(r6.fbAct==="hothen"&&["act-hothen","hothen","buon"].includes(r6.art),'act art falls back down the chain (act → feeling → nearest painted)',[r6.fbAct,r6.art]);
 /* 8 acts */
 const r8=await p.evaluate(()=>{const o={};const A=BAL.feel.act;const ALL=Object.keys(EMO).filter(k=>k!=="binh");
  o.cover=ALL.filter(k=>!A.main[k]);o.uniq=new Set(Object.values(A.main)).size;o.react=Object.values(A.main).filter(k=>!EA_REACT.some(r=>r.k===k&&r.who==="c"));
  /* odds-cap (j1 roll caps every roll at BAL.odds.hi): A.o=1000 no longer means "always" — each act then failed 1 in 20 (17 feelings → the flaky red). The test's sure odds (A.o 1000 × temper, ≥ 100 = sure before the cap) pass; every other roll is the real one (test only) */const rl0=roll;roll=o=>o>=100||rl0(o);const v=__F.R()[0];const o0=A.o;A.o=1000;try{oanAdd(v,__F.R()[1],60)}catch(e){}const ran={},fail={};const t0=v.bac,mp=moodBar,et=window.eaTemper;window.eaTemper=q=>Object.assign(et(q),{k:"even",stingy:false});
  for(const k of ALL){__F.clean(v);v.fcd={};v.bac=999;v.staff=v.staff&&v.staff.length?v.staff:allServ().slice(0,2);
   const good=feelGood(k);window.moodBar=q=>q===v?(good?90:-90):mp(q);emoSet(v,k,90,"thử "+k,emoKey(__F.R()[1]));
   if(k==="hon"||k==="ghen"){v.mk.forEach(m=>m.t=emoKey(__F.R()[1]))}
   try{feelActTick(v)}catch(e){fail[k]=e.message}ran[k]=v.fa?[v.fa.k,v.fa.face]:null}
  o.ran=ran;o.fail=fail;
  /* gate: heavy but bar not past the line → no act; light level → no act */
  __F.clean(v);v.fcd={};window.moodBar=q=>q===v?-5:mp(q);emoSet(v,"buon",90,"thử");feelActTick(v);o.noBar=!v.fa;
  __F.clean(v);v.fcd={};window.moodBar=q=>q===v?-90:mp(q);emoSet(v,"buon",30,"thử");feelActTick(v);o.light=!v.fa;
  /* timer + cooldown */
  __F.clean(v);v.fcd={};emoSet(v,"buon",90,"thử");feelActTick(v);o.fa=v.fa&&{k:v.fa.k,f:v.fa.f,d:v.fa.k1-v.fa.k0};o.cd=(v.fcd.buon||0)-mkNow();/* STALE-TESTS-7: since TEMPER-OUTBURST (OD 25/11 ~05:45Z) an NPC consort picks ONE of eaOpts by temper (npwPick) — not always «khóc»: the timer is the picked act's own (feelActDur) */o.khK=v.fa?feelActDur(v.fa.k):A.kh.khoc;o.opts=(window.eaOpts?window.eaOpts(v,"buon"):[]).map(r=>r.k);o.cdK=A.cd.def;
  const k1=v.fa&&v.fa.k1;v.fa.k1=mkNow();o.ends=feelActNow(v)===null;feelActTick(v);o.cdBlocks=!v.fa;
  window.moodBar=mp;A.o=o0;v.bac=t0;window.eaTemper=et;
  /* her: at most meWk a tuần */
  const sv=S.mood.v;S.fa=null;S.fcd={};S.fa2=null;S.mk=[];S.emo=null;A.o=1000;let n=0;for(let i=0;i<6;i++){S.fa=null;S.fcd={};S.mood.v=-95;emoSet(S,"buon",90,"thử "+i);feelActTick(S);if(S.fa)n++}
  A.o=o0;S.mood.v=sv;S.fa=null;o.me=n;o.meWk=A.meWk;Q.length=0;
  /* NPC parity: the Emperor fires with his own reaction and the same face */
  S.emp.fa=null;S.emp.fcd={};S.emp.mk=[];S.emp.emo=null;window.moodBar=q=>q===S.emp?-90:mp(q);A.o=1000;emoSet(S.emp,"gian",90,"thử");feelActTick(S.emp);o.emp=S.emp.fa&&[S.emp.fa.k,S.emp.fa.face];
  /* host-only: a co-op guest never writes NPC acts */
  const wo=window.worldOn;window.worldOn=()=>false;const y=__F.R()[1];__F.clean(y);y.fcd={};window.moodBar=q=>q===y?-90:mp(q);emoSet(y,"buon",90,"thử");feelActTick(y);o.guest=!y.fa;window.worldOn=wo;
  window.moodBar=mp;A.o=o0;S.emp.fa=null;roll=rl0;return o});
 ok(r8.cover.length===0&&r8.uniq===17&&r8.react.length===0,'17 acts, one per feeling, every one in the ONE reaction table',r8);
 ok(Object.values(r8.ran).filter(Boolean).length===17&&Object.keys(r8.fail).length===0&&Object.entries(r8.ran).every(([k,x])=>!x||x[1]==="act-"+k),'every feeling fires its own act with face act-<feeling> (heavy + bar)',r8.ran);
 ok(r8.noBar&&r8.light,'gate: heavy level AND bar past the line (neither alone)',{b:r8.noBar,l:r8.light});
 ok(r8.fa&&r8.fa.f==="buon"&&r8.opts.includes(r8.fa.k)&&r8.fa.d===r8.khK&&r8.cd===r8.cdK&&r8.ends&&r8.cdBlocks,'khắc timer (the picked act\'s own) ends, cooldown blocks a new act',r8);
 ok(r8.me<=r8.meWk&&r8.me>=1,'her acts ≤ meWk a tuần',[r8.me,r8.meWk]);
 ok(r8.emp&&r8.emp[1]==="act-gian",'NPC parity: the Emperor acts with his own reaction, same act face',r8.emp);
 ok(r8.guest,'co-op guest writes no NPC act (host-only)');
 /* 9 seal for anyone she knows */
 const r9=await p.evaluate(()=>{const o={};const v=__F.R()[0];__F.clean(v);emoSet(v,"buon",50,"bị Hoàng thượng lạnh nhạt");S.emoSeen={};S.mat=0;
  const ki=window.kitIsKnown;window.kitIsKnown=()=>true;o.known=kitEmotion(v);o.cause=moodCauseKnown(v);o.badge=/kemo-buon/.test(emoBadge(v));window.kitIsKnown=()=>false;o.stranger=kitEmotion(v);o.sbadge=emoBadge(v);window.kitIsKnown=ki;return o});
 ok(r9.known&&r9.known.known===true&&r9.known.k==="buon"&&r9.badge,'known person: seal always shown (no grey seal), even unseen for weeks',r9.known);
 ok(!r9.known.cause||r9.known.cause===r9.cause,'cause still gated by moodCauseKnown',r9);
 ok(r9.stranger===null&&r9.sbadge==="",'Người lạ: no seal',r9);
 /* 7 bot days */
 const r7=await p.evaluate(async(D)=>{const bad=new Set();for(let d=0;d<D*4;d++){try{Q.length=0;nextBuoi();render()}catch(e){bad.add("throw:"+e.message)}
   for(const x of mkAll()){for(const m of x.mk||[])if(m.k&&!EMO[m.k])bad.add(m.k);if(x.emo&&!EMO[x.emo.k])bad.add("emo:"+x.emo.k)}}return {bad:[...bad],stat:feelStat()}},DAYS);
 ok(r7.bad.length===0,'bot days: every feeling key in the set',r7);
 /* review r1: Hờn dỗi at the Emperor (the common sulk) → "bỏ về" costs Sủng; no thiện cảm row keyed "undefined", his rel stays a number */
 const r10=await p.evaluate(()=>{const R0=window.roll,FB=window.feelBar;const out=[];try{window.roll=()=>true;
  for(const v of [S,__F.R()[0]]){__F.clean(v);v.fcd={};if(v===S)S.fa2={w:-1,n:0};emoSet(v,"hon",95,"bị Hoàng thượng quở",emoKey(S.emp));window.feelBar=q=>q===v?-95:FB(q);
   if(v===S)S.sung=Math.max(S.sung||0,20);else v.sung=Math.max(v.sung||0,20);const s0=v===S?S.sung:v.sung;feelActTick(v);/* STALE-TESTS-7: an NPC picks among eaOpts by temper (npwPick; her bot frame too): «bỏ về» is one of them — let them pick again until she takes it (the rule under test: bỏ về costs Sủng) */for(let t=0;t<40&&!(v.fa&&v.fa.k==="bove");t++){v.fa=null;v.fcd={};if(v===S){S.fa2={w:-1,n:0};Q.length=0;if(S.sung<s0)S.sung=s0}else if(v.sung<s0)v.sung=s0;feelActTick(v)}window.feelBar=FB;out.push({act:v.fa&&v.fa.k,dSung:(v===S?S.sung:v.sung)-s0,bad:("undefined" in (S.rl||{}))||("undefined" in (v.rl||{}))||("undefined" in (S.ro||{})),empRel:S.emp.rel})}}
  finally{window.roll=R0;window.feelBar=FB}return out});
 ok(r10.every(x=>x.act==="bove"&&x.dSung<0&&!x.bad&&(x.empRel===undefined||typeof x.empRel==="number"&&!isNaN(x.empRel))),'hờn at the Emperor: bỏ về costs Sủng, no "undefined" relation key',r10);
 ok(errs.length===0,'no page errors',errs.slice(0,5));
 await b.close();const f=res.filter(x=>!x).length;console.log(`${res.length-f}/${res.length} PASS`);process.exit(f?1:0)})();
