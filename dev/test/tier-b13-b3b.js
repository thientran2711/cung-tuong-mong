/* E-TIER-B13 batch 3b gate (law 2 same-result merge, owner OD 27/11 ~01:00Z / ~01:03Z one-tap model), in the built game:
   (1) C46 night talk (j8 PEND.night1 + jvisit PEND.vnight): ONE «Hầu chuyện»; its grade od = the best of the old four topics (after every
       night1 wrapper); a locked topic (eaLock) is never the pick; tapping it plays the night and the log names the real topic;
   (2) C48 Yến tiệc đầu xuân / Thi tài Thất tịch (j71 PEND.j71x): ONE «Ghi tên dâng <art>» = the art with the best odds (tie → fxBest7)
       + «… mời thầy kèm» only when it lifts the word + «Không dự»; the pick is stored for the festival.
   (3) C45 night prep (RV3B fixes): BAL.tier.prep strictly rising; card = BAL; «Tập trước» = VỪA (thành) / NHẸ (hỏng) at every art level;
       jewellery +jb on every way; NPC nights land on the same rung per bạc band (law 1); one jb formula (prepJb).
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
 /* RV3B fix 5: the cases really move the odds per art — the contest score of each of her arts is forced (SC7[a].f for her only; the rivals keep
    their own scores), so the pick must follow the odds, not a 5/5/5 floor */
 const X=await g.evaluate(()=>{const out=[];const f0={};for(const k in SC7)f0[k]=SC7[k].f;
  try{for(const kk of ['sac','tai'])for(const lv of [[1,9,1],[9,1,1],[1,1,9],[1,4,9]]){const F=FX7[kk];
   F.arts.forEach((a,i)=>{SC7[a].f=p=>p===S?lv[i]*20:f0[a](p)});const sd=12345;
   const d=PEND.j71x({kk,y:S.year,sd});const od=F.arts.map(a=>fxOdds7(F,a,0,sd));let bi=fxBest7(S,F.arts),bv=fxOdds7(F,bi,0,sd);F.arts.forEach((a,i)=>{if(od[i]>bv){bv=od[i];bi=a}});
   out.push({kk,lv,names:d.o.map(o=>o.n),od,want:SC7[bi].n,moved:new Set(od).size>1});for(const k in f0)SC7[k].f=f0[k]}}
  finally{for(const k in f0)SC7[k].f=f0[k]}return out});
 ok(X.filter(r=>r.moved).length>=X.length-2,`j71x cases move the odds per art (${X.filter(r=>r.moved).length}/${X.length} cases with different odds): ${X.map(r=>r.od.join('/')).join(' · ')}`,X);
 for(const r of X){const ghi=r.names.filter(n=>/^Ghi tên dâng /.test(n));
  ok(ghi.length===1&&ghi[0].startsWith('Ghi tên dâng '+r.want)&&r.names[r.names.length-1]==='Không dự'&&r.names.length<=3,`${r.kk} arts ${JSON.stringify(r.lv)}: 3 «Ghi tên dâng …» → ONE «${ghi[0]}» (odds ${r.od.join('/')}) · ${r.names.length} ways: ${r.names.join(' | ')}`,r)}
 /* (3) C45 night prep: NHẸ · VỪA (+ its Sức road) · NẶNG from BAL.tier.prep; the night q each way starts = the old one without jewellery,
    and worn jewellery adds the same +jb on every way */
 const P=await g.evaluate(()=>{const out={};const wb0=wearBonus,pf0=pushFront,r0=roll;const qOf=(i,rv)=>{let q=null;pushFront=(d)=>{q=d&&d.pp?d.pp.q:(d&&d.q)};roll=()=>rv;try{PEND.prep().o[i].go()}finally{pushFront=pf0;roll=r0}return q};
  const run=sac=>{wearBonus=p=>p===S?{sac,danh:0,shSac:0}:wb0(p);try{const d=PEND.prep();return{names:d.o.map(o=>o.n),fx:d.o.map(o=>o.fx),q:d.o.map((o,i)=>qOf(i,true)),qF:qOf(2,false),x:d.o.map(o=>o.x)}}finally{wearBonus=wb0}};
  out.no=run(0);out.jw=run(6);out.TP=JSON.parse(JSON.stringify(BAL.tier.prep));
  /* «Tập trước» at every art level 1..5: thành = the VỪA result, hỏng = the NHẸ result */
  const a0=Object.assign({},S.arts);out.lvs=[];wearBonus=p=>p===S?{sac:0,danh:0,shSac:0}:wb0(p);try{for(let l=1;l<=5;l++){for(const k in S.arts)S.arts[k]=0;S.arts.cam=l;out.lvs.push({l,ok:qOf(2,true),bad:qOf(2,false),v:qOf(1,true),n:qOf(0,true),x:PEND.prep().o[2].x})}}finally{S.arts=a0;wearBonus=wb0}
  out.jbS=prepJb(S);return out});
 {const T=P.TP,n=P.no,j=P.jw,jb=3,up=a=>a.length===3&&a[0]<a[1]&&a[1]<a[2];
  ok(n.names.length===4&&n.names[0]==='Để mộc, nghỉ ngơi'&&/^Tập trước/.test(n.names[2])&&n.names[3]==='Tắm cánh hoa, xông hương'&&!n.names.some(x=>/Đeo trang sức/.test(x)),`prep: 5 ways → 4 (NHẸ · VỪA · VỪA Sức road · NẶNG): ${n.names.join(' | ')}`,n);
  ok(up(T.bac)&&up(T.q),`BAL.tier.prep strictly rising NHẸ < VỪA < NẶNG: bạc ${T.bac.join('<')} · được ưa q ${T.q.join('<')}`,T);
  const cost=[0,-(n.fx[1].bac||0),-(n.fx[3].bac||0)],qq=[n.q[0],n.q[1],n.q[3]];
  ok(up(cost)&&up(qq),`card: cost and result rise together NHẸ < VỪA < NẶNG: bạc ${cost.join('<')} · q ${qq.join('<')}`,{cost,qq});
  ok(!n.fx[0].bac&&n.fx[1].bac===-T.bac[1]&&n.fx[2].suc===-T.suc&&!n.fx[2].bac&&n.fx[3].bac===-T.bac[2],`prep costs from BAL.tier.prep: 0 · bạc ${T.bac[1]} · Sức ${T.suc} · bạc ${T.bac[2]}`,n.fx);
  ok(JSON.stringify(n.q)===JSON.stringify([T.q[0],T.q[1],T.q[1],T.q[2]])&&n.qF===T.q[0],`no jewellery: night q NHẸ ${T.q[0]} · VỪA ${T.q[1]} · Tập trước thành ${n.q[2]} = VỪA / hỏng ${n.qF} = NHẸ · NẶNG ${T.q[2]}`,n);
  ok(P.lvs.every(r=>r.ok===r.v&&r.bad===r.n&&r.ok<n.q[3]&&new RegExp('thành: được ưa \\+'+(T.q[1]-1)+' · hỏng: được ưa \\+'+(T.q[0]-1)).test(r.x)),`«Tập trước» = VỪA at every art level 1..5 (thành ${P.lvs.map(r=>r.ok).join('/')} = VỪA, hỏng ${P.lvs.map(r=>r.bad).join('/')} = NHẸ, never ≥ NẶNG); the card line says so`,P.lvs);
  ok(JSON.stringify(j.q)===JSON.stringify(n.q.map(x=>x+jb))&&j.x.every(x=>/trang sức đang đeo: được ưa \+3/.test(x)),`jewellery worn (Sắc +6 → +${jb}): every way q +${jb} → ${JSON.stringify(j.q)}, shown on every way`,j)}
 /* NPC nights (law 1, RV3B fix 2/3): an NPC at each bạc band lands on the same rung as her card; the Sức road = VỪA / NHẸ; NHẸ rest gives her Sức gain;
    her worn jewellery adds the same prepJb */
 const NP=await g.evaluate(()=>{const T=BAL.tier.prep,v=liveRivals(false)[0];if(!v)return{none:1};const k0=JSON.stringify(v),r0=roll,mr0=Math.random,nw0=npcWhy,wb0=wearBonus,ht0=window.htCan;
  const run=(bac,suc,rv,sac)=>{v.bac=bac;v.suc=suc;v.preg=1;v.maid=null;let n0=0;roll=()=>(n0++===0?rv:true)/* only the first roll (the Sức road's art roll, when taken) follows rv; the talk fit roll is always the best fit */;Math.random=()=>0;npcWhy=(k,c)=>k==="nightPrep"?{s:1,r:"t"}:nw0(k,c);wearBonus=p=>p===v?{sac:sac||0,danh:0,shSac:0}:wb0(p);
   try{rivalNight(v)}finally{roll=r0;Math.random=mr0;npcWhy=nw0;wearBonus=wb0}return{sc:v.lastNightS,bac:v.bac,suc:v.suc}};
  const out=[];try{const ref=run(0,0,true,0);/* NHẸ, roll true → fit = max: offset = sc - q0 */const off=ref.sc-T.q[0],gift=ref.bac/* the night's own bạc reward (bestow, rolls forced true) is the same on every rung */;
   const C=[["NHẸ rest",0,0,true,0,T.q[0],0,BAL.eff.j75.sucFx],["NHẸ rest (bạc under VỪA)",T.bac[1]-1,0,true,0,T.q[0],0,BAL.eff.j75.sucFx],
    ["Sức road thành",0,T.sucMin,true,0,T.q[1],0,-T.suc],["Sức road hỏng",0,T.sucMin,false,0,T.q[0],0,-T.suc],
    ["VỪA bạc",T.bac[1],T.sucMin,true,0,T.q[1],-T.bac[1],0],["VỪA bạc (top of band)",T.bac[2]-1,0,true,0,T.q[1],-T.bac[1],0],
    ["NẶNG bạc",T.bac[2],T.sucMin,true,0,T.q[2],-T.bac[2],0],["NẶNG + jewellery Sắc 6",T.bac[2]+10,0,true,6,T.q[2]+3,-T.bac[2],0]];
   for(const [nm,bac,suc,rv,sac,wq,db,ds] of C){const r=run(bac,suc,rv,sac);out.push({nm,q:r.sc-off,wq,db:r.bac-bac-gift,wdb:db,ds:r.suc-suc,wds:ds})}}
  finally{Object.assign(v,JSON.parse(k0))}return{out,jbP:(()=>{wearBonus=p=>({sac:6,danh:0,shSac:0});try{return[prepJb(S),prepJb(v)]}finally{wearBonus=wb0}})()}});
 if(NP.none)ok(false,'NPC night: no live rival to test');
 else{for(const r of NP.out)ok(r.q===r.wq&&r.db===r.wdb&&r.ds===r.wds,`NPC night «${r.nm}»: q ${r.q} (her card ${r.wq}) · bạc ${r.db} (${r.wdb}) · Sức ${r.ds} (${r.wds})`,r);
  ok(NP.jbP[0]===3&&NP.jbP[1]===3,`one jewellery formula prepJb: her ${NP.jbP[0]} = NPC ${NP.jbP[1]} (Sắc 6)`,NP.jbP)}
 ok(errs.length===0,errs.length+' page errors '+(errs[0]||''));
 console.log(fail?`TIER-B13-B3B: ${fail} FAIL`:'TIER-B13-B3B: ALL PASS');await b.close();srv.close();process.exit(fail?1:0)})().catch(e=>{console.log('FAIL',e.message);process.exit(1)});
