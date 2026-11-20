/* review/it-key-guard: an inventory piece whose key this build's IT does not hold must never throw.
   1) old save: a save carrying unknown keys (S.inv, every NPC bag, worn piece, S.shop) + junk pieces (null, string, no key) loads,
      normAll/itClean drops the junk, keeps the unknown keys inert; N lives x T months of npcMonthly soak.
      + the S.vl clash: an old save holding jvoice line memory in S.vl (the worn-veil field) loads with it moved to S.vmem;
      no inventory holds a keyless piece at the end of any life.
   3) UI (review-it-key-guard-r1 FAIL 1): a known piece is revealed (control); unknown pieces arriving live (hers + an imperial gift)
      get no reveal / reward card, and no raw key reaches the page (one behaviour: an unknown key is inert and never shown).
   2) plain soak (no injection) for comparison. Exit 1 on any page error / thrown month.
   usage: python3 dev/build/assemble.py && node dev/test/it-key-guard.js [lives=4] [months=120]   (GAME=path to dev/index.html; ONLYUNK=1: unknown keys only, no junk pieces) */
const {chromium}=require('playwright');const path=require('path');
const GAME=process.env.GAME||path.join(__dirname,'..','index.html');const LIVES=+process.argv[2]||4,T=+process.argv[3]||120;
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:755,height:1000},deviceScaleFactor:1});const p=await ctx.newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.route(u=>!/^file:/.test(String(u)),r=>r.abort());await p.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)$/,r=>r.abort());
 await p.goto('file://'+GAME,{waitUntil:'domcontentloaded'});await p.waitForTimeout(1500);
 const res=await p.evaluate(([LIVES,T,ONLYUNK])=>{const out={lives:[],thrown:[]};const BAD=["zz_gone_item","old_removed_key"];
  const bagBad=()=>{let n=0;for(const v of [S].concat(rivals))for(const e of (v&&v.inv)||[])if(!e||typeof e!=="object"||typeof e.k!=="string")n++;return n};
  for(let l=0;l<LIVES;l++){const inject=l%2===0;localStorage.clear();try{SLOT=5}catch(e){}document.getElementById('title').hidden=true;start();Q.length=0;
   const r0=render,sm=showModal;render=()=>{};showModal=()=>{};const L={inject,months:0,junkLeft:0,unkKept:0};
   if(inject){/* write an "old save": unknown keys + junk everywhere, serialise, load back through deser (the load path) */
    S.inv.push({k:BAD[0],from:"emp"},{k:BAD[1],w:1});if(!ONLYUNK)S.inv.push(null,"tramngoc",{from:"x"});S.shop=S.shop.concat(BAD);S.vl={"cycle:ask":{"x":1,__b:"0.1",__l:"x"}};/* an old save of the S.vl clash: jvoice line memory where jveil keeps the worn veil */
    for(const v of rivals){v.inv=v.inv||[];v.inv.push({k:BAD[0]},{k:BAD[1],w:1});if(!ONLYUNK)v.inv.push(null,{n:1})}
    const d=JSON.parse(JSON.stringify({v:6,buoi:S.buoi||0,ok:S.origin&&S.origin.k,S,R:rivals,rid,tab,used:0,P:[]}));d.S.origin=undefined;deser(d);
    L.junkLeft=bagBad();L.unkKept=[S].concat(rivals).reduce((a,v)=>a+((v&&v.inv)||[]).filter(e=>e&&BAD.includes(e.k)).length,0);L.shopBad=S.shop.filter(k=>BAD.includes(k)).length;L.vlFixed=S.vl==null&&!!(S.vmem&&S.vmem["cycle:ask"])}
   for(let t=0;t<T;t++){if(S.dead)break;Q.length=0;try{endTurn()}catch(e){out.thrown.push(l+":"+t+": "+e.message)}Q.length=0;L.months++}
   render=r0;showModal=sm;L.keylessEnd=bagBad();
   out.lives.push(L)}
  return out},[LIVES,T,!!process.env.ONLYUNK]);
 /* 3) UI: a known piece is revealed (control); unknown pieces arriving live (her own + an imperial gift) are never revealed, never listed,
    and no raw key reaches the page */
 const ui=await p.evaluate(async()=>{const wait=t=>new Promise(o=>setTimeout(o,t));document.querySelectorAll('#kload').forEach(e=>e.remove());localStorage.clear();document.getElementById('title').hidden=true;start();Q.length=0;document.getElementById('modal').hidden=true;
  document.querySelectorAll('[id^=kroul],#dawn,.kmov').forEach(e=>e.remove());tab="inv";render();await wait(300);const o={};
  const g0=(KFX.gains||[]).length;S.inv.push({k:"tramngoc"});render();await wait(500);o.knownGain=(KFX.gains||[]).length-g0;document.querySelectorAll('.kmov').forEach(e=>e.remove());
  const g1=(KFX.gains||[]).length,r1=KFX.rewards||0;S.inv.push({k:"zz_gone_item"},{k:"old_removed_key",from:"emp"});render();await wait(500);
  o.unkGain=(KFX.gains||[]).length-g1;o.unkReward=(KFX.rewards||0)-r1;tab="inv";render();await wait(200);o.rawKey=["zz_gone_item","old_removed_key"].filter(k=>document.body.innerHTML.includes(k)).length;return o});
 res.ui=ui;console.log(JSON.stringify(res));const bad=res.thrown.length+errs.length+(ui.knownGain<1?1:0)+ui.unkGain+ui.unkReward+ui.rawKey+res.lives.reduce((a,L)=>a+(L.keylessEnd||0)+(L.inject?(L.junkLeft+(L.shopBad||0)+(L.vlFixed?0:1)):0),0);
 console.log('page errors',errs.length,errs.slice(0,6));console.log(bad?'FAIL':'PASS');await b.close();process.exit(bad?1:0)})();
