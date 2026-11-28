/* bd-legacy-save (review/bd-roads, E14; law 6c): Bắc Địch's old premises keep working for saves that already rolled them.
   1) a bd life on the OLD premise bd_hoa (alias chapters = nc_su) saved mid-road (.6 running) loads in a fresh page and plays on to bd_hoa_11;
   2) new bd lives roll ONLY the new roads (bd_san / bd_soi / bd_tuyet / bd_hen that are full), never an old premise.
   usage: node dev/test/bd-legacy-save.js <url of dev/index.html> [new lives=8] */
const {chromium}=require('./lib/dlgs-off').pw('off');/* checks cards / screens: side-line dialogue scenes off (lib/dlgs-off.js) */const [,,URL,NL]=process.argv;
(async()=>{const b=await chromium.launch();const errs=[];let fail=0;const chk=(n,c,x)=>{if(!c)fail++;console.log(c?'PASS':'FAIL',n,c?'':JSON.stringify(x).slice(0,600))};
 const boot=async()=>{const ctx=await b.newContext({viewport:{width:1180,height:820},serviceWorkers:'block'});const p=await ctx.newPage();await p.addInitScript(require('./lib/qdrain').init);/* headless loop: __bot + answer the night choice (lib/qdrain.js, NPCROADS-RED) */p.setDefaultTimeout(0);
  p.on('pageerror',e=>errs.push(e.message.slice(0,200)));await p.goto(URL,{timeout:0});
  await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function'&&typeof ROAD14==='object',null,{timeout:0});await p.waitForTimeout(1200);return p};
 const PLAY=`window.__play=(stop)=>{let err=null;for(let mon=0;mon<500&&!S.st.ch.all;mon++){if(S.dead||S.out){S.dead=false;S.out=0;S.suc=60}const A=S.st.M;
   if(stop&&stop())return{err};try{if(A&&!A.done&&!A.cur&&A.nb){A.due=0;fireBeat67(A)}if(A&&A.cur){const bd=beatDef67(A,A.cur);const O=opts67(A,bd);const i=Math.floor(Math.random()*O.length);const o=O[i];
   res67(thKey67(A),A.cur,i,o&&o.o!=null?oOf67(A,o,bd):100)}}catch(e){err=err||e.message}if(S.st.ms)S.st.ms.force14=1;
   const t=S.turn;for(let g=0;g<40&&S.turn===t;g++){__qDrain();used=0;try{nextBuoi()}catch(e){err=err||e.message;break}}Q.length=0}return{err}}`;
 /* 1) old save */
 let p=await boot();await p.evaluate(PLAY);
 const sv=await p.evaluate(async()=>{const kl=document.getElementById('kload');if(kl)kl.remove();document.getElementById('title').hidden=true;
  const keep=BD_OLD.splice(0);/* the build before this branch: old premises dealt */
  const others=Object.keys(ARC67).filter(id=>ARC67[id].o==='bd'&&id!=='bd_hoa');localStorage.setItem('ctm-arcs',JSON.stringify({bd:others}));localStorage.setItem('ctm-tm96','1');
  window.__forceOrigin='bd';quiet=true;start();quiet=false;await new Promise(r=>setTimeout(r,300));BD_OLD.push(...keep);
  if(!S.st.f14||S.st.f14.road!=='bd_hoa')return{err:'road '+(S.st.f14&&S.st.f14.road)};
  const r=__play(()=>S.st.M&&S.st.M.a==='bd_hoa_6'&&!S.st.M.done);return{save:JSON.stringify(ser()),at:S.st.M&&S.st.M.a,err:r.err,plan:S.st.ch.plan.filter(x=>/bd_hoa/.test(x)).join(',')}});
 chk('old bd_hoa life reaches .6 and saves',sv.save&&sv.at==='bd_hoa_6',{at:sv.at,err:sv.err,plan:sv.plan});
 await p.context().close();
 if(sv.save){p=await boot();await p.evaluate(PLAY);
  const r=await p.evaluate(s=>{const kl=document.getElementById('kload');if(kl)kl.remove();document.getElementById('title').hidden=true;Q.length=0;deser(JSON.parse(s));
   const rd=S.st.f14.rd,ends=[];const a0=S.st.M&&S.st.M.a;const x=__play(()=>{const e=S.st.f14.ends||{};return !!e[11]});
   return{rd,a0,ends:S.st.f14.ends,fin:S.st.ch.fin||'',err:x.err}},sv.save);
  chk('old save loads in a fresh page, keeps road bd_hoa, plays on to bd_hoa_11',r.rd==='bd_hoa'&&r.a0==='bd_hoa_6'&&r.ends&&r.ends[11]&&!r.err,r);
  await p.context().close()}
 /* 2) new lives */
 p=await boot();const NN=+NL||8;const got={};
 for(let i=0;i<NN;i++){const r=await p.evaluate(async()=>{const kl=document.getElementById('kload');if(kl)kl.remove();document.getElementById('title').hidden=true;
   window.__forceOrigin='bd';quiet=true;start();quiet=false;await new Promise(r=>setTimeout(r,200));return S.st.f14&&S.st.f14.road});got[r]=(got[r]||0)+1}
 /* ROAD-TESTS-QDRAIN 27/11: the bd road list grew after this test (composed roads jrdcsd.js: bd_lua, bd_su, bd_luuly), so the fixed list of 4 is
   stale. The law-6c rule stays: a NEW life never rolls an OLD premise (the game's own BD_OLD) and always gets a road. */
 const OLD=await p.evaluate(()=>BD_OLD.slice());chk('new bd lives roll only the new roads (never BD_OLD) '+JSON.stringify(got),Object.keys(got).every(k=>k&&k!=='null'&&k!=='undefined'&&!OLD.includes(k))&&OLD.length===4,{got,OLD});
 chk('no page errors',!errs.length,errs.slice(0,5));await b.close();process.exit(fail?1:0)})();
