/* ================= jfigseal: kitFigSeal — the MOOD SEAL beside the head of every interactable full-body figure (KIT 28.8d) =================
   Owner 17/11 ~17:40Z (OD tail): "cái biểu tượng cảm xúc ... hiện ở trên kế bên cái hình nhân vật toàn thân ở trong cái phòng, và ở trên cái dư đồ hay là bất kỳ nơi nào
   mà nó có hiện cái hình nhân vật toàn thân mà tôi có thể tương tác được ... nằm đâu đó kế bên cái đầu của họ, không có xa quá".
   ONE kit part, no new art and no new mood logic: the seal is the SAME element pcPort draws (jemo emoBadge → img.kemo.kemo-<k>, img/kit/emo-[m-|mo-]<k>.webp, emo-an when the
   mood is not known to her, nothing for a stranger) and the SAME tap (jemo: kit popover with the mood word + cause).
   WHERE: every full-body figure that is a real, tappable person —
     · room / place / Dư đồ place view / lãnh cung / home visits (j59 stage): #tokens .tok.fig img.figimg and her own #mefig
     · event / person dialogs, person pages of the book, pet-care dialog (kitStageFig → img.kesimg; person registered by the wrapper below)
   NOT: silhouettes ("Người lạ"), the game figure of a mini-game (.kgfig), the new-life identity card (.kpfig), any crowd / shadow.
   STAGE (owner OD 19/11 ~02:05Z + ~03:50Z): on #stage the chip stands ON the sex line, beside «ta ở đây» / the speech bubble, a clear gap above the highest REAL head top of that sex (jmark kitBadgeAt "emo", KIT §78.y) — the rule below is for dialogs / book pages.
   PLACEMENT RULE (the same fraction for every figure, size and screen): the seal sits at HEAD height, on the side of the head with room (right first, left when the right
   would leave the stage / dialog), its inner edge KIT_FIGSEAL.gap × body from the painted head-and-hair edge (kitFigBody wl/wr of the top 15 % of the painting).
   SIZE: KIT_FIGSEAL.k × the figure's body height (kitFigBody head top → feet), between min and max px — it grows and shrinks with the figure.
   NEVER covers the face (it stands beside the head, the face is inside the head edge), never clipped (clamped inside the stage / dialog), never above the head (that place is the
   "this is you" marker kitMeMark of jmark).  Off switch for measuring: window.__emoOff=1 (the same as the portrait seals). ===== */
window.KIT_FIGSEAL=window.KIT_FIGSEAL||{k:.105,min:22,max:50,dx:.194,dy:.916,pad:10};/* pad = clear gap to the stage plaque columns #kshR/#kshL *//* dx/dy = seal centre from the standing anchor, in body heights (owner 18/11 ~06:20Z: one fixed offset for everybody) */
const KFS_REG=new Map();let KFS_ID=0;
/* kitStageFig is the one maker of img.kesimg: remember WHOSE figure it is (never read from the picture) */
(function(){if(typeof kitStageFig!=="function")return;const f0=kitStageFig;kitStageFig=function(p,o){let h=f0.apply(this,arguments);try{const q=p&&(p.__kp||p);
  if(q&&h&&!(o&&o.noSeal)&&h.indexOf('<img class="kesimg"')>=0){const id=++KFS_ID;KFS_REG.set(id,q);if(KFS_REG.size>600)KFS_REG.delete(KFS_REG.keys().next().value);h=h.replace('<img class="kesimg"',`<img class="kesimg" data-kfsp="${id}"`)}}catch(e){}return h}})();
/* kszFigHtml (jksize, the person dialog frame) is the other maker of a person's full-body figure: same registry */
(function(){if(typeof kszFigHtml!=="function")return;const f0=kszFigHtml;kszFigHtml=function(p){let h=f0.apply(this,arguments);try{const q=p&&(p.__kp||p);
  if(q&&h&&h.indexOf('<span class="kszfs"><img ')>=0){const id=++KFS_ID;KFS_REG.set(id,q);if(KFS_REG.size>600)KFS_REG.delete(KFS_REG.keys().next().value);h=h.replace('<span class="kszfs"><img ',`<span class="kszfs"><img data-kfsp="${id}" `)}}catch(e){}return h}})();
function kfsPerson(fig){try{if(fig.id==="mefig")return S;const id=fig.dataset&&fig.dataset.kfsp;if(id)return KFS_REG.get(+id)||null;const tok=fig.closest&&fig.closest("#tokens .tok");
 if(tok){const ppl=typeof curPeople==="function"?curPeople():[];return ppl[+tok.dataset.p]||null}}catch(e){}return null}
function kfsFigs(){return[...document.querySelectorAll("#mefig,#tokens .tok.fig img.figimg,img.kesimg,.kszfs>img")].filter(e=>!e.closest(".kgfig,.kpfig,.kidfig2,.kfsno")&&!(e.closest(".dlg")&&!e.closest(".kbk-pg")&&e.closest("#modal")))/* owner 21/11 #73: a person frame shows the person ONCE: the left figure of a dialog carries no round head seal (it read as a second portrait of the same person); the feeling of a mood event sits on the event picture corner (KIT 28.19b mark) */}
/* the drawn picture box inside the <img> (object-fit: contain, picture centred) */
function kfsBox(fig){const r=fig.getBoundingClientRect();let bx=r.left,by=r.top,bw=r.width,bh=r.height;const nw=fig.naturalWidth,nh=fig.naturalHeight;
 if(nw&&nh&&bw>0&&bh>0){const ar=nw/nh;if(bw/bh>ar){const w=bh*ar;bx+=(bw-w)/2;bw=w}else{const h=bw/ar;by+=(bh-h)/2;bh=h}}return{bx,by,bw,bh}}
const KFS_SEAL=new WeakMap();
/* the element the seal is a child of: the nearest ancestor of the figure that does not clip its children (a figure picture box such as .kszfs is overflow:hidden), made a positioning parent (.kfshost) when it is static */
function kfsHost(fig){{const bk=fig.closest&&fig.closest(".kbk-person.kbk-full");if(bk){if(getComputedStyle(bk).position==="static")bk.classList.add("kfshost");return bk}}/* KIT 34.6 r5: on a book person page the seal belongs to the page, not to the clipped figure column */let e=fig.parentElement;while(e&&e!==document.body){const c=getComputedStyle(e);if(c.overflowX==="visible"&&c.overflowY==="visible"){if(c.position==="static")e.classList.add("kfshost");return e}e=e.parentElement}return fig.offsetParent||fig.parentElement}
function kfsDrop(fig){const s=KFS_SEAL.get(fig);if(s){s.remove();KFS_SEAL.delete(fig)}}
function kitFigSeal(fig){try{
 if(!fig||!fig.isConnected||typeof emoOn!=="function"||!emoOn())return kfsDrop(fig);
 const src=fig.currentSrc||fig.getAttribute("src")||"";if(!src||/unknown-fig/.test(src))return kfsDrop(fig);
 if(!fig.getClientRects().length||fig.classList.contains("j59off")||fig.closest(".j59off"))return kfsDrop(fig);
 if(!fig.complete||!fig.naturalWidth)return kfsDrop(fig);{const c=getComputedStyle(fig);if(c.visibility==="hidden"||c.display==="none"||+c.opacity<.2)return kfsDrop(fig)}
 const p=kfsPerson(fig);if(!p)return kfsDrop(fig);const html=emoBadge(p);if(!html)return kfsDrop(fig);
 const host=kfsHost(fig);if(!host)return kfsDrop(fig);
 let el=KFS_SEAL.get(fig);
 if(!el||el.parentNode!==host||el.__h!==html){const prev=el&&el.parentNode===host&&el.complete&&el.naturalWidth&&el.style.display!=="none"?el:null;/* mood changed: the OLD still stays on screen until the NEW one is decoded (jemoseal kesWatch removes it), never a blank gap */if(el&&el!==prev)el.remove();if(prev&&prev.__prev){prev.__prev.remove();prev.__prev=null}const t=document.createElement("template");t.innerHTML=html.trim();el=t.content.firstChild;if(!el)return;if(prev){el.__prev=prev;prev.__t=performance.now();prev.classList.add("kfseal-old")}
  el.classList.add("kfseal");el.style.display="none";el.__h=html;el.__fig=fig;host.appendChild(el);KFS_SEAL.set(fig,el)}
 const b=kitFigBody(src,()=>kfsSched());if(!b){el.style.display="none";return}
 const B=kfsBox(fig);if(B.bh<60){el.style.display="none";return}
 const K=KIT_FIGSEAL,ht=b.ht!=null?b.ht:b.t,body=Math.max(20,(b.b-ht)*B.bh);
 const s=Math.round(Math.max(K.min,Math.min(K.max,body*K.k)));
 /* KIT 34.6 r5 (owner 18/11 ~03:35Z "figure runs under the ? chip"): on a BOOK person page the seal sits in ONE fixed slot, the right end of the name row of the text column (padding reserved by .kbk-phead), never on any figure, the same slot on every page */
 if(host.matches&&host.matches(".kbk-person.kbk-full")){const ph=host.querySelector(":scope>.kbk-phead");if(ph){const q=Math.min(s,46),css=`left:${ph.offsetLeft+ph.offsetWidth-q}px;top:${ph.offsetTop+2}px;width:${q}px;height:${q}px`;if(el.style.cssText!==css)el.style.cssText=css;el.dataset.kfsb="book";return}}
 /* KIT §78.y STAGE BADGE LINES (owner OD 19/11 ~02:05Z + ~03:50Z): on a stage the chip stands ON the line of the figure's sex (bottom = the highest real head top of that sex − G, jmark kitMarkLine),
    beside the primary mark column (jmark kitBadgeAt(…,"emo"): centre line ± (mw/2 + sp) × H + chip/2), ONE size per stage (kitBadgeEmoSize). The plaque columns #kshR / #kshL stay a no-go zone:
    a chip that would cross one goes to the mirror side (same distance, other side); it never leaves its line. */
 {const st=fig.closest("#stage");if(st&&typeof kitBadgeAt==="function"){let s2=kitBadgeEmoSize(st);{const L0=kitMarkLine(st,kitBadgeSex(fig));if(L0){const rm=Math.floor(L0.bottom-st.getBoundingClientRect().top-2);if(s2>rm)s2=Math.max(14,rm)}}/* a line lifted by a tall hat / crown: the chip shrinks to stay inside the frame, never sinks onto the head */const P=s2?kitBadgeAt(st,fig,"emo",s2,s2):null;if(!P){el.style.display="none";return}
  const pad=K.pad!=null?K.pad:10,Z=[...st.querySelectorAll("#kshR,#kshL")].filter(e=>!e.hidden&&e.offsetHeight&&e.getClientRects().length).map(e=>e.getBoundingClientRect());
  const hit=l=>Z.some(q=>l<q.right+pad&&l+s2>q.left-pad&&P.top<q.bottom+pad&&P.top+s2>q.top-pad);const off=P.off;let L=P.left,side=P.side;
  if(hit(L)){const l2=P.cx-side*off-s2/2;if(!hit(l2)){L=l2;side=-side;el.dataset.kfscol="1"}else el.dataset.kfscol="x"}else delete el.dataset.kfscol;
  const hr2=host.getBoundingClientRect(),css=`left:${(L-hr2.left+host.scrollLeft).toFixed(1)}px;top:${(P.top-hr2.top+host.scrollTop).toFixed(1)}px;width:${s2}px;height:${s2}px`;if(el.style.cssText!==css)el.style.cssText=css;
  el.dataset.kfsb=P.line.Hs.toFixed(0);el.dataset.kfsa=P.cx.toFixed(1);el.dataset.kfsf=P.line.floor.toFixed(1);el.dataset.kfsr=P.sex;el.dataset.kfss=side;return}}
 const k=Math.min(20,Math.max(1,K.rows|0)),rr=b.wr&&b.wr[k]!=null?b.wr[k]:null,ll=b.wl&&b.wl[k]!=null?b.wl[k]:null;
 /* owner 18/11 ~06:20Z: ONE fixed offset from the figure's standing anchor (ax = slot centre, feet = floor line), in body heights, so it scales with the figure and sits at the same spot for everyone: centre = ax ± dx x body, feet − dy x body (right first; left when the right would leave the frame) */
 const ax=B.bx+B.bw/2,feet=B.by+B.bh*b.b;/* standing anchor: picture centre = slot centre, painted feet = floor line */
 const bd=fig.closest("#stage")||fig.closest(".kszfig,.kesf")||fig.closest(".dlg")||host;const bb=bd.getBoundingClientRect(),hr=host.getBoundingClientRect();
 let L=ax+K.dx*body-s/2;if(L+s>bb.right-2)L=ax-K.dx*body-s/2;
 L=Math.max(bb.left+2,Math.min(L,bb.right-2-s));
 let T=feet-K.dy*body-s/2;T=Math.max(bb.top+2,Math.min(T,bb.bottom-2-s));
 /* ROOT-56/57 (owner 18/11 ~21:40Z/~21:52Z): on the stage the plaque columns #kshR / #kshL (maid, court, group buttons, Ân sủng) are a no-go zone: the seal box + KIT_FIGSEAL.pad (10 px)
    never crosses one. Measured from layout values (the column box and the figure anchor), never from the seal's own animated box. Order: right of the head, left of the head
    (the usual rule), else the nearest of: just left of the column / just below it. */
 if(bd.id==="stage"){const pad=K.pad!=null?K.pad:10,Z=[...bd.querySelectorAll("#kshR,#kshL")].filter(e=>!e.hidden&&e.offsetHeight&&e.getClientRects().length).map(e=>e.getBoundingClientRect());
  const hit=(l,t)=>Z.some(q=>l<q.right+pad&&l+s>q.left-pad&&t<q.bottom+pad&&t+s>q.top-pad),cl=l=>Math.max(bb.left+2,Math.min(l,bb.right-2-s)),ct=t=>Math.max(bb.top+2,Math.min(t,bb.bottom-2-s));
  if(Z.length&&hit(L,T)){let best=null;for(const l of[ax+K.dx*body-s/2,ax-K.dx*body-s/2].map(cl))if(!hit(l,T)){best=[l,T];break}
   if(!best){let d0=1e9;Z.forEach(q=>[[q.left-pad-s,T],[L,q.bottom+pad]].forEach(([l,t])=>{l=cl(l);t=ct(t);const d=Math.hypot(l-L,t-T);if(!hit(l,t)&&d<d0){d0=d;best=[l,t]}}))}
   if(best){L=best[0];T=best[1];el.dataset.kfscol="1"}else delete el.dataset.kfscol}else delete el.dataset.kfscol}
 const css=`left:${(L-hr.left+host.scrollLeft).toFixed(1)}px;top:${(T-hr.top+host.scrollTop).toFixed(1)}px;width:${s}px;height:${s}px`;
 if(el.style.cssText!==css){el.style.cssText=css}
 el.dataset.kfsb=body.toFixed(0);el.dataset.kfsa=ax.toFixed(1);el.dataset.kfsf=feet.toFixed(1)}catch(e){console.error("kitFigSeal",e)}}
function kfsSweep(){document.querySelectorAll("img.kfseal").forEach(s=>{const f=s.__fig;if(!f||!f.isConnected||(s.classList.contains("kfseal-old")&&performance.now()-(s.__t||0)>3000))s.remove()})}
function kfsAll(){kfsSweep();kfsFigs().forEach(kitFigSeal)}
let kfsT=0,kfsT2=0,kfsQ=0;function kfsSched(){clearTimeout(kfsT);clearTimeout(kfsT2);if(!kfsQ)kfsQ=requestAnimationFrame(()=>{kfsQ=0;kfsAll()});kfsT=setTimeout(()=>{kfsAll();kfsT2=setTimeout(kfsAll,700)},250)}
window.kitFigSeal=kitFigSeal;window.kitFigSealAll=kfsAll;
(function(){if(typeof renderStage!=="function")return;const r0=renderStage;renderStage=function(){const r=r0.apply(this,arguments);try{kfsSched()}catch(e){}return r}})();
(function(){if(typeof showModal!=="function")return;const s0=showModal;showModal=function(){const r=s0.apply(this,arguments);try{kfsSched()}catch(e){}return r}})();
addEventListener("resize",kfsSched);
document.addEventListener("load",e=>{const t=e.target;if(t&&t.tagName==="IMG"&&(t.id==="mefig"||t.classList.contains("figimg")||t.classList.contains("kesimg")))kfsSched()},true);
try{new MutationObserver(ms=>{if(ms.every(m=>m.target.closest&&m.target.closest("img.kfseal")))return;if(document.getElementById("mefig")||document.querySelector(".tok.fig,.kesimg"))kfsSched();else kfsSweep()})
 .observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:["src","hidden","style","class"]})}catch(e){}
(function(){const st=document.createElement("style");st.id="kfseal-css";st.textContent=`
.kfshost{position:relative}
img.kemo.kfseal{position:absolute!important;z-index:7;display:block;box-sizing:border-box;object-fit:contain;border-radius:50%;pointer-events:auto;cursor:pointer;-webkit-tap-highlight-color:transparent;filter:drop-shadow(0 1px 2px #000a);transform:none;margin:0;max-width:none;max-height:none;animation:none}
img.kemo.kfseal.kemo-an{opacity:.85}
img.kemo.kfseal.kfseal-old{pointer-events:none;z-index:6}/* the previous still, kept under the new one until it is decoded */
body.kbk-open .kbk-pg{isolation:isolate}/* each page is its own stacking context: the head seal (z 7) of the page BESIDE it in the stack must never paint over this page (the other person's face on a page) */
body.kbk-open img.kemo.kfseal:not(.kbk-person>img.kfseal){visibility:hidden!important;pointer-events:none!important}/* owner 24/11 flight bug #6: the ROOM figure's seal (her own, or the one beside the person on the stage) floated over the open Tuần lục book (it sits in the game shell, z 7) = "the wrong person's face" on every page; under the book only the seal of the page's own person shows (host .kbk-person) */
`;document.head.appendChild(st)})();
