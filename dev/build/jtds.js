/* ================= jtds: TỨ ĐỨC SUB-STYLES + CDNH WORKS (item D16; owner 15/11 21:50Z, 23:05Z, 23:15Z; coordinator s7 decisions)
   Builds on jrcp (lối = sub-styles, books, tastes, teachers) and j83/jwkr (handmade works, 10 recipes per kind × 4 tiers with art).
   1. Each Tứ đức course makes ONE work kind (TDS_KIND): Công → Đồ kim chỉ, Dung → Phấn son tự chế, Ngôn → Thư từ, lời chúc,
      Hạnh → Vật cầu phúc, việc thiện. Each kind = 10 recipes (WKR) × 4 tiers (pictures img/item-tp-<kind>-rNN-b1..4.webp) in 4 lối.
      The kind's 4 lối ARE the course's 4 sub-styles: learnt and valued like the arts' lối (tastes, books, teachers, level-up).
   2. Lối 1 is known from the start; Công/Dung/Ngôn/Hạnh bậc 2, 4, 5 each open the next lối (BAL.tds.open; coordinator decision a).
      A teacher (ma ma giáo tập, or a consort better at the course) can open any lối earlier; books / hand-copied sheets too (jrcp).
      Each course level also grants one recipe (owner 21:20Z rule, same as the arts: rcpLvGift).
   3. Every Tứ đức lesson (Tự học / theo ma ma / phi tần dạy) first picks WHAT to make (jwkr grid) and the material, then ends with that
      work in the chest (the j83 rule; with review/tuduc-mg's games, a skipped game = no work, like "Học nhanh"). Mastered (bậc 5): "Tự
      luyện, làm đồ" in Tác phẩm. NPCs: each of their Tứ đức lessons can end with a work too (BAL.tds.npcWk), same recipes / lối rules.
   4. Fees (bạc rule, owner 15/11 20:30Z): Tứ đức teacher fee = the palace teacher fee, 8% of the learner's bổng (j85 virCost → tchFeeOf;
      coordinator decision c). Consort-favour teacher: thiện cảm cost scales with the fee it replaces (rcpFavorOf; decision b).
   5. NPC lối knowledge (A13 note): no longer a hash of the art level. Arts: lối 1 + their own favourite lối first, then the others
      (the lối they dislike last), as many as BAL.tds.npcLv[art level]. Tứ đức: the same level rule as hers (2/4/5).
   Keys for D19 ("Biếu quà làm lành" accepts works): a work is an inventory entry {k:"tp", wk:{kind,r,ti,q,...}}; Tứ đức kinds = TDS_KIND
   values (window.tdsKinds()); wkEval(a,w,r) values it like any other work. Notes: dev/PROGRESS_tuduc-sub.md. ================= */
/* BAL.tds (open, npcLv, npcWk, npcWkCap, phucDuc, pracK, pracSuc, pracMin) lives in jbal.js (ONE CORE) */
BAL.rcp.tFavB=2;BAL.rcp.tFavK=4;BAL.rcp.tFavMin=3;BAL.rcp.tFavMax=9;
const TDS_KIND={cong:"kimchi",dung:"phanson",ngon:"thuchuc",hanh:"phucthien"};
const TDS_OF=Object.fromEntries(Object.entries(TDS_KIND).map(([a,b])=>[b,a]));
function tdsKinds(){return Object.values(TDS_KIND)}window.tdsKinds=tdsKinds;
function tdsIsVir(a){return !!TDS_KIND[a]}
function tdsVirOfKind(kind){return TDS_OF[kind]||null}
/* ---- the four work kinds (same fields as j83 WK) ---- */
Object.assign(WK,{
 kimchi:{a:"cong",n:"Làm đồ kim chỉ",w:"Đồ kim chỉ",need:2,mat:[0,4,15],mn:["vải, chỉ thường","lụa, chỉ màu","gấm, chỉ kim tuyến, hạt ngọc"],sub:["hoa mai","hoa sen","uyên ương"]},
 phanson:{a:"dung",n:"Làm phấn son",w:"Phấn son tự chế",need:2,mat:[0,4,15],mn:["gạo, hoa vườn","hoa quý, sáp ong, hộp sứ","trân châu, nhân sâm, hộp ngọc"],sub:["hoa nhài","hoa hồng","hoa quế"]},
 thuchuc:{a:"ngon",n:"Viết thư, lời chúc",w:"Thư từ, lời chúc",need:2,mat:[0,4,15],mn:["giấy thường","giấy hoa tiên","giấy dát vàng, mực Huy Châu"],sub:["Thăm hỏi","Tạ ơn","Chúc xuân"]},
 phucthien:{a:"hanh",n:"Làm việc thiện",w:"Vật cầu phúc",need:4,mat:[0,4,15],mn:["vải, giấy thường","lụa, sáp ong, gỗ thơm","gấm, trầm hương, ngọc"],sub:["Bình an","Hoa đăng","Nữ giới"],fin:{duc:BAL.tds.phucDuc}}});
/* ---- 10 recipes each (WKR_LV levels by index, as every kind) ---- */
(function(){const R={
 kimchi:["Hà bao thêu hoa mai","Túi thơm thêu sen","Dây kết bình an","Tua quạt kết ngọc","Hà bao uyên ương","Hài thêu hoa đào","Đai lưng thêu mây","Dây kết đồng tâm","Hài gấm thêu phượng","Khăn choàng bách điệp"],
 phanson:["Phấn gạo trắng","Phấn hoa nhài","Son hoa hồng","Yên chi má hồng","Phấn ngọc trai","Dầu hoa trà chải tóc","Son đỏ thắm","Trâm hoa lụa","Cao ngọc dung","Cao hoa quế"],
 thuchuc:["Thư thăm hỏi","Thư tạ ơn","Thiếp chúc xuân","Thiếp mừng sinh thần","Thư hỏi bệnh","Câu đối mừng xuân","Bài chúc thọ","Quạt đề lời tặng","Bài khuyên can","Tập lời khuyên răn"],
 phucthien:["Túi bình an","Tràng hạt tự xâu","Hoa đăng sen","Mâm quả cúng Phật","Chuông gió cầu an","Nữ giới chép tay","Nến sáp ong","Gia huấn chép tay","Áo bông cho trẻ côi","Chăn bông cho người già"]};
 for(const k in R)WKR[k]=R[k].map((n,i)=>({id:"r"+String(i+1).padStart(2,"0"),n,lv:WKR_LV[i],st:null,like:null}));
 for(const k in R){WKR_ART[k]=1;if(typeof ITEM_ART_TP!=="undefined"&&!ITEM_ART_TP.includes(k))ITEM_ART_TP.push(k)}})();
/* ---- the 4 lối of each kind = the course's 4 sub-styles ---- */
Object.assign(RCP_ST,{
 kimchi:[["s1","Hà bao, túi thơm",["r01","r02","r05"]],["s2","Thắt nút, tua kết",["r03","r04","r08"]],["s3","Hài thêu",["r06","r09"]],["s4","Đai, khăn choàng",["r07","r10"]]],
 phanson:[["s1","Phấn sáp",["r01","r02","r05"]],["s2","Son, yên chi",["r03","r04","r07"]],["s3","Dầu tóc, hoa cài",["r06","r08"]],["s4","Cao dưỡng nhan",["r09","r10"]]],
 thuchuc:[["s1","Thư thăm hỏi",["r01","r02","r05"]],["s2","Thiếp chúc mừng",["r03","r04","r07"]],["s3","Câu đối, quạt đề",["r06","r08"]],["s4","Lời khuyên can",["r09","r10"]]],
 phucthien:[["s1","Vật cầu an",["r01","r02","r05"]],["s2","Đồ cúng, hoa đăng",["r03","r04","r07"]],["s3","Chép sách nữ huấn",["r06","r08"]],["s4","Đồ cứu tế",["r09","r10"]]]});
Object.assign(RCP_BK,{kimchi:"Mẫu kim chỉ",phanson:"Phương phấn son",thuchuc:"Thư mẫu",phucthien:"Thiện thư"});
/* phấn son: pollen in jasmine / osmanthus / rose; nothing else new */
Object.assign(RCP_AL,{phanson:{r02:["phan"],r03:["phan"],r10:["phan"]}});
/* jrcp's load-time steps for the new kinds: first recipe of each lối open at bậc 0; books + hand-copied sheets as real items */
/* first recipe at bậc 0 + the sách phổ items of these kinds: jrcp's two passes run on every RCP_ST kind (jreg regEach), no copy here */
/* ---- a course is named like an art wherever a work's maker art is looked up (ARTS.find(x=>x.k===w.a)) ---- */
const TDS_VA=VIR.map(v=>({k:v.k,n:v.n,st:"tai",vir:1}));
(function(){const f0=Array.prototype.find;ARTS.find=function(fn,t){const r=f0.call(this,fn,t);return r!==undefined?r:f0.call(TDS_VA,fn,t)}})();
/* work level of a course = its bậc (j85 p.vir) */
(function(){const l0=wkLv;wkLv=function(p,a){if(tdsIsVir(a))return typeof virLv==="function"?virLv(p,a):(((p&&p.vir)||{})[a]||0);return l0.apply(this,arguments)}})();
/* ---------- lối opened by course level (2/4/5) ---------- */
function tdsOpenN(l){return BAL.tds.open.filter(x=>x<=(l|0)).length}
function tdsLevelSt(p,kind){const a=tdsVirOfKind(kind);return RCP_ST[kind].slice(0,tdsOpenN(virLv(p,a))).map(s=>s[0])}
/* her list ⊇ the level rule (idempotent: new games, old saves, saves from before D16) */
function tdsSync(){if(!S||!S.vir)return;const L=rcpKnown();for(const kind of tdsKinds()){const K=L[kind];for(const sid of tdsLevelSt(S,kind))if(!K.includes(sid))K.push(sid)}}
/* a save from before lối (no S.rcpL): jrcp opens lối by the old WKR_LV gate; Tứ đức lối follow the level rule instead */
(function(){const o0=rcpOldSave;rcpOldSave=function(){const had=!!(S&&S.rcpL);const r=o0.apply(this,arguments);try{if(!had&&S&&S.rcpL)for(const kind of tdsKinds())S.rcpL[kind]=tdsLevelSt(S,kind)}catch(e){}return r}})();
(function(){if(typeof deser!=="function")return;const d0=deser;deser=function(){const r=d0.apply(this,arguments);try{tdsSync()}catch(e){console.error("tds sync",e)}return r}})();
(function(){const s0=start;start=function(){const r=s0.apply(this,arguments);try{tdsSync()}catch(e){}return r}})();
/* ---------- NPC lối knowledge: learnt along their own taste (A13 note), Tứ đức by level ---------- */
function tdsNpcOrder(v,kind){const L=RCP_ST[kind],P=rcpProf(v)||{f:{},h:{}};const f=P.f[kind],h=P.h[kind];
 const rest=L.slice(1).map(s=>s[0]).filter(s=>s!==f&&s!==h).sort((x,y)=>rcpH(rcpSeed()+":"+v.id+":"+kind+x)-rcpH(rcpSeed()+":"+v.id+":"+kind+y));
 const O=[];if(f&&f!==L[0][0])O.push(f);O.push(...rest);if(h&&h!==L[0][0]&&!O.includes(h))O.push(h);return O}
rcpNpcKnows=function(v,kind,sid){const L=RCP_ST[kind];if(!L||!v)return false;if(L[0][0]===sid)return true;
 if(tdsVirOfKind(kind))return tdsLevelSt(v,kind).includes(sid);
 const l=Math.min(5,wkLv(v,WK[kind].a)|0);return tdsNpcOrder(v,kind).slice(0,BAL.tds.npcLv[l]).includes(sid)};
/* ---------- consort-favour teacher: thiện cảm cost follows the fee it replaces (coordinator decision b, bạc rule) ----------
   fee = 8% of her bổng (3..22 bạc); favour = 2 + fee/4, clamped 3..9 (the j8 gift scale: a gift worth pr bạc gives pr/12+2) */
function rcpFavorOf(p){return cl(Math.round(BAL.rcp.tFavB+tchFeeOf(p||S)/BAL.rcp.tFavK),BAL.rcp.tFavMin,BAL.rcp.tFavMax)}
Object.defineProperty(BAL.rcp,"tFavor",{configurable:true,enumerable:true,get(){try{return S?rcpFavorOf(S):4}catch(e){return 4}},set(v){}});
/* ---------- her Tứ đức lessons: pick what to make → material → the lesson → the work ---------- */
const TDV={pend:null,tch:null,go:0,fin:0,hit:null,raw:null,skip:0};window.TDV=TDV;
/* Tứ đức teacher fee: 0 while a consort teaches this lesson */
(function(){const c0=virCost;virCost=function(l,p){if(TDV.tch&&(!p||p===S)&&(TDV.go||TDV.fin||(window.TDS&&TDS.busy)))return 0;return c0.apply(this,arguments)}})();
function tdsTchCons(k){const l=virLv(S,k);if(typeof rcpConsTeach==="function"&&!rcpConsTeach())return[];return liveRivals(true).filter(v=>v.alive&&!v.out&&!v.confined&&v.vir&&(((v.vir[k]||0)>l)||(v.vir[k]||0)>=4)&&(rel(v,S)||0)>=BAL.rcp.tRel)
 .sort((a,b)=>(b.vir[k]||0)-(a.vir[k]||0)).slice(0,3)}
function tdsOK(k,mode){if(!S||S.dead||Q.length||S.mg)return false;const l=virLv(S,k);if(mode==="prac")return l>=5&&can(BAL.tds.pracK)&&S.suc>=BAL.tds.pracMin;if(l>=5)return false;
 if(mode==="self")return can(BAL.td.k)&&S.suc>=BAL.td.selfMin;return can(BAL.td.k)&&S.suc>=BAL.td.mMin}
function tdsReset(){TDV.pend=null;TDV.tch=null;TDV.hit=null;TDV.raw=null;TDV.skip=0;RCPT.k=null;RCPT.t=null}
function tdsTchAsk(k,then){const V=VIR.find(x=>x.k===k),fee=virCost(virLv(S,k),S),fav=rcpFavorOf(S),O=[];const t2=whyTime(BAL.td.k);
 const vt=typeof placeW==="function"&&placeW("t_vir")||"Ma ma giáo tập";O.push(kitOffBac({n:vt,fx:{},x:`tốn: ${BAL.td.k} khắc, Sức -${BAL.td.mSuc}, Bạc -${fee} · thành: tiến bộ ${crsGainW("teacher",virLv(S,k),1)}, dạy được mọi lối, ra một món`,go:()=>{TDV.tch=null;RCPT.k=k;RCPT.t="nq";then()}},fee));
 for(const v of tdsTchCons(k))O.push({n:`${rkName(v)} ${v.name} (${V.n} bậc ${v.vir[k]})`,fx:{},x:`tốn: ${BAL.td.k} khắc, Sức -${BAL.td.mSuc} · thành: tiến bộ ${crsGainW("teacher",virLv(S,k),1)}, dạy các lối nàng ta biết, ra một món · kèm: nợ nàng ta một ân, thiện cảm -${fav}, ${BAL.gift.askW} tuần quà tặng nàng ta không thành chân tình`,
  go:()=>{TDV.tch=String(v.id);RCPT.k=k;RCPT.t=String(v.id);then()}});
 if(!O.length){log(`Chưa có ai dạy ${V.n}: ${vt.toLowerCase()} cần ${fee} bạc${tdsTchCons(k).length||typeof rcpConsTeach!=="function"||rcpConsTeach()?`, chưa có phi tần giỏi ${V.n} quý ta (thiện cảm ${BAL.rcp.tRel})`:""}.`);return}
 O.push({n:"Thôi",fx:{},go:()=>tdsReset()});
 Q.push({act:1,t:`Học ${V.n} (${V.full}): ai dạy?`,who:pMe(),h:`<p>Có thầy dạy thì tiến nhanh hơn tự học, và mở được lối mới (tự học chỉ lên bậc; bậc 2, 4, 5 tự mở thêm một lối).</p><p class="past">${vt} nhận bạc theo bổng của ta (${fee} bạc${S.bac<fee?", ta chưa đủ":""}).${typeof rcpConsTeach!=="function"||rcpConsTeach()?` Phi tần giỏi ${V.n} dạy không lấy bạc, nhưng ta nợ nàng ta một ân (thiện cảm -${fav}).`:""}${t2?" "+t2:""}</p>`,opts:O});showModal();render()}
/* the lesson dialog in front: what to make (jwkr grid; teacher mode lets a new lối be picked) */
(function(){const l0=lessonVir;const W=function(k,mode){if(TDV.go||!tdsIsVir(k)||(mode!=="self"&&mode!=="master")||!tdsOK(k,mode)||typeof wkAsk!=="function")return l0.apply(this,arguments);
  tdsReset();const ask=()=>wkAsk(k,mode==="master"?"teacher":"self",()=>{});if(mode==="master")tdsTchAsk(k,ask);else ask()};
 lessonVir=W;window.lessonVir=W;window.__tdsL0=l0})();
/* step 2 for a Tứ đức kind: the material (bạc paid when the work is made, so a cancelled lesson costs nothing) */
(function(){const m0=wkrMat;wkrMat=function(kind,rid){const k=tdsVirOfKind(kind);if(!k)return m0.apply(this,arguments);
 const mode=KWR.mode,K=WK[kind],r=wkrOf(kind,rid),V=VIR.find(x=>x.k===k),l=virLv(S,k),lm=mode==="teacher"?"master":mode;const fee=lm==="master"?virCost(l,S):0,O=[];
 const st=rcpStOf(kind,rid),newSt=st&&!rcpKnows(S,kind,st[0]);
 for(let m=0;m<3;m++){const need=fee+(K.mat[m]||0);O.push({n:`${r.n} · ${K.mn[m]}`,fx:{},x:`${K.mat[m]?`tốn: Bạc -${K.mat[m]} (trả khi làm xong) · `:""}${wkOddsTxt(S,kind,m)}${K.fin?" · "+wkFinTxt(K):""}${newSt?` · kèm: học ${rcpStN(kind,st[0])}`:""}`,
  dis:S.bac<need?`thiếu bạc (cần ${need})`:"",go:()=>{if(S.bac<need){log(`Không đủ bạc: cần ${need}.`);tdsReset();return}tdsRun(k,lm,{kind,mat:m,r:rid,subj:wkrSubj(kind,r)})}})}
 O.push({n:"Thôi",fx:{},go:()=>tdsReset()});
 Q.push({act:1,t:`${r.n}: dùng vật liệu gì?`,who:pMe(),h:`${kitNumBox(`<p>Phẩm = phần chơi (0..10) + ${V.n} bậc ${l}: +${wkLvQ(S,k)} + vật liệu (thường +${WMAT[0]}, tốt +${WMAT[1]}, quý +${WMAT[2]}).</p><p class="past">${wkThTxt()}</p>`)}<p>Chỉ vật liệu quý mới thành Tuyệt phẩm.${fee?` Phí thầy ${fee} bạc trả riêng.`:""}</p>`,opts:O})}})();
/* run the lesson itself (j85 lessonVir, or review/tuduc-mg tdPlay); the work is made once the lesson really happened */
function tdsRun(k,mode,pick){TDV.pend=Object.assign({k,mode},pick);TDV.hit=null;
 if(mode==="prac"){if(!tdsOK(k,"prac")){tdsReset();return}apply({suc:-BAL.tds.pracSuc});spend(BAL.tds.pracK);TDV.hit={k};tdsFinish("tự học");save();render();return}
 /* a consort teaches: j85's "Theo ma ma giáo tập học …" log becomes "Học …" (tdsFinish names her; review r1) */
 const tv=mode==="master"&&TDV.tch?RV(+TDV.tch):null,lg=log;if(tv)log=function(h){return lg.call(this,typeof h==="string"?h.replace(/[Tt]heo ma ma giáo tập học ([^.]+)\./,(m,a)=>`Học ${a}.`).replace(/Học ([^ .]+) với ma ma giáo tập([^.]*)\./,(m,a,b)=>`Học ${a}${b}.`):h)};
 TDV.go=1;try{window.__tdsL0(k,mode)}finally{TDV.go=0;if(tv)log=lg}
 if(TDV.hit)tdsFinish(mode==="self"?"tự học":"học");save();render()}
/* review/tuduc-mg: its result (raw, skipped) decides the work; a skipped game makes no work (the "Học nhanh" rule) */
(function(){if(typeof tdFinish!=="function")return;const f0=tdFinish;tdFinish=function(k,mode,raw,skipped){TDV.raw=raw;TDV.skip=skipped&&!window.__bot?1:0;TDV.fin=1;let r;try{r=f0.apply(this,arguments)}finally{TDV.fin=0}
 try{if(TDV.hit)tdsFinish(mode==="self"?"tự học":"học")}catch(e){console.error("tds fin",e)}return r}})();
/* the lesson progress hook: hers marks the lesson as done; NPCs' lessons can end with a work; level-ups open lối / grant a recipe */
(function(){const a0=addVir;addVir=function(p,k,g){const before=p&&p.vir?p.vir[k]|0:0;const r=a0.apply(this,arguments);try{
  const after=p&&p.vir?p.vir[k]|0:0;
  if(p===S&&TDV.pend&&TDV.pend.k===k)TDV.hit={k};
  if(TDS_KIND[k]&&after>before)for(let l=before+1;l<=after;l++){const kind=TDS_KIND[k];
   if(p===S){const i=BAL.tds.open.indexOf(l);if(i>0){const t=rcpGrant(kind,RCP_ST[kind][i][0],`${VIR.find(x=>x.k===k).n} lên bậc ${l}`);if(t)log(`<span class="g">${t}</span>`)}}
   const gft=rcpLvGift(p,k);if(gft&&p===S)log(rcpLvTxt(gft))}
  if(p&&p!==S&&TDS_KIND[k]&&p.alive&&!p.out){p.inv=p.inv||[];if(p.inv.filter(e=>e.wk).length<BAL.tds.npcWkCap&&npcWhy("tdsMake",{p,k},()=>roll(BAL.tds.npcWk)))wkNpcMake(p,k)}/* npc-purpose G2: she makes a piece when her craft plan calls for one (skill to show, bạc to earn, a friend to give it to); npcWk = the success */
 }catch(e){console.error("tds vir",e)}return r}})();
function tdsFinish(how){const P=TDV.pend,k=P&&P.k;TDV.hit=null;if(!P){return}
 if(TDV.skip){log("Học nhanh: không ra thành phẩm.");tdsReset();return}
 const kind=P.kind,K=WK[kind],raw=TDV.raw!=null?cl(Math.round(TDV.raw),0,10):WAVG;
 if(K.mat[P.mat]){if(S.bac>=K.mat[P.mat])apply({bac:-K.mat[P.mat]});else P.mat=0}
 const st=rcpStOf(kind,P.r);if(P.mode==="master"&&st&&!rcpKnows(S,kind,st[0])){const t=rcpGrant(kind,st[0],TDV.tch?"phi tần dạy":"ma ma dạy");if(t)log(`<span class="g">${t}</span>`)}
 if(P.mode==="master"&&TDV.tch){const v=RV(+TDV.tch);if(v){relAdd(S,v,-rcpFavorOf(S));S.askAt=S.askAt||{};S.askAt[v.id]=wk();log(`${rkName(v)} ${v.name} dạy ta ${VIR.find(x=>x.k===k).n}: ta nợ nàng ta một ân (thiện cảm -${rcpFavorOf(S)}).`)}}
 try{wkFinishLesson(k,P,raw,how)}catch(e){console.error("tds work",e)}tdsReset()}
/* mastered course: practice still makes a work */
function tdsPractice(k){if(!tdsOK(k,"prac"))return;tdsReset();wkAsk(k,"prac",()=>{})}
document.addEventListener("click",ev=>{const b=ev.target.closest&&ev.target.closest("[data-tdsprac]");if(!b||b.disabled)return;ev.stopPropagation();tdsPractice(b.dataset.tdsprac)},true);
/* ---------- Tài nghệ › Tứ đức cards: real costs, "ra một món", the lối list ---------- */
(function(){if(typeof ktArtSkills!=="function")return;const s0=ktArtSkills;ktArtSkills=function(){const L=s0.apply(this,arguments);try{const t2=whyTime(BAL.td.k);for(const s of L){if(s.kind!=="vir"||!TDS_KIND[s.k])continue;const k=s.k,l=virLv(S,k),kind=TDS_KIND[k],W=WK[kind].w.toLowerCase();
  const fee=virCost(l,S),fav=rcpFavorOf(S),game=s.acts.some(h=>/trò nhỏ/.test(h))?"chơi một trò nhỏ · ":"";
  s.acts=s.acts.map(h=>/data-mode="self"/.test(h)?pbtn(`data-vlearn="${k}" data-mode="self"`,"Tự học",`${game}tốn: ${BAL.td.k} khắc, Sức -${BAL.td.selfSuc} · thành: tiến bộ ${crsGainW("self",l,1)}, ra một món ${W.replace(/, /g," hay ")}`,t2||(S.suc<BAL.td.selfMin?`Sức dưới ${BAL.td.selfMin}`:""))
   :/data-mode="master"/.test(h)?pbtn(`data-vlearn="${k}" data-mode="master"`,"Học với thầy",`${game}tốn: ${BAL.td.k} khắc, Sức -${BAL.td.mSuc}, Bạc -${fee} (${(typeof placeW==="function"&&placeW("t_vir")||"ma ma").toLowerCase()})${typeof rcpConsTeach!=="function"||rcpConsTeach()?` hoặc nợ một ân, thiện cảm -${fav} (phi tần giỏi ${VIR.find(x=>x.k===k).n})`:""} · thành: tiến bộ ${crsGainW("teacher",l,1)}, mở được lối mới, ra một món ${W.replace(/, /g," hay ")}`,t2||(S.suc<BAL.td.mMin?`Sức dưới ${BAL.td.mMin}`:"")):h);
  s.acts.push(pbtn(`data-rcpls="${k}"`,"Các lối, sách phổ",`thành: xem lối đã học và lối chưa học · biết cách học từng lối`,""))}}catch(e){console.error("tds skills",e)}return L}})();
/* the lối list of a course: lối opened by level are named with their level */
(function(){const o0=rcpListOpen;rcpListOpen=function(k){if(!TDS_KIND[k])return o0.apply(this,arguments);const V=VIR.find(x=>x.k===k),kind=TDS_KIND[k],R=[];
 RCP_ST[kind].forEach((s,i)=>{const kn=rcpKnows(S,kind,s[0]);const rs=s[2].map(r=>wkrOf(kind,r)).filter(Boolean).map(r=>!kn&&rcpHasR(S,kind,r.id)?`${r.n} (đã học món này)`:r.n).join(", ");
  R.push([`${WK[kind].w}: ${s[1]}`,[kn?"đã học":`chưa học: ${V.n} bậc ${BAL.tds.open[i]} tự mở, hoặc học với thầy, hoặc đọc ${RCP_BK[kind].toLowerCase()} «${s[1]}» (Nội vụ phủ, ${rcpBookPr(i)} bạc)`,rs],kn?"g":"n"])});
 kitModal({kind:"info",title:`${V.n} · ${V.full}: các lối`,sub:"Lối đã học, lối chưa học",html:`<div class="kinvrows">${kitRows(R)}</div>${kitFacts([`Bậc 2, 4, 5 mỗi bậc tự mở thêm một lối; thầy dạy hay sách phổ mở sớm hơn.`,"Mỗi lối mở vài món; món còn cần đủ bậc.","Mỗi người thích một lối, có người chê một lối: quà đúng lối người ấy thích mới được trọn."])}`})}})();
/* ---------- Tài nghệ › Tác phẩm: one card per course (what it makes, lối learnt, practice when mastered) ---------- */
/* the Tác phẩm tab lists ktWorksList() as kit cells (jtabs R11); the four Tứ đức courses join THAT list (same kit cell + môn frame as the art works, no private card).
   Was a ktWorksHTML() wrapper that nothing rendered since the cells (F-TDWORKS). */
(function(){if(typeof ktWorksList!=="function")return;const l0=ktWorksList;ktWorksList=function(){const L=l0.apply(this,arguments);try{const why=whyTime(BAL.tds.pracK)||(S.suc<BAL.tds.pracMin?`Sức dưới ${BAL.tds.pracMin}`:"");
  VIR.filter(V=>TDS_KIND[V.k]).forEach(V=>{const k=V.k,l=virLv(S,k),kind=TDS_KIND[k],K=WK[kind],kn=rcpKnown()[kind].length;
   const acts=l>=5?[pbtn(`data-tdsprac="${k}"`,"Tự học, làm đồ",`tốn: Sức -${BAL.tds.pracSuc}, ${BAL.tds.pracK} khắc · thành: một món ${K.w.toLowerCase()}, ${wkOddsTxt(S,kind,0)}`,why)]:[];
   L.push({kind:"wk",k,name:`${V.n} · ${V.full}`,kicker:artNm(l),level:l,prog:crsProg(S.vir,S.virp,k)/* KIT §21.2: phần inside the bậc (was raw points over the old l+2 width: «9/3») */,bar:l>=5?false:undefined,desc:`<span class="kchip n">lối đã học ${kn}/${RCP_ST[kind].length}</span> <span class="kchip n">${K.w}${K.fin?" · "+wkFinTxt(K):""}</span> <span class="kchip g">phẩm +${wkLvQ(S,k)}</span><br>${wkOddsTxt(S,kind,0)}`,next:"",acts,img:kitSkillArt("vir",k,V.n),info:`data-v85tab="${k}"`,can:!!(acts.length&&!why)})})}catch(e){console.error("tds works",e)}return L}})();
if(typeof KIT_GLOSS==="object")KIT_GLOSS["Lối Tứ đức"]="Mỗi môn Tứ đức làm ra một loại đồ (Công: đồ kim chỉ; Dung: phấn son tự chế; Ngôn: thư từ, lời chúc; Hạnh: vật cầu phúc, việc thiện), chia bốn lối. Lối đầu biết sẵn; bậc 2, 4, 5 mỗi bậc tự mở thêm một lối; thầy dạy hay sách phổ mở sớm hơn. Mỗi buổi học ra một món, đem tặng, dâng, bán như tác phẩm tài nghệ; quà đúng lối người nhận thích mới được trọn.";
(function(){const r0=render;render=function(){try{tdsSync()}catch(e){}return r0.apply(this,arguments)}})();
window.tdsSync=tdsSync;window.rcpFavorOf=rcpFavorOf;
