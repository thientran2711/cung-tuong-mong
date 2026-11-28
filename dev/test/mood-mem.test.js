/* MOOD-MEM checks — memories (jmem, layer 2) wake short mood causes (p.mk, layer 1) (jmoodknow.js, BAL.memWake). Jealousy score vs Chạnh lòng feeling: moodknow-step0.test.js
   1 meet: she comes to the place where the remembered person is → a cause on her ("gặp …"), strength / khắc by the memory weight
   2 place: she comes back to where it happened (m.pl) → a cause ("trở lại …"); her own dwelling never wakes
   3 anniversary: same tuần a year later → a cause ("tròn một năm …"), once
   4 monthly cap: no more than BAL.memWake.cap wakes a month per person; per-memory pause BAL.memWake.cd
   5 NPC parity: a consort's memory of another wakes the same way; the woken cause is secret to her, known to the remembered one (moodCauseKnown)
   6 old save: memories without pl / ww, people without mwc → no throw, first look wakes nothing
   7 ghen family: her own score v.pg rises only via pgUp and adds her Chạnh lòng feeling aimed at that consort; the feeling ending never lowers it
   8 bot days: no page errors
   usage: node dev/test/mood-mem.test.js [dev/index.html] [days] → exit 1 on any FAIL or page error */
const {chromium}=require('./lib/dlgs-off').pw('off');/* checks cards / screens: side-line dialogue scenes off (lib/dlgs-off.js) */const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+require('path').resolve(URL0);const DAYS=+process.argv[3]||4;
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;let g=0;do{start();g++}while(isSrv()&&g<30);window.__nlInner=0;window.__bot=1;window.__agAll=1;quiet=false;Q.length=0;try{deal()}catch(e){}render()});
 await p.evaluate(()=>{window.__T={
  R(){return liveRivals(true).filter(v=>v.alive&&!v.out&&!k61Own(v))},
  reset(){__T.L={};for(const v of rivals){v.mk=[];v.emo=null;v.__mkL=null;v.mwc=null;v.mem={}}S.mk=[];S.emo=null;S.__mkL=null;S.mwc=null;for(const k of Object.keys(S.mem||{}))if(/^me\|/.test(k))delete S.mem[k];
   __MW.loc={};__MW.tog={};__MW.at=-1},
  tick(){__MW.at=-1;mwTick()},
  causes(p,re){return (p.mk||[]).filter(m=>m.e==="mem"&&(!re||re.test(m.why)))},
  L:{},where(v,k){this.L[v.id]=k}};
  /* the game moves people by the per-khắc roster (j95 whereOf); the test pins them */
  const w0=whereOf;whereOf=function(p){if(p&&p!==S&&p.id!=null&&__T.L[p.id]!=null)return __T.L[p.id];return w0.apply(this,arguments)}});
 /* 1 meet */
 const r1=await p.evaluate(()=>{__T.reset();const [v]=__T.R();S.place="home";__T.where(v,"tn");const m=memAdd(S,v,"gift",{g:40,x:"trâm ngọc"});__T.tick();const before=__T.causes(S).length;
  S.place="tn";__T.tick();const C=__T.causes(S,/gặp/);const c=C[0];const now=mkNow();
  const B=BAL.memWake;return {before,n:C.length,why:c&&c.why,k:c&&c.k,s:c&&c.s,left:c&&c.k1-now,expS:Math.max(B.s.min,Math.min(B.s.max,Math.round(40*B.s.k))),expD:Math.min(B.dur.max,Math.round(B.dur.base+40*B.dur.k)),seal:sealKeyFor("me"),ww:m.ww,W:wk()}});
 ok(r1.before===0&&r1.n===1&&r1.k==="vui"&&/gặp .*trâm ngọc/.test(r1.why),'meet: a good memory wakes a Vui cause when she meets the person',r1);
 ok(r1.s===r1.expS&&r1.left===r1.expD,'meet: strength and khắc from the memory weight (BAL.memWake.s / dur)',{s:r1.s,expS:r1.expS,left:r1.left,expD:r1.expD});
 /* 2 place */
 const r2=await p.evaluate(()=>{__T.reset();const [v]=__T.R();S.place="tn";__T.where(v,"tn");const m=memAdd(S,v,"provoke",{g:35});const pl=m.pl;
  __T.where(v,"kn");S.place="vuon";__T.tick();S.place="tn";__T.tick();const C=__T.causes(S,/trở lại/);
  /* own dwelling: a memory made at home never wakes by place */
  __T.reset();__T.where(v,"home");S.place="home";const m2=memAdd(S,v,"vent",{g:35});__T.where(v,"kn");S.place="vuon";__T.tick();S.place="home";__T.tick();
  return {pl,n:C.length,why:C[0]&&C[0].why,k:C[0]&&C[0].k,pl2:m2.pl,home:__T.causes(S,/trở lại/).length}});
 ok(r2.pl==="tn"&&r2.n===1&&r2.k==="gian"&&/trở lại/.test(r2.why),'place: memAdd stamps where it happened; coming back wakes a Giận cause',r2);
 ok(r2.pl2==="home"&&r2.home===0,'place: her own dwelling never wakes a memory',r2);
 /* 3 anniversary */
 const r3=await p.evaluate(()=>{__T.reset();const [v]=__T.R();S.place="home";__T.where(v,"kn");const m=memAdd(S,v,"rescue",{g:45});m.w=wk()-12*TUAN.length;__T.tick();const C=__T.causes(S,/tròn một năm/);
  __T.tick();__T.tick();const C2=__T.causes(S,/tròn/);const m2=memAdd(S,__T.R()[1],"care",{g:15});m2.w=wk()-12*TUAN.length;__T.tick();
  return {n:C.length,why:C[0]&&C[0].why,again:C2.length,n2:C2[0]&&C2[0].n,low:__T.causes(S,/hỏi han/).length}});
 ok(r3.n===1&&/tròn một năm/.test(r3.why)&&r3.again===1&&r3.n2===1,'anniversary: same tuần a year later wakes once',r3);
 ok(r3.low===0,'anniversary: a light memory (below BAL.memWake.ann) does not wake',r3);
 /* 4 monthly cap + per-memory pause */
 const r4=await p.evaluate(()=>{__T.reset();const V=__T.R().slice(0,8);S.place="home";V.forEach(v=>__T.where(v,"kn"));V.forEach(v=>memAdd(S,v,"gift",{g:40,x:"lụa"}));__T.tick();
  S.place="kn";__T.tick();const n=__T.causes(S).length;const cap=BAL.memWake.cap;
  /* pause: new month, same memory meets again at once → no wake before cd tuần */
  S.mwc=null;S.place="home";__T.tick();S.place="kn";__T.tick();const n2=__T.causes(S).filter(m=>m.n>1).length;
  return {n,cap,V:V.length,n2,stat:mwStat()}});
 ok(r4.V>r4.cap&&r4.n===r4.cap,'monthly cap: only BAL.memWake.cap wakes a month',r4);
 ok(r4.n2===0,'per-memory pause: the same memory does not wake again before BAL.memWake.cd tuần',r4);
 /* 5 NPC parity */
 const r5=await p.evaluate(()=>{__T.reset();const [v,y]=__T.R();S.place="vuon";__T.where(v,"tn");__T.where(y,"kn");memAdd(v,y,"rumor",{g:50});__T.tick();__T.where(y,"tn");__T.tick();
  const C=__T.causes(v,/gặp/);const cur=v.emo;return {n:C.length,k:C[0]&&C[0].k,why:C[0]&&C[0].why,seal:cur&&cur.k,her:moodCauseKnown(v),y:moodCauseKnownBy(y,v),t:C[0]&&C[0].t,yk:emoKey(y)}});
 ok(r5.n===1&&r5.k==="gian"&&r5.seal==="gian",'NPC parity: a consort meeting the one she remembers wakes the same cause',r5);
 ok(r5.her===null&&r5.y&&/gặp/.test(r5.y),'woken cause feeds moodCauseKnown: secret to her, known to the remembered one',{her:r5.her,y:r5.y});
 /* 6 old save */
 const r6=await p.evaluate(()=>{__T.reset();const [v]=__T.R();S.place="kn";__T.where(v,"kn");const m=memAdd(S,v,"gift",{g:40,x:"quạt"});delete m.pl;delete m.ww;delete S.mwc;
  __MW.loc={};__MW.tog={};let err=null;try{__T.tick();render()}catch(e){err=e.message}return {err,n:__T.causes(S).length}});
 ok(!r6.err&&r6.n===0,'old save: no pl / ww / mwc → no throw, first look wakes nothing',r6);
 /* 7 ghen family: her v.pg */
 const r7=await p.evaluate(()=>{__T.reset();const [v]=__T.R();S.mk=[];mkSync(S);/* review/oan-pace-2: her jealousy follows the ghen pace (band BAL.stp.band.ghen, relative favour, one incident per buổi): same favour as hers, a fresh incident */const fresh=()=>{S.bqN=(S.bqN||0)+1;S.opg={};v.pUc=0;v.sung=S.sung};fresh();const g0=v.pg||0;const d=pgUp(v,8,"thử");const want=(BAL.oanPace&&BAL.oanPace.on)?Math.round(opBand(8,BAL.stp.band.ghen)):8;const c0=(S.mk||[]).find(m=>m.k==="ghen");
  const c=c0&&{why:c0.why,t:c0.t,left:c0.k1-c0.k0};const g1=v.pg;for(const m of S.mk)m.k1=mkNow();mkSync(S);const g2=v.pg;
  S.mk=[];mkSync(S);fresh();rivalNight(v);const n=(S.mk||[]).find(m=>m.k==="ghen");return {d,g0,g1,g2,c,vk:emoKey(v),dur:BAL.mood2.dur.e.ghenUp,night:n&&n.why,pg3:v.pg,step:BAL.mood2.ghen.pgNight,want}});
 ok(r7.d===r7.want&&r7.g1===r7.g0+r7.want&&r7.c&&r7.c.t===r7.vk&&r7.c.left===r7.dur,'ghen family: pgUp raises her score v.pg and adds her Chạnh lòng feeling aimed at that consort',r7);
 ok(r7.g1===r7.g2,'ghen family: her feeling ending never lowers v.pg',{g1:r7.g1,g2:r7.g2});
 ok(r7.night&&/thị tẩm/.test(r7.night),'ghen family: a consort night (rivalNight) raises v.pg through pgUp with its true why',{night:r7.night});
 /* 8 bot days */
 const r8=await p.evaluate(async D=>{let n=0;for(let i=0;i<D*16&&!S.dead;i++){try{if(Q.length){Q.length=0}endTurn();render();n++}catch(e){return {err:e.message,n}}}return {n,stat:mwStat()}},DAYS);
 ok(!r8.err,'bot turns run with MOOD-MEM on',r8);
 ok(errs.length===0,'no page errors',errs.slice(0,3));
 await b.close();const f=res.filter(x=>!x).length;console.log(`${res.length-f}/${res.length} PASS`);process.exit(f||errs.length?1:0)})();
