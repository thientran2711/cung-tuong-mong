/* j74: title screen like most games (owner 11/14). Entering shows the whole key art (img/title-key.webp) with the
   game's name and a few big kit buttons at the bottom (landscape: art on the left, menu in the column beside it),
   so no face is covered. Every screen is ONE kit scene panel (KIT.md 8 + 14: kitModal({scene:true}), header .kph,
   one button style .kbtn / .kbtn.alt); the old cream panel (.tbox) is never shown, it only keeps the live parts:
     Tiếp tục    -> loads the last played slot (same path as the slot's "Tiếp tục kiếp này" button)
     Bắt đầu / Kiếp mới -> "Chọn sổ": #slots (continue / new life per sổ) + #pdwrap Phúc duyên box (j52), nothing else
     Sổ luân hồi -> pastHTML() (j32 + j52 Phúc duyên line)
     Thiết lập   -> .optwrap sound/music/voice sliders, mute, vibration, effects (j11) + .xiowrap Chép sổ / Nạp sổ (j16)
   A sub-screen panel borrows those live nodes (their own handlers stay on them) and gives them back to .tbox before
   anything re-renders them (showTitle, wireOpt, wireXio, pdTitle, showModal), so earlier modules keep finding them.
   Back = "‹ Lui" (.kbtn.alt in #mr). Kit review 11/14: no private heading/back styles (.thead/.tback gone);
   no seal on these panels (KIẾP is the seal of a life's end; the kit owner may assign a title-screen seal later). */
(function(){try{
const T=$("title");if(!T)return;const BOX=T.querySelector(".tbox");if(!BOX)return;
let PG="home";
const st=document.createElement("style");
st.textContent=`
#title.title{background:linear-gradient(rgba(245,236,220,0) 56%,rgba(245,236,220,.72)),url(img/title-key.webp) center top/cover no-repeat,#f3e6d6!important}
@media (orientation:landscape){#title.title{background:linear-gradient(90deg,rgba(245,236,220,0) calc(75vh - 90px),rgba(245,236,220,.6) 75vh),url(img/title-key.webp) left top/auto 100% no-repeat,linear-gradient(rgba(245,236,220,.74),rgba(245,236,220,.74)),url(img/title-key.webp) center/cover no-repeat,#f3e6d6!important}}
#title .tbox{display:none!important}
.modal.kptitle{z-index:55;background:none}
.modal.kpthome .dlg #mr{display:none!important}
.kpmenu{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin:2px 0 10px}
.kpmenu .kbtn{min-height:46px;padding:6px 10px;white-space:normal;text-align:center}
.kpmenu .kbtn.k1{grid-column:1/-1;min-height:54px}
.kpmenu .kbtn small{display:block;font-family:var(--body);font-weight:400;font-size:.74rem;opacity:.9}
.kpmenu.n4{grid-template-columns:repeat(3,minmax(0,1fr))}
`;
document.head.appendChild(st);
/* remove the inline backgrounds of j37/j50 so the rule above decides */
T.style.removeProperty("background");
const HEAD={slots:"Chọn sổ",opt:"Thiết lập",past:"Sổ luân hồi"};
const SUBH={slots:"Mỗi sổ là một kiếp. Phúc duyên ở dưới.",opt:"Tiếng, nhạc, giọng, rung; chép sổ và nạp sổ.",past:"Những kiếp đã qua."};
function numVi(n){try{return window.VP&&VP.num?VP.num(n):String(n)}catch(e){return String(n)}}
function lastSlot(){const F=[1,2,3].filter(n=>loadSlot(n));if(!F.length)return 0;return F.includes(SLOT)?SLOT:F[0]}
function homeMenu(){const n=lastSlot();let info="";
 if(n){const el=$("slots").querySelector(`[data-load="${n}"]`);const sl=el&&el.closest(".slot");const nm=sl&&sl.querySelector("b"),ps=sl&&sl.querySelector(".past");info=[nm?nm.textContent:"Sổ "+numVi(n),ps?ps.textContent:""].filter(Boolean).join(" · ")}
 const B=n?`<button class="kbtn k1" data-tgo="cont">Tiếp tục<small>${info}</small></button><button class="kbtn alt" data-tgo="slots">Kiếp mới</button>`
          :`<button class="kbtn k1" data-tgo="slots">Bắt đầu<small>chọn sổ, xem Phúc duyên</small></button>`;
 return `<div class="kpmenu${n?" n4":""}">${B}<button class="kbtn alt" data-tgo="past">Sổ luân hồi</button><button class="kbtn alt" data-tgo="opt">Thiết lập</button></div>`}
/* live nodes each sub-screen borrows from .tbox, in display order */
function partsOf(pg){if(pg==="slots")return[$("slots"),$("pdwrap")];if(pg==="opt")return[T.querySelector(".optwrap")||document.querySelector("#modal .optwrap"),T.querySelector(".xiowrap")||document.querySelector("#modal .xiowrap")];return[]}
let PAST=null;
function park(){const M=$("modal");if(!M)return;["#slots","#pdwrap",".xiowrap",".optwrap"].forEach(s=>{const n=M.querySelector(s);if(n)BOX.appendChild(n)})}
let HM=null,SM=null;
/* the sổ list (j6) was drawn with the old .main / .btn buttons: give it the kit's one button (.kbtn primary, .kbtn.alt the other).
   Thiết lập keeps what the kit already makes of its parts (Chép sổ / Nạp sổ are kit cards). */
function kitBtns(box){const s=box.querySelector("#slots");if(!s)return;s.querySelectorAll("button.main").forEach(b=>{b.classList.remove("main");b.classList.add("kbtn")});
 s.querySelectorAll("button.btn").forEach(b=>{b.classList.remove("btn");b.classList.add("kbtn","alt")})}
function noSeal(M){const s=M.querySelector(".dlg > .kph .kpseal");if(s)s.remove()}
function mount(){const M=$("modal");if(!SM||Q[0]!==SM||M.hidden)return;const box=M.querySelector(".kpt-mount");if(!box)return;
 if(PG==="past"){box.innerHTML=pastBody()}else partsOf(PG).forEach(n=>{if(n)box.appendChild(n)});
 kitBtns(box);
 noSeal(M);const mr=$("mr");if(mr)mr.innerHTML=`<button class="kbtn alt" data-tgo="home">‹ Lui</button>`}
function dropAll(){const M=$("modal");park();[HM,SM].forEach(m=>{if(!m)return;const i=Q.indexOf(m);if(i>=0)Q.splice(i,1)});HM=SM=null;
 if(M&&M.classList.contains("kptitle")){M.classList.remove("kptitle","kpthome","kpscene");if(T.hidden&&Q.length)showModal();else M.hidden=true}}
function homeOpen(){dropAll();HM=kitModal({scene:true,kind:"notice",title:"Cung Tường Mộng",sub:"Mỗi kiếp một thân phận. Leo từ Đáp ứng lên Hoàng hậu, rồi đưa con lên ngôi.",html:homeMenu(),cls:"kptitle kpthome"});noSeal($("modal"))}
function subOpen(pg){dropAll();if(pg==="opt"){try{if(!T.querySelector(".optwrap"))wireOpt();if(!T.querySelector(".xiowrap"))wireXio()}catch(e){}}
 SM=kitModal({scene:true,kind:"notice",title:HEAD[pg]||"",sub:SUBH[pg]||"",html:`<div class="kpt-mount" data-pg="${pg}"></div>`,cls:"kptitle"});mount()}
function pastBody(){let h="";try{h=pastHTML()||""}catch(e){}h=h.replace(/^<h3>Sổ luân hồi<\/h3>/,"");
 if(!/pcrow|Kiếp \d/.test(h))h=`<p class="past">Chưa có kiếp nào được ghi.</p>`+h;return h}
function go(pg,focus){PG=pg;T.dataset.pg=pg;if(T.hidden){dropAll();return}
 if(pg==="home")homeOpen();else subOpen(pg);
 const M=$("modal");if(M)M.scrollTop=0;
 if(focus!==false){const f=pg==="home"?document.querySelector("#modal.kptitle .kpmenu .kbtn"):document.querySelector("#modal.kptitle #mr .kbtn");if(f)f.focus({preventScroll:true})}}
$("modal").addEventListener("click",e=>{const M=$("modal");if(!M.classList.contains("kptitle"))return;const b=e.target.closest("button[data-tgo]");if(!b)return;e.stopPropagation();const g=b.dataset.tgo;try{if(typeof sfx==="function")sfx("sfx-tap")}catch(x){}
 if(g==="cont"){const n=lastSlot();const lb=n&&$("slots").querySelector(`[data-load="${n}"]`);if(lb){PG="home";dropAll();lb.click()}return}
 go(g)},true);
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!T.hidden&&PG!=="home"){e.preventDefault();go("home")}});
/* re-renderers of the borrowed parts: give the parts back first, re-mount after */
function wrapPark(name){const f=window[name];if(typeof f!=="function")return;window[name]=function(){park();let r;try{r=f.apply(this,arguments)}finally{try{if(!T.hidden)mount()}catch(e){}}return r}}
/* showTitle: from the game (title was hidden) always opens on the home screen; a refresh while open keeps the sub-screen */
const t0=showTitle;showTitle=function(){const was=T.hidden;park();const r=t0.apply(this,arguments);try{go(was?"home":PG,was)}catch(e){console.error(e)}return r};
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
