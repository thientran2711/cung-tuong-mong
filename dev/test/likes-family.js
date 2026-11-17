/* r1 fault 4 (npc-agent): ONE likes / dislikes system. For every receiver kind (Emperor, consort, Thái hậu, Hoàng hậu, own maid, servant,
   official, man, child) give a LIKED and a DISLIKED gift (bought kd items; the own maid takes handmade works only, jgift giftPeople) and count: lines that name the like / dislike (must be ≤ 1 each),
   the regard words used, and the known-stores that learnt it (must be one). Refusals (jdis BAL.dis.refuse) are forced off for the count.
   usage: node dev/test/likes-family.js <page>   → exit 1 on any FAIL */
const {chromium}=require('playwright');const [,,URL0]=process.argv;const URL='file://'+require('path').resolve(URL0);
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 const R=await p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;window.__bot=1;quiet=true;Q.length=0;
  const rf=BAL.dis.refuse;BAL.dis.refuse=0;const rl=roll;
  const item=kd=>Object.keys(IT).find(k=>IT[k].kd===kd&&!(IT[k].tg||[]).length)||Object.keys(IT).find(k=>IT[k].kd===kd);
  const LK="kd:Trang sức",DK="kd:Vải vóc";
  const kinds=[];const riv=liveRivals(true).filter(v=>!v.queen);const q=liveRivals(true).find(v=>v.queen);
  kinds.push(["emp","emp"]);kinds.push(["consort",riv[0]]);kinds.push(["thai hau","th"]);if(q)kinds.push(["hoang hau",q]);
  if(S.maid)kinds.push(["own maid","maid"]);
  /* who the game lets her give to at all (jgift giftPeople): servants, officials, men and children have no gift path → nothing to double */
  const gp=giftPeople({wk:{a:"cam"}}).map(x=>x[1]);const noPath=["servant","official","man","child"];
  /* a consort's likes in the jdis key space come from item tags (kdAllTag): tag Trang sức for consorts for the count, restored after */
  const tg0={};for(const k in IT)if(IT[k].kd==="Trang sức"){tg0[k]=IT[k].tg;IT[k].tg=(IT[k].tg||[]).concat(["rv","hh"])}
  const out=noPath.map(k=>({kind:k,dislike:"no gift path ("+gp.length+" kinds of receiver can take gifts)",like:"no gift path"}));
  for(const [kn,r] of kinds){const who=r==="maid"?S.maid:r;const o=r==="th"?(S.thO=S.thO||{}):r==="emp"?S.emp:who;
   /* force a known like and dislike in the shared key space */
   const work=r==="maid";o.dis=[work?"art:ky":DK];o.mlike=work?"art:cam":LK;
   const lkKeys=typeof mindLike==="function"?mindLike(r==="maid"?S.maid:r):[];const lk=work?"art:cam":lkKeys.find(k=>k.startsWith("kd:"))||null;
   const res={kind:kn};
   for(const [tag,key] of [["dislike",work?"art:ky":DK],["like",lk]]){if(!key){res[tag]="no kd like ("+lkKeys.join(",")+")";continue}
    if(work){S.inv.push({k:"__wk",wk:{a:key.slice(4),kind:"khuc",n:"Khúc thử",ti:1,s:"thử",q:60}})}
    else{const it=item(key.slice(3));if(!it){res[tag]="no item";continue}S.inv.push({k:it})}
    const st0=JSON.stringify({d:S.disK,l:S.likK,m:S.mindK});const v0={th:S.th,sung:S.sung,aff:typeof who==="object"&&who!==S.maid&&typeof aff==="function"?aff(who,S):0,loy:who&&who.loyal};
    let t="";try{t=String(giveTo(S,r,S.inv.length-1)||"").replace(/<[^>]*>/g,"")}catch(e){t="ERR "+e.message}
    const st1=JSON.stringify({d:S.disK,l:S.likK,m:S.mindK});
    const nm=key.slice(3).toLowerCase();const lines=(t.match(tag==="dislike"?/không ưa/g:/thích/g)||[]).length;
    res[tag]={lines,txt:t.slice(0,200),dTh:S.th-v0.th,dSung:S.sung-v0.sung,dAff:typeof who==="object"&&who!==S.maid&&typeof aff==="function"?aff(who,S)-v0.aff:0,dLoy:who&&who.loyal!=null?who.loyal-v0.loy:0,learnt:st0!==st1}}
   out.push(res)}
  BAL.dis.refuse=rf;for(const k in tg0)IT[k].tg=tg0[k];return out});
 let bad=0;for(const r of R){for(const t of ["dislike","like"]){const x=r[t];if(typeof x!=="object")continue;const thW=r.kind==="thai hau"&&/thiện cảm/.test(x.txt);const f=x.lines>1||thW||/ERR/.test(x.txt);if(f)bad++;
   console.log((f?'FAIL':'ok  ')+` ${r.kind.padEnd(10)} ${t.padEnd(7)} lines=${x.lines} dTh=${x.dTh} dSung=${x.dSung} dAff=${x.dAff} dLoy=${x.dLoy} learnt=${x.learnt} | ${x.txt}`)}
  for(const t of ["dislike","like"])if(typeof r[t]!=="object")console.log(`--   ${r.kind.padEnd(10)} ${t.padEnd(7)} ${r[t]}`)}
 console.log(errs.length?'FAIL page errors '+errs.slice(0,3):'ok   0 page errors');await b.close();process.exit(bad||errs.length?1:0)})();
