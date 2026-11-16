/* review/promo-skip (owner 16/11 06:20Z + 06:45Z + 07:15Z): long-road rewards through jexam promoReward; every reward has a gain AND a loss
   (BAL.psk); full seat → «Ân chỉ chờ phong». usage: node dev/test/promo-skip.js <page.html> */
const {chromium}=require('playwright');const path=require('path');(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+path.resolve(process.argv[2]));await p.waitForFunction(()=>typeof start==='function',null,{timeout:120000});await p.waitForTimeout(1500);
const r=await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;window.__nlInner=1;for(let i=0;i<200;i++){start();if(!isSrv()&&S.rank<=1)break}Q.length=0;
 const strip=s=>String(s).replace(/<[^>]+>/g,'');const o={};S.kids=S.kids||[];const B=BAL.psk;const L=liveRivals(false).filter(v=>!v.queen&&v!==S);
 // first son -> direct + mothers / Hoàng hậu oán
 const q=queenP();const qo0=q?q.oan||0:0;const mom=L.find(v=>v!==q);if(mom){mom.kids=mom.kids||[];mom.kids.push(mkKid("m",3))}const mo0=mom?mom.oan||0:0;
 let r0=S.rank;S.kids.push({sex:"m"});o.son1=strip(promoReward(S,"son1"));o.son1d=S.rank-r0;o.hhUp=q?(q.oan||0)-qo0:B.son1.hhOan;o.momUp=mom?(mom.oan||0)-mo0:-1;
 r0=S.rank;o.son2=strip(promoReward(S,"son"));o.son2d=S.rank-r0;o.son2g=S.ex.grace===S.rank+1;
 S.ex={to:S.rank+1};r0=S.rank;o.dau=strip(promoReward(S,"dau"));o.daud=S.rank-r0;o.daug=S.ex.grace===S.rank+1&&S.ex.gw==="f";
 // faction sides: direct + cost
 S.rank=1;S.th=40;r0=S.rank;o.emp=strip(promoReward(S,"emp",{fx:1}));o.empd=S.rank-r0;o.empTh=40-S.th;
 S.sung=50;r0=S.rank;o.th=strip(promoReward(S,"th",{fx:1}));o.thd=S.rank-r0;o.thS=50-S.sung;o.err=S.psErr&&S.psErr.n;
 S.danh=50;r0=S.rank;o.qu=strip(promoReward(S,"quyen",{fx:1}));o.qud=S.rank-r0;o.quD=50-S.danh;o.strike=!!S.psStrike;
 // full seat: Tần(3) → Phi(4) cap 4
 S.rank=3;S.ex={to:4};for(const v of L){if(holders(4).length>=4)break;if(v.rank!==4&&v!==mom)v.rank=4}
 const peer=L.find(v=>v.rank===3&&!v.out);if(!peer&&L.length){const v=L.find(v=>v.rank<3);if(v)v.rank=3}const pr=L.find(v=>v.rank===3&&!v.out);const po0=pr?pr.oan||0:0;
 o.free=seatFree(4);r0=S.rank;o.full=strip(promoReward(S,"emp",{fx:1}));o.fulld=S.rank-r0;o.anChi=JSON.stringify(S.anChi);o.peerUp=pr?(pr.oan||0)-po0:-1;
 S.bonusPay=0;promoMonth();o.pay=S.bonusPay;o.payWant=BAL.pay[4]-BAL.pay[3];
 S.anChi.t=S.turn-B.wait.bonusAt;const d0=S.danh;for(const v of L)if(v.rank===4){v.rank=3;break}o.free2=seatFree(4);fillSeats();o.claimd=S.rank-r0;o.bonus=S.danh-d0;o.anChi2=S.anChi;
 // grace passed + full seat waits
 S.rank=3;for(const v of L){if(holders(4).length>=4)break;if(v.rank!==4)v.rank=4}S.ex={to:4,grace:4,gw:"m",pass:true};r0=S.rank;promoteP(S);o.gfull=S.rank-r0;
 for(const v of L)if(v.rank===4){v.rank=3;break}promoteP(S);o.gfree=S.rank-r0;
 // quyền thần strike-back
 S.psStrike={at:S.turn,p:100,n:0};const s0=S.sung;promoMonth();o.hit=s0-S.sung;
 return o});console.log(JSON.stringify(r));const F=[];const ok=(c,n)=>{console.log((c?'PASS ':'FAIL ')+n);if(!c)F.push(n)};const B={son1:{hhOan:15,momOan:8}};
ok(r.son1d===1&&/không qua khảo hạch/.test(r.son1)&&r.momUp>0,'first prince → direct rank; loss: other mothers / Hoàng hậu oán');
ok(r.son2d===0&&r.son2g,'later prince → exam at once, conditions waived');ok(r.daud===0&&r.daug,'princess → exam at once, conditions waived');
ok(r.empd===1&&r.empTh>0,'Hoàng thượng side → direct rank; loss: Thái hậu cold');ok(r.thd===1&&r.thS>0&&r.err>0,'Thái hậu side → direct rank; loss: Sủng down + errands');
ok(r.qud===1&&r.quD>0&&r.strike,'quyền thần side → direct rank; loss: Danh down + strike-back armed');
ok(!r.free&&r.fulld===0&&/Ân chỉ chờ phong/.test(r.full)&&r.anChi&&r.peerUp>0,'full seat → «Ân chỉ chờ phong»; loss: same-rank consorts oán');
ok(r.pay===r.payWant,'ân chỉ: next rank stipend gap paid monthly');ok(r.free2&&r.claimd===1&&r.bonus>0&&!r.anChi2,'freed seat → claimed first, no exam, bonus after the long wait');
ok(r.gfull===0&&r.gfree===1,'passed grace exam waits for a free seat, then the decree');ok(r.hit>0,'strike-back hits once when due');
ok(!errs.length,'no page errors '+errs.slice(0,2));console.log(F.length?'FAIL':'PASS');await b.close();process.exit(F.length?1:0)})();
