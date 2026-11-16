// review/reign-road: PURE court-struggle Monte Carlo for BAL.rg tuning: only the jreign month (rgMonth) runs; her stats ramp from the start
// values toward a mid-game level (env RAMP=1, default) so odds match a played life; every rg dialog answered by the side policy.
// env MT=1: run the game's real monthTick (court, Quốc sự, NPC months) instead of rgMonth alone.
// usage: node dev/measure/rgpure.js <page.html> <sides> <lives> [months=42]   env BALJ='{"rg":{...}}'
const {chromium}=require('playwright');const path=require('path');
const [,,PAGE,SIDES,NS,MO]=process.argv;const N=+NS||200,MONTHS=+MO||42;
(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await p.route(/\.(webp|png|jpg|jpeg|mp3|ogg|mp4|webm)(\?.*)?$/,r=>r.abort());
 await p.goto('file://'+path.resolve(PAGE),{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 if(process.env.BALJ)await p.evaluate(j=>{const o=JSON.parse(j);if(o.rg)Object.assign(BAL.rg,o.rg)},process.env.BALJ);
 const out={};
 for(const side of SIDES.split(',')){
  const r=await p.evaluate(([side,N,MONTHS,RAMP,MT])=>{document.getElementById('title').hidden=true;window.__nlInner=1;window.__bot=1;quiet=true;render=function(){};showModal=function(){};
   const L=[];for(let n=0;n<N;n++){let k=0;do{start();k++}while((S.origin.k==='cnv'||(typeof isSrv==='function'&&isSrv())||!S.ps)&&k<30);Q.length=0;
    window.__rgDbg={};const s0={tamco:S.tamco,mat:S.mat||0,tai:S.tai,duc:S.duc,danh:S.danh,sung:S.sung,hh:S.hh};let beats=0,oks=0;
    for(let m=1;m<=MONTHS;m++){if(!MT){S.turn++;S.month=(S.month%12)+1}if(RAMP){const f=m/MONTHS;S.tamco=Math.round(s0.tamco+(60-s0.tamco)*f*.6);S.mat=Math.round(s0.mat+3*f);S.danh=Math.round(s0.danh+(60-s0.danh)*f*.6);S.duc=Math.round(s0.duc+(50-s0.duc)*f*.5);S.sung=Math.max(S.sung,Math.round(20+40*f));S.tai=Math.max(S.tai,s0.tai)}
     S.suc=80;S.bac=Math.max(S.bac,150);if(MT){S.tuan=2;try{monthTick()}catch(e){}if(S.dead)break}else{try{rgMonth()}catch(e){}}
     let q=0;while(Q.length&&q++<10){const mm=Q[0];if(mm.pid==='rg'&&mm.opts&&mm.opts.length){beats++;const LL=mm.opts.map((c,i)=>[c,i]);let i;
       if(side==='ngoai')i=(LL.find(([c])=>/đứng ngoài|Đứng ngoài|Cáo bệnh|Đóng cửa|giữ mình|Lấy cớ/.test(c.n+c.j67))||LL[LL.length-1])[1];
       else{const mine=LL.filter(([c])=>c.rgS===side&&!/Đổi phe/.test(c.n));i=(mine.length?mine[Math.floor(Math.random()*mine.length)]:(LL.find(([c])=>!/Đổi phe|từ chối|Từ chối|không dám|Không dám|Lui|Cáo bệnh|Đóng cửa/.test(c.n))||LL[0]))[1]}
       Q.shift();try{const c=mm.opts[i];apply(c.fx||{});c.go()}catch(e){}}else Q.shift()}}
    const W=S.trieu.rg;L.push({qs:window.__rgDbg.qs||0,npc:window.__rgDbg.npc||0,out:W.out,res:S.reign.res||'',p:Math.round(W.p),beats,tr:S.reign.tr,sung:S.sung,th:S.th,rank:S.rank,ev:liveRivals(true).reduce((a,v)=>a+((v.evm&&v.evm.me)||0),0)})}
   return L},[side,N,MONTHS,process.env.RAMP!=='0',process.env.MT==='1']);
  const c=k=>{const h={};r.forEach(x=>h[x[k]]=(h[x[k]]||0)+1);return h};const mean=k=>+(r.reduce((a,x)=>a+x[k],0)/r.length).toFixed(1);
  const ps=r.map(x=>x.p).sort((a,b)=>a-b);
  out[side]={n:r.length,out:c('out'),res:c('res'),p:mean('p'),p10:ps[Math.floor(ps.length*.1)],p90:ps[Math.floor(ps.length*.9)],beats:mean('beats'),tr:mean('tr'),evOnMe:mean('ev'),qsMonths:mean('qs'),npcPush:mean('npc')};
  console.log(side,JSON.stringify(out[side]))}
 if(errs.length)console.log('errs',errs.slice(0,5));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
