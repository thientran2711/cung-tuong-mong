/* ================= jcq: CUNG QUY — ONE RANK-ETIQUETTE RULE FOR EVERY ACT (owner OD 26/11 ~06:50Z item (C); FOREMAN D order 07:10Z) =================
   Research first (law 8): dev/handover/reports/cung-quy-expert.md §G (handover branch) — the rule table this file follows.
   ONE function cqRule(a,t,k): does deed k by a toward t break palace etiquette? ONE table BAL.cq (law 4). The SAME rule for her → NPC, NPC → her,
   NPC ↔ NPC (law 1). Classes (BAL.cq.k):
   - up     only toward a higher rank (thỉnh an, nương theo: gap BAL.cq.gap[k]);       never breached
   - down   only toward an equal / lower rank (khiêu khích, hắt trà …);                   breach UPWARD = «dĩ hạ phạm thượng»
   - downNB same, no breach (hạ nhục needs standing)
   - high   only toward a strictly lower rank (tát);                                     breach toward an EQUAL = «vượt phận»
   - auth   needs authority (cqAuth: throne, Hoàng hậu, hiệp lý, chủ vị of her palace, own servants, BAL.cq.auth.gap ranks); breach without it, never upward = «vượt quyền»
   - take   strictly higher and the mother below BAL.cq.take.max (xin bế con)
   - accuse never blocked except the Hoàng hậu needs rank BAL.cq.accQ; a FAILED charge against a higher rank = «vu cáo bề trên» (breach consequence)
   Every key not listed is "free" (secret schemes, kindness, self acts): the scan dev/test/cung-quy-scan.js lists them all.
   A breach happens only as a DELIBERATE act: her own choice (her option text warns her), or a bold NPC (BAL.cq.bold: nết + Sủng, cool-down = the
   jemoact Phạm thượng cool-down BAL.ea.pick.phamCd). Its consequence (cqBreach): the target's oán, the doer's Danh, cấm túc on a roll of the same
   BAL.ea.pick.phamP as jemoact's Phạm thượng (one Phạm thượng rule). Any other act that breaks the rule does not happen (the gates below).
   GATES (one rule, every NPC act generator): agOptsG (the agent's options of every group), agLand0 (an agent deed landing), runAct (every ACT deed),
   twDo (every two-way deed), motiveOK (the j95 motive gate: legacy callers, the «người tìm đến» visitor), talkOpts (her own talk options).
   Co-op: NPC deeds run on the host only (agOn); her own deeds run where she plays — the same functions.
   CQN = the robot counter (dev/measure/cung-quy-rate.js): landed acts by NPCs that break the rule (bad), deliberate breaches (br), blocked (blk).
   BAL.cq.on = 0 switches the gates off (measure only); the rule itself (cqOK in ok/req of tat, phatquy, humil, follow, takeaway, accuse) always holds. */
/* BAL.cq (the one table) lives in jbal2.js */
const CQN={bad:{},br:{},blk:{},n:0};window.CQN=CQN;const CQ={d:0};
function cqCls(k){if(k==null)return null;k=String(k).replace(/^ag_/,"");k=BAL.cq.alias[k]||k;const K=BAL.cq.k;for(const c in K)if(K[c].includes(k))return c;return null}
function cqThrone(p){try{return p==="emp"||p==="th"||(S&&(p===S.emp||p===S.thO))||!!(p&&(p.kind==="emp"||p.kind==="th"))}catch(e){return false}}
/* one rank scale for every person (research §0) */
function cqR(p){const X=BAL.cq.r;if(!p)return null;if(p==="emp"||(S&&p===S.emp)||p.kind==="emp")return X.emp;if(p==="th"||(S&&p===S.thO)||p.kind==="th")return X.th;
 if(p===S){if(typeof isSrv==="function"&&isSrv())return X.srv;if(S.out)return X.cold;return rkOf(S)}
 if(typeof p==="object"&&p.rel!=null&&p.rank!=null)return p.out?X.cold:rkOf(p);return X.srv}
function cqQueen(p){return p===S?S.rank>=7&&!S.out:!!(p&&p.queen)}
/* authority to discipline (research §2, §3): throne; Hoàng hậu over all; hiệp lý; chủ vị over a lower one of her own palace; a mistress over her servants; a wide rank gap */
function cqAuth(a,t){try{if(!a||!t||a===t)return false;const A=cqR(a),T=cqR(t);if(A==null||T==null||A<=T)return false;if(A>=BAL.cq.r.th||cqQueen(a))return true;
 if(A>=BAL.cq.auth.hiep&&!(typeof queenP==="function"&&queenP()))return true;
 if(T>=0&&A>=PAL_HEAD&&typeof sameHouse==="function"&&sameHouse(a,t))return true;
 if(T===BAL.cq.r.srv&&typeof ownerOf==="function"){try{if(ownerOf(t)===a)return true}catch(e){}}
 return A-T>=BAL.cq.auth.gap}catch(e){return false}}
/* the rule: null = proper (or not a rank matter); else {k, cls, br: a deliberate breach is possible, w: the word} */
function cqRule(a,t,k){const cls=cqCls(k);/* a deed whose real target is fixed (hầu Thái hậu, thỉnh an Hoàng hậu), whatever person the caller passed */if(k==="thTH")t="th";else if(k==="thHH"&&typeof queenP==="function")t=queenP()||t;if(!cls||!a||!t||a===t)return null;if(cqThrone(a))return null;const A=cqR(a),T=cqR(t);if(A==null||T==null)return null;
 const B=BAL.cq;let ok=true,br=false,w="";
 if(cls==="up"){ok=T-A>=((B.gap[k]!=null)?B.gap[k]:1)||(A===B.r.srv&&T>=A)/* cung nhân greet each other */;w="sai lễ"}
 else if(cls==="down"||cls==="downNB"){ok=A>=T;br=cls==="down";w="dĩ hạ phạm thượng"}
 else if(cls==="high"){ok=A>T;br=A===T;w="vượt phận"}
 else if(cls==="auth"){ok=cqAuth(a,t);br=!ok&&A>=T;w="vượt quyền"}
 else if(cls==="take"){ok=A>T&&T<B.take.max;w="vượt phận"}
 else if(cls==="accuse"){ok=!(cqQueen(t)&&A<B.accQ);w="vu cáo bề trên"}
 return ok?null:{k,cls,br,w}}
function cqBold(a){if(a===S)return true;try{const B=BAL.cq.bold;if(!B.traits.some(x=>hasT(a,x)))return false;if((a.sung||0)<B.sung)return false;return !(a.cqB!=null&&wk()-a.cqB<BAL.ea.pick.phamCd)}catch(e){return false}}
/* may a do k to t? (proper, or a deliberate breach she chooses / a bold NPC dares) — read by every ok / req / gate */
function cqOK(a,t,k){const r=cqRule(a,t,k);return !r||(r.br&&cqBold(a))}
/* her option text: the warning of a breach (cổ trang, VANPHONG) */
function cqWarn(a,t,k){const r=cqRule(a,t,k);return r&&r.br?`trái cung quy (${r.w}): nàng oán ${balSg(BAL.cq.fx.oan)}, Danh ngươi ${balSg(-BAL.cq.fx.danh)}, bị cấm túc: ${oddsWord(BAL.ea.pick.phamP)}`:""}
function oddsWord(p){try{return typeof word==="function"?word(oddsCl(p)):"có thể"}catch(e){return"có thể"}}
function cqPer(p){return p&&(p===S||(typeof p==="object"&&p.rel!=null))}
function cqNm(t){if(t===S)return"ngươi";if(cqQueen(t))return"Hoàng hậu";try{/* name-mask (j61): an unmet consort is «một vị <tước> chưa quen biết», as j78who */if(typeof kitKnownName==="function"&&typeof k61Mask==="function"&&t&&t.rank!=null&&!kitKnownName(t))return k61Mask(t,"",true)}catch(e){}return NM(t)}
/* the consequence of a deliberate breach (one rule; research §3 以下犯上 / 惇妃 1778: favour softens, never cancels) */
function cqBreach(a,t,r){try{if(!r||!cqPer(a))return"";const F=BAL.cq.fx;a.cqB=wk();if(cqPer(t))oanAdd(t,a,F.oan);if(a===S)apply({danh:-F.danh});else ap(a,{danh:-F.danh});
 const pun=roll(BAL.ea.pick.phamP);if(pun)punish(a,`${r.w} với ${cqNm(t)}`,1);
 const up=x=>x.replace(/^./,c=>c.toUpperCase()),na=cqNm(a),nt=cqNm(t);const txt=`Trái cung quy: ${r.cls==="accuse"?`${na} vu cáo ${nt}, bậc trên mình`:`${na} ${r.w} với ${nt}`}. ${cqPer(t)?`${up(nt)} oán ${balSg(F.oan)}, `:""}Danh ${/^một vị/.test(na)?"người ấy":na} ${balSg(-F.danh)}${pun?", bị cấm túc":""}. `;
 if(a!==S){CQN.br[r.k]=(CQN.br[r.k]||0)+1;if(t===S){try{Q.push({t:"Phạm thượng",who:pv(a),h:`<p>${txt}</p>`})}catch(e){}}else try{newsAdd(a,"cq",txt.trim(),false)}catch(e){}}
 return txt}catch(e){console.error("jcq",e);return""}}
function cqCount(a,t,k,res){if(a===S||!res)return;const r=cqRule(a,t,k);CQN.n++;if(r&&!(r.br&&a.cqB===wk()))CQN.bad[r.k]=(CQN.bad[r.k]||0)+1}
/* the wrapper of one act runner: gate (on), deed, breach consequence (outermost wrapper only: CQ.d) */
function cqRun(a,t,k,f,blkTxt){if(CQ.d>0)return f();const r=cqRule(a,t,k),on=BAL.cq.on;
 if(on&&r&&!(r.br&&cqBold(a))&&!(r.cls==="accuse"&&!cqQueen(t))){if(a!==S)CQN.blk[r.k]=(CQN.blk[r.k]||0)+1;return a===S?(blkTxt||""):""}
 const acc=cqCls(k)==="accuse",pst=p=>p&&typeof p==="object"?[p.confined||0,cqR(p),!!p.out,p.alive!==false,!!(S&&S.dead)].join():"";const st0=acc?pst(a):"";if(acc)CQ.af=null;
 CQ.d++;let res;try{res=f()}finally{CQ.d--}
 try{if(on&&res){if(r&&r.cls!=="accuse"){const b=cqBreach(a,t,r);if(b)res=cqEnd(res)+b}
  /* a FAILED open charge against a higher rank (the act marks its own fail branch: cqAccFail) = «vu cáo bề trên»; not when the act already punished the accuser itself (expose → fall) */
  else if(acc&&CQ.af&&CQ.af.a===a&&CQ.af.t===t&&!cqQueen(t)&&cqR(a)<cqR(t)&&pst(a)===st0)res=cqEnd(res)+cqBreach(a,t,{k,cls:"accuse",br:1,w:"vu cáo bề trên"})}
  cqCount(a,t,k,res)}catch(e){console.error("jcq",e)}return res}
/* the fail branch of every open charge (accuse, vp, xx, tocao, expose, xinhh, trinhth, trinhhh) calls this: the structured fail signal */
function cqAccFail(a,t){CQ.af={a,t}}
function cqEnd(x){x=String(x).replace(/\s+$/,"");return /[.!?]$/.test(x.replace(/<[^>]+>$/,""))?x+" ":x+". "}
const CQ_NO="Theo cung quy, ngươi không thể làm việc này với nàng. ";
(function(){
 /* (1) every ACT deed (her rv buttons, an NPC's harm menu, the agent's ACT deeds) */
 if(typeof runAct==="function"){const r0=runAct;runAct=function(a,t,k){const A=arguments,me=this;return cqRun(a,t,k,()=>r0.apply(me,A),CQ_NO)}}
 /* (2) every two-way deed */
 if(typeof twDo==="function"){const d0=twDo;twDo=function(a,t,k){const A=arguments,me=this;return cqRun(a,t,k,()=>d0.apply(me,A),CQ_NO)};window.twDo=twDo}
 /* (3) the agent: options of every group (planning) and the landing of a planned deed */
 if(typeof agOptsG==="function"){const o0=agOptsG;agOptsG=function(p){const O=o0.apply(this,arguments);if(!BAL.cq.on||!Array.isArray(O))return O;try{return O.filter(o=>{const t=o.t||(o.k==="thHH"&&typeof queenP==="function"?queenP():null);if(!t||cqOK(p,t,o.k))return true;CQN.blk["plan:"+o.k]=(CQN.blk["plan:"+o.k]||0)+1;return false})}catch(e){return O}}}
 if(typeof agLand0==="function"){const l0=agLand0;agLand0=function(p){const A=arguments,me=this;let v=null,t=null;try{v=p.vid!=null?RV(p.vid):(typeof agDoer==="function"?agDoer(p):null);t=p.k==="thHH"?queenP():(typeof agTgt==="function"?agTgt(p.t):agPerson(p.t))}catch(e){}
  if(!v||!t)return l0.apply(me,A);return cqRun(v,t,p.k,()=>l0.apply(me,A))}}
 /* (4) the j95 motive gate (legacy NPC callers, the «người tìm đến» visitor): a rank breach is no motive unless the doer dares */
 if(typeof motiveOK==="function"){const m0=motiveOK;motiveOK=function(a,t,kind){const g=m0.apply(this,arguments);try{if(!BAL.cq.on||!g||!g.ok||!a||a===S)return g;const r=cqRule(a,t,kind);if(r&&!(r.br&&cqBold(a)))return{ok:false,why:`trái cung quy (${r.w})`}}catch(e){}return g}}
 /* the visitor who comes to mock her (j24 approachOne): a bold one breaching upward pays the breach */
 if(typeof approachOne==="function"){const a0=approachOne;approachOne=function(){const m=a0.apply(this,arguments);try{if(!m||!BAL.cq.on)return m;const txt=String(m.h||"");if(!/mỉa mai|gây sự|hạch/.test(txt))return m;
   const v=liveRivals(true).find(x=>txt.includes(x.name));if(!v)return m;const r=cqRule(v,S,"provoke");if(!r)return m;if(!cqBold(v)){CQN.blk.visit=(CQN.blk.visit||0)+1;return null}
   const b=cqBreach(v,S,r);if(b)m.h=txt+`<p>${b}</p>`}catch(e){console.error("jcq",e)}return m}}
 /* (5) her own talk options: «Khiêu khích» / «Trút giận» toward a higher rank = a breach she chooses, warned in the row, paid when done */
 if(typeof talkOpts==="function"){const t0=talkOpts;talkOpts=function(p){const L=t0.apply(this,arguments);try{if(!Array.isArray(L)||!p)return L;
   const tg=(p.kind==="hh"||p.kind==="rival")?p.ref:null;if(!tg||tg===S)return L;
   const OPK={"Khiêu khích":"provoke","Trút giận":"cx2:vent"};
   for(const o of L){const k=OPK[o.n];if(!k)continue;const r=cqRule(S,tg,k);if(!r)continue;const w=cqWarn(S,tg,k);if(w)o.x=(o.x?o.x+"; ":"")+w;
    const g=o.go;o.go=function(){const res=g?g.apply(this,arguments):undefined;try{if(BAL.cq.on){const b=cqBreach(S,tg,r);if(b)log(b)}}catch(e){}return res}}}catch(e){console.error("jcq",e)}return L}}
 /* her ACT buttons: the breach warning on the row (j6 rvButtons reads xw) */
 try{for(const k of ["tat","phatquy","batnat","nuoc","tea","ink"]){const A0=ACT[k];if(!A0)continue;const x0=A0.xw;A0.xw=(a,t)=>[x0?x0(a,t):"",cqWarn(a,t,k)].filter(Boolean).join("; ")}}catch(e){}
})();
/* gift words by rank (research §6 赏 / 孝敬): downward «ban cho», upward «kính dâng», equal «tặng» */
function cqGiftVerb(a,t){try{const A=cqR(a),T=cqR(t);return A>T?"ban cho":A<T?"kính dâng":"tặng"}catch(e){return"tặng"}}
function cqGiftLine(a,t,n){const v=cqGiftVerb(a,t),nm=t===S?"ngươi":t.name;return v==="ban cho"?`ban ${n} cho ${nm}`:v==="kính dâng"?`kính dâng ${n} lên ${nm}`:`tặng ${n} cho ${nm}`}
window.cqGiftLine=cqGiftLine;window.cqAccFail=cqAccFail;window.cqRule=cqRule;window.cqOK=cqOK;window.cqAuth=cqAuth;window.cqR=cqR;window.cqBreach=cqBreach;window.cqGiftVerb=cqGiftVerb;window.cqCls=cqCls;
