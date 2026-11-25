/* m-fix-1 item 1 (owner OD 18/11 ~05:55Z "a quick result never beats a good own play"; robot M4 25/11: exam skip 10/10 Xuất sắc vs skilled play 5/10).
   Runtime check of the WHOLE skip-mark family: for every origin (ORIGINS) × art kind × rank, her uncapped median (mgSkipRaw = the old skip) vs what each
   skip path now gives (exam exSkipRaw, entry entSkipRaw, contest/pm pmSk, fest, tsGame won skip). PASS = no skip mark above BAL.skip.cap and the cap
   below a good own play (mgWord "Giỏi" = BAL.mgTier.word[2]). usage: node dev/test/skip-cap.js dev/index.html */
const {chromium}=require('playwright');const path=require('path');(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+path.resolve(process.argv[2]||'dev/index.html'));await p.waitForFunction(()=>typeof start==='function'&&typeof kitSkipCap==='function',null,{timeout:180000});await p.waitForTimeout(1500);
const r=await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;window.__nlInner=1;
 const out={cap:BAL.skip.cap,good:BAL.mgTier.word[2],capWord:mgWord(BAL.skip.cap),rows:[],max:{old:0,neu:0},n:0};
 const kinds=["dan","ca","hat","mua","co","nau","theu","hoa","tho"].filter(k=>typeof KG82_KIND==="object"&&KG82_KIND[k]);
 const orgs=Object.keys(ORIGINS||{});
 for(const ok of orgs){let s=null;for(let i=0;i<60;i++){start();if(S.origin&&S.origin.k===ok){s=S;break}}if(!s){try{S.origin=Object.assign({},ORIGINS[ok],{k:ok})}catch(e){}}
  for(const lv of [0,3,5]){for(const k of kinds){try{(kg82FormulaOf(k)||[]).forEach(([st])=>{if(st!=="help"&&S.arts)S.arts[st]=lv})}catch(e){}
   for(const R of [1,3,6]){let old=null,ex=null,pm=null;try{old=mgSkipRaw(mgNpcTier(k,S,{occ:"exam",rank:R,lv}))}catch(e){}
    try{ex=exSkipRaw({to:R},k)}catch(e){}try{pm=pmSk(k,R)}catch(e){}out.n++;
    if(old!=null)out.max.old=Math.max(out.max.old,old);[ex,pm].forEach(v=>{if(v!=null)out.max.neu=Math.max(out.max.neu,v)});
    if(old>=out.good)out.rows.push([ok,lv,k,R,old,ex,pm])}}}}
 let en=null;try{en=entSkipRaw()}catch(e){}out.ent=en;out.fest=kitSkipCap(BAL.kcg.fest.skip);
 let ts=null;try{const o0=window.tsBot;window.tsBot=()=>1;let got=null;const R0=Math.random;Math.random=()=>0;tsGame({kind:"dan",odds:95,onDone:x=>got=x});Math.random=R0;window.tsBot=o0;ts=got}catch(e){ts={err:String(e)}}out.ts=ts;
 return out});
await p.waitForTimeout(300);const t=r.ts&&r.ts.raw;
console.log(JSON.stringify({cap:r.cap,capWord:r.capWord,good:r.good,cells:r.n,maxOldSkip:r.max.old,maxNewSkip:r.max.neu,entry:r.ent,fest:r.fest,tsWon:t,oldAboveGood:r.rows.length}));
for(const x of r.rows.slice(0,12))console.log('before≥good: origin '+x[0]+' lv'+x[1]+' '+x[2]+' rank'+x[3]+': old '+x[4]+' → exam '+x[5]+' · pm '+x[6]);
const F=[];const ok=(c,n)=>{console.log((c?'PASS ':'FAIL ')+n);if(!c)F.push(n)};
ok(r.cap<r.good,'cap ('+r.cap+' '+r.capWord+') is below a good own play ('+r.good+' Giỏi)');ok(r.max.neu<=r.cap,'no exam / pm skip mark above the cap (max '+r.max.neu+')');
ok(r.ent==null||r.ent<=r.cap,'entry / Phúc tuyển skip ≤ cap');ok(r.fest<=r.cap,'fest skip ≤ cap');ok(t==null||t<=r.cap,'tsGame won skip ≤ cap (was 7)');ok(!errs.length,'no page errors '+errs.slice(0,2).join(' | '));
await b.close();process.exit(F.length?1:0)})();
