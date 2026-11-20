/* cal-p2 — PLAYER-2 CALIBRATION PROFILE (owner OD 20/11 ~05:00Z: her second tries are Kingston's = "số liệu của người chơi thứ hai").
   node dev/test/mgcal-p2.js [dev/index.html] [REF.html]
   1 BAL: cal.k2 holds player 2's 4 kinds (tho 7.1, theu 9.9, ban 9.3, dauho 1.7; n 5; 11/19/2026); her cal.k keeps her first tries (tho 8.7, theu 9.7,
     ban 9.1, dauho 1.1) — never mixed; cal.p2 = the co-op seat of player 2
   2 SOLO unchanged: mgCalWho() = 1; every kind's band = her profile; the solo dump (bands of every kind + hands of every live rival × kind + seeded
     NPC plays) is IDENTICAL to the REF build (main) when REF is given
   3 her co-op seat (a) = player 1: same dump as solo
   4 player 2 (guest seat b, or the host running seat b's turn with COOPW.ctx = "b"): k2 kinds roll in HIS band (b from k2), kinds k2 lacks fall back to her band;
     guest device and host-for-b give the SAME hands (deterministic, shared room state); the same hash draw (order of people kept); the shared NPC record
     p.mgH / p.mgHv is not touched by his play; back on seat a everything is as before
   5 no page errors */
const {chromium}=require('playwright');const path=require('path');
const U=a=>/^(https?|file):/.test(a)?a:'file://'+path.resolve(a);const URL=U(process.argv[2]||'dev/index.html'),REF=process.argv[3]?U(process.argv[3]):null;
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
/* the solo dump: runs in the page */
const DUMP=()=>{const out={};const ks=mgCalKinds().sort();const L=liveRivals(true).filter(v=>v.alive).slice(0,40);
 let seed=12345;const rnd=()=>{seed=(seed*1103515245+12345)%2147483648;return seed/2147483648};
 out.who=typeof mgCalWho==="function"?mgCalWho():1;out.band={};out.hand={};out.play={};
 for(const k of ks){out.band[k]=mgCalBand(k);out.hand[k]=L.map(v=>mgHand(k,v));out.play[k]=L.slice(0,10).map(v=>mgNpcRaw(k,v,{d:0,rnd}))}
 out.nop=ks.map(k=>mgHand(k));return out};
const BOOT=()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;window.__bot=1;Q.length=0;
 /* a fixed world: the rivals' names / ids come from the seeded start, the same on both builds when the code before jmgt is the same */};
async function page(b,url){const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(url,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{Math.random=(()=>{let s=777;return()=>{s=(s*1103515245+12345)%2147483648;return s/2147483648}})()});await p.evaluate(BOOT);return {p,errs}}
(async()=>{const b=await chromium.launch();const {p,errs}=await page(b,URL);
 const r=await p.evaluate(DUMP=>{const o={};const C=BAL.ag.mg2.cal;o.k2=C.k2;o.p2=C.p2;o.k={tho:C.k.tho,theu:C.k.theu,ban:C.k.ban,dauho:C.k.dauho};
  const dump=eval("("+DUMP+")");o.solo=dump();
  /* her co-op seat a */
  window.COOPW=window.COOPW||{};const W=window.COOPW,keep={on:W.on,seat:W.seat,ctx:W.ctx};W.on=true;W.seat="a";W.ctx=undefined;o.seatA=dump();
  /* player 2: the shared NPC record before his play */
  const L=liveRivals(true).filter(v=>v.alive).slice(0,40);const rec=()=>JSON.stringify(L.map(v=>[v.mgH,v.mgHv]));const rec0=rec();
  W.seat="b";o.whoB=mgCalWho();o.bB={};o.hB={};const ks=mgCalKinds().sort();for(const k of ks){o.bB[k]=mgCalBand(k);o.hB[k]=L.map(v=>mgHand(k,v))}
  o.recSame=rec()===rec0;
  /* the host running seat b's turn (jcoopthin withSeat sets COOPW.ctx) */
  W.seat="a";W.ctx="b";o.whoH=mgCalWho();o.hH={};for(const k of ks)o.hH[k]=L.map(v=>mgHand(k,v));W.ctx=undefined;o.recSame2=rec()===rec0;
  o.back=dump();W.on=keep.on;W.seat=keep.seat;W.ctx=keep.ctx;o.ks=ks;o.H=BAL.ag.mg2.hand;
  return o},DUMP.toString());
 const J=JSON.stringify;
 ok(J(r.k2)===J({tho:{b:7.1,n:5,at:"11/19/2026"},theu:{b:9.9,n:5,at:"11/19/2026"},ban:{b:9.3,n:5,at:"11/19/2026"},dauho:{b:1.7,n:5,at:"11/19/2026"}})&&r.p2==="b",'1 cal.k2 = player 2 (tho 7.1, theu 9.9, ban 9.3, dauho 1.7), p2 seat b',{k2:r.k2,p2:r.p2});
 ok(r.k.tho.b===8.7&&r.k.theu.b===9.7&&r.k.ban.b===9.1&&r.k.dauho.b===1.1,'1 her cal.k keeps her first tries (never mixed)',r.k);
 ok(r.solo.who===1,'2 solo: mgCalWho() = 1',r.solo.who);
 if(REF){const R=await page(b,REF);const ref=await R.p.evaluate(D=>eval("("+D+")")(),DUMP.toString());
  const same=J(ref)===J(Object.assign({},r.solo,{who:1}))||J(Object.assign({},ref,{who:1}))===J(r.solo);
  const diff=[];for(const k of Object.keys(r.solo.band))if(J(r.solo.band[k])!==J(ref.band[k])||J(r.solo.hand[k])!==J(ref.hand[k])||J(r.solo.play[k])!==J(ref.play[k]))diff.push(k);
  ok(same&&!diff.length&&R.errs.length===0,'2 solo dump IDENTICAL to the REF build (bands, hands, seeded plays of every kind)',{kinds:Object.keys(r.solo.band).length,rivals:(r.solo.hand.dan||[]).length,diff,refErrs:R.errs.slice(0,2)})}
 else console.log('-- 2 REF build not given: solo-vs-main comparison skipped');
 ok(J(r.seatA)===J(r.solo),'3 her co-op seat a = player 1: same as solo');
 const w2=r.H.w/2,C={up:1,dn:4,min:1,max:9.5};const want=b=>{let hi=Math.min(C.max,b+w2+C.up),lo=Math.max(C.min,b+w2-C.dn);if(lo>hi-.5)lo=Math.max(0,hi-.5);return {lo:Math.round(lo*100)/100,hi:Math.round(hi*100)/100}};
 const p2k=Object.keys(r.k2),bandOK=p2k.every(k=>{const x=want(r.k2[k].b);return r.bB[k].lo===x.lo&&r.bB[k].hi===x.hi});
 const fallOK=r.ks.filter(k=>!r.k2[k]).every(k=>J(r.bB[k])===J(r.solo.band[k]));
 ok(r.whoB===2&&r.whoH===2&&bandOK&&fallOK,'4 player 2 (guest seat b / host ctx b): k2 kinds in HIS band, other kinds fall back to her band',{whoB:r.whoB,whoH:r.whoH,tho:r.bB.tho,her_tho:r.solo.band.tho});
 const inB=p2k.every(k=>r.hB[k].every(h=>h>=r.bB[k].lo-1e-9&&h<=r.bB[k].hi+1e-9)),fallH=r.ks.filter(k=>!r.k2[k]).every(k=>J(r.hB[k])===J(r.solo.hand[k]));
 ok(J(r.hB)===J(r.hH)&&inB&&fallH,'4 both devices roll the SAME hands for player 2 (guest = host-for-b); in his band; fallback kinds = hers',{inB,fallH});
 const ord=a=>a.map((h,i)=>[h,i]).sort((x,y)=>x[0]-y[0]||x[1]-y[1]).map(x=>x[1]).join(",");
 ok(p2k.every(k=>ord(r.hB[k])===ord(r.solo.hand[k])),'4 the same hash draw (order of people kept) in his band');
 ok(r.recSame&&r.recSame2&&J(r.back)===J(r.solo),'4 his play never touches the shared NPC record (p.mgH / p.mgHv); seat a after him = as before');
 ok(errs.length===0,'5 no page errors',errs.slice(0,3));
 await b.close();const f=res.filter(x=>!x).length;console.log(`${res.length-f}/${res.length} ok`);process.exit(f?1:0)})();
