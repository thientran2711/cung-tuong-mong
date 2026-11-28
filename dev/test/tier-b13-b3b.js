/* E-TIER-B13 batch 3b gate (law 2 same-result merge, owner OD 27/11 ~01:00Z / ~01:03Z one-tap model), in the built game:
   (1) C46 night talk (j8 PEND.night1 + jvisit PEND.vnight): ONE «Hầu chuyện»; its grade od = the best of the old four topics (after every
       night1 wrapper); a locked topic (eaLock) is never the pick; tapping it plays the night and the log names the real topic;
   (2) C48 Yến tiệc đầu xuân / Thi tài Thất tịch (j71 PEND.j71x): ONE «Ghi tên dâng <art>» = the art with the best odds (tie → fxBest7)
       + «… mời thầy kèm» only when it lifts the word + «Không dự»; the pick is stored for the festival.
   usage: node dev/test/tier-b13-b3b.js */
const {chromium}=require('playwright');const D=require('./lib/device');const path=require('path');const ROOT=path.resolve(__dirname,'../..');
let fail=0;const ok=(c,m,x)=>{if(!c)fail++;console.log((c?'ok   ':'FAIL ')+m+(x!==undefined&&!c?' '+JSON.stringify(x).slice(0,700):''))};
(async()=>{const srv=await D.serveRoot(ROOT);const b=await chromium.launch();const ctx=await D.newDeviceContext(b,'fold',{deviceScaleFactor:1});const p=await ctx.newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.route(/\.(webp|png|jpe?g|mp3|ogg|m4a|mp4|webm)(\?|$)/i,r=>r.abort());const g=await D.openHost(p,srv.url,{timeout:120000});await g.waitForFunction(()=>typeof start==='function'&&document.getElementById('title')&&window.__ctmBuilt===1,null,{timeout:120000});
 await g.evaluate(()=>{SLOT=9;document.getElementById('title').hidden=true;try{store.set(NL_KEY,null)}catch(e){}window.__forceOrigin='tt';start()});
 await g.waitForFunction(()=>typeof S==='object'&&S&&S.origin&&S.emp,null,{timeout:60000});
 await g.evaluate(()=>{['kroul','dawn','kload'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});Q.length=0;S.rank=Math.max(S.rank,2)});
 /* (1) night talk, for several of his traits / moods */
 const N=await g.evaluate(()=>{const out=[];const t0=S.emp.traits.slice(),m0=S.emp.mood;
  const cases=[[["trongtai"],0],[["chamchinh"],0],[["datinh"],1],[["lanhlung"],2],[[],0],[[],3]];
  for(const [tr,md] of cases){S.emp.traits=tr.slice();S.emp.mood=md;
   const fit={"Bàn thơ văn, cầm kỳ":tr.includes("trongtai")?3:S.tai>=60?1:0,"Bàn chuyện thiên hạ":tr.includes("chamchinh")?3:-1,"Rót rượu, nũng nịu":tr.includes("datinh")||tr.includes("mesac")?3:tr.includes("lanhlung")?-1:0,"Lặng lẽ xoa vai, nghe ngài kể":md>=2?2:1};
   const d=PEND.night1({q:2,vp:0}),v=PEND.vnight({q:2});const mx=Math.max(...Object.values(fit));
   out.push({tr,md,n:d.o.length,name:d.o[0].n,talk:d.o[0].talk,od:d.o[0].od,mx,fitTalk:fit[d.o[0].talk],vn:v.o.length,vname:v.o[0].n,words:/·/.test(d.o[0].x||'')})}
  S.emp.traits=t0;S.emp.mood=m0;return out});
 for(const r of N)ok(r.n===1&&r.name==='Hầu chuyện'&&r.fitTalk===r.mx&&r.vn===1&&r.vname==='Hầu chuyện'&&r.words,`night talk traits ${JSON.stringify(r.tr)} mood ${r.md}: 4 topics → ONE «Hầu chuyện» (picks «${r.talk}», fit ${r.fitTalk} = best ${r.mx}); visit night the same`,r);
 /* tap it: the night plays on, the log names the topic */
 const T=await g.evaluate(()=>{S.emp.traits=["chamchinh"];S.emp.mood=0;Q.length=0;const L0=S.logs.length;pushFront(mkP("night1",{q:2,vp:0}),"Đêm thị tẩm");const pid=Q[0].pid;let err=null;try{chooseM(0)}catch(e){err=e.message}
  const lg=S.logs.slice(0,Math.max(0,S.logs.length-L0)+3).join(' | ');return{pid,err,next:Q[0]&&Q[0].pid,lg:lg.slice(0,400)}});
 ok(T.pid==='night1'&&!T.err&&T.next==='night2'&&/Hầu chuyện: Bàn chuyện thiên hạ/.test(T.lg),'tap «Hầu chuyện» → night2, the log names the real topic',T);
 /* (2) the feast contest invitation */
 const X=await g.evaluate(()=>{const out=[];const a0=Object.assign({},S.arts);
  for(const kk of ['sac','tai'])for(const lv of [[1,5,1],[5,1,1],[1,1,5]]){const F=FX7[kk];F.arts.forEach((a,i)=>{S.arts[a]=lv[i]});const sd=12345;
   const d=PEND.j71x({kk,y:S.year,sd});const od=F.arts.map(a=>fxOdds7(F,a,0,sd));let bi=fxBest7(S,F.arts),bv=fxOdds7(F,bi,0,sd);F.arts.forEach((a,i)=>{if(od[i]>bv){bv=od[i];bi=a}});
   out.push({kk,lv,names:d.o.map(o=>o.n),od,want:SC7[bi].n})}
  S.arts=a0;return out});
 for(const r of X){const ghi=r.names.filter(n=>/^Ghi tên dâng /.test(n));
  ok(ghi.length===1&&ghi[0].startsWith('Ghi tên dâng '+r.want)&&r.names[r.names.length-1]==='Không dự'&&r.names.length<=3,`${r.kk} arts ${JSON.stringify(r.lv)}: 3 «Ghi tên dâng …» → ONE «${ghi[0]}» (odds ${r.od.join('/')}) · ${r.names.length} ways: ${r.names.join(' | ')}`,r)}
 ok(errs.length===0,errs.length+' page errors '+(errs[0]||''));
 console.log(fail?`TIER-B13-B3B: ${fail} FAIL`:'TIER-B13-B3B: ALL PASS');await b.close();srv.close();process.exit(fail?1:0)})().catch(e=>{console.log('FAIL',e.message);process.exit(1)});
