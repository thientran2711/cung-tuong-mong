/* ================= jdress: DRESS OFFENCES (owner 16/11 18:30Z, s20 chat; NPC agent law OD:L1386) =================
   Two offences, two acts, the same for her and for every NPC (same act, same odds oVP, same cooldown shape as jwd92b):
   · "Tố vượt phẩm" (ACT.vp, j92 wdAccuse, unchanged act): an item ABOVE the wearer's rank. Now also the visible jewellery rule
     (IT.rk above her rank, jwdinv vpItems) counts as a cause once SEEN, and the inquiry judges it (before: a jewellery breach could
     never be accused — wdCause/wdStatus only looked at the two WD slots).
   · "Tố xa xỉ" (ACT.xx, NEW): dressed too lavishly EVEN WITHIN her rank = the ONE luxury score luxOf(t) (jinv + jwdinv + jpet: every worn
     piece incl. the WD slots and the follow pet) above her rank allowance luxAllow(t) (now read from BAL.lux.allow, OD:L1267).
   EVIDENCE (owner: "only evidence lets her accuse"): p.dsn[wdKey(t)] = {w, sig, sc, bud, vj, by} — what p SAW of t's dress:
     · being at the SAME PLACE in the same buổi (j9 placeWhere → everyone; j2 goTo → her new place) — Xa xỉ is easy to see;
       the jewellery rank rule is visible; the hidden P of WD robes/hairpins is NOT learnt by looking (j92 rule kept);
     · a successful Dò la (spyFind, both ways) — the spy also learns the true phẩm of the worn WD pieces (wdKnowAll + wdSee sure);
     · her maid's "Sai đi dò la" talk (j2) — she reports one consort's dress the same way.
   A sighting is valid BAL.lux.xx.seenW tuần and only while the person still wears the same set (sig).
   Person card (KIT §28.14 K1 kitWearSlots): all 6 wear slots + the follow pet = 7 kitItem cells; kit corner tag mark ["Vượt phẩm","r"]
   on a piece above the wearer's rank and the Xa xỉ total vs allowance (kit label .kitl) — both ONLY when the player has SEEN it.
   ================================================================================================================== */
Object.assign(BAL.lux,{xx:{
 seenW:12,          /* a sighting / Dò la report is a cause for this many tuần (same as j92 wdCause remarks) */
 cdA:48,cdT:72,     /* pacing, same shape and size as Tố vượt phẩm (jwd92b WD.vpCdA / vpCdT): accuser / target, in tuần */
 hostMin:50,ghenMin:70,/* an NPC picks it, like Tố vượt phẩm, only with a motive (jwd92b) */
 ducT:-2,danhT:-4,  /* proven: the target Đức −2, Danh −4, and takes off her most lavish piece (it stays hers: within rank) */
 repT:2,            /* … and her "tiếng xa hoa" (jlux luxRep) +2 */
 danhA:2,rel:-10,   /* proven: accuser Danh +2, the target's feeling for the accuser −10 */
 waveDanhA:-2,      /* the judge waves it off: accuser Danh −2 */
 falseDanhA:-5,falseDanhT:2,falseRel:-12,/* not above her allowance after all: accuser Danh −5, target Danh +2, −12 */
 showBud:false}});   /* OD 08:10Z (line 187): NEVER show the rank allowance — only "Xa xỉ N" per item and the worn total; the player learns the limit from consequences. true = debug only */

/* ---------- what people see of a dress ---------- */
function dsVj(p){try{const r=rkOf(p);return (p.inv||[]).filter(e=>e&&e.w&&!e.h&&IT[e.k]&&IT[e.k].sl&&IT[e.k].rk>r).map(e=>e.k)}catch(e){return[]}}
function dsSig(p){let L=[];try{L=luxWorn(p).slice()}catch(e){}try{const P=p.petOn!=null&&typeof tsbPets==="function"?tsbPets(p)[p.petOn]:null;if(P)L.push("pet:"+P.t)}catch(e){}
 return L.sort().join("|")}
function dressRec(t,by){let x;try{x=luxOf(t)}catch(e){return null}return{w:wk(),sig:dsSig(t),sc:x.sc,bud:x.bud,vj:dsVj(t),by:by||""}}
function dressLook(obs,t,by,pre){if(!obs||!t||obs===t||t.alive===false)return null;const rec=pre?Object.assign({},pre,{vj:pre.vj.slice()}):dressRec(t,by);if(!rec)return null;const x=rec,vj=rec.vj;
 /* NPCs keep only sightings that matter (a cause), so saves stay small; she keeps every one (the person card shows it) */
 if(obs!==S&&x.sc<=x.bud&&!vj.length){if(obs.dsn)delete obs.dsn[wdKey(t)];return rec}
 obs.dsn=obs.dsn||{};obs.dsn[wdKey(t)]=rec;return rec}
function dressSeen(obs,t){const r=obs&&obs.dsn&&obs.dsn[wdKey(t)];if(!r||wk()-r.w>BAL.lux.xx.seenW)return null;return r}
function dressNow(obs,t){const r=dressSeen(obs,t);return r&&r.sig===dsSig(t)?r:null}
window.dressLook=dressLook;window.dressSeen=dressSeen;window.dressNow=dressNow;
/* everyone in the same place this buổi sees each other's dress (two-way; lãnh cung and confined people are not out in the palace) */
function dressLookPlace(){try{if(!S||S.dead||!S.where)return;const by={};
 for(const v of liveRivals(true)){if(!v.alive||v.out)continue;const k=whereOf(v);(by[k]=by[k]||[]).push(v)}
 if(!S.out){const k=whereOf(S);(by[k]=by[k]||[]).push(S)}
 for(const k in by){const G=by[k];if(G.length<2)continue;const P=G.map(b=>dressRec(b,"cùng chỗ"));G.forEach((b,j)=>{if(P[j])for(const a of G)if(a!==b)dressLook(a,b,"cùng chỗ",P[j])})}}catch(e){console.error("dressLookPlace",e)}}
(function(){if(typeof placeWhere==="function"){const p0=placeWhere;placeWhere=function(){const r=p0.apply(this,arguments);dressLookPlace();return r}}
 if(typeof goTo==="function"){const g0=goTo;goTo=function(){const was=S&&S.place;const r=g0.apply(this,arguments);try{if(S&&S.place!==was&&!S.out)for(const v of liveRivals(true))if(v.alive&&!v.out&&together(S,v)){dressLook(S,v,"cùng chỗ");dressLook(v,S,"cùng chỗ")}}catch(e){}return r}}})();

/* ---------- Dò la (both ways) also reports the dress: Xa xỉ, jewellery above rank, and the true phẩm of the worn robe / hairpin ---------- */
function dressSpyTxt(a,t,by){const rec=dressLook(a,t,by);if(!rec)return"";try{if(typeof wdKnowAll==="function")wdKnowAll(a,t);if(typeof wdSee==="function"&&typeof wdStatus==="function")wdSee(a,t,wdStatus(t),by,true)}catch(e){}
 if(a!==S)return"";let vp=[];try{vp=(vpItems(t)||[]).map(e=>IT[e.k]?IT[e.k].n:e.k)}catch(e){}
 const lux=`Xa xỉ ${rec.sc}${BAL.lux.xx.showBud?` (mức của nàng ${rec.bud})`:""}`;
 return `Y phục của ${wdNm(t)}: ${lux}${vp.length?`; vượt phẩm: ${vp.join(", ")}`:"; không có món nào vượt phẩm"}. `}
(function(){if(typeof spyFind!=="function")return;const s0=spyFind;spyFind=function(a,t){const r=s0.apply(this,arguments);let add="";try{add=dressSpyTxt(a,t,a===S?"dò la":(a.name||""))}catch(e){}return (r||"")+add}})();
/* her servants' "Sai đi dò la" (jwhy spyMaidRun: trusted maid, any maid / eunuch of her household): on success they also report the target's dress */
(function(){if(typeof spyMaidRun!=="function")return;const s0=spyMaidRun;spyMaidRun=function(v,ag){const ok=s0.apply(this,arguments);try{if(ok&&v){const m=ag||S.maid||{};const by=m.name||"cung nữ";const t=dressSpyTxt(S,v,by);if(t){try{log(`${by} báo: ${t}`)}catch(e){}try{noteAdd(v.id,t)}catch(e){}}}}catch(e){console.error(e)}return ok}})();
const DS_SPYX=" · thấy y phục nàng (Xa xỉ, vượt phẩm)";
function dsSpyX(A){return Array.isArray(A)?A.map(o=>o&&o.n==="Sai đi dò la"&&o.x&&o.x.indexOf(DS_SPYX)<0?Object.assign({},o,{x:o.x+DS_SPYX}):o):A}
(function(){if(typeof talkOpts==="function"){const t0=talkOpts;talkOpts=function(p){const A=t0.apply(this,arguments);try{return p&&p.kind==="maid"?dsSpyX(A):A}catch(e){return A}}}
 if(typeof hsvActs==="function"){const h0=hsvActs;hsvActs=function(){return dsSpyX(h0.apply(this,arguments))}}
 if(typeof spyPick==="function"){const k0=spyPick;spyPick=function(){const r=k0.apply(this,arguments);try{const q=Q[Q.length-1];if(q&&q.opts)for(const o of q.opts)if(o.kgt&&o.x)o.x=o.x.replace("chứng cứ +1 ·","chứng cứ +1, thấy y phục nàng ·")}catch(e){}return r}}})();

/* ---------- Tố vượt phẩm: the visible jewellery rule becomes a cause once seen, and the inquiry judges it ---------- */
(function(){if(typeof wdCause!=="function")return;const c0=wdCause;wdCause=function(obs,t){const c=c0.apply(this,arguments);if(c)return c;
 try{const r=dressNow(obs,t);if(r&&r.vj&&r.vj.length&&dsVj(t).length)return{st:"over",sure:true,by:r.by==="cùng chỗ"?"tận mắt thấy":r.by,jw:1}}catch(e){}return null};window.wdCause=wdCause})();
(function(){if(typeof wdAccuse!=="function")return;const a0=wdAccuse;wdAccuse=function(a,t){let J=[];try{J=dsVj(t)}catch(e){}let st="ok";try{st=wdStatus(t)}catch(e){}
 if(!J.length||st==="tang")return a0.apply(this,arguments);
 const dropJ=()=>{t.inv=(t.inv||[]).filter(e=>!(e&&e.w&&!e.h&&IT[e.k]&&IT[e.k].sl&&IT[e.k].rk>rkOf(t)))};
 if(st==="over"){const r=a0.apply(this,arguments);if(/>thành</.test(r||"")){dropJ();return r+`${J.map(k=>IT[k].n).join(", ")} cũng bị tịch thu. `}return r}
 /* the outfit itself is fine, but she wears jewellery above her rank: judged by the same odds, the same numbers as a Vượt phẩm outfit */
 const judge=judgeName(t),A0=wdNmC(a),T0=wdNm(t);for(const o of consorts()){try{dressLook(o,t,judge)}catch(e){}}
 const nm=J.map(k=>IT[k].n).join(", ");
 try{a.vpA92=wk();t.vpT92=wk()}catch(e){}
 if(!roll(oVP(a))){ap(a,{danh:-2});relAdd(a,t,-10);return `${A0} tố ${T0} vượt phẩm (${nm}), ${judge} bỏ qua, chỉ dặn lần sau giữ ý. ${a===S?"Danh -2. ":""}`}
 relAdd(a,t,-10);ap(a,{danh:2});dropJ();ap(t,{danh:-6});punish(t,"ăn mặc vượt phẩm",1);
 return `${A0} tố ${T0} vượt phẩm: <span class="${t===S?"r":"g"}">thành</span>. ${nm} bị tịch thu. ${wdNmC(t)} Danh -6. `};window.wdAccuse=wdAccuse})();

/* ---------- TỐ XA XỈ (act xx) ---------- */
function xxCause(obs,t){if(!obs||!t||obs===t)return null;const r=dressNow(obs,t);return r&&r.sc>r.bud?r:null}
window.xxCause=xxCause;
/* the most lavish worn piece comes off (jewellery: unworn into her chest; WD hairpin: taken off; never the robe or the veil) */
function xxStrip(t){const C=[];for(const e of (t.inv||[]))if(e&&e.w&&!e.h&&IT[e.k]&&IT[e.k].sl)C.push({e,v:luxPiece(e.k),n:IT[e.k].n});
 try{const w=wdOf(t);if(w.tram&&w.tram.from!=="base"){const it=wdItem(w.tram);if(it)C.push({tram:1,v:luxPiece(it.k),n:it.n})}}catch(e){}
 if(!C.length)return"";const b=C.sort((x,y)=>y.v-x.v)[0];if(b.tram)wdTakeOff(t,"tram");else delete b.e.w;return b.n}
function xxAccuse(a,t){const B=BAL.lux.xx;const c=xxCause(a,t);let x;try{x=luxOf(t)}catch(e){x={sc:0,bud:1}}const judge=judgeName(t),A0=wdNmC(a),T0=wdNm(t);
 for(const o of consorts()){try{dressLook(o,t,judge)}catch(e){}}/* the inquiry makes it public */
 const lux=`Xa xỉ ${x.sc}${BAL.lux.xx.showBud?`, mức của ${t===S?"ngươi":"nàng"} ${x.bud}`:""}`;
 if(x.sc<=x.bud){ap(a,{danh:B.falseDanhA});ap(t,{danh:B.falseDanhT});relAdd(a,t,B.falseRel);
  return `${A0} tố ${T0} ăn mặc xa xỉ; <span class="${a===S?"r":"g"}">tra xét ra ${T0} không quá mức</span> (${lux}), ${a===S?"ngươi":wdNm(a)} bị quở vì tố bừa. Danh ${B.falseDanhA}, ${T0} Danh +${B.falseDanhT}. `}
 if(!roll(oVP(a))){ap(a,{danh:B.waveDanhA});relAdd(a,t,B.rel);return `${A0} tố ${T0} ăn mặc xa xỉ (${lux}), ${judge} bỏ qua, chỉ dặn lần sau giữ ý. ${a===S?"Danh "+B.waveDanhA+". ":""}`}
 relAdd(a,t,B.rel);ap(a,{danh:B.danhA});const off=xxStrip(t);ap(t,{duc:B.ducT,danh:B.danhT});
 try{t.luxRep=Math.min(BAL.lux.repMax,(t.luxRep||0)+B.repT)}catch(e){}
 return `${A0} tố ${T0} ăn mặc xa xỉ (${lux}): <span class="${t===S?"r":"g"}">thành</span>. ${off?off+" phải tháo ra. ":""}${wdNmC(t)} Đức ${B.ducT}, Danh ${B.danhT}. `}
window.xxAccuse=xxAccuse;
A("xx","Tố xa xỉ",{c:{},ok:(a,t)=>!!xxCause(a,t),o:a=>oVP(a),x:"cần đã thấy (cùng chỗ, hoặc dò la): nàng ăn mặc quá mức của phẩm mình",f:(a,t)=>xxAccuse(a,t)});
/* pacing, same shape as Tố vượt phẩm (jwd92b), for every accuser and every target */
(function(){const cd=(o,k,n)=>o&&o[k]!=null&&wk()-o[k]<n;const V=ACT.xx,v0=V.ok,vf=V.f;
 V.ok=function(a,t){if(cd(a,"xxA",BAL.lux.xx.cdA)||cd(t,"xxT",BAL.lux.xx.cdT))return false;return v0.apply(this,arguments)};
 V.f=function(a,t){if(cd(a,"xxA",BAL.lux.xx.cdA)||cd(t,"xxT",BAL.lux.xx.cdT))return"";try{a.xxA=wk();t.xxT=wk()}catch(e){}return vf.apply(this,arguments)}})();
/* NPCs choose it like any scheme, with the same motive gate and weight as Tố vượt phẩm (jwd92b) */
(function(){if(typeof mindMenu!=="function")return;const m0=mindMenu;mindMenu=function(v,t){const O=m0.apply(this,arguments);
 try{if(Array.isArray(O)&&v&&v!==S&&t&&ACT.xx.ok(v,t)){const h=hostility(v,t),g=ghenOf(v,t);if(h>=BAL.lux.xx.hostMin||g>=BAL.lux.xx.ghenMin)O.push(["xx",(.4+h/100+g/150)*persW(v,"vp")])}}catch(e){}return O}})();
/* every list that names Tố vượt phẩm names Tố xa xỉ too (person card group, danger band, sent-by-servant, public in co-op, quiet-life vow, emotions, defence orders) */
try{AOUT.xx=[`nàng bị quở: Đức ${BAL.lux.xx.ducT}, Danh ${BAL.lux.xx.danhT}, tháo món xa xỉ nhất; ngươi Danh +${BAL.lux.xx.danhA}`,`nàng không quá mức: Danh ${BAL.lux.xx.falseDanhA}, thù ${BAL.lux.xx.falseRel} · hoặc bị bỏ qua: Danh ${BAL.lux.xx.waveDanhA}`]}catch(e){}
try{LACK.xx=t=>{if(xxCause(S,t))return"";const r=dressSeen(S,t);if(r&&r.sig!==dsSig(t))return"nàng đã thay đồ khác từ lúc ngươi thấy";if(r)return"lần ngươi thấy, nàng không ăn mặc quá mức";return"chưa thấy nàng ăn mặc thế nào: gặp nàng cùng chỗ, hoặc dò la"}}catch(e){}
try{J78VERB.xx="tố {t} ăn mặc xa xỉ";HARMK["Tố xa xỉ"]="xx";ACTDOM.xx=ACTDOM.vp||"Danh";AD_ACTNAME["Tố xa xỉ"]="xx"}catch(e){}
try{const g=RVGRP.find(x=>x[0]==="Hại nặng");if(g&&!g[1].includes("xx")){const i=g[1].indexOf("vp");g[1].splice(i>=0?i+1:g[1].length,0,"xx")}}catch(e){}
try{if(!BANDS[2][2].includes("xx"))BANDS[2][2].push("xx")}catch(e){}
try{for(const L of [DIRTY,RT_HARM,EMO_HARM,WHY_NOSEND])if(L&&!L.includes("xx"))L.push("xx")}catch(e){}
try{if(ORD70&&ORD70.giuchung&&!ORD70.giuchung.acts.includes("xx"))ORD70.giuchung.acts.push("xx")}catch(e){}

/* ---------- K1 wear row: 6 wear slots + the follow pet (KIT §28.14, kitItem cells; marks only when seen) ---------- */
const DS_SLOTS=[["tram","Cài tóc"],["wrist","Đeo tay"],["waist","Đeo eo"],["scent","Túi thơm"],["veil","Khăn che mặt"],["y","Y phục"],["pet","Theo hầu"]];
function dsGrade(k){try{const a=typeof itemArt==="function"?itemArt(k):null;return a?a.grade|0:0}catch(e){return 0}}
/* the 7 cells of p as data: {slot,label,empty,k,name,grade,src,lux,over} */
function dressSlots(p){const out=[];let w={};try{w=wdOf(p)}catch(e){}
 for(const [sl,label] of DS_SLOTS){let c={slot:sl,label,empty:true,name:label};
  try{if(sl==="tram"||sl==="y"){const e=w[sl],it=wdItem(e);if(it)c={slot:sl,label,k:it.k,name:it.n,grade:it.g,src:kitItemSrc(it.k,it.icon),lux:luxPiece(it.k),over:wdP(e,p)>wdPOf(p)&&!(it.nt&&e.own===wdKey(p)),pKnown:wdKnowsE(e)}}
   else if(sl==="veil"){if(typeof veilOn==="function"&&veilOn(p))c={slot:sl,label,name:"Khăn che mặt",grade:veilGrade(p),src:veilSrc(p),lux:0}}
   else if(sl==="pet"){const P=p.petOn!=null&&typeof tsbPets==="function"?tsbPets(p)[p.petOn]:null;if(P){const T=petT(P);c={slot:sl,label,k:P.t,name:T.n,grade:Math.min(4,T.tr|0),src:petPSrc(P,false),lux:petLux(P.t)}}}
   else{const e=(p.inv||[]).find(e=>e&&e.w&&!e.h&&IT[e.k]&&IT[e.k].sl===sl);if(e)c={slot:sl,label,k:e.k,name:IT[e.k].n,grade:dsGrade(e.k),src:(typeof keqArt==="function"?keqArt(e.k):"")||kitItemSrc(e.k),lux:luxPiece(e.k),over:IT[e.k].rk>rkOf(p),pKnown:true}}}catch(e){}
  out.push(c)}
 return out}
window.dressSlots=dressSlots;
/* what the PLAYER may see on p's row: her own always; someone else's marks only from a current sighting */
function dressView(p){const me=p===S;const L=dressSlots(p);const r=me?null:dressNow(S,p);const seen=me||!!r;
 let x=null;try{x=luxOf(p)}catch(e){}
 for(const c of L)c.mark=seen&&c.over&&c.pKnown?["Vượt phẩm","r"]:null;
 const lux=seen&&x?{sc:me?x.sc:r.sc,bud:me?x.bud:r.bud}:null;return{L,lux,seen}}
window.dressView=dressView;
(function(){if(typeof kitWearSlots!=="function")return;kitWearSlots=function(p,opts){try{if(!p||typeof wdSlots!=="function")return"";const me=p===S;const V=dressView(p);
 const L0=wdSlots(p);const lab=L0[0]&&L0[0].label?[L0[0].label,L0[0].labelKey==="ok"?"ok":L0[0].labelKey==="under"?"n":"no"]:null;
 const who=me?"me":(p.id!=null?p.id:"");
 const cells=V.L.map(c=>kitItem({src:c.empty?"":c.src,name:c.name,grade:c.grade,empty:!!c.empty,size:(opts&&opts.size)||"sm",mark:c.mark||null,lux:c.empty?0:(V.seen?c.lux:0),
   data:`data-kwear="${c.slot}" data-kwho="${who}" role="button" tabindex="0"`,tip:`${c.label}: ${c.empty?"trống":c.name}${c.mark?" · Vượt phẩm":""}`})).join("");
 const labs=[];if(lab)labs.push(`<span class="kitl kitl-${lab[1]}">${lab[0]}</span>`);
 if(V.lux)labs.push(`<span class="kitl kitl-${BAL.lux.xx.showBud&&V.lux.sc>V.lux.bud?"no":"n"}">Xa xỉ ${V.lux.sc}${BAL.lux.xx.showBud?" / "+V.lux.bud:""}</span>`);
 return `<div class="kwear kwear7${opts&&opts.cls?" "+opts.cls:""}">${cells}${labs.length?`<span class="kwearl">${labs.join(" ")}</span>`:""}</div>`}catch(e){console.error("kitWearSlots7",e);return""}}})();
/* tap a cell of someone else's row (the j92 handler covers Trâm cài / Y phục): the item, and what she knows */
document.addEventListener("click",ev=>{const t=ev.target.closest&&ev.target.closest("[data-kwear]");if(!t)return;const sl=t.dataset.kwear,who=t.dataset.kwho;if(who==="me"||sl==="tram"||sl==="y")return;
 const v=(typeof rivals!=="undefined"&&rivals.find(r=>String(r.id)===who))||null;if(!v)return;const c=dressSlots(v).find(x=>x.slot===sl);if(!c)return;const r=dressNow(S,v);
 kitModal({kind:"info",title:`${c.label} của ${v.name}`,facts:[{who:v,text:c.empty?"Không mang gì.":`${c.name}${c.lux&&r?" · Xa xỉ "+c.lux:""}`},
  r?(c.over?"Món này vượt phẩm của nàng (Tố vượt phẩm).":"Ngươi đã thấy nàng mang món này."):"Ngươi chưa thấy tận mắt: gặp nàng cùng chỗ, hoặc dò la.",
  "Tố vượt phẩm · Tố xa xỉ: thẻ người của nàng, nhóm Hại nặng."],btn:"Đã hiểu"})},true);
