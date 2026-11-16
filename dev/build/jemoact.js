/* ================= jemoact: HÀNH ĐỘNG THEO CẢM XÚC — emotion acts, extreme mood, forced outbursts (review/emotion-acts) =================
   Owner, verbatim in dev/OWNER_DECISIONS.md (docs branch): "16/11 13:08Z" (emotion acts + extreme-mood consequences, player AND every NPC,
   men and women), "16/11 13:25Z" part B (FORCED events she does not choose; reaction fits PERSONALITY + CURRENT MOOD; scolding any maid
   allowed, beating has consequences; a maid of a HIGHER-rank mistress → that mistress comes to hỏi tội as a daily event), "16/11 13:50Z,
   s17 chat" (3) (outbursts are NOT punishments; every emotion can burst out, positive ones too; no damage-control choice after the fact:
   the way to avoid them is to keep the emotion under the threshold early).
   Reuses: jmood (her mood bar S.mood.v, bands, mbAdd), jemo (p.emo for everyone, EMO, emoGet), j28/jtrong personality (traitsOf / PERS,
   her nết S.pTr), j13 illness (catchIll: Tâm bệnh / Chứng mất ngủ), j8 punish / ap / relAdd / oanAdd, j1 ghenAll, kit act cards (deck
   cards rendered by cardH, the same object shape as j76 standing cards) and the kit event frame (Q items: ev choice / hideOut "Tiếp tục").
   No new UI part. Numbers: BAL.ea (below). Off switch for measuring: window.__eaOff=1. Counters: window.EA_N.
   1. EMOTION ACT CARDS (hers): only in the matching mood band (mbBand i ≥ 1 → vui; i ≤ −1 by the low flavour: gian → giận, so → căng
      thẳng, else buồn), at most 2: giận Đập đồ / Mắng cung nữ · buồn Khóc thầm / Viết thư nhà · vui Đàn hát tự thưởng · căng thẳng Thắp
      hương cầu an. Each has a gain AND a loss. Mắng cung nữ lets her choose the maid (kit event choice, one option per maid).
      NPCs (consorts, servants, the Emperor, Thái hậu, men, officials, children) do the same acts in the life sim when their feeling sits
      in the act band (BAL.ea.npc.actV ≤ v < outV), by their personality; gains / losses land on them; seen ones go to the news.
   2. EXTREME MOOD held ≥ BAL.ea.ext.wk tuần: buồn → Tâm bệnh · giận → lỡ lời (Danh −) · vui → tự mãn (kẻ ganh ghen hơn) · căng thẳng →
      Chứng mất ngủ. Hers: mood bar at band ±2 (|v| ≥ BAL.mood.band[3]); NPCs: p.emo.v ≥ BAL.ea.npc.extV, same group, every tuần.
   3. FORCED OUTBURSTS: past the outburst line (hers |v| ≥ out.v; NPC emo.v ≥ npc.outV) a weekly chance (by temper) that the feeling bursts
      out; the reaction is drawn from the reactions her / his PERSONALITY allows (timid: never phạm thượng, never beats anyone; hot-
      tempered: may smash, scold, beat, phạm thượng) weighted by temper; positive ones too (a generous person in high joy hands out
      silver). Hers shows as a kit event frame with only "Tiếp tục" (what happened + its real numbers). A maid of a palace whose mistress
      outranks the doer → that mistress comes to hỏi tội the next tuần (a daily event with real choices, each with gain and loss); two-way:
      a lower-rank consort who beats HER maid → she may go hỏi tội.
   Co-op: S.ea is a personal key of S; NPC (world) changes only on the host (COOPW.seat "a") or single player. ====================== */
Object.assign(BAL,{ea:{
 /* (1) her cards. mood = tâm trạng points the act moves (vent toward calm; vui: the joy settles), emo = points off the matching feeling seal,
    k = khắc; dapdo bạc + Danh; mang lòng of the scolded maid; khoc Sức; thu bạc (a eunuch carries the letter) + (gain) her family's answer
    lifts her ánh a little more; dan Tài + and the rivals hear (Ghen; an NPC's playing: oan Oán of every other consort); huong bạc and Đức (a pious deed). */
 card:{dapdo:{g:"gian",k:1,mood:14,emo:20,bac:8,danh:1},mang:{g:"gian",k:1,mood:10,emo:15,loy:6},
  khoc:{g:"buon",k:1,mood:10,emo:15,suc:5},thu:{g:"buon",k:1,mood:13,emo:15,bac:5},
  dan:{g:"vui",k:1,mood:-6,tai:1,ghen:2,oan:1},huong:{g:"so",k:1,mood:12,emo:15,bac:6,duc:1}},
 /* (2) extreme mood: wk tuần in a row, then cd tuần before the same person can be hit again. danh = lỡ lời Danh −; ghen = jealousy of
    every rival (ghenAll) at once + smugWk tuần of extra jealousy (×smugK on every ghenAll aimed at her); NPC: oan = Oán of every other
    consort toward the smug one, danh the same Danh loss; servants lose loy Lòng toward their master (a sulky / boastful servant). */
 ext:{wk:3,cd:8,danh:4,ghen:8,smugWk:4,smugK:1.5,oan:6,loy:5},
 /* (3) her outbursts: |mood v| ≥ v (inside band ±1 deep end and band ±2; measured r1: at 60 = 0.4 a 100 tuần, too rare to be felt),
    chance ch % a tuần × temper (hot / even / timid), at most one a tuần, then cd tuần of quiet. phamW = weight of Phạm thượng among a
    hot temper's angry reactions (never while cấm túc: no thỉnh an; r2 at .6: 5 in one hot life, each a cấm túc). */
 out:{v:45,ch:30,cd:2,t:{hot:1.6,even:1,timid:.6},phamW:.35},
 /* NPCs: act band actV ≤ emo.v < outV (chance actCh % a tuần), outburst emo.v ≥ outV (chance outCh % × temper), extreme emo.v ≥ extV
    (r1 at 70: 25 extremes a 100 tuần across the harem, too common for "extreme");
    meWk = most events a tuần that other people's outbursts bring to her (the rest: log lines). */
 npc:{actV:40,actCh:25,outV:70,outCh:20,extV:80,meWk:1},
 /* what each reaction does (doer = her or the NPC). vent = mood points toward calm (hers) / feeling points off (NPC); bac, suc, danh, duc,
    loy (Lòng of the maid / every servant of the palace), oan (Oán of the wronged), rel (thiện cảm), ghen (ghenAll), aff (two friends' thiện cảm). */
 fx:{dapdo:{vent:20,bac:12,danh:1},mang:{vent:15,loy:8},danh:{vent:20,loy:20,duc:3,danh:2},khac:{vent:15,oan:10,hiOan:20,punRk:2},pham:{vent:20,rel:15,danh:2},
  khoc:{vent:12,suc:8},boan:{vent:10,suc:12},thu:{vent:15,bac:6},matngu:{vent:8,suc:10},soat:{vent:12,loy:5},cau:{vent:15,bac:10},
  cham:{vent:12,rel:10,oan:8,danh:1},tui:{vent:10,suc:6},thuong:{vent:10,bac:15,loy:5},khoe:{vent:10,danh:2,ghen:6},tiec:{vent:10,bac:10,aff:4},hat:{vent:8,suc:6,tai:1},
  /* the Emperor / Thái hậu: bestow = bạc to every consort (her too); rage = Sủng of the one he is angry with; scold = Thái hậu regard (th) / an NPC's Danh;
     khac: hiOan = Oán of a higher-rank mistress whose maid an NPC scolded, punRk = ranks above the doer at which she has the doer punished */
  ban:{vent:15,bac:5},noi:{vent:20,sung:4},quo:{vent:15,th:3,danh:1},
  /* servants: quarrel (Lòng both) / cry / work with a will (Lòng +) */
  cai:{vent:15,loy:3},sk:{vent:10,loy:2},hang:{vent:8,loy:2}},
 /* hỏi tội: hitLoy = Lòng her maid loses when another consort scolds her; (a higher-rank mistress whose maid she scolded / beat): bac = the amends, danh = bowing her head, loy = her maid blamed, try =
    odds base of arguing back (+ (her rank − theirs) × rk + Danh / dn), win / lose Danh, oan = their Oán on a lost argument;
    her own maid beaten by a lower-rank consort: go = Danh + and maid Lòng +, their Oán +; let = Đức +, maid Lòng −. */
 hoi:{hitLoy:2,bac:20,danh:1,aff:3,loy:10,try:40,rk:8,dn:4,win:1,lose:3,oan:10,go:{danh:1,loy:5,oan:10},let:{duc:1,loy:5}}
}});
(function(){
const E=()=>BAL.ea;
window.EA_N={cards:{},play:{},out:{},outT:{},npcAct:{},npcOut:{},npcOutT:{},ext:{},npcExt:{},hoi:0,hoiMe:0,wk:0,outWk:0};
const eaOn=()=>!!(typeof S!=="undefined"&&S&&!S.dead&&!window.__eaOff);
const eaHost=()=>{try{const C=window.COOPW;return !(C&&C.on&&C.seat&&C.seat!=="a")}catch(e){return true}};
const W=()=>{try{return wk()}catch(e){return 0}};
const clp=(x,a,b)=>Math.max(a,Math.min(b,x));
const cnt=(o,k,n)=>{o[k]=(o[k]||0)+(n||1)};
function eaS(){if(!S.ea||typeof S.ea!=="object")S.ea={};const A=S.ea;A.used=A.used||{};A.hoi=A.hoi||[];return A}
/* ---------- temper (one rule for everyone, from the person's own nết) ---------- */
const T_HOT=["Kiêu ngạo","Thẳng thắn","Thù dai","Ghen tuông","nongnay","phong lưu"];
const T_TIMID=["Nhu mì","Hiền lành","Cả nể","nhat","nhantu","cẩn trọng","trung hậu"];
const T_GEN=["Hiền lành","Trọng nghĩa","Cả nể","Khéo léo","nhantu","datinh","trung","trung hậu","đa tình"];
const T_STINGY=["Tham tiền","tham","Tham vọng","Hiểm độc"];
function eaTraits(p){try{if(p===S)return traitsOf(S)||[];if(S.emp&&p===S.emp)return S.emp.traits||[];if(p===S.thO)return traitsOf("th")||[];if(p&&p.tr&&!p.trait)return[p.tr,p.tr2].filter(Boolean);if(p&&p.trait&&!p.rank&&p.rank!==0&&!p.kids)return[p.trait];return traitsOf(p)||[]}catch(e){return[]}}
function eaTemper(p){const T=eaTraits(p);const hot=T.some(t=>T_HOT.includes(t)),tim=T.some(t=>T_TIMID.includes(t));
 return {k:hot&&!tim?"hot":tim&&!hot?"timid":hot&&tim?"even":"even",gen:T.some(t=>T_GEN.includes(t))&&!T.some(t=>T_STINGY.includes(t)),stingy:T.some(t=>T_STINGY.includes(t)),sus:T.includes("Đa nghi")||T.includes("danghi"),pious:T.includes("Mê tín")||T.includes("Hiếu thảo"),tr:T}}
window.eaTemper=eaTemper;
/* the group of a feeling: vui · gian · buon · so (căng thẳng) · ghen (cards: buồn) */
function eaGrpK(k){return k==="vui"?"vui":k==="gian"?"gian":k==="buon"||k==="dau"?"buon":k==="so"||k==="lo"?"so":k==="ghen"?"ghen":null}
/* hers, from the mood bar: band and flavour (jmood mbBand) */
function eaMine(){try{if(typeof mbBand!=="function"||!S.mood)return{i:0,g:null};const b=mbBand();const g=b.i>=1?"vui":b.i<=-1?(b.f==="gian"?"gian":b.f==="so"?"so":b.f==="ghen"?"ghen":"buon"):null;return{i:b.i,g,b}}catch(e){return{i:0,g:null}}}
window.eaMine=eaMine;
/* ---------- small helpers ---------- */
function myMaids(){const L=[];try{if(S.maid&&S.maid.name)L.push(S.maid);for(const s of S.staff||[])if(s&&s.role==="maid"&&s!==S.maid&&s.alive!==false)L.push(s)}catch(e){}return L.slice(0,4)}
function maidOf(p){if(p===S)return myMaids();return (p&&p.staff||[]).filter(s=>s&&s.role==="maid"&&s.alive!==false)}
function staffOf(p){if(p===S){const L=(S.staff||[]).slice();if(S.maid&&!L.includes(S.maid))L.push(S.maid);return L}return (p&&p.staff)||[]}
function loyAdd(s,n){if(s)s.loyal=clp((s.loyal||0)+n,0,100)}
function nm(p){try{return p===S?"ngươi":p===S.emp?"Hoàng thượng":p===S.thO?"Thái hậu":(typeof whoOf==="function"&&p.id!=null?whoOf(p.id,p.name):p.name)||""}catch(e){return p&&p.name||""}}
function Nm(p){const s=nm(p);return s.charAt(0).toUpperCase()+s.slice(1)}
function liveC(){try{return liveRivals(true).filter(v=>!v.coop)}catch(e){return[]}}
function byKey(k){try{return typeof emoByKey==="function"?emoByKey(k):null}catch(e){return null}}
function eaWho(p){try{if(p===S)return undefined;if(p===S.maid)return pMaid();if(p&&p.id!=null&&typeof pv==="function"&&(rivals||[]).includes(p))return pv(p)}catch(e){}return undefined}
/* her mood move (+ toward calm for a low mood) and the feeling seal */
function ventMe(n,why,emoN){let r=0;try{r=typeof mbAdd==="function"?mbAdd(n,why,"ea:"+why):0}catch(e){}
 try{if(emoN){const m=S.emo;if(m&&m.k!=="vui"&&m.v>=15&&n>0){m.v=Math.max(0,m.v-emoN);if(typeof emoSync==="function")emoSync(S)}}}catch(e){}return r}
function ventNpc(p,n){try{const e=p&&p.emo;if(e&&e.v)e.v=Math.max(0,e.v-n);if(e&&e.v<15)p.emo=null}catch(e){}}
const sgn=n=>(n>0?"+":"−")+Math.abs(n);
/* ======================= (1) HER EMOTION ACT CARDS ======================= */
const EA_ART={"Đập đồ":"trut-gian-h","Mắng cung nữ":"phat-vo-co-h","Khóc thầm":"nhin-loi-mia-h","Viết thư nhà":"gui-thu-qua-con-h","Đàn hát tự thưởng":"dan-dem-trang","Thắp hương cầu an":"cau-tu"};
/* the card's group label (KIT §6.1 categories) by what the act is, not by the name's words ("tự thưởng" read as Ban thưởng) */
const EA_CAT={"Đập đồ":["nghi-ngoi","Nghỉ ngơi"],"Mắng cung nữ":["giao-thiep","Giao thiệp"],"Khóc thầm":["nghi-ngoi","Nghỉ ngơi"],"Viết thư nhà":["giao-thiep","Giao thiệp"],"Đàn hát tự thưởng":["hoc-tap","Học tập"],"Thắp hương cầu an":["le-nghi","Lễ nghi"]};
(function(){if(typeof kitActArt!=="function")return;const k0=kitActArt;kitActArt=function(name){const r=k0.apply(this,arguments);try{const key=EA_ART[name];if(key){const c=EA_CAT[name];return Object.assign({},r,{src:(KIT_ACTS.acts||{})[name]?r.src:`img/act-${key}.webp`,cat:c[0],label:(KIT_ACTS.cats||{})[c[0]]||c[1]})}}catch(e){}return r}})();
function eaStamp(){return W()*10+(S.buoi||0)}
function eaCards(){const M=eaMine();if(!M.g)return[];const g=M.g==="ghen"?"buon":M.g;const C=E().card,A=[];const mood=n=>`tâm trạng ${sgn(n)}`;
 const emoNm=()=>{try{const e=emoGet(S);return e&&e.k!=="binh"&&e.k!=="vui"?EMO[e.k]:""}catch(e){return""}};
 const mk=(key,o)=>Object.assign({ea:key,o:100,k:C[key].k,dom:o.dom||"Sức khỏe",w:{},c:{},l:{}},o);
 if(g==="gian"){const c=C.dapdo;A.push(mk("dapdo",{n:"Đập đồ",t:"Ném vỡ chén trà, bình hoa cho hả cơn giận.",c:{bac:-c.bac},x:`${mood(c.mood)}${emoNm()?`, bớt ${emoNm()} ${c.emo}`:""} · kèm: cung nhân xì xào, Danh −${c.danh}`,
   go:()=>{apply({danh:-c.danh});const d=ventMe(c.mood,"đập đồ cho hả giận",c.emo);log(`Ngươi ném vỡ chén trà, bình hoa; cơn giận nguôi đi (tâm trạng ${sgn(d||c.mood)}). Cung nhân xì xào (Danh −${c.danh}).`)}}));
  const L=myMaids();if(L.length){const c2=C.mang;const one=L.length===1?L[0]:null;
   A.push(mk("mang",{n:"Mắng cung nữ",dom:"Thưởng phạt",t:one?`Quát mắng ${one.name} một trận cho hả giận.`:"Chọn một cung nữ, quát mắng một trận cho hả giận.",x:`${mood(c2.mood)}${emoNm()?`, bớt ${emoNm()} ${c2.emo}`:""} · kèm: lòng ${one?one.name:"người bị mắng"} −${c2.loy}`,
    go:()=>eaScoldPick(L,c2)}))}}
 else if(g==="buon"){const c=C.khoc,c2=C.thu;
  A.push(mk("khoc",{n:"Khóc thầm",dom:"Sức khỏe",t:"Đóng cửa tẩm cung, một mình khóc cho vơi nỗi lòng.",c:{suc:-c.suc},x:`${mood(c.mood)}${emoNm()?`, bớt ${emoNm()} ${c.emo}`:""}`,go:()=>{const d=ventMe(c.mood,"khóc cho vơi lòng",c.emo);log(`Ngươi khóc một hồi, lòng nhẹ đi (tâm trạng ${sgn(d||c.mood)}).`)}}));
  A.push(mk("thu",{n:"Viết thư nhà",dom:"Giao thiệp",t:"Viết thư gửi về nhà, nhờ thái giám mang ra ngoài cung.",c:{bac:-c2.bac},x:`${mood(c2.mood)}${emoNm()?`, bớt ${emoNm()} ${c2.emo}`:""}`,go:()=>{const d=ventMe(c2.mood,"viết thư nhà",c2.emo);log(`Ngươi viết thư gửi về nhà, kể nỗi nhớ mong; lòng ấm lại (tâm trạng ${sgn(d||c2.mood)}).`)}}))}
 else if(g==="vui"){const c=C.dan;A.push(mk("dan",{n:"Đàn hát tự thưởng",dom:"Tài nghệ",t:"Lòng đang vui, ôm đàn hát một khúc tự thưởng cho mình.",w:{tai:c.tai},x:`kèm: ${mood(c.mood)} (lòng lắng lại) · kẻ ganh ghen +${c.ghen}`,
   go:()=>{try{ghenAll(c.ghen)}catch(e){}const d=ventMe(c.mood,"đàn hát tự thưởng");log(`Tiếng đàn vọng ra ngoài cung; lòng ngươi lắng lại (tâm trạng ${sgn(d||c.mood)}), kẻ ganh thì ghen thêm.`)}}))}
 else if(g==="so"){const c=C.huong;A.push(mk("huong",{n:"Thắp hương cầu an",dom:"Đức",t:"Thắp hương ở Phật đường, khấn cầu bình an cho lòng yên.",c:{bac:-c.bac},w:{duc:c.duc},x:`${mood(c.mood)}${emoNm()?`, bớt ${emoNm()} ${c.emo}`:""}`,
   go:()=>{const d=ventMe(c.mood,"thắp hương cầu an",c.emo);log(`Khói hương lượn lờ; lòng ngươi yên lại (tâm trạng ${sgn(d||c.mood)}).`)}}))}
 const st=eaStamp(),U=eaS().used;for(const a of A){a.done=U[a.ea]===st?1:0;const g0=a.go;a.go=function(){U[a.ea]=st;cnt(EA_N.play,a.ea);return g0.apply(this,arguments)}}
 return A.slice(0,2)}
window.eaCards=eaCards;
/* Mắng cung nữ: she chooses the maid (kit event choice; one maid = no question) */
function eaScoldOne(m,c){loyAdd(m,-c.loy);const d=ventMe(c.mood,`mắng ${m.name}`,c.emo);try{if(typeof emoEv==="function")emoEv(m,"loyalDown",`bị chủ nhân quát mắng`)}catch(e){}
 log(`Ngươi quát mắng ${m.name} một trận; cơn giận nguôi đi (tâm trạng ${sgn(d||c.mood)}), ${m.name} cúi đầu chịu mắng (lòng −${c.loy}).`)}
function eaScoldPick(L,c){if(L.length===1)return eaScoldOne(L[0],c);
 Q.push({ev:1,t:"Mắng cung nữ",art:"img/act-phat-vo-co-h.webp",h:`<p>Cơn giận chưa nguôi. Ngươi gọi cung nữ vào.</p><p>Mắng ai?</p>`,
  opts:L.map(m=>({n:`Mắng ${m.name}`,risk:"an toàn",hint:`hả giận; ${m.name} buồn lòng`,x:`Chắc chắn · thành: tâm trạng +${c.mood} · kèm: lòng ${m.name} −${c.loy} (nay ${m.loyal||0})`,fx:{},go:()=>eaScoldOne(m,c)}))})}
/* the cards sit after the standing cards (j76), are rebuilt from the live mood on every deal / render, and never on the servant road */
function eaSync(){try{if(!eaOn()||!Array.isArray(deck)||(typeof isSrv==="function"&&isSrv()))return;const want=eaCards();const keys=want.map(a=>a.ea).join(",");
 const have=deck.filter(a=>a&&a.ea);if(have.map(a=>a.ea).join(",")===keys&&have.every((a,i)=>a.done===want[i].done)){for(let i=0;i<have.length;i++){const o=have[i],n=want[i];o.x=n.x;o.t=n.t;o.c=n.c;o.w=n.w}return}
 for(let i=deck.length-1;i>=0;i--)if(deck[i]&&deck[i].ea)deck.splice(i,1);if(!want.length)return;let at=0;while(at<deck.length&&deck[at]&&deck[at].j76)at++;deck.splice(at,0,...want);for(const a of want)cnt(EA_N.cards,a.ea)}catch(e){console.error(e)}}
window.eaSync=eaSync;
(function(){if(typeof deal!=="function")return;const d0=deal;deal=function(){const r=d0.apply(this,arguments);eaSync();return r}})();
(function(){if(typeof render!=="function")return;const r0=render;render=function(){eaSync();return r0.apply(this,arguments)}})();
/* ======================= REACTIONS (one table, her and every NPC) ======================= */
/* who: c consort (her too), e Emperor, t Thái hậu, s servant, m man / official / child (self only). ok(p,T) = allowed for this person now.
   w(T) = weight by temper. Timid never: danh, khac, pham, cham, khoe. */
const R_=[
 {k:"dapdo",g:"gian",who:"c",n:"Đập đồ",art:"trut-gian-h",ok:(p,T)=>T.k!=="timid",w:T=>T.k==="hot"?2:1.5},
 {k:"mang",g:"gian",who:"c",n:"Mắng cung nữ",art:"phat-vo-co-h",ok:p=>maidOf(p).length>0,w:T=>T.k==="timid"?.5:2},
 {k:"danh",g:"gian",who:"c",n:"Đánh cung nữ",art:"tat-h",ok:(p,T)=>T.k==="hot"&&maidOf(p).length>0,w:()=>1.2},
 {k:"khac",g:"gian",who:"c",n:"Mắng cung nữ cung khác",art:"phat-vo-co-h",ok:(p,T)=>T.k==="hot"&&!!eaOtherMaid(p),w:()=>1.2},
 {k:"pham",g:"gian",who:"c",n:"Phạm thượng",art:"dap-tra-mia-h",ok:(p,T)=>T.k==="hot"&&!((p===S?S.confined:p.confined)>0)&&!!eaSuperior(p),w:()=>BAL.ea.out.phamW},
 {k:"khoc",g:"gian",who:"c",n:"Khóc vì uất ức",art:"nhin-loi-mia-h",ok:(p,T)=>T.k!=="hot",w:T=>T.k==="timid"?3:.6},
 {k:"khoc",g:"buon",who:"c",n:"Khóc suốt đêm",art:"nhin-loi-mia-h",ok:()=>true,w:T=>T.k==="timid"?3:1.5},
 {k:"boan",g:"buon",who:"c",n:"Bỏ bữa",art:"xa-huong",ok:()=>true,w:T=>T.k==="timid"?2:1},
 {k:"thu",g:"buon",who:"c",n:"Gửi thư nhà kể khổ",art:"gui-thu-qua-con-h",ok:p=>p===S||(p.bac||0)>=BAL.ea.fx.thu.bac,w:T=>T.k==="hot"?1.5:1},
 {k:"matngu",g:"so",who:"c",n:"Thức trắng đêm",art:"xa-huong",ok:()=>true,w:T=>T.k==="timid"?2.5:1.5},
 {k:"soat",g:"so",who:"c",n:"Lục soát tẩm cung",art:"phat-vo-co-h",ok:(p,T)=>T.k!=="timid"&&staffOf(p).length>0,w:T=>T.sus?3:T.k==="hot"?1.5:.8},
 {k:"cau",g:"so",who:"c",n:"Cầu khấn khắp nơi",art:"cau-tu",ok:p=>p===S||(p.bac||0)>=BAL.ea.fx.cau.bac,w:T=>T.pious?3:T.k==="timid"?1.5:.8},
 {k:"cham",g:"ghen",who:"c",n:"Châm chọc tình địch",art:"dap-tra-mia-h",ok:(p,T)=>T.k!=="timid"&&!!eaRival(p),w:T=>T.k==="hot"?2.5:1.2},
 {k:"tui",g:"ghen",who:"c",n:"Tủi thân khóc thầm",art:"nhin-loi-mia-h",ok:()=>true,w:T=>T.k==="timid"?3:1},
 {k:"thuong",g:"vui",who:"c",n:"Ban thưởng cung nhân",art:"phat-bac-cuu-giup",ok:(p,T)=>!T.stingy&&staffOf(p).length>0&&(p===S||(p.bac||0)>=BAL.ea.fx.thuong.bac),w:T=>T.gen?3:1},
 {k:"khoe",g:"vui",who:"c",n:"Khoe khoang",art:"dap-tra-mia-h",ok:(p,T)=>T.k!=="timid",w:T=>T.k==="hot"?2.5:T.stingy?1.5:.8},
 {k:"tiec",g:"vui",who:"c",n:"Bày tiệc trà",art:"dang-tra",ok:(p,T)=>!T.stingy&&(p===S||(p.bac||0)>=BAL.ea.fx.tiec.bac),w:T=>T.gen?1.5:1},
 {k:"hat",g:"vui",who:"c",n:"Ca hát thâu đêm",art:"dan-dem-trang",ok:()=>true,w:T=>T.k==="timid"?2:1},
 /* the Emperor */
 {k:"ban",g:"vui",who:"e",n:"Ban thưởng hậu cung",ok:(p,T)=>!T.tr.includes("lanhlung"),w:T=>T.gen?3:1},
 {k:"noi",g:"gian",who:"e",n:"Long nhan đại nộ",ok:p=>!!eaTarget(p),w:T=>T.k==="hot"?3:T.k==="timid"?.3:1},
 {k:"khoc",g:"buon",who:"e",n:"Một mình uống rượu",ok:()=>true,w:()=>1},{k:"matngu",g:"so",who:"e",n:"Mất ngủ",ok:()=>true,w:()=>1},
 /* Thái hậu */
 {k:"ban",g:"vui",who:"t",n:"Thái hậu ban thưởng",ok:()=>true,w:T=>T.gen?3:1},
 {k:"quo",g:"gian",who:"t",n:"Thái hậu quở trách",ok:p=>!!eaTarget(p),w:()=>2},
 {k:"khoc",g:"buon",who:"t",n:"Tụng kinh suốt đêm",ok:()=>true,w:()=>1},{k:"matngu",g:"so",who:"t",n:"Mất ngủ",ok:()=>true,w:()=>1},
 /* servants */
 {k:"cai",g:"gian",who:"s",n:"Cãi nhau với cung nhân khác",ok:(p,T)=>T.k!=="timid",w:()=>2},{k:"sk",g:"gian",who:"s",n:"Khóc vì bị oan",ok:()=>true,w:T=>T.k==="timid"?3:1},
 {k:"sk",g:"buon",who:"s",n:"Lơ đễnh việc hầu",ok:()=>true,w:()=>1},{k:"sk",g:"so",who:"s",n:"Run sợ lơ đễnh",ok:()=>true,w:()=>1},{k:"sk",g:"ghen",who:"s",n:"Hờn dỗi",ok:()=>true,w:()=>1},
 {k:"hang",g:"vui",who:"s",n:"Làm việc hăng hái",ok:()=>true,w:()=>1},
 /* men, officials, children: self only (feeling vented, a line in the news when seen) */
 {k:"self",g:"gian",who:"m",n:"Nổi nóng",ok:()=>true,w:()=>1},{k:"self",g:"buon",who:"m",n:"Buồn bã",ok:()=>true,w:()=>1},{k:"self",g:"so",who:"m",n:"Lo âu",ok:()=>true,w:()=>1},
 {k:"self",g:"ghen",who:"m",n:"Hậm hực",ok:()=>true,w:()=>1},{k:"self",g:"vui",who:"m",n:"Vui vẻ ra mặt",ok:()=>true,w:()=>1}];
window.EA_REACT=R_;
function eaKind(p){if(p===S)return"c";if(S.emp&&p===S.emp)return"e";if(p===S.thO)return"t";if((rivals||[]).includes(p))return"c";if(p&&(p.role==="maid"||p.role==="eunuch"||p.sid!=null||p===S.maid))return"s";return"m"}
/* targets: who the angry / jealous one aims at (her feeling's t, else the one she hates most) */
function eaTarget(p){try{const e=p.emo;if(e&&e.t!=null){const t=byKey(e.t);if(t&&t!==p&&(t===S||t.alive))return t}}catch(e){}return null}
function eaRival(p){const t=eaTarget(p);if(t&&(t===S||(rivals||[]).includes(t)))return t;try{const L=[S].concat(liveC()).filter(x=>x!==p&&!(x===S&&S.out));let best=null,bv=-1;for(const x of L){const h=(p===S?(S.ro&&S.ro[x.id]||0):oan(p,x))-(p===S?(S.rl&&S.rl[x.id]||0):aff(p,x))/2;if(h>bv){bv=h;best=x}}return bv>10?best:null}catch(e){return null}}
function eaOtherMaid(p){const t=eaRival(p);if(t&&t!==p){const L=maidOf(t);if(L.length)return{who:t,m:pick(L)}}return null}
function eaSuperior(p){try{const hh=liveC().find(v=>v.queen);if(p===S){if(S.out||S.rank>=7)return null;return hh||null}if(p.queen)return null;if(hh&&hh!==p)return hh;return null}catch(e){return null}}
function eaPick(p,g){const T=eaTemper(p),kd=eaKind(p);const L=R_.filter(r=>r.who===kd&&r.g===g&&r.ok(p,T));if(!L.length)return null;const w=L.map(r=>Math.max(0,r.w(T)));let s=w.reduce((a,b)=>a+b,0);if(!s)return null;let x=Math.random()*s;for(let i=0;i<L.length;i++){x-=w[i];if(x<=0)return{r:L[i],T}}return{r:L[L.length-1],T}}
window.eaPick=eaPick;
/* ======================= (3) OUTBURSTS: what each reaction does ======================= */
/* returns {h: story lines, past: the real numbers} for her event; NPC: applies and returns a news line */
function eaDo(p,r){const F=BAL.ea.fx[r.k]||{vent:10},me=p===S,res=[];let h="",target=null;const add=(t)=>res.push(t);
 /* the outburst spends the feeling: her bar moves toward calm (down from joy, up from a low mood) */
 const vent=()=>{if(me){const d=ventMe((S.mood&&S.mood.v>0?-1:1)*F.vent,r.n.toLowerCase());if(d)add(`tâm trạng ${sgn(d)}`)}else ventNpc(p,F.vent)};
 const pay=(o)=>{if(me){apply(o)}else ap(p,o);for(const k in o){if(o[k]&&typeof NAMES!=="undefined"&&NAMES[k])add(`${NAMES[k]} ${sgn(o[k])}`)}};
 const ml=maidOf(p);const M=ml.length?pick(ml):null;
 switch(r.k){
 case"dapdo":pay({bac:-Math.min(F.bac,me?S.bac:(p.bac||0)),danh:-F.danh});h=me?"Cơn giận dồn nén mấy hôm bỗng trào lên. Ngươi hất tay, chén trà, bình hoa vỡ tan dưới đất; cung nhân sợ hãi quỳ rạp thu dọn.":`${Nm(p)} nổi giận đập vỡ đồ trong cung.`;break;
 case"mang":loyAdd(M,-F.loy);add(`lòng cung nữ −${F.loy}`);h=me?`Một chuyện nhỏ cũng khiến ngươi phát cáu. Ngươi quát mắng ${M.name} một trận; nàng cúi đầu, mắt đỏ hoe.`:`${Nm(p)} quát mắng cung nữ ${M.name} một trận.`;try{emoEv(M,"loyalDown","bị chủ nhân quát mắng")}catch(e){}break;
 case"danh":loyAdd(M,-F.loy);add(`lòng cung nữ −${F.loy}`);pay({duc:-F.duc,danh:-F.danh});h=me?`Cơn giận không kìm nổi, ngươi sai người đánh ${M.name} mấy roi vì một lỗi nhỏ. Chuyện lọt ra ngoài, cung nhân các cung bàn tán.`:`${Nm(p)} nổi giận, sai đánh cung nữ ${M.name}.`;try{emoEv(M,"punished","bị chủ nhân đánh")}catch(e){}break;
 case"khac":{const o=eaOtherMaid(p);if(!o)return null;target=o.who;const hi=rkOf(o.who)>rkOf(p);try{emoEv(o.m,"punished",`bị ${nm(p)} mắng`)}catch(e){}
  if(o.who===S){eaHitMine(p,o.m);h=`${Nm(p)} mắng cung nữ ${o.m.name} của cung ngươi.`;break}
  if(hi){if(me){eaS().hoi.push({id:o.who.id,m:o.m.name,w:W()});add(`${nm(o.who)} sẽ đến hỏi tội`)}else{oanAdd(o.who,p,F.hiOan);if(o.who.queen||rkOf(o.who)>=rkOf(p)+F.punRk)punish(p,`mắng cung nữ của ${o.who.name}`,1)}}
  else{oanAdd(o.who,p,F.oan);if(me)add(`${nm(o.who)} oán ngươi`)}
  h=me?`Gặp một cung nữ của ${nm(o.who)} ở hành lang, ngươi trút cơn giận lên nàng, mắng một trận nặng lời.${hi?` Chủ nhân nàng phẩm vị cao hơn ngươi: “đánh chó phải nhìn mặt chủ”.`:""}`:`${Nm(p)} mắng cung nữ ${o.m.name} của ${o.who.name}.`;break}
 case"pham":{const t=eaSuperior(p);if(!t)return null;target=t;relAdd(p,t,-F.rel);pay({danh:-F.danh});punish(p,`phạm thượng với ${t.queen?"Hoàng hậu":t.name}`,1);if(me)add(`${t.queen?"Hoàng hậu":nm(t)} thiện cảm −${F.rel}`);
  h=me?`Lúc thỉnh an, ${t.queen?"Hoàng hậu":nm(t)} nói một câu, ngươi không nhịn nổi mà cãi lại trước mặt mọi người. Cả điện lặng ngắt.`:`${Nm(p)} cãi lại ${t.queen?"Hoàng hậu":t.name} trước mặt mọi người.`;break}
 case"khoc":case"tui":pay({suc:-F.suc});h=me?(r.g==="ghen"?"Nghĩ đến người kia được sủng, ngươi tủi thân, đóng cửa khóc một mình.":r.g==="gian"?"Uất ức mà chẳng dám nói ra, ngươi chỉ biết khóc.":"Đêm ấy ngươi khóc suốt, gối ướt đẫm."):`${Nm(p)} ${r.n.toLowerCase()}.`;break;
 case"boan":case"matngu":pay({suc:-F.suc});h=me?(r.k==="boan"?"Mấy hôm liền ngươi chẳng buồn ăn uống, cơm canh dọn lên lại dọn xuống.":"Lo âu đè nặng, ngươi trằn trọc thức trắng đêm."):`${Nm(p)} ${r.n.toLowerCase()}.`;break;
 case"thu":pay({bac:-Math.min(F.bac,me?S.bac:(p.bac||0))});h=me?"Ngươi ngồi viết một lá thư dài gửi về nhà, kể hết nỗi khổ trong cung, đút bạc cho thái giám mang ra ngoài.":`${Nm(p)} gửi thư về nhà kể khổ.`;break;
 case"soat":for(const s of staffOf(p))loyAdd(s,-F.loy);add(`lòng cung nhân −${F.loy}`);h=me?"Lòng bất an, ngươi sai lục soát khắp tẩm cung, hỏi han từng cung nhân. Ai nấy đều thấy mình bị nghi.":`${Nm(p)} sai lục soát khắp cung mình.`;break;
 case"cau":pay({bac:-Math.min(F.bac,me?S.bac:(p.bac||0))});h=me?"Ngươi sai người mang lễ đi khắp các chùa miếu, cầu khấn cho được bình an.":`${Nm(p)} sai người đi cầu khấn khắp nơi.`;break;
 case"cham":{const t=eaRival(p);if(!t)return null;target=t;relAdd(p,t,-F.rel);oanAdd(t,p,F.oan);pay({danh:-F.danh});if(me)add(`${nm(t)} thiện cảm −${F.rel}`);
  h=me?`Gặp ${nm(t)} ở ngự hoa viên, cơn ghen trào lên, ngươi buông mấy câu châm chọc. Người xung quanh nghe rõ cả.`:`${Nm(p)} châm chọc ${t===S?"ngươi":t.name} trước mặt mọi người.`;
  if(t===S&&!me)eaHitMe(p,"cham");break}
 case"thuong":{const st=staffOf(p);const b=Math.min(F.bac,me?S.bac:(p.bac||0));pay({bac:-b});for(const s of st)loyAdd(s,F.loy);add(`lòng cung nhân +${F.loy}`);h=me?"Lòng vui như mở hội, ngươi mở rương, thưởng bạc cho cả cung. Cung nhân mừng rỡ tạ ơn.":`${Nm(p)} vui vẻ thưởng bạc cho cung nhân.`;break}
 case"khoe":pay({danh:F.danh});try{if(me)ghenAll(F.ghen);else for(const x of liveC())if(x!==p)oanAdd(x,p,Math.round(F.ghen/2))}catch(e){}if(me)add(`kẻ ganh ghen +${F.ghen}`);h=me?"Vui quá hóa đắc ý, ngươi kể chuyện ân sủng của mình với các phi tần. Có người cười theo, có người tái mặt.":`${Nm(p)} khoe khoang ân sủng với các phi tần.`;break;
 case"tiec":{pay({bac:-Math.min(F.bac,me?S.bac:(p.bac||0))});const fr=liveC().filter(x=>x!==p).sort(()=>Math.random()-.5).slice(0,2);for(const x of fr)affAdd(x,p,F.aff);if(me&&fr.length)add(`${fr.map(x=>nm(x)).join(", ")} thiện cảm +${F.aff}`);
  h=me?"Lòng vui, ngươi bày tiệc trà, mời mấy vị tỷ muội sang ngắm hoa, chuyện trò đến chiều.":`${Nm(p)} bày tiệc trà mời các phi tần.`;break}
 case"hat":pay({suc:-F.suc,tai:F.tai});h=me?"Vui quá, ngươi ôm đàn ca hát đến tận khuya, sáng ra mệt rã rời.":`${Nm(p)} ca hát thâu đêm.`;break;
 case"ban":{const L=liveC();for(const x of L)ap(x,{bac:F.bac});if(!S.out){apply({bac:F.bac});eaHitMe(p,"ban")}h=`${Nm(p)} vui, ban thưởng khắp hậu cung.`;break}
 case"noi":{const t=eaTarget(p);if(!t)return null;target=t;if(t===S){apply({sung:-F.sung});eaHitMe(p,"noi")}else ap(t,{sung:-F.sung});h=`Hoàng thượng nổi giận với ${t===S?"ngươi":t.name}.`;break}
 case"quo":{const t=eaTarget(p);if(!t)return null;target=t;if(t===S){apply({th:-F.th});eaHitMe(p,"quo")}else if((rivals||[]).includes(t))ap(t,{danh:-F.danh});h=`Thái hậu quở trách ${t===S?"ngươi":t.name}.`;break}
 case"cai":{const o=(eaOwner(p)?staffOf(eaOwner(p)):[]).filter(s=>s!==p);const q=o.length?pick(o):null;loyAdd(p,-F.loy);loyAdd(q,-F.loy);h=`${p.name} cãi nhau${q?` với ${q.name}`:""}.`;break}
 case"sk":loyAdd(p,-F.loy);h=`${p.name} ${r.n.toLowerCase()}.`;break;
 case"hang":loyAdd(p,F.loy);h=`${p.name} ${r.n.toLowerCase()}.`;break;
 default:h=`${Nm(p)} ${r.n.toLowerCase()}.`}
 vent();return{h,res,target}}
function eaOwner(s){if(s===S.maid||(S.staff||[]).includes(s))return S;for(const v of rivals||[])if((v.staff||[]).includes(s))return v;return null}
/* an NPC's outburst lands on her (her maid, her standing): one event, kit frame */
/* at most ONE event a tuần from other people's outbursts (BAL.ea.npc.meWk); the rest go to the log */
function eaMeSlot(){const A=eaS(),w=W();if(A.hitW===w&&(A.hitN||0)>=E().npc.meWk)return false;if(A.hitW!==w){A.hitW=w;A.hitN=0}A.hitN++;return true}
function eaHitMine(p,m){try{if(!m)return;const lower=rkOf(p)<S.rank&&!S.out;loyAdd(m,-E().hoi.hitLoy);EA_N.hoiMe++;
  if(lower&&eaMeSlot()){Q.push({ev:1,t:"Cung nữ bị ức hiếp",who:eaWho(p),art:"img/act-phat-vo-co-h.webp",h:`<p>${m.name} chạy về, mắt đỏ hoe: ${nm(p)} gặp nàng ở hành lang, trút giận mắng nàng một trận chẳng vì lỗi gì.</p><p>${Nm(p)} phẩm vị thấp hơn ngươi.</p>`,
   opts:[{n:`Sang hỏi tội ${nm(p)}`,risk:"an toàn",hint:"giữ thể diện cho cung mình",x:`Chắc chắn · thành: Danh +${E().hoi.go.danh}, lòng ${m.name} +${E().hoi.go.loy} · kèm: ${nm(p)} oán ngươi +${E().hoi.go.oan}`,fx:{danh:E().hoi.go.danh},go:()=>{loyAdd(m,E().hoi.go.loy);oanAdd(p,S,E().hoi.go.oan);log(`Ngươi sang hỏi tội ${nm(p)}; nàng đành cúi đầu nhận lỗi.`)}},
    {n:"Bỏ qua",risk:"an toàn",hint:"giữ hòa khí",x:`Chắc chắn · thành: Đức +${E().hoi.let.duc} · kèm: lòng ${m.name} −${E().hoi.let.loy}`,fx:{duc:E().hoi.let.duc},go:()=>{loyAdd(m,-E().hoi.let.loy);log(`Ngươi bảo ${m.name} nhịn đi cho êm chuyện.`)}}]})}
  else{log(`${Nm(p)} mắng cung nữ ${m.name} của ngươi; ${Nm(p)} phẩm vị cao hơn, ngươi đành nuốt giận.`);try{emoEv(S,"slight",`${nm(p)} mắng cung nữ của ngươi`,emoKey(p))}catch(e){}}}catch(e){}}
function eaHitMe(p,k){try{const F=BAL.ea.fx[k]||{};if(!eaMeSlot()){log(`${Nm(p)}: ${{cham:"châm chọc ngươi",ban:"ban thưởng",noi:"nổi giận với ngươi",quo:"quở trách ngươi"}[k]||""}.`);return}const T={cham:["Bị châm chọc",`<p>${Nm(p)} gặp ngươi ở ngự hoa viên, buông mấy câu châm chọc chua cay. Người xung quanh nghe rõ cả.</p>`,`${nm(p)} thiện cảm −${F.rel}`,"img/act-dap-tra-mia-h.webp"],
  ban:[p===S.thO?"Thái hậu ban thưởng":"Hoàng thượng ban thưởng",`<p>${p===S.thO?"Thái hậu":"Hoàng thượng"} đang vui, ban thưởng khắp hậu cung. Thái giám mang bạc đến cung ngươi.</p>`,`Bạc +${F.bac}`,"img/act-thuong.webp"],
  noi:["Long nhan đại nộ",`<p>Hoàng thượng đang giận, một lời của ngươi chạm đúng chỗ phật ý. Ngài phất tay áo bỏ đi.</p>`,`Sủng −${F.sung}`,"img/act-xu-toi-h.webp"],
  quo:["Thái hậu quở trách",`<p>Thái hậu đang không vui, lúc thỉnh an quở trách ngươi mấy câu trước mặt mọi người.</p>`,`Thái hậu −${F.th}`,"img/act-xu-toi-h.webp"]}[k];if(!T)return;
  Q.push({t:T[0],who:p===S.emp||p===S.thO?undefined:eaWho(p),art:T[3],hideOut:true,h:T[1]+`<p class="past">${T[2]}.</p>`,opts:[{n:"Tiếp tục",fx:{},hideOut:true,hint:"không đổi gì thêm",risk:"an toàn",go:()=>{}}]})}catch(e){}}
/* her outburst: the kit event frame, no choice (owner: not a punishment, no damage control after the fact) */
function eaMeOut(g){const P=eaPick(S,g);if(!P)return false;const r=P.r;const o=eaDo(S,r);if(!o)return false;cnt(EA_N.out,r.k);cnt(EA_N.outT,P.T.k+":"+g);
 const why={gian:"giận",buon:"buồn",so:"lo âu",ghen:"ghen",vui:"vui"}[g];
 log(`${r.n}: ${o.h}${o.res.length?` (${o.res.join(", ")})`:""}`);
 if(window.__bot||typeof Q==="undefined")return true;
 Q.push({t:r.n,who:o.target&&o.target!==S?eaWho(o.target):undefined,art:`img/act-${r.art||"trut-gian-h"}.webp`,hideOut:true,
  h:`<p>${o.h}</p><p>Vì ${why} quá mà ra nông nỗi; lần sau nên giữ lòng cho bình thản từ sớm.</p>${o.res.length?`<p class="past">${o.res.join(" · ")}.</p>`:""}`,
  opts:[{n:"Tiếp tục",fx:{},hideOut:true,hint:"không đổi gì thêm",risk:"an toàn",go:()=>{}}]});return true}
/* hỏi tội: the higher-rank mistress whose maid she scolded comes the next tuần (a real choice, gain and loss each) */
function eaHoi(){const A=eaS();if(!A.hoi.length)return;const x=A.hoi.shift();const v=(rivals||[]).find(r=>r.id===x.id&&r.alive&&!r.out);if(!v||S.out)return;const H=E().hoi;EA_N.hoi++;
 const o=clp(H.try+(S.rank-rkOf(v))*H.rk+Math.round((S.danh||0)/H.dn),5,95);const ttl=v.queen?"Hoàng hậu":nm(v);
 const opts=S.bac<H.bac?[]:[{n:"Tạ lỗi, đền bạc",risk:"an toàn",hint:"êm chuyện, nhưng mất thể diện",x:`Chắc chắn · thành: ${ttl} thiện cảm +${H.aff}, nguôi giận`,fx:{bac:-H.bac,danh:-H.danh},go:()=>{affAdd(v,S,H.aff);oanAdd(v,S,-H.oan);log(`Ngươi tạ lỗi với ${ttl}, đền bạc cho cung nữ của nàng.`)}}];
 if(S.maid)opts.push({n:"Đổ lỗi cho cung nữ hỗn hào",risk:"an toàn",hint:"giữ thể diện, cung nữ chịu tội thay",x:`Chắc chắn · thành: giữ thể diện · kèm: lòng ${S.maid.name} −${H.loy}`,fx:{},go:()=>{loyAdd(S.maid,-H.loy);log(`Ngươi đổ cho ${S.maid.name} hỗn hào; ${S.maid.name} quỳ chịu tội thay.`)}});
 opts.push({n:"Cãi lý",risk:"liều",hint:"có thể giữ được thể diện, có thể chuốc họa",x:`${word(o)} · thành: Danh +${H.win} · hỏng: Danh −${H.lose}, ${ttl} oán +${H.oan}`,fx:{},go:()=>{if(roll(o)){apply({danh:H.win});log(`Ngươi cãi lý với ${ttl}: cung nữ kia hỗn trước. ${ttl} đành bỏ qua.`)}else{apply({danh:-H.lose});oanAdd(v,S,H.oan);log(`<span class="r">Ngươi cãi lý với ${ttl}, không ai bênh; chuyện lan khắp hậu cung.</span>`)}}});
 Q.push({ev:1,t:`${ttl} đến hỏi tội`,who:eaWho(v),art:"img/act-xu-toi-h.webp",h:`<p>${ttl} dẫn theo cung nữ hôm trước đến cung ngươi: “Đánh chó còn phải nhìn mặt chủ. Người của bản cung, muội muội cũng dám mắng?”</p><p>Cung nữ kia đứng sau, mắt còn đỏ.</p>`,opts})}
window.eaHoi=eaHoi;
/* ======================= (2) EXTREME MOOD ======================= */
function eaExtMe(){const M=eaMine(),A=eaS(),X=E().ext,w=W();const ext=Math.abs(M.i)>=2?M.g:null;
 if(ext&&A.xk===ext)A.xn=(A.xn||0)+1;else{A.xk=ext;A.xn=ext?1:0}
 if(!ext||A.xn<X.wk||(A.xcd||0)>w)return false;A.xcd=w+X.cd;A.xn=0;cnt(EA_N.ext,ext);const ui=!window.__bot&&typeof Q!=="undefined";
 let t,h,past,art;
 if(ext==="buon"||ext==="ghen"){catchIll(S,"tambenh");t="Ưu uất thành bệnh";art="img/ev-benh-tat.webp";h=`<p>Nỗi buồn đè nặng mấy tuần liền, ngươi biếng ăn mất ngủ. Thái y bắt mạch, lắc đầu: “Tâm bệnh còn phải tâm dược chữa.”</p>`;past="Mắc Tâm bệnh"}
 else if(ext==="gian"){apply({danh:-X.danh});t="Lỡ lời";art="img/act-dap-tra-mia-h.webp";h=`<p>Cơn giận ủ mấy tuần liền, lúc thỉnh an ngươi buột miệng một câu nặng lời. Lời nói ra như bát nước hắt đi, cả hậu cung truyền tai nhau.</p>`;past=`Danh −${X.danh}`}
 else if(ext==="vui"){try{ghenAll(X.ghen)}catch(e){}A.smug=w+X.smugWk;t="Đắc ý quên mình";art="img/ev-tin-don.webp";h=`<p>Mấy tuần liền mọi chuyện thuận lợi, ngươi vui ra mặt, nói cười chẳng giữ ý. Kẻ ganh ghét bắt đầu thì thầm sau lưng.</p>`;past=`Kẻ ganh ghen +${X.ghen}; ${X.smugWk} tuần tới kẻ ganh ghen thêm`}
 else if(ext==="so"){catchIll(S,"matngu");t="Lo âu mất ngủ";art="img/act-xa-huong.webp";h=`<p>Lo âu mấy tuần liền, đêm nào ngươi cũng trằn trọc đến canh năm. Thái y nói ngươi mắc chứng mất ngủ.</p>`;past="Mắc Chứng mất ngủ"}
 log(`<span class="r">${t}.</span> ${past}.`);
 if(ui)Q.push({t,art,hideOut:true,h:`${h}<p>Cảm xúc cực độ kéo dài ${X.wk} tuần trở lên thì sinh chuyện.</p><p class="past">${past}.</p>`,opts:[{n:"Tiếp tục",fx:{},hideOut:true,hint:"không đổi gì thêm",risk:"an toàn",go:()=>{}}]});return true}
/* smug: rivals grow more jealous of her for smugWk tuần */
(function(){if(typeof ghenAll!=="function")return;const g0=ghenAll;ghenAll=function(n){try{if(n>0&&eaOn()&&S.ea&&S.ea.smug>W()){n=Math.round(n*E().ext.smugK);arguments[0]=n}}catch(e){}return g0.apply(this,arguments)}})();
function eaExtNpc(p,g){const X=E().ext,w=W(),e=p.emo;const ext=e&&e.v>=E().npc.extV?g:null;
 const z=p.eaX||(p.eaX={});if(ext&&z.k===ext)z.n=(z.n||0)+1;else{z.k=ext;z.n=ext?1:0}
 if(!ext||z.n<X.wk||(z.cd||0)>w)return;z.cd=w+X.cd;z.n=0;cnt(EA_N.npcExt,eaKind(p)+":"+ext);const kd=eaKind(p);let line="";
 if(ext==="buon"||ext==="ghen"){if(typeof catchIll==="function")catchIll(p,"tambenh");line=`${Nm(p)} ưu uất thành bệnh.`}
 else if(ext==="so"){if(typeof catchIll==="function")catchIll(p,"matngu");line=`${Nm(p)} lo âu đến mất ngủ.`}
 else if(ext==="gian"){if(kd==="c")ap(p,{danh:-X.danh});else if(kd==="s")loyAdd(p,-X.loy);line=`${Nm(p)} giận quá lỡ lời.`}
 else if(ext==="vui"){if(kd==="c"){for(const x of liveC())if(x!==p)oanAdd(x,p,X.oan)}else if(kd==="s")loyAdd(p,-X.loy);line=`${Nm(p)} đắc ý ra mặt, bị người ganh ghét.`}
 if(line&&kd==="c"&&typeof newsAdd==="function"&&p.id!=null)try{newsAdd(p,"emo",line)}catch(e){}}
/* ======================= THE TUẦN ======================= */
function eaPeople(){const L=[];try{for(const v of liveC())L.push(v);if(S.emp)L.push(S.emp);if(S.thO&&!S.thDead)L.push(S.thO);for(const v of liveC())for(const s of v.staff||[])L.push(s);for(const s of S.staff||[])L.push(s);if(S.maid&&!L.includes(S.maid))L.push(S.maid);
 for(const m of S.men||[])if(m.alive!==false)L.push(m);if(S.court)for(const c in S.court)if(S.court[c]&&S.court[c].name)L.push(S.court[c]);if(typeof allKids==="function")for(const [k] of allKids())if(k.alive)L.push(k)}catch(e){}return L}
function eaNpcWeek(){if(!eaHost())return;const N=E().npc;
 for(const p of eaPeople()){const e=p.emo;const g=e&&e.v>=15?eaGrpK(e.k):null;eaExtNpc(p,g);if(!g)continue;const T=eaTemper(p);
  if(e.v>=N.outV){const ch=N.outCh*(E().out.t[T.k]||1);if(roll(ch)){const P=eaPick(p,g);if(P){const o=eaDo(p,P.r);if(o){cnt(EA_N.npcOut,eaKind(p)+":"+P.r.k);cnt(EA_N.npcOutT,T.k);if(eaKind(p)==="c"&&typeof newsAdd==="function"&&p.id!=null)try{newsAdd(p,"emo",o.h)}catch(x){}}}}}
  else if(e.v>=N.actV&&roll(N.actCh)){/* the same emotion acts as hers, chosen to calm down: vent + the act's own price */
   const C=E().card,kd=eaKind(p),cg=g==="ghen"?"buon":g;const L=Object.keys(C).filter(k=>C[k].g===cg);if(!L.length)continue;const k=pick(L),c=C[k];
   if(kd==="c"){if(c.bac&&(p.bac||0)<c.bac)continue;const o={};if(c.bac)o.bac=-c.bac;if(c.suc)o.suc=-c.suc;if(c.danh)o.danh=-c.danh;if(c.tai)o.tai=c.tai;if(c.duc)o.duc=c.duc;ap(p,o);if(c.loy){const m=maidOf(p);if(m.length)loyAdd(pick(m),-c.loy)}if(c.oan)for(const x of liveC())if(x!==p)oanAdd(x,p,c.oan)}
   ventNpc(p,c.emo||Math.abs(c.mood));cnt(EA_N.npcAct,kd+":"+k)}}}
function eaWeek(){if(!eaOn())return;EA_N.wk++;const A=eaS(),w=W();if(A.wk===w)return;A.wk=w;
 try{eaHoi()}catch(e){console.error(e)}
 try{eaExtMe()}catch(e){console.error(e)}
 /* her outburst */
 try{const M=eaMine(),O=E().out;const v=S.mood?Math.abs(S.mood.v):0;if(M.g&&v>=O.v&&(A.ocd||0)<=w&&!(typeof isSrv==="function"&&isSrv())){const T=eaTemper(S);if(roll(O.ch*(O.t[T.k]||1))){if(eaMeOut(M.g)){A.ocd=w+O.cd;EA_N.outWk++}}}}catch(e){console.error(e)}
 try{eaNpcWeek()}catch(e){console.error(e)}}
window.eaWeek=eaWeek;
(function(){if(typeof endTurn!=="function")return;const e0=endTurn;endTurn=function(){const w0=W();const r=e0.apply(this,arguments);try{if(S&&!S.dead&&W()!==w0)eaWeek()}catch(e){console.error(e)}return r}})();
/* ======================= (5) CHOICES THAT PERSONALITY + MOOD DECIDE (audit, owner 13:25Z B: "a timid person never dares phạm thượng
   however angry; a hot-tempered one may scold, smash, even phạm thượng") =======================
   In an event that offers both a holding-back answer (Nhịn, Im lặng, Làm ngơ, Cúi đầu…) and a hitting-back answer (Đáp trả, Cãi lại,
   Mắng thẳng mặt, Đối chất…) she can afford: a HOT-tempered her past the outburst line in anger cannot hold back (the holding-back answers are greyed,
   the reason in the answer's own line); a TIMID her at the lowest band does not dare hit back. Never greys every answer. Same option
   button (disabled, as when bạc is short), no new part. NPCs already pick by trait (persW) and feeling (jemo emoMul). */
const EA_HOLD=/^(Nhịn|Nhẫn nhịn|Nhịn cho êm|Nhịn lời mỉa mai|Im lặng|Im lặng ghi nhớ|Làm ngơ|Lờ đi|Cúi đầu nhận lỗi|Cúi đầu tránh đi|Cúi đầu đi qua như người lạ)$/;
const EA_HIT=/^(Đáp trả|Cãi lại|Mắng thẳng mặt|Đối chất|Vặn lại)/;
function eaLockWhy(c,m){try{if(!eaOn()||!c||!m||!m.opts)return"";const n=String(c.n||"").replace(/<[^>]+>/g,"").trim();const M=eaMine();if(!M.b)return"";const T=eaTemper(S);
  /* another answer she can really take (bạc enough) of the wanted kind must stay open: never a dead end (bot r3: "Làm ngơ" greyed while
     the only other answer cost bạc she lacked → stuck) */
  const usable=o=>o&&o!==c&&!(o.fx&&o.fx.bac&&S.bac+o.fx.bac<0);const nmO=o=>String(o.n||"").replace(/<[^>]+>/g,"").trim();
  if(T.k==="hot"&&M.g==="gian"&&S.mood.v<=-E().out.v&&EA_HOLD.test(n)&&m.opts.some(o=>usable(o)&&EA_HIT.test(nmO(o))))return`ngươi đang ${M.b.name.toLowerCase()}, tính nóng, không nhịn nổi`;
  if(T.k==="timid"&&M.i<=-2&&EA_HIT.test(n)&&m.opts.some(o=>usable(o)&&!EA_HIT.test(nmO(o))))return`ngươi đang ${M.b.name.toLowerCase()}, tính nhút nhát, không dám`;}catch(e){}return""}
window.eaLockWhy=eaLockWhy;
(function(){if(typeof showModal!=="function")return;const s0=showModal;showModal=function(){const r=s0.apply(this,arguments);try{const m=Q[0];if(m&&m.opts)document.querySelectorAll("#modal .opts > button.opt[data-m]").forEach(b=>{const c=m.opts[+b.dataset.m];const why=eaLockWhy(c,m);if(!why)return;
  b.disabled=true;const sm=b.querySelector("small");if(sm)sm.textContent="Cần: "+why;if(!c.__eaN){c.__eaN=1;cnt(EA_N,"lock")}})}catch(e){}return r}})();
(function(){if(typeof chooseM!=="function")return;const c0=chooseM;chooseM=function(i){try{const m=Q[0];if(m&&m.opts&&eaLockWhy(m.opts[i],m)){/* the button is disabled; a script call (bots) takes the answer her temper allows */const j=m.opts.findIndex(o=>o&&!eaLockWhy(o,m)&&!(o.fx&&o.fx.bac&&S.bac+o.fx.bac<0));if(j<0||j===i)return;arguments[0]=i=j}}catch(e){}return c0.apply(this,arguments)}})();
window.eaStat=function(){return JSON.parse(JSON.stringify(EA_N))};
})();
