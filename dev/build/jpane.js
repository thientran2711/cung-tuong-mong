/* ================= jpane: KIT PANE = fixed bar + scroll body (owner 11/15, KIT §39) =================
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
 const sub=P.querySelector(":scope > .ksub")||(bar&&bar.querySelector(":scope > .ksub"));
 const cat=[...P.querySelectorAll(".kcattabs")].find(r=>!r.closest(".pc,.kpc,.dlg,#popw"))||null;
 if(!sub&&!cat){if(bar)bar.remove();P.classList.remove("kpane");P.style.removeProperty("--kpbarh");return}
 if(!bar){bar=document.createElement("div");bar.className="kpbar";}
 if(P.firstElementChild!==bar)P.prepend(bar);
 if(sub&&sub.parentElement!==bar)bar.prepend(sub);
 if(cat&&cat.parentElement!==bar)bar.appendChild(cat);
 [...bar.children].forEach(c=>{if(c!==sub&&c!==cat)c.remove()});
 P.classList.add("kpane");const cs=getComputedStyle(P),pl=cs.paddingLeft,pr=cs.paddingRight;bar.style.setProperty("margin-left","-"+pl,"important");bar.style.setProperty("margin-right","-"+pr,"important");bar.style.paddingLeft=pl;bar.style.paddingRight=pr;const h=Math.round(bar.getBoundingClientRect().height);if(h)P.style.setProperty("--kpbarh",h+"px")}catch(e){console.error("kitPane",e)}}
window.kitPane=kitPane;
(function(){const r0=renderPanel;renderPanel=function(){const r=r0.apply(this,arguments);kitPane();return r};
 if(typeof k3CatTabs==="function"){const k0=k3CatTabs;k3CatTabs=function(){const r=k0.apply(this,arguments);kitPane();return r}}
 try{const P=$("panel");if(P)new MutationObserver(()=>kitPane()).observe(P,{childList:true})}catch(e){}
 addEventListener("resize",()=>{clearTimeout(window.__kpT);window.__kpT=setTimeout(kitPane,60)})})();
(function(){const st=document.createElement("style");st.id="kit-pane";st.textContent=`
#panel.kpane{padding-top:0!important;scroll-padding-top:calc(var(--kpbarh,0px) + 6px)}
#panel.kpane>.kpbar{position:sticky;top:0;z-index:40;display:flex;flex-direction:column;gap:6px;margin-top:0!important;margin-bottom:var(--k-tabgap,10px)!important;padding:8px 8px 6px;
 background:var(--panel,#fffaf0);border-bottom:1px solid var(--k-hair,#e6d3ac);box-shadow:none}
#panel.kpane>.kpbar>.ksub{position:static!important;margin:0!important;top:auto!important}
#panel.kpane>.kpbar>.kcattabs{position:static!important;margin:0!important;padding:0!important;box-shadow:none!important;background:transparent!important;top:auto!important}
#panel.kpane>.kpbar+*{margin-top:0!important}
`;document.head.appendChild(st)})();
