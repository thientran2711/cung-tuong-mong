/* review/promo-skip (owner 16/11 06:20Z + 06:45Z): long-road rewards through jexam promoReward. usage: node dev/test/promo-skip.js <page.html> */
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+process.argv[2]);await p.waitForFunction(()=>typeof start==='function',null,{timeout:120000});await p.waitForTimeout(1500);
const r=await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;window.__nlInner=1;for(let i=0;i<200;i++){start();if(!isSrv()&&S.rank<=1)break}Q.length=0;
 const strip=s=>String(s).replace(/<[^>]+>/g,'');const o={};S.kids=S.kids||[];
 // first son -> direct
 let r0=S.rank;S.kids.push({sex:"m"});o.son1=strip(promoReward(S,"son1"));o.son1d=S.rank-r0;
 // later son -> grace
 r0=S.rank;o.son2=strip(promoReward(S,"son"));o.son2d=S.rank-r0;o.son2g=S.ex.grace===S.rank+1;
 S.ex={to:S.rank+1};r0=S.rank;o.dau=strip(promoReward(S,"dau"));o.daud=S.rank-r0;o.daug=S.ex.grace===S.rank+1&&S.ex.gw==="f";
 // full seat: put her at Tần(3) next Phi(4) cap 4: fill
 S.rank=3;S.ex={to:4};const L=liveRivals(false).filter(v=>!v.queen&&v!==S);let k=0;for(const v of L){if(holders(4).length>=4)break;v.rank=4;k++}
 o.free=seatFree(4);r0=S.rank;o.full=promoReward(S,"emp",{fx:1});o.fulld=S.rank-r0;o.rec=JSON.stringify(S.promoFull||[]);
 o.th=promoReward(S,"th");o.q=promoReward(S,"quyen");
 // grace passed + full seat: waits
 S.ex={to:4,grace:4,gw:"m",pass:true};r0=S.rank;promoteP(S);o.gfull=S.rank-r0;
 for(const v of L)if(v.rank===4){v.rank=3;break}o.free2=seatFree(4);promoteP(S);o.gfree=S.rank-r0;
 return o});console.log(JSON.stringify(r));const F=[];const ok=(c,n)=>{console.log((c?'PASS ':'FAIL ')+n);if(!c)F.push(n)};
ok(r.son1d===1&&/không qua khảo hạch/.test(r.son1),'first prince → direct rank');ok(r.son2d===0&&r.son2g,'later prince → exam at once, conditions waived');
ok(r.daud===0&&r.daug,'princess → exam at once, conditions waived');ok(!r.free&&r.fulld===0&&/emp/.test(r.rec),'direct reward + full seat → promoFullSeat (recorded, no rank)');
ok(r.th===''&&r.q==='','faction th / quyen: PROMO_SRC none today');ok(r.gfull===0&&r.gfree===1,'passed grace exam waits for a free seat, then the decree');
ok(!errs.length,'no page errors '+errs.slice(0,2));console.log(F.length?'FAIL':'PASS');await b.close();process.exit(F.length?1:0)})();
