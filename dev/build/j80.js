/* j80 — Sức hotfix. Before: +4 Sức per tuần (+1 in harsh weather) while most acts cost 5–20, and every 2-khắc act,
   including "Nghỉ ngơi dưỡng sức" itself, was locked below Sức 20: players got stuck with khắc left and no way to recover.
   Now: (1) a night's sleep restores a real amount, same rule for every consort; (2) acts that restore Sức and cost none
   are never locked by the Sức floor; (3) the morning log states the recovery as a true delta. */
var __restAct=0,__cardSuc=0;
/* the old floor "Sức ≥ 20 for any 2-khắc act" also blocked walking on the map and resting; now the floor is Sức 5
   (exhausted), and a card that costs Sức needs enough Sức to pay it and stay above 0 */
const SUC_FLOOR=5;
function isRestCard(a){return !!(a&&a.w&&a.w.suc>0&&!(a.c&&a.c.suc<0))}
can=function(c){if(!S||S.dead||used+c>4)return false;if(__restAct||c<=1)return true;if(__cardSuc)return S.suc+__cardSuc>0&&S.suc>=SUC_FLOOR;return S.suc>=SUC_FLOOR};
function cardSuc(a){return a&&a.c&&a.c.suc<0?a.c.suc:0}
(function(){const a0=act;act=function(i){__restAct=isRestCard(deck[i])?1:0;__cardSuc=cardSuc(deck[i]);try{return a0.apply(this,arguments)}finally{__restAct=0;__cardSuc=0}}})();
(function(){const h0=cardH;cardH=function(a){__restAct=isRestCard(a)?1:0;__cardSuc=cardSuc(a);try{return h0.apply(this,arguments)}finally{__restAct=0;__cardSuc=0}}})();
(function(){if(typeof whyTime!=="function")return;const w0=whyTime;whyTime=function(c){if(!S||S.dead)return"";if(used+c>4)return"hết khắc buổi này";if(__restAct||c<=1)return"";if(__cardSuc&&S.suc+__cardSuc<=0)return `cần Sức trên ${-__cardSuc} (có ${S.suc})`;return S.suc<SUC_FLOOR?`kiệt sức (Sức ${S.suc}, cần ${SUC_FLOOR}) — nghỉ ngơi trước`:""}})();
function sleepRegen(p){const base=(typeof harsh==="function"&&harsh())?8:14;return base+(p.suc<30?6:0)}
(function(){const e0=endTurn;endTurn=function(){
  if(!S||S.dead||Q.length||S.mg||(typeof isSrv==="function"&&isSrv()))return e0.apply(this,arguments);
  const g=Math.min(sleepRegen(S),100-S.suc);S.suc=cl(S.suc+g,0,100);
  try{liveRivals(true).forEach(v=>v.suc=cl(v.suc+sleepRegen(v),0,100))}catch(e){}
  const r=e0.apply(this,arguments);
  try{if(!S.dead&&g>0)log(`<span class="g">Ngủ đêm hồi sức: Sức +${g}</span>`)}catch(e){}
  return r}})();
