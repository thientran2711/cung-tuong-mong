/* ================= jbd: ONE BACKDROP KIT (owner 11/14 16:05Z) — KIT.md section 30 =================
   Every full-screen / large backdrop exists TWICE: a portrait painting and its own painted landscape composition (gpt-2-6),
   never a stretched / faded copy or an empty panel. ONE registry (KIT_BD) and ONE rule pick the art by the shape of the box:
   - by default the viewport orientation (CSS media query, works before any script runs);
   - a box that is not the whole screen (podium panel, …) is measured by kitBackdrop(el,key,{box:true}) (ResizeObserver → data-kbdo="l|p").
   Elements wear a backdrop by class `kbd kbd-<key>` (kitBackdrop) or by the entry's `sel` selector (static screens such as #title).
   Entry: p / l = portrait / landscape art; pos / posl = background-position; grad / gradl = soft veil over the art (optional); col = ground colour.
   Nobody else writes `background:url(...)` for a backdrop: add an entry here. */
const KIT_BD={
 title:{sel:"#title.title",p:"img/title-key.webp",l:"img/title-key-l.webp",pos:"center top",posl:"left center",col:"#f3e6d6",
  grad:"linear-gradient(rgba(245,236,220,0) 56%,rgba(245,236,220,.72))",gradl:"linear-gradient(90deg,rgba(245,236,220,0) 58%,rgba(245,236,220,.18))"},
 reborn:{p:"img/bg-reborn-p.webp",l:"img/bg-reborn-l.webp",col:"#e9dcc8",
  grad:"linear-gradient(rgba(40,20,12,.10),rgba(40,20,12,.04) 40%,rgba(40,20,12,.18))"},
 roulette:{p:"img/bg-reborn-p.webp",l:"img/bg-reborn-l.webp",col:"#e9dcc8",grad:"linear-gradient(rgba(40,20,12,.12),rgba(40,20,12,.22))"},
 podium:{sel:".kpod",box:true,p:"img/kit/podium-bg-p.webp",l:"img/kit/podium-bg.webp",pos:"center top",col:"var(--bg)",
  grad:"linear-gradient(#fffaf022,#f5ecdc55 70%,#f5ecdcd0)"},
 night:{sel:".modal.night",p:"img/tam-cung-dem-p.webp",l:"img/tam-cung-dem.webp",col:"#000"}
};
function kitBdCss(){const T="linear-gradient(transparent,transparent)";let s=`
.kbd{background:var(--kbd-grad,${T}),var(--kbd-p) var(--kbd-pos,center)/cover no-repeat,var(--kbd-col,#e9dcc8)!important}
@media (orientation:landscape){.kbd:not([data-kbdo=p]){background:var(--kbd-gradl,var(--kbd-grad,${T})),var(--kbd-l) var(--kbd-posl,var(--kbd-pos,center))/cover no-repeat,var(--kbd-col,#e9dcc8)!important}}
.kbd[data-kbdo=l]{background:var(--kbd-gradl,var(--kbd-grad,${T})),var(--kbd-l) var(--kbd-posl,var(--kbd-pos,center))/cover no-repeat,var(--kbd-col,#e9dcc8)!important}
`;
 for(const k in KIT_BD){const d=KIT_BD[k];const v=[`--kbd-p:url(${d.p})`,`--kbd-l:url(${d.l||d.p})`];
  if(d.pos)v.push(`--kbd-pos:${d.pos}`);if(d.posl)v.push(`--kbd-posl:${d.posl}`);if(d.grad)v.push(`--kbd-grad:${d.grad}`);if(d.gradl)v.push(`--kbd-gradl:${d.gradl}`);if(d.col)v.push(`--kbd-col:${d.col}`);
  s+=`.kbd-${k}${d.sel?","+d.sel:""}{${v.join(";")}}\n`;
  if(d.sel){const sl=d.sel.split(",");
   s+=`${d.sel}{background:var(--kbd-grad,${T}),var(--kbd-p) var(--kbd-pos,center)/cover no-repeat,var(--kbd-col,#e9dcc8)!important}\n`;
   s+=`@media (orientation:landscape){${sl.map(x=>x+":not([data-kbdo=p])").join(",")}{background:var(--kbd-gradl,var(--kbd-grad,${T})),var(--kbd-l) var(--kbd-posl,var(--kbd-pos,center))/cover no-repeat,var(--kbd-col,#e9dcc8)!important}}\n`;
   s+=`${sl.map(x=>x+"[data-kbdo=l]").join(",")}{background:var(--kbd-gradl,var(--kbd-grad,${T})),var(--kbd-l) var(--kbd-posl,var(--kbd-pos,center))/cover no-repeat,var(--kbd-col,#e9dcc8)!important}\n`}}
 return s}
(function(){try{const st=document.createElement("style");st.id="kit-bd";st.textContent=kitBdCss();document.head.appendChild(st)}catch(e){console.error("kit-bd",e)}})();
/* box-measured backdrops: data-kbdo follows the element's own shape */
const KBD_RO=(typeof ResizeObserver==="function")?new ResizeObserver(es=>{for(const e of es){const r=e.contentRect;if(r.width&&r.height)e.target.dataset.kbdo=r.width>=r.height?"l":"p"}}):null;
function kitBdBox(el){try{if(!el||el.__kbdBox)return;el.__kbdBox=1;const r=el.getBoundingClientRect();if(r.width&&r.height)el.dataset.kbdo=r.width>=r.height?"l":"p";KBD_RO&&KBD_RO.observe(el)}catch(e){}}
/* kitBackdrop(el, key|null, {box}) — put a registry backdrop on an element (null = take it off). Returns el. */
function kitBackdrop(el,key,o){if(!el)return el;o=o||{};
 [...el.classList].forEach(c=>{if(/^kbd-/.test(c))el.classList.remove(c)});
 if(!key||!KIT_BD[key]){el.classList.remove("kbd");delete el.dataset.kbd;if(el.__kbdBox){try{KBD_RO&&KBD_RO.unobserve(el)}catch(e){}el.__kbdBox=0;delete el.dataset.kbdo}return el}
 el.classList.add("kbd","kbd-"+key);el.dataset.kbd=key;
 if(o.box||KIT_BD[key].box)kitBdBox(el);return el}
/* static `sel` entries that are boxes (e.g. .kpod) are measured when they appear */
(function(){try{const boxSel=Object.values(KIT_BD).filter(d=>d.sel&&d.box).map(d=>d.sel).join(",");if(!boxSel||typeof MutationObserver!=="function")return;
 const scan=()=>document.querySelectorAll(boxSel).forEach(kitBdBox);
 new MutationObserver(()=>{clearTimeout(window.__kbdT);window.__kbdT=setTimeout(scan,0)}).observe(document.body||document.documentElement,{childList:true,subtree:true});scan()}catch(e){}})();
