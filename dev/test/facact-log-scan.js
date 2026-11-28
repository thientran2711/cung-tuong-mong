/* facact-log-scan (E-F4FAC, law 6c + law 11): every Phe phái act of HERS (j10 facAct: lap · moi · xin · roi · ban · ly · hop · gach) that spends khắc
   must leave a Sổ ghi line the player sees, for EVERY answer of the receiver (yes / qua loa / no / mách) — never a silent spend.
   Table row per act×answer: khắc spent · log lines. The receiver's answer is forced through jrcv rcvPick (the 4 answers of RCVK.*).
   usage: node dev/test/facact-log-scan.js [dev/index.html] [label]  → exit 1 when a spend has no log line */
const path=require('path');const {chromium}=require('./lib/dlgs-off').pw('off');/* checks cards / screens: side-line dialogue scenes off (lib/dlgs-off.js) */const HTML=process.argv[2]||'dev/index.html';const LAB=process.argv[3]||'';
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.route(u=>/^https?:/.test(u.href)||/\.(webp|png|jpg|mp3|ogg|mp4|webm)$/.test(u.pathname),r=>r.abort());
 await p.goto('file://'+path.resolve(HTML),{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{window.__seed=s=>{let sd=s;Math.random=()=>{sd=(sd*16807)%2147483647;return (sd-1)/2147483646}};__seed(20261127);localStorage.clear();SLOT=4;
  document.getElementById('title').hidden=true;window.__nlInner=1;start();for(let i=0;i<60&&isSrv();i++)start();window.__nlInner=0;window.__bot=1;quiet=false;Q.length=0;try{render()}catch(e){}});
 const rows=await p.evaluate(()=>{const rows=[];let FORCE=-1;const RP=window.rcvPick;
  window.rcvPick=function(t,a,O,kind){const c=RP.apply(this,arguments);if(FORCE<0)return c;const L=(O||[]).filter(o=>o&&!(typeof o.lk==="function"&&o.lk()));return L[FORCE]||c};
  const LG=window.log;let LOG=[];window.log=function(x){LOG.push(String(x).replace(/<[^>]+>/g,''));return LG.apply(this,arguments)};
  const reset=s=>{__seed(s);S.facs=[];S.rank=7;S.queen=true;for(const x of rivals)if(x!==S)x.queen=false;S.kh=0;try{used=0}catch(e){}Q.length=0;for(const x of liveRivals(true))if(x!==S)x.p3FacM=-1};
  const L=()=>liveRivals(true).filter(x=>x!==S&&!x.out&&!sameHouse(S,x));
  const run=(act,ans,setup,args)=>{reset(100+ans+act.length);FORCE=ans;const ctx=setup();LOG=[];const u0=used;let err="";try{facAct(act.replace(/\(.*/,""),args(ctx))}catch(e){err=String(e.message).slice(0,60)}
   rows.push({act,ans:ans<0?"-":["yes","qua loa","no","mách"][ans],khac:used-u0,log:LOG.slice(0,2).map(s=>s.slice(0,70)),err});FORCE=-1};
  const ANS=[0,1,2,3];
  for(const a of ANS)run("lap",a,()=>{const t=L()[0];affAdd(t,S,40);const K=k61S();if(K)K[kOf61(t)]=3;return{t}},c=>({fv:String(c.t.id)}));
  for(const a of ANS)run("moi",a,()=>{const [m,t]=L();found(S,m);return{t}},c=>({fv:String(c.t.id)}));
  for(const a of ANS)run("xin",a,()=>{const [l,m]=L();found(l,m);affAdd(l,S,40);return{f:facOf(l)}},c=>({ff:String(c.f.id)}));
  run("roi",-1,()=>{const [a1,a2]=L();found(S,a1);joinFac(a2,facOf(S))},()=>({}));
  run("ban",-1,()=>{const [a1,a2]=L();found(S,a1);joinFac(a2,facOf(S))},()=>({}));
  run("ly",-1,()=>{const [a1,a2,a3]=L();found(a1,a2);joinFac(a3,facOf(a1));return{f:facOf(a1)}},c=>({ff:String(c.f.id)}));
  run("hop",-1,()=>{const [a1,a2,a3]=L();found(S,a1);joinFac(a2,facOf(S));return{t:a3}},c=>({fv:String(c.t.id)}));
  run("gach",-1,()=>{const [a1,a2]=L();found(S,a1);joinFac(a2,facOf(S));a2.out=true;/* the button shows only for a member in lãnh cung */return{t:a2}},c=>({fv:String(c.t.id)}));
  /* guards (the ticket «no / hẹn returns "» ): an answer whose text is empty, and an act that cannot run (divide with < 2 other members) */
  {const O0=RCVK.facFound.opts;RCVK.facFound.opts=(p,t)=>[{i:1,id:"half",n:"Hẹn để sau",go:()=>({ok:1,r:""})}];
   run("lap(empty answer)",-1,()=>{const t=L()[0];affAdd(t,S,40);const K=k61S();if(K)K[kOf61(t)]=3;return{t}},c=>({fv:String(c.t.id)}));RCVK.facFound.opts=O0}
  run("ly(no pair left)",-1,()=>{const [a1,a2]=L();found(a1,a2);const f=facOf(a1);f.m=f.m.filter(k=>k!==key(a2));return{f}},c=>({ff:String(c.f.id)}));
  /* her lãnh cung letters (j14 coldFacActs: the same facAct family by letter, 2 khắc spent by the card runner): go() must leave a line */
  const cold=(name,ans,setup,pickN)=>{reset(200+ans+name.length);FORCE=ans;const ctx=setup();S.out=true;S.coldTurn=S.turn;S.maid=S.maid||null;let r="",err="";LOG=[];
   try{const A=coldActsOf(S).filter(a=>pickN.test(a.n));const a=A[0];if(!a)err="no card";else r=a.go()}catch(e){err=String(e.message).slice(0,60)}
   rows.push({act:"cold:"+name,ans:ans<0?"-":["yes","qua loa","no","mách"][ans],khac:2,log:LOG.slice(0,2).map(s=>s.slice(0,70)),err});S.out=false;S.coldTurn=null;FORCE=-1};
  for(const a of ANS)cold("xin",a,()=>{const [l,m]=L();found(l,m);affAdd(l,S,60)},/xin vào/);
  cold("roi",-1,()=>{const [a1,a2]=L();found(a1,S)},/xin rời/);
  cold("tố",-1,()=>{const [a1,a2]=L();found(a1,S);joinFac(a2,facOf(a1))},/tố/);
  /* an invalid / no-op target: the khắc is refunded or a line says why */
  window.rcvPick=RP;window.log=LG;return rows});
 let bad=0;console.log('== facact-log-scan '+LAB);console.log('act | answer | khắc spent | log lines');
 for(const r of rows){const f=r.khac>0&&!r.log.length;if(f)bad++;console.log([r.act,r.ans,r.khac,r.log.length?r.log.join(' // '):'(none)'+(r.khac>0?'  <== SILENT SPEND':''),r.err].join(' | '))}
 console.log('silent spends',bad,'page errors',errs.length,errs.slice(0,2));await b.close();process.exit(bad||errs.length?1:0)})();
