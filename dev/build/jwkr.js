/* ================= J83 OPTION A · RECIPES (owner 11/15 12:10Z + 12:25Z): every kind of handmade work has 10 recipes / patterns, each with
   its own picture at each of the 4 tiers (the higher tier = the SAME work, finer). Flow: pick WHAT to make first (kit tile grid, the recipe's
   picture, locked by the art's level) → pick the material (thường / tốt / quý, the j83 cards with the real odds) → the kind's own game
   (jwkg) plays with THAT recipe (cooking: the recipe's ingredients and heat steps) → the work is that recipe, picture by tier.
   Old saves: a work without `wk.r` keeps the old tier picture and name. NPC works get a recipe they can make (same rule as her).
   Pictures: img/item-tp-<kind>-<rid>-b<1..4>.webp (+ item512/); a kind whose pictures are not drawn yet (not in WKR_ART) falls back
   to the old tier picture img/item-tp-<kind>-b<n>.webp. ================= */
const WKR_LV=[0,0,0,1,1,1,2,2,3,3];
/* cooking steps: [ingredient, heat 0 nhỏ / 1 vừa / 2 lớn] (j91 k91Cook); `like` = the j1 LIKES entry this recipe answers ("hợp ý") */
const WKR={
 mon:[["Cháo trắng hành phi",[["Nước giếng",2],["Gạo tám",1],["Hành tím",0],["Hành ngò",0]]],
  ["Canh rau dền tôm khô",[["Nước giếng",2],["Tôm khô",1],["Rau dền",1],["Gừng",0]]],
  ["Bánh bột hấp lá chuối",[["Nước giếng",2],["Bột gạo",1],["Đường phèn",1],["Lá chuối",0]]],
  ["Gà hấp lá chanh",[["Nước giếng",2],["Gà ta",2],["Gừng",1],["Lá chanh",0]]],
  ["Canh sườn hạt sen",[["Sườn non",2],["Hạt sen",1],["Táo đỏ",1],["Gừng",0]],"canh hạt sen"],
  ["Bánh hoa quế",[["Nước giếng",2],["Bột sắn",1],["Đường phèn",1],["Hoa quế",0]],"bánh hoa quế"],
  ["Gà tần sâm táo",[["Gà ta",2],["Nhân sâm",1],["Táo đỏ",1],["Lá sen",0],["Kỷ tử",0]],"gà hấp lá sen"],
  ["Chè dưỡng nhan",[["Nước giếng",2],["Hạt sen",1],["Nấm tuyết",1],["Long nhãn",0],["Đường phèn",0]],"chè long nhãn"],
  ["Cá quế sốt chua ngọt",[["Cá quế",2],["Cà chua",1],["Đường phèn",1],["Hạt thông",0]]],
  ["Yến sào hầm sâm",[["Nước dùng",2],["Yến sào",1],["Nhân sâm",1],["Kỷ tử",0],["Đường phèn",0]],"cháo yến"]],
 theu:[["Khăn thêu hoa cúc"],["Khăn thêu uyên ương"],["Túi tiền cánh én"],["Quạt tròn mẫu đơn"],["Gối thêu hoa sen"],["Rèm thêu hoa đào"],
  ["Tranh thêu khổng tước"],["Tranh thêu tùng hạc"],["Bình phong trăm chim"],["Cuộn thêu sơn thủy"]],
 tranh:[["Tranh mai"],["Tranh lan"],["Tranh trúc"],["Tranh cúc"],["Tranh sen hồ"],["Tranh cá chép"],["Tranh song hạc"],["Tranh tùng hạc"],
  ["Tranh sơn thủy"],["Tranh mẫu đơn quốc sắc"]],
 bhoa:[["Bình cúc vàng",0,"hoa cúc"],["Bình lan",0,"hoa lan"],["Bình mai trắng",0,"hoa mai"],["Bình hoa đào"],["Bình sen hồng",0,"hoa sen"],["Bình thủy tiên"],
  ["Bình hoa quế"],["Bình hoa trà"],["Bình mẫu đơn",0,"mẫu đơn"],["Bình trăm hoa"]],
 huong:[["Túi hương hoa lài"],["Túi hương lá bưởi"],["Túi hương ngải cứu"],["Túi hương cúc khô"],["Túi hương hoa quế"],["Túi hương hoa lan"],
  ["Túi hương trầm quế"],["Túi hương trăm hoa"],["Túi hương kỳ nam"],["Túi hương long diên"]],
 tho:[["Thư pháp «Xuân nhật»"],["Thư pháp «Thu dạ»"],["Thư pháp «Vịnh mai»"],["Thư pháp «Vịnh liễu»"],["Thư pháp «Vọng nguyệt»"],["Thư pháp «Tống biệt»"],
  ["Quạt đề thơ"],["Thư pháp «Hoa triêu»"],["Thư pháp «Vọng giang»"],["Bộ thư pháp «Tứ quý»"]],
 kinh:[["Kinh A Di Đà"],["Kinh Phổ Môn"],["Bát Nhã tâm kinh"],["Kinh Dược Sư"],["Kinh Địa Tạng"],["Kinh Kim Cương"],["Kinh Viên Giác"],["Kinh Lăng Nghiêm"],
  ["Kinh Pháp Hoa"],["Kinh Hoa Nghiêm"]],
 khuc:[["Khúc «Xuân hiểu»"],["Khúc «Thu thủy»"],["Khúc «Nguyệt hạ»"],["Khúc «Lạc mai»"],["Khúc «Dương xuân»"],["Khúc «Lưu thủy»"],["Khúc «Cao sơn»",0,"khúc Cao sơn lưu thủy"],
  ["Khúc «Bình sa lạc nhạn»",0,"khúc Bình sa lạc nhạn"],["Khúc «Mai hoa tam lộng»",0,"khúc Mai hoa tam lộng"],["Khúc «Hán cung thu»"]],
 the:[["Thế cờ «Song long»"],["Thế cờ «Cô thành»"],["Thế cờ «Tứ diện»"],["Thế cờ «Ngũ hành»"],["Thế cờ «Thất tinh»"],["Thế cờ «Bát trận»"],["Thế cờ «Cửu cung»"],
  ["Thế cờ «Lạc hà»"],["Thế cờ «Thiên nguyên»"],["Thế cờ «Long phượng»"]],
 mua:[["Điệu «Đạp ca»"],["Điệu «Thải liên»"],["Điệu «Lục yêu»"],["Điệu «Bạch trữ»"],["Điệu «Lăng ba»"],["Điệu «Hồ toàn»"],["Điệu «Kiếm khí»"],["Điệu «Bách hoa»"],
  ["Điệu «Phi thiên»"],["Điệu «Nghê thường»"]],
 ao:[["Áo múa «Sóng lam»"],["Áo múa «Cánh sen»"],["Áo múa «Mai tuyết»"],["Áo múa «Bướm hoa»"],["Áo múa «Tay nước»"],["Áo múa «Lưu tiên»"],["Áo múa «Thải vân»"],
  ["Áo múa «Ngũ sắc»"],["Áo múa «Phượng đỏ»"],["Áo múa «Nghê thường»"]]};
/* normalised: WKR[kind][i] = {id:"r01", n, lv, st, like} */
for(const k in WKR)WKR[k]=WKR[k].map((x,i)=>({id:"r"+String(i+1).padStart(2,"0"),n:x[0],lv:WKR_LV[i],st:x[1]||null,like:x[2]||null}));
/* kinds whose 40 pictures are on the CDN */
const WKR_ART={mon:1,tranh:1,theu:1,bhoa:1,huong:1,tho:1,kinh:1,khuc:1,the:1,mua:1,ao:1};
function wkrOf(kind,id){return (WKR[kind]||[]).find(x=>x.id===id)||null}
function wkrOpen(p,kind){const K=WK[kind];const l=wkLv(p,K.a);return (WKR[kind]||[]).filter(x=>x.lv<=l)}
/* the recipe a work's like-matching subject stands for */
function wkrSubj(kind,r){if(!r)return null;if(kind==="khuc")return r.like&&S.emp.known.music&&S.emp.likes.music===r.like?"theo "+r.like:r.n;return r.like||r.n}
/* ---- pictures ---- */
(function(){const a0=itemArt;itemArt=function(key,tier){const r=a0.apply(this,arguments);try{if(r&&key&&typeof key==="object"&&key.wk&&key.wk.r&&WKR_ART[key.wk.kind]){
  const n=`tp-${key.wk.kind}-${key.wk.r}-b${(key.wk.ti|0)+1}`;r.key=n;r.src=`img/item-${n}.webp`;r.src512=`img/item512/item-${n}.webp`}}catch(e){}return r};window.itemArt=itemArt})();
function wkrPic(kind,r,ti){const a=itemArt({k:"tp",wk:{kind,r:r&&r.id,ti:ti||0}});return a?a.src:""}
/* ---- the work carries its recipe ---- */
let kwrCur=null;
(function(){const f0=wkFinishLesson;wkFinishLesson=function(k,pick){kwrCur=pick||null;try{return f0.apply(this,arguments)}finally{kwrCur=null}}})();
(function(){const m0=wkMake;wkMake=function(p,kind,mat,raw,subj){let r=null;const c=kwrCur;if(c&&c.r&&(c.kind===kind))r=wkrOf(kind,c.r);
  if(!r){const L=wkrOpen(p,kind);if(L.length){const lk=subj&&L.find(x=>x.like&&(x.like===subj||"theo "+x.like===subj));r=lk||pick(L)}}
  const e=m0.call(this,p,kind,mat,raw,r?wkrSubj(kind,r):subj);if(r&&e&&e.wk){e.wk.r=r.id;e.wk.n=r.n}return e}})();
/* ---- the session plays THAT recipe ---- */
let kwrPlay=null;
function wkrNow(){const m=typeof S!=="undefined"&&S&&S.mg;const w=(m&&m.wk)||(typeof kwkPick!=="undefined"&&kwkPick)||kwrPlay||wkPend;return w&&w.r?w:null}
(function(){const p0=playArt;playArt=function(o){const w=wkrNow();if(!w||!o)return p0.apply(this,arguments);const r=wkrOf(w.kind,w.r);if(!r)return p0.apply(this,arguments);
  const d0=o.onDone;const o2=Object.assign({},o,{title:r.n,onDone:function(){kwrPlay=null;return d0&&d0.apply(this,arguments)}});kwrPlay=w;
  return p0.call(this,o2)};window.playArt=playArt})();
(function(){if(typeof k91Cook!=="function")return;
 for(const r of WKR.mon)for(const [n] of r.st)if(!K91_ING[n])K91_ING[n]={"Hành tím":"hanhtim","Tôm khô":"tomkho","Rau dền":"rauden","Gừng":"gung","Bột gạo":"botgao","Lá chuối":"lachuoi",
  "Gà ta":"gata","Lá chanh":"lachanh","Sườn non":"suon","Bột sắn":"botsan","Hoa quế":"hoaque","Nhân sâm":"sam","Lá sen":"lasen","Nấm tuyết":"namtuyet","Cá quế":"caque",
  "Cà chua":"cachua","Hạt thông":"hatthong"}[n];
 try{const have=new Set(KG82_SPR.banh||[]);for(const n of Object.values(K91_ING))if(!have.has("banh-"+n)){KG82_SPR.banh.push("banh-"+n);have.add("banh-"+n)}}catch(e){}
 const c0=k91Cook;k91Cook=function(box,env){const w=kwrPlay||wkrNow();const r=w&&w.kind==="mon"&&wkrOf("mon",w.r);if(!r)return c0.apply(this,arguments);
  const keep=K91_RC.splice(0,K91_RC.length,[r.n,r.st]);try{return c0.apply(this,arguments)}finally{K91_RC.splice(0,K91_RC.length,...keep)}};
 try{if(KG82_ENG.cook===c0)KG82_ENG.cook=k91Cook;for(const g in KG82_ENG)if(KG82_ENG[g]===c0)KG82_ENG[g]=k91Cook}catch(e){}})();
/* cắm hoa: a one-flower recipe arranges only that flower (the 5 painted flower kinds of j91); mixed / other flowers keep the mix */
const WKR_FL={r01:"chrys",r02:"orchid",r03:"plum",r04:"peach",r09:"peony"};
(function(){if(typeof k91Arrange!=="function")return;const a0=k91Arrange;k91Arrange=function(){const w=kwrPlay||wkrNow();const f=w&&w.kind==="bhoa"&&WKR_FL[w.r];
  const one=f&&K91_FL.find(x=>x[2]===f);if(!one)return a0.apply(this,arguments);const keep=K91_FL.splice(0,K91_FL.length,one,one,one,one,one);
  try{return a0.apply(this,arguments)}finally{K91_FL.splice(0,K91_FL.length,...keep)}};
 try{for(const g in KG82_ENG)if(KG82_ENG[g]===a0)KG82_ENG[g]=k91Arrange}catch(e){}})();
/* ---- step 1: WHAT to make (kit 28.13e tile grid, pick mode: picture · name · what it takes · level · button) ---- */
const KWR={k:null,mode:null,run:null,kind:null};
function wkrTile(kind,r,l){const ok=r.lv<=l,a=ARTS.find(x=>x.k===WK[kind].a);const eff=r.st?r.st.map(s=>s[0]).join(", "):WK[kind].n;
 const why=ok?"":`Cần ${a.n} bậc ${r.lv}`;const A=`data-kwr="${kind}" data-kwri="${r.id}"`;
 return `<div class="kshc kshpick${ok?"":" kshno"}" ${A}>`+
  `<span class="kshpic">${kitItem({src:wkrPic(kind,r,0),name:r.n,size:"slot",tip:r.n})}</span>`+
  `<span class="kshn" title="${r.n}">${r.n}</span><span class="kshe" title="${eff}">${eff}</span>`+
  `<span class="kshp">${r.lv?`${a.n} bậc ${r.lv}`:"mọi bậc"}</span>`+
  `<button type="button" class="kbtn kshgo" ${A} data-kwrgo="1"${ok?"":` disabled title="${why}"`}>${ok?"Làm":"Chưa mở"}</button></div>`}
function wkrBody(){const k=KWR.k,kinds=wkKindsOf(k).filter(x=>WKR[x]);const kind=kinds.includes(KWR.kind)?KWR.kind:kinds[0];KWR.kind=kind;const l=wkLv(S,k),a=ARTS.find(x=>x.k===k);
 const tabs=kinds.length>1?`<div class="pctabs kcattabs kshtabs" role="tablist">${kitTabRowHTML(kinds.map(x=>({k:x,label:WK[x].n,n:wkrOpen(S,x).length,tip:"món mở được"})),kind,"data-kwrtab")}</div>`:"";
 return `<div class="kshop kwr"><div class="kshl"><span class="kshm">Chọn làm gì trước: mỗi món một hình, phẩm càng cao càng tinh xảo. ${a.n} bậc ${l}: mở ${wkrOpen(S,kind).length}/${WKR[kind].length} món.</span></div>${tabs}`+
  `<div class="kshg">${WKR[kind].map(r=>wkrTile(kind,r,l)).join("")}</div></div>`}
function wkrRefresh(){const el=document.querySelector("#modal .kshop.kwr");if(!el)return;const g=el.querySelector(".kshg"),st=g?g.scrollTop:0;el.outerHTML=wkrBody();const g2=document.querySelector("#modal .kshop.kwr .kshg");if(g2)g2.scrollTop=st}
/* step 2: the material for that recipe (the j83 cards: odds at 5 phần, score needed per tier, ceiling, gift / sale value) */
function wkrMat(kind,rid){const k=KWR.k,mode=KWR.mode,run=KWR.run,K=WK[kind],r=wkrOf(kind,rid),a=ARTS.find(x=>x.k===k),l=S.arts[k],fee=mode==="teacher"?tchFee(k):0;const O=[];
 for(let m=0;m<3;m++)O.push({n:`${r.n} · ${K.mn[m]}`,fx:K.mat[m]?{bac:-K.mat[m]}:{},x:`${wkOddsTxt(S,kind,m)}${K.per?" · phải dâng trong tuần":""}${K.fin?" · "+wkFinTxt(K):""}`,
  go:()=>{wkPend={kind,mat:m,r:rid,subj:wkrSubj(kind,r)};run();if(!S.mg){wkPend=null;if(K.mat[m])apply({bac:K.mat[m]})}}});
 O.push({n:"Thôi",fx:{}});
 Q.push({act:1,t:`${r.n}: dùng vật liệu gì?`,who:pMe(),h:`<p>Phẩm = phần chơi (từ 0 đến 10) + ${a.n} bậc ${l}: +${wkLvQ(S,a.k)} + vật liệu (thường +${WMAT[0]}, tốt +${WMAT[1]}, quý +${WMAT[2]}).</p><p class="past">${wkThTxt()}</p><p>Chỉ vật liệu quý mới thành Tuyệt phẩm. Vật liệu tốt, quý còn làm quà giá trị hơn và bán được giá hơn.${fee?` Phí thầy ${fee} bạc trả riêng.`:""}</p>`,opts:O})}
wkAsk=function(k,mode,run){const a=ARTS.find(x=>x.k===k);if(!wkKindsOf(k).some(x=>WKR[x]))return;Object.assign(KWR,{k,mode,run,kind:KWR.k===k?KWR.kind:null});
 Q.push({t:`${mode==="prac"?"Tự học":"Học"} ${a.n}: làm gì?`,kit:{kind:"info",pick:1,html:wkrBody()},btn:"Đã hiểu",cls:"kwrd"});showModal();render()};
document.addEventListener("click",e=>{const t=e.target.closest&&e.target.closest("[data-kwrtab],[data-kwrgo]");if(!t||!document.querySelector("#modal .kshop.kwr"))return;e.stopPropagation();
 if(t.dataset.kwrtab){KWR.kind=t.dataset.kwrtab;wkrRefresh();return}
 if(t.disabled)return;const kind=t.dataset.kwr,rid=t.dataset.kwri;Q.shift();wkrMat(kind,rid);showModal();render()},true);
/* the deck card makes one recipe too (the dish he likes when she knows it) */
(function(){const d0=wkDeckCard;wkDeckCard=function(){const c=d0.apply(this,arguments);try{const g=c.go;const m=/^(Tự học|Tự học) .*: (.*)$/.exec(c.n);
  const kind=Object.keys(WK).find(x=>WK[x].n.toLowerCase()===(m&&m[2]));if(!kind)return c;const L=wkrOpen(S,kind);if(!L.length)return c;
  const E=S.emp,lk=kind==="mon"&&E.known.dish?L.find(x=>x.like===E.likes.dish):kind==="bhoa"&&E.known.flower?L.find(x=>x.like===E.likes.flower):null;const r=lk||pick(L);
  c.t=kind==="mon"?`Tự tay nấu ${r.n}${lk?", món ngài thích":""}.`:kind==="bhoa"?`Cắm ${r.n.toLowerCase()}${lk?", loài hoa ngài yêu":""}.`:`${WK[kind].n}: ${r.n}.`;
  /* the work's name is in the lead line; Được says "thành phẩm" (never the same fact twice, §31.21) */
  c.go=function(){const a=g.apply(this,arguments);try{if(S.mg&&S.mg.wk){S.mg.wk.r=r.id;S.mg.wk.subj=wkrSubj(kind,r);save()}}catch(e){}return a}}catch(e){}return c}})();
/* kit sample page (§47 #kit): the pick tile of KIT 28.13e, drawn by the real wkrTile (one open recipe, one locked by level) */
if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§28.13e",title:"Pick tile .kshc.kshpick (mở · chưa mở)",html:()=>`<div class="kshop kwr"><div class="kshg">${wkrTile("mon",WKR.mon[0],0)}${wkrTile("mon",WKR.mon[9],0)}</div></div>`});
