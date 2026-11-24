/* E74 THẤT SỦNG ROBOT (review E72r item 1, law 1): the real monthTick, 6 lives × 120 months; 3 low NPC consorts per life forced to
   Sủng 0 / Danh 0 / rank 0 at the start (the reviewer's setup). Counts the NPCs that enter thất sủng and the ones that leave it again.
   PASS = some NPC entered AND some NPC that entered left (thất sủng is not a one-way trap). Also prints her own recall chance.
   usage: node dev/test/leave-palace-tsrobot.js [index.html]   → exit 1 on FAIL or page error */
const {chromium}=require('playwright');const path=require('path');
const HTML=path.resolve(process.argv[2]||path.join(__dirname,'../../index.html'));
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:1180,height:820},serviceWorkers:'block'})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto('file://'+HTML,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof monthTick==='function',null,{timeout:0});await p.waitForTimeout(1500);
 const lives=[];
 for(let life=0;life<6;life++){
  const r=await p.evaluate(async()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;quiet=true;start();quiet=false;
   await new Promise(r=>{let n=0;const t=()=>{if((typeof S!=='undefined'&&S&&S.origin)||++n>150)r();else setTimeout(t,100)};t()});if(S.kc)S.kc.inPal=1;if(typeof menInit==='function')menInit();
   const L=rivals.filter(x=>x&&x.alive&&!x.out&&!x.queen&&!x.coop).slice(0,3);for(const v of L){v.rank=0;v.sung=0;v.danh=0}
   const st={};for(const v of L)st[v.id]={n:v.name,ent:0,left:0,months:0};let months=0,err="";
   for(let mo=0;mo<120;mo++){if(S.dead)break;try{monthTick()}catch(e){err=e.message;break}Q.length=0;months++;
    for(const v of L){const s=st[v.id];if(!v.alive||v.out)continue;if(v.thatS){s.months++;if(!s.in){s.in=1;s.ent++}}else if(s.in){s.in=0;s.left++}}}
   return {months,err,dead:!!S.dead,chS:tsRecallCh(S),npc:Object.values(st)}});
  lives.push(r);console.log(`life ${life+1}: ${r.months} months${r.err?" ERR "+r.err:""} · `+r.npc.map(s=>`${s.n}: in ${s.ent}× out ${s.left}× (${s.months} mo thất sủng)`).join(" · "));
 }
 const ent=lives.reduce((a,l)=>a+l.npc.filter(s=>s.ent>0).length,0),left=lives.reduce((a,l)=>a+l.npc.filter(s=>s.ent>0&&s.left>0).length,0);
 const pass=ent>0&&left>0&&!errs.length&&!lives.some(l=>l.err);
 console.log(`${pass?"PASS":"FAIL"} thất sủng robot: ${ent} NPCs entered thất sủng, ${left} of them left it again (6 lives × up to 120 months)${errs.length?" · page errors: "+errs.join(" | "):""}`);
 await b.close();process.exit(pass?0:1)})();
