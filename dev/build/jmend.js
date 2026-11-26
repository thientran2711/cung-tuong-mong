/* ================= jmend: the COSTLY ROADS DOWN FROM A DEEP GRUDGE (review/pace-all, MAIN 155 add-on 26/11 ~08:30Z to the owner's
   OD 26/11 ~08:25Z «làm cách nào để giảm bớt oán»; OB-OAN finding 1 + the two-way gap) =================
   Root of her complaint: Tạ lỗi / Nhún nhường are refused while the wronged one's oán ≥ her «nguoi» level (jnet netForgive, BAL.net.th) and
   oán climbs to 100, so only Biếu quà (−5) was left — and the refused words still took her Danh.
   (1) A refused word costs nothing: while netForgive fails, her «Tạ lỗi» / «Nhún nhường» rows are shown LOCKED with the reason (kit option
       row lock + t), never paid; an NPC's Tạ lỗi (TW apol, SOC.apologise) / Nhún nhường (cx:humble) is not chosen and not paid either.
   (2) Two equal-value roads for a deep grudge (law 2: one costs bạc, the other a friend's goodwill; law 3: each has a gain; law 5: the gift
       grows with the giver's rank): «Hậu lễ tạ tội» and «Nhờ người đứng giữa». Thành: oán − the width of its BAL.oanLv band (one band down,
       like one quiet season of BAL.oanCool); hỏng: the gift is sent back / the go-between is turned away — nothing is paid.
   (3) Two-way (law 1): the SAME function mendDo(doer, wronged, road) runs for her (talk rows) and for every consort (agent options cx:mendGift / cx:mendGo,
       toward her and toward each other); her own deep grudge toward an NPC is mended by that NPC's roads the same way.
   Every number: BAL.oanMend (jbal.js), BAL.net.th, BAL.oanLv.
   ===================================================================================================================== */
function mendDeep(t,a){try{return !!t&&!!a&&t!==a&&oan(t,a)>0&&!netForgive(t,a)}catch(e){return false}}
/* the go-between: someone the wronged one likes ≥ «than» who likes the doer ≥ «quen» (the best-liked by the wronged one) */
function mendGoOf(t,a){try{const L=(typeof liveRivals==="function"?liveRivals(true):[]).filter(m=>m&&m!==t&&m!==a&&m!==S&&m.alive!==false&&!m.out
  &&aff(t,m)>=netTh(t,"than")&&aff(m,a)>=netTh(m,"quen"));if(!L.length)return null;return L.sort((x,y)=>aff(t,y)-aff(t,x))[0]}catch(e){return null}}
function mendBac(a){const G=BAL.oanMend.gift;return G.bac+G.r*(rkOf(a)||0)}
function mendO(a,t,m){const M=BAL.oanMend;let b=M.o+M.kf*(persF(t,"forgive",1)-1)-M.deep*Math.max(0,oan(t,a)-netTh(t,"nguoi"));
 if(m)b+=M.go.stand*(aff(t,m)-netTh(t,"than"));return odA(a,Math.round(b))}
function mendCost(a,k){const M=BAL.oanMend;return k==="gift"?{bac:-mendBac(a),danh:M.gift.danh}:{danh:M.go.danh}}
function mendCan(a,t,k,paid){if(!mendDeep(t,a))return false;if(k==="gift")return paid||((a===S?S.bac:a.bac)||0)>=mendBac(a);return !!mendGoOf(t,a)}
/* one road for anyone: a = doer, t = the one who holds the grudge, k = "gift" | "go"; ok = already rolled (her talk card) or rolled here.
   paid = her talk card already took the cost row (talk() applies a.c): a refusal hands it back (the gift is returned), so a refusal costs nothing. */
function mendDo(a,t,k,ok,paid){if(!mendCan(a,t,k,paid))return"";const m=k==="go"?mendGoOf(t,a):null;if(ok==null)ok=aRoll(mendO(a,t,m),a);
 const A=a===S?"Ngươi":a.name,c=mendCost(a,k);
 if(!ok){if(paid){const r={};for(const x in c)r[x]=-c[x];twAp(a,r)}
  return k==="gift"?`${A} đem hậu lễ sang tạ tội với ${NM(t)}, nhưng lễ bị trả về`:`${m.name} đứng ra nói giúp ${a===S?"ngươi":a.name} trước ${NM(t)}, nhưng bị gạt đi`}
 if(!paid)twAp(a,c);if(m)affAdd(m,a,-BAL.oanMend.go.fav);const d=ocBandW(oan(t,a));oanAdd(t,a,-d);
 return k==="gift"?`${A} đem hậu lễ sang tạ tội với ${NM(t)}; ${t===S?"ngươi":t.name} nhận lễ, oán -${d}`:`${m.name} đứng ra nói giúp ${a===S?"ngươi":a.name}; ${t===S?"ngươi":t.name} nể lời, oán -${d}`}
/* her talk rows (topicOpts: every talk list that offers Tạ lỗi / Nhún nhường — rival, hh, same house); the kit card shows c in its «Tốn» row */
(function(){const t0=topicOpts;topicOpts=function(v){const A=t0.apply(this,arguments);try{if(!S||!v||!mendDeep(v,S))return A;
  const why=`${v.name} chưa nguôi giận (${oanW(oan(v,S))}): lời suông chưa đủ, cần hậu lễ hoặc người đứng giữa`;
  for(const a of A)if(a.n==="Tạ lỗi"||a.n==="Nhún nhường"){a.lock=true;a.t=why;a.x="";a.c={}}
  const M=BAL.oanMend,d=ocBandW(oan(v,S)),bac=mendBac(S),o1=mendO(S,v,null),poor=(S.bac||0)<bac;
  A.push({n:"Hậu lễ tạ tội",o:o1,c:mendCost(S,"gift"),x:`thành: oán -${d} (xuống một bậc) · hỏng: lễ bị trả về, hoàn lại bạc và Danh`,
   lock:poor,t:poor?`thiếu bạc (cần ${bac})`:"",run:()=>{chatMark(v);return (mendDo(S,v,"gift",aRoll(o1,S),true)||"")+"."}});
  const m=mendGoOf(v,S),o2=m?mendO(S,v,m):0;
  A.push({n:"Nhờ người đứng giữa",o:o2,c:mendCost(S,"go"),x:m?`thành: ${m.name} nói giúp, oán -${d} (xuống một bậc) · kèm: ${m.name} quý ngươi -${M.go.fav} · hỏng: hoàn lại Danh, không mất gì`:"",
   lock:!m,t:m?"":`chưa có ai được ${v.name} nể mà cũng quý ngươi`,run:()=>{chatMark(v);return (mendDo(S,v,"go",aRoll(o2,S),true)||"")+"."}})}catch(e){console.error("mend",e)}return A};window.topicOpts=topicOpts})();
/* every consort: the same two roads toward her and toward each other (agent option, «safe» need like Nhún nhường) */
agReg("consort","mend",(v,N,need)=>{if(need&&need!=="safe")return[];const O=[];
 const L=others(v).filter(t=>t&&t!==v&&(t===S||t.alive)&&mendDeep(t,v));if(!L.length)return O;const t=mindPickBy(L,x=>BAL.mind.pick.ag.base+oan(x,v),v);if(!t)return O;
 for(const k of ["gift","go"]){if(!mendCan(v,t,k))continue;const m=k==="go"?mendGoOf(t,v):null;const o=mendO(v,t,m);
  const u=agcU(v,N,o,{safe:BAL.ag.cx.humble.g*2},mendCost(v,k),"help");if(u>0)O.push({k:k==="gift"?"cx:mendGift":"cx:mendGo",t,u,tag:"help",act:k==="gift"?"đem hậu lễ sang tạ tội":"nhờ người nói giúp",at:(kh,vv,tt)=>tt===S?"home":agAt(tt,kh)})}
 return O});
agRunReg("cx:mendGift",(v,t)=>t?mendDo(v,t,"gift")||"":"");agRunReg("cx:mendGo",(v,t)=>t?mendDo(v,t,"go")||"":"");
