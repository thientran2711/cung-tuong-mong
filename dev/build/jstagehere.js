/* ================= jstagehere: STAGE = WHERE SHE IS + CLOSING ALERT (owner OD 18/11 ~19:45Z (5), review/stage-here) =================
   (1) The stage on Hành sự and every tab shows S.place (renderStage already paints placeOf(S.place)); the two-page screen no longer swaps
       to the one-page Hành sự cards while away (jk3 k3Full: the full-screen painting is only the place page itself). Her room comes back
       only at a new day (j3 day turn S.place="home") or when she walks home on Dư đồ (goTo("home")).
   (2) CLOSING ALERT: when the place she stands in closes at the NEXT khắc (the last khắc of this buổi and accessOf() says no for the next
       buổi), or it is already closed and she stayed on, it is ONE kitNotice (r4, KIT §42.2 ONE NOTICE SYSTEM): the top-bar «!» box lights and
       the top chip «<Nơi> sắp đóng cửa sau khắc này» shows once per buổi for BAL.entryToastMs; tap → «Tin báo» panel (the place picture + the
       full line with the stay odds). Sticky until she leaves or the place opens again (then dropped from the box). Hours come from the ONE access rule (j41 accessOf + ACC_DAY + B4L) and BAL.time.khac: no number of its own.
       Painted icon: KIT_REQUESTS K-ICO-ALERT (img/kit/ico-alert.webp); until it exists the rail's text glyph is used (§77.1 glyph mode).
   Staying past closing = Lẻn vào (r2, stayRoll below): one caught roll per buổi turn with the existing sneak odds/loss; the chip says the odds.
   PLACE-CLOSE (owner OD 26/11 ~14:00Z, review/place-close; overwrites «roll at the buổi turn»): (1) the LAST allowed khắc → the thin top chip
   PULSES «Nơi này sắp đóng cửa, mời tiểu chủ rời đi», tap = the way home (homeGo, «Về phòng · N khắc»); (2) GRACE: khắc 1..BAL.placeClose.grace of the
   next buổi = no punishment, the chip turns RED «Đã quá giờ, mời tiểu chủ rời đi»; a talk that spilled over counts inside the grace; (3) still there
   after it → ONE caught roll, caught = NHẸ (punish weight BAL.placeClose.sev, never cấm túc), said in a kit notice: NO thị vệ dialog.
   Chip states = KIT §42.2a kitNotice hold / pulse / tone:"red" (KK44, review/kit-k44-parts).
   Old saves: S.closeSeen / S.stayRoll / S.plGrace are optional. */
(function(){try{
const nm=k=>{try{return typeof accName==="function"?accName(k):placeOf(k).n}catch(e){return k}};
/* {k, now:bool closed now, next:bool closes at the next khắc, why} or null */
function stClose(){try{if(typeof S==="undefined"||!S||S.dead||S.out)return null;if(typeof isSrv==="function"&&isSrv())return null;
 const k=S.place;if(!k||k==="home"||typeof accessOf!=="function")return null;
 if(typeof accOwn==="function"&&accOwn(S,k))return null;
 const a=accessOf(S,k);if(!a.ok)return{k,now:true,next:false,why:a.why||""};
 const b=S.buoi||0,last=typeof B4L==="number"?B4L:3;if(b>=last)return null;/* the day turn sends her home anyway */
 const left=BAL.time.khac-(typeof used==="number"?used:0);
 const b0=S.buoi;let n;try{S.buoi=b+1;n=accessOf(S,k)}finally{S.buoi=b0}
 /* place-rules (owner OD 25/11 ~23:33Z): a place that closes at the next buổi warns ON ENTRY too (lim), not only at its last khắc (next) */
 /* PLACE-CLOSE: «the last allowed khắc» = the last one from which the walk home still fits in this buổi (left ≤ max(1, the walk)), so the chip's tap can take her home */
 let tc=1;try{tc=Math.max(1,travel(k,"home")||1)}catch(e){}
 return n&&!n.ok?{k,now:false,next:left<=tc,lim:left>tc,b,why:n.why||""}:null}catch(e){return null}}
window.stClose=stClose;
function stayWord(k){try{return typeof accSneakO==="function"&&typeof word==="function"?word(accSneakO(k)):""}catch(e){return ""}}
const bN=b=>{try{return String(BUOI[b]).toLowerCase()}catch(e){return ""}};
/* review/home-way: staying past closing is a LIGHT fault (punish sev 0, BAL.punW.lite): the notice says the light price, never «như lẻn vào» */
const stayPrice=()=>{try{const c=typeof punishCut==="function"?punishCut():0;return `bị bắt gặp thì Danh -${BAL.sneak.danh}, ${c?`khất bổng ${c} tháng`:"bị cảnh cáo"}`}catch(e){return "bị bắt gặp thì bị phạt nhẹ"}};
const PC=()=>{try{return BAL.placeClose||{grace:2,leave:1,sev:0}}catch(e){return{grace:2,leave:1,sev:0}}};
const pcBk=()=>{try{return typeof bkey==="function"?bkey():""}catch(e){return ""}};
/* the grace of this buổi at k: {bk,k,end (khắc used when it ends),nf (no fault: unwarned / no way home)} or null */
function pcG(k){try{const G=S.plGrace;return G&&G.bk===pcBk()&&G.k===k?G:null}catch(e){return null}}
window.pcG=pcG;
function line(c){const p=nm(c.k),w=c.why?` (${c.why})`:"",o=stayWord(c.k);/* wording TINBAO-WORDS (owner OD 25/11 ~23:36Z: no «=», the odds word once at the end, «ta») */
 if(c.now){const G=pcG(c.k),u=typeof used==="number"?used:0;
  if(G&&u<G.end)return `${p} đã đóng cửa${w}; còn ${G.end-u} khắc ân hạn để ta rời đi${o&&!G.nf?`; quá hạn mà còn nán lại, ${stayPrice()}; may rủi: ${o}`:""}.`;
  return `${p} đã đóng cửa${w} mà ta vẫn nán lại${o?`; ${stayPrice()}; may rủi: ${o}`:""}.`}
 if(c.lim)return `${p} chỉ được lưu đến hết ${bN(c.b)}${w}${o?`; quá giờ mà còn nán lại, ${stayPrice()}; may rủi: ${o}`:""}.`;
 return `${p} sắp đóng cửa sau khắc này${w}; quá giờ còn được nán lại ${PC().grace} khắc${o?`, quá nữa mà còn nán lại, ${stayPrice()}; may rủi: ${o}`:""}.`}
function key(c){try{return [typeof bkey==="function"?bkey():"",c.k,c.now?1:c.lim?2:0].join("|")}catch(e){return ""}}
/* owner's words (OD 26/11 ~14:00Z): last khắc «Nơi này sắp đóng cửa, mời tiểu chủ rời đi»; grace «Đã quá giờ, mời tiểu chủ rời đi» */
function short(c){const p=nm(c.k);return c.now?"Đã quá giờ, mời tiểu chủ rời đi":c.lim?`${p} chỉ được lưu đến hết ${bN(c.b)}`:"Nơi này sắp đóng cửa, mời tiểu chủ rời đi"}
/* the buổi+place whose limit she has been shown (the closing notice in any of its three lines): stayRoll punishes only after it */
function warned(bk,k){try{const w=String(S.plWarn||""),c=String(S.closeSeen||"");return w===bk+"|"+k||c.indexOf(bk+"|"+k+"|")===0}catch(e){return false}}
window.stWarned=warned;
/* r4 (ONE NOTICE SYSTEM, owner OD 18/11 ~22:10Z): the closing alert is a kitNotice (top-bar «!» box + top chip + «Tin báo» panel with the place's
   own picture), sticky while it holds; it is dropped when she leaves or the place opens. Was: a stage-rail «!» item + the kitLineToast chip. */
function chip(c){try{if(typeof kitNotice!=="function")return null;const k=key(c);let pic="";try{const n=SCIMG[placeOf(c.k).sc];pic=n?`img/${n}.webp`:""}catch(e){}
 const w=typeof homeWay==="function"?homeWay():null,way=!!(w&&!w.at&&w.ok)&&!c.lim;
 /* KIT §42.2a (KK44): hold = the chip stays up while the notice holds (back after another notice's chip), pulse = blinks, tone red = the grace;
    chipGo = the chip reads «<line> · Về phòng · N khắc» and a tap walks her home (go = homeGo); the «!» box opens the panel */
 return kitNotice({id:"close:"+k,kind:"close",line:short(c),text:line(c),pic,sticky:true,hold:!c.lim,pulse:!c.lim,tone:c.now?"red":"",chipGo:way,go:way?()=>{try{if(typeof homeGo==="function"&&homeGo()&&typeof render==="function")render()}catch(e){}}:null,goLabel:way?w.label:""})}catch(e){return null}}
function tick(){try{const c=stClose();const kk=c?key(c):"";
 /* a closing notice that no longer holds (she left, the place opened, a new buổi) leaves the box */
 try{if(typeof kitNoticeList==="function")for(const x of kitNoticeList())if(x.id.indexOf("close:")===0&&x.id!=="close:"+kk)kitNoticeDrop(x.id)}catch(e){}
 if(!c)return;if(S.closeSeen===kk){try{if(c.now&&typeof kitNoticeList==="function"){const it=kitNoticeList().find(x=>x.id==="close:"+kk);if(it&&it.text!==line(c)){it.text=line(c)}}}catch(e){}try{if(typeof kitNoticeList==="function"&&!kitNoticeList().some(x=>x.id==="close:"+kk)){const it=chip(c);if(it)it.seen=true;kitNoticeBox()}}catch(e){}return}/* reload: in the box again, no second chip */
 if(chip(c)){S.closeSeen=kk;/* the warning BEFORE the limit (on entry / last khắc); the after-the-fact «đã đóng cửa» line never overwrites it */if(!c.now)try{S.plWarn=(typeof bkey==="function"?bkey():"")+"|"+c.k}catch(e){}}}catch(e){}}
/* r4: no stage-rail «!» item any more — the ONE «!» lives in the top bar (kitNotice box) */
if(typeof render==="function"){const r0=render;render=function(){const r=r0.apply(this,arguments);try{actPendRun()}catch(e){}try{const T=window.__pcT;if(T)pcTurn(T.k,T.bk0)}catch(e){}try{pcCheck()}catch(e){}try{tick()}catch(e){}return r}}
/* (3) ACT = A PLACE (owner OD 18/11 ~19:55Z + ~20:00Z): a Hành sự act that means going somewhere really moves her there on Dư đồ (the ONE
   walk: goTo → S.place, S.visit, location ledger), she STAYS there, the stage shows it. ONE cost: the act's own khắc/sức already include
   the trip, so the walk khắc is not charged again (the j9 load idiom `const u=used; goTo(k); used=u`). The act itself is the permission
   to enter for this buổi (accGrant). Invites ("Mời thái y…") keep her where she is. Table: dev/test/act-place-audit.js. */
const ACT_PLACE={"Thỉnh an Thái hậu":"tn","Nhờ Thái hậu nói giúp":"tn","Thỉnh an Hoàng hậu":"kn","Hối lộ Kính sự phòng":"ksp","Xem sổ nguyệt sự":"ksp",
 "Xem lén sổ nguyệt sự":"ksp","Xin rút thẻ bài, đóng cửa tĩnh dưỡng":"ksp","Sang Thái y viện xin bắt mạch":"tyv",
 /* r2 (MAIN ROOT-55 20:08Z (b)): places not on Dư đồ → the nearest EXISTING map place: the ancestral incense hall → Đức Thọ cung (incense,
    the Thái hậu's prayers); the court banquet → Cần Chính điện (the festival banquets already sit there, jact2 AS_FPLACE newyear/giaothua) */
 "Cầu tự ở Phụng Tiên điện":"tn","Múa trong yến tiệc":"thu",
 /* r2 (a): acts done in her own palace (her bed, mirror, books, her own maids) bring her home; the trip home is free here (window.__walkFree, j2) because the act price holds it (OD L1907), so one cost */
 "Nghỉ ngơi một lát":"home","Điểm trang":"home","Đọc sách giải khuây":"home","Dưỡng nhan":"home","Giả bệnh":"home","Trò chuyện với cung nữ":"home",
 "Đọc binh thư, sử sách":"home","Nghỉ ngơi dưỡng sức":"home","Nghĩ cách trốn khỏi cung":"home","Dâng biểu xin xuất gia":"home",
 /* r3 — MAIN ROOT-56 20:50Z gap rulings */
 "Phát bạc cứu giúp cung nhân nghèo":"cnh","Để ý một nam nhân":"vuon","Để ý một nam nhân áo gấm":"vuon","Xin ban hôn cho Vương gia":"home","Xin về quê phụng dưỡng cha mẹ":"home"};
/* route cards with a name built from a person ("Xin ban hôn cho <tên>") are matched by their card id */
const ACT_PLACE_ID={tt0:"vuon",hl_hon:"home",hl_que:"home"};window.ACT_PLACE_ID=ACT_PLACE_ID;
/* r2 (c): acts done from afar / by others for her — no move. "Cài tai mắt" belongs to parallel time (Foreman D review/parallel-time): the hook
   ACT_REMOTE lets that module decide (window.actRemoteHook(a) → a place key to walk to, or null = stay). */
const ACT_REMOTE={"Cài tai mắt":1,"Sai cung nữ đi dò la":1,"Nghe ngóng chung":1,"Mời thái y bắt mạch":1};
window.ACT_REMOTE=ACT_REMOTE;
window.ACT_PLACE=ACT_PLACE;
function actPlace(a){try{if(!a)return null;if(ACT_REMOTE[a.n])return typeof window.actRemoteHook==="function"?window.actRemoteHook(a)||null:null;const k=ACT_PLACE[a.n]||ACT_PLACE_ID[a.id]||(/^Xin ban hôn cho /.test(a.n||"")?"home":null);if(!k)return null;if(k==="kn"&&!(typeof qOn==="function"&&qOn()))return null;return k}catch(e){return null}}
window.actPlace=actPlace;
function actMove(k){try{if(!k||!S||S.dead||S.out||S.confined||S.place===k)return false;if(typeof isSrv==="function"&&isSrv())return false;
 if(typeof accGrant==="function")accGrant(S,k);const u=used,q=window.__accSilent;window.__accSilent=1;try{used=0;goTo(k)}finally{used=u;window.__accSilent=q}
 return S.place===k}catch(e){return false}}
window.actMove=actMove;
/* W10b (LAW 11): name the familiarity steps that rose since kn0 (j63 kaWalkKn, the card's own KREG rows) */
function actKn(kn0,n){try{if(typeof kaWalkKn==="function")kaWalkKn(kn0,n)}catch(e){}}
window.actKn=actKn;
/* W10b: knA = S.known before the act; kn0 = what its card reflects (j63 __kaKnAt) or knA when no card was built; the steps that rose after
   (j61 audience names, the walk's arrival) are named by kaWalkKn: at once when a dialog keeps the walk waiting, else with the walk */
if(typeof act==="function"){const a0=act;act=function(i){const a=typeof deck!=="undefined"&&deck?deck[i]:null;const was=!!(a&&a.done),k=actPlace(a);
 let knA=null;try{knA=Object.assign({},(S&&S.known)||{});window.__kaKnAt=null}catch(e){}const r=a0.apply(this,arguments);
 try{if(a&&a.done&&!was){const sync=!!window.__kaKnAt,nameIt=()=>actKn(window.__kaKnAt||knA,a.n);/* a card built on a timer (jhouse hsvDone) comes first: name one tick later */
  const kn=()=>{if(sync)nameIt();else setTimeout(nameIt,0)};
  if(!k||Q.length){kn();if(k)window.__actPend={k,n:a.n,bk:typeof bkey==="function"?bkey():""}/* goTo waits while the result card is up */}
  else{const m=actMove(k);kn();if(m&&typeof render==="function")render()}}}catch(e){}return r}}
/* STAYING AFTER CLOSING (r2 (d) → home-way → PLACE-CLOSE, owner OD 26/11 ~14:00Z, canon overwrite): the buổi turn that finds her still inside a
   place now closed to her (accessOf says no; not her own palace) punishes NOTHING: it opens the GRACE (S.plGrace) — khắc 1..BAL.placeClose.grace
   of the new buổi, and at least to the end of a talk that spilled over the buổi line (+ BAL.placeClose.leave khắc for the walk out). The chip is red.
   Still there when the grace is used up (a render with no card open: a talk in progress is never cut) → stayPen: ONE caught roll per buổi (j41
   accSneakO, the odds the notice names); caught = Danh -BAL.sneak.danh + punish weight BAL.placeClose.sev (0 = NHẸ: khất bổng / cảnh cáo, never
   cấm túc) and she goes home (plHome); said in a kit notice (chip + «Tin báo»), NO dialog (owner: no thị vệ talk).
   NO FAULT ⇒ NO PUNISHMENT (review/home-way): unwarned (no closing notice shown before the limit) or no way home all grace long (the «Về phòng»
   button never enabled: window.__hwCan) → cung nhân walk her home at the end of the grace, no loss.
   A second closed buổi in a row (she stayed through, not caught) has no new grace: the roll comes at once. Seen keys S.stayRoll, S.plGrace (optional). */
function pcTurn(k,bk0,fin){try{if(!S||S.dead||S.out||S.confined||!k||k==="home"||S.place!==k)return;if(typeof isSrv==="function"&&isSrv())return;
 const bk=pcBk();if(bk===bk0)return;
 /* a render inside the turn opened it before the spill carry was paid (j76): the turn's end fixes the grace end once */
 {const G=pcG(k);if(G){if(fin&&G.t){const u=typeof used==="number"?used:0;if(G.end)G.end=Math.max(PC().grace,u>0?u+PC().leave:0);delete G.t}return}}if(typeof accOwn==="function"&&accOwn(S,k))return;if(typeof accessOf!=="function"||accessOf(S,k).ok)return;
 const P=PC(),G0=S.plGrace,again=!!(G0&&G0.bk===bk0&&G0.k===k),u=typeof used==="number"?used:0;
 S.plGrace={bk,k,end:again?0:Math.max(P.grace,u>0?u+P.leave:0),nf:warned(bk0,k)||again?0:1};if(!fin)S.plGrace.t=1}catch(e){console.error("pcTurn",e)}}
window.pcTurn=pcTurn;
function pcCheck(){try{if(typeof S==="undefined"||!S||S.dead||S.out||S.confined||Q.length||S.mg)return;const k=S.place;if(!k||k==="home")return;
 const G=pcG(k);if(!G||G.t)return;try{const w=typeof homeWay==="function"?homeWay():null;if(w&&!w.at&&w.ok)window.__hwCan=pcBk()+"|"+k}catch(e){}/* this render's way home counts before the check */
 if((typeof used==="number"?used:0)<G.end)return;stayPen(k,G)}catch(e){console.error("pcCheck",e)}}
window.pcCheck=pcCheck;
function stayPen(k,G){try{if(!S||S.dead||S.out||S.confined||!k||k==="home"||S.place!==k)return;if(typeof isSrv==="function"&&isSrv())return;
 const bk=pcBk();if(S.stayRoll===bk+"|"+k)return;if(typeof accOwn==="function"&&accOwn(S,k))return;
 if(typeof accessOf!=="function"||accessOf(S,k).ok||typeof accSneakO!=="function")return;S.stayRoll=bk+"|"+k;
 const n=nm(k),why=(accessOf(S,k)||{}).why||"",w=why?` (${why})`:"";let pic="";try{const q=SCIMG[placeOf(k).sc];pic=q?`img/${q}.webp`:""}catch(e){}
 const noWay=window.__hwCan!==bk+"|"+k;
 if(G.nf||noWay){log(`${n} hết giờ tiếp${w}: cung nhân tiễn ngươi về tẩm cung.`);if(typeof plHome==="function")plHome("");
  if(typeof kitNotice==="function")kitNotice({id:"closeout:"+bk+"|"+k,kind:"close",line:"Cung nhân tiễn ta về tẩm cung",text:`${n} đã hết giờ tiếp${w}; ${G.nf?"ta chưa được báo trước":"ta không còn khắc để tự về"}, cung nhân tiễn ta về tẩm cung. Không phải lỗi của ta: không ai bắt tội.`,pic});
  try{render()}catch(e){}return}
 if(roll(accSneakO(k))){log(`Ở lại ${n} sau giờ đóng cửa: không ai hay.`);return}
 apply({danh:-BAL.sneak.danh});log(`<span class="r">Ở lại ${n} sau giờ đóng cửa, bị bắt gặp: Danh -${BAL.sneak.danh}.</span>`);const cut0=S.cutPay||0,c0=S.confined||0;
 /* NEVER cấm túc for overstaying: a weight that would confine falls back to NHẸ */
 let sv=PC().sev;try{if(typeof punishMonths==="function"&&punishMonths(sv)>0)sv=0}catch(e){sv=0}
 window.__punQuiet=1;try{punish(S,`ở lại ${n} sau giờ đóng cửa`,sv)}finally{window.__punQuiet=0}
 if((S.confined||0)>c0){console.error("place-close: overstay confined",sv);S.confined=c0}
 if(typeof plHome==="function")plHome("")/* the kit notice below says it: no second line notice */;
 if(typeof kitNotice==="function")kitNotice({id:"closepen:"+bk+"|"+k,kind:"close",line:`Quá giờ ở ${n}: Danh -${BAL.sneak.danh}`,text:`Ta bị bắt gặp nán lại ${n} sau giờ đóng cửa${w}, phải về tẩm cung. Danh -${BAL.sneak.danh}, ${(S.cutPay||0)>cut0?`khất bổng ${S.cutPay} tháng`:"bị cảnh cáo"}. Lỗi nhẹ: không bị cấm túc.`,pic});
 try{render()}catch(e){}}catch(e){console.error("stayPen",e)}}
window.stayPen=stayPen;
/* kept name for older callers / tests: the turn now opens the grace (no roll at the turn) */
window.stayRoll=function(k,bk0){return pcTurn(k,bk0)};
/* RV-HOME-WAY r6: «no way home» = she NEVER had the khắc to walk home while at this place in this buổi. If the «Về phòng» button was enabled
   at some render and she spent the khắc on something else, staying was her choice: the caught roll stands. */
if(typeof render==="function"){const rn0=render;render=function(){const r=rn0.apply(this,arguments);try{const w=typeof homeWay==="function"?homeWay():null;if(w&&!w.at&&w.ok)window.__hwCan=(typeof bkey==="function"?bkey():"")+"|"+S.place}catch(e){}return r}}
if(typeof nextBuoi==="function"){const nb0=nextBuoi;nextBuoi=function(){const k=S&&S.place,bk0=pcBk(),T0=window.__pcT;window.__pcT={k,bk0};let r;try{r=nb0.apply(this,arguments)}finally{window.__pcT=T0}try{pcTurn(k,bk0,1)}catch(e){}return r}}
/* the pending trip runs when the act's cards are closed, in the same buổi (a day/buổi turn in between cancels it: she is elsewhere by then) */
window.actPendRun=function(){return actPendRun()};
function actPendRun(){try{const P=window.__actPend;if(!P||Q.length)return;window.__actPend=null;if((typeof bkey==="function"?bkey():"")!==P.bk)return;const kn0=Object.assign({},S.known||{});const m=actMove(P.k);actKn(kn0,P.n);if(m)setTimeout(()=>{try{render()}catch(e){}},0)}catch(e){}}
}catch(e){console.error("jstagehere",e)}})();
