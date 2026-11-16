/* ================= jfiglight: kitFigLight — ONE SKIN LIGHT FOR EVERY PERSON PICTURE (owner 16/11 11:58Z "nhìn cứ như là hai ánh sáng khác nhau") =================
   Root cause (review/skin-light, dev/handover/reports/skin-light.md): every figure set was painted/graded in its own batch, so the SAME light
   makes different skin: palace-maid base outfits face L* ~77.7, consorts ~81.2, single files spread ±3 L* and ±3 b* (player look2 t3 b* 18
   vs maid ty5 b* 10). CSS was already identical for all kinds (url(#kfa) var(--klf) drop-shadow), so two figures side by side on one stage
   looked lit by two different lamps.
   Fix (kit, every kind, every place): img/FIGLIGHT.json (dev/art/skin-light/table.py, from the skin-match face audit of all 8758 fig-*.webp)
   gives each painting a per-channel light-tone shift d[r,g,b] (out = x + d·w(x)) that moves ITS face skin to the one shared target of its group (women = the maid look
   the owner liked, L*80.5 a*9.5 b*13; men L*77 a*9 b*17; children L*78.5 a*9.5 b*15.5). The curve leaves the darks (hair, eyes, shadows) and pure white untouched, so
   hair colour and white silk never change; faces, makeup layers, huadian, shapes untouched (makeup/face-fx overlays are separate layers above the picture).
   The SAME entry serves fig-X, hd/fig-X and por-X (same painting).
   Delivery = one SVG filter per shift (#kfs<n>, created on first use) that ALSO does the #kfa alpha clean-up, handed to the picture as the
   CSS variable --kfs. Every people-picture filter rule writes var(--kfs,url(#kfa)) where it used to write url(#kfa); a picture that no rule
   filters gets "filter:var(--kfs)" from the base rule img[data-kfl]. Test hook: window.KFL {map, n, made}. Static (KIT motion rule). */
(function(){
 const K=window.KFL={map:null,g:null,n:0,made:0,ld:0};
 const RE=/\/img\/(?:hd\/)?(?:fig|por)-([^\/?#]+)\.webp(?:[?#].*)?$/;
 let defs=null;
 function svg(){if(defs)return defs;try{const d=document.createElementNS("http://www.w3.org/2000/svg","svg");d.setAttribute("width","0");d.setAttribute("height","0");
  d.setAttribute("aria-hidden","true");d.id="kfsvg";d.style.cssText="position:absolute;width:0;height:0;overflow:hidden";d.innerHTML="<defs></defs>";
  (document.body||document.documentElement).appendChild(d);defs=d.firstChild}catch(e){}return defs}
 const ss=(e0,e1,x)=>{const t=Math.max(0,Math.min(1,(x-e0)/(e1-e0)));return t*t*(3-2*t)};const wt=x=>ss(.30,.72,x)*(1-ss(.96,1,x));
 /* light-tone curve per channel: out = x + d*w(x); w = 0 in the darks (hair, eyes, shadows), 1 around skin, 0 at pure white (dev/art/skin-light/table.py) */
 const tab=d=>{let v=[];for(let k=0;k<=24;k++){const x=k/24;v.push(Math.max(0,Math.min(1,x+d*wt(x))).toFixed(4))}return v.join(" ")};
 function filt(i){const id="kfs"+i;if(document.getElementById(id))return id;const g=K.g[i];const D=svg();if(!D)return null;
  const f=document.createElementNS("http://www.w3.org/2000/svg","filter");f.id=id;["x","y"].forEach(a=>f.setAttribute(a,"0"));["width","height"].forEach(a=>f.setAttribute(a,"100%"));
  f.setAttribute("color-interpolation-filters","sRGB");
  f.innerHTML=`<feComponentTransfer><feFuncR type="table" tableValues="${tab(g[0])}"/><feFuncG type="table" tableValues="${tab(g[1])}"/>`+
   `<feFuncB type="table" tableValues="${tab(g[2])}"/><feFuncA type="linear" slope="1.07" intercept="-0.065"/></feComponentTransfer>`;
  D.appendChild(f);K.made++;return id}
 function fit(im){try{const m=K.map&&RE.exec(im.currentSrc||im.src||"");const i=m?K.map[m[1]]:undefined;
   if(i==null){if(im.dataset.kfl){im.style.removeProperty("--kfs");delete im.dataset.kfl}return}
   if(im.dataset.kfl===String(i))return;const id=filt(i);if(!id)return;im.style.setProperty("--kfs",`url(#${id})`);im.dataset.kfl=i;K.n++}catch(e){}}
 function all(){if(!K.map)return;document.querySelectorAll("img").forEach(im=>{if(im.dataset.kfl||/\/(?:fig|por)-/.test(im.src||""))fit(im)})}
 window.kitFigLight=fit;window.kitFigLightAll=all;
 function load(){if(K.ld)return;K.ld=1;try{fetch("img/FIGLIGHT.json",{cache:"no-cache"}).then(r=>r.ok?r.json():null).then(j=>{if(j&&j.f&&j.g){K.map=j.f;K.g=j.g;K.list=Object.keys(j.f).length;all()}else K.ld=0}).catch(()=>{K.ld=0})}catch(e){K.ld=0}}
 load();
 let T=0;const sched=()=>{if(T)return;T=requestAnimationFrame(()=>{T=0;all()})};
 try{new MutationObserver(ms=>{for(const m of ms){if(m.type==="attributes"){const im=m.target;if(im.tagName==="IMG")fit(im)}else if(m.addedNodes.length){sched();break}}})
  .observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:["src"]})}catch(e){}
 document.addEventListener("load",e=>{const t=e.target;if(t&&t.tagName==="IMG"&&RE.test(t.currentSrc||t.src||""))fit(t)},true);
 const st=document.createElement("style");st.id="kfiglight";st.textContent="img[data-kfl]{filter:var(--kfs)}";(document.head||document.documentElement).appendChild(st);
})();
/* kit page sample (§82): the same maid + consort pair raw and under kitFigLight (one light) */
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§82",title:"kitFigLight · một ánh sáng da cho mọi người",
 html:()=>{const A=["img/fig-consort-c23-t3-a18.webp","img/fig-maid-m14-a18.webp"];const st=`height:260px;width:auto;display:inline-block;vertical-align:bottom;margin:0 6px`;
  return `<div class="kitpg-row" style="align-items:flex-end;background:#e9dcc6;padding:10px;border-radius:6px">`+
   A.map(f=>`<img src="${f}" alt="" data-kflraw="1" style="${st};filter:url(#kfa)!important">`).join("")+`<span style="width:24px"></span>`+
   A.map(f=>`<img src="${f}" alt="" style="${st}">`).join("")+
   `</div><p class="past">Trái: ảnh gốc (mỗi bộ vẽ một ánh sáng) · Phải: qua kitFigLight — da cùng một ánh sáng, áo/mặt/trang điểm giữ nguyên.</p>`}})}catch(e){}
