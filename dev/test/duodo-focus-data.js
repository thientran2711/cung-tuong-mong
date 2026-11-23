/* duodo-focus DATA + RUNNER test (review/duodo-focus; plan dev/handover/reports/duodo-focus.md §PLAN):
   (1) dfActs(i) for every person on several places = the SAME acts as the stage pop-up (talkOpts) + the in-person Hậu cung acts (BAL.df.inPerson) for a consort she stands with;
       groups = kitActCat groups, can/tot counts right, every act has an engine + a class (A/B/C/D), no % in any word;
   (2) class A: inside dfRun the act's odds move exactly ONE ladder step (sgShift / BAL.cut.sgStep: raw 10 up, 5 same, 0 down), outside it nothing changes;
   (3) class B: Tát with raw 10 = BAL.slap tier nặng, skipped = BAL.slap.def (nhẹ), the mark lands on her face (jface t.slap);
   (4) one core: no number typed in jdf.js outside BAL (scan); old save without S.df loads.
   usage: node dev/test/duodo-focus-data.js  (serves the BUILT root) → exit 1 on FAIL */
const {chromium}=require('playwright');const D=require('./lib/device');const fs=require('fs');const path=require('path');
let bad=0;const ok=(c,m,x)=>{console.log((c?'ok   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x):''));if(!c)bad++};
(async()=>{const srv=await D.serveRoot();const b=await chromium.launch();const ctx=await D.newDeviceContext(b,'fold',{deviceScaleFactor:1});const p=await ctx.newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));await p.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)$/,r=>r.abort());
 const g=await D.openHost(p,srv.url);await p.waitForTimeout(3000);
 await g.evaluate(()=>{SLOT=3;window.__forceOrigin='cn';document.getElementById('title').hidden=true;try{store.set(NL_KEY,null)}catch(e){}start()});
 await g.waitForFunction(()=>typeof S==='object'&&S&&S.origin,null,{timeout:60000});await p.waitForTimeout(1500);
 const r=await g.evaluate(()=>{const out={places:{},A:null,B:null};window.__bot=1;
  const go=k=>{Q.length=0;used=0;S.out=0;S.confined=0;S.buoi=0;S.place="home";goTo(k);if(Q[0]&&Q[0].pid==="entpick"){const o=Q[0].opts.find(x=>x.n==="Đi một mình");Q.length=0;o.go()}Q.length=0;S.visit.tk={};S.visit.talked=false};
  for(const k of ["vuon","home","tn","thu","kn"]){try{go(k)}catch(e){out.places[k]={err:e.message};continue}const P=curPeople();const rows=[];
   P.forEach((pp,i)=>{const G=dfActs(i)||[];const n=G.reduce((s,x)=>s+x.tot,0);const dc=document.createElement("div");dc.innerHTML=popCard(pp,i);const tk=[...dc.querySelectorAll("button")].filter(b=>dfIsAct(b)&&(b.firstChild&&b.firstChild.textContent.trim())).length;const ex=G.reduce((s,x)=>s+x.acts.filter(a=>a.id[0]==="a").length,0);
    const bad=[];G.forEach(x=>{if(x.can!==x.acts.filter(a=>!a.off).length)bad.push("count "+x.n);if(!x.n)bad.push("nameless group "+x.k);if(G.filter(y=>y.n===x.n).length>1)bad.push("twin group "+x.n);x.acts.forEach(a=>{if(!a.eng||!a.cls)bad.push("noeng "+a.n);if(/%/.test(a.word+a.ton))bad.push("% "+a.n);if(/[<>]/.test([a.n,a.word,a.ton,a.why].join("")))bad.push("markup in text "+a.n);if(/Đã biết|Chứng cứ|tin ›/.test(a.n))bad.push("info chip as act "+a.n)})});
    rows.push({kind:pp.kind,n,tk,ex,groups:G.map(x=>x.n+" "+x.can+"/"+x.tot),bad})});out.places[k]={place:S.place,rows}}
  /* (1b) one-pane card (after an act / talked, strangers) with notes: the «Đã biết: N tin ›» chip (and «Chứng cứ») is NOT an act */
  {let found=null;for(const k of ["vuon","tn","kn","thu","home"]){if(found)break;go(k);const P=curPeople();
    for(let i=0;i<P.length&&!found;i++){const v=P[i].ref;if(!v||P[i].kind!=="rival")continue;S.notes=S.notes||{};S.notes[v.id]=[{t:"thử 1",d:S.day||0},{t:"thử 2",d:S.day||0}];
     for(const one of [true,false]){S.visit.tk={};if(one)S.visit.tk[i]=1;const d=document.createElement("div");d.innerHTML=popCard(P[i],i);
      if(d.querySelector("[data-kintel]")){const G=dfActs(i)||[];const all=G.flatMap(g=>g.acts);found={place:k,one,kintel:true,panes:d.querySelectorAll(".pcg").length,n:all.length,bad:all.filter(a=>/Đã biết|Chứng cứ|tin ›/.test(a.n)).map(a=>a.n)};break}}
     delete S.notes[v.id];S.visit.tk={}}}
   out.chip=found}
  /* (2) class A */let hit=null;for(const pl of ["vuon","tn","kn","thu","home"]){if(hit)break;go(pl);const P=curPeople();
  P.forEach((pp,i)=>{if(hit)return;talkOpts(pp).forEach((a,j)=>{if(!hit&&!a.lock&&!a.open&&a.o!=null&&a.o<100&&dfCls(a)==="A"&&sgShift(a.o,1)!==a.o&&sgShift(a.o,-1)!==a.o)hit={i,j,n:a.n,o:a.o,id:"go="+j}})});
  }if(hit){const P=curPeople();const pp=P[hit.i];const seen=[];const t0=window.talk;window.talk=function(j){seen.push(talkOpts(pp)[j].o)};
   try{const rets=[];for(const rr of [{raw:10},{raw:5},{raw:0},{skipped:true}]){S.visit.tk={};used=0;Q.length=0;rets.push(dfRun(dfIdx(pp),hit.id,rr)||DF.why)/* her index NOW (the list may shift after each act) */}popIdx=null;hit.rets=rets;hit.dbg={tab,host:!!document.querySelector("#popw .pcpop"),q:Q.length,sigs:[...document.querySelectorAll("#popw .pcpop button")].map(b=>Object.keys(b.dataset).join("+")).slice(0,8)}}finally{window.talk=t0}
   out.A={hit,seen,want:[sgShift(hit.o,1),hit.o,sgShift(hit.o,-1),hit.o],after:talkOpts(pp)[hit.j].o,up:BAL.cut.sgStep}}
  /* (3) class B Tát: a lower-rank consort she stands with */
  const v=liveRivals(true).find(x=>x!==S&&!x.out&&!x.queen&&(typeof k61Named!=="function"||k61Named(x)));if(v){S.rank=Math.max(S.rank,(v.rank||0)+2);v.slap=null;v.loc=null;const here=whereOf(v);S.place=here;const ri=rivals.indexOf(v);const fakeP={kind:"rival",ref:v,name:v.name};S.visit.people.push(fakeP);const pi=S.visit.people.length-1;
   const ok0=ACT.tat.ok(S,v);const G=dfActs(pi)||[];const hasT=G.some(x=>x.acts.some(a=>a.id==="atat"));
   let t1=null,t2=null;if(ok0&&hasT){const f0=ACT.tat.f,seen=[];const r0=window.runAct;window.runAct=function(a,t,k){if(k==="tat"){seen.push(SLAP.next);return""}return r0.apply(this,arguments)};
    const trace=[];const d0=window.doAct;window.doAct=function(i,k){trace.push("doAct "+k+" can="+can(typeof harmK==="function"?harmK(rivals[i],k):1)+" Q="+Q.length);const r=d0.apply(this,arguments);trace.push("after Q="+Q.length+(Q[0]?" "+Q[0].t:""));return r};out.trace=trace;
    try{const tryRun=rr=>{for(let k=0;k<6&&seen.length<(rr.raw?1:2);k++){used=0;S.visit.tk={};Q.length=0;v.slap=null;S.dead=false;S.visit.people[pi]=fakeP;const rv=dfRun(pi,"atat",rr);(out.Btr=out.Btr||[]).push([rr.raw||"skip",rv,DF.why,Q.length,can(1),ACT.tat.ok(S,v),typeof k61Named==="function"&&k61Named(v),SLAPG.busy])}};tryRun({raw:10});tryRun({skipped:true})}finally{window.runAct=r0;window.doAct=d0}t1=seen[0];t2=seen[1]}
   out.B={tr:out.Btr,ok0,hasT,t1,t2,want:[3,BAL.slap.def],together:together(S,v)}}
  return out});
 for(const [k,x] of Object.entries(r.places)){if(x.err){ok(false,`place ${k} opens`,x.err);continue}
  for(const row of x.rows){ok(row.n===row.tk+row.ex&&row.bad.length===0,`${k} ${row.kind}: focus acts = pop-up buttons ${row.tk} + in-person ${row.ex}; ${row.groups.join(" · ")}`,row.bad.length?row.bad:undefined)}}
 ok(r.A&&JSON.stringify(r.A.seen)===JSON.stringify(r.A.want)&&r.A.after===r.A.hit.o,`class A: one ladder step only inside dfRun (${r.A&&r.A.hit.n})`,r.A);
 ok(r.B&&(!r.B.ok0||(r.B.hasT&&r.B.t1===3&&r.B.t2===r.B.want[1])),`class B: Tát tier from the game (raw 10 = nặng, skipped = nhẹ)`,r.B);
 /* (4) one core scan: digits in jdf.js code outside comments, BAL reads, ids and 0/1 */
 const src=fs.readFileSync(path.join(__dirname,'../build/jdf.js'),'utf8').replace(/\/\*[\s\S]*?\*\//g,'').replace(/"[^"]*"|`[^`]*`/g,'""');
 const nums=(src.match(/[^\w.$]\d+(\.\d+)?/g)||[]).map(s=>s.slice(1)).filter(n=>!/^([01]|100)$/.test(n))/* 100 = the game's «sure» mark (o:100) */;ok(nums.length===0,'one core: no typed number in jdf.js',nums);
 ok(r.chip&&r.chip.kintel&&r.chip.bad.length===0,'(1b) one-pane card with notes: «Đã biết» chip shown on the card, NOT an act in the focus',r.chip);
 ok(errs.length===0,'no page error',errs.slice(0,3));await b.close();srv.close();console.log(bad?'FAILED '+bad:'ALL OK');process.exit(bad?1:0)})();
