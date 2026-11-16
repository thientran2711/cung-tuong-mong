/* PEOPLE LEDGER audit, part 2 (owner core law 16/11 13:40Z): people from outside the hậu cung (men S.men, officials q:*) come and go only at
   their SET hours, and at mandatory times everyone required is inside (morning court). Real play (bot walks / new buổi), at every moment:
   - men: the record (S.roster) = the fixed schedule (jmen menSched: duty rosters, work orders, festivals, visits; plans for strays) — a man
     is inside only with a reason, at one place for the whole buổi; recomputing the schedule gives the same places (no dice);
     at night (last buổi) no physician / craftsman / prince / envoy inside without a summons or a plan
   - officials: in the record iff on this buổi's roster (S.minW); at buổi sáng the court roster is at Cần Chính điện (thu)
   - morning court: buổi sáng, khắc 0 .. BAL.led.court-1: Hoàng thượng at thu (unless dead / away on a trip)
   usage: node dev/test/ledger_hours.js <page URL> [moments] [origin]  → JSON summary */
const {chromium}=require('playwright');const [,,URL,NM,ORIG]=process.argv;const N=+NM||40;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.setDefaultTimeout(240000);
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:240000});await p.waitForTimeout(2500);
 await p.evaluate(o=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;if(o)window.__forceOrigin=o;window.__nlInner=1;start();window.__nlInner=0;window.__bot=1;quiet=false;Q.length=0;try{deal()}catch(e){}render()},ORIG||'');
 const agg={moments:0,buoi:{},menIn:0,offIn:0,court:0,courtOk:0,bad:{},ex:[]};
 for(let i=0;i<N;i++){
  await p.evaluate(()=>{const clear=()=>{const ov=document.getElementById('ov');for(let j=0;j<5&&ov&&!ov.hidden;j++){const bs=ov.querySelectorAll('button');if(!bs.length)break;bs[bs.length-1].click()}let n=0;while(Q.length&&n++<30){const m=Q[0];if(m.opts&&m.opts.length){try{chooseM(m.opts.length-1)}catch(e){Q.shift()}}else{try{closeModal()}catch(e){Q.shift()}}}};clear();
   const r=Math.random();if(r<.6){try{nextBuoi()}catch(e){}}else{const L=places().map(x=>x.k).filter(k=>k!==S.place&&accessOf(S,k).ok);if(L.length)try{goTo(L[Math.floor(Math.random()*L.length)])}catch(e){}}clear()});
  await p.waitForTimeout(200);
  const m=await p.evaluate(()=>{if(S.dead)return{dead:1};const R=S.roster;if(!R||R.key!==j95key())return{norec:1};const bad=[];const B=S.buoi||0,kh=j95kh();const OUT=J95OUT_;
   const inside=id=>{const e=R.P[id];return !!e&&e.some(x=>x&&x[0]&&x[0]!==OUT)};
   /* men: record = schedule */const MW=JSON.parse(JSON.stringify(S.menW||{})),MY=JSON.parse(JSON.stringify(S.menWhy||{})),MI=JSON.parse(JSON.stringify(S.minW||{}));
   let W2={},Y2={},I2={};try{if(typeof menSched==="function"&&menSchedRoad()){menSched();W2=S.menW;Y2=S.menWhy;I2=S.minW}}catch(e){bad.push("menSched "+e.message)}S.menW=MW;S.menWhy=MY;S.minW=MI;
   let menIn=0,agg_sec=0;for(const x of S.men||[]){if(!x.alive)continue;const e=R.P[x.id];const y=MY[x.id];
    if(!e){if(MW[x.id])bad.push("man scheduled, not in record:"+x.rw);continue}
    const ks=new Set(e.map(z=>z&&z[0]));if(ks.size>1)bad.push("man moves inside a buổi:"+x.rw+":"+[...ks].join("/"));
    const k=e[kh][0];if(k===OUT)continue;menIn++;
    const sec=j95z().sec.some(s=>s.b===x.id&&s.wk===wk()&&s.c===R.c);/* a planned secret meeting (j95 sec: the record carries its reason) */
    if((!y||!y.w)&&!sec)bad.push("man inside without a reason:"+x.rw+"@"+k);if(sec)agg_sec++;
    else if(y.w!=="stray"&&W2[x.id]!==k)bad.push("man not at his set place:"+x.rw+":"+y.w+" rec "+k+" sched "+W2[x.id]);
    if(B===B4L&&y&&(y.w==="duty"||y.w==="order"||y.w==="visit"||y.w==="fest")&&x.rw!=="thị vệ")bad.push("man inside at night:"+x.rw+":"+y.w)}
   for(const id in W2){const x=manById(id);if(x&&x.alive&&(!MY[id]||MY[id].w!=="stray")&&W2[id]!==MW[id])bad.push("schedule not deterministic:"+x.rw+" rec "+MW[id]+"/"+(MY[id]&&MY[id].w)+" sched "+W2[id]+"/"+(Y2[id]&&Y2[id].w)+" b"+B+" key "+R.key)}
   /* officials */let offIn=0;for(const id in R.P){if(id.indexOf("q:")!==0)continue;const c=id.slice(2);if(!MI[c])bad.push("official in record, not on roster:"+c);else if(R.P[id][kh][0]!==MI[c])bad.push("official not at his set place:"+c);if(R.P[id][kh][0]!==OUT)offIn++}
   let ros=0;for(const c in MI){ros++;if(!R.P["q:"+c])bad.push("official on roster, not in record:"+c);if(I2[c]!==MI[c])bad.push("officials' roster not deterministic")}
   /* morning court */let court=0,cok=0;const CK=(BAL.led&&BAL.led.court)||0;
   if(B===0&&R.P.emp){court=1;let ok=true;for(let i=0;i<CK;i++){if(R.P.emp[i][0]!=="thu"){ok=false;bad.push("Emperor not at court khắc "+i+": "+R.P.emp[i][0]+" ("+R.P.emp[i][3]+")")}}
    for(const c in MI)if(MI[c]==="thu")for(let i=0;i<CK;i++)if(!R.P["q:"+c]||R.P["q:"+c][i][0]!=="thu"){ok=false;bad.push("court official away khắc "+i)}
    if(ok)cok=1}
   return{B,kh,place:S.place,menIn,sec:agg_sec,offIn,ros,court,cok,bad}});
  if(m.dead)break;if(m.norec)continue;agg.moments++;agg.buoi[m.B]=(agg.buoi[m.B]||0)+1;agg.menIn+=m.menIn;agg.sec=(agg.sec||0)+m.sec;agg.offIn+=m.offIn;agg.court+=m.court;agg.courtOk+=m.cok;
  for(const x of m.bad){const k=x.replace(/\d+/g,'#');agg.bad[k]=(agg.bad[k]||0)+1;if(agg.ex.length<8)agg.ex.push(i+": "+x)}}
 console.log(JSON.stringify({agg,pageErrors:errs.length,errs:errs.slice(0,4)}));await b.close()})();
