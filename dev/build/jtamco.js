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
function econRoadOk(k,a,t,road){if(!a||!ACT[k]||!ACT[k].__c0)return false;const c=econRoadCost(k,a,t);
 if(road==="tc")return (a.tamco||0)>=c.tc;if(road==="hire")return (a.bac||0)>=c.pr+c.hire;return true}
/* an NPC picks her road (law 1): spare silver → hire; a sharp mind → plot it herself; else as usual */
function econRoadNpc(a,k,t){if(!ACT[k]||!ACT[k].__c0)return"";const R=BAL.tcroad,c=econRoadCost(k,a,t);
 if((a.bac||0)>=c.pr+c.hire+R.npcKeep&&roll(R.npcP))return"hire";
 if((a.tamco||0)>=c.tc+R.npcTcMin&&roll(R.npcP))return"tc";return""}
function econRoadPay(a,k,t,road){const c=econRoadCost(k,a,t);if(road==="tc")ap(a,{tamco:-c.tc});else if(road==="hire")ap(a,{bac:-c.hire});return c}
/* the NPC act: pay the road, the act's own success roll gets +up (aOdd, below) */
function econRoadWrapF(){for(const k in ACT){const A0=ACT[k];if(!A0||!A0.__c0||(A0.f&&A0.f.__road))continue;const f0=A0.f;/* again at the script end: later modules replace some f (jwhy spy) */
  const f=function(a,t){if(!a||a===S||ECON_RB)return f0.apply(this,arguments);let road="";try{road=econRoadNpc(a,k,t)}catch(e){}
   if(!road)return f0.apply(this,arguments);econRoadPay(a,k,t,road);ECON_RB={a,b:BAL.tcroad.up,road};try{return f0.apply(this,arguments)}finally{ECON_RB=null}};f.__road=1;A0.f=f}}
econRoadWrapF();setTimeout(econRoadWrapF,0);
(function(){const o0=aOdd;aOdd=function(o,a){const z=o0.apply(this,arguments);
 if(ECON_RB&&!(ACTX&&ACTX.fz!=null)&&(a===undefined||a===ECON_RB.a))return oddsCl(z+ECON_RB.b);return z}})();
/* her choice: a priced scheme from doAct opens the road card first */
let ECON_ROADGO=0;
PEND.roadpick=p=>{const v=RV(p.v),k=p.k,A0=ACT[k];if(!v||!A0)return null;const c=econRoadCost(k,S,v),o0=actOdds(S,v,k),R=BAL.tcroad;
 const up=oddsCl(o0+R.up),go=road=>()=>econRoadGo(rivals.indexOf(v),k,road,road?up:o0);
 const O=[{n:"Làm như thường",fx:{},p:oddsCl(o0),x:`thành: giá mưu kế như cũ, không hao gì thêm`,go:go("")}];
 O.push({n:"Hao tâm cơ, tự mình sắp đặt",fx:{},p:up,off:!econRoadOk(k,S,v,"tc"),x:`tốn: Tâm cơ -${c.tc} · thành: tự tay sắp đặt từng bước, chắc tay hơn`,go:go("tc")});/* the Tâm cơ cost rides in x ("tốn:" row, kit grammar j63 kaRows): the fx row hides Tâm cơ at ≥ 25 (open KIT REQUEST road-b2); paid in econRoadGo */
 O.push({n:"Thuê người làm thay",fx:{bac:-c.hire},p:up,off:!econRoadOk(k,S,v,"hire"),x:`thành: người được thuê làm thay, chắc tay hơn`,go:go("hire")});
 O.push({n:"Thôi",fx:{}});
 return{who:pv(v),t:`<p>${A0.n} — ${v.name}: tự tay làm, hao tâm cơ mà sắp đặt, hay bỏ bạc thuê người làm thay?</p>`,o:O}};
function econRoadGo(i,k,road,fz){if(road==="tc"){const v=rivals[i];if(v)ap(S,{tamco:-econRoadCost(k,S,v).tc})}ECON_ROADGO=1;try{fzRun(fz,k,()=>doAct(i,k))}finally{ECON_ROADGO=0}}
(function(){if(typeof doAct!=="function")return;const d0=doAct;doAct=function(i,k){try{const v=rivals[i],A0=ACT[k];
  if(!ECON_ROADGO&&v&&A0&&A0.__c0&&!Q.length&&!S.dead&&v.alive&&!v.out&&can(typeof harmK==="function"?harmK(v,k):BAL.time.cost.harm)&&A0.ok(S,v)&&(econRoadOk(k,S,v,"tc")||econRoadOk(k,S,v,"hire"))){pushDil(mkP("roadpick",{v:v.id,k}),A0.n);render();return}}catch(e){console.error("road",e)}
  return d0.apply(this,arguments)}})();
window.econRoadCost=econRoadCost;window.econRoadOk=econRoadOk;window.econRoadNpc=econRoadNpc;
