/* ================= jact: HÀNH SỰ = VIỆC · HẬU CUNG = AI · DƯ ĐỒ = ĐI ĐÂU (owner-approved split 16/11, wave 1; review/act-dedupe) =================
   ONE HOME PER ACT (dev/review/act-dedupe.md, groups 1-14; before/after table there). Wraps only, loaded last.
   1. Hành sự keeps every daily task (no random 5: the whole pool is dealt; usable in colour, unusable grey; tapping a grey card
      opens the kit popover kpPop with the reason, cardWhy). Study of arts / medicine is NOT in Hành sự (Tài nghệ tab only).
   2. SHARED DOORS: an act reachable from two places is ONE act with ONE lock (doing it in one place greys it in the other
      for the same day / buổi): Thỉnh an Thái hậu / Hoàng hậu (Hành sự + their pop-up), Hối lộ Kính sự phòng (Hành sự + Tổng quản),
      Sai cung nữ đi dò la / Nghe ngóng chung / Trò chuyện với cung nữ (Hành sự + her maid's pop-up).
   3. Dư đồ: every place name carries a purpose icon (kitPlaceIcon, kit icon set ic()); a gold "!" (kitHapMark) marks a place
      with a happening this buổi (≤2, re-rolled each buổi, gone next buổi); arriving there fires it (existing events reused:
      j7 rvquarrel, j72 việc nhờ, j78 intelLearn, the Emperor in the garden). Nội vụ phủ is a place (shop = jinv kitShopNvp + a
      weekly rare item). Faces never on place names (silhouettes only; unchanged).
   Co-op: everything here is her personal state (S.adDoor, S.adHap, S.adRare); no world agency; old saves fill lazily. */
const AD=BAL.ad; /* numbers in BAL (jbal2.js): hapP, hap2, strollP, rareMinGrade */
/* ---------- 1. shared doors ---------- */
const AD_DOOR={/* deck name → [pop-up kind, pop-up option name, scope] */
 "Thỉnh an Thái hậu":["th","Thỉnh an, chép kinh","day"],
 "Thỉnh an Hoàng hậu":["hh","Thỉnh an","day"],
 "Hối lộ Kính sự phòng":["ksp","Đút lót lật thẻ","day"],
 "Sai cung nữ đi dò la":["maid","Sai đi dò la","day"],
 "Nghe ngóng chung":["maid","Nghe ngóng chung","day"],
 "Trò chuyện với cung nữ":["maid","Trò chuyện với cung nữ","buoi"]};
function adStamp(sc){try{return sc==="buoi"?bkey():String(wk())}catch(e){return""}}
function adDoorUsed(n){const d=AD_DOOR[n];if(!d||!S)return false;const m=S.adDoor||{};return m[n]!=null&&m[n]===adStamp(d[2])}
function adDoorMark(n){if(!S||!AD_DOOR[n])return;S.adDoor=S.adDoor||{};S.adDoor[n]=adStamp(AD_DOOR[n][2])}
function adDoorOfPop(kind,on){for(const n in AD_DOOR){const d=AD_DOOR[n];if(d[0]===kind&&d[1]===on)return n}return null}
const AD_DOOR_WHY={th:"đã thỉnh an tuần này",hh:"đã thỉnh an tuần này",ksp:"đã lo việc thẻ bài tuần này",maid:"đã sai nàng việc này"};
/* ---------- 2. what leaves Hành sự (and where it lives now) ---------- */
const AD_OUT=/^(Tự học |Tự luyện |Phát chẩn cho cung nhân$|Tụng kinh, làm việc thiện$|Đánh đàn ở ngự hoa viên$|Chữa bệnh cho con$|Dạy (hoàng tử|công chúa)|Dạy dỗ|Đưa con đến thỉnh an Hoàng thượng$|Luyện cầm kỳ thi họa$|Thưởng cung nữ$)/;
function adSrv(){try{return !!(S&&(S.out||S.srv||(typeof isSrv==="function"&&isSrv())))}catch(e){return false}}
/* maid acts dealt as Hành sự cards (the same option objects her pop-up shows: jwhy spy formula, j76 talk) */
function adMaidCards(){if(!S||S.out||!S.maid)return[];const A=[];let O=[];try{O=talkOpts({kind:"maid"})||[]}catch(e){return A}
 const sp=O.find(a=>a&&a.n==="Sai đi dò la"),ng=O.find(a=>a&&a.n==="Nghe ngóng chung");
 if(sp)A.push({n:"Sai cung nữ đi dò la",t:`Sai ${S.maid.name} đi dò la một phi tần (chọn người khi sai đi).`,k:2,c:{},o:sp.o==null?100:sp.o,dom:sp.dom||"Mưu kế",x:sp.x||"",lock:!!sp.lock,adT:sp.t,why:sp.why,adOpen:sp.open,ad:1});
 if(ng)A.push({n:"Nghe ngóng chung",t:`${S.maid.name} đi một vòng nghe ngóng chuyện trong cung.`,k:1,c:{},o:100,dom:"Giao thiệp",x:ng.x||"",adRun:ng.run,ad:1});
 return A}
/* the Tài nghệ charity as a Hành sự card (danh-p1, owner P1 16/11: "shared Hành sự door"): the same act (j85 charityFx), the same
   monthly lock (S.charM); khắc spent by the card path above, like the maid cards */
function adCharityCard(){if(!S||S.out||typeof charityFx!=="function")return null;const C=BAL.charity;
 return {n:"Phát bạc cứu giúp cung nhân nghèo",get t(){return S&&S.charM===S.turn?"Tháng này đã làm":"Ban bạc cho cung nhân nghèo khó; mỗi tháng một lần (cùng việc ở mục Tài nghệ · Tứ đức)."},k:C.khac,
  c:{bac:-C.bac},o:100,dom:"Đức",w:{duc:C.duc,danh:C.danh},l:{},get lock(){return charityLocked()},
  adRun:()=>{charityFx();return ""},ad:1}}
(function(){const d0=deal;deal=function(){const r=d0.apply(this,arguments);try{if(!S||S.dead||!Array.isArray(deck)||adSrv())return r;
  /* every pool card is dealt (no random five): same objects, same wrappers (j83 WFOLD, jrest) */
  let P=[];try{P=pool()||[]}catch(e){}const have=new Set(deck.map(a=>a&&a.n));
  for(const a of P){if(a&&!have.has(a.n)){try{if(typeof vOddsFor==="function"){const b=vOddsFor(a);if(b&&a.o!=null&&a.o<100)a.o=cl(a.o+b,5,95)}}catch(e){}deck.push(a);have.add(a.n)}}
  for(const a of adMaidCards())if(!have.has(a.n)){deck.push(a);have.add(a.n)}
  {const a=adCharityCard();if(a&&!have.has(a.n)){deck.push(a);have.add(a.n)}}
  deck=deck.filter(a=>!(a&&AD_OUT.test(a.n||"")));
  for(const a of deck){if(!a||!AD_DOOR[a.n]||a.__adDoor)continue;a.__adDoor=1;const L0=a.lock,T0=a.t;
   Object.defineProperty(a,"lock",{get:()=>!!(typeof L0==="function"?L0():L0)||adDoorUsed(a.n),set:()=>{},enumerable:true,configurable:true});
   Object.defineProperty(a,"t",{get:()=>adDoorUsed(a.n)?(AD_DOOR[a.n][2]==="buoi"?"Đã làm buổi này":"Đã làm tuần này"):(a.lock&&a.adT?a.adT:T0),set:()=>{},enumerable:true,configurable:true})}
 }catch(e){console.error("jact deal",e)}return r}})();
/* a shared-door card shows its twin's picture (same act, same art; reviewer r1): the Hành sự name → the pop-up option name */
if(typeof kitActArt==="function"){const k0=kitActArt;kitActArt=function(name){try{const d=AD_DOOR[name];if(d&&d[1]!==name){const A=KIT_ACTS.acts||{};if(!A[name]&&A[d[1]])return k0.call(this,d[1])}}catch(e){}return k0.apply(this,arguments)}}
/* cards that open a picker / run a text act (the pop-up's own code), and the door stamp on every shared card */
(function(){const a0=act;act=function(i){const a=deck&&deck[i];
 if(a&&a.ad&&(a.adOpen||a.adRun)){if(a.done||S.dead||Q.length||a.lock||!can(cardCost(a)))return;const k=cardCost(a);
  if(a.adRun){spend(k);a.done=1;adDoorMark(a.n);let t="";try{t=a.adRun()||""}catch(e){console.error(e)}if(t){log(`${a.n}: ${t}`);pushModal({t:a.n,h:`<p>${t}</p>`});showModal()}render();return}
  spend(k);window.__adPend=a;try{a.adOpen()}catch(e){console.error(e);window.__adPend=null}render();return}
 const r=a0.apply(this,arguments);try{if(a&&AD_DOOR[a.n]&&a.done)adDoorMark(a.n)}catch(e){}return r}})();
/* the dò la picker: the card is done (and the door shut) only when someone is picked; "Thôi" refunds the khắc as before */
if(typeof spyMaidRun==="function"){const s0=spyMaidRun;spyMaidRun=function(){const p=window.__adPend;window.__adPend=null;if(p){p.done=1}adDoorMark("Sai cung nữ đi dò la");return s0.apply(this,arguments)}}
/* pop-up side of the doors + removed copies (Thái y viện "Học hỏi y lý" → Tài nghệ Y; Lãnh cung "Đưa cơm áo" → Tài nghệ Tứ đức "Phát bạc cứu giúp")
   + one name per act (place harms carry the ACT name the Hậu cung card uses; same runAct) */
const AD_ACTNAME={"Bỏ độc vào trà nàng":"poison","Bỏ xạ hương vào thuốc nàng":"musk","Tố vượt phẩm":"vp","Ngáng chân nàng":"trip","Đẩy nàng xuống hồ sen":"pushp"};
(function(){const t0=talkOpts;talkOpts=function(p){let A=t0.apply(this,arguments);try{if(!p||!Array.isArray(A)||adSrv())return A;
  if(p.kind==="ty")A=A.filter(a=>a&&a.n!=="Học hỏi y lý");
  if(p.kind==="fallen")A=A.filter(a=>a&&a.n!=="Đưa cơm áo");
  if(p.kind==="maid"&&S.maid){const i=A.findIndex(a=>a&&a.n==="Tâm sự");if(i>=0)A[i]={n:"Trò chuyện với cung nữ",o:100,w:{maid:3},x:"có khi nghe được tin",go:()=>{if(roll(15)){const t=liveRivals(true);if(t.length){const v=pick(t);try{seeLoc&&seeLoc(v)}catch(e){}log(`${S.maid.name} kể: ${v.name} đang ở ${placeName(whereOf(v))} buổi này.`)}}}}}
  if(p.kind==="peddler")A=[{n:"Xem hàng Nội vụ phủ",o:100,x:`hàng mua từ ngoài cung${adRare()?" · tuần này có một món hiếm":""} · không tốn khắc`,adShop:1}];
  if(p.kind==="rival"||p.kind==="hh")A=A.map(a=>{const k=a&&AD_ACTNAME[a.n];return k&&ACT[k]&&ACT[k].n?Object.assign({},a,{n:ACT[k].n}):a});
  A=A.map(a=>{const n=a&&adDoorOfPop(p.kind,a.n);return n&&adDoorUsed(n)?Object.assign({},a,{lock:true,t:(AD_DOOR[n][2]==="buoi"?"đã làm buổi này":(AD_DOOR_WHY[p.kind]||"đã làm tuần này"))}):a})
 }catch(e){console.error("jact talkOpts",e)}return A}})();
(function(){const t0=talk;talk=function(oi){let p=null,a=null;try{p=S&&curPeople()[popIdx];a=p&&talkOpts(p)[oi]}catch(e){}
 if(a&&a.adShop){if(S.dead||Q.length)return;try{kitShopNvp()}catch(e){console.error(e)}render();return}
 const u0=typeof used!=="undefined"?used:0,l0=S?S.logSeq||0:0;const r=t0.apply(this,arguments);
 try{if(p&&a&&!a.open){const n=adDoorOfPop(p.kind,a.n);if(n&&((typeof used!=="undefined"&&used!==u0)||(S.logSeq||0)!==l0))adDoorMark(n)}}catch(e){}return r}})();
/* ---------- 3. Hoàng tự: "Chữa bệnh cho con" moved from Hành sự (Y thuật ≥4, Sức -10, Sức khỏe con +30) ---------- */
if(typeof kidActs==="function"){const k0=kidActs;kidActs=function(k){const L=k0.apply(this,arguments);try{if(k&&k.alive&&S.arts&&S.arts.y>=BAL.art.gate.yCure&&k.hp<70&&!adSrv()){const t2=whyTime(2);
  L.push(pbtn(`data-kid="heal" data-kn="${k.name}"`,"Tự bốc thuốc cho con",`Chắc chắn · tốn: 2 khắc, Sức -10 · thành: Sức khỏe con +30 (Y thuật của ngươi)`,t2||(S.suc<15?"thiếu Sức":"")))}}catch(e){}return L}}
if(typeof kidAct==="function"){const k0=kidAct;kidAct=function(a,name){if(a!=="heal")return k0.apply(this,arguments);const k=S.kids.find(x=>x.name===name&&x.alive);
 if(!k||S.dead||Q.length||!can(2)||S.suc<15||!(S.arts.y>=BAL.art.gate.yCure))return;const b=rsnap();spend(2);apply({suc:-10});k.hp=Math.min(100,k.hp+BAL.eff.jact.hpTop);log(`Ngươi tự bốc thuốc cho ${k.name}: Sức khỏe con ${balSg(BAL.eff.jact.hpTop)}.`);resultShow("Việc của con",b,"sure");render()}}
/* ---------- 4. grey card tap = the reason (kit popover). A disabled button gets no click: open on pointerup, and keep the
   click that follows (on touch it can come later) from closing the popover at once. ---------- */
window.addEventListener("click",e=>{const R=window.__adGreyR;if(R&&Date.now()-(window.__adGreyT||0)<1500&&e.clientX>=R.left&&e.clientX<=R.right&&e.clientY>=R.top&&e.clientY<=R.bottom){e.stopPropagation();e.preventDefault()}},true);
document.addEventListener("pointerup",e=>{try{const b=e.target.closest&&e.target.closest("#panel .kcard[disabled]");if(!b||typeof kpPop!=="function"||!S||S.dead)return;
 const a=deck&&deck[+b.dataset.i];if(!a)return;const w=cardWhy(a)||(a.lock&&a.t)||"Chưa làm được lúc này";window.__adGreyT=Date.now();window.__adGreyR=b.getBoundingClientRect();
 kpPop(b,`<div class="kpopt">${a.n}</div><div class="kpopx"><span class="ef n">${w}</span></div>`,{inside:true})}catch(x){}},true);
/* ---------- 5. Nội vụ phủ: a place (map spot on the office court west of the inner palace; scene = the office picture) ---------- */
try{PLNAME.nvp=["Nội vụ phủ","mua sắm, đồ dùng"];if(typeof MAPH==="object"&&MAPH.places&&!MAPH.places.nvp)MAPH.places.nvp={box:{x:.085,y:.575,w:.13,h:.075},anchor:{x:.15,y:.6}};if(typeof ACC_DAY==="object")ACC_DAY.nvp=1}catch(e){}
(function(){const p0=places;places=function(){const L=p0.apply(this,arguments);try{if(Array.isArray(L)&&!L.some(x=>x.k==="nvp")&&!adSrv())L.push({k:"nvp",n:"Nội vụ phủ",fn:"mua sắm, đồ dùng",d:"Thái giám Nội vụ phủ lo đồ dùng các cung, nhận mua đồ ngoài cung.",sc:"ksp"})}catch(e){}return L}})();
(function(){const c0=countAt;countAt=function(k){return c0.apply(this,arguments)+(k==="nvp"?1:0)}})();
(function(){const g0=goTo;goTo=function(k){const r=g0.apply(this,arguments);try{if(k==="nvp"&&S.place==="nvp"&&S.visit&&!S.visit.people.some(x=>x.kind==="peddler")){const c=S.court&&S.court.ped;
  S.visit.people.push({kind:"peddler",name:c&&c.name?c.name:"Thái giám Nội vụ phủ",ini:"Hoạn",col:"#b9a48a",info:"Thái giám Nội vụ phủ"});
  if(!S.visit.msg||/Không gặp ai|Ở đây có/.test(S.visit.msg))S.visit.msg=`Thái giám Nội vụ phủ bày hàng mua từ ngoài cung.${adRare()?" Tuần này có một món hiếm.":""}`;render()}
  adHapArrive(k)}catch(e){console.error("jact goTo",e)}return r}})();
/* the weekly rare item: one per tuần, only at the place, stock 1, its normal price */
function adRare(){if(!S||adSrv())return null;const w=wk();if(S.adRare&&S.adRare.w===w)return S.adRare.sold?null:S.adRare;
 let L=[];try{L=Object.keys(IT).filter(k=>{const it=IT[k];if(!it||!(it.pr>0)||it.il||it.keep||it.k==="tp")return false;const a=typeof itemArt==="function"?itemArt(k):null;return a&&(a.grade|0)>=AD.rareMinGrade&&!(S.shop||[]).includes(k)})}catch(e){}
 if(!L.length){try{L=SHOP_ALL.filter(k=>IT[k]&&!(S.shop||[]).includes(k)).sort((a,b)=>itm(b).pr-itm(a).pr).slice(0,4)}catch(e){}}
 S.adRare={w,k:L.length?pick(L):null,sold:0};return S.adRare.k?S.adRare:null}
if(typeof kitShop==="function"){const ks0=kitShop;kitShop=function(o){try{const R=o&&o.key==="nvp"&&S&&S.place==="nvp"?adRare():null;
  if(R&&Array.isArray(o.items)&&!o.items.some(x=>x.k===R.k)&&IT[R.k]){const k=R.k,it=itm(k);const a=typeof itemArt==="function"?itemArt(k):null;
   o.items.unshift({k,src:kitItemSrc(k,""),src512:a&&a.src512||"",name:it.n,sub:`Hàng hiếm tuần này · ${it.kd||""}`,grade:a?a.grade|0:0,lux:it.sl||it.dr?luxVal(k):0,price:it.pr||0,mark:["hàng hiếm","g"],/* kitItem corner tag on the tile (KIT §28.13) */
    eff:kitShopEff(k),rows:kitItemRows(k),stock:1,have:()=>S.inv.filter(e=>e.k===k&&!e.h).length,
    onBuy:(x,q)=>{if(!S.adRare||S.adRare.sold)return;apply({bac:-x.price});S.inv.push({k});S.adRare.sold=1;x.stock=0;x.why="Đã mua; tuần sau có món khác";log(`Mua ${it.n} (hàng hiếm). Bạc -${x.price}`)}})}}catch(e){console.error("jact rare",e)}
 return ks0.apply(this,arguments)}}
/* ---------- 6. place icons (kit icon set) + happening mark ---------- */
const KIT_PLACE_IC={nvp:"bac",tyv:"y-thuat",vuon:"place-vuon",thu:"sung",dtd:"sung",tn:"duc",kn:"danh",
 ksp:"place-ksp",lc:"place-lc",home:"place-cung",cnh:"place-cnh",tgk:"place-tgk",ttp:"place-ttp",acs:"place-acs",dc:"place-dc"};
/* every place has a glyph (D56): the consort palaces r<N> (and her own home) share the palace-roof glyph */
function kitPlaceIcon(k,s){const n=KIT_PLACE_IC[k]||(/^r\d+$/.test(k||"")?"place-cung":"");return n&&typeof ic==="function"?ic(n,s||14).replace('class="ic"','class="ic kplic"'):""}
function kitHapMark(k){const h=adHapAt(k);return h?`<i class="khap" role="img" aria-label="Có chuyện buổi này" title="Có chuyện buổi này">!</i>`:""}
(function(){const m0=mapHTML;mapHTML=function(){let h=m0.apply(this,arguments);try{if(!S||adSrv())return h;
  h=h.replace(/(<(?:button|div) class="mspot[^"]*" data-(?:go|ak)="([^"]+)"[^>]*>(?:(?!class="mspot)[\s\S])*?<span class="mlab">)([\s\S]*?)(<\/span>)/g,(all,open,k,lab,end)=>open+kitPlaceIcon(k)+lab+kitHapMark(k)+end)}catch(e){console.error("jact map",e)}return h}})();
(function(){const g0=mapHTMLgrid;mapHTMLgrid=function(){let h=g0.apply(this,arguments);try{if(!S||adSrv())return h;
  h=h.replace(/(<(?:button|div) class="mtile[^"]*" data-(?:go|ak)="([^"]+)"[^>]*>(?:(?!class="mtile)[\s\S])*?<b>)([\s\S]*?)(<\/b>)/g,(all,open,k,lab,end)=>open+kitPlaceIcon(k)+lab+kitHapMark(k)+end)}catch(e){}return h}})();
if(typeof renderStage==="function"){const r0=renderStage;renderStage=function(){const r=r0.apply(this,arguments);try{const t=document.querySelector("#sc-t h2");if(t&&S&&!t.querySelector(".kplic")){const x=kitPlaceIcon(S.place,16);if(x)t.insertAdjacentHTML("afterbegin",x)}}catch(e){}return r}}
/* ---------- 7. "!" happenings: ≤2 places per buổi, re-rolled each buổi, fired on arrival (existing events) ---------- */
function adPresent(k){try{return liveRivals(true).filter(v=>whereOf(v)===k&&!v.confined)}catch(e){return[]}}
function adOpenOk(k){try{if(typeof accessOf==="function"&&!accessOf(S,k).ok)return false}catch(e){}return k!==S.place}
/* first slots (fix of the wave-1 report, flag 2): the Emperor's stroll takes the FIRST slot when he is in the garden (BAL.ad.strollP),
   then the fixed happenings of the day (AD_HAP_FIX: a festival at its place, night happenings; jact2), then the random ones up to the
   buổi's roll. Never more than 2 per buổi. A fixed happening may share a place with the stroll (both fire on arrival). */
const AD_HAP_FIX=[];
function adHapRoll(){const L=[],W=S.where||{};const used=new Set();const add=(k,id,x,share)=>{if(!k||(!share&&used.has(k))||!adOpenOk(k))return false;used.add(k);L.push({k,id,x:x||null,done:0});return true};
 if(W.emp==="vuon"&&roll(AD.strollP))add("vuon","emp");
 for(const f of AD_HAP_FIX){if(L.length>=2)break;try{const h=f();if(h)add(h.k,h.id,h.x,1)}catch(e){console.error("jact fix",e)}}
 const C=[];
 if(liveRivals(true).filter(v=>!v.confined).length>=2)C.push(()=>add("vuon","quarrel"));
 for(const p of places()){if(p.k==="home")continue;if(adPresent(p.k).length>=2){C.push(()=>add(p.k,"gossip"));break}}
 try{if(typeof q72CanOffer==="function"&&q72CanOffer()){const P=shuf(places().filter(p=>p.k!=="home"&&p.k!=="nvp").map(p=>p.k)).slice(0,4);
  for(const k of P){const x=q72Choose(q72Cands(k),k);if(x){C.push(()=>add(k,"favour",x));break}}}}catch(e){}
 const n=roll(AD.hapP)?(roll(AD.hap2)?2:1):0;const S2=shuf(C);for(const f of S2){if(L.length>=n)break;f()}
 return L.slice(0,2)}
function adHapNow(){if(!S||S.dead||adSrv()||S.out)return[];let b="";try{b=bkey()}catch(e){return[]}if(!S.adHap||S.adHap.b!==b){let L=[];try{L=adHapRoll()}catch(e){console.error("jact hap",e)}S.adHap={b,L}}return S.adHap.L}
function adHapAt(k){return adHapNow().find(h=>h.k===k&&!h.done)||null}
const AD_HAP_T={emp:"Hoàng thượng dạo vườn",quarrel:"Hai phi tần cãi nhau",gossip:"Nghe lỏm chuyện",favour:"Có người nhờ việc"};
const AD_HAP_FIRE={};/* id → (h,k) => fired (jact2 adds fest, cold) */
function adHapArrive(k){if(S.place!==k||S.dead)return;let any=false;for(let i=0;i<2;i++){const h=adHapAt(k);if(!h)break;if(adHapFire1(h,k))any=true}if(any){try{showModal()}catch(e){}}}
function adHapFire1(h,k){h.done=1;let fired=false;if(AD_HAP_FIRE[h.id]){try{fired=!!AD_HAP_FIRE[h.id](h,k)}catch(e){console.error("jact fire",e)}return fired}
 if(h.id==="emp"&&(S.where||{}).emp==="vuon"){const d=mkP("adStroll",{});if(d){pushDil(d,AD_HAP_T.emp);fired=true}}
 else if(h.id==="quarrel"){const R=liveRivals(true).filter(v=>!v.confined);const here=adPresent(k);const a=here[0]||pick(R);const b=here.find(v=>v!==a)||pick(R.filter(v=>v!==a));
  if(a&&b){const d=mkP("rvquarrel",{a:a.id,b:b.id});if(d){pushDil(d,AD_HAP_T.quarrel);fired=true}}}
 else if(h.id==="gossip"){const here=adPresent(k);const v=here.length?pick(here):null;if(v){let f="";try{f=typeof intelLearn==="function"?intelLearn(v,1,{by:"ngươi",how:"Nghe lỏm"}):""}catch(e){}
  if(!f){try{f=overhear(k)}catch(e){}}pushModal({t:AD_HAP_T.gossip,who:pv(v),h:`<p>Đi ngang hành lang, ngươi nghe ${v.name} to nhỏ với người bên cạnh.</p><p>${f||"Chỉ là chuyện vặt, không có gì đáng nhớ."}</p>`});fired=true}}
 else if(h.id==="favour"&&h.x){try{if(q72X(h.x)&&q72CanOffer()){q72().a.push(h.x);fired=q72Offer(h.x,"meet");if(!fired){const q=q72();q.a.splice(q.a.indexOf(h.x),1)}}}catch(e){console.error(e)}}
 return fired}
/* the Emperor in the garden: "Đánh đàn ở ngự hoa viên" (was a Hành sự card) now lives here, same numbers */
PEND.adStroll=()=>{const K=S.emp.known,L=S.emp.likes,tt=has("trongtai")?2:1;const o=od(35+S.tai/3+artOE(S,"cam")+(K.music?15:0)+mm());const w=K.music?9:7;
 return{who:pEmp(),t:`<p>Hoàng thượng đang dạo bước trong Ngự hoa viên, thái giám theo hầu cách xa mấy bước.</p>`,o:[
  {n:"Đánh đàn chờ ngự giá",fx:{suc:-10},x:`${word(o)} · thành: Sủng +${w}${K.music?` (tấu ${L.music}, khúc ngài thích)`:""} · hỏng: Sủng -1`,go:()=>{const b=rsnap();if(roll(o)){apply({sung:w});log(`Tiếng đàn làm Hoàng thượng dừng bước. Sủng +${w}.`)}else{apply({sung:-1});log("Ngài đi qua, không để ý tiếng đàn. Sủng -1.")}}},
  {n:"Ra vấn an",fx:{},x:"chạm vào ngài trên cảnh để nói chuyện"},
  {n:"Lánh đi lối khác",fx:{},x:"không được không mất"}]}};
(function(){const st=document.createElement("style");st.textContent=`
/* KIT 78 (owner 11/16 15:00Z 5.6): the place icon sits ABOVE the name, centred, never left of it — map chips, map tiles, the stage title, the kit sample */
.ic.kplic{display:block;margin:0 auto 1px;flex:none}
.mspot .mlab:has(>.kplic),.mtile b:has(>.kplic),#sc-t h2:has(>.kplic){display:flex;flex-direction:column;align-items:center;text-align:center;gap:0}
.mspot .mlab:has(>.kplic),.mtile b:has(>.kplic){position:relative}.mspot .mlab:has(>.kplic)>.khap,.mtile b:has(>.kplic)>.khap{position:absolute;top:-5px;right:-5px;margin:0}
#sc-t h2:has(>.kplic){align-items:flex-start;text-align:left}#sc-t h2>.kplic{margin:0 0 1px}
/* the 4.4em floor of a map chip counts the glyph (14 px + 3 px gap): a narrow chip (Trường Môn viện) must not push its text out of the border (OD:L1033) */
.mspot .mlab:has(>.kplic){max-width:max(100%,4.4em)}
.khap{display:inline-block;font-style:normal;font-weight:800;font-size:.62rem;line-height:13px;color:var(--ink);background:var(--trim);border-radius:50%;width:13px;height:13px;text-align:center;margin-left:4px;vertical-align:1px;box-shadow:0 0 0 1.5px #fff8e6,0 0 6px var(--trim)}
.mspot.sm .khap{width:12px;height:12px;line-height:12px;font-size:.56rem}`;document.head.appendChild(st)})();
/* kit page samples */
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§78",title:"kitPlaceIcon + kitHapMark: tên nơi chốn có biểu tượng công dụng, dấu ! có chuyện",html:()=>Object.keys(KIT_PLACE_IC).map(k=>`<span class="mspot" style="position:static;transform:none;display:inline-flex;margin:4px 8px"><span class="mlab">${kitPlaceIcon(k)}${PLNAME[k]?PLNAME[k][0]:({home:"Cung của ta"}[k]||k)}${k==="vuon"?`<i class="khap" role="img" aria-label="Có chuyện buổi này">!</i>`:""}</span></span>`).join("")})}catch(e){}
