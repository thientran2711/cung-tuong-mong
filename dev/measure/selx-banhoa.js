/* D-BANHOA-SOLO (review/d-banhoa-solo): Ban hoa at Điện tuyển — kept-rate AND told chance per REAL player road, on the real 3 days (jselxday, card by card).
   Unlike selx-fair.js the board is set the way the game sets it: a bow «Cúi đầu chờ xét» = no board (S.selx.art ""), «Dâng …» = her best art (S.selx.art = entBest()).
   Profiles (robot personas of F's flights): cautious = bow + first answers · speed = her best board played weakly (BAL.selx.mark.mid) + first answers ·
   greedy = her best board at her own level («Để tài nghệ quyết định», entSkipRaw) + the valued answers · perfect = her best board at BAL.selx.mark.hi + first answers.
   told: hall = the hall card's chance (selxHallOdds, at entSkipRaw) · pick = the chance of the road she takes, read where the game shows it (the board frame,
   entExam rows = selxOddsP(mark, art); a bow has no frame → the hall chance) · late = the same contest with every mark known (calibration of selxOddsP).
   usage: node dev/measure/selx-banhoa.js [N lives per profile] [index.html] [out.json] ['{"w":{...}}' = a trial BAL.selx override, tuning only]   (serves dev/ through a Playwright route) */
const {chromium}=(require('../test/lib/bigpage'),require('playwright'));const fs=require('fs'),path=require('path');
const ROOT=process.env.SELX_ROOT||path.resolve(__dirname,'..');/* SELX_ROOT = another dev/ (e.g. LIVE's build) */const N=+process.argv[2]||40;const PAGE=process.argv[3]||'index.html';
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'});
 await ctx.route('http://localhost:8813/**',r=>{const u=new URL(r.request().url());const f=path.join(ROOT,decodeURIComponent(u.pathname));if(!f.startsWith(ROOT)||!fs.existsSync(f)||fs.statSync(f).isDirectory())return r.fulfill({status:404,body:''});return r.fulfill({status:200,contentType:f.endsWith('.html')?'text/html; charset=utf-8':'application/octet-stream',body:fs.readFileSync(f)})});
 const p=await ctx.newPage();p.setDefaultTimeout(1800000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto('http://localhost:8813/'+PAGE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof selxDay==='function',null,{timeout:240000});
 await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;try{store.set(NL_KEY,null)}catch(e){}start()});await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.origin,null,{timeout:60000});
 const OV=process.argv[5]?JSON.parse(process.argv[5]):null;
 const r=await p.evaluate(([N,OV])=>{window.__bot=1;if(OV)for(const k in OV)BAL.selx[k]=typeof OV[k]==='object'&&!Array.isArray(OV[k])?Object.assign({},BAL.selx[k],OV[k]):OV[k];if(OV)for(const k in OV)BAL.selx[k]=typeof OV[k]==='object'&&!Array.isArray(OV[k])?Object.assign({},BAL.selx[k],OV[k]):OV[k];const out=[];const close=()=>{try{document.querySelectorAll('.kmov,#kprevov,#kg82,#kpodov,.kscn').forEach(x=>x.remove())}catch(e){}};
  const MK=BAL.selx.mark;const PROF={cautious:{mini:"skip",art:0,ans:"first"},speed:{mini:MK.mid,art:1,ans:"first"},greedy:{mini:"skip",art:1,ans:"liked"},perfect:{mini:MK.hi,art:1,ans:"first"}};
  const cr0=selxContestRun;window.selxContestRun=selxContestRun=function(){try{window.__late=selxOddsP(S.selx2.mk.mini,S.selx.art||undefined)}catch(e){window.__late=null}return cr0.apply(this,arguments)};
  for(const pk of Object.keys(PROF)){const P=PROF[pk];let n=0,guard=0;while(n<N&&guard++<N*30){try{store.set(NL_KEY,null)}catch(e){}start();if(!S||!S.origin||S.origin.k==="cnv"||selxHoaThan(S.origin.k))continue;S.kcPick="cung";nlAccept();close();window.__late=null;
    const Z=S.selx2;if(!Z||!Z.days)continue;const st={sac:S.sac,tai:S.tai,duc:S.duc,og:S.origin.k};let mini=null,pHall=null,pPick=null;
    for(let i=0;i<400&&Q.length&&!S.dead&&!Z.done;i++){const m=Q[0];
     if(m.pid==="kc2Sel"){Q.shift();const art=P.art?entBest():"";mini=P.mini==="skip"?entSkipRaw():P.mini;try{pPick=P.art?selxOddsP(mini,art):pHall}catch(e){}S.selx.done=1;S.selx.art=art;selxSelDo(mini);close();continue}
     if(m.t==="Điện tuyển"&&pHall==null){try{pHall=selxOddsP(entSkipRaw())}catch(e){}}
     if(m.pid==="selxD"&&m.opts){let k=0;const nm=m.opts.map(x=>x.n);
      if(m.t==="Thái hậu"||m.t==="Hoàng hậu"){if(P.ans==="liked"){try{const tok=m.t==="Thái hậu"?"th":(liveRivals(false).find(v=>v.queen)||"th");const e=SELX_TESTS.find(x=>x.id===Z.tests[m.t==="Thái hậu"?"doidap":"hanhxu"].id);k=e.options.findIndex(x=>selxReactR(x,tok)==="+");if(k<0)k=0}catch(e){k=0}}}
      else{const c=nm.findIndex(s=>/chờ tới tối|Theo|Cất đồ|Quỳ|Ngủ|Về|Nghe|Tập vừa/.test(s));k=c>=0?c:0}
      chooseM(k);close();continue}
     if(m.opts){chooseM(0);close();continue}closeModal();close()}
    const X=S.selx;if(X.place==null)continue;n++;out.push({pk,...st,mini,pHall,pPick,late:window.__late,place:X.place,kept:!!X.kept,sc:X.sc,cut:(Z.pod||[]).filter(x=>x.kept).reduce((a,x)=>Math.min(a,x.sc),999),mk:Object.assign({},Z.mk)})}}
  return out},[N,OV]);
 const PK=["cautious","speed","greedy","perfect"];const av=(R,k)=>{const Q=R.filter(x=>x[k]!=null);return Q.length?(Q.reduce((a,x)=>a+x[k],0)/Q.length/100).toFixed(2):"-"};
 const rows=PK.map(pk=>{const R=r.filter(x=>x.pk===pk);return{profile:pk,n:R.length,kept:R.length?(R.filter(x=>x.kept).length/R.length).toFixed(2):"-",told_hall:av(R,"pHall"),told_pick:av(R,"pPick"),told_late:av(R,"late"),"kept Tài<50":(()=>{const Q=R.filter(x=>x.tai<50);return Q.length?`${(Q.filter(x=>x.kept).length/Q.length).toFixed(2)} (${Q.length})`:"-"})()}});
 console.table(rows);console.log('JSON '+JSON.stringify(rows));
 console.log('errors',errs.length,errs.slice(0,3));if(process.argv[4])fs.writeFileSync(process.argv[4],JSON.stringify(r));await b.close()})();
