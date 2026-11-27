/* ================= jtamco: ECONOMY §5 — TÂM CƠ AS ITS OWN COST + BUYING SAFETY WITH BẠC (ECONOMY.md §5 «Chưa làm», GAP OR21) =================
   Every scheme priced by its target (jecon §5: ACT[k].__c0, the bạc schemes) can be done three ways, one rule for her and every NPC (law 1):
     «Làm như thường»        : the price jecon §5 already charges, the shown odds (unchanged);
     «Hao tâm cơ»            : she plots every step herself: Tâm cơ −tc (the stat really drops, so later schemes lose its odds), odds +BAL.tcroad.up;
     «Thuê người làm thay»   : she hires a hand: bạc −hire on top of the price, odds +BAL.tcroad.up.
   EQUAL VALUE (law 2): tc and hire come from ONE exchange rate, BAL.tcroad.rate bạc per Tâm cơ point (the arc table's own rate: {bac:-30} ⇔ {tamco:3},
   jbalarc s2/x1), so hire = tc × rate exactly; both buy the SAME odds. GAIN AND LOSS (law 3): each road has a cost and a gain. ONE CORE (law 4):
   every number is BAL.tcroad. NPCs (law 1) pick a road in the act itself (econRoadNpc): the same costs, the same odds, the same rate.
   Her choice: doAct (j8) for a priced scheme opens a kit choice (PEND.roadpick, the same dilemma card as «Cài đồ vào rương»); the odds printed on
   each option = the odds rolled (fzRun freezes them, j9). */
BAL.tcroad={rate:10,share:.5,tcMin:1,up:12,npcP:50,npcKeep:30,npcTcMin:25};
let ECON_RB=null;/* the NPC road bonus in force for one act: {a, b} (her rolls use the frozen shown odds instead) */
function econRoadCost(k,a,t){const pr=typeof econSchemePrice==="function"?econSchemePrice(k,a,t):0;const R=BAL.tcroad;
 const tc=Math.max(R.tcMin,Math.round(pr*R.share/R.rate));return{pr,tc,hire:tc*R.rate}}
/* a road sells odds (+up), so it exists only where the act's success really rolls on its odds (law 3, econ-tamco F2): the act shows odds below 100
   (musk / catswap: o null, no roll → no road), and no PLAYER decides the outcome (a judge request whose Hoàng hậu is her: her own card, no roll).
   Every success decision of a road scheme reads aOdd (the frozen shown odds / the NPC road's +up): bribe + bribel (jrcv rcvMaidBribe weight),
   xinhh + trinhhh (jaudit → rcvJudge), the rest aRoll; dev/test/econ-tamco-scan.js checks it per scheme for her and an NPC */
function econRoadRolls(k,a,t){if(!a||!t||!ACT[k]||!ACT[k].__c0)return false;let o=null;try{o=actOdds(a,t,k)}catch(e){}if(o==null||o>=100)return false;
 if(typeof RCVJ==="object"&&RCVJ[k]&&typeof queenP==="function"&&queenP()===S&&a!==S)return false;return true}
function econRoadOk(k,a,t,road){if(!econRoadRolls(k,a,t))return false;const c=econRoadCost(k,a,t);
 if(road==="tc")return (a.tamco||0)>=c.tc;if(road==="hire")return (a.bac||0)>=c.pr+c.hire;return true}
/* an NPC picks her road (law 1): spare silver → hire; a sharp mind → plot it herself; else as usual */
function econRoadNpc(a,k,t){if(!econRoadRolls(k,a,t))return"";const R=BAL.tcroad,c=econRoadCost(k,a,t);
 if((a.bac||0)>=c.pr+c.hire+R.npcKeep&&roll(R.npcP))return"hire";
 if((a.tamco||0)>=c.tc+R.npcTcMin&&roll(R.npcP))return"tc";return""}
function econRoadPay(a,k,t,road,c0){const c=c0||econRoadCost(k,a,t);/* c0: the cost she SAW on the card (F3: khắc spent before the act can move the price) */if(road==="tc")ap(a,{tamco:-c.tc});else if(road==="hire")ap(a,{bac:-c.hire});return c}
/* the NPC act: pay the road, the act's own success roll gets +up (aOdd, below) */
function econRoadWrapF(){for(const k in ACT){const A0=ACT[k];if(!A0||!A0.__c0||(A0.f&&A0.f.__road))continue;const f0=A0.f;/* again at the script end: later modules replace some f (jwhy spy) */
  const f=function(a,t){if(!a||a===S||ECON_RB)return f0.apply(this,arguments);let road="";try{road=econRoadNpc(a,k,t)}catch(e){}
   if(!road)return f0.apply(this,arguments);const c=econRoadPay(a,k,t,road),g0=econVeto();ECON_RB={a,b:BAL.tcroad.up,road};try{return f0.apply(this,arguments)}finally{ECON_RB=null;if(econVeto()!==g0)ap(a,road==="tc"?{tamco:c.tc}:{bac:c.hire})/* the act's own gate stopped it: the road is given back */}};f.__road=1;A0.f=f}}
econRoadWrapF();setTimeout(econRoadWrapF,0);
(function(){const o0=aOdd;aOdd=function(o,a){const z=o0.apply(this,arguments);
 if(ECON_RB&&!(ACTX&&ACTX.fz!=null)&&(a===undefined||a===ECON_RB.a))return oddsCl(z+ECON_RB.b);return z}})();
/* her choice: a priced scheme from doAct opens the road card first */
let ECON_ROADGO=0;
PEND.roadpick=p=>{const v=RV(p.v),k=p.k,A0=ACT[k];if(!v||!A0)return null;const c=econRoadCost(k,S,v),o0=actOdds(S,v,k),R=BAL.tcroad;
 const up=oddsCl(o0+R.up),win=typeof ECON_WIN!=="undefined"&&ECON_WIN.includes(k),pr=c.pr>0&&!win?{bac:-c.pr}:{},
  /* pay-on-success schemes (ECON_WIN: the price is paid only when it works): the price sits on «thành», not in Tốn; «hỏng» says what a failure keeps */
  wT=win&&c.pr>0?`, Bạc -${c.pr}`:""/* KIT §88: a cost under «thành:» of a roll act = THÀNH Mất (paid only when it lands), not Tốn */,wH=hire=>win?` · hỏng: ${hire?"chỉ mất tiền thuê, ":""}${ECON_WIN_FAIL}${hire?" giá mưu kế":""}`:"",go=road=>()=>econRoadGo(rivals.indexOf(v),k,road,road?up:o0,c);
 const O=[{n:"Làm như thường",fx:{},p:oddsCl(o0),ton:pr,x:`thành: giá mưu kế như cũ, không hao gì thêm${wT}${wH(0)}`,go:go("")}];
 O.push({n:"Hao tâm cơ, tự mình sắp đặt",fx:{},p:up,off:!econRoadOk(k,S,v,"tc"),ton:Object.assign({tamco:-c.tc},pr),x:`thành: tự tay sắp đặt từng bước, chắc tay hơn${wT}${wH(0)}`,go:go("tc")});/* kit Tốn row (KIT §13.16 ton field): a price paid elsewhere — Tâm cơ is paid in econRoadGo, the scheme price by the act */
 O.push({n:"Thuê người làm thay",fx:{},p:up,off:!econRoadOk(k,S,v,"hire"),ton:{bac:-(win?c.hire:c.pr+c.hire)},x:`thành: người được thuê làm thay, chắc tay hơn${wT}${wH(1)}`,go:go("hire")});
 O.push({n:"Thôi",fx:{}});
 /* the queued item gets act:1 (KIT §28.6 data flag, set where doAct pushes it): the scheme act's OWN picker, not an event → the open act card (Tốn · THÀNH · BẠI with numbers, §88), so a pay-on-success price shows as THÀNH «Bạc -N» */
 return{who:pv(v),t:`<p>${A0.n} — ${v.name}: tự tay làm, hao tâm cơ mà sắp đặt, hay bỏ bạc thuê người làm thay?</p>`,o:O}};
/* her road travels with her act as ECON_HER {k, t: rival id, road, fz: the odds she saw}; runAct (below) pays it and rolls the odds she saw.
   Co-op (owner CO-OP LAND GATE): a thin guest's runAct is an intent run on the HOST; ECON_HER rides in that intent's ctx (jcoopthinf F1
   runAct "econ"), so the host computes the cost and the roll in her context — the same road on both seats, nothing paid on the guest phone. */
window.ECON_HER=null;
/* SHOWN = CHARGED (F3): the card's numbers {pr, tc, hire} ride with the road (c) and are what is paid — the road (econRoadPay) and the scheme
   price (econSchemePrice for her act on that target, frozen by ECON_PRFZ while her act runs); the plain road carries them too (road "") */
let ECON_PRFZ=null;
(function(){if(typeof econSchemePrice!=="function")return;const p0=econSchemePrice;econSchemePrice=function(k,a,t){const z=ECON_PRFZ;
 if(z&&a===S&&k===z.k&&t&&t.id===z.t&&z.pr!=null)return z.pr;return p0.apply(this,arguments)}})();
/* F4: a frozen cost is paid only if she can still pay it NOW (the host's copy of her in co-op, a deed landing weeks later): else the act stops,
   nothing is charged (the same words as the j19 lock, «Thiếu bạc (cần N)»). The act's own check (ACT.ok) needs bạc ≥ price for every scheme, pay-on-success too */
function econLack(a,k,t,road,c){if(!a||!c)return"";if(road==="tc"&&(a.tamco||0)<c.tc)return `Thiếu Tâm cơ (cần ${c.tc})`;
 const need=(road==="hire"?c.hire:0)+(c.pr||0);return (a.bac||0)<need?`Thiếu bạc (cần ${need})`:""}
function econPrFz(h,fn){const z0=ECON_PRFZ;ECON_PRFZ=h&&h.c?{k:h.k,t:h.t,pr:h.c.pr}:null;try{return fn()}finally{ECON_PRFZ=z0}}
function econRoadGo(i,k,road,fz,c){const v=rivals[i];window.ECON_HER=v?{k,t:v.id,road:road||"",fz,c:c||null}:null;ECON_ROADGO=1;try{fzRun(fz,k,()=>doAct(i,k))}finally{ECON_ROADGO=0;window.ECON_HER=null}}
(function(){if(typeof runAct!=="function")return;const r0=runAct;runAct=function(a,t,k){const h=window.ECON_HER;
 if(!h||a!==S||!t||t.id!==h.t||k!==h.k||!ACT[k]||!ACT[k].__c0)return r0.apply(this,arguments);window.ECON_HER=null;
 const A=arguments,run=()=>econPrFz(h,()=>r0.apply(this,A));const lack=econLack(S,k,t,h.road,h.c||econRoadCost(k,S,t));if(lack)return `${lack}: ${ACT[k].n} không thành, chưa tốn gì. `;econRoadPay(S,k,t,h.road,h.c);/* tc: Tâm cơ · hire: the hired hand (the scheme price is the act's own) */
 return ACTFZ||h.fz==null?run():fzRun(h.fz,k,run)}})();
/* parallel time (jptime): a scheme SENT with a servant (ptHarmSend, the spy deed…) lands later. The deed sent while her road is pending
   carries it (a.econ) and pays it when it lands (ptLand), before the deed's own run; the odds she saw are the deed's fz. Co-op: the landing
   runs on the host in her context (ptTickHer intent), so the host pays it. */
setTimeout(()=>{try{if(typeof ptSend!=="function"||typeof ptLand!=="function")return;
 const s0=ptSend;ptSend=function(o){const h=window.ECON_HER,a=s0.apply(this,arguments);
  try{if(a&&h&&o&&o.tgt==="v"+h.t&&(!o.a||o.a.k==null||o.a.k===h.k)){a.econ={k:h.k,t:h.t,road:h.road,c:h.c||null};window.ECON_HER=null}}catch(e){}return a};
 const l0=ptLand;ptLand=function(a){let e=null;try{e=a&&a.econ;if(e&&!a.back&&a.by==="me"){delete a.econ;const t=RV(e.t);if(t&&ACT[e.k]){const lack=econLack(S,e.k,t,e.road,e.c||econRoadCost(e.k,S,t));
   if(lack){a.back=1;try{PT.stat.back++}catch(x){}a.rep={t:a.lbl||"Đã về",ok:false,L:[`${lack}: ${ACT[e.k].n} không thành, chưa tốn gì.`],d:[]};return}/* F4: she cannot pay it any more → the deed comes back undone */econRoadPay(S,e.k,t,e.road,e.c)}}else e=null}catch(x){console.error("econ road land",x)}
  const A=arguments;return econPrFz(e,()=>l0.apply(this,A))}}catch(e){console.error("econ road ptime",e)}},0);
(function(){if(typeof doAct!=="function")return;const d0=doAct;doAct=function(i,k){try{const v=rivals[i],A0=ACT[k];
  /* j70's «Bày mưu» card goes first (review/fix-hadoc-loop): its «Ra tay ngay» comes back here (__j70inst) and gets the road card; the road
     she then picks runs the act with ECON_HER set, which j70Wants reads, so neither card can call the other again */
  if(typeof window.j70Wants==="function"&&window.j70Wants(v,k))return d0.apply(this,arguments);
  if(!ECON_ROADGO&&v&&A0&&A0.__c0&&!Q.length&&!S.dead&&v.alive&&!v.out&&can(typeof harmK==="function"?harmK(v,k):BAL.time.cost.harm)&&A0.ok(S,v)&&(econRoadOk(k,S,v,"tc")||econRoadOk(k,S,v,"hire"))){pushDil(mkP("roadpick",{v:v.id,k}),A0.n);for(const m of Q)if(m&&m.pid==="roadpick")m.act=1;/* KIT §28.6 data flag: the act's own picker (pushDil does not carry act) */render();return}}catch(e){console.error("road",e)}
  return d0.apply(this,arguments)}})();
window.econRoadCost=econRoadCost;window.econRoadOk=econRoadOk;window.econRoadNpc=econRoadNpc;
