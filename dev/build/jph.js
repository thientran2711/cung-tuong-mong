/* ================= jph: PLACEHOLDER PICTURES — KIT §59 (owner 15/11 ~18:45Z, review/placeholder-pics) =================
   Four generic palace still-lifes (gpt-2-6, no people) stand in for every EVENT or ACT that has no picture of its own, so the owner sees at
   a glance "this one still lacks its picture" and reports it:
     ONE SET PER REAL ORIENTATION AND SIZE (owner 7.3, OD:L1343 / L1439; art = Foreman C, K-ICO-2), light + dark, painted at 2x the slot:
       portrait 3:4   img/ph-p-<tone>-{ps,pm,pl}.webp       (PS 84x112 · PM 120x160 · PL 162x216; act / button / person-less frame pictures)
       landscape 2:1  img/ph-l-<tone>-{ls,lm,ll}.webp       (LS 192x96 · LM 300x140 · LL full width; event banners, narrow strips NS/NM crop the same set)
       wide ~4.3:1    img/ph-w-<tone>-ll.webp               (full width x 110-200: the long-story picture on top / NL strip)
       square 1:1     img/ph-s-<tone>-{s56,s64,s72}.webp    (the 56 / 64 / 72 button + skill thumbnails)
     The wraps below hand out the LARGEST file of the orientation; kitPhFit() then picks orientation + size from the slot the picture really sits in.
     (the old 2 + 2 pictures img/ph-event-* / img/ph-act-* are no longer referenced)
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
const KIT_PH={ev:{light:"img/ph-l-light-ll.webp",dark:"img/ph-l-dark-ll.webp"},act:{light:"img/ph-p-light-pl.webp",dark:"img/ph-p-dark-pl.webp"},
 /* slot width (CSS px) up to which a size is used, per orientation: the sizes of KIT_SIZE.pic (PS/PM/PL, LS/LM/LL, Q56/Q64/Q72) */
 sz:{p:[["ps",102],["pm",141],["pl",1e9]],l:[["ls",246],["lm",400],["ll",1e9]],s:[["s56",60],["s64",68],["s72",1e9]]}};
/* the file for a slot of w x h CSS px: orientation from the real aspect ratio, size from the real width (ONE rule, KIT §59) */
function kitPhPick(w,h,tone){tone=tone==="dark"?"dark":"light";const r=w/h;const o=r<.9?"p":r<=1.15?"s":"l";
 if(o==="l"&&r>3.8&&w>=400)return"img/ph-w-"+tone+"-ll.webp";const L=KIT_PH.sz[o];return"img/ph-"+o+"-"+tone+"-"+(L.find(x=>w<=x[1])||L[L.length-1])[0]+".webp"}
const KIT_PH_RX=/\/ph-(?:[plws]-(?:light|dark)-|act-|event-)/;
window.kitPhIs=src=>KIT_PH_RX.test(String(src||""));
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
  const im=b&&b.querySelector(':scope > .kaart img[src*="/ph-"]');if(!im){if(b&&b.dataset.kph)delete b.dataset.kph;return r}
  const tone=/\/ph-(?:[plws]-|act-)dark/.test(im.getAttribute("src"))?"dark":"light";if(b.dataset.kph!==tone)b.dataset.kph=tone;
  const kan=b.querySelector(".kan");const name=kan?(typeof kpActName==="function"?kpActName(kan):kitPhPlain(kan.textContent)):"";if(name)kitPhNote("act",name,tone,b.dataset.kart||"")}catch(e){}return r};window.kpActArt=kpActArt})();
/* ---- fit: swap each placeholder for the file that matches its slot (orientation + size, KIT §59) ---- */
function kitPhFit(root){try{(root&&root.querySelectorAll?root:document).querySelectorAll('img[src*="/ph-"]').forEach(im=>{
  const src=im.getAttribute("src")||"";if(!KIT_PH_RX.test(src))return;const tone=/dark/.test(src.replace(/^.*\/ph-/,""))?"dark":"light";
  let r=im.getBoundingClientRect();if(r.width<8||r.height<8){const q=im.parentElement&&im.parentElement.getBoundingClientRect();if(q)r=q}
  if(!r||r.width<8||r.height<8)return;const to=kitPhPick(r.width,r.height,tone);if(src.endsWith(to))return;
  if(!im.dataset.phOrig)im.dataset.phOrig=src;im.onerror=function(){im.onerror=null;im.src=im.dataset.phOrig};im.src=to})}catch(e){}}
window.kitPhFit=kitPhFit;
(function(){let t=0;const later=()=>{clearTimeout(t);t=setTimeout(()=>kitPhFit(document),120)};
 /* a slot that was hidden when drawn (a card on another page, a closed panel) is fitted the moment it gets a box: one IntersectionObserver on the slots */
 let io=null;try{io=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting)kitPhFit(e.target)})})}catch(e){}
 const once=n=>{if(n.nodeType!==1)return;const L=[];if(n.matches&&n.matches('img[src*="/ph-"]'))L.push(n);if(n.querySelectorAll)n.querySelectorAll('img[src*="/ph-"]').forEach(x=>L.push(x));
  if(!L.length)return;kitPhFit(n);requestAnimationFrame(()=>kitPhFit(n));setTimeout(()=>kitPhFit(n),400);if(io)L.forEach(im=>{if(im.parentElement)io.observe(im.parentElement)})};
 try{new MutationObserver(ms=>{for(const m of ms)m.addedNodes.forEach(once)}).observe(document.documentElement,{childList:true,subtree:true});window.addEventListener("resize",later)}catch(e){}})();
/* kit sample page */
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§59",title:"Tranh tạm (chưa có tranh riêng): một bộ cho mỗi hướng và cỡ — dọc PS·PM·PL, ngang LS·LM·LL, dài, vuông 56·64·72; sáng · tối",html:()=>{const box=(w,h,tone)=>{const f=kitPhPick(w,h,tone);return `<div style="width:${w}px;max-width:100%;text-align:center"><div style="width:${w}px;height:${h}px;max-width:100%">${kitSceneArt(f,"",{shape:w<h?"tall":"wide",cap:false}).replace('class="ksart','style="height:100%;aspect-ratio:auto" class="ksart')}</div><small>${f.replace(/^img\/ph-|\.webp$/g,"")}</small></div>`};
 return ["light","dark"].map(t=>`<div class="kitpg-row" style="align-items:flex-end;gap:8px;margin-bottom:6px">${[[84,112],[120,160],[162,216],[192,96],[300,140],[56,56],[64,64],[72,72]].map(([w,h])=>box(w,h,t)).join("")}</div><div class="kitpg-row" style="margin-bottom:6px">${box(520,120,t)}</div>`).join("")}})}catch(e){}
window.kitPhTone=kitPhTone;window.KIT_PH=KIT_PH;
/* ================= §59.1 LOADING STATE — a picture that is on its way (owner OD 24/11 ~07:25Z «1», canon overwrite of OD 18/11 ~01:50Z/02:06Z;
   review/kit-screenveil, KIT §97.8). A picture that has not arrived yet is HIDDEN (visibility, its box keeps its size: the stage and the cards do not
   jump) and appears whole only once it is loaded AND decoded — no parchment ground, no silhouette, no «Đang thỉnh tranh…» line. A NEW view waits under
   the screen-change veil (§97); this rule covers a picture that arrives after the view is shown (a person walking in, a card drawn later).
   ONE rule for the whole game, no per-place code: a MutationObserver (added <img>, changed src) + one capture load/error listener.
   Mark: img[data-kwait="1"|"f"|"m"|"pf"|"pm"(+"s")] (the kind still drives the layout box, j59 / jkit). Test: dev/test/screen-veil.js, dev/test/life-preload.js. ===== */
(function(){const st=document.createElement("style");st.id="kit-ph-wait";st.textContent=`
img[data-kwait]{visibility:hidden}
img[data-kwait^="f"]{aspect-ratio:730/1350}img[data-kwait^="m"]{aspect-ratio:616/1350}
`;document.head.appendChild(st)})();
function kitPhWaitClear(im){try{if(!im.hasAttribute("data-kwait"))return;im.removeAttribute("data-kwait");const p=im.parentElement;if(p&&p.hasAttribute("data-kwaitp")&&!p.querySelector(":scope>img[data-kwait]"))p.removeAttribute("data-kwaitp");
 if(p&&p.hasAttribute("data-kwaitq")&&!p.querySelector(":scope>img[data-kwait]")){p.removeAttribute("data-kwaitq");p.querySelectorAll(":scope>.kwaitl").forEach(x=>x.remove())}}catch(e){}}
/* the kit silhouette for a full-body cut-out that is still loading: "m" (men: Emperor, eunuch, official, physician…) | "f" | "" (not a figure). ONE rule: the picture slot (here) and the stage layout (j59 wait) read it. */
function kitPhFigG(s){return/\/fig-/.test(s)?(/\/fig-(emp|eun|off|man|men|ty|phys|ksp|prince|vuong|guard|thaigiam|king)/.test(s)?"m":"f"):""}
window.kitPhFigG=kitPhFigG;
/* entry-blank-r3: the kit portrait silhouette for a portrait still loading: "m" (men, boys) | "f" | "" (not a portrait) */
function kitPhPorG(s){return/\/por-/.test(s)?(/\/por-(emperor|eunuch|man|men|official|physician|steward|tutor|kid-m)/.test(s)?"m":"f"):""}
window.kitPhPorG=kitPhPorG;
function kitPhWaitMark(im){try{if(!im||im.tagName!=="IMG"||im.hasAttribute("data-kph-sample"))return;const s=im.getAttribute("src");
 if(!s||/^(data|blob):/.test(s)||(im.complete&&im.naturalWidth)){kitPhWaitClear(im);return}if(im.complete)return;/* failed: jcdn retries or hides it */
 const still=typeof reducedMotion==="function"&&reducedMotion();
 /* a full-body cut-out (fig-*) waits as the kit's faint unknown silhouette (j59 / j61 unknown-fig-f|m), never as a paper box; no line */
 const fm=kitPhFigG(s);
 const pg=fm?"":kitPhPorG(s);
 im.setAttribute("data-kwait",fm?fm+(still?"s":""):pg?"p"+pg+(still?"s":""):still?"s":"1")}catch(e){}}
window.kitPhWaitMark=kitPhWaitMark;
/* KP16 (review/kit-modal-spin, life-preload part b; KIT §59.2) kitSpin(o) = the ONE small loading spinner: a gold ring on the parchment hair-line, turns at the game pace; still (a gentle breath) under reduced motion / «Hiệu ứng: Gọn».
   kitSpin({s:true}) = 18 px for a button / chip, default 28 px; o.label = the spoken label (CTM_WAIT.spin). The dialog wait of the life gate (#modal.klifewait, jload.js) draws the SAME ring with a pseudo-element: one look. */
function kitSpin(o){o=o||{};let st=false;try{st=typeof kfStill==="function"&&kfStill()}catch(e){}const lab=String(o.label||(window.CTM_WAIT&&CTM_WAIT.spin)||"Đang chờ…").replace(/"/g,"&quot;");return `<i class="kspin${o.s?" kspin-s":""}${st?" kspin-still":""}${o.cls?" "+o.cls:""}" role="status" aria-label="${lab}"></i>`}
window.kitSpin=kitSpin;
(function(){const st=document.createElement("style");st.id="kit-spin";st.textContent=`
.kspin{display:inline-block;flex:none;width:28px;height:28px;box-sizing:border-box;border-radius:50%;border:3px solid var(--k-hair,#e6d3ac);border-top-color:var(--gold,#8f5f0c);animation:kspin calc(.9s*var(--pace,1)) linear infinite;vertical-align:middle}
.kspin.kspin-s{width:18px;height:18px;border-width:2px}
@keyframes kspin{to{transform:rotate(360deg)}}
@keyframes kspinb{50%{opacity:.35}}
.kspin.kspin-still{animation:kspinb 1.6s ease-in-out infinite;border-top-color:var(--k-hair,#e6d3ac);border-right-color:var(--gold,#8f5f0c)}
@media(prefers-reduced-motion:reduce){.kspin,#modal.klifewait::after{animation:kspinb 1.6s ease-in-out infinite}}`;document.head.appendChild(st)})();
document.addEventListener("load",e=>{const im=e.target;if(im&&im.tagName==="IMG"){if(im.hasAttribute("data-kwait")&&im.decode)im.decode().then(()=>kitPhWaitClear(im),()=>kitPhWaitClear(im));else kitPhWaitClear(im)}},true);/* shown only once decoded: it appears whole */
document.addEventListener("error",e=>{if(e.target&&e.target.tagName==="IMG")kitPhWaitClear(e.target)},true);
/* review life-preload-fu r2v: kitFigHD (jfighd) gives a figure srcset/sizes; the browser may then drop the picture it was loading/showing and fetch the
   HD twin (currentSrc empty, naturalWidth 0) — on a slow line the slot stood EMPTY with no §59.1 mark (Fold 1.5 Mbps, 6 of 9 runs, ~10 s). A srcset/sizes
   change re-checks the slot (next frame + 300 ms, when the new request has started): nothing drawn → the §59.1 mark; an older picture still drawn → no mark. */
function kitPhSetChk(im){const c=()=>{try{if(im.isConnected&&!im.hasAttribute("data-kwait")&&!im.complete&&!im.naturalWidth)kitPhWaitMark(im)}catch(e){}};requestAnimationFrame(c);setTimeout(c,300)}
(function(){const one=n=>{if(n.nodeType!==1)return;if(n.tagName==="IMG")kitPhWaitMark(n);else if(n.firstElementChild)n.querySelectorAll("img").forEach(kitPhWaitMark)};
 try{new MutationObserver(ms=>{for(const m of ms){if(m.type==="attributes"){if(m.attributeName==="src")kitPhWaitMark(m.target);else if(m.target.tagName==="IMG")kitPhSetChk(m.target)}else m.addedNodes.forEach(one)}}).observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:["src","srcset","sizes"]});
  document.querySelectorAll("img").forEach(kitPhWaitMark)}catch(e){}})();
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§59.2",title:"kitSpin · vòng chờ nhỏ",where:"chỗ nào cần dấu hiệu chờ ngắn: nút, chip, ô; hộp thoại chờ tranh (≤ 3 s) vẽ cùng một vòng",html:()=>{try{return `<div style="display:flex;gap:14px;align-items:center">${kitSpin()}${kitSpin({s:true})}<span>vòng 28 px · vòng 18 px</span></div>`}catch(e){return ""}}})}catch(e){}
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§59.1",title:"Tranh đang về: ô giữ nguyên chỗ, tranh ẩn cho tới khi về đủ rồi hiện trọn một lần (không nền giấy, không bóng người, không dòng chữ)",html:()=>
 `<div class="kitpg-row" style="align-items:flex-end;gap:8px">${[[44,44],[84,112],[120,160],[300,140]].map(([w,h])=>`<div style="position:relative;width:${w}px;height:${h}px;border-radius:6px;overflow:hidden;border:1px solid var(--line)"><img data-kph-sample data-kwait="1" alt="" style="width:100%;height:100%;display:block"></div>`).join("")}</div>`})}catch(e){}
