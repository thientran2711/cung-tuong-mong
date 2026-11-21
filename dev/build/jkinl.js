/* ================= KIT §70.6 · INLINE ITEM STRIP · kinlStrip / kinlPick / kinlIsSel (owner mark #21, OD 21/11 ~02:45Z, review/bag-inline) =================
   Owner (verbatim): "khi mà tao bấm vào một cái món đồ nào đó thì nó sẽ hiện cái hình ô hình vuông nhỏ đó. Bên cái khung bên phải sẽ là thông tin của cái món đồ đó,
   không cần pop up ra một cái khung nào hết, tại vì nó sẽ che mất những cái hình khác ... bấm một hình một xem thông tin, bấm hình hai xem thông tin. Người ta sẽ không
   thích cái kiểu mà pop up lên rồi phải tắt đi ... Sau đó là cái phần sắc, xa xỉ, đã biết, đúng phẩm nè. Cái này là mình sẽ đưa qua cái khung bên phải kế bên cái khung thông tin ...
   xếp vào một cái khung nhỏ, hoặc là xếp vào hàng dọc".
   ONE kit part = the strip UNDER an item grid (`kitInvGrid({inline:true})`): LEFT a small SQUARE picture of the tapped item, MIDDLE its info (the same
   kit rows + act buttons the old pop-up held), RIGHT the grid's summary chips (Sắc +N · Xa xỉ N · ✓ Đã biết: Đúng phẩm …) as ONE vertical column. No pop-up, no ✕: tapping
   another tile swaps the strip in place. Empty state "Chạm một món để xem." (the chips stay).
   HOW (whole group, one code path): the grid's `onPick(item)` still builds its pop-up with kitModal({kind:"info",...}); while a pick is CAPTURED (KINL.cap) that call is
   diverted into the strip instead of opening a modal, so every older opener wrapped around kinvOpen (works, recipe books, shelf, Dấu ấn, wardrobe, …) fills the strip too.
   The selection is remembered per grid (KINL.sel[key] = item id) and re-captured on every render, so the strip always shows the live state (Đeo → Tháo, sold item → gone). */
const KINL={sel:{},cap:null};
function kinlId(x){try{if(x.g)return(x.g.wk?"w":"i")+x.g.i+":"+(x.g.k||"");if(x.mme!=null)return"m"+x.mme;if(x.k)return"k"+x.k+":"+(x.ix!=null?x.ix:"");}catch(e){}return"t"+(x.tip||x.name||"")}
function kinlIsSel(key,x){return KINL.sel[key]!=null&&KINL.sel[key]===kinlId(x)}
function kinlCapture(o,x){KINL.cap={};try{o.onPick(x)}catch(e){console.error("kinlCapture",e)}const c=KINL.cap;KINL.cap=null;return c&&c.spec?c.spec:null}
function kinlStrip(o){const key=o.key||"bag";let spec=null;const id=KINL.sel[key];
 if(id!=null){const x=(o.items||[]).find(y=>kinlId(y)===id);spec=x?kinlCapture(o,x):null;if(!spec)delete KINL.sel[key]}
 const body=spec?`<div class="kinlpic">${spec.itemPic||""}</div><div class="kinlinfo"><b class="kinln">${spec.title||""}</b>${spec.sub?`<span class="kinlsub">${spec.sub}</span>`:""}${spec.html||""}</div>`
  :`<div class="kinlempty">Chạm một món để xem.</div>`;
 return `<div class="kidet kidet-inline kinldet" data-kinl="${key}">${body}${o.sum?`<div class="kinlchips">${o.sum}</div>`:""}</div>`}
/* tap = select + swap the strip in place (no re-render of the grid: the page keeps its scroll and the tab row stays put) */
function kinlPick(o,x){const key=o.key||"bag";KINL.sel[key]=kinlId(x);const spec=kinlCapture(o,x);
 if(!spec){delete KINL.sel[key];o.onPick(x);return}
 const old=document.querySelector(`.kinldet[data-kinl="${key}"]`);if(old){const t=document.createElement("div");t.innerHTML=kinlStrip(o);old.replaceWith(t.firstElementChild)}
 document.querySelectorAll(`.kinv[data-kinv="${key}"] .kinvg > .kitem`).forEach(e=>{const on=e.dataset.kinvi!=null&&(o.items||[])[+e.dataset.kinvi]===x;e.classList.toggle("kitem-sel",on);if(on)e.setAttribute("aria-pressed","true");else e.removeAttribute("aria-pressed")});
 try{if(typeof sfx==="function")sfx("tap")}catch(e){}try{if(typeof kitFix==="function")kitFix(document.getElementById("panel"))}catch(e){}try{kitInvFit()}catch(e){}}
/* the capture: an info pop-up built while a pick is captured goes to the strip, nowhere else */
(function(){if(typeof kitModal!=="function")return;const k0=kitModal;kitModal=function(spec){if(KINL.cap&&spec&&spec.kind==="info"&&!KINL.cap.spec){KINL.cap.spec=spec;return null}return k0.apply(this,arguments)};window.kitModal=kitModal})();
(function(){const st=document.createElement("style");st.id="kinl-css";st.textContent=`
.kinldet{display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:10px;align-items:start;margin:8px 0 0;padding:8px;border:1px solid var(--k-hair,#e6d3ac);border-radius:10px;background:#fbf3e3;box-shadow:inset 0 1px 3px #5a3a2018;min-width:0}
.kinldet .kinlpic{width:var(--kinlsz,88px);aspect-ratio:1/1;flex:none}
.kinldet .kinlpic .kitem{--isz:100%;width:100%}
.kinldet .kinlinfo{min-width:0;display:flex;flex-direction:column;gap:3px}
.kinldet .kinln{font-family:var(--font-d,inherit);font-size:1.02rem;line-height:1.2}
.kinldet .kinlsub{font-size:.78rem;opacity:.75}
.kinldet .kinvacts{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,150px),1fr));gap:6px;margin-top:6px}
.kinldet .kinlchips{display:flex;flex-direction:column;gap:5px;align-items:stretch;font-size:.78rem;max-width:132px;padding:6px;border:1px solid var(--k-hair,#e6d3ac);border-radius:8px;background:#f4ead8}
.kinldet .kinlchips .chip{white-space:normal}
.kinldet .kinlempty{grid-column:1/2;align-self:center;padding:10px 4px;opacity:.7}
.kinldet .kinlempty+.kinlchips{grid-column:3}
.kinldet:has(.kinlempty){grid-template-columns:minmax(0,1fr) auto}
.kinldet:has(.kinlempty) .kinlchips{grid-column:2}
`;document.head.appendChild(st)})();
