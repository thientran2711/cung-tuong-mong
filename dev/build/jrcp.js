/* ================= jrcp: LỐI (sub-styles), SÁCH PHỔ, KHẨU VỊ, DỊ ỨNG, QUÀ LẶP LẠI, THẦY DẠY (owner 15/11 19:50Z + coordinator 15/11; review/recipes)
   Builds on j83 (WK works), jwkr (WKR 10 recipes per kind), jgift (gift dialog), jpoison (chân tình). Numbers: BAL.rcp. Notes: dev/PROGRESS_recipes.md.
   1. LỐI: every work kind splits into 4 sub-styles (RCP_ST); each recipe r01..r10 belongs to one. A sub-style must be LEARNT before its
      recipes can be made (the art level still gates each recipe). The first sub-style of every kind is known from the start; old saves also
      keep every sub-style of a work she already made. Ways to learn: a book (Nội vụ phủ shop, bạc), a hand-copied sheet (a friendly consort,
      a ma ma, Thái hậu), or a TEACHER session (self-study raises the level but cannot open a new sub-style; the teacher can, even at bậc 5).
   2. KHẨU VỊ: every person (Hoàng thượng, Thái hậu, each consort) has, per kind, ONE favourite sub-style and often one disliked one, and
      maybe one allergy — deterministic per person (S.rcpSeed + person key). Hoàng thượng's old likes (món, hoa, khúc) are his favourites.
      A handmade gift pleases fully only in the favourite sub-style (+BAL.rcp.likeV); any other sub-style gives BAL.rcp.neutral of the value;
      a disliked one is refused when she knows it, else it backfires (angrier). Facets are learnt: the gift's result (observation), Hoàng
      thượng's old "biết sở thích" roads, monthly maid gossip, and two acts (Hỏi thái y: bạc · Sai cung nữ dò la: khắc + Lòng).
   3. QUÀ LẶP LẠI: the same work (recipe) or the same bought item to the same person within BAL.rcp.fatW weeks: ×BAL.rcp.fat[n]; past the
      ladder: bored (a small loss). Same rule for every giver.
   4. DỊ ỨNG: a work holding an allergen (RCP_AL) makes the receiver ill; when she gave it, someone may accuse her of trying to harm them →
      PEND.rcpacc (defend: kêu oan / thái y làm chứng / cung nữ nhận thay / nhận lỗi); NPC givers get evidence held against them (evA).
   5. THẦY DẠY: "Học với thầy" picks the teacher first: nữ quan / nhạc sư (bạc ∝ her bổng, BAL.rcp.tFeeK) or a skilled consort (no bạc,
      a favour: her thiện cảm −BAL.rcp.tFavor, no chân tình gift to her for BAL.gift.askW weeks). ================= */
Object.assign(BAL,{rcp:{likeV:2,neutral:.6,hateV:3,fatW:8,fat:[1,.6,.3,0],bored:{emp:1,th:2,rel:3},hateP:70,alP:35,alSuc:15,
 accP:55,accKnew:30,defB:45,defTy:25,tFeeK:.08,tFeeMin:3,tFavor:4,tRel:25,bookPr:[0,18,30,45],bookAdd:[0,12,20,30],mamaK:.15,mamaMin:12,sheetPr:8,shopN:2,gossipP:25,
 tyFeeK:.05,spyO:60,alEv:30,giftRel:40,giftP:6,thGiftP:4}});
/* sub-styles per kind: [id, name, recipes] — the first is known from the start; every kind has exactly 4 (owner 15/11 ~21:50Z) */
const RCP_ST={
mon:[["s1","Cơm canh món mặn",["r01","r02","r05"]],["s2","Bánh trái, chè ngọt",["r03","r06","r08"]],["s3","Hấp, tần bổ dưỡng",["r04","r07","r10"]],["s4","Món chua ngọt",["r09"]]],
 theu:[["s1","Thêu hoa cỏ",["r01","r04","r05","r06"]],["s2","Thêu chim muông",["r02","r03","r07"]],["s3","Thêu sơn thủy",["r08","r10"]],["s4","Thêu bình phong",["r09"]]],
 tranh:[["s1","Thủy mặc",["r01","r02","r03","r04"]],["s2","Hoa điểu",["r05","r06","r07"]],["s3","Sơn thủy",["r08","r09"]],["s4","Công bút",["r10"]]],
 bhoa:[["s1","Thanh nhã",["r01","r02","r03","r06"]],["s2","Hoa xuân hạ",["r04","r05"]],["s3","Hoa thu đông",["r07","r08"]],["s4","Phú quý",["r09","r10"]]],
 huong:[["s1","Hương hoa",["r01","r05","r06","r08"]],["s2","Hương thảo dược",["r02","r03","r04"]],["s3","Hương trầm",["r07"]],["s4","Hương kỳ nam, long diên",["r09","r10"]]],
 tho:[["s1","Ngũ ngôn",["r01","r03","r05"]],["s2","Thất ngôn",["r02","r04","r06","r09"]],["s3","Từ khúc",["r08","r10"]],["s4","Thơ đề quạt",["r07"]]],
 kinh:[["s1","Kinh Tịnh độ",["r01","r04","r05"]],["s2","Kinh Bát Nhã",["r03","r06","r07"]],["s3","Kinh Quán Âm",["r02","r08"]],["s4","Kinh Đại thừa",["r09","r10"]]],
 khuc:[["s1","Đàn tranh",["r01","r02","r03"]],["s2","Tiêu",["r04","r09"]],["s3","Tỳ bà",["r05","r10"]],["s4","Cổ cầm",["r06","r07","r08"]]],
 the:[["s1","Thế công",["r01","r04","r05"]],["s2","Thế thủ",["r02","r03","r06"]],["s3","Cổ phổ",["r08","r09"]],["s4","Thế biến hóa",["r07","r10"]]],
 mua:[["s1","Múa dân ca",["r01","r02"]],["s2","Múa lụa",["r03","r04","r05"]],["s3","Múa kiếm, xoay",["r06","r07"]],["s4","Múa cung đình",["r08","r09","r10"]]],
 ao:[["s1","May lụa mỏng",["r01","r05","r06"]],["s2","Thêu hoa trên áo",["r02","r03","r04"]],["s3","Gấm kim tuyến",["r07","r08"]],["s4","Áo phượng, nghê thường",["r09","r10"]]]};
const RCP_BK={mon:"Thực phổ",theu:"Mẫu thêu",tranh:"Họa phổ",bhoa:"Hoa phổ",huong:"Hương phổ",tho:"Thi pháp",kinh:"Kinh bản",khuc:"Nhạc phổ",the:"Kỳ phổ",mua:"Vũ phổ",ao:"Mẫu may"};
/* allergens: per recipe, and whole kinds (flowers: pollen; chess boards: lacquer) */
const RCP_ALN={hs:"hải sản (tôm, cá)",hat:"các loại hạt (hạnh nhân, hạt thông)",sam:"nhân sâm",phan:"phấn hoa",tram:"khói trầm",son:"sơn mài"};
const RCP_AL={mon:{r02:["hs"],r09:["hs","hat"],r07:["sam"],r10:["sam"]},huong:{r01:["phan"],r04:["phan"],r05:["phan"],r06:["phan"],r08:["phan"],r07:["tram"],r09:["tram"],r10:["tram"]},
 bhoa:"phan",the:"son"};
function rcpAlOf(w){if(!w)return[];const A=RCP_AL[w.kind];if(!A)return[];if(typeof A==="string")return[A];return (w.r&&A[w.r])||[]}
function rcpSt(kind,sid){return (RCP_ST[kind]||[]).find(s=>s[0]===sid)||null}
function rcpStOf(kind,rid){return (RCP_ST[kind]||[]).find(s=>s[2].includes(rid))||null}
function rcpStN(kind,sid){const s=rcpSt(kind,sid);return s?`lối «${s[1]}» (${WK[kind]?WK[kind].n.toLowerCase():kind})`:""}
function rcpH(s){let h=2166136261;s=String(s);for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}
/* the seed of everyone's tastes lives on the Emperor record too (a WORLD key in co-op: both players see the same truth; owner 15/11 20:30Z) */
function rcpSeed(){if(S.emp&&S.emp.rcpSeed)return S.emp.rcpSeed;if(!S.rcpSeed)S.rcpSeed=1+Math.floor(Math.random()*1e9);if(S.emp)S.emp.rcpSeed=S.rcpSeed;return S.rcpSeed}
/* ---------- what she knows ---------- */
function rcpKnown(){if(!S.rcpL){const L={};for(const k in RCP_ST)L[k]=[RCP_ST[k][0][0]];
  /* old saves: every sub-style of a work she already made (in the chest) */
  for(const e of (S.inv||[]))if(e&&e.wk&&e.wk.r&&(e.wk.by==="me"||e.wk.bn==="ngươi")){const s=rcpStOf(e.wk.kind,e.wk.r);if(s&&L[e.wk.kind]&&!L[e.wk.kind].includes(s[0]))L[e.wk.kind].push(s[0])}
  S.rcpL=L}for(const k in RCP_ST)if(!S.rcpL[k])S.rcpL[k]=[RCP_ST[k][0][0]];return S.rcpL}
/* a save made before sub-styles (no S.rcpL) keeps what she could make: every sub-style holding a recipe her art level had opened
   (the old WKR_LV gate). Every save from now on carries S.rcpL (ser below), so only true old saves take this road. */
function rcpOldSave(){if(!S||S.rcpL||!S.arts)return;const L=rcpKnown();for(const kind in RCP_ST){const l=wkLv(S,WK[kind].a);
  RCP_ST[kind].forEach(s=>{if(!L[kind].includes(s[0])&&s[2].some(id=>WKR_LV[+id.slice(1)-1]<=l))L[kind].push(s[0])})}}
(function(){if(typeof deser!=="function")return;const d0=deser;deser=function(){const r=d0.apply(this,arguments);try{if(S&&!S.rcpL)rcpOldSave()}catch(e){console.error("rcp old",e)}return r}})();
(function(){if(typeof ser!=="function")return;const s0=ser;ser=function(){try{if(S&&!S.dead)rcpKnown()}catch(e){}return s0.apply(this,arguments)}})();
/* NPCs: the first sub-style, plus each other with a chance that grows with her art level (deterministic) */
function rcpNpcKnows(v,kind,sid){const L=RCP_ST[kind];if(!L||!v)return false;if(L[0][0]===sid)return true;const l=wkLv(v,WK[kind].a);
 return rcpH(rcpSeed()+":"+v.id+":"+kind+sid)%100<20+12*l}
function rcpKnows(p,kind,sid){return p===S?rcpKnown()[kind].includes(sid):rcpNpcKnows(p,kind,sid)}
function rcpGrant(kind,sid,how){const L=rcpKnown()[kind];if(!L||L.includes(sid)||!rcpSt(kind,sid))return"";L.push(sid);const s=rcpSt(kind,sid);
 const n=s[2].map(r=>wkrOf(kind,r)).filter(Boolean).map(r=>r.n).join(", ");return `Học được ${rcpStN(kind,sid)}${how?" ("+how+")":""}: ${n}.`}
/* each sub-style's first recipe is open at bậc 0, so a teacher can open any sub-style from the start; the rest keep their level */
for(const kind in RCP_ST)for(const s of RCP_ST[kind]){const r=wkrOf(kind,s[2][0]);if(r)r.lv=0}
/* recipes she can make: art level AND a learnt sub-style */
(function(){const o0=wkrOpen;wkrOpen=function(p,kind){const L=o0.apply(this,arguments);if(!RCP_ST[kind])return L;return (WKR[kind]||[]).filter(r=>rcpOpenR(p,kind,r))}})();
/* ---------- art level-up: one new recipe of that art (owner 15/11 ~21:20Z), the same for every person ----------
   Each level gained grants ONE recipe of that art (p.rcpR, kept even above her level): a still-locked recipe of a sub-style she already
   knows (lowest level first); when every recipe of her known sub-styles is open, the basic (first) recipe of the next sub-style she has
   not learnt (basic recipes first; once every basic is hers, the lowest other recipe of a sub-style she has not learnt); the sub-style itself stays unlearnt (self-study never opens a sub-style). p.rcpLv = the art levels already rewarded. */
function rcpHasR(p,kind,rid){const G=p&&p.rcpR;return !!(G&&G[kind]&&G[kind].includes(rid))}
function rcpOpenR(p,kind,r){if(rcpHasR(p,kind,r.id))return true;if(r.lv>wkLv(p,WK[kind].a))return false;const s=rcpStOf(kind,r.id);return !s||rcpKnows(p,kind,s[0])}
function rcpLvGift(p,k){const kinds=wkKindsOf(k).filter(x=>RCP_ST[x]&&WKR[x]);let C=[];
 for(const kind of kinds)for(const r of WKR[kind]){const s=rcpStOf(kind,r.id);if(s&&rcpKnows(p,kind,s[0])&&!rcpOpenR(p,kind,r))C.push([kind,r])}
 if(!C.length)for(const kind of kinds){const s=RCP_ST[kind].find(s=>!rcpKnows(p,kind,s[0])&&!rcpHasR(p,kind,s[2][0]));if(s){const r=wkrOf(kind,s[2][0]);if(r)C.push([kind,r])}}
 if(!C.length)for(const kind of kinds)for(const s of RCP_ST[kind])if(!rcpKnows(p,kind,s[0]))for(const id of s[2]){const r=wkrOf(kind,id);if(r&&!rcpHasR(p,kind,id))C.push([kind,r])}
 if(!C.length)return null;const m=Math.min(...C.map(x=>x[1].lv));const [kind,r]=pick(C.filter(x=>x[1].lv===m));p.rcpR=p.rcpR||{};(p.rcpR[kind]=p.rcpR[kind]||[]).push(r.id);return{kind,r}}
function rcpLvInit(p){if(!p||!p.arts)return;p.rcpLv=p.rcpLv||{};for(const a in p.arts)if(p.rcpLv[a]==null)p.rcpLv[a]=p.arts[a]|0}
function rcpLvSync(p){const out=[];if(!p||!p.arts||!p.rcpLv)return out;for(const a in p.arts){const now=p.arts[a]|0;let l=p.rcpLv[a];if(l==null){p.rcpLv[a]=now;continue}
  while(l<now){l++;const g=rcpLvGift(p,a);if(g)out.push(g)}p.rcpLv[a]=now}return out}
function rcpLvTxt(g){const s=rcpStOf(g.kind,g.r.id);return `<span class="g">Học được: ${g.r.n}</span> (${WK[g.kind].n.toLowerCase()}${s?`, lối «${s[1]}»`:""}).`}
(function(){const a0=addArt;addArt=function(k,g){try{rcpLvInit(S)}catch(e){}const r=a0.apply(this,arguments);try{for(const x of rcpLvSync(S))log(rcpLvTxt(x))}catch(e){console.error("rcp lv",e)}return r}})();
(function(){if(typeof addArtP!=="function")return;const a0=addArtP;addArtP=function(p,k,g){if(p===S)return a0.apply(this,arguments);try{rcpLvInit(p)}catch(e){}const r=a0.apply(this,arguments);try{rcpLvSync(p)}catch(e){}return r}})();
(function(){if(typeof npcMonthly!=="function")return;const m0=npcMonthly;npcMonthly=function(v){try{rcpLvInit(v)}catch(e){}const r=m0.apply(this,arguments);try{rcpLvSync(v)}catch(e){}return r}})();
/* ---------- persons ---------- */
function rcpPK(r){return r==="emp"||r==="th"?r:r&&typeof r==="object"?(r===S?"me":"v"+r.id+(r.name||"")):""}
function rcpWho(r){return r===S?"Ta":r==="emp"?"Hoàng thượng":r==="th"?"Thái hậu":r&&r.name?`${rkName(r)} ${r.name}`:""}
function rcpThey(r){return r===S?"ta":r==="emp"?"bệ hạ":r==="th"?"Thái hậu":"nàng ta"}
const RCP_PC={};lifeStore("RCP_PC",()=>{for(const k in RCP_PC)delete RCP_PC[k]});
function rcpProf(r){const pk=rcpPK(r);if(!pk)return null;const seed=rcpSeed();const ck=seed+pk;if(RCP_PC[ck])return RCP_PC[ck];const f={},h={};
 for(const kind in RCP_ST){const L=RCP_ST[kind],x=rcpH(seed+":"+pk+":"+kind);f[kind]=L[x%L.length][0];
  if((x>>>8)%100<BAL.rcp.hateP){const O=L.filter(s=>s[0]!==f[kind]);h[kind]=O[(x>>>16)%O.length][0]}}
 if(pk==="emp"&&S.emp&&S.emp.likes){const E=S.emp.likes;const fit=(kind,lk)=>{const r=(WKR[kind]||[]).find(x=>x.like===lk);const s=r&&rcpStOf(kind,r.id);if(s){f[kind]=s[0];if(h[kind]===s[0])delete h[kind]}};
  fit("mon",E.dish);fit("bhoa",E.flower);fit("khuc",E.music)}
 const xa=rcpH(seed+":"+pk+":al");let a=xa%100<BAL.rcp.alP?Object.keys(RCP_ALN)[(xa>>>8)%6]:null;
 /* his favourite dish never makes him ill */
 if(a&&pk==="emp"&&S.emp&&S.emp.likes){const r=(WKR.mon||[]).find(x=>x.like===S.emp.likes.dish);if(r&&rcpAlOf({kind:"mon",r:r.id}).includes(a))a=null}
 return RCP_PC[ck]={f,h,a}}
/* facets: "f:<kind>" favourite · "h:<kind>" disliked (or none) · "a" allergy (or none) */
function rcpK(pk){S.rcpK=S.rcpK||{};return S.rcpK[pk]=S.rcpK[pk]||[]}
function rcpKn(r,fc){return rcpK(rcpPK(r)).includes(fc)}
function rcpFacets(){const F=["a"];for(const k in RCP_ST)F.push("f:"+k,"h:"+k);return F}
function rcpFacetTxt(r,fc){const P=rcpProf(r),who=rcpWho(r);if(fc==="a")return P.a?`${who} kiêng ${RCP_ALN[P.a]}: dùng phải là phát bệnh`:`${who} không kiêng thứ gì`;
 const [t,k]=fc.split(":");if(t==="f")return `${who} thích ${rcpStN(k,P.f[k])}`;return P.h[k]?`${who} không ưa ${rcpStN(k,P.h[k])}`:`${who} không chê lối ${WK[k].n.toLowerCase()} nào`}
function rcpLearn(r,fc,how){if(!r||!fc)return"";const K=rcpK(rcpPK(r));if(K.includes(fc))return"";K.push(fc);return `<span class="g">Ta biết được: ${rcpFacetTxt(r,fc)}${how?" ("+how+")":""}.</span>`}
function rcpUnknown(r){const K=rcpK(rcpPK(r));return rcpFacets().filter(f=>!K.includes(f))}
function rcpPeople(){const L=["emp"];if(!S.thDead)L.push("th");for(const v of liveRivals(true)){let met=true;try{if(typeof k61Named==="function")met=k61Named(v)}catch(e){}if(met)L.push(v)}return L}
/* ---------- giving: taste, repeats, allergy ---------- */
const RCP={real:0,last:null,ctx:null};
function rcpRK(r){return r==="emp"||r==="th"||r==="maid"?r:r&&r.id!=null?"v"+r.id:""}
function rcpLog(a){const W=BAL.rcp.fatW;a.rcpG=(a.rcpG||[]).filter(x=>wk()-x.w<W);return a.rcpG}
function rcpRep(a,r,id){if(!a||!id)return 0;const rk=rcpRK(r);return rcpLog(a).filter(x=>x.r===rk&&x.id===id).length}
function rcpRec(a,r,id){if(!a||!id)return;rcpLog(a).push({w:wk(),r:rcpRK(r),id})}
function rcpWid(w){return "w:"+w.kind+":"+(w.r||w.s||"")}
function rcpScale(ev,m){const f=ev.fx||{};for(const k of ["sung","th","hh","danh","an","maid"])if(f[k]!=null){f[k]=Math.round(f[k]*m);if(!f[k])delete f[k]}
 if(ev.rel!=null)ev.rel=Math.round(ev.rel*m);if(ev.v!=null)ev.v=Math.round(ev.v*m)}
function rcpNeg(ev,r,n){if(r==="emp")ev.fx={sung:-n};else if(r==="th")ev.fx={th:-n*2};else{ev.fx=ev.fx&&ev.fx.hh!=null?{hh:-n}:{};ev.rel=-n*2}ev.v=-n}
function rcpAdjust(ev,a,w,r){if(!ev||!ev.ok||r==="maid"||r===S||!r)return ev;const real=RCP.real||a!==S;const P=rcpProf(r);const N=[];ev.rcpHit=[];
 const st=w.r?rcpStOf(w.kind,w.r):null;const they=rcpThey(r);
 if(st&&P){const k=w.kind,sid=st[0],fav=P.f[k]===sid,hate=P.h[k]===sid,knF=a!==S||rcpKn(r,"f:"+k),knH=a!==S||rcpKn(r,"h:"+k);
  if(hate&&knH)return Object.assign(ev,{ok:false,why:`${they} không ưa ${rcpStN(k,sid)}`});
  if(hate&&real){rcpNeg(ev,r,BAL.rcp.hateV);ev.notes=[`${they} không ưa ${rcpStN(k,sid)}, càng phật ý`];ev.rcpHit.push("h:"+k);ev.rcpBad=1}
  else if(fav&&(real||knF)){ev.v=(ev.v||0)+BAL.rcp.likeV;const f=ev.fx;if(f.sung!=null)f.sung+=Math.ceil(BAL.rcp.likeV/2);if(f.th!=null)f.th+=BAL.rcp.likeV;if(ev.rel!=null)ev.rel+=BAL.rcp.likeV;if(f.hh!=null)f.hh+=BAL.rcp.likeV;
   N.push(`hợp ý: ${they} thích ${rcpStN(k,sid)}`);ev.rcpHit.push("f:"+k)}
  else{rcpScale(ev,BAL.rcp.neutral);N.push(knF?`chưa đúng lối ${they} thích, được ${Math.round(BAL.rcp.neutral*10)} phần 10`:`chưa rõ ${they} thích lối nào; lối khác chỉ được ${Math.round(BAL.rcp.neutral*10)} phần 10`);}}
 /* repeats: same work to the same person */
 if(!ev.rcpBad){const n=rcpRep(a,r,rcpWid(w)),F=BAL.rcp.fat;if(n>=F.length){const b=r==="emp"?BAL.rcp.bored.emp:r==="th"?BAL.rcp.bored.th:BAL.rcp.bored.rel;rcpNeg(ev,r,b);N.push(`đã tặng món này ${n} lần, ${they} chán rồi`)}
  else if(n>0){rcpScale(ev,F[n]);N.push(`lần thứ ${n+1} tặng món này trong ${BAL.rcp.fatW} tuần: được ${Math.round(F[n]*10)} phần 10`)}}
 /* allergy */
 const al=P&&P.a&&rcpAlOf(w).includes(P.a)?P.a:null;if(al){if(real){ev.rcpAl=al;rcpNeg(ev,r,BAL.rcp.hateV);ev.rcpBad=1;ev.notes=[`${they} kiêng ${RCP_ALN[al]}`];N.length=0}else if(rcpKn(r,"a"))N.push(`kèm: ${they} kiêng ${RCP_ALN[al]}, dùng phải sẽ phát bệnh, dễ tố ta mưu hại`)}
 ev.rcpN=N;if(real)RCP.last=ev;return ev}
(function(){const e0=wkEval;wkEval=function(a,w,r){const ev=e0.apply(this,arguments);try{rcpAdjust(ev,a,w,r)}catch(x){console.error("rcp",x)}return ev}})();
(function(){const g0=wkGainTxt;wkGainTxt=function(ev){let t=g0.apply(this,arguments);try{if(ev&&ev.rcpN&&ev.rcpN.length){const n=ev.rcpN.join("; ");t=/\)$/.test(t)?t.replace(/\)$/,`; ${n})`):`${t}${t?" · ":""}(${n})`}
  if(ev&&ev.v<0)t=t.replace(/\+-/g,"-")}catch(x){}return t}})();
(function(){const g0=wkGive;wkGive=function(a,r,ix){const e=a&&a.inv&&a.inv[ix],w=e&&e.wk;RCP.real=1;RCP.last=null;let s;try{s=g0.apply(this,arguments)}finally{RCP.real=0}
 if(!s||!w)return s;const ev=RCP.last;RCP.last=null;s=s.replace(/\+-/g,"-");try{rcpRec(a,r,rcpWid(w));
  if(a===S&&ev&&r!==S){const L=(ev.rcpHit||[]).map(f=>rcpLearn(r,f,"nhìn sắc mặt khi nhận quà")).filter(Boolean);if(L.length)s+=" "+L.join(" ")}
  if(ev&&ev.rcpAl)s+=" "+rcpAllergy(a,r,w,ev.rcpAl)}catch(x){console.error("rcp give",x)}return s}})();
/* bought items: only the repeat rule (taste is j8 IT.tg) */
(function(){const v0=giftVal;giftVal=function(it,r){let v=v0.apply(this,arguments);try{const c=RCP.ctx;if(c&&c.a&&it&&it.k&&r!==S){const n=rcpRep(c.a,r,"i:"+it.k),F=BAL.rcp.fat;v=n>=F.length?0:Math.round(v*F[n])}}catch(x){}return v}})();
(function(){const g0=giveTo;giveTo=function(a,r,ix){const e=a&&a.inv&&a.inv[ix];if(!e||e.wk)return g0.apply(this,arguments);RCP.ctx={a};let s;try{s=g0.apply(this,arguments)}finally{RCP.ctx=null}
 try{if(s)rcpRec(a,r,"i:"+e.k)}catch(x){}return s}})();
(function(){if(typeof giftEval!=="function")return;const g0=giftEval;giftEval=function(e,t){if(!e||e.wk)return g0.apply(this,arguments);RCP.ctx={a:S};let o;try{o=g0.apply(this,arguments)}finally{RCP.ctx=null}
 try{const n=rcpRep(S,t,"i:"+e.k);if(o&&o.ok&&n>0)o.x+=` · (đã tặng món này ${n} lần trong ${BAL.rcp.fatW} tuần: ${n>=BAL.rcp.fat.length?"không còn được gì":"được "+Math.round(BAL.rcp.fat[n]*10)+" phần 10"})`}catch(x){}return o}})();
/* chân tình: "made for this person" = their favourite sub-style too */
(function(){if(typeof gfFor!=="function")return;const f0=gfFor;gfFor=function(a,w,r){if(f0.apply(this,arguments))return true;try{if(w&&w.r&&r&&r!=="maid"&&r!==S){const s=rcpStOf(w.kind,w.r),P=rcpProf(r);return !!(s&&P&&P.f[w.kind]===s[0]&&(a!==S||rcpKn(r,"f:"+w.kind)))}}catch(x){}return false}})();
/* ---------- allergy: illness and the accusation ---------- */
function rcpAccuser(r,a){const q=queenP();if(q&&q!==a&&q!==r)return q;const L=liveRivals(true).filter(v=>v!==a&&v!==r&&v.alive&&!v.out);if(!L.length)return null;
 return L.sort((x,y)=>hostility(y,a)-hostility(x,a))[0]}
function rcpAllergy(a,r,w,al){const who=rcpWho(r),by=a===S?"ta":`${rkName(a)} ${a.name}`;let t=`<span class="r">${who} dùng ${w.n} của ${by} thì nổi mẩn, khó thở: ${who} kiêng ${RCP_ALN[al]}.</span>`;
 if(r&&typeof r==="object"){ap(r,{suc:-BAL.rcp.alSuc});t+=` ${r.name} Sức -${BAL.rcp.alSuc}.`;rcpRash(r,al,a)}
 if(a===S){const knew=rcpKn(r,"a");const L=rcpLearn(r,"a","phát bệnh trước mắt");if(L)t+=" "+L;
  const p=(r==="emp"||r==="th"?BAL.rcp.accP:cl(25+Math.round(hostility(r,S)/2),5,90))+(knew?BAL.rcp.accKnew:0);
  if(roll(cl(p,5,95))){const acc=r&&typeof r==="object"?r:rcpAccuser(r,S);pushDil(mkP("rcpacc",{t:rcpPK(r)==="emp"||rcpPK(r)==="th"?r:"v"+r.id,acc:acc?key(acc):null,wn:w.n,al,knew:knew?1:0}),"Bị tố mưu hại")}
  return t}
 if(r&&typeof r==="object"){if(roll(cl(BAL.rcp.alEv+Math.round(hostility(r,a)/2),5,90))){evA(r,a,1);newsAdd(a,"illicit",`${r.name} tố ${a.name} tặng đồ làm nàng phát bệnh.`)}}
 else{const q=rcpAccuser(r,a);if(q&&roll(BAL.rcp.accP))evA(q,a,1);newsAdd(a,"illicit",`${who} phát bệnh sau khi dùng đồ ${a.name} dâng.`)}
 return""}
/* the allergy rash (jrash, the one face condition for everyone) */
function rcpRash(p,al,by){try{if(typeof rashGive==="function")return rashGive(p,rashPick(RASH.sevW),`kiêng ${RCP_ALN[al]}`,by)||""}catch(e){console.error("rcp rash",e)}return""}
/* HER allergy (two-way): a gifted work holding her allergen makes HER ill the same way (Sức -alSuc, rash); she learns it; like an NPC
   receiver, she may hold evidence against the giver (same roll as rcpAllergy's NPC branch). Hooked on every way a gift reaches her chest. */
function rcpMeAl(w){try{const P=rcpProf(S);return P&&P.a&&rcpAlOf(w).includes(P.a)?P.a:null}catch(e){return null}}
function rcpAllergyMe(f,w,al){const by=f?`${rkName(f)} ${f.name}`:"";ap(S,{suc:-BAL.rcp.alSuc});
 let t=`<span class="r">Ta dùng ${w.n}${by?" của "+by:""} thì nổi mẩn, khó thở: ta kiêng ${RCP_ALN[al]}.</span> Sức -${BAL.rcp.alSuc}.`;
 rcpRash(S,al,f);const L=rcpLearn(S,"a","phát bệnh trước mắt");if(L)t+=" "+L;
 if(f&&typeof f==="object"&&f!==S){let h=0;try{h=hostility(S,f)||0}catch(e){}if(roll(cl(BAL.rcp.alEv+Math.round(h/2),5,90))){evA(S,f,1);t+=` Ta nắm 1 chứng cứ của ${f.name}.`}}
 return t}
function rcpInWrap(d,p){try{const e=p&&p.e,w=e&&e.wk;if(!d||!d.o||d.rcpMe||!w)return d;const al=rcpMeAl(w);if(!al)return d;d.rcpMe=1;
  const f=p.f!=null?byKey(p.f):null,kn=rcpKn(S,"a");
  if(kn)d.t=(d.t||"")+`<p class="past">Ta kiêng ${RCP_ALN[al]}: ${w.n} có thứ ấy.</p>`;
  for(const o of d.o){if(!o||typeof o.go!=="function")continue;if(kn&&/^Nhận/.test(o.n||""))o.x=(o.x||"")+` · kèm: ta kiêng ${RCP_ALN[al]}, nhận về dùng phải là nổi mẩn`;
   const g=o.go;o.go=function(){const n0=(S.inv||[]).length;const r=g.apply(this,arguments);try{const x=S.inv[S.inv.length-1];if(S.inv.length>n0&&x&&x.wk&&x.wk.n===w.n)log(rcpAllergyMe(f,w,al))}catch(z){console.error("rcp me",z)}return r}}}
 catch(x){console.error("rcp in",x)}return d}
for(const k of ["giftin","pgin"])(function(k){const g0=PEND[k];if(!g0)return;PEND[k]=function(p){return rcpInWrap(g0.apply(this,arguments),p)}})(k);
function rcpTgt(t){return t==="emp"||t==="th"?t:RV(+String(t).replace(/^v/,""))}
function rcpPayTy(){return Math.max(BAL.rcp.tFeeMin,Math.round((BAL.pay?BAL.pay[Math.min(7,S.rank|0)]:40)*BAL.rcp.tyFeeK))}
PEND.rcpacc=pp=>{const r=rcpTgt(pp.t);if(!r)return null;const acc=pp.acc!=null?byKey(pp.acc):null;const who=rcpWho(r),A=RCP_ALN[pp.al]||"";
 const big=r==="emp"||r==="th",sev=big?2:1;const base=BAL.rcp.defB+Math.round((S.duc||0)/3)+(S.mat||0)*4-(pp.knew?35:0);
 const o1=od(base),o2=od(base+BAL.rcp.defTy),fee=rcpPayTy();const accN=acc?(acc===S?"":`${rkName(acc)} ${acc.name}`):"";
 const fail=`bị phạt vì mưu hại ${who}, Danh -4${acc&&acc!==r?`, ${accN} nắm 1 chứng cứ của ta`:""}`;
 const lose=()=>{apply({danh:-4});if(acc&&acc!==S)evA(acc,S,1);punish(S,`dâng đồ làm ${who} phát bệnh`,sev)};
 const win=()=>{apply({danh:1});if(acc&&acc!==S&&acc!==r){relAdd(S,acc,-3)}log(`Ta được minh oan: ${who} vốn kiêng ${A}, ta không cố ý.`)};
 const O=[{n:`Kêu oan: ta không biết ${rcpThey(r)} kiêng ${A}`,fx:{},x:`${word(o1)} · thành: được minh oan, Danh +1 · hỏng: ${fail}`,go:()=>{if(roll(o1))win();else lose()}},
  {n:"Mời thái y làm chứng: chỉ là kiêng kỵ",fx:{bac:-fee},x:`${word(o2)} · thành: được minh oan, Danh +1 · hỏng: ${fail}`,go:()=>{if(roll(o2))win();else lose()}}];
 if(S.maid)O.push({n:`Để ${S.maid.name} nhận lỗi thay`,fx:{danh:-2},x:`thành: ta không bị phạt · kèm: ${S.maid.name} bị đánh, Lòng -30`,go:()=>{S.maid.loyal=cl((S.maid.loyal||0)-30,0,100);log(`${S.maid.name} quỳ nhận đã lỡ tay bỏ ${A} vào, bị đánh hai mươi trượng.`)}});
 O.push({n:"Nhận lỗi vô ý, xin chịu phạt nhẹ",fx:big?(r==="emp"?{sung:-3,danh:-2}:{th:-5,danh:-2}):{danh:-2},x:big?"":`thành: không bị phạt · kèm: ${r.name} oán ta thêm`,go:()=>{if(!big)relAdd(S,r,-5)}});
 return{who:acc&&acc!==S?(typeof pv==="function"?pv(acc):undefined):undefined,
  t:`<p>${who} dùng ${pp.wn} ta ${big?"dâng":"tặng"} thì nổi mẩn đỏ, khó thở; thái y nói ${rcpThey(r)} vốn kiêng ${A}.</p><p>${acc===r?`${who} cho rằng ta cố ý mưu hại nàng ta`:`${accN?accN+" tâu":"Có kẻ tâu"} rằng ta cố ý mưu hại ${who}`}.</p>${pp.knew?`<p class="past">Ta vốn biết ${rcpThey(r)} kiêng ${A}: khó chối.</p>`:""}`,o:O}};
/* ---------- books and hand-copied sheets (real items) ---------- */
function rcpBookK(kind,sid,copy){return `${copy?"wkp":"wkb"}_${kind}_${sid}`}
for(const kind in RCP_ST)RCP_ST[kind].forEach((s,i)=>{if(!i)return;for(const copy of [0,1]){const k=rcpBookK(kind,s[0],copy);
 IT[k]={n:copy?`Bản chép tay ${RCP_BK[kind].toLowerCase()} «${s[1]}»`:`${RCP_BK[kind]} «${s[1]}»`,kd:"Sách phổ",d:`Đọc: học ${rcpStN(kind,s[0])}`,pr:copy?BAL.rcp.sheetPr:BAL.rcp.bookPr[Math.min(3,i)],rk:0,tg:["rv"],bk:{kind,sid:s[0]}}}});
/* book price follows her bổng (owner balance rule 15/11 20:30Z): the palace teacher's fee + a step per sub-style (BAL.rcp.bookAdd) */
function rcpBookPr(i){return tchFeeOf(S)+BAL.rcp.bookAdd[Math.min(3,i)]}
function rcpBookPrices(){if(!S)return;for(const kind in RCP_ST)RCP_ST[kind].forEach((s,i)=>{if(i){const it=IT[rcpBookK(kind,s[0],0)];if(it)it.pr=rcpBookPr(i)}})}
(function(){const r0=render;render=function(){try{rcpBookPrices()}catch(e){}return r0.apply(this,arguments)}})();
function rcpBk(k){const it=IT[k];return it&&it.bk?it.bk:null}
(function(){const a0=itemArt;itemArt=function(key){try{const k=key&&typeof key==="object"?(key.wk?null:key.k):key;const b=k&&rcpBk(k);if(b){const n=`wkbook-${/^wkp_/.test(k)?"pho":b.kind}`,g=/^wkp_/.test(k)?0:Math.min(2,rcpSt(b.kind,b.sid)?RCP_ST[b.kind].findIndex(s=>s[0]===b.sid)-1:0);
  return{key:n,src:`img/item-${n}.webp`,src512:`img/item512/item-${n}.webp`,grade:g,gradeName:ITEM_GRADE[g]}}}catch(e){}return a0.apply(this,arguments)};window.itemArt=itemArt})();
/* the Nội vụ phủ tray carries BAL.rcp.shopN books she has not learnt (lower sub-styles first) */
function rcpShopBooks(){const L=[];for(const kind in RCP_ST){const K=rcpKnown()[kind];RCP_ST[kind].forEach((s,i)=>{if(i&&!K.includes(s[0]))L.push(rcpBookK(kind,s[0],0))})}return shuf(L).slice(0,BAL.rcp.shopN)}
(function(){const r0=restock;restock=function(){const x=r0.apply(this,arguments);try{S.shop=(S.shop||[]).concat(rcpShopBooks())}catch(e){}return x}})();
function rcpRead(ix){const e=S.inv[ix],b=e&&rcpBk(e.k);if(!b||S.dead||Q.length||!can(1))return;if(rcpKnows(S,b.kind,b.sid)){log(`Ta đã học ${rcpStN(b.kind,b.sid)} rồi.`);return}
 spend(1);log(rcpGrant(b.kind,b.sid,`đọc ${itm(e.k).n}`));save();render()}
function rcpBookRows(k){const b=rcpBk(k),a=itemArt(k),gr=KIT_GRADE[a?a.grade|0:0];const s=rcpSt(b.kind,b.sid),kn=rcpKnows(S,b.kind,b.sid);
 const R=s[2].map(r=>wkrOf(b.kind,r)).filter(Boolean).map(r=>`${r.n} (${r.lv?`${ARTS.find(x=>x.k===WK[b.kind].a).n} bậc ${r.lv}`:"mọi bậc"})`);
 return kitRows([["Phẩm",`<span class="ef n" style="color:${gr.c};font-weight:700">${gr.n}</span>`],["Được",[`đọc: học ${rcpStN(b.kind,b.sid)}`].concat(R),"g"],["Ghi chú",[kn?"ta đã học lối này":"ta chưa học lối này","đem tặng được, bán được"],"n"]])}
(function(){const r0=kitItemRows;kitItemRows=function(k){if(rcpBk(k))return rcpBookRows(k);return r0.apply(this,arguments)}})();
(function(){if(typeof kitShopEff!=="function")return;const e0=kitShopEff;kitShopEff=function(k){const b=rcpBk(k);if(b)return `đọc: học lối này${rcpKnows(S,b.kind,b.sid)?" (đã học)":""}`;return e0.apply(this,arguments)}})();
(function(){if(typeof kinvOpen!=="function")return;const o0=kinvOpen;kinvOpen=function(x){const g=x&&x.g;const b=g&&!g.wk&&rcpBk(g.k);if(!b)return o0.apply(this,arguments);const it=itm(g.k),i=g.i;
 const kn=rcpKnows(S,b.kind,b.sid);const B=[pbtn(`data-rcpread="${i}"`,"Đọc, học lối này",`tốn: 1 khắc · thành: học ${rcpStN(b.kind,b.sid)}`,kn?"đã học lối này":whyTime(1)),
  pbtn(`data-kinvact="gift" data-ix="${i}"`,"Tặng","tốn: 2 khắc · thành: chọn người nhận",whyTime(2)),pbtn(`data-kinvact="sell" data-ix="${i}"`,"Bán",`thành: Bạc +${Math.floor((it.pr||0)/2)}`,"")];
 const F=[];if(g.n>1)F.push(`Trong rương: ${g.n} món.`);const fr=kinvFrom(g.from);if(fr)F.push(fr+".");
 kitModal({kind:"info",title:it.n,sub:it.kd,itemPic:kitItem({src:x.src512||x.src,name:"",grade:x.grade,size:"lg",qty:g.n}).replace('<span class="kitn"></span>',''),
  html:`<div class="kinvrows">${rcpBookRows(g.k)}</div>${F.length?kitFacts(F):""}<div class="rbtn kinvacts">${B.join("")}</div>`})}})();
document.addEventListener("click",ev=>{const b=ev.target.closest&&ev.target.closest("[data-rcpread]");if(!b||b.disabled)return;ev.stopPropagation();const ix=+b.dataset.rcpread;
 try{if(typeof kitModalClose==="function")kitModalClose()}catch(e){}if(Q.length&&!Q[0].opts)closeModal();rcpRead(ix)},true);
/* ---------- the pick grid (jwkr): sub-style on every tile; unknown sub-styles locked, open only with a teacher ---------- */
const RCPT={k:null,t:null};
function rcpTchV(){return RCPT.t&&RCPT.t!=="nq"?RV(+RCPT.t):null}
wkrTile=function(kind,r,l){const gr=rcpHasR(S,kind,r.id),ok=gr||r.lv<=l,a=ARTS.find(x=>x.k===WK[kind].a);const s=rcpStOf(kind,r.id);const kn=gr||!s||rcpKnows(S,kind,s[0]);
 const tch=KWR.mode==="teacher"&&!kn&&(!rcpTchV()||rcpNpcKnows(rcpTchV(),kind,s[0]));const can2=ok&&(kn||tch);
 const eff=(s?`Lối ${s[1]}`:"")+(r.st?" · "+r.st.map(x=>x[0]).join(", "):"");
 const why=!ok?`Cần ${a.n} bậc ${r.lv}`:!kn&&!tch?`Chưa học lối «${s[1]}»: học với thầy, hoặc đọc ${RCP_BK[kind].toLowerCase()} «${s[1]}»`:"";const A=`data-kwr="${kind}" data-kwri="${r.id}"`;
 return `<div class="kshc kshpick${can2?"":" kshno"}" ${A}>`+
  `<span class="kshpic">${kitItem({src:wkrPic(kind,r,0),name:r.n,size:"slot",tip:r.n})}</span>`+
  `<span class="kshn" title="${r.n}">${r.n}</span><span class="kshe" title="${eff}">${eff}</span>`+
  `<span class="kshp">${gr&&(r.lv>l||!rcpKnows(S,kind,s[0]))?"đã học món này":r.lv?`${a.n} bậc ${r.lv}`:"mọi bậc"}</span>`+
  `<button type="button" class="kbtn kshgo" ${A} data-kwrgo="1"${can2?"":` disabled title="${why}"`}>${!ok?"Chưa mở":tch?"Học lối này":kn?"Làm":"Chưa học"}</button></div>`};
(function(){const b0=wkrBody;wkrBody=function(){const h=b0.apply(this,arguments);try{const kind=KWR.kind;if(!kind||!RCP_ST[kind])return h;const K=rcpKnown()[kind];
  const t=`Lối đã học: ${RCP_ST[kind].filter(s=>K.includes(s[0])).map(s=>s[1]).join(", ")}.${KWR.mode==="teacher"?` Thầy dạy được lối mới: chọn món ghi «Học lối này».`:` Lối mới: học với thầy, hoặc đọc sách phổ.`}`;
  return h.replace(/(<span class="kshm">[^<]*)(<\/span>)/,`$1 ${t}$2`)}catch(e){return h}}})();
/* teacher session with a new sub-style: learnt once the session starts */
(function(){const m0=wkrMat;wkrMat=function(kind,rid){const s=rcpStOf(kind,rid);const r0=KWR.run;if(KWR.mode==="teacher"&&s&&!rcpKnows(S,kind,s[0])){
  KWR.run=function(){const x=r0.apply(this,arguments);try{if(S.mg||RCPT.started){const t=rcpGrant(kind,s[0],"thầy dạy");if(t)log(`<span class="g">${t}</span>`)}}catch(e){}RCPT.started=0;return x}}
  try{return m0.apply(this,arguments)}finally{KWR.run=r0}}})();
/* ---------- teachers ---------- */
/* the palace teacher's fee: a share of the learner's monthly bổng (same for every consort: j85 npcStudy reads tchFeeOf) */
function tchFeeOf(p){return Math.max(BAL.rcp.tFeeMin,Math.round((BAL.pay?BAL.pay[Math.min(7,rkOf(p)|0)]:40)*BAL.rcp.tFeeK))}
function rcpFeeNq(){return tchFeeOf(S)}
function rcpTchName(k){return k==="cam"||k==="vu"?"Nhạc sư Giáo phường":k==="theu"||k==="nau"?"Ma ma Thượng công cục":"Nữ quan Thượng nghi cục"}
function rcpTchCons(k){const l=S.arts[k]||0;return liveRivals(true).filter(v=>v.alive&&!v.out&&!v.confined&&v.arts&&((v.arts[k]||0)>l||(v.arts[k]||0)>=4)&&(rel(v,S)||0)>=BAL.rcp.tRel)
 .sort((a,b)=>(b.arts[k]||0)-(a.arts[k]||0)).slice(0,3)}
/* j23 calls these: the fee shown / charged, and the favour paid once the session starts */
tchFee=function(k){return RCPT.k===k&&rcpTchV()?0:rcpFeeNq()};
tchPaid=function(k){try{const v=RCPT.k===k?rcpTchV():null;if(v){relAdd(S,v,-BAL.rcp.tFavor);S.askAt=S.askAt||{};S.askAt[v.id]=wk();log(`${rkName(v)} ${v.name} dạy ta ${ARTS.find(a=>a.k===k).n}: ta nợ nàng ta một ân (thiện cảm -${BAL.rcp.tFavor}).`)}}catch(e){}RCPT.started=1;RCPT.k=null;RCPT.t=null};
function rcpTchAsk(k,then){const a=ARTS.find(x=>x.k===k),fee=rcpFeeNq(),O=[];const t2=whyTime(2);
 O.push(kitOffBac({n:rcpTchName(k),fx:{},x:`Nắm chắc · tốn: 2 khắc, Sức -10, Bạc -${fee} · thành: tiến bộ +2..3, dạy được mọi lối`,go:()=>{RCPT.k=k;RCPT.t="nq";then()}},fee));
 for(const v of rcpTchCons(k))O.push({n:`${rkName(v)} ${v.name} (${a.n} bậc ${v.arts[k]})`,fx:{},x:`Nắm chắc · tốn: 2 khắc, Sức -10 · thành: tiến bộ +2..3, dạy các lối nàng ta biết · kèm: nợ nàng ta một ân, thiện cảm -${BAL.rcp.tFavor}, ${BAL.gift.askW} tuần quà tặng nàng ta không thành chân tình`,go:()=>{RCPT.k=k;RCPT.t=String(v.id);then()}});
 if(O.length===0){log(`Chưa có ai dạy: nữ quan cần ${fee} bạc, chưa có phi tần giỏi ${a.n} quý ta (thiện cảm ${BAL.rcp.tRel}).`);return}
 O.push({n:"Thôi",fx:{}});
 Q.push({act:1,t:`Học ${a.n}: ai dạy?`,who:pMe(),h:`<p>Thầy dạy giỏi hơn tự học, và chỉ thầy mới mở được lối mới (tự học chỉ lên bậc).</p><p class="past">${rcpTchName(k)} nhận bạc theo bổng của ta (${fee} bạc${S.bac<fee?", ta chưa đủ":""}). Phi tần giỏi nghề dạy không lấy bạc, nhưng ta nợ nàng ta một ân.${t2?" "+t2:""}</p>`,opts:O});showModal();render()}
(function(){const l0=lessonMode;lessonMode=function(k,mode){if(mode!=="teacher"||RCPT.go||S.mg||Q.length||(S.arts[k]||0)>=5)return l0.apply(this,arguments);
 RCPT.k=null;RCPT.t=null;rcpTchAsk(k,()=>{RCPT.go=1;try{lessonMode(k,"teacher")}finally{RCPT.go=0}})}})();
(function(){const o0=wkLessonOK;wkLessonOK=function(k,mode){if(mode==="teacher"&&!RCPT.go&&RCPT.k!==k){if(!S||S.dead||Q.length||S.mg||(S.arts[k]||0)>=5)return false;return can(2)&&S.suc>=10}return o0.apply(this,arguments)}})();
/* bậc 5: the teacher still teaches new sub-styles (a practice session that ends with a work in that sub-style) */
function rcpNewSt(k){return wkKindsOf(k).filter(x=>RCP_ST[x]).some(x=>RCP_ST[x].some(s=>!rcpKnows(S,x,s[0])))}
function rcpMaster(k){if(!S||S.dead||Q.length||S.mg||(S.arts[k]||0)<5||!can(2)||S.suc<10)return;
 rcpTchAsk(k,()=>{wkAsk(k,"teacher",()=>{if(!can(2)||S.suc<10)return;const fee=tchFee(k);if(S.bac<fee)return;apply({suc:-10,bac:-fee});tchPaid(k);spend(2);
  const pick=wkPend||{kind:WDEF[k],mat:0};wkPend=null;const an=ARTS.find(x=>x.k===k).n;S.mg={k,l:5,mode:"prac",wk:pick,pa:1};
  try{playArt({art:k,title:`Học ${an} với thầy`,onDone:(raw,o)=>{S.mg=null;if(o&&o.skipped)log("Học nhanh: không ra thành phẩm.");else wkFinishLesson(k,pick,cl(Math.round(raw),0,10),"học với thầy");render()}})}catch(x){S.mg=null}})})}
document.addEventListener("click",ev=>{const b=ev.target.closest&&ev.target.closest("[data-rcpmt],[data-rcpls],[data-rcpq]");if(!b||b.disabled)return;ev.stopPropagation();
 if(b.dataset.rcpmt)rcpMaster(b.dataset.rcpmt);else if(b.dataset.rcpls)rcpListOpen(b.dataset.rcpls);else rcpAskQ(b.dataset.rcpq)},true);
/* Tài nghệ cards: the teacher button with its real cost, the new-sub-style teacher at bậc 5, the learnt sub-styles */
(function(){if(typeof ktArtSkills!=="function")return;const s0=ktArtSkills;ktArtSkills=function(){const L=s0.apply(this,arguments);try{const t2=whyTime(2);for(const s of L){if(s.kind!=="art")continue;const k=s.k,l=S.arts[k]||0;
  s.acts=s.acts.map(h=>/data-mode="teacher"/.test(h)?pbtn(`data-learn="${k}" data-mode="teacher"`,"Học với thầy",`tốn: 2 khắc, Sức -10, Bạc -${rcpFeeNq()} (nữ quan) hoặc nợ một ân (phi tần giỏi nghề) · thành: tiến bộ +2..3, luôn hơn tự học 1, mở được lối mới`,t2||(S.suc<10?"Sức dưới 10":"")):h);
  if(l>=5&&rcpNewSt(k))s.acts.push(pbtn(`data-rcpmt="${k}"`,"Học lối mới với thầy",`tốn: 2 khắc, Sức -10, Bạc -${rcpFeeNq()} hoặc nợ một ân · thành: mở một lối mới, ra một tác phẩm lối ấy`,t2||(S.suc<10?"Sức dưới 10":"")));
  if(wkKindsOf(k).some(x=>RCP_ST[x]))s.acts.push(pbtn(`data-rcpls="${k}"`,"Các lối, sách phổ",`thành: xem lối đã học, lối chưa học và cách học`,""))}}catch(e){console.error("rcp skills",e)}return L}})();
function rcpListOpen(k){const a=ARTS.find(x=>x.k===k);const R=[];for(const kind of wkKindsOf(k).filter(x=>RCP_ST[x]))RCP_ST[kind].forEach((s,i)=>{const kn=rcpKnows(S,kind,s[0]);
  const rs=s[2].map(r=>wkrOf(kind,r)).filter(Boolean).map(r=>!kn&&rcpHasR(S,kind,r.id)?`${r.n} (đã học món này)`:r.n).join(", ");
  R.push([`${WK[kind].n}: ${s[1]}`,[kn?"đã học":`chưa học: học với thầy, hoặc đọc ${RCP_BK[kind].toLowerCase()} «${s[1]}» (Nội vụ phủ, ${rcpBookPr(i)} bạc)`,rs],kn?"g":"n"])});
 kitModal({kind:"info",title:`${a.n}: các lối`,sub:"Lối đã học, lối chưa học",html:`<div class="kinvrows">${kitRows(R)}</div>${kitFacts(["Mỗi lối mở vài món; món còn cần đủ bậc tài nghệ.","Mỗi người thích một lối, có người chê một lối: quà đúng lối người ấy thích mới được trọn."])}`})}
/* ---------- Tác phẩm tab: tastes known so far + the two ways to ask ---------- */
function rcpTasteRows(){return [rcpMeRow()].concat(rcpPeople().map(r=>{const P=rcpProf(r),K=rcpK(rcpPK(r));const F=[],H=[];let al="";
  for(const k in RCP_ST){if(K.includes("f:"+k))F.push(`${WK[k].n.toLowerCase()}: ${rcpSt(k,P.f[k])[1]}`);if(K.includes("h:"+k)&&P.h[k])H.push(`${WK[k].n.toLowerCase()}: ${rcpSt(k,P.h[k])[1]}`)}
  if(K.includes("a"))al=P.a?`kiêng ${RCP_ALN[P.a]}`:"không kiêng gì";const n=rcpUnknown(r).length;
  const L=[];if(F.length)L.push("thích "+F.join(", "));if(H.length)L.push("chê "+H.join(", "));if(al)L.push(al);L.push(n?`còn ${n} điều chưa rõ`:"đã rõ hết");
  return[rcpWho(r),L,F.length||al?"g":"n"]}))}
/* her own allergy (owner 15/11 recipes "dị ứng", S4-allergy / D39): the same rcpProf allergen as everyone, learnt the same ways (thái y, or the first rash) */
function rcpMeRow(){const P=rcpProf(S),kn=rcpKn(S,"a");return["Ta",[kn?(P.a?`kiêng ${RCP_ALN[P.a]}: nhận về dùng phải là nổi mẩn`:"không kiêng thứ gì"):"chưa rõ ta có kiêng thứ gì (hỏi thái y)"],kn?(P.a?"r":"g"):"n"]}
function rcpAskQ(how){if(S.dead||Q.length)return;const ty=how==="ty",k=ty?1:2,fee=rcpPayTy();if(!can(k))return;if(ty&&S.bac<fee)return;if(!ty&&!S.maid)return;
 const O=(ty?[S].concat(rcpPeople()):rcpPeople()).filter(r=>ty?!rcpKn(r,"a"):rcpUnknown(r).length).map(r=>({n:rcpWho(r),fx:ty?{bac:-fee}:{},x:ty?(r===S?"thành: biết ta có kiêng thứ gì":"thành: biết người ấy kiêng gì"):`${word(rcpSpyO())} · thành: biết thêm một điều người ấy thích, chê hay kiêng · hỏng: Lòng ${S.maid.name} -3`,
  go:()=>{spend(k);if(ty){log(rcpLearn(r,"a","thái y kể"))}else if(roll(rcpSpyO())){const u=rcpUnknown(r);log(rcpLearn(r,pick(u),`${S.maid.name} dò la`))}else{S.maid.loyal=cl((S.maid.loyal||0)-3,0,100);log(`${S.maid.name} dò la không ra gì, còn bị mắng.`)}}}));
 if(!O.length){log("Ta đã rõ hết những điều ấy.");return}O.push({n:"Thôi",fx:{}});
 Q.push({act:1,t:ty?"Hỏi thái y: ai kiêng thứ gì?":`Sai ${S.maid.name} dò la khẩu vị`,who:pMe(),h:ty?`<p>Thái y viện chép bệnh án cả cung: ai kiêng thứ gì, dùng phải là phát bệnh. Tốn 1 khắc, ${fee} bạc.</p>`:`<p>${S.maid.name} đi hỏi cung nhân hầu người ấy: thích lối nào, chê lối nào, kiêng thứ gì. Tốn 2 khắc.</p>`,opts:O});showModal();render()}
function rcpSpyO(){return cl(Math.round(BAL.rcp.spyO+((S.maid&&S.maid.loyal)||0)/5-20),5,95)}
(function(){if(typeof ktWorksHTML!=="function")return;const w0=ktWorksHTML;ktWorksHTML=function(){let h=w0.apply(this,arguments);try{
  for(const a of ARTS){const ks=wkKindsOf(a.k).filter(x=>RCP_ST[x]);if(!ks.length)continue;const n=ks.reduce((t,x)=>t+rcpKnown()[x].length,0),m=ks.reduce((t,x)=>t+RCP_ST[x].length,0);
   h=h.replace(new RegExp(`(data-skill="wk-${a.k}"[\\s\\S]*?<div class="kskdo">)`),`$1<span class="kchip n">lối đã học ${n}/${m}</span> `)}
  const fee=rcpPayTy(),acts=[pbtn(`data-rcpq="ty"`,"Hỏi thái y kiêng kỵ",`tốn: 1 khắc, Bạc -${fee} · thành: biết một người kiêng thứ gì`,whyTime(1)||(S.bac<fee?`thiếu bạc (cần ${fee})`:"")),
   pbtn(`data-rcpq="maid"`,"Sai cung nữ dò la khẩu vị",`${S.maid?word(rcpSpyO()):"Khó"} · tốn: 2 khắc · thành: biết thêm một điều một người thích, chê hay kiêng · hỏng: Lòng cung nữ -3`,whyTime(2)||(!S.maid?"chưa có cung nữ thân tín":""))];
  h+=kitSkillCard({kind:"wk",k:"taste",name:"Khẩu vị, kiêng kỵ",max:0,img:"",desc:`<div class="kinvrows">${kitRows(rcpTasteRows())}</div>`,acts,can:true})}catch(e){console.error("rcp works",e)}return h}})();
/* ---------- learning tastes by the old roads ---------- */
(function(){const d0=discover;discover=function(){const r=d0.apply(this,arguments);try{if(!r||roll(40)){const u=rcpUnknown("emp");if(u.length){log(rcpLearn("emp",pick(u)));return true}}}catch(e){}return r}})();
(function(){const m0=monthTick;monthTick=function(){const ev=m0.apply(this,arguments);try{if(S&&!S.dead&&!S.out){
  if(S.maid&&roll(BAL.rcp.gossipP)){const P=rcpPeople().filter(r=>rcpUnknown(r).length);if(P.length){const r=pick(P);const t=rcpLearn(r,pick(rcpUnknown(r)),`${S.maid.name} nghe cung nhân kể`);if(t)log(t)}}
  /* a friendly consort sends a copied sheet of a sub-style she knows and her friend does not; Thái hậu gives a sutra or embroidery copy */
  for(const v of liveRivals(true)){if(!v.alive||v.out||(rel(v,S)||0)<BAL.rcp.giftRel||!roll(BAL.rcp.giftP))continue;const L=[];
   for(const kind in RCP_ST)if(WK[kind].a===wkBestArt(v)||roll(30))RCP_ST[kind].forEach((s,i)=>{if(i&&rcpNpcKnows(v,kind,s[0])&&!rcpKnows(S,kind,s[0]))L.push(rcpBookK(kind,s[0],1))});
   if(L.length){pushDil(mkP("giftin",{f:key(v),e:{k:pick(L),from:key(v)}}),"Quà tặng");break}}
  if(!S.thDead&&(S.th||0)>=60&&roll(BAL.rcp.thGiftP)){const L=[];for(const kind of ["kinh","theu"])RCP_ST[kind].forEach((s,i)=>{if(i&&!rcpKnows(S,kind,s[0]))L.push(rcpBookK(kind,s[0],1))});
   if(L.length){const k=pick(L);S.inv.push({k,from:"th"});log(`<span class="g">Thái hậu ban ta ${itm(k).n}.</span> Cất vào rương.`)}}}}catch(e){console.error("rcp month",e)}return ev}})();
/* a ma ma of the imperial kitchen / workshops offers to copy out a sub-style (a small story reward with two roads: bạc or Sức) */
if(typeof ev==="function")ev("rcpMama",()=>S.rank>=0&&!S.out&&["mon","huong","theu","ao"].some(k=>RCP_ST[k].some(s=>!rcpKnows(S,k,s[0]))),
 ()=>{const k=pick(["mon","huong","theu","ao"].filter(k=>RCP_ST[k].some(s=>!rcpKnows(S,k,s[0]))));const s=pick(RCP_ST[k].filter(s=>!rcpKnows(S,k,s[0])));return{k,s:s[0]}},
 p=>{const s=rcpSt(p.k,p.s);if(!s)return null;const fee=Math.max(BAL.rcp.mamaMin,Math.round((BAL.pay?BAL.pay[Math.min(7,S.rank|0)]:40)*BAL.rcp.mamaK)),nm=p.k==="mon"?"Thượng thực cục":"Thượng công cục";return{
 t:`Một ma ma già ở ${nm} sang thỉnh an, kể rằng thuở trẻ từng hầu một vị nương nương rất giỏi ${rcpStN(p.k,p.s)}, còn nhớ cả phổ.<br>“Nếu ${kSay({srv:"f"},S,"{goi}")} muốn, nô tỳ chép lại cho.”`,o:[
 {n:"Biếu ma ma ít bạc, xin chép phổ",fx:{bac:-fee},x:`thành: có ${itm(rcpBookK(p.k,p.s,1)).n}`,go:()=>{S.inv.push({k:rcpBookK(p.k,p.s,1),from:"me"});log(`Ma ma chép lại ${itm(rcpBookK(p.k,p.s,1)).n}, ta cất vào rương.`)}},
 {n:"Phụ ma ma một buổi bếp núc, học tận tay",fx:{suc:-15},x:`thành: học ngay ${rcpStN(p.k,p.s)}`,go:()=>{const t=rcpGrant(p.k,p.s,"ma ma dạy tận tay");if(t)log(t)}},
 {n:"Cảm tạ, không cần",fx:{}}]}});
/* Hoàng thượng's performances: playing / dancing in the sub-style he loves (when she knows it and has learnt it) pleases more */
(function(){if(typeof pool!=="function")return;const p0=pool;pool=function(){const A=p0.apply(this,arguments);try{if(!Array.isArray(A)||!S||S.out)return A;const P=rcpProf("emp");
  for(const a of A){const kind=/^(Đánh đàn ở ngự hoa viên|Đàn khúc Phượng cầu hoàng)$/.test(a.n)?"khuc":/^(Múa trong yến tiệc|Kinh hồng vũ)$/.test(a.n)?"mua":null;if(!kind||!a.w)continue;
   const sid=P.f[kind];if(rcpKn("emp","f:"+kind)&&rcpKnows(S,kind,sid)){a.w=Object.assign({},a.w,{sung:(a.w.sung||0)+BAL.rcp.likeV+1});a.t=`${a.t||""} Theo ${rcpStN(kind,sid)}, lối ngài thích.`.trim()}}}catch(e){}return A}})();
if(typeof KIT_GLOSS==="object")KIT_GLOSS["Lối"]=`Mỗi loại tác phẩm chia vài lối (nấu: cơm canh, bánh trái, hấp tần; đàn: đàn tranh, tiêu, tỳ bà, cổ cầm). Phải học lối trước mới làm được món của lối ấy: đọc sách phổ (Nội vụ phủ bán), bản chép tay (người quen tặng) hoặc học với thầy. Tự học chỉ lên bậc, không mở lối mới. Mỗi người thích một lối, có người chê một lối: quà đúng lối người ấy thích mới được trọn, lối khác chỉ được ${Math.round(BAL.rcp.neutral*10)} phần 10, lối người ấy chê thì càng phật ý.`;
window.rcpProf=rcpProf;window.rcpKnown=rcpKnown;window.rcpGrant=rcpGrant;window.rcpLearn=rcpLearn;
