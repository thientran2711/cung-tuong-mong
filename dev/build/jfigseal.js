/* ================= jfigseal: kitFigSeal — the MOOD SEAL beside the head of every interactable full-body figure (KIT 28.8d) =================
   Owner 17/11 ~17:40Z (OD tail): "cái biểu tượng cảm xúc ... hiện ở trên kế bên cái hình nhân vật toàn thân ở trong cái phòng, và ở trên cái dư đồ hay là bất kỳ nơi nào
   mà nó có hiện cái hình nhân vật toàn thân mà tôi có thể tương tác được ... nằm đâu đó kế bên cái đầu của họ, không có xa quá".
   ONE kit part, no new art and no new mood logic: the seal is the SAME element pcPort draws (jemo emoBadge → img.kemo.kemo-<k>, img/kit/emo-[m-|mo-]<k>.webp, emo-an when the
   mood is not known to her, nothing for a stranger) and the SAME tap (jemo: kit popover with the mood word + cause).
   WHERE: every full-body figure that is a real, tappable person —
     · room / place / Dư đồ place view / lãnh cung / home visits (j59 stage): #tokens .tok.fig img.figimg and her own #mefig
     · event / person dialogs, person pages of the book, pet-care dialog (kitStageFig → img.kesimg; person registered by the wrapper below)
   NOT: silhouettes ("Người lạ"), the game figure of a mini-game (.kgfig), the new-life identity card (.kpfig), any crowd / shadow.
   PLACEMENT RULE (the same fraction for every figure, size and screen): the seal sits at HEAD height, on the side of the head with room (right first, left when the right
   would leave the stage / dialog), its inner edge KIT_FIGSEAL.gap × body from the painted head-and-hair edge (kitFigBody wl/wr of the top 15 % of the painting).
   SIZE: KIT_FIGSEAL.k × the figure's body height (kitFigBody head top → feet), between min and max px — it grows and shrinks with the figure.
   NEVER covers the face (it stands beside the head, the face is inside the head edge), never clipped (clamped inside the stage / dialog), never above the head (that place is the
   "this is you" marker kitMeMark of jmark).  Off switch for measuring: window.__emoOff=1 (the same as the portrait seals). ===== */
window.KIT_FIGSEAL=window.KIT_FIGSEAL||{k:.105,min:22,max:50,gap:.012,rows:3,face:.5};
const KFS_REG=new Map();let KFS_ID=0;
/* kitStageFig is the one maker of img.kesimg: remember WHOSE figure it is (never read from the picture) */
(function(){if(typeof kitStageFig!=="function")return;const f0=kitStageFig;kitStageFig=function(p,o){let h=f0.apply(this,arguments);try{const q=p&&(p.__kp||p);
  if(q&&h&&!(o&&o.noSeal)&&h.indexOf('<img class="kesimg"')>=0){const id=++KFS_ID;KFS_REG.set(id,q);if(KFS_REG.size>600)KFS_REG.delete(KFS_REG.keys().next().value);h=h.replace('<img class="kesimg"',`<img class="kesimg" data-kfsp="${id}"`)}}catch(e){}return h}})();
/* kszFigHtml (jksize, the person dialog frame) is the other maker of a person's full-body figure: same registry */
(function(){if(typeof kszFigHtml!=="function")return;const f0=kszFigHtml;kszFigHtml=function(p){let h=f0.apply(this,arguments);try{const q=p&&(p.__kp||p);
  if(q&&h&&h.indexOf('<span class="kszfs"><img ')>=0){const id=++KFS_ID;KFS_REG.set(id,q);if(KFS_REG.size>600)KFS_REG.delete(KFS_REG.keys().next().value);h=h.replace('<span class="kszfs"><img ',`<span class="kszfs"><img data-kfsp="${id}" `)}}catch(e){}return h}})();
function kfsPerson(fig){try{if(fig.id==="mefig")return S;const id=fig.dataset&&fig.dataset.kfsp;if(id)return KFS_REG.get(+id)||null;const tok=fig.closest&&fig.closest("#tokens .tok");
 if(tok){const ppl=typeof curPeople==="function"?curPeople():[];return ppl[+tok.dataset.p]||null}}catch(e){}return null}
function kfsFigs(){return[...document.querySelectorAll("#mefig,#tokens .tok.fig img.figimg,img.kesimg,.kszfs>img")].filter(e=>!e.closest(".kgfig,.kpfig,.kidfig2,.kfsno"))}
/* the drawn picture box inside the <img> (object-fit: contain, picture centred) */
function kfsBox(fig){const r=fig.getBoundingClientRect();let bx=r.left,by=r.top,bw=r.width,bh=r.height;const nw=fig.naturalWidth,nh=fig.naturalHeight;
 if(nw&&nh&&bw>0&&bh>0){const ar=nw/nh;if(bw/bh>ar){const w=bh*ar;bx+=(bw-w)/2;bw=w}else{const h=bw/ar;by+=(bh-h)/2;bh=h}}return{bx,by,bw,bh}}
const KFS_SEAL=new WeakMap();
/* the element the seal is a child of: the nearest ancestor of the figure that does not clip its children (a figure picture box such as .kszfs is overflow:hidden), made a positioning parent (.kfshost) when it is static */
function kfsHost(fig){let e=fig.parentElement;while(e&&e!==document.body){const c=getComputedStyle(e);if(c.overflowX==="visible"&&c.overflowY==="visible"){if(c.position==="static")e.classList.add("kfshost");return e}e=e.parentElement}return fig.offsetParent||fig.parentElement}
function kfsDrop(fig){const s=KFS_SEAL.get(fig);if(s){s.remove();KFS_SEAL.delete(fig)}}
function kitFigSeal(fig){try{
 if(!fig||!fig.isConnected||typeof emoOn!=="function"||!emoOn())return kfsDrop(fig);
 const src=fig.currentSrc||fig.getAttribute("src")||"";if(!src||/unknown-fig/.test(src))return kfsDrop(fig);
 if(!fig.getClientRects().length||fig.classList.contains("j59off")||fig.closest(".j59off"))return kfsDrop(fig);
 if(!fig.complete||!fig.naturalWidth)return kfsDrop(fig);{const c=getComputedStyle(fig);if(c.visibility==="hidden"||c.display==="none"||+c.opacity<.2)return kfsDrop(fig)}
 const p=kfsPerson(fig);if(!p)return kfsDrop(fig);const html=emoBadge(p);if(!html)return kfsDrop(fig);
 const host=kfsHost(fig);if(!host)return kfsDrop(fig);
 let el=KFS_SEAL.get(fig);
 if(!el||el.parentNode!==host||el.__h!==html){if(el)el.remove();const t=document.createElement("template");t.innerHTML=html.trim();el=t.content.firstChild;if(!el)return;
  el.classList.add("kfseal");el.style.display="none";el.__h=html;el.__fig=fig;host.appendChild(el);KFS_SEAL.set(fig,el)}
 const b=kitFigBody(src,()=>kfsSched());if(!b){el.style.display="none";return}
 const B=kfsBox(fig);if(B.bh<60){el.style.display="none";return}
 const K=KIT_FIGSEAL,ht=b.ht!=null?b.ht:b.t,body=Math.max(20,(b.b-ht)*B.bh);
 const s=Math.round(Math.max(K.min,Math.min(K.max,body*K.k)));
 const k=Math.min(20,Math.max(1,K.rows|0)),rr=b.wr&&b.wr[k]!=null?b.wr[k]:null,ll=b.wl&&b.wl[k]!=null?b.wl[k]:null;
 const cx=B.bx+B.bw*((b.cl!=null&&b.cr>b.cl)?(b.cl+b.cr)/2:.5),gap=Math.max(2,body*K.gap);
 const edgeR=rr!=null?B.bx+B.bw*rr:cx+body*.09,edgeL=ll!=null?B.bx+B.bw*ll:cx-body*.09;
 const headTop=B.by+B.bh*ht;const cy=headTop+Math.min(body*.085,s*1.1);/* the seal's centre: the middle of the head, never lower than its first ~8.5 % */
 const bd=fig.closest("#stage")||fig.closest(".kszfig,.kesf")||fig.closest(".dlg")||host;const bb=bd.getBoundingClientRect(),hr=host.getBoundingClientRect();
 let L=edgeR+gap;if(L+s>bb.right-2){const L2=edgeL-gap-s;if(L2>=bb.left+2||L2>bb.right-2-s-0)L=L2;if(L2<bb.left+2)L=Math.max(bb.left+2,Math.min(L,bb.right-2-s))}
 L=Math.max(bb.left+2,Math.min(L,bb.right-2-s));
 let T=cy-s/2;T=Math.max(bb.top+2,Math.min(T,bb.bottom-2-s));
 const css=`left:${(L-hr.left+host.scrollLeft).toFixed(1)}px;top:${(T-hr.top+host.scrollTop).toFixed(1)}px;width:${s}px;height:${s}px`;
 if(el.style.cssText!==css){el.style.cssText=css}
 el.dataset.kfsb=body.toFixed(0)}catch(e){console.error("kitFigSeal",e)}}
function kfsSweep(){document.querySelectorAll("img.kfseal").forEach(s=>{const f=s.__fig;if(!f||!f.isConnected)s.remove()})}
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
@media (prefers-reduced-motion:no-preference){img.kemo.kfseal.kemo-gian,img.kemo.kfseal.kemo-dau{animation:kemoPulse 2.4s ease-in-out infinite}}
`;document.head.appendChild(st)})();
