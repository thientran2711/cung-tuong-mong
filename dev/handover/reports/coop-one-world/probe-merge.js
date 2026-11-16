/* one-world probe: same base week, run endTurn as host (seat a) and as guest (seat b) with different RNG; diff + merge3. */
const {chromium}=require('playwright');const path=require('path');
const WT='/home/user/wt/oneworld';const {serve,BASE}=require(WT+'/dev/test/coop-serve.js');
(async()=>{const {m3,merge3}=await import(WT+'/coop/worker/src/merge.js').catch(e=>({}));
const merge=merge3||m3;
const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:1180,height:820}});await serve(ctx);
await ctx.addInitScript(()=>{window.COOP_URL='http://127.0.0.1:9';});
const p=await ctx.newPage();p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto(BASE+'index.html',{waitUntil:'domcontentloaded'});
await p.waitForFunction(()=>typeof start==='function'&&typeof endTurn==='function'&&window.COOPW);
const WEEKS=+process.env.W||10, RUNS=+process.env.RUNS||4;
const out=await p.evaluate(async([WEEKS,RUNS])=>{
 let seed=1;const rnd=()=>{seed=(seed*1103515245+12345)%2147483648;return seed/2147483648};const nat=Math.random;
 window.__nlInner=1;document.getElementById('title').hidden=true;for(let i=0;i<20&&!(typeof S!=='undefined'&&S&&S.name);i++)start();Q.length=0;
 const drain=()=>{for(let i=0;i<60&&Q.length;i++){Q.shift()}S.mg=null};
 for(let w=0;w<WEEKS;w++){drain();S.buoi=B4L;try{endTurn()}catch(e){}drain();if(S.dead)break}
 const res=[];
 for(let r=0;r<RUNS;r++){
  /* advance one more week single player to vary the base; force month tick on odd runs */
  drain();S.buoi=B4L;try{endTurn()}catch(e){}drain();
  if(r%2)S.tuan=2;
  const base=JSON.stringify(ser());
  const fake=(seat)=>{COOPW.on=true;COOPW.seat=seat;COOPW.base={P:{}};COOPW.sent=-1;COOPW.pend=false;COOPW.p2=false;
    COOP.state.status='open';COOP.state.peerOnline=true;COOP.state.week=0;COOP.state.ended={};COOP.state.you=seat};
  const runSeat=(seat,sd)=>{quiet=true;try{deser(JSON.parse(base))}finally{quiet=false}Q.length=0;S.mg=null;
    fake(seat);const c0=COOPW.toCanon();seed=sd;Math.random=rnd;let err=null;
    try{S.buoi=B4L;endTurn()}catch(e){err=String(e)}Math.random=nat;drain();
    const c1=COOPW.toCanon();COOPW.on=false;COOPW.pend=false;return {c0,c1,err}};
  const H=runSeat('a',1000+r*7),G=runSeat('b',5000+r*13);
  res.push({H,G,month:r%2});
 }
 return res},[WEEKS,RUNS]);
const fs=require('fs');fs.writeFileSync('/home/user/wt/oneworld-probe/raw.json',JSON.stringify(out));
console.log('runs',out.length,'errs',errs.slice(0,5));await b.close()})();
