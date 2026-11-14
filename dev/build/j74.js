/* j74: title screen like most games (owner 11/14). Entering shows the whole key art (img/title-key.webp) with the
   game's name and a few big kit buttons at the bottom (landscape: art on the left, menu in the column beside it),
   so no face is covered. The old cream panel becomes the sub-screens, each with a back button:
     Tiếp tục   -> loads the last played slot (same path as the slot's "Tiếp tục kiếp này" button)
     Bắt đầu / Kiếp mới -> slot picker (#slots: continue / new life per slot) + Phúc duyên box (j52)
     Sổ luân hồi -> pastHTML() (j32 + j52 Phúc duyên line)
     Cài đặt    -> sound/music/voice sliders, mute, vibration, effects (j11 wireOpt) + export/import (j16 wireXio)
   Wraps showTitle and the menu button only; every earlier module keeps building its own part of the panel.
   Kit review: the home menu is the kit SCENE PANEL (KIT.md 14): kitModal({scene:true}) raised over the title art, menu = kit buttons
   (.kbtn primary, .kbtn.alt the others); no private button look, no translucent backgrounds of its own. */
(function(){try{
const T=$("title");if(!T)return;const BOX=T.querySelector(".tbox");if(!BOX)return;
let PG="home";
const st=document.createElement("style");
st.textContent=`
#title.title{background:linear-gradient(rgba(245,236,220,0) 56%,rgba(245,236,220,.72)),url(img/title-key.webp) center top/cover no-repeat,#f3e6d6!important}
@media (orientation:landscape){#title.title{background:linear-gradient(90deg,rgba(245,236,220,0) calc(75vh - 90px),rgba(245,236,220,.6) 75vh),url(img/title-key.webp) left top/auto 100% no-repeat,linear-gradient(rgba(245,236,220,.74),rgba(245,236,220,.74)),url(img/title-key.webp) center/cover no-repeat,#f3e6d6!important}
 #title .tbox{margin:auto 0 auto auto!important;max-width:min(440px,max(320px,calc(100vw - 75vh - 24px)))}}
#title[data-pg=home] .tbox{display:none}
.modal.kptitle{z-index:55;background:none}
.modal.kptitle .dlg #mr{display:none!important}
.kpmenu{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin:2px 0 10px}
.kpmenu .kbtn{min-height:46px;padding:6px 10px;white-space:normal;text-align:center}
.kpmenu .kbtn.k1{grid-column:1/-1;min-height:54px}
.kpmenu .kbtn small{display:block;font-family:var(--body);font-weight:400;font-size:.74rem;opacity:.9}
.kpmenu.n4{grid-template-columns:repeat(3,minmax(0,1fr))}
.tback{display:flex;align-items:center;gap:8px;margin:0 0 6px}.tback .btn{text-align:center}
.thead{font-family:var(--display);color:var(--gold);font-size:1.3rem;margin:0 0 8px}
.tpast{text-align:left}.tpast .past{white-space:normal}
`;
document.head.appendChild(st);
/* remove the inline backgrounds of j37/j50 so the rule above decides */
T.style.removeProperty("background");
/* sub-screen parts inside the old panel */
const back=document.createElement("div");back.className="tback";back.dataset.tp="slots opt past";back.innerHTML=`<button class="btn" data-tback="1">‹ Quay lại</button>`;
const head=document.createElement("h2");head.className="thead";head.dataset.tp="slots opt past";
const past=document.createElement("div");past.className="tpast";past.dataset.tp="past";
BOX.insertBefore(head,BOX.firstChild);BOX.insertBefore(back,head);BOX.appendChild(past);
const HEAD={slots:"Chọn ô lưu",opt:"Cài đặt",past:"Sổ luân hồi"};
function lastSlot(){const F=[1,2,3].filter(n=>loadSlot(n));if(!F.length)return 0;return F.includes(SLOT)?SLOT:F[0]}
function homeMenu(){const n=lastSlot();let info="";
 if(n){const el=$("slots").querySelector(`[data-load="${n}"]`);const sl=el&&el.closest(".slot");const nm=sl&&sl.querySelector("b"),ps=sl&&sl.querySelector(".past");info=[nm?nm.textContent:"Ô "+n,ps?ps.textContent:""].filter(Boolean).join(" · ")}
 const B=n?`<button class="kbtn k1" data-tgo="cont">Tiếp tục<small>${info}</small></button><button class="kbtn alt" data-tgo="slots">Kiếp mới</button>`
          :`<button class="kbtn k1" data-tgo="slots">Bắt đầu<small>chọn ô lưu, xem Phúc duyên</small></button>`;
 return `<div class="kpmenu${n?" n4":""}">${B}<button class="kbtn alt" data-tgo="past">Sổ luân hồi</button><button class="kbtn alt" data-tgo="opt">Cài đặt</button></div>`}
/* the home menu = one kit scene panel over the art (front of the modal queue while the title is open) */
let HM=null;
function homeOpen(){homeClose(true);HM=kitModal({scene:true,kind:"end",title:"Cung Tường Mộng",sub:"Mỗi kiếp một thân phận. Leo từ Đáp ứng lên Hoàng hậu, rồi đưa con lên ngôi.",html:homeMenu(),cls:"kptitle"});}
function homeClose(quiet){const M=$("modal");if(HM){const i=Q.indexOf(HM);if(i>=0)Q.splice(i,1);HM=null}
 if(M&&M.classList.contains("kptitle")){M.classList.remove("kptitle","kpscene");if(T.hidden&&Q.length)showModal();else M.hidden=true}}
function pastBody(){let h="";try{h=pastHTML()||""}catch(e){}h=h.replace(/^<h3>Sổ luân hồi<\/h3>/,"");
 if(!/pcrow|Kiếp \d/.test(h))h=`<p class="past">Chưa có kiếp nào được ghi.</p>`+h;return h}
function tag(){[...BOX.children].forEach(c=>{if(c.dataset.tp)return;
 if(c.id==="slots"||c.id==="pdwrap")c.dataset.tp="slots";else if(c.classList.contains("optwrap")||c.classList.contains("xiowrap"))c.dataset.tp="opt";else if(c.tagName==="IMG"||c.tagName==="H1"||c.classList.contains("sub"))c.dataset.tp="none"})}
function go(pg,focus){PG=pg;T.dataset.pg=pg;tag();
if(pg==="home"){if(!T.hidden)homeOpen()}else{homeClose();head.textContent=HEAD[pg]||"";if(pg==="past")past.innerHTML=pastBody();
  if(pg==="opt"){try{if(!BOX.querySelector(".optwrap"))wireOpt();if(!BOX.querySelector(".xiowrap"))wireXio()}catch(e){}const ow=BOX.querySelector(".optwrap"),xw=BOX.querySelector(".xiowrap");if(ow&&xw&&(ow.compareDocumentPosition(xw)&Node.DOCUMENT_POSITION_PRECEDING))BOX.insertBefore(ow,xw);tag()}}
 T.scrollTop=0;if(focus!==false){const f=pg==="home"?document.querySelector("#modal.kptitle .kbtn"):back.querySelector("button");if(f)f.focus({preventScroll:true})}}
$("modal").addEventListener("click",e=>{const M=$("modal");if(!M.classList.contains("kptitle"))return;const b=e.target.closest("button[data-tgo]");if(!b)return;e.stopPropagation();const g=b.dataset.tgo;try{if(typeof sfx==="function")sfx("sfx-tap")}catch(x){}
 if(g==="cont"){const n=lastSlot();const lb=n&&$("slots").querySelector(`[data-load="${n}"]`);if(lb){PG="home";homeClose();lb.click()}return}
 go(g)},true);
back.onclick=e=>{if(e.target.closest("[data-tback]"))go("home")};
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!T.hidden&&PG!=="home"){e.preventDefault();go("home")}});
/* showTitle: from the game (title was hidden) always opens on the home screen; a refresh while open keeps the sub-screen */
const t0=showTitle;showTitle=function(){const was=T.hidden;const r=t0.apply(this,arguments);try{go(was?"home":PG,was)}catch(e){console.error(e)}return r};
window.showTitle=showTitle;
const m=$("menu");if(m){const m0=m.onclick;m.onclick=function(){PG="home";return m0&&m0.apply(this,arguments)}}
new MutationObserver(()=>{if(T.hidden&&HM)homeClose()}).observe(T,{attributes:true,attributeFilter:["hidden"]});
/* first paint after every module has loaded (the kit panel, j79, wraps showModal later in the bundle) */
T.dataset.pg="home";setTimeout(()=>{if(!T.hidden&&PG==="home"&&!HM)go("home",false)},0);
}catch(e){console.error(e)}})();
