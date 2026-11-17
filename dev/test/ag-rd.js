/* AG-ALL-2 part 2b — the owner's Ngự hoa viên scenario (OD 17/11 ~15:25Z (2)) as an automated test. node dev/test/ag-rd.js [dev/index.html] [runs]
   Noon. A maid of consort A stands in Ngự hoa viên. The player walks there; the maid tells her master in that khắc (her choice); A re-decides
   in that khắc (a deed aimed at the player), walks over, and is in Ngự hoa viên in the next khắc: her record row and the Dư đồ view
   (whereOf / the per-khắc counts) show her there. Also: a servant who chooses not to tell (quiet) → A keeps her plan; switch off → nothing. */
const {chromium}=require('playwright');const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+require('path').resolve(URL0);const RUNS=+process.argv[3]||5;
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 const r=await p.evaluate(async(RUNS)=>{const out={runs:[]};
  const one=(mode)=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;for(let i=0;i<20;i++){window.__nlInner=1;start();window.__nlInner=0;if(!isSrv())break}
   window.__bot=1;window.__agAll=1;Q.length=0;
   for(let i=0;i<8&&(S.buoi||0)!==1;i++){Q.length=0;S.mg=0;try{nextBuoi()}catch(e){}Q.length=0}
   placeWhere();agFlush();const R=agRec();if(!R)return{err:"no record"};
   const A=liveRivals(true).find(v=>v.alive&&!v.out&&!v.confined&&!sameHouse(S,v)&&(v.staff||[]).some(s=>s.role==="maid")&&R.P["v"+v.id]&&travel(palaceOf(v),"vuon")===1);/* a palace one walk-khắc from the garden (the scenario: she arrives the next khắc) */if(!A)return{err:"no consort with a maid"};
   const s=A.staff.find(x=>x.role==="maid");s.loyal=100;A.rel=90;A.oan=0;
   const sid="s"+s.sid;if(!R.P[sid]){R.P[sid]=[0,1,2,3].map(()=>[null,"go",null,""]);R.who[sid]=[s.name,"maid"]}for(let q=0;q<4;q++)R.P[sid][q]=["vuon","go",null,""];{const D=agDz();D.P[sid]=D.P[sid]||[];D.P[sid][S.buoi||0]={pl:"vuon",a:"go",t:null,why:"",k:null,need:null}}/* her plan of this buổi: errands in the garden (the record is rebuilt from the plan on every resync) */
   const aid="v"+A.id;for(let q=0;q<4;q++)R.P[aid][q]=[palaceOf(A),"go",null,""];const z=agZ();z.pend=z.pend.filter(x=>x.id!==aid);
   const sv={keep:BAL.ag.kh2.rd.keep,quiet:BAL.ag.kh2.rd.quiet,slip:BAL.mind.slip,on:BAL.ag.kh2.rd.on};
   BAL.ag.kh2.rd.keep=mode==="go"?.0001:sv.keep;BAL.ag.kh2.rd.quiet=mode==="quiet"?1e9:mode==="go"?.0001:sv.quiet;BAL.mind.slip=0;if(mode==="off")BAL.ag.kh2.rd.on=0;
   const rd0=AGD.stat.rd||0,tl0=AGD.stat.tell||0;
   /* the maid is on an errand in the garden this buổi: the record is rebuilt on every resync, so put her there each time, before the re-decide hook reads it */
   const rt0=agRdTick;agRdTick=function(){const R2=agRec();if(R2){if(!R2.P[sid])R2.P[sid]=[0,1,2,3].map(()=>[null,"go",null,""]);for(let q=0;q<4;q++)R2.P[sid][q]=["vuon","errand",null,""]}return rt0.apply(this,arguments)};
   AG.rdMe=null;const dbg={};const t0=agTell;agTell=function(R2,pl,kh){if(pl==="vuon")dbg.t={kh,row:R2.P[sid]&&R2.P[sid][kh],srv:!!servById(s.sid),own:ownerOf(servById(s.sid))===A,same:R2===R};return t0.apply(this,arguments)};
   let got=null;try{goTo("vuon");j95sync()}catch(e){got=e.message}agTell=t0;agRdTick=rt0;
   const kA=agKh();const me=R.P.me?R.P.me[kA][0]:j95mePlace();
   const rows=R.P[aid].map(e=>e[0]+"/"+e[1]);const deed=agZ().pend.find(x=>x.id===aid&&x.key===R.key);
   let viewNext=null,cnt=null;if(deed){try{while(agKh()<deed.kh){spend(1);j95sync()}viewNext=whereOf(A);const C=j95counts(R,agKh());cnt=C&&C.vuon}catch(e){viewNext="err "+e.message}}
   Object.assign(BAL.ag.kh2.rd,{keep:sv.keep,quiet:sv.quiet,on:sv.on});BAL.mind.slip=sv.slip;
   return{dbg,mode,me,kA,told:(AGD.stat.tell||0)-tl0,rdN:AGD.stat.rdN,rd:(AGD.stat.rd||0)-rd0,deed:deed?{k:deed.k,kh:deed.kh,pl:deed.pl,t:deed.t}:null,rows,viewNext,cnt,got}};
  for(let i=0;i<RUNS;i++)out.runs.push(one("go"));out.quiet=one("quiet");out.off=one("off");out.errs=AGD.errs.concat(AG.errs).slice(0,5);return out},RUNS);
 console.log(JSON.stringify(r));
 const G=r.runs.filter(x=>!x.err);
 ok(G.length>0&&G.every(x=>x.me==="vuon"),'she is in Ngự hoa viên after the walk',G.map(x=>x.me));
 ok(G.every(x=>x.told>=1),'the maid standing there tells her master in that khắc',G.map(x=>x.told));
 const went=G.filter(x=>x.deed&&x.deed.pl==="vuon"&&x.deed.t==="me");
 ok(went.length>=1,'consort A re-decides in that khắc: a deed aimed at her in Ngự hoa viên, after her walk (when she has such a deed she can pay for; else she keeps her plan)',G.map(x=>x.deed));
 ok(went.every(x=>x.deed.kh>x.kA),'A arrives in a LATER khắc (she has to walk)',went.map(x=>[x.kA,x.deed.kh]));
 ok(went.every(x=>x.viewNext==="vuon"&&x.cnt>=1),'Dư đồ: in that khắc A is shown in Ngự hoa viên (whereOf + per-khắc count)',went.map(x=>[x.viewNext,x.cnt]));
 ok(r.quiet&&!r.quiet.err&&r.quiet.told===0&&!r.quiet.deed,'a maid who keeps quiet → A does not know, keeps her plan',r.quiet);
 ok(r.off&&!r.off.err&&r.off.rd===0,'switch off (BAL.ag.kh2.rd.on=0) → no re-decide',r.off);
 ok(!errs.length&&!r.errs.length,'no page / agent errors',errs.concat(r.errs).slice(0,5));
 await b.close();process.exit(res.every(x=>x)?0:1)})().catch(e=>{console.error(e);process.exit(1)});
