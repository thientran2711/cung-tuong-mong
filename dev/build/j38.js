/* ================= THE MAP TAB, FULL SCREEN: the plan fills all between the top bar and the tab bar ================= */
/* people present show as anonymous silhouettes with a count (hữu duyên: who is there is learned only by going); residents are named inside the palace screen */
const KMAP_MLS_ONE=[1,1.12]; /* KIT §85.8: portrait (kv1) place-label scale range [floor, start] - the map is zoomed to the free height, so the labels stay at the kit size or bigger and the low-priority ones hide instead of shrinking */
const KMAP_MLS=.85; /* KIT §85.7: smallest place-label scale at fit-all (one kit value) */
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
 const asp=img&&img.naturalWidth?img.naturalWidth/img.naturalHeight:1.792;
 /* KIT §85.7 (owner 17/11 "Dư đồ zoom gần quá"): the default zoom shows the WHOLE palace map inside the free area (screen minus the left rail / right card column / tools row, read from the .mapw margins); +/- zoom from there */
 const kp=!!sc.closest(".kpmv");
 /* KIT §85.8 (owner 17/11 ~13:12Z "dư đồ nhỏ xíu"): PORTRAIT (kv1) = people cards row above, Ân sủng + Nguy hiểm row below (jmapc grid on #kshR); the map spans the full width between them: the margins come from the REAL row heights, the zoom FITS THE FREE HEIGHT (pan sideways), the open view is centred on her place + the "!" places */
 const one=!kp&&kitView().pages===1;
 const rowsM=()=>{const mv=sc.closest(".mapv"),R=document.getElementById("kshR");if(!mv||!R||R.hidden)return null;const mr=mv.getBoundingClientRect(),tc=R.querySelector(".k3cs"),tb=tc?tc.getBoundingClientRect():null,bt=[...R.querySelectorAll(".k3p")].map(e=>e.getBoundingClientRect()).filter(r=>r.height>0);return[mv,Math.round(tb&&tb.height>0?tb.bottom-mr.top+6:46),Math.round(bt.length?mr.bottom-Math.min(...bt.map(r=>r.top))+6:0)]};
 if(one){const m=rowsM();if(m){m[0].style.setProperty("--kmv-ft",m[1]+"px");m[0].style.setProperty("--kmv-fb",m[2]+"px");/* the rows can still settle after this (fonts, wrapped card text): look again next frame, redo the fit if they moved (max 3 times) */requestAnimationFrame(()=>{try{const n=rowsM();if(n&&(Math.abs(n[1]-m[1])>1||Math.abs(n[2]-m[2])>1)&&(window.__mfRe=(window.__mfRe||0)+1)<4)mapFit();else window.__mfRe=0}catch(e){}})}}
 const cs=getComputedStyle(w),mL=parseFloat(cs.marginLeft)||0,mR=parseFloat(cs.marginRight)||0,mT=parseFloat(cs.marginTop)||0,mB=parseFloat(cs.marginBottom)||0,cw=Math.max(1,sc.clientWidth);
 const port=sc.clientHeight>cw;/* KIT §85.7 (main s31 12:48Z): on PORTRAIT (Fold) the fit-all uses the full map width; its faded right edge runs under the right column, the pan can still bring that end flush with the column */const availW=Math.max(120,cw-mL-(port&&!kp?0:mR)),availH=Math.max(120,sc.clientHeight-mT-mB);
 const fit=kp?Math.max(1,(sc.clientHeight/cw)*asp):one?Math.max(1,availH*asp/cw):Math.min(availW,availH*asp)/cw;
 /* KIT 34.1d + §85: the place labels (label + info row, as ONE box) shrink (--mls, floor KMAP_MLS) until no two touch, at every zoom; the palace detail map (.kpmv) keeps its own layout */
 /* KIT §85.7 label rule (main s31 17/11): label text never below KMAP_MLS x its size (floor = the kit's readable minimum); when labels still collide the low-priority (.sm) ones hide (her place and any place with a "!" never hide) and come back from the first zoom step; if even the main labels collide the floor zoom rises until they do not */
 const kp2=kp;const labs=()=>[...w.querySelectorAll(".mspot")];
 const box=s=>{const p=[...s.querySelectorAll(".mlab,.mmeta")].map(e=>e.getBoundingClientRect()).filter(r=>r.width>0);return p.length?{s,left:Math.min(...p.map(r=>r.left)),top:Math.min(...p.map(r=>r.top)),right:Math.max(...p.map(r=>r.right)),bottom:Math.max(...p.map(r=>r.bottom))}:null};
 const pairs=()=>{const R=labs().map(box).filter(Boolean),o=[];for(let i=0;i<R.length;i++)for(let j=i+1;j<R.length;j++){const a=R[i],b=R[j];if(Math.min(a.right,b.right)-Math.max(a.left,b.left)>0&&Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top)>0)o.push([a.s,b.s])}return o};
 const prot=s=>s.classList.contains("here")||!!s.querySelector(".khap");const rank=s=>prot(s)?9:s.classList.contains("sm")?0:1+Math.min(5,+((s.querySelector(".mmeta")||{}).textContent||"").replace(/\D.*$/,"")||0)/10;
 const place=zz=>{w.style.width=(zz*100)+"%";if(kp)return;labs().forEach(e=>e.classList.remove("kmhide"));const flo=one?KMAP_MLS_ONE[0]:KMAP_MLS;let m=one?KMAP_MLS_ONE[1]:1;w.style.setProperty("--mls",m);while(pairs().length&&m>flo+.001){m=Math.max(flo,+(m-.04).toFixed(2));w.style.setProperty("--mls",m)}
  /* still touching at the floor size: hide the lower-priority label of each touching pair (.sm first, then fewer people), never her place or a "!" place */
  for(let g=0;g<40;g++){const P=pairs();if(!P.length)break;const hid=new Set();for(const [a,b] of P){const l=a.classList.contains("here")?b:b.classList.contains("here")?a:rank(a)<=rank(b)?a:b;if(!l.classList.contains("here"))hid.add(l)}if(!hid.size)break;hid.forEach(e=>e.classList.add("kmhide"))}window.__mapMls=m};
 const z=Math.max(fit,window.__mapZ||fit);place(z);window.__mapFit=fit;
 const key=S.place+"|"+z.toFixed(2)+"|"+sc.clientWidth+"|"+sc.clientHeight;if(window.__mapKey2===key&&window.__mapPos2){sc.scrollLeft=window.__mapPos2[0];sc.scrollTop=window.__mapPos2[1]}
 else{const h=sc.querySelector(".mspot.here")||sc.querySelector('[data-go="home"]')||sc.querySelector('[data-go="'+(S.pal!=null?palaceOf(S):"home")+'"]');if(h&&!kp){const hr=h.getBoundingClientRect(),sr=sc.getBoundingClientRect();sc.scrollLeft+=hr.left+hr.width/2-(sr.left+sr.width/2);sc.scrollTop+=hr.top+hr.height/2-(sr.top+sr.height/2)}if(z<=fit+.01&&!kp&&!one){sc.scrollLeft=0;sc.scrollTop=0}
  /* §85.8: centre on her place; when her place and every visible "!" place fit in the screen width together, centre on that span instead (so both are in view at open) */
  if(one){const hs=[...w.querySelectorAll(".mspot")].filter(s=>s.classList.contains("here")||(s.querySelector(".khap")&&!s.classList.contains("kmhide"))),rs=hs.map(s=>s.getBoundingClientRect()),sr=sc.getBoundingClientRect();if(rs.length>1){const l=Math.min(...rs.map(r=>r.left)),r=Math.max(...rs.map(r=>r.right));if(r-l<=sr.width-24)sc.scrollLeft+=(l+r)/2-(sr.left+sr.width/2)}}
  window.__mapKey2=key}
 if(!sc.dataset.sv){sc.dataset.sv=1;try{if(window.ResizeObserver){let t=0,sz=sc.clientWidth+"x"+sc.clientHeight;new ResizeObserver(()=>{const n=sc.clientWidth+"x"+sc.clientHeight;if(n===sz)return;sz=n;clearTimeout(t);t=setTimeout(()=>{try{if(sc.isConnected&&!window.__mapList)mapFit()}catch(e){}},60)}).observe(sc)}}catch(e){}sc.addEventListener("scroll",()=>{window.__mapPos2=[sc.scrollLeft,sc.scrollTop]},{passive:true})}}catch(e){}}
(function(){const r0=render;render=function(){const r=r0.apply(this,arguments);try{if(tab==="go"&&!window.__mapList){mapFit();requestAnimationFrame(()=>{try{if(tab==="go"&&!window.__mapList)mapFit()}catch(e){}});const img=document.querySelector(".mapsc .mapimg");if(img&&!img.complete)img.addEventListener("load",mapFit,{once:true})}}catch(e){}return r}})();
addEventListener("resize",()=>{try{if(S&&tab==="go")mapFit()}catch(e){}});
try{if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>{try{if(S&&tab==="go"&&!window.__mapList)mapFit()}catch(e){}});if(document.fonts)document.fonts.addEventListener("loadingdone",()=>{try{if(S&&tab==="go"&&!window.__mapList)mapFit()}catch(e){}})}catch(e){}
/* zoom buttons: the floor is the fitted size, not 1 */
document.addEventListener("click",e=>{const z=e.target.closest(".game.maptab [data-mapz]");if(!z)return;e.stopImmediatePropagation();e.preventDefault();const f=window.__mapFit||1;window.__mapZ=cl((window.__mapZ||f)+(+z.dataset.mapz)*.5*Math.max(.6,f),f,f+2.5);render()},true);
/* tapping a place opens the place screen; the floating 'Bản đồ' button there goes back to the full map */
(function(){const g=goTo;goTo=function(k){const wasMap=typeof tab!=="undefined"&&tab==="go";const r=g.apply(this,arguments);try{if(wasMap&&S&&!S.dead&&S.place===k){window.__fromMap=1;tab="act";render()}}catch(e){}return r}})();
(function(){const r0=renderStage;renderStage=function(){const r=r0.apply(this,arguments);try{const st=$("stage");let b=document.getElementById("tomap");const show=window.__fromMap&&tab!=="go"&&!S.out;if(!show){if(b)b.remove();return r}
 if(!b){b=document.createElement("button");b.id="tomap";b.className="tomap kbackb";b.innerHTML=typeof kitBackBtnHtml==="function"?kitBackBtnHtml("map","Dư đồ"):"‹ Dư đồ";b.setAttribute("aria-label","Về bản đồ hoàng cung");b.addEventListener("click",ev=>{ev.stopPropagation();tab="go";window.__fromMap=0;render()})}
 if(b.parentNode!==st)st.appendChild(b)}catch(e){}return r}})();
document.addEventListener("click",e=>{const t=e.target.closest("button[data-tab]");if(t&&t.dataset.tab!=="act")window.__fromMap=0},true);
