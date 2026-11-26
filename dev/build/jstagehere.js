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
   Old saves: S.closeSeen / S.stayRoll are optional. */
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
 return n&&!n.ok?{k,now:false,next:left<=1,lim:left>1,b,why:n.why||""}:null}catch(e){return null}}
window.stClose=stClose;
function stayWord(k){try{return typeof accSneakO==="function"&&typeof word==="function"?word(accSneakO(k)):""}catch(e){return ""}}
const bN=b=>{try{return String(BUOI[b]).toLowerCase()}catch(e){return ""}};
/* review/home-way: staying past closing is a LIGHT fault (punish sev 0, BAL.punW.lite): the notice says the light price, never «như lẻn vào» */
const stayPrice=()=>{try{const c=typeof punishCut==="function"?punishCut():0;return `bị bắt gặp thì Danh -${BAL.sneak.danh}, ${c?`khất bổng ${c} tháng`:"bị cảnh cáo"}`}catch(e){return "bị bắt gặp thì bị phạt nhẹ"}};
function line(c){const p=nm(c.k),w=c.why?` (${c.why})`:"",o=stayWord(c.k);/* wording TINBAO-WORDS (owner OD 25/11 ~23:36Z: no «=», the odds word once at the end, «ta») */
 if(c.now)return `${p} đã đóng cửa${w} mà ta vẫn nán lại${o?`; ${stayPrice()}; may rủi: ${o}`:""}.`;
 if(c.lim)return `${p} chỉ được lưu đến hết ${bN(c.b)}${w}${o?`; quá giờ mà còn nán lại, ${stayPrice()}; may rủi: ${o}`:""}.`;
 return `${p} sắp đóng cửa sau khắc này${w}${o?`; nán lại quá giờ, ${stayPrice()}; may rủi: ${o}`:""}.`}
function key(c){try{return [typeof bkey==="function"?bkey():"",c.k,c.now?1:c.lim?2:0].join("|")}catch(e){return ""}}
function short(c){const p=nm(c.k);return c.now?`${p} đã đóng cửa, ta vẫn nán lại`:c.lim?`${p} chỉ được lưu đến hết ${bN(c.b)}`:`${p} sắp đóng cửa sau khắc này`}
/* the buổi+place whose limit she has been shown (the closing notice in any of its three lines): stayRoll punishes only after it */
function warned(bk,k){try{const w=String(S.plWarn||""),c=String(S.closeSeen||"");return w===bk+"|"+k||c.indexOf(bk+"|"+k+"|")===0}catch(e){return false}}
window.stWarned=warned;
/* r4 (ONE NOTICE SYSTEM, owner OD 18/11 ~22:10Z): the closing alert is a kitNotice (top-bar «!» box + top chip + «Tin báo» panel with the place's
   own picture), sticky while it holds; it is dropped when she leaves or the place opens. Was: a stage-rail «!» item + the kitLineToast chip. */
function chip(c){try{if(typeof kitNotice!=="function")return null;const k=key(c);let pic="";try{const n=SCIMG[placeOf(c.k).sc];pic=n?`img/${n}.webp`:""}catch(e){}
 return kitNotice({id:"close:"+k,kind:"close",line:short(c),text:line(c),pic,sticky:true})}catch(e){return null}}
function tick(){try{const c=stClose();const kk=c?key(c):"";
 /* a closing notice that no longer holds (she left, the place opened, a new buổi) leaves the box */
 try{if(typeof kitNoticeList==="function")for(const x of kitNoticeList())if(x.id.indexOf("close:")===0&&x.id!=="close:"+kk)kitNoticeDrop(x.id)}catch(e){}
 if(!c)return;if(S.closeSeen===kk){try{if(typeof kitNoticeList==="function"&&!kitNoticeList().some(x=>x.id==="close:"+kk)){const it=chip(c);if(it)it.seen=true;kitNoticeBox()}}catch(e){}return}/* reload: in the box again, no second chip */
 if(chip(c)){S.closeSeen=kk;/* the warning BEFORE the limit (on entry / last khắc); the after-the-fact «đã đóng cửa» line never overwrites it */if(!c.now)try{S.plWarn=(typeof bkey==="function"?bkey():"")+"|"+c.k}catch(e){}}}catch(e){}}
/* r4: no stage-rail «!» item any more — the ONE «!» lives in the top bar (kitNotice box) */
if(typeof render==="function"){const r0=render;render=function(){const r=r0.apply(this,arguments);try{actPendRun()}catch(e){}try{tick()}catch(e){}return r}}
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
if(typeof act==="function"){const a0=act;act=function(i){const a=typeof deck!=="undefined"&&deck?deck[i]:null;const was=!!(a&&a.done),k=actPlace(a);const r=a0.apply(this,arguments);
 try{if(k&&a&&a.done&&!was){if(Q.length)window.__actPend={k,bk:typeof bkey==="function"?bkey():""};/* goTo waits while the result card is up */
  else if(actMove(k)&&typeof render==="function")render()}}catch(e){}return r}}
/* r2 (d) STAYING AFTER CLOSING = LẺN VÀO (MAIN ROOT-55 20:08Z (d), BIG review): at a buổi turn that finds her still inside a place that is
   now closed to her (accessOf says no; not her own palace), the existing «Lẻn vào» caught row is rolled ONCE for that buổi: j41 accSneakO(k)
   odds (the same number the map's Lẻn vào button shows), caught = BAL.sneak.danh + punish (exactly accSneak's fail branch) and the guards
   walk her home (a caught sneak never stays inside). No new number. Seen key S.stayRoll (optional, old saves fine). */
/* review/home-way (owner OD 26/11 ~04:25Z): NO FAULT ⇒ NO PUNISHMENT — noWay = at the end of the buổi she had no way home (the walk home
   cost more khắc than she had left: the «Về phòng» buttons were disabled, homeWay / jplrule); she is escorted home, no loss.
   A warned, caught overstay is NHẸ (punish sev 0, BAL.punW.lite: khất bổng / a warning, never cấm túc). */
function stayRoll(k,bk0,noWay){try{if(!S||S.dead||S.out||S.confined||!k||k==="home"||S.place!==k)return;if(typeof isSrv==="function"&&isSrv())return;
 const bk=typeof bkey==="function"?bkey():"";if(bk===bk0||S.stayRoll===bk+"|"+k)return;if(typeof accOwn==="function"&&accOwn(S,k))return;
 if(typeof accessOf!=="function"||accessOf(S,k).ok||typeof accSneakO!=="function")return;S.stayRoll=bk+"|"+k;
 const n=nm(k),why=(accessOf(S,k)||{}).why||"";
 /* place-rules: no punishment without a warning shown before (the closing notice of the buổi that just ended): unwarned = escorted out, no loss */
 if(noWay){log(`${n} hết giờ tiếp${why?` (${why})`:""}; ngươi đã hết khắc, không kịp về: cung nhân tiễn ngươi về tẩm cung.`);if(typeof plHome==="function"){plHome(`${n} hết giờ tiếp, cung nhân tiễn ngươi về tẩm cung.`);try{render()}catch(e){}}
  Q.push({t:"Hết giờ tiếp",h:`<p>${n} đã hết giờ tiếp${why?` (${why})`:""}. Ngươi đã hết khắc trong buổi, không kịp tự về; cung nhân cúi đầu tiễn ngươi về tẩm cung.</p><p class="past">Không phải lỗi của ngươi: không ai bắt tội.</p>`});try{showModal()}catch(e){}return}
 if(!warned(bk0,k)){log(`${n} hết giờ tiếp${why?` (${why})`:""}: cung nhân tiễn ngươi về tẩm cung.`);if(typeof plHome==="function"){plHome(`${n} hết giờ tiếp, cung nhân tiễn ngươi về tẩm cung.`);try{render()}catch(e){}}
  Q.push({t:"Hết giờ tiếp",h:`<p>${n} đã hết giờ tiếp${why?` (${why})`:""}. Cung nhân cúi đầu tiễn ngươi ra, đưa về tẩm cung.</p><p class="past">Lần này không ai bắt tội. Lần sau, xem Tin báo: nơi nào chỉ được lưu đến hết một buổi sẽ báo trước.</p>`});try{showModal()}catch(e){}return}
 if(roll(accSneakO(k))){log(`Ở lại ${n} sau giờ đóng cửa: không ai hay.`);return}
 apply({danh:-BAL.sneak.danh});log(`<span class="r">Ở lại ${n} sau giờ đóng cửa, bị thị vệ bắt gặp: Danh -${BAL.sneak.danh}.</span>`);const cut0=S.cutPay||0;punish(S,`ở lại ${n} sau giờ đóng cửa`,0);
 /* place-rules: the guards take her home AT ONCE (goTo("home") refused while a card was open: the stage stayed on the closed place) */
 if(typeof plHome==="function"){plHome(`Thị vệ giải ngươi rời ${n} về tẩm cung.`);try{render()}catch(e){}}else{window.__actPend=null;window.__walkFree=1;try{goTo("home")}catch(e){}finally{window.__walkFree=0}}
 Q.push({t:"Bị bắt",h:`<p>Thị vệ ${n} bắt gặp ngươi còn nán lại sau giờ đóng cửa, giải về tẩm cung. Chuyện truyền khắp lục cung.</p><p class="r">Danh -${BAL.sneak.danh} · ${(S.cutPay||0)>cut0?`khất bổng ${S.cutPay} tháng`:"bị cảnh cáo"}</p><p class="past">Lỗi nhẹ: không bị cấm túc.</p>`});
 try{showModal()}catch(e){}}catch(e){console.error("stayRoll",e)}}
window.stayRoll=stayRoll;
/* RV-HOME-WAY r6: «no way home» = she NEVER had the khắc to walk home while at this place in this buổi (she arrived with too few).
   If the «Về phòng» button was enabled at some render and she spent the khắc on something else, staying was her choice: the warned
   overstay roll stands (else spending every khắc at a closing place would always go unpunished and the closing notice would lie). */
if(typeof render==="function"){const rn0=render;render=function(){const r=rn0.apply(this,arguments);try{const w=typeof homeWay==="function"?homeWay():null;if(w&&!w.at&&w.ok)window.__hwCan=(typeof bkey==="function"?bkey():"")+"|"+S.place}catch(e){}return r}}
if(typeof nextBuoi==="function"){const nb0=nextBuoi;nextBuoi=function(){const k=S&&S.place,bk0=typeof bkey==="function"?bkey():"";let noWay=false;try{const w=typeof homeWay==="function"?homeWay():null;noWay=!!(w&&!w.at&&!w.ok)&&window.__hwCan!==bk0+"|"+k}catch(e){}const r=nb0.apply(this,arguments);try{stayRoll(k,bk0,noWay)}catch(e){}return r}}
/* the pending trip runs when the act's cards are closed, in the same buổi (a day/buổi turn in between cancels it: she is elsewhere by then) */
window.actPendRun=function(){return actPendRun()};
function actPendRun(){try{const P=window.__actPend;if(!P||Q.length)return;window.__actPend=null;if((typeof bkey==="function"?bkey():"")!==P.bk)return;if(actMove(P.k))setTimeout(()=>{try{render()}catch(e){}},0)}catch(e){}}
}catch(e){console.error("jstagehere",e)}})();
