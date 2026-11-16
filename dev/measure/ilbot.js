/* Item ledger + conservation bot (jil.js, review/item-ledger).
   usage: node dev/measure/ilbot.js <url of root index.html> [lives=3] [weeks=200]
   She plays like a player who sometimes sells (every ~6 weeks one durable piece, Nội vụ phủ or outside) and gives gifts; the world runs as usual.
   Ransom visits (PEND ilback): she pays when she can (70 %); returned pieces in the Nội vụ phủ tray: she buys them back 50 % of the time.
   Prints: CONSERVATION (durable pieces ever seen vs. located now — must be equal; "net" = removals with no route, by item, must be 0),
   her sold pieces: back in her chest (via tray / ransom), still out, mean weeks to return; NPC sold pieces: back to owner / bought by another /
   still in the market; box size; page errors. */
const {chromium}=require('playwright');const [,,URL,LIVES,WEEKS]=process.argv;
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:1180,height:820},serviceWorkers:'block',reducedMotion:'reduce'})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{timeout:0});await p.addStyleTag({content:'#kroul,#kroulw,#kload,.krbox,#dawn,#curtain,.fxo{display:none!important}'});await p.waitForFunction(()=>typeof start==='function'&&typeof ilAudit==='function',null,{timeout:0});
 const r=await p.evaluate(([L,W])=>{document.getElementById('title').hidden=true;
  const T={lives:0,weeks:0,seen:0,located:0,missing:[],net:{},how:{},meSold:0,meBack:0,meBackTray:0,meBackRansom:0,meOut:0,meWk:[],ransomAsk:0,ransomPaid:0,npcSold:0,npcBackOwn:0,npcBought:0,npcOut:0,box:[],confMe:0,confBack:0,lostCases:0,ntLost:0};
  const g0=ilGone;ilGone=window.ilGone=function(pp,e,how,o){const x=g0.apply(this,arguments);if(x){T.how[how]=(T.how[how]||0)+1;const hk=how+":"+e.k;T.hk=T.hk||{};T.hk[hk]=(T.hk[hk]||0)+1;if(how==="evid"&&!T.ev1)T.ev1=String(new Error().stack).split("\n").slice(2,6).join(" / ");if(how==="net")T.net[e.k]=(T.net[e.k]||0)+1;if(x.at==="mkt"){if(x.own==="me")T.meSold++;else T.npcSold++}if(how==="conf"&&x.own==="me")T.confMe++}return x};
  const t0=ilTake;ilTake=function(x,pp,how){const own=x.own,at=x.at,w=x.w;const ok=t0.apply(this,arguments);if(ok&&at==="mkt"){if(own==="me"&&pp===S){T.meBack++;T.meWk.push(wk()-w);if(how==="mua lại")T.meBackTray++;else T.meBackRansom++}else if(own&&own!=="me"&&(pp.id===own))T.npcBackOwn++;else if(own&&own!=="me")T.npcBought++}if(ok&&at==="nvp"&&own==="me"&&how==="sám hối xin lại")T.confBack++;return ok};
  const pd0=pushDil;pushDil=function(d,t){if(d&&d.pid==="ilback"){T.ransomAsk++;const o=d.o[0];if(o&&o.n==="Chuộc về"&&Math.random()<.7){T.ransomPaid++;apply(o.fx);o.go()}return""}
   if(d&&d.pid==="ilconf"){const o=d.o[0];if(Math.random()<.6){apply(o.fx);o.go()}return""}return pd0.apply(this,arguments)};
  const ever=new Set();const last=new Map();const look=()=>{for(const pp of ilPeople())for(const e of ilSlots(pp))if(e.iu&&ilDur(e)){ever.add(e.iu);last.set(e.iu,[e.k,ilKey(pp),wk(),pp!==S&&pp.alive===false?"dead":""])}};
  for(let l=0;l<L;l++){for(let i=0;i<40;i++){try{store.set(NL_KEY,null)}catch(e){}start();let ok=false;try{ok=!isSrv()}catch(e){}if(ok)break}T.lives++;ever.clear();last.clear();S.bac=Math.max(S.bac,200);
   for(let w=0;w<W&&!S.dead;w++){/* she answers gift dialogs ("Nhận"); every other dialog is dropped as in the other bots */
    for(const m of Q.slice())if(m&&(m.pid==="giftin"||m.pid==="pgin")&&m.opts&&m.opts[0]&&m.opts[0].go){try{m.opts[0].go()}catch(e){}}Q.length=0;try{
     if(w%6===3){const ix=S.inv.findIndex(e=>e&&!e.h&&!e.w&&ilDur(e)&&!e.nt&&!(IT[e.k]&&IT[e.k].keep));if(ix>=0){if(typeof econSell==="function"&&Math.random()<.5)econSell(S,ix);else sellItem(S,ix)}}
     if(w%9===5){const v=liveRivals(true)[0];const ix=S.inv.findIndex(e=>e&&!e.h&&!e.w&&!e.t&&IT[e.k]);if(v&&ix>=0)giveTo(S,v,ix)}
     for(const t of ilShopTiles())if(Math.random()<.5)t.onBuy();
     if(S.bac<60)S.bac+=60;
     endTurn()}catch(e){console.error(e)}look();T.weeks++}
   T.ends=(T.ends||[]).concat(wk()+(S.dead?"d":""));ilCensus();const I=ilS();T.box.push(I.box.length);T.censusNet=(T.censusNet||0)+I.net;T.netLog=(T.netLog||[]).concat(I.log.filter(l=>l[5]==="net").map(l=>l[2]+"@"+l[3])).slice(0,30);
   const at=I.at||{};T.seen+=ever.size;let loc=0;for(const id of ever){if(at[id])loc++;else{T.missing.push(id);const L=last.get(id)||[];T.missDet=(T.missDet||[]).concat([[id].concat(L,[I.log.filter(l=>l[1]===id).slice(-3).map(l=>l.slice(3).join(">")).join(" | ")])]).slice(0,20)}}T.located+=loc;
   for(const x of I.box)if(x.at==="mkt"){if(x.own==="me")T.meOut++;else if(x.own)T.npcOut++}
   T.lostCases+=(S.lost||[]).length;Q.length=0}
  T.meWkMean=T.meWk.length?+(T.meWk.reduce((a,b)=>a+b,0)/T.meWk.length).toFixed(1):null;T.meWkMax=T.meWk.length?Math.max(...T.meWk):null;delete T.meWk;T.missing=T.missing.slice(0,20);return T},[+(LIVES||3),+(WEEKS||200)]);
 console.log(JSON.stringify({r,errs:errs.slice(0,8)},null,1));await b.close()})();
