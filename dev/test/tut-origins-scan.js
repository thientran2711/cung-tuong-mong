/* tut-origins-scan (review/tut-followups): every origin in ORIGINS starts a NEW life inside the 14-chapter frame (jst14) with chapter 1
   «nhap14» and its tutorial quests (jtq14), owner priority 16/11 21:38Z (chapters 1–3 for every origin). Also checks the story slot of
   every origin is wrapped by j67 (STORY[k].__old) so a module that registers an origin after j67 (jorigins bd) cannot skip the frame.
   Prints one table row per origin. usage: NODE_PATH=$(npm root -g) node dev/test/tut-origins-scan.js <built page url> */
const {chromium}=require('playwright');const {autoDismissRoulette,dismissRoulette}=require('./lib/roulette');
const [,,URL]=process.argv;
(async()=>{const b=await chromium.launch();const errs=[];let fail=0;
 const ctx=await b.newContext({viewport:{width:1180,height:820},serviceWorkers:'block'});await autoDismissRoulette(ctx);
 const p=await ctx.newPage();p.setDefaultTimeout(30000);p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(URL+(URL.includes('?')?'&':'?')+'khost=0',{waitUntil:'domcontentloaded',timeout:0});
 await p.waitForFunction(()=>typeof start==='function'&&typeof ORIGINS!=='undefined',null,{timeout:0});await p.waitForTimeout(800);
 const keys=await p.evaluate(()=>ORIGINS.map(o=>o.k));
 console.log('| origin | wrapped | frame f14 | chapter 1 | quests | variant |');console.log('|---|---|---|---|---|---|');
 for(const k of keys){
  await p.evaluate(k=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;window.__forceOrigin=k;start()},k);
  await dismissRoulette(p);
  try{await p.waitForFunction(k=>typeof S!=='undefined'&&S&&S.origin&&S.origin.k===k&&S.st,k,{timeout:60000})}catch(e){}
  const r=await p.evaluate(()=>{const m=S.st&&S.st.ms;return{k:S.origin.k,wr:!!(STORY[S.origin.k]&&STORY[S.origin.k].__old),f14:!!(S.st&&S.st.f14),ms:m?m.id:'-',q:m&&m.q14?m.q14.L.map(q=>q.id).join(','):'-',v:m&&m.q14?m.q14.v:'-'}});
  const ok=r.k===k&&r.wr&&r.f14&&r.ms==='nhap14'&&r.q!=='-';if(!ok)fail++;
  console.log(`| ${k} | ${r.wr?'yes':'NO'} | ${r.f14?'yes':'NO'} | ${r.ms} | ${r.q} | ${r.v} |${ok?'':' FAIL'}`)}
 console.log(errs.length?'page errors: '+JSON.stringify(errs.slice(0,5)):'0 page errors');
 console.log(fail||errs.length?`FAIL ${fail} origin(s)`:`PASS ${keys.length}/${keys.length} origins`);
 await b.close();process.exit(fail||errs.length?1:0)})();
