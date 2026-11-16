/* ================= jph: PLACEHOLDER PICTURES — KIT §59 (owner 15/11 ~18:45Z, review/placeholder-pics) =================
   Four generic palace still-lifes (gpt-2-6, no people) stand in for every EVENT or ACT that has no picture of its own, so the owner sees at
   a glance "this one still lacks its picture" and reports it:
     img/ph-event-light.webp / img/ph-event-dark-v2.webp  (640x480, like the dialog banners img/ev-<key>.webp): folding screen + sealed scroll
     img/ph-act-light.webp   / img/ph-act-dark-v2.webp    (384x506, like act pictures img/act-<key>.webp): blank round fan + lacquer box + hairpin
   light = normal / positive, dark = negative / scheming: a GLOOMY daytime mood, cold muted, heavy shadow — never night (owner 15/11): kitPhTone(text, hint) below, documented in KIT.md §59.
   Wiring (wraps only, edits nothing):
     · events: the OUTERMOST kitEvArt. A dialog that would show nothing, or only the room she is standing in (j17 evArt, the old generic
       stand-in), now shows the event placeholder. Own pictures (EVENTS.json category, own banner ev-<key>, story beats, festival bands,
       people pictures j24) are never replaced. Shop / pick / gift dialogs keep their own rule (no event picture).
     · acts: kitActArt returns the act placeholder when the act has no own key in ACTS.json or its file is not on the CDN (img/_index.json);
       the act card (kpActArt, kitActCompactOn) then shows it in the normal act-art slot instead of no thumbnail (.kanoart).
     · the week book (Tuần lục) is NOT changed: owner 11/15 "no picture rather than a repeated one" for book lines still holds.
   Dev list: every fallback is recorded once in window.CTM_MISSING_PICS [{kind,id,tone,title}] and logged once (console.info).
   Full static list: node dev/tools/missing_pics.js <build url> → dev/art/MISSING_PICS.md. ===================================== */
const KIT_PH={ev:{light:"img/ph-event-light.webp",dark:"img/ph-event-dark-v2.webp"},act:{light:"img/ph-act-light.webp",dark:"img/ph-act-dark-v2.webp"}};
/* tone rule (§59): DARK when the act category is Hại người / Mưu kế, or the event family is rumour / mystery (j68 "rumor","myst"),
   or the id / title / first lines speak of harm, scheming, punishment, rivalry, illness or death (KIT_PH_NEG); else LIGHT */
const KIT_PH_NEG=/hạ độc|thuốc độc|độc dược|trúng độc|hãm hại|làm hại|hại người|hại nhỏ|vu oan|vu cáo|vu khống|tố giác|tố cáo|mưu|gian kế|kế hiểm|lén|nghe trộm|rình|dò la|do thám|tai mắt|tung tin|tin đồn|lời đồn|đồn đại|đồn rằng|ly gián|mua chuộc|hối lộ|đút lót|uy hiếp|đe dọa|đe doạ|trộm|lục rương|lục soát|bắt gặp|bị phạt|trách phạt|hình phạt|xử phạt|đánh đòn|quỳ phạt|cấm túc|ghen|tranh sủng|chặn ngự giá|cãi|khiêu khích|mỉa|chèn ép|bắt nạt|oán|báo thù|thù hận|kẻ thù|lãnh cung|giáng chức|giáng phẩm|bị giáng|tội|sảy thai|xạ hương|tráo|trù ẻo|yểm bùa|bùa|ám sát|thích khách|phản bội|mưu phản|tạo phản|bí mật|giấu|cắt xén|ăn bớt|bớt xén|tham ô|mất cắp|ốm|bệnh|cái chết|chết oan|chết thảm|đã chết|bị giết|qua đời|tang lễ|quốc tang|nghi ngờ|vạch mặt|hăm dọa|phóng hỏa|phóng hoả|đốt kho|ép nộp|ép buộc|sỉ nhục|nhục mạ|cướp|giết/i;
const KIT_PH_DARKCAT=/^(hai-nguoi|muu-ke)$/;
function kitPhTone(text,hint){try{hint=hint||{};if(hint.cat&&KIT_PH_DARKCAT.test(hint.cat))return"dark";if(hint.fam&&/^(rumor|myst)$/.test(hint.fam))return"dark";
 return KIT_PH_NEG.test(String(text||""))?"dark":"light"}catch(e){return"light"}}
window.CTM_MISSING_PICS=window.CTM_MISSING_PICS||[];
const KIT_PH_SEEN={};
function kitPhNote(kind,id,tone,title){try{const k=kind+"|"+id;if(KIT_PH_SEEN[k])return;KIT_PH_SEEN[k]=1;const e={kind,id,tone,title:String(title||"").slice(0,80)};CTM_MISSING_PICS.push(e);
 console.info("[CTM missing pic]",kind,id,tone,e.title)}catch(e){}}
const kitPhPlain=s=>String(s||"").replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim();
/* manifests ready? (before they arrive every id looks unmapped: no placeholder, no record) */
function kitPhEvReady(){return typeof EVART!=="undefined"&&!!EVART}
/* cached per KIT_ACTS object (Object.keys of the whole act table ran per act card per DOM change) */
var KPHAR_SRC=null,KPHAR_V=false;
function kitPhActReady(){try{if(typeof KIT_ACTS==="undefined"||!KIT_ACTS)return false;if(KPHAR_SRC!==KIT_ACTS||KPHAR_SRC.acts!==KPHAR_A){KPHAR_SRC=KIT_ACTS;KPHAR_A=KIT_ACTS.acts;KPHAR_V=!!KIT_ACTS.acts&&Object.keys(KIT_ACTS.acts).length>0}return KPHAR_V}catch(e){return false}}
var KPHAR_A=null;
const kitPhOnCdn=src=>{try{if(typeof KIT_CDNHAVE==="undefined"||!KIT_CDNHAVE)return true;return KIT_CDNHAVE.has(String(src).replace(/^.*?(?=img\/)/,""))}catch(e){return true}};
/* ---- events ---- */
function kitPhEvId(m){try{if(typeof kitDlgId==="function"){const i=kitDlgId(m);if(i)return i}}catch(e){}return "title:"+kitPhPlain(m&&m.t)}
function kitPhEvTone(m){let fam="";try{const pid=String(m.pid||"");if(/^e68[A-Za-z]/.test(pid)&&typeof E68I!=="undefined"&&E68I[pid.slice(3)])fam=E68I[pid.slice(3)].fam||""}catch(e){}
 /* id + title + the FIRST sentence only (the rest of the body holds option hints such as "phi tần ghen" that are not the event's tone) */
 const first=(kitPhPlain(m.h).split(kRx("(?<=[.!?…])\\s",""))[0]||"").slice(0,200);const txt=kitPhEvId(m)+" "+kitPhPlain(m.t)+" "+first;return kitPhTone(txt,{fam})}
/* KIT §8.1 (review/kpanel-compact): ONE structural test, never load timing. Only a real EVENT (event id / pid / pp / news / event choice) gets a placeholder picture
   (event banner or option card); a confirm, a picker or a short notice without event identity stays picture-free so it can be compact. */
function kitPhEventLike(m){try{if(!m)return false;if(/\bkptitle\b/.test(String(m.cls||""))||(m.kit&&(m.kit.scene||m.kit.menu)))return false;
 return !!(m.pid||m.pp||m.evId||m.ev||m.act||m.kind==="news"||/^Tin trong cung/.test(String(m.t||""))||(typeof kitIsEventChoice==="function"&&kitIsEventChoice(m))||(m.kit&&(m.kit.kind==="choice"||m.kit.hideOut)))}catch(e){return true}}
window.kitPhEventLike=kitPhEventLike;
function kitPhEvent(m){const tone=kitPhEvTone(m);kitPhNote("event",kitPhEvId(m),tone,kitPhPlain(m.t));return{src:KIT_PH.ev[tone],lab:"",ph:tone}}
(function(){if(typeof kitEvArt!=="function")return;const a0=kitEvArt;kitEvArt=function(m){const r=a0.apply(this,arguments);try{
  if(!m||m.art||m.stArt||!kitPhEvReady())return r;
  /* KIT §8.1 (review/kpanel-compact): a menu panel (title menu, scene menus) never gets an event placeholder: its layout must not depend on when EVART loaded */
  if(/\bkptitle\b/.test(String(m.cls||""))||(m.kit&&(m.kit.scene||m.kit.menu)))return r;
  if(!kitPhEventLike(m))return r;
  if(m.kit&&(m.kit.shop||m.kit.pick||m.kit.look))return r;  /* look-up panels (Tâm trạng / Đã biết / Chứng cứ về X) are not events: their own headArt or nothing (review/mood-dialog) */if(typeof giftIxOf==="function"&&giftIxOf(m)!=null)return r;if(m.pid==="giftin")return r;
  let room="";try{room=typeof evArt==="function"?evArt():""}catch(e){room=""}
  if(r&&r.src&&!(room&&r.src===room)&&r.src!==KIT_PH.act.light&&r.src!==KIT_PH.act.dark)return r;
  return kitPhEvent(m)}catch(e){return r}};window.kitEvArt=kitEvArt})();
/* ---- acts ---- */
(function(){if(typeof kitActArt!=="function")return;const k0=kitActArt;kitActArt=function(name){const r=k0.apply(this,arguments);try{
  if(!r||!kitPhActReady())return r;if(r.src&&!/\/act-cat-/.test(r.src)&&kitPhOnCdn(r.src))return r;
  const tone=kitPhTone(name,{cat:r.cat});r.src=KIT_PH.act[tone];r.ph=tone}catch(e){}return r};window.kitActArt=kitActArt})();
/* the act card: j79 kpActArt draws kitActArt's src (the placeholder above) in the normal art slot; jk4 / jexam no longer drop the slot
   once the manifests are ready (they test kitPhActReady). Here only: mark the card (data-kph, not observed by j63 kaMO) and record it once. */
(function(){if(typeof kpActArt!=="function")return;const p0=kpActArt;kpActArt=function(b){const r=p0.apply(this,arguments);try{
  const im=b&&b.querySelector(':scope > .kaart img[src*="/ph-act-"]');if(!im){if(b&&b.dataset.kph)delete b.dataset.kph;return r}
  const tone=/ph-act-dark/.test(im.getAttribute("src"))?"dark":"light";if(b.dataset.kph!==tone)b.dataset.kph=tone;
  const kan=b.querySelector(".kan");const name=kan?(typeof kpActName==="function"?kpActName(kan):kitPhPlain(kan.textContent)):"";if(name)kitPhNote("act",name,tone,b.dataset.kart||"")}catch(e){}return r};window.kpActArt=kpActArt})();
/* kit sample page */
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§59",title:"Tranh tạm (chưa có tranh riêng): sự kiện sáng · tối, việc sáng · tối",html:()=>`<div class="kitpg-row">`+
 `<div style="width:220px">${kitSceneArt(KIT_PH.ev.light,"",{shape:"wide"})}</div><div style="width:220px">${kitSceneArt(KIT_PH.ev.dark,"",{shape:"wide"})}</div>`+
 `<div style="width:110px">${kitSceneArt(KIT_PH.act.light,"",{shape:"tall"})}</div><div style="width:110px">${kitSceneArt(KIT_PH.act.dark,"",{shape:"tall"})}</div></div>`})}catch(e){}
window.kitPhTone=kitPhTone;window.KIT_PH=KIT_PH;
