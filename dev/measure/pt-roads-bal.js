/* pt-roads-bal (review/phutang-road, E21; copy of bd-roads-bal r2): Phù Tang's own roads (jrd_pt.js / jrd_pt2.js) in the REAL build.
   (1) every option of every chapter .4–.11 has a real loss (cost c, odds with a loss l or an ending, or an ending ≤ mid) — law 3;
   (2) option value per beat at a neutral life (every stat 30, rank 3): value = Σgain·p − Σloss·(1−p) − Σcost; spread = max − min per beat,
       listed when above SPREAD (law 2: no option clearly better);
   (3) odds get harder with rank (law 5): base odds of every rolled option at rank 1 vs rank 8;
   (4) no digit or % in any player text (law 7); every {token} resolves;
   (5) a bot plays N lives per road (random options) and counts the .11 results reached + the rare finales seen (reachability).
   usage: node dev/measure/pt-roads-bal.js <url of dev/index.html> [lives per road=20] [roads=pt_hai,pt_su,pt_tang,pt_dang] */
const {chromium}=require('playwright');
const [,,URL,NL,RO]=process.argv;const N=+NL||20;const ROADS=(RO||'pt_hai,pt_su,pt_tang,pt_dang').split(',');const SPREAD=6;
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'});const p=await ctx.newPage();p.setDefaultTimeout(0);if(process.env.DBG)p.on('console',m=>console.log('C',m.text().slice(0,120)));
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));await p.goto(URL,{timeout:0});
 await p.waitForFunction(()=>typeof start==='function'&&typeof ROAD14==='object',null,{timeout:0});await p.waitForTimeout(1500);
 if(process.env.DBG)console.log('loaded');const R=await p.evaluate(([ROADS,SPREAD])=>{const out={};try{const kl=document.getElementById('kload');if(kl)kl.remove();document.getElementById('title').hidden=true;if(typeof S==='undefined'||!S||!S.origin){quiet=true;window.__forceOrigin='pf';start();quiet=false}}catch(e){}const W={danh:1,sung:1,duc:1,tamco:1,suc:.7,mat:4,th:.5,bac:.05};
  const val=o=>{let pr=1;if(o.o!=null){const A={f:{},sc:0,act:{},q97:{p:0,b:0}};try{pr=(typeof o.o==='function'?o.o(A):o.o)/100}catch(e){pr=NaN}}
   const s=(x,m)=>Object.entries(x||{}).reduce((t,[k,v])=>t+v*(W[k]==null?1:W[k])*m,0);return s(o.w,pr)+s(o.l,1-pr)+s(o.c,1)};
  const S0={};for(const k of ['danh','sung','duc','tamco','suc','mat','sac','tai','rank'])S0[k]=S[k];
  for(const k of ['danh','sung','duc','tamco','suc','sac','tai'])S[k]=30;S.mat=3;
  const tok=/\{([a-z0-9]+)\}/g;const known=new Set(Object.keys(typeof TOK67==='object'?TOK67:{}).concat(['v','maid','emp','me','dad','mom','v2','n1','n2']));
  for(const r of ROADS){const ids=[r].concat(Object.values(ROAD14[r]||{}));const res={chap:ids.length,opts:0,free:[],spread:[],rank:[],dom:[],xrow:[],typed:[],tok:new Set(),beats:0};
   for(const id of ids){const a=ARC67[id];if(!a)continue;
    const txt=[a.t,a.g,a.sj].concat(Object.values(a.E||{}).flatMap(e=>[e.t,e.tag]));
    for(const [bk,bd] of Object.entries(a.B||{})){res.beats++;const O=bd.o||[];txt.push(bd.h,bd.t);const vs=[],xo=[];
     for(const o of O){res.opts++;txt.push(o.n,o.rt,o.rf,o.wx,o.lx);
      const cost=o.c&&Object.values(o.c).some(v=>v<0),odds=o.o!=null,lossN=o.l&&Object.keys(o.l).length;
      const endLose=o.e&&(Array.isArray(o.e)?o.e.some(k=>a.E[k]&&(a.E[k].k<0||k==='mid')):a.E[o.e]&&a.E[o.e].k<=0);
      if(!cost&&!(odds&&(lossN||o.e))&&!endLose)res.free.push(id+'.'+bk+' «'+o.n+'»');
      if(!o.e)vs.push([val(o),o.n]);else{/* climax (e:) option, r2: value = p·V(win ending) + (1−p)·V(fail ending) + own w + cost (E[k].fx weighted) */
       const ek=Array.isArray(o.e)?o.e:[o.e,o.e],V=k=>{const E=a.E[k];return E?Object.entries(E.fx||{}).reduce((t,[q,v])=>t+v*(W[q]==null?1:W[q]),0):0};
       const pr=o.o==null?1:Math.min(1,Math.max(0,(typeof o.o==='function'?o.o({f:{},sc:0,act:{},q97:{p:0,b:0}}):o.o)/100));
       const cw=Object.entries(o.c||{}).reduce((t,[q,v])=>t+v*(W[q]==null?1:W[q]),0);
       vs.push([pr*V(ek[0])+(1-pr)*V(ek[1])+cw+Object.entries(o.w||{}).reduce((t,[q,v])=>t+v*(W[q]==null?1:W[q]),0),o.n]);
       xo.push({n:o.n,o,c:-cw,wk:(a.E[ek[0]]||{}).k||0,fk:(a.E[ek[1]]||{}).k||0})}
      if(odds){const A={f:{},sc:0,act:{},q97:{p:0,b:0}};S.rank=1;const lo=typeof o.o==='function'?o.o(A):o.o;S.rank=8;const hi=typeof o.o==='function'?o.o(A):o.o;S.rank=3;if(!(hi<lo))res.rank.push(id+'.'+bk+' «'+o.n+'» '+lo+'→'+hi)}}
     if(xo.length>1){/* dominance (law 2, r2): X beats Y on odds ≥, cost ≤, fail ending k ≥ and win ending k ≥, one strictly — checked with NO flag and with EVERY flag
       of the beat on (the flag bonus is earned by an earlier choice; equal flag states must never leave a dominated option) */
      const fs=new Set();/* the beat's flags, read from its BAL odds lists */
      const BQ=(BAL.road.fx[id]||BAL.arc.fx[id]||{})[bk]||[];for(const q of BQ)for(const t of (q&&q.o)||[])if(Array.isArray(t)&&t[0]==='f')t[1].split('|').forEach(g=>fs.add(g));
      const allOn={};fs.forEach(g=>allOn[g]=1);
      for(const [lab,F] of [['no flag',{}],['all flags',allOn]]){const P=x=>x.o.o==null?100:(typeof x.o.o==='function'?x.o.o({f:F,sc:0,act:{},q97:{p:0,b:0}}):x.o.o);
       for(const X of xo)for(const Y of xo){if(X===Y)continue;const px=P(X),py=P(Y);
        if(px>=py&&X.c<=Y.c&&X.fk>=Y.fk&&X.wk>=Y.wk&&(px>py||X.c<Y.c||X.fk>Y.fk||X.wk>Y.wk))res.dom.push(id+'.'+bk+' ['+lab+'] «'+X.n+'» p'+px+' cost'+X.c.toFixed(1)+' fail'+X.fk+' beats «'+Y.n+'» p'+py+' cost'+Y.c.toFixed(1)+' fail'+Y.fk)}}
      res.xrow.push(id+'.'+bk+': '+xo.map(x=>{const P0=x.o.o==null?100:(typeof x.o.o==='function'?x.o.o({f:{},sc:0,act:{},q97:{p:0,b:0}}):x.o.o);return '«'+String(typeof x.n==='function'?x.n({f:{},sc:0,act:{},q97:{p:0,b:0}}):x.n).slice(0,34)+'» p'+P0+' cost'+x.c.toFixed(1)+' '+x.wk+'/'+x.fk}).join(' | '))}
     if(vs.length>1){const mx=Math.max(...vs.map(x=>x[0])),mn=Math.min(...vs.map(x=>x[0]));if(mx-mn>SPREAD)res.spread.push(id+'.'+bk+' spread '+(mx-mn).toFixed(1)+' '+vs.map(x=>x[1]+'='+x[0].toFixed(1)).join(' | '))}}
    for(let t of txt){if(typeof t==='function'){try{t=t({act:{},f:{}})}catch(e){t=''}}/* r2: text functions (place-aware lines) are checked too */if(typeof t!=='string')continue;const s=t.replace(tok,'');if(/[0-9%]/.test(s))res.typed.push(id+': '+t.slice(0,60));let m;tok.lastIndex=0;while((m=tok.exec(t)))if(!known.has(m[1]))res.tok.add(m[1])}}
   res.tok=[...res.tok];out[r]=res}
  Object.assign(S,S0);return out},[ROADS,SPREAD]);
 for(const r of ROADS){const x=R[r];console.log(`\n== ${r}: chapters ${x.chap}, beats ${x.beats}, options ${x.opts}`);
  console.log(' no-loss options:',x.free.length);x.free.forEach(s=>console.log('   '+s));
  console.log(` beats with value spread > ${SPREAD}:`,x.spread.length);x.spread.forEach(s=>console.log('   '+s));
  console.log(' climax options dominated (odds + cost + fail):',x.dom.length);x.dom.forEach(s=>console.log('   '+s));
  if(process.env.XROWS)x.xrow.forEach(s=>console.log('   x '+s));
  console.log(' rolled options NOT harder at higher rank:',x.rank.length);x.rank.slice(0,10).forEach(s=>console.log('   '+s));
  console.log(' digits/% in text:',x.typed.length);x.typed.forEach(s=>console.log('   '+s));console.log(' unknown tokens:',x.tok.join(',')||'none')}
 /* (5) bot lives (STATIC=1: skip) */
 for(const r of ROADS){if(process.env.STATIC)break;if(!R[r]||R[r].chap<8)continue;const tally={},rare={};let ok=0,bad=[];
  for(let i=0;i<N;i++){/* a fresh page per life: one page grows past the renderer's memory over many lives */
   const c2=await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'});const q=await c2.newPage();q.setDefaultTimeout(0);q.on('pageerror',e=>errs.push(e.message.slice(0,200)));
   await q.goto(URL,{timeout:0});await q.waitForFunction(()=>typeof start==='function'&&typeof ROAD14==='object',null,{timeout:0});await q.waitForTimeout(1000);
   const x=await q.evaluate(async road=>{const kl=document.getElementById('kload');if(kl)kl.remove();document.getElementById('title').hidden=true;try{quiet=true;const k='pf';const others=Object.keys(ARC67).filter(id=>ARC67[id].o===k&&id!==road);
    localStorage.setItem('ctm-arcs',JSON.stringify({[k]:others}));localStorage.setItem('ctm-tm96','1');window.__forceOrigin=k;start();quiet=false;
    await new Promise(r=>setTimeout(r,50));if(!S||!S.st||!S.st.f14)return{err:'no f14'};if(S.st.f14.road!==road)return{err:'road '+S.st.f14.road};
    const ends={};let err=null;
    for(let mon=0;mon<400&&!S.st.ch.all;mon++){if(S.dead||S.out){S.dead=false;S.out=0;S.suc=60}const A=S.st.M;
     try{if(A&&!A.done&&!A.cur&&A.nb){A.due=0;fireBeat67(A)}if(A&&A.cur){const bd=beatDef67(A,A.cur);const O=opts67(A,bd);const i=Math.floor(Math.random()*O.length);const o=O[i];
       res67(thKey67(A),A.cur,i,o&&o.o!=null?oOf67(A,o,bd):100);if(A.done)ends[A.a]=A.end}}catch(e){err=err||e.message}
     if(S.st.ms)S.st.ms.force14=1;const t=S.turn;for(let g=0;g<40&&S.turn===t;g++){Q.length=0;used=0;try{nextBuoi()}catch(e){err=err||e.message;break}}Q.length=0;
     if(ends[road+'_11'])break}
    return{e11:ends[road+'_11']||null,e4:ends[road]||null,n:Object.keys(ends).filter(a=>a===road||a.startsWith(road+'_')).length,err}}catch(e){return{err:e.message}}},r).catch(e=>({err:'renderer: '+String(e.message||e).slice(0,60)}));
   await c2.close().catch(()=>{});console.log(` life ${i+1} ${r}: .4=${x.e4} .11=${x.e11} ${x.err||''}`);if(x.err)bad.push(x.err);if(x.e11){ok++;tally[x.e11]=(tally[x.e11]||0)+1}}
  console.log(`\n== bot ${r}: ${N} lives, reached .11 ${ok}; .11 results ${JSON.stringify(tally)}; errors ${bad.length} ${bad.slice(0,3).join(' / ')}`)}
 console.log('\npage errors:',errs.length,errs.slice(0,5).join(' / '));await b.close()})();
