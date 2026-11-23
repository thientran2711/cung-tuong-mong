/* ================= jkcg: OUTSIDE-ROUTE GAPS (GAP LIST OR01 OR06 OR08 OR13 OR14; brief b-gap-1 J3, review/outside-gaps) =================
   Source: dev/OUTSIDE_PLAN.md (owner-approved 14/11 22:05Z) §7 map, §6 festivals, §9 carry-over, §11 title set, §13 hooks; art D48
   (review/outside-art-r1 PASS, files on the CDN: img/kc-*.webp, img/map-kc-{nha,kinh}.webp + hotspot json, img/FIGURES-huynh.json).
   Kit only: the Dư đồ map reuses the palace map markup (KIT §85: .mapv/.mapsc/.mapw/.mapimg/.mspot/.mlab/.mmeta/.mfaces), the
   festivals reuse playArt (the same real mini-game call as Phúc tuyển), every number reads BAL.kcg (jbal2). Old saves: nothing breaks
   (fields are created on first use; a save without S.kc.st0 keeps its stats uncapped). */

/* ---------- OR01 (a) scenes: the 13 painted places replace the palace placeholders (OUTSIDE_PLAN §14; PROGRESS_outside-art "What B2 needs") ---------- */
Object.assign(SCIMG,{kcKhue:"kc-khue",kcSanh:"kc-sanh",kcThu:"kc-thu",kcMe:"kc-me",kcDi:"kc-di",kcVuon:"kc-vuon",kcTu:"kc-tu",kcHoc:"kc-hoc",
 kcChua:"kc-chua",kcCho:"kc-cho",kcTra:"kc-tra",kcSach:"kc-sach",kcHau:"kc-hau"});
/* floor line read from each painting (fraction of the height where the open floor starts; same rule as KIT_FLOOR in jk2b) */
Object.assign(window.KIT_FLOOR=window.KIT_FLOOR||{},{"kc-khue":.62,"kc-sanh":.66,"kc-thu":.66,"kc-me":.62,"kc-di":.64,"kc-vuon":.72,"kc-tu":.7,"kc-hoc":.62,
 "kc-chua":.66,"kc-cho":.66,"kc-tra":.66,"kc-sach":.7,"kc-hau":.72});

/* ---------- OR01 (b) Huynh trưởng: his own civilian figure (img/FIGURES-huynh.json, identities huynh-1 / huynh-2, a18..a51) ----------
   Indexed under role "huynh" so the men pool (role "man": guards, suitors) can never hand his face to someone else. A brother who was
   given the old guard placeholder (man:thive-*) takes a huynh face the first time he is drawn (only the home road of jkc; jkc2 roads keep theirs). */
let KCHY=[];
(function(){const i0=figIndex;figIndex=function(all){return i0.call(this,(all||[]).concat(KCHY))}})();
function kcgHyLoad(){try{fetch("img/FIGURES-huynh.json",{cache:"no-cache"}).then(r=>r.ok?r.json():[]).catch(()=>[]).then(j=>{const L=figList(j).map(f=>Object.assign({},f,{role:"huynh"}));
  if(!L.length||L.length===KCHY.length)return;KCHY=L;if(typeof FIGS!=="undefined"&&FIGS.length){FIGIX=figIndex(FIGS);try{if(S&&!S.dead&&S.kc)render()}catch(e){}}}).catch(()=>{})}catch(e){}}
kcgHyLoad();setInterval(kcgHyLoad,300000);
function kcgHyFix(m){try{if(!m||m.r!=="huynh"||!S||!S.kc||S.kc.kd)return;if(String(m.fid||"").startsWith("huynh:"))return;const ks=Object.keys((FIGIX||{}).huynh||{});if(!ks.length)return;
  const U=new Set(figUsed());const k=ks.find(x=>!U.has(x))||ks[0];m.fid=k;figUsed().push(k)}catch(e){}}
(function(){const p0=kcPor;kcPor=function(m){kcgHyFix(m);return p0.apply(this,arguments)}})();

/* ---------- OR01 (c) Dư đồ: the house map and the city map with their hotspots (same map part as the palace Dư đồ) ---------- */
const KCMAP={phu:{img:"img/map-kc-nha.webp",js:"img/map-kc-hotspots-nha.json",gate:"kc_cong",to:"kinh",alt:"Phủ đệ nhà ngươi"},
 kinh:{img:"img/map-kc-kinh.webp",js:"img/map-kc-hotspots-kinh.json",gate:"kc_nha",to:"phu",alt:"Kinh thành"}};
const KCMAPH={};
function kcgMapLoad(w){if(KCMAPH[w]!==undefined)return;KCMAPH[w]=null;try{fetch(KCMAP[w].js,{cache:"no-cache"}).then(r=>r.ok?r.json():null).catch(()=>null).then(j=>{
  if(j&&j.places){KCMAPH[w]=j.places;try{if(S&&isKc()&&tab==="go")render()}catch(e){}}else delete KCMAPH[w]})}catch(e){delete KCMAPH[w]}}
(function(){const m0=kcMapHTML;kcMapHTML=function(){
 const L0=[{k:"phu",label:"Trong phủ"},{k:"kinh",label:"Kinh thành"}];const w=ktSubGet("kcgo",L0)==="kinh"?"kinh":"phu";kcgMapLoad(w);const H=KCMAPH[w];
 if(window.__mapList||!H)return (H?`<div class="ph"><button class="btn" data-maplist="0">Xem bản đồ<small>${KCMAP[w].alt}</small></button></div>`:"")+m0.apply(this,arguments);
 const T=kitSubTabs("kcgo",L0,w==="kinh"?kitInfo("Ra phố","Ra phố cần tỳ nữ đi cùng; buổi tối không ra ngoài"):"");const z=window.__mapZ||1;
 const spot=(k,P)=>{const b=P.box;const y=Math.max(b.y,.04);/* a box on the picture's top edge (Hoa viên) keeps its label on the map */const pos=`left:${b.x*100}%;top:${y*100}%;width:${b.w*100}%;height:${(b.h-(y-b.y))*100}%`;
  if(k===KCMAP[w].gate){const n=KCMAP[KCMAP[w].to].alt;return `<button class="mspot sm" data-kcmap="${KCMAP[w].to}" title="${P.name}: sang bản đồ ${n}" style="${pos}"><span class="mlab">${P.name}</span><span class="mmeta">${n}</span></button>`}
  const Q2=KCPL[k];if(!Q2)return"";/* bến sông / Thần Võ môn: no place in the game yet (not drawn as scenes) → not shown */
  const why=kcGoWhy(k);const here=S.place===k;const ppl=kcHere(k).filter(m=>!/^ban/.test(m.r)||k==="kc_hau");const tm=S.kc.at.ftm===k&&kcTmMan();
  const fs=ppl.slice(0,3).map(m=>`<span class="mres">${mdH(kcFace(m),"xs")}</span>`).join("")+(tm?`<span class="mres">${mdH(pMan(tm),"xs")}</span>`:"")+(ppl.length>3?`<span class="mres more">+${ppl.length-3}</span>`:"");
  const who=ppl.map(m=>m.t.toLowerCase()).concat(tm?["người ấy"]:[]);
  const meta=here?"đang ở đây":why&&why!=="Đang ở đây"?`<em>${why}</em>`:kcCity(k)||kcCity(S.place)?`<em class="ok">${BAL.kc2.kcGoWhy_k} khắc</em>`:"";
  return `<button class="mspot sm${why&&!here?" off":""}${here?" here":""}" data-kcgo="${k}" ${why&&!here?"disabled":""} title="${Q2[0]}: ${Q2[3].replace(/"/g,"")}${who.length?" · ở: "+who.join(", "):""}" style="${pos}"><span class="mlab">${here&&typeof kitMeMapMark==="function"?kitMeMapMark():""}${Q2[0]}</span>${meta?`<span class="mmeta">${meta}</span>`:""}${fs?`<span class="mfaces">${fs}</span>`:""}</button>`};
 return T.html+`<div class="mapv"><div class="maptools"><span class="past">${SEASON[S.month-1]} · ${BUOI[S.buoi||0]} · còn ${BAL.time.khac-used} khắc</span><span><button class="btn mz" data-mapz="-1" aria-label="Thu nhỏ">−</button><button class="btn mz" data-mapz="1" aria-label="Phóng to">+</button><button class="btn mz" data-maplist="1">Danh sách</button></span></div>`+
  `<div class="mapsc"><div class="mapw" style="width:${z*100}%"><img class="mapimg" src="${KCMAP[w].img}" alt="${KCMAP[w].alt}">`+Object.keys(H).map(k=>spot(k,H[k])).join("")+`</div></div></div>`}})();
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-kcmap]");if(!b||!isKc())return;e.stopPropagation();e.preventDefault();const v=b.dataset.kcmap;
 KTSUB.kcgo=v;try{localStorage.setItem("ctm-ktsub-kcgo",v)}catch(x){}render()},true);

/* ---------- OR06 festivals play the REAL mini-game (OUTSIDE_PLAN §4 S5 "via minigame", §6 E22 "minigame Thơ/Câu đối", E24 đố đèn, E25 thêu/khéo tay) ----------
   The same call as Phúc tuyển (playArt; occasion "hoi" = festival, so the mini-game's own difficulty rules apply); the result tiers read
   BAL.kcg.fest. Bots (window.__bot) and a missing mini-game get the same quick score as the Phúc tuyển seam. */
const KCFEST={"Hội thơ":"tho","Ngắm hoa":"dan","Thượng nguyên":"doden","Thất tịch":"kim"};
function kcgFestRes(t,raw,extra,b){const F=BAL.kcg.fest;let txt;
 if(raw>=F.top){S.danh+=F.danh[0];S.kap+=BAL.eff.jkc.kapKcFest;txt=`${t}: ngươi đứng đầu, cả kinh thành nhắc tên.`;S.kc.fTop=(S.kc.fTop||0)+1;
  if(!S.kc.ev.vp&&S.danh>=BAL.danhG.kcVihanh&&S.sac>=BAL.kcg.vpSac&&kcRare("kcR3",BAL.kcg.vpRare)){S.kc.ev.vp=1;pushDil(mkP("kcE",{e:"vihanh"}),"Khách lạ ở chùa")}}
 else if(raw>=F.ok){S.danh+=F.danh[1];txt=`${t}: ngươi được khen.`}else{S.danh=Math.max(0,S.danh-F.danh[2]);txt=`${t}: ngươi không nổi bật.`}
 const mu=kcR("muoi");if(mu&&roll(F.sisP))mu.danh+=raw<F.ok?F.sis[0]:F.sis[1];const x=extra?extra():"";kcRes(t,b,txt+(x?" "+x:""))}
kcFest=function(t,art,extra){const b=rsnap();const kind=KCFEST[t]||art;
 if(window.__bot||typeof playArt!=="function"||!isKc()){kcgFestRes(t,cl(BAL.kcg.fest.bot[0]+R(BAL.kcg.fest.bot[1]),0,10),extra,b);return}
 let done=0;const fin=raw=>{if(done)return;done=1;kcgFestRes(t,raw,extra,b);try{showModal()}catch(e){}};
 try{playArt({art:kind,occ:"hoi",title:t,note:"Thứ hạng ở hội tính theo màn chơi",quick:{n:"Để tài nghệ quyết định",sub:`tính ${BAL.kcg.fest.skip}/10, như người cùng bậc`},onDone:(raw,o)=>fin(o&&o.skipped?BAL.kcg.fest.skip:raw)})}catch(e){console.error(e);fin(BAL.kcg.fest.skip)}};

/* ---------- OR08 carry-over at palace entry (OUTSIDE_PLAN §9 table + "Thư nhà" line) ----------
   (1) Sắc/Tài/Tâm cơ/Đức/Sức: each at most BAL.kcg.carry.cap over its value at the start of the home road (S.kc.st0, written at kcInit;
       saves made before this build have no st0 and keep their stats). cap 0 = OFF (see BAL.kcg note: the §9 +15 cap measured against OD:L1288). (2) Phụ thân's liking moves the odds of «Nhờ cha dâng sớ» (j55 askO).
   (3) Mẫu thân (or Tổ mẫu when there is no mother) keeps writing: monthly letters (true news of a consort) and gifts (a real item from home,
       traced in the item ledger), more often the more she likes her; her own letters home live in Tư trang › «Thư nhà».
   (4) Lời đồn ≥ BAL.kcg.carry.ldOld at entry = the hidden flag «lời đồn cũ»: a rival may dig it up in the palace (event below). */
const KCG_ST=["sac","tai","tamco","duc","suc"];
(function(){const i0=kcInit;kcInit=function(){const r=i0.apply(this,arguments);try{if(S&&S.kc&&!S.kc.st0){S.kc.st0={};for(const k of KCG_ST)S.kc.st0[k]=S[k]||0}}catch(e){console.error("kcg st0",e)}return r}})();
(function(){const e0=kcEnter;kcEnter=function(rank){try{const K=S.kc,C=BAL.kcg.carry;if(K&&!K.inPal){
  if(K.st0&&C.cap>0){K.cap={};for(const k of KCG_ST){const m=(K.st0[k]||0)+C.cap;if((S[k]||0)>m){K.cap[k]=S[k]-m;S[k]=m}}}
  if((S.kld||0)>=C.ldOld)K.ldOld=S.kld}}catch(e){console.error("kcg carry",e)}return e0.apply(this,arguments)}})();
function kcgPal(){return !!(S&&S.kc&&S.kc.inPal&&!S.dead)}
function kcgMom(){if(!kcgPal()||S.kc.tdFall)return null;return kcR("me")||kcR("to")}
(function(){const a0=askO;askO=function(a){const o=a0.apply(this,arguments);try{if(a===S&&kcgPal()&&!S.kc.tdFall){const c=kcR("cha");if(c){const D=BAL.kcg.carry.dad;return oddsCl(o+Math.round((c.af-D.mid)*D.k))}}}catch(e){}return o}})();
/* the ONE path home→palace (OUTSIDE_PLAN §13): kinds letter / gift (single-player: family senders; co-op: the friend at home, see OR13 below) */
function kcgMail(){S.kc.mail=S.kc.mail||[];return S.kc.mail}
function palRecvFromKc(kind,pl,from){if(!kcgPal())return"";const nm=from?`${from.t} ${from.name}`:pl&&pl.who||"Người nhà";let rows=[],h="";
 if(kind==="letter"){const L=shuf(liveRivals(true).filter(v=>!S.kc.intel.includes(v.id)));const v=pl&&pl.v!=null?RV(pl.v):L[0];
  const e={k:"thunha",from:from?"kc:"+from.id:"kc"};S.inv.push(e);try{lgr(e,from?"kc:"+from.id:"kc","me","thư nhà")}catch(x){}
  if(v){kcIntel1(v,BAL.kcg.home.know);rows.push(["Tin trong thư",`${v.name}: ${RANKS[v.rank].n}, ${v.trait||"tính chưa rõ"}`,"t"])}
  h=`<p>Thư của ${nm} gửi vào cung.</p>`;kcgMail().unshift({m:S.month,y:S.year,who:nm,what:v?`tin về ${v.name}`:"thư hỏi thăm"})}
 else if(kind==="gift"){const k=pl&&pl.k&&IT[pl.k]?pl.k:pick(BAL.kcg.home.gifts.filter(x=>IT[x]));if(!k)return"";const e={k,from:from?"kc:"+from.id:"kc"};S.inv.push(e);try{lgr(e,from?"kc:"+from.id:"kc","me","quà nhà")}catch(x){}
  h=`<p>${nm} gửi vào cung một gói đồ nhà.</p>`;rows.push(["Nhận",itm(k).n,"g"]);kcgMail().unshift({m:S.month,y:S.year,who:nm,what:itm(k).n})}
 else return"";
 if(kcgMail().length>BAL.kcg.home.keep)kcgMail().length=BAL.kcg.home.keep;
 Q.push({t:"Thư nhà",who:pMe()/* she reads it in her room: the sender lives at home, never stands on a palace stage (law 6b) */,h:h+kitRows(rows.concat([["Cất ở","Tư trang › Thư nhà","n"]]))});return h}
window.palRecvFromKc=palRecvFromKc;
function kcSendToPal(kind,pl,from){if(pl&&pl.coop){try{kcHook(kind,pl)}catch(e){}return""}return palRecvFromKc(kind,pl,from)}
window.kcSendToPal=kcSendToPal;
function kcgPalMonth(){const m=kcgMom();if(!m)return;const H=BAL.kcg.home,K=S.kc;
 if(K.ask===S.turn-1){K.ask=null;if(roll(oddsCl(H.giftO+Math.round((m.af-H.mid)*H.k))))kcSendToPal("gift",{},m);return}
 if(K.wr===S.turn-1){K.wr=null;kcSendToPal("letter",{},m);return}
 if(roll(Math.max(0,H.p+Math.round((m.af-H.mid)*H.pk))))kcSendToPal(roll(H.giftShare)?"gift":"letter",{},m)}
function kcgLdMonth(){const K=S.kc;if(!K.ldOld||K.ldDone||Q.length>2)return;const C=BAL.kcg.ld;if(!roll(C.p))return;
 const L=liveRivals(true).filter(v=>v.alive&&!v.out);const foe=L.filter(v=>v.enemy||(v.rel||0)<0)[0]||pick(L);if(!foe)return;pushDil(mkP("kcgLd",{f:foe.id}),"Lời đồn cũ")}
PEND.kcgLd=pp=>{if(!kcgPal()||!S.kc.ldOld||S.kc.ldDone)return null;const f=RV(pp.f);if(!f)return null;const C=BAL.kcg.ld,m=kcgMom();
 const oW=m?oddsCl(C.witO+Math.round((m.af-BAL.kcg.home.mid)*BAL.kcg.home.k)):0;const done=()=>{S.kc.ldDone=1};
 return{who:pv(f),t:`<p>${f.name} nhắc lại chuyện cũ ở kinh thành: hồi còn ở nhà, ngươi từng bị người ta xì xào. Lời ấy nay truyền khắp hậu cung.</p>`,o:[
  {n:"Thản nhiên nhận là chuyện cũ",fx:{},x:`an toàn · được: Đức ${balSg(C.own.duc)} · mất: Danh ${balSg(-C.own.danh)} · lời đồn khép lại`,go:()=>kcDo("Lời đồn cũ",()=>{done();S.danh=Math.max(0,S.danh-C.own.danh);apply({duc:C.own.duc});return"Ngươi nhận là chuyện non dại ngày trước. Có người khen ngươi thẳng thắn."})},
  m?{n:`Nhờ ${m.t.toLowerCase()} viết thư làm chứng`,fx:{bac:-C.witBac},x:`${word(oW)} · tốn: Bạc -${C.witBac} · thành: ${f.name} Danh ${balSg(-C.witFoe)}, lời đồn khép lại · hỏng: Danh ${balSg(-C.witLose)}`,go:()=>kcDo("Lời đồn cũ",()=>{done();
   if(roll(oW)){f.danh=Math.max(0,(f.danh||0)-C.witFoe);try{affAdd(f,S,-C.witOan)}catch(e){}return`Thư của ${m.t.toLowerCase()} đến tay Hoàng hậu. Người ta quay sang chê ${f.name} bịa chuyện.`}
   S.danh=Math.max(0,S.danh-C.witLose);return"Thư nhà đến muộn, chẳng ai tin. Lời đồn càng lan."})}:null,
  {n:"Lặng im chờ lời đồn nguội",fx:{},x:`an toàn · được: Tâm cơ ${balSg(C.wait.tamco)} · mất: Danh ${balSg(-C.wait.danh)} · lời đồn có thể bị nhắc lại`,go:()=>kcDo("Lời đồn cũ",()=>{S.danh=Math.max(0,S.danh-C.wait.danh);apply({tamco:C.wait.tamco});return"Ngươi không đáp. Vài tuần sau, người ta tìm chuyện khác để nói."})}].filter(Boolean)}};
(function(){const e0=endTurn;endTurn=function(){const t0=S&&S.turn;const r=e0.apply(this,arguments);try{if(S&&!S.dead&&S.turn!==t0&&kcgPal()&&!isKc()){kcgPalMonth();kcgLdMonth();if(Q.length&&$("modal").hidden)showModal()}}catch(e){console.error("kcg month",e)}return r}})();
/* Tư trang › «Thư nhà» (kit sub-tab, jinv KINV_XTRA): her letters home + what home sent */
function kcgHomeO(kind){const m=kcgMom(),H=BAL.kcg.home;return m?oddsCl((kind==="ask"?H.giftO:H.writeO)+Math.round((m.af-H.mid)*H.k)):0}
function kcgHomeHTML(){const m=kcgMom();if(!m)return"";const H=BAL.kcg.home,K=S.kc;const wO=kcgHomeO("wr"),aO=kcgHomeO("ask");
 const why=k=>K[k]===S.turn?"tháng này đã gửi":!can(BAL.kcg.home.khac)?"hết khắc":"";const wB=why("wr")||(S.bac<H.writeBac?"không đủ bạc":""),aB=why("ask");
 const acts=`<div class="rbtn">`+pbtn(`data-kcgh="wr"`,"Viết thư thăm nhà",`${word(wO)} · tốn: ${BAL.kcg.home.khac} khắc, Bạc -${H.writeBac} · thành: ${m.t} thiện cảm ${balSg(H.writeAf)}, tháng sau có thư hồi âm (tin thật về một phi tần) · hỏng: thư bị chặn, Danh ${balSg(-H.lostDanh)}`,wB)+
  pbtn(`data-kcgh="ask"`,"Xin nhà gửi đồ vào",`${word(aO)} · tốn: ${BAL.kcg.home.khac} khắc, ${m.t} thiện cảm ${balSg(-H.askAf)} · thành: tháng sau nhận một món đồ nhà gửi`,aB)+`</div>`;
 const L=kcgMail();const rows=L.length?L.map(x=>[x.y?`Tháng ${x.m}, năm thứ ${x.y}`:"Trước đây",`${x.who}: ${x.what}`,"t"]):[["Chưa có thư","Nhà chưa gửi gì vào","n"]];
 return kitRows([[m.t,`${m.name} · thiện cảm ${m.af}`,"t"]])+acts+`<h4 class="kpst">Thư nhà đã nhận</h4>`+kitRows(rows)}
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-kcgh]");if(!b||!kcgPal())return;e.stopPropagation();e.preventDefault();if(b.disabled)return;
 const m=kcgMom();if(!m||!can(BAL.kcg.home.khac))return;const H=BAL.kcg.home,K=S.kc,k=b.dataset.kcgh;if(K[k]===S.turn)return;if(k==="wr"&&S.bac<H.writeBac)return;const bs=rsnap();spend(BAL.kcg.home.khac);
 if(k==="wr"){S.bac-=H.writeBac;if(roll(kcgHomeO("wr"))){kcAf(m,H.writeAf);K.wr=S.turn;kcRes("Viết thư thăm nhà",bs,`Thư gửi đi. ${m.t} sẽ hồi âm.`)}else{K.wr=S.turn;K.wrLost=1;S.danh=Math.max(0,S.danh-H.lostDanh);kcRes("Viết thư thăm nhà",bs,"Thư bị chặn ở cửa cung.")}}
 else{kcAf(m,-H.askAf);K.ask=S.turn;kcRes("Xin nhà gửi đồ vào",bs,`${m.t} hứa sẽ gửi.`)}
 try{showModal()}catch(x){}render()},true);
(function(){if(typeof KINV_XTRA!=="object")return;KINV_XTRA.push({k:"nha",label:"Thư nhà",on:()=>!!kcgMom(),html:kcgHomeHTML})})();
/* the wait in kcgPalMonth reads K.wr: a lost letter has no reply */
(function(){const p0=kcgPalMonth;kcgPalMonth=function(){if(S.kc.wrLost&&S.kc.wr===S.turn-1){S.kc.wr=null;S.kc.wrLost=0}return p0.apply(this,arguments)}})();

/* ---------- OR14 «Khuê các» title set (OUTSIDE_PLAN §11): first selection, Quý nhân on entry, each rare ending ----------
   jdh catalogue group "kc" (shown only once earned, like «Thiên mệnh»); cosmetic, one step, tier BAL.kcg.title.*; kept across lives in
   localStorage "ctm-kct" (the Sổ luân hồi lists them) and worn again in a later life like the Thiên mệnh titles (jge geCarry). */
const KCT={kc_tuyen:["Trâm hoa ngự ban","Qua kỳ tuyển tú, được giữ thẻ bài vào cung"],kc_quy:["Khuê tú danh môn","Từ khuê các vào cung, phong ngay Quý nhân"],
 kc_R1:["Thuyền xuôi phương Nam","Kết cục hiếm ngoài cung: bỏ trốn cùng người thương"],kc_R2:["Thanh mai kết tóc","Kết cục hiếm ngoài cung: thanh mai thành phu quân"],
 kc_R3:["Hội thơ ngộ vương","Kết cục hiếm ngoài cung: làm Vương phi"],kc_R4:["Cân quắc Nhạn Môn","Kết cục hiếm ngoài cung: nữ tướng Nhạn Môn"],
 kc_R5:["Sứ hoa hòa thân","Kết cục hiếm ngoài cung: hòa thân thay công chúa"],kc_R6:["Muối trắng Giang Nam","Kết cục hiếm ngoài cung: nữ thương Giang Nam"]};
function kctStore(){const g=store.get("ctm-kct");return g&&typeof g==="object"&&g.t?g:{t:{}}}
(function(){try{if(typeof DH_CAT!=="object")return;BAL.dh.T=BAL.dh.T||{};for(const k in KCT){const d=KCT[k];DH_CAT[k]={n:d[0],g:"kc",how:()=>{const r=kctStore().t[k];return `${d[1]}${r&&r.first?` · kiếp ${r.first.life}`:""}`}};
  BAL.dh.T[k]={n:[1],b:/^kc_R/.test(k)?BAL.kcg.title.rare:BAL.kcg.title.tier,ch:[]}}}catch(e){console.error("kct",e)}})();
function kctGive(k){try{if(!KCT[k]||!S)return;const g=kctStore();const life=(typeof geLifeNo==="function"?geLifeNo():typeof lifeLog==="function"?lifeLog().length+1:1);/* geLifeNo lives inside jge's closure: same count here */const e=g.t[k]||(g.t[k]={lives:[],first:{life,who:S.name}});if(!e.lives.includes(life))e.lives.push(life);store.set("ctm-kct",g);
  S.dh=S.dh||{};if(!S.dh[k]||S.dh[k].i==null||S.dh[k].i<0){if(typeof dhInc==="function")dhInc(S,k,1);else S.dh[k]={n:1,i:0,at:[""]}}log(`<b class="g">Danh hiệu mới: «${KCT[k][0]}».</b>`)}catch(e){console.error("kct",e)}}
(function(){const e0=kcEnter;kcEnter=function(rank){const r=e0.apply(this,arguments);try{if(S.kc&&S.kc.inPal){kctGive("kc_tuyen");if(S.rank>=BAL.kcg.title.quyRank)kctGive("kc_quy")}}catch(e){}return r}})();
(function(){const e0=kcEnd;kcEnd=function(id){try{const m=/^kcR(\d)$/.exec(id||"");if(m)kctGive("kc_R"+m[1])}catch(e){}return e0.apply(this,arguments)}})();
(function(){if(typeof start!=="function")return;const s0=start;start=function(){const r=s0.apply(this,arguments);try{const g=kctStore();if(S&&BAL.kcg.title.carry){S.dh=S.dh||{};for(const k in g.t)if(DH_CAT[k]&&!S.dh[k])S.dh[k]={n:1,i:0,at:[""],carry:1}}}catch(e){}return r}})();
if(typeof pastHTML==="function")(function(){const p0=pastHTML;pastHTML=function(){const h=p0.apply(this,arguments);try{const g=kctStore();const n=Object.keys(g.t).filter(k=>KCT[k]).length;if(!n)return h;
 const rows=[["Danh hiệu Khuê các",`<b>${n}/${Object.keys(KCT).length}</b>`,"g"]].concat(Object.keys(g.t).filter(k=>KCT[k]).map(k=>[`«${KCT[k][0]}»`,`${KCT[k][1]} · kiếp ${g.t[k].lives.join(", ")}`,"g"]));
 return h+`<h3>Khuê các</h3>`+rows67(rows)}catch(e){return h}}})();
