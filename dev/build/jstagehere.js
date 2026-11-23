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
 const left=BAL.time.khac-(typeof used==="number"?used:0);if(left>1)return null;
 const b0=S.buoi;let n;try{S.buoi=b+1;n=accessOf(S,k)}finally{S.buoi=b0}
 return n&&!n.ok?{k,now:false,next:true,why:n.why||""}:null}catch(e){return null}}
window.stClose=stClose;
function stayWord(k){try{return typeof accSneakO==="function"&&typeof word==="function"?word(accSneakO(k)):""}catch(e){return ""}}
function line(c){const p=nm(c.k),w=c.why?` (${c.why})`:"",o=stayWord(c.k),t=o?` Ở lại = như lẻn vào: ${o}.`:"";return (c.now?`${p} đã đóng cửa${w}, ngươi vẫn ở lại.`:`${p} sắp đóng cửa sau khắc này${w}.`)+t}
function key(c){try{return [typeof bkey==="function"?bkey():"",c.k,c.now?1:0].join("|")}catch(e){return ""}}
function short(c){const p=nm(c.k);return c.now?`${p} đã đóng cửa, ngươi vẫn ở lại`:`${p} sắp đóng cửa sau khắc này`}
/* r4 (ONE NOTICE SYSTEM, owner OD 18/11 ~22:10Z): the closing alert is a kitNotice (top-bar «!» box + top chip + «Tin báo» panel with the place's
   own picture), sticky while it holds; it is dropped when she leaves or the place opens. Was: a stage-rail «!» item + the kitLineToast chip. */
function chip(c){try{if(typeof kitNotice!=="function")return null;const k=key(c);let pic="";try{const n=SCIMG[placeOf(c.k).sc];pic=n?`img/${n}.webp`:""}catch(e){}
 return kitNotice({id:"close:"+k,kind:"close",line:short(c),text:line(c),pic,sticky:true})}catch(e){return null}}
function tick(){try{const c=stClose();const kk=c?key(c):"";
 /* a closing notice that no longer holds (she left, the place opened, a new buổi) leaves the box */
 try{if(typeof kitNoticeList==="function")for(const x of kitNoticeList())if(x.id.indexOf("close:")===0&&x.id!=="close:"+kk)kitNoticeDrop(x.id)}catch(e){}
 if(!c)return;if(S.closeSeen===kk){try{if(typeof kitNoticeList==="function"&&!kitNoticeList().some(x=>x.id==="close:"+kk)){const it=chip(c);if(it)it.seen=true;kitNoticeBox()}}catch(e){}return}/* reload: in the box again, no second chip */
 if(chip(c))S.closeSeen=kk}catch(e){}}
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
function stayRoll(k,bk0){try{if(!S||S.dead||S.out||S.confined||!k||k==="home"||S.place!==k)return;if(typeof isSrv==="function"&&isSrv())return;
 const bk=typeof bkey==="function"?bkey():"";if(bk===bk0||S.stayRoll===bk+"|"+k)return;if(typeof accOwn==="function"&&accOwn(S,k))return;
 if(typeof accessOf!=="function"||accessOf(S,k).ok||typeof accSneakO!=="function")return;S.stayRoll=bk+"|"+k;
 const n=nm(k);if(roll(accSneakO(k))){log(`Ở lại ${n} sau giờ đóng cửa: không ai hay.`);return}
 apply({danh:-BAL.sneak.danh});log(`<span class="r">Ở lại ${n} sau giờ đóng cửa, bị thị vệ bắt gặp: Danh -${BAL.sneak.danh}.</span>`);punish(S,`ở lại ${n} sau giờ đóng cửa`,1);
 window.__actPend=null;window.__walkFree=1;try{goTo("home")}catch(e){}finally{window.__walkFree=0}
 Q.push({t:"Bị bắt",h:`<p>Thị vệ ${n} bắt gặp ngươi còn nán lại sau giờ đóng cửa, giải về tẩm cung. Chuyện truyền khắp lục cung.</p><p class="r">Danh -${BAL.sneak.danh} ·${S.confined?` cấm túc ${S.confined} tháng`:" bị phạt"}</p>`});
 try{showModal()}catch(e){}}catch(e){console.error("stayRoll",e)}}
window.stayRoll=stayRoll;
if(typeof nextBuoi==="function"){const nb0=nextBuoi;nextBuoi=function(){const k=S&&S.place,bk0=typeof bkey==="function"?bkey():"";const r=nb0.apply(this,arguments);try{stayRoll(k,bk0)}catch(e){}return r}}
/* the pending trip runs when the act's cards are closed, in the same buổi (a day/buổi turn in between cancels it: she is elsewhere by then) */
function actPendRun(){try{const P=window.__actPend;if(!P||Q.length)return;window.__actPend=null;if((typeof bkey==="function"?bkey():"")!==P.bk)return;if(actMove(P.k))setTimeout(()=>{try{render()}catch(e){}},0)}catch(e){}}
}catch(e){console.error("jstagehere",e)}})();
