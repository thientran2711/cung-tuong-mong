/* ================= SEAT CAPS PER RANK, PUSH-DOWN ROADS, DEMOTION REVIEW (one rule for every consort) ================= */
const SEATCAP={7:1,6:1,5:2,4:4,3:6};
function holders(r){return consorts().filter(p=>rkOf(p)===r)}
function seatFree(r){return SEATCAP[r]==null||holders(r).length<SEATCAP[r]}
function seatTxt(r){return SEATCAP[r]==null?"":`${RANKS[r].n} ${holders(r).length}/${SEATCAP[r]}`}
/* promotion into a full rank waits for a seat; the requirement row says so */
(function(){const q0=promoReqP;promoReqP=function(p){const L=q0.apply(this,arguments);const r=rkOf(p);if(r<6&&!p.out&&SEATCAP[r+1]!=null){const free=seatFree(r+1);L.push([free||!!window.__seatPick,free?`Ghế ${seatTxt(r+1)}: còn chỗ`:`Chờ ghế trống (${seatTxt(r+1)})`])}return L}})();
/* when seats are free and several qualify, the Emperor weighs them (sủng, Thái hậu, sons, danh, Hoàng hậu's word); her included */
function seatPickW(p){const q=queenP();return seatW(p)+p.sung/2+(q&&q!==p?aff(q,p)/5:0)}
function fillSeats(){let ev="";for(const r of [6,5,4,3]){if(!seatFree(r))continue;const C=consorts().filter(p=>rkOf(p)===r-1&&!p.out&&!p.confined&&promoReqP(p).every(x=>x[0]));
  if(C.length<2)continue;/* single candidate: the ordinary decree handles it */
  let n=SEATCAP[r]-holders(r).length;while(n-->0&&C.length){const tot=C.reduce((s,p)=>s+seatPickW(p),0);let x=Math.random()*tot,w=C[0];for(const p of C){x-=seatPickW(p);if(x<=0){w=p;break}}C.splice(C.indexOf(w),1);ev+=promoteP(w)||"";if(C.length)S.seatLost=(S.seatLost||[]).concat(C.includes(S)?[`${RANKS[r].n}: ${NM(w)}`]:[])}}return ev}
/* DEMOTION REVIEW: Sủng under the rank's floor for two months, or a conviction, drops one rank (and frees the seat) */
function sungFloor(r){return Math.max(0,RANKS[r].s-20)}
function demote(p,why){if(p===S){if(S.rank<=0)return"";S.rank=seatDown(S,S.rank-1);S.lastPromo=S.turn;const t=`<span class="r">Ngươi ${why}, bị giáng xuống ${RANKS[S.rank].n}.</span>`;log(t);return t}
 if(p.queen){fall(p,why);return""}if(p.rank<=0)return"";p.rank=seatDown(p,p.rank-1);p.lastPromo=S.turn;const t=`${p.name} ${why}, bị giáng xuống ${RANKS[p.rank].n}.`;log(t);newsAdd(p,"demote",t,true);return t}
function demoteReview(){let ev="";for(const p of consorts()){const r=rkOf(p);if(r<=0||r>=7||p.out)continue;if(p.sung<sungFloor(r))p.lowS=(p.lowS||0)+1;else p.lowS=0;
  if(p.lowS>=2){p.lowS=0;ev+=demote(p,`lâu không được sủng (Sủng ${p.sung} dưới mức ${sungFloor(r)} của ${RANKS[r].n} hai tháng)`)}
  if((p.sick||0)>0){p.sick--;ap(p,{sung:-4});if(p.sick===0&&p.suc<35)ev+=demote(p,"bệnh lâu không hầu được")}}return ev}
/* PUSH-DOWN ROADS: same odds and costs for everyone; each priced, each can be exposed */
function odT(a,base){return cl(Math.round(base+(a.tamco||0)/4),5,95)}
function hasScandal(t){return t===S?(S.men||[]).some(m=>m.trysts>0):!!t.scandal}
function realCrime(t){const own=e=>!((e.by&&e.by!==key(t))||e.gh);const w=(t.inv||[]).some(e=>e.w&&IT[e.k]&&IT[e.k].rk>rkOf(t));const il=(t.inv||[]).some(e=>own(e)&&(e.t||(IT[e.k]&&IT[e.k].il)));return w?"vượt phẩm (mặc đồ quá phẩm)":il?"giấu đồ cấm":t.schemes>0?"từng bày mưu hại người":""}
A("lygian","Ly gián",{c:{bac:-20},ok:(a,t)=>a.bac>=20&&rkOf(t)>=1,o:(a,t)=>odT(a,45-(t.duc||0)/6),x:"thành: nàng Sủng -10 · hỏng: bị lộ, Sủng ngươi -4",f:(a,t)=>{ap(a,{bac:-20});a.schemes=(a.schemes||0)+1;if(roll(odT(a,45-(t.duc||0)/6))){ap(t,{sung:-10});return `${NMc(a)} tung lời ly gián, ${NM(t)} bị Hoàng thượng lạnh nhạt (Sủng -10). `}const c=caught(a,t,false,"ly gián");if(c)return c;ap(a,{sung:-4});return `Lời ly gián của ${NM(a)} không ai tin. `}});
A("slowpoison","Hạ độc dần",{c:{bac:-40},ok:(a,t)=>a.bac>=40,o:(a,t)=>odT(a,35),x:"thành: nàng Sức -25, ốm 3 tháng (Sủng -4 mỗi tháng; ốm lâu bị giáng) · hỏng: dễ lộ, chứng cứ về tay nàng",f:(a,t)=>{ap(a,{bac:-40});a.schemes=(a.schemes||0)+1;if(roll(odT(a,35))){if(t===S&&(S.doctor||S.inv.some(e=>e.k==="giaidoc"))&&roll(60))return "Thuốc bổ có vị lạ; thái y kịp phát hiện độc dược ngấm dần. ";ap(t,{suc:-25});t.sick=3;return `${NM(t)} ngấm độc dần, người gầy rộc (Sức -25, ốm 3 tháng). `}const c=caught(a,t,true,"hạ độc dần");if(c)return c;return "Bát thuốc bị đổ đi, mưu không thành. "}});
A("tocao","Tố tội thật",{c:{},ok:(a,t)=>!!realCrime(t)&&evG(a,t)>=1,o:(a,t)=>odT(a,50+evG(a,t)*10),x:"cần 1 chứng cứ và nàng có tội thật · thành: nàng bị giáng một phẩm · hỏng: Danh -5",f:(a,t)=>{const o=odT(a,50+evG(a,t)*10);const cr=realCrime(t);evA(a,t,-1);if(roll(o)){ap(a,{danh:3});return `${NMc(a)} tố ${NM(t)} tội ${cr}: chứng cứ rõ ràng. `+demote(t,`bị tố ${cr}`)}ap(a,{danh:-5});return `${NMc(a)} tố ${NM(t)} nhưng không đủ chứng, bị chê nhiều chuyện (Danh -5). `}});
A("expose","Bóc chuyện tư tình",{c:{},ok:(a,t)=>hasScandal(t)&&evG(a,t)>=2,o:(a,t)=>odT(a,45+evG(a,t)*8),x:"cần 2 chứng cứ · thành: nàng bị ban chết hoặc vào lãnh cung · hỏng: ngươi bị tội vu khống",f:(a,t)=>{const o=odT(a,45+evG(a,t)*8);evA(a,t,-99);if(roll(o)){if(t===S){if(roll(50))return over("Tư thông bị phát giác","Chuyện tư tình bị phơi bày trước Hoàng thượng. Ngươi bị ban chết.","Ban chết: tư thông bại lộ")||"";cold("Ngươi tư thông bị phát giác");return "Chuyện tư tình bại lộ. "}if(roll(50)){t.alive=false;log(`${t.name} tư thông bị phát giác, bị ban chết.`);return `${t.name} tư thông bị phát giác, bị ban chết. `}fall(t,"tư thông bị phát giác");return ""}fall(a,"vu khống người khác tư thông");return ""}});
A("xinhh","Xin Hoàng hậu giáng",{c:{bac:-30},ok:(a,t)=>{const q=queenP();return a.bac>=30&&q&&q!==a&&q!==t&&aff(q,a)>=40&&rkOf(t)>=1},o:(a,t)=>{const q=queenP();return q?cl(30+aff(q,a)/2-aff(q,t)/2,5,95):5},x:"cần Hoàng hậu thiện cảm 40+ · thành: nàng bị giáng một phẩm · hỏng: Hoàng hậu thiện cảm -10",f:(a,t)=>{ap(a,{bac:-30});const q=queenP();const o=cl(30+aff(q,a)/2-aff(q,t)/2,5,95);if(roll(o))return `Hoàng hậu nghe lời ${NM(a)}, tâu xin giáng ${NM(t)}. `+demote(t,"bị Hoàng hậu tâu giáng");affAdd(q,a,-10);return `Hoàng hậu gạt lời ${NM(a)} đi. `}});
/* the menus: her card groups and the NPC harm bands read the new roads */
(function(){const gi=RVGRP.findIndex(g=>g[0]==="Hại nặng");if(gi>=0)RVGRP[gi][1].push("lygian","tocao","xinhh");const gs=RVGRP.findIndex(g=>g[0]==="Sát hại");if(gs>=0)RVGRP[gs][1].push("slowpoison","expose");BANDS[2][2].push("lygian","tocao","xinhh");BANDS[3][2].push("slowpoison","expose")})();
(function(){const n0=npcAct;npcAct=function(v,t){/* rivals weigh the new roads by trait, more against the holder of the seat they want next */
  const nx=rkOf(v)+1;const want=rkOf(t)===nx&&SEATCAP[nx]!=null&&!seatFree(nx);if(want&&roll(45)){const L=["lygian","tocao","xinhh","slowpoison","expose"].filter(k=>{const b=bandOf(danger(v,t));return BANDS.slice(1,b+1).some(x=>x[2].includes(k))&&ACT[k].ok(v,t)});
   if(L.length){const w=L.map(k=>persW(v,k==="slowpoison"?"poison":k==="lygian"?"rumor":k==="xinhh"?"ally":"accuse"));let r=Math.random()*w.reduce((a,b)=>a+b),i=0;while(r>w[i]&&i<w.length-1){r-=w[i];i++}persCount(v,"push:"+L[i]);return runAct(v,t,L[i])}}
  return n0.apply(this,arguments)}})();
/* rivals hunt the holder of the seat they want next */
(function(){const h0=hostility;hostility=function(v,t){let h=h0.apply(this,arguments);const nx=rkOf(v)+1;if(rkOf(t)===nx&&SEATCAP[nx]!=null&&!seatFree(nx))h+=15;return h}})();
/* some rivals keep a hidden scandal (a guard, a doctor): the same road can be used against them */
(function(){const n0=newRival;newRival=function(){const v=n0.apply(this,arguments);if(v.scandal==null)v.scandal=roll(10);return v}})();
/* monthly: demotion review, then seats filled by weighing */
(function(){const e0=endTurn;endTurn=function(){const t0=S&&S.turn;const r=e0.apply(this,arguments);try{if(S&&!S.dead&&S.turn!==t0){const a=demoteReview();const b=fillSeats();palFix&&palFix()}}catch(e){}return r}})();
/* the rank board: seats used / total and who holds them */
(function(){const r0=rankBoard;rankBoard=function(){let h=r0.apply(this,arguments);const rows=kitRows([7,6,5,4,3].map(r=>{const H=holders(r);const cap=SEATCAP[r];return [`${r>=7?"Hoàng hậu":RANKS[r].n} ${H.length}/${cap}`,`${H.map(p=>mdH(p===S?pMe():pv(p),"xs")).join("")}${H.length<cap?' <span class="ef g">còn ghế</span>':""}`||"-","t"]}).concat([["Quý nhân, Thường tại, Đáp ứng","không giới hạn","n"]]));
 return h.replace('<div class="rboard">',`<div class="rboard"><h3>Ghế theo phẩm</h3>${rows}`)}})();
/* her requirement list shows 'Đủ điều kiện · chờ ghế trống' with the holders' faces */
function seatWait(){const r=S.rank;if(r>=6||SEATCAP[r+1]==null||seatFree(r+1))return"";const rest=promoReqP(S).filter(x=>!x[0]&&!/Chờ ghế/.test(x[1]));if(rest.length)return"";return `<div class="rl"><span class="ef n">Đủ điều kiện · chờ ghế trống (${seatTxt(r+1)})</span> ${holders(r+1).map(p=>mdH(pv(p),"xs")).join("")}</div>`}
(function(){const r0=rankBoard;rankBoard=function(){const h=r0.apply(this,arguments);const w=seatWait();return w?h.replace('<h3>Ghế theo phẩm</h3>',`${w}<h3>Ghế theo phẩm</h3>`):h}})();
