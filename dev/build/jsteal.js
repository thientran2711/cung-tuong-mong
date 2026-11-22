/* ================= jsteal: NIGHT STEALING BY AGENT CHOICE (owner 16/11 14:10Z + 14:45Z, NPC AGENT LAW OD:L1386) =================
   Replaces the flip-time rule "hostility ≥ 50 → flat roll → 50/50 feign/road" (j8 flip).
   Every consort (not the co-op friend, who plays herself) may try to take tonight's visit from whoever holds it — the player OR another
   NPC — with the player's OWN acts Tranh sủng / Chặn ngự giá (j8 ACT steal/road): same cost (BAL.steal.cost), same odds (oSteal), same
   win/lose effects (stealWin / stealNight). Symmetric: the player keeps her deck cards against any NPC holder.
   Whether an NPC tries is HER choice (agent): want = need × personality × relation × fear × odds, all from data she already has:
     need        favour gap (Sủng), rank gap (to Hoàng hậu), heir gap (no living son) — self-interest, weighted by BAL.steal.need
     personality persW(v,"steal"): her traits (PERS, j28) × her current mood (jemo emoMul); jmind mindW when that module is present
     relation    thiện cảm toward the holder lowers it (friends rarely rob friends); oán adds only a little (hatred → harm schemes)
     fear        a holder far above her in rank, or the Empress's custom night, lowers it
     odds        oSteal of the mode she picks (modes weighted by their odds, never argmax; OD:L1248 no smartest pick)
   try chance = 1 − e^(−k·want) ≤ pMax; at most maxTry tries a night, in random order; first win ends it (j75: one try each, a won
   visit is closed for everyone). Runs at the flip, after the custom (mùng một / rằm) decision, inside the card-flip scene (jflip
   reads the try through its stealNight hook).
   10-NIGHT LEDGER (owner 16/11 18:10Z/18:40Z): only the night she PLAYS is stolen live (this flip). Ledger nights that are not played
   call window.stealPass(holder,{live:false}) and print the returned lines as notices; nothing else changes.
   CO-OP: host decides the world; on the guest seat only tries against the guest herself are decided (her own night; world-agency on
   the guest stays muted like rivalsTurn), never NPC-vs-NPC.
   ======================================================================================================================== */
(function(){
const B=()=>BAL.steal;
const ST=window.__stealSt=window.__stealSt||[];   /* measuring only (bot); never saved */
function stEligible(v,t){return !!(v&&v!==S&&v!==t&&v.alive&&!v.out&&!v.coop&&!v.confined&&nightCh(v)>0&&(typeof ntCan!=="function"||ntCan(v)))}
function stNeed(v){const N=B().need;const fav=cl(1-(v.sung||0)/100,0,1),rank=rkOf(v)>=7?0:(7-rkOf(v))/7;
 const heir=kidsOf(v).some(k=>k.sex==="m")?B().heirHas:1;return (N.fav*fav+N.rank*rank+N.heir*heir)/(N.fav+N.rank+N.heir)}
function stRel(v,t){const b=B();const a=aff(v,t);let r=a>0?Math.max(b.friendMin,1-a/b.friend):1;return r*(1+b.oanW*Math.min(100,Math.max(0,oan(v,t)))/100)}
function stFear(v,t){const b=B();let f=rkOf(t)-rkOf(v)>=b.fear.gap?b.fear.f:1;const d=S.nightWhy;if(d&&d.cause==="custom"&&t&&rkOf(t)>=7)f*=b.custom;return f}
/* OD03 two-way: she weighs each mode by the odds she SEES (stealShown: the month art only once she knows it, as the player's flip card); the roll stays the true oSteal (stealNight) */
function stSeen(v,m){return typeof stealShown==="function"?stealShown(v,m):oSteal(v,m)}
function stModes(v){const b=B(),c=b.cost;const M=[];if(ducOf(v)>=c.feign.duc)M.push(["feign",stSeen(v,"feign")]);
 if((v.suc||0)>=b.sucMin+c.road.suc)M.push(["road",stSeen(v,"road")]);return M}
/* her wish to try tonight against holder t; mode is drawn now (weighted by its odds) */
function stealWant(v,t){const M=stModes(v);if(!M.length)return{u:0,p:0,mode:null};let r=Math.random()*M.reduce((a,m)=>a+m[1],0),i=0;while(r>M[i][1]&&i<M.length-1){r-=M[i][1];i++}
 const mode=M[i][0],o=M[i][1];let mind=1;try{if(typeof mindW==="function")mind=mindW(v,"scheme")||1}catch(e){}
 const need=stNeed(v),pers=persW(v,"steal")*mind,rel=stRel(v,t),fear=stFear(v,t);const u=need*pers*rel*fear*o/100;
 return{u,p:Math.min(B().pMax,1-Math.exp(-B().k*u)),mode,o,need,pers,rel,fear}}
function guestSeat(){try{return !!(window.coopGuest&&coopGuest())}catch(e){return false}}
function trName(v){try{return (traitsOf(v)[0])||"?"}catch(e){return "?"}}
/* one night: who tries, who wins. live = the played night (dialogs/log); else notice lines only */
function stealPass(t,opt){opt=opt||{};const live=opt.live!==false;const out={holder:t,lines:[],tries:0};if(!t||S.dead)return out;
 if(guestSeat()&&t!==S)return out;
 /* NPC-PURPOSE G3: who tries first = who wants his night most (stealWant u: need × grudge × nết), near-best each turn — never a shuffled queue */
 const W0=new Map(liveRivals(true).filter(v=>stEligible(v,t)).map(v=>[v,stealWant(v,t)]));const L=[];while(W0.size){const v=npwPick([...W0.keys()],x=>W0.get(x).u)||[...W0.keys()][0];L.push(v);W0.delete(v)}
 for(const v of L){if(out.tries>=B().maxTry)break;const w=stealWant(v,t);if(!w.mode||!haStealTry(v,t,w))continue;/* G3: her choice (jagharm haStealTry: mindPick on her want); the bare-odds fallback lives only in haStealTry's agent-off path *//* AG-ALL C: her choice (mindPick) while the loop is on, jagharm §3 */
  const s=stealNight(v,t,w.mode);if(!s)continue;out.tries++;const won=tonightOf()===v;
  ST.push({w:wk(),me:t===S,tr:trName(v),mode:w.mode,ok:won,live});if(ST.length>5000)ST.splice(0,1000);
  const txt=String(s).trim();try{if(typeof newsAdd==="function")newsAdd(v,"steal",txt.replace(/\.\s*$/,""),t===S)}catch(e){}
  if(!live){out.lines.push(txt);if(won){out.holder=v;break}continue}
  if(won){out.holder=v;
   if(t===S){for(let i=Q.length-1;i>=0;i--)if(Q[i].pid==="ksp")Q.splice(i,1);Q.push({t:"Kính sự phòng",h:`<p>Thẻ bài của ngươi đã được lật, nhưng ${txt}</p>`})}
   else if(eyes(S)>=BAL.stealx.hearMat)log(txt);
   try{const d=S.nightWhy;if(d&&d.wk===wk()){d.pick=v.id;d.cause="stolen"}}catch(e){}
   break}
  if(t===S)log(txt)}
 return out}
window.stealPass=stealPass;window.stealWant=stealWant;window.stealNeed=stNeed;window.stealEligible=stEligible;
/* the act's cost on the shared act list (ACT, j8) reads the same BAL as the deck cards (j2) and stealNight */
for(const k of ["steal","road"]){const A0=typeof ACT==="object"&&ACT[k];if(A0)Object.defineProperty(A0,"c",{get:()=>stealCost(k==="road"?"road":"feign"),set:()=>{},enumerable:true,configurable:true})}
/* the weekly social menu's old "steal" (j28 SOC, made a real act by j75) is folded into this one choice: one path, not two */
if(typeof SOC==="object"&&SOC.steal)SOC.steal.ok=()=>false;
/* the flip: after the tablet and the custom night are decided (j8 → j75), the consorts choose */
const f0=flip;flip=function(){const r=f0.apply(this,arguments);try{if(S&&!S.dead&&S.tonight&&!(typeof nfOn==="function"&&nfOn()))(window.stealPass||stealPass)(tonightOf(),{live:true})/* jnf: one batch, ties → Sủng → seeded (no 'first win ends it') */}catch(e){console.error(e)}return r};
})();
