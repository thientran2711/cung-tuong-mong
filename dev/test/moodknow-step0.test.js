/* MOODKNOW step 0 checks (jmoodknow ghenFeel / moodBar, j1 ghenUp, jemoact gates; owner s35 Lượt 41 + OD 17/11 ~18:33Z (1) + ~18:38Z)
   1 ghenUp raises the SCORE and adds a short Chạnh lòng FEELING cause (true why, aimed at 'by', khắc timer BAL.mood2.dur.e.ghenUp); ghenAll / p3GhenAll / site calls too
   2 the feeling ending never lowers the score; lowering the score never touches the feeling
   3 runtime probe: over bot days every RAISE of a consort's v.ghen goes through ghenUp (setter probe, stack check)
   4 MOOD BAR = signed sum of active causes (her S.mood.v and NPC moodBar): good feelings +, bad −, bar pushes d
   5 emotion acts / outbursts need BOTH the bar past its line AND the matching dominant feeling (hers eaMine; NPC eaBarOk)
   usage: node dev/test/moodknow-step0.test.js [dev/index.html] [days] → exit 1 on any FAIL or page error */
const {chromium}=require('./lib/dlgs-off').pw('off');/* checks cards / screens: side-line dialogue scenes off (lib/dlgs-off.js) */const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+require('path').resolve(URL0);const DAYS=+process.argv[3]||4;
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;let g=0;do{start();g++}while(isSrv()&&g<30);window.__nlInner=0;window.__bot=1;window.__agAll=1;quiet=false;Q.length=0;try{deal()}catch(e){}render();
  window.__T={R(){return liveRivals(true).filter(v=>v.alive&&!v.out)},clr(p){p.mk=[];p.emo=null;p.__mkL=null},gh(p){return (p.mk||[]).filter(m=>m.k==="ghen"&&m.e==="ghenUp")}}});
 /* 1 */
 /* review/pace-all: a rise toward her slows near the top (BAL.oanCool.ghen.dm, j1 ghenUp; fractions carry in v.gUc) — expected values read that rule */
 const r1=await p.evaluate(()=>{const M=BAL.oanCool.ghen.dm,GP=BAL.oanPace&&BAL.oanPace.on&&BAL.oanPace.ghen,F=(g,n,b)=>Math.round((GP&&!b?opBand(n,BAL.stp.band.ghen):n)*Math.max(M.min,1-Math.pow(g/100,M.pow)));/* review/oan-pace-2: + the ghen size band (BAL.oanPace.ghen.band; ghenAll bands once in ghenN) and rounding (j1 ghenUp); each check = a fresh incident, same favour as hers */const fresh=()=>{S.bqN=(S.bqN||0)+1;__T.R().forEach(x=>{x.opg={};x.sung=S.sung})};window.__F=F;window.__fresh=fresh;const [v,y]=__T.R();__T.clr(v);fresh();v.ghen=20;v.gUc=0;const d=ghenUp(v,10,"thấy ngươi được tấn phong",S);const dx=F(20,10);const vg=v.ghen;const c=__T.gh(v)[0];const left=c&&c.k1-c.k0;
  const ex={why:c&&c.why,t:c&&c.t,left,dur:BAL.mood2.dur.e.ghenUp,s:c&&c.s,name:EMO.ghen,seal:emoGet(v).k};
  __T.R().forEach(__T.clr);__T.R().forEach(x=>x.gUc=0);fresh();const g0=__T.R().map(x=>x.ghen||0);ghenAll(BAL.ghen.rankUp,"ngươi được tấn phong");const all=__T.R().every((x,i)=>(x.ghen||0)===Math.min(100,g0[i]+F(g0[i],ghenN(BAL.ghen.rankUp),1))||g0[i]>=100||F(g0[i],ghenN(BAL.ghen.rankUp),1)===0)&&__T.R().filter(x=>(x.ghen||0)<100).every(x=>__T.gh(x).length===1);
  __T.clr(y);fresh();const o=apHostOpts(y)[0];o.go();const site=__T.gh(y)[0];
  __T.clr(y);const g1=y.ghen||0;p3GhenAll(v,BAL.ghen.dance,`${v.name} múa được Hoàng thượng khen`);const p3=__T.gh(y)[0];
  return {d,dx,v:vg,ex,all,site:site&&{why:site.why,t:site.t},p3:p3&&{why:p3.why,t:p3.t},vk:emoKey(v)}});
 ok(r1.d===r1.dx&&r1.dx>0&&r1.v===20+r1.dx&&r1.ex.why==="thấy ngươi được tấn phong"&&r1.ex.t==="me"&&r1.ex.left===r1.ex.dur&&r1.ex.seal==="ghen",'ghenUp: score +10 × the near-top slowdown (BAL.oanCool.ghen.dm) and a Chạnh lòng cause (true why, aimed at her, BAL timer)',r1.ex);
 ok(r1.ex.name==="Chạnh lòng",'feeling name = Chạnh lòng (EMO_GHEN); the score keeps "Ghen"',r1.ex.name);
 ok(r1.all,'ghenAll: every consort gets the score AND one feeling cause',r1.all);
 ok(r1.site&&r1.site.t==="me"&&/nhịn/.test(r1.site.why),'a routed site (j24 Nhịn): feeling with its own why',r1.site);
 ok(r1.p3&&r1.p3.t===r1.vk,'an NPC cause (p3GhenAll): the feeling aims at that NPC',r1.p3);
 /* 2 */
 const r2=await p.evaluate(()=>{const F=window.__F;const [v]=__T.R();__T.clr(v);window.__fresh();v.ghen=40;v.gUc=0;ghenUp(v,10,"thử",S);const e1=40+F(40,10);const g1=v.ghen;for(const m of v.mk)m.k1=mkNow();mkSync(v);const g2=v.ghen,seal=emoGet(v).k;
  v.gUc=0;window.__fresh();const e3=g2+F(g2,5)-20;ghenUp(v,5,"thử lần hai",S);v.ghen=cl(v.ghen-20,0,100);const still=__T.gh(v).length;return {g1,g2,e1,e3,seal,still,g3:v.ghen}});
 ok(r2.g1===r2.e1&&r2.g2===r2.e1&&r2.seal==="binh",'the feeling ending never lowers the score',r2);
 ok(r2.still===1&&r2.g3===r2.e3,'lowering the score never touches the feeling',r2);
 /* 4 bar */
 const r4=await p.evaluate(()=>{const [v]=__T.R();__T.clr(S);__T.clr(v);const W=BAL.mood.emo;
  emoSet(S,"gian",60,"bị làm nhục");emoSet(S,"vui",40,"được ban thưởng");mkSync(S);const exp=Math.round(W.gian*60+W.vui*40);const her=S.mood.v;
  emoSet(v,"buon",50,"bị giáng");emoSet(v,"vui",30,"được khen");const nb=moodBar(v),nexp=Math.round(W.buon*50+W.vui*30);
  for(const m of v.mk)m.k1=mkNow();const after=moodBar(v);return {her,exp,nb,nexp,after}});
 ok(r4.her===r4.exp,'her bar = signed sum of active feeling causes (BAL.mood.emo × strength)',r4);
 ok(r4.nb===r4.nexp&&r4.after===0,'NPC bar (moodBar) the same rule; ended causes leave the bar',r4);
 /* 5 gates */
 const r5=await p.evaluate(()=>{const [v]=__T.R();const out=[];const L=BAL.ea.npc.bar.out;
  const me=(k,bar)=>{__T.clr(S);emoSet(S,k,80,"thử");mkSync(S);const d=bar-S.mood.v;mkBar(d,"thử bar","x:test");mkSync(S);return {k,bar:S.mood.v,g:eaMine().g,cards:eaCards().map(c=>c.ea)}};
  out.push(me("vui",-70));out.push(me("gian",-70));out.push(me("buon",-70));out.push(me("gian",0));out.push(me("vui",70));out.push(me("khoc",-70));out.push(me("hon",-70));
  __T.clr(v);emoSet(v,"gian",100,"thử");emoSet(v,"gian",100,"thử 2");emoSet(v,"gian",100,"thử 3");const b1=moodBar(v),okOut=eaBarOk(v,"gian",L),okVui=eaBarOk(v,"vui",BAL.ea.npc.bar.act);
  __T.clr(v);emoSet(v,"gian",80,"thử");const b2=moodBar(v),weak=eaBarOk(v,"gian",L);
  return {out,b1,okOut,okVui,b2,weak,L}});
 const [lowVui,lowGian,lowBuon,calmGian,highVui,lowKhoc,lowHon]=r5.out;
 ok(lowVui.g===null&&lowVui.cards.length===0,'her: low bar + dominant Vui → no emotion act (feeling must match)',lowVui);
 ok(lowGian.g==="gian"&&lowGian.cards.includes("dapdo"),'her: low bar + Giận → Đập đồ',lowGian);
 ok(lowBuon.g==="buon"&&lowBuon.cards.includes("khoc"),'her: low bar + Buồn → Khóc thầm',lowBuon);
 ok(calmGian.g===null,'her: Giận but the bar not past its line → no act',calmGian);
 ok(highVui.g==="vui",'her: high bar + Vui → joyful act',highVui);
 ok(lowKhoc.g==="buon"&&lowKhoc.cards.includes("khoc"),'her: low bar + Khóc seal → buồn acts (reviewer r1: khóc must not block them)',lowKhoc);
 ok(lowHon.g==="gian",'her: low bar + Hờn seal → giận group',lowHon);
 ok(r5.okOut&&!r5.okVui&&!r5.weak,'NPC: outburst gate = bar past out.v on the feeling\'s side; one feeling alone below the line → none',r5);
 /* 3 runtime probe */
 const r3=await p.evaluate(async D=>{const bad=[],good={n:0};const hook=v=>{let val=v.ghen||0;Object.defineProperty(v,"ghen",{configurable:true,enumerable:true,get(){return val},set(x){if(x>val){const st=new Error().stack||"";if(/ghenUp/.test(st))good.n++;else bad.push(st.split("\n").slice(2,4).join(" | ").slice(0,200))}val=x}})};
  for(const v of rivals)hook(v);let n=0;for(let i=0;i<D*16&&!S.dead;i++){try{Q.length=0;endTurn();render();n++}catch(e){return {err:e.message,n}}for(const v of rivals){const d=Object.getOwnPropertyDescriptor(v,"ghen");if(!d||!d.set)hook(v)}}
  for(const v of rivals){const x=v.ghen;delete v.ghen;v.ghen=x}return {n,good:good.n,bad:bad.length,ex:bad.slice(0,3),feel:mckStat().ghenUp}},DAYS);
 /* review/pace-all: a jealousy CAUSED BY ANOTHER CONSORT no longer raises the score toward her (it is oán toward that consort), so quiet bot days may raise nothing: ghenUp must still have been called */
 ok(!r3.err&&r3.bad===0&&(r3.good>0||r3.feel>0),'runtime probe: every raise of v.ghen in bot days went through ghenUp',r3);
 ok(errs.length===0,'no page errors',errs.slice(0,3));
 await b.close();const f=res.filter(x=>!x).length;console.log(`${res.length-f}/${res.length} PASS`);process.exit(f||errs.length?1:0)})();
