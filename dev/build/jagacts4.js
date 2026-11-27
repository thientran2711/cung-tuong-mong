/* ================= jagacts4: ROLE PARITY part 2 — the NPC side of the player buttons the role-parity scan found one-sided =================
   (owner OD 18/11 ~21:30Z: what NPCs of a role can do, she can do in that role, and the reverse; law 1 two-way, law 4 one core, law 6 real world).
   Scan + table: dev/tools/role-parity-scan.js, dev/handover/reports/role-parity.md § PART 2. ONE FUNCTION each: the card is built ONCE by the
   player's own builder and an NPC consort runs that same card (p4Run):
     kid care       j25  kidCareOk/kidCareDo, kidGuardOk/kidGuardDo  ← «Chăm sóc», «Canh giữ các con» (the guard now shields ANY mother's children)
     cycle forgery  jcycle cyHideCards(p)                            ← «Sửa sổ nguyệt sự», «Dặn ma ma báo ngày giả» (an NPC hides only this way)
     rouge          jration lxBorrowCard / lxBegCard / lxStealCard   ← «Mượn / Xin / Lấy trộm son phấn» (were flat monthly rolls; asking HER = her card)
     đồ cấm         j83  IROUTE + illBuy                              ← «Sai cung nữ thân tín mua lén ngoài cung» and the 3 other routes (was a monthly roll)
     a man          j22  manCards(p,m,place) + tryst                  ← «Chào hỏi đúng lễ», «Liếc mắt đưa tình», «Trao khăn tay», «Hẹn gặp riêng», «Cắt đứt»
   Utility agcU (needs × odds), mindPick inside the day plan. Numbers: the player's rows; worth / gates BAL.ag.par4 (jbal2 end). HOST ONLY like every agReg provider.
   ===================================================================================================================== */
const AG4={stat:{opt:0,land:0,by:{}}};
function p4On(){try{return !!(agOn()&&BAL.ag.par4&&BAL.ag.par4.on)}catch(e){return false}}
const AGC4BTN={kidCare:"Chăm sóc",kidGuard:"Canh giữ các con",cycFix:"Sửa sổ nguyệt sự",cycMama:"Dặn ma ma báo ngày giả",rougeBorrow:"Mượn son phấn",rougeBeg:"Xin son phấn",rougeSteal:"Lấy trộm son phấn",
 illMaid:"Sai cung nữ thân tín mua lén ngoài cung",illThaiy:"Hối lộ người ở Thái y viện",illCho:"Chợ đen ở cửa Thần Vũ",illAlly:"Xin đồng minh",
 manHail:"Chào hỏi đúng lễ",manFlirt:"Liếc mắt đưa tình",manToken:"Trao khăn tay",manTryst:"Hẹn gặp riêng",manCut:"Cắt đứt"};
const AGC4ACT={kidCare:"chăm sóc con",kidGuard:"cắt người canh giữ các con",cycFix:"đút lót Kính sự phòng sửa sổ nguyệt sự",cycMama:"dặn ma ma báo ngày giả",rougeBorrow:"sang mượn son phấn",rougeBeg:"xin son phấn",
 rougeSteal:"lén lấy son phấn",illMaid:"sai cung nữ lén mua đồ ngoài cung",illThaiy:"hối lộ người ở Thái y viện",illCho:"ra chợ đen ở cửa Thần Vũ",illAlly:"xin đồng minh một món đồ",
 manHail:"chào hỏi một nam nhân",manFlirt:"liếc mắt đưa tình",manToken:"trao khăn tay",manTryst:"hẹn gặp riêng",manCut:"cắt đứt tư tình"};
const IR4={maid:"illMaid",thaiy:"illThaiy",cho:"illCho",ally:"illAlly"};
function p4Res(k,r){AG4.stat.land++;AG4.stat.by[k]=(AG4.stat.by[k]||0)+1;return r?String(r).replace(/<[^>]+>/g,"").replace(/\.\s*$/,"").trim():""}
/* run the player's card for an NPC: a card that rolls inside its own run (talk cards, tryst, illBuy) pays its cost and runs once (no double roll);
   any other card goes through p3Run (cost → odds of the doer → gain / loss → go / fail), the order of her runOpt */
function p4Run(v,C,k){if(!C||C.lock)return"";if(C.run){if(!agcCan(v,C.c||{}))return"";agcPay(v,C.c||{});let r="";try{r=C.run()||""}catch(e){agdErr("par4:"+k,e)}return p4Res(k,r||`${v.name} ${AGC4ACT[k]}`)}
 const r=p3Run(v,C,k);AG4.stat.by[k]=(AG4.stat.by[k]||0)+1;return r}
function p4O(v,k,C,N,g,tag,at,t){if(!C||C.lock||!agcCan(v,C.c||{}))return null;const o=C.o==null?100:C.o;const u=agcU(v,N,o,g,C.c||{},tag);if(!(u>0))return null;AG4.stat.opt++;
 return{k:"cx4:"+k,t:t||null,u,tag,act:AGC4ACT[k],kc:p3Kc(C),at:at||((kh,vv)=>palaceOf(vv||v))}}
/* the pick rules, shared by the provider and the runner (the runner re-picks at run time, so a save between plan and deed needs no ids) */
function p4SickKid(v){return kidsOf(v).filter(k=>kidCareOk(v,k)).sort((a,b)=>a.hp-b.hp)[0]||null}
function p4Lender(v){const M=lxMiss(v);return consorts().filter(x=>x&&x!==v&&!x.out&&x.alive!==false&&!x.coop&&M.some(part=>lxLend(x,part))).sort((a,b)=>aff(b,v)-aff(a,v))[0]||null}
function p4BegKind(v){const q=typeof queenP==="function"?queenP():null;if(q&&q!==v&&!v.queen&&!lxBegCd(v,"hh"))return"hh";if(!S.thDead&&!lxBegCd(v,"th"))return"th";return null}
function p4StealT(v){const L=consorts().filter(x=>x&&x!==v&&!x.out&&x.alive!==false&&!x.coop&&!sameHouse(v,x)&&BAL.ration.parts.some(part=>lxLend(x,part)));return L.length?mindPickBy(L,x=>BAL.mind.pickMin+agSpite(v,x),v):null}
function p4Man(v){const L=(S.men||[]).filter(m=>m&&m.alive&&(S.menW||{})[m.id]);if(!L.length)return null;return L.slice().sort((a,b)=>mTinh(b,v)-mTinh(a,v))[0]}
function p4IllK(v,r){const R0=IROUTE[r],W=BAL.ag.par4.ill.w;let ks=R0.ks;if(r==="ally"){const A=illAllies(v);ks=ks.filter(k=>A.some(a=>a.inv.some(e=>e.k===k&&!e.h&&!e.t)))}
 else ks=ks.filter(k=>(v.bac||0)>=R0.cost(k)+BAL.ag.par4.ill.keep);return ks.length?mindPickBy(ks,k=>W[k]||1,v):null}
function p4HasIll(v){return (v.inv||[]).some(e=>e&&WILL[e.k])||(v.illP||[]).length>0}/* a poison in her chest or on its way (the maid route brings it next tuần) */
function p4IllCard(v,r,k){const R0=IROUTE[r];return{n:R0.n,c:{},o:r==="ally"?100:R0.o(v),k:R0.k,run:()=>illBuy(v,r,k)}}
/* ---------------- the consort provider ---------------- */
agReg("consort","par4",(v,N,need)=>{const O=[];if(!p4On()||v===S||v.out||!v.alive||v.coop)return O;const X=BAL.ag.par4;const P=x=>x&&O.push(x);const nd=g=>!need||g[need]!=null;
 try{
  /* kid care / guard (j25) */
  if(nd(X.kidCare.g)){const k=p4SickKid(v);if(k)P(p4O(v,"kidCare",{n:AGC4BTN.kidCare,c:{bac:-BAL.bacFee.kidCare},o:100,k:BAL.btn.kidCare.k},N,X.kidCare.g,"help"))}
  if(nd(X.kidGuard.g)&&kidGuardOk(v)&&others(v).some(t=>t&&t!==v&&hostility(t,v)>=netTh(t,"host")))P(p4O(v,"kidGuard",{n:AGC4BTN.kidGuard,c:{bac:-BAL.bacFee.kidGuard},o:100,k:BAL.btn.kidGuard.k},N,X.kidGuard.g,"safe"));
  /* cycle forgeries (jcycle) */
  if(nd(X.cyc.g)&&!v.confined){const L=cyHideCards(v);if(L[0])P(p4O(v,"cycFix",L[0],N,X.cyc.g,"scheme",()=>"ksp"));if(L[1])P(p4O(v,"cycMama",L[1],N,X.cyc.g,"scheme"))}
  /* rouge (jration) */
  if(typeof lxOn==="function"&&lxOn()&&!v.confined&&lxMiss(v).length){
   if(nd(X.rouge.g)){const l=p4Lender(v);if(l)P(p4O(v,"rougeBorrow",lxBorrowCard(v,l),N,X.rouge.g,"ally",(kh,vv)=>palaceOf(l),l));
    const kd=p4BegKind(v);if(kd)P(p4O(v,"rougeBeg",lxBegCard(v,kd),N,X.rouge.g,"self",kd==="th"?()=>"tn":(kh,vv)=>palaceOf(queenP())))}
   if(nd(X.rouge.steal.g)){const t=p4StealT(v);if(t)P(p4O(v,"rougeSteal",lxStealCard(v,t),N,X.rouge.steal.g,"scheme",(kh,vv)=>palaceOf(t),t))}}
  /* đồ cấm (j83): a malicious consort with no poison in her chest, someone to hate, a route open to her */
  if(nd(X.ill.g)&&(v.malice||0)>X.ill.malice&&!p4HasIll(v)&&others(v).some(t=>t&&t!==v&&agSpite(v,t)>0))
   for(const r in IR4){const R0=IROUTE[r];if(R0.need(v))continue;const k=p4IllK(v,r);if(!k)continue;P(p4O(v,IR4[r],p4IllCard(v,r,k),N,X.ill.g,"scheme",r==="cho"?()=>"thu":r==="thaiy"?()=>"tyv":null))}
  /* a man (j22): a neglected consort's road; «Cắt đứt» when the road grows too dangerous */
  if(!v.confined){const m=p4Man(v);if(m){const pl=S.menW[m.id];const L=manCards(v,m,pl);const risk=lộRisk(pl,v);const G=X.man.g;
   for(const C of L){const s=C.id4.slice(3).toLowerCase();if(s==="cut"){if(risk>=X.man.cutRisk&&nd(G.cut))P(p4O(v,"manCut",C,N,G.cut,"safe",()=>pl));continue}
    if((v.sung||0)<X.man.sungBelow&&G[s]&&nd(G[s]))P(p4O(v,C.id4,C,N,G[s],"self",()=>pl))}}}
 }catch(e){agdErr("par4",e)}return O});
/* ---------------- the runners: the same card, re-picked at run time ---------------- */
agRunReg("cx4:kidCare",v=>{const k=p4SickKid(v);if(!k)return"";kidCareDo(v,k);return p4Res("kidCare",`${v.name} chăm sóc ${k.name}`)});
agRunReg("cx4:kidGuard",v=>{if(!kidGuardOk(v))return"";kidGuardDo(v);return p4Res("kidGuard",`${v.name} cắt người canh giữ các con`)});
agRunReg("cx4:cycFix",v=>p4Run(v,cyHideCards(v)[0],"cycFix"));
agRunReg("cx4:cycMama",v=>p4Run(v,cyHideCards(v)[1],"cycMama"));
agRunReg("cx4:rougeBorrow",v=>{const l=lxMiss(v).length&&p4Lender(v);return l?p4Run(v,lxBorrowCard(v,l),"rougeBorrow"):""});
agRunReg("cx4:rougeBeg",v=>{const kd=lxMiss(v).length&&p4BegKind(v);return kd?p4Run(v,lxBegCard(v,kd),"rougeBeg"):""});
agRunReg("cx4:rougeSteal",v=>{const t=lxMiss(v).length&&p4StealT(v);return t?p4Run(v,lxStealCard(v,t),"rougeSteal"):""});
for(const r in IR4)agRunReg("cx4:"+IR4[r],v=>{if(IROUTE[r].need(v)||p4HasIll(v))return"";const k=p4IllK(v,r);return k?p4Run(v,p4IllCard(v,r,k),IR4[r]):""});
for(const s of ["manHail","manFlirt","manToken","manTryst","manCut"])agRunReg("cx4:"+s,v=>{const m=p4Man(v);if(!m)return"";const C=manCards(v,m,S.menW[m.id]).find(c=>c.id4===s);return C?p4Run(v,C,s):""});
window.AGC4BTN=AGC4BTN;
