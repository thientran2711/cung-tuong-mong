/* parity-facfix (law 1 TWO-WAY + law 11 WHOLE GROUP, LIVE 26/11): «Lập phe cùng» has ONE founding rule (j10 facFrOk) with three roads —
   a friend (liking ≥ «thân»), the same clan (liking ≥ «quen»), a shared enemy (both grudges ≥ «act» on the same consort).
   Each road is set up ALONE (the other two cleared) for HER (Phe phái button in facHTML) and for an NPC founder (jagacts3 p3FacFr = the agent
   option's friend list, and the j10 monthly loop through the same facFrOk); plus the control: no road → no button / not in the list.
   Seeded (Math.random) so the drawn world is the same every run.  usage: node dev/test/fac-roads-play.js [dev/index.html]  → exit 1 on FAIL */
const path=require('path');const {chromium}=require('playwright');const HTML=process.argv[2]||'dev/index.html';
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.route(u=>/^https?:/.test(u.href)||/\.(webp|png|jpg|mp3|ogg|mp4|webm)$/.test(u.pathname),r=>r.abort());
 await p.goto('file://'+path.resolve(HTML),{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 const r=await p.evaluate(()=>{let sd=20261126;Math.random=()=>{sd=(sd*16807)%2147483647;return (sd-1)/2147483646};localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();
  for(let i=0;i<60&&isSrv();i++)start();window.__nlInner=0;window.__bot=1;quiet=false;Q.length=0;try{render()}catch(e){}
  S.rank=7;S.queen=true;for(const x of rivals)if(x!==S)x.queen=false;S.kh=0;try{used=0}catch(e){}S.facs=[];S.origin=S.origin||{};S.origin.k="tt";
  const L=liveRivals(true).filter(v=>v!==S&&!v.out&&!sameHouse(S,v));const x=L[0],v=L.find(y=>y!==x&&!sameHouse(y,x)),e=L.find(y=>y!==x&&y!==v);
  const K=k61S();if(K){K[kOf61(x)]=3;K[kOf61(e)]=3}
  const CL=CLANS.find(c=>c!=="Tể tướng")||"Hàn lâm";const TH=(w,k)=>netTh(w,k);const out={x:x.name,v:v&&v.name,e:e&&e.name,ok:typeof facFrOk==="function"};
  const clear=()=>{for(const p of [S,x,v,e]){if(p===S){S.ro={};S.rl=S.rl||{}}else{p.ro={};p.rl=p.rl||{}}}x.clan=CL;v.clan=CLANS.find(c=>c!==CL&&c!=="Tể tướng")||"?";
   x.rel=Math.min(TH(x,"quen"),TH(x,"than"))-10;v.rl[x.id]=Math.min(TH(v,"quen"),TH(v,"than"))-10};
  const her=()=>new RegExp('data-fa="lap" data-fv="'+x.id+'"').test(facHTML());const npc=()=>p3FacFr(v).includes(x);
  const row=(nm,set)=>{clear();set();out[nm]={her:her(),herRule:facFrOk(S,x),npc:npc(),npcRule:facFrOk(v,x)}};
  row("none",()=>{});
  row("friend",()=>{x.rel=TH(x,"than");v.rl[x.id]=TH(v,"than")});
  row("clan",()=>{x.clan="Tể tướng";x.rel=TH(x,"quen");v.clan=x.clan;v.rl[x.id]=TH(v,"quen")});
  row("clanLow",()=>{x.clan="Tể tướng";v.clan=x.clan});/* same clan but liking under «quen» → no road */
  row("enemy",()=>{S.ro[e.id]=TH(S,"act");x.ro[e.id]=TH(x,"act");v.ro[e.id]=TH(v,"act")});
  row("enemyOne",()=>{S.ro[e.id]=TH(S,"act");v.ro[e.id]=TH(v,"act")});/* only the founder holds the grudge → no road */
  /* a road found → the button asks through rcvAsk facFound (the same act as before) */
  clear();x.clan="Tể tướng";x.rel=TH(x,"quen");let asked=0;const RA=window.rcvAsk;window.rcvAsk=function(k,a,t){if(k==="facFound"&&a===S&&t===x)asked++;return RA.apply(this,arguments)};
  try{facAct("lap",{fv:String(x.id)})}finally{window.rcvAsk=RA}Q.length=0;out.asked=asked;
  out.empty=/Cần một phi tần thân với ngươi, cùng dòng họ, hoặc chung một mối thù để lập phe\./.test((()=>{S.facs=[];for(const y of liveRivals(true))if(y!==S){y.rel=-50;y.ro={}}S.ro={};return facHTML()})());
  return out});
 ok(r.ok,'one founding rule facFrOk exists (j10)',r.ok);
 for(const k of ["friend","clan","enemy"])ok(r[k].her&&r[k].herRule&&r[k].npc&&r[k].npcRule,`road «${k}» alone: her button shows AND the NPC founder has her in the list (the same rule)`,r[k]);
 for(const k of ["none","clanLow","enemyOne"])ok(!r[k].her&&!r[k].herRule&&!r[k].npc&&!r[k].npcRule,`no road («${k}»): no button for her, not in the NPC list`,r[k]);
 ok(r.asked===1,'a road-2 (clan) button asks through rcvAsk facFound (the 4-answer receiver card), the same act as the friend road',r.asked);
 ok(r.empty,'no candidate: the line names the three roads',r.empty);
 ok(errs.length===0,'no page errors',errs.slice(0,3));
 await b.close();const f=res.filter(x=>!x).length;console.log(f?f+' FAIL':'ALL PASS');process.exit(f?1:0)})();
