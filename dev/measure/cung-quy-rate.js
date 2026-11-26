/* CUNG QUY robot measure (owner OD 26/11 ~06:50Z (C), FOREMAN D order 07:10Z step 4): NPC acts per tuần that break rank etiquette.
   usage: node dev/measure/cung-quy-rate.js <build.html> [tuần] [runs] [--off] [--inject dev/build/jcq.js]
   --off    : BAL.cq.on = 0 (the rule only counts, gates off = LIVE behaviour on this build)
   --inject : a LIVE build without jcq: the counter is added after load and switched off (pure count of LIVE)
   Prints {tuan, acts, bad (landed breaks that are no deliberate breach), br (deliberate breaches, own consequence), blk (stopped), byKey}. */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');
const A=process.argv.slice(2);const U0=A[0]||'dev/index.html';const U=/^(https?|file):/.test(U0)?U0:'file://'+path.resolve(U0);
const D=+A[1]||8,RUNS=+A[2]||2,OFF=A.includes('--off');const ii=A.indexOf('--inject');const INJ=ii>=0?fs.readFileSync(A[ii+1],'utf8'):null;
(async()=>{const b=await chromium.launch();const T={tuan:0,acts:0,bad:0,br:0,blk:0,byBad:{},byBr:{},byBlk:{},errs:[]};
 for(let r=0;r<RUNS;r++){const p=await b.newPage();p.on('pageerror',e=>T.errs.push(e.message));await p.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)$/,x=>x.abort());
  await p.goto(U);await p.waitForTimeout(800);await p.evaluate(()=>localStorage.clear());await p.reload();await p.waitForTimeout(800);
  await p.evaluate(()=>document.querySelector('#slots button[data-new="1"]').click());await p.waitForTimeout(1500);if(INJ)await p.addScriptTag({content:INJ});
  const x=await p.evaluate(async([D,OFF,INJ])=>{if(OFF||INJ)BAL.cq.on=0;window.__bot=1;Q.length=0;
   const w0=wk();for(const k of ["bad","br","blk"])CQN[k]={};CQN.n=0;
   const drain=()=>{for(let n=0;n<40&&Q.length;n++){const m=Q[0];try{if(m.opts&&m.opts.length)chooseM(0);else closeModal()}catch(e){}if(Q[0]===m)Q.shift()}};
   for(let i=0;i<D*6&&!S.dead&&wk()-w0<D;i++){drain();S.mg=0;try{placeWhere();if(typeof agFlush==='function')agFlush()}catch(e){}drain();try{if((S.buoi||0)>=3)endTurn();else nextBuoi()}catch(e){}drain()}const s=o=>Object.values(o).reduce((a,b)=>a+b,0);
   return {tuan:wk()-w0,acts:CQN.n,bad:s(CQN.bad),br:s(CQN.br),blk:s(CQN.blk),byBad:CQN.bad,byBr:CQN.br,byBlk:CQN.blk}},[D,OFF,!!INJ]);
  for(const k of ["tuan","acts","bad","br","blk"])T[k]+=x[k];for(const k of ["byBad","byBr","byBlk"])for(const q in x[k])T[k][q]=(T[k][q]||0)+x[k][q];await p.close()}
 T.badPerTuan=+(T.bad/Math.max(1,T.tuan)).toFixed(3);T.brPerTuan=+(T.br/Math.max(1,T.tuan)).toFixed(3);T.errs=[...new Set(T.errs)].slice(0,5);console.log(JSON.stringify(T));await b.close()})();
