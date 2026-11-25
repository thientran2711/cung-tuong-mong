/* robot10 E-FIX-2 family scan «shown gain ≠ applied gain» (E round 1: «Tâm cơ +3» vs tamco −1, «Sủng +2» vs sung −1, «Bạc +8» vs bac 20):
   runs the robot's OWN one-core audit (robot10-in.js auditOpt; file = R10IN= or dev/measure/robot10-in.js) over
   (1) EVERY road-beat option of EVERY arc (ARC67: each beat drawn through PEND.j67, the card she gets) and (2) the «Bạc lạ» bribe card (both seats' text);
   prints the «number» rows. LIVE harness: the false rows; fixed harness: only rows where the line she sees really disagrees with the effect.
   usage: node dev/test/r10e-audit.js <save.json>   (prints counts; exit 1 when the fixed audit still flags a road option or the bribe card) */
const {chromium}=require('./lib/pw-roulette');const {serve,BASE}=require('./coop-serve.js');const fs=require('fs'),path=require('path');
const save=process.argv[2];let IN=fs.readFileSync(process.env.R10IN||path.join(__dirname,'../measure/robot10-in.js'),'utf8');
/* an older harness keeps auditOpt private: expose it the same way (no other change) */if(!/R\.auditOpt=/.test(IN))IN=IN.replace('R.bug=bug;','R.bug=bug;R.auditOpt=(o,m)=>auditOpt(o,m||{});');
(async()=>{const b=await chromium.launch({args:['--no-sandbox']});const ctx=await b.newContext({viewport:{width:755,height:1000},reducedMotion:'reduce'});await serve(ctx);
 await ctx.addInitScript(()=>{window.COOP_URL='http://127.0.0.1:9/'});await ctx.addInitScript(t=>{try{localStorage.setItem('hclh-save-v2-1',t)}catch(e){}},fs.readFileSync(save,'utf8'));
 const p=await ctx.newPage();await p.goto(BASE,{waitUntil:'domcontentloaded',timeout:120000});await p.waitForFunction(()=>typeof deser==='function'&&document.querySelector('#modal.kpthome'),null,{timeout:90000});
 await p.evaluate(()=>{$("title").hidden=false;showTitle();const bt=document.querySelector('#slots [data-load="1"]');if(bt)bt.click()});await p.waitForTimeout(2500);
 await p.evaluate(s=>{window.__r10cfg={};(0,eval)(s)},IN);
 const r=await p.evaluate(()=>{const R=window.__r10;
  const before=R.bugs.length;let road=0,beats=0,err=0;const A0=S.st&&S.st.M;const keep=A0?JSON.stringify(A0):null;
  for(const id of Object.keys(ARC67)){const a=ARC67[id];for(const bid of Object.keys(a.B||{})){const bd=a.B[bid];let O;try{O=typeof bd.o==="function"?null:bd.o}catch(e){O=null}if(!O||!O.some(o=>o&&(o.c||o.w)))continue;
    try{S.st.M=Object.assign({},A0||{},{a:id,cur:bid,nb:bid,seq:[bid],i:0,used:[],f:{},sc:0,done:false,v:{}});const pp={t:"m",a:id,b:bid,o:O.map(()=>100)};const card=PEND.j67(pp);if(!card||!card.o)continue;beats++;
     card.o.forEach(o=>{road++;R.auditOpt(o,{t:a.t||id})})}catch(e){err++}}}
  if(keep)S.st.M=JSON.parse(keep);
  const roadRows=R.bugs.slice(before).filter(x=>x.type==='number');
  let bribe=[];try{const v=rivals.find(x=>x.alive&&!x.queen),m=rivals.find(x=>x.alive&&x!==v);const L=cnvBribeOpts(S,v,m,BAL.coopBribe.pay);const b0=R.bugs.length;L.forEach(o=>R.auditOpt(o,{t:"Bạc lạ"}));bribe=R.bugs.slice(b0).filter(x=>x.type==='number')}catch(e){bribe=[{msg:'probe error '+e.message}]}
  return {beats,road,err,roadRows:roadRows.map(x=>x.msg+' | '+x.detail.slice(0,140)),bribe:bribe.map(x=>x.msg+' | '+(x.detail||'').slice(0,140))}});
 console.log(`road beats drawn ${r.beats} (options ${r.road}, draw errors ${r.err})`);console.log(`road «number» rows: ${r.roadRows.length}`);r.roadRows.slice(0,12).forEach(x=>console.log('  '+x));
 console.log(`«Bạc lạ» «number» rows: ${r.bribe.length}`);r.bribe.forEach(x=>console.log('  '+x));
 await b.close();process.exit(r.roadRows.length+r.bribe.length?1:0)})();
