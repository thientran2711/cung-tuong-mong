/* D18 origins (review/origins; branch form review/origin-bd-branch): hòa thân = ONE origin card (nc) with country branches Nam Chiếu (nc) and
   Bắc Địch (bd, ORIGIN_BR); lore on the identity card, 9-card roulette (one hòa thân card), bd lands on the hòa thân card, arcs play to an end,
   save round trip, old 'bd' save maps to hòa thân + Bắc Địch, pre-rolled lives keep their origin (ow 1/2), branch roll (ow 3).
   usage: NODE_PATH=$(npm root -g) node dev/test/origins.js <url> <W>x<H>[@dpr] <outdir> */
const {chromium}=require('playwright');const [,,URL,VP,OUT]=process.argv;const [WH,DPR]=(VP||'755x1000').split('@');const [W,H]=WH.split('x').map(Number);
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+(DPR||1),hasTouch:true,isMobile:W<1100,serviceWorkers:'block'});const p=await ctx.newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));const res={VP};const ok=[];const chk=(n,c)=>ok.push([n,!!c]);
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:120000});await p.waitForTimeout(1200);
 const shot=n=>OUT?p.screenshot({path:`${OUT}/origins-${W}x${H}-${n}.jpg`,type:'jpeg',quality:70}):0;
 for(const K of ['bd','nc']){
  await p.evaluate(k=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;window.__kroulKey=null;window.__forceOrigin=k;document.getElementById('title').hidden=true;start()},K);
  await p.waitForFunction(()=>document.querySelector('#kroul .krt'),null,{timeout:60000});await p.waitForFunction(()=>[...document.querySelectorAll('#kroul img')].every(i=>i.complete),null,{timeout:15000}).catch(()=>{});await p.waitForTimeout(1500);
  const r=await p.evaluate(()=>{const t=[...document.querySelectorAll('#kroul .krt')];const vw=innerWidth,vh=innerHeight;const box=document.querySelector('#kroul .krbox').getBoundingClientRect();
   return{n:t.length,keys:t.map(x=>x.dataset.k),ovX:document.documentElement.scrollWidth>vw,boxFit:box.bottom<=vh+1&&box.top>=-1,imgs:t.every(x=>{const i=x.querySelector('img');return i&&i.complete&&i.naturalWidth>0})}});
  res['roul_'+K]=r;chk(K+' roulette 9 cards: one hòa thân card (nc), no separate bd card',r.n===9&&!r.keys.includes('bd')&&r.keys.includes('nc'));
  const tg=await p.evaluate(()=>{const t=document.querySelector('#kroul .krt[data-k="nc"] .krn');return t&&t.textContent});res['ncname_'+K]=tg;chk(K+' hòa thân card named by the origin',/^Công chúa hòa thân/.test(tg||''));chk(K+' cards fit viewport',r.boxFit&&!r.ovX);chk(K+' all card pictures loaded',r.imgs);
  if(K==='bd')await shot('roulette');
  await p.evaluate(()=>{document.querySelector('#kroul .krskip').click()});await p.waitForFunction(()=>{const d=document.querySelector('#modal .kpidart img');return d&&d.complete},null,{timeout:15000}).catch(()=>{});await p.waitForTimeout(800);
  const c=await p.evaluate(()=>{const lore=document.querySelector('#modal .kpidl');const d=document.querySelector('#modal .kpidart img');const dlg=document.querySelector('#modal .dlg');
   return{origin:S.origin.k,par:S.origin.par||S.origin.k,root:originRoot(S.origin.k),pick:window.__kroulStep,name:S.origin.n,rank:S.rank,th:S.th,lore:lore&&lore.textContent,pic:d&&d.naturalWidth,ovX:document.documentElement.scrollWidth>innerWidth,dlgOver:dlg?dlg.scrollWidth>dlg.clientWidth+1:null}});
  res['card_'+K]=c;chk(K+' card origin matches',c.origin===K);chk(K+' branch of hòa thân (root nc)',c.root==='nc'&&c.par==='nc');chk(K+' lore shown (Gốc gác + Triều đình đối đãi)',c.lore&&/Gốc gác/.test(c.lore)&&/Triều đình đối đãi/.test(c.lore));chk(K+' wide picture loaded',c.pic>0);chk(K+' no x overflow',!c.ovX&&!c.dlgOver);
  await shot('card-'+K);
 }
 /* accept the bd life, play: 4 arcs end properly, old-save style round trip, chapters, family letter */
 await p.evaluate(()=>{window.__forceOrigin='bd';try{store.set(NL_KEY,null)}catch(e){}window.__kroulKey=null;start()});await p.waitForFunction(()=>document.querySelector('#kroul .krt'),null,{timeout:60000});
 await p.evaluate(()=>{document.querySelector('#kroul .krskip').click();try{nlAccept(false)}catch(e){}document.querySelectorAll('#kroul,#kroulw').forEach(e=>e.remove())});await p.waitForTimeout(800);
 const arcs=await p.evaluate(RUNS=>{const out={};a67init('bd');const ids=arcIds67('bd');out.ids=ids;out.v2=v267();out.ch=S.st&&S.st.ch&&{na:S.st.ch.na,pool:S.st.ch.pool.length};
  const ends={};let thrown=0;for(const id of ids){ends[id]={};for(let n=0;n<RUNS;n++){try{const A=newThread67(id,'m');S.st.M=A;S.st.ms=null;let g=0;while(!A.done&&g++<30){Q.length=0;A.due=0;if(!A.nb)pickNext67(A);if(!A.nb)break;fireBeat67(A);showModal();const m=Q[0];if(!m||!m.opts||!m.opts.length){A.used.push(A.nb);break}chooseM((L=>L.length?L[Math.floor(Math.random()*L.length)]:0)(m.opts.map((c,i)=>c.off?-1:i).filter(i=>i>=0)));S.bac=Math.max(S.bac,300)}
     ends[id][A.end||'?']=(ends[id][A.end||'?']||0)+1}catch(e){thrown++;out.err=String(e.stack||e).slice(0,300)}}}
  out.ends=ends;out.thrown=thrown;
  /* old save from the separate-origin build: ok:'bd' -> hòa thân + Bắc Địch branch */
  {const sv=ser();sv.ok='bd';S.origin=null;deser(JSON.parse(JSON.stringify(sv)));out.old={k:S.origin&&S.origin.k,par:S.origin&&S.origin.par,n:S.origin&&S.origin.n,story:!!STORY[S.origin.k],q:!!QUEST67[S.origin.k]}}
  /* pre-rolled lives: ow 1 never bd, ow 2 = frozen table (bd may come), ow 3 = one hòa thân card, then its branch */
  {const C={1:{},2:{},3:{}};for(let s=1;s<=6000;s++)for(const w of [1,2,3]){const k=ow69Pick(s*7919,w);C[w][k]=(C[w][k]||0)+1}out.pre=C;
   const W=BAL.orig.ow,B=BAL.orig.br.nc,tw=Object.values(W).reduce((a,b)=>a+b,0),tb=Object.values(B).reduce((a,b)=>a+b,0);out.exp={nc:6000*W.nc/tw*B.nc/tb,bd:6000*W.nc/tw*B.bd/tb}}
  const ev=T72I.fam_bd;out.fam=!!ev&&ev.rf();
  Q.length=0;const sv=ser();const o0=S.origin.k;S.origin=null;deser(JSON.parse(JSON.stringify(sv)));out.rt=S.origin&&S.origin.k===o0;return out},+process.env.RUNS||3);
 res.arcs=arcs;chk('bd has 4 arcs',arcs.ids.length===4);chk('chapter line v2 started',arcs.v2&&arcs.ch&&arcs.ch.na>=3);chk('arcs ran without exception',!arcs.thrown);
 chk('every arc reaches an end (no unfinished thread)',arcs.ids.every(id=>!arcs.ends[id]['?']&&Object.keys(arcs.ends[id]).length>=1));chk('family letter fam_bd for bd',arcs.fam);chk('save round trip keeps bd',arcs.rt);
 chk('old save ok:bd loads as hòa thân + Bắc Địch',arcs.old&&arcs.old.k==='bd'&&arcs.old.par==='nc'&&arcs.old.story&&arcs.old.q);
 chk('ow1 pre-rolled lives never roll bd',!arcs.pre[1].bd);chk('ow2 pre-rolled lives keep the frozen table (bd possible)',arcs.pre[2].bd>0);
 chk('ow3 bd and nc shares match BAL (±25%)',['nc','bd'].every(k=>Math.abs((arcs.pre[3][k]||0)-arcs.exp[k])<=arcs.exp[k]*.25+15));
 res.errs=errs;res.fail=ok.filter(x=>!x[1]).map(x=>x[0]);res.pass=ok.filter(x=>x[1]).length;console.log(JSON.stringify(res));await b.close()})();
