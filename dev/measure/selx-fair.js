/* D-SELX-FAIR (review/selx-fair): THE CONTEST FAIRNESS SPREAD — fresh tú nữ lives (real rolled Sắc/Tài/Đức, every non-cung-nữ, non-hòa-thân origin) play the
   REAL 3 days (jselxday, card by card like dev/test/selx-days.js) under 4 player profiles, and her kept-rate is grouped by Tài band.
   Profiles: skip = «Cúi đầu chờ xét» (entSkipRaw) + the first answer of each royal's test (she knows nothing);
             fair = the board played at «Giỏi» (BAL.mgTier.word[2]) + the first answers; good = «Giỏi» + the answer the asking royal values;
             best = «Xuất sắc» (word[3]) + the valued answers. A fair contest: the base rate of a girl is yard.kept / yard.n (owner OD 24/11 ~06:15Z top 4 of 12);
             a careless life may be cut, a girl who plays the board well should be kept as a norm, and high Tài must help.
   usage: node dev/measure/selx-fair.js [N lives per profile] [index.html] [out.json] ['{"w":{...}}' = a trial BAL.selx override, tuning only]   (serves dev/ through a Playwright route) */
const {chromium}=(require('../test/lib/bigpage'),require('playwright'));const fs=require('fs'),path=require('path');
const ROOT=path.resolve(__dirname,'..');const N=+process.argv[2]||40;const PAGE=process.argv[3]||'index.html';
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'});
 await ctx.route('http://localhost:8813/**',r=>{const u=new URL(r.request().url());const f=path.join(ROOT,decodeURIComponent(u.pathname));if(!f.startsWith(ROOT)||!fs.existsSync(f)||fs.statSync(f).isDirectory())return r.fulfill({status:404,body:''});return r.fulfill({status:200,contentType:f.endsWith('.html')?'text/html; charset=utf-8':'application/octet-stream',body:fs.readFileSync(f)})});
 const p=await ctx.newPage();p.setDefaultTimeout(1800000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto('http://localhost:8813/'+PAGE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof selxDay==='function',null,{timeout:240000});
 await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;try{store.set(NL_KEY,null)}catch(e){}start()});await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.origin,null,{timeout:60000});
 const OV=process.argv[5]?JSON.parse(process.argv[5]):null;
 const r=await p.evaluate(([N,OV])=>{window.__bot=1;if(OV)for(const k in OV)BAL.selx[k]=typeof OV[k]==='object'&&!Array.isArray(OV[k])?Object.assign({},BAL.selx[k],OV[k]):OV[k];const out=[];const close=()=>{try{document.querySelectorAll('.kmov,#kprevov,#kg82,#kpodov,.kscn').forEach(x=>x.remove())}catch(e){}};
  const W=BAL.mgTier.word;const PROF={skip:{mini:"skip",ans:"first"},fair:{mini:W[2],ans:"first"},good:{mini:W[2],ans:"liked"},best:{mini:W[3],ans:"liked"}};
  for(const pk of Object.keys(PROF)){const P=PROF[pk];let n=0,guard=0;while(n<N&&guard++<N*30){try{store.set(NL_KEY,null)}catch(e){}start();if(!S||!S.origin||S.origin.k==="cnv"||selxHoaThan(S.origin.k))continue;S.kcPick="cung";nlAccept();close();
    const Z=S.selx2;if(!Z||!Z.days)continue;const st={sac:S.sac,tai:S.tai,duc:S.duc,og:S.origin.k};let mini=null,pHall=null;
    for(let i=0;i<400&&Q.length&&!S.dead&&!Z.done;i++){const m=Q[0];
     if(m.pid==="kc2Sel"){Q.shift();S.selx.done=1;S.selx.art="";mini=P.mini==="skip"?entSkipRaw():P.mini;selxSelDo(mini);close();continue}
     if(m.t==="Điện tuyển"&&pHall==null){try{pHall=selxOddsP(P.mini==="skip"?entSkipRaw():P.mini)}catch(e){}}
     if(m.pid==="selxD"&&m.opts){let k=0;const nm=m.opts.map(x=>x.n);
      if(m.t==="Thái hậu"||m.t==="Hoàng hậu"){if(P.ans==="liked"){try{const tok=m.t==="Thái hậu"?"th":(liveRivals(false).find(v=>v.queen)||"th");const e=SELX_TESTS.find(x=>x.id===Z.tests[m.t==="Thái hậu"?"doidap":"hanhxu"].id);k=e.options.findIndex(x=>selxReactR(x,tok)==="+");if(k<0)k=0}catch(e){k=0}}}
      else{const c=nm.findIndex(s=>/chờ tới tối|Theo|Cất đồ|Quỳ|Ngủ|Về|Nghe|Tập vừa/.test(s));k=c>=0?c:0}
      chooseM(k);close();continue}
     if(m.opts){chooseM(0);close();continue}closeModal();close()}
    const X=S.selx;if(X.place==null)continue;n++;out.push({pk,...st,mini,pHall,place:X.place,kept:!!X.kept,sc:X.sc,cut:(Z.pod||[]).filter(x=>x.kept).reduce((a,x)=>Math.min(a,x.sc),999),mk:Object.assign({},Z.mk)})}}
  return out},[N,OV]);
 const band=t=>t<50?"Tài <50":t<70?"Tài 50-69":t<85?"Tài 70-84":"Tài 85+";const B=["Tài <50","Tài 50-69","Tài 70-84","Tài 85+"];
 const rows=[];for(const pk of ["skip","fair","good","best"]){const R=r.filter(x=>x.pk===pk);const PH=R.filter(x=>x.pHall!=null);const row={profile:pk,n:R.length,kept:(R.filter(x=>x.kept).length/R.length).toFixed(2),told:PH.length?(PH.reduce((a,x)=>a+x.pHall,0)/PH.length/100).toFixed(2):'-',avgPlace:(R.reduce((a,x)=>a+x.place,0)/R.length).toFixed(1)};
  for(const bb of B){const Q=R.filter(x=>band(x.tai)===bb);row[bb]=Q.length?`${(Q.filter(x=>x.kept).length/Q.length).toFixed(2)} (${Q.length})`:"-"}rows.push(row)}
 console.table(rows);const cut=r.map(x=>x.cut).filter(x=>x<999).sort((a,b)=>a-b);console.log('cut score (4th kept) p10/p50/p90',cut[Math.floor(cut.length*.1)],cut[Math.floor(cut.length*.5)],cut[Math.floor(cut.length*.9)]);
 console.log('her score by profile p50',["skip","fair","good","best"].map(pk=>{const s=r.filter(x=>x.pk===pk).map(x=>x.sc).sort((a,b)=>a-b);return pk+' '+s[Math.floor(s.length/2)]}).join(' · '));
 console.log('errors',errs.length,errs.slice(0,3));if(process.argv[4])fs.writeFileSync(process.argv[4],JSON.stringify(r));await b.close()})();
