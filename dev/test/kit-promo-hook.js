/* kitPromoHook probe (KIT §77c data hook, review/kit-promo-hook): checks window.kitPromoHook() is READ-ONLY and answers her next round
   under TODAY's rules. Cases: new game -> {months>=0, rank = RANKS[r+1].n, miss[], ready}; promoGap met + Sủng/Danh met + exam window open
   (exCanSit: exElig + no cooldown + not yet passed) -> months 0, miss []; Hoàng hậu / lãnh cung / dead -> null; S unchanged by the call (JSON before == after).
   usage: node dev/test/kit-promo-hook.js <url> [W]x[H]   -> table, exit 1 on any failure */
const {chromium}=require('playwright');const URL=process.argv[2];const [W,H]=(process.argv[3]||'755x1000').split('x').map(Number);
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,reducedMotion:'reduce',serviceWorkers:'block'});const p=await ctx.newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof window.kitPromoHook==='function',null,{timeout:90000});await p.waitForTimeout(1500);
 const R=await p.evaluate(()=>{for(const id of ['kload','kroul']){const x=document.getElementById(id);if(x)x.remove()}try{localStorage.clear()}catch(e){}SLOT=3;window.__nlInner=1;document.getElementById('title').hidden=true;
  for(let i=0;i<60;i++){start();if(!isSrv())break}Q.length=0;const out=[];
  const ck=(k,fn,want)=>{let pre,got,post,bad=[];try{fn&&fn();pre=JSON.stringify(S);got=window.kitPromoHook();post=JSON.stringify(S)}catch(e){bad.push("throw "+e.message)}
   if(pre!==post)bad.push("hook wrote to S");const w=want(got);if(w)bad.push(w);out.push({k,got,bad})};
  const r0=S.rank;
  ck("new game",null,g=>!g?"null":!(g.months>=0)?"months "+g.months:g.rank!==RANKS[r0+1].n?"rank "+g.rank:!Array.isArray(g.miss)?"miss not array":"");
  ck("all met + exam open",()=>{S.lastPromo=S.turn-99;S.sung=S.danh=999;delete S.ex;exS(S);/* promo-build: in a kỳ month */for(let i=0;i<24&&typeof pbKyAt==="function"&&!pbKyAt(pbA());i++){S.month=S.month%12+1;if(S.month===1)S.year++}},g=>{const el=exCanSit(S);return !g?"null":el&&(g.months!==0||!g.ready)?"can sit but months "+g.months+" ready "+g.ready:el&&g.miss.length?"elig but miss "+g.miss:!el?"exElig false: "+JSON.stringify(promoReqP(S).filter(x=>!x[0]).map(x=>x[1])):""});
  ck("exam cooldown 4",()=>{delete S.ex;const e=exS(S);e.cd=S.turn+4},g=>!g?"null":g.months<4?"months "+g.months+" < cd 4":"");
  /* promo-stack-lr4 (OD 24/11 ~09:20Z «Kỳ sắc phong theo dịp lễ», canon overwrite; MAIN 167): the kỳ replaced the monthly «Cách lần sắc phong trước»
     gap, so a decree last month no longer holds her back: with the kỳ rule on, the answer is the one of the case above (ready in the open kỳ) */
  ck("monthly gap gone (kỳ rule)",()=>{delete S.ex;S.lastPromo=S.turn},g=>{if(!g)return"null";if(typeof pbKyOn==="function"&&pbKyOn())return g.ready&&g.months===0?"":"months "+g.months+" ready "+g.ready+" (the old gap still gates)";
   const w=typeof pbNextKy==="function"?pbNextKy(pbA()+promoGap(S.rank)).A-pbA():promoGap(S.rank);return g.months!==w?"months "+g.months+" want "+w:""});
  ck("rank 3, Sủng/Danh 0",()=>{S.rank=3;S.sung=S.danh=0;S.lastPromo=S.turn-99;delete S.ex},g=>!g?"null":g.rank!==RANKS[4].n?"rank "+g.rank:!g.miss.some(t=>/^Sủng/.test(t))?"no Sủng row in miss":g.ready?"ready while unmet":"");
  ck("Hoàng hậu (rank 7)",()=>{S.rank=7},g=>g===null?"":"not null");
  ck("lãnh cung",()=>{S.rank=r0;S.out=1},g=>g===null?"":"not null");
  ck("dead",()=>{S.out=0;S.dead=1},g=>g===null?"":"not null");
  S.dead=0;return out});
 let n=0;for(const x of R){n+=x.bad.length;console.log(`${x.k.padEnd(22)} ${JSON.stringify(x.got).slice(0,110).padEnd(110)} ${x.bad.length?'BAD: '+x.bad.join(' | '):'ok'}`)}
 console.log('errors',errs.length?errs:'none');await b.close();process.exit(n||errs.length?1:0)})();
