/* ================= jpane: KIT PANE = fixed bar + scroll body (owner 11/15, KIT §45) =================
   (r7) The bar holds, in this order: the group sub-tabs (kgSub, a direct .ksub), the page's own sub-tab row (a nested .ksub, marked
   .kpgsub, e.g. Tư trang Túi đồ · Việc) and the first visible filter row (.kcattabs); rows inside hidden panes / cards / dialogs are skipped.
   Before: the chip / sub-tab rows (Hành sự "Tất cả · Nghỉ ngơi · Giao thiệp…", Tư trang item filters, Hậu cung / Giao tình /
   Hoàng tử / Mệnh truyện sub-tabs) were position:sticky INSIDE the scrolling panel, below 8 px of panel padding and after whatever
   came first on the page: the bar sat lower than the header at rest, and while scrolling half a card showed above it and its
   shadow let the list show through below it.
   Now every tab pane is ONE layout: the pane bar (.kpbar) holds the page's sub-tabs (.ksub) and its first filter row (.kcattabs)
   and sits flush at the top of the pane, directly under the header frame (the pane's own border is the kit gap); it never moves;
   the list scrolls below it and is cut off at the bar's bottom edge: the bar is opaque, full width, has no shadow and nothing
   sits above it (the pane's top padding is 0 while a bar is present). Anchored scrolling (scrollIntoView) stops below the bar
   (scroll-padding-top = bar height). The bar is built after every panel render from the rows the tabs already draw, so the tab
   code keeps its own rows (k3CatTabs finds its row by data-g, kgSub finds .ksub inside the bar). */
function kitPane(){try{const P=$("panel");if(!P)return;let bar=P.querySelector(":scope > .kpbar");
 const free=r=>!r.closest(".pc,.kpc,.dlg,#popw,[hidden],.kpinline");/* .kpinline (r8): a picker's own tab row (Ân oán X / Y) stays with its strip */
 const sub=P.querySelector(":scope > .ksub")||(bar&&bar.querySelector(":scope > .ksub:not(.kpgsub)"));
 /* the page's own sub-tab row (e.g. Tư trang "Túi đồ · Việc", jinv .kinvsub) — tabs-kit r7 */
 const pg=[...P.querySelectorAll(".ksub")].find(r=>r!==sub&&free(r)&&(r.parentElement!==P))||null;if(pg)pg.classList.add("kpgsub");
 const cat=[...P.querySelectorAll(".kcattabs")].find(r=>free(r)&&!r.classList.contains("ksub"))||null;
 if(!sub&&!pg&&!cat){if(bar)bar.remove();P.classList.remove("kpane");P.style.removeProperty("--kpbarh");return}
 if(!bar){bar=document.createElement("div");bar.className="kpbar";}
 if(P.firstElementChild!==bar)P.prepend(bar);
 const want=[sub,pg,cat].filter(Boolean);
 want.forEach((r,i)=>{const w=r.parentElement;if(bar.children[i]!==r)bar.insertBefore(r,bar.children[i]||null);
  if(w&&w!==bar&&w!==P&&!w.children.length&&!w.textContent.trim())w.remove()});
 [...bar.children].forEach(c=>{if(!want.includes(c))c.remove()});
 P.classList.add("kpane");const cs=getComputedStyle(P),pl=cs.paddingLeft,pr=cs.paddingRight;/* lag-play-2: write only what changed (an equal write still dirties style) */if(bar.style.marginLeft!=="-"+pl)bar.style.setProperty("margin-left","-"+pl,"important");if(bar.style.marginRight!=="-"+pr)bar.style.setProperty("margin-right","-"+pr,"important");if(bar.style.paddingLeft!==pl)bar.style.paddingLeft=pl;if(bar.style.paddingRight!==pr)bar.style.paddingRight=pr;const h=Math.round(bar.getBoundingClientRect().height);if(h&&P.style.getPropertyValue("--kpbarh")!==h+"px")P.style.setProperty("--kpbarh",h+"px")}catch(e){console.error("kitPane",e)}}
window.kitPane=kitPane;
(function(){const r0=renderPanel;renderPanel=function(){const r=r0.apply(this,arguments);kitPane();return r};
 if(typeof k3CatTabs==="function"){const k0=k3CatTabs;k3CatTabs=function(){const r=k0.apply(this,arguments);kitPane();return r}}
 /* review/lag-play-2: the observer fired right after every renderPanel (which had just run kitPane) and after kitPane's own prepend, each time
   reading computed style + layout mid-task; it now runs once in the next frame (before paint), for changes made outside renderPanel. */
 let kpQ=0;try{const P=$("panel");if(P)new MutationObserver(()=>{if(!kpQ)kpQ=requestAnimationFrame(()=>{kpQ=0;kitPane()})}).observe(P,{childList:true})}catch(e){}
 addEventListener("resize",()=>{clearTimeout(window.__kpT);window.__kpT=setTimeout(kitPane,60)})})();
(function(){const st=document.createElement("style");st.id="kit-pane";st.textContent=`
#panel.kpane{padding-top:0!important;scroll-padding-top:calc(var(--kpbarh,0px) + 6px)}
#panel.kpane>.kpbar{position:sticky;top:0;z-index:29;display:flex;flex-direction:column;gap:6px;margin-top:0!important;margin-bottom:var(--k-tabgap,10px)!important;padding:8px 8px 6px;
 background:var(--panel,#fffaf0);border-bottom:1px solid var(--k-hair,#e6d3ac);box-shadow:none}
#panel.kpane>.kpbar>.ksub{position:static!important;margin:0!important;top:auto!important}
#panel.kpane>.kpbar>.kcattabs{position:static!important;margin:0!important;padding:0!important;box-shadow:none!important;background:transparent!important;top:auto!important}
#panel.kpane>.kpbar+*{margin-top:0!important}
/* §45 exception .kpinline (r8): a tab row inside a picker that lives IN the list (Ân oán X / Y, §49.2b) stays with its strip: not moved
   into the bar, never sticky, no shadow */
#panel .kpinline>.kcattabs,#panel .kpinline>.kcattabs.kstick,#panel .kpinline>.ksub{position:static!important;top:auto!important;box-shadow:none!important;margin:2px 0 4px!important}
`;document.head.appendChild(st)})();
