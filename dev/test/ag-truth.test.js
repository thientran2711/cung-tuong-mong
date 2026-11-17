/* AG-ALL-2c2 checks — NO LIES (OWNER 17/11 ~15:25Z point (4), canon over the "lie" of ~15:00Z): every news reaching her is TRUE.
   A disloyal servant only slacks (no report / a late report) or sells her master out; a failed errand is reported as failed. Same for every NPC master.
   1 loyal servant: a failed scouting is reported as failed ("có đi dò la … nhưng không dò được gì"), naming the real target; a failed listen likewise
   2 slack: a disloyal servant's errand brings the master nothing (no chứng cứ, no report) — never an invented one
   3 late: a half-loyal servant may report a buổi late; the report lands once the buổi turns and is the same true finding
   4 sell: a bought servant sells her master out to the buyer; the buyer hears the truth (here: "X vừa sai nô tỳ đi dò la chủ tử"), the master gets nothing
   5 NPC masters: the same rule (a loyal servant of a consort gives her master the chứng cứ; a disloyal one gives nothing)
   6 bot run: every TIN BÁO item names only real people / real happenings; every chứng cứ from an errand comes from a successful errand that was told
   7 rate: servants' own errands are a believable share of servant deeds (BAL.ag.know.share, % band)
   usage: node dev/test/ag-truth.test.js [dev/index.html] [days] → exit 1 on any FAIL or page error */
const {chromium}=require('playwright');const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+require('path').resolve(URL0);const DAYS=+process.argv[3]||6;
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;let g=0;do{start();g++}while(isSrv()&&g<30);window.__nlInner=0;window.__bot=1;window.__agAll=1;quiet=false;Q.length=0;try{deal()}catch(e){}render()});
 /* helpers in page */
 await p.evaluate(()=>{window.__T={
  srv(){let s=(S.staff||[]).find(x=>x&&x.sid!=null&&!x.out);if(!s){S.staff=S.staff||[];{s={sid:9e5,name:"Tiểu Thúy",role:"maid",loyal:50};S.staff.push(s)}}return s},
  rv(){return liveRivals(true).find(v=>v.alive&&!v.out)},
  bao(){return (S.tb&&S.tb.R||[]).map(x=>x.line)},
  ev(m,t){try{return evG(m,t)}catch(e){return 0}}}});
 /* 1 loyal: failure reported as failure */
 const r1=await p.evaluate(()=>{const s=__T.srv(),t=__T.rv();s.loyal=100;s.spyFor=null;const n0=__T.bao().length;const c=[];
  for(let i=0;i<6;i++)c.push(knErr(s,S,"scoutF",t));const L=__T.bao().slice(n0);const c2=knErr(s,S,"listenF",null);const L2=__T.bao().slice(n0+L.length);
  return {c,c2,L,L2,who:spyWho(t)}});
 const tells=r1.c.filter(x=>x==="tell").length;
 ok(tells>=5&&r1.L.length===tells&&r1.L.every(l=>/có đi dò la .* nhưng không dò được gì/.test(l)&&l.includes(r1.who)),'loyal servant: a failed scouting is reported as failed, naming the real target',{c:r1.c,line:r1.L[0]});
 ok(r1.c2!=="tell"||/chưa nghe được chuyện gì/.test(r1.L2[0]||""),'loyal servant: a failed listen is reported as "nothing heard"',r1.L2[0]);
 /* 2 slack */
 const r2=await p.evaluate(()=>{const s=__T.srv(),t=__T.rv();s.loyal=0;s.spyFor=null;const n0=__T.bao().length;const q0=(S.knQ||[]).length;const e0=__T.ev(S,t);const C={};
  for(let i=0;i<40;i++){const c=knErr(s,S,"scout",t);C[c]=(C[c]||0)+1}
  return {C,rep:__T.bao().length-n0,late:(S.knQ||[]).length-q0,ev:__T.ev(S,t)-e0}});
 ok((r2.C.keep||0)>=30&&r2.rep===(r2.C.tell||0)&&!r2.C.sell,'slack: a disloyal servant mostly keeps it — no report, never an invented one',r2);
 /* 3 late */
 const r3=await p.evaluate(()=>{const s=__T.srv(),t=__T.rv();s.loyal=50;s.spyFor=null;S.knQ=[];let c="",i=0;while(c!=="late"&&i<200){c=knErr(s,S,"scoutF",t);i++}
  const n0=__T.bao().length;const q=S.knQ.length;knFlush();const same=__T.bao().length-n0;const b0=S.buoi;S.buoi=(S.buoi+1)%4;knFlush();const L=__T.bao().slice(n0);S.buoi=b0;return {c,q,same,L,left:S.knQ.length}});
 ok(r3.c==="late"&&r3.q===1&&r3.same===0&&r3.L.length===1&&/không dò được gì/.test(r3.L[0])&&r3.left===0,'late: a half-loyal servant may report a buổi late; the late report is the same true finding',r3.L[0]);
 /* 4 sell: an NPC's bought servant sells her master out to her */
 const r4=await p.evaluate(()=>{const v=__T.rv();v.staff=v.staff||[];let s=v.staff.find(x=>x&&x.sid!=null&&!x.out);if(!s)return {skip:1};const sv={loyal:s.loyal,spy:s.spyFor};s.loyal=0;s.spyFor="me";
  const n0=__T.bao().length;const ev0=__T.ev(v,S);let c="",i=0;while(c!=="sell"&&i<200){c=knErr(s,v,"scout",S);i++}const L=__T.bao().slice(n0);const ev1=__T.ev(v,S);s.loyal=sv.loyal;s.spyFor=sv.spy;return {c,L,dev:ev1-ev0,who:v.name}});
 ok(r4.skip||(r4.c==="sell"&&r4.L.length>=1&&r4.L[r4.L.length-1].includes(r4.who)&&/đi dò la/.test(r4.L[r4.L.length-1])),'sell: a bought servant sells her master out — the buyer hears the truth of the errand',r4.L&&r4.L[r4.L.length-1]);
 /* 5 NPC master: loyal gives chứng cứ, disloyal nothing */
 const r5=await p.evaluate(()=>{const v=__T.rv();const t=liveRivals(true).find(x=>x!==v&&x.alive&&!x.out);const s=(v.staff||[]).find(x=>x&&x.sid!=null&&!x.out);if(!s||!t)return {skip:1};const sv={loyal:s.loyal,spy:s.spyFor};
  s.spyFor=null;const C={hi:{},lo:{}};let eHi=0,eLo=0;const ea=[];const evA0=evA;window.evA=evA=function(a,b,n){ea.push(a===v);return evA0.apply(this,arguments)};
  try{s.loyal=100;for(let i=0;i<20;i++){const c=knErr(s,v,"scout",t);C.hi[c]=(C.hi[c]||0)+1}eHi=ea.filter(x=>x).length;ea.length=0;
   s.loyal=0;for(let i=0;i<20;i++){const c=knErr(s,v,"scout",t);C.lo[c]=(C.lo[c]||0)+1}eLo=ea.filter(x=>x).length}finally{window.evA=evA=evA0;s.loyal=sv.loyal;s.spyFor=sv.spy}
  return {C,eHi,eLo}});
 ok(r5.skip||(r5.eHi===(r5.C.hi.tell||0)&&r5.eHi>=10&&r5.eLo===(r5.C.lo.tell||0)&&r5.eLo<=4),'NPC master: the same rule (loyal → the master gets the chứng cứ; disloyal → nothing)',r5);
 /* 6 + 7 bot run: truth audit + rate */
 const r6=await p.evaluate(async(DAYS)=>{const A={sk:{},bad:[],items:0,ev:0,evBad:0};const names=()=>new Set(consorts().map(c=>c.name).concat(allServ().map(s=>s.name)));
  const r0=asRun;window.asRun=asRun=function(s,o){A.sk[o.sk]=(A.sk[o.sk]||0)+1;return r0.apply(this,arguments)};
  const g0=knErrGive;window.knErrGive=knErrGive=function(s,m,k,t,late){if(k==="scout"||k==="listen"){if(!t||!t.alive||t===m)A.evBad++;A.ev++}return g0.apply(this,arguments)};
  const seen=new Set();tinBaoOn(it=>{A.items++;if(/\{|\}|undefined|null|NaN/.test(it.line))A.bad.push(it.line);if(it.k!=="bao"){const raw=(KN.raw||[]).concat(adHapNow?[]:[]);if(!it.who||!it.who.length)0}});
  for(let d=0;d<DAYS;d++){for(let bb=0;bb<4;bb++){Q.length=0;S.mg=0;try{placeWhere();agFlush()}catch(e){}try{const L=tinBaoList();for(const it of L){if(seen.has(it.id))continue;seen.add(it.id);
     if(it.k!=="bao"){const h=(KN.raw||[]).find(h=>knHid(h)===it.id);const ok2=!!h||it.k==="fest"||it.k==="cold"||it.k1<agKh();if(!ok2)A.bad.push("no happening: "+it.id)}}}catch(e){A.bad.push("err "+e.message)}
    try{nextBuoi()}catch(e){}Q.length=0}}
  window.asRun=asRun=r0;window.knErrGive=knErrGive=g0;
  const E=["listen","scout","watch"];const all=Object.values(A.sk).reduce((a,b)=>a+b,0);const er=E.reduce((a,k)=>a+(A.sk[k]||0),0);
  return {items:A.items,bad:A.bad.slice(0,5),ev:A.ev,evBad:A.evBad,share:all?Math.round(er/all*1000)/10:0,er,all,band:BAL.ag.know.share,st:{tell:KN.stat.e_tell||0,late:KN.stat.e_late||0,keep:KN.stat.e_keep||0,sell:KN.stat.e_sell||0,caught:KN.stat.caught||0},
   }},DAYS);
 console.log('bot: '+JSON.stringify(r6));
 ok(r6.items>0&&!r6.bad.length,'bot run: every TIN BÁO item is about a real happening / real people (no invented news, no broken line)',{items:r6.items,bad:r6.bad});
 ok(r6.evBad===0,'bot run: every finding an errand gives a master is about a real, living other consort',{ev:r6.ev,bad:r6.evBad});
 ok(r6.share>=r6.band[0]&&r6.share<=r6.band[1],'rate: servants\' own errands are a believable share of servant deeds (BAL.ag.know.share)',{share:r6.share,band:r6.band,er:r6.er,all:r6.all,st:r6.st});
 const ae=await p.evaluate(()=>(typeof AG==="object"&&AG.errs)?AG.errs.slice(0,3):[]);
 ok(!errs.length&&!ae.length,'no page errors / agent errors',{page:errs.slice(0,3),ag:ae});
 await b.close();const f=res.filter(x=>!x).length;console.log(f?`AG-TRUTH: ${f} FAIL`:`AG-TRUTH: ALL ${res.length} PASS`);process.exit(f?1:0)})();
