/* ROLE PARITY part 4 (jagacts4 par4; report dev/handover/reports/role-parity-4.md) — seeded page, deterministic:
   1 ONE BUILDER: her talk buttons with a man = manCards(S,m,risk) (same names, odds, effects as before); an NPC consort runs manCards(v,…) on her own state
   2 the NPC affair road: Chào hỏi / Liếc mắt (deed + tình ý), Hẹn gặp riêng (v.affair, Sức) or caught (the man dies, she is sentenced) — the same trystP
   3 Đồ cấm: an NPC buys through illBuy (the same function as hers): bạc out = the route's price, the item really lands in her chest (or her maid brings it next tuần)
   4 Tố xa xỉ / Tố vượt phẩm: an NPC doer may accuse on a guess while the loop runs (ACT.xx / ACT.vp ok), and haOpts offers it; the monthly dice pass is off
   5 BAL.ag.par4.on = 0 → no par4 option, the old flat rolls back; 0 page errors
   usage: node dev/test/role-parity-4.test.js [dev/index.html]   → exit 1 on FAIL */
const {chromium}=require('playwright');const path=require('path');const F=process.argv[2]||'dev/index.html';
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)$/,r=>r.abort());
 await p.addInitScript(()=>{let x=7;Math.random=()=>{x=(x*1103515245+12345)%2147483648;return x/2147483648}});
 await p.goto('file://'+path.resolve(F),{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 const r=await p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();for(let i=0;i<60&&isSrv();i++)start();window.__nlInner=0;window.__bot=1;quiet=false;Q.length=0;
  const o={};const N={};for(const k of ["sung","th","hh","danh","duc","kid","ally","spite","safe","rest"])N[k]=1;menInit();
  const v=liveRivals(false).find(x=>!x.out&&!x.confined);v.sung=10;v.affair=null;v.suc=50;const m=S.men.find(x=>x.alive);m.likeV=v.id;S.menW={[m.id]:"vuon"};S.where=S.where||{};
  /* 1 */S.place="vuon";m.tinh=60;const P=talkOpts({kind:"man",ref:m}).map(a=>a.n);const C=manCards(S,m,lộRisk("vuon")).map(a=>a.n);o.pl={P,C};
  manTSet(v,m,60);const V=manCards(v,m,lộRiskP(v,"vuon"));o.npcCards=V.map(a=>a.n);m.tinh=0;manTSet(v,m,0);S.menW={[m.id]:"vuon"};
  /* 2 */o.opts=p4ManOpts(v,N,null).map(x=>x.k);S.where[v.id]="vuon";const d0=(v.deeds||[]).length;{const R1=Math.random;Math.random=()=>0;o.flirt=AGRUN["maid:flirt"](v,null,{k:"maid:flirt",pl:"vuon"});Math.random=R1}o.tinhV=manT(v,m);o.tinhS=m.tinh;
  manTSet(v,m,60);v.staff=[{name:"Thu",loyal:95,role:"maid"}];const s0=v.suc;const R0=Math.random;Math.random=()=>.99;o.tryst=AGRUN["maid:tryst"](v,null,{k:"maid:tryst",pl:"vuon"});Math.random=R0;
  o.aff=v.affair===m.id;o.suc=[s0,v.suc];o.alive=[m.alive,v.alive];
  const w2=liveRivals(false).find(x=>x!==v&&!x.out&&!x.confined);const m2=S.men.find(x=>x.alive&&x!==m);if(m2){S.menW={[m2.id]:"thu"};S.where[w2.id]="thu";manTSet(w2,m2,60);w2.staff=[{name:"Lan",loyal:95,role:"maid"}];
   Math.random=()=>0;AGRUN["maid:tryst"](w2,null,{k:"maid:tryst",pl:"thu"});Math.random=R0;o.caught={man:m2.alive,her:!w2.alive||!!w2.out||!!w2.mercy}}
  o.maidRun=typeof AGRUN["maid:flirt"]==="function";
  /* 3 */const w=liveRivals(false).find(x=>x!==v&&x!==w2&&!x.out);w.confined=0;w.bac=3000;w.inv=[];w.illP=[];w.maid={name:"Hạnh",loyal:90};const t=liveRivals(false).find(x=>x!==v&&x!==w&&x!==w2);oanAdd(w,t,90);relAdd(w,t,-90);
  o.ill=p4IllOpts(w,N,null).map(x=>x.k);const k=p4IllK(w,"thaiy",t);const b0=w.bac;Math.random=()=>0;o.illTy=p4IllRun(w,"thaiy");Math.random=R0;o.illTyBac=b0-w.bac;o.illTyPr=IROUTE.thaiy.cost(k);o.illTyInv=(w.inv||[]).some(e=>e.k===k);
  w.inv=[];const k2=p4IllK(w,"maid",t);const b1=w.bac;Math.random=()=>0;p4IllRun(w,"maid");Math.random=R0;o.illMaid={bac:b1-w.bac,pr:IROUTE.maid.cost(k2),pend:(w.illP||[]).map(x=>x.k)};
  /* 4 */const a=liveRivals(false).find(x=>x!==t&&!x.out);o.xx=!!ACT.xx.ok(a,t);o.vp=!!ACT.vp.ok(a,t);o.guess=shelfNpcGuess();
  /* 5 */BAL.ag.par4.on=0;o.off={man:(AGREG.consort.par4(v,N,null)||[]).length,guess:shelfNpcGuess(),xx:!!(shelfCause(a,t,"xx"))};BAL.ag.par4.on=1;
  return o});
 ok(JSON.stringify(r.pl.P.filter(n=>r.pl.C.includes(n)))===JSON.stringify(r.pl.C),'her talk buttons with a man are built by manCards(S,…)',r.pl);
 ok(["Chào hỏi đúng lễ","Liếc mắt đưa tình","Trao khăn tay","Hẹn gặp riêng","Cắt đứt"].every(n=>r.npcCards.includes(n)),'an NPC consort gets the same five cards from the same builder',r.npcCards);
 ok(r.opts.includes("maid:hail")&&r.opts.includes("maid:flirt"),'NPC options when a man stands where she can go this buổi',r.opts);
 ok(r.tinhV>0&&r.tinhS===0,'Liếc mắt đưa tình raises HIS feeling for HER (per woman), not for the player',{npc:r.tinhV,player:r.tinhS});
 ok(r.aff&&r.suc[1]>r.suc[0]&&r.alive[0]&&r.alive[1],'Hẹn gặp riêng kept secret: she becomes his lover (v.affair), Sức up (trystP)',r);
 ok(r.caught&&!r.caught.man&&r.caught.her,'Hẹn gặp riêng caught: the man is put to death, she is sentenced (death / lãnh cung / first-year mercy: affairExposed → deathSentence, same as hers)',r.caught);
 ok(r.ill.length>0&&r.ill.every(k=>/^cx3:ill/.test(k)),'Đồ cấm: an NPC who hates someone is offered the j83 routes',r.ill);
 ok(r.illTyBac===r.illTyPr&&r.illTyInv,'Hối lộ người ở Thái y viện: bạc out = the route price, the item is in her chest (real object)',{paid:r.illTyBac,price:r.illTyPr,inChest:r.illTyInv});
 ok(r.illMaid.bac===r.illMaid.pr&&r.illMaid.pend.length===1,'Sai cung nữ thân tín mua lén ngoài cung: bạc out, her maid brings it next tuần (illP)',r.illMaid);
 ok(r.xx&&r.vp&&r.guess,'Tố xa xỉ / Tố vượt phẩm: an NPC doer may accuse on a guess while the loop runs (as she can)',{xx:r.xx,vp:r.vp});
 ok(r.off.man===0&&!r.off.guess&&!r.off.xx,'BAL.ag.par4.on = 0 → no par4 option, no NPC guess',r.off);
 ok(!errs.length,'no page errors',errs.slice(0,3));await b.close();
 const f=res.filter(x=>!x).length;console.log(f?`${f} FAIL`:'ALL PASS');process.exit(f?1:0)})();
