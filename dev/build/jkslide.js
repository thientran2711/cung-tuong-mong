/* KIT §21c kitSlide (review/chapter-card, owner marks #28/#29 21/11 ~03:05Z/~03:07Z): the CHAPTER SLIDE CAROUSEL.
   Owner (verbatim #28): "một cái hình to, dài ... ngay trên cái hình đó luôn mình sẽ ghi cái tên ... chương 1 ... rồi cái tên của cái chương ... từng hồi ... đè lên trên cái hình đó luôn cũng được ... một cái nút mũi tên ... vuốt qua một cái là nó sẽ qua chương 2 ... những cái thông tin ở dưới cũng sẽ đi qua theo của chương 2 luôn".
   #29: "Làm tương tự ... bất kỳ một cái chỗ nào mà có liên quan tới chương ... một cái nút ở một cái góc nhỏ ... mục lục chương ... bấm vô là nó sẽ hiện ra toàn bộ những cái chương".
   kitSlide(key,slides,o): slides=[{kicker:"Chương 1",title:"Tân quân",sub:"Hồi 0/2",img,body:<kit html>,tap:"fnName"?, toc:[state,text,note?]}].
   One wide picture (kitSceneArt wide) with the kicker / title / sub written ON it, arrows + swipe change the slide, the body rows under it follow the slide,
   a small «Mục lục» button in the bottom-right corner of the picture opens the list of all chapters (state done / now / next). o.cur = first slide, o.tocTitle. */
(function(){try{
const KSL={},KST={};
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]))}
function kitSlide(key,slides,o){o=o||{};slides=(slides||[]).filter(Boolean);if(!slides.length)return"";const n=slides.length;
 let st=KSL[key];if(!st||st.n!==n)st=KSL[key]={i:Math.max(0,Math.min(n-1,o.cur!=null?o.cur:0)),n};const cur=st.i;
 KST[key]={title:o.tocTitle||"Mục lục",items:(o.tocAll&&o.tocAll.length?o.tocAll:slides.map(s=>s.toc).filter(Boolean).concat(o.tocMore||[]))};
 const pic=slides.map((s,i)=>`<div class="ksls"${i===cur?"":" hidden"}${s.tap?` data-kstap="${s.tap}"`:""}>${kitSceneArt(s.img||"",s.title||"",{shape:"wide",cap:false,cls:"kslart"})}`+
  `<div class="kslcap">${s.kicker?`<small>${s.kicker}</small>`:""}<b>${s.title||""}</b>${s.sub?`<span>${s.sub}</span>`:""}</div></div>`).join("");
 const bod=slides.map((s,i)=>`<div class="kslbd"${i===cur?"":" hidden"}>${s.body||""}</div>`).join("");
 return `<div class="kslide" data-ksk="${esc(key)}" data-ksn="${n}"><div class="kslw">${pic}`+
  (n>1?`<button type="button" class="kslar kslprev" data-ksgo="-1" aria-label="Chương trước"${cur<=0?" disabled":""}>‹</button><button type="button" class="kslar kslnext" data-ksgo="1" aria-label="Chương sau"${cur>=n-1?" disabled":""}>›</button><span class="kslpos">${cur+1}/${n}</span>`:"")+
  (KST[key].items.length?`<button type="button" class="kslmuc" data-ksmuc="1">Mục lục</button>`:"")+`</div><div class="kslb">${bod}</div></div>`}
/* owner 24/11 (f10-mucluc): Mục lục = ONE LARGE kit frame listing EVERY chapter by number + NAME with its state (kitStepList: đã qua ✓ / đang làm ▸ / chưa tới ·); `.kmuc` keeps it the one big size (jkpc).
   Opened by the «Mục lục» corner button of a kitSlide (data-ksmuc) and by any chip button data-ktoc (cung nữ road, which has no chapter slide). items = [state,text,note] */
function kitTocOpen(title,items){if(typeof kitModal!=="function")return;
 kitModal({kind:"info",title:title||"Mục lục",sections:[{h:"",html:`<div class="kmuc">${typeof kitStepList==="function"?kitStepList((items||[]).map(x=>[x[0],`<span class="kmn">${x[0]==="now"?`<b>${x[1]}</b>`:x[1]}</span>`,x[2]||""])):""}</div>`}],btn:"Lui"});
 setTimeout(()=>{try{const n=document.querySelector("#modal .kmuc .ksp-now");if(n&&n.scrollIntoView)n.scrollIntoView({block:"center"})}catch(e){}},60)}
window.kitTocOpen=kitTocOpen;
function go(root,d){const key=root.dataset.ksk,n=+root.dataset.ksn;const st=KSL[key]||{i:0,n};const i=Math.max(0,Math.min(n-1,st.i+d));if(i===st.i)return;st.i=i;KSL[key]=st;
 root.querySelectorAll(".ksls").forEach((e,j)=>e.hidden=j!==i);root.querySelectorAll(".kslbd").forEach((e,j)=>e.hidden=j!==i);
 const p=root.querySelector(".kslprev"),nx=root.querySelector(".kslnext"),ps=root.querySelector(".kslpos");if(p)p.disabled=i<=0;if(nx)nx.disabled=i>=n-1;if(ps)ps.textContent=`${i+1}/${n}`;
 try{const P=document.getElementById("panel");if(P&&typeof kitRowsAlign==="function")kitRowsAlign(root)}catch(e){}}
document.addEventListener("click",e=>{try{const t=e.target;if(!t||!t.closest)return;
 const g=t.closest("[data-ksgo]");if(g){e.stopPropagation();e.preventDefault();if(!g.disabled)go(g.closest(".kslide"),+g.dataset.ksgo);return}
 const m=t.closest("[data-ksmuc]");if(m){e.stopPropagation();e.preventDefault();const root=m.closest(".kslide"),T=KST[root.dataset.ksk];if(T)kitTocOpen(T.title,T.items);return}
 const tc=t.closest("[data-ktoc]");if(tc){e.stopPropagation();e.preventDefault();const L=typeof ktChapToc==="function"?ktChapToc():null;if(L)kitTocOpen("Mục lục chương",L);return}
 const s=t.closest(".ksls[data-kstap]");if(s&&!t.closest("button")){const f=window[s.dataset.kstap];if(typeof f==="function"){e.stopPropagation();f()}}}catch(x){console.error("kslide",x)}},true);
/* swipe: a horizontal drag of the picture goes to the next / previous slide */
let sx=null,sy=null;
document.addEventListener("pointerdown",e=>{const w=e.target&&e.target.closest&&e.target.closest(".kslw");sx=w?e.clientX:null;sy=e.clientY},true);
document.addEventListener("pointerup",e=>{if(sx==null)return;const w=e.target&&e.target.closest&&e.target.closest(".kslw");const dx=e.clientX-sx,dy=e.clientY-sy;sx=null;
 if(w&&Math.abs(dx)>40&&Math.abs(dx)>Math.abs(dy)*1.5)go(w.closest(".kslide"),dx<0?1:-1)},true);
const st=document.createElement("style");st.id="kit-slide";st.textContent=`
.kslide{margin:0 0 8px}.kslw{position:relative;touch-action:pan-y;user-select:none;-webkit-user-select:none}
.kslw .ksart.kslart{aspect-ratio:21/9;height:auto}
.ksls[hidden],.kslbd[hidden]{display:none}
.kslcap{position:absolute;left:3px;right:3px;bottom:3px;padding:26px 14px 10px;display:flex;flex-direction:column;gap:2px;pointer-events:none;border-radius:0 0 2px 2px;
 background:linear-gradient(180deg,#2a1a1200,#2a1a12cc 70%);color:#fffaf0;text-shadow:0 1px 3px #000a}
.kslcap small{font-size:.8rem;opacity:.92}.kslcap b{font:700 1.35rem/1.2 var(--display,serif)}.kslcap span{font-size:.85rem;opacity:.95}
.kslar{position:absolute;top:50%;transform:translateY(-50%);width:40px;height:40px;border-radius:50%;border:1px solid var(--gold,#8f5f0c);background:#fffaf0e6;color:var(--gold,#8f5f0c);font:700 1.6rem/1 var(--display,serif);padding:0 0 3px;cursor:pointer;z-index:3}
.kslprev{left:8px}.kslnext{right:8px}.kslar:disabled{opacity:.35;cursor:default}
.kslpos{position:absolute;top:8px;right:10px;font-size:.74rem;font-weight:700;color:#fffaf0;background:#2a1a12b0;padding:1px 8px;border-radius:9px;z-index:3}
.kslmuc{position:absolute;right:10px;bottom:10px;z-index:3;font-size:.78rem;font-weight:700;color:var(--gold,#8f5f0c);background:#fffaf0f2;border:1px solid var(--gold,#8f5f0c);border-radius:9px;padding:3px 10px;cursor:pointer}
.kslb{padding-top:6px}
/* Mục lục (owner 24/11 f10): the chapter list inside the one big info frame: full width, left-aligned, number + name left, state on the right of the same row */
.kmuc{width:100%;align-self:stretch;text-align:left}.kmuc .kchecks{align-items:stretch;gap:2px;margin:0}
.kmuc .kchk{align-items:baseline;padding:5px 2px;border-bottom:1px dotted #8f5f0c40}.kmuc .kchk:last-child{border-bottom:0}
.kmuc .kchkt{flex:1 1 auto;min-width:0;display:flex;justify-content:space-between;align-items:baseline;gap:10px}
.kmuc .ksteps .kchkt small{display:inline;flex:none;white-space:nowrap;margin:0}
html body #modal .kmuc .kchecks.ksteps{align-items:stretch;display:flex}.kmuc .kmn{flex:1 1 auto;min-width:0}
/* the list needs the whole width: the picture column of the info frame is not shown for it */
html body #modal .k3body:has(.kmuc)>.k3main{display:none!important}html body #modal .k3body:has(.kmuc)>.k3right{flex:1 1 100%!important;width:100%!important;max-width:none!important}
html body #modal .dlg .kpb.kpinfo:has(.kmuc){grid-template-columns:minmax(0,1fr)!important}html body #modal .dlg .kpb.kpinfo:has(.kmuc)>.kpsubj{display:none!important}`;document.head.appendChild(st);

/* KIT §21d (owner mark #43, 21/11 ~03:45Z): the picture of an info / chapter dialog (.kpb.kpinfo > .kpsubj.kpiart.kpev) FILLS its column: it takes the whole column height (no empty band under a small picture);
   on the portrait one page (html.kv1: the dialog is only ~250 px wide) the column is stacked: the picture is a wide band over the rows, never a 170 px tile squeezing the text to 64 px. */
const si=document.createElement("style");si.id="kit-infopic";si.textContent=`
html body #modal .dlg .kpb.kpinfo:has(>.kpsubj.kpiart.kpev){grid-template-columns:clamp(170px,40%,260px) minmax(0,1fr)!important}
html body #modal .dlg .kpb.kpinfo>.kpsubj.kpiart.kpev{height:calc(var(--kah,227px)*1.5)!important;min-height:0!important;max-height:none!important;align-self:start;position:sticky;top:0}
html body #modal .dlg .kpb.kpinfo>.kpsubj.kpiart.kpev>.ksart{position:absolute!important;inset:0!important;width:auto!important;height:auto!important;min-height:0!important;max-height:none!important;aspect-ratio:auto!important;flex:none!important}
html.kv1 body #modal .dlg .kpb.kpinfo:has(>.kpsubj.kpiart.kpev){grid-template-columns:minmax(0,1fr)!important;grid-template-rows:auto auto!important;height:auto!important}
html.kv1 body #modal .dlg .kpb.kpinfo>.kpsubj.kpiart.kpev{height:auto!important;aspect-ratio:16/9;position:relative;align-self:start;width:100%!important;grid-column:1!important;grid-row:1!important}
html.kv1 body #modal .dlg .kpb.kpinfo:has(>.kpsubj.kpiart.kpev)>.kpmain{grid-column:1!important;grid-row:2!important}/* KK35 K-KDTX-BAND ×2 («Danh hiệu» / «Thiên mệnh» on Fold): only the STACKED event-band layout puts the text under the band; a side band keeps the text in its own column (was: text forced under a 170 px band, tabs under the picture) */
html.kv1 body #modal .dlg.kdtx .kpb.kpinfo:has(>.kpsubj.kpiart.kpev){grid-template-rows:auto minmax(0,1fr)!important}html.kv1 body #modal .dlg.kdtx .kpb.kpinfo:has(>.kpsubj.kpiart.kpev)>.kpsubj.kpiart.kpev{position:relative!important;top:auto!important;max-height:calc(var(--kdroom,300px)*.42)!important}html.kv1 body #modal .dlg.kdtx .kpb.kpinfo:has(>.kpsubj.kpiart.kpev)>.kpmain{min-height:0!important;overflow:auto!important}/* the capped text (kdtx) never squeezes the band over its first rows: band row keeps its share, the text row scrolls inside. K-PICK-FOLD-BAND (KK61): the band cap is 42 % of the measured room in px (--kdroom, jk4 kitDlgText), not 42 % of its own auto row — that was circular: the row kept the band's full 16:9 height (empty ~170–190 px band) and the text row got 0 px, its prompt line hidden under the options */
html.kv1 body #modal .dlg .kpb.kpinfo>.kpsubj.kpiart.kpev>.ksart{position:relative!important;inset:auto!important;width:100%!important;flex:1 1 100%!important;height:auto!important;aspect-ratio:16/9!important}
html body #modal .dlg .kpb.kpinfo>.kpsubj.kpiart.kpev>.ksart>img{position:absolute!important;inset:3px!important;width:calc(100% - 6px)!important;height:calc(100% - 6px)!important;min-height:calc(100% - 6px)!important;max-height:none!important;object-fit:cover!important}`;document.head.appendChild(si);
window.kitSlide=kitSlide;
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§21c",title:"kitSlide · chương như một trang trượt: ảnh dài, tên chương đè lên ảnh, mũi tên + vuốt, hàng thông tin dưới đi theo, góc «Mục lục»",
 html:()=>kitSlide("kitpg-slide",[{kicker:"Chương 1",title:"Tên chương",sub:"Hồi 0/2",img:kitInfoArt("Mệnh truyện").src,body:kitRows([["Mục tiêu","Hàng thông tin dưới ảnh đi theo trang."]]),toc:["now","Chương 1 · Tên chương"]},
  {kicker:"Chương 2",title:"Chương kế",sub:"chưa tới",img:kitInfoArt("Mệnh truyện").src,body:kitRows([["Mục tiêu","Trang kế."]]),toc:["next","Chương 2 · Chương kế"]}])})}catch(e){}
}catch(e){console.error("jkslide",e)}})();
