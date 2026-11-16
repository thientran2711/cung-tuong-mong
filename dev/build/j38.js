/* ================= THE MAP TAB, FULL SCREEN: the plan fills all between the top bar and the tab bar ================= */
/* people present show as anonymous silhouettes with a count (hữu duyên: who is there is learned only by going); residents are named inside the palace screen */
const SILH=`<svg viewBox="0 0 10 14" aria-hidden="true"><circle cx="5" cy="3" r="2.4"/><path d="M1 14c0-4.4 1.6-7.2 4-7.2s4 2.8 4 7.2z"/></svg>`;
function silChip(n){return"";if(!n)return"";const k=Math.min(n,3);return `<span class="msil" aria-label="${n} bóng người">${SILH.repeat(k)}${n>1?`<b>${n}</b>`:""}</span>`}
(function(){const m0=mapHTML;mapHTML=function(){let h=m0.apply(this,arguments);if(window.__mapList)return h;
 try{/* drop the faces of residents and the names in the hover title; add the silhouettes */
  h=h.replace(/<span class="mfaces">[\s\S]*?<\/span><\/button>/g,"</button>");
  h=h.replace(/ · ở: [^"]*"/g,'"');
  h=h.replace(/(<button class="mspot[^"]*" data-go="([^"]+)"[^>]*>)/g,(all,open,k)=>{const n=countAt(k);return open+(n?silChip(n):"")});
  h=h.replace(/<span class="mleg">[^<]*<\/span>/,'<span class="mleg">đi gần '+(BAL.walk.near)+' khắc, xa '+(walkFarK())+' · bóng: người khác đang ở đó, không tính ta</span>');}catch(e){}
 return h}})();
/* the layout switch */
(function(){const r0=renderPanel0;renderPanel0=function(){const r=r0.apply(this,arguments);try{const gm=document.querySelector(".game");if(gm)gm.classList.toggle("maptab",tab==="go"&&!window.__mapList)}catch(e){}return r}})();
/* the plan always covers the screen: the smallest zoom fills the height as well as the width */
function mapFit(){try{const sc=document.querySelector(".game.maptab .mapsc");if(!sc)return;const w=sc.querySelector(".mapw"),img=sc.querySelector(".mapimg");if(!w)return;
 const asp=img&&img.naturalWidth?img.naturalWidth/img.naturalHeight:1.792;const fit=Math.max(1,(sc.clientHeight/Math.max(1,sc.clientWidth))*asp);
 /* KIT 34.1d + §85: the floor zoom is also the smallest at which no two places (label + info row, as ONE box) touch; the palace detail map (.kpmv) keeps its own layout */
 let fit2=fit;if(!sc.closest(".kpmv")){const cap=fit+3.5;const touch=()=>{const R=[...w.querySelectorAll(".mspot")].map(s=>{const p=[...s.querySelectorAll(".mlab,.mmeta")].map(e=>e.getBoundingClientRect()).filter(r=>r.width>0);if(!p.length)return{width:0};const L=Math.min(...p.map(r=>r.left)),T=Math.min(...p.map(r=>r.top)),R=Math.max(...p.map(r=>r.right)),B=Math.max(...p.map(r=>r.bottom));return{left:L,right:R,top:T,bottom:B,width:R-L}}).filter(r=>r.width>0);for(let i=0;i<R.length;i++)for(let j=i+1;j<R.length;j++){const a=R[i],b=R[j];if(Math.min(a.right,b.right)-Math.max(a.left,b.left)>0&&Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top)>0)return true}return false};
  for(let g=0;g<12;g++){w.style.width=(fit2*100)+"%";if(!touch()||fit2>=cap)break;fit2=Math.min(cap,fit2+.25)}}
 const z=Math.max(fit2,window.__mapZ||fit2);w.style.width=(z*100)+"%";window.__mapFit=fit2;
 const key=S.place+"|"+z.toFixed(2)+"|"+sc.clientWidth;if(window.__mapKey2===key&&window.__mapPos2){sc.scrollLeft=window.__mapPos2[0];sc.scrollTop=window.__mapPos2[1]}
 else{const h=sc.querySelector(".mspot.here")||sc.querySelector('[data-go="home"]')||sc.querySelector('[data-go="'+(S.pal!=null?palaceOf(S):"home")+'"]');if(h){sc.scrollLeft=h.offsetLeft+h.offsetWidth/2-sc.clientWidth/2;sc.scrollTop=h.offsetTop+h.offsetHeight/2-sc.clientHeight/2}window.__mapKey2=key}
 if(!sc.dataset.sv){sc.dataset.sv=1;try{if(window.ResizeObserver){let t=0,sz=sc.clientWidth+"x"+sc.clientHeight;new ResizeObserver(()=>{const n=sc.clientWidth+"x"+sc.clientHeight;if(n===sz)return;sz=n;clearTimeout(t);t=setTimeout(()=>{try{if(sc.isConnected&&!window.__mapList)mapFit()}catch(e){}},60)}).observe(sc)}}catch(e){}sc.addEventListener("scroll",()=>{window.__mapPos2=[sc.scrollLeft,sc.scrollTop]},{passive:true})}}catch(e){}}
(function(){const r0=render;render=function(){const r=r0.apply(this,arguments);try{if(tab==="go"&&!window.__mapList){mapFit();const img=document.querySelector(".mapsc .mapimg");if(img&&!img.complete)img.addEventListener("load",mapFit,{once:true})}}catch(e){}return r}})();
addEventListener("resize",()=>{try{if(S&&tab==="go")mapFit()}catch(e){}});
try{if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>{try{if(S&&tab==="go"&&!window.__mapList)mapFit()}catch(e){}});if(document.fonts)document.fonts.addEventListener("loadingdone",()=>{try{if(S&&tab==="go"&&!window.__mapList)mapFit()}catch(e){}})}catch(e){}
/* zoom buttons: the floor is the fitted size, not 1 */
document.addEventListener("click",e=>{const z=e.target.closest(".game.maptab [data-mapz]");if(!z)return;e.stopImmediatePropagation();e.preventDefault();const f=window.__mapFit||1;window.__mapZ=cl((window.__mapZ||f)+(+z.dataset.mapz)*.5,f,f+2.5);render()},true);
/* tapping a place opens the place screen; the floating 'Bản đồ' button there goes back to the full map */
(function(){const g=goTo;goTo=function(k){const wasMap=typeof tab!=="undefined"&&tab==="go";const r=g.apply(this,arguments);try{if(wasMap&&S&&!S.dead&&S.place===k){window.__fromMap=1;tab="act";render()}}catch(e){}return r}})();
(function(){const r0=renderStage;renderStage=function(){const r=r0.apply(this,arguments);try{const st=$("stage");let b=document.getElementById("tomap");const show=window.__fromMap&&tab!=="go"&&!S.out;if(!show){if(b)b.remove();return r}
 if(!b){b=document.createElement("button");b.id="tomap";b.className="tomap kbackb";b.innerHTML=typeof kitBackBtnHtml==="function"?kitBackBtnHtml("map","Dư đồ"):"‹ Dư đồ";b.setAttribute("aria-label","Về bản đồ hoàng cung");b.addEventListener("click",ev=>{ev.stopPropagation();tab="go";window.__fromMap=0;render()})}
 if(b.parentNode!==st)st.appendChild(b)}catch(e){}return r}})();
document.addEventListener("click",e=>{const t=e.target.closest("button[data-tab]");if(t&&t.dataset.tab!=="act")window.__fromMap=0},true);
