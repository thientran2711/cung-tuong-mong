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
function kinlIsSel(key,x){const v=KINL.sel[key];return v!=null&&typeof v==="string"&&v===kinlId(x)}
function kinlCapture(o,x){KINL.cap={};try{o.onPick(x)}catch(e){console.error("kinlCapture",e)}const c=KINL.cap;KINL.cap=null;return c&&c.spec?c.spec:null}
/* the selection is an item id (bag tile) or {slot:i} (a "Bên mình" equipment slot of the same panel: the same strip shows it) */
function kinlSlotSel(key,i){const v=KINL.sel[key];return!!v&&typeof v==="object"&&v.slot===i}
function kinlSlotReg(o){return typeof KEQ==="object"&&KEQ.reg&&KEQ.reg[o.key]}
function kinlSpec(o){const key=o.key||"bag",v=KINL.sel[key];if(v==null)return null;
 if(typeof v==="object"){const q=kinlSlotReg(o),x=q&&q.slots&&q.slots[v.slot];return x&&q.onPick?kinlCapture(q,x):null}
 const x=(o.items||[]).find(y=>kinlId(y)===v);return x?kinlCapture(o,x):null}
function kinlStrip(o){const key=o.key||"bag";const spec=kinlSpec(o);if(!spec)delete KINL.sel[key];return kinlHTML(spec,o.sum,key)}
/* the ONE renderer of the strip: spec = {itemPic,title,sub,html(info rows + .kinvacts)} (or null = the empty state), sum = the chip column html */
function kinlHTML(spec,sum,key){key=key||"bag";
 /* F3 (rv bag-inline): the act buttons leave the narrow info column and take the FULL strip width under the picture / info / chips row (2-3 per row), so the strip is short */
 let acts="",info=spec?spec.html||"":"";if(spec&&info){const t=document.createElement("div");t.innerHTML=info;const a=t.querySelector(".kinvacts");if(a){acts=a.outerHTML;a.remove();info=t.innerHTML}}
 const body=spec?`<div class="kinlpic">${spec.itemPic||""}</div><div class="kinlinfo"><b class="kinln">${spec.title||""}</b>${spec.sub?`<span class="kinlsub">${spec.sub}</span>`:""}${info}</div>`
  :`<div class="kinlempty">Chạm một món để xem.</div>`;
 return `<div class="kidet kidet-inline kinldet" data-kinl="${key}">${body}${sum?`<div class="kinlchips">${sum}</div>`:""}${acts?`<div class="kinlacts">${acts}</div>`:""}</div>`}
/* F1 (bag-inline-3): a picker that keeps its own selection (dress chest, Hội phối đồ, veil, gift picker) calls this with the picked item ref → the SAME strip.
   o = {acts:[pbtn html…], sum: chip column html, key, e/luxItem/noLux (kitItemDetailRows options)}. ref null = the empty state. No pop-up, no ✕. */
function kinlDetail(ref,o){o=o||{};const R=ref!=null&&typeof kitItemRef==="function"?kitItemRef(ref):null;
 if(!R)return kinlHTML(null,o.sum,o.key||"pick");const I=R.I;
 const pic=kitItem({src:I.src512||I.src,name:"",grade:I.grade,gname:I.gname,size:"lg",qty:R.qty>1?R.qty:0,tip:I.name}).replace('<span class="kitn"></span>','');
 const worn=R.worn&&typeof kitChip==="function"?kitChip("Đang mặc","g"):"";const acts=(o.acts||[]).join("");
 return kinlHTML({itemPic:pic,title:`<span style="color:${I.col}">${kidEsc(I.name)}</span>`,sub:`${kidEsc(kidKind(R))}${worn?" "+worn:""}`,
  html:`<div class="kinvrows kidrows">${kitItemDetailRows(R,o)}</div>${o.facts&&typeof kitFacts==="function"?kitFacts(o.facts):""}${acts?`<div class="rbtn kinvacts">${acts}</div>`:""}`},o.sum,o.key||"pick")}
function kinlPaint(o){const key=o.key||"bag";const old=document.querySelector(`.kinldet[data-kinl="${key}"]`);if(old){const t=document.createElement("div");t.innerHTML=kinlStrip(o);old.replaceWith(t.firstElementChild)}
 const v=KINL.sel[key];document.querySelectorAll(`.kinv[data-kinv="${key}"] .kinvg > .kitem`).forEach(e=>{const on=typeof v==="string"&&e.dataset.kinvi!=null&&kinlId((o.items||[])[+e.dataset.kinvi]||{})===v;e.classList.toggle("kitem-sel",on)});
 document.querySelectorAll(`[data-keqk="${key}"][data-keqi]`).forEach(e=>e.classList.toggle("kitem-sel",!!v&&typeof v==="object"&&+e.dataset.keqi===v.slot));
 try{if(typeof sfx==="function")sfx("tap")}catch(e){}try{if(typeof kitFix==="function")kitFix(document.getElementById("panel"))}catch(e){}try{kitInvFit()}catch(e){}}
/* tap a bag tile = select + swap the strip in place (the grid is not re-rendered: scroll and tab row stay put) */
function kinlPick(o,x){const key=o.key||"bag";KINL.sel[key]=kinlId(x);if(!kinlCapture(o,x)){delete KINL.sel[key];o.onPick(x);return}kinlPaint(o)}
/* tap a "Bên mình" slot of the same panel: same strip. Returns false when the page has no strip (the slot keeps its own pop-up). */
function kinlPickSlot(q,i){const o=KINV.reg[q.key];if(!o||!o.inline||!document.querySelector(`.kinldet[data-kinl="${q.key}"]`))return false;
 const x=q.slots&&q.slots[i];if(!x)return false;KINL.sel[q.key]={slot:i};if(!kinlCapture(q,x)){delete KINL.sel[q.key];return false}kinlPaint(o);return true}
/* F2 (bag-inline-3): what someone ELSE wears (the worn-slot cells of a person card / person dialog, `.kwear [data-kwear]`) opens the SAME strip, inline UNDER the
   card (no pop-up, no ✕). Another tap on a cell swaps the strip in place; a second tap on the same cell folds it. ONE function for every opener (jk2b, jdress, jgift). */
function kinlWearSpec(v,sl){let c=null;try{c=(typeof dressSlots==="function"?dressSlots(v):[]).find(x=>x.slot===sl)||null}catch(e){}
 const x=(typeof wdSlots==="function"?wdSlots(v):[]).find(z=>z.slot===sl)||null;const lab=c&&c.label||x&&x.label&&(sl==="tram"?"Trâm cài":"Y phục")||sl;
 let r=null;try{r=typeof dressNow==="function"?dressNow(S,v):null}catch(e){}
 const wd=sl==="tram"||sl==="y";const empty=!c||c.empty||(wd&&x&&x.empty);const sum="";
 const F=wd?[x&&x.label?`Ngươi đã biết: ${x.label}.`:"Đúng phẩm hay không: chưa rõ (chưa ai nhận xét).",x&&x.giver?`${x.giver} ban.`:"","Hặc ăn mặc sai phẩm: thẻ người của nàng, nhóm Hại nặng."].filter(Boolean)
  :[r?(c&&c.over?"Món này vượt phẩm của nàng (Tố vượt phẩm).":"Ngươi đã thấy nàng mang món này."):"Ngươi chưa thấy tận mắt: gặp nàng cùng chỗ, hoặc dò la.","Tố vượt phẩm · Tố xa xỉ: thẻ người của nàng, nhóm Hại nặng."];
 if(!empty){let ref=null;if(wd)ref={wdSlot:sl,who:v};else if(c&&c.k&&sl!=="veil"&&sl!=="pet"){const e=(v.inv||[]).find(e=>e&&e.w&&!e.h&&typeof IT==="object"&&IT[e.k]&&itm(e.k).sl&&wearGrp(itm(e.k).sl)===sl);if(e)ref={e,who:v}}
  if(ref&&typeof kitItemRef==="function"&&kitItemRef(ref)){const o=kinlDetail(ref,{key:"wear",facts:F});return{html:o}}}
 const nm=c&&c.name||lab;const pic=c&&!c.empty?kitItem({src:c.src||"",name:"",grade:c.grade,size:"lg"}).replace('<span class="kitn"></span>',''):kitItem({empty:true,name:lab,size:"lg"});
 return{html:kinlHTML({itemPic:pic,title:nm,sub:`${lab}${empty?" · trống":""}`,html:`${typeof kitFacts==="function"?kitFacts(empty?["Không mang gì."].concat(F.slice(-1)):F):""}`},"","wear")}}
function kinlWear(t,v,sl){try{const row=t.closest(".kwear");if(!row||!v)return false;const host=row.parentElement;if(!host)return false;
 /* the strip sits right UNDER the worn-slot row (next to the cell that was tapped); in a narrow column (the portrait column of a person card) it stacks: picture, info, chips, acts */
 const old=host.querySelector(':scope > .kinldet[data-kinl="wear"]');const same=old&&old.dataset.kwsl===sl+"|"+v.id;
 document.querySelectorAll(".kwear .kitem-sel").forEach(e=>e.classList.remove("kitem-sel"));
 if(old)old.remove();if(same)return true;
 const sp=kinlWearSpec(v,sl);if(!sp||!sp.html)return false;const tmp=document.createElement("div");tmp.innerHTML=sp.html;const el=tmp.firstElementChild;el.dataset.kwsl=sl+"|"+v.id;el.classList.add("kinlwear");
 row.after(el);try{const o=getComputedStyle(row).order;if(o&&o!=="0")el.style.setProperty("order",o,"important")}catch(e){}el.classList.toggle("kinl-narrow",host.clientWidth<420);t.classList.add("kitem-sel");try{if(typeof sfx==="function")sfx("tap")}catch(e){}try{if(typeof kitFix==="function")kitFix(host)}catch(e){}
 try{el.scrollIntoView({block:"nearest",behavior:"smooth"})}catch(e){}return true}catch(e){console.error("kinlWear",e);return false}}
/* a pick tile INSIDE a strip (the "Bên mình" slot strip lists the pieces that fit: Chạm một món để cài) swaps that strip to the tapped piece in place (its one act), no floating card */
function kinlPickInline(c,ref,acts){try{const d=c.closest(".kinldet");if(!d||typeof kinlDetail!=="function")return false;if(!kitItemRef(ref))return false;const key=d.dataset.kinl||"bag",ch=d.querySelector(".kinlchips");
 const t=document.createElement("div");t.innerHTML=kinlDetail(ref,{key,sum:ch?ch.innerHTML:"",acts:acts||[]});const el=t.firstElementChild;d.replaceWith(el);
 try{if(typeof kitFix==="function")kitFix(el.parentElement)}catch(e){}try{if(typeof sfx==="function")sfx("tap")}catch(e){}return true}catch(e){console.error("kinlPickInline",e);return false}}
/* the capture: an info pop-up built while a pick is captured goes to the strip, nowhere else */
(function(){if(typeof kitModal!=="function")return;const k0=kitModal;kitModal=function(spec){if(KINL.cap&&spec&&spec.kind==="info"&&!KINL.cap.spec){KINL.cap.spec=spec;return null}return k0.apply(this,arguments)};window.kitModal=kitModal})();
(function(){const st=document.createElement("style");st.id="kinl-css";st.textContent=`
.kinldet{display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:10px;align-items:start;margin:8px 0 0;padding:8px;border:1px solid var(--k-hair,#e6d3ac);border-radius:10px;background:#fbf3e3;box-shadow:inset 0 1px 3px #5a3a2018;min-width:0}
.kinldet .kinlpic{width:var(--kinlsz,120px);aspect-ratio:1/1;flex:none}
.kinldet .kinlpic .kitem{--isz:100%;width:100%}
.kinldet .kinlinfo{min-width:0;display:flex;flex-direction:column;gap:3px}
.kinldet .kinln{font-family:var(--font-d,inherit);font-size:1.02rem;line-height:1.2}
.kinldet .kinlsub{font-size:.78rem;opacity:.75}
.kinldet .kinlacts{grid-column:1/-1}
.kinldet .kinlacts .kinvacts.rbtn{display:grid!important;grid-template-columns:repeat(auto-fit,minmax(min(100%,170px),1fr))!important;gap:6px;margin-top:6px}
.kinldet .kinlacts .kinvacts>button{height:auto!important;min-height:0!important;align-self:start}
.kinldet .kinlchips{display:flex;flex-direction:column;gap:5px;align-items:stretch;font-size:.78rem;max-width:none;padding:6px;border:1px solid var(--k-hair,#e6d3ac);border-radius:8px;background:#f4ead8}
/* K-TAG-WRAP (KK66, rule X23): a summary chip («✓ Đã biết: Đúng phẩm», «Xa xỉ N» …) stays on ONE line; the column grows to its longest chip (never cut, no ellipsis); host < 420 px = kinl-narrow row */
.kinldet .kinlchips .chip,.kinldet .kinlchips .kchip{white-space:nowrap}
.kinldet.kinlwear{margin:6px 0 4px;clear:both}
.kinldet.kinl-narrow{grid-template-columns:minmax(0,1fr)}
.kinldet.kinl-narrow .kinlpic{justify-self:center}
.kinldet.kinl-narrow .kinlchips{max-width:none;flex-direction:row;flex-wrap:wrap}
.kinldet .kinlempty{grid-column:1/2;align-self:center;padding:10px 4px;opacity:.7}
.kinldet .kinlempty+.kinlchips{grid-column:3}
.kinldet:has(.kinlempty){grid-template-columns:minmax(0,1fr) auto}
.kinldet:has(.kinlempty) .kinlchips{grid-column:2}
`;document.head.appendChild(st)})();
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§70.6",title:"kinlStrip (Chạm món trong lưới: thông tin hiện ngay dưới lưới, không pop-up)",
 html:()=>{const o={key:"kitpg",items:[],sum:'<span class="chip g">Sắc +6</span><span class="chip">Xa xỉ 42</span><span class="chip g">✓ Đã biết: Đúng phẩm</span>'};
  return kitItemDetail("tramngoc",{cls:"kidet-strip"}).replace(/^<div class="kidet /,'<div class="kidet kinldet-sample ')+kinlStrip(o)}})}catch(e){}
