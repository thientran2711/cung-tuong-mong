/* review/it-key-guard: an inventory piece whose key this build's IT does not hold must never throw.
   1) old save: a save carrying unknown keys (S.inv, every NPC bag, worn piece, S.shop) + junk pieces (null, string, no key) loads,
      normAll/itClean drops the junk, keeps the unknown keys inert; the chest (Rương) renders; N lives x T months of npcMonthly soak.
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
   const r0=render,sm=showModal;render=()=>{};showModal=()=>{};const L={inject,months:0,junkLeft:0,unkKept:0,chest:null};
   if(inject){/* write an "old save": unknown keys + junk everywhere, serialise, load back through deser (the load path) */
    S.inv.push({k:BAD[0],from:"emp"},{k:BAD[1],w:1});if(!ONLYUNK)S.inv.push(null,"tramngoc",{from:"x"});S.shop=S.shop.concat(BAD);
    for(const v of rivals){v.inv=v.inv||[];v.inv.push({k:BAD[0]},{k:BAD[1],w:1});if(!ONLYUNK)v.inv.push(null,{n:1})}
    const d=JSON.parse(JSON.stringify({v:6,buoi:S.buoi||0,ok:S.origin&&S.origin.k,S,R:rivals,rid,tab,used:0,P:[]}));d.S.origin=undefined;deser(d);
    L.junkLeft=bagBad();L.unkKept=[S].concat(rivals).reduce((a,v)=>a+((v&&v.inv)||[]).filter(e=>e&&BAD.includes(e.k)).length,0);L.shopBad=S.shop.filter(k=>BAD.includes(k)).length}
   for(let t=0;t<T;t++){if(S.dead)break;Q.length=0;try{endTurn()}catch(e){out.thrown.push(l+":"+t+": "+e.message)}Q.length=0;L.months++}
   render=r0;showModal=sm;
   if(inject&&!S.dead){try{S.inv.push({k:BAD[0]});document.getElementById('title').hidden=true;tab="inv";render();L.chest=(document.body.innerHTML.match(/Vật cũ không rõ/g)||[]).length}catch(e){out.thrown.push("chest: "+e.message)}}
   out.lives.push(L)}
  return out},[LIVES,T,!!process.env.ONLYUNK]);
 console.log(JSON.stringify(res));const bad=res.thrown.length+errs.length+res.lives.filter(L=>L.inject&&L.chest===0).length+res.lives.reduce((a,L)=>a+(L.inject?(L.junkLeft+(L.shopBad||0)):0),0);
 console.log('page errors',errs.length,errs.slice(0,6));console.log(bad?'FAIL':'PASS');await b.close();process.exit(bad?1:0)})();
