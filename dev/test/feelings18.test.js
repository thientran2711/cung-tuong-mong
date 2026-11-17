/* FEELINGS-18 checks (owner OD 17/11 ~19:10Z + ~19:25Z; jfeel.js, BAL.feel)
   1 the set: EMO = 18 kinds with the VANPHONG names; old keys never stay (dau → buon heavy, muu → none, ghen = Chạnh lòng, khoc → buon)
   2 levels: summed strength of one kind's live causes → nhẹ / vừa / nặng; heavy names
   3 old save: stored causes / p.emo / emoH with old keys are converted on first read
   4 effects: odds by act category (her deck card a.o + NPC runAct), nightCh × Tình tứ, thiện cảm × Vui
   5 intent: born from Giận high + low bar + traits, aimed at the cause's person; seen by odds vs Tâm cơ (hashed, stable); ends acted / exposed / faded;
     never evidence (no chứng cứ written)
   6 faceKeyFor priority act > visible intent > feeling + card lines; fallback art key; NPC parity (servant, Emperor)
   7 bot days: no page errors, every feeling key in the set
   usage: node dev/test/feelings18.test.js [dev/index.html] [days] → exit 1 on any FAIL or page error */
const {chromium}=require('playwright');const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+require('path').resolve(URL0);const DAYS=+process.argv[3]||4;
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
  const tc=y.tamco;y.tamco=0;const s0=[0,1,2].map(()=>feelIntentSeen(y,S));y.tamco=999;const s1=[0,1,2].map(()=>feelIntentSeen(y,S));y.tamco=tc;o.seen=[s0,s1];
  o.face=faceKeyFor(y);o.ev=JSON.stringify(y.ev||null)===ev0;
  feelActed(y,v,"rumor");o.acted=!y.fi;feelIntentTick(y);o.reborn=!!y.fi;y.fi={id:99,t:emoKey(v),from:"gian",k0:0,k1:mkNow()+40};try{punish(y,"thử",1)}catch(e){}o.exposed=!y.fi;
  y.fi={id:98,t:emoKey(v),from:"gian",k0:0,k1:mkNow()-1};o.faded=feelIntentSeen(y,S)===false&&!y.fi;return o});
 ok(r5.fi&&r5.fi.t===r5.t&&r5.fi.from==="gian",'intent born from heavy Giận + low bar, aimed at the person who caused it',r5);
 ok(r5.seen[0].every(x=>x===r5.seen[0][0])&&r5.seen[1].every(x=>!x),'face shows it by odds vs Tâm cơ, one stable draw; high Tâm cơ hides it',r5.seen);
 ok(r5.ev,'intent writes no chứng cứ (a clue, never evidence)');
 ok(r5.acted&&r5.exposed&&r5.faded,'intent ends: acted / exposed (punished) / faded',{a:r5.acted,e:r5.exposed,f:r5.faded});
 /* 6 faceKeyFor */
 const r6=await p.evaluate(()=>{const [v,y]=__F.R();__F.clean(y);emoSet(y,"buon",80,"mất người thân");const o={};o.feel=faceKeyFor(y);
  y.tamco=0;for(let id=7;id<60;id++){y.fi={id,t:emoKey(v),from:"gian",k0:0,k1:mkNow()+40};if(feelIntentSeen(y,S))break}/* a stable draw per intent: take one the face shows */o.intent=faceKeyFor(y);y.fa={k:"khoc",n:"Khóc",face:"khoc",k0:mkNow(),k1:mkNow()+4};o.act=faceKeyFor(y);
  y.fa=null;y.fi=null;const s=allServ()[0];if(s){s.mk=[];s.emo=null;emoSet(s,"hothen",50,"bị mắng trước mặt mọi người");o.serv=faceKeyFor(s)}
  S.emp.mk=[];S.emp.emo=null;emoSet(S.emp,"lo",75,"biên ải có biến");o.emp=faceKeyFor(S.emp);o.empKit=kitEmotion(S.emp)&&kitEmotion(S.emp).k;return o});
 ok(r6.feel.kind==="feel"&&r6.feel.key==="buon"&&r6.feel.level===3&&r6.feel.name==="Đau khổ",'feeling seal: dominant kind + level',r6.feel);
 ok(r6.intent.kind==="intent"&&r6.intent.key==="toantinh"&&r6.intent.fb==="muu"&&r6.intent.lines.includes("Vẻ mặt: Toan tính"),'visible intent outranks the feeling',r6.intent);
 ok(r6.act.kind==="act"&&r6.act.key==="khoc"&&r6.act.lines[0]==="Đang: Khóc",'an act outranks all',r6.act);
 ok(r6.serv&&r6.serv.key==="hothen"&&r6.serv.fb==="buon",'servant parity + fallback art key',r6.serv);
 ok(r6.emp.key==="lo"&&r6.emp.name==="Bấn loạn"&&r6.empKit==="lo",'Emperor uses the full set (no 4-kind map)',{f:r6.emp,k:r6.empKit});
 /* 7 bot days */
 const r7=await p.evaluate(async(D)=>{const bad=new Set();for(let d=0;d<D*4;d++){try{Q.length=0;nextBuoi();render()}catch(e){bad.add("throw:"+e.message)}
   for(const x of mkAll()){for(const m of x.mk||[])if(m.k&&!EMO[m.k])bad.add(m.k);if(x.emo&&!EMO[x.emo.k])bad.add("emo:"+x.emo.k)}}return {bad:[...bad],stat:feelStat()}},DAYS);
 ok(r7.bad.length===0,'bot days: every feeling key in the set',r7);
 ok(errs.length===0,'no page errors',errs.slice(0,5));
 await b.close();const f=res.filter(x=>!x).length;console.log(`${res.length-f}/${res.length} PASS`);process.exit(f?1:0)})();
