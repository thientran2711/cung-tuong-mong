/* ONE SIEVE test (owner OD 26/11 ~06:50Z (B), MAIN 156 order; dev/build/jnsieve.js nsSieve). One palace life of N tuần by a plain bot, and
   at every buổi the REAL result card is drawn (resultShow with the bot flag lifted for that one call, then hidden):
   - «Trong cung vừa qua» (jaudit: time passing that touched her) every buổi it would show, and
   - one act of hers per tuần on a consort (doAct «tặng quà» / talk) so cards with a target are measured too.
   Counted per card: rows (every .kitem in .kb, the Kèm summary counts 1), person rows of bystanders (not her target, not her household,
   not Thái hậu / Hoàng hậu), Kèm lines. Checks (fix only; --report prints the table and never fails, for LIVE):
   1 a card shows at most BAL.news.card.rowMax rows of other people (bystanders + Kèm together)
   2 the Kèm block is ONE summary line when more than BAL.news.card.kemMax people moved, with the «Xem đầy đủ trong Sổ ghi» link
   3 nothing is lost: every folded person change of a card is in the Sổ ghi (S.hrec record of that card names each folded person)
   4 «Vì sao» reasons never cite an NPC-only clause (nsNpcLine) of the span
   5 the Sổ ghi tab has the kind tabs + the search box (kit parts) and a search narrows the rows; old save (no S.hrec / S.osv) loads
   6 0 page errors
   usage: node dev/test/one-sieve.test.js [page.html] [tuần] [seed] [--report] [--json out.json] */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const A=process.argv.slice(2);const jI=A.indexOf('--json');const JOUT=jI>=0?A.splice(jI,2)[1]:null;const REP=A.includes('--report');const P=A.filter(x=>!x.startsWith('--'));
const URL='file://'+path.resolve(P[0]||'dev/index.html');const DAYS=+P[1]||12;const SEED=+P[2]||1;
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x).slice(0,700):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&document.getElementById('title'),null,{timeout:120000});await p.waitForTimeout(1500);
 await p.evaluate((SEED)=>{let s=SEED*9973;Math.random=()=>{s=(s*16807)%2147483647;return (s-1)/2147483646};
  localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;let g=0;do{start();g++}while((isSrv()||(typeof isKc==='function'&&isKc()))&&g<60);window.__nlInner=0;window.__bot=1;quiet=false;Q.length=0;try{deal()}catch(e){}render();
  const R=window.__O={cards:[],why:[]};const tx=h=>String(h==null?'':h).replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
  const house=()=>{const L=new Set(['Thái hậu','Hoàng hậu','Hoàng thượng']);try{if(S.maid)L.add(S.maid.name);for(const x of S.staff||[])if(x&&x.name)L.add(x.name);const q=typeof queenP==='function'&&queenP();if(q&&q!==S)L.add(q.name)}catch(e){}return L};
  /* draw ONE real card and measure it */
  window.__card=function(title,bf,ok,tgt){const t0=document.getElementById('rtoast');if(t0)t0.innerHTML='';const hr0=(S.hrec||[])[0]||null;
   window.__bot=0;try{resultShow(title,bf,ok)}catch(e){R.err=(R.err||0)+1}window.__bot=1;const t=document.getElementById('rtoast');if(!t||!t.innerHTML||!t.classList.contains('on'))return null;
   const H=house();const tn=tgt&&tgt.name;const rows=[...t.querySelectorAll('.kb .kitem')];let by=0,kem=0,her=0;const byN=[];
   for(const r of rows){const kr=r.closest('.kr');const k=kr?[...kr.classList].find(c=>/^kr-/.test(c)):'';const who=tx(r.querySelector('.ef.t')?.textContent||'').replace(/:$/,'');
    if(k==='kr-kem'){kem++;continue}if(k==='kr-tgt'||k==='kr-by'||!who){her++;continue}
    if(who===tn||H.has(who)||[...H].some(h=>who.endsWith(h))||who===S.name){her++;continue}by++;byN.push(who)}
   const link=!!t.querySelector('.kalog')&&/Sổ ghi/.test(t.querySelector('.kalog').textContent);
   const why=[...t.querySelectorAll('.kwy')].map(x=>tx(x.textContent));for(const w of why)R.why.push(w);
   const L=window.kaLastResult||{};const fold=L.fold||null;const HL=S.hrec||[];const ix=hr0?HL.indexOf(hr0):HL.length;const hrNew=HL.slice(0,ix<0?HL.length:ix);
   const C={title,rows:rows.length,her,by,kem,link,byN,fold,rec:hrNew.map(x=>x.t)};R.cards.push(C);t.classList.remove('on');return C};
  return 1},SEED);
 for(let d=0;d<DAYS;d++){
  const r=await p.evaluate((d)=>{const drain=()=>{let g=0;while(Q.length&&g++<40){const m=Q[0];try{if(m&&m.opts&&m.opts.length){let i=m.opts.findIndex(c=>!c.off&&!(c.fx&&c.fx.bac&&S.bac+c.fx.bac<0));chooseM(i<0?0:i);if(Q[0]===m)Q.shift()}else Q.shift()}catch(e){Q.shift()}}Q.length=0;S.mg=0};
   for(let bb=0;bb<5;bb++){drain();try{placeWhere()}catch(e){}const bf=rsnap();try{nextBuoi()}catch(e){}if(S.dead)break;try{__card('Trong cung vừa qua',bf,null)}catch(e){}drain();
    if(bb===1){/* one act of hers on a consort this tuần (gift, else talk) */const L=liveRivals(true).filter(v=>v&&v!==S);const v=L[d%Math.max(1,L.length)];if(v){const i=rivals.indexOf(v);const b2=rsnap();
      let did=0;try{for(const k of ['gift','ally','spy']){if(ACT[k]&&ACT[k].ok&&ACT[k].ok(S,v)){doAct(i,k);did=k;break}}}catch(e){}if(did)try{__card(ACT[did].n||did,b2,null,v)}catch(e){}drain()}}}
   return {dead:!!S.dead}},d);
  if(r.dead){await p.evaluate(()=>{window.__nlInner=1;let g=0;do{start();g++}while((isSrv()||(typeof isKc==='function'&&isKc()))&&g<60);window.__nlInner=0;window.__bot=1;Q.length=0;try{deal()}catch(e){}})}}
 const out=await p.evaluate(()=>{const R=window.__O;const B=(BAL.news&&BAL.news.card)||{};const C=R.cards;
  const avg=f=>C.length?Math.round(C.reduce((a,c)=>a+f(c),0)/C.length*10)/10:0,mx=f=>C.reduce((a,c)=>Math.max(a,f(c)),0);
  const npcWhy=typeof nsNpcLine==='function'?R.why.filter(w=>nsNpcLine(w)).slice(0,5):[];
  /* 3 nothing lost: every folded name is in this card's Sổ ghi record */
  const lost=[];for(const c of C)if(c.fold&&c.fold.length){const T=c.rec.join(' ');for(const n of c.fold)if(!T.includes(n))lost.push({t:c.title,n})}
  /* 5 Sổ ghi tab: kind tabs + search */
  let tabs=null;try{tab='log';renderPanel();const Pn=document.getElementById('panel');const rows0=Pn.querySelectorAll('.logs > div:not([data-nrh])').length;const inp=Pn.querySelector('input.kinput[data-osq]');const sub=Pn.querySelector('[data-ktsub="soghi"]');
   let rows1=null;if(inp){const w=(rivals.find(v=>v&&v!==S&&v.alive)||{}).name||'Hoàng thượng';inp.value=w.split(' ').slice(-2).join(' ');inp.dispatchEvent(new Event('input',{bubbles:true}));rows1=Pn.querySelectorAll('.logs > div:not([data-nrh]):not([hidden])').length}
   tabs={sub:!!sub,search:!!inp,rows0,rows1,kinds:sub?[...sub.querySelectorAll('[data-ktsv]')].map(x=>x.dataset.ktsv):[]}}catch(e){tabs={err:String(e)}}
  return {n:C.length,rowsAvg:avg(c=>c.rows),rowsMax:mx(c=>c.rows),byAvg:avg(c=>c.by),byMax:mx(c=>c.by),kemMax:mx(c=>c.kem),
   over:C.filter(c=>c.by>(B.rowMax||99)).slice(0,3),noLink:C.filter(c=>c.kem&&!c.link).length,npcWhy,lost:lost.slice(0,5),nLost:lost.length,tabs,err:R.err||0,
   sample:C.slice().sort((a,b)=>b.rows-a.rows).slice(0,2)}});
 console.log('cards',out.n,'rows/card avg',out.rowsAvg,'max',out.rowsMax,'| other people rows avg',out.byAvg,'max',out.byMax,'| Kèm lines max',out.kemMax);
 console.log('biggest cards',JSON.stringify(out.sample).slice(0,1500));
 if(!REP){const B=await p.evaluate(()=>BAL.news.card);
  ok(out.n>5,'cards measured',out.n);
  ok(out.byMax<=B.rowMax,'1 bystander person rows per card ≤ BAL.news.card.rowMax '+B.rowMax,{max:out.byMax,over:out.over});
  ok(out.kemMax<=1&&out.noLink===0,'2 Kèm = ONE summary line + «Xem đầy đủ trong Sổ ghi»',{kemMax:out.kemMax,noLink:out.noLink});
  ok(out.nLost===0,'3 every folded person change is in the Sổ ghi record',out.lost);
  ok(out.npcWhy.length===0,'4 0 «Vì sao» citing other people\'s business',out.npcWhy);
  ok(out.tabs&&out.tabs.sub&&out.tabs.search&&out.tabs.rows1!=null&&out.tabs.rows1<out.tabs.rows0,'5 Sổ ghi kind tabs + search narrows',out.tabs);
  ok(errs.length===0&&!out.err,'6 0 page errors',errs.slice(0,3))}
 if(JOUT)fs.writeFileSync(JOUT,JSON.stringify(out,null,1));
 await b.close();const f=res.filter(x=>!x).length;console.log(REP?'REPORT':f?`ONE-SIEVE FAIL ${f}`:`ONE-SIEVE PASS ${res.length}/${res.length}`);process.exit(f&&!REP?1:0)})();
