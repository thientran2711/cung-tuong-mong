/* road-full (review/road-map): the full origin roads of jroad.js (ROAD_MAP.md §3).
   For every road with all chapters registered (ROAD14 + rdFull): a fast story bot starts a new life of that origin with the road forced
   (ctm-arcs history makes it the only fresh premise), plays every due hồi with a random (or the first) option and checks:
   - chapters 4..11 are the road: .4 = the premise arc, then <road>_5 … <road>_11, in order; 1..3 tutorial, 12..14 endgame; never above 14;
   - the origin ending of the life is told by the road finale (S.st.ch.fin = the .11 ending tag) and the frame reaches 14;
   - the road's rival (act.v) is the SAME person in every chapter while she lives (ROAD_MAP §5.2);
   - a road NOT complete keeps the phase-1 frame (other premises + shared + st_the);
   - no page errors. Sizes: the chapter cards are the j67 kit cards (sizes are checked by the story14-view test).
   usage: node dev/test/road-full.js <url> [lives per road] */
const {chromium}=require('./lib/dlgs-off').pw('off');/* checks cards / screens: side-line dialogue scenes off (lib/dlgs-off.js) */
const [,,URL,NL,ONLY]=process.argv;/* ONLY = comma list of roads to walk (default: every full road) */const NLIV=+NL||3;
(async()=>{const b=await chromium.launch();const errs=[];const ok=[];const chk=(n,c,x)=>{ok.push([n,!!c]);if(!c)console.error('FAIL',n,JSON.stringify(x).slice(0,900))};
 let p;/* boot(): a fresh context = a fresh world (the world and its children carry over from life to life in one storage) */
 const boot=async()=>{if(p)await p.context().close();const ctx=await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'});p=await ctx.newPage();await p.addInitScript(require('./lib/qdrain').init);/* headless loop: __bot + answer the night choice (lib/qdrain.js, NPCROADS-RED) */p.setDefaultTimeout(0);
 p.on('pageerror',e=>errs.push(e.message.slice(0,300)));await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});
 await p.waitForFunction(()=>typeof start==='function'&&typeof ROAD14==='object',null,{timeout:0});await p.waitForTimeout(1500);
 await p.evaluate(()=>{document.getElementById('title').hidden=true;
  window.__run=async(k,road,pick)=>{quiet=true;const others=Object.keys(ARC67).filter(id=>ARC67[id].o===k&&id!==road);
   try{localStorage.setItem('ctm-arcs',JSON.stringify({[k]:others}));localStorage.setItem('ctm-tm96','1')}catch(e){}window.__forceOrigin=k;start();quiet=false;await new Promise(r=>{let n=0;const t=()=>{if((typeof S!=='undefined'&&S&&S.origin)||++n>150)r();else setTimeout(t,100)};t()});/* start() can set S a tick later (fresh storage) */Q.length=0;
   if(typeof S==='undefined'||!S||!S.origin)return{err:'boot'};/* the boot screen can reset S after a slow load (parallel runs): retried */
   if(S.origin.k!==k||!S.st.f14)return{err:'origin '+S.origin.k};
   if(S.st.f14.road!==road&&!arcOk67(ARC67[road]))return{k,gate:false,road:S.st.f14.road,seq:[]};
   const seq=[],vs=[],ends=[];let lastN=0,stuck=0,err=null,mon=0;
   for(;mon<400&&!S.st.ch.all;mon++){const c=S.st.ch;if(c.n!==lastN){seq.push(c.n+':'+(S.st.ms?S.st.ms.id:S.st.M?S.st.M.a:'?'));lastN=c.n;stuck=0}
    if(S.dead||S.out){S.dead=false;S.out=0;S.suc=60}
    const A=S.st.M;try{if(A&&A.act&&A.act.v!=null){const v=RV(A.act.v);vs.push({a:A.a,v:A.act.v,alive:!!(v&&v.alive&&!v.out)})}
     if(A&&!A.done&&!A.cur&&A.nb){A.due=0;fireBeat67(A)}if(A&&A.cur){const bd=beatDef67(A,A.cur);const O=opts67(A,bd);const i=pick==='rand'?Math.floor(Math.random()*O.length):0;
      const o=O[i];res67(thKey67(A),A.cur,i,o&&o.o!=null?oOf67(A,o,bd):100);if(A.done)ends.push(A.a+'='+A.end)}}catch(e){err=err||('beat '+e.message+' '+(e.stack||'').split('\n')[1])}
    if(S.st.ms&&++stuck>2){if(S.st.ms.id==='len14'&&S.srv&&!S.srv.risen){S.age=Math.max(S.age||0,18);srvRise('bot')}else S.st.ms.force14=1}
    const t=S.turn;for(let g=0;g<40&&S.turn===t;g++){__qDrain();used=0;try{nextBuoi()}catch(e){err=err||('buoi '+e.message);break}}Q.length=0}
   return{k,gate:arcOk67(ARC67[road]),road:S.st.f14.road,rd:S.st.f14.rd||'',plan:S.st.ch.plan.join(','),seq,vs,ends,tm:(S.st.X||[]).filter(t=>ARC67[t.a]&&ARC67[t.a].o==='tm').map(t=>t.a+(t.done?'=done':'')).join(' '),tmq:(S.st.f14.tmq||[]).join(' '),all:!!S.st.ch.all,n:S.st.ch.n,fin:S.st.ch.fin||'',months:mon,err}};
  const md0=msDone67;msDone67=function(m){return m.force14?true:md0.apply(this,arguments)}});};await boot();
 const roads=(await p.evaluate(()=>Object.keys(ROAD14).filter(r=>rdFull(r)))).filter(r=>!ONLY||ONLY.split(',').includes(r));console.log('full roads:',roads.join(' ')||'(none)');
 chk('at least one full road registered',roads.length>0,roads);
 for(const rd of roads){const k=await p.evaluate(rd=>ARC67[rd]&&ARC67[rd].o&&ARC67[rd].o!=='rd'?ARC67[rd].o:rd.split('_')[0],rd);/* review/phutang-road: the origin is the premise arc's o (pt_* roads belong to the pf branch), else the id prefix */
  for(let L=0;L<NLIV;L++){let R;for(let t=0;t<4;t++){R=await p.evaluate(([k,rd,pk])=>window.__run(k,rd,pk),[k,rd,L===0?0:'rand']);if(R&&R.err==='boot'){await p.waitForTimeout(5000);continue}/* the premise cannot be rolled in this life (its ok(), e.g. thd_hoc needs a pupil): a new life, told */if(R&&R.seq&&R.road!==rd&&R.gate===false&&t<3){console.log(rd,'life',L+1,'premise not rollable in this world (ok() false), a fresh world');await boot();continue}break}
   if(!R.seq){chk(`${rd} L${L+1}: no error`,false,R.err||R);continue}/* __run returned {err} (B2 finding) */
   console.log(rd,'life',L+1,R.n,R.all?'ALL':'',R.months+'m','fin='+R.fin,'|',R.seq.join(' '),R.err||'');
   const ns=R.seq.map(x=>+x.split(':')[0]);
   chk(`${rd} L${L+1}: no error`,!R.err,R.err);
   chk(`${rd} L${L+1}: road kept (rd=${R.rd})`,R.road===rd&&R.rd===rd,[R.road,R.rd,R.plan]);
   chk(`${rd} L${L+1}: chapters 1..14 in order`,R.all&&R.n===14&&ns.every((n,i)=>n===i+1),R.seq);
   const want=[rd].concat([5,6,7,8,9,10,11].map(n=>rd+'_'+n));const got=R.seq.filter(x=>{const n=+x.split(':')[0];return n>=4&&n<=11}).map(x=>x.split(':')[1]);
   chk(`${rd} L${L+1}: chapters 4..11 are the road in order`,JSON.stringify(got)===JSON.stringify(want),{got,want});
   chk(`${rd} L${L+1}: Thanh mai trúc mã never takes a numbered chapter`,!R.seq.some(x=>/tm96/.test(x)),R.seq);
   if(R.tm||R.tmq)console.log('  side tm96:',R.tm,'| queued:',R.tmq);
   chk(`${rd} L${L+1}: origin ending told by the road finale`,!!R.fin&&R.ends.some(e=>e.startsWith(rd+'_11=')),[R.fin,R.ends.slice(-2)]);
   /* one rival per road while she lives */
   const byId={};let lastAlive=null,recastBad=[];for(const x of R.vs){if(!x.a.startsWith(rd))continue;if(lastAlive!=null&&x.v!==lastAlive.v&&lastAlive.alive){recastBad.push([lastAlive.a,lastAlive.v,x.a,x.v])}lastAlive=x}
   chk(`${rd} L${L+1}: the road's rival is the same person while alive`,!recastBad.length,recastBad.slice(0,4))}}
 /* a road not complete keeps the phase-1 frame */
 const part=await p.evaluate(()=>{for(const k of ['tt','dtq','muoi','cn','nc','td','ch','thd']){const L=Object.keys(ARC67).filter(id=>ARC67[id].o===k&&!rdFull(id));if(L.length)return L[0]}return''});
 if(part){const R=await p.evaluate(([rd])=>{const k=ARC67[rd].o;const others=Object.keys(ARC67).filter(id=>ARC67[id].o===k&&id!==rd);localStorage.setItem('ctm-arcs',JSON.stringify({[k]:others}));window.__forceOrigin=k;quiet=true;start();quiet=false;Q.length=0;return{road:S.st.f14.road,rd:S.st.f14.rd||'',plan:S.st.ch.plan.join(',')}},[part]);
  chk(`incomplete road ${part} keeps the phase-1 frame`,R.road===part&&!R.rd&&/o,o,o,o,fin/.test(R.plan.replace(/st:tm96[abc],/g,''))&&R.plan.includes('st:st_the'),R)}
 chk('no page errors',!errs.length,errs.slice(0,5));
 const nb=ok.filter(x=>!x[1]).length;console.log(`road-full: ${ok.length-nb}/${ok.length} pass`);await b.close();process.exit(nb?1:0)})();
