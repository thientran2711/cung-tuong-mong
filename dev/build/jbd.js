/* ================= jbd: ONE BACKDROP KIT (owner 11/14 16:05Z) — KIT.md section 30 =================
   Every full-screen / large backdrop exists TWICE: a portrait painting and its own painted landscape composition (gpt-2-6),
   never a stretched / faded copy or an empty panel. ONE registry (KIT_BD) and ONE rule pick the art by the shape of the box:
   - by default the viewport orientation (CSS media query, works before any script runs);
   - a box that is not the whole screen (podium panel, …) is measured by kitBackdrop(el,key,{box:true}) (ResizeObserver → data-kbdo="l|p").
   Elements wear a backdrop by class `kbd kbd-<key>` (kitBackdrop) or by the entry's `sel` selector (static screens such as #title).
   Three shapes: portrait (taller than wide) · landscape 4:3 tier "m" (wider than tall, up to 7:5 — iPad 1366x1024, 1024x768) · wide landscape
   "l" (wider than 7:5 — 1180x820, 16:10, 16:9). Box-measured elements get data-kbdo="p|m|l" by the same thresholds.
   Entry: p / l = portrait / wide-landscape art; m = 4:3 art (optional, else l); pos / posl = background-position; grad / gradl = soft veil over the art (optional); col = ground colour.
   posm / gradm = the 4:3 tier's own position / veil (else those of l). Nobody else writes `background:url(...)` for a backdrop: add an entry here. */
const KIT_BD={
 /* title: the boot cover dev/site/kboot.js (KIT §14.1, painted before any script) mirrors these values: change both together */
 title:{sel:"#title.title",p:"img/title-key.webp",l:"img/title-key-l.webp",m:"img/title-key-m.webp",pos:"center top",posl:"left 25%",posm:"left center",col:"#f3e6d6",
  grad:"linear-gradient(rgba(245,236,220,0) 56%,rgba(245,236,220,.72))",gradl:"linear-gradient(90deg,rgba(245,236,220,0) 58%,rgba(245,236,220,.18))"},
 reborn:{p:"img/bg-reborn-p.webp",l:"img/bg-reborn-l.webp",col:"#e9dcc8",
  grad:"linear-gradient(rgba(40,20,12,.10),rgba(40,20,12,.04) 40%,rgba(40,20,12,.18))"},
 roulette:{p:"img/bg-reborn-p.webp",l:"img/bg-reborn-l.webp",col:"#e9dcc8",grad:"linear-gradient(rgba(40,20,12,.12),rgba(40,20,12,.22))"},
 podium:{sel:".kpod",box:true,p:"img/kit/podium-bg2-p.webp",l:"img/kit/podium-bg2.webp",pos:"center bottom",col:"var(--bg)",
  grad:"linear-gradient(#fffaf000,#f5ecdc22 60%,#f5ecdcb0)"},
 night:{sel:".modal.night",p:"img/tam-cung-dem-p.webp",l:"img/tam-cung-dem.webp",col:"#000"}
};
function kitBdCss(){const T="linear-gradient(transparent,transparent)";
 const BP=`background:var(--kbd-grad,${T}),var(--kbd-p) var(--kbd-pos,center)/cover no-repeat,var(--kbd-col,#e9dcc8)!important`;
 const BL=`background:var(--kbd-gradl,var(--kbd-grad,${T})),var(--kbd-l) var(--kbd-posl,var(--kbd-pos,center))/cover no-repeat,var(--kbd-col,#e9dcc8)!important`;
 const BM=`background:var(--kbd-gradm,var(--kbd-gradl,var(--kbd-grad,${T}))),var(--kbd-m,var(--kbd-l)) var(--kbd-posm,var(--kbd-posl,var(--kbd-pos,center)))/cover no-repeat,var(--kbd-col,#e9dcc8)!important`;
 const rules=sel=>{const sl=sel.split(","),q=t=>sl.map(x=>x+t).join(",");
  return `${sel}{${BP}}
${sl.map(x=>":where(.kv2) "+x+":not([data-kbdo=p])").join(",")}{${BL}}

${q("[data-kbdo=l]")}{${BL}}
${q("[data-kbdo=m]")}{${BM}}
`};
 let s=rules(".kbd");
 for(const k in KIT_BD){const d=KIT_BD[k];const v=[`--kbd-p:url(${d.p})`,`--kbd-l:url(${d.l||d.p})`];if(d.m)v.push(`--kbd-m:url(${d.m})`);
  for(const p of ["pos","posl","posm","grad","gradl","gradm","col"])if(d[p])v.push(`--kbd-${p}:${d[p]}`);
  s+=`.kbd-${k}${d.sel?","+d.sel:""}{${v.join(";")}}\n`;
  if(d.sel)s+=rules(d.sel)}
 return s}
(function(){try{const st=document.createElement("style");st.id="kit-bd";st.textContent=kitBdCss();document.head.appendChild(st)}catch(e){console.error("kit-bd",e)}})();
function kitBdShape(w,h){return w<h?"p":w/h<=1.4?"m":"l"}
/* box-measured backdrops: data-kbdo follows the element's own shape */
const KBD_RO=(typeof ResizeObserver==="function")?new ResizeObserver(es=>{for(const e of es){const r=e.contentRect;if(r.width&&r.height)e.target.dataset.kbdo=kitBdShape(r.width,r.height)}}):null;
function kitBdBox(el){try{if(!el||el.__kbdBox)return;el.__kbdBox=1;const r=el.getBoundingClientRect();if(r.width&&r.height)el.dataset.kbdo=kitBdShape(r.width,r.height);KBD_RO&&KBD_RO.observe(el)}catch(e){}}
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
