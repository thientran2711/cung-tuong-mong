/* j74: title screen like most games (owner 11/14). Entering shows the whole key art (img/title-key.webp) with the
   game's name and a few big kit buttons at the bottom (landscape: art on the left, menu in the column beside it),
   so no face is covered. Every screen is ONE kit scene panel (KIT.md 8 + 14: kitModal({scene:true}), header .kph,
   one button style .kbtn / .kbtn.alt); the old cream panel (.tbox) is never shown, it only keeps the live parts:
     Tiếp tục    -> loads the last played slot (same path as the slot's "Tiếp tục kiếp này" button)
     Bắt đầu / Kiếp mới -> "Chọn sổ": #slots (continue / new life per sổ) + #pdwrap Phúc duyên box (j52), nothing else
     Sổ luân hồi -> pastHTML() (j32 + j52 Phúc duyên line)
     Thiết lập   -> .optwrap sound/music/voice sliders, mute, vibration, effects (j11) + .cloudwrap Sổ mây (jcloud) + .xiowrap Chép sổ / Nạp sổ (j16)
   A sub-screen panel borrows those live nodes (their own handlers stay on them) and gives them back to .tbox before
   anything re-renders them (showTitle, wireOpt, wireXio, pdTitle, showModal), so earlier modules keep finding them.
   Back = "‹ Lui" (.kbtn.alt in #mr). Kit review 11/14: no private heading/back styles (.thead/.tback gone);
   no seal on these panels (KIẾP is the seal of a life's end; the kit owner may assign a title-screen seal later). */
(function(){try{
const T=$("title");if(!T)return;const BOX=T.querySelector(".tbox");if(!BOX)return;
let PG="home";
const st=document.createElement("style");
st.textContent=`
/* #title backdrop: jbd KIT_BD.title (portrait title-key / landscape title-key-l) */
#title .tbox{display:none!important}
.modal.kptitle{z-index:55;background:none}
.modal.kpthome .dlg #mr{display:none!important}
.kpmenu{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin:2px 0 10px}
.kpmenu .kbtn{min-height:46px;padding:6px 10px;white-space:normal;text-align:center}
.kpmenu .kbtn.k1{grid-column:1/-1;min-height:54px}
.kpmenu .kbtn small{display:block;font-family:var(--body);font-weight:400;font-size:.74rem;opacity:.9}
.kpmenu.n4{grid-template-columns:repeat(3,minmax(0,1fr))}
/* Chọn sổ: one kit section per sổ (h4.kpst label + kitRows + .kbtn) */
#modal .kpt-mount #slots{display:flex;flex-direction:column;gap:6px;margin:0 0 6px}
/* KIT slot card (owner 16/11 "info on top, buttons below"): ONE part for every sổ / room slot (solo 1-3, co-op rooms 1-3, any similar list):
   h4.kpst, the kit info rows FULL WIDTH on top, the kit buttons in ONE row below (equal width); short values never wrap word by word */
.kcstabs{margin:0 0 8px}
.kslot{display:flex;flex-direction:column;align-items:stretch;gap:6px;padding:2px 0 8px;border-bottom:1px solid var(--k-hair,#e6d3ac)}
.kslot>.kpst{margin:0}
.kslot .kb{margin:0;width:100%}
.kslot .kb .krv{overflow-wrap:normal;word-break:normal;text-wrap:balance}
.kslot-a{display:flex;gap:8px;flex-wrap:nowrap;justify-content:stretch}
.kslot-a .kbtn{flex:1 1 0;min-width:0;min-height:40px;padding:6px 10px;font-size:.84rem;white-space:normal}
.kslot-a .kbtn small{display:block;font-family:var(--body);font-weight:400;font-size:.7rem}
/* Thiết lập: kit controls (KIT.md 28) */
.optwrap .optbox.kctls{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:0 18px;justify-content:stretch;align-items:stretch;font-size:inherit;margin:0 0 6px}
.optwrap .optbox.kctls label{display:grid}
.optwrap .optbox.kctls input[type=range]{width:100%}
.xiobox .kctl.kinp{padding:0}
.xiobox .kbtn{min-height:40px;padding:6px 14px;font-size:.84rem}
.xiobox .kbtn small{display:block;font-family:var(--body);font-weight:400;font-size:.7rem}
`;
document.head.appendChild(st);
/* remove the inline backgrounds of j37/j50 so the rule above decides */
T.style.removeProperty("background");
const HEAD={slots:"Chọn sổ",opt:"Thiết lập",past:"Sổ luân hồi",notes:"Thông tin cập nhật"};
const SUBH={slots:"Sổ mây ở trên, rồi ba sổ chơi một mình. Phúc duyên ở dưới.",slotsco:"Ba phòng cùng hảo hữu, không ghi đè sổ một mình. Phúc duyên ở dưới.",opt:"Tiếng, nhạc, giọng, rung; sổ mây; chép sổ và nạp sổ.",past:"Những kiếp đã qua.",notes:"Những điều mới của các lần cập nhật gần đây."};
const SONO=["một","hai","ba"];
function slotWho(s){try{if(s.srv&&!s.srv.risen)return s.srv.lau>0?"Cung nữ Tân Giả khố":(typeof SRK!=="undefined"&&SRK.maid&&SRK.maid[s.srv.rk])||"Cung nữ";return (RANKS[Math.min(s.rank,RANKS.length-1)]||{}).n||""}catch(e){return ""}}
function slotDate(s){try{return kitDate(s.month,s.year,s.tuan)}catch(e){return `Tháng ${s.month}, năm ${s.year}`}}
function slotsHTML(){return [1,2,3].map(n=>{const d=loadSlot(n);const h=`<h4 class="kpst">Sổ ${SONO[n-1]}</h4>`;
  if(!d)return `<div class="kslot">${h}${kitRows([["Kiếp","Chưa ghi","n"]])}<div class="kslot-a"><button class="kbtn" data-new="${n}">Bắt đầu kiếp mới</button></div></div>`;
  const s=d.S;return `<div class="kslot">${h}${kitRows([["Kiếp",`${slotWho(s)} ${s.name}`,"t"]].concat(s.age!=null?[["Tuổi",`${s.age} tuổi`,"n"]]:[],[["Ngày",slotDate(s),"n"]]))}<div class="kslot-a"><button class="kbtn" data-load="${n}">Tiếp tục kiếp này</button><button class="kbtn alt" data-new="${n}" data-ask="1">Kiếp mới</button></div></div>`}).join("")}
/* owner 16/11: two separate sets on this screen: the solo sổ (above) and the co-op rooms (jslots, below); a room never writes a sổ */
function cloudMini(){try{return window.CTM_CLOUD&&CTM_CLOUD.mini?CTM_CLOUD.mini():""}catch(e){return ""}}
/* Chọn sổ › Cùng hảo hữu: the title's co-op button opens this tab, so "Nhập ám hiệu" (jcooplobby join flow) lives here too */
function coopJoin(){return `<div class="kslot kjoin"><h4 class="kpst">Nhập ám hiệu</h4>${kitRows([["Hảo hữu mời","Gõ ám hiệu hảo hữu gửi để vào phòng của hảo hữu","t"]])}<div class="kslot-a"><button class="kbtn alt" data-coop="join">Nhập ám hiệu</button></div></div>`}
function roomsHTML(){try{return window.CTM_ROOMS?CTM_ROOMS.html():""}catch(e){return ""}}
window.CTM_SLOTWHO=slotWho;window.CTM_SLOTDATE=slotDate;window.CTM_DRAWSLOTS=()=>drawSlots();
/* Chọn sổ = TWO kit tabs (KIT 46 tab row, same part as Mua/Bán): "Một mình" (3 sổ) | "Cùng hảo hữu" (3 phòng); opens on the mode last played */
const CSK="ctm-chonso-tab";let CSTAB="";
function csGet(){if(CSTAB)return CSTAB;let v=null;try{v=localStorage.getItem(CSK)}catch(e){}
 if(v!=="solo"&&v!=="coop"){let r=0;try{r=window.CTM_ROOMS?CTM_ROOMS.list().length:0}catch(e){}v=!lastSlot()&&r?"coop":"solo"}return CSTAB=v}
function csSet(v){CSTAB=v;try{localStorage.setItem(CSK,v)}catch(e){}}
function csSub(){const M=$("modal");const e=M&&M.classList.contains("kptitle")&&M.querySelector('.kpt-mount[data-pg="slots"]')?M.querySelector(".dlg > .kph .kpsub"):null;if(e)e.textContent=csGet()==="coop"?SUBH.slotsco:SUBH.slots}
function drawSlots(){const s=$("slots");if(!s)return;const t=csGet();
 s.innerHTML=`<div class="pctabs kcattabs kcstabs" role="tablist">${kitTabRowHTML([{k:"solo",label:"Một mình"},{k:"coop",label:"Cùng hảo hữu"}],t,"data-kcs")}</div>`+(t==="coop"?coopJoin()+roomsHTML():cloudMini()+slotsHTML());csSub()}
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("#slots [data-kcs]");if(!b)return;e.stopPropagation();csSet(b.dataset.kcs);drawSlots();try{if(typeof sfx==="function")sfx("sfx-tap")}catch(x){}},true);
/* playing a mode makes it the tab the list opens on next time */
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("#slots button[data-load],#slots button[data-new]:not([data-ask])");if(b)csSet("solo")},true);
try{if(window.COOP&&COOP.on)COOP.on("start",()=>csSet("coop"))}catch(e){}
/* Thiết lập with the kit controls; "Mở tiếng" and "Im tiếng" are ONE switch (Tiếng) */
optHTML=function(){return `<div class="optbox kctls">${kitToggle({id:"o-snd",label:"Tiếng",sub:"nhạc, tiếng động, giọng",on:!!(OPT.snd&&!OPT.mute),yes:"Mở tiếng",no:"Im tiếng"})}
 ${kitSlider({id:"o-mus",label:"Nhạc",value:OPT.mus})}${kitSlider({id:"o-sfx",label:"Tiếng động",value:OPT.sfx})}${kitSlider({id:"o-vo",label:"Giọng",value:OPT.vo==null?.7:OPT.vo})}
 ${kitToggle({id:"o-vib",label:"Rung",on:!!OPT.vib})}${kitToggle({id:"o-fx",label:"Hiệu ứng",sub:"Gọn: tranh tĩnh, không hạt bay",on:!!OPT.fxon,yes:"Đầy đủ",no:"Gọn"})}</div>`};
wireOpt=function(){const T=$("title");if(!T)return;let b=T.querySelector(".optwrap")||document.querySelector("#modal .optwrap");if(!b){b=document.createElement("div");b.className="optwrap";T.querySelector(".tbox").appendChild(b)}b.innerHTML=optHTML();
 $("o-snd").onchange=e=>{const on=e.target.checked;OPT.snd=on;OPT.mute=false;AU.unlocked=true;saveOpt();auTick();if(on)try{sfx("sfx-tap")}catch(x){}};
 $("o-mus").oninput=e=>{OPT.mus=+e.target.value;saveOpt();auTick()};$("o-sfx").oninput=e=>{OPT.sfx=+e.target.value;saveOpt()};$("o-vo").oninput=e=>{OPT.vo=+e.target.value;saveOpt();try{voice("f-softlaugh",1)}catch(x){}};
 $("o-vib").onchange=e=>{OPT.vib=e.target.checked;saveOpt()};$("o-fx").onchange=e=>{OPT.fxon=e.target.checked;OPT.fxpick=1;OPT.fxauto=0;saveOpt();try{pxScene()}catch(x){}}};
/* Chép sổ / Nạp sổ: kit text boxes and buttons */
function kitXio(){const w=document.querySelector(".xiowrap");if(!w)return;w.querySelectorAll(".xiobox textarea").forEach(x=>kitInputize(x,x.id==="x-in"?"Dán bản chép":"Bản chép"));
 w.querySelectorAll(".xiobox button.main").forEach(b=>{b.classList.remove("main");b.classList.add("kbtn")});
 w.querySelectorAll(".xiobox button.btn").forEach(b=>{b.classList.remove("btn");b.classList.add("kbtn","alt")});
 w.querySelectorAll(".xiobox .kbtn[aria-pressed]").forEach(b=>b.classList.toggle("ksel",b.getAttribute("aria-pressed")==="true"))}
{const wx0=wireXio;wireXio=function(){const r=wx0.apply(this,arguments);try{kitXio()}catch(e){}return r}}
try{const ow=T.querySelector(".optwrap");if(ow&&ow.querySelector("#o-mute"))wireOpt()}catch(e){}
try{drawSlots()}catch(e){}
function xioReset(){try{XIO.m="";XIO.msg="";XIO.imp=null;XIO.to=0;XIO.ask=0;XIO.code=""}catch(e){}}
function numVi(n){try{return window.VP&&VP.num?VP.num(n):String(n)}catch(e){return String(n)}}
function lastSlot(){const F=[1,2,3].filter(n=>loadSlot(n));if(!F.length)return 0;return F.includes(SLOT)?SLOT:F[0]}
function homeMenu(){const n=lastSlot();let info="";
 if(n){const d=loadSlot(n);if(d&&d.S)info=[`${slotWho(d.S)} ${d.S.name}`,slotDate(d.S)].filter(Boolean).join(" · ")}
 const B=n?`<button class="kbtn k1" data-tgo="slots" data-cstab="solo">Tiếp tục<small>${info}</small></button><button class="kbtn alt" data-tgo="slots">Kiếp mới</button>`
          :`<button class="kbtn k1" data-tgo="slots">Bắt đầu<small>chọn sổ, xem Phúc duyên</small></button>`;
 return `<div class="kpmenu${n?" n4":""}">${B}<button class="kbtn alt" data-tgo="past">Sổ luân hồi</button><button class="kbtn alt" data-tgo="opt">Thiết lập</button></div>`}
/* live nodes each sub-screen borrows from .tbox, in display order */
function partsOf(pg){if(pg==="slots")return[$("slots"),$("pdwrap")];if(pg==="opt")return[T.querySelector(".optwrap")||document.querySelector("#modal .optwrap"),T.querySelector(".cloudwrap")||document.querySelector("#modal .cloudwrap"),T.querySelector(".xiowrap")||document.querySelector("#modal .xiowrap")];return[]}
let PAST=null;
function park(){const M=$("modal");if(!M)return;["#slots","#pdwrap",".xiowrap",".optwrap",".cloudwrap"].forEach(s=>{const n=M.querySelector(s);if(n)BOX.appendChild(n)})}
let HM=null,SM=null;
/* the sổ list (j6) was drawn with the old .main / .btn buttons: give it the kit's one button (.kbtn primary, .kbtn.alt the other).
   Thiết lập keeps what the kit already makes of its parts (Chép sổ / Nạp sổ are kit cards). */
function kitBtns(box){const s=box.querySelector("#slots");if(!s)return;s.querySelectorAll("button.main").forEach(b=>{b.classList.remove("main");b.classList.add("kbtn")});
 s.querySelectorAll("button.btn").forEach(b=>{b.classList.remove("btn");b.classList.add("kbtn","alt")})}
function noSeal(M){const s=M.querySelector(".dlg > .kph .kpseal");if(s)s.remove()}
function mount(){const M=$("modal");if(!SM||Q[0]!==SM||M.hidden)return;const box=M.querySelector(".kpt-mount");if(!box)return;
 if(PG==="past"){box.innerHTML=pastBody()}else if(PG==="notes"){box.innerHTML=window.CTM_NOTES_UI?CTM_NOTES_UI.body():""}else partsOf(PG).forEach(n=>{if(n)box.appendChild(n)});
 kitBtns(box);
 noSeal(M);const mr=$("mr");if(mr)mr.innerHTML=`<button class="kbtn alt" data-tgo="${PG==="notes"?"opt":"home"}">‹ Lui</button>`}
function dropAll(){const M=$("modal");park();[HM,SM].forEach(m=>{if(!m)return;const i=Q.indexOf(m);if(i>=0)Q.splice(i,1)});HM=SM=null;
 if(M&&M.classList.contains("kptitle")){M.classList.remove("kptitle","kpthome","kpscene");if(T.hidden&&Q.length)showModal();else M.hidden=true}}
function homeOpen(){dropAll();HM=kitModal({scene:true,kind:"notice",title:"Cung Tường Mộng",sub:"Mỗi kiếp một thân phận. Leo từ Đáp ứng lên Hoàng hậu, rồi đưa con lên ngôi.",html:homeMenu(),cls:"kptitle kpthome"});noSeal($("modal"))}
function subOpen(pg){dropAll();if(pg==="opt"){xioReset();try{wireOpt();wireXio()}catch(e){}try{if(window.CTM_CLOUD)CTM_CLOUD.wire()}catch(e){}}
 if(pg==="slots")drawSlots();
 SM=kitModal({scene:true,kind:"notice",title:HEAD[pg]||"",sub:(pg==="slots"&&csGet()==="coop"?SUBH.slotsco:SUBH[pg])||"",html:`<div class="kpt-mount" data-pg="${pg}"></div>`,cls:"kptitle"});mount()}
function pastBody(){let h="";try{h=pastHTML()||""}catch(e){}h=h.replace(/^<h3>Sổ luân hồi<\/h3>/,"");
 if(!/pcrow|Kiếp \d/.test(h))h=`<p class="past">Chưa có kiếp nào được ghi.</p>`+h;return h}
function go(pg,focus){if(PG==="opt"&&pg!=="opt")xioReset();PG=pg;T.dataset.pg=pg;if(T.hidden){dropAll();return}
 if(pg==="home")homeOpen();else subOpen(pg);
 const M=$("modal");if(M)M.scrollTop=0;
 if(focus!==false){const f=pg==="home"?document.querySelector("#modal.kptitle .kpmenu .kbtn"):document.querySelector("#modal.kptitle #mr .kbtn");if(f)f.focus({preventScroll:true})}}
/* ONE close-then-open path for every ☰ entry that goes back to the game (Tiếp tục, Xem lại lời dặn on the home page AND inside Thiết lập): close the menu cards, load the sổ, nothing of the menu is left behind. window.kitMenuResume() */
function resumeGame(){const n=lastSlot();const lb=n&&$("slots").querySelector(`[data-load="${n}"]`);if(!lb)return false;PG="home";dropAll();lb.click();return true}
window.kitMenuResume=resumeGame;
$("modal").addEventListener("click",e=>{const M=$("modal");if(!M.classList.contains("kptitle"))return;const b=e.target.closest("button[data-tgo]");if(!b)return;e.stopPropagation();const g=b.dataset.tgo;try{if(typeof sfx==="function")sfx("sfx-tap")}catch(x){}
 if(b.dataset.cstab){csSet(b.dataset.cstab);if(g==="slots")try{drawSlots()}catch(x){}}
 if(g==="cont"){resumeGame();return}
 go(g)},true);
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!T.hidden&&PG!=="home"){e.preventDefault();go("home")}});
/* re-renderers of the borrowed parts: give the parts back first, re-mount after */
function wrapPark(name){const f=window[name];if(typeof f!=="function")return;window[name]=function(){park();let r;try{r=f.apply(this,arguments)}finally{try{if(!T.hidden)mount()}catch(e){}}return r}}
/* showTitle: from the game (title was hidden) always opens on the home screen; a refresh while open keeps the sub-screen */
const t0=showTitle;showTitle=function(){const was=T.hidden;park();const r=t0.apply(this,arguments);try{drawSlots()}catch(e){}try{go(was?"home":PG,was)}catch(e){console.error(e)}return r};
window.showTitle=showTitle;
const m=$("menu");if(m){const m0=m.onclick;m.onclick=function(){PG="home";return m0&&m0.apply(this,arguments)}}
new MutationObserver(()=>{if(T.hidden&&(HM||SM))dropAll()}).observe(T,{attributes:true,attributeFilter:["hidden"]});
/* after every module has loaded (the kit panel, j79, wraps showModal later in the bundle): wrap outermost, then first paint */
setTimeout(()=>{try{
 ["wireOpt","wireXio","pdTitle"].forEach(wrapPark);
 const s0=showModal;showModal=function(){if(T.hidden&&(HM||SM)){const a=HM,b=SM;park();HM=SM=null;[a,b].forEach(x=>{const i=x?Q.indexOf(x):-1;if(i>=0)Q.splice(i,1)});const M=$("modal");if(M)M.classList.remove("kptitle","kpthome","kpscene")}
  else park();
  const r=s0.apply(this,arguments);try{const M=$("modal");if(!M.hidden&&Q[0]&&(Q[0]===HM||Q[0]===SM)){noSeal(M);if(Q[0]===SM)mount()}}catch(e){console.error(e)}return r};
 window.showModal=showModal;
 T.dataset.pg="home";if(!T.hidden&&PG==="home"&&!HM)go("home",false)}catch(e){console.error(e)}},0);
}catch(e){console.error(e)}})();
