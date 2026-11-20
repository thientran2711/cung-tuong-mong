/* podium-wire bots (review/podium-wire, OR09): how the thứ muội + khuê hữu fare at Điện tuyển, BEFORE (kcEnter typed raw 3+R(6),
   duc 30+R(30), pow 40+R(30)) vs AFTER (their own Phúc mark kcPhucMark / BAL.entry.phuc, the sister on her house's kcPow()).
   N tiểu thư lives per origin are rolled in the real game (start + kcInit); for every girl the SAME draw of noise is used on both sides.
   Also: her place on the podium when she plays at the NPC mean of her best art (the "Để tài nghệ quyết định" value).
   usage: python3 dev/build/assemble.py && node dev/measure/podium-wire-bots.js [dev/index.html] [N=60] */
const {chromium}=require('playwright');const path=require('path');
const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+path.resolve(URL0);const N=+(process.argv[3]||60);
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'})).newPage();
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof kcInit==='function'&&typeof kcPhucMark==='function');await p.waitForTimeout(2500);
 const out=await p.evaluate(N=>{SLOT=3;const O={};const tier=sc=>sc<KC.cut[0]?-1:sc>=KC.cut[2]?2:sc>=KC.cut[1]?1:0;
  for(const o of KC.ok){const A={n:0,old:[0,0,0,0],neu:[0,0,0,0],rawOld:0,rawNew:0,place:[0,0,0,0,0]};
   for(let i=0;i<N;i++){window.__nlInner=1;try{start()}catch(e){}window.__nlInner=0;if(S.srv)continue;S.origin=ORIGINS.find(x=>x.k===o);S.kcPick="nha";try{kcInit()}catch(e){continue}
    S.kc.tt={raw:Math.round(entSkipRaw())};
    for(const m of kcRivalsTT()){const z=R(9)-4;const oldRaw=3+R(6);const old=kcScore({sac:m.sac,tai:m.tai,duc:30+R(30),danh:m.danh,raw:oldRaw,pow:40+R(30)})+z;
     const raw=kcPhucMark(m);const neu=kcScore({sac:m.sac,tai:m.tai,duc:m.pduc,danh:m.danh,raw,pow:m.ppow==null?kcPow():m.ppow})+z;
     A.n++;A.old[tier(old)+1]++;A.neu[tier(neu)+1]++;A.rawOld+=oldRaw;A.rawNew+=raw}
    try{const L=kcPhucPod();A.place[(S.kc.tt.place||1)-1]++}catch(e){}}
   const f=a=>a.map(x=>Math.round(1000*x/Math.max(1,A.n))/10);O[o]={girls:A.n,meanRawOld:+(A.rawOld/A.n).toFixed(2),meanRawNew:+(A.rawNew/A.n).toFixed(2),
    oldOutDuTtQn:f(A.old),newOutDuTtQn:f(A.neu),herPlace1to4:A.place}}return O},N);
 console.log(JSON.stringify(out,null,1));await b.close()})();
